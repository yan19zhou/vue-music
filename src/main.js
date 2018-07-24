import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import lazyload from 'vue-lazyload'
Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(lazyload)
import "common/stylus/index.styl"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
