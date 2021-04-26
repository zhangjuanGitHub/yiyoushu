<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-03-08 10:43:44
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-04-22 16:57:05
-->
<template>
  <div class="interaction">
    <div class="tabs-header">
      <span class="tabs-title">账号对比</span>
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
                     @click="addAccount('')">添加账号</el-button>
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
                  <el-option label="基础信息"
                             value="1"
                             :disabled="isDisabled"></el-option>
                  <el-option label="活跃度"
                             value="2"
                             :disabled="isDisabled"></el-option>
                  <el-option label="涉检文章"
                             value="3"
                             :disabled="isDisabled"></el-option>
                  <!-- <el-option label="错敏词"
                             value="4"
                             :disabled="isDisabled"></el-option> -->
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
              <div v-if="!item.biz"
                   class="flex-cloumn-all">
                <div class="add-compare-ava">
                  <p>暂无账号</p>
                </div>
                <el-button size="middle"
                           class="add-compare-btn"
                           @click="addAccount('')">添加账号</el-button>
              </div>
              <div v-else
                   class="flex-cloumn-all">
                <div class="add-compare-ava  flex-ali-center">
                  <img :src="item.ori_head_img"
                       alt="">
                  <div class="compare-msg-name">
                    <p v-html="item.nickname" class="lin-clamp-1"></p>
                    <p v-html="item.alias"></p>
                  </div>
                </div>
                <el-button size="middle"
                           class="add-compare-btn"
                           @click="addAccount(index)">换个账号</el-button>
              </div>
              <i v-if="arr.length > 2"
                 @click="deleteComAccount(index)"
                 class="add-compare-del el-icon-circle-close"></i>
            </li>
          </ul>
          <!-- <div class="add-right-btn"
               v-if="arr.length < 4"
               @click="addAccount('')">添加账号</div> -->
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
                        <p>是否认证</p>
                        <p>认证主体</p>
                        <p>关联小程序</p>
                      </div>
                      <div v-else-if="scope.row.name === '活跃度'">
                        <p>发文篇数</p>
                        <p>发文总数</p>
                        <p>含有评论文章数</p>
                        <p>留言热词</p>
                      </div>
                      <div v-else-if="scope.row.name === '涉检文章'">
                        <p>涉检文章总数</p>
                        <p>其他文章数</p>
                        <p>头条涉检数</p>
                        <p>次条涉检数</p>
                      </div>
                      <div v-else-if="scope.row.name === '吸引力'">
                        <p>总阅读数</p>
                        <p>篇均阅读数</p>
                        <p>最高阅读数</p>
                        <p>头条总阅读数</p>
                        <p>头条篇均阅读数</p>
                        <p>头条最高阅读数</p>
                        <p>次条总阅读数</p>
                        <p>次条篇均阅读数</p>
                        <p>次条最高阅读数</p>
                        <p>3-n条总阅读数</p>
                        <p>3-n条篇均阅读数</p>
                        <p>3-n条最高阅读数</p>
                      </div>
                      <div v-else>
                        <p>总点赞数</p>
                        <p>篇均点赞数</p>
                        <p>最高点赞数</p>
                        <p>头条点赞总数</p>
                        <p>头条篇均点赞数</p>
                        <p>头条最高点赞数</p>
                        <p>次条总点赞数</p>
                        <p>次条篇均点赞数</p>
                        <p>次条最高点赞数</p>
                        <p>3-n条总点赞数</p>
                        <p>3-n条篇均点赞数</p>
                        <p>3-n条最高点赞数</p>
                        <p>总在看数</p>
                        <p>篇均在看数</p>
                        <p>最高在看数</p>
                        <p>头条总在看数</p>
                        <p>头条篇均在看数</p>
                        <p>头条最高在看数</p>
                        <p>次条总在看数</p>
                        <p>次条篇均在看数</p>
                        <p>次条最高在看数</p>
                        <p>3-n条总在看数</p>
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
                          <p><span v-html="item.auth_type ? '是' : '否'"></span></p>
                          <p><span>{{getChinese(item.auth_type) || '无'}}</span></p>
                          <p v-if="item.articleMini.length > 0"><span v-for="(item, index) of item.articleMini"
                                  :key="'i'+index">{{item}}</span></p>
                          <p v-else><span>-</span></p>
                        </div>
                        <div v-else-if="scope.row.name === '活跃度'">
                          <p><span v-html="item.articleOneSum"></span></p>
                          <p><span v-html="item.articleSum"></span></p>
                          <p><span v-html="item.countNum"></span></p>
                          <p v-if="item.commetHot.length > 0"><span v-for="(item, index) of item.commetHot"
                                  :key="index">{{item}}</span></p>
                          <p v-else><span>-</span></p>
                        </div>
                        <div v-else-if="scope.row.name === '涉检文章'">
                          <p ><span v-html="item.procuratorialNum"></span></p>
                          <p><span v-html="item.notProcuratorialNum"></span></p>
                          <p><span v-html="item.procuratorialOneNum"></span></p>
                          <p><span v-html="item.procuratorialTwoNum"></span></p>
                        </div>
                        <div v-else-if="scope.row.name === '吸引力'">
                          <p><span>{{item.sumReadNum}}</span></p>
                          <p><span>{{item.averageReadNum}}</span></p>
                          <p><span>{{item.maxReadNum}}</span></p>
                          <p><span>{{item.sumOneReadNum}}</span></p>
                          <p><span>{{item.averageOneReadNum}}</span></p>
                          <p><span>{{item.maxOneReadNum}}</span></p>
                          <p><span>{{item.sumTwoReadNum}}</span></p>
                          <p><span>{{item.averageTwoReadNum}}</span></p>
                          <p><span>{{item.maxTwoReadNum}}</span></p>
                          <p><span>{{item.sumThreeReadNum}}</span></p>
                          <p><span>{{item.averageThreeReadNum}}</span></p>
                          <p><span>{{item.maxThreeReadNum}}</span></p>
                        </div>
                        <div v-else>
                          <p><span>{{item.sumPointNum}}</span></p>
                          <p><span>{{item.averagePointNum}}</span></p>
                          <p><span>{{item.maxPointNum}}</span></p>
                          <p><span>{{item.sumOnePointNum}}</span></p>
                          <p><span>{{item.averageOnePointNum}}</span></p>
                          <p><span>{{item.maxOnePointNum}}</span></p>
                          <p><span>{{item.sumTwoPointNum}}</span></p>
                          <p><span>{{item.averageTwoPointNum}}</span></p>
                          <p><span>{{item.maxTwoPointNum}}</span></p>
                          <p><span>{{item.sumThreePointNum}}</span></p>
                          <p><span>{{item.averageThreePointNum}}</span></p>
                          <p><span>{{item.maxThreePointNum}}</span></p>
                          <p><span>{{item.sumOldLikeNum}}</span></p>
                          <p><span>{{item.averageOldLikeNum}}</span></p>
                          <p><span>{{item.maxOldLikeNum}}</span></p>
                          <p><span>{{item.sumOneOldLikeNum}}</span></p>
                          <p><span>{{item.averageOneOldLikeNum}}</span></p>
                          <p><span>{{item.maxOneOldLikeNum}}</span></p>
                          <p><span>{{item.sumTwoOldLikeNum}}</span></p>
                          <p><span>{{item.averageTwoOldLikeNum}}</span></p>
                          <p><span>{{item.maxTwoOldLikeNum}}</span></p>
                          <p><span>{{item.sumThreeOldLikeNum}}</span></p>
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
      <!-- 账号对比 -->
      <el-dialog title="选择账号"
                 :visible.sync="selectPerVisible"
                 :close-on-click-modal='false'
                 :modal-append-to-body="false"
                 center
                 @close="cancelSelectPer"
                 width="960px">
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
                    <img :src="item.ori_head_img" alt="">
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
                    <img :src="item.ori_head_img" alt="">
                    <p>{{item.nickname}}</p>
                  </div>
                  <p>{{item.alias}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer">
          <el-button type="primary"
                     @click="submitPer">确定</el-button>
          <el-button @click="cancelSelectPer">取消</el-button>
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
      form: {
        id: '',
        pageSize: 10,
        pageNum: 1
      },
      keyword: '', // 账号搜索关键字
      searchList: [], // 根据账号查询到的列表
      addList: [], // 根据账号查询添加后的列表
      replaceIndex: '', // 要替换的index
      ruleForm: { // 筛选条件
        publishTime: '1',
        tool: '1',
        type: ['0']
      },
      publishTime: [], // 时间
      isDisabled: true, // 类型是否禁用
      accountWidth: 945, // 添加账号区域总宽度
      selectPerVisible: false, // 账号对比
      calcWidth: 0, // 每个账号的宽度
      arr: [{}, {}],
      accountList: []
    }
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
    // 根据账号搜索
    queryKeyword () {
      if (this.keyword && this.keyword !== ' ') {
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
    // 添加公众号
    shuttle (item, index) {
      if (this.addList.length >= 4) {
        this.$message.warning('最多添加四个账号')
      } else {
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
    // 确认添加账号
    submitPer () {
      if (this.replaceIndex !== '' && this.replaceIndex >= 0) {
        if (this.addList[0]) {
          this.arr = this.unique(this.addList)
          this.calcWidth = (1 / this.arr.length) * 100
          this.cancelSelectPer()
        } else {
          this.$message.warning('请选择你要替换的账号')
        }
      } else {
        if (this.addList.length < 2) {
          this.$message.warning('请至少添加两个账号')
        } else {
          this.arr = this.unique(this.addList)
          this.calcWidth = (1 / this.arr.length) * 100
          if (this.arr.length > 2) {
            // let calLength = this.arr.length - this.accountList[0].list.length
            // for (let j = 0; j < calLength; j++) {
            //   for (let i = 0; i < 6; i++) {
            //     let list = [{}]
            //     this.accountList[i].push(list)
            //   }
            // }
          }
          this.cancelSelectPer()
        }
      }
    },
    // 数组去重 /*根据数组中某个字段去重,返回去重后的数组 */
    unique (arr) {
      let array = []
      for (let i = 0; i < arr.length; i++) {
        let isChage = true
        for (let z = 0; z < array.length; z++) {
          if (arr[i]['biz'] === array[z]['biz']) {
            isChage = false
          }
        }
        if (isChage) {
          array.push(arr[i])
        }
      }
      return array
    },
    // 取消账号对比
    cancelSelectPer () {
      if (this.arr.length === 0) {
        this.arr = [{}, {}]
        this.calcWidth = (1 / this.arr.length) * 100
        // this.$message.warning('请选择你要替换的账号')
      } else {
        this.selectPerVisible = false
        this.searchList = []
        this.addList = []
        // this.accountList = []
        this.keyword = ''
        this.replaceIndex = ''
      }
    },
    // 添加账号
    addAccount (index) {
      this.searchList = []
      this.replaceIndex = index
      index = index === 0 ? index++ : ''
      this.arr[0].biz && !index ? this.addList = JSON.parse(JSON.stringify(this.arr)) : this.addList = []
      // item ? this.addList.push(item) : '' // 替换的那条
      this.selectPerVisible = true
    },
    // 开始对比
    startCompare () {
      if (this.ruleForm.type.length > 0 && this.arr[0].biz) {
        let biz = []
        this.arr.forEach((item, index) => {
          biz.push(item.biz)
        })
        let obj = {
          publishTime: this.publishTime,
          levelList: this.ruleForm.type,
          bizList: biz
        }
        this.$http.post(this.$api.startCompare, obj)
          .then(res => {
            this.accountList = res.data.data
            let activeList = []
            this.accountList.forEach((item, index) => {
              item.showContent = true
              if (item.name === '活跃度') {
                activeList = item.list
              }
            })
            console.log(this.mathMax(activeList, 'articleOneSum'))
            console.log(this.getMaxIndex(activeList, 'articleOneSum'))
          }).catch(() => { })
      } else {
        if (this.ruleForm.type.length > 0) {
          this.$message.warning('请添加要对比的账号')
        } else {
          this.$message.warning('请选择对比类型')
        }
      }
    },
    getMaxIndex (arrs, data) {
      var max = arrs[0]
      var maxIndex = 0
      for (var i = 1, ilen = arrs.length; i < ilen; i++) {
        if (arrs[i].data > max.data) {
          maxIndex = i
        }
      }
      return maxIndex
    },
    // 最大值
    mathMax (arrs, data) {
      var max = arrs[0]
      for (var i = 1, ilen = arrs.length; i < ilen; i++) {
        if (arrs[i].data > max.data) {
          max.data = '<span class="color1">' + arrs[i].data + '</span>'
        }
      }
      return max
    },
    // 删除某一个账号
    deleteComAccount (index) {
      for (let i = 0; i < this.accountList.length; i++) {
        this.accountList[i].list.splice(index, 1)
      }
      this.arr.splice(index, 1)
      this.calcWidth = (1 / this.arr.length) * 100
    },
    listenerSubmit (e) {
      if (e.keyCode === 13) {
        this.queryKeyword()
      }
    }
  },
  created () {
    this.calcWidth = (1 / 2) * 100 // 默认是两个
    this.changeTime('1')
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
  border: 1px solid #e1e4e8;
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
.content-box::-webkit-scrollbar {
  background: transparent;
}
.content-box::-webkit-scrollbar-thumb,
.top-line,
.alone:hover {
  background: #f7f8fa;
}
.alone>p {
  width: 50%;
  padding: 10px 0;
  text-align: center;
}
.alone {
  height: 45px;
}
.top-line, .name-box  {
  height: 40px;
}
.name-box {
  color: #3b82fe;
  border-bottom: 1px solid #e1e4e8;
}
</style>
