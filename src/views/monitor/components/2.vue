<!--
 * @Author: MaiChao
 * @Date: 2021-02-23 15:01:05
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-05-27 18:59:55
-->
<template>
  <div class="flex-bwt-center">
    <div class="line-left">
      <div class="title">发博时间分布</div>
      <div id="article-data"></div>
    </div>
    <div class="line-right">
      <div class="title">原创占比</div>
      <div id="article-time"></div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      articleData: {}
    }
  },
  methods: {
    getArticleTime (data) {
      console.log(data)
      // this.articleData = JSON.parse(data)
      // console.log(this.articleData)
      // let tab = this.isOrigin
      let jsonObj = JSON.parse(data)
      console.log(jsonObj.numList)
      let myChart = echarts.init(document.getElementById('article-data'))
      var yData = jsonObj.numList
      var xData1 = jsonObj.timeLsit
      // var yData = this.articleData[tab]
      // var xData = []
      // jsonObj.timeList.forEach(item => {
      //   // xData.push(item + '点')
      //   xData.push(item)
      // })
      console.log(xData1, yData)
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: ['orange'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xData1,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: yData
          }
        ]
      }
      myChart.setOption(option)
      // window.addEventListener('resize', function () {
      //   myChart.resize()
      // })
    },
    getCommentsData (data) {
      console.log(data)
      // let jsonObj = JSON.parse(data.aricleContentTypeChartJson)
      let jsonObj = JSON.parse(data)
      console.log(jsonObj)
      var datas = []
      var tips = ['500以下', '500-2000', '2000-1万', '1万-5万', '5万以上']

      if (jsonObj.length > 0) {
        for (var i = 0; i < jsonObj.length; i++) {
          // var j = { value: 0, name: '评论数' }
          datas.push({ value: jsonObj[i], name: tips[i] })
        }
        console.log(datas)
        let myChart = echarts.init(document.getElementById('article-time'))
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            right: 50,
            top: 50,
            data: ['500以下', '500-2000', '2000-1万', '1万-5万', '5万以上']
          },
          color: ['#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272'],
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: datas
              // data: [
              //   { value: 335, name: '评论数' },
              //   { value: 335, name: '评论数' },
              //   { value: 335, name: '评论数' },
              //   { value: 335, name: '评论数' },
              //   { value: 335, name: '评论数' }
              // ]
            }
          ]
        }
        myChart.setOption(option)
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
