import { ICloudbase } from '@cloudbase/types';
import { utils, constants, helpers } from '@cloudbase/utilities';
import { ICloudbaseCache } from '@cloudbase/types/cache';
import { ICloudbaseRequest } from '@cloudbase/types/request';
import { ICloudbaseAuthConfig, IUser, IUserInfo, ILoginState } from '@cloudbase/types/auth';
import { ICloudbaseComponent } from '@cloudbase/types/component';

import { authModels, CloudbaseOAuth } from '@cloudbase/oauth'

declare const cloudbase: ICloudbase;

const { printWarn, throwError } = utils;
const { ERRORS, COMMUNITY_SITE_URL } = constants;
const { catchErrorsDecorator } = helpers;

const COMPONENT_NAME = 'auth';

interface UserInfo {
  uid?: string;
  gender?: string;
  avatarUrl?: string;
  picture?: string;
  email?: string;
  email_verified?: boolean;
  phone_number?: string;
  username?: string;
  name?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  sub?: string;
  created_from?: string;
}

interface IUserOptions {
  cache: ICloudbaseCache;
  // request: ICloudbaseRequest;
  oauthInstance: CloudbaseOAuth
}

class User implements IUser {
  public uid?: string;
  public gender?: string;
  public avatarUrl?: string;
  public picture?: string;
  public email?: string;
  public email_verified?: boolean;
  public phone_number?: string;
  public username?: string;
  public name?: string;
  public providers?: {
    id?: string;
    provider_user_id?: string;
    name?: string;
  }[]
  public birthdate?: string;
  public zoneinfo?: string;
  public locale?: string;
  public sub?: string;
  public created_from?: string;

  private _cache: ICloudbaseCache;
  private _oauthInstance: CloudbaseOAuth // CloudbaseOAuth 类型

  constructor(options: IUserOptions) {
    const { cache, oauthInstance } = options;
    this._cache = cache;
    this._oauthInstance = oauthInstance

    this._setUserInfo();
  }
  /**
   * 获取本地用户信息-同步
   */
  public async checkLocalInfo() {
    this.uid = this._getLocalUserInfo('uid') as string;
    this.gender = this._getLocalUserInfo('gender') as string;
    this.picture = this._getLocalUserInfo('picture') as string;
    this.avatarUrl = this._getLocalUserInfo('avatarUrl') as string;
    this.email = this._getLocalUserInfo('email') as string;
    this.email_verified = this._getLocalUserInfo('email_verified') as boolean;
    this.phone_number = this._getLocalUserInfo('phone_number') as string
    this.username = this._getLocalUserInfo('username') as string
    this.name = this._getLocalUserInfo('name') as string
    this.birthdate = this._getLocalUserInfo('birthdate') as string
    this.zoneinfo = this._getLocalUserInfo('zoneinfo') as string
    this.locale = this._getLocalUserInfo('locale') as string
    this.sub = this._getLocalUserInfo('sub') as string
    this.created_from = this._getLocalUserInfo('created_from') as string
    this.providers = this._getLocalUserInfo('providers') as any
  }
  /**
   * 获取本地用户信息-异步
   */
  public async checkLocalInfoAsync() {
    this.uid = await this._getLocalUserInfoAsync('uid');
    this.gender = await this._getLocalUserInfoAsync('gender');
    this.picture = this._getLocalUserInfo('picture') as string;
    this.avatarUrl = await this._getLocalUserInfoAsync('avatarUrl');
    this.email = await this._getLocalUserInfoAsync('email');
    this.email_verified = this._getLocalUserInfo('email_verified') as boolean;
    this.phone_number = this._getLocalUserInfo('phone_number') as string
    this.username = await this._getLocalUserInfoAsync('username')
    this.name = this._getLocalUserInfo('name') as string
    this.birthdate = this._getLocalUserInfo('birthdate') as string
    this.zoneinfo = this._getLocalUserInfo('zoneinfo') as string
    this.locale = this._getLocalUserInfo('locale') as string
    this.sub = this._getLocalUserInfo('sub') as string
    this.created_from = this._getLocalUserInfo('created_from') as string
    this.providers = this._getLocalUserInfo('providers') as any
  }


  /**
   * 更新用户信息
   * @param userInfo
   */
  @catchErrorsDecorator({
    title: '更新用户信息失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 User.update() 的语法或参数是否正确',
      '  2 - 用户信息中是否包含非法值',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async update(userInfo: IUserInfo): Promise<void> {
    const { name, gender, avatarUrl, province, country, city } = userInfo;
    const newUserInfo = await this._oauthInstance.authApi.setUserProfile({ name, gender, avatarUrl, province, country, city })

    this._setLocalUserInfo(newUserInfo);
  }
  /**
   * 更新密码
   * @param newPassword
   * @param oldPassword
   */
  @catchErrorsDecorator({
    title: '更新密码失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 User.updatePassword() 的语法或参数是否正确',
      '  3 - 新密码中是否包含非法字符',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public updatePassword(newPassword: string, oldPassword: string) {
    return this._oauthInstance.authApi.updatePasswordByOld({
      old_password: oldPassword,
      new_password: newPassword
    })
  }

  /**
   * 更新用户名
   * @param username
   */
  @catchErrorsDecorator({
    title: '更新用户名失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 User.updateUsername() 的语法或参数是否正确',
      '  2 - 当前环境是否开通了用户名密码登录',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public updateUsername(username: string) {
    if (typeof username !== 'string') {
      throwError(ERRORS.INVALID_PARAMS, 'username must be a string');
    }

    return this.update({
      username
    })
  }

  /**
   * 刷新本地用户信息。当用户在其他客户端更新用户信息之后，可以调用此接口同步更新之后的信息。
   */
  @catchErrorsDecorator({
    title: '刷新本地用户信息失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 User.refresh() 的语法或参数是否正确',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async refresh(): Promise<IUserInfo> {
    const newUserInfo = await this._oauthInstance.authApi.getUserInfo()
    this._setLocalUserInfo(newUserInfo);
    return newUserInfo;
  }

  private _getLocalUserInfo(key: string): string | boolean {
    const { userInfoKey } = this._cache.keys;
    const userInfo = this._cache.getStore(userInfoKey);
    return userInfo[key];
  }

  private async _getLocalUserInfoAsync(key: string): Promise<string> {
    const { userInfoKey } = this._cache.keys;
    const userInfo = await this._cache.getStoreAsync(userInfoKey);
    return userInfo[key];
  }

  private _setUserInfo() {
    const { userInfoKey } = this._cache.keys;
    const userInfo = this._cache.getStore(userInfoKey);
    [
      'uid',
      'email',
      'name',
      'gender',
      'picture',
      'avatarUrl',
      'phone',
      'email_verified',
      'phone_number',
      'birthdate',
      'zoneinfo',
      'locale',
      'sub',
      'created_from',
      'providers',
      'username'
    ].forEach(infoKey => {
      this[infoKey] = userInfo[infoKey];
    });
  }

  private _setLocalUserInfo(userInfo: any) {
    const { userInfoKey } = this._cache.keys;
    this._cache.setStore(userInfoKey, userInfo);
    this._setUserInfo();
  }
}
interface ILoginStateOptions extends IUserOptions {
  envId: string;
}
export class LoginState implements ILoginState {
  public user: IUser;
  public oauthLoginState: any

  private _oauthInstance: CloudbaseOAuth
  private _cache: ICloudbaseCache;

  constructor(options: ILoginStateOptions) {
    const { envId, cache, oauthInstance } = options;
    if (!envId) {
      throwError(ERRORS.INVALID_PARAMS, 'envId is not defined');
    }
    this._cache = cache;
    this._oauthInstance = oauthInstance

    this.user = new User({
      cache: this._cache,
      oauthInstance
    });
  }

  public checkLocalState() {
    this.oauthLoginState = this._oauthInstance?.authApi.hasLoginStateSync()
    this.user.checkLocalInfo();
  }

  public async checkLocalStateAsync() {
    await this._oauthInstance?.authApi.getLoginState()
    await this.user.checkLocalInfoAsync();
  }
}

class Auth {
  private readonly _config: ICloudbaseAuthConfig;
  private readonly _cache: ICloudbaseCache
  // private readonly _request: ICloudbaseRequest;

  private _oauthInstance: CloudbaseOAuth

  constructor(config: ICloudbaseAuthConfig & { cache: ICloudbaseCache, request?: ICloudbaseRequest, runtime?: string }) {
    this._config = config;
    this._cache = config.cache;
    // this._request = config.request;
    this._oauthInstance = config.oauthInstance
  }

  /**
  * 绑定手机号
  * @param phoneNumber
  * @param phoneCode
  */
  @catchErrorsDecorator({
    title: '绑定手机号失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().bindPhoneNumber() 的语法或参数是否正确',
      '  2 - 当前环境是否开通了短信验证码登录',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async bindPhoneNumber(params: authModels.BindPhoneRequest) {
    return this._oauthInstance.authApi.bindPhone(params)
  }

  /**
   * 解绑三方绑定
   * @param loginType
   */
  @catchErrorsDecorator({
    title: '解除三方绑定失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().unbindProvider() 的语法或参数是否正确',
      '  2 - 当前账户是否已经与此登录方式解绑',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async unbindProvider(params: authModels.UnbindProviderRequest): Promise<void> {
    return this._oauthInstance.authApi.unbindProvider(params)
  }

  /**
 * 更新邮箱地址
 * @param email
 * @param sudo_token
 * @param verification_token
 */
  @catchErrorsDecorator({
    title: '绑定邮箱地址失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().bindEmail() 的语法或参数是否正确',
      '  2 - 当前环境是否开通了邮箱密码登录',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public bindEmail(params: authModels.BindEmailRequest) {
    return this._oauthInstance.authApi.bindEmail(params)
  }

  /**
   * verify
   * @param {authModels.VerifyRequest} params
   * @returns {Promise<authModels.VerifyResponse>}
   * @memberof User
   */
  @catchErrorsDecorator({
    title: '验证码验证失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().verify() 的语法或参数是否正确',
      '  2 - 当前环境是否开通了手机验证码/邮箱登录',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async verify(params: authModels.VerifyRequest): Promise<authModels.VerifyResponse> {
    return this._oauthInstance.authApi.verify(params)
  }

  /**
   * 获取验证码
   * @param {authModels.GetVerificationRequest} params
   * @returns {Promise<authModels.GetVerificationResponse>}
   * @memberof User
   */
  @catchErrorsDecorator({
    title: '获取验证码失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().getVerification() 的语法或参数是否正确',
      '  2 - 当前环境是否开通了手机验证码/邮箱登录',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async getVerification(
    params: authModels.GetVerificationRequest,
  ): Promise<authModels.GetVerificationResponse> {
    return this._oauthInstance.authApi.getVerification(params)
  }

  /**
   * 获取当前登录的用户信息-同步
   */
  get currentUser() {
    if (this._cache.mode === 'async') {
      // async storage的平台调用此API提示
      printWarn(ERRORS.INVALID_OPERATION, 'current platform\'s storage is asynchronous, please use getCurrentUser insteed');
      return;
    }

    const loginState = this.hasLoginState();

    if (loginState) {
      return loginState.user || null;
    } else {
      return null;
    }
  }

  /**
   * 获取当前登录的用户信息-异步
   */
  @catchErrorsDecorator({
    title: '获取用户信息失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().getCurrenUser() 的语法或参数是否正确',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async getCurrentUser() {
    const loginState = await this.getLoginState();
    if (loginState) {
      await loginState.user.checkLocalInfoAsync();
      return loginState.user || null;
    } else {
      return null;
    }
  }


  /**
   * 匿名登录
   * @returns {Promise<ILoginState>}
   * @memberof Auth
   */
  @catchErrorsDecorator({
    title: '匿名登录失败',
    messages: [
      '请确认以下各项：',
      '  1 - 当前环境是否开启了匿名登录',
      '  2 - 调用 auth().signInAnonymously() 的语法或参数是否正确',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async signInAnonymously(): Promise<ILoginState> {
    await this._oauthInstance.authApi.signInAnonymously()
    return this.createLoginState()
  }

  /**
   * 设置获取自定义登录 ticket 函数
   * @param {authModels.GetCustomSignTicketFn} getTickFn
   * @memberof Auth
   */
  public setCustomSignFunc(getTickFn: authModels.GetCustomSignTicketFn): void {
    this._oauthInstance.authApi.setCustomSignFunc(getTickFn)
  }

  /**
   *
   * @returns {Promise<ILoginState>}
   * @memberof Auth
   */
  @catchErrorsDecorator({
    title: '自定义登录失败',
    messages: [
      '请确认以下各项：',
      '  1 - 当前环境是否开启了自定义登录',
      '  2 - 调用 auth().signInWithCustomTicket() 的语法或参数是否正确',
      '  3 - ticket 是否归属于当前环境',
      '  4 - 创建 ticket 的自定义登录私钥是否过期',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async signInWithCustomTicket(): Promise<ILoginState> {
    await this._oauthInstance.authApi.signInWithCustomTicket()
    return this.createLoginState()
  }

  /**
   *
   * @param {authModels.SignInRequest} params
   * @returns {Promise<ILoginState>}
   * @memberof Auth
   */
  public async signIn(params: authModels.SignInRequest): Promise<ILoginState> {
    await this._oauthInstance.authApi.signIn(params)
    return this.createLoginState()
  }

  /**
   *
   * @param {authModels.SignUpRequest} params
   * @returns {Promise<ILoginState>}
   * @memberof Auth
   */
  @catchErrorsDecorator({
    title: '注册失败',
    messages: [
      '请确认以下各项：',
      '  1 - 当前环境是否开启了指定登录方式',
      '  2 - 调用 auth().signUp() 的语法或参数是否正确',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async signUp(params: authModels.SignUpRequest): Promise<ILoginState> {
    console.log('ggg')
    await this._oauthInstance.authApi.signUp(params)
    return this.createLoginState()
  }

  /**
   * 设置密码
   * @param {authModels.SetPasswordRequest} params
   * @returns {Promise<void>}
   * @memberof Auth
   */
  public async setPassword(params: authModels.SetPasswordRequest): Promise<void> {
    return this._oauthInstance.authApi.setPassword(params)
  }

  /**
   * 检测用户名是否已经占用
   * @param username
   */
  @catchErrorsDecorator({
    title: '获取用户是否被占用失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().isUsernameRegistered() 的语法或参数是否正确',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async isUsernameRegistered(username: string): Promise<boolean> {
    if (typeof username !== 'string') {
      throwError(ERRORS.INVALID_PARAMS, 'username must be a string');
    }

    const queryRes = await this.queryUser({
      username
    })

    return parseInt(queryRes.total) ? true : false
  }

  /**
   * 登出
   */
  @catchErrorsDecorator({
    title: '用户登出失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().signOut() 的语法或参数是否正确',
      '  2 - 当前用户是否为匿名登录（匿名登录不支持signOut）',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async signOut() {
    const { userInfoKey } = this._cache.keys;
    await this._oauthInstance.authApi.signOut()
    await this._cache.removeStoreAsync(userInfoKey)
  }

  /**
   * 获取本地登录态-同步
   */
  public hasLoginState(): ILoginState | null {
    if (this._cache.mode === 'async') {
      // async storage的平台调用此API提示
      printWarn(ERRORS.INVALID_OPERATION, 'current platform\'s storage is asynchronous, please use getLoginState insteed');
      return;
    }

    const oauthLoginState = this._oauthInstance?.authApi.hasLoginStateSync()
    if (oauthLoginState) {
      const loginState = new LoginState({
        envId: this._config.env,
        cache: this._cache,
        oauthInstance: this._oauthInstance,
      })
      return loginState
    } else {
      return null
    }
  }

  /**
   * 获取本地登录态-异步
   * 此API为兼容异步storage的平台
   */
  @catchErrorsDecorator({
    title: '获取本地登录态失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().getLoginState() 的语法或参数是否正确',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async getLoginState() {
    const oauthLoginState = await this._oauthInstance.authApi.getLoginState()
    if (oauthLoginState) {
      const loginState = new LoginState({
        envId: this._config.env,
        cache: this._cache,
        oauthInstance: this._oauthInstance,
      })
      return loginState
    }

    return null
  }

  @catchErrorsDecorator({
    title: '获取用户信息失败',
    messages: [
      '请确认以下各项：',
      '  1 - 是否已登录',
      '  2 - 调用 auth().getUserInfo() 的语法或参数是否正确',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async getUserInfo(): Promise<IUserInfo> {
    return this._oauthInstance.authApi.getUserInfo()
  }


  /**
   * 为已有账户绑第三方账户
   * @param {authModels.BindWithProviderRequest} params
   * @returns {Promise<void>}
   * @memberof Auth
   */
  @catchErrorsDecorator({
    title: '绑定第三方登录方式失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().bindWithProvider() 的语法或参数是否正确',
      '  2 - 此账户是否已经绑定此第三方',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async bindWithProvider(
    params: authModels.BindWithProviderRequest,
  ): Promise<void> {
    return this._oauthInstance.authApi.bindWithProvider(params)
  }

  /**
   * 查询用户
   * @param {authModels.QueryUserProfileRequest} appended_params
   * @returns {Promise<authModels.UserProfile>}
   * @memberof Auth
   */
  public async queryUser(
    queryObj: authModels.QueryUserProfileRequest,
  ): Promise<authModels.QueryUserProfileResponse> {
    return this._oauthInstance.authApi.queryUserProfile(queryObj)
  }

  public async getAccessToken() {
    const oauthAccessTokenRes = await this._oauthInstance.oauth2client.getAccessToken()
    return {
      accessToken: oauthAccessTokenRes,
      env: this._config.env
    };
  }

  public async grantProviderToken(
    params: authModels.GrantProviderTokenRequest,
  ): Promise<authModels.GrantProviderTokenResponse> {
    return this._oauthInstance.authApi.grantProviderToken(params)
  }

  public async signInWithProvider(
    params: authModels.SignInWithProviderRequest,
  ): Promise<ILoginState> {
    await this._oauthInstance.authApi.signInWithProvider(params)
    return this.createLoginState()
  }

  public async grantToken(params: authModels.GrantTokenRequest): Promise<ILoginState> {
    await this._oauthInstance.authApi.grantToken(params)
    return this.createLoginState()
  }

  public async genProviderRedirectUri(
    params: authModels.GenProviderRedirectUriRequest,
  ): Promise<authModels.GenProviderRedirectUriResponse> {
    return this._oauthInstance.authApi.genProviderRedirectUri(params)
  }

  public async resetPassword(params: authModels.ResetPasswordRequest): Promise<void> {
    return this._oauthInstance.authApi.resetPassword(params)
  }

  public async deviceAuthorize(params: authModels.DeviceAuthorizeRequest): Promise<authModels.DeviceAuthorizeResponse> {
    return this._oauthInstance.authApi.deviceAuthorize(params)
  }

  private async createLoginState(): Promise<ILoginState> {
    const loginState = new LoginState({
      envId: this._config.env,
      cache: this._cache,
      oauthInstance: this._oauthInstance,
    })

    await loginState.checkLocalStateAsync();
    await loginState.user.refresh();
    return loginState
  }
}

const component: ICloudbaseComponent = {
  name: COMPONENT_NAME,
  namespace: 'auth',
  entity: function (config: Pick<ICloudbaseAuthConfig, 'region' | 'persistence'> = { region: '', persistence: 'local' }) {
    if (this.authInstance) {
      printWarn(ERRORS.INVALID_OPERATION, 'every cloudbase instance should has only one auth object');
      return this.authInstance;
    }
    const { adapter, runtime } = this.platform;
    // 如不明确指定persistence则优先取各平台adapter首选，其次localStorage
    const newPersistence = config.persistence || adapter.primaryStorage;
    if (newPersistence && (newPersistence !== this.config.persistence)) {
      this.updateConfig({ persistence: newPersistence })
    }

    const { env, persistence, debug, clientId } = this.config;
    const oauthInstance = new CloudbaseOAuth({
      clientId: clientId,
      apiOrigin: this.request.getBaseEndPoint(),
    })

    this.oauthInstance = oauthInstance

    this.authInstance = new Auth({
      env,
      region: config.region,
      persistence,
      debug,
      cache: this.cache,
      // request: this.request,
      runtime: runtime,
      _fromApp: this,
      // oauthInstance: this.oauthInstance || (this as any).oauth()
      oauthInstance
    });

    return this.authInstance;
  }
}

try {
  // 尝试自动注册至全局变量cloudbase
  // 此行为只在浏览器环境下有效
  cloudbase.registerComponent(component);
} catch (e) { }

export {
  UserInfo,
  Auth,
};
/**
 * @api 手动注册至cloudbase app
 */
export function registerAuth(app: Pick<ICloudbase, 'registerComponent'>) {
  try {
    app.registerComponent(component);
  } catch (e) {
    console.warn(e);
  }
}

