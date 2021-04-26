<!--
 * @Author: MaiChao
 * @@Description:单位认证
 * @Date: 2021-02-26 15:25:21
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-10 18:52:17
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
            <el-form-item label="您的电话"
                          prop="phone">
              <el-input v-model="ruleForm.phone"
                        placeholder="请输入您的电话"></el-input>
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
              <el-button @click="resetForm('ruleForm')">取消</el-button>
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
export default {
  data () {
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
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post(this.$api.company, this.ruleForm)
            .then(res => {
              this.$message.success('提交成功,请等待审批!')
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
</style>
