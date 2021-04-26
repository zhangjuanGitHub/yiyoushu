<template>
  <div>
    <div class="openapi-wx-box">
      <div class="openapi-wx-head flex-ali-center">
        <p class="openapi-p-title">接口名称</p>
      </div>
      <div class="openapi-cont-box">
        <el-table :data="interData"
                  style="width: 100%"
                  :header-cell-style="{background:'#fff'}">
          <el-table-column prop="name"
                           label="链接">
          </el-table-column>
          <el-table-column prop="func"
                           label="功能说明"
                           width="400">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="openapi-wx-box openapi-margin">
      <div class="openapi-wx-head flex-ali-center">
        <p class="openapi-p-title">调用方式及参数</p>
      </div>
      <div class="openapi-cont-box">
        <div class="openapi-cont-msg flex-ali-center">
          <p>checkArticle</p>
          <p>请求方式：<span>GET</span></p>
        </div>
        <el-table :data="tableData"
                  style="width: 100%"
                  border
                  v-if="tableData.length > 0"
                  :header-cell-style="{background:'#F7F8FA'}">
          <el-table-column prop="name"
                           label="参数"
                           width="350">
          </el-table-column>
          <el-table-column prop="type"
                           label="类型"
                           width="150">
          </el-table-column>
          <el-table-column prop="name"
                           label="是否必填"
                           width="120">
          </el-table-column>
          <el-table-column prop="desc"
                           label="说明"
                           show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <p v-else>无参数</p>
      </div>
    </div>
    <div class="openapi-wx-box openapi-margin">
      <div class="openapi-wx-head flex-ali-center">
        <p class="openapi-p-title">请求参数</p>
      </div>
      <div class="openapi-cont-box">
        <p>无</p>
      </div>
    </div>
    <div class="openapi-wx-box openapi-margin">
      <div class="openapi-wx-head flex-ali-center">
        <p class="openapi-p-title">返回数据类型</p>
      </div>
      <div class="openapi-cont-box">
        <el-table :data="returnData"
                  style="width: 100%"
                  border
                  :header-cell-style="{background:'#F7F8FA'}">
          <el-table-column prop="name"
                           label="参数"
                           width="350">
          </el-table-column>
          <el-table-column prop="type"
                           label="类型"
                           width="250">
          </el-table-column>
          <el-table-column prop="desc"
                           label="说明">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="openapi-wx-box openapi-margin">
      <div class="openapi-wx-head flex-ali-center">
        <p class="openapi-p-title">返回参数</p>
      </div>
      <div class="openapi-cont-box">
        <p>{</p>
          <div class="content-margin-left">
            <p>"status": true,</p>
            <p>"code": 200,</p>
            <p>"message": "success",</p>
            <p>"data": {</p>
              <div class="content-margin-left">
                <p>"hasMore": true,</p>
                <p>"total": 375,</p>
                <p>"articles": [</p>
                  <div class="content-margin-left">
                    <p>{</p>
                      <div class="content-margin-left">
                        <p>"sn": "5c68f390f1b7f3b70c30a66fd49da058",</p>
                        <p>"comment_num": 245,</p>
                        <p>"msg_source_url": "",</p>
                        <p>"like_num": 457,</p>
                        <p>"old_like_num": 5477,</p>
                        <p>"cover_url": "",</p>
                        <p>"author": "作者",</p>
                        <p>"title": "标题",</p>
                        <p>"content": "内容（纯文本）",</p>
                        <p>"url": "文章链接",</p>
                        <p>"biz": "MzA4MjEyNTA5Mw==",</p>
                        <p>"read_num": 16546</p>
                        <p>"publish_time": "2020-10-22 08:40:36",</p>
                        <p>"nickname": "星辰大海",</p>
                        <p>"digest": "摘要",</p>
                        <p>"alias": "xingchendahai",</p>
                        <p>"media_image": "http://wx.qlogo.cn/mmopen/aj......",</p>
                        <p>"page_type": "1",</p>
                        <p>"media_video": ''</p>
                        <p>"origin_url": "http://wx.qlogo.cn/mmopen/aj......",</p>
                        <p>"crawl_time": "2020-10-22 09:28:15"</p>
                      </div>
                    <p>}</p>
                    <p>...</p>
                  </div>
                <p>]</p>
              </div>
            <p>}</p>
          </div>
        <p>}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      interData: [
        {
          name: 'http://data.zfrmt.cn/pull/data/wechat/checkArticle?token=XXXX',
          func: '每次获取只会返回新增的未查询过的文章'
        }
      ],
      // 请求参数
      tableData: [],
      // 返回参数
      returnData: [
        {
          name: 'hasMore',
          type: 'Boolean',
          desc: '表示是否还有数据等待查询，为true时还需要继续请求，为false时不需要继续请求'
        },
        {
          name: 'total',
          type: 'Number',
          desc: '新增的文章数量，total为20时代表没有新数据了'
        },
        {
          name: 'sn',
          type: 'String',
          desc: '文章唯一标识ID'
        },
        {
          name: 'comment_num',
          type: 'Number',
          desc: '评论数'
        },
        {
          name: 'msg_source_url',
          type: 'String',
          desc: ''
        },
        {
          name: 'like_num',
          type: 'Number',
          desc: '在看数'
        },
        {
          name: 'old_like_num',
          type: 'Number',
          desc: '点赞数'
        },
        {
          name: 'cover_url',
          type: 'String',
          desc: '封面图链接'
        },
        {
          name: 'author',
          type: 'String',
          desc: '作者'
        },
        {
          name: 'title',
          type: 'String',
          desc: '标题'
        },
        {
          name: 'content',
          type: 'String',
          desc: '内容（纯文本）'
        },
        {
          name: 'url',
          type: 'String',
          desc: '文章链接'
        },
        {
          name: 'biz',
          type: 'String',
          desc: '微信号biz'
        },
        {
          name: 'read_num',
          type: 'String',
          desc: '阅读数, 最大值为100001，代表10万+'
        },
        {
          name: 'publish_time',
          type: 'String',
          desc: '发布时间'
        },
        {
          name: 'nickname',
          type: 'String',
          desc: '微信昵称'
        },
        {
          name: 'digest',
          type: 'String',
          desc: '摘要'
        },
        {
          name: 'alias',
          type: 'String',
          desc: '微信号'
        },
        {
          name: 'media_image',
          type: 'String',
          desc: '内容包含图片链接，多个用英文分号;隔开'
        },
        {
          name: 'page_type',
          type: 'Number',
          desc: '1图文 2纯视频 3分享'
        },
        {
          name: 'media_video',
          type: '',
          desc: 'page_type为1时：该字段包含图文中视频链接，多个用英文分号;隔开；page_type为2时：该字段是一个JSON字符串，包含视频的流畅、高清、超清三个版本的信息；'
        },
        {
          name: 'origin_url',
          type: 'String',
          desc: '分享的图文链接，非分享发文此字段为空'
        },
        {
          name: 'crawl_time',
          type: 'String',
          desc: '采集入库时间'
        }
      ]
    }
  }
}
</script>
<style scoped>
@import '../openapi.css';
</style>