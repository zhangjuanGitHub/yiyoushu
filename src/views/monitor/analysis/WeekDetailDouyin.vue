<!--
 * @Author: MaiChao
 * @Date: 2021-02-22 15:10:18
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-08-04 17:09:27
-->
<template>
  <div class="detail content-show">
    <div class="tabs-header flex-ali-center">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'AccountCompany' }">新媒体监测</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'ToutiaoAnalysis'}">账号分析</el-breadcrumb-item>
        <el-breadcrumb-item>抖音分析详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="analysis-content">
      <div class="outside-div">
        <div class="flex-bwt-center first bac">
          <div class="flex-left"
               style="width:20%">
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
                       style="width: 70px; height: 70px;border-radius:5px">
                  <p class="account_name">{{userDataAll.name}}</p>
                  <p class="account_id">抖音号:52645886</p>
                  <p class="mar_p"><img :src="rz"
                         style="width:19px;height:19px;margin-bottom:-5px;margin-right:3px;"><span class="word_color">央视新闻官方抖音号</span></p>
                  <!-- <p>收藏抖音号</p> -->
                  <p class="mar_p">
                    <img src="@/assets/images/home/collect_1.png"
                         alt=""
                         style="width:15px;height:15px;margin-bottom:-3px;margin-right:3px;">
                    <span class="word_color">收藏抖音号</span>
                  </p>
                  <!-- <div class="search-left-act">
                    <div class="flex-ali-center">
                      <img v-if="accountToutiaoMsg.is_follow === 0"
                           @click="submitCollect(1)"
                           src="@/assets/images/home/collect_1.png"
                           alt="">
                      <img v-else-if="accountToutiaoMsg.is_follow === 1"
                           @click="submitCollect(0)"
                           src="@/assets/images/home/collect_2.png"
                           alt="">
                      <p>收藏</p>
                    </div>
                  </div> -->
                </div>
              </div>
              <div class="line_div"></div>
            </div>

          </div>
          <div class="flex-right"
               style="width:80%">
            <div class="account-name">
              <p>易有数分类:<span class="time">时事</span>诊断时间:2021-01-30 08:00:00</p>
              <p>标签:<span class="time">法律,政法机关</span>报告采样时间范围:2021-01-06~2021-01-21</p>
              <p>纳入易有数样本库:<span class="time">2020/12/30</span></p>
              <p>简介:<span class="time">最高人民检察院是最高检察机关,领导地方各级人民检察院和专门人民检察院的工作.</span></p>
              <!-- <p class="time">粉丝数:<span>{{userDataAll.num1}}</span></p> -->
              <!-- <p class="time">关注数:<span>{{userDataAll.num2}}</span></p> -->
              <!-- <p class="time">诊断时间:<span>{{userData2.createTime}}</span></p> -->
              <!-- <p class="time">报告采样时间范围:<span>{{userData2.startDate}}~{{userData2.endDate}}</span></p> -->
            </div>
            <div class="flex-bwt-center second bac">
              <!-- <div class="second-box flex-ali-center second-box1 " >
          <div class="circle color1">发文数</div>
          <div class="right-data">
            <p class="flex-ali-center"><span>发文总数</span> <i>{{this.listData.articleCountNum}}</i></p>
            <p class="flex-ali-center"><span>发文次数</span> <i>{{this.listData.limitNum}}</i></p>
          </div>
        </div> -->
              <div class="second-box flex-ali-center">
                <div class="icon_div">
                  <img :src="fss"
                       alt="">
                </div>
                <div class="right-data">
                  <p class="second-box-num flex-ali-center second-box1">3369</p>
                  <p class="second-box-title flex-ali-center">粉丝数</p>
                </div>
              </div>
              <div class="second-box flex-ali-center ">
                <div class="icon_div">
                  <img :src="dzs"
                       alt="">
                </div>
                <div class="right-data">
                  <p class="second-box-num flex-ali-center second-box2">3369</p>
                  <p class="second-box-title flex-ali-center">点赞数</p>
                </div>
              </div>
              <div class="second-box flex-ali-center">
                <div class="icon_div">
                  <img :src="zps"
                       alt="">
                </div>
                <div class="right-data">
                  <p class="second-box-num flex-ali-center second-box3">3369</p>
                  <p class="second-box-title flex-ali-center">作品数</p>
                </div>
              </div>
              <div class="second-box flex-ali-center">
                <div class="icon_div">
                  <img :src="yzs"
                       alt="">
                </div>
                <div class="right-data">
                  <p class="second-box-num flex-ali-center second-box4">3369</p>
                  <p class="second-box-title flex-ali-center">易指数</p>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="flex-right">
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
        </div> -->
        </div>
      </div>

      <!-- <div class="flex-bwt-center second bac">
        <div class="second-box flex-ali-center second-box1 ">
          <div class="right-data">
            <p class="second-box-num flex-ali-center">{{this.secondData.articleCountNum}}</p>
            <p class="second-box-title flex-ali-center">发文数</p>
          </div>
          <div class="icon_div">
            <img :src="fbts"
                 alt="">
          </div>
        </div>
        <div class="second-box flex-ali-center second-box2">
          <div class="right-data">
            <p class="second-box-num flex-ali-center">{{this.secondData.readCountNumSum}}</p>
            <p class="second-box-title flex-ali-center">阅读数</p>
          </div>
          <div class="icon_div">
            <img :src="fb"
                 alt="">
          </div>
        </div>
        <div class="second-box flex-ali-center second-box3">
          <div class="right-data">
            <p class="second-box-num flex-ali-center">{{this.secondData.commentCountNumSum}}</p>
            <p class="second-box-title flex-ali-center">评论数</p>
          </div>
          <div class="icon_div">
            <img :src="pl"
                 alt="">
          </div>
        </div>
        <div class="second-box flex-ali-center second-box4">
          <div class="right-data">
            <p class="second-box-num flex-ali-center">{{this.secondData.diggCountNumSum}}</p>
            <p class="second-box-title flex-ali-center">点赞数</p>
          </div>
          <div class="icon_div">
            <img :src="dz"
                 alt="">
          </div>
        </div>
        <div class="second-box flex-ali-center second-box5">
          <div class="right-data">
            <p class="second-box-num flex-ali-center">{{this.secondData.forwardCountNumSum}}</p>
            <p class="second-box-title flex-ali-center">转发数</p>
          </div>
          <div class="icon_div">
            <img :src="zf"
                 alt="">
          </div>
        </div>
      </div> -->
      <!-- <div class="third">
        <fourth ref="Third"></fourth>
      </div> -->
      <div class="eight bac">
        <eight ref="EighthDouyin"
               :tableData='tableData'
               @fatherMethod="findArtileList"></eight>
        <el-pagination @size-change="handleSizeChange"
                       background
                       :small="true"
                       @current-change="handleCurrentChange"
                       :current-page.sync="params.pageNum"
                       :page-size="params.pageSize"
                       layout="prev, pager, next, jumper"
                       :total="total"
                       class="page-div"
                       v-if="total > 5">
        </el-pagination>
      </div>
      <div class="ninth bac">
        <ninth ref="NinthDouyin"></ninth>
      </div>
      <!-- <div class="fifth">
        <fifth :tableData='tableData'
               @fatherMethod="findArtileList"
               ref="fifth"></fifth>
      </div> -->
      <!-- <div class="tenth">
        <tenth :tableData='tableData'
               @fatherMethod="findArtileList"
               ref="TenthWb"></tenth>
        <el-pagination @size-change="handleSizeChange"
                       background
                       :small="true"
                       @current-change="handleCurrentChange"
                       :current-page.sync="params.pageNum"
                       :page-size="params.pageSize"
                       layout="prev, pager, next, jumper"
                       :total="total" class="page-div" v-if="total > 5">
        </el-pagination>
      </div> -->
      <!-- <div id="eleventh-div"
           class="bac">
        <eleventh ref="EleventhWb"
                  :tableData2='tableData2'
                  @fatherMethod2="findArtileList2"
                  class="eleventh"></eleventh>
      </div> -->
      <!-- <div class="sixth">
        <sixth ref="sixth"></sixth>
      </div> -->
      <!-- <div class="seventh">
        <seventh ref="seventh"></seventh>
      </div> -->
      <!-- <div class="twelfth">
        <twelfth ref="TwelfthWb"></twelfth>
      </div> -->
      <!-- <div class="thirteenth bac">
        <thirteenth ref="ThirteenthWb"></thirteenth>
      </div> -->
    </div>
  </div>
</template>
<script>
import eight from '../components/EighthDouyin'
import ninth from '../components/NinthDouyin'
import echarts from 'echarts'
export default {
  data () {
    return {
      rz: require('@/assets/images/monitor/rz_douyin.png'),
      fss: require('@/assets/images/monitor/fss_2.png'),
      dzs: require('@/assets/images/monitor/dzs_2.png'),
      zps: require('@/assets/images/monitor/zps_2.png'),
      yzs: require('@/assets/images/monitor/yzs_2.png'),
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
      this.$http.get(this.$api.findAnalyseParticulars, { params: { id: this.ids } })
        .then(res => {
          // console.log(res.data.data)
          this.userDataAll = res.data.data
          console.log(this.userDataAll)
          this.userData2 = res.data.data.frontAnalyseNumber
          this.firstData = JSON.parse(this.userDataAll.chartNo1) // 首行数据
          this.secondData = JSON.parse(this.userDataAll.chartNo2) // 发文天数,阅读数等
          this.$refs.EighthDouyin.getArticleData(this.userDataAll.chartNo3) // 传播趋势
          this.$refs.EighthDouyin.getArticleData2(this.userDataAll.chartNo5) // 发文时间分布

          this.$refs.NinthDouyin.getArticleData(this.userDataAll.chartNo4) // 阅读数
          this.$refs.NinthDouyin.getArticleTime(this.userDataAll.chartNo7) // 头条内容占比

          // this.$refs.EighthWb.getCommentsData(this.userDataAll.chartNo9) // 粉丝趋势

          // this.$refs.NinthWb.getArticleData(this.userDataAll.chartNo5) // 发博时间分布
          // this.$refs.NinthWb.getArticleTime(this.userDataAll.chartNo6) // 原创占比
          this.findArtileList()
          // this.$refs.TenthWb.getArticleData(this.userDataAll.chartNo7) // 头条内容占比
          this.findArtileList2('digg_count')
          // this.$refs.TwelfthWb.getArticleData(this.userDataAll.chartNo8) // 热词

          // this.$refs.ThirteenthWb.getArticleTime(this.userDataAll.chartNo8) // 热词
          // this.$refs.ThirteenthWb.getArticleData(this.userDataAll.chartNo4) // 阅读数
        }).catch(() => { })
    },
    // 获取表格数据 头条内容分析
    findArtileList (id) {
      // console.log(this.params)
      // this.params.isOrigin = id
      // this.params.publishTime[0] = this.userData2.startDate
      // this.params.publishTime[1] = this.userData2.endDate
      // console.log(this.params)
      this.tableData = []
      this.$http.post(this.$api.findArticleBehavioralDataToutiao, this.params)
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
      this.$http.post(this.$api.findArticleBehavioralDataToutiao, this.params2)
        .then(res => {
          // console.log(res.data.data)
          this.tableData2 = res.data.data.list
        }).catch(() => { })
    },
    format (percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    }
  },
  components: {
    eight,
    ninth
    // tenth,
    // eleventh,
    // twelfth
    // thirteenth
    // fifth,
    // sixth,
    // seventh
  }
}
</script>
<style>
@import '../monitor.css';
</style>
<style scoped lang="scss">
.word_color {
  color: #6b798e;
}

.bac {
  background-color: #fff;
  padding: 20px;
  /* width: 100%; */
  /* padding: 0px 20px 0px 20px; */
  /* padding-left: 20px; */
  /* padding-right:20px; */
}
.backgr {
  background-color: #fff;
}
.outside-div {
  /* padding: 0 20px; */
}
.analysis-content {
  background-color: #fff;
  /* padding: 20px; */
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
.pie-ananly {
  width: 100%;
  text-align: center;
}
.pie-ananly span {
  font-size: 18px;
  font-weight: 700;
}
.flex-right {
  /* width: 45%; */
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
  margin-top: 15px;
}
.second-box {
  /* background-color: #f7f8fa; */
  width: 241px;
  height: 106px;
  /* padding: 15px; */
  box-sizing: border-box;
  position: relative;
  background: #f7f8fa;
}
.second-box1 {
  color: #5f96f3;
  font-size: 30px;
}
/* .second-box div{
  display: block;
} */
.second-box2 {
  color: #ffc154;
  font-size: 30px;
}
.second-box3 {
  color: #271a27;
  font-size: 30px;
}
.second-box4 {
  color: #f54336;
  font-size: 30px;
}
// .second-box5 {
//   color: #5F96F3;
//   font-size: 30px;
// }
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
  color: #6b798e;
  font-size: 14px;
}
// .second-box-num {
//   font-size: 30px;
//   color: #ffffff;
// }
.right-data {
  width: 135px;
  position: absolute;
  right: 0;
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
  margin-top: 20px;
  width: 800px;
  display: inline-block;
  margin-right: 10px;
  vertical-align: top;
  /* padding-right: 10px; */
  /* background: #bcbdbd; */
}
.ninth {
  /* background: #ffc154; */
  display: inline-block;
  width: 510px;
  vertical-align: top;
  margin-top: 20px;
  height: 1208px;
}
.tenth {
  /* display: inline-block; */
  /* vertical-align: top; */
}
.seventh {
  margin-top: 40px;
}
#eleventh-div {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
<style lang="scss" scoped>
/* 5.25 */
.icon_div {
  width: 106px;
  height: 106px;
  /* opacity: 0.05; */
  // background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 0;
  // z-index: 1;
  // border-bottom-right-radius: 5px;
  // border-top-right-radius: 5px;
}
.icon_div img {
  // position: absolute;
  z-index: 999;
  margin-top: 15px;
  margin-left: 26px;
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
  margin-bottom: 10px;
}
.nick_name_con p {
  margin-bottom: 5px;
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
#eleventh {
  // margin-top:-20px;
  // width: 600px;
}
.account_name {
  font-size: 16px;
  color: #252934;
}
.account_id {
  color: #5f96f3;
}
.line_div {
  width: 1px;
  height: 243px;
  background: #f7f8fa;
}
.nick_name_con .mar_p {
  margin-bottom: 15px;
}
</style>
