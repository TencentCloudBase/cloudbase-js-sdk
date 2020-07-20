import { AuthProvider } from './base';
import { ILoginState } from '@cloudbase/types/auth';
import { eventBus, EVENTS, LoginState } from '..';
import { LOGINTYPE } from '../constants';
import { utils, constants } from '@cloudbase/utilities';

const { throwError,printWarn } = utils;
const { ERRORS } = constants;

export class UsernameAuthProvider extends AuthProvider {
  public async signIn(username: string, password: string): Promise<ILoginState> {
    if (typeof username !== 'string') {
      throwError(ERRORS.INVALID_PARAMS,'username must be a string');
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
      throwError(ERRORS.OPERATION_FAIL,`login failed:[${res.code}] ${res.message}`);
    } else {
      throwError(ERRORS.OPERATION_FAIL,'login failed');
    }
  }
}
