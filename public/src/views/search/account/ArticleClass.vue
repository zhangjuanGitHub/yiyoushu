<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-29 14:18:52
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-04-25 16:01:58
-->
<template>
  <div class="search-material-wrap">
    <div class="echarts-box"
         v-show="this.accountMsg.function_type==='检察'">
      <div class="search-class-chart flex-bwt-center">
        <div class="class-chart-left"
             id="fourPie"></div>
        <div class="class-chart-right"
             id="tenPie"></div>
      </div>
      <div class="class-chart-line"
           id="fourLine"></div>
    </div>
    <div class="search-material-up" v-show="this.accountMsg.function_type!=='检察'">
      <p class="search-mater-theme">文章类别占比</p>
    </div>
    <div class="search-class-chart flex-bwt-center"
         v-show="this.accountMsg.function_type!=='检察'">
      <div class="class-chart-left"
           id="myPie"></div>
      <div class="class-chart-right"
           id="myLine"></div>
    </div>
    <div class="search-class-tab flex-ali-center">
      <p :class="{'is-class': classActive === item}"
         @click="changeClassTab(item)"
         v-for="(item, index) of accountClass"
         :key="index">{{item}}</p>
    </div>
    <div class="table-box">
      <el-table :data="classData"
                style="width: 100%">
        <el-table-column label="序号"
                         width="80">
          <template slot-scope="scope">
            {{(pageBean.pageNum - 1) * pageBean.pageSize + (scope.$index + 1)}}
          </template>
        </el-table-column>
        <el-table-column prop="title"
                         label="文章标题"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <p @click="targetUrl(scope.row.id)"
               class="cursor">{{scope.row.title}}</p>
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
              :total="total.count"
              ref="child"></set-page>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      // this.getClassArticle()
    },
    pagingChange (query) {
      this.pageBean.pageSize = query.size
      this.pageBean.pageNum = query.page
      this.classData = []
      this.getClassArticle()
    },
    targetUrl (id) {
      // window.open(url)
      let route = this.$router.resolve({ name: 'ArticleAnalyse', query: { accountId: this.accountId, articleId: id } })
      window.open(route.href, '_blank')
    },
    // 获取文章发布类别占比
    drawPie () {
      this.$http.post(this.$api.getArticleCategories, { biz: this.accountMsg.biz })
        .then(res => {
          let datas = res.data.data
          let label = []
          datas.forEach(i => { label.push(i.name) })
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
        }).catch(() => { })
    },
    // 获取近30天内发文数
    drawLine () {
      this.$http.post(this.$api.getMonthPublishedNum, { biz: this.accountMsg.biz })
        .then(res => {
          // 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(document.getElementById('myLine'))
          let fourLine = echarts.init(document.getElementById('fourLine'))
          // 绘制图表
          let option = {
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
          }
          if (this.accountMsg.function_type === '检察') {
            fourLine.setOption(option)
            window.addEventListener('resize', function () {
              fourLine.resize()
            })
          } else {
            myChart.setOption(option)
            window.addEventListener('resize', function () {
              myChart.resize()
            })
          }
        }).catch(() => { })
    },
    // 获取文章类型
    getClassType () {
      if (this.accountMsg.function_type === '检察') {
        this.accountClass = ['全部', '刑事检察', '民事检察', '行政检察', '公益诉讼检察', '综合', '其他']
        this.classActive = this.accountClass[0]
        this.getClassArticle()
      } else {
        this.$http.get(`${this.$api.getWxClass}/${this.accountMsg.biz}`)
          .then(res => {
            res.data.data.unshift('全部')
            this.accountClass = res.data.data
            this.classActive = this.accountClass[0]
            this.getClassArticle()
          }).catch(() => { })
      }
      // this.getClassArticle()
    },
    // 根据类型获取文章
    getClassArticle () {
      let obj = {}
      if (this.accountMsg.function_type === '检察') {
        obj = {
          biz: this.accountMsg.biz,
          procuratorialType: this.classActive,
          type: '',
          pageBean: {
            pageSize: this.pageBean.pageSize,
            pageNum: (this.pageBean.pageNum - 1) * this.pageBean.pageSize + 1
          }
        }
      } else {
        obj = {
          biz: this.accountMsg.biz,
          type: this.classActive,
          pageBean: {
            pageSize: this.pageBean.pageSize,
            pageNum: (this.pageBean.pageNum - 1) * this.pageBean.pageSize + 1
          }
        }
      }

      this.$http.post(this.$api.getWxClassArticle, obj)
        .then(res => {
          if (res.data.data.length > 0) {
            this.total = res.data.data.shift()
            this.classData = res.data.data
          } else {
            this.total = { count: 0 }
            this.classData = []
          }
        }).catch(() => { })
    },
    // 四大检察
    getFourPie () {
      let fourPie = echarts.init(document.getElementById('fourPie'))
      let color = ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea']
      this.$http.post(this.$api.fourProsecution, { biz: this.accountMsg.biz })
        .then(res => {
          let datas = res.data.data
          let label = []
          datas.forEach(i => { label.push(i.name) })
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
                name: '四大检察',
                type: 'pie',
                radius: '50%',
                center: ['38%', '50%'],
                lineStyle: {
                  show: false
                },
                label: {

                  normal: {
                    show: true,
                    position: 'outside',
                    color: '#333',
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
          }
          fourPie.setOption(option)
          window.addEventListener('resize', function () {
            fourPie.resize()
          })
        })
        .catch(() => { })
    },
    // 十大业务
    getTenPie () {
      let tenPie = echarts.init(document.getElementById('tenPie'))
      let color = ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea']
      this.$http.post(this.$api.tenBusiness, { biz: this.accountMsg.biz })
        .then(res => {
          let datas = res.data.data
          let label = []
          datas.forEach(i => { label.push(i.name) })
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
                center: ['38%', '50%'],
                label: {
                  normal: {
                    show: true,
                    color: '#333',
                    position: 'outside',
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
          }
          tenPie.setOption(option)
          window.addEventListener('resize', function () {
            tenPie.resize()
          })
        })
        .catch(() => { })
    }
  },
  mounted () {
    this.getClassType()
    if (this.accountMsg.function_type === '检察') {
      this.getFourPie()
      this.getTenPie()
    } else {
      this.drawPie()
    }
    this.drawLine()
  },
  created () {
    this.accountId = this.$route.query.id
  },
  computed: {
    ...mapState({
      accountMsg: state => state.mutations.accountMsg
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../search.scss';
.table-box {
  margin-top: 70px;
}
.class-chart-line{
    width: 100%;
    height: 372px;
  }
</style>
