import {SimpleStorage} from './interface';
import {ErrorType} from './consts';

/** Credentials **/
export interface Credentials {
    token_type?: string | null;
    access_token?: string | null;
    refresh_token?: string | null;
    scope?: string | null;
    expires_in?: number | null;
    expires_at?: Date | null;
    sub?: string | null;
}

/** An Error For all concern **/
export interface ResponseError {
    error: ErrorType;
    error_description?: string | null;
    error_uri?: string | null;
    details?: any | null;
}

export interface RequestOptions {
    body?: any | null;
    headers?: any | null;
    method?: string;

    [key: string]: any;
}

export type RequestFunction = <T>(
    url: string,
    options?: RequestOptions,
) => Promise<T>;

export interface AuthClientRequestOptions extends RequestOptions {
    headers?: {
        'x-request-id'?: string;
        [key: string]: any;
    } | null;
    withCredentials?: boolean;
    retry?: number;

    [key: string]: any;
}

export interface OAuth2ClientOptions {
    devMode?: boolean;
    apiOrigin: string;
    clientId: string;
    // default value is 1,min value is 0, max value is 5
    retry?: number;
    baseRequest?: <T>(url: string, options?: RequestOptions) => Promise<T>;
    // Storage, default is localStorage, setItem(k, v), getItem(k),removeItem(k)
    storage?: SimpleStorage;
    clientSecret?: string;
    refreshTokenFunc?: (refreshToken?: string) => Promise<Credentials>;
    // set the token in url query instead of header
    tokenInURL?: boolean;
    headers?: { [key: string]: string };
}
