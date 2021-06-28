<template>
  <div class="login-wrap flex-all-center">
    <div class="header">
      <img src="@/assets/images/login/yys.png"
           alt=""
           class="cursor"
           @click="$router.push({ name: 'Home'})">
    </div>
    <div class="login-main">
      <div class="login-bg">
        <img src="@/assets/images/login/loginBG.png"
             alt="">
      </div>
      <div class="login-info-box">
        <div class="login-right-coner">
          <img v-if="!showCode"
               @click="changeLoginFunc"
               src="@/assets/images/login/login_1.png"
               alt="">
          <img v-else
               @click="changeLoginFunc"
               src="@/assets/images/login/login_2.png"
               alt="">
        </div>
        <div v-if="!showCode"
             class="login-info-main">
          <p class="login-info-title">账号登录</p>
          <el-form :model="ruleForm"
                   ref="ruleForm"
                   :rules="rules">
            <el-form-item prop="loginName">
              <el-input v-model="ruleForm.loginName"
                        placeholder="请输入您的手机号">
              </el-input>
            </el-form-item>
            <el-form-item prop="loginPass">
              <el-input type="password"
                        v-model="ruleForm.loginPass"
                        placeholder="请输入您的密码">
              </el-input>
            </el-form-item>
            <div class="login-check flex-bwt-center">
              <el-checkbox v-model="remenerPass">记住密码</el-checkbox>
              <p class="cursor">忘记密码</p>
            </div>
            <el-button :loading="isLoading"
                       @click="submit('ruleForm')"
                       type="primary">登录</el-button>
          </el-form>
        </div>
        <div v-else
             class="login-info-main flex-cloumn-cen">
          <p class="login-info-title">扫码登录</p>
          <div class="login-code-box">
            <div class="flex-all-center login-code-loading"
                 v-if="!codeUrl">
              <i class="el-icon-loading" style="color: #3B81FE"></i>
            </div>
            <img :src="codeUrl"
                 v-if="codeUrl"
                 alt="">
            <div v-if="timeOut"
                 class="login-timeout flex-all-center">
              <p>二维码已失效，请重新<span @click="refreshCode">刷新</span></p>
            </div>
          </div>
          <p class="login-info-tip">打开微信扫一扫，<br><span>关注公众号</span>后即可登录/注册</p>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div>
        <p class="phone">客服热线:010-88321270 周一至周日 9:00-18:00</p>
        <p class="icp">© 2021 yiyoushu.com , All Rights Reserved 京ICP备2021001757号-2</p>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import md5 from 'js-md5'
export default {
  name: 'login',
  components: {},
  data () {
    return {
      codeUrl: '', // 二维码
      sceneStr: '', // 场景值
      showCode: true, // 默认展示二维码
      remenerPass: true, // 是否记住密码
      isLoading: false,
      timeOut: false, // 二维码是否过期
      ruleForm: {
        loginName: '',
        loginPass: ''
      },
      isLogin: null, // 定时器
      rules: {
        loginName: [
          { required: true, message: '请输入您的手机号', trigger: 'blur' }
        ],
        loginPass: [
          { required: true, message: '请输入您的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 变换登录方式
    changeLoginFunc () {
      if (!this.showCode) {
        this.timeOut = false
        this.codeUrl = ''
        this.getCode()
      } else {
        this.getCookie()
        clearInterval(this.isLogin)
      }
      this.showCode = !this.showCode
    },
    // 登录
    submit () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.isLoading = true
          if (this.remenerPass) {
            this.setCookies(this.ruleForm.loginName, this.ruleForm.loginPass, 7)
          } else {
            this.setCookies('', '', -1)
          }
          this.ruleForm.loginPass = md5(md5(this.ruleForm.loginPass) + this.ruleForm.loginName)
          this.$http.post(this.$api.login, this.ruleForm)
            .then(res => {
              this.$store.commit('user/userToken', res.data.data) // 用户信息
              sessionStorage.setItem(`token`, res.data.data)
              this.geUserInfo()
              this.$router.replace({ name: 'Home' })
              this.$message.success('登录成功！')
              this.isLoading = false
            }).catch(() => {
              this.isLoading = false
              this.getCookie()
            })
        }
      })
    },
    // 获取 用户信息
    geUserInfo () {
      this.$http.get(this.$api.getUserInfo)
        .then(res => {
          this.$store.commit('user/userInfo', res.data.data) // 用户详情
          // sessionStorage.setItem('userinfo', res.data.data)
        }).catch(() => { })
    },
    setCookies (c_name, c_pwd, saveDays) {
      var now = new Date() // 获取时间
      now.setTime(now.getTime() + 24 * 60 * 60 * 1000 * saveDays) // 保存的天数
      // 字符串拼接cookie
      window.document.cookie = 'loginName' + '=' + c_name + ';path=/;expires=' + now.toGMTString()
      window.document.cookie = 'loginPass' + '=' + c_pwd + ';path=/;expires=' + now.toGMTString()
    },
    // 读取cookie
    getCookie () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ')
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=')
          if (arr2[0] === 'loginName') {
            this.ruleForm.loginName = arr2[1]
          } else if (arr2[0] === 'loginPass') {
            this.ruleForm.loginPass = arr2[1]
          }
        }
      }
    },
    listenerSubmit (e) {
      if (e.keyCode === 13 && !this.isLoading) {
        this.submit('ruleForm')
      }
    },
    // 刷新二维码
    refreshCode () {
      this.timeOut = false
      this.getCode()
    },
    // 获取微信二维码
    getCode () {
      this.$http.get(this.$api.getCode)
        .then(res => {
          this.codeUrl = res.data.data.codeUrl
          this.sceneStr = res.data.data.sceneStr
          setTimeout(() => {
            this.timeOut = true
            clearInterval(this.isLogin)
          }, 60000)
          this.isLogin = setInterval(() => {
            this.sendIsLogin()
          }, 2000)
        }).catch(() => { })
    },
    // 扫码登录
    sendIsLogin () {
      this.$http.post(this.$api.codeLogin, { sceneStr: this.sceneStr })
        .then(res => {
          if (res.data.data !== null) {
            this.$store.commit('user/userToken', res.data.data) // 用户信息
            sessionStorage.setItem(`token`, res.data.data)
            this.geUserInfo()
            clearInterval(this.isLogin)
            this.$router.replace({ name: 'Home' })
            this.$message.success('登录成功！')
          }
        }).catch(() => { })
    }
  },
  mounted () {
    this.getCode()
    window.addEventListener('keydown', this.listenerSubmit)
  },
  destroyed () {
    clearInterval(this.isLogin)
    window.removeEventListener('keydown', this.listenerSubmit, false)
  }
}
</script>
<style lang="scss">
.login-wrap {
  width: 100%;
  height: 100vh;
}
.login-wrap::after {
  content: '';
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #010437;
  // background-image: url('../../assets/images/login/login.jpg');
  // background-repeat: no-repeat;
  // background-position: top left;
  // background-size: 100% 100%;
}
.login-main {
  width: 70%;
  display: flex;
  justify-content: space-around;
}
.login-logo-box {
  width: 160px;
  p {
    color: #d5d6da;
    font-size: 14px;
    text-indent: 5px;
    letter-spacing: 8px;
  }
}
.login-info-box {
  width: 425px;
  height: 475px;
  // float: right;
  // margin-right: 250px;
  // margin-top: 50px;
  border-radius: 5px;
  background: $white-text-color;
  .login-right-coner {
    width: 100%;
    height: 86px;
    img {
      width: 87px;
      height: 100%;
      float: right;
      cursor: pointer;
      border-radius: 5px;
    }
  }
  .login-info-main {
    margin: 0 40px;
    .login-code-box {
      width: 196px;
      height: 196px;
      margin: 20px auto;
      position: relative;
      img, .login-code-loading {
        width: 100%;
        height: 100%;
      }
      i {
        font-size: 30px;
      }
    }
    .login-timeout {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba($color: #000000, $alpha: 0.8);
      p {
        font-size: $font-size-large;
        color: $white-text-color;
        span {
          cursor: pointer;
          color: $hight-light-color;
        }
      }
    }
    .login-info-tip {
      text-align: center;
      color: $tab-text-color;
      font-size: 20px;
      span {
        color: $hight-light-color;
      }
    }
  }
  .login-info-title {
    text-align: center;
    font-size: 30px;
    color: #0e122b;
  }
  .login-check {
    margin: 20px 20px;
  }
  .el-input {
    font-size: 18px;
    margin: 15px 0;
  }
  .el-input__inner {
    height: 50px;
    line-height: 50px;
  }
  .el-form-item__error {
    padding-top: 0;
    font-size: 14px;
  }
  .el-button {
    width: 100%;
    height: 50px;
    font-size: 20px;
  }
}
.header {
  position: absolute;
  background-color: #fff;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 70px;
  line-height: 70px;
  img {
    width: 155px;
    margin-left: 60px;
    vertical-align: middle;
  }
}
.bottom {
  position: absolute;
  background-color: #fff;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 136px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .phone {
    font-size: 14px;
    font-weight: 400;
    color: #0e122b;
    line-height: 36px;
  }
  .icp {
    font-size: 12px;
    font-weight: 400;
    color: #6b798e;
    line-height: 36px;
  }
}
</style>
