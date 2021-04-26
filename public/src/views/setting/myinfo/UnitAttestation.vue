<!--
 * @Author: MaiChao
 * @@Description:单位认证
 * @Date: 2021-02-26 15:25:21
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-21 14:41:56
-->
<template>
  <div class="password">
    <div class="accound-detail flex-ali-center">
      <el-image style="width: 70px; height: 70px"
                :src="this.userInfo.headPicture"
                fit="cover"></el-image>
      <div class="user-detail">
        <p> <span class="user-name">{{userInfo.nickName}}</span><span class="member">免费会员</span></p>
        <p class="user-id">账号ID:<span class="user-num">{{userInfo.wechatUserId}}</span></p>
      </div>
      <div class="login-phone" >
        <p v-if="userInfo.loginPhone">手机绑定:<span class="user-num">{{userInfo.loginPhone}}</span></p>
        <p  v-if="userInfo.departmentName">认证单位:<span class="user-num">{{userInfo.departmentName}}</span></p>
      </div>
    </div>
    <div class="click-box">
      <span class="cursor primary click-sapn" v-if="userInfo.departmentName" @click="reviseAttest">修改绑定单位</span>
    </div>
    <div class="password-content flex-ali-center">
      <!-- 单位认证表单 -->
      <div class="left-form" v-if="userInfo.loginPhone && userInfo.departmentVerify===0">
        <div class="title">单位认证</div>
        <span class="explain"></span>
        <div class="from-box">
          <el-form :model="ruleForm"
                   :rules="rules"
                   ref="ruleForm"
                   class="demo-ruleForm"
                   label-width="100px">
            <el-form-item label="您的姓名"
                          prop="name">
              <el-input v-model="ruleForm.name"
                        placeholder='请输入您的姓名'></el-input>
            </el-form-item>
            <el-form-item label="您的手机"
                          prop="phone">
              <el-input v-model="ruleForm.phone"
                        placeholder="请输入您的手机"></el-input>
            </el-form-item>
            <el-form-item label="公司名称"
                          prop="departmentName">
              <el-input v-model="ruleForm.departmentName"
                        placeholder="请输入公司名称"></el-input>
            </el-form-item>
            <el-form-item label="所在行业"
                          prop="industry">
              <el-input v-model="ruleForm.industry"
                        placeholder="请输入所在行业"></el-input>
            </el-form-item>
            <el-form-item label="您的职务"
                          prop="jobPosition">
              <el-input v-model="ruleForm.jobPosition"
                        placeholder="请输入您的职务"></el-input>
            </el-form-item>
            <el-form-item label="您的需求"
                          prop="verifyDesc">
              <el-input v-model="ruleForm.verifyDesc"
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 6}"
                        placeholder="请输入您的需求"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="submitForm('ruleForm')">确认提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 认证中 -->
      <div class="left-form"
           v-else-if="userInfo.departmentVerify===1">
        <div class="note-box">
          <div class="el-icon-success"></div>
          <p class="left-title">单位认证</p>
          <div class="left-content">
            <p class="left-title"><span class="delete">认证中</span></p>
          </div>
        </div>
      </div>
      <!-- 认证通过 -->
      <div class="left-form"
           v-else-if="userInfo.departmentVerify===2">
        <div class="note-box">
          <div class="el-icon-success"></div>
          <p class="left-title">恭喜</p>
          <div class="left-content">
            <p class="left-title">单位认证成功</p>
          </div>
        </div>
      </div>
      <!-- 认证未通过 -->
      <div class="left-form"
           v-else-if="userInfo.departmentVerify===-1">
        <div class="note-box">
          <div class="el-icon-success"></div>
          <p class="left-title">很遗憾</p>
          <div class="left-content">
            <p class="left-title">单位认证失败</p>
            <p><span class="delete cursor" @click="attestation=false">认证失败原因:请填写真实内容</span></p>
          </div>
        </div>
      </div>
      <!-- 未绑定手机 -->
      <div class="left-form"
           v-else-if="!userInfo.loginPhone">
        <div class="note-box">
          <div class="el-icon-warning"></div>
          <p class="left-title">您还未绑定手机号码,不能进行单位认证</p>
          <div class="left-content">
            <p>您现在可以到跟人中心我的资料中<span class="cursor delete"
                    @click="openPhone">手机号绑定</span>页面绑定手机号码</p>
          </div>
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
export default {
  data () {
    var validatorPhone = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入您的手机'))
      } else if (!/^1\d{10}$/.test(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    return {
      attestation: false, // 是否进行认证
      passAttest: false, // 是否通过认证
      userInfo: {},
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      ruleForm: {
        name: '',
        phone: '',
        departmentName: '',
        industry: '',
        jobPosition: '',
        verifyDesc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: validatorPhone, trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.geUserInfo()
  },
  methods: {
    // 获取 用户信息
    geUserInfo () {
      this.$http.get(this.$api.getUserInfo)
        .then(res => {
          this.userInfo = res.data.data
        }).catch(() => { })
    },
    // 提交认证
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post(this.$api.company, this.ruleForm)
            .then(res => {
              this.$message.success('提交成功,请等待审批!')
              this.userInfo.departmentVerify = 1
              this.$refs[formName].resetFields()
            }).catch(() => { })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    openPhone () {
      this.$router.push({ name: 'Phone' })
    },
    // 修改认证
    reviseAttest () {
      this.userInfo.departmentName = ''
      this.userInfo.departmentVerify = 0
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
  /* line-height: 60px; */
}
.el-form-item {
  margin-bottom: 20px;
  width: 500px;
  text-align: center;
}
.demo-ruleForm {
  margin-left: 20px;
}
.left-form {
  width: 60%;
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
  font-size: 22px;
  margin-right:0px
}
.tip-box .left-title {
  text-align: center;
  padding: 0 30px;
}
.left-content {
  margin-top: 30px;
  font-size: 16px;
  padding: 0 50px;
  color: #adadad;
}
.left-content p {
  width: 325px;
  font-size: 16px;
  text-align: center;
  line-height: 32px;
}
.el-icon-warning {
  font-size: 70px;
  color: rgb(255, 81, 81);
  display: block;
  text-align: center;
  line-height: 80px;
}
.password .el-icon-success {
  font-size: 70px;
  color: rgb(81, 255, 148);
  display: block;
  text-align: center;
  line-height: 140px;
}
</style>
