<template>
    <div>
        <div id="dropin-container"></div>
        <button @click="order" :disabled="processing">Order for {{ totalPriceInDollars }} $ with BT</button>
    </div>
</template>

<script>
import Braintree from 'braintree-web-drop-in'

export default {
    props: ['totalPrice'],
    data() {
        return {
            processing: false,
            instance: null
        }
    },
    mounted() {
        new Braintree.create(
            {
                authorization: 'sandbox_qcx9kppr_pprzfnybxxn993w5',
                container: '#dropin-container'
            },
            (createErr, instance) => {
                this.instance = instance
            }
        )
    },
    methods: {
        order() {
            this.processing = true

            this.instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
                axios
                    .post('/orders/store', { email: 'epa@gmail.com', payment_token: payload.nonce })
                    .then(response => {
                        Turbolinks.visit('/orders/' + response.data.confirmation_number)
                    })
                    .catch(error => {
                        alert(error.response.data)
                        this.processing = false
                    })
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
