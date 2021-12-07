import { IRequestOptions, SDKRequestInterface, ResponseObject, IUploadRequestOptions } from '@cloudbase/adapter-interface';
import { KV } from '@cloudbase/types';
import { IGetAccessTokenResult, ICloudbaseRequestConfig } from '@cloudbase/types/request';
export interface ICloudbaseRequest {
    post: (options: IRequestOptions) => Promise<ResponseObject>;
    upload: (options: IUploadRequestOptions) => Promise<ResponseObject>;
    download: (options: IRequestOptions) => Promise<ResponseObject>;
    request: (action: string, params: KV<any>, options?: KV<any>) => Promise<ResponseObject>;
    send: (action: string, data: KV<any>) => Promise<any>;
}
export declare class CloudbaseRequest implements ICloudbaseRequest {
    config: ICloudbaseRequestConfig;
    _shouldRefreshAccessTokenHook: Function;
    _refreshAccessTokenPromise: Promise<IGetAccessTokenResult> | null;
    _reqClass: SDKRequestInterface;
    private _throwWhenRequestFail;
    private _localCache;
    constructor(config: ICloudbaseRequestConfig & {
        throw?: boolean;
    });
    post(options: IRequestOptions): Promise<ResponseObject>;
    upload(options: IUploadRequestOptions): Promise<ResponseObject>;
    download(options: IRequestOptions): Promise<ResponseObject>;
    getBaseEndPoint(): string;
    getOauthAccessTokenV2(oauthClient: any): Promise<IGetAccessTokenResult>;
    request(action: string, params: KV<any>, options?: KV<any>): Promise<ResponseObject>;
    send(action: string, data?: KV<any>): Promise<any>;
}
export declare function initRequest(config: ICloudbaseRequestConfig): void;
export declare function getRequestByEnvId(env: string): CloudbaseRequest;
