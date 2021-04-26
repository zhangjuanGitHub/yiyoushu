/*
 * @Author: MaiChao
 * @Date: 2021-01-28 11:16:35
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-05 15:22:08
 */
const state = {
  userInfo: null, // 用户信息
  token: sessionStorage.getItem(`token`) || ``,
  noReadMessageNum: null, // 未读系统消息
  chatMessageList: [], // 站内消息列表（聊天）
  chatMessageNum: 0, // 站内消息条数，控制查看更多显示隐藏
  singleScrollBottom: [], // 单发信息，每次滚动到最底部
  messageChat: {} // 判断外层列表是否有当前条新消息，有则消息状态改为有消息，没有则新添加一条
}
const mutations = {
  // 获取token
  userToken (state, val) {
    sessionStorage.setItem(`token`, val)
    state.token = val
  },
  // 获取用户信息
  userInfo (state, val) {
    state.userInfo = val
    state.noReadMessageNum = val.noReadMessageNum // 消息数量
  },
  // 退出
  userSignout (state) {
    state.userInfo = null
    state.token = null
    sessionStorage.clear()
  }
}
const actions = {
  updateToken (context, value) {
    context.commit('setToken', value)
  },
  updateUserInfo (context, value) {
    context.commit('setUserInfo', value)
  },
  updateRoleInfoList (context, value) {
    context.commit('setRoleInfoList', value)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
