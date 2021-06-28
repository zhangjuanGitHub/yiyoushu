<!--
 * @Author: zhangjuan
 * @Date: 2021-05-17 10:36:39
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-05-17 13:41:48
-->
<template>
  <div class="more-hot-wrap">
    <!-- 搜索框 -->
    <div class="home-up-wrap">
      <div class="home-up flex-ali-center">
        <img src="@/assets/images/login/yys.png" alt="">
        <div class="drill-search">
          <el-form :inline="true"
                  ref="ruleForm"
                  :model="rule">
            <el-form-item class="publishTime"
                          label="时间"
                          prop="publishTime">
              <el-date-picker v-model="rule.time"
                              type="daterange"
                              size="small"
                              readonly
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd"
                              range-separator="-"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              style="width:230px">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="keyword"
                          label="维度">
              <el-input size="small"
                        v-model="rule.keyword"
                        readonly
                        placeholder="请输入维度"
                        style="width:300px"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="center-wraper">
      <div class="wraper">
        <ul v-if="isSearched">
          <li class="more-hot-li flex-ali-center" v-for="(item, index) of drillList" :key="index">
            <div class="more-cover-box">
              <img :src="item.cover" alt="封面" @click="targetUrl(item.url)">
            </div>
            <div class="more-hot-main">
              <p @click="targetUrl(item.url)" class="cursor" v-html="item.title"></p>
              <p class="lin-clamp-3 cursor" @click="targetUrl(item.url)" v-html="item.content"></p>
              <div class="flex-bwt-center">
                <p>
                  <span v-html="item.nickname"></span>
                  <span>{{item.lastPubtime}}</span>
                </p>
                <div class="flex-ali-center">
                  <img src="@/assets/images/home/icon_1.png" alt="">
                  <p>阅读数：<span v-html="item.readNum >= 100000 ? '10万+' : item.readNum"></span></p>
                  <img src="@/assets/images/home/icon_2.png" alt="" style="margin-top: -3px">
                  <p>点赞数：<span v-html="item.oldLikeNum >= 100000 ? '10万+' : item.oldLikeNum"></span></p>
                  <img src="@/assets/images/home/icon_3.png" alt="">
                  <p>在看数：<span v-html="item.likeNum >= 100000 ? '10万+' : item.likeNum"></span></p>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div v-else class="flex-cloumn-cen account-list-undefined">
          <img src="@/assets/images/search/undefined.png" alt="">
          <p>抱歉，没有找到关于“<span>{{queryText}}</span>”的结果。</p>
        </div>
        <set-page @pagingChange="pagingChange"
                  :total="total"
                  ref="child"></set-page>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'drilldetails',
  components: {},
  data () {
    return {
      undefinedUrl: require('@/assets/images/home/avatar.png'),
      total: 0,
      isSearched: true, // 是否查询到
      drillList: [],
      rule: {
        time: [],
        keyword: ''
      },
      ruleForm: {
        pageSize: 10,
        pageNum: 1,
        id: '',
        idx: '',
        authType: '',
        province: ''
      }
    }
  },
  methods: {
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
      this.getDrillList()
    },
    targetUrl (url) {
      window.open(url)
    },
    // 获取热文
    getDrillList () {
      this.$http.post(this.$api.getDrillList, this.ruleForm)
        .then(res => {
          this.drillList = res.data.data.content
          this.total = res.data.data.count
          this.rule.time = res.data.data.time
          this.rule.keyword = res.data.data.dimensionality
        }).catch(() => {})
    },
  },
  created () {
    this.ruleForm.id = this.$route.query.id
    this.ruleForm.idx = this.$route.query.idx
    this.ruleForm.authType = this.$route.query.authType
    this.ruleForm.province = this.$route.query.province
    this.getDrillList()
  }
}
</script>
<style lang="scss" scoped>
.wraper {
  .more-hot-li:first-child {
    padding-top: 0;
  }
  .more-hot-li {
    padding: 30px 0;
    border-bottom: 1px solid #EDEFF4;
  }
}
.more-cover-box {
  width: 250px;
  height: 140px;
  position: relative;
  margin-right: 32px;
  background: #f5f5f5;
  img {
    width: 100%;
    max-height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;

  }
}
.more-hot-main>p:first-child {
  font-size: 24px;
  color: $title-color;
}
.more-hot-main {
  flex: 1;
  p {
    font-size: $font-size-middle;
    color: $main-color;
  }
  span {
    margin-right: 30px;
  }
  img {
    width: 18px;
    height: 18px;
    margin-right: 2px;
  }
}
.more-hot-main>p:nth-child(2) {
  margin: 15px 0 30px;
}
.account-list-undefined {
  img {
    width: 457px;
    height: 329px;
    margin-top: 30px;
  }
  p {
    margin-top: 55px;
    color: $content-text-color;
  }
}
.drill-search {
  margin-left: 34px;
}
</style>
