<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-02-04 13:29:02
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-07-28 17:24:59
-->
<template>
  <div class="more-hot-wrap">
    <!-- 搜索框 -->
    <!-- <div class="home-up-wrap">
      <div class="home-up flex-ali-center">
        <img src="@/assets/images/login/yys.png" alt="">
        <div class="home-search-box flex-cloumn"
             v-if="accountActive">
          <div class="home-search-keyword flex-ali-center">
            <el-menu :default-active="accountActive"
                     mode="horizontal"
                     @select="handleSelect"
                     text-color="#6B798E">
              <el-menu-item index="wx">公众号</el-menu-item>
              <el-menu-item index="wb">微博号</el-menu-item>
              <el-menu-item index="toutiao">头条</el-menu-item>
              <el-menu-item index="article">找文章</el-menu-item>
            </el-menu>
          </div>
          <div>
            <el-autocomplete v-model="queryText"
                             v-if="accountActive === 'wx' || accountActive === 'wb'|| accountActive === 'toutiao'"
                             :fetch-suggestions="querySearch"
                             placeholder="新媒体搜索引擎，你想要的都在这里哦"
                             :trigger-on-focus="historyList.length > 0"
                             @select="Searchkeyword">
              <el-button type="primary"
                         slot="append"
                         icon="el-icon-search"
                         @click="Searchkeyword"></el-button>
              <template slot-scope="{ item }">
                <div class="search-autotip-box flex-ali-center">
                  <img :src="item.url"
                       alt=""
                       class="search-autotip-img"
                       v-if="item.url">
                  <p class="search-autotip-p"
                     v-html="item.value"></p>
                </div>
              </template>
            </el-autocomplete>
            <el-input placeholder="新媒体搜索引擎，你想要的都在这里哦"
                      v-model="queryText"
                      v-else-if="accountActive === 'article'">
              <el-button type="primary"
                         slot="append"
                         icon="el-icon-search"
                         @click="Searchkeyword"></el-button>
            </el-input>
          </div>
        </div>
        <div class="crumbs"
             v-else>微信热文</div>
      </div>
    </div> -->
    <div class="center-wraper">
      <div class="wraper">
        <!-- <div>
          <div>
            <img src="@/assets/images/search/wx.png"
                 alt="">
            <img src="@/assets/images/search/wb.png"
                 alt="">
            <img src="@/assets/images/search/douyin.png"
                 alt="">
            <img src="@/assets/images/search/toutiao.png"
                 alt="">
          </div>
          <div>
            <el-input v-model="search.keyword"
                      placeholder="请输入内容"></el-input>
          </div>
        </div> -->
        <div class="search-div">
          <el-form :inline="true"
                   :model="search"
                   class="demo-form-inline">
            <el-form-item label="">
              <img src="@/assets/images/search/wx.png"
                   alt="" v-if="search.type == '1'">
              <img src="@/assets/images/search/wb.png"
                   alt="" v-if="search.type == '2'">
              <!-- <img src="@/assets/images/search/douyin.png"
                   alt="" v-if="search.type == '4'"> -->
              <img src="@/assets/images/search/toutiao.png"
                   alt="" v-if="search.type == '3'">
            </el-form-item>
            <el-form-item label="文章搜索">
              <el-input v-model="queryText"
                        placeholder="请输入关键词" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="onSubmit" size="small">查询</el-button>
            </el-form-item>
            <el-form-item label="渠道选择" style="margin-left:20px;">
              <el-select v-model="search.type"
                         placeholder="渠道选择" size="small" @change="changeType">
                <el-option label="微信"
                           value="1"></el-option>
                <el-option label="微博"
                           value="2"></el-option>
                <el-option label="头条"
                           value="3"></el-option>
              </el-select>
            </el-form-item>

          </el-form>
        </div>
        <!-- <ul v-if="isSearched">
          <li class="more-hot-li flex-ali-center"
              v-for="(item, index) of moreHotList"
              :key="index">
            <div class="more-cover-box">
              <img :src="item.cover"
                   alt="封面"
                   @click="targetUrl(item.url)">
            </div>
            <div class="more-hot-main">
              <p @click="targetUrl(item.url)"
                 class="cursor"
                 v-html="item.title"></p>
              <p class="lin-clamp-3 cursor"
                 @click="targetUrl(item.url)"
                 v-html="item.digest"></p>
              <div class="flex-bwt-center">
                <p>
                  <span v-html="item.nickname"
                        class="cursor"
                        v-if="accountActive"
                        @click="$router.push({ name: 'HistoryTweets' , query: { id: item.biz } })"></span>
                  <span v-html="item.nickname"
                        v-else></span>
                  <span>{{item.last_pubtime}}</span>
                </p>
                <div class="flex-ali-center">
                  <img src="@/assets/images/home/icon_1.png"
                       alt="">
                  <p>阅读数：<span v-html="item.read_num >= 100000 ? '10万+' : item.read_num"></span></p>
                  <img src="@/assets/images/home/icon_2.png"
                       alt=""
                       style="margin-top: -3px">
                  <p>点赞数：<span v-html="item.old_like_num >= 100000 ? '10万+' : item.old_like_num"></span></p>
                  <img src="@/assets/images/home/icon_3.png"
                       alt="">
                  <p>在看数：<span v-html="item.like_num >= 100000 ? '10万+' : item.like_num"></span></p>
                </div>
              </div>
            </div>
          </li>
        </ul> -->
        <ul v-if="isSearched">
          <li class="more-hot-li flex-ali-center"
              v-for="(item, index) of moreHotList"
              :key="index"  v-if="search.type == '1'">
            <div class="more-cover-box">
              <img :src="item.cover"
                   alt="封面"
                   @click="targetUrl(item.url)">
            </div>
            <div class="more-hot-main">
              <p @click="targetUrl(item.url)"
                 class="cursor"
                 v-html="item.title"></p>
              <p class="lin-clamp-3 cursor"
                 @click="targetUrl(item.url)"
                 v-html="item.digest"></p>
              <div class="flex-bwt-center">
                <p>
                  <span v-html="item.nickname"
                        class="cursor"
                        v-if="accountActive"
                        @click="$router.push({ name: 'HistoryTweets' , query: { id: item.biz } })"></span>
                  <span v-html="item.nickname"
                        v-else></span>
                  <span>{{item.last_pubtime}}</span>
                </p>
                <div class="flex-ali-center">
                  <img src="@/assets/images/home/icon_1.png"
                       alt="">
                  <p>阅读数：<span v-html="item.read_num >= 100000 ? '10万+' : item.read_num"></span></p>
                  <img src="@/assets/images/home/icon_2.png"
                       alt=""
                       style="margin-top: -3px">
                  <p>点赞数：<span v-html="item.old_like_num >= 100000 ? '10万+' : item.old_like_num"></span></p>
                  <img src="@/assets/images/home/icon_4.png"
                       alt="">
                  <p>评论数：<span v-html="item.like_num >= 100000 ? '10万+' : item.like_num"></span></p>
                </div>
              </div>
            </div>
          </li>
          <li class="more-hot-li flex-ali-center"
              v-for="(item, index) of moreHotList"
              :key="index" v-if="search.type == '2'">
            <!-- <div class="more-cover-box">
              <img :src="item.cover"
                   alt="封面"
                   @click="targetUrl(item.url)">
            </div> -->
            <div class="more-hot-main">
              <p @click="targetUrl(item.url)"
                 class="cursor"
                 v-html="item.status_title"></p>
              <p class="lin-clamp-3 cursor"
                 @click="targetUrl(item.url)"
                 v-html="item.digest"></p>
              <div class="flex-bwt-center">
                <p>
                  <span v-html="item.screen_name"
                        class="cursor"
                        v-if="accountActive"
                        @click="$router.push({ name: 'HistoryTweetsWb' , query: { id: item.uid } })"></span>
                  <span v-html="item.screen_name"
                        v-else></span>
                  <span>{{item.pubtime}}</span>
                </p>
                <div class="flex-ali-center">
                  <img src="@/assets/images/home/icon_2.png"
                       alt=""
                       style="margin-top: -3px">
                  <p>点赞数：<span v-html="item.attitudes_count >= 100000 ? '10万+' : item.attitudes_count"></span></p>
                  <img src="@/assets/images/home/icon_4.png"
                       alt="">
                  <p>评论数：<span v-html="item.comments_count >= 100000 ? '10万+' : item.comments_count"></span></p>
                  <img src="@/assets/images/home/icon_5.png"
                       alt="">
                  <p>转发数：<span v-html="item.reposts_count >= 100000 ? '10万+' : item.reposts_count"></span></p>
                </div>
              </div>
            </div>
          </li>
          <li class="more-hot-li flex-ali-center"
              v-for="(item, index) of moreHotList"
              :key="index"  v-if="search.type == '3'">
            <div class="more-cover-box" v-if="item.image_url">
              <img :src="item.image_url"
                   alt="封面"
                   @click="targetUrl(item.display_url)">
            </div>
            <div class="more-hot-main">
              <p @click="targetUrl(item.display_url)"
                 class="cursor"
                 v-html="item.title"></p>
              <p class="lin-clamp-3 cursor"
                 @click="targetUrl(item.display_url)"
                 v-html="item.digest"></p>
              <div class="flex-bwt-center">
                <p>
                  <span v-html="item.screen_name"
                        class="cursor"
                        v-if="accountActive"
                        @click="$router.push({ name: 'HistoryTweetsToutiao' , query: { id: item.user_id } })"></span>
                  <span v-html="item.screen_name"
                        v-else></span>
                  <span>{{item.publish_time}}</span>
                </p>
                <div class="flex-ali-center">
                  <img src="@/assets/images/home/icon_1.png"
                       alt="">
                  <p>阅读数：<span v-html="item.read_count >= 100000 ? '10万+' : item.read_count"></span></p>
                  <img src="@/assets/images/home/icon_2.png"
                       alt=""
                       style="margin-top: -3px">
                  <p>点赞数：<span v-html="item.digg_count >= 100000 ? '10万+' : item.digg_count"></span></p>
                  <img src="@/assets/images/home/icon_4.png"
                       alt="">
                  <p>评论数：<span v-html="item.comment_count >= 100000 ? '10万+' : item.comment_count"></span></p>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div v-else
             class="flex-cloumn-cen account-list-undefined">
          <img src="@/assets/images/search/undefined.png"
               alt="">
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
  name: 'morehot',
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
      },
      search: {
        keyword: '',
        type: '1'
      }
    }
  },
  methods: {
    handleSelect (type) {
      this.accountActive = type
    },
    changeType (val) {
      console.log(val)
      if (val == 1) {
        this.getWxAirticle()
      } else if (val == 2) {
        this.getWbAirticle()
      } else {
        this.getToutiaoAirticle()
      }
    },
    onSubmit () {
      if (this.search.type == '1') {
        this.getWxAirticle()
      } else if (this.search.type == '2') {
        this.getWbAirticle()
      } else {
        this.getToutiaoAirticle()
      }
    },
    // Searchkeyword () {
    //   if (this.accountActive === 'article') {
    //     this.queryText = this.queryText.trim()
    //     // this.queryText = this.queryText.replace(/\s*/g, '')
    //     if (this.queryText.length > 0 && this.queryText !== ' ') {
    //       // eslint-disable-next-line standard/object-curly-even-spacing
    //       this.$router.push({ name: 'MoreHotWx', query: { type: this.accountActive, keyword: this.queryText } })
    //     } else {
    //       this.$message.warning('请输入要搜索的关键字')
    //     }
    //   } else {
    //     let routeName = ''
    //     switch (this.accountActive) {
    //       case 'wx':
    //         routeName = 'AccountListWx'
    //         break
    //       case 'wb':
    //         routeName = 'AccountListWb'
    //         break
    //       default:
    //         break
    //     }
    //     this.$router.push({ name: routeName, query: { type: this.accountActive, keyword: this.queryText } })
    //   }
    // },
    // 搜索提示
    querySearch (query, cb) {
      if (this.historyList.length > 0 && !this.queryText) { // 历史记录
        cb(this.historyList)
      } else if (this.queryText) {
        if (this.accountActive === 'wx') {
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
            }).catch(() => { })
        } else if (this.accountActive === 'wb') {
          this.$http.post(this.$api.wbSearchTip, { queryText: this.queryText })
            .then(res => {
              let newRes = res.data.data
              for (let i = 0; i < newRes.length; i++) {
                if (newRes[i].url === '') {
                  newRes[i].url = this.undefinedUrl
                }
              }
              cb(newRes)
            }).catch(() => { })
        }
      }
    },
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
      // if (this.accountActive === 'article') {
      //   this.getWxAirticle()
      // } else {
      //   this.getHotList()
      // }
      if (this.search.type == '1') {
        this.getWxAirticle()
      } else if (this.search.type == '2') {
        this.getWbAirticle()
      } else {
        this.getToutiaoAirticle()
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
        }).catch(() => { })
    },
    // 获取微信文章
    getWxAirticle () {
      let obj = {
        keyword: this.queryText,
        page: this.ruleForm.pageNum
      }
      console.log(obj)
      this.$http.get(this.$api.getWxAirticle, { params: obj })
        .then(res => {
          if (res.data.data.article.length > 0) {
            this.isSearched = true
          } else {
            this.isSearched = false
          }
          this.moreHotList = res.data.data.article
          this.total = res.data.data.total
        }).catch(() => { })
    },
    getWbAirticle () {
      let obj = {
        keyword: this.queryText,
        page: this.ruleForm.pageNum
      }
      console.log(obj)
      this.$http.get(this.$api.searchWeiboArticle, { params: obj })
        .then(res => {
          if (res.data.data.article.length > 0) {
            this.isSearched = true
          } else {
            this.isSearched = false
          }
          this.moreHotList = res.data.data.article
          this.total = res.data.data.total
        }).catch(() => { })
    },
    getToutiaoAirticle () {
      let obj = {
        keyword: this.queryText,
        page: this.ruleForm.pageNum
      }
      console.log(obj)
      this.$http.get(this.$api.searchToutiaoArticle, { params: obj })
        .then(res => {
          if (res.data.data.article.length > 0) {
            this.isSearched = true
          } else {
            this.isSearched = false
          }
          this.moreHotList = res.data.data.article
          this.total = res.data.data.total
        }).catch(() => { })
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
    // listenerSubmit (e) {
    //   if (e.keyCode === 13) {
    //     this.Searchkeyword()
    //   }
    // }
  },
  watch: {
    '$route' (to, from) {
      if (to.query.keyword !== from.query.keyword) {
        // this.queryText = to.query.keyword
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
    // this.queryText = this.$route.query.keyword

    // if (this.accountActive && this.queryText) {
    //   this.getWxAirticle()
    // } else {
    //   this.getHotList()
    // }
    this.getWxAirticle()
  },
  mounted () {
    // window.addEventListener('keydown', this.listenerSubmit)
  },
  destroyed () {
    // window.removeEventListener('keydown', this.listenerSubmit, false)
  }
}
</script>
<style lang="scss" scoped>
// .home-up {
//   img {
//     width: 37px;
//     height: 37px;
//   }
// }
.search-div{
  margin-top:15px;
  margin-bottom:15px;
}
.wraper {
  // padding-top:20px;
  .more-hot-li:first-child {
    padding-top: 0;
  }
  .more-hot-li {
    padding: 30px 0;
    border-bottom: 1px solid #edeff4;
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
.more-hot-main > p:first-child {
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
.more-hot-main > p:nth-child(2) {
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
