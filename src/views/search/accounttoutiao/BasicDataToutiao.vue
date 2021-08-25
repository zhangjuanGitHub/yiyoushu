<!--
 * @Author: zhangjuan
 * @Date: 2021-05-19 11:40:48
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-07-29 16:50:22
-->
<!--
 * @Author: zhangjuan
 * @Date: 2021-05-19 11:40:25
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-05-20 15:17:17
-->
<template>
  <div class="search-material-wrap">
    <div class="morehot-tab-head flex-ali-center">
      <p>
        <span :class="{ 'sort_active': typeActive === 7 }"
              @click="changetypeActive(7)">近7天</span>
        <span :class="{ 'sort_active': typeActive === 15 }"
              @click="changetypeActive(15)">近15天</span>
        <span :class="{ 'sort_active': typeActive === 30 }"
              @click="changetypeActive(30)">近30天</span>
        <span :class="{ 'sort_active': typeActive === 90 }"
              @click="changetypeActive(90)">近90天</span>
        <span :class="{ 'sort_active': typeActive === 180 }"
              @click="changetypeActive(180)">近180天</span>
      </p>
      <div>
        <p>（ <span>{{this.time[0]}}</span> 至 <span>{{this.time[1]}}</span> ）</p>
      </div>
    </div>
    <div class="search-material-up">
      <p class="search-mater-theme">数据统计</p>
    </div>
    <div class="wb-his-action flex-bwt-center">
      <div class="wb-his-actbox flex-all-center wb-data-box"
           style="background:#5F96F3">
        <img src="@/assets/images/search/wbdata_1.png"
             alt="">
        <p>
          <span>{{action.readCount}}</span>
          <span>阅读数</span>
        </p>
      </div>
      <div class="wb-his-actbox flex-all-center wb-data-box"
           style="background:#4CAF50">
        <img src="@/assets/images/search/wbdata_3.png"
             alt="">
        <p>
          <span>{{action.commentsCount}}</span>
          <span>评论数</span>
        </p>
      </div>
      <div class="wb-his-actbox flex-all-center wb-data-box"
           style="background:#FFC154">
        <img src="@/assets/images/search/wbdata_2.png"
             alt="">
        <p>
          <span>{{action.diggCount}}</span>
          <span>点赞数</span>
        </p>
      </div>

      <div class="wb-his-actbox flex-all-center wb-data-box"
           style="background:#F54336">
        <img src="@/assets/images/search/wbdata_4.png"
             alt="">
        <p>
          <span>{{action.forwardCount}}</span>
          <span>转发数</span>
        </p>
      </div>
    </div>
    <!-- echarts -->
    <div class="wb-data-trend flex-bwt-center">
      <div class="wb-data-div">
        <div class="search-material-up">
          <p class="search-mater-theme">阅读趋势</p>
        </div>
        <div id="myTotal"
             class="wb-trend-chart"></div>
      </div>
      <div>
        <div class="search-material-up">
          <p class="search-mater-theme">点赞趋势</p>
        </div>
        <div id="myDian"
             class="wb-trend-chart"></div>
      </div>
    </div>
    <div class="wb-data-trend flex-bwt-center">
      <div>
        <div class="search-material-up">
          <p class="search-mater-theme">评论趋势</p>
        </div>
        <div id="myPing"
             class="wb-trend-chart"></div>
      </div>
      <div>
        <div class="search-material-up">
          <p class="search-mater-theme">转发趋势</p>
        </div>
        <div id="myZhuan"
             class="wb-trend-chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { timeFormat } from '@/lib/tools'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入折线图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  name: 'search',
  components: {},
  data () {
    return {
      typeActive: 7,
      time: [],
      action: {
        forwardCount: 0, // 转发总数
        // total: 0, // 发博总数
        commentsCount: 0, // 评论总数
        diggCount: 0, // 点赞总数
        readCount: 0// 阅读数
      }
    }
  },
  methods: {
    changetypeActive (tab) {
      this.typeActive = tab
      this.getTime(tab)
      this.getWbActions()
      this.drawTotal()
      this.drawDian()
      this.drawPing()
      this.drawZhuan()
    },
    // 获取微博行为数据
    getWbActions () {
      let obj = {
        userId: this.accountToutiaoMsg.user_id,
        startTime: this.time[0],
        endTime: this.time[1]
      }
      this.$http.post(this.$api.ttBehaviorDataSummary, obj)
        .then(res => {
          this.action = res.data.data
        }).catch(() => { })
    },
    // 阅读趋势
    drawTotal () {
      let obj = {
        userId: this.accountToutiaoMsg.user_id,
        startTime: this.time[0],
        endTime: this.time[1]
      }
      this.$http.post(this.$api.ttReadTrend, obj)
        .then(res => {
          let myChart = echarts.init(document.getElementById('myTotal'))
          // 绘制图表
          myChart.setOption({
            title: {},
            tooltip: {
              trigger: 'axis',
              transitionDuration: 0
            },
            grid: {
              left: '2%', // 与容器左侧的距离
              right: '2%', // 与容器右侧的距离
              top: '10%', // 与容器顶部的距离
              bottom: '10%', // 与容器底部的距离
              borderWidth: 10,
              containLabel: true
            },
            legend: {},
            xAxis: {
              type: 'category',
              axisTick: {
                show: false
              },
              boundaryGap: false,
              data: res.data.data.date
            },
            yAxis: {
              type: 'value',
              name: '数量',
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#ccc'],
                  width: 1
                }
              }
            },
            series: [
              {
                name: '阅读数',
                type: 'line',
                color: '#FF9654',
                lineStyle: {
                  width: 2
                },
                // symbol: 'none',
                smooth: true,
                symbolSize: 8, // 拐点大小
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#FFBF95'
                  }, {
                    offset: 1,
                    color: '#FFF8F4'
                  }])
                },
                data: res.data.data.count
              }
            ]
          })
        }).catch(() => { })
    },
    // 点赞
    drawDian () {
      let obj = {
        userId: this.accountToutiaoMsg.user_id,
        startTime: this.time[0],
        endTime: this.time[1]
      }
      this.$http.post(this.$api.ttDiggTrend, obj)
        .then(res => {
          let myChart = echarts.init(document.getElementById('myDian'))
          // 绘制图表
          myChart.setOption({
            title: {},
            tooltip: {
              trigger: 'axis',
              transitionDuration: 0
            },
            grid: {
              left: '2%', // 与容器左侧的距离
              right: '2%', // 与容器右侧的距离
              top: '10%', // 与容器顶部的距离
              bottom: '10%', // 与容器底部的距离
              borderWidth: 10,
              containLabel: true
            },
            legend: {},
            // grid: {
            //   left: 70
            //   // containLabel: true
            // },
            xAxis: {
              type: 'category',
              axisTick: {
                show: false
              },
              boundaryGap: false,
              data: res.data.data.date
            },
            yAxis: {
              type: 'value',
              name: '数量',
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#ccc'],
                  width: 1
                }
              }
            },
            series: [
              {
                name: '点赞数',
                type: 'line',
                color: '#FF9654',
                lineStyle: {
                  width: 2
                },
                // symbol: 'none',
                smooth: true,
                symbolSize: 8, // 拐点大小
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#FFBF95'
                  }, {
                    offset: 1,
                    color: '#FFF8F4'
                  }])
                },
                data: res.data.data.count
              }
            ]
          })
        }).catch(() => { })
    },
    // 评论
    drawPing () {
      let obj = {
        userId: this.accountToutiaoMsg.user_id,
        startTime: this.time[0],
        endTime: this.time[1]
      }
      this.$http.post(this.$api.ttCommentTrend, obj)
        .then(res => {
          let myChart = echarts.init(document.getElementById('myPing'))
          // 绘制图表
          myChart.setOption({
            title: {},
            tooltip: {
              trigger: 'axis',
              transitionDuration: 0
            },
            grid: {
              left: '2%', // 与容器左侧的距离
              right: '2%', // 与容器右侧的距离
              top: '10%', // 与容器顶部的距离
              bottom: '10%', // 与容器底部的距离
              borderWidth: 10,
              containLabel: true
            },
            legend: {},
            xAxis: {
              type: 'category',
              axisTick: {
                show: false
              },
              boundaryGap: false,
              data: res.data.data.date
            },
            yAxis: {
              type: 'value',
              name: '数量',
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#ccc'],
                  width: 1
                }
              }
            },
            series: [
              {
                name: '评论数',
                type: 'line',
                color: '#FF9654',
                lineStyle: {
                  width: 2
                },
                // symbol: 'none',
                smooth: true,
                symbolSize: 8, // 拐点大小
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#FFBF95'
                  }, {
                    offset: 1,
                    color: '#FFF8F4'
                  }])
                },
                data: res.data.data.count
              }
            ]
          })
        }).catch(() => { })
    },
    // 转发
    drawZhuan () {
      let obj = {
        userId: this.accountToutiaoMsg.user_id,
        startTime: this.time[0],
        endTime: this.time[1]
      }
      this.$http.post(this.$api.ttForwardTrend, obj)
        .then(res => {
          let myChart = echarts.init(document.getElementById('myZhuan'))
          // 绘制图表
          myChart.setOption({
            title: {},
            tooltip: {
              trigger: 'axis',
              transitionDuration: 0
            },
            legend: {},
            grid: {
              left: '2%', // 与容器左侧的距离
              right: '2%', // 与容器右侧的距离
              top: '10%', // 与容器顶部的距离
              bottom: '10%', // 与容器底部的距离
              borderWidth: 10,
              containLabel: true
            },
            // grid: {
            //   left: 70
            //   // containLabel: true
            // },
            xAxis: {
              type: 'category',
              axisTick: {
                show: false
              },
              boundaryGap: false,
              data: res.data.data.date
            },
            yAxis: {
              type: 'value',
              name: '数量',
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#ccc'],
                  width: 1
                }
              }
            },
            series: [
              {
                name: '转发数',
                type: 'line',
                color: '#FF9654',
                lineStyle: {
                  width: 2
                },
                // symbol: 'none',
                smooth: true,
                symbolSize: 8, // 拐点大小
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#FFBF95'
                  }, {
                    offset: 1,
                    color: '#FFF8F4'
                  }])
                },
                data: res.data.data.count
              }
            ]
          })
        }).catch(() => { })
    },
    calcDate (num) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * num)
      return date
    },
    getTime (val) {
      let end = new Date()
      let start = this.calcDate(val)
      this.time[0] = timeFormat(start)
      this.time[1] = timeFormat(end)
    }
  },
  mounted () {
    this.drawTotal()// 阅读
    this.drawDian()// 点赞
    this.drawPing()// 评论
    this.drawZhuan()// 转发
  },
  created () {
    this.accountId = this.$route.query.id
    this.getTime(7)
    this.getWbActions()
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
// .wb-data-div{
//   // width: 530px;
// }
// .wb-trend-chart {
//   width: 90%;
//   height: 360px;
//   // margin-left:20px;
// }
</style>
