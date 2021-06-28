<!--
 * @Author: MaiChao
 * @Date: 2021-05-13 14:41:04
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-05-13 14:41:05
-->
<!--
 * @Author: MaiChao
 * @Date: 2021-05-13 10:02:56
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-05-13 14:40:28
-->

<template>
  <div class="case-container">
    <div class="coaching-case">
      <van-row class="case-box">
        <van-col class="case-content">
          <!-- <div class="case-name">
            <span>指导案例号</span>
          </div>
          <div class="case-title">sf</div>
          <div class="cese-time">sc </div> -->
          <van-search v-model="searchValue"
                      shape="round"
                      background="#4fc08d"
                      placeholder="请输入搜索关键词" class="searchInp"/>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoachingCases',
  components: {},
  data () {
    return {
      searchValue: '',
      userId: '',

      ruleForm: {
        pageNum: 1,
        pageSize: 20
      },
      caseList: []
    }
  },
  methods: {
    toCase (url) {
      window.open(url)
    },
    getCaseList () {
      this.$http.post(this.$api.getCase, this.ruleForm).then(res => {
        if (res.data.data.content.length > 0) {
          this.caseList = res.data.data.content
        }
      })
    }
  },
  mounted () { },
  created () {
    // this.userId = this.$route.query.id
    // this.$store.commit('user/userToken', this.$route.query.token)
    // this.getCaseList()
  }
}
</script>

<style scoped>
.case-container {
  width: 100%;
  height: 100%;
  font-family: PingFang SC;
  position: relative;
}
.coaching-case {
  width: 100%;
  height: 100%;
}
.case-box {
  width: 100%;
  height: 108px;
}
.case-content {
  width: 96%;
  height: 100%;
  border-bottom: 1px solid #f5f5f5;
  /* margin-left: 2%; */
  /* padding: 14px 0 16px 0; */
}
.searchInp{
  width: 100%;
}
.case-name {
  width: 100%;
  height: 17.5px;
}
.case-name span {
  font-size: 14px;
  color: #004564;
  font-weight: bold;
  float: left;
}
.case-name img {
  width: 12.5px;
  height: 12.5px;
  float: right;
}
.case-title {
  width: 100%;
  margin-top: 10px;
  font-size: 14px;
  color: #333333;
  line-height: 17.5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.cese-time {
  margin-top: 10px;
  font-size: 10px;
  color: #999999;
}
.header {
  width: 100%;
  height: 63.5px;
  background-color: rgba(0, 67, 100, 1);
  color: white;
  overflow: hidden;
  position: relative;
}
.header-back {
  display: inline-block;
  position: absolute;
  font-family: PingFang SC;
}
.header-back {
  left: 12px;
  bottom: 11px;
}
.header-back img {
  width: 12px;
  height: 12px;
}
.header-title {
  font-size: 16px;
  display: flex;
  justify-content: center;
  margin-top: 33.5px;
}
</style>
