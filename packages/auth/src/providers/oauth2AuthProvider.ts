import { AuthProvider } from './base'
import { ICloudbaseAuthConfig } from '@cloudbase/types/auth'
import { ICloudbaseCache } from '@cloudbase/types/cache'
import { ICloudbaseRequest } from '@cloudbase/types/request'
import { constants, utils, helpers } from '@cloudbase/utilities/'
import { eventBus, EVENTS, LoginState } from '..'
import { OAUTH2_LOGINTYPE_PREFIX } from '../constants';

const { getSdkName, ERRORS, COMMUNITY_SITE_URL } = constants
const { catchErrorsDecorator } = helpers

function qsParse(qs: string): object {
  return qs.split('&').reduce((a, c) => {
    const [key, value] = c.split('=')
    a[key] = value
    return a
  }, {})
}

const kPaths = {
  prividerUri: '/auth/v1/provider/uri',
  prividerToken: '/auth/v1/provider/token',
  signinWithProvider: '/auth/v1/signin/with/provider',
  me: '/auth/v1/user/me',
  token: '/auth/v1/token',
}

interface IGenProviderRedirectURIRequest {
  response_type: string // token | code
  provider_id: string // google github ...
  client_id: string // 
  scope: string //
  redirect_uri: string
  state?: string
  // other_params?: string
}

interface IGenProviderRedirectURIResponse {
  uri: string
  signout_uri: string
}

interface IGrantProviderTokenRequest {
  provider_id: string
  client_id: string

  // 以下参数任选其一即可
  provider_code?: string // 'provider_code'
  provider_access_token?: string // 'provider_access_token'
  provider_id_token?: string // 'provider_id_token'

  provider_redirect_uri?: string
  provider_params?: string // 'provider_params'
}

interface IProviderProfile {
  provider_id: string
  // 主ID
  sub?: string
  name?: string
  picture?: string
  email?: string
  phone_number?: string
  gender?: string
  locale?: string
  // 三方信息原文
  raw?: string
  // 其他关联的ID
  associated_ids?: string
  meta?:  {
    [key: string]: string
  }
}

interface IGrantProviderTokenResponse {
  // 如果不启用自动注册， 则返回 provider_token， 用于进一步处理，例如：通过手机号等。
  provider_token: string
  // 过期时间
  expires_in: number
  // 如果不启用自动注册，则会返回provider userinfo end_point 的返回详情，用于前端展示
  provider_profile: IProviderProfile
}

interface ISignInWithProviderRequest {
  client_id: string
  provider_token: string
  // 强制关闭自动注册。
  // 默认情况下，这里以服务器配置为准，如果客户端为了平滑升级可以配置为true。
  force_disable_sign_up: boolean
  // 是否强制从第三方同步昵称等信息
  sync_profile: boolean
}

interface IToken {
  token_type: string
  access_token: string
  refresh_token: string
  id_token: string
  expires_in: number
  scope?: string
  sub?: string
  user_group?: string
}

interface IPrividerCallbackInfo {
  href: string,

  state: string,

  token_type: string,
  code?: string,
  access_token?: string,
  id_token?: string,

  expires_in: number,
  scope: string,
  authuser: string,
  prompt: string
}

interface IPopupWindowAuthRedirectMessage {
  source: string,
  callbackInfo: IPrividerCallbackInfo
}

export interface IOAuth2AuthProviderOptions {
  providerId?: string
  clientId?: string
  responseType?: string
  scope?: string
  redirectUri?: string

  syncProfile?: boolean
  forceDisableSignUp?: boolean
}

export interface ISignInWithPopupOptions {
  popup?: {
    target?: string,
    features?: string
  }
}

interface IAuthServerRespError {
  error: string,
  error_code: number,
  error_description: string
  request_id: string
}

export class OAuth2AuthProvider extends AuthProvider {
  // private readonly _scope: string
  // private readonly _state: string
  // private readonly _appid: string
  // private readonly _runtime: string

  private providerId: string
  private clientId: string
  private responseType: string
  private scope: string
  private redirectUri: string
  private syncProfile: boolean
  private forceDisableSignUp: boolean

  private popupWindowUrl: string
  private popupWindowRef: Window = null

  constructor(config: ICloudbaseAuthConfig&{cache:ICloudbaseCache,request:ICloudbaseRequest,runtime:string}, options: IOAuth2AuthProviderOptions = {}) {
    super(config)

    this.providerId = options.providerId
    this.clientId = options.clientId || config.env
    this.responseType = options.responseType || 'token'
    this.scope = options.scope || ''
    this.redirectUri = options.redirectUri || ''
    this.syncProfile = options.syncProfile || false
    this.forceDisableSignUp = options.forceDisableSignUp || false

    const recvMessageFromPopup = this.recvMessageFromPopup.bind(this)
    window.removeEventListener('message', recvMessageFromPopup)
    window.addEventListener('message', recvMessageFromPopup, false)
  }

  public async signIn(){
    return utils.printWarn(ERRORS.OPERATION_FAIL, 'API signIn has been deprecated, please use signInWithRedirect insteed')
  }

  @catchErrorsDecorator({
    title: '跳转第三方登录平台失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 auth().oAuth2AuthProvider() 的参数是否正确',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async signInWithPopup(options: ISignInWithPopupOptions = {}) {
    // if (this.checkLocalLoginState()) {
    //   throw new Error(`[${getSdkName()}][${ERRORS.UNKOWN_ERROR}]已登录，请先退出`)
    // }
    return this.jumpToProviderPage(options)
  }

  public async signInWithModal(elemId: string) {

    const { uri: authorize_uri } = await this.fetchProviderRedirectURI()
    const modal = document.getElementById(elemId)
    modal.style.display = 'block'
    const style = `
    <style>
      /* The Modal (background) */
      .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
      }
  
      /* Modal Content */
      .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        /* width: 80%; */
      }
  
      /* The Close Button */
      .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }
      .close:hover,
      .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
      }
      </style>
    `
    const html = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <iframe id="loginIframe" src="${authorize_uri}" title="iframe Example 1" width="400" height="300"></iframe>
      </div>
    `
    const script = `
      <script>
      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];
      
      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      }
  
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

      const loginIframe = document.getElementById("loginIframe")
      </script>
    `
    modal.innerHTML = `
      ${html}
      ${style}
      ${script}
    `
  }

  private async jumpToProviderPage(options: ISignInWithPopupOptions = {}): Promise<void> {
    try {
      const { uri: authorize_uri } = await this.fetchProviderRedirectURI()
      const popup = options.popup || {}
      const popupWindowTarget = popup.target || '_blank'
      const popupWindowFeatures = popup.features || 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100'
      // console.log('jumpToProviderPage: ', authorize_uri, this.popupWindowRef)
      let popupWindowRef = this.popupWindowRef
      if (popupWindowRef === null || popupWindowRef.closed) {
        popupWindowRef = window.open(authorize_uri, popupWindowTarget, popupWindowFeatures)
      } else if (this.popupWindowUrl !== authorize_uri) {
        if (popupWindowRef && !popupWindowRef.closed) {
          popupWindowRef.close()
        }
        popupWindowRef = window.open(authorize_uri, popupWindowTarget, popupWindowFeatures)
      } else {
        // popupWindowRef.focus()
      }

      if (!popupWindowRef) {
        return utils.printWarn(ERRORS.OPERATION_FAIL, `打开第三方登录授权失败，可能是禁用了浏览器弹窗，uri: ${authorize_uri}`)
      }
      this.popupWindowUrl = authorize_uri
      this.popupWindowRef = popupWindowRef
      this.popupWindowRef.focus()
    } catch(e) {
      // DOMException: Blocked a frame with origin "" from accessing a cross-origin frame.
      if (this.popupWindowRef && !this.popupWindowRef.closed) {
        this.popupWindowRef.close()
      }
      throw new Error(`[${getSdkName()}][${ERRORS.UNKOWN_ERROR}]${e}`)
    }

    // 在新标签页 post message 进行测试，或取消注释进行测试
    // window.opener.postMessage
    // this.popupWindowRef.postMessage({
    //   source: 'cloudbase-login-redirect',
    //   callbackInfo: {
    //     state: 'eyJ0IjoxNjI3ODI4MzA2MjQzLCJwcm92aWRlcl9pZCI6Imdvb2dsZSIsImNsaWVudF9pZCI6InByb2R1Y3Rpb24tZnY5NzkiLCJyb3V0ZUtleSI6IiJ9',
    //     access_token: 'ya29.a0ARrdaM_JF-7l1aNkssC-jRYIDEoEyU2Rngkjoy0s9lHAAJp56yuxEyoUa8saDhR1S-04xtraEmDc0QSokyBOSVpKIE5zP0skeMWZuZinwmKhbsQTZfrCGJJGQM8n72HEhaxqK17k-gBd2MN0bWf9i-dlHnJECQ',
    //     token_type: 'Bearer',
    //     expires_in: '3598',
    //     scope: 'email%20profile%20openid%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email',
    //     authuser: '0',
    //     prompt: 'none'
    //   }
    // }, 'http:///')

    // function postMessageToOpener() {
    //   // 需要支持不同的参数形式
    //   if (window.opener) {
    //     // window.opener.postMessage({
    //     //   source: 'cloudbase-login-redirect',
    //     //   redirectUri: '',
    //     //   callbackInfo: {
    //     //     state: 'eyJ0IjoxNjI3NjMwNTY4NjkzLCJwcm92aWRlcl9pZCI6Imdvb2dsZSIsImNsaWVudF9pZCI6InByb2R1Y3Rpb24tZnY5NzkifQ==',
    //     //     access_token: 'ya29.a0ARrdaM-hLc_CAGF26xMjTzdlAloRs8WihWFVy6GRDGv1DMYZbG0k1xI3dKgu3E42Gi6P1D1V6dtz-XBShjDou2MRWNaPNZ_SNC_idRTIqTCxU1f7xU-FKfmS8A0AZZDk8-h7a3VYsh12Eei1j2UNwuDGKUuOPw',
    //     //     token_type: 'Bearer',
    //     //     expires_in: '3599',
    //     //     scope: 'email%20profile%20openid%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile',
    //     //     authuser: '0',
    //     //     prompt: 'none'
    //     //   }
    //     // }, 'http:///')
    //     const params = window.location.search
    //     window.opener.postMessage(params, '')
    //     window.close()
    //   }
    // }
  }

  /**
   * recvMessageFromPopup 接收回调页面登录消息
   * @param event
   * @returns 
   */
  private recvMessageFromPopup(event: MessageEvent) {
    // console.log('recv event:', event)
    // origin: "http:///"
    if (!event.isTrusted) {
      // console.log('!event.isTrusted')
      return
    }
    // console.log('this.popupWindowRef === event.source', this.popupWindowRef === event.source)
    if (this.popupWindowRef === event.source && event.data.source === 'cloudbase-login-redirect') {
      // console.log('recv cloudbase-login-redirect event', event.data)
      const data: IPopupWindowAuthRedirectMessage = event.data
      this.continueSignIn(data.callbackInfo)
      if (!this.popupWindowRef.closed) {
        this.popupWindowRef.close()
      }
    }
  }

  /**
   * continueSignIn 继续登录
   * @param callbackInfo
   * @returns
   */
  async continueSignIn(callbackInfo?: IPrividerCallbackInfo): Promise<LoginState> {
    // 这里支持在回调页面调用该函数完成登录
    callbackInfo = callbackInfo || this.getAuthPrividerCallbackInfoFromUrl()
    const token = await this.signInWithProvider(callbackInfo)
    const { accessTokenKey, accessTokenExpireKey, refreshTokenKey } = this._cache.keys
    const { refresh_token: refreshToken, access_token: accessToken, expires_in: accessTokenExpire } = token

    if (!accessToken || !accessTokenExpire) {
      throw new Error(JSON.stringify({
        code: 'SignFailure'
      }))
    }

    await Promise.all([
      this._cache.setStoreAsync(refreshTokenKey, refreshToken),
      this._cache.setStoreAsync(accessTokenKey, accessToken),
      this._cache.setStoreAsync(accessTokenExpireKey, accessTokenExpire * 1000 + Date.now())
    ])
    eventBus.fire(EVENTS.LOGIN_STATE_CHANGED)
    eventBus.fire(EVENTS.LOGIN_TYPE_CHANGED, {
      env: this._config.env,
      loginType: `${OAUTH2_LOGINTYPE_PREFIX}.${this.providerId}`, 
      persistence: this._config.persistence 
    })

    const loginState = new LoginState({
      envId: this._config.env,
      cache: this._cache,
      request: this._request
    })

    await loginState.checkLocalStateAsync()

    // const userInfo = await this.refreshUserInfo()

    return loginState
  }

  private getAuthPrividerCallbackInfoFromUrl(): IPrividerCallbackInfo {
    // TODO: 支持 Query & Hash
    // 直接从 URL 上取回调信息
    // {
    //   state: '_tstate.1627564561750',
    //   access_token: 'ya29.a0ARrdaM98yMpUhCJRq2lVezPtdhQHAWsvDzj5OiiI8WREawQjC9HUo7tKjusJR4z0OCD5435BtbqH-kTsLTB3nllfHL0GjqJN1N20_r8Qs2ckVwH7axCuokmw58A_d0SKVuqN-U-NR61QrIK6Hvl8WAM-jm22ew',
    //   token_type: 'Bearer',
    //   expires_in: 3599,
    //   scope: 'email%20profile%20openid%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile',
    //   authuser: '0',
    //   prompt: 'none'
    // }
    return qsParse(decodeURIComponent((new URL(window.location.href).hash).replace('#', ''))) as IPrividerCallbackInfo
  }

  private async fetchProviderRedirectURI(): Promise<IGenProviderRedirectURIResponse> {
    const {
      response_type,
      provider_id,
      client_id,
      scope,
      redirect_uri,
      state,
      // other_params
    }: IGenProviderRedirectURIRequest = {
      response_type: this.responseType,
      provider_id: this.providerId,
      client_id: this.clientId,
      scope: this.scope,
      redirect_uri: this.redirectUri,
      state: btoa(JSON.stringify({
        t: Date.now(),
        provider_id: this.providerId,
        client_id: this.clientId,
        // 登录成功之后路由的页面地址
        routeKey: ''
      })),
      // other_params: utils.toQueryString({ a: 1 })
    }

    const qs = utils.toQueryString({
      response_type,
      provider_id,
      client_id,
      scope,
      redirect_uri,
      state,
      // other_params
    })
    const resp = await this.fetch(`${kPaths.prividerUri}?${qs}`, {
      method: 'GET'
    })
    // {
    //   uri: 'https://accounts.google.com/o/oauth2/v2/auth?client_id=686970215944-gun1neofjhtjt7gmta2qfth6f82sj011.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fproduction-fv979-1258964769.ap-shanghai.app.tcloudbase.com&response_type=token&scope=openid+email+profile&state=_tstate.1627545941923',
    //   signout_uri: ''
    // }
    return resp.json()
  }

  private async fetchProviderToken(callbackInfo: IPrividerCallbackInfo): Promise<IGrantProviderTokenResponse> {
    // const state = atob(JSON.stringify(callbackInfo.state))
    const body: IGrantProviderTokenRequest = {
      provider_id: this.providerId,
      client_id: this.clientId,
      provider_redirect_uri: callbackInfo.href
    }

    if (callbackInfo.code) {
      body.provider_code = callbackInfo.code
    }
    else if (callbackInfo.access_token) {
      body.provider_access_token = callbackInfo.access_token
    }
    else if (callbackInfo.id_token) {
      body.provider_id_token = callbackInfo.id_token
    }

    const resp = await this.fetch(kPaths.prividerToken, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    // {
    //   "provider_token": "eyJhbGciOiJB6AS8......HB4-v1P1j-zwqiQ",
    //   "expires_in": 1200,
    //   "provider_profile": {
    //     "provider_id": "google",
    //     "sub": "101963751496807079381",
    //     "name": "",
    //     "picture": "",
    //     "email": "",
    //     "locale": "zh-cn"
    //   }
    // }
    return resp.json()
  }

  private async signInWithProvider(callbackInfo: IPrividerCallbackInfo): Promise<IToken> {
    const token = await this.fetchProviderToken(callbackInfo)
    const body: ISignInWithProviderRequest = {
      client_id: this.clientId,
      provider_token: token.provider_token,
      sync_profile: this.syncProfile,
      force_disable_sign_up: this.forceDisableSignUp
    }
    const resp = await this.fetch(kPaths.signinWithProvider, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    return resp.json()
  }

  async refreshUserInfo() {
    const { accessToken } = (await this._request.getAccessToken())
    const authorization = `Bearer ${accessToken}`
    const resp = await this.fetch(kPaths.me, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': authorization
      }
    })
    // {
    //   "sub": "7aab4ba9053e4402a3d42b61cc257c11",
    //   "name": "",
    //   "picture": "https://lh3.googleusercontent.com/a-/AOh14Gg4sDe14SC5WNs85Ko2nfBlXvldYVgbSYbvIrka=s96-c",
    //   "email": "",
    //   "providers": [
    //     {
    //       "id": "google",
    //       "provider_user_id": "101963751496807079381",
    //       "name": ""
    //     }
    //   ],
    //   "status": "ACTIVE",
    //   "created_at": "2021-07-28T06:31:36.983Z",
    //   "password_updated_at": "2021-07-28T06:31:36.983Z"
    // }
    return resp.json()
  }

  private async fetch(urlOrPath: string, init?: RequestInit) {
    const resp = await this._request.fetch(urlOrPath, init)

    const seqIdFromHeader = resp.headers.get('SeqId') || resp.headers.get('RequestId')
    if (resp.status >= 400 && resp.status < 500) {
      const body: IAuthServerRespError = await resp.json()
      const seqId = body.request_id || seqIdFromHeader
      throw new Error(`[${getSdkName()}][OAuth2AuthProvider][status:${resp.status}][${body.error}(${body.error_code})] ${body.error_description} (${seqId})`)
    }
    else if (resp.status >= 500) {
      const body: IAuthServerRespError = await resp.json()
      const seqId = body.request_id || seqIdFromHeader
      throw new Error(`[${getSdkName()}][OAuth2AuthProvider][status:${resp.status}][${body.error}(${body.error_code})] ${body.error_description} (${seqId})`)
    }

    return resp
  }
}
