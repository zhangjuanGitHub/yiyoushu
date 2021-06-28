<!--
 * @Author: MaiChao
 * @@Description: 监测列表
 * @Date: 2021-03-02 14:09:45
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-06-03 17:56:37
-->
<template>
  <div class="minute-list">
    <div class="tabs-header">
      <span class="tabs-title"
            @click="tabsAll('wx')"
            :class="activeTab ==='wx'?'isActive':''">微信监测列表</span>
      <span class="tabs-title"
            @click="tabsAll('wb')"
            :class="activeTab ==='wb'?'isActive':''">微博监测列表</span>
    </div>
    <wx-list v-if="activeTab ==='wx'"></wx-list>
    <wb-list v-else></wb-list>
  </div>
</template>
<script>
import wxList from './WxMinuteList'
import wbList from './WbMinuteList'
export default {
  components: { wxList, wbList },
  data () {
    return {
      activeTab: 'wx',
      formInline: {
        actualId: '',
        processState: '',
        article: '',
        data: [],
        startDate: '',
        endDate: '',
        radio: 1,
        pageBean: {
          pageSize: 10,
          pageNum: 1
        }
      }
    }
  },
  created () {
    if (this.$route.query.tab) {
      this.activeTab = this.$route.query.tab
    }
  },
  methods: {
    tabsAll (tab) {
      this.activeTab = tab
      this.$router.replace({ name: 'MinuteList', query: { tab: tab } })
    }
  }
}
</script>
<style scoped>
</style>
