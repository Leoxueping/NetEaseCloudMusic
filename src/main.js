// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'

/*全局css*/
import style from './assets/css/style.css'
import fontAwsome from './assets/css/font-awesome.min.css'


//ajax插件axios
Vue.prototype.$http = axios

Vue.config.productionTip = false

window.baseUrl = 'http://119.29.201.53:80'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

