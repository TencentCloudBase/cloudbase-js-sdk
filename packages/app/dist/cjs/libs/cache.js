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
var USER_INFO_KEY = 'user_info';
var CloudbaseCache = utilities_1.cache.CloudbaseCache;
var cacheMap = {};
var localCacheMap = {};
function initCache(config) {
    var env = config.env, persistence = config.persistence, platformInfo = config.platformInfo;
    var userInfoKey = USER_INFO_KEY + "_" + env;
    var keys = {
        userInfoKey: userInfoKey,
    };
    cacheMap[env] ? cacheMap[env].updatePersistence(persistence) : (cacheMap[env] = new CloudbaseCache(__assign(__assign({}, config), { keys: keys,
        platformInfo: platformInfo })));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGlicy9jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGtEQUE2QztBQUc3QyxJQUFNLGFBQWEsR0FBRyxXQUFXLENBQUM7QUFRMUIsSUFBQSxjQUFjLEdBQUssaUJBQUssZUFBVixDQUFXO0FBRWpDLElBQU0sUUFBUSxHQUF3QixFQUFFLENBQUM7QUFFekMsSUFBTSxhQUFhLEdBQXdCLEVBQUUsQ0FBQztBQUU5QyxTQUFnQixTQUFTLENBQUMsTUFBc0M7SUFDdEQsSUFBQSxHQUFHLEdBQWdDLE1BQU0sSUFBdEMsRUFBRSxXQUFXLEdBQW1CLE1BQU0sWUFBekIsRUFBRSxZQUFZLEdBQUssTUFBTSxhQUFYLENBQVk7SUFPbEQsSUFBTSxXQUFXLEdBQU0sYUFBYSxTQUFJLEdBQUssQ0FBQztJQUc5QyxJQUFNLElBQUksR0FBRztRQUNYLFdBQVcsYUFBQTtLQU9aLENBQUM7SUFFRixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxjQUFjLHVCQUM3RixNQUFNLEtBQ1QsSUFBSSxNQUFBO1FBQ0osWUFBWSxjQUFBLElBQ1osQ0FBQyxDQUFDO0lBQ0osYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLGNBQWMsdUJBQ3hELE1BQU0sS0FDVCxJQUFJLE1BQUE7UUFDSixZQUFZLGNBQUEsRUFDWixXQUFXLEVBQUUsT0FBTyxJQUNwQixDQUFDO0FBQ0wsQ0FBQztBQWhDRCw4QkFnQ0M7QUFFRCxTQUFnQixlQUFlLENBQUMsR0FBVztJQUN6QyxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QixDQUFDO0FBRkQsMENBRUM7QUFFRCxTQUFnQixhQUFhLENBQUMsR0FBVztJQUN2QyxPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRkQsc0NBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBLViB9IGZyb20gXCJAY2xvdWRiYXNlL3R5cGVzXCI7XG5pbXBvcnQgeyBjYWNoZSB9IGZyb20gXCJAY2xvdWRiYXNlL3V0aWxpdGllc1wiO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNhY2hlLCBJQ2FjaGVDb25maWcgfSBmcm9tIFwiQGNsb3VkYmFzZS90eXBlcy9jYWNoZVwiO1xuXG5jb25zdCBVU0VSX0lORk9fS0VZID0gJ3VzZXJfaW5mbyc7XG4vLyBjb25zdCBLRVlfQUNDRVNTX1RPS0VOID0gJ2FjY2Vzc190b2tlbic7XG4vLyBjb25zdCBLRVlfQUNDRVNTX1RPS0VOX0VYUElSRSA9ICdhY2Nlc3NfdG9rZW5fZXhwaXJlJztcbi8vIGNvbnN0IEtFWV9SRUZSRVNIX1RPS0VOID0gJ3JlZnJlc2hfdG9rZW4nO1xuLy8gY29uc3QgS0VZX0FOT05ZTU9VU19VVUlEID0gJ2Fub255bW91c191dWlkJztcbi8vIGNvbnN0IEtFWV9MT0dJTl9UWVBFID0gJ2xvZ2luX3R5cGUnO1xuLy8gY29uc3QgREVWSUNFX0lORk8gPSAnZGV2aWNlX2lkJztcblxuY29uc3QgeyBDbG91ZGJhc2VDYWNoZSB9ID0gY2FjaGU7XG5cbmNvbnN0IGNhY2hlTWFwOiBLVjxJQ2xvdWRiYXNlQ2FjaGU+ID0ge307XG4vLyDmnKzlnLDlrZjlgqhcbmNvbnN0IGxvY2FsQ2FjaGVNYXA6IEtWPElDbG91ZGJhc2VDYWNoZT4gPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRDYWNoZShjb25maWc6IElDYWNoZUNvbmZpZyAmIHsgZW52OiBzdHJpbmcgfSkge1xuICBjb25zdCB7IGVudiwgcGVyc2lzdGVuY2UsIHBsYXRmb3JtSW5mbyB9ID0gY29uZmlnO1xuXG4gIC8vIGNvbnN0IGFjY2Vzc1Rva2VuS2V5ID0gYCR7S0VZX0FDQ0VTU19UT0tFTn1fJHtlbnZ9YDtcbiAgLy8gY29uc3QgYWNjZXNzVG9rZW5FeHBpcmVLZXkgPSBgJHtLRVlfQUNDRVNTX1RPS0VOX0VYUElSRX1fJHtlbnZ9YDtcbiAgLy8gY29uc3QgcmVmcmVzaFRva2VuS2V5ICAgICAgPSBgJHtLRVlfUkVGUkVTSF9UT0tFTn1fJHtlbnZ9YDtcbiAgLy8gY29uc3QgYW5vbnltb3VzVXVpZEtleSAgICAgPSBgJHtLRVlfQU5PTllNT1VTX1VVSUR9XyR7ZW52fWA7XG4gIC8vIGNvbnN0IGxvZ2luVHlwZUtleSAgICAgICAgID0gYCR7S0VZX0xPR0lOX1RZUEV9XyR7ZW52fWA7XG4gIGNvbnN0IHVzZXJJbmZvS2V5ID0gYCR7VVNFUl9JTkZPX0tFWX1fJHtlbnZ9YDtcbiAgLy8gY29uc3QgZGV2aWNlSWRLZXkgPSBgJHtERVZJQ0VfSU5GT31gOyAvLyDpnZ7njq/looPnuqfliKtcblxuICBjb25zdCBrZXlzID0ge1xuICAgIHVzZXJJbmZvS2V5LFxuICAgIC8vIGFjY2Vzc1Rva2VuS2V5LFxuICAgIC8vIGFjY2Vzc1Rva2VuRXhwaXJlS2V5LFxuICAgIC8vIHJlZnJlc2hUb2tlbktleSxcbiAgICAvLyBhbm9ueW1vdXNVdWlkS2V5LFxuICAgIC8vIGxvZ2luVHlwZUtleSxcbiAgICAvLyBkZXZpY2VJZEtleVxuICB9O1xuICAvLyDoi6XmjIflrpplbnblt7LlrZjlnKhjYWNoZeWImeWwneivleabtOaWsHBlcnNpc3RlbmNlXG4gIGNhY2hlTWFwW2Vudl0gPyBjYWNoZU1hcFtlbnZdLnVwZGF0ZVBlcnNpc3RlbmNlKHBlcnNpc3RlbmNlKSA6IChjYWNoZU1hcFtlbnZdID0gbmV3IENsb3VkYmFzZUNhY2hlKHtcbiAgICAuLi5jb25maWcsXG4gICAga2V5cyxcbiAgICBwbGF0Zm9ybUluZm8sXG4gIH0pKTtcbiAgbG9jYWxDYWNoZU1hcFtlbnZdID0gbG9jYWxDYWNoZU1hcFtlbnZdIHx8IG5ldyBDbG91ZGJhc2VDYWNoZSh7XG4gICAgLi4uY29uZmlnLFxuICAgIGtleXMsXG4gICAgcGxhdGZvcm1JbmZvLFxuICAgIHBlcnNpc3RlbmNlOiAnbG9jYWwnXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2FjaGVCeUVudklkKGVudjogc3RyaW5nKTogSUNsb3VkYmFzZUNhY2hlIHtcbiAgcmV0dXJuIGNhY2hlTWFwW2Vudl07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhbENhY2hlKGVudjogc3RyaW5nKTogSUNsb3VkYmFzZUNhY2hlIHtcbiAgcmV0dXJuIGxvY2FsQ2FjaGVNYXBbZW52XTtcbn1cbiJdfQ==