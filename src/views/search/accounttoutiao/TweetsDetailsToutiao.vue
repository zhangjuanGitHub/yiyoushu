<!--
 * @Author: zhangjuan
 * @Date: 2021-05-24 13:42:02
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-07-28 18:09:01
-->
<template>
  <div class="center-wraper">
    <div class="account-wraper">
      <div class="search-analyse-up">
        <div class="nav-breadcrumb flex-ali-center">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'HistoryTweetsToutiao', query: { id: this.accountId} }">历史推文</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'TweetsDetailsToutiao' }">文章详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="search-analyse-art">
          <div class="wb-detail-up flex">
            <div class="wb-detail-ava">
              <img :src="accountMsg.avatar_img"
                   alt="">
            </div>
            <div class="wb-detail-info">
              <div class="wb-detail-msg flex-ali-center">
                <p>{{accountMsg.screen_name}}</p>
                <img v-if="accountMsg.verified && accountMsg.verified_type === 0 && accountMsg.verified_type_ext === 1"
                     src="@/assets/images/search/v_1.png"
                     alt="">
                <img v-else-if="accountMsg.verified && accountMsg.verified_type === 0 && accountMsg.verified_type_ext === 0"
                     src="@/assets/images/search/v_2.png"
                     alt="">
                <img v-else-if="accountMsg.verified"
                     src="@/assets/images/search/v_3.png"
                     alt="">
              </div>
              <div class="wb-detail-cont">
                <!-- <p class="lin-clamp-3 cursor" @click="targetUrl(articleMsg.display_url)">{{articleMsg.content_text}}
                  <span>展开全文 <i class="el-icon-arrow-down"></i></span></p> -->
                <p v-if="articleMsg.content_text"
                   class="lin-clamp-3 cursor"
                   @click="targetUrl(articleMsg.display_url)">{{articleMsg.content_text}}
                <p v-else
                   class="lin-clamp-3 cursor"
                   @click="targetUrl(articleMsg.display_url)">{{articleMsg.title}}
                  <span>展开全文 <i class="el-icon-arrow-down"></i></span>
                </p>
              </div>
              <!-- <div class="wb-detail-cover">
                <img src="@/assets/images/home/func_1.png" alt="">
              </div> -->
              <p class="info">{{articleMsg.pubtime}}</p>
            </div>
          </div>
          <div class="search-slider"></div>
          <div class="wb-detail-down flex-arr-center">
            <div class="flex-ali-center">
              <img src="@/assets/images/search/de_1.png"
                   alt=""
                   style="margin-top: -3px">
              <p>{{articleMsg.digg_count}}</p>
            </div>
            <div class="left-height-wb-one"></div>
            <div class="flex-ali-center">
              <img src="@/assets/images/search/de_2.png"
                   alt="">
              <p style="color:#F79406">{{articleMsg.comment_count}}</p>
            </div>
            <div class="left-height-wb-one"></div>
            <div class="flex-ali-center">
              <img src="@/assets/images/search/de_3.png"
                   alt="">
              <p>{{articleMsg.forward_count}}</p>
            </div>
          </div>
        </div>
        <div class="search-analyse-main">
          <div class="search-material-up">
            <p class="search-mater-theme">热门评论</p>
            <!-- <p>共 <span>158</span> 篇</p> -->
          </div>
          <p class="flex-all-center"
             v-if="isNotComment">暂无评论</p>
          <ul class="wb-ul"
              v-else
              :style="{height: ((pinglunData.length + 1)/2) *80 +'px'}">
            <li class="flex"
                v-for="(item, index) of pinglunData"
                :key="index">
              <div class="wb-comment-box flex-ali-center">
                <img :src="item.avatar_url"
                     alt="">
                <div>
                  <div class="wb-detail-msg flex-ali-center">
                    <p class="lin-clamp-1">{{item.screen_name}}</p>
                    <!-- <img src="@/assets/images/search/v_3.png" alt=""> -->
                    <p>：</p>
                  </div>
                  <p style="margin-top: 5px">{{item.insert_time}}</p>
                </div>
              </div>
              <p class="wb-comment-cont">{{item.text}}</p>
            </li>
          </ul>
          <p class="flex-all-center"
             v-if="isMore"
             style="clear:both; padding-top:10px">
            <span class="primary cursor"
                  @click="getComments">点击加载更多</span>
          </p>
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
      articleId: '',
      scrollId: '',
      isMore: false,
      pinglunData: [],
      articleMsg: {},
      accountMsg: {},
      isNotComment: false
    }
  },
  methods: {
    targetUrl (url) {
      window.open(url)
    },
    // 获取评论
    getComments () {
      let obj = {
        scrollId: this.scrollId,
        itemId: this.articleMsg.item_id
        // mid: '4630256097692398'
        // mid: '4636543362533016'
      }
      this.$http.post(this.$api.ttMessage, obj)
        .then(res => {
          if (res.data.data.data.length === 0 && !this.scrollId) {
            this.isNotComment = true
          } else {
            this.isNotComment = false
            let datas = res.data.data.data
            console.log(datas)
            this.scrollId = res.data.data.scrollId
            if (datas.length < 10) {
              this.isMore = false
            } else {
              this.isMore = true
            }
            this.pinglunData.push(...datas)
          }
        }).catch(() => { })
    },
    getHTArticle () {
      this.$http.post(this.$api.ttDetails, { itemId: this.articleId, userId: this.accountId })
        .then(res => {
          this.articleMsg = res.data.data.data
          // console.log(this.articleMsg)
          this.accountMsg = res.data.data.information
          console.log(this.accountMsg)
          this.getComments()
        }).catch(() => { })
    }
  },
  created () {
    this.accountId = this.$route.query.userId
    this.articleId = this.$route.query.itemId
    this.getHTArticle()
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
@import '../search.scss';
.search-analyse-main {
  padding: 0 20px 20px;
  background: #ffffff;
}
.search-material-up span {
  font-size: 20px;
  color: #f79406;
}
</style>
