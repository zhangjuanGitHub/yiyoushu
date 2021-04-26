<!--
 * @Author: MaiChao
 * @Date: 2021-02-04 09:41:36
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-15 10:05:33
-->
<template>
  <div class="monitor-menu">
    <el-menu :default-active="getRoutePath"
             @select="handleSelect"
             :unique-opened="true"
             active-text-color="#3B81FE"
             class="el-menu-vertical-demo hotnews-box">
      <el-menu-item index="Company">
        <div class="title-box">
          <i class="el-icon-menu"></i>
          <span slot="title">账号管理</span>
        </div>
      </el-menu-item>
      <el-submenu index="Content">
        <template slot="title">
          <div class="title-box">
            <i class="el-icon-coordinate"></i>
            <span>我的资料</span>
          </div>
        </template>
        <el-menu-item index="Password">
          <div class="padding50">修改密码</div>
        </el-menu-item>
        <el-menu-item index="Phone">
          <div class="padding50">手机号绑定</div>
        </el-menu-item>
        <el-menu-item index="UnitAttestation">
          <div class="padding50">单位认证</div>
        </el-menu-item>
        <el-menu-item index="MyNews">
          <div class="padding50">我的消息</div>
        </el-menu-item>
      </el-submenu>
      <!-- <el-menu-item index="1">
        <div class="title-box">
          <i class="el-icon-setting"></i>
          <span slot="title">我的榜豆</span>
        </div>
      </el-menu-item>
      <el-menu-item index="2">
        <div class="title-box">
          <i class="el-icon-monitor"></i>
          <span slot="title">自定义榜单</span>
        </div>
      </el-menu-item> -->
      <!-- <el-submenu index="2">
        <template slot="title">
          <div class="title-box">
            <i class="el-icon-menu"></i>
            <span slot="title">公众号分析</span>
          </div>
        </template>
        <el-menu-item index="WeekDetail">
          <div class="padding50">周分析</div>
        </el-menu-item>
        <el-menu-item index="MonthDetail">
          <div class="padding50">月分析</div>
        </el-menu-item>
      </el-submenu> -->
      <el-menu-item index="BackTrack">
        <div class="title-box">
          <i class="el-icon-map-location"></i>
          <span slot="title">账号回溯</span>
        </div>
      </el-menu-item>
      <!-- <el-menu-item index="5">
        <div class="title-box">
          <i class="el-icon-data-line"></i>
          <span slot="title">任务列表</span>
        </div>
      </el-menu-item> -->
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
      this.$router.push({ name: key })
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
      switch (this.$route.path.split('/')[2]) {
        case 'manage':
          routerActive = 'Company'
          break
      }
      // console.log(routerActive)
      return routerActive
    }
  }
}
</script>
<style scoped lang="scss">
@import '../setting.css';
</style>
<style scoped>
.el-menu {
  width: 170px;
  min-height: 200px;
  margin-top: 20px;
  border: none;
  background-color: #edeff4;
}
/* .el-menu-item:last-of-type {
  border: none;
} */
</style>
