<!--
 * @Author: MaiChao
 * @Date: 2021-02-04 14:54:55
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-04-08 19:35:21
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
                        prop="valueTime">
            <el-select v-model="valueTime"
                       size="small"
                       @change="calcCycle"
                       class="pub-time-type"
                       placeholder="时间">
              <el-option label="七天内"
                        value="1"></el-option>
              <el-option label="一个月内"
                        value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最高错敏级别"
                        prop="time">
            <el-select v-model="ruleForm.level"
                       size="small"
                       class="pub-level-idx"
                       placeholder="级别">
              <el-option label="1级"
                        value="1"></el-option>
              <el-option label="2级"
                        value="2"></el-option>
              <el-option label="3级"
                        value="3"></el-option>
              <el-option label="4级"
                        value="4"></el-option>
              <el-option label="5级"
                        value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="keyword"
                        label="关键字">
            <el-input size="small"
                      v-model="ruleForm.keyword"
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
        <el-table :data="accountList"
                  style="width: 100%"
                  id="wx-senstive">
          <el-table-column label="标题"
                            prop="title">
            <template slot-scope="scope">
              <p class="cursor text-underline"
                  @click="targetDes(scope.row.article_id)" v-html="scope.row.title"></p>
            </template>
          </el-table-column>
          <el-table-column label="账号名称"
                            width="200"
                            show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="pub-account-msg flex-all-center cursor text-underline"
                    @click="targetAnalyse(scope.row.biz)">
                <img :src="scope.row.ori_head_img" alt="">
                <p v-html="scope.row.nickname"></p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="max_err_level"
                            width="100"
                            label="最高级别">
            <template slot="header">
              <span>最高级别</span>
              <el-tooltip class="item" effect="dark" content="1级为最高级别，5级为最低级别" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <p>{{scope.row.max_err_level}}级</p>
            </template>
          </el-table-column>
          <el-table-column prop="error_count"
                            width="120"
                            label="错敏总数">
          </el-table-column>
          <el-table-column prop="create_time"
                            width="160"
                            label="监测时间">
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
import { exportTable, timeFormat } from '@/lib/tools'
export default {
  data () {
    return {
      valueTime: '',
      activeTab: 'wx',
      ruleForm: {
        publishTime: [],
        keyword: '',
        sortDirection: '',
        sortField: '',
        pageSize: 10,
        pageNum: 1,
        level: ''
      },
      accountList: [],
      total: 0
    }
  },
  methods: {
    // 分页
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
      this.getAccountList()
    },
    // 导出
    exportExcel () {
      var table = XLSX.utils.table_to_book(document.querySelector('#wx-senstive'))
      exportTable(XLSX, FileSaver, table, '错敏监测')
    },
    // 去详情
    targetDes (articleId) {
      let route = this.$router.resolve({
        name: 'SensitiveArticle',
        query: { articleId: articleId }
      })
      window.open(route.href, '_blank')
    },
    // 去账号分析
    targetAnalyse (item) {
      let route = this.$router.resolve({
        name: 'SensitiveAnalyse',
        query: { id: item }
      })
      window.open(route.href, '_blank')
    },
    // 筛选
    searchList () {
      this.$refs.child.handleCurrentChange(1)
    },
    // 重置
    resetForm () {
      this.valueTime = ''
      this.ruleForm.level = ''
      this.ruleForm.keyword = ''
      this.ruleForm.publishTime = []
      this.$refs.child.handleCurrentChange(1)
    },
    // 获取错敏列表
    getAccountList () {
      this.$http.post(this.$api.getSensitiveList, this.ruleForm)
        .then(res => {
          this.total = res.data.data.count
          this.accountList = res.data.data.list
        })
    },
    calcDate (num) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * num)
      return date
    },
    // 计算周期
    calcCycle () {
      let end = this.calcDate(1)
      let start = this.calcDate(this.valueTime === '1' ? 7 : 30)
      this.ruleForm.publishTime[0] = timeFormat(start)
      this.ruleForm.publishTime[1] = timeFormat(end)
    }
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
.pub-account-msg img {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-right: 4px;
}
.pub-monitor-search .pub-time-type {
  width: 110px;
}
.pub-monitor-search .pub-level-idx {
  width: 90px;
}
.pub-monitor-search .el-input {
  width: 160px;
  margin-left: 5px;
}
</style>
