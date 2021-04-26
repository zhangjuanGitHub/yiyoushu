<!--
 * @Author: MaiChao
 * @Date: 2021-02-04 14:54:55
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-16 09:50:44
-->
<template>
  <div class="interaction content-box">
    <div class="tabs-header">
      <span class="tabs-title"
            @click="tabsAll('Interaction')"
            :class="this.$route.name==='Interaction'?'isActive':''">微信</span>
      <span class="tabs-title"
            @click="tabsAll('')">微博</span>
    </div>
    <div class="wx-warp-box">
      <el-form :inline="true"
               ref="ruleForm"
               :model="ruleForm">
        <el-form-item class="timeRange"
                      label="时间"
                      prop="timeRange">
          <el-date-picker v-model="ruleForm.timeRange"
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
      <div class="interaction-table">
        <el-table :data="tableData"
                  style="width: 100%"
                  border
                  :cell-style="{ textAlign: 'center' }"
                  :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column prop="nickname"
                           label="账号信息"
                           width="350">
            <template slot-scope='scope'>
              <div class="account-infor flex-ali-center">
                <img :src="scope.row.hd_head_img"
                     alt="">
                <div class="account-name">
                  <p class="import-name"
                     v-html='scope.row.nickname'></p>
                  <p>{{scope.row.alias}}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="articleCountNum"
                           label="文章总数"
                           sortable
                           width="200">
          </el-table-column>
          <el-table-column prop="articleCountNum"
                           label="互动性"
                           width="200">
          </el-table-column>
          <el-table-column prop="last_pubtime"
                           label="截止时间">
          </el-table-column>
        </el-table>
        <set-page @pagingChange="pagingChange"
                  :total="total"
                  ref="child"></set-page>
      </div>
    </div>
  </div>
</template>
<script>
// import echarts from 'echarts'
export default {
  data () {
    return {
      total: 100,
      ruleForm: {
        publishTime: [],
        keyword: '',
        pageSize: 10,
        pageNum: 1
      },
      tableData: [{
      }]
    }
  },
  methods: {
    // 分页
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
      this.getTableData()
      this.drawLine()
    },
    // 获取表格信息
    getTableData () {
      this.$http.post(this.$api.findInteractivityList, this.ruleForm)
        .then(res => {
          console.log(res.data.data)
          this.tableData = res.data.data
          this.total = parseInt(res.data.data.count)
        }).catch(() => { })
    },
    searchList () {
      this.ruleForm.pageSize = 5
      this.ruleForm.pageNum = 1
      this.$refs.child.handleCurrentChange(1)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.ruleForm.pageSize = 10
      this.ruleForm.pageNum = 1
      this.$refs.child.handleCurrentChange(1)
    },
    tabsAll (name) {
      this.$router.push({ name: name })
    },
    // 跳转详情页面
    openInvolved (row) {
      console.log(row)
      this.$router.push({ name: 'RelevantDetail' })
    }
  },
  created () {
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
  padding: 0 20px;
}
#line-charts {
  height: 300px;
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
</style>
