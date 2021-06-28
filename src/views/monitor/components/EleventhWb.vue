<!--
 * @Author: MaiChao
 * @Date: 2021-02-23 15:01:05
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-05-28 18:55:52
-->
<template>
  <div class="twins">
    <!-- <div class="bar-top" v-show="this.jsonObj.isCommon">
      <div class="title">文章类别分析</div>
      <div id="article-tabs"></div>
    </div> -->
    <!-- <div class="flex-bwt-center"
         v-show="!this.jsonObj.isCommon">
      <div class="pie-left">
        <div class="title">四大检察十大业务</div>
        <div id="fourPie"></div>
      </div>
      <div class="pie-right">
        <div id="tenPie"></div>
      </div>
    </div> -->
    <div class="table-bottm">
      <div class="title">文章列表</div>
      <div id="article-word">
        <div class="table-tabs flex-ali-center">
          <el-button :class="isOrigin==='attitudes_count'?'isActive':''"
                     size="small"
                     @click="tabsClick('attitudes_count')">点赞最高</el-button>
          <el-button :class="isOrigin==='comments_count'?'isActive':''"
                     size="small"
                     @click="tabsClick('comments_count')">评论最高</el-button>
          <el-button :class="isOrigin==='reposts_count'?'isActive':''"
                     size="small"
                     @click="tabsClick('reposts_count')">转发最高</el-button>
        </div>
        <div class="table-box">
          <el-table :data="tableData2"
                    style="width: 100%"
                    border
                    :cell-style="{ textAlign: 'center' }"
                    :default-sort="{prop: 'date', order: 'descending'}">
            <!-- <el-table-column label="序号"
                             width="80">
              <template slot-scope='scope'>
                <div>
                  {{scope.$index+1}}
                </div>
              </template>
            </el-table-column> -->
            <el-table-column prop="status_title"
                             label="微博内容"
                             width="550">
              <template slot-scope='scope'>
                <div class="cursor click-sapn"
                     @click="openUrl(scope.row.url)">
                  {{scope.row.status_title}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="type"
                             label="内容形式"
                             width="100">
              <!-- <template slot-scope='scope'>
                <div class="cursor">
                  {{scope.row.type}}
                </div>
              </template> -->
            </el-table-column>
            <el-table-column prop="attitudes_count"
                             label="点赞量"
                             width="100">
            </el-table-column>
            <!-- <el-table-column prop="old_like_num"
                             label="点赞量"
                             width="100">
              <template slot-scope='scope'>
                <div class="cursor">
                  {{scope.row.old_like_num}}
                </div>
              </template>
            </el-table-column> -->
            <el-table-column prop="comments_count"
                             label="评论量"
                             width="100">
            </el-table-column>
            <el-table-column prop="reposts_count"
                             label="转发量"
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
  props: ['tableData2', 'userData'],
  data () {
    return {
      isOrigin: 'attitudes_count',
      dataNum: [],
      dataType: [],
      fourData: [],
      tenData: [],
      jsonObj: {
        isCommon: true
      }
    }
  },
  methods: {
    // 跳转原文
    jumpOriginal (params) {
      window.open(params, '_blank')
    },
    tabsClick (type) {
      console.log(type)
      // this.isOrigin = id
      // this.$emit('fatherMethod', id)

      this.isOrigin = type
      this.$emit('fatherMethod2', this.isOrigin)
    },
    // 柱状图
    getbarCharts () {
      if (this.dataType.length > 0) {
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
            data: this.dataType

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
              data: this.dataNum
            }
          ]
        }
        myChart.setOption(option)
        window.addEventListener('resize', function () {
          myChart.resize()
        })
      } else {
        var html = '<div><span  style="position: absolute;width:100%;top: 40%;display:block;text-align:center;color:#868686; font-size: 20px;">暂无数据</span></div>'
        document.getElementById('article-tabs').innerHTML = html
        document.getElementById('article-tabs').removeAttribute('_echarts_instance_')
      }
    },
    // 获取数据
    getArticleData (data) {
      this.jsonObj = JSON.parse(data.aricleTypeChartJson)
      // this.jsonObj.isCommon = false
      // console.log(this.jsonObj)
      if (this.jsonObj.isCommon) {
        this.jsonObj.commonData.forEach(item => {
          this.dataType.push(item.pageType)
          this.dataNum.push(item.articleCountNum)
        })
        this.getbarCharts()
      } else {
        this.fourData = this.jsonObj.procuratorial
        this.tenData = this.jsonObj.business
        this.getFourPie()
        this.getTenPie()
      }
    },
    // 四大检察
    getFourPie () {
      if (this.fourData.length > 0) {
        let fourPie = echarts.init(document.getElementById('fourPie'))
        let color = ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea']
        let label = []
        this.fourData.forEach(i => { label.push(i.name) })
        let option = {
          title: {
            text: '四大检察',
            textAlign: 'center',
            left: '52%',
            bottom: '0',
            textStyle: {
              color: '#333',
              fontSize: 18
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br>{b}: {d}%'
          },
          color: color,
          legend: {
            type: 'plain',
            icon: 'circle',
            orient: 'vertical',
            right: '10%',
            top: 'center',
            align: 'left',
            itemGap: 15,
            itemWidth: 10, // 设置宽度
            itemHeight: 10, // 设置高度
            symbolKeepAspect: false,
            data: label
          },
          series: [
            {
              name: '四大检察',
              type: 'pie',
              radius: '50%',
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  color: '#333',
                  formatter: '{d}%'
                }
              },
              data: this.fourData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 30,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        fourPie.setOption(option)
        window.addEventListener('resize', function () {
          fourPie.resize()
        })
      } else {
        var html = '<div><span  style="position: absolute;width:100%;top: 40%;display:block;text-align:center;color:#868686; font-size: 20px;">暂无数据</span></div>'
        document.getElementById('fourPie').innerHTML = html
        document.getElementById('fourPie').removeAttribute('_echarts_instance_')
      }
    },
    // 十大业务
    getTenPie () {
      if (this.tenData.length > 0) {
        let tenPie = echarts.init(document.getElementById('tenPie'))
        let color = ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea']
        let label = []
        this.tenData.forEach(i => { label.push(i.name) })
        let option = {
          title: {
            text: '十大业务',
            textAlign: 'center',
            left: '52%',
            bottom: '0',
            textStyle: {
              color: '#333',
              fontSize: 18
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br>{b}: {d}%'
          },
          color: color,
          legend: {
            type: 'plain',
            icon: 'circle',
            orient: 'vertical',
            right: '5%',
            top: 'center',
            align: 'left',
            itemGap: 15,
            itemWidth: 10, // 设置宽度
            itemHeight: 10, // 设置高度
            symbolKeepAspect: false,
            data: label
          },
          series: [
            {
              name: '十大业务',
              type: 'pie',
              radius: '50%',
              label: {
                normal: {
                  show: true,
                  color: '#333',
                  position: 'inside',
                  formatter: '{d}%'
                }
              },
              data: this.tenData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        tenPie.setOption(option)
        window.addEventListener('resize', function () {
          tenPie.resize()
        })
      } else {
        var html = '<div><span  style="position: absolute;width:100%;top: 40%;display:block;text-align:center;color:#868686; font-size: 20px;">暂无数据</span></div>'
        document.getElementById('tenPie').innerHTML = html
        document.getElementById('tenPie').removeAttribute('_echarts_instance_')
      }
    },
    // 打开全文链接
    openUrl (url) {
      window.open(url, '_black')
    },
    stateFormat (row, column, cellValue) {
      // console.log(row,column, cellValue)
      if (!cellValue) return ''
      if (cellValue.length > 10) { // 最长固定显示10个字符
        return cellValue.slice(0, 10) + '...'
      }
      return cellValue
    }
  },
  // 注销window.onresize事件
  destroyed () {
    window.onresize = null
  }

}
</script>
<style scoped>
#article-tabs,
#article-word {
  width: 1300px;
  min-height: 333px;
  box-sizing: border-box;
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
/* .pie-left,
.pie-right {
  width: 685px;
  height: 400px;
} */
#fourPie,
#tenPie {
  width: 685px;
  height: 400px;
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
