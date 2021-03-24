# 更新日志

## 说明

遵守规范：[keepachangelog](https://keepachangelog.com/zh-CN/1.0.0/)

### 变动类型

- `Added` 新添加的功能。
- `Changed` 对现有功能的变更。
- `Deprecated` 已经不建议使用，准备很快移除的功能。
- `Removed` 已经移除的功能。
- `Fixed` 对bug的修复
- `Security` 对安全的改进

## [1.4.1] 2021-03-08
- [Fixed] 修复上传文件进度获取异常 bug

## [1.4.0] 2020-12-16
- [Added] 新增 analytics 接口

## [1.3.3] 2020-09-25
- [Changed] 优化 TypeScript 语法提示
- [Fixed] 修复未登录调用数据库报错问题

## [1.3.2] 2020-09-24
- [Fixed] 微信小程序插件环境获取 appSign 取插件 AppId
- [Fixed] storage 满仓情况下写入抛出错误

## [1.3.1] 2020-09-23
- [Fixed] 兼容微信小程序插件环境

## [1.3.0] 2020-09-11
- [Changed] 数据库实时推送功能抽离为独立的模块

## [1.2.5] 2020-09-07
- [Fixed] 修复微信小程序真机环境报错

## [1.2.3] 2020-09-03
- [Changed] 优化 API 语法提示

## [1.2.2] 2020-09-01
- [Changed] 优化开发环境的错误信息

## [1.2.1] 2020-08-26
- [Added] 新增 `Auth.getAuthHeaderAsync` API

## [1.1.4] 2020-08-25
- [Fixed] 修复微信公众号登录 Bug
- [Fixed] 修复微信小程序上传文件 Bug

## [1.1.2] 2020-08-24
- [Fixed] 修复小程序无法直接引用 npm 包问题

## [1.1.1] 2020-08-19
- [Fixed] 修复用户名密码登录bug

## [1.1.0] 2020-08-18
- [Added] 增加 `cloudbase.registerSdkName` API

## [1.0.4] 2020-08-13
- [Fixed] 修复实时推送多环境混淆问题

## [1.0.3] 2020-08-11
- [Fixed] 修复由 Crypto-JS 引起的打包体积过大问题

## [1.0.2] 2020-08-10
- [Changed] 优化版本统计信息

## [1.0.1] 2020-08-05
- [Fixed] `Storage.downloadFile` 可将文件直接下载到本地

## [1.0.0] 2020-07-31
- [Added] 发布 1.0.0 版本，旧版本 SDK [tcb-js-sdk](https://github.com/TencentCloudBase/tcb-js-sdk) 未来不再增加新功能
