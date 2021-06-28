<!--
 * @Author: MaiChao
 * @Date: 2021-02-07 15:31:16
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-06-01 14:14:48
 * 时间参数修改为type ， 时间类别， 1   一周    2 一个月， 3 半年， 4 ，一年
-->
<template>
  <div class="interaction content-box">
    <div class="tabs-header">
      <!-- <span class="tabs-title"
            @click="tabsAll('Interaction')"
            :class="this.$route.name==='Interaction'?'isActive':''">微信</span> -->
      <!-- <span class="tabs-title"
            @click="tabsAll('')">微博</span> -->
      <span class="tabs-title"
            :class="activeTab==='wx'?'isActive':''"
            @click="tabsAll('wx', 1)">微信</span>
      <span class="tabs-title"
            :class="activeTab==='wb'?'isActive':''"
            @click="tabsAll('wb', 2)">微博</span>

    </div>
    <div>
      <interaction-wx v-if="this.activeTab==='wx'"
                       @changeTab="tabsAll"></interaction-wx>
      <interaction-wb v-if="this.activeTab==='wb'"></interaction-wb>
    </div>
  </div>
</template>
<script>
import interactionWx from './InteractionWx'
import interactionWb from './InteractionWb'
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
  components: {
    interactionWx,
    interactionWb
  },
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
    if (this.$route.query.tab) {
      this.activeTab = this.$route.query.tab
    }
    // this.getTableData()
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
      // this.getTableData()
      // this.drawLine()
      if (this.activeTab === 'wx') {
        this.getTableData()
      } else {
        this.getTableDataWb()
      }
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
    // 获取表格信息 微博
    getTableDataWb () {
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
      // this.activeTab = name
      // this.ruleForm.pageSize = 10
      // this.ruleForm.pageNum = 1
      // this.$refs.child.handleCurrentChange(1)

      this.$router.replace({ name: 'Interaction', query: { tab: name } })
      this.activeTab = name
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
  height: 60px;
  width: 60px;
  margin-right: 20px;
}
</style>
