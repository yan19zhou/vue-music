import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import lazyload from 'vue-lazyload'
import store from './store'
import 'base/global.js'
Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(lazyload)
import "common/stylus/index.styl"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
