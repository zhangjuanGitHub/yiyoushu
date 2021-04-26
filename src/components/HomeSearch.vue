<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-02-03 17:18:48
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-04-23 13:42:37
-->
<template>
  <div class="home-up-wrap">
    <div class="home-up flex-ali-center">
      <img src="@/assets/images/login/yys.png" alt="">
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
          <el-autocomplete v-model="keyword"
                           v-if="accountActive === 'wx'"
                          :fetch-suggestions="querySearch"
                          placeholder="新媒体搜索引擎，你想要的都在这里哦"
                          :trigger-on-focus="false"
                          @select="submitSearch">
            <el-button type="primary" slot="append" icon="el-icon-search" @click="submitSearch"></el-button>
          </el-autocomplete>
          <el-input placeholder="新媒体搜索引擎，你想要的都在这里哦"
                    v-model="keyword"
                    v-else-if="accountActive === 'article'">
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
      keyword: '',
      state2: ''
    }
  },
  methods: {
    handleSelect (type) {
      this.accountActive = type
    },
    querySearch (query, cb) {
      let obj = {
        searchSource: 1, // 搜索源 1:微信 2：微博 3：抖音 4：头条 5：一点资讯
        queryText: this.keyword
      }
      this.$http.post(this.$api.wxSearchTip, obj)
        .then(res => {
          let newRes = []
          let result = res.data.data
          for (let i = 0; i < result.length; i++) {
            newRes.push({value: result[i]})
          }
          cb(newRes)
        }).catch(() => {})
    },
    submitSearch () {
      this.keyword = this.keyword.replace(/\s*/g, '')
      if (this.keyword.length > 0 && this.keyword !== ' ') {
        let obj = {
          accountActive: this.accountActive,
          keyword: this.keyword
        }
        this.$emit('accountSearch', obj)
      } else {
        this.$message.warning('请输入要搜索的关键字')
      }
    },
    listenerSubmit (e) {
      if (e.keyCode === 13 && this.keyword !== '') {
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
