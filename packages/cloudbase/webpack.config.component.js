const path = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
// const Visualizer = require('webpack-visualizer-plugin');
const pkg = require('./package.json');

const rootPath = path.resolve(__dirname,'../../');
// const cdnJsDir = path.join(rootPath,`cdnjs/${pkg.version}`);

const alias = {};
Object.keys(pkg.dependencies || {}).forEach(dep=>{
  alias[dep] = path.join(rootPath,`node_modules/${dep}`);
});

module.exports = {
  mode: 'production',
  target: 'web',
  module: {
    rules: [{
      test: /\.ts$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { modules: false }]
          ]
        }
      },'awesome-typescript-loader']
    },{
      test: /\.js$/,
      use: ['babel-loader']
    }]
  },
  resolve: {
    alias,
    extensions: ['.ts', '.js', '.json']
  },
  plugins: [
    new TsConfigPathsPlugin({
      configFileName: path.resolve(__dirname,'tsconfig.json')
    }),
    // new Visualizer({
    //   filename: './statistics.html'
    // })
  ],
  optimization: {
    sideEffects: false
  },
  externals: { crypto: 'null'}
}