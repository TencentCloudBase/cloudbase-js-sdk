import {Credentials, AuthClientRequestOptions} from './models';

/**
 * the interface for the Oauth2Client
 */
export abstract class AuthClient {
    /**
     * Sets the auth credentials.
     */
    abstract setCredentials(credentials?: Credentials): void;

    /**
     * Provides an alternative fetch api request implementation with auth credentials
     * if options.withCredentials:true, the request will auto add Authorization: Bearer <AccessToken> in the request
     * error:
     *     - unreachable, the network error or response is not json
     *     - unauthenticated: has no validate access token
     */
    abstract request: RequestFn;

    /**
     * get the current accessToken from AuthClient, you can use this to detect login status
     * error:
     *    -  unauthenticated: has no validate access token
     */
    abstract getAccessToken(): Promise<string>;
}

export type RequestFn = <T>(url: string, options?: AuthClientRequestOptions) => Promise<T>;
