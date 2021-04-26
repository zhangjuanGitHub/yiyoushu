<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-02-04 13:29:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-02 17:06:04
-->
<template>
  <div class="more-hot-wrap">
    <!-- 搜索框 -->
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
            <el-input placeholder="新媒体搜索引擎，你想要的都在这里哦" v-model="queryText">
              <el-button type="primary" slot="append" icon="el-icon-search" @click="Searchkeyword"></el-button>
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="center-wraper">
      <div class="wraper">
        <ul>
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
                  <span>{{item.last_pubtime}}</span>
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
      total: 0,
      accountActive: '',
      queryText: '',
      moreHotList: [],
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
        // this.$refs.child.handleCurrentChange(1)
        this.$router.push({name: 'MoreHot', query: { type: this.accountActive, keyword: this.queryText}})
      } else if (this.accountActive === 'wx') {
        this.$router.push({name: 'AccountList', query: { type: this.accountActive, keyword: this.queryText}})
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
        })
    },
    // 获取微信文章
    getWxAirticle () {
      let obj = {
        keyword: this.queryText,
        page: this.ruleForm.pageNum
      }
      this.$http.get(this.$api.getWxAirticle, { params: obj })
        .then(res => {
          this.moreHotList = res.data.data.article
          this.total = res.data.data.total
        })
    },
    listenerSubmit (e) {
      if (e.keyCode === 13) {
        this.Searchkeyword()
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if(to.query.keyword != from.query.keyword){
        this.queryText = to.query.keyword
        this.$refs.child.handleCurrentChange(1)
      }
    }
  },
  created () {
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
</style>
