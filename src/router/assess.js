/*
 * @Author: MaiChao
 * @Date: 2021-03-09 18:59:16
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-18 11:31:33
 */
module.exports = [
  {
    path: '/assess/personal',
    name: 'Personal',
    meta: {
      title: '企业个人榜单'
    },
    component: () => import('@/views/assess/Personal')
  },
  {
    path: '/assess/personal/article',
    name: 'PercinArticle',
    meta: {
      title: '企业文章榜单'
    },
    component: () => import('@/views/assess/personal/PercinArticle')
  },
  {
    path: '/assess/official/article',
    name: 'OfficialArticle',
    meta: {
      title: '政府榜单'
    },
    component: () => import('@/views/assess/official/OfficialArticle')
  },
  {
    path: '/assess/official',
    name: 'Official',
    meta: {
      title: '政府文章榜单'
    },
    component: () => import('@/views/assess/Official')
  },
  {
    path: '/assess/customize',
    name: 'Customize',
    meta: {
      title: '自定义榜单'
    },
    component: () => import('@/views/assess/Customize')
  },
  {
    path: '/assess/customize/custimizedetail',
    name: 'CustimizeDetail',
    meta: {
      title: '我的榜单详情'
    },
    component: () => import('@/views/assess/customize/CustimizeDetail')
  }
]
