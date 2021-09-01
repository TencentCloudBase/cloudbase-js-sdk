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
  abstract request: RequestFunction;

  /**
   * get the current accessToken from AuthClient, you can use this to detect login status
   * error:
   *    -  unauthenticated: has no validate access token
   */
  abstract getAccessToken(): Promise<string>;
}

export type RequestFunction = <T>(url: string,options?: AuthClientRequestOptions) => Promise<T>;

/** An interface of the Simple  Web Storage API  */
export interface SimpleStorage {
  /**
   * value = storage[key]
   */
  getItem(key: string): Promise<string | null>;
  /**
   * delete storage[key]
   */
  removeItem(key: string): Promise<void>;
  /**
   * storage[key] = value
   */
  setItem(key: string, value: string): Promise<void>;
}
