<!--
 * @Author: MaiChao
 * @@Description:手机号绑定
 * @Date: 2021-02-26 15:22:10
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-21 14:44:48
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
      <div class="login-phone">
        <p v-if="userInfo.loginPhone">手机绑定:<span class="user-num">{{userInfo.loginPhone}}</span></p>
        <p v-if="userInfo.departmentName">认证单位:<span class="user-num">{{userInfo.departmentName}}</span></p>
      </div>
    </div>
    <div class="click-box" v-if="userInfo.loginPhone">
      <span class="cursor primary click-sapn"
            @click="relievePhone">解除绑定</span>
      <span class="cursor primary click-sapn last-span"
            @click="replacePhone">更换绑定</span>
    </div>
    <div class="password-content flex-ali-center">
      <div class="left-form">
        <div class="title">手机号绑定</div>
        <div class="explain">
          <el-steps :active="active"
                    finish-status="success">
            <el-step title="验证微信"></el-step>
            <el-step title="绑定手机"></el-step>
            <el-step title="完成绑定"></el-step>
          </el-steps>
        </div>
        <div class="QRcode"
             v-if="active===0">
          <div class="img-box"
               v-if="open===false">
            <!-- <img :src="this.codeUrl"> -->
            <el-image :src="this.codeUrl">
              <div slot="error"
                   class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
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
             v-if="active===1">
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
                        placeholder='请输入密码6-16位数字、字母和符号'>
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
        <div class="finish-box"
             v-if="active===2">
          <div class="note-box">
            <div class="el-icon-success"></div>
            <p class="left-title">成功绑定手机</p>
            <div class="left-content">
              <span class="delete">在微信失效时您可以使用账号登录</span>
            </div>
          </div>
        </div>
      </div>
      <div class="right-img">
        <img :src="require('@/assets/images/setting/right-img.png')"
             alt="">
      </div>
    </div>
    <!-- 解除绑定 -->
    <el-dialog :visible.sync="relieve"
               :modal-append-to-body="false"
               :close-on-click-modal='false'
               :before-close='handleClose'
               :show-close="true"
               width="25%"
               center
               class="pass-dialog">
      <div class="tip-box">
        <div class="pass-title pass-center">解除手机绑定</div>
        <el-image :src="this.codeUrl">
          <div slot="error"
               class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <div class="pass-tip pass-center">请使用注册微信号扫一扫验证</div>
      </div>
    </el-dialog>
    <!-- 解除成功 -->
    <el-dialog :visible.sync="passPhone"
               :modal-append-to-body="false"
               :close-on-click-modal='false'
               :show-close="false"
               width="30%"
               center
               class="pass-dialog">
      <div class="note-box">
        <div class="el-icon-success"></div>
        <p class="left-title">成功解除手机绑定</p>
        <p class="left-content">您现在可以到个人中心我的资料中<span class="cursor delete"
                @click="openPhone">手机号绑定</span></p>
      </div>
      <span slot="footer"
            class="pass-footer">
        <el-button type="primary"
                   @click="openPhone">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 更换绑定 -->
    <el-dialog :visible.sync="replace"
               :modal-append-to-body="false"
               :close-on-click-modal='false'
               :show-close="true"
               width="25%"
               center
               class="pass-dialog">
      <div>
        <div class="pass-title pass-center">更换绑定手机</div>
        <el-form :model="replaceForm"
                 :rules="rules"
                 ref="replaceForm"
                 class="replaceForm">
          <el-form-item prop="phone">
            <el-input v-model="replaceForm.phone"
                      type="text"
                      prefix-icon="el-icon-mobile-phone"
                      placeholder="请输入绑定手机号">
            </el-input>
          </el-form-item>
          <el-form-item prop="smsCode"
                        class="smscode-box">
            <el-input v-model="replaceForm.smsCode"
                      type="text"
                      placeholder="请输入短信验证码"
                      prefix-icon="el-icon-mobile-phone">
              <span class="disbtn"
                    slot="append"
                    v-if="smsBtn">{{second}}s</span>
              <el-button slot="append"
                         @click="getReplaceSMS"
                         type="primary"
                         v-else>获取验证码</el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="loginPass">
            <el-input :type="show.new?'text':'password'"
                      v-model="replaceForm.loginPass"
                      placeholder='请输入密码6-16位数字、字母和符号'>
              <i slot="suffix"
                 :class="show.new?'el-icon-minus':'el-icon-view'"
                 style="margin-top:8px;font-size:18px;"
                 autocomplete="auto"
                 @click="show.new=!show.new" />
            </el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input :type="show.check?'text':'password'"
                      v-model="replaceForm.checkPass"
                      placeholder='请确认登录密码'>
              <i slot="suffix"
                 :class="show.check?'el-icon-minus':'el-icon-view'"
                 style="margin-top:8px;font-size:18px;"
                 autocomplete="auto"
                 @click="show.check=!show.check" />
            </el-input>
          </el-form-item>
          <el-form-item class="pass-footer">
            <el-button type="primary"
                       @click="reForm('replaceForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- 未绑定 -->
    <el-dialog :visible.sync="errorPhone"
               :modal-append-to-body="false"
               :close-on-click-modal='false'
               :show-close="false"
               width="30%"
               center
               class="pass-dialog">
      <div class="note-box">
        <div class="el-icon-success"></div>
        <p class="left-title">未绑定手机号无法执行此操作</p>
        <p class="left-content">您现在可以到个人中心我的资料中<span class="cursor delete"
                @click="openPhone">手机号绑定</span></p>
      </div>
      <span slot="footer"
            class="pass-footer">
        <el-button type="primary"
                   @click="openPhone">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
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
        callback(new Error('请输入绑定手机号'))
      } else if (!/^1\d{10}$/.test(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    return {
      replace: false, // 更换弹框
      passPhone: false, // 解除成功
      relieve: false, // 解除弹框
      errorPhone: false, // 未绑定
      active: 2,
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
      replaceForm: {
        phone: '',
        smsCode: '',
        loginPass: '',
        checkPass: ''
      },
      rules: {
        phone: [
          { required: true, validator: validatorPhone, trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }],
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
    if (this.userInfo.loginPhone) {
      this.active = 2
    } else {
      this.active = 1
      this.getCodes()
      this.getQRcode()
    }
  },
  methods: {
    // 确定修改绑定手机
    reForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let newRuleForm = {}
          let loginPass = md5(md5(this.replaceForm.loginPass) + this.replaceForm.phone)
          let checkPass = md5(md5(this.replaceForm.checkPass) + this.replaceForm.phone)
          for (var key in this.replaceForm) {
            newRuleForm[key] = this.replaceForm[key]
          }
          newRuleForm.loginPass = loginPass
          newRuleForm.checkPass = checkPass
          this.$http.post(this.$api.bindPhone, newRuleForm)
            .then(res => {
              this.replaceForm = {}
              newRuleForm = {}
              this.active = 2
            }).catch(() => { })
        } else {
          return false
        }
      })
    },
    // 打开完成解除弹框
    openPhone () {
      this.passPhone = false
      this.errorPhone = false
      this.replace = false
      this.relieve = false
      this.userInfo.loginPhone = ''
      this.userInfo.departmentName = ''
      this.active = 0
      this.getCodes()
      this.getQRcode()
    },
    // 关闭解除弹框
    handleClose () {
      clearInterval(this.isLogin)
      this.relieve = false
    },
    // 解除绑定
    relievePhone () {
      this.getQRcode()
      this.relieve = true
    },
    // 更换绑定
    replacePhone () {
      this.getCodes()
      this.replace = true
    },
    // 验证二维码
    Verify () {
      this.$http.get(this.$api.verify, { params: { sceneStr: this.sceneStr } })
        .then(res => {
          if (res.data.data) {
            clearInterval(this.isLogin)
            if (this.relieve) {
              this.relieve = false
              this.passPhone = true
            } else {
              this.active = 1
            }
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
          }, 2000)
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
    // 获取更换绑定短信验证码
    getReplaceSMS () {
      if (this.replaceForm.phone) {
        if (this.userInfo.loginPhone === this.replaceForm.phone) {
          this.$message.warning('更换绑定手机号不能和已绑定手机号一致!')
        } else {
          let params = {
            code: this.replaceForm.code,
            phone: this.replaceForm.phone
          }
          this.$http.post(this.$api.sendSms, params)
            .then(res => {
              this.getDown()
              this.replaceForm.sms = res.data.data.sms
            }).catch(() => { })
        }
      } else {
        this.$message.warning('请正确填写手机号!')
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
          let newRuleForm = {}
          let loginPass = md5(md5(this.ruleForm.loginPass) + this.ruleForm.phone)
          let checkPass = md5(md5(this.ruleForm.checkPass) + this.ruleForm.phone)
          for (var key in this.ruleForm) {
            newRuleForm[key] = this.ruleForm[key]
          }
          newRuleForm.loginPass = loginPass
          newRuleForm.checkPass = checkPass
          // this.ruleForm.loginPass = md5(md5(this.ruleForm.loginPass) + this.ruleForm.phone)
          // this.ruleForm.checkPass = md5(md5(this.ruleForm.checkPass) + this.ruleForm.phone)
          this.$http.post(this.$api.bindPhone, newRuleForm)
            .then(res => {
              this.ruleForm = {}
              newRuleForm = {}
              this.active = 2
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
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
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
.QRcode .el-image {
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
.note-box {
  border: 1px solid #d5d5d6;
  min-height: 340px;
  border-radius: 10px;
  width: 520px;
  margin: auto;
  padding: 50px;
  box-sizing: border-box;
}
.note-box .left-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 22px;
  margin-right: 0;
  text-align: center;
}
.left-content {
  text-align: center;
}
.dialog-footer {
  display: block;
}
.pass-footer .el-button {
  width: 350px;
}
.password .el-icon-success {
  font-size: 70px;
  color: rgb(81, 255, 148);
  display: block;
  text-align: center;
  line-height: 140px;
}
.password .el-icon-success {
  font-size: 70px;
  color: rgb(81, 255, 148);
  display: block;
  text-align: center;
  line-height: 140px;
}
.last-span {
  margin-left: 10px;
}
.tip-box {
  width: 350px;
  height: 405px;
  margin: auto;
}
.tip-box .el-image {
  width: 350px;
  height: 350px;
  margin: auto;
}
.pass-title {
  font-size: 18px;
  font-weight: bold;
}
.pass-tip {
  font-size: 16px;
  color: #888787;
}
.pass-center {
  text-align: center;
}
.replaceForm{
  margin-top: 30px;
}
.replaceForm .el-form-item{
  width: 350px;
  margin: auto;
  margin-bottom: 20px;
}
</style>
