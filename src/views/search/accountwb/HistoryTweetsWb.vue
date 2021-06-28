<!--
 * @Author: zhangjuan
 * @Date: 2021-05-19 11:40:25
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-06-04 11:20:01
-->
<template>
  <div class="search-material-wrap">
    <el-form :inline="true"
              ref="ruleForm"
              :model="ruleForm">
      <el-form-item label="发布时间"
                    prop="publishTime">
        <el-date-picker v-model="ruleForm.publishTime"
                        type="daterange"
                        size="small"
                        :clearable="false"
                        @change="changeTime"
                        class="wb-his-datepick"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div class="wb-his-action flex-bwt-center">
      <div class="wb-his-actbox flex-all-center">
        <img src="@/assets/images/search/wbhis_1.png" alt="">
        <p>
          <span style="color:#5F96F3">{{action.total}}</span>
          <span>总发博篇数</span>
        </p>
      </div>
      <div class="wb-his-actbox flex-all-center">
        <img src="@/assets/images/search/wbhis_2.png" alt="">
        <p>
          <span style="color:#FFC154">{{action.attitudesCount}}</span>
          <span>总点赞数</span>
        </p>
      </div>
      <div class="wb-his-actbox flex-all-center">
        <img src="@/assets/images/search/wbhis_3.png" alt="">
        <p>
          <span style="color:#4CAF50">{{action.commentsCount}}</span>
          <span>总评论数</span>
        </p>
      </div>
      <div class="wb-his-actbox flex-all-center">
        <img src="@/assets/images/search/wbhis_4.png" alt="">
        <p>
          <span style="color:#F54336">{{action.repostsCount}}</span>
          <span>总转发数</span>
        </p>
      </div>
    </div>
    <div class="search-material-up flex-ali-center">
      <p class="search-mater-theme">历史微博列表</p>
      <el-input v-model="ruleForm.keyword"
                size="small"
                class="wb-his-list"
                placeholder="请输入关键词">
        <el-button slot="append" icon="el-icon-search" @click="searchWbList"></el-button>
      </el-input>
    </div>
    <div class="wb-rules-list">
      <div class="morehot-tab-head">
        <p>
          <span :class="{ 'sort_active': typeActive === 0 }"
                @click="changetypeActive(0)" v-html="'全部('+num.total+')'"></span>
          <span :class="{ 'sort_active': typeActive === 1 }"
                @click="changetypeActive(1)" v-html="'原创('+num.originalNumber+')'"></span>
          <span :class="{ 'sort_active': typeActive === 3 }"
                @click="changetypeActive(3)" v-html="'文章('+num.articlesNum+')'"></span>
          <span :class="{ 'sort_active': typeActive === 4 }"
                @click="changetypeActive(4)" v-html="'图片('+num.picsNum+')'"></span>
          <span :class="{ 'sort_active': typeActive === 2 }"
                @click="changetypeActive(2)" v-html="'视频('+num.videosNum+')'"></span>
        </p>
      </div>
      <el-table :data="wbSomeList"
                style="width: 100%"
                border
                :cell-style="{ textAlign: 'center' }">
        <el-table-column label="历史微博">
            <template slot-scope='scope'>
              <div class="more-msg-right flex-ali-center">
                  <!-- :style="{backgroundImage: 'url('+scope.row.original_pic+')' -->
                <div class="more-cover-box" v-if="scope.row.original_pic">
                  <img :src="scope.row.original_pic" alt="">
                </div>
                <p class="lin-clamp-3 cursor" v-html="scope.row.raw_text"
                  @click="$router.push({ name: 'TweetsDetails',query: { id: scope.row.id, uid: accountWbMsg.uid } })"></p>
                <span class="wb-is-original" v-if="!scope.row.is_retweeted">原创</span>
                <el-tooltip class="item" effect="dark" content="视频" placement="top">
                  <i class="el-icon-video-camera warning" v-if="scope.row.has_video"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="图文" placement="top">
                  <i class="el-icon-picture-outline warning" v-if="scope.row.pic_num > 0"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="文章" placement="top">
                  <i class="el-icon-tickets warning" v-if="scope.row.is_article"></i>
                </el-tooltip>
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
      <p class="flex-all-center" v-if="isMore"><span class="primary cursor" @click="getWbSomeList">点击加载更多</span></p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { timeFormat } from '@/lib/tools'
export default {
  name: 'search',
  components: {},
  data () {
    return {
      typeActive: 0,
      wbSomeList: [],
      ruleForm: {
        publishTime: [],
        keyword: '',
      },
      scrollId: '',
      isMore: false,
      num: { // 获取微博列表数量
        total: 0, // 全部
        originalNumber: 0, // 原创
        forwardingNumber: 0, // 转发
        picsNum: 0, // 含图片
        articlesNum: 0, // 文章数
        videosNum: 0, // 视频数
      },
      action: {
        repostsCount: 0, //转发总数
        total: 0, // 发博总数
        commentsCount: 0, //评论总数
        attitudesCount: 0, // 点赞总数
      }
    }
  },
  methods: {
    changetypeActive (tab) {
      this.typeActive = tab
      this.scrollId = ''
      this.wbSomeList = []
      this.isMore = false
      this.getWbSomeList()
    },
    // 改变时间
    changeTime (val) {
      this.ruleForm.publishTime = val
      this.scrollId = ''
      this.wbSomeList = []
      this.isMore = false
      this.getWbSomeList()
      this.getWbActions()
      this.getWbNum()
    },
    searchWbList () {
      this.ruleForm.keyword = this.ruleForm.keyword.replace(/\s*/g, '')
      this.scrollId = ''
      this.wbSomeList = []
      this.isMore = false
      this.getWbSomeList()
    },
    // 获取微博行为数据
    getWbActions () {
      let obj = {
        uid: this.accountWbMsg.uid,
        startTime: this.ruleForm.publishTime[0],
        endTime: this.ruleForm.publishTime[1]
      }
      this.$http.post(this.$api.getActions, obj)
        .then(res => {
          this.action = res.data.data
        }).catch(() => {})
    },
    // 获取微博热文
    getWbSomeList () {
      let obj = {
        queryType: this.typeActive,
        queryText: this.ruleForm.keyword,
        uid: this.accountWbMsg.uid,
        scrollId: this.scrollId,
        startTime: this.ruleForm.publishTime[0],
        endTime: this.ruleForm.publishTime[1]
      }
      this.$http.post(this.$api.getSomeWb, obj)
        .then(res => {
          let datas = res.data.data.data
          this.scrollId = res.data.data.scrollId
          if (datas.length < 10) {
            this.isMore = false
          } else {
            this.isMore = true
          }
          this.wbSomeList.push(...datas)
        }).catch(() => {})
    },
    // 获取微博列表数量
    getWbNum () {
      let obj = {
        uid: this.accountWbMsg.uid,
        startTime: this.ruleForm.publishTime[0],
        endTime: this.ruleForm.publishTime[1]
      }
      this.$http.post(this.$api.getListNum, obj)
        .then(res => {
          this.num = res.data.data
        }).catch(() => {})
    },
    calcDate (num) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * num)
      return date
    }
  },
  mounted () {},
  created () {
    let now = new Date()
    let start = this.calcDate(30)
    this.ruleForm.publishTime[1] = timeFormat(now)
    this.ruleForm.publishTime[0] = timeFormat(start)
    this.accountId = this.$route.query.id
    this.getWbSomeList()
    this.getWbNum()
    this.getWbActions()
  },
  computed: {
    ...mapState({
      accountWbMsg: state => state.mutations.accountWbMsg
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../search.scss';
.wb-his-action {
  min-height: 100px;
  padding-top: 20px;
}
.wb-his-datepick, .wb-his-list {
  width: 230px;
}
.wb-his-list {
  margin-left: 20px;
}
.more-msg-right i {
  margin-left: 3px;
  cursor: pointer;
}
</style>
