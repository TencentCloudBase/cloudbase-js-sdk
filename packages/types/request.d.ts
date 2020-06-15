import { IRequestOptions, ResponseObject, IUploadRequestOptions } from '@cloudbase/adapter-interface';
import { ICloudbaseConfig,KV } from ".";

export interface IGetAccessTokenResult {
  accessToken: string;
  accessTokenExpire: number;
}

export type ICloudbaseRequestConfig = Pick<ICloudbaseConfig, 'env'|'timeout'|'appSecret'|'appSign'>;

export type IAppendedRequestInfo = {
  data: KV<any>;
  headers: KV<string>;
}
export interface IRequestBeforeHook {
  (...args: any[]): IAppendedRequestInfo;
}
export interface ICloudbaseRequest {
  post(options: IRequestOptions): Promise<ResponseObject>;
  upload(options: IUploadRequestOptions): Promise<ResponseObject>;
  download(options: IRequestOptions): Promise<ResponseObject>;
  refreshAccessToken(): Promise<IGetAccessTokenResult>;
  getAccessToken(): Promise<IGetAccessTokenResult>;
  request(action: string, params: KV<any>, options?: KV<any>): Promise<ResponseObject>;
  send(action: string, data: KV<any>): Promise<any>;
}