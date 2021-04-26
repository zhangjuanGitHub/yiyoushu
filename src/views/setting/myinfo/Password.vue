<!--
 * @Author: MaiChao
 * @@Description:修改密码
 * @Date: 2021-02-26 15:22:10
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-11 17:29:10
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
      <!-- <div class="editor cursor el-icon-edit-outline">编辑</div> -->
    </div>
    <div class="password-content flex-ali-center">
      <div class="left-form">
        <div class="title">修改密码</div>
        <span class="explain">说明:修改在易有数登录密码。</span>
        <div class="from-box">
          <el-form :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  class="demo-ruleForm">
            <el-form-item prop="currentLoginPass">
              <el-input v-model="ruleForm.currentLoginPass"
                        :type="show.old?'text':'password'"
                        placeholder="请输入旧密码">
                <i slot="suffix"
                  :class="show.old?'el-icon-minus':'el-icon-view'"
                  style="margin-top:8px;font-size:18px;"
                  autocomplete="auto"
                  @click="show.old=!show.old" />
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
                        placeholder='请再次输入新密码'>
                <i slot="suffix"
                  :class="show.check?'el-icon-minus':'el-icon-view'"
                  style="margin-top:8px;font-size:18px;"
                  autocomplete="auto"
                  @click="show.check=!show.check" />
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                        @click="submitForm('ruleForm')">立即修改</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="right-img">
        <img :src="require('@/assets/images/setting/right-img.png')" alt="">
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
    return {
      userInfo: {},
      show: {
        old: false,
        new: false,
        check: false
      },
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      ruleForm: {
        currentLoginPass: '',
        loginPass: '',
        checkPass: ''
      },
      rules: {
        currentLoginPass: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        loginPass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.geUserInfo()
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.currentLoginPass = md5(md5(this.ruleForm.currentLoginPass) + this.userInfo.loginPhone)
          this.ruleForm.loginPass = md5(md5(this.ruleForm.loginPass) + this.userInfo.loginPhone)
          this.ruleForm.checkPass = md5(md5(this.ruleForm.checkPass) + this.userInfo.loginPhone)
          this.$http.post(this.$api.security, this.ruleForm)
            .then(res => {
              console.log(res.data.data)
              this.$message.success('修改成功!')
              // 退出登录
            }).catch(() => { })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  components: {}
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
  margin-left: 20px;
  font-size: 14px;
  color: #f09007;
  line-height: 60px;
}
.el-form-item {
  margin-bottom: 20px;
  width: 380px;
  text-align: center;
}
.demo-ruleForm{
  margin-left: 20px;
}
.left-form{
  width: 60%;
}
.editor{
  margin-left: 30px;
  font-size: 12px;
  color: #707277;
}
</style>
