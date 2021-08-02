import { constants } from '@cloudbase/utilities';

// @ts-ignore
const { setSdkName: setUtilitiesSdkName, setProtocol: setUtilitiesProtocol } = constants;
/**
 * SDK
 */
let sdk_version = '';
let sdk_name = '@cloudbase/js-sdk';

export function setSdkVersion(version:string){
  sdk_version = version;
}
export function getSdkVersion(){
  return sdk_version;
}
export function setSdkName(name:string){
  sdk_name = name;
  setUtilitiesSdkName(name);
}
export function getSdkName(){
  return sdk_name;
}
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
  if(protocol){
    PROTOCOL = protocol;
    setUtilitiesProtocol(protocol);
  }
}
export function setRegionLevelEndpoint(env:string,region:string,protocol?:'http'|'https') {
  const endpoiont = region
    ? `//${env}.${region}.tcb-api.tencentcloudapi.com/web`
    : `//${env}.ap-shanghai.tcb-api.tencentcloudapi.com/web`
  setEndPoint(endpoiont, protocol)
}
export function getEndPoint(){
  return { BASE_URL, PROTOCOL };
}

export enum LOGINTYPE {
  NULL = 'NULL',
  ANONYMOUS = 'ANONYMOUS',
  WECHAT = 'WECHAT',
  WECHAT_PUBLIC = 'WECHAT-PUBLIC',
  WECHAT_OPEN = 'WECHAT-OPEN',
  CUSTOM = 'CUSTOM',
  EMAIL = 'EMAIL',
  USERNAME = 'USERNAME',
  PHONE = 'PHONE'
}

export const OAUTH2_LOGINTYPE_PREFIX = 'OAUTH2'
