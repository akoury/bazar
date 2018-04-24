<template>
    <button class="m-4 bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" @click="this.order">Pay with MP</button>
</template>

<script>
export default {
    props: ['link'],
    methods: {
        order() {
            $MPC.openCheckout({
                url: this.link,
                mode: 'modal',
                onreturn: function(data) {
                    console.log(data)
                    if (data.collection_status == 'approved') {
                        alert('Pago acreditado')
                        // data.collection_id es el que llega por wekbhook

                        axios
                            .post('/accepted', data)
                            .then(response => {
                                console.log(response)
                            })
                            .catch(error => {
                                alert(error.response.data)
                            })
                    } else if (data.collection_status == 'pending') {
                        alert('El usuario no completó el pago')
                    } else if (data.collection_status == 'in_process') {
                        alert('El pago está siendo revisado')
                    } else if (data.collection_status == 'rejected') {
                        alert('El pago fué rechazado, el usuario puede intentar nuevamente el pago')
                    } else if (data.collection_status == null) {
                        alert('El usuario no completó el proceso de pago, no se ha generado ningún pago')
                    }
                }
            })
        }
    }
}
</script>
