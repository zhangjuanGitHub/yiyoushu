<!--
 * @Author: MaiChao
 * @@Description: 监测列表
 * @Date: 2021-03-02 14:09:45
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-22 15:55:51
-->
<template>
  <div class="minute-list">
    <div class="tabs-header">
      监测列表
    </div>
    <div class="list-seath">
      <el-form :inline="true"
               :model="formInline"
               ref="formInline"
               class="demo-form-inline">
        <el-form-item class="number"
                      prop="data"
                      label="监测日期">
          <el-date-picker v-model="formInline.data"
                          size="small"
                          type="daterange"
                          value-format='yyyy-MM-dd'
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="监控类型"
                      prop="processState">
          <el-select v-model="formInline.processState"
                     placeholder="监控类型"
                     size="small">
            <el-option label="文章异常"
                       value="-1"></el-option>
            <el-option label="等待监测"
                       value="0"></el-option>
            <el-option label="正在监测"
                       value="1"></el-option>
            <el-option label="监测完毕"
                       value="2"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="文章状态"
                      prop="article">
          <el-select v-model="formInline.article"
                     placeholder="文章筛选"
                     size="small">
            <el-option label="文章一"
                       value="shanghai"></el-option>
            <el-option label="文章二"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item prop="radio"
                      v-if="radioShow">
          <el-radio-group v-model="formInline.radio"
                          size="small"
                          @change="getList">
            <el-radio :label="1">文章列表</el-radio>
            <el-radio :label="2">账号列表</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm()"
                     size="small">查询</el-button>
          <el-button @click="resetForm('formInline')"
                     size="small">重置</el-button>
          <el-button type="success"
                     @click="exportItem()"
                     size="small">导出</el-button>
          <el-button @click="backItem(2)" v-if="!radioShow"
                     size="small">返回</el-button>
          <!-- <el-button type="danger"
                     v-if="moreShow"
                     size="small"
                     :disabled="deleteIds.length < 1"
                     @click="showDelete">确认删除</el-button>
          <el-button size="small"
                     v-if="moreShow"
                     @click="overDelete">取消删除</el-button>
          <el-button type="danger" v-else
                     @click="deleteItems()"
                     size="small">删除</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="list-box">
      <div class="revise flex"
           v-if="formInline.radio===1">
        <div v-for="item in articleList"
             :key="item.id"
             class="revise-article">
          <div class="icon-box flex-ali-center">
            <!-- <div class="el-icon-collection-tag cursor"></div> -->
            <div class="status color1"
                 v-if="item.processState===0">等待监测</div>
            <div class="status color2"
                 v-if="item.processState===1">正在监测</div>
            <div class="status color3"
                 v-if="item.processState===2">监测完毕</div>
            <div class="status color4"
                 v-if="item.processState===-1">监测异常</div>
            <el-tooltip class="item"
                        effect="dark"
                        content="删除"
                        placement="top">
              <div class="el-icon-delete cursor delete"
                   @click="deleteItem(item)"></div>
            </el-tooltip>
          </div>
          <div class="revise-top flex-ali-center">
            <div class="left-image">
              <img :src="item.cover"
                   alt="">
            </div>
            <div class="right-detail">
              <div class="right-top">
                <span class="name">{{item.nickname}}</span>
              </div>
              <div class="right-bottom">
                <p class="lin-clamp">
                  <span class="qudao" v-if="item.idx==='1'">头条</span>
                  <span class="qudao" v-if="item.idx==='2'">次条</span>
                  <span class="qudao" v-if="item.idx==='3'">第三条</span>
                  <span class="qudao" v-if="item.idx==='4'">第四条</span>
                  <span class="qudao" v-if="item.idx==='5'">第五条</span>
                  <span class="qudao" v-if="item.idx==='6'">第六条</span>
                  <span class="qudao" v-if="item.idx==='7'">第七条</span>
                  <span class="qudao" v-if="item.idx==='8'">第八条</span>
                  <span>{{item.title}}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="revise-bottom">
            <el-button type="primary"
                       @click="openDetail(item)">查看阅读数详情</el-button>
            <div class="flex-arr-center">
              <div class="time">{{item.endTime}}</div>
              <div class="read">阅读数:<span>{{item.readNum}}</span></div>
              <div class="look">点赞数:<span>{{item.likeNum}}</span></div>
            </div>
          </div>
          <div class="delete-box cursor"
               v-show="moreShow">
            <el-checkbox-group v-model="deleteIds">
              <el-checkbox :label="item.id">删除</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div class="revise flex"
           v-if="formInline.radio===2">
        <div class="revise-accound"
             v-for="item in accountList"
             :key="item.id">
          <div class="icon-box flex-ali-center">
            <!-- <div class="el-icon-collection-tag cursor"></div> -->
            <div class="status color1"
                 v-if="item.processState===0">等待监测</div>
            <div class="status color2"
                 v-if="item.processState===1">正在监测</div>
            <div class="status color3"
                 v-if="item.processState===2">监测完毕</div>
            <div class="status color4"
                 v-if="item.processState===-1">监测异常</div>
            <el-tooltip class="item"
                        effect="dark"
                        content="删除"
                        placement="top">
              <div class="el-icon-delete cursor delete"
                   @click="deleteItem(item)"></div>
            </el-tooltip>
          </div>
          <div class="revise-top flex-ali-center">
            <div class="left-image">
              <img :src="item.oriHeadImg"
                   alt="">
            </div>
            <div class="right-detail">
              <div class="right-top">
                <span class="name">{{item.nickname}}</span>
              </div>
              <div class="right-bottom">
                <p>
                  {{item.alias}}
                </p>
              </div>
            </div>
          </div>
          <div class="revise-bottom"
               v-if="item.processState!==0">
            <el-button type="primary"
                       @click="openCurrent(item)">查看监测详情</el-button>
            <!-- <div class="flex-arr-center">
              <div class="time">{{item.endTime}}</div>
              <div class="read">阅读数:<span>326</span></div>
              <div class="look">在看数:<span>326</span></div>
            </div> -->
          </div>
          <div class="revise-bottom"
               v-else>
            <div class="waitfor">
              <p class="flex-arr-center">等待监控</p>
              <div class="flex-arr-center">
                <div class="time">预约时间:<span>{{item.startTime}}-{{item.endTime}}</span></div>
              </div>
              <el-button type="primary"
                         @click="openMinute(item)">预约修改</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center"
           v-if="dataNull">
        <img :src="require('@/assets/images/monitor/minute.png')"
             alt="">
        <!-- <p class="delete">暂无该类型数据</p> -->
        <p class="delete cursor" @click="$router.push({ name: 'MinuteArticle' })">暂无数据，请前往添加...</p>
      </div>
    </div>
    <set-page @pagingChange="pagingChange"
              :total="total" ref="child"></set-page>
    <el-dialog title="任务删除"
               :visible.sync="deleteShow"
               :modal-append-to-body="false"
               :close-on-click-modal='false'
               width="30%"
               center>
      <span class="dialog-span">您确定要执行此操作吗?</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="overDelete">取 消</el-button>
        <el-button type="primary"
                   @click="confirmDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      total: 0,
      dataNull: false,
      deleteId: '', // 删除id
      deleteIds: [], // 删除数组
      moreShow: false, // 批量删除展示
      deleteShow: false,
      radioShow: true,
      articleList: [],
      accountList: [],
      formInline: {
        actualId: '',
        processState: '',
        article: '',
        data: [],
        startDate: '',
        endDate: '',
        radio: 1,
        pageBean: {
          pageSize: 10,
          pageNum: 1
        }
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 分页
    pagingChange (query) {
      this.formInline.pageBean.pageSize = query.size
      this.formInline.pageBean.pageNum = query.page
      this.getList()
    },
    // 获取列表
    getList () {
      this.formInline.startDate = this.formInline.data[0]
      this.formInline.endDate = this.formInline.data[1]
      if (this.formInline.radio === 1) {
        this.$http.post(this.$api.listArticle, this.formInline)
          .then(res => {
            if (res.data.data.article.length > 0) {
              this.dataNull = false
              this.articleList = res.data.data.article
              this.total = res.data.data.total
            } else {
              this.dataNull = true
              this.articleList = []
              this.total = 0
            }
          }).catch(() => {
          })
      } else if (this.formInline.radio === 2) {
        this.$http.post(this.$api.listCount, this.formInline)
          .then(res => {
            if (res.data.data.account.length > 0) {
              this.dataNull = false
              this.accountList = res.data.data.account
              this.total = res.data.data.total
            } else {
              console.log(res.data.data.account.length)
              this.dataNull = true
              this.accountList = []
              this.total = 0
            }
          }).catch(() => {
          })
      }
    },
    submitForm () {
      this.$refs.child.handleCurrentChange(1)
    },
    openDetail (item) {
      // this.$router.push({ path: '/monitor/minute/listdetail', query: { id: item.id } })
      let routeUrl = this.$router.resolve({
        path: '/monitor/minute/listdetail',
        query: { id: item.id }
      })
      window.open(routeUrl.href, '_blank')
      // console.log(url)
      // window.open(url, '_black')
    },
    // 切换列表数据
    openCurrent (item) {
      this.radioShow = false
      this.formInline.actualId = item.id
      this.articleList = []
      this.formInline.radio = 1
      this.$refs.child.handleCurrentChange(1)
    },
    // 返回预约页面
    openMinute (item) {
      if (this.formInline.radio === 1) {
        this.$router.push({ name: 'MinuteArticle', query: { id: item.id } })
      } else if (this.formInline.radio === 2) {
        this.$router.push({ name: 'MinuteAccount', query: { id: item.id } })
      }
    },
    // 删除
    deleteItem (item) {
      this.deleteId = item.id
      this.deleteShow = true
    },
    // 批量删除展示
    deleteItems () {
      this.moreShow = true
    },
    // 单个确定删除
    confirmDelete () {
      let apis = ''
      if (this.formInline.radio === 1) {
        apis = this.$api.deleteArticle
      } else if (this.formInline.radio === 2) {
        apis = this.$api.deleteAccount
      }
      this.$http.get(apis, { params: { id: this.deleteId } })
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success('删除成功!')
            this.$refs.child.handleCurrentChange(1)
            this.deleteId = ''
            this.deleteShow = false
          }
        }).catch(() => {
          this.deleteId = ''
          this.deleteShow = false
        })
    },
    // 批量删除选择
    showDelete () {
      console.log(this.deleteIds)
    },
    // 取消删除
    overDelete () {
      this.deleteId = ''
      this.deleteIds = []
      this.deleteShow = false
      this.moreShow = false
    },
    // 导出
    exportItem () { },
    backItem () {
      this.radioShow = true
      this.formInline.radio = 2
      this.formInline.actualId = ''
      this.$refs.child.handleCurrentChange(1)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$refs.child.handleCurrentChange(1)
    }
  }
}
</script>
<style scoped>
.list-seath {
  padding: 10px 20px;
}
.number i {
  font-style: normal;
  color: red;
}
.left-image{
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: rgb(224, 224, 224);
  border: 1px solid rgb(224, 224, 224);
  margin-right: 10px;
  margin-bottom: 5px;
}
.left-image img {
  width: 80px;
  height: auto;
}
.right-detail .right-top {
  color: #252934;
  font-size: 14px;
  line-height: 30px;
}
.right-top .name {
  font-size: 16px;
  line-height: 30px;
  margin-top: -5px;
}
.right-top .send-detail {
  color: #ffc154;
}
.right-bottom {
  font-size: 14px;
  color: #707277;
  line-height: 30px;
  /* max-width: 85%; */
}
.list-box {
  padding: 20px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}
.revise-article:nth-of-type(3n + 3),
.revise-accound:nth-of-type(3n + 3) {
  margin-right: 0px;
}
.revise {
  flex-wrap: wrap;
}
.revise-article,
.revise-accound {
  width: 32%;
  padding: 25px 10px;
  border: 1px solid #e4e7ea;
  position: relative;
  box-sizing: border-box;
  margin-right: 20px;
  margin-bottom: 20px;
}
.revise-top {
  border-bottom: 1px solid #707277;
  margin-bottom: 10px;
}
.revise-bottom .el-button {
  display: block;
  margin: 20px auto;
}
.revise-bottom .flex-arr-center {
  color: #707277;
  font-size: 14px;
}
.icon-box {
  position: absolute;
  top: 20px;
  right: 20px;
}
.icon-box div {
  margin-right: 10px;
}
.status {
  /* background-color: rgb(36, 252, 180); */
  color: #fff;
  border-radius: 8px;
  padding: 0 8px;
  font-size: 14px;
}
.qudao {
  background-color: rgb(36, 252, 180);
  color: #fff;
  padding: 2px 5px;
  margin-right: 10px;
}
.list-seath .el-select {
  width: 110px;
}
.list-seath .el-date-editor {
  width: 220px;
}
.list-seath .el-radio {
  margin-right: 10px;
}
.list-seath .el-radio:last-child {
  margin-right: 0;
}
.lin-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.delete-box {
  text-align: center;
  color: red;
  text-decoration: underline;
  margin-top: 20px;
}
.minute-content .pagination-wrap{
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
