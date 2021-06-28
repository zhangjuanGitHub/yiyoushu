<!--
 * @Author: MaiChao
 * @Date: 2021-02-23 15:01:05
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-06-03 18:04:45
-->
<template>
  <div class="flex-bwt-center">
    <div class="line-left">
      <div class="title">发博趋势</div>
      <div class="title-btn">
        <el-button :class="isOrigin==='articleCountList'?'isActive':''"
                   size="mini"
                   @click="tabsClick('articleCountList')">发博数</el-button>

        <el-button :class="isOrigin==='commentsList'?'isActive':''"
                   size="mini"
                   @click="tabsClick('commentsList')">评论数</el-button>

        <el-button :class="isOrigin==='attitudesList'?'isActive':''"
                   size="mini"
                   @click="tabsClick('attitudesList')">点赞数</el-button>

        <el-button :class="isOrigin==='repostsList'?'isActive':''"
                   size="mini"
                   @click="tabsClick('repostsList')">转发数</el-button>
        <!-- <el-button size="mini">发博数</el-button>
        <el-button size="mini">评论数</el-button>
        <el-button size="mini">点赞数</el-button>
        <el-button size="mini">转发数</el-button> -->
      </div>
      <div id="article-data"></div>
    </div>
    <div class="line-right">
      <div class="title">粉丝趋势</div>
      <div id="article-time"></div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      isOrigin: 'articleCountList',
      articleData: {},
      dataList: [],

      articleCountList: [],
      attitudesList: [],
      commentsList: [],
      repostsList: [],
      timeList: []
    }
  },
  methods: {
    tabsClick (tab) {
      // console.log(tab)
      this.dataList = []
      this.isOrigin = tab
      // this.$emit('fatherMethod', id)
      if (tab == 'articleCountList') {
        this.echartsSelect(this.articleCountList)
      } else if (tab == 'attitudesList') {
        this.echartsSelect(this.attitudesList)
      } else if (tab == 'commentsList') {
        this.echartsSelect(this.commentsList)
      } else {
        this.echartsSelect(this.repostsList)
      }
    },
    echartsSelect (jsonObj) {
      // let tab = this.isOrigin
      let myChart = echarts.init(document.getElementById('article-data'))
      // this.dataList = jsonObj[tab]
      // console.log(this.dataList)
      // var yData = this.dataList
      var yData = jsonObj
      // var yData = this.articleData[tab]
      // var xData = []
      // jsonObj.timeList.forEach(item => {
      //   // xData.push(item + '点')
      //   xData.push(item)
      // })
      // console.log(this.articleCountList, yData)
      let option = {
        tooltip: {
          trigger: 'axis',
          formatter (params) {
            var showHtm = params[0].name + ':<br>' + params[0].value + '篇'
            return showHtm
          },
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(0, 255, 233,0)'
                }, {
                  offset: 0.5,
                  color: 'rgba(255, 255, 255,1)'
                }, {
                  offset: 1,
                  color: 'rgba(0, 255, 233,0)'
                }],
                global: false
              }
            }
          }
        },
        grid: {
          left: '10%',
          top: '10%',
          bottom: '20%',
          right: '10%'
        },
        yAxis: [{
          type: 'value',
          position: 'left',
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#9E87FF'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: '{value}' + '篇',
            color: '#9E87FF',
            fontSize: 14
          }
        }],
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#9E87FF'
            }
          },
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#9E87FF',
              fontWeight: 'normal',
              fontSize: 14,
              lineHeight: 22
            }

          },
          // data: xData
          data: this.timeList
        }],
        dataZoom: [{
          show: true,
          height: 15,
          xAxisIndex: [0],
          bottom: 15,

          'start': 0,
          'end': 100,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#5B3AAE'
          },
          textStyle: {
            color: '#9E87FF'
          },
          fillerColor: 'rgba(67,55,160,0.4)',
          borderColor: '#9E87FF'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [{
          symbolSize: 10,
          symbol: 'circle',
          type: 'line',
          data: yData,
          animationEasing: 'bounceOut',
          animationDuration: 3600,
          itemStyle: {
            normal: {
              borderWidth: 5,
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: '#9effff'
              },
              {
                offset: 1,
                color: '#9E87FF'
              }
              ]),
              shadowColor: 'rgba(158,135,255, 0.3)',
              shadowBlur: 10,
              shadowOffsetY: 20
            }
          }
        }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    getArticleData (data) {
      // console.log(JSON.parse(data))
      // this.articleData = JSON.parse(data)
      // console.log(this.articleData)
      // let tab = this.isOrigin
      let jsonObj = JSON.parse(data)
      this.articleCountList = jsonObj.articleCountList
      this.attitudesList = jsonObj.attitudesList
      this.commentsList = jsonObj.commentsList
      this.repostsList = jsonObj.repostsList
      this.timeList = jsonObj.timeList
      // console.log(this.articleCountList)

      this.echartsSelect(this.articleCountList)
    },
    getCommentsData (data) {
      console.log(data)
      if (data) {
        let jsonObj = JSON.parse(data)
        let minNum = Math.min.apply(null, jsonObj.count)
        let myChart = echarts.init(document.getElementById('article-time'))
        // 绘制图表
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
            // data: res.data.data.date
            data: jsonObj.date
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
              data: jsonObj.count
            }
          ]
        })
      } else {
        var html = '<div><span  style="position: absolute;width:100%;top: 40%;display:block;text-align:center;color:#868686; font-size: 20px;">暂无数据</span></div>'
        document.getElementById('article-time').innerHTML = html
        document.getElementById('article-time').removeAttribute('_echarts_instance_')
      }
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.line-left,
.line-right {
  width: 685px;
  height: 400px;
}
#article-data,
#article-time {
  width: 100%;
  height: 333px;
  position: relative;
}
#article-time{
  height: 380px;
}
.title {
  font-size: 18px;
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

.isActive {
  color: #2196f3;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.title-btn {
  margin-left: 10px;
  margin-top: 10px;
}
.title-btn button {
  margin-right: -11px;
}
</style>
