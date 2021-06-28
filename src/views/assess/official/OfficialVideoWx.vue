<!--
 * @Author: MaiChao
 * @Date: 2021-03-15 16:16:36
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-05-24 14:28:57
-->
<template>
  <div class="">
    <!-- <div class="official account-box">
      <div class="tabs-header">
        <span class="tabs-title"
              @click="tabsAll('wx', 1)"
              :class="this.activeTab==='wx'?'isActive':''">微信榜单</span>
        <span class="tabs-title"
              @click="tabsAll('wb', 2)"
              :class="this.activeTab==='wb'?'isActive':''">微博榜单</span>
        <span class="right-btn cursor"
              @click="openCust"><i class="el-icon-s-data"></i>自定义榜单</span>
      </div> -->
      <div class="">
        <div class="title-time">{{fileName}}</div>
        <!-- <div class="title-time">{{ this.activeTab=='wx'? fileName : fileName2 }}</div> -->
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
                            label="时间"
                            class="messageType">
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
              <el-form-item prop="districts"
                            label="地区" class="area">
                <el-cascader size="small"
                             :options="options"
                             :show-all-levels="false"
                             :props="{ checkStrictly: true }"
                             v-model="ruleForm.districts"
                             placeholder="请选择地区"></el-cascader>
              </el-form-item>
              <el-form-item>
                <el-checkbox label="原创" v-model="ruleForm.isOrigin"></el-checkbox>
                <el-checkbox label="10w+" v-model="ruleForm.isReadNumMax"></el-checkbox>
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
            <el-table-column prop="nickname"
                             label="文章标题">
              <template slot-scope='scope'>
                <div class="account-infor flex-ali-center" @click="openWeb(scope.row)">
                  <img :src="scope.row.cover" class="cursor"
                       alt="">
                  <div class="account-title lin-clamp-2 cursor primary">
                    <p >{{scope.row.title}}</p>
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
      fileName: '最近一天微信视频排行榜', // 导出名称
      limitCount: '', // 限制个数
      dataShow: false,
      pageShow: false, // 页面条数限制
      activeTab: 'wx',
      options: [],
      ruleForm: {
        types: '3',
        dateType: 1,
        classifyVal: '',
        isOrigin: false,
        isReadNumMax: false,
        pageNum: 1,
        pageSize: 10
      },
      tableData: []
    }
  },
  created () {
    this.rankType()
    this.geListData()
  },
  methods: {
    // 切换导出名称
    tabsTitle () {
      switch (this.ruleForm.dateType) {
        case 1:
          this.fileName = '最近一天微信视频排行榜'
          break
        case 2:
          this.fileName = '最近一周微信视频排行榜'
          break
        case 3:
          this.fileName = '最近一月微信视频排行榜'
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
      this.$http.get(this.$api.rankArea)
        .then(res => {
          if (res.data.code === 200) {
            this.options = res.data.data
          }
        })
        .catch(() => { })
    },
    // 获取表格数据
    geListData () {
      this.$http.post(this.$api.zfVideo, this.ruleForm)
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
      this.restTable()
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.ruleForm.isOrigin = false
      this.ruleForm.isReadNumMax = false
      this.restTable()
    },
    // 导出
    exportBox () {
      var table = XLSX.utils.table_to_book(document.querySelector('#wx-monitor'))
      exportTable(XLSX, FileSaver, table, this.fileName)
    },
    // 切换类型
    openOther (type) {
      let url = type === '1' ? 'Official' : type === '2' ? 'OfficialArticle' : 'OfficialVideo'
      this.$router.push({ name: url })
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
