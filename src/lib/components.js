/*
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-02-03 17:29:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-04 11:13:07
 */
import homeSearch from '@/components/HomeSearch'
import setPage from '@/components/SetPage'
export default (Vue) => {
  Vue.component('homeSearch', homeSearch)
  Vue.component('setPage', setPage)
}
