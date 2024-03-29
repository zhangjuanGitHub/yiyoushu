const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 是否使用gzip
const productionGzip = true
// gzip文件后缀
const productionGzipExtensions = ['js', 'css']

const BASE_URL = process.env.NODE_ENV === 'production' ? '/yys' : '/'
// cdn预加载使用
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'element-ui': 'ELEMENT'
}
// js: [
//   'https://cdn.bootcss.com/ajax/libs/vue/2.6.10/vue.min.js',
//   'https://cdn.bootcss.com/ajax/libs/vue-router/3.0.3/vue-router.min.js',
//   'https://cdn.bootcss.com/ajax/libs/vuex/3.0.1/vuex.min.js',
//   'https://cdn.bootcss.com/ajax/libs/axios/0.21.1/axios.min.js',
//   'https://cdn.bootcss.com/element-ui/2.15.0/index.js'
//   // 'https://unpkg.com/element-ui@2.15.0/lib/index.js'
// ]
const cdn = {
  // 开发环境
  dev: {
    css: [
      'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.0/theme-chalk/index.min.css'
    ],
    js: []
  },
  // 生产环境
  build: {
    css: [
      'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.0/theme-chalk/index.min.css'
    ],
    js: [
      'https://cdn.bootcdn.net/ajax/libs/vue/2.6.10/vue.js',
      'https://cdn.bootcdn.net/ajax/libs/vue-router/3.0.3/vue-router.min.js',
      'https://cdn.bootcdn.net/ajax/libs/vuex/3.0.1/vuex.min.js',
      'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js',
      'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.0/index.min.js'
      // 'https://unpkg.com/element-ui@2.15.0/lib/index.js'
    ]
  }
}

module.exports = {
  outputDir: 'yiyoushu',
  // 打包为压缩文件Gzip
  configureWebpack: config => {
    const myConfig = {}
    if (process.env.NODE_ENV === 'production') {
      myConfig.externals = externals
      myConfig.plugins = []
      productionGzip &&
        myConfig.plugins.push(
          new CompressionWebpackPlugin({
            test: new RegExp(
              '\\.(' + productionGzipExtensions.join('|') + ')$'
            ),
            threshold: 8192,
            minRatio: 0.8
          })
        )
    }
    if (process.env.NODE_ENV === 'development') {
      /**
       * 关闭host check，方便使用ngrok之类的内网转发工具
       */
      myConfig.devServer = {
        disableHostCheck: true
      }
    }
    return myConfig
  },

  publicPath: BASE_URL,
  chainWebpack: config => {
    // 自定义配置目录别名
    config.resolve.alias.set('@', resolve('src'))
    // cdn预加载 将公共库采用CDN引入的方式减少包体积
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args
    })
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        prependData: `@import "@/assets/scss/uniform.scss";`
      }
    }
  },
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    open: false,
    port: 8080,
    proxy: {
      '/yys': {
        // target: 'http://192.168.10.7:19001', // 安豪
        target: 'http://47.93.1.52', // 线上
        // target: 'http://192.168.10.9:19001', // 李智
        // target: 'http://192.168.10.2:19001', // 东阳
        // target: 'http://192.168.10.12:19001', // 坤明
        changeOrigin: false,
        ws: true, // 是否启用websockets
        pathRewrite: {
          '^/yys': '/yys'
        }
      }
    }
  }
}
