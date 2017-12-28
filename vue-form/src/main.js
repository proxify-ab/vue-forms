import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import 'jquery'
require('bootstrap-sass/assets/stylesheets/_bootstrap.scss')
require('./assets/main.scss')

moment.locale('es')

Vue.use(VeeValidate)

new Vue({
  el: '#app',
  render: h => h(App)
})

