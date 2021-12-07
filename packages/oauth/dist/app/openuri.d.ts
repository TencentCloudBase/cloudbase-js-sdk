export declare type OpenURIWithCallback = (url: string, opts?: OpenURIOptions) => Promise<{
    [key: string]: string;
}>;
export interface OpenURIOptions {
    width: string;
    height: string;
}
export declare const defaultOpenURIWithCallback: OpenURIWithCallback;
