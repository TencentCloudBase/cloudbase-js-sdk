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
export const PROTOCOL = 'https:';
export const BASE_URL = '//tcb-api.tencentcloudapi.com/web';
// debug
export const PROTOCOL_DEBUG = 'http:'
export const BASE_URL_DEBUG = '//tcb-pre.tencentcloudapi.com/web';

export enum LOGINTYPE {
  ANONYMOUS = 'ANONYMOUS',
  WECHAT = 'WECHAT',
  CUSTOM = 'CUSTOM',
  NULL = 'NULL' // 保留字，代表未登录
}