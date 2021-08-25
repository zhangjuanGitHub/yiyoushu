<!--
 * @Author: MaiChao
 * @Date: 2021-02-04 09:41:36
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-08-03 11:24:48
-->
<template>
  <div class="monitor-menu">
    <el-menu :default-active="getRoutePath"
             @select="handleSelect"
             :unique-opened="true"
             active-text-color="#3B81FE"
             class="el-menu-vertical-demo">
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
        <el-menu-item index="AccountBlogger">
          <div class="padding50">微博博主</div>
        </el-menu-item>
        <el-menu-item index="AccountToutiao">
          <div class="padding50">头条号</div>
        </el-menu-item>
        <!-- <el-menu-item index="AccountDouyin">
          <div class="padding50">抖音号</div>
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
        <el-menu-item index="Interaction">
          <div class="padding50">互动性监测</div>
        </el-menu-item>
        <el-menu-item index="Sensitive">
          <div class="padding50">错敏检测</div>
        </el-menu-item>
        <el-menu-item index="Relevant">
          <div class="padding50">相关性分析</div>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="Compare">
        <template slot="title">
          <div class="title-box">
            <i class="el-icon-document-copy"></i>
            <span slot="title">账号对比</span>
          </div>
        </template>
        <!-- <el-menu-item index="AccountCompare">
          <div class="padding50">旧账号对比</div>
        </el-menu-item> -->
        <el-menu-item index="NewAccCompare">
          <div class="padding50">账号对比</div>
        </el-menu-item>
        <!-- <el-menu-item index="DepartCompare">
          <div class="padding50">旧单位对比</div>
        </el-menu-item> -->
        <el-menu-item index="NewDepCompare">
          <div class="padding50">单位对比</div>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <div class="title-box">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">账号分析</span>
          </div>
        </template>
        <el-menu-item index="WxAnalysis">
          <div class="padding50">公众号分析</div>
        </el-menu-item>
        <el-menu-item index="BloggerAnalysis">
          <div class="padding50">微博分析</div>
        </el-menu-item>
        <el-menu-item index="ToutiaoAnalysis">
          <div class="padding50">头条分析</div>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="Minute">
        <template slot="title">
          <div class="title-box">
            <i class="el-icon-s-platform"></i>
            <span>分钟级监测</span>
          </div>
        </template>
        <el-menu-item index="WxMinuteBox">
          <div class="padding50">公众号监测</div>
        </el-menu-item>
        <el-menu-item index="WbMinuteBox">
          <div class="padding50">微博监测</div>
        </el-menu-item>
        <el-menu-item index="MinuteList">
          <div class="padding50">监测列表</div>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="warning">
        <template slot="title">
          <div class="title-box">
            <i class="el-icon-cpu"></i>
            <span slot="title">内容预警</span>
          </div>
        </template>
        <el-menu-item index="WechatWarningList">
          <div class="padding50">关键词设置</div>
        </el-menu-item>
        <el-menu-item index="WechatWarning">
          <div class="padding50">预警账号</div>
        </el-menu-item>
        <el-menu-item index="HitArticleList">
          <div class="padding50">预警记录</div>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <div class="title-box">
            <i class="el-icon-help"></i>
            <span slot="title">数据智能中心</span>
          </div>
        </template>
        <el-menu-item index="Realtime">
          <div class="padding50">文章传播计算</div>
        </el-menu-item>
        <el-menu-item index="WrongIndex">
          <div class="padding50">账号违规监测</div>
        </el-menu-item>
        <el-menu-item index="TrendQuery">
          <div class="padding50">趋势查询</div>
        </el-menu-item>
        <el-menu-item index="MonitorBacktrack">
          <div class="padding50">数据回溯</div>
        </el-menu-item>
        <el-menu-item index="CenterSensity">
          <div class="padding50">错敏检查</div>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="Whole"
                    v-if="menuShow">
        <div class="title-box">
          <i class="el-icon-collection"></i>
          <span slot="title">全局账号信息</span>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Menu',
  data () {
    return {
      menuShow: false
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
    ...mapState({
      userInfo: state => state.user.userInfo,
      menuPermission: state => state.user.menuPermission
    }),
    getRoutePath () {
      let routerActive = this.$route.name
      // switch (this.$route.path.split('/')[2]) {
      //   case 'content':
      //     routerActive = 'Prescription'
      //     break
      // }
      return routerActive
    }
  },
  created () {
    // console.log(this.menuPermission)
    if (this.menuPermission) {
      for (var i = 0; i < this.menuPermission.length; i++) {
        if (this.menuPermission[i] == '1') {
          this.menuShow = true
        }
      }
    }
  }
}
</script>
<style scoped>
@import '../monitor.css';
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
