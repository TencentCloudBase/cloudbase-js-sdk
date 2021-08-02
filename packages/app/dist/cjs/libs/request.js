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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
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
var fingerprintjs_1 = __importDefault(require("@fingerprintjs/fingerprintjs"));
var fpPromise = fingerprintjs_1.default.load();
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
            var fp, result, visitorId, headers, _a, appSign, appSecret, timestamp, appAccessKey, appAccessKeyId, sign, _b, PROTOCOL, BASE_URL, webEndpoint, url;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, fpPromise];
                    case 1:
                        fp = _c.sent();
                        return [4, fp.get()];
                    case 2:
                        result = _c.sent();
                        visitorId = result.visitorId;
                        headers = {
                            'X-Project-Id': 'production-fv979',
                            'X-SDK-Version': "@cloudbase/js-sdk/" + common_1.getSdkVersion(),
                            'X-Request-Id': genSeqId(),
                            'X-Request-Timestamp': Date.now(),
                            'X-Device-Id': visitorId
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
                    case 3: return [2, _c.sent()];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWJzL3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FNNkI7QUFRN0Isa0RBQW9FO0FBSXBFLHdCQUErQjtBQUMvQixpQ0FBeUQ7QUFDekQsOENBQTZDO0FBQzdDLHFDQUFxQztBQUM3QixJQUFBLFVBQVUsR0FBYSxxQkFBUyxXQUF0QixFQUFFLE1BQU0sR0FBSyxxQkFBUyxPQUFkLENBQWU7QUFDakMsSUFBQSxRQUFRLEdBQXFDLGlCQUFLLFNBQTFDLEVBQUMsVUFBVSxHQUEwQixpQkFBSyxXQUEvQixFQUFDLFNBQVMsR0FBZ0IsaUJBQUssVUFBckIsRUFBQyxVQUFVLEdBQUssaUJBQUssV0FBVixDQUFXO0FBQ25ELElBQUEsT0FBTyxHQUFLLG9CQUFRLFFBQWIsQ0FBYztBQUU3QiwrRUFBd0Q7QUFFeEQsSUFBTSxTQUFTLEdBQUcsdUJBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtBQUd0QyxJQUFNLDJCQUEyQixHQUFHO0lBQ2xDLGFBQWE7SUFDYixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLHdCQUF3QjtJQUN4QixhQUFhO0lBQ2IsdUNBQXVDO0lBQ3ZDLGlDQUFpQztJQUNqQywwQkFBMEI7SUFDMUIsNkJBQTZCO0lBQzdCLDZCQUE2QjtJQUM3QiwyQkFBMkI7Q0FDNUIsQ0FBQztBQUVGLFNBQVMsU0FBUyxDQUFDLFFBQTZCLEVBQUUsSUFBWSxFQUFFLEtBQTJCO0lBQ3pGLElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxPQUF3QjtRQUNqRCxJQUFNLElBQUksR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEtB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QUN6QixDQUFDO0FBRkQsOENBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEQVRBX1ZFUlNJT04sXG4gIExPR0lOVFlQRSxcbiAgZ2V0U2RrVmVyc2lvbixcbiAgZ2V0RW5kUG9pbnQsXG4gIE9BVVRIMl9MT0dJTlRZUEVfUFJFRklYXG59IGZyb20gJy4uL2NvbnN0YW50cy9jb21tb24nO1xuaW1wb3J0IHtcbiAgSVJlcXVlc3RPcHRpb25zLFxuICBTREtSZXF1ZXN0SW50ZXJmYWNlLFxuICBSZXNwb25zZU9iamVjdCxcbiAgSVVwbG9hZFJlcXVlc3RPcHRpb25zLFxuICBJUmVxdWVzdENvbmZpZ1xufSBmcm9tICdAY2xvdWRiYXNlL2FkYXB0ZXItaW50ZXJmYWNlJztcbmltcG9ydCB7IHV0aWxzLGp3dCxhZGFwdGVycyxjb25zdGFudHMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBLViB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuaW1wb3J0IHsgSUdldEFjY2Vzc1Rva2VuUmVzdWx0LCBJQ2xvdWRiYXNlUmVxdWVzdENvbmZpZywgSUFwcGVuZGVkUmVxdWVzdEluZm8sIElSZXF1ZXN0QmVmb3JlSG9vayB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVxdWVzdCc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ2FjaGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NhY2hlJztcbmltcG9ydCB7IGNsb3VkYmFzZSB9IGZyb20gJy4uJztcbmltcG9ydCB7IGdldENhY2hlQnlFbnZJZCwgZ2V0TG9jYWxDYWNoZSB9IGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IHsgRVZFTlRTIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cyc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vYWRhcHRlcic7XG5jb25zdCB7IGdldFNka05hbWUsIEVSUk9SUyB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyBnZW5TZXFJZCxpc0Zvcm1EYXRhLGZvcm1hdFVybCxjcmVhdGVTaWduIH0gPSB1dGlscztcbmNvbnN0IHsgUlVOVElNRSB9ID0gYWRhcHRlcnM7XG5cbmltcG9ydCBGaW5nZXJwcmludEpTIGZyb20gJ0BmaW5nZXJwcmludGpzL2ZpbmdlcnByaW50anMnXG5cbmNvbnN0IGZwUHJvbWlzZSA9IEZpbmdlcnByaW50SlMubG9hZCgpXG5cbi8vIOS4i+mdouWHoOenjSBhY3Rpb24g5LiN6ZyA6KaBIGFjY2VzcyB0b2tlblxuY29uc3QgQUNUSU9OU19XSVRIT1VUX0FDQ0VTU1RPS0VOID0gW1xuICAnYXV0aC5nZXRKd3QnLFxuICAnYXV0aC5sb2dvdXQnLFxuICAnYXV0aC5zaWduSW5XaXRoVGlja2V0JyxcbiAgJ2F1dGguc2lnbkluQW5vbnltb3VzbHknLFxuICAnYXV0aC5zaWduSW4nLFxuICAnYXV0aC5mZXRjaEFjY2Vzc1Rva2VuV2l0aFJlZnJlc2hUb2tlbicsXG4gICdhdXRoLnNpZ25VcFdpdGhFbWFpbEFuZFBhc3N3b3JkJyxcbiAgJ2F1dGguYWN0aXZhdGVFbmRVc2VyTWFpbCcsXG4gICdhdXRoLnNlbmRQYXNzd29yZFJlc2V0RW1haWwnLFxuICAnYXV0aC5yZXNldFBhc3N3b3JkV2l0aFRva2VuJyxcbiAgJ2F1dGguaXNVc2VybmFtZVJlZ2lzdGVyZWQnXG5dO1xuXG5mdW5jdGlvbiBiaW5kSG9va3MoaW5zdGFuY2U6IFNES1JlcXVlc3RJbnRlcmZhY2UsIG5hbWU6IHN0cmluZywgaG9va3M6IElSZXF1ZXN0QmVmb3JlSG9va1tdKSB7XG4gIGNvbnN0IG9yaWdpbk1ldGhvZCA9IGluc3RhbmNlW25hbWVdO1xuICBpbnN0YW5jZVtuYW1lXSA9IGZ1bmN0aW9uIChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpIHtcbiAgICBjb25zdCBkYXRhID0ge307XG4gICAgY29uc3QgaGVhZGVycyA9IHt9O1xuICAgIGhvb2tzLmZvckVhY2goaG9vayA9PiB7XG4gICAgICBjb25zdCB7IGRhdGE6IGFwcGVuZGVkRGF0YSwgaGVhZGVyczogYXBwZW5kZWRIZWFkZXJzIH0gPSBob29rLmNhbGwoaW5zdGFuY2UsIG9wdGlvbnMpO1xuICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCBhcHBlbmRlZERhdGEpO1xuICAgICAgT2JqZWN0LmFzc2lnbihoZWFkZXJzLCBhcHBlbmRlZEhlYWRlcnMpO1xuICAgIH0pO1xuICAgIGNvbnN0IG9yaWdpbkRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgb3JpZ2luRGF0YSAmJiAoKCkgPT4ge1xuICAgICAgaWYgKGlzRm9ybURhdGEob3JpZ2luRGF0YSkpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgIChvcmlnaW5EYXRhIGFzIEZvcm1EYXRhKS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMuZGF0YSA9IHtcbiAgICAgICAgLi4ub3JpZ2luRGF0YSxcbiAgICAgICAgLi4uZGF0YVxuICAgICAgfTtcbiAgICB9KSgpO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHtcbiAgICAgIC4uLihvcHRpb25zLmhlYWRlcnMgfHwge30pLFxuICAgICAgLi4uaGVhZGVyc1xuICAgIH07XG4gICAgcmV0dXJuIChvcmlnaW5NZXRob2QgYXMgRnVuY3Rpb24pLmNhbGwoaW5zdGFuY2UsIG9wdGlvbnMpO1xuICB9O1xufVxuZnVuY3Rpb24gYmVmb3JlRWFjaCgpOiBJQXBwZW5kZWRSZXF1ZXN0SW5mbyB7XG4gIGNvbnN0IHNlcUlkID0gZ2VuU2VxSWQoKTtcbiAgcmV0dXJuIHtcbiAgICBkYXRhOiB7XG4gICAgICBzZXFJZFxuICAgIH0sXG4gICAgaGVhZGVyczoge1xuICAgICAgJ1gtU0RLLVZlcnNpb24nOiBgQGNsb3VkYmFzZS9qcy1zZGsvJHtnZXRTZGtWZXJzaW9uKCl9YCxcbiAgICAgICd4LXNlcWlkJzogc2VxSWRcbiAgICB9XG4gIH07XG59XG5leHBvcnQgaW50ZXJmYWNlIElDbG91ZGJhc2VSZXF1ZXN0IHtcbiAgZmV0Y2g6ICh1cmxPclBhdGg6IHN0cmluZywgaW5pdD86IFJlcXVlc3RJbml0KSA9PiBQcm9taXNlPFJlc3BvbnNlPjtcbiAgcG9zdDogKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucykgPT4gUHJvbWlzZTxSZXNwb25zZU9iamVjdD47XG4gIHVwbG9hZDogKG9wdGlvbnM6IElVcGxvYWRSZXF1ZXN0T3B0aW9ucykgPT4gUHJvbWlzZTxSZXNwb25zZU9iamVjdD47XG4gIGRvd25sb2FkOiAob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKSA9PiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PjtcbiAgcmVmcmVzaEFjY2Vzc1Rva2VuOiAoKSA9PiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD47XG4gIGdldEFjY2Vzc1Rva2VuOiAoKSA9PiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD47XG4gIHJlcXVlc3Q6IChhY3Rpb246IHN0cmluZywgcGFyYW1zOiBLVjxhbnk+LCBvcHRpb25zPzogS1Y8YW55PikgPT4gUHJvbWlzZTxSZXNwb25zZU9iamVjdD47XG4gIHNlbmQ6IChhY3Rpb246IHN0cmluZywgZGF0YTogS1Y8YW55PikgPT4gUHJvbWlzZTxhbnk+O1xufVxuXG4vKipcbiAqIEBjbGFzcyBDbG91ZGJhc2VSZXF1ZXN0XG4gKi9cbmV4cG9ydCBjbGFzcyBDbG91ZGJhc2VSZXF1ZXN0IGltcGxlbWVudHMgSUNsb3VkYmFzZVJlcXVlc3Qge1xuICBjb25maWc6IElDbG91ZGJhc2VSZXF1ZXN0Q29uZmlnO1xuICBfc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuSG9vazogRnVuY3Rpb25cbiAgX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2U6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB8IG51bGxcbiAgX3JlcUNsYXNzOiBTREtSZXF1ZXN0SW50ZXJmYWNlO1xuICAvLyDor7fmsYLlpLHotKXmmK/lkKbmipvlh7pFcnJvclxuICBwcml2YXRlIF90aHJvd1doZW5SZXF1ZXN0RmFpbCA9IGZhbHNlO1xuICBwcml2YXRlIF9jYWNoZTogSUNsb3VkYmFzZUNhY2hlO1xuICAvLyDmjIHkuYXljJbmnKzlnLDlrZjlgqhcbiAgcHJpdmF0ZSBfbG9jYWxDYWNoZTogSUNsb3VkYmFzZUNhY2hlO1xuICAvKipcbiAgICog5Yid5aeL5YyWXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSUNsb3VkYmFzZVJlcXVlc3RDb25maWcgJiB7IHRocm93PzogYm9vbGVhbiB9KSB7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgdGhpcy5fcmVxQ2xhc3MgPSBuZXcgUGxhdGZvcm0uYWRhcHRlci5yZXFDbGFzcyg8SVJlcXVlc3RDb25maWc+e1xuICAgICAgdGltZW91dDogdGhpcy5jb25maWcudGltZW91dCxcbiAgICAgIHRpbWVvdXRNc2c6IGBbQGNsb3VkYmFzZS9qcy1zZGtdIOivt+axguWcqCR7dGhpcy5jb25maWcudGltZW91dCAvIDEwMDB9c+WGheacquWujOaIkO+8jOW3suS4reaWrWAsXG4gICAgICByZXN0cmljdGVkTWV0aG9kczogWydwb3N0J11cbiAgICB9KTtcbiAgICB0aGlzLl90aHJvd1doZW5SZXF1ZXN0RmFpbCA9IGNvbmZpZy50aHJvdyB8fCBmYWxzZTtcbiAgICB0aGlzLl9jYWNoZSA9IGdldENhY2hlQnlFbnZJZCh0aGlzLmNvbmZpZy5lbnYpO1xuICAgIHRoaXMuX2xvY2FsQ2FjaGUgPSBnZXRMb2NhbENhY2hlKHRoaXMuY29uZmlnLmVudik7XG4gICAgYmluZEhvb2tzKHRoaXMuX3JlcUNsYXNzLCAncG9zdCcsIFtiZWZvcmVFYWNoXSk7XG4gICAgYmluZEhvb2tzKHRoaXMuX3JlcUNsYXNzLCAndXBsb2FkJywgW2JlZm9yZUVhY2hdKTtcbiAgICBiaW5kSG9va3ModGhpcy5fcmVxQ2xhc3MsICdkb3dubG9hZCcsIFtiZWZvcmVFYWNoXSk7XG4gIH1cblxuICAvKipcbiAgICog5aWX5LiA5bGCIGZldGNo77yM5pa55L6/5aSE55CG6K+35rGC5Zyw5Z2AXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgIHVybE9yUGF0aFxuICAgKiBAcGFyYW0ge1JlcXVlc3RJbml0fSBpbml0XG4gICAqIEByZXR1cm5zIFxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZldGNoKHVybE9yUGF0aDogc3RyaW5nLCBpbml0PzogUmVxdWVzdEluaXQpOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gICAgY29uc3QgZnAgPSBhd2FpdCBmcFByb21pc2VcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBmcC5nZXQoKVxuICAgIGNvbnN0IHZpc2l0b3JJZCA9IHJlc3VsdC52aXNpdG9ySWRcbiAgICBjb25zdCBoZWFkZXJzID0ge1xuICAgICAgJ1gtUHJvamVjdC1JZCc6ICdwcm9kdWN0aW9uLWZ2OTc5JyxcbiAgICAgICdYLVNESy1WZXJzaW9uJzogYEBjbG91ZGJhc2UvanMtc2RrLyR7Z2V0U2RrVmVyc2lvbigpfWAsXG4gICAgICAnWC1SZXF1ZXN0LUlkJzogZ2VuU2VxSWQoKSxcbiAgICAgICdYLVJlcXVlc3QtVGltZXN0YW1wJzogRGF0ZS5ub3coKSxcbiAgICAgICdYLURldmljZS1JZCc6IHZpc2l0b3JJZFxuICAgIH1cbiAgICAvLyDpnZ53ZWLlubPlj7Dkvb/nlKjlh63or4Hmo4DpqozmnInmlYjmgKdcbiAgICBpZihQbGF0Zm9ybS5ydW50aW1lICE9PSBSVU5USU1FLldFQikge1xuICAgICAgY29uc3QgeyBhcHBTaWduLGFwcFNlY3JldCB9ID0gdGhpcy5jb25maWdcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KClcbiAgICAgIGNvbnN0IHsgYXBwQWNjZXNzS2V5LCBhcHBBY2Nlc3NLZXlJZCB9ID0gYXBwU2VjcmV0XG4gICAgICBjb25zdCBzaWduID0gY3JlYXRlU2lnbih7XG4gICAgICAgIC8vIGRhdGE6IGluaXQuYm9keSxcbiAgICAgICAgZGF0YToge30sXG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgYXBwQWNjZXNzS2V5SWQsXG4gICAgICAgIGFwcFNpZ25cbiAgICAgIH0sYXBwQWNjZXNzS2V5KVxuXG4gICAgICBoZWFkZXJzWydYLVRDQi1BcHAtU291cmNlJ10gPSBgdGltZXN0YW1wPSR7dGltZXN0YW1wfTthcHBBY2Nlc3NLZXlJZD0ke2FwcEFjY2Vzc0tleUlkfTthcHBTaWduPSR7YXBwU2lnbn07c2lnbj0ke3NpZ259YFxuICAgIH1cblxuICAgIGluaXQuaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oe30sIGluaXQuaGVhZGVycywgaGVhZGVycylcblxuICAgIGNvbnN0IHsgUFJPVE9DT0wsIEJBU0VfVVJMIH0gPSBnZXRFbmRQb2ludCgpXG4gICAgY29uc3Qgd2ViRW5kcG9pbnQgPSBgJHtQUk9UT0NPTH0ke0JBU0VfVVJMfWBcbiAgICBjb25zdCB1cmwgPSB1cmxPclBhdGguc3RhcnRzV2l0aCgnaHR0cCcpXG4gICAgICA/IHVybE9yUGF0aFxuICAgICAgOmAke25ldyBVUkwod2ViRW5kcG9pbnQpLm9yaWdpbn0ke3VybE9yUGF0aH1gXG4gICAgcmV0dXJuIGF3YWl0IGZldGNoKHVybCwgaW5pdClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwb3N0KG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXFDbGFzcy5wb3N0KG9wdGlvbnMpO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgcHVibGljIGFzeW5jIHVwbG9hZChvcHRpb25zOiBJVXBsb2FkUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxQ2xhc3MudXBsb2FkKG9wdGlvbnMpO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgcHVibGljIGFzeW5jIGRvd25sb2FkKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXFDbGFzcy5kb3dubG9hZChvcHRpb25zKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlZnJlc2hBY2Nlc3NUb2tlbigpOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4ge1xuICAgIC8vIOWPr+iDveS8muWQjOaXtuiwg+eUqOWkmuasoeWIt+aWsGFjY2VzcyB0b2tlbu+8jOi/memHjOaKiuWug+S7rOWQiOW5tuaIkOS4gOS4qlxuICAgIGlmICghdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZSkge1xuICAgICAgLy8g5rKh5pyJ5q2j5Zyo5Yi35paw77yM6YKj5LmI5q2j5bi45omn6KGM5Yi35paw6YC76L6RXG4gICAgICB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlID0gdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuKCk7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdDtcbiAgICBsZXQgZXJyO1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGVyciA9IGU7XG4gICAgfVxuICAgIHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UgPSBudWxsO1xuICAgIHRoaXMuX3Nob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbkhvb2sgPSBudWxsO1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZWZyZXNoQWNjZXNzVG9rZW5Gcm9tT2F1dGhTZXJ2ZXIoY2xpZW50SWQ6IHN0cmluZyk6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB7XG4gICAgLy8g5Y+v6IO95Lya5ZCM5pe26LCD55So5aSa5qyh5Yi35pawIGFjY2VzcyB0b2tlbu+8jOi/memHjOaKiuWug+S7rOWQiOW5tuaIkOS4gOS4qlxuICAgIGlmKCF0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlKSB7XG4gICAgICAvLyDmsqHmnInmraPlnKjliLfmlrDvvIzpgqPkuYjmraPluLjmiafooYzliLfmlrDpgLvovpFcbiAgICAgIHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UgPSB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Gcm9tT2F1dGhTZXJ2ZXIoY2xpZW50SWQpO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQ7XG4gICAgbGV0IGVycjtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGVyciA9IGU7XG4gICAgfVxuICAgIHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UgPSBudWxsO1xuICAgIHRoaXMuX3Nob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbkhvb2sgPSBudWxsO1xuICAgIGlmKGVycikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8g6I635Y+WIGFjY2VzcyB0b2tlblxuICBwdWJsaWMgYXN5bmMgZ2V0QWNjZXNzVG9rZW4oKTogUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+IHtcbiAgICBjb25zdCB7IGxvZ2luVHlwZUtleSxhY2Nlc3NUb2tlbktleSxhY2Nlc3NUb2tlbkV4cGlyZUtleSxyZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgbG9naW5UeXBlID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhsb2dpblR5cGVLZXkpO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZiAoIXJlZnJlc2hUb2tlbikge1xuICAgICAgLy8g5LiN6K+l5Ye6546w55qE54q25oCB77ya5pyJIGFjY2VzcyB0b2tlbiDljbTmsqHmnIkgcmVmcmVzaCB0b2tlblxuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLk9QRVJBVElPTl9GQUlMLFxuICAgICAgICBtc2c6ICdyZWZyZXNoIHRva2VuIGlzIG5vdCBleGlzdCwgeW91ciBsb2NhbCBkYXRhIG1pZ2h0IGJlIG1lc3NlZCB1cCwgcGxlYXNlIHJldHJ5IGFmdGVyIGNsZWFyIGxvY2FsU3RvcmFnZSBvciBzZXNzaW9uU3RvcmFnZSdcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgLy8g5aaC5p6c5rKh5pyJYWNjZXNzIHRva2Vu5oiW6ICF6L+H5pyf77yM6YKj5LmI5Yi35pawXG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbkV4cGlyZSA9IE51bWJlcihhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5KSk7XG5cbiAgICAvLyDosIPnlKjpkqnlrZDlh73mlbBcbiAgICBsZXQgc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5fc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuSG9vayAmJiAhKGF3YWl0IHRoaXMuX3Nob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbkhvb2soYWNjZXNzVG9rZW4sIGFjY2Vzc1Rva2VuRXhwaXJlKSkpIHtcbiAgICAgIHNob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmKCghYWNjZXNzVG9rZW4gfHwgIWFjY2Vzc1Rva2VuRXhwaXJlIHx8IGFjY2Vzc1Rva2VuRXhwaXJlIDwgRGF0ZS5ub3coKSkgJiYgc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuKSB7XG4gICAgICBpZiAobG9naW5UeXBlLnN0YXJ0c1dpdGgoT0FVVEgyX0xPR0lOVFlQRV9QUkVGSVgpKSB7XG4gICAgICAgIC8vIE5PVEU6IOi/memHjOmcgOimgeS7jiBhY2Nlc3NUb2tlbiDop6Plh7rmnaXpg6jliIbkv6Hmga/vvIznlKjkuo7liLfmlrAgYWNjZXNzVG9rZW5cbiAgICAgICAgLy8g5omA5Lul6L+H5pyf55qEIGFjY2Vzc1Rva2VuIOS4jeiDveWIoOmZpO+8jOiAjOaYr+eUqOaWsCBhY2Nlc3NUb2tlbiDopobnm5ZcbiAgICAgICAgaWYgKGFjY2Vzc1Rva2VuKSB7XG4gICAgICAgICAgbGV0IGhlYWRlciA9IG51bGxcbiAgICAgICAgICBsZXQgcGF5bG9hZCA9IG51bGxcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaGVhZGVyID0gand0LmRlY29kZShhY2Nlc3NUb2tlbiwge2hlYWRlcjogdHJ1ZX0pXG4gICAgICAgICAgICBwYXlsb2FkID0gand0LmRlY29kZShhY2Nlc3NUb2tlbilcbiAgICAgICAgICB9XG4gICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgW0RFQ09ERV9BQ0NFU1NfVE9LRU5fRVJST1JdICR7ZS5tZXNzYWdlfSwgYWNjZXNzdG9rZW46ICR7YWNjZXNzVG9rZW59YClcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhlYWRlcj8ua2lkICYmIHBheWxvYWQ/LnByb2plY3RfaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJlZnJlc2hBY2Nlc3NUb2tlbkZyb21PYXV0aFNlcnZlcihwYXlsb2FkPy5wcm9qZWN0X2lkKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAvLyDov5nph4znlKggZW52IOivleS4gOS4i1xuICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJlZnJlc2hBY2Nlc3NUb2tlbkZyb21PYXV0aFNlcnZlcih0aGlzLmNvbmZpZy5lbnYpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZWZyZXNoQWNjZXNzVG9rZW4oKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8g6L+U5Zue5pys5Zyw55qEYWNjZXNzIHRva2VuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhY2Nlc3NUb2tlbixcbiAgICAgICAgYWNjZXNzVG9rZW5FeHBpcmVcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUgY29tcGxleGl0eSAqL1xuICBwdWJsaWMgYXN5bmMgcmVxdWVzdChhY3Rpb246IHN0cmluZywgcGFyYW1zOiBLVjxhbnk+LCBvcHRpb25zPzogS1Y8YW55Pik6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCB0Y2JUcmFjZUtleSA9IGB4LXRjYi10cmFjZV8ke3RoaXMuY29uZmlnLmVudn1gO1xuICAgIGxldCBjb250ZW50VHlwZSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnO1xuICAgIC8vIGNvbnN0IHdlYkRldmljZUlkID0gYXdhaXQgZ2V0VGNiRmluZ2VycHJpbnRJZCgpO1xuICAgIGNvbnN0IHRtcE9iajogS1Y8YW55PiA9IHtcbiAgICAgIGFjdGlvbixcbiAgICAgIC8vIHdlYkRldmljZUlkLFxuICAgICAgZGF0YVZlcnNpb246IERBVEFfVkVSU0lPTixcbiAgICAgIGVudjogdGhpcy5jb25maWcuZW52LFxuICAgICAgLi4ucGFyYW1zXG4gICAgfTtcblxuXG4gICAgaWYgKEFDVElPTlNfV0lUSE9VVF9BQ0NFU1NUT0tFTi5pbmRleE9mKGFjdGlvbikgPT09IC0xKSB7XG4gICAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcblxuICAgICAgLy8g6Iul5pyJIHJlZnJlc2hUb2tlbiDliJnku7vliqHmnInnmbvlvZXmgIEg5Yi3IGFjY2Vzc1Rva2VuXG4gICAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgICBpZiAocmVmcmVzaFRva2VuKSB7XG4gICAgICAgIHRtcE9iai5hY2Nlc3NfdG9rZW4gPSAoYXdhaXQgdGhpcy5nZXRBY2Nlc3NUb2tlbigpKS5hY2Nlc3NUb2tlbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDmi7xib2R55ZKMY29udGVudC10eXBlXG4gICAgbGV0IHBheWxvYWQ7XG4gICAgaWYgKGFjdGlvbiA9PT0gJ3N0b3JhZ2UudXBsb2FkRmlsZScpIHtcbiAgICAgIHBheWxvYWQgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgIGZvciAobGV0IGtleSBpbiBwYXlsb2FkKSB7XG4gICAgICAgIGlmIChwYXlsb2FkLmhhc093blByb3BlcnR5KGtleSkgJiYgcGF5bG9hZFtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBwYXlsb2FkLmFwcGVuZChrZXksIHRtcE9ialtrZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29udGVudFR5cGUgPSAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRlbnRUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCc7XG4gICAgICBwYXlsb2FkID0ge307XG4gICAgICBmb3IgKGxldCBrZXkgaW4gdG1wT2JqKSB7XG4gICAgICAgIGlmICh0bXBPYmpba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcGF5bG9hZFtrZXldID0gdG1wT2JqW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IG9wdHM6IGFueSA9IHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6IGNvbnRlbnRUeXBlXG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAob3B0aW9ucz8uWydvblVwbG9hZFByb2dyZXNzJ10pIHtcbiAgICAgIG9wdHMub25VcGxvYWRQcm9ncmVzcyA9IG9wdGlvbnNbJ29uVXBsb2FkUHJvZ3Jlc3MnXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcucmVnaW9uKSB7XG4gICAgICBvcHRzLmhlYWRlcnNbJ1gtVENCLVJlZ2lvbiddID0gdGhpcy5jb25maWcucmVnaW9uO1xuICAgIH1cblxuICAgIGNvbnN0IHRyYWNlSGVhZGVyID0gdGhpcy5fbG9jYWxDYWNoZS5nZXRTdG9yZSh0Y2JUcmFjZUtleSk7XG4gICAgaWYgKHRyYWNlSGVhZGVyKSB7XG4gICAgICBvcHRzLmhlYWRlcnNbJ1gtVENCLVRyYWNlJ10gPSB0cmFjZUhlYWRlcjtcbiAgICB9XG4gICAgLy8g6Z2ed2Vi5bmz5Y+w5L2/55So5Yet6K+B5qOA6aqM5pyJ5pWI5oCnXG4gICAgaWYgKFBsYXRmb3JtLnJ1bnRpbWUgIT09IFJVTlRJTUUuV0VCKSB7XG4gICAgICBjb25zdCB7IGFwcFNpZ24sIGFwcFNlY3JldCB9ID0gdGhpcy5jb25maWc7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgeyBhcHBBY2Nlc3NLZXksIGFwcEFjY2Vzc0tleUlkIH0gPSBhcHBTZWNyZXQ7XG4gICAgICBjb25zdCBzaWduID0gY3JlYXRlU2lnbih7XG4gICAgICAgIGRhdGE6IHt9LCAvLyDmoKHpqoznrb7lkI3mtYHnqIvlrp7pmYXmnKrnlKjliLDvvIzlj6/orr7nqbpcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICBhcHBBY2Nlc3NLZXlJZCxcbiAgICAgICAgYXBwU2lnblxuICAgICAgfSwgYXBwQWNjZXNzS2V5KTtcblxuICAgICAgb3B0cy5oZWFkZXJzWydYLVRDQi1BcHAtU291cmNlJ10gPSBgdGltZXN0YW1wPSR7dGltZXN0YW1wfTthcHBBY2Nlc3NLZXlJZD0ke2FwcEFjY2Vzc0tleUlkfTthcHBTaWduPSR7YXBwU2lnbn07c2lnbj0ke3NpZ259YDtcbiAgICB9XG5cbiAgICAvLyDlj5Hlh7ror7fmsYJcbiAgICAvLyDmlrDnmoQgdXJsIOmcgOimgeaQuuW4piBlbnYg5Y+C5pWw6L+b6KGMIENPUlMg5qCh6aqMXG4gICAgLy8g6K+35rGC6ZO+5o6l5pSv5oyB5re75Yqg5Yqo5oCBIHF1ZXJ5IOWPguaVsO+8jOaWueS+v+eUqOaIt+iwg+ivleWumuS9jeivt+axglxuICAgIGNvbnN0IHsgcGFyc2UsIGluUXVlcnksIHNlYXJjaCB9ID0gcGFyYW1zO1xuICAgIGxldCBmb3JtYXRRdWVyeTogUmVjb3JkPHN0cmluZywgYW55PiA9IHtcbiAgICAgIGVudjogdGhpcy5jb25maWcuZW52XG4gICAgfTtcbiAgICAvLyDlsJ3or5Xop6PmnpDlk43lupTmlbDmja7kuLogSlNPTlxuICAgIHBhcnNlICYmIChmb3JtYXRRdWVyeS5wYXJzZSA9IHRydWUpO1xuICAgIGluUXVlcnkgJiYgKGZvcm1hdFF1ZXJ5ID0ge1xuICAgICAgLi4uaW5RdWVyeSxcbiAgICAgIC4uLmZvcm1hdFF1ZXJ5XG4gICAgfSk7XG4gICAgY29uc3QgeyBCQVNFX1VSTCwgUFJPVE9DT0wgfSA9IGdldEVuZFBvaW50KCk7XG4gICAgLy8g55Sf5oiQ6K+35rGCIHVybFxuICAgIGxldCBuZXdVcmwgPSBmb3JtYXRVcmwoUFJPVE9DT0wsIEJBU0VfVVJMLCBmb3JtYXRRdWVyeSk7XG5cbiAgICBpZiAoc2VhcmNoKSB7XG4gICAgICBuZXdVcmwgKz0gc2VhcmNoO1xuICAgIH1cblxuICAgIGNvbnN0IHJlczogUmVzcG9uc2VPYmplY3QgPSBhd2FpdCB0aGlzLnBvc3Qoe1xuICAgICAgdXJsOiBuZXdVcmwsXG4gICAgICBkYXRhOiBwYXlsb2FkLFxuICAgICAgLi4ub3B0c1xuICAgIH0pO1xuXG4gICAgLy8g5L+d5a2YIHRyYWNlIGhlYWRlclxuICAgIGNvbnN0IHJlc1RyYWNlSGVhZGVyID0gcmVzLmhlYWRlciAmJiByZXMuaGVhZGVyWyd4LXRjYi10cmFjZSddO1xuICAgIGlmIChyZXNUcmFjZUhlYWRlcikge1xuICAgICAgdGhpcy5fbG9jYWxDYWNoZS5zZXRTdG9yZSh0Y2JUcmFjZUtleSwgcmVzVHJhY2VIZWFkZXIpO1xuICAgIH1cblxuICAgIGlmICgoTnVtYmVyKHJlcy5zdGF0dXMpICE9PSAyMDAgJiYgTnVtYmVyKHJlcy5zdGF0dXNDb2RlKSAhPT0gMjAwKSB8fCAhcmVzLmRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbmV0d29yayByZXF1ZXN0IGVycm9yJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZW5kKGFjdGlvbjogc3RyaW5nLCBkYXRhOiBLVjxhbnk+ID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdChhY3Rpb24sIGRhdGEsIHsgb25VcGxvYWRQcm9ncmVzczogZGF0YS5vblVwbG9hZFByb2dyZXNzIH0pO1xuICAgIGlmIChyZXNwb25zZS5kYXRhLmNvZGUgPT09ICdBQ0NFU1NfVE9LRU5fRVhQSVJFRCcgJiYgQUNUSU9OU19XSVRIT1VUX0FDQ0VTU1RPS0VOLmluZGV4T2YoYWN0aW9uKSA9PT0gLTEpIHtcbiAgICAgIC8vIGFjY2Vzc190b2tlbui/h+acn++8jOmHjeaWsOiOt+WPllxuICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoQWNjZXNzVG9rZW4oKTtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0KGFjdGlvbiwgZGF0YSwgeyBvblVwbG9hZFByb2dyZXNzOiBkYXRhLm9uVXBsb2FkUHJvZ3Jlc3MgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlc3BvbnNlLmRhdGEuY29kZSAmJiB0aGlzLl90aHJvd1doZW5SZXF1ZXN0RmFpbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLk9QRVJBVElPTl9GQUlMLFxuICAgICAgICBtc2c6IGBbJHtyZXNwb25zZS5kYXRhLmNvZGV9XSAke3Jlc3BvbnNlLmRhdGEubWVzc2FnZX1gXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gIH1cblxuICAvLyDosIPnlKjmjqXlj6PliLfmlrBhY2Nlc3MgdG9rZW7vvIzlubbkuJTov5Tlm55cbiAgcHJpdmF0ZSBhc3luYyBfcmVmcmVzaEFjY2Vzc1Rva2VuKHJldHJ5TnVtID0gMSk6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXksIHJlZnJlc2hUb2tlbktleSwgbG9naW5UeXBlS2V5LCBhbm9ueW1vdXNVdWlkS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpO1xuXG4gICAgbGV0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZiAoIXJlZnJlc2hUb2tlbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLFxuICAgICAgICBtc2c6ICdub3QgbG9naW4nXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGNvbnN0IHBhcmFtczogS1Y8c3RyaW5nPiA9IHtcbiAgICAgIHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlblxuICAgIH07XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ2F1dGguZmV0Y2hBY2Nlc3NUb2tlbldpdGhSZWZyZXNoVG9rZW4nLCBwYXJhbXMpO1xuICAgIGlmIChyZXNwb25zZS5kYXRhLmNvZGUpIHtcbiAgICAgIGNvbnN0IHsgY29kZSB9ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIGlmIChjb2RlID09PSAnU0lHTl9QQVJBTV9JTlZBTElEJyB8fCBjb2RlID09PSAnUkVGUkVTSF9UT0tFTl9FWFBJUkVEJyB8fCBjb2RlID09PSAnSU5WQUxJRF9SRUZSRVNIX1RPS0VOJykge1xuICAgICAgICAvLyDov5nph4zlpITnkIbku6XkuIvpgLvovpHvvJpcbiAgICAgICAgLy8g5Yy/5ZCN55m75b2V5pe277yM5aaC5p6c5Yi35pawYWNjZXNzIHRva2Vu5oql6ZSZcmVmcmVzaCB0b2tlbui/h+acn++8jOatpOaXtuW6lOivpe+8mlxuICAgICAgICAvLyAxLiDlho3nlKggdXVpZCDmi7/kuIDmrKHmlrDnmoRyZWZyZXNoIHRva2VuXG4gICAgICAgIC8vIDIuIOaLv+aWsOeahHJlZnJlc2ggdG9rZW7mjaJhY2Nlc3MgdG9rZW5cbiAgICAgICAgY29uc3QgaXNBbm9ueW1vdXMgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGxvZ2luVHlwZUtleSkgPT09IExPR0lOVFlQRS5BTk9OWU1PVVM7XG4gICAgICAgIGlmIChpc0Fub255bW91cyAmJiBjb2RlID09PSAnSU5WQUxJRF9SRUZSRVNIX1RPS0VOJykge1xuICAgICAgICAgIC8vIOiOt+WPluaWsOeahCByZWZyZXNoIHRva2VuXG4gICAgICAgICAgY29uc3QgYW5vbnltb3VzX3V1aWQgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFub255bW91c1V1aWRLZXkpO1xuICAgICAgICAgIC8vIOatpOWkhGNhY2hl5Li65Z+657G7cHJvcGVydHlcbiAgICAgICAgICBjb25zdCByZWZyZXNoX3Rva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuc2VuZCgnYXV0aC5zaWduSW5Bbm9ueW1vdXNseScsIHtcbiAgICAgICAgICAgIGFub255bW91c191dWlkLFxuICAgICAgICAgICAgcmVmcmVzaF90b2tlblxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuX3NldFJlZnJlc2hUb2tlbihyZXMucmVmcmVzaF90b2tlbik7XG4gICAgICAgICAgaWYgKHJldHJ5TnVtID49IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW4oLS1yZXRyeU51bSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIGNvZGU6IEVSUk9SUy5PUEVSQVRJT05fRkFJTCxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAn6YeN6K+V6I635Y+WIHJlZnJlc2ggdG9rZW4g5aSx6LSlJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjbG91ZGJhc2UuZmlyZShFVkVOVFMuTE9HSU5fU1RBVEVfRVhQSVJFRCk7XG4gICAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5ORVRXT1JLX0VSUk9SLFxuICAgICAgICBtc2c6IGByZWZyZXNoIGFjY2Vzc190b2tlbiBmYWlsZWTvvJoke3Jlc3BvbnNlLmRhdGEuY29kZX1gXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmIChyZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbikge1xuICAgICAgY2xvdWRiYXNlLmZpcmUoRVZFTlRTLkFDQ0VTU19UT0tFTl9SRUZSRVNIRCk7XG4gICAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5LCByZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbik7XG4gICAgICAvLyDmnKzlnLDml7bpl7Tlj6/og73msqHmnInlkIzmraVcbiAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXksIHJlc3BvbnNlLmRhdGEuYWNjZXNzX3Rva2VuX2V4cGlyZSArIERhdGUubm93KCkpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWNjZXNzVG9rZW46IHJlc3BvbnNlLmRhdGEuYWNjZXNzX3Rva2VuLFxuICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyZTogcmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW5fZXhwaXJlXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyDljL/lkI3nmbvlvZVyZWZyZXNoX3Rva2Vu6L+H5pyf5oOF5Ya15LiL6L+U5ZuecmVmcmVzaF90b2tlblxuICAgIC8vIOatpOWcuuaZr+S4i+S9v+eUqOaWsOeahHJlZnJlc2hfdG9rZW7ojrflj5ZhY2Nlc3NfdG9rZW5cbiAgICBpZiAocmVzcG9uc2UuZGF0YS5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICBhd2FpdCB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSwgcmVzcG9uc2UuZGF0YS5yZWZyZXNoX3Rva2VuKTtcbiAgICAgIGF3YWl0IHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2ZldGNoQWNjZXNzVG9rZW5Gcm9tT2F1dGhTZXJ2ZXIocmVmcmVzaFRva2VuOiBzdHJpbmcsIGNsaWVudElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCByZXNwID0gYXdhaXQgdGhpcy5mZXRjaCgnL2F1dGgvdjEvdG9rZW4nLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgZ3JhbnRfdHlwZTogJ3JlZnJlc2hfdG9rZW4nLFxuICAgICAgICBjbGllbnRfaWQ6IGNsaWVudElkLFxuICAgICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW5cbiAgICAgIH0pXG4gICAgfSlcbiAgICAvLyBSZXNwOlxuICAgIC8vIHtcbiAgICAvLyAgIFwidG9rZW5fdHlwZVwiOiBcIkJlYXJlclwiLFxuICAgIC8vICAgXCJhY2Nlc3NfdG9rZW5cIjogXCJcIixcbiAgICAvLyAgIFwicmVmcmVzaF90b2tlblwiOlwiXCIsXG4gICAgLy8gICBcImV4cGlyZXNfaW5cIjogMjU5MjAwLFxuICAgIC8vICAgXCJzdWJcIjogXCJcIlxuICAgIC8vIH1cbiAgICAvLyDku6XkuIvku6PnoIHph43lpI1cbiAgICBjb25zdCBzZXFJZEZyb21IZWFkZXIgPSByZXNwLmhlYWRlcnMuZ2V0KCdTZXFJZCcpIHx8IHJlc3AuaGVhZGVycy5nZXQoJ1JlcXVlc3RJZCcpXG4gICAgaWYgKHJlc3Auc3RhdHVzID49IDQwMCAmJiByZXNwLnN0YXR1cyA8IDUwMCkge1xuICAgICAgY29uc3QgYm9keTogYW55ID0gYXdhaXQgcmVzcC5qc29uKClcbiAgICAgIGNvbnN0IHNlcUlkID0gYm9keS5yZXF1ZXN0X2lkIHx8IHNlcUlkRnJvbUhlYWRlclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHtnZXRTZGtOYW1lKCl9LyR7Z2V0U2RrVmVyc2lvbigpfV1bT0F1dGgyQXV0aFByb3ZpZGVyXVtzdGF0dXM6JHtyZXNwLnN0YXR1c31dWyR7Ym9keS5lcnJvcn0oJHtib2R5LmVycm9yX2NvZGV9KV0gJHtib2R5LmVycm9yX2Rlc2NyaXB0aW9ufSAoJHtzZXFJZH0pYClcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzcC5zdGF0dXMgPj0gNTAwKSB7XG4gICAgICBjb25zdCBib2R5OiBhbnkgPSBhd2FpdCByZXNwLmpzb24oKVxuICAgICAgY29uc3Qgc2VxSWQgPSBib2R5LnJlcXVlc3RfaWQgfHwgc2VxSWRGcm9tSGVhZGVyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFske2dldFNka05hbWUoKX0vJHtnZXRTZGtWZXJzaW9uKCl9XVtPQXV0aDJBdXRoUHJvdmlkZXJdW3N0YXR1czoke3Jlc3Auc3RhdHVzfV1bJHtib2R5LmVycm9yfSgke2JvZHkuZXJyb3JfY29kZX0pXSAke2JvZHkuZXJyb3JfZGVzY3JpcHRpb259ICgke3NlcUlkfSlgKVxuICAgIH1cbiAgICByZXR1cm4gcmVzcC5qc29uKClcbiAgfVxuXG4gIC8vIOiwg+eUqOaOpeWPo+WIt+aWsGFjY2VzcyB0b2tlbu+8jOW5tuS4lOi/lOWbnlxuICBwcml2YXRlIGFzeW5jIF9yZWZyZXNoQWNjZXNzVG9rZW5Gcm9tT2F1dGhTZXJ2ZXIoY2xpZW50SWQ6IHN0cmluZyk6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXksIHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgaWYoIXJlZnJlc2hUb2tlbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLFxuICAgICAgICBtc2c6ICdub3QgbG9naW4nXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLl9mZXRjaEFjY2Vzc1Rva2VuRnJvbU9hdXRoU2VydmVyKHJlZnJlc2hUb2tlbiwgY2xpZW50SWQpO1xuICAgIGNvbnN0IHsgcmVmcmVzaF90b2tlbjogbmV3UmVmcmVzaFRva2VuLCBhY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VuLCBleHBpcmVzX2luOiBhY2Nlc3NUb2tlbkV4cGlyZSB9ID0gdG9rZW5cblxuICAgIC8vIOmUmeivr+WkhOeQhlxuICAgIGlmKCFhY2Nlc3NUb2tlbiB8fCAhYWNjZXNzVG9rZW5FeHBpcmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5ORVRXT1JLX0VSUk9SLFxuICAgICAgICBtc2c6ICdyZWZyZXNoIGFjY2Vzc190b2tlbiBmYWlsZWQnXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmKGFjY2Vzc1Rva2VuICYmIGFjY2Vzc1Rva2VuRXhwaXJlKSB7XG4gICAgICBpZihuZXdSZWZyZXNoVG9rZW4gPT09IHJlZnJlc2hUb2tlbikge1xuICAgICAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSwgbmV3UmVmcmVzaFRva2VuKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuKTtcbiAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXksIGFjY2Vzc1Rva2VuRXhwaXJlICogMTAwMCArIERhdGUubm93KCkpO1xuICAgICAgY2xvdWRiYXNlLmZpcmUoRVZFTlRTLkFDQ0VTU19UT0tFTl9SRUZSRVNIRCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhY2Nlc3NUb2tlbjogYWNjZXNzVG9rZW4sXG4gICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlOiBhY2Nlc3NUb2tlbkV4cGlyZVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9zZXRSZWZyZXNoVG9rZW4ocmVmcmVzaFRva2VuOiBzdHJpbmcpIHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbkV4cGlyZUtleSwgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIC8vIHJlZnJlc2ggdG9rZW7orr7nva7liY3vvIzlhYjmuIXmjokgYWNjZXNzIHRva2VuXG4gICAgLy8g6K6+572u5piv55u05o6l5ouJ5Y+W5pawIGFjY2VzcyB0b2tlbiDopobnm5bvvIzogIzkuI3mmK8gcmVtb3ZlXG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXksIHJlZnJlc2hUb2tlbik7XG4gIH1cbn1cblxuY29uc3QgcmVxdWVzdE1hcDogS1Y8Q2xvdWRiYXNlUmVxdWVzdD4gPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRSZXF1ZXN0KGNvbmZpZzogSUNsb3VkYmFzZVJlcXVlc3RDb25maWcpIHtcbiAgcmVxdWVzdE1hcFtjb25maWcuZW52XSA9IG5ldyBDbG91ZGJhc2VSZXF1ZXN0KHtcbiAgICAuLi5jb25maWcsXG4gICAgdGhyb3c6IHRydWVcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZXF1ZXN0QnlFbnZJZChlbnY6IHN0cmluZyk6IENsb3VkYmFzZVJlcXVlc3Qge1xuICByZXR1cm4gcmVxdWVzdE1hcFtlbnZdO1xufSJdfQ==