import { constants,utils } from '@cloudbase/utilities';
import { ILoginState } from '@cloudbase/types/auth';
import { AuthProvider } from './base';
import { LOGINTYPE } from '../constants';
import { eventBus, EVENTS, LoginState } from '..';

const { throwError, isString } = utils;
const { ERRORS } = constants;

export class EmailAuthProvider extends AuthProvider {
  public async signIn(email: string, password: string): Promise<ILoginState> {
    if (!isString(email)) {
      throwError(ERRORS.INVALID_PARAMS,'email must be a string');
    }
    const { refreshTokenKey } = this._cache.keys;
    const res = await this._request.send('auth.signIn', {
      loginType: 'EMAIL',
      email,
      password,
      refresh_token: this._cache.getStore(refreshTokenKey) || ''
    });
    const { refresh_token, access_token, access_token_expire } = res;
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
        loginType: LOGINTYPE.EMAIL,
        persistence: this._config.persistence
      });
      return new LoginState({
        envId: this._config.env,
        cache: this._cache,
        request: this._request
      });
    } else if (res.code) {
      throwError(ERRORS.OPERATION_FAIL,`Email login fail[${res.code}] ${res.message}`);
    } else {
      throwError(ERRORS.OPERATION_FAIL,`Email login fail`);
    }
  }
  /**
   * 注册
   * @param email 
   * @param password 
   */
  public async signUp(email:string, password:string) {
    return this._request.send('auth.signUpWithEmailAndPassword', {
      email,
      password
    });
  }
  /**
   * 发起重置密码请求，发起后推送邮件到指定邮箱
   * @param email 
   */
  public async resetPassword(email:string) {
    return this._request.send('auth.sendPasswordResetEmail', {
      email
    });
  }
  /**
   * 重置密码
   * @param token 
   * @param newPassword 
   */
  public async resetPasswordWithToken(token:string, newPassword:string) {
    return this._request.send('auth.resetPasswordWithToken', {
      token,
      newPassword
    });
  }
  /**
   * 激活邮箱
   * @param token 
   */
  public async activate(token: string) {
    return this._request.send('auth.activateEndUserMail', {
      token
    });
  }
}