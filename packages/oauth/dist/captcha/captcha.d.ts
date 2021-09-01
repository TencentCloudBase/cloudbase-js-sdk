import { SimpleStorage, RequestFunction } from '../oauth2client/interface';
import { AuthClientRequestOptions } from "../oauth2client/models";
export interface CaptchaOptions {
    clientId: string;
    request: RequestFunction;
    storage: SimpleStorage;
    openURIWithCallback?: OpenURIWithCallbackFuction;
}
declare type OpenURIWithCallbackFuction = (url: string) => Promise<CaptchaToken>;
export interface CaptchaToken {
    captcha_token: string;
    expires_in: number;
    expires_at?: Date | null;
}
export interface CaptchaRequestOptions extends AuthClientRequestOptions {
    withCaptcha?: boolean;
}
export interface GetCaptchaResponse {
    captcha_token?: string;
    expires_in?: number;
    url?: string;
}
export declare class Captcha {
    private _config;
    private _tokenSectionName;
    constructor(opts: CaptchaOptions);
    request<T>(url: string, options?: CaptchaRequestOptions): Promise<T>;
    private _getDefaultOpenURIWithCallback;
    private _defaultOpenURIWithCallback;
    private _getCaptchaToken;
    private _appendCaptchaTokenToURL;
    private _saveCaptchaToken;
    private _findCaptchaToken;
}
export {};
