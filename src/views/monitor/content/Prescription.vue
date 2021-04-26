<!--
 * @Author: MaiChao
 * @Date: 2021-02-04 14:54:55
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-02-04 15:14:21
-->
<template>
  <div class="interaction content-box">
    <div class="tabs-header">
      <span class="tabs-title" :class="activeTab==='wx'?'isActive':''">微信</span>
    </div>
    <div class="pub-monitor-main">
      <div class="pub-monitor-search flex-bwt-center">
        <el-form :inline="true"
                ref="ruleForm">
          <el-form-item label="时间"
                        prop="publishTime">
            <el-date-picker v-model="pageBean.publishTime"
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
                        label="关键字">
            <el-input size="small"
                      v-model="pageBean.keyword"
                      placeholder="请输入关键字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small"
                      @click="searchList"
                      type="primary">查询</el-button>
            <el-button size="small"
                      @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
        <div @click="exportExcel"
            class="flex-ali-center rearl-search-import cursor">
          <img src="@/assets/images/monitor/import.png" alt="">
          <p>导出</p>
        </div>
      </div>
      <div class="pub-monitor-cont">
        <el-table :data="tableData"
                  style="width: 100%"
                  id="wx-prescript"
                  border>
          <!-- <el-table-column label="账号信息"
                            show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="pub-account-msg">
                <img src="@/assets/images/home/ava.png" alt="">
                <div class="pub-account-right">
                  <p v-html="scope.row.name"></p>
                  <div class="pub-account-detail flex-ali-center">
                    <p>微信号：<span v-html="scope.row.name"></span></p>
                    <p class="p-splider">|</p>
                    <p>地区：<span v-html="scope.row.area"></span></p>
                    <p class="p-splider">|</p>
                    <p>单位：<span v-html="scope.row.dep"></span></p>
                  </div>
                  <p> {{scope.row.desc}}</p>
                </div>
              </div>
            </template>
          </el-table-column> -->
          <el-table-column prop="address"
                           label="账号信息">
              <template slot-scope='scope'>
              <div class="account-msg-box flex-ali-center">
                <img :src="scope.row.hd_head_img" alt="">
                <div class="account-msg">
                  <p class="lin-clamp-1" v-html="scope.row.nickname"></p>
                  <p class="lin-clamp-1">微信号：<span>{{scope.row.alias}}</span></p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="articleCountNum"
                           label="发文总数"
                           sortable
                           width="101">
          </el-table-column>
          <el-table-column prop="sumOriginNum"
                           label="原创总数"
                           sortable
                           width="101">
          </el-table-column>
          <el-table-column prop="sumReadNum"
                           sortable
                           width="101"
                           label="阅读总数">
          </el-table-column>
          <el-table-column prop="sumPointNum"
                           label="点赞总数"
                           sortable
                           width="101">
          </el-table-column>
          <el-table-column prop="sumOldLikeNum"
                           label="在看总数"
                           sortable
                           width="101">
          </el-table-column>
          <el-table-column prop="livenessNum"
                           sortable
                           width="95"
                           label="活跃度">
          </el-table-column>
          <el-table-column prop="influenceNum"
                           label="影响力"
                           sortable
                           width="95">
          </el-table-column>
          <el-table-column width="100"
                           label="发布情况">
            <template slot-scope="scope">
              <div class="account-pro-box">
                <el-progress :percentage="Number(((scope.row.dayNum/7)*100).toFixed(0)) >= 100 ? 100 : Number(((scope.row.dayNum/7)*100).toFixed(0))"
                             :color="Number(scope.row.dayNum) < 3 ? '#67C23A' : (Number(scope.row.dayNum) < 6 ? '#E6A23C' : '#F56C6C')"
                             :show-text="false"></el-progress>
                <p><span>{{scope.row.dayNum}}</span>天未更新</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="last_pubtime"
                           label="发布时间"
                           width="100">
          </el-table-column>
        </el-table>
      </div>
      <set-page @pagingChange="pagingChange"
                :total="total" ref="child"></set-page>
    </div>
  </div>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { exportTable } from '@/lib/tools'
export default {
  data () {
    return {
      activeTab: 'wx',
      pageBean: {
        pageSort: {
          pageNum: 1,
          pageSize: 10
        },
        level: 2, // 单位为1，关注为2
        publishTime: [],
        keyword: '',
        sortDirection: '',
        sortField: ''
      },
      tableData: [],
      total: 0
    }
  },
  methods: {
    // 分页
    pagingChange (query) {
      this.pageBean.pageSort.pageSize = query.size
      this.pageBean.pageSort.pageNum = query.page
      this.getAccountList()
    },
    // 导出
    exportExcel () {
      var table = XLSX.utils.table_to_book(document.querySelector('#wx-prescript'))
      exportTable(XLSX, FileSaver, table, '发布时效监测')
    },
    searchList () {
      this.tableData = []
      this.total = 0
      this.$refs.child.handleCurrentChange(1)
    },
    resetForm () {
      this.tableData = []
      this.total = 0
      this.pageBean.keyword = ''
      this.pageBean.publishTime = []
      this.$refs.child.handleCurrentChange(1)
    },
    // 获取账号列表
    getAccountList () {
      this.$http.post(this.$api.getAccountCompany, this.pageBean)
        .then(res => {
          if (res.data.data.data.length > 0 ) {
            this.total = Number(res.data.data.count)
            this.tableData = res.data.data.data
          } else {
            this.$message.warning('您还没有关注账号，请先关注账号')
          }
        })
    },
  },
  created () {
    this.getAccountList()
  }
}
</script>
<style lang="scss" scoped>
@import '../monitor.css';
.pub-monitor-main {
  margin: 20px;
}
.rearl-search-import p {
  color: #3B82FE;
  margin-left: 5px;
}
.pub-monitor-search {
  margin-bottom: 20px;
}
.pub-monitor-search .el-range-editor--small.el-input__inner {
  width: 230px;
}
.pub-account-msg {
  display: flex;
  color: #252934;
}
.pub-account-msg img {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-right: 6px;
}
.pub-account-right>p {
  text-align: left;
}
.pub-account-msg .pub-account-detail {
  color: #6C6D6E;
}
.p-splider {
  margin: 0 10px;
}
.account-msg-box img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin-right: 5px;
}
.account-msg p {
  text-align: left;
}
.account-msg p:nth-child(1) {
  color: #252934;
}
.account-msg p:nth-child(2) {
  color: #6C6D6E;
}
.account-pro-box .el-progress-bar {
  padding-right: 0;
}
.interaction-table .el-table .cell {
  padding-left: 0;
}
</style>
