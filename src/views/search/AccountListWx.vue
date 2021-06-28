<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-02-01 10:31:23
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-06-10 09:25:43
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
                            v-if="accountActive === 'wx' || accountActive === 'wb'"
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
                     @click="$router.push({ name: 'AccountMaterial' , query: { id: item.biz }})">
                <div class="flex-cloumn">
                  <div class="flex-ali-center account-list-name">
                    <p @click="$router.push({ name: 'AccountMaterial' , query: { id: item.biz }})"
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
                    <!-- 特殊关注 添加预警-->
                    <div class="flex-ali-center cursor">
                      <el-popover placement="top"
                                  trigger="hover"
                                  v-if="item.is_early_warning_account === 0"
                                  content="点击即可添加预警">
                        <img src="@/assets/images/home/special_1.png"
                            @click="submitWarning(item, index, 1)"
                            slot="reference" alt=""
                            class="sao">
                      </el-popover>
                      <el-popover placement="top"
                                  trigger="hover"
                                  v-if="item.is_early_warning_account === 1"
                                  content="取消预警">
                        <img src="@/assets/images/home/special_2.png"
                            @click="submitWarning(item, index, 0)"
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
            <div class="account-list-yizhi flex-ali-center">
              <!-- <p v-html="item.yizhishu"></p> -->
              <el-tooltip class="item" effect="dark" content="上周易指数" placement="top">
                <!-- <i class="el-icon-question cursor"></i> -->
                <p v-html="item.yizhishu"></p>
              </el-tooltip>
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
      undefinedUrl: require('@/assets/images/home/avatar.png'),
      rangeActive: 1,
      sortActive: 'all',
      isSearched: true, // 是否查到
      accountList: [],
      accountActive: '', // tab
      queryText: '', // 输入框内容
      result: '', // 搜索结果
      historyList: [], // 历史记录
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
        this.queryText = this.queryText.trim()
        // this.queryText = this.queryText.replace(/\s*/g, '')
        if (this.queryText.length > 0 && this.queryText !== ' ') {
          this.$router.push({ name: 'AccountListWx', query: { type: this.accountActive, keyword: this.queryText } })
        } else {
          this.$message.warning('请输入要搜索的关键字')
        }
      } else {
        let routeName = ''
        switch (this.accountActive) {
          case 'wb':
            routeName = 'AccountListWb'
            break
          case 'article':
            routeName = 'MoreHotWx'
            break
          default:
            break
        }
        this.$router.push({ name: routeName, query: { type: this.accountActive, keyword: this.queryText } })
      }
    },
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
            }).catch(() => {})
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
            }).catch(() => {})
        }
      }
    },
    // 存历史记录
    setCookies (history, saveDays) {
      var now = new Date() // 获取时间
      now.setTime(now.getTime() + 24 * 60 * 60 * 1000 * saveDays) // 保存的天数
      // 字符串拼接cookie
      window.document.cookie = 'history' + '=' + history + ';path=/;expires=' + now.toGMTString()
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
    unique (arr) {
      const res = new Map()
      return arr.filter((a) => !res.has(a.value) && res.set(a.value, 1))
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
            let history = JSON.parse(JSON.stringify(this.historyList))
            if (history.length >= 10) {
              history.shift()
            }
            history.unshift({ value: this.queryText })
            let newHis = this.unique(history)
            this.setCookies(JSON.stringify(newHis), 2)
          } else {
            this.result = this.queryText
            this.isSearched = false
          }
          this.total = res.data.data.shift()
          this.getCookie()
        }).catch(() => {})
    },
    // 收藏和取消收藏
    submitCollect (item, index, isCollect) {
      // item.is_follow = isCollect
      // this.$set(this.accountList, index, item)
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
          item.is_follow = isCollect
          this.$set(this.accountList, index, item)
          if (isCollect === 1) {
            this.$message.success('成功收藏！')
          } else {
            this.$message.success('成功取消收藏！')
          }
        })
    },
    // 添加预警
    submitWarning (item, index, isCollect) {
      item.is_early_warning_account = isCollect
      this.$set(this.accountList, index, item)
      let obj = {
        biz: item.biz,
        status: item.is_early_warning_account === 0 ? 0 : 1
      }
      this.$http.post(this.$api.accountChange, obj)
        .then(res => {
          if (isCollect === 1) {
            this.$message.success('预警开始！')
          } else {
            this.$message.success('取消预警!')
          }
        })
    },
    changeRangeActive (tab) {
      this.rangeActive = tab
      this.$refs.child ? this.$refs.child.handleCurrentChange(1) : this.submitSearch()
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
    this.getCookie()
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
@import './search.scss';
</style>
