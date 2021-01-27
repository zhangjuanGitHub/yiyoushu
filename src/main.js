import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import api from './api/api'
import axios from 'axios'
import ElementUI from 'element-ui'
// import './assets/css/reset.css'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$http = axios
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
