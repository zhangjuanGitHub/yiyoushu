<!--
 * @Author: zhangjuan
 * @Date: 2021-04-29 15:08:54
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-07-02 15:00:48
-->
<template>
  <div class="account">
    <div class="flex-just-center account-show">
      <div class="menu-warp">
        <v-menu></v-menu>
      </div>
      <div class="account-company-warp">
        <div class="tabs-header">
          <span class="tabs-title"
                @click="tabsAll('account',1)"
                :class="this.activeTab==='account'?'isActive':''">账号信息</span>
          <span class="tabs-title"
                @click="tabsAll('article',2)"
                :class="this.activeTab==='article'?'isActive':''">文章信息</span>
        </div>
        <div class="whole-main"
             v-if="show2">
          <div class="flex-ali-center">
            <p class="tit">类别</p>
            <p v-for="(item, index) of classList"
               @click="categoryFun(index,item)"
               :key="index"
               :class="{'active': currentSort == index}"
               class="noActive">{{item}}</p>
          </div>
          <div class="flex-ali-center">
            <p class="tit">职能</p>
            <p v-for="(item, index) of functionList"
               :key="index"
               @click="functionFun(index,item)"
               :class="{'active': currentSort2 == index}"
               class="noActive">{{item}}</p>
          </div>
          <div class="flex-ali-center">
            <el-form ref="ruleForm"
                     :inline="true"
                     :model="ruleForm">
              <el-form-item prop="districts"
                            class="area"
                            label="地区">
                <el-cascader size="mini"
                             :options="options"
                             :show-all-levels="false"
                             :props="{ checkStrictly: true }"
                             v-model="districts"
                             placeholder="请选择地区"
                             class="range"></el-cascader>
              </el-form-item>
              <el-form-item class="number"
                            prop="data"
                            label="时间">
                <el-date-picker v-model="publishTime"
                                size="mini"
                                type="daterange"
                                value-format='yyyy-MM-dd'
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                class="sear_date">
                </el-date-picker>
              </el-form-item>
              <el-form-item class="sort"
                            label="排序"
                            v-if="this.activeTab === 'article'">
                <el-cascader v-model="sortValue"
                             :options="sortOptions"
                             @change="handleChange"
                             size="mini"
                             class="range"></el-cascader>
              </el-form-item>
              <div v-if="this.activeTab === 'article'">
                <el-form-item label="范围"
                              v-if="this.activeTab === 'article'">
                  <el-select v-model="ruleForm2.queryScope"
                             placeholder="请选择"
                             size="mini"
                             class="range">
                    <el-option v-for="item in range"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="keyword">
                  <el-input size="mini"
                            v-model="ruleForm.queryText"
                            placeholder="请输入关键字"></el-input>
                </el-form-item>
                <el-form-item class="search">
                  <el-button size="mini"
                             @click="searchList"
                             type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button size="mini"
                             @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
                <el-form-item>
                  <p><span class="records2">找到</span><span class="records">{{records}}</span><span class="records2">条记录</span></p>
                  <!--                <span class="records"><span class="records2">找到</span>{{records}}</span><span class="records2">条记录</span>-->
                </el-form-item>
              </div>

              <!-- <el-form-item label="范围"
                            v-if="this.activeTab === 'article'">
                <el-select v-model="ruleForm2.queryScope"
                           placeholder="请选择"
                           size="mini"
                           class="range">
                  <el-option v-for="item in range"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item prop="keyword" v-if="this.activeTab === 'account'">
                <el-input size="mini"
                          v-model="ruleForm.queryText"
                          placeholder="请输入关键字"></el-input>
              </el-form-item>
              <el-form-item class="search" v-if="this.activeTab === 'account'">
                <el-button size="mini"
                           @click="searchList"
                           type="primary">查询</el-button>
              </el-form-item>
              <el-form-item v-if="this.activeTab === 'account'">
                <el-button size="mini"
                           @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
              <el-form-item v-if="this.activeTab === 'account'">
                <p><span class="records2">找到</span><span class="records">{{records}}</span><span class="records2">条记录</span></p>
                <!--                <span class="records"><span class="records2">找到</span>{{records}}</span><span class="records2">条记录</span>-->
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="flex-ali-center tabs-content"
             v-if="show2">
          <div v-if="activeTab === 'account'"
               class="table-all">
            <div class="interaction-table">
              <el-table :data="tableData"
                        style="width: 100%"
                        border
                        id="wx-monitor"
                        :cell-style="{ textAlign: 'center' }">
                <el-table-column prop="ranking"
                                 label="排名"
                                 width="80">
                </el-table-column>
                <el-table-column label="账号信息"
                                 width="300">
                  <template slot-scope='scope'>
                    <div class="account-msg-box flex-ali-center cursor">
                      <img :src="scope.row.cover || undefinedUrl "
                           alt="" @click="targetUrl(scope.row.biz)">
                      <div class="account-msg">
                        <p class="lin-clamp-1"
                           v-html="scope.row.nickname" @click="targetUrl(scope.row.biz)"></p>
                        <p class="lin-clamp-1 wxh" @click="targetUrl(scope.row.biz)">微信号：<span>{{scope.row.alias}}</span></p>
                        <p v-if="scope.row.auth_info" class="lin-clamp-1 rz" @click="goUrl(scope.row.auth_info)">认证：<img src="@/assets/images/monitor/rz4.png"><span>{{scope.row.auth_info}}</span></p>
                        <p v-else class="lin-clamp-1">认证：<img src="@/assets/images/monitor/rz4.png"><span>暂无认证主体</span></p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="publishTotal"
                                 label="发文总数">
                </el-table-column>
                <el-table-column prop="readNum"
                                 label="阅读总数">
                </el-table-column>
                <el-table-column prop="oldLikeNum"
                                 label="点赞总数">
                </el-table-column>
                <el-table-column prop="likeNum"
                                 label="在看总数">
                </el-table-column>
                <el-table-column prop="total_score"
                                 label="易指数">
                  <template slot="header">
                    <span>易指数</span>
                    <el-tooltip class="item"
                                effect="dark"
                                content="易指数是用来衡量新媒体的传播能力，它是公信力、影响力、传播力、引导力这四项指标的综合标量数值。"
                                placement="top">
                      <i class="el-icon-question"></i>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="发布情况">
                  <template slot-scope="scope">
                    <div class="account-pro-box">
                      <el-progress :percentage="getPercentage(scope.row.dayNum)"
                                   :color="getPerColor(scope.row.dayNum)"
                                   :show-text="false"></el-progress>
                      <p><span>{{computedNum(scope.row.dayNum)}}</span></p>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div v-else>
            <div>
              <ul>
                <li class="more-hot-li flex-ali-center"
                    v-for="(item, index) in centerList"
                    :key="index">
                  <div class="more-cover-box">
                    <img :src="item.cover"
                         alt="封面"
                         @click="Websock(item.url,index)">
                  </div>
                  <div class="more-hot-main">
                    <p @click="Websock(item.url,index)"
                       class="cursor"
                       v-html="item.title"></p>
                    <p class="lin-clamp-3 cursor"
                       @click="Websock(item.url,index)"
                       v-html="item.content"></p>
                    <div class="flex-bwt-center">
                      <p>
                        <span v-html="item.nickname"
                              class="nickname cursor"
                              @click="targetUrl(item.biz)"></span>
                        <span>{{item.last_pubtime}}</span>
                      </p>
                      <div class="flex-ali-center">
                        <img src="@/assets/images/home/icon_1.png"
                             alt="">
                        <p>阅读数：<span v-html="item.read_num >= 100000 ? '10万+' : item.read_num"
                                class="num_p"></span></p>
                        <img src="@/assets/images/home/icon_2.png"
                             alt=""
                             style="margin-top: -3px">
                        <p>点赞数：<span v-html="item.old_like_num >= 100000 ? '10万+' : item.old_like_num"
                                class="num_p"></span></p>
                        <img src="@/assets/images/home/icon_3.png"
                             alt="">
                        <p>在看数：<span v-html="item.like_num >= 100000 ? '10万+' : item.like_num"
                                class="num_p"></span></p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-if="noData"
             class="flex-cloumn-cen account-list-undefined">
          <img src="@/assets/images/search/undefined.png"
               alt="">
          <p>抱歉，没有找到关于“<span>{{ruleForm2.queryText}}</span>”的结果。</p>
          <!-- <el-button plain>换个词试试？您也可以 -->
          <!-- <span class="is_red cursor"
                  @click="$router.push({ name: 'AddAccount' })">添加喜欢的公众号</span></el-button> -->
        </div>
        <set-page @pagingChange="pagingChange"
                  :total="total"
                  ref="child"></set-page>
      </div>
    </div>
  </div>
</template>
<script>
import vMenu from '@/views/monitor/components/Menu'
import { timeFormat } from '@/lib/tools'
export default {
  data () {
    return {
      show2: false,
      noData: false, // 无数据
      currentSort: 0,
      currentSort2: 0,
      warningMessage: null, // 消息提示
      targetRouteName: '', // 如果没有认证单位或者没有关注账号跳转到相应页面
      undefinedUrl: require('@/assets/images/home/avatar.png'),
      activeTab: 'account',
      activeTab2: 'account',
      category: 'category',
      total: 0,
      isSearched: true, // 是否查询到
      allClass: [],
      classList: [], // 类别
      functionList: [], // 职能
      options: [],
      districts: [], // 地区
      publishTime: [],
      ruleForm: {
        category: '', // 类别
        function: '', // 职能
        province: '', // 省
        city: '', // 城市
        region: '', // 区
        data: '',
        queryText: '', // 关键词
        pageBean: {
          pageSize: 10,
          pageNum: 1
        },
        startTime: '',
        endTime: ''
      },
      ruleForm2: {
        category: '', // 类别
        function: '', // 职能
        province: '', // 省
        city: '', // 城市
        region: '', // 区
        sortField: '',
        sort: '',
        queryText: '', // 关键词
        pageBean: {
          pageSize: 10,
          pageNum: 1
        },
        startTime: '',
        endTime: '',
        queryScope: '0'
      },
      records: 0,
      centerList: [],
      tableData: [],
      // 排序
      sortValue: [],
      sortOptions: [{
        value: 'last_pubtime',
        label: '时间',
        children: [{
          value: 'asc',
          label: '正序'
        }, {
          value: 'desc',
          label: '倒序'
        }]
      },
      {
        value: 'read_num',
        label: '阅读数',
        children: [{
          value: 'asc',
          label: '正序'
        }, {
          value: 'desc',
          label: '倒序'
        }]
      }, {
        value: 'old_like_num',
        label: '点赞数',
        children: [{
          value: 'asc',
          label: '正序'
        }, {
          value: 'desc',
          label: '倒序'
        }]
      }, {
        value: 'like_num',
        label: '在看数',
        children: [{
          value: 'asc',
          label: '正序'
        }, {
          value: 'desc',
          label: '倒序'
        }]
      }],
      range: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '标题'
        }, {
          value: '2',
          label: '内容'
        }, {
          value: '3',
          label: '昵称'
        }
      ],
      time: ''// 带到同主体账号的时间
    }
  },
  computed: {
    computedNum () {
      return function (params) {
        let value
        switch (params) {
          case -1:
            value = '长时间未更新'
            break
          case 0:
            value = '今天更新'
            break
          case 1:
            value = '昨天更新'
            break
          case 2:
            value = '前天更新'
            break
          default:
            value = params + '天未更新'
            break
        }
        return value
      }
    },
    getPercentage () {
      return function (day) {
        day = day === 7 ? 6 : day
        let calc = Number(Math.abs(((1 - (day / 7)) * 100).toFixed(0)))
        let value
        if (calc >= 100) {
          value = 100
        } else {
          value = calc
        }
        return value
      }
    },
    getPerColor () {
      return function (day) {
        let value
        if (day === -1) {
          value = '#F56C6C'
        } else if (day < 3) {
          value = '#67C23A'
        } else if (day < 6) {
          value = '#E6A23C'
        } else {
          value = '#F56C6C'
        }
        return value
        // Number(scope.row.dayNum) < 3 ? '#67C23A' : (Number(scope.row.dayNum) < 6 ? '#E6A23C' : '#F56C6C')
      }
    }
  },
  created () {
    this.getCurrentTime()
    this.rankType()
    this.getClass()
  },
  methods: {
    // 默认时间
    calcDate (num) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * num)
      return date
    },
    getCurrentTime () {
      let end = this.calcDate(0)
      let start = this.calcDate(30)
      this.publishTime[0] = timeFormat(start)
      this.publishTime[1] = timeFormat(end)
    },
    // tab
    tabsAll (name, level) {
      this.activeTab = name
      this.publishTime = []
      this.sortValue = []
      this.ruleForm = {
        category: '', // 类别
        function: '', // 职能
        province: '', // 省
        city: '', // 城市
        region: '', // 区
        data: '',
        queryText: '', // 关键词
        pageBean: {
          pageSize: 10,
          pageNum: 1
        },
        endTime: '',
        startTime: ''
      }
      this.ruleForm2 = {
        category: '', // 类别
        function: '', // 职能
        province: '', // 省
        city: '', // 城市
        region: '', // 区
        sortField: '',
        sort: '',
        queryText: '', // 关键词
        pageBean: {
          pageSize: 10,
          pageNum: 1
        },
        startTime: '',
        endTime: '',
        queryScope: '0'
      }
      this.classList = this.allClass.data
      this.functionList = this.allClass[this.allClass.data[0]]
      console.log(this.functionList)
      this.ruleForm.category = this.classList[0]
      this.ruleForm.function = this.functionList[0]
      this.ruleForm2.category = this.classList[0]
      this.ruleForm2.function = this.functionList[0]
      this.currentSort = 0
      this.currentSort2 = 0
      this.districts = []
      this.getCurrentTime()
      // console.log(level)
      this.$refs.child.handleCurrentChange(1)
    },
    // 类别
    categoryFun (index, item) {
      console.log('类别', index, item)
      this.ruleForm.category = item
      this.ruleForm2.category = item
      this.currentSort = index
      // if (index === 1) {
      //   // this.ruleForm.function = this.functionList[5]
      //   // this.ruleForm2.function = this.functionList[5]
      //   this.ruleForm.function = this.allClass[item][0]
      // }
      this.ruleForm.function = this.allClass[item][0]
      this.ruleForm2.function = this.allClass[item][0]
      this.functionList = this.allClass[item]
      this.currentSort2 = 0
      // if (this.currentSort === 1) {
      //   this.currentSort2 = 5
      // }
      this.$refs.child.handleCurrentChange(1)
    },
    // 职能
    functionFun (index, item) {
      // console.log(index)
      // console.log(item)
      this.ruleForm.function = item
      this.ruleForm2.function = item
      this.currentSort2 = index
      // console.log(this.ruleForm)
      this.$refs.child.handleCurrentChange(1)
    },
    // 获取类别
    getClass () {
      this.$http.get(this.$api.classification)
        .then(res => {
          if (res.data.code === 200) {
            // this.classList = res.data.data.categoryList
            // this.functionList = res.data.data.functionList
            // this.ruleForm.category = this.classList[0]
            // this.ruleForm.function = this.functionList[0]
            // this.ruleForm2.category = this.classList[0]
            // this.ruleForm2.function = this.functionList[0]
            // this.getAccountList()

            this.allClass = res.data.data
            console.log(this.allClass)
            this.classList = res.data.data.data
            this.functionList = res.data.data[res.data.data.data[0]]
            this.ruleForm.category = this.classList[0]
            this.ruleForm.function = this.functionList[0]
            this.show2 = true
            this.getAccountList()
            // console.log(res.data.data['政法'])
            // console.log(this.ruleForm)
          } else {
            this.show2 = false
            // console.log('请联系管理员指定该账号类别及职能')
          }
        })
        .catch(() => { })
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
    // 排序
    handleChange () {
      // console.log(this.sortValue)
      if (this.sortValue.length > 0) {
        this.ruleForm2.sortField = this.sortValue[0]
        this.ruleForm2.sort = this.sortValue[1]
      }
      this.$refs.child.handleCurrentChange(1)
    },
    // 查询
    searchList () {
      console.log(this.ruleForm2)
      if (this.districts.length > 0) {
        if (this.districts.length === 2) {
          this.ruleForm.region = ''
          this.ruleForm2.region = ''
          this.ruleForm.province = this.districts[0]
          this.ruleForm.city = this.districts[1]
          this.ruleForm2.province = this.districts[0]
          this.ruleForm2.city = this.districts[1]
        } else if (this.districts.length === 3) {
          this.ruleForm.province = this.districts[0]
          this.ruleForm.city = this.districts[1]
          this.ruleForm.region = this.districts[2]

          this.ruleForm2.province = this.districts[0]
          this.ruleForm2.city = this.districts[1]
          this.ruleForm2.region = this.districts[2]
        } else {
          this.ruleForm.region = ''
          this.ruleForm.city = ''
          this.ruleForm2.region = ''
          this.ruleForm2.city = ''

          this.ruleForm.province = this.districts[0]

          this.ruleForm2.province = this.districts[0]
        }
      }
      this.$refs.child.handleCurrentChange(1)
    },
    // 重置
    resetForm () {
      this.publishTime = []
      this.sortValue = []
      this.ruleForm = {
        category: '', // 类别
        function: '', // 职能
        province: '', // 省
        city: '', // 城市
        region: '', // 区
        data: '',
        queryText: '', // 关键词
        pageBean: {
          pageSize: 10,
          pageNum: 1
        },
        startTime: '',
        endTime: ''
      }
      this.ruleForm2 = {
        category: '', // 类别
        function: '', // 职能
        province: '', // 省
        city: '', // 城市
        region: '', // 区
        sortField: '',
        sort: '',
        queryText: '', // 关键词
        pageBean: {
          pageSize: 10,
          pageNum: 1
        },
        startTime: '',
        endTime: '',
        queryScope: '0'
      }
      // this.ruleForm.category = this.classList[0]
      // this.ruleForm.function = this.functionList[0]
      // this.ruleForm2.category = this.classList[0]
      // this.ruleForm2.function = this.functionList[0]

      this.districts = []
      this.ruleForm.category = this.allClass.data[0]
      this.ruleForm.function = this.allClass[this.allClass.data[0]][0]
      this.ruleForm2.category = this.allClass.data[0]
      this.ruleForm2.function = this.allClass[this.allClass.data[0]][0]
      this.functionList = this.allClass[this.allClass.data[0]]
      this.currentSort = 0
      this.currentSort2 = 0
      this.$refs.child.handleCurrentChange(1)
    },
    Websock (url, b) {
      // console.log(url, b)
      window.open(url)
    },
    // 全局账号
    getAccountList () {
      // console.log(this.classList)
      this.time = this.publishTime
      this.noData = false
      if (this.publishTime.length > 0) {
        this.ruleForm.startTime = this.publishTime[0]
        this.ruleForm.endTime = this.publishTime[1]
      }
      // console.log(this.ruleForm)

      this.$http.post(this.$api.accountInformation, this.ruleForm)
        .then(res => {
          // console.log(res)
          if (res.data.code === 200) {
            console.log(res.data.data)
            console.log(res.data.data.total)
            // if (res.data.data) {
            //   this.tableData = res.data.data.data
            //   this.total = res.data.data.total
            //   this.records = res.data.data.actualTotal
            // }
            if (JSON.stringify(res.data.data) === '{}') {
              this.tableData = []
              this.total = 0
              this.records = 0
            } else {
              this.tableData = res.data.data.data
              this.total = res.data.data.total
              this.records = res.data.data.actualTotal
            }
          }
        })
    },
    // 获取文章
    getArticle () {
      if (this.publishTime.length > 0) {
        this.ruleForm2.startTime = this.publishTime[0]
        this.ruleForm2.endTime = this.publishTime[1]
      }
      if (this.ruleForm.queryText) {
        this.ruleForm2.queryText = this.ruleForm.queryText
      }
      if (this.districts.length > 0) {
        if (this.districts.length === 2) {
          this.ruleForm2.province = this.districts[0]
          this.ruleForm2.city = this.districts[1]
        } else if (this.districts.length === 3) {
          this.ruleForm2.province = this.districts[0]
          this.ruleForm2.city = this.districts[1]
          this.ruleForm2.region = this.districts[2]
        } else {
          this.ruleForm2.province = this.districts[0]
        }
      }
      // console.log(this.ruleForm2)
      this.$http.post(this.$api.articleInformation, this.ruleForm2)
        .then(res => {
          // console.log(res)
          if (res.data.code === 200) {
            console.log(res.data.data)
            if (res.data.data == null) {
              this.centerList = []
              this.noData = true
              this.total = 0
              this.records = 0
            } else {
              this.centerList = []
              this.noData = false
              this.centerList = res.data.data.data
              this.total = res.data.data.total
              this.records = res.data.data.actualTotal
            }
          }
        }).catch(() => { })
    },
    pagingChange (query) {
      console.log(query)
      if (this.activeTab === 'article') {
        this.ruleForm2.pageBean.pageSize = query.size
        // this.ruleForm2.pageBean.pageNum = query.page
        this.ruleForm2.pageBean.pageNum = (query.page - 1) * query.size + 1
        this.getArticle()
      } else {
        // console.log('账号')
        this.ruleForm.pageBean.pageSize = query.size
        // this.ruleForm.pageBean.pageNum = query.page
        this.ruleForm.pageBean.pageNum = (query.page - 1) * query.size + 1
        this.getAccountList()
      }
    },
    // 跳转历史推文
    targetUrl (biz) {
      this.$router.push({ 'name': 'HistoryTweets', query: { id: biz } })
    },
    // 认证跳转
    goUrl (authInfo) {
      this.$router.push({ 'name': 'WholeAccountDetail', query: { authInfo: authInfo, time1: this.time[0], time2: this.time[1] } })
    }
  },
  components: {
    vMenu
  }
}
</script>
<style lang="scss" scoped>
.wraper {
  .more-hot-li:first-child {
    padding-top: 0;
  }
  .more-hot-li {
    padding: 30px 0;
    border-bottom: 1px solid #edeff4;
  }
}
.more-cover-box {
  width: 250px;
  height: 140px;
  position: relative;
  margin-right: 32px;
  background: #f5f5f5;
  img {
    width: 100%;
    max-height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
}
.wraper {
  .more-hot-li:first-child {
    padding-top: 0;
  }
  .more-hot-li {
    padding: 30px 0;
    border-bottom: 1px solid #edeff4;
  }
}
.more-cover-box {
  width: 250px;
  height: 140px;
  position: relative;
  margin-right: 32px;
  background: #f5f5f5;
  img {
    width: 100%;
    max-height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
}
.crumbs {
  color: #3b81fe;
  font-size: 24px;
  display: flex;
  align-items: center;
}
.crumbs::before {
  content: '';
  display: block;
  width: 5px;
  height: 5px;
  background-color: #3b81fe;
  margin: 0 34px;
  border-radius: 50%;
}
.more-hot-main > p:first-child {
  font-size: 24px;
  color: $title-color;
}
.more-hot-main {
  flex: 1;
  p {
    font-size: $font-size-middle;
    color: $main-color;
  }
  span {
    margin-right: 30px;
  }
  img {
    width: 18px;
    height: 18px;
    margin-right: 2px;
  }
}
.more-hot-main > p:nth-child(2) {
  margin: 15px 0 30px;
}
.account-list-undefined {
  img {
    width: 457px;
    height: 329px;
    margin-top: 30px;
  }
  p {
    margin-top: 55px;
    color: $content-text-color;
  }
}
.nickname {
  color: #3b82fe;
}
.num_p {
  color: #3b81fe;
}

.account-show {
  width: 1400px;
  min-height: calc(100vh - 181px);
  margin: 0 auto;
  margin-bottom: 70px;
}
.account-company-warp {
  margin-left: 50px;
  width: 100%;
  margin-top: 20px;
  background: #ffffff;
  border: 1px solid #cccccc;
}
.menu-warp {
  width: 15%;
}
.whole-main {
  margin: 20px;
}
/* 类别 p */
.noActive {
  color: #999999;
  font-size: 14px;
  margin-right: 20px;
  cursor: pointer;
}
.active {
  color: #f79406;
  background-color: #fff8dd;
  padding: 2px 10px 2px 10px;
}
.cur {
  cursor: pointer;
}
// .category {
//   cursor: pointer;
//   margin-right: 2px;
//   color: #999999;
//   color: #f79406;
//   width: 51px;
//   height: 23px;
//   background-color: #fff8dd;
//   text-align: center;
//   line-height: 23px;
// }

/* 记录 */
.records {
  color: #f79406;
  font-size: 24px;
  margin-right: 5px;
}
.records2 {
  color: #adaeb2;
  font-size: 14px;
}
.area .el-form-item__label {
  color: wheat;
}
// .el-cascader {
//   width: 121px;
// }
// .el-date-editor {
//   width: 172px;
//   height: 28px;
// }
.flex-ali-center {
  margin-bottom: 10px;
}

.tit {
  color: #252934;
  font-size: 14px;
  margin-right: 20px;
}
.tabs-content {
  width: 96%;
  margin: 20px;
  overflow: hidden;
}
.list-mar {
  margin-top: 12px;
}
.more-hot-li {
  padding: 30px 0;
  border-bottom: 1px solid #edeff4;
}

/* 表格 */
.account-msg-box img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin-right: 5px;
}
.account-msg-box{
  margin-bottom:0px;
}
.account-msg img{
  width:18px;
  height:18px;
  margin-bottom:-2px;
}
.account-msg{
  .wxh{
    font-size:13px;
  }
  .rz{
    color:#707277;
    span{
      color: #252934;
    }
  }
}
.table-all {
  width: 100%;
}
.account-msg p {
  text-align: left;
}
// .img {
//   display: inline-block;
//   width: 18px;
//   height: 18px;
//   margin-right: 5px;
//   // margin-top: 5px;
// }
.search {
  margin-left: -10px;
}
.sear_date {
  width: 205px;
  height: 28px;
}
.list-li {
  position: relative;
  margin-right: 15px;
  img {
    position: absolute;
    top: 2px;
    left: -22px;
  }
}

.account-list-undefined {
  img {
    width: 457px;
    height: 329px;
    margin-top: 30px;
  }
  p {
    margin-top: 55px;
    color: $content-text-color;
  }
  .el-button {
    margin: 15px 0;
    .is_red {
      color: #ff0000;
    }
  }
}

.range {
  width: 120px;
}
</style>
