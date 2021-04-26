<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-25 17:27:30
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-11 11:52:41
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
  min-height: 1000px;
  margin: 0 auto;
  margin-bottom: 70px;
}
.warp-content {
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
