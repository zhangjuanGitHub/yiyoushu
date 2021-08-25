<!--
 * @Author: MaiChao
 * @Date: 2021-03-15 16:16:36
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-07-19 15:02:28
-->
<template>
  <div class="contents">
    <div class="official account-box">
      <div class="tabs-header">
        <span class="tabs-title"
              @click="tabsAll('wx', 1)"
              :class="this.activeTab==='wx'?'isActive':''">微信榜单</span>
        <span class="tabs-title"
              @click="tabsAll('wb', 2)"
              :class="this.activeTab==='wb'?'isActive':''">微博榜单</span>
              <span class="tabs-title"
              @click="tabsAll('toutiao', 3)"
              :class="this.activeTab==='toutiao'?'isActive':''">头条榜单</span>
        <span class="right-btn cursor"
              @click="openCust"><i class="el-icon-s-data"></i>自定义榜单</span>
      </div>
      <div class="conts-box">
        <official-article-wx v-if="this.activeTab==='wx'" @changeTab="tabsAll"></official-article-wx>
        <official-article-wb v-if="this.activeTab==='wb'" @changeTab="tabsAll"></official-article-wb>
        <official-article-toutiao v-if="this.activeTab==='toutiao'" @changeTab="tabsAll"></official-article-toutiao>
      </div>
    </div>
  </div>
</template>
<script>
import officialArticleWx from './OfficialArticleWx'
import officialArticleWb from './OfficialArticleWb'
import officialArticleToutiao from './OfficialArticleToutiao'
import { exportTable } from '@/lib/tools'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  components: {
    officialArticleWx,
    officialArticleWb,
    officialArticleToutiao
  },
  data () {
    return {
      fileName: '最近一天微信文章排行榜', // 导出名称
      fileName2: '最近一天微博文章排行榜',
      limitCount: '', // 限制个数
      dataShow: false,
      pageShow: false, // 页面条数限制
      data1: [{
        name: '自治区人民检察院1',
        account: 'renmenjianchayuan'
      }],
      data2: [{
        name: '自治区人民检察院2',
        account: 'renmenjianchayuan'
      }],
      searchDetail: '',
      textarea: '',
      remarks: '',
      activeName: 'first',
      dialogVisible: false,
      addApply: false,
      activeTab: 'wx',
      options: [],
      ruleForm: {
        types: '2',
        dateType: 1, // 时间
        districts: [], // 地区
        position: '', // 位置
        pageNum: 1,
        pageSize: 10
      },
      tableData: []
    }
  },
  created () {
    console.log(this.$route.query)
    if (this.$route.query.active) {
      this.activeTab = this.$route.query.active
    }
    // this.rankType()
    // this.geListData()
  },
  methods: {
    // 切换导出名称
    tabsTitle () {
      switch (this.ruleForm.dateType) {
        case 1:
          this.fileName = '最近一天微信文章排行榜'
          break
        case 2:
          this.fileName = '最近一周微信文章排行榜'
          break
        case 3:
          this.fileName = '最近一月微信文章排行榜'
          break
      }
    },
    // 加载更多
    loadMore () {
      this.ruleForm.pageNum++
      this.geListData()
    },
    // 初始化表格
    restTable () {
      this.tableData = []
      this.ruleForm.pageNum = 1
      this.geListData()
    },
    // 获取地区数据
    rankType () {
      this.$http.get(this.$api.rankArea)
        .then(res => {
          if (res.data.code === 200) {
            this.options = res.data.data
          }
        })
        .catch(() => { })
    },
    // 获取表格数据
    geListData () {
      this.$http.post(this.$api.ZFWechat, this.ruleForm)
        .then(res => {
          if (res.data.data.list.length > 0) {
            this.tableData.push(...res.data.data.list)
            this.limitCount = res.data.data.limitCount
            if (res.data.data.list.length < 10) {
              this.dataShow = false
            } else {
              this.dataShow = true
            }
            if (this.limitCount === 0) {
              this.pageShow = false
            } else {
              if (this.tableData.length >= this.limitCount) {
                this.pageShow = true
              } else {
                this.pageShow = false
              }
            }
          } else {
            this.dataShow = false
          }
        })
        .catch(() => { })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 微信/微博
    tabsAll (name, level) {
      this.$router.replace({ name: 'OfficialArticle', query: { tab: name } })
      this.activeTab = name
    },
    // 自定义榜单
    openCust () {
      this.$router.push({ name: 'Customize' })
    },
    // 筛选
    searchList () {
      this.restTable()
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.restTable()
    },
    // 导出
    exportBox () {
      var table = XLSX.utils.table_to_book(document.querySelector('#wx-monitor'))
      exportTable(XLSX, FileSaver, table, this.fileName)
    },
    // 说明
    openOther (type) {
      let url = type === '1' ? 'Official' : type === '2' ? 'OfficialArticle' : 'OfficialVideo'
      this.$router.push({ name: url })
    },
    // 打开外部页面
    openWeb (row) {
      window.open(row.url, '_black')
    }
  }
}
</script>
<style scoped lang="scss">
@import '../assess.css';
</style>
<style lang="scss" scoped>
.right-btn {
  color: #498bfe;
  float: right;
}
.right-btn i {
  margin-right: 5px;
  font-size: 18px;
}
.title-time {
  color: #252934;
  font-size: 22px;
  font-weight: 400;
  line-height: 55px;
}
.flex-ali-center {
  margin-bottom: 20px;
}
.el-radio-button {
  margin-right: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 0px;
}
.el-radio-button:last-child {
  margin: 0px;
}
.explain-box .el-button {
  width: 212px;
}
.from-box {
  margin: 20px 0;
}
.from-box .el-form-item {
  margin-right: 35px;
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
.operate {
  font-size: 22px;
}
.addto {
  color: #f89408;
}
.search-box {
  text-align: center;
  margin: 30px 0;
}
.search-box .el-input {
  width: 470px;
  margin-right: 15px;
}
.show-box {
  width: 470px;
  border: 1px solid #e1e4e8;
}
.top-line {
  background-color: #f7f8fa;
}
.name-box {
  color: #3b82fe;
  border-bottom: 1px solid #e1e4e8;
}
.content-box {
  min-height: 182px;
}
.alone:hover {
  background-color: #f7f8fa;
}
.tip-span {
  color: red;
}
.success {
  color: #0ad80a;
}
</style>
