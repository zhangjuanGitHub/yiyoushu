<!--
 * @Author: zhangjuan
 * @Description: Header
 * @Date: 2021-01-28 14:21:32
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-15 16:23:33
-->
<template>
  <div class="header-wrap" v-if="routeName != 'Login'">
    <div class="header-container">
      <!-- <img class="logo" src="@/assets/images/home/yiyoushu.png" alt=""> -->
      <div class="header-right">
        <div class="header-nav flex-ali-center">
          <el-menu :default-active="defaultActive"
                   mode="horizontal"
                   @select="handleSelect"
                   background-color="#151c29"
                   text-color="#fff"
                   active-text-color="#3B81FE">
            <el-menu-item index="Home">
              首页
            </el-menu-item>
            <!-- <el-submenu index="monitor">
              <template slot="title">新媒体监测</template>
              <el-menu-item index="Account">账号检测</el-menu-item>
              <el-menu-item index="Prescription">内容检测</el-menu-item>
              <el-menu-item index="2-3">分钟级检测</el-menu-item>
              <el-menu-item index="2-4">账号对比</el-menu-item>
              <el-menu-item index="2-5">公众号分析</el-menu-item>
              <el-menu-item index="2-6">公众号回溯</el-menu-item>
            </el-submenu> -->
            <el-menu-item index="AccountCompany">
              新媒体监测
            </el-menu-item>
            <el-submenu index="assess">
              <template slot="title">榜单</template>
              <el-menu-item index="Personal">企业及个人</el-menu-item>
              <el-menu-item index="Official">政府榜单</el-menu-item>
              <el-menu-item index="Customize">自定义榜单</el-menu-item>
            </el-submenu>
            <el-menu-item index="openapi">
              开放API
            </el-menu-item>
            <el-menu-item index="custom">
              数据定制
            </el-menu-item>
          </el-menu>
        </div>
        <div class="header-msg flex-bwt-center">
          <ul class="flex-bwt-center">
            <li class="cursor"><i class="el-icon-takeaway-box"></i></li>
            <li class="cursor"><i class="el-icon-search"></i></li>
            <li class="cursor">
              <el-badge :value="2"
                        type="warning">
                <span>消息</span>
              </el-badge>
            </li>
            <li class="cursor"><span>帮助</span></li>
          </ul>
          <el-dropdown @command="handleCommand">
            <div class="header-avatar flex-bwt-center cursor">
              <el-avatar size="medium"
                        :src="circleUrl"></el-avatar>
              <span class="el-dropdown-link cursor">超级管理员<i class="el-icon-arrow-down el-icon--right"></i></span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="Company">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <el-dialog title="确定退出系统？"
               :visible.sync="dialogVisible"
               :modal-append-to-body='false'
               width="30%">
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="logout">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
  data () {
    return {
      dialogVisible: false,
      circleUrl: require('@/assets/images/home/avatar.png')
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$router.push({ name: key })
    },
    isLoginOut () {
      this.dialogVisible = true
    },
    // 退出
    logout () {
      this.dialogVisible = false
      this.$http.get(this.$api.logOut)
        .then(res => {
          this.$store.commit('user/userSignout')
          sessionStorage.clear()
          localStorage.clear()
          this.$router.replace({ name: 'Login' })
        })
        .catch(() => {
        })
    },
    handleCommand (com) {
      if (com === 'Company') {
        this.$router.push({ name: 'Company' })
      } else {
        this.isLoginOut()
      }
    }
  },
  computed: {
    routeName () {
      return this.$route.name
    },
    // eslint-disable-next-line vue/return-in-computed-property
    defaultActive () {
      // let routerActive = this.$route.path.split('/')[1]
      // return routerActive
    }
  }
}
</script>
<style scoped lang="scss">
@import './block.css';
</style>
