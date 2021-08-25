<!--
 * @Author: MaiChao
 * @Date: 2021-02-07 15:31:16
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-08-03 13:45:04
 * 其他文章数量改为非涉检文章数量
-->
<template>
  <div class="relevant content-box">
    <div class="wx-warp-box">
      <el-form :inline="true"
               ref="ruleForm"
               :model="ruleForm">
        <el-form-item class="publishTime"
                      label="时间"
                      prop="publishTime">
          <el-date-picker v-model="ruleForm.publishTime"
                          size="small"
                          type="daterange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          value-format="yyyy-MM-dd"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="keyword"
                      label="关键字">
          <el-input size="small"
                    v-model="ruleForm.keyword"
                    placeholder="请输入关键字"
                    class="search_key"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small"
                     @click="searchList"
                     type="primary"
                     class="search_query">查询</el-button>
          <el-button size="small"
                     @click="resetForm('ruleForm')"
                     class="search_reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="wx-warp-content">
      <!-- <div class="line-box">
        <div class="title">折线图走势</div>
        <div id="line-charts"></div>
      </div> -->
      <div class="relevant-table">
        <el-table :data="tableData"
                  style="width: 100%"
                  border
                  :cell-style="{ textAlign: 'center' }"
                  :default-sort="{prop: 'date', order: 'descending'}">
          <!-- <el-table-column label="序号"
                           width="80">
            <template slot-scope='scope'>
              <div>
                {{scope.$index+1}}
              </div>
            </template>
          </el-table-column> -->
          <el-table-column prop="screen_name"
                           label="头条号">
            <template slot-scope='scope'>
              <div class="account-infor flex-ali-center cursor" @click="tabsCharts(scope.row)">
                <img :src="scope.row.avatar_img"
                     alt="">
                <div class="account-name">
                  <p class="import-name"
                     v-html='scope.row.screen_name'></p>
                  <!-- <p>{{scope.row.screen_name}}</p> -->
                </div>
                <div v-if="scope.row.verified" class="ver-img">
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
            </template>
          </el-table-column>
          <el-table-column prop="articleCountNum"
                           label="文章总数"
                           sortable
                           width="200">
          </el-table-column>
          <el-table-column prop="procuratorialCountNum"
                           sortable
                           label="相关文章数量"
                           width="200">
            <template slot-scope='scope'>
              <div class="cursor"
                   @click="openInvolved(scope.row, 1)">
                {{scope.row.procuratorialCountNum}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="articleNotPertinenceNum"
                           sortable
                           label="非相关文章数量">
            <template slot-scope="scope">
              <div class="cursor"
                  @click="openInvolved(scope.row, 2)">{{scope.row.articleNotPertinenceNum}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="pictureNum"
                           width="200"
                           sortable
                           label="其他总数">
            <template slot-scope="scope">
              <div class="cursor"
                  @click="openInvolved(scope.row, 3)">{{scope.row.pictureNum}}</div>
            </template>
          </el-table-column>
        </el-table>
        <!-- <set-page @pagingChange="pagingChange"
                  :total="total"
                  ref="child"></set-page> -->
      </div>
    </div>
  </div>
</template>
<script>
// import vSearch from '@/views/monitor/components/RealSearch'
// import echarts from 'echarts'
export default {
  data () {
    return {
      // total: 0,
      ruleForm: {
        publishTime: [],
        keyword: '',
        pageSize: 10,
        pageNum: 1,
        bizList: []

      },
      tableData: []
    }
  },
  created () {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    this.ruleForm.publishTime[0] = this.formatDate(start)
    this.ruleForm.publishTime[1] = this.formatDate(end)
  },
  methods: {
    formatDate (now) {
      var year = now.getFullYear() + '-'
      var month = (now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1) + '-'
      var d = (now.getDate() < 10 ? '0' + now.getDate() : now.getDate())
      return year + month + d
    },
    // 分页
    // pagingChange (query) {
    //   this.ruleForm.pageSize = query.size
    //   this.ruleForm.pageNum = query.page
    //   this.getTableData()
    //   this.drawLine()
    // },
    // 获取表格信息
    getTableData () {
      this.$http.post(this.$api.toutiaofindAccountPertinence, this.ruleForm)
        .then(res => {
          // console.log(res.data.data)
          this.tableData = res.data.data
          // this.total = parseInt(res.data.data.count)
        }).catch(() => { })
    },
    searchList () {
      this.ruleForm.bizList = []
      this.getTableData()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      // this.ruleForm.pageSize = 10
      this.ruleForm.bizList = []
      this.getTableData()
    },
    // 跳转账号详情
    tabsCharts (row) {
      // this.ruleForm.bizList = []
      // this.ruleForm.bizList.push(row.biz)
      // window.open(row.web_url)
      this.$router.push({ name: 'ReleaseRulesToutiao', query: { id: row.user_id } })
    },
    // 跳转详情页面
    openInvolved (row, level) {
      console.log(row, level)
      let route = this.$router.resolve({ name: 'RelevantDetailToutiao', query: { id: row.user_id, type: level, publishTime: this.ruleForm.publishTime } })
      window.open(route.href, '_blank')
    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>
<style>
@import '../monitor.css';
</style>
<style lang="scss" scoped>
.wx-warp-box {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 20px 30px;
}
.wx-warp-content {
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
}
#line-charts {
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  height: 300px;
}
.account-infor img {
  height: 46px;
  width: 46px;
  margin-right: 8px;
  border-radius: 50%;
}
.picture-num i {
  margin-left: 5px;
}
.relevant-table {
  width: 1100px;
  margin: 0 auto;
  padding-bottom: 20px;
  box-sizing: border-box;
}
.import-name {
  text-align: left;
}

.ver-img img{
  width: 18px;
  height: 18px;
  margin-left: 5px;
  margin-top:5px
}
</style>
