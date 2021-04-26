<!--
 * @Author: zhangjuan
 * @Description: Bottom
 * @Date: 2021-01-28 17:24:17
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-04-12 10:45:40
-->
<template>
  <div class="bottom-wrap">
    <div class="bottom-container"
         v-if="routeName === 'Home'">
      <div class="bottom-main flex-bwt-center">
        <div class="bottom-left flex-bwt">
          <img src="@/assets/images/home/kefu.png" alt="">
          <div>
            <p>客服热线：010-88321270</p>
            <p>周一至周日 9:00-18:00</p>
            <p>在线客服</p>
          </div>
        </div>
        <div class="bottom-right flex-bwt-center">
          <ul>
            <li class="bottom-right-title">工具</li>
            <!-- <li class="bottom-right-centent">客户端下载</li> -->
            <li class="bottom-right-centent">API文档</li>
            <li class="bottom-right-centent">技术介绍</li>
            <li class="bottom-right-centent">官方验证通道</li>
            <li></li>
          </ul>
          <ul>
            <li class="bottom-right-title">服务</li>
            <!-- <li class="bottom-right-centent">服务中心</li>
            <li class="bottom-right-centent">服务中心</li> -->
            <li class="bottom-right-centent">帮助中心</li>
            <li class="bottom-right-centent">新手指南</li>
          </ul>
          <ul>
            <li class="bottom-right-title">支持</li>
            <li class="bottom-right-centent">技术支持</li>
            <!-- <li class="bottom-right-centent">机构服务</li>
            <li class="bottom-right-centent">技术支持</li>
            <li class="bottom-right-centent">广告权限申请</li> -->
          </ul>
          <ul>
            <li class="bottom-right-title">条款说明</li>
            <li class="bottom-right-centent">用户协议</li>
            <!-- <li class="bottom-right-centent">隐私条款</li>
            <li class="bottom-right-centent">法律声明</li>
            <li class="bottom-right-centent">执法和监管查询</li> -->
          </ul>
          <ul class="bottom-code">
            <li class="bottom-right-title text-center">关注易有数</li>
            <img :src="codeUrl" alt="">
          </ul>
        </div>
      </div>
    </div>
    <div class="bottom-footer flex-all-center"
         v-if="routeName === 'Home'">
      <p>© 2021 yiyoushu.com , All Rights Reserved 京ICP备2021001757号-2</p>
    </div>
    <div class="bottom-footer flex-all-center bottom-fixed"
         v-if="routeName !== 'Login' && routeName !== 'Home'">
      <p>© 2021 yiyoushu.com , All Rights Reserved 京ICP备2021001757号-2</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bottom',
  data () {
    return {
      codeUrl: 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQHm8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAybHNsQWhuMGxmbkYxMDAwMDAwN2IAAgQOiklgAwQAAAAA'
    }
  },
  methods: {},
  computed: {
    routeName () {
      return this.$route.name
    }
  }
}
</script>
