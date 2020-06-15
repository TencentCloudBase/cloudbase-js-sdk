const path = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
// const Visualizer = require('webpack-visualizer-plugin');
const pkg = require('./package.json');

const rootPath = __dirname;
const distPath = process.env.BUILD_SRC==='wrapper'?path.resolve(rootPath,'../../'):rootPath;
const cdnJsDir = path.join(distPath,`cdnjs/${pkg.version}`);

const alias = {};
Object.keys(pkg.dependencies || {}).forEach(dep=>{
  alias[dep] = path.join(rootPath,`node_modules/${dep}`);
});

module.exports = {
  mode: 'production',
  output: {
    path: distPath,
    filename: '[name]',
    library: 'cloudbase',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'typeof window !== "undefined"?window:this'
  },
  // target: 'web',
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: [/node_modules/],
      use: ['babel-loader','awesome-typescript-loader']
    },{
      test: /\.js$/,
      exclude: [/node_modules/],
      use: ['babel-loader']
    },{
      test: /package\.json$/,
      loader: 'package-json-cleanup-loader',
      options: {
        only: ['version']
      }
    }],
    noParse: [
      /sjcl\.js$/,
    ]
  },
  resolve: {
    alias,
    extensions: ['.ts', '.js', '.json']
  },
  plugins: [
    new TsConfigPathsPlugin({
      configFileName: path.resolve(rootPath,'tsconfig.json')
    }),
    // new Visualizer({
    //   filename: './statistics.html'
    // })
  ],
  externals: { crypto: 'crypto'}
}