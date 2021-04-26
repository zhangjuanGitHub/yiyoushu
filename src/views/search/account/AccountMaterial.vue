<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-29 14:17:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-04 17:42:02
-->
<template>
  <div class="search-material-wrap">
    <div class="search-material-up">
      <p class="search-mater-theme">资料</p>
      <div class="search-mater-des">
        <p>数据更新于
          <span>{{updateTime}}</span>
          <i class="el-icon-refresh cursor" @click="updateDataTime"></i></p>
        <div class="search-mater-time">
          <!-- <p>注册时间 <span>2019年07月17日</span></p> -->
          <p>主体类型 <span>{{accountMsg.auth_type}}</span></p>
        </div>
      </div>
    </div>
    <div class="search-slider"></div>
    <div class="search-material-down">
      <div class="search-material-up">
        <p class="search-mater-theme">同主体公众号</p>
      </div>
      <div class="search-mater-msg flex-bwt-center">
        <p><span class="mater-msg-big" v-html="accountTotal || 0"> </span> / 同主体公众号</p>
        <p class="mater-mag-account">账号主体
          <i class="el-icon-circle-check"></i>
          <span class="mater-msg-span">{{accountMsg.auth_info}}</span>
        </p>
      </div>
      <div>
        <el-table :data="mainData"
                  style="width: 100%">
          <el-table-column  label="同主体公众号"
                            width="200">
            <template slot-scope="scope">
              <div class="search-mater-table flex-all-center">
                <img :src="scope.row.ori_head_img" alt="">
                <p v-html="scope.row.nickname"></p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="alias"
                            label="微信号"
                            width="170">
          </el-table-column>
          <el-table-column prop="auth_type"
                            label="类别"
                            width="120">
          </el-table-column>
          <el-table-column prop="city"
                            label="地区"
                            width="130">
          </el-table-column>
          <el-table-column prop="introduction"
                            label="简介"
                            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
      <!-- <set-page @pagingChange="pagingChange"
                :total="accountTotal"></set-page> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { timeFormat, secondsFormat } from '@/lib/tools'
export default {
  name: 'account',
  components: {},
  data () {
    return {
      ruleForm: {
        pageSize: '',
        pageNum: ''
      },
      accountId: '',
      mainData: [],
      accountTotal: 0,
      updateTime: '',
      accountMsg: {}
    }
  },
  methods: {
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
      console.log(query)
    },
    getAccountMsg () {
      this.$http.get(`${this.$api.getWxAccount}/${this.accountId}`)
        .then(res => {
          this.accountMsg = res.data.data[0]
          this.getSameAccount()
        }).catch(() => {})
    },
    // 同主体账号
    getSameAccount () {
      this.$http.get(`${this.$api.getSameAccount}/${this.accountMsg.auth_info}`)
        .then(res => {
          this.accountTotal = res.data.data.shift().total
          this.mainData = res.data.data
        }).catch(() => {})
    },
    updateDataTime () {
      this.getCurrentTime()
      this.getSameAccount()
    },
    // 获取当前时间
    getCurrentTime () {
      const now = new Date()
      this.updateTime = timeFormat(now.getTime()) + ' ' + secondsFormat(now.getTime())
    }
  },
  mounted () {
    this.accountId = this.$route.query.id
    this.getAccountMsg()
    this.getCurrentTime()
  },
  computed: {}
}
</script>
<style lang="scss" scoped>
@import '../search.scss';
</style>
