import {
  SDKAdapterInterface,
  AbstractSDKRequest,
  IRequestOptions,
  ResponseObject,
  IUploadRequestOptions,
  IRequestConfig,
  IRequestMethod
} from '@cloudbase/adapter-interface';
import { isFormData, formatUrl, toQueryString } from '../../libs/util';
import { PROTOCOL } from '../../constants/common';

/**
 * @class WebRequest
 */
class WebRequest extends AbstractSDKRequest {
  // 默认不限超时
  private readonly _timeout: number;
  // 超时提示文案
  private readonly _timeoutMsg: string;
  // 超时受限请求类型，默认所有请求均受限
  private readonly _restrictedMethods: Array<IRequestMethod>;
  constructor(config: IRequestConfig) {
    super();
    const { timeout, timeoutMsg, restrictedMethods } = config;
    this._timeout = timeout || 0;
    this._timeoutMsg = timeoutMsg || '请求超时';
    this._restrictedMethods = restrictedMethods || ['get', 'post', 'upload', 'download'];
  }
  public get(options: IRequestOptions): Promise<ResponseObject> {
    return this._request({
      ...options,
      method: 'get'
    }, this._restrictedMethods.includes('get'));
  }
  public post(options: IRequestOptions): Promise<ResponseObject> {
    return this._request({
      ...options,
      method: 'post'
    }, this._restrictedMethods.includes('post'));
  }
  public put(options: IRequestOptions): Promise<ResponseObject> {
    return this._request({
      ...options,
      method: 'put'
    });
  }
  public upload(options: IUploadRequestOptions): Promise<ResponseObject> {
    const { data, file, name } = options;
    // upload调用data为object类型，在此处转为FormData
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append('key', name);
    formData.append('file', file);
    return this._request({
      ...options,
      data: formData,
      method: 'post'
    }, this._restrictedMethods.includes('upload'));
  }
  public async download(options: IRequestOptions): Promise<any> {
    /**
     * @todo
     * blob下载文件的方式受CORS限制，暂不可用。
     */
    // const { data } = await this.get({
    //   ...options,
    //   headers: {}, // 下载资源请求不经过service，header清空
    //   responseType: 'blob'
    // });
    // const url = window.URL.createObjectURL(new Blob([data]));
    const fileName = decodeURIComponent(new URL(options.url).pathname.split('/').pop() || '');
    const link = document.createElement('a');
    link.href = options.url;
    link.setAttribute('download', fileName);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    return new Promise(resolve => {
      resolve({
        statusCode: 200,
        tempFilePath: options.url
      });
    });
  }
  /**
   * @param {IRequestOptions} options
   * @param {boolean} enableAbort 是否超时中断请求
   */
  protected _request(options: IRequestOptions, enableAbort = false): Promise<ResponseObject> {
    const method = (String(options.method)).toLowerCase() || 'get';
    return new Promise(resolve => {
      const { url, headers = {}, data, responseType, withCredentials, body, onUploadProgress } = options;
      const realUrl = formatUrl(PROTOCOL, url, method === 'get' ? data : {});
      const ajax = new XMLHttpRequest();
      ajax.open(method, realUrl);
      responseType && (ajax.responseType = responseType);
      for (const key in headers) {
        ajax.setRequestHeader(key, headers[key]);
      }
      let timer;
      if (onUploadProgress) {
        ajax.addEventListener('progress', onUploadProgress);
      }
      ajax.onreadystatechange = () => {
        const result: ResponseObject = {};
        if (ajax.readyState === 4) {
          let headers = ajax.getAllResponseHeaders();
          let arr = headers.trim().split(/[\r\n]+/);
          // Create a map of header names to values
          let headerMap = {};
          arr.forEach(function (line) {
            let parts = line.split(': ');
            let header = parts.shift().toLowerCase();
            let value = parts.join(': ');
            headerMap[header] = value;
          });
          result.header = headerMap;
          result.statusCode = ajax.status;
          try {
            // 上传post请求返回数据格式为xml，此处容错
            result.data = JSON.parse(ajax.responseText);
          } catch (e) {
            result.data = ajax.responseText;
          }
          clearTimeout(timer);
          resolve(result);
        }
      };
      if (enableAbort && this._timeout) {
        timer = setTimeout(() => {
          console.warn(this._timeoutMsg);
          ajax.abort();
        }, this._timeout);
      }
      // 处理 payload
      let payload;
      if (isFormData(data)) {
        // FormData，不处理
        payload = data;
      } else if (headers['content-type'] === 'application/x-www-form-urlencoded') {
        payload = toQueryString(data);
      } else if (body) {
        payload = body;
      } else {
        // 其它情况
        payload = data ? JSON.stringify(data) : undefined;
      }

      if (withCredentials) {
        ajax.withCredentials = true;
      }
      ajax.send(payload);
    });
  }
}

function genAdapter() {
  const adapter: SDKAdapterInterface = {
    root: window,
    reqClass: WebRequest,
    wsClass: WebSocket,
    localStorage: localStorage,
    sessionStorage: sessionStorage
  };
  return adapter;
}

export { genAdapter, WebRequest };
