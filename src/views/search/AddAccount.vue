<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-02-05 15:58:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-02 17:06:17
-->
<template>
  <div class="center-wraper">
    <div class="wraper">
      <div class="add-account-main">
        <div class="add-account-up">
          <p>添加公众号</p>
          <p>收录后即可被纳入微信日/周/月的检测样本</p>
        </div>
        <div class="add-account-down flex-bwt-center">
          <div class="add-down-left">
            <p class="add-down-tab">
              <span :class="{ 'is_active': isActive === 'link'}"
                    @click="changeActive('link')">推文链接</span>
              <span :class="{ 'is_active': isActive === 'name'}"
                    @click="changeActive('name')">账号名称</span>
            </p>
            <el-input class="add-down-input"
                      v-model="value"
                      placeholder="请输入待添加的公众号的微信推文链接"></el-input>
            <div>
              <el-button type="primary" @click="addAccount">添加</el-button>
              <el-button type="primary" @click="cancelAdd">取消</el-button>
            </div>
          </div>
          <div>
            <img src="@/assets/images/search/add.png" alt="">
          </div>
        </div>
      </div>
      <el-dialog width="465px"
                 center
                 :visible.sync="dialogVisible"
                 :modal-append-to-body="false">
        <div class="flex-cloumn-cen">
          <img src="@/assets/images/search/tip.png" alt="">
          <p class="add-account-p">提交成功后，我们会在
            <span>30</span>分钟以后返回该文章链接账号，请在
            <span>30</span>分钟以后再次搜索此文章链接。</p>
        </div>
      <div slot="footer" class="dialog-footer add-account-tip">
        <el-button type="primary">联系我们</el-button>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addAccount',
  components: {},
  data () {
    return {
      value: '',
      isActive: 'link',
      dialogVisible: false
    }
  },
  methods: {
    changeActive (tab) {
      this.isActive = tab
    },
    addAccount () {
      this.dialogVisible = true
    },
    cancelAdd () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.add-account-main {
  padding: 30px 50px;
}
.add-account-up p {
  text-align: center;
}
.add-account-up p:nth-child(1) {
  font-size: 32px;
  color: $tab-text-color;
}
.add-account-up p:nth-child(2) {
  color: $content-text-color;
}
.add-account-down {
  margin-top: 70px;
  padding: 0 40px 0 150px;
  .add-down-tab {
    span {
      margin-right: 30px;
      padding: 8px 0;
      font-size: $font-size-large;
      color: $tab-text-color;
      cursor: pointer;
      border-bottom: 3px solid $white-text-color;
    }
    .is_active {
      color: $hight-light-color;
      border-color: $hight-light-color;
    }
  }
  img {
    width: 400px;
    height: 335px;
  }
  .add-down-input {
    width: 465px;
    margin: 30px 0 60px;
  }
}
.add-account-tip .el-button,
.add-account-down .el-button {
  width: 112px;
}
.add-account-p {
  text-align: center;
  margin: 30px 25px 0;
  span {
    color: #ff0000;
  }
}
</style>
