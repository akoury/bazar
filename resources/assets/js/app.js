/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap')

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('product-edit', require('./components/ProductEdit.vue'))
Vue.component('cart-checkout', require('./components/CartCheckout.vue'))
Vue.component('product-create', require('./components/ProductCreate.vue'))
Vue.component('product-checkout', require('./components/ProductCheckout.vue'))
Vue.component('braintree-checkout', require('./components/BraintreeCheckout.vue'))

document.addEventListener('turbolinks:load', () => {
    let app = new Vue({
        el: '#app'
    })
})
