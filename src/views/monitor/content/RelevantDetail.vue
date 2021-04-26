<!--
 * @Author: MaiChao
 * @Date: 2021-02-07 15:31:16
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-17 19:26:30
-->
<template>
  <div class="content-show article-detail flex-bwt-center">
    <div class="content-left">
      <div class="tabs-header  flex-ali-center">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'AccountCompany' }">新媒体监测</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'Prescription' }">内容监测</el-breadcrumb-item>
          <el-breadcrumb-item>相关监测列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="account-detail flex-arr-center">
        <div class="flex-arr-center">
          <el-image style="width: 100px; height: 100px"
                    :src="this.articleData.hd_head_img"
                    fit="cover"></el-image>
          <div class="account-name">
            <p class="user-name">{{this.articleData.nickname}}</p>
            <p class="account">公众号名称:<span>{{this.articleData.nickname}}</span></p>
            <p class="time">截止时间为:<span>{{this.articleData.last_pubtime}}</span></p>
          </div>
        </div>
        <div class="synopsis">该账号共有文章<i>{{this.articleData.articleCountNum}}</i>篇,检察类型的文章共发了<i>{{this.articleData.procuratorialCountNum}}</i>篇,
          其他类型的文章共有{{this.articleData.pictureNum}}篇。
        </div>
      </div>
      <div class="account-table">
        <div>
          <el-input placeholder="请输入关键词" v-model="this.ruleForm.keyword" size='small'>
             <el-button slot="append" size='small' @click="searchTable">搜索</el-button>
          </el-input>
        </div>
        <el-table :data="tableData"
                  style="width: 100%"
                  max-height="320"
                  :cell-style="{ textAlign: 'center' }"
                  :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column prop="title"
                           label="标题"
                           width="360">
          </el-table-column>
          <el-table-column prop="pubtime"
                           label="发布日期">
          </el-table-column>
          <el-table-column prop="mapping_score"
                           label="涉检指数"
                           width="180">
            <template slot-scope='scope'>
              <div v-if="scope.row.mapping_score">
                {{scope.row.mapping_score}}
              </div>
              <div v-else>0</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="content-right">
      <div id="pie-charts"></div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      articleData: {},
      ruleForm: {
        publishTime: [],
        keyword: '',
        pageSize: 5,
        pageNum: 1
      },
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      tableData: [{
        date: '2016-05-02',
        name: '88',
        address: '河北 邢台南宫市内5地升为中风险地区'
      }, {
        date: '2016-05-04',
        name: '88',
        address: '河北 邢台南宫市内5地升为中风险地区'
      }, {
        date: '2016-05-01',
        name: '88',
        address: '河北 邢台南宫市内5地升为中风险地区'
      }, {
        date: '2016-05-03',
        name: '88',
        address: '河北 邢台南宫市内5地升为中风险地区'
      }, {
        date: '2016-05-03',
        name: '88',
        address: '河北 邢台南宫市内5地升为中风险地区'
      }]
    }
  },
  mounted () {
    this.pieCharts()
    this.searchTable()
  },
  methods: {
    // 获取表格信息
    searchTable () {
      this.$http.post(this.$api.articleList, this.ruleForm)
        .then(res => {
          this.tableData = res.data.data.list
          this.total = parseInt(res.data.data.count)
        }).catch(() => { })
    },
    // 获取账户信息
    pieCharts () {
      let myChart = echarts.init(document.getElementById('pie-charts'))
      let params = {
        keyword: this.ruleForm.keyword,
        bizList: [this.$route.query.id]
      }
      this.$http.post(this.$api.articleDetail, params)
        .then(res => {
          this.articleData = res.data.data.data[0]
          console.log(this.articleData)
          let option = {
            title: {
              text: '涉检占比图',
              left: 'center',
              top: 40,
              textStyle: {
                color: '#151C29',
                fontSize: 18
              }
            },
            series: [{
              name: '圆',
              type: 'pie',
              radius: ['0%', '10%'],
              center: ['30%', '50%'],
              startAngle: 180,
              hoverAnimation: true,
              label: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: '1000',
                name: '圆',
                label: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    color: '#ccc'
                  }
                }
              }
              ]
            }, {
              name: '涉检占比图',
              type: 'pie',
              radius: [37, 200],
              avoidLabelOverlap: false,
              startAngle: 0,
              center: ['30%', '50%'],
              roseType: 'area',
              selectedMode: 'single',
              label: {
                normal: {
                  show: true,
                  formatter: '{c}%',
                  position: 'inside',
                  color: '#151C29',
                  fontSize: 14
                }

              },
              data: [{
                value: 0,
                name: '',
                label: {
                  normal: {
                    show: false
                  }

                }
              },
              {
                value: 0,
                name: '',
                label: {
                  normal: {
                    show: false
                  }

                }
              },
              {
                value: 0,
                name: '',
                label: {
                  normal: {
                    show: false
                  }

                }

              },
              // {
              //   value: 0,
              //   name: '',
              //   label: {
              //     normal: {
              //       show: false
              //     }

              //   }
              // },
              {
                value: this.articleData.picturePercentage,
                name: '其他',
                itemStyle: {
                  normal: {
                    color: '#64B267'
                  }
                }
              },
              {
                value: this.articleData.articleNotPertinenceNumPercentage,
                name: '非涉检',
                itemStyle: {
                  norma: {
                    color: '#BAC23B'
                  }
                }
              },
              {
                value: this.articleData.procuratorialCountPercentage,
                name: '涉检类',
                itemStyle: {
                  normal: {
                    color: '#F0BA34'
                  }
                }
              }
              // {
              //   value: 1000 / 10,
              //   itemStyle: {
              //     normal: {
              //       color: '#E97915'
              //     }
              //   }
              // }

              ]
            }]
          }
          myChart.setOption(option)
          window.addEventListener('resize', function () {
            myChart.resize()
          })
        }).catch(() => { })
    }
  }
}
</script>
<style>
@import '../monitor.css';
</style>
<style  scoped>
.content-show {
  max-width: 1400px;
  margin: 28px auto;
}
.content-left {
  width: 1010px;
  background-color: #fff;
  height: 710px;
}
.content-right {
  width: 360px;
  background-color: #fff;
  height: 710px;
}
.tabs-header {
  padding: 0 20px;
  height: 50px;
  line-height: 50px;
  background-color: #f7f8fa;
}
.account-detail {
  width: 100%;
  height: 216px;
  background-color: #fff;
  padding: 0 42px;
  box-sizing: border-box;
}
.account-table {
  padding: 15px;
}
.el-image {
  border-radius: 50%;
  margin-right: 35px;
}
.user-name {
  font-size: 18px;
  color: #151c29;
  line-height: 24px;
}
.account,
.time {
  font-size: 14px;
  color: #707277;
  line-height: 24px;
}
.synopsis {
  width: 376px;
  font-size: 14px;
  color: #151c29;
  line-height: 24px;

  font-family: Microsoft YaHei;
}
.synopsis i {
  font-style: normal;
  font-size: 30px;
  color: #151c29;
}
.el-input-group{
  width: 208px;
  float: right;
  margin-bottom: 20px;
}
#pie-charts{
  height: 100%;
}
</style>
