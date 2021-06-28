<!--
 * @Author: zhangjuan
 * @Description: home-search-account
 * @Date: 2021-01-29 13:57:27
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-06-04 10:41:37
-->
<template>
  <div class="center-wraper">
    <div class="account-wraper">
      <div class="search-left-wrap">
        <div class="search-left-up-box">
          <div class="flex-cloumn-cen search-left-up">
            <img :src="accountMsg.ori_head_img" alt="">
            <p v-html="accountMsg.nickname"></p>
            <div class="search-left-act flex-ali-center">
              <div class="flex-ali-center">
                <img v-if="accountMsg.is_follow === 0"
                      @click="submitCollect(1)"
                      src="@/assets/images/home/collect_1.png" alt="">
                <img v-else-if="accountMsg.is_follow === 1"
                      @click="submitCollect(0)"
                      src="@/assets/images/home/collect_2.png" alt="">
                <p>收藏</p>
              </div>
              <el-popover placement="bottom"
                          width="60"
                          trigger="hover">
                <img class="account-popover" :src="accountMsg.qrcode" alt="">
                <div slot="reference" class="flex-ali-center">
                  <img class="sao cursor" src="@/assets/images/home/sao.png" alt="">
                  <p>关注TA</p>
                </div>
              </el-popover>
              <div class="flex-ali-center">
                <img src="@/assets/images/home/shouji.png" alt="">
                <p>手机查看</p>
              </div>
            </div>
          </div>
          <div class="search-slider"></div>
          <div class="search-left-des">
            <p>微信号：
              <span v-html="accountMsg.alias"></span>
              <span class="serach-left-label">原创</span></p>
            <p>微信认证：
              <i class="el-icon-circle-check"></i>
              <span v-html="accountMsg.auth_info"></span></p>
            <p>简介：
              <span v-html="accountMsg.introduction"></span></p>
          </div>
          <div class="search-slider"></div>
        </div>
        <!-- <div class="search-left-rank flex-cloumn-cen">
          <p>周新榜指数 <i class="el-icon-discount"></i></p>
          <p>373.2</p>
          <p>第133985名 · <span class="search-left-click cursor"> 文摘 · 周榜</span><i class="el-icon-arrow-right"></i></p>
        </div> -->
        <div class="search-left-class">
          <p>
            <i class="el-icon-s-order"></i>
            <span class="left-class-label">易有数分类：</span>
            <span class="left-class-cont">{{accountMsg.function_type}}</span>
          </p>
          <p class="lin-clamp-1">
            <i class="el-icon-s-management"></i>
            <span class="left-class-label">标签：</span>
            <span class="left-class-cont">{{accountMsg.tags}}</span>
          </p>
          <p>
            <i class="el-icon-s-data"></i>
            <span class="left-class-label">纳入易有数样本库：</span>
            <span class="left-class-cont">{{insertTime}}</span>
          </p>
          <div v-if="accountMsg.is_collect !== 1"
               class="search-slider"></div>
          <p v-if="accountMsg.is_collect !== 1">
            <span class="left-class-label">该账号暂未采集监控</span>
            <span class="left-class-caiji cursor"
                  @click="submitGather">申请采集</span>
          </p>
        </div>
      </div>
      <div class="search-right-main">
        <div class="search-right-tab">
          <ul class="flex-ali-center">
            <li :class="{ 'tab_active': tabActive === 'material'}"
                @click="$router.push({ name: 'AccountMaterial' , query: { id: accountId } })">
              账号资料
            </li>
            <li :class="{ 'tab_active': tabActive === 'class'}"
                @click="$router.push({ name: 'ArticleClass' , query: { id: accountId } })">
              文章类别
            </li>
            <li :class="{ 'tab_active': tabActive === 'rule'}"
                @click="$router.push({ name: 'ReleaseRules' , query: { id: accountId } })">
              发布规律
            </li>
            <li :class="{ 'tab_active': tabActive === 'original'}"
                @click="$router.push({ name: 'ReadOriginal' , query: { id: accountId } })">
              阅读原文分析
            </li>
            <li :class="{ 'tab_active': tabActive === 'data'}"
                @click="$router.push({ name: 'BasicData' , query: { id: accountId } })">
              基础数据统计
            </li>
            <li :class="{ 'tab_active': tabActive === 'history'}"
                @click="$router.push({ name: 'HistoryTweets' , query: { id: accountId,  } })">
              历史推文
            </li>
            <!-- <li :class="{ 'tab_active': tabActive === 'backtrack'}"
                @click="$router.push({ name: 'DataBacktrack' , query: { id: accountId } })">
              公众号数据回溯
            </li> -->
          </ul>
        </div>
        <router-view @refreRoute="refreRoute" v-if="this.accountMsg.biz" ref="child"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
const getcollectApi = new Map().set('concern', 'setCollect').set('cancel', 'cancelCollect')
export default {
  name: 'search',
  components: {},
  data () {
    return {
      tabActive: '',
      accountId: '',
      accountMsg: {},
      insertTime: ''
    }
  },
  methods: {
    // 申请采集
    submitGather () {
      let obj = {
        nickname: this.accountMsg.nickname,
        biz: this.accountMsg.biz
      }
      this.$http.post(this.$api.startCollect, obj)
        .then(res => {
          this.$message.success('添加成功，等待审核！')
        })
    },
    // 收藏和取消收藏
    submitCollect (isCollect) {
      // this.$set(this.accountMsg, 'is_follow', isCollect)
      let getApi = ''
      let obj = {
        account: this.accountMsg.biz,
        type: 1 // 微信
      }
      if (isCollect === 1) {
        getApi = getcollectApi.get('concern')
        obj.accountName = this.accountMsg.nickname
      } else {
        getApi = getcollectApi.get('cancel')
      }
      this.$http.get(this.$api[getApi], { params: obj }) // 微信 1
        .then(res => {
          this.$set(this.accountMsg, 'is_follow', isCollect)
          if (isCollect === 1) {
            this.$message.success('成功收藏！')
          } else {
            this.$message.success('成功取消收藏！')
          }
        })
    },
    // 获取公众号信息
    getAccountMsg () {
      this.$http.get(`${this.$api.getWxAccount}/${this.accountId}`)
        .then(res => {
          this.accountMsg = res.data.data[0]
          let accountInfo = {
            biz: this.accountMsg.biz,
            auth_info: this.accountMsg.auth_info,
            function_type: this.accountMsg.function_type,
            auth_type: this.accountMsg.auth_type
          }
          this.$store.commit('mutations/getAccountInfo', accountInfo)
          this.insertTime = res.data.data[0].inserttime.slice(0, 10)
        }).catch(() => {})
    },
    refreRoute (id) {
      this.accountId = id
      this.getAccountMsg()
      this.$refs.child.getSameAccount()
    }
  },
  created () {
    this.tabActive = this.$route.path.split('/')[3]
    // 此处的id 是biz
    this.accountId = this.$route.query.id
    this.getAccountMsg()
  },
  watch: {
    $route () {
      this.tabActive = this.$route.path.split('/')[3]
    }
  }
}
</script>
<style lang="scss" scoped>
@import './search.scss';
</style>
