import { Credentials, AuthClientRequestOptions } from './models';
export declare abstract class AuthClient {
    abstract setCredentials(credentials?: Credentials): void;
    abstract request<T>(url: string, options?: AuthClientRequestOptions): Promise<T>;
    abstract getAccessToken(): Promise<string>;
}
export interface SimpleStorage {
    getItem(key: string): Promise<string | null>;
    removeItem(key: string): Promise<void>;
    setItem(key: string, value: string): Promise<void>;
}
