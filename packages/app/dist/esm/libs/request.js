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
import { DATA_VERSION, LOGINTYPE, getSdkVersion, getEndPoint, OAUTH2_LOGINTYPE_PREFIX } from '../constants/common';
import { utils, jwt, adapters, constants } from '@cloudbase/utilities';
import { cloudbase } from '..';
import { getCacheByEnvId, getLocalCache } from './cache';
import { EVENTS } from '../constants/events';
import { Platform } from './adapter';
var getSdkName = constants.getSdkName, ERRORS = constants.ERRORS;
var genSeqId = utils.genSeqId, isFormData = utils.isFormData, formatUrl = utils.formatUrl, createSign = utils.createSign;
var RUNTIME = adapters.RUNTIME;
import { v4 as uuidv4 } from 'uuid';
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
            'X-SDK-Version': "@cloudbase/js-sdk/" + getSdkVersion(),
            'x-seqid': seqId
        }
    };
}
var CloudbaseRequest = (function () {
    function CloudbaseRequest(config) {
        this._throwWhenRequestFail = false;
        this.config = config;
        this._reqClass = new Platform.adapter.reqClass({
            timeout: this.config.timeout,
            timeoutMsg: "[@cloudbase/js-sdk] \u8BF7\u6C42\u5728" + this.config.timeout / 1000 + "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD",
            restrictedMethods: ['post']
        });
        this._throwWhenRequestFail = config.throw || false;
        this._cache = getCacheByEnvId(this.config.env);
        this._localCache = getLocalCache(this.config.env);
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
                            'X-SDK-Version': "@cloudbase/js-sdk/" + getSdkVersion(),
                            'X-Request-Id': genSeqId(),
                            'X-Request-Timestamp': Date.now(),
                            'X-Device-Id': deviceId
                        };
                        if (Platform.runtime !== RUNTIME.WEB) {
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
                        _b = getEndPoint(), PROTOCOL = _b.PROTOCOL, BASE_URL = _b.BASE_URL;
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
                        if (!loginType.startsWith(OAUTH2_LOGINTYPE_PREFIX)) return [3, 12];
                        if (!accessToken) return [3, 9];
                        header = null;
                        payload = null;
                        try {
                            header = jwt.decode(accessToken, { header: true });
                            payload = jwt.decode(accessToken);
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
                        tmpObj = __assign({ action: action, dataVersion: DATA_VERSION, env: this.config.env }, params);
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
                        if (Platform.runtime !== RUNTIME.WEB) {
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
                        _c = getEndPoint(), BASE_URL = _c.BASE_URL, PROTOCOL = _c.PROTOCOL;
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
                        isAnonymous = (_b.sent()) === LOGINTYPE.ANONYMOUS;
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
                        cloudbase.fire(EVENTS.LOGIN_STATE_EXPIRED);
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
                        cloudbase.fire(EVENTS.ACCESS_TOKEN_REFRESHD);
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
                        throw new Error("[" + getSdkName() + "/" + getSdkVersion() + "][OAuth2AuthProvider][status:" + resp.status + "][" + body.error + "(" + body.error_code + ")] " + body.error_description + " (" + seqId + ")");
                    case 3:
                        if (!(resp.status >= 500)) return [3, 5];
                        return [4, resp.json()];
                    case 4:
                        body = _a.sent();
                        seqId = body.request_id || seqIdFromHeader;
                        throw new Error("[" + getSdkName() + "/" + getSdkVersion() + "][OAuth2AuthProvider][status:" + resp.status + "][" + body.error + "(" + body.error_code + ")] " + body.error_description + " (" + seqId + ")");
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
                        cloudbase.fire(EVENTS.ACCESS_TOKEN_REFRESHD);
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
                            newDeviceId = uuidv4();
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
export { CloudbaseRequest };
var requestMap = {};
export function initRequest(config) {
    requestMap[config.env] = new CloudbaseRequest(__assign(__assign({}, config), { throw: true }));
}
export function getRequestByEnvId(env) {
    return requestMap[env];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWJzL3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0wsWUFBWSxFQUNaLFNBQVMsRUFDVCxhQUFhLEVBQ2IsV0FBVyxFQUNYLHVCQUF1QixFQUN4QixNQUFNLHFCQUFxQixDQUFDO0FBUTdCLE9BQU8sRUFBRSxLQUFLLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUlwRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzdCLElBQUEsVUFBVSxHQUFhLFNBQVMsV0FBdEIsRUFBRSxNQUFNLEdBQUssU0FBUyxPQUFkLENBQWU7QUFDakMsSUFBQSxRQUFRLEdBQXFDLEtBQUssU0FBMUMsRUFBQyxVQUFVLEdBQTBCLEtBQUssV0FBL0IsRUFBQyxTQUFTLEdBQWdCLEtBQUssVUFBckIsRUFBQyxVQUFVLEdBQUssS0FBSyxXQUFWLENBQVc7QUFDbkQsSUFBQSxPQUFPLEdBQUssUUFBUSxRQUFiLENBQWM7QUFFN0IsT0FBTyxFQUFFLEVBQUUsSUFBSSxNQUFNLEVBQUUsTUFBTSxNQUFNLENBQUE7QUFNbkMsSUFBTSwyQkFBMkIsR0FBRztJQUNsQyxhQUFhO0lBQ2IsYUFBYTtJQUNiLHVCQUF1QjtJQUN2Qix3QkFBd0I7SUFDeEIsYUFBYTtJQUNiLHVDQUF1QztJQUN2QyxpQ0FBaUM7SUFDakMsMEJBQTBCO0lBQzFCLDZCQUE2QjtJQUM3Qiw2QkFBNkI7SUFDN0IsMkJBQTJCO0NBQzVCLENBQUM7QUFFRixTQUFTLFNBQVMsQ0FBQyxRQUE2QixFQUFFLElBQVksRUFBRSxLQUEyQjtJQUN6RixJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsT0FBd0I7UUFDakQsSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNuQixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUNWLElBQUEsS0FBbUQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQXZFLFlBQVksVUFBQSxFQUFXLGVBQWUsYUFBaUMsQ0FBQztZQUN0RixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDaEMsVUFBVSxJQUFJLENBQUM7WUFDYixJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDMUIsS0FBSyxJQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7b0JBQ3JCLFVBQXVCLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDakQ7Z0JBQ0QsT0FBTzthQUNSO1lBQ0QsT0FBTyxDQUFDLElBQUkseUJBQ1AsVUFBVSxHQUNWLElBQUksQ0FDUixDQUFDO1FBQ0osQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNMLE9BQU8sQ0FBQyxPQUFPLHlCQUNWLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsR0FDdkIsT0FBTyxDQUNYLENBQUM7UUFDRixPQUFRLFlBQXlCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1RCxDQUFDLENBQUM7QUFDSixDQUFDO0FBQ0QsU0FBUyxVQUFVO0lBQ2pCLElBQU0sS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLE9BQU87UUFDTCxJQUFJLEVBQUU7WUFDSixLQUFLLE9BQUE7U0FDTjtRQUNELE9BQU8sRUFBRTtZQUNQLGVBQWUsRUFBRSx1QkFBcUIsYUFBYSxFQUFJO1lBQ3ZELFNBQVMsRUFBRSxLQUFLO1NBQ2pCO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFlRDtJQWNFLDBCQUFZLE1BQXFEO1FBUnpELDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQVNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQWlCO1lBQzdELE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87WUFDNUIsVUFBVSxFQUFFLDJDQUEwQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLHNEQUFXO1lBQzNFLGlCQUFpQixFQUFFLENBQUMsTUFBTSxDQUFDO1NBQzVCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxxQkFBcUIsR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUNuRCxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEQsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNoRCxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2xELFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQVFZLGdDQUFLLEdBQWxCLFVBQW1CLFNBQWlCLEVBQUUsSUFBa0I7Ozs7OzRCQUNyQyxXQUFNLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBQTs7d0JBQW5DLFFBQVEsR0FBRyxTQUF3Qjt3QkFFbkMsT0FBTyxHQUFHOzRCQUNkLGNBQWMsRUFBRSxrQkFBa0I7NEJBQ2xDLGVBQWUsRUFBRSx1QkFBcUIsYUFBYSxFQUFJOzRCQUN2RCxjQUFjLEVBQUUsUUFBUSxFQUFFOzRCQUMxQixxQkFBcUIsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFOzRCQUNqQyxhQUFhLEVBQUUsUUFBUTt5QkFDeEIsQ0FBQTt3QkFFRCxJQUFHLFFBQVEsQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLEdBQUcsRUFBRTs0QkFDN0IsS0FBd0IsSUFBSSxDQUFDLE1BQU0sRUFBakMsT0FBTyxhQUFBLEVBQUMsU0FBUyxlQUFBLENBQWdCOzRCQUNuQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBOzRCQUNwQixZQUFZLEdBQXFCLFNBQVMsYUFBOUIsRUFBRSxjQUFjLEdBQUssU0FBUyxlQUFkLENBQWM7NEJBQzVDLElBQUksR0FBRyxVQUFVLENBQUM7Z0NBRXRCLElBQUksRUFBRSxFQUFFO2dDQUNSLFNBQVMsV0FBQTtnQ0FDVCxjQUFjLGdCQUFBO2dDQUNkLE9BQU8sU0FBQTs2QkFDUixFQUFDLFlBQVksQ0FBQyxDQUFBOzRCQUVmLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLGVBQWEsU0FBUyx3QkFBbUIsY0FBYyxpQkFBWSxPQUFPLGNBQVMsSUFBTSxDQUFBO3lCQUN4SDt3QkFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7d0JBRWpELEtBQXlCLFdBQVcsRUFBRSxFQUFwQyxRQUFRLGNBQUEsRUFBRSxRQUFRLGNBQUEsQ0FBa0I7d0JBQ3RDLFdBQVcsR0FBRyxLQUFHLFFBQVEsR0FBRyxRQUFVLENBQUE7d0JBQ3RDLEdBQUcsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQzs0QkFDdEMsQ0FBQyxDQUFDLFNBQVM7NEJBQ1gsQ0FBQyxDQUFBLEtBQUcsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxHQUFHLFNBQVcsQ0FBQTt3QkFDeEMsV0FBTSxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFBOzRCQUE3QixXQUFPLFNBQXNCLEVBQUE7Ozs7S0FDOUI7SUFFWSwrQkFBSSxHQUFqQixVQUFrQixPQUF3Qjs7Ozs7NEJBQzVCLFdBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUF4QyxHQUFHLEdBQUcsU0FBa0M7d0JBQzlDLFdBQU8sR0FBRyxFQUFDOzs7O0tBQ1o7SUFDWSxpQ0FBTSxHQUFuQixVQUFvQixPQUE4Qjs7Ozs7NEJBQ3BDLFdBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUExQyxHQUFHLEdBQUcsU0FBb0M7d0JBQ2hELFdBQU8sR0FBRyxFQUFDOzs7O0tBQ1o7SUFDWSxtQ0FBUSxHQUFyQixVQUFzQixPQUF3Qjs7Ozs7NEJBQ2hDLFdBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUE1QyxHQUFHLEdBQUcsU0FBc0M7d0JBQ2xELFdBQU8sR0FBRyxFQUFDOzs7O0tBQ1o7SUFFWSw2Q0FBa0IsR0FBL0I7Ozs7Ozt3QkFFRSxJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFOzRCQUVwQyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7eUJBQzlEOzs7O3dCQUtVLFdBQU0sSUFBSSxDQUFDLDBCQUEwQixFQUFBOzt3QkFBOUMsTUFBTSxHQUFHLFNBQXFDLENBQUM7Ozs7d0JBRS9DLEdBQUcsR0FBRyxHQUFDLENBQUM7Ozt3QkFFVixJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDO3dCQUN2QyxJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDO3dCQUMxQyxJQUFJLEdBQUcsRUFBRTs0QkFDUCxNQUFNLEdBQUcsQ0FBQzt5QkFDWDt3QkFDRCxXQUFPLE1BQU0sRUFBQzs7OztLQUNmO0lBRVksNERBQWlDLEdBQTlDLFVBQStDLFFBQWdCOzs7Ozs7d0JBRTdELElBQUcsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUU7NEJBRW5DLElBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMsa0NBQWtDLENBQUMsUUFBUSxDQUFDLENBQUM7eUJBQ3JGOzs7O3dCQUtVLFdBQU0sSUFBSSxDQUFDLDBCQUEwQixFQUFBOzt3QkFBOUMsTUFBTSxHQUFHLFNBQXFDLENBQUM7Ozs7d0JBRS9DLEdBQUcsR0FBRyxHQUFDLENBQUM7Ozt3QkFFVixJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDO3dCQUN2QyxJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDO3dCQUMxQyxJQUFHLEdBQUcsRUFBRTs0QkFDTixNQUFNLEdBQUcsQ0FBQzt5QkFDWDt3QkFDRCxXQUFPLE1BQU0sRUFBQzs7OztLQUNmO0lBR1kseUNBQWMsR0FBM0I7Ozs7Ozt3QkFDUSxLQUF1RSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBckYsWUFBWSxrQkFBQSxFQUFDLGNBQWMsb0JBQUEsRUFBQyxvQkFBb0IsMEJBQUEsRUFBQyxlQUFlLHFCQUFBLENBQXNCO3dCQUM1RSxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUFBOzt3QkFBekQsU0FBUyxHQUFHLFNBQTZDO3dCQUMxQyxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxFQUFBOzt3QkFBL0QsWUFBWSxHQUFHLFNBQWdEO3dCQUNyRSxJQUFJLENBQUMsWUFBWSxFQUFFOzRCQUVqQixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0NBQzdCLElBQUksRUFBRSxNQUFNLENBQUMsY0FBYztnQ0FDM0IsR0FBRyxFQUFFLHlIQUF5SDs2QkFDL0gsQ0FBQyxDQUFDLENBQUM7eUJBQ0w7d0JBRW1CLFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUE7O3dCQUE3RCxXQUFXLEdBQUcsU0FBK0M7d0JBQ3pDLEtBQUEsTUFBTSxDQUFBO3dCQUFDLFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsRUFBQTs7d0JBQWhGLGlCQUFpQixHQUFHLGtCQUFPLFNBQXFELEVBQUM7d0JBR25GLHdCQUF3QixHQUFHLElBQUksQ0FBQzt3QkFDaEMsS0FBQSxJQUFJLENBQUMsNkJBQTZCLENBQUE7aUNBQWxDLGNBQWtDO3dCQUFNLFdBQU0sSUFBSSxDQUFDLDZCQUE2QixDQUFDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxFQUFBOzt3QkFBMUUsS0FBQSxDQUFDLENBQUMsU0FBd0UsQ0FBQyxDQUFBOzs7d0JBQXJILFFBQXVIOzRCQUNySCx3QkFBd0IsR0FBRyxLQUFLLENBQUM7eUJBQ2xDOzZCQUVFLENBQUEsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLGlCQUFpQixJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLHdCQUF3QixDQUFBLEVBQWxHLGVBQWtHOzZCQUMvRixTQUFTLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLEVBQTdDLGVBQTZDOzZCQUczQyxXQUFXLEVBQVgsY0FBVzt3QkFDVCxNQUFNLEdBQUcsSUFBSSxDQUFBO3dCQUNiLE9BQU8sR0FBRyxJQUFJLENBQUE7d0JBQ2xCLElBQUk7NEJBQ0YsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7NEJBQ2hELE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO3lCQUNsQzt3QkFDRCxPQUFPLENBQUMsRUFBRTs0QkFDUixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUErQixDQUFDLENBQUMsT0FBTyx1QkFBa0IsV0FBYSxDQUFDLENBQUE7eUJBQ3pGOzZCQUNHLENBQUEsQ0FBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsR0FBRyxNQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxVQUFVLENBQUEsQ0FBQSxFQUFsQyxjQUFrQzt3QkFDN0IsV0FBTSxJQUFJLENBQUMsaUNBQWlDLENBQUMsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFVBQVUsQ0FBQyxFQUFBOzRCQUF4RSxXQUFPLFNBQWlFLEVBQUE7OzRCQUtuRSxXQUFNLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFBOzZCQUFwRSxXQUFPLFNBQTZELEVBQUE7OzZCQUkvRCxXQUFNLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFBOzZCQUF0QyxXQUFPLFNBQStCLEVBQUM7OzZCQUl6QyxXQUFPOzRCQUNMLFdBQVcsYUFBQTs0QkFDWCxpQkFBaUIsbUJBQUE7eUJBQ2xCLEVBQUM7Ozs7O0tBRUw7SUFHWSxrQ0FBTyxHQUFwQixVQUFxQixNQUFjLEVBQUUsTUFBZSxFQUFFLE9BQWlCOzs7Ozs7d0JBQy9ELFdBQVcsR0FBRyxpQkFBZSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUssQ0FBQzt3QkFDakQsV0FBVyxHQUFHLG1DQUFtQyxDQUFDO3dCQUVoRCxNQUFNLGNBQ1YsTUFBTSxRQUFBLEVBRU4sV0FBVyxFQUFFLFlBQVksRUFDekIsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUNqQixNQUFNLENBQ1YsQ0FBQzs2QkFHRSxDQUFBLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxFQUFsRCxjQUFrRDt3QkFDNUMsZUFBZSxHQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxnQkFBckIsQ0FBc0I7d0JBR3hCLFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEVBQUE7O3dCQUEvRCxZQUFZLEdBQUcsU0FBZ0Q7NkJBQ2pFLFlBQVksRUFBWixjQUFZO3dCQUNkLEtBQUEsTUFBTSxDQUFBO3dCQUFpQixXQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBQTs7d0JBQWxELEdBQU8sWUFBWSxHQUFHLENBQUMsU0FBMkIsQ0FBQyxDQUFDLFdBQVcsQ0FBQzs7O3dCQU1wRSxJQUFJLE1BQU0sS0FBSyxvQkFBb0IsRUFBRTs0QkFDbkMsT0FBTyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7NEJBQ3pCLEtBQVMsR0FBRyxJQUFJLE9BQU8sRUFBRTtnQ0FDdkIsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLEVBQUU7b0NBQzdELE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lDQUNsQzs2QkFDRjs0QkFDRCxXQUFXLEdBQUcscUJBQXFCLENBQUM7eUJBQ3JDOzZCQUFNOzRCQUNMLFdBQVcsR0FBRyxnQ0FBZ0MsQ0FBQzs0QkFDL0MsT0FBTyxHQUFHLEVBQUUsQ0FBQzs0QkFDYixLQUFTLEdBQUcsSUFBSSxNQUFNLEVBQUU7Z0NBQ3RCLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtvQ0FDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQ0FDNUI7NkJBQ0Y7eUJBQ0Y7d0JBQ0csSUFBSSxHQUFROzRCQUNkLE9BQU8sRUFBRTtnQ0FDUCxjQUFjLEVBQUUsV0FBVzs2QkFDNUI7eUJBQ0YsQ0FBQzt3QkFDRixJQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRyxrQkFBa0IsR0FBRzs0QkFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3lCQUNyRDt3QkFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFOzRCQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO3lCQUNuRDt3QkFFSyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQzNELElBQUksV0FBVyxFQUFFOzRCQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsV0FBVyxDQUFDO3lCQUMzQzt3QkFFRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLEdBQUcsRUFBRTs0QkFDOUIsS0FBeUIsSUFBSSxDQUFDLE1BQU0sRUFBbEMsT0FBTyxhQUFBLEVBQUUsU0FBUyxlQUFBLENBQWlCOzRCQUNyQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUNyQixZQUFZLEdBQXFCLFNBQVMsYUFBOUIsRUFBRSxjQUFjLEdBQUssU0FBUyxlQUFkLENBQWU7NEJBQzdDLElBQUksR0FBRyxVQUFVLENBQUM7Z0NBQ3RCLElBQUksRUFBRSxFQUFFO2dDQUNSLFNBQVMsV0FBQTtnQ0FDVCxjQUFjLGdCQUFBO2dDQUNkLE9BQU8sU0FBQTs2QkFDUixFQUFFLFlBQVksQ0FBQyxDQUFDOzRCQUVqQixJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsZUFBYSxTQUFTLHdCQUFtQixjQUFjLGlCQUFZLE9BQU8sY0FBUyxJQUFNLENBQUM7eUJBQzlIO3dCQUtPLEtBQUssR0FBc0IsTUFBTSxNQUE1QixFQUFFLE9BQU8sR0FBYSxNQUFNLFFBQW5CLEVBQUUsTUFBTSxHQUFLLE1BQU0sT0FBWCxDQUFZO3dCQUN0QyxXQUFXLEdBQXdCOzRCQUNyQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO3lCQUNyQixDQUFDO3dCQUVGLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7d0JBQ3BDLE9BQU8sSUFBSSxDQUFDLFdBQVcseUJBQ2xCLE9BQU8sR0FDUCxXQUFXLENBQ2YsQ0FBQyxDQUFDO3dCQUNHLEtBQXlCLFdBQVcsRUFBRSxFQUFwQyxRQUFRLGNBQUEsRUFBRSxRQUFRLGNBQUEsQ0FBbUI7d0JBRXpDLE1BQU0sR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQzt3QkFFeEQsSUFBSSxNQUFNLEVBQUU7NEJBQ1YsTUFBTSxJQUFJLE1BQU0sQ0FBQzt5QkFDbEI7d0JBRTJCLFdBQU0sSUFBSSxDQUFDLElBQUksWUFDekMsR0FBRyxFQUFFLE1BQU0sRUFDWCxJQUFJLEVBQUUsT0FBTyxJQUNWLElBQUksRUFDUCxFQUFBOzt3QkFKSSxHQUFHLEdBQW1CLFNBSTFCO3dCQUdJLGNBQWMsR0FBRyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQy9ELElBQUksY0FBYyxFQUFFOzRCQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7eUJBQ3hEO3dCQUVELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRTs0QkFDL0UsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO3lCQUMxQzt3QkFFRCxXQUFPLEdBQUcsRUFBQzs7OztLQUNaO0lBRVksK0JBQUksR0FBakIsVUFBa0IsTUFBYyxFQUFFLElBQWtCO1FBQWxCLHFCQUFBLEVBQUEsU0FBa0I7Ozs7OzRCQUNuQyxXQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUE7O3dCQUF4RixRQUFRLEdBQUcsU0FBNkU7NkJBQ3hGLENBQUEsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssc0JBQXNCLElBQUksMkJBQTJCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBLEVBQW5HLGNBQW1HO3dCQUVyRyxXQUFNLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFBOzt3QkFBL0IsU0FBK0IsQ0FBQzt3QkFDckIsV0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFBOzt3QkFBeEYsUUFBUSxHQUFHLFNBQTZFLENBQUM7Ozt3QkFHM0YsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7NEJBQ3BELE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQ0FDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjO2dDQUMzQixHQUFHLEVBQUUsTUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksVUFBSyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQVM7NkJBQ3hELENBQUMsQ0FBQyxDQUFDO3lCQUNMO3dCQUVELFdBQU8sUUFBUSxDQUFDLElBQUksRUFBQzs7OztLQUN0QjtJQUdhLDhDQUFtQixHQUFqQyxVQUFrQyxRQUFZO1FBQVoseUJBQUEsRUFBQSxZQUFZOzs7Ozs7d0JBQ3RDLEtBQTRGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUExRyxjQUFjLG9CQUFBLEVBQUUsb0JBQW9CLDBCQUFBLEVBQUUsZUFBZSxxQkFBQSxFQUFFLFlBQVksa0JBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsQ0FBc0I7d0JBQ25ILFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsRUFBQTs7d0JBQWxELFNBQWtELENBQUM7d0JBQ25ELFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFBOzt3QkFBeEQsU0FBd0QsQ0FBQzt3QkFFdEMsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsRUFBQTs7d0JBQS9ELFlBQVksR0FBRyxTQUFnRDt3QkFDbkUsSUFBSSxDQUFDLFlBQVksRUFBRTs0QkFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dDQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtnQ0FDOUIsR0FBRyxFQUFFLFdBQVc7NkJBQ2pCLENBQUMsQ0FBQyxDQUFDO3lCQUNMO3dCQUNLLE1BQU0sR0FBZTs0QkFDekIsYUFBYSxFQUFFLFlBQVk7eUJBQzVCLENBQUM7d0JBQ2UsV0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLHVDQUF1QyxFQUFFLE1BQU0sQ0FBQyxFQUFBOzt3QkFBOUUsUUFBUSxHQUFHLFNBQW1FOzZCQUNoRixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBbEIsZUFBa0I7d0JBQ1osSUFBSSxHQUFLLFFBQVEsQ0FBQyxJQUFJLEtBQWxCLENBQW1COzZCQUMzQixDQUFBLElBQUksS0FBSyxvQkFBb0IsSUFBSSxJQUFJLEtBQUssdUJBQXVCLElBQUksSUFBSSxLQUFLLHVCQUF1QixDQUFBLEVBQXJHLGVBQXFHO3dCQUtuRixXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUFBOzt3QkFBM0QsV0FBVyxHQUFHLENBQUEsU0FBNkMsTUFBSyxTQUFTLENBQUMsU0FBUzs2QkFDckYsQ0FBQSxXQUFXLElBQUksSUFBSSxLQUFLLHVCQUF1QixDQUFBLEVBQS9DLGNBQStDO3dCQUUxQixXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEVBQUE7O3dCQUFsRSxjQUFjLEdBQUcsU0FBaUQ7d0JBRWxELFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEVBQUE7O3dCQUFoRSxhQUFhLEdBQUcsU0FBZ0Q7d0JBQzFELFdBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtnQ0FDcEQsY0FBYyxnQkFBQTtnQ0FDZCxhQUFhLGVBQUE7NkJBQ2QsQ0FBQyxFQUFBOzt3QkFISSxHQUFHLEdBQUcsU0FHVjt3QkFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUN6QyxJQUFJLFFBQVEsSUFBSSxDQUFDLEVBQUU7NEJBQ2pCLFdBQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUM7eUJBQzdDOzZCQUFNOzRCQUNMLE1BQU0sSUFBSSxLQUFLLENBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQ0FDYixJQUFJLEVBQUUsTUFBTSxDQUFDLGNBQWM7Z0NBQzNCLE9BQU8sRUFBRSx1QkFBdUI7NkJBQ2pDLENBQUMsQ0FDSCxDQUFBO3lCQUNGOzs7d0JBRUgsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQzt3QkFDM0MsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxFQUFBOzt3QkFBbkQsU0FBbUQsQ0FBQzs7NkJBRXRELE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzt3QkFDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxhQUFhO3dCQUMxQixHQUFHLEVBQUUsc0NBQStCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBTTtxQkFDekQsQ0FBQyxDQUFDLENBQUM7OzZCQUVGLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUExQixlQUEwQjt3QkFDNUIsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQzt3QkFDN0MsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBQTs7d0JBQTNFLFNBQTJFLENBQUM7d0JBRTVFLFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBQTs7d0JBQXJHLFNBQXFHLENBQUM7d0JBQ3RHLFdBQU87Z0NBQ0wsV0FBVyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWTtnQ0FDdkMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUI7NkJBQ3JELEVBQUM7OzZCQUlBLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUEzQixlQUEyQjt3QkFDN0IsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxFQUFBOzt3QkFBbkQsU0FBbUQsQ0FBQzt3QkFDcEQsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBQTs7d0JBQTdFLFNBQTZFLENBQUM7d0JBQzlFLFdBQU0sSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUE7O3dCQUFoQyxTQUFnQyxDQUFDOzs7Ozs7S0FFcEM7SUFFYSwyREFBZ0MsR0FBOUMsVUFBK0MsWUFBb0IsRUFBRSxRQUFnQjs7Ozs7NEJBQ3RFLFdBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTs0QkFDOUMsTUFBTSxFQUFFLE1BQU07NEJBQ2QsT0FBTyxFQUFFO2dDQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0NBQzVCLGNBQWMsRUFBRSxrQkFBa0I7NkJBQ25DOzRCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dDQUNuQixVQUFVLEVBQUUsZUFBZTtnQ0FDM0IsU0FBUyxFQUFFLFFBQVE7Z0NBQ25CLGFBQWEsRUFBRSxZQUFZOzZCQUM1QixDQUFDO3lCQUNILENBQUMsRUFBQTs7d0JBWEksSUFBSSxHQUFHLFNBV1g7d0JBVUksZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBOzZCQUM5RSxDQUFBLElBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFBLEVBQXZDLGNBQXVDO3dCQUN2QixXQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQTs7d0JBQTdCLElBQUksR0FBUSxTQUFpQjt3QkFDN0IsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksZUFBZSxDQUFBO3dCQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLE1BQUksVUFBVSxFQUFFLFNBQUksYUFBYSxFQUFFLHFDQUFnQyxJQUFJLENBQUMsTUFBTSxVQUFLLElBQUksQ0FBQyxLQUFLLFNBQUksSUFBSSxDQUFDLFVBQVUsV0FBTSxJQUFJLENBQUMsaUJBQWlCLFVBQUssS0FBSyxNQUFHLENBQUMsQ0FBQTs7NkJBRW5LLENBQUEsSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUEsRUFBbEIsY0FBa0I7d0JBQ1AsV0FBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUE3QixJQUFJLEdBQVEsU0FBaUI7d0JBQzdCLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLGVBQWUsQ0FBQTt3QkFDaEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFJLFVBQVUsRUFBRSxTQUFJLGFBQWEsRUFBRSxxQ0FBZ0MsSUFBSSxDQUFDLE1BQU0sVUFBSyxJQUFJLENBQUMsS0FBSyxTQUFJLElBQUksQ0FBQyxVQUFVLFdBQU0sSUFBSSxDQUFDLGlCQUFpQixVQUFLLEtBQUssTUFBRyxDQUFDLENBQUE7NEJBRTVLLFdBQU8sSUFBSSxDQUFDLElBQUksRUFBRSxFQUFBOzs7O0tBQ25CO0lBR2EsNkRBQWtDLEdBQWhELFVBQWlELFFBQWdCOzs7Ozs7d0JBQ3pELEtBQTRELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUExRSxjQUFjLG9CQUFBLEVBQUUsb0JBQW9CLDBCQUFBLEVBQUUsZUFBZSxxQkFBQSxDQUFzQjt3QkFDOUQsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsRUFBQTs7d0JBQS9ELFlBQVksR0FBRyxTQUFnRDt3QkFDckUsSUFBRyxDQUFDLFlBQVksRUFBRTs0QkFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dDQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtnQ0FDOUIsR0FBRyxFQUFFLFdBQVc7NkJBQ2pCLENBQUMsQ0FBQyxDQUFDO3lCQUNMO3dCQUVhLFdBQU0sSUFBSSxDQUFDLGdDQUFnQyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsRUFBQTs7d0JBQTNFLEtBQUssR0FBRyxTQUFtRTt3QkFDMUQsZUFBZSxHQUErRCxLQUFLLGNBQXBFLEVBQWdCLFdBQVcsR0FBb0MsS0FBSyxhQUF6QyxFQUFjLGlCQUFpQixHQUFLLEtBQUssV0FBVixDQUFVO3dCQUcxRyxJQUFHLENBQUMsV0FBVyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7NEJBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQ0FDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxhQUFhO2dDQUMxQixHQUFHLEVBQUUsNkJBQTZCOzZCQUNuQyxDQUFDLENBQUMsQ0FBQzt5QkFDTDs2QkFDRSxDQUFBLFdBQVcsSUFBSSxpQkFBaUIsQ0FBQSxFQUFoQyxjQUFnQzs2QkFDOUIsQ0FBQSxlQUFlLEtBQUssWUFBWSxDQUFBLEVBQWhDLGNBQWdDO3dCQUNqQyxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsRUFBQTs7d0JBQWpFLFNBQWlFLENBQUM7OzRCQUVwRSxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsRUFBQTs7d0JBQTVELFNBQTRELENBQUM7d0JBQzdELFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsb0JBQW9CLEVBQUUsaUJBQWlCLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFBOzt3QkFBNUYsU0FBNEYsQ0FBQzt3QkFDN0YsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQzt3QkFDN0MsV0FBTztnQ0FDTCxXQUFXLEVBQUUsV0FBVztnQ0FDeEIsaUJBQWlCLEVBQUUsaUJBQWlCOzZCQUNyQyxFQUFDOzs7OztLQUVMO0lBRWEsMkNBQWdCLEdBQTlCLFVBQStCLFlBQW9COzs7Ozs7d0JBQzNDLEtBQTRELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUExRSxjQUFjLG9CQUFBLEVBQUUsb0JBQW9CLDBCQUFBLEVBQUUsZUFBZSxxQkFBQSxDQUFzQjt3QkFHbkYsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxFQUFBOzt3QkFBbEQsU0FBa0QsQ0FBQzt3QkFDbkQsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLEVBQUE7O3dCQUF4RCxTQUF3RCxDQUFDO3dCQUN6RCxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsRUFBQTs7d0JBQTlELFNBQThELENBQUM7Ozs7O0tBQ2hFO0lBRWEsc0NBQVcsR0FBekI7Ozs7Ozt3QkFDVSxXQUFXLEdBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFlBQXJCLENBQXFCO3dCQUN2QixXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFBOzt3QkFBdkQsUUFBUSxHQUFHLFNBQTRDO3dCQUU3RCxJQUFJLENBQUMsUUFBUSxFQUFFOzRCQUlQLFdBQVcsR0FBRyxNQUFNLEVBQUUsQ0FBQTs0QkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFBOzRCQUNuRCxXQUFPLFdBQVcsRUFBQTt5QkFDbkI7NkJBQ0k7NEJBQ0gsV0FBTyxRQUFRLEVBQUE7eUJBQ2hCOzs7OztLQUNGO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBeGVELElBd2VDOztBQUVELElBQU0sVUFBVSxHQUF5QixFQUFFLENBQUM7QUFFNUMsTUFBTSxVQUFVLFdBQVcsQ0FBQyxNQUErQjtJQUN6RCxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksZ0JBQWdCLHVCQUN4QyxNQUFNLEtBQ1QsS0FBSyxFQUFFLElBQUksSUFDWCxDQUFDO0FBQ0wsQ0FBQztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxHQUFXO0lBQzNDLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEQVRBX1ZFUlNJT04sXG4gIExPR0lOVFlQRSxcbiAgZ2V0U2RrVmVyc2lvbixcbiAgZ2V0RW5kUG9pbnQsXG4gIE9BVVRIMl9MT0dJTlRZUEVfUFJFRklYXG59IGZyb20gJy4uL2NvbnN0YW50cy9jb21tb24nO1xuaW1wb3J0IHtcbiAgSVJlcXVlc3RPcHRpb25zLFxuICBTREtSZXF1ZXN0SW50ZXJmYWNlLFxuICBSZXNwb25zZU9iamVjdCxcbiAgSVVwbG9hZFJlcXVlc3RPcHRpb25zLFxuICBJUmVxdWVzdENvbmZpZ1xufSBmcm9tICdAY2xvdWRiYXNlL2FkYXB0ZXItaW50ZXJmYWNlJztcbmltcG9ydCB7IHV0aWxzLGp3dCxhZGFwdGVycyxjb25zdGFudHMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBLViB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuaW1wb3J0IHsgSUdldEFjY2Vzc1Rva2VuUmVzdWx0LCBJQ2xvdWRiYXNlUmVxdWVzdENvbmZpZywgSUFwcGVuZGVkUmVxdWVzdEluZm8sIElSZXF1ZXN0QmVmb3JlSG9vayB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVxdWVzdCc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ2FjaGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NhY2hlJztcbmltcG9ydCB7IGNsb3VkYmFzZSB9IGZyb20gJy4uJztcbmltcG9ydCB7IGdldENhY2hlQnlFbnZJZCwgZ2V0TG9jYWxDYWNoZSB9IGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IHsgRVZFTlRTIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cyc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vYWRhcHRlcic7XG5jb25zdCB7IGdldFNka05hbWUsIEVSUk9SUyB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyBnZW5TZXFJZCxpc0Zvcm1EYXRhLGZvcm1hdFVybCxjcmVhdGVTaWduIH0gPSB1dGlscztcbmNvbnN0IHsgUlVOVElNRSB9ID0gYWRhcHRlcnM7XG5cbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnXG5cbi8vIGltcG9ydCBGaW5nZXJwcmludEpTIGZyb20gJ0BmaW5nZXJwcmludGpzL2ZpbmdlcnByaW50anMnXG4vLyBjb25zdCBmcFByb21pc2UgPSBGaW5nZXJwcmludEpTLmxvYWQoKVxuXG4vLyDkuIvpnaLlh6Dnp40gYWN0aW9uIOS4jemcgOimgSBhY2Nlc3MgdG9rZW5cbmNvbnN0IEFDVElPTlNfV0lUSE9VVF9BQ0NFU1NUT0tFTiA9IFtcbiAgJ2F1dGguZ2V0Snd0JyxcbiAgJ2F1dGgubG9nb3V0JyxcbiAgJ2F1dGguc2lnbkluV2l0aFRpY2tldCcsXG4gICdhdXRoLnNpZ25JbkFub255bW91c2x5JyxcbiAgJ2F1dGguc2lnbkluJyxcbiAgJ2F1dGguZmV0Y2hBY2Nlc3NUb2tlbldpdGhSZWZyZXNoVG9rZW4nLFxuICAnYXV0aC5zaWduVXBXaXRoRW1haWxBbmRQYXNzd29yZCcsXG4gICdhdXRoLmFjdGl2YXRlRW5kVXNlck1haWwnLFxuICAnYXV0aC5zZW5kUGFzc3dvcmRSZXNldEVtYWlsJyxcbiAgJ2F1dGgucmVzZXRQYXNzd29yZFdpdGhUb2tlbicsXG4gICdhdXRoLmlzVXNlcm5hbWVSZWdpc3RlcmVkJ1xuXTtcblxuZnVuY3Rpb24gYmluZEhvb2tzKGluc3RhbmNlOiBTREtSZXF1ZXN0SW50ZXJmYWNlLCBuYW1lOiBzdHJpbmcsIGhvb2tzOiBJUmVxdWVzdEJlZm9yZUhvb2tbXSkge1xuICBjb25zdCBvcmlnaW5NZXRob2QgPSBpbnN0YW5jZVtuYW1lXTtcbiAgaW5zdGFuY2VbbmFtZV0gPSBmdW5jdGlvbiAob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKSB7XG4gICAgY29uc3QgZGF0YSA9IHt9O1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcbiAgICBob29rcy5mb3JFYWNoKGhvb2sgPT4ge1xuICAgICAgY29uc3QgeyBkYXRhOiBhcHBlbmRlZERhdGEsIGhlYWRlcnM6IGFwcGVuZGVkSGVhZGVycyB9ID0gaG9vay5jYWxsKGluc3RhbmNlLCBvcHRpb25zKTtcbiAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwgYXBwZW5kZWREYXRhKTtcbiAgICAgIE9iamVjdC5hc3NpZ24oaGVhZGVycywgYXBwZW5kZWRIZWFkZXJzKTtcbiAgICB9KTtcbiAgICBjb25zdCBvcmlnaW5EYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgIG9yaWdpbkRhdGEgJiYgKCgpID0+IHtcbiAgICAgIGlmIChpc0Zvcm1EYXRhKG9yaWdpbkRhdGEpKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAob3JpZ2luRGF0YSBhcyBGb3JtRGF0YSkuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBvcHRpb25zLmRhdGEgPSB7XG4gICAgICAgIC4uLm9yaWdpbkRhdGEsXG4gICAgICAgIC4uLmRhdGFcbiAgICAgIH07XG4gICAgfSkoKTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB7XG4gICAgICAuLi4ob3B0aW9ucy5oZWFkZXJzIHx8IHt9KSxcbiAgICAgIC4uLmhlYWRlcnNcbiAgICB9O1xuICAgIHJldHVybiAob3JpZ2luTWV0aG9kIGFzIEZ1bmN0aW9uKS5jYWxsKGluc3RhbmNlLCBvcHRpb25zKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGJlZm9yZUVhY2goKTogSUFwcGVuZGVkUmVxdWVzdEluZm8ge1xuICBjb25zdCBzZXFJZCA9IGdlblNlcUlkKCk7XG4gIHJldHVybiB7XG4gICAgZGF0YToge1xuICAgICAgc2VxSWRcbiAgICB9LFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdYLVNESy1WZXJzaW9uJzogYEBjbG91ZGJhc2UvanMtc2RrLyR7Z2V0U2RrVmVyc2lvbigpfWAsXG4gICAgICAneC1zZXFpZCc6IHNlcUlkXG4gICAgfVxuICB9O1xufVxuZXhwb3J0IGludGVyZmFjZSBJQ2xvdWRiYXNlUmVxdWVzdCB7XG4gIGZldGNoOiAodXJsT3JQYXRoOiBzdHJpbmcsIGluaXQ/OiBSZXF1ZXN0SW5pdCkgPT4gUHJvbWlzZTxSZXNwb25zZT47XG4gIHBvc3Q6IChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpID0+IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+O1xuICB1cGxvYWQ6IChvcHRpb25zOiBJVXBsb2FkUmVxdWVzdE9wdGlvbnMpID0+IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+O1xuICBkb3dubG9hZDogKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucykgPT4gUHJvbWlzZTxSZXNwb25zZU9iamVjdD47XG4gIHJlZnJlc2hBY2Nlc3NUb2tlbjogKCkgPT4gUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+O1xuICBnZXRBY2Nlc3NUb2tlbjogKCkgPT4gUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+O1xuICByZXF1ZXN0OiAoYWN0aW9uOiBzdHJpbmcsIHBhcmFtczogS1Y8YW55Piwgb3B0aW9ucz86IEtWPGFueT4pID0+IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+O1xuICBzZW5kOiAoYWN0aW9uOiBzdHJpbmcsIGRhdGE6IEtWPGFueT4pID0+IFByb21pc2U8YW55Pjtcbn1cblxuLyoqXG4gKiBAY2xhc3MgQ2xvdWRiYXNlUmVxdWVzdFxuICovXG5leHBvcnQgY2xhc3MgQ2xvdWRiYXNlUmVxdWVzdCBpbXBsZW1lbnRzIElDbG91ZGJhc2VSZXF1ZXN0IHtcbiAgY29uZmlnOiBJQ2xvdWRiYXNlUmVxdWVzdENvbmZpZztcbiAgX3Nob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbkhvb2s6IEZ1bmN0aW9uXG4gIF9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4gfCBudWxsXG4gIF9yZXFDbGFzczogU0RLUmVxdWVzdEludGVyZmFjZTtcbiAgLy8g6K+35rGC5aSx6LSl5piv5ZCm5oqb5Ye6RXJyb3JcbiAgcHJpdmF0ZSBfdGhyb3dXaGVuUmVxdWVzdEZhaWwgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcbiAgLy8g5oyB5LmF5YyW5pys5Zyw5a2Y5YKoXG4gIHByaXZhdGUgX2xvY2FsQ2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcbiAgLyoqXG4gICAqIOWIneWni+WMllxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25maWc6IElDbG91ZGJhc2VSZXF1ZXN0Q29uZmlnICYgeyB0aHJvdz86IGJvb2xlYW4gfSkge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIHRoaXMuX3JlcUNsYXNzID0gbmV3IFBsYXRmb3JtLmFkYXB0ZXIucmVxQ2xhc3MoPElSZXF1ZXN0Q29uZmlnPntcbiAgICAgIHRpbWVvdXQ6IHRoaXMuY29uZmlnLnRpbWVvdXQsXG4gICAgICB0aW1lb3V0TXNnOiBgW0BjbG91ZGJhc2UvanMtc2RrXSDor7fmsYLlnKgke3RoaXMuY29uZmlnLnRpbWVvdXQgLyAxMDAwfXPlhoXmnKrlrozmiJDvvIzlt7LkuK3mlq1gLFxuICAgICAgcmVzdHJpY3RlZE1ldGhvZHM6IFsncG9zdCddXG4gICAgfSk7XG4gICAgdGhpcy5fdGhyb3dXaGVuUmVxdWVzdEZhaWwgPSBjb25maWcudGhyb3cgfHwgZmFsc2U7XG4gICAgdGhpcy5fY2FjaGUgPSBnZXRDYWNoZUJ5RW52SWQodGhpcy5jb25maWcuZW52KTtcbiAgICB0aGlzLl9sb2NhbENhY2hlID0gZ2V0TG9jYWxDYWNoZSh0aGlzLmNvbmZpZy5lbnYpO1xuICAgIGJpbmRIb29rcyh0aGlzLl9yZXFDbGFzcywgJ3Bvc3QnLCBbYmVmb3JlRWFjaF0pO1xuICAgIGJpbmRIb29rcyh0aGlzLl9yZXFDbGFzcywgJ3VwbG9hZCcsIFtiZWZvcmVFYWNoXSk7XG4gICAgYmluZEhvb2tzKHRoaXMuX3JlcUNsYXNzLCAnZG93bmxvYWQnLCBbYmVmb3JlRWFjaF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOWll+S4gOWxgiBmZXRjaO+8jOaWueS+v+WkhOeQhuivt+axguWcsOWdgFxuICAgKiBAcGFyYW0ge3N0cmluZ30gICAgICB1cmxPclBhdGhcbiAgICogQHBhcmFtIHtSZXF1ZXN0SW5pdH0gaW5pdFxuICAgKiBAcmV0dXJucyBcbiAgICovXG4gIHB1YmxpYyBhc3luYyBmZXRjaCh1cmxPclBhdGg6IHN0cmluZywgaW5pdD86IFJlcXVlc3RJbml0KTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgIGNvbnN0IGRldmljZUlkID0gYXdhaXQgdGhpcy5nZXREZXZpY2VJZCgpO1xuXG4gICAgY29uc3QgaGVhZGVycyA9IHtcbiAgICAgICdYLVByb2plY3QtSWQnOiAncHJvZHVjdGlvbi1mdjk3OScsXG4gICAgICAnWC1TREstVmVyc2lvbic6IGBAY2xvdWRiYXNlL2pzLXNkay8ke2dldFNka1ZlcnNpb24oKX1gLFxuICAgICAgJ1gtUmVxdWVzdC1JZCc6IGdlblNlcUlkKCksXG4gICAgICAnWC1SZXF1ZXN0LVRpbWVzdGFtcCc6IERhdGUubm93KCksXG4gICAgICAnWC1EZXZpY2UtSWQnOiBkZXZpY2VJZFxuICAgIH1cbiAgICAvLyDpnZ53ZWLlubPlj7Dkvb/nlKjlh63or4Hmo4DpqozmnInmlYjmgKdcbiAgICBpZihQbGF0Zm9ybS5ydW50aW1lICE9PSBSVU5USU1FLldFQikge1xuICAgICAgY29uc3QgeyBhcHBTaWduLGFwcFNlY3JldCB9ID0gdGhpcy5jb25maWdcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KClcbiAgICAgIGNvbnN0IHsgYXBwQWNjZXNzS2V5LCBhcHBBY2Nlc3NLZXlJZCB9ID0gYXBwU2VjcmV0XG4gICAgICBjb25zdCBzaWduID0gY3JlYXRlU2lnbih7XG4gICAgICAgIC8vIGRhdGE6IGluaXQuYm9keSxcbiAgICAgICAgZGF0YToge30sXG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgYXBwQWNjZXNzS2V5SWQsXG4gICAgICAgIGFwcFNpZ25cbiAgICAgIH0sYXBwQWNjZXNzS2V5KVxuXG4gICAgICBoZWFkZXJzWydYLVRDQi1BcHAtU291cmNlJ10gPSBgdGltZXN0YW1wPSR7dGltZXN0YW1wfTthcHBBY2Nlc3NLZXlJZD0ke2FwcEFjY2Vzc0tleUlkfTthcHBTaWduPSR7YXBwU2lnbn07c2lnbj0ke3NpZ259YFxuICAgIH1cblxuICAgIGluaXQuaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oe30sIGluaXQuaGVhZGVycywgaGVhZGVycylcblxuICAgIGNvbnN0IHsgUFJPVE9DT0wsIEJBU0VfVVJMIH0gPSBnZXRFbmRQb2ludCgpXG4gICAgY29uc3Qgd2ViRW5kcG9pbnQgPSBgJHtQUk9UT0NPTH0ke0JBU0VfVVJMfWBcbiAgICBjb25zdCB1cmwgPSB1cmxPclBhdGguc3RhcnRzV2l0aCgnaHR0cCcpXG4gICAgICA/IHVybE9yUGF0aFxuICAgICAgOmAke25ldyBVUkwod2ViRW5kcG9pbnQpLm9yaWdpbn0ke3VybE9yUGF0aH1gXG4gICAgcmV0dXJuIGF3YWl0IGZldGNoKHVybCwgaW5pdClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwb3N0KG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXFDbGFzcy5wb3N0KG9wdGlvbnMpO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgcHVibGljIGFzeW5jIHVwbG9hZChvcHRpb25zOiBJVXBsb2FkUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxQ2xhc3MudXBsb2FkKG9wdGlvbnMpO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgcHVibGljIGFzeW5jIGRvd25sb2FkKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXFDbGFzcy5kb3dubG9hZChvcHRpb25zKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlZnJlc2hBY2Nlc3NUb2tlbigpOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4ge1xuICAgIC8vIOWPr+iDveS8muWQjOaXtuiwg+eUqOWkmuasoeWIt+aWsGFjY2VzcyB0b2tlbu+8jOi/memHjOaKiuWug+S7rOWQiOW5tuaIkOS4gOS4qlxuICAgIGlmICghdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZSkge1xuICAgICAgLy8g5rKh5pyJ5q2j5Zyo5Yi35paw77yM6YKj5LmI5q2j5bi45omn6KGM5Yi35paw6YC76L6RXG4gICAgICB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlID0gdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuKCk7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdDtcbiAgICBsZXQgZXJyO1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGVyciA9IGU7XG4gICAgfVxuICAgIHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UgPSBudWxsO1xuICAgIHRoaXMuX3Nob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbkhvb2sgPSBudWxsO1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZWZyZXNoQWNjZXNzVG9rZW5Gcm9tT2F1dGhTZXJ2ZXIoY2xpZW50SWQ6IHN0cmluZyk6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB7XG4gICAgLy8g5Y+v6IO95Lya5ZCM5pe26LCD55So5aSa5qyh5Yi35pawIGFjY2VzcyB0b2tlbu+8jOi/memHjOaKiuWug+S7rOWQiOW5tuaIkOS4gOS4qlxuICAgIGlmKCF0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlKSB7XG4gICAgICAvLyDmsqHmnInmraPlnKjliLfmlrDvvIzpgqPkuYjmraPluLjmiafooYzliLfmlrDpgLvovpFcbiAgICAgIHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UgPSB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Gcm9tT2F1dGhTZXJ2ZXIoY2xpZW50SWQpO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQ7XG4gICAgbGV0IGVycjtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGVyciA9IGU7XG4gICAgfVxuICAgIHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UgPSBudWxsO1xuICAgIHRoaXMuX3Nob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbkhvb2sgPSBudWxsO1xuICAgIGlmKGVycikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8g6I635Y+WIGFjY2VzcyB0b2tlblxuICBwdWJsaWMgYXN5bmMgZ2V0QWNjZXNzVG9rZW4oKTogUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+IHtcbiAgICBjb25zdCB7IGxvZ2luVHlwZUtleSxhY2Nlc3NUb2tlbktleSxhY2Nlc3NUb2tlbkV4cGlyZUtleSxyZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgbG9naW5UeXBlID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhsb2dpblR5cGVLZXkpO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZiAoIXJlZnJlc2hUb2tlbikge1xuICAgICAgLy8g5LiN6K+l5Ye6546w55qE54q25oCB77ya5pyJIGFjY2VzcyB0b2tlbiDljbTmsqHmnIkgcmVmcmVzaCB0b2tlblxuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLk9QRVJBVElPTl9GQUlMLFxuICAgICAgICBtc2c6ICdyZWZyZXNoIHRva2VuIGlzIG5vdCBleGlzdCwgeW91ciBsb2NhbCBkYXRhIG1pZ2h0IGJlIG1lc3NlZCB1cCwgcGxlYXNlIHJldHJ5IGFmdGVyIGNsZWFyIGxvY2FsU3RvcmFnZSBvciBzZXNzaW9uU3RvcmFnZSdcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgLy8g5aaC5p6c5rKh5pyJYWNjZXNzIHRva2Vu5oiW6ICF6L+H5pyf77yM6YKj5LmI5Yi35pawXG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbkV4cGlyZSA9IE51bWJlcihhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5KSk7XG5cbiAgICAvLyDosIPnlKjpkqnlrZDlh73mlbBcbiAgICBsZXQgc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5fc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuSG9vayAmJiAhKGF3YWl0IHRoaXMuX3Nob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbkhvb2soYWNjZXNzVG9rZW4sIGFjY2Vzc1Rva2VuRXhwaXJlKSkpIHtcbiAgICAgIHNob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmKCghYWNjZXNzVG9rZW4gfHwgIWFjY2Vzc1Rva2VuRXhwaXJlIHx8IGFjY2Vzc1Rva2VuRXhwaXJlIDwgRGF0ZS5ub3coKSkgJiYgc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuKSB7XG4gICAgICBpZiAobG9naW5UeXBlLnN0YXJ0c1dpdGgoT0FVVEgyX0xPR0lOVFlQRV9QUkVGSVgpKSB7XG4gICAgICAgIC8vIE5PVEU6IOi/memHjOmcgOimgeS7jiBhY2Nlc3NUb2tlbiDop6Plh7rmnaXpg6jliIbkv6Hmga/vvIznlKjkuo7liLfmlrAgYWNjZXNzVG9rZW5cbiAgICAgICAgLy8g5omA5Lul6L+H5pyf55qEIGFjY2Vzc1Rva2VuIOS4jeiDveWIoOmZpO+8jOiAjOaYr+eUqOaWsCBhY2Nlc3NUb2tlbiDopobnm5ZcbiAgICAgICAgaWYgKGFjY2Vzc1Rva2VuKSB7XG4gICAgICAgICAgbGV0IGhlYWRlciA9IG51bGxcbiAgICAgICAgICBsZXQgcGF5bG9hZCA9IG51bGxcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaGVhZGVyID0gand0LmRlY29kZShhY2Nlc3NUb2tlbiwge2hlYWRlcjogdHJ1ZX0pXG4gICAgICAgICAgICBwYXlsb2FkID0gand0LmRlY29kZShhY2Nlc3NUb2tlbilcbiAgICAgICAgICB9XG4gICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgW0RFQ09ERV9BQ0NFU1NfVE9LRU5fRVJST1JdICR7ZS5tZXNzYWdlfSwgYWNjZXNzdG9rZW46ICR7YWNjZXNzVG9rZW59YClcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhlYWRlcj8ua2lkICYmIHBheWxvYWQ/LnByb2plY3RfaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJlZnJlc2hBY2Nlc3NUb2tlbkZyb21PYXV0aFNlcnZlcihwYXlsb2FkPy5wcm9qZWN0X2lkKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAvLyDov5nph4znlKggZW52IOivleS4gOS4i1xuICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJlZnJlc2hBY2Nlc3NUb2tlbkZyb21PYXV0aFNlcnZlcih0aGlzLmNvbmZpZy5lbnYpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZWZyZXNoQWNjZXNzVG9rZW4oKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8g6L+U5Zue5pys5Zyw55qEYWNjZXNzIHRva2VuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhY2Nlc3NUb2tlbixcbiAgICAgICAgYWNjZXNzVG9rZW5FeHBpcmVcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUgY29tcGxleGl0eSAqL1xuICBwdWJsaWMgYXN5bmMgcmVxdWVzdChhY3Rpb246IHN0cmluZywgcGFyYW1zOiBLVjxhbnk+LCBvcHRpb25zPzogS1Y8YW55Pik6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCB0Y2JUcmFjZUtleSA9IGB4LXRjYi10cmFjZV8ke3RoaXMuY29uZmlnLmVudn1gO1xuICAgIGxldCBjb250ZW50VHlwZSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnO1xuICAgIC8vIGNvbnN0IHdlYkRldmljZUlkID0gYXdhaXQgZ2V0VGNiRmluZ2VycHJpbnRJZCgpO1xuICAgIGNvbnN0IHRtcE9iajogS1Y8YW55PiA9IHtcbiAgICAgIGFjdGlvbixcbiAgICAgIC8vIHdlYkRldmljZUlkLFxuICAgICAgZGF0YVZlcnNpb246IERBVEFfVkVSU0lPTixcbiAgICAgIGVudjogdGhpcy5jb25maWcuZW52LFxuICAgICAgLi4ucGFyYW1zXG4gICAgfTtcblxuXG4gICAgaWYgKEFDVElPTlNfV0lUSE9VVF9BQ0NFU1NUT0tFTi5pbmRleE9mKGFjdGlvbikgPT09IC0xKSB7XG4gICAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcblxuICAgICAgLy8g6Iul5pyJIHJlZnJlc2hUb2tlbiDliJnku7vliqHmnInnmbvlvZXmgIEg5Yi3IGFjY2Vzc1Rva2VuXG4gICAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgICBpZiAocmVmcmVzaFRva2VuKSB7XG4gICAgICAgIHRtcE9iai5hY2Nlc3NfdG9rZW4gPSAoYXdhaXQgdGhpcy5nZXRBY2Nlc3NUb2tlbigpKS5hY2Nlc3NUb2tlbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDmi7xib2R55ZKMY29udGVudC10eXBlXG4gICAgbGV0IHBheWxvYWQ7XG4gICAgaWYgKGFjdGlvbiA9PT0gJ3N0b3JhZ2UudXBsb2FkRmlsZScpIHtcbiAgICAgIHBheWxvYWQgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgIGZvciAobGV0IGtleSBpbiBwYXlsb2FkKSB7XG4gICAgICAgIGlmIChwYXlsb2FkLmhhc093blByb3BlcnR5KGtleSkgJiYgcGF5bG9hZFtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBwYXlsb2FkLmFwcGVuZChrZXksIHRtcE9ialtrZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29udGVudFR5cGUgPSAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRlbnRUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCc7XG4gICAgICBwYXlsb2FkID0ge307XG4gICAgICBmb3IgKGxldCBrZXkgaW4gdG1wT2JqKSB7XG4gICAgICAgIGlmICh0bXBPYmpba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcGF5bG9hZFtrZXldID0gdG1wT2JqW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IG9wdHM6IGFueSA9IHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6IGNvbnRlbnRUeXBlXG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAob3B0aW9ucz8uWydvblVwbG9hZFByb2dyZXNzJ10pIHtcbiAgICAgIG9wdHMub25VcGxvYWRQcm9ncmVzcyA9IG9wdGlvbnNbJ29uVXBsb2FkUHJvZ3Jlc3MnXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcucmVnaW9uKSB7XG4gICAgICBvcHRzLmhlYWRlcnNbJ1gtVENCLVJlZ2lvbiddID0gdGhpcy5jb25maWcucmVnaW9uO1xuICAgIH1cblxuICAgIGNvbnN0IHRyYWNlSGVhZGVyID0gdGhpcy5fbG9jYWxDYWNoZS5nZXRTdG9yZSh0Y2JUcmFjZUtleSk7XG4gICAgaWYgKHRyYWNlSGVhZGVyKSB7XG4gICAgICBvcHRzLmhlYWRlcnNbJ1gtVENCLVRyYWNlJ10gPSB0cmFjZUhlYWRlcjtcbiAgICB9XG4gICAgLy8g6Z2ed2Vi5bmz5Y+w5L2/55So5Yet6K+B5qOA6aqM5pyJ5pWI5oCnXG4gICAgaWYgKFBsYXRmb3JtLnJ1bnRpbWUgIT09IFJVTlRJTUUuV0VCKSB7XG4gICAgICBjb25zdCB7IGFwcFNpZ24sIGFwcFNlY3JldCB9ID0gdGhpcy5jb25maWc7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgeyBhcHBBY2Nlc3NLZXksIGFwcEFjY2Vzc0tleUlkIH0gPSBhcHBTZWNyZXQ7XG4gICAgICBjb25zdCBzaWduID0gY3JlYXRlU2lnbih7XG4gICAgICAgIGRhdGE6IHt9LCAvLyDmoKHpqoznrb7lkI3mtYHnqIvlrp7pmYXmnKrnlKjliLDvvIzlj6/orr7nqbpcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICBhcHBBY2Nlc3NLZXlJZCxcbiAgICAgICAgYXBwU2lnblxuICAgICAgfSwgYXBwQWNjZXNzS2V5KTtcblxuICAgICAgb3B0cy5oZWFkZXJzWydYLVRDQi1BcHAtU291cmNlJ10gPSBgdGltZXN0YW1wPSR7dGltZXN0YW1wfTthcHBBY2Nlc3NLZXlJZD0ke2FwcEFjY2Vzc0tleUlkfTthcHBTaWduPSR7YXBwU2lnbn07c2lnbj0ke3NpZ259YDtcbiAgICB9XG5cbiAgICAvLyDlj5Hlh7ror7fmsYJcbiAgICAvLyDmlrDnmoQgdXJsIOmcgOimgeaQuuW4piBlbnYg5Y+C5pWw6L+b6KGMIENPUlMg5qCh6aqMXG4gICAgLy8g6K+35rGC6ZO+5o6l5pSv5oyB5re75Yqg5Yqo5oCBIHF1ZXJ5IOWPguaVsO+8jOaWueS+v+eUqOaIt+iwg+ivleWumuS9jeivt+axglxuICAgIGNvbnN0IHsgcGFyc2UsIGluUXVlcnksIHNlYXJjaCB9ID0gcGFyYW1zO1xuICAgIGxldCBmb3JtYXRRdWVyeTogUmVjb3JkPHN0cmluZywgYW55PiA9IHtcbiAgICAgIGVudjogdGhpcy5jb25maWcuZW52XG4gICAgfTtcbiAgICAvLyDlsJ3or5Xop6PmnpDlk43lupTmlbDmja7kuLogSlNPTlxuICAgIHBhcnNlICYmIChmb3JtYXRRdWVyeS5wYXJzZSA9IHRydWUpO1xuICAgIGluUXVlcnkgJiYgKGZvcm1hdFF1ZXJ5ID0ge1xuICAgICAgLi4uaW5RdWVyeSxcbiAgICAgIC4uLmZvcm1hdFF1ZXJ5XG4gICAgfSk7XG4gICAgY29uc3QgeyBCQVNFX1VSTCwgUFJPVE9DT0wgfSA9IGdldEVuZFBvaW50KCk7XG4gICAgLy8g55Sf5oiQ6K+35rGCIHVybFxuICAgIGxldCBuZXdVcmwgPSBmb3JtYXRVcmwoUFJPVE9DT0wsIEJBU0VfVVJMLCBmb3JtYXRRdWVyeSk7XG5cbiAgICBpZiAoc2VhcmNoKSB7XG4gICAgICBuZXdVcmwgKz0gc2VhcmNoO1xuICAgIH1cblxuICAgIGNvbnN0IHJlczogUmVzcG9uc2VPYmplY3QgPSBhd2FpdCB0aGlzLnBvc3Qoe1xuICAgICAgdXJsOiBuZXdVcmwsXG4gICAgICBkYXRhOiBwYXlsb2FkLFxuICAgICAgLi4ub3B0c1xuICAgIH0pO1xuXG4gICAgLy8g5L+d5a2YIHRyYWNlIGhlYWRlclxuICAgIGNvbnN0IHJlc1RyYWNlSGVhZGVyID0gcmVzLmhlYWRlciAmJiByZXMuaGVhZGVyWyd4LXRjYi10cmFjZSddO1xuICAgIGlmIChyZXNUcmFjZUhlYWRlcikge1xuICAgICAgdGhpcy5fbG9jYWxDYWNoZS5zZXRTdG9yZSh0Y2JUcmFjZUtleSwgcmVzVHJhY2VIZWFkZXIpO1xuICAgIH1cblxuICAgIGlmICgoTnVtYmVyKHJlcy5zdGF0dXMpICE9PSAyMDAgJiYgTnVtYmVyKHJlcy5zdGF0dXNDb2RlKSAhPT0gMjAwKSB8fCAhcmVzLmRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbmV0d29yayByZXF1ZXN0IGVycm9yJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZW5kKGFjdGlvbjogc3RyaW5nLCBkYXRhOiBLVjxhbnk+ID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdChhY3Rpb24sIGRhdGEsIHsgb25VcGxvYWRQcm9ncmVzczogZGF0YS5vblVwbG9hZFByb2dyZXNzIH0pO1xuICAgIGlmIChyZXNwb25zZS5kYXRhLmNvZGUgPT09ICdBQ0NFU1NfVE9LRU5fRVhQSVJFRCcgJiYgQUNUSU9OU19XSVRIT1VUX0FDQ0VTU1RPS0VOLmluZGV4T2YoYWN0aW9uKSA9PT0gLTEpIHtcbiAgICAgIC8vIGFjY2Vzc190b2tlbui/h+acn++8jOmHjeaWsOiOt+WPllxuICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoQWNjZXNzVG9rZW4oKTtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0KGFjdGlvbiwgZGF0YSwgeyBvblVwbG9hZFByb2dyZXNzOiBkYXRhLm9uVXBsb2FkUHJvZ3Jlc3MgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlc3BvbnNlLmRhdGEuY29kZSAmJiB0aGlzLl90aHJvd1doZW5SZXF1ZXN0RmFpbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLk9QRVJBVElPTl9GQUlMLFxuICAgICAgICBtc2c6IGBbJHtyZXNwb25zZS5kYXRhLmNvZGV9XSAke3Jlc3BvbnNlLmRhdGEubWVzc2FnZX1gXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gIH1cblxuICAvLyDosIPnlKjmjqXlj6PliLfmlrBhY2Nlc3MgdG9rZW7vvIzlubbkuJTov5Tlm55cbiAgcHJpdmF0ZSBhc3luYyBfcmVmcmVzaEFjY2Vzc1Rva2VuKHJldHJ5TnVtID0gMSk6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXksIHJlZnJlc2hUb2tlbktleSwgbG9naW5UeXBlS2V5LCBhbm9ueW1vdXNVdWlkS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpO1xuXG4gICAgbGV0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZiAoIXJlZnJlc2hUb2tlbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLFxuICAgICAgICBtc2c6ICdub3QgbG9naW4nXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGNvbnN0IHBhcmFtczogS1Y8c3RyaW5nPiA9IHtcbiAgICAgIHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlblxuICAgIH07XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ2F1dGguZmV0Y2hBY2Nlc3NUb2tlbldpdGhSZWZyZXNoVG9rZW4nLCBwYXJhbXMpO1xuICAgIGlmIChyZXNwb25zZS5kYXRhLmNvZGUpIHtcbiAgICAgIGNvbnN0IHsgY29kZSB9ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIGlmIChjb2RlID09PSAnU0lHTl9QQVJBTV9JTlZBTElEJyB8fCBjb2RlID09PSAnUkVGUkVTSF9UT0tFTl9FWFBJUkVEJyB8fCBjb2RlID09PSAnSU5WQUxJRF9SRUZSRVNIX1RPS0VOJykge1xuICAgICAgICAvLyDov5nph4zlpITnkIbku6XkuIvpgLvovpHvvJpcbiAgICAgICAgLy8g5Yy/5ZCN55m75b2V5pe277yM5aaC5p6c5Yi35pawYWNjZXNzIHRva2Vu5oql6ZSZcmVmcmVzaCB0b2tlbui/h+acn++8jOatpOaXtuW6lOivpe+8mlxuICAgICAgICAvLyAxLiDlho3nlKggdXVpZCDmi7/kuIDmrKHmlrDnmoRyZWZyZXNoIHRva2VuXG4gICAgICAgIC8vIDIuIOaLv+aWsOeahHJlZnJlc2ggdG9rZW7mjaJhY2Nlc3MgdG9rZW5cbiAgICAgICAgY29uc3QgaXNBbm9ueW1vdXMgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGxvZ2luVHlwZUtleSkgPT09IExPR0lOVFlQRS5BTk9OWU1PVVM7XG4gICAgICAgIGlmIChpc0Fub255bW91cyAmJiBjb2RlID09PSAnSU5WQUxJRF9SRUZSRVNIX1RPS0VOJykge1xuICAgICAgICAgIC8vIOiOt+WPluaWsOeahCByZWZyZXNoIHRva2VuXG4gICAgICAgICAgY29uc3QgYW5vbnltb3VzX3V1aWQgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFub255bW91c1V1aWRLZXkpO1xuICAgICAgICAgIC8vIOatpOWkhGNhY2hl5Li65Z+657G7cHJvcGVydHlcbiAgICAgICAgICBjb25zdCByZWZyZXNoX3Rva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuc2VuZCgnYXV0aC5zaWduSW5Bbm9ueW1vdXNseScsIHtcbiAgICAgICAgICAgIGFub255bW91c191dWlkLFxuICAgICAgICAgICAgcmVmcmVzaF90b2tlblxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuX3NldFJlZnJlc2hUb2tlbihyZXMucmVmcmVzaF90b2tlbik7XG4gICAgICAgICAgaWYgKHJldHJ5TnVtID49IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW4oLS1yZXRyeU51bSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIGNvZGU6IEVSUk9SUy5PUEVSQVRJT05fRkFJTCxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAn6YeN6K+V6I635Y+WIHJlZnJlc2ggdG9rZW4g5aSx6LSlJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjbG91ZGJhc2UuZmlyZShFVkVOVFMuTE9HSU5fU1RBVEVfRVhQSVJFRCk7XG4gICAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5ORVRXT1JLX0VSUk9SLFxuICAgICAgICBtc2c6IGByZWZyZXNoIGFjY2Vzc190b2tlbiBmYWlsZWTvvJoke3Jlc3BvbnNlLmRhdGEuY29kZX1gXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmIChyZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbikge1xuICAgICAgY2xvdWRiYXNlLmZpcmUoRVZFTlRTLkFDQ0VTU19UT0tFTl9SRUZSRVNIRCk7XG4gICAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5LCByZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbik7XG4gICAgICAvLyDmnKzlnLDml7bpl7Tlj6/og73msqHmnInlkIzmraVcbiAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXksIHJlc3BvbnNlLmRhdGEuYWNjZXNzX3Rva2VuX2V4cGlyZSArIERhdGUubm93KCkpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWNjZXNzVG9rZW46IHJlc3BvbnNlLmRhdGEuYWNjZXNzX3Rva2VuLFxuICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyZTogcmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW5fZXhwaXJlXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyDljL/lkI3nmbvlvZVyZWZyZXNoX3Rva2Vu6L+H5pyf5oOF5Ya15LiL6L+U5ZuecmVmcmVzaF90b2tlblxuICAgIC8vIOatpOWcuuaZr+S4i+S9v+eUqOaWsOeahHJlZnJlc2hfdG9rZW7ojrflj5ZhY2Nlc3NfdG9rZW5cbiAgICBpZiAocmVzcG9uc2UuZGF0YS5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICBhd2FpdCB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSwgcmVzcG9uc2UuZGF0YS5yZWZyZXNoX3Rva2VuKTtcbiAgICAgIGF3YWl0IHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2ZldGNoQWNjZXNzVG9rZW5Gcm9tT2F1dGhTZXJ2ZXIocmVmcmVzaFRva2VuOiBzdHJpbmcsIGNsaWVudElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCByZXNwID0gYXdhaXQgdGhpcy5mZXRjaCgnL2F1dGgvdjEvdG9rZW4nLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgZ3JhbnRfdHlwZTogJ3JlZnJlc2hfdG9rZW4nLFxuICAgICAgICBjbGllbnRfaWQ6IGNsaWVudElkLFxuICAgICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW5cbiAgICAgIH0pXG4gICAgfSlcbiAgICAvLyBSZXNwOlxuICAgIC8vIHtcbiAgICAvLyAgIFwidG9rZW5fdHlwZVwiOiBcIkJlYXJlclwiLFxuICAgIC8vICAgXCJhY2Nlc3NfdG9rZW5cIjogXCJcIixcbiAgICAvLyAgIFwicmVmcmVzaF90b2tlblwiOlwiXCIsXG4gICAgLy8gICBcImV4cGlyZXNfaW5cIjogMjU5MjAwLFxuICAgIC8vICAgXCJzdWJcIjogXCJcIlxuICAgIC8vIH1cbiAgICAvLyDku6XkuIvku6PnoIHph43lpI1cbiAgICBjb25zdCBzZXFJZEZyb21IZWFkZXIgPSByZXNwLmhlYWRlcnMuZ2V0KCdTZXFJZCcpIHx8IHJlc3AuaGVhZGVycy5nZXQoJ1JlcXVlc3RJZCcpXG4gICAgaWYgKHJlc3Auc3RhdHVzID49IDQwMCAmJiByZXNwLnN0YXR1cyA8IDUwMCkge1xuICAgICAgY29uc3QgYm9keTogYW55ID0gYXdhaXQgcmVzcC5qc29uKClcbiAgICAgIGNvbnN0IHNlcUlkID0gYm9keS5yZXF1ZXN0X2lkIHx8IHNlcUlkRnJvbUhlYWRlclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHtnZXRTZGtOYW1lKCl9LyR7Z2V0U2RrVmVyc2lvbigpfV1bT0F1dGgyQXV0aFByb3ZpZGVyXVtzdGF0dXM6JHtyZXNwLnN0YXR1c31dWyR7Ym9keS5lcnJvcn0oJHtib2R5LmVycm9yX2NvZGV9KV0gJHtib2R5LmVycm9yX2Rlc2NyaXB0aW9ufSAoJHtzZXFJZH0pYClcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzcC5zdGF0dXMgPj0gNTAwKSB7XG4gICAgICBjb25zdCBib2R5OiBhbnkgPSBhd2FpdCByZXNwLmpzb24oKVxuICAgICAgY29uc3Qgc2VxSWQgPSBib2R5LnJlcXVlc3RfaWQgfHwgc2VxSWRGcm9tSGVhZGVyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFske2dldFNka05hbWUoKX0vJHtnZXRTZGtWZXJzaW9uKCl9XVtPQXV0aDJBdXRoUHJvdmlkZXJdW3N0YXR1czoke3Jlc3Auc3RhdHVzfV1bJHtib2R5LmVycm9yfSgke2JvZHkuZXJyb3JfY29kZX0pXSAke2JvZHkuZXJyb3JfZGVzY3JpcHRpb259ICgke3NlcUlkfSlgKVxuICAgIH1cbiAgICByZXR1cm4gcmVzcC5qc29uKClcbiAgfVxuXG4gIC8vIOiwg+eUqOaOpeWPo+WIt+aWsGFjY2VzcyB0b2tlbu+8jOW5tuS4lOi/lOWbnlxuICBwcml2YXRlIGFzeW5jIF9yZWZyZXNoQWNjZXNzVG9rZW5Gcm9tT2F1dGhTZXJ2ZXIoY2xpZW50SWQ6IHN0cmluZyk6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXksIHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgaWYoIXJlZnJlc2hUb2tlbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLFxuICAgICAgICBtc2c6ICdub3QgbG9naW4nXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLl9mZXRjaEFjY2Vzc1Rva2VuRnJvbU9hdXRoU2VydmVyKHJlZnJlc2hUb2tlbiwgY2xpZW50SWQpO1xuICAgIGNvbnN0IHsgcmVmcmVzaF90b2tlbjogbmV3UmVmcmVzaFRva2VuLCBhY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VuLCBleHBpcmVzX2luOiBhY2Nlc3NUb2tlbkV4cGlyZSB9ID0gdG9rZW5cblxuICAgIC8vIOmUmeivr+WkhOeQhlxuICAgIGlmKCFhY2Nlc3NUb2tlbiB8fCAhYWNjZXNzVG9rZW5FeHBpcmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5ORVRXT1JLX0VSUk9SLFxuICAgICAgICBtc2c6ICdyZWZyZXNoIGFjY2Vzc190b2tlbiBmYWlsZWQnXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmKGFjY2Vzc1Rva2VuICYmIGFjY2Vzc1Rva2VuRXhwaXJlKSB7XG4gICAgICBpZihuZXdSZWZyZXNoVG9rZW4gPT09IHJlZnJlc2hUb2tlbikge1xuICAgICAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSwgbmV3UmVmcmVzaFRva2VuKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuKTtcbiAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXksIGFjY2Vzc1Rva2VuRXhwaXJlICogMTAwMCArIERhdGUubm93KCkpO1xuICAgICAgY2xvdWRiYXNlLmZpcmUoRVZFTlRTLkFDQ0VTU19UT0tFTl9SRUZSRVNIRCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhY2Nlc3NUb2tlbjogYWNjZXNzVG9rZW4sXG4gICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlOiBhY2Nlc3NUb2tlbkV4cGlyZVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9zZXRSZWZyZXNoVG9rZW4ocmVmcmVzaFRva2VuOiBzdHJpbmcpIHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbkV4cGlyZUtleSwgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIC8vIHJlZnJlc2ggdG9rZW7orr7nva7liY3vvIzlhYjmuIXmjokgYWNjZXNzIHRva2VuXG4gICAgLy8g6K6+572u5piv55u05o6l5ouJ5Y+W5pawIGFjY2VzcyB0b2tlbiDopobnm5bvvIzogIzkuI3mmK8gcmVtb3ZlXG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXksIHJlZnJlc2hUb2tlbik7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldERldmljZUlkKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgeyBkZXZpY2VJZEtleSB9ID0gdGhpcy5fY2FjaGUua2V5c1xuICAgIGNvbnN0IGRldmljZUlkID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhkZXZpY2VJZEtleSlcblxuICAgIGlmICghZGV2aWNlSWQpIHtcbiAgICAgIC8vIGNvbnN0IGZwID0gYXdhaXQgZnBQcm9taXNlXG4gICAgICAvLyBjb25zdCByZXN1bHQgPSBhd2FpdCBmcC5nZXQoKVxuICAgICAgLy8gY29uc3QgZGV2aWNlSWQgPSByZXN1bHQudmlzaXRvcklkXG4gICAgICBjb25zdCBuZXdEZXZpY2VJZCA9IHV1aWR2NCgpXG4gICAgICB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKGRldmljZUlkS2V5LCBuZXdEZXZpY2VJZClcbiAgICAgIHJldHVybiBuZXdEZXZpY2VJZFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBkZXZpY2VJZFxuICAgIH1cbiAgfVxufVxuXG5jb25zdCByZXF1ZXN0TWFwOiBLVjxDbG91ZGJhc2VSZXF1ZXN0PiA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdFJlcXVlc3QoY29uZmlnOiBJQ2xvdWRiYXNlUmVxdWVzdENvbmZpZykge1xuICByZXF1ZXN0TWFwW2NvbmZpZy5lbnZdID0gbmV3IENsb3VkYmFzZVJlcXVlc3Qoe1xuICAgIC4uLmNvbmZpZyxcbiAgICB0aHJvdzogdHJ1ZVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlcXVlc3RCeUVudklkKGVudjogc3RyaW5nKTogQ2xvdWRiYXNlUmVxdWVzdCB7XG4gIHJldHVybiByZXF1ZXN0TWFwW2Vudl07XG59Il19