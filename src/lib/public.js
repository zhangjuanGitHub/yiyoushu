/*
 * @Author: MaiChao
 * @Date: 2021-02-01 15:03:22
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-02-01 15:04:03
 */
export default class {
  constructor (echarts, id, xdata, seriesdata) { // echarts, id, xdata,seriesdata都是vue组件中传递过来的参数
    this.echarts = echarts
    let option = this.getOption(xdata, seriesdata) // 把参数传递给方法
    var myChart = echarts.init(document.getElementById(id)) // 获取dom
    myChart.setOption(option) // 暴露出去
  }

  getOption (xdata, seriesdata) {
    let option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量1']
      },
      xAxis: {
        data: xdata // 传递过来的参数
      },
      yAxis: {},
      series: [{
        name: '销量1',
        type: 'bar',
        data: seriesdata // 传递过来的参数
      } ]
    }

    return option
  }
}
