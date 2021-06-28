<!--
 * @Author: MaiChao
 * @Date: 2021-02-22 15:10:18
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-06-03 14:29:35
-->
<template>
  <div class="detail content-show">
    <div class="tabs-header flex-ali-center">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'AccountCompany' }">新媒体监测</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'BloggerAnalysis'}">账号分析</el-breadcrumb-item>
        <el-breadcrumb-item>微博分析详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="analysis-content">
      <div class="flex-bwt-center first">
        <div class="flex-left">
          <div class="flex-arr-center">
            <!-- <el-image style="width: 80px; height: 80px"
                      :src="userDataAll.url"
                      fit="cover" class="head-img"></el-image> -->

            <!-- <p class="user-name">{{userDataAll.name}}</p> -->
            <div class="nick_name">
              <div class="nick_name_con">
                <img :src="userDataAll.url"
                     alt=""
                     fit="cover"
                     style="width: 70px; height: 70px">
                <p>{{userDataAll.name}}</p>
              </div>

            </div>
            <div class="account-name">
              <!-- <p class="user-name">{{userData.nickname}}</p> -->
              <!-- <p class="account">{{userData.username}}</p> -->
              <p class="time">博主粉丝数:<span>{{userDataAll.num1}}</span></p>
              <p class="time">博主关注数:<span>{{userDataAll.num2}}</span></p>
              <p class="time">诊断时间:<span>{{userData2.createTime}}</span></p>
              <p class="time">报告采样时间范围:<span>{{userData2.startDate}}~{{userData2.endDate}}</span></p>
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
                         v-if="firstData.basicNum"
                         :percentage="(firstData.basicNum/10*100)"
                         :format="format"
                         :color="customColors"></el-progress>
            <span class="progress-grade">{{firstData.basicNum}}分/10分</span>
          </div>
          <div class="progress-box flex-ali-center">
            <span class="progress-name">内容质量</span>
            <el-progress :stroke-width="10"
                         v-if="firstData.contetnQualityNum"
                         :percentage="(firstData.contetnQualityNum/30*100)"
                         :format="format"
                         :color="customColors"></el-progress>
            <span class="progress-grade">{{firstData.contetnQualityNum}}分/30分</span>
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
                         v-if="firstData.livenessNum"
                         :percentage="(firstData.livenessNum/30*100)"
                         :format="format"
                         :color="customColors"></el-progress>
            <span class="progress-grade">{{firstData.livenessNum}}分/30分</span>
          </div>
        </div>
      </div>
      <div class="flex-bwt-center second">
        <!-- <div class="second-box flex-ali-center second-box1 " >
          <div class="circle color1">发文数</div>
          <div class="right-data">
            <p class="flex-ali-center"><span>发文总数</span> <i>{{this.listData.articleCountNum}}</i></p>
            <p class="flex-ali-center"><span>发文次数</span> <i>{{this.listData.limitNum}}</i></p>
          </div>
        </div> -->
        <div class="second-box flex-ali-center second-box1 ">
          <div class="right-data">
            <p class="second-box-num flex-ali-center">{{this.secondData.dayNum}}</p>
            <p class="second-box-title flex-ali-center">发博天数</p>
          </div>
          <div class="icon_div">
            <img :src="fbts"
                 alt="">
          </div>
        </div>
        <div class="second-box flex-ali-center second-box2">
          <div class="right-data">
            <p class="second-box-num flex-ali-center">{{this.secondData.articleCountNum}}</p>
            <p class="second-box-title flex-ali-center">发博数</p>
          </div>
          <div class="icon_div">
            <img :src="fb"
                 alt="">
          </div>
        </div>
        <div class="second-box flex-ali-center second-box3">
          <div class="right-data">
            <p class="second-box-num flex-ali-center">{{this.secondData.commentsCountNumSum}}</p>
            <p class="second-box-title flex-ali-center">评论数</p>
          </div>
          <div class="icon_div">
            <img :src="pl"
                 alt="">
          </div>
        </div>
        <div class="second-box flex-ali-center second-box4">
          <div class="right-data">
            <p class="second-box-num flex-ali-center">{{this.secondData.attitudesCountNumSum}}</p>
            <p class="second-box-title flex-ali-center">点赞数</p>
          </div>
          <div class="icon_div">
            <img :src="dz"
                 alt="">
          </div>
        </div>
        <div class="second-box flex-ali-center second-box5">
          <div class="right-data">
            <p class="second-box-num flex-ali-center">{{this.secondData.repostsCountNumSum}}</p>
            <!-- <p class="second-box-num flex-ali-center">222222222</p> -->
            <p class="second-box-title flex-ali-center">转发数</p>
          </div>
          <div class="icon_div">
            <img :src="zf"
                 alt="">
          </div>
        </div>
      </div>
      <!-- <div class="third">
        <fourth ref="Third"></fourth>
      </div> -->
      <div class="eight">
        <eight ref="EighthWb"></eight>
      </div>
      <div class="ninth">
        <ninth ref="NinthWb"></ninth>
      </div>
      <!-- <div class="fifth">
        <fifth :tableData='tableData'
               @fatherMethod="findArtileList"
               ref="fifth"></fifth>
      </div> -->
      <div class="tenth">
        <tenth :tableData='tableData'
               @fatherMethod="findArtileList"
               ref="TenthWb"></tenth>
        <!-- <tenth ref="TenthWb"></tenth> -->
        <!-- <el-pagination @current-change="handleCurrentChange"
                       background
                       :pager-count="5"
                       layout="total, prev, pager, next, jumper"
                       :page-size="ruleForm.pageSize"
                       :current-page.sync="ruleForm.pageNum"
                       :hide-on-single-page="total<=params.pageSize"
                       :total="total2">
        </el-pagination> -->
        <el-pagination @size-change="handleSizeChange"
                       background
                       :small="true"
                       @current-change="handleCurrentChange"
                       :current-page.sync="params.pageNum"
                       :page-size="params.pageSize"
                       layout="prev, pager, next, jumper"
                       :total="total" class="page-div" v-if="total > 5">
        </el-pagination>
      </div>
      <div id="eleventh-div">
        <eleventh ref="EleventhWb"
                  :tableData2='tableData2'
                  @fatherMethod2="findArtileList2" class="eleventh"></eleventh>
      </div>
      <!-- <div class="sixth">
        <sixth ref="sixth"></sixth>
      </div> -->
      <!-- <div class="seventh">
        <seventh ref="seventh"></seventh>
      </div> -->
      <!-- <div class="twelfth">
        <twelfth ref="TwelfthWb"></twelfth>
      </div> -->
      <div class="thirteenth">
        <thirteenth ref="ThirteenthWb"></thirteenth>
      </div>
    </div>
  </div>
</template>
<script>
import eight from '../components/EighthWb'
import ninth from '../components/NinthWb'
import tenth from '../components/TenthWb'
import eleventh from '../components/EleventhWb'
// import twelfth from '../components/Twelfth'
import thirteenth from '../components/Thirteenth'
// import fifth from '../components/Fifth'
// import sixth from '../components/Sixth'
// import seventh from '../components/Seventh'
import echarts from 'echarts'
export default {
  data () {
    return {
      fbts: require('@/assets/images/monitor/fbts.png'),
      fb: require('@/assets/images/monitor/fb.png'),
      pl: require('@/assets/images/monitor/pl.png'),
      dz: require('@/assets/images/monitor/dz.png'),
      zf: require('@/assets/images/monitor/zf.png'),
      userDataAll: {},
      firstData: {},
      secondData: {}, // 发博天数,发博数等
      zhData: '',
      charsData: {},
      userData: {},
      userData2: {},
      tableData: [],
      tableData2: [],
      fansList: [],
      pieData: [],
      progressData: {},
      listData: {},
      params: {
        // publishTime: '',
        id: '',
        // isOrigin: '',
        pageNum: 1,
        pageSize: 5
      },
      params2: {
        // publishTime: '',
        id: '',
        // isOrigin: '',
        pageNum: 1,
        pageSize: 3,
        sortDirection: 'desc',
        sortField: 'attitudes_count'
      },
      ids: '',
      customColors: [
        { color: '#e6a23c', percentage: 0 },
        { color: '#F04B43', percentage: 30 },
        { color: '#F8C61C', percentage: 60 },
        { color: '#1DC48B', percentage: 100 }
      ],
      total: 0
    }
  },
  created () {
    this.ids = this.$route.query.id
    this.params.id = this.$route.query.id
    this.params2.id = this.$route.query.id
    this.getAnalyseList()
  },
  mounted () {
    // this.pieCharts()
  },
  methods: {
    // pagingChange (query) {
    //   console.log(query)
    //   // this.params.pageSize = query.size
    //   this.params.pageNum = query.page
    //   this.findArtileList()
    // },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.params.pageNum = val
      this.findArtileList()
    },
    // 获取个人||echarts数据
    getAnalyseList () {
      this.$http.get(this.$api.analyseDetailWb, { params: { id: this.ids } })
        .then(res => {
          // console.log(res.data.data)
          this.userDataAll = res.data.data
          this.userData2 = res.data.data.frontAnalyseNumber
          this.firstData = JSON.parse(this.userDataAll.chartNo1) // 首行数据
          this.pieCharts()
          this.secondData = JSON.parse(this.userDataAll.chartNo2) // 发博天数等
          this.$refs.EighthWb.getArticleData(this.userDataAll.chartNo3) // 发博趋势

          this.$refs.EighthWb.getCommentsData(this.userDataAll.chartNo9) // 粉丝趋势

          this.$refs.NinthWb.getArticleData(this.userDataAll.chartNo5) // 发博时间分布
          this.$refs.NinthWb.getArticleTime(this.userDataAll.chartNo6) // 原创占比
          this.findArtileList()
          this.$refs.TenthWb.getArticleData(this.userDataAll.chartNo7) // 微博内容占比
          this.findArtileList2('attitudes_count')
          // this.$refs.TwelfthWb.getArticleData(this.userDataAll.chartNo8) // 热词

          this.$refs.ThirteenthWb.getArticleTime(this.userDataAll.chartNo8) // 热词
          this.$refs.ThirteenthWb.getArticleData(this.userDataAll.chartNo4) // 评论数
        }).catch(() => { })
    },
    // 获取表格数据
    findArtileList (id) {
      // console.log(111)
      // this.params.isOrigin = id
      // this.params.publishTime[0] = this.userData2.startDate
      // this.params.publishTime[1] = this.userData2.endDate
      // console.log(this.params)
      this.tableData = []
      this.$http.post(this.$api.findArticleBehavioralData, this.params)
        .then(res => {
          // console.log(res.data.data)
          this.tableData = res.data.data.list
          this.total = res.data.data.count
          // console.log(this.tableData)
        }).catch(() => { })
    },
    // 获取表格数据 文章列表
    findArtileList2 (type) {
      // console.log(type)
      // this.params.isOrigin = id
      // this.params.publishTime[0] = this.userData2.startDate
      // this.params.publishTime[1] = this.userData2.endDate
      this.params2.sortField = type
      // console.log(this.params)

      this.tableData2 = []
      this.$http.post(this.$api.findArticleBehavioralData, this.params2)
        .then(res => {
          // console.log(res.data.data)
          this.tableData2 = res.data.data.list
        }).catch(() => { })
    },
    // 获取粉丝趋势
    getFans () {
      this.fansList = []
      this.$http.post(this.$api.getFansTrend, { uid: this.ids })
      // this.$http.post(this.$api.getFansTrend, { uid: 5217409150 })
        .then(res => {
          console.log(res.data.data)
          this.fansList = res.data.data
        }).catch(() => { })
    },
    pieCharts () {
      // console.log(this.userData2)
      let myChart = echarts.init(document.getElementById('pie-charts'))
      let option = {
        title: {
          text: this.userData2.analyseScore + '分',
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
          data: [this.userData2.analyseScore],
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
    eight,
    ninth,
    tenth,
    eleventh,
    // twelfth,
    thirteenth
    // fifth,
    // sixth,
    // seventh
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
  box-sizing: border-box;
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
  /* background-color: #f7f8fa; */
  width: 253px;
  height: 106px;
  /* padding: 15px; */
  box-sizing: border-box;
  position: relative;
}
.second-box1 {
  background-color: #5f96f3;
  border-radius: 5px;
}
/* .second-box div{
  display: block;
} */
.second-box2 {
  background-color: #ffc154;
  border-radius: 5px;
}
.second-box3 {
  background-color: #4caf50;
  border-radius: 5px;
}
.second-box4 {
  background-color: #f54336;
  border-radius: 5px;
}
.second-box5 {
  background-color: #af4cae;
  border-radius: 5px;
}
.circle {
  /* width: 62px; */
  /* height: 62px; */
  text-align: center;
  line-height: 62px;
  border-radius: 50%;
  margin-right: 10px;
  color: #fff;
}
.second-box-title {
  color: #fff;
  font-size: 14px;
}
.second-box-num {
  font-size: 30px;
  color: #ffffff;
}
.right-data {
  width: 147px;
}

.right-data p {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
/* .right-data span {
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
} */
.eight {
  margin-top: 40px;
}
.seventh {
  margin-top: 40px;
}
</style>
<style lang="scss" scoped>
/* 5.25 */
.icon_div {
  width: 106px;
  height: 106px;
  /* opacity: 0.05; */
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 0;
  z-index: 1;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}
.icon_div img {
  position: absolute;
  z-index: 999;
  margin-top: 20px;
  margin-left: 20px;
}
.nick_name {
  margin-right: 15px;
  font-size: 16px;
  // width: 100%;
  text-align: center;
}
.nick_name_con img {
  // text-align: center;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
}
.account-name {
  margin-left: 15px;
}
.page-div {
  // height: 200px;
  width: 600px;
  // margin-top:-30px;
  // margin-bottom:10px;
  text-align: center;
}
#eleventh{
  // margin-top:-20px;
  // width: 600px;
}
</style>
