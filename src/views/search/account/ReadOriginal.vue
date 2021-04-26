<!--
 * @Author: zhangjuan
 * @Description: 
 * @Date: 2021-01-29 14:20:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-04 18:23:17
-->
<template>
  <div class="search-material-wrap">
    <div class="search-material-up flex-bwt-center">
      <p class="search-mater-theme">使用概况</p>
      <p class="search-read-r">统计近30天内的推文，数据更新于<span>{{updateTime}}</span></p>
    </div>
    <div class="search-read-about flex-ali-center">
      <p>{{useAbout.readNum}},</p>
      <span>使用阅读原文推文篇数</span>
      <el-progress type="circle"
                   :width="30"
                   :stroke-width="2"
                   :show-text="false"
                   :percentage="useAbout.percentage"></el-progress>
      <p>{{useAbout.percentage}}%,</p>
      <span>使用占比</span>
      <p>{{useAbout.webNum}},</p>
      <span>使用域名数</span>
      <div class="search-about-scroll">
        <div class="search-about-domain">
          <ul id="domain" :style="{ top: doaminTop + 'px' }">
            <li v-for="(item, index) of useAbout.webUrl" :key="index"
                class="lin-clamp-1">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="search-material-up flex-bwt-center">
      <p class="search-mater-theme">使用特征</p>
      <p class="search-read-r">使用阅读原文的推文发布位置</p>
    </div>
    <div class="search-read-feature">
      <div class="search-feature-left flex-arr-center">
        <el-progress v-for="(item, index) of useFeature"
                     :key="index"
                     type="circle"
                     :percentage="Number(((item.num/featureTotal)*100).toFixed(0))"
                     :color="item.color"
                     :stroke-width="16"
                     :format="format(item.num, index)"></el-progress>
      </div>
      <div class="search-feature-right">
        <div class="search-feature-icon flex-ali-center"
             v-for="(item, index) of useFeature"
             :key="index">
          <p :style="{ background: item.color}"></p>
          <p>
            <span v-if="index === 0">头</span>
            <span v-else-if="index === 1">次</span>
            <span v-else>{{index + 1}}</span>条
          </p>
          <p><span>{{item.num}}</span>次</p>
        </div>
      </div>
    </div>
    <div class="search-material-up">
      <p class="search-mater-theme">常用域名分析</p>
    </div>
    <div class="search-read-area">
      <div class="search-area-tab">
        <div class="search-tab-one flex-cloumn-cen"
            :class="{'is-class': readActive === item}"
            @click="changeReadTab(item)"
            v-for="(item, index) of oftenUseUrl" :key="index">
          <p class="search-tab-hh">NO.<span>{{index + 1}}</span></p>
          <p class="search-tab-pp">{{item}}</p>
        </div>
      </div>
      <div>
        <el-table :data="domainData"
                  style="width: 100%"
                  :default-expand-all="true">
          <el-table-column label="阅读原文链接"
                           prop="url"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <p class="cursor search-left-click"
                 @click="targetUrl('http://' + scope.row.url)">{{scope.row.url}}</p>
            </template>
          </el-table-column>
          <el-table-column label="使用次数"
                           prop="count"
                           width="160">
          </el-table-column>
          <el-table-column label="总阅读数"
                           prop="readNum"
                           width="160">
          </el-table-column>
          <el-table-column label="总在看数"
                           prop="likeNum"
                           width="160">
          </el-table-column>
          <el-table-column type="expand"
                           label="操作"
                           width="130">
            <template slot-scope="props">
              <div class="search-read-table flex-bwt-center"
                    v-for="(item, index) of props.row.list" :key="index">
                <p v-html="item.title"
                   @click="targetUrl(item.url)"
                   class="search-read-title lin-clamp-1"> 
                    <!-- <span class="search-read-tt" v-if="index === 0">头条</span>
                    <span class="search-read-tt" v-else-if="index === 1">次条</span>
                    <span class="search-read-tt" v-else>{{index + 1}}条</span> -->
                    </p>
                <div class="search-read-pp flex-ali-center">
                  <p>发布时间<span>{{ item.last_pubtime }}</span></p>
                  <p>阅读数<span class="search-read-bb"
                                v-html="item.read_num > 100000 ? '10万+' : item.read_num "></span></p>
                  <p>在看数<span>{{ item.like_num }}</span></p>
                  <p>留言数<span>{{ item.comment_count }}</span></p>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { timeFormat, secondsFormat } from '@/lib/tools'
export default {
  name: 'search',
  components: {},
  data () {
    return {
      readActive: '',
      domainData: [],
      accountMsg: {},
      useAbout: {
        webUrl: [],
        webNum: 0,
        readNum: 0,
        percentage: 0
      },
      oftenUseUrl: [],
      useFeature: [],
      featureTotal: 0,
      scrollDomain: null,
      doaminTop: 0,
      updateTime: ''
    }
  },
  methods: {
    format (percentage, index) {
      return () => {
        if (index === 0) {
          return `${((percentage/this.featureTotal)*100).toFixed(0)}%` +'\n' + '头条'
        } else if (index === 1) {
          return `${((percentage/this.featureTotal)*100).toFixed(0)}%` +'\n' +  '次条'
        } else {
          return `${((percentage/this.featureTotal)*100).toFixed(0)}%` +'\n' + `${index + 1}` + '条'
        }
    	}
    },
    changeReadTab (tab) {
      this.readActive = tab
      this.domainData = []
      this.getDomain()
    },
    targetUrl (url) {
      window.open(url)
    },
    // 滚动
    getScrollDomain () {
      this.scrollDomain = setInterval(() => {
        if (Math.abs(this.doaminTop) === (this.useAbout.webUrl.length - 1) *40) {
          this.doaminTop = 0
        } else {
          this.doaminTop -= 40
        }
      }, 2000)
    },
    // 获取使用概况
    getAbout () {
      this.$http.post(this.$api.getUseAbout, { biz: this.accountMsg.biz})
        .then(res => {
          this.useAbout.webNum = res.data.data.webNum
          this.useAbout.readNum = res.data.data.value
          this.useAbout.percentage = res.data.data.percentage * 100
          this.useAbout.webUrl = res.data.data.webUrl
          this.oftenUseUrl = res.data.data.webUrl.slice(0,6)
          this.readActive = this.useAbout.webUrl[0]
          this.getScrollDomain()
          this.getDomain()
        }).catch(() => {})
    },
    // 获取使用特征
    getFeature () {
      this.$http.post(this.$api.getUseFeature, { biz: this.accountMsg.biz})
        .then(res => {
          let data = res.data.data
          let color = ['#2EBDFF', '#47E8CF', '#E4C849', '#FFA531', '#EF753D']
          for (let i = 0; i < 5; i++) {
            this.featureTotal += data[i].cnt
            this.useFeature.push({ num: data[i].cnt, label: data[i].idx, color: color[i] })
          }
        }).catch(() => {})
    },
    // 获取常用域名
    getDomain () {
      this.$http.post(this.$api.getDomainAnalyse, { biz: this.accountMsg.biz, url: this.readActive})
        .then(res => {
          let data = res.data.data
          data.url = this.readActive
          this.domainData.push(data)
        }).catch(() => {})
    },
    getAccountMsg () {
      this.$http.get(`${this.$api.getWxAccount}/${this.accountId}`)
        .then(res => {
          this.accountMsg = res.data.data[0]
          this.getAbout()
          this.getFeature()
        }).catch(() => {})
    },
    // 获取当前时间
    getCurrentTime () {
      const now = new Date()
      this.updateTime = timeFormat(now.getTime()) + ' ' + secondsFormat(now.getTime())
    }
  },
  created () {
    this.accountId = this.$route.query.id
    this.getAccountMsg()
    this.getCurrentTime()
  },
  mounted () {
    this.format()
  },
  destroyed () {
    clearInterval(this.scrollDomain)
  }
}
</script>
<style lang="scss" scoped>
@import '../search.scss';
</style>
