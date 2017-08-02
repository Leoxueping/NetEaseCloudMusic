// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import filter from './filter/index.js'
import ripple from './util/ripple.js'
import VueTouch from 'vue-touch'

/*全局css*/
import style from './assets/css/style.css'
import fontAwsome from './assets/css/font-awesome.min.css'

/*手指触摸插件*/
Vue.use(VueTouch, {name: 'v-touch'})

/*事件bus，组件间传递事件*/
Vue.prototype.$eventBus = new Vue({});

//ajax插件axios
axios.defaults.baseURL = 'http://119.29.201.53:80'
axios.defaults.timeout = 10000
// axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$http = axios

/*点击水波纹效果实现函数*/
Vue.prototype.$ripple = ripple

Vue.config.productionTip = false

// window.baseUrl = 'http://119.29.201.53:80'
// window.baseUrl = 'http://localhost:3000'

/*初始化过滤器*/
filter(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

