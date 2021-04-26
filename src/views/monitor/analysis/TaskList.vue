<template>
  <div class="list-main flex-cloumn-ll">
    <div class="list-main-search">
      <el-form :inline="true"
               ref="ruleForm"
               :model="ruleForm">
        <el-form-item label="创建时间"
                      prop="publishTime">
          <el-date-picker v-model="ruleForm.publishTime"
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
                    v-model="ruleForm.keyword"
                    placeholder="请输入微信名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small"
                     @click="searchList"
                     type="primary">查询</el-button>
          <el-button size="small"
                     @click="resetForm">重置</el-button>
          <el-button size="small"
                     type="info"
                     v-if="!comfirmDel"
                     @click="goDelete">批量删除</el-button>
          <el-button size="small"
                    type="danger" plain
                    v-if="comfirmDel"
                    @click="confirmDelete">确认删除</el-button>
          <el-button size="small"
                    type="primary" plain
                    v-if="comfirmDel"
                    @click="cancelDelete">取消删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list-main-list"
        v-if="taskList.length > 0">
      <div class="main-list-box"
           :class="{ 'is-todelete': comfirmDel }"
           v-for="(item, index) of taskList" :key="index">
        <div class="flex-bwt-center">
          <div class="main-list-up flex-ali-center">
            <img :src="item.hdHeadImg" alt="">
            <div class="main-list-name">
              <p v-html="item.nickname"></p>
              <p v-html="item.username"></p>
            </div>
          </div>
          <div v-if="item.analyseScore > 0"
               class="cursor"
               @click="toAnalyse(item.biz)">
            <el-progress type="circle"
                       :width="40"
                       :stroke-width="3"
                       :format="format"
                       :color="customColorMethod"
                       :percentage="Number(item.analyseScore)"
                       ></el-progress>
          </div>
          <p v-else>处理中...</p>
        </div>
        <div class="main-list-time">
          <p>创建时间：<span>{{item.createTime}}</span></p>
          <p>分析时间：<span>{{item.startDate}}</span> 至 <span>{{item.endDate}}</span></p>
        </div>
        <div class="main-list-del" v-if="comfirmDel"></div>
        <el-checkbox-group v-model="item.conDel"
                           v-if="comfirmDel"
                           @change="changeIsDel(item, index)">
          <el-checkbox :value="1"></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="list-main-list" v-else>
      <p>没有查询到任务哦</p>
    </div>
    <div class="pagination-wrap flex-all-center">
      <el-pagination @current-change="handleCurrentChange"
                    background
                    :pager-count="5"
                    layout="total, prev, pager, next, jumper"
                    :page-size="ruleForm.pageSize"
                    :current-page.sync="ruleForm.pageNum"
                    :hide-on-single-page="total<=ruleForm.pageNum"
                    :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        keyword: '',
        dateType: '',
        publishTime: [],
        pageNum: 1,
        pageSize: 12
      },
      total: 0,
      comfirmDel: false,
      deleteList: [],
      taskList: []
    }
  },
  methods: {
    // 分页
    handleCurrentChange (page) {
      // this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = page
      this.getTaskList()
    },
    format (percentage) {
      return percentage
    },
    customColorMethod(percentage) {
      if (percentage < 30) {
        return '#ff0000';
      } else if (percentage < 70) {
        return '#e6a23c';
      } else {
        return '#67c23a';
      }
    },
    // 跳转详情页
    toAnalyse (biz) {
      this.$router.push({ name: 'WeekDetail', query: { id: biz } })
    },
    goDelete () {
      this.comfirmDel = true
    },
    // 取消删除
    cancelDelete () {
      this.comfirmDel = false
    },
    changeIsDel(item, index) {
      this.$set(this.taskList, index, item)
    },
    // 确认删除
    confirmDelete () {
      let ids = []
      let filterData = this.taskList.filter(item => item.conDel === true)
      if (filterData.length === 0) {
        this.$message.warning('请选择需要删除的数据！')
        return false
      }
      filterData.forEach((item) => {
        ids.push(item.id)
      })
      this.$http.post(this.$api.deleteTask, { ids: ids })
        .then(res => {
          ids.forEach((item) => {
            this.taskList.forEach((val, index) => {
              if (item === val.id) {
                this.taskList.splice(index, 1)
              }
            })
          })
          this.total = this.total - ids.length
          this.comfirmDel = false
          this.$message.success('删除成功！')
        }).catch(() => {})
    },
    // 筛选
    searchList () {
      this.handleCurrentChange(1)
    },
    // 重置
    resetForm () {
      this.ruleForm.keyword = ''
      this.ruleForm.publishTime = []
      this.handleCurrentChange(1)
    },
    // 获取任务列表
    getTaskList () {
      this.$http.post(this.$api.getTaskList, this.ruleForm)
        .then(res => {
          this.taskList = res.data.data.content
          this.taskList.forEach(item => {
            item.conDel = false
          })
          this.total = res.data.data.totalElements
        }).catch(() => {})
    }
  },
  created () {
    this.ruleForm.dateType = this.$route.query.type
    this.getTaskList()
  }
}
</script>
<style>
.main-list-box .el-progress__text {
  display: block;
}
.main-list-box .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #F56C6C;
  border-color: #F56C6C;
}
</style>
<style scoped>
.list-main {
  width: 100%;
  height: 100%;
}
.list-main-search {
  height: 40px;
}
.list-main-search .el-range-editor.el-input__inner{
  width: 230px;
}
.list-main-list {
  width: 100%;
  margin: 20px 0;
  min-height: 700px;
}
.list-main-list>p {
  text-align: center;
  line-height: 200px;
  color: #6B798E;
}
.main-list-box {
  width: 355px;
  height: 145px;
  margin: 10px;
  padding: 20px;
  float: left;
  position: relative;
  box-sizing: border-box;
  border: 1px solid #E4E7EA;
}
.list-main-list .is-todelete {
  border-color: #3B81FE;
}
.main-list-del {
  width: 0;
  height: 0;
  border-top: 40px solid #3B81FE;
  border-left: 40px solid transparent;
  position: absolute;
  top: 0;
  right: 0;
}
.main-list-box .el-checkbox-group {
  width: 15px;
  float: right;
  position: absolute;
  top: 3px;
  right: 3px;
}
.main-list-up>img {
  widows: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 10px;
}
.main-list-name p:nth-child(1) {
  font-size: 16px;
  color: #151C29;
}
.main-list-name p:nth-child(2) {
  color: #6B798E;
}
.main-list-time {
  margin-top: 10px;
  margin-left: 10px;
}
.main-list-time p {
  color: #ADAEB2;
}
.main-list-time p span {
  color: #151C29;
}
</style>