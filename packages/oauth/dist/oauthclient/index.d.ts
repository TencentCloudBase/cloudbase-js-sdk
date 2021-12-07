import { App } from "../app";
import { Credentials as credentials, ResponseError as responseError } from './models';
import { AuthClient as authClient, RequestFn as requestFn } from "./interface";
export { ErrorType } from './consts';
export interface InitOptions {
    request?: RequestFn;
    retry?: number;
    refreshTokenFunc?: (refreshToken?: string) => Promise<Credentials>;
    tokenInURL?: boolean;
    headers?: {
        [key: string]: string;
    };
}
export declare function getOAuthClient(app: App): authClient;
export declare type Credentials = credentials;
export declare type AuthClient = authClient;
export declare type RequestFn = requestFn;
export declare type ResponseError = responseError;
