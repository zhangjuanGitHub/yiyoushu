<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-02-03 17:18:48
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-05-25 15:19:38
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
                           v-if="accountActive === 'wx' || accountActive === 'wb'"
                          :fetch-suggestions="querySearch"
                          placeholder="新媒体搜索引擎，你想要的都在这里哦"
                          :trigger-on-focus="historyList.length > 0"
                          @select="submitSearch">
            <el-button type="primary" slot="append" icon="el-icon-search" @click="submitSearch"></el-button>
            <template slot-scope="{ item }">
              <div class="search-autotip-box flex-ali-center">
                <img :src="item.url" alt="" class="search-autotip-img" v-if="item.url">
                <p class="search-autotip-p" v-html="item.value"></p>
              </div>
            </template>
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
      historyList: [],
      undefinedUrl: require('@/assets/images/home/avatar.png')
    }
  },
  methods: {
    handleSelect (type) {
      this.accountActive = type
    },
    querySearch (query, cb) {
      if (this.historyList.length > 0 && !this.keyword) { // 历史记录
        cb(this.historyList)
      } else if (this.keyword) {
        if (this.accountActive === 'wx') {
          let obj = {
            searchSource: 1, // 搜索源 1:微信 2：微博 3：抖音 4：头条 5：一点资讯
            queryText: this.keyword
          }
          this.$http.post(this.$api.wxSearchTip, obj)
            .then(res => {
              let newRes = res.data.data
              for (let i = 0; i < newRes.length; i++) {
                if (newRes[i].url === '') {
                  newRes[i].url = this.undefinedUrl
                }
              }
              cb(newRes)
            }).catch(() => {})
        } else if (this.accountActive === 'wb') {
          this.$http.post(this.$api.wbSearchTip, { queryText: this.keyword })
            .then(res => {
              let newRes = res.data.data
              for (let i = 0; i < newRes.length; i++) {
                if (newRes[i].url === '') {
                  newRes[i].url = this.undefinedUrl
                }
              }
              cb(newRes)
            }).catch(() => {})
        }
      }
    },
    submitSearch () {
      this.keyword = this.keyword.trim()
      // this.keyword = this.keyword.replace(/\s*/g, '')
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
    },
    // 读取cookie
    getCookie () {
      var arr = document.cookie.split('; ')
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=')
        if (arr2[0] === 'history') {
          this.historyList = JSON.parse(arr2[1])
        }
      }
    }
  },
  mounted () {
    window.addEventListener('keydown', this.listenerSubmit)
  },
  destroyed () {
    window.removeEventListener('keydown', this.listenerSubmit, false)
  },
  created () {
    this.getCookie()
  }
}
</script>

<style scoped lang="scss">
</style>
