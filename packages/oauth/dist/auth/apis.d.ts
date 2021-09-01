import { GetVerificationRequest, GetVerificationResponse, UserProfile, UserInfo, SignInRequest, SignUpRequest, VerifyRequest, VerifyResponse, GenProviderRedirectUriRequest, GenProviderRedirectUriResponse, GrantProviderTokenRequest, GrantProviderTokenResponse, PatchProviderTokenRequest, PatchProviderTokenResponse, SignInWithProviderRequest, BindWithProviderRequest, TransByProviderRequest, GrantTokenRequest, UserProfileProvider, UnbindProviderRequest, CheckPasswordrRequest, BindPhoneRequest, SetPasswordRequest, ChangeBindedProviderRequest, ChangeBindedProviderResponse, QueryUserProfileReq } from './models';
import { SimpleStorage, RequestFunction } from '../oauth2client/interface';
import { OAuth2Client } from '../oauth2client/oauth2client';
import { Credentials } from '../oauth2client/models';
export interface AuthOptions {
    apiOrigin: string;
    clientId: string;
    credentialsClient?: OAuth2Client;
    request?: RequestFunction;
    storage?: SimpleStorage;
}
export declare class Auth {
    private _config;
    constructor(opts: AuthOptions);
    signIn(params: SignInRequest): Promise<Credentials>;
    signInAnonymously(): Promise<Credentials>;
    protected signUp(params: SignUpRequest): Promise<Credentials>;
    signOut(): Promise<void>;
    getVerification(params: GetVerificationRequest): Promise<GetVerificationResponse>;
    verify(params: VerifyRequest): Promise<VerifyResponse>;
    genProviderRedirectUri(params: GenProviderRedirectUriRequest): Promise<GenProviderRedirectUriResponse>;
    grantProviderToken(params: GrantProviderTokenRequest): Promise<GrantProviderTokenResponse>;
    patchProviderToken(params: PatchProviderTokenRequest): Promise<PatchProviderTokenResponse>;
    signInWithProvider(params: SignInWithProviderRequest): Promise<Credentials>;
    bindWithProvider(params: BindWithProviderRequest): Promise<void>;
    getUserProfile(): Promise<UserProfile>;
    getUserInfo(): Promise<UserInfo>;
    hasLoginState(): Promise<boolean>;
    transByProvider(params: TransByProviderRequest): Promise<Credentials>;
    grantToken(params: GrantTokenRequest): Promise<Credentials>;
    getProviders(): Promise<UserProfileProvider>;
    unbindProvider(params: UnbindProviderRequest): Promise<void>;
    checkPassword(params: CheckPasswordrRequest): Promise<void>;
    bindPhone(params: BindPhoneRequest): Promise<void>;
    setPassword(params: SetPasswordRequest): Promise<void>;
    getCurUserVerification(params: GetVerificationRequest): Promise<GetVerificationResponse>;
    changeBindedProvider(params: ChangeBindedProviderRequest): Promise<ChangeBindedProviderResponse>;
    setUserProfile(params: UserProfile): Promise<UserProfile>;
    queryUserProfile(appended_params: QueryUserProfileReq): Promise<UserProfile>;
}
