<!--
 * @Author: MaiChao
 * @Date: 2021-03-15 16:16:36
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-18 15:34:11
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
        <span class="right-btn cursor"
              @click="openCust"><i class="el-icon-s-data"></i>自定义榜单</span>
      </div>
      <div class="conts-box">
        <div class="title-time">省域 <span>2021-01-31</span> 排行总榜</div>
        <div class="from-box">
          <el-form :inline="true"
                   ref="ruleForm"
                   :model="ruleForm">
            <div class="flex-ali-center">
              <el-form-item prop="types">
                <el-radio-group v-model="ruleForm.types"
                                size='small' @change="openOther(ruleForm.types)">
                  <el-radio-button label="1">公众号</el-radio-button>
                  <el-radio-button label="2">文章</el-radio-button>
                  <el-radio-button label="3">视屏</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="date"
                            label="时间"
                            class="date-box">
                <el-date-picker v-model="ruleForm.date"
                                size='small'
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item class="explain-box" label="职能">
                <!-- <el-button size="small"
                           @click="explain()">数据榜单说明</el-button> -->
                <el-select v-model="ruleForm.function" placeholder="职能" size='small'>
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="flex-ali-center">
              <el-form-item prop="time">
                <el-radio-group v-model="ruleForm.time"
                                size='small'>
                  <el-radio-button label="日榜"></el-radio-button>
                  <el-radio-button label="周榜"></el-radio-button>
                  <el-radio-button label="月榜"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="messageType"
                            label="地区"
                            class="messageType">
                <el-cascader size="small"
                             :options="options"
                             :show-all-levels="false"
                             v-model="ruleForm.messageType"
                             placeholder="请选择类型"></el-cascader>
              </el-form-item>
              <el-form-item>
                <el-button size="small"
                           @click="searchList"
                           type="primary">筛选</el-button>
                <el-button size="small"
                           @click="resetForm('ruleForm')">重置</el-button>
                <el-button size="small"
                           type="warning"
                           @click="exportBox()">导出</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="quick-click flex-bwt-center">
          <div class="click-box color1 flex-arr-center cursor">
            <div class="flex-arr-center">
              <img class="click-image"
                   :src="require('@/assets/images/assess/05.png')">
              <span class="click-name">地方排行榜</span>
            </div>
          </div>
          <div class="click-box color2 flex-arr-center cursor">
            <div class="flex-arr-center">
              <img class="click-image"
                   :src="require('@/assets/images/assess/06.png')">
              <span class="click-name">省级排行榜</span>
            </div>
          </div>
          <div class="click-box color3 flex-arr-center cursor">
            <div class="flex-arr-center">
              <img class="click-image"
                   :src="require('@/assets/images/assess/07.png')">
              <span class="click-name">分州市排行榜</span>
            </div>
          </div>
          <div class="click-box color6 flex-arr-center cursor">
            <div class="flex-arr-center">
              <img class="click-image"
                   :src="require('@/assets/images/assess/08.png')">
              <span class="click-name">区县排行榜</span>
            </div>
          </div>
        </div>
        <div class="table-box">
          <el-table :data="tableData"
                    style="width: 100%"
                    :cell-style="{ textAlign: 'center' }"
                    :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column prop="articleCountNum"
                             label="排名"
                             width="50">
              <template slot-scope='scope'>
                <div>
                  {{scope.$index+1}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="nickname"
                             label="公众号">
              <template slot-scope='scope'>
                <div class="account-infor flex-ali-center">
                  <img :src="scope.row.hd_head_img"
                       alt="">
                  <div class="account-name">
                    <p class="import-name"
                       v-html='scope.row.nickname'></p>
                    <p>{{scope.row.alias}}</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="articleCountNum"
                             label="总发布次数"
                             width="110">
            </el-table-column>
            <el-table-column prop="articleCountNum"
                             label="文章数"
                             width="110">
            </el-table-column>
            <el-table-column prop="last_pubtime"
                             label="总阅读数"
                             width="110">
            </el-table-column>
            <el-table-column prop="last_pubtime"
                             label="总点赞数"
                             width="110">
            </el-table-column>
            <el-table-column prop="last_pubtime"
                             label="总在看数"
                             width="110">
            </el-table-column>
            <el-table-column prop="last_pubtime"
                             label="头条阅读数"
                             width="110">
            </el-table-column>
            <el-table-column prop="last_pubtime"
                             label="头条点赞数"
                             width="110">
            </el-table-column>
            <el-table-column prop="last_pubtime"
                             label="头条在看数"
                             width="110">
            </el-table-column>
            <el-table-column prop="last_pubtime"
                             label="操作"
                             width="90">
              <template>
                <div class="operate flex-arr-center">
                  <span class="el-icon-star-off collect cursor"></span>
                  <span class="el-icon-circle-plus-outline addto cursor"></span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog title="公众号添加"
               :visible.sync="addApply"
               width="65%"
               class="add-apply">
      <div class="apply-box">
        <div class="tabs-header">
          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane label="搜索添加"
                         name="first">
              <template>
                <div class="add-box">
                  <div class="search-box">
                    <el-input placeholder="请输入内容"
                              v-model="searchDetail">
                    </el-input>
                    <el-button type="primary"
                               @click="queryApply">查询</el-button>
                  </div>
                  <div class="cont-box flex-arr-center">
                    <!-- <el-transfer v-model="value" :data="data" :titles="['搜索结果', '已选择公众号']"></el-transfer> -->
                    <div class="result show-box">
                      <div class="top-line flex-arr-center">搜索结果</div>
                      <div class="flex-arr-center name-box">
                        <span>公众号</span>
                        <span>微信号</span>
                      </div>
                      <div class="content-box">
                        <div class="flex-arr-center alone cursor"
                             v-for="(item,index) in data1"
                             :key="index"
                             @click="shuttle(item,index)">
                          <span>{{item.name}}</span>
                          <span>{{item.account}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="choice show-box">
                      <div class="top-line flex-arr-center">已添加公众号</div>
                      <div class="flex-arr-center name-box">
                        <span>公众号</span>
                        <span>微信号</span>
                      </div>
                      <div class="content-box">
                        <div class="flex-arr-center alone cursor"
                             v-for="(item,index) in data2"
                             :key="index"
                             @click="unShuttle(item,index)">
                          <span>{{item.name}}</span>
                          <span>{{item.account}}</span>
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
                <div class="search-box">
                  <el-input type="textarea"
                            :autosize="{ minRows: 12, maxRows: 16}"
                            placeholder="请输入文章链接,每行一个链接"
                            v-model="textarea">
                  </el-input>
                  <span class="tip-span">每行输入一个微信公众号的单篇文章链接，多个链接请换行隔开，否则可能导致添加账号不成功</span>
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="批量添加"
                         name="third">
              <template>
                <div class="search-box">
                  批量添加
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancelApply">取 消</el-button>
        <el-button type="primary"
                   @click="upApply">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="榜单申请"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="offDialog">
      <span> 您的申请已经提交，请您耐心等待榜单持有者的审核。</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="offDialog">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

export default {
  data () {
    return {
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
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则'
        }, {
          value: 'daohang',
          label: '导航'
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form'
        }, {
          value: 'data',
          label: 'Data'
        }, {
          value: 'notice',
          label: 'Notice'
        }, {
          value: 'navigation',
          label: 'Navigation'
        }, {
          value: 'others',
          label: 'Others'
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      ruleForm: {
        types: '1',
        date: [],
        time: '日榜',
        function: '',
        messageType: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 微信/微博
    tabsAll (name, level) {
      this.activeTab = name
    },
    // 自定义榜单
    openCust () {
      this.$router.push({ name: 'Customize' })
    },
    // 筛选
    searchList () {
      console.log(this.ruleForm)
    },
    // 添加公众号
    shuttle (item, index) {
      this.data1.splice(index, 1)
      this.data2.push(item)
    },
    // 取消添加
    unShuttle (item, index) {
      this.data2.splice(index, 1)
      this.data1.push(item)
    },
    // 申请入榜弹框
    applyList () {
      this.addApply = true
    },
    // 取消申请
    cancelApply () {
      this.searchDetail = ''
      this.addApply = false
    },
    preText (pretext) {
      return pretext.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
    },
    // 提交申请
    upApply () {
      this.remarks = this.preText(this.textarea)
      console.log(this.remarks)
      this.dialogVisible = true
    },
    // 关闭
    offDialog () {
      this.searchDetail = ''
      this.dialogVisible = false
      this.addApply = false
    },
    // 查询公众号
    queryApply () { },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 导出
    exportBox () { },
    // 说明
    explain () { },
    openOther (type) {
      let url = type === '1' ? 'Personal' : type === '2' ? 'PercinArticle' : 'Personal'
      this.$router.push({ name: url })
    }
  },
  created () {

  }
}
</script>
<style scoped lang="scss">
@import './assess.css';
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
.explain-box .el-select {
  width: 150px;
}
.from-box {
  margin: 20px 0;
}
.from-box .el-form-item {
  margin-right: 35px;
}
.quick-click {
  padding: 20px 0;
}
.click-box {
  width: 313px;
  height: 115px;
  text-align: center;
}
.click-name {
  font-size: 24px;
  font-weight: 400;
  color: #ffffff;
  margin-left: 15px;
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
.collect {
  color: #3b82fe;
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
</style>
