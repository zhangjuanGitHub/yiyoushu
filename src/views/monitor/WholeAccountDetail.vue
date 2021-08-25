<!--
 * @Author: zhangjuan
 * @Date: 2021-04-29 15:08:54
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-06-29 16:45:56
-->
<template>
  <div class="account">
    <div class="flex-just-center account-show">
      <div class="menu-warp">
        <v-menu></v-menu>
      </div>
      <div class="account-company-warp">
        <div class="tabs-header">
          <span class="tabs-title isActive">单位账号</span>
        </div>
        <div class="whole-main">
          <div class="flex-ali-center">
            <el-button size="mini"
                           @click="goBack"
                           type="primary">返回</el-button>
          </div>
        </div>
        <div class="whole-main">
          <div class="flex-ali-center">
            <span>{{startTime}}</span><span>~</span><span>{{endTime}}</span>
          </div>
        </div>
        <div class="whole-main">
          <div class="flex-ali-center">
            <el-form ref="ruleForm"
                     :inline="true"
                     :model="ruleForm">
              <el-form-item prop="keyword">
                <el-input size="mini"
                          v-model="ruleForm.queryText"
                          placeholder="请输入关键字"></el-input>
              </el-form-item>
              <el-form-item class="search">
                <el-button size="mini"
                           @click="searchList"
                           type="primary">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button size="mini"
                           @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="flex-ali-center tabs-content">
          <div class="table-all">
            <div class="interaction-table">
              <el-table :data="tableData"
                        style="width: 100%"
                        border
                        id="wx-monitor"
                        :cell-style="{ textAlign: 'center' }">
                <el-table-column prop="ranking"
                                 label="排名"
                                 width="80">
                </el-table-column>
                <el-table-column label="账号信息"
                                 width="300">
                  <template slot-scope='scope'>
                    <div class="account-msg-box flex-ali-center cursor">
                      <img :src="scope.row.cover || undefinedUrl "
                           alt=""
                           @click="targetUrl(scope.row.biz)">
                      <div class="account-msg">
                        <p class="lin-clamp-1"
                           v-html="scope.row.nickname"
                           @click="targetUrl(scope.row.biz)"></p>
                        <p class="lin-clamp-1 wxh"
                           @click="targetUrl(scope.row.biz)">微信号：<span>{{scope.row.alias}}</span></p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="publishTotal"
                                 label="发文总数">
                </el-table-column>
                <el-table-column prop="readNum"
                                 label="阅读总数">
                </el-table-column>
                <el-table-column prop="oldLikeNum"
                                 label="点赞总数">
                </el-table-column>
                <el-table-column prop="likeNum"
                                 label="在看总数">
                </el-table-column>
                <el-table-column prop="total_score"
                                 label="易指数">
                  <template slot="header">
                    <span>易指数</span>
                    <el-tooltip class="item"
                                effect="dark"
                                content="易指数是用来衡量新媒体的传播能力，它是公信力、影响力、传播力、引导力这四项指标的综合标量数值。"
                                placement="top">
                      <i class="el-icon-question"></i>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="发布情况">
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
        </div>
        <div v-if="noData"
             class="flex-cloumn-cen account-list-undefined">
          <img src="@/assets/images/search/undefined.png"
               alt="">
          <p>抱歉，没有找到关于“<span>{{ruleForm2.queryText}}</span>”的结果。</p>
          <!-- <el-button plain>换个词试试？您也可以 -->
          <!-- <span class="is_red cursor"
                  @click="$router.push({ name: 'AddAccount' })">添加喜欢的公众号</span></el-button> -->
        </div>
        <set-page @pagingChange="pagingChange"
                  :total="total"
                  ref="child"></set-page>
      </div>
    </div>
  </div>
</template>
<script>
import vMenu from '@/views/monitor/components/Menu'
import { timeFormat } from '@/lib/tools'
export default {
  data () {
    return {
      noData: false, // 无数据
      undefinedUrl: require('@/assets/images/home/avatar.png'),
      total: 0,
      publishTime: [],
      ruleForm: {
        queryText: '', // 关键词
        pageBean: {
          pageSize: 10,
          pageNum: 1
        },
        authInfo: ''
        // startTime: '',
        // endTime: ''
      },
      startTime: '',
      endTime: '',
      records: 0,
      tableData: []
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
  created () {
    console.log(this.$route.query)
    this.ruleForm.authInfo = this.$route.query.authInfo
    this.startTime = this.$route.query.time1
    this.endTime = this.$route.query.time2
    // this.getCurrentTime()
    this.getAccountList()
  },
  methods: {
    // 默认时间
    calcDate (num) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * num)
      return date
    },
    getCurrentTime () {
      let end = this.calcDate(0)
      let start = this.calcDate(30)
      this.publishTime[0] = timeFormat(start)
      this.publishTime[1] = timeFormat(end)
    },
    // 查询
    searchList () {
      this.$refs.child.handleCurrentChange(1)
    },
    // 重置
    resetForm () {
      this.ruleForm.queryText = ''
      this.ruleForm.pageBean.pageNum = 1
      this.$refs.child.handleCurrentChange(1)
    },
    // 全局账号
    getAccountList () {
      this.noData = false
      if (this.publishTime.length > 0) {
        this.ruleForm.startTime = this.publishTime[0]
        this.ruleForm.endTime = this.publishTime[1]
      }
      // console.log(this.ruleForm)

      this.$http.post(this.$api.sameAccountInformation, this.ruleForm)
        .then(res => {
          // console.log(res)
          if (res.data.code === 200) {
            console.log(res.data.data)
            console.log(res.data.data.total)
            // if (res.data.data) {
            //   this.tableData = res.data.data.data
            //   this.total = res.data.data.total
            //   this.records = res.data.data.actualTotal
            // }
            if (JSON.stringify(res.data.data) === '{}') {
              this.tableData = []
              this.total = 0
              this.records = 0
            } else {
              this.tableData = res.data.data.data
              this.total = res.data.data.total
              this.records = res.data.data.actualTotal
            }
          }
        })
    },
    pagingChange (query) {
      console.log(query)

      // console.log('账号')
      this.ruleForm.pageBean.pageSize = query.size
      // this.ruleForm.pageBean.pageNum = query.page
      this.ruleForm.pageBean.pageNum = (query.page - 1) * query.size + 1
      this.getAccountList()
    },
    // 跳转历史推文
    targetUrl (biz) {
      this.$router.push({ 'name': 'HistoryTweets', query: { id: biz } })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  components: {
    vMenu
  }
}
</script>
<style lang="scss" scoped>
.wraper {
  .more-hot-li:first-child {
    padding-top: 0;
  }
  .more-hot-li {
    padding: 30px 0;
    border-bottom: 1px solid #edeff4;
  }
}
.more-cover-box {
  width: 250px;
  height: 140px;
  position: relative;
  margin-right: 32px;
  background: #f5f5f5;
  img {
    width: 100%;
    max-height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
}
.wraper {
  .more-hot-li:first-child {
    padding-top: 0;
  }
  .more-hot-li {
    padding: 30px 0;
    border-bottom: 1px solid #edeff4;
  }
}
.more-cover-box {
  width: 250px;
  height: 140px;
  position: relative;
  margin-right: 32px;
  background: #f5f5f5;
  img {
    width: 100%;
    max-height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
}
.crumbs {
  color: #3b81fe;
  font-size: 24px;
  display: flex;
  align-items: center;
}
.crumbs::before {
  content: '';
  display: block;
  width: 5px;
  height: 5px;
  background-color: #3b81fe;
  margin: 0 34px;
  border-radius: 50%;
}
.more-hot-main > p:first-child {
  font-size: 24px;
  color: $title-color;
}
.more-hot-main {
  flex: 1;
  p {
    font-size: $font-size-middle;
    color: $main-color;
  }
  span {
    margin-right: 30px;
  }
  img {
    width: 18px;
    height: 18px;
    margin-right: 2px;
  }
}
.more-hot-main > p:nth-child(2) {
  margin: 15px 0 30px;
}
.account-list-undefined {
  img {
    width: 457px;
    height: 329px;
    margin-top: 30px;
  }
  p {
    margin-top: 55px;
    color: $content-text-color;
  }
}
.nickname {
  color: #3b82fe;
}
.num_p {
  color: #3b81fe;
}

.account-show {
  width: 1400px;
  min-height: calc(100vh - 181px);
  margin: 0 auto;
  margin-bottom: 70px;
}
.account-company-warp {
  margin-left: 50px;
  width: 100%;
  margin-top: 20px;
  background: #ffffff;
  border: 1px solid #cccccc;
}
.menu-warp {
  width: 15%;
}
.whole-main {
  margin: 20px;
}
/* 类别 p */
.noActive {
  color: #999999;
  font-size: 14px;
  margin-right: 20px;
  cursor: pointer;
}
.active {
  color: #f79406;
  background-color: #fff8dd;
  padding: 2px 10px 2px 10px;
}
.cur {
  cursor: pointer;
}

/* 记录 */
.records {
  color: #f79406;
  font-size: 24px;
  margin-right: 5px;
}
.records2 {
  color: #adaeb2;
  font-size: 14px;
}
.area .el-form-item__label {
  color: wheat;
}
// .el-cascader {
//   width: 121px;
// }
// .el-date-editor {
//   width: 172px;
//   height: 28px;
// }
.flex-ali-center {
  margin-bottom: 10px;
}

.tit {
  color: #252934;
  font-size: 14px;
  margin-right: 20px;
}
.tabs-content {
  width: 96%;
  margin: 20px;
  overflow: hidden;
}
.list-mar {
  margin-top: 12px;
}
.more-hot-li {
  padding: 30px 0;
  border-bottom: 1px solid #edeff4;
}

/* 表格 */
.account-msg-box img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin-right: 5px;
}
.account-msg-box {
  margin-bottom: 0px;
}
.account-msg img {
  width: 18px;
  height: 18px;
  margin-bottom: -2px;
}
.account-msg {
  .wxh {
    font-size: 13px;
  }
  .rz {
    color: #707277;
    span {
      color: #252934;
    }
  }
}
.table-all {
  width: 100%;
}
.account-msg p {
  text-align: left;
}
// .img {
//   display: inline-block;
//   width: 18px;
//   height: 18px;
//   margin-right: 5px;
//   // margin-top: 5px;
// }
.search {
  margin-left: -10px;
}
.sear_date {
  width: 205px;
  height: 28px;
}
.list-li {
  position: relative;
  margin-right: 15px;
  img {
    position: absolute;
    top: 2px;
    left: -22px;
  }
}

.account-list-undefined {
  img {
    width: 457px;
    height: 329px;
    margin-top: 30px;
  }
  p {
    margin-top: 55px;
    color: $content-text-color;
  }
  .el-button {
    margin: 15px 0;
    .is_red {
      color: #ff0000;
    }
  }
}

.range {
  width: 120px;
}
</style>
