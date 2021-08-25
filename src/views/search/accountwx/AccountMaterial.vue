<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-29 14:17:11
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-07-29 17:03:51
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
          <p>主体类型 <span>{{getChinese(accountMsg.auth_type)}}</span></p>
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
              <div class="search-mater-table flex-ali-center cursor"
                   @click="reToCurrent(scope.row.biz)">
                <img :src="scope.row.ori_head_img" alt="">
                <p v-html="scope.row.nickname" style="text-align: left"></p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="alias"
                            label="微信号"
                            width="200">
          </el-table-column>
          <el-table-column prop="auth_type"
                            label="类别"
                            width="120">
            <template slot-scope="scope">
              <p>{{getChinese(scope.row.auth_type)}}</p>
            </template>
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
      updateTime: ''
    }
  },
  computed: {
    ...mapState({
      accountMsg: state => state.mutations.accountMsg
    }),
    getChinese () {
      return function (params) {
        let value
        switch (params) {
          case 'government':
            value = '政府'
            break
          case 'company':
            value = '公司'
            break
          case 'media':
            value = '媒体'
            break
          case 'person':
            value = '个人'
            break
          case 'institution':
            value = '大学'
            break
          case 'others':
            value = '其他'
            break
          case 'person_business':
            value = '个体工商户'
            break
          default:
            value = params
            break
        }
        return value
      }
    }
  },
  methods: {
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
      console.log(query)
    },
    // 同主体账号
    getSameAccount () {
      // console.log(this.accountMsg.auth_info)
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
    },
    reToCurrent (id) {
      // console.log(id)
      this.$router.push({ name: 'AccountMaterial', query: { id: id } })
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.query.id !== from.query.id) {
        this.accountId = to.query.id
        this.$emit('refreRoute', to.query.id)
        // this.getSameAccount()
      }
    }
  },
  created () {
    this.accountId = this.$route.query.id
    this.getSameAccount()
    this.getCurrentTime()
  }
}
</script>
<style lang="scss" scoped>
@import '../search.scss';
</style>
