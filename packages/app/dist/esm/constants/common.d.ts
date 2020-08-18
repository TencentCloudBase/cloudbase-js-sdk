export declare function setSdkVersion(version: string): void;
export declare function getSdkVersion(): string;
export declare function setSdkName(name: string): void;
export declare function getSdkName(): string;
export declare const DATA_VERSION = "2020-01-10";
export declare function setEndPoint(url: string, protocol?: 'http' | 'https'): void;
export declare function getEndPoint(): {
    BASE_URL: string;
    PROTOCOL: string;
};
export declare enum LOGINTYPE {
    ANONYMOUS = "ANONYMOUS",
    WECHAT = "WECHAT",
    CUSTOM = "CUSTOM",
    NULL = "NULL"
}
