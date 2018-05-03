<template>
    <div>
        <form @submit.prevent="order">
            <label for="quantity" class="uppercase tracking-wide text-teal-light text-sm font-bold mb-2">
                Quantity
            </label>
            <input id="quantity" type="number" name="quantity" v-model="quantity" min="1" class="appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6" required>
            <button type="submit" :disabled="processing" class="bg-teal hover:bg-teal-dark text-white py-4 px-4 w-full rounded mb-4">Order {{ quantity }} for {{ totalPriceInDollars }} $</button>
        </form>
        <button v-on:click="addToCart" :disabled="processing" class="bg-blue hover:bg-blue-dark text-white py-4 px-4 w-full rounded">Add {{ quantity }} to Cart</button>
    </div>
</template>

<script>
export default {
    props: ['productId', 'productPrice', 'userEmail'],
    data() {
        return {
            quantity: 1,
            processing: false,
            stripeHandler: null
        }
    },
    created() {
        this.stripeHandler = this.initStripe()
    },
    methods: {
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
        }
    },
    computed: {
        totalPrice() {
            return this.quantity * this.productPrice
        },
        totalPriceInDollars() {
            return (this.totalPrice / 100).toFixed(2)
        }
    }
}
</script>
