<!--
 * @Author: MaiChao
 * @Date: 2021-03-18 11:28:06
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-21 17:35:27
-->
<template>
  <div class="contents">
    <div class="official account-box">
      <div class="tabs-header">
        <span class="list-title" @click="openMylist">我的榜单</span>
        <span class="list-title el-icon-arrow-right"></span>
        <span class="list-title">微信榜单详情</span>
      </div>
      <div class="conts-box">
        <div class="title-time">自定义榜单 <span>{{fileName}}</span> 文章总榜</div>
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
              <el-form-item prop="dateType"
                            label="时间">
                <el-select v-model="ruleForm.dateType"
                           placeholder="请选择"
                           size="small" @change="tabsTitle">
                  <el-option label="最近一天"
                             :value="1"></el-option>
                  <el-option label="最近一周"
                             :value="2"></el-option>
                  <el-option label="最近一月"
                             :value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button size="small"
                           @click="searchList"
                           type="primary">筛选</el-button>
                <!-- <el-button size="small"
                           @click="applyList()">添加搜索公众号</el-button> -->
              </el-form-item>
            </div>
            <div class="flex-ali-center">
              <el-form-item prop="position"
                            label="位置">
                <el-select v-model="ruleForm.position"
                           placeholder="请选择"
                           size='small'>
                  <el-option label="头条"
                             value="1"></el-option>
                  <el-option label="次条"
                             value="2"></el-option>
                  <el-option label="三条"
                             value="3"></el-option>
                  <el-option label="四条"
                             value="4"></el-option>
                  <el-option label="五条"
                             value="5"></el-option>
                  <el-option label="六条"
                             value="6"></el-option>
                  <el-option label="七条"
                             value="7"></el-option>
                  <el-option label="八条"
                             value="8"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="classifyVal"
                            label="类型">
                <el-cascader size="small"
                             :options="options"
                             :show-all-levels="false"
                             v-model="ruleForm.classifyVal"
                             placeholder="请选择类型"></el-cascader>
              </el-form-item>
              <el-form-item>
                <el-button size="small"
                           type="warning"
                           @click="exportBox()">导出</el-button>
                <!-- <el-button size="small"
                           @click="collectList()">添加收藏公众号</el-button> -->
              </el-form-item>
            </div>
          </el-form>
        </div>
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
            <el-table-column prop="nickname"
                             label="文章标题">
              <template slot-scope='scope'>
                <div class="account-infor flex-ali-center">
                  <div class="account-title lin-clamp-1 cursor primary">
                    <p @click="openWeb(scope.row)">{{scope.row.title}}</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="nickname"
                             label="微信名"
                             width="140">
            </el-table-column>
            <el-table-column prop="alias"
                             label="微信号"
                             width="140">
            </el-table-column>
            <el-table-column prop="read_num"
                             label="阅读数"
                             width="100">
              <template slot-scope='scope'>
                <div v-if="scope.row.read_num>100000">
                  10w+
                </div>
                <div v-else>{{scope.row.read_num}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="old_like_num"
                             label="点赞数"
                             width="100">
            </el-table-column>
            <el-table-column prop="like_num"
                             label="在看数"
                             width="100">
            </el-table-column>
            <el-table-column prop="is_origin"
                             label="是否原创"
                             width="100">
              <template slot-scope='scope'>
                <div v-if="scope.row.is_origin==1"
                     class="export">是</div>
                <div v-else
                     class="delete">否</div>
              </template>
            </el-table-column>
            <el-table-column prop="idx"
                             label="文章位置"
                             width="100">
                <template slot-scope='scope'>
                <div v-if="scope.row.idx==1">头条</div>
                <div v-if="scope.row.idx==2">次条</div>
                <div v-if="scope.row.idx==3">三条</div>
                <div v-if="scope.row.idx==4">四条</div>
                <div v-if="scope.row.idx==5">五条</div>
                <div v-if="scope.row.idx==6">六条</div>
                <div v-if="scope.row.idx==7">七条</div>
                <div v-if="scope.row.idx==8">八条</div>
              </template>
            </el-table-column>
            <el-table-column prop="unit_name"
                             label="单位名称"
                             width="150">
            </el-table-column>
            <el-table-column prop="pubtime"
                             label="发布时间"
                             width="150">
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
    <el-dialog title="公众号添加"
               :visible.sync="addApply"
               :close-on-click-modal='false'
               width="65%"
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
  </div>
</template>
<script>
import { exportTable } from '@/lib/tools'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  data () {
    return {
      fileName: '最近一天', // 导出名称
      limitCount: '', // 限制个数
      dataShow: false,
      pageShow: false, // 页面条数限制
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
      activeName: 'first', // 搜索公众号标识
      addApply: false, // 搜索公众号弹框
      collect: false, // 搜藏公众号弹框
      activeTab: 'wx',
      options: [],
      optionArea: [],
      ruleForm: {
        rankingUserId: '',
        types: '2',
        dateType: 1, // 时间
        classifyVal: '', // 类型
        position: '', // 位置
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      updateDate: ''
    }
  },
  methods: {
    // 切换导出名称
    tabsTitle () {
      switch (this.ruleForm.dateType) {
        case 1:
          this.fileName = '最近一天'
          break
        case 2:
          this.fileName = '最近一周'
          break
        case 3:
          this.fileName = '最近一月'
          break
      }
    },
    // 打开外部页面
    openWeb (row) {
      window.open(row.url, '_black')
    },
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
    // 获取时间参数
    getNewDate () {
      this.$http.get(this.$api.updateDateDate)
        .then(res => {
          if (res.data.code === 200) {
            this.updateDate = res.data.data
          }
        })
        .catch(() => { })
    },
    // 返回榜单添加列表
    openMylist () {
      this.$router.push({ name: 'Customize' })
    },
    // 获取地区数据
    getrankArea () {
      this.$http.get(this.$api.rankArea)
        .then(res => {
          if (res.data.code === 200) {
            this.optionArea = res.data.data
          }
        })
        .catch(() => { })
    },
    // 获取榜单类型
    rankType () {
      this.$http.get(this.$api.rankType, { params: { type: 2 } })
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
    // 获取表格数据
    geListData () {
      this.$http.post(this.$api.userWechat, this.ruleForm)
        .then(res => {
          if (res.data.data.list.length > 0) {
            this.tableData.push(...res.data.data.list)
            this.limitCount = res.data.data.limitCount
            if (res.data.data.list.length < 10) {
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
    // 筛选
    searchList () {
      console.log(this.ruleForm)
      this.ruleForm.classifyVal = this.ruleForm.classifyVal.toString()
      this.restTable()
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
    // 收藏公众号弹框
    collectList () {},
    // 取消申请
    cancelApply () {
      this.searchDetail = ''
      this.addApply = false
    },
    // 提交申请
    upApply () {
      this.remarks = this.preText(this.textarea)
      console.log(this.remarks)
      this.dialogVisible = true
    },
    preText (pretext) {
      return pretext.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
    },
    // 查询公众号
    queryApply () { },
    // 重置
    // resetForm (formName) {
    //   this.$refs[formName].resetFields()
    // },
    // 导出
    exportBox () {
      let fileName = '自定义榜单' + this.fileName + '文章总榜'
      var table = XLSX.utils.table_to_book(document.querySelector('#wx-monitor'))
      exportTable(XLSX, FileSaver, table, fileName)
    },
    // 切换日/周/月榜单
    openOther (type) {
      let url = type === '1' ? 'CustimizeDetail' : type === '2' ? 'CustimizeArticle' : 'CustimizeVideo'
      this.$router.push({ name: url, query: { id: this.ruleForm.rankingUserId } })
    }
  },
  created () {
    this.ruleForm.rankingUserId = this.$route.query.id
    this.rankType()
    this.getrankArea()
    this.geListData()
    this.getNewDate()
  }
}
</script>
<style scoped lang="scss">
@import '../assess.css';
</style>
<style lang="scss" scoped>
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
  margin-right: 17px;
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
.messageType{
  width: 270px;
  text-align: center;
  background-color: #F7F8FA;
}
</style>
