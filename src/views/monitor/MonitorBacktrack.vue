<template>
  <div class="account">
    <div class="flex-just-center account-show">
      <div class="menu-warp">
        <v-menu></v-menu>
      </div>
      <div class="account-company-warp">
        <div class="search-material-wrap flex-cloumn-all">
          <p class="search-back-title">公众号数据回溯</p>
          <el-button type="primary" plain><i class="el-icon-plus"></i>添加公众号</el-button>
          <div class="search-back-tip">
            <div class="search-tip-box">
                <p>1、公众号回溯会以最新的阅读数和在看数为准，每次最多添加50个公众号</p>
                <p>2、每1-50个公众号需要1个工作日，51-100个公众号需要2个工作日，依次顺延</p>
                <!-- <p>3、单个公众号回溯最低30清贝起步，超过30天，每增加1天加收1清贝</p> -->
                <p>3、公众号回溯完成后，会有站内信通知，请在<span>个人中心-导出记录</span>里查看</p>
                <p>4、回溯的账号数据仅供下载，不会同步到指数数据库，请见谅</p>
                <p class="is-red">5、公众号回溯满90天享受8折优惠，满180天享受6折优惠</p>
                <p>6、回溯导出的传播力指数数据，是回溯所选时间段内的一个总值，不是分段数据。</p>
            </div>
          </div>
          <el-table :data="backData"
                  style="width: 800px; border: 1px solid #dddddd">
          <el-table-column label="公众号名称"
                              prop="name"
                              show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="微信号"
                              prop="wx"
                              width="440">
          </el-table-column>
          <el-table-column label="删除"
                              width="100">
              <i class="el-icon-delete-solid"></i>
          </el-table-column>
          </el-table>
          <p class="search-back-pp">请选择要采集的时间段</p>
          <el-date-picker v-model="timeValue"
                          type="daterange"
                          size="small"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
          <!-- <p class="search-back-pp">本次采集时长为<span>1</span>天，需消耗<span>30.0</span>豆</p> -->
          <el-button type="primary"
                  class="search-back-btns"
                  @click="submitDataTrack">开始回溯</el-button>
          <el-dialog width="410px"
                      center
                      :visible.sync="dialogVisible"
                      :modal-append-to-body="false">
          <div class="search-back-dialog flex-cloumn-all">
              <p class="search-dialog-title">您的请求已成功提交!</p>
              <p class="is-red">回溯1-50个公众号需要1个工作日，51-100个公众号需要2个工作日，依次类推</p>
              <p>查询完成后，我们会在首页公众号头像旁边展示回溯状态通知您，您可以在
                <span @click="$router.push({ name: 'BackTrack' })" class="cursor">【个人中心-账号回溯】</span>，进行查看导出和删除操作。</p>
          </div>
          <div slot="footer" class="dialog-footer add-account-tip">
              <el-button @click="cancel" type="success">知道了</el-button>
          </div>
          </el-dialog>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import vMenu from '@/views/monitor/components/Menu'
export default {
  data () {
    return {
      dialogVisible: false,
      timeValue: [],
      backData: []
    }
  },
  methods: {
    submitDataTrack () {
      // let obj = {
      //   biz: this.accountMsg.biz,
      //   alias: this.accountMsg.alias,
      //   nickname: this.accountMsg.nickname,
      //   startDate: this.timeValue[0],
      //   endDate: this.timeValue[1]
      // }
      // this.$http.post(this.$api.submitTrack, obj)
      //   .then(res => {
      //     this.dialogVisible = true
      //   })
      this.dialogVisible = true
    },
    cancel () {
      this.dialogVisible = false
      this.timeValue = []
      this.backData = []
    }
  },
  components: {
    vMenu
  }
}
</script>
<style scoped>
.account-show {
  width: 1400px;
  margin: 0 auto;
  margin-bottom: 70px;
}
.account-company-warp {
  margin-left: 50px;
  width: 100%;
  margin-top: 20px;
  background: #ffffff;
  border: 1px solid #cccccc;
}
.menu-warp{
  width: 15%;
}
.search-material-wrap {
  padding: 20px;
}
/* 数据回溯 */
.search-back-title {
  font-size: 30px;
  margin: 20px 0;
  color: #151C29;
}
.is-red, .search-back-pp span {
  color: #ff0000 !important;
}
.search-back-tip {
  width: 670px;
  margin: 30px 0;
  background: #F2F2F2;
}
.search-tip-box {
  margin: 20px;
  background: #182538;
}
.search-tip-box p {
  color: #54657C;
  line-height: 30px;
  text-indent: 14px;
}
.search-tip-box p span {
  color: #226EA2;
  cursor: pointer;
}
.search-back-pp {
  margin: 20px 0;
  color: #151C29;
}
.search-back-btns {
  margin: 20px 0 70px;
  width: 225px;
  height: 50px;
  font-size: 16px;
}
.search-back-dialog {
  margin: 0 20px;
}
.search-dialog-title {
  color: #151C29;
  font-size: 18px;
}
.search-back-dialog p {
  text-align: center;
}
.search-back-dialog p span {
  color: #226EA2;
  cursor: pointer;
}
.search-back-dialog .is-red {
  margin: 20px 0;
}
</style>