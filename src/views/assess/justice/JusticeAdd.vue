<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-03-05 10:06:51
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-07-14 11:14:50
-->
<template>
  <div class="interaction content-box">
    <div>
      <div class="add-main flex-cloumn-cen">
        <img src="@/assets/images/assess/zy.png"
             alt="">
        <div class="add-main-center">
          <div class="add-task-duration">
            <p class="title">权重设置</p>
            <div class="radio">
              <el-radio v-model="dateType"
                        label="1"
                        class="radio1"
                        @change="changeType">微信权重设置</el-radio>
              <el-radio v-model="dateType"
                        label="2"
                        @change="changeType">微博权重设置</el-radio>
            </div>
          </div>
          <div v-if="dateType==1"
               class="cont-all">
            <div class="first-div">
              <div class="first-left">
                <p class="first-left-title">影响力</p>
                <p class="first-left-num">{{wx.influence}}</p>
                <span>%</span>
              </div>
              <div class="first-right">
                <ul>
                  <li>
                    <span>文章总阅读数</span>
                    <input v-model="wx.totalReadNum"
                           class="first-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @blur="salaryChange">
                    <span>%</span>
                    <span>预加常数值</span>
                    <input v-model="wx.totalReadNumBasicScore"
                           class="first-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @change="changeNum('totalReadNumBasicScore')">
                  </li>
                  <div></div>
                  <li>
                    <span>单篇文章最高阅读数</span>
                    <input v-model="wx.singleReadNum"
                           class="first-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @blur="salaryChange2">
                    <span>%</span>
                    <span>预加常数值</span>
                    <input v-model="wx.singleReadNumBasicScore"
                           class="first-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @change="changeNum('singleReadNumBasicScore')">
                  </li>
                  <div></div>
                  <li>
                    <span>平均每篇文章阅读数</span>
                    <input v-model="wx.averReadNum"
                           class="first-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @blur="salaryChange3">
                    <span>%</span>
                    <span>预加常数值</span>
                    <input v-model="wx.averReadNumBasicScore"
                           class="first-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @change="changeNum('averReadNumBasicScore')">
                  </li>
                </ul>
              </div>
            </div>
            <div class="second-div">
              <div class="second-left">
                <p class="second-left-title">传播力</p>
                <p class="second-left-num">{{wx.spread}}</p>
                <!-- <input v-model="this.queryText"
                       class="second-inp"
                       oninput="value=value.replace(/[^0-9.]/g,'')"> -->
                <span>%</span>
              </div>
              <div class="second-right">
                <ul>
                  <li>
                    <span>文章数</span>
                    <input v-model="wx.articleNum"
                           class="second-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @blur="salaryChange4">
                    <span>%</span>
                    <span>预加常数值</span>
                    <input v-model="wx.articleNumBasicScore"
                           class="second-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @change="changeNum('articleNumBasicScore')">
                    <span>文章数达到</span>
                    <input v-model="wx.articleMaxNum"
                           class="second-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @change="changeNum('articleMaxNum')">
                    <span>篇</span>
                    <span>指标分数</span>
                    <input v-model="wx.articleNumMaxScore"
                           class="second-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           disabled>
                    <span>分</span>
                  </li>
                  <div></div>
                  <li>
                    <span>发布次数</span>
                    <input v-model="wx.releaseArticleNum"
                           class="second-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @blur="salaryChange5">
                    <span>%</span>
                    <span>预加常数值</span>
                    <input v-model="wx.releaseArticleNumBasicScore"
                           class="second-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @change="changeNum('releaseArticleNumBasicScore')">
                    <span>发布次数达到</span>
                    <input v-model="wx.releaseArticleMaxNum"
                           class="second-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @change="changeNum('releaseArticleMaxNum')">
                    <span>次</span>
                    <span>指标分数</span>
                    <input v-model="wx.releaseArticleNumMaxScore"
                           class="second-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           disabled>
                    <span>分</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="third-div">
              <div class="third-left">
                <p class="third-left-title">引导力</p>
                <p class="third-left-num">{{wx.guide}}</p>
                <span>%</span>
              </div>
              <div class="third-right">
                <ul>
                  <li>
                    <span>微信文章总在看数</span>
                    <input v-model="wx.lookNum"
                           class="third-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @blur="salaryChange6">
                    <span>%</span>
                    <span>预加常数值</span>
                    <input v-model="wx.lookNumBasicScore"
                           class="third-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @change="changeNum('lookNumBasicScore')">
                    <div></div>
                    <span>微信文章总点赞数</span>
                    <input v-model="wx.likeNum"
                           class="third-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @blur="salaryChange7">
                    <span>%</span>
                    <span>预加常数值</span>
                    <input v-model="wx.likeNumBasicScore"
                           class="third-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @change="changeNum('likeNumBasicScore')">
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else
               class="wb-div">
            <div class="third-div">
              <div class="third-left">
                <p class="third-left-title">影响力</p>
                <p class="third-left-num">{{wb.influence}}</p>
                <span>%</span>
              </div>
              <div class="third-right">
                <ul>
                  <li>
                    <span>微博粉丝数</span>
                    <input v-model="wb.fanNum"
                           class="third-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @blur="salaryChangeWb">
                    <span>%</span>
                    <span>预加常数值</span>
                    <input v-model="wb.fanNumBasicScore"
                           class="third-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @change="changeNum('fanNumBasicScore')">
                    <div></div>
                    <span>微博被转发总数</span>
                    <input v-model="wb.forwardNum"
                           class="third-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @blur="salaryChangeWb2">
                    <span>%</span>
                    <span>预加常数值</span>
                    <input v-model="wb.forwardNumBasicScore"
                           class="third-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @change="changeNum('forwardNumBasicScore')">
                  </li>
                </ul>
              </div>
            </div>
            <div class="second-div">
              <div class="second-left">
                <p class="second-left-title">传播力</p>
                <p class="second-left-num">{{wb.spread}}</p>
                <span>%</span>
              </div>
              <div class="second-right">
                <ul>
                  <li>
                    <span>微博总数</span>
                    <input v-model="wb.totalNum"
                           class="second-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @blur="salaryChangeWb3">
                    <span>%</span>
                    <span>预加常数值</span>
                    <input v-model="wb.totalNumBasicScore"
                           class="second-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @change="changeNum('totalNumBasicScore')">
                    <span class="span6">微博总数达到</span>
                    <input v-model="wb.totalMaxNum"
                           class="second-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           @change="changeNum('totalMaxNum')">
                    <span>条</span>
                    <span>指标分数</span>
                    <input v-model="wb.totalNumMaxScore"
                           class="second-inp"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                           disabled>
                    <span>分</span>
                  </li>
                  <div></div>
                  <li>
                    <span>原创微博数</span>
                    <input v-model="wb.originalArticleNum"
                           class="second-inp"
                           oninput="value=value.replace(/[^0-9.]/g,'')"
                           @blur="salaryChangeWb4">
                    <span>%</span>
                    <span>预加常数值</span>
                    <input v-model="wb.originalArticleNumBasicScore"
                           class="second-inp"
                           oninput="value=value.replace(/[^0-9.]/g,'')"
                           @change="changeNum('originalArticleNumBasicScore')">
                  </li>
                </ul>
              </div>
            </div>
            <div class="third-div">
              <div class="third-left">
                <p class="third-left-title">引导力</p>
                <p class="third-left-num">{{wb.guide}}</p>
                <span>%</span>
              </div>
              <div class="third-right">
                <ul>
                  <li>
                    <span>微博评论总数</span>
                    <input v-model="wb.commentNum"
                           class="third-inp"
                           oninput="value=value.replace(/[^0-9.]/g,'')"
                           @blur="salaryChangeWb5">
                    <span>%</span>
                    <span>预加常数值</span>
                    <input v-model="wb.commentNumBasicScore"
                           class="third-inp"
                           oninput="value=value.replace(/[^0-9.]/g,'')"
                           @change="changeNum('commentNumBasicScore')">
                    <div></div>
                    <span>微博总点赞数</span>
                    <input v-model="wb.likeNum"
                           class="third-inp"
                           oninput="value=value.replace(/[^0-9.]/g,'')"
                           @blur="salaryChangeWb6">
                    <span>%</span>
                    <span>预加常数值</span>
                    <input v-model="wb.likeNumBasicScore"
                           class="third-inp"
                           oninput="value=value.replace(/[^0-9.]/g,'')"
                           @change="changeNum('likeNumBasicScore')">
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="fourth-div">
            <el-button @click="saveWeight">保存权重</el-button>
            <el-button type="primary"
                       @click="saveList">生成榜单</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="制定榜单周期"
               :visible.sync="dateVisible"
               width="30%"
               center
               @close='closeDialog'>
      <el-form>
        <el-form-item label="请选择榜单周期:"
                      :label-width="formLabelWidth">
          <el-date-picker v-model="publishTime"
                          type="daterange"
                          size="small"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="saveFinal">确 定</el-button>
        <el-button @click="cancelFinal">取 消</el-button>

      </div>
    </el-dialog>
    <el-dialog :visible.sync="tipVisible"
               :modal-append-to-body="false"
               :close-on-click-modal='false'
               center
               @close="cancelSearch"
               width="30%"
               :title="diaType+'榜单制作'">
      <div class="add-list-dialog flex-cloumn-all">
        <!-- <i class="el-icon-success"></i> -->
        <!-- <p class="add-dialog-ss">操作成功，开始诊断</p> -->
        <!-- <p class="add-dialog-ss">微信榜单正在制作,请稍后在<span style="color:red">榜单列表</span>查看</p> -->
        <p class="add-dialog-pp">{{diaType}}榜单正在制作,请稍后在<span @click="toList">【榜单列表】</span>中查看详情</p>
        <!-- <p class="add-dialog-pp">正在诊断中，本次诊断预计耗时10-15分钟，您可以在<span @click="toTab">【任务列表】</span>中查看详情</p> -->
      </div>
      <div slot="footer">
        <el-button type="success"
                   @click="toList">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { timeFormat } from '@/lib/tools'
export default {
  data () {
    return {
      tipVisible: false,
      dateVisible: false,
      formLabelWidth: '120px',
      publishTime: [], // 榜单周期
      duration: '1', // 分析时长
      duration2: '1', // 分析时长
      dateType: '1', // 类型
      diaType: '微信',
      wx: {
        id: '',
        influence: 0, // 影响力
        totalReadNum: '', // 文章总阅读数
        totalReadNumBasicScore: '', // 文章总阅读数基础分
        singleReadNum: '', // 单篇文章最高阅读数
        singleReadNumBasicScore: '', // 单篇文章最高阅读数基础分
        averReadNum: '', // 平均每篇文章阅读数
        averReadNumBasicScore: '', // 平均每篇文章阅读数基础分
        spread: 0, // 传播力
        articleNum: '', // 文章数
        articleNumBasicScore: '', // 文章数基础分
        articleMaxNum: '', // 文章最大数
        articleNumMaxScore: '', // 文章数最大分
        releaseArticleNum: '', // 发布文章数
        releaseArticleNumBasicScore: '', // 发布文章数基础分
        releaseArticleMaxNum: '', // 发布文章最大数
        releaseArticleNumMaxScore: '', // 发布文章数最大分
        guide: 0, // 引导力
        lookNum: '', // 在看数
        lookNumBasicScore: '', // 在看数基础分
        likeNum: '', // 点赞数
        likeNumBasicScore: ''// 点赞数基础分
      },
      wb: {
        id: '',
        influence: 0, // 影响力
        fanNum: '', // 粉丝数
        fanNumBasicScore: '', // 粉丝数基础分
        forwardNum: '', // 被转发阅读数
        forwardNumBasicScore: '', // 被转发最高阅读数基础分
        spread: '', // 传播力
        totalNum: '', // 微博总数
        totalNumBasicScore: '', // 微博总数基础分
        totalMaxNum: '', // 微博总数最大数
        totalNumMaxScore: '', // 微博总数最大分
        originalArticleNum: '', // 原创文章数
        originalArticleNumBasicScore: '', // 原创文章数基础分
        guide: '', // 引导力
        commentNum: '', // 评论数
        commentNumBasicScore: '', // 评论数基础分
        likeNum: '', // 点赞数
        likeNumBasicScore: '' // 点赞数基础分
      },
      time: [], // 时间范围
      radio: '', // 时间单选
      cycle: []
    }
  },
  watch: {
    radio (newValue, oldValue) {
      console.log(newValue)
      console.log(timeFormat(this.calcDate(newValue === '1' ? 7 : 30)))
      console.log(timeFormat(this.calcDate(1)))
      // 自定义时间changeDate筛选触发，radio= '' 不让清空右侧值，不然自定义时间赋值不上
      if (newValue) {
        this.time = [] // 清空右侧 自定义时间
      }
      // this.params.publishTime[0] = timeFormat(this.calcDate(newValue === '1' ? 7 : 30))
      // this.params.publishTime[1] = timeFormat(this.calcDate(1))
      // this.calcDate(1)
      // this.calcDate(newValue === '1' ? 7 : 30)
    }
  },
  methods: {
    // 取消弹框
    cancelSearch () {
      this.tipVisible = false
    },
    // 时间选择后 清除单选
    changeDate () {
      this.radio = ''
    },
    salaryChange (e) {
      this.wx.totalReadNum = e.target.value
      this.change1()
    },
    salaryChange2 (e) {
      this.wx.singleReadNum = e.target.value
      this.change1()
    },
    salaryChange3 (e) {
      this.wx.averReadNum = e.target.value
      this.change1()
    },
    salaryChange4 (e) {
      this.wx.articleNum = e.target.value
      this.change2()
    },
    salaryChange5 (e) {
      this.wx.releaseArticleNum = e.target.value
      this.change2()
    },
    salaryChange6 (e) {
      this.wx.lookNum = e.target.value
      this.change3()
    },
    salaryChange7 (e) {
      this.wx.likeNum = e.target.value
      this.change3()
    },
    salaryChangeWb (e) {
      this.wb.fanNum = e.target.value
      this.change1()
    },
    salaryChangeWb2 (e) {
      this.wb.forwardNum = e.target.value
      this.change1()
    },
    salaryChangeWb3 (e) {
      this.wb.totalNum = e.target.value
      this.change2()
    },
    salaryChangeWb4 (e) {
      this.wb.originalArticleNum = e.target.value
      this.change2()
    },
    salaryChangeWb5 (e) {
      this.wb.commentNum = e.target.value
      this.change3()
    },
    salaryChangeWb6 (e) {
      this.wb.likeNum = e.target.value
      this.change3()
    },
    // 影响力
    change1 () {
      if (this.dateType == '1') {
        if (!this.wx.totalReadNum) {
          console.log('111111')
          this.wx.totalReadNum = 0
        }
        if (!this.wx.singleReadNum) {
          this.wx.singleReadNum = 0
        }
        if (!this.wx.averReadNum) {
          this.wx.averReadNum = 0
        }
        if (this.wx.totalReadNum.toString().indexOf('.') > -1 || this.wx.totalReadNum.toString().indexOf(' ') > -1) {
          console.log('222222')
          this.$message.error('请不要输入小数点或者空格!')
          this.wx.totalReadNum = 0
        } else if (this.wx.singleReadNum.toString().indexOf('.') > -1 || this.wx.singleReadNum.toString().indexOf(' ') > -1) {
          this.$message.error('请不要输入小数点或者空格!')
          this.wx.singleReadNum = 0
        } else if (this.wx.averReadNum.toString().indexOf('.') > -1 || this.wx.averReadNum.toString().indexOf(' ') > -1) {
          this.$message.error('请不要输入小数点或者空格!')
          this.wx.averReadNum = 0
        }
        this.wx.influence = Number(this.wx.totalReadNum) + Number(this.wx.singleReadNum) + Number(this.wx.averReadNum)
      } else {
        if (!this.wb.fanNum) {
          this.wb.fanNum = 0
        }
        if (!this.wb.forwardNum) {
          this.wb.forwardNum = 0
        }
        if (this.wb.fanNum.toString().indexOf('.') > -1 || this.wb.fanNum.toString().indexOf(' ') > -1) {
          this.$message.error('请不要输入小数点或者空格!')
          this.wb.fanNum = 0
        } else if (this.wb.forwardNum.toString().indexOf('.') > -1 || this.wb.forwardNum.toString().indexOf(' ') > -1) {
          this.$message.error('请不要输入小数点或者空格!')
          this.wb.forwardNum = 0
        }
        this.wb.influence = Number(this.wb.fanNum) + Number(this.wb.forwardNum)
      }
    },
    // 传播力
    change2 () {
      console.log(this.wx)
      if (this.dateType == '1') {
        if (!this.wx.articleNum) {
          this.wx.articleNum = 0
        }
        if (!this.wx.releaseArticleNum) {
          this.wx.releaseArticleNum = 0
        }
        if (this.wx.articleNum.toString().indexOf('.') > -1 || this.wx.articleNum.toString().indexOf(' ') > -1) {
          this.$message.error('请不要输入小数点或者空格!')
          this.wx.articleNum = 0
        } else if (this.wx.releaseArticleNum.toString().indexOf('.') > -1 || this.wx.releaseArticleNum.toString().indexOf(' ') > -1) {
          this.$message.error('请不要输入小数点或者空格!')
          this.wx.releaseArticleNum = 0
        }
        this.wx.articleNumMaxScore = this.wx.articleNum
        this.wx.releaseArticleNumMaxScore = this.wx.releaseArticleNum
        // this.wx.spread = this.wx.articleNum + this.wx.releaseArticleNum
        // console.log(this.wx.articleNumMaxScore)
        this.wx.spread = Number(this.wx.articleNum) + Number(this.wx.releaseArticleNum)
      } else {
        if (!this.wb.totalNum) {
          this.wb.totalNum = 0
        }
        if (!this.wb.originalArticleNum) {
          this.wb.originalArticleNum = 0
        }
        if (this.wb.totalNum.toString().indexOf('.') > -1 || this.wb.totalNum.toString().indexOf(' ') > -1) {
          this.$message.error('请不要输入小数点或者空格!')
          this.wb.totalNum = 0
        }
        this.wb.totalNumMaxScore = this.wb.totalNum
        this.wb.spread = Number(this.wb.totalNum) + Number(this.wb.originalArticleNum)
      }
    },
    change3 () {
      if (this.dateType == '1') {
        console.log(!this.wx.likeNum, this.wx.likeNum)
        if (!this.wx.lookNum) {
          this.wx.lookNum = 0
        }
        if (!this.wx.likeNum) {
          this.wx.likeNum = 0
        }
        if (this.wx.lookNum.toString().indexOf('.') > -1 || this.wx.lookNum.toString().indexOf(' ') > -1) {
          this.$message.error('请不要输入小数点或者空格!')
          this.wx.lookNum = 0
        } else if (this.wx.likeNum.toString().indexOf('.') > -1 || this.wx.likeNum.toString().indexOf(' ') > -1) {
          this.$message.error('请不要输入小数点或者空格!')
          this.wx.likeNum = 0
        }
        this.wx.guide = Number(this.wx.lookNum) + Number(this.wx.likeNum)
      } else {
        if (!this.wb.commentNum) {
          this.wb.commentNum = 0
        }
        if (!this.wb.likeNum) {
          this.wb.likeNum = 0
        }
        if (this.wb.commentNum.toString().indexOf('.') > -1 || this.wb.commentNum.toString().indexOf(' ') > -1) {
          this.$message.error('请不要输入小数点或者空格!')
          this.wb.commentNum = 0
        } else if (this.wb.likeNum.toString().indexOf('.') > -1 || this.wb.likeNum.toString().indexOf(' ') > -1) {
          this.$message.error('请不要输入小数点或者空格!')
          this.wb.likeNum = 0
        }
        this.wb.guide = Number(this.wb.commentNum) + Number(this.wb.likeNum)
      }
    },
    changeNum (num) {
      // console.log(num)
      if (this.dateType == '1') {
        if (this.wx[num].toString().indexOf('.') > -1 || this.wx[num].toString().indexOf(' ') > -1) {
          this.$message.error('请不要输入小数点或者空格!')
          this.wx[num] = 0
        }
      } else {
        if (this.wb[num].toString().indexOf('.') > -1 || this.wb[num].toString().indexOf(' ') > -1) {
          this.$message.error('请不要输入小数点或者空格!')
          this.wb[num] = 0
        }
      }
    },
    changeType () {
      if (this.dateType == '1') {
        this.diaType = '微信'
      } else {
        this.diaType = '微博'
      }
      // console.log(this.ruleForm.dataType)
      // this.calcCycle()
    },
    calcDate (num) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * num)
      return date
    },
    // 保存权重
    saveWeight () {
      if (this.dateType == '1') {
        if (Number(this.wx.influence) + Number(this.wx.spread) + Number(this.wx.guide) === 100) {
          this.$http.post(this.$api.saveInfoWx, this.wx)
            .then(res => {
              // console.log(res)
              if (res.data.code === 200) {
                this.getInfoWx()
                this.$message.success('微信权重设置成功!')
              }
            }).catch(() => {
            })
        } else {
          this.$message.error('输入有误,各项权重和应为100!请重新输入')
        }
      } else {
        if (Number(this.wb.influence) + Number(this.wb.spread) + Number(this.wb.guide) === 100) {
          this.$http.post(this.$api.saveInfoWb, this.wb)
            .then(res => {
              // console.log(res)
              if (res.data.code === 200) {
                this.getInfoWb()
                this.$message.success('微博权重设置成功!')
              }
            }).catch(() => {
            })
        } else {
          this.$message.error('输入有误,各项权重和应为100!请重新输入')
        }
      }
    },
    // 生成榜单
    saveList () {
      // this.saveWeight()
      if (this.dateType == '1') {
        if (Number(this.wx.influence) + Number(this.wx.spread) + Number(this.wx.guide) === 100) {
          this.$http.post(this.$api.saveInfoWx, this.wx)
            .then(res => {
              if (res.data.code === 200) {
                this.dateVisible = true
              }
            }).catch(() => {
            })
        } else {
          this.$message.error('输入有误,各项权重和应为100!请重新输入')
        }
      } else {
        if (Number(this.wb.influence) + Number(this.wb.spread) + Number(this.wb.guide) === 100) {
          this.$http.post(this.$api.saveInfoWb, this.wb)
            .then(res => {
              if (res.data.code === 200) {
                this.dateVisible = true
              }
            }).catch(() => {
            })
        } else {
          this.$message.error('输入有误,各项权重和应为100!请重新输入')
        }
      }
    },
    saveFinal () {
      if (this.publishTime.length < 1) {
        this.$message.error('请选择榜单周期!')
      } else {
        let par = {
          weightId: this.dateType == '1' ? this.wx.id : this.wb.id,
          type: this.dateType,
          weightStartTime: this.publishTime[0],
          weightEndTime: this.publishTime[1]
        }
        this.$http.post(this.$api.saveRanking, par)
          .then(res => {
            if (res.data.code === 200) {
              this.dateVisible = false
              this.tipVisible = true
            }
          }).catch(() => {
          })
      }

      // this.dateVisible = false
      // this.tipVisible = true
    },
    cancelFinal () {
      this.dateVisible = false
      this.tipVisible = false
    },
    // 取消dialog事件
    closeDialog () {
      this.publishTime = ''
    },
    // 获取微信榜单权重
    getInfoWx () {
      this.$http.get(this.$api.getInfoWx)
        .then(res => {
          this.wx = res.data.data
          // console.log(this.wx)
        }).catch(() => { })
    },
    getInfoWb () {
      this.$http.get(this.$api.getInfoWb)
        .then(res => {
          this.wb = res.data.data
        }).catch(() => { })
    },
    // toTab () {
    //   this.tipVisible = false
    //   this.$emit('changeTab', 'taskList')
    // },
    toList () {
      this.tipVisible = false
      this.$emit('changeTab', 'taskList')
    },
    format (percentage) {
      // return percentage + '分'
      return percentage
    },
    // 计算周期
    calcCycle () {
      let end = this.calcDate(1)
      // let start = this.calcDate(this.duration === '1' ? 7 : 30)
      let start = this.calcDate(this.ruleForm.dateType === '1' ? 7 : 30)
      this.cycle[0] = timeFormat(start)
      this.cycle[1] = timeFormat(end)
    }
  },
  created () {
    this.getInfoWx()
    this.getInfoWb()
    // this.getRecord()
    // this.calcCycle()

    // this.getTime()
  },
  mounted () {
  },
  destroyed () {
  },
  components: {
    // vSearch
  }
}
</script>
<style lang="scss" scoped>
@import '../../monitor/monitor.css';
.interaction {
  margin-bottom: 20px;
}
.first-div {
  width: 774px;
  height: 200px;
  margin-bottom: 25px;
  border: 1px solid #f0f1f3;
  border-top: 2px solid #f46e0a;
  .first-left {
    display: inline-block;
    vertical-align: top;
    width: 126px;
    height: 100%;
    background-color: #f7f7f9;
    position: relative;
    // .first-inp {
    //   width: 30px;
    //   height: 30px;
    //   // line-height: 34px;
    //   border: 1px solid #ee9518;
    //   color: #f79406;
    //   font-size: 14px;
    //   position: absolute;
    //   left: 45px;
    //   top: 116px;
    //   border-radius: 3px;
    // }
    .first-left-title {
      font-size: 16px;
      position: absolute;
      top: 70px;
      left: 41px;
      color: #f46e0a;
    }
    .first-left-num {
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ee9518;
      border-radius: 3px;
      color: #f79406;
      position: absolute;
      left: 45px;
      top: 116px;
    }
    // p {
    //   font-size: 16px;
    //   position: absolute;
    //   top: 70px;
    //   left: 41px;
    //   color: #f46e0a;
    // }
    span {
      // font-size:14px;
      margin-left: 5px;
      position: absolute;
      top: 125px;
      left: 80px;
      color: #f46e0a;
    }
  }
  .first-right {
    display: inline-block;
    vertical-align: top;
    width: 648px;
    height: 100%;
    // background: #67c23a;
    ul {
      li {
        font-size: 14px;
        //  display: block;
        //  width: 100%;
        //  height:33%;
        // text-align: right;
        padding: 20px 50px 15px 50px;
        input {
          width: 37px;
          height: 28px;
          background-color: #fbf5ee;
          // opacity: 0.6;
          border: 1px solid #fbf5ee;
          text-align: center;
          color: #151c29;
          margin-left: 15px;
          margin-right: 10px;
        }
        span:nth-child(1) {
          color: #888888;
        }
        span:nth-child(3) {
          color: #252934;
        }
        span:nth-child(4) {
          color: #151c29;
          margin-left: 40px;
        }
      }
      li:nth-child(1) {
        margin-left: 40px;
      }
      div {
        // border-bottom:1px solid #fff;
        width: 588px;
        height: 1px;
        background-color: #f0f1f3;
        margin: 0 auto;
      }
    }
  }
}
.second-div {
  width: 774px;
  height: 154px;
  border: 1px solid #f0f1f3;
  border-top: 2px solid #f46e0a;
  margin-bottom: 25px;
  .second-left {
    display: inline-block;
    vertical-align: top;
    width: 126px;
    height: 100%;
    background-color: #f7f7f9;
    position: relative;
    // .second-inp {
    //   width: 30px;
    //   height: 30px;
    //   // line-height: 34px;
    //   border: 1px solid #ee9518;
    //   color: #f79406;
    //   font-size: 14px;
    //   position: absolute;
    //   left: 45px;
    //   top: 89px;
    //   border-radius: 3px;
    // }
    // p {
    //   font-size: 16px;
    //   position: absolute;
    //   top: 50px;
    //   left: 41px;
    //   color: #f46e0a;
    // }
    .second-left-title {
      font-size: 16px;
      position: absolute;
      top: 50px;
      left: 41px;
      color: #f46e0a;
    }
    .second-left-num {
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ee9518;
      border-radius: 3px;
      color: #f79406;
      position: absolute;
      left: 45px;
      top: 89px;
    }
    span {
      // font-size:14px;
      margin-left: 5px;
      position: absolute;
      top: 95px;
      left: 80px;
      color: #f46e0a;
    }
  }
  .second-right {
    display: inline-block;
    vertical-align: top;
    width: 648px;
    height: 100%;
    // background: #67c23a;
    ul {
      li {
        font-size: 14px;
        //  display: block;
        //  width: 100%;
        //  height:33%;
        // text-align: right;
        padding: 10px 20px 15px 20px;
        input {
          width: 37px;
          height: 28px;
          background-color: #fbf5ee;
          // opacity: 0.6;
          border: 1px solid #fbf5ee;
          text-align: center;
          color: #151c29;
          margin-left: 15px;
          margin-right: 10px;
        }
        span:nth-child(1) {
          color: #888888;
        }
        span:nth-child(3) {
          color: #252934;
        }
        span:nth-child(4) {
          display: inline-block;
          width: 42px;
          // height: 28px;
          color: #151c29;
          margin-left: 20px;
          text-align: center;
        }
        span:nth-child(6) {
          color: #888888;
        }
        span:nth-child(8) {
          margin-right: 20px;
        }
      }
      li:nth-child(1) {
        margin-left: 15px;
        span:nth-child(6) {
          margin-left: 15px;
        }
      }
      div {
        // border-bottom:1px solid #fff;
        width: 588px;
        height: 1px;
        background-color: #f0f1f3;
        margin: 0 auto;
      }
    }
  }
}
.third-div {
  width: 774px;
  height: 111px;
  border: 1px solid #f0f1f3;
  border-top: 2px solid #f46e0a;
  margin-bottom: 25px;
  .third-left {
    display: inline-block;
    vertical-align: top;
    width: 126px;
    height: 100%;
    background-color: #f7f7f9;
    position: relative;
    // .third-inp {
    //   width: 30px;
    //   height: 30px;
    //   // line-height: 34px;
    //   border: 1px solid #ee9518;
    //   color: #f79406;
    //   font-size: 14px;
    //   position: absolute;
    //   left: 45px;
    //   top: 60px;
    //   border-radius: 3px;
    // }
    // p {
    //   font-size: 16px;
    //   position: absolute;
    //   top: 20px;
    //   left: 41px;
    //   color: #f46e0a;
    // }
    .third-left-title {
      font-size: 16px;
      position: absolute;
      top: 20px;
      left: 41px;
      color: #f46e0a;
    }
    .third-left-num {
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ee9518;
      border-radius: 3px;
      color: #f79406;
      position: absolute;
      left: 45px;
      top: 60px;
    }
    span {
      // font-size:14px;
      margin-left: 5px;
      position: absolute;
      top: 68px;
      left: 80px;
      color: #f46e0a;
    }
  }
  .third-right {
    display: inline-block;
    vertical-align: top;
    width: 648px;
    height: 100%;
    // background: #67c23a;
    ul {
      li {
        font-size: 14px;
        //  display: block;
        //  width: 100%;
        //  height:33%;
        // text-align: right;
        padding: 35px 20px 15px 20px;
        position: relative;
        input {
          width: 37px;
          height: 28px;
          background-color: #fbf5ee;
          // opacity: 0.6;
          border: 1px solid #fbf5ee;
          text-align: center;
          color: #151c29;
          margin-left: 15px;
          margin-right: 10px;
          // margin-top:-10px;
        }
        span:nth-child(1) {
          color: #888888;
          display: inline-block;
          width: 56px;
          font-size: 14px;
          text-align: center;
        }
        span:nth-child(3) {
          color: #252934;
        }
        span:nth-child(4) {
          display: inline-block;
          width: 42px;
          // height: 28px;
          color: #151c29;
          margin-left: 20px;
          text-align: center;
        }
        span:nth-child(6) {
          color: #888888;
        }
        span:nth-child(7) {
          color: #888888;
          display: inline-block;
          width: 56px;
          font-size: 14px;
          margin-left: 50px;
          text-align: center;
        }
        span:nth-child(8) {
          margin-right: 20px;
        }
        span:nth-child(9) {
          margin-right: 20px;
        }
        span:nth-child(10) {
          display: inline-block;
          width: 42px;
          text-align: center;
        }
        div {
          // border-bottom:1px solid #fff;
          display: inline-block;
          height: 56px;
          width: 1px;
          position: absolute;
          top: 27px;
          right: 320px;
          background-color: #f0f1f3;
          // margin-right: 20px;
          // margin-left: 20px;
          // margin-top:20px;
        }
      }
      li:nth-child(1) {
        margin-left: 15px;
        span:nth-child(6) {
          margin-left: 15px;
        }
      }
    }
  }
}
.fourth-div {
  // margin: 0 auto;
  margin-bottom: 70px;
  text-align: center;
  .el-button {
    border-radius: 3px;
  }
  button:nth-child(1) {
    background-color: #edeff4;
    border: 1px solid #edeff4;
    margin-right: 20px;
  }
  button:nth-child(2) {
    background-color: #3b82fe;
    border: 1px solid #3b82fe;
    margin-left: 20px;
  }
}
.wb-div {
  .second-div {
    .second-right {
      li:nth-child(1) {
        span:nth-child(6) {
          margin-left: 0px;
        }
        input {
          // color: #f46e0a;
        }
      }
    }
  }
}

.add-task-search .el-input--small .el-input__inner {
  height: 40px;
  line-height: 40px;
}
.add-task-search .el-input--small {
  font-size: 14px;
}
.add-task-search .el-button {
  width: 90px;
  height: 40px;
  font-size: 16px;
}
.add-main > .el-button {
  width: 225px;
  height: 50px;
  font-size: 16px;
  margin: 30px 0 80px;
}

.add-main {
  margin: 20px;
}
.add-task-search p {
  width: 90px;
  font-size: 16px;
}
.list-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.time-box {
  width: 580px;
  margin: 20px auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-date-editor {
  width: 355px;
  margin-left: 20px;
}
.wrong-btn {
  text-align: center;
  margin-top: 20px;
}
.add-task-search .el-input {
  width: 377px;
  height: 40px;
  // margin-right: 10px;
}
.add-main-record {
  width: 380px;
  // margin: 8px auto;
  margin-top: 16px;
}
.add-main-record p {
  float: left;
}
.add-main-record p:nth-child(1) {
  color: #151c29;
}
.add-main-record p:nth-child(2) {
  width: 240px;
  color: #7c889b;
}
.add-main-record p:nth-child(2) span {
  float: left;
  padding-right: 12px;
}
.add-main-record p:nth-child(3) {
  color: #7c889b;
  cursor: pointer;
}
.add-list-box {
  width: 483px;
  height: 110px;
  background: #f7f8fa;
  margin-top: 15px;
  margin-left: 15px;
  float: left;
  padding: 20px;
  border: 1px solid #f7f8fa;
  box-sizing: border-box;
}
.add-main-list .is_select_box {
  border-color: #f79406;
}
.add-list-box > img {
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-right: 10px;
}
.add-list-msg {
  flex: 1;
}
.add-list-msg > p,
.add-dialog-pp {
  color: #6b798e;
  margin-top: 5px;
}
.add-dialog-pp {
  font-size: 18px;
}
.add-list-name p {
  color: #151c29;
}
.add-list-name p:nth-child(1) {
  font-size: 16px;
}
.add-list-select {
  padding: 2px 18px;
  color: #adaeb2;
  border: 1px solid #e1e4e8;
  cursor: pointer;
}
.add-list-msg .is_select_act {
  color: #f79406;
  border-color: #f79406;
}
.add-list-dialog i {
  color: #67c23a;
  font-size: 60px;
  height: 60px;
}
.add-dialog-ss {
  font-size: 24px;
  font-weight: bold;
  color: #151c29;
  margin-bottom: 20px;
}
.add-dialog-pp span {
  // color: #3b81fe;
  color: red;
  cursor: pointer;
}

.title {
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
  /* font-weight: 550; */
}
.radio {
  text-align: center;
}
.radio1 {
  margin-right: 80px;

  margin-bottom: 20px;
}
.tips {
  text-align: center;
  margin: 10px 0 10px 0;
}
</style>

<style>
.main-list-box .el-progress__text {
  display: block;
}
.main-list-box .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #f56c6c;
  border-color: #f56c6c;
}
</style>
<style scoped>
.list-main {
  width: 100%;
  height: 100%;
}
.list-main-search {
  height: 40px;
}
.list-main-search .el-range-editor.el-input__inner {
  width: 230px;
}
.list-main-list {
  width: 100%;
  margin: 20px 0;
  min-height: 700px;
}
.list-main-list > p {
  text-align: center;
  line-height: 200px;
  color: #6b798e;
}
.main-list-box {
  width: 355px;
  height: 200px;
  margin: 10px;
  padding: 10px;
  float: left;
  position: relative;
  box-sizing: border-box;
  border: 1px solid #e4e7ea;
  border-radius: 10px;

  cursor: pointer;
}
.list-main-list .is-todelete {
  border-color: #3b81fe;
}
.main-list-del {
  width: 0;
  height: 0;
  border-top: 40px solid #3b81fe;
  border-left: 40px solid transparent;
  position: absolute;
  top: 0;
  right: 0;
}
.main-list-box .el-checkbox-group {
  width: 15px;
  float: right;
  position: absolute;
  top: 3px;
  right: 3px;
}
.main-list-up > img {
  widows: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 10px;
}
.main-list-name p:nth-child(1) {
  font-size: 16px;
  color: #151c29;
}
.main-list-name p:nth-child(2) {
  color: #6b798e;
}
.main-list-time .main-list-time2 {
  margin-top: 10px;
  margin-left: 10px;
}
.main-list-time2 {
  margin-bottom: 10px;
}
.main-list-time2 p {
  margin-bottom: 5px;
}
.main-list-time2-span {
  color: chocolate;
}
.main-list-time p {
  color: #adaeb2;
}
.main-list-time p span {
  color: #151c29;
}
.list-main {
  padding: 20px;
}
.top_all {
  padding: 0 0 10px 0;
  border-bottom: 1px solid #e4e7ea;
  margin-bottom: 10px;
}
</style>
