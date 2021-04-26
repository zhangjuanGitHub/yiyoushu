/*
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-28 11:10:50
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-10 14:49:18
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import api from './api/api'
import axios from './lib/axios'
import ElementUI from 'element-ui'
import './assets/css/reset.css'
import './assets/css/app.scss'
import './assets/css/public.css'
import components from './lib/components' // 全局组件

// Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.use(components)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
