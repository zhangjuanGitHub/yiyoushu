<!--
 * @Author: MaiChao
 * @Date: 2021-02-04 09:41:36
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-12 14:50:30
-->
<template>
<!-- 页面中所有timeRange改为publishTime 04/12 -->
  <div class="content-search flex-bwt-center">
    <div>
      <el-form :inline="true"
               ref="ruleForm"
               :model="ruleForm">
        <el-form-item class="publishTime"
                      label="时间"
                      prop="publishTime">
          <el-select v-model="ruleForm.publishTime"
                     size="small"
                     @change="changeValue"
                     placeholder="请选择">
            <el-option label="一月内"
                       value="1"></el-option>
            <el-option label="半年内"
                       value="2"></el-option>
            <el-option label="一年内"
                       value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="keyword"
                      label="关键字">
          <el-input size="small"
                    v-model="ruleForm.keyword"
                    placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small"
                     @click="searchList"
                     type="primary">查询</el-button>
          <el-button size="small"
                     @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="showImport"
         @click="exportExcel"
         class="flex-ali-center rearl-search-import cursor">
      <img src="@/assets/images/monitor/import.png" alt="">
      <p>导出</p>
    </div>
  </div>
</template>

<script>
import { timeFormat } from '@/lib/tools'
export default {
  name: 'ContentSearch',
  props: [ 'showImport' ],
  data () {
    return {
      ruleForm: {
        publishTime: '1',
        keyword: '',
        time: []
      }
    }
  },
  methods: {
    searchList () {
      this.$emit('getSearchList', this.ruleForm)
    },
    getCalc (days) {
      const now = new Date()
      now.setTime(now.getTime() - 3600 * 1000 * 24 * days)
      return now
    },
    changeValue (val) {
      let end = this.getCalc(1)
      let start = ''
      if (val === '3') {
        start = this.getCalc(365)
      } else if (val === '2') {
        start = this.getCalc(180)
      } else {
        start = this.getCalc(30)
      }
      this.ruleForm.time[0] = timeFormat(start)
      this.ruleForm.time[1] = timeFormat(end)
    },
    resetForm (ruleForm) {
      this.ruleForm.publishTime = '1'
      this.ruleForm.keyword = ''
      this.changeValue('1')
      this.$emit('getSearchList', this.ruleForm)
    },
    exportExcel () {
      this.$emit('exportExcel')
    }
  },
  created () {
  }
}
</script>
<style scoped>
.content-search {
  width: 100%;
}
.rearl-search-import p {
  color: #3B82FE;
  margin-left: 5px;
}
</style>
