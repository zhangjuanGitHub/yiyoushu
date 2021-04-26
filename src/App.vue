<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-28 11:10:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-08 13:58:26
-->
<template>
  <div id="app">
    <v-header></v-header>
    <router-view></router-view>
    <v-bottom></v-bottom>
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
  created () {
  }
}
</script>

<style lang="scss">
</style>
