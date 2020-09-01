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
exports.initCache = initCache;
function getCacheByEnvId(env) {
    return cacheMap[env];
}
exports.getCacheByEnvId = getCacheByEnvId;
function getLocalCache(env) {
    return localCacheMap[env];
}
exports.getLocalCache = getLocalCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGlicy9jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGtEQUE2QztBQUc3QyxJQUFNLGdCQUFnQixHQUFHLGNBQWMsQ0FBQztBQUN4QyxJQUFNLHVCQUF1QixHQUFHLHFCQUFxQixDQUFDO0FBQ3RELElBQU0saUJBQWlCLEdBQUcsZUFBZSxDQUFDO0FBQzFDLElBQU0sa0JBQWtCLEdBQUcsZ0JBQWdCLENBQUM7QUFDNUMsSUFBTSxjQUFjLEdBQUcsWUFBWSxDQUFDO0FBQ3BDLElBQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQztBQUUxQixJQUFBLGNBQWMsR0FBSyxpQkFBSyxlQUFWLENBQVc7QUFFakMsSUFBTSxRQUFRLEdBQXdCLEVBQUUsQ0FBQztBQUV6QyxJQUFNLGFBQWEsR0FBd0IsRUFBRSxDQUFDO0FBRTlDLFNBQWdCLFNBQVMsQ0FBQyxNQUFpQztJQUNqRCxJQUFBLEdBQUcsR0FBOEIsTUFBTSxJQUFwQyxFQUFDLFdBQVcsR0FBa0IsTUFBTSxZQUF4QixFQUFDLFlBQVksR0FBSyxNQUFNLGFBQVgsQ0FBWTtJQUVoRCxJQUFNLGNBQWMsR0FBWSxnQkFBZ0IsU0FBSSxHQUFLLENBQUM7SUFDMUQsSUFBTSxvQkFBb0IsR0FBTSx1QkFBdUIsU0FBSSxHQUFLLENBQUM7SUFDakUsSUFBTSxlQUFlLEdBQVcsaUJBQWlCLFNBQUksR0FBSyxDQUFDO0lBQzNELElBQU0sZ0JBQWdCLEdBQVUsa0JBQWtCLFNBQUksR0FBSyxDQUFDO0lBQzVELElBQU0sWUFBWSxHQUFjLGNBQWMsU0FBSSxHQUFLLENBQUM7SUFDeEQsSUFBTSxXQUFXLEdBQWUsYUFBYSxTQUFJLEdBQUssQ0FBQztJQUV2RCxJQUFNLElBQUksR0FBRztRQUNYLGNBQWMsZ0JBQUE7UUFDZCxvQkFBb0Isc0JBQUE7UUFDcEIsZUFBZSxpQkFBQTtRQUNmLGdCQUFnQixrQkFBQTtRQUNoQixZQUFZLGNBQUE7UUFDWixXQUFXLGFBQUE7S0FDWixDQUFDO0lBRUYsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksY0FBYyx1QkFDekYsTUFBTSxLQUNULElBQUksTUFBQTtRQUNKLFlBQVksY0FBQSxFQUNaLGVBQWUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLElBQ3JDLENBQUMsQ0FBQztJQUNKLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxjQUFjLHVCQUN4RCxNQUFNLEtBQ1QsSUFBSSxNQUFBO1FBQ0osWUFBWSxjQUFBLEVBQ1osV0FBVyxFQUFFLE9BQU8sSUFDcEIsQ0FBQztBQUNMLENBQUM7QUEvQkQsOEJBK0JDO0FBRUQsU0FBZ0IsZUFBZSxDQUFDLEdBQVc7SUFDekMsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkIsQ0FBQztBQUZELDBDQUVDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLEdBQVc7SUFDdkMsT0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUZELHNDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgS1YgfSBmcm9tIFwiQGNsb3VkYmFzZS90eXBlc1wiO1xuaW1wb3J0IHsgY2FjaGUgfSBmcm9tIFwiQGNsb3VkYmFzZS91dGlsaXRpZXNcIjtcbmltcG9ydCB7IElDbG91ZGJhc2VDYWNoZSwgSUNhY2hlQ29uZmlnIH0gZnJvbSBcIkBjbG91ZGJhc2UvdHlwZXMvY2FjaGVcIjtcblxuY29uc3QgS0VZX0FDQ0VTU19UT0tFTiA9ICdhY2Nlc3NfdG9rZW4nO1xuY29uc3QgS0VZX0FDQ0VTU19UT0tFTl9FWFBJUkUgPSAnYWNjZXNzX3Rva2VuX2V4cGlyZSc7XG5jb25zdCBLRVlfUkVGUkVTSF9UT0tFTiA9ICdyZWZyZXNoX3Rva2VuJztcbmNvbnN0IEtFWV9BTk9OWU1PVVNfVVVJRCA9ICdhbm9ueW1vdXNfdXVpZCc7XG5jb25zdCBLRVlfTE9HSU5fVFlQRSA9ICdsb2dpbl90eXBlJztcbmNvbnN0IFVTRVJfSU5GT19LRVkgPSAndXNlcl9pbmZvJztcblxuY29uc3QgeyBDbG91ZGJhc2VDYWNoZSB9ID0gY2FjaGU7XG5cbmNvbnN0IGNhY2hlTWFwOiBLVjxJQ2xvdWRiYXNlQ2FjaGU+ID0ge307XG4vLyDmnKzlnLDlrZjlgqhcbmNvbnN0IGxvY2FsQ2FjaGVNYXA6IEtWPElDbG91ZGJhc2VDYWNoZT4gPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRDYWNoZShjb25maWc6IElDYWNoZUNvbmZpZyZ7ZW52OnN0cmluZ30pIHtcbiAgY29uc3QgeyBlbnYscGVyc2lzdGVuY2UscGxhdGZvcm1JbmZvIH0gPSBjb25maWc7XG5cbiAgY29uc3QgYWNjZXNzVG9rZW5LZXkgICAgICAgPSBgJHtLRVlfQUNDRVNTX1RPS0VOfV8ke2Vudn1gO1xuICBjb25zdCBhY2Nlc3NUb2tlbkV4cGlyZUtleSA9IGAke0tFWV9BQ0NFU1NfVE9LRU5fRVhQSVJFfV8ke2Vudn1gO1xuICBjb25zdCByZWZyZXNoVG9rZW5LZXkgICAgICA9IGAke0tFWV9SRUZSRVNIX1RPS0VOfV8ke2Vudn1gO1xuICBjb25zdCBhbm9ueW1vdXNVdWlkS2V5ICAgICA9IGAke0tFWV9BTk9OWU1PVVNfVVVJRH1fJHtlbnZ9YDtcbiAgY29uc3QgbG9naW5UeXBlS2V5ICAgICAgICAgPSBgJHtLRVlfTE9HSU5fVFlQRX1fJHtlbnZ9YDtcbiAgY29uc3QgdXNlckluZm9LZXkgICAgICAgICAgPSBgJHtVU0VSX0lORk9fS0VZfV8ke2Vudn1gO1xuXG4gIGNvbnN0IGtleXMgPSB7XG4gICAgYWNjZXNzVG9rZW5LZXksXG4gICAgYWNjZXNzVG9rZW5FeHBpcmVLZXksXG4gICAgcmVmcmVzaFRva2VuS2V5LFxuICAgIGFub255bW91c1V1aWRLZXksXG4gICAgbG9naW5UeXBlS2V5LFxuICAgIHVzZXJJbmZvS2V5XG4gIH07XG4gIC8vIOiLpeaMh+WummVuduW3suWtmOWcqGNhY2hl5YiZ5bCd6K+V5pu05pawcGVyc2lzdGVuY2VcbiAgY2FjaGVNYXBbZW52XT9jYWNoZU1hcFtlbnZdLnVwZGF0ZVBlcnNpc3RlbmNlKHBlcnNpc3RlbmNlKTooY2FjaGVNYXBbZW52XSA9IG5ldyBDbG91ZGJhc2VDYWNoZSh7XG4gICAgLi4uY29uZmlnLFxuICAgIGtleXMsXG4gICAgcGxhdGZvcm1JbmZvLFxuICAgIGFsd2F5c0xvY2FsS2V5czogWydhbm9ueW1vdXNVdWlkS2V5J11cbiAgfSkpO1xuICBsb2NhbENhY2hlTWFwW2Vudl0gPSBsb2NhbENhY2hlTWFwW2Vudl0gfHwgbmV3IENsb3VkYmFzZUNhY2hlKHtcbiAgICAuLi5jb25maWcsXG4gICAga2V5cyxcbiAgICBwbGF0Zm9ybUluZm8sXG4gICAgcGVyc2lzdGVuY2U6ICdsb2NhbCdcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDYWNoZUJ5RW52SWQoZW52OiBzdHJpbmcpOiBJQ2xvdWRiYXNlQ2FjaGUge1xuICByZXR1cm4gY2FjaGVNYXBbZW52XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvY2FsQ2FjaGUoZW52OiBzdHJpbmcpOiBJQ2xvdWRiYXNlQ2FjaGUge1xuICByZXR1cm4gbG9jYWxDYWNoZU1hcFtlbnZdO1xufVxuIl19