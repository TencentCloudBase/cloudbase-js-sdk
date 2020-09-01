
import { utils, constants, helpers } from '@cloudbase/utilities';
import { ILoginState } from '@cloudbase/types/auth';
import { AuthProvider } from './base';
import { LOGINTYPE } from '../constants';
import { eventBus, EVENTS, LoginState } from '..';

const { ERRORS, COMMUNITY_SITE_URL } = constants;
const { isString } = utils;
const { catchErrorsDecorator } = helpers;

export class CustomAuthProvider extends AuthProvider {

  @catchErrorsDecorator({
    title: '自定义登录失败',
    messages: [
      '请确认以下各项：',
      '  1 - 当前环境是否开启了自定义登录',
      '  2 - 调用 auth().customAuthProvider().signIn() 的语法或参数是否正确',
      '  3 - ticket 是否归属于当前环境',
      '  4 - 创建 ticket 的自定义登录私钥是否过期',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async signIn(ticket: string): Promise<ILoginState> {
    if (!isString(ticket)) {
      throw new Error(JSON.stringify({
        code: ERRORS.INVALID_PARAMS,
        msg: 'ticket must be a string'
      }));
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
      throw new Error(JSON.stringify({
        code: ERRORS.OPERATION_FAIL,
        msg: 'custom signIn failed'
      }));
    }
  }
}