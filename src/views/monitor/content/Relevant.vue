<!--
 * @Author: MaiChao
 * @Date: 2021-02-07 15:31:16
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-06-01 14:12:56
 * 其他文章数量改为非涉检文章数量
-->
<template>
  <div class="relevant content-box">
    <div class="tabs-header">
      <!-- <span class="tabs-title"
            @click="tabsAll('Relevant')"
            :class="this.$route.name==='Relevant'?'isActive':''">微信</span>
      <span class="tabs-title"
            @click="tabsAll('')">微博</span> -->

            <span class="tabs-title"
              @click="tabsAll('wx', 1)"
              :class="this.activeTab==='wx'?'isActive':''">微信</span>
        <span class="tabs-title"
              @click="tabsAll('wb', 2)"
              :class="this.activeTab==='wb'?'isActive':''">微博</span>
    </div>
    <div>
      <relevant-wx v-if="this.activeTab==='wx'"
                     @changeTab="tabsAll"></relevant-wx>
        <relevant-wb v-if="this.activeTab==='wb'"></relevant-wb>
    </div>
  </div>
</template>
<script>
// import vSearch from '@/views/monitor/components/RealSearch'
// eslint-disable-next-line import/no-duplicates
import relevantWx from './RelevantWx'
import relevantWb from './RelevantWb'
import echarts from 'echarts'
export default {
  components: {
    relevantWx,
    relevantWb
  },
  data () {
    return {
      // total: 0,
      activeTab: 'wx',
      ruleForm: {
        publishTime: [],
        keyword: '',
        pageSize: 10,
        pageNum: 1,
        bizList: []

      },
      tableData: []
    }
  },
  created () {
    // const end = new Date()
    // const start = new Date()
    // start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    // this.ruleForm.publishTime[0] = this.formatDate(start)
    // this.ruleForm.publishTime[1] = this.formatDate(end)
    if (this.$route.query.tab) {
      this.activeTab = this.$route.query.tab
    }
  },
  methods: {
    formatDate (now) {
      var year = now.getFullYear() + '-'
      var month = (now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1) + '-'
      var d = (now.getDate() < 10 ? '0' + now.getDate() : now.getDate())
      return year + month + d
    },
    // 分页
    // pagingChange (query) {
    //   this.ruleForm.pageSize = query.size
    //   this.ruleForm.pageNum = query.page
    //   this.getTableData()
    //   this.drawLine()
    // },
    // 获取表格信息
    getTableData () {
      this.$http.post(this.$api.articlePertinence, this.ruleForm)
        .then(res => {
          this.tableData = res.data.data.data
          // this.total = parseInt(res.data.data.count)
        }).catch(() => { })
    },
    searchList () {
      this.ruleForm.bizList = []
      this.getTableData()
      this.drawLine()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      // this.ruleForm.pageSize = 10
      this.ruleForm.bizList = []
      this.getTableData()
      this.drawLine()
    },
    tabsCharts (row) {
      this.ruleForm.bizList = []
      this.ruleForm.bizList.push(row.biz)
      this.drawLine()
    },
    // 折线图
    drawLine () {
      let myChart = echarts.init(document.getElementById('line-charts'))
      let colorList = ['#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']
      let time = []
      let articleCountNum = []
      let procuratorialNum = []
      this.$http.post(this.$api.linePertinence, this.ruleForm)
        .then(res => {
          res.data.data.forEach(item => {
            time.push(item.time)
            articleCountNum.push(item.articleCountNum)
            procuratorialNum.push(item.procuratorialNum)
            let option = {
              backgroundColor: '#fff',
              title: {
                // text: '全国6月销售统计',
                textStyle: {
                  fontSize: 12,
                  fontWeight: 400
                },
                left: 'center',
                top: '5%'
              },
              legend: {
                icon: 'circle',
                top: '5%',
                right: '5%',
                itemWidth: 6,
                itemGap: 20,
                textStyle: {
                  color: '#556677'
                }
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  label: {
                    show: true,
                    backgroundColor: '#fff',
                    color: '#556677',
                    borderColor: 'rgba(0,0,0,0)',
                    shadowColor: 'rgba(0,0,0,0)',
                    shadowOffsetY: 0
                  },
                  lineStyle: {
                    width: 0
                  }
                },
                backgroundColor: '#fff',
                textStyle: {
                  color: '#5c6c7c'
                },
                padding: [10, 10],
                extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
              },
              grid: {
                top: '15%',
                left: '3%',
                right: '3%'
              },
              xAxis: [{
                type: 'category',
                data: time,
                axisLine: {
                  lineStyle: {
                    color: '#DCE2E8'
                  }
                },
                axisTick: {
                  show: false
                },
                axisLabel: {// X轴文字
                  interval: time.length === 7 ? 0 : 3,
                  showMinLabel: true,
                  showMaxLabel: true,
                  show: true,
                  textStyle: {
                    color: '#556677'
                  },
                  fontSize: 12,
                  margin: 15
                },
                // axisLabel: {
                //   interval: 0,
                //   textStyle: {
                //     color: '#556677'
                //   },
                //   // 默认x轴字体大小
                //   fontSize: 12,
                //   // margin:文字到x轴的距离
                //   margin: 15
                // },
                axisPointer: {
                  label: {
                    // padding: [11, 5, 7],
                    padding: [0, 0, 10, 0],
                    /*
              除了padding[0]建议必须是0之外，其他三项可随意设置

              和CSSpadding相同，[上，右，下，左]

              如果需要下边线超出文字，设左右padding即可，注：左右padding最好相同

              padding[2]的10:

              10 = 文字距下边线的距离 + 下边线的宽度

              如：UI图中文字距下边线距离为7 下边线宽度为2

              则padding: [0, 0, 9, 0]

                */
                    // 这里的margin和axisLabel的margin要一致!
                    margin: 15,
                    // 移入时的字体大小
                    fontSize: 12,
                    backgroundColor: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0,
                        color: '#fff' // 0% 处的颜色
                      }, {
                        // offset: 0.9,
                        offset: 0.86,
                        /*
                  0.86 = （文字 + 文字距下边线的距离）/（文字 + 文字距下边线的距离 + 下边线的宽度）
                        */
                        color: '#fff' // 0% 处的颜色
                      }, {
                        offset: 0.86,
                        color: '#33c0cd' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: '#33c0cd' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    }
                  }
                },
                boundaryGap: false
              }],
              yAxis: [{
                type: 'value',
                minInterval: 1,
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#DCE2E8'
                  }
                },
                axisLabel: {
                  textStyle: {
                    color: '#556677'
                  }
                },
                splitLine: {
                  show: false
                }
              }],
              series: [{
                name: '文章总数',
                type: 'line',
                data: articleCountNum,
                symbolSize: 1,
                symbol: 'circle',
                smooth: true,
                yAxisIndex: 0,
                showSymbol: false,
                lineStyle: {
                  width: 5,
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
                },
                itemStyle: {
                  normal: {
                    color: colorList[0],
                    borderColor: colorList[0]
                  }
                }
              },
              // {
              //   name: '其他文章数',
              //   type: 'line',
              //   data: picturelNum,
              //   symbolSize: 1,
              //   yAxisIndex: 0,
              //   symbol: 'circle',
              //   smooth: true,
              //   showSymbol: false,
              //   lineStyle: {
              //     width: 5,
              //     color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
              //       offset: 0,
              //       color: '#d3f9f5'
              //     },
              //     {
              //       offset: 1,
              //       color: '#17ecd5'
              //     }
              //     ]),
              //     shadowColor: 'rgba(23,236,813, 0.3)',
              //     shadowBlur: 10,
              //     shadowOffsetY: 20
              //   },
              //   itemStyle: {
              //     normal: {
              //       color: colorList[2],
              //       borderColor: colorList[2]
              //     }
              //   }
              // },
              {
                name: '涉检文章数',
                type: 'line',
                data: procuratorialNum,
                symbolSize: 1,
                yAxisIndex: 0,
                symbol: 'circle',
                smooth: true,
                showSymbol: false,
                lineStyle: {
                  width: 5,
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#fe9a'
                  },
                  {
                    offset: 1,
                    color: '#fe9a8b'
                  }
                  ]),
                  shadowColor: 'rgba(254,154,139, 0.3)',
                  shadowBlur: 10,
                  shadowOffsetY: 20
                },
                itemStyle: {
                  normal: {
                    color: colorList[2],
                    borderColor: colorList[2]
                  }
                }
              }
              ]
            }
            myChart.setOption(option)
            window.addEventListener('resize', function () {
              myChart.resize()
            })
          })
        }).catch(() => { })
    },
    // 跳转详情页面
    openInvolved (row, level) {
      let route = this.$router.resolve({ name: 'RelevantDetail', query: { id: row.biz, level: level, publishTime: this.ruleForm.publishTime } })
      window.open(route.href, '_blank')
    },
    tabsAll (name) {
      // this.$router.push({ name: name })
      this.$router.replace({ name: 'Relevant', query: { tab: name } })
      this.activeTab = name
    }
  },
  mounted () {
    // this.drawLine()
    // this.getTableData()
  }
}
</script>
<style>
@import '../monitor.css';
</style>
<style lang="scss" scoped>
.wx-warp-box {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 20px 30px;
}
.wx-warp-content {
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
}
#line-charts {
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  height: 300px;
}
.account-infor img {
  height: 60px;
  width: 60px;
  margin-right: 20px;
}
.picture-num i {
  margin-left: 5px;
}
.relevant-table {
  width: 1100px;
  margin: 0 auto;
  padding-bottom: 20px;
  box-sizing: border-box;
}
.import-name {
  text-align: left;
}
</style>
