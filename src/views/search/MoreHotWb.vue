<!--
 * @Author: zhangjuan
 * @Date: 2021-05-18 13:34:31
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-07-13 17:55:54
-->
<template>
  <div class="more-hot-wrap">
    <!-- 搜索框 -->
    <div class="home-up-wrap">
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
              <el-menu-item index="dy">抖音号</el-menu-item>
              <!-- <el-menu-item index="toutiao">头条</el-menu-item> -->
              <el-menu-item index="article">找文章</el-menu-item>
            </el-menu>
          </div>
          <div>
            <el-autocomplete v-model="queryText"
                            v-if="accountActive === 'wx'"
                            :fetch-suggestions="querySearch"
                            placeholder="新媒体搜索引擎，你想要的都在这里哦"
                            :trigger-on-focus="historyList.length > 0"
                            @select="Searchkeyword">
              <el-button type="primary" slot="append" icon="el-icon-search" @click="Searchkeyword"></el-button>
              <template slot-scope="{ item }">
                <div class="search-autotip-box flex-ali-center">
                  <img :src="item.url" alt="" class="search-autotip-img" v-if="item.url">
                  <p class="search-autotip-p" v-html="item.value"></p>
                </div>
              </template>
            </el-autocomplete>
            <el-input placeholder="新媒体搜索引擎，你想要的都在这里哦"
                      v-model="queryText"
                      v-else-if="accountActive === 'article'">
              <el-button type="primary" slot="append" icon="el-icon-search" @click="Searchkeyword"></el-button>
            </el-input>
          </div>
        </div>
        <div class="crumbs" v-else>微博热文</div>
      </div>
    </div>
    <div class="center-wraper">
      <div class="wraper">
        <div v-if="isSearched" class="more-hot-wb">
          <div class="morehot-tab-head">
            <p>
              内容类型
              <span :class="{ 'sort_active': typeActive === 0 }"
                    @click="changetypeActive(0)">全部</span>
              <span :class="{ 'sort_active': typeActive === 2 }"
                    @click="changetypeActive(2)">文章</span>
              <span :class="{ 'sort_active': typeActive === 1 }"
                    @click="changetypeActive(1)">视频</span>
            </p>
          </div>
          <el-table :data="moreHotList"
                    style="width: 100%"
                    border
                    :cell-style="{ textAlign: 'center' }">
            <el-table-column label="基本信息">
                <template slot-scope='scope'>
                <div class="more-msg-box flex-ali-center">
                  <div class="more-msg-left flex-ali-center cursor">
                    <img :src="scope.row.profile_image_url" alt="">
                    <div class="more-name-box flex-ali-center">
                      <p class="lin-clamp-1" v-html="scope.row.screen_name"></p>
                      <div v-if="scope.row.verified">
                        <img v-if="scope.row.verified_type === 0 && scope.row.verified_type_ext === 1" src="@/assets/images/search/v_1.png" alt="">
                        <img v-else-if="scope.row.verified_type === 0 && scope.row.verified_type_ext === 0" src="@/assets/images/search/v_2.png" alt="">
                        <img v-else src="@/assets/images/search/v_3.png" alt="">
                      </div>
                    </div>
                  </div>
                  <div class="more-msg-right flex-ali-center">
                     <!-- :style="{backgroundImage: 'url('+scope.row.original_pic+')' -->
                    <div class="more-cover-box" v-if="scope.row.original_pic">
                      <img :src="scope.row.original_pic" alt="">
                    </div>
                    <p class="lin-clamp-3 cursor" v-html="scope.row.raw_text" @click="target(scope.row.url)"></p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pubtime"
                            label="发布时间"
                            width="160">
            </el-table-column>
            <el-table-column label="点赞数"
                            width="130">
              <template slot-scope="scope">
                <div class="morehot-icon flex-all-center">
                  <img src="@/assets/images/home/icon_2.png" alt="" style="margin-top:-3px">
                  <p>{{scope.row.attitudes_count}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="评论数"
                            width="120">
              <template slot-scope="scope">
                <div class="morehot-icon flex-all-center">
                  <img src="@/assets/images/home/icon_4.png" alt="">
                  <p>{{scope.row.comments_count}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="120"
                            label="转发数">
              <template slot-scope="scope">
                <div class="morehot-icon flex-all-center">
                  <img src="@/assets/images/home/icon_5.png" alt="">
                  <p>{{scope.row.reposts_count}}</p>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
  name: 'morehot',
  components: {},
  data () {
    return {
      undefinedUrl: require('@/assets/images/home/avatar.png'),
      total: 0,
      isSearched: true, // 是否查询到
      accountActive: '',
      queryText: '',
      typeActive: 0,
      moreHotList: [],
      historyList: [],
      ruleForm: {
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  methods: {
    // 改变内容类型
    changetypeActive (tab) {
      this.typeActive = tab
      this.$refs.child.handleCurrentChange(1)
    },
    target (url) {
      window.open(url)
    },
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
    // 获取微博热文
    getHotList () {
      let obj = {
        videoOrArticle: this.typeActive,
        pageBean: {
          pageNum: (this.ruleForm.pageNum - 1) * this.ruleForm.pageSize + 1,
          pageSize: this.ruleForm.pageSize
        }
      }
      this.$http.post(this.$api.getWbHot, obj)
        .then(res => {
          this.moreHotList = res.data.data.data
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
.more-msg-left {
  width: 200px;
}
.more-msg-left>img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 5px;
}
.more-name-box>div {
  height: 18px;
}
.more-name-box img {
  width: 18px;
  height: 18px;
  margin-left: 3px;
}
.more-msg-right {
  flex: 1;
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
