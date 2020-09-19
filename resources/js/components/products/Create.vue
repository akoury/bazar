<template>
    <div>
        <h1 class="mb-4">Create a Product</h1>
        <form @submit.prevent="createProduct" class="flex flex-col">
            <label class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">Name
                <input type="text" v-model="name" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" required autofocus>
            </label>

            <label class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">Description
                <textarea v-model="description" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" rows="3" required></textarea>
            </label>

            <label class="uppercase tracking-wide text-teal-light text-sm font-bold mb-6">
                <input type="checkbox" v-model="published">Publish
            </label>

            <span class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">Product Images</span>
            <file-pond
                name="product_images"
                ref="pond"
                label-idle="Drop files here or click to select..."
                required="true"
                allow-multiple="true"
                dropOnPage="true"
                dropOnElement="false"
                allowImagePreview="true"
                imagePreviewHeight="75"
                accepted-file-types="image/*"
                maxFileSize="10MB"/>

            <div class="my-6">
                <h4 class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">Attributes</h4>
                <div v-for="(n, index) in numberOfAttributes" :key="index" class="flex">
                    <multiselect
                        v-model="selectedAttributes[index]"
                        :options="attributes.filter(attribute => !selectedAttributes.includes(attribute))"
                        placeholder="Search or add an attribute"
                        :id="index"
                        @select="changeAttribute(index)"
                        :taggable="true"
                        @tag="addAttribute"
                        tag-placeholder="Add as a new attribute"
                        label="name"
                        track-by="name"
                        openDirection="bottom">
                    </multiselect>
                    <multiselect
                        v-if="selectedAttributes.length > index"
                        v-model="selectedValues[index]"
                        :options="selectedAttributes[index].hasOwnProperty('values') ? selectedAttributes[index].values : []"
                        placeholder="Search or add a value"
                        :id="index"
                        :multiple="true"
                        :close-on-select="false"
                        :taggable="true"
                        @tag="addValue"
                        tag-placeholder="Add as a new value"
                        label="name"
                        track-by="name"
                        openDirection="bottom">
                    </multiselect>
                    <button @click="removeAttribute(index)" type="button" class="border-red border-2 hover:border-red-dark text-red hover:text-red-dark ml-1 rounded-full h-10 w-10">&times;</button>
                </div>
                <button @click="numberOfAttributes++" type="button" class="bg-teal hover:bg-teal-dark text-white py-4 mt-4 px-4 w-full rounded">Add new Attribute</button>
            </div>

            <div v-for="(combination, index) in combinations" :key="index">
                <h4>Product {{ combination.map(value => value.name).join(', ') }}</h4>
                <div class="flex">
                    <label v-show="products.length > 1" class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2 mr-2">Enabled
                        <input type="checkbox" v-model="products[index].isActive">
                    </label>

                    <label class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2 mr-2">Price
                        <input type="number" v-model="products[index].price" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" step="0.01" required :disabled="!products[index].isActive">
                    </label>

                    <label class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">Item Quantity
                        <input type="number" v-model="products[index].item_quantity" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" required :disabled="!products[index].isActive">
                    </label>
                </div>
            </div>

            <button type="submit" class="bg-blue hover:bg-blue-dark text-white py-4 px-4 w-full rounded mb-4">Create</button>
        </form>
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
    props: ['brandId', 'attributes'],
    data() {
        return {
            name: '',
            description: '',
            published: true,
            numberOfAttributes: 0,
            selectedAttributes: [],
            selectedValues: [],
            products: [{ price: 1, item_quantity: 1, isActive: true }]
        }
    },
    methods: {
        createProduct() {
            axios
                .post('/brands/' + this.brandId + '/models', this.formData())
                .then(response => {
                    Turbolinks.visit(response.data)
                })
                .catch(error => {
                    if (error.response.status === 401 || error.response.status === 419) {
                        Turbolinks.visit(window.location)
                    }
                    console.log(error.response.data)
                })
        },
        formData() {
            let formData = new FormData()
            formData.append('name', this.name)
            formData.append('description', this.description)
            formData.append('published', this.published ? 1 : 0)

            this.$refs.pond
                .getFiles()
                .filter(file => file.status === 2)
                .map((file, index) => formData.append('product_images[' + index + ']', file.file))

            let products = this.products
            if (products.length === 1) {
                products[0].isActive = true
            }

            if (this.combinations[0].length) {
                products = products
                    .map((product, index) => {
                        product.attributes = Object.assign(...this.combinations[index].map(value => (value.hasOwnProperty('attribute_id') ? { [this.attributes.find(attribute => attribute.id == value.attribute_id).name]: value.name } : { [value.attribute]: value.name })))
                        return product
                    })
                    .filter(product => product.isActive)
            }

            formData.append('products', JSON.stringify(products))
            return formData
        },
        changeAttribute(index) {
            Vue.set(this.selectedValues, index, [])
        },
        removeAttribute(index) {
            this.selectedAttributes.splice(index, 1)
            this.selectedValues.splice(index, 1)
            this.numberOfAttributes--
        },
        addAttribute(newAttribute, index) {
            newAttribute = newAttribute.toLowerCase()
            if (!this.selectedAttributes.some(attribute => attribute.name === newAttribute)) {
                Vue.set(this.selectedAttributes, index, { name: newAttribute, values: [] })
                Vue.set(this.selectedValues, index, [])
            }
        },
        addValue(newValue, index) {
            newValue = newValue.toLowerCase()
            this.selectedValues[index].push({ name: newValue, attribute: this.selectedAttributes[index].name })
            this.selectedAttributes[index].values.push({ name: newValue, attribute: this.selectedAttributes[index].name })
        },
        calculateCombinations(values, combine = [], combinations = []) {
            if (!values.length) {
                combinations.push(combine)
            } else {
                values[0].forEach(value => {
                    let nextValues = values.slice(1)
                    let copy = combine.slice()
                    copy.push(value)
                    this.calculateCombinations(nextValues, copy, combinations)
                })
            }
            return combinations
        }
    },
    computed: {
        combinations() {
            let combinations = this.calculateCombinations(this.selectedValues.filter(value => value.length > 0))

            let diff = this.products.length - combinations.length

            while (diff < 0) {
                this.products.push({ price: 0, item_quantity: 0, isActive: true })
                diff++
            }

            if (diff > 0) {
                this.products.length -= diff
            }

            return combinations
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>