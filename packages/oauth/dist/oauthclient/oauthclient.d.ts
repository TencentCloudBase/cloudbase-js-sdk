import { ErrorType } from './consts';
import { AuthClient } from './interface';
import { Storage } from "../app";
import { Credentials, ResponseError, OAuth2ClientOptions, AuthClientRequestOptions } from './models';
export interface ToResponseErrorOptions {
    error?: ErrorType;
    error_description?: string | null;
    error_uri?: string | null;
    details?: any | null;
}
export declare const toResponseError: (error: ResponseError | Error, options?: ToResponseErrorOptions) => ResponseError;
export declare function generateRequestId(): string;
interface LocalCredentialsOptions {
    tokenSectionName: string;
    storage: Storage;
}
export declare class LocalCredentials {
    private _tokenSectionName;
    private _storage;
    private _credentials;
    private _singlePromise;
    constructor(options: LocalCredentialsOptions);
    setCredentials(credentials?: Credentials): Promise<void>;
    getCredentials(): Promise<Credentials | null>;
    private _getStorageCredentials;
}
export declare class OAuth2Client implements AuthClient {
    private static _defaultRetry;
    private static _minRetry;
    private static _maxRetry;
    private static _retryInterval;
    private _retry;
    private _baseRequest;
    private _basicAuth?;
    private _localCredentials;
    private _storage;
    private _deviceID?;
    private _tokenInURL?;
    private _refreshTokenFunc;
    private _headers?;
    private _singlePromise;
    constructor(options: OAuth2ClientOptions);
    setCredentials(credentials?: Credentials): Promise<void>;
    getAccessToken(): Promise<string>;
    request<T>(url: string, options?: AuthClientRequestOptions): Promise<T>;
    private _checkRetry;
    private _formatRetry;
    private _sleep;
    private _refreshToken;
    private _anonymousSignIn;
    private _defaultRefreshTokenFunc;
    private _getCredentials;
    private _getDeviceId;
    private _unAuthenticatedError;
}
export {};
