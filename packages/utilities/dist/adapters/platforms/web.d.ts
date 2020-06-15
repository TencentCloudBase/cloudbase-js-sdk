import { SDKAdapterInterface, AbstractSDKRequest, IRequestOptions, ResponseObject, IUploadRequestOptions, IRequestConfig } from '@cloudbase/adapter-interface';
declare class WebRequest extends AbstractSDKRequest {
    private readonly _timeout;
    private readonly _timeoutMsg;
    private readonly _restrictedMethods;
    constructor(config: IRequestConfig);
    get(options: IRequestOptions): Promise<ResponseObject>;
    post(options: IRequestOptions): Promise<ResponseObject>;
    put(options: IRequestOptions): Promise<ResponseObject>;
    upload(options: IUploadRequestOptions): Promise<ResponseObject>;
    download(options: IRequestOptions): Promise<any>;
    protected _request(options: IRequestOptions, enableAbort?: boolean): Promise<ResponseObject>;
}
declare function genAdapter(): SDKAdapterInterface;
export { genAdapter, WebRequest };
