/*
 * @Author: MaiChao
 * @Date: 2021-05-13 15:11:30
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-05-13 15:36:22
 */
module.exports = [
  // 推送页面
  {
    path: '/monitor/components/pushpage',
    name: 'PushPage',
    meta: {
      title: '推送页面'
    },
    component: () => import('@/views/monitor/components/PushPage')
  }
  // {
  //   path: '/custom/custom',
  //   name: 'Custom',
  //   meta: {
  //     title: '推送页面'
  //   },
  //   component: () => import('@/views/custom/Custom')
  // },
  // {
  //   path: '/custom/submit',
  //   name: 'SubmitCustom',
  //   meta: {
  //     title: '提交申请'
  //   },
  //   component: () => import('@/views/custom/Submit')
  // }
]
