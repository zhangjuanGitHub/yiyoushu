<!--
 * @Author: MaiChao
 * @Date: 2021-03-15 16:16:36
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-06-28 18:10:35
-->
<template>
  <div class="contents">
    <div class="official account-box">
      <div class="tabs-header">
        <span class="tabs-title"
              @click="tabsAll('createTask', 1)"
              :class="this.activeTab==='createTask'?'isActive':''">权重设置</span>
        <span class="tabs-title"
              @click="tabsAll('taskList', 2)"
              :class="this.activeTab==='taskList'?'isActive':''">榜单列表</span>
        <!-- <span class="right-btn cursor"
              @click="openCust"><i class="el-icon-s-data"></i>自定义榜单</span> -->
      </div>
      <div class="">
        <justice-add v-if="this.activeTab==='createTask'"
                       @changeTab="tabsAll"></justice-add>
      <justice-list v-if="this.activeTab==='taskList'"></justice-list>
      </div>
    </div>
  </div>
</template>
<script>
import justiceAdd from './justice/JusticeAdd'
import justiceList from './justice/JusticeList'
// import { exportTable } from '@/lib/tools'
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
export default {
  components: {
    justiceAdd,
    justiceList
  },
  data () {
    return {
      activeTab: 'createTask'
    }
  },
  created () {
    // this.getNewDate()
    // this.rankType()
    // if (this.$route.query.tab) {
    //   this.activeTab = this.$route.query.tab
    // }
    if (this.$route.query.active) {
      this.activeTab = this.$route.query.active
    }
    if (this.$route.query.tab) {
      this.activeTab = this.$route.query.tab
    }
  },
  methods: {
    // 微信/微博
    // tabsAll (name, level) {
    //   this.activeTab = name
    //   if (this.activeTab === 'wb') {
    //     console.log('微博')
    //     this.getListDataWb()
    //   } else {
    //     this.getListData()
    //   }
    // }
    tabsAll (tab) {
      this.$router.replace({ name: 'Justice', query: { tab: tab } })
      this.activeTab = tab
      console.log('Justice', tab, this.activeTab)
    }
    // 自定义榜单
    // openCust () {
    //   this.$router.push({ name: 'Customize' })
    // }
  }
}
</script>
<style lang="scss" scoped>
  @import './assess.css';
</style>
<style lang="scss" scoped>
.right-btn {
  color: #498bfe;
  float: right;
}
.right-btn i {
  margin-right: 5px;
  font-size: 18px;
}
.title-time {
  color: #252934;
  font-size: 22px;
  font-weight: 400;
  line-height: 55px;
}
.flex-ali-center {
  margin-bottom: 20px;
}
.el-radio-button {
  margin-right: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 0px;
}
.el-radio-button:last-child {
  margin: 0px;
}
.explain-box .el-select {
  width: 150px;
}
.from-box {
  margin: 20px 0;
}
.from-box .el-form-item {
  margin-right: 35px;
}
.quick-click {
  padding: 20px 0;
}
.click-box {
  width: 313px;
  height: 115px;
  text-align: center;
}
.click-name {
  font-size: 24px;
  font-weight: 400;
  color: #ffffff;
  margin-left: 15px;
}
.account-infor {
  // width: 200px;
  margin: 0 auto;
}
.account-infor img {
  height: 60px;
  width: 60px;
  margin-right: 20px;
}
.operate {
  font-size: 22px;
}
.collect {
  color: #3b82fe;
  line-height: 24px;
}
.addto {
  color: #f89408;
}
.search-box {
  text-align: center;
  margin: 30px 0;
}
.search-box .el-input {
  width: 470px;
  margin-right: 15px;
}
.show-box {
  width: 470px;
  border: 1px solid #e1e4e8;
}
.top-line {
  background-color: #f7f8fa;
}
.name-box {
  color: #3b82fe;
  border-bottom: 1px solid #e1e4e8;
}
.content-box {
  min-height: 182px;
}
.alone:hover {
  background-color: #f7f8fa;
}
.tip-span {
  color: red;
}
.radio-box .el-radio {
  margin-bottom: 10px;
}
.addUser .dialog-footer {
  display: block;
  text-align: center;
}
</style>
