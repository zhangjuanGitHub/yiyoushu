<!--
 * @Author: MaiChao
 * @Date: 2021-02-04 09:41:36
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-11 15:24:21
-->
<template>
  <div class="monitor-menu">
    <el-menu :default-active="getRoutePath"
             @select="handleSelect"
             :unique-opened="true"
             active-text-color="#3B81FE"
             class="el-menu-vertical-demo hotnews-box">
      <el-submenu index="Account">
        <template slot="title">
          <div class="title-box">
            <i class="el-icon-menu"></i>
            <span slot="title">账号监测</span>
          </div>
        </template>
         <el-menu-item index="AccountCompany">
          <div class="padding50">微信公众号</div>
        </el-menu-item>
        <!-- <el-menu-item index="wb">
          <div class="padding50">新浪微博</div>
        </el-menu-item> -->
      </el-submenu>
      <el-submenu index="Content">
        <template slot="title">
          <div class="title-box">
            <i class="el-icon-location"></i>
            <span>内容监测</span>
          </div>
        </template>
        <el-menu-item index="Prescription">
          <div class="padding50">发布时效监测</div>
        </el-menu-item>
        <el-menu-item index="Sensitive">
          <div class="padding50">错敏检测</div>
        </el-menu-item>
        <!-- <el-menu-item index="Spread">
          <div class="padding50">传播分析</div>
        </el-menu-item> -->
        <el-menu-item index="Realtime">
          <div class="padding50">文章实时监测</div>
        </el-menu-item>
        <el-menu-item index="Relevant">
          <div class="padding50">相关性分析</div>
        </el-menu-item>
        <el-menu-item index="Interaction">
           <div class="padding50">互动性监测</div>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="Compare">
        <template slot="title">
          <div class="title-box">
            <i class="el-icon-document-copy"></i>
            <span slot="title">账号对比</span>
          </div>
        </template>
         <el-menu-item index="AccountCompare">
          <div class="padding50">账号对比</div>
        </el-menu-item>
        <el-menu-item index="DepartCompare">
          <div class="padding50">单位对比</div>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <div class="title-box">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">公众号分析</span>
          </div>
        </template>
         <el-menu-item index="WeekSearch">
          <div class="padding50">周分析</div>
        </el-menu-item>
        <el-menu-item index="MonthSearch">
          <div class="padding50">月分析</div>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="Minute">
        <template slot="title">
          <div class="title-box">
            <i class="el-icon-s-platform"></i>
            <span>分钟级检测</span>
          </div>
        </template>
        <el-menu-item index="MinuteArticle">
          <div class="padding50">文章即时监测</div>
        </el-menu-item>
        <el-menu-item index="MinuteAccount">
          <div class="padding50">账号预约监测</div>
        </el-menu-item>
        <el-menu-item index="MinuteAll">
          <div class="padding50">批量预约监测</div>
        </el-menu-item>
        <el-menu-item index="MinuteList">
          <div class="padding50">监测列表</div>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="MonitorBacktrack">
        <div class="title-box">
          <i class="el-icon-help"></i>
          <span slot="title">数据回溯</span>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
    }
  },
  methods: {
    handleSelect (key, keypush) {
      if (key === 'WeekSearch' || key === 'MonthSearch') {
        this.$router.push({ name: key, query: { type: key === 'WeekSearch' ? 1 : 2 } })
      } else {
        this.$router.push({ name: key })
      }
    },
    // 首字母大写
    firstWordUpperCase (str) {
      return str.toLowerCase().replace(/(\s|^)[a-z]/g, function (char) {
        return char.toUpperCase()
      })
    }
  },
  mounted () {
  },
  computed: {
    getRoutePath () {
      let routerActive = this.$route.name
      // switch (this.$route.path.split('/')[2]) {
      //   case 'content':
      //     routerActive = 'Prescription'
      //     break
      // }
      return routerActive
    }
  }
}
</script>
<style scoped lang="scss">
@import '../monitor.css';
</style>
<style scoped>
.el-menu {
  width: 170px;
  min-height: 200px;
  margin-top: 20px;
  border: none;
  background-color: #EDEFF4;
}
/* .el-menu-item:last-of-type {
  border: none;
} */
</style>
