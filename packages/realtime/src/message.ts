import {
  IResponseMessage,
  IResponseMessageInitEventMsg
} from '@cloudbase/types/realtime'

export function genRequestId(prefix = '') {
  return `${prefix ? `${prefix}_` : ''}${+new Date()}_${Math.random()}`
}

export function isInitEventMessage(
  msg: IResponseMessage
): msg is IResponseMessageInitEventMsg {
  return msg.msgType === 'INIT_EVENT'
}
