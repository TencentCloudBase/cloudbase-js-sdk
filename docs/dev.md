## 开发指南

此项目是由[Lerna](https://github.com/lerna/lerna)管理的 [monorepos](https://github.com/babel/babel/blob/master/doc/design/monorepo.md)，需要在开发之前安装Lerna：
```bash
npm install --global lerna
```

### 安装依赖
clone项目到本地后首先执行以下命令：
```bash
lerna bootstrap
```

### 测试
#### E2E测试
```bash
npm run test:e2e
```

#### Web端仿真测试
Web仿真测试会在本机的80端口开启一个server，需要 sudo 权限：
```bash
sudo npm run test:web
```

浏览器或微信开发者工具（公众号网页开发模式）打开链接`jimmytest-088bef.tcb.qcloud.la`即可开启仿真测试页面，测试结果在控制台打印。

### 发布
#### 发布beta版本
```bash
npm run publish:beta
```
#### 发布正式版本
```bash
npm run publish
```
