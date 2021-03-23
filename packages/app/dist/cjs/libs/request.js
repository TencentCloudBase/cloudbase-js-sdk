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
                                data: payload,
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
<<<<<<< HEAD
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWJzL3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FLNkI7QUFRN0Isa0RBQWdFO0FBSWhFLHdCQUErQjtBQUMvQixpQ0FBd0Q7QUFDeEQsOENBQTZDO0FBQzdDLHFDQUFxQztBQUU3QixJQUFBLE1BQU0sR0FBSyxxQkFBUyxPQUFkLENBQWU7QUFDckIsSUFBQSxRQUFRLEdBQXFDLGlCQUFLLFNBQTFDLEVBQUMsVUFBVSxHQUEwQixpQkFBSyxXQUEvQixFQUFDLFNBQVMsR0FBZ0IsaUJBQUssVUFBckIsRUFBQyxVQUFVLEdBQUssaUJBQUssV0FBVixDQUFXO0FBQ25ELElBQUEsT0FBTyxHQUFLLG9CQUFRLFFBQWIsQ0FBYztBQUc3QixJQUFNLDJCQUEyQixHQUFHO0lBQ2xDLGFBQWE7SUFDYixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLHdCQUF3QjtJQUN4QixhQUFhO0lBQ2IsdUNBQXVDO0lBQ3ZDLGlDQUFpQztJQUNqQywwQkFBMEI7SUFDMUIsNkJBQTZCO0lBQzdCLDZCQUE2QjtJQUM3QiwyQkFBMkI7Q0FDNUIsQ0FBQztBQUVGLFNBQVMsU0FBUyxDQUFDLFFBQTZCLEVBQUMsSUFBWSxFQUFDLEtBQTJCO0lBQ3ZGLElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBUyxPQUF3QjtRQUNoRCxJQUFNLElBQUksR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ1YsSUFBQSxLQUFrRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQyxPQUFPLENBQUMsRUFBckUs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QUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLEVBQUE7O3dCQUFsRCxTQUFrRCxDQUFDO3dCQUNuRCxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsRUFBQTs7d0JBQXhELFNBQXdELENBQUM7d0JBQ3pELFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFDLFlBQVksQ0FBQyxFQUFBOzt3QkFBN0QsU0FBNkQsQ0FBQzs7Ozs7S0FDL0Q7SUFDSCx1QkFBQztBQUFELENBQUMsQUFyVEQsSUFxVEM7QUFyVFksNENBQWdCO0FBdVQ3QixJQUFNLFVBQVUsR0FBeUIsRUFBRSxDQUFDO0FBRTVDLFNBQWdCLFdBQVcsQ0FBQyxNQUErQjtJQUN6RCxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksZ0JBQWdCLHVCQUN4QyxNQUFNLEtBQ1QsS0FBSyxFQUFFLElBQUksSUFDWCxDQUFDO0FBQ0wsQ0FBQztBQUxELGtDQUtDO0FBRUQsU0FBZ0IsaUJBQWlCLENBQUMsR0FBVztJQUMzQyxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRkQsOENBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEQVRBX1ZFUlNJT04sXG4gIExPR0lOVFlQRSxcbiAgZ2V0U2RrVmVyc2lvbixcbiAgZ2V0RW5kUG9pbnRcbn0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbW1vbic7XG5pbXBvcnQge1xuICBJUmVxdWVzdE9wdGlvbnMsXG4gIFNES1JlcXVlc3RJbnRlcmZhY2UsXG4gIFJlc3BvbnNlT2JqZWN0LFxuICBJVXBsb2FkUmVxdWVzdE9wdGlvbnMsXG4gIElSZXF1ZXN0Q29uZmlnXG59IGZyb20gJ0BjbG91ZGJhc2UvYWRhcHRlci1pbnRlcmZhY2UnO1xuaW1wb3J0IHsgdXRpbHMsYWRhcHRlcnMsY29uc3RhbnRzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgS1YgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcbmltcG9ydCB7IElHZXRBY2Nlc3NUb2tlblJlc3VsdCxJQ2xvdWRiYXNlUmVxdWVzdENvbmZpZyxJQXBwZW5kZWRSZXF1ZXN0SW5mbyxJUmVxdWVzdEJlZm9yZUhvb2sgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL3JlcXVlc3QnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNhY2hlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSc7XG5pbXBvcnQgeyBjbG91ZGJhc2UgfSBmcm9tICcuLic7XG5pbXBvcnQgeyBnZXRDYWNoZUJ5RW52SWQsZ2V0TG9jYWxDYWNoZSB9IGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IHsgRVZFTlRTIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cyc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vYWRhcHRlcic7XG5cbmNvbnN0IHsgRVJST1JTIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IGdlblNlcUlkLGlzRm9ybURhdGEsZm9ybWF0VXJsLGNyZWF0ZVNpZ24gfSA9IHV0aWxzO1xuY29uc3QgeyBSVU5USU1FIH0gPSBhZGFwdGVycztcblxuLy8g5LiL6Z2i5Yeg56eNIGFjdGlvbiDkuI3pnIDopoEgYWNjZXNzIHRva2VuXG5jb25zdCBBQ1RJT05TX1dJVEhPVVRfQUNDRVNTVE9LRU4gPSBbXG4gICdhdXRoLmdldEp3dCcsXG4gICdhdXRoLmxvZ291dCcsXG4gICdhdXRoLnNpZ25JbldpdGhUaWNrZXQnLFxuICAnYXV0aC5zaWduSW5Bbm9ueW1vdXNseScsXG4gICdhdXRoLnNpZ25JbicsXG4gICdhdXRoLmZldGNoQWNjZXNzVG9rZW5XaXRoUmVmcmVzaFRva2VuJyxcbiAgJ2F1dGguc2lnblVwV2l0aEVtYWlsQW5kUGFzc3dvcmQnLFxuICAnYXV0aC5hY3RpdmF0ZUVuZFVzZXJNYWlsJyxcbiAgJ2F1dGguc2VuZFBhc3N3b3JkUmVzZXRFbWFpbCcsXG4gICdhdXRoLnJlc2V0UGFzc3dvcmRXaXRoVG9rZW4nLFxuICAnYXV0aC5pc1VzZXJuYW1lUmVnaXN0ZXJlZCdcbl07XG5cbmZ1bmN0aW9uIGJpbmRIb29rcyhpbnN0YW5jZTogU0RLUmVxdWVzdEludGVyZmFjZSxuYW1lOiBzdHJpbmcsaG9va3M6IElSZXF1ZXN0QmVmb3JlSG9va1tdKSB7XG4gIGNvbnN0IG9yaWdpbk1ldGhvZCA9IGluc3RhbmNlW25hbWVdO1xuICBpbnN0YW5jZVtuYW1lXSA9IGZ1bmN0aW9uKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucykge1xuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBjb25zdCBoZWFkZXJzID0ge307XG4gICAgaG9va3MuZm9yRWFjaChob29rID0+IHtcbiAgICAgIGNvbnN0IHsgZGF0YTogYXBwZW5kZWREYXRhLGhlYWRlcnM6IGFwcGVuZGVkSGVhZGVycyB9ID0gaG9vay5jYWxsKGluc3RhbmNlLG9wdGlvbnMpO1xuICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLGFwcGVuZGVkRGF0YSk7XG4gICAgICBPYmplY3QuYXNzaWduKGhlYWRlcnMsYXBwZW5kZWRIZWFkZXJzKTtcbiAgICB9KTtcbiAgICBjb25zdCBvcmlnaW5EYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgIG9yaWdpbkRhdGEgJiYgKCgpID0+IHtcbiAgICAgIGlmKGlzRm9ybURhdGEob3JpZ2luRGF0YSkpIHtcbiAgICAgICAgZm9yKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgKG9yaWdpbkRhdGEgYXMgRm9ybURhdGEpLmFwcGVuZChrZXksZGF0YVtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBvcHRpb25zLmRhdGEgPSB7XG4gICAgICAgIC4uLm9yaWdpbkRhdGEsXG4gICAgICAgIC4uLmRhdGFcbiAgICAgIH07XG4gICAgfSkoKTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB7XG4gICAgICAuLi4ob3B0aW9ucy5oZWFkZXJzIHx8IHt9KSxcbiAgICAgIC4uLmhlYWRlcnNcbiAgICB9O1xuICAgIHJldHVybiAob3JpZ2luTWV0aG9kIGFzIEZ1bmN0aW9uKS5jYWxsKGluc3RhbmNlLG9wdGlvbnMpO1xuICB9O1xufVxuZnVuY3Rpb24gYmVmb3JlRWFjaCgpOiBJQXBwZW5kZWRSZXF1ZXN0SW5mbyB7XG4gIGNvbnN0IHNlcUlkID0gZ2VuU2VxSWQoKTtcbiAgcmV0dXJuIHtcbiAgICBkYXRhOiB7XG4gICAgICBzZXFJZFxuICAgIH0sXG4gICAgaGVhZGVyczoge1xuICAgICAgJ1gtU0RLLVZlcnNpb24nOiBgQGNsb3VkYmFzZS9qcy1zZGsvJHtnZXRTZGtWZXJzaW9uKCl9YCxcbiAgICAgICd4LXNlcWlkJzogc2VxSWRcbiAgICB9XG4gIH07XG59XG5leHBvcnQgaW50ZXJmYWNlIElDbG91ZGJhc2VSZXF1ZXN0IHtcbiAgcG9zdDogKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucykgPT4gUHJvbWlzZTxSZXNwb25zZU9iamVjdD47XG4gIHVwbG9hZDogKG9wdGlvbnM6IElVcGxvYWRSZXF1ZXN0T3B0aW9ucykgPT4gUHJvbWlzZTxSZXNwb25zZU9iamVjdD47XG4gIGRvd25sb2FkOiAob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKSA9PiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PjtcbiAgcmVmcmVzaEFjY2Vzc1Rva2VuOiAoKSA9PiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD47XG4gIGdldEFjY2Vzc1Rva2VuOiAoKSA9PiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD47XG4gIHJlcXVlc3Q6IChhY3Rpb246IHN0cmluZyxwYXJhbXM6IEtWPGFueT4sb3B0aW9ucz86IEtWPGFueT4pID0+IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+O1xuICBzZW5kOiAoYWN0aW9uOiBzdHJpbmcsZGF0YTogS1Y8YW55PikgPT4gUHJvbWlzZTxhbnk+O1xufVxuXG4vKipcbiAqIEBjbGFzcyBDbG91ZGJhc2VSZXF1ZXN0XG4gKi9cbmV4cG9ydCBjbGFzcyBDbG91ZGJhc2VSZXF1ZXN0IGltcGxlbWVudHMgSUNsb3VkYmFzZVJlcXVlc3Qge1xuICBjb25maWc6IElDbG91ZGJhc2VSZXF1ZXN0Q29uZmlnO1xuICBfc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuSG9vazogRnVuY3Rpb25cbiAgX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2U6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB8IG51bGxcbiAgX3JlcUNsYXNzOiBTREtSZXF1ZXN0SW50ZXJmYWNlO1xuICAvLyDor7fmsYLlpLHotKXmmK/lkKbmipvlh7pFcnJvclxuICBwcml2YXRlIF90aHJvd1doZW5SZXF1ZXN0RmFpbCA9IGZhbHNlO1xuICBwcml2YXRlIF9jYWNoZTogSUNsb3VkYmFzZUNhY2hlO1xuICAvLyDmjIHkuYXljJbmnKzlnLDlrZjlgqhcbiAgcHJpdmF0ZSBfbG9jYWxDYWNoZTogSUNsb3VkYmFzZUNhY2hlO1xuICAvKipcbiAgICog5Yid5aeL5YyWXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSUNsb3VkYmFzZVJlcXVlc3RDb25maWcgJiB7IHRocm93PzogYm9vbGVhbiB9KSB7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgdGhpcy5fcmVxQ2xhc3MgPSBuZXcgUGxhdGZvcm0uYWRhcHRlci5yZXFDbGFzcyg8SVJlcXVlc3RDb25maWc+e1xuICAgICAgdGltZW91dDogdGhpcy5jb25maWcudGltZW91dCxcbiAgICAgIHRpbWVvdXRNc2c6IGBbQGNsb3VkYmFzZS9qcy1zZGtdIOivt+axguWcqCR7dGhpcy5jb25maWcudGltZW91dCAvIDEwMDB9c+WGheacquWujOaIkO+8jOW3suS4reaWrWAsXG4gICAgICByZXN0cmljdGVkTWV0aG9kczogWydwb3N0J11cbiAgICB9KTtcbiAgICB0aGlzLl90aHJvd1doZW5SZXF1ZXN0RmFpbCA9IGNvbmZpZy50aHJvdyB8fCBmYWxzZTtcbiAgICB0aGlzLl9jYWNoZSA9IGdldENhY2hlQnlFbnZJZCh0aGlzLmNvbmZpZy5lbnYpO1xuICAgIHRoaXMuX2xvY2FsQ2FjaGUgPSBnZXRMb2NhbENhY2hlKHRoaXMuY29uZmlnLmVudik7XG4gICAgYmluZEhvb2tzKHRoaXMuX3JlcUNsYXNzLCdwb3N0JyxbYmVmb3JlRWFjaF0pO1xuICAgIGJpbmRIb29rcyh0aGlzLl9yZXFDbGFzcywndXBsb2FkJyxbYmVmb3JlRWFjaF0pO1xuICAgIGJpbmRIb29rcyh0aGlzLl9yZXFDbGFzcywnZG93bmxvYWQnLFtiZWZvcmVFYWNoXSk7XG4gIH1cbiAgcHVibGljIGFzeW5jIHBvc3Qob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxSZXNwb25zZU9iamVjdD4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX3JlcUNsYXNzLnBvc3Qob3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBwdWJsaWMgYXN5bmMgdXBsb2FkKG9wdGlvbnM6IElVcGxvYWRSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXFDbGFzcy51cGxvYWQob3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBwdWJsaWMgYXN5bmMgZG93bmxvYWQob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxSZXNwb25zZU9iamVjdD4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX3JlcUNsYXNzLmRvd25sb2FkKG9wdGlvbnMpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVmcmVzaEFjY2Vzc1Rva2VuKCk6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB7XG4gICAgLy8g5Y+v6IO95Lya5ZCM5pe26LCD55So5aSa5qyh5Yi35pawYWNjZXNzIHRva2Vu77yM6L+Z6YeM5oqK5a6D5Lus5ZCI5bm25oiQ5LiA5LiqXG4gICAgaWYoIXRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UpIHtcbiAgICAgIC8vIOayoeacieato+WcqOWIt+aWsO+8jOmCo+S5iOato+W4uOaJp+ihjOWIt+aWsOmAu+i+kVxuICAgICAgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZSA9IHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQ7XG4gICAgbGV0IGVycjtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGVyciA9IGU7XG4gICAgfVxuICAgIHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UgPSBudWxsO1xuICAgIHRoaXMuX3Nob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbkhvb2sgPSBudWxsO1xuICAgIGlmKGVycikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8g6I635Y+WYWNjZXNzIHRva2VuXG4gIHB1YmxpYyBhc3luYyBnZXRBY2Nlc3NUb2tlbigpOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4ge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW5LZXksYWNjZXNzVG9rZW5FeHBpcmVLZXkscmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZighcmVmcmVzaFRva2VuKSB7XG4gICAgICAvLyDkuI3or6Xlh7rnjrDnmoTnirbmgIHvvJrmnIkgYWNjZXNzIHRva2VuIOWNtOayoeaciSByZWZyZXNoIHRva2VuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsXG4gICAgICAgIG1zZzogJ3JlZnJlc2ggdG9rZW4gaXMgbm90IGV4aXN0LCB5b3VyIGxvY2FsIGRhdGEgbWlnaHQgYmUgbWVzc2VkIHVwLCBwbGVhc2UgcmV0cnkgYWZ0ZXIgY2xlYXIgbG9jYWxTdG9yYWdlIG9yIHNlc3Npb25TdG9yYWdlJ1xuICAgICAgfSkpO1xuICAgIH1cbiAgICAvLyDlpoLmnpzmsqHmnIlhY2Nlc3MgdG9rZW7miJbogIXov4fmnJ/vvIzpgqPkuYjliLfmlrBcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuRXhwaXJlID0gTnVtYmVyKGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpKTtcblxuICAgIC8vIOiwg+eUqOmSqeWtkOWHveaVsFxuICAgIGxldCBzaG91bGRSZWZyZXNoQWNjZXNzVG9rZW4gPSB0cnVlO1xuICAgIGlmKHRoaXMuX3Nob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbkhvb2sgJiYgIShhd2FpdCB0aGlzLl9zaG91bGRSZWZyZXNoQWNjZXNzVG9rZW5Ib29rKGFjY2Vzc1Rva2VuLGFjY2Vzc1Rva2VuRXhwaXJlKSkpIHtcbiAgICAgIHNob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmKCghYWNjZXNzVG9rZW4gfHwgIWFjY2Vzc1Rva2VuRXhwaXJlIHx8IGFjY2Vzc1Rva2VuRXhwaXJlIDwgRGF0ZS5ub3coKSkgJiYgc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuKSB7XG4gICAgICAvLyDov5Tlm57mlrDnmoRhY2Nlc3MgdG9sZW5cbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyDov5Tlm57mnKzlnLDnmoRhY2Nlc3MgdG9rZW5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjY2Vzc1Rva2VuLFxuICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyZVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG4gIHB1YmxpYyBhc3luYyByZXF1ZXN0KGFjdGlvbjogc3RyaW5nLHBhcmFtczogS1Y8YW55PixvcHRpb25zPzogS1Y8YW55Pik6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCB0Y2JUcmFjZUtleSA9IGB4LXRjYi10cmFjZV8ke3RoaXMuY29uZmlnLmVudn1gO1xuICAgIGxldCBjb250ZW50VHlwZSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnO1xuICAgIC8vIGNvbnN0IHdlYkRldmljZUlkID0gYXdhaXQgZ2V0VGNiRmluZ2VycHJpbnRJZCgpO1xuICAgIGNvbnN0IHRtcE9iajogS1Y8YW55PiA9IHtcbiAgICAgIGFjdGlvbixcbiAgICAgIC8vIHdlYkRldmljZUlkLFxuICAgICAgZGF0YVZlcnNpb246IERBVEFfVkVSU0lPTixcbiAgICAgIGVudjogdGhpcy5jb25maWcuZW52LFxuICAgICAgLi4ucGFyYW1zXG4gICAgfTtcblxuXG4gICAgaWYoQUNUSU9OU19XSVRIT1VUX0FDQ0VTU1RPS0VOLmluZGV4T2YoYWN0aW9uKSA9PT0gLTEpIHtcbiAgICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuXG4gICAgICAvLyDoi6XmnIkgcmVmcmVzaFRva2VuIOWImeS7u+WKoeacieeZu+W9leaAgSDliLcgYWNjZXNzVG9rZW5cbiAgICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICAgIGlmKHJlZnJlc2hUb2tlbikge1xuICAgICAgICB0bXBPYmouYWNjZXNzX3Rva2VuID0gKGF3YWl0IHRoaXMuZ2V0QWNjZXNzVG9rZW4oKSkuYWNjZXNzVG9rZW47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8g5ou8Ym9keeWSjGNvbnRlbnQtdHlwZVxuICAgIGxldCBwYXlsb2FkO1xuICAgIGlmKGFjdGlvbiA9PT0gJ3N0b3JhZ2UudXBsb2FkRmlsZScpIHtcbiAgICAgIHBheWxvYWQgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgIGZvcihsZXQga2V5IGluIHBheWxvYWQpIHtcbiAgICAgICAgaWYocGF5bG9hZC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHBheWxvYWRba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcGF5bG9hZC5hcHBlbmQoa2V5LHRtcE9ialtrZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29udGVudFR5cGUgPSAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRlbnRUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCc7XG4gICAgICBwYXlsb2FkID0ge307XG4gICAgICBmb3IobGV0IGtleSBpbiB0bXBPYmopIHtcbiAgICAgICAgaWYodG1wT2JqW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHBheWxvYWRba2V5XSA9IHRtcE9ialtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBvcHRzOiBhbnkgPSB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdjb250ZW50LXR5cGUnOiBjb250ZW50VHlwZVxuICAgICAgfVxuICAgIH07XG4gICAgaWYob3B0aW9ucyA/Llsnb25VcGxvYWRQcm9ncmVzcyddKSB7XG4gICAgICBvcHRzLm9uVXBsb2FkUHJvZ3Jlc3MgPSBvcHRpb25zWydvblVwbG9hZFByb2dyZXNzJ107XG4gICAgfVxuXG4gICAgaWYodGhpcy5jb25maWcucmVnaW9uKSB7XG4gICAgICBvcHRzLmhlYWRlcnNbJ1gtVENCLVJlZ2lvbiddID0gdGhpcy5jb25maWcucmVnaW9uO1xuICAgIH1cblxuICAgIGNvbnN0IHRyYWNlSGVhZGVyID0gdGhpcy5fbG9jYWxDYWNoZS5nZXRTdG9yZSh0Y2JUcmFjZUtleSk7XG4gICAgaWYodHJhY2VIZWFkZXIpIHtcbiAgICAgIG9wdHMuaGVhZGVyc1snWC1UQ0ItVHJhY2UnXSA9IHRyYWNlSGVhZGVyO1xuICAgIH1cbiAgICAvLyDpnZ53ZWLlubPlj7Dkvb/nlKjlh63or4Hmo4DpqozmnInmlYjmgKdcbiAgICBpZihQbGF0Zm9ybS5ydW50aW1lICE9PSBSVU5USU1FLldFQikge1xuICAgICAgY29uc3QgeyBhcHBTaWduLGFwcFNlY3JldCB9ID0gdGhpcy5jb25maWc7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgeyBhcHBBY2Nlc3NLZXksYXBwQWNjZXNzS2V5SWQgfSA9IGFwcFNlY3JldDtcbiAgICAgIGNvbnN0IHNpZ24gPSBjcmVhdGVTaWduKHtcbiAgICAgICAgZGF0YTogcGF5bG9hZCxcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICBhcHBBY2Nlc3NLZXlJZCxcbiAgICAgICAgYXBwU2lnblxuICAgICAgfSxhcHBBY2Nlc3NLZXkpO1xuXG4gICAgICBvcHRzLmhlYWRlcnNbJ1gtVENCLUFwcC1Tb3VyY2UnXSA9IGB0aW1lc3RhbXA9JHt0aW1lc3RhbXB9O2FwcEFjY2Vzc0tleUlkPSR7YXBwQWNjZXNzS2V5SWR9O2FwcFNpZ249JHthcHBTaWdufTtzaWduPSR7c2lnbn1gO1xuICAgIH1cblxuICAgIC8vIOWPkeWHuuivt+axglxuICAgIC8vIOaWsOeahCB1cmwg6ZyA6KaB5pC65bimIGVudiDlj4LmlbDov5vooYwgQ09SUyDmoKHpqoxcbiAgICAvLyDor7fmsYLpk77mjqXmlK/mjIHmt7vliqDliqjmgIEgcXVlcnkg5Y+C5pWw77yM5pa55L6/55So5oi36LCD6K+V5a6a5L2N6K+35rGCXG4gICAgY29uc3QgeyBwYXJzZSxpblF1ZXJ5LHNlYXJjaCB9ID0gcGFyYW1zO1xuICAgIGxldCBmb3JtYXRRdWVyeTogUmVjb3JkPHN0cmluZyxhbnk+ID0ge1xuICAgICAgZW52OiB0aGlzLmNvbmZpZy5lbnZcbiAgICB9O1xuICAgIC8vIOWwneivleino+aekOWTjeW6lOaVsOaNruS4uiBKU09OXG4gICAgcGFyc2UgJiYgKGZvcm1hdFF1ZXJ5LnBhcnNlID0gdHJ1ZSk7XG4gICAgaW5RdWVyeSAmJiAoZm9ybWF0UXVlcnkgPSB7XG4gICAgICAuLi5pblF1ZXJ5LFxuICAgICAgLi4uZm9ybWF0UXVlcnlcbiAgICB9KTtcbiAgICBjb25zdCB7IEJBU0VfVVJMLFBST1RPQ09MIH0gPSBnZXRFbmRQb2ludCgpO1xuICAgIC8vIOeUn+aIkOivt+axgiB1cmxcbiAgICBsZXQgbmV3VXJsID0gZm9ybWF0VXJsKFBST1RPQ09MLEJBU0VfVVJMLGZvcm1hdFF1ZXJ5KTtcblxuICAgIGlmKHNlYXJjaCkge1xuICAgICAgbmV3VXJsICs9IHNlYXJjaDtcbiAgICB9XG5cbiAgICBjb25zdCByZXM6IFJlc3BvbnNlT2JqZWN0ID0gYXdhaXQgdGhpcy5wb3N0KHtcbiAgICAgIHVybDogbmV3VXJsLFxuICAgICAgZGF0YTogcGF5bG9hZCxcbiAgICAgIC4uLm9wdHNcbiAgICB9KTtcblxuICAgIC8vIOS/neWtmCB0cmFjZSBoZWFkZXJcbiAgICBjb25zdCByZXNUcmFjZUhlYWRlciA9IHJlcy5oZWFkZXIgJiYgcmVzLmhlYWRlclsneC10Y2ItdHJhY2UnXTtcbiAgICBpZihyZXNUcmFjZUhlYWRlcikge1xuICAgICAgdGhpcy5fbG9jYWxDYWNoZS5zZXRTdG9yZSh0Y2JUcmFjZUtleSxyZXNUcmFjZUhlYWRlcik7XG4gICAgfVxuXG4gICAgaWYoKE51bWJlcihyZXMuc3RhdHVzKSAhPT0gMjAwICYmIE51bWJlcihyZXMuc3RhdHVzQ29kZSkgIT09IDIwMCkgfHwgIXJlcy5kYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25ldHdvcmsgcmVxdWVzdCBlcnJvcicpO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2VuZChhY3Rpb246IHN0cmluZyxkYXRhOiBLVjxhbnk+ID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdChhY3Rpb24sZGF0YSx7IG9uVXBsb2FkUHJvZ3Jlc3M6IGRhdGEub25VcGxvYWRQcm9ncmVzcyB9KTtcbiAgICBpZihyZXNwb25zZS5kYXRhLmNvZGUgPT09ICdBQ0NFU1NfVE9LRU5fRVhQSVJFRCcgJiYgQUNUSU9OU19XSVRIT1VUX0FDQ0VTU1RPS0VOLmluZGV4T2YoYWN0aW9uKSA9PT0gLTEpIHtcbiAgICAgIC8vIGFjY2Vzc190b2tlbui/h+acn++8jOmHjeaWsOiOt+WPllxuICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoQWNjZXNzVG9rZW4oKTtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0KGFjdGlvbixkYXRhLHsgb25VcGxvYWRQcm9ncmVzczogZGF0YS5vblVwbG9hZFByb2dyZXNzIH0pO1xuICAgIH1cblxuICAgIGlmKHJlc3BvbnNlLmRhdGEuY29kZSAmJiB0aGlzLl90aHJvd1doZW5SZXF1ZXN0RmFpbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLk9QRVJBVElPTl9GQUlMLFxuICAgICAgICBtc2c6IGBbJHtyZXNwb25zZS5kYXRhLmNvZGV9XSAke3Jlc3BvbnNlLmRhdGEubWVzc2FnZX1gXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gIH1cblxuICAvLyDosIPnlKjmjqXlj6PliLfmlrBhY2Nlc3MgdG9rZW7vvIzlubbkuJTov5Tlm55cbiAgcHJpdmF0ZSBhc3luYyBfcmVmcmVzaEFjY2Vzc1Rva2VuKHJldHJ5TnVtID0gMSk6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbktleSxhY2Nlc3NUb2tlbkV4cGlyZUtleSxyZWZyZXNoVG9rZW5LZXksbG9naW5UeXBlS2V5LGFub255bW91c1V1aWRLZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSk7XG5cbiAgICBsZXQgcmVmcmVzaFRva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGlmKCFyZWZyZXNoVG9rZW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX09QRVJBVElPTixcbiAgICAgICAgbXNnOiAnbm90IGxvZ2luJ1xuICAgICAgfSkpO1xuICAgIH1cbiAgICBjb25zdCBwYXJhbXM6IEtWPHN0cmluZz4gPSB7XG4gICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW5cbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdhdXRoLmZldGNoQWNjZXNzVG9rZW5XaXRoUmVmcmVzaFRva2VuJyxwYXJhbXMpO1xuICAgIGlmKHJlc3BvbnNlLmRhdGEuY29kZSkge1xuICAgICAgY29uc3QgeyBjb2RlIH0gPSByZXNwb25zZS5kYXRhO1xuICAgICAgaWYoY29kZSA9PT0gJ1NJR05fUEFSQU1fSU5WQUxJRCcgfHwgY29kZSA9PT0gJ1JFRlJFU0hfVE9LRU5fRVhQSVJFRCcgfHwgY29kZSA9PT0gJ0lOVkFMSURfUkVGUkVTSF9UT0tFTicpIHtcbiAgICAgICAgLy8g6L+Z6YeM5aSE55CG5Lul5LiL6YC76L6R77yaXG4gICAgICAgIC8vIOWMv+WQjeeZu+W9leaXtu+8jOWmguaenOWIt+aWsGFjY2VzcyB0b2tlbuaKpemUmXJlZnJlc2ggdG9rZW7ov4fmnJ/vvIzmraTml7blupTor6XvvJpcbiAgICAgICAgLy8gMS4g5YaN55SoIHV1aWQg5ou/5LiA5qyh5paw55qEcmVmcmVzaCB0b2tlblxuICAgICAgICAvLyAyLiDmi7/mlrDnmoRyZWZyZXNoIHRva2Vu5o2iYWNjZXNzIHRva2VuXG4gICAgICAgIGNvbnN0IGlzQW5vbnltb3VzID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhsb2dpblR5cGVLZXkpID09PSBMT0dJTlRZUEUuQU5PTllNT1VTO1xuICAgICAgICBpZihpc0Fub255bW91cyAmJiBjb2RlID09PSAnSU5WQUxJRF9SRUZSRVNIX1RPS0VOJykge1xuICAgICAgICAgIC8vIOiOt+WPluaWsOeahCByZWZyZXNoIHRva2VuXG4gICAgICAgICAgY29uc3QgYW5vbnltb3VzX3V1aWQgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFub255bW91c1V1aWRLZXkpO1xuICAgICAgICAgIC8vIOatpOWkhGNhY2hl5Li65Z+657G7cHJvcGVydHlcbiAgICAgICAgICBjb25zdCByZWZyZXNoX3Rva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuc2VuZCgnYXV0aC5zaWduSW5Bbm9ueW1vdXNseScse1xuICAgICAgICAgICAgYW5vbnltb3VzX3V1aWQsXG4gICAgICAgICAgICByZWZyZXNoX3Rva2VuXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5fc2V0UmVmcmVzaFRva2VuKHJlcy5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICBpZihyZXRyeU51bSA+PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuKC0tcmV0cnlOdW0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICBjb2RlOiBFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ+mHjeivleiOt+WPliByZWZyZXNoIHRva2VuIOWksei0pSdcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2xvdWRiYXNlLmZpcmUoRVZFTlRTLkxPR0lOX1NUQVRFX0VYUElSRUQpO1xuICAgICAgICBhd2FpdCB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuTkVUV09SS19FUlJPUixcbiAgICAgICAgbXNnOiBgcmVmcmVzaCBhY2Nlc3NfdG9rZW4gZmFpbGVk77yaJHtyZXNwb25zZS5kYXRhLmNvZGV9YFxuICAgICAgfSkpO1xuICAgIH1cbiAgICBpZihyZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbikge1xuICAgICAgY2xvdWRiYXNlLmZpcmUoRVZFTlRTLkFDQ0VTU19UT0tFTl9SRUZSRVNIRCk7XG4gICAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5LHJlc3BvbnNlLmRhdGEuYWNjZXNzX3Rva2VuKTtcbiAgICAgIC8vIOacrOWcsOaXtumXtOWPr+iDveayoeacieWQjOatpVxuICAgICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSxyZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbl9leHBpcmUgKyBEYXRlLm5vdygpKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjY2Vzc1Rva2VuOiByZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbixcbiAgICAgICAgYWNjZXNzVG9rZW5FeHBpcmU6IHJlc3BvbnNlLmRhdGEuYWNjZXNzX3Rva2VuX2V4cGlyZVxuICAgICAgfTtcbiAgICB9XG4gICAgLy8g5Yy/5ZCN55m75b2VcmVmcmVzaF90b2tlbui/h+acn+aDheWGteS4i+i/lOWbnnJlZnJlc2hfdG9rZW5cbiAgICAvLyDmraTlnLrmma/kuIvkvb/nlKjmlrDnmoRyZWZyZXNoX3Rva2Vu6I635Y+WYWNjZXNzX3Rva2VuXG4gICAgaWYocmVzcG9uc2UuZGF0YS5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICBhd2FpdCB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSxyZXNwb25zZS5kYXRhLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgYXdhaXQgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuKCk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgYXN5bmMgX3NldFJlZnJlc2hUb2tlbihyZWZyZXNoVG9rZW46IHN0cmluZykge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW5LZXksYWNjZXNzVG9rZW5FeHBpcmVLZXkscmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIC8vIHJlZnJlc2ggdG9rZW7orr7nva7liY3vvIzlhYjmuIXmjokgYWNjZXNzIHRva2VuXG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkscmVmcmVzaFRva2VuKTtcbiAgfVxufVxuXG5jb25zdCByZXF1ZXN0TWFwOiBLVjxDbG91ZGJhc2VSZXF1ZXN0PiA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdFJlcXVlc3QoY29uZmlnOiBJQ2xvdWRiYXNlUmVxdWVzdENvbmZpZykge1xuICByZXF1ZXN0TWFwW2NvbmZpZy5lbnZdID0gbmV3IENsb3VkYmFzZVJlcXVlc3Qoe1xuICAgIC4uLmNvbmZpZyxcbiAgICB0aHJvdzogdHJ1ZVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlcXVlc3RCeUVudklkKGVudjogc3RyaW5nKTogQ2xvdWRiYXNlUmVxdWVzdCB7XG4gIHJldHVybiByZXF1ZXN0TWFwW2Vudl07XG59Il19
=======
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWJzL3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FLNkI7QUFRN0Isa0RBQWdFO0FBSWhFLHdCQUErQjtBQUMvQixpQ0FBd0Q7QUFDeEQsOENBQTZDO0FBQzdDLHFDQUFxQztBQUU3QixJQUFBLE1BQU0sR0FBSyxxQkFBUyxPQUFkLENBQWU7QUFDckIsSUFBQSxRQUFRLEdBQXFDLGlCQUFLLFNBQTFDLEVBQUMsVUFBVSxHQUEwQixpQkFBSyxXQUEvQixFQUFDLFNBQVMsR0FBZ0IsaUJBQUssVUFBckIsRUFBQyxVQUFVLEdBQUssaUJBQUssV0FBVixDQUFXO0FBQ25ELElBQUEsT0FBTyxHQUFLLG9CQUFRLFFBQWIsQ0FBYztBQUc3QixJQUFNLDJCQUEyQixHQUFHO0lBQ2xDLGFBQWE7SUFDYixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLHdCQUF3QjtJQUN4QixhQUFhO0lBQ2IsdUNBQXVDO0lBQ3ZDLGlDQUFpQztJQUNqQywwQkFBMEI7SUFDMUIsNkJBQTZCO0lBQzdCLDZCQUE2QjtJQUM3QiwyQkFBMkI7Q0FDNUIsQ0FBQztBQUVGLFNBQVMsU0FBUyxDQUFDLFFBQTZCLEVBQUMsSUFBWSxFQUFDLEtBQTJCO0lBQ3ZGLElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBUyxPQUF3QjtRQUNoRCxJQUFNLElBQUksR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ1YsSUFBQSxLQUFrRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQyxPQUFPLENBQUMsRUFBckUs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QUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxFQUFBOzt3QkFBbEQsU0FBa0QsQ0FBQzt3QkFDbkQsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLEVBQUE7O3dCQUF4RCxTQUF3RCxDQUFDO3dCQUN6RCxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBQyxZQUFZLENBQUMsRUFBQTs7d0JBQTdELFNBQTZELENBQUM7Ozs7O0tBQy9EO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBblRELElBbVRDO0FBblRZLDRDQUFnQjtBQXFUN0IsSUFBTSxVQUFVLEdBQXlCLEVBQUUsQ0FBQztBQUU1QyxTQUFnQixXQUFXLENBQUMsTUFBK0I7SUFDekQsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLGdCQUFnQix1QkFDeEMsTUFBTSxLQUNULEtBQUssRUFBRSxJQUFJLElBQ1gsQ0FBQztBQUNMLENBQUM7QUFMRCxrQ0FLQztBQUVELFNBQWdCLGlCQUFpQixDQUFDLEdBQVc7SUFDM0MsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUZELDhDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgREFUQV9WRVJTSU9OLFxuICBMT0dJTlRZUEUsXG4gIGdldFNka1ZlcnNpb24sXG4gIGdldEVuZFBvaW50XG59IGZyb20gJy4uL2NvbnN0YW50cy9jb21tb24nO1xuaW1wb3J0IHtcbiAgSVJlcXVlc3RPcHRpb25zLFxuICBTREtSZXF1ZXN0SW50ZXJmYWNlLFxuICBSZXNwb25zZU9iamVjdCxcbiAgSVVwbG9hZFJlcXVlc3RPcHRpb25zLFxuICBJUmVxdWVzdENvbmZpZ1xufSBmcm9tICdAY2xvdWRiYXNlL2FkYXB0ZXItaW50ZXJmYWNlJztcbmltcG9ydCB7IHV0aWxzLGFkYXB0ZXJzLGNvbnN0YW50cyB9IGZyb20gJ0BjbG91ZGJhc2UvdXRpbGl0aWVzJztcbmltcG9ydCB7IEtWIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBJR2V0QWNjZXNzVG9rZW5SZXN1bHQsSUNsb3VkYmFzZVJlcXVlc3RDb25maWcsSUFwcGVuZGVkUmVxdWVzdEluZm8sSVJlcXVlc3RCZWZvcmVIb29rIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9yZXF1ZXN0JztcbmltcG9ydCB7IElDbG91ZGJhc2VDYWNoZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY2FjaGUnO1xuaW1wb3J0IHsgY2xvdWRiYXNlIH0gZnJvbSAnLi4nO1xuaW1wb3J0IHsgZ2V0Q2FjaGVCeUVudklkLGdldExvY2FsQ2FjaGUgfSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCB7IEVWRU5UUyB9IGZyb20gJy4uL2NvbnN0YW50cy9ldmVudHMnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuL2FkYXB0ZXInO1xuXG5jb25zdCB7IEVSUk9SUyB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyBnZW5TZXFJZCxpc0Zvcm1EYXRhLGZvcm1hdFVybCxjcmVhdGVTaWduIH0gPSB1dGlscztcbmNvbnN0IHsgUlVOVElNRSB9ID0gYWRhcHRlcnM7XG5cbi8vIOS4i+mdouWHoOenjSBhY3Rpb24g5LiN6ZyA6KaBIGFjY2VzcyB0b2tlblxuY29uc3QgQUNUSU9OU19XSVRIT1VUX0FDQ0VTU1RPS0VOID0gW1xuICAnYXV0aC5nZXRKd3QnLFxuICAnYXV0aC5sb2dvdXQnLFxuICAnYXV0aC5zaWduSW5XaXRoVGlja2V0JyxcbiAgJ2F1dGguc2lnbkluQW5vbnltb3VzbHknLFxuICAnYXV0aC5zaWduSW4nLFxuICAnYXV0aC5mZXRjaEFjY2Vzc1Rva2VuV2l0aFJlZnJlc2hUb2tlbicsXG4gICdhdXRoLnNpZ25VcFdpdGhFbWFpbEFuZFBhc3N3b3JkJyxcbiAgJ2F1dGguYWN0aXZhdGVFbmRVc2VyTWFpbCcsXG4gICdhdXRoLnNlbmRQYXNzd29yZFJlc2V0RW1haWwnLFxuICAnYXV0aC5yZXNldFBhc3N3b3JkV2l0aFRva2VuJyxcbiAgJ2F1dGguaXNVc2VybmFtZVJlZ2lzdGVyZWQnXG5dO1xuXG5mdW5jdGlvbiBiaW5kSG9va3MoaW5zdGFuY2U6IFNES1JlcXVlc3RJbnRlcmZhY2UsbmFtZTogc3RyaW5nLGhvb2tzOiBJUmVxdWVzdEJlZm9yZUhvb2tbXSkge1xuICBjb25zdCBvcmlnaW5NZXRob2QgPSBpbnN0YW5jZVtuYW1lXTtcbiAgaW5zdGFuY2VbbmFtZV0gPSBmdW5jdGlvbihvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpIHtcbiAgICBjb25zdCBkYXRhID0ge307XG4gICAgY29uc3QgaGVhZGVycyA9IHt9O1xuICAgIGhvb2tzLmZvckVhY2goaG9vayA9PiB7XG4gICAgICBjb25zdCB7IGRhdGE6IGFwcGVuZGVkRGF0YSxoZWFkZXJzOiBhcHBlbmRlZEhlYWRlcnMgfSA9IGhvb2suY2FsbChpbnN0YW5jZSxvcHRpb25zKTtcbiAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSxhcHBlbmRlZERhdGEpO1xuICAgICAgT2JqZWN0LmFzc2lnbihoZWFkZXJzLGFwcGVuZGVkSGVhZGVycyk7XG4gICAgfSk7XG4gICAgY29uc3Qgb3JpZ2luRGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICBvcmlnaW5EYXRhICYmICgoKSA9PiB7XG4gICAgICBpZihpc0Zvcm1EYXRhKG9yaWdpbkRhdGEpKSB7XG4gICAgICAgIGZvcihjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgIChvcmlnaW5EYXRhIGFzIEZvcm1EYXRhKS5hcHBlbmQoa2V5LGRhdGFba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgb3B0aW9ucy5kYXRhID0ge1xuICAgICAgICAuLi5vcmlnaW5EYXRhLFxuICAgICAgICAuLi5kYXRhXG4gICAgICB9O1xuICAgIH0pKCk7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0ge1xuICAgICAgLi4uKG9wdGlvbnMuaGVhZGVycyB8fCB7fSksXG4gICAgICAuLi5oZWFkZXJzXG4gICAgfTtcbiAgICByZXR1cm4gKG9yaWdpbk1ldGhvZCBhcyBGdW5jdGlvbikuY2FsbChpbnN0YW5jZSxvcHRpb25zKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGJlZm9yZUVhY2goKTogSUFwcGVuZGVkUmVxdWVzdEluZm8ge1xuICBjb25zdCBzZXFJZCA9IGdlblNlcUlkKCk7XG4gIHJldHVybiB7XG4gICAgZGF0YToge1xuICAgICAgc2VxSWRcbiAgICB9LFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdYLVNESy1WZXJzaW9uJzogYEBjbG91ZGJhc2UvanMtc2RrLyR7Z2V0U2RrVmVyc2lvbigpfWAsXG4gICAgICAneC1zZXFpZCc6IHNlcUlkXG4gICAgfVxuICB9O1xufVxuZXhwb3J0IGludGVyZmFjZSBJQ2xvdWRiYXNlUmVxdWVzdCB7XG4gIHBvc3Q6IChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpID0+IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+O1xuICB1cGxvYWQ6IChvcHRpb25zOiBJVXBsb2FkUmVxdWVzdE9wdGlvbnMpID0+IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+O1xuICBkb3dubG9hZDogKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucykgPT4gUHJvbWlzZTxSZXNwb25zZU9iamVjdD47XG4gIHJlZnJlc2hBY2Nlc3NUb2tlbjogKCkgPT4gUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+O1xuICBnZXRBY2Nlc3NUb2tlbjogKCkgPT4gUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+O1xuICByZXF1ZXN0OiAoYWN0aW9uOiBzdHJpbmcscGFyYW1zOiBLVjxhbnk+LG9wdGlvbnM/OiBLVjxhbnk+KSA9PiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PjtcbiAgc2VuZDogKGFjdGlvbjogc3RyaW5nLGRhdGE6IEtWPGFueT4pID0+IFByb21pc2U8YW55Pjtcbn1cblxuLyoqXG4gKiBAY2xhc3MgQ2xvdWRiYXNlUmVxdWVzdFxuICovXG5leHBvcnQgY2xhc3MgQ2xvdWRiYXNlUmVxdWVzdCBpbXBsZW1lbnRzIElDbG91ZGJhc2VSZXF1ZXN0IHtcbiAgY29uZmlnOiBJQ2xvdWRiYXNlUmVxdWVzdENvbmZpZztcbiAgX3Nob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbkhvb2s6IEZ1bmN0aW9uXG4gIF9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4gfCBudWxsXG4gIF9yZXFDbGFzczogU0RLUmVxdWVzdEludGVyZmFjZTtcbiAgLy8g6K+35rGC5aSx6LSl5piv5ZCm5oqb5Ye6RXJyb3JcbiAgcHJpdmF0ZSBfdGhyb3dXaGVuUmVxdWVzdEZhaWwgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcbiAgLy8g5oyB5LmF5YyW5pys5Zyw5a2Y5YKoXG4gIHByaXZhdGUgX2xvY2FsQ2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcbiAgLyoqXG4gICAqIOWIneWni+WMllxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25maWc6IElDbG91ZGJhc2VSZXF1ZXN0Q29uZmlnICYgeyB0aHJvdz86IGJvb2xlYW4gfSkge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIHRoaXMuX3JlcUNsYXNzID0gbmV3IFBsYXRmb3JtLmFkYXB0ZXIucmVxQ2xhc3MoPElSZXF1ZXN0Q29uZmlnPntcbiAgICAgIHRpbWVvdXQ6IHRoaXMuY29uZmlnLnRpbWVvdXQsXG4gICAgICB0aW1lb3V0TXNnOiBgW0BjbG91ZGJhc2UvanMtc2RrXSDor7fmsYLlnKgke3RoaXMuY29uZmlnLnRpbWVvdXQgLyAxMDAwfXPlhoXmnKrlrozmiJDvvIzlt7LkuK3mlq1gLFxuICAgICAgcmVzdHJpY3RlZE1ldGhvZHM6IFsncG9zdCddXG4gICAgfSk7XG4gICAgdGhpcy5fdGhyb3dXaGVuUmVxdWVzdEZhaWwgPSBjb25maWcudGhyb3cgfHwgZmFsc2U7XG4gICAgdGhpcy5fY2FjaGUgPSBnZXRDYWNoZUJ5RW52SWQodGhpcy5jb25maWcuZW52KTtcbiAgICB0aGlzLl9sb2NhbENhY2hlID0gZ2V0TG9jYWxDYWNoZSh0aGlzLmNvbmZpZy5lbnYpO1xuICAgIGJpbmRIb29rcyh0aGlzLl9yZXFDbGFzcywncG9zdCcsW2JlZm9yZUVhY2hdKTtcbiAgICBiaW5kSG9va3ModGhpcy5fcmVxQ2xhc3MsJ3VwbG9hZCcsW2JlZm9yZUVhY2hdKTtcbiAgICBiaW5kSG9va3ModGhpcy5fcmVxQ2xhc3MsJ2Rvd25sb2FkJyxbYmVmb3JlRWFjaF0pO1xuICB9XG4gIHB1YmxpYyBhc3luYyBwb3N0KG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXFDbGFzcy5wb3N0KG9wdGlvbnMpO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgcHVibGljIGFzeW5jIHVwbG9hZChvcHRpb25zOiBJVXBsb2FkUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxQ2xhc3MudXBsb2FkKG9wdGlvbnMpO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgcHVibGljIGFzeW5jIGRvd25sb2FkKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXFDbGFzcy5kb3dubG9hZChvcHRpb25zKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlZnJlc2hBY2Nlc3NUb2tlbigpOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4ge1xuICAgIC8vIOWPr+iDveS8muWQjOaXtuiwg+eUqOWkmuasoeWIt+aWsGFjY2VzcyB0b2tlbu+8jOi/memHjOaKiuWug+S7rOWQiOW5tuaIkOS4gOS4qlxuICAgIGlmKCF0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlKSB7XG4gICAgICAvLyDmsqHmnInmraPlnKjliLfmlrDvvIzpgqPkuYjmraPluLjmiafooYzliLfmlrDpgLvovpFcbiAgICAgIHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UgPSB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW4oKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0O1xuICAgIGxldCBlcnI7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2U7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBlcnIgPSBlO1xuICAgIH1cbiAgICB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlID0gbnVsbDtcbiAgICB0aGlzLl9zaG91bGRSZWZyZXNoQWNjZXNzVG9rZW5Ib29rID0gbnVsbDtcbiAgICBpZihlcnIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIOiOt+WPlmFjY2VzcyB0b2tlblxuICBwdWJsaWMgYXN5bmMgZ2V0QWNjZXNzVG9rZW4oKTogUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+IHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuS2V5LGFjY2Vzc1Rva2VuRXhwaXJlS2V5LHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgaWYoIXJlZnJlc2hUb2tlbikge1xuICAgICAgLy8g5LiN6K+l5Ye6546w55qE54q25oCB77ya5pyJIGFjY2VzcyB0b2tlbiDljbTmsqHmnIkgcmVmcmVzaCB0b2tlblxuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLk9QRVJBVElPTl9GQUlMLFxuICAgICAgICBtc2c6ICdyZWZyZXNoIHRva2VuIGlzIG5vdCBleGlzdCwgeW91ciBsb2NhbCBkYXRhIG1pZ2h0IGJlIG1lc3NlZCB1cCwgcGxlYXNlIHJldHJ5IGFmdGVyIGNsZWFyIGxvY2FsU3RvcmFnZSBvciBzZXNzaW9uU3RvcmFnZSdcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgLy8g5aaC5p6c5rKh5pyJYWNjZXNzIHRva2Vu5oiW6ICF6L+H5pyf77yM6YKj5LmI5Yi35pawXG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbkV4cGlyZSA9IE51bWJlcihhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5KSk7XG5cbiAgICAvLyDosIPnlKjpkqnlrZDlh73mlbBcbiAgICBsZXQgc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuID0gdHJ1ZTtcbiAgICBpZih0aGlzLl9zaG91bGRSZWZyZXNoQWNjZXNzVG9rZW5Ib29rICYmICEoYXdhaXQgdGhpcy5fc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuSG9vayhhY2Nlc3NUb2tlbixhY2Nlc3NUb2tlbkV4cGlyZSkpKSB7XG4gICAgICBzaG91bGRSZWZyZXNoQWNjZXNzVG9rZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZigoIWFjY2Vzc1Rva2VuIHx8ICFhY2Nlc3NUb2tlbkV4cGlyZSB8fCBhY2Nlc3NUb2tlbkV4cGlyZSA8IERhdGUubm93KCkpICYmIHNob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbikge1xuICAgICAgLy8g6L+U5Zue5paw55qEYWNjZXNzIHRvbGVuXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZWZyZXNoQWNjZXNzVG9rZW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g6L+U5Zue5pys5Zyw55qEYWNjZXNzIHRva2VuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhY2Nlc3NUb2tlbixcbiAgICAgICAgYWNjZXNzVG9rZW5FeHBpcmVcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUgY29tcGxleGl0eSAqL1xuICBwdWJsaWMgYXN5bmMgcmVxdWVzdChhY3Rpb246IHN0cmluZyxwYXJhbXM6IEtWPGFueT4sb3B0aW9ucz86IEtWPGFueT4pOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgdGNiVHJhY2VLZXkgPSBgeC10Y2ItdHJhY2VfJHt0aGlzLmNvbmZpZy5lbnZ9YDtcbiAgICBsZXQgY29udGVudFR5cGUgPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJztcbiAgICAvLyBjb25zdCB3ZWJEZXZpY2VJZCA9IGF3YWl0IGdldFRjYkZpbmdlcnByaW50SWQoKTtcbiAgICBjb25zdCB0bXBPYmo6IEtWPGFueT4gPSB7XG4gICAgICBhY3Rpb24sXG4gICAgICAvLyB3ZWJEZXZpY2VJZCxcbiAgICAgIGRhdGFWZXJzaW9uOiBEQVRBX1ZFUlNJT04sXG4gICAgICBlbnY6IHRoaXMuY29uZmlnLmVudixcbiAgICAgIC4uLnBhcmFtc1xuICAgIH07XG5cblxuICAgIGlmKEFDVElPTlNfV0lUSE9VVF9BQ0NFU1NUT0tFTi5pbmRleE9mKGFjdGlvbikgPT09IC0xKSB7XG4gICAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcblxuICAgICAgLy8g6Iul5pyJIHJlZnJlc2hUb2tlbiDliJnku7vliqHmnInnmbvlvZXmgIEg5Yi3IGFjY2Vzc1Rva2VuXG4gICAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgICBpZihyZWZyZXNoVG9rZW4pIHtcbiAgICAgICAgdG1wT2JqLmFjY2Vzc190b2tlbiA9IChhd2FpdCB0aGlzLmdldEFjY2Vzc1Rva2VuKCkpLmFjY2Vzc1Rva2VuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIOaLvGJvZHnlkoxjb250ZW50LXR5cGVcbiAgICBsZXQgcGF5bG9hZDtcbiAgICBpZihhY3Rpb24gPT09ICdzdG9yYWdlLnVwbG9hZEZpbGUnKSB7XG4gICAgICBwYXlsb2FkID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICBmb3IobGV0IGtleSBpbiBwYXlsb2FkKSB7XG4gICAgICAgIGlmKHBheWxvYWQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBwYXlsb2FkW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHBheWxvYWQuYXBwZW5kKGtleSx0bXBPYmpba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnRlbnRUeXBlID0gJ211bHRpcGFydC9mb3JtLWRhdGEnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50VHlwZSA9ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnO1xuICAgICAgcGF5bG9hZCA9IHt9O1xuICAgICAgZm9yKGxldCBrZXkgaW4gdG1wT2JqKSB7XG4gICAgICAgIGlmKHRtcE9ialtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBwYXlsb2FkW2tleV0gPSB0bXBPYmpba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBsZXQgb3B0czogYW55ID0ge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnY29udGVudC10eXBlJzogY29udGVudFR5cGVcbiAgICAgIH1cbiAgICB9O1xuICAgIGlmKG9wdGlvbnMgPy5bJ29uVXBsb2FkUHJvZ3Jlc3MnXSkge1xuICAgICAgb3B0cy5vblVwbG9hZFByb2dyZXNzID0gb3B0aW9uc1snb25VcGxvYWRQcm9ncmVzcyddO1xuICAgIH1cblxuICAgIGlmKHRoaXMuY29uZmlnLnJlZ2lvbikge1xuICAgICAgb3B0cy5oZWFkZXJzWydYLVRDQi1SZWdpb24nXSA9IHRoaXMuY29uZmlnLnJlZ2lvbjtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFjZUhlYWRlciA9IHRoaXMuX2xvY2FsQ2FjaGUuZ2V0U3RvcmUodGNiVHJhY2VLZXkpO1xuICAgIGlmKHRyYWNlSGVhZGVyKSB7XG4gICAgICBvcHRzLmhlYWRlcnNbJ1gtVENCLVRyYWNlJ10gPSB0cmFjZUhlYWRlcjtcbiAgICB9XG4gICAgLy8g6Z2ed2Vi5bmz5Y+w5L2/55So5Yet6K+B5qOA6aqM5pyJ5pWI5oCnXG4gICAgaWYoUGxhdGZvcm0ucnVudGltZSAhPT0gUlVOVElNRS5XRUIpIHtcbiAgICAgIGNvbnN0IHsgYXBwU2lnbixhcHBTZWNyZXQgfSA9IHRoaXMuY29uZmlnO1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgIGNvbnN0IHsgYXBwQWNjZXNzS2V5LGFwcEFjY2Vzc0tleUlkIH0gPSBhcHBTZWNyZXQ7XG4gICAgICBjb25zdCBzaWduID0gY3JlYXRlU2lnbih7XG4gICAgICAgIGRhdGE6IHBheWxvYWQsXG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgYXBwQWNjZXNzS2V5SWQsXG4gICAgICAgIGFwcFNpZ25cbiAgICAgIH0sYXBwQWNjZXNzS2V5KTtcblxuICAgICAgb3B0cy5oZWFkZXJzWydYLVRDQi1BcHAtU291cmNlJ10gPSBgdGltZXN0YW1wPSR7dGltZXN0YW1wfTthcHBBY2Nlc3NLZXlJZD0ke2FwcEFjY2Vzc0tleUlkfTthcHBTaWduPSR7YXBwU2lnbn07c2lnbj0ke3NpZ259YDtcbiAgICB9XG5cbiAgICAvLyDlj5Hlh7ror7fmsYJcbiAgICAvLyDmlrDnmoQgdXJsIOmcgOimgeaQuuW4piBlbnYg5Y+C5pWw6L+b6KGMIENPUlMg5qCh6aqMXG4gICAgLy8g6K+35rGC6ZO+5o6l5pSv5oyB5re75Yqg5Yqo5oCBIHF1ZXJ5IOWPguaVsO+8jOaWueS+v+eUqOaIt+iwg+ivleWumuS9jeivt+axglxuICAgIGNvbnN0IHsgcGFyc2UsaW5RdWVyeSxzZWFyY2ggfSA9IHBhcmFtcztcbiAgICBsZXQgZm9ybWF0UXVlcnk6IFJlY29yZDxzdHJpbmcsYW55PiA9IHtcbiAgICAgIGVudjogdGhpcy5jb25maWcuZW52XG4gICAgfTtcbiAgICAvLyDlsJ3or5Xop6PmnpDlk43lupTmlbDmja7kuLogSlNPTlxuICAgIHBhcnNlICYmIChmb3JtYXRRdWVyeS5wYXJzZSA9IHRydWUpO1xuICAgIGluUXVlcnkgJiYgKGZvcm1hdFF1ZXJ5ID0ge1xuICAgICAgLi4uaW5RdWVyeSxcbiAgICAgIC4uLmZvcm1hdFF1ZXJ5XG4gICAgfSk7XG4gICAgY29uc3QgeyBCQVNFX1VSTCxQUk9UT0NPTCB9ID0gZ2V0RW5kUG9pbnQoKTtcbiAgICAvLyDnlJ/miJDor7fmsYIgdXJsXG4gICAgbGV0IG5ld1VybCA9IGZvcm1hdFVybChQUk9UT0NPTCxCQVNFX1VSTCxmb3JtYXRRdWVyeSk7XG5cbiAgICBpZihzZWFyY2gpIHtcbiAgICAgIG5ld1VybCArPSBzZWFyY2g7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzOiBSZXNwb25zZU9iamVjdCA9IGF3YWl0IHRoaXMucG9zdCh7XG4gICAgICB1cmw6IG5ld1VybCxcbiAgICAgIGRhdGE6IHBheWxvYWQsXG4gICAgICAuLi5vcHRzXG4gICAgfSk7XG5cbiAgICAvLyDkv53lrZggdHJhY2UgaGVhZGVyXG4gICAgY29uc3QgcmVzVHJhY2VIZWFkZXIgPSByZXMuaGVhZGVyICYmIHJlcy5oZWFkZXJbJ3gtdGNiLXRyYWNlJ107XG4gICAgaWYocmVzVHJhY2VIZWFkZXIpIHtcbiAgICAgIHRoaXMuX2xvY2FsQ2FjaGUuc2V0U3RvcmUodGNiVHJhY2VLZXkscmVzVHJhY2VIZWFkZXIpO1xuICAgIH1cblxuICAgIGlmKChOdW1iZXIocmVzLnN0YXR1cykgIT09IDIwMCAmJiBOdW1iZXIocmVzLnN0YXR1c0NvZGUpICE9PSAyMDApIHx8ICFyZXMuZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCduZXR3b3JrIHJlcXVlc3QgZXJyb3InKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNlbmQoYWN0aW9uOiBzdHJpbmcsZGF0YTogS1Y8YW55PiA9IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QoYWN0aW9uLGRhdGEseyBvblVwbG9hZFByb2dyZXNzOiBkYXRhLm9uVXBsb2FkUHJvZ3Jlc3MgfSk7XG4gICAgaWYocmVzcG9uc2UuZGF0YS5jb2RlID09PSAnQUNDRVNTX1RPS0VOX0VYUElSRUQnICYmIEFDVElPTlNfV0lUSE9VVF9BQ0NFU1NUT0tFTi5pbmRleE9mKGFjdGlvbikgPT09IC0xKSB7XG4gICAgICAvLyBhY2Nlc3NfdG9rZW7ov4fmnJ/vvIzph43mlrDojrflj5ZcbiAgICAgIGF3YWl0IHRoaXMucmVmcmVzaEFjY2Vzc1Rva2VuKCk7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdChhY3Rpb24sZGF0YSx7IG9uVXBsb2FkUHJvZ3Jlc3M6IGRhdGEub25VcGxvYWRQcm9ncmVzcyB9KTtcbiAgICB9XG5cbiAgICBpZihyZXNwb25zZS5kYXRhLmNvZGUgJiYgdGhpcy5fdGhyb3dXaGVuUmVxdWVzdEZhaWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5PUEVSQVRJT05fRkFJTCxcbiAgICAgICAgbXNnOiBgWyR7cmVzcG9uc2UuZGF0YS5jb2RlfV0gJHtyZXNwb25zZS5kYXRhLm1lc3NhZ2V9YFxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICB9XG5cbiAgLy8g6LCD55So5o6l5Y+j5Yi35pawYWNjZXNzIHRva2Vu77yM5bm25LiU6L+U5ZueXG4gIHByaXZhdGUgYXN5bmMgX3JlZnJlc2hBY2Nlc3NUb2tlbihyZXRyeU51bSA9IDEpOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4ge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW5LZXksYWNjZXNzVG9rZW5FeHBpcmVLZXkscmVmcmVzaFRva2VuS2V5LGxvZ2luVHlwZUtleSxhbm9ueW1vdXNVdWlkS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpO1xuXG4gICAgbGV0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZighcmVmcmVzaFRva2VuKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sXG4gICAgICAgIG1zZzogJ25vdCBsb2dpbidcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgY29uc3QgcGFyYW1zOiBLVjxzdHJpbmc+ID0ge1xuICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdCgnYXV0aC5mZXRjaEFjY2Vzc1Rva2VuV2l0aFJlZnJlc2hUb2tlbicscGFyYW1zKTtcbiAgICBpZihyZXNwb25zZS5kYXRhLmNvZGUpIHtcbiAgICAgIGNvbnN0IHsgY29kZSB9ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIGlmKGNvZGUgPT09ICdTSUdOX1BBUkFNX0lOVkFMSUQnIHx8IGNvZGUgPT09ICdSRUZSRVNIX1RPS0VOX0VYUElSRUQnIHx8IGNvZGUgPT09ICdJTlZBTElEX1JFRlJFU0hfVE9LRU4nKSB7XG4gICAgICAgIC8vIOi/memHjOWkhOeQhuS7peS4i+mAu+i+ke+8mlxuICAgICAgICAvLyDljL/lkI3nmbvlvZXml7bvvIzlpoLmnpzliLfmlrBhY2Nlc3MgdG9rZW7miqXplJlyZWZyZXNoIHRva2Vu6L+H5pyf77yM5q2k5pe25bqU6K+l77yaXG4gICAgICAgIC8vIDEuIOWGjeeUqCB1dWlkIOaLv+S4gOasoeaWsOeahHJlZnJlc2ggdG9rZW5cbiAgICAgICAgLy8gMi4g5ou/5paw55qEcmVmcmVzaCB0b2tlbuaNomFjY2VzcyB0b2tlblxuICAgICAgICBjb25zdCBpc0Fub255bW91cyA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMobG9naW5UeXBlS2V5KSA9PT0gTE9HSU5UWVBFLkFOT05ZTU9VUztcbiAgICAgICAgaWYoaXNBbm9ueW1vdXMgJiYgY29kZSA9PT0gJ0lOVkFMSURfUkVGUkVTSF9UT0tFTicpIHtcbiAgICAgICAgICAvLyDojrflj5bmlrDnmoQgcmVmcmVzaCB0b2tlblxuICAgICAgICAgIGNvbnN0IGFub255bW91c191dWlkID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhhbm9ueW1vdXNVdWlkS2V5KTtcbiAgICAgICAgICAvLyDmraTlpIRjYWNoZeS4uuWfuuexu3Byb3BlcnR5XG4gICAgICAgICAgY29uc3QgcmVmcmVzaF90b2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLnNlbmQoJ2F1dGguc2lnbkluQW5vbnltb3VzbHknLHtcbiAgICAgICAgICAgIGFub255bW91c191dWlkLFxuICAgICAgICAgICAgcmVmcmVzaF90b2tlblxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuX3NldFJlZnJlc2hUb2tlbihyZXMucmVmcmVzaF90b2tlbik7XG4gICAgICAgICAgaWYocmV0cnlOdW0gPj0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlbigtLXJldHJ5TnVtKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgY29kZTogRVJST1JTLk9QRVJBVElPTl9GQUlMLFxuICAgICAgICAgICAgICBtZXNzYWdlOiAn6YeN6K+V6I635Y+WIHJlZnJlc2ggdG9rZW4g5aSx6LSlJ1xuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNsb3VkYmFzZS5maXJlKEVWRU5UUy5MT0dJTl9TVEFURV9FWFBJUkVEKTtcbiAgICAgICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLk5FVFdPUktfRVJST1IsXG4gICAgICAgIG1zZzogYHJlZnJlc2ggYWNjZXNzX3Rva2VuIGZhaWxlZO+8miR7cmVzcG9uc2UuZGF0YS5jb2RlfWBcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYocmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgIGNsb3VkYmFzZS5maXJlKEVWRU5UUy5BQ0NFU1NfVE9LRU5fUkVGUkVTSEQpO1xuICAgICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSxyZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbik7XG4gICAgICAvLyDmnKzlnLDml7bpl7Tlj6/og73msqHmnInlkIzmraVcbiAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkscmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW5fZXhwaXJlICsgRGF0ZS5ub3coKSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhY2Nlc3NUb2tlbjogcmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW4sXG4gICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlOiByZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbl9leHBpcmVcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIOWMv+WQjeeZu+W9lXJlZnJlc2hfdG9rZW7ov4fmnJ/mg4XlhrXkuIvov5Tlm55yZWZyZXNoX3Rva2VuXG4gICAgLy8g5q2k5Zy65pmv5LiL5L2/55So5paw55qEcmVmcmVzaF90b2tlbuiOt+WPlmFjY2Vzc190b2tlblxuICAgIGlmKHJlc3BvbnNlLmRhdGEucmVmcmVzaF90b2tlbikge1xuICAgICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkscmVzcG9uc2UuZGF0YS5yZWZyZXNoX3Rva2VuKTtcbiAgICAgIGF3YWl0IHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIGFzeW5jIF9zZXRSZWZyZXNoVG9rZW4ocmVmcmVzaFRva2VuOiBzdHJpbmcpIHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuS2V5LGFjY2Vzc1Rva2VuRXhwaXJlS2V5LHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICAvLyByZWZyZXNoIHRva2Vu6K6+572u5YmN77yM5YWI5riF5o6JIGFjY2VzcyB0b2tlblxuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5LHJlZnJlc2hUb2tlbik7XG4gIH1cbn1cblxuY29uc3QgcmVxdWVzdE1hcDogS1Y8Q2xvdWRiYXNlUmVxdWVzdD4gPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRSZXF1ZXN0KGNvbmZpZzogSUNsb3VkYmFzZVJlcXVlc3RDb25maWcpIHtcbiAgcmVxdWVzdE1hcFtjb25maWcuZW52XSA9IG5ldyBDbG91ZGJhc2VSZXF1ZXN0KHtcbiAgICAuLi5jb25maWcsXG4gICAgdGhyb3c6IHRydWVcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZXF1ZXN0QnlFbnZJZChlbnY6IHN0cmluZyk6IENsb3VkYmFzZVJlcXVlc3Qge1xuICByZXR1cm4gcmVxdWVzdE1hcFtlbnZdO1xufSJdfQ==
>>>>>>> feat: support sms login
