import { ICloudbase } from '@cloudbase/types';
import { events } from '@cloudbase/utilities';
import { ICloudbaseCache } from '@cloudbase/types/cache';
import { ICloudbaseRequest } from '@cloudbase/types/request';
import { ICloudbaseAuthConfig, ICredential, IUser, ILoginState } from '@cloudbase/types/auth';
import { WeixinAuthProvider } from './providers/weixinAuthProvider';
import { AnonymousAuthProvider } from './providers/anonymousAuthProvider';
import { CustomAuthProvider } from './providers/customAuthProvider';
import { LOGINTYPE } from './constants';
import { AuthProvider } from './providers/base';
import { EmailAuthProvider } from './providers/emailAuthProvider';
import { UsernameAuthProvider } from './providers/usernameAuthProvider';
interface UserInfo {
    openid: string;
    nickname?: string;
    sex?: number;
    province?: string;
    city?: string;
    country?: string;
    headimgurl?: string;
    privilege?: [string];
    unionid?: string;
}
declare const eventBus: events.CloudbaseEventEmitter;
interface IUserOptions {
    cache: ICloudbaseCache;
    request: ICloudbaseRequest;
}
interface ILoginStateOptions extends IUserOptions {
    envId: string;
}
export declare class LoginState implements ILoginState {
    credential: ICredential;
    user: IUser;
    private _cache;
    private _loginType;
    constructor(options: ILoginStateOptions);
    checkLocalState(): Promise<void>;
    checkLocalStateAsync(): Promise<void>;
    get isAnonymousAuth(): boolean;
    get isCustomAuth(): boolean;
    get isWeixinAuth(): boolean;
    get isUsernameAuth(): boolean;
    get loginType(): string;
}
declare class Auth {
    private readonly _config;
    private readonly _cache;
    private readonly _request;
    private readonly _runtime;
    private _anonymousAuthProvider;
    private _customAuthProvider;
    private _weixinAuthProvider;
    private _emailAuthProvider;
    private _usernameAuthProvider;
    constructor(config: ICloudbaseAuthConfig & {
        cache: ICloudbaseCache;
        request: ICloudbaseRequest;
        runtime?: string;
    });
    get currentUser(): IUser;
    get loginType(): LOGINTYPE;
    getCurrenUser(): Promise<IUser>;
    getLoginType(): Promise<LOGINTYPE>;
    getAccessToken(): Promise<{
        accessToken: string;
        env: string;
    }>;
    weixinAuthProvider({ appid, scope, state }: {
        appid: any;
        scope: any;
        state: any;
    }): WeixinAuthProvider;
    anonymousAuthProvider(): AnonymousAuthProvider;
    customAuthProvider(): CustomAuthProvider;
    emailAuthProvider(): EmailAuthProvider;
    usernameAuthProvider(): UsernameAuthProvider;
    signInWithUsernameAndPassword(username: string, password: string): Promise<ILoginState>;
    isUsernameRegistered(username: string): Promise<boolean>;
    signInWithEmailAndPassword(email: string, password: string): Promise<ILoginState>;
    signUpWithEmailAndPassword(email: string, password: string): Promise<any>;
    sendPasswordResetEmail(email: string): Promise<any>;
    signOut(): Promise<any>;
    onLoginStateChanged(callback: Function): Promise<void>;
    onLoginStateExpired(callback: Function): void;
    onAccessTokenRefreshed(callback: Function): void;
    onAnonymousConverted(callback: Function): void;
    onLoginTypeChanged(callback: Function): void;
    hasLoginState(): ILoginState | null;
    getLoginState(): Promise<LoginState>;
    shouldRefreshAccessToken(hook: any): void;
    getUserInfo(): Promise<any>;
    getAuthHeader(): {
        'x-cloudbase-credentials': string;
    };
    getAuthHeaderAsync(): Promise<{
        'x-cloudbase-credentials': string;
    }>;
    private _onLoginTypeChanged;
}
declare const EVENTS: {
    LOGIN_STATE_CHANGED: string;
    LOGIN_STATE_EXPIRED: string;
    LOGIN_TYPE_CHANGED: string;
    ANONYMOUS_CONVERTED: string;
    ACCESS_TOKEN_REFRESHD: string;
};
export { UserInfo, Auth, AuthProvider, EVENTS, eventBus };
export declare function registerAuth(app: Pick<ICloudbase, 'registerComponent'>): void;
declare type IProvider = new (...args: any[]) => any;
export declare function registerProvider(name: string, provider: IProvider): void;
