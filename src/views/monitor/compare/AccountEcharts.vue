<!--
 * @Author: zhangjuan
 * @Date: 2021-05-12 16:59:21
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-05-19 14:51:04
-->
<template>
  <div>
    <div>
      <p class="compare-chart-pp">公信力对比</p>
      <div class="flex-bwt-center">
        <div id="gongxinli"></div>
        <div id="gongSon"></div>
      </div>
    </div>
    <div style="margin-top: 20px">
      <p class="compare-chart-pp">影响力对比</p>
      <div class="flex-bwt-center">
        <div id="yingxiangli"></div>
        <div id="yingSon"></div>
      </div>
    </div>
    <div style="margin-top: 20px">
      <p class="compare-chart-pp">传播力对比</p>
      <div id="chuanboli"></div>
      <div class="flex-bwt-center">
        <div>
          <p class="compare-chart-little">阅读总数</p>
          <div id="chuanLeftOne"></div>
        </div>
        <div>
          <p class="compare-chart-little">日/篇均阅读数</p>
          <div id="chuanRightOne"></div>
        </div>
      </div>
      <div class="flex-bwt-center">
        <div>
          <p class="compare-chart-little">头条阅读总数</p>
          <div id="chuanLeftTwo"></div>
        </div>
        <div>
          <p class="compare-chart-little">头条日/篇均阅读数</p>
          <div id="chuanRightTwo"></div>
        </div>
      </div>
    </div>
    <div style="margin-top: 20px">
      <p class="compare-chart-pp">引导力力对比</p>
      <div class="flex-bwt-center">
        <div id="yindaoli"></div>
        <div id="yinSonOne"></div>
      </div>
      <div class="flex-bwt-center" style="margin-top: 20px">
        <div id="yinSonTwo"></div>
        <div id="yinSonThree"></div>
      </div>
    </div>
  </div>
</template>
<script>
let echarts = require('echarts/lib/echarts')
// 引入折线图组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  props: ['allData'],
  data () {
    return {
      nameList: [],
      credibilityList: [], // 公信力
      articleOrgionList: [], // 原创度
      involveFunctionList: [], // 专业度
      influenceList: [], // 影响力
      articleList: [], // 文章数
      articleOneList: [], // 发布次数
      propagateList: [], // 传播力
      readSumList: [], // 阅读总数
      readDayList: [], // 日均阅读数
      readPieceList: [], // 篇均阅读数
      readOneList: [], // 头条阅读总数
      readDayOneList: [], // 头条日均阅读数
      readPieceOneList: [], // 头条篇均阅读数
      leadershipList: [], // 引导力
      commentList: [], // 评论总数
      replyList: [], // 回复总数
      oldLikeList: [], // 点赞总数
      likeList: [], // 在看总数
      oldLikePieceList: [], // 篇均点赞数
      likePieceList: [], // 篇均在看数
    }
  },
  methods: {
    getGongxinli () {
      let gongxinli = echarts.init(document.getElementById('gongxinli'))
      // 绘制图表
      gongxinli.setOption({
        title: {},
        tooltip: {
          trigger: 'axis',
          transitionDuration:0
        },
        legend: {},
        xAxis: {
          type: 'category',
          axisPointer: { type: 'shadow' },
          axisLabel: {
            interval: 0,
            formatter: (params) => {
              let newParamsName  = ''
              let paramsNameNumber  = params.length
              let provideNumber = 5 // 每行能显示的字的个数
              let rowNumber = Math.ceil(paramsNameNumber / provideNumber)// 换行的话，需要显示几行，向上取整
              if (paramsNameNumber > provideNumber) {
                for (let p = 0; p < rowNumber; p++) {
                    let tempStr = ''// 表示每一次截取的字符串
                    let start = p * provideNumber// 开始截取的位置
                    let end = start + provideNumber// 结束截取的位置
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + '\n'
                    }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
          },
          data: this.nameList
        },
        yAxis: [
          {
            type: 'value',
            name: '分数'
          }
        ],
        series: [
          {
            name: '公信力',
            type: 'line',
            color: '#F9C61D',
            data: this.credibilityList
          }
        ]
      })
    },
    getGongSon () {
      let gongSon = echarts.init(document.getElementById('gongSon'))
      // 绘制图表
      gongSon.setOption({
        title: {},
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0 // 防止鼠标滑入抖动
        },
        legend: {},
        xAxis: {
          type: 'category',
          axisPointer: { type: 'shadow' },
          axisLabel: {
            interval: 0,
            formatter: (params) => {
              let newParamsName  = ''
              let paramsNameNumber  = params.length
              let provideNumber = 6 // 每行能显示的字的个数
              let rowNumber = Math.ceil(paramsNameNumber / provideNumber)// 换行的话，需要显示几行，向上取整
              if (paramsNameNumber > provideNumber) {
                for (let p = 0; p < rowNumber; p++) {
                    let tempStr = ''// 表示每一次截取的字符串
                    let start = p * provideNumber// 开始截取的位置
                    let end = start + provideNumber// 结束截取的位置
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + '\n'
                    }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
          },
          data: this.nameList
        },
        yAxis: [
          {
            type: 'value',
            name: '分数'
          }
        ],
        series: [
          {
            name: '原创度',
            type: 'bar',
            color: '#1DC48C',
            data: this.articleOrgionList
          },
          {
            name: '专业度',
            type: 'bar',
            color: '#42A6F5',
            data: this.involveFunctionList
          }
        ]
      })
    },
    getYingxiangli () {
      let yingxiangli = echarts.init(document.getElementById('yingxiangli'))
      // 绘制图表
      yingxiangli.setOption({
        title: {},
        tooltip: {
          trigger: 'axis',
          transitionDuration:0
        },
        legend: {},
        xAxis: {
          type: 'category',
          axisPointer: {
            type: 'shadow'
          },
          axisLabel: {
            interval: 0,
            formatter: (params) => {
              let newParamsName  = ''
              let paramsNameNumber  = params.length
              let provideNumber = 5 // 每行能显示的字的个数
              let rowNumber = Math.ceil(paramsNameNumber / provideNumber)// 换行的话，需要显示几行，向上取整
              if (paramsNameNumber > provideNumber) {
                for (let p = 0; p < rowNumber; p++) {
                    let tempStr = ''// 表示每一次截取的字符串
                    let start = p * provideNumber// 开始截取的位置
                    let end = start + provideNumber// 结束截取的位置
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + '\n'
                    }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
          },
          data: this.nameList
        },
        yAxis: [
          {
            type: 'value',
            name: '分数'
          }
        ],
        series: [
          {
            name: '影响力',
            type: 'line',
            color: '#F9C61D',
            data: this.influenceList
          }
        ]
      })
    },
    getYingSon () {
      let yingSon = echarts.init(document.getElementById('yingSon'))
      // 绘制图表
      yingSon.setOption({
        title: {},
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0 // 防止鼠标滑入抖动
        },
        legend: {},
        xAxis: {
          type: 'category',
          axisPointer: { type: 'shadow' },
          axisLabel: {
            interval: 0,
            formatter: (params) => {
              let newParamsName  = ''
              let paramsNameNumber  = params.length
              let provideNumber = 6 // 每行能显示的字的个数
              let rowNumber = Math.ceil(paramsNameNumber / provideNumber)// 换行的话，需要显示几行，向上取整
              if (paramsNameNumber > provideNumber) {
                for (let p = 0; p < rowNumber; p++) {
                    let tempStr = ''// 表示每一次截取的字符串
                    let start = p * provideNumber// 开始截取的位置
                    let end = start + provideNumber// 结束截取的位置
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + '\n'
                    }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
          },
          data: this.nameList
        },
        yAxis: [
          {
            type: 'value',
            name: '数量'
          }
        ],
        series: [
          {
            name: '文章数',
            type: 'bar',
            color: '#65B581',
            data: this.articleList
          },
          {
            name: '发布次数',
            type: 'bar',
            color: '#FFCE34',
            data: this.articleOneList
          }
        ]
      })
    },
    getChuanboli () {
      let chuanboli = echarts.init(document.getElementById('chuanboli'))
      // 绘制图表
      chuanboli.setOption({
        title: {},
        tooltip: {
          trigger: 'axis',
          transitionDuration:0
        },
        legend: {},
        xAxis: {
          type: 'category',
          axisPointer: { type: 'shadow' },
          axisLabel: {
            interval: 0,
            formatter: (params) => {
              let newParamsName  = ''
              let paramsNameNumber  = params.length
              let provideNumber = 10 // 每行能显示的字的个数
              let rowNumber = Math.ceil(paramsNameNumber / provideNumber)// 换行的话，需要显示几行，向上取整
              if (paramsNameNumber > provideNumber) {
                for (let p = 0; p < rowNumber; p++) {
                    let tempStr = ''// 表示每一次截取的字符串
                    let start = p * provideNumber// 开始截取的位置
                    let end = start + provideNumber// 结束截取的位置
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + '\n'
                    }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
          },
          data: this.nameList
        },
        yAxis: [
          {
            type: 'value',
            name: '分数'
          }
        ],
        series: [
          {
            name: '传播力',
            type: 'line',
            color: '#F9C61D',
            data: this.propagateList
          }
        ]
      })
    },
    chuanLeftOne () {
      let chuanLeftOne = echarts.init(document.getElementById('chuanLeftOne'))
      // 绘制图表
      chuanLeftOne.setOption({
        title: {},
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0 // 防止鼠标滑入抖动
        },
        grid: {
          // left: 72,
          containLabel: true
        },
        legend: {},
        xAxis: {
          type: 'category',
          axisPointer: { type: 'shadow' },
          axisLabel: {
            interval: 0,
            formatter: (params) => {
              let newParamsName  = ''
              let paramsNameNumber  = params.length
              let provideNumber = 5 // 每行能显示的字的个数
              let rowNumber = Math.ceil(paramsNameNumber / provideNumber)// 换行的话，需要显示几行，向上取整
              if (paramsNameNumber > provideNumber) {
                for (let p = 0; p < rowNumber; p++) {
                    let tempStr = ''// 表示每一次截取的字符串
                    let start = p * provideNumber// 开始截取的位置
                    let end = start + provideNumber// 结束截取的位置
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + '\n'
                    }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
          },
          data: this.nameList
        },
        yAxis: [
          {
            type: 'value',
            name: '数量'
          }
        ],
        series: [
          {
            name: '阅读总数',
            type: 'bar',
            color: '#FD665F',
            data: this.readSumList
          }
        ]
      })
    },
    chuanLeftTwo () {
      let chuanLeftTwo = echarts.init(document.getElementById('chuanLeftTwo'))
      // 绘制图表
      chuanLeftTwo.setOption({
        title: {},
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0 // 防止鼠标滑入抖动
        },
        grid: {
          // left: 72
          containLabel: true
        },
        legend: {},
        xAxis: {
          type: 'category',
          axisPointer: { type: 'shadow' },
          axisLabel: {
            interval: 0,
            formatter: (params) => {
              let newParamsName  = ''
              let paramsNameNumber  = params.length
              let provideNumber = 5 // 每行能显示的字的个数
              let rowNumber = Math.ceil(paramsNameNumber / provideNumber)// 换行的话，需要显示几行，向上取整
              if (paramsNameNumber > provideNumber) {
                for (let p = 0; p < rowNumber; p++) {
                    let tempStr = ''// 表示每一次截取的字符串
                    let start = p * provideNumber// 开始截取的位置
                    let end = start + provideNumber// 结束截取的位置
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + '\n'
                    }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
          },
          data: this.nameList
        },
        yAxis: [
          {
            type: 'value',
            name: '数量'
          }
        ],
        series: [
          {
            name: '头条阅读总数',
            type: 'bar',
            color: '#3333CC',
            data: this.readOneList
          }
        ]
      })
    },
    chuanRightOne () {
      let chuanRightOne = echarts.init(document.getElementById('chuanRightOne'))
      // 绘制图表
      chuanRightOne.setOption({
        title: {},
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0 // 防止鼠标滑入抖动
        },
        legend: {},
        xAxis: {
          type: 'category',
          axisPointer: {
            type: 'shadow'
          },
          axisLabel: {
            interval: 0,
            formatter: (params) => {
              let newParamsName  = ''
              let paramsNameNumber  = params.length
              let provideNumber = 6 // 每行能显示的字的个数
              let rowNumber = Math.ceil(paramsNameNumber / provideNumber)// 换行的话，需要显示几行，向上取整
              if (paramsNameNumber > provideNumber) {
                for (let p = 0; p < rowNumber; p++) {
                    let tempStr = ''// 表示每一次截取的字符串
                    let start = p * provideNumber// 开始截取的位置
                    let end = start + provideNumber// 结束截取的位置
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + '\n'
                    }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
          },
          data: this.nameList
        },
        yAxis: [
          {
            type: 'value',
            name: '数量'
          }
        ],
        series: [
          {
            name: '日均阅读数',
            type: 'bar',
            color: '#CCFF00',
            data: this.readDayList
          },
          {
            name: '篇均阅读数',
            type: 'bar',
            color: '#CCFFFF',
            data: this.readPieceList
          }
        ]
      })
    },
    chuanRightTwo () {
      let chuanRightTwo = echarts.init(document.getElementById('chuanRightTwo'))
      // 绘制图表
      chuanRightTwo.setOption({
        title: {},
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0 // 防止鼠标滑入抖动
        },
        legend: {},
        xAxis: {
          type: 'category',
          axisPointer: { type: 'shadow' },
          axisLabel: {
            interval: 0,
            formatter: (params) => {
              let newParamsName  = ''
              let paramsNameNumber  = params.length
              let provideNumber = 6 // 每行能显示的字的个数
              let rowNumber = Math.ceil(paramsNameNumber / provideNumber)// 换行的话，需要显示几行，向上取整
              if (paramsNameNumber > provideNumber) {
                for (let p = 0; p < rowNumber; p++) {
                    let tempStr = ''// 表示每一次截取的字符串
                    let start = p * provideNumber// 开始截取的位置
                    let end = start + provideNumber// 结束截取的位置
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + '\n'
                    }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
          },
          data: this.nameList
        },
        yAxis: [
          {
            type: 'value',
            name: '数量'
          }
        ],
        series: [
          {
            name: '头条日均阅读数',
            type: 'bar',
            color: '#FFCC00',
            data: this.readDayOneList
          },
          {
            name: '头条篇均阅读数',
            type: 'bar',
            color: '#CC3300',
            data: this.readPieceOneList
          }
        ]
      })
    },
    yindaoli () {
      let yindaoli = echarts.init(document.getElementById('yindaoli'))
      // 绘制图表
      yindaoli.setOption({
        title: {},
        tooltip: {
          trigger: 'axis',
          transitionDuration:0
        },
        legend: {},
        xAxis: {
          type: 'category',
          axisPointer: { type: 'shadow' },
          axisLabel: {
            interval: 0,
            formatter: (params) => {
              let newParamsName  = ''
              let paramsNameNumber  = params.length
              let provideNumber = 5 // 每行能显示的字的个数
              let rowNumber = Math.ceil(paramsNameNumber / provideNumber)// 换行的话，需要显示几行，向上取整
              if (paramsNameNumber > provideNumber) {
                for (let p = 0; p < rowNumber; p++) {
                    let tempStr = ''// 表示每一次截取的字符串
                    let start = p * provideNumber// 开始截取的位置
                    let end = start + provideNumber// 结束截取的位置
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + '\n'
                    }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
          },
          data: this.nameList
        },
        yAxis: [
          {
            type: 'value',
            name: '分数'
          }
        ],
        series: [
          {
            name: '引导力',
            type: 'line',
            color: '#F9C61D',
            data: this.leadershipList
          }
        ]
      })
    },
    yinSonOne () {
      let yinSonOne = echarts.init(document.getElementById('yinSonOne'))
      // 绘制图表
      yinSonOne.setOption({
        title: {},
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0 // 防止鼠标滑入抖动
        },
        legend: {},
        xAxis: {
          type: 'category',
          axisPointer: { type: 'shadow' },
          axisLabel: {
            interval: 0,
            formatter: (params) => {
              let newParamsName  = ''
              let paramsNameNumber  = params.length
              let provideNumber = 5 // 每行能显示的字的个数
              let rowNumber = Math.ceil(paramsNameNumber / provideNumber)// 换行的话，需要显示几行，向上取整
              if (paramsNameNumber > provideNumber) {
                for (let p = 0; p < rowNumber; p++) {
                    let tempStr = ''// 表示每一次截取的字符串
                    let start = p * provideNumber// 开始截取的位置
                    let end = start + provideNumber// 结束截取的位置
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + '\n'
                    }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
          },
          data: this.nameList
        },
        yAxis: [
          {
            type: 'value',
            name: '数量'
          }
        ],
        series: [
          {
            name: '评论总数',
            type: 'bar',
            color: '#9999FF',
            data: this.commentList
          },
          {
            name: '回复总数',
            type: 'bar',
            color: '#99CCFF',
            data: this.replyList
          }
        ]
      })
    },
    yinSonTwo () {
      let yinSonT = echarts.init(document.getElementById('yinSonTwo'))
      // 绘制图表
      yinSonT.setOption({
        title: {},
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0 // 防止鼠标滑入抖动
        },
        grid: {
          // left: 70
          containLabel: true
        },
        legend: {},
        xAxis: {
          type: 'category',
          axisPointer: { type: 'shadow' },
          axisLabel: {
            interval: 0,
            formatter: (params) => {
              let newParamsName  = ''
              let paramsNameNumber  = params.length
              let provideNumber = 5 // 每行能显示的字的个数
              let rowNumber = Math.ceil(paramsNameNumber / provideNumber)// 换行的话，需要显示几行，向上取整
              if (paramsNameNumber > provideNumber) {
                for (let p = 0; p < rowNumber; p++) {
                    let tempStr = ''// 表示每一次截取的字符串
                    let start = p * provideNumber// 开始截取的位置
                    let end = start + provideNumber// 结束截取的位置
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + '\n'
                    }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
          },
          data: this.nameList
        },
        yAxis: [
          {
            type: 'value',
            name: '数量'
          }
        ],
        series: [
          {
            name: '点赞总数',
            type: 'bar',
            color: '#CC0000',
            data: this.oldLikeList
          },
          {
            name: '在看总数',
            type: 'bar',
            color: '#CC00FF',
            data: this.likeList
          }
        ]
      })
    },
    yinSonThree () {
      let yinSonThree = echarts.init(document.getElementById('yinSonThree'))
      // 绘制图表
      yinSonThree.setOption({
        title: {},
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0 // 防止鼠标滑入抖动
        },
        legend: {},
        xAxis: {
          type: 'category',
          axisPointer: { type: 'shadow' },
          axisLabel: {
            interval: 0,
            formatter: (params) => {
              let newParamsName  = ''
              let paramsNameNumber  = params.length
              let provideNumber = 5 // 每行能显示的字的个数
              let rowNumber = Math.ceil(paramsNameNumber / provideNumber)// 换行的话，需要显示几行，向上取整
              if (paramsNameNumber > provideNumber) {
                for (let p = 0; p < rowNumber; p++) {
                    let tempStr = ''// 表示每一次截取的字符串
                    let start = p * provideNumber// 开始截取的位置
                    let end = start + provideNumber// 结束截取的位置
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + '\n'
                    }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
          },
          data: this.nameList
        },
        yAxis: [
          {
            type: 'value',
            name: '数量'
          }
        ],
        series: [
          {
            name: '篇均点赞数',
            type: 'bar',
            color: '#1DC48C',
            data: this.oldLikePieceList
          },
          {
            name: '篇均在看数',
            type: 'bar',
            color: '#42A6F5',
            data: this.likePieceList
          }
        ]
      })
    },
    getData () {
      this.nameList = []
      this.credibilityList = []
      this.articleOrgionList = []
      this.involveFunctionList = []
      this.influenceList = []
      this.articleList = []
      this.articleOneList = []
      this.propagateList = []
      this.readSumList = []
      this.readDayList = []
      this.readPieceList = []
      this.readOneList = []
      this.readDayOneList = []
      this.readPieceOneList = []
      this.leadershipList = []
      this.commentList = []
      this.replyList = []
      this.oldLikeList = []
      this.likeList = []
      this.oldLikePieceList = []
      this.likePieceList = []
      console.log(this.allData)
      let dataList = this.allData.dataList
      for (let i = 0; i < dataList.length; i++) {
        this.nameList.push(dataList[i].nickname)
      }
      let numList = this.allData.numList
      for (let j = 0; j < numList.length; j++) {
        this.credibilityList.push(numList[j].credibilityNum)
        this.articleOrgionList.push(numList[j].articleOrgionSum)
        this.involveFunctionList.push(numList[j].involveFunctionSum)
        this.influenceList.push(numList[j].influenceNum)
        this.articleList.push(numList[j].articleSum)
        this.articleOneList.push(numList[j].articleOneSum)
        this.propagateList.push(numList[j].propagateNum)
        this.readSumList.push(numList[j].readSum)
        this.readDayList.push(numList[j].readDayNum)
        this.readPieceList.push(numList[j].readPieceNum)
        this.readOneList.push(numList[j].readSumOne)
        this.readDayOneList.push(numList[j].readDayNumOne)
        this.readPieceOneList.push(numList[j].readPieceNumOne)
        this.leadershipList.push(numList[j].leadershipNum)
        this.commentList.push(numList[j].commentSum)
        this.replyList.push(numList[j].replySum)
        this.oldLikeList.push(numList[j].oldLikeSum)
        this.likeList.push(numList[j].likeSum)
        this.oldLikePieceList.push(numList[j].oldLikePieceNum)
        this.likePieceList.push(numList[j].likePieceNum)
      }
    },
    useFunction () {
      console.log('走了——useFunction')
      this.getGongxinli()
      this.getGongSon()
      this.getYingxiangli()
      this.getYingSon()
      this.getChuanboli()
      this.chuanLeftOne()
      this.chuanLeftTwo()
      this.chuanRightOne()
      this.chuanRightTwo()
      this.yindaoli()
      this.yinSonOne()
      this.yinSonTwo()
      this.yinSonThree()
    }
  },
  mounted () {
    this.useFunction()
  },
  created () {
    this.getData()
  },
  watch: {
    allData () {
      this.getData()
      this.useFunction()
    }
  }
}
</script>
<style scoped>
@import './compare.css';
#gongxinli, #yingxiangli {
  width: 400px;
  height: 380px;
}
#chuanLeftOne, #chuanLeftTwo {
  width: 500px;
  height: 380px;
}
#chuanRightOne, #chuanRightTwo {
  width: 630px;
  height: 380px;
}
#gongSon, #yingSon {
  width: 730px;
  height: 380px;
}
#chuanboli {
  width: 1130px;
  height: 380px;
}
#yindaoli, #yinSonOne, #yinSonTwo, #yinSonThree {
  width: 565px;
  height: 380px;
}
</style>