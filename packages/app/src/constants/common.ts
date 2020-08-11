/**
 * SDK
 */
let sdk_version = '';

export function setSdkVersion(version:string){
  sdk_version = version;
}
export function getSdkVersion(){
  return sdk_version;
}
export const SDK_NAME = '@cloudbase/js-sdk';
export const DATA_VERSION = '2020-01-10';
/**
 * request
 */
let PROTOCOL = typeof location !== 'undefined' && location.protocol === 'http:' 
  ? 'http:' 
  : 'https:';
let BASE_URL = typeof process !== 'undefined' && process.env.NODE_ENV === 'e2e' && process.env.END_POINT === 'pre'
  ? '//tcb-pre.tencentcloudapi.com/web'
  : '//tcb-api.tencentcloudapi.com/web';
export function setEndPoint(url:string,protocol?:'http'|'https'){
  BASE_URL = url;
  protocol&&(PROTOCOL = protocol);
}
export function getEndPoint(){
  return { BASE_URL, PROTOCOL };
}

export enum LOGINTYPE {
  ANONYMOUS = 'ANONYMOUS',
  WECHAT = 'WECHAT',
  CUSTOM = 'CUSTOM',
  NULL = 'NULL' // 保留字，代表未登录
}