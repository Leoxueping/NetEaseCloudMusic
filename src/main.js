// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'


//ajax插件axios
Vue.prototype.$http = axios

Vue.config.productionTip = false

window.baseUrl = 'http://119.29.201.53:8080'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

