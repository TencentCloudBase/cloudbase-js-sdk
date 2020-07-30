import { ICloudbase } from '@cloudbase/types';
import { events,adapters,utils,constants } from  '@cloudbase/utilities';
import { ICloudbaseCache } from '@cloudbase/types/cache';
import { ICloudbaseRequest } from '@cloudbase/types/request';
import { ICloudbaseAuthConfig, ICredential, IUser, IUserInfo, IAuthProvider, ILoginState } from '@cloudbase/types/auth';
import { ICloudbaseComponent } from '@cloudbase/types/component';
import { WeixinAuthProvider } from './providers/weixinAuthProvider';
import { AnonymousAuthProvider } from './providers/anonymousAuthProvider';
import { CustomAuthProvider } from './providers/customAuthProvider';
import { LOGINTYPE } from './constants';
import { AuthProvider } from './providers/base';
import { EmailAuthProvider } from './providers/emailAuthProvider';
import { UsernameAuthProvider } from './providers/usernameAuthProvider';

declare const cloudbase: ICloudbase;

const { CloudbaseEventEmitter } = events;
const { RUNTIME } = adapters;
const { printWarn, throwError } = utils;
const { ERRORS } = constants;

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

interface IUserOptions{
  cache: ICloudbaseCache;
  request: ICloudbaseRequest;
}

class User implements IUser{
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
  public location?: {
    country?: string;
    province?: string;
    city?: string;
  };

  private _cache: ICloudbaseCache;
  private _request: ICloudbaseRequest;

  constructor(options: IUserOptions) {
    const { cache, request} = options;
    this._cache = cache;
    this._request = request;

    this._setUserInfo();
  }
  /**
   * 获取本地用户信息-同步
   */
  public async checkLocalInfo(){
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
    this.location = {
      country: this._getLocalUserInfo('country'),
      province: this._getLocalUserInfo('province'),
      city: this._getLocalUserInfo('city')
    };
  }
  /**
   * 获取本地用户信息-异步
   */
  public async checkLocalInfoAsync(){
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
  public linkWithRedirect(provider:IAuthProvider): void {
    provider.signInWithRedirect();
  }
  /**
   * 获取当前账户的微信 UnionID 绑定的云开发账户列表。如果当前账户不存在 UnionID，会返回错误。
   */
  public async getLinkedUidList() {
    const { data } = await this._request.send('auth.getLinkedUidList', {});
    let hasPrimaryUid = false;
    const users = data.users as IUserInfo[];
    for(const user of users){
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
  public setPrimaryUid(uid:string) {
    return this._request.send('auth.setPrimaryUid', { uid });
  }
  /**
   * 解绑某个登录方式
   * @param loginType 
   */
  public unlink(loginType:'CUSTOM'|'WECHAT-OPEN'|'WECHAT-PUBLIC'|'WECHAT-UNION') {
    return this._request.send('auth.unlink', { platform: loginType });
  }
  /**
   * 更新用户信息
   * @param userInfo 
   */
  public async update(userInfo:IUserInfo):Promise<void> {
    const { nickName, gender, avatarUrl, province, country, city } = userInfo;
    const { data: newUserInfo } = await this._request.send('auth.updateUserInfo', { nickName, gender, avatarUrl, province, country, city });
    this._setLocalUserInfo(newUserInfo);
  }
  /**
   * 更新邮箱密码
   * @param newPassword 
   * @param oldPassword 
   */
  public updatePassword(newPassword:string, oldPassword:string) {
    return this._request.send('auth.updatePassword', {
      oldPassword,
      newPassword
    });
  }
  /**
   * 更新邮箱
   * @param newEmail 
   */
  public updateEmail(newEmail:string) {
    return this._request.send('auth.updateEmail', {
      newEmail
    });
  }
  /**
   * 更新用户名
   * @param username 
   */
  public updateUsername(username: string) {
    if (typeof username !== 'string') {
      throwError(ERRORS.INVALID_PARAMS,'username must be a string');
    }

    return this._request.send('auth.updateUsername', {
      username
    });
  }
  /**
   * 刷新本地用户信息。当用户在其他客户端更新用户信息之后，可以调用此接口同步更新之后的信息。
   */
  public async refresh():Promise<IUserInfo> {
    const action = 'auth.getUserInfo';
    const { data: userInfo } = await this._request.send(action, {});
    this._setLocalUserInfo(userInfo);
    return userInfo;
  }

  private _getLocalUserInfo(key:string):string {
    const { userInfoKey } = this._cache.keys;
    const userInfo = this._cache.getStore(userInfoKey);
    return userInfo[key];
  }

  private async _getLocalUserInfoAsync(key:string): Promise<string> {
    const { userInfoKey } = this._cache.keys;
    const userInfo = await this._cache.getStoreAsync(userInfoKey);
    return userInfo[key];
  }

  private _setUserInfo(){
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
    ].forEach(infoKey => {
      this[infoKey] = userInfo[infoKey];
    });

    this.location = {
      country: userInfo['country'],
      province: userInfo['province'],
      city: userInfo['city']
    };
  }

  private _setLocalUserInfo(userInfo:any) {
    const { userInfoKey } = this._cache.keys;
    this._cache.setStore(userInfoKey, userInfo);
    this._setUserInfo();
  }
}
interface ILoginStateOptions extends IUserOptions {
  envId: string;
}
export class LoginState implements ILoginState{
  public credential: ICredential;
  public user: IUser;

  private _cache: ICloudbaseCache;
  private _loginType: string;
  
  constructor(options:ILoginStateOptions) {
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

  public async checkLocalState(){
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
  public async checkLocalStateAsync(){
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

  get isUsernameAuth(){
    return this.loginType === LOGINTYPE.USERNAME;
  }

  get loginType() {
    return this._loginType
  }
}

class Auth{
  private readonly _config: ICloudbaseAuthConfig;
  private readonly _cache: ICloudbaseCache
  private readonly _request: ICloudbaseRequest;
  private readonly _runtime: string;
  private _anonymousAuthProvider: AnonymousAuthProvider;
  private _customAuthProvider: CustomAuthProvider;
  private _weixinAuthProvider: WeixinAuthProvider;
  private _emailAuthProvider: EmailAuthProvider;
  private _usernameAuthProvider: UsernameAuthProvider;

  constructor(config: ICloudbaseAuthConfig&{cache:ICloudbaseCache,request:ICloudbaseRequest,runtime?:string}) {
    this._config = config;
    this._cache = config.cache;
    this._request = config.request;
    this._runtime = config.runtime||RUNTIME.WEB

    eventBus.on(EVENTS.LOGIN_TYPE_CHANGED, this._onLoginTypeChanged.bind(this));
  }
  /**
   * 获取当前登录的用户信息-同步
   */
  get currentUser() {
    if(this._cache.mode==='async'){
      // async storage的平台调用此API提示
      printWarn(ERRORS.INVALID_OPERATION,'current platform\'s storage is asynchronous, please use getCurrenUser insteed');
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
  public async getCurrenUser(){
    const loginState = await this.getLoginState();
    if (loginState) {
      await loginState.user.checkLocalInfoAsync();
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
  public weixinAuthProvider({ appid, scope, state }):WeixinAuthProvider {
    if(!this._weixinAuthProvider){
      this._weixinAuthProvider = new WeixinAuthProvider({
        ...this._config,
        cache: this._cache,
        request: this._request,
        runtime: this._runtime
      }, appid, scope, state);
    }
    return this._weixinAuthProvider;
  }
  public anonymousAuthProvider():AnonymousAuthProvider {
    if (!this._anonymousAuthProvider) {
      this._anonymousAuthProvider = new AnonymousAuthProvider({
        ...this._config,
        cache: this._cache,
        request: this._request
      });
    }
    return this._anonymousAuthProvider;
  }
  public customAuthProvider():CustomAuthProvider {
    if(!this._customAuthProvider){
      this._customAuthProvider = new CustomAuthProvider({
        ...this._config,
        cache: this._cache,
        request: this._request
      });
    }
    return this._customAuthProvider;
  }
  public emailAuthProvider():EmailAuthProvider {
    if(!this._emailAuthProvider){
      this._emailAuthProvider = new EmailAuthProvider({
        ...this._config,
        cache: this._cache,
        request: this._request
      });
    }
    return this._emailAuthProvider;
  }
  public usernameAuthProvider():UsernameAuthProvider {
    if(!this._usernameAuthProvider){
      this._usernameAuthProvider = new UsernameAuthProvider({
        ...this._config,
        cache: this._cache,
        request: this._request
      });
    }
    return this._usernameAuthProvider;
  }
  /**
   * 用户名密码登录
   * @param username 
   * @param password 
   */
  public async signInWithUsernameAndPassword(username: string, password: string) {
    return this._usernameAuthProvider.signIn(username, password);
  }
  /**
   * 检测用户名是否已经占用
   * @param username 
   */
  public async isUsernameRegistered(username: string): Promise<boolean> {
    if (typeof username !== 'string') {
      throwError(ERRORS.INVALID_PARAMS,'username must be a string');
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
  public async signUpWithEmailAndPassword(email:string, password:string) {
    return this.emailAuthProvider().signUp(email,password);
  }
  /**
   * 重置邮箱密码
   * @param email 
   */
  public async sendPasswordResetEmail(email:string) {
    return this.emailAuthProvider().resetPassword(email);
  }
  /**
   * 登出
   */
  public async signOut() {
    const loginType = await this.getLoginType();
    if (loginType === LOGINTYPE.ANONYMOUS) {
      throwError(ERRORS.INVALID_OPERATION,'anonymous user doesn\'t support signOut action');
    }
    const { refreshTokenKey, accessTokenKey, accessTokenExpireKey } = this._cache.keys;
    const action = 'auth.logout';

    const refresh_token = await this._cache.getStoreAsync(refreshTokenKey);
    if (!refresh_token) {
      return;
    }
    const res = await this._request.send(action, { refresh_token });

    this._cache.removeStoreAsync(refreshTokenKey);
    this._cache.removeStoreAsync(accessTokenKey);
    this._cache.removeStoreAsync(accessTokenExpireKey);

    eventBus.fire(EVENTS.LOGIN_STATE_CHANGED);
    eventBus.fire(EVENTS.LOGIN_TYPE_CHANGED, {
      env: this._config.env,
      loginType: LOGINTYPE.NULL,
      persistence: this._config.persistence
    });

    return res;
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
  public hasLoginState(): ILoginState|null {
    if(this._cache.mode==='async'){
      // async storage的平台调用此API提示
      printWarn(ERRORS.INVALID_OPERATION,'current platform\'s storage is asynchronous, please use getLoginState insteed');
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
    if(this._cache.mode==='async'){
      // async storage的平台调用此API提示
      printWarn(ERRORS.INVALID_OPERATION,'current platform\'s storage is asynchronous, please use getAuthHeaderAsync insteed');
      return;
    }
    const { refreshTokenKey, accessTokenKey } = this._cache.keys;
    const refreshToken = this._cache.getStore(refreshTokenKey);
    const accessToken = this._cache.getStore(accessTokenKey);
    return {
      'x-cloudbase-credentials': accessToken + '/@@/' + refreshToken
    };
  }
  /**
   * 异步获取Http鉴权header，用于云接入 HTTP 访问云函数时的鉴权
   * 此API为兼容异步storage的平台
   */
  public async getAuthHeaderAsync() {
    const { refreshTokenKey, accessTokenKey } = this._cache.keys;
    const refreshToken = await this._cache.getStoreAsync(refreshTokenKey);
    const accessToken = await this._cache.getStoreAsync(accessTokenKey);
    return {
      'x-cloudbase-credentials': accessToken + '/@@/' + refreshToken
    };
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
  LOGIN_STATE_CHANGED  : 'loginStateChanged',
  // 登录态过期后触发
  LOGIN_STATE_EXPIRED  : 'loginStateExpire',
  // 登录类型改变后触发
  LOGIN_TYPE_CHANGED   : 'loginTypeChanged',
  // 匿名账户被转正后触发
  ANONYMOUS_CONVERTED  : 'anonymousConverted', 
  // access token刷新后触发
  ACCESS_TOKEN_REFRESHD: 'refreshAccessToken'
};

const component:ICloudbaseComponent = {
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
  entity: function(config:Pick<ICloudbaseAuthConfig,'persistence'>={persistence:'session'}){
    if (this.authInstance) {
      printWarn(ERRORS.INVALID_OPERATION,'every cloudbase instance should has only one auth object');
      return this.authInstance;
    }
    const { adapter,runtime } = this.platform;
    // 如不明确指定persistence则优先取各平台adapter首选，其次session
    const newPersistence = config.persistence || adapter.primaryStorage;
    if (newPersistence&&(newPersistence !== this.config.persistence)) {
      this.updateConfig({persistence: newPersistence})
    }

    const { env, persistence, debug } = this.config;
    this.authInstance = new Auth({
      env, 
      persistence, 
      debug,
      cache: this.cache,
      request: this.request,
      runtime: runtime
    });
    return this.authInstance;
  }
}

try{
  // 尝试自动注册至全局变量cloudbase
  // 此行为只在浏览器环境下有效
  cloudbase.registerComponent(component);
}catch(e){}

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
export function registerAuth(app:ICloudbase){
  app.registerComponent(component);
}

type IProvider = new(...args:any[]) => any;
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
export function registerProvider(name:string,provider:IProvider){
  const proto = Auth.prototype;
  proto[name] = function(...args:any[]){
    const privateName = `_${name}`;
    if(!this[privateName]){
      this[privateName] = new provider({
        ...args,
        cache: this._cache,
        request: this._request,
        runtime: this._runtime
      });
    }
    return this[privateName];
  };
}