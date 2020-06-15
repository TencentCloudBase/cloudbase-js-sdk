export enum LOGINTYPE {
  ANONYMOUS     = 'ANONYMOUS',
  WECHAT        = 'WECHAT',
  WECHAT_PUBLIC = 'WECHAT-PUBLIC',
  WECHAT_OPEN   = 'WECHAT-OPEN',
  CUSTOM        = 'CUSTOM',
  NULL          = 'NULL' // 保留字，代表未登录
}

export const SDK_NAME = '@cloudbase/js-sdk';