export interface Storage {
    getItem: (key: string) => Promise<string | null>;
    removeItem: (key: string) => Promise<void>;
    setItem: (key: string, value: string) => Promise<void>;
}
export interface StorageOptions {
    env: string;
}
export declare class DefaultStorage implements Storage {
    private readonly _env;
    constructor(opts: StorageOptions);
    getItem(key: string): Promise<string | null>;
    removeItem(key: string): Promise<void>;
    setItem(key: string, value: string): Promise<void>;
}
