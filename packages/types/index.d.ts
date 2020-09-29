import { CloudbaseAdapter, SDKAdapterInterface } from '@cloudbase/adapter-interface';
import { ICloudbaseComponent } from "./component";
import { ICloudbaseRequest } from "./request";
import { ICloudbaseCache } from "./cache";

export type Persistence = 'local' | 'session' | 'none';

export type KV<T> = {
  [key: string]: T;
};

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
  appSign?: string;
  debug?:boolean;
}
// 可更新的配置字段
export type ICloudbaseUpgradedConfig = Pick<ICloudbaseConfig, 'persistence'|'region'|'debug'>;

export interface ICloudbaseExtension {
  name: string;
  invoke(opts:any,app:ICloudbase):Promise<any>;
}

export interface ICloudbase{
  config:ICloudbaseConfig;
  platform:ICloudbasePlatformInfo;
  cache:ICloudbaseCache;
  request:ICloudbaseRequest;
  localCache:ICloudbaseCache;
  init(config: ICloudbaseConfig):ICloudbase;
  updateConfig(config: ICloudbaseUpgradedConfig):void;
  registerExtension(ext:ICloudbaseExtension):void;
  invokeExtension(name:string,opts:any):Promise<any>;
  useAdapters(adapters: CloudbaseAdapter|CloudbaseAdapter[]):void;
  registerComponent(component:ICloudbaseComponent):void;
  registerVersion(version:string):void;
  fire?(...args:any[]):void;
}

export interface ICloudbasePlatformInfo {
  adapter?: SDKAdapterInterface;
  runtime?: string;
}