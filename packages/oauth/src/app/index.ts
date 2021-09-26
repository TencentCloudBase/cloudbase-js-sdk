import {defaultRequest, RequestFn as requestFn, RequestOptions as requestOptions} from "./request";
import {OpenURIWithCallback as openURIWithCallback, defaultOpenURIWithCallback} from "./openuri";
import {DefaultStorage, Storage as storage} from "./storage";

export interface Options {
    env: string,
    region?: string,
    apiOrigin?: string;
    clientId?: string;
    clientSecret?: string;

    // plugins can set platform functions
    request?: requestFn;
    storage?: storage;
    openURIWithCallback?: openURIWithCallback;
}

export function initializeApp(
    options: Options,
): App {
    return new AppImpl(options);
}

export interface App {
    readonly options: Options;
}

export class AppImpl implements App {
    private readonly _options: Options;
    private readonly _container = new Map<string, any>();

    constructor(options: Options) {
        if (!options.region) {
            options.region = 'ap-shanghai'
        }
        if (!options.apiOrigin) {
            options.apiOrigin = `https://${options.env}.${options.region}.tcb-api.tencentcloudapi.com`
        }
        let storageEnv = options.env
        if (!options.clientId) {
            options.clientId = ''
        } else {
            storageEnv = options.clientId
        }
        if (!options.storage) {
            options.storage = new DefaultStorage({env: storageEnv});
        }
        if (!options.openURIWithCallback) {
            options.openURIWithCallback = defaultOpenURIWithCallback;
        }
        let baseRequest = options.request
        if (!baseRequest) {
            baseRequest = defaultRequest
        }
        const apiOrigin = options.apiOrigin
        options.request = async <T>(
            url: string,
            options?: RequestOptions,
        ): Promise<T> => {
            if (url.startsWith('/')) {
                url = apiOrigin + url;
            }
            return baseRequest<T>(url, options)
        }
        this._options = options;
    }

    get options(): Options {
        return this._options;
    }

    get container(): Map<string, any> {
        return this._container;
    }
}


export type RequestFn = requestFn
export type RequestOptions = requestOptions
export type OpenURIWithCallback = openURIWithCallback
export type Storage = storage

