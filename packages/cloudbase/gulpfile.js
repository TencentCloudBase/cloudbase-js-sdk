const path = require('path');
const gulp = require('gulp');
const merge = require('merge-stream');
const webpackStream = require('webpack-stream');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const Visualizer = require('webpack-visualizer-plugin');
const tsconfig = require('./tsconfig.base.json');
const webpackConfOfApp = require('./webpack.config.app');
const webpackConfOfComponent = require('./webpack.config.component');
const pkg = require('./package.json');

const rootPath = __dirname;
// cdn构建输出根路径：BUILD_SRC=wrapper时输出到外层目录，否则输出到当前目录
const cdnJsRootPath = process.env.BUILD_SRC === 'wrapper' ? path.resolve(rootPath, '../../') : rootPath;
const cdnJsDir = process.env.NODE_ENV === 'e2e' ? path.join(cdnJsRootPath, `cdnjs_e2e`) : path.join(cdnJsRootPath, `cdnjs/${pkg.version}`);
// 小程序文件输出路径
const miniappDistDir = `${rootPath}/${pkg.miniprogram}`;

// tsc task列表
const tscTaskList = [];

const tsconfigCjs = {
  ...tsconfig,
  module: 'commonjs'
};

const tsconfigEsm = {
  ...tsconfig,
  module: 'es6'
};

const tscComponents = ['app', 'auth', 'functions', 'storage', 'database', 'realtime', 'analytics'];

tscComponents.forEach(name => {
  const componentsDir = path.resolve(__dirname, name);
  const pattern = `${componentsDir}/src/index.ts`;
  const distDir = path.join(componentsDir, 'dist');
  const pkg = require(`${componentsDir}/package.json`);
  const taskClean = function() {
    return gulp
      .src(distDir, {
        read: false,
        allowEmpty: true
      })
      .pipe(clean());
  };
  tscTaskList.push(taskClean);
  // const cjsName = `${/dist\/([\w\.]+)\.js$/.exec(pkg.main)[1]}.js`;
  const taskCjs = function() {
    const result = gulp
      .src(pattern)
      .pipe(sourcemaps.init())
      .pipe(ts(tsconfigCjs));

    return merge(result, result.js)
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(distDir));
  };
  tscTaskList.push(taskCjs);
  if (pkg.module) {
    const esmName = `${/dist\/([\w\.]+)\.js$/.exec(pkg.module)[1]}.js`;
    const taskEsm = function() {
      const result = gulp
        .src(pattern)
        .pipe(sourcemaps.init())
        .pipe(ts(tsconfigEsm));
      return result.js
        .pipe(rename(esmName))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(distDir));
    };
    tscTaskList.push(taskEsm);
  }
});

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');
const pattern = `${srcDir}/index.ts`;
const taskCleanOfMain = function() {
  return gulp
    .src(distDir, {
      read: false,
      allowEmpty: true
    })
    .pipe(clean());
};
tscTaskList.push(taskCleanOfMain);
const cjsName = `${/dist\/([\w\.]+)\.js$/.exec(pkg.main)[1]}.js`;
const taskCjsOfMain = function() {
  const result = gulp
    .src(pattern)
    .pipe(sourcemaps.init())
    .pipe(ts(tsconfigCjs));
  return result.js
    .pipe(rename(cjsName))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(distDir));
};
tscTaskList.push(taskCjsOfMain);
if (pkg.module) {
  const esmName = `${/dist\/([\w\.]+)\.js$/.exec(pkg.module)[1]}.js`;
  const taskEsmOfMain = function() {
    const result = gulp
      .src(pattern)
      .pipe(sourcemaps.init())
      .pipe(ts(tsconfigEsm));
    return result.js
      .pipe(rename(esmName))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(distDir));
  };
  tscTaskList.push(taskEsmOfMain);
}

const tscTask = gulp.series(...tscTaskList);

// cdn task列表
const cdnTaskList = [];
// 小程序 task 列表
const miniappTaskList = [];
const cdnComponents = ['auth', 'functions', 'storage', 'database', 'realtime', 'analytics'];

cdnTaskList.push(function taskOfBuildFullJs() {
  return gulp
    .src(`${rootPath}/src/index.ts`)
    .pipe(
      webpackStream({
        ...webpackConfOfApp,
        entry: {
          'cloudbase.full.js': ['regenerator-runtime/runtime', path.resolve(rootPath, 'src/index.ts')]
        },
        mode: 'production',
        plugins: [
          ...webpackConfOfApp.plugins,
          new Visualizer({
            filename: `./statistics-full.html`
          })
        ]
      })
    )
    .pipe(gulp.dest(cdnJsDir));
});

miniappTaskList.push(function taskOfBuildMiniappFullJs() {
  return gulp
    .src(`${rootPath}/src/index.ts`)
    .pipe(
      webpackStream({
        ...webpackConfOfApp,
        entry: {
          'index.js': ['regenerator-runtime/runtime', path.resolve(rootPath, 'src/index.ts')]
        },
        mode: 'production'
      })
    )
    .pipe(gulp.dest(miniappDistDir));
});

cdnTaskList.push(function taskOfBuildAppJs() {
  return gulp
    .src(`${rootPath}/app/src/index.ts`)
    .pipe(
      webpackStream({
        ...webpackConfOfApp,
        entry: {
          'cloudbase.js': ['regenerator-runtime/runtime', path.resolve(rootPath, 'app/src/index.ts')]
        },
        mode: 'production',
        plugins: [
          ...webpackConfOfApp.plugins,
          new Visualizer({
            filename: `./statistics-app.html`
          })
        ]
      })
    )
    .pipe(gulp.dest(cdnJsDir));
});

miniappTaskList.push(function taskOfBuildApp() {
  return gulp
    .src(`${rootPath}/app/src/index.ts`)
    .pipe(
      webpackStream({
        ...webpackConfOfApp,
        entry: {
          'app.js': ['regenerator-runtime/runtime', path.resolve(rootPath, 'app/src/index.ts')]
        },
        mode: 'production'
      })
    )
    .pipe(gulp.dest(miniappDistDir));
});

cdnTaskList.push(
  ...cdnComponents.map(comp => {
    return function taskCompJs() {
      return gulp
        .src(`${rootPath}/${comp}/src/index.ts`)
        .pipe(
          webpackStream({
            ...webpackConfOfComponent,
            entry: {
              [`cloudbase.${comp}.js`]: path.resolve(rootPath, `${comp}/src/index.ts`)
            },
            output: {
              path: cdnJsDir,
              filename: '[name]',
              library: `cloudbase_${comp}`,
              libraryTarget: 'umd',
              umdNamedDefine: true,
              globalObject: 'typeof window !== "undefined"?window:this'
            },
            mode: 'production',
            plugins: [
              ...webpackConfOfApp.plugins,
              new Visualizer({
                filename: `./statistics-${comp}.html`
              })
            ]
          })
        )
        .pipe(gulp.dest(cdnJsDir));
    };
  })
);

miniappTaskList.push(
  ...cdnComponents.map(comp => {
    return function taskComp() {
      return gulp
        .src(`${rootPath}/${comp}/src/index.ts`)
        .pipe(
          webpackStream({
            ...webpackConfOfComponent,
            entry: {
              [`${comp}.js`]: path.resolve(rootPath, `${comp}/src/index.ts`)
            },
            output: {
              path: miniappDistDir,
              filename: '[name]',
              library: `cloudbase_${comp}`,
              libraryTarget: 'umd',
              umdNamedDefine: true,
              globalObject: 'typeof window !== "undefined"?window:this'
            },
            mode: 'production'
          })
        )
        .pipe(gulp.dest(miniappDistDir));
    };
  })
);

exports.build = gulp.parallel([tscTask, miniappTaskList]);
// debug
// exports.build = gulp.parallel([tscTask]);
exports.cdn = gulp.parallel(cdnTaskList);

exports.e2e = gulp.parallel([tscTask, miniappTaskList, cdnTaskList]);
