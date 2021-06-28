<!--
 * @Author: MaiChao
 * @Date: 2021-03-15 16:16:36
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-05-31 15:36:07
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
        <span class="right-btn cursor"
              @click="openCust"><i class="el-icon-s-data"></i>自定义榜单</span>
      </div>
      <div class="conts-box">
        <official-video-wx v-if="this.activeTab==='wx'" @changeTab="tabsAll"></official-video-wx>
        <official-video-wb v-if="this.activeTab==='wb'" @changeTab="tabsAll"></official-video-wb>
      </div>
    </div>
  </div>
</template>
<script>
import officialVideoWx from './OfficialVideoWx'
import officialVideoWb from './OfficialVideoWb'
export default {
  components: {
    officialVideoWx,
    officialVideoWb
  },
  data () {
    return {
      activeTab: 'wx'
    }
  },
  created () {
    if (this.$route.query.active) {
      this.activeTab = this.$route.query.active
    }
  },
  methods: {
    // 微信/微博
    tabsAll (name, level) {
      // console.log(name)
      this.$router.replace({ name: 'OfficialVideo', query: { tab: name } })
      this.activeTab = name
    },
    // 自定义榜单
    openCust () {
      this.$router.push({ name: 'Customize' })
    }
  }
}
</script>
<style scoped lang="scss">
@import '../assess.css';
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
.explain-box .el-button {
  width: 212px;
}
.from-box {
  margin: 20px 0;
}
.from-box .el-form-item {
  margin-right: 35px;
}
.account-infor {
  width: 200px;
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
.success {
  color: #0ad80a;
}
</style>
