<!--
 * @Author: MaiChao
 * @Date: 2021-02-23 15:01:05
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-14 15:22:53
-->
<template>
  <div class="flex-bwt-center">
    <div class="pie-left">
      <div class="title">发文类别统计</div>
      <div id="article-type"></div>
    </div>
    <div class="pie-right">
      <div class="title">发文热词</div>
      <div id="article-word"></div>
    </div>
  </div>
</template>
<script>
let echarts = require('echarts/lib/echarts')
require('echarts-wordcloud')
export default {
  data () {
    return {
    }
  },
  methods: {
    getArticleData (data) {
      let jsonObj = JSON.parse(data.aricleContentTypeChartJson)
      let pieData = []
      if (jsonObj.length > 0) {
        jsonObj.forEach(item => {
          let params = {
            name: item.pageType,
            value: item.percentage,
            num: item.articleCountNum
          }
          pieData.push(params)
        })
        let myChart = echarts.init(document.getElementById('article-type'))
        let option = {
          color: ['#019CFF', '#33C74D', '#F7E71B', '#19D6EC'],
          grid: {
            left: 10,
            top: 50,
            bottom: 10,
            right: 10,
            containLabel: false
          },
          tooltip: {
            trigger: 'item',
            // formatter: '{b} : {c}%'
            formatter (params) {
              return params.data.name + ':' + params.data.num + '占比' + params.data.value + '%'
            }
          },

          calculable: true,
          series: [{
            stack: 'a',
            type: 'pie',
            radius: ['40%', '50%'],
            label: {
              normal: {
                show: true,
                formatter: function (params) {
                  return params.name + ':' + params.value + '%'
                },
                textStyle: {
                  fontSize: 20
                },
                position: 'outside'
              },
              emphasis: {
                show: true
              }
            },
            data: pieData
          }]
        }
        myChart.setOption(option)
        window.addEventListener('resize', function () {
          myChart.resize()
        })
      } else {
        var html = '<div><span  style="position: absolute;width:100%;top: 40%;display:block;text-align:center;color:#868686; font-size: 20px;">暂无数据</span></div>'
        document.getElementById('article-type').innerHTML = html
        document.getElementById('article-type').removeAttribute('_echarts_instance_')
      }
    },
    getArticleTime (data) {
      let jsonObj = JSON.parse(data.aricleHotChartJson)
      if (jsonObj.length > 0) {
        let myChart = echarts.init(document.getElementById('article-word'))
        let option = {
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
            data: jsonObj.listData
          }]
        }
        myChart.setOption(option)
        window.addEventListener('resize', function () {
          myChart.resize()
        })
      } else {
        var html = '<div><span  style="position: absolute;width:100%;top: 40%;display:block;text-align:center;color:#868686; font-size: 20px;">暂无数据</span></div>'
        document.getElementById('article-word').innerHTML = html
        document.getElementById('article-word').removeAttribute('_echarts_instance_')
      }
    }
  },
  mounted () {
    // this.getArticleData()
    // this.getArticleTime()
  }
}
</script>
<style scoped>
.pie-left,
.pie-right {
  width: 685px;
  height: 400px;
}
#article-type,
#article-word {
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
</style>
