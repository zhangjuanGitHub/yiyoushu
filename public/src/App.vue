<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-28 11:10:50
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-10 14:55:32
-->
<template>
  <div id="app">
    <v-header></v-header>
    <router-view></router-view>
    <v-bottom></v-bottom>
    <!-- 右侧在线客服 -->
    <div class="home-right-fixed" v-if="routeName != 'Login'">
        <el-popover
          placement="left"
          width="300"
          trigger="click">
          <img class="kefu" src="./assets/images/home/lianxikefu.png" alt="">
          <!-- <el-button slot="reference">click 激活</el-button> -->
          <div class="home-fixed-up flex-cloumn-all cursor" slot="reference">
            <i class="el-icon-service"></i>
            <p>在线客服</p>
          </div>
        </el-popover>
      <div class="home-fixed-down flex-cloumn-all">
        <i class="el-icon-question"></i>
        <p>帮助中心</p>
      </div>
      <el-backtop :right="1" :bottom="200" :visibility-height="10"></el-backtop>
    </div>
  </div>
</template>

<script>
import vHeader from './views/block/Header'
import vBottom from './views/block/Bottom'
export default {
  name: 'app',
  components: {
    vHeader,
    vBottom
  },
  computed: {
    routeName () {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss">
  #app {
    min-width: 1400px;
    overflow-y: auto;
    min-height: calc(100vh);
    z-index: 1;
  }
  .kefu{
  width: 300px;
}
</style>
