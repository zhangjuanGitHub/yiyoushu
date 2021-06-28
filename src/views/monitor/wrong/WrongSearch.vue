<!--
 * @Author: zhangjuan
 * @Date: 2021-05-06 14:33:45
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-05-06 15:22:49
-->
<template>
  <div>
<!--    <div class="tabs-header">-->
<!--      <span class="tabs-title">账号违规监测</span>-->
<!--    </div>-->
    <div class="add-main flex-cloumn-cen">
      <img src="@/assets/images/monitor/analyse.png" alt="">
      <div class="add-main-center">
        <div class="add-task-search flex-ali-center">
          <p>账户名称</p>
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
    </div>
    <div class="add-main-list list-box">
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
              v-if="addList.length > 0 && JSON.stringify(selectItem) === '{}'"></set-page>
    <div v-if="this.selectItem.id">
      <div class="time-box">
        <p class="font-16">时间范围</p>
        <div>
          <el-radio v-model="radio" label="1">7天</el-radio>
          <el-radio v-model="radio" label="2">30天</el-radio>
        </div>
        <div>
          <el-date-picker
            v-model="time"
            type="daterange"
            size="small"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            @change="changeDate"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div class="wrong-btn">
        <el-button size="large" type="primary"
                   v-if="addList.length > 0"
                   @click="startAnalyse">开始分析</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { timeFormat } from '@/lib/tools'
export default {
  data () {
    return {
      time: [], // 时间范围
      radio: '', // 时间单选
      total: {
        total: 0
      },
      params: { // 开始监测参数
        publishTime: [],
        biz: ''
      },
      pickerOptions: {
        // 设置不能选择的日期
        onPick: ({ maxDate, minDate }) => {
          this.choiceDate0 = minDate.getTime()
          if (maxDate) {
            this.choiceDate0 = ''
          }
        },
        disabledDate: (time) => {
          let choiceDateTime = new Date(this.choiceDate0).getTime()
          const minTime = new Date(choiceDateTime).setMonth(new Date(choiceDateTime).getMonth() - 6)
          const maxTime = new Date(choiceDateTime).setMonth(new Date(choiceDateTime).getMonth() + 6)
          const min = minTime
          const newDate = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
          const max = newDate < maxTime ? newDate : maxTime
          // 如果已经选中一个日期 则 返回 该日期前后一个月时间可选
          if (this.choiceDate0) {
            return time.getTime() < min || time.getTime() > max
          }// 若一个日期也没选中 则 返回 当前日期以前日期可选
          return time.getTime() > newDate
        }
      },
      addList: [],
      pageBean: {
        pageNum: 1,
        pageSize: 10
      },
      queryText: '',
      record: [], // 搜索历史
      cycle: [],
      selectItem: {} // 选择的账号
    }
  },
  watch: {
    radio (newValue, oldValue) {
      console.log(newValue)
      console.log(timeFormat(this.calcDate(newValue === '1' ? 7 : 30)))
      console.log(timeFormat(this.calcDate(1)))
      // 自定义时间changeDate筛选触发，radio= '' 不让清空右侧值，不然自定义时间赋值不上
      if (newValue) {
        this.time = [] // 清空右侧 自定义时间
      }
      this.params.publishTime[0] = timeFormat(this.calcDate(newValue === '1' ? 7 : 30))
      this.params.publishTime[1] = timeFormat(this.calcDate(1))
      // this.calcDate(1)
      // this.calcDate(newValue === '1' ? 7 : 30)
    }
  },
  methods: {
    // 时间选择后 清除单选
    changeDate () {
      this.radio = ''
    },
    calcDate (num) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * num)
      return date
    },
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
    // 开始分析
    startAnalyse () {
      console.log(this.params.publishTime.length)
      console.log(this.time.length)
      if (this.params.publishTime.length !== 0 || this.time.length !== 0) {
        if (this.time.length !== 0) {
          this.params.publishTime = this.time
        }
        console.log(11111)
      } else {
        this.$message.warning('请选择时间范围')
        return
      }
      this.$http.post(this.$api.addIllegalAccount, this.params)
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success('添加成功')
            this.$emit('changeTab', 'list')
          }
        }).catch(() => {
        })
    },
    // 选中
    selectAccount (item, index) {
      this.addList.forEach(i => {
        i.isSelected = false
      })
      item.isSelected = true
      this.$set(this.addList, index, item)
      this.params.biz = item.biz
      this.selectItem = item
    },
    searchQuery () {
      let obj = {
        queryText: this.queryText,
        pageBean: {
          pageSize: this.pageBean.pageSize,
          pageNum: (this.pageBean.pageNum - 1) * this.pageBean.pageSize + 1
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
      if (this.queryText) {
        this.addRecord()
        this.$refs.child ? this.$refs.child.handleCurrentChange(1) : this.searchQuery()
      } else {
        this.$message.warning('请输入搜索内容')
      }
      // this.record.push(this.queryText)
    },
    // 获取搜索记录
    getRecord () {
      this.$http.get(this.$api.findQueryLogList)
        .then(res => {
          this.record = res.data.data
        }).catch(() => {})
    },
    // 添加搜索记录
    addRecord () {
      this.$http.post(this.$api.addQueryLog, { nickname: this.queryText })
        .then(res => {}).catch(() => {})
    },
    // 删除搜索记录
    deleteRecord () {
      this.$http.get(this.$api.delQueryLog)
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
    this.getRecord()
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
  margin:  20px auto 0;
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
