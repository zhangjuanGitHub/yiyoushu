<!--
 * @Author: zhangjuan
 * @Description: 
 * @Date: 2021-03-08 10:43:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-09 10:38:48
-->
<template>
  <div class="interaction content-box">
    <div class="tabs-header">
      <span class="tabs-title" :class="activeTab==='account'?'isActive':''">账号对比</span>
    </div>
    <div class="account-compare-wrap">
      <compare-detail></compare-detail>
    </div>
  </div>
</template>
<script>
import compareDetail from './CompareDetail'
export default {
  components: {
    compareDetail
  },
  data () {
    return {
      activeTab: 'account',
    }
  }
}
</script>
<style>
</style>
<style scoped>
@import '../monitor.css';
@import './compare.css';
</style>