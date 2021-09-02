<!--
 * @Author: zhangjuan
 * @Date: 2021-05-19 11:40:25
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-08-04 18:09:35
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
        <!-- <el-button type="primary"
                     @click="searchWbList"
                     size="small">搜索</el-button> -->
      </el-form-item>
      <el-form-item label=""
                    prop="">
        <el-button type="primary"
                   @click="searchWbList"
                   size="small">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- <div class="wb-his-action flex-bwt-center">
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
    </div> -->
    <div class="search-material-up flex-ali-center">
      <p class="search-mater-theme">历史头条列表</p>
      <!-- <el-input v-model="ruleForm.keyword"
                size="small"
                class="wb-his-list"
                placeholder="请输入关键词">
        <el-button slot="append"
                   icon="el-icon-search"
                   @click="searchWbList"></el-button>
      </el-input> -->
    </div>
    <div class="wb-rules-list">
      <div class="morehot-tab-head">
        <p style="display:inline-block">
          <span :class="{ 'sort_active': typeActive === '' }"
                @click="changetypeActive('')"
                v-html="'全部('+num.all+')'"></span>
          <span :class="{ 'sort_active': typeActive === 0 }"
                @click="changetypeActive(0)"
                v-html="'文章('+num.article+')'"></span>
          <span :class="{ 'sort_active': typeActive === 1 }"
                @click="changetypeActive(1)"
                v-html="'视频('+num.video+')'"></span>
          <span :class="{ 'sort_active': typeActive === 2 }"
                @click="changetypeActive(2)"
                v-html="'小视频('+num.smallVideo+')'"></span>
          <span :class="{ 'sort_active': typeActive === 3 }"
                @click="changetypeActive(3)"
                v-html="'微头条('+num.headlines+')'"></span>
          <!-- <span :class="{ 'sort_active': typeActive === 2 }"
                @click="changetypeActive(2)"
                v-html="'视频('+num.videosNum+')'"></span> -->
        </p>
        <div class=""
             style="display:inline-block;float:right">
          <el-input v-model="ruleForm.keyword"
                    size="small"
                    class="wb-his-list"
                    placeholder="请输入关键词">
          </el-input>
          <el-button type="primary"
                     @click="searchWbList"
                     size="small">搜索</el-button>
        </div>
      </div>
      <el-table :data="toutiaoSomeList"
                style="width: 100%"
                border
                :cell-style="{ textAlign: 'center' }">
        <el-table-column label="历史头条">
          <template slot-scope='scope'>
            <div class="more-msg-right flex-ali-center">
              <!-- :style="{backgroundImage: 'url('+scope.row.original_pic+')' -->
              <div class="more-cover-box"
                   v-if="scope.row.original_pic">
                <img :src="scope.row.original_pic"
                     alt="">
              </div>
              <p class="lin-clamp-3 cursor"
                 v-html="scope.row.title"
                 @click="$router.push({ name: 'TweetsDetailsToutiao',query: { itemId: scope.row.item_id, userId: accountToutiaoMsg.user_id } })"></p>
              <span class="wb-is-original"
                    v-if="scope.row.is_original">原创</span>
              <!-- <el-tooltip class="item"
                          effect="dark"
                          content="视频"
                          placement="top">
                <i class="el-icon-video-camera warning"
                   v-if="scope.row.has_video"></i>
              </el-tooltip>
              <el-tooltip class="item"
                          effect="dark"
                          content="图文"
                          placement="top">
                <i class="el-icon-picture-outline warning"
                   v-if="scope.row.pic_num > 0"></i>
              </el-tooltip>
              <el-tooltip class="item"
                          effect="dark"
                          content="文章"
                          placement="top">
                <i class="el-icon-tickets warning"
                   v-if="scope.row.is_article"></i>
              </el-tooltip> -->
              <!-- <span v-if="scope.row.has_video"
                    class="video-num">播放<i>222</i>次</span> -->
              <span v-if="typeActive === 2 || typeActive === 1"
                    class="video-num">播放<i>{{scope.row.play_count}}</i>次</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="publish_time"
                         label="发布时间"
                         width="160">
        </el-table-column>
        <!-- <el-table-column prop="play_count"
                         label="播放次数"
                         width="100"
                         v-if="typeActive === 2 || typeActive === 1">
        </el-table-column> -->
        <el-table-column label="点赞数"
                         width="130" sortable prop="digg_count">
          <template slot-scope="scope">
            <div class="morehot-icon flex-all-center">
              <img src="@/assets/images/home/icon_2.png"
                   alt=""
                   style="margin-top:-3px">
              <p>{{scope.row.digg_count}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="评论数"
                         width="120" sortable prop="comment_count">
          <template slot-scope="scope">
            <div class="morehot-icon flex-all-center">
              <img src="@/assets/images/home/icon_4.png"
                   alt="">
              <p>{{scope.row.comment_count}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="120"
                         label="转发数" sortable prop="forward_count">
          <template slot-scope="scope">
            <div class="morehot-icon flex-all-center">
              <img src="@/assets/images/home/icon_5.png"
                   alt="">
              <p>{{scope.row.forward_count}}</p>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- <p class="flex-all-center"
         v-if="isMore"><span class="primary cursor"
              @click="getToutiaoSomeList">点击加载更多</span></p> -->
      <p class="flex-all-center"
         v-if="isMore"><span class="primary cursor"
              @click="getMore">点击加载更多</span></p>
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
      typeActive: '',
      toutiaoSomeList: [],
      ruleForm: {
        publishTime: [],
        keyword: ''
      },
      scrollId: '',
      isMore: false,
      num: { // 获取头条列表数量
        all: 0, // 全部
        headlines: 0, // 微头条
        article: 0, // 文章数
        video: 0, // 视频数
        smallVideo: 0// 小视频
      },
      action: {
        repostsCount: 0, // 转发总数
        total: 0, // 发博总数
        commentsCount: 0, // 评论总数
        attitudesCount: 0 // 点赞总数
      },
      pageNum: 1,
      pageSize: 10
    }
  },
  methods: {
    changetypeActive (tab) {
      this.typeActive = tab
      this.scrollId = ''
      this.toutiaoSomeList = []
      this.pageNum = 1
      this.isMore = false
      this.getToutiaoSomeList()
    },
    // 改变时间
    changeTime (val) {
      this.ruleForm.publishTime = val
      this.scrollId = ''
      this.toutiaoSomeList = []
      this.isMore = false
      this.getToutiaoSomeList()
      // this.getWbActions()
      this.getToutiaoNum()
    },
    searchWbList () {
      this.ruleForm.keyword = this.ruleForm.keyword.replace(/\s*/g, '')
      this.scrollId = ''
      this.toutiaoSomeList = []
      this.pageNum = 1
      this.isMore = false
      this.getToutiaoSomeList()
    },
    getMore () {
      this.pageNum++
      this.getToutiaoSomeList()
    },
    // 获取头条行为数据
    // getWbActions () {
    //   let obj = {
    //     uid: this.accountToutiaoMsg.id,
    //     startTime: this.ruleForm.publishTime[0],
    //     endTime: this.ruleForm.publishTime[1]
    //   }
    //   this.$http.post(this.$api.getActions, obj)
    //     .then(res => {
    //       this.action = res.data.data
    //     }).catch(() => { })
    // },
    // 获取头条热文
    getToutiaoSomeList () {
      console.log(this.ruleForm)
      let obj = {
        type: this.typeActive,
        queryText: this.ruleForm.keyword,
        userId: this.accountToutiaoMsg.user_id,
        // scrollId: this.scrollId,
        pageBean: {
          // pageNum: this.pageNum,
          pageNum: (this.pageNum - 1) * this.pageSize + 1,
          pageSize: this.pageSize
        },
        startTime: this.ruleForm.publishTime[0],
        endTime: this.ruleForm.publishTime[1]
      }
      this.$http.post(this.$api.queryTtArticleByUserIdAndType, obj)
        .then(res => {
          let datas = res.data.data
          let count = res.data.data.shift()
          console.log(count)
          if (datas.length > 0) {
            this.toutiaoSomeList.push(...datas)
            // console.log(this.pageNum * this.pageSize, count.count, this.pageNum * this.pageSize < count.count)
            if (this.pageNum * this.pageSize < count.count) {
              this.isMore = true
            } else {
              this.isMore = false
            }
          } else {
            this.toutiaoSomeList = []
          }

          // this.scrollId = res.data.data.scrollId
          // if (datas.length < 10) {
          //   this.isMore = false
          // } else {
          //   this.isMore = true
          // }
          // this.toutiaoSomeList.push(...datas)

          // if (res.data.data.length > 0) {
          //   this.total = res.data.data.shift()
          //   this.classData = res.data.data
          // } else {
          //   this.total = { count: 0 }
          //   this.classData = []
          // }
        }).catch(() => { })
    },
    // 获取头条列表数量
    getToutiaoNum () {
      let obj = {
        userId: this.accountToutiaoMsg.user_id,
        startTime: this.ruleForm.publishTime[0],
        endTime: this.ruleForm.publishTime[1]
      }
      console.log(obj)
      this.$http.post(this.$api.ttProportionOfTypes, obj)
        .then(res => {
          if (res.data.data.all) {
            this.num = res.data.data
            console.log(this.num)
          } else {
            this.num = {
              all: 0, // 全部
              headlines: 0, // 微头条
              article: 0, // 文章数
              video: 0, // 视频数
              smallVideo: 0// 小视频
            }
          }
        }).catch(() => { })
    },
    calcDate (num) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * num)
      return date
    }
  },
  mounted () { },
  created () {
    let now = new Date()
    let start = this.calcDate(30)
    this.ruleForm.publishTime[1] = timeFormat(now)
    this.ruleForm.publishTime[0] = timeFormat(start)
    this.accountId = this.$route.query.id
    this.getToutiaoSomeList()
    this.getToutiaoNum()
    // this.getWbActions()
  },
  computed: {
    ...mapState({
      accountToutiaoMsg: state => state.mutations.accountToutiaoMsg
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
.wb-his-datepick,
.wb-his-list {
  width: 230px;
}
.wb-his-list {
  margin-left: 20px;
}
.more-msg-right i {
  margin-left: 3px;
  cursor: pointer;
}
.video-num i {
  color: #f70606;
}
</style>
