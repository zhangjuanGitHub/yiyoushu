<!--
 * @Author: MaiChao
 * @Date: 2021-03-15 16:16:36
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-22 16:15:32
-->
<template>
  <div class="contents">
    <div class="personal account-box">
      <div class="tabs-header">
        <span class="tabs-title"
              @click="tabsAll('wx', 1)"
              :class="this.activeTab==='wx'?'isActive':''">微信榜单</span>
        <!-- <span class="tabs-title"
              @click="tabsAll('wb', 2)"
              :class="this.activeTab==='wb'?'isActive':''">微博榜单</span> -->
        <span class="right-btn cursor"
              @click="openCust"><i class="el-icon-s-data"></i>自定义榜单</span>
      </div>
      <div class="conts-box">
        <div class="title-time">微信公众号 <span>{{ruleForm.date}}</span> 总榜</div>
        <div class="from-box">
          <el-form :inline="true"
                   ref="ruleForm"
                   :model="ruleForm">
            <div class="flex-ali-center">
              <el-form-item prop="types">
                <el-radio-group v-model="ruleForm.types"
                                size='small'
                                @change="openOther(ruleForm.types)">
                  <el-radio-button label="1">公众号</el-radio-button>
                  <el-radio-button label="2">文章</el-radio-button>
                  <el-radio-button label="3">视频</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="时间"
                            class="date-box">
                <el-input placeholder="请输入内容"
                          v-if="ruleForm.rankingType===1"
                          v-model="ruleForm.date"
                          :disabled="true"
                          size='small'
                          class="date-time">
                </el-input>
                <el-select v-model="ruleForm.date"
                           v-else
                           placeholder="请选择"
                           size='small'>
                  <el-option v-for="item in dateOption"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="explain-box">
                <el-button size="small"
                           @click="explain()">数据榜单说明</el-button>
              </el-form-item>
            </div>
            <div class="flex-ali-center">
              <el-form-item>
                <el-radio-group v-model="ruleForm.rankingType"
                                size='small'
                                @change='getDateOption'>
                  <el-radio-button :label="1">日榜</el-radio-button>
                  <el-radio-button :label="2">周榜</el-radio-button>
                  <el-radio-button :label="3">月榜</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="function"
                            label="类型"
                            class="messageType public">
                <el-cascader size="small"
                             :options="options"
                             :show-all-levels="false"
                             v-model="ruleForm.function"
                             placeholder="请选择类型"></el-cascader>
              </el-form-item>
              <el-form-item>
                <el-button size="small"
                           @click="searchList"
                           type="primary">筛选</el-button>
                <el-button size="small"
                           @click="resetForm('ruleForm')">重置</el-button>
                <el-button size="small"
                           type="warning"
                           @click="exportBox()">导出</el-button>
                <!-- <el-button size="small"
                           @click="applyList()">申请入榜</el-button> -->
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="quick-click flex-bwt-center">
          <div class="click-box color1 flex-arr-center cursor"
               @click="searchType('教育')">
            <div class="flex-arr-center">
              <img class="click-image"
                   :src="require('@/assets/images/assess/01.png')">
              <span class="click-name">教育榜</span>
            </div>
          </div>
          <div class="click-box color2 flex-arr-center cursor"
               @click="searchType('时尚')">
            <div class="flex-arr-center">
              <img class="click-image"
                   :src="require('@/assets/images/assess/02.png')">
              <span class="click-name">时尚榜</span>
            </div>
          </div>
          <div class="click-box color3 flex-arr-center cursor"
               @click="searchType('娱乐')">
            <div class="flex-arr-center">
              <img class="click-image"
                   :src="require('@/assets/images/assess/03.png')">
              <span class="click-name">娱乐榜</span>
            </div>
          </div>
          <div class="click-box color6 flex-arr-center cursor"
               @click="searchType('科技')">
            <div class="flex-arr-center">
              <img class="click-image"
                   :src="require('@/assets/images/assess/04.png')">
              <span class="click-name">科技榜</span>
            </div>
          </div>
        </div>
        <div class="table-box">
          <el-table :data="tableData"
                    style="width: 100%"
                    ref="table"
                    id="wx-monitor"
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
                             label="公众号">
              <template slot-scope='scope'>
                <div class="account-infor flex-ali-center">
                  <img :src="scope.row.cover"
                       alt="">
                  <div class="account-name">
                    <p class="import-name"
                       v-html='scope.row.nickname'></p>
                    <p>{{scope.row.alias}}</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pubCount"
                             label="总发布次数"
                             width="110">
            </el-table-column>
            <el-table-column prop="numCount"
                             label="文章数"
                             width="110">
            </el-table-column>
            <el-table-column prop="readNumCount"
                             label="总阅读数"
                             width="110">
            </el-table-column>
            <el-table-column prop="oldLikeNumCount"
                             label="总点赞数"
                             width="110">
            </el-table-column>
            <el-table-column prop="likeNumCount"
                             label="总在看数"
                             width="110">
            </el-table-column>
            <el-table-column prop="firstReadNumCount"
                             label="头条阅读数"
                             width="110">
            </el-table-column>
            <el-table-column prop="firstOldLikeNumCount"
                             label="头条点赞数"
                             width="110">
            </el-table-column>
            <el-table-column prop="firstLikeNumCount"
                             label="头条在看数"
                             width="110">
            </el-table-column>
            <el-table-column prop="last_pubtime"
                             label="操作"
                             width="90">
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
    </div>
    <el-dialog title="榜单申请"
               :visible.sync="dialogVisible"
               :close-on-click-modal='false'
               width="30%"
               :before-close="offDialog">
      <span> 您的申请已经提交，请您耐心等待榜单持有者的审核。</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="offDialog">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="addDelete"
               :visible.sync="addShow"
               :close-on-click-modal='false'
               width="30%"
               :before-close="offAdd">
      <span> 确定执行此操作?</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="defineAdd"
                   v-if="addDelete==='添加收藏'">确定</el-button>
        <el-button @click="defineDeldte"
                   v-if="addDelete==='取消收藏'"
                   type="primary">确定</el-button>
        <el-button @click="offAdd">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="我的榜单列表"
               :visible.sync="addUserShow"
               :close-on-click-modal='false'
               width="30%"
               :before-close="offAddUser"
               class="addUser">
      <div class="radio-box">
        <el-radio-group v-model="rankingUserId">
          <el-radio v-for="item in addData"
                    :key="item.id"
                    :label="item.id">{{item.rankTitle}}</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="openUser">新建榜单</el-button>
        <el-button @click="defineUser"
                   type="primary">确认添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { exportTable } from '@/lib/tools'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  data () {
    return {
      limitCount: '', // 限制个数
      dataShow: false,
      pageShow: false, // 页面条数限制
      addUserShow: false,
      addDelete: '',
      account: '', // 收藏biz
      accountName: '', // 账号名称
      type: '1', // 1：微信公众号
      addShow: false, // 收藏弹框
      // total: 0,
      // data1: [{
      //   name: '自治区人民检察院1',
      //   account: 'renmenjianchayuan'
      // }],
      // data2: [{
      //   name: '自治区人民检察院2',
      //   account: 'renmenjianchayuan'
      // }],
      searchDetail: '',
      textarea: '',
      remarks: '',
      activeName: 'first',
      dialogVisible: false,
      addApply: false,
      activeTab: 'wx',
      updateDate: '',
      options: [{
        value: '',
        label: '黄金糕'
      }],
      dateOption: [
      ],
      ruleForm: {
        types: '1',
        rankingUserId: '',
        rankingType: 1, // 榜单类型 1：日榜 2：周榜 3：月榜
        date: '', // 时间
        function: [],
        functionType: '',
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
        pageSize: 10
      },
      loadSign: false
    }
  },
  methods: {
    // 加载更多
    loadMore () {
      this.ruleForm.pageNum++
      this.geListData()
    },
    // 初始化表格
    restTable () {
      this.tableData = []
      this.ruleForm.pageNum = 1
      this.geListData()
    },
    // 获取自定义榜单列表
    getCustList () {
      this.$http.post(this.$api.userData, this.form)
        .then(res => {
          this.addData = res.data.data.content
          // this.total = res.data.data.totalElements
        }).catch(() => { })
    },
    // 添加到自定义榜单弹框
    addUser (row) {
      this.bizName.push(row.nickname)
      this.bizArray.push(row.biz)
      this.getCustList()
      this.addUserShow = true
    },
    // 新建跳转自定义榜单新建页面
    openUser () {
      this.$router.push({ name: 'Customize' })
    },
    // 确认添加自定义榜单
    defineUser () {
      if (this.rankingUserId) {
        let params = {
          bizArray: this.bizArray,
          bizName: this.bizName,
          rankingUserId: this.rankingUserId
        }
        this.$http.post(this.$api.bizAddRanking, params)
          .then(res => {
            if (res.data.code === 200) {
              this.$message.success('操作成功!')
              this.offAddUser()
              this.openUser()
            }
          })
          .catch(() => { })
      } else {
        this.$message.warning('请选择添加的榜单!')
      }
    },
    offAddUser () {
      this.bizName = []
      this.bizArray = []
      this.rankingUserId = ''
      this.addUserShow = false
    },
    // 添加收藏弹框
    addList (row) {
      this.addDelete = '添加收藏'
      this.account = row.biz
      this.accountName = row.nickname
      this.addShow = true
    },
    // 删除收藏弹框
    deleteList (row) {
      this.addDelete = '取消收藏'
      this.account = row.biz
      this.addShow = true
    },
    // 确定添加
    defineAdd () {
      this.$http.get(this.$api.addAccount, { params: { account: this.account, accountName: this.accountName, type: this.type } })
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success('操作成功!')
            this.restTable()
            this.addShow = false
          }
        })
        .catch(() => { })
    },
    // 取消收藏
    defineDeldte () {
      this.$http.get(this.$api.defineDeldte, { params: { account: this.account, type: this.type } })
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success('操作成功!')
            this.restTable()
            this.addShow = false
          }
        })
        .catch(() => { })
    },
    // 关闭弹框
    offAdd () {
      this.addShow = false
    },
    // 分页
    // pagingChange (query) {
    //   this.ruleForm.pageSize = query.size
    //   this.ruleForm.pageNum = query.page
    //   this.geListData()
    // },
    // 获取榜单类型
    rankType () {
      this.$http.get(this.$api.rankType)
        .then(res => {
          if (res.data.code === 200) {
            this.options = []
            res.data.data.forEach(item => {
              let obj = {
                value: '',
                label: ''
              }
              obj.label = item.configKey
              obj.value = item.configValue
              this.options.push(obj)
            })
          }
        })
        .catch(() => { })
    },
    // 日/月*周类型切换
    getDateOption () {
      // var time = new Date(this.updateDate)
      if (this.ruleForm.rankingType === 1) {
        this.ruleForm.date = this.updateDate
        this.dateOption = []
        let obj = {
          value: this.updateDate,
          label: this.updateDate
        }
        this.dateOption.push(obj)
      } else if (this.ruleForm.rankingType === 2) {
        this.dateOption = []
        for (let i = 1; i <= 4; i++) {
          let s1 = this.getWeek(i)
          let obj = {
            value: s1,
            label: s1
          }
          this.dateOption.push(obj)
        }
        this.ruleForm.date = this.dateOption[0].value
      } else if (this.ruleForm.rankingType === 3) {
        this.dateOption = []
        for (let i = 0; i < 4; i++) {
          let s1 = this.getMounth(i)
          let obj = {
            value: s1,
            label: s1
          }
          this.dateOption.push(obj)
        }
        this.ruleForm.date = this.dateOption[0].value
      }
      this.restTable()
    },
    // 获取周
    getWeek (i) {
      // 获取上周时间
      let myDate = new Date(new Date(this.updateDate).getTime() + 24 * 3600 * 1000 - 7 * 24 * 3600 * 1000 * i)
      let day = myDate.getDay()
      let time = myDate.getDate() - day + (day === 0 ? -6 : 1)
      let startTime = new Date(myDate.setDate(time))
      let startYear = startTime.getFullYear()
      let startMonth = startTime.getMonth() + 1
      if (startMonth < 0) {
        startMonth = 12 + startMonth
        startYear = startYear - 1
      } else if (startMonth === 0) {
        startMonth = 12
        startYear = startYear - 1
      }
      let startData = startTime.getDate()
      startMonth = startMonth < 10 ? '0' + startMonth : startMonth
      startData = startData < 10 ? '0' + startData : startData
      let startDateTime =
        startYear + '-' + startMonth + '-' + startData
      let endTime = new Date(myDate.setDate(time + 6))
      let endYear = endTime.getFullYear()
      let endData = endTime.getDate()
      // console.log(endData)
      // let endMonth = endTime.getMonth() + 1
      let endMonth = endData >= 6 ? endTime.getMonth() + 1 : endTime.getMonth() + 2
      if (endMonth < 0) {
        endMonth = 12 + endMonth
        endYear = endYear - 1
      } else if (endMonth === 0) {
        endMonth = 12
        endYear = endYear - 1
      }
      endMonth = endMonth < 10 ? '0' + endMonth : endMonth
      endData = endData < 10 ? '0' + endData : endData
      let endDateTime =
        endYear + '-' + endMonth + '-' + endData
      console.log(endDateTime)
      return startDateTime + '~' + endDateTime
    },
    // 获取月
    getMounth (i) {
      // 获取上个月时间
      let nowdays = new Date(new Date(this.updateDate).getTime() + 24 * 3600 * 1000)
      let year = nowdays.getFullYear()
      let month = nowdays.getMonth() - i
      if (month < 0) {
        month = 12 + month
        year = year - 1
      } else if (month === 0) {
        month = 12
        year = year - 1
      }
      month = month < 10 ? '0' + month : month
      let yDate = new Date(year, month, 0)
      let startDateTime = year + '-' + month + '-01' // 上个月第一天
      let endDateTime = year + '-' + month + '-' + yDate.getDate() // 上个月最后一天
      return startDateTime + '~' + endDateTime
    },
    // 获取时间参数
    getNewDate () {
      this.$http.get(this.$api.updateDateDate)
        .then(res => {
          if (res.data.code === 200) {
            this.updateDate = res.data.data
            this.getDateOption()
          }
        })
        .catch(() => { })
    },
    // 公众号添加tabs切换
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 微信/微博
    tabsAll (name, level) {
      this.activeTab = name
    },
    // 自定义榜单
    openCust () {
      this.$router.push({ name: 'Customize' })
    },
    // 获取表格数据
    geListData () {
      this.ruleForm.functionType = this.ruleForm.function.toString()
      this.$http.post(this.$api.qyListData, this.ruleForm)
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
    // 筛选
    searchList () {
      this.restTable()
    },
    searchType (type) {
      this.ruleForm.function = []
      this.ruleForm.function.push(type)
      this.ruleForm.functionType = type
      this.restTable()
    },
    // // 添加公众号
    // shuttle (item, index) {
    //   this.data1.splice(index, 1)
    //   this.data2.push(item)
    // },
    // // 取消添加
    // unShuttle (item, index) {
    //   this.data2.splice(index, 1)
    //   this.data1.push(item)
    // },
    // 申请入榜弹框
    // applyList () {
    //   this.addApply = true
    // },
    // // 取消申请
    // cancelApply () {
    //   this.searchDetail = ''
    //   this.addApply = false
    // },
    preText (pretext) {
      return pretext.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
    },
    // 提交申请
    upApply () {
      this.remarks = this.preText(this.textarea)
      this.dialogVisible = true
    },
    // 关闭
    offDialog () {
      this.searchDetail = ''
      this.dialogVisible = false
      this.addApply = false
    },
    // 查询公众号
    explain () {
      this.$router.push({ name: 'DataExplain' })
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.restTable()
    },
    // 导出
    exportBox () {
      var time = new Date()
      // 程序计时的月从0开始取值后+1
      var m = time.getMonth() + 1
      var t = time.getFullYear() + '-' + m + '-' + this.ruleForm.date
      let fileName = '微信公众号' + t + '总榜'
      var table = XLSX.utils.table_to_book(document.querySelector('#wx-monitor'))
      exportTable(XLSX, FileSaver, table, fileName)
    },
    // 切换渠道
    openOther (type) {
      let url = type === '1' ? 'Personal' : type === '2' ? 'PercinArticle' : 'PercinVideo'
      this.$router.push({ name: url })
    }
  },
  created () {
    this.getNewDate()
    this.rankType()
  }
}
</script>
<style scoped lang="scss">
@import './assess.css';
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
.explain-box .el-button {
  width: 190px;
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
  width: 200px;
  margin: 0 auto;
}
.account-infor img {
  height: 60px;
  width: 60px;
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
.date-box .el-select,
.date-time {
  width: 230px;
}
.radio-box .el-radio {
  margin-bottom: 10px;
}
.addUser .dialog-footer {
  display: block;
  text-align: center;
}
</style>
