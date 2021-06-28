/*
 * @Author: MaiChao
 * @Date: 2021-01-28 11:16:35
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-05-31 15:35:46
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-05-25 17:25:52
 */
module.exports = [
  {
    path: '/monitor/account/',
    name: 'Account',
    meta: {
      title: '账号监测'
    },
    component: () => import('@/views/monitor/Account'),
    children: [
      {
        path: 'company',
        name: 'AccountCompany',
        meta: {
          title: '微信账号监测'
        },
        component: () => import('@/views/monitor/account/AccountCompany')
      },
      {
        path: 'blogger',
        name: 'AccountBlogger',
        meta: {
          title: '微博博主'
        },
        component: () => import('@/views/monitor/account/AccountBlogger')
      },
      {
        path: 'follow',
        name: 'AccountFollow',
        meta: {
          title: 'aa'
        },
        component: () => import('@/views/monitor/account/AccountFollow')
      }
    ]
  },
  {
    path: '/monitor/compare/',
    name: 'Compare',
    meta: {
      title: '账号对比'
    },
    component: () => import('@/views/monitor/Compare'),
    children: [
      // {
      //   path: 'account',
      //   name: 'AccountCompare',
      //   meta: {
      //     title: '账号对比'
      //   },
      //   component: () => import('@/views/monitor/compare/AccountCompare')
      // },
      {
        path: 'newaccount',
        name: 'NewAccCompare',
        meta: {
          title: '账号对比'
        },
        component: () => import('@/views/monitor/compare/NewAccCompare')
      },
      // {
      //   path: 'depart',
      //   name: 'DepartCompare',
      //   meta: {
      //     title: '单位对比'
      //   },
      //   component: () => import('@/views/monitor/compare/DepartCompare')
      // },
      {
        path: 'newdepart',
        name: 'NewDepCompare',
        meta: {
          title: '单位对比'
        },
        component: () => import('@/views/monitor/compare/NewDepCompare')
      }
    ]
  },
  {
    path: '/monitor/content/sensitive/analyse',
    name: 'SensitiveAnalyse',
    meta: {
      title: '错敏监测-分析'
    },
    component: () => import('@/views/monitor/content/SensitiveAnalyse')
  },
  {
    path: '/monitor/content/sensitive/article',
    name: 'SensitiveArticle',
    meta: {
      title: '错敏监测-文章'
    },
    component: () => import('@/views/monitor/content/SensitiveArticle')
  },
  {
    path: '/monitor/content/',
    name: 'Content',
    meta: {
      title: '内容监测'
    },
    component: () => import('@/views/monitor/Content'),
    children: [
      {
        path: 'prescription',
        name: 'Prescription',
        meta: {
          title: '发布时效监测'
        },
        component: () => import('@/views/monitor/content/Prescription')
      },
      {
        path: 'prescriptionwb',
        name: 'PrescriptionWb',
        meta: {
          title: '发布时效监测'
        },
        component: () => import('@/views/monitor/content/PrescriptionWb')
      },
      {
        path: 'sensitive',
        name: 'Sensitive',
        meta: {
          title: '错敏监测'
        },
        component: () => import('@/views/monitor/content/Sensitive')
      },
      {
        path: 'realtime',
        name: 'Realtime',
        meta: {
          title: '实时监测'
        },
        component: () => import('@/views/monitor/content/Realtime')
      },
      {
        path: 'interaction',
        name: 'Interaction',
        meta: {
          title: '互动性监测'
        },
        component: () => import('@/views/monitor/content/Interaction')
      },
      {
        path: 'relevant',
        name: 'Relevant',
        meta: {
          title: '相关性分析'
        },
        component: () => import('@/views/monitor/content/Relevant')
      },
      {
        path: 'spread',
        name: 'Spread',
        meta: {
          title: '传播分析'
        },
        component: () => import('@/views/monitor/content/Spread')
      }
    ]
  },
  {
    path: '/monitor/content/articledetail',
    name: 'ArticleDetail',
    meta: {
      title: '文章详情'
    },
    component: () => import('@/views/monitor/content/ArticleDetail')
  },
  {
    path: '/monitor/content/similarity',
    name: 'Similarity',
    meta: {
      title: '相似度'
    },
    component: () => import('@/views/monitor/content/Similarity')
  },
  {
    path: '/monitor/content/relevantdetail',
    name: 'RelevantDetail',
    meta: {
      title: '相关监测列表'
    },
    component: () => import('@/views/monitor/content/RelevantDetail')
  },
  {
    path: '/monitor/content/relevantdetailWb',
    name: 'RelevantDetailWb',
    meta: {
      title: '相关监测微博详情页'
    },
    component: () => import('@/views/monitor/content/RelevantDetailWb')
  },
  {
    path: '/monitor/analysis/',
    name: 'Analysis',
    meta: {
      title: '账号分析'
    },
    component: () => import('@/views/monitor/Analysis'),
    children: [
      {
        path: 'wx',
        name: 'WxAnalysis',
        meta: {
          title: '公众号分析'
        },
        component: () => import('@/views/monitor/analysis/WxAnalysis')
      },
      {
        path: 'bloggeranalysis',
        name: 'BloggerAnalysis',
        meta: {
          title: '微博分析'
        },
        component: () => import('@/views/monitor/analysis/BloggerAnalysis')
      }
    ]
  },
  {
    path: '/monitor/analysis/weekdetail',
    name: 'WeekDetail',
    meta: {
      title: '周-诊断历史'
    },
    component: () => import('@/views/monitor/analysis/WeekDetail')
  },
  {
    path: '/monitor/analysis/monthdetail',
    name: 'MonthDetail',
    meta: {
      title: '月-诊断历史'
    },
    component: () => import('@/views/monitor/analysis/MonthDetail')
  },
  {
    path: '/monitor/analysis/weekdetailwb',
    name: 'WeekDetailWb',
    meta: {
      title: '周-诊断历史-微博'
    },
    component: () => import('@/views/monitor/analysis/WeekDetailWb')
  },
  {
    path: '/monitor/minute/',
    name: 'Minute',
    meta: {
      title: '分钟级监测'
    },
    component: () => import('@/views/monitor/Minute'),
    children: [
      {
        path: 'wxminute',
        name: 'WxMinuteBox',
        meta: {
          title: '公众号监测'
        },
        component: () => import('@/views/monitor/minute/WxMinuteBox')
      },
      {
        path: 'wbminute',
        name: 'WbMinuteBox',
        meta: {
          title: '微博监测'
        },
        component: () => import('@/views/monitor/minute/WbMinuteBox')
      },
      // {
      //   path: 'minutearticle',
      //   name: 'MinuteArticle',
      //   meta: {
      //     title: '文章即时监测'
      //   },
      //   component: () => import('@/views/monitor/minute/MinuteArticle')
      // },
      // {
      //   path: 'minuteaccount',
      //   name: 'MinuteAccount',
      //   meta: {
      //     title: '账号预约监测'
      //   },
      //   component: () => import('@/views/monitor/minute/MinuteAccount')
      // },
      {
        path: 'minuteall',
        name: 'MinuteAll',
        meta: {
          title: '批量预约监测'
        },
        component: () => import('@/views/monitor/minute/MinuteAll')
      },
      {
        path: 'minutelist',
        name: 'MinuteList',
        meta: {
          title: '监测列表'
        },
        component: () => import('@/views/monitor/minute/MinuteList')
      },
      {
        path: 'minuterevise',
        name: 'MinuteRevise',
        meta: {
          title: '修改预约监测'
        },
        component: () => import('@/views/monitor/minute/MinuteRevise')
      }
    ]
  },
  {
    path: '/monitor/minute/listdetail', // 微信
    name: 'ListDetail',
    meta: {
      title: '查看详情'
    },
    component: () => import('@/views/monitor/minute/ListDetail')
  },
  {
    path: '/monitor/minute/wbdetail', // 微博
    name: 'WbMinuteDetails',
    meta: {
      title: '查看详情'
    },
    component: () => import('@/views/monitor/minute/WbMinuteDetails')
  },
  {
    path: '/monitor/wrong/',
    name: 'Wrong',
    meta: {
      title: '账号违规监测'
    },
    component: () => import('@/views/monitor/Wrong'),
    children: [
      {
        path: 'index',
        name: 'WrongIndex',
        meta: {
          title: '账号违规监测'
        },
        component: () => import('@/views/monitor/wrong/WrongIndex')
      },
      {
        path: 'list',
        name: 'WrongList',
        meta: {
          title: '监测列表'
        },
        component: () => import('@/views/monitor/wrong/WrongList')
      }
    ]
  },
  {
    path: '/monitor/wrong/detail',
    name: 'WrongDetailBox',
    meta: {
      title: '账号详情'
    },
    component: () => import('@/views/monitor/wrong/WrongDetailBox')
  },
  {
    path: '/monitor/whole',
    name: 'Whole',
    meta: {
      title: '全局账号信息'
    },
    component: () => import('@/views/monitor/Whole')
    // children: [
    //   {
    //     path: 'search',
    //     name: 'WrongSearch',
    //     meta: {
    //       title: '账号搜索'
    //     },
    //     component: () => import('@/views/monitor/wrong/WrongSearch')
    //   }
    // ]
  },
  {
    path: '/monitor/center/trenddetail',
    name: 'TrendDetail',
    meta: {
      title: '趋势查询结果'
    },
    component: () => import('@/views/monitor/center/TrendDetail')
  },
  {
    path: '/monitor/center/',
    name: 'Center',
    meta: {
      title: '数据智能中心'
    },
    component: () => import('@/views/monitor/Center'),
    children: [
      {
        path: 'wechatwarninglist',
        name: 'WechatWarningList',
        meta: {
          title: '关键词设置'
        },
        component: () => import('@/views/monitor/center/WechatWarningList')
      },
      {
        path: 'wechatwarning',
        name: 'WechatWarning',
        meta: {
          title: '预警账号'
        },
        component: () => import('@/views/monitor/center/WechatWarning')
      },
      {
        path: 'hitarticlelist',
        name: 'HitArticleList',
        meta: {
          title: '预警记录'
        },
        component: () => import('@/views/monitor/center/HitArticleList')
      },
      {
        path: 'trendquery',
        name: 'TrendQuery',
        meta: {
          title: '趋势查询'
        },
        component: () => import('@/views/monitor/center/TrendQuery')
      },

      {
        path: 'backtrack',
        name: 'MonitorBacktrack',
        meta: {
          title: '数据回溯'
        },
        component: () => import('@/views/monitor/center/MonitorBacktrack')
      },
      {
        path: 'centersens',
        name: 'CenterSensity',
        meta: {
          title: '错敏检查'
        },
        component: () => import('@/views/monitor/center/CenterSensity')
      }
    ]
  }
  // // 推送页面
  // {
  //   path: '/monitor/components/pushpage',
  //   name: 'PushPage',
  //   meta: {
  //     title: '推送页面'
  //   },
  //   component: () => import('@/views/monitor/components/PushPage')
  // }

]
