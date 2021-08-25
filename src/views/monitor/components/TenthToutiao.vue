<!--
 * @Author: MaiChao
 * @Date: 2021-02-23 15:01:05
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-07-22 16:51:36
-->
<template>
  <div class="">
    <div class="pie-left">
      <div class="title">头条内容分析</div>
      <div id="article-word">
        <el-table :data="tableData"
                    style="width: 100%"
                    :cell-style="{ textAlign: 'center' }"
                    :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column label="排名"
                             width="80">
              <template slot-scope='scope'>
                <div>
                  {{scope.$index+1}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="status_title"
                             label="头条内容" show-overflow-tooltip>
              <template slot-scope='scope'>
                <div class="cursor click-sapn"
                     @click="openUrl(scope.row.url)">
                  {{scope.row.status_title}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="attitudes_count"
                             label="点赞量" width="100">
              <template slot-scope='scope'>
                <div class="cursor">
                  {{scope.row.attitudes_count}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="reposts_count"
                             label="转发量" width="100">
            </el-table-column>
            <el-table-column prop="comments_count"
                             label="评论量" width="100">
            </el-table-column>
          </el-table>
          <div class="pagination-wrap flex-all-center">
        </div>
      </div>
    </div>
    <!-- <div class="pie-right">
      <div class="title">微博类型占比</div>
      <div id="article-type2"
           class="article-type2"></div>
      <div class="table">
        <table cellspacing="0"
               aligin="center">
          <tr>
            <th>图片</th>
            <th>视频</th>
            <th>文章</th>
          </tr>
          <tr>
            <td><span class="yc">{{this.table2.pic}}</span>篇</td>
            <td><span class="zf">{{this.table2.video}}</span>篇</td>
            <td><span class="wz">{{this.table2.article}}</span>篇</td>
          </tr>
          <tr>
            <td v-text="GetPercent(this.table2.pic)"></td>
            <td v-text="GetPercent(this.table2.video)"></td>
            <td v-text="GetPercent(this.table2.article)"></td>
          </tr>
        </table>
      </div>
    </div> -->
  </div>
</template>
<script>
let echarts = require('echarts/lib/echarts')
export default {
  props: ['tableData', 'userData'],
  data () {
    return {
      isOrigin: '',
      dataNum: [],
      dataType: [],
      fourData: [],
      tenData: [],
      jsonObj: {
        isCommon: true
      },
      table2: [],
      total: 0
    }
  },
  methods: {
    // 跳转原文
    jumpOriginal (params) {
      window.open(params, '_blank')
    },
    tabsClick (id) {
      this.isOrigin = id
      this.$emit('fatherMethod', id)
    },
    // pagingChange (query) {
    //   this.ruleForm.pageSize = query.size
    //   this.ruleForm.pageNum = query.page
    //   this.getListData()
    // },
    // 获取数据
    getArticleData (data) {
      // console.log(data)
      let jsonObj = JSON.parse(data)
      this.table2 = jsonObj
      let myChart = echarts.init(document.getElementById('article-type2'))
      var datas = []

      for (var i in jsonObj) {
        // console.log(i, jsonObj[i])
        // var value = ''
        if (i == 'pic') {
          datas.push({ value: jsonObj[i], name: '图片' })
        } else if (i == 'video') {
          datas.push({ value: jsonObj[i], name: '视频' })
        } else {
          datas.push({ value: jsonObj[i], name: '文章' })
        }
      }
      // console.log(datas)
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          // top: '5%',
          orient: 'vertical',
          right: '5%',
          top: '5%'
        },
        color: ['#fac858', '#73c0de', '#ee6666'],
        series: [
          {
            name: '微博内容占比',
            type: 'pie',
            radius: ['40%', '70%'],
            labelLine: {
              show: true, // 控制线条显示
              length: 20,
              length2: 70,
              lineStyle: {
                width: 1,
                // color: '#333',
                type: 'solid'
              }
            },
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20'
                // fontWeight: 'bold'
              }
            },
            data: datas
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    GetPercent (n) {
      var total = Number(this.table2.pic) + Number(this.table2.video) + Number(this.table2.article)// 总数
      var num = n
      total = parseFloat(total)
      num = parseFloat(num)
      if (isNaN(total) || isNaN(num)) {
        return '-'
      }
      return total <= 0 ? '0%' : (Math.round(num / total * 10000) / 100.00) + '%'
    },
    // 打开全文链接
    openUrl (url) {
      window.open(url, '_black')
    }
  },
  // 注销window.onresize事件
  destroyed () {
    window.onresize = null
  }

}
</script>
<style scoped>
.pie-left {
  /* width: 770px; */
  /* height: 400px; */
}
.pie-right {
  width: 550px;
  height: 400px;
}
#article-tabs {
  width: 1300px;
  min-height: 333px;
  box-sizing: border-box;
  position: relative;
}
/* #article-tabs, */
#article-word {
  /* width: 750px; */
  width: 655px;
  min-height: 333px;
  box-sizing: border-box;
  position: relative;
}
.title {
  font-size: 18px;
  color: #151c29;
}
.title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 20px;
  background-color: #2196f3;
  vertical-align: middle;
  margin-top: -4px;
  margin-right: 10px;
}
#article-word {
  /* padding: 30px 20px; */
}
.el-button {
  border-radius: 0;
  margin: 0vmin;
}
.table-box {
  margin-top: 20px;
}
.isActive {
  color: #2196f3;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
.pie-left,
.pie-right {
  width: 685px;
  height: 400px;
}
#fourPie,
#tenPie {
  width: 685px;
  height: 400px;
  position: relative;
}
.title {
  font-size: 18px;
  color: #151c29;
}
.title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 20px;
  background-color: #2196f3;
  vertical-align: middle;
  margin-top: -4px;
  margin-right: 10px;
}
#article-type2 {
  width: 80%;
  height: 160px;
  position: relative;
}

.table {
  width: 80%;
  /* text-align: center; */
  /* margin: 0 auto; */
}
table {
  border: 1px solid black;
  width: 440px;
  height: 140px;
  margin: 0 auto;
  margin-top:25px
}
th {
  border: 1px solid black;
  /* text-align: center; */
}
td {
  border: 1px solid black;
  text-align: center;
}
.yc {
  font-size: 18px;
  margin-right: 5px;
  color: #73c0de;
}
.zf {
  color: #fac858;
  font-size: 18px;
  margin-right: 5px;
}
.wz{
  color:#ee6666;
  font-size: 18px;
  margin-right: 5px;
}
</style>
