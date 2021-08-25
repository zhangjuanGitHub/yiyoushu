<!--
 * @Author: zhangjuan
 * @Date: 2021-05-10 11:14:46
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-06-28 17:26:52
-->
<template>
  <div class="interaction">
    <div class="tabs-header">
      <span class="tabs-title">账号对比</span>
    </div>
    <div class="account-compare-wrap" v-if="!startComparing">
      <!-- 选择区域 -->
      <div class="compare-select-contain  flex-cloumn-cen">
        <!-- 已选择了账号 -->
        <div class="compare-selected-box flex-ali-center"
             v-if="isSelList.length > 0">
          <div class="compare-is-select flex-ali-center"
               v-for="(item, index) of isSelList" :key="index">
            <div class="compare-ava-head flex-cloumn-cen">
              <img :src="item.ori_head_img || undefinedUrl" alt="">
              <span class="lin-clamp-1">{{item.nickname}}</span>
              <p @click="deleteAccount(item, index)"><i class="el-icon-close"></i></p>
            </div>
            <p v-if="index < 4">vs</p>
          </div>
          <div class="compare-is-select" v-if="isSelList.length < 5">
            <div class="flex-cloumn-cen cursor"  @click="addAccount">
              <img src="@/assets/images/monitor/compare_2.png" alt="">
              <span style="height: 24px"></span>
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
          <p>添加需要对比的公众号</p>
        </div>
        <el-button type="primary"
                    size="small"
                    @click="startCompare"
                    v-if="isSelList.length >= 2"
                    class="compare-start-btn">开始对比</el-button>
        <el-tooltip effect="dark"
                    content="至少添加两个账号进行对比"
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
              <div class="flex-ali-center" v-for="(i, sIndex) of item" :key="'h1'+sIndex">
                <p class="compare-his-nick lin-clamp-1">{{i.nickname}}</p>
                <p class="compare-vs" v-if="sIndex < item.length - 1 ">vs</p>
              </div>
            </div>
            <div class="compare-his-ava flex-ali-center">
              <img :src="j.hd_head_img || undefinedUrl" alt=""
                   :style="{'z-index': 100-mIndex}"
                    v-for="(j, mIndex) of item" :key="'h2'+mIndex">
            </div>
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
            <span class="compare-acc-tab"
                  :class="activeTab==='echarts'?'is-selected':''"
                  @click="changeTab('echarts', true)">图表展示</span>
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
              <img :src="item.hd_head_img || undefinedUrl" alt="">
              <div class="compare-data-col flex-ali-center">
                <p class="lin-clamp-1" style="padding: 3px 0">{{item.nickname}}</p>
                <el-popover placement="top"
                            trigger="hover"
                            v-if="item.is_follow === 0"
                            content="点击即可收藏">
                  <img src="@/assets/images/home/collect_1.png"
                      @click="submitCollect(item, index, 1)"
                      slot="reference" alt="">
                </el-popover>
                <el-popover placement="top"
                            trigger="hover"
                            v-if="item.is_follow === 1"
                            content="取消收藏">
                  <img src="@/assets/images/home/collect_2.png"
                      @click="submitCollect(item, index, 0)"
                      slot="reference" alt="">
                </el-popover>
              </div>
              <p>
                <el-popover placement="top" width="260" trigger="hover">
                  <div class="compare-pop-box">
                    <p class="pop-title">关于【易指数】</p>
                    <p class="pop-cont">通过公信力、影响力、传播力、引导力多个维度，以及专家推出的计算公式，得出此公众号易指数“值”，根据此“值”反应众号在此时间段整体热度和发展趋势。</p>
                  </div>
                  <i slot="reference" class="el-icon-question cursor"></i>
                </el-popover>
                <span v-html="item.sum"></span>
              </p>
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
              <p>是否认证</p>
              <p>认证类型</p>
              <p>认证主体</p>
              <p>认证描述</p>
            </div>
            <div class="compare-data-right flex-ali-center">
              <div class="compare-data-msg"
                  :style="{width: calcWidth +'%'}"
                  v-for="(item, index) of infoList" :key="'j'+index">
                <p v-html="item.auth_type ? '是' : '否'"></p>
                <p>{{getChinese(item.auth_type) || '-'}}</p>
                <p v-html="item.auth_info || '-'" class="lin-clamp-1"></p>
                <el-tooltip class="item" effect="dark" :content="item.introduction" placement="top" v-if="item.introduction.length > 13">
                  <p v-html="item.introduction || '无'" class="lin-clamp-1" style="padding: 3px 0"></p>
                </el-tooltip>
                <p v-else v-html="item.introduction || '无'"></p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="compare-data-tip cursor"
               style="background: #ECF0F8;">
            <div class="compare-tip-left" @click="changeBlock(null, 1)">
              <p>
                <span>公信力</span>
                <el-popover placement="right" width="260" trigger="hover">
                  <div class="compare-pop-box">
                    <p class="pop-cont">【公信力】通过原创度和专业度两个维度以及专家推出的计算公式，得出此公众号公信力“值”，根据公信力“值”，判断社会公众对此账号的信任度。</p>
                  </div>
                  <i slot="reference" class="el-icon-question cursor"></i>
                </el-popover>
              </p>
            </div>
            <div class="compare-tip-right flex-ali-center">
              <div class="compare-data-msg"
                  :style="{width: calcWidth +'%'}"
                  v-for="(item, index) of compareList" :key="'g1'+index"
                  @click="changeBlock(null, 1)">
                <p v-html="item.credibilityNum" class="font-bold"></p>
              </div>
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
              <p>原创度</p>
              <p v-if="compareList[0].involveFunctionSum">专业度</p>
            </div>
            <div class="compare-data-right flex-ali-center">
              <div class="compare-data-msg"
                  :style="{width: calcWidth +'%'}"
                  v-for="(item, index) of compareList" :key="'g'+index">
                <p v-html="item.articleOrgionSum"></p>
                <p v-html="item.involveFunctionSum" v-if="item.involveFunctionSum"></p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="compare-data-tip cursor"
               style="background: #FDF1EA;">
            <div class="compare-tip-left" @click="changeBlock(null, 2)">
              <p>
                <span>影响力</span>
                <el-popover placement="right" width="260" trigger="hover">
                  <div class="compare-pop-box">
                    <p class="pop-cont">【影响力】通过文章数和发布次数两个维度以及专家推出的计算公式，得出此公众号影响力“值”，根据影响力“值”，反应此公众号发布文章内容是否符合受众需要，其负载的价值理念是否能够得到受众的认可和赞同。</p>
                  </div>
                  <i slot="reference" class="el-icon-question cursor"></i>
                </el-popover>
              </p>
            </div>
            <div class="compare-tip-right flex-ali-center">
              <div class="compare-data-msg"
                  :style="{width: calcWidth +'%'}"
                  v-for="(item, index) of compareList" :key="'g1'+index"
                  @click="changeBlock(null, 2)">
                <p v-html="item.influenceNum" class="font-bold"></p>
              </div>
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
              <p>文章数</p>
              <p>发布次数</p>
            </div>
            <div class="compare-data-right flex-ali-center">
              <div class="compare-data-msg"
                  :style="{width: calcWidth +'%'}"
                  v-for="(item, index) of compareList" :key="'y'+index">
                <p v-html="item.articleSum"></p>
                <p v-html="item.articleOneSum"></p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="compare-data-tip cursor"
               style="background: #F7FAF5;">
            <div class="compare-tip-left" @click="changeBlock(null, 3)">
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
            <div class="compare-tip-right flex-ali-center">
              <div class="compare-data-msg"
                  :style="{width: calcWidth +'%'}"
                  v-for="(item, index) of compareList" :key="'g1'+index"
                  @click="changeBlock(null, 3)">
                <p v-html="item.propagateNum" class="font-bold"></p>
              </div>
              <div class="compare-tip-icon">
                <el-tooltip class="item" effect="dark" content="收起" placement="top" v-if="showBlock[3]">
                  <i class="el-icon-arrow-up" @click="changeBlock(false, 3)"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="展开" placement="top" v-else>
                  <i class="el-icon-arrow-down" @click="changeBlock(true, 3)"></i>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="compare-data-box" v-if="showBlock[3]">
            <div class="compare-data-left">
              <p>阅读总数</p>
              <p>日均阅读数</p>
              <p>篇均阅读数</p>
              <p>头条阅读总数</p>
              <p>头条日均阅读数</p>
              <p>头条篇均阅读数</p>
            </div>
            <div class="compare-data-right flex-ali-center">
              <div class="compare-data-msg"
                  :style="{width: calcWidth +'%'}"
                  v-for="(item, index) of compareList" :key="'c'+index">
                <p v-html="item.readSum"></p>
                <p v-html="item.readDayNum"></p>
                <p v-html="item.readPieceNum"></p>
                <p v-html="item.readSumOne"></p>
                <p v-html="item.readDayNumOne"></p>
                <p v-html="item.readPieceNumOne"></p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="compare-data-tip cursor"
               style="background: #FBF5FB;">
            <div class="compare-tip-left" @click="changeBlock(null, 4)">
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
            <div class="compare-tip-right flex-ali-center">
              <div class="compare-data-msg"
                  :style="{width: calcWidth +'%'}"
                  v-for="(item, index) of compareList" :key="'g1'+index"
                  @click="changeBlock(null, 4)">
                <p v-html="item.leadershipNum" class="font-bold"></p>
              </div>
              <div class="compare-tip-icon">
                <el-tooltip class="item" effect="dark" content="收起" placement="top" v-if="showBlock[4]">
                  <i class="el-icon-arrow-up" @click="changeBlock(false, 4)"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="展开" placement="top" v-else>
                  <i class="el-icon-arrow-down" @click="changeBlock(true, 4)"></i>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="compare-data-box" v-if="showBlock[4]">
            <div class="compare-data-left">
              <p>评论总数</p>
              <p>回复总数</p>
              <p>点赞总数</p>
              <p>在看总数</p>
              <p>篇均点赞数</p>
              <p>篇均在看数</p>
            </div>
            <div class="compare-data-right flex-ali-center">
              <div class="compare-data-msg"
                  :style="{width: calcWidth +'%'}"
                  v-for="(item, index) of compareList" :key="'l'+index">
                <p v-html="item.commentSum"></p>
                <p v-html="item.replySum"></p>
                <p v-html="item.oldLikeSum"></p>
                <p v-html="item.likeSum"></p>
                <p v-html="item.oldLikePieceNum"></p>
                <p v-html="item.likePieceNum"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 图表展示 -->
      <div class="compare-data-main" v-else>
        <account-chart :allData="allData" ref="chart"></account-chart>
      </div>
    </div>
    <!-- 账号对比 -->
    <el-dialog title="选择账号"
                :visible.sync="selectPerVisible"
                :close-on-click-modal='false'
                :modal-append-to-body="false"
                center
                @close="cancelSelectPer"
                width="800px">
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
            <div class="top-line flex-arr-center">查询结果</div>
            <div class="content-box">
              <div class="flex-bwt-center alone cursor"
                    v-for="(item,index) in searchList"
                    :key="index"
                    @dblclick="shuttle(item,index)">
                <div class="content-box-avatar flex-ali-center">
                  <img :src="item.ori_head_img || undefinedUrl"
                        alt="">
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
              <div class="flex-bwt-center alone"
                    v-for="(item,index) in addList"
                    :key="index">
                <div class="content-box-avatar flex-ali-center">
                  <img :src="item.ori_head_img || undefinedUrl"
                        alt="">
                  <p>{{item.nickname}}</p>
                </div>
                <i class="el-icon-remove-outline cursor"
                    @click="unShuttle(item,index)"></i>
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
import AccountChart from './AccountEcharts'
const getcollectApi = new Map().set('concern', 'setCollect').set('cancel', 'cancelCollect')
export default {
  data () {
    return {
      dialogVisible: false, // 确认删除
      allData: {}, // 对比的所有数据
      compareList: [], // 对比数据
      // compareArr: [],
      infoList: [], // 对比信息
      historyList: [],
      calcWidth: 0,
      activeTab: 'data',
      showBlock: [true, false, false, false, false],
      undefinedUrl: require('@/assets/images/home/avatar.png'),
      isSelList: [], // 已选择的账号
      ruleForm: { // 筛选
        publish: '1'
      },
      startComparing: false,
      showEcharts: false,
      keyword: '', // 账号搜索关键字
      searchList: [], // 根据账号查询到的列表
      addList: [], // 根据账号查询添加后的列表
      publishTime: [], // 时间
      selectPerVisible: false // 账号对比
    }
  },
  components: {
    AccountChart
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
      if (val === null) {
        let res = this.showBlock[num] === true ? false : true
        this.$set(this.showBlock, num, res)
      } else {
        this.$set(this.showBlock, num, val)
      }
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
      this.selectPerVisible = true
      this.isSelList.length > 0 ? this.addList = JSON.parse(JSON.stringify(this.isSelList)) : this.addList = []
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
      if (this.addList.length >= 5) {
        this.$message.warning('已达上限，最多添加五个账号')
      } else {
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
      }
    },
    // 删除已添加公众号
    unShuttle (item, index) {
      this.addList.splice(index, 1)
    },
    // 删除已选择的账号
    deleteAccount (item, index) {
      for (let i = 0; i < this.isSelList.length; i++) {
        if (this.isSelList[i].biz === item.biz) {
          this.isSelList.splice(index, 1)
          return
        }
      }
    },
    // 确认添加账号
    submitPer () {
      this.isSelList = JSON.parse(JSON.stringify(this.addList))
      this.selectPerVisible = false
    },
    // 取消账号对比
    cancelSelectPer () {
      this.selectPerVisible = false
      this.searchList = []
      this.addList = []
      this.keyword = ''
    },
    // 开始对比
    startCompare () {
      if (this.isSelList.length >= 2) {
        let biz = []
        this.isSelList.forEach((item, index) => {
          biz.push(item.biz)
        })
        this.getCompareList(biz)
        if (!this.startComparing) {
          // 添加历史对比记录
          this.$http.post(this.$api.addHistory, { bizList: biz })
            .then(res => {}).catch(() => { })
        }
      }
    },
    getCompareList (biz) {
      let obj = {
        bizList: biz,
        publishTime: this.publishTime
      }
      this.$http.post(this.$api.newAccCompare, obj)
        .then(res => {
          this.startComparing = true
          this.allData = JSON.parse(JSON.stringify(res.data.data))
          this.infoList = res.data.data.dataList
          this.compareList = JSON.parse(JSON.stringify(res.data.data.numList))
          let compareArr = JSON.parse(JSON.stringify(res.data.data.numList))
          this.calcWidth = (1 / res.data.data.numList.length) * 100
          for (let m = 0; m < this.compareList.length; m++) {
            for (let n in this.compareList[m]) {
              if (n === 'sum') {
                this.compareList[m][n] = '<i class="color8">易指数：'+this.compareList[m][n]+'</i>'
              } else {
                this.compareList[m][n] = '<i class="color8">'+this.compareList[m][n]+'</i>'
              }
            }
          }
          for (let i in compareArr[0]) {
            if (compareArr[this.getMaxIndex(compareArr, i)][i] != 0) {
              if (i === 'sum') {
                this.compareList[this.getMaxIndex(compareArr, i)][i] = '<i class="color7">易指数：'+compareArr[this.getMaxIndex(compareArr, i)][i]+'</i>'
              } else {
                this.compareList[this.getMaxIndex(compareArr, i)][i] = '<i class="color7">'+compareArr[this.getMaxIndex(compareArr, i)][i]+'</i>'
              }
            }
          }
          for (let j = 0; j < this.infoList.length; j++) {
            this.infoList[j].sum = this.compareList[j].sum
          }
        }).catch(() => { })
    },
    // 最大值下标
    getMaxIndex (arrs, data) {
      let max = arrs[0]
      let maxIndex = 0
      for (let i = 0; i < arrs.length; i++) {
        if (parseFloat(arrs[i][data]) > parseFloat(max[data])) {
          max = arrs[i]
          maxIndex = i
        }
      }
      return maxIndex
    },
    // 查看历史对比
    lookHistory (item) {
      this.isSelList = item
      let biz = []
      item.forEach((i, index) => {
        biz.push(i.biz)
      })
      this.getCompareList(biz)
    },
    // 获取历史
    getHistory () {
      this.$http.get(this.$api.getHistory)
        .then(res => {
          this.historyList = res.data.data
        }).catch(() => { })
    },
    deleteHistory () {
      this.dialogVisible = true
    },
    // 删除历史
    confirmDel () {
      this.$http.get(this.$api.deleteHistory)
        .then(res => {
          this.dialogVisible = false
          this.getHistory()
        }).catch(() => { })
    },
    returnBack () {
      this.changeTime('1')
      this.isSelList = []
      this.showBlock = [true, false, false, false, false]
      this.startComparing = false
      this.showEcharts = false
      this.activeTab = 'data'
      this.getHistory()
    },
    listenerSubmit (e) {
      if (e.keyCode === 13) {
        this.queryKeyword()
      }
    }
  },
  created () {
    this.changeTime('1')
    this.getHistory()
  },
  mounted () {
    window.addEventListener('keydown', this.listenerSubmit)
  },
  destroyed () {
    window.removeEventListener('keydown', this.listenerSubmit, false)
  }
}
</script>
<style scoped>
/* @import '../monitor.css'; */
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
  width: 350px;
  border: 1px solid #e1e4e8;
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
.content-box::-webkit-scrollbar {
  background: transparent;
}
.content-box::-webkit-scrollbar-thumb,
.top-line,
.alone:hover {
  background: #f7f8fa;
}
.alone > p {
  width: 50%;
  padding: 10px 0;
  text-align: center;
}
.alone {
  height: 45px;
}
.alone i {
  font-size: 18px;
  margin-right: 15px;
}
.top-line,
.name-box {
  height: 40px;
  color: #3b82fe;
}
.name-box {
  color: #3b82fe;
  border-bottom: 1px solid #e1e4e8;
}
</style>
