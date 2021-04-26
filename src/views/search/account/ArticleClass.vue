<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-29 14:18:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-04 18:12:12
-->
<template>
  <div class="search-material-wrap">
    <div class="search-material-up">
      <p class="search-mater-theme">文章类别占比</p>
    </div>
    <div class="search-class-chart flex-bwt-center">
      <div class="class-chart-left" id="myPie"></div>
      <div class="class-chart-right" id="myLine"></div>
    </div>
    <div class="search-class-tab flex-ali-center">
      <p :class="{'is-class': classActive === item}"
          @click="changeClassTab(item)"
          v-for="(item, index) of accountClass" :key="index">{{item}}</p>
    </div>
    <div>
      <el-table :data="classData"
                style="width: 100%">
        <el-table-column label="序号"
                          width="80">
          <template slot-scope="scope">
            {{(pageBean.pageNum - 1) * pageBean.pageSize + (scope.$index + 1)}}
            <!-- {{scope.$index + 1}} -->
          </template>
        </el-table-column>
        <el-table-column prop="title"
                          label="文章标题"
                          show-overflow-tooltip>
          <template slot-scope="scope">
            <p @click="targetUrl(scope.row.url)" class="cursor">{{scope.row.title}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="read_num"
                          label="阅读数"
                          width="140">
        </el-table-column>
        <el-table-column prop="old_like_num"
                          label="点赞数"
                          width="140">
        </el-table-column>
        <el-table-column prop="like_num"
                          label="在看数"
                          width="140">
        </el-table-column>
        <el-table-column prop="pubtime"
                          label="发布时间"
                          width="160">
        </el-table-column>
      </el-table>
    </div>
    <set-page @pagingChange="pagingChange"
              :total="total.count" ref="child"></set-page>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入折线图组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  name: 'search',
  components: {},
  data () {
    return {
      classActive: '',
      total: {
        count: 0
      },
      pageBean: {
        pageSize: 10,
        pageNum: 1
      },
      accountMsg: {},
      classData: [],
      accountClass: []
    }
  },
  methods: {
    // 切换文章类型
    changeClassTab (tab) {
      this.classActive = tab
      this.pageBean.pageNum = 1
      this.$refs.child.handleCurrentChange(1)
      this.classData = []
      this.getClassArticle()
    },
    pagingChange (query) {
      this.pageBean.pageSize = query.size
      this.pageBean.pageNum = query.page
      console.log(query)
      this.classData = []
      this.getClassArticle()
    },
    targetUrl (url) {
      window.open(url)
    },
    // 获取文章发布类别占比
    drawPie () {
      this.$http.post(this.$api.getArticleCategories, { biz: this.accountMsg.biz})
        .then(res => {
          let datas = res.data.data
          let label = []
          datas.forEach(i => {label.push(i.name)})
          let myPie = echarts.init(document.getElementById('myPie'))
          let color = ['#54C7FC', '#FFB54D', '#FF7466', '#44DB5E', '#4D9FFF', '#FFD300']
          myPie.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a}<br>{b}: {d}%'
            },
            color: color,
            legend: {
              bottom: 'bottom',
              icon: 'circle',
              itemWidth: 8,
              itemHeight: 8,
              data: label
            },
            series: [
              {
                name: '文章类别占比',
                type: 'pie',
                radius: '50%',
                label: {
                  normal: {
                    show: true,
                    formatter: '{d}%'
                  }
                },
                data: datas,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          })
        }).catch(() => {})
    },
    // 获取近30天内发文数
    drawLine () {
      this.$http.post(this.$api.getMonthPublishedNum, { biz: this.accountMsg.biz})
        .then(res => {
          // 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(document.getElementById('myLine'))
          // 绘制图表
          myChart.setOption({
            title: {},
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              type: 'category',
              axisTick: {
                show: false
              },
              boundaryGap: false,
              data: res.data.data.date
            },
            yAxis: {
              type: 'value',
              axisTick: {
                show: false
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#ccc'],
                  width: 1,
                  type: 'solid'
                }
              }
            },
            series: [
              {
                name: '发文数',
                type: 'line',
                color: '#72A7C5',
                data: res.data.data.count,
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#CAE4FF'
                  }, {
                    offset: 1,
                    color: '#CAE1FF'
                  }])
                }
              }
            ]
          })
        }).catch(() => {})
    },
    // 获取文章类型
    getClassType () {
      this.$http.get(`${this.$api.getWxClass}/${this.accountMsg.biz}`)
        .then(res => {
          this.accountClass = res.data.data
          this.classActive = res.data.data[0]
          this.getClassArticle()
        }).catch(() => {})
    },
    // 根据类型获取文章
    getClassArticle () {
      let obj = {
        biz: this.accountMsg.biz,
        type: this.classActive,
        pageBean: {
          pageSize: this.pageBean.pageSize,
          pageNum: (this.pageBean.pageNum - 1 ) * this.pageBean.pageSize + 1
        }
      }
      this.$http.post(this.$api.getWxClassArticle, obj)
        .then(res => {
          this.total = res.data.data.shift()
          this.classData = res.data.data
        }).catch(() => {})
    },
    getAccountMsg () {
      this.$http.get(`${this.$api.getWxAccount}/${this.accountId}`)
        .then(res => {
          this.accountMsg = res.data.data[0]
          this.drawLine()
          this.drawPie()
          this.getClassType()
        }).catch(() => {})
    }
  },
  mounted () {
    // this.drawLine()
    // this.drawPie()
  },
  created () {
    this.accountId = this.$route.query.id
    this.getAccountMsg()
  },
  computed: {
    // ...mapState({
    //   accountMsg: state => state.mutations.accountMsg
    // })
  }
}
</script>
<style lang="scss" scoped>
@import '../search.scss';
</style>
