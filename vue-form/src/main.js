import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import maxDateNow from './validate/maxDateNow'
import 'jquery'

require('font-awesome/scss/font-awesome.scss')
require('bootstrap-sass/assets/stylesheets/_bootstrap.scss')
require('bootstrap-sass/assets/javascripts/bootstrap.min')
require('./assets/main.scss')

VeeValidate.Validator.extend('maxDateNow', maxDateNow)

moment.locale('es')

Vue.use(VeeValidate)

new Vue({
  el: '#app',
  render: h => h(App)
})

