<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-29 14:21:05
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-05-19 09:55:34
-->
<template>
  <div class="search-material-wrap">
    <div class="search-data-search">
      <el-select v-model="dataValue"
                 @change="changeValue"
                 size="small"
                 placeholder="请选择时间">
        <el-option label="最近7天" value="1"></el-option>
        <el-option label="最近30天" value="2"></el-option>
        <el-option label="最近60天" value="3"></el-option>
      </el-select>
      <el-date-picker v-model="timeValue"
                      type="daterange"
                      size="small"
                      readonly
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
    </div>
    <div>
      <el-table :data="basicData"
                style="width: 100%">
        <el-table-column label="发文数/发文次数"
                          prop="articleNum"
                          width="190">
        </el-table-column>
        <el-table-column label="阅读总数/平均阅读数"
                          width="200">
          <template slot-scope="scope">
            <p>
              <span v-html="scope.row.sumReadNum || 0"></span>
              <span> / </span>
              <span v-html="scope.row.avgReadNum || 0"></span>
              <el-tooltip class="item" effect="light" placement="right">
                <i class="el-icon-info"></i>
                <div slot="content">
                  <p>最高：<span v-html="scope.row.maxReadNum || 0"></span></p>
                  <p>最低：<span v-html="scope.row.minReadNum || 0"></span></p>
                </div>
              </el-tooltip>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="在看总数/平均在看数"
                          width="200">
          <template slot-scope="scope">
            <p>
              <span v-html="scope.row.sumLikeNum || 0"></span>
              <span> / </span>
              <span v-html="scope.row.avgLikeNum || 0"></span>
              <el-tooltip class="item" effect="light" placement="right">
                <i class="el-icon-info"></i>
                <div slot="content">
                  <p>最高：<span v-html="scope.row.maxLikeNum || 0"></span></p>
                  <p>最低：<span v-html="scope.row.minLikeNum || 0"></span></p>
                </div>
              </el-tooltip>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="点赞总数/平均点赞数"
                          show-overflow-tooltip>
          <template slot-scope="scope">
            <p>
              <span v-html="scope.row.sumOldLikeNum || 0"></span>
              <span> / </span>
              <span v-html="scope.row.avgOldLikeNum || 0"></span>
              <el-tooltip class="item" effect="light" placement="right">
                <i class="el-icon-info"></i>
                <div slot="content">
                  <p>最高：<span v-html="scope.row.maxOldLikeNum || 0"></span></p>
                  <p>最低：<span v-html="scope.row.minOldLikeNum || 0"></span></p>
                </div>
              </el-tooltip>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="评论总数/平均评论数"
                          width="200">
          <template slot-scope="scope">
            <p>
              <span v-html="scope.row.sumCommentCount || 0"></span>
              <span> / </span>
              <span v-html="scope.row.avgCommentCount || 0"></span>
              <el-tooltip class="item" effect="light" placement="right">
                <i class="el-icon-info"></i>
                <div slot="content">
                  <p>最高：<span v-html="scope.row.maxCommentCount || 0"></span></p>
                  <p>最低：<span v-html="scope.row.minCommentCount || 0"></span></p>
                </div>
              </el-tooltip>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                          width="90">
          <template slot-scope="scope">
            <p @click="toDrawLine(1)"
               class="search-data-operate"
               :class="{ 'search-one-data': isSelect === 1}"
               v-if="scope.$index === 0"><span>头条</span></p>
            <p @click="toDrawLine(2)"
               class="search-data-operate"
               :class="{ 'search-one-data': isSelect === 2}"
               v-else-if="scope.$index === 1"><span>次条</span></p>
            <p @click="toDrawLine(3)"
               class="search-data-operate"
               :class="{ 'search-one-data': isSelect === 3}"
               v-else><span>{{(scope.$index + 1) + '-N'}}</span>条</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="search-data-down">
      <div class="search-material-up">
        <p class="search-mater-theme">全部文章阅读数趋势</p>
      </div>
      <div class="search-data-line" id="readArticle"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入基本模板
import { timeFormat } from '@/lib/tools'
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
      dataValue: '1',
      timeValue: [],
      basicData: [],
      // accountMsg: {},
      isSelect: 1
    }
  },
  methods: {
    changeValue (val) {
      let end = this.calcDate(1)
      let start = {}
      if (val === '1') {
        start = this.calcDate(7)
      } else if (val === '2') {
        start = this.calcDate(30)
      } else {
        start = this.calcDate(60)
      }
      this.$set(this.timeValue, 1, timeFormat(end))
      this.$set(this.timeValue, 0, timeFormat(start))
      this.dataValue = val
      this.isSelect = 1
      this.getBasicList()
      this.drawLine()
    },
    calcDate (num) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * num)
      return date
    },
    // 获取数据的行为数据
    getBasicList () {
      let obj = {
        biz: this.accountMsg.biz,
        startTime: this.timeValue[0],
        endTime: this.timeValue[1]
      }
      this.$http.post(this.$api.getBasicData, obj)
        .then(res => {
          this.basicData = res.data.data
        }).catch(() => {})
    },
    toDrawLine (i) {
      this.isSelect = i
      this.drawLine()
    },
    // 文章阅读数趋势
    drawLine () {
      let obj = {
        biz: this.accountMsg.biz,
        startTime: this.timeValue[0],
        endTime: this.timeValue[1],
        idx: this.isSelect
      }
      this.$http.post(this.$api.getReadTrend, obj)
        .then(res => {
          let myChart = echarts.init(document.getElementById('readArticle'))
          // 绘制图表
          myChart.setOption({
            title: {},
            tooltip: {
              trigger: 'axis',
              transitionDuration:0
            },
            legend: {
              x: 'center',
              data: ['阅读数']
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
              axisTick: {
                show: false
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#ccc'],
                  width: 1,
                  type: 'solid'
                }
              }
            },
            series: [
              {
                name: '阅读数',
                type: 'line',
                color: '#459DBD',
                lineStyle: {
                  width: 5
                },
                symbolSize: 8, // 拐点大小
                data: res.data.data.count
              }
            ]
          })
        }).catch(() => {})
    }
  },
  created () {
    this.accountId = this.$route.query.id
    let now = this.calcDate(1)
    let seven = this.calcDate(7)
    this.timeValue[1] = timeFormat(now)
    this.timeValue[0] = timeFormat(seven)
  },
  mounted () {
    this.getBasicList()
    this.drawLine()
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
