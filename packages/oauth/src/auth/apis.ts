'use strict';

import {ApiUrls} from './consts';
import {
    GetVerificationRequest,
    GetVerificationResponse,
    UserProfile,
    UserInfo,
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
    ChangeBindedProviderRequest,
    ChangeBindedProviderResponse,
    QueryUserProfileReq,
} from './models';
import {SimpleStorage, RequestFunction} from '../oauth2client/interface';
import {OAuth2Client, defaultStorage} from '../oauth2client/oauth2client';
import {Credentials} from '../oauth2client/models';
import {Captcha} from '../captcha/captcha';

export interface AuthOptions {
    apiOrigin: string;
    clientId: string;
    credentialsClient?: OAuth2Client;
    request?: RequestFunction;
    storage?: SimpleStorage;
}

/**
 * Auth
 */
export class Auth {
    private _config: AuthOptions;

    /**
     * constructor
     * @param {AuthOptions} opts
     */
    constructor(opts: AuthOptions) {
        let request = opts.request;
        let oAuth2Client = opts.credentialsClient;
        if (!oAuth2Client) {
            const initOptions = {
                apiOrigin: opts.apiOrigin,
                clientId: opts.clientId,
                storage: opts.storage,
            };
            oAuth2Client = new OAuth2Client(initOptions);
        }
        if (!request) {
            const baseRequest = oAuth2Client.request.bind(oAuth2Client);
            const captcha = new Captcha({
                clientId: opts.clientId,
                request: baseRequest,
                storage: opts.storage,
            })
            request = captcha.request.bind(captcha)
        }
        this._config = {
            apiOrigin: opts.apiOrigin,
            clientId: opts.clientId,
            request: request,
            credentialsClient: oAuth2Client,
            storage: opts.storage || defaultStorage,
        };
    }

    /**
     * Sign in.
     * @param {SignInRequest} params A SignInRequest Object.
     * @return {Promise<Credentials>} A Promise<Credentials> object.
     */
    public async signIn(params: SignInRequest): Promise<Credentials> {
        params.client_id = this._config.clientId;
        const credentials: Credentials = await this._config.request<Credentials>(
            ApiUrls.AUTH_SIGN_IN_URL,
            {
                method: 'POST',
                body: params
            },
        );
        await this._config.credentialsClient.setCredentials(credentials);
        return Promise.resolve(credentials);
    }

    /**
     * Sign in Anonymously
     * @return {Promise<Credentials>} A Promise<Credentials> object.
     */
    public async signInAnonymously(): Promise<Credentials> {
        const credentials: Credentials = await this._config.request<Credentials>(
            ApiUrls.AUTH_SIGN_IN_ANONYMOUSLY_URL,
            {
                method: 'POST',
                body: {
                    client_id: this._config.clientId
                }
            },
        );
        await this._config.credentialsClient.setCredentials(credentials);
        return Promise.resolve(credentials);
    }

    /**
     * Sign up.
     * @param {SignUpRequest} params A SignUpRequest Object.
     * @return {Promise<Credentials>} A Promise<Credentials> object.
     */
    protected async signUp(params: SignUpRequest): Promise<Credentials> {
        params.client_id = this._config.clientId;
        const data: Credentials = await this._config.request<Credentials>(
            ApiUrls.AUTH_SIGN_UP_URL,
            {
                method: 'POST',
                body: params,
            },
        );
        await this._config.credentialsClient.setCredentials(data);
        return Promise.resolve(data);
    }

    /**
     * Sign out.
     * @return {Object} A Promise<void> object.
     */
    public async signOut(): Promise<void> {
        const accessToken: string = await this._config.credentialsClient.getAccessToken();
        const data = await this._config.request<void>(ApiUrls.AUTH_REVOKE_URL, {
            method: 'POST',
            body: {
                client_id: this._config.clientId,
                token: accessToken,
            },
        });
        await this._config.credentialsClient.setCredentials();
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
        params.client_id = this._config.clientId;
        return this._config.request<GetVerificationResponse>(
            ApiUrls.VERIFICATION_URL,
            {
                method: 'POST',
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
        params.client_id = this._config.clientId;
        return this._config.request<VerifyResponse>(ApiUrls.VERIFY_URL, {
            method: 'POST',
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
        let url = `${ApiUrls.PROVIDER_URI_URL}?client_id=${
            this._config.clientId
        }&provider_id=${params.provider_id}&redirect_uri=${encodeURIComponent(
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
        return this._config.request<GenProviderRedirectUriResponse>(url, {
            method: 'GET',
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
        params.client_id = this._config.clientId;
        return this._config.request<GrantProviderTokenResponse>(
            ApiUrls.PROVIDER_TOKEN_URL,
            {
                method: 'POST',
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
        params.client_id = this._config.clientId;
        return this._config.request<PatchProviderTokenResponse>(
            ApiUrls.PROVIDER_TOKEN_URL,
            {
                method: 'PATCH',
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
        params.client_id = this._config.clientId;
        const credentials: Credentials = await this._config.request<Credentials>(
            ApiUrls.AUTH_SIGN_IN_WITH_PROVIDER_URL,
            {
                method: 'POST',
                body: params,
            },
        );
        await this._config.credentialsClient.setCredentials(credentials);
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
        params.client_id = this._config.clientId;
        return this._config.request<any>(ApiUrls.PROVIDER_BIND_URL, {
            method: 'POST',
            body: params,
            withCredentials: true,
        });
    }

    /**
     * Get the user profile.
     * @return {Promise<UserProfile>} A Promise<UserProfile> object.
     */
    public async getUserProfile(): Promise<UserProfile> {
        return this.getUserInfo();
    }

    /**
     * Get the user info.
     * @return {Promise<UserInfo>} A Promise<UserProfile> object.
     */
    public async getUserInfo(): Promise<UserInfo> {
        return this._config.request<UserInfo>(ApiUrls.USER_ME_URL, {
            method: 'GET',
            withCredentials: true,
        });
    }

    /**
     * hasLoginState check if has login state
     * @return {Promise<boolean>} A Promise<boolean> object.
     */
    public async hasLoginState(): Promise<boolean> {
        try {
            await this._config.credentialsClient.getAccessToken()
            return true
        } catch (error) {
            return false
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
        return this._config.request<Credentials>(
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
        params.client_id = this._config.clientId;
        return this._config.request<Credentials>(ApiUrls.AUTH_TOKEN_URL, {
            method: 'POST',
            body: params,
        });
    }

    /**
     * Get the provide list.
     * @return {Promise<UserProfileProvider>} A Promise<UserProfileProvider> object.
     */
    public async getProviders(): Promise<UserProfileProvider> {
        return this._config.request<UserProfileProvider>(ApiUrls.PROVIDER_LIST, {
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
        params.client_id = this._config.clientId;
        return this._config.request<any>(
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
        return this._config.request<any>(`${ApiUrls.CHECK_PWD_URL}`, {
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
        return this._config.request<any>(`${ApiUrls.BIND_PHONE_URL}`, {
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
        return this._config.request<any>(`${ApiUrls.AUTH_SET_PASSWORD}`, {
            method: 'PATCH',
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
        params.client_id = this._config.clientId;
        params.target = 'CUR_USER';
        return this._config.request<GetVerificationResponse>(
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
     * change binded provider.
     * @param {GetVerificationRequest} params A GetVerificationRequest Object.
     * @return {Promise<GetVerificationResponse>} A Promise<GetVerificationResponse> object.
     */
    public async changeBindedProvider(
        params: ChangeBindedProviderRequest,
    ): Promise<ChangeBindedProviderResponse> {
        params.client_id = this._config.clientId;
        return this._config.request<ChangeBindedProviderResponse>(
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
        return this._config.request<UserProfile>(ApiUrls.USER_PRIFILE_URL, {
            method: 'PATCH',
            body: params,
            withCredentials: true,
        });
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
        return this._config.request<UserProfile>(url, {
            method: 'GET',
            withCredentials: true,
        });
    }
}
