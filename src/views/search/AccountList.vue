<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-02-01 10:31:23
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-04-23 13:45:12
-->
<template>
  <div class="account-list-wrap">
    <!-- 搜索框 -->
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
            <el-autocomplete v-model="queryText"
                            v-if="accountActive === 'wx'"
                            :fetch-suggestions="querySearch"
                            placeholder="新媒体搜索引擎，你想要的都在这里哦"
                            :trigger-on-focus="false"
                            @select="Searchkeyword">
              <el-button type="primary" slot="append" icon="el-icon-search" @click="Searchkeyword"></el-button>
            </el-autocomplete>
            <el-input placeholder="新媒体搜索引擎，你想要的都在这里哦"
                      v-model="queryText"
                      v-else-if="accountActive === 'article'">
              <el-button type="primary" slot="append" icon="el-icon-search" @click="Searchkeyword"></el-button>
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="center-wraper">
      <div class="wraper">
        <div class="account-list-nav">
          <div>
            <p>
              范围：
              <!-- <span :class="{ 'sort_active': rangeActive === null}"
                    @click="changeRangeActive(null)">全部</span> -->
              <span :class="{ 'sort_active': rangeActive === 1 }"
                    @click="changeRangeActive(1)">名称</span>
              <span :class="{ 'sort_active': rangeActive === 2 }"
                    @click="changeRangeActive(2)">标签</span>
              <span :class="{ 'sort_active': rangeActive === 3 }"
                    @click="changeRangeActive(3)">认证主体</span>
            </p>
            <!-- <p>
              排序：
              <span :class="{ 'sort_active': sortActive === 'new'}"
                    @click="changeSortActive('new')">新胖指数</span>
              <span :class="{ 'sort_active': sortActive === 'collect'}"
                    @click="changeSortActive('collect')">收藏人数</span>
              <span :class="{ 'sort_active': sortActive === 'all'}"
                    @click="changeSortActive('all')">综合</span>
            </p> -->
          </div>
          <p class="account-list-key">关键词“<span>{{result}}</span>”<span>{{total.total}}</span>条结果。若无合适结果，请
            <span class="sort_active cursor" @click="$router.push({ name: 'AddAccount' })">点此收录</span></p>
        </div>
        <ul v-if="isSearched">
          <li class="flex-bwt-center account-list-li"
              v-for="(item, index) of accountList" :key="index">
            <div class="account-list-box">
              <div class="account-list-des flex-ali-center">
                <img class="account-list-ava cursor"
                     :src="item.ori_head_img" alt=""
                     @click="$router.push({ name: 'AccountMaterial' , query: { id: item.id }})">
                <div class="flex-cloumn">
                  <div class="flex-ali-center account-list-name">
                    <p @click="$router.push({ name: 'AccountMaterial' , query: { id: item.id }})"
                        class="cursor" v-html="item.nickname"></p>
                    <el-popover placement="top"
                                width="60"
                                trigger="hover"
                                 v-if="item.qrcode">
                      <img class="account-popover" :src="item.qrcode" alt="">
                      <img slot="reference" class="sao cursor" src="@/assets/images/home/sao.png" alt="">
                    </el-popover>
                    <div class="flex-ali-center cursor">
                      <el-popover placement="top"
                                  trigger="hover"
                                  v-if="item.is_follow === 0"
                                  content="点击即可收藏">
                        <img src="@/assets/images/home/collect_1.png"
                            @click="submitCollect(item, index, 1)"
                            slot="reference" alt=""
                            class="sao">
                      </el-popover>
                      <el-popover placement="top"
                                  trigger="hover"
                                  v-if="item.is_follow === 1"
                                  content="取消收藏">
                        <img src="@/assets/images/home/collect_2.png"
                            @click="submitCollect(item, index, 0)"
                            slot="reference" alt=""
                            class="sao">
                      </el-popover>
                    </div>
                  </div>
                  <div class="flex-ali-center" style="margin-bottom: 10px">
                    <p class="account-list-num">微信号：<span v-html="item.alias"></span></p>
                    <p class="account-list-num" v-if="item.auth_info">认证主体：
                      <i class="el-icon-circle-check"></i><span v-html="item.auth_info"></span></p>
                  </div>
                  <p class="account-list-type" v-html="item.tags"></p>
                </div>
              </div>
              <p class="account-list-intro">功能介绍：<span v-html="item.introduction"></span></p>
            </div>
            <div class="flex-cloumn-cen" v-if="item.qrcode">
              <img :src="item.qrcode" alt="">
              <p>扫码关注</p>
            </div>
          </li>
        </ul>
        <div v-else class="flex-cloumn-cen account-list-undefined">
          <img src="@/assets/images/search/undefined.png" alt="">
          <p>抱歉，没有找到关于“<span>{{queryText}}</span>”的结果。</p>
          <el-button plain>换个词试试？您也可以
            <span class="is_red cursor"
                  @click="$router.push({ name: 'AddAccount' })">添加喜欢的公众号</span></el-button>
        </div>
        <set-page @pagingChange="pagingChange"
                  :total="total.total"
                  ref="child"
                  v-if="isSearched"></set-page>
      </div>
    </div>
  </div>
</template>

<script>
const getSearchApi = new Map().set('wx', 'wxSearch').set('wb', 'wbSearch')
const getcollectApi = new Map().set('concern', 'setCollect').set('cancel', 'cancelCollect')
export default {
  name: 'accountlist',
  components: {},
  data () {
    return {
      rangeActive: 1,
      sortActive: 'all',
      isSearched: true,
      accountList: [],
      accountActive: '',
      queryText: '',
      result: '',
      pageBean: {
        pageNum: 1,
        pageSize: 10
      },
      total: {
        total: 0
      }
    }
  },
  methods: {
    pagingChange (query) {
      this.pageBean.pageSize = query.size
      this.pageBean.pageNum = query.page
      this.submitSearch()
    },
    handleSelect (type) {
      this.accountActive = type
    },
    Searchkeyword () {
      if (this.accountActive === 'wx') {
        this.queryText = this.queryText.replace(/\s*/g, '')
        if (this.queryText.length > 0 && this.queryText !== ' ') {
          this.$router.push({ name: 'AccountList', query: { type: this.accountActive, keyword: this.queryText } })
        } else {
          this.$message.warning('请输入要搜索的关键字')
        }
      } else if (this.accountActive === 'article') {
        this.$router.push({ name: 'MoreHot', query: { type: this.accountActive, keyword: this.queryText } })
      }
    },
    // 搜索提示
    querySearch (query, cb) {
      let obj = {
        searchSource: 1, // 搜索源 1:微信 2：微博 3：抖音 4：头条 5：一点资讯
        queryText: this.queryText
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
    // 搜索账号列表
    submitSearch () {
      this.accountList = []
      let obj = {
        queryText: this.queryText,
        pageBean: {
          pageSize: this.pageBean.pageSize,
          pageNum: (this.pageBean.pageNum - 1) * this.pageBean.pageSize + 1
        },
        range: this.rangeActive
      }
      this.$http.post(this.$api[getSearchApi.get(this.accountActive)], obj)
        .then(res => {
          if (res.data.data.length > 1) {
            this.isSearched = true
            this.result = this.queryText
            this.accountList = res.data.data
          } else {
            this.result = this.queryText
            this.isSearched = false
          }
          this.total = res.data.data.shift()
        }).catch(() => {})
    },
    // 收藏和取消收藏
    submitCollect (item, index, isCollect) {
      item.is_follow = isCollect
      this.$set(this.accountList, index, item)
      let getApi = ''
      let obj = {
        account: item.biz,
        type: 1
      }
      if (isCollect === 1) {
        getApi = getcollectApi.get('concern')
        obj.accountName = item.nickname
      } else {
        getApi = getcollectApi.get('cancel')
      }
      this.$http.get(this.$api[getApi], { params: obj }) // 微信 1
        .then(res => {
          if (isCollect === 1) {
            this.$message.success('成功收藏！')
          } else {
            this.$message.success('成功取消收藏！')
          }
        })
    },
    changeRangeActive (tab) {
      this.rangeActive = tab
      this.$refs.child.handleCurrentChange(1)
    },
    changeSortActive (tab) {
      this.sortActive = tab
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
        this.rangeActive = 1
        this.$refs.child ? this.$refs.child.handleCurrentChange(1) : this.submitSearch()
      }
    }
  },
  created () {
    this.accountActive = this.$route.query.type
    this.queryText = this.$route.query.keyword
    this.submitSearch()
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
.account-list-nav {
  width: 100%;
  height: 90px;
  padding: 20px;
  box-sizing: border-box;
  background: #F7F8FA;
  p {
    float: left;
    margin-right: 20px;
    color: $content-text-color;
    span {
      margin: 0 5px;
      cursor: pointer;
    }
  }
  .sort_active {
    color: $hight-light-color;
  }
  .account-list-key {
    clear: both;
    margin-top: 7px;
  }
}
.account-list-box .account-list-intro {
  margin-top: 15px;
}
.account-list-li {
  padding: 20px 15px;
  border-bottom: 1px solid #EDEFF4;
  p {
    color: $content-text-color;
  }
  .account-list-des {
    .account-list-ava {
      width: 60px;
      height: 60px;
      margin-right: 15px;
      border-radius: 30px;
    }
    .account-list-type, .account-list-name p {
      font-size: 18px;
      color: $tab-text-color;
      margin-right: 10px;
    }
    .sao {
      padding-top: 6px;
    }
    .account-list-name img{
      width: 20px;
      height: 20px;
      margin: 5px;
    }
    .account-list-num {
      margin: 5px 15px 5px 0;
      i {
        color: #F79406;
      }
    }
  }
  .el-popper {
    display: flex;
    justify-content: center;
  }
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
  .el-button {
    margin: 15px 0;
    .is_red {
      color: #ff0000;
    }
  }
}
</style>
