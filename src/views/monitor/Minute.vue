<!--
 * @Author: MaiChao
 * @Date: 2021-02-25 15:36:41
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-11 11:53:08
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
  min-height: 1000px;
  margin: 0 auto;
  margin-bottom: 70px;
}
.minute-content {
  width: 85%;
  margin-left: 50px;
  width: 100%;
  margin-top: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
}
.menu-warp{
  width: 15%;
}
</style>
