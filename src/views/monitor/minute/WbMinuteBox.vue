<!--
 * @Author: zhangjuan
 * @Date: 2021-05-25 17:24:42
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-06-02 17:44:22
-->
<template>
  <div class="manage">
    <div class="tabs-header">
      <span class="tabs-title"
            @click="tabsAll('article')"
            :class="activeName ==='article'?'isActive':''">文章即时监测</span>
      <span class="tabs-title"
            @click="tabsAll('account')"
            :class="activeName ==='account'?'isActive':''">账号预约监测</span>
    </div>
    <div>
      <m-article v-if="activeName === 'article'"></m-article>
      <m-account v-else></m-account>
    </div>
  </div>
</template>
<script>
import mAccount from './WbMinuteAccount'
import mArticle from './WbMinuteArticle'
export default {
  data () {
    return {
      activeName: 'article'
    }
  },
  methods: {
    tabsAll (tab) {
      this.activeName = tab
      this.$router.replace({ name: 'WbMinuteBox', query: { tab: tab } })
    }
  },
  created () {
    if (this.$route.query.tab) {
      this.activeName = this.$route.query.tab
    }
  },
  components: {
    mAccount,
    mArticle
  }
}
</script>
<style scoped>

</style>
