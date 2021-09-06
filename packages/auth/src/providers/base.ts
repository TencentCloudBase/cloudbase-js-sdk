import { ICloudbaseConfig, ICloudbase } from '@cloudbase/types';
import { ICloudbaseCache } from '@cloudbase/types/cache';
import { ICloudbaseRequest } from '@cloudbase/types/request';
import { ICloudbaseAuthConfig } from '@cloudbase/types/auth';
import { LoginState } from '..';

export abstract class AuthProvider {
  protected readonly _config: ICloudbaseConfig;
  protected readonly _cache: ICloudbaseCache;
  protected readonly _request: ICloudbaseRequest;
  protected readonly _fromApp: ICloudbase;

  constructor(config: ICloudbaseAuthConfig & { cache: ICloudbaseCache, request: ICloudbaseRequest }) {
    this._config = config;
    this._cache = config.cache;
    this._request = config.request;
    this._fromApp = config._fromApp
  }
  /**
   * 判断本地是否已经有登录态，如果有且没过期，则返回true，否则清理本地登录态
   */
  protected async checkLocalLoginState() {
    const { accessTokenKey, accessTokenExpireKey } = this._cache.keys;
    const accessToken = await this._cache.getStoreAsync(accessTokenKey);
    const accessTokenExpire = await this._cache.getStoreAsync(accessTokenExpireKey);

    if (accessToken) {
      if (accessTokenExpire && accessTokenExpire > Date.now()) {
        // access存在且没有过期，那么直接返回
        const loginState = new LoginState({
          envId: this._config.env,
          cache: this._cache,
          request: this._request
        });
        await loginState.checkLocalStateAsync();

        return loginState;
      } else {
        // access token存在但是过期了，那么删除掉重新拉
        // await this._cache.removeStoreAsync(accessTokenKey);
        // await this._cache.removeStoreAsync(accessTokenExpireKey);
      }
    }
  }
  protected async setRefreshToken(refreshToken: string) {
    const { accessTokenKey, accessTokenExpireKey, refreshTokenKey } = this._cache.keys;
    // refresh token设置前，先清掉 access token
    await this._cache.removeStoreAsync(accessTokenKey);
    await this._cache.removeStoreAsync(accessTokenExpireKey);
    await this._cache.setStoreAsync(refreshTokenKey, refreshToken);
  }
  protected async setAccessToken(accessToken: string, accessTokenExpire: string) {
    const { accessTokenKey, accessTokenExpireKey } = this._cache.keys;
    await this._cache.setStoreAsync(accessTokenKey, accessToken);
    await this._cache.setStoreAsync(accessTokenExpireKey, accessTokenExpire);
  }
  protected async refreshUserInfo() {
    const action = 'auth.getUserInfo';
    const { data: userInfo } = await this._request.send(action, {});
    await this.setLocalUserInfo(userInfo);
    return userInfo;
  }
  protected async setLocalUserInfo(userInfo) {
    const { userInfoKey } = this._cache.keys;
    await this._cache.setStoreAsync(userInfoKey, userInfo);
  }

  // protected async stopAuthLoginWithOauth() {
  //   const { _fromApp } = this._config
  //   const checkRes = await checkFromAuthV1OrV2(_fromApp)
  //   const { authType } = checkRes
  //   console.log('authType', authType)
  //   if (authType === 'oauth') {
  //     throw Error('当前已使用 oauth 登录，请手动退出 oauth 登录后再进行 auth 登录')
  //   }
  // }
  abstract signIn(...args: any[]): Promise<any>;
}