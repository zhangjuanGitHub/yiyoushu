/*
 * @Author: MaiChao
 * @Date: 2021-03-09 18:59:16
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-09 09:43:35
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
    path: '/assess/personal/dataexplain',
    name: 'DataExplain',
    meta: {
      title: '数据榜单说明'
    },
    component: () => import('@/views/assess/personal/DataExplain')
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
    path: '/assess/personal/video',
    name: 'PercinVideo',
    meta: {
      title: '企业视频榜单'
    },
    component: () => import('@/views/assess/personal/PercinVideo')
  },
  {
    path: '/assess/official',
    name: 'Official',
    meta: {
      title: '政法榜单'
    },
    component: () => import('@/views/assess/Official')
  },
  {
    path: '/assess/official/article',
    name: 'OfficialArticle',
    meta: {
      title: '政法文章榜单'
    },
    component: () => import('@/views/assess/official/OfficialArticle')
  },
  {
    path: '/assess/official/video',
    name: 'OfficialVideo',
    meta: {
      title: '政法视频榜单'
    },
    component: () => import('@/views/assess/official/OfficialVideo')
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
      title: '我的榜单详情-公众号'
    },
    component: () => import('@/views/assess/customize/CustimizeDetail')
  },
  {
    path: '/assess/customize/custimizearticle',
    name: 'CustimizeArticle',
    meta: {
      title: '我的榜单详情-文章'
    },
    component: () => import('@/views/assess/customize/CustimizeArticle')
  },
  {
    path: '/assess/customize/custimizevideo',
    name: 'CustimizeVideo',
    meta: {
      title: '我的榜单详情-视频'
    },
    component: () => import('@/views/assess/customize/CustimizeVideo')
  }
]
