<!--
 * @Author: MaiChao
 * @Date: 2021-04-07 18:08:52
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-21 16:10:14
-->
<template>
  <div class="custom">
    <div class="home-up-wrap">
      <div class="home-up flex-ali-center">
        <img src="@/assets/images/login/yys.png"
             alt="">
        <div class="home-search-box flex-arr-center">
          <div class="information">
            <span class="info-num">300万<i>+</i></span>
            <span class="info-name">日常监测公众号</span>
          </div>
          <div class="information">
            <span class="info-num">1亿<i>+</i></span>
            <span class="info-name">每月新增文章</span>
          </div>
          <div class="information">
            <span class="info-num">10<i>+</i></span>
            <span class="info-name">新媒体平台数据</span>
          </div>
        </div>
      </div>
    </div>
    <div class="custom-banner">
      <!-- <img src="@/assets/images/custom/customBG.png" alt="数据定制"> -->
      <div class="banner-box">
        <p class="banner-function">易有数【数据定制】</p>
        <p class="function">专业的新媒体数据商，提供更满足您需求的定制服务，解决您的数据多、时间紧、技术难、等众多数据获取难题。</p>
        <div class="banner-button">
          <el-button type="primary" @click="$router.push({ name: 'SubmitCustom' })">提交需求</el-button>
          <el-popover
          placement="right"
          width="300"
          trigger="click">
          <img class="kefu" src="@/assets/images/home/lianxikefu.png" alt="客服二维码">
          <!-- <el-button slot="reference">click 激活</el-button> -->
          <el-button type="warning" slot="reference">在线咨询</el-button>
        </el-popover>
        </div>
      </div>
    </div>
    <div class="custom-cont">
      <div class="my-super">
        <div class="custom-cont-top">我们的优势及特色</div>
        <div class="flex show-content">
          <div class="content-left flex-arr-center">
            <div class="left-box">
              <div class="super-title"><i class="el-icon-caret-right"></i><span class="primary">专业的</span><span>新媒体数据服务商</span></div>
              <p class="super-article">新榜依托强大瘀数据采集能力，每日监测活跃公众号75万+、微博账号4000万个、主流资讯app近50个。视频平台十余个，全方位抓取移动端和pc端全平台的媒体内容和传播效果数据。</p>
            </div>
          </div>
          <img src="@/assets/images/custom/left.png" alt="" class="super-img">
          <div class="content-right flex-arr-center">
            <div class="right-box">
            <div class="super-title"><i class="el-icon-caret-right"></i><span class="primary">快速</span><span>采集</span></div>
            <p class="super-article">实施流程化高校采集，7*24小时无间断，快速完成定制</p>
            <div class="super-title customized"><i class="el-icon-caret-right"></i><span class="primary">定制</span><span>保障</span></div>
            <p class="super-article">四年新媒体数据服务经验沉淀/专业视角定制严格瘀采集标准/多人审核与评估，层层保障</p>
            </div>
          </div>
        </div>
      </div>
      <div class="my-user">
        <div class="custom-cont-top">我们的客户</div>
        <div class="show-content flex">
          <div class="list-box flex-arr-center" v-for="(item, index) of 20" :key="index">
            <img :src="require('@/assets/images/home/hang_'+index+'.png')" alt="">
            <!-- <div class="user-name">
              <p class="chinese">浙江省人民政府</p>
              <p class="english">Zhejiang Provincial People's Government</p>
            </div> -->
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

    }
  }
}
</script>
<style scoped>
.custom .home-search-box {
  width: 100%;
}
.information{
  display: flex;
  align-items: center;
}
.info-num {
  font-size: 30px;
  color: #f79406;
}
.custom .info-num i{
  font-style: normal;
  margin-left: 15px;
  font-weight: normal;
}
.info-name {
  font-size: 16px;
  color: #3B81FE;
  margin-left: 15px;
}
.custom-banner{
  width: 100%;
  height: 400px;
  background-image: url('../../assets/images/custom/customBG.png');
  background-repeat: no-repeat;
  background-position: top left;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
}
.banner-box{
  width: 1400px;
  margin: 0 auto;
  padding: 0 25px;
  box-sizing: border-box;
}
.banner-function{
  font-size: 48px;
  color: #FFFFFF;
  text-shadow: 1px 0px 0px rgba(195, 223, 255, 0.5);
  background: linear-gradient(0deg, rgba(0, 103, 188, 0.1) 0%, rgba(255, 255, 255, 1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.function{
  font-size: 16px;
  color: #FFFFFF;
  line-height: 30px;
  margin: 30px 0 46px 0;
}
.banner-button .el-button{
  border-radius: 4px;
}
.custom-cont{
  width: 1400px;
  margin: 0 auto;
}
.custom-cont-top{
  height: 50px;
  background-color: #F7F8FA;
  color: #252934;
  font-size: 16px;
  padding-left: 25px;
  line-height: 50px;
  margin-top: 30px;
}
.show-content{
  background-color: #FFFFFF;
  padding: 35px;
  box-sizing: border-box;

}
.super-title{
  margin-bottom: 20px;
}
.customized{
  margin-top: 20px;
}
.super-title span{
  font-size:24px;
  font-weight: bold;
}
.super-title i{
  display: inline-block;
  color: #F79406;
  font-size: 16px;
  margin-top: -8px;
  margin-right: 10px;
  vertical-align: middle;
}
.super-article{
  font-size: 16px;
  color: #8C8C8C;
}
.content-left{
  width: 30%;
  text-align: right;
}
.super-img{
  margin: 0 18px;
}
.my-user .show-content{
  flex-wrap: wrap;
  margin-bottom: 56px;
}
.list-box{
  width: 245px;
  height: 78px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  /* padding: 12px 30px; */
  box-sizing: border-box;
  margin: 10px 25px 25px 0;
  cursor: pointer;
}
.list-box:hover{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.list-box:nth-of-type(5n+5){
  margin-right: 0;
}
.list-box img{
  max-width: 100%;
}
.chinese{
  font-size: 16px;
}
.english{
  font-size: 12px;
}
.banner-button .el-button--primary{
  margin-right: 20px;
}
</style>
