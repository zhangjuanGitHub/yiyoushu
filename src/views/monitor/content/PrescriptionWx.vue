<!--
 * @Author: MaiChao
 * @Date: 2021-02-04 14:54:55
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-06-02 14:26:02
-->
<template>
  <!-- <div class="interaction content-box"> -->
    <div class="">
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
          <img src="@/assets/images/monitor/import.png"
               alt="">
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
              <!-- <div class="account-msg-box flex-ali-center cursor"
                   @click="$router.push({ name: 'HistoryTweets' , query: { id: scope.row.id } })">
                <img :src="scope.row.hd_head_img"
                     alt="">
                <div class="account-msg">
                  <p class="lin-clamp-1"
                     v-html="scope.row.nickname"></p>
                  <p class="lin-clamp-1">微信号：<span>{{scope.row.alias}}</span></p>
                </div>
              </div> -->
              <div class="account-msg-box flex-ali-center cursor"
                   @click="$router.push({ name: 'HistoryTweets' , query: { id: scope.row.biz } })">
                <img :src="scope.row.hd_head_img"
                     alt="">
                <div class="account-msg">
                  <p class="lin-clamp-1"
                     v-html="scope.row.nickname"></p>
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
                           width="101"
                           label="活跃度">
            <template slot="header">
              <span>活跃度</span>
              <el-tooltip class="item"
                          effect="dark"
                          content="根据月发文次数和发布情况计算得出活跃度"
                          placement="top">
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
                           width="95">
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
          <el-table-column prop="last_pubtime"
                           label="最后发布时间"
                           width="105">
            <template slot-scope="scope">
              <p v-html="(scope.row.last_pubtime || '').slice(0, 10)"></p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <set-page @pagingChange="pagingChange"
                :total="total" ref="child"></set-page> -->
    </div>
  <!-- </div> -->
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { exportTable, timeFormat } from '@/lib/tools'
export default {
  data () {
    return {
      activeTab: 'wx',
      pageBean: {
        // pageSort: {
        //   pageNum: 1,
        //   pageSize: 10
        // },
        level: 1, // 单位为1，关注为2
        publishTime: [],
        keyword: '',
        sortDirection: '',
        sortField: ''
      },
      tableData: [],
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
        day = day == 7 ? 6 : day
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
    // pagingChange (query) {
    //   this.pageBean.pageSort.pageSize = query.size
    //   this.pageBean.pageSort.pageNum = query.page
    //   this.getAccountList()
    // },
    // 导出
    exportExcel () {
      var table = XLSX.utils.table_to_book(document.querySelector('#wx-prescript'))
      exportTable(XLSX, FileSaver, table, '发布时效监测')
    },
    searchList () {
      this.tableData = []
      this.total = 0
      // this.$refs.child.handleCurrentChange(1)
      this.getAccountList()
    },
    resetForm () {
      this.tableData = []
      this.total = 0
      this.pageBean.keyword = ''
      this.getCurrentTime()
      this.pageBean.publishTime = []
      // this.$refs.child.handleCurrentChange(1)
      this.getAccountList()
    },
    // 获取账号列表
    getAccountList () {
      this.$http.post(this.$api.getAccountCompany, this.pageBean)
        .then(res => {
          if (res.data.data.data.length > 0) {
            this.total = Number(res.data.data.count)
            this.tableData = res.data.data.data
            this.tableData.forEach(item => {
              item.last_pubtime = item.last_pubtime.slice(0, 10)
            })
          } else {
            let str = this.pageBean.keyword !== '' ? '您还没有关注相关账号' : '您还没有关注账号，请先关注账号'
            this.$message.warning(str)
          }
        })
    },
    calcDate (num) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * num)
      return date
    },
    getCurrentTime () {
      let end = this.calcDate(1)
      let start = this.calcDate(30)
      this.pageBean.publishTime[0] = timeFormat(start)
      this.pageBean.publishTime[1] = timeFormat(end)
    }
  },
  created () {
    this.getCurrentTime()
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
  color: #3b82fe;
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
.pub-account-right > p {
  text-align: left;
}
.pub-account-msg .pub-account-detail {
  color: #6c6d6e;
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
  color: #6c6d6e;
}
.account-pro-box .el-progress-bar {
  padding-right: 0;
}
.interaction-table .el-table .cell {
  padding-left: 0;
}
</style>
