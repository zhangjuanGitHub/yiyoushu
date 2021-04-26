<!--
 * @Author: MaiChao
 * @Date: 2021-02-23 15:01:05
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-16 19:06:30
-->
<template>
  <div class="flex-bwt-center">
    <div class="line-left">
      <div class="title">发文数据分析</div>
      <div id="article-data"></div>
    </div>
    <div class="line-right">
      <div class="title">发文时间分布</div>
      <div id="article-time"></div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
    }
  },
  methods: {
    getArticleData (data) {
      let jsonObj = JSON.parse(data.aricleHrChartJson)
      let myChart = echarts.init(document.getElementById('article-data'))
      var yData = jsonObj.articleNum
      var xData = jsonObj.time
      let option = {
        tooltip: {
          trigger: 'axis',
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
          left: '5%',
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
            formatter: '{value}',
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
          data: xData
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
    getArticleTime (data) {
      let jsonObj = JSON.parse(data.aricleDateChartJson)
      let myChart = echarts.init(document.getElementById('article-time'))
      var yData = jsonObj.articleCountNumList
      var xData = jsonObj.timeList
      let option = {
        tooltip: {
          trigger: 'axis',
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
          left: '8%',
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
            formatter: '{value}',
            color: '#9E87FF',
            fontSize: 14
          }
        }],
        xAxis: [{
          name: '',
          nameTextStyle: {
            color: '#eee',
            fontSize: 12
          },
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
          data: xData
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
    }
  },
  mounted () {
    // this.getArticleData()
    // this.getArticleTime()
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
</style>
