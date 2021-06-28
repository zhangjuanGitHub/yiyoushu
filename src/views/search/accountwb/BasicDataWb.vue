<!--
 * @Author: zhangjuan
 * @Date: 2021-05-19 11:40:48
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-05-31 10:27:06
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
      <div class="wb-his-actbox flex-all-center wb-data-box" style="background:#5F96F3">
        <img src="@/assets/images/search/wbdata_1.png" alt="">
        <p>
          <span>{{action.total}}</span>
          <span>总发博篇数</span>
        </p>
      </div>
      <div class="wb-his-actbox flex-all-center wb-data-box" style="background:#FFC154">
        <img src="@/assets/images/search/wbdata_2.png" alt="">
        <p>
          <span>{{action.attitudesCount}}</span>
          <span>总点赞数</span>
        </p>
      </div>
      <div class="wb-his-actbox flex-all-center wb-data-box" style="background:#4CAF50">
        <img src="@/assets/images/search/wbdata_3.png" alt="">
        <p>
          <span>{{action.commentsCount}}</span>
          <span>总评论数</span>
        </p>
      </div>
      <div class="wb-his-actbox flex-all-center wb-data-box" style="background:#F54336">
        <img src="@/assets/images/search/wbdata_4.png" alt="">
        <p>
          <span>{{action.repostsCount}}</span>
          <span>总转发数</span>
        </p>
      </div>
    </div>
    <!-- echarts -->
    <div class="wb-data-trend flex-bwt-center">
      <div>
        <div class="search-material-up">
          <p class="search-mater-theme">发博趋势</p>
        </div>
        <div id="myTotal" class="wb-trend-chart"></div>
      </div>
      <div>
        <div class="search-material-up">
          <p class="search-mater-theme">点赞趋势</p>
        </div>
        <div id="myDian" class="wb-trend-chart"></div>
      </div>
    </div>
    <div class="wb-data-trend flex-bwt-center">
      <div>
        <div class="search-material-up">
          <p class="search-mater-theme">评论趋势</p>
        </div>
        <div id="myPing" class="wb-trend-chart"></div>
      </div>
      <div>
        <div class="search-material-up">
          <p class="search-mater-theme">转发趋势</p>
        </div>
        <div id="myZhuan" class="wb-trend-chart"></div>
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
        uid: this.accountWbMsg.uid,
        startTime: this.time[0],
        endTime: this.time[1]
      }
      this.$http.post(this.$api.getActions, obj)
        .then(res => {
          this.action = res.data.data
        }).catch(() => {})
    },
    drawTotal () {
      let obj = {
        uid: this.accountWbMsg.uid,
        startTime: this.time[0],
        endTime: this.time[1]
      }
      this.$http.post(this.$api.getTotalTrend, obj)
        .then(res => {
          let myChart = echarts.init(document.getElementById('myTotal'))
          // 绘制图表
          myChart.setOption({
            title: {},
            tooltip: {
              trigger: 'axis',
              transitionDuration:0
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
                name: '发博数',
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
        }).catch(() => {})
      
    },
    drawDian () {
      let obj = {
        uid: this.accountWbMsg.uid,
        startTime: this.time[0],
        endTime: this.time[1]
      }
      this.$http.post(this.$api.getLikeTrend, obj)
        .then(res => {
          let myChart = echarts.init(document.getElementById('myDian'))
          // 绘制图表
          myChart.setOption({
            title: {},
            tooltip: {
              trigger: 'axis',
              transitionDuration:0
            },
            legend: {},
            grid: {
              left: 70,
              // containLabel: true
            },
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
        }).catch(() => {})
      
    },
    drawPing () {
      let obj = {
        uid: this.accountWbMsg.uid,
        startTime: this.time[0],
        endTime: this.time[1]
      }
      this.$http.post(this.$api.getCommentTrend, obj)
        .then(res => {
          let myChart = echarts.init(document.getElementById('myPing'))
          // 绘制图表
          myChart.setOption({
            title: {},
            tooltip: {
              trigger: 'axis',
              transitionDuration:0
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
        }).catch(() => {})
      
    },
    drawZhuan () {
      let obj = {
        uid: this.accountWbMsg.uid,
        startTime: this.time[0],
        endTime: this.time[1]
      }
      this.$http.post(this.$api.getForwardingTrend, obj)
        .then(res => {
          let myChart = echarts.init(document.getElementById('myZhuan'))
          // 绘制图表
          myChart.setOption({
            title: {},
            tooltip: {
              trigger: 'axis',
              transitionDuration:0
            },
            legend: {},
            grid: {
              left: 70,
              // containLabel: true
            },
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
        }).catch(() => {})
      
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
    },
  },
  mounted () {
    this.drawTotal()
    this.drawDian()
    this.drawPing()
    this.drawZhuan()
  },
  created () {
    this.accountId = this.$route.query.id
    this.getTime(7)
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
</style>
