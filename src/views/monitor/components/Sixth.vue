<!--
 * @Author: MaiChao
 * @Date: 2021-02-23 15:01:05
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-14 15:31:18
-->
<template>
  <div class="flex-bwt-center">
    <div class="pie-left">
      <div class="title">留言数据分析</div>
      <div class="table-tabs flex-ali-center">
        <div class="tabs-box">
          <div>
            <p>总留言数</p>
            <p class="tabs-data">{{analysis.replyNum}}</p>
          </div>
        </div>
        <div class="tabs-box">
          <div>
            <p>总留言点赞数</p>
            <p class="tabs-data">{{analysis.likeCountNum}}</p>
          </div>
        </div>
        <div class="tabs-box">
          <div>
            <p>总留言回复数</p>
            <p class="tabs-data">{{analysis.commentNum}}</p>
          </div>
        </div>
      </div>
      <div id="language-type"></div>
    </div>
    <div class="pie-right">
      <div class="title">留言词云</div>
      <div id="article-word2"></div>
    </div>
  </div>
</template>
<script>
let echarts = require('echarts/lib/echarts')
require('echarts-wordcloud')
export default {
  data () {
    return {
      analysis: {
        commentNum: '',
        likeCountNum: '',
        replyNum: ''
      }
    }
  },
  methods: {
    getArticleTime (data) {
      let jsonObj = JSON.parse(data.commentChartJson)
      this.analysis.commentNum = jsonObj.commentNum
      this.analysis.likeCountNum = jsonObj.likeCountNum
      this.analysis.replyNum = jsonObj.replyNum
      let articleCountNum = []
      let time = []
      jsonObj.chart.forEach(item => {
        articleCountNum.push(item.articleCountNum)
        time.push(item.time)
      })
      let myChart = echarts.init(document.getElementById('language-type'))
      let option = {
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.5)'
          // axisPointer: {
          //   lineStyle: {
          //     color: {
          //       type: 'linear',
          //       x: 0,
          //       y: 0,
          //       x2: 0,
          //       y2: 1,
          //       colorStops: [{
          //         offset: 0,
          //         color: 'red'
          //       }, {
          //         offset: 0.5,
          //         color: '#48b3FF'
          //       }, {
          //         offset: 1,
          //         color: '#d9efff'
          //       }],
          //       global: false
          //     }
          //   }
          // }
        },
        grid: {
          top: '5%',
          left: '5%',
          right: '3%',
          bottom: '8%'
          // containLabel: true
        },
        xAxis: [{
          type: 'category',
          color: '#59588D',
          axisLine: {
            show: true
          },
          axisLabel: {
            color: '#282828'
          },
          splitLine: {
            // show: true
          },
          axisTick: {
            show: false
          },
          // boundaryGap: true,
          data: time
        }],
        yAxis: [{
          type: 'value',
          min: 0,
          splitNumber: 4,
          axisLine: {
            show: true
          },
          axisLabel: {
            show: true,
            // margin: 20,
            textStyle: {
              color: '#737373'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(131,101,101,0.2)',
              type: 'dashed'
            }
          }
        }],
        series: [{
          name: '',
          type: 'line',
          // smooth: true, //是否平滑
          showAllSymbol: true,
          symbol: 'circle',
          symbolSize: 10,
          lineStyle: {
            normal: {
              color: '#48B3FF'
            }
          },
          label: {
            show: false,
            position: 'top',
            textStyle: {
              color: '#48B3FF'
            }
          },
          itemStyle: {
            color: '#FFF',
            borderColor: '#48B3FF',
            borderWidth: 2
          },
          tooltip: {
            show: true
          },
          // areaStyle: {
          //   normal: {
          //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //       offset: 0,
          //       color: 'rgba(195,230,255,1)'
          //     },
          //     {
          //       offset: 1,
          //       color: 'rgba(195,230,255,0.1)'
          //     }
          //     ], false),
          //     shadowColor: 'rgba(195,230,255,0.1)',
          //     shadowBlur: 20
          //   }
          // },
          data: articleCountNum
        }]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    getArticleData (data) {
      let jsonObj2 = JSON.parse(data.commentHotChartJson)
      if (jsonObj2.listData.length > 0) {
        let myChart2 = echarts.init(document.getElementById('article-word2'))
        let wordOption = {
          tooltip: {
            show: true
          },
          series: [{
            type: 'wordCloud',
            gridSize: 1,
            sizeRange: [12, 55],
            rotationRange: [-45, 0, 45, 90],
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
            // width: '96%',
            // height: '100%',
            right: null,
            bottom: null,
            // width: 300,
            // height: 200,
            // top: 20,
            data: jsonObj2.listData
          // data: [{
          //   value: 50,
          //   name: '视频'
          // },
          // {
          //   value: 55,
          //   name: '纯文字'
          // },
          // {
          //   value: 55,
          //   name: '图文'
          // }]
          }]
        }
        myChart2.setOption(wordOption)
        window.addEventListener('resize', function () {
          myChart2.resize()
        })
      } else {
        var html = '<div><span  style="position: absolute;width:100%;top: 40%;display:block;text-align:center;color:#868686; font-size: 20px;">暂无数据</span></div>'
        document.getElementById('article-word2').innerHTML = html
        document.getElementById('article-word2').removeAttribute('_echarts_instance_')
      }
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.pie-left,
.pie-right {
  width: 670px;
  min-height: 426px;
}
#language-type{
  width: 623px;
  height: 320px;
}
#article-word2 {
  width: 100%;
  height: 423px;
  position: relative;
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
.tabs-box {
  width: 205px;
  height: 95px;
  border: 1px solid #f5f5f5;
  background-color: #fafafa;
  display: flex;
  flex-wrap: wrap;
  align-self: center;
  margin-top: 20px;
}
.tabs-box div {
  text-align: center;
  font-size: 18px;
  color: #949ead;
  margin: auto;
}
.tabs-box .tabs-data {
  font-size: 24px;
  color: #151c29;
}
</style>
