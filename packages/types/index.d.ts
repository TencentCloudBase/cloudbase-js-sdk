import { CloudbaseAdapter, SDKAdapterInterface } from '@cloudbase/adapter-interface';
import { ICloudbaseComponent, ICloudbaseHook } from "./component";
import { ICloudbaseRequest } from "./request";
import { ICloudbaseCache } from "./cache";
import { ICloudbaseAuth } from './auth'

export type Persistence = 'local' | 'session' | 'none';

export interface KV<T> {
  [key: string]: T;
}

export interface ICloudbaseAppSecret {
  appAccessKeyId: string;
  appAccessKey: string;
}

export interface ICloudbaseConfig {
  env: string;
  region?: string;
  timeout?: number;
  persistence?: Persistence;
  appSecret?: ICloudbaseAppSecret;
  oauthClient?: any
  appSign?: string;
  debug?: boolean;
  _fromApp?: ICloudbase;
  clientId?: string
  oauthInstance?: any;
}
// 可更新的配置字段
export type ICloudbaseUpgradedConfig = Pick<ICloudbaseConfig, 'persistence' | 'region' | 'debug'>;

export interface ICloudbaseExtension {
  name: string;
  invoke: (opts: any, app: ICloudbase) => Promise<any>;
}

export interface ICloudbase {
  config: ICloudbaseConfig;
  platform: ICloudbasePlatformInfo;
  cache: ICloudbaseCache;
  request: ICloudbaseRequest;
  oauthClient: any;
  localCache: ICloudbaseCache;
  authInstance?: ICloudbaseAuth;
  oauthInstance?: any;
  init: (config: ICloudbaseConfig) => ICloudbase;
  updateConfig: (config: ICloudbaseUpgradedConfig) => void;
  registerExtension: (ext: ICloudbaseExtension) => void;
  invokeExtension: (name: string, opts: any) => Promise<any>;
  useAdapters: (adapters: CloudbaseAdapter | CloudbaseAdapter[]) => void;
  registerComponent: (component: ICloudbaseComponent) => void;
  registerHook: (hook: ICloudbaseHook) => void;
  registerVersion: (version: string) => void;
  fire?: (...args: any[]) => void;
}

export interface ICloudbasePlatformInfo {
  adapter?: SDKAdapterInterface;
  runtime?: string;
}

export interface IGenericError<T extends string, P = any> extends Error {
  type: T
  payload: P
  generic: boolean
}