<!--
 * @Author: MaiChao
 * @@Description:公众号收藏
 * @Date: 2021-02-26 10:46:48
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-06-01 15:59:30
-->
<template>
  <div class="collection">
    <div class="collection-seach">
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
          <!-- <el-form-item label="账号类型"
                        prop="type">
            <el-select v-model="ruleForm.type"
                       placeholder="请选择账号类型"
                       size="small">
              <el-option label="微信公众号"
                         :value="1"></el-option>
              <el-option label="微博"
                         :value="2"></el-option>
            </el-select>
          </el-form-item> -->
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
                       class="search_query" @click="queryData">查询</el-button>
            <el-button size="small"
                       class="search_reset" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="small"
                       type="primary"
                       class="search_query" @click="exportData">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="collection-table">
      <el-table :data="tableData"
                style="width: 100%"
                class="exportTable"
                border
                name="wx"
                v-if="type === 1"
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
                          label="账号名称">
            <template slot-scope='scope'>
              <div class="account-infor flex-ali-center">
                <el-image :src="scope.row.headImage">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <div class="account-name">
                  <p class="import-name"
                      v-html='scope.row.accountName'></p>
                </div>
              </div>
            </template>
        </el-table-column>
        <el-table-column label="账号ID"
                          prop="alias"
                          width="200">
        </el-table-column>
        <el-table-column prop="updateTime"
                          label="添加时间" width="200">
        </el-table-column>
        <el-table-column label="操作"
                          width="250">
          <template slot-scope='scope'>
            <div class="click-span delete" @click="deleteItem(scope.row)">
              删除
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="tableData"
                style="width: 100%"
                class="exportTable"
                border
                name="wb"
                v-else-if="type === 2"
                :cell-style="{ textAlign: 'center' }"
                :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column label="账号类型"
                          width="120" prop="type">
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
                          label="账号名称">
            <template slot-scope='scope'>
              <div class="account-infor flex-ali-center">
                <el-image :src="scope.row.headImage">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <div class="account-name">
                  <p class="import-name"
                      v-html='scope.row.accountName'></p>
                </div>
              </div>
            </template>
        </el-table-column>
        <el-table-column label="简介"
                          width="500" prop="description">
        </el-table-column>
        <el-table-column prop="updateTime"
                          label="添加时间" width="100">
        </el-table-column>
        <el-table-column label="操作"
                          width="150">
          <template slot-scope='scope'>
            <div class="click-span delete" @click="deleteItem(scope.row)">
              删除
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="回溯删除"
                 :visible.sync="deleteTeam"
                 :modal-append-to-body="false"
                 :close-on-click-modal='false'
                 width="30%"
                 center>
        <span class="dialog-span">您确定要执行此操作吗?</span>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="overDelete">取 消</el-button>
          <el-button type="primary"
                     @click="deleteTeams">确 定</el-button>
        </span>
      </el-dialog>
    <set-page @pagingChange="pagingChange"
              :total="total" ref="child"></set-page>
  </div>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { exportTable } from '@/lib/tools'
export default {
  props:['type'],
  data () {
    return {
      total: 100,
      deleteTeam: false,
      deleteId: '',
      ruleForm: {
        accountName: '',
        // type: 1,
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
      this.ruleForm.type = this.type
      this.$http.post(this.$api.listData, this.ruleForm)
        .then(res => {
          this.tableData = res.data.data.content
          this.total = res.data.data.totalElements
        }).catch(() => { })
    },
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
      this.getTableData()
    },
    deleteItem (item) {
      this.deleteId = item.id
      this.deleteTeam = true
    },
    // 确认删除
    deleteTeams () {
      this.$http.get(this.$api.listDelete, { params: { id: this.deleteId } })
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success('删除成功!')
            this.deleteId = ''
            this.deleteTeam = false
            this.$refs.child.handleCurrentChange(1)
          }
        }).catch(() => {
          this.deleteTeam = false
        })
    },
    // 取消删除
    overDelete () {
      this.deleteTeam = false
      this.ids = ''
    },
    // 查询
    queryData () {
      this.$refs.child.handleCurrentChange(1)
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$refs.child.handleCurrentChange(1)
    },
    // 导出
    exportData () {
      let fileName = this.$route.meta.title
      var wb = XLSX.utils.table_to_book(document.querySelector('.exportTable'))
      exportTable(XLSX, FileSaver, wb, fileName)
    }
  },
  watch: {
    'type'() {
      // this.ruleForm.type = this.type
      this.getTableData()
    }
  },
  components: {}
}
</script>
<style >
@import '../setting.css';
</style>
<style scoped>
.collection{
  background-color: #fff;
}
.collection-seach {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 20px 30px 0px 30px;
}
.collection-table{
  padding: 20px 30px;
  box-sizing: border-box;
}
.account-infor {
  width: 200px;
  margin: 0 auto;
}
.account-infor .el-image {
  height: 60px;
  min-width: 60px;
  max-width: 60px;
  margin-right: 20px;
  border: 1px solid #eee;
}

</style>
