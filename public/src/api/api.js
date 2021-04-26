/*
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-28 11:13:04
 * @LastEditors: zhangjuan
 */
export default {
  login: '/front/login/pass', // post 密码登录
  getCode: '/front/wx/ticket/createQRCode', // get 获取二维码
  codeLogin: '/front/login/qr/code', // post 二维码登录
  getUserInfo: '/front/sys/user/info', // get 获取用户信息
  logOut: '/front/login/logout', // get 退出登录
  // 首页
  getHotArticle: '/front/wechat/home/hotWechatArticle', // get 获取微信热文
  getWxAirticle: '/front/wechat/home/searchWechatArticle', // get 获取微信文章
  startCollect: '/front/HomePage/wechatNotCollected', // post 申请采集该账号
  // 搜索微信账号相关信息
  collectAccount: '/front/wechat/collectAccount', // post 收录公众号
  wxSearch: '/front/HomePage/queryWxAccount', // post 搜索微信账号
  wxSearchTip: '/front/HomePage/association', // post 搜索框提示
  getWxAccount: '/front/HomePage/queryWxAccountById', // get 获取微信账号信息
  getSameAccount: '/front/HomePage/queryWxAccountByAuthInfo', // get 获取账号同主体账号
  getWxClass: '/front/HomePage/queryWxClassifyByBiz', // get 获取账号的文章类别
  getWxClassArticle: '/front/HomePage/queryWxArticleByBizAndType', // post 获取该账户类别的文章
  getArticleCategories: '/front/HomePage/proportionOfArticleCategories', // post 获取文章占比
  getMonthPublishedNum: '/front/HomePage/dailyNumberOfPapers', // post 获取一个月内发文数
  getReleasedNum: '/front/HomePage/releaseFrequency', // post 获取该账号的发布频次
  getReadNumArea: '/front/HomePage/numberOfHeadlinesRead', // post 获取阅读数分布
  getReleaseTrend: '/front/HomePage/releaseTrend', // post 获取发文趋势和原创数
  getLeaveMessage: '/front/HomePage/interactiveMessage', // post 获取互动留言
  getUseAbout: '/front/HomePage/usageOverview', // post 获取使用概况
  getUseFeature: '/front/HomePage/usageCharacteristics', // post 获取使用特征
  getDomainAnalyse: '/front/HomePage/analysisOfDomainNames', // post 获取常用域名分析
  getThirtyHot: '/front/HomePage/hotTweets', // post 获取30天热门推文
  getNewestTw: '/front/HomePage/latestTweets', // post 获取最新推文
  updateYime: '/front/HomePage/updateDataByTime', // get 更新数据
  getHTArticle: '/front/wechat/article/id', // get 获取当前文章信息
  getHTAction: '/front/HomePage/messageAnalysis', // post 获取历史推文文章详情
  getHTComment: '/front/HomePage/commentDetails', // post 获取历史推文文章评论
  getHTContent: '/front/HomePage/contentAnalysis', // post 获取历史推文文章内容分析
  setCollect: '/front/follow/account/add', // get 添加账号收藏
  cancelCollect: '/front/follow/account/del', // get 取消账号收藏
  submitTrack: '/front/review/wechat/save', // post 添加回溯
  // 新媒体监测
  articleDetail: '/front/monitor/weixin/findArticlePertinence', // 相关性分析 ---账号详情and 饼状图
  articleList: '/front/monitor/weixin/findArticlePertinenceList', // 相关性监测--文章列表
  linePertinence: '/front/monitor/weixin/findArticlePertinenceChart', // 相关性分析-折线
  articlePertinence: '/front/monitor/weixin/findArticlePertinence', // 涉检文章列表
  addMonitor: '/front/monitor/weixin/addMonitorArticle', // 文章实时监测--添加文章监测
  delMonitor: '/front/monitor/weixin/delMonitorArticle', // 文章实时监测--删除文章
  listMonitor: '/front/monitor/weixin/findMonitorArticle', // 文章实时监测--文章列表展示
  selectIdByBiz: '/front/monitor/weixin/selectIdByBiz', // 文章实时监测--通过文章biz获取id
  getBasicData: '/front/HomePage/basicDataStatistics', // post 基础数据统计-获取行为数据
  getReadTrend: '/front/HomePage/readingTrends', // post 获取阅读趋势折线图
  findInteractivityList: '/front/monitor/weixin/findInteractivityList', // 互动性监测--账号
  findSimilarity: '/front/monitor/weixin/findSimilarityArticle', // 文章实时监测详情--相似文章列表展示
  findArticleById: '/front/monitor/weixin/findArticleById', // 文章实时监测详情--原文内容
  barChart: '/front/monitor/weixin/countSimilarityLocationChart', // 文章实时监测详情-- 柱状图
  comparisonContent: '/front/monitor/weixin/findComparisonContent', // 文章实时监测详情-- 文章内容对比
  findSimilarityChart: '/front/monitor/weixin/findSimilarityChart', // 文章实时监测详情--- 传播统计图
  findByReprintChart: '/front/monitor/weixin/findByReprintChart', // 文章实时监测详情------折线图 被转载量分析
  findByAuthTypeChart: '/front/monitor/weixin/findByAuthTypeChart', // 文章实时监测詳情 -- 柱状图 文章传播类型分析
  findByTerritoryChart: '/front/monitor/weixin/findByTerritoryChart', // 文章实时监测詳情 -- 地图 文章传播地域分析
  findByHistogramChart: '/front/monitor/weixin/findByHistogramChart', // 文章实时监测詳情 -- 柱状图 文章传播地域分析
  analyseList: '/front/analyse/weixin/findAccountAnalyseList', // 查询账号分析详情
  findArtileList: '/front/analyse/weixin/findArtileList', // 展示文章数据， 原创文章and转载文章 展示文章数据， 阅读数倒序
  // 个人中心
  listAccount: '/front/sys/user/department/account', // 单位账号
  wxListData: '/front/review/wechat/listData', // 回溯列表
  wxExport: '/front/review/wechat/export', // 回溯导出
  wxDelete: '/front/review/wechat/delete', // 回溯删除
  listData: '/front/follow/account/listData', // 公众号收藏
  listDelete: '/front/follow/account/delete', // 公众号删除
  security: '/front/sys/user/updateSelfSecurity', // 修改密码
  getQRCode: '/front/wx/ticket/createQRCode', // 获取二维码
  verify: '/front/sys/user/qr/verify', // 验证微信
  getPhoneCode: '/front/sys/user/captcha', // 获取验证码
  sendSms: '/front/sys/user/sendSms', // 发送短信接口
  getSmsCode: '/front/custom/sendSms', // 数据定制获取短信验证码
  addCustom: '/front/custom/addCustom', // 提交数据定制
  bindPhone: '/front/sys/user/bindPhone', // 绑定手机号
  unbindPhone: '/sys/user/unbindPhone', // 解绑手机号
  company: '/front/department/verify/submit', // 单位认证
  newsData: '/front/message/listData', // 消息列表
  batchRead: '/front/message/batchRead', // 读取消息更改状态
  messageRead: '/front/message/read', // 读取消息更改状态(单个)
  // 账号监测-zz
  getAccountCompany: '/front/monitor/weixin/findAccountData', // post 获取账号监测, 发布时效监测
  getSensitiveList: '/front/monitor/weixin/findErrorWord', // post 获取错敏监测列表
  getSensPie: '/front/monitor/weixin/findErrorWordNum', // post 获取错敏饼图
  getSensArticle: '/front/monitor/weixin/findErrorArticeContent', // get 获取错敏文章内容
  // 公众号分析
  searchRecord: '/front/analyse/weixin/addQueryLog', // post 添加搜索记录
  getSearchRecord: '/front/analyse/weixin/findQueryLogList', // get 获取搜索记录
  deleteRecord: '/front/analyse/weixin/delQueryLog', // get 删除搜索记录
  addOneAnalyse: '/front/analyse/weixin/addAnalyseAccount', // post 添加账号分析
  getTaskList: '/front/analyse/weixin/findAnalyseAccount', // post 查询账号分析列表
  deleteTask: '/front/analyse/weixin/delAnalyseAccount', // post 删除任务
  // 账号对比
  startCompare: '/front/comparison/weixin/findComparison', // post 账号对比
  departCompare: '/front/comparison/weixin/findUnitComparison', // post 单位对比
  getCityList: '/front/comparison/weixin/findRegion', // get 获取地区列表
  getTreeList: '/front/comparison/weixin/findDepartment', // post 根据市获取下级
  getAccountList: '/front/comparison/weixin/findAccountByDepartment', // post 根据单位查账号信息
  // 分钟级监测
  getArticle: '/front/wechatActual/getArticle', // get 获取微信监测文章信息
  searchUrl: '/front/wechatActual/searchUrl', // post 根据文章url获取信息
  searchAccount: '/front/wechatActual/searchAccount', // post 根据名称搜索微信账号
  saveArticle: '/front/wechatActual/saveArticle', // post 保存文章监测
  saveAccount: '/front/wechatActual/saveAccount', // post 保存账号监测
  updateArticle: '/front/wechatActual/updateArticle', // post 修改文章监测
  updateAccount: '/front/wechatActual/updateAccount', // post 修改账号监测
  listArticle: '/front/wechatActual/listArticle', // post 获取监测文章列表
  deleteArticle: '/front/wechatActual/deleteArticle', // get 删除微信监测文章
  deleteAccount: '/front/wechatActual/deleteAccount', // get 删除微信监测文章
  listCount: '/front/wechatActual/listAccount', // post 获取监测账号列表
  getAccount: '/front/wechatActual/getAccount', // get 获取微信检测账号信息
  listArticleHistory: '/front/wechatActual/listArticleHistory', // post 获取文章行为数据列表
  listArticleChart: '/front/wechatActual/listArticleHistoryChart', // post 获取文章行为数据列表
  // 账号回溯
  getByUrlsss: '/front/review/wechat/accountUrls',
  getByUrl: '/front/review/wechat/account/url', // post 根据URL查询账号
  getByKey: '/front/review/wechat/account/keyword', // post 根据账号查询
  getBySome: '/front/review/wechat/account/batch', // post 批量查询
  addBatchAcc: '/front/review/wechat/saveBatch', // post 批量添加回溯
  // 榜单
  getCollect: '/front/follow/account/listData', // 获取收藏列表
  qyListData: '/front/wechat/ranking/qyListData', // 企业个人榜单
  qyWechat: '/front/wechat/article/getQYWechatArticle', // 企业微信榜单
  qyVideo: '/front/wechat/article/getQYWechatVideo', // 企业视频榜单
  zfListData: '/front/wechat/ranking/zfListData', // 政府榜单
  ZFWechat: '/front/wechat/article/getZFWechatArticle', // 政府文章榜单
  zfVideo: '/front/wechat/article/getZFWechatVideo', // 政府视频榜单
  addRanking: '/front/wechat/ranking/user/addRanking', // 创建/更新自定义榜单
  userData: '/front/wechat/ranking/user/listData', // 自定义榜单列表
  batchDelete: '/front/wechat/ranking/user/batchDelete', // 删除自定义榜单
  updateDateDate: '/front/wechat/ranking/updateDateDate', // 榜单更新时间
  rankArea: '/front/wechat/ranking/area', // 榜单地区
  rankType: '/front/wechat/ranking/type', // 榜单类型
  addAccount: '/front/follow/account/add', // 收藏榜单
  bizAddRanking: '/front/wechat/ranking/user/item/bizAddRanking', // 添加公众号到指定自定义榜单
  defineDeldte: '/front/follow/account/del', // 取消收藏
  userListData: '/front/wechat/ranking/userListData', // 自定义榜单
  userWechat: '/front/wechat/article/getUserWechatArticle', // 自定义文章榜单
  userVideo: '/front/wechat/article/getUserWechatVideo', // 自定义视频榜单
  itemDelete: '/front/wechat/ranking/user/item/delete', // 自定义移除单条公众号
  // 文章类别新增
  fourProsecution: '/front/HomePage/proportionOfArticleProcuratorial', // 根据biz查询该公众号文章四大检察占比
  tenBusiness: '/front/HomePage/proportionOfArticleBusiness', // 根据biz查询该公众号文章十大业务占
  checkSubscribe: '/front/wechatActual/checkSubscribe' // 判断账号是否被关注
}
