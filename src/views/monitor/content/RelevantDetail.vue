<!--
 * @Author: MaiChao
 * @Date: 2021-02-07 15:31:16
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-06-30 17:39:10
-->
<template>
  <div class="content-show article-detail flex-bwt">
    <div class="content-left">
      <div class="tabs-header  flex-ali-center">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'AccountCompany' }">新媒体监测</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'Prescription' }">内容监测</el-breadcrumb-item>
          <el-breadcrumb-item>相关监测列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- <div class="account-detail flex-arr-center">
        <div class="flex-arr-center">
          <el-image style="width: 100px; height: 100px"
                    :src="this.articleData.hd_head_img"
                    fit="cover"></el-image>
          <div class="account-name">
            <p class="user-name">{{this.articleData.nickname}}</p>
            <p class="account">公众号名称:<span>{{this.articleData.nickname}}</span></p>
            <p class="time">截止时间为:<span>{{this.articleData.last_pubtime}}</span></p>
          </div>
        </div>
        <div class="synopsis">该账号共有文章<i>{{this.articleData.articleCountNum}}</i>篇,检察类型的文章共有<i>{{this.articleData.procuratorialCountNum}}</i>篇,
          非检察类型的文章共有<i>{{this.articleData.articleNotPertinenceNum}}</i>篇，其他类型的文章共有<i>{{this.articleData.pictureNum}}</i>篇。
        </div>
      </div> -->
      <div class="line-box">
        <div class="title">折线图走势</div>
        <div id="line-charts"></div>
      </div>
      <div class="account-table">
        <div class="rel-detail-append">
          <el-input placeholder="请输入关键词" v-model="ruleForm.keyword" size='small' clearable>
             <el-button slot="append" size='small' @click="searchTable">搜索</el-button>
          </el-input>
        </div>
        <el-table :data="tableData"
                  style="width: 100%"
                  :cell-style="{ textAlign: 'center' }"
                  :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column prop="title"
                           label="标题">
            <template slot-scope="scope">
              <div v-if="scope.row.url" v-html="scope.row.title" class="click-span" @click="openUrl(scope.row)">
                <!-- {{scope.row.title}} -->
              </div>
              <div v-else v-html="scope.row.title"></div>
            </template>
          </el-table-column>
          <el-table-column prop="create_time"
                           label="发布日期" width="200">
          </el-table-column>
          <el-table-column prop="mapping_score"
                           label="涉检指数"
                           width="180">
            <template slot-scope='scope'>
              <div v-if="scope.row.mapping_score">
                {{scope.row.mapping_score}}
              </div>
              <div v-else>0</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <set-page @pagingChange="pagingChange"
                  :total="total"></set-page>
    </div>
    <div class="content-right">
      <div id="pie-charts"></div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      total: 0,
      articleData: {},
      ruleForm: {
        publishTime: [],
        keyword: '',
        pageSize: 10,
        pageNum: 1,
        typeLevel: '',
        bizList: []
      },
      tableData: []
    }
  },
  mounted () {
    this.drawLine()
    this.pieCharts()
    this.searchTable()
  },
  created () {
    this.ruleForm.typeLevel = this.$route.query.level
    this.ruleForm.publishTime = this.$route.query.publishTime
    this.ruleForm.bizList[0] = this.$route.query.id
  },
  methods: {
    // 打开全文链接
    openUrl (item) {
      window.open(item.url, '_black')
    },
    // 分页
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
      this.searchTable()
    },
    // 获取表格信息
    searchTable () {
      this.$http.post(this.$api.articleList, this.ruleForm)
        .then(res => {
          this.tableData = res.data.data.list
          this.total = parseInt(res.data.data.count)
        }).catch(() => { })
    },
    // 获取账户信息
    pieCharts () {
      let myChart = echarts.init(document.getElementById('pie-charts'))
      let params = {
        keyword: this.ruleForm.keyword,
        bizList: this.ruleForm.bizList
      }
      this.$http.post(this.$api.articleDetail, params)
        .then(res => {
          this.articleData = res.data.data.data[0]
          let option = {
            tooltip: {
              trigger: 'item',
              formatter: '{a}<br/>{b}:{c}篇'
            },
            title: {
              text: '涉检占比图',
              left: 'center',
              top: 40,
              textStyle: {
                color: '#151C29',
                fontSize: 18
              }
            },
            series: [{
              name: '文章总数',
              type: 'pie',
              radius: ['0%', '10%'],
              center: ['50%', '50%'],
              startAngle: 180,
              hoverAnimation: true,
              label: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: this.articleData.articleCountNum,
                name: '文章总数',
                label: {
                  show: false
                }
              }]
            }, {
              name: '涉检占比图',
              type: 'pie',
              radius: [37, 170],
              avoidLabelOverlap: false,
              startAngle: 0,
              center: ['50%', '50%'],
              roseType: 'area',
              selectedMode: 'single',
              label: {
                normal: {
                  show: true,
                  formatter: '{d}%',
                  position: 'inside',
                  color: '#151C29',
                  fontSize: 14
                }

              },
              data: [
                {
                  value: 0,
                  name: '',
                  label: {
                    normal: {
                      show: false
                    }
                  }
                },
                {
                  value: 0,
                  name: '',
                  label: {
                    normal: {
                      show: false
                    }
                  }
                },
                {
                  value: 0,
                  name: '',
                  label: {
                    normal: {
                      show: false
                    }
                  }
                },
                {
                  value: this.articleData.pictureNum,
                  // value: 30,
                  name: '其他',
                  itemStyle: {
                    normal: {
                      color: '#64B267'
                    }
                  }
                },
                {
                  value: this.articleData.procuratorialCountNum,
                  // value: 50,
                  name: '涉检类',
                  itemStyle: {
                    normal: {
                      color: '#F0BA34'
                    }
                  }
                },
                {
                  value: this.articleData.articleNotPertinenceNum,
                  // value: 40,
                  name: '非涉检',
                  itemStyle: {
                    norma: {
                      color: '#BAC23B'
                    }
                  }
                }
              ]
            }]
          }
          myChart.setOption(option)
          window.addEventListener('resize', function () {
            myChart.resize()
          })
        }).catch(() => { })
    },
    // 折线图
    drawLine () {
      let myChart = echarts.init(document.getElementById('line-charts'))
      let colorList = ['#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']
      let time = []
      let articleCountNum = []
      let procuratorialNum = []
      let notProcuratorialList = [] // 非涉检
      let pictureList = [] // 其他
      this.$http.post(this.$api.linePertinence, this.ruleForm)
        .then(res => {
          res.data.data.forEach(item => {
            time.push(item.time)
            articleCountNum.push(item.articleCountNum) // 文章总数
            procuratorialNum.push(item.procuratorialNum) // 涉检
            notProcuratorialList.push(item.procuratorialNum) // 非涉检
            pictureList.push(item.picturelNum) // 其他
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
                left: '8%',
                right: '0'
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
              },
              {
                name: '非涉检文章总数',
                type: 'line',
                data: notProcuratorialList,
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
                  shadowColor: 'rgba(190,166,200, 0.3)',
                  shadowBlur: 10,
                  shadowOffsetY: 20
                },
                itemStyle: {
                  normal: {
                    color: colorList[1],
                    borderColor: colorList[1]
                  }
                }
              },
              {
                name: '其他文章',
                type: 'line',
                data: pictureList,
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
                  shadowColor: 'rgba(300,135,255, 0.3)',
                  shadowBlur: 10,
                  shadowOffsetY: 20
                },
                itemStyle: {
                  normal: {
                    color: colorList[3],
                    borderColor: colorList[3]
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
    }
  }
}
</script>
<style>
@import '../monitor.css';
</style>
<style  scoped>
.line-box{
  width: 100%;
  /* height: 100%; */
  margin-bottom: 50px;
  height: 350px;
  /* margin-left: */
}
#line-charts {
  width: 95%;
  height: 400px;
  /* padding: 0 20px 20px 20px; */
}
.title {
  font-size: 16px;
  margin-left: 15px;
  margin-top: 20px;
}
.content-show {
  max-width: 1400px;
  margin: 28px auto;
  padding-bottom: 50px;
  box-sizing: border-box;
  min-height: 950px;
}
.content-left {
  width: 1010px;
  background-color: #fff;
}
.content-right {
  width: 360px;
  background-color: #fff;
  height: 950px;
}
.tabs-header {
  padding: 0 20px;
  height: 50px;
  line-height: 50px;
  background-color: #f7f8fa;
}
.account-detail {
  width: 100%;
  height: 216px;
  background-color: #fff;
  padding: 0 42px;
  box-sizing: border-box;
}
.account-table {
  padding: 15px;
}
.el-image {
  border-radius: 50%;
  margin-right: 35px;
}
.user-name {
  font-size: 18px;
  color: #151c29;
  line-height: 24px;
}
.account,
.time {
  font-size: 14px;
  color: #707277;
  line-height: 24px;
}
.synopsis {
  width: 380px;
  font-size: 14px;
  color: #151c29;
  line-height: 24px;

  font-family: Microsoft YaHei;
}
.synopsis i {
  font-style: normal;
  font-size: 30px;
  color: #151c29;
}
.el-input-group{
  width: 208px;
  float: right;
  margin-bottom: 20px;
}
#pie-charts{
  height: 100%;
}
.click-span{
  text-decoration: underline;
  color: #409eff;
  cursor: pointer;
}
</style>
