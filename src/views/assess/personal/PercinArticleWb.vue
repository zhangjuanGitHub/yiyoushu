<!--
 * @Author: MaiChao
 * @Date: 2021-03-15 16:16:36
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-06-02 14:51:34
-->
<template>
  <div class="">
    <!-- <div class="official account-box"> -->
      <div>
        <!-- <div class="title-time">{{ this.activeTab=='wx'? fileName : fileName2 }}</div> -->
        <div class="title-time">{{ fileName }}</div>
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
              <el-form-item prop="dateType"
                            label="时间"
                            class="messageType">
                <el-select v-model="ruleForm.dateType"
                           placeholder="请选择"
                           size="small"
                           @change="tabsTitle">
                  <el-option label="最近一天"
                             :value="1"></el-option>
                  <el-option label="最近一周"
                             :value="2"></el-option>
                  <el-option label="最近一月"
                             :value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="explain-box" label="类型" prop="function">
                <el-select v-model="ruleForm.classifyVal"
                           placeholder="请选择"
                           size='small'>
                  <el-option v-for="item in rankOption"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item prop="districts"
                            label="地区"
                            class="area">
                <el-cascader size="small"
                             :options="options"
                             :show-all-levels="false"
                             :props="{ checkStrictly: true }"
                             v-model="ruleForm.districts"
                             placeholder="请选择地区"></el-cascader>
              </el-form-item> -->
              <!-- <el-form-item prop="position"
                            label="位置"
                            class="messageType">
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
                             label="文章标题" width="250">
              <template slot-scope='scope'>
                <div class="account-infor flex-ali-center">
                  <div class="account-title lin-clamp-1 cursor primary">
                    <p @click="openWeb(scope.row)">{{scope.row.status_title}}</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="screen_name"
                             label="微博名称"
                             width="200">
            </el-table-column>
            <el-table-column prop="reposts_count"
                             label="转发数">
              <template slot-scope='scope'>
                <div v-if="scope.row.reposts_count>100000">
                  10w+
                </div>
                <div v-else>{{scope.row.reposts_count}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="comments_count"
                             label="评论数">
              <template slot-scope='scope'>
                <div v-if="scope.row.comments_count>100000">
                  10w+
                </div>
                <div v-else>{{scope.row.comments_count}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="attitudes_count"
                             label="点赞数">
              <template slot-scope='scope'>
                <div v-if="scope.row.attitudes_count>100000">
                  10w+
                </div>
                <div v-else>{{scope.row.attitudes_count}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="retweeted_status"
                           label="是否原创">
            <template slot-scope='scope'>
              <div v-if="scope.row.retweeted_status"
                   class="delete">否</div>
              <div v-else
                   class="export">是</div>
            </template>
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
    <!-- </div> -->
  </div>
</template>
<script>
import { exportTable } from '@/lib/tools'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data () {
    return {
      fileName: '最近一天微博文章排行榜', // 导出名称
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
      activeName: 'first',
      dialogVisible: false,
      addApply: false,
      activeTab: 'wb',
      options: [],
      ruleForm: {
        types: '2',
        dateType: 1, // 时间
        // districts: [], // 地区
        // position: '', // 位置
        pageNum: 1,
        pageSize: 10,
        classifyVal: ''// 类型
      },
      tableData: [],
      rankOption: []// 类型
    }
  },
  created () {
    this.getrankType()
    // this.rankType()
    this.geListData()
  },
  methods: {
    // 切换导出名称
    tabsTitle () {
      switch (this.ruleForm.dateType) {
        case 1:
          this.fileName = '最近一天微博文章排行榜'
          break
        case 2:
          this.fileName = '最近一周微博文章排行榜'
          break
        case 3:
          this.fileName = '最近一月微博文章排行榜'
          break
      }
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
      this.$http.get(this.$api.wbType, { params: { type: '2' } })
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
    // 获取表格数据
    geListData () {
      this.$http.post(this.$api.getQYWeiboArticle, this.ruleForm)
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
    // tabsAll (name, level) {
    //   this.activeTab = name
    // },
    // 自定义榜单
    openCust () {
      this.$router.push({ name: 'Customize' })
    },
    // 筛选
    searchList () {
      this.restTable()
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.ruleForm.classifyVal = ''
      this.restTable()
    },
    // 导出
    exportBox () {
      var table = XLSX.utils.table_to_book(document.querySelector('#wx-monitor'))
      exportTable(XLSX, FileSaver, table, this.fileName)
    },
    // 说明
    openOther (type, active) {
      // console.log(active)
      let url = type === '1' ? 'Personal' : type === '2' ? 'PercinArticle' : 'PercinVideo'
      // this.$router.push({ name: url })
      this.$router.push({ 'name': url, query: { active: active } })
    },
    // 打开外部页面
    openWeb (row) {
      window.open(row.url, '_black')
    }
  }
}
</script>
<style scoped lang="scss">
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
.explain-box .el-button {
  width: 212px;
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
.success {
  color: #0ad80a;
}
</style>
