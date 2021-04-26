<!--
 * @Author: MaiChao
 * @Date: 2021-02-04 14:54:55
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-10 15:35:02
-->
<template>
  <div class="real-time content-box">
    <div class="tabs-header isActive">
      <span class="tabs-title">文章实时监测</span>
    </div>
    <div class="wx-warp-box">
      <div class="search_form">
        <el-form :inline="true"
                 ref="ruleForm"
                 :model="ruleForm">
          <el-form-item label="时间"
                        prop="timeRange">
            <el-date-picker v-model="ruleForm.timeRange"
                            size="small"
                            type="daterange"
                            format='yyyy-MM-dd'
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="btn-box flex-ali-center">
            <div style="margin-right:10px;">
              <el-button size="small"
                         @click="creadShow()"
                         type="primary"
                         class="search_query">新建任务</el-button>
            </div>
            <div v-if="!deleteShow">
              <el-button size="small"
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
               v-html="item.title"></div>
          <div class="article lin-clamp-3"
               v-html="item.content"></div>
          <div class="time-line flex-bwt-center"
               v-if="item.crawlerStatus==1">
            <span>开始监测时间{{item.startDate}}</span>
            <span class="outpush">计算中...</span>
          </div>
          <div class="time-line flex-bwt-center"
               v-if="item.crawlerStatus==2">
            <span>结束监测时间{{item.endDate}}</span>
            <span class="outpush"
                  v-if="item.simCount>0">有<i @click="articleDetail(item)">{{item.simCount}}</i>条数据</span>
            <span class="outpush"
                  v-else>有{{item.simCount}}条数据</span>
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
                 width="593px">
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
            <el-form-item label="正文内容"
                          prop="content">
              <el-input type="textarea"
                        :autosize="{ minRows: 4, maxRows: 4}"
                        v-model="creadForm.content"></el-input>
            </el-form-item>
            <el-form-item label="监测时间"
                          prop="fromData">
              <el-date-picker v-model="creadForm.fromData"
                              type="daterange"
                              range-separator="至"
                              format='yyyy-MM-dd'
                              value-format="yyyy-MM-dd"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="文章链接"
                          prop="url">
              <el-input v-model="creadForm.url"></el-input>
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
    </div>
  </div>
</template>
<script>
// import vSearch from '@/views/monitor/components/RealSearch'
export default {
  data () {
    return {
      total: 100,
      deleteItem: {},
      ids: [],
      deleteShow: false,
      deleteTeam: false,
      articleData: [],
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
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入正文内容', trigger: 'blur' }
        ],
        fromData: [{ required: true, message: '请选择监测时间', trigger: 'blur' }]
      },
      ruleForm: {
        timeRange: '',
        pageSize: 20,
        pageNum: 1
      }
    }
  },
  methods: {
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
          this.articleData = res.data.data.content
          this.total = res.data.data.totalElements
        }).catch(() => { })
    },
    articleDetail (item) {
      this.$router.push({ name: 'ArticleDetail', query: { id: item.id } })
    },
    // 展示创建弹框
    creadShow () {
      this.creadArticle = true
    },
    // 确认创建
    suerCread (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.creadForm.startDate = this.creadForm.fromData[0]
          this.creadForm.endDate = this.creadForm.fromData[1]
          this.$http.post(this.$api.addMonitor, this.creadForm)
            .then(res => {
              this.$message.success('创建成功!')
              this.$refs[formName].resetFields()
              this.startDate = ''
              this.endDate = ''
              this.creadArticle = false
              this.$refs.child.handleCurrentChange(1)
            }).catch(() => { })
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
</style>
