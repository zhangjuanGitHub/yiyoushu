<!--
 * @Author: MaiChao
 * @Date: 2021-02-23 15:01:05
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-06-03 14:28:55
-->
<template>
  <div class="flex-bwt-center">
    <div class="pie-left">
      <div class="title">发文热词</div>
      <div id="article-type-rc"></div>
    </div>
    <div class="pie-right">
      <div class="title">评论数分布</div>
      <div id="article-word-pl"></div>
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
    // 评论数
    getArticleData (data) {
      // let jsonObj = JSON.parse(data.aricleContentTypeChartJson)
      let jsonObj = JSON.parse(data)
      // console.log(jsonObj.length)
      var datas = []
      var tips = ['500以下', '500-2000', '2000-1万', '1万-5万', '5万以上']

      if (jsonObj.length > 0) {
        for (var i = 0; i < jsonObj.length; i++) {
          // var j = { value: 0, name: '评论数' }
          datas.push({ value: jsonObj[i], name: tips[i] })
        }
        // console.log(datas)
        let myChart = echarts.init(document.getElementById('article-word-pl'))
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
              name: '评论数',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
                // normal: {
                //   show: true, // 展示
                //   position: 'outside' // outside表示文本显示位置为外部
                // }
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                  // textStyle: {
                  //   fontSize: '14',
                  //   fontWeight: '600'
                  // }
                }
              },
              labelLine: {
                // show: false
                normal: {
                  show: true // 引导线不显示
                }

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
    },
    // 热词
    getArticleTime (data) {
      let jsonObj = JSON.parse(data)
      // console.log(jsonObj)
      // console.log(jsonObj.listData.length)
      if (jsonObj.listData.length > 0) {
        let myChart = echarts.init(document.getElementById('article-type-rc'))
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
        document.getElementById('article-type-rc').innerHTML = html
        document.getElementById('article-type-rc').removeAttribute('_echarts_instance_')
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
#article-type-rc,
#article-word-pl {
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
