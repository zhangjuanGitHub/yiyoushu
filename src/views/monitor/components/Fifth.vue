<!--
 * @Author: MaiChao
 * @Date: 2021-02-23 15:01:05
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-16 18:14:21
-->
<template>
  <div class="twins">
    <div class="bar-top">
      <div class="title">文章类别分析</div>
      <div id="article-tabs"></div>
    </div>
    <div class="table-bottm">
      <div class="title">文章列表</div>
      <div id="article-word">
        <div class="table-tabs flex-ali-center">
          <el-button :class="isOrigin===''?'isActive':''"
                     size="small"
                     @click="tabsClick('')">最高阅读文章</el-button>
          <el-button :class="isOrigin===1?'isActive':''"
                     size="small"
                     @click="tabsClick(1)">原创文章</el-button>
          <el-button :class="isOrigin===3?'isActive':''"
                     size="small"
                     @click="tabsClick(3)">转载文章</el-button>
        </div>
        <div class="table-box">
          <el-table :data="tableData"
                    style="width: 100%"
                    border
                    :cell-style="{ textAlign: 'center' }"
                    :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column label="序号"
                             width="80">
              <template slot-scope='scope'>
                <div>
                  {{scope.$index+1}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="title"
                             label="文章标题"
                             width="550">
            </el-table-column>
            <el-table-column prop="read_num"
                             label="阅读量"
                             width="100">
            </el-table-column>
            <el-table-column prop="old_like_num"
                             label="点赞量"
                             width="100">
              <template slot-scope='scope'>
                <div class="cursor">
                  {{scope.row.old_like_num}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="like_num"
                             label="在看量"
                             width="100">
            </el-table-column>
            <el-table-column prop="comment_count"
                             label="评论量"
                             width="100">
            </el-table-column>
            <el-table-column prop="pubtime"
                             label="发文时间">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let echarts = require('echarts/lib/echarts')
export default {
  props: ['tableData', 'userData'],
  data () {
    return {
      isOrigin: ''
    }
  },
  methods: {
    tabsClick (id) {
      this.isOrigin = id
      this.$emit('fatherMethod', id)
    },
    getArticleData (data) {
      let jsonObj = JSON.parse(data.aricleTypeChartJson)
      let dataType = []
      let dataNum = []
      jsonObj.forEach(item => {
        dataType.push(item.pageType)
        dataNum.push(item.articleCountNum)
      })
      let myChart = echarts.init(document.getElementById('article-tabs'))
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            textStyle: {
              color: '#fff',
              fontSize: '26'
            }
          }
        },
        legend: {
          top: '5%',
          right: '10%',
          data: ['', '', '', '', ''],
          textStyle: {
            fontSize: 12,
            color: '#808080'
          },
          icon: 'rect'
        },
        grid: {
          top: 60,
          left: 50,
          bottom: 60,
          right: 60
        },
        xAxis: [{
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#4D4D4D',
            fontSize: 14,
            margin: 21,
            fontWeight: 'bold'
          },
          data: dataType

        }],
        yAxis: [{
          type: 'value',
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#808080',
            fontSize: 12,
            margin: 5
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }],
        series: [
          {
            name: '',
            type: 'bar',
            label: {
              show: false,
              position: 'top',
              fontSize: 14,
              color: '#3DC3F0',
              fontWeight: 'bold'
            },
            barMaxWidth: 600,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = [
                    ['#3DC3F0', '#CCF2FF'],
                    ['#3D8BF0', '#CCE2FF'],
                    ['#3DddF0', '#CCE2FF'],
                    ['#3D8cc0', '#CCE2FF'],
                    ['#3D8110', '#CCE2FF']
                  ]
                  var index = params.dataIndex
                  if (params.dataIndex >= colorList.length) {
                    index = params.dataIndex - colorList.length
                  }
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [
                      { offset: 0, color: colorList[index][0] },
                      { offset: 0.5, color: colorList[index][0] },
                      { offset: 1, color: colorList[index][1] }
                    ])
                }
              }
            },
            data: dataNum
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
  }

}
</script>
<style scoped>
#article-tabs,
#article-word {
  width: 1300px;
  min-height: 333px;
  box-sizing: border-box;
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
#article-word {
  padding: 30px 20px;
}
.el-button {
  border-radius: 0;
  margin: 0vmin;
}
.table-box {
  margin-top: 20px;
}
.isActive {
  color: #2196f3;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
</style>
