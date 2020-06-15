var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { cache } from "@cloudbase/utilities";
var KEY_ACCESS_TOKEN = 'access_token';
var KEY_ACCESS_TOKEN_EXPIRE = 'access_token_expire';
var KEY_REFRESH_TOKEN = 'refresh_token';
var KEY_ANONYMOUS_UUID = 'anonymous_uuid';
var KEY_LOGIN_TYPE = 'login_type';
var USER_INFO_KEY = 'user_info';
var CloudbaseCache = cache.CloudbaseCache;
var cacheMap = {};
var localCacheMap = {};
export function initCache(config) {
    var env = config.env, persistence = config.persistence, platformInfo = config.platformInfo;
    var accessTokenKey = KEY_ACCESS_TOKEN + "_" + env;
    var accessTokenExpireKey = KEY_ACCESS_TOKEN_EXPIRE + "_" + env;
    var refreshTokenKey = KEY_REFRESH_TOKEN + "_" + env;
    var anonymousUuidKey = KEY_ANONYMOUS_UUID + "_" + env;
    var loginTypeKey = KEY_LOGIN_TYPE + "_" + env;
    var userInfoKey = USER_INFO_KEY + "_" + env;
    var keys = {
        accessTokenKey: accessTokenKey,
        accessTokenExpireKey: accessTokenExpireKey,
        refreshTokenKey: refreshTokenKey,
        anonymousUuidKey: anonymousUuidKey,
        loginTypeKey: loginTypeKey,
        userInfoKey: userInfoKey
    };
    cacheMap[env] ? cacheMap[env].updatePersistence(persistence) : (cacheMap[env] = new CloudbaseCache(__assign(__assign({}, config), { keys: keys,
        platformInfo: platformInfo, alwaysLocalKeys: ['anonymousUuidKey'] })));
    localCacheMap[env] = localCacheMap[env] || new CloudbaseCache(__assign(__assign({}, config), { keys: keys,
        platformInfo: platformInfo, persistence: 'local' }));
}
export function getCacheByEnvId(env) {
    return cacheMap[env];
}
export function getLocalCache(env) {
    return localCacheMap[env];
}
