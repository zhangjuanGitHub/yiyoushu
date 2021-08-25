<template>
  <div class="more-hot-wrap">
    <div class="center-wraper" style="padding: 0">
      <div class="wraper">
        <ul v-if="total">
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
        <div v-if="!dataNull" class="flex-cloumn-cen account-list-undefined">
          <img src="@/assets/images/search/undefined.png" alt="">
          <p>暂无内容</p>
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
  name: 'TakeDeleteArticle',
  components: {},
  data () {
    return {
      articleId: '', // 文章id
      undefinedUrl: require('@/assets/images/home/avatar.png'),
      total: 0,
      accountActive: '',
      queryText: '',
      moreHotList: [],
      historyList: [],
      ruleForm: {
        pageSize: 10,
        pageNum: 1
      },
      dataNull: true
    }
  },
  methods: {
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
      this.getHotList()
    },
    targetUrl (url) {
      window.open(url)
    },
    // 获取热文
    getHotList () {
      this.dataNull = true
      let obj = {
        pageNum: this.ruleForm.pageNum,
        pageSize: this.ruleForm.pageSize,
        illegalStatus: 1,
        id: this.articleId
      }
      this.$http.post(this.$api.findIllegalArticleList, obj)
        .then(res => {
          this.moreHotList = res.data.data.list
          if (this.moreHotList.length <= 0) {
            this.dataNull = false
          }
          this.total = res.data.data.count
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
  created () {
    this.getCookie()
    var oMeta = document.createElement('meta')
    oMeta.name = 'referrer'
    oMeta.content = 'never'
    document.getElementsByTagName('head')[0].appendChild(oMeta)
    this.articleId = this.$route.query.id
  },
  mounted () {
    window.addEventListener('keydown', this.listenerSubmit)
    this.getHotList()
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

