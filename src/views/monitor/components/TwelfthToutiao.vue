<!--
 * @Author: MaiChao
 * @Date: 2021-02-23 15:01:05
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-05-28 15:30:29
-->
<template>
  <div class="twins">
    <!-- <div class="bar-top" v-show="this.jsonObj.isCommon">
      <div class="title">文章类别分析</div>
      <div id="article-tabs"></div>
    </div> -->
    <!-- <div class="flex-bwt-center"
         v-show="!this.jsonObj.isCommon">
      <div class="pie-left">
        <div class="title">四大检察十大业务</div>
        <div id="fourPie"></div>
      </div>
      <div class="pie-right">
        <div id="tenPie"></div>
      </div>
    </div> -->
    <div class="table-bottm">
      <div class="title">发文热词</div>
      <div id="article-word4">
        <!-- <div class="table-tabs flex-ali-center">
          <el-button :class="isOrigin==='attitudes_count'?'isActive':''"
                     size="small"
                     @click="tabsClick('attitudes_count')">点赞最高</el-button>
          <el-button :class="isOrigin==='comments_count'?'isActive':''"
                     size="small"
                     @click="tabsClick('comments_count')">评论最高</el-button>
          <el-button :class="isOrigin==='reposts_count'?'isActive':''"
                     size="small"
                     @click="tabsClick('reposts_count')">转发最高</el-button>
        </div> -->
        <div class="table-box">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
let echarts = require('echarts/lib/echarts')
export default {
  props: ['tableData2', 'userData'],
  data () {
    return {
      isOrigin: 'attitudes_count',
      dataNum: [],
      dataType: [],
      fourData: [],
      tenData: [],
      jsonObj: {
        isCommon: true
      }
    }
  },
  methods: {
    // 跳转原文
    jumpOriginal (params) {
      window.open(params, '_blank')
    },
    tabsClick (type) {
      console.log(type)
      // this.isOrigin = id
      // this.$emit('fatherMethod', id)

      this.isOrigin = type
      this.$emit('fatherMethod2', this.isOrigin)
    },
    // 获取数据
    getArticleData (data) {
      let jsonObj = JSON.parse(data)
      console.log(jsonObj)
      // this.jsonObj.isCommon = false
      // console.log(this.jsonObj)
      // if (this.jsonObj.isCommon) {
      //   this.jsonObj.commonData.forEach(item => {
      //     this.dataType.push(item.pageType)
      //     this.dataNum.push(item.articleCountNum)
      //   })
      //   this.getbarCharts()
      // } else {
      //   this.fourData = this.jsonObj.procuratorial
      //   this.tenData = this.jsonObj.business
      //   this.getFourPie()
      //   this.getTenPie()
      // }
      if (jsonObj.listData.length > 0) {
        let myChart = echarts.init(document.getElementById('article-word4'))
        let option = {
          tooltip: {
            show: true
          },
          series: [{
            type: 'wordCloud',
            gridSize: 1,
            // sizeRange: [12, 55],
            sizeRange: [15, 80],
            // rotationRange: [-45, 0, 45, 90],
            rotationRange: [0, 80, 0, 150],
            // maskImage: this.image,
            textStyle: {
              normal: {
                color: function () {
                  return 'rgb(' +
                  Math.round(Math.random() * 255) +
                  ', ' + Math.round(Math.random() * 255) +
                  ', ' + Math.round(Math.random() * 255) + ')'
                }
              }
            },
            left: 'center',
            top: 'center',
            // width: '96%',
            // height: '100%',
            right: null,
            bottom: null,
            // width: 300,
            // height: 200,
            // top: 20,
            data: jsonObj.listData
          }]
        }
        myChart.setOption(option)
        window.addEventListener('resize', function () {
          myChart.resize()
        })
      } else {
        var html = '<div><span  style="position: absolute;width:100%;top: 40%;display:block;text-align:center;color:#868686; font-size: 20px;">暂无数据</span></div>'
        document.getElementById('article-word4').innerHTML = html
        document.getElementById('article-word4').removeAttribute('_echarts_instance_')
      }
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
#article-tabs,
#article-word {
  width: 1300px;
  min-height: 333px;
  box-sizing: border-box;
  position: relative;
}
#article-word4 {
  width: 1300px;
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
  padding: 30px 20px;
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
/* .pie-left,
.pie-right {
  width: 685px;
  height: 400px;
} */
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
</style>
