<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-03-05 13:58:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-08 10:44:46
-->
<template>
  <div class="account">
    <div class="flex-just-center account-show">
      <div class="menu-warp">
        <v-menu></v-menu>
      </div>
      <div class="account-company-warp">
        <router-view></router-view>
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
</style>
