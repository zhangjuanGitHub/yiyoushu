<template>
  <div>
    <div class="account-compare-title flex-bwt-center">
      <div class="flex-ali-center">
        <p class="search-mater-theme">对比数据</p>
        <p>公众号粉丝互动数据（<span>30天</span>）</p>
      </div>
      <el-button type="success" size="small">开始对比</el-button>
    </div>
    <div class="account-compare-main">
      <!-- 账号头部 -->
      <div class="add-compare-msg">
        <div class="add-compare-range flex-all-center">
          <el-form ref="ruleForm"
                  :inline="true"
                  :model="ruleForm">
            <el-form-item label="时间"
                          prop="timeRange">
              <el-select v-model="ruleForm.timeRange"
                        size="small"
                        @change="changeValue"
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
                <el-option label="微博"
                          value="2"></el-option>
                <el-option label="头条"
                          value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="type"
                          label="类型">
              <el-select v-model="ruleForm.type"
                        size="small"
                        placeholder="请选择类型">
                <el-option label="政治"
                          value="1"></el-option>
                <el-option label="娱乐"
                          value="2"></el-option>
                <el-option label="检察"
                          value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <ul class="add-compare-account">
          <!-- <li class="flex-cloumn-all">
            <div class="add-compare-ava">
              <p v-if="!hasAccount">暂无账号</p>
              <div v-else class="compare-msg-ava flex-ali-center">
                <img src="@/assets/images/home/ava.png" alt="">
                <div class="compare-msg-name">
                  <p>京检在线</p>
                  <p>jingjianzaixian</p>
                </div>
              </div>
            </div>
            <div>
              <el-button size="middle"
                          class="add-compare-btn"
                          type="primary">
                <span v-if="!hasAccount">添加账号</span>
                <span v-else>换个账号</span>
              </el-button>
            </div>
          </li> -->
          <li class="flex-cloumn-all"
              :style="{ width: calcWidth + 'px' }"
              v-for="(item, index) of arr" :key="index">
            <div class="add-compare-ava">
              <p>暂无账号</p>
            </div>
            <div>
              <el-button size="middle"
                          class="add-compare-btn"
                          type="primary"
                          v-if="hasAccount"
                          @click="addAccount">添加账号</el-button>
              <el-button size="middle"
                          class="add-compare-btn"
                          type="primary" 
                          v-else>换个账号</el-button>
            </div>
            <i v-if="arr.length > 2"
              @click="deleteComAccount(index)"
                class="add-compare-del el-icon-circle-close"></i>
          </li>
        </ul>
        <div class="add-right-btn"
              v-if="arr.length < 4"
              @click="addComAccount">添加账号</div>
      </div>
      <!-- 账号对比信息 -->
      <div class="add-compare-table">
        <el-table :data="accountList"
                  style="width: 100%"
                  border
                  :show-header="false"
                  :cell-style="setFirstCloumn">
          <el-table-column width="185"
                            prop="name">
            <template slot-scope="scope">
              <div class="add-compare-left">{{scope.row.name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="list">
            <template slot-scope="scope">
              <div v-for="(item, index) of scope.row.list"
                  :key="index"
                  :style="{ width: calcWidth + 'px' }"
                  class="compare-table-msg">
                <div v-if="scope.row.name === '基础信息'">
                  <p>运营主体<span>{{item.qq}}</span></p>
                  <p>注册时间<span>{{item.qq}}</span></p>
                  <p>是否原创<span></span></p>
                  <p>是否认证<span></span></p>
                  <p>关联小程序<span></span></p>
                </div>
                <div v-else-if="scope.row.name === '活跃度'">
                  <p>发文篇数/次数<span>{{item.aa}}</span></p>
                  <p>头条发文总数<span>{{item.aa}}</span></p>
                  <p>赞赏次数<span></span></p>
                  <p>留言热词<span></span></p>
                </div>
                <div v-else-if="scope.row.name === '涉检文章'">
                  <p>涉检文章总数<span>{{item.ss}}</span></p>
                  <p>其他文章数<span>{{item.ss}}</span></p>
                  <p>头条涉检数<span></span></p>
                  <p>次条涉检数<span></span></p>
                </div>
                <div v-else-if="scope.row.name === '错敏词'">
                  <p>错敏文章总数<span>{{item.dd}}</span></p>
                  <p>错敏字总数<span>{{item.dd}}</span></p>
                  <p>头条错敏文章数<span></span></p>
                  <p>头条错敏字总数<span></span></p>
                  <p>次条错敏文章数<span></span></p>
                  <p>次条错敏字总数<span></span></p>
                </div>
                <div v-else-if="scope.row.name === '吸引力'">
                  <p>总阅读数<span>{{item.ff}}</span></p>
                  <p>篇均阅读数<span>{{item.ff}}</span></p>
                  <p>最高阅读数<span></span></p>
                  <p>头条总阅读数<span></span></p>
                  <p>头条篇均阅读数<span></span></p>
                  <p>头条最高阅读数<span></span></p>
                  <p>次条总阅读数<span></span></p>
                  <p>次条篇均阅读数<span></span></p>
                  <p>次条最高阅读数<span></span></p>
                </div>
                <div v-else>
                  <p>总点赞数<span>{{item.gg}}</span></p>
                  <p>篇均点赞数<span>{{item.gg}}</span></p>
                  <p>最高点赞数<span></span></p>
                  <p>头条点赞总数<span></span></p>
                  <p>头条篇均点赞数<span></span></p>
                  <p>次条总点赞数<span></span></p>
                  <p>次条篇均点赞数<span></span></p>
                  <p>次条最高点赞数<span></span></p>
                  <p>总在看数<span></span></p>
                  <p>篇均在看数<span></span></p>
                  <p>最高在看数<span></span></p>
                  <p>头条总在看数<span></span></p>
                  <p>头条篇均在看数<span></span></p>
                  <p>头条最高在看数<span></span></p>
                  <p>次条总在看数<span></span></p>
                  <p>次条篇均在看数<span></span></p>
                  <p>次条最高在看数<span></span></p>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 账号对比 -->
    <el-dialog title="选择账号"
               :visible.sync="selectPerVisible"
               :modal-append-to-body="false"
               center
               width="37%">
      <div class="compare-person">
        <el-input placeholder="请输入公众号名称或微信号" v-model="keyword">
          <el-button type="primary" slot="append" icon="el-icon-search" @click="submitSearch"></el-button>
        </el-input>
        <el-transfer v-model="selectValue"
                     :data="selectData"
                     :titles="['搜索结果', '选择的账号']"></el-transfer>
      </div>
      <div slot="footer">
        <el-button type="primary">确定</el-button>
        <el-button @click="cancelSelectPer">取消</el-button>
      </div>
    </el-dialog>
    <!-- 单位对比 -->
    <el-dialog title="选择单位"
               :visible.sync="selectComVisible"
               :modal-append-to-body="false"
               center
               width="1000px">
      <div class="compare-company">
        <div class="flex-ali-center">
          <p>选择对比地区</p>
          <el-select v-model="city"
                     size="small"
                     placeholder="请选择对比地区">
            <el-option label="北京"
                       value="1"></el-option>
            <el-option label="上海"
                       value="2"></el-option>
            <el-option label="广州"
                       value="3"></el-option>
          </el-select>
        </div>
        <div class="com-company-box">
          <div class="company-boc-tree">
            <el-tree :data="treeData"
                     :props="defaultProps"
                     node-key="value"
                     :expand-on-click-node="false"
                     @node-click="handleNodeClick"></el-tree>
          </div>
          <div class="company-boc-table">
            <el-table :data="depData"
                      style="width: 100%"
                      @selection-change="handleSelectionChange">
              <el-table-column type="selection"
                               width="55">
              </el-table-column>
              <el-table-column label="账号名称"
                               width="200">
              </el-table-column>
              <el-table-column prop="alias"
                                label="单位名称"
                                show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="auth_type"
                                label="部门"
                                width="110">
              </el-table-column>
              <el-table-column prop="city"
                                label="级别"
                                width="110">
              </el-table-column>
              <el-table-column prop="introduction"
                                label="地址"
                                width="170">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary">确定</el-button>
        <el-button @click="cancelSelectCom">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const getData = new Map().set('1', 'thirty').set('2', 'sixty').set('3', 'ninty')
export default {
  data () {
    return {
      city: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      depData: [],
      selectValue: [], // 选择的账号
      selectData: [
        {
          key: 1,
          label: '名称1'
        },
        {
          key: 2,
          label: '名称2'
        },
        {
          key: 3,
          label: '名称3'
        },
        {
          key: 4,
          label: '名称4'
        },
        {
          key: 5,
          label: '名称5'
        },
        {
          key: 6,
          label: '名称6'
        },
      ],
      activeTab: 'account',
      keyword: '', // 
      accountWidth: 945, // 账号区域总宽度
      hasAccount: 'false', // 是否有账号
      ruleForm: {
        timeRange: '1',
        tool: '1',
        type: '1'
      },
      selectComVisible: false, // 单位对比
      selectPerVisible: false, // 账号对比
      calcWidth: 0, // 每个账号的宽度
      arr: [{ a: '111'}, { a: '222'}, { a: '333'}],
      accountList: [
        {
          name: '基础信息',
          list: [
            {
              qq: '京检在线qq'
            },
            {
              qq: '北京检查qq'
            },
            {
              qq: '四川监察qq'
            }
          ]
        },
        {
          name: '活跃度',
          list: [
            {
              aa: '京检在线aa'
            },
            {
              aa: '北京检查aa'
            },
            {
              aa: '四川监察aa'
            }
          ]
        },{
          name: '涉检文章',
          list: [
            {
              ss: '京检在线ss'
            },
            {
              ss: '北京检查ss'
            },
            {
              ss: '四川监察ss'
            }
          ]
        },{
          name: '错敏词',
          list: [
            {
              dd: '京检在线dd'
            },
            {
              dd: '北京检查dd'
            },
            {
              dd: '四川监察dd'
            }
          ]
        },{
          name: '吸引力',
          list: [
            {
              ff: '京检在线ff'
            },
            {
              ff: '北京检查ff'
            },
            {
              ff: '四川监察ff'
            }
          ]
        },{
          name: '认可度',
          list: [
            {
              gg: '京检在线gg'
            },
            {
              gg: '北京检查gg'
            },
            {
              gg: '四川监察gg'
            }
          ]
        }
      ]
    }
  },
  methods: {
    changeValue () {},
    // 设置表格左侧第一列颜色
    setFirstCloumn (row) {
      if (row.column.property === 'name') {
        return "background: #F7F8FA"
      }
    },
    // 点击某一地区
    handleNodeClick (data) {},
    // 取消单位对比
    cancelSelectCom () {
      this.selectComVisible = false
      this.city = ''
    },
    // 选择单位
    handleSelectionChange () {},
    // 添加账号
    addAccount () {
      this.selectPerVisible = true
    },
    // 添加账号——搜索账号
    submitSearch () {},
    // 取消账号对比
    cancelSelectPer () {
      this.selectPerVisible = false
    },
    // 删除某一个账号
    deleteComAccount (index) {
      for (let i = 0; i < this.accountList.length; i++) {
        this.accountList[i].list.splice(index, 1)
      }
      this.arr.splice(index, 1)
      this.calcWidth = this.accountWidth/this.arr.length
    },
    // 增加一个账号
    addComAccount () {
      for (let i = 0; i < this.accountList.length; i++) {
        this.accountList[i].list.push({})
      }
      this.arr.push({})
      this.calcWidth = this.accountWidth/this.arr.length
    }
  },
  created () {
    this.calcWidth = this.accountWidth/3
  }
}
</script>
<style>
.compare-person .el-transfer-panel {
  width: 236px;
}
</style>
<style scoped>
@import '../monitor.css';
@import './compare.css';
</style>