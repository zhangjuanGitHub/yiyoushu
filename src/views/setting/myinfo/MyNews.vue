<!--
 * @Author: MaiChao
 * @@Description:我的消息
 * @Date: 2021-02-26 15:25:21
 * @LastEditors: zhangjuan
 * @LastEditTime: 2021-05-28 11:51:26
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
     <div class="login-phone"
           v-if="userInfo.loginPhone">
        <p>手机绑定:<span class="user-num">{{userInfo.loginPhone}}</span></p>
      </div>
    </div>
    <div class="password-content">
      <div class="tabs-button">
        <span @click="tabsTrend('')"
              :class="isTrend===''?'isActive':''">全部</span>
        <span @click="tabsTrend(1)"
              :class="isTrend===1?'isActive':''">账号分析</span>
        <span @click="tabsTrend(2)"
              :class="isTrend===2?'isActive':''">分钟级监测</span>
        <span @click="tabsTrend(3)"
              :class="isTrend===3?'isActive':''">账号回溯</span>
      </div>
      <div class="table-box">
        <div style="margin:20px 0">
          <el-button @click="toggleSelection()"
                     :disabled="ids.length<=0"
                     size="small">标记已读</el-button>
        </div>
        <el-table :data="tableData"
                  style="width: 100%"
                  ref="multipleTable"
                  border
                  tooltip-effect="dark"
                  @selection-change="handleSelectionChange"
                  :cell-style="{ textAlign: 'center' }">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="messageTitle"
                           width="190"
                           label="消息标题">
          </el-table-column>
          <el-table-column prop="messageContent"
                           label="消息内容">
            <template slot-scope='scope'>
              <div class="cursor"
                   @click="routeOther(scope.row)">{{scope.row.messageContent}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="readStatus"
                           label="是否已读"
                           width="190">
            <template slot-scope='scope'>
              <div class="delete"
                   v-if="scope.row.readStatus===0">未读</div>
              <div class="export"
                   v-else>已读</div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime"
                           label="消息发送时间"
                           width="190">
          </el-table-column>
        </el-table>
      </div>
      <set-page @pagingChange="pagingChange"
                :total="total"
                ref="child"></set-page>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userInfo: {}, // 获取用户信息
      total: 0,
      isTrend: '',
      tableData: [],
      ids: [],
      params: {
        messageType: '',
        messageTitle: '',
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created () {
    this.geUserInfo()
    this.$route.query.type ? this.isTrend = this.$route.query.type : this.isTrend = ''
    this.getTableList()
  },
  methods: {
    // 获取 用户信息
    geUserInfo () {
      this.$http.get(this.$api.getUserInfo)
        .then(res => {
          this.userInfo = res.data.data
          if (this.userInfo.loginPhone) {
            this.active = 2
          } else {
            this.active = 0
            this.getCodes()
            this.getQRcode()
          }
        }).catch(() => { })
    },
    routeOther (row) { // 1:账号分析,2:分钟级监测,3:账号回溯
      if (row.messageType === 1) {
        this.openWeb(row, 'WxAnalysis')
      } else if (row.messageType === 2) {
        let type = row.extraParam && row.extraParam !== null ? 2 : 1
        this.openWeb(row, 'MinuteList', type)
      } else {
        this.openWeb(row, 'BackTrack')
      }
    },
    handleSelectionChange (val) {
      this.ids = []
      val.forEach(item => {
        this.ids.push(item.id)
      })
    },
    // 选中状态
    toggleSelection (rows) {
      let params = {
        ids: this.ids
      }
      this.$http.post(this.$api.batchRead, params)
        .then(res => {
          if (res.data.code === 200) {
            this.getTableList()
            if (rows) {
              rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row)
              })
            } else {
              this.$refs.multipleTable.clearSelection()
            }
          }
        }).catch(() => { })
    },
    // 分页
    pagingChange (query) {
      this.params.pageSize = query.size
      this.params.pageNum = query.page
      this.getTableList()
    },
    getTableList () {
      this.$http.post(this.$api.newsData, this.params)
        .then(res => {
          this.tableData = res.data.data.content
          this.total = res.data.data.totalElements
        }).catch(() => { })
    },
    // 已读
    openWeb (row, routerName, type) {
      this.$http.get(this.$api.messageRead, { params: { id: row.id } })
        .then(res => {
          if (row.messageType === 1) {
            this.$router.push({ name: routerName, query: { type: type, tab: 'list' } })
          } else if (row.messageType === 2) {
            this.$router.push({ name: routerName, query: { type: type } })
          } else {
            this.$router.push({ name: routerName })
          }
        }).catch(() => { })
    },
    // 切换展示区内容
    tabsTrend (tabs) {
      this.isTrend = tabs
      this.params.messageType = tabs
      this.params.pageNum = 1
      this.$refs.child.handleCurrentChange(1)
    }
  },
  computed: {
  }
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
.password-content {
  margin-top: 35px;
  width: 100%;
  border-top: 1px solid #f7f8fa;
  padding-top: 20px;
}
.tabs-button span {
  display: inline-block;
  font-size: 12px;
  border: 1px solid #e1e4e8;
  background-color: #fff;
  color: #333;
  padding: 9px 15px;
  cursor: pointer;
  /* font-weight: bold; */
}
.tabs-button span:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
.tabs-button span.isActive {
  border: 1px solid #4a8bfe;
  color: #fff;
  background-color: #4a8bfe;
}
</style>
