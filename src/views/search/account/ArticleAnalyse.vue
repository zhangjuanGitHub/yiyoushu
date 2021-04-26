<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-03-02 15:43:39
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-04-19 11:46:53
-->
<template>
  <div class="center-wraper">
    <div class="account-wraper">
      <div class="search-analyse-up">
        <div class="nav-breadcrumb flex-ali-center">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item :to="{ name: 'HistoryTweets', query: { id: this.accountId} }">历史推文</el-breadcrumb-item> -->
            <el-breadcrumb-item :to="{ name: 'ArticleAnalyse' }">文章分析</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="search-analyse-art flex-ali-center">
          <div class="search-art-left flex-ali-center">
            <img :src="accountMsg.ori_head_img" alt="">
            <div class="search-left-name">
              <p v-html="accountMsg.nickname"></p>
              <p>{{accountMsg.alias}}</p>
            </div>
          </div>
          <div class="search-art-right flex-ali-center">
            <div class="search-right-left">{{articleMsg.classify_val}}</div>
            <div class="search-right-right">
              <p v-html="articleMsg.title" @click="targetUrl(articleMsg.url)" class="cursor"></p>
              <p>
                <span>作者：{{articleMsg.author}}</span>
                <span>|</span>
                <span v-if="articleMsg.idx === '1'">头条</span>
                <span v-else-if="articleMsg.idx === '2'">次条</span>
                <span v-else>{{articleMsg.idx}}条</span>
                <span>|</span>
                <span>{{articleMsg.update_time}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="search-analyse-main flex-bwt-center">
          <div class="search-analyse-all">
            <div class="search-material-up flex-bwt-center">
              <div class="flex-ali-center">
                <p class="search-mater-theme">传播情况分析</p>
                <p class="search-analyse-des">
                  <span>数据更新时间：</span>
                  <span>{{articleMsg.update_time}}</span>
                </p>
              </div>
              <p class="search-analyse-icon cursor"
                 @click="updateData">
                <i class="el-icon-refresh"></i>
                <span>更新数据</span>
              </p>
            </div>
            <div class="search-analyse-act">
              <div class=" flex-bwt-center">
                <div class="search-act-box flex-cloumn-all">
                  <div class="flex-ali-center">
                    <img src="@/assets/images/home/data_1.png" alt="">
                    <p>阅读数</p>
                  </div>
                  <p class="search-act-num" style="color: #F79406;">{{articleMsg.read_num}}</p>
                </div>
                <div class="search-act-box flex-cloumn-all">
                  <div class="flex-ali-center">
                    <img src="@/assets/images/home/data_3.png" alt="">
                    <p>在看数</p>
                  </div>
                  <p class="search-act-num">{{articleMsg.like_num}}</p>
                </div>
                <div class="search-act-box flex-cloumn-all">
                  <div class="flex-ali-center">
                    <img src="@/assets/images/home/data_2.png" alt="">
                    <p>点赞数</p>
                  </div>
                  <p class="search-act-num">{{articleMsg.old_like_num}}</p>
                </div>
                <div class="search-act-box flex-cloumn-all">
                  <div class="flex-ali-center">
                    <img src="@/assets/images/home/data_4.png" alt="">
                    <p>留言数</p>
                  </div>
                  <p class="search-act-num">{{articleMsg.comment_count}}</p>
                </div>
              </div>
              <div class="search-slider"></div>
              <div class="search-act-line">
                <p>文章类型：
                  <span>{{articleMsg.classify_val}}</span></p>
                <p class="lin-clamp-1 cursor">原文链接：
                  <span @click="targetUrl(articleMsg.url)"
                        v-html="(articleMsg.url || '').slice(0, 65) + '...'">{{}}</span></p>
              </div>
              <div class="search-slider"></div>
            </div>
            <div class="search-material-up flex-ali-center">
              <p class="search-mater-theme">内容分析</p>
            </div>
            <div class="search-analyse-cont flex-bwt-center">
              <div class="search-cont-left flex-cloumn-all">
                <p>内容字数</p>
                <p>{{contentMsg.numberOfWords}}</p>
              </div>
              <div class="search-cont-right">
                <!-- <p>音频<span>{{contentMsg.}}</span></p> -->
                <p>视频<span>{{contentMsg.numberOfVideo}}</span></p>
                <!-- <p>音乐<span>{{contentMsg.}}</span></p> -->
                <p>图片<span>{{contentMsg.numberOfImage}}</span></p>
                <p>小程序<span>{{contentMsg.numberOfApplets}}</span></p>
                <!-- <p>视频好动态<span>{{contentMsg.}}</span></p> -->
              </div>
            </div>
            <div class="search-material-up flex-ali-center">
              <p class="search-mater-theme">留言分析</p>
              <!-- <p class="search-analyse-des">
                <i class="el-icon-refresh cursor"></i>
                <span>数据更新时间：</span>
                <span>2021-01-17 05:44:24</span>
              </p> -->
            </div>
            <div class="search-analyse-word">
              <div class="search-word-pro flex-all-center">
                <!-- <el-progress v-for="(item, index) of progress"
                            :key="index"
                            type="circle"
                            color="#46BDEB"
                            :percentage="item.percentage"
                            :stroke-width="12"
                            :format="format(item.num, item.percentage)"></el-progress> -->
              </div>
              <div class="search-cont-right">
                <p>留言数<span>{{wordMsg.messageConut}}</span></p>
                <p>留言用户<span>{{wordMsg.messageUsersNum}}</span></p>
                <p>留言总赞<span>{{wordMsg.totalLikeComments}}</span></p>
                <p>留言均赞<span>{{wordMsg.avgLikeComments}}</span></p>
                <p>作者回复<span>{{wordMsg.authorRepliesNum}}</span></p>
                <p>回复率<span>{{wordMsg.authorResponseRate}}</span></p>
                <p>回复总赞<span>{{wordMsg.totalLikeReplies}}</span></p>
                <p>回复均赞<span>{{wordMsg.avgRepliesLike}}</span></p>
              </div>
            </div>
          </div>
          <div class="search-analyse-all">
            <div class="search-material-up flex-ali-center">
              <p class="search-mater-theme">评论详情</p>
            </div>
            <el-table :data="pinglunData"
                      style="width: 100%">
              <el-table-column label="微信名"
                               prop="nickname"
                               width="180"
                               show-overflow-tooltip>
                <template slot-scope="scope">
                  <div class="search-mater-table flex-ali-center">
                    <img :src="scope.row.head_picture" alt="">
                    <p v-html="scope.row.nickname"></p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="内容"
                               prop="content"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="点赞"
                               prop="like_count"
                               width="100">
                <template slot-scope="scope">
                  <div class="search-analyse-table flex-all-center">
                    <img src="@/assets/images/home/data_2.png" alt="">
                    <p v-html="scope.row.like_count"></p>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <set-page @pagingChange="pagingChange"
                      :total="total"></set-page>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  components: {},
  data () {
    return {
      accountId: '',
      total: 0,
      progress: [
        {
          percentage: 65,
          num: '积极'
        },
        {
          percentage: 34,
          num: '中性'
        },
        {
          percentage: 25,
          num: '消极'
        }
      ],
      pinglunData: [],
      articleMsg: {},
      accountMsg: {},
      wordMsg: {
        messageConut: 0,
        messageUsersNum: 0,
        totalLikeComments: 0,
        avgLikeComments: 0,
        authorRepliesNum: 0,
        authorResponseRate: 0,
        totalLikeReplies: 0,
        avgRepliesLike: 0
      },
      contentMsg: {
        numberOfWords: 0,
        numberOfImage: 0,
        numberOfVideo: 0,
        numberOfApplets: 0
      },
      pageBean: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    pagingChange (query) {
      this.pageBean.pageSize = query.size
      this.pageBean.pageNum = query.page
      this.getComments()
    },
    targetUrl (url) {
      window.open(url)
    },
    format (num, percentage) {
      return () => {
        return `${num}` + '\n' + `${percentage}%`
    	}
    },
    // 更新数据
    updateData () {
      this.$http.get(`${this.$api.updateYime}/${this.articleMsg.sn}`)
        .then(res => {
          this.$message.success('更新成功，稍后再来查看')
        }).catch(() => {})
    },
    // 获取留言
    getWords () {
      this.$http.post(this.$api.getHTAction, { sn: this.articleMsg.sn })
        .then(res => {
          this.wordMsg = res.data.data
        }).catch(() => {})
    },
    // 获取评论
    getComments () {
      let obj = {
        sn: this.articleMsg.sn, // '4ecbba424f5982a2ce2da2d8dcfce0db',
        pageBean: {
          pageSize: this.pageBean.pageSize,
          pageNum: this.pageBean.pageNum
        }
      }
      this.$http.post(this.$api.getHTComment, obj)
        .then(res => {
          this.pinglunData = res.data.data.list
          this.total = res.data.data.total
        }).catch(() => {})
    },
    // 获取内容
    getContents () {
      this.$http.post(this.$api.getHTContent, { articleId: this.articleId })
        .then(res => {
          this.contentMsg = res.data.data
        }).catch(() => {})
    },
    getHTArticle () {
      this.$http.get(this.$api.getHTArticle, { params: { id: this.articleId } })
        .then(res => {
          this.articleMsg = res.data.data
          this.accountMsg = res.data.data.account
          this.getContents()
          this.getComments()
          this.getWords()
        }).catch(() => {})
    }
  },
  created () {
    this.accountId = this.$route.query.accountId
    this.articleId = this.$route.query.articleId
    this.getHTArticle()
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
@import '../search.scss';
</style>
