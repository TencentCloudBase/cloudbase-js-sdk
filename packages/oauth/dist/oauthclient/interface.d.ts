import { Credentials, AuthClientRequestOptions } from './models';
export declare abstract class AuthClient {
    abstract setCredentials(credentials?: Credentials): void;
    abstract request: RequestFn;
    abstract getAccessToken(): Promise<string>;
}
export declare type RequestFn = <T>(url: string, options?: AuthClientRequestOptions) => Promise<T>;
