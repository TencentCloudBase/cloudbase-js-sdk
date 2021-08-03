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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestByEnvId = exports.initRequest = exports.CloudbaseRequest = void 0;
var common_1 = require("../constants/common");
var utilities_1 = require("@cloudbase/utilities");
var __1 = require("..");
var cache_1 = require("./cache");
var events_1 = require("../constants/events");
var adapter_1 = require("./adapter");
var ERRORS = utilities_1.constants.ERRORS;
var genSeqId = utilities_1.utils.genSeqId, isFormData = utilities_1.utils.isFormData, formatUrl = utilities_1.utils.formatUrl, createSign = utilities_1.utils.createSign;
var RUNTIME = utilities_1.adapters.RUNTIME;
var ACTIONS_WITHOUT_ACCESSTOKEN = [
    'auth.getJwt',
    'auth.logout',
    'auth.signInWithTicket',
    'auth.signInAnonymously',
    'auth.signIn',
    'auth.fetchAccessTokenWithRefreshToken',
    'auth.signUpWithEmailAndPassword',
    'auth.activateEndUserMail',
    'auth.sendPasswordResetEmail',
    'auth.resetPasswordWithToken',
    'auth.isUsernameRegistered'
];
function bindHooks(instance, name, hooks) {
    var originMethod = instance[name];
    instance[name] = function (options) {
        var data = {};
        var headers = {};
        hooks.forEach(function (hook) {
            var _a = hook.call(instance, options), appendedData = _a.data, appendedHeaders = _a.headers;
            Object.assign(data, appendedData);
            Object.assign(headers, appendedHeaders);
        });
        var originData = options.data;
        originData && (function () {
            if (isFormData(originData)) {
                for (var key in data) {
                    originData.append(key, data[key]);
                }
                return;
            }
            options.data = __assign(__assign({}, originData), data);
        })();
        options.headers = __assign(__assign({}, (options.headers || {})), headers);
        return originMethod.call(instance, options);
    };
}
function beforeEach() {
    var seqId = genSeqId();
    return {
        data: {
            seqId: seqId
        },
        headers: {
            'X-SDK-Version': "@cloudbase/js-sdk/" + common_1.getSdkVersion(),
            'x-seqid': seqId
        }
    };
}
var CloudbaseRequest = (function () {
    function CloudbaseRequest(config) {
        this._throwWhenRequestFail = false;
        this.config = config;
        this._reqClass = new adapter_1.Platform.adapter.reqClass({
            timeout: this.config.timeout,
            timeoutMsg: "[@cloudbase/js-sdk] \u8BF7\u6C42\u5728" + this.config.timeout / 1000 + "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD",
            restrictedMethods: ['post']
        });
        this._throwWhenRequestFail = config.throw || false;
        this._cache = cache_1.getCacheByEnvId(this.config.env);
        this._localCache = cache_1.getLocalCache(this.config.env);
        bindHooks(this._reqClass, 'post', [beforeEach]);
        bindHooks(this._reqClass, 'upload', [beforeEach]);
        bindHooks(this._reqClass, 'download', [beforeEach]);
    }
    CloudbaseRequest.prototype.post = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._reqClass.post(options)];
                    case 1:
                        res = _a.sent();
                        return [2, res];
                }
            });
        });
    };
    CloudbaseRequest.prototype.upload = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._reqClass.upload(options)];
                    case 1:
                        res = _a.sent();
                        return [2, res];
                }
            });
        });
    };
    CloudbaseRequest.prototype.download = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._reqClass.download(options)];
                    case 1:
                        res = _a.sent();
                        return [2, res];
                }
            });
        });
    };
    CloudbaseRequest.prototype.refreshAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, err, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._refreshAccessTokenPromise) {
                            this._refreshAccessTokenPromise = this._refreshAccessToken();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this._refreshAccessTokenPromise];
                    case 2:
                        result = _a.sent();
                        return [3, 4];
                    case 3:
                        e_1 = _a.sent();
                        err = e_1;
                        return [3, 4];
                    case 4:
                        this._refreshAccessTokenPromise = null;
                        this._shouldRefreshAccessTokenHook = null;
                        if (err) {
                            throw err;
                        }
                        return [2, result];
                }
            });
        });
    };
    CloudbaseRequest.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accessTokenKey, accessTokenExpireKey, refreshTokenKey, refreshToken, accessToken, accessTokenExpire, _b, shouldRefreshAccessToken, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this._cache.keys, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey, refreshTokenKey = _a.refreshTokenKey;
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 1:
                        refreshToken = _d.sent();
                        if (!refreshToken) {
                            throw new Error(JSON.stringify({
                                code: ERRORS.OPERATION_FAIL,
                                msg: 'refresh token is not exist, your local data might be messed up, please retry after clear localStorage or sessionStorage'
                            }));
                        }
                        return [4, this._cache.getStoreAsync(accessTokenKey)];
                    case 2:
                        accessToken = _d.sent();
                        _b = Number;
                        return [4, this._cache.getStoreAsync(accessTokenExpireKey)];
                    case 3:
                        accessTokenExpire = _b.apply(void 0, [_d.sent()]);
                        shouldRefreshAccessToken = true;
                        _c = this._shouldRefreshAccessTokenHook;
                        if (!_c) return [3, 5];
                        return [4, this._shouldRefreshAccessTokenHook(accessToken, accessTokenExpire)];
                    case 4:
                        _c = !(_d.sent());
                        _d.label = 5;
                    case 5:
                        if (_c) {
                            shouldRefreshAccessToken = false;
                        }
                        if (!((!accessToken || !accessTokenExpire || accessTokenExpire < Date.now()) && shouldRefreshAccessToken)) return [3, 7];
                        return [4, this.refreshAccessToken()];
                    case 6: return [2, _d.sent()];
                    case 7: return [2, {
                            accessToken: accessToken,
                            accessTokenExpire: accessTokenExpire
                        }];
                }
            });
        });
    };
    CloudbaseRequest.prototype.request = function (action, params, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tcbTraceKey, contentType, tmpObj, refreshTokenKey, refreshToken, _a, payload, key, key, opts, traceHeader, _b, appSign, appSecret, timestamp, appAccessKey, appAccessKeyId, sign, parse, inQuery, search, formatQuery, _c, BASE_URL, PROTOCOL, newUrl, res, resTraceHeader;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        tcbTraceKey = "x-tcb-trace_" + this.config.env;
                        contentType = 'application/x-www-form-urlencoded';
                        tmpObj = __assign({ action: action, dataVersion: common_1.DATA_VERSION, env: this.config.env }, params);
                        if (!(ACTIONS_WITHOUT_ACCESSTOKEN.indexOf(action) === -1)) return [3, 3];
                        refreshTokenKey = this._cache.keys.refreshTokenKey;
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 1:
                        refreshToken = _d.sent();
                        if (!refreshToken) return [3, 3];
                        _a = tmpObj;
                        return [4, this.getAccessToken()];
                    case 2:
                        _a.access_token = (_d.sent()).accessToken;
                        _d.label = 3;
                    case 3:
                        if (action === 'storage.uploadFile') {
                            payload = new FormData();
                            for (key in payload) {
                                if (payload.hasOwnProperty(key) && payload[key] !== undefined) {
                                    payload.append(key, tmpObj[key]);
                                }
                            }
                            contentType = 'multipart/form-data';
                        }
                        else {
                            contentType = 'application/json;charset=UTF-8';
                            payload = {};
                            for (key in tmpObj) {
                                if (tmpObj[key] !== undefined) {
                                    payload[key] = tmpObj[key];
                                }
                            }
                        }
                        opts = {
                            headers: {
                                'content-type': contentType
                            }
                        };
                        if (options === null || options === void 0 ? void 0 : options['onUploadProgress']) {
                            opts.onUploadProgress = options['onUploadProgress'];
                        }
                        if (this.config.region) {
                            opts.headers['X-TCB-Region'] = this.config.region;
                        }
                        traceHeader = this._localCache.getStore(tcbTraceKey);
                        if (traceHeader) {
                            opts.headers['X-TCB-Trace'] = traceHeader;
                        }
                        if (adapter_1.Platform.runtime !== RUNTIME.WEB) {
                            _b = this.config, appSign = _b.appSign, appSecret = _b.appSecret;
                            timestamp = Date.now();
                            appAccessKey = appSecret.appAccessKey, appAccessKeyId = appSecret.appAccessKeyId;
                            sign = createSign({
                                data: {},
                                timestamp: timestamp,
                                appAccessKeyId: appAccessKeyId,
                                appSign: appSign
                            }, appAccessKey);
                            opts.headers['X-TCB-App-Source'] = "timestamp=" + timestamp + ";appAccessKeyId=" + appAccessKeyId + ";appSign=" + appSign + ";sign=" + sign;
                        }
                        parse = params.parse, inQuery = params.inQuery, search = params.search;
                        formatQuery = {
                            env: this.config.env
                        };
                        parse && (formatQuery.parse = true);
                        inQuery && (formatQuery = __assign(__assign({}, inQuery), formatQuery));
                        _c = common_1.getEndPoint(), BASE_URL = _c.BASE_URL, PROTOCOL = _c.PROTOCOL;
                        newUrl = formatUrl(PROTOCOL, BASE_URL, formatQuery);
                        if (search) {
                            newUrl += search;
                        }
                        return [4, this.post(__assign({ url: newUrl, data: payload }, opts))];
                    case 4:
                        res = _d.sent();
                        resTraceHeader = res.header && res.header['x-tcb-trace'];
                        if (resTraceHeader) {
                            this._localCache.setStore(tcbTraceKey, resTraceHeader);
                        }
                        if ((Number(res.status) !== 200 && Number(res.statusCode) !== 200) || !res.data) {
                            throw new Error('network request error');
                        }
                        return [2, res];
                }
            });
        });
    };
    CloudbaseRequest.prototype.send = function (action, data) {
        if (data === void 0) { data = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.request(action, data, { onUploadProgress: data.onUploadProgress })];
                    case 1:
                        response = _a.sent();
                        if (!(response.data.code === 'ACCESS_TOKEN_EXPIRED' && ACTIONS_WITHOUT_ACCESSTOKEN.indexOf(action) === -1)) return [3, 4];
                        return [4, this.refreshAccessToken()];
                    case 2:
                        _a.sent();
                        return [4, this.request(action, data, { onUploadProgress: data.onUploadProgress })];
                    case 3:
                        response = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (response.data.code && this._throwWhenRequestFail) {
                            throw new Error(JSON.stringify({
                                code: ERRORS.OPERATION_FAIL,
                                msg: "[" + response.data.code + "] " + response.data.message
                            }));
                        }
                        return [2, response.data];
                }
            });
        });
    };
    CloudbaseRequest.prototype._refreshAccessToken = function (retryNum) {
        if (retryNum === void 0) { retryNum = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, accessTokenKey, accessTokenExpireKey, refreshTokenKey, loginTypeKey, anonymousUuidKey, refreshToken, params, response, code, isAnonymous, anonymous_uuid, refresh_token, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._cache.keys, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey, refreshTokenKey = _a.refreshTokenKey, loginTypeKey = _a.loginTypeKey, anonymousUuidKey = _a.anonymousUuidKey;
                        return [4, this._cache.removeStoreAsync(accessTokenKey)];
                    case 1:
                        _b.sent();
                        return [4, this._cache.removeStoreAsync(accessTokenExpireKey)];
                    case 2:
                        _b.sent();
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 3:
                        refreshToken = _b.sent();
                        if (!refreshToken) {
                            throw new Error(JSON.stringify({
                                code: ERRORS.INVALID_OPERATION,
                                msg: 'not login'
                            }));
                        }
                        params = {
                            refresh_token: refreshToken
                        };
                        return [4, this.request('auth.fetchAccessTokenWithRefreshToken', params)];
                    case 4:
                        response = _b.sent();
                        if (!response.data.code) return [3, 12];
                        code = response.data.code;
                        if (!(code === 'SIGN_PARAM_INVALID' || code === 'REFRESH_TOKEN_EXPIRED' || code === 'INVALID_REFRESH_TOKEN')) return [3, 11];
                        return [4, this._cache.getStoreAsync(loginTypeKey)];
                    case 5:
                        isAnonymous = (_b.sent()) === common_1.LOGINTYPE.ANONYMOUS;
                        if (!(isAnonymous && code === 'INVALID_REFRESH_TOKEN')) return [3, 9];
                        return [4, this._cache.getStoreAsync(anonymousUuidKey)];
                    case 6:
                        anonymous_uuid = _b.sent();
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 7:
                        refresh_token = _b.sent();
                        return [4, this.send('auth.signInAnonymously', {
                                anonymous_uuid: anonymous_uuid,
                                refresh_token: refresh_token
                            })];
                    case 8:
                        res = _b.sent();
                        this._setRefreshToken(res.refresh_token);
                        if (retryNum >= 1) {
                            return [2, this._refreshAccessToken(--retryNum)];
                        }
                        else {
                            throw new Error(JSON.stringify({
                                code: ERRORS.OPERATION_FAIL,
                                message: '重试获取 refresh token 失败'
                            }));
                        }
                        _b.label = 9;
                    case 9:
                        __1.cloudbase.fire(events_1.EVENTS.LOGIN_STATE_EXPIRED);
                        return [4, this._cache.removeStoreAsync(refreshTokenKey)];
                    case 10:
                        _b.sent();
                        _b.label = 11;
                    case 11: throw new Error(JSON.stringify({
                        code: ERRORS.NETWORK_ERROR,
                        msg: "refresh access_token failed\uFF1A" + response.data.code
                    }));
                    case 12:
                        if (!response.data.access_token) return [3, 15];
                        __1.cloudbase.fire(events_1.EVENTS.ACCESS_TOKEN_REFRESHD);
                        return [4, this._cache.setStoreAsync(accessTokenKey, response.data.access_token)];
                    case 13:
                        _b.sent();
                        return [4, this._cache.setStoreAsync(accessTokenExpireKey, response.data.access_token_expire + Date.now())];
                    case 14:
                        _b.sent();
                        return [2, {
                                accessToken: response.data.access_token,
                                accessTokenExpire: response.data.access_token_expire
                            }];
                    case 15:
                        if (!response.data.refresh_token) return [3, 19];
                        return [4, this._cache.removeStoreAsync(refreshTokenKey)];
                    case 16:
                        _b.sent();
                        return [4, this._cache.setStoreAsync(refreshTokenKey, response.data.refresh_token)];
                    case 17:
                        _b.sent();
                        return [4, this._refreshAccessToken()];
                    case 18:
                        _b.sent();
                        _b.label = 19;
                    case 19: return [2];
                }
            });
        });
    };
    CloudbaseRequest.prototype._setRefreshToken = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accessTokenKey, accessTokenExpireKey, refreshTokenKey;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._cache.keys, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey, refreshTokenKey = _a.refreshTokenKey;
                        return [4, this._cache.removeStoreAsync(accessTokenKey)];
                    case 1:
                        _b.sent();
                        return [4, this._cache.removeStoreAsync(accessTokenExpireKey)];
                    case 2:
                        _b.sent();
                        return [4, this._cache.setStoreAsync(refreshTokenKey, refreshToken)];
                    case 3:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    return CloudbaseRequest;
}());
exports.CloudbaseRequest = CloudbaseRequest;
var requestMap = {};
function initRequest(config) {
    requestMap[config.env] = new CloudbaseRequest(__assign(__assign({}, config), { throw: true }));
}
exports.initRequest = initRequest;
function getRequestByEnvId(env) {
    return requestMap[env];
}
exports.getRequestByEnvId = getRequestByEnvId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWJzL3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FLNkI7QUFRN0Isa0RBQWtFO0FBSWxFLHdCQUErQjtBQUMvQixpQ0FBeUQ7QUFDekQsOENBQTZDO0FBQzdDLHFDQUFxQztBQUU3QixJQUFBLE1BQU0sR0FBSyxxQkFBUyxPQUFkLENBQWU7QUFDckIsSUFBQSxRQUFRLEdBQXdDLGlCQUFLLFNBQTdDLEVBQUUsVUFBVSxHQUE0QixpQkFBSyxXQUFqQyxFQUFFLFNBQVMsR0FBaUIsaUJBQUssVUFBdEIsRUFBRSxVQUFVLEdBQUssaUJBQUssV0FBVixDQUFXO0FBQ3RELElBQUEsT0FBTyxHQUFLLG9CQUFRLFFBQWIsQ0FBYztBQUc3QixJQUFNLDJCQUEyQixHQUFHO0lBQ2xDLGFBQWE7SUFDYixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLHdCQUF3QjtJQUN4QixhQUFhO0lBQ2IsdUNBQXVDO0lBQ3ZDLGlDQUFpQztJQUNqQywwQkFBMEI7SUFDMUIsNkJBQTZCO0lBQzdCLDZCQUE2QjtJQUM3QiwyQkFBMkI7Q0FDNUIsQ0FBQztBQUVGLFNBQVMsU0FBUyxDQUFDLFFBQTZCLEVBQUUsSUFBWSxFQUFFLEtBQTJCO0lBQ3pGLElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxPQUF3QjtRQUNqRCxJQUFNLElBQUksR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ1YsSUFBQSxLQUFtRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBdkUs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QUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLEVBQUE7O3dCQUFsRCxTQUFrRCxDQUFDO3dCQUNuRCxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsRUFBQTs7d0JBQXhELFNBQXdELENBQUM7d0JBQ3pELFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQyxFQUFBOzt3QkFBOUQsU0FBOEQsQ0FBQzs7Ozs7S0FDaEU7SUFDSCx1QkFBQztBQUFELENBQUMsQUFyVEQsSUFxVEM7QUFyVFksNENBQWdCO0FBdVQ3QixJQUFNLFVBQVUsR0FBeUIsRUFBRSxDQUFDO0FBRTVDLFNBQWdCLFdBQVcsQ0FBQyxNQUErQjtJQUN6RCxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksZ0JBQWdCLHVCQUN4QyxNQUFNLEtBQ1QsS0FBSyxFQUFFLElBQUksSUFDWCxDQUFDO0FBQ0wsQ0FBQztBQUxELGtDQUtDO0FBRUQsU0FBZ0IsaUJBQWlCLENBQUMsR0FBVztJQUMzQyxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRkQsOENBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEQVRBX1ZFUlNJT04sXG4gIExPR0lOVFlQRSxcbiAgZ2V0U2RrVmVyc2lvbixcbiAgZ2V0RW5kUG9pbnRcbn0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbW1vbic7XG5pbXBvcnQge1xuICBJUmVxdWVzdE9wdGlvbnMsXG4gIFNES1JlcXVlc3RJbnRlcmZhY2UsXG4gIFJlc3BvbnNlT2JqZWN0LFxuICBJVXBsb2FkUmVxdWVzdE9wdGlvbnMsXG4gIElSZXF1ZXN0Q29uZmlnXG59IGZyb20gJ0BjbG91ZGJhc2UvYWRhcHRlci1pbnRlcmZhY2UnO1xuaW1wb3J0IHsgdXRpbHMsIGFkYXB0ZXJzLCBjb25zdGFudHMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBLViB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuaW1wb3J0IHsgSUdldEFjY2Vzc1Rva2VuUmVzdWx0LCBJQ2xvdWRiYXNlUmVxdWVzdENvbmZpZywgSUFwcGVuZGVkUmVxdWVzdEluZm8sIElSZXF1ZXN0QmVmb3JlSG9vayB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVxdWVzdCc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ2FjaGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NhY2hlJztcbmltcG9ydCB7IGNsb3VkYmFzZSB9IGZyb20gJy4uJztcbmltcG9ydCB7IGdldENhY2hlQnlFbnZJZCwgZ2V0TG9jYWxDYWNoZSB9IGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IHsgRVZFTlRTIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cyc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vYWRhcHRlcic7XG5cbmNvbnN0IHsgRVJST1JTIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IGdlblNlcUlkLCBpc0Zvcm1EYXRhLCBmb3JtYXRVcmwsIGNyZWF0ZVNpZ24gfSA9IHV0aWxzO1xuY29uc3QgeyBSVU5USU1FIH0gPSBhZGFwdGVycztcblxuLy8g5LiL6Z2i5Yeg56eNIGFjdGlvbiDkuI3pnIDopoEgYWNjZXNzIHRva2VuXG5jb25zdCBBQ1RJT05TX1dJVEhPVVRfQUNDRVNTVE9LRU4gPSBbXG4gICdhdXRoLmdldEp3dCcsXG4gICdhdXRoLmxvZ291dCcsXG4gICdhdXRoLnNpZ25JbldpdGhUaWNrZXQnLFxuICAnYXV0aC5zaWduSW5Bbm9ueW1vdXNseScsXG4gICdhdXRoLnNpZ25JbicsXG4gICdhdXRoLmZldGNoQWNjZXNzVG9rZW5XaXRoUmVmcmVzaFRva2VuJyxcbiAgJ2F1dGguc2lnblVwV2l0aEVtYWlsQW5kUGFzc3dvcmQnLFxuICAnYXV0aC5hY3RpdmF0ZUVuZFVzZXJNYWlsJyxcbiAgJ2F1dGguc2VuZFBhc3N3b3JkUmVzZXRFbWFpbCcsXG4gICdhdXRoLnJlc2V0UGFzc3dvcmRXaXRoVG9rZW4nLFxuICAnYXV0aC5pc1VzZXJuYW1lUmVnaXN0ZXJlZCdcbl07XG5cbmZ1bmN0aW9uIGJpbmRIb29rcyhpbnN0YW5jZTogU0RLUmVxdWVzdEludGVyZmFjZSwgbmFtZTogc3RyaW5nLCBob29rczogSVJlcXVlc3RCZWZvcmVIb29rW10pIHtcbiAgY29uc3Qgb3JpZ2luTWV0aG9kID0gaW5zdGFuY2VbbmFtZV07XG4gIGluc3RhbmNlW25hbWVdID0gZnVuY3Rpb24gKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucykge1xuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBjb25zdCBoZWFkZXJzID0ge307XG4gICAgaG9va3MuZm9yRWFjaChob29rID0+IHtcbiAgICAgIGNvbnN0IHsgZGF0YTogYXBwZW5kZWREYXRhLCBoZWFkZXJzOiBhcHBlbmRlZEhlYWRlcnMgfSA9IGhvb2suY2FsbChpbnN0YW5jZSwgb3B0aW9ucyk7XG4gICAgICBPYmplY3QuYXNzaWduKGRhdGEsIGFwcGVuZGVkRGF0YSk7XG4gICAgICBPYmplY3QuYXNzaWduKGhlYWRlcnMsIGFwcGVuZGVkSGVhZGVycyk7XG4gICAgfSk7XG4gICAgY29uc3Qgb3JpZ2luRGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICBvcmlnaW5EYXRhICYmICgoKSA9PiB7XG4gICAgICBpZiAoaXNGb3JtRGF0YShvcmlnaW5EYXRhKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgKG9yaWdpbkRhdGEgYXMgRm9ybURhdGEpLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgb3B0aW9ucy5kYXRhID0ge1xuICAgICAgICAuLi5vcmlnaW5EYXRhLFxuICAgICAgICAuLi5kYXRhXG4gICAgICB9O1xuICAgIH0pKCk7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0ge1xuICAgICAgLi4uKG9wdGlvbnMuaGVhZGVycyB8fCB7fSksXG4gICAgICAuLi5oZWFkZXJzXG4gICAgfTtcbiAgICByZXR1cm4gKG9yaWdpbk1ldGhvZCBhcyBGdW5jdGlvbikuY2FsbChpbnN0YW5jZSwgb3B0aW9ucyk7XG4gIH07XG59XG5mdW5jdGlvbiBiZWZvcmVFYWNoKCk6IElBcHBlbmRlZFJlcXVlc3RJbmZvIHtcbiAgY29uc3Qgc2VxSWQgPSBnZW5TZXFJZCgpO1xuICByZXR1cm4ge1xuICAgIGRhdGE6IHtcbiAgICAgIHNlcUlkXG4gICAgfSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnWC1TREstVmVyc2lvbic6IGBAY2xvdWRiYXNlL2pzLXNkay8ke2dldFNka1ZlcnNpb24oKX1gLFxuICAgICAgJ3gtc2VxaWQnOiBzZXFJZFxuICAgIH1cbiAgfTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUNsb3VkYmFzZVJlcXVlc3Qge1xuICBwb3N0OiAob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKSA9PiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PjtcbiAgdXBsb2FkOiAob3B0aW9uczogSVVwbG9hZFJlcXVlc3RPcHRpb25zKSA9PiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PjtcbiAgZG93bmxvYWQ6IChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpID0+IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+O1xuICByZWZyZXNoQWNjZXNzVG9rZW46ICgpID0+IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PjtcbiAgZ2V0QWNjZXNzVG9rZW46ICgpID0+IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PjtcbiAgcmVxdWVzdDogKGFjdGlvbjogc3RyaW5nLCBwYXJhbXM6IEtWPGFueT4sIG9wdGlvbnM/OiBLVjxhbnk+KSA9PiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PjtcbiAgc2VuZDogKGFjdGlvbjogc3RyaW5nLCBkYXRhOiBLVjxhbnk+KSA9PiBQcm9taXNlPGFueT47XG59XG5cbi8qKlxuICogQGNsYXNzIENsb3VkYmFzZVJlcXVlc3RcbiAqL1xuZXhwb3J0IGNsYXNzIENsb3VkYmFzZVJlcXVlc3QgaW1wbGVtZW50cyBJQ2xvdWRiYXNlUmVxdWVzdCB7XG4gIGNvbmZpZzogSUNsb3VkYmFzZVJlcXVlc3RDb25maWc7XG4gIF9zaG91bGRSZWZyZXNoQWNjZXNzVG9rZW5Ib29rOiBGdW5jdGlvblxuICBfcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZTogUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+IHwgbnVsbFxuICBfcmVxQ2xhc3M6IFNES1JlcXVlc3RJbnRlcmZhY2U7XG4gIC8vIOivt+axguWksei0peaYr+WQpuaKm+WHukVycm9yXG4gIHByaXZhdGUgX3Rocm93V2hlblJlcXVlc3RGYWlsID0gZmFsc2U7XG4gIHByaXZhdGUgX2NhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG4gIC8vIOaMgeS5heWMluacrOWcsOWtmOWCqFxuICBwcml2YXRlIF9sb2NhbENhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG4gIC8qKlxuICAgKiDliJ3lp4vljJZcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJQ2xvdWRiYXNlUmVxdWVzdENvbmZpZyAmIHsgdGhyb3c/OiBib29sZWFuIH0pIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICB0aGlzLl9yZXFDbGFzcyA9IG5ldyBQbGF0Zm9ybS5hZGFwdGVyLnJlcUNsYXNzKDxJUmVxdWVzdENvbmZpZz57XG4gICAgICB0aW1lb3V0OiB0aGlzLmNvbmZpZy50aW1lb3V0LFxuICAgICAgdGltZW91dE1zZzogYFtAY2xvdWRiYXNlL2pzLXNka10g6K+35rGC5ZyoJHt0aGlzLmNvbmZpZy50aW1lb3V0IC8gMTAwMH1z5YaF5pyq5a6M5oiQ77yM5bey5Lit5patYCxcbiAgICAgIHJlc3RyaWN0ZWRNZXRob2RzOiBbJ3Bvc3QnXVxuICAgIH0pO1xuICAgIHRoaXMuX3Rocm93V2hlblJlcXVlc3RGYWlsID0gY29uZmlnLnRocm93IHx8IGZhbHNlO1xuICAgIHRoaXMuX2NhY2hlID0gZ2V0Q2FjaGVCeUVudklkKHRoaXMuY29uZmlnLmVudik7XG4gICAgdGhpcy5fbG9jYWxDYWNoZSA9IGdldExvY2FsQ2FjaGUodGhpcy5jb25maWcuZW52KTtcbiAgICBiaW5kSG9va3ModGhpcy5fcmVxQ2xhc3MsICdwb3N0JywgW2JlZm9yZUVhY2hdKTtcbiAgICBiaW5kSG9va3ModGhpcy5fcmVxQ2xhc3MsICd1cGxvYWQnLCBbYmVmb3JlRWFjaF0pO1xuICAgIGJpbmRIb29rcyh0aGlzLl9yZXFDbGFzcywgJ2Rvd25sb2FkJywgW2JlZm9yZUVhY2hdKTtcbiAgfVxuICBwdWJsaWMgYXN5bmMgcG9zdChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxQ2xhc3MucG9zdChvcHRpb25zKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIHB1YmxpYyBhc3luYyB1cGxvYWQob3B0aW9uczogSVVwbG9hZFJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxSZXNwb25zZU9iamVjdD4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX3JlcUNsYXNzLnVwbG9hZChvcHRpb25zKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIHB1YmxpYyBhc3luYyBkb3dubG9hZChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxQ2xhc3MuZG93bmxvYWQob3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZWZyZXNoQWNjZXNzVG9rZW4oKTogUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+IHtcbiAgICAvLyDlj6/og73kvJrlkIzml7bosIPnlKjlpJrmrKHliLfmlrBhY2Nlc3MgdG9rZW7vvIzov5nph4zmiorlroPku6zlkIjlubbmiJDkuIDkuKpcbiAgICBpZiAoIXRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UpIHtcbiAgICAgIC8vIOayoeacieato+WcqOWIt+aWsO+8jOmCo+S5iOato+W4uOaJp+ihjOWIt+aWsOmAu+i+kVxuICAgICAgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZSA9IHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQ7XG4gICAgbGV0IGVycjtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlcnIgPSBlO1xuICAgIH1cbiAgICB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlID0gbnVsbDtcbiAgICB0aGlzLl9zaG91bGRSZWZyZXNoQWNjZXNzVG9rZW5Ib29rID0gbnVsbDtcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyDojrflj5ZhY2Nlc3MgdG9rZW5cbiAgcHVibGljIGFzeW5jIGdldEFjY2Vzc1Rva2VuKCk6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXksIHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgaWYgKCFyZWZyZXNoVG9rZW4pIHtcbiAgICAgIC8vIOS4jeivpeWHuueOsOeahOeKtuaAge+8muaciSBhY2Nlc3MgdG9rZW4g5Y205rKh5pyJIHJlZnJlc2ggdG9rZW5cbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5PUEVSQVRJT05fRkFJTCxcbiAgICAgICAgbXNnOiAncmVmcmVzaCB0b2tlbiBpcyBub3QgZXhpc3QsIHlvdXIgbG9jYWwgZGF0YSBtaWdodCBiZSBtZXNzZWQgdXAsIHBsZWFzZSByZXRyeSBhZnRlciBjbGVhciBsb2NhbFN0b3JhZ2Ugb3Igc2Vzc2lvblN0b3JhZ2UnXG4gICAgICB9KSk7XG4gICAgfVxuICAgIC8vIOWmguaenOayoeaciWFjY2VzcyB0b2tlbuaIluiAhei/h+acn++8jOmCo+S5iOWIt+aWsFxuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW5FeHBpcmUgPSBOdW1iZXIoYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSkpO1xuXG4gICAgLy8g6LCD55So6ZKp5a2Q5Ye95pWwXG4gICAgbGV0IHNob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbiA9IHRydWU7XG4gICAgaWYgKHRoaXMuX3Nob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbkhvb2sgJiYgIShhd2FpdCB0aGlzLl9zaG91bGRSZWZyZXNoQWNjZXNzVG9rZW5Ib29rKGFjY2Vzc1Rva2VuLCBhY2Nlc3NUb2tlbkV4cGlyZSkpKSB7XG4gICAgICBzaG91bGRSZWZyZXNoQWNjZXNzVG9rZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoKCFhY2Nlc3NUb2tlbiB8fCAhYWNjZXNzVG9rZW5FeHBpcmUgfHwgYWNjZXNzVG9rZW5FeHBpcmUgPCBEYXRlLm5vdygpKSAmJiBzaG91bGRSZWZyZXNoQWNjZXNzVG9rZW4pIHtcbiAgICAgIC8vIOi/lOWbnuaWsOeahGFjY2VzcyB0b2xlblxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVmcmVzaEFjY2Vzc1Rva2VuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOi/lOWbnuacrOWcsOeahGFjY2VzcyB0b2tlblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWNjZXNzVG9rZW4sXG4gICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbiAgcHVibGljIGFzeW5jIHJlcXVlc3QoYWN0aW9uOiBzdHJpbmcsIHBhcmFtczogS1Y8YW55Piwgb3B0aW9ucz86IEtWPGFueT4pOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgdGNiVHJhY2VLZXkgPSBgeC10Y2ItdHJhY2VfJHt0aGlzLmNvbmZpZy5lbnZ9YDtcbiAgICBsZXQgY29udGVudFR5cGUgPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJztcbiAgICAvLyBjb25zdCB3ZWJEZXZpY2VJZCA9IGF3YWl0IGdldFRjYkZpbmdlcnByaW50SWQoKTtcbiAgICBjb25zdCB0bXBPYmo6IEtWPGFueT4gPSB7XG4gICAgICBhY3Rpb24sXG4gICAgICAvLyB3ZWJEZXZpY2VJZCxcbiAgICAgIGRhdGFWZXJzaW9uOiBEQVRBX1ZFUlNJT04sXG4gICAgICBlbnY6IHRoaXMuY29uZmlnLmVudixcbiAgICAgIC4uLnBhcmFtc1xuICAgIH07XG5cblxuICAgIGlmIChBQ1RJT05TX1dJVEhPVVRfQUNDRVNTVE9LRU4uaW5kZXhPZihhY3Rpb24pID09PSAtMSkge1xuICAgICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG5cbiAgICAgIC8vIOiLpeaciSByZWZyZXNoVG9rZW4g5YiZ5Lu75Yqh5pyJ55m75b2V5oCBIOWItyBhY2Nlc3NUb2tlblxuICAgICAgY29uc3QgcmVmcmVzaFRva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgICAgaWYgKHJlZnJlc2hUb2tlbikge1xuICAgICAgICB0bXBPYmouYWNjZXNzX3Rva2VuID0gKGF3YWl0IHRoaXMuZ2V0QWNjZXNzVG9rZW4oKSkuYWNjZXNzVG9rZW47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8g5ou8Ym9keeWSjGNvbnRlbnQtdHlwZVxuICAgIGxldCBwYXlsb2FkO1xuICAgIGlmIChhY3Rpb24gPT09ICdzdG9yYWdlLnVwbG9hZEZpbGUnKSB7XG4gICAgICBwYXlsb2FkID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gcGF5bG9hZCkge1xuICAgICAgICBpZiAocGF5bG9hZC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHBheWxvYWRba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcGF5bG9hZC5hcHBlbmQoa2V5LCB0bXBPYmpba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnRlbnRUeXBlID0gJ211bHRpcGFydC9mb3JtLWRhdGEnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50VHlwZSA9ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnO1xuICAgICAgcGF5bG9hZCA9IHt9O1xuICAgICAgZm9yIChsZXQga2V5IGluIHRtcE9iaikge1xuICAgICAgICBpZiAodG1wT2JqW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHBheWxvYWRba2V5XSA9IHRtcE9ialtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBvcHRzOiBhbnkgPSB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdjb250ZW50LXR5cGUnOiBjb250ZW50VHlwZVxuICAgICAgfVxuICAgIH07XG4gICAgaWYgKG9wdGlvbnM/Llsnb25VcGxvYWRQcm9ncmVzcyddKSB7XG4gICAgICBvcHRzLm9uVXBsb2FkUHJvZ3Jlc3MgPSBvcHRpb25zWydvblVwbG9hZFByb2dyZXNzJ107XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLnJlZ2lvbikge1xuICAgICAgb3B0cy5oZWFkZXJzWydYLVRDQi1SZWdpb24nXSA9IHRoaXMuY29uZmlnLnJlZ2lvbjtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFjZUhlYWRlciA9IHRoaXMuX2xvY2FsQ2FjaGUuZ2V0U3RvcmUodGNiVHJhY2VLZXkpO1xuICAgIGlmICh0cmFjZUhlYWRlcikge1xuICAgICAgb3B0cy5oZWFkZXJzWydYLVRDQi1UcmFjZSddID0gdHJhY2VIZWFkZXI7XG4gICAgfVxuICAgIC8vIOmdnndlYuW5s+WPsOS9v+eUqOWHreivgeajgOmqjOacieaViOaAp1xuICAgIGlmIChQbGF0Zm9ybS5ydW50aW1lICE9PSBSVU5USU1FLldFQikge1xuICAgICAgY29uc3QgeyBhcHBTaWduLCBhcHBTZWNyZXQgfSA9IHRoaXMuY29uZmlnO1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgIGNvbnN0IHsgYXBwQWNjZXNzS2V5LCBhcHBBY2Nlc3NLZXlJZCB9ID0gYXBwU2VjcmV0O1xuICAgICAgY29uc3Qgc2lnbiA9IGNyZWF0ZVNpZ24oe1xuICAgICAgICBkYXRhOiB7fSwgLy8g5qCh6aqM562+5ZCN5rWB56iL5a6e6ZmF5pyq55So5Yiw77yM5Y+v6K6+56m6XG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgYXBwQWNjZXNzS2V5SWQsXG4gICAgICAgIGFwcFNpZ25cbiAgICAgIH0sIGFwcEFjY2Vzc0tleSk7XG5cbiAgICAgIG9wdHMuaGVhZGVyc1snWC1UQ0ItQXBwLVNvdXJjZSddID0gYHRpbWVzdGFtcD0ke3RpbWVzdGFtcH07YXBwQWNjZXNzS2V5SWQ9JHthcHBBY2Nlc3NLZXlJZH07YXBwU2lnbj0ke2FwcFNpZ259O3NpZ249JHtzaWdufWA7XG4gICAgfVxuXG4gICAgLy8g5Y+R5Ye66K+35rGCXG4gICAgLy8g5paw55qEIHVybCDpnIDopoHmkLrluKYgZW52IOWPguaVsOi/m+ihjCBDT1JTIOagoemqjFxuICAgIC8vIOivt+axgumTvuaOpeaUr+aMgea3u+WKoOWKqOaAgSBxdWVyeSDlj4LmlbDvvIzmlrnkvr/nlKjmiLfosIPor5XlrprkvY3or7fmsYJcbiAgICBjb25zdCB7IHBhcnNlLCBpblF1ZXJ5LCBzZWFyY2ggfSA9IHBhcmFtcztcbiAgICBsZXQgZm9ybWF0UXVlcnk6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7XG4gICAgICBlbnY6IHRoaXMuY29uZmlnLmVudlxuICAgIH07XG4gICAgLy8g5bCd6K+V6Kej5p6Q5ZON5bqU5pWw5o2u5Li6IEpTT05cbiAgICBwYXJzZSAmJiAoZm9ybWF0UXVlcnkucGFyc2UgPSB0cnVlKTtcbiAgICBpblF1ZXJ5ICYmIChmb3JtYXRRdWVyeSA9IHtcbiAgICAgIC4uLmluUXVlcnksXG4gICAgICAuLi5mb3JtYXRRdWVyeVxuICAgIH0pO1xuICAgIGNvbnN0IHsgQkFTRV9VUkwsIFBST1RPQ09MIH0gPSBnZXRFbmRQb2ludCgpO1xuICAgIC8vIOeUn+aIkOivt+axgiB1cmxcbiAgICBsZXQgbmV3VXJsID0gZm9ybWF0VXJsKFBST1RPQ09MLCBCQVNFX1VSTCwgZm9ybWF0UXVlcnkpO1xuXG4gICAgaWYgKHNlYXJjaCkge1xuICAgICAgbmV3VXJsICs9IHNlYXJjaDtcbiAgICB9XG5cbiAgICBjb25zdCByZXM6IFJlc3BvbnNlT2JqZWN0ID0gYXdhaXQgdGhpcy5wb3N0KHtcbiAgICAgIHVybDogbmV3VXJsLFxuICAgICAgZGF0YTogcGF5bG9hZCxcbiAgICAgIC4uLm9wdHNcbiAgICB9KTtcblxuICAgIC8vIOS/neWtmCB0cmFjZSBoZWFkZXJcbiAgICBjb25zdCByZXNUcmFjZUhlYWRlciA9IHJlcy5oZWFkZXIgJiYgcmVzLmhlYWRlclsneC10Y2ItdHJhY2UnXTtcbiAgICBpZiAocmVzVHJhY2VIZWFkZXIpIHtcbiAgICAgIHRoaXMuX2xvY2FsQ2FjaGUuc2V0U3RvcmUodGNiVHJhY2VLZXksIHJlc1RyYWNlSGVhZGVyKTtcbiAgICB9XG5cbiAgICBpZiAoKE51bWJlcihyZXMuc3RhdHVzKSAhPT0gMjAwICYmIE51bWJlcihyZXMuc3RhdHVzQ29kZSkgIT09IDIwMCkgfHwgIXJlcy5kYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25ldHdvcmsgcmVxdWVzdCBlcnJvcicpO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2VuZChhY3Rpb246IHN0cmluZywgZGF0YTogS1Y8YW55PiA9IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QoYWN0aW9uLCBkYXRhLCB7IG9uVXBsb2FkUHJvZ3Jlc3M6IGRhdGEub25VcGxvYWRQcm9ncmVzcyB9KTtcbiAgICBpZiAocmVzcG9uc2UuZGF0YS5jb2RlID09PSAnQUNDRVNTX1RPS0VOX0VYUElSRUQnICYmIEFDVElPTlNfV0lUSE9VVF9BQ0NFU1NUT0tFTi5pbmRleE9mKGFjdGlvbikgPT09IC0xKSB7XG4gICAgICAvLyBhY2Nlc3NfdG9rZW7ov4fmnJ/vvIzph43mlrDojrflj5ZcbiAgICAgIGF3YWl0IHRoaXMucmVmcmVzaEFjY2Vzc1Rva2VuKCk7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdChhY3Rpb24sIGRhdGEsIHsgb25VcGxvYWRQcm9ncmVzczogZGF0YS5vblVwbG9hZFByb2dyZXNzIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXNwb25zZS5kYXRhLmNvZGUgJiYgdGhpcy5fdGhyb3dXaGVuUmVxdWVzdEZhaWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5PUEVSQVRJT05fRkFJTCxcbiAgICAgICAgbXNnOiBgWyR7cmVzcG9uc2UuZGF0YS5jb2RlfV0gJHtyZXNwb25zZS5kYXRhLm1lc3NhZ2V9YFxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICB9XG5cbiAgLy8g6LCD55So5o6l5Y+j5Yi35pawYWNjZXNzIHRva2Vu77yM5bm25LiU6L+U5ZueXG4gIHByaXZhdGUgYXN5bmMgX3JlZnJlc2hBY2Nlc3NUb2tlbihyZXRyeU51bSA9IDEpOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4ge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuRXhwaXJlS2V5LCByZWZyZXNoVG9rZW5LZXksIGxvZ2luVHlwZUtleSwgYW5vbnltb3VzVXVpZEtleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5KTtcblxuICAgIGxldCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgaWYgKCFyZWZyZXNoVG9rZW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX09QRVJBVElPTixcbiAgICAgICAgbXNnOiAnbm90IGxvZ2luJ1xuICAgICAgfSkpO1xuICAgIH1cbiAgICBjb25zdCBwYXJhbXM6IEtWPHN0cmluZz4gPSB7XG4gICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW5cbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdhdXRoLmZldGNoQWNjZXNzVG9rZW5XaXRoUmVmcmVzaFRva2VuJywgcGFyYW1zKTtcbiAgICBpZiAocmVzcG9uc2UuZGF0YS5jb2RlKSB7XG4gICAgICBjb25zdCB7IGNvZGUgfSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICBpZiAoY29kZSA9PT0gJ1NJR05fUEFSQU1fSU5WQUxJRCcgfHwgY29kZSA9PT0gJ1JFRlJFU0hfVE9LRU5fRVhQSVJFRCcgfHwgY29kZSA9PT0gJ0lOVkFMSURfUkVGUkVTSF9UT0tFTicpIHtcbiAgICAgICAgLy8g6L+Z6YeM5aSE55CG5Lul5LiL6YC76L6R77yaXG4gICAgICAgIC8vIOWMv+WQjeeZu+W9leaXtu+8jOWmguaenOWIt+aWsGFjY2VzcyB0b2tlbuaKpemUmXJlZnJlc2ggdG9rZW7ov4fmnJ/vvIzmraTml7blupTor6XvvJpcbiAgICAgICAgLy8gMS4g5YaN55SoIHV1aWQg5ou/5LiA5qyh5paw55qEcmVmcmVzaCB0b2tlblxuICAgICAgICAvLyAyLiDmi7/mlrDnmoRyZWZyZXNoIHRva2Vu5o2iYWNjZXNzIHRva2VuXG4gICAgICAgIGNvbnN0IGlzQW5vbnltb3VzID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhsb2dpblR5cGVLZXkpID09PSBMT0dJTlRZUEUuQU5PTllNT1VTO1xuICAgICAgICBpZiAoaXNBbm9ueW1vdXMgJiYgY29kZSA9PT0gJ0lOVkFMSURfUkVGUkVTSF9UT0tFTicpIHtcbiAgICAgICAgICAvLyDojrflj5bmlrDnmoQgcmVmcmVzaCB0b2tlblxuICAgICAgICAgIGNvbnN0IGFub255bW91c191dWlkID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhhbm9ueW1vdXNVdWlkS2V5KTtcbiAgICAgICAgICAvLyDmraTlpIRjYWNoZeS4uuWfuuexu3Byb3BlcnR5XG4gICAgICAgICAgY29uc3QgcmVmcmVzaF90b2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLnNlbmQoJ2F1dGguc2lnbkluQW5vbnltb3VzbHknLCB7XG4gICAgICAgICAgICBhbm9ueW1vdXNfdXVpZCxcbiAgICAgICAgICAgIHJlZnJlc2hfdG9rZW5cbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLl9zZXRSZWZyZXNoVG9rZW4ocmVzLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgICAgIGlmIChyZXRyeU51bSA+PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuKC0tcmV0cnlOdW0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICBjb2RlOiBFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ+mHjeivleiOt+WPliByZWZyZXNoIHRva2VuIOWksei0pSdcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2xvdWRiYXNlLmZpcmUoRVZFTlRTLkxPR0lOX1NUQVRFX0VYUElSRUQpO1xuICAgICAgICBhd2FpdCB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuTkVUV09SS19FUlJPUixcbiAgICAgICAgbXNnOiBgcmVmcmVzaCBhY2Nlc3NfdG9rZW4gZmFpbGVk77yaJHtyZXNwb25zZS5kYXRhLmNvZGV9YFxuICAgICAgfSkpO1xuICAgIH1cbiAgICBpZiAocmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgIGNsb3VkYmFzZS5maXJlKEVWRU5UUy5BQ0NFU1NfVE9LRU5fUkVGUkVTSEQpO1xuICAgICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSwgcmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW4pO1xuICAgICAgLy8g5pys5Zyw5pe26Ze05Y+v6IO95rKh5pyJ5ZCM5q2lXG4gICAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5LCByZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbl9leHBpcmUgKyBEYXRlLm5vdygpKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjY2Vzc1Rva2VuOiByZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbixcbiAgICAgICAgYWNjZXNzVG9rZW5FeHBpcmU6IHJlc3BvbnNlLmRhdGEuYWNjZXNzX3Rva2VuX2V4cGlyZVxuICAgICAgfTtcbiAgICB9XG4gICAgLy8g5Yy/5ZCN55m75b2VcmVmcmVzaF90b2tlbui/h+acn+aDheWGteS4i+i/lOWbnnJlZnJlc2hfdG9rZW5cbiAgICAvLyDmraTlnLrmma/kuIvkvb/nlKjmlrDnmoRyZWZyZXNoX3Rva2Vu6I635Y+WYWNjZXNzX3Rva2VuXG4gICAgaWYgKHJlc3BvbnNlLmRhdGEucmVmcmVzaF90b2tlbikge1xuICAgICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXksIHJlc3BvbnNlLmRhdGEucmVmcmVzaF90b2tlbik7XG4gICAgICBhd2FpdCB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW4oKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBhc3luYyBfc2V0UmVmcmVzaFRva2VuKHJlZnJlc2hUb2tlbjogc3RyaW5nKSB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXksIHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICAvLyByZWZyZXNoIHRva2Vu6K6+572u5YmN77yM5YWI5riF5o6JIGFjY2VzcyB0b2tlblxuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5LCByZWZyZXNoVG9rZW4pO1xuICB9XG59XG5cbmNvbnN0IHJlcXVlc3RNYXA6IEtWPENsb3VkYmFzZVJlcXVlc3Q+ID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0UmVxdWVzdChjb25maWc6IElDbG91ZGJhc2VSZXF1ZXN0Q29uZmlnKSB7XG4gIHJlcXVlc3RNYXBbY29uZmlnLmVudl0gPSBuZXcgQ2xvdWRiYXNlUmVxdWVzdCh7XG4gICAgLi4uY29uZmlnLFxuICAgIHRocm93OiB0cnVlXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVxdWVzdEJ5RW52SWQoZW52OiBzdHJpbmcpOiBDbG91ZGJhc2VSZXF1ZXN0IHtcbiAgcmV0dXJuIHJlcXVlc3RNYXBbZW52XTtcbn0iXX0=