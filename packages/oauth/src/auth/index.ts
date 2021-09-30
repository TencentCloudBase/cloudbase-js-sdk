'use strict';

import {ApiUrls} from './consts';

export {ErrorType} from './consts';
import {
    GetVerificationRequest,
    GetVerificationResponse,
    UserProfile,
    SignInRequest,
    SignUpRequest,
    VerifyRequest,
    VerifyResponse,
    GenProviderRedirectUriRequest,
    GenProviderRedirectUriResponse,
    GrantProviderTokenRequest,
    GrantProviderTokenResponse,
    PatchProviderTokenRequest,
    PatchProviderTokenResponse,
    SignInWithProviderRequest,
    BindWithProviderRequest,
    TransByProviderRequest,
    GrantTokenRequest,
    UserProfileProvider,
    UnbindProviderRequest,
    CheckPasswordrRequest,
    BindPhoneRequest,
    SetPasswordRequest,
    ChangeBoundProviderRequest,
    ChangeBoundProviderResponse,
    QueryUserProfileReq, UpdatePasswordRequest, SudoRequest, SudoResponse,
} from './models';

import {getOAuthClient, Credentials, AuthClient, ErrorType as oauthErrorType} from "../oauthclient";
import {getCaptcha, Captcha} from '../captcha';
import {App, RequestFn as appRequestFn} from "../app";
import {_getComponent} from "../app/internal";


export interface AuthOptions {
    credentialsClient: AuthClient
    captcha: Captcha
}

/**
 * Returns the existing `Auth` instance that is associated with the app
 */
export function getAuth(app: App, initOptions?: any): Auth {
    return _getComponent<Auth>(app, "auth", (): Auth => {
        const credentialsClient = getOAuthClient(app, initOptions)
        const baseRequest = credentialsClient.request.bind(credentialsClient);
        const captcha = getCaptcha(app, {request: baseRequest})
        return new Auth({
            credentialsClient: credentialsClient,
            captcha: captcha
        })
    });
}

export type GetCustomSignTicketFn = () => Promise<string>;

/**
 * Auth
 */
export class Auth {
    public readonly request: appRequestFn;
    public readonly credentialsClient: AuthClient
    private _getCustomSignTicketFn?: GetCustomSignTicketFn;

    /**
     * constructor
     * @param {AuthOptions} opts
     */
    constructor(opts: AuthOptions) {
        this.request = opts.captcha.request.bind(opts.captcha)
        this.credentialsClient = opts.credentialsClient
    }

    /**
     * Sign in.
     * @param {SignInRequest} params A SignInRequest Object.
     * @return {Promise<Credentials>} A Promise<Credentials> object.
     */
    public async signIn(params: SignInRequest): Promise<Credentials> {
        const credentials: Credentials = await this.request<Credentials>(
            ApiUrls.AUTH_SIGN_IN_URL,
            {
                method: 'POST',
                withBasicAuth: true,
                body: params
            },
        );
        await this.credentialsClient.setCredentials(credentials);
        return Promise.resolve(credentials);
    }

    /**
     * Sign in Anonymously
     * @return {Promise<Credentials>} A Promise<Credentials> object.
     */
    public async signInAnonymously(): Promise<Credentials> {
        const credentials: Credentials = await this.request<Credentials>(
            ApiUrls.AUTH_SIGN_IN_ANONYMOUSLY_URL,
            {
                method: 'POST',
                withBasicAuth: true,
                body: {}
            },
        );
        await this.credentialsClient.setCredentials(credentials);
        return Promise.resolve(credentials);
    }

    /**
     * Sign up.
     * @param {SignUpRequest} params A SignUpRequest Object.
     * @return {Promise<Credentials>} A Promise<Credentials> object.
     */
    protected async signUp(params: SignUpRequest): Promise<Credentials> {
        const data: Credentials = await this.request<Credentials>(
            ApiUrls.AUTH_SIGN_UP_URL,
            {
                method: 'POST',
                withBasicAuth: true,
                body: params,
            },
        );
        await this.credentialsClient.setCredentials(data);
        return Promise.resolve(data);
    }

    /**
     * Sign out.
     * @return {Object} A Promise<void> object.
     */
    public async signOut(): Promise<void> {
        const accessToken: string = await this.credentialsClient.getAccessToken();
        const data = await this.request<void>(ApiUrls.AUTH_REVOKE_URL, {
            method: 'POST',
            withBasicAuth: true,
            body: {
                token: accessToken,
            },
        });
        await this.credentialsClient.setCredentials();
        return Promise.resolve(data);
    }

    /**
     * Get the verification.
     * @param {GetVerificationRequest} params A GetVerificationRequest Object.
     * @return {Promise<GetVerificationResponse>} A Promise<GetVerificationResponse> object.
     */
    public async getVerification(
        params: GetVerificationRequest,
    ): Promise<GetVerificationResponse> {
        return this.request<GetVerificationResponse>(
            ApiUrls.VERIFICATION_URL,
            {
                method: 'POST',
                withBasicAuth: true,
                body: params,
                withCaptcha: true
            },
        );
    }

    /**
     *  Verify the code
     * @param {VerifyRequest} params A VerifyRequest Object.
     * @return {Promise<VerifyResponse>} A Promise<VerifyResponse> object.
     */
    public async verify(params: VerifyRequest): Promise<VerifyResponse> {
        return this.request<VerifyResponse>(ApiUrls.VERIFY_URL, {
            method: 'POST',
            withBasicAuth: true,
            body: params,
        });
    }

    /**
     * Gen provider redirect uri.
     * @param {GenProviderRedirectUriRequest} params A GenProviderRedirectUriRequest object.
     * @return {Promise<GenProviderRedirectUriResponse>} A Promise<GenProviderRedirectUriResponse> object.
     */
    public async genProviderRedirectUri(
        params: GenProviderRedirectUriRequest,
    ): Promise<GenProviderRedirectUriResponse> {
        let url = `${ApiUrls.PROVIDER_URI_URL}?provider_id=${params.provider_id}&redirect_uri=${encodeURIComponent(
            params.provider_redirect_uri,
        )}&state=${params.state}`;
        const other_params = params.other_params;
        if (other_params) {
            if (
                typeof other_params.sign_out_uri === 'string' &&
                other_params.sign_out_uri.length > 0
            ) {
                url += `&other_params[sign_out_uri]=${other_params.sign_out_uri}`;
            }
        }
        return this.request<GenProviderRedirectUriResponse>(url, {
            method: 'GET',
            withBasicAuth: true,
        });
    }

    /**
     * Grant provider token.
     * @param {GrantProviderTokenRequest} params A GrantProviderTokenRequest object.
     * @return {Promise<GrantProviderTokenResponse>} A Promise<GrantProviderTokenResponse> object.
     */
    public async grantProviderToken(
        params: GrantProviderTokenRequest,
    ): Promise<GrantProviderTokenResponse> {
        return this.request<GrantProviderTokenResponse>(
            ApiUrls.PROVIDER_TOKEN_URL,
            {
                method: 'POST',
                withBasicAuth: true,
                body: params,
            },
        );
    }

    /**
     * Grant provider token.
     * @param {PatchProviderTokenRequest} params A PatchProviderTokenRequest object.
     * @return {Promise<PatchProviderTokenResponse>} A Promise<PatchProviderTokenResponse> object.
     */
    public async patchProviderToken(
        params: PatchProviderTokenRequest,
    ): Promise<PatchProviderTokenResponse> {
        return this.request<PatchProviderTokenResponse>(
            ApiUrls.PROVIDER_TOKEN_URL,
            {
                method: 'PATCH',
                withBasicAuth: true,
                body: params,
            },
        );
    }

    /**
     * Signin with provider request.
     * @param {SignInWithProviderRequest} params A SignInWithProviderRequest object.
     * @return {Promise<Credentials>} A Promise<Credentials> object.
     */
    public async signInWithProvider(
        params: SignInWithProviderRequest,
    ): Promise<Credentials> {
        const credentials: Credentials = await this.request<Credentials>(
            ApiUrls.AUTH_SIGN_IN_WITH_PROVIDER_URL,
            {
                method: 'POST',
                withBasicAuth: true,
                body: params,
            },
        );
        await this.credentialsClient.setCredentials(credentials);
        return Promise.resolve(credentials);
    }

    /**
     * Bind with provider
     * @param {BindWithProviderRequest} params A BindWithProviderRequest object.
     * @return {Promise<void>} A Promise<any> object.
     */
    public async bindWithProvider(
        params: BindWithProviderRequest,
    ): Promise<void> {
        return this.request<any>(ApiUrls.PROVIDER_BIND_URL, {
            method: 'POST',
            withBasicAuth: true,
            body: params,
            withCredentials: true,
        });
    }

    /**
     * Get the user profile.
     * @return {Promise<UserProfile>} A Promise<UserProfile> object.
     */
    public async getUserProfile(): Promise<UserProfile> {
        return this.request<UserProfile>(ApiUrls.USER_ME_URL, {
            method: 'GET',
            withCredentials: true,
        });
    }

    /**
     * Get the user profile.
     * @return {Promise<UserProfile>} A Promise<UserProfile> object.
     */
    public async updateUserProfile(params: UserProfile): Promise<UserProfile> {
        return this.request<UserProfile>(ApiUrls.USER_ME_URL, {
            method: 'PATCH',
            withCredentials: true,
            body: params,
        });
    }

    /**
     * hasLoginState check if has login state
     * @return {Promise<boolean>} A Promise<boolean> object.
     */
    public async hasLoginState(): Promise<boolean> {
        try {
            await this.credentialsClient.getAccessToken()
            return true
        } catch (err) {
            if (err.error === oauthErrorType.UNAUTHENTICATED) {
                return false
            }
            return Promise.reject(err)
        }
    }

    /**
     * Trans by provider.
     * @param {TransByProviderRequest} params A TransByProviderRequest object.
     * @return {Promise<Credentials>} A Promise<Credentials> object.
     */
    public async transByProvider(
        params: TransByProviderRequest,
    ): Promise<Credentials> {
        return this.request<Credentials>(
            ApiUrls.USER_TRANS_BY_PROVIDER_URL,
            {
                method: 'PATCH',
                body: params,
                withCredentials: true,
            },
        );
    }

    /**
     * Grant token.
     * @param {GrantTokenRequest} params A GrantTokenRequest object.
     * @return {Promise<Credentials>} A Promise<Credentials> object.
     */
    public async grantToken(params: GrantTokenRequest): Promise<Credentials> {
        return this.request<Credentials>(ApiUrls.AUTH_TOKEN_URL, {
            method: 'POST',
            withBasicAuth: true,
            body: params,
        });
    }

    /**
     * Get the provide list.
     * @return {Promise<UserProfileProvider>} A Promise<UserProfileProvider> object.
     */
    public async getProviders(): Promise<UserProfileProvider> {
        return this.request<UserProfileProvider>(ApiUrls.PROVIDER_LIST, {
            method: 'GET',
            withCredentials: true,
        });
    }

    /**
     * unbind provider.
     * @param {UnbindProviderRequest} params
     * @return {Promise<any>}
     */
    public async unbindProvider(params: UnbindProviderRequest): Promise<void> {
        return this.request<any>(
            `${ApiUrls.PROVIDER_UNBIND_URL}/${params.provider_id}`,
            {
                method: 'DELETE',
                withCredentials: true,
            },
        );
    }

    /**
     * check Password.
     * @param {CheckPasswordrRequest} params
     * @return {Promise<any>}
     */
    public async checkPassword(params: CheckPasswordrRequest): Promise<void> {
        return this.request<any>(`${ApiUrls.SUDO_URL}`, {
            method: 'POST',
            withCredentials: true,
            body: params,
        });
    }

    /**
     * check Password.
     * @param {CheckPasswordrRequest} params
     * @return {Promise<any>}
     */
    public async bindPhone(params: BindPhoneRequest): Promise<void> {
        return this.request<any>(`${ApiUrls.BIND_PHONE_URL}`, {
            method: 'PATCH',
            withCredentials: true,
            body: params,
        });
    }

    /**
     * Set Password.
     * @param {SetPasswordrRequest} params
     * @return {Promise<any>}
     */
    public async setPassword(params: SetPasswordRequest): Promise<void> {
        return this.request<any>(`${ApiUrls.AUTH_SET_PASSWORD}`, {
            method: 'PATCH',
            withCredentials: true,
            body: params,
        });
    }

    /**
     * updatePasswordByOld 使用旧密码修改密码，如果已经绑定手机号，请先：sudo，再修改密码
     * @param {SetPasswordrRequest} params
     * @return {Promise<any>}
     */
    public async updatePasswordByOld(params: UpdatePasswordRequest): Promise<void> {
        const sudoToken = await this.sudo({password: params.old_password})
        return this.setPassword({
            sudo_token: sudoToken.sudo_token,
            new_password: params.new_password,
        })
    }

    /**
     * sudo
     * @param {SetPasswordrRequest} params
     * @return {Promise<any>}
     */
    public async sudo(params: SudoRequest): Promise<SudoResponse> {
        return this.request<SudoResponse>(`${ApiUrls.SUDO_URL}`, {
            method: 'POST',
            withCredentials: true,
            body: params,
        });
    }

    /**
     * Get the current user verification.
     * @param {GetVerificationRequest} params A GetVerificationRequest Object.
     * @return {Promise<GetVerificationResponse>} A Promise<GetVerificationResponse> object.
     */
    public async getCurUserVerification(
        params: GetVerificationRequest,
    ): Promise<GetVerificationResponse> {
        params.target = 'CUR_USER';
        return this.request<GetVerificationResponse>(
            ApiUrls.VERIFICATION_URL,
            {
                method: 'POST',
                body: params,
                withCredentials: true,
                withCaptcha: true
            },
        );
    }

    /**
     * change Bound provider.
     * @param {GetVerificationRequest} params A GetVerificationRequest Object.
     * @return {Promise<GetVerificationResponse>} A Promise<GetVerificationResponse> object.
     */
    public async changeBoundProvider(
        params: ChangeBoundProviderRequest,
    ): Promise<ChangeBoundProviderResponse> {
        return this.request<ChangeBoundProviderResponse>(
            `${ApiUrls.PROVIDER_LIST}/${params.provider_id}/trans`,
            {
                method: 'POST',
                body: {
                    provider_trans_token: params.trans_token,
                },
                withCredentials: true,
            },
        );
    }

    /**
     * Patch the user profile.
     * @param {UserProfile} params A UserProfile Object.
     * @return {Promise<UserProfile>} A Promise<UserProfile> object.
     */
    public async setUserProfile(params: UserProfile): Promise<UserProfile> {
        return this.request<UserProfile>(ApiUrls.USER_PRIFILE_URL, {
            method: 'PATCH',
            body: params,
            withCredentials: true,
        });
    }

    /**
     * setCustomSignFunc set the get ticket function
     * @param getTickFn
     */
    public setCustomSignFunc(getTickFn: GetCustomSignTicketFn) {
        this._getCustomSignTicketFn = getTickFn
    }

    /**
     * SignInWithCustomTicket custom signIn
     * @constructor
     */
    public async SignInWithCustomTicket(): Promise<Credentials> {
        const customTicket = await this._getCustomSignTicketFn()
        return this.signInWithProvider({
            provider_id: 'custom',
            provider_token: customTicket
        })
    }

    /**
     * Patch the user profile.
     * @param {QueryUserProfileReq} appended_params A QueryUserProfileReq Object.
     * @return {Promise<UserProfile>} A Promise<UserProfile> object.
     */
    public async queryUserProfile(
        appended_params: QueryUserProfileReq,
    ): Promise<UserProfile> {
        const url = `${ApiUrls.USER_QUERY_URL}${appended_params}`;
        return this.request<UserProfile>(url, {
            method: 'GET',
            withCredentials: true,
        });
    }
}
