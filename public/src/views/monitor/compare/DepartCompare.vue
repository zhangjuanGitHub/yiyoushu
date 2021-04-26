<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-03-08 10:43:44
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-04-20 16:07:15
-->
<template>
  <div class="interaction">
    <div class="tabs-header">
      <span class="tabs-title">单位对比</span>
    </div>
    <div class="account-compare-wrap">
      <div class="account-compare-title flex-bwt-center">
        <div class="flex-ali-center">
          <p class="search-mater-theme-com">对比数据</p>
          <p>公众号粉丝互动数据（
            <span v-html="ruleForm.publishTime === '1' ? '30天': ruleForm.publishTime === '2' ? '60天' : '90天'"></span>
            ）
          </p>
        </div>
        <div>
          <el-button type="success"
                     size="small"
                     v-if="arr.length < 4"
                     @click="addNewAccount">添加单位</el-button>
          <el-button type="primary"
                     size="small"
                     @click="startCompare">开始对比</el-button>
        </div>
      </div>
      <div class="account-compare-main">
        <!-- 账号头部 -->
        <div class="add-compare-msg">
          <div class="add-compare-range flex-all-center">
            <el-form ref="ruleForm"
                     :inline="true"
                     :model="ruleForm">
              <el-form-item label="时间"
                            prop="publishTime">
                <el-select v-model="ruleForm.publishTime"
                           size="small"
                           @change="changeTime"
                           placeholder="请选择时间">
                  <el-option label="30天内"
                             value="1"></el-option>
                  <el-option label="60天内"
                             value="2"></el-option>
                  <el-option label="90天内"
                             value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="tool"
                            label="渠道">
                <el-select v-model="ruleForm.tool"
                           size="small"
                           placeholder="请选择渠道">
                  <el-option label="微信"
                             value="1"></el-option>
                  <!-- <el-option label="微博"
                            value="2"></el-option>
                  <el-option label="头条"
                            value="3"></el-option> -->
                </el-select>
              </el-form-item>
              <el-form-item prop="type"
                            label="类型">
                <el-select v-model="ruleForm.type"
                           size="small"
                           multiple
                           collapse-tags
                           @change="changeType"
                           placeholder="请选择类型">
                  <el-option label="全部"
                             value="0"></el-option>
                  <el-option label="吸引力"
                             value="5"
                             :disabled="isDisabled"></el-option>
                  <el-option label="认可度"
                             value="6"
                             :disabled="isDisabled"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <ul class="add-compare-account">
            <li :style="{ width: calcWidth + '%' }"
                v-for="(item, index) of arr"
                :key="index">
              <div v-if="!item.departName"
                   class="flex-cloumn-all">
                <div class="add-compare-ava">
                  <p>暂无单位</p>
                </div>
                <el-button size="middle"
                           class="add-compare-btn"
                           @click="addAccount(item, index)">添加单位</el-button>
              </div>
              <div v-else
                   class="flex-cloumn-all">
                <div class="add-compare-ava">
                  <p>{{item.departName}}</p>
                </div>
                <el-button size="middle"
                           class="add-compare-btn"
                           @click="addAccount(item, index)">换个单位</el-button>
              </div>
              <i v-if="arr.length > 2"
                 @click="deleteComAccount(index)"
                 class="add-compare-del el-icon-circle-close"></i>
            </li>
          </ul>
          <!-- <div class="add-right-btn"
               v-if="arr.length < 4"
               @click="addNewAccount">添加单位</div> -->
        </div>
        <!-- 账号对比信息 -->
        <div class="add-compare-table">
          <el-table :data="accountList"
                    style="width: 100%"
                    border
                    :show-header="false">
            <el-table-column prop="name">
              <template slot-scope="scope">
                <div class="add-compare-cont">
                  <div class="add-compare-top flex-bwt-center">
                    <div class="compare-name">{{scope.row.name}}</div>
                    <div class="compare-button"
                        v-if="scope.row.showContent"
                        @click="scope.row.showContent=false">收起<i class="el-icon-arrow-up"></i> </div>
                    <div class="compare-button"
                        v-else
                        @click="scope.row.showContent=true">展开<i class="el-icon-arrow-down"></i> </div>
                  </div>
                  <div class="add-compare-center"
                      v-if="scope.row.showContent">
                    <div class="first-box">
                      <div v-if="scope.row.name === '基础信息'">
                        <p>账号数量</p>
                      </div>
                      <div v-else-if="scope.row.name === '吸引力'">
                        <p>篇均阅读数</p>
                        <p>最高阅读数</p>
                        <p>头条篇均阅读数</p>
                        <p>头条最高阅读数</p>
                        <p>次条篇均阅读数</p>
                        <p>次条最高阅读数</p>
                        <p>3-n条篇均阅读数</p>
                        <p>3-n条最高阅读数</p>
                      </div>
                      <div v-else>
                        <p>篇均点赞数</p>
                        <p>最高点赞数</p>
                        <p>头条篇均点赞数</p>
                        <p>头条最高点赞数</p>
                        <p>次条篇均点赞数</p>
                        <p>次条最高点赞数</p>
                        <p>3-n条篇均点赞数</p>
                        <p>3-n条最高点赞数</p>
                        <p>篇均在看数</p>
                        <p>最高在看数</p>
                        <p>头条篇均在看数</p>
                        <p>头条最高在看数</p>
                        <p>次条篇均在看数</p>
                        <p>次条最高在看数</p>
                        <p>3-n条篇均在看数</p>
                        <p>3-n条最高在看数</p>
                      </div>
                    </div>
                    <div class="compare-table-right">
                      <div v-for="(item, index) of scope.row.list"
                          :key="index"
                          :style="{ width: calcWidth + '%' }"
                          class="compare-table-cont">
                        <div v-if="scope.row.name === '基础信息'">
                          <p class="cursor">
                            <el-popover placement="right"
                                        width="200"
                                        trigger="hover">
                              <div class="compare-depart-jichu">
                                <div v-for="(i, sIndex) of item.accountData"
                                     :key="'no'+sIndex"
                                     class="flex-ali-center">
                                  <img :src="i.hd_head_img" alt="">
                                  <div>
                                    <p>{{i.nickname}}</p>
                                    <p>{{i.alias}}</p>
                                  </div>
                                </div>
                              </div>
                              <span slot="reference">{{item.accountSize}}</span>
                            </el-popover>
                          </p>
                        </div>
                        <div v-else-if="scope.row.name === '吸引力'">
                          <p><span>{{item.averageReadNum}}</span></p>
                          <p><span>{{item.maxReadNum}}</span></p>
                          <p><span>{{item.averageOneReadNum}}</span></p>
                          <p><span>{{item.maxOneReadNum}}</span></p>
                          <p><span>{{item.averageTwoReadNum}}</span></p>
                          <p><span>{{item.maxTwoReadNum}}</span></p>
                          <p><span>{{item.averageThreeReadNum}}</span></p>
                          <p><span>{{item.maxThreeReadNum}}</span></p>
                        </div>
                        <div v-else>
                          <p><span>{{item.averagePointNum}}</span></p>
                          <p><span>{{item.maxPointNum}}</span></p>
                          <p><span>{{item.averageOnePointNum}}</span></p>
                          <p><span>{{item.maxOnePointNum}}</span></p>
                          <p><span>{{item.averageTwoPointNum}}</span></p>
                          <p><span>{{item.maxTwoPointNum}}</span></p>
                          <p><span>{{item.averageThreePointNum}}</span></p>
                          <p><span>{{item.maxThreePointNum}}</span></p>
                          <p><span>{{item.averageOldLikeNum}}</span></p>
                          <p><span>{{item.maxOldLikeNum}}</span></p>
                          <p><span>{{item.averageOneOldLikeNum}}</span></p>
                          <p><span>{{item.maxOneOldLikeNum}}</span></p>
                          <p><span>{{item.averageTwoOldLikeNum}}</span></p>
                          <p><span>{{item.maxTwoOldLikeNum}}</span></p>
                          <p><span>{{item.averageThreeOldLikeNum}}</span></p>
                          <p><span>{{item.maxThreeOldLikeNum}}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 单位对比 -->
      <el-dialog title="选择单位"
                 :visible.sync="selectComVisible"
                 :modal-append-to-body="false"
                 :close-on-click-modal='false'
                 :show-close="!isReplace"
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
              <el-tree :data="treeData"
                       :props="defaultProps"
                       node-key="value"
                       :expand-on-click-node="false"
                       :default-expanded-keys="[this.treeData.length > 0 ? this.treeData[0].value : 1 ]"
                       @node-click="selectTree"></el-tree>
            </div>
            <div class="company-boc-table flex-bwt">
              <div class="sel-depart-main">
                <p>查询结果</p>
                <div class="sel-depart-box">
                  <div class="sel-depart-tab flex-ali-center cursor"
                       v-for="(item, index) of accountData"
                       :key="index"
                       @dblclick="shuttle(item, index)">
                    <img :src="item.hd_head_img"
                         alt="">
                    <div>
                      <p>{{item.nickname}}</p>
                      <p>{{item.alias}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sel-depart-main">
                <p>已添加公众号</p>
                <div class="sel-depart-box">
                  <div class="sel-depart-tab flex-ali-center cursor"
                       v-for="(item, index) of addData"
                       :key="index"
                       @dblclick="unShuttle(item, index)">
                    <img :src="item.hd_head_img"
                         alt="">
                    <div>
                      <p>{{item.nickname}}</p>
                      <p>{{item.alias}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer">
          <el-button type="primary"
                     @click="confirmSelect">确定</el-button>
          <el-button @click="cancelSelectCom" v-if="!isReplace">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { timeFormat } from '@/lib/tools'
export default {
  data () {
    return {
      city: '', // 地区
      addData: [], // 已添加的账号
      addDataBiz: [[], []], // 已添加的账号biz列表
      addDataList: [[], []], // 已添加的账号列表
      isReplace: false, // 是否要替换
      accountData: [], // 单位列表
      cityList: [], // 地区列表
      treeData: [], // 根据地区查询区县
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tree: {
        value: '',
        label: ''
      },
      ruleForm: { // 筛选条件
        publishTime: '1',
        tool: '1',
        type: ['0']
      },
      replaceIndex: '', // 要替换的index
      publishTime: [], // 时间
      isDisabled: true, // 类型是否禁用
      accountWidth: 945, // 添加账号区域总宽度
      selectComVisible: false, // 单位对比
      calcWidth: 0, // 每个账号的宽度
      middleList: [], // 中间值 
      arr: [{}, {}],
      accountList: []
    }
  },
  methods: {
    // 改变类型
    changeType (val) {
      if (val.indexOf('0') >= 0) {
        this.isDisabled = true
        this.ruleForm.type = ['0']
      } else {
        this.isDisabled = false
      }
    },
    getCalc (days) {
      const now = new Date()
      now.setTime(now.getTime() - 3600 * 1000 * 24 * days)
      return now
    },
    // 改变时间
    changeTime (val) {
      let end = this.getCalc(1)
      let start = ''
      if (val === '3') {
        start = this.getCalc(90)
      } else if (val === '2') {
        start = this.getCalc(60)
      } else {
        start = this.getCalc(30)
      }
      this.publishTime[0] = timeFormat(start)
      this.publishTime[1] = timeFormat(end)
    },
    // 添加账号
    addAccount (item, index) {
      this.replaceIndex = index
      if (item.departName) {
        this.addData = JSON.parse(JSON.stringify(this.addDataList[index]))
        this.isReplace = true
        this.city = this.arr[index].city
      }
      this.selectComVisible = true
      this.getCityList()
    },
    // 确定添加单位
    confirmSelect () {
      if (this.addData.length > 0) {
        let data = []
        this.arr[this.replaceIndex].departName = this.tree.label
        this.arr[this.replaceIndex].city = this.city
        for (let i = 0; i < this.addData.length; i++) {
          if (data.indexOf(this.addData[i].biz) === -1) {
            data.push(this.addData[i].biz)
          }
        }
        this.addDataBiz.splice(this.replaceIndex, 1, data)
        this.addDataList.splice(this.replaceIndex, 1, this.addData)
        this.isReplace = false
        this.selectComVisible = false
        this.addData = []
      } else {
        this.$message.warning('请选择你要添加的单位账号')
      }
    },
    // 取消单位对比
    cancelSelectCom () {
      if (this.addData.length === 0 && this.isReplace) {
        this.$message.warning('请选择你要替换的单位账号')
      } else {
        this.selectComVisible = false
        this.isReplace = false
        this.tree.value = ''
        this.tree.label = ''
        this.addData = []
      }
    },
    // 开始对比
    startCompare () {
      if (this.ruleForm.type.length > 0 && this.arr[0].departName && this.arr[1].departName) {
        let obj = {
          publishTime: this.publishTime,
          levelList: this.ruleForm.type,
          accountList: this.addDataBiz
        }
        this.$http.post(this.$api.departCompare, obj)
          .then(res => {
            this.accountList = res.data.data
          }).catch(() => {})
      } else {
        if (this.ruleForm.type.length > 0) {
          this.$message.warning('请至少选择添加两个要对比的单位')
        } else {
          this.$message.warning('请选择对比类型')
        }
      }
    },
    // 设置表格左侧第一列颜色
    setFirstCloumn (row) {
      if (row.column.property === 'name') {
        return 'background: #F7F8FA'
      }
    },
    // 获取地区列表
    getCityList () {
      this.$http.get(this.$api.getCityList)
        .then(res => {
          this.cityList = res.data.data
          if (!this.arr[this.replaceIndex].departName) {
            this.city = res.data.data[0].value
          }
          this.getTreeList()
        }).catch(() => { })
    },
    // 获取单位列表
    getTreeList () {
      this.$http.post(this.$api.getTreeList, { id: this.city })
        .then(res => {
          this.treeData = res.data.data
          this.tree = this.treeData[0]
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
      this.addData = []
    },
    // 点击某一单位
    selectTree (data) {
      this.tree.value = data.value
      this.getAccount()
    },
    // 添加公众号
    shuttle (item, index) {
      if (this.addData.length > 0) {
        for (let i = 0; i < this.addData.length; i++) {
          if (this.addData[i].biz === item.biz) {
            this.$message.warning('已经添加过' + item.nickname)
            return
          }
        }
      }
      this.accountData.splice(index, 1)
      this.addData.push(item)
    },
    // 取消添加公众号
    unShuttle (item, index) {
      if (this.accountData.length > 0) {
        for (let i = 0; i < this.accountData.length; i++) {
          if (this.accountData[i].biz === item.biz) {
            this.addData.splice(index, 1)
            return
          }
        }
      }
      this.addData.splice(index, 1)
      this.accountData.push(item)
    },
    // 添加一个新窗口
    addNewAccount () {
      for (let i = 0; i < this.accountList.length; i++) {
        this.accountList[i].list.push({})
      }
      this.arr.push({})
      this.calcWidth = (1 / this.arr.length) * 100
    },
    // 删除某一个单位
    deleteComAccount (index) {
      for (let i = 0; i < this.accountList.length; i++) {
        this.accountList[i].list.splice(index, 1)
      }
      this.arr.splice(index, 1)
      this.addDataBiz.splice(index, 1)
      this.addDataList.splice(index, 1)
      this.calcWidth = (1 / this.arr.length) * 100
    }
  },
  created () {
    this.calcWidth = 50 // 默认是一个
    this.changeTime('1')
  }
}
</script>
<style>
.select-depart .el-dialog__body {
  min-height: 500px;
}
.add-compare-table .el-table--border {
  border-color: #97BDFE;
  border-bottom: 1px solid #97BDFE;
  border-right: 1px solid #97BDFE;
  border-top: none;
}
</style>
<style scoped>
@import '../monitor.css';
@import './compare.css';
</style>
