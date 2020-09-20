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

import Edit from './components/products/Edit.vue'
import Show from './components/products/Show.vue'
import Create from './components/products/Create.vue'
import CartCheckout from './components/billing/CartCheckout.vue'
import BraintreeCheckout from './components/billing/BraintreeCheckout.vue'

Vue.component('product-edit', Edit)
Vue.component('product-show', Show)
Vue.component('product-create', Create)
Vue.component('cart-checkout', CartCheckout)
Vue.component('braintree-checkout', BraintreeCheckout)

document.addEventListener('turbolinks:load', () => {
    let app = new Vue({
        el: '#app'
    })
})
