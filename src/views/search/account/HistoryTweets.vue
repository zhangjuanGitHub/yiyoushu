<!--
 * @Author: zhangjuan
 * @Description: 
 * @Date: 2021-01-29 14:21:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-02 17:05:38
-->
<template>
  <div class="search-material-wrap">
    <div class="flex-bwt-center">
      <div class="search-class-tab flex-ali-center">
        <p :class="{'is-class': historyActive === 'new'}"
            @click="changeHistoryTab('new')">最新推文</p>
        <p :class="{'is-class': historyActive === 'hot'}"
            @click="changeHistoryTab('hot')">30天热门推文</p>
      </div>
      <div class="flex-ali-center">
        <p class="search-his-pp">数据更新时间：<span>{{updateTime}}</span></p>
        <p class="search-his-ii" @click="updateDataTT"><i class="el-icon-refresh cursor"></i>更新数据</p>
      </div>
    </div>
    <!-- 最新推文 -->
    <div v-if="!isHot">
      <div class="search-his-head flex-bwt-center" v-if="false">
        <el-radio-group v-model="radio"
                        @change="selectRadio">
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="1">展示头条</el-radio>
          <el-radio :label="2">展示次条</el-radio>
          <el-radio :label="3">展示原创</el-radio>
          <el-radio :label="4">展示视频文章</el-radio>
        </el-radio-group>
        <div class="flex-ali-center">
          <el-select v-model="ruleForm.keywordType"
                      size="small"
                      class="search-head-select"
                      placeholder="请选择">
            <el-option label="标题"
                        value="1"></el-option>
            <el-option label="内容"
                        value="2"></el-option>
          </el-select>
          <el-input v-model="ruleForm.keyword"
                    size="small"
                    class="search-head-input"
                    placeholder="请输入关键字"></el-input>
          <el-button size="small"
                      type="primary"
                      @click="searchList">筛选</el-button>
          <el-button size="small"
                      @click="resetForm">重置</el-button>
        </div>
      </div>
      <div class="search-slider"></div>
      <div class="search-his-main">
        <div class="search-his-list"
              v-for="(item, index) of historyList" :key="index">
          <div class="search-list-time flex-bwt-center">
            <p>发文时间：<span>{{item.last_pubtime}}</span></p>
            <p>数据更新时间：<span>{{item.update_time}}</span></p>
          </div>
          <div class="search-list-main">
            <div class="search-list-box flex-bwt-center" v-for="(i, sIndex) of item.list" :key="sIndex">
              <p>
                <span class="search-list-icon" v-if="i.idx === '1'">头条</span>
                <span class="search-list-icon" v-else-if="i.idx === '2'">次条</span>
                <span class="search-list-icon" v-else>{{i.idx}}条</span>
                <span class="search-list-title lin-clamp-1" @click="toAnalyse(i)">{{i.title}}</span>
              </p>
              <div class="search-list-data flex-ali-center">
                <img src="@/assets/images/home/data_1.png" alt="">
                <p>阅读：</p><p v-html="i.read_num > 100000 ? '10万+' : i.read_num"></p>
                <img src="@/assets/images/home/data_2.png" alt="" style="margin-top: -3px">
                <p>点赞：</p><p v-html="i.old_like_num > 100000 ? '10万+' : i.old_like_num"></p>
                <img src="@/assets/images/home/data_3.png" alt="">
                <p>在看：</p><p v-html="i.like_num > 100000 ? '10万+' : i.like_num"></p>
                <img src="@/assets/images/home/data_4.png" alt="">
                <p>留言：</p><p v-html="i.comment_count > 100000 ? '10万+' : i.comment_count"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 30天热门推文 -->
    <div class="search-thir-main" v-if="isHot">
      <!-- <div class="search-list-main"> -->
      <div class="search-his-thirty flex-bwt-center" v-for="(item, index) of thityList" :key="index">
        <p>
          <span class="search-list-title lin-clamp-1" @click="toAnalyse(item)">{{item.title}}</span>
        </p>
        <div class="search-list-data flex-ali-center">
          <img src="@/assets/images/home/data_1.png" alt="">
          <p>阅读：</p>
          <p v-html="item.read_num > 100000 ? '10万+' : item.read_num"></p>
          <img src="@/assets/images/home/data_2.png" alt="" style="margin-top: -3px">
          <p>点赞：</p>
          <p v-html="item.old_like_num > 100000 ? '10万+' : item.old_like_num"></p>
          <img src="@/assets/images/home/data_3.png" alt="">
          <p>在看：</p>
          <p v-html="item.like_num > 100000 ? '10万+' : item.like_num"></p>
          <img src="@/assets/images/home/data_4.png" alt="">
          <p>留言：</p>
          <p v-html="item.comment_count > 100000 ? '10万+' : item.comment_count"></p>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { timeFormat, secondsFormat } from '@/lib/tools'
export default {
  name: 'search',
  components: {},
  data () {
    return {
      historyActive: 'new',
      isHot: false,
      radio: 0,
      ruleForm: {
        keywordType: '1',
        keyword: '',
        biz: '',
        idx: 0,
        isOrigin: 0,
        pageType: 0
      },
      historyList: [],
      thityList: [],
      accountMsg: {},
      updateTime: ''
    }
  },
  methods: {
    // 切换tab页
    changeHistoryTab (tab) {
      this.historyActive = tab
      if (tab === 'hot') {
        this.isHot = true
        this.getThirtyTw()
        this.getCurrentTime()
      } else {
        this.isHot = false
        this.getNewestTw()
        this.getCurrentTime()
      }
    },
    // 重置
    resetForm () {},
    // 筛选
    searchList () {},
    // 详情
    toAnalyse (item) {
      // let obj = {
      //   type: item.classify_val,
      //   idx: item.idx,
      //   sn: item.sn,
      //   title: item.title,
      //   url: item.url,
      //   articleId: item.id,
      //   update_time: item.update_time,
      //   nickname: this.accountMsg.nickname,
      //   alias: this.accountMsg.alias,
      //   headUrl: this.accountMsg.ori_head_img,
      //   id: this.accountId
      // }
      this.$router.push({ name: 'ArticleAnalyse', query: { accountId: this.accountId, articleId: item.id } })
      // const {href} = this.$router.resolve({ name: 'ArticleAnalyse', params: { obj: obj } })
      // window.open(href, '_blank')
    },
    // 单选框筛选
    selectRadio () {},
    // 最新推文
    getNewestTw () {
      let obj = {
        biz: this.accountMsg.biz,
        idx: 0,
        isOrigin: 0,
        pageType: 0
      }
      this.$http.post(this.$api.getNewestTw, obj)
        .then(res => {
          this.historyList = res.data.data
        })
    },
    // 30天热门推文
    getThirtyTw () {
      this.$http.post(this.$api.getThirtyHot, { biz: this.accountMsg.biz })
        .then(res => {
          this.thityList = res.data.data
        })
    },
    getAccountMsg () {
      this.$http.get(`${this.$api.getWxAccount}/${this.accountId}`)
        .then(res => {
          this.accountMsg = res.data.data[0]
          this.getNewestTw()
        }).catch(() => {})
    },
    // 更新数据
    updateDataTT () {
      this.getCurrentTime()
      if (this.isHot) {
        this.getThirtyTw()
      } else {
        this.getNewestTw()
      }
    },
    // 获取当前时间
    getCurrentTime () {
      const now = new Date()
      this.updateTime = timeFormat(now.getTime()) + ' ' + secondsFormat(now.getTime())
    }
  },
  created () {
    this.accountId = this.$route.query.id
    this.getAccountMsg()
    this.getCurrentTime()
  }
}
</script>
<style lang="scss" scoped>
@import '../search.scss';
</style>
