/*
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-28 11:13:04
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-04-20 17:23:09
 */
module.exports = [
  {
    path: '/custom/custom',
    name: 'Custom',
    meta: {
      title: '数据定制'
    },
    component: () => import('@/views/custom/Custom')
  },
  {
    path: '/custom/submit',
    name: 'SubmitCustom',
    meta: {
      title: '提交申请'
    },
    component: () => import('@/views/custom/Submit')
  }
]
