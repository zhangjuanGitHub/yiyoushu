<!--
 * @Author: MaiChao
 * @Description: 账号管理
 * @Date: 2021-02-26 09:42:59
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-02 11:40:11
-->
<template>
  <div class="manage">
    <div class="manage-header">
      <div class="img-box flex-ali-center">
        <img src="@/assets/images/home/aside.png"
             alt="">
        <div class="crumbs">个人中心</div>
      </div>
    </div>
    <div class="manage-content flex-just-center">
      <div class="menu-warp">
        <v-menu></v-menu>
      </div>
      <div class="manage-right">
        <div class="tabs-header">
          <span class="tabs-title"
                @click="tabsAll('Company')"
                :class="this.$route.name==='Company'?'isActive':''">单位账号</span>
          <span class="tabs-title"
                @click="tabsAll('Collection')" :class="this.$route.name==='Collection'?'isActive':''">公众号收藏</span>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import vMenu from '@/views/setting/components/Menu'
export default {
  data () {
    return {

    }
  },
  methods: {
    tabsAll (name) {
      this.$router.push({ name: name })
    }
  },
  components: {
    vMenu
  }
}
</script>
<style scoped>
.manage-header {
  background-color: #fff;
}
.manage-header .img-box {
  width: 1400px;
  height: 117px;
  margin: 0 auto;
}
.crumbs {
  color: #3b81fe;
  font-size: 24px;
  display: flex;
  align-items: center;
}
.crumbs::before {
  content: '';
  display: block;
  width: 5px;
  height: 5px;
  background-color: #3b81fe;
  margin: 0 34px;
  border-radius: 50%;
}
.tabs-header {
  width: 1212px;
  height: 50px;
  line-height: 50px;
  box-sizing: border-box;
}
.manage-right{
  width: 1212px;
  background-color: #fff;
  margin: 30px 0 20px 20px;
}
</style>
