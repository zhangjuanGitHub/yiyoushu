<!--
 * @Author: MaiChao
 * @Date: 2021-03-18 11:28:06
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-07-28 17:55:44
-->
<template>
  <div class="contents">
    <div class="official account-box">
      <div class="tabs-header">
        <span class="list-title"
              @click="openMylist">我的榜单</span>
        <span class="list-title el-icon-arrow-right"></span>
        <span class="list-title">微博榜单详情</span>
      </div>
      <div class="conts-box">
        <div class="title-time">自定义榜单 <span>{{ruleForm.date}}</span> 总榜</div>
        <div class="from-box">
          <el-form :inline="true"
                   ref="ruleForm"
                   :model="ruleForm">
            <div class="flex-ali-center">
              <el-form-item prop="modelType">
                <el-radio-group v-model="ruleForm.modelType"
                                size='small'
                                @change="openOther(ruleForm.modelType)">
                  <el-radio-button label="1">微博</el-radio-button>
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
              <el-form-item class="explain-box"
                            label="职能"
                            prop="functionType">
                <!-- <el-button size="small"
                           @click="explain()">数据榜单说明</el-button> -->
                <el-select v-model="ruleForm.functionType"
                           size='small' class="functionType-sel">
                  <el-option label="检察"
                             value="检察"></el-option>
                  <el-option label="政法委"
                             value="政法委"></el-option>
                  <el-option label="公安"
                             value="公安"></el-option>
                  <el-option label="法院"
                             value="法院"></el-option>
                  <el-option label="司法"
                             value="司法"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <!-- <el-button size="small"
                           @click="searchLists"
                           type="primary">筛选</el-button> -->
                <el-button size="small"
                           @click="applyList(1)">添加搜索账号</el-button>
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
              <!-- <el-form-item class="messageType">
                <div>统计数据截止:<span>{{ruleForm.date}}</span></div>
              </el-form-item> -->
              <el-form-item>
                <el-button size="small"
                           @click="searchLists"
                           type="primary">筛选</el-button>
                <el-button size="small" @click="cleanSearch">重置</el-button>
                <el-button size="small"
                           type="warning"
                           @click="exportBox()">导出</el-button>
                <el-button size="small"
                           @click="applyList(2)">添加收藏账号</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="table-box">
          <el-table :data="tableData"
                    style="width: 100%"
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
                             label="微博名称" width="250">
              <template slot-scope='scope'>
                <div class="account-infor flex-ali-center cursor" @click="toSearch(scope.row.uid)">
                  <img :src="scope.row.cover"
                       alt="">
                  <div class="account-name">
                    <p class="import-name"
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
            <el-table-column prop="originalCount"
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
            <el-table-column prop="unitName"
                             label="单位名称">
            </el-table-column>
            <el-table-column prop="totalScore"
                             label="总分">
            </el-table-column>
            <el-table-column prop="last_pubtime"
                             label="操作">
              <template slot-scope='scope'>
                <div class="operate flex-arr-center">
                  <span v-if="scope.row.isFollow"
                        class="el-icon-star-on collect cursor"
                        @click="deleteList(scope.row,scope.$index)"></span>
                  <span v-else
                        class="el-icon-star-off collect cursor"
                        @click="addLists(scope.row,scope.$index)"></span>
                  <span class="el-icon-remove-outline addto cursor"
                        @click="deleteCollect(scope.row,scope.$index)"></span>
                </div>
              </template>
            </el-table-column>
          </el-table>
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
    </div>
    <el-dialog title="添加账号"
               :visible.sync="addAccount"
               :close-on-click-modal='false'
               width="960px"
               center
               class="cust-add-apply"
               @close="offAddAccount">
      <div>
        <!-- 添加搜索账号 -->
        <div class="add-collect-box">
          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane label="搜索添加"
                         v-if="this.tabPane"
                         name="first">
              <template>
                <div class="add-box">
                  <div class="search-box">
                    <el-input placeholder="请输入微博名称或者微博号"
                              v-model="keyword">
                    </el-input>
                    <el-button type="primary"
                               @click="queryKeyword">查询</el-button>
                  </div>
                  <div class="flex-bwt">
                    <div class="show-box">
                      <div class="top-line flex-arr-center">搜索结果</div>
                      <div class="flex-arr-center name-box">
                        <p>微博名称</p>
                        <p>微博号</p>
                      </div>
                      <div class="content-box">
                        <div class="flex-ali-center alone cursor"
                             v-for="(item,index) in searchList"
                             :key="index"
                             @dblclick="shuttle(item,index)">
                          <div class="content-box-avatar flex-ali-center">
                            <img :src="item.avatar_hd"
                                 alt="">
                            <p>{{item.screen_name}}</p>
                          </div>
                          <p class="alias">{{item.uid}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="show-box">
                      <div class="top-line flex-arr-center">已添加微博号</div>
                      <div class="flex-arr-center name-box">
                        <p>微博名称</p>
                        <p>微博号</p>
                      </div>
                      <div class="content-box">
                        <div class="flex-ali-center alone cursor"
                             v-for="(item,index) in addList"
                             :key="index"
                             @dblclick="unShuttle(item,index)">
                          <div class="content-box-avatar flex-ali-center">
                            <img :src="item.avatar_hd"
                                 alt="">
                            <p>{{item.screen_name}}</p>
                          </div>
                          <p class="alias">{{item.uid}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </el-tab-pane>
            <!-- <el-tab-pane label="链接添加"
                         v-if="this.tabPane"
                         name="second">
              <template>
                <el-form :model="dateForm"
                         ref="dateForm"
                         class="second-add-form"
                         label-width="90px">
                  <el-form-item prop="email"
                                label="链接">
                    <el-input v-model="dateForm.url"
                              placeholder="请输入一篇文章链接"
                              :trigger-on-focus="false"></el-input>
                  </el-form-item>
                  <el-form-item v-for="(item, index) in dateForm.toUrlList"
                                :label="'新增链接' + (index+1)"
                                :key="item.key"
                                :prop="'toUrlList.' + index + '.value'"
                                :rules="{
                                required: true, message: '链接不能为空', trigger: 'blur'
                              }">
                    <el-input v-model="item.value"
                              placeholder="请输入一篇文章链接"
                              :trigger-on-focus="false"></el-input>
                    <el-button type="danger"
                               @click.prevent="removeItem(item)"
                               class="second-add-del">删除</el-button>
                  </el-form-item>
                </el-form>
                <div class="second-add-btn flex-all-center">
                  <el-button type="success"
                             @click="addUrlInput"
                             :disabled="dateForm.url.length <= 0">添加链接</el-button>
                  <el-button type="primary"
                             @click="queryUrl"
                             :disabled="dateForm.url.length <= 0">查询</el-button>
                  <el-button @click="clearDateForm('dateForm')">清空</el-button>
                </div>
                <div class="flex-ali"
                     v-if="urlData.length > 0">
                  <div class="url-box">
                    <div class="top-line flex-arr-center">搜索结果</div>
                    <div class="flex-arr-center name-box">
                      <span>公众号</span>
                      <span>微信号</span>
                    </div>
                    <div class="url-content-box">
                      <div class="flex-arr-center alone cursor"
                           v-for="(item, index) of urlData"
                           :key="index">
                        <div class="content-box-avatar flex-ali-center">
                          <img :src="item.oriHeadImg"
                               alt="">
                          <p>{{item.nickname}}</p>
                        </div>
                        <p>{{item.alias}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </el-tab-pane> -->
            <!-- <el-tab-pane label="批量添加"
                         name="third">
              <template>
                <div class="search-box">
                  批量添加
                </div>
              </template>
            </el-tab-pane> -->
            <el-tab-pane label="根据收藏添加"
                         v-else
                         name="collect">
              <el-table :data="collectData"
                        style="width: 100%"
                        @selection-change="handleCollectChange">
                <el-table-column type="selection"
                                 width="55">
                </el-table-column>
                <el-table-column prop="accountName"
                                 label="账号名称">
                  <template slot-scope='scope'>
                    <div class="account-infor flex-ali-center">
                      <el-image style="width: 60px; height: 60px"
                                :src="scope.row.headImage"
                                fit="fill">
                        <div slot="error"
                             class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                      <!-- <img :src="scope.row.headImage"
                       alt=""> -->
                      <div class="account-name">
                        <p class="import-name"
                           v-html='scope.row.accountName'></p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="description"
                                 label="简介"
                                 width="300">
                </el-table-column>
                <el-table-column prop="createTime"
                                 label="添加时间"
                                 width="220">
                </el-table-column>
              </el-table>
              <set-page @pagingChange="pagingCollect"
                        :total="colTotal"
                        ref="child"></set-page>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="upAddAccount">确认</el-button>
        <el-button @click="offAddAccount">取消</el-button>
      </span>
    </el-dialog>
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
    <el-dialog title="移除账号"
               :visible.sync="deleteShow"
               :close-on-click-modal='false'
               width="30%"
               :before-close="offDialog">
      <span> 确定执行此操作?</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="deleteTeams">确定</el-button>
        <el-button @click="overDelete">关闭</el-button>
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
      tabPane: false,
      collectForm: {
        pageNum: 1,
        pageSize: 10
      },
      colTotal: 0,
      collectData: [], // 收藏账号列表
      activeName: 'first',
      textarea: '', // 链接添加
      urlData: [], // 根据url查询到的列表
      dateForm: {
        url: '',
        toUrlList: []
      }, // 批量添加url
      keyword: '', // 根据账号搜索
      searchList: [], // 根据账号查询到的列表
      addList: [], // 根据账号查询添加后的列表
      deleteShow: false, // 删除字段
      deleteItem: '', // 删除内容
      deleteIndex: '', // 删除下标
      isDelBatch: false, // 确认是批量删除的标识
      modifyVisible: false, // 榜单修改
      addAccount: false, // 添加账号
      addId: '', // 要添加账号的榜单ID
      collectSelect: [], // 已选择的收藏的账号
      addDelete: '',
      account: '', // 收藏数据
      accountIndex: '', // 收藏数据下标
      type: '2', // 1：微博
      addShow: false, // 收藏弹框
      dialogVisible: false,
      searchDetail: '',
      remarks: '',
      addApply: false, // 搜索公众号弹框
      collect: false, // 搜藏公众号弹框
      activeTab: 'wb',
      options: [],
      ruleForm: {
        rankingUserId: '', // 用户榜单ID
        rankingType: 1, // 榜单类型 1：日榜 2：周榜 3：月榜
        date: '', // 时间
        modelType: '1',
        functionType: '', // 类型
        pageNum: 1,
        pageSize: 10
      },
      tableData: []
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
    pagingCollect (query) {
      this.collectForm.pageSize = query.size
      this.collectForm.pageNum = query.page
      this.getCollect()
    },
    // 添加收藏弹框
    addLists (row, index) {
      this.addDelete = '添加收藏'
      this.account = row
      this.accountIndex = index
      this.addShow = true
    },
    // 删除收藏弹框
    deleteList (row, index) {
      this.addDelete = '取消收藏'
      this.account = row
      this.accountIndex = index
      this.addShow = true
    },
    // 确定添加
    defineAdd () {
      this.$http.get(this.$api.addAccount, { params: { account: this.account.uid, accountName: this.account.screenName, type: this.type } })
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success('操作成功!')
            this.account.isFollow = true
            this.tableData.splice(this.accountIndex, 1, this.account)
            this.addShow = false
          }
        })
        .catch(() => { })
    },
    // 取消收藏
    defineDeldte () {
      console.log(this.account)
      this.$http.get(this.$api.defineDeldte, { params: { account: this.account.uid, type: this.type } })
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success('操作成功!')
            this.account.isFollow = false
            this.tableData.splice(this.accountIndex, 1, this.account)
            this.addShow = false
          }
        })
        .catch(() => { })
    },
    // 关闭弹框
    offAdd () {
      this.addShow = false
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
      console.log(day)
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
    // 获取表格数据
    geListData () {
      this.$http.post(this.$api.userWbListData, this.ruleForm)
        .then(res => {
          // if (res.data.data.content.length > 0) {
          //   this.tableData = res.data.data.content
          //   this.limitCount = res.data.data.totalElements
          // }
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
    // 关闭
    offDialog () {
      this.searchDetail = ''
      this.dialogVisible = false
      this.addApply = false
    },
    // 筛选
    searchLists () {
      this.restTable()
    },
    // 删除某一个
    deleteCollect (id, index) {
      this.deleteItem = id
      this.deleteIndex = index
      this.deleteShow = true
    },
    // 取消删除
    overDelete () {
      this.deleteShow = false
      this.deleteItem = ''
    },
    // 确定删除
    deleteTeams () {
      this.$http.get(this.$api.itemDelete, { params: { biz: this.deleteItem.uid, rankingUserId: this.ruleForm.rankingUserId } })
        .then(res => {
          this.$message.success('操作成功!')
          this.overDelete()
          this.tableData.splice(this.deleteIndex, 1)
        }).catch(() => { })
    },
    // 打开添加公众号dialog
    applyList (id) {
      this.addId = this.$route.query.id
      this.addAccount = true
      this.tabPane = id === 1
      if (this.tabPane) {
        this.activeName = 'first'
      } else {
        this.activeName = 'collect'
        this.getCollect()
      }
    },
    // 取消添加公众号
    offAddAccount () {
      this.addAccount = false
      this.activeName = 'first'
      this.addId = ''
      this.keyword = ''
      this.searchList = []
      this.addList = []
      this.textarea = ''
      this.urlData = []
      this.collectSelect = []
    },
    handleClick (tab) {
      if (tab.name === 'collect') {
        this.getCollect()
      }
      this.activeName = tab.name
      this.keyword = ''
      this.searchList = []
      this.addList = []
      this.dateForm.url = ''
      this.dateForm.toUrlList = []
      this.urlData = []
      this.collectSelect = []
    },
    // 根据账号搜索
    queryKeyword () {
      if (this.keyword) {
        this.$http.post(this.$api.getByKeyWb, { keyword: this.keyword })
          .then(res => {
            if (res.data.data.account.length <= 0) {
              this.$message.warning('请更换关键词')
              this.searchList = []
            } else {
              this.searchList = res.data.data.account
            }
          }).catch(() => { })
      } else {
        this.$message.warning('请输入微博名称')
      }
    },
    // 增加链接
    // addUrlInput () {
    //   this.dateForm.toUrlList.push({
    //     value: '',
    //     key: Date.now()
    //   })
    // },
    // 删除链接
    // removeItem (item) {
    //   let index = this.dateForm.toUrlList.indexOf(item)
    //   this.dateForm.toUrlList[index].value = ''
    //   if (index !== -1) {
    //     this.dateForm.toUrlList.splice(index, 1)
    //   }
    // },
    // 清空链接
    // clearDateForm (dateForm) {
    //   this.dateForm.url = ''
    //   this.$refs[dateForm].resetFields()
    // },
    // 根据Url搜索
    // queryUrl () {
    //   if (this.dateForm.url) {
    //     let urls = []
    //     urls.push(this.dateForm.url)
    //     if (this.dateForm.toUrlList.length > 0) {
    //       for (let i = 0; i < this.dateForm.toUrlList.length; i++) {
    //         if (urls.indexOf(this.dateForm.toUrlList[i].value) === -1) {
    //           urls.push(this.dateForm.toUrlList[i].value)
    //         }
    //       }
    //     }
    //     this.$http.post(this.$api.getByUrlsss, { urls: urls })
    //       .then(res => {
    //         if (res.data.data.length > 0) {
    //           let datas = res.data.data
    //           let urlArr = []
    //           let reUrl = ''
    //           for (let index = 0; index < datas.length; index++) {
    //             if (Number(datas[index].isCollect) === 1) {
    //               urlArr.push({
    //                 nickname: datas[index].nickname,
    //                 alias: datas[index].alias,
    //                 biz: datas[index].biz,
    //                 oriHeadImg: datas[index].oriHeadImg
    //               })
    //             } else {
    //               reUrl += datas[index].nickname + ' '
    //             }
    //           }
    //           if (reUrl.length > 0) {
    //             this.$message.warning(reUrl + '暂时无法进行排榜，敬请谅解')
    //           }
    //           this.urlData = this.unique(urlArr)
    //         } else {
    //           this.$message.warning('请检查链接是否正确')
    //         }
    //       }).catch(() => { })
    //   } else {
    //     this.$message.warning('请输入文章链接')
    //   }
    // },
    unique (arr) {
      const res = new Map()
      return arr.filter((a) => !res.has(a.biz) && res.set(a.biz, 1))
    },
    // 添加公众号
    shuttle (item, index) {
      if (Number(item.is_collect) === 1) {
        if (this.addList.length > 0) {
          for (let i = 0; i < this.addList.length; i++) {
            if (this.addList[i].uid === item.uid) {
              this.$message.warning('已经添加过' + item.screen_name)
              return
            }
          }
        }
        this.searchList.splice(index, 1)
        this.addList.push(item)
      } else {
        this.$message.warning('此账号暂时无法进行排榜，敬请谅解。')
      }
    },
    // 取消添加公众号
    unShuttle (item, index) {
      if (this.searchList.length > 0) {
        for (let i = 0; i < this.searchList.length; i++) {
          if (this.searchList[i].uid === item.uid) {
            this.addList.splice(index, 1)
            return
          }
        }
      }
      this.addList.splice(index, 1)
      this.searchList.push(item)
    },
    // 获取选中收藏的公众号
    handleCollectChange (val) {
      this.collectSelect = val
    },
    // 确认添加公众号
    upAddAccount () {
      console.log(this.activeName)
      let bizList = []
      let bizName = []
      if (this.activeName === 'first') {
        for (let i = 0; i < this.addList.length; i++) {
          bizList.push(this.addList[i].uid)
          bizName.push(this.addList[i].screen_name)
        }
      } else if (this.activeName === 'collect') {
        for (let i = 0; i < this.collectSelect.length; i++) {
          bizList.push(this.collectSelect[i].accountCode)
          bizName.push(this.collectSelect[i].accountName)
        }
      } else {
        for (let i = 0; i < this.urlData.length; i++) {
          bizList.push(this.urlData[i].biz)
          bizName.push(this.urlData[i].nickname)
        }
      }
      let obj = {
        bizArray: bizList,
        rankingUserId: this.addId,
        bizName: bizName
      }
      if (obj.bizArray.length > 0) {
        this.$http.post(this.$api.bizAddRanking, obj)
          .then(res => {
            this.$message.success('添加成功')
            this.addAccount = false
            this.addId = ''
            this.restTable()
          }).catch(() => { })
      } else {
        this.$message.warning('请选择微博!')
      }
    },
    // 获取收藏列表
    getCollect () {
      let obj = {
        type: 2,
        rankingUserId: this.addId,
        pageNum: this.collectForm.pageNum,
        pageSize: this.collectForm.pageSize
      }
      this.$http.post(this.$api.getCollect, obj)
        .then(res => {
          this.collectData = res.data.data.content
          this.colTotal = res.data.data.totalElements
        }).catch(() => { })
    },
    // 导出
    exportBox () {
      var time = new Date()
      // 程序计时的月从0开始取值后+1
      var m = time.getMonth() + 1
      var t = time.getFullYear() + '-' + m + '-' + time.getDate()
      let fileName = '自定义榜单' + t + '总榜'
      var table = XLSX.utils.table_to_book(document.querySelector('#wx-monitor'))
      exportTable(XLSX, FileSaver, table, fileName)
    },
    // 切换日/周/月榜单
    openOther (type) {
      let url = type === '1' ? 'CustimizeDetail' : type === '2' ? 'CustimizeWbArticle' : 'CustimizeWbVideo'
      this.$router.push({ name: url, query: { id: this.ruleForm.rankingUserId } })
    },
    // 返回榜单添加列表
    openMylist () {
      this.$router.push({ name: 'Customize' })
    },
    // 重置
    cleanSearch () {
      console.log(this.ruleForm)
      this.ruleForm.functionType = ''
      this.getNewDate()
    },
    // 账号详情
    toSearch (id) {
      console.log(id)
      // let routeName = this.activeTab === 'company' ? 'AccountMaterial' : 'HistoryTweets'
      this.$router.push({ name: 'ReleaseRulesWb', query: { id: id } })
    }
  },
  created () {
    this.ruleForm.rankingUserId = this.$route.query.id
    this.getNewDate()
  }
}
</script>
<style>
.cust-add-apply .el-dialog__body {
  min-height: 540px;
}
.second-add-form .el-input {
  width: 85%;
  margin: 10px 0;
}
.second-add-form .el-form-item__error {
  padding: 0;
  top: 90%;
}
</style>
<style scoped lang="scss">
@import '../assess.css';
</style>
<style lang="scss" scoped>
.second-add-btn {
  margin: 10px 0;
}
.second-add-del {
  margin-left: 10px;
}
.list-title {
  display: inline-block;
  line-height: 50px;
  margin-right: 7px;
  cursor: pointer;
}
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
.from-box {
  margin: 20px 0;
}
.from-box .el-form-item {
  margin-right: 35px;
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
  line-height: 40px;
}
.name-box {
  color: #3b82fe;
  border-bottom: 1px solid #e1e4e8;
  line-height: 40px;
}
.content-box {
  min-height: 182px;
}
.content-box .alone:first-of-type {
  margin-top: 20px;
}
.url-content-box .alone {
  line-height: 30px;
}
.show-box {
  width: 420px;
  border: 1px solid #e1e4e8;
}
.content-box {
  height: 300px;
  overflow-y: scroll;
}
.content-box-avatar {
  width: 50%;
  padding-left: 40px;
  margin-bottom: 0;
}
.content-box-avatar img {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-right: 5px;
}
.content-box::-webkit-scrollbar {
  background: transparent;
}
.alone:hover {
  background-color: #f7f8fa;
}
.alias {
  display: block;
  text-align: center;
}
.tip-span {
  color: red;
}
.messageType {
  width: 255px;
  text-align: center;
  background-color: #f7f8fa;
}
.from-box .date-time {
  width: 215px;
}
.functionType-sel{
  width: 150px;
}

.ver-img img{
  width: 18px;
  height: 18px;
  margin-left: 5px;
  margin-top:5px
}
</style>
