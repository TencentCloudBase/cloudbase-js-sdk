import { KV } from '@cloudbase/types';
export declare function isArray(val: any): boolean;
export declare function isString(val: any): boolean;
export declare function isUndefined(val: any): boolean;
export declare function isPalinObject(val: any): boolean;
export declare function isNull(val: any): boolean;
export declare function isInstanceOf(instance: any, construct: any): boolean;
export declare function isFormData(val: any): boolean;
export declare function genSeqId(): string;
export declare function formatUrl(PROTOCOL: string, url: string, query?: KV<any>): string;
export declare function createSign(payload: KV<any>, secret: string): string;
export declare function toQueryString(query?: KV<any>): string;
export declare function getQuery(name: string, url?: string): string | false;
export declare const getHash: (name: string) => string;
export declare function removeParam(key: string, sourceURL: string): string;
export declare function createPromiseCallback(): any;
export declare function execCallback(fn: Function | null | undefined, err: any, data?: any): any;
export declare function printWarn(error: string, msg: string): void;
export declare function printError(error: string, msg: string): void;
export declare function printInfo(error: string, msg: string): void;
export declare function throwError(error: string, msg: string): void;
interface IPrintGroupLogOptions {
    title: string;
    subtitle: string | object;
    content: {
        type: 'info' | 'warn' | 'error';
        body: string | Error;
    }[];
    printTrace?: boolean;
    collapsed?: boolean;
}
export declare function printGroupLog(options: IPrintGroupLogOptions): void;
export declare const sleep: (ms?: number) => Promise<unknown>;
export declare function transformPhone(phoneNumber: string): string;
export {};
