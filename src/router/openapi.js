/*
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-28 11:13:04
 * @LastEditors:
 * @LastEditTime: 2021-02-01 11:09:26
 */
module.exports = [
  {
    path: '/openapi/gettoken',
    name: 'GetToken',
    meta: {
      title: '获取Token'
    },
    component: () => import('@/views/openapi/GetToken')
  },
  {
    path: '/openapi/wx',
    name: 'OpenWxApi',
    meta: {
      title: '微信接口'
    },
    component: () => import('@/views/openapi/OpenWxApi'),
    children: [
      {
        path: 'article',
        name: 'WxArticle',
        meta: {
          title: '微信文章api'
        },
        component: () => import('@/views/openapi/wx/WxArticle')
      },
      {
        path: 'actions',
        name: 'WxActionsData',
        meta: {
          title: '微信评论api'
        },
        component: () => import('@/views/openapi/wx/WxActionsData')
      },
      {
        path: 'account',
        name: 'WxAccountMsg',
        meta: {
          title: '微信转评赞api'
        },
        component: () => import('@/views/openapi/wx/WxAccountMsg')
      }
    ]
  }
]
