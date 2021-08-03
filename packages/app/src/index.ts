import { adapters, constants, utils, helpers } from '@cloudbase/utilities';
import { SDKAdapterInterface, CloudbaseAdapter, IRequestConfig } from '@cloudbase/adapter-interface';
import { ICloudbaseConfig, ICloudbaseUpgradedConfig, ICloudbase, ICloudbaseExtension, KV, ICloudbasePlatformInfo } from '@cloudbase/types';
import { ICloudbaseAuth } from '@cloudbase/types/auth';
import adapterForWxMp from 'cloudbase-adapter-wx_mp';
import { registerComponent, registerHook } from './libs/component';
import { Platform } from './libs/adapter';
import { ICloudbaseComponent, ICloudbaseHook } from '@cloudbase/types/component';
import { ICloudbaseCache } from '@cloudbase/types/cache';
import { initCache, getCacheByEnvId, getLocalCache } from './libs/cache';
import { ICloudbaseRequest } from '@cloudbase/types/request';
import { initRequest, getRequestByEnvId } from './libs/request';
import { getSdkName, setSdkVersion, setEndPoint, setRegionLevelEndpoint, setSdkName } from './constants/common';
import { eventBus } from "@cloudbase/auth"

const { useAdapters, useDefaultAdapter, RUNTIME } = adapters;
const { ERRORS, COMMUNITY_SITE_URL } = constants;
const { printWarn } = utils;
const { catchErrorsDecorator } = helpers;

/**
 * @constant 默认配置
 */
const DEFAULT_INIT_CONFIG: Partial<ICloudbaseConfig> = {
  timeout: 15000,
  persistence: 'local'
};

// timeout上限10分钟
const MAX_TIMEOUT = 1000 * 60 * 10;
// timeout下限100ms
const MIN_TIMEOUT = 100;

const extensionMap: KV<ICloudbaseExtension> = {};

class Cloudbase implements ICloudbase {
  public authInstance: ICloudbaseAuth;
  public requestClient: any;
  private _config: ICloudbaseConfig;

  constructor(config?: ICloudbaseConfig) {
    this._config = config ? config : this._config;
    this.authInstance = null;
  }

  get config() {
    return this._config;
  }

  get platform(): ICloudbasePlatformInfo {
    return Platform;
  }

  get cache(): ICloudbaseCache {
    return getCacheByEnvId(this._config.env);
  }

  get localCache(): ICloudbaseCache {
    return getLocalCache(this._config.env);
  }

  get request(): ICloudbaseRequest {
    return getRequestByEnvId(this._config.env);
  }

  get eventBus() {
    return eventBus
  }

  @catchErrorsDecorator({
    mode: 'sync',
    title: 'Cloudbase 初始化失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 cloudbase.init() 的语法或参数是否正确',
      '  2 - 如果是非浏览器环境，是否配置了安全应用来源（https://docs.cloudbase.net/api-reference/webv2/adapter.html#jie-ru-liu-cheng）',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public init(config: ICloudbaseConfig): Cloudbase {
    if (!config.env) {
      throw new Error(JSON.stringify({
        code: ERRORS.INVALID_PARAMS,
        msg: 'env must not be specified'
      }));
    }
    // 初始化时若未兼容平台，则使用默认adapter
    if (!Platform.adapter) {
      this._useDefaultAdapter();
    }

    this.requestClient = new Platform.adapter.reqClass({
      timeout: config.timeout || 5000,
      timeoutMsg: `[${getSdkName()}][REQUEST TIMEOUT] request had been abort since didn\'t finished within${config.timeout / 1000}s`
    } as IRequestConfig);
    if (Platform.runtime !== RUNTIME.WEB) {
      if (!config.appSecret) {
        throw new Error(JSON.stringify({
          code: ERRORS.INVALID_PARAMS,
          msg: 'invalid appSecret'
        }));
      }
      // adapter提供获取应用标识的接口
      const appSign = Platform.adapter.getAppSign ? Platform.adapter.getAppSign() : '';
      if (config.appSign && appSign && config.appSign !== appSign) {
        // 传入的appSign与sdk获取的不一致
        throw new Error(JSON.stringify({
          code: ERRORS.INVALID_PARAMS,
          msg: 'invalid appSign'
        }));
      }
      appSign && (config.appSign = appSign);
      if (!config.appSign) {
        throw new Error(JSON.stringify({
          code: ERRORS.INVALID_PARAMS,
          msg: 'invalid appSign'
        }));
      }
    }
    this._config = {
      ...DEFAULT_INIT_CONFIG,
      ...config
    };
    // 修正timeout取值
    this._config.timeout = this._formatTimeout(this._config.timeout);
    // 初始化cache和request
    const { env, persistence, debug, timeout, appSecret, appSign } = this._config;
    initCache({ env, persistence, debug, platformInfo: this.platform });
    initRequest({ env, region: config.region || '', timeout, appSecret, appSign });

    if (config.region) {
      setRegionLevelEndpoint(env, config.region || '')
    }
    const app = new Cloudbase(this._config);
    app.requestClient = this.requestClient;
    return app;
  }

  public updateConfig(config: ICloudbaseUpgradedConfig) {
    const { persistence, debug } = config;
    this._config.persistence = persistence;
    this._config.debug = debug;
    // persistence改动影响cache
    initCache({ env: this._config.env, persistence, debug, platformInfo: this.platform });
  }

  public registerExtension(ext: ICloudbaseExtension) {
    extensionMap[ext.name] = ext;
  }
  @catchErrorsDecorator({
    title: '调用扩展能力失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 invokeExtension() 的语法或参数是否正确',
      '  2 - 被调用的扩展能力是否已经安装并通过 registerExtension() 注册',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async invokeExtension(name: string, opts: any) {
    const ext = extensionMap[name];
    if (!ext) {
      throw new Error(JSON.stringify({
        code: ERRORS.INVALID_PARAMS,
        msg: `extension:${name} must be registered before invoke`
      }));
    }

    return await ext.invoke(opts, this);
  }

  public useAdapters(adapters: CloudbaseAdapter | CloudbaseAdapter[]) {
    const { adapter, runtime } = useAdapters(adapters) || {};
    adapter && (Platform.adapter = adapter as SDKAdapterInterface);
    runtime && (Platform.runtime = runtime as string);
  }

  public registerHook(hook: ICloudbaseHook) {
    registerHook(Cloudbase, hook)
  }

  public registerComponent(component: ICloudbaseComponent) {
    registerComponent(Cloudbase, component);
  }

  public registerVersion(version: string) {
    setSdkVersion(version);
  }

  public registerSdkName(name: string) {
    setSdkName(name);
  }

  public registerEndPoint(url: string, protocol?: 'http' | 'https') {
    setEndPoint(url, protocol)
  }

  private _useDefaultAdapter() {
    const { adapter, runtime } = useDefaultAdapter();
    Platform.adapter = adapter as SDKAdapterInterface;
    Platform.runtime = runtime as string;
  }

  private _formatTimeout(timeout: number) {
    switch (true) {
      case timeout > MAX_TIMEOUT:
        printWarn(ERRORS.INVALID_PARAMS, 'timeout is greater than maximum value[10min]');
        return MAX_TIMEOUT;
      case timeout < MIN_TIMEOUT:
        printWarn(ERRORS.INVALID_PARAMS, 'timeout is less than maximum value[100ms]');
        return MIN_TIMEOUT;
      default:
        return timeout;
    }
  }
}

export const cloudbase: ICloudbase = new Cloudbase();
cloudbase.useAdapters(adapterForWxMp);

export default cloudbase;