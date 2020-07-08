import { ICloudbaseConfig, KV } from '.';

export type ICloudbaseAuthConfig = Pick<ICloudbaseConfig,'env'|'persistence'|'debug'>;

export interface IAccessTokenInfo {
  accessToken: string;
  env: string;
}
export interface ICredential {
  refreshToken: string;
  accessToken?: string;
  accessTokenExpire?: string;
}
export interface IAuthProvider {
  signInWithRedirect():any;
}
export interface IUserInfo {
  uid?: string;
  loginType?: string;
  openid?: string;
  wxOpenId?: string;
  wxPublicId?: string;
  unionId?: string;
  qqMiniOpenId?: string;
  customUserId?: string;
  nickName?: string;
  gender?: string;
  avatarUrl?: string;
  email?: string;
  hasPassword?: boolean;
  location?: {
    country?: string;
    province?: string;
    city?: string;
  };
  country?: string;
  province?: string;
  city?: string;
}
export interface IUser extends IUserInfo{
  checkLocalInfo(): void;
  checkLocalInfoAsync(): Promise<void>;
  linkWithTicket(ticket:string): Promise<void>;
  linkWithRedirect(provider:IAuthProvider):void;
  getLinkedUidList(): Promise<{ hasPrimaryUid: boolean, users: IUserInfo[] }>;
  setPrimaryUid(uid:string):Promise<void>;
  unlink(loginType: 'CUSTOM'| 'WECHAT-OPEN' | 'WECHAT-PUBLIC' | 'WECHAT-UNION'):Promise<void>;
  update(userinfo:IUserInfo):Promise<void>;
  refresh():Promise<IUserInfo>;
}
export interface ILoginState {
  credential: ICredential;
  user: IUser;
  isAnonymousAuth: boolean;
  isCustomAuth: boolean;
  isWeixinAuth: boolean;
  loginType: string;
}
export interface ICloudbaseAuth {
  config:ICloudbaseConfig;
  loginType:string;
  weixinAuthProvider: any;
  anonymousAuthProvider: any;
  customAuthProvider: any;
  getAccessToken(): IAccessTokenInfo;
  getLoginState(): Promise<ILoginState|null>;
  hasLoginState(): Promise<ILoginState|null>;
  getUserInfo(): Promise<any>;
  getAuthHeader(): Promise<KV<string>>;
  onLoginStateChanged(callback:Function):void;
  onLoginStateExpired(callback: Function):void;
  onAccessTokenRefreshed(callback: Function):void;
  onAnonymousConverted(callback: Function):void;
  onLoginTypeChanged(callback: Function):void;
  shouldRefreshAccessToken(hook:Function):void;
}