export interface RequestOptions {
    body?: any | null;
    headers?: any | null;
    method?: string;
    [key: string]: any;
}
export declare enum ErrorType {
    UNREACHABLE = "unreachable"
}
export declare type RequestFn = <T>(url: string, options?: RequestOptions) => Promise<T>;
export interface ResponseError {
    error: string;
    error_description?: string | null;
    error_uri?: string | null;
    details?: any | null;
}
export declare const defaultRequest: RequestFn;
