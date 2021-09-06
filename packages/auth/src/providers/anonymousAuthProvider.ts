import { AuthProvider } from './base';
import { ICloudbaseAuthConfig, ILoginState } from '@cloudbase/types/auth';
import { constants, utils, helpers, events } from '@cloudbase/utilities';
import { ICloudbaseCache } from '@cloudbase/types/cache';
import { ICloudbaseRequest } from '@cloudbase/types/request';
import { LOGINTYPE } from '../constants';
import { EVENTS, eventBus, LoginState } from '..';

const { ERRORS, COMMUNITY_SITE_URL } = constants;
const { throwError, isString } = utils;
const { addEventListener } = events;
const { catchErrorsDecorator, stopAuthLoginWithOAuth } = helpers;

export class AnonymousAuthProvider extends AuthProvider {
  constructor(config: ICloudbaseAuthConfig & { cache: ICloudbaseCache, request: ICloudbaseRequest }) {
    super(config);

    this._onConverted = this._onConverted.bind(this);
    // 监听转正事件
    addEventListener(EVENTS.ANONYMOUS_CONVERTED, this._onConverted);
  }

  @stopAuthLoginWithOAuth()
  @catchErrorsDecorator({
    title: '匿名登录失败',
    messages: [
      '请确认以下各项：',
      '  1 - 当前环境是否开启了匿名登录',
      '  2 - 调用 auth().anonymouseProvider().signIn() 的语法或参数是否正确',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async signIn(): Promise<ILoginState> {
    // 匿名登录前迁移cache到localstorage
    await this._cache.updatePersistenceAsync('local');
    const { anonymousUuidKey, refreshTokenKey } = this._cache.keys;
    // 如果本地存有uid则匿名登录时传给server
    const anonymous_uuid = await this._cache.getStoreAsync(anonymousUuidKey);
    // 此处cache为基类property
    const refresh_token = await this._cache.getStoreAsync(refreshTokenKey);

    const res = await this._request.send('auth.signInAnonymously', {
      anonymous_uuid,
      refresh_token
    });
    if (res.uuid && res.refresh_token) {
      await this._setAnonymousUUID(res.uuid);
      await this.setRefreshToken(res.refresh_token);
      await this._request.refreshAccessToken();

      eventBus.fire(EVENTS.LOGIN_TYPE_CHANGED, {
        env: this._config.env,
        loginType: LOGINTYPE.ANONYMOUS,
        persistence: 'local'
      });

      eventBus.fire(EVENTS.LOGIN_STATE_CHANGED);

      const loginState = new LoginState({
        envId: this._config.env,
        cache: this._cache,
        request: this._request
      });
      await loginState.checkLocalStateAsync();
      await loginState.user.refresh();
      return loginState;
    } else {
      throw new Error(JSON.stringify({
        code: ERRORS.OPERATION_FAIL,
        msg: JSON.stringify(res) || 'anonymous signIn failed'
      }));
    }
  }
  /**
   * 匿名转正
   * @param ticket
   */
  public async linkAndRetrieveDataWithTicket(ticket: string): Promise<ILoginState> {
    if (!isString(ticket)) {
      throwError(ERRORS.INVALID_PARAMS, 'ticket must be a string');
    }
    const { anonymousUuidKey, refreshTokenKey } = this._cache.keys;
    const anonymous_uuid = await this._cache.getStoreAsync(anonymousUuidKey);
    const refresh_token = await this._cache.getStoreAsync(refreshTokenKey);
    const res = await this._request.send('auth.linkAndRetrieveDataWithTicket', {
      anonymous_uuid,
      refresh_token,
      ticket
    });
    if (res.refresh_token) {
      // 转正后清除本地保存的匿名uuid
      await this._clearAnonymousUUID();
      await this.setRefreshToken(res.refresh_token);
      await this._request.refreshAccessToken();
      eventBus.fire(EVENTS.ANONYMOUS_CONVERTED, { env: this._config.env });
      eventBus.fire(EVENTS.LOGIN_TYPE_CHANGED, { loginType: LOGINTYPE.CUSTOM, persistence: 'local' });
      const loginState = new LoginState({
        envId: this._config.env,
        cache: this._cache,
        request: this._request
      });
      await loginState.checkLocalStateAsync();

      return loginState;
    } else {
      throwError(ERRORS.OPERATION_FAIL, JSON.stringify(res) || 'linkAndRetrieveDataWithTicket failed');
    }
  }
  private async _setAnonymousUUID(id: string) {
    const { anonymousUuidKey, loginTypeKey } = this._cache.keys;
    await this._cache.removeStoreAsync(anonymousUuidKey);
    await this._cache.setStoreAsync(anonymousUuidKey, id);
    await this._cache.setStoreAsync(loginTypeKey, LOGINTYPE.ANONYMOUS);
  }
  private async _clearAnonymousUUID() {
    await this._cache.removeStoreAsync(this._cache.keys.anonymousUuidKey);
  }
  private async _onConverted(ev) {
    const { env } = ev.data;
    if (env !== this._config.env) {
      return;
    }
    // 匿名转正后迁移cache
    await this._cache.updatePersistenceAsync(this._config.persistence);
  }
}