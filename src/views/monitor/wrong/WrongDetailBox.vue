<template>
  <div class="interaction content-box">
    <div class="wrong-tab">
      <span class="tabs-title" @click="tabsAll('take')" :class="activeTab === 'take'?'isActive':''">主动删除文章</span>
      <span class="tabs-title" @click="tabsAll('passive')"  :class="activeTab === 'passive'?'isActive':''">被删除文章</span>
    </div>
    <div class="week-analyse-main">
      <take-delete v-if="activeTab === 'take'"
                @changeTab="tabsAll"></take-delete>
      <passive-delete v-else></passive-delete>
    </div>
  </div>
</template>
<script>
import TakeDelete from './TakeDeleteArticle'
import PassiveDelete from './PassiveDeleteArticle'
export default {
  components: {
    TakeDelete,
    PassiveDelete
  },
  data () {
    return {
      activeTab: 'take'
    }
  },
  methods: {
    tabsAll (tab) {
      this.activeTab = tab
    }
  },
  created () {
    if (this.$route.query.tab) {
      this.activeTab = this.$route.query.tab
    }
  }
}
</script>
<style scoped>
  @import '../monitor.css';
  .wrong-tab {
    width: 1400px;
    margin: 0 auto;
    background-color: #f7f8fa;
    box-sizing: border-box;
    margin-top: 20px;
    padding: 0 20px;
  }
</style>
