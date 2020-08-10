const path = require('path');
const gulp = require("gulp");
const webpack = require('webpack-stream');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const ts = require("gulp-typescript");
const tsconfig = require('./tsconfig.base.json');
const webpackConfOfApp = require('./webpack.config.app');
const webpackConfOfComponent = require('./webpack.config.component');
const pkg = require('./package.json');

const rootPath = __dirname;
const distPath = process.env.BUILD_SRC==='wrapper'?path.resolve(rootPath,'../../'):rootPath;
const cdnJsDir = process.env.NODE_ENV==='e2e'?path.join(distPath,`cdnjs_e2e`):path.join(distPath,`cdnjs/${pkg.version}`);

const tscTaskList = [];

const tsconfigCjs = {
  ...tsconfig,
  module: 'commonjs'
};

const tsconfigEsm = {
  ...tsconfig,
  module: 'es6'
};

const tscComponents = [
  'app',
  'auth',
  'functions',
  'storage',
  'database'
];

tscComponents.forEach(name=>{
  const componentsDir = path.resolve(__dirname,name);
  const pattern = `${componentsDir}/src/index.ts`;
  const distDir = path.join(componentsDir,'dist');
  const pkg = require(`${componentsDir}/package.json`);
  const taskClean = function(){
    return gulp.src(distDir,{
      read: false,
      allowEmpty: true
    }).pipe(clean());
  }
  tscTaskList.push(taskClean);
  const cjsName = `${/dist\/([\w\.]+)\.js$/.exec(pkg.main)[1]}.js`;
  const taskCjs = function(){
    const result = gulp.src(pattern).pipe(ts(tsconfigCjs));
    return result.js.pipe(rename(cjsName)).pipe(gulp.dest(distDir));
  }
  tscTaskList.push(taskCjs);
  if(pkg.module){
    const esmName = `${/dist\/([\w\.]+)\.js$/.exec(pkg.module)[1]}.js`;
    const taskEsm = function(){
      const result = gulp.src(pattern).pipe(ts(tsconfigEsm));
      return result.js.pipe(rename(esmName)).pipe(gulp.dest(distDir));
    }
    tscTaskList.push(taskEsm);
  }  
});

const srcDir = path.join(__dirname,'src');
const distDir = path.join(__dirname,'dist');
const pattern = `${srcDir}/index.ts`;
const taskCleanOfMain = function(){
  return gulp.src(distDir,{
    read: false,
    allowEmpty: true
  }).pipe(clean());
}
tscTaskList.push(taskCleanOfMain);
const cjsName = `${/dist\/([\w\.]+)\.js$/.exec(pkg.main)[1]}.js`;
const taskCjsOfMain = function(){
  const result = gulp.src(pattern).pipe(ts(tsconfigCjs));
    return result.js.pipe(rename(cjsName)).pipe(gulp.dest(distDir));
}
tscTaskList.push(taskCjsOfMain);
if(pkg.module){
  const esmName = `${/dist\/([\w\.]+)\.js$/.exec(pkg.module)[1]}.js`;
  const taskEsmOfMain = function(){
    const result = gulp.src(pattern).pipe(ts(tsconfigEsm));
    return result.js.pipe(rename(esmName)).pipe(gulp.dest(distDir));
  }
  tscTaskList.push(taskEsmOfMain);
}

const tscTask = gulp.series(...tscTaskList);

const buildTaskList  = [];
const buildComponents = [
  'auth',
  'functions',
  'storage',
  'database'
];
const taskOfBuildFullJs = function(){
  return gulp.src(`${rootPath}/src/index.ts`).pipe(webpack({
    ...webpackConfOfApp,
    entry: {
      'cloudbase.full.js': [
        'regenerator-runtime/runtime',
        path.resolve(rootPath,'src/index.ts')
      ]
    },
    mode: 'production'
  })).pipe(gulp.dest(cdnJsDir))
}
buildTaskList.push(taskOfBuildFullJs);

const taskOfBuildApp = function(){
  return gulp.src(`${rootPath}/app/src/index.ts`).pipe(webpack({
    ...webpackConfOfApp,
    entry: {
      'cloudbase.js': [
        'regenerator-runtime/runtime',
        path.resolve(rootPath,'app/src/index.ts')
      ]
    },
    mode: 'production'
  })).pipe(gulp.dest(cdnJsDir))
}
buildTaskList.push(taskOfBuildApp);
buildComponents.forEach(comp=>{
  const taskComp =  function(){
    return gulp.src(`${rootPath}/${comp}/src/index.ts`).pipe(webpack({
      ...webpackConfOfComponent,
      entry: {
        [`cloudbase.${comp}.js`]: path.resolve(rootPath,`${comp}/src/index.ts`)
      },
      output: {
        path: cdnJsDir,
        filename: '[name]',
        library: `cloudbase_${comp}`,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'typeof window !== "undefined"?window:this'
      },
      mode: 'production'
    })).pipe(gulp.dest(cdnJsDir))
  }
  buildTaskList.push(taskComp);
});

exports.tsc = gulp.parallel([tscTask]);
exports.cdn = gulp.parallel(buildTaskList);