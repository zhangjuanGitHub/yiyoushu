<!--
 * @Author: MaiChao
 * @@Description:文章既时监测
 * @Date: 2021-03-02 11:41:51
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-03 09:27:21
-->
<template>
  <div class="minute-article">
    <div class="tabs-header">
      文章既时监测
    </div>
    <div class="header-img">
      <img :src="require('@/assets/images/monitor/minute.png')"
           alt="">
    </div>
    <div class="minute-content">
      <div class="minute-title">文章即时监测</div>
      <div class="minute-introduce">可对公众号发文进行预约监控。提供分钟级的文章阅读数点赞数监测，掌握公众号文章阅读走向。</div>
      <div class="minute-from">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="80px"
                 :label-position="labelPosition"
                 class="link-ruleForm">
          <el-form-item label="发文链接"
                        prop="link" class="link-input">
            <el-input v-model="ruleForm.link" placeholder="请输入发文链接"></el-input>
            <el-button type="primary"
                       @click="queryLink()">查询</el-button>
          </el-form-item>
          <div class="link-box flex-ali-center">
            <div class="close el-icon-circle-close"></div>
            <div class="left-image">
              <img :src="require('@/assets/images/home/ava.png')"
                   alt="">
            </div>
            <div class="right-detail">
              <div class="right-top">
                <span class="name">京检在线</span>
                <span class="send-time">日常发文时间段:</span>
                <span class="send-detail">无发文规律</span>
              </div>
              <div class="right-bottom">
                <p>公众号的历史文章进行检测，筛选出进行检删除文章。</p>
              </div>
            </div>
          </div>
          <div class="link-tips">*输入内容后请先点击右侧查询按钮</div>
          <el-form-item prop="time" class="link-time">
            <div class="name">监测时长</div>
            <div class="link-line">
            <el-radio-group v-model="ruleForm.time">
              <el-radio :label="1">1天</el-radio>
              <el-radio :label="2">2天</el-radio>
              <el-radio :label="3">3天</el-radio>
              <el-radio :label="4">4天</el-radio>
              <el-radio :label="5">5天</el-radio>
              <el-radio :label="6">6天</el-radio>
              <el-radio :label="7">7天</el-radio>
            </el-radio-group>
            <span class="click">自定义</span>
            <el-select v-model="ruleForm.time" size="small">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value" size="small">
              </el-option>
            </el-select>
            </div>
          </el-form-item>
          <div class="bottom-tips">剩余监测次数为<span>2</span>次</div>
          <div class="bottom-button"><el-button type="primary"
                       @click="startAngle()">开始监测</el-button></div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      labelPosition: 'left',
      ruleForm: {
        link: '',
        time: 1
      },
      rules: {},
      options: [{
        value: 1,
        label: '1天'
      }, {
        value: 2,
        label: '2天'
      }, {
        value: 3,
        label: '3天'
      }, {
        value: 4,
        label: '4天'
      }, {
        value: 5,
        label: '5天'
      }, {
        value: 6,
        label: '6天'
      }, {
        value: 7,
        label: '7天'
      }, {
        value: 8,
        label: '8天'
      }, {
        value: 9,
        label: '9天'
      }, {
        value: 10,
        label: '10天'
      }, {
        value: 11,
        label: '11天'
      }, {
        value: 12,
        label: '12天'
      }, {
        value: 13,
        label: '13天'
      }, {
        value: 14,
        label: '14天'
      }, {
        value: 15,
        label: '15天'
      }, {
        value: 16,
        label: '16天'
      }, {
        value: 17,
        label: '17天'
      }, {
        value: 18,
        label: '18天'
      }, {
        value: 19,
        label: '19天'
      }, {
        value: 20,
        label: '20天'
      }, {
        value: 21,
        label: '21天'
      }, {
        value: 22,
        label: '22天'
      }, {
        value: 23,
        label: '23天'
      }, {
        value: 24,
        label: '24天'
      }, {
        value: 25,
        label: '25天'
      }, {
        value: 26,
        label: '26天'
      }, {
        value: 27,
        label: '27天'
      }, {
        value: 28,
        label: '28天'
      }, {
        value: 29,
        label: '29天'
      }, {
        value: 30,
        label: '30天'
      }]
    }
  },
  methods: {
    startAngle () {}
  }
}
</script>
<style>
@import '../monitor.css';
</style>
<style scoped>
.header-img img {
  display: block;
  margin: 0 auto;
  margin-top: 25px;
}
.minute-title {
  text-align: center;
  font-size: 24px;
  color: #151c29;
  line-height: 24px;
  margin-bottom: 13px;
}
.minute-introduce {
  width: 430px;
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
  color: #707277;
  line-height: 20px;
}
.minute-from .link-ruleForm {
  width: 560px;
  margin: 50px auto;
}
.minute-from .link-ruleForm .el-form-item {
  margin-bottom: 20px;
}
.left-image img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 10px;
}
.link-box {
  margin-left: 80px;
  background-color: #f7f8fa;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 35px;
  position: relative;
}
.close {
  position: absolute;
  top: 18px;
  right: 18px;
  background-color: #fff;
  cursor: pointer;
}
.link-box .right-detail .right-top {
  color: #252934;
  font-size: 14px;
  line-height: 30px;
}
.right-top .name {
  font-size: 16px;
  margin-right: 20px;
}
.right-top .send-detail {
  color: #ffc154;
}
.link-box .right-bottom {
  font-size: 14px;
  color: #707277;
  line-height: 30px;
}
.link-tips {
  margin-left: 40px;
  font-size: 14px;
  color: #f79406;
  margin-bottom: 40px;
}
.link-time .name{
  font-size: 14px;
  line-height: 25px;
  margin-left: -20px;
}
.bottom-tips{
  text-align: center;
  font-size: 16px;
  color: #252934;
  margin-top: 50px;
}
.bottom-tips span{
  font-size: 24px;
}
.bottom-button{
  text-align: center;
  margin: 24px 0px;
}
</style>
