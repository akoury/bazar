<template>
    <div>
        <h1 class="mb-4">Edit Product</h1>
        <form @submit.prevent="updateProduct" class="flex flex-col">
            <label class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">Name
                <input type="text" v-model="model.name" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" required autofocus>
            </label>

            <label class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">Description
                <textarea v-model="model.description" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" rows="3" required></textarea>
            </label>

            <label class="uppercase tracking-wide text-teal-light text-sm font-bold mb-6">
                <input type="checkbox" v-model="model.published">Publish
            </label>

            <label for="product_image" class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">Product Image</label>
            <img :src="'http://bazar.test/' + model.image_path" alt="product_image" width="100">
            <input type="file" @change="onImageChange" id="product_image" class="mb-6">

            <div v-for="product in model.products" :key="product.id">
                <h4>Product {{ product.values.map(value => value.name).join(', ') }}</h4>
                <div class="flex">
                    <label class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2 mr-2">Price
                        <input type="number" v-model="product.price" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" step="0.01" required>
                    </label>

                    <label class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">Item Quantity
                        <input type="number" v-model="product.item_quantity" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" required>
                    </label>
                </div>
            </div>
            
            <button type="submit" class="bg-blue hover:bg-blue-dark text-white py-4 px-4 w-full rounded mb-4">Edit</button>
        </form> 
    </div>
</template>

<script>
export default {
    props: ['dataModel'],
    data() {
        return {
            model: this.dataModel
        }
    },
    created() {
        this.model.products.map(product => (product.price = (product.price / 100).toFixed(2)))
    },
    methods: {
        updateProduct() {
            axios
                .post('/products/' + this.model.brand_id, this.formData())
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
        }
    }
}
</script>