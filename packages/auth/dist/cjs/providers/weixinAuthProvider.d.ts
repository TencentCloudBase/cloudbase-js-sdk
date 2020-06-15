import { AuthProvider } from "./base";
import { ICloudbaseAuthConfig } from "@cloudbase/types/auth";
import { ICloudbaseCache } from "@cloudbase/types/cache";
import { ICloudbaseRequest } from "@cloudbase/types/request";
import { LoginState } from '..';
export declare class WeixinAuthProvider extends AuthProvider {
    private readonly _scope;
    private readonly _state;
    private readonly _appid;
    private readonly _runtime;
    constructor(config: ICloudbaseAuthConfig & {
        cache: ICloudbaseCache;
        request: ICloudbaseRequest;
        runtime: string;
    }, appid: string, scope: string, state?: string);
    signIn(): Promise<void>;
    signInWithRedirect(): Promise<any>;
    getRedirectResult(): Promise<LoginState>;
    getLinkRedirectResult(options?: {
        withUnionId?: boolean;
    }): Promise<any>;
    private _redirect;
    private _signInWithCode;
    private _getRefreshTokenByWXCode;
}
