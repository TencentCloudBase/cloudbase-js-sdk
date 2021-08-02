import { ICloudbase } from '@cloudbase/types';
import { events, adapters, utils, constants, helpers } from '@cloudbase/utilities';
import { ICloudbaseCache } from '@cloudbase/types/cache';
import { ICloudbaseRequest } from '@cloudbase/types/request';
import { ICloudbaseAuthConfig, ICredential, IUser, IUserInfo, IAuthProvider, ILoginState } from '@cloudbase/types/auth';
import { ICloudbaseComponent } from '@cloudbase/types/component';

import { LOGINTYPE, OAUTH2_LOGINTYPE_PREFIX } from './constants';

import { AuthProvider } from './providers/base';

import { OAuth2AuthProvider, IOAuth2AuthProviderOptions } from './providers/oauth2AuthProvider';

import { AnonymousAuthProvider } from './providers/anonymousAuthProvider';
import { CustomAuthProvider } from './providers/customAuthProvider';
import { EmailAuthProvider } from './providers/emailAuthProvider';
import { PhoneAuthProvider, SIGN_METHOD } from './providers/phoneAuthProvider'
import { UsernameAuthProvider } from './providers/usernameAuthProvider';
import { WeixinAuthProvider } from './providers/weixinAuthProvider';

declare const cloudbase: ICloudbase;

const { CloudbaseEventEmitter } = events;
const { RUNTIME } = adapters;
const { printWarn, throwError, transformPhone } = utils;
const { ERRORS, COMMUNITY_SITE_URL } = constants;
const { catchErrorsDecorator } = helpers;

const COMPONENT_NAME = 'auth';

interface UserInfo {
  openid: string;
  nickname?: string;
  sex?: number;
  province?: string;
  city?: string;
  country?: string;
  headimgurl?: string;
  privilege?: [string];
  unionid?: string;
}

const eventBus = new CloudbaseEventEmitter();

interface IUserOptions {
  cache: ICloudbaseCache;
  request: ICloudbaseRequest;
}

class User implements IUser {
  public uid: string;
  public loginType: string;
  public openid: string;
  public wxOpenId: string;
  public wxPublicId: string;
  public unionId: string;
  public qqMiniOpenId: string;
  public customUserId: string;
  public nickName: string;
  public gender: string;
  public avatarUrl: string;
  public email: string;
  public hasPassword: boolean;
  public phone?: string;
  public username?: string;
  public location?: {
    country?: string;
    province?: string;
    city?: string;
  };

  private _cache: ICloudbaseCache;
  private _request: ICloudbaseRequest;

  constructor(options: IUserOptions) {
    const { cache, request } = options;
    this._cache = cache;
    this._request = request;

    this._setUserInfo();
  }
  /**
   * 获取本地用户信息-同步
   */
  public async checkLocalInfo() {
    this.uid = this._getLocalUserInfo('uid');
    this.loginType = this._getLocalUserInfo('loginType');
    this.openid = this._getLocalUserInfo('wxOpenId');
    this.wxOpenId = this._getLocalUserInfo('wxOpenId');
    this.wxPublicId = this._getLocalUserInfo('wxPublicId');
    this.unionId = this._getLocalUserInfo('wxUnionId');
    this.qqMiniOpenId = this._getLocalUserInfo('qqMiniOpenId');
    this.customUserId = this._getLocalUserInfo('customUserId');
    this.nickName = this._getLocalUserInfo('nickName');
    this.gender = this._getLocalUserInfo('gender');
    this.avatarUrl = this._getLocalUserInfo('avatarUrl');
    this.email = this._getLocalUserInfo('email');
    this.hasPassword = Boolean(this._getLocalUserInfo('hasPassword'));
    this.phone = this._getLocalUserInfo('phone')
    this.username = this._getLocalUserInfo('username')
    this.location = {
      country: this._getLocalUserInfo('country'),
      province: this._getLocalUserInfo('province'),
      city: this._getLocalUserInfo('city')
    };
  }
  /**
   * 获取本地用户信息-异步
   */
  public async checkLocalInfoAsync() {
    this.uid = await this._getLocalUserInfoAsync('uid');
    this.loginType = await this._getLocalUserInfoAsync('loginType');
    this.openid = await this._getLocalUserInfoAsync('wxOpenId');
    this.wxOpenId = await this._getLocalUserInfoAsync('wxOpenId');
    this.wxPublicId = await this._getLocalUserInfoAsync('wxPublicId');
    this.unionId = await this._getLocalUserInfoAsync('wxUnionId');
    this.qqMiniOpenId = await this._getLocalUserInfoAsync('qqMiniOpenId');
    this.customUserId = await this._getLocalUserInfoAsync('customUserId');
    this.nickName = await this._getLocalUserInfoAsync('nickName');
    this.gender = await this._getLocalUserInfoAsync('gender');
    this.avatarUrl = await this._getLocalUserInfoAsync('avatarUrl');
    this.email = await this._getLocalUserInfoAsync('email');
    this.hasPassword = Boolean(await this._getLocalUserInfoAsync('hasPassword'));
    this.phone = await this._getLocalUserInfoAsync('phone')
    this.username = await this._getLocalUserInfoAsync('username')
    this.location = {
      country: await this._getLocalUserInfoAsync('country'),
      province: await this._getLocalUserInfoAsync('province'),
      city: await this._getLocalUserInfoAsync('city')
    };
  }

  /**
   * 将当前账户与自定义登录 Ticket 进行绑定，绑定之后便可以通过自定义登录登录当前云开发账户。
   * @param {string} ticket 自定义登录ticket
   */
  @catchErrorsDecorator({
    title: '绑定自定义登录失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 User.linkWithTicket() 的语法或参数是否正确',
      '  2 - 此账户是否已经绑定自定义登录',
      '  3 - ticket 参数是否归属当前环境',
      '  4 - 创建 ticket 的自定义登录私钥是否过期',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public linkWithTicket(ticket: string): Promise<void> {
    if (typeof ticket !== 'string') {
      throw new Error('ticket must be string');
    }
    return this._request.send('auth.linkWithTicket', { ticket });
  }
  /**
   * 将当前账户与第三方鉴权提供方，以重定向的形式，进行绑定，绑定之后便可以通过第三方鉴权提供方登录当前的云开发账户。
   * @param provider 特定登录方式的provider，必须具备signInWithRedirect方法
   */
  @catchErrorsDecorator({
    title: '绑定第三方登录方式失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 User.linkWithRedirect() 的语法或参数是否正确',
      '  2 - 此账户是否已经绑定此第三方',
      '  3 - 此第三方是否已经授权',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public linkWithRedirect(provider: IAuthProvider): void {
    provider.signInWithRedirect();
  }
  /**
   * 获取当前账户的微信 UnionID 绑定的云开发账户列表。如果当前账户不存在 UnionID，会返回错误。
   */
  @catchErrorsDecorator({
    title: '获取账户列表失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 User.getLinkedUidList() 的语法或参数是否正确',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async getLinkedUidList() {
    const { data } = await this._request.send('auth.getLinkedUidList', {});
    let hasPrimaryUid = false;
    const users = data.users as IUserInfo[];
    for (const user of users) {
      if (user.wxOpenId && user.wxPublicId) {
        hasPrimaryUid = true;
        break;
      }
    }
    return {
      users,
      hasPrimaryUid
    };
  }
  /**
   * 设置微信主账号，通常搭配和 User.getLinkedUidList() 使用，用于在同个微信 UnionID 对应的多个云开发账号中，设置其中一个为主账号
   * 设置之后，通过 UnionID 登录便会登录至主账号之上。
   * @param uid
   */
  @catchErrorsDecorator({
    title: '设置微信主账号失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 User.setPrimaryUid() 的语法或参数是否正确',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public setPrimaryUid(uid: string) {
    return this._request.send('auth.setPrimaryUid', { uid });
  }
  /**
   * 解绑某个登录方式
   * @param loginType
   */
  @catchErrorsDecorator({
    title: '接触绑定失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 User.unlink() 的语法或参数是否正确',
      '  2 - 当前账户是否已经与此登录方式解绑',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public unlink(loginType: 'CUSTOM' | 'WECHAT-OPEN' | 'WECHAT-PUBLIC' | 'WECHAT-UNION' | 'PHONE') {
    return this._request.send('auth.unlink', { platform: loginType });
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
    const { nickName, gender, avatarUrl, province, country, city } = userInfo;
    const { data: newUserInfo } = await this._request.send('auth.updateUserInfo', { nickName, gender, avatarUrl, province, country, city });
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
    return this._request.send('auth.updatePassword', {
      oldPassword,
      newPassword
    });
  }
  /**
   * 更新邮箱地址
   * @param newEmail
   */
  @catchErrorsDecorator({
    title: '更新邮箱地址失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 User.updateEmail() 的语法或参数是否正确',
      '  2 - 当前环境是否开通了邮箱密码登录',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public updateEmail(newEmail: string, password?: string) {
    return this._request.send('auth.updateEmail', {
      newEmail,
      password
    });
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

    return this._request.send('auth.updateUsername', {
      username
    });
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
    const action = 'auth.getUserInfo';
    const { data: userInfo } = await this._request.send(action, {});
    this._setLocalUserInfo(userInfo);
    return userInfo;
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
      '  1 - 调用 auth().linkWithPhoneNumber() 的语法或参数是否正确',
      '  2 - 当前环境是否开通了短信验证码登录',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async linkWithPhoneNumber(phoneNumber: string, phoneCode: string) {
    return this._request.send('auth.linkOrUpdatePhoneNumber', {
      phoneNumber: transformPhone(phoneNumber),
      phoneCode
    });
  }
  /**
   * 更新手机号
   * @param phoneNumber
   * @param phoneCode
   */
  @catchErrorsDecorator({
    title: '更新手机号失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用语法或参数是否正确',
      '  2 - 当前环境是否开通了短信验证码登录',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async updatePhoneNumber(phoneNumber: string, phoneCode: string) {
    return this._request.send('auth.linkOrUpdatePhoneNumber', {
      phoneNumber: transformPhone(phoneNumber),
      phoneCode
    });
  }

  private _getLocalUserInfo(key: string): string {
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
      'loginType',
      'openid',
      'wxOpenId',
      'wxPublicId',
      'unionId',
      'qqMiniOpenId',
      'email',
      'hasPassword',
      'customUserId',
      'nickName',
      'gender',
      'avatarUrl',
      'phone',
      'username'
    ].forEach(infoKey => {
      this[infoKey] = userInfo[infoKey];
    });

    this.location = {
      country: userInfo['country'],
      province: userInfo['province'],
      city: userInfo['city']
    };
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
  public credential: ICredential;
  public user: IUser;

  private _cache: ICloudbaseCache;
  private _loginType: string;

  constructor(options: ILoginStateOptions) {
    const { envId, cache, request } = options;
    if (!envId) {
      throwError(ERRORS.INVALID_PARAMS, 'envId is not defined');
    }
    this._cache = cache;

    this.user = new User({
      cache,
      request
    });
  }


  public async checkLocalState() {
    const { refreshTokenKey, accessTokenKey, accessTokenExpireKey } = this._cache.keys;
    const refreshToken = this._cache.getStore(refreshTokenKey);
    const accessToken = this._cache.getStore(accessTokenKey);
    const accessTokenExpire = this._cache.getStore(accessTokenExpireKey);

    this.credential = {
      refreshToken,
      accessToken,
      accessTokenExpire
    };

    this._loginType = this._cache.getStore(this._cache.keys.loginTypeKey);

    this.user.checkLocalInfo();
  }
  public async checkLocalStateAsync() {
    const { refreshTokenKey, accessTokenKey, accessTokenExpireKey } = this._cache.keys;
    const refreshToken = await this._cache.getStoreAsync(refreshTokenKey);
    const accessToken = await this._cache.getStoreAsync(accessTokenKey);
    const accessTokenExpire = await this._cache.getStoreAsync(accessTokenExpireKey);

    this.credential = {
      refreshToken,
      accessToken,
      accessTokenExpire
    };

    this._loginType = await this._cache.getStoreAsync(this._cache.keys.loginTypeKey);


    await this.user.checkLocalInfoAsync();
  }

  get isAnonymousAuth() {
    return this.loginType === LOGINTYPE.ANONYMOUS;
  }

  get isCustomAuth() {
    return this.loginType === LOGINTYPE.CUSTOM;
  }

  get isWeixinAuth() {
    return this.loginType === LOGINTYPE.WECHAT || this.loginType === LOGINTYPE.WECHAT_OPEN || this.loginType === LOGINTYPE.WECHAT_PUBLIC;
  }

  get isUsernameAuth() {
    return this.loginType === LOGINTYPE.USERNAME;
  }

  get loginType() {
    return this._loginType
  }

  get isPhoneAuth() {
    return this.loginType === LOGINTYPE.PHONE
  }
}

class Auth {
  private readonly _config: ICloudbaseAuthConfig;
  private readonly _cache: ICloudbaseCache
  private readonly _request: ICloudbaseRequest;
  private readonly _runtime: string;
  private _anonymousAuthProvider: AnonymousAuthProvider;
  private _customAuthProvider: CustomAuthProvider;
  private _weixinAuthProvider: WeixinAuthProvider;
  private _emailAuthProvider: EmailAuthProvider;
  private _usernameAuthProvider: UsernameAuthProvider;
  private _phoneAuthProvider: PhoneAuthProvider;

  private _oAuth2AuthProvider: OAuth2AuthProvider;

  constructor(config: ICloudbaseAuthConfig & { cache: ICloudbaseCache, request: ICloudbaseRequest, runtime?: string }) {
    this._config = config;
    this._cache = config.cache;
    this._request = config.request;
    this._runtime = config.runtime || RUNTIME.WEB

    eventBus.on(EVENTS.LOGIN_TYPE_CHANGED, this._onLoginTypeChanged.bind(this));
  }

  /**
   * 获取当前登录的用户信息-同步
   */
  get currentUser() {
    if (this._cache.mode === 'async') {
      // async storage的平台调用此API提示
      printWarn(ERRORS.INVALID_OPERATION, 'current platform\'s storage is asynchronous, please use getCurrenUser insteed');
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
 * 获取当前登录类型-同步
 */
  get loginType(): LOGINTYPE {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
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
  public async getCurrenUser() {
    const loginState = await this.getLoginState();
    if (loginState) {
      await loginState.user.checkLocalInfoAsync();
      return loginState.user || null;
    } else {
      return null;
    }
  }
  /**
   * 获取当前登录类型-异步
   */
  public async getLoginType(): Promise<LOGINTYPE> {
    return await this._cache.getStoreAsync(this._cache.keys.loginTypeKey) as LOGINTYPE;
  }
  public async getAccessToken() {
    return {
      accessToken: (await this._request.getAccessToken()).accessToken,
      env: this._config.env
    };
  }
  public weixinAuthProvider({ appid, scope, state }): WeixinAuthProvider {
    if (!this._weixinAuthProvider) {
      this._weixinAuthProvider = new WeixinAuthProvider({
        ...this._config,
        cache: this._cache,
        request: this._request,
        runtime: this._runtime
      }, appid, scope, state);
    }
    return this._weixinAuthProvider;
  }
  public anonymousAuthProvider(): AnonymousAuthProvider {
    if (!this._anonymousAuthProvider) {
      this._anonymousAuthProvider = new AnonymousAuthProvider({
        ...this._config,
        cache: this._cache,
        request: this._request
      });
    }
    return this._anonymousAuthProvider;
  }
  public customAuthProvider(): CustomAuthProvider {
    if (!this._customAuthProvider) {
      this._customAuthProvider = new CustomAuthProvider({
        ...this._config,
        cache: this._cache,
        request: this._request
      });
    }
    return this._customAuthProvider;
  }
  public emailAuthProvider(): EmailAuthProvider {
    if (!this._emailAuthProvider) {
      this._emailAuthProvider = new EmailAuthProvider({
        ...this._config,
        cache: this._cache,
        request: this._request
      });
    }
    return this._emailAuthProvider;
  }
  public usernameAuthProvider(): UsernameAuthProvider {
    if (!this._usernameAuthProvider) {
      this._usernameAuthProvider = new UsernameAuthProvider({
        ...this._config,
        cache: this._cache,
        request: this._request
      });
    }
    return this._usernameAuthProvider;
  }

  public phoneAuthProvider(): PhoneAuthProvider {
    if (!this._phoneAuthProvider) {
      this._phoneAuthProvider = new PhoneAuthProvider({
        ...this._config,
        cache: this._cache,
        request: this._request
      });
    }
    return this._phoneAuthProvider;
  }

  /**
   * oAuth2AuthProvider
   * options
   * {
   *   providerId: 'google',
   *   scope: 'openid+email+profile',
   *   redirectUri: 'https://production-fv979-1258964769.ap-shanghai.app.tcloudbase.com'
   * }
   * @param {Object}  options 
   * @param {string}  options.providerId            - 供应商Id，如 WeChat、Google、Github 等
   * @param {string}  options.clientId              - 客户端Id，平台提供的客户端标识Id
   * @param {string}  [options.responseType=token]  - 响应类型：token、code
   * @param {string}  options.scope                 - 权限范围
   * @param {string}  options.redirectUri           - 授权成功回调地址
   * @param {boolean} options.syncProfile           - 是否同步用户 Profile 信息
   * @param {boolean} options.forceDisableSignUp    - 是否强制关闭用户注册
   * @returns 
   */
  public oAuth2AuthProvider(options: IOAuth2AuthProviderOptions = {}): OAuth2AuthProvider {
    if (!this._oAuth2AuthProvider) {
      this._oAuth2AuthProvider = new OAuth2AuthProvider({
        ...this._config,
        cache: this._cache,
        request: this._request,
        runtime: this._runtime
      }, options)
    }
    return this._oAuth2AuthProvider
  }

  /**
   * signWithOAuth2Popup - OAuth2弹窗登录
   */
  public signWithOAuth2Popup() {
    this._oAuth2AuthProvider.signInWithPopup()
  }

  public signInWithOAuth2Modal(elemId: string) {
    this._oAuth2AuthProvider.signInWithModal(elemId)
  }

  /**
   * 用户名密码登录
   * @param username
   * @param password
   */
  public async signInWithUsernameAndPassword(username: string, password: string) {
    return this.usernameAuthProvider().signIn(username, password);
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

    const { data } = await this._request.send('auth.isUsernameRegistered', {
      username
    });
    return data?.isRegistered;
  }
  /**
   * 邮箱密码登录
   * @param email
   * @param password
   */
  public async signInWithEmailAndPassword(email: string, password: string) {
    return this.emailAuthProvider().signIn(email, password);
  }
  /**
   * 邮箱密码注册
   * @param email
   * @param password
   */
  public async signUpWithEmailAndPassword(email: string, password: string) {
    return this.emailAuthProvider().signUp(email, password);
  }
  /**
   * 重置邮箱密码
   * @param email
   */
  public async sendPasswordResetEmail(email: string) {
    return this.emailAuthProvider().resetPassword(email);
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
    const loginType = await this.getLoginType()
    // if (loginType === LOGINTYPE.ANONYMOUS) {
    //   throw new Error(JSON.stringify({
    //     code: ERRORS.INVALID_OPERATION,
    //     msg: 'anonymous user doesn\'t support signOut action'
    //   }))
    // }
    const { refreshTokenKey, accessTokenKey, accessTokenExpireKey } = this._cache.keys

    const refresh_token = await this._cache.getStoreAsync(refreshTokenKey);
    if (!refresh_token) {
      return
    }

    if (loginType.startsWith(OAUTH2_LOGINTYPE_PREFIX)) {
      const accessToken = await this._cache.getStoreAsync(accessTokenKey)
      const accessTokenExpire = Number(await this._cache.getStoreAsync(accessTokenExpireKey))
      if (accessToken) {
        if (Date.now() < accessTokenExpire) {
          const resp = await this._request.fetch('/auth/v1/revoke', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token: accessToken
            })
          })
          const seqIdFromHeader = resp.headers.get('SeqId') || resp.headers.get('RequestId')
          if (resp.status >= 400 && resp.status < 500) {
            const body: any = await resp.json()
            const seqId = body.request_id || seqIdFromHeader
            throw new Error(`[OAuth2AuthProvider][status:${resp.status}][${body.error}(${body.error_code})] ${body.error_description} (${seqId})`)
          }
          else if (resp.status >= 500) {
            const body: any = await resp.json()
            const seqId = body.request_id || seqIdFromHeader
            throw new Error(`[OAuth2AuthProvider][status:${resp.status}][${body.error}(${body.error_code})] ${body.error_description} (${seqId})`)
          }
        }
        else {
          // console.warn(`[SignOut] accesstoken expired`)
        }
      }
      else {
        // console.warn(`[SignOut] accesstoken not exists`)
      }
    }
    else {
      await this._request.send('auth.logout', { refresh_token })
    }

    this._cache.removeStoreAsync(refreshTokenKey)
    this._cache.removeStoreAsync(accessTokenKey)
    this._cache.removeStoreAsync(accessTokenExpireKey)

    eventBus.fire(EVENTS.LOGIN_STATE_CHANGED)
    eventBus.fire(EVENTS.LOGIN_TYPE_CHANGED, {
      env: this._config.env,
      loginType: LOGINTYPE.NULL,
      persistence: this._config.persistence
    })

    return true
  }
  public async onLoginStateChanged(callback: Function) {
    eventBus.on(EVENTS.LOGIN_STATE_CHANGED, async () => {
      const loginState = await this.getLoginState();
      callback.call(this, loginState);
    });
    // 立刻执行一次回调
    const loginState = await this.getLoginState();
    callback.call(this, loginState);
  }
  public onLoginStateExpired(callback: Function) {
    eventBus.on(EVENTS.LOGIN_STATE_EXPIRED, callback.bind(this));
  }
  public onAccessTokenRefreshed(callback: Function) {
    eventBus.on(EVENTS.ACCESS_TOKEN_REFRESHD, callback.bind(this));
  }
  public onAnonymousConverted(callback: Function) {
    eventBus.on(EVENTS.ANONYMOUS_CONVERTED, callback.bind(this));
  }
  public onLoginTypeChanged(callback: Function) {
    eventBus.on(EVENTS.LOGIN_TYPE_CHANGED, async () => {
      const loginState = await this.getLoginState();
      callback.call(this, loginState);
    });
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
    const { refreshTokenKey } = this._cache.keys;
    const refreshToken = this._cache.getStore(refreshTokenKey);

    if (refreshToken) {
      const loginState = new LoginState({
        envId: this._config.env,
        cache: this._cache,
        request: this._request
      });
      loginState.checkLocalState();
      return loginState;
    } else {
      return null;
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
    const { refreshTokenKey } = this._cache.keys;
    const refreshToken = await this._cache.getStoreAsync(refreshTokenKey);
    if (refreshToken) {
      const loginState = new LoginState({
        envId: this._config.env,
        cache: this._cache,
        request: this._request
      });
      await loginState.checkLocalStateAsync();
      return loginState;
    } else {
      return null;
    }
  }

  public shouldRefreshAccessToken(hook) {
    // @ts-ignore
    this._request._shouldRefreshAccessTokenHook = hook.bind(this);
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
  public async getUserInfo(): Promise<any> {
    const action = 'auth.getUserInfo';

    const res = await this._request.send(action, {});
    if (res.code) {
      return res;
    } else {
      return {
        ...res.data,
        requestId: res.seqId
      };
    }
  }
  /**
   * 获取Http鉴权header，用于云接入 HTTP 访问云函数时的鉴权
   */
  public getAuthHeader() {
    const { refreshTokenKey, accessTokenKey } = this._cache.keys;
    const refreshToken = this._cache.getStore(refreshTokenKey);
    const accessToken = this._cache.getStore(accessTokenKey);
    return {
      'x-cloudbase-credentials': accessToken + '/@@/' + refreshToken
    };
  }
  /**
   * 异步模式获取Http鉴权header，用于云接入 HTTP 访问云函数时的鉴权
   * 调用此API会刷新登录态
   */
  public async getAuthHeaderAsync() {
    await this._request.refreshAccessToken();

    const { refreshTokenKey, accessTokenKey } = this._cache.keys;
    const refreshToken = await this._cache.getStoreAsync(refreshTokenKey);
    const accessToken = await this._cache.getStoreAsync(accessTokenKey);
    return {
      'x-cloudbase-credentials': accessToken + '/@@/' + refreshToken
    };
  }

  /**
 * 发送验证码
 * @param phoneNumber
 * @param phoneCode
 */
  @catchErrorsDecorator({
    title: '发送短信验证码失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用语法或参数是否正确',
      '  2 - 当前环境是否开通了短信验证码登录',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async sendPhoneCode(phoneNumber: string): Promise<boolean> {
    const { data } = await this._request.send('auth.sendPhoneCode', {
      phoneNumber: transformPhone(phoneNumber)
    });
    return data.SendStatus === 'Ok'
  }

  /**
   * 手机短信注册
   * @param email
   * @param password
   */
  public async signUpWithPhoneCode(phoneNumber: string, phoneCode: string, password: string) {
    return this.phoneAuthProvider().signUp(phoneNumber, phoneCode, password);
  }

  /**
   * 手机验证码 or 密码登录
   * @param email
   * @param password
   */
  public async signInWithPhoneCodeOrPassword(param: {
    phoneNumber: string
    phoneCode?: string
    password?: string
    signMethod?: string
  }) {
    return this.phoneAuthProvider().signIn(param);
  }

  public async forceResetPwdByPhoneCode(param: {
    phoneNumber: string
    phoneCode: string
    password: string
  }) {
    return this.phoneAuthProvider().signIn({
      ...param,
      signMethod: SIGN_METHOD.FORCERESETPWD
    });
  }

  private async _onLoginTypeChanged(ev) {
    const { loginType, persistence, env } = ev.data;
    if (env !== this._config.env) {
      return;
    }
    // 登录态转变后迁移cache，防止在匿名登录状态下cache混用
    await this._cache.updatePersistenceAsync(persistence);
    await this._cache.setStoreAsync(this._cache.keys.loginTypeKey, loginType);
  }
}

const EVENTS = {
  // 登录态改变后触发
  LOGIN_STATE_CHANGED: 'loginStateChanged',
  // 登录态过期后触发
  LOGIN_STATE_EXPIRED: 'loginStateExpire',
  // 登录类型改变后触发
  LOGIN_TYPE_CHANGED: 'loginTypeChanged',
  // 匿名账户被转正后触发
  ANONYMOUS_CONVERTED: 'anonymousConverted',
  // access token刷新后触发
  ACCESS_TOKEN_REFRESHD: 'refreshAccessToken'
};

const component: ICloudbaseComponent = {
  name: COMPONENT_NAME,
  namespace: 'auth',
  injectEvents: {
    bus: eventBus,
    events: [
      EVENTS.LOGIN_TYPE_CHANGED,
      EVENTS.LOGIN_STATE_EXPIRED,
      EVENTS.LOGIN_STATE_CHANGED,
      EVENTS.ACCESS_TOKEN_REFRESHD,
      EVENTS.ANONYMOUS_CONVERTED
    ]
  },
  entity: function (config: Pick<ICloudbaseAuthConfig, 'region' | 'persistence'> = { region: '', persistence: 'local' }) {
    if (this.authInstance) {
      printWarn(ERRORS.INVALID_OPERATION, 'every cloudbase instance should has only one auth object');
      return this.authInstance;
    }
    const { adapter, runtime } = this.platform;
    // 如不明确指定persistence则优先取各平台adapter首选，其次session
    const newPersistence = config.persistence || adapter.primaryStorage;
    if (newPersistence && (newPersistence !== this.config.persistence)) {
      this.updateConfig({ persistence: newPersistence })
    }

    const { env, persistence, debug } = this.config;
    this.authInstance = new Auth({
      env,
      region: config.region,
      persistence,
      debug,
      cache: this.cache,
      request: this.request,
      runtime: runtime
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
  AuthProvider,
  EVENTS,
  eventBus
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

type IProvider = new (...args: any[]) => any;
/**
 * 注册provider，如果
 * @param name
 * @param provider
 * @example
 * // 注册
 * registerProvider('emailAuthProvider',function(){
 *   // ...
 * });
 * // 使用新provider登录
 * cloudbase.auth().emailAuthProvider().signIn();
 */
export function registerProvider(name: string, provider: IProvider) {
  const proto = Auth.prototype;
  proto[name] = function (options: object) {
    const privateName = `_${name}`;
    if (!this[privateName]) {
      this[privateName] = new provider({
        ...options,
        ...this._config
      });
    }
    return this[privateName];
  };
}