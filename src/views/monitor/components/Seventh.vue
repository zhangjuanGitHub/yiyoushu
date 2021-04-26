<!--
 * @Author: MaiChao
 * @Date: 2021-02-23 15:01:05
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-10 17:57:15
-->
<template>
  <div class="flex-bwt-center">
    <div class="line-left">
      <div class="title">违规详情</div>
      <div class="violation-data flex-arr-center">
        <div class="left-data flex-cloumn-cen">
          <div class="circle color1" v-if="successData">{{successData}}篇</div>
          <div class="circle color1" v-else>0篇</div>
          <div class="data-name">文章正常显示</div>
        </div>
        <div class="left-data flex-cloumn-cen">
          <div class="circle color2" v-if="warningData">{{warningData}}篇</div>
           <div class="circle color2" v-else>0篇</div>
          <div class="data-name">疑似违规文章</div>
        </div>
        <div class="left-data flex-cloumn-cen">
          <div class="circle color4" v-if="dangerData">{{dangerData}}篇</div>
           <div class="circle color4" v-else>0篇</div>
          <div class="data-name">被发布者删除</div>
        </div>
      </div>
    </div>
    <div class="line-right">
      <div class="title">关联小程序</div>
      <div class="relation flex-arr-center" v-if="artcleMiniJson.length>0">
        <div class="left-data flex-ali-center">
          <div class="header-img flex-ali-center">
            <img :src="require('@/assets/images/home/ava.png')">
          </div>
          <div class="data-name">
            <p class="name">京检在线</p>
            <p class="detail">简介:巴拉巴拉巴拉巴拉</p>
          </div>
        </div>
        <div class="left-data flex-ali-center">
          <div class="header-img flex-ali-center">
            <img :src="require('@/assets/images/home/ava.png')">
          </div>
          <div class="data-name">
            <p class="name">京检在线</p>
            <p class="detail">简介:巴拉巴拉巴拉巴拉</p>
          </div>
        </div>
        <div class="left-data flex-ali-center">
          <div class="header-img flex-ali-center">
            <img :src="require('@/assets/images/home/ava.png')">
          </div>
          <div class="data-name">
            <p class="name">京检在线</p>
            <p class="detail">简介:巴拉巴拉巴拉巴拉</p>
          </div>
        </div>
        <div class="left-data flex-ali-center">
          <div class="header-img flex-ali-center">
            <img :src="require('@/assets/images/home/ava.png')">
          </div>
          <div class="data-name">
            <p class="name">京检在线</p>
            <p class="detail">简介:巴拉巴拉巴拉巴拉</p>
          </div>
        </div>
      </div>
      <div v-else class="relation flex-arr-center">
        <div>
          <p class="name">暂无关联小程序</p>
          <!-- <p class="detail">敬请期待...</p> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      artcleDelJson: [],
      artcleMiniJson: {},
      successData: {},
      warningData: {},
      dangerData: {}
    }
  },
  methods: {
    getArticleTime (data) {
      this.artcleDelJson = JSON.parse(data.artcleDelJson)
      this.artcleMiniJson = JSON.parse(data.artcleMiniJson)
      this.successData = this.artcleDelJson[0]
      this.warningData = this.artcleDelJson[1]
      this.dangerData = this.artcleDelJson[2]
      console.log(this.artcleDelJson)
    }
  },
  mounted () {
  }
}
</script>
<style>
@import '../monitor.css';
</style>
<style scoped>
.line-left,
.line-right {
  width: 685px;
  height: 300px;
}

.violation-data,
.relation {
  width: 100%;
  height: 280px;
}
.relation {
  flex-wrap: wrap;
  padding-left: 10px;
}
.relation .name {
  color: #252934;
  font-size: 16px;
  line-height: 28px;
}
.relation .detail {
  color: #707277;
  font-size: 14px;
  line-height: 24px;
}
.title {
  font-size: 18px;
  color: #151c29;
}
.title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 20px;
  background-color: #2196f3;
  vertical-align: middle;
  margin-top: -4px;
  margin-right: 10px;
}
.left-data {
  width: 45%;
}
.circle {
  width: 70px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  border-radius: 50%;
  color: #fff;
  margin-bottom: 20px;
}
.data-name {
  color: #8b8c91;
  font-size: 14px;
}
.header-img {
  width: 70px;
  height: 70px;
  border: 1px solid #333;
  margin-right: 20px;
  display: flex;
  align-items: center;
}
.header-img img {
  width: 100%;
  max-height: 100%;
}
</style>
