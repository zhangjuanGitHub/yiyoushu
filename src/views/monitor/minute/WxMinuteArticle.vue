<!--
 * @Author: MaiChao
 * @@Description:文章既时监测
 * @Date: 2021-03-02 11:41:51
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-05-25 17:23:53
-->
<template>
  <div class="minute-article">
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
                        prop="link"
                        class="link-input">
            <el-input v-model="ruleForm.link"
                      placeholder="请输入发文链接"></el-input>
            <el-button type="primary"
                       @click="queryLink('ruleForm')">查询</el-button>
          </el-form-item>
          <div class="link-box flex-ali-center"
               v-if="Object.keys(this.articleData).length!==0">
            <div class="close el-icon-circle-close"
                 @click="deleteList()"></div>
            <div class="left-image">
              <img :src="articleData.oriHeadImg"
                   alt="">
            </div>
            <div class="right-detail">
              <div class="right-top">
                <span class="name">{{articleData.nickname}}</span>
                <span class="send-time">日常发文时间:</span>
                <span class="send-detail">{{articleData.lastPubtime}}</span>
              </div>
              <div class="right-bottom">
                <p>{{articleData.title}}</p>
              </div>
            </div>
          </div>
          <div class="link-tips">*输入内容后请先点击右侧查询按钮</div>
          <el-form-item prop="time"
                        class="link-time">
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
              <el-select v-model="ruleForm.time"
                         size="small">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"
                           size="small">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <!-- <div class="bottom-tips">剩余监测次数为<span>2</span>次</div> -->
          <div class="bottom-button">
            <el-button type="primary"
                       @click="startAngle('ruleForm')">开始监测</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      articleData: {},
      labelPosition: 'left',
      ruleForm: {
        link: '',
        time: 1
      },
      rules: {
        link: [
          { required: true, message: '请输入发文链接', trigger: 'blur' }
        ]
      },
      options: [],
      testArr: []
    }
  },
  methods: {
    // 查询文章
    queryLink (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            url: this.ruleForm.link
          }
          this.$http.post(this.$api.searchUrl, params)
            .then(res => {
              if (res.data.data) {
                this.articleData = res.data.data
              } else {
                this.$message.warning('无该数据,请通过客服联系我们!')
              }
            }).catch(() => { })
        } else {
          return false
        }
      })
    },
    // 开始监测
    startAngle (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.articleData.dayCount = this.ruleForm.time
          this.$http.post(this.$api.saveArticle, this.articleData)
            .then(res => {
              if (res.data.code === 200) {
                this.$message.success('操作成功!')
                this.articleData = {}
                this.$router.push({ 'name': 'MinuteList' })
                this.$refs[formName].resetFields()
              }
            }).catch(() => {
              this.articleData = {}
            })
        } else {
          return false
        }
      })
    },
    // 删除
    deleteList () {
      this.articleData = {}
      this.ruleForm.link = ''
    }
  },
  created () {
    // 自定义监测时长
    for (let i = 0; i < 30; i++) {
      this.options.push({
        'value': i + 1,
        'label': (i + 1) + '天'
      })
    }
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
.link-box .right-bottom p{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.link-tips {
  margin-left: 40px;
  font-size: 14px;
  color: #f79406;
  margin-bottom: 40px;
}
.link-time .name {
  font-size: 14px;
  line-height: 25px;
  margin-left: -20px;
}
.bottom-tips {
  text-align: center;
  font-size: 16px;
  color: #252934;
  margin-top: 50px;
}
.bottom-tips span {
  font-size: 24px;
}
.bottom-button {
  text-align: center;
  margin: 24px 0px;
}
</style>
