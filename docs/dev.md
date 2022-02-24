## 开发指南

此项目是由[Lerna](https://github.com/lerna/lerna)管理的 [monorepos](https://github.com/babel/babel/blob/master/doc/design/monorepo.md)，需要在开发之前安装 Lerna：

```bash
npm install --global lerna
```

### 注意

当前 SDK 存在从 1.x 版本至 2.x 版本的大版本升级（未完全兼容），开发时请按分支区分

1.x 版本主分支 master

2.x 版本主分支 feature/support_oauth2

### 安装依赖

clone 项目到本地后首先执行以下命令：

```bash
lerna bootstrap
```

### 构建

在根目录下运行：

```bash
npm run build
```

### 测试

#### E2E 测试

```bash
npm run test:e2e
```

#### Web 端仿真测试

##### 准备工作

项目根目录下创建文件`test.config.js`，配置测试所需的信息，如下：

```js
/**
 * 测试配置
 */
module.exports = {
	// 环境id
	env: "",
	// 微信公众号appid，仅当需要测试微信登录时配置
	appid: "",
	// 获取自定义登录ticket的函数http访问地址，仅当需要测试自定义登录时配置
	authFnUrl: "",
	// 用户名密码登录-用户名，仅当需要测试用户名登录时配置
	authUsername: "",
	// 用户名密码登录-密码，仅当需要测试用户名登录时配置
	authPassword: ""
}
```

**请注意**，`auth`相关的测试 case 同时只能开启一种登录类型，请修改`test/web/index.js`文件的`init()`函数中的登录类型。

##### 启动 dev server

Web 仿真测试会在本机的 80 端口开启一个 server，需要 sudo 权限：

```bash
sudo npm run test:web
```

##### 启动测试

浏览器或微信开发者工具（公众号网页开发模式）打开链接`jimmytest-088bef.tcb.qcloud.la`即可开启仿真测试页面，测试结果在控制台打印。

### 发布

#### 发布 beta 版本

```bash
npm run publish:beta
```

#### 发布正式版本

```bash
npm run publish
```

发布过程中需要为每个包选择版本号。

#### 添加新包

项目下新增包时，需要 lerna add 新包名 --scope=@cloudbase/js-sdk
