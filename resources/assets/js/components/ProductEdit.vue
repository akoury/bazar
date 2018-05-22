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
                        <input type="text" v-model="attribute.name" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" required>
                    </th>
                    <button type="button" @click="addAttribute" class="border-blue border-2 hover:border-blue-dark text-blue hover:text-blue-dark ml-1 rounded-full h-10 w-10">&plus;</button>
                </tr>
                <tr v-for="product in model.products" :key="product.id">
                    <td>
                        <input type="number" v-model="product.price" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" step="0.01" required>
                    </td>
                    <td>
                        <input type="number" v-model="product.item_quantity" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" required>
                    </td>
                    <td v-for="value in product.values" :key="value.id">
                        <input type="text" v-model="value.name" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" required>
                    </td>
                    <button v-if="model.products.length > 1" type="button" @click="removeProduct(product.id)" class="border-red border-2 hover:border-red-dark text-red hover:text-red-dark ml-1 rounded-full h-10 w-10">&times;</button>
                </tr>
                <tr v-for="(product, index) in newProducts" :key="index">
                    <td>
                        <input type="number" v-model="product.price" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" step="0.01" required>
                    </td>
                    <td>
                        <input type="number" v-model="product.item_quantity" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" required>
                    </td>
                    <button type="button" class="border-red border-2 hover:border-red-dark text-red hover:text-red-dark ml-1 rounded-full h-10 w-10">&times;</button>
                </tr>
            </table>
            
            <button type="button" @click="addProduct" class="bg-teal hover:bg-teal-dark text-white py-4 px-4 w-full rounded mb-4">Add Product</button>
            <button type="submit" class="bg-blue hover:bg-blue-dark text-white py-4 px-4 w-full rounded mb-4">Edit</button>
        </form> 
    </div>
</template>

<script>
export default {
    props: ['dataModel'],
    data() {
        return {
            model: this.dataModel,
            attributes: [],
            newProducts: []
        }
    },
    created() {
        this.model.products.map(product => (product.price = (product.price / 100).toFixed(2)))
        this.attributes = this.dataModel.products[0].values.map(value => value.attribute)
    },
    methods: {
        updateProduct() {
            axios
                .post('/products/' + this.model.id, this.formData())
                .then(response => {
                    Turbolinks.visit(response.data)
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        },
        formData() {
            let formData = new FormData()
            formData.append('name', this.model.name)
            formData.append('description', this.model.description)
            formData.append('published', this.model.published ? 1 : 0)
            formData.append('products', JSON.stringify(this.model.products))
            formData.append('_method', 'PATCH')
            return formData
        },
        onImageChange(e) {
            this.model.image_path = e.target.files[0]
        },
        addAttribute() {
            this.attributes.push({ name: '' })
        },
        addProduct() {
            this.newProducts.push({ price: 0, item_quantity: 0 })
        },
        removeProduct(id) {
            axios
                .delete('/products/' + id)
                .then(response => {
                    this.model.products.splice(this.model.products.findIndex(product => product.id === id), 1)
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        }
    }
}
</script>