import {App, RequestOptions, RequestFn, Storage, OpenURIWithCallback} from "../app";
import {_getComponent} from "../app/internal";

export interface CaptchaOptions {
    request: RequestFn;
    storage: Storage;
    openURIWithCallback: OpenURIWithCallback;
}

export interface CaptchaInitOptions {
    request?: RequestFn;
}

export function getCaptcha(app: App, opts?: CaptchaInitOptions): Captcha {
    return _getComponent<Captcha>(app, "captcha", (): Captcha => {
        const initOpts = {
            request: app.options.request,
            storage: app.options.storage,
            openURIWithCallback: app.options.openURIWithCallback,
        }
        if (opts && opts.request) {
            initOpts.request = opts.request
        }
        return new Captcha(initOpts)
    });
}

export interface CaptchaToken {
    captcha_token: string
    expires_in: number
    expires_at?: Date | null;
}

export interface CaptchaRequestOptions extends RequestOptions {
    withCaptcha?: boolean;
}

export interface GetCaptchaResponse {
    captcha_token?: string
    expires_in?: number
    url?: string
}

const GET_CAPTCHA_URL = '/auth/v1/captcha/init'

export class Captcha {
    private _config: CaptchaOptions;
    private _tokenSectionName: string;

    /**
     * constructor
     * @param {CaptchaOptions} opts
     */
    constructor(opts: CaptchaOptions) {
        this._config = opts
        this._tokenSectionName = 'captcha_'
    }

    /**
     * request http like simple fetch api, exp:request('/v1/user/me', {withCredentials:true})
     * @param {string} url
     * @param {AuthClientRequestOptions} options
     */
    public async request<T>(
        url: string,
        options?: CaptchaRequestOptions,
    ): Promise<T> {
        if (!options) {
            options = {};
        }
        if (!options.method) {
            options.method = 'GET'
        }
        const state = options.method + ":" + url
        let reqURL = url;
        if (options.withCaptcha) {
            reqURL = await this._appendCaptchaTokenToURL(url, state, false);
        }
        try {
            return this._config.request<T>(reqURL, options)
        } catch (err) {
            if (err.error === 'captcha_required' || err.error === 'captcha_invalid') {
                url = await this._appendCaptchaTokenToURL(url, state, err.error === 'captcha_invalid')
                return this._config.request<T>(url, options)
            } else {
                return Promise.reject(err)
            }
        }
    }

    /**
     * _getCaptchaToken get captcha token
     */
    private async _getCaptchaToken(forceNewToken: boolean, state: string): Promise<string> {
        if (!forceNewToken) {
            // if local has captcha token then return
            const captchaToken = await this._findCaptchaToken()
            if (captchaToken) {
                return captchaToken
            }
        }
        const redirectURL = window.location.origin + window.location.pathname
        const captchaTokenResp = await this._config.request<GetCaptchaResponse>(GET_CAPTCHA_URL, {
            method: 'POST',
            body: {
                redirect_uri: redirectURL,
                state: state
            },
            withBasicAuth: true,
        })
        if (captchaTokenResp.captcha_token) {
            const captchaToken = {
                captcha_token: captchaTokenResp.captcha_token,
                expires_in: captchaTokenResp.expires_in,
            }
            await this._saveCaptchaToken(captchaToken)
            return captchaTokenResp.captcha_token
        }
        const callbackData = await this._config.openURIWithCallback(captchaTokenResp.url, {width:'355px', height: '355px'})
        const captchaToken: CaptchaToken = {
            captcha_token: callbackData.captcha_token,
            expires_in: Number(callbackData.expires_in)
        }
        await this._saveCaptchaToken(captchaToken)
        return captchaToken.captcha_token
    }

    private async _appendCaptchaTokenToURL(url: string, state: string, forceNewToken: boolean): Promise<string> {
        const captchaToken = await this._getCaptchaToken(forceNewToken, state);
        if (url.indexOf("?") > 0) {
            url += "&captcha_token=" + captchaToken
        } else {
            url += "?captcha_token=" + captchaToken
        }
        return url
    }

    private async _saveCaptchaToken(token: CaptchaToken) {
        token.expires_at = new Date(
            Date.now() + (token.expires_in - 10) * 1000,
        );
        const tokenStr: string = JSON.stringify(token);
        await this._config.storage.setItem(this._tokenSectionName, tokenStr);
    }

    private async _findCaptchaToken(): Promise<string> {
        const tokenStr: string = await this._config.storage.getItem(
            this._tokenSectionName,
        );
        if (tokenStr !== undefined && tokenStr !== null) {
            try {
                const captchaToken = JSON.parse(tokenStr);
                if (captchaToken && captchaToken.expires_at) {
                    captchaToken.expires_at = new Date(captchaToken.expires_at);
                }
                const isExpired = captchaToken.expires_at < new Date();
                if (isExpired) {
                    return null
                }
                return captchaToken.captcha_token
            } catch (error) {
                await this._config.storage.removeItem(this._tokenSectionName);
                return null
            }
        }
        return null
    }
}