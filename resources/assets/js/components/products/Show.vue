<template>
    <div class="flex flex-wrap rounded-lg bg-white shadow-md sm:h-full">
        <div class="w-full sm:w-3/5 h-64 sm:h-auto overflow-hidden p-2 sm:p-4 border-b sm:border-r border-grey-lighter flex flex-col">
            <div class="flex flex-1 items-center content-center mx-auto">
                <img :src="selectedImage" alt="product">
            </div>
            <div class="mx-auto">
                <img v-for="(url, index) in urls" :key="index" :src="url" :alt="model.media[index].name" @mouseover="selectedImage = url" class="h-12 w-12">
            </div>
        </div>
        <div class="sm:w-2/5 p-6">
            <h1 class="text-black text-3xl font-semibold mb-2">{{ model.name }}</h1>
            <svg height="25" width="23" class="mb-4 text-yellow fill-current">
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"/>
            </svg>
            <svg height="25" width="23" class="mb-4 text-grey fill-current">
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"/>
            </svg>
            <h2 class="text-red-dark text-xl mb-1 font-light line-through">$ {{ price }}</h2>
            <h2 class="text-teal text-4xl font-light mb-6">$ {{ price }}</h2>
            <h3 class="text-grey-dark text-xl font-light leading-normal mb-6">{{ model.description }}
                <ul>
                    <li>The best phone</li>
                    <li>All day battery life</li>
                </ul>
            </h3>

            <fieldset v-for="attribute in attributes" :key="attribute.id">
                <legend class="block uppercase tracking-wide text-teal-light text-sm font-bold mb-2">
                    {{ attribute.name }}
                </legend>

                <div class="inline-flex mb-6 flex-wrap">
                    <div v-for="value in attribute.values" :key="value.id" class="mr-2 flex flex-col items-center">
                        <label class="bg-grey-lighter hover:bg-grey-light text-grey-darker p-3 w-full cursor-pointer rounded border border-dashed border-transparent mb-2" :class="available(value)">
                            <span>{{ value.name }}</span>
                            <input type="radio" v-model="values[attribute.id]" :name="attribute.name" :value="value.id" class="absolute opacity-0" @change="selectProduct(value)">
                        </label>
                    </div>
                </div>
            </fieldset>

            <div v-if="selectedProduct.item_quantity > 0 && selectedProduct.deleted_at == null">
                <form @submit.prevent="order">
                    <label for="quantity" class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">
                        Quantity
                    </label>
                    <input id="quantity" type="number" name="quantity" v-model="quantity" min="1" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" required>
                    <h3 class="text-grey-dark text-xl font-light mb-6">Delivered in 4 days</h3>
                    <button type="submit" :disabled="processing" :class="{'cursor-not-allowed': processing }" class="bg-teal hover:bg-teal-dark text-white py-4 px-4 w-full rounded mb-4">Order {{ quantity }} for {{ totalPriceInDollars }} $</button>
                </form>
                <button @click="addToCart" :disabled="processing" :class="{'cursor-not-allowed': processing }" class="bg-blue hover:bg-blue-dark text-white py-4 px-4 w-full rounded">Add {{ quantity }} to Cart</button>
            </div>
            <div v-else>
                <h3 class="text-red text-center font-normal mt-6 p-3 bg-red-lightest rounded">
                    {{ selectedProduct.deleted_at != null ? 'Product Unavailable' : 'Temporarily out of stock' }}
                </h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['model', 'attributes', 'productId', 'userEmail', 'urls'],
    data() {
        return {
            products: this.model.products,
            quantity: 1,
            values: {},
            processing: false,
            stripeHandler: null,
            combinations: {},
            selectedProduct: {},
            selectedImage: null
        }
    },
    created() {
        this.selectedProduct = this.productById(this.productId)

        this.selectedImage = this.urls[0]

        if (this.selectedProduct.values.length > 0) {
            this.values = Object.assign(...this.selectedProduct.values.map(value => ({ [value.attribute.id]: value.id })))

            this.combinations = this.products.map(product => ({ product_id: product.id, available: product.item_quantity > 0, values: Object.assign(...product.values.map(value => ({ [value.attribute_id]: value.id }))) }))
        }

        this.stripeHandler = this.initStripe()
    },
    methods: {
        selectProduct(selectedValue) {
            let matchingCombination = this.combinations.find(combination => JSON.stringify(combination.values) === JSON.stringify(this.values))

            if (matchingCombination == null || !matchingCombination.available) {
                let similarCombinations = this.combinations.filter(combination => Object.values(combination.values).includes(selectedValue.id) && combination.available)

                if (!similarCombinations.length) {
                    similarCombinations = this.combinations.filter(combination => Object.values(combination.values).includes(selectedValue.id))
                }

                matchingCombination = similarCombinations
                    .map(combination => ({
                        product_id: combination.product_id,
                        values: Object.values(combination.values).filter(value => Object.values(this.values).includes(value)).length
                    }))
                    .reduce((max, item) => (item.values > max.values ? item : max))
            }

            this.selectedProduct = this.productById(matchingCombination.product_id)
            this.values = Object.assign(...this.selectedProduct.values.map(value => ({ [value.attribute.id]: value.id })))
            history.replaceState(history.state, '', '/brands/' + this.model.brand_id + '/products/' + this.selectedProduct.id)
        },
        initStripe() {
            const handler = StripeCheckout.configure({
                key: App.stripeKey
            })

            window.addEventListener('popstate', () => {
                handler.close()
            })

            return handler
        },
        order() {
            this.stripeHandler.open({
                name: 'Bazar',
                description: 'Your order',
                currency: 'usd',
                email: this.userEmail,
                allowRememberMe: false,
                panelLabel: 'Pay {{amount}}',
                amount: this.totalPrice,
                token: this.purchaseItems
            })
        },
        purchaseItems(token) {
            this.processing = true
            axios
                .post('/orders/store/' + this.selectedProduct.id, { email: token.email, quantity: this.quantity, payment_token: token.id })
                .then(response => {
                    Turbolinks.visit('/orders/' + response.data.confirmation_number)
                })
                .catch(error => {
                    alert(error.response.data)
                    this.processing = false
                })
        },
        addToCart() {
            this.processing = true
            axios
                .post('/products/' + this.selectedProduct.id + '/add', { quantity: this.quantity })
                .then(response => {
                    alert(response.data)
                })
                .catch(error => {
                    alert(error.response.data)
                })
            this.processing = false
        },
        available(value) {
            let isAvailable = Object.values(this.values).includes(value.id)
            let similarValues = Object.assign({}, this.values)
            similarValues[value.attribute_id] = value.id

            return {
                'bg-teal hover:bg-teal text-white': isAvailable,
                'border-red': !isAvailable && !this.combinations.find(combination => JSON.stringify(combination.values) === JSON.stringify(similarValues) && combination.available)
            }
        },
        productById(id) {
            return this.products.find(product => product.id == id)
        }
    },
    computed: {
        price() {
            return (this.selectedProduct.price / 100).toFixed(2)
        },
        totalPrice() {
            return this.quantity * this.selectedProduct.price
        },
        totalPriceInDollars() {
            return (this.totalPrice / 100).toFixed(2)
        }
    }
}
</script>
