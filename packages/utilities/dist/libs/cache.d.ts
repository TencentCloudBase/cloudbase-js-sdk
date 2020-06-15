import { ICloudbaseCache, ICacheConfig } from '@cloudbase/types/cache';
import { KV, Persistence } from '@cloudbase/types';
export declare class CloudbaseCache implements ICloudbaseCache {
    keys: KV<string>;
    private _persistence;
    private _platformInfo;
    private _storage;
    private _alwaysLocalKeys;
    constructor(config: ICacheConfig);
    get mode(): "async" | "sync";
    get persistence(): Persistence;
    updatePersistence(persistence: Persistence): void;
    updatePersistenceAsync(persistence: Persistence): Promise<void>;
    setStore(key: string, value: any, version?: any): void;
    setStoreAsync(key: string, value: any, version?: any): Promise<void>;
    getStore(key: string, version?: string): any;
    getStoreAsync(key: string, version?: string): Promise<any>;
    removeStore(key: string): void;
    removeStoreAsync(key: string): Promise<void>;
}
