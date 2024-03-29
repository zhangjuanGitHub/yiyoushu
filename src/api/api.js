/*
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-01-28 11:13:04
 * @LastEditors: MaiChao
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
  getDrillList: '/front/monitor/weixin/drillArticleList', // post 获取钻取页面详情
  // 搜索微信账号相关信息
  collectAccount: '/front/wechat/collectAccount', // post 收录公众号
  wxSearch: '/front/HomePage/queryWxAccount', // post 搜索微信账号
  wxSearchTip: '/front/HomePage/association', // post 搜索框提示
  getWxAccount: '/front/HomePage/queryWxAccountByBiz', // get 获取微信账号信息
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
  getAllTweets: '/front/HomePage/queryAllArticles', // post 获取全部推文
  setCollect: '/front/follow/account/add', // get 添加账号收藏
  cancelCollect: '/front/follow/account/del', // get 取消账号收藏
  submitTrack: '/front/review/wechat/save', // post 添加回溯
  // 首页-微博
  wbSearch: '/front/HomePage/queryWbAccount', // post 搜索微博账号
  wbSearchTip: '/front/HomePage/wbAssociation', // post 获取微博搜索提示
  getWbHot: '/front/HomePage/wbHotArticles', // post 获取微博热文
  getWbRelease: '/front/HomePage/originalOrForward', // post 获取发布规律-发布频次
  getWbTrend: '/front/HomePage/wbTrendOfPublication', // post 获取发文趋势
  getWbReList: '/front/HomePage/microblogList', // post 获取微博列表
  getFansTrend: '/front/HomePage/fansTrend', // post 获取粉丝趋势
  getListNum: '/front/HomePage/proportionOfTypes', // post 获取微博数量
  getSomeWb: '/front/HomePage/historicalMicroblogList', // post 获取历史微博列表
  getWbAccount: '/front/HomePage/queryWbDetails', // post 获取账号信息
  getActions: '/front/HomePage/behaviorDataSummary', // post 获取历史推文行为数据
  getTotalTrend: '/front/HomePage/blogTrend', // post 获取总发博行为数据趋势
  getLikeTrend: '/front/HomePage/likeTrend', // post 获取点赞行为数据趋势
  getCommentTrend: '/front/HomePage/commentTrend', // post 获取评论行为数据趋势
  getForwardingTrend: '/front/HomePage/forwardingTrend', // post 获取转发行为数据趋势
  getTweetsDetails: '/front/HomePage/microblogDetails', // post 获取 历史推文详情
  getTweetsComment: '/front/HomePage/message', // 获取微博评论
  wbGather: '/front/HomePage/weiboNotCollect', // 申请采集微博
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
  unbindPhone: '/front/sys/user/unbindPhone', // 解绑手机号
  company: '/front/department/verify/submit', // 单位认证
  newsData: '/front/message/listData', // 消息列表
  batchRead: '/front/message/batchRead', // 读取消息更改状态
  messageRead: '/front/message/read', // 读取消息更改状态(单个)
  // 账号监测-zz
  getAccountCompany: '/front/monitor/weixin/findAccountData', // post 获取账号监测, 发布时效监测
  getSensitiveList: '/front/monitor/weixin/findErrorWord', // post 获取错敏监测列表
  getSensPie: '/front/monitor/weixin/findErrorWordNum', // post 获取错敏饼图
  getSensArticle: '/front/monitor/weixin/findErrorArticeContent', // get 获取错敏文章内容

  // 内容监测
  getAccountCompanyWb: '/front/monitor/weibo/findWeiBoAccountData', // 发布时效监测,账号检测微博博主
  findInteractivityListWb: '/front/monitor/weibo/findInteractivityList', // 内容监测 -- 互动性监测微博wb
  findAccountPertinenceWb: '/front/monitor/weibo/findAccountPertinence', // 微博 -- 文章相关性分析 列表
  findArticlePertinenceList: '/front/monitor/weibo/findArticlePertinenceList', // 微博 -- 相关性文章列表 （点击相关性列表的数字展示的文章列表）
  findArticlePertinenceChart: '/front/monitor/weibo/findArticlePertinenceChart', // 微信 -- 相关性文章详情 -- 折线图
  findArticlePertinencePieChart: '/front/monitor/weibo/findArticlePertinencePieChart', // 微信 -- 相关性文章详情 -- 饼状图

  // 账号违规监测
  findIllegalAccount: '/front/illegal/weixin/findIllegalAccount', // 账号违规监测 -- 查询监测列表
  addQueryLog: '/front/illegal/weixin/addQueryLog', // 账号违规监测 -- 添加查询记录
  delQueryLog: '/front/illegal/weixin/delQueryLog', // 账号违规监测 -- 删除查询记录
  findQueryLogList: '/front/illegal/weixin/findQueryLogList', // 账号违规监测 -- 查询记录
  addIllegalAccount: '/front/illegal/weixin/addIllegalAccount', // 账号违规监测 -- 添加账号违规监测
  delIllegalAccoun: '/front/illegal/weixin/delIllegalAccount', // 账号违规监测 -- 删除公众号
  findIllegalArticleList: '/front/illegal/weixin/findIllegalArticleList', // 账号违规监测 -- 查询违规文章列表
  // 公众号分析
  searchRecord: '/front/analyse/weixin/addQueryLog', // post 添加搜索记录
  getSearchRecord: '/front/analyse/weixin/findQueryLogList', // get 获取搜索记录
  deleteRecord: '/front/analyse/weixin/delQueryLog', // get 删除搜索记录
  addOneAnalyse: '/front/analyse/weixin/addAnalyseAccount', // post 添加账号分析
  getTaskList: '/front/analyse/weixin/findAnalyseAccount', // post 查询账号分析列表
  deleteTask: '/front/analyse/weixin/delAnalyseAccount', // post 删除任务
  // 账号分析  微博 hxx
  findAnalyseAccount: '/front/analyse/weibo/findAnalyseAccount', // 账号分析 -- 文章列表展示
  delAnalyseAccount: '/front/analyse/weibo/delAnalyseAccount', // 账号分析 - 批量删除 -- 微博
  addAnalyseAccount: '/front/analyse/weibo/addAnalyseAccount', // 账号分析 -- 添加任务
  delQueryLogWb: '/front/analyse/weibo/delQueryLog', // get 账号分析 -- 删除查询记录
  addQueryLogWb: '/front/analyse/weibo/addQueryLog', // 账号分析 -- 添加查询记录
  findQueryWb: '/front/analyse/weibo/findQueryLogList', // get 账号分析 -- 查询记录
  findAnalyseAccountWb: '/front/analyse/weibo/findAnalyseAccount', // 账号分析 -- 任务列表展示
  analyseDetailWb: '/front/analyse/weibo/findAnalyseParticulars', // get 分析详情页面wb
  findArticleBehavioralData: '/front/analyse/weibo/findArticleBehavioralData', // 分析详情 -- 文章列表 -- 微博行为数据分析
  findArticleBehavioralData2: '/front/analyse/weibo/findArticleBehavioralData', // 分析详情 -- 文章列表 -- 微博内容分析

  // 账号对比
  startCompare: '/front/comparison/weixin/findComparison', // post 账号对比
  departCompare: '/front/comparison/weixin/findUnitComparison', // post 单位对比
  getCityList: '/front/comparison/weixin/findRegion', // get 获取地区列表
  getTreeList: '/front/comparison/weixin/findDepartment', // post 根据市获取下级
  getAccountList: '/front/comparison/weixin/findAccountByDepartment', // post 根据单位查账号信息
  // 趋势查询
  behavioralData: '/front/trendQuery/behavioralData', // 趋势查询
  trendHotWords: '/front/trendQuery/hotWords', // 评论热词
  trendHotMessage: '/front/trendQuery/wxMessages', // 热门评论
  // 新账号对比
  newAccCompare: '/front/comparison/findComparison', // post 新账号对比
  getHistory: '/front/comparison/findQueryLogList', // get 查看对比历史
  addHistory: '/front/comparison/addQueryLog', // post 增加历史
  deleteHistory: '/front/comparison/delQueryLog', // get 删除对比历史
  newDepCompare: '/front/comparison/findUnitComparison', // post 单位对比
  getDepHistory: '/front/comparison/unit/findQueryLogList', // get 获取单位对比历史
  delDepHistory: '/front/comparison/unit/delQueryLog', // get 删除单位对比历史
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
  // 微博-分钟级监测
  serachWbByurl: '/front/weiboActual/searchUrl', // post 根据文章url获取信息
  startWbArticle: '/front/weiboActual/saveArticle', // post 开始文章监测
  searchWbByName: '/front/weiboActual/searchAccount', // post 根据账号获取信息
  checkWbSel: '/front/weiboActual/checkSubscribe', // post 检查微博账号是否关注
  startWbAccount: '/front/weiboActual/saveAccount', // post 开始账号监测
  wbMinuteArticle: '/front/weiboActual/listArticle', // post 获取微博文章列表
  wbMinuteAccount: '/front/weiboActual/listAccount', // post 获取微博账号列表
  delWbArticle: '/front/weiboActual/deleteArticle', // post 删除微博文章
  delWbAccount: '/front/weiboActual/deleteAccount', // post 删除微博文章
  wbMinAccount: '/front/weiboActual/getAccount',
  updateWbMin: '/front/weiboActual/updateAccount',
  wbArticle: '/front/weiboActual/getArticle',
  wbMinActionsChart: '/front/weiboActual/listArticleHistoryChart',
  wbMinActionList: '/front/weiboActual/listArticleHistory',
  wbMinComments: '/front/weiboActual/commentInformation',
  // 微信预警
  // pushPage: '/front/early/warning/article/listByUser', // post H5查看文章接口 推送文章
  wechatWarning: '/front/early/warning/account/list', // post 获取账号预警列表 √
  keyWordsList: '/front/early/warning/key/list', // post 获取关键词列表 √
  hitArticleList: '/front/early/warning/article/list', // post  获取命中文章列表 √
  deleteKeyword: '/front/early/warning/key/delete', // get 账号关键词删除 √
  saveKeyWords: '/front/early/warning/key/save', // post 添加修改关键词 √
  accountStart: '/front/early/warning/account/start', // get 账号预警开始 √
  accountStop: '/front/early/warning/account/stop', // get 账号预警停止 √
  accountChange: '/front/early/warning/account/change', // post 账号预警添加以及变更
  allAccount: '/front/early/warning/account/allAccount', // get 账号名称 √
  keyDetail: '/front/early/warning/key/get', // get 账号关键词详情
  // 全局账号信息
  classification: '/front/GlobalInformation/classification', // get 获取登录账号的类别和职能
  accountInformation: '/front/GlobalInformation/accountInformation', // post 获取全局账号信息
  articleInformation: '/front/GlobalInformation/articleInformation', // post 获取全局文章信息
  sameAccountInformation: '/front/GlobalInformation/accountByAuthInfo', // post 获取全局账号信息 同主体账号

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
  addRanking: '/front/wechat/ranking/user/addRanking', // 创建/更新自定义榜单 --
  userData: '/front/wechat/ranking/user/listData', // 自定义榜单列表 --
  batchDelete: '/front/wechat/ranking/user/batchDelete', // 删除自定义榜单
  updateDateDate: '/front/wechat/ranking/updateDateDate', // 榜单更新时间
  rankArea: '/front/wechat/ranking/area', // 榜单地区
  rankType: '/front/wechat/ranking/type', // 榜单类型
  addAccount: '/front/follow/account/add', // 收藏榜单 --
  bizAddRanking: '/front/wechat/ranking/user/item/bizAddRanking', // 添加公众号到指定自定义榜单
  defineDeldte: '/front/follow/account/del', // 取消收藏 --
  userListData: '/front/wechat/ranking/userListData', // 自定义榜单
  userWechat: '/front/wechat/article/getUserWechatArticle', // 自定义文章榜单
  userVideo: '/front/wechat/article/getUserWechatVideo', // 自定义视频榜单
  itemDelete: '/front/wechat/ranking/user/item/delete', // 自定义移除单条公众号
  // 微博榜单
  rankAreaWb: '/front/weibo/ranking/area', // 微博榜单地区
  wbRank: '/front/weibo/ranking/area', // 微博榜单地区
  zfWbListData: '/front/weibo/ranking/zfListData', // 微博政府榜单
  zfArticleWb: '/front/weibo/article/getZFWechatArticle', // 微博政府文章榜单
  zfVideoWb: '/front/weibo/article/getZFWechatVideo', // 微博政府视频榜单
  qyWbListData: '/front/weibo/ranking/qyListData', // 微博企业榜单

  getQYWeiboArticle: '/front/weibo/article/getQYWeiboArticle', // 微博企业文章
  getQYWeiboVideo: '/front/weibo/article/getQYWeiboVideo', // 微博企业视频

  userWbListData: '/front/weibo/ranking/userListData', // 微博自定义榜单

  followUserWb: '/front/follow/account/listData', // 自定义榜单-添加-收藏列表
  getByKeyWb: '/front/weibo/ranking/account/keyword', // 自定义榜单-微博添加-账号查找
  userWbArticleData: '/front/weibo/article/getUserArticle', // 自定义榜单 微博文章
  userWbVideoData: '/front/weibo/article/getUserVideo', // 自定义榜单 微博视频列表
  wbType: '/front/weibo/ranking/type', // get 榜单获取类别

  accountUrlsWb: '/front/weibo/ranking/accountUrls', // 自定义添加账号根据url 添加账号
  // 正义网榜单
  getInfoWx: '/front/wechat/weight/seeting/getInfo', // get 微信榜单权重
  getInfoWb: '/front/weibo/weight/seeting/getInfo', // get 微博榜单权重
  saveInfoWx: '/front/wechat/weight/seeting/save', // 微信权重保存
  saveInfoWb: '/front/weibo/weight/seeting/save', // 微博权重保存
  saveRanking: '/front/ranking/weight/save', // 生成榜单
  rankingList: '/front/ranking/weight/list', // 榜单列表
  rankingListDelete: 'front/ranking/weight/delete', // get 榜单列表删除
  getRankingHead: '/front/ranking/weight/get', // get 单个榜单数据获取 表头
  rankingWxList: '/front/ranking/weight/wechat/score/list', // 正义榜微信榜单列表
  rankingWbList: '/front/ranking/weight/weibo/score/list', // 正义榜微博榜单列表
  rankingWxExport: '/front/ranking/weight/wechat/score/export', // 正义榜微信榜单列表导出
  rankingWbExport: '/front/ranking/weight/weibo/score/export', // 正义榜微博榜单列表导出
  rankingWxExportInfo: '/front/ranking/weight/wechat/score/exportInfo', // 正义榜微信榜单原始列表导出
  rankingWbExportInfo: '/front/ranking/weight/weibo/score/exportInfo', // 正义榜微博榜单原始列表导出

  // 菜单控制
  menuPermission: '/front/menuPermission/query', // 榜单菜单权限控制

  // 文章类别新增
  fourProsecution: '/front/HomePage/proportionOfArticleProcuratorial', // 根据biz查询该公众号文章四大检察占比
  tenBusiness: '/front/HomePage/proportionOfArticleBusiness', // 根据biz查询该公众号文章十大业务占
  checkSubscribe: '/front/wechatActual/checkSubscribe', // 判断账号是否被关注

  // 头条
  // 账号监测 头条
  findAccountData: '/front/monitor/toutiao/findAccountData', // post 获取账号监测, 发布时效监测  level:1 单位
  findInteractivityListToutiao: '/front/monitor/toutiao/findInteractivityList', // 内容监测 -- 互动性监测
  toutiaofindAccountPertinence: '/front/monitor/toutiao/findAccountPertinence', // 头条 -- 文章相关性分析 列表
  findArticlePertinenceListToutiao: '/front/monitor/toutiao/findArticlePertinenceList', // 头条-- 相关性文章列表 （点击相关性列表的数字展示的文章列表）
  findArticlePertinenceChartToutiao: '/front/monitor/toutiao/findArticlePertinenceChart', // 相关性文章详情 --折线图
  findArticlePertinencePieChartToutiao: '/front/monitor/toutiao/findArticlePertinencePieChart', // 相关性文章详情 --饼状图
  // 首页 头条
  ttHotArticles: '/front/HomePage/ttHotArticles', // 头条热文
  ttAssociation: '/front/HomePage/ttAssociation', // 头条账号搜索联想词
  queryTtAccount: '/front/HomePage/queryTtAccount', // 首页头条账号搜索
  ttTrendOfPublication: '/front/HomePage/ttTrendOfPublication', // 头条-发布规律-发文趋势
  ttFansTrend: '/front/HomePage/ttFansTrend', // 头条-发布规律-粉丝趋势
  ttTypeRatio: '/front/HomePage/ttTypeRatio', // 头条-文章类别-文章占比 0 ： 文章  1 视频 2 ：小视频 3 微头条
  ttDailyNumberOfPapers: '/front/HomePage/ttDailyNumberOfPapers', // 头条-文章类别-发文趋势
  queryTtArticleByUserIdAndType: '/front/HomePage/queryTtArticleByUserIdAndType', // 头条-文章类别-头条列表  历史推文-历史头条列表
  ttProportionOfTypes: '/front/HomePage/ttProportionOfTypes', // 头条-文章类别-文章类别数量
  // queryTtArticleByUserIdAndType: '/front/HomePage/queryTtArticleByUserIdAndType', // 头条-历史推文-历史头条列表
  ttDetails: '/front/HomePage/ttDetails', // 头条-历史推文-文章详情
  ttMessage: '/front/HomePage/ttMessage', // 头条-历史推文-留言
  queryTtDetails: '/front/HomePage/queryTtDetails', // 首页-头条账号详细信息
  ttBehaviorDataSummary: '/front/HomePage/ttBehaviorDataSummary', // 基础数据服务-数据统计
  ttReadTrend: '/front/HomePage/ttReadTrend', // 基础数据服务-阅读数统计
  ttCommentTrend: '/front/HomePage/ttCommentTrend', // 基础数据服务-评论趋势
  ttForwardTrend: '/front/HomePage/ttForwardTrend', // 基础数据服务-转发趋势
  ttDiggTrend: '/front/HomePage/ttDiggTrend', // 基础数据服务-点赞趋势
  searchWeiboArticle: '/front/HomePage/home/searchWeiboArticle', // 微博查询
  searchToutiaoArticle: '/front/HomePage/home/searchToutiaoArticle', // 头条查询
  toutiaoNotCollect: 'front/HomePage/toutiaoNotCollect', // 申请采集
  // 头条榜单
  keywordToutiao: '/front/toutiao/ranking/account/keyword', // 自定义榜单-添加-账号查找
  listDataToutiao: '/front/follow/account/listData', // 自定义榜单-添加-收藏列表 isExist ： 标记是否被次榜单收藏 （rankingUserId 不为空 才有值）
  deleteToutiao: '/front/wechat/ranking/user/item/delete', // get 自定义移除单条公众号
  delToutiao: '/front/follow/account/del', // get  取消收藏
  addToutiao: '/front/follow/account/add', // get  收藏
  getUserToutiaoVideo: '/front/toutiao/article/getUserVideo', // 自定义榜单 视频列表
  getZFToutiaoVideo: '/front/toutiao/article/getZFToutiaoVideo', // 政府视频列表
  getZFToutiaoArticle: '/front/toutiao/article/getZFToutiaoArticle', // 政府文章列表
  getQYToutiaoVideo: '/front/toutiao/article/getQYToutiaoVideo', // 企业视频文章
  getQYToutiaoArticle: '/front/toutiao/article/getQYtoutiaoArticle', // 企业文章
  getUserToutiaoArticle: '/front/toutiao/article/getUserArticle', // 自定义榜单 文章
  userToutiaoListData: '/front/toutiao/ranking/userListData', // 自定义榜单
  qyToutiaoListData: '/front/toutiao/ranking/qyListData', // 企业榜单
  zfToutiaoListData: '/front/toutiao/ranking/zfListData', // 政府榜单

  // 头条账号分析
  findQueryToutiao: '/front/analyse/toutiao/findQueryLogList', // get 账号分析 -- 查询记录
  addQueryLogToutiao: '/front/analyse/toutiao/addQueryLog', // 账号分析 -- 添加查询记录
  delQueryLogToutiao: '/front/analyse/toutiao/delQueryLog', // get 账号分析 -- 删除查询记录
  addAnalyseAccountToutiao: '/front/analyse/toutiao/addAnalyseAccount', // 账号分析 -- 添加任务
  delAnalyseAccountToutiao: '/front/analyse/toutiao/delAnalyseAccount', // 账号分析 - 批量删除
  findAnalyseAccountToutiao: '/front/analyse/toutiao/findAnalyseAccount', // 账号分析 -- 任务列表展示
  findArticleBehavioralDataToutiao: '/front/analyse/toutiao/findArticleBehavioralData', // 分析详情 -- 文章列表 -- 内容分析
  findArticleBehavioralData3: '/front/analyse/toutiao/findArticleBehavioralData', // 分析详情 -- 文章列表 -- 行为数据分析
  findAnalyseParticulars: '/front/analyse/toutiao/findAnalyseParticulars' // get 分析详情页面
}
