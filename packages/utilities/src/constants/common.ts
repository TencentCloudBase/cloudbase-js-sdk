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