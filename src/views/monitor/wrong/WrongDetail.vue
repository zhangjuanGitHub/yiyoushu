<template>
  <div class="more-hot-wrap">
    <div class="center-wraper">
      <div class="wraper">
        <ul v-if="isSearched">
          <li class="more-hot-li flex-ali-center" v-for="(item, index) of moreHotList" :key="index">
            <div class="more-cover-box">
              <img :src="item.cover" alt="封面" @click="targetUrl(item.url)">
            </div>
            <div class="more-hot-main">
              <p @click="targetUrl(item.url)" class="cursor" v-html="item.title"></p>
              <p class="lin-clamp-3 cursor" @click="targetUrl(item.url)" v-html="item.digest"></p>
              <div class="flex-bwt-center">
                <p>
                  <span v-html="item.nickname"></span>
                  <span>{{item.pubtime}}</span>
                </p>
                <div class="flex-ali-center">
                  <img src="@/assets/images/home/icon_1.png" alt="">
                  <p>阅读数：<span v-html="item.read_num >= 100000 ? '10万+' : item.read_num"></span></p>
                  <img src="@/assets/images/home/icon_2.png" alt="" style="margin-top: -3px">
                  <p>点赞数：<span v-html="item.old_like_num >= 100000 ? '10万+' : item.old_like_num"></span></p>
                  <img src="@/assets/images/home/icon_3.png" alt="">
                  <p>在看数：<span v-html="item.like_num >= 100000 ? '10万+' : item.like_num"></span></p>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div v-else class="flex-cloumn-cen account-list-undefined">
          <img src="@/assets/images/search/undefined.png" alt="">
          <p>抱歉，没有找到关于“<span>{{queryText}}</span>”的结果。</p>
        </div>
        <set-page @pagingChange="pagingChange"
                  :total="total"
                  ref="child"></set-page>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WrongDetail',
  components: {},
  data () {
    return {
      undefinedUrl: require('@/assets/images/home/avatar.png'),
      total: 0,
      isSearched: true, // 是否查询到
      accountActive: '',
      queryText: '',
      moreHotList: [],
      historyList: [],
      ruleForm: {
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  methods: {
    handleSelect (type) {
      this.accountActive = type
    },
    Searchkeyword () {
      if (this.accountActive === 'article') {
        this.queryText = this.queryText.trim()
        // this.queryText = this.queryText.replace(/\s*/g, '')
        if (this.queryText.length > 0 && this.queryText !== ' ') {
          // eslint-disable-next-line standard/object-curly-even-spacing
          this.$router.push({ name: 'MoreHotWx', query: { type: this.accountActive, keyword: this.queryText } })
        } else {
          this.$message.warning('请输入要搜索的关键字')
        }
      } else if (this.accountActive === 'wx') {
        this.$router.push({ name: 'AccountListWx', query: { type: this.accountActive, keyword: this.queryText } })
      }
    },
    // 搜索提示
    querySearch (query, cb) {
      if (this.historyList.length > 0 && !this.queryText) { // 历史记录
        cb(this.historyList)
      } else if (this.queryText) {
        let obj = {
          searchSource: 1, // 搜索源 1:微信 2：微博 3：抖音 4：头条 5：一点资讯
          queryText: this.queryText
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
      }
    },
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
      if (this.accountActive === 'article') {
        this.getWxAirticle()
      } else {
        this.getHotList()
      }
    },
    targetUrl (url) {
      window.open(url)
    },
    // 获取热文
    getHotList () {
      let obj = {
        page: this.ruleForm.pageNum,
        size: this.ruleForm.pageSize
      }
      this.$http.get(this.$api.getHotArticle, { params: obj })
        .then(res => {
          this.moreHotList = res.data.data.article
          this.total = res.data.data.total
        }).catch(() => {})
    },
    // 获取微信文章
    getWxAirticle () {
      let obj = {
        keyword: this.queryText,
        page: this.ruleForm.pageNum
      }
      this.$http.get(this.$api.getWxAirticle, { params: obj })
        .then(res => {
          if (res.data.data.article.length > 0) {
            this.isSearched = true
          } else {
            this.isSearched = false
          }
          this.moreHotList = res.data.data.article
          this.total = res.data.data.total
        }).catch(() => {})
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
    },
    listenerSubmit (e) {
      if (e.keyCode === 13) {
        this.Searchkeyword()
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.query.keyword !== from.query.keyword) {
        this.queryText = to.query.keyword
        this.$refs.child.handleCurrentChange(1)
      }
    }
  },
  created () {
    this.getCookie()
    var oMeta = document.createElement('meta')
    oMeta.name = 'referrer'
    oMeta.content = 'never'
    document.getElementsByTagName('head')[0].appendChild(oMeta)
    this.accountActive = this.$route.query.type
    this.queryText = this.$route.query.keyword
    if (this.accountActive && this.queryText) {
      this.getWxAirticle()
    } else {
      this.getHotList()
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
<style lang="scss" scoped>
  .wraper {
    .more-hot-li:first-child {
      padding-top: 0;
    }
    .more-hot-li {
      padding: 30px 0;
      border-bottom: 1px solid #EDEFF4;
    }
  }
  .more-cover-box {
    width: 250px;
    height: 140px;
    position: relative;
    margin-right: 32px;
    background: #f5f5f5;
    img {
      width: 100%;
      max-height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;

    }
  }
  .crumbs {
    color: #3b81fe;
    font-size: 24px;
    display: flex;
    align-items: center;
  }
  .crumbs::before {
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    background-color: #3b81fe;
    margin: 0 34px;
    border-radius: 50%;
  }
  .more-hot-main>p:first-child {
    font-size: 24px;
    color: $title-color;
  }
  .more-hot-main {
    flex: 1;
    p {
      font-size: $font-size-middle;
      color: $main-color;
    }
    span {
      margin-right: 30px;
    }
    img {
      width: 18px;
      height: 18px;
      margin-right: 2px;
    }
  }
  .more-hot-main>p:nth-child(2) {
    margin: 15px 0 30px;
  }
  .account-list-undefined {
    img {
      width: 457px;
      height: 329px;
      margin-top: 30px;
    }
    p {
      margin-top: 55px;
      color: $content-text-color;
    }
  }
</style>
