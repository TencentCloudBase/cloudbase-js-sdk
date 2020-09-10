import { VirtualWebSocketClient } from './virtual-websocket-client';
import { IDatabaseServiceContext } from '@cloudbase/types/database';
import { IWatchOptions, DBRealtimeListener, IRequestMessage } from '@cloudbase/types/realtime';
import { CLOSE_EVENT_CODE } from './ws-event';
export interface IRealtimeWebSocketClientConstructorOptions {
    maxReconnect?: number;
    reconnectInterval?: number;
    context: IDatabaseServiceContext;
}
export interface ISignature {
    envId: string;
    secretVersion: number;
    signStr: string;
    wsUrl: string;
    expireTS: number;
}
export interface ILoginInfo {
    loggedIn: boolean;
    loggingInPromise?: Promise<ILoginResult>;
    loginStartTS?: number;
    loginResult?: ILoginResult;
}
export interface ILoginResult {
    envId: string;
}
export interface IWSSendOptions {
    msg: IRequestMessage;
    waitResponse?: boolean;
    skipOnMessage?: boolean;
    timeout?: number;
}
export interface IWSWatchOptions extends IWatchOptions {
    envId?: string;
    collectionName: string;
    query: string;
    limit?: number;
    orderBy?: Record<string, string>;
}
export declare class RealtimeWebSocketClient {
    private _virtualWSClient;
    private _queryIdClientMap;
    private _watchIdClientMap;
    private _maxReconnect;
    private _reconnectInterval;
    private _context;
    private _ws?;
    private _lastPingSendTS?;
    private _pingFailed;
    private _pongMissed;
    private _pingTimeoutId?;
    private _pongTimeoutId?;
    private _logins;
    private _wsInitPromise?;
    private _wsReadySubsribers;
    private _wsResponseWait;
    private _rttObserved;
    private _reconnectState;
    private _wsSign;
    constructor(options: IRealtimeWebSocketClientConstructorOptions);
    clearHeartbeat(): void;
    send: <T = any>(opts: IWSSendOptions) => Promise<T>;
    close(code: CLOSE_EVENT_CODE): void;
    closeAllClients: (error: any) => void;
    pauseClients: (clients?: Set<VirtualWebSocketClient>) => void;
    resumeClients: (clients?: Set<VirtualWebSocketClient>) => void;
    watch(options: IWSWatchOptions): DBRealtimeListener;
    private initWebSocketConnection;
    private initWebSocketEvent;
    private isWSConnected;
    private onceWSConnected;
    private webLogin;
    private getWsSign;
    private getWaitExpectedTimeoutLength;
    private heartbeat;
    private ping;
    private onWatchStart;
    private onWatchClose;
}
