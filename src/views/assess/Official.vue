<!--
 * @Author: MaiChao
 * @Date: 2021-03-15 16:16:36
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-08-03 15:23:32
-->
<template>
  <div class="contents">
    <div class="official account-box">
      <div class="tabs-header">
        <span class="tabs-title"
              @click="tabsAll('wx', 1)"
              :class="this.activeTab==='wx'?'isActive':''">微信榜单</span>
        <span class="tabs-title"
              @click="tabsAll('wb', 2)"
              :class="this.activeTab==='wb'?'isActive':''">微博榜单</span>
        <span class="tabs-title"
              @click="tabsAll('toutiao', 3)"
              :class="this.activeTab==='toutiao'?'isActive':''">头条榜单</span>
        <span class="tabs-title"
              @click="tabsAll('douyin', 4)"
              :class="this.activeTab==='douyin'?'isActive':''">抖音榜单</span>
        <span class="right-btn cursor"
              @click="openCust"><i class="el-icon-s-data"></i>自定义榜单</span>
      </div>
      <div class="conts-box">
        <official-wx v-if="this.activeTab==='wx'"
                     @changeTab="tabsAll"></official-wx>
        <official-wb v-if="this.activeTab==='wb'"></official-wb>
        <official-toutiao v-if="this.activeTab==='toutiao'"></official-toutiao>
        <official-douyin v-if="this.activeTab==='douyin'"></official-douyin>
      </div>
    </div>
  </div>
</template>
<script>
import officialWb from './official/OffcialWb'
import officialWx from './official/OffcialWx'
import officialToutiao from './official/OffcialToutiao'
import officialDouyin from './official/OffcialDouyin'
// import { exportTable } from '@/lib/tools'
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
export default {
  components: {
    officialWb,
    officialWx,
    officialToutiao,
    officialDouyin
  },
  data () {
    return {
      activeTab: 'wx'
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
      this.$router.replace({ name: 'Official', query: { tab: tab } })
      this.activeTab = tab
      console.log('official', tab, this.activeTab)
    },
    // 自定义榜单
    openCust () {
      this.$router.push({ name: 'Customize' })
    }
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
