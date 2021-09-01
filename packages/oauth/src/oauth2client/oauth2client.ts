import {ErrorType} from './consts';

import {AuthClient, SimpleStorage} from './interface';

import {
    Credentials,
    ResponseError,
    RequestOptions,
    RequestFunction,
    OAuth2ClientOptions,
    AuthClientRequestOptions,
} from './models';

import {uuidv4} from '../utils/uuid';

import {SinglePromise} from '../utils/function/single-promise';

const RequestIdHeaderName = 'x-request-id';
const DeviceIdHeaderName = 'x-device-id';
const DeviceIdSectionName = 'device_id';

export interface ToResponseErrorOptions {
    error?: ErrorType;
    error_description?: string | null;
    error_uri?: string | null;
    details?: any | null;
}

export const defaultRequest: RequestFunction = async <T>(
    url: string,
    options?: RequestOptions,
): Promise<T> => {
    let result: T | null = null;
    let responseError: ResponseError | null = null;
    try {
        // Objects must be copied to prevent modification of data such as body.
        const copyOptions = Object.assign({}, options);
        if (!copyOptions.method) {
            copyOptions.method = 'GET';
        }
        if (copyOptions.body && typeof copyOptions.body !== 'string') {
            copyOptions.body = JSON.stringify(copyOptions.body);
        }
        const responseResult: Response = await fetch(url, copyOptions);
        const jsonResponse = await responseResult.json();
        if (jsonResponse && jsonResponse.error) {
            responseError = jsonResponse as ResponseError;
            responseError.error_uri = new URL(url).pathname;
        } else {
            result = jsonResponse as T;
        }
    } catch (error) {
        responseError = {
            error: ErrorType.UNREACHABLE,
            error_description: error.message,
            error_uri: new URL(url).pathname,
        };
    }
    if (responseError) {
        throw responseError;
    } else {
        return result;
    }
};

export const toResponseError = (
    error: ResponseError | Error,
    options?: ToResponseErrorOptions,
): ResponseError => {
    let responseError: ResponseError;
    const formatOptions: ToResponseErrorOptions = options || {};
    if (error instanceof Error) {
        responseError = {
            error: formatOptions.error || ErrorType.LOCAL,
            error_description: formatOptions.error_description || error.message,
            error_uri: formatOptions.error_uri,
            details: formatOptions.details || error.stack,
        };
    } else {
        const formatError: ToResponseErrorOptions = error || {};
        responseError = {
            error: formatOptions.error || formatError.error || ErrorType.LOCAL,
            error_description:
                formatOptions.error_description || formatError.error_description,
            error_uri: formatOptions.error_uri || formatError.error_uri,
            details: formatOptions.details || formatError.details,
        };
    }
    return responseError;
};

/**
 * Generate request id.
 * @return {string}
 */
export function generateRequestId(): string {
    return uuidv4();
}


/**
 * Default Storage.
 */
class DefaultStorage implements SimpleStorage {
    /**
     * Get item.
     * @param {string} key
     */
    async getItem(key: string): Promise<string | null> {
        return window.localStorage.getItem(key);
    }

    /**
     * Remove item.
     * @param {string} key
     */
    async removeItem(key: string): Promise<void> {
        window.localStorage.removeItem(key);
    }

    /**
     * Set item.
     * @param {string} key
     * @param {string} value
     */
    async setItem(key: string, value: string): Promise<void> {
        window.localStorage.setItem(key, value);
    }
}

export const defaultStorage = new DefaultStorage();

interface LocalCredentialsOptions {
    tokenSectionName: string;
    storage: SimpleStorage;
}

/**
 * Check if credentials is expired.
 * @param {Credentials} credentials
 * @return {boolean}
 */
function isCredentialsExpired(credentials: Credentials): boolean {
    let isExpired = true;
    if (credentials && credentials.expires_at && credentials.access_token) {
        isExpired = credentials.expires_at < new Date();
    }
    return isExpired;
}

/**
 * Local credentials.
 * Local credentials, with memory cache and storage cache.
 * If the memory cache expires, the storage cache is automatically loaded.
 */
export class LocalCredentials {
    private _tokenSectionName: string;

    private _storage: SimpleStorage;

    private _credentials: Credentials | null = null;

    private _singlePromise: SinglePromise = new SinglePromise();

    /**
     * constructor
     * @param {LocalCredentialsOptions} options
     */
    constructor(options: LocalCredentialsOptions) {
        this._tokenSectionName = options.tokenSectionName;
        this._storage = options.storage;
    }

    /**
     * setCredentials Provides an alternative fetch api request implementation with auth credentials
     * @param {Credentials} credentials
     */
    public async setCredentials(credentials?: Credentials): Promise<void> {
        if (credentials && credentials.expires_in) {
            credentials.expires_at = new Date(
                Date.now() + (credentials.expires_in - 30) * 1000,
            );
            if (this._storage) {
                const tokenStr: string = JSON.stringify(credentials);
                await this._storage.setItem(this._tokenSectionName, tokenStr);
            }
            this._credentials = credentials;
        } else {
            if (this._storage) {
                await this._storage.removeItem(this._tokenSectionName);
            }
            this._credentials = null;
        }
    }

    /**
     * Get credentials.
     * @return {Promise<Credentials | null>}
     */
    public async getCredentials(): Promise<Credentials | null> {
        return this._singlePromise.run('getCredentials', async () => {
            if (isCredentialsExpired(this._credentials)) {
                this._credentials = await this._getStorageCredentials();
            }
            return this._credentials;
        });
    }

    /**
     * Get storage credentials.
     */
    private async _getStorageCredentials(): Promise<Credentials | null> {
        return this._singlePromise.run('_getStorageCredentials', async () => {
            let credentials: Credentials = null;
            const tokenStr: string = await this._storage.getItem(
                this._tokenSectionName,
            );
            if (tokenStr !== undefined && tokenStr !== null) {
                try {
                    credentials = JSON.parse(tokenStr);
                    if (credentials && credentials.expires_at) {
                        credentials.expires_at = new Date(credentials.expires_at);
                    }
                } catch (error) {
                    await this._storage.removeItem(this._tokenSectionName);
                    credentials = null;
                }
            }
            return credentials;
        });
    }
}

/**
 * OAuth2Client
 */
export class OAuth2Client implements AuthClient {
    private static _defaultRetry = 2;
    private static _minRetry = 0;
    private static _maxRetry = 5;
    private static _retryInterval = 1000;

    private _apiOrigin: string;
    private _clientId: string;
    private _retry: number;
    private _clientSecret?: string;
    private _baseRequest: <T>(
        url: string,
        options?: RequestOptions,
    ) => Promise<T>;
    private _localCredentials: LocalCredentials;
    private _storage: SimpleStorage;
    private _deviceID?: string;
    private _tokenInURL?: boolean;
    private _refreshTokenFunc: (refreshToken?: string) => Promise<Credentials>;
    private _headers?: { [key: string]: string };
    private _singlePromise: SinglePromise = new SinglePromise();

    /**
     * constructor
     * @param {OAuth2ClientOptions} options
     */
    constructor(options: OAuth2ClientOptions) {
        this._apiOrigin = options.apiOrigin;
        this._clientId = options.clientId;
        this._retry = this._formatRetry(options.retry, OAuth2Client._defaultRetry);
        if (options.baseRequest != undefined) {
            this._baseRequest = options.baseRequest;
        } else {
            this._baseRequest = defaultRequest;
        }
        this._tokenInURL = options.tokenInURL;
        this._headers = options.headers;
        // @ts-ignore
        this._storage = options.storage || defaultStorage;
        this._localCredentials = new LocalCredentials({
            tokenSectionName: 'credentials_' + options.clientId,
            storage: this._storage,
        });
        this._clientSecret = options.clientSecret;
        this._refreshTokenFunc =
            options.refreshTokenFunc || this._defaultRefreshTokenFunc;
    }

    /**
     * setCredentials Provides an alternative fetch api request implementation with auth credentials
     * @param {Credentials} credentials
     * @return {Promise<void>}
     */
    public setCredentials(credentials?: Credentials): Promise<void> {
        return this._localCredentials.setCredentials(credentials);
    }

    /**
     * getAccessToken return a validate access token
     */
    public async getAccessToken(): Promise<string> {
        const credentials: Credentials = await this._getCredentials();
        if (credentials && credentials.access_token) {
            return Promise.resolve(credentials.access_token);
        }
        return Promise.reject({error: ErrorType.UNAUTHENTICATED} as ResponseError);
    }

    /**
     * request http like simple fetch api, exp:request('/v1/user/me', {withCredentials:true})
     * @param {string} url
     * @param {AuthClientRequestOptions} options
     */
    public async request<T>(
        url: string,
        options?: AuthClientRequestOptions,
    ): Promise<T> {
        if (!options) {
            options = {};
        }
        const retry: number = this._formatRetry(options.retry, this._retry);
        options.headers = options.headers || {};
        if (this._headers) {
            options.headers = {
                ...this._headers,
                ...options.headers,
            };
        }
        if (!options.headers[RequestIdHeaderName]) {
            options.headers[RequestIdHeaderName] = generateRequestId();
        }
        if (!options.headers[DeviceIdHeaderName]) {
             const deviceId = await this._getDeviceId();
             options.headers[DeviceIdHeaderName] = deviceId;
        }
        if (options && options.withCredentials) {
            const credentials = await this._getCredentials();
            if (credentials) {
                if (this._tokenInURL) {
                    if (url.indexOf('?') < 0) {
                        url += '?';
                    }
                    url += 'access_token=' + credentials.access_token;
                } else {
                    options.headers['Authorization'] =
                        credentials.token_type + ' ' + credentials.access_token;
                }
            }
        } else {
            if (this._clientId && url.indexOf('client_id') < 0) {
                url += url.indexOf('?') < 0 ? '?' : '&';
                url += 'client_id=' + this._clientId;
            }
        }
        if (url.startsWith('/')) {
            url = this._apiOrigin + url;
        }
        let response: T | null = null;
        const maxRequestTimes: number = retry + 1;
        for (
            let requestTime = 0;
            requestTime < maxRequestTimes;
            requestTime++
        ) {
            try {
                response = await this._baseRequest<T>(url, options);
                break;
            } catch (responseError) {
                if (
                    requestTime === retry ||
                    !responseError ||
                    responseError.error !== 'unreachable'
                ) {
                    return Promise.reject(responseError);
                }
            }
            await this._sleep(OAuth2Client._retryInterval);
        }
        return response;
    }

    /**
     * Check retry value.
     * @param {number} retry
     * @return {number}
     */
    private _checkRetry(retry: number): number {
        let responseError: ResponseError | null = null;
        if (
            typeof retry !== 'number' ||
            retry < OAuth2Client._minRetry ||
            retry > OAuth2Client._maxRetry
        ) {
            responseError = {
                error: ErrorType.UNREACHABLE,
                error_description: 'wrong options param: retry',
            };
        }
        if (responseError) {
            throw responseError;
        }
        return retry;
    }

    /**
     * Format retry value.
     * @param {number} retry
     * @param {number} defaultVale
     * @return {number}
     */
    private _formatRetry(retry: number, defaultVale: number): number {
        if (typeof retry === 'undefined') {
            return defaultVale;
        } else {
            return this._checkRetry(retry);
        }
    }

    /**
     * Sleep.
     * @param {number} ms
     * @return {Promise<void>}
     */
    private async _sleep(ms: number): Promise<void> {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }

    /**
     * Refresh expired token.
     * @param {Credentials} credentials
     * @return {Promise<Credentials>}
     */
    private async _refreshToken(credentials: Credentials): Promise<Credentials> {
        return this._singlePromise.run('_refreshToken', async () => {
            if (!credentials || !credentials.refresh_token) {
                return this._unAuthenticatedError('no refresh token found in credentials');
            }
            try {
                const newCredentials: Credentials = await this._refreshTokenFunc(
                    credentials.refresh_token,
                );
                await this._localCredentials.setCredentials(newCredentials);
                return newCredentials
            } catch (error) {
                if (error.error === ErrorType.INVALID_GRANT) {
                    await this._localCredentials.setCredentials(null);
                    return this._unAuthenticatedError(error.error_description);
                }
                return Promise.reject(error);
            }
        });
    }

    /**
     * anonymous signIn
     * @param {Credentials} credentials
     * @return {Promise<Credentials>}
     */
    private async _anonymousSignIn(credentials: Credentials): Promise<Credentials> {
        return this._singlePromise.run('_anonymous', async () => {
            if (!credentials || credentials.scope !== 'anonymous') {
                return this._unAuthenticatedError('no anonymous in credentials');
            }
            try {
                const newCredentials: Credentials = await this.request('/auth/v1/signin/anonymously', {
                    method: 'POST',
                    body: {
                        client_id: this._clientId,
                        client_secret: this._clientSecret,
                    },
                });
                await this._localCredentials.setCredentials(newCredentials);
                return newCredentials
            } catch (error) {
                if (error.error === ErrorType.INVALID_GRANT) {
                    await this._localCredentials.setCredentials(null);
                    return this._unAuthenticatedError(error.error_description);
                }
                return Promise.reject(error);
            }
        });
    }

    /**
     * Default refresh token function.
     * @param {string} refreshToken
     * @return {Promise<Credentials>}
     */
    private _defaultRefreshTokenFunc(
        refreshToken?: string,
    ): Promise<Credentials> {
        if (refreshToken === undefined || refreshToken === '') {
            return this._unAuthenticatedError('refresh token not found');
        }
        return this.request('/auth/v1/token', {
            method: 'POST',
            body: {
                client_id: this._clientId,
                client_secret: this._clientSecret,
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            },
        });
    }

    /**
     * Get credentials.
     */
    private async _getCredentials(): Promise<Credentials | null> {
        let credentials: Credentials = await this._localCredentials.getCredentials();
        if (isCredentialsExpired(credentials)) {
            if (credentials && credentials.scope === 'anonymous') {
                credentials = await this. _anonymousSignIn(credentials)
            } else {
                credentials = await this._refreshToken(credentials);
            }
        }
        return credentials;
    }

    /**
     * Get deviceId
     */
    private async _getDeviceId(): Promise<string> {
        if (this._deviceID) {
            return this._deviceID;
        }
        let deviceId: string = await this._storage.getItem(
            DeviceIdSectionName,
        );
        if (!(typeof deviceId === 'string' &&
            deviceId.length >= 16 &&
            deviceId.length <= 48)) {
            deviceId = uuidv4();
            await this._storage.setItem(DeviceIdSectionName, deviceId);
        }
        this._deviceID = deviceId;
        return deviceId;
    }
    /**
     * Generate unAuthenticated error.
     * @param {string} err
     * @return {Promise<T>}
     */
    private _unAuthenticatedError<T>(err?: string): Promise<T> {
        return Promise.reject({
            error: ErrorType.UNAUTHENTICATED,
            error_description: err,
        } as ResponseError);
    }
}
