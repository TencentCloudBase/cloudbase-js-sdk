export declare function setSdkVersion(version: string): void;
export declare function getSdkVersion(): string;
export declare const SDK_NAME = "@cloudbase/js-sdk";
export declare const DATA_VERSION = "2020-01-10";
export declare const PROTOCOL = "https:";
export declare const BASE_URL = "//tcb-api.tencentcloudapi.com/web";
export declare const PROTOCOL_DEBUG = "http:";
export declare const BASE_URL_DEBUG = "//tcb-pre.tencentcloudapi.com/web";
export declare enum LOGINTYPE {
    ANONYMOUS = "ANONYMOUS",
    WECHAT = "WECHAT",
    CUSTOM = "CUSTOM",
    NULL = "NULL"
}
