<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-25 17:27:30
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-04-29 15:12:20
-->
<template>
  <div class="content">
    <div class="flex-just-center content-show">
      <div class="menu-warp">
        <v-menu></v-menu>
      </div>
        <div class="warp-content">
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
  },
  created () {
  }
}
</script>
<style scoped>
.content-show {
  max-width: 1400px;
  min-height: calc(100vh - 181px);
  margin: 0 auto;
  margin-bottom: 70px;
}
.warp-content {
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
