<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-03-05 10:06:51
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-05-26 18:14:34
-->
<template>
  <div class="interaction content-box">
    <div class="tabs-header">
      <span class="tabs-title"
            @click="tabsAll('createTask', 1)"
            :class="this.activeTab==='createTask'?'isActive':''">创建任务</span>
      <span class="tabs-title"
            @click="tabsAll('taskList', 2)"
            :class="this.activeTab==='taskList'?'isActive':''">任务列表</span>
    </div>
    <div class="pub-monitor-main">
      <blogger-add v-if="this.activeTab==='createTask'"
                       @changeTab="tabsAll"></blogger-add>
      <blogger-list v-if="this.activeTab==='taskList'"></blogger-list>
    </div>

  </div>
</template>
<script>
import bloggerAdd from './BloggerAdd'
import bloggerList from './BloggerList'
export default {
  components: {
    bloggerAdd,
    bloggerList
  },
  data () {
    return {
      activeTab: 'createTask'
    }
  },
  methods: {
    // 分页
    // pagingChange (query) {
    //   this.pageBean.pageSort.pageSize = query.size
    //   this.pageBean.pageSort.pageNum = query.page
    //   this.getAccountList()
    // },
    // tab
    tabsAll (name, level) {
      console.log(name)
      // if (this.warningMessage !== null) {
      //   this.warningMessage.close()
      // }
      // this.tableData = []
      // this.activeTab = name
      // this.pageBean.level = level
      // this.$refs.search.resetForm()

      this.$router.replace({ name: 'BloggerAnalysis', query: { tab: name } })
      this.activeTab = name
    }
  },
  created () {
    if (this.$route.query.tab) {
      this.activeTab = this.$route.query.tab
    }
  },
  mounted () {
    window.addEventListener('keydown', this.listenerSubmit)
  },
  destroyed () {
    window.removeEventListener('keydown', this.listenerSubmit, false)
  }
}
</script>
<style lang="scss" scoped>
@import '../monitor.css';
.interaction {
  margin-bottom: 20px;
}

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
.add-main > .el-button {
  width: 225px;
  height: 50px;
  font-size: 16px;
  margin: 30px 0 80px;
}

.add-main {
  margin: 20px;
}
.add-task-search p {
  width: 90px;
  font-size: 16px;
}
.list-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.time-box {
  width: 580px;
  margin: 20px auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-date-editor {
  width: 355px;
  margin-left: 20px;
}
.wrong-btn {
  text-align: center;
  margin-top: 20px;
}
.add-task-search .el-input {
  width: 377px;
  height: 40px;
  // margin-right: 10px;
}
.add-main-record {
  width: 380px;
  // margin: 8px auto;
  margin-top: 16px;
}
.add-main-record p {
  float: left;
}
.add-main-record p:nth-child(1) {
  color: #151c29;
}
.add-main-record p:nth-child(2) {
  width: 240px;
  color: #7c889b;
}
.add-main-record p:nth-child(2) span {
  float: left;
  padding-right: 12px;
}
.add-main-record p:nth-child(3) {
  color: #7c889b;
  cursor: pointer;
}
.add-list-box {
  width: 483px;
  height: 110px;
  background: #f7f8fa;
  margin-top: 15px;
  margin-left: 15px;
  float: left;
  padding: 20px;
  border: 1px solid #f7f8fa;
  box-sizing: border-box;
}
.add-main-list .is_select_box {
  border-color: #f79406;
}
.add-list-box > img {
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-right: 10px;
}
.add-list-msg {
  flex: 1;
}
.add-list-msg > p,
.add-dialog-pp {
  color: #6b798e;
  margin-top: 5px;
}
.add-list-name p {
  color: #151c29;
}
.add-list-name p:nth-child(1) {
  font-size: 16px;
}
.add-list-select {
  padding: 2px 18px;
  color: #adaeb2;
  border: 1px solid #e1e4e8;
  cursor: pointer;
}
.add-list-msg .is_select_act {
  color: #f79406;
  border-color: #f79406;
}
.add-list-dialog i {
  color: #67c23a;
  font-size: 60px;
  height: 60px;
}
.add-dialog-ss {
  font-size: 24px;
  font-weight: bold;
  color: #151c29;
  margin-bottom: 20px;
}
.add-dialog-pp span {
  color: #3b81fe;
  cursor: pointer;
}

.title {
  font-size: 20px;
  text-align: center;
  margin-bottom:20px;
  margin-top:20px;
  /* font-weight: 550; */
}
.radio{
  text-align: center;
}
.radio1{
  margin-right : 80px;

  margin-bottom :20px
}
.tips{
  text-align: center;
  margin:10px 0 10px 0
}
</style>

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
    height: 200px;
    margin: 10px;
    padding: 10px;
    float: left;
    position: relative;
    box-sizing: border-box;
    border: 1px solid #E4E7EA;
    border-radius: 10px;

    cursor: pointer;
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
  .main-list-time .main-list-time2{
    margin-top: 10px;
    margin-left: 10px;
  }
  .main-list-time2{
    margin-bottom:10px
  }
   .main-list-time2 p{
    margin-bottom:5px
  }
  .main-list-time2-span{
    color: chocolate;
  }
  .main-list-time p {
    color: #ADAEB2;
  }
  .main-list-time p span {
    color: #151C29;
  }
  .list-main{
    padding: 20px;
  }
  .top_all{
    padding:0 0 10px 0 ;
    border-bottom: 1px solid #E4E7EA;
    margin-bottom:10px
  }
</style>
