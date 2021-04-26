<!--
 * @Author: MaiChao
 * @@Description: 监测列表
 * @Date: 2021-03-02 14:09:45
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-12 14:17:26
-->
<template>
  <div class="minute-list">
    <div class="tabs-header">
      监测列表
    </div>
    <div class="list-seath">
      <el-form :inline="true"
               :model="formInline"
               class="demo-form-inline">
        <el-form-item label="监控类型"
                      prop="type">
          <el-select v-model="formInline.type"
                     placeholder="监控类型"
                     size="small">
            <el-option label="类型一"
                       value="shanghai"></el-option>
            <el-option label="类型二"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章筛选"
                      prop="article">
          <el-select v-model="formInline.article"
                     placeholder="文章筛选"
                     size="small">
            <el-option label="文章一"
                       value="shanghai"></el-option>
            <el-option label="文章二"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="number">
          <span>共有<i>4</i>个监控历史</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('formInline')"
                     size="small">查询</el-button>
          <el-button @click="resetForm('formInline')"
                     size="small">重置</el-button>
          <el-button type="success"
                     @click="exportItem()"
                     size="small">批量导出</el-button>
          <el-button type="danger"
                     @click="deleteItem()"
                     size="small">批量删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list-box flex-ali-center">
      <div class="revise">
        <div class="icon-box flex-ali-center">
          <div class="el-icon-collection-tag cursor"></div>
          <div class="status">监控中</div>
          <div class="el-icon-delete cursor" @click="deleteShow()"></div>
        </div>
        <div class="revise-top flex-ali-center">
          <div class="left-image">
            <img :src="require('@/assets/images/home/ava.png')"
                 alt="">
          </div>
          <div class="right-detail">
            <div class="right-top">
              <span class="name">京检在线</span>
            </div>
            <div class="right-bottom">
              <p>
                <span class="qudao">次条</span>
                文章标题名称文章标题名称文章标题名称
              </p>
            </div>
          </div>
        </div>
        <div class="revise-bottom">
          <el-button type="primary"
                     @click="openDetail()">查看阅读数详情</el-button>
          <div class="flex-arr-center">
            <div class="time">01月11日12:88</div>
            <div class="read">阅读数:<span>326</span></div>
            <div class="look">在看数:<span>326</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formInline: {
        type: '',
        article: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    openDetail () {
      this.$router.push({ name: 'ListDetail' })
    },
    deleteShow () {},
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.list-seath {
  padding: 10px 20px;
}
.number i {
  font-style: normal;
  color: red;
}
.left-image img {
  width: 70px;
  height: 70px;
  margin-right: 10px;
}
.right-detail .right-top {
  color: #252934;
  font-size: 14px;
  line-height: 30px;
}
.right-top .name {
  font-size: 16px;
  line-height: 30px;
  margin-top: -5px;
}
.right-top .send-detail {
  color: #ffc154;
}.right-bottom {
  font-size: 14px;
  color: #707277;
  line-height: 30px;
  max-width: 85%;
}
.list-box{
  padding: 20px;
}
.revise{
  width: 30%;
  padding: 25px;
  background-color: #e9e9e9;
  position: relative;
}
.revise-top{
  border-bottom: 1px solid #707277;
  margin-bottom: 10px;
}
.revise-bottom .el-button{
  display: block;
  margin: 20px auto;
}
.revise-bottom .flex-arr-center{
  color: #707277;
  font-size: 14px;
}
.icon-box{
  position: absolute;
  top: 20px;
  right: 20px;
}
.icon-box div{
  margin-right:10px;
}
.status{
  background-color: rgb(36, 252, 180);
  color: #fff;
  border-radius: 8px;
  padding: 0 8px;
}
.qudao{
  background-color: rgb(36, 252, 180);
  color: #fff;
  padding: 2px 5px;
}
</style>
