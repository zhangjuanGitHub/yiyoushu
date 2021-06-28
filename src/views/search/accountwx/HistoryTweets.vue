<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-29 14:21:49
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-05-18 14:24:06
-->
<template>
  <div class="search-material-wrap">
    <div class="flex-bwt-center">
      <div class="search-class-tab flex-ali-center">
        <p :class="{'is-class': historyActive === 'new'}"
            @click="changeHistoryTab('new')">最新推文</p>
        <p :class="{'is-class': historyActive === 'hot'}"
            @click="changeHistoryTab('hot')">30天热门推文</p>
        <p :class="{'is-class': historyActive === 'all'}"
            @click="changeHistoryTab('all')">全部推文</p>
      </div>
      <div class="his-date-pick">
        <div class="flex-ali-center" v-if="historyActive === 'all'">
          <p>时间</p>
          <el-date-picker v-model="timeValue"
                          type="daterange"
                          size="small"
                          @change="changeDate"
                          :picker-options="pickerDateBefore"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <!-- <p class="search-his-pp">数据更新时间：<span>{{updateTime}}</span></p>
        <p class="search-his-ii" @click="updateDataTT"><i class="el-icon-refresh cursor"></i>更新数据</p> -->
      </div>
    </div>
    <!-- 最新推文 -->
    <div v-if="!isHot">
      <!-- <div class="search-his-head flex-bwt-center" v-if="false">
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
      </div> -->
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
                <p class="search-his-ii" @click="updateDataTT(i.sn)"><i class="el-icon-refresh cursor"></i>更新数据</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 30天热门推文 / 全部推文 -->
    <div class="search-thir-main" v-if="isHot">
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
      <set-page @pagingChange="pagingChange"
                  :total="total"
                  ref="child"
                  v-if="historyActive === 'all'"></set-page>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { timeFormat, secondsFormat } from '@/lib/tools'
export default {
  name: 'search',
  components: {},
  data () {
    return {
      pickerDateBefore: { // 禁用当天之后的日期
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
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
      pageBean: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      historyList: [],
      thityList: [],
      timeValue: []
    }
  },
  methods: {
    // 切换tab页
    changeHistoryTab (tab) {
      this.historyActive = tab
      if (tab === 'new') {
        this.isHot = false
        this.getNewestTw()
      } else {
        this.isHot = true
        tab === 'hot' ? this.getThirtyTw() : this.getAllTweets()
      }
    },
    // 重置
    resetForm () {},
    // 筛选
    searchList () {},
    // 详情
    toAnalyse (item) {
      let route = this.$router.resolve({ name: 'ArticleAnalyse', query: { accountId: this.accountId, articleId: item.id } })
      window.open(route.href, '_blank')
    },
    // 单选框筛选
    selectRadio () {},
    // 全部推文时间筛选
    changeDate (val) {
      this.timeValue = val
      this.getAllTweets()
    },
    // 最新推文
    getNewestTw () {
      let obj = {
        biz: this.accountId,
        idx: 0,
        isOrigin: 0,
        pageType: 0
      }
      this.$http.post(this.$api.getNewestTw, obj)
        .then(res => {
          this.historyList = res.data.data
        }).catch(() => {})
    },
    // 30天热门推文
    getThirtyTw () {
      this.$http.post(this.$api.getThirtyHot, { biz: this.accountId })
        .then(res => {
          this.thityList = res.data.data
        }).catch(() => {})
    },
    pagingChange (query) {
      this.pageBean.pageSize = query.size
      this.pageBean.pageNum = query.page
      this.getAllTweets()
    },
    // 全部推文
    getAllTweets () {
      let obj = {
        biz: this.accountId,
        startTime: this.timeValue[0],
        endTime: this.timeValue[1],
        pageBean: {
          pageNum: (this.pageBean.pageNum - 1) * this.pageBean.pageSize + 1,
          pageSize: this.pageBean.pageSize
        }
      }
      this.$http.post(this.$api.getAllTweets, obj)
        .then(res => {
          this.thityList = res.data.data.data
          this.total = res.data.data.count
        }).catch(() => {})
    },
    // 更新数据
    updateDataTT (sn) {
      this.$http.get(`${this.$api.updateYime}/${sn}`)
        .then(res => {
          this.$message.success('更新成功，稍后再来查看')
        }).catch(() => {})
    },
    calcDate (num) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * num)
      return date
    }
  },
  created () {
    this.accountId = this.$route.query.id
    this.getNewestTw()
    let now = this.calcDate(1)
    let seven = this.calcDate(30)
    this.timeValue[1] = timeFormat(now)
    this.timeValue[0] = timeFormat(seven)
  },
  computed: {
    ...mapState({
      accountMsg: state => state.mutations.accountMsg
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../search.scss';
</style>
