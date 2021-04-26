<!--
 * @Author: MaiChao
 * @Description: 我的资料
 * @Date: 2021-02-26 09:42:59
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-12 10:21:12
-->
<template>
  <div class="mayinfo">
    <div class="mayinfo-header">
      <div class="img-box flex-ali-center">
        <img src="@/assets/images/login/yys.png"
             alt="">
        <div class="crumbs">个人中心</div>
      </div>
    </div>
    <div class="mayinfo-content flex-just-center">
      <div class="menu-warp">
        <v-menu></v-menu>
      </div>
      <div class="mayinfo-right">
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
.mayinfo {
  min-height: calc(100vh - 111px);
}
.mayinfo-header {
  background-color: #fff;
}
.mayinfo-header .img-box {
  width: 1400px;
  height: 117px;
  margin: 0 auto;
}
.img-box>img {
  width: 170px;
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
.mayinfo-right{
  width: 1212px;
  background-color: #fff;
  margin: 30px 0 100px 20px;
}
</style>
