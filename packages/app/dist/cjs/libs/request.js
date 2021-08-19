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
var getSdkName = utilities_1.constants.getSdkName, ERRORS = utilities_1.constants.ERRORS;
var genSeqId = utilities_1.utils.genSeqId, isFormData = utilities_1.utils.isFormData, formatUrl = utilities_1.utils.formatUrl, createSign = utilities_1.utils.createSign;
var RUNTIME = utilities_1.adapters.RUNTIME;
var uuid_1 = require("uuid");
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
    CloudbaseRequest.prototype.fetch = function (urlOrPath, init) {
        return __awaiter(this, void 0, void 0, function () {
            var deviceId, headers, _a, appSign, appSecret, timestamp, appAccessKey, appAccessKeyId, sign, _b, PROTOCOL, BASE_URL, webEndpoint, url;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, this.getDeviceId()];
                    case 1:
                        deviceId = _c.sent();
                        headers = {
                            'X-Project-Id': 'production-fv979',
                            'X-SDK-Version': "@cloudbase/js-sdk/" + common_1.getSdkVersion(),
                            'X-Request-Id': genSeqId(),
                            'X-Request-Timestamp': Date.now(),
                            'X-Device-Id': deviceId
                        };
                        if (adapter_1.Platform.runtime !== RUNTIME.WEB) {
                            _a = this.config, appSign = _a.appSign, appSecret = _a.appSecret;
                            timestamp = Date.now();
                            appAccessKey = appSecret.appAccessKey, appAccessKeyId = appSecret.appAccessKeyId;
                            sign = createSign({
                                data: {},
                                timestamp: timestamp,
                                appAccessKeyId: appAccessKeyId,
                                appSign: appSign
                            }, appAccessKey);
                            headers['X-TCB-App-Source'] = "timestamp=" + timestamp + ";appAccessKeyId=" + appAccessKeyId + ";appSign=" + appSign + ";sign=" + sign;
                        }
                        init.headers = Object.assign({}, init.headers, headers);
                        _b = common_1.getEndPoint(), PROTOCOL = _b.PROTOCOL, BASE_URL = _b.BASE_URL;
                        webEndpoint = "" + PROTOCOL + BASE_URL;
                        url = urlOrPath.startsWith('http')
                            ? urlOrPath
                            : "" + new URL(webEndpoint).origin + urlOrPath;
                        return [4, fetch(url, init)];
                    case 2: return [2, _c.sent()];
                }
            });
        });
    };
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
    CloudbaseRequest.prototype.refreshAccessTokenFromOauthServer = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._refreshAccessTokenPromise) {
                            this._refreshAccessTokenPromise = this._refreshAccessTokenFromOauthServer(clientId);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this._refreshAccessTokenPromise];
                    case 2:
                        result = _a.sent();
                        return [3, 4];
                    case 3:
                        e_2 = _a.sent();
                        err = e_2;
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
            var _a, loginTypeKey, accessTokenKey, accessTokenExpireKey, refreshTokenKey, loginType, refreshToken, accessToken, accessTokenExpire, _b, shouldRefreshAccessToken, _c, header, payload;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this._cache.keys, loginTypeKey = _a.loginTypeKey, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey, refreshTokenKey = _a.refreshTokenKey;
                        return [4, this._cache.getStoreAsync(loginTypeKey)];
                    case 1:
                        loginType = _d.sent();
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 2:
                        refreshToken = _d.sent();
                        if (!refreshToken) {
                            throw new Error(JSON.stringify({
                                code: ERRORS.OPERATION_FAIL,
                                msg: 'refresh token is not exist, your local data might be messed up, please retry after clear localStorage or sessionStorage'
                            }));
                        }
                        return [4, this._cache.getStoreAsync(accessTokenKey)];
                    case 3:
                        accessToken = _d.sent();
                        _b = Number;
                        return [4, this._cache.getStoreAsync(accessTokenExpireKey)];
                    case 4:
                        accessTokenExpire = _b.apply(void 0, [_d.sent()]);
                        shouldRefreshAccessToken = true;
                        _c = this._shouldRefreshAccessTokenHook;
                        if (!_c) return [3, 6];
                        return [4, this._shouldRefreshAccessTokenHook(accessToken, accessTokenExpire)];
                    case 5:
                        _c = !(_d.sent());
                        _d.label = 6;
                    case 6:
                        if (_c) {
                            shouldRefreshAccessToken = false;
                        }
                        if (!((!accessToken || !accessTokenExpire || accessTokenExpire < Date.now()) && shouldRefreshAccessToken)) return [3, 15];
                        if (!loginType.startsWith(common_1.OAUTH2_LOGINTYPE_PREFIX)) return [3, 12];
                        if (!accessToken) return [3, 9];
                        header = null;
                        payload = null;
                        try {
                            header = utilities_1.jwt.decode(accessToken, { header: true });
                            payload = utilities_1.jwt.decode(accessToken);
                        }
                        catch (e) {
                            throw new Error("[DECODE_ACCESS_TOKEN_ERROR] " + e.message + ", accesstoken: " + accessToken);
                        }
                        if (!((header === null || header === void 0 ? void 0 : header.kid) && (payload === null || payload === void 0 ? void 0 : payload.project_id))) return [3, 8];
                        return [4, this.refreshAccessTokenFromOauthServer(payload === null || payload === void 0 ? void 0 : payload.project_id)];
                    case 7: return [2, _d.sent()];
                    case 8: return [3, 11];
                    case 9: return [4, this.refreshAccessTokenFromOauthServer(this.config.env)];
                    case 10: return [2, _d.sent()];
                    case 11: return [3, 14];
                    case 12: return [4, this.refreshAccessToken()];
                    case 13: return [2, _d.sent()];
                    case 14: return [3, 16];
                    case 15: return [2, {
                            accessToken: accessToken,
                            accessTokenExpire: accessTokenExpire
                        }];
                    case 16: return [2];
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
    CloudbaseRequest.prototype._fetchAccessTokenFromOauthServer = function (refreshToken, clientId) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, seqIdFromHeader, body, seqId, body, seqId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetch('/auth/v1/token', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                grant_type: 'refresh_token',
                                client_id: clientId,
                                refresh_token: refreshToken
                            })
                        })];
                    case 1:
                        resp = _a.sent();
                        seqIdFromHeader = resp.headers.get('SeqId') || resp.headers.get('RequestId');
                        if (!(resp.status >= 400 && resp.status < 500)) return [3, 3];
                        return [4, resp.json()];
                    case 2:
                        body = _a.sent();
                        seqId = body.request_id || seqIdFromHeader;
                        throw new Error("[" + getSdkName() + "/" + common_1.getSdkVersion() + "][OAuth2AuthProvider][status:" + resp.status + "][" + body.error + "(" + body.error_code + ")] " + body.error_description + " (" + seqId + ")");
                    case 3:
                        if (!(resp.status >= 500)) return [3, 5];
                        return [4, resp.json()];
                    case 4:
                        body = _a.sent();
                        seqId = body.request_id || seqIdFromHeader;
                        throw new Error("[" + getSdkName() + "/" + common_1.getSdkVersion() + "][OAuth2AuthProvider][status:" + resp.status + "][" + body.error + "(" + body.error_code + ")] " + body.error_description + " (" + seqId + ")");
                    case 5: return [2, resp.json()];
                }
            });
        });
    };
    CloudbaseRequest.prototype._refreshAccessTokenFromOauthServer = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accessTokenKey, accessTokenExpireKey, refreshTokenKey, refreshToken, token, newRefreshToken, accessToken, accessTokenExpire;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._cache.keys, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey, refreshTokenKey = _a.refreshTokenKey;
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 1:
                        refreshToken = _b.sent();
                        if (!refreshToken) {
                            throw new Error(JSON.stringify({
                                code: ERRORS.INVALID_OPERATION,
                                msg: 'not login'
                            }));
                        }
                        return [4, this._fetchAccessTokenFromOauthServer(refreshToken, clientId)];
                    case 2:
                        token = _b.sent();
                        newRefreshToken = token.refresh_token, accessToken = token.access_token, accessTokenExpire = token.expires_in;
                        if (!accessToken || !accessTokenExpire) {
                            throw new Error(JSON.stringify({
                                code: ERRORS.NETWORK_ERROR,
                                msg: 'refresh access_token failed'
                            }));
                        }
                        if (!(accessToken && accessTokenExpire)) return [3, 7];
                        if (!(newRefreshToken === refreshToken)) return [3, 4];
                        return [4, this._cache.setStoreAsync(refreshTokenKey, newRefreshToken)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [4, this._cache.setStoreAsync(accessTokenKey, accessToken)];
                    case 5:
                        _b.sent();
                        return [4, this._cache.setStoreAsync(accessTokenExpireKey, accessTokenExpire * 1000 + Date.now())];
                    case 6:
                        _b.sent();
                        __1.cloudbase.fire(events_1.EVENTS.ACCESS_TOKEN_REFRESHD);
                        return [2, {
                                accessToken: accessToken,
                                accessTokenExpire: accessTokenExpire
                            }];
                    case 7: return [2];
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
    CloudbaseRequest.prototype.getDeviceId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var deviceIdKey, deviceId, newDeviceId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deviceIdKey = this._cache.keys.deviceIdKey;
                        return [4, this._cache.getStoreAsync(deviceIdKey)];
                    case 1:
                        deviceId = _a.sent();
                        if (!deviceId) {
                            newDeviceId = uuid_1.v4();
                            this._cache.setStoreAsync(deviceIdKey, newDeviceId);
                            return [2, newDeviceId];
                        }
                        else {
                            return [2, deviceId];
                        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWJzL3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FNNkI7QUFRN0Isa0RBQW9FO0FBSXBFLHdCQUErQjtBQUMvQixpQ0FBeUQ7QUFDekQsOENBQTZDO0FBQzdDLHFDQUFxQztBQUM3QixJQUFBLFVBQVUsR0FBYSxxQkFBUyxXQUF0QixFQUFFLE1BQU0sR0FBSyxxQkFBUyxPQUFkLENBQWU7QUFDakMsSUFBQSxRQUFRLEdBQXFDLGlCQUFLLFNBQTFDLEVBQUMsVUFBVSxHQUEwQixpQkFBSyxXQUEvQixFQUFDLFNBQVMsR0FBZ0IsaUJBQUssVUFBckIsRUFBQyxVQUFVLEdBQUssaUJBQUssV0FBVixDQUFXO0FBQ25ELElBQUEsT0FBTyxHQUFLLG9CQUFRLFFBQWIsQ0FBYztBQUU3Qiw2QkFBbUM7QUFNbkMsSUFBTSwyQkFBMkIsR0FBRztJQUNsQyxhQUFhO0lBQ2IsYUFBYTtJQUNiLHVCQUF1QjtJQUN2Qix3QkFBd0I7SUFDeEIsYUFBYTtJQUNiLHVDQUF1QztJQUN2QyxpQ0FBaUM7SUFDakMsMEJBQTBCO0lBQzFCLDZCQUE2QjtJQUM3Qiw2QkFBNkI7SUFDN0IsMkJBQTJCO0NBQzVCLENBQUM7QUFFRixTQUFTLFNBQVMsQ0FBQyxRQUE2QixFQUFFLElBQVksRUFBRSxLQUEyQjtJQUN6RixJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsT0FBd0I7UUFDakQsSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNuQixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUNWLElBQUEsS0FBbUQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQXZFLFlBQVksVUFBQSxFQUFXLGVBQWUsYUFBaUMsQ0FBQztZQUN0RixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDaEMsVUFBVSxJQUFJLENBQUM7WUFDYixJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDMUIsS0FBSyxJQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7b0JBQ3JCLFVBQXVCLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDakQ7Z0JBQ0QsT0FBTzthQUNSO1lBQ0QsT0FBTyxDQUFDLElBQUkseUJBQ1AsVUFBVSxHQUNWLElBQUksQ0FDUixDQUFDO1FBQ0osQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNMLE9BQU8sQ0FBQyxPQUFPLHlCQUNWLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsR0FDdkIsT0FBTyxDQUNYLENBQUM7UUFDRixPQUFRLFlBQXlCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1RCxDQUFDLENBQUM7QUFDSixDQUFDO0FBQ0QsU0FBUyxVQUFVO0lBQ2pCLElBQU0sS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLE9BQU87UUFDTCxJQUFJLEVBQUU7WUFDSixLQUFLLE9BQUE7U0FDTjtRQUNELE9BQU8sRUFBRTtZQUNQLGVBQWUsRUFBRSx1QkFBcUIsc0JBQWEsRUFBSTtZQUN2RCxTQUFTLEVBQUUsS0FBSztTQUNqQjtLQUNGLENBQUM7QUFDSixDQUFDO0FBZUQ7SUFjRSwwQkFBWSxNQUFxRDtRQVJ6RCwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFTcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGtCQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBaUI7WUFDN0QsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztZQUM1QixVQUFVLEVBQUUsMkNBQTBCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksc0RBQVc7WUFDM0UsaUJBQWlCLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDNUIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDO1FBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsdUJBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDaEQsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNsRCxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFRWSxnQ0FBSyxHQUFsQixVQUFtQixTQUFpQixFQUFFLElBQWtCOzs7Ozs0QkFDckMsV0FBTSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUE7O3dCQUFuQyxRQUFRLEdBQUcsU0FBd0I7d0JBRW5DLE9BQU8sR0FBRzs0QkFDZCxjQUFjLEVBQUUsa0JBQWtCOzRCQUNsQyxlQUFlLEVBQUUsdUJBQXFCLHNCQUFhLEVBQUk7NEJBQ3ZELGNBQWMsRUFBRSxRQUFRLEVBQUU7NEJBQzFCLHFCQUFxQixFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7NEJBQ2pDLGFBQWEsRUFBRSxRQUFRO3lCQUN4QixDQUFBO3dCQUVELElBQUcsa0JBQVEsQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLEdBQUcsRUFBRTs0QkFDN0IsS0FBd0IsSUFBSSxDQUFDLE1BQU0sRUFBakMsT0FBTyxhQUFBLEVBQUMsU0FBUyxlQUFBLENBQWdCOzRCQUNuQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBOzRCQUNwQixZQUFZLEdBQXFCLFNBQVMsYUFBOUIsRUFBRSxjQUFjLEdBQUssU0FBUyxlQUFkLENBQWM7NEJBQzVDLElBQUksR0FBRyxVQUFVLENBQUM7Z0NBRXRCLElBQUksRUFBRSxFQUFFO2dDQUNSLFNBQVMsV0FBQTtnQ0FDVCxjQUFjLGdCQUFBO2dDQUNkLE9BQU8sU0FBQTs2QkFDUixFQUFDLFlBQVksQ0FBQyxDQUFBOzRCQUVmLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLGVBQWEsU0FBUyx3QkFBbUIsY0FBYyxpQkFBWSxPQUFPLGNBQVMsSUFBTSxDQUFBO3lCQUN4SDt3QkFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7d0JBRWpELEtBQXlCLG9CQUFXLEVBQUUsRUFBcEMsUUFBUSxjQUFBLEVBQUUsUUFBUSxjQUFBLENBQWtCO3dCQUN0QyxXQUFXLEdBQUcsS0FBRyxRQUFRLEdBQUcsUUFBVSxDQUFBO3dCQUN0QyxHQUFHLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7NEJBQ3RDLENBQUMsQ0FBQyxTQUFTOzRCQUNYLENBQUMsQ0FBQSxLQUFHLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxTQUFXLENBQUE7d0JBQ3hDLFdBQU0sS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBQTs0QkFBN0IsV0FBTyxTQUFzQixFQUFBOzs7O0tBQzlCO0lBRVksK0JBQUksR0FBakIsVUFBa0IsT0FBd0I7Ozs7OzRCQUM1QixXQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFBOzt3QkFBeEMsR0FBRyxHQUFHLFNBQWtDO3dCQUM5QyxXQUFPLEdBQUcsRUFBQzs7OztLQUNaO0lBQ1ksaUNBQU0sR0FBbkIsVUFBb0IsT0FBOEI7Ozs7OzRCQUNwQyxXQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFBOzt3QkFBMUMsR0FBRyxHQUFHLFNBQW9DO3dCQUNoRCxXQUFPLEdBQUcsRUFBQzs7OztLQUNaO0lBQ1ksbUNBQVEsR0FBckIsVUFBc0IsT0FBd0I7Ozs7OzRCQUNoQyxXQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFBOzt3QkFBNUMsR0FBRyxHQUFHLFNBQXNDO3dCQUNsRCxXQUFPLEdBQUcsRUFBQzs7OztLQUNaO0lBRVksNkNBQWtCLEdBQS9COzs7Ozs7d0JBRUUsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRTs0QkFFcEMsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO3lCQUM5RDs7Ozt3QkFLVSxXQUFNLElBQUksQ0FBQywwQkFBMEIsRUFBQTs7d0JBQTlDLE1BQU0sR0FBRyxTQUFxQyxDQUFDOzs7O3dCQUUvQyxHQUFHLEdBQUcsR0FBQyxDQUFDOzs7d0JBRVYsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQzt3QkFDdkMsSUFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQzt3QkFDMUMsSUFBSSxHQUFHLEVBQUU7NEJBQ1AsTUFBTSxHQUFHLENBQUM7eUJBQ1g7d0JBQ0QsV0FBTyxNQUFNLEVBQUM7Ozs7S0FDZjtJQUVZLDREQUFpQyxHQUE5QyxVQUErQyxRQUFnQjs7Ozs7O3dCQUU3RCxJQUFHLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFOzRCQUVuQyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUNyRjs7Ozt3QkFLVSxXQUFNLElBQUksQ0FBQywwQkFBMEIsRUFBQTs7d0JBQTlDLE1BQU0sR0FBRyxTQUFxQyxDQUFDOzs7O3dCQUUvQyxHQUFHLEdBQUcsR0FBQyxDQUFDOzs7d0JBRVYsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQzt3QkFDdkMsSUFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQzt3QkFDMUMsSUFBRyxHQUFHLEVBQUU7NEJBQ04sTUFBTSxHQUFHLENBQUM7eUJBQ1g7d0JBQ0QsV0FBTyxNQUFNLEVBQUM7Ozs7S0FDZjtJQUdZLHlDQUFjLEdBQTNCOzs7Ozs7d0JBQ1EsS0FBdUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQXJGLFlBQVksa0JBQUEsRUFBQyxjQUFjLG9CQUFBLEVBQUMsb0JBQW9CLDBCQUFBLEVBQUMsZUFBZSxxQkFBQSxDQUFzQjt3QkFDNUUsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsRUFBQTs7d0JBQXpELFNBQVMsR0FBRyxTQUE2Qzt3QkFDMUMsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsRUFBQTs7d0JBQS9ELFlBQVksR0FBRyxTQUFnRDt3QkFDckUsSUFBSSxDQUFDLFlBQVksRUFBRTs0QkFFakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dDQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLGNBQWM7Z0NBQzNCLEdBQUcsRUFBRSx5SEFBeUg7NkJBQy9ILENBQUMsQ0FBQyxDQUFDO3lCQUNMO3dCQUVtQixXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxFQUFBOzt3QkFBN0QsV0FBVyxHQUFHLFNBQStDO3dCQUN6QyxLQUFBLE1BQU0sQ0FBQTt3QkFBQyxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEVBQUE7O3dCQUFoRixpQkFBaUIsR0FBRyxrQkFBTyxTQUFxRCxFQUFDO3dCQUduRix3QkFBd0IsR0FBRyxJQUFJLENBQUM7d0JBQ2hDLEtBQUEsSUFBSSxDQUFDLDZCQUE2QixDQUFBO2lDQUFsQyxjQUFrQzt3QkFBTSxXQUFNLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsRUFBQTs7d0JBQTFFLEtBQUEsQ0FBQyxDQUFDLFNBQXdFLENBQUMsQ0FBQTs7O3dCQUFySCxRQUF1SDs0QkFDckgsd0JBQXdCLEdBQUcsS0FBSyxDQUFDO3lCQUNsQzs2QkFFRSxDQUFBLENBQUMsQ0FBQyxXQUFXLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSx3QkFBd0IsQ0FBQSxFQUFsRyxlQUFrRzs2QkFDL0YsU0FBUyxDQUFDLFVBQVUsQ0FBQyxnQ0FBdUIsQ0FBQyxFQUE3QyxlQUE2Qzs2QkFHM0MsV0FBVyxFQUFYLGNBQVc7d0JBQ1QsTUFBTSxHQUFHLElBQUksQ0FBQTt3QkFDYixPQUFPLEdBQUcsSUFBSSxDQUFBO3dCQUNsQixJQUFJOzRCQUNGLE1BQU0sR0FBRyxlQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBOzRCQUNoRCxPQUFPLEdBQUcsZUFBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTt5QkFDbEM7d0JBQ0QsT0FBTyxDQUFDLEVBQUU7NEJBQ1IsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBK0IsQ0FBQyxDQUFDLE9BQU8sdUJBQWtCLFdBQWEsQ0FBQyxDQUFBO3lCQUN6Rjs2QkFDRyxDQUFBLENBQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEdBQUcsTUFBSSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsVUFBVSxDQUFBLENBQUEsRUFBbEMsY0FBa0M7d0JBQzdCLFdBQU0sSUFBSSxDQUFDLGlDQUFpQyxDQUFDLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxVQUFVLENBQUMsRUFBQTs0QkFBeEUsV0FBTyxTQUFpRSxFQUFBOzs0QkFLbkUsV0FBTSxJQUFJLENBQUMsaUNBQWlDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBQTs2QkFBcEUsV0FBTyxTQUE2RCxFQUFBOzs2QkFJL0QsV0FBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBQTs2QkFBdEMsV0FBTyxTQUErQixFQUFDOzs2QkFJekMsV0FBTzs0QkFDTCxXQUFXLGFBQUE7NEJBQ1gsaUJBQWlCLG1CQUFBO3lCQUNsQixFQUFDOzs7OztLQUVMO0lBR1ksa0NBQU8sR0FBcEIsVUFBcUIsTUFBYyxFQUFFLE1BQWUsRUFBRSxPQUFpQjs7Ozs7O3dCQUMvRCxXQUFXLEdBQUcsaUJBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFLLENBQUM7d0JBQ2pELFdBQVcsR0FBRyxtQ0FBbUMsQ0FBQzt3QkFFaEQsTUFBTSxjQUNWLE1BQU0sUUFBQSxFQUVOLFdBQVcsRUFBRSxxQkFBWSxFQUN6QixHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQ2pCLE1BQU0sQ0FDVixDQUFDOzZCQUdFLENBQUEsMkJBQTJCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBLEVBQWxELGNBQWtEO3dCQUM1QyxlQUFlLEdBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGdCQUFyQixDQUFzQjt3QkFHeEIsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsRUFBQTs7d0JBQS9ELFlBQVksR0FBRyxTQUFnRDs2QkFDakUsWUFBWSxFQUFaLGNBQVk7d0JBQ2QsS0FBQSxNQUFNLENBQUE7d0JBQWlCLFdBQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFBOzt3QkFBbEQsR0FBTyxZQUFZLEdBQUcsQ0FBQyxTQUEyQixDQUFDLENBQUMsV0FBVyxDQUFDOzs7d0JBTXBFLElBQUksTUFBTSxLQUFLLG9CQUFvQixFQUFFOzRCQUNuQyxPQUFPLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQzs0QkFDekIsS0FBUyxHQUFHLElBQUksT0FBTyxFQUFFO2dDQUN2QixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtvQ0FDN0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUNBQ2xDOzZCQUNGOzRCQUNELFdBQVcsR0FBRyxxQkFBcUIsQ0FBQzt5QkFDckM7NkJBQU07NEJBQ0wsV0FBVyxHQUFHLGdDQUFnQyxDQUFDOzRCQUMvQyxPQUFPLEdBQUcsRUFBRSxDQUFDOzRCQUNiLEtBQVMsR0FBRyxJQUFJLE1BQU0sRUFBRTtnQ0FDdEIsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO29DQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lDQUM1Qjs2QkFDRjt5QkFDRjt3QkFDRyxJQUFJLEdBQVE7NEJBQ2QsT0FBTyxFQUFFO2dDQUNQLGNBQWMsRUFBRSxXQUFXOzZCQUM1Qjt5QkFDRixDQUFDO3dCQUNGLElBQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFHLGtCQUFrQixHQUFHOzRCQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7eUJBQ3JEO3dCQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7NEJBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7eUJBQ25EO3dCQUVLLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDM0QsSUFBSSxXQUFXLEVBQUU7NEJBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxXQUFXLENBQUM7eUJBQzNDO3dCQUVELElBQUksa0JBQVEsQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLEdBQUcsRUFBRTs0QkFDOUIsS0FBeUIsSUFBSSxDQUFDLE1BQU0sRUFBbEMsT0FBTyxhQUFBLEVBQUUsU0FBUyxlQUFBLENBQWlCOzRCQUNyQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUNyQixZQUFZLEdBQXFCLFNBQVMsYUFBOUIsRUFBRSxjQUFjLEdBQUssU0FBUyxlQUFkLENBQWU7NEJBQzdDLElBQUksR0FBRyxVQUFVLENBQUM7Z0NBQ3RCLElBQUksRUFBRSxFQUFFO2dDQUNSLFNBQVMsV0FBQTtnQ0FDVCxjQUFjLGdCQUFBO2dDQUNkLE9BQU8sU0FBQTs2QkFDUixFQUFFLFlBQVksQ0FBQyxDQUFDOzRCQUVqQixJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsZUFBYSxTQUFTLHdCQUFtQixjQUFjLGlCQUFZLE9BQU8sY0FBUyxJQUFNLENBQUM7eUJBQzlIO3dCQUtPLEtBQUssR0FBc0IsTUFBTSxNQUE1QixFQUFFLE9BQU8sR0FBYSxNQUFNLFFBQW5CLEVBQUUsTUFBTSxHQUFLLE1BQU0sT0FBWCxDQUFZO3dCQUN0QyxXQUFXLEdBQXdCOzRCQUNyQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO3lCQUNyQixDQUFDO3dCQUVGLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7d0JBQ3BDLE9BQU8sSUFBSSxDQUFDLFdBQVcseUJBQ2xCLE9BQU8sR0FDUCxXQUFXLENBQ2YsQ0FBQyxDQUFDO3dCQUNHLEtBQXlCLG9CQUFXLEVBQUUsRUFBcEMsUUFBUSxjQUFBLEVBQUUsUUFBUSxjQUFBLENBQW1CO3dCQUV6QyxNQUFNLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7d0JBRXhELElBQUksTUFBTSxFQUFFOzRCQUNWLE1BQU0sSUFBSSxNQUFNLENBQUM7eUJBQ2xCO3dCQUUyQixXQUFNLElBQUksQ0FBQyxJQUFJLFlBQ3pDLEdBQUcsRUFBRSxNQUFNLEVBQ1gsSUFBSSxFQUFFLE9BQU8sSUFDVixJQUFJLEVBQ1AsRUFBQTs7d0JBSkksR0FBRyxHQUFtQixTQUkxQjt3QkFHSSxjQUFjLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUMvRCxJQUFJLGNBQWMsRUFBRTs0QkFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO3lCQUN4RDt3QkFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7NEJBQy9FLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQzt5QkFDMUM7d0JBRUQsV0FBTyxHQUFHLEVBQUM7Ozs7S0FDWjtJQUVZLCtCQUFJLEdBQWpCLFVBQWtCLE1BQWMsRUFBRSxJQUFrQjtRQUFsQixxQkFBQSxFQUFBLFNBQWtCOzs7Ozs0QkFDbkMsV0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFBOzt3QkFBeEYsUUFBUSxHQUFHLFNBQTZFOzZCQUN4RixDQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLHNCQUFzQixJQUFJLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxFQUFuRyxjQUFtRzt3QkFFckcsV0FBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBQTs7d0JBQS9CLFNBQStCLENBQUM7d0JBQ3JCLFdBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsRUFBQTs7d0JBQXhGLFFBQVEsR0FBRyxTQUE2RSxDQUFDOzs7d0JBRzNGLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFOzRCQUNwRCxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0NBQzdCLElBQUksRUFBRSxNQUFNLENBQUMsY0FBYztnQ0FDM0IsR0FBRyxFQUFFLE1BQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFTOzZCQUN4RCxDQUFDLENBQUMsQ0FBQzt5QkFDTDt3QkFFRCxXQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUM7Ozs7S0FDdEI7SUFHYSw4Q0FBbUIsR0FBakMsVUFBa0MsUUFBWTtRQUFaLHlCQUFBLEVBQUEsWUFBWTs7Ozs7O3dCQUN0QyxLQUE0RixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBMUcsY0FBYyxvQkFBQSxFQUFFLG9CQUFvQiwwQkFBQSxFQUFFLGVBQWUscUJBQUEsRUFBRSxZQUFZLGtCQUFBLEVBQUUsZ0JBQWdCLHNCQUFBLENBQXNCO3dCQUNuSCxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLEVBQUE7O3dCQUFsRCxTQUFrRCxDQUFDO3dCQUNuRCxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsRUFBQTs7d0JBQXhELFNBQXdELENBQUM7d0JBRXRDLFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEVBQUE7O3dCQUEvRCxZQUFZLEdBQUcsU0FBZ0Q7d0JBQ25FLElBQUksQ0FBQyxZQUFZLEVBQUU7NEJBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQ0FDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxpQkFBaUI7Z0NBQzlCLEdBQUcsRUFBRSxXQUFXOzZCQUNqQixDQUFDLENBQUMsQ0FBQzt5QkFDTDt3QkFDSyxNQUFNLEdBQWU7NEJBQ3pCLGFBQWEsRUFBRSxZQUFZO3lCQUM1QixDQUFDO3dCQUNlLFdBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyx1Q0FBdUMsRUFBRSxNQUFNLENBQUMsRUFBQTs7d0JBQTlFLFFBQVEsR0FBRyxTQUFtRTs2QkFDaEYsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQWxCLGVBQWtCO3dCQUNaLElBQUksR0FBSyxRQUFRLENBQUMsSUFBSSxLQUFsQixDQUFtQjs2QkFDM0IsQ0FBQSxJQUFJLEtBQUssb0JBQW9CLElBQUksSUFBSSxLQUFLLHVCQUF1QixJQUFJLElBQUksS0FBSyx1QkFBdUIsQ0FBQSxFQUFyRyxlQUFxRzt3QkFLbkYsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsRUFBQTs7d0JBQTNELFdBQVcsR0FBRyxDQUFBLFNBQTZDLE1BQUssa0JBQVMsQ0FBQyxTQUFTOzZCQUNyRixDQUFBLFdBQVcsSUFBSSxJQUFJLEtBQUssdUJBQXVCLENBQUEsRUFBL0MsY0FBK0M7d0JBRTFCLFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsRUFBQTs7d0JBQWxFLGNBQWMsR0FBRyxTQUFpRDt3QkFFbEQsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsRUFBQTs7d0JBQWhFLGFBQWEsR0FBRyxTQUFnRDt3QkFDMUQsV0FBTSxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFO2dDQUNwRCxjQUFjLGdCQUFBO2dDQUNkLGFBQWEsZUFBQTs2QkFDZCxDQUFDLEVBQUE7O3dCQUhJLEdBQUcsR0FBRyxTQUdWO3dCQUNGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQ3pDLElBQUksUUFBUSxJQUFJLENBQUMsRUFBRTs0QkFDakIsV0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBRSxRQUFRLENBQUMsRUFBQzt5QkFDN0M7NkJBQU07NEJBQ0wsTUFBTSxJQUFJLEtBQUssQ0FDYixJQUFJLENBQUMsU0FBUyxDQUFDO2dDQUNiLElBQUksRUFBRSxNQUFNLENBQUMsY0FBYztnQ0FDM0IsT0FBTyxFQUFFLHVCQUF1Qjs2QkFDakMsQ0FBQyxDQUNILENBQUE7eUJBQ0Y7Ozt3QkFFSCxhQUFTLENBQUMsSUFBSSxDQUFDLGVBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO3dCQUMzQyxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEVBQUE7O3dCQUFuRCxTQUFtRCxDQUFDOzs2QkFFdEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO3dCQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLGFBQWE7d0JBQzFCLEdBQUcsRUFBRSxzQ0FBK0IsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFNO3FCQUN6RCxDQUFDLENBQUMsQ0FBQzs7NkJBRUYsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQTFCLGVBQTBCO3dCQUM1QixhQUFTLENBQUMsSUFBSSxDQUFDLGVBQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO3dCQUM3QyxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFBOzt3QkFBM0UsU0FBMkUsQ0FBQzt3QkFFNUUsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFBOzt3QkFBckcsU0FBcUcsQ0FBQzt3QkFDdEcsV0FBTztnQ0FDTCxXQUFXLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZO2dDQUN2QyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQjs2QkFDckQsRUFBQzs7NkJBSUEsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQTNCLGVBQTJCO3dCQUM3QixXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEVBQUE7O3dCQUFuRCxTQUFtRCxDQUFDO3dCQUNwRCxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFBOzt3QkFBN0UsU0FBNkUsQ0FBQzt3QkFDOUUsV0FBTSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBQTs7d0JBQWhDLFNBQWdDLENBQUM7Ozs7OztLQUVwQztJQUVhLDJEQUFnQyxHQUE5QyxVQUErQyxZQUFvQixFQUFFLFFBQWdCOzs7Ozs0QkFDdEUsV0FBTSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFOzRCQUM5QyxNQUFNLEVBQUUsTUFBTTs0QkFDZCxPQUFPLEVBQUU7Z0NBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQ0FDNUIsY0FBYyxFQUFFLGtCQUFrQjs2QkFDbkM7NEJBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7Z0NBQ25CLFVBQVUsRUFBRSxlQUFlO2dDQUMzQixTQUFTLEVBQUUsUUFBUTtnQ0FDbkIsYUFBYSxFQUFFLFlBQVk7NkJBQzVCLENBQUM7eUJBQ0gsQ0FBQyxFQUFBOzt3QkFYSSxJQUFJLEdBQUcsU0FXWDt3QkFVSSxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7NkJBQzlFLENBQUEsSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUEsRUFBdkMsY0FBdUM7d0JBQ3ZCLFdBQU0sSUFBSSxDQUFDLElBQUksRUFBRSxFQUFBOzt3QkFBN0IsSUFBSSxHQUFRLFNBQWlCO3dCQUM3QixLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxlQUFlLENBQUE7d0JBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBSSxVQUFVLEVBQUUsU0FBSSxzQkFBYSxFQUFFLHFDQUFnQyxJQUFJLENBQUMsTUFBTSxVQUFLLElBQUksQ0FBQyxLQUFLLFNBQUksSUFBSSxDQUFDLFVBQVUsV0FBTSxJQUFJLENBQUMsaUJBQWlCLFVBQUssS0FBSyxNQUFHLENBQUMsQ0FBQTs7NkJBRW5LLENBQUEsSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUEsRUFBbEIsY0FBa0I7d0JBQ1AsV0FBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUE3QixJQUFJLEdBQVEsU0FBaUI7d0JBQzdCLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLGVBQWUsQ0FBQTt3QkFDaEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFJLFVBQVUsRUFBRSxTQUFJLHNCQUFhLEVBQUUscUNBQWdDLElBQUksQ0FBQyxNQUFNLFVBQUssSUFBSSxDQUFDLEtBQUssU0FBSSxJQUFJLENBQUMsVUFBVSxXQUFNLElBQUksQ0FBQyxpQkFBaUIsVUFBSyxLQUFLLE1BQUcsQ0FBQyxDQUFBOzRCQUU1SyxXQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQTs7OztLQUNuQjtJQUdhLDZEQUFrQyxHQUFoRCxVQUFpRCxRQUFnQjs7Ozs7O3dCQUN6RCxLQUE0RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBMUUsY0FBYyxvQkFBQSxFQUFFLG9CQUFvQiwwQkFBQSxFQUFFLGVBQWUscUJBQUEsQ0FBc0I7d0JBQzlELFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEVBQUE7O3dCQUEvRCxZQUFZLEdBQUcsU0FBZ0Q7d0JBQ3JFLElBQUcsQ0FBQyxZQUFZLEVBQUU7NEJBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQ0FDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxpQkFBaUI7Z0NBQzlCLEdBQUcsRUFBRSxXQUFXOzZCQUNqQixDQUFDLENBQUMsQ0FBQzt5QkFDTDt3QkFFYSxXQUFNLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLEVBQUE7O3dCQUEzRSxLQUFLLEdBQUcsU0FBbUU7d0JBQzFELGVBQWUsR0FBK0QsS0FBSyxjQUFwRSxFQUFnQixXQUFXLEdBQW9DLEtBQUssYUFBekMsRUFBYyxpQkFBaUIsR0FBSyxLQUFLLFdBQVYsQ0FBVTt3QkFHMUcsSUFBRyxDQUFDLFdBQVcsSUFBSSxDQUFDLGlCQUFpQixFQUFFOzRCQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0NBQzdCLElBQUksRUFBRSxNQUFNLENBQUMsYUFBYTtnQ0FDMUIsR0FBRyxFQUFFLDZCQUE2Qjs2QkFDbkMsQ0FBQyxDQUFDLENBQUM7eUJBQ0w7NkJBQ0UsQ0FBQSxXQUFXLElBQUksaUJBQWlCLENBQUEsRUFBaEMsY0FBZ0M7NkJBQzlCLENBQUEsZUFBZSxLQUFLLFlBQVksQ0FBQSxFQUFoQyxjQUFnQzt3QkFDakMsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDLEVBQUE7O3dCQUFqRSxTQUFpRSxDQUFDOzs0QkFFcEUsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLEVBQUE7O3dCQUE1RCxTQUE0RCxDQUFDO3dCQUM3RCxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLG9CQUFvQixFQUFFLGlCQUFpQixHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBQTs7d0JBQTVGLFNBQTRGLENBQUM7d0JBQzdGLGFBQVMsQ0FBQyxJQUFJLENBQUMsZUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7d0JBQzdDLFdBQU87Z0NBQ0wsV0FBVyxFQUFFLFdBQVc7Z0NBQ3hCLGlCQUFpQixFQUFFLGlCQUFpQjs2QkFDckMsRUFBQzs7Ozs7S0FFTDtJQUVhLDJDQUFnQixHQUE5QixVQUErQixZQUFvQjs7Ozs7O3dCQUMzQyxLQUE0RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBMUUsY0FBYyxvQkFBQSxFQUFFLG9CQUFvQiwwQkFBQSxFQUFFLGVBQWUscUJBQUEsQ0FBc0I7d0JBR25GLFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsRUFBQTs7d0JBQWxELFNBQWtELENBQUM7d0JBQ25ELFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFBOzt3QkFBeEQsU0FBd0QsQ0FBQzt3QkFDekQsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLEVBQUE7O3dCQUE5RCxTQUE4RCxDQUFDOzs7OztLQUNoRTtJQUVhLHNDQUFXLEdBQXpCOzs7Ozs7d0JBQ1UsV0FBVyxHQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxZQUFyQixDQUFxQjt3QkFDdkIsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBQTs7d0JBQXZELFFBQVEsR0FBRyxTQUE0Qzt3QkFFN0QsSUFBSSxDQUFDLFFBQVEsRUFBRTs0QkFJUCxXQUFXLEdBQUcsU0FBTSxFQUFFLENBQUE7NEJBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQTs0QkFDbkQsV0FBTyxXQUFXLEVBQUE7eUJBQ25COzZCQUNJOzRCQUNILFdBQU8sUUFBUSxFQUFBO3lCQUNoQjs7Ozs7S0FDRjtJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQXhlRCxJQXdlQztBQXhlWSw0Q0FBZ0I7QUEwZTdCLElBQU0sVUFBVSxHQUF5QixFQUFFLENBQUM7QUFFNUMsU0FBZ0IsV0FBVyxDQUFDLE1BQStCO0lBQ3pELFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxnQkFBZ0IsdUJBQ3hDLE1BQU0sS0FDVCxLQUFLLEVBQUUsSUFBSSxJQUNYLENBQUM7QUFDTCxDQUFDO0FBTEQsa0NBS0M7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxHQUFXO0lBQzNDLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFGRCw4Q0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERBVEFfVkVSU0lPTixcbiAgTE9HSU5UWVBFLFxuICBnZXRTZGtWZXJzaW9uLFxuICBnZXRFbmRQb2ludCxcbiAgT0FVVEgyX0xPR0lOVFlQRV9QUkVGSVhcbn0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbW1vbic7XG5pbXBvcnQge1xuICBJUmVxdWVzdE9wdGlvbnMsXG4gIFNES1JlcXVlc3RJbnRlcmZhY2UsXG4gIFJlc3BvbnNlT2JqZWN0LFxuICBJVXBsb2FkUmVxdWVzdE9wdGlvbnMsXG4gIElSZXF1ZXN0Q29uZmlnXG59IGZyb20gJ0BjbG91ZGJhc2UvYWRhcHRlci1pbnRlcmZhY2UnO1xuaW1wb3J0IHsgdXRpbHMsand0LGFkYXB0ZXJzLGNvbnN0YW50cyB9IGZyb20gJ0BjbG91ZGJhc2UvdXRpbGl0aWVzJztcbmltcG9ydCB7IEtWIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBJR2V0QWNjZXNzVG9rZW5SZXN1bHQsIElDbG91ZGJhc2VSZXF1ZXN0Q29uZmlnLCBJQXBwZW5kZWRSZXF1ZXN0SW5mbywgSVJlcXVlc3RCZWZvcmVIb29rIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9yZXF1ZXN0JztcbmltcG9ydCB7IElDbG91ZGJhc2VDYWNoZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY2FjaGUnO1xuaW1wb3J0IHsgY2xvdWRiYXNlIH0gZnJvbSAnLi4nO1xuaW1wb3J0IHsgZ2V0Q2FjaGVCeUVudklkLCBnZXRMb2NhbENhY2hlIH0gZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgeyBFVkVOVFMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi9hZGFwdGVyJztcbmNvbnN0IHsgZ2V0U2RrTmFtZSwgRVJST1JTIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IGdlblNlcUlkLGlzRm9ybURhdGEsZm9ybWF0VXJsLGNyZWF0ZVNpZ24gfSA9IHV0aWxzO1xuY29uc3QgeyBSVU5USU1FIH0gPSBhZGFwdGVycztcblxuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCdcblxuLy8gaW1wb3J0IEZpbmdlcnByaW50SlMgZnJvbSAnQGZpbmdlcnByaW50anMvZmluZ2VycHJpbnRqcydcbi8vIGNvbnN0IGZwUHJvbWlzZSA9IEZpbmdlcnByaW50SlMubG9hZCgpXG5cbi8vIOS4i+mdouWHoOenjSBhY3Rpb24g5LiN6ZyA6KaBIGFjY2VzcyB0b2tlblxuY29uc3QgQUNUSU9OU19XSVRIT1VUX0FDQ0VTU1RPS0VOID0gW1xuICAnYXV0aC5nZXRKd3QnLFxuICAnYXV0aC5sb2dvdXQnLFxuICAnYXV0aC5zaWduSW5XaXRoVGlja2V0JyxcbiAgJ2F1dGguc2lnbkluQW5vbnltb3VzbHknLFxuICAnYXV0aC5zaWduSW4nLFxuICAnYXV0aC5mZXRjaEFjY2Vzc1Rva2VuV2l0aFJlZnJlc2hUb2tlbicsXG4gICdhdXRoLnNpZ25VcFdpdGhFbWFpbEFuZFBhc3N3b3JkJyxcbiAgJ2F1dGguYWN0aXZhdGVFbmRVc2VyTWFpbCcsXG4gICdhdXRoLnNlbmRQYXNzd29yZFJlc2V0RW1haWwnLFxuICAnYXV0aC5yZXNldFBhc3N3b3JkV2l0aFRva2VuJyxcbiAgJ2F1dGguaXNVc2VybmFtZVJlZ2lzdGVyZWQnXG5dO1xuXG5mdW5jdGlvbiBiaW5kSG9va3MoaW5zdGFuY2U6IFNES1JlcXVlc3RJbnRlcmZhY2UsIG5hbWU6IHN0cmluZywgaG9va3M6IElSZXF1ZXN0QmVmb3JlSG9va1tdKSB7XG4gIGNvbnN0IG9yaWdpbk1ldGhvZCA9IGluc3RhbmNlW25hbWVdO1xuICBpbnN0YW5jZVtuYW1lXSA9IGZ1bmN0aW9uIChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpIHtcbiAgICBjb25zdCBkYXRhID0ge307XG4gICAgY29uc3QgaGVhZGVycyA9IHt9O1xuICAgIGhvb2tzLmZvckVhY2goaG9vayA9PiB7XG4gICAgICBjb25zdCB7IGRhdGE6IGFwcGVuZGVkRGF0YSwgaGVhZGVyczogYXBwZW5kZWRIZWFkZXJzIH0gPSBob29rLmNhbGwoaW5zdGFuY2UsIG9wdGlvbnMpO1xuICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCBhcHBlbmRlZERhdGEpO1xuICAgICAgT2JqZWN0LmFzc2lnbihoZWFkZXJzLCBhcHBlbmRlZEhlYWRlcnMpO1xuICAgIH0pO1xuICAgIGNvbnN0IG9yaWdpbkRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgb3JpZ2luRGF0YSAmJiAoKCkgPT4ge1xuICAgICAgaWYgKGlzRm9ybURhdGEob3JpZ2luRGF0YSkpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgIChvcmlnaW5EYXRhIGFzIEZvcm1EYXRhKS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMuZGF0YSA9IHtcbiAgICAgICAgLi4ub3JpZ2luRGF0YSxcbiAgICAgICAgLi4uZGF0YVxuICAgICAgfTtcbiAgICB9KSgpO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHtcbiAgICAgIC4uLihvcHRpb25zLmhlYWRlcnMgfHwge30pLFxuICAgICAgLi4uaGVhZGVyc1xuICAgIH07XG4gICAgcmV0dXJuIChvcmlnaW5NZXRob2QgYXMgRnVuY3Rpb24pLmNhbGwoaW5zdGFuY2UsIG9wdGlvbnMpO1xuICB9O1xufVxuZnVuY3Rpb24gYmVmb3JlRWFjaCgpOiBJQXBwZW5kZWRSZXF1ZXN0SW5mbyB7XG4gIGNvbnN0IHNlcUlkID0gZ2VuU2VxSWQoKTtcbiAgcmV0dXJuIHtcbiAgICBkYXRhOiB7XG4gICAgICBzZXFJZFxuICAgIH0sXG4gICAgaGVhZGVyczoge1xuICAgICAgJ1gtU0RLLVZlcnNpb24nOiBgQGNsb3VkYmFzZS9qcy1zZGsvJHtnZXRTZGtWZXJzaW9uKCl9YCxcbiAgICAgICd4LXNlcWlkJzogc2VxSWRcbiAgICB9XG4gIH07XG59XG5leHBvcnQgaW50ZXJmYWNlIElDbG91ZGJhc2VSZXF1ZXN0IHtcbiAgZmV0Y2g6ICh1cmxPclBhdGg6IHN0cmluZywgaW5pdD86IFJlcXVlc3RJbml0KSA9PiBQcm9taXNlPFJlc3BvbnNlPjtcbiAgcG9zdDogKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucykgPT4gUHJvbWlzZTxSZXNwb25zZU9iamVjdD47XG4gIHVwbG9hZDogKG9wdGlvbnM6IElVcGxvYWRSZXF1ZXN0T3B0aW9ucykgPT4gUHJvbWlzZTxSZXNwb25zZU9iamVjdD47XG4gIGRvd25sb2FkOiAob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKSA9PiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PjtcbiAgcmVmcmVzaEFjY2Vzc1Rva2VuOiAoKSA9PiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD47XG4gIGdldEFjY2Vzc1Rva2VuOiAoKSA9PiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD47XG4gIHJlcXVlc3Q6IChhY3Rpb246IHN0cmluZywgcGFyYW1zOiBLVjxhbnk+LCBvcHRpb25zPzogS1Y8YW55PikgPT4gUHJvbWlzZTxSZXNwb25zZU9iamVjdD47XG4gIHNlbmQ6IChhY3Rpb246IHN0cmluZywgZGF0YTogS1Y8YW55PikgPT4gUHJvbWlzZTxhbnk+O1xufVxuXG4vKipcbiAqIEBjbGFzcyBDbG91ZGJhc2VSZXF1ZXN0XG4gKi9cbmV4cG9ydCBjbGFzcyBDbG91ZGJhc2VSZXF1ZXN0IGltcGxlbWVudHMgSUNsb3VkYmFzZVJlcXVlc3Qge1xuICBjb25maWc6IElDbG91ZGJhc2VSZXF1ZXN0Q29uZmlnO1xuICBfc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuSG9vazogRnVuY3Rpb25cbiAgX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2U6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB8IG51bGxcbiAgX3JlcUNsYXNzOiBTREtSZXF1ZXN0SW50ZXJmYWNlO1xuICAvLyDor7fmsYLlpLHotKXmmK/lkKbmipvlh7pFcnJvclxuICBwcml2YXRlIF90aHJvd1doZW5SZXF1ZXN0RmFpbCA9IGZhbHNlO1xuICBwcml2YXRlIF9jYWNoZTogSUNsb3VkYmFzZUNhY2hlO1xuICAvLyDmjIHkuYXljJbmnKzlnLDlrZjlgqhcbiAgcHJpdmF0ZSBfbG9jYWxDYWNoZTogSUNsb3VkYmFzZUNhY2hlO1xuICAvKipcbiAgICog5Yid5aeL5YyWXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSUNsb3VkYmFzZVJlcXVlc3RDb25maWcgJiB7IHRocm93PzogYm9vbGVhbiB9KSB7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgdGhpcy5fcmVxQ2xhc3MgPSBuZXcgUGxhdGZvcm0uYWRhcHRlci5yZXFDbGFzcyg8SVJlcXVlc3RDb25maWc+e1xuICAgICAgdGltZW91dDogdGhpcy5jb25maWcudGltZW91dCxcbiAgICAgIHRpbWVvdXRNc2c6IGBbQGNsb3VkYmFzZS9qcy1zZGtdIOivt+axguWcqCR7dGhpcy5jb25maWcudGltZW91dCAvIDEwMDB9c+WGheacquWujOaIkO+8jOW3suS4reaWrWAsXG4gICAgICByZXN0cmljdGVkTWV0aG9kczogWydwb3N0J11cbiAgICB9KTtcbiAgICB0aGlzLl90aHJvd1doZW5SZXF1ZXN0RmFpbCA9IGNvbmZpZy50aHJvdyB8fCBmYWxzZTtcbiAgICB0aGlzLl9jYWNoZSA9IGdldENhY2hlQnlFbnZJZCh0aGlzLmNvbmZpZy5lbnYpO1xuICAgIHRoaXMuX2xvY2FsQ2FjaGUgPSBnZXRMb2NhbENhY2hlKHRoaXMuY29uZmlnLmVudik7XG4gICAgYmluZEhvb2tzKHRoaXMuX3JlcUNsYXNzLCAncG9zdCcsIFtiZWZvcmVFYWNoXSk7XG4gICAgYmluZEhvb2tzKHRoaXMuX3JlcUNsYXNzLCAndXBsb2FkJywgW2JlZm9yZUVhY2hdKTtcbiAgICBiaW5kSG9va3ModGhpcy5fcmVxQ2xhc3MsICdkb3dubG9hZCcsIFtiZWZvcmVFYWNoXSk7XG4gIH1cblxuICAvKipcbiAgICog5aWX5LiA5bGCIGZldGNo77yM5pa55L6/5aSE55CG6K+35rGC5Zyw5Z2AXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgIHVybE9yUGF0aFxuICAgKiBAcGFyYW0ge1JlcXVlc3RJbml0fSBpbml0XG4gICAqIEByZXR1cm5zIFxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZldGNoKHVybE9yUGF0aDogc3RyaW5nLCBpbml0PzogUmVxdWVzdEluaXQpOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gICAgY29uc3QgZGV2aWNlSWQgPSBhd2FpdCB0aGlzLmdldERldmljZUlkKCk7XG5cbiAgICBjb25zdCBoZWFkZXJzID0ge1xuICAgICAgJ1gtUHJvamVjdC1JZCc6ICdwcm9kdWN0aW9uLWZ2OTc5JyxcbiAgICAgICdYLVNESy1WZXJzaW9uJzogYEBjbG91ZGJhc2UvanMtc2RrLyR7Z2V0U2RrVmVyc2lvbigpfWAsXG4gICAgICAnWC1SZXF1ZXN0LUlkJzogZ2VuU2VxSWQoKSxcbiAgICAgICdYLVJlcXVlc3QtVGltZXN0YW1wJzogRGF0ZS5ub3coKSxcbiAgICAgICdYLURldmljZS1JZCc6IGRldmljZUlkXG4gICAgfVxuICAgIC8vIOmdnndlYuW5s+WPsOS9v+eUqOWHreivgeajgOmqjOacieaViOaAp1xuICAgIGlmKFBsYXRmb3JtLnJ1bnRpbWUgIT09IFJVTlRJTUUuV0VCKSB7XG4gICAgICBjb25zdCB7IGFwcFNpZ24sYXBwU2VjcmV0IH0gPSB0aGlzLmNvbmZpZ1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKVxuICAgICAgY29uc3QgeyBhcHBBY2Nlc3NLZXksIGFwcEFjY2Vzc0tleUlkIH0gPSBhcHBTZWNyZXRcbiAgICAgIGNvbnN0IHNpZ24gPSBjcmVhdGVTaWduKHtcbiAgICAgICAgLy8gZGF0YTogaW5pdC5ib2R5LFxuICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICBhcHBBY2Nlc3NLZXlJZCxcbiAgICAgICAgYXBwU2lnblxuICAgICAgfSxhcHBBY2Nlc3NLZXkpXG5cbiAgICAgIGhlYWRlcnNbJ1gtVENCLUFwcC1Tb3VyY2UnXSA9IGB0aW1lc3RhbXA9JHt0aW1lc3RhbXB9O2FwcEFjY2Vzc0tleUlkPSR7YXBwQWNjZXNzS2V5SWR9O2FwcFNpZ249JHthcHBTaWdufTtzaWduPSR7c2lnbn1gXG4gICAgfVxuXG4gICAgaW5pdC5oZWFkZXJzID0gT2JqZWN0LmFzc2lnbih7fSwgaW5pdC5oZWFkZXJzLCBoZWFkZXJzKVxuXG4gICAgY29uc3QgeyBQUk9UT0NPTCwgQkFTRV9VUkwgfSA9IGdldEVuZFBvaW50KClcbiAgICBjb25zdCB3ZWJFbmRwb2ludCA9IGAke1BST1RPQ09MfSR7QkFTRV9VUkx9YFxuICAgIGNvbnN0IHVybCA9IHVybE9yUGF0aC5zdGFydHNXaXRoKCdodHRwJylcbiAgICAgID8gdXJsT3JQYXRoXG4gICAgICA6YCR7bmV3IFVSTCh3ZWJFbmRwb2ludCkub3JpZ2lufSR7dXJsT3JQYXRofWBcbiAgICByZXR1cm4gYXdhaXQgZmV0Y2godXJsLCBpbml0KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHBvc3Qob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxSZXNwb25zZU9iamVjdD4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX3JlcUNsYXNzLnBvc3Qob3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBwdWJsaWMgYXN5bmMgdXBsb2FkKG9wdGlvbnM6IElVcGxvYWRSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXFDbGFzcy51cGxvYWQob3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBwdWJsaWMgYXN5bmMgZG93bmxvYWQob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxSZXNwb25zZU9iamVjdD4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX3JlcUNsYXNzLmRvd25sb2FkKG9wdGlvbnMpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVmcmVzaEFjY2Vzc1Rva2VuKCk6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB7XG4gICAgLy8g5Y+v6IO95Lya5ZCM5pe26LCD55So5aSa5qyh5Yi35pawYWNjZXNzIHRva2Vu77yM6L+Z6YeM5oqK5a6D5Lus5ZCI5bm25oiQ5LiA5LiqXG4gICAgaWYgKCF0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlKSB7XG4gICAgICAvLyDmsqHmnInmraPlnKjliLfmlrDvvIzpgqPkuYjmraPluLjmiafooYzliLfmlrDpgLvovpFcbiAgICAgIHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UgPSB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW4oKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0O1xuICAgIGxldCBlcnI7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZXJyID0gZTtcbiAgICB9XG4gICAgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZSA9IG51bGw7XG4gICAgdGhpcy5fc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuSG9vayA9IG51bGw7XG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlZnJlc2hBY2Nlc3NUb2tlbkZyb21PYXV0aFNlcnZlcihjbGllbnRJZDogc3RyaW5nKTogUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+IHtcbiAgICAvLyDlj6/og73kvJrlkIzml7bosIPnlKjlpJrmrKHliLfmlrAgYWNjZXNzIHRva2Vu77yM6L+Z6YeM5oqK5a6D5Lus5ZCI5bm25oiQ5LiA5LiqXG4gICAgaWYoIXRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UpIHtcbiAgICAgIC8vIOayoeacieato+WcqOWIt+aWsO+8jOmCo+S5iOato+W4uOaJp+ihjOWIt+aWsOmAu+i+kVxuICAgICAgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZSA9IHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlbkZyb21PYXV0aFNlcnZlcihjbGllbnRJZCk7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdDtcbiAgICBsZXQgZXJyO1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgZXJyID0gZTtcbiAgICB9XG4gICAgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZSA9IG51bGw7XG4gICAgdGhpcy5fc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuSG9vayA9IG51bGw7XG4gICAgaWYoZXJyKSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyDojrflj5YgYWNjZXNzIHRva2VuXG4gIHB1YmxpYyBhc3luYyBnZXRBY2Nlc3NUb2tlbigpOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4ge1xuICAgIGNvbnN0IHsgbG9naW5UeXBlS2V5LGFjY2Vzc1Rva2VuS2V5LGFjY2Vzc1Rva2VuRXhwaXJlS2V5LHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCBsb2dpblR5cGUgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGxvZ2luVHlwZUtleSk7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGlmICghcmVmcmVzaFRva2VuKSB7XG4gICAgICAvLyDkuI3or6Xlh7rnjrDnmoTnirbmgIHvvJrmnIkgYWNjZXNzIHRva2VuIOWNtOayoeaciSByZWZyZXNoIHRva2VuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsXG4gICAgICAgIG1zZzogJ3JlZnJlc2ggdG9rZW4gaXMgbm90IGV4aXN0LCB5b3VyIGxvY2FsIGRhdGEgbWlnaHQgYmUgbWVzc2VkIHVwLCBwbGVhc2UgcmV0cnkgYWZ0ZXIgY2xlYXIgbG9jYWxTdG9yYWdlIG9yIHNlc3Npb25TdG9yYWdlJ1xuICAgICAgfSkpO1xuICAgIH1cbiAgICAvLyDlpoLmnpzmsqHmnIlhY2Nlc3MgdG9rZW7miJbogIXov4fmnJ/vvIzpgqPkuYjliLfmlrBcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuRXhwaXJlID0gTnVtYmVyKGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpKTtcblxuICAgIC8vIOiwg+eUqOmSqeWtkOWHveaVsFxuICAgIGxldCBzaG91bGRSZWZyZXNoQWNjZXNzVG9rZW4gPSB0cnVlO1xuICAgIGlmICh0aGlzLl9zaG91bGRSZWZyZXNoQWNjZXNzVG9rZW5Ib29rICYmICEoYXdhaXQgdGhpcy5fc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuSG9vayhhY2Nlc3NUb2tlbiwgYWNjZXNzVG9rZW5FeHBpcmUpKSkge1xuICAgICAgc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYoKCFhY2Nlc3NUb2tlbiB8fCAhYWNjZXNzVG9rZW5FeHBpcmUgfHwgYWNjZXNzVG9rZW5FeHBpcmUgPCBEYXRlLm5vdygpKSAmJiBzaG91bGRSZWZyZXNoQWNjZXNzVG9rZW4pIHtcbiAgICAgIGlmIChsb2dpblR5cGUuc3RhcnRzV2l0aChPQVVUSDJfTE9HSU5UWVBFX1BSRUZJWCkpIHtcbiAgICAgICAgLy8gTk9URTog6L+Z6YeM6ZyA6KaB5LuOIGFjY2Vzc1Rva2VuIOino+WHuuadpemDqOWIhuS/oeaBr++8jOeUqOS6juWIt+aWsCBhY2Nlc3NUb2tlblxuICAgICAgICAvLyDmiYDku6Xov4fmnJ/nmoQgYWNjZXNzVG9rZW4g5LiN6IO95Yig6Zmk77yM6ICM5piv55So5pawIGFjY2Vzc1Rva2VuIOimhuebllxuICAgICAgICBpZiAoYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgICBsZXQgaGVhZGVyID0gbnVsbFxuICAgICAgICAgIGxldCBwYXlsb2FkID0gbnVsbFxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBoZWFkZXIgPSBqd3QuZGVjb2RlKGFjY2Vzc1Rva2VuLCB7aGVhZGVyOiB0cnVlfSlcbiAgICAgICAgICAgIHBheWxvYWQgPSBqd3QuZGVjb2RlKGFjY2Vzc1Rva2VuKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBbREVDT0RFX0FDQ0VTU19UT0tFTl9FUlJPUl0gJHtlLm1lc3NhZ2V9LCBhY2Nlc3N0b2tlbjogJHthY2Nlc3NUb2tlbn1gKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGVhZGVyPy5raWQgJiYgcGF5bG9hZD8ucHJvamVjdF9pZCkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVmcmVzaEFjY2Vzc1Rva2VuRnJvbU9hdXRoU2VydmVyKHBheWxvYWQ/LnByb2plY3RfaWQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIC8vIOi/memHjOeUqCBlbnYg6K+V5LiA5LiLXG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVmcmVzaEFjY2Vzc1Rva2VuRnJvbU9hdXRoU2VydmVyKHRoaXMuY29uZmlnLmVudilcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyDov5Tlm57mnKzlnLDnmoRhY2Nlc3MgdG9rZW5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjY2Vzc1Rva2VuLFxuICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyZVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG4gIHB1YmxpYyBhc3luYyByZXF1ZXN0KGFjdGlvbjogc3RyaW5nLCBwYXJhbXM6IEtWPGFueT4sIG9wdGlvbnM/OiBLVjxhbnk+KTogUHJvbWlzZTxSZXNwb25zZU9iamVjdD4ge1xuICAgIGNvbnN0IHRjYlRyYWNlS2V5ID0gYHgtdGNiLXRyYWNlXyR7dGhpcy5jb25maWcuZW52fWA7XG4gICAgbGV0IGNvbnRlbnRUeXBlID0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc7XG4gICAgLy8gY29uc3Qgd2ViRGV2aWNlSWQgPSBhd2FpdCBnZXRUY2JGaW5nZXJwcmludElkKCk7XG4gICAgY29uc3QgdG1wT2JqOiBLVjxhbnk+ID0ge1xuICAgICAgYWN0aW9uLFxuICAgICAgLy8gd2ViRGV2aWNlSWQsXG4gICAgICBkYXRhVmVyc2lvbjogREFUQV9WRVJTSU9OLFxuICAgICAgZW52OiB0aGlzLmNvbmZpZy5lbnYsXG4gICAgICAuLi5wYXJhbXNcbiAgICB9O1xuXG5cbiAgICBpZiAoQUNUSU9OU19XSVRIT1VUX0FDQ0VTU1RPS0VOLmluZGV4T2YoYWN0aW9uKSA9PT0gLTEpIHtcbiAgICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuXG4gICAgICAvLyDoi6XmnIkgcmVmcmVzaFRva2VuIOWImeS7u+WKoeacieeZu+W9leaAgSDliLcgYWNjZXNzVG9rZW5cbiAgICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICAgIGlmIChyZWZyZXNoVG9rZW4pIHtcbiAgICAgICAgdG1wT2JqLmFjY2Vzc190b2tlbiA9IChhd2FpdCB0aGlzLmdldEFjY2Vzc1Rva2VuKCkpLmFjY2Vzc1Rva2VuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIOaLvGJvZHnlkoxjb250ZW50LXR5cGVcbiAgICBsZXQgcGF5bG9hZDtcbiAgICBpZiAoYWN0aW9uID09PSAnc3RvcmFnZS51cGxvYWRGaWxlJykge1xuICAgICAgcGF5bG9hZCA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgZm9yIChsZXQga2V5IGluIHBheWxvYWQpIHtcbiAgICAgICAgaWYgKHBheWxvYWQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBwYXlsb2FkW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHBheWxvYWQuYXBwZW5kKGtleSwgdG1wT2JqW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb250ZW50VHlwZSA9ICdtdWx0aXBhcnQvZm9ybS1kYXRhJztcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGVudFR5cGUgPSAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04JztcbiAgICAgIHBheWxvYWQgPSB7fTtcbiAgICAgIGZvciAobGV0IGtleSBpbiB0bXBPYmopIHtcbiAgICAgICAgaWYgKHRtcE9ialtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBwYXlsb2FkW2tleV0gPSB0bXBPYmpba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBsZXQgb3B0czogYW55ID0ge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnY29udGVudC10eXBlJzogY29udGVudFR5cGVcbiAgICAgIH1cbiAgICB9O1xuICAgIGlmIChvcHRpb25zPy5bJ29uVXBsb2FkUHJvZ3Jlc3MnXSkge1xuICAgICAgb3B0cy5vblVwbG9hZFByb2dyZXNzID0gb3B0aW9uc1snb25VcGxvYWRQcm9ncmVzcyddO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZy5yZWdpb24pIHtcbiAgICAgIG9wdHMuaGVhZGVyc1snWC1UQ0ItUmVnaW9uJ10gPSB0aGlzLmNvbmZpZy5yZWdpb247XG4gICAgfVxuXG4gICAgY29uc3QgdHJhY2VIZWFkZXIgPSB0aGlzLl9sb2NhbENhY2hlLmdldFN0b3JlKHRjYlRyYWNlS2V5KTtcbiAgICBpZiAodHJhY2VIZWFkZXIpIHtcbiAgICAgIG9wdHMuaGVhZGVyc1snWC1UQ0ItVHJhY2UnXSA9IHRyYWNlSGVhZGVyO1xuICAgIH1cbiAgICAvLyDpnZ53ZWLlubPlj7Dkvb/nlKjlh63or4Hmo4DpqozmnInmlYjmgKdcbiAgICBpZiAoUGxhdGZvcm0ucnVudGltZSAhPT0gUlVOVElNRS5XRUIpIHtcbiAgICAgIGNvbnN0IHsgYXBwU2lnbiwgYXBwU2VjcmV0IH0gPSB0aGlzLmNvbmZpZztcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCB7IGFwcEFjY2Vzc0tleSwgYXBwQWNjZXNzS2V5SWQgfSA9IGFwcFNlY3JldDtcbiAgICAgIGNvbnN0IHNpZ24gPSBjcmVhdGVTaWduKHtcbiAgICAgICAgZGF0YToge30sIC8vIOagoemqjOetvuWQjea1geeoi+WunumZheacqueUqOWIsO+8jOWPr+iuvuepulxuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgIGFwcEFjY2Vzc0tleUlkLFxuICAgICAgICBhcHBTaWduXG4gICAgICB9LCBhcHBBY2Nlc3NLZXkpO1xuXG4gICAgICBvcHRzLmhlYWRlcnNbJ1gtVENCLUFwcC1Tb3VyY2UnXSA9IGB0aW1lc3RhbXA9JHt0aW1lc3RhbXB9O2FwcEFjY2Vzc0tleUlkPSR7YXBwQWNjZXNzS2V5SWR9O2FwcFNpZ249JHthcHBTaWdufTtzaWduPSR7c2lnbn1gO1xuICAgIH1cblxuICAgIC8vIOWPkeWHuuivt+axglxuICAgIC8vIOaWsOeahCB1cmwg6ZyA6KaB5pC65bimIGVudiDlj4LmlbDov5vooYwgQ09SUyDmoKHpqoxcbiAgICAvLyDor7fmsYLpk77mjqXmlK/mjIHmt7vliqDliqjmgIEgcXVlcnkg5Y+C5pWw77yM5pa55L6/55So5oi36LCD6K+V5a6a5L2N6K+35rGCXG4gICAgY29uc3QgeyBwYXJzZSwgaW5RdWVyeSwgc2VhcmNoIH0gPSBwYXJhbXM7XG4gICAgbGV0IGZvcm1hdFF1ZXJ5OiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge1xuICAgICAgZW52OiB0aGlzLmNvbmZpZy5lbnZcbiAgICB9O1xuICAgIC8vIOWwneivleino+aekOWTjeW6lOaVsOaNruS4uiBKU09OXG4gICAgcGFyc2UgJiYgKGZvcm1hdFF1ZXJ5LnBhcnNlID0gdHJ1ZSk7XG4gICAgaW5RdWVyeSAmJiAoZm9ybWF0UXVlcnkgPSB7XG4gICAgICAuLi5pblF1ZXJ5LFxuICAgICAgLi4uZm9ybWF0UXVlcnlcbiAgICB9KTtcbiAgICBjb25zdCB7IEJBU0VfVVJMLCBQUk9UT0NPTCB9ID0gZ2V0RW5kUG9pbnQoKTtcbiAgICAvLyDnlJ/miJDor7fmsYIgdXJsXG4gICAgbGV0IG5ld1VybCA9IGZvcm1hdFVybChQUk9UT0NPTCwgQkFTRV9VUkwsIGZvcm1hdFF1ZXJ5KTtcblxuICAgIGlmIChzZWFyY2gpIHtcbiAgICAgIG5ld1VybCArPSBzZWFyY2g7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzOiBSZXNwb25zZU9iamVjdCA9IGF3YWl0IHRoaXMucG9zdCh7XG4gICAgICB1cmw6IG5ld1VybCxcbiAgICAgIGRhdGE6IHBheWxvYWQsXG4gICAgICAuLi5vcHRzXG4gICAgfSk7XG5cbiAgICAvLyDkv53lrZggdHJhY2UgaGVhZGVyXG4gICAgY29uc3QgcmVzVHJhY2VIZWFkZXIgPSByZXMuaGVhZGVyICYmIHJlcy5oZWFkZXJbJ3gtdGNiLXRyYWNlJ107XG4gICAgaWYgKHJlc1RyYWNlSGVhZGVyKSB7XG4gICAgICB0aGlzLl9sb2NhbENhY2hlLnNldFN0b3JlKHRjYlRyYWNlS2V5LCByZXNUcmFjZUhlYWRlcik7XG4gICAgfVxuXG4gICAgaWYgKChOdW1iZXIocmVzLnN0YXR1cykgIT09IDIwMCAmJiBOdW1iZXIocmVzLnN0YXR1c0NvZGUpICE9PSAyMDApIHx8ICFyZXMuZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCduZXR3b3JrIHJlcXVlc3QgZXJyb3InKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNlbmQoYWN0aW9uOiBzdHJpbmcsIGRhdGE6IEtWPGFueT4gPSB7fSk6IFByb21pc2U8YW55PiB7XG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0KGFjdGlvbiwgZGF0YSwgeyBvblVwbG9hZFByb2dyZXNzOiBkYXRhLm9uVXBsb2FkUHJvZ3Jlc3MgfSk7XG4gICAgaWYgKHJlc3BvbnNlLmRhdGEuY29kZSA9PT0gJ0FDQ0VTU19UT0tFTl9FWFBJUkVEJyAmJiBBQ1RJT05TX1dJVEhPVVRfQUNDRVNTVE9LRU4uaW5kZXhPZihhY3Rpb24pID09PSAtMSkge1xuICAgICAgLy8gYWNjZXNzX3Rva2Vu6L+H5pyf77yM6YeN5paw6I635Y+WXG4gICAgICBhd2FpdCB0aGlzLnJlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QoYWN0aW9uLCBkYXRhLCB7IG9uVXBsb2FkUHJvZ3Jlc3M6IGRhdGEub25VcGxvYWRQcm9ncmVzcyB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVzcG9uc2UuZGF0YS5jb2RlICYmIHRoaXMuX3Rocm93V2hlblJlcXVlc3RGYWlsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsXG4gICAgICAgIG1zZzogYFske3Jlc3BvbnNlLmRhdGEuY29kZX1dICR7cmVzcG9uc2UuZGF0YS5tZXNzYWdlfWBcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgfVxuXG4gIC8vIOiwg+eUqOaOpeWPo+WIt+aWsGFjY2VzcyB0b2tlbu+8jOW5tuS4lOi/lOWbnlxuICBwcml2YXRlIGFzeW5jIF9yZWZyZXNoQWNjZXNzVG9rZW4ocmV0cnlOdW0gPSAxKTogUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+IHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbkV4cGlyZUtleSwgcmVmcmVzaFRva2VuS2V5LCBsb2dpblR5cGVLZXksIGFub255bW91c1V1aWRLZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSk7XG5cbiAgICBsZXQgcmVmcmVzaFRva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGlmICghcmVmcmVzaFRva2VuKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sXG4gICAgICAgIG1zZzogJ25vdCBsb2dpbidcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgY29uc3QgcGFyYW1zOiBLVjxzdHJpbmc+ID0ge1xuICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdCgnYXV0aC5mZXRjaEFjY2Vzc1Rva2VuV2l0aFJlZnJlc2hUb2tlbicsIHBhcmFtcyk7XG4gICAgaWYgKHJlc3BvbnNlLmRhdGEuY29kZSkge1xuICAgICAgY29uc3QgeyBjb2RlIH0gPSByZXNwb25zZS5kYXRhO1xuICAgICAgaWYgKGNvZGUgPT09ICdTSUdOX1BBUkFNX0lOVkFMSUQnIHx8IGNvZGUgPT09ICdSRUZSRVNIX1RPS0VOX0VYUElSRUQnIHx8IGNvZGUgPT09ICdJTlZBTElEX1JFRlJFU0hfVE9LRU4nKSB7XG4gICAgICAgIC8vIOi/memHjOWkhOeQhuS7peS4i+mAu+i+ke+8mlxuICAgICAgICAvLyDljL/lkI3nmbvlvZXml7bvvIzlpoLmnpzliLfmlrBhY2Nlc3MgdG9rZW7miqXplJlyZWZyZXNoIHRva2Vu6L+H5pyf77yM5q2k5pe25bqU6K+l77yaXG4gICAgICAgIC8vIDEuIOWGjeeUqCB1dWlkIOaLv+S4gOasoeaWsOeahHJlZnJlc2ggdG9rZW5cbiAgICAgICAgLy8gMi4g5ou/5paw55qEcmVmcmVzaCB0b2tlbuaNomFjY2VzcyB0b2tlblxuICAgICAgICBjb25zdCBpc0Fub255bW91cyA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMobG9naW5UeXBlS2V5KSA9PT0gTE9HSU5UWVBFLkFOT05ZTU9VUztcbiAgICAgICAgaWYgKGlzQW5vbnltb3VzICYmIGNvZGUgPT09ICdJTlZBTElEX1JFRlJFU0hfVE9LRU4nKSB7XG4gICAgICAgICAgLy8g6I635Y+W5paw55qEIHJlZnJlc2ggdG9rZW5cbiAgICAgICAgICBjb25zdCBhbm9ueW1vdXNfdXVpZCA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYW5vbnltb3VzVXVpZEtleSk7XG4gICAgICAgICAgLy8g5q2k5aSEY2FjaGXkuLrln7rnsbtwcm9wZXJ0eVxuICAgICAgICAgIGNvbnN0IHJlZnJlc2hfdG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5zZW5kKCdhdXRoLnNpZ25JbkFub255bW91c2x5Jywge1xuICAgICAgICAgICAgYW5vbnltb3VzX3V1aWQsXG4gICAgICAgICAgICByZWZyZXNoX3Rva2VuXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5fc2V0UmVmcmVzaFRva2VuKHJlcy5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICBpZiAocmV0cnlOdW0gPj0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlbigtLXJldHJ5TnVtKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgY29kZTogRVJST1JTLk9QRVJBVElPTl9GQUlMLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICfph43or5Xojrflj5YgcmVmcmVzaCB0b2tlbiDlpLHotKUnXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNsb3VkYmFzZS5maXJlKEVWRU5UUy5MT0dJTl9TVEFURV9FWFBJUkVEKTtcbiAgICAgICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLk5FVFdPUktfRVJST1IsXG4gICAgICAgIG1zZzogYHJlZnJlc2ggYWNjZXNzX3Rva2VuIGZhaWxlZO+8miR7cmVzcG9uc2UuZGF0YS5jb2RlfWBcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYgKHJlc3BvbnNlLmRhdGEuYWNjZXNzX3Rva2VuKSB7XG4gICAgICBjbG91ZGJhc2UuZmlyZShFVkVOVFMuQUNDRVNTX1RPS0VOX1JFRlJFU0hEKTtcbiAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXksIHJlc3BvbnNlLmRhdGEuYWNjZXNzX3Rva2VuKTtcbiAgICAgIC8vIOacrOWcsOaXtumXtOWPr+iDveayoeacieWQjOatpVxuICAgICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSwgcmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW5fZXhwaXJlICsgRGF0ZS5ub3coKSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhY2Nlc3NUb2tlbjogcmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW4sXG4gICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlOiByZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbl9leHBpcmVcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIOWMv+WQjeeZu+W9lXJlZnJlc2hfdG9rZW7ov4fmnJ/mg4XlhrXkuIvov5Tlm55yZWZyZXNoX3Rva2VuXG4gICAgLy8g5q2k5Zy65pmv5LiL5L2/55So5paw55qEcmVmcmVzaF90b2tlbuiOt+WPlmFjY2Vzc190b2tlblxuICAgIGlmIChyZXNwb25zZS5kYXRhLnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5LCByZXNwb25zZS5kYXRhLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgYXdhaXQgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfZmV0Y2hBY2Nlc3NUb2tlbkZyb21PYXV0aFNlcnZlcihyZWZyZXNoVG9rZW46IHN0cmluZywgY2xpZW50SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLmZldGNoKCcvYXV0aC92MS90b2tlbicsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBncmFudF90eXBlOiAncmVmcmVzaF90b2tlbicsXG4gICAgICAgIGNsaWVudF9pZDogY2xpZW50SWQsXG4gICAgICAgIHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlblxuICAgICAgfSlcbiAgICB9KVxuICAgIC8vIFJlc3A6XG4gICAgLy8ge1xuICAgIC8vICAgXCJ0b2tlbl90eXBlXCI6IFwiQmVhcmVyXCIsXG4gICAgLy8gICBcImFjY2Vzc190b2tlblwiOiBcIlwiLFxuICAgIC8vICAgXCJyZWZyZXNoX3Rva2VuXCI6XCJcIixcbiAgICAvLyAgIFwiZXhwaXJlc19pblwiOiAyNTkyMDAsXG4gICAgLy8gICBcInN1YlwiOiBcIlwiXG4gICAgLy8gfVxuICAgIC8vIOS7peS4i+S7o+eggemHjeWkjVxuICAgIGNvbnN0IHNlcUlkRnJvbUhlYWRlciA9IHJlc3AuaGVhZGVycy5nZXQoJ1NlcUlkJykgfHwgcmVzcC5oZWFkZXJzLmdldCgnUmVxdWVzdElkJylcbiAgICBpZiAocmVzcC5zdGF0dXMgPj0gNDAwICYmIHJlc3Auc3RhdHVzIDwgNTAwKSB7XG4gICAgICBjb25zdCBib2R5OiBhbnkgPSBhd2FpdCByZXNwLmpzb24oKVxuICAgICAgY29uc3Qgc2VxSWQgPSBib2R5LnJlcXVlc3RfaWQgfHwgc2VxSWRGcm9tSGVhZGVyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFske2dldFNka05hbWUoKX0vJHtnZXRTZGtWZXJzaW9uKCl9XVtPQXV0aDJBdXRoUHJvdmlkZXJdW3N0YXR1czoke3Jlc3Auc3RhdHVzfV1bJHtib2R5LmVycm9yfSgke2JvZHkuZXJyb3JfY29kZX0pXSAke2JvZHkuZXJyb3JfZGVzY3JpcHRpb259ICgke3NlcUlkfSlgKVxuICAgIH1cbiAgICBlbHNlIGlmIChyZXNwLnN0YXR1cyA+PSA1MDApIHtcbiAgICAgIGNvbnN0IGJvZHk6IGFueSA9IGF3YWl0IHJlc3AuanNvbigpXG4gICAgICBjb25zdCBzZXFJZCA9IGJvZHkucmVxdWVzdF9pZCB8fCBzZXFJZEZyb21IZWFkZXJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7Z2V0U2RrTmFtZSgpfS8ke2dldFNka1ZlcnNpb24oKX1dW09BdXRoMkF1dGhQcm92aWRlcl1bc3RhdHVzOiR7cmVzcC5zdGF0dXN9XVske2JvZHkuZXJyb3J9KCR7Ym9keS5lcnJvcl9jb2RlfSldICR7Ym9keS5lcnJvcl9kZXNjcmlwdGlvbn0gKCR7c2VxSWR9KWApXG4gICAgfVxuICAgIHJldHVybiByZXNwLmpzb24oKVxuICB9XG5cbiAgLy8g6LCD55So5o6l5Y+j5Yi35pawYWNjZXNzIHRva2Vu77yM5bm25LiU6L+U5ZueXG4gIHByaXZhdGUgYXN5bmMgX3JlZnJlc2hBY2Nlc3NUb2tlbkZyb21PYXV0aFNlcnZlcihjbGllbnRJZDogc3RyaW5nKTogUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+IHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbkV4cGlyZUtleSwgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZighcmVmcmVzaFRva2VuKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sXG4gICAgICAgIG1zZzogJ25vdCBsb2dpbidcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMuX2ZldGNoQWNjZXNzVG9rZW5Gcm9tT2F1dGhTZXJ2ZXIocmVmcmVzaFRva2VuLCBjbGllbnRJZCk7XG4gICAgY29uc3QgeyByZWZyZXNoX3Rva2VuOiBuZXdSZWZyZXNoVG9rZW4sIGFjY2Vzc190b2tlbjogYWNjZXNzVG9rZW4sIGV4cGlyZXNfaW46IGFjY2Vzc1Rva2VuRXhwaXJlIH0gPSB0b2tlblxuXG4gICAgLy8g6ZSZ6K+v5aSE55CGXG4gICAgaWYoIWFjY2Vzc1Rva2VuIHx8ICFhY2Nlc3NUb2tlbkV4cGlyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLk5FVFdPUktfRVJST1IsXG4gICAgICAgIG1zZzogJ3JlZnJlc2ggYWNjZXNzX3Rva2VuIGZhaWxlZCdcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYoYWNjZXNzVG9rZW4gJiYgYWNjZXNzVG9rZW5FeHBpcmUpIHtcbiAgICAgIGlmKG5ld1JlZnJlc2hUb2tlbiA9PT0gcmVmcmVzaFRva2VuKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5LCBuZXdSZWZyZXNoVG9rZW4pO1xuICAgICAgfVxuICAgICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW4pO1xuICAgICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSwgYWNjZXNzVG9rZW5FeHBpcmUgKiAxMDAwICsgRGF0ZS5ub3coKSk7XG4gICAgICBjbG91ZGJhc2UuZmlyZShFVkVOVFMuQUNDRVNTX1RPS0VOX1JFRlJFU0hEKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjY2Vzc1Rva2VuOiBhY2Nlc3NUb2tlbixcbiAgICAgICAgYWNjZXNzVG9rZW5FeHBpcmU6IGFjY2Vzc1Rva2VuRXhwaXJlXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3NldFJlZnJlc2hUb2tlbihyZWZyZXNoVG9rZW46IHN0cmluZykge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuRXhwaXJlS2V5LCByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgLy8gcmVmcmVzaCB0b2tlbuiuvue9ruWJje+8jOWFiOa4heaOiSBhY2Nlc3MgdG9rZW5cbiAgICAvLyDorr7nva7mmK/nm7TmjqXmi4nlj5bmlrAgYWNjZXNzIHRva2VuIOimhueblu+8jOiAjOS4jeaYryByZW1vdmVcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5KTtcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSwgcmVmcmVzaFRva2VuKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZ2V0RGV2aWNlSWQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCB7IGRldmljZUlkS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzXG4gICAgY29uc3QgZGV2aWNlSWQgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGRldmljZUlkS2V5KVxuXG4gICAgaWYgKCFkZXZpY2VJZCkge1xuICAgICAgLy8gY29uc3QgZnAgPSBhd2FpdCBmcFByb21pc2VcbiAgICAgIC8vIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZwLmdldCgpXG4gICAgICAvLyBjb25zdCBkZXZpY2VJZCA9IHJlc3VsdC52aXNpdG9ySWRcbiAgICAgIGNvbnN0IG5ld0RldmljZUlkID0gdXVpZHY0KClcbiAgICAgIHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoZGV2aWNlSWRLZXksIG5ld0RldmljZUlkKVxuICAgICAgcmV0dXJuIG5ld0RldmljZUlkXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIGRldmljZUlkXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHJlcXVlc3RNYXA6IEtWPENsb3VkYmFzZVJlcXVlc3Q+ID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0UmVxdWVzdChjb25maWc6IElDbG91ZGJhc2VSZXF1ZXN0Q29uZmlnKSB7XG4gIHJlcXVlc3RNYXBbY29uZmlnLmVudl0gPSBuZXcgQ2xvdWRiYXNlUmVxdWVzdCh7XG4gICAgLi4uY29uZmlnLFxuICAgIHRocm93OiB0cnVlXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVxdWVzdEJ5RW52SWQoZW52OiBzdHJpbmcpOiBDbG91ZGJhc2VSZXF1ZXN0IHtcbiAgcmV0dXJuIHJlcXVlc3RNYXBbZW52XTtcbn0iXX0=