<!--
 * @Author: MaiChao
 * @Date: 2021-03-15 16:16:36
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-07-26 14:53:35
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
                       class="back-btn"
                       size="small">返回</el-button>
            <el-form :inline="true"
                     class="demo-form-inline">
              <el-form-item label="">
                <span class="title-time">榜单周期{{this.wb.weightStartTime}}<span>至</span>{{this.wb.weightEndTime}}</span>
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
              <el-table :data="tableData2"
                        style="width: 100%"
                        id="wb-monitor">
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
                                 label="微博名称"
                                 width="200">
                  <template slot-scope='scope'>
                    <div class="account-infor flex-ali-center">
                      <img :src="scope.row.cover"
                           alt="">
                      <div class="account-name">
                        <p class="import-name lin-clamp-1"
                           v-html='scope.row.nickName'></p>
                      </div>
                    </div>
                    <!-- <div class="account-infor flex-ali-center cursor"
                         @click="toSearch(scope.row.uid)">
                      <img :src="scope.row.cover"
                           alt="">
                      <div class="account-name">
                        <p class="import-name lin-clamp-1"
                           v-html='scope.row.nickName'></p>
                      </div>
                    </div> -->
                  </template>
                </el-table-column>
                <el-table-column :label="'影响力(权重'+wb.influence+'%)'">
                  <el-table-column prop="fanNum"
                                   :label="'微博粉丝数(权重'+wb.fanNum+'%)'">
                  </el-table-column>
                  <el-table-column prop="fanNumScore"
                                   label="得分"
                                   width="70">
                  </el-table-column>
                  <el-table-column prop="forwardNum"
                                   :label="'微博被转发总数(权重'+wb.forwardNum+'%)'">
                  </el-table-column>
                  <el-table-column prop="forwardNumScore"
                                   label="得分"
                                   width="70">
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="'传播力(权重'+wb.spread+'%)'">
                  <el-table-column prop="totalNum"
                                   :label="'微博总数(权重'+wb.totalNum+'%)'">
                  </el-table-column>
                  <el-table-column prop="totalNumScore"
                                   label="得分"
                                   width="70">
                  </el-table-column>
                  <el-table-column prop="originalArticleNum"
                                   :label="'原创微博数(权重'+wb.originalArticleNum+'%)'">
                  </el-table-column>
                  <el-table-column prop="originalArticleNumScore"
                                   label="得分"
                                   width="70">
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="'引导力(权重'+wb.guide+'%)'">
                  <el-table-column prop="commentNum"
                                   :label="'微博评论总数(权重'+wb.commentNum+'%)'">
                  </el-table-column>
                  <el-table-column prop="commentNumScore"
                                   label="得分"
                                   width="70">
                  </el-table-column>
                  <el-table-column prop="likeNum"
                                   :label="'微博点赞总数(权重'+wb.likeNum+'%)'">
                  </el-table-column>
                  <el-table-column prop="likeNumScore"
                                   label="得分"
                                   width="70">
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
  },
  data () {
    return {
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
        pageNum: 1,
        pageSize: 10,
        rankingWeightId: ''
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
      wb: ''
    }
  },
  created () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.ruleForm.rankingWeightId = this.$route.query.id
    }
    this.getHead()
  },
  methods: {
    // 获取表头
    getHead () {
      this.$http.get(this.$api.getRankingHead, { params: { id: this.id } })
        .then(res => {
          if (res.data.code === 200) {
            // console.log(res)
            this.wb = res.data.data
            this.getWbList()
            // console.log(this.wb)
          }
        })
        .catch(() => { })
    },
    getWbList () {
      this.$http.post(this.$api.rankingWbList, this.ruleForm)
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
      this.getWbList()
    },
    // 关闭弹框
    offAdd () {
      this.addShow = false
    },
    toSearch (id) {
      console.log(id)
      // let routeName = this.activeTab === 'company' ? 'AccountMaterial' : 'HistoryTweets'
      this.$router.push({ name: 'AccountMaterial', query: { id: id } })
    },
    // 导出
    exportBox () {
      let token = this.$store.state.user.token
      if (process.env.NODE_ENV === 'development') {
        window.location.href = process.env.VUE_APP_BASE_URL + this.$api.rankingWbExport + '?rankingWeightId=' + this.id + '&authCode=' + token
      } else {
        window.location.href = window.g.baseUrl + this.$api.rankingWbExport + '?rankingWeightId=' + this.id + '&authCode=' + token
      }
      // var time = new Date()
      // // 程序计时的月从0开始取值后+1
      // var m = time.getMonth() + 1
      // var t = time.getFullYear() + '-' + m + '-' + this.ruleForm.date
      // let fileName = '省域微博' + t + '总榜'
      // var table = XLSX.utils.table_to_book(document.querySelector('#wb-monitor'))
      // exportTable(XLSX, FileSaver, table, fileName)
    },
    exportBox2 () {
      // console.log('微博原始数据')
      let token = this.$store.state.user.token
      if (process.env.NODE_ENV === 'development') {
        window.location.href = process.env.VUE_APP_BASE_URL + this.$api.rankingWbExportInfo + '?rankingWeightId=' + this.id + '&authCode=' + token
      } else {
        window.location.href = window.g.baseUrl + this.$api.rankingWbExportInfo + '?rankingWeightId=' + this.id + '&authCode=' + token
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
