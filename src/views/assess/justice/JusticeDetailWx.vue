<!--
 * @Author: MaiChao
 * @Date: 2021-03-15 16:16:36
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-07-26 14:52:58
-->
<template>
  <div class="contents">
    <div class="official account-box">
      <div class="conts-box">
        <div>
          <div>
            <el-button type="primary"
                       icon="el-icon-arrow-left"
                       @click="goBack"
                       size="small"
                       class="back-btn">返回</el-button>
            <!-- <div class="title-time">省域 <span>{{ruleForm.date}}</span> 排行总榜</div> -->
            <!-- <div class="title-time">{{this.wx.weightStartTime}} <span>{{this.wx.weightEndTime}}</span> 排行总榜</div>
            <el-button size="small"
                       type="warning"
                       @click="exportBox()">导出</el-button> -->

            <el-form :inline="true"
                     class="demo-form-inline">
              <el-form-item label="">
                <span class="title-time">榜单周期{{this.wx.weightStartTime}}<span>至</span>{{this.wx.weightEndTime}}</span>
              </el-form-item>
              <el-form-item style="margin-left:50px">
                <el-button type="warning"
                           @click="exportBox()"
                           size="small">榜单数据导出</el-button>
                           <el-button type="primary"
                           @click="exportBox2()"
                           size="small">原始数据导出</el-button>
              </el-form-item>
            </el-form>
            <div class="table-box">
              <!-- <el-table :data="tableData"
                        id="wx-monitor"
                        style="width: 100%"
                        :cell-style="{ textAlign: 'center' }"
                        :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column prop="articleCountNum"
                                 label="排名"
                                 width="50">
                  <template slot-scope='scope'>
                    <div>
                      {{scope.$index+1}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="nickname"
                                 label="微信名称">
                  <template slot-scope='scope'>
                    <div class="account-infor flex-ali-center cursor"
                         @click="toSearch(scope.row.biz)">
                      <img :src="scope.row.cover"
                           alt="">
                      <div class="account-name">
                        <p class="import-name lin-clamp-1"
                           v-html='scope.row.nickname'></p>
                        <p>{{scope.row.alias}}</p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="pubCount"
                                 label="发布次数"
                                 width="60">
                </el-table-column>
                <el-table-column prop="numCount"
                                 label="文章总数"
                                 width="60">
                </el-table-column>

                <el-table-column prop="readNumCount"
                                 label="总阅读数"
                                 width="78">
                </el-table-column>
                <el-table-column prop="oldLikeNumCount"
                                 label="总点赞数"
                                 width="78">
                </el-table-column>
                <el-table-column prop="likeNumCount"
                                 label="总在看数"
                                 width="78">
                </el-table-column>
                <el-table-column prop="maxReadNum"
                                 label="最高阅读数"
                                 width="70">
                </el-table-column>
                <el-table-column prop="maxOldLikeNum"
                                 label="最高点赞数"
                                 width="70">
                </el-table-column>
                <el-table-column prop="firstReadNumCount"
                                 label="头条总阅读数"
                                 width="70">
                </el-table-column>
                <el-table-column prop="firstOldLikeNumCount"
                                 label="头条总点赞数"
                                 width="70">
                </el-table-column>
                <el-table-column prop="firstLikeNumCount"
                                 label="头条总在看数"
                                 width="70">
                </el-table-column>
                <el-table-column prop="isOriginCount"
                                 label="原创"
                                 width="70">
                </el-table-column>
                <el-table-column prop="functionType"
                                 label="职能"
                                 width="70">
                </el-table-column>
                <el-table-column prop="unitName"
                                 label="单位名称"
                                 width="120">
                </el-table-column>
                <el-table-column prop="totalScore"
                                 label="总分"
                                 width="90">
                </el-table-column>
                <el-table-column prop="last_pubtime"
                                 label="操作"
                                 width="70">
                  <template slot-scope='scope'>
                    <div class="operate flex-arr-center">
                      <span v-if="scope.row.isFollow"
                            class="el-icon-star-on collect cursor"
                            @click="deleteList(scope.row)"></span>
                      <span v-else
                            class="el-icon-star-off collect cursor"
                            @click="addList(scope.row)"></span>
                      <span class="el-icon-circle-plus-outline addto cursor"
                            @click="addUser(scope.row)"></span>
                    </div>
                  </template>
                </el-table-column>
              </el-table> -->
              <el-table :data="tableData2"
                        style="width: 100%"
                        id="wx-monitor">
                <el-table-column prop="articleCountNum"
                                 label="排名"
                                 width="50">
                  <template slot-scope='scope'>
                    <div v-if="scope.$index+1 == '1'">
                      <img src="@/assets/images/assess/first.png"
                           alt="">
                    </div>
                    <div v-else-if="scope.$index+1 == '2'">
                      <img src="@/assets/images/assess/second.png"
                           alt="">
                    </div>
                    <div v-else-if="scope.$index+1 == '3'">
                      <img src="@/assets/images/assess/third.png"
                           alt="">
                    </div>
                    <div v-else>
                      {{scope.$index+1}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="date"
                                 label="微信名称"
                                 width="200">
                  <template slot-scope='scope'>
                    <div class="account-infor flex-ali-center">
                      <img :src="scope.row.cover"
                           alt="">
                      <div class="account-name">
                        <p class="import-name lin-clamp-1"
                           v-html='scope.row.nickName'></p>
                        <p>{{scope.row.alias}}</p>
                      </div>
                    </div>
                    <!-- <div class="account-infor flex-ali-center cursor"
                         @click="toSearch(scope.row.biz)">
                      <img :src="scope.row.cover"
                           alt="">
                      <div class="account-name">
                        <p class="import-name lin-clamp-1"
                           v-html='scope.row.nickName'></p>
                        <p>{{scope.row.alias}}</p>
                      </div>
                    </div> -->
                  </template>
                </el-table-column>
                <el-table-column :label="'影响力'+'('+'权重'+ wx.influence +'%'+')'">
                  <el-table-column prop="totalReadNum"
                                   :label="'文章总阅读数(权重'+ wx.totalReadNum +'%)'">
                  </el-table-column>
                  <el-table-column prop="totalReadNumScore"
                                   label="得分"
                                   width="60">
                  </el-table-column>
                  <el-table-column prop="singleReadNum"
                                   :label="'单篇文章最高阅读数(权重'+wx.singleReadNum+'%)'">
                  </el-table-column>
                  <el-table-column prop="singleReadNumScore"
                                   label="得分"
                                   width="60">
                  </el-table-column>
                  <el-table-column prop="averReadNum"
                                   :label="'平均每篇文章阅读数(权重'+wx.averReadNum+'%)'">
                  </el-table-column>
                  <el-table-column prop="averReadNumScore"
                                   label="得分"
                                   width="60">
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="'传播力(权重'+wx.spread+'%)'">
                  <el-table-column prop="articleNum"
                                   :label="'微信文章数(权重'+wx.articleNum+'%)'">
                  </el-table-column>
                  <el-table-column prop="articleNumScore"
                                   label="得分"
                                   width="60">
                  </el-table-column>
                  <el-table-column prop="releaseArticleNum"
                                   :label="'微信发布次数(权重'+wx.articleMaxNum+'%)'">
                  </el-table-column>
                  <el-table-column prop="releaseArticleNumScore"
                                   label="得分"
                                   width="60">
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="'引导力(权重'+wx.guide+'%)'">
                  <el-table-column prop="lookNum"
                                   :label="'微信文章总在看数(权重'+wx.lookNum+'%)'">
                  </el-table-column>
                  <el-table-column prop="lookNumScore"
                                   label="得分"
                                   width="60">
                  </el-table-column>
                  <el-table-column prop="likeNum"
                                   :label="'微信文章总点赞数(权重'+wx.likeNum+'%)'">
                  </el-table-column>
                  <el-table-column prop="likeNumScore"
                                   label="得分"
                                   width="60">
                  </el-table-column>
                </el-table-column>
                <el-table-column prop="totalScore"
                                 label="总分">
                </el-table-column>
              </el-table>
            </div>
            <div class="keepon"
                 v-if="!dataShow">
              无更多数据
            </div>
            <div v-else>
              <div class="keepon"
                   v-if="!pageShow">
                <span class="click-span"
                      @click="loadMore">点击加载更多</span>
              </div>
              <div class="keepon"
                   v-else>
                <p>当前权限只可加载 <span>{{limitCount}}</span>条数据,需要更多权限请点击 <span class="click-span">扩展权限</span></p>
              </div>
            </div>
          </div>
          <!-- </div> -->

        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { exportTable } from '@/lib/tools'
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
export default {
  components: {
    // officialWb,
    // officialWx
  },
  data () {
    return {
      date: '名称',
      activeTab: 'wx',
      limitCount: '', // 限制个数
      dataShow: false,
      pageShow: false, // 页面条数限制
      addUserShow: false,
      addDelete: '',
      account: '', // 收藏biz
      accountName: '', // 账号名称
      type: '1', // 1：微信公众号
      addShow: false, // 收藏弹框
      total: 0,
      data1: [{
        name: '自治区人民检察院1',
        account: 'renmenjianchayuan'
      }],
      data2: [{
        name: '自治区人民检察院2',
        account: 'renmenjianchayuan'
      }],
      searchDetail: '',
      textarea: '',
      remarks: '',
      activeName: 'first',
      dialogVisible: false,
      addApply: false,
      // activeTab: 'wx',
      options: [],
      dateOption: [
      ],
      ruleForm: {
        // types: '1',
        // rankingType: 1, // 榜单类型 1：日榜 2：周榜 3：月榜
        // date: '', // 时间
        // functionType: '', // 职能
        // districts: [], // 地区
        // unitLevel: '',
        rankingWeightId: '',
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      addData: [],
      bizArray: [],
      bizName: [],
      rankingUserId: '',
      form: {
        pageNum: 1,
        pageSize: 20,
        rankType: '1'
      },
      regionList: '', // 地区
      tableData2: [],
      id: '',
      // wx: {
      //   id: '',
      //   influence: 0, // 影响力
      //   totalReadNum: '', // 文章总阅读数
      //   totalReadNumBasicScore: '', // 文章总阅读数基础分
      //   singleReadNum: '', // 单篇文章最高阅读数
      //   singleReadNumBasicScore: '', // 单篇文章最高阅读数基础分
      //   averReadNum: '', // 平均每篇文章阅读数
      //   averReadNumBasicScore: '', // 平均每篇文章阅读数基础分
      //   spread: 0, // 传播力
      //   articleNum: '', // 文章数
      //   articleNumBasicScore: '', // 文章数基础分
      //   articleMaxNum: '', // 文章最大数
      //   articleNumMaxScore: '', // 文章数最大分
      //   releaseArticleNum: '', // 发布文章数
      //   releaseArticleNumBasicScore: '', // 发布文章数基础分
      //   releaseArticleMaxNum: '', // 发布文章最大数
      //   releaseArticleNumMaxScore: '', // 发布文章数最大分
      //   guide: 0, // 引导力
      //   lookNum: '', // 在看数
      //   lookNumBasicScore: '', // 在看数基础分
      //   likeNum: '', // 点赞数
      //   likeNumBasicScore: ''// 点赞数基础分
      // }
      wx: ''
    }
  },
  created () {
    // this.getNewDate()
    // this.rankType()
    // if (this.$route.query.tab) {
    //   this.activeTab = this.$route.query.tab
    // }
    // if (this.$route.query.active) {
    //   this.activeTab = this.$route.query.active
    // }
    // if (this.$route.query.tab) {
    //   this.activeTab = this.$route.query.tab
    // }
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.ruleForm.rankingWeightId = this.$route.query.id
    }
    this.getHead()
    // this.getNewDate()
    // this.rankType()
  },
  methods: {
    // 获取表头
    getHead () {
      this.$http.get(this.$api.getRankingHead, { params: { id: this.id } })
        .then(res => {
          if (res.data.code === 200) {
            // console.log(res.data.data)
            this.wx = res.data.data
            this.getWxList()
            console.log(this.wx)
            // this.$message.success('操作成功!')
            // this.restTable()
            // this.addShow = false
          }
        })
        .catch(() => { })
    },
    getWxList () {
      this.$http.post(this.$api.rankingWxList, this.ruleForm)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data.content.length > 0) {
              this.tableData2.push(...res.data.data.content)
              // console.log(this.ruleForm.pageNum)
              if (res.data.data.totalPages > 1 && this.ruleForm.pageNum < res.data.data.totalPages) {
                this.dataShow = true
                this.pageShow = false
              }
              // this.tableData.push(...res.data.data.content)
              // this.limitCount = res.data.data.limitCount
              // if (res.data.data.content.length < 10) {
              //   this.dataShow = false
              // } else {
              //   this.dataShow = true
              // }
              // if (this.limitCount === 0) {
              //   this.pageShow = false
              // } else {
              //   if (this.tableData.length >= this.limitCount) {
              //     this.pageShow = true
              //   } else {
              //     this.pageShow = false
              //   }
              // }
            } else {
              this.dataShow = false
            }
          }
        })
        .catch(() => { })
    },
    // 返回
    goBack () {
      this.$router.go(-1)
    },
    // 加载更多
    loadMore () {
      this.ruleForm.pageNum++
      this.getWxList()
    },
    // 初始化表格
    restTable () {
      this.tableData = []
      this.ruleForm.pageNum = 1
      this.geListData()
    },
    // 获取表格数据 微信
    geListData () {
      this.ruleForm.functionType = this.ruleForm.functionType.toString()
      this.$http.post(this.$api.zfListData, this.ruleForm)
        .then(res => {
          if (res.data.data.content.length > 0) {
            this.tableData.push(...res.data.data.content)
            this.limitCount = res.data.data.limitCount
            if (res.data.data.content.length < 10) {
              this.dataShow = false
            } else {
              this.dataShow = true
            }
            if (this.limitCount === 0) {
              this.pageShow = false
            } else {
              if (this.tableData.length >= this.limitCount) {
                this.pageShow = true
              } else {
                this.pageShow = false
              }
            }
          } else {
            this.dataShow = false
          }
        })
        .catch(() => { })
    },
    toSearch (id) {
      // let routeName = this.activeTab === 'company' ? 'AccountMaterial' : 'HistoryTweets'
      this.$router.push({ name: 'AccountMaterial', query: { id: id } })
    },
    preText (pretext) {
      return pretext.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
    },
    // 提交申请
    upApply () {
      this.remarks = this.preText(this.textarea)
      this.dialogVisible = true
    },
    // 重置
    resetForm (formName) {
      this.ruleForm.unitLevel = ''
      this.$refs[formName].resetFields()
      this.restTable()
      this.getRegion()
    },
    // 导出
    exportBox () {
      let token = this.$store.state.user.token
      if (process.env.NODE_ENV === 'development') {
        window.location.href = process.env.VUE_APP_BASE_URL + this.$api.rankingWxExport + '?rankingWeightId=' + this.id + '&authCode=' + token
      } else {
        window.location.href = window.g.baseUrl + this.$api.rankingWxExport + '?rankingWeightId=' + this.id + '&authCode=' + token
      }
      // var time = new Date()
      // // 程序计时的月从0开始取值后+1
      // var m = time.getMonth() + 1
      // var t = time.getFullYear() + '-' + m + '-' + this.ruleForm.date
      // let fileName = '省域微信公众号' + t + '总榜'
      // var table = XLSX.utils.table_to_book(document.querySelector('#wx-monitor'))
      // exportTable(XLSX, FileSaver, table, fileName)
    },
    exportBox2 () {
      // console.log('原始数据')
      let token = this.$store.state.user.token
      if (process.env.NODE_ENV === 'development') {
        window.location.href = process.env.VUE_APP_BASE_URL + this.$api.rankingWxExportInfo + '?rankingWeightId=' + this.id + '&authCode=' + token
      } else {
        window.location.href = window.g.baseUrl + this.$api.rankingWxExportInfo + '?rankingWeightId=' + this.id + '&authCode=' + token
      }
    },
    // 说明
    explain () { }
  }
}
</script>
<style lang="scss" scoped>
// @import './assess.css';
@import '../assess.css';
</style>
<style lang="scss" scoped>
.right-btn {
  color: #498bfe;
  float: right;
}
.right-btn i {
  margin-right: 5px;
  font-size: 18px;
}
.title-time {
  color: #252934;
  font-size: 22px;
  font-weight: 400;
  line-height: 55px;
}
.flex-ali-center {
  margin-bottom: 20px;
}
.el-radio-button {
  margin-right: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 0px;
}
.el-radio-button:last-child {
  margin: 0px;
}
.explain-box .el-select {
  width: 150px;
}
.from-box {
  margin: 20px 0;
}
.from-box .el-form-item {
  margin-right: 35px;
}
.quick-click {
  padding: 20px 0;
}
.click-box {
  width: 313px;
  height: 115px;
  text-align: center;
}
.click-name {
  font-size: 24px;
  font-weight: 400;
  color: #ffffff;
  margin-left: 15px;
}
.account-infor {
  // width: 200px;
  margin: 0 auto;
}
.account-infor img {
  height: 50px;
  width: 50px;
  margin-right: 20px;
}
.operate {
  font-size: 22px;
}
.collect {
  color: #3b82fe;
  line-height: 24px;
}
.addto {
  color: #f89408;
}
.search-box {
  text-align: center;
  margin: 30px 0;
}
.search-box .el-input {
  width: 470px;
  margin-right: 15px;
}
.show-box {
  width: 470px;
  border: 1px solid #e1e4e8;
}
.top-line {
  background-color: #f7f8fa;
}
.name-box {
  color: #3b82fe;
  border-bottom: 1px solid #e1e4e8;
}
.content-box {
  min-height: 182px;
}
.alone:hover {
  background-color: #f7f8fa;
}
.tip-span {
  color: red;
}
.radio-box .el-radio {
  margin-bottom: 10px;
}
.addUser .dialog-footer {
  display: block;
  text-align: center;
}
// 返回
.back-btn {
  margin-bottom: 20px;
  border-radius: 2px;
}
</style>
