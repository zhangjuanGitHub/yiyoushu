<!--
 * @Author: MaiChao
 * @Date: 2021-03-12 14:10:32
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-17 14:48:48
-->
<template>
  <div class="detail content-show">
    <div class="tabs-header flex-ali-center">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'AccountCompany' }">新媒体监测</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'Minutearticle' }">分钟级监测</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name:'Minutelist'}">监测列表</el-breadcrumb-item>
        <el-breadcrumb-item>查看详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="detail-content">
      <div class="relation flex-ali-center">
        <div class="left-data flex-ali-center">
          <div class="header-img flex-ali-center">
            <img :src="require('@/assets/images/home/ava.png')">
          </div>
          <div class="data-name">
            <p class="name">京检在线</p>
            <p class="detail">jingjianzaixian</p>
          </div>
        </div>
        <div class="right-data flex-ali-center">
          <div class="header-img flex-ali-center">
            <img :src="require('@/assets/images/home/ava.png')">
          </div>
          <div class="flex-ali-center">
            <div class="lable-box">次条</div>
            <div>河北 邢台南宫市内5地升为中风险地区</div>
            <div class="click-span">粉丝留言 ></div>
          </div>
        </div>
      </div>
      <div class="all-trend">
        <div class="title-box flex-ali-center">
          <div class="title">整体趋势图</div>
          <div class="tabs-button">
            <span @click="tabsTrend('yuedu')"
                  :class="isTrend==='yuedu'?'isActive':''">阅读数</span>
            <span @click="tabsTrend('dianzan')"
                  :class="isTrend==='dianzan'?'isActive':''">点赞数</span>
            <span @click="tabsTrend('zaikan')"
                  :class="isTrend==='zaikan'?'isActive':''">在看数</span>
          </div>
        </div>
        <div id="line-charts"></div>
      </div>
      <div class="data-table">
        <div class="title">数据详情</div>
        <div class="interaction-table">
          <el-table :data="tableData"
                    style="width: 100%"
                    border
                    :cell-style="{ textAlign: 'center' }">
            <el-table-column prop="address"
                             label="时间">
            </el-table-column>
            <el-table-column prop="sumReadNum"
                             width="190"
                             label="总阅读量">
            </el-table-column>
            <el-table-column prop="sumPointNum"
                             label="阅读增量"
                             width="190">
            </el-table-column>
            <el-table-column prop="influenceNum"
                             label="总点赞"
                             width="190">
            </el-table-column>
            <el-table-column prop="livenessNum"
                             width="190"
                             label="点赞数增量">
            </el-table-column>
            <el-table-column prop="sumOldLikeNum"
                             label="总在看数"
                             width="190">
            </el-table-column>
            <el-table-column prop="sumOldLikeNum"
                             label="在看数增量"
                             width="190">
            </el-table-column>
          </el-table>
        </div>
        <set-page @pagingChange="pagingChange"
                  :total="total"
                  ref="child"></set-page>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      total: 0,
      isTrend: 'yuedu',
      tableData: [],
      pageSort: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  mounted () {
    this.lineCharts()
  },
  methods: {
    // 分页
    pagingChange (query) {
      this.pageSort.pageSize = query.size
      this.pageSort.pageNum = query.page
      this.getTableList()
    },
    getTableList () { },
    // 趋势渠道切换
    tabsTrend (tabs) {
      this.isTrend = tabs
    },
    lineCharts () {
      let myChart = echarts.init(document.getElementById('line-charts'))
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
          top: '20%',
          left: '5%',
          right: '5%',
          bottom: '5%'
          // containLabel: true
        },
        legend: {
          x: '85%',
          top: '5%',
          textStyle: {
            color: '#90979c'
          },
          data: ['第2条']
        },
        xAxis: [{
          type: 'category',
          axisLine: {
            show: true
          },
          splitArea: {
            // show: true,
            color: '#aaa',
            lineStyle: {
              color: '#f00'
            }
          },
          axisLabel: {
            show: false,
            color: '#aaa'
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          boundaryGap: false,
          data: ['A', 'B', 'C', 'D', 'E', 'F']

        }],
        yAxis: [{
          type: 'value',
          min: 0,
          // max: 140,
          splitNumber: 4,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            margin: 20,
            textStyle: {
              color: '#aaa'

            }
          },
          axisTick: {
            show: false
          }
        }],
        series: [
          {
            name: '第2条',
            type: 'line',
            // smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            symbolSize: 25,
            lineStyle: {
              normal: {
                color: '#00ca95',
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5
              }
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#00ca95'
              }
            },

            itemStyle: {
              color: '#00ca95',
              borderColor: '#fff',
              borderWidth: 3,
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2
            },
            tooltip: {
              show: false
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0,202,149,0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(0,202,149,0)'
                }
                ], false),
                shadowColor: 'rgba(0,202,149, 0.9)',
                shadowBlur: 20
              }
            },
            data: [281, 398, 214, 179, 289, 356]
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  },
  components: {
  }
}
</script>s
<style>
@import '../monitor.css';
</style>
<style scoped>
.detail-content {
  background-color: #fff;
  padding: 40px 20px;
}
.content-show {
  max-width: 1400px;
  margin: 28px auto;
}
.header-img {
  height: 58px;
  margin-right: 20px;
}
.right-data .header-img {
  border: 1px solid #707277;
  width: 100px;
  height: 58px;
  align-items: center;
}
.right-data .header-img img {
  height: 58px;
  display: block;
  margin: 0 auto;
}
.left-data {
  width: 300px;
}
.data-name .name {
  font-size: 16px;
  color: #252934;
}
.data-name .detail {
  font-size: 14px;
  color: #707277;
}
.lable-box {
  color: #f79406;
  font-size: 12px;
  border: 1px solid #f79406;
  margin-right: 10px;
}
.click-span {
  color: #3b81fe;
  margin-left: 25px;
}
.all-trend {
  padding: 60px 0;
}
.title {
  margin-right: 65px;
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
.tabs-button span {
  font-size: 14px;
  border: 1px solid #e1e4e8;
  padding: 5px 20px;
  cursor: pointer;
  font-weight: bold;
}
.tabs-button span:hover,.tabs-button span.isActive {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
#line-charts {
  width: 100%;
  height: 495px;
  margin-top: 20px;
}
</style>
