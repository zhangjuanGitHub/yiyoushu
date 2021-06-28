<!--
 * @Author: MaiChao
 * @Date: 2021-02-25 15:36:41
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-19 15:56:07
-->
<template>
  <div class="minute">
    <div class="flex-just-center minute-menu">
      <div class="menu-warp">
        <v-menu></v-menu>
      </div>
      <div class="minute-content">
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
  components: {
    vMenu
  }
}
</script>
<style scoped>
.minute-menu {
  width: 1400px;
  min-height: calc(100vh - 181px);
  margin: 0 auto;
  margin-bottom: 70px;
}
.minute-content {
  margin-left: 50px;
  width: 100%;
  margin-top: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  position: relative;
}
.menu-warp{
  width: 15%;
}
</style>
