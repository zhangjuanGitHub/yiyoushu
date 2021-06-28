/*
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-28 11:13:04
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-06-01 09:54:32
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import mutations from './mutations'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    mutations
  },
  strict: debug,
  plugins: [
    createPersistedState({
      key: 'user',
      storage: window.sessionStorage
    })
  ]
})
