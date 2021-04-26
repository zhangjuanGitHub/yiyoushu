/*
 * @Author: MaiChao
 * @Date: 2021-01-28 11:16:35
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-15 10:06:59
 */
module.exports = [
  {
    path: '/setting/manage',
    name: 'Manage',
    meta: {
      title: '账号管理'
    },
    component: () => import('@/views/setting/Manage'),
    children: [
      {
        path: '/setting/manage/company',
        name: 'Company',
        meta: {
          title: '单位账号'
        },
        component: () => import('@/views/setting/manage/Company')
      },
      {
        path: '/setting/manage/collection',
        name: 'Collection',
        meta: {
          title: '公众号收藏'
        },
        component: () => import('@/views/setting/manage/Collection')
      }
    ]
  }, {
    path: '/setting/myinfo',
    name: 'MyInfo',
    meta: {
      title: '我的资料'
    },
    component: () => import('@/views/setting/MyInfo'),
    children: [
      {
        path: '/setting/myinfo/password',
        name: 'Password',
        meta: {
          title: '修改密码'
        },
        component: () => import('@/views/setting/myinfo/Password')
      },
      {
        path: '/setting/myinfo/phone',
        name: 'Phone',
        meta: {
          title: '手机账号绑定'
        },
        component: () => import('@/views/setting/myinfo/Phone')
      },
      {
        path: '/setting/myinfo/unitattestation',
        name: 'UnitAttestation',
        meta: {
          title: '单位认证'
        },
        component: () => import('@/views/setting/myinfo/UnitAttestation')
      },
      {
        path: '/setting/myinfo/mynews',
        name: 'MyNews',
        meta: {
          title: '我的消息'
        },
        component: () => import('@/views/setting/myinfo/MyNews')
      }
    ]
  },
  {
    path: '/setting/backtrack',
    name: 'BackTrack',
    meta: {
      title: '账号回溯'
    },
    component: () => import('@/views/setting/BackTrack')
  }
]
