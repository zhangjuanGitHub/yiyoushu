
<template>
  <div class="interaction content-box">
    <div class="tabs-header">
      <span class="tabs-title"
            :class="activeTab==='wx'?'isActive':''"
            @click="tabsAll('wx', 1)">微信</span>
      <span class="tabs-title"
            :class="activeTab==='wb'?'isActive':''"
            @click="tabsAll('wb', 2)">微博</span>
      <span class="tabs-title"
            :class="activeTab==='toutiao'?'isActive':''"
            @click="tabsAll('toutiao', 3)">今日头条</span>
      <!-- <span class="tabs-title"
            :class="activeTab==='douyin'?'isActive':''"
            @click="tabsAll('douyin', 4)">抖音</span> -->
    </div>
    <div class="pub-monitor-main">
      <prescription-wx v-if="this.activeTab==='wx'"
                       @changeTab="tabsAll"></prescription-wx>
      <prescription-wb v-if="this.activeTab==='wb'"
                       @changeTab="tabsAll"></prescription-wb>
      <prescription-toutiao v-if="this.activeTab==='toutiao'"
                            @changeTab="tabsAll"></prescription-toutiao>
      <!-- <prescription-douyin v-if="this.activeTab==='douyin'"
                            @changeTab="tabsAll"></prescription-douyin> -->
    </div>
  </div>
</template>
<script>
import prescriptionWx from './PrescriptionWx'
import prescriptionWb from './PrescriptionWb'
import prescriptionToutiao from './PrescriptionToutiao'
// import prescriptionDouyin from './PrescriptionDouyin'
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
// import { exportTable, timeFormat } from '@/lib/tools'
export default {
  components: {
    prescriptionWx,
    prescriptionWb,
    prescriptionToutiao
    // prescriptionDouyin
  },
  data () {
    return {
      activeTab: 'wx'
    }
  },
  computed: {
    computedNum () {
      return function (params) {
        let value
        switch (params) {
          case -1:
            value = '长时间未更新'
            break
          case 0:
            value = '今天更新'
            break
          case 1:
            value = '昨天更新'
            break
          case 2:
            value = '前天更新'
            break
          default:
            value = params + '天未更新'
            break
        }
        return value
      }
    },
    getPercentage () {
      return function (day) {
        day = day == 7 ? 6 : day
        let calc = Number(Math.abs(((1 - (day / 7)) * 100).toFixed(0)))
        let value
        if (calc >= 100) {
          value = 100
        } else {
          value = calc
        }
        return value
      }
    },
    getPerColor () {
      return function (day) {
        let value
        if (day === -1) {
          value = '#F56C6C'
        } else if (day < 3) {
          value = '#67C23A'
        } else if (day < 6) {
          value = '#E6A23C'
        } else {
          value = '#F56C6C'
        }
        return value
        // Number(scope.row.dayNum) < 3 ? '#67C23A' : (Number(scope.row.dayNum) < 6 ? '#E6A23C' : '#F56C6C')
      }
    }
  },
  methods: {
    tabsAll (name, level) {
      // console.log(name)
      // this.activeTab = name
      // if (this.activeTab === 'wb') {
      //   this.$router.push({ name: 'PrescriptionWb' })
      // }

      this.$router.replace({ name: 'Prescription', query: { tab: name } })
      this.activeTab = name
    }
  },
  created () {
    // this.getCurrentTime()
    // this.getAccountList()

    if (this.$route.query.tab) {
      this.activeTab = this.$route.query.tab
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../monitor.css';
.pub-monitor-main {
  margin: 20px;
}
.rearl-search-import p {
  color: #3b82fe;
  margin-left: 5px;
}
.pub-monitor-search {
  margin-bottom: 20px;
}
.pub-monitor-search .el-range-editor--small.el-input__inner {
  width: 230px;
}
.pub-account-msg {
  display: flex;
  color: #252934;
}
.pub-account-msg img {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-right: 6px;
}
.pub-account-right > p {
  text-align: left;
}
.pub-account-msg .pub-account-detail {
  color: #6c6d6e;
}
.p-splider {
  margin: 0 10px;
}
.account-msg-box img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin-right: 5px;
}
.account-msg p {
  text-align: left;
}
.account-msg p:nth-child(1) {
  color: #252934;
}
.account-msg p:nth-child(2) {
  color: #6c6d6e;
}
.account-pro-box .el-progress-bar {
  padding-right: 0;
}
.interaction-table .el-table .cell {
  padding-left: 0;
}
</style>
