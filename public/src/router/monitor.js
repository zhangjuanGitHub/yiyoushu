/*
 * @Author: MaiChao
 * @Date: 2021-01-28 11:16:35
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-19 09:57:37
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
      {
        path: 'account',
        name: 'AccountCompare',
        meta: {
          title: '账号对比'
        },
        component: () => import('@/views/monitor/compare/AccountCompare')
      },
      {
        path: 'depart',
        name: 'DepartCompare',
        meta: {
          title: '单位对比'
        },
        component: () => import('@/views/monitor/compare/DepartCompare')
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
    path: '/monitor/content',
    name: 'Content',
    meta: {
      title: '内容监测'
    },
    component: () => import('@/views/monitor/Content'),
    children: [
      {
        path: '/monitor/content/prescription',
        name: 'Prescription',
        meta: {
          title: '发布时效监测'
        },
        component: () => import('@/views/monitor/content/Prescription')
      },
      {
        path: '/monitor/content/sensitive',
        name: 'Sensitive',
        meta: {
          title: '错敏监测'
        },
        component: () => import('@/views/monitor/content/Sensitive')
      },
      {
        path: '/monitor/content/realtime',
        name: 'Realtime',
        meta: {
          title: '实时监测'
        },
        component: () => import('@/views/monitor/content/Realtime')
      },
      {
        path: '/monitor/content/interaction',
        name: 'Interaction',
        meta: {
          title: '互动性监测'
        },
        component: () => import('@/views/monitor/content/Interaction')
      },
      {
        path: '/monitor/content/relevant',
        name: 'Relevant',
        meta: {
          title: '相关性分析'
        },
        component: () => import('@/views/monitor/content/Relevant')
      },
      {
        path: '/monitor/content/spread',
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
    path: '/monitor/analysis/',
    name: 'Analysis',
    meta: {
      title: '公众号分析'
    },
    component: () => import('@/views/monitor/Analysis'),
    children: [
      {
        path: 'week',
        name: 'WeekSearch',
        meta: {
          title: '周分析'
        },
        component: () => import('@/views/monitor/analysis/WeekSearch')
      },
      {
        path: 'month',
        name: 'MonthSearch',
        meta: {
          title: '月分析'
        },
        component: () => import('@/views/monitor/analysis/MonthSearch')
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
    path: '/monitor/minute',
    name: 'Minute',
    meta: {
      title: '分钟级监测'
    },
    component: () => import('@/views/monitor/Minute'),
    children: [
      {
        path: '/monitor/minute/minutearticle',
        name: 'MinuteArticle',
        meta: {
          title: '文章即时监测'
        },
        component: () => import('@/views/monitor/minute/MinuteArticle')
      },
      {
        path: '/monitor/minute/minuteaccount',
        name: 'MinuteAccount',
        meta: {
          title: '账号预约监测'
        },
        component: () => import('@/views/monitor/minute/MinuteAccount')
      },
      {
        path: '/monitor/minute/minuteall',
        name: 'MinuteAll',
        meta: {
          title: '批量预约监测'
        },
        component: () => import('@/views/monitor/minute/MinuteAll')
      },
      {
        path: '/monitor/minute/minutelist',
        name: 'MinuteList',
        meta: {
          title: '监测列表'
        },
        component: () => import('@/views/monitor/minute/MinuteList')
      },
      {
        path: '/monitor/minute/minuterevise',
        name: 'MinuteRevise',
        meta: {
          title: '修改预约监测'
        },
        component: () => import('@/views/monitor/minute/MinuteRevise')
      }
    ]
  }, {
    path: '/monitor/minute/listdetail',
    name: 'ListDetail',
    meta: {
      title: '查看详情'
    },
    component: () => import('@/views/monitor/minute/ListDetail')
  },
  {
    path: '/monitor/backtrack',
    name: 'MonitorBacktrack',
    meta: {
      title: '数据回溯'
    },
    component: () => import('@/views/monitor/MonitorBacktrack')
  },
  {
    path: '/monitor/centersens',
    name: 'CenterSensity',
    meta: {
      title: '错敏检查'
    },
    component: () => import('@/views/monitor/CenterSensity')
  }
]
