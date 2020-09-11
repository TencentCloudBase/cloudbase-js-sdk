import { IGenericError } from '@cloudbase/types';
import { IResponseMessageErrorMsg } from '@cloudbase/types/realtime';
export declare class RealtimeErrorMessageError extends Error {
    isRealtimeErrorMessageError: boolean;
    payload: IResponseMessageErrorMsg;
    constructor(serverErrorMsg: IResponseMessageErrorMsg);
}
export declare const isRealtimeErrorMessageError: (e: any) => e is RealtimeErrorMessageError;
export declare class TimeoutError extends Error implements IGenericError<'timeout', null> {
    type: "timeout";
    payload: any;
    generic: boolean;
}
export declare const isTimeoutError: (e: any) => e is TimeoutError;
export declare class CancelledError extends Error implements IGenericError<'cancelled', null> {
    type: "cancelled";
    payload: any;
    generic: boolean;
}
export declare const isCancelledError: (e: any) => e is CancelledError;
export declare class CloudSDKError extends Error {
    errCode: string;
    errMsg: string;
    requestID?: string;
    constructor(options: IErrorConstructorOptions);
    get message(): string;
    set message(msg: string);
}
interface IErrorConstructorOptions {
    errCode?: string;
    errMsg: string;
}
export declare const ERR_CODE: {
    [key: string]: string | number;
};
export {};
