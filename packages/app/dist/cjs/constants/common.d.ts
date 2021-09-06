export declare function setSdkVersion(version: string): void;
export declare function getSdkVersion(): string;
export declare function setSdkName(name: string): void;
export declare function getSdkName(): string;
export declare const DATA_VERSION = "2020-01-10";
export declare function setEndPoint(url: string, protocol?: 'http' | 'https'): void;
export declare function setRegionLevelEndpoint(env: string, region: string, protocol?: 'http' | 'https'): void;
export declare function getEndPoint(): {
    BASE_URL: string;
    PROTOCOL: string;
};
export declare function getBaseEndPoint(): string;
export declare enum LOGINTYPE {
    NULL = "NULL",
    ANONYMOUS = "ANONYMOUS",
    WECHAT = "WECHAT",
    WECHAT_PUBLIC = "WECHAT-PUBLIC",
    WECHAT_OPEN = "WECHAT-OPEN",
    CUSTOM = "CUSTOM",
    EMAIL = "EMAIL",
    USERNAME = "USERNAME",
    PHONE = "PHONE"
}
export declare const OAUTH2_LOGINTYPE_PREFIX = "OAUTH2";
