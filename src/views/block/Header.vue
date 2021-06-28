<!--
 * @Author: zhangjuan
 * @Description: Header
 * @Date: 2021-01-28 14:21:32
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-06-07 09:37:29
-->
<template>
  <div class="header-wrap" v-if="routeName != 'Login' & routeName != 'DataExplain'">
    <div class="header-container">
      <!-- <img class="logo" src="@/assets/images/home/yiyoushu.png" alt=""> -->
      <div class="header-right">
        <div class="header-nav flex-ali-center">
          <img class="header-logo"
               src="@/assets/images/login/yys.png"
               alt=""
               v-if="currentPath !== 'home' && currentPath !== 'custom' && currentPath !== 'setting' && currentPath !== 'search'">
          <el-menu :default-active="defaultActive"
                   mode="horizontal"
                   @select="handleSelect"
                   background-color="#151c29"
                   text-color="#fff"
                   active-text-color="#3B81FE">
            <el-menu-item index="home">
              首页
            </el-menu-item>
            <el-menu-item index="monitor">
              新媒体监测
            </el-menu-item>
            <el-submenu index="assess">
              <template slot="title">榜单</template>
              <el-menu-item index="personal">行业榜单</el-menu-item>
              <el-menu-item index="official">政法榜单</el-menu-item>
              <el-menu-item index="customize">自定义榜单</el-menu-item>
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
<!--            <li class="cursor"><i class="el-icon-takeaway-box"></i></li>-->
<!--            <li class="cursor"><i class="el-icon-search"></i></li>-->
            <li class="cursor" @click="targetAccountPage">
              <el-tooltip class="item" effect="light" content="账号收录" placement="top">
                <i class="el-icon-folder-add"></i>
              </el-tooltip>
            </li>
            <li class="cursor">
              <el-badge :value="0"
                        :hidden='true'
                        type="warning">
                <el-tooltip class="item" effect="light" content="消息" placement="top">
                  <i @click="$router.push({ name: 'MyNews' })" class="el-icon-message-solid"></i>
                </el-tooltip>
              </el-badge>
            </li>
            <li class="cursor">
              <el-tooltip class="item" effect="light" content="帮助" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </li>
          </ul>
          <el-dropdown v-if="this.userInfo && this.userInfo.nickName" @command="handleCommand">
            <div class="header-avatar flex-bwt-center cursor">
              <el-avatar size="medium"
                        :src="this.userInfo.headPicture"></el-avatar>
              <span class="el-dropdown-link cursor">{{this.userInfo.nickName}}<i class="el-icon-arrow-down el-icon--right"></i></span>
            </div >
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="Company">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div v-else class="header-avatar flex-bwt-center cursor">
            <el-avatar size="medium"
                      :src="circleUrl"></el-avatar>
            <span class="el-dropdown-link cursor" @click="$router.push({ name: 'Login'})">请登录</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="确定退出系统？"
               :visible.sync="dialogVisible"
               :modal-append-to-body='false'
               :close-on-click-modal='false'
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
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {},
  data () {
    return {
      // currentPath: '',
      dialogVisible: false,
      circleUrl: require('@/assets/images/home/avatar.png')
    }
  },
  methods: {
    targetAccountPage () {
      this.$router.push({ 'name': 'AddAccount' })
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
    },
    handleSelect (key, keyPath) {
      switch (key) {
        case 'home':
          this.$router.push({ name: 'Home' })
          break
        case 'monitor':
          let routeName = this.userInfo && this.userInfo.departmentVerify === 2 ? 'Prescription' : 'AccountCompany'
          this.$router.push({ name: routeName })
          break
        case 'personal':
          this.$router.push({ name: 'Personal' })
          break
        case 'official':
          this.$router.push({ name: 'Official' })
          break
        case 'customize':
          this.$router.push({ name: 'Customize' })
          break
        case 'openapi':
          this.$router.push({ name: 'GetToken' })
          break
        case 'custom':
          this.$router.push({ name: 'Custom' })
          break
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    routeName () {
      return this.$route.name
    },
    currentPath () {
      return this.$route.path.split('/')[1]
    },
    // eslint-disable-next-line vue/return-in-computed-property
    defaultActive () {
      let getRouter = this.$route.path.split('/')[1]
      let routerActive = 'no-active'
      if (getRouter === 'assess') {
        routerActive = this.$route.path.split('/')[2]
      } else {
        routerActive = getRouter
      }
      return routerActive
    }
  }
}
</script>
<style scoped>
@import './block.css';
</style>
