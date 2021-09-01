import { IRequestOptions, SDKRequestInterface, ResponseObject, IUploadRequestOptions } from '@cloudbase/adapter-interface';
import { KV } from '@cloudbase/types';
import { IGetAccessTokenResult, ICloudbaseRequestConfig } from '@cloudbase/types/request';
export interface ICloudbaseRequest {
    fetch: (urlOrPath: string, init?: RequestInit) => Promise<Response>;
    post: (options: IRequestOptions) => Promise<ResponseObject>;
    upload: (options: IUploadRequestOptions) => Promise<ResponseObject>;
    download: (options: IRequestOptions) => Promise<ResponseObject>;
    refreshAccessToken: () => Promise<IGetAccessTokenResult>;
    getAccessToken: () => Promise<IGetAccessTokenResult>;
    request: (action: string, params: KV<any>, options?: KV<any>) => Promise<ResponseObject>;
    send: (action: string, data: KV<any>) => Promise<any>;
}
export declare class CloudbaseRequest implements ICloudbaseRequest {
    config: ICloudbaseRequestConfig;
    _shouldRefreshAccessTokenHook: Function;
    _refreshAccessTokenPromise: Promise<IGetAccessTokenResult> | null;
    _reqClass: SDKRequestInterface;
    private _throwWhenRequestFail;
    private _cache;
    private _localCache;
    constructor(config: ICloudbaseRequestConfig & {
        throw?: boolean;
    });
    fetch(urlOrPath: string, init?: RequestInit): Promise<Response>;
    post(options: IRequestOptions): Promise<ResponseObject>;
    upload(options: IUploadRequestOptions): Promise<ResponseObject>;
    download(options: IRequestOptions): Promise<ResponseObject>;
    refreshAccessToken(): Promise<IGetAccessTokenResult>;
    refreshAccessTokenFromOauthServer(clientId: string): Promise<IGetAccessTokenResult>;
    getOauthAccessToken(): Promise<IGetAccessTokenResult>;
    getAccessToken(): Promise<IGetAccessTokenResult>;
    request(action: string, params: KV<any>, options?: KV<any>): Promise<ResponseObject>;
    send(action: string, data?: KV<any>): Promise<any>;
    private _refreshAccessToken;
    private _fetchAccessTokenFromOauthServer;
    private _refreshAccessTokenFromOauthServer;
    private _setRefreshToken;
    private getDeviceId;
}
export declare function initRequest(config: ICloudbaseRequestConfig): void;
export declare function getRequestByEnvId(env: string): CloudbaseRequest;
