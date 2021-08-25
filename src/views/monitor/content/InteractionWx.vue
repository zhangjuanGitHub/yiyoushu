<!--
 * @Author: MaiChao
 * @Date: 2021-02-07 15:31:16
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-08-03 11:49:15
 * 时间参数修改为type ， 时间类别， 1   一周    2 一个月， 3 半年， 4 ，一年
-->
<template>
  <div>
    <div class="wx-warp-box">
      <el-form :inline="true"
               ref="ruleForm"
               :model="ruleForm">
        <el-form-item class="publishTime"
                      label="时间"
                      prop="publishTime">
          <!-- <el-date-picker v-model="ruleForm.publishTime"
                          size="small"
                          type="daterange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          value-format="yyyy-MM-dd"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker> -->
          <el-select v-model="ruleForm.type"
                     placeholder="请选择"
                     size="small">
            <el-option label="一周"
                       :value="1"></el-option>
            <el-option label="一月"
                       :value="2"></el-option>
            <el-option label="半年"
                       :value="3"></el-option>
            <el-option label="一年"
                       :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="keyword"
                      label="关键字">
          <el-input size="small"
                    v-model="ruleForm.keyword"
                    placeholder="请输入关键字"
                    class="search_key"></el-input>
        </el-form-item>
        <el-form-item label="排序"
                      prop="optionSort">
          <el-cascader v-model="ruleForm.optionSort"
                       :options="wxOptions"
                       size="small"></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button size="small"
                     @click="searchList"
                     type="primary"
                     class="search_query">查询</el-button>
          <el-button size="small"
                     @click="resetForm('ruleForm')"
                     class="search_reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="wx-warp-content">
      <!-- <div class="line-box">
        <div class="title">折线图走势</div>
        <div id="line-charts"></div>
      </div> -->
      <!-- <div class="interaction-table">
        <el-table :data="tableData"
                  style="width: 100%"
                  border
                  :cell-style="{ textAlign: 'center' }"
                  :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column prop="nickname"
                           label="账号信息"
                           width="350">
            <template slot-scope='scope'>
              <div class="account-infor flex-ali-center">
                <img :src="scope.row.hd_head_img"
                     alt="">
                <div class="account-name">
                  <p class="import-name"
                     v-html='scope.row.nickname'></p>
                  <p>{{scope.row.alias}}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="articleNum"
                           label="文章总数"
                           sortable
                           width="200">
          </el-table-column>
          <el-table-column prop="articleCountNum"
                           label="互动性"
                           width="200">
          </el-table-column>
          <el-table-column prop="last_pubtime"
                           label="截止时间">
          </el-table-column>
        </el-table>
        <set-page @pagingChange="pagingChange"
                  :total="total"
                  ref="child"></set-page>
      </div> -->
      <div class="interaction-table">
        <el-table :data="tableData"
                  style="width: 100%"
                  border
                  :cell-style="{ textAlign: 'center' }"
                  :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column prop="nickname"
                           label="公众号">
            <template slot-scope='scope'>
              <div class="account-infor flex-ali-center">
                <img :src="scope.row.hd_head_img"
                     alt="">
                <div class="account-name">
                  <p class="import-name"
                     v-html='scope.row.nickname'></p>
                  <p>{{scope.row.alias}}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="articleSum"
                           label="文章总数"
                           width="180">
          </el-table-column>
          <el-table-column prop="readSum"
                           label="阅读总数"
                           width="135">
          </el-table-column>
          <el-table-column prop="oldLikeSum"
                           label="点赞总数"
                           width="135">
          </el-table-column>
          <el-table-column prop="likeSum"
                           label="在看总数"
                           width="135">
          </el-table-column>
          <el-table-column prop="commentSum"
                           label="评论总数"
                           width="135">
          </el-table-column>
          <el-table-column prop="interactivityNum"
                           label="互动指数"
                           width="135">
            <template slot="header">
              <el-tooltip class="item cursor"
                          effect="dark"
                          content="互动指数解析"
                          placement="top">
                <div class="picture-num">互动指数<i class="el-icon-question"></i></div>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <div>{{scope.row.interactivityNum}}</div>
            </template>
          </el-table-column>
        </el-table>
        <set-page @pagingChange="pagingChange"
                  :total="total"
                  ref="child"></set-page>
      </div>
    </div>
  </div>
</template>
<script>
// import echarts from 'echarts'
const getSort = new Map()
  .set('interUp', 'asc')
  .set('interDo', 'desc') // 互动指数
  .set('readUp', 'asc')
  .set('readDo', 'desc') // 阅读数
  .set('oldLikeUp', 'asc')
  .set('oldLikeDo', 'desc') // 点赞数
  .set('likeUp', 'asc')
  .set('likeDo', 'desc') // 在看数
  .set('articleUp', 'asc')
  .set('articleDo', 'desc') // 文章
export default {
  data () {
    return {
      activeTab: 'wx',
      total: 0,
      ruleForm: {
        type: 1,
        keyword: '',
        pageSize: 10,
        pageNum: 1,
        optionSort: ['interactivityNum', 'interDo'],
        sortDirection: 'desc', // 排序顺序 asc 或者desc
        sortField: 'interactivityNum' // 排序方式 文章数articleSum，阅读数readSum，再看数LikeSum ，点赞数oldLikeSum 互动指数，interactivityNum
      },
      wxOptions: [
        {
          value: 'interactivityNum',
          label: '互动指数',
          children: [{
            value: 'interUp',
            label: '正序'
          }, {
            value: 'interDo',
            label: '倒序'
          }]
        },
        {
          value: 'readSum',
          label: '阅读数',
          children: [{
            value: 'readUp',
            label: '正序'
          }, {
            value: 'readDo',
            label: '倒序'
          }]
        },
        {
          value: 'LikeSum',
          label: '在看数',
          children: [{
            value: 'likeUp',
            label: '正序'
          }, {
            value: 'likeDo',
            label: '倒序'
          }]
        },
        {
          value: 'articleSum',
          label: '文章数',
          children: [{
            value: 'articleUp',
            label: '正序'
          }, {
            value: 'articleDo',
            label: '倒序'
          }]
        },
        {
          value: 'oldLikeSum',
          label: '点赞数',
          children: [{
            value: 'oldLikeUp',
            label: '正序'
          }, {
            value: 'oldLikeDo',
            label: '倒序'
          }]
        }
      ],
      tableData: []
    }
  },
  created () {
    // console.log(this.$route.name)
    this.getTableData()
  },
  methods: {
    formatDate (now) {
      var year = now.getFullYear() + '-'
      var month = (now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1) + '-'
      var d = (now.getDate() < 10 ? '0' + now.getDate() : now.getDate())
      return year + month + d
    },
    // 分页
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
      this.getTableData()
      // this.drawLine()
    },
    // 获取表格信息
    getTableData () {
      this.ruleForm.sortDirection = getSort.get(this.ruleForm.optionSort[1])
      this.ruleForm.sortField = this.ruleForm.optionSort[0]
      this.$http.post(this.$api.findInteractivityList, this.ruleForm)
        .then(res => {
          this.tableData = res.data.data.data
          this.total = parseInt(res.data.data.count)
        }).catch(() => { })
    },
    searchList () {
      this.ruleForm.pageSize = 10
      this.ruleForm.pageNum = 1
      this.$refs.child.handleCurrentChange(1)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.ruleForm.pageSize = 10
      this.ruleForm.pageNum = 1
      this.$refs.child.handleCurrentChange(1)
    },
    tabsAll (name) {
      // this.$router.push({ name: name })
      this.activeTab = name
      this.ruleForm.pageSize = 10
      this.ruleForm.pageNum = 1
      this.$refs.child.handleCurrentChange(1)
    }
    // 跳转详情页面
    // openInvolved (row) {
    //   console.log(row)
    //   this.$router.push({ name: 'RelevantDetail' })
    // }
  }
}
</script>
<style>
@import '../monitor.css';
</style>
<style lang="scss" scoped>
.wx-warp-box {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 20px 30px;
}
.import-name {
  text-align: left;
}
.wx-warp-content {
  padding: 0 20px;
}
#line-charts {
  height: 300px;
}
.account-infor {
  width: 200px;
  margin: 0 auto;
}
.account-infor img {
  height: 46px;
  width: 46px;
  margin-right: 8px;
  border-radius: 50%;
}
</style>
