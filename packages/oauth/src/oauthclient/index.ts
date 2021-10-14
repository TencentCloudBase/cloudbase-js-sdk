import {App} from "../app";
import {_getComponent} from "../app/internal";
import {OAuth2Client} from "./oauthclient";
import {Credentials as credentials, ResponseError as responseError} from './models';
import {AuthClient as authClient, RequestFn as requestFn} from "./interface";
export {ErrorType} from './consts';

export interface InitOptions {
    request?: RequestFn;
    retry?: number;
    refreshTokenFunc?: (refreshToken?: string) => Promise<Credentials>;
    tokenInURL?: boolean;
    headers?: { [key: string]: string };
}

export function getOAuthClient(app: App, opts?: InitOptions): authClient {
    return _getComponent<authClient>(app, "oauthclient", (): authClient => {
        const appOpts = app.options
        const oauthOpts = {
            clientId: appOpts.clientId,
            clientSecret: appOpts.clientSecret,
            request: appOpts.request,
            storage: appOpts.storage,
        }
        return (new OAuth2Client(oauthOpts))
    });
}


export type Credentials = credentials
export type AuthClient = authClient
export type RequestFn = requestFn
export type ResponseError = responseError