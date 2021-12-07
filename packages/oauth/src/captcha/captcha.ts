import { SimpleStorage, RequestFunction } from '../oauth2client/interface';
import { AuthClientRequestOptions } from "../oauth2client/models";
import { defaultStorage } from "../oauth2client/oauth2client";

export interface CaptchaOptions {
  clientId: string
  request: RequestFunction;
  storage: SimpleStorage;
  // 打开网页并通过URL回调获取 CaptchaToken，针对不通的平台，该函数可以自定义实现, 默认集成浏览器端认证
  openURIWithCallback?: OpenURIWithCallbackFuction;
}

type OpenURIWithCallbackFuction = (url: string) => Promise<CaptchaToken>;

export interface CaptchaToken {
  captcha_token: string
  expires_in: number
  expires_at?: Date | null;
}

export interface CaptchaRequestOptions extends AuthClientRequestOptions {
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
    if (!opts.openURIWithCallback) {
      opts.openURIWithCallback = this._getDefaultOpenURIWithCallback()
    }
    if (!opts.storage) {
      opts.storage = defaultStorage
    }
    this._config = opts
    this._tokenSectionName = 'captcha_' + opts.clientId
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

  private _getDefaultOpenURIWithCallback(): OpenURIWithCallbackFuction {
    if (window.location.search.indexOf('__captcha') > 0) {
      document.body.style.display = 'none';
    }
    if (document.getElementById('captcha_panel_wrap') === null) {
      var elementDiv = document.createElement('div');
      elementDiv.style.cssText =
        'background-color: rgba(0, 0, 0, 0.7);position: fixed;left: 0px;right: 0px;top: 0px;bottom: 0px;padding: 9vw 0 0 0;display: none;z-index:100;';
      elementDiv.setAttribute('id', 'captcha_panel_wrap');
      document.body.appendChild(elementDiv);
    }
    return this._defaultOpenURIWithCallback
  }

  /**
   * 默认通过浏览器打开网页并获取回调
   */
  private async _defaultOpenURIWithCallback(url: string): Promise<CaptchaToken> {
    const target = document.getElementById('captcha_panel_wrap'),
      iframe = document.createElement('iframe')
    target.innerHTML = '';
    iframe.setAttribute('src', url)
    iframe.setAttribute('id', 'review-panel-iframe')
    iframe.style.cssText = 'min-width:355px;display:block;height:355px;margin:0 auto;background-color: rgb(255, 255, 255);border: none;';
    target.appendChild(iframe);
    target.style.display = 'block';
    return new Promise<CaptchaToken>((resolve, reject) => {
      iframe.onload = function () {
        try {
          var windowLocation = window.location;
          var iframeLocation = iframe.contentWindow.location;
          if (
            iframeLocation.host +
            iframeLocation.pathname ===
            windowLocation.host +
            windowLocation.pathname
          ) {
            target.style.display = 'none';
            const iframeUrlParams = new URLSearchParams(iframeLocation.search);
            const captchToken = iframeUrlParams.get('captcha_token');
            if (captchToken) {
              return resolve({
                captcha_token: captchToken,
                expires_in: Number(iframeUrlParams.get('expires_in'))
              })
            }
            return reject({
              error: iframeUrlParams.get('error'),
              error_description: iframeUrlParams.get('error_description')
            })
          } else {
            target.style.display = 'block';
          }
        } catch (error) {
          target.style.display = 'block';
        }
      };
    })
  }
  /**
   * _getCaptchaToken 获取captchaToken
   */
  private async _getCaptchaToken(forceNewToken: boolean, state: string): Promise<string> {
    if (!forceNewToken) {
      // 如果本地存在，则直接返回
      const captchaToken = await this._findCaptchaToken()
      if (captchaToken) {
        return captchaToken
      }
    }
    const redirectURL = window.location.origin + window.location.pathname + "?__captcha=on"
    const captchaTokenResp = await this._config.request<GetCaptchaResponse>(GET_CAPTCHA_URL, {
      method: 'POST',
      body: {
        client_id: this._config.clientId,
        redirect_uri: redirectURL,
        state: state
      },
      withCredentials: false,
    })
    if (captchaTokenResp.captcha_token) {
      const captchaToken = {
        captcha_token: captchaTokenResp.captcha_token,
        expires_in: captchaTokenResp.expires_in,
      }
      this._saveCaptchaToken(captchaToken)
      return captchaTokenResp.captcha_token
    }
    const captchaToken = await this._config.openURIWithCallback(captchaTokenResp.url)
    this._saveCaptchaToken(captchaToken)
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
        if (captchaToken?.expires_at) {
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