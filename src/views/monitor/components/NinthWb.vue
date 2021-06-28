<!--
 * @Author: MaiChao
 * @Date: 2021-02-23 15:01:05
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-06-03 14:28:05
-->
<template>
  <div class="flex-bwt-center">
    <div class="pie-left">
      <div class="title">发博时间分布</div>
      <div id="article-word"></div>
    </div>
    <div class="pie-right">
      <div class="title">原创占比</div>
      <div id="article-type"
           class="article-type"></div>
      <div class="table">
        <!-- <el-table :data="data"
                  border
                  style="width: 60%">
          <el-table-column prop="yc"
                           label="原创微博">
                           <template slot-scope='scope'>
                             <div>
                               {{scope.row.yc}}篇
                             </div>
                           </template>
          </el-table-column>
          <el-table-column prop="zf"
                           label="转发微博">
                           <template slot-scope='scope'>
                             <div>
                               {{scope.row.zf}}篇
                             </div>
                           </template>
          </el-table-column>
        </el-table> -->

        <table cellspacing="0"
               aligin="center">
          <tr>
            <th>原创微博</th>
            <th>转发微博</th>
          </tr>
          <tr>
            <td><span class="yc">{{this.tableData[1]}}</span>篇</td>
            <td><span class="zf">{{this.tableData[0]}}</span>篇</td>
          </tr>
          <tr>
            <!-- <td>{{this.tableData[0]/(this.tableData[0]+this.tableData[1])}}</td>
          <td>{{this.tableData[1]/(this.tableData[0]+this.tableData[1])}}</td> -->
            <td v-text="GetPercent(this.tableData[1])"></td>
            <td v-text="GetPercent(this.tableData[0])"></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
let echarts = require('echarts/lib/echarts')
require('echarts-wordcloud')
export default {
  data () {
    return {
      tableData: [],
      data: [
        { yc: 904, zf: 0 }
      ]
    }
  },
  methods: {
    // 发博时间
    getArticleData (data) {
      // console.log(data)

      let jsonObj = JSON.parse(data)

      // let pieData = []
      // if (jsonObj.length > 0) {
      //   jsonObj.forEach(item => {
      //     let params = {
      //       name: item.pageType,
      //       value: item.articleCountNum,
      //       num: item.percentage
      //     }
      //     pieData.push(params)
      //   })
      //   console.log(pieData)
      let myChart = echarts.init(document.getElementById('article-word'))
      var yData = jsonObj.numList
      // var xData1 = jsonObj.timeLsit
      var xData1 = []
      jsonObj.timeLsit.forEach(item => {
        xData1.push(item + '时')
      })
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
            name: '发博数',
            type: 'bar',
            barWidth: '60%',
            data: yData
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
      // } else {
      //   var html = '<div><span  style="position: absolute;width:100%;top: 40%;display:block;text-align:center;color:#868686; font-size: 20px;">暂无数据</span></div>'
      //   document.getElementById('article-type').innerHTML = html
      //   document.getElementById('article-type').removeAttribute('_echarts_instance_')
      // }
    },
    // 原创占比
    getArticleTime (data) {
      // console.log(data)
      let jsonObj = JSON.parse(data)
      this.tableData = jsonObj.numList
      // this.GetPercent(this.tableData)
      // console.log(this.tableData)
      let myChart = echarts.init(document.getElementById('article-type'))
      var datas = []
      for (var i = 0; i < jsonObj.numList.length; i++) {
        // var j = { value: 0, name: '评论数' }
        datas.push({ value: jsonObj.numList[i], name: jsonObj.dataList[i] == 'true' ? '原创微博' : '转发微博' })
      }
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          // top: '5%',
          orient: 'vertical',
          right: '5%',
          top: '5%'
        },
        color: ['#fac858', '#73c0de'],
        series: [
          {
            name: '原创占比',
            type: 'pie',
            radius: ['40%', '70%'],
            labelLine: {
              show: true, // 控制线条显示
              length: 20,
              length2: 70,
              lineStyle: {
                width: 1,
                // color: '#333',
                type: 'solid'
              }
            },
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20'
                // fontWeight: 'bold'
              }
            },
            data: datas
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    GetPercent (n) {
      var total = Number(this.tableData[0]) + Number(this.tableData[1])// 总数
      var num = n
      total = parseFloat(total)
      num = parseFloat(num)
      if (isNaN(total) || isNaN(num)) {
        return '-'
      }
      return total <= 0 ? '0%' : (Math.round(num / total * 10000) / 100.00) + '%'
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

#article-word {
  width: 100%;
  height: 333px;
  position: relative;
}
#article-type {
  width: 80%;
  height: 160px;
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
.table {
  width: 80%;
  /* text-align: center; */
  /* margin: 0 auto; */
}
table {
  border: 1px solid black;
  width: 440px;
  height: 140px;
  margin: 0 auto;
}
th {
  border: 1px solid black;
  /* text-align: center; */
}
td {
  border: 1px solid black;
  text-align: center;
}
.yc {
  font-size: 18px;
  margin-right: 5px;
  color: #73c0de;
}
.zf {
  color: #fac858;
  font-size: 18px;
  margin-right: 5px;
}
</style>
