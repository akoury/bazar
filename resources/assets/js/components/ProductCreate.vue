<template>
    <div>
        <h1 class="mb-4">Create a Product</h1>
        <form @submit.prevent="create" class="flex flex-col">

            <label for="name" class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">Name</label>
            <input type="text" v-model="name" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" required autofocus>

            <label for="description" class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">Description</label>
            <textarea v-model="description" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" rows="3" required></textarea>

            <label class="uppercase tracking-wide text-teal-light text-sm font-bold mb-6">
                <input type="checkbox" v-model="published">Publish
            </label>

            <label for="product_image" class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">Product Image</label>
            <input type="file" @change="onImageChange" class="mb-4">

            <div v-for="(product, index) in products" :key="index">
                <label for="price" class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">Price</label>
                <input type="number" v-model="product.price" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" step="0.01" required>

                <label for="item_quantity" class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">Item Quantity</label>
                <input type="number" v-model="product.item_quantity" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" required>
            </div>
            
            <button type="submit" class="bg-blue hover:bg-blue-dark text-white py-4 px-4 w-full rounded mb-4">Create</button>
        </form>
        <button @click="addProduct" class="bg-teal hover:bg-teal-dark text-white py-4 px-4 w-full rounded">Add product</button>
    </div>
</template>

<script>
export default {
    props: ['brandId'],
    data() {
        return {
            name: '',
            description: '',
            product_image: '',
            products: [
                {
                    price: 1,
                    item_quantity: 1
                }
            ],
            published: 1
        }
    },
    methods: {
        onImageChange(e) {
            this.product_image = e.target.files[0]
        },
        create() {
            axios
                .post('/brands/' + this.brandId + '/products', this.formData())
                .then(response => {
                    Turbolinks.visit(response.data)
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        },
        addProduct() {
            this.products.push({ price: 1, item_quantity: 1 })
        },
        formData() {
            let formData = new FormData()
            formData.append('name', this.name)
            formData.append('description', this.description)
            formData.append('product_image', this.product_image)
            formData.append('products', JSON.stringify(this.products))
            formData.append('published', this.published ? 1 : 0)
            return formData
        }
    }
}
</script>
