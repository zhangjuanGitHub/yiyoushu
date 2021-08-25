<!--
 * @Author: zhangjuan
 * @Date: 2021-05-19 11:39:00
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-07-20 17:31:35
-->
<template>
  <div class="search-material-wrap">
    <div>
      <span style="color: orange">近一个月该账号发布规律</span>
    </div>
    <div class="search-material-up">
      <p class="search-mater-theme">发布频次</p>
    </div>
    <div class="search-rules-num flex-ali-center">
      <div id="myRules" class="search-num-echarts"></div>
      <ul class="wb-rules-about" v-if="this.releaseList.length > 0">
        <li class="flex-all-center">
          <p style="background:#E9F4FF">原创微博</p>
          <p style="background:#FCF3E8">转发微博</p>
        </li>
        <li class="flex-all-center">
          <p><span style="font-size:24px; color:#7CBBFF">{{this.releaseList[0].value}} </span> 篇</p>
          <p><span style="font-size:24px; color:#E4A75E">{{this.releaseList[1].value}} </span> 篇</p>
        </li>
        <li class="flex-all-center">
          <p v-html="this.releaseList[0].percent+'%'"></p>
          <p v-html="this.releaseList[1].percent+'%'"></p>
        </li>
      </ul>
    </div>
    <div class="search-material-up">
      <p class="search-mater-theme">粉丝趋势</p>
    </div>
    <div class="wb-rules-fans">
      <div id="myFans" class="rules-fans-echarts"></div>
    </div>
    <div class="search-material-up">
      <p class="search-mater-theme">发文趋势</p>
    </div>
    <div class="search-rules-point flex-ali-center">
      <div class="search-point-time flex-all-center">
        <div>
          <p class="search-point-pp">常见发布时段</p>
          <p>{{originaltime}}</p>
        </div>
      </div>
      <div id="myBar" class="search-point-echarts"></div>
    </div>
    <div class="search-material-up">
      <p class="search-mater-theme">微博列表</p>
    </div>
    <div class="wb-rules-list">
      <div class="morehot-tab-head">
        <p>
          <span :class="{ 'sort_active': typeActive === 0 }"
                @click="changetypeActive(0)" v-html="'全部('+num.total+')'"></span>
          <span :class="{ 'sort_active': typeActive === 1 }"
                @click="changetypeActive(1)" v-html="'原创('+num.originalNumber+')'"></span>
          <span :class="{ 'sort_active': typeActive === 2 }"
                @click="changetypeActive(2)" v-html="'转发('+num.forwardingNumber+')'"></span>
        </p>
      </div>
      <el-table :data="wbList"
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
                <p class="lin-clamp-3 cursor" v-html="scope.row.raw_text" @click="target(scope.row.url)"></p>
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
      <p class="flex-all-center" v-if="isMore"><span class="primary cursor" @click="getWbList">点击加载更多</span></p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入折线图组件
require('echarts/lib/chart/line')
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
      typeActive: 0,
      originaltime: '',
      releaseTotal: 0,
      releaseList: [],
      wbList: [],
      scrollId: '',
      isMore: false,
      num: {
        total: 0,
        originalNumber: 0,
        forwardingNumber: 0
      }
    }
  },
  methods: {
    changetypeActive (tab) {
      this.typeActive = tab
      this.scrollId = ''
      this.wbList = []
      this.isMore = false
      this.getWbList()
    },
    target (url) {
      window.open(url)
    },
    // 获取微博列表
    getWbList () {
      let obj = {
        uid: this.accountWbMsg.uid,
        isOrigin: this.typeActive,
        scrollId: this.scrollId
      }
      this.$http.post(this.$api.getWbReList, obj)
        .then(res => {
          let datas = res.data.data.data
          this.scrollId = res.data.data.scrollId
          if (datas.length < 10) {
            this.isMore = false
          } else {
            this.isMore = true
          }
          this.wbList.push(...datas)
          // this.total = res.data.data.total
        }).catch(() => {})
    },
    // 获取微博列表数量
    getWbNum () {
      let obj = {
        uid: this.accountWbMsg.uid,
        startTime: '',
        endTime: ''
      }
      this.$http.post(this.$api.getListNum, obj)
        .then(res => {
          this.num = res.data.data
        }).catch(() => {})
    },
    // 饼图
    drawPie () {
      this.$http.post(this.$api.getWbRelease, { uid: this.accountWbMsg.uid })
        .then(res => {
          let datas = res.data.data
          this.releaseTotal = datas[0].value + datas[1].value
          for (let i = 0; i < datas.length; i++) {
            if (datas[i].name === 'false') {
              datas[i].name = '原创微博'
            } else {
              datas[i].name = '转发微博'
            }
            datas[i].percent = ((datas[i].value / this.releaseTotal) * 100).toFixed(0)
          }
          this.releaseList = datas
          let myPie = echarts.init(document.getElementById('myRules'))
          let color = ['#7CBBFF', '#FFC37C']
          myPie.setOption({
            color: color,
            legend: {
              orient: 'vertical',
              right: 0,
              top: 'center',
              itemWidth: 5,
              itemHeight: 5
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
                  formatter: '{c}篇'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '16'
                  }
                },
                data: this.releaseList
              }
            ]
          })
        }).catch(() => {})
    },
    // 发文趋势
    drawBar () {
      this.$http.post(this.$api.getWbTrend, { uid: this.accountWbMsg.uid })
        .then(res => {
          this.originaltime = res.data.data.time
          let myBar = echarts.init(document.getElementById('myBar'))
          myBar.setOption({
            xAxis: {
              data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#4A8BFE',
                  width: 2,
                  type: 'solid'
                }
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
                      { offset: 0, color: '#83bff6' },
                      { offset: 0.5, color: '#188df0' },
                      { offset: 1, color: '#188df0' }
                    ]
                  )
                },
                data: res.data.data.value
              }
            ]
          })
        }).catch(() => {})
    },
    // 粉丝趋势
    drawFans () {
      this.$http.post(this.$api.getFansTrend, { uid: this.accountWbMsg.uid })
        .then(res => {
          let minNum = Math.min.apply(null, res.data.data.count)
          let myChart = echarts.init(document.getElementById('myFans'))
          myChart.setOption({
            title: {},
            tooltip: {
              trigger: 'axis',
              transitionDuration: 0
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
              min: minNum,
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
                name: '粉丝数',
                type: 'line',
                color: '#FF9654',
                lineStyle: {
                  width: 2
                },
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
    }
  },
  mounted () {
    this.drawBar()
    this.drawPie()
    this.drawFans()
  },
  created () {
    this.getWbList()
    this.getWbNum()
    this.accountId = this.$route.query.id
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
