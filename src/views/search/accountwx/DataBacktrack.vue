<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-29 14:22:59
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-04-08 16:39:00
-->
<template>
  <div class="search-material-wrap flex-cloumn-all">
    <p class="search-back-title">公众号数据回溯</p>
    <el-button v-if="false" type="primary" plain><i class="el-icon-plus"></i>添加公众号</el-button>
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
      <!-- <el-table-column label="删除"
                        width="100">
        <i class="el-icon-delete-solid"></i>
      </el-table-column> -->
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
    <el-dialog width="400px"
                center
                :visible.sync="dialogVisible"
                :close-on-click-modal='false'
                :modal-append-to-body="false">
      <div class="search-back-dialog flex-cloumn-all">
        <p class="search-dialog-title">您的请求已成功提交!</p>
        <p class="is-red">回溯1-50个公众号需要1个工作日，51-100个公众号需要2个工作日，依次类推</p>
        <p>查询完成后，我们会在首页公众号头像旁边展示回溯状态通知您，您可以在<span>个人中心-账号回溯</span>，进行查看导出和删除操作。</p>
      </div>
      <div slot="footer" class="dialog-footer add-account-tip">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'search',
  components: {},
  data () {
    return {
      backData: [],
      accountMsg: {},
      timeValue: [],
      dialogVisible: false
    }
  },
  methods: {
    submitDataTrack () {
      if (this.timeValue[0]) {
        let obj = {
          biz: this.accountMsg.biz,
          alias: this.accountMsg.alias,
          nickname: this.accountMsg.nickname,
          startDate: this.timeValue[0],
          endDate: this.timeValue[1]
        }
        this.$http.post(this.$api.submitTrack, obj)
          .then(res => {
            this.dialogVisible = true
          }).catch(() => {})
      } else {
        this.$message.warning('请选择要采集的时间段')
      }
    },
    getAccountMsg () {
      this.$http.get(`${this.$api.getWxAccount}/${this.accountId}`)
        .then(res => {
          this.accountMsg = res.data.data[0]
          this.backData.push({ name: this.accountMsg.nickname, wx: this.accountMsg.alias })
        }).catch(() => {})
    }
  },
  created () {
    this.accountId = this.$route.query.id
    this.getAccountMsg()
  }
}
</script>
<style lang="scss" scoped>
@import '../search.scss';
</style>
