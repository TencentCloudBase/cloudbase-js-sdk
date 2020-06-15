
import { utils, constants } from '@cloudbase/utilities';
import { ILoginState } from '@cloudbase/types/auth';
import { AuthProvider } from './base';
import { LOGINTYPE } from '../constants';
import { eventBus, EVENTS, LoginState } from '..';

const { ERRORS } = constants;
const { throwError,isString } = utils;

export class CustomAuthProvider extends AuthProvider {
  async signIn(ticket: string): Promise<ILoginState> {
    if (!isString(ticket)) {
      throwError(ERRORS.INVALID_PARAMS,'ticket must be a string');
    }
    const { refreshTokenKey } = this._cache.keys;
    const res = await this._request.send('auth.signInWithTicket', {
      ticket,
      refresh_token: await this._cache.getStoreAsync(refreshTokenKey) || ''
    });
    if (res.refresh_token) {
      // 保存新refresh token并且刷新access token
      await this.setRefreshToken(res.refresh_token);
      await this._request.refreshAccessToken();

      eventBus.fire(EVENTS.LOGIN_TYPE_CHANGED, {
        env: this._config.env,
        loginType: LOGINTYPE.CUSTOM,
        persistence: this._config.persistence
      });

      eventBus.fire(EVENTS.LOGIN_STATE_CHANGED);
      
      // set user info
      await this.refreshUserInfo();
      
      const loginState = new LoginState({
        envId: this._config.env,
        cache: this._cache,
        request: this._request
      });
      await loginState.checkLocalStateAsync();
      
      return loginState;
    } else {
      throwError(ERRORS.OPERATION_FAIL,'custom signIn failed');
    }
  }
}