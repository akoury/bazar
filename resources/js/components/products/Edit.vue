<template>
    <div>
        <h1 class="mb-4">Edit Product</h1>
        <form @submit.prevent="updateProduct">
            <div class="flex">
                <div class="w-2/3">
                    <label class="uppercase tracking-wider text-teal-300 text-sm font-bold mb-2">Name
                        <input type="text" v-model="model.name" class="appearance-none w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mt-2 mb-6" required autofocus>
                    </label>

                    <label class="uppercase tracking-wider text-teal-300 text-sm font-bold mb-2">Description
                        <textarea v-model="model.description" class="appearance-none w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mt-2 mb-6" rows="3" required></textarea>
                    </label>

                    <label class="uppercase tracking-wider text-teal-300 text-sm font-bold mb-6">
                        <input type="checkbox" v-model="model.published">Publish
                    </label>
                </div>
                <div class="w-1/3 ml-4">
                    <span class="uppercase tracking-wider text-teal-300 text-sm font-bold mb-2">Product Images</span>
                    <file-pond
                        name="product_images"
                        ref="pond"
                        label-idle="Drop files here or click to select..."
                        allow-multiple="true"
                        dropOnPage="true"
                        dropOnElement="false"
                        allowImagePreview="true"
                        imagePreviewHeight="75"
                        accepted-file-types="image/*"
                        maxFileSize="10MB"/>
                </div>
            </div>

            <p class="uppercase tracking-wider text-teal-300 text-sm font-bold mb-2">Products</p>
            <table>
                <tr>
                    <th>Price</th>
                    <th>Item Quantity</th>
                    <th v-for="(attribute, index) in attributes" :key="index">
                        <button v-show="attributes.length > 0" type="button" @click="removeAttribute(index)" class="border-red-500 border-2 hover:border-red-600 text-red-500 hover:text-red-600 ml-1 rounded-full h-10 w-10">&times;</button>
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
                    <button v-show="attributes.length < 4" type="button" @click="addAttributeSlot" class="border-blue-500 border-2 hover:border-blue-600 text-blue-500 hover:text-blue-600 ml-1 rounded-full h-10 w-10">&plus;</button>
                </tr>
                <tr v-for="(product, prodIndex) in model.products" :key="prodIndex">
                    <td>
                        <input type="number" v-model="product.price" class="appearance-none w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mt-2 mb-6" step="0.01" required>
                    </td>
                    <td>
                        <input type="number" v-model="product.item_quantity" class="appearance-none w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mt-2 mb-6" required>
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
                    <button v-show="model.products.length > 1" type="button" @click="removeProduct(product.id, prodIndex)" class="border-red-500 border-2 hover:border-red-600 text-red-500 hover:text-red-600 ml-1 rounded-full h-10 w-10">&times;</button>
                </tr>
            </table>

            <button type="button" @click="addProduct" class="bg-teal-500 hover:bg-teal-600 text-white py-4 px-4 w-full rounded mb-4">Add Product</button>
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white py-4 px-4 w-full rounded mb-4">Edit</button>
        </form>
        <button @click="removeProductModel" type="button" class="bg-red-500 hover:bg-red-600 text-white py-4 px-4 w-full rounded mb-4">Delete Model</button>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilepondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilepondPluginFileValidateSize from 'filepond-plugin-file-validate-size'

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilepondPluginImagePreview, FilepondPluginFileValidateSize)

export default {
    components: { Multiselect, FilePond },
    props: ['dataModel', 'dataAttributes', 'urls'],
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
    mounted() {
        this.$refs.pond.addFiles(this.urls)
    },
    methods: {
        updateProduct() {
            if (this.fieldsFilled) {
                axios
                    .post('/models/' + this.model.id, this.formData())
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

            this.$refs.pond
                .getFiles()
                .filter(file => file.status === 2)
                .map((file, index) => formData.append('product_images[' + index + ']', file.file))

            let products = []

            this.model.products.map(product =>
                products.push({
                    id: product.hasOwnProperty('id') ? product.id : undefined,
                    price: product.price,
                    item_quantity: product.item_quantity,
                    attributes: this.attributes.length ? Object.assign(...this.attributes.map((attribute, index) => ({ [attribute.name]: product.values[index].name }))) : undefined
                })
            )

            formData.append('products', JSON.stringify(products))
            formData.append('_method', 'PATCH')
            return formData
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
        },
        removeProductModel() {
            axios
                .delete('/models/' + this.model.id)
                .then(response => {
                    Turbolinks.visit(response.data)
                })
                .catch(error => {
                    if (error.response.status === 401 || error.response.status === 419) {
                        Turbolinks.visit(window.location)
                    }
                    console.log(error.response.data)
                })
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