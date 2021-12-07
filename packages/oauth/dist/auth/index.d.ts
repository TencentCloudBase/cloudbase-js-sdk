export { ErrorType } from './consts';
import { GetVerificationRequest, GetVerificationResponse, UserProfile, SignInRequest, SignUpRequest, VerifyRequest, VerifyResponse, GenProviderRedirectUriRequest, GenProviderRedirectUriResponse, GrantProviderTokenRequest, GrantProviderTokenResponse, PatchProviderTokenRequest, PatchProviderTokenResponse, SignInWithProviderRequest, BindWithProviderRequest, TransByProviderRequest, GrantTokenRequest, UserProfileProvider, UnbindProviderRequest, CheckPasswordrRequest, BindPhoneRequest, SetPasswordRequest, ChangeBoundProviderRequest, ChangeBoundProviderResponse, QueryUserProfileReq, UpdatePasswordRequest, SudoRequest, SudoResponse } from './models';
import { Credentials, AuthClient } from "../oauthclient";
import { Captcha } from '../captcha';
import { App, RequestFn as appRequestFn } from "../app";
export interface AuthOptions {
    credentialsClient: AuthClient;
    captcha: Captcha;
}
export declare function getAuth(app: App): Auth;
export declare type GetCustomSignTicketFn = () => Promise<string>;
export declare class Auth {
    readonly request: appRequestFn;
    readonly credentialsClient: AuthClient;
    private _getCustomSignTicketFn?;
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
    updateUserProfile(params: UserProfile): Promise<UserProfile>;
    hasLoginState(): Promise<boolean>;
    transByProvider(params: TransByProviderRequest): Promise<Credentials>;
    grantToken(params: GrantTokenRequest): Promise<Credentials>;
    getProviders(): Promise<UserProfileProvider>;
    unbindProvider(params: UnbindProviderRequest): Promise<void>;
    checkPassword(params: CheckPasswordrRequest): Promise<void>;
    bindPhone(params: BindPhoneRequest): Promise<void>;
    setPassword(params: SetPasswordRequest): Promise<void>;
    updatePasswordByOld(params: UpdatePasswordRequest): Promise<void>;
    sudo(params: SudoRequest): Promise<SudoResponse>;
    getCurUserVerification(params: GetVerificationRequest): Promise<GetVerificationResponse>;
    changeBoundProvider(params: ChangeBoundProviderRequest): Promise<ChangeBoundProviderResponse>;
    setUserProfile(params: UserProfile): Promise<UserProfile>;
    setCustomSignFunc(getTickFn: GetCustomSignTicketFn): void;
    SignInWithCustomTicket(): Promise<Credentials>;
    queryUserProfile(appended_params: QueryUserProfileReq): Promise<UserProfile>;
}
