<!--
 * @Author: MaiChao
 * @Date: 2021-02-07 15:31:16
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-05-20 18:58:06
-->
<template>
  <div class="real-time content-box">
    <div class="tabs-header isActive">
      <span class="tabs-title">预警记录</span>
    </div>
    <div class="wx-warp-box">
      <div class="search_form">
        <el-form :inline="true"
                 ref="ruleForm"
                 :model="ruleForm">
          <el-form-item class="number"
                        prop="data"
                        label="账号名称">
            <el-select v-model="ruleForm.biz"
                       placeholder="请选择"
                       size="mini"
                       @change="changeOpt()" class="sear_sel">
              <!-- <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option> -->
              <el-option v-for="item in options"
                         :key="item.id"
                         :label="item.accountName"
                         :value="item.biz">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="number"
                        prop="data"
                        label="时间">
            <el-date-picker v-model="publishTime"
                            size="mini"
                            type="daterange"
                            value-format='yyyy-MM-dd'
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期" class="sear_date">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="keyword">
            <el-input size="mini"
                      v-model="ruleForm.title"
                      placeholder="请输入关键字" class="sear_inp"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button size="mini"
                       @click="queryShow"
                       type="primary" class="sear_btn2">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="mini"
                       @click="resetForm('ruleForm')" class="sear_but">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="wx-warp-content">
      <div>
        <el-table :data="articleData"
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
          <el-table-column prop="keyword"
                           label="账号名称"
                           width="200">
            <template slot-scope='scope'>
              <div class="account-msg-box flex-ali-center">
                <img :src="scope.row.headImage"
                     alt="">
                <div class="account-msg">
                  <!-- <p class="lin-clamp-1"
                     v-html="scope.row.accountName"></p> -->
                     <p class="lin-clamp-1">{{scope.row.accountName}}</p>
                  <p class="lin-clamp-1">微信号：<span>{{scope.row.alias}}</span></p>
                </div>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="title"
                           label="文章标题">
          </el-table-column> -->
          <el-table-column label="文章标题">
            <template slot-scope='scope'>
                    <div class="cursor" @click="targetUrl(scope.row.url)">
                      <span>{{scope.row.title}}</span>
                    </div>
                  </template>
          </el-table-column>
          <el-table-column prop="likeNum"
                           label="点赞数"
                           width="80">
          </el-table-column>
          <el-table-column prop="oldLikeNum"
                           label="阅读数"
                           width="80">
          </el-table-column>
          <el-table-column prop="readNum"
                           label="在看数"
                           width="80">
          </el-table-column>
          <el-table-column prop="publishTime"
                           label="发布时间"
                           width="100">
          </el-table-column>
          <el-table-column prop="warningKeys"
                           label="命中关键词"
                           width="120">
          </el-table-column>
          <el-table-column prop="position"
                           label="所在位置"
                           width="80">
          </el-table-column>
        </el-table>
      </div>
      <div class="page-pagination">
        <set-page @pagingChange="pagingChange"
                  :total="total"
                  ref="child"></set-page>
      </div>
    </div>
  </div>
</template>
<script>
// import vSearch from '@/views/monitor/components/RealSearch'
import { timeFormat } from '@/lib/tools'
export default {
  data () {
    return {
      dialogVisible: false,
      total: 0,
      deleteItem: {},
      ids: [],
      deleteShow: false,
      deleteTeam: false,
      articleData: [],
      checkList: ['标题'],
      tipVisible: false, // 没查到提示
      options: [],
      value: '',
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

      // rules: {
      //   fromData: [{ required: true, message: '请选择监测时间', trigger: 'blur' }]
      // },
      publishTime: [], // 日期
      ruleForm: {
        pageSize: 10,
        pageNum: 1,
        biz: '',
        title: '', // 标题搜索
        startDate: '',
        endDate: ''
        // accountName: ''
      },
      tableData: [],
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
    changeOpt () {
      // console.log(this.ruleForm.biz)
      this.$refs.child.handleCurrentChange(1)
    },
    geiDialog () {
      this.dialogVisible = true
    },
    addHave () {
      this.haveList.push(this.creadForm.have)
      this.creadForm.have = ''
    },
    addNot () {
      this.notList.push(this.creadForm.not)
      this.creadForm.not = ''
    },
    openUrl (item) {
      if (item.url) {
        window.open(item.url, '_black')
      }
    },
    // 查询
    queryShow () {
      this.$refs.child.handleCurrentChange(1)
    },
    // 重置
    resetForm () {
      console.log(this.ruleForm)
      this.publishTime = []
      this.ruleForm = {
        pageSize: 10,
        pageNum: 1,
        biz: '',
        title: '', // 标题搜索
        startDate: '',
        endDate: '',
        accountName: ''
      }
      // if (this.$route.query.biz) {
      //   this.ruleForm.biz = this.$route.query.biz
      // }
      this.$refs.child.handleCurrentChange(1)
    },
    // 分页
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
      this.getArticle()
    },
    // 获取命中文章展示列表
    getArticle () {
      this.articleData = []
      if (this.publishTime.length > 0) {
        this.ruleForm.startDate = this.publishTime[0]
        this.ruleForm.endDate = this.publishTime[1]
      }
      this.$http.post(this.$api.hitArticleList, this.ruleForm)
        .then(res => {
          this.articleData = res.data.data.content
          this.total = res.data.data.totalElements
        }).catch(() => { })
    },
    // 获取账号名称
    getAllAccount () {
      // this.ruleForm.id = this.$route.query
      this.$http.get(this.$api.allAccount)
        .then(res => {
          console.log(res.data.data)
          this.options = res.data.data
        }).catch(() => { })
    },
    // 跳转文章
    targetUrl (url) {
      window.open(url)
    }
  },
  created () {
    // console.log(this.$route.query)
    this.getCurrentTime()
    if (this.$route.query.biz) {
      // console.log(111)
      this.ruleForm.biz = this.$route.query.biz
    }
    this.getArticle()
    this.getAllAccount()
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
.content-box {
  // width: 1213px;
}
.wx-warp-box {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 20px 30px;
}
.wx-warp-content {
  padding: 0 20px;
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
.cursor{
  cursor: pointer;
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
.creadForm .el-date-editor {
  // width: 382px;
}
.sear_but{
  color: #3b81fe;
}
.sear_inp {
  width: 166px;
  height: 36px;
}
.addBtn {
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
}
.sear_date {
  width: 205px;
  height: 28px;
}
.sear_sel {
  width: 121px;
}
.sear_inp {
  width: 140px;
}
.search {
  margin-left: -10px;
}
.sear_btn2 {
  background-color: #3b82fe;
}
</style>
