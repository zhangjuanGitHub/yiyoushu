<!--
 * @Author: zhangjuan
 * @Date: 2021-05-06 15:28:39
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-07-02 17:36:01
-->
<template>
  <div class="center-wraper">
    <div class="account-wraper">
      <div class="nav-breadcrumb flex-ali-center">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'TrendQuery' }">趋势查询</el-breadcrumb-item>
          <el-breadcrumb-item>趋势查询详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="trend-detail-main">
        <el-form :inline="true"
                 ref="ruleForm"
                 :model="ruleForm">
          <el-form-item label="时间"
                        prop="publishTime">
            <el-date-picker v-model="ruleForm.publishTime"
                            type="daterange"
                            size="small"
                            :picker-options="pickerOptions"
                            @change="changeTrendTime"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="keyword"
                        label="关键字">
            <el-input size="small"
                      v-model="ruleForm.keywords[0]"
                      readonly
                      placeholder="请输入关键字"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="!dataNull">
        <div>
          <div class="search-class-tab flex-ali-center">
            <p :class="{'is-class': trendActive === 'wx'}"
               @click="changeTab('wx')">微信</p>
            <p :class="{'is-class': trendActive === 'wb'}"
               @click="changeTab('wb')">微博</p>
          </div>
          <el-table :data="dataSummary"
                    style="width: 100%"
                    :default-expand-all="true"
                    @expand-change="handledetail">
            <el-table-column label="关键词"
                             prop="keyword"
                             show-overflow-tooltip>
              <template>
                <p>{{this.ruleForm.keywords[0]}}</p>
              </template>
            </el-table-column>
            <el-table-column label="篇数"
                             prop="total"
                             width="120">
            </el-table-column>
            <el-table-column label="涉及公众号"
                             prop="officialAccountNumber"
                             width="120">
            </el-table-column>
            <el-table-column label="点赞数"
                             prop="oldLikeNum"
                             width="120">
            </el-table-column>
            <el-table-column label="阅读数"
                             prop="readNum"
                             width="120">
            </el-table-column>
            <el-table-column label="10万+篇数"
                             width="120">
              <template>
                <p>{{moreThanTenWTotal}}</p>
              </template>
            </el-table-column>
            <el-table-column label="原创篇数"
                             prop="originalNumber"
                             width="120">
            </el-table-column>
            <el-table-column label="活跃天数"
                             width="150">
              <template>
                <p>{{activeDays || '0'}} / {{days}}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div id="trendChart"></div>
        <div class="trend-empty"></div>
        <div class="trend-some-main">
          <p class="trend-some-title">最高阅读量</p>
          <ul class="trend-some-box">
            <li v-for="(item, index) of articleList" :key="index" class="cursor" @click="targetUrl(item.url)">
              <p class="trend-icon-num flex-all-center">{{index+1}}</p>
              <div class="trend-content">
                <p><span class="title-color" v-html="item.title"></span>
                  <span class="trend-hot-btn" :class="{'trend-btn-sel': item.sn === articleSn }"
                        @click.stop="changeHotPing(item.sn)">热门评论</span></p>
                <p class="lin-clamp-1 cont-color" v-html="item.content"></p>
                <div class="flex-bwt-center">
                  <div class="trend-account-msg flex-ali-center">
                    <p class="title-color font-16" v-html="item.nickname"></p>
                    <p class="cont-color" v-html="item.last_pubtime"></p>
                  </div>
                  <div class="trend-action-box flex-ali-center">
                    <img src="@/assets/images/home/icon_1.png" alt="">
                    <p>阅读数：<span v-html="item.read_num >= 100000 ? '10万+' : item.read_num"></span></p>
                    <img src="@/assets/images/home/icon_2.png" alt="" style="margin-top: -2px">
                    <p>点赞数：<span v-html="item.old_like_num"></span></p>
                    <img src="@/assets/images/home/icon_3.png" alt="">
                    <p>在看数：<span v-html="item.like_num"></span></p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="trend-empty"></div>
        <div class="trend-some-main flex-bwt">
          <div class="trend-ping-left">
            <p class="trend-some-title">热门评论</p>
            <p class="flex-all-center" v-if="isNotComment" style="height:80%;color:#868686;font-size: 20px;">暂无评论</p>
            <ul class="trend-hot-ping">
              <li class="flex" v-for="(item,index) of hotPingList" :key="'h'+index">
                <img class="trend-hot-ava" :src="item.head_picture" alt="">
                <div>
                  <div class="flex trend-hot-cont">
                    <p>{{item.nickname}}：</p>
                    <p class="lin-clamp-3">{{item.content}}</p>
                  </div>
                  <p style="margin-top: 4px;color:#909399">{{item.reply_date}}</p>
                </div>
              </li>
            </ul>
            <p class="flex-all-center" v-if="isMore" style="clear:both; padding-top:10px">
              <span class="primary cursor" @click="getHotPing">点击加载更多</span>
            </p>
          </div>
          <div class="trend-ping-right">
            <p class="trend-some-title">评论热词</p>
            <div id="myPing"></div>
          </div>
        </div>
      </div>
      <div v-if="dataNull">
        <div class="flex-cloumn-cen account-list-undefined">
          <img src="@/assets/images/search/undefined.png" alt="">
          <p>未查询到 <span class="warning">{{ruleForm.keywords[0]}}</span> 趋势</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { timeFormat } from '@/lib/tools'
import axios from 'axios'
let echarts = require('echarts/lib/echarts')
// 引入折线图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts-wordcloud')
export default {
  data () {
    return {
      ruleForm: {
        publishTime: [],
        keywords: []
      },
      trendActive: 'wx',
      choiceDate0: '',
      pickerOptions: {
        // 设置不能选择的日期
        onPick: ({ maxDate, minDate }) => {
          this.choiceDate0 = minDate.getTime()
          if (maxDate) {
            this.choiceDate0 = ''
          }
        },
        disabledDate: (time) => {
          let choiceDateTime = new Date(this.choiceDate0).getTime()
          const minTime = new Date(choiceDateTime).setMonth(new Date(choiceDateTime).getMonth() - 1)
          const maxTime = new Date(choiceDateTime).setMonth(new Date(choiceDateTime).getMonth() + 1)
          const min = minTime
          const newDate = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
          const max = newDate < maxTime ? newDate : maxTime
          // 如果已经选中一个日期 则 返回 该日期前后一个月时间可选
          if (this.choiceDate0) {
            return time.getTime() < min || time.getTime() > max
          }// 若一个日期也没选中 则 返回 当前日期以前日期可选
          return time.getTime() > newDate
        }
      },
      dataNull: false,
      moreThanTenWTotal: 0, // 10万+
      articleSn: '', // 文章的sn
      scrollId: '', // 加载更多标志
      isMore: false,
      isNotComment: false,
      hotPingList: [],
      activeDays: 0, // 活跃天数
      days: 15, // 时间范围天数
      dataSummary: [], // 表头数据
      lineChart: [], // 图表
      articleList: [] // 底部列表
    }
  },
  // 终止请求
  destroyed () {
    if (typeof this.source === 'function') {
      this.source('终止请求')
    }
  },
  methods: {
    // 底部列表跳转链接
    targetUrl (url) {
      window.open(url, '_blank')
    },
    changeTab (tab) {
      this.trendActive = tab
    },
    // 选择时间
    changeTrendTime (val) {
      val === null ? this.ruleForm.publishTime = [] : this.ruleForm.publishTime = val
      this.dataSummary = []
      this.getTrendList()
    },
    // 展开关闭Echarts
    handledetail (row, expandedRows) {
      if (expandedRows.length > 0) { // 展开
        this.$nextTick(() => {
          this.initEchart()
        })
      } else {
        // 关闭
      }
    },
    // 获取表格数据
    getTrendList () {
      var that = this
      this.ruleForm.startTime = this.ruleForm.publishTime[0] + ' 00:00:00'
      this.ruleForm.endTime = this.ruleForm.publishTime[1] + ' 00:00:00'
      this.$http.post(this.$api.behavioralData, this.ruleForm, { cancelToken: new axios.CancelToken(function executor (c) { // 设置 cancel token
        that.source = c
      }) })
        .then(res => {
          let resData = res.data.data
          this.dataSummary.push(resData.dataSummary) // 表头数据
          this.lineChart = resData.lineChart.data // 图表
          this.articleList = resData.articleList // 底部列表
          this.articleSn = this.articleList[0].sn
          this.activeDays = resData.lineChart.activeDays // 活跃天数
          this.days = resData.lineChart.days // 时间范围天数
          this.moreThanTenWTotal = resData.lineChart.moreThanTenWTotal // 10万+
          this.getPingLun()
          this.getHotPing()
          var timeList = [] // 图表时间轴
          this.lineChart.forEach(item => {
            timeList.push(item.time)
          })
          if (resData.articleList.length <= 0) {
            this.dataNull = true
            return
          }
          let myChart = echarts.init(document.getElementById('trendChart'))
          // 绘制图表
          myChart.setOption({
            title: {},
            tooltip: {
              trigger: 'axis',
              transitionDuration: 0, // 防止鼠标滑入抖动
              enterable: true, // 鼠标可以进入
              backgroundColor: 'rgb(255,255,255)',
              // triggerOn: 'click',
              formatter (params) {
                let text =
                  '<div style="padding:10px 15px;box-shadow: 2px 4px 6px 6px rgba(0, 0, 0, 0.2);border-radius: 4px;">\
                      <div style="line-height:12px"><p style="width:12px;height:12px;background:#42A6F5;border-radius:6px;float:left;margin-right:8px;"></p>\
                      <p style="color: #2196F3;float:left;cursor:pointer">' + params[0].data.time + '</p>\
                <p style="color: #F79406;float:right;">阅读数：<span>' + params[0].data.everyDayReadNum + '</span></p></div>\
                <div style="clear:both;padding:20px 0 10px;"><div style="border:1px solid #F0F1F3;display:flex; background:#F8F8F9;">\
                <p style="width:80px;padding: 4px 9px;color: #8A8C92;font-size: 12px;text-align: center;">篇数</p>\
                <p style="width:80px;padding: 4px 9px;color: #8A8C92;font-size: 12px;text-align: center;">10w+篇数</p>\
                <p style="width:80px;padding: 4px 9px;color: #8A8C92;font-size: 12px;text-align: center;">原创篇数</p></div>\
                <div style="border:1px solid #F0F1F3;display:flex;">\
                <p style="width:80px;padding: 4px 9px;color: #8A8C92;font-size: 12px;text-align: center;">' + params[0].data.value + '</p>\
                <p style="width:80px;padding: 4px 9px;color: #8A8C92;font-size: 12px;text-align: center;">' + params[0].data.moreThanTenW + '</p>\
                <p style="width:80px;padding: 4px 9px;color: #8A8C92;font-size: 12px;text-align: center;">' + params[0].data.originNum + '</p></div></div>'
                let str = '<ul>'
                params[0].data.articleList.forEach((item, index) => {
                  str += '<li style="display:flex;align-items:center;padding:3px 0;cursor:pointer;" onclick="showClick(\'' + item.url + ' \')">\
                  <p style="width:14px;height:14px;line-height:14px;background:#BEBFC2;border-radius:7px;margin-right:5px;color:#fff;text-align:center">' + (index + 1) + '</p>\
                  <p style="color:#8A8C92;">' + item.title + '</p></li>'
                })
                let html = text + str + '</ul></div>'
                return html
              }
            },
            legend: {
              show: true,
              x: 'center',
              data: ['阅读数趋势']
            },
            xAxis: {
              type: 'category',
              axisTick: {
                show: false
              },
              boundaryGap: false,
              data: timeList
            },
            yAxis: {
              type: 'value',
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#ccc'],
                  width: 1,
                  type: 'dashed'
                }
              }
            },
            series: [
              {
                name: '阅读数',
                type: 'line',
                color: '#2196F3',
                lineStyle: {
                  width: 2
                },
                symbolSize: 8, // 拐点大小
                data: this.lineChart
              }
            ]
          })
        })
        .catch(() => {})
    },
    getTime () {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
      this.ruleForm.publishTime[0] = timeFormat(start)
      this.ruleForm.publishTime[1] = timeFormat(end)
    },
    clickTooltip (url) {
      window.open(url)
    },
    changeHotPing (sn) {
      this.articleSn = sn
      this.scrollId = ''
      this.hotPingList = []
      this.isMore = false
      this.getPingLun()
      this.getHotPing()
    },
    // 评论热词
    getPingLun () {
      // let sn = '4ecbba424f5982a2ce2da2d8dcfce0db'
      this.$http.post(this.$api.trendHotWords, { sn: this.articleSn })
        .then(res => {
          if (res.data.data.listData && res.data.data.listData.length > 0) {
            let myChart2 = echarts.init(document.getElementById('myPing'))
            let wordOption = {
              tooltip: {
                show: true,
                transitionDuration: 0 // 防止鼠标滑入抖动
              },
              series: [{
                type: 'wordCloud',
                gridSize: 10, //用来调整词之间的距离
                sizeRange: [30, 80],
                rotationRange: [-45, 0, 100, 90],
                textStyle: {
                  normal: {
                    color: function () {
                      return 'rgb(' +
                      Math.round(Math.random() * 255) +
                      ', ' + Math.round(Math.random() * 255) +
                      ', ' + Math.round(Math.random() * 255) + ')'
                    }
                  }
                },
                left: 'center',
                top: 'center',
                right: null,
                bottom: null,
                width: '100%',
                height: '100%',
                data: res.data.data.listData
              }]
            }
            myChart2.setOption(wordOption)
            window.addEventListener('resize', function () {
              myChart2.resize()
            })
          } else {
            var html = '<div><span style="position: absolute;width:100%;top: 40%;display:block;text-align:center;color:#868686; font-size: 20px;">暂无数据</span></div>'
            document.getElementById('myPing').innerHTML = html
            document.getElementById('myPing').removeAttribute('_echarts_instance_')
          }
        }).catch(() => {})
      
    },
    // 热门评论
    getHotPing () {
      let obj = {
        sn: this.articleSn,
        // sn: '4ecbba424f5982a2ce2da2d8dcfce0db',
        scrollId: this.scrollId
      }
      this.$http.post(this.$api.trendHotMessage, obj)
        .then(res => {
          if (res.data.data.data.length === 0 && !this.scrollId) {
            this.isNotComment = true
          } else {
            this.isNotComment = false
            let data = res.data.data.data
            if (data.length < 8) {
              this.isMore = false
            } else {
              this.isMore = true
            }
            this.scrollId = res.data.data.scrollId
            this.hotPingList.push(...data)
          }
        }).catch(() => {})
      
    }
  },
  created () {
    window.showClick = this.clickTooltip
    this.getTime()
    this.ruleForm.keywords.push(this.$route.query.keyword)
  },
  mounted () {
    this.getTrendList()
    // this.getPingLun()
    // this.getHotPing()
  }
}
</script>
<style>
  .trend-detail-main .el-date-editor.el-input__inner {
    width: 230px;
  }
</style>
<style scoped>
  .account-wraper {
    background: #ffffff;
  }
  .trend-detail-main {
    margin: 20px;
  }
  .search-class-tab {
    margin: 30px 20px;
  }
  .search-class-tab p {
    width: 100px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    cursor: pointer;
    border: 1px solid #E1E4E8;
  }
  .search-class-tab .is-class {
    color: #4A8BFE;
    border-color: #4A8BFE;
  }
  #trendChart {
    width: 1300px;
    height: 400px;
    margin: 0 auto
  }
  .trend-empty {
    width: 100%;
    height: 16px;
    margin-top: 20px;
    background: #EDEFF4;
  }
  .trend-some-main {
    padding: 20px;
  }
  .trend-some-title {
    padding: 0px 15px 10px;
    font-size: 20px;
    color: #F79406;
    border-bottom: 1px solid #D7D7D7;
  }
  .trend-some-box {
    min-height: 370px;
    display: flex;
    flex-wrap: wrap;
  }
  .trend-some-box li {
    width: 50%;
    box-sizing: border-box;
    padding: 40px 15px;
    border-top: 1px solid #D7D7D7;
  }
  .trend-some-box li:nth-child(1),
  .trend-some-box li:nth-child(2) {
    border-top: none;
  }
  .trend-icon-num {
    width: 18px;
    height: 18px;
    border: 1px solid #FBCA9C;
    background: #FFECDA;
    font-size: 16px;
    color: #F79406;
    border-radius: 9px;
    margin-right: 2px;
    float: left;
  }
  .title-color {
    color: #545454;
  }
  .cont-color,
  .trend-action-box p {
    color: #8A8C92;
  }
  .trend-content>p:nth-child(1) {
    font-size: 16px;
  }
  .trend-content>p:nth-child(2) {
    margin: 15px 0;
  }
  .trend-account-msg {
    flex: 1;
  }
  .trend-account-msg p:nth-child(2) {
    margin-left: 40px;
  }
  .trend-action-box img {
    width: 16px;
    height: 16px;
    margin-left: 10px;
    margin-right: 3px;
  }
  .trend-action-box span {
    color: #2196F3;
  }
  .trend-tooltip div {
    border: 1px solid #F0F1F3;
    display: flex;
  }
  .trend-tooltip div:nth-child(1) {
    background: #F8F8F9;
  }
  .trend-tooltip p {
    width: 80px;
    padding: 4px 9px;
    color: #8A8C92;
    font-size: 12px;
    text-align: center;
  }
  .trend-ping-left {
    width: 45%;
    min-height: 600px;
  }
  .trend-ping-right {
    width: 52%;
    height: 600px;
  }
  #myPing {
    width: 100%;
    /* 600-41 */
    height: 559px;
    position: relative;
  }
  .trend-hot-ping li {
    margin: 9px;
    padding: 5px;
    background-color: rgb(239, 239, 245);
  }
  .trend-hot-ava {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 5px;
  }
  .trend-hot-cont p:nth-child(1) {
    max-width: 150px;
    margin-right: 4px;
    color: #3B81FE;
  }
  .trend-hot-cont p:nth-child(2) {
    flex: 1;
  }
  .trend-hot-btn {
    color: #ffffff;
    padding: 3px 10px;
    border-radius: 10px;
    margin-left: 6px;
    font-size: 14px;
    cursor: pointer;
    background-color: #5f96f3;
  }
  .trend-content .trend-btn-sel {
    background-color: #F54336;
  }
</style>
