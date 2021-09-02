/*
 * @Author: MaiChao
 * @Date: 2021-03-09 18:59:16
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-08-03 16:08:30
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
  // {
  //   path: '/assess/personal/articleWb',
  //   name: 'PercinArticleWb',
  //   meta: {
  //     title: '企业文章榜单-微博'
  //   },
  //   component: () => import('@/views/assess/personal/PercinArticleWb')
  // },
  {
    path: '/assess/personal/video',
    name: 'PercinVideo',
    meta: {
      title: '企业视频榜单'
    },
    component: () => import('@/views/assess/personal/PercinVideo')
  },
  // {
  //   path: '/assess/personal/videoWb',
  //   name: 'PercinVideoWb',
  //   meta: {
  //     title: '企业视频榜单-微博'
  //   },
  //   component: () => import('@/views/assess/personal/PercinVideoWb')
  // },
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
    path: '/assess/justice',
    name: 'Justice',
    meta: {
      title: '正义网榜单'
    },
    component: () => import('@/views/assess/Justice')
  },
  {
    path: '/assess/justice/justiceadd',
    name: 'JusticeAdd',
    meta: {
      title: '正义网榜单添加'
    },
    component: () => import('@/views/assess/justice/JusticeAdd')
  },
  {
    path: '/assess/justice/justicelist',
    name: 'JusticeList',
    meta: {
      title: '正义网榜单列表'
    },
    component: () => import('@/views/assess/justice/JusticeList')
  },
  {
    path: '/assess/justice/justicedetailwx',
    name: 'JusticeDetailWx',
    meta: {
      title: '正义网榜单微信详情'
    },
    component: () => import('@/views/assess/justice/JusticeDetailWx')
  },
  {
    path: '/assess/justice/justicedetailwb',
    name: 'JusticeDetailWb',
    meta: {
      title: '正义网榜单微博详情'
    },
    component: () => import('@/views/assess/justice/JusticeDetailWb')
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
    path: '/assess/customize/custimizewbdetail',
    name: 'CustimizeWbDetail',
    meta: {
      title: '我的榜单详情-微博'
    },
    component: () => import('@/views/assess/customize/CustimizeWbDetail')
  },
  {
    path: '/assess/customize/custimizetoutiaodetail',
    name: 'CustimizeToutiaoDetail',
    meta: {
      title: '我的榜单详情-头条'
    },
    component: () => import('@/views/assess/customize/CustimizeToutiaoDetail')
  },
  {
    path: '/assess/customize/custimizedouyindetail',
    name: 'CustimizeDouyinDetail',
    meta: {
      title: '我的榜单详情-抖音'
    },
    component: () => import('@/views/assess/customize/CustimizeDouyinDetail')
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
    path: '/assess/customize/custimizewbarticle',
    name: 'CustimizeWbArticle',
    meta: {
      title: '我的榜单详情-文章-微博'
    },
    component: () => import('@/views/assess/customize/CustimizeWbArticle')
  },
  {
    path: '/assess/customize/custimizevideo',
    name: 'CustimizeVideo',
    meta: {
      title: '我的榜单详情-视频'
    },
    component: () => import('@/views/assess/customize/CustimizeVideo')
  },
  {
    path: '/assess/customize/custimizewbvideo',
    name: 'CustimizeWbVideo',
    meta: {
      title: '我的榜单详情-视频-微博'
    },
    component: () => import('@/views/assess/customize/CustimizeWbVideo')
  },
  {
    path: '/assess/customize/custimizetoutiaoarticle',
    name: 'CustimizeToutiaoArticle',
    meta: {
      title: '我的榜单详情-文章-头条'
    },
    component: () => import('@/views/assess/customize/CustimizeToutiaoArticle')
  },
  {
    path: '/assess/customize/custimizetoutiaovideo',
    name: 'CustimizeToutiaoVideo',
    meta: {
      title: '我的榜单详情-视频-头条'
    },
    component: () => import('@/views/assess/customize/CustimizeToutiaoVideo')
  },
  {
    path: '/assess/customize/custimizedouyinvideo',
    name: 'CustimizeDouyinVideo',
    meta: {
      title: '我的榜单详情-视频-抖音'
    },
    component: () => import('@/views/assess/customize/CustimizeDouyinVideo')
  }
]
