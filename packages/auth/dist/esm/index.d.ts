import { ICloudbase } from '@cloudbase/types';
import { ICloudbaseCache } from '@cloudbase/types/cache';
import { ICloudbaseRequest } from '@cloudbase/types/request';
import { ICloudbaseAuthConfig, IUser, IUserInfo, ILoginState } from '@cloudbase/types/auth';
import { authModels, CloudbaseOAuth } from '@cloudbase/oauth';
interface UserInfo {
    uid?: string;
    gender?: string;
    avatarUrl?: string;
    picture?: string;
    email?: string;
    email_verified?: boolean;
    phone_number?: string;
    username?: string;
    name?: string;
    birthdate?: string;
    zoneinfo?: string;
    locale?: string;
    sub?: string;
    created_from?: string;
}
interface IUserOptions {
    cache: ICloudbaseCache;
    oauthInstance: CloudbaseOAuth;
}
interface ILoginStateOptions extends IUserOptions {
    envId: string;
}
export declare class LoginState implements ILoginState {
    user: IUser;
    oauthLoginState: any;
    private _oauthInstance;
    private _cache;
    constructor(options: ILoginStateOptions);
    checkLocalState(): void;
    checkLocalStateAsync(): Promise<void>;
}
declare class Auth {
    private readonly _config;
    private readonly _cache;
    private _oauthInstance;
    constructor(config: ICloudbaseAuthConfig & {
        cache: ICloudbaseCache;
        request?: ICloudbaseRequest;
        runtime?: string;
    });
    bindPhoneNumber(params: authModels.BindPhoneRequest): Promise<void>;
    unbindProvider(params: authModels.UnbindProviderRequest): Promise<void>;
    bindEmail(params: authModels.BindEmailRequest): Promise<void>;
    verify(params: authModels.VerifyRequest): Promise<authModels.VerifyResponse>;
    getVerification(params: authModels.GetVerificationRequest): Promise<authModels.GetVerificationResponse>;
    get currentUser(): IUser;
    getCurrentUser(): Promise<IUser>;
    signInAnonymously(): Promise<LoginState>;
    setCustomSignFunc(getTickFn: authModels.GetCustomSignTicketFn): void;
    signInWithCustomTicket(): Promise<LoginState>;
    signIn(params: authModels.SignInRequest): Promise<LoginState>;
    signUp(params: authModels.SignUpRequest): Promise<LoginState>;
    setPassword(params: authModels.SetPasswordRequest): Promise<void>;
    isUsernameRegistered(username: string): Promise<boolean>;
    signOut(): Promise<void>;
    hasLoginState(): LoginState | null;
    getLoginState(): Promise<LoginState>;
    getUserInfo(): Promise<IUserInfo>;
    bindWithProvider(params: authModels.BindWithProviderRequest): Promise<void>;
    queryUser(queryObj: authModels.QueryUserProfileRequest): Promise<authModels.QueryUserProfileResponse>;
    getAccessToken(): Promise<{
        accessToken: string;
        env: string;
    }>;
    grantProviderToken(params: authModels.GrantProviderTokenRequest): Promise<authModels.GrantProviderTokenResponse>;
    signInWithProvider(params: authModels.SignInWithProviderRequest): Promise<LoginState>;
    grantToken(params: authModels.GrantTokenRequest): Promise<LoginState>;
    genProviderRedirectUri(params: authModels.GenProviderRedirectUriRequest): Promise<authModels.GenProviderRedirectUriResponse>;
    resetPassword(params: authModels.ResetPasswordRequest): Promise<void>;
    deviceAuthorize(params: authModels.DeviceAuthorizeRequest): Promise<authModels.DeviceAuthorizeResponse>;
    sudo(params: authModels.SudoRequest): Promise<authModels.SudoResponse>;
    deleteMe(params: authModels.WithSudoRequest): Promise<authModels.UserProfile>;
    getProviders(): Promise<authModels.UserProfileProvider>;
    loginScope(): Promise<string>;
    onLoginStateChanged(callback: Function): Promise<void>;
    private createLoginState;
}
export { UserInfo, Auth, };
export declare function registerAuth(app: Pick<ICloudbase, 'registerComponent'>): void;
