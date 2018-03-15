<template>
    <div>
        <form @submit.prevent="order">
            <label for="quantity">Quantity</label>
            <input id="quantity" type="number" name="quantity" v-model="quantity" required>
            <button type="submit" :disabled="processing">Order for {{ totalPriceInDollars }} $</button>
        </form>
        <button v-on:click="addToCart" :disabled="processing">Add to Cart</button>
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
        order(callback) {
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
                .post('/products/' + this.productId + '/orders', { email: token.email, quantity: this.quantity, payment_token: token.id })
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
                    console.log(error.response.data)
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
