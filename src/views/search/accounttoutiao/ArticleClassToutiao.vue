<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-29 14:18:52
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-08-02 15:26:38
-->
<template>
  <div class="search-material-wrap">
    <!-- <div class="echarts-box"
         v-show="this.accountToutiaoMsg.function_type==='检察'">
      <div class="search-class-chart flex-bwt-center">
        <div class="class-chart-left"
             id="fourPie"></div>
        <div class="class-chart-right"
             id="tenPie"></div>
      </div>
      <div class="class-chart-line"
           id="fourLine"></div>
    </div> -->
    <div class="search-material-up"
         v-show="this.accountToutiaoMsg.function_type!=='检察'">
      <p class="search-mater-theme">文章类别占比</p>
    </div>
    <div class="search-class-chart flex-bwt-center"
         v-show="this.accountToutiaoMsg.function_type!=='检察'">
      <div class="class-chart-left"
           id="myPie"></div>
      <!-- <div class="class-chart-right"
           id="myLine"></div> -->
      <!-- <ul class="wb-rules-about"
          v-if="this.releaseList.length > 0">
        <li class="flex-all-center">
          <p v-for="(item,index) in this.releaseList" :key="index">{{item.name}}</p>
        </li>
        <li class="flex-all-center">
          <p v-for="(item2,index2) in this.releaseList" :key="index2" :style="{color:item2.color}">{{item2.value}}</p>
        </li>
        <li class="flex-all-center">
          <p v-for="(item3,index3) in this.releaseList" :key="index3">{{item3.percent + '%'}}</p>
        </li>
      </ul> -->
      <!-- <div class="table"> -->
      <table cellspacing="0"
             aligin="center"
             v-if="this.releaseList.length > 0">
        <tr>
          <th v-for="(item,index) in releaseList"
              :key="index">{{item.name}}</th>
        </tr>
        <tr>
          <td v-for="(item2,index2) in releaseList"
              :key="index2"><span :style="{color:item2.color}">{{item2.value}}</span>篇</td>
        </tr>
        <tr>
          <td v-for="(item3,index3) in releaseList"
              :key="index3">{{item3.percent + '%'}}</td>
        </tr>
      </table>
      <!-- </div> -->

    </div>
    <div class="search-material-up">
      <p class="search-mater-theme">发文趋势</p>
    </div>
    <div class="search-class-chart flex-bwt-center"
         v-show="this.accountToutiaoMsg.function_type!=='检察'">
      <div class="class-chart-line2"
           id="myLine2"></div>
    </div>
    <div class="search-material-up flex-ali-center">
      <p class="search-mater-theme">头条列表</p>
       <el-input v-model="queryText"
                size="small"
                class="toutiao-his-list"
                placeholder="请输入关键词">
      </el-input>
      <el-button type="primary" @click="searchData" size="small">搜索</el-button>
    </div>
    <div class="flex-ali-center morehot-tab-head">
      <!-- <p :class="{'is-class': classActive === item}"
         @click="changeClassTab(item)"
         v-for="(item, index) of accountClass"
         :key="index">{{item}}</p> -->
      <p style="display:inline-block">
        <span :class="{ 'sort_active': classActive === '' }"
              @click="changetypeActive('')"
              v-html="'全部('+num.all+')'"></span>
        <span :class="{ 'sort_active': classActive === 0 }"
              @click="changetypeActive(0)"
              v-html="'文章('+num.article+')'"></span>
        <span :class="{ 'sort_active': classActive === 1 }"
              @click="changetypeActive(1)"
              v-html="'视频('+num.video+')'"></span>
        <span :class="{ 'sort_active': classActive === 2 }"
              @click="changetypeActive(2)"
              v-html="'小视频('+num.smallVideo+')'"></span>
        <span :class="{ 'sort_active': classActive === 3 }"
              @click="changetypeActive(3)"
              v-html="'微头条('+num.headlines+')'"></span>
      </p>
      <!-- <div class=""
           style="display:inline-block;float:right">
        <el-input v-model="queryText"
                  size="small"
                  class="wb-his-list"
                  placeholder="请输入关键词"
                  style="width:150px">
        </el-input>
        <el-button type="primary"
                   @click="searchData"
                   size="small">搜索</el-button>
      </div> -->
    </div>
    <div class="table-box">
      <el-table :data="classData"
                style="width: 100%">
        <el-table-column label="序号"
                         width="80">
          <template slot-scope="scope">
            <!-- {{(pageBean.pageNum - 1) * pageBean.pageSize + (scope.$index + 1)}} -->
            {{scope.$index +1}}
          </template>
        </el-table-column>
        <el-table-column prop="title"
                         label="文章标题"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <p @click="targetUrl(scope.row)"
               class="cursor">{{scope.row.title}}</p>
            <!-- <p @click="targetUrl(scope.row.item_id)"
               class="cursor">{{scope.row.title}}</p> -->
          </template>
        </el-table-column>
        <el-table-column prop="publish_time"
                         label="发布时间"
                         width="160">
        </el-table-column>
        <el-table-column prop="digg_count"
                         label="点赞数"
                         width="140"
                         sortable>
        </el-table-column>
        <el-table-column prop="comment_count"
                         label="评论数"
                         width="140"
                         sortable>
        </el-table-column>
        <el-table-column prop="forward_count"
                         label="转发数"
                         width="140"
                         sortable>
        </el-table-column>
        <el-table-column prop="play_count"
                         label="播放次数"
                         width="140"
                         sortable>
        </el-table-column>

      </el-table>
      <p class="flex-all-center more-btn"
       v-if="isMore"><span class="primary cursor"
            @click="getMore">点击加载更多</span></p>
    </div>
    <!-- <set-page @pagingChange="pagingChange"
              :total="total.count"
              ref="child"></set-page> -->

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
      accountClass: [],
      releaseTotal: 0,
      releaseList: [],
      queryText: '',
      num: { // 获取头条列表数量
        all: 0, // 全部
        headlines: 0, // 微头条
        article: 0, // 文章数
        video: 0, // 视频数
        smallVideo: 0// 小视频
      },
      isMore: false
    }
  },
  methods: {
    // 切换文章类型
    // changeClassTab (tab) {
    //   this.classActive = tab
    //   this.pageBean.pageNum = 1
    //   this.$refs.child.handleCurrentChange(1)
    //   this.classData = []
    //   // this.getClassArticle()
    // },
    changetypeActive (tab) {
      this.classActive = tab
      this.pageBean.pageNum = 1
      this.queryText = ''
      this.classData = []
      this.isMore = false
      this.getClassArticle()
    },
    pagingChange (query) {
      this.pageBean.pageSize = query.size
      this.pageBean.pageNum = query.page
      this.classData = []
      this.getClassArticle()
    },
    targetUrl (row) {
      window.open(row.display_url)
      // let route = this.$router.resolve({ name: 'ArticleAnalyseToutiao', query: { accountId: this.accountId, articleId: id } })
      // window.open(route.href, '_blank')
    },
    searchData () {
      this.pageBean.pageNum = 1
      this.classData = []
      // if (this.queryText) {
      //   this.classData = []
      // }
      this.getClassArticle()
    },
    // 获取文章发布类别占比
    drawPie () {
      this.$http.post(this.$api.ttTypeRatio, { userId: this.accountToutiaoMsg.user_id }) // 0 ： 文章  1 视频 2 ：小视频 3 微头条
        .then(res => {
          let datas = res.data.data
          // console.log(datas)
          // this.releaseTotal = datas[0].value + datas[1].value + datas[2].value + datas[3].value
          for (var j = 0; j < datas.length; j++) {
            this.releaseTotal += datas[j].value
          }
          console.log(this.releaseTotal)
          let color = ['#54C7FC', '#FFB54D', '#FF7466', '#44DB5E', '#4D9FFF', '#FFD300']
          for (var i = 0; i < datas.length; i++) {
            // datas[i].percent = ((datas[i].value / this.releaseTotal) * 100).toFixed(1)
            datas[i].percent = ((datas[i].value / this.releaseTotal) * 100).toFixed(0)
            datas[i].color = color[i]
            if (datas[i].name == '0') {
              datas[i].name = '文章'
            } else if (datas[i].name == '1') {
              datas[i].name = '视频'
            } else if (datas[i].name == '2') {
              datas[i].name = '小视频'
            } else {
              datas[i].name = '微头条'
            }
          }
          // console.log(this.releaseTotal)
          this.releaseList = datas
          // console.log(this.releaseList)

          let myPie = echarts.init(document.getElementById('myPie'))

          myPie.setOption({
            color: color,
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              right: 0,
              top: 'center',
              itemWidth: 5,
              itemHeight: 5
            },
            series: [
              {
                name: '发布频次',
                type: 'pie',
                radius: ['55%', '85%'],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: 'center',
                  formatter: '{c}篇'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '16'
                  }
                },
                labelLine: {
                  show: false
                },
                data: this.releaseList
              }
            ]
          })
        }).catch(() => { })
    },
    // 获取近30天内发文数
    drawLine () {
      this.$http.post(this.$api.ttDailyNumberOfPapers, { userId: this.accountToutiaoMsg.user_id })
        .then(res => {
          // 基于准备好的dom，初始化echarts实例
          // let chartId = this.accountToutiaoMsg.function_type === '检察' ? 'fourLine' : 'myLine'
          let chartId = this.accountToutiaoMsg.function_type === '检察' ? 'fourLine' : 'myLine2'
          let myChart = echarts.init(document.getElementById(chartId))
          // 绘制图表
          let option = {
            title: {
              text: '发文趋势',
              x: 'center'
            },
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
          myChart.setOption(option)
          window.addEventListener('resize', function () {
            myChart.resize()
          })
        }).catch(() => { })
    },
    // 获取文章类型
    getClassType () {
      // console.log(this.accountToutiaoMsg)
      // if (this.accountToutiaoMsg.function_type === '检察') {
      //   this.accountClass = ['全部', '刑事检察', '民事检察', '行政检察', '公益诉讼检察', '综合', '其他']
      //   this.classActive = this.accountClass[0]
      //   this.getClassArticle()
      // } else {
      //   this.$http.get(`${this.$api.getWxClass}/${this.accountToutiaoMsg.biz}`)
      //     .then(res => {
      //       res.data.data.unshift('全部')
      //       this.accountClass = res.data.data
      //       this.classActive = this.accountClass[0]
      //       this.getClassArticle()
      //     }).catch(() => { })
      // }
      // this.accountClass = ['全部', '文章', '视频', '小视频', '微头条']
      // this.classActive = this.accountClass[0]
      this.getClassArticle()
    },
    getMore () {
      this.pageBean.pageNum++
      this.getClassArticle()
    },
    // 根据类型获取文章
    getClassArticle () {
      let obj = {}
      // if (this.accountToutiaoMsg.function_type === '检察') {
      //   obj = {
      //     biz: this.accountToutiaoMsg.biz,
      //     procuratorialType: this.classActive,
      //     type: '',
      //     pageBean: {
      //       pageSize: this.pageBean.pageSize,
      //       pageNum: (this.pageBean.pageNum - 1) * this.pageBean.pageSize + 1
      //     }
      //   }
      // } else {
      //   obj = {
      //     biz: this.accountToutiaoMsg.biz,
      //     type: this.classActive,
      //     pageBean: {
      //       pageSize: this.pageBean.pageSize,
      //       pageNum: (this.pageBean.pageNum - 1) * this.pageBean.pageSize + 1
      //     }
      //   }
      // }
      obj = {
        userId: this.accountToutiaoMsg.user_id,
        queryText: this.queryText,
        // procuratorialType: this.classActive,
        type: this.classActive,
        // pageNum: this.pageBean.pageNum,
        // pageSize: this.pageBean.pageSize
        pageBean: {
          pageSize: this.pageBean.pageSize,
          pageNum: (this.pageBean.pageNum - 1) * this.pageBean.pageSize + 1
        }
      }
      // console.log(this.classActive)
      // if (this.classActive == '全部') {
      //   obj.type = ''
      // } else if (this.classActive == '文章') {
      //   obj.type = '0'
      // } else if (this.classActive == '视频') {
      //   obj.type = '1'
      // } else if (this.classActive == '小视频') {
      //   obj.type = '2'
      // } else {
      //   obj.type = '3'
      // }

      this.$http.post(this.$api.queryTtArticleByUserIdAndType, obj)
        .then(res => {
          let datas = res.data.data
          let count = res.data.data.shift()
          // console.log(count)
          if (datas.length > 0) {
            this.classData.push(...datas)
            // console.log(this.pageNum * this.pageSize, count.count, this.pageNum * this.pageSize < count.count)
            if (this.pageBean.pageNum * this.pageBean.pageSize < count.count) {
              this.isMore = true
            } else {
              this.isMore = false
            }
          } else {
            this.classData = []
          }
          // if (res.data.data.length > 0) {
          //   this.total = res.data.data.shift()
          //   this.classData = res.data.data
          // } else {
          //   this.total = { count: 0 }
          //   this.classData = []
          // }
        }).catch(() => { })
    },
    // 获取头条列表数量
    getToutiaoNum () {
      let obj = {
        userId: this.accountToutiaoMsg.user_id
      }
      // console.log(obj)
      this.$http.post(this.$api.ttProportionOfTypes, obj)
        .then(res => {
          if (res.data.data.all) {
            this.num = res.data.data
            // console.log(this.num)
          } else {
            this.num = {
              all: 0, // 全部
              headlines: 0, // 微头条
              article: 0, // 文章数
              video: 0, // 视频数
              smallVideo: 0// 小视频
            }
          }
        }).catch(() => { })
    },
    // 四大检察
    getFourPie () {
      let fourPie = echarts.init(document.getElementById('fourPie'))
      let color = ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea']
      this.$http.post(this.$api.fourProsecution, { biz: this.accountToutiaoMsg.biz })
        .then(res => {
          let datas = res.data.data
          let label = []
          datas.forEach(i => { label.push(i.name) })
          let option = {
            title: {
              text: '四大检察',
              x: 'center',
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
      this.$http.post(this.$api.tenBusiness, { biz: this.accountToutiaoMsg.biz })
        .then(res => {
          let datas = res.data.data
          let label = []
          datas.forEach(i => { label.push(i.name) })
          let option = {
            title: {
              text: '十大业务',
              x: 'center',
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
    if (this.accountToutiaoMsg.function_type === '检察') {
      this.getFourPie()
      this.getTenPie()
    } else {
      this.drawPie()
    }
    this.drawLine()
  },
  created () {
    this.accountId = this.$route.query.id
    this.getToutiaoNum()
  },
  computed: {
    ...mapState({
      accountToutiaoMsg: state => state.mutations.accountToutiaoMsg
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../search.scss';
.table-box {
  margin-top: 30px;
  min-height: 400px;
}
.class-chart-line {
  width: 100%;
  height: 372px;
}
.class-chart-line2 {
  width: 100%;
  height: 372px;
}
.table {
  width: 98%;
  /* background: cadetblue; */
  /* text-align: center; */
  /* margin: 0 auto; */
}
table {
  border: 1px solid #e9e9e9;
  /* width: 440px; */
  width: 45%;
  height: 140px;
  margin: 0 auto;
}
th {
  border: 1px solid #e9e9e9;
  /* text-align: center; */
}
td {
  border: 1px solid #e9e9e9;
  text-align: center;
}
td span {
  margin-right: 5px;
}
.yc {
  font-size: 18px;
  margin-right: 5px;
  color: #73c0de;
}
.zf {
  color: #fac858;
  font-size: 18px;
  margin-right: 5px;
}
.more-btn{
  margin-top:20px;
}
.toutiao-his-list{
  width:200px;
  margin-left:20px;
}
</style>
