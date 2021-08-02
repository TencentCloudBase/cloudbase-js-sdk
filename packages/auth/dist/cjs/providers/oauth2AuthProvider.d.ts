import { AuthProvider } from './base';
import { ICloudbaseAuthConfig } from '@cloudbase/types/auth';
import { ICloudbaseCache } from '@cloudbase/types/cache';
import { ICloudbaseRequest } from '@cloudbase/types/request';
import { LoginState } from '..';
interface IPrividerCallbackInfo {
    href: string;
    state: string;
    token_type: string;
    code?: string;
    access_token?: string;
    id_token?: string;
    expires_in: number;
    scope: string;
    authuser: string;
    prompt: string;
}
export interface IOAuth2AuthProviderOptions {
    providerId?: string;
    clientId?: string;
    responseType?: string;
    scope?: string;
    redirectUri?: string;
    syncProfile?: boolean;
    forceDisableSignUp?: boolean;
}
export interface ISignInWithPopupOptions {
    popup?: {
        target?: string;
        features?: string;
    };
}
export declare class OAuth2AuthProvider extends AuthProvider {
    private providerId;
    private clientId;
    private responseType;
    private scope;
    private redirectUri;
    private syncProfile;
    private forceDisableSignUp;
    private popupWindowUrl;
    private popupWindowRef;
    constructor(config: ICloudbaseAuthConfig & {
        cache: ICloudbaseCache;
        request: ICloudbaseRequest;
        runtime: string;
    }, options?: IOAuth2AuthProviderOptions);
    signIn(): Promise<void>;
    signInWithPopup(options?: ISignInWithPopupOptions): Promise<void>;
    signInWithModal(elemId: string): Promise<void>;
    private jumpToProviderPage;
    private recvMessageFromPopup;
    continueSignIn(callbackInfo?: IPrividerCallbackInfo): Promise<LoginState>;
    private getAuthPrividerCallbackInfoFromUrl;
    private fetchProviderRedirectURI;
    private fetchProviderToken;
    private signInWithProvider;
    refreshUserInfo(): Promise<any>;
    private fetch;
}
export {};
