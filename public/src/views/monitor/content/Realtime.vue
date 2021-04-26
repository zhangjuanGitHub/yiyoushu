<!--
 * @Author: MaiChao
 * @Date: 2021-02-07 15:31:16
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-19 16:37:28
-->
<template>
  <div class="real-time content-box">
    <div class="tabs-header isActive">
      <span class="tabs-title">文章传播计算</span>
    </div>
    <div class="wx-warp-box">
      <div class="search_form">
        <el-form :inline="true"
                 ref="ruleForm"
                 :model="ruleForm">
          <el-form-item class="btn-box flex-ali-center">
            <div style="margin-right:10px;">
              <el-button size="small"
                         @click="creadShow()"
                         type="success"
                         class="search_query">新建任务</el-button>
            </div>
            <div v-if="!deleteShow">
              <el-button size="small"
                        type="danger"
                         @click="deleteClick()"
                         class="search_reset">批量删除</el-button>
            </div>
            <div v-else>
              <el-button type="danger"
                         size="small"
                         :disabled="this.ids.length < 1"
                         @click="showDelete">确认删除</el-button>
              <el-button size="small"
                         @click="overDelete">取消删除</el-button>
            </div>

          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="wx-warp-content">
      <div class="article-list">
        <div class="article-box"
             v-for="item in this.articleData"
             :key="item.id">
          <div class="article-title"
               v-html="item.title" @click="openUrl(item)"></div>
          <div class="article lin-clamp-3"
               v-html="item.content" @click="openUrl(item)"></div>
          <div>
            <div class="time-line flex-bwt-center"
                v-if="item.crawlerStatus==-1">
              <span></span>
              <span class="outpush delete">{{item.errorMessage}}</span>
            </div>
            <div class="time-line flex-bwt-center"
                v-else-if="item.crawlerStatus==0">
              <span></span>
              <span class="outpush">等待计算</span>
            </div>
            <div class="time-line flex-bwt-center"
                v-else-if="item.crawlerStatus==1 || item.crawlerStatus==2">
              <span>开始监测时间: {{item.startDate}}</span>
              <span class="outpush">计算中...</span>
            </div>
            <div class="time-line flex-bwt-center"
                v-else-if="item.crawlerStatus==3">
              <span>任务创建时间: {{item.updateTime}}</span>
              <span class="outpush"
                    v-if="item.simCount>0">有<i @click="articleDetail(item)">{{item.simCount}}</i>篇文章转载</span>
              <span class="outpush"
                    v-else>有{{item.simCount}}篇文章转载</span>
            </div>
          </div>
          <div class="delete-box cursor"
               v-if="deleteShow">
            <el-checkbox-group v-model="ids">
              <el-checkbox :label="item.id">删除</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div class="page-pagination">
        <set-page @pagingChange="pagingChange"
                  :total="total"
                  ref="child"></set-page>
      </div>
    </div>
    <div class="make-dialog">
      <el-dialog :visible.sync="creadArticle"
                 :close-on-click-modal='false'
                 title="新建任务"
                 width="700px">
        <div class="cread-box">
          <img :src="require('@/assets/images/monitor/creadFrom.png')"
               alt=""
               class="head-image">
          <el-form class="creadForm"
                   ref="creadForm"
                   :rules="rules"
                   :model="creadForm"
                   label-width="80px">
            <el-form-item label="文章标题"
                          prop="title">
              <el-input v-model="creadForm.title"></el-input>
            </el-form-item>
            <el-form-item label="文章链接"
                          prop="url">
              <el-input v-model="creadForm.url"></el-input>
            </el-form-item>
            <el-form-item label="正文内容"
                          prop="content" class="creadForm-cont">
              <el-input type="textarea"
                        :autosize="{ minRows: 4}"
                        v-model="creadForm.content"></el-input>
            </el-form-item>
            <el-form-item label="监测时间"
                          prop="fromData">
              <el-date-picker v-model="creadForm.fromData"
                              type="datetimerange"
                              range-separator="至"
                              format='yyyy-MM-dd HH:mm:ss'
                              value-format="yyyy-MM-dd HH:mm:ss"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期" :default-time="['12:00:00', '08:00:00']">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="suerCread('creadForm')">确 定</el-button>
          <el-button @click="cancel('creadForm')">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog title="任务删除"
                 :visible.sync="deleteTeam"
                 :close-on-click-modal='false'
                 :modal-append-to-body="false"
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
      <el-dialog title="提示"
                 :visible.sync="tipVisible"
                 :modal-append-to-body="false"
                 width="20%"
                 center>
        <span class="dialog-span">链接错误</span>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="tipVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="tipVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
// import vSearch from '@/views/monitor/components/RealSearch'
export default {
  data () {
    return {
      total: 0,
      deleteItem: {},
      ids: [],
      deleteShow: false,
      deleteTeam: false,
      articleData: [],
      tipVisible: false, // 没查到提示
      creadArticle: false, // 创建文件弹框
      creadForm: {
        title: '', // 标题
        fromData: [],
        startDate: '', // 开始监测时间
        endDate: '', // 结束监测时间
        content: '', // 内容
        url: '' // 文章链接
      }, // 创建表单
      rules: {
        // title: [
        //   { required: true, message: '请输入文章标题', trigger: 'blur' },
        //   { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        // ],
        // content: [
        //   { required: true, message: '请输入正文内容', trigger: 'blur' }
        // ]
        fromData: [{ required: true, message: '请选择监测时间', trigger: 'blur' }]
      },
      ruleForm: {
        publishTime: [],
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  methods: {
    openUrl (item) {
      if (item.url) {
        window.open(item.url, '_black')
      }
    },
    // 查询
    queryShow () {
      this.getArticle()
    },
    // 分页
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
      this.getArticle()
    },
    // 获取文章展示列表
    getArticle () {
      this.$http.post(this.$api.listMonitor, this.ruleForm)
        .then(res => {
          if (res.data.data.content <= 0) {
            this.creadArticle = true
          } else {
            this.articleData = res.data.data.content
            this.total = res.data.data.totalElements
          }
        }).catch(() => { })
    },
    articleDetail (item) {
      // this.$router.push({ name: 'ArticleDetail', query: { id: item.id } })
      let routeUrl = this.$router.resolve({
        path: '/monitor/content/articledetail',
        query: { id: item.id }
      })
      window.open(routeUrl.href, '_blank')
    },
    // 展示创建弹框
    creadShow () {
      this.creadArticle = true
    },
    // 确认创建
    suerCread (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.creadForm.url && !this.creadForm.content) { // 判断文章链接或正文内容是否无输入
            this.$message.warning('文章链接和正文内容请至少填写一个')
          } else if (this.creadForm.url && this.creadForm.url.match(/^[ ]*$/)) { // 判断文章链接有内容且全是空格
            this.$message.warning('文章链接请不要全部输入空格!')
          } else if (this.creadForm.content && this.creadForm.content.match(/^[ ]*$/)) { // 判断正文内容有内容且全是空格
            this.$message.warning('正文内容请不要全部输入空格!')
          } else { // 判断文章链接或正文内容有输入且输入不为空格
            this.creadForm.startDate = this.creadForm.fromData[0]
            this.creadForm.endDate = this.creadForm.fromData[1]
            this.$http.post(this.$api.addMonitor, this.creadForm)
              .then(res => {
                if (res.data.data !== null) {
                  this.tipVisible = true
                } else {
                  this.$message.success('创建成功!')
                  this.$refs.child.handleCurrentChange(1)
                }
                this.$refs[formName].resetFields()
                this.startDate = ''
                this.endDate = ''
                this.creadArticle = false
              }).catch(() => { })
          }
        } else {
          return false
        }
      })
    },
    // 取消创建
    cancel (formName) {
      this.creadArticle = false
      this.startDate = ''
      this.endDate = ''
      this.$refs[formName].resetFields()
      this.$refs.child.handleCurrentChange(1)
    },
    // 展示删除选项
    deleteClick () {
      this.deleteShow = true
    },
    // 删除弹框
    showDelete () {
      this.deleteTeam = true
    },
    // 确认删除
    deleteTeams () {
      if (this.ids.length < 1) {
        this.deleteTeam = false
        this.deleteShow = false
        this.$message.warning('请选择删除的文章')
      } else {
        let params = {
          ids: this.ids
        }
        this.$http.post(this.$api.delMonitor, params)
          .then(res => {
            if (res.data.code === 200) {
              this.$message.success('删除成功!')
              this.$refs.child.handleCurrentChange(1)
              this.ids = []
              this.deleteTeam = false
              this.deleteShow = false
            }
          }).catch(() => {
            this.deleteTeam = false
            this.deleteShow = false
          })
      }
    },
    // 取消删除
    overDelete () {
      this.deleteTeam = false
      this.deleteShow = false
      this.ids = []
    }
  },
  created () {
    this.getArticle()
  },
  components: {
    // vSearch
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
.wx-warp-content {
  padding: 0 30px;
  background-color: #fff;
}
.article {
  height: 75px;
  padding-bottom: 10px;
  font-size: 14px;
  text-indent: 32px;
  line-height: 2;
}
.article-box {
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}
.time-line {
  color: #999999;
  font-size: 14px;
  padding-bottom: 15px;
}
.outpush i {
  cursor: pointer;
  text-decoration: underline;
  font-style: normal;
  color: red;
  padding: 0 5px;
}
.creadForm {
  width: 70%;
  margin: 0px auto;
}
.creadForm .el-form-item {
  margin-top: 20px;
}
.cread-box .head-image {
  display: block;
  margin: 0 auto;
}
.dialog-footer {
  display: block;
  text-align: center;
}
.article-title {
  font-size: 18px;
  font-weight: bold;
}
.delete-box {
  text-align: center;
  color: red;
  text-decoration: underline;
}
.creadForm .el-date-editor{
  width: 382px;
}
</style>
