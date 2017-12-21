import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import 'jquery'
require('moment')
require('bootstrap-sass/assets/stylesheets/_bootstrap.scss')
require('./assets/main.scss')

Vue.use(VeeValidate)

new Vue({
  el: '#app',
  render: h => h(App)
})

