let sdk_name = '@cloudbase/js-sdk';
export function setSdkName(name:string){
  sdk_name = name;
}
export function getSdkName(){
  return sdk_name;
}

let PROTOCOL = typeof location !== 'undefined' && location.protocol === 'http:' 
  ? 'http:' 
  : 'https:';

export function setProtocol(protocol:'http'|'https'){
  PROTOCOL = protocol;
}

export function getProtocol(){
  return PROTOCOL;
}
// 是否为开发模式
export const IS_DEBUG_MODE = process.env.NODE_ENV === 'development';
// 问答社区链接
export const COMMUNITY_SITE_URL = 'https://support.qq.com/products/148793';