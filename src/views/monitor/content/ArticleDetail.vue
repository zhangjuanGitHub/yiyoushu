<!--
 * @Author: MaiChao
 * @Date: 2021-02-07 15:31:16
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-12 19:09:28
-->
<template>
  <div class="content-show article-detail">
    <div class="tabs-header flex-ali-center">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'AccountCompany' }">新媒体监测</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'Prescription' }">内容监测</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'Realtime' }">文章实时监测</el-breadcrumb-item>
        <el-breadcrumb-item>微信传播力分析</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="realtime-detail">
      <div class="realtime-top flex-bwt-center">
        <div class="article-box">
          <div class="title"
               v-html="articleDetail.title"></div>
          <div class="information flex-ali-center">
            <!-- <span class="boder-box">原创</span>
            <span>xx检察院</span>
            <span>2021-06-06 09:06:06</span>
            <span><i class="el-icon-view"></i>10万</span>
            <span><i class="el-icon-star-off"></i>122</span>
            <span><i class="el-icon-help"></i>58</span>
            <span><i class="el-icon-connection"></i>88.72</span> -->
          </div>
          <div class="article-cont"
               v-html="articleDetail.content">
          </div>
          <div class="bottom-btn cursor"
               @click="openUrl(articleDetail.url)">展示全文<i class="el-icon-arrow-down"></i></div>
        </div>
        <div class="relation-box">
          <div id="relation-charts"></div>
          <div class="relation-title">文章共被<i>60</i>个公众号转载</div>
        </div>
      </div>
      <div class="realtime-center">
        <div class="tabs-header">
          <span class="tabs-title">文章篇数统计图</span>
        </div>
        <div id="bar-charts"></div>
      </div>
      <div class="realtime-bottom">
        <div class="bottom-list">
          <div class="tabs-header">
            <span class="tabs-title">转载明细列表</span>
          </div>
        </div>
        <div class="list-content">
          <div class="list-box"
               v-for="item in articleList"
               :key="item.id">
            <div class="flex-ali-center list-top">
              <div class="left-img flex-arr-center">
                <img :src="item.cover"
                     alt="">
              </div>
              <div class="right">
                <div class="right-top flex-bwt-center">
                  <div class="right-title title cursor"
                       v-html="item.title"></div>
                  <div class="right-time">数据更新时间：{{item.lastPubtime}}</div>
                </div>
                <div class="right-bottom cursor"
                     v-html="item.content"
                     @click="openUrl(item.url)"></div>
              </div>
            </div>
            <div class="flex-bwt-center list-bootom">
              <div class="left-time">
                <span>{{item.lastPubtime}}</span>
                <span>{{item.author}}</span>
                <span>文章位置:{{item.idx}}</span>
              </div>
              <div class="right-infor">
                <span><i class="el-icon-view"></i>{{item.readNum}}</span>
                <span><i class="el-icon-star-off"></i>{{item.oldLikeNum}}</span>
                <span><i class="el-icon-help"></i>{{item.commentCount}}</span>
                <span class="click-sapn cursor"
                      @click="routeSim(item)"><i class="el-icon-connection"></i>{{item.simScore}}</span>
              </div>
            </div>
          </div>
        </div>
        <set-page @pagingChange="pagingChange"
                  :total="total"></set-page>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      id: '',
      total: 100,
      articleDetail: {},
      articleList: [],
      data: {
        nodes: [{
          name: '操作系统集团',
          category: 0
        }, {
          name: '浏览器有限公司',
          category: 0
        }, {
          name: 'HTML科技',
          category: 0
        }, {
          name: 'JavaScript科技',
          category: 0
        }, {
          name: 'CSS科技',
          category: 0
        }, {
          name: 'Chrome',
          category: 1
        }, {
          name: 'IE',
          category: 1
        }, {
          name: 'Firefox',
          category: 1
        }, {
          name: 'Safari',
          category: 1
        }],
        links: [{
          source: '浏览器有限公司',
          target: '操作系统集团',
          name: '参股'
        }, {
          source: 'HTML科技',
          target: '浏览器有限公司',
          name: '参股'
        }, {
          source: 'CSS科技',
          target: '浏览器有限公司',
          name: '参股'
        }, {
          source: 'JavaScript科技',
          target: '浏览器有限公司',
          name: '参股'
        }, {
          source: 'Chrome',
          target: '浏览器有限公司',
          name: '董事'
        }, {
          source: 'IE',
          target: '浏览器有限公司',
          name: '董事'
        }, {
          source: 'Firefox',
          target: '浏览器有限公司',
          name: '董事'
        }, {
          source: 'Safari',
          target: '浏览器有限公司',
          name: '董事'
        }, {
          source: 'Chrome',
          target: 'JavaScript科技',
          name: '法人'
        }]
      },
      ruleForm: {
        id: '',
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getListData()
    this.getArticle()
    // this.getArticleData()
    // this.getBarData()
  },
  methods: {
    // 获取文章信息
    getArticle () {
      this.$http.post(this.$api.findArticleById, this.ruleForm)
        .then(res => {
          this.articleDetail = res.data.data
        }).catch(() => { })
    },
    // 获取相似文章列表
    getListData () {
      this.ruleForm.id = this.id
      this.$http.post(this.$api.findSimilarity, this.ruleForm)
        .then(res => {
          this.articleList = res.data.data
        }).catch(() => { })
    },
    // 分页
    pagingChange (query) {
      this.ruleForm.pageSize = query.size
      this.ruleForm.pageNum = query.page
    },
    // 关系图
    getArticleData () {
      let myChart = echarts.init(document.getElementById('relation-charts'))
      this.$http.post(this.$api.findSimilarityChart, this.ruleForm)
        .then(res => {
          console.log(res.data.data)
          res.data.data.nodes.forEach(node => {
            if (node.category === 0) {
              node.symbolSize = 30
              node.itemStyle = {
                color: '#006acc'
              }
            } else if (node.category === 1) {
              node.itemStyle = {
                color: '#ff7d18'
              }
            }
          })
          res.data.data.links.forEach(link => {
            link.label = {
              align: 'center',
              fontSize: 12
            }
            if (link.name === '转载') {
              link.lineStyle = {
                color: '#ff7d18'
              }
            } else if (link.name === '被转载') {
              link.lineStyle = {
                color: '#006acc'
              }
            } else if (link.name === '原创') {
              link.lineStyle = {
                color: '#10a050'
              }
            }
          })
          let categories = [{
            name: '公司',
            itemStyle: {
              color: '#006acc'
            }
          },
          {
            name: '董事',
            itemStyle: {
              color: '#ff7d18'
            }
          }]
          let option = {
            series: [{
              type: 'graph',
              layout: 'force',
              symbolSize: 50,
              draggable: true,
              roam: true,
              focusNodeAdjacency: true,
              categories: categories,
              edgeSymbol: ['', 'arrow'],
              edgeSymbolSize: [10, 10],
              edgeLabel: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 20
                  },
                  formatter (x) {
                    return x.data.name
                  }
                }
              },
              label: {
                show: true
              },
              force: {
                repulsion: 180,
                edgeLength: 80
              },
              data: res.data.data.nodes,
              links: res.data.data.links
            }]
          }
          myChart.setOption(option)
          window.addEventListener('resize', function () {
            myChart.resize()
          })
        }).catch(() => { })
    },
    // 柱状图
    getBarData () {
      let myChart = echarts.init(document.getElementById('bar-charts'))
      this.$http.post(this.$api.barChart, this.ruleForm)
        .then(res => {
          let barList = res.data.data.idxList
          let barData = res.data.data.numList
          let option = {
            backgroundColor: '#ffffff',
            tooltip: {
              show: false
            },
            xAxis: [{
              type: 'category',
              data: barList,
              axisLabel: {
                margin: 10,
                color: '#a4a4a4'
              },
              axisLine: {
                lineStyle: {
                  color: 'rgba(107,107,107,0.37)'
                }
              },
              axisTick: {
                show: false
              }
            }],
            yAxis: [{
              axisLabel: {
                color: '#a4a4a4'
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: '#ECECEC',
                  type: 'dashed'
                }
              }
            }],
            series: [{
              type: 'bar',
              data: barData,
              barWidth: '40px',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(102,159,239,1)'
                  }, {
                    offset: 1,
                    color: 'rgba(170,202,246,1)'
                  }], false)
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'top'

                }
              }
            }]
          }
          myChart.setOption(option)
          window.addEventListener('resize', function () {
            myChart.resize()
          })
        }).catch(() => { })
    },
    // 打开全文链接
    openUrl (url) {
      window.open(url, '_black')
    },
    routeSim (item) {
      this.$router.push({ name: 'Similarity', query: { id: item.id } })
    }
  },
  mounted () {
    this.getArticleData()
    this.getBarData()
  }
}
</script>
<style>
@import '../monitor.css';
</style>
<style  scoped>
.content-show {
  max-width: 1400px;
  margin: 20px auto;
}
.tabs-header {
  padding: 0 20px;
  height: 50px;
  line-height: 50px;
  background-color: #f7f8fa;
}
.realtime-top {
  min-height: 536px;
  background-color: #fff;
}
.article-box {
  max-width: 56%;
  height: 100%;
  overflow: hidden;
  padding: 30px 30px 60px 30px;
  position: relative;
}
.title {
  font-size: 24px;
  color: #252934;
}
.information {
  font-size: 14px;
  color: #a9a9a9;
  line-height: 20px;
  margin: 20px 0;
}
.information span {
  margin-right: 20px;
}
.boder-box {
  display: block;
  width: 40px;
  text-align: center;
  border: 1px solid #3b81fe;
  color: #3b81fe;
}
.article-cont {
  height: 285px;
  overflow: hidden;
  line-height: 24px;
  font-size: 14px;
  text-indent: 32px;
}
.bottom-btn {
  position: absolute;
  color: #3b81fe;
  bottom: 0px;
  right: 30px;
  font-size: 14px;
}
.relation-box {
  padding: 30px 60px 30px 30px;
}
#relation-charts {
  width: 410px;
  height: 400px;
  /* border: 1px solid #3b81fe; */
}
.relation-title {
  color: #252934;
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
}
.relation-title i {
  color: #ff8210;
  font-style: normal;
}
.realtime-center {
  margin-top: 30px;
  height: 540px;
  background-color: #fff;
}
.tabs-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 20px;
  background-color: #2196f3;
  vertical-align: middle;
  margin-top: -4px;
  margin-right: 10px;
}
#bar-charts {
  height: 490px;
}
.realtime-bottom {
  margin-top: 30px;
}
.list-content {
  max-height: 8150px;
  overflow: hidden;
}
.list-box {
  background-color: #fff;
  padding: 28px 28px 0 28px;
}
.list-bootom {
  padding-bottom: 28px;
  border-bottom: 1px solid #979696;
}
.left-img {
  min-width: 140px;
  height: 90px;
  border: 1px solid #979696;
  margin-right: 20px;
}
.left-img img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
}
.left-time span,
.right-infor span {
  margin-right: 10px;
  font-size: 14px;
  color: #a9a9a9;
  line-height: 20px;
}
.right-bottom {
  font-size: 14px;
  color: #a9a9a9;
}
.right-title {
  line-height: 50px;
}
.list-top {
  margin-bottom: 20px;
}
.right-infor .click-sapn {
  color: #2196f3;
}
.right-infor i {
  margin-right: 5px;
}
</style>
