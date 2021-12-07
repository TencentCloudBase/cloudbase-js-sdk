import { App, RequestOptions, RequestFn, Storage, OpenURIWithCallback } from "../app";
export interface CaptchaOptions {
    request: RequestFn;
    storage: Storage;
    openURIWithCallback: OpenURIWithCallback;
}
export interface CaptchaInitOptions {
    request?: RequestFn;
}
export declare function getCaptcha(app: App, opts?: CaptchaInitOptions): Captcha;
export interface CaptchaToken {
    captcha_token: string;
    expires_in: number;
    expires_at?: Date | null;
}
export interface CaptchaRequestOptions extends RequestOptions {
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
    private _getCaptchaToken;
    private _appendCaptchaTokenToURL;
    private _saveCaptchaToken;
    private _findCaptchaToken;
}
