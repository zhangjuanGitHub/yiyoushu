<!--
 * @Author: MaiChao
 * @Date: 2021-02-07 15:31:16
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-06-29 14:35:38
-->
<template>
  <div class="content-show article-detail">
    <div class="tabs-header flex-ali-center">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'AccountCompany' }">新媒体监测</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'Realtime' }">数据智能中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'Realtime' }">文章传播计算</el-breadcrumb-item>
        <el-breadcrumb-item>微信传播力分析</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="realtime-detail">
      <div class="realtime-top flex-bwt-center">
        <div class="article-box">
          <div class="title"
               v-html="articleDetail.title"></div>
          <div class="information flex-ali-center">
          </div>
          <div class="article-cont"
               v-html="articleDetail.content">
          </div>
          <div class="bottom-btn cursor" v-if="articleDetail.url"
               @click="openUrl(articleDetail.url)">展示全文<i class="el-icon-arrow-down"></i></div>
        </div>
        <div class="relation-box">
          <div class="tabs-header">
            <span class="tabs-title">文章发布位置统计图</span>
          </div>
          <div id="relation-charts"></div>
        </div>
      </div>
      <div class="realtime-center">
        <div class="tabs-header">
          <span class="tabs-title">文章被公众号转载统计图</span>
        </div>
        <div id="bar-charts" :style="autoHeight"></div>
      </div>
      <div class="realtime-top flex-bwt-center">
        <div class="read-article-box">
          <div class="tabs-header">
            <span class="tabs-title">总阅读数走势分析</span>
          </div>
          <div id="read-line-charts"></div>
        </div>
        <div class="relation-box">
          <div class="tabs-header">
            <span class="tabs-title">点赞数和在看数走势分析</span>
          </div>
          <div id="line-charts"></div>
        </div>
      </div>
      <div class="realtime-center">
        <div class="tabs-header">
          <span class="tabs-title">文章被各类型公众号转载分析</span>
        </div>
        <div id="bar-box"></div>
      </div>
      <div class="realtime-top flex-bwt-center">
        <div class="article-box">
          <div class="tabs-header">
            <span class="tabs-title">文章被各地区公众号转载分析</span>
          </div>
          <div id="map-box"></div>
        </div>
        <div class="relation-box">
          <div class="tabs-header">
            <span class="tabs-title">文章在不同地区传播的行为数据分析图</span>
          </div>
          <div id="relation-bar"></div>
        </div>
      </div>
      <div class="realtime-bottom">
        <div class="bottom-list">
          <div class="tabs-header">
            <span class="tabs-title">文章源头（疑似）</span>
          </div>
        </div>
        <div class="list-content">
          <div class="list-box">
            <div class="flex-ali-center list-top">
              <div class="left-img flex-arr-center">
                <img :src="articleSource.cover" alt="">
              </div>
              <div class="right">
                <div class="right-top flex-bwt-center">
                  <div class="right-title title cursor"
                       v-html="articleSource.title"
                       @click="openUrl(articleSource.url)"></div>
                  <div class="right-time">数据更新时间:{{articleSource.lastPubtime}}</div>
                </div>
                <div class="right-bottom cursor lin-clamp-3"
                     v-html="articleSource.content"
                     @click="openUrl(articleSource.url)"></div>
              </div>
            </div>
            <div class="flex-bwt-center list-bottom-source">
              <div class="left-time">
                <span>{{articleSource.lastPubtime}}</span>
                <span>{{articleSource.author}}</span>
                <span>文章位置:{{articleSource.idx}}</span>
                <span>昵称:<i @click="routerMaterial(articleSource)"
                     class="click-sapn cursor">{{articleSource.nickname}}</i></span>
              </div>
              <div class="right-infor">
                <el-tooltip class="item"
                            effect="dark"
                            content="阅读数"
                            placement="top">
                  <span><i class="el-icon-view"></i>{{articleSource.readNum}}</span>
                </el-tooltip>
                <el-tooltip class="item"
                            effect="dark"
                            content="点赞数"
                            placement="top">
                  <span><i class="el-icon-star-off"></i>{{articleSource.oldLikeNum}}</span>
                </el-tooltip>
                <el-tooltip class="item"
                            effect="dark"
                            content="在看数"
                            placement="top">
                  <span><i class="el-icon-help"></i>{{articleSource.likeNum}}</span>
                </el-tooltip>
                <el-tooltip class="item"
                            effect="dark"
                            content="相似度"
                            placement="top">
                  <span class="click-sapn cursor"
                        @click="routeSim(articleSource)"><i class="el-icon-connection"></i>{{articleSource.simScore}}</span>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="realtime-bottom">
        <div class="bottom-list">
          <div class="tabs-header">
            <span class="tabs-title">转载明细列表</span>
          </div>
        </div>
        <div class="list-content">
          <div class="list-box"
               v-for="item in articleList"
               :key="item.id">
            <div class="flex-ali-center list-top">
              <div class="left-img flex-arr-center">
                <img :src="item.cover"
                     alt="">
              </div>
              <div class="right">
                <div class="right-top flex-bwt-center">
                  <div class="right-title title cursor"
                       v-html="item.title"
                       @click="openUrl(item.url)"></div>
                  <div class="right-time">数据更新时间:{{item.lastPubtime}}</div>
                </div>
                <div class="right-bottom cursor lin-clamp-3"
                     v-html="item.content"
                     @click="openUrl(item.url)"></div>
              </div>
            </div>
            <div class="flex-bwt-center list-bottom">
              <div class="left-time">
                <span>{{item.lastPubtime}}</span>
                <span>{{item.author}}</span>
                <span>文章位置:{{item.idx}}</span>
                <span>昵称:<i @click="routerMaterial(item)"
                     class="click-sapn cursor">{{item.nickname}}</i></span>
              </div>
              <div class="right-infor">
                <el-tooltip class="item"
                            effect="dark"
                            content="阅读数"
                            placement="top">
                    <span><i class="el-icon-view"></i>{{item.readNum}}</span>
                </el-tooltip>
                <el-tooltip class="item"
                            effect="dark"
                            content="点赞数"
                            placement="top">
                    <span><i class="el-icon-star-off"></i>{{item.oldLikeNum}}</span>
                </el-tooltip>
                <el-tooltip class="item"
                            effect="dark"
                            content="在看数"
                            placement="top">
                   <span><i class="el-icon-help"></i>{{item.likeNum}}</span>
                </el-tooltip>
                <el-tooltip class="item"
                            effect="dark"
                            content="相似度"
                            placement="top">
                  <span class="click-sapn cursor"
                        @click="routeSim(item)"><i class="el-icon-connection"></i>{{item.simScore}}</span>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
        <set-page @pagingChange="pagingChange"
                  :total="total"></set-page>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china)
export default {
  data () {
    return {
      id: '',
      total: 0,
      allArr: [],
      dataArr: [],
      autoHeight: '',
      articleDetail: {},
      articleSource: {}, // 文章源头（疑似）
      articleList: [],
      charsData: {
        nodes: [],
        links: []
      },
      ruleForm: {
        id: '',
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getListData()
    this.getData()
    this.getArticle()
  },
  methods: {
    // 获取文章信息
    getArticle () {
      this.$http.post(this.$api.findArticleById, this.ruleForm)
        .then(res => {
          this.articleDetail = res.data.data
        }).catch(() => { })
    },
    // 获取相似文章列表
    getListData () {
      this.ruleForm.id = this.id
      this.$http.post(this.$api.findSimilarity, this.ruleForm)
        .then(res => {
          this.articleList = res.data.data.list
          this.articleSource = res.data.data.oneArticle
          this.total = res.data.data.totalElements
        }).catch(() => { })
    },
    // 分页
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
      this.getListData()
    },
    // 获取关系图数据
    getData () {
      this.$http.post(this.$api.findSimilarityChart, this.ruleForm)
        .then(res => {
          let [erArr, sanArr] = [[], []]
          var items = this.unique(res.data.data.list)
          // 点
          items.forEach((el, ind) => {
            if (ind === 0) {
              el.label = {
                normal: {
                  show: true,
                  position: 'bottom',
                  borderWidth: 1,
                  borderRadius: 12,
                  padding: [4, 8, 4, 8],
                  distance: 10,
                  color: 'rgb(255,255,255)',
                  borderColor: 'rgb(89,197,238)'
                }
              }
            } else {
              if (ind < items.length / 4 || ind > items.length / 4 * 3) {
                el.label = {
                  normal: {
                    show: true,
                    position: 'top',
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: [4, 8, 4, 8],
                    distance: 10,
                    color: 'rgb(255,255,255)',
                    borderColor: 'rgb(89,197,238)'
                  }
                }
              } else if (ind > items.length / 4 || ind < items.length / 4 * 3) {
                el.label = {
                  normal: {
                    show: true,
                    position: 'bottom',
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: [4, 8, 4, 8],
                    distance: 10,
                    color: 'rgb(255,255,255)',
                    borderColor: 'rgb(89,197,238)'
                  }
                }
              }
            }

            erArr.push(el)
          })
          erArr = this.group(erArr, 50)
          sanArr = this.group(sanArr, 50)
          this.allArr = [...erArr, ...sanArr]
          // 线坐标和配置
          this.dataArr = this.linesConfig(this.allArr)
          this.allArr[0].value = [0, 0]
          this.dataArr[0][1].coord = [0, 0]
          this.getArticleData()
        }).catch(() => { })
    },
    // 关系图
    getArticleData () {
      let myChart = echarts.init(document.getElementById('bar-charts'))
      var option = {
        backgroundColor: '#000',
        tooltip: {
          trigger: ''
        },
        xAxis: {
          show: false,
          type: 'value',
          max: 50,
          min: -51
        },
        grid: {
          top: 100,
          bottom: 100,
          left: 130,
          right: 130
        },
        yAxis: {
          show: false,
          type: 'value',
          max: 50,
          min: -50
        },
        series: [{
          type: 'graph',
          coordinateSystem: 'cartesian2d',
          z: 3,
          itemStyle: {
            normal: {
              color: '#03ccbb',
              shadowColor: 'none'
            }
          },
          data: this.allArr
        },
        {
          name: '',
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          polyline: true,
          z: 1,
          lineStyle: {
            width: 2,
            color: '#fff',
            curveness: 0
          },
          effect: {
            show: true,
            smooth: false,
            trailLength: 0, // 拖尾的长度
            symbol: 'pin' // 动画的类型
          },
          data: this.dataArr
        }]
      }
      myChart.on('click', function (params) {
        window.open(params.data.url, '_blank')
      })
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    // 柱状图
    getBarData () {
      let myChart = echarts.init(document.getElementById('relation-charts'))
      this.$http.post(this.$api.barChart, this.ruleForm)
        .then(res => {
          let barList = []
          let barData = res.data.data.numList
          res.data.data.idxList.forEach(item => {
            item = item === '1' ? '头条' : item === '2' ? '次条' : item === '3' ? '第三条' : item === '4' ? '第四条' : item === '5' ? '第五条' : item === '6' ? '第六条' : item === '7' ? '第七条' : item === '8' ? '第八条' : ''
            barList.push(item)
          })
          let option = {
            backgroundColor: '#ffffff',
            tooltip: {
              show: true
            },
            xAxis: [{
              type: 'category',
              data: barList,
              axisLabel: {
                show: true,
                margin: 10,
                color: '#a4a4a4'
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: 'rgba(107,107,107,0.37)'
                }
              },
              axisTick: {
                show: false
              }
            }],
            yAxis: [{
              minInterval: 1,
              axisLabel: {
                color: '#a4a4a4'
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: '#ECECEC',
                  type: 'dashed'
                }
              }
            }],
            series: [{
              type: 'bar',
              data: barData,
              barWidth: '30px',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(102,159,239,1)'
                  }, {
                    offset: 1,
                    color: 'rgba(170,202,246,1)'
                  }], false)
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'top'

                }
              }
            }]
          }
          myChart.on('click', (params) => {
            let idx = ''
            switch (params.name) {
              case '头条':
                idx = 1
                break
              case '次条':
                idx = 2
                break
              case '第三条':
                idx = 3
                break
              case '第四条':
                idx = 4
                break
              case '第五条':
                idx = 5
                break
              case '第六条':
                idx = 6
                break
              case '第七条':
                idx = 7
                break
              case '第八条':
                idx = 8
                break
              default:
                break
            }
            let rout = this.$router.resolve({ name: 'DrillDetails', query: { id: this.id, idx: idx }})
            window.open(rout.href, '_blank')
          })
          myChart.setOption(option)
          window.addEventListener('resize', function () {
            myChart.resize()
          })
        }).catch(() => { })
    },
    // 堆积柱状图
    getRelation () {
      let myChart = echarts.init(document.getElementById('relation-bar'))
      this.$http.post(this.$api.findByHistogramChart, this.ruleForm)
        .then(res => {
          let option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            color: [
              '#516b91',
              '#59c4e6',
              '#a5e7f0'
            ],
            legend: {
              data: ['在看数', '点赞量', '阅读量'],
              right: 10,
              top: 20
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: res.data.data.provinceList,
              axisLabel: { interval: 0 }
            }],
            yAxis: [
              {
                type: 'value',
                minInterval: 1,
                axisLabel: {
                  show: true,
                  interval: 'auto',
                  formatter: '{value}'
                },
                show: true
              }
            ],
            series: [
              {
                name: '阅读量',
                type: 'bar',
                stack: '分析',
                barWidth: 20,
                data: res.data.data.readNumList
              }, {
                name: '在看数',
                type: 'bar',
                stack: '分析',
                barWidth: 20,
                data: res.data.data.likeNumList
              }, {
                name: '点赞量',
                type: 'bar',
                stack: '分析',
                barWidth: 20,
                data: res.data.data.oldlikeNumList
              }

            ]
          }
          myChart.on('click', (params) => {
            let rout = this.$router.resolve({ name: 'DrillDetails', query: { id: this.id, province: params.name }})
            window.open(rout.href, '_blank')
          })
          myChart.setOption(option)
          window.addEventListener('resize', function () {
            myChart.resize()
          })
        })
        .catch(() => { })
    },
    // 点赞在看分析折线图
    getLine () {
      let myChart = echarts.init(document.getElementById('line-charts'))
      var colors = [
        ['#ff2400', '#e47833'],
        ['#ff00ff', '#ff00ff'],
        ['#d9d919', '#d9d919'],
        ['#00cc99', '#66ff66'],
        ['#0066ff', '#0099ff'],
        ['#db2365', '#fa676c']
      ]
      this.$http.post(this.$api.findByReprintChart, this.ruleForm)
        .then(res => {
          let option = {
            toolbox: {
              show: true,
              feature: {
                magicType: {
                  show: true,
                  type: ['line', 'bar']
                }
              }
            },
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              left: '5%',
              top: '8%',
              right: '5%',
              bottom: '15%'
            },
            legend: {
              show: true,
              icon: 'circle',
              orient: 'horizontal',
              top: '90.5%',
              right: 'center',
              itemWidth: 16.5,
              itemHeight: 6,
              textStyle: {
                color: '#C9C8CD',
                fontSize: 14
              }
            },
            xAxis: [{
              type: 'category',
              data: res.data.data.timeList,
              axisLabel: {
                show: true,
                fontSize: 9,
                textStyle: {
                  color: '#C9C8CD' // X轴文字颜色
                },
                formatter: function (value) {
                  var str = ''
                  str += value.substring(5, 10)
                  return str
                }
              },
              axisLine: {
                show: true // 不显示x轴
              },
              axisTick: {
                show: false // 不显示刻度
              },
              boundaryGap: false,
              splitLine: {
                show: true,
                width: 0.08,
                lineStyle: {
                  type: 'dotted',
                  color: '#03202E'
                }
              },
              axisPointer: { // 轴指示器
                type: 'shadow',
                z: 1,
                shadowStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0,
                      color: 'rgba(18,155,249,0)' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: 'rgba(18,155,249,1)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  },
                  shadowColor: 'rgba(0, 0, 0, 0.2)',
                  shadowBlur: 5
                }
              }

            }],
            yAxis: [{
              type: 'value',
              minInterval: 1,
              scale: true, // 坐标轴起点不限制0
              axisLabel: {
                show: true,
                textStyle: {
                  fontSize: 9,
                  color: '#C9C8CD' // X轴文字颜色
                }
              },
              splitLine: {
                show: false

              },
              axisTick: {
                show: false // 不显示刻度
              },
              axisLine: {
                show: false
              },
              nameTextStyle: {
                color: '#FFFFFF'
              },
              splitArea: {
                show: false
              }
            }],
            series: [
              //   {
              //   name: '阅读数',
              //   type: 'line',
              //   data: res.data.data.readNumList,
              //   lineStyle: {
              //     normal: {
              //       width: 3.5,
              //       // color: '#3374EB',
              //       color: {
              //         type: 'linear',
              //         x: 0,
              //         y: 0,
              //         x2: 1,
              //         y2: 0,
              //         colorStops: [{
              //           offset: 0,
              //           color: colors[0][0] // 0% 处的颜色
              //         }, {
              //           offset: 1,
              //           color: colors[0][1] // 100% 处的颜色
              //         }],
              //         global: false // 缺省为 false
              //       },
              //       shadowColor: colors[0][1],
              //       shadowBlur: 4,
              //       shadowOffsetY: 3
              //     }
              //   },
              //   symbol: 'emptyCircle',
              //   showSymbol: false,
              //   itemStyle: {
              //     normal: {
              //       color: colors[0][1],
              //       shadowColor: colors[0][1],
              //       shadowBlur: 2,
              //       borderWidth: 2,
              //       borderColor: '#F8F8FF'
              //     }
              //   },
              //   smooth: true
              // },
              {
                name: '点赞数',
                type: 'line',
                data: res.data.data.oldlikeNumList,
                lineStyle: {
                  normal: {
                    width: 3.5,
                    // color: '#3374EB',
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [{
                        offset: 0,
                        color: colors[1][0] // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: colors[1][1] // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    },
                    shadowColor: colors[1][1],
                    shadowBlur: 4,
                    shadowOffsetY: 3
                  }
                },
                symbol: 'emptyCircle',
                showSymbol: false,
                itemStyle: {
                  normal: {
                    color: colors[1][1],
                    shadowColor: colors[1][1],
                    shadowBlur: 2,
                    borderWidth: 2,
                    borderColor: '#F8F8FF'
                  }
                },
                smooth: true
              },
              {
                name: '在看数',
                type: 'line',
                data: res.data.data.likeNumList,
                lineStyle: {
                  normal: {
                    width: 3.5,
                    // color: '#3374EB',
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [{
                        offset: 0,
                        color: colors[2][0] // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: colors[2][1] // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    },
                    shadowColor: colors[2][1],
                    shadowBlur: 4,
                    shadowOffsetY: 3
                  }
                },
                symbol: 'emptyCircle',
                showSymbol: false,
                itemStyle: {
                  normal: {
                    color: colors[2][1],
                    shadowColor: colors[2][1],
                    shadowBlur: 2,
                    borderWidth: 2,
                    borderColor: '#F8F8FF'
                  }
                },
                smooth: true
              }
              // {
              //   name: '被转载数',
              //   type: 'line',
              //   data: res.data.data.articleCountNumList,
              //   lineStyle: {
              //     normal: {
              //       width: 3.5,
              //       // color: '#3374EB',
              //       color: {
              //         type: 'linear',
              //         x: 0,
              //         y: 0,
              //         x2: 1,
              //         y2: 0,
              //         colorStops: [{
              //           offset: 0,
              //           color: colors[3][0] // 0% 处的颜色
              //         }, {
              //           offset: 1,
              //           color: colors[3][1] // 100% 处的颜色
              //         }],
              //         global: false // 缺省为 false
              //       },
              //       shadowColor: colors[3][1],
              //       shadowBlur: 4,
              //       shadowOffsetY: 3
              //     }
              //   },
              //   symbol: 'emptyCircle',
              //   showSymbol: false,
              //   itemStyle: {
              //     normal: {
              //       color: colors[3][1],
              //       shadowColor: colors[3][1],
              //       shadowBlur: 2,
              //       borderWidth: 2,
              //       borderColor: '#F8F8FF'
              //     }
              //   },
              //   smooth: true
              // }
            ]
          }
          myChart.setOption(option)
          window.addEventListener('resize', function () {
            myChart.resize()
          })
        })
        .catch(() => { })
    },
    // 点赞在看分析折线图
    getReadLine () {
      let myChart = echarts.init(document.getElementById('read-line-charts'))
      var colors = [
        ['#ff2400', '#e47833'],
        ['#ff00ff', '#ff00ff'],
        ['#d9d919', '#d9d919'],
        ['#00cc99', '#66ff66'],
        ['#0066ff', '#0099ff'],
        ['#db2365', '#fa676c']
      ]
      this.$http.post(this.$api.findByReprintChart, this.ruleForm)
        .then(res => {
          let option = {
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              left: '5%',
              top: '8%',
              right: '5%',
              bottom: '15%'
            },
            legend: {
              show: true,
              icon: 'circle',
              orient: 'horizontal',
              bottom: '0',
              right: 'center',
              itemWidth: 16.5,
              itemHeight: 6,
              textStyle: {
                color: '#C9C8CD',
                fontSize: 14
              }
            },
            xAxis: [{
              type: 'category',
              data: res.data.data.timeList,
              axisLabel: {
                show: true,
                fontSize: 9,
                textStyle: {
                  color: '#C9C8CD' // X轴文字颜色
                },
                formatter: function (value) {
                  var str = ''
                  str += value.substring(5, 10)
                  return str
                }
              },
              axisLine: {
                show: true // 不显示x轴
              },
              axisTick: {
                show: false // 不显示刻度
              },
              boundaryGap: false,
              splitLine: {
                show: true,
                width: 0.08,
                lineStyle: {
                  type: 'dotted',
                  color: '#03202E'
                }
              },
              axisPointer: { // 轴指示器
                type: 'shadow',
                z: 1,
                shadowStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0,
                      color: 'rgba(18,155,249,0)' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: 'rgba(18,155,249,1)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  },
                  shadowColor: 'rgba(0, 0, 0, 0.2)',
                  shadowBlur: 5
                }
              }

            }],
            yAxis: [{
              type: 'value',
              minInterval: 1,
              scale: true, // 坐标轴起点不限制0
              axisLabel: {
                show: true,
                textStyle: {
                  fontSize: 9,
                  color: '#C9C8CD' // X轴文字颜色
                }
              },
              splitLine: {
                show: false

              },
              axisTick: {
                show: false // 不显示刻度
              },
              axisLine: {
                show: false
              },
              nameTextStyle: {
                color: '#FFFFFF'
              },
              splitArea: {
                show: false
              }
            }],
            series: [
              {
                name: '阅读数',
                type: 'line',
                data: res.data.data.readNumList,
                lineStyle: {
                  normal: {
                    width: 3.5,
                    // color: '#3374EB',
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [{
                        offset: 0,
                        color: colors[0][0] // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: colors[0][1] // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    },
                    shadowColor: colors[0][1],
                    shadowBlur: 4,
                    shadowOffsetY: 3
                  }
                },
                symbol: 'emptyCircle',
                showSymbol: false,
                itemStyle: {
                  normal: {
                    color: colors[0][1],
                    shadowColor: colors[0][1],
                    shadowBlur: 2,
                    borderWidth: 2,
                    borderColor: '#F8F8FF'
                  }
                },
                smooth: true
              }]
          }
          myChart.setOption(option)
          window.addEventListener('resize', function () {
            myChart.resize()
          })
        })
        .catch(() => { })
    },
    // 文章传播渠道分析
    getBar () {
      this.$http.post(this.$api.findByAuthTypeChart, this.ruleForm)
        .then(res => {
          let myChart = echarts.init(document.getElementById('bar-box'))
          let colors = ['#1F78B4', '#A6CEE3', '#B2DF8A', '#a5e7f0', '#93b7e3', '#59c4e6', '#cbb0e3', '#516b91', '#33A02C']
          let datas = res.data.data.num
          let types = res.data.data.type
          let option = {
            tooltip: {
              trigger: 'axis',
              formatter (params) {
                return params[0].name + ':' + params[0].value
              },
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '5%',
              containLabel: true
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
                textStyle: {
                  color: '#888'
                },
                margin: 20 // 刻度标签与轴线之间的距离。
              },
              data: types
            }],
            yAxis: {
              type: 'value',
              minInterval: 1,
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#eee',
                  type: 'dashed'
                }
              },
              axisTick: {
                show: false
              },
              nameTextStyle: {
                show: false,
                fontSize: 14,
                color: '#4D4D4D'
              },
              axisLabel: {
                textStyle: {
                  fontSize: 12,
                  color: '#4D4D4D'
                }
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#707070'
                }
              }
            },
            series: [{
              name: '',
              type: 'pictorialBar',
              symbolSize: [100, 25],
              symbolOffset: [0, -10],
              z: 12,
              symbolPosition: 'end',
              itemStyle: {
                normal: {
                  color: function (params) {
                    return colors[params.dataIndex]
                  },
                  label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}'
                  }
                }
              },
              data: datas

            }, {
              name: '',
              type: 'pictorialBar',
              symbolSize: [100, 25],
              symbolOffset: [0, 10],
              z: 12,
              itemStyle: {
                normal: {
                  color: function (params) {
                    return colors[params.dataIndex]
                  }
                }
              },
              data: datas
            }, {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: function (params) {
                    return colors[params.dataIndex]
                  }
                }
              },
              barWidth: 100,
              data: datas
            }]
          }
          myChart.on('click', (params) => {
            let rout = this.$router.resolve({ name: 'DrillDetails', query: { id: this.id, authType: params.name }})
            window.open(rout.href, '_blank')
          })
          myChart.setOption(option)
          window.addEventListener('resize', function () {
            myChart.resize()
          })
        })
        .catch(() => { })
    },
    // 地图数据
    getMap () {
      let myChart = echarts.init(document.getElementById('map-box'))
      this.$http.post(this.$api.findByTerritoryChart, this.ruleForm)
        .then(res => {
          let option = {
            title: {
              text: '全国地图大数据',
              subtext: '',
              x: 'center',
              textStyle: { color: '#ffffff' }
            },
            tooltip: {
              // trigger: 'item',
              formatter (params) {
                var showHtm = ''
                if (params.value) {
                  showHtm = params.name + ':' + params.value
                } else {
                  showHtm = params.name + ':' + 0
                }
                return showHtm
              }
            },
            legend: {
              orient: 'vertical',
              left: 'left'
            },
            visualMap: {
              type: 'continuous',
              min: 0,
              max: 1000,
              text: ['High', 'Low'],
              realtime: false,
              calculable: true,
              color: ['#003fbf', '#7857f3', '#72c1fd']
            },
            selectedMode: 'single',
            series: [
              {
                type: 'map',
                mapType: 'china',
                zoom: 1.0,
                itemStyle: {
                  normal: {
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                  },
                  emphasis: {
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 5,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                },
                showLegendSymbol: false,
                label: {
                  normal: {
                    show: true
                  },
                  emphasis: {
                    show: true
                  }
                },
                data: res.data.data
              }
            ]
          }
          myChart.on('click', (params) => {
            if (params.data != undefined) {
              let rout = this.$router.resolve({ name: 'DrillDetails', query: { id: this.id, province: params.name }})
              window.open(rout.href, '_blank')
            }
          })
          myChart.setOption(option)
          window.addEventListener('resize', function () {
            myChart.resize()
          })
        })
        .catch(() => { })
    },
    // 打开全文链接
    openUrl (url) {
      window.open(url, '_black')
    },
    routeSim (item) {
      this.$router.push({ name: 'Similarity', query: { id: item.id, biz: this.$route.query.id } })
    },
    // 圆形分区
    group (arr, r) {
      const newArray = []
      const { length: arLen } = arr
      arr.forEach((e, ind) => {
        // 按角度均匀分布
        const ang = 90 - (360 / (arLen - 1)).toFixed(2) * (ind + 1)
        const x = (Math.cos(ang * Math.PI / 180)).toFixed(2) * r
        const y = (Math.sin(ang * Math.PI / 180)).toFixed(2) * r
        e.value = [x.toFixed(2), y.toFixed(2)]
        if (e.belong) {
          let rotate = ''
          const angle = (160 / arr.length).toFixed(2)
          if (x > 0 && y >= 0) {
            rotate = (r - angle * (ind)).toFixed(2)
            // rotate = (90 - 360 / arr.length * (ind + 1)).toFixed(2);
          } else if (x <= 0 && y > 0) {
            rotate = (-r + angle * (arr.length - ind)).toFixed(2)
          } else if (x < 0 && y <= 0) {
            rotate = (r - angle * (ind - arr.length * 0.5)).toFixed(2)
          } else if (x >= 0 && y < 0) {
            rotate = (-8 + angle * (arr.length * 0.25 - ind)).toFixed(2)
          }
          e.label = {
            show: true,
            width: 200,
            color: {
              lineColor: {
                color: 'rgb(24,163,239)'
              }
            },
            rotate,
            align: x > 0 ? 'left' : 'right',
            padding: x > 0 ? [0, 0, 0, 16] : [0, 16, 0, 0]
          }
        }
        newArray.push(e)
      })
      return newArray
    },
    // 线配置
    linesConfig (arr) {
      const [dataArr, targetCoord] = [[], [0, 0]]
      arr.forEach((el) => {
        if (!el.belong) {
          dataArr.push([
            { coord: targetCoord },
            {
              coord: el.value,
              lineStyle: el.lineStyle,
              effect: {
                symbolSize: [4, 14], // 动画的大小
                period: 4, // 时间快慢
                delay: 2, // 延时计算
                ...el.effect
              }
            }
          ])
        }
      })
      return dataArr
    },
    // 去重
    unique (arr) {
      let array = []
      for (let i = 0; i < arr.length; i++) {
        let isChage = true
        for (let z = 0; z < array.length; z++) {
          if (arr[i]['name'] === array[z]['name']) {
            isChage = false
          }
        }
        if (isChage) {
          array.push(arr[i])
        }
      }
      return array
    },
    routerMaterial (item) {
      this.$router.push({ name: 'AccountMaterial', query: { id: item.biz } })
    }
  },
  mounted () {
    this.getLine()
    this.getReadLine()
    this.getBarData()
    this.getBar()
    this.getMap()
    this.getRelation()
  }
}
</script>
<style>
@import '../monitor.css';
</style>
<style  scoped>
.content-show {
  max-width: 1400px;
  min-height: 800px;
  margin: 20px auto;
}
.tabs-header {
  padding: 0 20px;
  height: 50px;
  line-height: 50px;
  background-color: #f7f8fa;
}
.realtime-top {
  min-height: 536px;
  background-color: #fff;
  overflow: hidden;
}
.article-box {
  width: 50%;
  height: 100%;
  overflow: hidden;
  padding: 30px;
  position: relative;
}
.read-article-box {
  width: 50%;
  height: 100%;
  overflow: hidden;
  padding: 30px 30px 30px 30px;
  position: relative;
}
.title {
  font-size: 24px;
  color: #252934;
}
.information {
  font-size: 14px;
  color: #a9a9a9;
  line-height: 20px;
  margin: 20px 0;
}
.information span {
  margin-right: 20px;
}
.boder-box {
  display: block;
  width: 40px;
  text-align: center;
  border: 1px solid #3b81fe;
  color: #3b81fe;
}
.article-cont {
  height: 285px;
  overflow: hidden;
  line-height: 24px;
  font-size: 14px;
  text-indent: 32px;
}
.bottom-btn {
  position: absolute;
  color: #3b81fe;
  bottom: 0px;
  right: 30px;
  font-size: 14px;
}
.relation-box {
  padding: 30px;
}
#relation-charts,
#line-charts {
  width: 500px;
  height: 400px;
  /* border: 1px solid #3b81fe; */
}
#read-line-charts {
  width: 700px;
  height: 400px;
}
.relation-title {
  color: #252934;
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
}
.relation-title i {
  color: #ff8210;
  font-style: normal;
}
.realtime-center {
  margin-top: 30px;
  height: 540px;
  background-color: #fff;
}
.tabs-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 20px;
  background-color: #2196f3;
  vertical-align: middle;
  margin-top: -4px;
  margin-right: 10px;
}
#bar-charts,
#bar-box,
#map-box,
#relation-bar {
  height: 500px;
}
#relation-bar {
  width: 500px;
}
.realtime-bottom {
  margin: 30px 0;
  background-color: #fff;
}
.list-content {
  max-height: 8150px;
  overflow: hidden;
}
.list-box {
  background-color: #fff;
  padding: 28px 28px 0 28px;
}
.list-bottom-source {
  padding-bottom: 28px;
}
.list-bottom {
  padding-bottom: 28px;
  border-bottom: 1px solid #979696;
}
.left-img {
  min-width: 140px;
  height: 90px;
  border: 1px solid #979696;
  margin-right: 20px;
}
.left-img img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
}
.left-time span,
.right-infor span {
  margin-right: 10px;
  font-size: 14px;
  color: #a9a9a9;
  line-height: 20px;
}
.right-bottom {
  font-size: 14px;
  color: #a9a9a9;
}
.right-title {
  line-height: 50px;
  max-width: 75%;
}
.list-top {
  margin-bottom: 20px;
}
.click-sapn {
  color: #2196f3;
  font-style: normal;
  text-decoration: underline;
}
.right-infor .click-sapn {
  color: #2196f3;
}
.right-infor i {
  margin-right: 5px;
}
</style>
