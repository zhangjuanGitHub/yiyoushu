<!--
 * @Author: MaiChao
 * @Date: 2021-02-07 15:31:16
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-11 14:12:27
-->
<template>
  <div class="content-show article-detail">
    <div class="tabs-header flex-ali-center">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'AccountCompany' }">新媒体监测</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'Prescription' }">内容监测</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'Realtime' }">文章实时监测</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name:'ArticleDetail'}">微信传播力分析</el-breadcrumb-item>
        <el-breadcrumb-item>相似度</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="realtime-detail">
      <div class="top-info">
        两文有<span class="import">{{articleDertail.simWordCount}}</span>个字重合,相似度为<span class="import">{{articleDertail.simScore}}% </span> 对比细节如下:
      </div>
      <div class="flex-bwt-center">
        <div class="original  content-box">
          <div class="tabs-head">
            <span>原文内容</span>
          </div>
          <div class="infor">
          <div class="title" v-html="articleDertail.originalTitle"></div>
          <div class="article-cont" v-html="articleDertail.originalArticle"></div>
        </div>
        </div>
        <div class="similarity content-box">
          <div class="tabs-head">
            <span>转载后内容</span>
          </div>
          <div class="infor">
            <div class="title" v-html="articleDertail.SimilarityTitle"></div>
          <div class="article-cont" v-html="articleDertail.SimilarityArticle"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      params: {
        id: ''
      },
      articleDertail: ''
    }
  },
  created () {
    this.params.id = this.$route.query.id
    this.getArticle()
  },
  methods: {
    // 获取文章信息
    getArticle () {
      this.$http.post(this.$api.comparisonContent, this.params)
        .then(res => {
          console.log(res.data.data)
          this.articleDertail = res.data.data
        }).catch(() => { })
    }
  },
  mounted () {
  }
}
</script>
<style>
@import '../monitor.css';
</style>
<style  scoped>
.content-show {
  max-width: 1400px;
  margin: 20px auto;
  background-color: #fff;
}
.tabs-header {
  padding: 0 20px;
  height: 50px;
  line-height: 50px;
  background-color: #f7f8fa;
}
.realtime-detail {
  padding: 30px;
}
.top-info {
  font-size: 14px;
  color: #252934;
  margin-bottom: 30px;
}
.top-info .import {
  color: #ff0000;
  font-size: 24px;
}
.content-box {
  width: 49%;
  height: 100%;
  overflow: hidden;
  position: relative;
  border: 1px solid #e9e9e9;
}
.title {
  font-size: 24px;
  color: #252934;
  margin-bottom: 30px;
}
.article-cont {
  min-height: 285px;
  overflow: hidden;
  line-height: 24px;
  font-size: 14px;
  text-indent: 32px;
}
.tabs-head {
  height: 48px;
  background-color: #f7f8fa;
}
.tabs-head span {
  display: inline-block;
  margin-left: 25px;
  line-height: 45px;
  border-bottom: 2px solid #3b81fe;
}
.content-box .infor {
  padding: 40px 25px;
}
</style>
