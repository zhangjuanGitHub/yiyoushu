<!--
 * @Author: MaiChao
 * @@Description:手机号绑定
 * @Date: 2021-02-26 15:22:10
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-10 18:49:57
-->
<template>
  <div class="password">
    <div class="accound-detail flex-ali-center">
      <el-image style="width: 70px; height: 70px"
                :src="this.userInfo.headPicture"
                fit="cover"></el-image>
      <div class="user-detail">
        <p> <span class="user-name">{{this.userInfo.nickName}}</span><span class="member">免费会员</span></p>
        <p class="user-id">账号ID:<span class="user-num">{{this.userInfo.wechatUserId}}</span></p>
      </div>
    </div>
    <div class="password-content flex-ali-center">
      <div class="left-form">
        <div class="title">手机号绑定</div>
        <div class="explain">
          <el-steps :active="active"
                    finish-status="success">
            <el-step title="绑定微信"></el-step>
            <el-step title="绑定手机"></el-step>
            <el-step title="完成绑定"></el-step>
          </el-steps>
        </div>
        <div class="QRcode"
             v-if="active===0">
          <div class="img-box"
               v-if="open===false">
            <img :src="this.codeUrl">
          </div>
          <div class="refresh flex-ali-center"
               v-else>
            <div class="icon-box">
              <p class="el-icon-refresh-left cursor"
                 @click="getQRcode"></p>
              <p class="cursor click-span"
                 @click="getQRcode">点此刷新二维码</p>
            </div>
          </div>
        </div>
        <div class="from-box"
             v-if="active>0">
          <el-form :model="ruleForm"
                   :rules="rules"
                   ref="ruleForm"
                   class="demo-ruleForm">
            <el-form-item prop="phone">
              <el-input v-model="ruleForm.phone"
                        type="text"
                        prefix-icon="el-icon-mobile-phone"
                        placeholder="请输入绑定手机号">
              </el-input>
            </el-form-item>
            <el-form-item prop="code"
                          class="code-box">
              <el-input v-model="ruleForm.code"
                        type="text"
                        placeholder="请输入图片验证码"
                        prefix-icon="el-icon-mobile-phone">
                <template slot="append">
                  <img :src="this.phoneCode"
                       @click="getCodes()">
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="smsCode"
                          class="smscode-box">
              <el-input v-model="ruleForm.smsCode"
                        type="text"
                        placeholder="请输入短信验证码"
                        prefix-icon="el-icon-mobile-phone">
                <span class="disbtn"
                      slot="append"
                      v-if="smsBtn">{{second}}s</span>
                <el-button slot="append"
                           @click="getSMS"
                           type="primary"
                           v-else>获取验证码</el-button>
              </el-input>
            </el-form-item>
            <el-form-item prop="loginPass">
              <el-input :type="show.new?'text':'password'"
                        v-model="ruleForm.loginPass"
                        placeholder='6-16位数字、字母和符号'>
                <i slot="suffix"
                   :class="show.new?'el-icon-minus':'el-icon-view'"
                   style="margin-top:8px;font-size:18px;"
                   autocomplete="auto"
                   @click="show.new=!show.new" />
              </el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input :type="show.check?'text':'password'"
                        v-model="ruleForm.checkPass"
                        placeholder='请确认登录密码'>
                <i slot="suffix"
                   :class="show.check?'el-icon-minus':'el-icon-view'"
                   style="margin-top:8px;font-size:18px;"
                   autocomplete="auto"
                   @click="show.check=!show.check" />
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="submitForm('ruleForm')">立即绑定</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="right-img">
        <img :src="require('@/assets/images/setting/right-img.png')"
             alt="">
      </div>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.loginPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validatorPhone = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('手机号不能为空'))
      } else if (!/^1\d{10}$/.test(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    return {
      userInfo: {},
      active: 0,
      show: {
        old: false,
        new: false,
        check: false
      },
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      ruleForm: {
        phone: '',
        code: '',
        smsCode: '',
        loginPass: '',
        checkPass: ''
      },
      rules: {
        phone: [
          { required: true, validator: validatorPhone, trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        smsCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        loginPass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      open: false, // 验证码刷新
      count: '',
      timer: null, // 定时器
      codeUrl: '', // 二维码
      sceneStr: '', // 二维码验证
      phoneCode: '', // 图片验证码
      smsCode: '', // 短信验证码
      smsBtn: false,
      second: 60
    }
  },
  created () {
    this.geUserInfo()
    this.getCodes()
  },
  methods: {
    // 获取 用户信息
    // 获取 用户信息
    geUserInfo () {
      this.$http.get(this.$api.getUserInfo)
        .then(res => {
          this.userInfo = res.data.data
        }).catch(() => { })
    },
    // 验证二维码
    Verify () {
      this.$http.get(this.$api.verify, { params: { sceneStr: this.sceneStr } })
        .then(res => {
          if (res.data.data) {
            clearInterval(this.isLogin)
            this.active = 1
            // this.getCodes()
          }
        }).catch(() => { })
    },
    // 获取二维码
    getQRcode () {
      this.$http.get(this.$api.getCode)
        .then(res => {
          this.open = false
          this.codeUrl = res.data.data.codeUrl
          this.sceneStr = res.data.data.sceneStr
          setTimeout(() => {
            this.open = true
            clearInterval(this.isLogin)
          }, 60000)
          this.isLogin = setInterval(() => {
            this.Verify()
          }, 1000)
        }).catch(() => { })
    },
    getDown () {
      if (!this.timer) {
        this.smsBtn = true
        this.timer = setInterval(() => {
          if (this.second > 0) {
            this.second--
          } else {
            this.second = 60
            this.smsBtn = false
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    // 获取短信验证码
    getSMS () {
      if (this.ruleForm.phone && this.ruleForm.code) {
        let params = {
          code: this.ruleForm.code,
          phone: this.ruleForm.phone
        }
        this.$http.post(this.$api.sendSms, params)
          .then(res => {
            this.getDown()
            this.ruleForm.sms = res.data.data.sms
          }).catch(() => { })
      } else {
        this.$message.warning('请正确填写手机号和验证码!')
      }
    },
    // 获取验证码图片
    getCodes () {
      this.$http.get(this.$api.getPhoneCode)
        .then(res => {
          this.phoneCode = res.data.data.code
        }).catch(() => { })
    },
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.loginPass = md5(md5(this.ruleForm.loginPass) + this.ruleForm.phone)
          this.ruleForm.checkPass = md5(md5(this.ruleForm.checkPass) + this.ruleForm.phone)
          this.$http.post(this.$api.bindPhone, this.ruleForm)
            .then(res => {
              this.$message.success('绑定成功!')
            }).catch(() => { })
        } else {
          return false
        }
      })
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted () {
    this.getQRcode()
  },
  components: {},
  destroyed () {
    clearInterval(this.isLogin)
  }
}
</script>
<style >
@import '../setting.css';
</style>
<style scoped>
.password {
  padding: 50px;
}
.accound-detail .el-image {
  border-radius: 50%;
  margin-right: 20px;
}
.user-name {
  font-size: 18px;
  color: #151c29;
}
.member {
  font-size: 12px;
  color: #fff;
  background-color: #df3a41;
  margin-left: 20px;
  padding: 3px;
}
.user-id {
  font-size: 14px;
  color: #707277;
}
.password-content {
  margin-top: 35px;
  width: 100%;
  border-top: 1px solid #f7f8fa;
  padding-top: 35px;
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
.explain {
  margin: 20px;
  font-size: 14px;
  color: #f09007;
  /* line-height: 60px; */
}
.el-form-item {
  margin-bottom: 20px;
  width: 380px;
  text-align: center;
}
.demo-ruleForm {
  /* margin-left: 20px; */
  width: 380px;
  margin: 0 auto;
}
.left-form {
  width: 60%;
}
.code-box img {
  display: block;
  padding: 0;
  border: 0;
  border-radius: 0 3px 3px 0;
  height: 38px;
  width: 100px;
}
.QRcode {
  height: 360px;
}
.QRcode img {
  display: block;
  margin: 0 auto;
  width: 360px;
  height: 360px;
}
.refresh {
  width: 360px;
  height: 360px;
  background-color: #fff;
  margin: 0 auto;
  text-align: center;
  font-size: 40px;
  border: 1px solid #cfcfcf;
}
.refresh .el-icon-refresh-left {
  font-size: 40px;
  color: #2196f3;
}
.icon-box {
  width: 100%;
  text-align: center;
}
.timing {
  display: inline-block;
  width: 113px;
  height: 40px;
  background-color: #cfcfcf;
  font-size: 18px;
  line-height: 40px;
  text-align: center;
}
</style>
