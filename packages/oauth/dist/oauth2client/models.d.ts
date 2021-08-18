import { SimpleStorage } from './interface';
import { ErrorType } from './consts';
export interface Credentials {
    token_type?: string | null;
    access_token?: string | null;
    refresh_token?: string | null;
    expires_in?: number | null;
    expires_at?: Date | null;
    user_id?: string | null;
}
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
export declare type RequestFunction = <T>(url: string, options?: RequestOptions) => Promise<T>;
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
    retry?: number;
    baseRequest?: <T>(url: string, options?: RequestOptions) => Promise<T>;
    storage?: SimpleStorage;
    clientSecret?: string;
    refreshTokenFunc?: (refreshToken?: string) => Promise<Credentials>;
    tokenInURL?: boolean;
    headers?: {
        [key: string]: string;
    };
}
