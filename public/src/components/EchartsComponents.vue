<!--
 * @Author: MaiChao
 * @Date: 2021-02-01 14:05:56
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-02-02 11:23:29
-->
<template>
  <div>
    <div style="width:50%;height:400px;"  ref="echarts"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'EchartsComponents',
  props: {
    chartData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      count: 1,
      colors: ['#4C98FB', '#83CCE7', '#26C7C8', '#73DEBD', '#26C978', '#8CDF6C', '#FBD657', '#F56679', '#E07BCE', '#9D50E0', '#634FDA']
    }
  },
  methods: {
    drawChart () {
      console.log(this.chartData)
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.echarts)
      // 绘制图表
      let opetions = {
        title: {
          text: 'ECharts 入门示例'
        },
        color: this.colors,
        tooltip: {},
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#96A4F4'
          },
          axisLine: {
            lineStyle: {
              color: '#96A4F4'
            },
            width: 5
          },
          axisTick: {
            show: false
          },
          data: this.chartData.chartData
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#96A4F4'
          },
          axisLine: {
            lineStyle: {
              color: '#96A4F4'
            },
            width: 5
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(150, 164, 244, 0.3)'
            }
          }
        },
        series: [
          {
            type: this.chartData.type,
            stack: '销量',
            barWidth: '45%',
            label: {
              show: false,
              position: 'insideRight'
            },
            data: this.chartData.lineData
          }
        ]
      }
      myChart.setOption(opetions)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  },
  mounted: function () {
    const vm = this
    vm.$nextTick(() => {
      vm.drawChart()
    })
  },
  created: () => {}
}
</script>

<style scoped>
</style>
