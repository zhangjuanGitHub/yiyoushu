<!--
 * @Author: zhangjuan
 * @Date: 2021-05-19 09:58:11
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-07-28 19:10:32
-->
<template>
  <div class="center-wraper">
    <div class="account-wraper">
      <div class="search-left-wrap">
        <div class="search-left-up-box">
          <div class="flex-cloumn-cen search-left-up">
            <img :src="accountToutiaoMsg.avatar_img" alt="">
            <p v-html="accountToutiaoMsg.screen_name"></p>
            <div class="search-left-act flex-ali-center">
              <div class="flex-ali-center">
                <img v-if="accountToutiaoMsg.is_follow === 0"
                      @click="submitCollect(1)"
                      src="@/assets/images/home/collect_1.png" alt="">
                <img v-else-if="accountToutiaoMsg.is_follow === 1"
                      @click="submitCollect(0)"
                      src="@/assets/images/home/collect_2.png" alt="">
                <p>收藏</p>
              </div>
              <!-- <el-popover placement="bottom"
                          width="60"
                          trigger="hover">
                <img class="account-popover" :src="accountToutiaoMsg.qrcode" alt="">
                <div slot="reference" class="flex-ali-center">
                  <img class="sao cursor" src="@/assets/images/home/sao.png" alt="">
                  <p>关注TA</p>
                </div>
              </el-popover> -->
              <div class="flex-ali-center">
                <img src="@/assets/images/home/shouji.png" alt="">
                <p>手机查看</p>
              </div>
            </div>
          </div>
          <div class="search-slider"></div>
          <!-- <div class="search-left-action flex-arr-center">
            <p>
              <span class="left-action-up">{{accountToutiaoMsg.followings_count}}</span>
              <span class="left-action-down">关注</span>
            </p>
            <div class="left-height-one"></div>
            <p>
              <span class="left-action-up">{{accountToutiaoMsg.followers_count}}</span>
              <span class="left-action-down">粉丝</span>
            </p>
            <div class="left-height-one"></div>
            <p>
              <span class="left-action-up">{{accountToutiaoMsg.digg_count}}</span>
              <span class="left-action-down">获赞</span>
            </p>
            <div class="left-height-one"></div>
            <p>
              <span class="left-action-up">{{accountToutiaoMsg.publish_count}}</span>
              <span class="left-action-down">头条</span>
            </p>
          </div> -->
          <div class="search-left-action flex-arr-center">
            <p>
              <span class="left-action-up">{{accountToutiaoMsg.followings_count}}</span>
              <span class="left-action-down">关注</span>
            </p>
            <div class="left-height-one"></div>
            <p>
              <span class="left-action-up">{{accountToutiaoMsg.followers_count}}</span>
              <span class="left-action-down">粉丝</span>
            </p>
          </div>
          <div class="search-left-action flex-arr-center">
            <p class="left-p1">
              <span class="left-action-up">{{accountToutiaoMsg.digg_count}}</span>
              <span class="left-action-down">获赞</span>
            </p>
            <div class="left-height-one"></div>
            <p>
              <span class="left-action-up">{{accountToutiaoMsg.publish_count}}</span>
              <span class="left-action-down">头条</span>
            </p>
          </div>
          <div class="search-slider"></div>
        </div>
        <!-- <div class="search-left-rank flex-cloumn-cen">
          <p>周新榜指数 <i class="el-icon-discount"></i></p>
          <p>373.2</p>
          <p>第133985名 · <span class="search-left-click cursor"> 文摘 · 周榜</span><i class="el-icon-arrow-right"></i></p>
        </div> -->

        <div class="search-left-class">
          <div class="search-class-ren flex-all-center" :style="{background: comfirmColor}" v-if="accountToutiaoMsg.verified_agency=='头条认证'">
            <img src="@/assets/images/search/v_4.png" alt="">
            <p>头条认证</p>
          </div>
          <p style="margin-bottom:10px;" v-if="accountToutiaoMsg.verified_content">{{accountToutiaoMsg.verified_content}}</p>
          <!-- <div class="search-slider"></div> -->
          <p v-if="accountToutiaoMsg.function_type">
            <i class="el-icon-s-order"></i>
            <span class="left-class-label">行业类别：</span>
            <span class="left-class-cont">{{accountToutiaoMsg.function_type}}</span>
          </p>
          <p>
            <i class="el-icon-s-data"></i>
            <span class="left-class-label">纳入易有数样本库：</span>
            <span class="left-class-cont">{{insertTime}}</span>
          </p>
          <!-- <div class="search-slider"></div> -->
          <p>
            <i class="el-icon-notebook-2"></i>
            <span class="left-class-label">简介：</span>
            <span v-html="accountToutiaoMsg.description || '-'" class="left-class-cont"></span>
          </p>
          <!-- <div v-if="accountToutiaoMsg.is_collect"
               class="search-slider"></div>
          <p v-if="!accountToutiaoMsg.is_collect">
            <span class="left-class-label">该账号暂未采集监控</span>
            <span class="left-class-caiji cursor"
                  @click="submitGather">申请采集</span>
          </p> -->
        </div>
      </div>
      <div class="search-right-main">
        <div class="search-right-tab">
          <ul class="flex-ali-center">
            <li :class="{ 'tab_active': tabActive === 'rule'}"
                @click="$router.push({ name: 'ReleaseRulesToutiao' , query: { id: accountId } })">
              发布规律
            </li>
            <li :class="{ 'tab_active': tabActive === 'class'}"
                @click="$router.push({ name: 'ArticleClassToutiao' , query: { id: accountId } })">
            文章类别
            </li>
            <li :class="{ 'tab_active': tabActive === 'history'}"
                @click="$router.push({ name: 'HistoryTweetsToutiao' , query: { id: accountId } })">
              历史推文
            </li>
            <li :class="{ 'tab_active': tabActive === 'data'}"
                @click="$router.push({ name: 'BasicDataToutiao' , query: { id: accountId } })">
              基础数据统计
            </li>
          </ul>
        </div>
        <router-view v-if="this.accountToutiaoMsg.id" ref="child"></router-view>
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
      accountToutiaoMsg: {},
      insertTime: '',
      // comfirmColor: '#707070' // 蓝色#3B81FE
      comfirmColor: '#3B81FE'
    }
  },
  methods: {
    // 申请采集
    submitGather () {
      // let obj = {
      //   screenName: this.accountToutiaoMsg.screen_name,
      //   uid: this.accountToutiaoMsg.id
      // }
      // this.$http.post(this.$api.wbGather, obj)
      //   .then(res => {
      //     this.$message.success('添加成功，等待审核！')
      //   })
      let obj = {
        screen_name: this.accountToutiaoMsg.screen_name,
        user_id: this.accountToutiaoMsg.user_id
      }
      this.$http.post(this.$api.toutiaoNotCollect, obj)
        .then(res => {
          this.$message.success('添加成功，等待审核！')
        })
    },
    // 收藏和取消收藏
    submitCollect (isCollect) {
      // this.$set(this.accountToutiaoMsg, 'is_follow', isCollect)
      let getApi = ''
      let obj = {
        account: this.accountToutiaoMsg.user_id,
        type: 3 // 头条
      }
      if (isCollect === 1) {
        getApi = getcollectApi.get('concern')
        obj.accountName = this.accountToutiaoMsg.screen_name
      } else {
        getApi = getcollectApi.get('cancel')
      }
      this.$http.get(this.$api[getApi], { params: obj }) // 微信 1
        .then(res => {
          this.$set(this.accountToutiaoMsg, 'is_follow', isCollect)
          if (isCollect === 1) {
            this.$message.success('成功收藏！')
          } else {
            this.$message.success('成功取消收藏！')
          }
        })
    },
    // 获取公众号信息
    getaccountToutiaoMsg () {
      this.$http.post(this.$api.queryTtDetails, { userId: this.accountId })
        .then(res => {
          this.accountToutiaoMsg = res.data.data
          // if (this.accountToutiaoMsg.verified) {
          //   if (this.accountToutiaoMsg.verified_type === 0 && this.accountToutiaoMsg.verified_type_ext === 1) {
          //     this.comfirmColor = '#F56C6C'
          //   } else if (this.accountToutiaoMsg.verified_type === 0 && this.accountToutiaoMsg.verified_type_ext === 0) {
          //     this.comfirmColor = '#E6A23C'
          //   } else {
          //     this.comfirmColor = '#3B81FE'
          //   }
          // }
          let accountInfo = {
            user_id: this.accountToutiaoMsg.user_id
          }
          // this.$store.commit('mutations/getWbAccountInfo', accountInfo)getToutiaoAccountInfo
          this.$store.commit('mutations/getToutiaoAccountInfo', accountInfo)
          this.insertTime = res.data.data.create_time.slice(0, 10)
        }).catch(() => {})
    }
  },
  created () {
    this.tabActive = this.$route.path.split('/')[3]
    console.log(this.tabActive)
    this.accountId = this.$route.query.id
    this.getaccountToutiaoMsg()
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
<style lang="scss" scoped>
  .search-left-action{
    position: relative;
    .left-height-one{
      // position: absolute;
      // left:115px;
    }
    p{
      width: 50%;
      text-align: center;
    }
    span{
      text-align: center;
    }
  }
</style>
