export declare class SinglePromise {
    run<T>(key: string, fn: () => Promise<T>): Promise<T>;
    private _runIdlePromise;
    private _fnPromiseMap;
}
