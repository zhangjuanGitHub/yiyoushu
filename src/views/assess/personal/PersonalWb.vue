<!--
 * @Author: MaiChao
 * @Date: 2021-03-15 16:16:36
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-06-30 14:47:19
-->
<template>
  <div>
    <div>
      <div class="title-time">省域 <span>{{ruleForm.date}}</span> 排行总榜</div>
      <div class="from-box">
        <el-form :inline="true"
                 ref="ruleForm"
                 :model="ruleForm">
          <div class="flex-ali-center">
            <el-form-item prop="types">
              <el-radio-group v-model="ruleForm.types"
                              size='small'
                              @change="openOther(ruleForm.types,activeTab)">
                <el-radio-button label="1">微博</el-radio-button>
                <el-radio-button label="2">文章</el-radio-button>
                <el-radio-button label="3">视频</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="时间"
                          class="date-box area">
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
            <!-- <el-form-item class="explain-box" label="职能" prop="functionType">
                <el-select v-model="ruleForm.functionType"  size='small'>
                  <el-option label="检察" value="检察"></el-option>
                  <el-option label="政法委" value="政法委"></el-option>
                  <el-option label="公安" value="公安"></el-option>
                  <el-option label="法院" value="法院"></el-option>
                  <el-option label="司法" value="司法"></el-option>
                </el-select>
              </el-form-item> -->
            <el-form-item class="explain-box"
                          label="类型"
                          prop="function">
              <el-select v-model="ruleForm.functionType"
                         placeholder="请选择"
                         size='small'>
                <el-option v-for="item in rankOption"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
              <!-- <el-select v-model="ruleForm.functionType"  size='small'>
                  <el-option label="检察" value="检察"></el-option>
                  <el-option label="政法委" value="政法委"></el-option>
                  <el-option label="公安" value="公安"></el-option>
                  <el-option label="法院" value="法院"></el-option>
                  <el-option label="司法" value="司法"></el-option>
                </el-select> -->
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
                <el-radio-button :label="4">季榜</el-radio-button>
                <el-radio-button :label="5">半年榜</el-radio-button>
                <el-radio-button :label="6">年榜</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item prop="districts"
                            label="地区" class="area">
                <el-cascader size="small"
                             :options="options"
                             :show-all-levels="false"
                             :props="{ checkStrictly: true }"
                             v-model="ruleForm.districts"
                             placeholder="请选择地区"></el-cascader>
              </el-form-item> -->
            <el-form-item>
              <el-button size="small"
                         @click="searchList"
                         type="primary">筛选</el-button>
              <el-button size="small"
                         @click="resetForm('ruleForm')">重置</el-button>
              <el-button size="small"
                         type="warning"
                         @click="exportBox()">导出</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <!-- <div class="quick-click flex-bwt-center">
          <div class="click-box color1 flex-arr-center cursor" @click="searchType('教育')">
            <div class="flex-arr-center">
              <img class="click-image"
                   :src="require('@/assets/images/assess/05.png')">
              <span class="click-name">教育榜</span>
            </div>
          </div>
          <div class="click-box color2 flex-arr-center cursor" @click="searchType('时尚')">
            <div class="flex-arr-center">
              <img class="click-image"
                   :src="require('@/assets/images/assess/06.png')">
              <span class="click-name">时尚榜</span>
            </div>
          </div>
          <div class="click-box color3 flex-arr-center cursor" @click="searchType('娱乐')">
            <div class="flex-arr-center">
              <img class="click-image"
                   :src="require('@/assets/images/assess/07.png')">
              <span class="click-name">娱乐榜</span>
            </div>
          </div>
          <div class="click-box color6 flex-arr-center cursor" @click="searchType('科技')">
            <div class="flex-arr-center">
              <img class="click-image"
                   :src="require('@/assets/images/assess/08.png')">
              <span class="click-name">科技榜</span>
            </div>
          </div>
        </div> -->
      <div class="table-box">
        <el-table :data="tableData"
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
          <el-table-column prop="screenName"
                           label="微博名称"
                           width="250">
            <template slot-scope='scope'>
              <div class="account-infor flex-ali-center cursor"
                   @click="toSearch(scope.row.uid)">
                <img :src="scope.row.cover"
                     alt="">
                <div class="account-name">
                  <p class="import-name lin-clamp-1"
                     v-html='scope.row.screenName'></p>
                  <!-- <p>{{scope.row.screenName}}</p> -->
                </div>
                <div v-if="scope.row.verified" class="ver-img">
                  <img v-if="scope.row.verified_type === 0 && scope.row.verified_type_ext === 1"
                       src="@/assets/images/search/v_1.png"
                       alt="">
                  <img v-else-if="scope.row.verified_type === 0 && scope.row.verified_type_ext === 0"
                       src="@/assets/images/search/v_2.png"
                       alt="">
                  <img v-else
                       src="@/assets/images/search/v_3.png"
                       alt="">
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="currentFans"
                           label="粉丝数">
          </el-table-column>
          <el-table-column prop="retweetCount"
                           label="转发数">
          </el-table-column>
          <el-table-column prop="count"
                           label="发博数">
          </el-table-column>
          <el-table-column prop="originalRetweetCount"
                           label="原创微博数">
          </el-table-column>
          <el-table-column prop="commentsCount"
                           label="评论数">
          </el-table-column>
          <el-table-column prop="attitudesCount"
                           label="点赞数">
          </el-table-column>
          <!-- <el-table-column prop="functionType"
                           label="职能">
          </el-table-column> -->
          <!-- <el-table-column prop="unitName"
                           label="单位名称">
          </el-table-column> -->
          <el-table-column prop="totalScore"
                           label="总分">
          </el-table-column>
          <el-table-column prop="last_pubtime"
                           label="操作">
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
    <el-dialog title="公众号添加"
               :visible.sync="addApply"
               width="65%"
               :close-on-click-modal='false'
               class="add-apply">
      <div class="apply-box">
        <div class="tabs-header">
          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane label="搜索添加"
                         name="first">
              <template>
                <div class="add-box">
                  <div class="search-box">
                    <el-input placeholder="请输入内容"
                              v-model="searchDetail">
                    </el-input>
                    <el-button type="primary"
                               @click="queryApply">查询</el-button>
                  </div>
                  <div class="cont-box flex-arr-center">
                    <!-- <el-transfer v-model="value" :data="data" :titles="['搜索结果', '已选择公众号']"></el-transfer> -->
                    <div class="result show-box">
                      <div class="top-line flex-arr-center">搜索结果</div>
                      <div class="flex-arr-center name-box">
                        <span>公众号</span>
                        <span>微信号</span>
                      </div>
                      <div class="content-box">
                        <div class="flex-arr-center alone cursor"
                             v-for="(item,index) in data1"
                             :key="index"
                             @dblclick="shuttle(item,index)">
                          <span>{{item.name}}</span>
                          <span>{{item.account}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="choice show-box">
                      <div class="top-line flex-arr-center">已添加公众号</div>
                      <div class="flex-arr-center name-box">
                        <span>公众号</span>
                        <span>微信号</span>
                      </div>
                      <div class="content-box">
                        <div class="flex-arr-center alone cursor"
                             v-for="(item,index) in data2"
                             :key="index"
                             @dblclick="unShuttle(item,index)">
                          <span>{{item.name}}</span>
                          <span>{{item.account}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="链接添加"
                         name="second">
              <template>
                <div class="search-box">
                  <el-input type="textarea"
                            :autosize="{ minRows: 12, maxRows: 16}"
                            placeholder="请输入文章链接,每行一个链接"
                            v-model="textarea">
                  </el-input>
                  <span class="tip-span">每行输入一个微信公众号的单篇文章链接，多个链接请换行隔开，否则可能导致添加账号不成功</span>
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="批量添加"
                         name="third">
              <template>
                <div class="search-box">
                  批量添加
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancelApply">取 消</el-button>
        <el-button type="primary"
                   @click="upApply">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="榜单申请"
               :visible.sync="dialogVisible"
               width="30%"
               :close-on-click-modal='false'
               :before-close="offDialog">
      <span> 您的申请已经提交，请您耐心等待榜单持有者的审核。</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="offDialog">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="addDelete"
               :visible.sync="addShow"
               width="30%"
               :close-on-click-modal='false'
               :before-close="offDialog">
      <span> 确定执行此操作?</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="defineAdd"
                   v-if="addDelete==='添加收藏'">确定</el-button>
        <el-button @click="defineDeldte"
                   v-if="addDelete==='取消收藏'">确定</el-button>
        <el-button @click="offAdd">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="我的榜单列表"
               :visible.sync="addUserShow"
               width="30%"
               :close-on-click-modal='false'
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
      type: '2', // 微博
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
      activeTab: 'wb',
      options: [],
      dateOption: [
      ],
      rankOption: [],
      // ruleForm: {
      //   types: '1',
      //   rankingType: 1, // 榜单类型 1：日榜 2：周榜 3：月榜
      //   date: '', // 时间
      //   functionType: '', // 职能
      //   districts: [], // 地区
      //   unitLevel: '',
      //   pageNum: 1,
      //   pageSize: 10
      // },
      ruleForm: {
        types: '1',
        rankingType: 1, // 榜单类型 1：日榜 2：周榜 3：月榜
        date: '', // 时间
        functionType: '', // 类型
        // function: [],
        // districts: [], // 地区
        // unitLevel: '',
        pageNum: 1,
        pageSize: 10,
        rankType2: ''
      },
      tableData: [],
      tableDataWb: [],
      addData: [],
      bizArray: [],
      bizName: [],
      rankingUserId: '',
      form: {
        pageNum: 1,
        pageSize: 20,
        rankType: '2'
      }
    }
  },
  created () {
    this.getNewDate()
    // this.rankType()
    this.getrankType()
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
      // if (this.activeTab === 'wx') {
      //   this.tableData = []
      //   this.ruleForm.pageNum = 1
      //   this.geListData()
      // } else {
      //   this.tableDataWb = []
      //   this.ruleFormWb.pageNum = 1
      //   this.geListDataWb()
      // }
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
      console.log(row)
      this.bizName.push(row.screenName)
      this.bizArray.push(row.uid)
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
              if (res.data.data.data) {
                this.$message.success(res.data.data.data)
                this.offAddUser()
                this.openUser()
              } else {
                this.$message.success('操作成功!')
                this.offAddUser()
                this.openUser()
              }
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
      this.account = row.uid
      this.accountName = row.screenName
      this.addShow = true
    },
    // 删除收藏弹框
    deleteList (row) {
      this.addDelete = '取消收藏'
      this.account = row.uid
      this.addShow = true
    },
    // 确定添加
    defineAdd () {
      console.log()
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
    // 获取地区数据
    rankType () {
      this.$http.get(this.$api.rankAreaWb)
        .then(res => {
          if (res.data.code === 200) {
            this.options = res.data.data
          }
        })
        .catch(() => { })
    },
    // 获取类别
    getrankType () {
      this.$http.get(this.$api.wbType, { params: { type: '1' } })
        .then(res => {
          if (res.data.code === 200) {
            this.rankOption = []
            res.data.data.forEach(item => {
              let obj = {
                value: '',
                label: ''
              }
              obj.label = item.configKey
              obj.value = item.configValue
              this.rankOption.push(obj)
            })
          }
        })
        .catch(() => { })
    },
    // 日/月*周类型切换
    getDateOption () {
      if (this.ruleForm.rankingType === 1) {
        this.ruleForm.date = this.updateDate
        this.dateOption = []
        this.dateOption.push({ value: this.updateDate, label: this.updateDate })
      } else if (this.ruleForm.rankingType === 2) {
        this.dateOption = []
        this.getWeekYou()
      } else if (this.ruleForm.rankingType === 3) {
        this.dateOption = []
        for (let i = 0; i < 4; i++) {
          let s1 = this.getMounth(i)
          this.dateOption.push({ value: s1, label: s1 })
        }
        this.ruleForm.date = this.dateOption[0].value
      } else if (this.ruleForm.rankingType === 4) {
        this.dateOption = []
        for (let i = 0; i < 4; i++) {
          let s1 = this.getQuarter(i)
          this.dateOption.push({ value: s1, label: s1 })
        }
        this.ruleForm.date = this.dateOption[0].value
      } else if (this.ruleForm.rankingType === 5) {
        this.dateOption = []
        for (let i = 0; i < 2; i++) {
          let s1 = this.getHalfYear(i)
          this.dateOption.push({ value: s1, label: s1 })
        }
        this.ruleForm.date = this.dateOption[0].value
      } else if (this.ruleForm.rankingType === 6) {
        this.dateOption = []
        let today = new Date(this.updateDate)
        let curYear = today.getFullYear()
        let time = (curYear - 1) + '-01-01~' + (curYear - 1) + '-12-31'
        this.dateOption.push({ value: time, label: time })
        this.ruleForm.date = time
      }
      this.restTable()
    },
    getWeekYou () {
      let currentDate = new Date(this.updateDate)
      currentDate = this.addDay(currentDate, 1)
      let day = currentDate.getDay()
      if (day == 0) { day = 7 }
      // 计算周一
      let date = this.addDay(currentDate, -1 * (day - 1))
      let startDate, endDate
      for (let i = 0; i < 4; i++) {
        startDate = this.addDay(date, -1 * (7 + i * 7))
        endDate = this.addDay(date, -1 * (1 + i * 7))
        let time = this.dateStr(startDate) + '~' + this.dateStr(endDate)
        this.dateOption.push({ value: time, label: time })
      }
      this.ruleForm.date = this.dateOption[0].value
    },
    addDay (date, addDay) {
      var temp = new Date()
      temp.setTime(date.getTime() + addDay * 24 * 60 * 60 * 1000)
      return temp
    },
    dateStr (time) {
      var year = time.getFullYear()
      var month = ('0' + (time.getMonth() + 1)).slice(-2)
      var day = ('0' + time.getDate()).slice(-2)
      var mydate = year + '-' + month + '-' + day
      return mydate
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
    // 获取季度
    getQuarter (i) {
      let today = new Date(new Date(this.updateDate).getTime() - 24 * 3600 * 1000 * i * 90)
      let curYear = today.getFullYear()
      let curMonth = today.getMonth() + 1
      let curQuarter = Math.floor((curMonth % 3 == 0 ? (curMonth / 3) : (curMonth / 3 + 1))) // 当前季度
      if (curQuarter === 1) {
        curYear = curYear - 1
        curQuarter = 5
      }
      let calcEndQuar = (curQuarter - 1) * 3 < 10 ? '0' + ((curQuarter - 1) * 3) : (curQuarter - 1) * 3
      let calcQuar = ((curQuarter - 1) * 3 - 2) < 10 ? '0' + ((curQuarter - 1) * 3 - 2) : ((curQuarter - 1) * 3 - 2)
      let startTime = curYear + '-' + calcQuar + '-01'
      let endTime = curYear + '-' + calcEndQuar + '-' + new Date(curYear, (curQuarter - 1) * 3, 0).getDate()
      return startTime + '~' + endTime
    },
    // 获取半年
    getHalfYear (i) {
      let now = new Date(new Date(this.updateDate).getTime() - 24 * 3600 * 1000 * i * 180)
      let curYear = now.getFullYear()
      let curMonth = now.getMonth() + 1
      let calcNum = parseInt(curMonth / 6)
      let start = ''
      let end = ''
      if (calcNum === 1) {
        curYear = curYear - 1
        start = curYear + '-07-01'
        end = curYear + '-12-31'
      } else {
        start = curYear + '-01-01'
        end = curYear + '-06-30'
      }
      return start + '~' + end
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
      // console.log(tab, event)
    },
    // 微信/微博
    // tabsAll (name, level) {
    //   this.activeTab = name
    //   if (this.activeTab === 'wb') {
    //     console.log('微博')
    //     this.getListDataWb()
    //   } else {
    //     this.getListData()
    //   }
    // },
    // 自定义榜单
    // openCust () {
    //   this.$router.push({ name: 'Customize' })
    // },
    // 获取表格数据
    geListData () {
      this.ruleForm.functionType = this.ruleForm.functionType.toString()
      this.$http.post(this.$api.qyWbListData, this.ruleForm)
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
      this.ruleForm.unitLevel = ''
      this.restTable()
      // this.geListData()
    },
    searchType (type) {
      // console.log(type)
      // this.ruleForm.districts = []
      // this.ruleForm.unitLevel = type
      // this.ruleForm.function = []
      // this.ruleForm.function.push(type)
      this.ruleForm.functionType = type
      this.restTable()
    },
    // 添加公众号
    shuttle (item, index) {
      this.data1.splice(index, 1)
      this.data2.push(item)
    },
    // 取消添加
    unShuttle (item, index) {
      this.data2.splice(index, 1)
      this.data1.push(item)
    },
    // 申请入榜弹框
    applyList () {
      this.addApply = true
    },
    // 取消申请
    cancelApply () {
      this.searchDetail = ''
      this.addApply = false
    },
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
    queryApply () { },
    // 重置
    resetForm (formName) {
      this.ruleForm.unitLevel = ''
      this.ruleForm.functionType = ''
      this.$refs[formName].resetFields()
      this.restTable()
    },
    // 导出
    exportBox () {
      var time = new Date()
      // 程序计时的月从0开始取值后+1
      var m = time.getMonth() + 1
      var t = time.getFullYear() + '-' + m + '-' + this.ruleForm.date
      let fileName = '省域微博' + t + '总榜'
      var table = XLSX.utils.table_to_book(document.querySelector('#wx-monitor'))
      exportTable(XLSX, FileSaver, table, fileName)
    },
    // 说明
    explain () { },
    openOther (type, active) {
      // console.log(active)
      let url = type === '1' ? 'Personal' : type === '2' ? 'PercinArticle' : 'PercinVideo'
      // this.$router.push({ name: url })
      this.$router.push({ 'name': url, query: { active: active } })
    },
    toSearch (id) {
      console.log(id)
      // let routeName = this.activeTab === 'company' ? 'AccountMaterial' : 'HistoryTweets'
      this.$router.push({ name: 'ReleaseRulesWb', query: { id: id } })
    }
  }
}
</script>
<style scoped lang="scss">
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
  // width: 240px;
  margin: 0 auto;
  margin-left:5px
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
.radio-box .el-radio {
  margin-bottom: 10px;
}
.addUser .dialog-footer {
  display: block;
  text-align: center;
}

.ver-img img{
  width: 18px;
  height: 18px;
  margin-left: 5px;
  margin-top:5px
}
</style>
