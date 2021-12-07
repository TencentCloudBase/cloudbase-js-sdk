import {
  DATA_VERSION,
  getSdkVersion,
  getEndPoint,
  getBaseEndPoint
} from '../constants/common';
import {
  IRequestOptions,
  SDKRequestInterface,
  ResponseObject,
  IUploadRequestOptions,
  IRequestConfig
} from '@cloudbase/adapter-interface';
import { utils, adapters, constants } from '@cloudbase/utilities';
import { KV } from '@cloudbase/types';
import { IGetAccessTokenResult, ICloudbaseRequestConfig, IAppendedRequestInfo, IRequestBeforeHook } from '@cloudbase/types/request';
import { ICloudbaseCache } from '@cloudbase/types/cache';
import { getLocalCache } from './cache';
import { Platform } from './adapter';
const { ERRORS } = constants;
const { genSeqId, isFormData, formatUrl, createSign } = utils;
const { RUNTIME } = adapters;

// import FingerprintJS from '@fingerprintjs/fingerprintjs'
// const fpPromise = FingerprintJS.load()

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
      'X-SDK-Version': `@cloudbase/js-sdk/${getSdkVersion()}`,
      'x-seqid': seqId
    }
  };
}
export interface ICloudbaseRequest {
  post: (options: IRequestOptions) => Promise<ResponseObject>;
  upload: (options: IUploadRequestOptions) => Promise<ResponseObject>;
  download: (options: IRequestOptions) => Promise<ResponseObject>;
  request: (action: string, params: KV<any>, options?: KV<any>) => Promise<ResponseObject>;
  send: (action: string, data: KV<any>) => Promise<any>;
}

/**
 * @class CloudbaseRequest
 */
export class CloudbaseRequest implements ICloudbaseRequest {
  config: ICloudbaseRequestConfig;
  _shouldRefreshAccessTokenHook: Function
  _refreshAccessTokenPromise: Promise<IGetAccessTokenResult> | null
  _reqClass: SDKRequestInterface;
  // 请求失败是否抛出Error
  private _throwWhenRequestFail = false;
  // 持久化本地存储
  private _localCache: ICloudbaseCache;
  /**
   * 初始化
   * @param config
   */
  constructor(config: ICloudbaseRequestConfig & { throw?: boolean }) {

    this.config = config;
    // eslint-disable-next-line
    this._reqClass = new Platform.adapter.reqClass(<IRequestConfig>{
      timeout: this.config.timeout,
      timeoutMsg: `[@cloudbase/js-sdk] 请求在${this.config.timeout / 1000}s内未完成，已中断`,
      restrictedMethods: ['post']
    });
    this._throwWhenRequestFail = config.throw || false;
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

  public getBaseEndPoint() {
    return getBaseEndPoint()
  }

  public async getOauthAccessTokenV2(oauthClient: any): Promise<IGetAccessTokenResult> {
    const validAccessToken = await oauthClient.getAccessToken()
    const credentials = await oauthClient._getCredentials()
    return {
      accessToken: validAccessToken,
      accessTokenExpire: new Date(credentials.expires_at).getTime()
    }
  }


  /* eslint-disable complexity */
  public async request(action: string, params: KV<any>, options?: KV<any>): Promise<ResponseObject> {
    const tcbTraceKey = `x-tcb-trace_${this.config.env}`;
    let contentType = 'application/x-www-form-urlencoded';
    // const webDeviceId = await getTcbFingerprintId();
    const tmpObj: KV<any> = {
      action,
      // webDeviceId,
      dataVersion: DATA_VERSION,
      env: this.config.env,
      ...params
    };

    if (ACTIONS_WITHOUT_ACCESSTOKEN.indexOf(action) === -1) {
      const app = this.config._fromApp
      const oauthClient = app.oauthInstance.oauth2client
      tmpObj.access_token = (await this.getOauthAccessTokenV2(oauthClient)).accessToken
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
    let opts: any = {
      headers: {
        'content-type': contentType
      }
    };
    if (options?.['onUploadProgress']) {
      opts.onUploadProgress = options['onUploadProgress'];
    }

    if (this.config.region) {
      opts.headers['X-TCB-Region'] = this.config.region;
    }

    const traceHeader = this._localCache.getStore(tcbTraceKey);
    if (traceHeader) {
      opts.headers['X-TCB-Trace'] = traceHeader;
    }
    // 非web平台使用凭证检验有效性
    if (Platform.runtime !== RUNTIME.WEB) {
      const { appSign, appSecret } = this.config;
      const timestamp = Date.now();
      const { appAccessKey, appAccessKeyId } = appSecret;
      const sign = createSign({
        data: {}, // 校验签名流程实际未用到，可设空
        timestamp,
        appAccessKeyId,
        appSign
      }, appAccessKey);

      opts.headers['X-TCB-App-Source'] = `timestamp=${timestamp};appAccessKeyId=${appAccessKeyId};appSign=${appSign};sign=${sign}`;
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
    const { BASE_URL, PROTOCOL } = getEndPoint();
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
    let response = await this.request(action, data, { onUploadProgress: data.onUploadProgress });

    if (response.data.code && this._throwWhenRequestFail) {
      throw new Error(JSON.stringify({
        code: ERRORS.OPERATION_FAIL,
        msg: `[${response.data.code}] ${response.data.message}`
      }));
    }

    return response.data;
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