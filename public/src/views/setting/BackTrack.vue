<!--
 * @Author: MaiChao
 * @Description: 账号回溯
 * @Date: 2021-02-26 09:42:59
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-04-20 16:13:18
-->
<template>
  <div class="back-track">
    <div class="back-track-header">
      <div class="img-box flex-ali-center">
        <img src="@/assets/images/login/yys.png"
             alt="">
        <div class="crumbs">个人中心</div>
      </div>
    </div>
    <div class="back-track-content flex-just-center">
      <div class="menu-warp">
        <v-menu></v-menu>
      </div>
      <div class="back-track-right">
        <div class="tabs-header">
          <span class="tabs-title">导出回溯数据</span>
        </div>
        <div class="back-teack-table">
          <el-table :data="tableData"
                    style="width: 100%">
            <el-table-column prop="nickname"
                             label="账号回溯"
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="name"
                             label="状态"
                             width="200">
              <template slot-scope='scope'>
                <div class="delete"
                     v-if="scope.row.reviewStatus===-1">回溯异常</div>
                <div class="info"
                     v-else-if="scope.row.reviewStatus===0">等待回溯</div>
                <div class="primary"
                     v-else-if="scope.row.reviewStatus===1">正在补充</div>
                <div class="warning"
                     v-else-if="scope.row.reviewStatus===2">正在回溯</div>
                <div class="export"
                     v-else-if="scope.row.reviewStatus===3">回溯完成</div>
              </template>
            </el-table-column>
            <el-table-column prop="startDate"
                             label="回溯开始时间"
                             width="220">
            </el-table-column>
            <el-table-column prop="insertTime"
                             label="添加时间"
                             width="300">
            </el-table-column>
            <el-table-column label="操作"
                             width="140">
              <template slot-scope='scope'>
                <div class="flex-ali-center">
                  <span class="click-span export"
                        v-if="scope.row.reviewStatus===3"
                        @click="exportItem(scope.row)">
                    <i class="el-icon-finished"></i>
                    导出
                  </span>
                  <span class="click-span delete"
                        @click="deleteItem(scope.row)">
                    <i class="el-icon-delete"></i>
                    删除
                  </span>
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
    </div>
  </div>
</template>
<script>
import vMenu from '@/views/setting/components/Menu'
export default {
  data () {
    return {
      total: 0,
      deleteTeam: false,
      deleteId: '',
      ruleForm: {
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
      this.$http.post(this.$api.wxListData, this.ruleForm)
        .then(res => {
          console.log(res.data.data)
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
      this.$http.get(this.$api.wxDelete, { params: { id: this.deleteId } })
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
    exportItem (item) {
      let token = this.$store.state.user.token
      if (process.env.NODE_ENV === 'development') {
        window.location.href = process.env.VUE_APP_BASE_URL + this.$api.wxExport + '?id=' + item.id + '&authCode=' + token
      } else {
        window.location.href = window.g.baseUrl + this.$api.wxExport + '?id=' + item.id + '&authCode=' + token
      }
    }
  },
  components: {
    vMenu
  }
}
</script>
<style >
@import './setting.css';
</style>
<style scoped>
.back-track {
  min-height: calc(100vh - 111px);
}
.back-track-header {
  background-color: #fff;
}
.back-track-header .img-box {
  width: 1400px;
  height: 117px;
  margin: 0 auto;
}
.img-box>img {
  width: 170px;
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
.back-track-right {
  width: 1212px;
  background-color: #fff;
  margin: 30px 0 100px 20px;
}
.back-teack-table {
  padding: 20px;
}
.click-span {
  text-decoration: none;
}
.export {
  margin-right: 10px;
}
</style>
