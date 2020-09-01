import { AuthProvider } from './base';
import { ICloudbaseAuthConfig } from '@cloudbase/types/auth';
import { ICloudbaseCache } from '@cloudbase/types/cache';
import { ICloudbaseRequest } from '@cloudbase/types/request';
import { constants, adapters,utils, helpers } from '@cloudbase/utilities/';
import { eventBus, EVENTS, LoginState } from '..';
import { LOGINTYPE } from '../constants';

const { getSdkName, ERRORS, COMMUNITY_SITE_URL } = constants;
const { RUNTIME } = adapters;
const { getQuery, getHash, removeParam, printWarn } = utils;
const { catchErrorsDecorator } = helpers;

export class WeixinAuthProvider extends AuthProvider {
  private readonly _scope: string;
  private readonly _state: string;
  private readonly _appid: string;
  private readonly _runtime:string;

  constructor(config: ICloudbaseAuthConfig&{cache:ICloudbaseCache,request:ICloudbaseRequest,runtime:string}, appid: string, scope: string, state?: string) {
    super(config);

    this._runtime = config.runtime;
    this._appid = appid;
    this._scope = scope;
    this._state = state || 'weixin';
  }
  
  public async signIn(){
    return printWarn(ERRORS.OPERATION_FAIL,'API signIn has been deprecated, please use signInWithRedirect insteed');
  }
  @catchErrorsDecorator({
    title: '跳转微信公众号授权失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().weixinAuthProvider().signInWithRedirect() 的语法或参数是否正确',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async signInWithRedirect() {
    return this._redirect();
  }
  @catchErrorsDecorator({
    title: '微信公众号登录失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().weixinAuthProvider().getRedirectResult() 的语法或参数是否正确',
      '  2 - 当前环境是否开通了微信公众号登录授权',
      '  3 - 微信公众号的 AppId 与 AppSecret 配置是否正确',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async getRedirectResult(options:{ withUnionId?: boolean; syncUserInfo?: boolean }) {
    const code = getWeixinCode();
    if (!code) {
      return null;
    }
    return this._signInWithCode(code,options);
  }
  @catchErrorsDecorator({
    title: '获取微信重定向绑定结果',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().weixinAuthProvider().getLinkRedirectResult() 的语法或参数是否正确',
      '  2 - 当前环境是否开通了微信公众号登录授权',
      '  3 - 微信公众号的 AppId 与 AppSecret 配置是否正确',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  async getLinkRedirectResult(options: { withUnionId?: boolean } = {}) {
    const { withUnionId = false } = options;
    const code = getWeixinCode();
    if (!code) {
      return null;
    }
    const { _appid: appid } = this;
    const loginType = (scope => {
      switch (scope) {
        case 'snsapi_login':
          return 'WECHAT-OPEN';
        default:
          return 'WECHAT-PUBLIC';
      }
    })(this._scope);
    const hybridMiniapp = this._runtime === RUNTIME.WX_MP ? '1' : '0';
    return this._request.send('auth.linkWithWeixinCode', { 
      payload: { 
        appid, 
        loginType, 
        code, 
        hybridMiniapp, 
        withUnionId
      }
    });
  }

  private _redirect(): any {
    let currUrl = removeParam('code', location.href);
    currUrl = removeParam('state', currUrl);
    currUrl = encodeURIComponent(currUrl);

    let host = '//open.weixin.qq.com/connect/oauth2/authorize';
    if (this._scope === 'snsapi_login') {
      host = '//open.weixin.qq.com/connect/qrconnect';
    }
    try{
      location.href = `${host}?appid=${this._appid}&redirect_uri=${currUrl}&response_type=code&scope=${this._scope}&state=${this._state}#wechat_redirect`;
    }catch(e){
      throw new Error(`[${getSdkName()}][${ERRORS.UNKOWN_ERROR}]${e}`)
    }
  }

  private async _signInWithCode(code:string,options) {
    const { accessTokenKey, accessTokenExpireKey, refreshTokenKey } = this._cache.keys;
    // 有code，用code换refresh token
    const loginType = (scope => {
      switch (scope) {
        case 'snsapi_login':
          return 'WECHAT-OPEN';
        default:
          return 'WECHAT-PUBLIC';
      }
    })(this._scope);

    const refreshTokenRes = await this._getRefreshTokenByWXCode(this._appid, loginType, code,options);
    const { refreshToken } = refreshTokenRes;

    // 本地存下
    await this._cache.setStoreAsync(refreshTokenKey, refreshToken);
    if (refreshTokenRes.accessToken) {
      await this._cache.setStoreAsync(accessTokenKey, refreshTokenRes.accessToken);
    }
    if (refreshTokenRes.accessTokenExpire) {
      await this._cache.setStoreAsync(accessTokenExpireKey, String(refreshTokenRes.accessTokenExpire + Date.now()));
    }
    eventBus.fire(EVENTS.LOGIN_STATE_CHANGED);
    // 抛出登录类型更改事件
    eventBus.fire(EVENTS.LOGIN_TYPE_CHANGED, { 
      env: this._config.env,
      loginType: LOGINTYPE.WECHAT, 
      persistence: this._config.persistence 
    });
    await this.refreshUserInfo();
    const loginState = new LoginState({
      envId: this._config.env,
      cache: this._cache,
      request: this._request
    });
    await loginState.checkLocalStateAsync();
    
    return loginState;
  }

  private async _getRefreshTokenByWXCode(
    appid: string, 
    loginType: string, 
    code: string,
    options: any = {}
  ): Promise<{ refreshToken: string; accessToken: string; accessTokenExpire: number }> {
    const { withUnionId = false, createUser = true } = options;
    // snsapi_userinfo 和 snsapi_login 才可以获取用户的微信信息
    const syncUserInfo = this._scope === 'snsapi_base' ? false : options.syncUserInfo || false;

    const action = 'auth.signIn';
    const hybridMiniapp = this._runtime === RUNTIME.WX_MP ? '1' : '0';
    return this._request.send(action, { 
      appid, 
      loginType, 
      hybridMiniapp,
      syncUserInfo,
      loginCredential: code,
      withUnionId,
      createUser
    }).then(res => {
      if (res.code) {
        throw new Error(`[${getSdkName()}][${ERRORS.OPERATION_FAIL}] failed login via wechat: ${res.code}`);
      }
      if (res.refresh_token) {
        return {
          refreshToken: res.refresh_token,
          accessToken: res.access_token,
          accessTokenExpire: res.access_token_expire
        };
      } else {
        throw new Error(`[${getSdkName()}][${ERRORS.OPERATION_FAIL}] action:getJwt not return refreshToken`);
      }
    });
  }
}

function getWeixinCode () {
  return getQuery('code') || getHash('code');
};