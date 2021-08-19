import { KV } from "@cloudbase/types";
import { cache } from "@cloudbase/utilities";
import { ICloudbaseCache, ICacheConfig } from "@cloudbase/types/cache";

const KEY_ACCESS_TOKEN = 'access_token';
const KEY_ACCESS_TOKEN_EXPIRE = 'access_token_expire';
const KEY_REFRESH_TOKEN = 'refresh_token';
const KEY_ANONYMOUS_UUID = 'anonymous_uuid';
const KEY_LOGIN_TYPE = 'login_type';
const USER_INFO_KEY = 'user_info';
const DEVICE_INFO = 'device_id';

const { CloudbaseCache } = cache;

const cacheMap: KV<ICloudbaseCache> = {};
// 本地存储
const localCacheMap: KV<ICloudbaseCache> = {};

export function initCache(config: ICacheConfig&{env:string}) {
  const { env,persistence,platformInfo } = config;

  const accessTokenKey       = `${KEY_ACCESS_TOKEN}_${env}`;
  const accessTokenExpireKey = `${KEY_ACCESS_TOKEN_EXPIRE}_${env}`;
  const refreshTokenKey      = `${KEY_REFRESH_TOKEN}_${env}`;
  const anonymousUuidKey     = `${KEY_ANONYMOUS_UUID}_${env}`;
  const loginTypeKey         = `${KEY_LOGIN_TYPE}_${env}`;
  const userInfoKey          = `${USER_INFO_KEY}_${env}`;
  const deviceIdKey          = `${DEVICE_INFO}`; // 非环境级别

  const keys = {
    accessTokenKey,
    accessTokenExpireKey,
    refreshTokenKey,
    anonymousUuidKey,
    loginTypeKey,
    userInfoKey,
    deviceIdKey
  };
  // 若指定env已存在cache则尝试更新persistence
  cacheMap[env]?cacheMap[env].updatePersistence(persistence):(cacheMap[env] = new CloudbaseCache({
    ...config,
    keys,
    platformInfo,
    alwaysLocalKeys: ['anonymousUuidKey']
  }));
  localCacheMap[env] = localCacheMap[env] || new CloudbaseCache({
    ...config,
    keys,
    platformInfo,
    persistence: 'local'
  });
}

export function getCacheByEnvId(env: string): ICloudbaseCache {
  return cacheMap[env];
}

export function getLocalCache(env: string): ICloudbaseCache {
  return localCacheMap[env];
}
