<!--
 * @Author: zhangjuan
 * @Date: 2021-04-08 17:54:10
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-04-12 14:11:00
-->
<template>
  <div class="account">
    <div class="flex-just-center account-show">
      <div class="menu-warp">
        <v-menu></v-menu>
      </div>
      <div class="account-company-warp">
        <div class="tabs-header">
          <span class="tabs-title">错敏检查</span>
        </div>
        <div class="center-sens-wrap flex-cloumn-all">
          <img src="@/assets/images/search/undefined.png" alt="">
          <p>敬请期待！</p>
          <!-- <div></div>
          <div></div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vMenu from '@/views/monitor/components/Menu'
export default {
  data () {
    return {
      
    }
  },
  methods: {
  },
  components: {
    vMenu
  }
}
</script>
<style>
</style>
<style scoped>
.account-show {
  width: 1400px;
  min-height: calc(100vh - 181px);
  margin: 0 auto;
  margin-bottom: 70px;
}
.account-company-warp {
  margin-left: 50px;
  width: 100%;
  margin-top: 20px;
  background: #ffffff;
  border: 1px solid #cccccc;
}
.menu-warp{
  width: 15%;
}
.center-sens-wrap {
  padding: 20px;
}
</style>
