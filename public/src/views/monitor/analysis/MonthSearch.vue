<!--
 * @Author: zhangjuan
 * @Date: 2021-03-17 19:18:56
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-04-20 15:32:46
-->
<template>
  <div class="interaction content-box">
    <div class="tabs-header">
      <span class="tabs-title" @click="tabsAll('add')" :class="activeTab === 'add'?'isActive':''">添加任务</span>
      <span class="tabs-title" @click="tabsAll('list')"  :class="activeTab === 'list'?'isActive':''">任务列表</span>
    </div>
    <div class="week-analyse-main">
      <task-add v-if="activeTab === 'add'"
                @changeTab="tabsAll"></task-add>
      <task-list v-else></task-list>
    </div>
  </div>
</template>
<script>
import taskAdd from './TaskAdd'
import taskList from './TaskList'
export default {
  components: {
    taskAdd,
    taskList
  },
  data () {
    return {
      activeTab: 'add'
    }
  },
  methods: {
    tabsAll (tab) {
      this.activeTab = tab
    }
  },
  created () {
    if (this.$route.query.tab) {
      this.activeTab = this.$route.query.tab
    }
  }
}
</script>
<style scoped>
@import '../monitor.css';
.week-analyse-main {
  margin: 20px;
}
</style>
