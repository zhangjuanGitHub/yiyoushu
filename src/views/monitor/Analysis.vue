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
  min-height: 1000px;
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