<!--
 * @Author: zhangjuan
 * @Description: 
 * @Date: 2021-03-05 10:06:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-09 16:08:43
-->
<template>
  <div class="interaction content-box">
    <div class="tabs-header">
      <span class="tabs-title" @click="tabsAll('company', 1)" :class="this.activeTab==='company'?'isActive':''">单位账户</span>
      <span class="tabs-title" @click="tabsAll('follow', 2)"  :class="this.activeTab==='follow'?'isActive':''">关注的账号</span>
    </div>
    <div class="wx-warp-box">
      <v-search :showImport="showImport"
                @getSearchList="getSearchList"
                @exportExcel="exportExcel"
                ref="search"></v-search>
    </div>
    <div class="wx-warp-content">
      <div class="interaction-table">
        <el-table :data="tableData"
                  style="width: 100%"
                  border
                  id="wx-monitor"
                  :cell-style="{ textAlign: 'center' }">
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
                           width="110">
          </el-table-column>
          <el-table-column prop="sumOriginNum"
                           label="原创总数"
                           sortable
                           width="110">
          </el-table-column>
          <el-table-column prop="sumReadNum"
                           sortable
                           width="110"
                           label="阅读总数">
          </el-table-column>
          <el-table-column prop="sumPointNum"
                           label="点赞总数"
                           sortable
                           width="110">
          </el-table-column>
          <el-table-column prop="sumOldLikeNum"
                           label="在看总数"
                           sortable
                           width="110">
          </el-table-column>
          <el-table-column prop="livenessNum"
                           sortable
                           width="110"
                           label="活跃度">
          </el-table-column>
          <el-table-column prop="influenceNum"
                           label="影响力"
                           sortable
                           width="100">
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
        </el-table>
      </div>
    </div>
    <set-page @pagingChange="pagingChange"
              :total="total" ref="child"></set-page>
  </div>
</template>
<script>
import { timeFormat } from '@/lib/tools'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { exportTable } from '@/lib/tools'
import vSearch from '@/views/monitor/components/RealSearch'
export default {
  data () {
    return {
      tableData: [],
      activeTab: 'company',
      showImport: true, // 搜索框是否展示导出按钮
      pageBean: {
        pageSort: {
          pageNum: 1,
          pageSize: 10
        },
        level: 1, // 单位为1，关注为2
        publishTime: [],
        keyword: '',
        sortDirection: '',
        sortField: ''
      },
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
      let fileName = ''
      switch (this.activeTab) {
        case 'company':
          fileName = '单位账户'
          break;
        case 'follow':
          fileName = '关注的账号'
          break;
      }
      var table = XLSX.utils.table_to_book(document.querySelector('#wx-monitor'))
      exportTable(XLSX, FileSaver, table, fileName)
    },
    // tab
    tabsAll (name, level) {
      this.tableData = []
      this.activeTab = name
      this.pageBean.level = level
      this.$refs.search.resetForm()
    },
    // 筛选
    getSearchList (obj) {
      this.tableData = []
      this.total = 0
      this.pageBean.publishTime = obj.time
      this.pageBean.keyword = obj.keyword
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
            let str = this.activeTab === 'company' ? '您还没有认证单位，请先认证单位' : '您还没有关注账号，请先关注账号'
            this.$message.warning(str)
          }
        })
    },
    getTime () {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      this.pageBean.publishTime[0] = timeFormat(start)
      this.pageBean.publishTime[1] = timeFormat(end)
    }
  },
  created () {
    this.getTime()
    this.getAccountList()
  },
  components: {
    vSearch
  }
}
</script>
<style lang="scss" scoped>
@import '../monitor.css';
.interaction {
  margin-bottom: 20px;
}
.wx-warp-box {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 20px 30px;
}
.wx-warp-content {
  padding: 0 20px;
}
#line-charts{
  height: 300px;
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