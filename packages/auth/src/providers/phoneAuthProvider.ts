import { constants,utils,helpers } from '@cloudbase/utilities';
import { ILoginState } from '@cloudbase/types/auth';
import { AuthProvider } from './base';
import { LOGINTYPE } from '../constants';
import { eventBus,EVENTS,LoginState } from '..';

const { throwError,isString,transformPhone } = utils;
const { ERRORS,COMMUNITY_SITE_URL } = constants;
const { catchErrorsDecorator } = helpers;

const SIGN_METHOD = {
  SIGNIN: 'SIGNIN',
  SIGNUP: 'SIGNUP'
}

export class PhoneAuthProvider extends AuthProvider {
  @catchErrorsDecorator({
    title: '手机号登录失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().SmsAuthProvider() 的语法或参数是否正确',
      '  2 - 当前环境是否开通了短信验证码登录',
      '  3 - 短信验证码/密码是否正确',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async signIn(param: {
    phoneNumber: string
    phoneCode?: string
    password?: string
    signMethod?: string
  }): Promise<ILoginState> {
    let { phoneNumber,phoneCode,password,signMethod } = param
    if(!isString(phoneNumber)) {
      throwError(ERRORS.INVALID_PARAMS,'phoneNumber must be a string');
    }

    if(!isString(phoneCode) && !isString(password)) {
      throwError(ERRORS.INVALID_PARAMS,'phoneCode or password must be a string');
    }

    if(!signMethod) {
      signMethod = SIGN_METHOD.SIGNIN
    }

    const { refreshTokenKey } = this._cache.keys;
    const res = await this._request.send('auth.signIn',{
      loginType: LOGINTYPE.PHONE,
      phoneNumber: transformPhone(phoneNumber),
      phoneCode,
      password,
      refresh_token: this._cache.getStore(refreshTokenKey) || '',
      signMethod
    });
    const { refresh_token,access_token,access_token_expire } = res;
    if(refresh_token) {
      await this.setRefreshToken(refresh_token);
      if(access_token && access_token_expire) {
        await this.setAccessToken(access_token,access_token_expire);
      } else {
        await this._request.refreshAccessToken();
      }
      // set user info
      await this.refreshUserInfo();
      eventBus.fire(EVENTS.LOGIN_STATE_CHANGED);
      eventBus.fire(EVENTS.LOGIN_TYPE_CHANGED,{
        env: this._config.env,
        loginType: LOGINTYPE.PHONE,
        persistence: this._config.persistence
      });
      return new LoginState({
        envId: this._config.env,
        cache: this._cache,
        request: this._request
      });
    } else if(res.code) {
      throwError(ERRORS.OPERATION_FAIL,`Phone login fail[${res.code}] ${res.message}`);
    } else {
      throwError(ERRORS.OPERATION_FAIL,`Phone login fail`);
    }
  }
  /**
   * 手机号注册
   * @param phoneNumber
   * @param phoneCode
   * @param password
   */
  @catchErrorsDecorator({
    title: '手机短信注册失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().signUpWithPhoneCode() 的语法或参数是否正确',
      '  2 - 当前环境是否开通了短信验证码登录',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async signUp(phoneNumber: string,phoneCode: string,password?: string): Promise<ILoginState> {
    return this.signIn({
      phoneNumber,
      phoneCode,
      password,
      signMethod: SIGN_METHOD.SIGNUP
    })
  }
}