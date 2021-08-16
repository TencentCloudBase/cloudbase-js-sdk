# Oauth

提供 oauth2 的登录相关功能。

## 主要模块

OAuth2Client oauth2 基础模块

Auth 登录相关模块

## 使用示例

### 初始化对象

```typescript
const oAuth2ClientOptions = {
  apiOrigin: '服务域名',
  clientId: '客户端ID',
};
const oAuth2Client = new OAuth2Client(oAuth2ClientOptions);
const baseRequest = new captcha(
  oAuth2ClientOptions.apiOrigin,
  oAuth2ClientOptions.clientId,
  oAuth2Client.request.bind(oAuth2Client),
).request;
const authOptions = {
  clientId: oAuth2ClientOptions.clientId,
  credentialsClient: oAuth2Client,
  request: baseRequest,
};
const auth = new Auth(authOptions);
```

### 账号登录

```typescript
auth.signIn({
  username: 'test',
  password: 'test',
});
```

### 手机验证码登录/注册

```typescript
const phoneNumber = '10012341234';
// 短信验证码
const verificationCode = '******';
const verification = await auth.getVerification({
  phone_number: '+86 ' + phoneNumber,
  target: 'ANY',
});

let verifyResult = await auth.verify({
  verification_code: verificationCode,
  verification_id: verification ? verification.verification_id : '',
});
let isUser = verification ? verification.is_user : false;

let result;
if (isUser) {
  result = await auth.signIn({
    username: '+86 ' + phoneNumber,
    verification_code: verificationCode,
    verification_token: verifyResult.verification_token,
  });
} else {
  result = await auth.signUp({
    phone_number: '+86 ' + phoneNumber,
    password: '*******',
    verification_code: verificationCode,
    verification_token: verifyResult.verification_token,
    local: 'zh-cn',
    name: '100****1234',
  });
}
```

### 错误处理

```typescript
try {
  await auth.verify({
    verification_code: verificationCode,
    verification_id: verification ? verification.verification_id : '',
  });
} catch (error) {
  if (error && error.error_uri === '/v1/auth/verification/verify') {
    switch (error.error) {
      case 'not_found': {
        result = i18n.translate('error', 'User Not Found');
        break;
      }
      case 'invalid_password': {
        if (error.details !== undefined && error.details.length > 0) {
          result =
            i18n.translate('error', 'Certification failed, you still have') +
            error.details[0].limit_remaining +
            i18n.translate('error', 'chances. You can also') +
            '' +
            i18n.translate('error', 'Reset Login Password') +
            '</a>';
        } else {
          result = i18n.translate('error', 'Password does not match');
        }
        break;
      }
      case 'user_pending': {
        result = i18n.translate('error', 'The account is not activated');
        break;
      }
      case 'user_blocked': {
        result = i18n.translate('error', 'Account has been disabled');
        break;
      }
      case 'invalid_status': {
        if (error.details !== undefined && error.details.length > 0) {
          let s = error.details[0].retry_delay;
          s = s.substring(0, s.length - 1);
          s = parseInt(s);
          result =
            i18n.translate(
              'error',
              'The password input error has reached the upper limit and the account will be locked ',
            ) +
            (s < 3600
              ? s / 60 + i18n.translate('error', 'minute')
              : s / 3600 + i18n.translate('error', 'hour'));
        } else {
          result = i18n.translate(
            'error',
            'Account has been temporarily locked',
          );
        }
        break;
      }
      case 'invalid_two_factor': {
        result = i18n.translate(
          'error',
          'Secondary authentication code does not match or has expired',
        );
        break;
      }
      case 'invalid_two_factor_recovery': {
        result = i18n.translate(
          'error',
          'Recovery code does not match or has expired',
        );
        break;
      }
      default: {
        result = i18n.translate('error', 'unknown');
        break;
      }
    }
  }
}
```