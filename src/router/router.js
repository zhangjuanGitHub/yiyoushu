import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
// import monitor from './monitor'
// import assess from './assess'
// import openapi from './openapi'
// import custom from './custom'
// import setting from './setting'

Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
]
// routes = routes.concat(monitor) // 新媒体监测
// routes = routes.concat(assess) // 榜单
// routes = routes.concat(openapi) // 开放API
// routes = routes.concat(custom) // 定制数据
// routes = routes.concat(setting) // 个人中心
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
