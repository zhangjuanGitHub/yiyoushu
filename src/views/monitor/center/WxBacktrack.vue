<!--
 * @Author: zhangjuan
 * @Date: 2021-05-25 15:37:33
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-06-03 17:31:43
-->
<template>
  <div>
    <div class="search-material-wrap flex-cloumn-all">
      <p class="search-back-title">数据回溯-微信</p>
      <el-button type="primary" plain
                  @click="openAddVisible"><i class="el-icon-plus"></i>添加公众号</el-button>
      <div class="search-back-tip">
        <div class="search-tip-box">
            <p>1、账号回溯是对指定账号的指定时间内数据进行回溯，方便用户多维度数据分析</p>
            <p>2、账号回溯，可以回溯某个账号历史文章数据和行为数据（阅读数、点赞数、转发数）</p>
            <p>3、账号回溯1-50个需要1-12个小时，每次最多添加50个账号，回溯时间最多选择1个月</p>
            <p>4、账号回溯完成后，会在消息列表通知，请在<span>个人中心-账号回溯</span>里查看或导出</p>
        </div>
      </div>
      <el-table :data="backData"
                style="width: 800px; border: 1px solid #dddddd">
        <el-table-column label="公众号名称"
                          prop="nickname"
                          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="content-box-avatar flex-ali-center">
              <img :src="scope.row.ori_head_img" alt="">
              <p>{{scope.row.nickname}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="微信号"
                          prop="alias"
                          width="440">
        </el-table-column>
        <el-table-column label="删除"
                          width="100">
          <template slot-scope="scope">
            <i class="el-icon-delete-solid cursor"
              @click="deleteBackItem(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
      <p class="search-back-pp">请选择要采集的时间段</p>
      <el-date-picker v-model="timeValue"
                      type="daterange"
                      :picker-options="pickerDateBefore"
                      size="small"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
      <!-- <p class="search-back-pp">本次采集时长为<span>1</span>天，需消耗<span>30.0</span>豆</p> -->
      <el-button type="primary"
              class="search-back-btns"
              @click="submitDataTrack">开始回溯</el-button>
    </div>
    <!-- 回溯成功提示 -->
    <el-dialog width="410px"
                center
                :close-on-click-modal='false'
                :visible.sync="dialogVisible"
                :modal-append-to-body="false">
      <div class="search-back-dialog flex-cloumn-all">
          <p class="search-dialog-title">您的请求已成功提交!</p>
          <p class="is-red">回溯1-50个账号需要1个工作日，51-100个账号需要2个工作日，以此类推</p>
          <p>查询完成后，我们会在首页账号头像旁边展示回溯状态通知您，您可以在
            <span @click="$router.push({ name: 'BackTrack' })" class="cursor">【个人中心-账号回溯】</span>，进行查看导出和删除操作。</p>
      </div>
      <div slot="footer" class="dialog-footer add-account-tip">
          <el-button @click="cancel" type="success">知道了</el-button>
      </div>
    </el-dialog>
    <!-- 添加公众号 -->
    <el-dialog title="添加公众号"
               center
               :visible.sync="addVisible"
               :close-on-click-modal='false'
               @close="cancelAdd"
               width="820px"
               class="add-apply">
      <div class="apply-box">
        <div class="add-url-box">
          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane label="搜索添加"
                         name="first">
              <template>
                <div class="add-box">
                  <div class="search-box">
                    <el-input placeholder="请输入公众号名称或微信号"
                              v-model="keyword">
                    </el-input>
                    <el-button type="primary" @click="queryKeyword">查询</el-button>
                  </div>
                  <div class="flex-bwt">
                    <div class="show-box">
                      <div class="top-line flex-arr-center">查询结果</div>
                      <div class="content-box">
                        <div class="flex-bwt-center alone cursor"
                             v-for="(item,index) in searchList"
                             :key="index"
                             @dblclick="shuttle(item,index)">
                          <div class="content-box-avatar flex-ali-center">
                            <img :src="item.ori_head_img || undefinedUrl" alt="">
                            <p>{{item.nickname}}</p>
                          </div>
                          <i class="el-icon-circle-plus-outline cursor"
                            @click="shuttle(item,index)"></i>
                        </div>
                      </div>
                    </div>
                    <div class="show-box">
                      <div class="top-line flex-arr-center">已添加公众号</div>
                      <div class="content-box">
                        <div class="flex-bwt-center alone cursor"
                             v-for="(item,index) in addList"
                             :key="index">
                          <div class="content-box-avatar flex-ali-center">
                            <img :src="item.ori_head_img || undefinedUrl" alt="">
                            <p>{{item.nickname}}</p>
                          </div>
                          <i class="el-icon-remove-outline cursor"
                            @click="unShuttle(item,index)"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="链接添加"
                         name="second">
              <template>
                <el-form :model="dateForm"
                         ref="dateForm"
                         class="second-add-form"
                         label-width="90px">
                  <el-form-item prop="email"
                                label="链接">
                    <el-input v-model="dateForm.url"
                              placeholder="请输入一篇文章链接"
                              :trigger-on-focus="false"></el-input>
                  </el-form-item>
                  <el-form-item v-for="(item, index) in dateForm.toUrlList"
                                :label="'新增链接' + (index+1)"
                                :key="item.key"
                                :prop="'toUrlList.' + index + '.value'"
                                :rules="{
                                required: true, message: '链接不能为空', trigger: 'blur'
                              }">
                    <el-input v-model="item.value"
                              placeholder="请输入一篇文章链接"
                              :trigger-on-focus="false"></el-input>
                    <el-button type="danger" @click.prevent="removeItem(item)" class="second-add-del">删除</el-button>
                  </el-form-item>
                </el-form>
                <div class="second-add-btn flex-all-center">
                  <el-button type="success" @click="addUrlInput" :disabled="dateForm.url.length <= 0">添加链接</el-button>
                  <el-button type="primary" @click="queryUrl" :disabled="dateForm.url.length <= 0">查询</el-button>
                  <el-button @click="clearDateForm('dateForm')">清空</el-button>
                </div>
                <div class="flex-ali" v-if="urlData.length > 0">
                  <div class="url-box">
                    <div class="top-line flex-arr-center">查询结果</div>
                      <div class="url-content-box">
                        <div class="flex-arr-center alone cursor"
                             v-for="(item, index) of urlData"
                             :key="index">
                          <div class="content-box-avatar flex-ali-center">
                            <img :src="item.ori_head_img || undefinedUrl" alt="">
                            <p>{{item.nickname}}</p>
                          </div>
                          <p>{{item.alias}}</p>
                        </div>
                      </div>
                  </div>
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmToSubmit">添加到回溯列表</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import vMenu from '@/views/monitor/components/Menu'
export default {
  data () {
    return {
      pickerDateBefore: { // 禁用当天之后的日期
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      dateForm: {
        url: '',
        toUrlList: []
      },
      undefinedUrl: require('@/assets/images/home/avatar.png'),
      addVisible: false, // 添加公众号
      activeName: 'first',
      dialogVisible: false,
      textarea: '', // 链接添加
      urlData: [], // 根据url查询到的列表
      timeValue: [], // 回溯时间段
      backData: [], // 回溯列表
      keyword: '', // 根据账号搜索
      searchList: [], // 根据账号查询到的列表
      addList: [] // 根据账号查询添加后的列表
    }
  },
  methods: {
    handleClick () {
      this.keyword = ''
      this.searchList = []
      this.addList = []
      this.dateForm.url = ''
      this.dateForm.toUrlList = []
      this.urlData = []
    },
    // 增加链接
    addUrlInput () {
      this.dateForm.toUrlList.push({
        value: '',
        key: Date.now()
      })
    },
    // 删除链接
    removeItem (item) {
      let index = this.dateForm.toUrlList.indexOf(item)
      this.dateForm.toUrlList[index].value = ''
      if (index !== -1) {
        this.dateForm.toUrlList.splice(index, 1)
      }
    },
    // 清空链接
    clearDateForm (dateForm) {
      this.dateForm.url = ''
      this.$refs[dateForm].resetFields()
    },
    // 根据账号搜索
    queryKeyword () {
      if (this.keyword) {
        this.$http.post(this.$api.getByKey, { keyword: this.keyword })
          .then(res => {
            if (res.data.data.account.length <= 0) {
              this.$message.warning('请更换关键词')
              this.searchList = []
            } else {
              this.searchList = res.data.data.account
            }
          }).catch(() => {})
      } else {
        this.$message.warning('请输入公众号名称或微信号')
      }
    },
    // 根据Url搜索
    queryUrl () {
      if (this.dateForm.url) {
        let urls = []
        urls.push(this.dateForm.url)
        if (this.dateForm.toUrlList.length > 0) {
          for (let i = 0; i < this.dateForm.toUrlList.length; i++) {
            if (urls.indexOf(this.dateForm.toUrlList[i].value) === -1) {
              urls.push(this.dateForm.toUrlList[i].value)
            }
          }
        }
        this.$http.post(this.$api.getByUrlsss, { urls: urls })
          .then(res => {
            if (res.data.data.length > 0) {
              let datas = res.data.data
              let urlArr = []
              for (let index = 0; index < datas.length; index++) {
                urlArr.push({
                  nickname: datas[index].nickname,
                  alias: datas[index].alias,
                  biz: datas[index].biz,
                  ori_head_img: datas[index].oriHeadImg
                })
              }
              this.urlData = this.unique(urlArr)
            } else {
              this.$message.warning('请检查链接是否正确')
            }
          }).catch(() => {})
      } else {
        this.$message.warning('请输入文章链接')
      }
    },
    unique(arr) {
      const res = new Map();
      return arr.filter((a) => !res.has(a.biz) && res.set(a.biz, 1))
    },
    // 添加到回溯列表
    confirmToSubmit () {
      if (this.activeName === 'first') { // 搜索账号添加
        this.addList.map(item => {
          // this.backData.push(item)
          this.backData.push({
            ori_head_img: item.ori_head_img,
            nickname: item.nickname,
            accountId: item.biz,
            alias: item.alias
          })
        })
        this.keyword = ''
        this.searchList = []
        this.addList = []
      } else if (this.activeName === 'second') { // 搜索链接添加
        this.urlData.map(item => {
          // this.backData.push(item)
          this.backData.push({
            ori_head_img: item.ori_head_img,
            nickname: item.nickname,
            accountId: item.biz,
            alias: item.alias
          })
        })
        this.dateForm.url = ''
        this.dateForm.toUrlList = []
        this.urlData = []
      }
      this.addVisible = false
      this.activeName = 'first'
      console.log(this.backData)
    },
    // 删除回溯列表
    deleteBackItem (item) {
      this.backData.forEach((val, index) => {
        if (item.biz === val.biz) {
          this.backData.splice(index, 1)
        }
      })
    },
    // 开始回溯
    submitDataTrack () {
      if (this.backData.length <= 0) {
        this.$message.warning('请添加要回溯的账号')
      } else if (!this.timeValue[0]) {
        this.$message.warning('请选择要采集的时间段')
      } else {
        let obj = {
          startDate: this.timeValue[0],
          endDate: this.timeValue[1],
          account: this.backData,
          reviewType: 1 // 微信
        }
        this.$http.post(this.$api.addBatchAcc, obj)
          .then(res => {
            this.dialogVisible = true
            this.timeValue = []
            this.backData = []
          })
      }
    },
    // 回溯成功后取消dialog
    cancel () {
      this.dialogVisible = false
    },
    // 添加公众号dialog
    openAddVisible () {
      this.addVisible = true
    },
    // 添加公众号
    shuttle (item, index) {
      if (this.addList.length > 0) {
        for (let i = 0; i < this.addList.length; i++) {
          if (this.addList[i].biz === item.biz) {
            this.$message.warning('已经添加过' + item.nickname)
            return
          }
        }
      }
      // this.searchList.splice(index, 1)
      this.addList.push(item)
    },
    // 取消添加公众号
    unShuttle (item, index) {
      this.addList.splice(index, 1)
    },
    // 关闭添加
    cancelAdd () {
      this.addVisible = false
      this.activeName = 'first'
      this.handleClick()
    },
    listenerSubmit (e) {
      if (e.keyCode === 13) {
        this.queryKeyword()
      }
    }
  },
  mounted () {
    window.addEventListener('keydown', this.listenerSubmit)
  },
  destroyed () {
    window.removeEventListener('keydown', this.listenerSubmit, false)
  },
  components: {
    vMenu
  }
}
</script>
<style scoped>
.search-material-wrap {
  padding: 20px;
}
/* 数据回溯 */
.search-back-title {
  font-size: 30px;
}
.is-red, .search-back-pp span {
  color: #ff0000 !important;
}
.search-back-tip {
  width: 670px;
  margin: 30px 0;
  background: #F2F2F2;
}
.search-tip-box {
  margin: 20px;
  background: #182538;
}
.search-tip-box p {
  color: #54657C;
  line-height: 30px;
  text-indent: 14px;
}
.search-tip-box p span {
  color: #226EA2;
  cursor: pointer;
}
.search-back-pp, .search-back-title {
  margin: 20px 0;
  color: #151C29;
}
.search-back-btns {
  margin: 20px 0 70px;
  width: 225px;
  height: 50px;
  font-size: 16px;
}
.search-back-dialog {
  margin: 0 20px;
}
.search-dialog-title {
  color: #151C29;
  font-size: 18px;
}
.search-back-dialog p {
  text-align: center;
}
.search-back-dialog p span {
  color: #226EA2;
  cursor: pointer;
}
.search-back-dialog .is-red {
  margin: 20px 0;
}
.add-url-box {
  padding: 0 30px;
}
.search-box {
  text-align: center;
  margin: 10px 0;
}
.search-box .el-input {
  width: 470px;
  margin-right: 15px;
}
.show-box {
  width: 350px;
}
.url-box, .show-box {
  border: 1px solid #e1e4e8;
}
.url-content-box {
  height: 240px;
  overflow-y: scroll;
}
.content-box {
  height: 300px;
  overflow-y: scroll;
}
.content-box-avatar {
  /* width: 50%; */
  padding-left: 20px;
}
.content-box-avatar img {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-right: 5px;
}
.content-box::-webkit-scrollbar,
.url-content-box::-webkit-scrollbar {
  background: transparent;
}
.content-box::-webkit-scrollbar-thumb,
.url-content-box::-webkit-scrollbar-thumb,
.top-line, .alone:hover {
  background: #f7f8fa;
}
.top-line {
  height: 40px;
  color: #3b82fe;
}
.alone {
  height: 45px;
}
.alone i {
  font-size: 18px;
  margin-right: 15px;
}
.alone>p {
  width: 50%;
  text-align: center;
}
.second-add-btn {
  margin: 10px 0;
}
.second-add-del {
  margin-left: 10px;
}
</style>
