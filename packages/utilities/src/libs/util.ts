import hs256 from 'crypto-js/hmac-sha256';
import base64 from 'crypto-js/enc-base64';
import utf8 from 'crypto-js/enc-utf8';
import { KV } from '@cloudbase/types';
import { SDK_NAME } from '../constants';

export function isArray(val: any): boolean {
  return Object.prototype.toString.call(val) === '[object Array]';
}
export function isString(val: any): boolean {
  return typeof val === 'string';
}
export function isUndefined(val: any): boolean {
  return typeof val === 'undefined';
}
export function isPalinObject(val: any): boolean {
  return Object.prototype.toString.call(val) === '[object Object]';
}
export function isNull(val: any): boolean {
  return Object.prototype.toString.call(val) === '[object Null]';
}
export function isInstanceOf(instance:any, construct:any): boolean {
  return instance instanceof construct;
}
export function isFormData(val: any): boolean {
  return Object.prototype.toString.call(val) === '[object FormData]';
}
export function genSeqId():string {
  return Math.random().toString(16).slice(2);
}
export function formatUrl(PROTOCOL: string, url: string, query: KV<any> = {}): string {
  const urlHasQuery = /\?/.test(url);
  let queryString = '';
  for (let key in query) {
    if (queryString === '') {
      !urlHasQuery && (url += '?');
    } else {
      queryString += '&';
    }
    queryString += `${key}=${encodeURIComponent(query[key])}`;
  }
  url += queryString;
  if (/^http(s)?\:\/\//.test(url)) {
    return url;
  }
  return `${PROTOCOL}${url}`;
}

function base64url(source: KV<any>):string {
  let encodedSource = base64.stringify(source);

  encodedSource = encodedSource.replace(/=+$/, '');
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');

  return encodedSource;
}

export function createSign(payload: KV<any>, secret: string): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  const headerStr = base64url(utf8.parse(JSON.stringify(header)));
  const payloadStr = base64url(utf8.parse(JSON.stringify(payload)));

  const token = `${headerStr}.${payloadStr}`;
  const sign = base64url(hs256(token, secret));
  return `${token}.${sign}`;
}
export function toQueryString(query: KV<any> = {}) {
  let queryString = [];
  for (let key in query) {
    queryString.push(`${key}=${encodeURIComponent(query[key])}`);
  }
  return queryString.join('&');
}

export function getQuery (name: string, url?: string) {
  if (typeof window === 'undefined') {
    return false;
  }
  // 参数：变量名，url为空则表从当前页面的url中取
  let u = url || window.location.search;
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  let r = u.substr(u.indexOf('?') + 1).match(reg);
  return r != null ? r[2] : '';
};

export const getHash = function (name: string) {
  if (typeof window === 'undefined') {
    return '';
  }
  const matches = window.location.hash.match(
    new RegExp(`[#\?&\/]${name}=([^&#]*)`)
  );
  return matches ? matches[1] : '';
};

export function removeParam(key: string, sourceURL: string) {
  let rtn = sourceURL.split('?')[0];
  let param;
  let params_arr = [];
  let queryString =
    sourceURL.indexOf('?') !== -1 ? sourceURL.split('?')[1] : '';
  if (queryString !== '') {
    params_arr = queryString.split('&');
    for (let i = params_arr.length - 1; i >= 0; i -= 1) {
      param = params_arr[i].split('=')[0];
      if (param === key) {
        params_arr.splice(i, 1);
      }
    }
    rtn = rtn + '?' + params_arr.join('&');
  }
  return rtn;
};

export function createPromiseCallback() {
  let cb: any;
  if (!Promise) {
    cb = () => { };
    cb.promise = {};

    const throwPromiseNotDefined = () => {
      throw new Error(
        'Your Node runtime does support ES6 Promises. ' +
        'Set "global.Promise" to your preferred implementation of promises.'
      );
    };

    Object.defineProperty(cb.promise, 'then', { get: throwPromiseNotDefined });
    Object.defineProperty(cb.promise, 'catch', { get: throwPromiseNotDefined });
    return cb;
  }

  const promise = new Promise((resolve, reject) => {
    cb = (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    };
  });
  cb.promise = promise;
  return cb;
};

export function execCallback(fn:Function|null|undefined,err:any,data=null){
  if(fn&&typeof fn === 'function'){
    return fn(err,data);
  }
  if(err){
    throw err;
  }
  return data;
}

export function printWarn(error:string,msg:string){
  console.warn(`[${SDK_NAME}][${error}]:${msg}`);
}
export function printError(error:string,msg:string){
  console.error({
    code: error,
    msg: `[${SDK_NAME}][${error}]:${msg}`
  });
}
export function printInfo(error:string,msg:string){
  console.log(`[${SDK_NAME}][${error}]:${msg}`);
}
export function throwError(error:string,msg:string){
  throw new Error(JSON.stringify({
    code: error,
    msg: `[${SDK_NAME}][${error}]:${msg}`
  }));
}