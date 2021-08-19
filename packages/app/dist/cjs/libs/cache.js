"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalCache = exports.getCacheByEnvId = exports.initCache = void 0;
var utilities_1 = require("@cloudbase/utilities");
var KEY_ACCESS_TOKEN = 'access_token';
var KEY_ACCESS_TOKEN_EXPIRE = 'access_token_expire';
var KEY_REFRESH_TOKEN = 'refresh_token';
var KEY_ANONYMOUS_UUID = 'anonymous_uuid';
var KEY_LOGIN_TYPE = 'login_type';
var USER_INFO_KEY = 'user_info';
var DEVICE_INFO = 'device_id';
var CloudbaseCache = utilities_1.cache.CloudbaseCache;
var cacheMap = {};
var localCacheMap = {};
function initCache(config) {
    var env = config.env, persistence = config.persistence, platformInfo = config.platformInfo;
    var accessTokenKey = KEY_ACCESS_TOKEN + "_" + env;
    var accessTokenExpireKey = KEY_ACCESS_TOKEN_EXPIRE + "_" + env;
    var refreshTokenKey = KEY_REFRESH_TOKEN + "_" + env;
    var anonymousUuidKey = KEY_ANONYMOUS_UUID + "_" + env;
    var loginTypeKey = KEY_LOGIN_TYPE + "_" + env;
    var userInfoKey = USER_INFO_KEY + "_" + env;
    var deviceIdKey = "" + DEVICE_INFO;
    var keys = {
        accessTokenKey: accessTokenKey,
        accessTokenExpireKey: accessTokenExpireKey,
        refreshTokenKey: refreshTokenKey,
        anonymousUuidKey: anonymousUuidKey,
        loginTypeKey: loginTypeKey,
        userInfoKey: userInfoKey,
        deviceIdKey: deviceIdKey
    };
    cacheMap[env] ? cacheMap[env].updatePersistence(persistence) : (cacheMap[env] = new CloudbaseCache(__assign(__assign({}, config), { keys: keys,
        platformInfo: platformInfo, alwaysLocalKeys: ['anonymousUuidKey'] })));
    localCacheMap[env] = localCacheMap[env] || new CloudbaseCache(__assign(__assign({}, config), { keys: keys,
        platformInfo: platformInfo, persistence: 'local' }));
}
exports.initCache = initCache;
function getCacheByEnvId(env) {
    return cacheMap[env];
}
exports.getCacheByEnvId = getCacheByEnvId;
function getLocalCache(env) {
    return localCacheMap[env];
}
exports.getLocalCache = getLocalCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGlicy9jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGtEQUE2QztBQUc3QyxJQUFNLGdCQUFnQixHQUFHLGNBQWMsQ0FBQztBQUN4QyxJQUFNLHVCQUF1QixHQUFHLHFCQUFxQixDQUFDO0FBQ3RELElBQU0saUJBQWlCLEdBQUcsZUFBZSxDQUFDO0FBQzFDLElBQU0sa0JBQWtCLEdBQUcsZ0JBQWdCLENBQUM7QUFDNUMsSUFBTSxjQUFjLEdBQUcsWUFBWSxDQUFDO0FBQ3BDLElBQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQztBQUNsQyxJQUFNLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFFeEIsSUFBQSxjQUFjLEdBQUssaUJBQUssZUFBVixDQUFXO0FBRWpDLElBQU0sUUFBUSxHQUF3QixFQUFFLENBQUM7QUFFekMsSUFBTSxhQUFhLEdBQXdCLEVBQUUsQ0FBQztBQUU5QyxTQUFnQixTQUFTLENBQUMsTUFBaUM7SUFDakQsSUFBQSxHQUFHLEdBQThCLE1BQU0sSUFBcEMsRUFBQyxXQUFXLEdBQWtCLE1BQU0sWUFBeEIsRUFBQyxZQUFZLEdBQUssTUFBTSxhQUFYLENBQVk7SUFFaEQsSUFBTSxjQUFjLEdBQVksZ0JBQWdCLFNBQUksR0FBSyxDQUFDO0lBQzFELElBQU0sb0JBQW9CLEdBQU0sdUJBQXVCLFNBQUksR0FBSyxDQUFDO0lBQ2pFLElBQU0sZUFBZSxHQUFXLGlCQUFpQixTQUFJLEdBQUssQ0FBQztJQUMzRCxJQUFNLGdCQUFnQixHQUFVLGtCQUFrQixTQUFJLEdBQUssQ0FBQztJQUM1RCxJQUFNLFlBQVksR0FBYyxjQUFjLFNBQUksR0FBSyxDQUFDO0lBQ3hELElBQU0sV0FBVyxHQUFlLGFBQWEsU0FBSSxHQUFLLENBQUM7SUFDdkQsSUFBTSxXQUFXLEdBQVksS0FBRyxXQUFhLENBQUM7SUFFOUMsSUFBTSxJQUFJLEdBQUc7UUFDWCxjQUFjLGdCQUFBO1FBQ2Qsb0JBQW9CLHNCQUFBO1FBQ3BCLGVBQWUsaUJBQUE7UUFDZixnQkFBZ0Isa0JBQUE7UUFDaEIsWUFBWSxjQUFBO1FBQ1osV0FBVyxhQUFBO1FBQ1gsV0FBVyxhQUFBO0tBQ1osQ0FBQztJQUVGLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLGNBQWMsdUJBQ3pGLE1BQU0sS0FDVCxJQUFJLE1BQUE7UUFDSixZQUFZLGNBQUEsRUFDWixlQUFlLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUNyQyxDQUFDLENBQUM7SUFDSixhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksY0FBYyx1QkFDeEQsTUFBTSxLQUNULElBQUksTUFBQTtRQUNKLFlBQVksY0FBQSxFQUNaLFdBQVcsRUFBRSxPQUFPLElBQ3BCLENBQUM7QUFDTCxDQUFDO0FBakNELDhCQWlDQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxHQUFXO0lBQ3pDLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLENBQUM7QUFGRCwwQ0FFQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxHQUFXO0lBQ3ZDLE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFGRCxzQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEtWIH0gZnJvbSBcIkBjbG91ZGJhc2UvdHlwZXNcIjtcbmltcG9ydCB7IGNhY2hlIH0gZnJvbSBcIkBjbG91ZGJhc2UvdXRpbGl0aWVzXCI7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ2FjaGUsIElDYWNoZUNvbmZpZyB9IGZyb20gXCJAY2xvdWRiYXNlL3R5cGVzL2NhY2hlXCI7XG5cbmNvbnN0IEtFWV9BQ0NFU1NfVE9LRU4gPSAnYWNjZXNzX3Rva2VuJztcbmNvbnN0IEtFWV9BQ0NFU1NfVE9LRU5fRVhQSVJFID0gJ2FjY2Vzc190b2tlbl9leHBpcmUnO1xuY29uc3QgS0VZX1JFRlJFU0hfVE9LRU4gPSAncmVmcmVzaF90b2tlbic7XG5jb25zdCBLRVlfQU5PTllNT1VTX1VVSUQgPSAnYW5vbnltb3VzX3V1aWQnO1xuY29uc3QgS0VZX0xPR0lOX1RZUEUgPSAnbG9naW5fdHlwZSc7XG5jb25zdCBVU0VSX0lORk9fS0VZID0gJ3VzZXJfaW5mbyc7XG5jb25zdCBERVZJQ0VfSU5GTyA9ICdkZXZpY2VfaWQnO1xuXG5jb25zdCB7IENsb3VkYmFzZUNhY2hlIH0gPSBjYWNoZTtcblxuY29uc3QgY2FjaGVNYXA6IEtWPElDbG91ZGJhc2VDYWNoZT4gPSB7fTtcbi8vIOacrOWcsOWtmOWCqFxuY29uc3QgbG9jYWxDYWNoZU1hcDogS1Y8SUNsb3VkYmFzZUNhY2hlPiA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdENhY2hlKGNvbmZpZzogSUNhY2hlQ29uZmlnJntlbnY6c3RyaW5nfSkge1xuICBjb25zdCB7IGVudixwZXJzaXN0ZW5jZSxwbGF0Zm9ybUluZm8gfSA9IGNvbmZpZztcblxuICBjb25zdCBhY2Nlc3NUb2tlbktleSAgICAgICA9IGAke0tFWV9BQ0NFU1NfVE9LRU59XyR7ZW52fWA7XG4gIGNvbnN0IGFjY2Vzc1Rva2VuRXhwaXJlS2V5ID0gYCR7S0VZX0FDQ0VTU19UT0tFTl9FWFBJUkV9XyR7ZW52fWA7XG4gIGNvbnN0IHJlZnJlc2hUb2tlbktleSAgICAgID0gYCR7S0VZX1JFRlJFU0hfVE9LRU59XyR7ZW52fWA7XG4gIGNvbnN0IGFub255bW91c1V1aWRLZXkgICAgID0gYCR7S0VZX0FOT05ZTU9VU19VVUlEfV8ke2Vudn1gO1xuICBjb25zdCBsb2dpblR5cGVLZXkgICAgICAgICA9IGAke0tFWV9MT0dJTl9UWVBFfV8ke2Vudn1gO1xuICBjb25zdCB1c2VySW5mb0tleSAgICAgICAgICA9IGAke1VTRVJfSU5GT19LRVl9XyR7ZW52fWA7XG4gIGNvbnN0IGRldmljZUlkS2V5ICAgICAgICAgID0gYCR7REVWSUNFX0lORk99YDsgLy8g6Z2e546v5aKD57qn5YirXG5cbiAgY29uc3Qga2V5cyA9IHtcbiAgICBhY2Nlc3NUb2tlbktleSxcbiAgICBhY2Nlc3NUb2tlbkV4cGlyZUtleSxcbiAgICByZWZyZXNoVG9rZW5LZXksXG4gICAgYW5vbnltb3VzVXVpZEtleSxcbiAgICBsb2dpblR5cGVLZXksXG4gICAgdXNlckluZm9LZXksXG4gICAgZGV2aWNlSWRLZXlcbiAgfTtcbiAgLy8g6Iul5oyH5a6aZW525bey5a2Y5ZyoY2FjaGXliJnlsJ3or5Xmm7TmlrBwZXJzaXN0ZW5jZVxuICBjYWNoZU1hcFtlbnZdP2NhY2hlTWFwW2Vudl0udXBkYXRlUGVyc2lzdGVuY2UocGVyc2lzdGVuY2UpOihjYWNoZU1hcFtlbnZdID0gbmV3IENsb3VkYmFzZUNhY2hlKHtcbiAgICAuLi5jb25maWcsXG4gICAga2V5cyxcbiAgICBwbGF0Zm9ybUluZm8sXG4gICAgYWx3YXlzTG9jYWxLZXlzOiBbJ2Fub255bW91c1V1aWRLZXknXVxuICB9KSk7XG4gIGxvY2FsQ2FjaGVNYXBbZW52XSA9IGxvY2FsQ2FjaGVNYXBbZW52XSB8fCBuZXcgQ2xvdWRiYXNlQ2FjaGUoe1xuICAgIC4uLmNvbmZpZyxcbiAgICBrZXlzLFxuICAgIHBsYXRmb3JtSW5mbyxcbiAgICBwZXJzaXN0ZW5jZTogJ2xvY2FsJ1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENhY2hlQnlFbnZJZChlbnY6IHN0cmluZyk6IElDbG91ZGJhc2VDYWNoZSB7XG4gIHJldHVybiBjYWNoZU1hcFtlbnZdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9jYWxDYWNoZShlbnY6IHN0cmluZyk6IElDbG91ZGJhc2VDYWNoZSB7XG4gIHJldHVybiBsb2NhbENhY2hlTWFwW2Vudl07XG59XG4iXX0=