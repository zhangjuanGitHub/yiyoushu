import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import api from './api/api'
import axios from 'axios'
import ELEMENT from 'element-ui'
Vue.use(ELEMENT)

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$http = axios

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
