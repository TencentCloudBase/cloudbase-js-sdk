import { ICloudbaseConfig } from '@cloudbase/types';
import { ICloudbaseCache } from '@cloudbase/types/cache';
import { ICloudbaseRequest } from '@cloudbase/types/request';
import { ICloudbaseAuthConfig } from '@cloudbase/types/auth';
import { LoginState } from '..';
export declare abstract class AuthProvider {
    protected readonly _config: ICloudbaseConfig;
    protected readonly _cache: ICloudbaseCache;
    protected readonly _request: ICloudbaseRequest;
    constructor(config: ICloudbaseAuthConfig & {
        cache: ICloudbaseCache;
        request: ICloudbaseRequest;
    });
    protected checkLocalLoginState(): Promise<LoginState>;
    protected setRefreshToken(refreshToken: string): Promise<void>;
    protected setAccessToken(accessToken: string, accessTokenExpire: string): Promise<void>;
    protected refreshUserInfo(): Promise<any>;
    protected setLocalUserInfo(userInfo: any): Promise<void>;
    abstract signIn(...args: any[]): Promise<any>;
}
