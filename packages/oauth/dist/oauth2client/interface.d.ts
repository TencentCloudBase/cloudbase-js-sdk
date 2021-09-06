import { Credentials, AuthClientRequestOptions } from './models';
export declare abstract class AuthClient {
    abstract setCredentials(credentials?: Credentials): void;
    abstract request: RequestFunction;
    abstract getAccessToken(): Promise<string>;
}
export declare type RequestFunction = <T>(url: string, options?: AuthClientRequestOptions) => Promise<T>;
export interface SimpleStorage {
    getItem(key: string): Promise<string | null>;
    removeItem(key: string): Promise<void>;
    setItem(key: string, value: string): Promise<void>;
    getItemSync(key: string): string | null;
    removeItemSync(key: string): void;
    setItemSync(key: string, value: string): void;
}
