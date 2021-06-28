<!--
 * @Author: MaiChao
 * @Date: 2021-03-12 14:10:32
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-05-27 16:36:03
-->
<template>
  <div class="detail content-show">
    <div class="tabs-header flex-ali-center">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'AccountCompany' }">新媒体监测</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'WxMinuteBox' }">分钟级监测</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'MinuteList' }">监测列表</el-breadcrumb-item>
        <el-breadcrumb-item>查看详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="detail-content">
      <div class="relation flex-ali-center">
        <div class="left-data flex-ali-center">
          <div class="header-img flex-ali-center">
            <img :src="articleData.oriHeadImg">
          </div>
          <div class="data-name">
            <p class="name">{{articleData.nickname}}</p>
            <p class="detail">{{articleData.alias}}</p>
          </div>
        </div>
        <div class="right-data flex-ali-center">
          <div class="header-img flex-ali-center">
            <img :src="articleData.cover">
          </div>
          <div class="flex-ali-center">
            <div class="lable-box" v-if="articleData.idx==='1'">头条</div>
            <div class="lable-box" v-else>次条</div>
            <div>{{articleData.title}}</div>
            <div class="click-span cursor" @click="openUrl(articleData)">文章详情 ></div>
          </div>
        </div>
      </div>
      <div class="all-trend">
        <div class="title-box flex-bwt-center">
          <div class="title">整体趋势图</div>
          <div class="tabs-button">
            <span @click="tabsTrend('readNum')"
                  :class="charParams.historyName==='readNum'?'isActive':''">阅读数</span>
            <span @click="tabsTrend('oldLikeNum')"
                  :class="charParams.historyName==='oldLikeNum'?'isActive':''">点赞数</span>
            <span @click="tabsTrend('likeNum')"
                  :class="charParams.historyName==='likeNum'?'isActive':''">在看数</span>
          </div>
        </div>
        <div class="bottom-tabs" v-if="charParams.historyName==='readNum'">
          <div class="tabs-button">
            <span @click="tabsNumber('total')"
                  :class="charParams.dataType==='total'?'isActive':''">阅读总数</span>
            <span @click="tabsNumber('increment')"
                  :class="charParams.dataType==='increment'?'isActive':''">阅读增量</span>
          </div>
        </div>
        <div class="bottom-tabs" v-if="charParams.historyName==='oldLikeNum'">
          <div class="tabs-button">
            <span @click="tabsNumber('total')"
                  :class="charParams.dataType==='total'?'isActive':''">点赞总数</span>
            <span @click="tabsNumber('increment')"
                  :class="charParams.dataType==='increment'?'isActive':''">点赞增量</span>
          </div>
        </div>
        <div class="bottom-tabs" v-if="charParams.historyName==='likeNum'">
          <div class="tabs-button">
            <span @click="tabsNumber('total')"
                  :class="charParams.dataType==='total'?'isActive':''">在看总数</span>
            <span @click="tabsNumber('increment')"
                  :class="charParams.dataType==='increment'?'isActive':''">在看增量</span>
          </div>
        </div>
        <div id="line-charts"></div>
      </div>
      <div class="data-table">
        <div class="title">数据详情</div>
        <div class="interaction-table">
          <el-table :data="tableData"
                    style="width: 100%"
                    border
                    :cell-style="{ textAlign: 'center' }">
            <el-table-column prop="insertTime"
                             label="时间">
            </el-table-column>
            <el-table-column prop="readNum"
                             width="190"
                             label="总阅读量">
            </el-table-column>
            <el-table-column prop="incrReadNum"
                             label="阅读增量"
                             width="190">
            </el-table-column>
            <el-table-column prop="oldLikeNum"
                             label="总点赞"
                             width="190">
            </el-table-column>
            <el-table-column prop="incrOldLikeNum"
                             width="190"
                             label="点赞数增量">
            </el-table-column>
            <el-table-column prop="likeNum"
                             label="总在看数"
                             width="190">
            </el-table-column>
            <el-table-column prop="incrLikeNum"
                             label="在看数增量"
                             width="190">
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
export default {
  data () {
    return {
      accountData: {},
      articleData: {},
      total: 0,
      isTrend: 'readNum',
      isNumber: 'total',
      tableData: [],
      lineData: '',
      charParams: {
        id: '',
        historyName: 'readNum',
        dataType: 'total'
      },
      pageSort: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created () {
    console.log(window.location)
    this.charParams.id = this.$route.query.id
  },
  mounted () {
    // this.getAnalyseList()
    this.getArticleList()
    this.lineCharts()
    this.getTableList()
  },
  methods: {
    // 分页
    pagingChange (query) {
      this.pageSort.pageSize = query.size
      this.pageSort.pageNum = query.page
      this.getTableList()
    },
    // 获取个人账号数据
    getAnalyseList () {
      this.$http.get(this.$api.getAccount, { params: { id: this.$route.query.id } })
        .then(res => {
          this.accountData = res.data.data
        }).catch(() => { })
    },
    // 获取监测文章数据
    getArticleList () {
      this.$http.get(this.$api.getArticle, { params: { id: this.$route.query.id } })
        .then(res => {
          this.articleData = res.data.data
        }).catch(() => { })
    },
    // 获取表格数据
    getTableList () {
      // commentCount: 62 评论
      // id: 6
      // incrCommentCount: 37 评论增量
      // incrLikeNum: 18 在看增量
      // incrOldLikeNum: 73 点赞增量
      // incrReadNum: 1010 阅读增量
      // insertTime: "2021-03-22 16:21:51" 时间
      // likeNum: 49 在看
      // oldLikeNum: 168 点赞
      // readNum: 4695 阅读
      let params = {
        id: this.$route.query.id,
        pageBean: {
          pageSize: this.pageSort.pageSize,
          pageNum: this.pageSort.pageNum
        }
      }
      this.$http.post(this.$api.listArticleHistory, params)
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
      this.$http.post(this.$api.listArticleChart, this.charParams)
        .then(res => {
          let charData = res.data.data.data
          let charTime = res.data.data.time
          let myChart = echarts.init(document.getElementById('line-charts'))
          let option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
                label: {
                  show: true,
                  backgroundColor: '#fff',
                  color: '#556677',
                  borderColor: 'rgba(0,0,0,0)',
                  shadowColor: 'rgba(0,0,0,0)'

                }
              },
              textStyle: {
                color: '#5c6c7c'
              },
              extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
            },
            grid: {
              top: '20%',
              left: '5%',
              right: '5%',
              bottom: '10%'
              // containLabel: true
            },
            legend: {
              x: '55%',
              top: '5%',
              textStyle: {
                color: '#90979c'
              }
              // data: ['第2条']
            },
            xAxis: [{
              type: 'category',
              axisLine: {
                show: true
              },
              splitArea: {
                // show: true,
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
              // max: 140,
              splitNumber: 4,
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(255,255,255,0.1)'
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

              'start': 0,
              'end': 30,
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
                // smooth: true, //是否平滑
                showAllSymbol: true,
                // symbol: 'image://./static/images/guang-circle.png',
                symbol: 'circle',
                symbolSize: 15,
                lineStyle: {
                  normal: {
                    color: '#00ca95',
                    shadowColor: 'rgba(0, 0, 0, .3)',
                    shadowBlur: 0,
                    shadowOffsetY: 5,
                    shadowOffsetX: 5
                  }
                },
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#00ca95'
                  }
                },

                itemStyle: {
                  color: '#00ca95',
                  borderColor: '#fff',
                  borderWidth: 3,
                  shadowColor: 'rgba(0, 0, 0, .3)',
                  shadowBlur: 0,
                  shadowOffsetY: 2,
                  shadowOffsetX: 2
                },
                tooltip: {
                  show: false
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(0,202,149,0.3)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(0,202,149,0)'
                    }
                    ], false),
                    shadowColor: 'rgba(0,202,149, 0.9)',
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
    openUrl (item) {
      window.open(item.url, '_black')
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
.header-img img {
  max-height: 80px;
  margin-right: 20px;
}
.right-data .header-img {
  border: 1px solid #707277;
  width: 100px;
  height: 58px;
  align-items: center;
  margin-right: 10px;
}
.right-data .header-img img {
  max-width: 100%;
  max-height: 58px;
  display: block;
  margin: 0 auto;
}
.left-data {
  width: 300px;
}
.data-name .name {
  font-size: 16px;
  color: #252934;
}
.data-name .detail {
  font-size: 14px;
  color: #707277;
}
.lable-box {
  color: #f79406;
  font-size: 12px;
  border: 1px solid #f79406;
  margin-right: 10px;
  padding: 0 8px;
}
.click-span {
  color: #3b81fe;
  margin-left: 25px;
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
</style>
