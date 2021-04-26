<template>
  <div class="monitor-menu">
    <el-menu :default-active="getRoutePath"
             @select="handleSelect"
             :unique-opened="true"
             active-text-color="#3B81FE"
             class="el-menu-vertical-demo">
      <el-menu-item index="GetToken">
        <div class="title-box">
          <i class="el-icon-coin"></i>
          <span slot="title">获取Token</span>
        </div>
      </el-menu-item>
      <el-submenu index="OpenWxApi">
        <template slot="title">
          <div class="title-box">
            <i class="el-icon-attract"></i>
            <span slot="title">微信接口</span>
          </div>
        </template>
         <el-menu-item index="WxArticle">
          <div class="padding50">微信文章更新</div>
        </el-menu-item>
        <el-menu-item index="WxActionsData">
          <div class="padding50">微信评论更新</div>
        </el-menu-item>
        <el-menu-item index="WxAccountMsg">
          <div class="padding50">微信转赞评更新</div>
        </el-menu-item>
      </el-submenu>
      <!-- <el-submenu index="1">
        <template slot="title">
          <div class="title-box">
            <i class="el-icon-document-copy"></i>
            <span slot="title">微博接口</span>
          </div>
        </template>
         <el-menu-item index="WxArticle">
          <div class="padding50">获取微博文章</div>
        </el-menu-item>
        <el-menu-item index="WxActionsData">
          <div class="padding50">获取微博行为数据</div>
        </el-menu-item>
        <el-menu-item index="WxAccountMsg">
          <div class="padding50">获取微博账号信息</div>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <div class="title-box">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">头条接口</span>
          </div>
        </template>
         <el-menu-item index="t1">
          <div class="padding50">获取头条文章</div>
        </el-menu-item>
        <el-menu-item index="t2">
          <div class="padding50">获取头条文章</div>
        </el-menu-item>
        <el-menu-item index="t3">
          <div class="padding50">获取头条账号信息</div>
        </el-menu-item>
      </el-submenu> -->
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
    }
  },
  mounted () {
  },
  computed: {
    getRoutePath () {
      let routerActive = this.$route.name
      return routerActive
    }
  }
}
</script>
<style scoped>
@import '../../monitor/monitor.css';
</style>
<style scoped>
.el-menu {
  width: 170px;
  min-height: 200px;
  margin-top: 20px;
  border: none;
  background-color: #EDEFF4;
}
</style>