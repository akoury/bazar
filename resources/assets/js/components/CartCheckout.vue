<template>
    <div>
        <form @submit.prevent="order">
            <button type="submit" :disabled="processing">Order for {{ totalPriceInDollars }} $ with Stripe</button>
        </form>
    </div>
</template>

<script>
export default {
    props: ['email', 'totalPrice'],
    data() {
        return {
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
                email: this.email,
                allowRememberMe: false,
                panelLabel: 'Pay {{amount}}',
                amount: parseInt(this.totalPrice),
                token: this.purchaseItems
            })
        },
        purchaseItems(token) {
            this.processing = true
            axios
                .post('/orders/store', { email: token.email, payment_token: token.id })
                .then(response => {
                    Turbolinks.visit('/orders/' + response.data.confirmation_number)
                })
                .catch(error => {
                    alert(error.response.data)
                    this.processing = false
                })
        }
    },
    computed: {
        totalPriceInDollars() {
            return (this.totalPrice / 100).toFixed(2)
        }
    }
}
</script>
