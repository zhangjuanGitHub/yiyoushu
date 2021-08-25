<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-03-05 10:06:51
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-06-07 18:40:15
-->
<template>
  <div class="interaction content-box">
    <!-- <div class="tabs-header">
      <span class="tabs-title"
            @click="tabsAll('createTask', 1)"
            :class="this.activeTab==='createTask'?'isActive':''">创建任务</span>
      <span class="tabs-title"
            @click="tabsAll('taskList', 2)"
            :class="this.activeTab==='taskList'?'isActive':''">任务列表</span>
    </div> -->
    <div>
      <div class="list-main flex-cloumn-ll">
        <div class="list-main-search">
          <el-form :inline="true"
                   ref="ruleForm"
                   :model="ruleForm">
            <el-form-item label="分析时长:"
                          prop="">
              <el-radio v-model="ruleForm.dateType"
                        label="1"
                        @change="changeDateType">周分析</el-radio>
              <el-radio v-model="ruleForm.dateType"
                        label="2"
                        @change="changeDateType">月分析</el-radio>
            </el-form-item>
            <el-form-item label=""
                          prop="publishTime">
              <el-date-picker v-model="ruleForm.publishTime"
                              type="daterange"
                              size="small"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd"
                              range-separator="-"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="keyword"
                          label="">
              <el-input size="small"
                        v-model="ruleForm.keyword"
                        placeholder="请输入关键字"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small"
                         @click="searchList"
                         type="primary">搜索</el-button>
              <el-button size="small"
                         @click="resetForm">重置</el-button>
              <el-button size="small"
                         type="danger"
                         v-if="!comfirmDel"
                         @click="goDelete">批量删除</el-button>
              <el-button size="small"
                         type="danger"
                         plain
                         v-if="comfirmDel"
                         @click="confirmDelete">确认删除</el-button>
              <el-button size="small"
                         type="primary"
                         plain
                         v-if="comfirmDel"
                         @click="cancelDelete">取消删除</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="list-main-list"
             v-if="taskList.length > 0">
          <div class="main-list-box"
               @click.prevent="hdToAnalyse(item)"
               :class="[{ 'is-todelete': comfirmDel }, { 'cursor': item.illegalStatus > 0 } ]"
               v-for="(item, index) of taskList"
               :key="index">
            <div class="flex-bwt-center top_all">
              <div class="main-list-up flex-ali-center left-head-img">
                <img :src="item.hdHeadImg">
                <div class="main-list-name cursor">
                  <p v-html="item.nickname" class="nickname-p"></p>
                  <!-- <p v-html="item.username"></p> -->
                </div>
              </div>
              <div>
                <!-- <p class="warning">影响力指数{{item.yxl}}</p> -->
                <!-- <p v-if="item.illegalStatus === -1"
                   class="warning">监测中</p>
                <p v-else-if="item.illegalStatus === 0"
                   class="success">无违规文章</p>
                <p v-else
                   class="danger danger-border">监测到<span>{{item.illegalStatus}}</span>篇违规文章</p> -->
              </div>
              <!-- <div v-if="true"
                   class="cursor"
                   @click="toAnalyse(item.id)">
                <el-progress type="circle"
                             :width="40"
                             :stroke-width="3"
                             :format="format"
                             :color="customColorMethod"
                             :percentage="Number(item.analyseScore)"></el-progress>
              </div> -->
              <div v-if="item.analyseScore > 0"
                   class="cursor"
                   @click="hdToAnalyse(item)">
                <el-progress type="circle"
                             :width="40"
                             :stroke-width="3"
                             :format="format"
                             :color="customColorMethod"
                             :percentage="Number(item.analyseScore)"></el-progress>
              </div>
              <p v-else>分析中...</p>
            </div>
            <div class="main-list-time2">
              <p>分析时长:<span class="main-list-time2-span sp">{{item.dateType == '1'?"周":"月"}}</span></p>
              <p>粉丝数:<span class="sp">{{item.followersCount}}</span></p>
            </div>
            <div class="main-list-time">
              <p>创建时间：<span>{{item.createTime}}</span></p>
              <p>分析时间：<span>{{item.startDate}}</span> 至 <span>{{item.endDate}}</span></p>
            </div>
            <div class="main-list-del"
                 v-if="comfirmDel"></div>
            <el-checkbox-group v-model="item.conDel"
                               v-if="comfirmDel"
                               @click.native="stopDefault($event)"
                               @change="changeIsDel(item, index)">
              <el-checkbox :value="1"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="list-main-list"
             v-else>
          <p>没有查询到任务哦</p>
        </div>
        <div class="pagination-wrap flex-all-center">
          <el-pagination @current-change="handleCurrentChange"
                         background
                         :pager-count="5"
                         layout="total, prev, pager, next, jumper"
                         :page-size="ruleForm.pageSize"
                         :current-page.sync="ruleForm.pageNum"
                         :hide-on-single-page="total<=ruleForm.pageSize"
                         :total="total2">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { timeFormat } from '@/lib/tools'
// import { timeFormat, exportTable } from '@/lib/tools'
// import FileSaver from 'file-saver'
export default {
  data () {
    return {
      // duration: '1', // 分析时长
      // duration2: '1', // 分析时长
      warningMessage: null, // 消息提示
      targetRouteName: '', // 如果没有认证单位或者没有关注账号跳转到相应页面
      tableData: [],
      // activeTab: 'createTask',
      activeTab: 'taskList',
      time: [], // 时间范围
      radio: '', // 时间单选
      total: {
        total: 0
      },
      params: { // 开始监测参数
        publishTime: [],
        biz: ''
      },
      pickerOptions: {
        // 设置不能选择的日期
        onPick: ({ maxDate, minDate }) => {
          this.choiceDate0 = minDate.getTime()
          if (maxDate) {
            this.choiceDate0 = ''
          }
        },
        disabledDate: (time) => {
          let choiceDateTime = new Date(this.choiceDate0).getTime()
          const minTime = new Date(choiceDateTime).setMonth(new Date(choiceDateTime).getMonth() - 6)
          const maxTime = new Date(choiceDateTime).setMonth(new Date(choiceDateTime).getMonth() + 6)
          const min = minTime
          const newDate = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
          const max = newDate < maxTime ? newDate : maxTime
          // 如果已经选中一个日期 则 返回 该日期前后一个月时间可选
          if (this.choiceDate0) {
            return time.getTime() < min || time.getTime() > max
          }// 若一个日期也没选中 则 返回 当前日期以前日期可选
          return time.getTime() > newDate
        }
      },
      addList: [],
      pageBean: {
        pageNum: 1,
        pageSize: 10
      },
      queryText: '',
      record: [], // 搜索历史
      cycle: [],
      selectItem: {}, // 选择的账号
      // 任务列表
      ruleForm: {
        dateType: '1',
        keyword: '',
        publishTime: [],
        pageNum: 1,
        pageSize: 12
      },
      total2: 0,
      comfirmDel: false,
      deleteList: [],
      // taskList: []
      taskList: [
        // {
        //   nickname: '央视新闻',
        //   hdHeadImg: 'http://wx.qlogo.cn/mmhead/Q3auHgzwzM7K1jDqNGenoK7DmzRhYy9KG8P4PodewZO43zV8qiaqh0A/132',
        //   userName: '',
        //   headName: '',
        //   illegalStatus: '1',
        //   createTime: '2021-05-11 10:11:03',
        //   startDate: '2021-05-11',
        //   endDate: '2021-05-13',
        //   days: '周',
        //   fs: '1338.17万',
        //   yxl: '73',
        //   analyseScore: '73'
        // }
      ]
    }
  },
  watch: {
    radio (newValue, oldValue) {
      console.log(newValue)
      console.log(timeFormat(this.calcDate(newValue === '1' ? 7 : 30)))
      console.log(timeFormat(this.calcDate(1)))
      // 自定义时间changeDate筛选触发，radio= '' 不让清空右侧值，不然自定义时间赋值不上
      if (newValue) {
        this.time = [] // 清空右侧 自定义时间
      }
      this.params.publishTime[0] = timeFormat(this.calcDate(newValue === '1' ? 7 : 30))
      this.params.publishTime[1] = timeFormat(this.calcDate(1))
      // this.calcDate(1)
      // this.calcDate(newValue === '1' ? 7 : 30)
    }
  },
  methods: {
    // 分页
    // pagingChange (query) {
    //   this.pageBean.pageSort.pageSize = query.size
    //   this.pageBean.pageSort.pageNum = query.page
    //   this.getAccountList()
    // },
    // tab
    tabsAll (name, level) {
      console.log(name)
      // if (this.warningMessage !== null) {
      //   this.warningMessage.close()
      // }
      this.tableData = []
      this.activeTab = name
      this.pageBean.level = level
      // this.$refs.search.resetForm()
    },
    // 时间选择后 清除单选
    changeDate () {
      this.radio = ''
    },
    calcDate (num) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * num)
      return date
    },
    // 分页
    pagingChange (query) {
      this.pageBean.pageSize = query.size
      this.pageBean.pageNum = query.page
      this.searchQuery()
    },
    // 点击搜索记录
    clickRecord (name) {
      this.queryText = name
      this.$refs.child ? this.$refs.child.handleCurrentChange(1) : this.searchQuery()
    },
    // 开始分析
    startAnalyse () {
      console.log(this.params.publishTime.length)
      console.log(this.time.length)
      if (this.params.publishTime.length !== 0 || this.time.length !== 0) {
        if (this.time.length !== 0) {
          this.params.publishTime = this.time
        }
        console.log(11111)
      } else {
        this.$message.warning('请选择时间范围')
        return
      }
      this.$http.post(this.$api.addIllegalAccount, this.params)
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success('添加成功')
            this.$emit('changeTab', 'list')
          }
        }).catch(() => {
        })
    },
    // 选中
    selectAccount (item, index) {
      this.addList.forEach(i => {
        i.isSelected = false
      })
      item.isSelected = true
      this.$set(this.addList, index, item)
      this.params.biz = item.biz
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
      // this.$http.post(this.$api.wxSearch, obj)
      this.$http.post(this.$api.wbSearch, obj)
        .then(res => {
          if (res.data.data.length > 1) {
            this.total = res.data.data.shift()
            this.addList = res.data.data
            this.addList.forEach(item => {
              item.isSelected = false
            })
          }
        }).catch(() => { })
    },
    listenerSubmit (e) {
      if (e.keyCode === 13) {
        // this.submitSearch()
        this.searchList()
      }
    },
    // 任务列表的
    // 阻止复选框冒泡
    stopDefault (e) {
      e.stopPropagation()
    },
    // 分页
    handleCurrentChange (page) {
      // this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = page
      this.getTaskList()
    },
    format (percentage) {
      // return percentage + '分'
      return percentage
    },
    customColorMethod (percentage) {
      if (percentage < 30) {
        return '#ff0000'
      } else if (percentage < 70) {
        return '#e6a23c'
      } else {
        return '#67c23a'
      }
    },
    hdToAnalyse (item) {
      // if (item.illegalStatus > 0) {
      //   var routePath = this.$router.resolve({
      //     name: 'WrongDetailBox',
      //     query: { id: item.id }
      //   })
      //   window.open(routePath.href, '_blank')
      // } else if (item.illegalStatus === -1) {
      //   this.$message.warning('该账号正在监测中')
      // } else {
      //   this.$message.warning('该账号无违规文章')
      // }
      if (item.analyseScore > 0) {
        this.$router.push({ name: 'WeekDetailWb', query: { id: item.id } })
      } else {
        this.$message.warning('还在分析中，请稍后')
      }
    },
    // 跳转详情页
    toAnalyse (item) {
      // let routeName = this.$route.name === 'MonthSearch' ? 'MonthDetail' : 'WeekDetail'
      // this.$router.push({ name: routeName, query: { id: id } })
      // this.$router.push({ name: 'WeekDetailWb', query: { id: id } })
      let routeName = this.ruleForm.dateType == '1' ? 'WeekDetailWb' : 'WeekDetailWb'
      this.$router.push({ name: routeName, query: { id: item.id } })
    },
    goDelete () {
      this.comfirmDel = true
    },
    // 取消删除
    cancelDelete () {
      this.comfirmDel = false
    },
    changeIsDel (item, index) {
      this.$set(this.taskList, index, item)
    },
    // 确认删除
    confirmDelete () {
      let ids = []
      let filterData = this.taskList.filter(item => item.conDel === true)
      if (filterData.length === 0) {
        this.$message.warning('请选择需要删除的数据！')
        return false
      }
      filterData.forEach((item) => {
        ids.push(item.id)
      })
      this.$http.post(this.$api.delAnalyseAccount, { ids: ids })
        .then(res => {
          ids.forEach((item) => {
            this.taskList.forEach((val, index) => {
              if (item === val.id) {
                this.taskList.splice(index, 1)
              }
            })
          })
          this.total2 = this.total2 - ids.length
          this.comfirmDel = false
          this.$message.success('删除成功！')
        }).catch(() => { })
    },
    // 筛选
    searchList () {
      this.handleCurrentChange(1)
    },
    // 重置
    resetForm () {
      this.ruleForm.keyword = ''
      this.ruleForm.publishTime = []
      this.handleCurrentChange(1)
    },
    // 获取任务列表
    getTaskList () {
      this.$http.post(this.$api.findAnalyseAccountWb, this.ruleForm)
        .then(res => {
          this.taskList = res.data.data.content
          this.taskList.forEach(item => {
            item.conDel = false
          })
          this.total2 = res.data.data.totalElements
        }).catch(() => { })
    },
    changeDateType () {
      this.getTaskList()
    }
  },
  created () {
    // this.getRecord()
    this.getTaskList()
    // this.getTime()
    // this.getAccountList()
  },
  mounted () {
    window.addEventListener('keydown', this.listenerSubmit)
  },
  destroyed () {
    window.removeEventListener('keydown', this.listenerSubmit, false)
  },
  components: {
    // vSearch
  }
}
</script>
<style lang="scss" scoped>
@import '../monitor.css';
.interaction {
  margin-bottom: 20px;
}

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

.add-main {
  margin: 20px;
}
.add-task-search p {
  width: 90px;
  font-size: 16px;
}
.list-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.time-box {
  width: 580px;
  margin: 20px auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-date-editor {
  width: 355px;
  margin-left: 20px;
}
.wrong-btn {
  text-align: center;
  margin-top: 20px;
}
.add-task-search .el-input {
  width: 377px;
  height: 40px;
  // margin-right: 10px;
}
.add-main-record {
  width: 380px;
  // margin: 8px auto;
  margin-top: 16px;
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
.add-list-box {
  width: 483px;
  height: 110px;
  background: #f7f8fa;
  margin-top: 15px;
  margin-left: 15px;
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

.title {
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
  /* font-weight: 550; */
}
.radio {
  text-align: center;
}
.radio1 {
  margin-right: 80px;

  margin-bottom: 20px;
}
.tips {
  text-align: center;
  margin: 10px 0 10px 0;
}
</style>

<style>
.main-list-box .el-progress__text {
  display: block;
}
.main-list-box .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #f56c6c;
  border-color: #f56c6c;
}
</style>
<style scoped>
.list-main {
  width: 100%;
  height: 100%;
}
.list-main-search {
  height: 40px;
}
.list-main-search .el-range-editor.el-input__inner {
  width: 230px;
}
.list-main-list {
  width: 100%;
  margin: 20px 0;
  min-height: 700px;
}
.list-main-list > p {
  text-align: center;
  line-height: 200px;
  color: #6b798e;
}
.main-list-box {
  width: 355px;
  height: 185px;
  margin: 10px;
  padding: 10px;
  float: left;
  position: relative;
  box-sizing: border-box;
  border: 1px solid #e4e7ea;
  border-radius: 10px;

  cursor: pointer;
}
.list-main-list .is-todelete {
  border-color: #3b81fe;
}
.main-list-del {
  width: 0;
  height: 0;
  border-top: 40px solid #3b81fe;
  border-left: 40px solid transparent;
  position: absolute;
  top: 0;
  right: 0;
}
.main-list-box .el-checkbox-group {
  width: 15px;
  float: right;
  position: absolute;
  top: 3px;
  right: 3px;
}
.main-list-up > img {
  /* widows: 60px; */
  widows: 40px;
  height: 40px;
  /* border-radius: 30px; */
  margin-right: 10px;
}
.main-list-name p:nth-child(1) {
  font-size: 16px;
  color: #151c29;
}
.main-list-name p:nth-child(2) {
  color: #6b798e;
}
.main-list-time{
  margin-left: 20px;
}
.main-list-time2 {
  margin-bottom: 10px;
  margin-left: 20px;
}
.main-list-time2 p {
  margin-bottom: 5px;
}
.main-list-time2-span {
  color: chocolate;
}
.main-list-time p {
  color: #adaeb2;
}
.main-list-time p span {
  color: #151c29;
}
.list-main {
  padding: 20px;
}
.top_all {
  padding: 0 0 10px 0;
  border-bottom: 1px solid #e4e7ea;
  margin-bottom: 10px;
}

.sp{
  margin-left: 10px;
}
.left-head-img{
  margin-left: 20px;
}
.nickname-p{
  /* font-size:14px */
  /* font-weight:550 */
}
</style>
