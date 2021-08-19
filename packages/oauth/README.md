# Oauth

提供 oauth2 的登录相关功能。

## 主要模块

OAuth2Client oauth2 基础模块

Auth 登录相关模块

## 使用示例

### 初始化对象

```typescript
const authOptions = {
  apiOrigin: '服务域名',
  clientId: '客户端ID',
};
const auth = new Auth(authOptions);
```
