<!--
 * @Author: MaiChao
 * @Date: 2021-02-07 15:31:16
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-08-03 10:34:48
-->
<template>
  <div class="real-time content-box">
    <div class="tabs-header isActive">
      <span class="tabs-title">关键词设置</span>
    </div>
    <div class="wx-warp-box">
      <div class="search_form">
        <el-form :inline="true"
                 ref="ruleForm"
                 :model="ruleForm">
          <el-form-item class="btn-box flex-ali-center">
            <div style="margin-right:10px;">
              <el-button @click="getDialog()"
                         class="add"
                         size="mini">添加关键词</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="wx-warp-content">
      <div>
        <el-table :data="tableData"
                  style="width: 100%"
                  id="wx-monitor"
                  :cell-style="{ textAlign: 'center' }">
          <el-table-column prop="num1"
                           label="序号">
            <template slot-scope="scope">
              <div>
                <!-- {{scope.$index + 1}} -->
                {{(ruleForm.pageNum - 1) * ruleForm.pageSize + scope.$index + 1}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="includeKey"
                           label="包括关键词">
          </el-table-column>
          <el-table-column prop="notIncludeKey"
                           label="不包括关键词">
          </el-table-column>
          <el-table-column prop="position"
                           label="位置">
          </el-table-column>
          <el-table-column prop="createTime"
                           label="创建时间">
          </el-table-column>
          <el-table-column prop="sumReadNum"
                           label="操作">
            <template slot-scope="scope">
              <div style="display:inline-block;margin-right:20px">
                <i class="el-icon-edit-outline"
                   style="margin-right:5px"></i>
                <el-button @click="handleClick(scope.$index, scope.row)"
                           type="text"
                           size="small">编辑</el-button>
              </div>
              <div style="display:inline-block">
                <i class="el-icon-delete"
                   style="margin-right:5px"></i>
                <el-button size="small"
                           type="text"
                           @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </div>

            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-pagination">
        <set-page @pagingChange="pagingChange"
                  :total="total"
                  ref="child"></set-page>
      </div>
    </div>
    <div class="make-dialog"
         v-if="dia">
      <!-- <el-dialog :visible.sync="creadArticle" -->
      <el-dialog :visible.sync="dialogVisible"
                 :close-on-click-modal='false'
                 :show-close="false"
                 :before-close="closeDialog"
                 width="405px"
                 title="添加关键词"
                 center
                 class="dia">
        <div>
          <el-form class="creadForm"
                   ref="creadForm"
                   :rules="rules"
                   :model="creadForm"
                   label-position="right"
                   label-width="80px">
            <el-form-item label="包含"
                          prop="title">
              <div class="con-left">
                <el-input v-model="have"
                          placeholder="请输入关键词"
                          class="inp"></el-input>
                <el-button icon="el-icon-plus"
                           circle
                           type="info"
                           plain
                           size="small"
                           class="addBtn"
                           @click="addHave()"></el-button>
              </div>

            </el-form-item>
            <div class="con-left">
              <el-form-item prop="have"
                            v-if="this.creadForm.includeKeyArray.length > 0">
                <!-- <el-button size="mini"
                           v-for="(item,index1) in this.creadForm.includeKeyArray"
                           :key="'aa'+item"
                           label="">{{item}}</el-button> -->
                <el-button size="mini"
                           v-for="(item,index1) in this.creadForm.includeKeyArray"
                           :key="index1"
                           label=""
                           @click="deleteKey(index1)"
                           class="deleteKey1 dia_btn">{{item}}
                  <i class="el-icon-delete deleteKey1"></i>
                </el-button>
              </el-form-item>
            </div>
            <el-form-item label="不包含"
                          prop="url">
              <div class="con-left">
                <el-input v-model="not"
                          placeholder="请输入关键词"
                          class="inp"></el-input>
                <el-button icon="el-icon-plus"
                           circle
                           type="info"
                           plain
                           size="small"
                           class="addBtn"
                           @click="addNot()"></el-button>
              </div>

            </el-form-item>
            <div class="con-left">
              <el-form-item prop=""
                            v-if="this.creadForm.notIncludeKeyArray.length > 0">
                <el-button size="mini"
                           v-for="(item,index) in this.creadForm.notIncludeKeyArray"
                           :key="index"
                           label=""
                           @click="deleteKey2(index)"
                           class="deleteKey2 dia_btn">{{item}}
                  <i class="el-icon-delete deleteKey2"></i>
                </el-button>
              </el-form-item>
            </div>

            <el-form-item label="渠道"
                          class="creadForm-cont">
              <div class="con-left">
                <!-- <el-checkbox-group v-model="checkedCities"
                                   :min="1"
                                   :max="2">
                  <el-checkbox v-for="city in cities"
                               :label="city"
                               :key="city">{{city}}</el-checkbox>
                </el-checkbox-group> -->
                <el-checkbox true-label=1
                             false-label=0
                             :checked="checkedTitle"
                             v-model="creadForm.checkTitle">标题</el-checkbox>
                <el-checkbox true-label=1
                             false-label=0
                             :checked="checkedContent"
                             v-model="creadForm.checkContent">内容</el-checkbox>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="suerCread('creadForm')"
                     class="btn"
                     size="medium">确 定</el-button>
          <el-button @click="cancel('creadForm')"
                     class="btn"
                     size="medium">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog title="关键词删除"
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
      <!-- <el-dialog title="提示"
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
      </el-dialog> -->
    </div>
  </div>
</template>
<script>
// import vSearch from '@/views/monitor/components/RealSearch'
export default {
  data () {
    return {
      checkedTitle: false,
      checkedContent: false,

      dialogVisible: false,
      change: false,
      dia: false,
      total: 0,
      deleteId: '', // 删除id
      deleteItem: {},
      ids: [],
      deleteTeam: false,
      articleData: [],
      checkList: [],
      tipVisible: false, // 没查到提示
      creadArticle: false, // 创建文件弹框
      have: '',
      not: '',
      creadForm: {
        // checkList: ['1'],
        includeKeyArray: [], // 包含关键字
        // includeKeyArray: ['微信', '未检', '天天', '向上'],
        notIncludeKeyArray: [], // 不包含关键字
        checkTitle: 0, // 标题 0 不检测 1：检测
        checkContent: 0, // 内容 0 不检测 1：检测
        id: ''
      }, // 创建表单
      rules: {
        fromData: [{ required: true, message: '请选择监测时间', trigger: 'blur' }]
      },
      ruleForm: {
        pageSize: 10,
        pageNum: 1
      },
      tableData: []

    }
  },
  methods: {
    closeDialog () {
      this.$confirm('确认关闭?')
        .then(_ => {
          this.getDialog()
          location.reload()
        })
        .catch(_ => { })
    },
    getDialog () {
      this.dialogVisible = true
      this.dia = true
      console.log(this.creadForm)
    },
    // 添加关键词  包含
    addHave () {
      if (!this.have) {
        this.$message.warning('请先输入关键词!')
      } else if (this.have.match(/^[ ]*$/)) {
        this.$message.warning('请不要全部输入空格!')
      } else {
        this.creadForm.includeKeyArray.push(this.have)
        this.have = ''
      }
    },
    // 添加关键词  不包含
    addNot () {
      if (!this.not) {
        this.$message.warning('请先输入关键词!')
      } else if (this.not.match(/^[ ]*$/)) {
        this.$message.warning('请不要全部输入空格!')
      } else {
        this.creadForm.notIncludeKeyArray.push(this.not)
        this.not = ''
      }
    },
    openUrl (item) {
      if (item.url) {
        window.open(item.url, '_black')
      }
    },
    // 分页
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
      this.getKeywordsList()
    },
    // 获取关键词列表
    getKeywordsList () {
      this.$http.post(this.$api.keyWordsList, this.ruleForm)
        .then(res => {
          // console.log(res)
          if (res.data.code === 200) {
            // console.log(res.data.data.content.length)
            // if (res.data.data.content <= 0) {
            //   this.dialogVisible = true
            // } else {
            this.tableData = res.data.data.content
            this.total = res.data.data.totalElements
            // }
          }
          // console.log(this.tableData)
        }).catch(() => { })
    },
    // 展示创建弹框
    creadShow () {
      this.creadArticle = true
    },
    // 确认创建
    suerCread (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(formName)
          console.log(this.creadForm)
          if (this.creadForm.includeKeyArray.length < 1) {
            this.$message.warning('包含关键词至少填写一个!')
          } else if (this.creadForm.checkTitle == '0' && this.creadForm.checkContent == '0') {
            this.$message.warning('渠道至少选一个!')
          } else {
            // console.log(this.creadForm)
            this.$http.post(this.$api.saveKeyWords, this.creadForm)
              .then(res => {
                if (res.data.data !== null) {
                  // this.tipVisible = true
                } else {
                  if (this.change) {
                    this.$message.success('修改成功!')
                    this.change = false
                  } else {
                    this.$message.success('创建成功!')
                  }

                  this.$refs.child.handleCurrentChange(1)
                }
                // this.$refs[formName].resetFields()
                this.creadForm.includeKeyArray = []
                this.creadForm.notIncludeKeyArray = []
                this.creadForm.id = ''
                this.have = ''
                this.not = ''
                this.creadForm.checkContent = 0
                this.creadForm.checkTitle = 0
                this.checkedContent = false
                this.checkedTitle = false
                this.dialogVisible = false
                this.checkedTitle = false
                this.dia = false
              }).catch(() => { })
          }
        } else {
          return false
        }
      })
    },
    // 取消创建
    cancel (formName) {
      // let _this = this
      // this.creadArticle = false
      this.dialogVisible = false
      this.dia = false
      this.startDate = ''
      this.endDate = ''
      // this.$refs[formName].resetFields()
      // this.$refs.child.handleCurrentChange(1)
      this.have = ''
      this.not = ''
      console.log(formName)
      this.creadForm.includeKeyArray = []
      this.creadForm.notIncludeKeyArray = []
      this.creadForm.id = ''
      this.change = false
      // this.creadForm.checkList = ['1']
      // this.creadForm.checkTitle = '1'
      // this.creadForm.checkContent = '1'

      this.creadForm.checkContent = 0
      this.checkedContent = false
      this.creadForm.checkTitle = 0
      this.checkedTitle = false
      // this.$nextTick(() => {
      //   _this.$refs[formName].resetFields() // this.$refs.adduserform.resetFields();
      // })
    },
    // 编辑
    handleClick (i, row) {
      // console.log('编辑', row)
      this.change = true
      // let keyDetail = ''
      this.$http.get(this.$api.keyDetail, { params: { id: row.id } })
        .then(res => {
          console.log(res.data)
          if (res.data.code === 200) {
            // this.creadForm = res.data.data
            console.log('this.creadForm', this.creadForm)
            // this.deleteTeam = false
            this.dialogVisible = true
            this.dia = true

            if (res.data.data.id !== null) {
              this.creadForm.id = res.data.data.id
            }
            if (res.data.data.includeKey && res.data.data.includeKey !== null) {
              this.creadForm.includeKeyArray = res.data.data.includeKey.split(',')
            }
            if (res.data.data.notIncludeKey && res.data.data.notIncludeKey !== null) {
              this.creadForm.notIncludeKeyArray = res.data.data.notIncludeKey.split(',')
            }
            if (res.data.data.checkContent == 1) {
              this.checkedContent = true
              this.creadForm.checkContent = res.data.data.checkContent
            } else {
              this.checkedContent = false
              this.creadForm.checkContent = 0
            }
            if (res.data.data.checkTitle == 1) {
              this.checkedTitle = true
              this.creadForm.checkTitle = res.data.data.checkTitle
            } else {
              this.checkedTitle = false
              this.creadForm.checkTitle = 0
            }

            // console.log(this.creadForm)
            console.log('this.creadFormwqrcafsd ', this.creadForm)
          }
        }).catch(() => {
          this.deleteTeam = false
        })

      // if (row.includeKeyArray !== null && row.includeKeyArray.length > 0) {
      //   for (var q = 0; q < row.includeKeyArray.length; q++) {
      //     this.creadForm.includeKeyArray.push(row.includeKeyArray[q])
      //   }
      // }
      // if (row.notIncludeKeyArray !== null && row.notIncludeKeyArray.length > 0) {
      //   for (var j = 0; j < row.notIncludeKeyArray.length; j++) {
      //     this.creadForm.notIncludeKeyArray.push(row.notIncludeKeyArray[j])
      //   }
      // }
    },
    handleDelete (i, row) {
      console.log('aaa')
      this.deleteId = row.id
      // this.showDelete(i, row)
      this.dia = true
      this.deleteTeam = true
    },
    deleteKey (index) {
      console.log(index)
      this.creadForm.includeKeyArray.splice(index, 1)
    },
    deleteKey2 (index) {
      console.log(index)
      this.creadForm.notIncludeKeyArray.splice(index, 1)
    },
    // 删除弹框
    // showDelete (i, row) {
    //   this.deleteTeam = true
    // },
    // 确认删除
    deleteTeams (i, row) {
      console.log(this.deleteId)
      this.$http.get(this.$api.deleteKeyword, { params: { id: this.deleteId } })
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success('删除成功!')
            this.$refs.child.handleCurrentChange(1)
            this.deleteId = ''
            this.deleteTeam = false
          }
        }).catch(() => {
          this.deleteTeam = false
        })
    },
    // 取消删除
    overDelete () {
      this.deleteId = ''
      this.deleteTeam = false
    },
    // 关键词数据过滤
    keyFormatter (row, column) {
      // // console.log(row, column)
      var newKey = []
      if (row.includeKeyArray !== null && row.includeKeyArray.length > 0) {
        for (var i = 0; i < row.includeKeyArray.length; i++) {
          newKey.push(row.includeKeyArray[i])
        }
      }
      if (row.notIncludeKeyArray !== null && row.notIncludeKeyArray.length > 0) {
        for (var j = 0; j < row.notIncludeKeyArray.length; j++) {
          newKey.push(row.notIncludeKeyArray[j])
        }
      }
      return newKey.join()
    }
    // 推送页面
    // geiPushPage () {
    //   this.$router.push('PushPage')
    // }
  },
  created () {
    this.getKeywordsList()
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
  // width: 70%;
  // margin: 0px auto;
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
.creadForm .el-date-editor {
  width: 382px;
}

.dia_btn {
  color: #3b81fe;
}
// dis
.dia .el-dialog__header {
  background: #edeff4;
}
.con-left {
  margin-left: 20px;
}
.inp {
  width: 166px;
  height: 36px;
}
.addBtn {
  margin-left: 20px;
}
.add {
  border: 1px solid #4a8bfe;
  color: #3b81fe;
  font-size: 14px;
}
.deleteKey1 {
  .deleteKey1 {
    display: none;
  }
}
.deleteKey1:hover {
  .deleteKey1 {
    display: block;
  }
}
.deleteKey2 {
  .deleteKey2 {
    display: none;
  }
}
.deleteKey2:hover {
  .deleteKey2 {
    display: block;
  }
}
</style>
