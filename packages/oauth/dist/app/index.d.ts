import { RequestFn as requestFn, RequestOptions as requestOptions } from "./request";
import { OpenURIWithCallback as openURIWithCallback } from "./openuri";
import { Storage as storage } from "./storage";
export interface Options {
    env: string;
    region?: string;
    apiOrigin?: string;
    clientId?: string;
    clientSecret?: string;
    request?: requestFn;
    storage?: storage;
    openURIWithCallback?: openURIWithCallback;
}
export declare function initializeApp(options: Options): App;
export interface App {
    readonly options: Options;
}
export declare class AppImpl implements App {
    private readonly _options;
    private readonly _container;
    constructor(options: Options);
    get options(): Options;
    get container(): Map<string, any>;
}
export declare type RequestFn = requestFn;
export declare type RequestOptions = requestOptions;
export declare type OpenURIWithCallback = openURIWithCallback;
export declare type Storage = storage;
