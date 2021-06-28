<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-29 14:19:45
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-05-27 11:42:32
-->
<template>
  <div class="search-material-wrap">
    <div>
      <span style="color: orange">近一个月该账号发布规律</span>
    </div>
    <div class="search-material-up">
      <p class="search-mater-theme">发布频次</p>
    </div>
    <div class="search-rules-num flex-bwt-center">
      <div id="myRules" class="search-num-echarts"></div>
      <div class="search-read-about flex-ali-center">
        <span>总推文</span>
        <p>{{releaseFrequency.count}}</p>
        <span>平均每次推文</span>
        <p>{{releaseFrequency.averageTweet}}</p>
        <span>推送次数</span>
        <p>{{releaseFrequency.pushTimes}}</p>
        <span>日均推送</span>
        <p>{{releaseFrequency.dailyAveragePush}}</p>
      </div>
    </div>
    <div class="search-material-up">
      <p class="search-mater-theme">微信阅读数分布</p>
    </div>
    <div class="search-rules-fenbu">
      <div class="search-fenbu-fang">
        <ul class="flex-all-center">
          <li v-for="(item, index) of readData" :key="index">
            <p> <span>{{item.num}}</span>篇, 阅读数 <span>{{item.range}}</span></p>
            <p class="search-fang-up" :style="{ background: item.color}"></p>
          </li>
        </ul>
        <ul class="search-fang-down flex-all-center">
          <li v-for="(item, index) of readData" :key="index">
            <p class="search-fang-icon" :style="{ background: item.color}"></p>
            <p>{{item.range}}</p>
          </li>
        </ul>
      </div>
      <div class="search-fenbu-list">
        <p>头条阅读数 Top<span v-html="readArticleData.length"></span></p>
        <ul>
            <li v-for="(item, index) of readArticleData" :key="index">
              <el-tooltip class="item" effect="light" placement="bottom"
                          :content="item.title"
                          v-if="item.title.length > 19">
                <p v-html="item.title" class="lin-clamp-1" @click="targetUrl(item.id)"></p>
              </el-tooltip>
              <p v-else v-html="item.title" @click="targetUrl(item.id)"></p>
            </li>
        </ul>
      </div>
    </div>
    <div class="search-material-up">
      <p class="search-mater-theme">发文趋势</p>
    </div>
    <div class="search-rules-point flex-ali-center">
      <div class="search-point-time flex-all-center">
        <div>
          <p class="search-point-pp">常见发布时段</p>
          <p>{{original.time}}</p>
        </div>
      </div>
      <div id="myBar" class="search-point-echarts"></div>
    </div>
    <div class="search-material-up">
      <p class="search-mater-theme">内容创作</p>
    </div>
    <div class="search-rules-cont flex-ali-center">
      <div class="search-read-about flex-ali-center">
        <span>原创篇数</span>
        <p>{{original.originNum}}</p>
      </div>
      <div class="search-cont-pro">
        <div class="search-pro-tool" :style="{ left: `calc(${original.percentage}% - 92px)`}">原创占比<span>{{original.percentage}}</span>%
          <p class="search-pro-tan"></p>
        </div>
        <el-progress :stroke-width="12" :percentage="original.percentage" :format="format" :show-text="false"></el-progress>
      </div>
    </div>
    <div class="search-material-up">
      <p class="search-mater-theme">互动留言</p>
    </div>
    <div class="search-read-about flex-ali-center">
      <span>含留言篇数</span>
      <p>{{leave.messagesNum}}</p>
      <span>留言总条数</span>
      <p>{{leave.messagesCount}}</p>
      <span>作者回复率</span>
      <p>{{leave.repliesNum}}%</p>
      <el-progress type="circle" :percentage="leave.repliesNum" :width="30" :stroke-width="2" :show-text="false"></el-progress>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入折线图组件
require('echarts/lib/chart/pie')
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  name: 'search',
  components: {},
  data () {
    return {
      releaseFrequency: {
        dailyAveragePush: 0, // 日均推送
        pushTimes: 0, // 推送次数
        averageTweet: 0, // 平均每次推文
        count: 0 // 总推文
      },
      original: { // 原创
        time: '',
        originNum: 0,
        percentage: 0
      },
      leave: { // 留言
        repliesNum: 0,
        messagesCount: 0,
        messagesNum: 0
      },
      readData: [],
      readArticleData: [] // 微信阅读发布文章
    }
  },
  methods: {
    format (percentage) {
      return '原创占比' + `${percentage}%`
    },
    targetUrl (id) {
      let route = this.$router.resolve({ name: 'ArticleAnalyse', query: { accountId: this.accountId, articleId: id } })
      window.open(route.href, '_blank')
    },
    // 饼图
    drawPie () {
      this.$http.post(this.$api.getReleasedNum, { biz: this.accountMsg.biz})
        .then(res => {
          this.releaseFrequency.count = res.data.data.count
          this.releaseFrequency.averageTweet = res.data.data.averageTweet
          this.releaseFrequency.pushTimes = res.data.data.pushTimes
          this.releaseFrequency.dailyAveragePush = res.data.data.dailyAveragePush
          let datas = res.data.data.releaseFrequency
          for (let i = 0; i < datas.length; i++) {
            if (datas[i].name === '1') {
              datas[i].name = '头条'
            } else if (datas[i].name === '2') {
              datas[i].name = '次条'
            } else {
              datas[i].name = i+1 + '条'
            }
          }
          // let label = []
          // datas.forEach(i => {label.push(i.name)})
          let myPie = echarts.init(document.getElementById('myRules'))
          let color = ['#54C7FC', '#FFB54D', '#FF7466', '#44DB5E', '#4D9FFF', '#FFD300', '#98BB5E', '#749BB7']
          myPie.setOption({
            color: color,
            legend: {
              orient: 'vertical',
              right: 0,
              top: 'center',
              itemWidth: 5,
              itemHeight: 5
            },
            formatter (name) {
              let str = ''
              for (var i = 0; i < datas.length; i++) {
                if (datas[i].name == name) {
                  str = datas[i].value;
                }
              }
              return name + ' ' + str + '篇';
            },
            series: [
              {
                name: '发布频次',
                type: 'pie',
                radius: ['55%', '85%'],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: 'center',
                  formatter: '{b}\n{c}' + '篇'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '16'
                  }
                },
                data: datas
              }
            ]
          })
        }).catch(() => {})
    },
    // 发文趋势和内容创作
    drawBar () {
      this.$http.post(this.$api.getReleaseTrend, { biz: this.accountMsg.biz})
        .then(res => {
          this.original.time = res.data.data.time
          this.original.originNum = res.data.data.originNum
          this.original.percentage = Number(res.data.data.percentage) || 0
          let myBar = echarts.init(document.getElementById('myBar'))
          myBar.setOption({
            xAxis: {
              data: ['0:00', '1:00', '2:00',  '3:00',  '4:00',  '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#4A8BFE',
                  width: 2,
                  type: 'solid'
                },
              }
            },
            yAxis: {
              show: false,
              type: 'value'
            },
            series: [
              {
                name: '发布篇数',
                type: 'bar',
                // showBackground: true,
                label: {
                  show: true,
                  color: '#6B798E',
                  position: 'top',
                  formatter: '{c}' + '篇'
                },
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#83bff6'},
                      {offset: 0.5, color: '#188df0'},
                      {offset: 1, color: '#188df0'}
                    ]
                  )
                },
                data: res.data.data.value
              }
            ]
          })
      }).catch(() => {})
    },
    // 互动留言
    getLiuYan () {
      this.$http.post(this.$api.getLeaveMessage, { biz: this.accountMsg.biz})
        .then(res => {
          this.leave.repliesNum = Number(res.data.data.repliesNum)
          this.leave.messagesCount = res.data.data.messagesCount
          this.leave.messagesNum = res.data.data.messagesNum
        }).catch(() => {})
    },
    // 微信阅读数分布
    getReadArticle () {
      this.$http.post(this.$api.getReadNumArea, { biz: this.accountMsg.biz})
        .then(res => {
          this.readArticleData = res.data.data.article
          let range = res.data.data.range
          let value = res.data.data.value
          let color = ['#98BB5E', '#00BAE5', '#749BB7']
          range.unshift(0)
          let newRange = []
          for (let i = 0; i < range.length - 1; i++) {
            newRange.push(range[i] + '~' + range[i+1])
          }
          for (let i = 0; i < value.length; i++) {
            this.readData.push({ num: value[i], range: newRange[i], color: color[i] })
          }
        }).catch(() => {})
    }
  },
  mounted () {
    this.drawBar()
    this.drawPie()
    this.getLiuYan()
    this.getReadArticle()
  },
  created () {
    this.accountId = this.$route.query.id
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
