import { IGenericError } from '@cloudbase/types'
import { IResponseMessageErrorMsg } from '@cloudbase/types/realtime'

export class RealtimeErrorMessageError extends Error {
  isRealtimeErrorMessageError = true
  payload: IResponseMessageErrorMsg

  constructor(serverErrorMsg: IResponseMessageErrorMsg) {
    super(
      `Watch Error ${JSON.stringify(serverErrorMsg.msgData)} (requestid: ${
        serverErrorMsg.requestId
      })`
    )
    this.payload = serverErrorMsg
  }
}

export const isRealtimeErrorMessageError = (
  e: any
): e is RealtimeErrorMessageError => e?.isRealtimeErrorMessageError

export class TimeoutError extends Error
  implements IGenericError<'timeout', null> {
  type = 'timeout' as const
  payload = null
  generic = true
}

export const isTimeoutError = (e: any): e is TimeoutError =>
  e.type === 'timeout'

export class CancelledError extends Error
  implements IGenericError<'cancelled', null> {
  type = 'cancelled' as const
  payload = null
  generic = true
}

export const isCancelledError = (e: any): e is CancelledError =>
  e.type === 'cancelled'

export class CloudSDKError extends Error {
  public errCode = 'UNKNOWN_ERROR'
  public errMsg: string

  public requestID?: string

  constructor(options: IErrorConstructorOptions) {
    super(options.errMsg)

    Object.defineProperties(this, {
      message: {
        get() {
          return (
            `errCode: ${this.errCode} ${ERR_CODE[this.errCode] ||
              ''} | errMsg: ` + this.errMsg
          )
        },
        set(msg: string) {
          this.errMsg = msg
        }
      }
    })

    this.errCode = options.errCode || 'UNKNOWN_ERROR'
    this.errMsg = options.errMsg
  }

  get message() {
    return `errCode: ${this.errCode} | errMsg: ` + this.errMsg
  }

  set message(msg: string) {
    this.errMsg = msg
  }
}

interface IErrorConstructorOptions {
  errCode?: string
  errMsg: string
}

export const ERR_CODE: { [key: string]: string | number } = {
  // "-1": "",
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  SDK_DATABASE_REALTIME_LISTENER_INIT_WATCH_FAIL:
    'SDK_DATABASE_REALTIME_LISTENER_INIT_WATCH_FAIL',
  // "realtime listener init watch fail",
  SDK_DATABASE_REALTIME_LISTENER_RECONNECT_WATCH_FAIL:
    'SDK_DATABASE_REALTIME_LISTENER_RECONNECT_WATCH_FAIL',
  // "realtime listener reconnect watch fail",
  SDK_DATABASE_REALTIME_LISTENER_REBUILD_WATCH_FAIL:
    'SDK_DATABASE_REALTIME_LISTENER_REBUILD_WATCH_FAIL',
  // "realtime listener rebuild watch fail",
  SDK_DATABASE_REALTIME_LISTENER_CLOSE_WATCH_FAIL:
    'SDK_DATABASE_REALTIME_LISTENER_CLOSE_WATCH_FAIL',
  // "realtime listener rebuild watch fail",
  SDK_DATABASE_REALTIME_LISTENER_SERVER_ERROR_MSG:
    'SDK_DATABASE_REALTIME_LISTENER_SERVER_ERROR_MSG',
  // "realtime listener receive server error msg",
  SDK_DATABASE_REALTIME_LISTENER_RECEIVE_INVALID_SERVER_DATA:
    'SDK_DATABASE_REALTIME_LISTENER_RECEIVE_INVALID_SERVER_DATA',
  // "realtime listener receive invalid server data",
  SDK_DATABASE_REALTIME_LISTENER_WEBSOCKET_CONNECTION_ERROR:
    'SDK_DATABASE_REALTIME_LISTENER_WEBSOCKET_CONNECTION_ERROR',
  // "realtime listener websocket connection error",
  SDK_DATABASE_REALTIME_LISTENER_WEBSOCKET_CONNECTION_CLOSED:
    'SDK_DATABASE_REALTIME_LISTENER_WEBSOCKET_CONNECTION_CLOSED',
  // "realtime listener websocket connection closed",
  SDK_DATABASE_REALTIME_LISTENER_CHECK_LAST_FAIL:
    'SDK_DATABASE_REALTIME_LISTENER_CHECK_LAST_FAIL',
  // "realtime listener check last fail",
  SDK_DATABASE_REALTIME_LISTENER_UNEXPECTED_FATAL_ERROR:
    'SDK_DATABASE_REALTIME_LISTENER_UNEXPECTED_FATAL_ERROR'
  // "realtime listener unexpected fatal error"
}