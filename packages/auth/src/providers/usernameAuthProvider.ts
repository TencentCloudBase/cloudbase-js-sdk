import { AuthProvider } from './base';
import { ILoginState } from '@cloudbase/types/auth';
import { eventBus, EVENTS, LoginState } from '..';
import { LOGINTYPE } from '../constants';
import { utils, constants, helpers } from '@cloudbase/utilities';

const { printWarn } = utils;
const { ERRORS, COMMUNITY_SITE_URL } = constants;
const { catchErrorsDecorator } = helpers;

export class UsernameAuthProvider extends AuthProvider {
  @catchErrorsDecorator({
    title: '用户名密码登录失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().signInWithUsernameAndPassword() 的语法或参数是否正确',
      '  2 - 当前环境是否开通了用户名密码登录',
      '  3 - 用户名密码是否匹配',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async signIn(username: string, password: string): Promise<ILoginState> {
    if (typeof username !== 'string') {
      throw new Error(JSON.stringify({
        code: ERRORS.INVALID_PARAMS,
        msg: 'username must be a string'
      }));
    }
    // 用户不设置密码
    if (typeof password !== 'string') {
      password = '';
      printWarn(ERRORS.INVALID_PARAMS,'password is empty');
    }

    const { refreshTokenKey } = this._cache.keys;
    const res = await this._request.send('auth.signIn',{
      loginType: LOGINTYPE.USERNAME,
      username,
      password,
      refresh_token: await this._cache.getStoreAsync(refreshTokenKey) || ''
    });

    const { refresh_token, access_token_expire, access_token } = res;
    if (refresh_token) {
      await this.setRefreshToken(refresh_token);
      if (access_token && access_token_expire) {
        await this.setAccessToken(access_token, access_token_expire);
      } else {
        await this._request.refreshAccessToken();
      }
      // set user info
      await this.refreshUserInfo();
      eventBus.fire(EVENTS.LOGIN_STATE_CHANGED);
      eventBus.fire(EVENTS.LOGIN_TYPE_CHANGED, {
        env: this._config.env,
        loginType: LOGINTYPE.USERNAME,
        persistence: this._config.persistence
      });
      return new LoginState({
        envId: this._config.env,
        cache: this._cache,
        request: this._request
      });
    } else if (res.code) {
      throw new Error(JSON.stringify({
        code: ERRORS.OPERATION_FAIL,
        msg: `login by username failed:[${res.code}] ${res.message}`
      }));
    } else {
      throw new Error(JSON.stringify({
        code: ERRORS.OPERATION_FAIL,
        msg: 'login by username failed'
      }));
    }
  }
}
