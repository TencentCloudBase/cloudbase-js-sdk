import {
  BASE_URL,
  PROTOCOL,
  DATA_VERSION,
  LOGINTYPE,
  getSdkVersion,
  SDK_NAME
} from '../constants/common';
import {
  IRequestOptions,
  SDKRequestInterface,
  ResponseObject,
  IUploadRequestOptions,
  IRequestConfig
} from '@cloudbase/adapter-interface';
import { utils,adapters,constants } from '@cloudbase/utilities';
import { KV } from '@cloudbase/types';
import { IGetAccessTokenResult,ICloudbaseRequestConfig,IAppendedRequestInfo,IRequestBeforeHook } from '@cloudbase/types/request';
import { ICloudbaseCache } from '@cloudbase/types/cache';
import { cloudbase } from '..';
import { getCacheByEnvId, getLocalCache } from './cache';
import { EVENTS } from '../constants/events';
import { Platform } from './adapter';
import { throwError } from '@cloudbase/utilities/dist/libs/util';

const { ERRORS } = constants;
const { genSeqId, isFormData, formatUrl, createSign }  = utils;
const { RUNTIME } = adapters;

// 下面几种 action 不需要 access token
const ACTIONS_WITHOUT_ACCESSTOKEN = [
  'auth.getJwt',
  'auth.logout',
  'auth.signInWithTicket',
  'auth.signInAnonymously',
  'auth.signIn',
  'auth.fetchAccessTokenWithRefreshToken',
  'auth.signUpWithEmailAndPassword',
  'auth.activateEndUserMail',
  'auth.sendPasswordResetEmail',
  'auth.resetPasswordWithToken',
  'auth.isUsernameRegistered'
];

function bindHooks(instance: SDKRequestInterface, name: string, hooks: IRequestBeforeHook[]) {
  const originMethod = instance[name];
  instance[name] = function (options: IRequestOptions) {
    const data = {};
    const headers = {};
    hooks.forEach(hook => {
      const { data: appendedData, headers: appendedHeaders } = hook.call(instance, options);
      Object.assign(data, appendedData);
      Object.assign(headers, appendedHeaders);
    });
    const originData = options.data;
    originData && (() => {
      if (isFormData(originData)) {
        for (const key in data) {
          (originData as FormData).append(key, data[key]);
        }
        return;
      }
      options.data = {
        ...originData,
        ...data
      };
    })();
    options.headers = {
      ...(options.headers || {}),
      ...headers
    };
    return (originMethod as Function).call(instance, options);
  };
}
function beforeEach(): IAppendedRequestInfo {
  const seqId = genSeqId();
  return {
    data: {
      seqId
    },
    headers: {
      'X-SDK-Version': getSdkVersion(),
      'x-seqid': seqId
    }
  };
}
export interface ICloudbaseRequest {
  post: (options: IRequestOptions) => Promise<ResponseObject>;
  upload: (options: IUploadRequestOptions) => Promise<ResponseObject>;
  download: (options: IRequestOptions) => Promise<ResponseObject>;
  refreshAccessToken: () => Promise<IGetAccessTokenResult>;
  getAccessToken: () => Promise<IGetAccessTokenResult>;
  request: (action:string, params:KV<any>, options?:KV<any>) => Promise<ResponseObject>;
  send: (action: string, data: KV<any>) => Promise<any>;
}
/**
 * @class CloudbaseRequest
 */
export class CloudbaseRequest implements ICloudbaseRequest{
  config: ICloudbaseRequestConfig;
  _shouldRefreshAccessTokenHook: Function
  _refreshAccessTokenPromise: Promise<IGetAccessTokenResult> | null
  _reqClass: SDKRequestInterface;
  // 请求失败是否抛出Error
  private _throwWhenRequestFail = false;
  private _cache: ICloudbaseCache;
  // 持久化本地存储
  private _localCache: ICloudbaseCache;
  /**
   * 初始化
   * @param config
   */
  constructor(config: ICloudbaseRequestConfig&{throw?:boolean}) {
    this.config = config;
    // eslint-disable-next-line
    this._reqClass = new Platform.adapter.reqClass(<IRequestConfig>{
      timeout: this.config.timeout,
      timeoutMsg: `[tcb-js-sdk] 请求在${this.config.timeout / 1000}s内未完成，已中断`,
      restrictedMethods: ['post']
    });
    this._throwWhenRequestFail = config.throw||false;
    this._cache = getCacheByEnvId(this.config.env);
    this._localCache = getLocalCache(this.config.env);
    bindHooks(this._reqClass, 'post', [beforeEach]);
    bindHooks(this._reqClass, 'upload', [beforeEach]);
    bindHooks(this._reqClass, 'download', [beforeEach]);
  }
  public async post(options: IRequestOptions): Promise<ResponseObject> {
    const res = await this._reqClass.post(options);
    return res;
  }
  public async upload(options: IUploadRequestOptions): Promise<ResponseObject> {
    const res = await this._reqClass.upload(options);
    return res;
  }
  public async download(options: IRequestOptions): Promise<ResponseObject> {
    const res = await this._reqClass.download(options);
    return res;
  }

  public async refreshAccessToken(): Promise<IGetAccessTokenResult> {
    // 可能会同时调用多次刷新access token，这里把它们合并成一个
    if (!this._refreshAccessTokenPromise) {
      // 没有正在刷新，那么正常执行刷新逻辑
      this._refreshAccessTokenPromise = this._refreshAccessToken();
    }

    let result;
    let err;
    try {
      result = await this._refreshAccessTokenPromise;
    } catch (e) {
      err = e;
    }
    this._refreshAccessTokenPromise = null;
    this._shouldRefreshAccessTokenHook = null;
    if (err) {
      throw err;
    }
    return result;
  }

  // 获取access token
  public async getAccessToken(): Promise<IGetAccessTokenResult> {
    const { accessTokenKey, accessTokenExpireKey, refreshTokenKey } = this._cache.keys;
    const refreshToken = await this._cache.getStoreAsync(refreshTokenKey);
    if (!refreshToken) {
      // 不该出现的状态：有 access token 却没有 refresh token
      throwError(ERRORS.INVALID_PARAMS,'refresh token is not exist');
    }
    // 如果没有access token或者过期，那么刷新
    const accessToken = await this._cache.getStoreAsync(accessTokenKey);
    const accessTokenExpire = Number(await this._cache.getStoreAsync(accessTokenExpireKey));

    // 调用钩子函数
    let shouldRefreshAccessToken = true;
    if (this._shouldRefreshAccessTokenHook && !(await this._shouldRefreshAccessTokenHook(accessToken, accessTokenExpire))) {
      shouldRefreshAccessToken = false;
    }

    if ((!accessToken || !accessTokenExpire || accessTokenExpire < Date.now()) && shouldRefreshAccessToken) {
      // 返回新的access tolen
      return await this.refreshAccessToken();
    } else {
      // 返回本地的access token
      return {
        accessToken,
        accessTokenExpire
      };
    }
  }

  /* eslint-disable complexity */
  public async request(action:string, params:KV<any>, options?:KV<any>): Promise<ResponseObject> {
    const tcbTraceKey = `x-tcb-trace_${this.config.env}`;
    let contentType = 'application/x-www-form-urlencoded';
    // const webDeviceId = await getTcbFingerprintId();
    const tmpObj:KV<any> = {
      action,
      // webDeviceId,
      dataVersion: DATA_VERSION,
      env: this.config.env,
      ...params
    };

    
    if (ACTIONS_WITHOUT_ACCESSTOKEN.indexOf(action) === -1) {
      const { refreshTokenKey } = this._cache.keys;

      // 若有 refreshToken 则任务有登录态 刷 accessToken
      const refreshToken = await this._cache.getStoreAsync(refreshTokenKey);
      if (refreshToken) {
        tmpObj.access_token = (await this.getAccessToken()).accessToken;
      }
    }

    // 拼body和content-type
    let payload;
    if (action === 'storage.uploadFile') {
      payload = new FormData();
      for (let key in payload) {
        if (payload.hasOwnProperty(key) && payload[key] !== undefined) {
          payload.append(key, tmpObj[key]);
        }
      }
      contentType = 'multipart/form-data';
    } else {
      contentType = 'application/json;charset=UTF-8';
      payload = {};
      for (let key in tmpObj) {
        if (tmpObj[key] !== undefined) {
          payload[key] = tmpObj[key];
        }
      }
    }
    // 非web平台使用凭证检验有效性
    if (Platform.runtime !== RUNTIME.WEB) {
      const { appSign, appSecret } = this.config;
      const timestamp = Date.now();
      const { appAccessKey, appAccessKeyId } = appSecret;
      const sign = createSign({
        data: payload,
        timestamp,
        appAccessKeyId,
        appSign
      }, appAccessKey);

      payload = {
        ...payload,
        timestamp,
        appAccessKey,
        appSign,
        sign
      };
    }
    let opts: any = {
      headers: {
        'content-type': contentType
      }
    };
    if (options?.['onUploadProgress']) {
      opts.onUploadProgress = options['onUploadProgress'];
    }

    const traceHeader = await this._localCache.getStore(tcbTraceKey);
    if (traceHeader) {
      opts.headers['X-TCB-Trace'] = traceHeader;
    }

    // 发出请求
    // 新的 url 需要携带 env 参数进行 CORS 校验
    // 请求链接支持添加动态 query 参数，方便用户调试定位请求
    const { parse, inQuery, search } = params;
    let formatQuery: Record<string, any> = {
      env: this.config.env
    };
    // 尝试解析响应数据为 JSON
    parse && (formatQuery.parse = true);
    inQuery && (formatQuery = {
      ...inQuery,
      ...formatQuery
    });
    // 生成请求 url
    let newUrl = formatUrl(PROTOCOL, BASE_URL, formatQuery);

    if (search) {
      newUrl += search;
    }

    const res: ResponseObject = await this.post({
      url: newUrl,
      data: payload,
      ...opts
    });

    // 保存 trace header
    const resTraceHeader = res.header && res.header['x-tcb-trace'];
    if (resTraceHeader) {
      this._localCache.setStore(tcbTraceKey, resTraceHeader);
    }

    if ((Number(res.status) !== 200 && Number(res.statusCode) !== 200) || !res.data) {
      throw new Error('network request error');
    }

    return res;
  }

  public async send(action: string, data: KV<any> = {}): Promise<any> {
    const response = await this.request(action, data, { onUploadProgress: data.onUploadProgress });
    if (response.data.code === 'ACCESS_TOKEN_EXPIRED' && ACTIONS_WITHOUT_ACCESSTOKEN.indexOf(action) === -1) {
      // access_token过期，重新获取
      await this.refreshAccessToken();
      const response = await this.request(action, data, { onUploadProgress: data.onUploadProgress });
      if (response.data.code&&this._throwWhenRequestFail) {
        throwError(ERRORS.OPERATION_FAIL,`[${response.data.code}] ${response.data.message}`);
      }
      return response.data;
    }

    if (response.data.code&&this._throwWhenRequestFail) {
      throwError(ERRORS.OPERATION_FAIL,`[${response.data.code}] ${response.data.message}`);
    }

    return response.data;
  }

  // 调用接口刷新access token，并且返回
  private async _refreshAccessToken(): Promise<IGetAccessTokenResult> {
    const { accessTokenKey, accessTokenExpireKey, refreshTokenKey,loginTypeKey,anonymousUuidKey } = this._cache.keys;
    await this._cache.removeStoreAsync(accessTokenKey);
    await this._cache.removeStoreAsync(accessTokenExpireKey);

    let refreshToken = await this._cache.getStoreAsync(refreshTokenKey);
    if (!refreshToken) {
      throw new Error(`[${SDK_NAME}][${ERRORS.INVALID_OPERATION}] not login`);
    }
    const params: KV<string> = {
      refresh_token: refreshToken
    };
    const response = await this.request('auth.fetchAccessTokenWithRefreshToken', params);
    if (response.data.code) {
      const { code } = response.data;
      if (code === 'SIGN_PARAM_INVALID' || code === 'REFRESH_TOKEN_EXPIRED' || code === 'INVALID_REFRESH_TOKEN') {
        // 这里处理以下逻辑：
        // 匿名登录时，如果刷新access token报错refresh token过期，此时应该：
        // 1. 再用 uuid 拿一次新的refresh token
        // 2. 拿新的refresh token换access token
        const isAnonymous = await this._cache.getStoreAsync(loginTypeKey) === LOGINTYPE.ANONYMOUS;
        if (isAnonymous && code === 'INVALID_REFRESH_TOKEN') {
          // 获取新的 refresh token
          const anonymous_uuid = await this._cache.getStoreAsync(anonymousUuidKey);
          // 此处cache为基类property
          const refresh_token = await this._cache.getStoreAsync(refreshTokenKey);
          const res = await this.send('auth.signInAnonymously', {
            anonymous_uuid,
            refresh_token
          });
          this._setRefreshToken(res.refresh_token);
          return this._refreshAccessToken();
        }
        cloudbase.fire(EVENTS.LOGIN_STATE_EXPIRED);
        await this._cache.removeStoreAsync(refreshTokenKey);
      }
      throw new Error(`[${SDK_NAME}][${ERRORS.NETWORK_ERROR}] refresh access_token failed：${response.data.code}`);
    }
    if (response.data.access_token) {
      cloudbase.fire(EVENTS.ACCESS_TOKEN_REFRESHD);
      await this._cache.setStoreAsync(accessTokenKey, response.data.access_token);
      // 本地时间可能没有同步
      await this._cache.setStoreAsync(accessTokenExpireKey, response.data.access_token_expire + Date.now());
      return {
        accessToken: response.data.access_token,
        accessTokenExpire: response.data.access_token_expire
      };
    }
    // 匿名登录refresh_token过期情况下返回refresh_token
    // 此场景下使用新的refresh_token获取access_token
    if (response.data.refresh_token) {
      await this._cache.removeStoreAsync(refreshTokenKey);
      await this._cache.setStoreAsync(refreshTokenKey, response.data.refresh_token);
      await this._refreshAccessToken();
    }
  }
  private async _setRefreshToken(refreshToken:string) {
    const { accessTokenKey, accessTokenExpireKey, refreshTokenKey } = this._cache.keys;
    // refresh token设置前，先清掉 access token
    await this._cache.removeStoreAsync(accessTokenKey);
    await this._cache.removeStoreAsync(accessTokenExpireKey);
    await this._cache.setStoreAsync(refreshTokenKey, refreshToken);
  }
}

const requestMap: KV<CloudbaseRequest> = {};

export function initRequest(config: ICloudbaseRequestConfig) {
  requestMap[config.env] = new CloudbaseRequest({
    ...config,
    throw: true
  });
}

export function getRequestByEnvId(env: string): CloudbaseRequest {
  return requestMap[env];
}