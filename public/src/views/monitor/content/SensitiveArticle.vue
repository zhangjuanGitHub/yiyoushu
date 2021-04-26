<template>
  <div class="center-wraper">
    <div class="account-wraper">
      <div class="nav-breadcrumb flex-ali-center">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'Prescription' }">内容检测</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'Sensitive' }">错敏监测</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'SensitiveArticle' }">文章详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sens-art-main">
        <p class="sens-art-title">{{allMsg.title}} </p>
        <p class="sens-art-msg">
          <span>{{allMsg.nickname}}</span>
          <span>{{allMsg.pubtime}}</span>
        </p>
        <div class="sens-art-box flex-bwt">
          <div class="sens-art-left">
            <div class="sens-left-title flex-all-center">原文</div>
            <p v-html="allMsg.content" class="sens-art-content"></p>
          </div>
          <div class="sens-art-left">
            <div class="sens-left-title flex-all-center">
              <p class="sens-left-up">需要修改</p>
              <p class="sens-left-down">疑似有错</p>
            </div>
            <p v-html="allMsg.updateContent" class="sens-art-content"></p>
          </div>
        </div>
        <!-- <p v-html="allMsg.content" class="sens-art-content"></p> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      articleId: '',
      allMsg: {}
    }
  },
  methods: {
    getArticle () {
      this.$http.get(this.$api.getSensArticle, { params: { id: this.articleId } })
        .then(res => {
          this.allMsg = res.data.data
        }).catch(() => {})
    }
  },
  created () {
    this.articleId = this.$route.query.articleId
    this.getArticle()
  }
}
</script>
<style>
.sens-art-content .highlight-modi {
  background: #ff0000;
}
.sens-art-content .highlight-good {
  background: #E6A23C;
}
</style>
<style scoped>
.account-wraper {
  background: #ffffff;
}
.sens-art-main {
  margin: 40px 20px;
  padding-bottom: 60px;
}
.sens-art-title {
  font-size: 24px;
  color: #252934;
}
.sens-art-msg {
  margin: 20px 0 45px;
}
.sens-art-msg span:nth-child(1) {
  color: #576B95;
}
.sens-art-msg span:nth-child(2) {
  color: #B7B7B7;
  margin-left: 10px;
}
.sens-art-box {
  width: 100%;
}
.sens-art-left {
  width: 48%;
  border: 1px solid #e1e4e8;
}
.sens-left-title {
  height: 50px;
  background: #f7f8fa;
}
.sens-left-up::before, .sens-left-down::before {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 5px;
}
.sens-left-up {
  margin-right: 10px;
}
.sens-left-up::before {
  background: #ff0000;
}
.sens-left-down::before {
  background: #E6A23C;
}
.sens-art-content {
  padding: 15px;
  font-size: 16px;
  line-height: 36px;
  text-indent: 28px;
}
</style>
