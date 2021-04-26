<!--
 * @Author: MaiChao
 * @@Description:头部信息
 * @Date: 2021-02-26 09:57:02
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-02-26 10:05:42
-->
<template>
  <div class="home-up flex-ali-center">
    <img src="@/assets/images/home/aside.png" alt="">
    <!-- <div class="home-search-box flex-cloumn">
      <div class="home-search-keyword flex-ali-center">
        <el-menu :default-active="accountActive"
                  mode="horizontal"
                  @select="handleSelect"
                  text-color="#6B798E">
          <el-menu-item index="wx">公众号</el-menu-item>
          <el-menu-item index="wb">微博号</el-menu-item>
          <el-menu-item index="dy">抖音号</el-menu-item>
          <el-menu-item index="article">找文章</el-menu-item>
        </el-menu>
      </div>
      <div>
        <el-input placeholder="新媒体搜索引擎，你想要的都在这里哦" v-model="search">
          <el-button type="primary" slot="append" icon="el-icon-search" @click="submitSearch"></el-button>
        </el-input>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'homesearch',
  props: {},
  data () {
    return {
      accountActive: 'wx',
      search: ''
    }
  },
  methods: {
    // handleSelect (type) {
    //   this.accountActive = type
    // },
    // submitSearch () {
    //   let obj = {
    //     accountActive: this.accountActive,
    //     keyword: this.search
    //   }
    //   this.$emit('accountSearch', obj)
    // }
  }
}
</script>

<style scoped lang="scss">
</style>
