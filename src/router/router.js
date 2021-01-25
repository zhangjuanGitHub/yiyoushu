import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import monitor from './monitor'
import assess from './assess'
import api from './api'
import custom from './custom'
import setting from './setting'

Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
routes = routes.concat(monitor) // 新媒体监测
routes = routes.concat(assess) // 榜单
routes = routes.concat(api) // 开放API
routes = routes.concat(custom) // 定制数据
routes = routes.concat(setting) // 个人中心
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
