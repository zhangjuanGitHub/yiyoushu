<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-02-03 17:18:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-03 13:55:01
-->
<template>
  <div class="home-up-wrap">
    <div class="home-up flex-ali-center">
      <img src="@/assets/images/home/aside.png" alt="">
      <div class="home-search-box flex-cloumn">
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
          <el-input placeholder="新媒体搜索引擎，你想要的都在这里哦" v-model="keyword">
            <el-button type="primary" slot="append" icon="el-icon-search" @click="submitSearch"></el-button>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homesearch',
  props: { },
  data () {
    return {
      accountActive: 'wx',
      keyword: ''
    }
  },
  methods: {
    handleSelect (type) {
      this.accountActive = type
    },
    submitSearch () {
      let obj = {
        accountActive: this.accountActive,
        keyword: this.keyword
      }
      this.$emit('accountSearch', obj)
    },
    listenerSubmit (e) {
      if (e.keyCode === 13 && this.keyword != '') {
        this.submitSearch()
      }
    }
  },
  mounted () {
    window.addEventListener('keydown', this.listenerSubmit)
  },
  destroyed () {
    window.removeEventListener('keydown', this.listenerSubmit, false)
  }
}
</script>

<style scoped lang="scss">
</style>
