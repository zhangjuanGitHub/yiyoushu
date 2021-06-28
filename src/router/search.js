/*
 * @Author: zhangjuan
 * @Description: search
 * @Date: 2021-02-01 11:07:53
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-05-25 10:43:17
 */
module.exports = [
  {
    path: '/search/morehotwx',
    name: 'MoreHotWx',
    meta: {
      title: '微信文章'
    },
    component: () => import('@/views/search/MoreHotWx')
  },
  {
    path: '/search/morehotwb',
    name: 'MoreHotWb',
    meta: {
      title: '微博文章'
    },
    component: () => import('@/views/search/MoreHotWb')
  },
  {
    path: '/search/accountlistwx',
    name: 'AccountListWx',
    meta: {
      title: '微信账号列表'
    },
    component: () => import('@/views/search/AccountListWx')
  },
  {
    path: '/search/accountlistwb',
    name: 'AccountListWb',
    meta: {
      title: '微博账号列表'
    },
    component: () => import('@/views/search/AccountListWb')
  },
  {
    path: '/search/drilldetails',
    name: 'DrillDetails',
    meta: {
      title: '详情'
    },
    component: () => import('@/views/search/DrillDetails')
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
    path: '/searched/accountwx/analyse',
    name: 'ArticleAnalyse',
    meta: {
      title: '文章分析'
    },
    component: () => import('@/views/search/accountwx/ArticleAnalyse')
  },
  {
    path: '/searched/accountwb/details',
    name: 'TweetsDetails',
    meta: {
      title: '文章详情'
    },
    component: () => import('@/views/search/accountwb/TweetsDetails')
  },
  {
    path: '/searched/accountwx/',
    component: () => import('@/views/search/SearchWxBox'),
    children: [
      {
        path: 'material',
        name: 'AccountMaterial',
        meta: {
          title: '账号资料'
        },
        component: () => import('@/views/search/accountwx/AccountMaterial')
      },
      {
        path: 'class',
        name: 'ArticleClass',
        meta: {
          title: '文章类别'
        },
        component: () => import('@/views/search/accountwx/ArticleClass')
      },
      {
        path: 'data',
        name: 'BasicData',
        meta: {
          title: '基础数据统计'
        },
        component: () => import('@/views/search/accountwx/BasicData')
      },
      {
        path: 'backtrack',
        name: 'DataBacktrack',
        meta: {
          title: '公众号数据回溯'
        },
        component: () => import('@/views/search/accountwx/DataBacktrack')
      },
      {
        path: 'history',
        name: 'HistoryTweets',
        meta: {
          title: '历史推文'
        },
        component: () => import('@/views/search/accountwx/HistoryTweets')
      },
      {
        path: 'original',
        name: 'ReadOriginal',
        meta: {
          title: '阅读原文'
        },
        component: () => import('@/views/search/accountwx/ReadOriginal')
      },
      {
        path: 'rule',
        name: 'ReleaseRules',
        meta: {
          title: '发布规律'
        },
        component: () => import('@/views/search/accountwx/ReleaseRules')
      }
    ]
  },
  {
    path: '/searched/accountwb/',
    component: () => import('@/views/search/SearchWbBox'),
    children: [
      {
        path: 'data',
        name: 'BasicDataWb',
        meta: {
          title: '基础数据统计'
        },
        component: () => import('@/views/search/accountwb/BasicDataWb')
      },
      {
        path: 'history',
        name: 'HistoryTweetsWb',
        meta: {
          title: '历史推文'
        },
        component: () => import('@/views/search/accountwb/HistoryTweetsWb')
      },
      {
        path: 'rule',
        name: 'ReleaseRulesWb',
        meta: {
          title: '发布规律'
        },
        component: () => import('@/views/search/accountwb/ReleaseRulesWb')
      }
    ]
  }
]
