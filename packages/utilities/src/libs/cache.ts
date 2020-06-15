import { StorageInterface, AbstractStorage, SDKAdapterInterface } from '@cloudbase/adapter-interface';
import { ICloudbaseCache,ICacheConfig } from '@cloudbase/types/cache';
import { KV, Persistence, ICloudbasePlatformInfo } from '@cloudbase/types';
import { isUndefined,isNull, printWarn } from './util';
import { ERRORS } from '../constants';

/**
 * persitence=none时登录态保存在内存中
 */
class TcbCacheObject extends AbstractStorage {
  private readonly _root:any;
  constructor(root:any) {
    super();
    this._root = root;
    if (!root['tcbCacheObject']) {
      root['tcbCacheObject'] = {};
    }
  }
  public setItem(key: string, value: any) {
    this._root['tcbCacheObject'][key] = value;
  }
  public getItem(key: string) {
    return this._root['tcbCacheObject'][key];
  }
  public removeItem(key: string) {
    delete this._root['tcbCacheObject'][key];
  }
  public clear() {
    delete this._root['tcbCacheObject'];
  }
}
/**
 * 工厂函数
 */
function createStorage(persistence: Persistence, adapter: SDKAdapterInterface): StorageInterface {
  switch (persistence) {
    case 'local':
      if(!adapter.localStorage){
        printWarn(ERRORS.INVALID_PARAMS,'localStorage is not supported on current platform');
        // 不支持localstorage的平台降级为none
        return new TcbCacheObject(adapter.root);
      }
      return adapter.localStorage
    case 'none':
      return new TcbCacheObject(adapter.root);
    default:
      if(!adapter.sessionStorage){
        printWarn(ERRORS.INVALID_PARAMS,'sessionStorage is not supported on current platform');
        // 不支持localstorage的平台降级为none
        return new TcbCacheObject(adapter.root);
      }
      return adapter.sessionStorage;
  }
}

export class CloudbaseCache implements ICloudbaseCache{
  public keys: KV<string> = {};

  private _persistence: Persistence;
  private _platformInfo: ICloudbasePlatformInfo;
  private _storage: StorageInterface;
  // 始终存储在localstorage中的key集合
  private _alwaysLocalKeys: string[];

  constructor(config: ICacheConfig) {
    const { persistence, platformInfo={},keys={},alwaysLocalKeys=[]} = config;
    this._platformInfo = platformInfo;
    this._alwaysLocalKeys = alwaysLocalKeys;
    if (!this._storage) {
      this._persistence = platformInfo.adapter.primaryStorage || persistence;
      this._storage = createStorage(this._persistence, platformInfo.adapter);
      this.keys = keys;
    }
  }
  /**
   * @getter storage模式-同步/异步
   */
  get mode(){
    return this._storage.mode || 'sync'
  }
  get persistence():Persistence{
    return this._persistence;
  }
  /**
   * 在不同persistence之间迁移数据
   * @param persistence 
   */
  public updatePersistence(persistence: Persistence) {
    if(this.mode === 'async'){
      printWarn(ERRORS.INVALID_OPERATION,'current platform\'s storage is asynchronous, please use updatePersistenceAsync insteed');
      return;
    }
    if (persistence === this._persistence) {
      return;
    }
    const isCurrentLocal = this._persistence === 'local';
    this._persistence = persistence;
    const storage = createStorage(persistence, this._platformInfo.adapter);
    // 切换persistence重新创建storage对象
    for (const key in this.keys) {
      const name = this.keys[key];
      // 如果当前为local并且key被设定为始终存储在localstorage中，则不迁移
      if (isCurrentLocal && this._alwaysLocalKeys.includes(key)) {
        continue;
      }
      const val = this._storage.getItem(name);
      if (!isUndefined(val) && !isNull(val)) {
        storage.setItem(name, val);
        this._storage.removeItem(name);
      }
    }
    this._storage = storage;
  }
  public async updatePersistenceAsync(persistence: Persistence) {
    if (persistence === this._persistence) {
      return;
    }
    const isCurrentLocal = this._persistence === 'local';
    this._persistence = persistence;
    const storage = createStorage(persistence, this._platformInfo.adapter);
    // 切换persistence重新创建storage对象
    for (const key in this.keys) {
      const name = this.keys[key];
      // 如果当前为local并且key被设定为始终存储在localstorage中，则不迁移
      if (isCurrentLocal && this._alwaysLocalKeys.includes(key)) {
        continue;
      }
      const val = await this._storage.getItem(name);
      if (!isUndefined(val) && !isNull(val)) {
        storage.setItem(name, val);
        await this._storage.removeItem(name);
      }
    }
    this._storage = storage;
  }
  public setStore(key: string, value: any, version?: any) {
    if(this.mode === 'async'){
      printWarn(ERRORS.INVALID_OPERATION,'current platform\'s storage is asynchronous, please use setStoreAsync insteed');
      return;
    }
    if (!this._storage) {
      return;
    }

    try {
      const val = {
        version: version || 'localCachev1',
        content: value
      };
      this._storage.setItem(key, JSON.stringify(val));
    } catch (e) {
      return;
    }

    return;
  }
  public async setStoreAsync(key: string, value: any, version?: any) {
    if (!this._storage) {
      return;
    }

    try {
      const val = {
        version: version || 'localCachev1',
        content: value
      };
      await this._storage.setItem(key, JSON.stringify(val));
    } catch (e) {
      return;
    }

    return;
  }
  public getStore(key: string, version?: string) {
    if(this.mode === 'async'){
      printWarn(ERRORS.INVALID_OPERATION,'current platform\'s storage is asynchronous, please use getStoreAsync insteed');
      return;
    }
    try {
      //测试用例使用
      if (process?.env?.tcb_token) {
        return process.env.tcb_token;
      }

      if (!this._storage) {
        return '';
      }
    } catch (e) {
      return '';
    }

    version = version || 'localCachev1';

    const content = this._storage.getItem(key);
    if (!content) {
      return '';
    }

    if (content.indexOf(version) >= 0) {
      const d = JSON.parse(content);
      return d.content;
    } else {
      return '';
    }
  }
  public async getStoreAsync(key: string, version?: string) {
    try {
      //测试用例使用
      if (process?.env?.tcb_token) {
        return process.env.tcb_token;
      }

      if (!this._storage) {
        return '';
      }
    } catch (e) {
      return '';
    }

    version = version || 'localCachev1';

    const content = await this._storage.getItem(key);
    if (!content) {
      return '';
    }

    if (content.indexOf(version) >= 0) {
      const d = JSON.parse(content);
      return d.content;
    } else {
      return '';
    }
  }
  public removeStore(key:string) {
    if(this.mode === 'async'){
      printWarn(ERRORS.INVALID_OPERATION,'current platform\'s storage is asynchronous, please use removeStoreAsync insteed');
      return;
    }
    this._storage.removeItem(key);
  }
  public async removeStoreAsync(key:string) {
    await this._storage.removeItem(key);
  }
}
