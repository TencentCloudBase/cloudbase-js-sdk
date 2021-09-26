## cloudbase sdk 更新内容

### 自动模块化的SDK

参考 Firebase v9, 所有的sdk 在同一个仓库, 维护全局App对象，其他对象根据

```typescript
import {initializeApp} from '@clodbasesdk/js-sdk/app';
import {getFunction} from '@clodbasesdk/js-sdk/functions';
import {getAuth} from '@xbasesdk/js-sdk/auth';
export const config = {
    env: 'env-4gh5dh6nf62145a9'
};
const app = initializeApp(config)
const auth = getAuth(app)
const functions = getFunction(app)
export {app, auth, functions}
// 调用API
const loginState = await client.auth.hasLoginState()
// 获取 accessToken
const accessToken =  await client.oAuth2Client.getAccessToken();
// 用 OIDC Token 用自己的API
export interface ExampleData {
    result?: string;
}
const data = await client.oAuth2Client.request<ExampleData>("https://example.com", {withCredentials:true})
console.log(data.result)
```

### 初始化SDK

默认情况下，在Web端，你可以采用以下初始化方式。

```typescript
import {initializeApp} from '@clodbasesdk/js-sdk/app';
import {getFunction} from '@clodbasesdk/js-sdk/functions';
import {getAuth} from '@xbasesdk/js-sdk/auth';
const config = {
    env: 'env-4gh5dh6nf62145a9'
};
const app = initializeApp(config)
```

在微信小程序等其他端，则可以使用对应的插件或自己实现三个方法，比如：

```typescript
import {initializeApp} from '@clodbasesdk/js-sdk/app';
import {initializeConfig} from '@clodbasesdk/plugins/wechat';
let config = {
    env: 'env-4gh5dh6nf62145a9'
};
config = initializeConfig(config)
const app = initializeApp(config)
```

### 文档

核心变更：

利用OAuht

### 关于SDK

### 登录认证



### 重置密码

### 修改个人资料

### 修改密码

### Demo

