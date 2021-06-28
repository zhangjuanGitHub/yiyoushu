<!--
 * @Author: zhangjuan
 * @Date: 2021-05-08 13:39:06
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-06-03 16:32:30
-->
<template>
  <div>
    <div class="tabs-header flex-bwt-center">
      <span class="tabs-title">数据回溯</span>
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
    <div>
      <wx-back v-if="activeName === 'WxBacktrack'"></wx-back>
      <wb-back v-else-if="activeName === 'WbBacktrack'"></wb-back>
    </div>
  </div>
</template>
<script>
import wxBack from './WxBacktrack'
import wbBack from './WbBacktrack'
export default {
  data () {
    return {
      showType: [false, true, true, true],
      activeName: 'WxBacktrack'
    }
  },
  components: {
    wxBack,
    wbBack
  },
  methods: {
    changeType (index) {
      this.showType = [true, true, true, true]
      this.showType[index] = false
      this.activeName = index === 0 ? 'WxBacktrack' : 'WbBacktrack'
    },
  }
}
</script>
<style>
.add-apply .el-dialog__body{
  min-height: 460px;
}
.add-apply .el-tabs__nav-wrap::after {
  background-color: #ffffff;
}
.add-apply .el-dialog--center .el-dialog__body {
  padding: 20px;
}
.second-add-form .el-input {
  width: 85%;
  margin: 10px 0;
}
.second-add-form .el-form-item__error {
  padding: 0;
  top: 90%;
}
</style>
<style scoped>
.tab-type-img img {
  margin: 0 3px;
}
</style>
