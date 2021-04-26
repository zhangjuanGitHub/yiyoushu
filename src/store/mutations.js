/*
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-02-23 10:55:52
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-05 15:14:21
 */
const state = {
  prevUrlName: null,
  captchaInfo: {}, // 登录信息（验证码、网站名称、是否登陆、token）
  setWebSiteName: '' // 网站名称
}
const mutations = {
  // 登录信息（验证码、网站名称、是否登陆、token）
  setLoginInfo (state, valJson) {
    state.captchaInfo = valJson
  },
  // 单独网站名称
  setWebSiteName (state, val) {
    state.setWebSiteName = val
  },
  // 清除url
  clearPrevUrlName (state, val) {
    state.prevUrlName = val
    console.log(val)
  },
  // 保存url
  prevUrlName (state, val) {
    state.prevUrlName = val
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
