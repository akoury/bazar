<template>
    <div>
        <h1 class="mb-4">Edit Product</h1>
        <form @submit.prevent="updateProduct">
            <div class="flex">
                <div>
                    <label class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">Name
                        <input type="text" v-model="model.name" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" required autofocus>
                    </label>

                    <label class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">Description
                        <textarea v-model="model.description" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" rows="3" required></textarea>
                    </label>

                    <label class="uppercase tracking-wide text-teal-light text-sm font-bold mb-6">
                        <input type="checkbox" v-model="model.published">Publish
                    </label>
                </div>
                <div class="ml-4">
                    <label for="product_image" class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2 block">Product Image</label>
                    <img :src="'http://bazar.test/' + model.image_path" alt="product_image" width="100">
                    <input type="file" @change="onImageChange" id="product_image" class="mb-6">
                </div>
            </div>

            <h4 class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">Products</h4>
            <table>
                <tr>
                    <th>Price</th>
                    <th>Item Quantity</th>
                    <th v-for="(attribute, index) in attributes" :key="index">
                        <button v-show="attributes.length > 0" type="button" @click="removeAttribute(index)" class="border-red border-2 hover:border-red-dark text-red hover:text-red-dark ml-1 rounded-full h-10 w-10">&times;</button>
                        <multiselect
                            v-model="attribute.name"
                            :options="availableAttributes"
                            :id="index"
                            :allow-empty="false"
                            deselect-label="Cannot leave field blank"
                            @select="selectAttribute"
                            :taggable="true"
                            @tag="addAttribute"
                            tag-placeholder="Add as a new attribute"
                            placeholder="Search or add an attribute"
                            openDirection="bottom">
                        </multiselect>
                    </th>
                    <button v-show="attributes.length < 4" type="button" @click="addAttributeSlot" class="border-blue border-2 hover:border-blue-dark text-blue hover:text-blue-dark ml-1 rounded-full h-10 w-10">&plus;</button>
                </tr>
                <tr v-for="(product, prodIndex) in model.products" :key="prodIndex">
                    <td>
                        <input type="number" v-model="product.price" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" step="0.01" required>
                    </td>
                    <td>
                        <input type="number" v-model="product.item_quantity" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" required>
                    </td>
                    <td v-for="(value, valIndex) in product.values" :key="valIndex">
                        <multiselect
                            v-model="value.name"
                            :options="availableValues(valIndex)"
                            :id="[prodIndex,valIndex]"
                            :allow-empty="false"
                            deselect-label="Cannot leave field blank"
                            :taggable="true"
                            @tag="addValue"
                            tag-placeholder="Add as a new value"
                            @select="selectValue"
                            placeholder="Search or add a value"
                            openDirection="bottom">
                        </multiselect>
                    </td>
                    <button v-show="model.products.length > 1" type="button" @click="removeProduct(product.id, prodIndex)" class="border-red border-2 hover:border-red-dark text-red hover:text-red-dark ml-1 rounded-full h-10 w-10">&times;</button>
                </tr>
            </table>

            <button type="button" @click="addProduct" class="bg-teal hover:bg-teal-dark text-white py-4 px-4 w-full rounded mb-4">Add Product</button>
            <button type="submit" class="bg-blue hover:bg-blue-dark text-white py-4 px-4 w-full rounded mb-4">Edit</button>
        </form>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
    components: { Multiselect },
    props: ['dataModel', 'dataAttributes'],
    data() {
        return {
            model: this.dataModel,
            attributes: []
        }
    },
    created() {
        this.model.products.map(product => (product.price = (product.price / 100).toFixed(2)))
        this.attributes = this.dataModel.products[0].values.map(value => value.attribute)
    },
    methods: {
        updateProduct() {
            if (this.fieldsFilled) {
                axios
                    .post('/products/' + this.model.id, this.formData())
                    .then(response => {
                        Turbolinks.visit(response.data)
                    })
                    .catch(error => {
                        if (error.response.status === 401 || error.response.status === 419) {
                            Turbolinks.visit(window.location)
                        }
                        console.log(error.response.data)
                    })
            } else {
                alert('You must fill all required inputs')
            }
        },
        formData() {
            let formData = new FormData()
            formData.append('name', this.model.name)
            formData.append('description', this.model.description)
            formData.append('published', this.model.published ? 1 : 0)

            let products = []

            this.model.products.map(product =>
                products.push({
                    id: product.hasOwnProperty('id') ? product.id : null,
                    price: product.price,
                    item_quantity: product.item_quantity,
                    attributes: this.attributes.length ? Object.assign(...this.attributes.map((attribute, index) => ({ [attribute.name]: product.values[index].name }))) : []
                })
            )

            formData.append('products', JSON.stringify(products))
            formData.append('_method', 'PATCH')
            return formData
        },
        onImageChange(e) {
            this.model.image_path = e.target.files[0]
        },
        addAttributeSlot() {
            if (this.attributes.length < 4) {
                this.attributes.push({ name: '' })
                this.model.products.map(product => product.values.push({ name: '' }))
            }
        },
        addProduct() {
            this.model.products.push({ price: 0, item_quantity: 0, values: this.attributes.map(attribute => ({ name: '' })) })
        },
        removeProduct(id, index) {
            if (id) {
                axios
                    .delete('/products/' + id)
                    .then(response => {
                        this.model.products.splice(index, 1)
                    })
                    .catch(error => {
                        if (error.response.status === 401 || error.response.status === 419) {
                            Turbolinks.visit(window.location)
                        }
                        console.log(error.response.data)
                    })
            } else {
                this.model.products.splice(index, 1)
            }
        },
        removeAttribute(attributeIndex) {
            let remainingValues = this.model.products.map(product => JSON.stringify(product.values.filter((value, index) => index !== attributeIndex).map(value => value.name)))

            let matchingValues = remainingValues.map(value => remainingValues.filter(val => val === value))
            if (matchingValues.find(matches => matches.length > 1)) {
                alert('You cannot remove that attribute because some variants would be equal')
            } else {
                this.attributes.splice(attributeIndex, 1)
                this.model.products.map(product => product.values.splice(attributeIndex, 1))
            }
        },
        addAttribute(newAttribute, index) {
            newAttribute = newAttribute.toLowerCase()
            if (!this.attributes.some(attribute => attribute.name === newAttribute)) {
                Vue.set(this.attributes, index, { name: newAttribute })
                this.dataAttributes.push({ name: newAttribute, values: [] })
            }
        },
        addValue(newValue, indexes) {
            newValue = newValue.toLowerCase()
            Vue.set(this.model.products[indexes[0]].values, indexes[1], { name: newValue })
            let dataValues = this.dataAttributes.find(attribute => attribute.name === this.attributes[indexes[1]].name).values
            if (!dataValues.some(value => value.name === newValue)) {
                dataValues.push({ name: newValue })
            }
        },
        selectAttribute(newAttribute, index) {
            Vue.set(this.attributes, index, { name: newAttribute })
            this.model.products.map(product => (product.values[index].name = ''))
        },
        selectValue(selectedValue, indexes) {
            let originalValue = this.model.products[indexes[0]].values.map(value => value.name)[indexes[1]]
            let selectedValues = JSON.stringify(this.model.products[indexes[0]].values.map((value, index) => (index === indexes[1] ? selectedValue : value.name)))

            if (this.model.products.find(product => JSON.stringify(product.values.map(value => value.name)) === selectedValues)) {
                Vue.set(this.model.products[indexes[0]].values, indexes[1], { name: originalValue })
                alert('This variant already exists')
            }
        },
        availableValues(valIndex) {
            let attribute = this.dataAttributes.find(attribute => attribute.name === this.attributes[valIndex].name)
            if (attribute) {
                return attribute.values.map(val => val.name)
            }
            return []
        }
    },
    computed: {
        fieldsFilled() {
            return this.attributes.every(attribute => attribute.name != '') && this.model.products.every(product => product.values.every(value => value.name != ''))
        },
        availableAttributes() {
            return this.dataAttributes.map(attribute => attribute.name).filter(attribute => !this.attributes.map(attr => attr.name).includes(attribute))
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>