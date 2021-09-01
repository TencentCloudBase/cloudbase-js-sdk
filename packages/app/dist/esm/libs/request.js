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
                            'X-Project-Id': this.config.env,
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
    CloudbaseRequest.prototype.getOauthAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var oauthClient, validAccessToken, credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oauthClient = this.config.oauthClient;
                        if (!oauthClient) return [3, 3];
                        return [4, oauthClient.getAccessToken()];
                    case 1:
                        validAccessToken = _a.sent();
                        return [4, oauthClient._getCredentials()];
                    case 2:
                        credentials = _a.sent();
                        return [2, {
                                accessToken: validAccessToken,
                                accessTokenExpire: new Date(credentials.expires_at).getTime()
                            }];
                    case 3: return [2];
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
            var oauthClient, tcbTraceKey, contentType, tmpObj, _a, refreshTokenKey, refreshToken, _b, payload, key, key, opts, traceHeader, _c, appSign, appSecret, timestamp, appAccessKey, appAccessKeyId, sign, parse, inQuery, search, formatQuery, _d, BASE_URL, PROTOCOL, newUrl, res, resTraceHeader;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        oauthClient = this.config.oauthClient;
                        tcbTraceKey = "x-tcb-trace_" + this.config.env;
                        contentType = 'application/x-www-form-urlencoded';
                        tmpObj = __assign({ action: action, dataVersion: DATA_VERSION, env: this.config.env }, params);
                        console.log('oauthClient', oauthClient);
                        if (!oauthClient) return [3, 2];
                        _a = tmpObj;
                        return [4, this.getOauthAccessToken()];
                    case 1:
                        _a.access_token = (_e.sent()).accessToken;
                        _e.label = 2;
                    case 2:
                        if (!(ACTIONS_WITHOUT_ACCESSTOKEN.indexOf(action) === -1)) return [3, 5];
                        refreshTokenKey = this._cache.keys.refreshTokenKey;
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 3:
                        refreshToken = _e.sent();
                        if (!refreshToken) return [3, 5];
                        _b = tmpObj;
                        return [4, this.getAccessToken()];
                    case 4:
                        _b.access_token = (_e.sent()).accessToken;
                        _e.label = 5;
                    case 5:
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
                            _c = this.config, appSign = _c.appSign, appSecret = _c.appSecret;
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
                        _d = getEndPoint(), BASE_URL = _d.BASE_URL, PROTOCOL = _d.PROTOCOL;
                        newUrl = formatUrl(PROTOCOL, BASE_URL, formatQuery);
                        if (search) {
                            newUrl += search;
                        }
                        return [4, this.post(__assign({ url: newUrl, data: payload }, opts))];
                    case 6:
                        res = _e.sent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWJzL3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0wsWUFBWSxFQUNaLFNBQVMsRUFDVCxhQUFhLEVBQ2IsV0FBVyxFQUNYLHVCQUF1QixFQUN4QixNQUFNLHFCQUFxQixDQUFDO0FBUTdCLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUl2RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzdCLElBQUEsVUFBVSxHQUFhLFNBQVMsV0FBdEIsRUFBRSxNQUFNLEdBQUssU0FBUyxPQUFkLENBQWU7QUFDakMsSUFBQSxRQUFRLEdBQXdDLEtBQUssU0FBN0MsRUFBRSxVQUFVLEdBQTRCLEtBQUssV0FBakMsRUFBRSxTQUFTLEdBQWlCLEtBQUssVUFBdEIsRUFBRSxVQUFVLEdBQUssS0FBSyxXQUFWLENBQVc7QUFDdEQsSUFBQSxPQUFPLEdBQUssUUFBUSxRQUFiLENBQWM7QUFFN0IsT0FBTyxFQUFFLEVBQUUsSUFBSSxNQUFNLEVBQUUsTUFBTSxNQUFNLENBQUE7QUFNbkMsSUFBTSwyQkFBMkIsR0FBRztJQUNsQyxhQUFhO0lBQ2IsYUFBYTtJQUNiLHVCQUF1QjtJQUN2Qix3QkFBd0I7SUFDeEIsYUFBYTtJQUNiLHVDQUF1QztJQUN2QyxpQ0FBaUM7SUFDakMsMEJBQTBCO0lBQzFCLDZCQUE2QjtJQUM3Qiw2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QUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLGdCQUFnQix1QkFDeEMsTUFBTSxLQUNULEtBQUssRUFBRSxJQUFJLElBQ1gsQ0FBQztBQUNMLENBQUM7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsR0FBVztJQUMzQyxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgREFUQV9WRVJTSU9OLFxuICBMT0dJTlRZUEUsXG4gIGdldFNka1ZlcnNpb24sXG4gIGdldEVuZFBvaW50LFxuICBPQVVUSDJfTE9HSU5UWVBFX1BSRUZJWFxufSBmcm9tICcuLi9jb25zdGFudHMvY29tbW9uJztcbmltcG9ydCB7XG4gIElSZXF1ZXN0T3B0aW9ucyxcbiAgU0RLUmVxdWVzdEludGVyZmFjZSxcbiAgUmVzcG9uc2VPYmplY3QsXG4gIElVcGxvYWRSZXF1ZXN0T3B0aW9ucyxcbiAgSVJlcXVlc3RDb25maWdcbn0gZnJvbSAnQGNsb3VkYmFzZS9hZGFwdGVyLWludGVyZmFjZSc7XG5pbXBvcnQgeyB1dGlscywgand0LCBhZGFwdGVycywgY29uc3RhbnRzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgS1YgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcbmltcG9ydCB7IElHZXRBY2Nlc3NUb2tlblJlc3VsdCwgSUNsb3VkYmFzZVJlcXVlc3RDb25maWcsIElBcHBlbmRlZFJlcXVlc3RJbmZvLCBJUmVxdWVzdEJlZm9yZUhvb2sgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL3JlcXVlc3QnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNhY2hlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSc7XG5pbXBvcnQgeyBjbG91ZGJhc2UgfSBmcm9tICcuLic7XG5pbXBvcnQgeyBnZXRDYWNoZUJ5RW52SWQsIGdldExvY2FsQ2FjaGUgfSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCB7IEVWRU5UUyB9IGZyb20gJy4uL2NvbnN0YW50cy9ldmVudHMnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuL2FkYXB0ZXInO1xuY29uc3QgeyBnZXRTZGtOYW1lLCBFUlJPUlMgfSA9IGNvbnN0YW50cztcbmNvbnN0IHsgZ2VuU2VxSWQsIGlzRm9ybURhdGEsIGZvcm1hdFVybCwgY3JlYXRlU2lnbiB9ID0gdXRpbHM7XG5jb25zdCB7IFJVTlRJTUUgfSA9IGFkYXB0ZXJzO1xuXG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJ1xuXG4vLyBpbXBvcnQgRmluZ2VycHJpbnRKUyBmcm9tICdAZmluZ2VycHJpbnRqcy9maW5nZXJwcmludGpzJ1xuLy8gY29uc3QgZnBQcm9taXNlID0gRmluZ2VycHJpbnRKUy5sb2FkKClcblxuLy8g5LiL6Z2i5Yeg56eNIGFjdGlvbiDkuI3pnIDopoEgYWNjZXNzIHRva2VuXG5jb25zdCBBQ1RJT05TX1dJVEhPVVRfQUNDRVNTVE9LRU4gPSBbXG4gICdhdXRoLmdldEp3dCcsXG4gICdhdXRoLmxvZ291dCcsXG4gICdhdXRoLnNpZ25JbldpdGhUaWNrZXQnLFxuICAnYXV0aC5zaWduSW5Bbm9ueW1vdXNseScsXG4gICdhdXRoLnNpZ25JbicsXG4gICdhdXRoLmZldGNoQWNjZXNzVG9rZW5XaXRoUmVmcmVzaFRva2VuJyxcbiAgJ2F1dGguc2lnblVwV2l0aEVtYWlsQW5kUGFzc3dvcmQnLFxuICAnYXV0aC5hY3RpdmF0ZUVuZFVzZXJNYWlsJyxcbiAgJ2F1dGguc2VuZFBhc3N3b3JkUmVzZXRFbWFpbCcsXG4gICdhdXRoLnJlc2V0UGFzc3dvcmRXaXRoVG9rZW4nLFxuICAnYXV0aC5pc1VzZXJuYW1lUmVnaXN0ZXJlZCdcbl07XG5cbmZ1bmN0aW9uIGJpbmRIb29rcyhpbnN0YW5jZTogU0RLUmVxdWVzdEludGVyZmFjZSwgbmFtZTogc3RyaW5nLCBob29rczogSVJlcXVlc3RCZWZvcmVIb29rW10pIHtcbiAgY29uc3Qgb3JpZ2luTWV0aG9kID0gaW5zdGFuY2VbbmFtZV07XG4gIGluc3RhbmNlW25hbWVdID0gZnVuY3Rpb24gKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucykge1xuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBjb25zdCBoZWFkZXJzID0ge307XG4gICAgaG9va3MuZm9yRWFjaChob29rID0+IHtcbiAgICAgIGNvbnN0IHsgZGF0YTogYXBwZW5kZWREYXRhLCBoZWFkZXJzOiBhcHBlbmRlZEhlYWRlcnMgfSA9IGhvb2suY2FsbChpbnN0YW5jZSwgb3B0aW9ucyk7XG4gICAgICBPYmplY3QuYXNzaWduKGRhdGEsIGFwcGVuZGVkRGF0YSk7XG4gICAgICBPYmplY3QuYXNzaWduKGhlYWRlcnMsIGFwcGVuZGVkSGVhZGVycyk7XG4gICAgfSk7XG4gICAgY29uc3Qgb3JpZ2luRGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICBvcmlnaW5EYXRhICYmICgoKSA9PiB7XG4gICAgICBpZiAoaXNGb3JtRGF0YShvcmlnaW5EYXRhKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgKG9yaWdpbkRhdGEgYXMgRm9ybURhdGEpLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgb3B0aW9ucy5kYXRhID0ge1xuICAgICAgICAuLi5vcmlnaW5EYXRhLFxuICAgICAgICAuLi5kYXRhXG4gICAgICB9O1xuICAgIH0pKCk7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0ge1xuICAgICAgLi4uKG9wdGlvbnMuaGVhZGVycyB8fCB7fSksXG4gICAgICAuLi5oZWFkZXJzXG4gICAgfTtcbiAgICByZXR1cm4gKG9yaWdpbk1ldGhvZCBhcyBGdW5jdGlvbikuY2FsbChpbnN0YW5jZSwgb3B0aW9ucyk7XG4gIH07XG59XG5mdW5jdGlvbiBiZWZvcmVFYWNoKCk6IElBcHBlbmRlZFJlcXVlc3RJbmZvIHtcbiAgY29uc3Qgc2VxSWQgPSBnZW5TZXFJZCgpO1xuICByZXR1cm4ge1xuICAgIGRhdGE6IHtcbiAgICAgIHNlcUlkXG4gICAgfSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnWC1TREstVmVyc2lvbic6IGBAY2xvdWRiYXNlL2pzLXNkay8ke2dldFNka1ZlcnNpb24oKX1gLFxuICAgICAgJ3gtc2VxaWQnOiBzZXFJZFxuICAgIH1cbiAgfTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUNsb3VkYmFzZVJlcXVlc3Qge1xuICBmZXRjaDogKHVybE9yUGF0aDogc3RyaW5nLCBpbml0PzogUmVxdWVzdEluaXQpID0+IFByb21pc2U8UmVzcG9uc2U+O1xuICBwb3N0OiAob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKSA9PiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PjtcbiAgdXBsb2FkOiAob3B0aW9uczogSVVwbG9hZFJlcXVlc3RPcHRpb25zKSA9PiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PjtcbiAgZG93bmxvYWQ6IChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpID0+IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+O1xuICByZWZyZXNoQWNjZXNzVG9rZW46ICgpID0+IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PjtcbiAgZ2V0QWNjZXNzVG9rZW46ICgpID0+IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PjtcbiAgcmVxdWVzdDogKGFjdGlvbjogc3RyaW5nLCBwYXJhbXM6IEtWPGFueT4sIG9wdGlvbnM/OiBLVjxhbnk+KSA9PiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PjtcbiAgc2VuZDogKGFjdGlvbjogc3RyaW5nLCBkYXRhOiBLVjxhbnk+KSA9PiBQcm9taXNlPGFueT47XG59XG5cbi8qKlxuICogQGNsYXNzIENsb3VkYmFzZVJlcXVlc3RcbiAqL1xuZXhwb3J0IGNsYXNzIENsb3VkYmFzZVJlcXVlc3QgaW1wbGVtZW50cyBJQ2xvdWRiYXNlUmVxdWVzdCB7XG4gIGNvbmZpZzogSUNsb3VkYmFzZVJlcXVlc3RDb25maWc7XG4gIF9zaG91bGRSZWZyZXNoQWNjZXNzVG9rZW5Ib29rOiBGdW5jdGlvblxuICBfcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZTogUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+IHwgbnVsbFxuICBfcmVxQ2xhc3M6IFNES1JlcXVlc3RJbnRlcmZhY2U7XG4gIC8vIOivt+axguWksei0peaYr+WQpuaKm+WHukVycm9yXG4gIHByaXZhdGUgX3Rocm93V2hlblJlcXVlc3RGYWlsID0gZmFsc2U7XG4gIHByaXZhdGUgX2NhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG4gIC8vIOaMgeS5heWMluacrOWcsOWtmOWCqFxuICBwcml2YXRlIF9sb2NhbENhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG4gIC8qKlxuICAgKiDliJ3lp4vljJZcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJQ2xvdWRiYXNlUmVxdWVzdENvbmZpZyAmIHsgdGhyb3c/OiBib29sZWFuIH0pIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICB0aGlzLl9yZXFDbGFzcyA9IG5ldyBQbGF0Zm9ybS5hZGFwdGVyLnJlcUNsYXNzKDxJUmVxdWVzdENvbmZpZz57XG4gICAgICB0aW1lb3V0OiB0aGlzLmNvbmZpZy50aW1lb3V0LFxuICAgICAgdGltZW91dE1zZzogYFtAY2xvdWRiYXNlL2pzLXNka10g6K+35rGC5ZyoJHt0aGlzLmNvbmZpZy50aW1lb3V0IC8gMTAwMH1z5YaF5pyq5a6M5oiQ77yM5bey5Lit5patYCxcbiAgICAgIHJlc3RyaWN0ZWRNZXRob2RzOiBbJ3Bvc3QnXVxuICAgIH0pO1xuICAgIHRoaXMuX3Rocm93V2hlblJlcXVlc3RGYWlsID0gY29uZmlnLnRocm93IHx8IGZhbHNlO1xuICAgIHRoaXMuX2NhY2hlID0gZ2V0Q2FjaGVCeUVudklkKHRoaXMuY29uZmlnLmVudik7XG4gICAgdGhpcy5fbG9jYWxDYWNoZSA9IGdldExvY2FsQ2FjaGUodGhpcy5jb25maWcuZW52KTtcbiAgICBiaW5kSG9va3ModGhpcy5fcmVxQ2xhc3MsICdwb3N0JywgW2JlZm9yZUVhY2hdKTtcbiAgICBiaW5kSG9va3ModGhpcy5fcmVxQ2xhc3MsICd1cGxvYWQnLCBbYmVmb3JlRWFjaF0pO1xuICAgIGJpbmRIb29rcyh0aGlzLl9yZXFDbGFzcywgJ2Rvd25sb2FkJywgW2JlZm9yZUVhY2hdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDlpZfkuIDlsYIgZmV0Y2jvvIzmlrnkvr/lpITnkIbor7fmsYLlnLDlnYBcbiAgICogQHBhcmFtIHtzdHJpbmd9ICAgICAgdXJsT3JQYXRoXG4gICAqIEBwYXJhbSB7UmVxdWVzdEluaXR9IGluaXRcbiAgICogQHJldHVybnNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBmZXRjaCh1cmxPclBhdGg6IHN0cmluZywgaW5pdD86IFJlcXVlc3RJbml0KTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgIGNvbnN0IGRldmljZUlkID0gYXdhaXQgdGhpcy5nZXREZXZpY2VJZCgpO1xuXG4gICAgY29uc3QgaGVhZGVycyA9IHtcbiAgICAgICdYLVByb2plY3QtSWQnOiB0aGlzLmNvbmZpZy5lbnYsXG4gICAgICAnWC1TREstVmVyc2lvbic6IGBAY2xvdWRiYXNlL2pzLXNkay8ke2dldFNka1ZlcnNpb24oKX1gLFxuICAgICAgJ1gtUmVxdWVzdC1JZCc6IGdlblNlcUlkKCksXG4gICAgICAnWC1SZXF1ZXN0LVRpbWVzdGFtcCc6IERhdGUubm93KCksXG4gICAgICAnWC1EZXZpY2UtSWQnOiBkZXZpY2VJZFxuICAgIH1cbiAgICAvLyDpnZ53ZWLlubPlj7Dkvb/nlKjlh63or4Hmo4DpqozmnInmlYjmgKdcbiAgICBpZiAoUGxhdGZvcm0ucnVudGltZSAhPT0gUlVOVElNRS5XRUIpIHtcbiAgICAgIGNvbnN0IHsgYXBwU2lnbiwgYXBwU2VjcmV0IH0gPSB0aGlzLmNvbmZpZ1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKVxuICAgICAgY29uc3QgeyBhcHBBY2Nlc3NLZXksIGFwcEFjY2Vzc0tleUlkIH0gPSBhcHBTZWNyZXRcbiAgICAgIGNvbnN0IHNpZ24gPSBjcmVhdGVTaWduKHtcbiAgICAgICAgLy8gZGF0YTogaW5pdC5ib2R5LFxuICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICBhcHBBY2Nlc3NLZXlJZCxcbiAgICAgICAgYXBwU2lnblxuICAgICAgfSwgYXBwQWNjZXNzS2V5KVxuXG4gICAgICBoZWFkZXJzWydYLVRDQi1BcHAtU291cmNlJ10gPSBgdGltZXN0YW1wPSR7dGltZXN0YW1wfTthcHBBY2Nlc3NLZXlJZD0ke2FwcEFjY2Vzc0tleUlkfTthcHBTaWduPSR7YXBwU2lnbn07c2lnbj0ke3NpZ259YFxuICAgIH1cblxuICAgIGluaXQuaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oe30sIGluaXQuaGVhZGVycywgaGVhZGVycylcblxuICAgIGNvbnN0IHsgUFJPVE9DT0wsIEJBU0VfVVJMIH0gPSBnZXRFbmRQb2ludCgpXG4gICAgY29uc3Qgd2ViRW5kcG9pbnQgPSBgJHtQUk9UT0NPTH0ke0JBU0VfVVJMfWBcbiAgICBjb25zdCB1cmwgPSB1cmxPclBhdGguc3RhcnRzV2l0aCgnaHR0cCcpXG4gICAgICA/IHVybE9yUGF0aFxuICAgICAgOiBgJHtuZXcgVVJMKHdlYkVuZHBvaW50KS5vcmlnaW59JHt1cmxPclBhdGh9YFxuICAgIHJldHVybiBhd2FpdCBmZXRjaCh1cmwsIGluaXQpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcG9zdChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxQ2xhc3MucG9zdChvcHRpb25zKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIHB1YmxpYyBhc3luYyB1cGxvYWQob3B0aW9uczogSVVwbG9hZFJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxSZXNwb25zZU9iamVjdD4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX3JlcUNsYXNzLnVwbG9hZChvcHRpb25zKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIHB1YmxpYyBhc3luYyBkb3dubG9hZChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxQ2xhc3MuZG93bmxvYWQob3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZWZyZXNoQWNjZXNzVG9rZW4oKTogUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+IHtcbiAgICAvLyDlj6/og73kvJrlkIzml7bosIPnlKjlpJrmrKHliLfmlrBhY2Nlc3MgdG9rZW7vvIzov5nph4zmiorlroPku6zlkIjlubbmiJDkuIDkuKpcbiAgICBpZiAoIXRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UpIHtcbiAgICAgIC8vIOayoeacieato+WcqOWIt+aWsO+8jOmCo+S5iOato+W4uOaJp+ihjOWIt+aWsOmAu+i+kVxuICAgICAgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZSA9IHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQ7XG4gICAgbGV0IGVycjtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlcnIgPSBlO1xuICAgIH1cbiAgICB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlID0gbnVsbDtcbiAgICB0aGlzLl9zaG91bGRSZWZyZXNoQWNjZXNzVG9rZW5Ib29rID0gbnVsbDtcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVmcmVzaEFjY2Vzc1Rva2VuRnJvbU9hdXRoU2VydmVyKGNsaWVudElkOiBzdHJpbmcpOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4ge1xuICAgIC8vIOWPr+iDveS8muWQjOaXtuiwg+eUqOWkmuasoeWIt+aWsCBhY2Nlc3MgdG9rZW7vvIzov5nph4zmiorlroPku6zlkIjlubbmiJDkuIDkuKpcbiAgICBpZiAoIXRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UpIHtcbiAgICAgIC8vIOayoeacieato+WcqOWIt+aWsO+8jOmCo+S5iOato+W4uOaJp+ihjOWIt+aWsOmAu+i+kVxuICAgICAgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZSA9IHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlbkZyb21PYXV0aFNlcnZlcihjbGllbnRJZCk7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdDtcbiAgICBsZXQgZXJyO1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGVyciA9IGU7XG4gICAgfVxuICAgIHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UgPSBudWxsO1xuICAgIHRoaXMuX3Nob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbkhvb2sgPSBudWxsO1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIOiOt+WPliBPQXV0aCBhY2Nlc3N0b2tlblxuICBwdWJsaWMgYXN5bmMgZ2V0T2F1dGhBY2Nlc3NUb2tlbigpOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4ge1xuICAgIGNvbnN0IHsgb2F1dGhDbGllbnQgfSA9IHRoaXMuY29uZmlnXG4gICAgaWYgKG9hdXRoQ2xpZW50KSB7XG4gICAgICBjb25zdCB2YWxpZEFjY2Vzc1Rva2VuID0gYXdhaXQgb2F1dGhDbGllbnQuZ2V0QWNjZXNzVG9rZW4oKVxuICAgICAgY29uc3QgY3JlZGVudGlhbHMgPSBhd2FpdCBvYXV0aENsaWVudC5fZ2V0Q3JlZGVudGlhbHMoKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWNjZXNzVG9rZW46IHZhbGlkQWNjZXNzVG9rZW4sXG4gICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlOiBuZXcgRGF0ZShjcmVkZW50aWFscy5leHBpcmVzX2F0KS5nZXRUaW1lKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyDojrflj5YgYWNjZXNzIHRva2VuXG4gIHB1YmxpYyBhc3luYyBnZXRBY2Nlc3NUb2tlbigpOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4ge1xuICAgIGNvbnN0IHsgbG9naW5UeXBlS2V5LCBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXksIHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCBsb2dpblR5cGUgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGxvZ2luVHlwZUtleSk7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGlmICghcmVmcmVzaFRva2VuKSB7XG4gICAgICAvLyDkuI3or6Xlh7rnjrDnmoTnirbmgIHvvJrmnIkgYWNjZXNzIHRva2VuIOWNtOayoeaciSByZWZyZXNoIHRva2VuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsXG4gICAgICAgIG1zZzogJ3JlZnJlc2ggdG9rZW4gaXMgbm90IGV4aXN0LCB5b3VyIGxvY2FsIGRhdGEgbWlnaHQgYmUgbWVzc2VkIHVwLCBwbGVhc2UgcmV0cnkgYWZ0ZXIgY2xlYXIgbG9jYWxTdG9yYWdlIG9yIHNlc3Npb25TdG9yYWdlJ1xuICAgICAgfSkpO1xuICAgIH1cbiAgICAvLyDlpoLmnpzmsqHmnIlhY2Nlc3MgdG9rZW7miJbogIXov4fmnJ/vvIzpgqPkuYjliLfmlrBcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuRXhwaXJlID0gTnVtYmVyKGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpKTtcblxuICAgIC8vIOiwg+eUqOmSqeWtkOWHveaVsFxuICAgIGxldCBzaG91bGRSZWZyZXNoQWNjZXNzVG9rZW4gPSB0cnVlO1xuICAgIGlmICh0aGlzLl9zaG91bGRSZWZyZXNoQWNjZXNzVG9rZW5Ib29rICYmICEoYXdhaXQgdGhpcy5fc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuSG9vayhhY2Nlc3NUb2tlbiwgYWNjZXNzVG9rZW5FeHBpcmUpKSkge1xuICAgICAgc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCghYWNjZXNzVG9rZW4gfHwgIWFjY2Vzc1Rva2VuRXhwaXJlIHx8IGFjY2Vzc1Rva2VuRXhwaXJlIDwgRGF0ZS5ub3coKSkgJiYgc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuKSB7XG4gICAgICBpZiAobG9naW5UeXBlLnN0YXJ0c1dpdGgoT0FVVEgyX0xPR0lOVFlQRV9QUkVGSVgpKSB7XG4gICAgICAgIC8vIE5PVEU6IOi/memHjOmcgOimgeS7jiBhY2Nlc3NUb2tlbiDop6Plh7rmnaXpg6jliIbkv6Hmga/vvIznlKjkuo7liLfmlrAgYWNjZXNzVG9rZW5cbiAgICAgICAgLy8g5omA5Lul6L+H5pyf55qEIGFjY2Vzc1Rva2VuIOS4jeiDveWIoOmZpO+8jOiAjOaYr+eUqOaWsCBhY2Nlc3NUb2tlbiDopobnm5ZcbiAgICAgICAgaWYgKGFjY2Vzc1Rva2VuKSB7XG4gICAgICAgICAgbGV0IGhlYWRlciA9IG51bGxcbiAgICAgICAgICBsZXQgcGF5bG9hZCA9IG51bGxcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaGVhZGVyID0gand0LmRlY29kZShhY2Nlc3NUb2tlbiwgeyBoZWFkZXI6IHRydWUgfSlcbiAgICAgICAgICAgIHBheWxvYWQgPSBqd3QuZGVjb2RlKGFjY2Vzc1Rva2VuKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBbREVDT0RFX0FDQ0VTU19UT0tFTl9FUlJPUl0gJHtlLm1lc3NhZ2V9LCBhY2Nlc3N0b2tlbjogJHthY2Nlc3NUb2tlbn1gKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGVhZGVyPy5raWQgJiYgcGF5bG9hZD8ucHJvamVjdF9pZCkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVmcmVzaEFjY2Vzc1Rva2VuRnJvbU9hdXRoU2VydmVyKHBheWxvYWQ/LnByb2plY3RfaWQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIC8vIOi/memHjOeUqCBlbnYg6K+V5LiA5LiLXG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVmcmVzaEFjY2Vzc1Rva2VuRnJvbU9hdXRoU2VydmVyKHRoaXMuY29uZmlnLmVudilcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyDov5Tlm57mnKzlnLDnmoRhY2Nlc3MgdG9rZW5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjY2Vzc1Rva2VuLFxuICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyZVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG4gIHB1YmxpYyBhc3luYyByZXF1ZXN0KGFjdGlvbjogc3RyaW5nLCBwYXJhbXM6IEtWPGFueT4sIG9wdGlvbnM/OiBLVjxhbnk+KTogUHJvbWlzZTxSZXNwb25zZU9iamVjdD4ge1xuICAgIGNvbnN0IHsgb2F1dGhDbGllbnQgfSA9IHRoaXMuY29uZmlnXG4gICAgY29uc3QgdGNiVHJhY2VLZXkgPSBgeC10Y2ItdHJhY2VfJHt0aGlzLmNvbmZpZy5lbnZ9YDtcbiAgICBsZXQgY29udGVudFR5cGUgPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJztcbiAgICAvLyBjb25zdCB3ZWJEZXZpY2VJZCA9IGF3YWl0IGdldFRjYkZpbmdlcnByaW50SWQoKTtcbiAgICBjb25zdCB0bXBPYmo6IEtWPGFueT4gPSB7XG4gICAgICBhY3Rpb24sXG4gICAgICAvLyB3ZWJEZXZpY2VJZCxcbiAgICAgIGRhdGFWZXJzaW9uOiBEQVRBX1ZFUlNJT04sXG4gICAgICBlbnY6IHRoaXMuY29uZmlnLmVudixcbiAgICAgIC4uLnBhcmFtc1xuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZygnb2F1dGhDbGllbnQnLCBvYXV0aENsaWVudClcblxuICAgIC8vIOiLpeivhuWIq+WIsOazqOWGjOS6hiBPYXV0aCDmqKHlnZfvvIzliJnkvb/nlKhvYXV0aCBnZXRBY2Nlc3NUb2tlblxuICAgIGlmIChvYXV0aENsaWVudCkge1xuICAgICAgdG1wT2JqLmFjY2Vzc190b2tlbiA9IChhd2FpdCB0aGlzLmdldE9hdXRoQWNjZXNzVG9rZW4oKSkuYWNjZXNzVG9rZW5cbiAgICB9XG5cbiAgICBpZiAoQUNUSU9OU19XSVRIT1VUX0FDQ0VTU1RPS0VOLmluZGV4T2YoYWN0aW9uKSA9PT0gLTEpIHtcbiAgICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuXG4gICAgICAvLyDoi6XmnIkgcmVmcmVzaFRva2VuIOWImeS7u+WKoeacieeZu+W9leaAgSDliLcgYWNjZXNzVG9rZW5cbiAgICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICAgIGlmIChyZWZyZXNoVG9rZW4pIHtcbiAgICAgICAgdG1wT2JqLmFjY2Vzc190b2tlbiA9IChhd2FpdCB0aGlzLmdldEFjY2Vzc1Rva2VuKCkpLmFjY2Vzc1Rva2VuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIOaLvGJvZHnlkoxjb250ZW50LXR5cGVcbiAgICBsZXQgcGF5bG9hZDtcbiAgICBpZiAoYWN0aW9uID09PSAnc3RvcmFnZS51cGxvYWRGaWxlJykge1xuICAgICAgcGF5bG9hZCA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgZm9yIChsZXQga2V5IGluIHBheWxvYWQpIHtcbiAgICAgICAgaWYgKHBheWxvYWQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBwYXlsb2FkW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHBheWxvYWQuYXBwZW5kKGtleSwgdG1wT2JqW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb250ZW50VHlwZSA9ICdtdWx0aXBhcnQvZm9ybS1kYXRhJztcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGVudFR5cGUgPSAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04JztcbiAgICAgIHBheWxvYWQgPSB7fTtcbiAgICAgIGZvciAobGV0IGtleSBpbiB0bXBPYmopIHtcbiAgICAgICAgaWYgKHRtcE9ialtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBwYXlsb2FkW2tleV0gPSB0bXBPYmpba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBsZXQgb3B0czogYW55ID0ge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnY29udGVudC10eXBlJzogY29udGVudFR5cGVcbiAgICAgIH1cbiAgICB9O1xuICAgIGlmIChvcHRpb25zPy5bJ29uVXBsb2FkUHJvZ3Jlc3MnXSkge1xuICAgICAgb3B0cy5vblVwbG9hZFByb2dyZXNzID0gb3B0aW9uc1snb25VcGxvYWRQcm9ncmVzcyddO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZy5yZWdpb24pIHtcbiAgICAgIG9wdHMuaGVhZGVyc1snWC1UQ0ItUmVnaW9uJ10gPSB0aGlzLmNvbmZpZy5yZWdpb247XG4gICAgfVxuXG4gICAgY29uc3QgdHJhY2VIZWFkZXIgPSB0aGlzLl9sb2NhbENhY2hlLmdldFN0b3JlKHRjYlRyYWNlS2V5KTtcbiAgICBpZiAodHJhY2VIZWFkZXIpIHtcbiAgICAgIG9wdHMuaGVhZGVyc1snWC1UQ0ItVHJhY2UnXSA9IHRyYWNlSGVhZGVyO1xuICAgIH1cbiAgICAvLyDpnZ53ZWLlubPlj7Dkvb/nlKjlh63or4Hmo4DpqozmnInmlYjmgKdcbiAgICBpZiAoUGxhdGZvcm0ucnVudGltZSAhPT0gUlVOVElNRS5XRUIpIHtcbiAgICAgIGNvbnN0IHsgYXBwU2lnbiwgYXBwU2VjcmV0IH0gPSB0aGlzLmNvbmZpZztcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCB7IGFwcEFjY2Vzc0tleSwgYXBwQWNjZXNzS2V5SWQgfSA9IGFwcFNlY3JldDtcbiAgICAgIGNvbnN0IHNpZ24gPSBjcmVhdGVTaWduKHtcbiAgICAgICAgZGF0YToge30sIC8vIOagoemqjOetvuWQjea1geeoi+WunumZheacqueUqOWIsO+8jOWPr+iuvuepulxuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgIGFwcEFjY2Vzc0tleUlkLFxuICAgICAgICBhcHBTaWduXG4gICAgICB9LCBhcHBBY2Nlc3NLZXkpO1xuXG4gICAgICBvcHRzLmhlYWRlcnNbJ1gtVENCLUFwcC1Tb3VyY2UnXSA9IGB0aW1lc3RhbXA9JHt0aW1lc3RhbXB9O2FwcEFjY2Vzc0tleUlkPSR7YXBwQWNjZXNzS2V5SWR9O2FwcFNpZ249JHthcHBTaWdufTtzaWduPSR7c2lnbn1gO1xuICAgIH1cblxuICAgIC8vIOWPkeWHuuivt+axglxuICAgIC8vIOaWsOeahCB1cmwg6ZyA6KaB5pC65bimIGVudiDlj4LmlbDov5vooYwgQ09SUyDmoKHpqoxcbiAgICAvLyDor7fmsYLpk77mjqXmlK/mjIHmt7vliqDliqjmgIEgcXVlcnkg5Y+C5pWw77yM5pa55L6/55So5oi36LCD6K+V5a6a5L2N6K+35rGCXG4gICAgY29uc3QgeyBwYXJzZSwgaW5RdWVyeSwgc2VhcmNoIH0gPSBwYXJhbXM7XG4gICAgbGV0IGZvcm1hdFF1ZXJ5OiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge1xuICAgICAgZW52OiB0aGlzLmNvbmZpZy5lbnZcbiAgICB9O1xuICAgIC8vIOWwneivleino+aekOWTjeW6lOaVsOaNruS4uiBKU09OXG4gICAgcGFyc2UgJiYgKGZvcm1hdFF1ZXJ5LnBhcnNlID0gdHJ1ZSk7XG4gICAgaW5RdWVyeSAmJiAoZm9ybWF0UXVlcnkgPSB7XG4gICAgICAuLi5pblF1ZXJ5LFxuICAgICAgLi4uZm9ybWF0UXVlcnlcbiAgICB9KTtcbiAgICBjb25zdCB7IEJBU0VfVVJMLCBQUk9UT0NPTCB9ID0gZ2V0RW5kUG9pbnQoKTtcbiAgICAvLyDnlJ/miJDor7fmsYIgdXJsXG4gICAgbGV0IG5ld1VybCA9IGZvcm1hdFVybChQUk9UT0NPTCwgQkFTRV9VUkwsIGZvcm1hdFF1ZXJ5KTtcblxuICAgIGlmIChzZWFyY2gpIHtcbiAgICAgIG5ld1VybCArPSBzZWFyY2g7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzOiBSZXNwb25zZU9iamVjdCA9IGF3YWl0IHRoaXMucG9zdCh7XG4gICAgICB1cmw6IG5ld1VybCxcbiAgICAgIGRhdGE6IHBheWxvYWQsXG4gICAgICAuLi5vcHRzXG4gICAgfSk7XG5cbiAgICAvLyDkv53lrZggdHJhY2UgaGVhZGVyXG4gICAgY29uc3QgcmVzVHJhY2VIZWFkZXIgPSByZXMuaGVhZGVyICYmIHJlcy5oZWFkZXJbJ3gtdGNiLXRyYWNlJ107XG4gICAgaWYgKHJlc1RyYWNlSGVhZGVyKSB7XG4gICAgICB0aGlzLl9sb2NhbENhY2hlLnNldFN0b3JlKHRjYlRyYWNlS2V5LCByZXNUcmFjZUhlYWRlcik7XG4gICAgfVxuXG4gICAgaWYgKChOdW1iZXIocmVzLnN0YXR1cykgIT09IDIwMCAmJiBOdW1iZXIocmVzLnN0YXR1c0NvZGUpICE9PSAyMDApIHx8ICFyZXMuZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCduZXR3b3JrIHJlcXVlc3QgZXJyb3InKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNlbmQoYWN0aW9uOiBzdHJpbmcsIGRhdGE6IEtWPGFueT4gPSB7fSk6IFByb21pc2U8YW55PiB7XG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0KGFjdGlvbiwgZGF0YSwgeyBvblVwbG9hZFByb2dyZXNzOiBkYXRhLm9uVXBsb2FkUHJvZ3Jlc3MgfSk7XG4gICAgaWYgKHJlc3BvbnNlLmRhdGEuY29kZSA9PT0gJ0FDQ0VTU19UT0tFTl9FWFBJUkVEJyAmJiBBQ1RJT05TX1dJVEhPVVRfQUNDRVNTVE9LRU4uaW5kZXhPZihhY3Rpb24pID09PSAtMSkge1xuICAgICAgLy8gYWNjZXNzX3Rva2Vu6L+H5pyf77yM6YeN5paw6I635Y+WXG4gICAgICBhd2FpdCB0aGlzLnJlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QoYWN0aW9uLCBkYXRhLCB7IG9uVXBsb2FkUHJvZ3Jlc3M6IGRhdGEub25VcGxvYWRQcm9ncmVzcyB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVzcG9uc2UuZGF0YS5jb2RlICYmIHRoaXMuX3Rocm93V2hlblJlcXVlc3RGYWlsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsXG4gICAgICAgIG1zZzogYFske3Jlc3BvbnNlLmRhdGEuY29kZX1dICR7cmVzcG9uc2UuZGF0YS5tZXNzYWdlfWBcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgfVxuXG4gIC8vIOiwg+eUqOaOpeWPo+WIt+aWsGFjY2VzcyB0b2tlbu+8jOW5tuS4lOi/lOWbnlxuICBwcml2YXRlIGFzeW5jIF9yZWZyZXNoQWNjZXNzVG9rZW4ocmV0cnlOdW0gPSAxKTogUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+IHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbkV4cGlyZUtleSwgcmVmcmVzaFRva2VuS2V5LCBsb2dpblR5cGVLZXksIGFub255bW91c1V1aWRLZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSk7XG5cbiAgICBsZXQgcmVmcmVzaFRva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGlmICghcmVmcmVzaFRva2VuKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sXG4gICAgICAgIG1zZzogJ25vdCBsb2dpbidcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgY29uc3QgcGFyYW1zOiBLVjxzdHJpbmc+ID0ge1xuICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdCgnYXV0aC5mZXRjaEFjY2Vzc1Rva2VuV2l0aFJlZnJlc2hUb2tlbicsIHBhcmFtcyk7XG4gICAgaWYgKHJlc3BvbnNlLmRhdGEuY29kZSkge1xuICAgICAgY29uc3QgeyBjb2RlIH0gPSByZXNwb25zZS5kYXRhO1xuICAgICAgaWYgKGNvZGUgPT09ICdTSUdOX1BBUkFNX0lOVkFMSUQnIHx8IGNvZGUgPT09ICdSRUZSRVNIX1RPS0VOX0VYUElSRUQnIHx8IGNvZGUgPT09ICdJTlZBTElEX1JFRlJFU0hfVE9LRU4nKSB7XG4gICAgICAgIC8vIOi/memHjOWkhOeQhuS7peS4i+mAu+i+ke+8mlxuICAgICAgICAvLyDljL/lkI3nmbvlvZXml7bvvIzlpoLmnpzliLfmlrBhY2Nlc3MgdG9rZW7miqXplJlyZWZyZXNoIHRva2Vu6L+H5pyf77yM5q2k5pe25bqU6K+l77yaXG4gICAgICAgIC8vIDEuIOWGjeeUqCB1dWlkIOaLv+S4gOasoeaWsOeahHJlZnJlc2ggdG9rZW5cbiAgICAgICAgLy8gMi4g5ou/5paw55qEcmVmcmVzaCB0b2tlbuaNomFjY2VzcyB0b2tlblxuICAgICAgICBjb25zdCBpc0Fub255bW91cyA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMobG9naW5UeXBlS2V5KSA9PT0gTE9HSU5UWVBFLkFOT05ZTU9VUztcbiAgICAgICAgaWYgKGlzQW5vbnltb3VzICYmIGNvZGUgPT09ICdJTlZBTElEX1JFRlJFU0hfVE9LRU4nKSB7XG4gICAgICAgICAgLy8g6I635Y+W5paw55qEIHJlZnJlc2ggdG9rZW5cbiAgICAgICAgICBjb25zdCBhbm9ueW1vdXNfdXVpZCA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYW5vbnltb3VzVXVpZEtleSk7XG4gICAgICAgICAgLy8g5q2k5aSEY2FjaGXkuLrln7rnsbtwcm9wZXJ0eVxuICAgICAgICAgIGNvbnN0IHJlZnJlc2hfdG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5zZW5kKCdhdXRoLnNpZ25JbkFub255bW91c2x5Jywge1xuICAgICAgICAgICAgYW5vbnltb3VzX3V1aWQsXG4gICAgICAgICAgICByZWZyZXNoX3Rva2VuXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5fc2V0UmVmcmVzaFRva2VuKHJlcy5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICBpZiAocmV0cnlOdW0gPj0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlbigtLXJldHJ5TnVtKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgY29kZTogRVJST1JTLk9QRVJBVElPTl9GQUlMLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICfph43or5Xojrflj5YgcmVmcmVzaCB0b2tlbiDlpLHotKUnXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNsb3VkYmFzZS5maXJlKEVWRU5UUy5MT0dJTl9TVEFURV9FWFBJUkVEKTtcbiAgICAgICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLk5FVFdPUktfRVJST1IsXG4gICAgICAgIG1zZzogYHJlZnJlc2ggYWNjZXNzX3Rva2VuIGZhaWxlZO+8miR7cmVzcG9uc2UuZGF0YS5jb2RlfWBcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYgKHJlc3BvbnNlLmRhdGEuYWNjZXNzX3Rva2VuKSB7XG4gICAgICBjbG91ZGJhc2UuZmlyZShFVkVOVFMuQUNDRVNTX1RPS0VOX1JFRlJFU0hEKTtcbiAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXksIHJlc3BvbnNlLmRhdGEuYWNjZXNzX3Rva2VuKTtcbiAgICAgIC8vIOacrOWcsOaXtumXtOWPr+iDveayoeacieWQjOatpVxuICAgICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSwgcmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW5fZXhwaXJlICsgRGF0ZS5ub3coKSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhY2Nlc3NUb2tlbjogcmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW4sXG4gICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlOiByZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbl9leHBpcmVcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIOWMv+WQjeeZu+W9lXJlZnJlc2hfdG9rZW7ov4fmnJ/mg4XlhrXkuIvov5Tlm55yZWZyZXNoX3Rva2VuXG4gICAgLy8g5q2k5Zy65pmv5LiL5L2/55So5paw55qEcmVmcmVzaF90b2tlbuiOt+WPlmFjY2Vzc190b2tlblxuICAgIGlmIChyZXNwb25zZS5kYXRhLnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5LCByZXNwb25zZS5kYXRhLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgYXdhaXQgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfZmV0Y2hBY2Nlc3NUb2tlbkZyb21PYXV0aFNlcnZlcihyZWZyZXNoVG9rZW46IHN0cmluZywgY2xpZW50SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLmZldGNoKCcvYXV0aC92MS90b2tlbicsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBncmFudF90eXBlOiAncmVmcmVzaF90b2tlbicsXG4gICAgICAgIGNsaWVudF9pZDogY2xpZW50SWQsXG4gICAgICAgIHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlblxuICAgICAgfSlcbiAgICB9KVxuICAgIC8vIFJlc3A6XG4gICAgLy8ge1xuICAgIC8vICAgXCJ0b2tlbl90eXBlXCI6IFwiQmVhcmVyXCIsXG4gICAgLy8gICBcImFjY2Vzc190b2tlblwiOiBcIlwiLFxuICAgIC8vICAgXCJyZWZyZXNoX3Rva2VuXCI6XCJcIixcbiAgICAvLyAgIFwiZXhwaXJlc19pblwiOiAyNTkyMDAsXG4gICAgLy8gICBcInN1YlwiOiBcIlwiXG4gICAgLy8gfVxuICAgIC8vIOS7peS4i+S7o+eggemHjeWkjVxuICAgIGNvbnN0IHNlcUlkRnJvbUhlYWRlciA9IHJlc3AuaGVhZGVycy5nZXQoJ1NlcUlkJykgfHwgcmVzcC5oZWFkZXJzLmdldCgnUmVxdWVzdElkJylcbiAgICBpZiAocmVzcC5zdGF0dXMgPj0gNDAwICYmIHJlc3Auc3RhdHVzIDwgNTAwKSB7XG4gICAgICBjb25zdCBib2R5OiBhbnkgPSBhd2FpdCByZXNwLmpzb24oKVxuICAgICAgY29uc3Qgc2VxSWQgPSBib2R5LnJlcXVlc3RfaWQgfHwgc2VxSWRGcm9tSGVhZGVyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFske2dldFNka05hbWUoKX0vJHtnZXRTZGtWZXJzaW9uKCl9XVtPQXV0aDJBdXRoUHJvdmlkZXJdW3N0YXR1czoke3Jlc3Auc3RhdHVzfV1bJHtib2R5LmVycm9yfSgke2JvZHkuZXJyb3JfY29kZX0pXSAke2JvZHkuZXJyb3JfZGVzY3JpcHRpb259ICgke3NlcUlkfSlgKVxuICAgIH1cbiAgICBlbHNlIGlmIChyZXNwLnN0YXR1cyA+PSA1MDApIHtcbiAgICAgIGNvbnN0IGJvZHk6IGFueSA9IGF3YWl0IHJlc3AuanNvbigpXG4gICAgICBjb25zdCBzZXFJZCA9IGJvZHkucmVxdWVzdF9pZCB8fCBzZXFJZEZyb21IZWFkZXJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7Z2V0U2RrTmFtZSgpfS8ke2dldFNka1ZlcnNpb24oKX1dW09BdXRoMkF1dGhQcm92aWRlcl1bc3RhdHVzOiR7cmVzcC5zdGF0dXN9XVske2JvZHkuZXJyb3J9KCR7Ym9keS5lcnJvcl9jb2RlfSldICR7Ym9keS5lcnJvcl9kZXNjcmlwdGlvbn0gKCR7c2VxSWR9KWApXG4gICAgfVxuICAgIHJldHVybiByZXNwLmpzb24oKVxuICB9XG5cbiAgLy8g6LCD55So5o6l5Y+j5Yi35pawYWNjZXNzIHRva2Vu77yM5bm25LiU6L+U5ZueXG4gIHByaXZhdGUgYXN5bmMgX3JlZnJlc2hBY2Nlc3NUb2tlbkZyb21PYXV0aFNlcnZlcihjbGllbnRJZDogc3RyaW5nKTogUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+IHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbkV4cGlyZUtleSwgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZiAoIXJlZnJlc2hUb2tlbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLFxuICAgICAgICBtc2c6ICdub3QgbG9naW4nXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLl9mZXRjaEFjY2Vzc1Rva2VuRnJvbU9hdXRoU2VydmVyKHJlZnJlc2hUb2tlbiwgY2xpZW50SWQpO1xuICAgIGNvbnN0IHsgcmVmcmVzaF90b2tlbjogbmV3UmVmcmVzaFRva2VuLCBhY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VuLCBleHBpcmVzX2luOiBhY2Nlc3NUb2tlbkV4cGlyZSB9ID0gdG9rZW5cblxuICAgIC8vIOmUmeivr+WkhOeQhlxuICAgIGlmICghYWNjZXNzVG9rZW4gfHwgIWFjY2Vzc1Rva2VuRXhwaXJlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuTkVUV09SS19FUlJPUixcbiAgICAgICAgbXNnOiAncmVmcmVzaCBhY2Nlc3NfdG9rZW4gZmFpbGVkJ1xuICAgICAgfSkpO1xuICAgIH1cbiAgICBpZiAoYWNjZXNzVG9rZW4gJiYgYWNjZXNzVG9rZW5FeHBpcmUpIHtcbiAgICAgIGlmIChuZXdSZWZyZXNoVG9rZW4gPT09IHJlZnJlc2hUb2tlbikge1xuICAgICAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSwgbmV3UmVmcmVzaFRva2VuKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuKTtcbiAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXksIGFjY2Vzc1Rva2VuRXhwaXJlICogMTAwMCArIERhdGUubm93KCkpO1xuICAgICAgY2xvdWRiYXNlLmZpcmUoRVZFTlRTLkFDQ0VTU19UT0tFTl9SRUZSRVNIRCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhY2Nlc3NUb2tlbjogYWNjZXNzVG9rZW4sXG4gICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlOiBhY2Nlc3NUb2tlbkV4cGlyZVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9zZXRSZWZyZXNoVG9rZW4ocmVmcmVzaFRva2VuOiBzdHJpbmcpIHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbkV4cGlyZUtleSwgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIC8vIHJlZnJlc2ggdG9rZW7orr7nva7liY3vvIzlhYjmuIXmjokgYWNjZXNzIHRva2VuXG4gICAgLy8g6K6+572u5piv55u05o6l5ouJ5Y+W5pawIGFjY2VzcyB0b2tlbiDopobnm5bvvIzogIzkuI3mmK8gcmVtb3ZlXG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXksIHJlZnJlc2hUb2tlbik7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldERldmljZUlkKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgeyBkZXZpY2VJZEtleSB9ID0gdGhpcy5fY2FjaGUua2V5c1xuICAgIGNvbnN0IGRldmljZUlkID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhkZXZpY2VJZEtleSlcblxuICAgIGlmICghZGV2aWNlSWQpIHtcbiAgICAgIC8vIGNvbnN0IGZwID0gYXdhaXQgZnBQcm9taXNlXG4gICAgICAvLyBjb25zdCByZXN1bHQgPSBhd2FpdCBmcC5nZXQoKVxuICAgICAgLy8gY29uc3QgZGV2aWNlSWQgPSByZXN1bHQudmlzaXRvcklkXG4gICAgICBjb25zdCBuZXdEZXZpY2VJZCA9IHV1aWR2NCgpXG4gICAgICB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKGRldmljZUlkS2V5LCBuZXdEZXZpY2VJZClcbiAgICAgIHJldHVybiBuZXdEZXZpY2VJZFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBkZXZpY2VJZFxuICAgIH1cbiAgfVxufVxuXG5jb25zdCByZXF1ZXN0TWFwOiBLVjxDbG91ZGJhc2VSZXF1ZXN0PiA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdFJlcXVlc3QoY29uZmlnOiBJQ2xvdWRiYXNlUmVxdWVzdENvbmZpZykge1xuICByZXF1ZXN0TWFwW2NvbmZpZy5lbnZdID0gbmV3IENsb3VkYmFzZVJlcXVlc3Qoe1xuICAgIC4uLmNvbmZpZyxcbiAgICB0aHJvdzogdHJ1ZVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlcXVlc3RCeUVudklkKGVudjogc3RyaW5nKTogQ2xvdWRiYXNlUmVxdWVzdCB7XG4gIHJldHVybiByZXF1ZXN0TWFwW2Vudl07XG59Il19