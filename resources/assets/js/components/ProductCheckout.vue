<template>
    <div>
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

        <div v-for="attribute in attributes" :key="attribute.id">
            <label class="block uppercase tracking-wide text-teal-light text-sm font-bold mb-2">
                {{ attribute.name }}
            </label>

            <div class="inline-flex mb-6">
                <div v-for="value in attribute.values" :key="value.id" class="mr-2 flex flex-col items-center">
                    <label class="bg-grey-lighter text-grey-darker p-3 w-full rounded cursor-pointer border border-dashed border-transparent" :class="selected(value)">
                        <span>{{ value.name }}</span>
                        <input type="radio" :value="value.id" v-model="values[attribute.id]" :name="attribute.id" class="absolute opacity-0" @change="select(value)">
                    </label>
                </div>
            </div>
        </div>


        <form @submit.prevent="order">
            <label for="quantity" class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">
                Quantity
            </label>
            <input id="quantity" type="number" name="quantity" v-model="quantity" min="1" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" required>
            <h3 class="text-grey-dark text-xl font-light leading-normal mb-6">Delivered in 4 days</h3>
            <button type="submit" :disabled="processing" class="bg-teal hover:bg-teal-dark text-white py-4 px-4 w-full rounded mb-4">Order {{ quantity }} for {{ totalPriceInDollars }} $</button>
        </form>
        <button @click="addToCart" :disabled="processing" class="bg-blue hover:bg-blue-dark text-white py-4 px-4 w-full rounded">Add {{ quantity }} to Cart</button>
    </div>
</template>

<script>
export default {
    props: ['model', 'attributes', 'productId', 'userEmail'],
    data() {
        return {
            products: this.model.products,
            quantity: 1,
            values: {},
            processing: false,
            stripeHandler: null,
            combinations: {},
            selectedProduct: {}
        }
    },
    created() {
        this.selectedProduct = this.products.find(product => product.id == this.productId)

        this.values = Object.assign(...this.selectedProduct.values.map(value => ({ [value.attribute.id]: value.id })))

        this.stripeHandler = this.initStripe()

        this.combinations = this.products.map(product => Object.assign(...product.values.map(value => ({ [value.attribute_id]: value.id }))))
    },
    methods: {
        select(sentValue) {
            let selected = this.products.find(product =>
                product.values
                    .map(value => value.id)
                    .sort()
                    .every((value, index) => value == Object.values(this.values).sort()[index])
            )

            if (selected == null) {
                selected = this.products.find(product => product.values.map(value => value.id).includes(sentValue.id))
            }
            this.selectedProduct = selected
            this.values = Object.assign(...this.selectedProduct.values.map(value => ({ [value.attribute.id]: value.id })))
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
                .post('/orders/store/' + this.productId, { email: token.email, quantity: this.quantity, payment_token: token.id })
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
                .post('/products/' + this.productId + '/add', { quantity: this.quantity })
                .then(response => {
                    alert(response.data)
                })
                .catch(error => {
                    alert(error.response.data)
                })
            this.processing = false
        },
        selected(value) {
            let included = Object.values(this.values).includes(value.id)
            let vals = Object.assign({}, this.values)
            vals[value.attribute_id] = value.id

            return {
                'bg-teal text-white': included,
                'border-red': !included && !this.combinations.find(combination => JSON.stringify(combination) === JSON.stringify(vals))
            }
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
