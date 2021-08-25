<!--
 * @Author: MaiChao
 * @Date: 2021-05-20 15:39:27
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-08-03 11:40:58
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-05-25 10:16:20
-->
<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-03-05 10:06:51
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-05-17 16:09:56
-->
<template>
  <div class="interaction content-box">
    <div class="tabs-header">
      <span class="tabs-title"
            :class="this.activeTab==='toutiao'?'isActive':''">关注的账号</span>
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
                           label="头条号">
            <template slot-scope='scope'>
              <div class="account-infor flex-ali-center cursor account-msg-box"
                   @click="getToutiao(scope.row)">
                <img :src="scope.row.avatar_img"
                     alt="img_toutiao"
                     class="head-img">
                <div class="account-name account-msg">
                  <p class="import-name lin-clamp-1"
                     v-html='scope.row.screen_name'></p>
                  <!-- <p>{{scope.row.screen_name}}</p> -->
                </div>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="function_type"
                           label="类别"
                           width="80"
                           :formatter="formatterType">
          </el-table-column> -->
          <!-- <el-table-column prop="followers_count"
                           label="粉丝数"
                           sortable
                           width="110">
          </el-table-column> -->
          <el-table-column prop="articleCountNum"
                           width="130"
                           sortable
                           label="发文总数">
          </el-table-column>
          <el-table-column prop="followings_count"
                           label="关注数"
                           sortable
                           width="130">
          </el-table-column>
          <el-table-column prop="diggCountSum"
                           label="点赞数"
                           sortable
                           width="130">
          </el-table-column>
          <el-table-column prop="commentCountSum"
                           label="评论数"
                           sortable
                           width="130">
          </el-table-column>
          <el-table-column prop="forwardCountSum"
                           label="转发数"
                           sortable
                           width="130">
          </el-table-column>
          <el-table-column prop="influenceNum"
                           label="影响力"
                           sortable
                           width="130">
          </el-table-column>
          <el-table-column width="120"
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
      activeTab: 'toutiao',
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
        sortField: '',
        duration: '3000'
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
    // pagingChange (query) {
    //   this.pageBean.pageSort.pageSize = query.size
    //   this.pageBean.pageSort.pageNum = query.page
    //   this.getAccountList()
    // },
    // 导出
    exportExcel () {
      // let fileName = this.activeTab === 'company' ? '单位账户' : '关注的账号'
      let fileName = '头条号'
      var table = XLSX.utils.table_to_book(document.querySelector('#wx-monitor'))
      exportTable(XLSX, FileSaver, table, fileName)
    },
    // 账号详情
    toSearch (id) {
      let routeName = this.activeTab === 'company' ? 'AccountMaterial' : 'HistoryTweets'
      this.$router.push({ name: routeName, query: { id: id } })
    },
    // tab
    // tabsAll (name, level) {
    //   if (this.warningMessage !== null) {
    //     this.warningMessage.close()
    //   }
    //   this.tableData = []
    //   this.activeTab = name
    //   this.pageBean.level = level
    //   this.$refs.search.resetForm()
    // },
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
      this.$http.post(this.$api.findAccountData, this.pageBean)
        .then(res => {
          // if (res.data.data.list.length > 0) {
          if (res.data.data.count > 0) {
            this.total = Number(res.data.data.count)
            this.tableData = res.data.data.list
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
    },
    getToutiao (row) {
      // window.open(row.web_url, '_black')
      // window.open(row.web_url)
      this.$router.push({ name: 'ReleaseRulesToutiao', query: { id: row.user_id } })
    },
    formatterType (row) {
      if (row.function_type == 'other') {
        return '其他'
      } else {
        return row.function_type
      }
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
#line-charts {
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
  color: #6c6d6e;
}
.account-pro-box .el-progress-bar {
  padding-right: 0;
}
.interaction-table .el-table .cell {
  padding-left: 0;
}
//5.24
.flex-ali-center {
  margin-bottom: 20px;
}
.account-infor {
  width: 200px;
  margin: 0 auto;
  text-align: left;
}
.account-infor img {
  height: 46px;
  width: 46px;
  margin-right: 8px;
  border-radius: 50%;
  // position: relative;
}
// .head-img {
//   position: relative;
// }
// .ver-img {
//   width: 18px;
//   height: 18px;
//   position: absolute;
//   left:40px;
//   top:40px
// }
.ver-img img {
  width: 18px;
  height: 18px;
  margin-left: 5px;
  margin-top: 5px;
}
</style>
