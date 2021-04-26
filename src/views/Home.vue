<!--
 * @Author: zhangjuan
 * @Description: Home
 * @Date: 2021-01-28 11:10:50
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-04-22 17:11:45
-->
<template>
  <div class="home-wrap">
    <home-search @accountSearch="accountSearch"></home-search>
    <!-- 轮播 -->
    <div class="home-swiper">
      <swiper ref="mySwiper"
              :options="swiperOptions"
              class="swiper-box">
        <swiper-slide v-for="(item, index) of swiperList" :key="index">
          <div class="home-swiper-box"
              :style="{backgroundImage: 'url(' + require('@/assets/images/home/swiper_'+index+'.png') + ')'}">
            <div class="home-swiper-meng">
              <div class="home-swiper-des">
                <p>{{item.title}}</p>
                <p>{{item.content}}</p>
              </div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!-- 热文 -->
    <div class="home-hot-wrap flex-ali-center">
      <div class="home-hot-main">
        <div class="hot-up flex-bwt-center">
          <p class="flex-ali-center">
            <span class="left-title">热文</span>
            <span class="right-tab cursor"
                  :class="{ 'hot_active': hotActive === 'wx'}"
                  @click="changeHotActive('wx')">微信</span>
            <!-- <span class="right-tab cursor"
                  :class="{ 'hot_active': hotActive === 'wb'}"
                  @click="changeHotActive('wb')">微博</span> -->
          </p>
          <p class="hot-up-right">
            <span class="show-reload cursor"
                  @click="changeHotAirticle">换一换<i class="el-icon-refresh"></i></span>
            <span class="show-more cursor"
                  @click="$router.push({ name: 'MoreHot' } )">查看更多<i class="el-icon-arrow-right"></i></span>
          </p>
        </div>
        <div class="hot-down flex-bwt-center">
          <div v-for="(item, index) of hotList" :key="index">
              <el-card shadow="hover"
                    cursor
                    :body-style="{ padding: '0px' }">
              <img class="hot-down-img cursor"
                   :src="item.cover" alt=""
                   @click="targetHotUrl(item.url)">
              <p class="hot-down-content lin-clamp-2 cursor"
                 @click="targetHotUrl(item.url)">{{item.title}}</p>
              <div class="hot-down-info flex-bwt-center">
                <div class="hot-info-left flex-ali-center">
                  <!-- <el-avatar size="medium" :src="circleUrl"></el-avatar> -->
                  <p>{{item.nickname}}</p>
                </div>
                <p v-html="(item.last_pubtime || '').slice(0, 10)"></p>
                <!-- <p>{{item.type}}</p> -->
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
    <!-- 有数 -->
    <div class="home-you-wrap flex-all-center"
         data-aos="fade-up"
         data-aos-duration="1000">
      <div class="home-you-main">
        <div class="hot-up flex-bwt-center">
          <p class="flex-ali-center">
            <span class="left-title">有数</span>
          </p>
        </div>
        <div class="you-down">
          <div class="you-down-ul flex-bwt-center">
            <el-card shadow="hover"
                    :body-style="{ padding: '0px' }">
              <div class="flex-cloumn-cen">
                <img class="you-down-skew" src="@/assets/images/home/you_1.png" alt="">
                <p class="you-down-title">开箱即用的数据产品</p>
                <p class="you-down-intro">覆盖图文、短视频等多平台数据工具</p>
                <div class="you-down-btn flex-bwt-center">
                  <p @click="$router.push({ name: 'AccountCompany'})">账号监测</p>
                  <p @click="$router.push({ name: 'Prescription'})">内容监测</p>
                  <p @click="$router.push({ name: 'AccountCompare'})">账号对比</p>
                </div>
              </div>
            </el-card>
            <el-card shadow="hover"
                    :body-style="{ padding: '0px' }">
              <div class="flex-cloumn-cen">
                <img class="you-down-skew" src="@/assets/images/home/you_2.png" alt="">
                <p class="you-down-title">面向开发的数据集成</p>
                <p class="you-down-intro">提供深度定制的新媒体数据服务</p>
                <div class="you-down-btn flex-bwt-center">
                  <p @click="$router.push({ name: 'GetToken'})">开放API</p>
                  <p @click="$router.push({ name: 'Custom'})">数据定制</p>
                </div>
              </div>
            </el-card>
            <el-card shadow="hover"
                    :body-style="{ padding: '0px' }">
              <div class="flex-cloumn-cen">
                <img class="you-down-skew" src="@/assets/images/home/you_3.png" alt="">
                <p class="you-down-title">多领域的权威榜单</p>
                <p class="you-down-intro">提供多种行业领域的数据榜单</p>
                <div class="you-down-btn flex-bwt-center">
                  <p @click="$router.push({ name: 'Personal'})">行业榜单</p>
                  <p @click="$router.push({ name: 'Official'})">政法榜单</p>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
    <!-- 产品功能 -->
    <div class="home-func-wrap flex-all-center"
         data-aos="fade-up"
         data-aos-offset="300"
         data-aos-duration="1000">
      <div class="home-func-main">
        <div class="hot-up flex-bwt-center">
          <p class="flex-ali-center">
            <span class="left-title">产品功能</span>
            <span class="right-tab cursor"
                  :class="{ 'hot_active': funcActive === 'monitor'}"
                  @click="changeFuncActive('monitor')">新媒体监测</span>
            <span class="right-tab cursor"
                  :class="{ 'hot_active': funcActive === 'rank'}"
                  @click="changeFuncActive('rank')">榜单</span>
            <!-- <span class="right-tab cursor"
                  :class="{ 'hot_active': funcActive === 'api'}"
                  @click="changeFuncActive('api')">API</span>
            <span class="right-tab cursor"
                  :class="{ 'hot_active': funcActive === 'data'}"
                  @click="changeFuncActive('data')">数据定制</span> -->
          </p>
          <p class="hot-up-right">
            <!-- <span class="show-more cursor">查看更多
                    <i class="el-icon-arrow-right"></i></span> -->
          </p>
        </div>
        <div class="hot-down-other flex-bwt-center">
          <div v-for="(item, i) of funcList" :key="i">
            <el-card shadow="hover"
                    cursor
                    :body-style="{ padding: '0px' }">
              <img class="hot-down-img" :src="require('@/assets/images/home/func_'+ item.imgIndex +'.png')" alt="">
              <div class="flex-cloumn-cen">
                <p class="func-title">{{item.title}}</p>
                <p class="func-msg">{{item.msg}}</p>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
    <!-- 产品优势 -->
    <div class="home-center-wrap">
      <div class="home-center-meng">
        <div class="home-center-title">
          <p>产品优势</p>
        </div>
        <div class="home-center-main">
          <p>智能融媒采集分析生产协作平台</p>
          <p>具备高效稳定的新媒体数据采集与处理能力，可即时采集微信、微博、头条、抖音等各类复杂新媒体数据资源，通过大数据分析挖掘涉检、涉政、涉法等文章属性，
            分析其发文与账号属性关联程度，给账号考核提供数据帮助。系统提供多维度数据分析服务、历史发文导出、分钟级监测、api接口等功能。支持第三方调用，
            为党政机关、媒体、企业、个人等客户提供“全、快、准”的大数据服务。</p>
          <!-- <p>查看更多 +</p> -->
        </div>
      </div>
    </div>
    <div class="home-footer-wrap">
      <!-- 应用场景 -->
      <div class="home-footer-apply"
           data-aos="fade-up"
           data-aos-offset="300"
           data-aos-duration="1000">
        <div class="hot-up flex-bwt-center">
          <p class="flex-ali-center">
            <span class="left-title">应用场景</span>
          </p>
          <p></p>
        </div>
        <div class="home-apply-main flex-bwt-center">
          <el-card shadow="hover"
                  :body-style="{ padding: '0px' }"
                  v-for="(item, index) of applySence" :key="index"
                  @mouseover.native="setDisplay(index)"
                  @mouseleave.native="resetDisplay(index)">
            <div class="home-apply-box flex-cloumn-cen">
              <img :src="require('@/assets/images/home/sence_'+index+'.png')" alt="">
              <p>{{item.title}}</p>
            </div>
            <!-- hover -->
            <div class="home-apply-hover">
              <div class="apply-hover-left">
                <div class="apply-hover-des flex-ali-center">
                  <img :src="require('@/assets/images/home/sence_'+index+'.png')" alt="">
                  <p>{{item.title}}</p>
                </div>
                <p>{{item.desc}}</p>
              </div>
              <img class="apply-hover-right"
                   :src="require('@/assets/images/home/apply_'+index+'.jpg')" alt="">
            </div>
          </el-card>
        </div>
      </div>
      <!-- 行业客户 -->
      <div class="home-footer-user"
           data-aos="fade-up"
           data-aos-offset="300"
           data-aos-duration="1000">
        <div class="hot-up flex-bwt-center">
          <p class="flex-ali-center">
            <span class="left-title">我们客户</span>
          </p>
          <p></p>
        </div>
        <div class="home-footer-main">
          <div v-for="(item, index) of 20" :key="index">
            <el-card shadow="hover"
                    :body-style="{ padding: '0px' }">
                <img :src="require('@/assets/images/home/hang_'+index+'.png')" alt="">
            </el-card>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧在线客服 -->
    <!-- <div class="home-right-fixed">
        <el-popover
          placement="left"
          width="300"
          trigger="click">
          <img class="kefu" src="@/assets/images/home/lianxikefu.png" alt="">
          <div class="home-fixed-up flex-cloumn-all cursor" slot="reference">
            <i class="el-icon-service"></i>
            <p>在线客服</p>
          </div>
        </el-popover>
      <div class="home-fixed-down flex-cloumn-all">
        <i class="el-icon-question"></i>
        <p>帮助中心</p>
      </div>
      <el-backtop :right="1" :bottom="200" :visibility-height="10"></el-backtop>
    </div> -->
  </div>
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'Test',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      hotActive: 'wx',
      funcActive: 'monitor',
      accountActive: '',
      accountkey: '',
      circleUrl: require('@/assets/images/home/ava.png'),
      swiperOptions: {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        effect: 'fade',
        speed: 2000
      },
      // 轮播数组
      swiperList: [
        {
          title: '新媒体数据实时监测',
          content: '即时监测微信、微博、头条、抖音等新媒体，实时掌握新媒体运营情况'
        },
        {
          title: '新媒体统一监管',
          content: '统一监测，分级管理，分组查询，精准命中考核指标，为新媒体监管提供数据支持'
        },
        {
          title: '新媒体流量监测',
          content: '提供阅读、点赞、分钟即监测报告为新媒体的企事业单位及个人提供数据到价值的服务支撑'
        }
      ],
      // 应用场景
      applySence: [
        {
          title: '政府、政务新媒体监测',
          desc: '对新媒体进行即时监控，对新媒体的影响力、榜单、内容发布时效性、账号历史发文、网民关注热点、错敏词、文章及评论情感倾向性等进行监控和分析，掌握新媒体的整体运营状况，实现对各类新媒体数据进行统一监控。'
        },
        {
          title: '企业及个人新媒体',
          desc: '为关注新媒体领域的企事业单位个人及研究机构提供公众号查询、对比、分析、回溯、监控及诊断等功能，从数据到价值的服务支撑。'
        },
        {
          title: '新媒体大数据分析',
          desc: '按需定制目标新媒体监测任务，实施24小时无间断流程化高效采集，为新媒体大数据分析提供数据源并且提供更多满足您需求的专属定制服务，解决您数据多、时间紧、技术难、没资源等众多数据获取难题。'
        }
      ],
      hotList: [],
      funcList: [],
      // 产品功能——新媒体监测
      funcListOne: [
        {
          imgIndex: 1,
          title: '内容监测',
          msg: '监测发布文章涉检指数、传播指数、互动性、活跃性、以及文章存在的错敏词等，多维度分析新媒体发布的文章。'
        },
        {
          imgIndex: 2,
          title: '分钟级监测',
          msg: '分钟级监测对微信公众号、微博两个发布平台的发布内容定制分钟级传播效果监测，实时汇总发布情况，有效验证传播效果。'
        },
        {
          imgIndex: 3,
          title: '账号对比',
          msg: '选取两个或多个微信公众号，从多个维度对账号进行全方位对比，实时掌握账号的差异性，用数据评估账号并下载分析报告。'
        },
        {
          imgIndex: 4,
          title: '公众号分析',
          msg: '获取公众号最新的发文数据分析、发文类型统计、发文热词、文章类别分析、留言数据分析、留言词分析等，对公众号多维度全方位分析。'
        }
      ],
      funcListTwo: [
        {
          imgIndex: 5,
          title: '行业榜单',
          msg: '提供多行业领域的数据榜单，实行每日固定监测，发布微信公众号影响力排行榜（日、月、年）'
        },
        {
          imgIndex: 6,
          title: '多渠道榜单',
          msg: '提供多种渠道的数据榜单，包括微信公众号、微博、抖音、今日头条等。'
        },
        {
          imgIndex: 7,
          title: '自定义榜单',
          msg: '可根据自主选择已收藏或搜索的公众号制作榜单，实时获取关注账号的排名状况。'
        },
        {
          imgIndex: 8,
          title: '年终汇报',
          msg: '通过各维度计算展示账号的全方面数据统计信息，为年终述职、运营报告等提供有力依据。'
        }
      ],
      searchApi: '',
      ruleForm: {
        pageNum: 1,
        pageSize: 4
      },
      pageCount: 1
    }
  },
  methods: {
    accountSearch (obj) {
      this.accountActive = obj.accountActive
      this.accountkey = obj.keyword
      if (obj.keyword && obj.accountActive === 'wx') {
        this.$router.push({ name: 'AccountList', query: { type: obj.accountActive, keyword: obj.keyword } })
      } else if (obj.keyword && obj.accountActive === 'article') {
        this.$router.push({ name: 'MoreHot', query: { type: obj.accountActive, keyword: obj.keyword } })
      }
    },
    changeHotActive (tab) {
      this.hotActive = tab
    },
    changeFuncActive (func) {
      if (func === 'monitor') {
        this.funcList = this.funcListOne
      } else {
        this.funcList = this.funcListTwo
      }
      this.funcActive = func
    },
    // 鼠标进入
    setDisplay (index) {
      let all = document.querySelectorAll('.home-apply-main .el-card')
      let up = document.getElementsByClassName('home-apply-box')
      let down = document.getElementsByClassName('home-apply-hover')
      for (let i = 0; i < all.length; i++) {
        all[i].style.width = 320 + 'px'
        all[i].style.background = '#ffffff'
        all[i].style.borderColor = '#EBEEF5'
        up[i].style.display = 'block'
        down[i].style.display = 'none'
      }
      all[index].style.width = 700 + 'px'
      all[index].style.background = '#F5FAFF'
      all[index].style.borderColor = '#498BFE'
      up[index].style.display = 'none'
      down[index].style.display = 'block'
    },
    // 鼠标移出
    resetDisplay (index) {
      let all = document.querySelectorAll('.home-apply-main .el-card')
      let up = document.getElementsByClassName('home-apply-box')
      let down = document.getElementsByClassName('home-apply-hover')
      for (let i = 0; i < all.length; i++) {
        all[i].style.width = 320 + 'px'
        all[i].style.background = '#ffffff'
        all[i].style.borderColor = '#EBEEF5'
        up[i].style.display = 'block'
        down[i].style.display = 'none'
      }
      all[0].style.width = 700 + 'px'
      all[0].style.background = '#F5FAFF'
      all[0].style.borderColor = '#498BFE'
      up[0].style.display = 'none'
      down[0].style.display = 'block'
    },
    targetHotUrl (url) {
      window.open(url)
    },
    changeHotAirticle () {
      if (this.pageCount === 5) {
        this.pageCount = 1
      } else {
        this.pageCount++
      }
      this.ruleForm.pageNum = this.pageCount
      this.hotList = []
      this.getHotList()
    },
    // 获取热文
    getHotList () {
      let obj = {
        page: this.ruleForm.pageNum,
        size: this.ruleForm.pageSize
      }
      this.$http.get(this.$api.getHotArticle, { params: obj })
        .then(res => {
          this.hotList = res.data.data.article
        })
    }
  },
  created () {
    var oMeta = document.createElement('meta')
    oMeta.name = 'referrer'
    oMeta.content = 'never'
    document.getElementsByTagName('head')[0].appendChild(oMeta)
    this.funcList = this.funcListOne
    this.getHotList()
  },
  mounted () {
    AOS.init()
    this.setDisplay(0)
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  }
}
</script>
<style lang="scss">
@import './home.scss';
</style>
