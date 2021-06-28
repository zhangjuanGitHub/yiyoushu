<!--
 * @Author: zhangjuan
 * @Date: 2021-05-27 16:24:43
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-06-03 14:31:43
-->
<template>
  <div class="detail content-show">
    <div class="tabs-header flex-ali-center">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'AccountCompany' }">新媒体监测</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'WbMinuteBox' }">分钟级监测</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'MinuteList', query: { tab: 'wb' } }">监测列表</el-breadcrumb-item>
        <el-breadcrumb-item>监测详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="detail-content">
      <div class="wb-min-head flex-bwt-center">
        <div class="flex-ali-center">
          <img :src="articleData.profileImageUrl">
          <p class="wb-screen-name">{{articleData.screenName}}</p>
        </div>
        <div class="wb-min-msg">
          <p>微博发文时间：<span>{{articleData.pubtime}}</span></p>
          <p>开始监测时间：<span>{{articleData.startTime}}</span></p>
          <div>
            <p>监测时长：<i>{{articleData.dayCount}}</i><span>天</span></p>
            <!-- <p>监测频率：<i>5</i><span>分钟</span></p> -->
          </div>
        </div>
        <p class="wb-min-cont lin-clamp-3 cursor"
           @click="target(articleData.url)">
          <span v-html="articleData.rawText"></span>
          <span class="primary">文章详情<i class="el-icon-arrow-right"></i></span>
        </p>
      </div>
      <div class="all-trend">
        <div class="title-box flex-bwt-center">
          <div class="title">整体趋势图</div>
          <div class="tabs-button">
            <span @click="tabsTrend('attitudesCount')"
                  :class="charParams.historyName==='attitudesCount'?'isActive':''">点赞数</span>
            <span @click="tabsTrend('commentsCount')"
                  :class="charParams.historyName==='commentsCount'?'isActive':''">评论数</span>
            <span @click="tabsTrend('repostsCount')"
                  :class="charParams.historyName==='repostsCount'?'isActive':''">转发数</span>
          </div>
          <div class="bottom-tabs" v-if="charParams.historyName==='commentsCount'">
            <div class="tabs-button">
              <span @click="tabsNumber('total')"
                    :class="charParams.dataType==='total'?'isActive':''">评论总数</span>
              <span @click="tabsNumber('increment')"
                    :class="charParams.dataType==='increment'?'isActive':''">评论增量</span>
            </div>
          </div>
          <div class="bottom-tabs" v-else-if="charParams.historyName==='attitudesCount'">
            <div class="tabs-button">
              <span @click="tabsNumber('total')"
                    :class="charParams.dataType==='total'?'isActive':''">点赞总数</span>
              <span @click="tabsNumber('increment')"
                    :class="charParams.dataType==='increment'?'isActive':''">点赞增量</span>
            </div>
          </div>
          <div class="bottom-tabs" v-else-if="charParams.historyName==='repostsCount'">
            <div class="tabs-button">
              <span @click="tabsNumber('total')"
                    :class="charParams.dataType==='total'?'isActive':''">转发总数</span>
              <span @click="tabsNumber('increment')"
                    :class="charParams.dataType==='increment'?'isActive':''">转发增量</span>
            </div>
          </div>
        </div>
        <div id="line-charts"></div>
      </div>
      <div class="wb-ping-box flex-bwt">
        <div>
          <div class="title">评论热词统计</div>
          <div class="pinglun-tip flex-all-center" v-if="word.length <= 0">
            <p class="info">暂无数据</p>
          </div>
          <div id="pinglun"></div>
        </div>
        <div class="wb-ping-right">
          <div class="title">评论详情</div>
          <el-table :data="pinglundata"
                    style="width: 100%"
                    border
                    scroll
                    height="360px">
            <el-table-column width="200"
                             label="微博名称"
                             prop="">
              <template slot-scope="scope">
                <div class="pinglun-ava flex-ali-center">
                  <img :src="scope.row.profile_image_url" alt="">
                  <p>{{scope.row.screen_name}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="raw_text"
                             label="内容">
            </el-table-column>
          </el-table>
          <set-page @pagingChange="pagingPingChange"
                  :total="pingTotal"
                  ref="pinglun"></set-page>
        </div>
      </div>
      <div class="data-table">
        <div class="title">数据详情</div>
        <div class="interaction-table">
          <el-table :data="tableData"
                    style="width: 100%"
                    border>
            <el-table-column prop="insertTime"
                             label="时间">
            </el-table-column>
            <el-table-column prop="attitudesCount"
                             label="总点赞"
                             width="320">
              <template slot-scope="scope">
                <div class="morehot-icon flex-all-center">
                  <img src="@/assets/images/home/icon_2.png" alt="" style="margin-top:-3px">
                  <p>{{scope.row.attitudesCount}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="repostsCount"
                             label="总转发"
                             width="320">
              <template slot-scope="scope">
                <div class="morehot-icon flex-all-center">
                  <img src="@/assets/images/home/icon_5.png" alt="">
                  <p>{{scope.row.repostsCount}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="commentsCount"
                             label="总评论"
                             width="320">
              <template slot-scope="scope">
                <div class="morehot-icon flex-all-center">
                  <img src="@/assets/images/home/icon_4.png" alt="">
                  <p>{{scope.row.commentsCount}}</p>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <set-page @pagingChange="pagingChange"
                  :total="total"
                  ref="child"></set-page>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
require('echarts-wordcloud')
export default {
  data () {
    return {
      articleData: {},
      total: 0,
      pingTotal: 0,
      pinglundata: [],
      tableData: [],
      lineData: '',
      charParams: {
        id: '',
        historyName: 'attitudesCount',
        dataType: 'total'
      },
      pageSort: {
        pageNum: 1,
        pageSize: 10
      },
      rule: {
        pageNum: 1,
        pageSize: 10
      },
      word: []
    }
  },
  created () {
    this.charParams.id = this.$route.query.id
    this.getTableList()
  },
  mounted () {
    this.lineCharts()
    this.getArticleList()
  },
  methods: {
    // 分页
    pagingChange (query) {
      this.pageSort.pageSize = query.size
      this.pageSort.pageNum = query.page
      this.getTableList()
    },
    pagingPingChange (query) {
      this.rule.pageSize = query.size
      this.rule.pageNum = query.page
      this.getComments()
    },
    target (url) {
      window.open(url)
    },
    // 获取监测文章数据
    getArticleList () {
      this.$http.get(this.$api.wbArticle, { params: { id: this.$route.query.id } })
        .then(res => {
          this.articleData = res.data.data
          this.articleData.rawText = this.articleData.rawText.slice(0,100)+ '... '
          this.getComments()
        }).catch(() => { })
    },
    // 获取评论和热词
    getComments () {
      let obj = {
        // mid: '4630256097692398',
        mid: this.articleData.mid,
        pageBean: {
          pageSize: this.rule.pageSize,
          pageNum: this.rule.pageNum
        }
      }
      this.$http.post(this.$api.wbMinComments, obj)
        .then(res => {
          this.pinglundata = res.data.data.list
          this.pingTotal = res.data.data.total
          this.word = res.data.data.hotWords
          this.getClound()
        }).catch(() => { })
    },
    // 获取表格数据
    getTableList () {
      let params = {
        id: this.$route.query.id,
        pageBean: {
          pageSize: this.pageSort.pageSize,
          pageNum: this.pageSort.pageNum
        }
      }
      this.$http.post(this.$api.wbMinActionList, params)
        .then(res => {
          this.tableData = res.data.data.article
          this.total = res.data.data.total
        }).catch(() => { })
    },
    // 趋势渠道切换
    tabsTrend (tabs) {
      this.charParams.historyName = tabs
      this.lineCharts()
    },
    tabsNumber (tabs) {
      this.charParams.dataType = tabs
      this.lineCharts()
    },
    lineCharts () {
      this.$http.post(this.$api.wbMinActionsChart, this.charParams)
        .then(res => {
          let charData = res.data.data.data
          let charTime = res.data.data.time
          let myChart = echarts.init(document.getElementById('line-charts'))
          let option = {
            tooltip: {
              trigger: 'axis',
              transitionDuration: 0, // 防止鼠标滑入抖动
            },
            grid: {
              top: '20%',
              left: '5%',
              right: '5%',
              bottom: '10%'
              // containLabel: true
            },
            legend: {
              x: '78%',
              top: '5%',
              textStyle: {
                color: '#90979c'
              }
            },
            xAxis: [{
              type: 'category',
              axisLine: {
                show: true
              },
              splitArea: {
                color: '#aaa',
                lineStyle: {
                  color: '#f00'
                }
              },
              axisLabel: {
                show: false,
                color: '#aaa'
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              boundaryGap: false,
              data: charTime
            }],
            yAxis: [{
              type: 'value',
              min: 0,
              minInterval: 1,
              splitNumber: 4,
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#D3D3D3',
                  type: 'dashed'
                }
              },
              axisLine: {
                show: false
              },
              axisLabel: {
                show: true,
                margin: 20,
                textStyle: {
                  color: '#aaa'
                }
              },
              axisTick: {
                show: false
              }
            }],
            dataZoom: [{
              show: true,
              height: 30,
              xAxisIndex: [0],
              // 'start': 0,
              // 'end': 30,
              handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
              handleSize: '110%',
              handleStyle: {
                color: '#00ca95'
              },
              textStyle: {
                color: 'rgba(204,187,225,0.9)'
              },
              fillerColor: 'rgba(0,202,149,0.4)',
              borderColor: 'rgba(0,202,149,0.5)'

            }],
            series: [
              {
                name: '',
                type: 'line',
                smooth: true, //是否平滑
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 15,
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#FF6600'
                  }
                },
                itemStyle: {
                  color: '#FF6600',
                  borderColor: '#fff',
                  borderWidth: 3,
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(247,147,147,0.3)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(247,147,147,0)'
                    }
                    ], false),
                    shadowColor: 'rgba(247,147,147, 0.9)',
                    shadowBlur: 20
                  }
                },
                data: charData
              }
            ]
          }
          myChart.setOption(option)
          window.addEventListener('resize', function () {
            myChart.resize()
          })
        }).catch(() => { })
    },
    getClound () {
      let myChart = echarts.init(document.getElementById('pinglun'))
        let option = {
          tooltip: {
            show: true,
            transitionDuration: 0 // 防止鼠标滑入抖动
          },
          series: [{
            type: 'wordCloud',
            gridSize: 1,
            sizeRange: [22, 55],
            rotationRange: [-45, 0, 60, 90],
            // maskImage: this.image,
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
            data: this.word
          }]
        }
        myChart.setOption(option)
    }
  },
  components: {
  }
}
</script>
<style>
@import '../monitor.css';
</style>
<style scoped>
.detail-content {
  background-color: #fff;
  padding: 40px 20px;
}
.content-show {
  max-width: 1400px;
  margin: 28px auto;
}
.left-data {
  width: 300px;
}

.all-trend {
  padding: 60px 0;
  position: relative;
}
.title {
  margin-right: 65px;
  color: #151c29;
}
.title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 20px;
  background-color: #2196f3;
  vertical-align: middle;
  margin-top: -4px;
  margin-right: 10px;
}
.tabs-button span {
  font-size: 14px;
  border: 1px solid #e1e4e8;
  padding: 5px 20px;
  cursor: pointer;
  font-weight: bold;
}
.tabs-button span:hover,
.tabs-button span.isActive {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
#line-charts {
  width: 100%;
  height: 495px;
  margin-top: 50px;
}
.bottom-tabs {
  position: absolute;
  right: 20px;
  top: 100px;
}
.wb-ping-box {
  height: 450px;
  margin-bottom: 20px;
}
#pinglun, .pinglun-tip {
  width: 580px;
  height: 420px;
}
.wb-ping-right {
  width: 600px;
  height: 100%;
}
.wb-min-head {
  width: 100%;
  height: 118px;
  padding: 20px;
  background: #F5F9FF;
  box-sizing: border-box;
  border: 1px solid #98BDFE;
}
.wb-min-head img {
  width: 60px;
  height: 60px;
}
.wb-screen-name {
  font-size: 18px;
  font-weight: bold;
  color: #252934;
  margin-left: 15px;
}
.wb-min-msg {
  margin: 0 30px;
}
.wb-min-msg p {
  color: #888A8D;
}
.wb-min-msg span {
  color: #252934;
}
.wb-min-msg i {
  color: #F79406;
  margin-right: 5px;
}
.wb-min-cont {
  width: 600px;
  height: 100%;
  line-height: 24px;
  color: #50525A;
}
.pinglun-ava img {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-right: 5px;
}
</style>
