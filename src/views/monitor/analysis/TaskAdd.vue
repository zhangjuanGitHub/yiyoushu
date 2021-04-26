<template>
  <div class="add-main flex-cloumn-cen">
    <img src="@/assets/images/monitor/analyse.png" alt="">
    <div class="add-main-center">
      <div class="add-task-search flex-ali-center">
        <p>账号名称筛选</p>
        <el-input size="small"
                  v-model="queryText"
                  placeholder="请输入公众号名称"></el-input>
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
    <div class="add-main-list">
      <div class="add-list-box flex-ali-center"
           v-for="(item, index) of addList" :key="index"
           :class="{'is_select_box': item.isSelected }">
        <img :src="item.ori_head_img" alt="">
        <div class="add-list-msg">
          <div class="flex-bwt-center">
            <div class="add-list-name">
              <p v-html="item.nickname"></p>
              <p v-if="item.city">地区：<span>{{item.city}}</span></p>
            </div>
            <p class="add-list-select"
               :class="{'is_select_act': item.isSelected }"
               @click="selectAccount(item, index)">选择</p>
          </div>
          <p v-html="item.introduction" class="lin-clamp-1"></p>
        </div>
      </div>
    </div>
    <set-page @pagingChange="pagingChange"
              :total="total.total" ref="child"
              v-if="addList.length > 0"></set-page>
    <el-button size="large" type="primary"
               v-if="addList.length > 0"
               @click="startAnalyse">开始分析</el-button>
    <!-- 提示 -->
    <el-dialog :visible.sync="tipVisible"
               :modal-append-to-body="false"
               center
               @close="cancelSearch"
               width="37%">
      <div class="add-list-dialog flex-cloumn-all">
        <i class="el-icon-success"></i>
        <p class="add-dialog-ss">操作成功，开始诊断</p>
        <p class="add-dialog-pp">正在诊断中，本次诊断预计耗时10-15分钟，您可以在<span @click="toTab">【任务列表】</span>中查看详情</p>
      </div>
      <div slot="footer">
        <el-button type="success" @click="cancelSearch">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { timeFormat } from '@/lib/tools'
export default {
  data () {
    return {
      tipVisible: false,
      total: {
        total: 0
      },
      addList: [],
      pageBean: {
        pageNum: 1,
        pageSize: 10
      },
      queryText: '',
      record: [], // 搜索历史
      type: '',
      cycle: [],
      selectItem: {} // 选择的账号
    }
  },
  methods: {
    // 分页
    pagingChange (query) {
      this.pageBean.pageSize = query.size
      this.pageBean.pageNum = query.page
      this.searchQuery()
    },
    // 点击搜索记录
    clickRecord (name) {
      this.queryText = name
      this.$refs.child ? this.$refs.child.handleCurrentChange(1) : this.searchQuery()
    },
    // 取消弹框
    cancelSearch () {
      this.queryText = ''
      this.addList = []
      this.tipVisible = false
      this.getRecord()
    },
    // 开始分析
    startAnalyse () {
      let obj = {
        biz: this.selectItem.biz,
        username: this.selectItem.alias,
        nickname: this.selectItem.nickname,
        hdHeadImg: this.selectItem.hd_head_img,
        province: this.selectItem.province,
        startDate: this.cycle[0],
        endDate: this.cycle[1],
        dateType: this.type
      }
      this.$http.post(this.$api.addOneAnalyse, obj)
        .then(res => {
          if (res.data.message === '已存在' && res.data.code === 200) {
            let str = this.type === '1' ? '您已添加过该账号进行周分析了' : '您已添加过该账号进行月分析了'
            this.$message.warning(str)
          } else {
            this.tipVisible = true
          }
        }).catch(() => {})
    },
    toTab () {
      this.tipVisible = false
      this.$emit('changeTab', 'list')
    },
    // 选中
    selectAccount (item, index) {
      this.addList.forEach(i => {
        i.isSelected = false
      })
      item.isSelected = true
      this.$set(this.addList, index, item)
      this.selectItem = item
    },
    searchQuery () {
      let obj = {
        queryText: this.queryText,
        pageBean: {
          pageSize: this.pageBean.pageSize,
          pageNum: (this.pageBean.pageNum - 1 ) * this.pageBean.pageSize + 1
        },
        range: 1
      }
      this.$http.post(this.$api.wxSearch, obj)
        .then(res => {
          if (res.data.data.length > 1) {
            this.total = res.data.data.shift()
            this.addList = res.data.data
            this.addList.forEach(item => {
              item.isSelected = false
            })
          }
        }).catch(() => {})
    },
    // 搜索账号列表
    submitSearch () {
      this.addRecord()
      this.$refs.child ? this.$refs.child.handleCurrentChange(1) : this.searchQuery()
      // this.record.push(this.queryText)
      
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
    calcDate (num) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * num)
      return date
    },
    // 计算周期
    calcCycle () {
      let end = this.calcDate(1)
      let start = this.calcDate(this.type === '1' ? 7 : 30 )
      this.cycle[0] = timeFormat(start)
      this.cycle[1] = timeFormat(end)
    },
    listenerSubmit (e) {
      if (e.keyCode === 13) {
        this.submitSearch()
      }
    }
  },
  created () {
    this.type = this.$route.query.type
    this.getRecord()
    this.calcCycle()
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
.add-main>.el-button {
  width: 225px;
  height: 50px;
  font-size: 16px;
  margin: 30px 0 80px;
}
</style>
<style scoped>
.add-main {
  width: 100%;
}
.add-task-search p {
  width: 110px;
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
.add-main-list {
  margin: 20px 0;
  width: 1000px;
}
.add-list-box {
  width: 483px;
  height: 110px;
  background: #F7F8FA;
  margin-top: 15px;
  margin-left: 15px;
  float: left;
  padding: 20px;
  border: 1px solid #F7F8FA;
  box-sizing: border-box;
}
.add-main-list .is_select_box {
  border-color: #F79406;
}
.add-list-box>img {
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-right: 10px;
}
.add-list-msg {
  flex: 1;
}
.add-list-msg>p, .add-dialog-pp {
  color: #6B798E;
  margin-top: 5px;
}
.add-list-name p {
  color: #151C29;
}
.add-list-name p:nth-child(1) {
  font-size: 16px;
}
.add-list-select {
  padding: 2px 18px;
  color: #ADAEB2;
  border: 1px solid #E1E4E8;
  cursor: pointer;
}
.add-list-msg .is_select_act {
  color: #F79406;
  border-color: #F79406;
}
.add-list-dialog i {
  color: #67C23A;
  font-size: 60px;
  height: 60px;
}
.add-dialog-ss{
  font-size: 24px;
  font-weight: bold;
  color: #151C29;
  margin-bottom: 20px;
}
.add-dialog-pp span {
  color: #3B81FE;
  cursor: pointer;
}
</style>