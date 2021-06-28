<!--
 * @Author: MaiChao
 * @Date: 2021-03-15 16:17:45
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-06-03 15:06:35
-->
<template>
  <div class="contents">
    <div class="customize account-box">
      <div class="tabs-header">
        <span class="tabs-title">自定义榜单</span>
        <span class="right-btn cursor"
              @click="creadShow()">创建榜单</span>
      </div>
      <div class="conts-box">
        <div class="title-tips">根据有关规定，个人和企业用户，不能对政务类账号进行排榜，请谅解</div>
        <div class="title-name">我的榜单</div>
        <div class="operation">
          <!-- <span class="tabs-button"
                @click="tabsAll('wx', 1)"
                :class="activeTab==='wx'?'isActive':''">微信</span>
          <span class="tabs-button"
                @click="tabsAll('wb', 2)"
                :class="activeTab==='wb'?'isActive':''">微博</span>
          <span class="click-span first-type"
                @click="getDelete">
            <i class="el-icon-circle-close"></i>批量删除</span> -->
          <!-- <span class="click-span last-type">
            <i class="el-icon-document-checked"></i>批量导出</span> -->
          <span class="tabs-button-img"
                @click="tabsAll('wx', 1)"
                :class="activeTab==='wx'?'isActive':''">
            <img :src="wxImg"
                 alt="">
          </span>
          <span class="tabs-button-img"
                @click="tabsAll('wb', 2)"
                :class="activeTab==='wb'?'isActive':''">
            <img :src="wbImg"
                 alt="">
          </span>
          <span class="click-span first-type"
                @click="getDelete">
            <i class="el-icon-circle-close"></i>批量删除</span>
        </div>
        <div class="table-box">
          <el-table :data="tableData"
                    id="wx-monitor"
                    style="width: 100%"
                    ref="deleteItem"
                    @selection-change="handleSelectionChange"
                    :cell-style="{ textAlign: 'center' }"
                    :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column type="selection"
                             width="55">
            </el-table-column>
            <el-table-column prop="rankTitle"
                             label="榜单名称"
                             width="380">
              <template slot-scope='scope'>
                <div class="cursor"
                     @click="routeDetail(scope.row)">
                  {{scope.row.rankTitle}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="count"
                             label="榜单公众号数量"
                             v-if="activeTab==='wx'">
            </el-table-column>
            <el-table-column prop="count"
                             label="榜单账号数量"
                             v-else>
            </el-table-column>
            <el-table-column prop="last_pubtime"
                             label="操作"
                             width="300">
              <template slot-scope='scope'>
                <div class="operate flex-arr-center">
                  <p class="primary cursor"
                     @click="openModify(scope.row)">
                    <i class="el-icon-edit-outline"></i>编辑
                  </p>
                  <p class="export cursor"
                     @click="openAddDialog(scope.row.id)">
                    <i class="el-icon-circle-plus-outline"></i>添加
                  </p>
                  <p class="delete cursor"
                     @click="deleteOneAccess(scope.row.id)">
                    <i class="el-icon-remove-outline"></i>删除
                  </p>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <set-page @pagingChange="pagingChange"
                  :total="total"
                  ref="child"></set-page>
      </div>
    </div>
    <!-- 创建弹框 -->
    <el-dialog title="创建榜单"
               class="create-dialog"
               :visible.sync="create"
               width="30%"
               :close-on-click-modal='false'
               @close="offDialog">
      <el-form :model="ruleForm"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="榜单类型"
                      prop="rankType"
                      class="first-item">
          <el-radio-group v-model="ruleForm.rankType"
                          size="small">
            <el-radio label="1">微信公众号</el-radio>
            <el-radio label="2">微博</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="榜单名称"
                      prop="rankTitle">
          <el-input v-model="ruleForm.rankTitle"
                    size="small"
                    placeholder="请填写榜单名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="upApply('ruleForm')">保存</el-button>
        <el-button @click="offDialog">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹框 -->
    <el-dialog title="确认删除"
               :visible.sync="deleteShow"
               :modal-append-to-body="false"
               :close-on-click-modal='false'
               width="30%"
               center>
      <span class="dialog-span">您确定要执行此操作吗?</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="deleteTeams">确 定</el-button>
        <el-button @click="overDelete">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 榜单修改 -->
    <el-dialog title="榜单修改"
               :visible.sync="modifyVisible"
               :close-on-click-modal='false'
               width="30%"
               @close="offModify">
      <el-form :model="ruleForm"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="名称修改"
                      prop="rankTitle">
          <el-input v-model="ruleForm.rankTitle"
                    size="small"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="upApply('ruleForm')">确认</el-button>
        <el-button @click="offModify">取消</el-button>
      </span>
    </el-dialog>
    <!-- 添加公众号 -->
    <el-dialog title="添加公众号"
               :visible.sync="addAccount"
               :close-on-click-modal='false'
               width="960px"
               center
               class="cust-add-apply"
               @close="offAddAccount">
      <div>
        <!-- 添加搜索公众号 -->
        <div class="add-collect-box">
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
                    <el-button type="primary"
                               @click="queryKeyword">查询</el-button>
                  </div>
                  <div class="flex-bwt">
                    <div class="show-box">
                      <div class="top-line flex-arr-center">搜索结果</div>
                      <div class="flex-arr-center name-box">
                        <p>公众号</p>
                        <p>微信号</p>
                      </div>
                      <div class="content-box">
                        <div class="flex-ali-center alone cursor"
                             v-for="(item,index) in searchList"
                             :key="index"
                             @dblclick="shuttle(item,index)">
                          <div class="content-box-avatar flex-ali-center">
                            <img :src="item.ori_head_img"
                                 alt="">
                            <p>{{item.nickname}}</p>
                          </div>
                          <p>{{item.alias}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="show-box">
                      <div class="top-line flex-arr-center">已添加公众号</div>
                      <div class="flex-arr-center name-box">
                        <p>公众号</p>
                        <p>微信号</p>
                      </div>
                      <div class="content-box">
                        <div class="flex-ali-center alone cursor"
                             v-for="(item,index) in addList"
                             :key="index"
                             @dblclick="unShuttle(item,index)">
                          <div class="content-box-avatar flex-ali-center">
                            <img :src="item.ori_head_img"
                                 alt="">
                            <p>{{item.nickname}}</p>
                          </div>
                          <p>{{item.alias}}</p>
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
                                :rules="{ required: true, message: '链接不能为空', trigger: 'blur' }">
                    <el-input v-model="item.value"
                              placeholder="请输入一篇文章链接"
                              :trigger-on-focus="false"></el-input>
                    <el-button type="danger"
                               @click.prevent="removeItem(item)"
                               class="second-add-del">删除</el-button>
                  </el-form-item>
                </el-form>
                <div class="second-add-btn flex-all-center">
                  <el-button type="success"
                             @click="addUrlInput"
                             :disabled="dateForm.url.length <= 0">添加链接</el-button>
                  <el-button type="primary"
                             @click="queryUrl"
                             :disabled="dateForm.url.length <= 0">查询</el-button>
                  <el-button @click="clearDateForm('dateForm')">清空</el-button>
                </div>
                <div class="flex-ali"
                     v-if="urlData.length > 0">
                  <div class="url-box">
                    <div class="top-line flex-arr-center">搜索结果</div>
                    <div class="flex-arr-center name-box">
                      <span>公众号</span>
                      <span>微信号</span>
                    </div>
                    <div class="url-content-box">
                      <div class="flex-arr-center alone cursor"
                           v-for="(item, index) of urlData"
                           :key="index">
                        <div class="content-box-avatar flex-ali-center">
                          <img :src="item.oriHeadImg"
                               alt="">
                          <p>{{item.nickname}}</p>
                        </div>
                        <p>{{item.alias}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </el-tab-pane>
            <!-- <el-tab-pane label="批量添加"
                         name="third">
              <template>
                <div class="search-box">
                  批量添加
                </div>
              </template>
            </el-tab-pane> -->
            <el-tab-pane label="根据收藏添加"
                         name="collect">
              <el-table :data="collectData"
                        style="width: 100%"
                        @selection-change="handleCollectChange">
                <el-table-column type="selection"
                                 width="55">
                </el-table-column>
                <el-table-column prop="accountName"
                                 label="账号名称"
                                 width="280">
                  <template slot-scope='scope'>
                    <div class="account-infor flex-ali-center">
                      <el-image style="width: 60px; height: 60px"
                                :src="scope.row.headImage"
                                fit="fill">
                        <div slot="error"
                             class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                      <div class="account-name">
                        <p class="import-name"
                           v-html='scope.row.accountName'></p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="accountCode"
                                 label="账号ID">
                </el-table-column>
                <el-table-column prop="createTime"
                                 label="添加时间"
                                 width="220">
                </el-table-column>
              </el-table>
              <set-page @pagingChange="pagingCollect"
                        :total="colTotal"></set-page>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="upAddAccount">确认</el-button>
        <el-button @click="offAddAccount">取消</el-button>
      </span>
    </el-dialog>
    <!-- 微博添加账号 -->
    <el-dialog title="添加账号"
               :visible.sync="addAccountWb"
               :close-on-click-modal='false'
               width="960px"
               center
               class="cust-add-apply"
               @close="offAddAccountWb">
      <div>
        <!-- 添加搜索账号 微博 -->
        <div class="add-collect-box">
          <el-tabs v-model="activeNameWb"
                   @tab-click="handleClickWb">
            <el-tab-pane label="搜索添加"
                         name="firstWb">
              <template>
                <div class="add-box">
                  <div class="search-box">
                    <el-input placeholder="请输入微博号"
                              v-model="keywordWb">
                    </el-input>
                    <el-button type="primary"
                               @click="queryKeywordWb">查询</el-button>
                  </div>
                  <div class="flex-bwt">
                    <div class="show-box">
                      <div class="top-line flex-arr-center">搜索结果</div>
                      <div class="flex-arr-center name-box">
                        <p>微博名称</p>
                        <p>微博号</p>
                      </div>
                      <div class="content-box">
                        <div class="flex-ali-center alone cursor"
                             v-for="(item,index) in searchListWb"
                             :key="index"
                             @dblclick="shuttleWb(item,index)">
                          <div class="content-box-avatar flex-ali-center">
                            <img :src="item.avatar_hd"
                                 alt="">
                            <p>{{item.screen_name}}</p>
                          </div>
                          <p>{{item.uid}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="show-box">
                      <div class="top-line flex-arr-center">已添加微博号</div>
                      <div class="flex-arr-center name-box">
                        <p>微博名称</p>
                        <p>微博号</p>
                      </div>
                      <div class="content-box">
                        <div class="flex-ali-center alone cursor"
                             v-for="(item,index) in addListWb"
                             :key="index"
                             @dblclick="unShuttleWb(item,index)">
                          <div class="content-box-avatar flex-ali-center">
                            <img :src="item.avatar_hd"
                                 alt="">
                            <p>{{item.screen_name}}</p>
                          </div>
                          <p>{{item.uid}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="链接添加"
                         name="secondWb">
              <template>
                <el-form :model="dateFormWb"
                         ref="dateFormWb"
                         class="second-add-form"
                         label-width="90px">
                  <el-form-item prop="email"
                                label="链接">
                    <el-input v-model="dateFormWb.url"
                              placeholder="请输入一篇文章链接"
                              :trigger-on-focus="false"></el-input>
                  </el-form-item>
                  <el-form-item v-for="(item, index) in dateFormWb.toUrlList"
                                :label="'新增链接' + (index+1)"
                                :key="item.key"
                                :prop="'toUrlList.' + index + '.value'"
                                :rules="{ required: true, message: '链接不能为空', trigger: 'blur' }">
                    <el-input v-model="item.value"
                              placeholder="请输入一篇文章链接"
                              :trigger-on-focus="false"></el-input>
                    <el-button type="danger"
                               @click.prevent="removeItemWb(item)"
                               class="second-add-del">删除</el-button>
                  </el-form-item>
                </el-form>
                <div class="second-add-btn flex-all-center">
                  <el-button type="success"
                             @click="addUrlInputWb"
                             :disabled="dateFormWb.url.length <= 0">添加链接</el-button>
                  <el-button type="primary"
                             @click="queryUrlWb"
                             :disabled="dateFormWb.url.length <= 0">查询</el-button>
                  <el-button @click="clearDateFormWb('dateFormWb')">清空</el-button>
                </div>
                <div class="flex-ali"
                     v-if="urlDataWb.length > 0">
                  <div class="url-box">
                    <div class="top-line flex-arr-center">搜索结果</div>
                    <div class="flex-arr-center name-box">
                      <span>微博名称</span>
                      <span>微博号</span>
                    </div>
                    <div class="url-content-box">
                      <div class="flex-arr-center alone cursor"
                           v-for="(item, index) of urlDataWb"
                           :key="index">
                        <div class="content-box-avatar flex-ali-center">
                          <img :src="item.avatarHd"
                               alt="">
                          <p>{{item.screenName}}</p>
                        </div>
                        <p>{{item.uid}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="根据收藏添加"
                         name="collectWb">
              <el-table :data="collectDataWb"
                        style="width: 100%"
                        @selection-change="handleCollectChangeWb">
                <el-table-column type="selection"
                                 width="55">
                </el-table-column>
                <el-table-column prop="accountName"
                                 label="账号名称"
                                 width="280">
                  <template slot-scope='scope'>
                    <div class="account-infor flex-ali-center">
                      <el-image style="width: 60px; height: 60px"
                                :src="scope.row.headImage"
                                fit="fill">
                        <div slot="error"
                             class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                      <div class="account-name">
                        <p class="import-name"
                           v-html='scope.row.accountName'></p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="accountCode"
                                 label="账号ID">
                </el-table-column> -->
                <el-table-column prop="description"
                                 label="简介">
                </el-table-column>
                <el-table-column prop="createTime"
                                 label="添加时间"
                                 width="220">
                </el-table-column>
              </el-table>
              <set-page @pagingChange="pagingCollectWb"
                        :total="colTotalWb"></set-page>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="upAddAccountWb">确认</el-button>
        <el-button @click="offAddAccountWb">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

export default {
  data () {
    return {
      wxImg: require('@/assets/images/assess/wx.png'),
      wbImg: require('@/assets/images/assess/wb.png'),
      dateForm: {
        url: '',
        toUrlList: []
      },
      dateFormWb: {
        url: '',
        toUrlList: []
      },
      collectData: [], // 收藏账号列表
      collectDataWb: [], // 收藏账号列表 wb
      activeName: 'first',
      activeNameWb: 'firstWb',
      textarea: '', // 链接添加
      urlData: [], // 根据url查询到的列表
      urlDataWb: [], // 根据url查询到的列表 wb
      keyword: '', // 根据账号搜索
      keywordWb: '', // 根据账号搜索wb
      searchList: [], // 根据账号查询到的列表
      searchListWb: [], // 根据账号查询到的列表 wb
      addList: [], // 根据账号查询添加后的列表
      addListWb: [], // 根据账号查询添加后的列表 wb
      deleteShow: false, // 删除字段
      deleteItem: [], // 删除内容
      selItems: [], // 批量删除内容
      isDelBatch: false, // 确认是批量删除的标识
      modifyVisible: false, // 榜单修改
      addAccount: false, // 添加账号
      addAccountWb: false, // 添加微博账号
      addId: '', // 要添加账号的榜单ID
      addIdWb: '', // 要添加账号的榜单ID  wb
      collectSelect: [], // 已选择的收藏的账号
      collectSelectWb: [], // 已选择的收藏的账号 wb
      ruleForm: {
        rankType: '1',
        rankTitle: '',
        id: ''
      },
      form: { // 榜单列表
        pageNum: 1,
        pageSize: 10,
        rankType: '1'
      },
      collectForm: {
        pageNum: 1,
        pageSize: 10
      },
      collectFormWb: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      colTotal: 0,
      colTotalWb: 0,
      create: false, // 创建弹框字段
      activeTab: 'wx', // 微信/微博字段
      tableData: [] // 表格字段
    }
  },
  methods: {
    pagingChange (query) {
      this.form.pageSize = query.size
      this.form.pageNum = query.page
      this.getCustList()
    },
    pagingCollect (query) {
      this.collectForm.pageSize = query.size
      this.collectForm.pageNum = query.page
      this.getCollect()
    },
    // 外部
    pagingCollectWb (query) {
      this.collectFormWb.pageSize = query.size
      this.collectFormWb.pageNum = query.page
      this.getCollectWb()
    },
    // 展示创建弹框
    creadShow () {
      console.log(this.ruleForm)
      this.create = true
    },
    // 创建榜单  确认修改榜单名称
    upApply (formName) {
      if (!this.ruleForm.rankTitle.trim()) {
        return this.$message.warning('榜单名称不能为空!')
      }
      this.$http.post(this.$api.addRanking, this.ruleForm)
        .then(res => {
          this.$message.success('操作成功!')
          this.create = false
          this.modifyVisible = false
          this.$refs[formName].resetFields()
          this.getCustList()
          this.ruleForm.rankType = '1'
          this.ruleForm.rankTitle = ''
        }).catch(() => { })
    },
    // 取消创建榜单
    offDialog () {
      this.ruleForm.rankType = '1'
      this.ruleForm.rankTitle = ''
      this.create = false
    },
    // 打开修改榜单名称dialog
    openModify (item) {
      console.log(item)
      this.ruleForm.rankType = item.rankType
      this.ruleForm.rankTitle = item.rankTitle
      this.ruleForm.id = item.id
      this.modifyVisible = true
    },
    // 取消榜单修改
    offModify () {
      this.ruleForm.rankType = '1'
      this.ruleForm.rankTitle = ''
      this.ruleForm.id = ''
      this.modifyVisible = false
    },
    // 删除某一个榜单
    deleteOneAccess (id) {
      this.deleteShow = true
      this.deleteItem.push(id)
    },
    // 获取删除元素
    handleSelectionChange (val) {
      this.selItems = val
    },
    // 点击批量删除
    getDelete () {
      if (this.selItems.length >= 1) {
        this.deleteShow = true
        this.isDelBatch = true
      } else {
        this.$message.warning('请至少选择一条需要删除的数据！')
      }
    },
    // 取消删除
    overDelete () {
      this.deleteShow = false
      this.isDelBatch = false
      this.deleteItem = []
      this.selItems = []
    },
    // 确定删除
    deleteTeams () {
      let ids = []
      if (this.selItems.length > 0 && this.isDelBatch) {
        for (let i = 0; i < this.selItems.length; i++) {
          ids.push(this.selItems[i].id)
        }
      } else {
        ids = this.deleteItem
      }
      this.$http.post(this.$api.batchDelete, { ids: ids })
        .then(res => {
          this.$message.success('操作成功!')
          this.overDelete()
          this.getCustList()
        }).catch(() => { })
    },
    // 打开添加公众号dialog
    openAddDialog (id) {
      // this.addId = id
      // this.addAccount = true
      // this.addAccountWb = true

      if (this.activeTab === 'wx') {
        this.addId = id
        this.addAccount = true
      } else {
        this.addIdWb = id
        this.addAccountWb = true
      }
    },
    // 取消添加公众号
    offAddAccount () {
      this.addAccount = false
      this.activeName = 'first'
      this.addId = ''
      this.keyword = ''
      this.searchList = []
      this.addList = []
      this.textarea = ''
      this.urlData = []
      this.collectSelect = []
    },
    // 取消添加微博
    offAddAccountWb () {
      this.addAccountWb = false
      this.activeNameWb = 'firstWb'
      this.addIdWb = ''
      this.keywordWb = ''
      this.searchListWb = []
      this.addListWb = []
      this.textareaWb = ''
      this.urlDataWb = []
      this.collectSelectWb = []
      // this.collectDataWb = []
      // this.colTotalWb = 0
    },
    handleClick (tab) {
      console.log(tab.name)
      if (tab.name === 'collect') {
        this.getCollect()
      }
      this.activeName = tab.name
      this.keyword = ''
      this.searchList = []
      this.addList = []
      this.dateForm.url = ''
      this.dateForm.toUrlList = []
      this.urlData = []
      this.collectSelect = []
    },
    // wb
    handleClickWb (tab) {
      console.log(tab.name)
      if (tab.name === 'collectWb') {
        this.getCollectWb()
      }
      this.activeNameWb = tab.name
      this.keywordWb = ''
      this.searchListWb = []
      this.addListWb = []
      this.dateFormWb.url = ''
      this.dateFormWb.toUrlList = []
      this.urlDataWb = []
      this.collectSelectWb = []
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
          }).catch(() => { })
      } else {
        this.$message.warning('请输入公众号名称或微信号')
      }
    },
    // 根据账号搜索  微博
    queryKeywordWb () {
      if (this.keywordWb) {
        this.$http.post(this.$api.getByKeyWb, { keyword: this.keywordWb })
          .then(res => {
            if (res.data.data.account.length <= 0) {
              this.$message.warning('请更换关键词')
              this.searchListWb = []
            } else {
              this.searchListWb = res.data.data.account
            }
          }).catch(() => { })
      } else {
        this.$message.warning('请输入微博!')
      }
    },
    // 增加链接
    addUrlInput () {
      this.dateForm.toUrlList.push({
        value: '',
        key: Date.now()
      })
    },
    // 增加链接->wb
    addUrlInputWb () {
      this.dateFormWb.toUrlList.push({
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
    // 删除链接-->wb
    removeItemWb (item) {
      let index = this.dateFormWb.toUrlList.indexOf(item)
      this.dateFormWb.toUrlList[index].value = ''
      if (index !== -1) {
        this.dateFormWb.toUrlList.splice(index, 1)
      }
    },
    // 清空链接
    clearDateForm (dateForm) {
      this.dateForm.url = ''
      this.$refs[dateForm].resetFields()
    },
    // 清空链接-->wb
    clearDateFormWb (dateForm) {
      this.dateFormWb.url = ''
      this.$refs[dateForm].resetFields()
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
              let reUrl = ''
              for (let index = 0; index < datas.length; index++) {
                if (Number(datas[index].isCollect) === 1) {
                  urlArr.push({
                    nickname: datas[index].nickname,
                    alias: datas[index].alias,
                    biz: datas[index].biz,
                    oriHeadImg: datas[index].oriHeadImg
                  })
                } else {
                  reUrl += datas[index].nickname + ' '
                }
              }
              if (reUrl.length > 0) {
                this.$message.warning(reUrl + '暂时无法进行排榜，敬请谅解')
              }
              this.urlData = this.unique(urlArr)
            } else {
              this.$message.warning('请检查链接是否正确')
            }
          }).catch(() => { })
      } else {
        this.$message.warning('请输入文章链接')
      }
    },
    // 根据Url搜索-->wb
    queryUrlWb () {
      if (this.dateFormWb.url) {
        let urls = []
        urls.push(this.dateFormWb.url)
        if (this.dateFormWb.toUrlList.length > 0) {
          for (let i = 0; i < this.dateFormWb.toUrlList.length; i++) {
            if (urls.indexOf(this.dateFormWb.toUrlList[i].value) === -1) {
              urls.push(this.dateFormWb.toUrlList[i].value)
            }
          }
        }
        this.$http.post(this.$api.accountUrlsWb, { urls: urls })
          .then(res => {
            if (res.data.data.length > 0) {
              let datas = res.data.data
              console.log(datas)
              let urlArr = []
              let reUrl = ''
              for (let index = 0; index < datas.length; index++) {
                if (Number(datas[index].isCollect) === 1) {
                  urlArr.push({
                    screenName: datas[index].screenName,
                    uid: datas[index].uid,
                    avatarHd: datas[index].avatarHd
                  })
                } else {
                  reUrl += datas[index].screenName + ' '
                }
              }
              if (reUrl.length > 0) {
                this.$message.warning(reUrl + '暂时无法进行排榜，敬请谅解')
              }
              console.log(urlArr)
              this.urlDataWb = this.uniqueWb(urlArr)
              console.log(this.urlDataWb)
            } else {
              this.$message.warning('请检查链接是否正确')
            }
          }).catch(() => { })
      } else {
        this.$message.warning('请输入文章链接')
      }
    },
    unique (arr) {
      const res = new Map()
      return arr.filter((a) => !res.has(a.biz) && res.set(a.biz, 1))
    },
    uniqueWb (arr) {
      const res = new Map()
      return arr.filter((a) => !res.has(a.uid) && res.set(a.uid, 1))
    },
    // 添加公众号
    shuttle (item, index) {
      if (Number(item.is_collect) === 1) {
        if (this.addList.length > 0) {
          for (let i = 0; i < this.addList.length; i++) {
            if (this.addList[i].biz === item.biz) {
              this.$message.warning('已经添加过' + item.nickname)
              return
            }
          }
        }
        this.searchList.splice(index, 1)
        this.addList.push(item)
      } else {
        this.$message.warning('此账号暂时无法进行排榜，敬请谅解。')
      }
    },
    // 添加wb
    shuttleWb (item, index) {
      if (Number(item.is_collect) === 1) {
        if (this.addListWb.length > 0) {
          for (let i = 0; i < this.addListWb.length; i++) {
            if (this.addListWb[i].biz === item.biz) {
              console.log(item)
              this.$message.warning('已经添加过' + item.screen_name)
              return
            }
          }
        }
        this.searchListWb.splice(index, 1)
        this.addListWb.push(item)
      } else {
        this.$message.warning('此账号暂时无法进行排榜，敬请谅解。')
      }
    },
    // 取消添加公众号
    unShuttle (item, index) {
      if (this.searchList.length > 0) {
        for (let i = 0; i < this.searchList.length; i++) {
          if (this.searchList[i].biz === item.biz) {
            this.addList.splice(index, 1)
            return
          }
        }
      }
      this.addList.splice(index, 1)
      this.searchList.push(item)
    },
    // 取消添加wb
    unShuttleWb (item, index) {
      if (this.searchListWb.length > 0) {
        for (let i = 0; i < this.searchListWb.length; i++) {
          if (this.searchListWb[i].biz === item.biz) {
            this.addListWb.splice(index, 1)
            return
          }
        }
      }
      this.addListWb.splice(index, 1)
      this.searchListWb.push(item)
    },
    // 获取选中收藏的公众号
    handleCollectChange (val) {
      console.log(val)
      this.collectSelect = val
    },
    // 获取选中收藏的微博
    handleCollectChangeWb (val) {
      console.log(val)
      this.collectSelectWb = val
    },
    // 确认添加公众号
    upAddAccount () {
      let bizList = []
      let bizName = []
      if (this.activeName === 'first') {
        for (let i = 0; i < this.addList.length; i++) {
          bizList.push(this.addList[i].biz)
          bizName.push(this.addList[i].nickname)
        }
      } else if (this.activeName === 'collect') {
        for (let i = 0; i < this.collectSelect.length; i++) {
          bizList.push(this.collectSelect[i].accountCode)
          bizName.push(this.collectSelect[i].accountName)
        }
      } else if (this.activeName === 'second') {
        for (let i = 0; i < this.urlData.length; i++) {
          bizList.push(this.urlData[i].biz)
          bizName.push(this.urlData[i].nickname)
        }
      }
      let obj = {
        bizArray: bizList,
        bizName: bizName,
        rankingUserId: this.addId
      }
      if (obj.bizArray.length > 0) {
        this.$http.post(this.$api.bizAddRanking, obj)
          .then(res => {
            // this.$message.success('添加成功')
            // this.addAccount = false
            // this.addId = ''
            // this.getCustList()
            if (res.data.data.code == '200') {
              if (res.data.data.data) {
                this.$message.success(res.data.data.data)
                this.addAccount = false
                this.addId = ''
                this.getCustList()
              } else {
                this.$message.success('添加成功')
                this.addAccount = false
                this.addId = ''
                this.getCustList()
              }
            }
          }).catch(() => { })
      } else {
        this.$message.warning('请选择公众号!')
      }
    },
    // 确认添加微博
    upAddAccountWb () {
      let bizList = []
      let bizName = []
      if (this.activeNameWb === 'firstWb') {
        for (let i = 0; i < this.addListWb.length; i++) {
          bizList.push(this.addListWb[i].uid)
          bizName.push(this.addListWb[i].screen_name)
        }
      } else if (this.activeNameWb === 'collectWb') {
        for (let i = 0; i < this.collectSelectWb.length; i++) {
          bizList.push(this.collectSelectWb[i].accountCode)
          bizName.push(this.collectSelectWb[i].accountName)
        }
      } else if (this.activeNameWb === 'secondWb') {
        for (let i = 0; i < this.urlDataWb.length; i++) {
          bizList.push(this.urlDataWb[i].uid)
          bizName.push(this.urlDataWb[i].screenName)
        }
      }
      let obj = {
        bizArray: bizList,
        bizName: bizName,
        rankingUserId: this.addIdWb
      }
      // console.log(obj)
      if (obj.bizArray.length > 0) {
        this.$http.post(this.$api.bizAddRanking, obj)
          .then(res => {
            console.log(res, res.data.data)
            console.log(res.data.code, res.data.data.data)
            if (res.data.code == '200') {
              if (res.data.data.data) {
                this.$message.success(res.data.data.data)
                this.addAccountWb = false
                this.addIdWb = ''
                this.getCustList()
              } else {
                this.$message.success('添加成功')
                this.addAccountWb = false
                this.addIdWb = ''
                this.getCustList()
              }
            }
          }).catch(() => { })
      } else {
        this.$message.warning('请选择微博!')
      }
    },
    routeDetail (row) {
      // this.$router.push({ name: 'CustimizeDetail', query: { id: row.id } })
      if (this.activeTab === 'wx') {
        this.$router.push({ name: 'CustimizeDetail', query: { id: row.id } })
      } else {
        this.$router.push({ name: 'CustimizeWbDetail', query: { id: row.id } })
      }
    },
    // 切换微信微博
    tabsAll (row, index) {
      console.log(this.ruleForm)
      console.log(row, index)
      this.activeTab = row
      this.form.rankType = index
      this.form.pageNum = 1
      this.getCustList()
      console.log(this.ruleForm)
    },
    // 获取收藏列表
    getCollect () {
      let obj = {
        type: 1,
        rankingUserId: this.addId,
        pageNum: this.collectForm.pageNum,
        pageSize: this.collectForm.pageSize
      }
      this.$http.post(this.$api.getCollect, obj)
        .then(res => {
          this.collectData = res.data.data.content
          this.colTotal = res.data.data.totalElements
        }).catch(() => { })
    },
    getCollectWb () {
      let obj = {
        type: 2,
        rankingUserId: this.addIdWb,
        pageNum: this.collectFormWb.pageNum,
        pageSize: this.collectFormWb.pageSize
      }
      this.$http.post(this.$api.getCollect, obj)
        .then(res => {
          this.collectDataWb = res.data.data.content
          this.colTotalWb = res.data.data.totalElements
        }).catch(() => { })
    },
    // 获取自定义榜单列表
    getCustList () {
      this.$http.post(this.$api.userData, this.form)
        .then(res => {
          this.tableData = res.data.data.content
          this.total = res.data.data.totalElements
        }).catch(() => { })
    },
    listenerSubmit (e) {
      if (e.keyCode === 13) {
        this.queryKeyword()
      }
    }
  },
  created () {
    this.getCustList()
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
.cust-add-apply .el-dialog__body {
  min-height: 540px;
}
.cust-add-apply .el-tabs__nav-wrap::after {
  background-color: #ffffff;
}
.cust-add-apply .el-dialog--center .el-dialog__body {
  padding: 20px;
}
.add-collect-box .el-table {
  margin-top: -5px;
}
.second-add-form .el-input {
  width: 85%;
  margin: 10px 0;
}
.second-add-form .el-form-item__error {
  padding: 0;
  top: 90%;
}
</style>
<style lang="scss" scoped>
@import './assess.css';
.right-btn {
  font-size: 14px;
  color: #fff;
  background-color: #f79406;
  border-radius: 10px;
  padding: 5px 12px;
}
.title-tips {
  color: #f89408;
  font-size: 14px;
  line-height: 55px;
}
.title-name {
  color: #252934;
  font-size: 16px;
}
.title-name::before {
  width: 4px;
  height: 18px;
  content: '';
  float: left;
  margin-right: 10px;
  margin-top: 2px;
  background: #498bfe;
}
.operation {
  width: 300px;
  margin: 25px 0px;
  padding: 10px 10px;
  border: 1px solid #dadada;
}
.tabs-button,
.cust-add-head span {
  display: inline-block;
  cursor: pointer;
  border: 1px solid #dadada;
  color: #8a8c92;
  font-size: 14px;
  padding: 7px 30px;
}
.tabs-button-img {
  display: inline-block;
  cursor: pointer;
  border: 1px solid white;
  color: #8a8c92;
  // font-size: 14px;
  // padding: 7px 30px;
  margin-right: 10px;
}
.tabs-button-img img {
  width: 40px;
  height: 40px;
  padding: 5px 10px;
}
.tabs-button-img.isActive {
  color: #3b81fe;
  border-color: #3b81fe;
}
.tabs-button.isActive {
  color: #3b81fe;
  border-color: #3b81fe;
}
.first-type {
  margin-left: 40px;
}
.click-span i {
  margin-right: 8px;
}
.demo-ruleForm {
  width: 80%;
  margin: 0 auto;
}
.demo-ruleForm .el-form-item {
  max-width: 380px;
}
.demo-ruleForm .first-item,
.cust-add-head {
  margin-bottom: 20px;
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
  width: 420px;
}
.url-box,
.show-box {
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
  width: 50%;
  padding-left: 40px;
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
.top-line,
.alone:hover {
  background: #f7f8fa;
}
.top-line,
.name-box {
  height: 40px;
}
.alone {
  height: 45px;
}
.alone > p {
  width: 50%;
  padding: 10px 0;
  text-align: center;
}
.name-box {
  color: #3b82fe;
  border-bottom: 1px solid #e1e4e8;
}
.second-add-btn {
  margin: 10px 0;
}
.second-add-del {
  margin-left: 10px;
}
.import-name {
  width: 120px;
}
.account-infor {
  justify-content: center;
}
</style>
