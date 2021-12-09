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
    cache: any;
    oauthInstance: CloudbaseOAuth;
}
interface ILoginStateOptions extends IUserOptions {
    envId: string;
}
export declare class LoginState {
    user: any;
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
    constructor(config: any & {
        cache: any;
        request?: any;
        runtime?: string;
    });
    bindPhoneNumber(params: authModels.BindPhoneRequest): Promise<void>;
    unbindProvider(params: authModels.UnbindProviderRequest): Promise<void>;
    bindEmail(params: authModels.BindEmailRequest): Promise<void>;
    verify(params: authModels.VerifyRequest): Promise<authModels.VerifyResponse>;
    getVerification(params: authModels.GetVerificationRequest): Promise<authModels.GetVerificationResponse>;
    get currentUser(): any;
    getCurrentUser(): Promise<any>;
    signInAnonymously(): Promise<any>;
    setCustomSignFunc(getTickFn: authModels.GetCustomSignTicketFn): void;
    signInWithCustomTicket(): Promise<any>;
    signIn(params: authModels.SignInRequest): Promise<any>;
    signUp(params: authModels.SignUpRequest): Promise<any>;
    setPassword(params: authModels.SetPasswordRequest): Promise<void>;
    isUsernameRegistered(username: string): Promise<boolean>;
    signOut(): Promise<void>;
    hasLoginState(): any | null;
    getLoginState(): Promise<LoginState>;
    getUserInfo(): Promise<any>;
    bindWithProvider(params: authModels.BindWithProviderRequest): Promise<void>;
    queryUser(queryObj: authModels.QueryUserProfileRequest): Promise<authModels.QueryUserProfileResponse>;
    getAccessToken(): Promise<{
        accessToken: string;
        env: any;
    }>;
    grantProviderToken(params: authModels.GrantProviderTokenRequest): Promise<authModels.GrantProviderTokenResponse>;
    signInWithProvider(params: authModels.SignInWithProviderRequest): Promise<any>;
    grantToken(params: authModels.GrantTokenRequest): Promise<any>;
    genProviderRedirectUri(params: authModels.GenProviderRedirectUriRequest): Promise<authModels.GenProviderRedirectUriResponse>;
    resetPassword(params: authModels.ResetPasswordRequest): Promise<void>;
    deviceAuthorize(params: authModels.DeviceAuthorizeRequest): Promise<authModels.DeviceAuthorizeResponse>;
}
export { UserInfo, Auth, };
export declare function registerAuth(app: Pick<any, 'registerComponent'>): void;
