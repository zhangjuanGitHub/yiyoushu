<!--
 * @Author: zhangjuan
 * @Date: 2021-04-20 17:20:52
 * @LastEditors: ZhangJuan
 * @LastEditTime: 2021-11-02 14:28:54
-->
<template>
  <div class="custom">
    <div class="home-up-wrap">
      <div class="home-up flex-ali-center">
        <img src="@/assets/images/login/yys.png"
             alt="">
        <div class="crumbs">数据定制</div>
      </div>
    </div>
    <div class="center-wraper">
      <div class="custom-wraper">
        <div class="tabs-header">
          <span class="tabs-title">开通数据API</span>
        </div>
        <div class="custom-main-box">
          <p class="custom-sub-title">如需API服务，请填写以下信息并确认开通。</p>
          <div class="custom-sub-slider flex-bwt-center">
            <div class="custom-slider"></div>
            <p>更多详细服务信息，可直接<span>联系商务</span></p>
            <div class="custom-slider"></div>
          </div>
          <div class="custom-sub-liu flex-bwt-center">
            <div class="flex-cloumn-cen">
              <img src="@/assets/images/custom/cust_0.png" alt="">
              <p>提交数据要求</p>
            </div>
            <img src="@/assets/images/custom/arrow.png" alt="">
            <div class="flex-cloumn-cen">
              <img src="@/assets/images/custom/cust_1.png" alt="">
              <p>沟通确定方案</p>
            </div>
            <img src="@/assets/images/custom/arrow.png" alt="">
            <div class="flex-cloumn-cen">
              <img src="@/assets/images/custom/cust_2.png" alt="">
              <p>制定交付</p>
            </div>
          </div>
          <el-form :model="ruleForm"
                   ref="ruleForm"
                   label-width="120px"
                   :rules="rules"
                   class="custom-sub-form">
            <div class="custom-sub-tab flex-ali-center">
              <div></div>
              <p class="sub-pp1">数据需求</p>
              <p class="sub-pp2">详细的需求描述有助于帮助我们为您提供更好的服务</p>
            </div>
            <el-form-item prop="platformTypeList"
                          label="平台">
              <el-checkbox-group v-model="ruleForm.platformTypeList">
                <el-checkbox label="1">微信</el-checkbox>
                <el-checkbox label="2">微博</el-checkbox>
                <el-checkbox label="3">抖音</el-checkbox>
                <el-checkbox label="4">今日头条</el-checkbox>
                <el-checkbox label="0">其他</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="explain"
                          label="详细说明">
              <el-input type="textarea"
                        v-model="ruleForm.explain"
                        :autosize="{ minRows: 5, maxRows: 8}"
                        placeholder="请详细描述您的定制需求">
              </el-input>
            </el-form-item>
            <div class="custom-sub-tab flex-ali-center">
              <div></div>
              <p class="sub-pp1">联系方式</p>
              <p class="sub-pp2">请留下您的联系方式，以便必要时沟通或接收重要通知</p>
            </div>
            <el-form-item prop="linkman"
                          label="联系人">
              <div class="flex-ali-center custom-sub-people">
                <el-input v-model="ruleForm.linkman"></el-input>
                <el-radio-group v-model="ruleForm.linkmanSex">
                  <el-radio label="1" name="linkmanSex">先生</el-radio>
                  <el-radio label="2" name="linkmanSex">女士</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item prop="phone"
                          label="联系方式">
              <el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="smsCode"
                          label="验证码">
              <div class="flex-ali-center custom-sub-people">
                <el-input v-model="ruleForm.smsCode" placeholder="请输入验证码"></el-input>
                <div class="custom-get" @click="getSmsCode">获取验证码</div>
              </div>
            </el-form-item>
            <el-form-item prop="company"
                          label="公司/组织名称">
              <el-input v-model="ruleForm.company"></el-input>
            </el-form-item>
            <div class="flex-all-center">
              <el-button @click="submit('ruleForm')"
                          type="primary"
                          class="submit">确认提交</el-button>
            </div>
          </el-form>
          <div class="custom-slider-bot"></div>
          <div class="custom-sub-bottom flex-bwt-center">
            <p>海量精准新媒体数据，分析研究好助手</p>
            <p>了解<span @click="$router.push({ name: 'GetToken' })">新媒体数据api</span></p>
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
      ruleForm: {
        platformTypeList: [], //  1微信 2微博 3抖音，4头条 0其他
        explain: '', // 详细说明
        linkman: '', // 联系人
        linkmanSex: '1',
        phone: '',
        smsCode: '', // 输入的验证码
        company: ''
      },
      rules: {
        platformTypeList: [
          { required: true, message: '请至少选择一个平台', trigger: 'change' }
        ],
        linkman: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        smsCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value) {
              var reg = /^1(3[0-9]|4[579]|5[0-35-9]|6[567]|7[0135678]|8[0-9]|9[89])\d{8}$/
              if (!reg.test(value)) {
                callback(new Error('请输入正确的手机号'))
              } else {
                callback()
              }
            } else {
              callback(new Error('请输入手机号'))
            }
          },
          trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http.post(this.$api.addCustom, this.ruleForm)
            .then(res => {
              this.$message.success('提交成功，请等候回复')
              this.$refs[form].resetFields()
            }).catch(() => { })
        }
      })
    },
    // 获取短信验证码
    getSmsCode () {
      if (this.ruleForm.phone) {
        this.$http.post(this.$api.getSmsCode, { phone: this.ruleForm.phone })
          .then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
            }
          }).catch(() => { })
      } else {
        this.$message.warning('请正确输入手机号')
      }
    }
  }
}
</script>
<style scoped>
@import './custom.css';
</style>
