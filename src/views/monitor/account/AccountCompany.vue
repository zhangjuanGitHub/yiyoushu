<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-03-05 10:06:51
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-08-03 11:35:19
-->
<template>
  <div class="interaction content-box">
    <div class="tabs-header">
      <!-- <span class="tabs-title" @click="tabsAll('company', 1)" :class="this.activeTab==='company'?'isActive':''">单位账户</span> -->
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
                           label="公众号">
              <template slot-scope='scope'>
              <div class="account-msg-box flex-ali-center cursor"
                   @click="toSearch(scope.row.biz)">
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
            <template slot="header">
              <span>活跃度</span>
              <el-tooltip class="item" effect="dark" content="根据月发文次数和发布情况计算得出活跃度" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <p v-if="scope.row.livenessNum === 1">不活跃</p>
              <p v-else-if="scope.row.livenessNum === 2">一般活跃</p>
              <p v-else-if="scope.row.livenessNum === 3">比较活跃</p>
              <p v-else-if="scope.row.livenessNum === 4">活跃</p>
            </template>
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
                <el-progress :percentage="getPercentage(scope.row.dayNum)"
                             :color="getPerColor(scope.row.dayNum)"
                             :show-text="false"></el-progress>
                <p><span>{{computedNum(scope.row.dayNum)}}</span></p>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- <set-page @pagingChange="pagingChange"
              :total="total" ref="child"></set-page> -->
  </div>
</template>
<script>
import { timeFormat, exportTable } from '@/lib/tools'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

import vSearch from '@/views/monitor/components/RealSearch'
export default {
  data () {
    return {
      warningMessage: null, // 消息提示
      targetRouteName: '', // 如果没有认证单位或者没有关注账号跳转到相应页面
      tableData: [],
      activeTab: 'follow',
      showImport: true, // 搜索框是否展示导出按钮
      pageBean: {
        // pageSort: {
        //   pageNum: 1,
        //   pageSize: 10
        // },
        level: 2, // 单位为1，关注为2
        publishTime: [],
        keyword: '',
        sortDirection: '',
        sortField: ''
      },
      total: 0
    }
  },
  computed: {
    computedNum () {
      return function (params) {
        let value
        switch (params) {
          case -1:
            value = '长时间未更新'
            break
          case 0:
            value = '今天更新'
            break
          case 1:
            value = '昨天更新'
            break
          case 2:
            value = '前天更新'
            break
          default:
            value = params + '天未更新'
            break
        }
        return value
      }
    },
    getPercentage () {
      return function (day) {
        day = day === 7 ? 6 : day
        let calc = Number(Math.abs(((1 - (day / 7)) * 100).toFixed(0)))
        let value
        if (calc >= 100) {
          value = 100
        } else {
          value = calc
        }
        return value
      }
    },
    getPerColor () {
      return function (day) {
        let value
        if (day === -1) {
          value = '#F56C6C'
        } else if (day < 3) {
          value = '#67C23A'
        } else if (day < 6) {
          value = '#E6A23C'
        } else {
          value = '#F56C6C'
        }
        return value
      // Number(scope.row.dayNum) < 3 ? '#67C23A' : (Number(scope.row.dayNum) < 6 ? '#E6A23C' : '#F56C6C')
      }
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
      let fileName = this.activeTab === 'company' ? '单位账户' : '关注的账号'
      var table = XLSX.utils.table_to_book(document.querySelector('#wx-monitor'))
      exportTable(XLSX, FileSaver, table, fileName)
    },
    toSearch (id) {
      let routeName = this.activeTab === 'company' ? 'AccountMaterial' : 'HistoryTweets'
      this.$router.push({ name: routeName, query: { id: id } })
    },
    // tab
    tabsAll (name, level) {
      if (this.warningMessage !== null) {
        this.warningMessage.close()
      }
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
      // this.$refs.child.handleCurrentChange(1)
      this.getAccountList()
    },
    // 无单位认证或关注账号消息提示
    openVn (text) {
      const h = this.$createElement
      this.warningMessage = this.$message({
        duration: this.duration,
        message: h('p', null, [
          h('i', text + '，'),
          h('i', { style: 'color: #3B81FE; margin-left: 10px; cursor: pointer', on: { 'click': this.target } }, '去' + text.substring(text.length - 4))
        ])
      })
    },
    // 无单位认证或关注账号跳转到相应页面
    target () {
      this.warningMessage.close()
      this.$router.push({ 'name': this.targetRouteName })
    },
    // 获取账号列表
    getAccountList () {
      this.$http.post(this.$api.getAccountCompany, this.pageBean)
        .then(res => {
          if (res.data.data.data.length > 0) {
            this.total = Number(res.data.data.count)
            this.tableData = res.data.data.data
          } else {
            let str = this.activeTab === 'company' ? '您还没有认证单位，请先认证单位' : '您还没有关注账号，请到首页搜索进行关注账号'
            var setSubstr = str.substring(str.length - 4)
            if (setSubstr === '认证单位') {
              this.targetRouteName = 'UnitAttestation'
            } else {
              this.targetRouteName = 'Home'
            }
            this.openVn(str)
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
  destroyed () {
    if (this.warningMessage !== null) {
      this.warningMessage.close()
    }
    // console.log('离开了页面')
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
