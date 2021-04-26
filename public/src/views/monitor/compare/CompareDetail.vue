<template>
  <div>
    <div class="account-compare-title flex-bwt-center">
      <div class="flex-ali-center">
        <p class="search-mater-theme">对比数据123</p>
        <p>公众号粉丝互动数据（
          <span v-html="ruleForm.publishTime === '1' ? '30天': ruleForm.publishTime === '2' ? '60天' : '90天'"></span>
          ）</p>
      </div>
      <el-button type="success"
                 size="small"
                 @click="startCompare">开始对比</el-button>
    </div>
    <div class="account-compare-main">
      <!-- 账号头部 -->
      <div class="add-compare-msg">
        <div class="add-compare-range flex-all-center">
          <el-form ref="ruleForm"
                   :inline="true"
                   :model="ruleForm">
            <el-form-item label="时间"
                          prop="publishTime">
              <el-select v-model="ruleForm.publishTime"
                         size="small"
                         @change="changeTime"
                         placeholder="请选择时间">
                <el-option label="30天内"
                           value="1"></el-option>
                <el-option label="60天内"
                           value="2"></el-option>
                <el-option label="90天内"
                           value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="tool"
                          label="渠道">
              <el-select v-model="ruleForm.tool"
                         size="small"
                         placeholder="请选择渠道">
                <el-option label="微信"
                           value="1"></el-option>
                <!-- <el-option label="微博"
                           value="2"></el-option>
                <el-option label="头条"
                           value="3"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item prop="type"
                          label="类型">
              <el-select v-model="ruleForm.type"
                         size="small"
                         multiple
                         collapse-tags
                         @change="changeType"
                         placeholder="请选择类型">
                <el-option label="全部"
                           value="0"></el-option>
                <el-option label="基础信息"
                           value="1"
                           :disabled="isDisabled"></el-option>
                <el-option label="活跃度"
                           value="2"
                           :disabled="isDisabled"></el-option>
                <el-option label="涉检文章"
                           value="3"
                           :disabled="isDisabled"></el-option>
                <el-option label="错敏词"
                           value="4"
                           :disabled="isDisabled"></el-option>
                <el-option label="吸引力"
                           value="5"
                           :disabled="isDisabled"></el-option>
                <el-option label="认可度"
                           value="6"
                           :disabled="isDisabled"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <ul class="add-compare-account">
          <li :style="{ width: calcWidth + '%' }"
              v-for="(item, index) of arr"
              :key="index">
            <div v-if="!item.biz"
                 class="flex-cloumn-all">
              <div class="add-compare-ava">
                <p>暂无账号</p>
              </div>
              <el-button size="middle"
                         class="add-compare-btn"
                         type="primary"
                         @click="addAccount('')">添加账号</el-button>
            </div>
            <div v-else
                 class="flex-cloumn-all">
              <div class="add-compare-ava  flex-ali-center">
                <img :src="item.ori_head_img"
                     alt="">
                <div class="compare-msg-name">
                  <p v-html="item.nickname"></p>
                  <p v-html="item.alias"></p>
                </div>
              </div>
              <el-button size="middle"
                         class="add-compare-btn"
                         type="primary"
                         @click="addAccount(item, index)">换个账号</el-button>
            </div>
            <i v-if="arr.length > 2"
               @click="deleteComAccount(index)"
               class="add-compare-del el-icon-circle-close"></i>
          </li>
        </ul>
        <div class="add-right-btn"
             v-if="arr.length < 4"
             @click="addAccount">添加账号</div>
      </div>
      <!-- 账号对比信息 -->
      <div class="add-compare-table">
        <el-table :data="accountList"
                  style="width: 100%"
                  border
                  :show-header="false"
                  :cell-style="setFirstCloumn">
          <el-table-column width="185"
                           prop="name">
            <template slot-scope="scope">
              <div class="add-compare-left">{{scope.row.name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="list">
            <template slot-scope="scope">
              <div v-for="(item, index) of scope.row.list"
                   :key="index"
                   :style="{ width: calcWidth + '%' }"
                   class="compare-table-msg">
                <div v-if="scope.row.name === '基础信息'">
                  <p>是否认证<span v-html="item.auth_type ? '是' : '否'"></span></p>
                  <p>认证主体<span v-html="item.auth_type ? item.auth_type : '无'"></span></p>
                  <p>关联小程序<span v-for="(item, index) of item.articleMini" :key="'i'+index">{{item}}</span></p>
                </div>
                <div v-else-if="scope.row.name === '活跃度'">
                  <p>发文篇数<span>{{item.articleOneSum}}</span></p>
                  <p>发文总数<span>{{item.articleSum}}</span></p>
                  <p>含有评论文章数<span>{{item.countNum}}</span></p>
                  <p>留言热词<span v-for="(item, index) of item.commetHot" :key="index">{{item}}</span></p>
                </div>
                <div v-else-if="scope.row.name === '涉检文章'">
                  <p>涉检文章总数<span>{{item.procuratorialNum}}</span></p>
                  <p>其他文章数<span>{{item.notProcuratorialNum}}</span></p>
                  <p>头条涉检数<span>{{item.procuratorialOneNum}}</span></p>
                  <p>次条涉检数<span>{{item.procuratorialTwoNum}}</span></p>
                </div>
                <div v-else-if="scope.row.name === '错敏词'">
                  <p>错敏文章总数<span>{{item.errArticleNum}}</span></p>
                  <p>错敏字总数<span>{{item.errWordNum}}</span></p>
                  <p>头条错敏文章数<span>{{item.errOneArticleNum}}</span></p>
                  <p>头条错敏字总数<span>{{item.errOneWordNum}}</span></p>
                  <p>次条错敏文章数<span>{{item.errorTwoArticleNum}}</span></p>
                  <p>次条错敏字总数<span>{{item.errTwoWordNum}}</span></p>
                </div>
                <div v-else-if="scope.row.name === '吸引力'">
                  <p>总阅读数<span>{{item.sumReadNum}}</span></p>
                  <p>篇均阅读数<span>{{item.averageReadNum}}</span></p>
                  <p>最高阅读数<span>{{item.maxReadNum}}</span></p>
                  <p>头条总阅读数<span>{{item.sumOneReadNum}}</span></p>
                  <p>头条篇均阅读数<span>{{item.averageOneReadNum}}</span></p>
                  <p>头条最高阅读数<span>{{item.maxOneReadNum}}</span></p>
                  <p>次条总阅读数<span>{{item.sumTwoReadNum}}</span></p>
                  <p>次条篇均阅读数<span>{{item.averageTwoReadNum}}</span></p>
                  <p>次条最高阅读数<span>{{item.maxTwoReadNum}}</span></p>
                  <p>3-n条总阅读数<span>{{item.sumThreeReadNum}}</span></p>
                  <p>3-n条篇均阅读数<span>{{item.averageThreeReadNum}}</span></p>
                  <p>3-n条最高阅读数<span>{{item.maxThreeReadNum}}</span></p>
                </div>
                <div v-else>
                  <p>总点赞数<span>{{item.sumPointNum}}</span></p>
                  <p>篇均点赞数<span>{{item.averagePointNum}}</span></p>
                  <p>最高点赞数<span>{{item.maxPointNum}}</span></p>
                  <p>头条点赞总数<span>{{item.sumOnePointNum}}</span></p>
                  <p>头条篇均点赞数<span>{{item.averageOnePointNum}}</span></p>
                  <p>头条最高点赞数<span>{{item.maxOnePointNum}}</span></p>
                  <p>次条总点赞数<span>{{item.sumTwoPointNum}}</span></p>
                  <p>次条篇均点赞数<span>{{item.averageTwoPointNum}}</span></p>
                  <p>次条最高点赞数<span>{{item.maxTwoPointNum}}</span></p>
                  <p>3-n条总点赞数<span>{{item.sumThreePointNum}}</span></p>
                  <p>3-n条篇均点赞数<span>{{item.averageThreePointNum}}</span></p>
                  <p>3-n条最高点赞数<span>{{item.maxThreePointNum}}</span></p>
                  <p>总在看数<span>{{item.sumOldLikeNum}}</span></p>
                  <p>篇均在看数<span>{{item.averageOldLikeNum}}</span></p>
                  <p>最高在看数<span>{{item.maxOldLikeNum}}</span></p>
                  <p>头条总在看数<span>{{item.sumOneOldLikeNum}}</span></p>
                  <p>头条篇均在看数<span>{{item.averageOneOldLikeNum}}</span></p>
                  <p>头条最高在看数<span>{{item.maxOneOldLikeNum}}</span></p>
                  <p>次条总在看数<span>{{item.sumTwoOldLikeNum}}</span></p>
                  <p>次条篇均在看数<span>{{item.averageTwoOldLikeNum}}</span></p>
                  <p>次条最高在看数<span>{{item.maxTwoOldLikeNum}}</span></p>
                  <p>3-n条总在看数<span>{{item.sumThreeOldLikeNum}}</span></p>
                  <p>3-n条篇均在看数<span>{{item.averageThreeOldLikeNum}}</span></p>
                  <p>3-n条最高在看数<span>{{item.maxThreeOldLikeNum}}</span></p>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 账号对比 -->
    <el-dialog title="选择账号"
               :visible.sync="selectPerVisible"
               :modal-append-to-body="false"
               :close-on-click-modal='false'
               center
               @close="cancelSelectPer"
               width="960px">
      <div class="add-box">
        <div class="search-box">
          <el-input placeholder="请输入公众号名称或微信号"
                    v-model="keyword">
          </el-input>
          <el-button type="primary"
                     @click="queryKeyword">查询</el-button>
        </div>
        <div class="flex-bwt">
          <div class="show-box">
            <div class="top-line flex-arr-center">搜索结果</div>
            <div class="flex-arr-center name-box">
              <span>公众号</span>
              <span>微信号</span>
            </div>
            <div class="content-box">
              <div class="flex-arr-center alone cursor"
                   v-for="(item,index) in searchList"
                   :key="index"
                   @dblclick="shuttle(item,index)">
                <p>{{item.nickname}}</p>
                <p>{{item.alias}}</p>
              </div>
            </div>
          </div>
          <div class="show-box">
            <div class="top-line flex-arr-center">已添加公众号</div>
            <div class="flex-arr-center name-box">
              <span>公众号</span>
              <span>微信号</span>
            </div>
            <div class="content-box">
              <div class="flex-arr-center alone cursor"
                   v-for="(item,index) in addList"
                   :key="index"
                   @dblclick="unShuttle(item,index)">
                <p>{{item.nickname}}</p>
                <p>{{item.alias}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary"
                   @click="submitPer">确定</el-button>
        <el-button @click="cancelSelectPer">取消</el-button>
      </div>
    </el-dialog>
    <!-- 单位对比 -->
    <el-dialog title="选择单位"
               :visible.sync="selectComVisible"
               :modal-append-to-body="false"
               :close-on-click-modal='false'
               center
               class="select-depart"
               width="1000px">
      <div class="compare-company">
        <div class="flex-ali-center">
          <p>选择对比地区</p>
          <el-select v-model="city"
                     size="small"
                     @change="changeCity"
                     placeholder="请选择对比地区">
            <el-option :label="item.label"
                       :value="item.value"
                       v-for="(item, index) of cityList"
                       :key="index"></el-option>
          </el-select>
        </div>
        <div class="com-company-box">
          <div class="company-boc-tree">
            <el-tree :data="treeData"
                     :props="defaultProps"
                     node-key="value"
                     :expand-on-click-node="false"
                     :default-expanded-keys="[this.treeData.length > 0 ? this.treeData[0].value : 1 ]"
                     @node-click="selectTree"></el-tree>
          </div>
          <div class="company-boc-table">
            <el-table :data="accountData"
                      style="width: 100%"
                      @selection-change="handleSelect">
              <el-table-column type="selection"
                               width="55">
              </el-table-column>
              <el-table-column label="账号信息"
                               prop="nickname"
                               show-overflow-tooltip>
                <template slot-scope="scope">
                  <div class="sel-depart-tab flex-ali-center">
                    <img :src="scope.row.hd_head_img" alt="">
                    <p>{{scope.row.nickname}}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="alias"
                               label="微信号"
                               width="200">
              </el-table-column>
              <el-table-column prop="function_type"
                               label="类型"
                               width="160">
              </el-table-column>
            </el-table>
            <set-page @pagingChange="pagingChange"
                      :total="total" ref="child"></set-page>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary">确定</el-button>
        <el-button @click="cancelSelectCom">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { timeFormat } from '@/lib/tools'
export default {
  data () {
    return {
      city: '',
      cityList: [], // 地区列表
      treeData: [], // 根据地区查询区县
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        id: '',
        pageSize: 10,
        pageNum: 1
      },
      total: 0,
      accountData: [], // 单位列表
      selectValue: [], // 选择的账号
      activeTab: 'account', // 高亮
      keyword: '', // 账号搜索关键字
      searchList: [], // 根据账号查询到的列表
      addList: [], // 根据账号查询添加后的列表
      replaceIndex: '', // 要替换的index
      ruleForm: { // 筛选条件
        publishTime: '1',
        tool: '1',
        type: ['0']
      },
      publishTime: [], // 时间
      isDisabled: true, // 类型是否禁用
      accountWidth: 945, // 添加账号区域总宽度
      type: '', // 1 账号对比 2 单位对比
      selectComVisible: false, // 单位对比
      selectPerVisible: false, // 账号对比
      calcWidth: 0, // 每个账号的宽度
      arr: [{}, {}],
      accountList: [
        {
          name: '基础信息',
          list: [{}, {}]
        },
        {
          name: '活跃度',
          list: [{}, {}]
        },
        {
          name: '涉检文章',
          list: [{}, {}]
        },
        {
          name: '错敏词',
          list: [{}, {}]
        },
        {
          name: '吸引力',
          list: [{}, {}]
        },
        {
          name: '认可度',
          list: [{}, {}]
        }
      ]
    }
  },
  methods: {
    // 改变类型
    changeType (val) {
      if (val.indexOf('0') >= 0) {
        this.isDisabled = true
        this.ruleForm.type = ['0']
      } else {
        this.isDisabled = false
      }
    },
    getCalc (days) {
      const now = new Date()
      now.setTime(now.getTime() - 3600 * 1000 * 24 * days)
      return now
    },
    // 改变时间
    changeTime (val) {
      let end = this.getCalc(1)
      let start = ''
      if (val === '3') {
        start = this.getCalc(90)
      } else if (val === '2') {
        start = this.getCalc(60)
      } else {
        start = this.getCalc(30)
      }
      this.publishTime[0] = timeFormat(start)
      this.publishTime[1] = timeFormat(end)
    },
    // 根据账号搜索
    queryKeyword () {
      if (this.keyword && this.keyword !== ' ') {
        this.$http.post(this.$api.getByKey, { keyword: this.keyword })
          .then(res => {
            if (res.data.data.account.length <= 0) {
              this.$message.warning('没有查询到')
            } else {
              this.searchList = res.data.data.account
            }
          }).catch(() => { })
      } else {
        this.$message.warning('请输入公众号名称或微信号')
      }
    },
    // 添加公众号
    shuttle (item, index) {
      if (this.addList.length >= 4) {
        this.$message.warning('最多添加四个账号')
      } else {
        this.searchList.splice(index, 1)
        this.addList.push(item)
      }
    },
    // 取消添加公众号
    unShuttle (item, index) {
      this.addList.splice(index, 1)
      this.searchList.push(item)
    },
    // 确认添加账号
    submitPer () {
      if (this.replaceIndex !== '' && this.replaceIndex >= 0) {
        if (this.addList[0]) {
          this.$set(this.arr, this.replaceIndex, this.addList[0])
          this.cancelSelectPer()
        } else {
          this.$message.warning('请选择你要替换的账号')
        }
      } else {
        if (this.addList.length < 2) {
          this.$message.warning('请至少添加两个账号')
        } else {
          this.arr = this.addList
          this.calcWidth = (1 / this.arr.length) * 100
          if (this.arr.length > 2) {
            let calLength = this.arr.length - this.accountList[0].list.length
            for (let j = 0; j < calLength; j++) {
              for (let i = 0; i < 6; i++) {
                this.accountList[i].list.push({})
              }
            }
          }
          this.cancelSelectPer()
        }
      }
    },
    // 取消账号对比
    cancelSelectPer () {
      this.selectPerVisible = false
      this.searchList = []
      this.addList = []
      this.keyword = ''
      this.replaceIndex = ''
    },
    // 添加账号
    addAccount (item, index) {
      this.replaceIndex = index
      if (this.type === '1') {
        this.arr[0].biz && !index ? this.addList = this.arr : this.addList = []
        // item ? this.addList.push(item) : '' // 替换的那条
        this.selectPerVisible = true
      } else {
        this.selectComVisible = true
        this.getCityList()
      }
    },
    // 开始对比
    startCompare () {
      if (this.ruleForm.type.length > 0 && this.arr[0].biz) {
        let biz = []
        this.arr.forEach((item, index) => {
          biz.push(item.biz)
        })
        let obj = {
          publishTime: this.publishTime,
          levelList: this.ruleForm.type,
          bizList: biz
        }
        if (this.type === '1') { // 账号对比
          this.$http.post(this.$api.startCompare, obj)
            .then(res => {
              this.accountList = res.data.data
            }).catch(() => {})
        } else { // 单位对比
          console.log(11111)
        }
      } else {
        if (this.ruleForm.type.length > 0) {
          this.$message.warning('请添加要对比的账号')
        } else {
          this.$message.warning('请选择对比类型')
        }
      }
    },
    // 设置表格左侧第一列颜色
    setFirstCloumn (row) {
      if (row.column.property === 'name') {
        return 'background: #F7F8FA'
      }
    },
    // 获取地区列表
    getCityList () {
      this.$http.get(this.$api.getCityList)
        .then(res => {
          this.cityList = res.data.data
          this.city = res.data.data[0].value
          this.getTreeList()
        }).catch(() => { })
    },
    // 获取单位列表
    getTreeList () {
      this.$http.post(this.$api.getTreeList, { id: this.city })
        .then(res => {
          this.treeData = res.data.data
          this.form.id = this.treeData[0].value
          console.log(this.treeData[0].value)
          this.getAccount()
        }).catch(() => { })
    },
    // 获取账号列表
    getAccount () {
      this.$http.post(this.$api.getAccountList, this.form)
        .then(res => {
          this.accountData = res.data.data.list
          this.total = res.data.data.count
        }).catch(() => { })
    },
    // 分页
    pagingChange (query) {
      this.form.pageSize = query.size
      this.form.pageNum = query.page
      this.getAccount()
    },
    // 点击某一地区
    changeCity (data) {
      this.city = data
      this.getTreeList()
    },
    // 点击某一单位
    selectTree (data) {
      this.form.id = data.value
      this.getAccount()
    },
    // 选择某些单位
    handleSelect (val) {
      console.log(val)
    },
    // 取消单位对比
    cancelSelectCom () {
      this.selectComVisible = false
      this.city = ''
    },
    // 删除某一个账号
    deleteComAccount (index) {
      for (let i = 0; i < this.accountList.length; i++) {
        this.accountList[i].list.splice(index, 1)
      }
      this.arr.splice(index, 1)
      this.calcWidth = (1 / this.arr.length) * 100
    },
    listenerSubmit (e) {
      if (e.keyCode === 13) {
        this.queryKeyword()
      }
    }
  },
  created () {
    this.calcWidth = (1 / 2) * 100 // 默认是两个
    this.type = this.$route.query.type
    this.changeTime('1')
  },
  mounted () {
    window.addEventListener('keydown', this.listenerSubmit)
  },
  destroyed () {
    window.removeEventListener('keydown', this.listenerSubmit, false)
  }
}
</script>
<style>
.select-depart .el-dialog__body {
  min-height: 500px
}
</style>
<style scoped>
@import '../monitor.css';
@import './compare.css';
.search-box {
  text-align: center;
  margin: 10px 0;
}
.search-box .el-input {
  width: 470px;
  margin-right: 15px;
}
.show-box {
  width: 420px;
  border: 1px solid #e1e4e8;
}
.content-box {
  height: 300px;
  overflow-y: scroll;
}
.content-box::-webkit-scrollbar {
  background: transparent;
}
.content-box::-webkit-scrollbar-thumb,
.top-line,
.alone:hover {
  background: #f7f8fa;
}
.alone p {
  width: 50%;
  padding: 10px 0;
  text-align: center;
}
.top-line {
  height: 40px;
}
.name-box {
  color: #3b82fe;
  height: 40px;
  border-bottom: 1px solid #e1e4e8;
}
</style>
