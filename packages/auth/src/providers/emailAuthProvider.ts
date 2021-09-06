import { constants, utils, helpers } from '@cloudbase/utilities';
import { ILoginState } from '@cloudbase/types/auth';
import { AuthProvider } from './base';
import { LOGINTYPE } from '../constants';
import { eventBus, EVENTS, LoginState } from '..';

const { throwError, isString } = utils;
const { ERRORS, COMMUNITY_SITE_URL } = constants;
const { catchErrorsDecorator, stopAuthLoginWithOAuth } = helpers;

export class EmailAuthProvider extends AuthProvider {

  @stopAuthLoginWithOAuth()
  @catchErrorsDecorator({
    title: '邮箱密码登录失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().emailAuthProvider() 的语法或参数是否正确',
      '  2 - 当前环境是否开通了邮箱登录',
      '  3 - 邮箱地址与密码是否匹配',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async signIn(email: string, password: string): Promise<ILoginState> {
    if (!isString(email)) {
      throwError(ERRORS.INVALID_PARAMS, 'email must be a string');
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
      throwError(ERRORS.OPERATION_FAIL, `Email login fail[${res.code}] ${res.message}`);
    } else {
      throwError(ERRORS.OPERATION_FAIL, `Email login fail`);
    }
  }
  /**
   * 注册
   * @param email
   * @param password
   */
  @stopAuthLoginWithOAuth()
  @catchErrorsDecorator({
    title: '邮箱注册失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().signUpWithEmailAndPassword() 的语法或参数是否正确',
      '  2 - 当前环境是否开通了邮箱登录',
      '  3 - 此邮箱地址是否已经被其他用户占用',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async signUp(email: string, password: string) {
    return this._request.send('auth.signUpWithEmailAndPassword', {
      email,
      password
    });
  }
  /**
   * 发起重置密码请求，发起后推送邮件到指定邮箱
   * @param email
   */
  @catchErrorsDecorator({
    title: '重置密码失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().sendPasswordResetEmail() 的语法或参数是否正确',
      '  2 - 当前环境是否开通了邮箱登录',
      '  3 - 此邮箱地址是否已经与当前用户绑定',
      '  4 - 此邮箱地址是否已经被其他用户占用',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async resetPassword(email: string) {
    return this._request.send('auth.sendPasswordResetEmail', {
      email
    });
  }
  /**
   * 重置密码
   * @param token
   * @param newPassword
   */
  @catchErrorsDecorator({
    title: '重置密码失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用语法或参数是否正确',
      '  2 - 当前环境是否开通了邮箱登录',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async resetPasswordWithToken(token: string, newPassword: string) {
    return this._request.send('auth.resetPasswordWithToken', {
      token,
      newPassword
    });
  }
  /**
   * 激活邮箱
   * @param token
   */
  @catchErrorsDecorator({
    title: '邮箱激活失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用语法或参数是否正确',
      '  2 - 当前环境是否开通了邮箱登录',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async activate(token: string) {
    return this._request.send('auth.activateEndUserMail', {
      token
    });
  }
}