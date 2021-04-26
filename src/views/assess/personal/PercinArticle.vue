<!--
 * @Author: MaiChao
 * @Date: 2021-03-15 16:16:36
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-18 15:38:33
-->
<template>
  <div class="contents">
    <div class="personal account-box">
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
        <div class="title-time">最近24小时 微信文章排行榜</div>
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
              <el-form-item prop="messageType"
                            label="类型"
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
        types: '2',
        date: [],
        time: '日榜',
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
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 导出
    exportBox () { },
    // 说明
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
@import '../assess.css';
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
.explain-box .el-button {
  width: 212px;
}
.from-box {
  margin: 20px 0;
}
.from-box .el-form-item {
  margin-right: 35px;
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
