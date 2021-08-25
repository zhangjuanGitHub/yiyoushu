<!--
 * @Author: MaiChao
 * @Date: 2021-02-07 15:31:16
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-08-03 10:35:02
-->
<template>
  <div class="real-time content-box">
    <div class="tabs-header isActive">
      <span class="tabs-title">预警账号</span>
    </div>
    <div class="wx-warp-box">
      <div class="search_form">
        <el-form :inline="true"
                 ref="ruleForm"
                 :model="ruleForm">
          <el-form-item class="number"
                        prop="data"
                        label="时间">
            <el-date-picker v-model="publishTime"
                            size="mini"
                            type="daterange"
                            value-format='yyyy-MM-dd'
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            class="sear_date">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="keyword">
            <el-input size="mini"
                      v-model="ruleForm.keyword"
                      placeholder="请输入关键字"
                      class="sear_inp"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini"
                       @click="queryShow"
                       type="primary">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="mini"
                       @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="mini"
                       @click="addAccount"
                       type="primary">添加预警账号</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="wx-warp-content">
      <div>
        <el-table :data="tableData"
                  style="width: 100%"
                  id="wx-monitor"
                  border
                  :cell-style="{ textAlign: 'center' }">
          <el-table-column prop="num1"
                           label="序号"
                           width="55">
            <template slot-scope="scope">
              <div>
                {{(ruleForm.pageNum - 1) * ruleForm.pageSize + scope.$index + 1}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop=""
                           label="账号信息">
            <template slot-scope='scope'>
              <div class="account-msg-box flex-ali-center">
                <img :src="scope.row.headImage?scope.row.headImage:undefinedUrl"
                     alt="">
                <div class="account-msg">
                  <!-- <p class="lin-clamp-1"
                     v-html="scope.row.nickname"></p> -->
                  <p class="lin-clamp-1">{{scope.row.accountName}}</p>
                  <p class="lin-clamp-1">微信号：<span>{{scope.row.alias}}</span></p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="warningCount"
                           label="预警文章篇数">
            <template slot-scope='scope'>
              <div>
                <el-button type="text"
                           @click="goAcicleList(scope.$index, scope.row)">{{scope.row.warningCount}}</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime"
                           label="开始监测时间">
          </el-table-column>
          <el-table-column prop="sumReadNum"
                           label="操作">
            <template slot-scope="scope">
              <div style="display:inline-block"
                   v-if="scope.row.status===0">
                <el-button type="text"
                           @click="handleStart(scope.$index, scope.row)">开始</el-button>
              </div>
              <div style="display:inline-block"
                   v-if="scope.row.status===1">
                <el-button type="text"
                           @click="handleStop(scope.$index, scope.row)">停止</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-pagination">
        <set-page @pagingChange="pagingChange"
                  :total="total"
                  ref="child"></set-page>
      </div>
    </div>
    <el-dialog title="添加账号"
               :visible.sync="addAccountDialog"
               :close-on-click-modal='false'
               width="960px"
               center
               class="cust-add-apply"
               @close="offAddAccount">
      <div class="add-main flex-cloumn-cen">
        <img src="@/assets/images/monitor/analyse.png"
             alt="">
        <div class="add-main-center">
          <div class="add-task-search">
            <!-- <div class="flex-cloumn-cen">
            <p class="add-title">分析时长</p>
            <el-radio-group v-model="type"
                            @change="calcCycle">
              <el-radio :label="1">周分析</el-radio>
              <el-radio :label="2">月分析</el-radio>
            </el-radio-group>
            <p class="add-tip">为您提供最近<span v-if="type===1">一周</span><span v-else>一月</span>微信数据报告</p>
            <p class="add-title">账号名称筛选</p>
          </div> -->
            <el-input size="small"
                      v-model="queryText"
                      placeholder="请输入账号名称"></el-input>
            <el-button size="small"
                       type="primary"
                       @click="submitSearch">搜索</el-button>
          </div>

          <!-- <el-input size="small"
                  v-model="queryText"
                  placeholder="请输入账号名称"></el-input>
        <el-button size="small"
                   type="primary"
                   @click="submitSearch">搜索</el-button> -->
          <div class="add-main-record">
            <p v-if="record.length > 0">搜索记录：</p>
            <p>
              <span v-for="(item, index) of record"
                    :key="index"
                    @click="clickRecord(item)"
                    class="cursor">{{item}}</span>
            </p>
            <p v-if="record.length > 0"
               @click="deleteRecord">
              <i class="el-icon-delete"></i>删除记录
            </p>
          </div>
          <div class="add-main-list">
            <div class="add-list-box flex-ali-center"
                 v-for="(item, index) of addList"
                 :key="index"
                 :class="{'is_select_box': item.isSelected }">
              <img :src="item.ori_head_img?item.ori_head_img:undefinedUrl"
                   alt="">
              <div class="add-list-msg">
                <div class="flex-bwt-center">
                  <div class="add-list-name">
                    <p v-html="item.nickname"></p>
                    <p v-if="item.city">地区：<span>{{item.city}}</span></p>
                  </div>
                  <p class="add-list-select"
                     :class="{'is_select_act': item.isSelected }"
                     @click="selectAccount(item, index)">选择</p>
                </div>
                <p v-html="item.introduction"
                   class="lin-clamp-1"></p>
              </div>
            </div>
          </div>

        </div>

      </div>
      <div class="footer-all">
        <set-page @pagingChange="pagingChange2"
                  :total="total2.total"
                  ref="child2"
                  v-if="addList.length > 0"></set-page>

        <div class="admin-btn-div">
          <el-button size="large"
                     type="primary"
                     v-if="addList.length > 0"
                     @click="collectAccount"
                     class="admin-btn">添加预警</el-button>
        </div>
      </div>
      <!-- <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="upAddAccountWb">确认</el-button>
        <el-button @click="offAddAccountWb">取消</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
// import vSearch from '@/views/monitor/components/RealSearch'
import { timeFormat } from '@/lib/tools'
export default {
  data () {
    return {
      addAccountDialog: false,
      queryText: '', //
      addList: [],
      record: [], // 搜索历史
      pageBean: {
        pageNum: 1,
        pageSize: 10
      },
      total2: {
        total: 0
      },
      selectItem: {}, // 选择的账号
      undefinedUrl: require('@/assets/images/home/avatar.png'),
      dialogVisible: false,
      total: 0,
      deleteItem: {},
      ids: [],
      deleteShow: false,
      deleteTeam: false,
      articleData: [],
      checkList: ['标题'],
      tipVisible: false, // 没查到提示
      // creadArticle: false, // 创建文件弹框
      creadForm: {
        have: '',
        not: '',
        title: '', // 标题
        fromData: [],
        startDate: '', // 开始监测时间
        endDate: '', // 结束监测时间
        content: '', // 内容
        url: '' // 文章链接
      }, // 创建表单
      rules: {
        fromData: [{ required: true, message: '请选择监测时间', trigger: 'blur' }]
      },
      publishTime: [],
      ruleForm: {
        pageSize: 10,
        pageNum: 1,
        startDate: '',
        endDate: '',
        keyword: ''
      },
      tableData: [

      ],
      haveList: [],
      // haveList: ['微信', '未检', '天天', '向上'],
      notList: ['微信', '未检']
    }
  },
  methods: {
    // 默认时间
    calcDate (num) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * num)
      return date
    },
    getCurrentTime () {
      let end = this.calcDate(0)
      let start = this.calcDate(30)
      this.publishTime[0] = timeFormat(start)
      this.publishTime[1] = timeFormat(end)
    },
    getDialog () {
      this.dialogVisible = true
    },
    openUrl (item) {
      if (item.url) {
        window.open(item.url, '_black')
      }
    },
    // 查询
    queryShow () {
      // console.log(this.ruleForm)
      this.$refs.child.handleCurrentChange(1)
    },

    addAccount () {
      // console.log('收藏账号')
      this.addAccountDialog = true
      this.getRecord()
    },
    // 取消收藏账号
    offAddAccount () {
      // console.log('取消收藏账号')
      console.log(this.total2)
      this.total2 = { total: 0 }
      console.log(this.total2)
      this.queryText = ''
      this.addList = []
      this.pageBean.pageNum = 1
      this.addAccountDialog = false
    },
    // 搜索账号列表
    submitSearch () {
      if (this.queryText) {
        this.addRecord()
        this.$refs.child2 ? this.$refs.child2.handleCurrentChange(1) : this.searchQuery()
      } else {
        this.$message.warning('请输入搜索内容')
      }
      // this.record.push(this.queryText)
    },
    // 选中
    selectAccount (item, index) {
      this.addList.forEach(i => {
        i.isSelected = false
      })
      item.isSelected = true
      this.$set(this.addList, index, item)
      this.selectItem = item
    },
    searchQuery () {
      let obj = {
        queryText: this.queryText,
        pageBean: {
          pageSize: this.pageBean.pageSize,
          pageNum: (this.pageBean.pageNum - 1) * this.pageBean.pageSize + 1
        },
        range: 1
      }
      this.$http.post(this.$api.wxSearch, obj)
        .then(res => {
          if (res.data.data.length > 1) {
            this.total2 = res.data.data.shift()
            this.addList = res.data.data
            this.addList.forEach(item => {
              item.isSelected = false
            })
          }
        }).catch(() => { })
    },
    // 获取搜索记录
    getRecord () {
      this.$http.get(this.$api.getSearchRecord)
        .then(res => {
          this.record = res.data.data
        }).catch(() => { })
    },
    // 添加搜索记录
    addRecord () {
      this.$http.post(this.$api.searchRecord, { nickname: this.queryText })
        .then(res => { }).catch(() => { })
    },
    // 删除搜索记录
    deleteRecord () {
      this.$http.get(this.$api.deleteRecord)
        .then(res => {
          this.record = []
          this.$message.success('删除记录成功！')
        }).catch(() => { })
    },
    // 点击搜索记录
    clickRecord (name) {
      this.queryText = name
      this.$refs.child2 ? this.$refs.child2.handleCurrentChange(1) : this.searchQuery()
    },
    // 查询账号分页
    pagingChange2 (query) {
      this.pageBean.pageSize = query.size
      this.pageBean.pageNum = query.page
      this.searchQuery()
    },
    // 添加账号到收藏
    collectAccount () {
      console.log('添加')
      console.log(this.selectItem)
      if (this.selectItem.biz) {
        if (this.selectItem.is_early_warning_account === 0) {
          let obj = {
            biz: this.selectItem.biz,
            status: 1
          }
          this.$http.post(this.$api.accountChange, obj)
            .then(res => {
              if (res.data.code === 200) {
                this.$message.success('添加预警成功！')
                this.getWarningList()
                this.addAccountDialog = false
              }
            })
        } else {
          this.$message.warning('该账号已经添加预警')
        }
      } else {
        this.$message.warning('请选择一个账号添加预警!')
      }
    },

    // 重置
    resetForm () {
      // console.log(this.ruleForm)
      this.publishTime = []
      this.ruleForm = {
        pageSize: 10,
        pageNum: 1,
        startDate: '',
        endDate: '',
        keyword: ''
      }
      // console.log(this.ruleForm)
      this.$refs.child.handleCurrentChange(1)
    },
    // 分页
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
      this.getWarningList()
    },
    // 获取微信预警列表
    getWarningList () {
      this.tableData = []
      if (this.publishTime.length > 0) {
        this.ruleForm.startDate = this.publishTime[0]
        this.ruleForm.endDate = this.publishTime[1]
      }
      // console.log(this.ruleForm)
      this.$http.post(this.$api.wechatWarning, this.ruleForm)
        .then(res => {
          // console.log('res', res.data.code)
          if (res.data.code === 200) {
            this.tableData = res.data.data.content
            this.total = res.data.data.totalElements
            // console.log(this.total)
          }
        }).catch(() => { })
    },
    // 展示创建弹框
    creadShow () {
      // this.creadArticle = true
    },
    // 取消创建
    cancel (formName) {
      // this.creadArticle = false
      this.dialogVisible = false
      this.startDate = ''
      this.endDate = ''
      this.$refs[formName].resetFields()
      this.$refs.child.handleCurrentChange(1)
    },
    goAcicleList (i, row) {
      console.log(i, row)
      this.$router.push({ name: 'HitArticleList', query: { biz: row.biz } })
    },
    // 预警开始
    handleStart (index, row) {
      console.log(index, row.id)
      let par = {
        id: row.id
      }
      this.$http.get(this.$api.accountStart, { params: par })
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success('预警开始!')
            this.$refs.child.handleCurrentChange(1)
            this.ids = []
            this.deleteTeam = false
            this.deleteShow = false
          }
        }).catch(() => {
          this.deleteTeam = false
          this.deleteShow = false
        })
    },
    // 预警结束
    handleStop (index, row) {
      console.log(index, row)
      let par = {
        id: row.id
      }
      this.$http.get(this.$api.accountStop, { params: par })
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success('预警停止!')
            this.$refs.child.handleCurrentChange(1)
            this.ids = []
            this.deleteTeam = false
            this.deleteShow = false
          }
        }).catch(() => {
          this.deleteTeam = false
          this.deleteShow = false
        })
    }

  },
  created () {
    this.getRecord()
    this.getCurrentTime()
    this.getWarningList()
  },
  components: {
    // vSearch
  }
}
</script>
<style>
@import '../monitor.css';
</style>
<style lang="scss" scoped>
.wx-warp-box {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 20px 30px;
}
.wx-warp-content {
  padding: 0 30px;
  background-color: #fff;
}
.article {
  height: 75px;
  padding-bottom: 10px;
  font-size: 14px;
  text-indent: 32px;
  line-height: 2;
}
.article-box {
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}
.time-line {
  color: #999999;
  font-size: 14px;
  padding-bottom: 15px;
}
.outpush i {
  cursor: pointer;
  text-decoration: underline;
  font-style: normal;
  color: red;
  padding: 0 5px;
}
.creadForm {
  // width: 70%;
  // margin: 0px auto;
}
.creadForm .el-form-item {
  // margin-top: 20px;
}
.cread-box .head-image {
  display: block;
  margin: 0 auto;
}
.dialog-footer {
  display: block;
  text-align: center;
}
.article-title {
  font-size: 18px;
  font-weight: bold;
}
.delete-box {
  text-align: center;
  color: red;
  text-decoration: underline;
}

// dis
// .el-dialog__header {
//   background-color: #edeff4 !important;
// }
.sear_inp {
  width: 166px;
  height: 36px;
}
// .dialog-footer{
//   display: inline-block;
//   height: 31px;
// }
.addBtn {
  // width:95px;
  // height: 31px;
  // line-height: 31px;
  // text-align: center;
  margin-left: 20px;
}

/* 表格 */
.account-msg-box img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin-right: 5px;
}
.table-all {
  width: 100%;
}
.account-msg p {
  text-align: left;
}
.img {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  // margin-top: 5px;
}
.search {
  margin-left: -10px;
}
.sear_date {
  width: 204px;
  height: 28px;
}

.cust-add-apply .el-input {
  width: 377px;
  height: 40px;
  margin: 0 auto;
}
</style>
<style>
.add-task-search .el-input--small .el-input__inner {
  height: 40px;
  line-height: 40px;
}
.add-task-search .el-input--small {
  font-size: 14px;
}
.add-task-search .el-button {
  width: 90px;
  height: 40px;
  font-size: 16px;
}
.add-main > .el-button {
  width: 225px;
  height: 50px;
  font-size: 16px;
  margin: 30px 0 80px;
}
</style>
<style scoped>
.add-main {
  width: 100%;
}
.add-task-search .add-title {
  font-size: 20px;
  color: #151c29;
  margin: 20px 0;
}
.add-task-search .add-tip {
  margin-top: 25px;
}
.add-task-search .el-input {
  width: 377px;
  height: 40px;
  margin-right: 10px;
  /* margin-left:200px; */
  /* margin: 0 auto; */
}
.add-task-search {
  text-align: center;
}
.add-main-record {
  width: 48%;
  margin: 8px auto;
}
.add-main-record p {
  float: left;
}
.add-main-record p:nth-child(1) {
  color: #151c29;
}
.add-main-record p:nth-child(2) {
  width: 240px;
  color: #7c889b;
}
.add-main-record p:nth-child(2) span {
  float: left;
  padding-right: 12px;
}
.add-main-record p:nth-child(3) {
  color: #7c889b;
  cursor: pointer;
}
.add-main-list {
  margin: 20px 0;
  width: 1000px;
}
.add-list-box {
  width: 440px;
  height: 110px;
  background: #f7f8fa;
  margin-top: 15px;
  margin-left: 35px;
  float: left;
  padding: 20px;
  border: 1px solid #f7f8fa;
  box-sizing: border-box;
}
.add-main-list .is_select_box {
  border-color: #f79406;
}
.add-list-box > img {
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-right: 10px;
}
.add-list-msg {
  flex: 1;
}
.add-list-msg > p,
.add-dialog-pp {
  color: #6b798e;
  margin-top: 5px;
}
.add-list-name p {
  color: #151c29;
}
.add-list-name p:nth-child(1) {
  font-size: 16px;
}
.add-list-select {
  padding: 2px 18px;
  color: #adaeb2;
  border: 1px solid #e1e4e8;
  cursor: pointer;
}
.add-list-msg .is_select_act {
  color: #f79406;
  border-color: #f79406;
}
.add-list-dialog i {
  color: #67c23a;
  font-size: 60px;
  height: 60px;
}
.add-dialog-ss {
  font-size: 24px;
  font-weight: bold;
  color: #151c29;
  margin-bottom: 20px;
}
.add-dialog-pp span {
  color: #3b81fe;
  cursor: pointer;
}
.footer-all {
  width: 100%;
}
.admin-btn-div {
  width: 100%;
  height: 40px;
}
.admin-btn {
  /* height:40px; */
  /* line-height: 40px; */
  /* width: 225px; */
  /* height: 50px; */
  /* font-size: 16px; */
  /* margin: 30px 0 80px; */
  /* text-align: center; */
  margin-left: 370px;
  /* margin: 0 auto; */
}
</style>
