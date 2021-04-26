/*
 * @Author: zhangjuan
 * @Description: search
 * @Date: 2021-02-01 11:07:53
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-04-16 16:31:26
 */
module.exports = [
  {
    path: '/search/morehot',
    name: 'MoreHot',
    meta: {
      title: '文章'
    },
    component: () => import('@/views/search/MoreHot')
  },
  {
    path: '/search/accountlist',
    name: 'AccountList',
    meta: {
      title: '搜索账号列表'
    },
    component: () => import('@/views/search/AccountList')
  },
  {
    path: '/searched/addaccount',
    name: 'AddAccount',
    meta: {
      title: '添加账号'
    },
    component: () => import('@/views/search/AddAccount')
  },
  {
    path: '/searched/account/analyse',
    name: 'ArticleAnalyse',
    meta: {
      title: '文章分析'
    },
    component: () => import('@/views/search/account/ArticleAnalyse')
  },
  {
    path: '/searched/account/',
    component: () => import('@/views/search/SearchBox'),
    children: [
      {
        path: 'material',
        name: 'AccountMaterial',
        meta: {
          title: '账号资料'
        },
        component: () => import('@/views/search/account/AccountMaterial')
      },
      {
        path: 'class',
        name: 'ArticleClass',
        meta: {
          title: '文章类别'
        },
        component: () => import('@/views/search/account/ArticleClass')
      },
      {
        path: 'data',
        name: 'BasicData',
        meta: {
          title: '基础数据统计'
        },
        component: () => import('@/views/search/account/BasicData')
      },
      {
        path: 'backtrack',
        name: 'DataBacktrack',
        meta: {
          title: '公众号数据回溯'
        },
        component: () => import('@/views/search/account/DataBacktrack')
      },
      {
        path: 'history',
        name: 'HistoryTweets',
        meta: {
          title: '历史推文'
        },
        component: () => import('@/views/search/account/HistoryTweets')
      },
      {
        path: 'original',
        name: 'ReadOriginal',
        meta: {
          title: '阅读原文'
        },
        component: () => import('@/views/search/account/ReadOriginal')
      },
      {
        path: 'rule',
        name: 'ReleaseRules',
        meta: {
          title: '发布规律'
        },
        component: () => import('@/views/search/account/ReleaseRules')
      }
    ]
  }
]
