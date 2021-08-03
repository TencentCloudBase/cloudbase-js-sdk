import { isString, isInstanceOf } from './util';
import { Listeners, ICloudbaseEventEmitter } from '@cloudbase/types/events';


/**
 * @private
 * @function _addEventListener - 添加监听
 * @param {string} name - event名称
 * @param {Function} listener - 响应函数
 * @param {Listeners} listeners - 已存响应函数集合
 */
function _addEventListener(name: string, listener: Function, listeners: Listeners) {
  listeners[name] = listeners[name] || [];
  listeners[name].push(listener);
}
/**
 * @private
 * @function _removeEventListener - 移除监听
 * @param {string} name - event名称
 * @param {Function} listener - 响应函数
 * @param {Listeners} listeners - 已存响应函数集合
 */
function _removeEventListener(name: string, listener: Function, listeners: Listeners) {
  if (listeners?.[name]) {
    const index = listeners[name].indexOf(listener);
    if (index !== -1) {
      listeners[name].splice(index, 1);
    }
  }
}
interface IEvent {
  name: string;
  target: any;
  data: any;
}
/**
 * 自定义事件
 * @class CloudbaseEvent
 * @param {string} name - 类型
 * @param {any} data - 数据
 */
export class CloudbaseEvent implements IEvent {
  public readonly name: string;
  public target: any;
  public data: any;

  constructor(name: string, data: any) {
    this.data = data || null;
    this.name = name;
  }
}
/**
 * 自定义错误事件
 * @class IErrorEvent
 * @extends CloudbaseEvent
 * @param {Error} error - 错误信息对象
 * @param {any} data  - 数据
 */
export class IErrorEvent extends CloudbaseEvent {
  public readonly error: Error;
  constructor(error: Error, data?: any) {
    super('error', { error, data });
    this.error = error;
  }
}

/**
 * @class CloudbaseEventEmitter
 */
export class CloudbaseEventEmitter implements ICloudbaseEventEmitter {
  /**
   * @private
   * @readonly
   * @property {Listeners} _listeners - 响应函数集合
   * @default `{}`
   */
  private readonly _listeners: Listeners = {};

  /**
   * @public
   * @method on - 添加监听
   * @param {string} name - event名称
   * @param {Function} listener - 响应函数
   * @return `this`
   */
  public on(name: string, listener: Function): this {
    _addEventListener(name, listener, this._listeners);
    return this;
  }
  /**
   * @public
   * @method off - 移除监听
   * @param {string} name - event名称
   * @param {Function} listener - 响应函数
   * @return `this`
   */
  public off(name: string, listener: Function): this {
    _removeEventListener(name, listener, this._listeners);
    return this;
  }
  /**
   * @public
   * @method fire - 触发事件
   * @param {string|CloudbaseEvent} event - event
   * @return `this`
   */
  public fire(event: string | CloudbaseEvent, data?: any): this {
    // 打印错误信息
    if (isInstanceOf(event, IErrorEvent)) {
      console.error((event as IErrorEvent).error);
      return this;
    }

    const ev: CloudbaseEvent = isString(event) ? new CloudbaseEvent(event as string, data || {}) : event as CloudbaseEvent;

    const name = ev.name;

    if (this._listens(name)) {
      ev.target = this;

      const handlers = this._listeners[name] ? [...this._listeners[name]] : [];
      for (const fn of handlers) {
        fn.call(this, ev);
      }
    }

    return this;
  }

  /**
   * @private
   * @method _listens - 判断是否监听了name事件
   * @param {string} name - event名称
   * @return `boolean`
   */
  private _listens(name: string): boolean {
    return this._listeners[name] && this._listeners[name].length > 0;
  }
}



const eventEmitter = new CloudbaseEventEmitter();

export function addEventListener(event: string, callback: Function) {
  eventEmitter.on(event, callback);
}

export function activateEvent(event: string, data: any = {}) {
  eventEmitter.fire(event, data);
}

export function removeEventListener(event: string, callback: Function) {
  eventEmitter.off(event, callback);
}