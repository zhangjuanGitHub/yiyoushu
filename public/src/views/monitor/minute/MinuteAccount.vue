<!--
 * @Author: MaiChao
 * @@Description:账号预约监测
 * @Date: 2021-03-02 11:41:51
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-22 10:06:48
-->
<template>
  <div class="minute-account">
    <div class="tabs-header">
      账号预约监测
    </div>
    <div class="header-img">
      <img :src="require('@/assets/images/monitor/minute.png')"
           alt="">
    </div>
    <div class="minute-content">
      <div class="minute-title">账号预约监测</div>
      <div class="minute-introduce">可对公众号发文进行预约监控。提供分钟级的文章阅读数点赞数监测，掌握公众号文章阅读走向。</div>
      <div class="minute-from">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="90px"
                 :label-position="labelPosition"
                 class="link-ruleForm">
          <el-form-item label="账号/链接"
                        prop="keyword"
                        class="link-input">
            <el-input v-model="ruleForm.keyword"
                      placeholder="请输入微信账号名称或文章链接"></el-input>
            <el-button type="primary"
                       @click="queryLink('ruleForm')">查询</el-button>
          </el-form-item>
          <el-form-item label="发文公众号"
                        v-if="accountData.length!==0"
                        class="account-list">
            <div class="link-box flex-ali-center"
                 v-for="(item,index) in accountData"
                 :key="index">
              <span class="add-close cursor"
                    @click="addList(item)">选中</span>
              <div class="left-image">
                <img :src="item.ori_head_img"
                     alt="">
              </div>
              <div class="right-detail">
                <div class="right-top">
                  <span class="name">{{item.nickname}}</span>
                  <!-- <span class="send-time">日常发文时间:</span> -->
                  <span class="send-detail">{{item.auth_info}}</span>
                </div>
                <div class="right-bottom">
                  <p>{{item.introduction}}</p>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="选中公众号"
                        v-if="acticleList.length!==0"
                        class="account-list">
            <div class="link-box flex-ali-center"
                 v-for="(item,index) in acticleList"
                 :key="index">
              <div class="close el-icon-circle-close"
                   @click="deleteList(index)"></div>
              <div class="left-image">
                <img :src="item.ori_head_img"
                     alt="">
              </div>
              <div class="right-detail">
                <div class="right-top">
                  <span class="name">{{item.nickname}}</span>
                  <span class="send-detail">{{item.auth_info}}</span>
                </div>
                <div class="right-bottom">
                  <p>{{item.introduction}}</p>
                </div>
              </div>
            </div>
          </el-form-item>
          <!-- <div class="link-tips">*该公众号发文时段不规律，请手动设置预约监控时段</div> -->
          <el-form-item class="link-time">
            <div class="name notes">
              预约发文时间段
              <span>(若在预定发文时间段内无发文,本次监控也视为完成,但是无监控报告)</span>
            </div>
            <div class="link-line flex-ali-center">
              <el-date-picker class="date-box"
                              v-model="ruleForm.stardate"
                              type="date"
                              placeholder="选择日期"
                              size="small"
                              value-format="yyyy-MM-dd"
                              format="yyyy.MM.dd" @change="getHour">
              </el-date-picker>
              <el-time-picker class="time-box"
                              v-model="ruleForm.startime"
                              size="small"
                              value-format="HH:mm"
                              format="HH:mm" @change="getHour">
              </el-time-picker>
              <span style="marginRight:9px;">到</span>
              <el-date-picker class="date-box"
                              v-model="ruleForm.enddate"
                              type="date"
                              placeholder="选择日期"
                              size="small"
                              value-format="yyyy-MM-dd"
                              format="yyyy.MM.dd" @change="getHour">
              </el-date-picker>
              <el-time-picker class="time-box"
                              v-model="ruleForm.endtime"
                              size="small"
                              value-format="HH:mm"
                              format="HH:mm" @change="getHour">
              </el-time-picker>
              <span class="end-span" v-if="ruleForm.minuteRate">共计<i>{{ruleForm.minuteRate}}</i>个小时</span>
            </div>
          </el-form-item>
          <el-form-item prop="idx"
                        class="link-time">
            <div class="name">发文位置</div>
            <div class=" flex-ali-center">
              <el-radio-group v-model="ruleForm.idx">
                <el-radio :label="1">头条</el-radio>
                <el-radio :label="2">次条</el-radio>
                <el-radio :label="3">第三条</el-radio>
                <el-radio :label="4">第四条</el-radio>
                <el-radio :label="5">第五条</el-radio>
              </el-radio-group>
              <span class="click">自定义</span>
              <el-select v-model="ruleForm.idx"
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
          <el-form-item prop="dayCount"
                        class="link-time">
            <div class="name">监测时长</div>
            <div class="link-line">
              <el-radio-group v-model="ruleForm.dayCount">
                <el-radio :label="1">24小时</el-radio>
                <el-radio :label="2">48小时</el-radio>
                <el-radio :label="3">72小时</el-radio>
              </el-radio-group>
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
      echoId: '',
      http: false,
      accountData: [],
      acticleList: [],
      labelPosition: 'left',
      ruleForm: {
        idx: 1,
        keyword: '',
        dayCount: 1,
        // time: 1,
        startTime: '',
        endTime: '',
        stardate: '',
        startime: '08:00',
        enddate: '',
        endtime: '11:00',
        account: [],
        minuteRate: 0
      },
      rules: {
        keyword: [
          { required: true, message: '请输入发文账号/链接', trigger: 'blur' }
        ]
      },
      options: [{
        value: 1,
        label: '头条'
      }, {
        value: 2,
        label: '次条'
      }, {
        value: 3,
        label: '第三条'
      }, {
        value: 4,
        label: '第四条'
      }, {
        value: 5,
        label: '第五条'
      }, {
        value: 6,
        label: '第六条'
      }, {
        value: 7,
        label: '第七条'
      }, {
        value: 8,
        label: '第八条'
      }]
    }
  },
  created () {
    if (this.$route.query.id) {
      this.echoId = this.$route.query.id
      this.getAccount()
    }
  },
  methods: {
    // 获取回显数据
    getAccount () {
      this.$http.get(this.$api.getAccount, { params: { id: this.echoId } })
        .then(res => {
          if (res.data.code === 200) {
            let list = {
              ori_head_img: res.data.data.oriHeadImg,
              nickname: res.data.data.nickname,
              introduction: res.data.data.alias,
              biz: res.data.data.biz
            }
            this.acticleList.push(list)
            this.ruleForm.idx = parseInt(res.data.data.idx)
            this.ruleForm.dayCount = res.data.data.dayCount
            this.ruleForm.stardate = this.getDate(res.data.data.startTime)
            this.ruleForm.enddate = this.getDate(res.data.data.endTime)
            this.ruleForm.startime = this.getMinute(res.data.data.startTime)
            this.ruleForm.endtime = this.getMinute(res.data.data.endTime)
            this.getHour()
          }
        }).catch(() => { })
    },
    // 查询账号
    queryLink (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            keyword: this.ruleForm.keyword
          }
          this.accountData = []
          this.$http.post(this.$api.searchAccount, params)
            .then(res => {
              if (res.data.data.length > 0) {
                this.accountData.push(...res.data.data)
              } else {
                this.$message.warning('无该数据,请通过客服联系我们!')
              }
            }).catch(() => { })
        } else {
          return false
        }
      })
    },
    // 获取日期
    getDate (date) {
      var dd = new Date(date)
      var year = dd.getFullYear() + '-'
      var month = (dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1) + '-'
      var d = (dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate())
      return year + month + d
    },
    // 获取时分
    getMinute (date) {
      var dd = new Date(date)
      var hh = (dd.getHours() < 10 ? '0' + dd.getHours() : dd.getHours()) + ':'
      var mm = (dd.getMinutes() < 10 ? '0' + dd.getMinutes() : dd.getMinutes())
      return hh + mm
    },
    // 获取小时
    getHour () {
      this.ruleForm.startTime = this.ruleForm.stardate + ' ' + this.ruleForm.startime + ':00'
      this.ruleForm.endTime = this.ruleForm.enddate + ' ' + this.ruleForm.endtime + ':00'
      let date1 = new Date(this.ruleForm.startTime)
      let date2 = new Date(this.ruleForm.endTime)
      if (date2 - date1 > 0) {
        this.ruleForm.minuteRate = (date2 - date1) / 3600000
      } else {
        this.ruleForm.minuteRate = (date1 - date2) / 3600000
      }
    },
    // 开始监测
    startAngle (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.stardate && this.ruleForm.enddate && this.acticleList.length > 0) {
            this.ruleForm.account = this.acticleList
            this.$http.post(this.$api.saveAccount, this.ruleForm)
              .then(res => {
                if (res.data.code === 200) {
                  this.$message.success('操作成功!')
                  this.accountData = []
                  this.ruleForm.stardate = ''
                  this.ruleForm.enddate = ''
                  this.acticleList = []
                  this.$refs[formName].resetFields()
                  this.$router.push({ 'name': 'MinuteList' })
                }
              }).catch(() => { })
          } else {
            this.$message.warning('请正确填写表单!')
          }
        } else {
          return false
        }
      })
    },
    // 选中
    addList (item) {
      let params = {
        biz: item.biz
      }
      this.$http.post(this.$api.checkSubscribe, params)
        .then(res => {
          if (res.data.code === 200) {
            this.acticleList.push(item)
          }
        })
        .catch(() => { })
      // this.acticleList.push(item)
    },
    // 删除
    deleteList (index) {
      this.acticleList.splice(index, 1)
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
  /* margin-left: 80px; */
  background-color: #f7f8fa;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 35px;
  position: relative;
}
.link-box:last-of-type {
  margin-bottom: 0px;
}
.add-close {
  position: absolute;
  top: 0px;
  right: 18px;
  cursor: pointer;
  text-decoration: underline;
  color: #3b82fe;
}
.close {
  position: absolute;
  top: 18px;
  right: 18px;
  cursor: pointer;
  background-color: #fff;
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
  color: #3b82fe;
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
.notes {
  margin-bottom: 13px;
}
.notes span {
  font-size: 14px;
  color: #adaeb2;
}
.date-box {
  width: 107px;
  margin-right: 9px;
}
.time-box {
  width: 66px;
  margin-right: 9px;
}
.end-span {
  font-size: 12px;
}
.end-span i {
  font-style: normal;
  color: red;
}
</style>
