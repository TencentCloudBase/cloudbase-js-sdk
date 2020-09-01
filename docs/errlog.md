## 更友好的错误提示

@cloudbase/js-sdk在开发环境下会将调用 API 的错误信息以更友好的方式打印到控制台，如下图所示：
![](https://main.qcloudimg.com/raw/5e8d21f2784f03501a27eba39ceb27a8.png)

图中打印的错误是当前的登录类型受到函数的安全规则限制，导致没有调用函数的权限。错误信息分为两部分：
1. 上半部分的黑色字体提示包含了后端 API 返回的错误信息以及基于此报错的一些解决方案提示；
2. 下半部分的红色字体是经优化后的错误堆栈，由于原始错误堆栈层次太深导致debug非常困难，所以此处打印的错误堆栈的第一条直接定位到 SDK 源码，第二条定位到调用报错 API 的业务源码。

### 使用方式
优化的错误提示仅在开发环境中使用，根据`process.env.NODE_ENV`判断是否为开发环境。此外，定位到 SDK 源码需要借助sourcemap。

以上两点依赖构建工具的部分特性，目前仅支持 Webpack 和 Rollup。

#### Webpack
在 Webpack 4+ 版本中可以配置`mode`选项为`development`，如下：
```js
module.exports = {
  mode: 'development'
}
```

如果是旧版本的 Webpack 需要使用[DefinePlugin](https://webpack.js.org/plugins/define-plugin/)：
```js
const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
    // ...其他插件
  ]
  // ...其他配置
}
```

然后为js的编译选项加入sourcemap预处理，这里需要使用[source-map-loader](https://github.com/webpack-contrib/source-map-loader)：
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader']
      }
      // ...其他rules
    ]
  }
  // ...其他配置
}
```

配置完成后启动webpack-dev-server即可。

#### Rollup
Rollup需要使用两个插件：
- [rollup-plugin-replace](https://github.com/rollup/rollup-plugin-replace)用来注入`process.env.NODE_ENV`
- [rollup-plugin-sourcemaps](https://github.com/maxdavidson/rollup-plugin-sourcemaps)用来加载sourcemap

配置如下：
```js
import sourcemaps from 'rollup-plugin-sourcemaps';
import replace from 'rollup-plugin-replace';
export default {
  plugins: [
    sourcemaps(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
    // ...其他插件
  ]
  // ...其他配置
};
```

配置完成使用[rollup-plugin-serve](https://github.com/thgh/rollup-plugin-serve)启动dev server即可。

