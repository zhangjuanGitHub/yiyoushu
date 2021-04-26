<!--
 * @Author: MaiChao
 * @Date: 2021-02-22 15:10:18
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-17 11:46:18
-->
<template>
  <div class="detail content-show">
    <div class="tabs-header flex-ali-center">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'AccountCompany' }">新媒体监测</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'WeekSearch', query: { type: 1 } }">周分析</el-breadcrumb-item>
        <el-breadcrumb-item>诊断历史</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="analysis-content">
      <div class="flex-bwt-center first">
        <div class="flex-left">
          <div class="flex-arr-center">
            <el-image style="width: 80px; height: 80px"
                      :src="userData.hdHeadImg"
                      fit="cover"></el-image>
            <div class="account-name">
              <p class="user-name">{{userData.nickname}}</p>
              <p class="account">{{userData.username}}</p>
              <p class="time">诊断时间:<span>{{userData.updateTime}}</span></p>
              <p class="time">报告采样时间范围:<span>{{userData.startDate}}~{{userData.endDate}}</span></p>
            </div>
          </div>
        </div>
        <div class="flex-center">
          <div id="pie-charts"></div>
          <!-- <p class="pie-ananly">超过<span>2.03%</span>的公众号</p> -->
        </div>
        <div class="flex-right">
          <div class="progress-box flex-ali-center">
            <span class="progress-name">基础资料</span>
            <el-progress :stroke-width="10"
                         v-if="firstData.basicnum"
                         :percentage="(firstData.basicnum/10*100)"
                         :format="format"
                         :color="customColors"></el-progress>
            <span class="progress-grade">{{firstData.basicnum}}分/10分</span>
          </div>
          <div class="progress-box flex-ali-center">
            <span class="progress-name">内容质量</span>
            <el-progress :stroke-width="10"
                         v-if="firstData.averageReadNum"
                         :percentage="(firstData.averageReadNum/30*100)"
                         :format="format"
                         :color="customColors"></el-progress>
            <span class="progress-grade">{{firstData.averageReadNum}}分/30分</span>
          </div>
          <div class="progress-box flex-ali-center">
            <span class="progress-name">影响力</span>
            <el-progress :stroke-width="10"
                         v-if="firstData.influenceNum"
                         :percentage="(firstData.influenceNum/30*100)"
                         :format="format"
                         :color="customColors"></el-progress>
            <span class="progress-grade">{{firstData.influenceNum}}分/30分</span>
          </div>
          <div class="progress-box flex-ali-center">
            <span class="progress-name">活跃度</span>
            <el-progress :stroke-width="10"
                         v-if="firstData.livenessNumCeil"
                         :percentage="(firstData.livenessNumCeil/30*100)"
                         :format="format"
                         :color="customColors"></el-progress>
            <span class="progress-grade">{{firstData.livenessNumCeil}}分/30分</span>
          </div>
        </div>
      </div>
      <div class="flex-bwt-center second">
        <div class="second-box flex-ali-center">
          <div class="circle color1">发文数</div>
          <div class="right-data">
            <p class="flex-ali-center"><span>发文总数</span> <i>{{this.listData.articleCountNum}}</i></p>
            <p class="flex-ali-center"><span>发文次数</span> <i>{{this.listData.limitNum}}</i></p>
          </div>
        </div>
        <div class="second-box flex-ali-center">
          <div class="circle color2">阅读数</div>
          <div class="right-data">
            <p class="flex-ali-center"><span>总阅读数</span> <i>{{this.listData.sumReadNum}}</i></p>
            <p class="flex-ali-center"><span>平均阅读数</span> <i>{{this.listData.averageReadNum}}</i></p>
          </div>
        </div>
        <div class="second-box flex-ali-center">
          <div class="circle color3">点赞数</div>
          <div class="right-data">
            <p class="flex-ali-center"><span>总点赞数</span><i>{{this.listData.sumPointNum}}</i></p>
            <p class="flex-ali-center"><span>平均点赞数</span> <i>{{this.listData.averagePointNum}}</i></p>
          </div>
        </div>
        <div class="second-box flex-ali-center">
          <div class="circle color4">转发数</div>
          <div class="right-data">
            <p class="flex-ali-center"><span>总转载数</span><i>{{this.listData.reprintArticleCountNum}}</i></p>
            <p class="flex-ali-center"><span>原创数</span> <i>{{this.listData.originalArticleCountNum}}</i></p>
          </div>
        </div>
        <div class="second-box flex-ali-center">
          <div class="circle color5">在看数</div>
          <div class="right-data">
            <p class="flex-ali-center"><span>总在看数</span> <i>{{this.listData.sumOldLikeNum}}</i></p>
            <p class="flex-ali-center"><span>平均在看数</span> <i>{{this.listData.averageOldLikeNum}}</i></p>
          </div>
        </div>
      </div>
      <div class="third">
        <third ref="third"></third>
      </div>
      <div class="fourth">
        <fourth ref="fourth"></fourth>
      </div>
      <div class="fifth">
        <fifth :tableData='tableData'
               @fatherMethod="findArtileList"
               ref="fifth"></fifth>
      </div>
      <div class="sixth">
        <sixth ref="sixth"></sixth>
      </div>
      <div class="seventh">
        <seventh ref="seventh"></seventh>
      </div>
    </div>
  </div>
</template>
<script>
import seventh from '../components/Seventh'
import sixth from '../components/Sixth'
import third from '../components/Third'
import fourth from '../components/Fourth'
import fifth from '../components/Fifth'
import echarts from 'echarts'
export default {
  data () {
    return {
      firstData: {},
      charsData: {},
      userData: {},
      tableData: [],
      pieData: [],
      progressData: {},
      listData: {},
      params: {
        publishTime: '',
        biz: '',
        isOrigin: ''
      },
      ids: '',
      customColors: [
        { color: '#e6a23c', percentage: 0 },
        { color: '#F04B43', percentage: 30 },
        { color: '#F8C61C', percentage: 60 },
        { color: '#1DC48B', percentage: 100 }
      ]
    }
  },
  created () {
    this.ids = this.$route.query.id
    this.getAnalyseList()
  },
  mounted () {
    // this.pieCharts()
  },
  methods: {
    // 获取个人||echarts数据
    getAnalyseList () {
      this.$http.get(this.$api.analyseList, { params: { id: 1 } })
        .then(res => {
          this.userData = res.data.data.account // 用户数据
          this.charsData = res.data.data.chart // 图表数据
          this.firstData = JSON.parse(this.charsData.accountScoreJson) // 首行数据
          console.log(this.firstData)
          this.listData = JSON.parse(this.charsData.articleDataJson) // 数据模块
          this.params.publishTime = this.userData.publishTime // 时间
          this.params.biz = this.userData.biz // 公众号标识id
          this.findArtileList()
          this.$refs.third.getArticleData(this.charsData) // 小时统计
          this.$refs.third.getArticleTime(this.charsData) // 时间统计
          this.$refs.fourth.getArticleTime(this.charsData) // 发文热词
          this.$refs.fourth.getArticleData(this.charsData) // 发文类别
          this.$refs.fifth.getArticleData(this.charsData) // 调用文章类别分析
          this.$refs.sixth.getArticleData(this.charsData) // 留言数据
          this.$refs.sixth.getArticleTime(this.charsData) // 留言词云
          this.$refs.seventh.getData(this.charsData) // 违规详情 小程序列表
          this.pieCharts()
        }).catch(() => { })
    },
    // 获取表格数据
    findArtileList (id) {
      this.params.isOrigin = id
      this.tableData = []
      this.$http.post(this.$api.findArtileList, this.params)
        .then(res => {
          this.tableData = res.data.data
        }).catch(() => { })
    },
    pieCharts () {
      let myChart = echarts.init(document.getElementById('pie-charts'))
      let option = {
        title: {
          text: this.firstData.sumScore + '分',
          textStyle: {
            color: '#000',
            fontSize: 18
          },
          subtext: '综合得分',
          subtextStyle: {
            color: '#666666',
            fontSize: 18
          },
          itemGap: 5,
          left: 'center',
          top: '36%'
        },
        angleAxis: {
          max: 100,
          clockwise: true, // 逆时针
          // 隐藏刻度线
          show: false
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false

          },
          axisTick: {
            show: false
          }
        },
        polar: {
          center: ['50%', '50%'],
          radius: '150%' // 图形大小
        },
        series: [{
          type: 'bar',
          data: [this.firstData.sumScore],
          showBackground: true,
          backgroundStyle: {
            color: '#bcbdbd'
          },
          coordinateSystem: 'polar',
          roundCap: true,
          barWidth: 10,
          itemStyle: {
            normal: {
              opacity: 1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#25BFFF'
              }, {
                offset: 1,
                color: '#5284DE'
              }]),
              shadowBlur: 1,
              shadowColor: '#2A95F9'
            }
          }
        }]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    format (percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    }
  },
  components: {
    third,
    fourth,
    fifth,
    sixth,
    seventh
  }
}
</script>
<style>
@import '../monitor.css';
</style>
<style scoped>
.analysis-content {
  background-color: #fff;
  padding: 20px;
}
.content-show {
  max-width: 1400px;
  margin: 28px auto;
}
.el-image {
  border-radius: 50%;
  margin-right: 18px;
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
.flex-left {
  padding: 18px 0;
}
#pie-charts {
  width: 140px;
  height: 140px;
}
.pie-ananly {
  width: 100%;
  text-align: center;
}
.pie-ananly span {
  font-size: 18px;
  font-weight: 700;
}
.flex-right {
  width: 45%;
}
.progress-box {
  height: 30px;
  line-height: 30px;
}
.progress-name,
.progress-grade {
  width: 80px;
}
.progress-box .el-progress {
  width: 75%;
}
.progress-grade {
  font-size: 12px;
  color: #bcbdbd;
}
.second {
  margin-top: 32px;
}
.second-box {
  background-color: #f7f8fa;
  width: 253px;
  height: 106px;
  padding: 15px;
  box-sizing: border-box;
}
.circle {
  width: 62px;
  height: 62px;
  text-align: center;
  line-height: 62px;
  border-radius: 50%;
  margin-right: 10px;
  color: #fff;
}
.right-data {
  width: 150px;
}
.right-data span {
  width: 70px;
  font-size: 14px;
  color: #6b798e;
  line-height: 35px;
}
.right-data i {
  display: inline-block;
  min-width: 80px;
  font-style: normal;
  width: 35px;
  text-align: center;
  font-size: 14px;
  color: #151c29;
  line-height: 35px;
}
.third {
  margin-top: 40px;
}
.seventh {
  margin-top: 40px;
}
</style>
