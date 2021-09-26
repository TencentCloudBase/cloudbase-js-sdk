## 更新日志


### 1.3.3beta

1. 三方登录开放 `provider_access_token` 和 `provider_id_token`


### 1.2.3

1. OAuth2Client 增加 hasCredentials 方法，判断是否存在 credentials（不校验有限性也不触发 refresh token）
2. 增加 LocalCredentials 管理 credentials， 简化 OAuth2Client 代码逻辑

### 1.1.3

1. 修复 getAccessToken 方法获取不到 refresh 之后的 token 的 bug
2. 增加 SinglePromise 模块

### 1.0.12

1. 添加 ErrorType enum

### 1.0.11

1. OAuth2Client 中 refresh token，如果请求返回的 error 为 invalid_grant 时，删除本地 token
2. OAuth2Client 中，对 defaultRequest 的 options 数据进行拷贝，避免修改了传入的参数数据

### 1.0.9

1. 代码格式化
