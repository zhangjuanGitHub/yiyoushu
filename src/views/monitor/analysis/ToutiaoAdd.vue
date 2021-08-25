<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-03-05 10:06:51
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-07-22 14:18:22
-->
<template>
  <div class="interaction content-box">
    <div>
      <div class="add-main flex-cloumn-cen">
        <img src="@/assets/images/monitor/analyse.png"
             alt="">
        <div class="add-main-center">
          <div class="add-task-duration">
            <p class="title">分析时长</p>
            <div class="radio">
              <el-radio v-model="ruleForm.dateType"
                        label="1"
                        class="radio1"
                        @change="changeDate2">周分析</el-radio>
              <el-radio v-model="ruleForm.dateType"
                        label="2"
                        @change="changeDate2">月分析</el-radio>
            </div>

            <p class="tips"
               v-if="this.duration==='1'">为您提供最近一周头条数据报告</p>
            <p class="tips"
               v-else>为您提供最近一月头条数据报告</p>
            <p class="title">账户名称搜索</p>
          </div>
          <div class="add-task-search">
            <el-input v-model="queryText"
                      placeholder="请输入账号名称"
                      class="add-task-search-input"></el-input>
            <el-button size="small"
                       type="primary"
                       @click="submitSearch">搜索</el-button>
          </div>
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
        </div>
      </div>
      <div class="add-main-list list-box">
        <div class="add-list-box flex-ali-center"
             v-for="(item, index) of addList"
             :key="index"
             :class="{'is_select_box': item.isSelected }">
          <img :src="item.avatar_img"
               alt="">
          <div class="add-list-msg">
            <div class="flex-bwt-center">
              <div class="add-list-name">
                <p v-html="item.screen_name"></p>
                <!-- <p v-if="item.city">地区：<span>{{item.city}}</span></p> -->
              </div>
              <p class="add-list-select"
                 :class="{'is_select_act': item.isSelected }"
                 @click="selectAccount(item, index)">选择</p>
            </div>
            <p v-html="item.description"
               class="lin-clamp-1"></p>
          </div>
        </div>
      </div>
      <set-page @pagingChange="pagingChange"
                :total="total.total"
                ref="child"
                v-if="addList.length > 0"></set-page>
      <!-- <set-page @pagingChange="pagingChange"
                :total="total.total"
                ref="child"
                v-if="addList.length > 0 && JSON.stringify(selectItem) === '{}'"></set-page> -->
      <div class="wrong-btn">
        <el-button size="large"
                   type="primary"
                   v-if="addList.length > 0"
                   @click="startAnalyse">开始分析</el-button>
      </div>
      <!-- <div v-if="this.selectItem.id">
        <div class="time-box">
          <p class="font-16">时间范围</p>
          <div>
            <el-radio v-model="radio"
                      label="1">7天</el-radio>
            <el-radio v-model="radio"
                      label="2">30天</el-radio>
          </div>
          <div>
            <el-date-picker v-model="time"
                            type="daterange"
                            size="small"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions"
                            @change="changeDate"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="wrong-btn">
          <el-button size="large"
                     type="primary"
                     v-if="addList.length > 0"
                     @click="startAnalyse">开始分析</el-button>
        </div>
      </div> -->
    </div>

    <el-dialog :visible.sync="tipVisible"
               :modal-append-to-body="false"
               :close-on-click-modal='false'
               center
               @close="cancelSearch"
               width="37%">
      <div class="add-list-dialog flex-cloumn-all">
        <i class="el-icon-success"></i>
        <p class="add-dialog-ss">操作成功，开始诊断</p>
        <p class="add-dialog-pp">正在诊断中，本次诊断预计耗时10-15分钟，您可以在<span @click="toTab">【任务列表】</span>中查看详情</p>
      </div>
      <div slot="footer">
        <el-button type="success"
                   @click="toTab">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { timeFormat } from '@/lib/tools'
// import { timeFormat, exportTable } from '@/lib/tools'
// import FileSaver from 'file-saver'
export default {
  data () {
    return {
      tipVisible: false,
      duration: '1', // 分析时长
      duration2: '1', // 分析时长
      warningMessage: null, // 消息提示
      targetRouteName: '', // 如果没有认证单位或者没有关注账号跳转到相应页面
      tableData: [],
      // activeTab: 'createTask',
      // activeTab: 'taskList',
      time: [], // 时间范围
      radio: '', // 时间单选
      total: {
        total: 0
      },
      // params: { // 开始监测参数
      //   publishTime: [],
      //   biz: ''
      // },
      params: { // 开始监测参数
        publishTime: [],
        userId: ''
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
        keyword: '',
        publishTime: [],
        pageNum: 1,
        pageSize: 12,
        dateType: '1'
      },
      total2: 0,
      comfirmDel: false,
      deleteList: [],
      // taskList: []
      taskList: [
        {
          nickname: '央视新闻',
          hdHeadImg: 'http://wx.qlogo.cn/mmhead/Q3auHgzwzM7K1jDqNGenoK7DmzRhYy9KG8P4PodewZO43zV8qiaqh0A/132',
          userName: '',
          headName: '',
          illegalStatus: '1',
          createTime: '2021-05-11 10:11:03',
          startDate: '2021-05-11',
          endDate: '2021-05-13',
          days: '周',
          fs: '1338.17万',
          yxl: '73',
          analyseScore: '73'
        }
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
    // 取消弹框
    cancelSearch () {
      this.queryText = ''
      this.addList = []
      this.tipVisible = false
      this.getRecord()
    },
    // 时间选择后 清除单选
    changeDate () {
      this.radio = ''
    },
    changeDate2 () {
      // console.log(this.duration)
      // console.log(this.ruleForm.dataType)
      this.calcCycle()
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
      // console.log(this.params.publishTime.length)
      // console.log(this.time.length)
      // if (this.params.publishTime.length !== 0 || this.time.length !== 0) {
      //   if (this.time.length !== 0) {
      //     this.params.publishTime = this.time
      //   }
      //   console.log(11111)
      // } else {
      //   this.$message.warning('请选择时间范围')
      //   return
      // }
      // console.log(this.params)
      // this.$http.post(this.$api.addAnalyseAccount, this.params)
      //   .then(res => {
      //     if (res.data.code === 200) {
      //       this.$message.success('添加成功')
      //       this.$emit('changeTab', 'list')
      //     }
      //   }).catch(() => {
      //   })
      console.log(this.selectItem)
      if (this.selectItem.user_id) {
        let obj = {
          accountId: this.selectItem.user_id,
          dateType: this.ruleForm.dateType,
          startDate: this.cycle[0],
          endDate: this.cycle[1]
        }
        this.$http.post(this.$api.addAnalyseAccountToutiao, obj)
          .then(res => {
            if (res.data.message === '已存在' && res.data.code === 200) {
              let str = this.ruleForm.dateType === '1' ? '您已添加过该账号进行周分析了' : '您已添加过该账号进行月分析了'
              this.$message.warning(str)
            } else {
              this.tipVisible = true
            }
          }).catch(() => {
          })
      } else {
        this.$message.warning('请选择一个账号进行分析')
      }
    },
    toTab () {
      this.queryText = ''
      this.addList = []
      this.tipVisible = false
      this.$emit('changeTab', 'taskList')
    },
    // 选中
    selectAccount (item, index) {
      this.addList.forEach(i => {
        i.isSelected = false
      })
      item.isSelected = true
      this.$set(this.addList, index, item)
      // this.params.biz = item.biz
      this.params.userId = item.user_id
      this.selectItem = item
    },
    searchQuery () {
      let obj = {
        queryText: this.queryText,
        pageBean: {
          pageSize: this.pageBean.pageSize,
          pageNum: (this.pageBean.pageNum - 1) * this.pageBean.pageSize + 1
          // pageNum: this.pageBean.pageNum
        },
        range: 1
      }
      // this.$http.post(this.$api.wxSearch, obj)
      this.$http.post(this.$api.queryTtAccount, obj)
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
    // 搜索账号列表
    submitSearch () {
      if (this.queryText) {
        this.addRecord()
        this.$refs.child ? this.$refs.child.handleCurrentChange(1) : this.searchQuery()
      } else {
        this.$message.warning('请输入搜索内容')
      }
      // this.record.push(this.queryText)
    },
    // 获取搜索记录
    getRecord () {
      this.$http.get(this.$api.findQueryToutiao)
        .then(res => {
          this.record = res.data.data
        }).catch(() => { })
    },
    // 添加搜索记录
    addRecord () {
      this.$http.post(this.$api.addQueryLogToutiao, { nickname: this.queryText })
        .then(res => { }).catch(() => { })
    },
    // 删除搜索记录
    deleteRecord () {
      this.$http.get(this.$api.delQueryLogToutiao)
        .then(res => {
          this.record = []
          this.$message.success('删除记录成功！')
        }).catch(() => { })
    },
    listenerSubmit (e) {
      if (e.keyCode === 13) {
        this.submitSearch()
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
    },
    // 跳转详情页
    toAnalyse (id) {
      // let routeName = this.$route.name === 'MonthSearch' ? 'MonthDetail' : 'WeekDetail'
      // this.$router.push({ name: routeName, query: { id: id } })
      this.$router.push({ name: 'WeekDetailWb', query: { id: id } })
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
      this.$http.post(this.$api.delIllegalAccoun, { ids: ids })
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
      this.$http.post(this.$api.findIllegalAccount, this.ruleForm)
        .then(res => {
          // this.taskList = res.data.data.content
          // this.taskList.forEach(item => {
          //   item.conDel = false
          // })
          this.total2 = res.data.data.totalElements
        }).catch(() => { })
    },
    // 计算周期
    calcCycle () {
      let end = this.calcDate(1)
      // let start = this.calcDate(this.duration === '1' ? 7 : 30)
      let start = this.calcDate(this.ruleForm.dateType === '1' ? 7 : 30)
      this.cycle[0] = timeFormat(start)
      this.cycle[1] = timeFormat(end)
    }
  },
  created () {
    this.getRecord()
    this.calcCycle()
    // this.getTaskList()  //获取任务列表
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
  height: 200px;
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
  widows: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 10px;
}
.main-list-name p:nth-child(1) {
  font-size: 16px;
  color: #151c29;
}
.main-list-name p:nth-child(2) {
  color: #6b798e;
}
.main-list-time .main-list-time2 {
  margin-top: 10px;
  margin-left: 10px;
}
.main-list-time2 {
  margin-bottom: 10px;
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
</style>
