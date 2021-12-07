import { RequestFn, RequestOptions, Storage } from "../app";
import { ErrorType } from './consts';
export interface Credentials {
    token_type?: string | null;
    access_token?: string | null;
    refresh_token?: string | null;
    scope?: string | null;
    expires_in?: number | null;
    expires_at?: Date | null;
    sub?: string | null;
}
export interface ResponseError {
    error: ErrorType;
    error_description?: string | null;
    error_uri?: string | null;
    details?: any | null;
}
export interface AuthClientRequestOptions extends RequestOptions {
    headers?: {
        'x-request-id'?: string;
        [key: string]: any;
    } | null;
    withCredentials?: boolean;
    withBasicAuth?: boolean;
    retry?: number;
    [key: string]: any;
}
export interface OAuth2ClientOptions {
    clientId: string;
    storage: Storage;
    request: RequestFn;
    clientSecret?: string;
    retry?: number;
    refreshTokenFunc?: (refreshToken?: string) => Promise<Credentials>;
    tokenInURL?: boolean;
    headers?: {
        [key: string]: string;
    };
}
