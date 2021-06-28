<!--
 * @Author: zhangjuan
 * @Date: 2021-04-29 15:15:06
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-05-13 16:35:29
-->
<template>
  <div>
    <div class="tabs-header">
      <span class="tabs-title">趋势查询</span>
    </div>
    <div class="add-main flex-cloumn-cen">
      <img src="@/assets/images/monitor/trend.png" alt="">
      <div class="add-main-center">
        <div class="add-task-search flex-ali-center">
          <p>关键词趋势查询</p>
          <el-input size="small"
                    v-model="queryText"
                    maxlength="6"
                    :show-word-limit="true"
                    placeholder="请输入关键词"></el-input>
          <el-button size="small" type="primary" @click="submitSearch">搜索</el-button>
        </div>
        <div class="add-main-record">
          <p v-if="record.length > 0">搜索记录：</p>
          <p>
            <span v-for="(item, index) of record" :key="index"
                  @click="clickRecord(item)"
                  class="cursor">{{item}}</span>
          </p>
          <p v-if="record.length > 0" @click="deleteRecord">
            <i class="el-icon-delete"></i>删除记录</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      queryText: '',
      record: [] // 搜索历史
    }
  },
  methods: {
    // 点击搜索记录
    clickRecord (name) {
      this.queryText = name
    },
    // 搜索账号列表
    submitSearch () {
      if (this.queryText.trim()) {
        this.$router.push({ name: 'TrendDetail', query: { keyword: this.queryText } })
      } else {
        this.queryText = ''
        this.$message.warning('请输入搜索内容')
      }
    },
    // 获取搜索记录
    getRecord () {
      this.$http.get(this.$api.getSearchRecord)
        .then(res => {
          this.record = res.data.data
        }).catch(() => {})
    },
    // 添加搜索记录
    addRecord () {
      this.$http.post(this.$api.searchRecord, { nickname: this.queryText })
        .then(res => {}).catch(() => {})
    },
    // 删除搜索记录
    deleteRecord () {
      this.$http.get(this.$api.deleteRecord)
        .then(res => {
          this.record = []
          this.$message.success('删除记录成功！')
        }).catch(() => {})
    },
    listenerSubmit (e) {
      if (e.keyCode === 13) {
        this.submitSearch()
      }
    }
  },
  created () {
    // this.getRecord()
  },
  mounted () {
    window.addEventListener('keydown', this.listenerSubmit)
  },
  destroyed () {
    window.removeEventListener('keydown', this.listenerSubmit, false)
  }
}
</script>
<style>
.add-task-search .el-input--small .el-input__inner {
  height: 40px;
  line-height: 40px;
}
.add-task-search .el-input--small {
  font-size: 14px;
}
.add-task-search .el-button {
  width: 90px;
  height: 40px;
  font-size: 16px;
}
</style>
<style scoped>
.add-main {
  margin: 20px;
}
.add-main img {
  margin: 30px;
}
.add-task-search p {
  width: 120px;
  font-size: 16px;
  color: #151C29;
}
.add-task-search .el-input {
  width: 377px;
  height: 40px;
  margin-right: 10px;
}
.add-main-record {
  width: 380px;
  margin: 8px auto;
}
.add-main-record p {
  float: left;
}
.add-main-record p:nth-child(1) {
  color: #151C29;
}
.add-main-record p:nth-child(2) {
  width: 240px;
  color: #7C889B;
}
.add-main-record p:nth-child(2) span {
  float: left;
  padding-right: 12px;
}
.add-main-record p:nth-child(3) {
  color: #7C889B;
  cursor: pointer;
}
</style>
