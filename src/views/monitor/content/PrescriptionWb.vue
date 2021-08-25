<!--
 * @Author: MaiChao
 * @Date: 2021-02-04 14:54:55
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-08-03 11:44:12
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
                id="wb-prescript"
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
                         label="微博博主">
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
            <div class="account-infor flex-ali-center cur"
                 @click="getWb(scope.row)">
              <div class="img-all">
                <img :src="scope.row.profile_image_url"
                     alt=""
                     class="head-img">
                <!-- <img :src="b"
                     alt=""
                     v-if="scope.row.verified"
                     class="v-img"> -->
              </div>

              <div class="account-name">
                <p class="import-name lin-clamp-1"
                   v-html='scope.row.screen_name'></p>
                <!-- <p>{{scope.row.screen_name}}</p> -->
              </div>
              <div v-if="scope.row.verified"
                   class="ver-img">
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
            <div>

            </div>
          </template>
        </el-table-column>
        <el-table-column prop="function_type"
                         label="类别"
                         width="101">
        </el-table-column>
        <el-table-column prop="followers_count"
                         label="粉丝数"
                         sortable
                         width="101">
        </el-table-column>
        <el-table-column prop="articleCountNum"
                         width="101"
                         sortable
                         label="发博数">
        </el-table-column>
        <el-table-column prop="commentsCountSum"
                         label="评论总数"
                         sortable
                         width="101">
        </el-table-column>
        <el-table-column prop="follow_count"
                         label="关注数"
                         sortable
                         width="101">
        </el-table-column>
        <el-table-column prop="attitudesCountSum"
                         label="点赞总数"
                         sortable
                         width="101">
        </el-table-column>
        <el-table-column prop="repostsCountSum"
                         label="转发总数"
                         sortable
                         width="101">
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
      b: require('@/assets/images/monitor/b.png'),
      r: require('@/assets/images/monitor/r.png'),
      y: require('@/assets/images/monitor/y.png'),
      activeTab: 'wb',
      pageBean: {
        // pageSort: {
        //   pageNum: 1,
        //   pageSize: 10
        // },
        level: 1, // 单位为1，关注为2
        publishTime: [],
        keyword: ''
        // sortDirection: '',
        // sortField: ''
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
      var table = XLSX.utils.table_to_book(document.querySelector('#wb-prescript'))
      exportTable(XLSX, FileSaver, table, '微博发布时效监测')
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
      this.$http.post(this.$api.getAccountCompanyWb, this.pageBean)
        .then(res => {
          if (res.data.data.list.length > 0) {
            this.total = Number(res.data.data.count)
            this.tableData = res.data.data.list
            // this.tableData.forEach(item => {
            //   item.last_pubtime = item.last_pubtime.slice(0, 10)
            // })
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
    },
    getWb (row) {
      // window.open(row.web_url, '_black')
      // window.open(row.web_url)
      this.$router.push({ name: 'ReleaseRulesWb', query: { id: row.uid } })
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

.flex-ali-center {
  margin-bottom: 20px;
}
.account-infor {
  width: 200px;
  margin: 0 auto;
}

.img-all {
  height: 46px;
  width: 46px;
  position: relative;
  margin-right: 8px;
}
.head-img {
  height: 46px;
  width: 46px;
  // margin-right: 20px;
  border-radius: 50%;
}
.cur {
  cursor: pointer;
}
.img_wb {
  // border-radius: 50px;
}

// 认证图片
.v-img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: -5px;
  bottom: -1px;
}

.ver-img img {
  width: 18px;
  height: 18px;
  margin-left: 5px;
  margin-top: 5px;
}
</style>
