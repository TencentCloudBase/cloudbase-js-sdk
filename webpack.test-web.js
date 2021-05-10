const webpack = require("webpack")

const modName = "cloudbase"

module.exports = {
  entry: [
    // 给webpack-dev-server启动一个本地服务，并连接到8080端口
    // 'webpack-dev-server/client?http://localhost:8080',

    // 给上面启动的本地服务开启自动刷新功能，'only-dev-server'的'only-'意思是只有当模块允许被热更新之后才有热加载，否则就是整页刷新
    // 'webpack/hot/only-dev-server',

    "./test/web/index.js"
  ],
  mode: "development",
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    hot: true,
    // host: 'jimmytest-088bef.tcb.qcloud.la',
    // host: "leenzhang1.elementtest.org",
    host: "www.wilsonsliu.cn",
    port: 80,
    open: false,
    inline: true,
    clientLogLevel: "error",
    disableHostCheck: true,
    contentBase: "./test/web",
    watchContentBase: false,
    index: "index.html",
    publicPath: "/"
  },
  output: {
    filename: `./test.js`
    // library: modName,
    // libraryTarget: 'umd',
    // umdNamedDefine: true
  },
  resolve: {
    extensions: [".js"]
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}
