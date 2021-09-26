import {RequestFn, RequestOptions, Storage} from "../app";
import {ErrorType} from './consts';

// Credentials
export interface Credentials {
    token_type?: string | null;
    access_token?: string | null;
    refresh_token?: string | null;
    scope?: string | null;
    expires_in?: number | null;
    expires_at?: Date | null;
    sub?: string | null;
}

// An Error For all concern
export interface ResponseError {
    error: ErrorType;
    error_description?: string | null;
    error_uri?: string | null;
    details?: any | null;
}

// refer https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Authentication
export interface AuthClientRequestOptions extends RequestOptions {
    headers?: {
        'x-request-id'?: string;
        [key: string]: any;
    } | null;
    // Bearer https://datatracker.ietf.org/doc/html/rfc6750
    withCredentials?: boolean;
    // Basic https://datatracker.ietf.org/doc/html/rfc7617
    withBasicAuth?: boolean;
    retry?: number;

    [key: string]: any;
}

export interface OAuth2ClientOptions {
    clientId: string;  // Storage, default is localStorage, setItem(k, v), getItem(k),removeItem(k)
    storage: Storage;
    request: RequestFn;
    clientSecret?: string;
    // default value is 1,min value is 0, max value is 5
    retry?: number;
    refreshTokenFunc?: (refreshToken?: string) => Promise<Credentials>;
    // set the token in url query instead of header
    tokenInURL?: boolean;
    headers?: { [key: string]: string };
}
