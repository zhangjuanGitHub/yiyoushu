<!--
 * @Author: MaiChao
 * @Description: 账号管理
 * @Date: 2021-02-26 09:42:59
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-06-01 16:04:56
-->
<template>
  <div class="manage">
    <div class="manage-header">
      <div class="img-box flex-ali-center">
        <img src="@/assets/images/login/yys.png"
             alt="">
        <div class="crumbs">个人中心</div>
      </div>
    </div>
    <div class="manage-content flex-just-center">
      <div class="menu-warp">
        <v-menu></v-menu>
      </div>
      <div class="manage-right">
        <div class="tabs-header flex-bwt-center">
          <div>
            <span class="tabs-title"
                @click="tabsAll('Company')"
                :class="this.$route.name==='Company'?'isActive':''">单位账号</span>
            <span class="tabs-title"
                  @click="tabsAll('Collection')"
                  :class="this.$route.name==='Collection'?'isActive':''">收藏账号</span>
          </div>
          <div class="tab-type-img flex-ali-center">
            <img v-if="showType[0]"
                 src="@/assets/images/setting/type-0-0.png" alt=""
                 class="cursor" @click="changeType(0)">
            <img v-else-if="!showType[0]" src="@/assets/images/setting/type-0-1.png" alt="">

            <img v-if="showType[1]"
                 src="@/assets/images/setting/type-1-0.png" alt=""
                 class="cursor" @click="changeType(1)">
            <img v-else-if="!showType[1]" src="@/assets/images/setting/type-1-1.png" alt="">

            <!-- <img v-if="showType[2]"
                 src="@/assets/images/setting/type-2-0.png" alt=""
                 class="cursor" @click="changeType(2)">
            <img v-else-if="!showType[2]" src="@/assets/images/setting/type-2-1.png" alt="">

            <img v-if="showType[3]"
                 src="@/assets/images/setting/type-3-0.png" alt=""
                 class="cursor" @click="changeType(3)">
            <img v-else-if="!showType[3]" src="@/assets/images/setting/type-3-1.png" alt=""> -->
          </div>
        </div>
        <router-view :type="type"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import vMenu from '@/views/setting/components/Menu'
export default {
  data () {
    return {
      showType: [false, true, true, true],
      type: 1
    }
  },
  methods: {
    tabsAll (name) {
      // this.type = 1
      this.showType = [true, true, true, true]
      this.showType[this.type-1] = false
      this.$router.push({ name: name })
    },
    changeType (index) {
      this.showType = [true, true, true, true]
      this.showType[index] = false
      this.type = index+1
    },
  },
  components: {
    vMenu
  }
}
</script>
<style scoped>
.manage {
  min-height: calc(100vh - 111px);
}
.manage-header {
  background-color: #fff;
}
.manage-header .img-box {
  width: 1400px;
  height: 117px;
  margin: 0 auto;
}
.img-box>img {
  width: 170px;
}
.crumbs {
  color: #3b81fe;
  font-size: 24px;
  display: flex;
  align-items: center;
}
.crumbs::before {
  content: '';
  display: block;
  width: 5px;
  height: 5px;
  background-color: #3b81fe;
  margin: 0 34px;
  border-radius: 50%;
}
.tabs-header {
  width: 1212px;
  height: 50px;
  line-height: 50px;
  box-sizing: border-box;
}
.manage-right{
  width: 1212px;
  background-color: #fff;
  margin: 30px 0 100px 20px;
}
.tab-type-img img {
  margin: 0 3px;
}
</style>
