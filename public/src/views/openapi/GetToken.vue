<template>
  <div class="account">
    <div class="flex-just-center account-show">
      <div class="menu-warp">
        <v-menu></v-menu>
      </div>
      <div class="account-company-warp">
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
              <p>getToken</p>
              <p>请求方式：<span>POST</span></p>
            </div>
            <el-table :data="tableData"
                      style="width: 100%"
                      border
                      :header-cell-style="{background:'#F7F8FA'}">
              <el-table-column prop="name"
                              label="参数"
                              width="250">
              </el-table-column>
              <el-table-column prop="type"
                              label="类型"
                              width="110">
              </el-table-column>
              <el-table-column prop="isRequired"
                              label="是否必填"
                              width="90">
              </el-table-column>
              <el-table-column prop="desc"
                              label="说明"
                              show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="openapi-wx-box openapi-margin">
          <div class="openapi-wx-head flex-ali-center">
            <p class="openapi-p-title">请求参数</p>
          </div>
          <div class="openapi-cont-box">
            <p>{</p>
            <div class="content-margin-left">
              <p>authkey: 联系我们获取的账号</p>
              <p>authSecret: 联系我们获取的密码</p>
            </div>
            <p>}</p>
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
                              label="说明"
                              show-overflow-tooltip>
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
                    <p>"expire": 86400,</p>
                    <p>"token": "6c23588f-f942-4b99-bfb1-380181d64b07"</p>
                  </div>
                <p>}</p>
              </div>
            <p>}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vMenu from './components/Menu'
export default {
  data () {
    return {
      interData: [
        {
          name: 'http://data.zfrmt.cn/pull/data/customer/getToken',
          func: '获取Token'
        }
      ],
      tableData: [
        {
          name: 'authKey',
          type: 'String',
          isRequired: '是',
          desc: '账号，联系我们进行获取'
        },
        {
          name: 'authSecret',
          type: 'String',
          isRequired: '是',
          desc: '密码，联系我们进行获取'
        }
      ],
      returnData: [
        {
          name: 'expire',
          type: 'Number',
          desc: '有效期，单位秒，请在过期时间之后重新请求此接口获取最新token'
        },
        {
          name: 'token',
          type: 'String',
          desc: '请求接口需要携带的用户认证信息'
        }
      ]
    }
  },
  methods: {
  },
  components: {
    vMenu
  }
}
</script>
<style scoped>
@import './openapi.css';
.account-show {
  width: 1400px;
  min-height: 1000px;
  margin: 0 auto;
  margin-bottom: 70px;
}
.account-company-warp {
  margin-left: 50px;
  width: 100%;
  margin-top: 20px;
}
.menu-warp{
  width: 15%;
}
</style>