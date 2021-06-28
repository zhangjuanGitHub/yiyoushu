<!--
 * @Author: zhangjuan
 * @Date: 2021-05-19 09:58:11
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-06-04 10:41:26
-->
<template>
  <div class="center-wraper">
    <div class="account-wraper">
      <div class="search-left-wrap">
        <div class="search-left-up-box">
          <div class="flex-cloumn-cen search-left-up">
            <img :src="accountWbMsg.profile_image_url" alt="">
            <p v-html="accountWbMsg.screen_name"></p>
            <div class="search-left-act flex-ali-center">
              <div class="flex-ali-center">
                <img v-if="accountWbMsg.is_follow === 0"
                      @click="submitCollect(1)"
                      src="@/assets/images/home/collect_1.png" alt="">
                <img v-else-if="accountWbMsg.is_follow === 1"
                      @click="submitCollect(0)"
                      src="@/assets/images/home/collect_2.png" alt="">
                <p>收藏</p>
              </div>
              <!-- <el-popover placement="bottom"
                          width="60"
                          trigger="hover">
                <img class="account-popover" :src="accountWbMsg.qrcode" alt="">
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
          <div class="search-left-action flex-arr-center">
            <p>
              <span class="left-action-up">{{accountWbMsg.follow_count}}</span>
              <span class="left-action-down">关注</span>
            </p>
            <div class="left-height-one"></div>
            <p>
              <span class="left-action-up">{{accountWbMsg.followers_count}}</span>
              <span class="left-action-down">粉丝</span>
            </p>
            <div class="left-height-one"></div>
            <p>
              <span class="left-action-up">{{accountWbMsg.statuses_count}}</span>
              <span class="left-action-down">微博</span>
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
          <div class="search-class-ren flex-all-center" :style="{background: comfirmColor}">
            <img src="@/assets/images/search/v_4.png" alt="">
            <p>微博认证</p>
          </div>
          <!-- <div class="search-slider"></div> -->
          <p>
            <i class="el-icon-s-order"></i>
            <span class="left-class-label">行业类别：</span>
            <span class="left-class-cont">{{accountWbMsg.function_type}}</span>
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
            <span v-html="accountWbMsg.description || '-'" class="left-class-cont"></span>
          </p>
          <div v-if="accountWbMsg.is_collect !== 1"
               class="search-slider"></div>
          <p v-if="accountWbMsg.is_collect !== 1">
            <span class="left-class-label">该账号暂未采集监控</span>
            <span class="left-class-caiji cursor"
                  @click="submitGather">申请采集</span>
          </p>
        </div>
      </div>
      <div class="search-right-main">
        <div class="search-right-tab">
          <ul class="flex-ali-center">
            <li :class="{ 'tab_active': tabActive === 'rule'}"
                @click="$router.push({ name: 'ReleaseRulesWb' , query: { id: accountId } })">
              发布规律
            </li>
            <li :class="{ 'tab_active': tabActive === 'history'}"
                @click="$router.push({ name: 'HistoryTweetsWb' , query: { id: accountId } })">
              历史推文
            </li>
            <li :class="{ 'tab_active': tabActive === 'data'}"
                @click="$router.push({ name: 'BasicDataWb' , query: { id: accountId } })">
              基础数据统计
            </li>
          </ul>
        </div>
        <router-view v-if="this.accountWbMsg.uid" ref="child"></router-view>
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
      accountWbMsg: {},
      insertTime: '',
      comfirmColor: '#707070'
    }
  },
  methods: {
    // 申请采集
    submitGather () {
      let obj = {
        screenName: this.accountWbMsg.screen_name,
        uid: this.accountWbMsg.uid
      }
      this.$http.post(this.$api.wbGather,  obj)
        .then(res => {
          this.$message.success('添加成功，等待审核！')
        })
    },
    // 收藏和取消收藏
    submitCollect (isCollect) {
      // this.$set(this.accountWbMsg, 'is_follow', isCollect)
      let getApi = ''
      let obj = {
        account: this.accountWbMsg.uid,
        type: 2 // 微博
      }
      if (isCollect === 1) {
        getApi = getcollectApi.get('concern')
        obj.accountName = this.accountWbMsg.screen_name
      } else {
        getApi = getcollectApi.get('cancel')
      }
      this.$http.get(this.$api[getApi], { params: obj }) // 微信 1
        .then(res => {
          this.$set(this.accountWbMsg, 'is_follow', isCollect)
          if (isCollect === 1) {
            this.$message.success('成功收藏！')
          } else {
            this.$message.success('成功取消收藏！')
          }
        })
    },
    // 获取公众号信息
    getaccountWbMsg () {
      this.$http.post(this.$api.getWbAccount, { uid: this.accountId } )
        .then(res => {
          this.accountWbMsg = res.data.data
          if (this.accountWbMsg.verified) {
            if (this.accountWbMsg.verified_type === 0 && this.accountWbMsg.verified_type_ext === 1) {
              this.comfirmColor = '#F56C6C'
            } else if (this.accountWbMsg.verified_type === 0 && this.accountWbMsg.verified_type_ext === 0) {
              this.comfirmColor = '#E6A23C'
            } else {
              this.comfirmColor = '#3B81FE'
            }
          }
          let accountInfo = {
            uid: this.accountWbMsg.uid,
          }
          this.$store.commit('mutations/getWbAccountInfo', accountInfo)
          this.insertTime = res.data.data.insert_time.slice(0, 10)
        }).catch(() => {})
    }
  },
  created () {
    this.tabActive = this.$route.path.split('/')[3]
    this.accountId = this.$route.query.id
    this.getaccountWbMsg()
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
