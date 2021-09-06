import { ICloudbaseComponent } from '@cloudbase/types/component';
import { ICloudbase } from '@cloudbase/types';
import { getBaseEndPoint } from '@cloudbase/app'
import { helpers } from '@cloudbase/utilities'
const { stopOAuthLoginWithAuth } = helpers

export { Syntax, ErrorType } from './oauth2client/consts';

import { OAuth2Client } from './oauth2client/oauth2client'

export {
  defaultStorage,
  defaultRequest,
  ToResponseErrorOptions,
  toResponseError,
  generateRequestId,
  OAuth2Client,
} from './oauth2client/oauth2client';

export { AuthClient, SimpleStorage } from './oauth2client/interface';

import { Credentials } from './oauth2client/models'
export {
  Credentials,
  ResponseError,
  OAuth2ClientOptions,
  AuthClientRequestOptions,
} from './oauth2client/models';

import { AuthOptions, Auth } from './auth/apis'

export { AuthOptions, Auth } from './auth/apis';

import * as authModels from './auth/models';
export { authModels };

declare const cloudbase: ICloudbase;

const COMPONENT_NAME = 'oauth';

class CloudbaseOAuth {
  public oauth2client: OAuth2Client
  public authApi: Auth
  private _fromApp: ICloudbase

  constructor(authOptions: AuthOptions) {
    const { apiOrigin, clientId, _fromApp } = authOptions
    this._fromApp = _fromApp
    this.oauth2client = new OAuth2Client({
      apiOrigin,
      clientId
    })

    this.authApi = new Auth({
      credentialsClient: this.oauth2client,
      ...authOptions
    })
  }

  public async checkFromAuthV1OrV2() {
    const { _fromApp } = this
    const authInstance = _fromApp.authInstance
    const oauthInstance = _fromApp.oauthInstance || (_fromApp as any).oauth()
    const authLogin = authInstance && await authInstance.getLoginState()
    if (authLogin) {
      return 'auth'
    }
    const oauthLogin = oauthInstance && await oauthInstance.hasLoginState()
    if (oauthLogin) {
      return 'oauth'
    }
    return ''
  }


  /**
   * 登录
   * @param {authModels.SignInRequest} params
   * @returns {Promise<Credentials>}
   * @memberof CloudbaseOAuth
   */
  @stopOAuthLoginWithAuth()
  public async signIn(params: authModels.SignInRequest): Promise<Credentials> {
    return this.authApi.signIn(params)
  }

  public async signOut(): Promise<any> {
    return this.authApi.signOut()
  }

  /**
   * check 当前是否已 oauth 登录
   * @returns {Promise<boolean>}
   * @memberof CloudbaseOAuth
   */
  public async hasLoginState(): Promise<boolean> {
    return this.authApi.hasLoginState()
  }

  public async getUserInfo(): Promise<authModels.UserProfile> {
    return this.authApi.getUserInfo()
  }

  /**
   * 获取 oauth 登录态
   * @returns {Promise<boolean>}
   * @memberof CloudbaseOAuth
   */
  public async getLoginState(): Promise<Credentials> {
    return this.authApi.getLoginState()
  }

  public hasLoginStateSync(): Credentials {
    return this.authApi.hasLoginStateSync()
  }

  /**
   * 匿名登录
   * @returns {Promise<Credentials>}
   * @memberof CloudbaseOAuth
   */
  @stopOAuthLoginWithAuth()
  public async signInAnonymously(): Promise<Credentials> {
    return this.authApi.signInAnonymously()
  }
}

const component: ICloudbaseComponent = {
  name: COMPONENT_NAME,
  namespace: 'oauth',
  entity: function () {

    if (this.oauthInstance) {
      return this.oauthInstance;
    }

    const { env } = this.config;
    this.oauthInstance = new CloudbaseOAuth({
      clientId: env,
      apiOrigin: getBaseEndPoint(),
      _fromApp: this
    });
    return this.oauthInstance;
  }
}

try {
  // 尝试自动注册至全局变量cloudbase
  // 此行为只在浏览器环境下有效
  cloudbase.registerComponent(component);
} catch (e) { }

/**
 * @api 手动注册至cloudbase app
 */
export function registerOAuth(app: Pick<ICloudbase, 'registerComponent'>) {
  try {
    app.registerComponent(component);
  } catch (e) {
    console.warn(e);
  }
}