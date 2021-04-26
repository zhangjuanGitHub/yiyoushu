<!--
 * @Author: MaiChao
 * @@Description:单位账号
 * @Date: 2021-02-26 10:45:47
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-16 11:02:35
-->
<template>
  <div class="company">
    <div class="company-seach">
      <div class="search_form">
        <el-form :inline="true"
                 ref="ruleForm"
                 :model="ruleForm">
          <el-form-item label="账号名称"
                        prop="accountName">
            <el-input v-model="ruleForm.accountName"
                      placeholder="请输入账名称"
                      size="small"></el-input>
          </el-form-item>
          <el-form-item label="账号类型"
                        prop="accountType">
            <el-select v-model="ruleForm.accountType"
                       placeholder="请选择账号类型"
                       size="small">
              <el-option label="微信公众号"
                         :value="1"></el-option>
              <el-option label="微博"
                         :value="2"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="账号状态"
                        prop="state">
            <el-select v-model="ruleForm.state"
                       placeholder="请选择账号状态"
                       size="small">
              <el-option label="状态一"
                         value="状态一"></el-option>
              <el-option label="状态二"
                         value="状态二"></el-option>
            </el-select>
          </el-form-item> -->

          <el-form-item>
            <el-button size="small"
                       type="primary"
                       class="search_query" @click="getTableData()">查询</el-button>
            <el-button size="small"
                       class="search_reset" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="small"
                       type="primary"
                       class="search_query" @click="exportData()">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="company-table">
      <el-table :data="tableData"
                  style="width: 100%"
                  class="exportTable"
                  border
                  :cell-style="{ textAlign: 'center' }"
                  :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column label="账号类型"
                           width="180" prop="type">
            <template slot-scope='scope'>
              <div v-if="scope.row.type===1">
                微信公众号
              </div>
              <div v-if="scope.row.type===2">
                微博
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="accountName"
                           label="账号名称"
                           width="250">
          </el-table-column>
          <el-table-column prop="accountCode"
                           label="账号ID"
                           width="200">
          </el-table-column>
          <el-table-column prop="updateTime"
                           label="添加时间" width="200">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope='scope'>
              <div class="click-span" @click="deleteItem(scope.row)">
                删除
              </div>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <set-page @pagingChange="pagingChange"
                  :total="total"></set-page>
  </div>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { exportTable } from '@/lib/tools'
export default {
  data () {
    return {
      total: 100,
      ruleForm: {
        accountName: '',
        accountType: 1,
        // state: '',
        pageSize: 10,
        pageNum: 1
      },
      tableData: []
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    // 获取表格信息
    getTableData () {
      // let userForm = {
      //   accountName: this.ruleForm.accountName,
      //   type: this.ruleForm.type
      // }
      this.$http.post(this.$api.listAccount, this.ruleForm)
        .then(res => {
          console.log(res.data.data)
          this.tableData = res.data.data.content
          this.total = res.data.data.totalElements
        }).catch(() => {})
    },
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
      this.getTableData()
    },
    deleteItem (item) {},
    // 查询
    queryData () {
      this.ruleForm.pageSize = 10
      this.ruleForm.pageNum = 1
      this.getTableData()
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.ruleForm.pageSize = 10
      this.ruleForm.pageNum = 1
    },
    // 导出
    exportData () {
      let fileName = this.$route.meta.title
      var wb = XLSX.utils.table_to_book(document.querySelector('.exportTable'))
      exportTable(XLSX, FileSaver, wb, fileName)
    }
  },
  components: {}
}
</script>
<style scoped>
.company{
  background-color: #fff;
}
.company-seach {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 20px 30px 0px 30px;
}
.company-table{
  padding: 20px 30px;
  box-sizing: border-box;
}
</style>
