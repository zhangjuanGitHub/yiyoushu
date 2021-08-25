<!--
 * @Author: zhangjuan
 * @Date: 2021-05-10 11:14:46
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-06-28 17:27:27
-->
<template>
  <div class="interaction">
    <div class="tabs-header">
      <span class="tabs-title">单位对比</span>
    </div>
    <div class="account-compare-wrap" v-if="!startComparing">
      <!-- 选择区域 -->
      <div class="compare-select-contain  flex-cloumn-cen">
        <!-- 已选择了账号 -->
        <div class="compare-selected-box flex-ali-center"
             v-if="isSelList.length > 0">
          <div class="compare-is-select flex-ali-center"
               v-for="(item, index) of departName" :key="index">
            <div class="compare-ava-head flex-cloumn-cen">
              <span>{{item}}</span>
              <p @click="deleteAccount(item, index)"><i class="el-icon-close"></i></p>
            </div>
            <p v-if="index < 2">vs</p>
          </div>
          <div class="compare-is-select" v-if="isSelList.length < 3">
            <div class="flex-cloumn-cen cursor"  @click="addAccount">
              <img src="@/assets/images/monitor/compare_2.png" alt="">
            </div>
          </div>
        </div>
        <!-- 未选择 -->
        <div class="compare-select-box flex-cloumn-cen"
             v-else>
          <div class="compare-not-select flex-all-center">
            <img src="@/assets/images/monitor/compare_1.png" alt="" @click="addAccount">
            <p>VS</p>
            <img src="@/assets/images/monitor/compare_1.png" alt="" @click="addAccount">
          </div>
          <p>添加需要对比的单位账号</p>
        </div>
        <el-button type="primary"
                    size="small"
                    @click="startCompare"
                    v-if="isSelList.length >= 2"
                    class="compare-start-btn">开始对比</el-button>
        <el-tooltip effect="dark"
                    content="至少添加两个单位进行对比"
                    placement="top"
                    v-else>
          <el-button type="primary"
                    size="small"
                    class="compare-start-btn">开始对比</el-button>
        </el-tooltip>
      </div>
      <!-- 对比历史 -->
      <div class="compare-history" v-if="historyList.length > 0">
        <div class="account-compare-title flex-bwt-center">
          <div class="flex-ali-center">
            <p class="search-mater-theme-com">对比历史</p>
            <i class="el-icon-delete" @click="deleteHistory"></i>
          </div>
        </div>
        <ul class="compare-his-ul">
          <li @click="lookHistory(item)" v-for="(item, index) of historyList" :key="'h'+index">
            <div class="compare-his-name">
              <div class="flex-ali-center" v-for="(i, sIndex) of item.name" :key="'h1'+sIndex">
                <p class="compare-dep-nick lin-clamp-1">{{i}}</p>
                <p class="compare-vs" v-if="sIndex < item.name.length - 1 ">vs</p>
              </div>
            </div>
            <div class="flex-ali-center">
              <p>账号数量：</p>
              <div class="flex-ali-center" v-for="(i, vIndex) of item.bizsList" :key="'h2'+vIndex">
                <p class="compare-his-nick" v-html="i.length"></p>
                <p class="compare-vs" v-if="vIndex < item.bizsList.length - 1 ">vs</p>
              </div>
            </div>
            <p style="margin-top:5px">时间范围：<span v-html="item.time"></span></p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 对比数据 -->
    <div class="account-compare-wrap" v-else>
      <div class="account-compare-title flex-bwt-center">
        <div class="flex-ali-center">
          <p class="search-mater-theme-com">对比数据</p>
          <p>公众号粉丝互动数据（
            <span v-html="ruleForm.publish === '1' ? '7天': ruleForm.publish === '2' ? '30天' : ruleForm.publish === '3' ? '60天' : '90天'"></span>
            ）
          </p>
          <div class="compare-data-head flex-ali-center">
            <span class="compare-acc-tab"
                  :class="activeTab==='data'?'is-selected':''"
                  @click="changeTab('data', false)">基础数据</span>
            <!-- <span class="compare-acc-tab"
                  :class="activeTab==='echarts'?'is-selected':''"
                  @click="changeTab('echarts', true)">图表展示</span> -->
          </div>
        </div>
        <el-button size="small" @click="returnBack">返回</el-button>
      </div>
      <div class="compare-search-box flex-ali-center">
        <p :class="ruleForm.publish === '1'?'is-sel-time':''" @click="changeNewTime('1')">近7天</p>
        <p :class="ruleForm.publish === '2'?'is-sel-time':''" @click="changeNewTime('2')">近30天</p>
        <p :class="ruleForm.publish === '3'?'is-sel-time':''" @click="changeNewTime('3')">近60天</p>
        <p :class="ruleForm.publish === '4'?'is-sel-time':''" @click="changeNewTime('4')">近90天</p>
      </div>
      <div class="compare-data-main" v-if="!showEcharts">
        <!-- 头部 -->
        <div class="compare-data-box">
          <div class="compare-data-left"></div>
          <div class="compare-data-right flex-ali-center">
            <div class="compare-data-info flex-cloumn-cen"
                 :style="{width: calcWidth +'%'}"
                 v-for="(item, index) of infoList" :key="'data'+index">
              <div class="compare-data-col">
                <p>{{item.departName}}</p>
              </div>
              <div class="compare-data-dep flex-ali-center">
                <div v-for="(i, sIndex) of item.accountData.slice(0,2)"
                      :key="'no3'+sIndex"
                      class="flex-ali-center">
                  <img :src="i.hd_head_img" alt="">
                  <p class="lin-clamp-1">{{i.nickname}}</p>
                </div>
                <p style="margin-left:8px; color:#333333;" v-if="item.accountData.length > 2">等</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="compare-data-tip"
               style="background: #F0F6EC;">
            <div class="compare-tip-left"><p>基础信息</p></div>
            <div class="compare-tip-right">
              <div class="compare-tip-icon">
                <el-tooltip class="item" effect="dark" content="收起" placement="top" v-if="showBlock[0]">
                  <i class="el-icon-arrow-up" @click="changeBlock(false, 0)"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="展开" placement="top" v-else>
                  <i class="el-icon-arrow-down" @click="changeBlock(true, 0)"></i>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="compare-data-box" v-if="showBlock[0]">
            <div class="compare-data-left">
              <p>账号信息</p>
            </div>
            <div class="compare-data-right flex-ali-center">
              <div class="compare-data-msg"
                  :style="{width: calcWidth +'%'}"
                  v-for="(item, index) of infoList" :key="'j'+index">
                <p class="cursor">
                  <el-popover placement="right"
                              popper-class="dep-compare-pop"
                              width="420">
                    <div class="compare-depart-jichu">
                      <div v-for="(i, sIndex) of item.accountData"
                            :key="'no6'+sIndex"
                            class="flex-ali-center">
                        <img :src="i.hd_head_img" alt="">
                        <div>
                          <p class="lin-clamp-1">{{i.nickname}}</p>
                          <p>{{i.alias}}</p>
                        </div>
                      </div>
                    </div>
                    <span slot="reference" class="primary text-underline">{{item.accountSize}}</span>
                  </el-popover>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="compare-data-tip"
               style="background: #FDF1EA;">
            <div class="compare-tip-left">
              <p>
                <span>传播力</span>
                <el-popover placement="right" width="260" trigger="hover">
                  <div class="compare-pop-box">
                    <p class="pop-cont">【传播力】通过阅读总数、日均阅读数、篇均阅读数、头条阅读总数、日均阅读数、篇均阅读数、多个维度以及专家推出的计算公式，得出此公众号传播力“值”，根据传播力“值”，得出发布文章覆盖范围大小及社会公众的接受程度</p>
                  </div>
                  <i slot="reference" class="el-icon-question cursor"></i>
                </el-popover>
              </p>
            </div>
            <div class="compare-tip-right">
              <div class="compare-tip-icon">
                <el-tooltip class="item" effect="dark" content="收起" placement="top" v-if="showBlock[1]">
                  <i class="el-icon-arrow-up" @click="changeBlock(false, 1)"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="展开" placement="top" v-else>
                  <i class="el-icon-arrow-down" @click="changeBlock(true, 1)"></i>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="compare-data-box" v-if="showBlock[1]">
            <div class="compare-data-left">
              <p>篇均阅读数</p>
              <p>日均阅读数</p>
              <p>头条篇均阅读数</p>
              <p>头条日均阅读数</p>
            </div>
            <div class="compare-data-right flex-ali-center">
              <div class="compare-data-msg"
                  :style="{width: calcWidth +'%'}"
                  v-for="(item, index) of compareList" :key="'c'+index">
                <p v-html="item.readPieceNum"></p>
                <p v-html="item.readDayNum"></p>
                <p v-html="item.readPieceNumOne"></p>
                <p v-html="item.readDayNumOne"></p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="compare-data-tip"
               style="background: #FBF5FB;">
            <div class="compare-tip-left">
              <p>
                <span>引导力</span>
                <el-popover placement="right" width="280" trigger="hover">
                  <div class="compare-pop-box">
                    <p class="pop-cont">【引导力】通过评论总数、回复总数、点赞总数、在看总数、篇均点赞数、篇均在看数多个维度以及专家推出的计算公式，得出此公众号引导力“值”，根据引导力“值”，判断此公众号设置的议程、议题或发布文章对社会公众引导能力是否强大。</p>
                  </div>
                  <i slot="reference" class="el-icon-question cursor"></i>
                </el-popover>
              </p>
            </div>
            <div class="compare-tip-right">
              <div class="compare-tip-icon">
                <el-tooltip class="item" effect="dark" content="收起" placement="top" v-if="showBlock[2]">
                  <i class="el-icon-arrow-up" @click="changeBlock(false, 2)"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="展开" placement="top" v-else>
                  <i class="el-icon-arrow-down" @click="changeBlock(true, 2)"></i>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="compare-data-box" v-if="showBlock[2]">
            <div class="compare-data-left">
              <p>篇均点赞数</p>
              <p>篇均在看数</p>
              <p>日均点赞数</p>
              <p>日均在看数</p>
              <p>头条篇均点赞数</p>
              <p>头条篇均在看数</p>
              <p>头条日均点赞数</p>
              <p>头条日均在看数</p>
            </div>
            <div class="compare-data-right flex-ali-center">
              <div class="compare-data-msg"
                  :style="{width: calcWidth +'%'}"
                  v-for="(item, index) of compareList" :key="'l'+index">
                <p v-html="item.oldLikePieceNum"></p>
                <p v-html="item.likePieceNum"></p>
                <p v-html="item.oldLikeDayNum"></p>
                <p v-html="item.likeDayNum"></p>
                <p v-html="item.oldLikePieceNumOne"></p>
                <p v-html="item.likePieceNumOne"></p>
                <p v-html="item.oldLikeDayNumOne"></p>
                <p v-html="item.likeDayNumOne"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 图表展示 -->
      <div class="compare-data-main" v-else>
        <depart-chart :allData="allData"></depart-chart>
      </div>
    </div>
    <!-- 单位对比 -->
    <el-dialog title="选择单位"
                :visible.sync="selectComVisible"
                :modal-append-to-body="false"
                :close-on-click-modal='false'
                center
                @close="cancelSelectCom"
                class="select-depart"
                width="1000px">
      <div class="compare-company">
        <div class="flex-ali-center">
          <p>选择对比地区</p>
          <el-select v-model="city"
                      size="small"
                      @change="changeCity"
                      placeholder="请选择对比地区">
            <el-option :label="item.label"
                        :value="item.value"
                        v-for="(item, index) of cityList"
                        :key="index"></el-option>
          </el-select>
        </div>
        <div class="com-company-box">
          <div class="company-boc-tree">
            <el-tree :data="treeList"
                      :props="defaultProps"
                      node-key="value"
                      :expand-on-click-node="false"
                      :default-expanded-keys="[this.treeList.length > 0 ? this.treeList[0].value : 1 ]"
                      @node-click="selectTree"></el-tree>
          </div>
          <div class="company-boc-table flex-bwt">
            <div class="sel-depart-main">
              <p>
                <el-checkbox v-model="checked" @change="changeSelAll">全选</el-checkbox>
                查询结果</p>
              <div class="sel-depart-box">
                <div class="sel-depart-tab flex-bwt-center cursor"
                      v-for="(item, index) of accountData" :key="index"
                      @dblclick="shuttle(item, index)">
                  <div class="flex-ali-center">
                    <img :src="item.hd_head_img" alt="">
                    <div>
                      <p>{{item.nickname}}</p>
                      <p>{{item.alias}}</p>
                    </div>
                  </div>
                  <i class="el-icon-circle-plus-outline cursor"
                      @click="shuttle(item, index)"></i>
                </div>
              </div>
            </div>
            <div class="sel-depart-main">
              <p>已添加公众号</p>
              <div class="sel-depart-box">
                <div class="sel-depart-tab flex-bwt-center cursor"
                      v-for="(item, index) of addList" :key="index">
                  <div class="flex-ali-center">
                    <img :src="item.hd_head_img" alt="">
                    <div>
                      <p>{{item.nickname}}</p>
                      <p>{{item.alias}}</p>
                    </div>
                  </div>
                  <i class="el-icon-remove-outline cursor"
                      @click="unShuttle(item, index)"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary"
                    @click="confirmSelect">确定</el-button>
        <el-button @click="cancelSelectCom">取消</el-button>
      </div>
    </el-dialog>
    <!-- 删除对比历史 -->
    <el-dialog title="确认清空对比历史？"
               :visible.sync="dialogVisible"
               :modal-append-to-body='false'
               :close-on-click-modal='false'
               width="20%">
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="confirmDel">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { timeFormat } from '@/lib/tools'
import DepartChart from './DepartEcharts'
const getcollectApi = new Map().set('concern', 'setCollect').set('cancel', 'cancelCollect')
export default {
  data () {
    return {
      dialogVisible: false, // 确认删除
      allData: {}, // 对比的所有数据 
      compareList: [], // 对比数据
      infoList: [], // 对比信息
      historyList: [],
      calcWidth: 0,
      activeTab: 'data',
      showBlock: [true, true, true],
      undefinedUrl: require('@/assets/images/home/avatar.png'),
      departName: [], // 已选择的单位 名称
      isSelList: [], // 已选择的单位biz数组
      ruleForm: { // 筛选
        publish: '1'
      },
      checked: false, // 是否全选
      startComparing: false,
      showEcharts: false,
      cityList: [], // 地区列表
      treeList: [], // 根据地区查询区县
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tree: {
        value: '',
        label: ''
      },
      accountData: [], // 单位列表
      city: '', // 地区
      addList: [], // 已添加的账号
      publishTime: [], // 时间
      selectComVisible: false, // 单位对比
    }
  },
  components: {
    DepartChart
  },
  computed: {
    getChinese () {
      return function (params) {
        let value
        switch (params) {
          case 'government':
            value = '政府'
            break
          case 'company':
            value = '公司'
            break
          case 'media':
            value = '媒体'
            break
          case 'person':
            value = '个人'
            break
          case 'institution':
            value = '大学'
            break
          case 'others':
            value = '其他'
            break
          case 'person_business':
            value = '个体工商户'
            break
          default:
            value = params
            break
        }
        return value
      }
    }
  },
  methods: {
    getCalc (days) {
      const now = new Date()
      now.setTime(now.getTime() - 3600 * 1000 * 24 * days)
      return now
    },
    changeTab (tab, val) {
      this.activeTab = tab
      this.showEcharts = val
    },
    changeBlock (val, num) {
      this.$set(this.showBlock, num, val)
    },
    changeNewTime (time) {
      this.changeTime(time)
      this.allData.dataList = []
      this.allData.numList = []
      this.startCompare()
    },
    // 改变时间
    changeTime (val) {
      this.ruleForm.publish = val
      let end = this.getCalc(1)
      let start = ''
      if (val === '4') {
        start = this.getCalc(90)
      } else if (val === '3') {
        start = this.getCalc(60)
      } else if (val === '2') {
        start = this.getCalc(30)
      } else {
        start = this.getCalc(7)
      }
      this.publishTime[0] = timeFormat(start)
      this.publishTime[1] = timeFormat(end)
    },
    // 收藏和取消收藏
    submitCollect (item, index, isCollect) {
      item.is_follow = isCollect
      this.$set(this.infoList, index, item)
      let getApi = ''
      let obj = {
        account: item.biz,
        type: 1
      }
      if (isCollect === 1) {
        getApi = getcollectApi.get('concern')
        obj.accountName = item.nickname
      } else {
        getApi = getcollectApi.get('cancel')
      }
      this.$http.get(this.$api[getApi], { params: obj }) // 微信 1
        .then(res => {
          if (isCollect === 1) {
            this.$message.success('成功收藏！')
          } else {
            this.$message.success('成功取消收藏！')
          }
        })
    },
    // 打开添加账号dialog
    addAccount () {
      this.addList = []
      this.selectComVisible = true
      this.getCityList()
    },
    // 获取地区列表
    getCityList () {
      this.$http.get(this.$api.getCityList)
        .then(res => {
          this.cityList = res.data.data
          this.city = res.data.data[0].value
          this.getTreeList()
        }).catch(() => { })
    },
    // 获取单位列表
    getTreeList () {
      this.$http.post(this.$api.getTreeList, { id: this.city })
        .then(res => {
          this.treeList = res.data.data
          this.tree = this.treeList[0]
          this.getAccount()
        }).catch(() => { })
    },
    // 获取账号列表
    getAccount () {
      let obj = {
        id: this.tree.value,
        pageSize: 10,
        pageNum: 1
      }
      this.$http.post(this.$api.getAccountList, obj)
        .then(res => {
          this.accountData = res.data.data.list
        }).catch(() => { })
    },
    // 点击某一地区
    changeCity (data) {
      this.city = data
      this.getTreeList()
      this.addList = []
      this.checked = false
    },
    // 点击某一单位
    selectTree (data) {
      this.tree.value = data.value
      this.getAccount()
    },
    // 改变是否全选
    changeSelAll (val) {
      if (!val) {
        this.addList = []
      } else {
        this.addList = JSON.parse(JSON.stringify(this.accountData))
      }
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
    // 删除已添加公众号
    unShuttle (item, index) {
      this.addList.splice(index, 1)
      this.checked = false
    },
    // 删除已选择的账号
    deleteAccount (item, index) {
      for (let i = 0; i < this.isSelList.length; i++) {
        if (this.departName[i] === item) {
          this.isSelList.splice(index, 1)
          this.departName.splice(index, 1)
          return
        }
      }
    },
    // 确定添加单位
    confirmSelect () {
      if (this.addList.length > 0) {
        let data = []
        this.departName.push(this.tree.label)
        for (let i = 0; i < this.addList.length; i++) {
          data.push(this.addList[i].biz)
        }
        this.isSelList.push(data)
        this.selectComVisible = false
        this.checked = false
        this.addList = []
      } else {
        this.$message.warning('请选择你要添加的单位账号')
      }
    },
    // 取消单位对比
    cancelSelectCom () {
      this.selectComVisible = false
      this.checked = false
      this.tree.value = ''
      this.tree.label = ''
      this.addList = []
    },
    // 开始对比
    startCompare () {
      if (this.isSelList.length >= 2) {
        let obj = {
          departName: this.departName,
          accountList: this.isSelList,
          publishTime: this.publishTime
        }
        this.$http.post(this.$api.newDepCompare, obj)
          .then(res => {
            this.startComparing = true
            this.allData = JSON.parse(JSON.stringify(res.data.data))
            this.infoList = res.data.data.dataList
            this.compareList = JSON.parse(JSON.stringify(res.data.data.numList))
            let compareArr = JSON.parse(JSON.stringify(res.data.data.numList))
            this.calcWidth = (1/res.data.data.numList.length) * 100
            for (let m = 0; m < this.compareList.length; m++) {
              for (let n in this.compareList[m]) {
                this.compareList[m][n] = '<i class="color8">'+this.compareList[m][n]+'</i>'
              }
            }
            for (let i in compareArr[0]) {
              if (compareArr[this.getMaxIndex(compareArr, i)][i] != 0) {
                this.compareList[this.getMaxIndex(compareArr, i)][i] = '<i class="color7">'+compareArr[this.getMaxIndex(compareArr, i)][i]+'</i>'
              }
            }
          }).catch(() => { })
      }
    },
    // 最大值下标
    getMaxIndex (arrs, data) {
      let max = arrs[0]
      let maxIndex = 0
      for (let i = 0; i < arrs.length; i++) {
        if (parseInt(arrs[i][data]) > parseInt(max[data])) {
          max = arrs[i]
          maxIndex = i
        }
      }
      return maxIndex
    },
    // 查看历史对比
    lookHistory (item) {
      this.isSelList = item.bizsList
      this.departName = item.name
      this.startCompare()
    },
    // 获取历史
    getHistory () {
      this.$http.get(this.$api.getDepHistory)
        .then(res => {
          this.historyList = res.data.data
        }).catch(() => { })
    },
    deleteHistory () {
      this.dialogVisible = true
    },
    // 删除历史
    confirmDel () {
      this.$http.get(this.$api.delDepHistory)
        .then(res => {
          this.dialogVisible = false
          this.getHistory()
        }).catch(() => { })
    },
    returnBack () {
      this.changeTime('1')
      this.isSelList = []
      this.departName = []
      this.showBlock = [true, true, true]
      this.startComparing = false
      this.showEcharts = false
      this.activeTab = 'data'
      this.getHistory()
    }
  },
  created () {
    this.changeTime('1')
    this.getHistory()
  }
}
</script>
<style>
.dep-compare-pop {
  height: 500px;
  overflow-y: scroll;
}
</style>
<style scoped>
@import '../monitor.css';
@import './compare.css';
</style>
