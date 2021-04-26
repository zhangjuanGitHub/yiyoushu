<template>
  <div class="center-wraper">
    <div class="account-wraper flex-bwt">
      <div class="sens-left-box">
        <div class="nav-breadcrumb flex-ali-center">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'Prescription' }">内容检测</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'Sensitive' }">错敏监测</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'SensitiveAnalyse' }">账号分析</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="sens-left-main">
          <div class="sens-left-des flex-ali-center">
            <img src="@/assets/images/monitor/sens.png" alt="">
            <div class="sens-left-msg">
              <p>共监测 <span>{{errorCountNum}}</span> 个错敏字，涉及 <span>{{articleCountNum}}</span> 篇文章</p>
              <el-form :inline="true"
                      ref="ruleForm"
                      :model="ruleForm">
                <el-form-item label="时间"
                              prop="valueTime">
                  <el-select v-model="valueTime"
                            size="small"
                            @change="calcCycle"
                            class="pub-time-type">
                    <el-option label="七天内"
                              value="1"></el-option>
                    <el-option label="一个月内"
                              value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="level"
                              label="最高错敏级别">
                  <el-select v-model="ruleForm.level"
                            size="small"
                            class="pub-time-type">
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
                <el-form-item>
                  <el-button size="small"
                            @click="searchList"
                            type="primary">查询</el-button>
                  <el-button size="small"
                            @click="resetForm">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <el-table :data="accountList"
                    style="width: 100%">
            <el-table-column label="标题"
                             width="410">
              <template slot-scope="scope">
                <p class="cursor" @click="toArticle(scope.row.article_id)">{{scope.row.title}}</p>
              </template>
            </el-table-column>
            <el-table-column label="错敏字"
                              width="300">
              <template slot-scope="scope">
                <div v-for="(item, index) of scope.row.error_message" :key="'info1-'+index"
                    class="flex-all-center">
                  <p>" <span>{{item.error}}</span> "</p>
                  <p style="margin: 0 8px"> 改成 </p>
                  <p>" <span>{{item.tips}}</span> "</p>
                </div>
                <div v-for="(i, sIndex) of scope.row.er_slight_message" :key="'info2-'+sIndex"
                     class="flex-all-center">
                  <p> "<span>{{i.error}}</span>" </p>
                  <p style="margin: 0 8px"> 疑似有错 </p>
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
            <el-table-column prop="create_time"
                              width="160"
                              label="监测时间">
            </el-table-column>
          </el-table>
          <set-page @pagingChange="pagingChange"
                    :total="total" ref="child"></set-page>
        </div>
      </div>
      <div class="sens-right-box">
        <div id="myPie"></div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入折线图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
import { timeFormat } from '@/lib/tools'
export default {
  data () {
    return {
      valueTime: '',
      ruleForm: {
        publishTime: [],
        keyword: '',
        sortDirection: '',
        sortField: '',
        pageSize: 10,
        pageNum: 1,
        level: '',
        bizList: []
      },
      accountList: [],
      total: 0,
      articleCountNum: 0, // 文章总数
      errorCountNum: 0 // 错敏字总数
    }
  },
  methods: {
    // 分页
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
      this.getSensList()
    },
    toArticle (articleId) {
      this.$router.push({ name: 'SensitiveArticle', query: { articleId: articleId } })
    },
    drawPie () {
      this.$http.post(this.$api.getSensPie, { bizList: this.ruleForm.bizList })
        .then(res => {
          this.errorCountNum = res.data.data[0].errorCountNum
          this.articleCountNum = res.data.data[0].articleCountNum
          let pieArr = []
          let total = 0
          for (let i = 1; i <= 5; i++) {
            pieArr.push({ name: i+ '级', value: res.data.data[0]['errLevel' + i + 'CountNum'] })
            total = total + res.data.data[0]['errLevel' + i + 'CountNum']
          }
          let myPie = echarts.init(document.getElementById('myPie'))
          let color = ['#F55F53', '#FFA726', '#FFCA2B', '#66BB6A', '#42A5F4', '#5EB2F6']
          myPie.setOption({
            title: {
              text: '错敏字类别占比图',
              left: 'center',
              top: '20px'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b}: {d}%'
            },
            color: color,
            legend: {
              top: 'bottom',
              itemWidth: 5,
              itemHeight: 5
            },
            series: [
              {
                name: '错敏字类别',
                type: 'pie',
                radius: ['35%', '55%'],
                avoidLabelOverlap: false,
                label: {
                  show: true,
                  formatter: '{d}%'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '14'
                  }
                },
                data: pieArr
              }
            ]
          })
      }).catch(() => {})
    },
    // 筛选
    searchList () {
      this.$refs.child.handleCurrentChange(1)
    },
    // 重置
    resetForm () {
      this.valueTime = ''
      this.ruleForm.level = ''
      this.ruleForm.publishTime = []
      this.$refs.child.handleCurrentChange(1)
    },
    // 获取列表
    getSensList () {
      this.$http.post(this.$api.getSensitiveList, this.ruleForm)
        .then(res => {
          this.total =res.data.data.count
          this.accountList = res.data.data.list
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
      let start = this.calcDate(this.valueTime === '1' ? 7 : 30 )
      this.ruleForm.publishTime[0] = timeFormat(start)
      this.ruleForm.publishTime[1] = timeFormat(end)
    }
  },
  mounted () {
    this.drawPie()
  },
  created () {
    this.ruleForm.bizList.push(this.$route.query.id)
    this.getSensList()
  }
}
</script>
<style scoped>
.sens-left-box {
  width: 1010px;
  background: #ffffff;
}
.sens-right-box {
  width: 370px;
  height: 700px;
  background: #ffffff;
}
#myPie {
  width: 370px;
  height: 550px;
}
.sens-left-main {
  margin: 20px;
}
.sens-left-des {
  padding: 35px 0 35px 60px;
}
.sens-left-msg {
  margin-left: 30px;
}
.sens-left-msg p {
  color: #151C29;
  margin-bottom: 30px;
}
.sens-left-msg p span {
  font-size: 30px;
}
.pub-time-type {
  width: 120px;
}
</style>