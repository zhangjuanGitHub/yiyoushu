<!--
 * @Author: MaiChao
 * @Date: 2021-02-23 15:01:05
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-07-29 18:36:07
-->
<template>
  <div class="">
    <div class="pie-left">
      <div class="title">阅读数分布</div>
      <div id="article-word"></div>
    </div>
    <div class="pie-right">
      <div class="title">头条内容占比</div>
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
            <!-- <th>视频</th> -->
            <!-- <th>文章</th> -->
            <!-- <th>微头条</th> -->
            <!-- <th>小视频</th> -->
            <th v-for="(item,ind) in thList" :key="ind">{{item}}</th>
          </tr>
          <tr>
            <!-- <td><span class="yc">{{this.tableData[1]}}</span>篇</td>
            <td><span class="zf">{{this.tableData[0]}}</span>篇</td>
            <td><span class="yc">{{this.tableData[1]}}</span>篇</td>
            <td><span class="zf">{{this.tableData[0]}}</span>篇</td> -->
            <td v-for="(i,index) in tdList" :key="index"><span :style="'color'+':'+ colList[index] ">{{i}}</span>篇</td>
          </tr>
          <tr>
            <td v-for="(item,inde) in tdList" :key="inde" v-text="GetPercent(tdList[inde])"></td>
            <!-- <td>{{this.tableData[0]/(this.tableData[0]+this.tableData[1])}}</td>
          <td>{{this.tableData[1]/(this.tableData[0]+this.tableData[1])}}</td> -->
            <!-- <td v-text="GetPercent(this.tableData[1])"></td> -->
            <!-- <td v-text="GetPercent(this.tableData[0])"></td> -->
            <!-- <td v-text="GetPercent(this.tableData[1])"></td> -->
            <!-- <td v-text="GetPercent(this.tableData[0])"></td> -->
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
      ],
      thList: [], // 表头
      tdList: [], // 数量
      colList: ['#fac858', '#73c0de', '#fac858', '#73c0de', '#fac858', '#73c0de']
    }
  },
  methods: {
    // 阅读数
    getArticleData (data) {
      // console.log(data)

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
        let myChart = echarts.init(document.getElementById('article-word'))
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            right: 30,
            // top: 150,
            // x: 'right', // 图例显示在右边
            y: 'center',
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
    // 头条内容占比
    getArticleTime (data) {
      // console.log(data)
      let jsonObj = JSON.parse(data)
      // console.log(jsonObj)
      this.thList = jsonObj.dataList
      this.tdList = jsonObj.numList
      this.tableData = jsonObj.numList
      // this.GetPercent(this.tableData)
      // console.log(this.tableData)
      let myChart = echarts.init(document.getElementById('article-type'))
      var datas = []
      for (var i = 0; i < jsonObj.numList.length; i++) {
        // var j = { value: 0, name: '评论数' }
        // datas.push({ value: jsonObj.numList[i], name: jsonObj.dataList[i] == 'true' ? '原创微博' : '转发微博' })
        datas.push({ value: jsonObj.numList[i], name: jsonObj.dataList[i] })
      }
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          // top: '5%',
          orient: 'vertical',
          right: '5%',
          // top: '5%',
          y: 'center'
        },
        color: ['#fac858', '#5470c6', '#91cc75', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        series: [
          {
            name: '头条内容占比',
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
      // console.log(n)
      // console.log(this.tdList)

      var total = 0
      for (var i = 0; i < this.tdList.length; i++) {
        total += Number(this.tdList[i])
      }
      console.log(total)
      var num = n
      total = parseFloat(total)
      num = parseFloat(num)
      if (isNaN(total) || isNaN(num)) {
        return '-'
      }
      return total <= 0 ? '0%' : (Math.round(num / total * 10000) / 100.00) + '%'
      // var total = Number(this.tableData[0]) + Number(this.tableData[1])// 总数
      // var num = n
      // total = parseFloat(total)
      // num = parseFloat(num)
      // if (isNaN(total) || isNaN(num)) {
      //   return '-'
      // }
      // return total <= 0 ? '0%' : (Math.round(num / total * 10000) / 100.00) + '%'
    }
  },
  mounted () {
    // this.getArticleData()
    // this.getArticleTime()
  }
}
</script>
<style scoped>
.pie-left {
  /* width: 685px; */
  width: 510px;
  height: 585px;
}
.pie-right {
  /* width: 685px; */
  width: 510px;
  height: 645px;
}

#article-word {
  margin-top:80px;
  width: 100%;
  height: 333px;
  position: relative;
}
#article-type {
  width: 100%;
  height: 330px;
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
  width: 98%;
  /* background: cadetblue; */
  /* text-align: center; */
  /* margin: 0 auto; */
}
table {
  border: 1px solid #E9E9E9;
  /* width: 440px; */
  width: 100%;
  height: 140px;
  margin: 0 auto;
}
th {
  border: 1px solid #E9E9E9;
  /* text-align: center; */
}
td {
  border: 1px solid #E9E9E9;
  text-align: center;
}
td span{
   margin-right: 5px;
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
