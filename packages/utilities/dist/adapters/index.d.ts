import { CloudbaseAdapter } from '@cloudbase/adapter-interface';
export declare enum RUNTIME {
    WEB = "web",
    WX_MP = "wx_mp"
}
export declare function useAdapters(adapters: CloudbaseAdapter | CloudbaseAdapter[]): {
    adapter: import("@cloudbase/adapter-interface").SDKAdapterInterface | import("@cloudbase/adapter-interface").NodeAdapterInterface;
    runtime: string;
};
export declare function useDefaultAdapter(): {
    adapter: import("@cloudbase/adapter-interface").SDKAdapterInterface;
    runtime: RUNTIME;
};
