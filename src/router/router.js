/*
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-28 11:13:04
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-05-13 15:32:59
 */
import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store/store'
import Home from '@/views/Home.vue'
import Login from '@/views/auth/Login.vue'
import monitor from './monitor'
import assess from './assess'
import openapi from './openapi'
import custom from './custom'
import setting from './setting'
import search from './search'
import mobile from './mobile'
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalPush = Router.prototype.push
// Router.prototype.push = function push (location) {
//   return originalPush.call(this, location)
// }
Vue.use(Router)

let routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/auth/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页'
    },
    component: Home
  }
]
routes = routes.concat(monitor) // 新媒体监测
routes = routes.concat(assess) // 榜单
routes = routes.concat(openapi) // 开放API
routes = routes.concat(custom) // 定制数据
routes = routes.concat(setting) // 个人中心
routes = routes.concat(search) // 账号搜索
routes = routes.concat(mobile) // 推送页面
// console.log(routes)
// const routesM = [{
//   path: '/',
//   name: 'PushPage',
//   component: () => import('@/views/monitor/components/PushPage')
// }]
// // var routes = [];
// if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
//   routes = routesM
// }
const router = new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? 'yys' : '/',
  routes,
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  next()
  // meta title
  let routeWebsiteName = '行业新媒体数据监测-易有数'
  if (to.meta.title) {
    if (to.meta.title === '首页') {
      document.title = routeWebsiteName
    } else {
      document.title = to.meta.title + '-' + routeWebsiteName
    }
  } else {
    document.title = routeWebsiteName
  }
})
export default router
