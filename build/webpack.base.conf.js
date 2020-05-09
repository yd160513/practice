'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,

    // 生成的 js 文件名称
    filename: '[name].js',

    // 把组件按组分块
    chunkFilename: '[name].js',

    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath :
      config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      // ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        // 只有 js 文件才使用 babel
        test: /\.js$/,
        // 将 babel 编译过的文件缓存起来，下次只需要编译更改过的代码文件即可
        loader: 'babel-loader?cacheDirectory=true',
        // loader: 'babel-loader?id=happybabel', // id 对应下边 HappyPack 的 id
        // 只在 这些目录下查找
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
        // 不会去查找的路径
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // 因为 Node 是单线程运行的，所以 webpack 打包时也是单线程的，HappyPack 可以将 Load儿的同步执行转换为并行的
  plugins: [
    // new HappyPack({
    //   id: 'happybabel',
    //   loaders: ['babel-loader?cacheDirectory'],
    //   // 开启四个线程
    //   threads: 4
    // }),
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   // manifest 就是之前打包出来的 json 文件
    //   manifest: require('./dist/vendor-manifest.json')
    // })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
