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
import { DATA_VERSION, LOGINTYPE, getSdkVersion, getEndPoint, getBaseEndPoint, OAUTH2_LOGINTYPE_PREFIX } from '../constants/common';
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
        var _fromApp = config._fromApp;
        this.config = config;
        this._fromApp = _fromApp;
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
            var deviceId, headers, _a, appSign, appSecret, timestamp, appAccessKey, appAccessKeyId, sign, url;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.getDeviceId()];
                    case 1:
                        deviceId = _b.sent();
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
                        url = urlOrPath.startsWith('http')
                            ? urlOrPath
                            : "" + getBaseEndPoint() + urlOrPath;
                        return [4, fetch(url, init)];
                    case 2: return [2, _b.sent()];
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
            var oauthClient;
            return __generator(this, function (_a) {
                oauthClient = this.config.oauthClient;
                if (oauthClient) {
                    return [2, this.getOauthAccessTokenV2(oauthClient)];
                }
                return [2];
            });
        });
    };
    CloudbaseRequest.prototype.getOauthAccessTokenV2 = function (oauthClient) {
        return __awaiter(this, void 0, void 0, function () {
            var validAccessToken, credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, oauthClient.getAccessToken()];
                    case 1:
                        validAccessToken = _a.sent();
                        return [4, oauthClient._getCredentials()];
                    case 2:
                        credentials = _a.sent();
                        return [2, {
                                accessToken: validAccessToken,
                                accessTokenExpire: new Date(credentials.expires_at).getTime()
                            }];
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
            var oauthClient, tcbTraceKey, contentType, tmpObj, _a, loginFlag, app, oauthClient_1, _b, refreshTokenKey, refreshToken, _c, payload, key, key, opts, traceHeader, _d, appSign, appSecret, timestamp, appAccessKey, appAccessKeyId, sign, parse, inQuery, search, formatQuery, _e, BASE_URL, PROTOCOL, newUrl, res, resTraceHeader;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        oauthClient = this.config.oauthClient;
                        tcbTraceKey = "x-tcb-trace_" + this.config.env;
                        contentType = 'application/x-www-form-urlencoded';
                        tmpObj = __assign({ action: action, dataVersion: DATA_VERSION, env: this.config.env }, params);
                        if (!oauthClient) return [3, 2];
                        _a = tmpObj;
                        return [4, this.getOauthAccessToken()];
                    case 1:
                        _a.access_token = (_f.sent()).accessToken;
                        return [3, 5];
                    case 2: return [4, this.checkFromAuthV2()];
                    case 3:
                        loginFlag = _f.sent();
                        if (!(loginFlag === 'oauth')) return [3, 5];
                        app = this.config._fromApp;
                        oauthClient_1 = app.oauthInstance.oauth2client;
                        _b = tmpObj;
                        return [4, this.getOauthAccessTokenV2(oauthClient_1)];
                    case 4:
                        _b.access_token = (_f.sent()).accessToken;
                        _f.label = 5;
                    case 5:
                        if (!(ACTIONS_WITHOUT_ACCESSTOKEN.indexOf(action) === -1)) return [3, 8];
                        refreshTokenKey = this._cache.keys.refreshTokenKey;
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 6:
                        refreshToken = _f.sent();
                        if (!refreshToken) return [3, 8];
                        _c = tmpObj;
                        return [4, this.getAccessToken()];
                    case 7:
                        _c.access_token = (_f.sent()).accessToken;
                        _f.label = 8;
                    case 8:
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
                            _d = this.config, appSign = _d.appSign, appSecret = _d.appSecret;
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
                        _e = getEndPoint(), BASE_URL = _e.BASE_URL, PROTOCOL = _e.PROTOCOL;
                        newUrl = formatUrl(PROTOCOL, BASE_URL, formatQuery);
                        if (search) {
                            newUrl += search;
                        }
                        return [4, this.post(__assign({ url: newUrl, data: payload }, opts))];
                    case 9:
                        res = _f.sent();
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
    CloudbaseRequest.prototype.checkFromAuthV2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var oauthInstance, oauthLogin, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        oauthInstance = this._fromApp.oauthInstance || this._fromApp.oauth();
                        _a = oauthInstance;
                        if (!_a) return [3, 2];
                        return [4, oauthInstance.hasLoginState()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        oauthLogin = _a;
                        if (oauthLogin) {
                            return [2, 'oauth'];
                        }
                        return [2, ''];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWJzL3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0wsWUFBWSxFQUNaLFNBQVMsRUFDVCxhQUFhLEVBQ2IsV0FBVyxFQUNYLGVBQWUsRUFDZix1QkFBdUIsRUFDeEIsTUFBTSxxQkFBcUIsQ0FBQztBQVE3QixPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFJdkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLElBQUksQ0FBQztBQUMvQixPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM3QixJQUFBLFVBQVUsR0FBYSxTQUFTLFdBQXRCLEVBQUUsTUFBTSxHQUFLLFNBQVMsT0FBZCxDQUFlO0FBQ2pDLElBQUEsUUFBUSxHQUF3QyxLQUFLLFNBQTdDLEVBQUUsVUFBVSxHQUE0QixLQUFLLFdBQWpDLEVBQUUsU0FBUyxHQUFpQixLQUFLLFVBQXRCLEVBQUUsVUFBVSxHQUFLLEtBQUssV0FBVixDQUFXO0FBQ3RELElBQUEsT0FBTyxHQUFLLFFBQVEsUUFBYixDQUFjO0FBRTdCLE9BQU8sRUFBRSxFQUFFLElBQUksTUFBTSxFQUFFLE1BQU0sTUFBTSxDQUFBO0FBTW5DLElBQU0sMkJBQTJCLEdBQUc7SUFDbEMsYUFBYTtJQUNiLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsd0JBQXdCO0lBQ3hCLGFBQWE7SUFDYix1Q0FBdUM7SUFDdkMsaUNBQWlDO0lBQ2pDLDBCQUEwQjtJQUMxQiw2QkFB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RCxRQUFRLEdBQUcsU0FBNEM7d0JBRTdELElBQUksQ0FBQyxRQUFRLEVBQUU7NEJBSVAsV0FBVyxHQUFHLE1BQU0sRUFBRSxDQUFBOzRCQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUE7NEJBQ25ELFdBQU8sV0FBVyxFQUFBO3lCQUNuQjs2QkFDSTs0QkFDSCxXQUFPLFFBQVEsRUFBQTt5QkFDaEI7Ozs7O0tBQ0Y7SUFFYSwwQ0FBZSxHQUE3Qjs7Ozs7O3dCQUVRLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsSUFBSyxJQUFJLENBQUMsUUFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQTt3QkFNaEUsS0FBQSxhQUFhLENBQUE7aUNBQWIsY0FBYTt3QkFBSSxXQUFNLGFBQWEsQ0FBQyxhQUFhLEVBQUUsRUFBQTs7OEJBQW5DLFNBQW1DOzs7d0JBQWpFLFVBQVUsS0FBdUQ7d0JBQ3ZFLElBQUksVUFBVSxFQUFFOzRCQUNkLFdBQU8sT0FBTyxFQUFBO3lCQUNmO3dCQUNELFdBQU8sRUFBRSxFQUFBOzs7O0tBQ1Y7SUFDSCx1QkFBQztBQUFELENBQUMsQUE5aEJELElBOGhCQzs7QUFFRCxJQUFNLFVBQVUsR0FBeUIsRUFBRSxDQUFDO0FBRTVDLE1BQU0sVUFBVSxXQUFXLENBQUMsTUFBK0I7SUFDekQsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLGdCQUFnQix1QkFDeEMsTUFBTSxLQUNULEtBQUssRUFBRSxJQUFJLElBQ1gsQ0FBQztBQUNMLENBQUM7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsR0FBVztJQUMzQyxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgREFUQV9WRVJTSU9OLFxuICBMT0dJTlRZUEUsXG4gIGdldFNka1ZlcnNpb24sXG4gIGdldEVuZFBvaW50LFxuICBnZXRCYXNlRW5kUG9pbnQsXG4gIE9BVVRIMl9MT0dJTlRZUEVfUFJFRklYXG59IGZyb20gJy4uL2NvbnN0YW50cy9jb21tb24nO1xuaW1wb3J0IHtcbiAgSVJlcXVlc3RPcHRpb25zLFxuICBTREtSZXF1ZXN0SW50ZXJmYWNlLFxuICBSZXNwb25zZU9iamVjdCxcbiAgSVVwbG9hZFJlcXVlc3RPcHRpb25zLFxuICBJUmVxdWVzdENvbmZpZ1xufSBmcm9tICdAY2xvdWRiYXNlL2FkYXB0ZXItaW50ZXJmYWNlJztcbmltcG9ydCB7IHV0aWxzLCBqd3QsIGFkYXB0ZXJzLCBjb25zdGFudHMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBLViwgSUNsb3VkYmFzZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuaW1wb3J0IHsgSUdldEFjY2Vzc1Rva2VuUmVzdWx0LCBJQ2xvdWRiYXNlUmVxdWVzdENvbmZpZywgSUFwcGVuZGVkUmVxdWVzdEluZm8sIElSZXF1ZXN0QmVmb3JlSG9vayB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVxdWVzdCc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ2FjaGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NhY2hlJztcbmltcG9ydCB7IGNsb3VkYmFzZSB9IGZyb20gJy4uJztcbmltcG9ydCB7IGdldENhY2hlQnlFbnZJZCwgZ2V0TG9jYWxDYWNoZSB9IGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IHsgRVZFTlRTIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cyc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vYWRhcHRlcic7XG5jb25zdCB7IGdldFNka05hbWUsIEVSUk9SUyB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyBnZW5TZXFJZCwgaXNGb3JtRGF0YSwgZm9ybWF0VXJsLCBjcmVhdGVTaWduIH0gPSB1dGlscztcbmNvbnN0IHsgUlVOVElNRSB9ID0gYWRhcHRlcnM7XG5cbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnXG5cbi8vIGltcG9ydCBGaW5nZXJwcmludEpTIGZyb20gJ0BmaW5nZXJwcmludGpzL2ZpbmdlcnByaW50anMnXG4vLyBjb25zdCBmcFByb21pc2UgPSBGaW5nZXJwcmludEpTLmxvYWQoKVxuXG4vLyDkuIvpnaLlh6Dnp40gYWN0aW9uIOS4jemcgOimgSBhY2Nlc3MgdG9rZW5cbmNvbnN0IEFDVElPTlNfV0lUSE9VVF9BQ0NFU1NUT0tFTiA9IFtcbiAgJ2F1dGguZ2V0Snd0JyxcbiAgJ2F1dGgubG9nb3V0JyxcbiAgJ2F1dGguc2lnbkluV2l0aFRpY2tldCcsXG4gICdhdXRoLnNpZ25JbkFub255bW91c2x5JyxcbiAgJ2F1dGguc2lnbkluJyxcbiAgJ2F1dGguZmV0Y2hBY2Nlc3NUb2tlbldpdGhSZWZyZXNoVG9rZW4nLFxuICAnYXV0aC5zaWduVXBXaXRoRW1haWxBbmRQYXNzd29yZCcsXG4gICdhdXRoLmFjdGl2YXRlRW5kVXNlck1haWwnLFxuICAnYXV0aC5zZW5kUGFzc3dvcmRSZXNldEVtYWlsJyxcbiAgJ2F1dGgucmVzZXRQYXNzd29yZFdpdGhUb2tlbicsXG4gICdhdXRoLmlzVXNlcm5hbWVSZWdpc3RlcmVkJ1xuXTtcblxuZnVuY3Rpb24gYmluZEhvb2tzKGluc3RhbmNlOiBTREtSZXF1ZXN0SW50ZXJmYWNlLCBuYW1lOiBzdHJpbmcsIGhvb2tzOiBJUmVxdWVzdEJlZm9yZUhvb2tbXSkge1xuICBjb25zdCBvcmlnaW5NZXRob2QgPSBpbnN0YW5jZVtuYW1lXTtcbiAgaW5zdGFuY2VbbmFtZV0gPSBmdW5jdGlvbiAob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKSB7XG4gICAgY29uc3QgZGF0YSA9IHt9O1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcbiAgICBob29rcy5mb3JFYWNoKGhvb2sgPT4ge1xuICAgICAgY29uc3QgeyBkYXRhOiBhcHBlbmRlZERhdGEsIGhlYWRlcnM6IGFwcGVuZGVkSGVhZGVycyB9ID0gaG9vay5jYWxsKGluc3RhbmNlLCBvcHRpb25zKTtcbiAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwgYXBwZW5kZWREYXRhKTtcbiAgICAgIE9iamVjdC5hc3NpZ24oaGVhZGVycywgYXBwZW5kZWRIZWFkZXJzKTtcbiAgICB9KTtcbiAgICBjb25zdCBvcmlnaW5EYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgIG9yaWdpbkRhdGEgJiYgKCgpID0+IHtcbiAgICAgIGlmIChpc0Zvcm1EYXRhKG9yaWdpbkRhdGEpKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAob3JpZ2luRGF0YSBhcyBGb3JtRGF0YSkuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBvcHRpb25zLmRhdGEgPSB7XG4gICAgICAgIC4uLm9yaWdpbkRhdGEsXG4gICAgICAgIC4uLmRhdGFcbiAgICAgIH07XG4gICAgfSkoKTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB7XG4gICAgICAuLi4ob3B0aW9ucy5oZWFkZXJzIHx8IHt9KSxcbiAgICAgIC4uLmhlYWRlcnNcbiAgICB9O1xuICAgIHJldHVybiAob3JpZ2luTWV0aG9kIGFzIEZ1bmN0aW9uKS5jYWxsKGluc3RhbmNlLCBvcHRpb25zKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGJlZm9yZUVhY2goKTogSUFwcGVuZGVkUmVxdWVzdEluZm8ge1xuICBjb25zdCBzZXFJZCA9IGdlblNlcUlkKCk7XG4gIHJldHVybiB7XG4gICAgZGF0YToge1xuICAgICAgc2VxSWRcbiAgICB9LFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdYLVNESy1WZXJzaW9uJzogYEBjbG91ZGJhc2UvanMtc2RrLyR7Z2V0U2RrVmVyc2lvbigpfWAsXG4gICAgICAneC1zZXFpZCc6IHNlcUlkXG4gICAgfVxuICB9O1xufVxuZXhwb3J0IGludGVyZmFjZSBJQ2xvdWRiYXNlUmVxdWVzdCB7XG4gIGZldGNoOiAodXJsT3JQYXRoOiBzdHJpbmcsIGluaXQ/OiBSZXF1ZXN0SW5pdCkgPT4gUHJvbWlzZTxSZXNwb25zZT47XG4gIHBvc3Q6IChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpID0+IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+O1xuICB1cGxvYWQ6IChvcHRpb25zOiBJVXBsb2FkUmVxdWVzdE9wdGlvbnMpID0+IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+O1xuICBkb3dubG9hZDogKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucykgPT4gUHJvbWlzZTxSZXNwb25zZU9iamVjdD47XG4gIHJlZnJlc2hBY2Nlc3NUb2tlbjogKCkgPT4gUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+O1xuICBnZXRBY2Nlc3NUb2tlbjogKCkgPT4gUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+O1xuICByZXF1ZXN0OiAoYWN0aW9uOiBzdHJpbmcsIHBhcmFtczogS1Y8YW55Piwgb3B0aW9ucz86IEtWPGFueT4pID0+IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+O1xuICBzZW5kOiAoYWN0aW9uOiBzdHJpbmcsIGRhdGE6IEtWPGFueT4pID0+IFByb21pc2U8YW55Pjtcbn1cblxuLyoqXG4gKiBAY2xhc3MgQ2xvdWRiYXNlUmVxdWVzdFxuICovXG5leHBvcnQgY2xhc3MgQ2xvdWRiYXNlUmVxdWVzdCBpbXBsZW1lbnRzIElDbG91ZGJhc2VSZXF1ZXN0IHtcbiAgY29uZmlnOiBJQ2xvdWRiYXNlUmVxdWVzdENvbmZpZztcbiAgX3Nob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbkhvb2s6IEZ1bmN0aW9uXG4gIF9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4gfCBudWxsXG4gIF9yZXFDbGFzczogU0RLUmVxdWVzdEludGVyZmFjZTtcbiAgLy8g6K+35rGC5aSx6LSl5piv5ZCm5oqb5Ye6RXJyb3JcbiAgcHJpdmF0ZSBfdGhyb3dXaGVuUmVxdWVzdEZhaWwgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcbiAgLy8g5oyB5LmF5YyW5pys5Zyw5a2Y5YKoXG4gIHByaXZhdGUgX2xvY2FsQ2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcbiAgcHJpdmF0ZSBfZnJvbUFwcDogSUNsb3VkYmFzZVxuICAvKipcbiAgICog5Yid5aeL5YyWXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSUNsb3VkYmFzZVJlcXVlc3RDb25maWcgJiB7IHRocm93PzogYm9vbGVhbiB9KSB7XG4gICAgY29uc3QgeyBfZnJvbUFwcCB9ID0gY29uZmlnO1xuXG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgdGhpcy5fZnJvbUFwcCA9IF9mcm9tQXBwXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgdGhpcy5fcmVxQ2xhc3MgPSBuZXcgUGxhdGZvcm0uYWRhcHRlci5yZXFDbGFzcyg8SVJlcXVlc3RDb25maWc+e1xuICAgICAgdGltZW91dDogdGhpcy5jb25maWcudGltZW91dCxcbiAgICAgIHRpbWVvdXRNc2c6IGBbQGNsb3VkYmFzZS9qcy1zZGtdIOivt+axguWcqCR7dGhpcy5jb25maWcudGltZW91dCAvIDEwMDB9c+WGheacquWujOaIkO+8jOW3suS4reaWrWAsXG4gICAgICByZXN0cmljdGVkTWV0aG9kczogWydwb3N0J11cbiAgICB9KTtcbiAgICB0aGlzLl90aHJvd1doZW5SZXF1ZXN0RmFpbCA9IGNvbmZpZy50aHJvdyB8fCBmYWxzZTtcbiAgICB0aGlzLl9jYWNoZSA9IGdldENhY2hlQnlFbnZJZCh0aGlzLmNvbmZpZy5lbnYpO1xuICAgIHRoaXMuX2xvY2FsQ2FjaGUgPSBnZXRMb2NhbENhY2hlKHRoaXMuY29uZmlnLmVudik7XG4gICAgYmluZEhvb2tzKHRoaXMuX3JlcUNsYXNzLCAncG9zdCcsIFtiZWZvcmVFYWNoXSk7XG4gICAgYmluZEhvb2tzKHRoaXMuX3JlcUNsYXNzLCAndXBsb2FkJywgW2JlZm9yZUVhY2hdKTtcbiAgICBiaW5kSG9va3ModGhpcy5fcmVxQ2xhc3MsICdkb3dubG9hZCcsIFtiZWZvcmVFYWNoXSk7XG4gIH1cblxuICAvKipcbiAgICog5aWX5LiA5bGCIGZldGNo77yM5pa55L6/5aSE55CG6K+35rGC5Zyw5Z2AXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgIHVybE9yUGF0aFxuICAgKiBAcGFyYW0ge1JlcXVlc3RJbml0fSBpbml0XG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmV0Y2godXJsT3JQYXRoOiBzdHJpbmcsIGluaXQ/OiBSZXF1ZXN0SW5pdCk6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgICBjb25zdCBkZXZpY2VJZCA9IGF3YWl0IHRoaXMuZ2V0RGV2aWNlSWQoKTtcblxuICAgIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgICAnWC1Qcm9qZWN0LUlkJzogdGhpcy5jb25maWcuZW52LFxuICAgICAgJ1gtU0RLLVZlcnNpb24nOiBgQGNsb3VkYmFzZS9qcy1zZGsvJHtnZXRTZGtWZXJzaW9uKCl9YCxcbiAgICAgICdYLVJlcXVlc3QtSWQnOiBnZW5TZXFJZCgpLFxuICAgICAgJ1gtUmVxdWVzdC1UaW1lc3RhbXAnOiBEYXRlLm5vdygpLFxuICAgICAgJ1gtRGV2aWNlLUlkJzogZGV2aWNlSWRcbiAgICB9XG4gICAgLy8g6Z2ed2Vi5bmz5Y+w5L2/55So5Yet6K+B5qOA6aqM5pyJ5pWI5oCnXG4gICAgaWYgKFBsYXRmb3JtLnJ1bnRpbWUgIT09IFJVTlRJTUUuV0VCKSB7XG4gICAgICBjb25zdCB7IGFwcFNpZ24sIGFwcFNlY3JldCB9ID0gdGhpcy5jb25maWdcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KClcbiAgICAgIGNvbnN0IHsgYXBwQWNjZXNzS2V5LCBhcHBBY2Nlc3NLZXlJZCB9ID0gYXBwU2VjcmV0XG4gICAgICBjb25zdCBzaWduID0gY3JlYXRlU2lnbih7XG4gICAgICAgIC8vIGRhdGE6IGluaXQuYm9keSxcbiAgICAgICAgZGF0YToge30sXG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgYXBwQWNjZXNzS2V5SWQsXG4gICAgICAgIGFwcFNpZ25cbiAgICAgIH0sIGFwcEFjY2Vzc0tleSlcblxuICAgICAgaGVhZGVyc1snWC1UQ0ItQXBwLVNvdXJjZSddID0gYHRpbWVzdGFtcD0ke3RpbWVzdGFtcH07YXBwQWNjZXNzS2V5SWQ9JHthcHBBY2Nlc3NLZXlJZH07YXBwU2lnbj0ke2FwcFNpZ259O3NpZ249JHtzaWdufWBcbiAgICB9XG5cbiAgICBpbml0LmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCBpbml0LmhlYWRlcnMsIGhlYWRlcnMpXG5cbiAgICBjb25zdCB1cmwgPSB1cmxPclBhdGguc3RhcnRzV2l0aCgnaHR0cCcpXG4gICAgICA/IHVybE9yUGF0aFxuICAgICAgOiBgJHtnZXRCYXNlRW5kUG9pbnQoKX0ke3VybE9yUGF0aH1gXG4gICAgcmV0dXJuIGF3YWl0IGZldGNoKHVybCwgaW5pdClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwb3N0KG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXFDbGFzcy5wb3N0KG9wdGlvbnMpO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgcHVibGljIGFzeW5jIHVwbG9hZChvcHRpb25zOiBJVXBsb2FkUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxQ2xhc3MudXBsb2FkKG9wdGlvbnMpO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgcHVibGljIGFzeW5jIGRvd25sb2FkKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXFDbGFzcy5kb3dubG9hZChvcHRpb25zKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlZnJlc2hBY2Nlc3NUb2tlbigpOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4ge1xuICAgIC8vIOWPr+iDveS8muWQjOaXtuiwg+eUqOWkmuasoeWIt+aWsGFjY2VzcyB0b2tlbu+8jOi/memHjOaKiuWug+S7rOWQiOW5tuaIkOS4gOS4qlxuICAgIGlmICghdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZSkge1xuICAgICAgLy8g5rKh5pyJ5q2j5Zyo5Yi35paw77yM6YKj5LmI5q2j5bi45omn6KGM5Yi35paw6YC76L6RXG4gICAgICB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlID0gdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuKCk7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdDtcbiAgICBsZXQgZXJyO1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGVyciA9IGU7XG4gICAgfVxuICAgIHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UgPSBudWxsO1xuICAgIHRoaXMuX3Nob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbkhvb2sgPSBudWxsO1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZWZyZXNoQWNjZXNzVG9rZW5Gcm9tT2F1dGhTZXJ2ZXIoY2xpZW50SWQ6IHN0cmluZyk6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB7XG4gICAgLy8g5Y+v6IO95Lya5ZCM5pe26LCD55So5aSa5qyh5Yi35pawIGFjY2VzcyB0b2tlbu+8jOi/memHjOaKiuWug+S7rOWQiOW5tuaIkOS4gOS4qlxuICAgIGlmICghdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZSkge1xuICAgICAgLy8g5rKh5pyJ5q2j5Zyo5Yi35paw77yM6YKj5LmI5q2j5bi45omn6KGM5Yi35paw6YC76L6RXG4gICAgICB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlID0gdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuRnJvbU9hdXRoU2VydmVyKGNsaWVudElkKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0O1xuICAgIGxldCBlcnI7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZXJyID0gZTtcbiAgICB9XG4gICAgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZSA9IG51bGw7XG4gICAgdGhpcy5fc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuSG9vayA9IG51bGw7XG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8g6I635Y+WIE9BdXRoIGFjY2Vzc3Rva2VuXG4gIHB1YmxpYyBhc3luYyBnZXRPYXV0aEFjY2Vzc1Rva2VuKCk6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB7XG4gICAgY29uc3QgeyBvYXV0aENsaWVudCB9ID0gdGhpcy5jb25maWdcbiAgICBpZiAob2F1dGhDbGllbnQpIHtcbiAgICAgIC8vIGNvbnN0IHZhbGlkQWNjZXNzVG9rZW4gPSBhd2FpdCBvYXV0aENsaWVudC5nZXRBY2Nlc3NUb2tlbigpXG4gICAgICAvLyBjb25zdCBjcmVkZW50aWFscyA9IGF3YWl0IG9hdXRoQ2xpZW50Ll9nZXRDcmVkZW50aWFscygpXG4gICAgICAvLyByZXR1cm4ge1xuICAgICAgLy8gICBhY2Nlc3NUb2tlbjogdmFsaWRBY2Nlc3NUb2tlbixcbiAgICAgIC8vICAgYWNjZXNzVG9rZW5FeHBpcmU6IG5ldyBEYXRlKGNyZWRlbnRpYWxzLmV4cGlyZXNfYXQpLmdldFRpbWUoKVxuICAgICAgLy8gfVxuICAgICAgcmV0dXJuIHRoaXMuZ2V0T2F1dGhBY2Nlc3NUb2tlblYyKG9hdXRoQ2xpZW50KVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRPYXV0aEFjY2Vzc1Rva2VuVjIob2F1dGhDbGllbnQ6IGFueSk6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB7XG4gICAgY29uc3QgdmFsaWRBY2Nlc3NUb2tlbiA9IGF3YWl0IG9hdXRoQ2xpZW50LmdldEFjY2Vzc1Rva2VuKClcbiAgICBjb25zdCBjcmVkZW50aWFscyA9IGF3YWl0IG9hdXRoQ2xpZW50Ll9nZXRDcmVkZW50aWFscygpXG4gICAgcmV0dXJuIHtcbiAgICAgIGFjY2Vzc1Rva2VuOiB2YWxpZEFjY2Vzc1Rva2VuLFxuICAgICAgYWNjZXNzVG9rZW5FeHBpcmU6IG5ldyBEYXRlKGNyZWRlbnRpYWxzLmV4cGlyZXNfYXQpLmdldFRpbWUoKVxuICAgIH1cbiAgfVxuXG4gIC8vIOiOt+WPliBhY2Nlc3MgdG9rZW5cbiAgcHVibGljIGFzeW5jIGdldEFjY2Vzc1Rva2VuKCk6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB7XG4gICAgY29uc3QgeyBsb2dpblR5cGVLZXksIGFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbkV4cGlyZUtleSwgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IGxvZ2luVHlwZSA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMobG9naW5UeXBlS2V5KTtcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgaWYgKCFyZWZyZXNoVG9rZW4pIHtcbiAgICAgIC8vIOS4jeivpeWHuueOsOeahOeKtuaAge+8muaciSBhY2Nlc3MgdG9rZW4g5Y205rKh5pyJIHJlZnJlc2ggdG9rZW5cbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5PUEVSQVRJT05fRkFJTCxcbiAgICAgICAgbXNnOiAncmVmcmVzaCB0b2tlbiBpcyBub3QgZXhpc3QsIHlvdXIgbG9jYWwgZGF0YSBtaWdodCBiZSBtZXNzZWQgdXAsIHBsZWFzZSByZXRyeSBhZnRlciBjbGVhciBsb2NhbFN0b3JhZ2Ugb3Igc2Vzc2lvblN0b3JhZ2UnXG4gICAgICB9KSk7XG4gICAgfVxuICAgIC8vIOWmguaenOayoeaciWFjY2VzcyB0b2tlbuaIluiAhei/h+acn++8jOmCo+S5iOWIt+aWsFxuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW5FeHBpcmUgPSBOdW1iZXIoYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSkpO1xuXG4gICAgLy8g6LCD55So6ZKp5a2Q5Ye95pWwXG4gICAgbGV0IHNob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbiA9IHRydWU7XG4gICAgaWYgKHRoaXMuX3Nob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbkhvb2sgJiYgIShhd2FpdCB0aGlzLl9zaG91bGRSZWZyZXNoQWNjZXNzVG9rZW5Ib29rKGFjY2Vzc1Rva2VuLCBhY2Nlc3NUb2tlbkV4cGlyZSkpKSB7XG4gICAgICBzaG91bGRSZWZyZXNoQWNjZXNzVG9rZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoKCFhY2Nlc3NUb2tlbiB8fCAhYWNjZXNzVG9rZW5FeHBpcmUgfHwgYWNjZXNzVG9rZW5FeHBpcmUgPCBEYXRlLm5vdygpKSAmJiBzaG91bGRSZWZyZXNoQWNjZXNzVG9rZW4pIHtcbiAgICAgIGlmIChsb2dpblR5cGUuc3RhcnRzV2l0aChPQVVUSDJfTE9HSU5UWVBFX1BSRUZJWCkpIHtcbiAgICAgICAgLy8gTk9URTog6L+Z6YeM6ZyA6KaB5LuOIGFjY2Vzc1Rva2VuIOino+WHuuadpemDqOWIhuS/oeaBr++8jOeUqOS6juWIt+aWsCBhY2Nlc3NUb2tlblxuICAgICAgICAvLyDmiYDku6Xov4fmnJ/nmoQgYWNjZXNzVG9rZW4g5LiN6IO95Yig6Zmk77yM6ICM5piv55So5pawIGFjY2Vzc1Rva2VuIOimhuebllxuICAgICAgICBpZiAoYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgICBsZXQgaGVhZGVyID0gbnVsbFxuICAgICAgICAgIGxldCBwYXlsb2FkID0gbnVsbFxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBoZWFkZXIgPSBqd3QuZGVjb2RlKGFjY2Vzc1Rva2VuLCB7IGhlYWRlcjogdHJ1ZSB9KVxuICAgICAgICAgICAgcGF5bG9hZCA9IGp3dC5kZWNvZGUoYWNjZXNzVG9rZW4pXG4gICAgICAgICAgfVxuICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFtERUNPREVfQUNDRVNTX1RPS0VOX0VSUk9SXSAke2UubWVzc2FnZX0sIGFjY2Vzc3Rva2VuOiAke2FjY2Vzc1Rva2VufWApXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoZWFkZXI/LmtpZCAmJiBwYXlsb2FkPy5wcm9qZWN0X2lkKSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZWZyZXNoQWNjZXNzVG9rZW5Gcm9tT2F1dGhTZXJ2ZXIocGF5bG9hZD8ucHJvamVjdF9pZClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgLy8g6L+Z6YeM55SoIGVudiDor5XkuIDkuItcbiAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZWZyZXNoQWNjZXNzVG9rZW5Gcm9tT2F1dGhTZXJ2ZXIodGhpcy5jb25maWcuZW52KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVmcmVzaEFjY2Vzc1Rva2VuKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOi/lOWbnuacrOWcsOeahGFjY2VzcyB0b2tlblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWNjZXNzVG9rZW4sXG4gICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbiAgcHVibGljIGFzeW5jIHJlcXVlc3QoYWN0aW9uOiBzdHJpbmcsIHBhcmFtczogS1Y8YW55Piwgb3B0aW9ucz86IEtWPGFueT4pOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgeyBvYXV0aENsaWVudCB9ID0gdGhpcy5jb25maWdcbiAgICBjb25zdCB0Y2JUcmFjZUtleSA9IGB4LXRjYi10cmFjZV8ke3RoaXMuY29uZmlnLmVudn1gO1xuICAgIGxldCBjb250ZW50VHlwZSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnO1xuICAgIC8vIGNvbnN0IHdlYkRldmljZUlkID0gYXdhaXQgZ2V0VGNiRmluZ2VycHJpbnRJZCgpO1xuICAgIGNvbnN0IHRtcE9iajogS1Y8YW55PiA9IHtcbiAgICAgIGFjdGlvbixcbiAgICAgIC8vIHdlYkRldmljZUlkLFxuICAgICAgZGF0YVZlcnNpb246IERBVEFfVkVSU0lPTixcbiAgICAgIGVudjogdGhpcy5jb25maWcuZW52LFxuICAgICAgLi4ucGFyYW1zXG4gICAgfTtcblxuICAgIC8vIOiLpeivhuWIq+WIsOazqOWGjOS6hiBPYXV0aCDmqKHlnZfvvIzliJnkvb/nlKhvYXV0aCBnZXRBY2Nlc3NUb2tlblxuICAgIGlmIChvYXV0aENsaWVudCkge1xuICAgICAgdG1wT2JqLmFjY2Vzc190b2tlbiA9IChhd2FpdCB0aGlzLmdldE9hdXRoQWNjZXNzVG9rZW4oKSkuYWNjZXNzVG9rZW5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8g6K+G5Yir5b2T5YmN55m75b2V5oCBIOaYr+WQpuS4uiBvYXV0aFxuICAgICAgY29uc3QgbG9naW5GbGFnID0gYXdhaXQgdGhpcy5jaGVja0Zyb21BdXRoVjIoKVxuICAgICAgLy8gY29uc29sZS5sb2coJ2xvZ2luRmxhZycsIGxvZ2luRmxhZylcbiAgICAgIGlmIChsb2dpbkZsYWcgPT09ICdvYXV0aCcpIHtcbiAgICAgICAgY29uc3QgYXBwID0gdGhpcy5jb25maWcuX2Zyb21BcHBcbiAgICAgICAgY29uc3Qgb2F1dGhDbGllbnQgPSBhcHAub2F1dGhJbnN0YW5jZS5vYXV0aDJjbGllbnRcbiAgICAgICAgdG1wT2JqLmFjY2Vzc190b2tlbiA9IChhd2FpdCB0aGlzLmdldE9hdXRoQWNjZXNzVG9rZW5WMihvYXV0aENsaWVudCkpLmFjY2Vzc1Rva2VuXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKEFDVElPTlNfV0lUSE9VVF9BQ0NFU1NUT0tFTi5pbmRleE9mKGFjdGlvbikgPT09IC0xKSB7XG4gICAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcblxuICAgICAgLy8g6Iul5pyJIHJlZnJlc2hUb2tlbiDliJnku7vliqHmnInnmbvlvZXmgIEg5Yi3IGFjY2Vzc1Rva2VuXG4gICAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgICBpZiAocmVmcmVzaFRva2VuKSB7XG4gICAgICAgIHRtcE9iai5hY2Nlc3NfdG9rZW4gPSAoYXdhaXQgdGhpcy5nZXRBY2Nlc3NUb2tlbigpKS5hY2Nlc3NUb2tlbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDmi7xib2R55ZKMY29udGVudC10eXBlXG4gICAgbGV0IHBheWxvYWQ7XG4gICAgaWYgKGFjdGlvbiA9PT0gJ3N0b3JhZ2UudXBsb2FkRmlsZScpIHtcbiAgICAgIHBheWxvYWQgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgIGZvciAobGV0IGtleSBpbiBwYXlsb2FkKSB7XG4gICAgICAgIGlmIChwYXlsb2FkLmhhc093blByb3BlcnR5KGtleSkgJiYgcGF5bG9hZFtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBwYXlsb2FkLmFwcGVuZChrZXksIHRtcE9ialtrZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29udGVudFR5cGUgPSAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRlbnRUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCc7XG4gICAgICBwYXlsb2FkID0ge307XG4gICAgICBmb3IgKGxldCBrZXkgaW4gdG1wT2JqKSB7XG4gICAgICAgIGlmICh0bXBPYmpba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcGF5bG9hZFtrZXldID0gdG1wT2JqW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IG9wdHM6IGFueSA9IHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6IGNvbnRlbnRUeXBlXG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAob3B0aW9ucz8uWydvblVwbG9hZFByb2dyZXNzJ10pIHtcbiAgICAgIG9wdHMub25VcGxvYWRQcm9ncmVzcyA9IG9wdGlvbnNbJ29uVXBsb2FkUHJvZ3Jlc3MnXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcucmVnaW9uKSB7XG4gICAgICBvcHRzLmhlYWRlcnNbJ1gtVENCLVJlZ2lvbiddID0gdGhpcy5jb25maWcucmVnaW9uO1xuICAgIH1cblxuICAgIGNvbnN0IHRyYWNlSGVhZGVyID0gdGhpcy5fbG9jYWxDYWNoZS5nZXRTdG9yZSh0Y2JUcmFjZUtleSk7XG4gICAgaWYgKHRyYWNlSGVhZGVyKSB7XG4gICAgICBvcHRzLmhlYWRlcnNbJ1gtVENCLVRyYWNlJ10gPSB0cmFjZUhlYWRlcjtcbiAgICB9XG4gICAgLy8g6Z2ed2Vi5bmz5Y+w5L2/55So5Yet6K+B5qOA6aqM5pyJ5pWI5oCnXG4gICAgaWYgKFBsYXRmb3JtLnJ1bnRpbWUgIT09IFJVTlRJTUUuV0VCKSB7XG4gICAgICBjb25zdCB7IGFwcFNpZ24sIGFwcFNlY3JldCB9ID0gdGhpcy5jb25maWc7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgeyBhcHBBY2Nlc3NLZXksIGFwcEFjY2Vzc0tleUlkIH0gPSBhcHBTZWNyZXQ7XG4gICAgICBjb25zdCBzaWduID0gY3JlYXRlU2lnbih7XG4gICAgICAgIGRhdGE6IHt9LCAvLyDmoKHpqoznrb7lkI3mtYHnqIvlrp7pmYXmnKrnlKjliLDvvIzlj6/orr7nqbpcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICBhcHBBY2Nlc3NLZXlJZCxcbiAgICAgICAgYXBwU2lnblxuICAgICAgfSwgYXBwQWNjZXNzS2V5KTtcblxuICAgICAgb3B0cy5oZWFkZXJzWydYLVRDQi1BcHAtU291cmNlJ10gPSBgdGltZXN0YW1wPSR7dGltZXN0YW1wfTthcHBBY2Nlc3NLZXlJZD0ke2FwcEFjY2Vzc0tleUlkfTthcHBTaWduPSR7YXBwU2lnbn07c2lnbj0ke3NpZ259YDtcbiAgICB9XG5cbiAgICAvLyDlj5Hlh7ror7fmsYJcbiAgICAvLyDmlrDnmoQgdXJsIOmcgOimgeaQuuW4piBlbnYg5Y+C5pWw6L+b6KGMIENPUlMg5qCh6aqMXG4gICAgLy8g6K+35rGC6ZO+5o6l5pSv5oyB5re75Yqg5Yqo5oCBIHF1ZXJ5IOWPguaVsO+8jOaWueS+v+eUqOaIt+iwg+ivleWumuS9jeivt+axglxuICAgIGNvbnN0IHsgcGFyc2UsIGluUXVlcnksIHNlYXJjaCB9ID0gcGFyYW1zO1xuICAgIGxldCBmb3JtYXRRdWVyeTogUmVjb3JkPHN0cmluZywgYW55PiA9IHtcbiAgICAgIGVudjogdGhpcy5jb25maWcuZW52XG4gICAgfTtcbiAgICAvLyDlsJ3or5Xop6PmnpDlk43lupTmlbDmja7kuLogSlNPTlxuICAgIHBhcnNlICYmIChmb3JtYXRRdWVyeS5wYXJzZSA9IHRydWUpO1xuICAgIGluUXVlcnkgJiYgKGZvcm1hdFF1ZXJ5ID0ge1xuICAgICAgLi4uaW5RdWVyeSxcbiAgICAgIC4uLmZvcm1hdFF1ZXJ5XG4gICAgfSk7XG4gICAgY29uc3QgeyBCQVNFX1VSTCwgUFJPVE9DT0wgfSA9IGdldEVuZFBvaW50KCk7XG4gICAgLy8g55Sf5oiQ6K+35rGCIHVybFxuICAgIGxldCBuZXdVcmwgPSBmb3JtYXRVcmwoUFJPVE9DT0wsIEJBU0VfVVJMLCBmb3JtYXRRdWVyeSk7XG5cbiAgICBpZiAoc2VhcmNoKSB7XG4gICAgICBuZXdVcmwgKz0gc2VhcmNoO1xuICAgIH1cblxuICAgIGNvbnN0IHJlczogUmVzcG9uc2VPYmplY3QgPSBhd2FpdCB0aGlzLnBvc3Qoe1xuICAgICAgdXJsOiBuZXdVcmwsXG4gICAgICBkYXRhOiBwYXlsb2FkLFxuICAgICAgLi4ub3B0c1xuICAgIH0pO1xuXG4gICAgLy8g5L+d5a2YIHRyYWNlIGhlYWRlclxuICAgIGNvbnN0IHJlc1RyYWNlSGVhZGVyID0gcmVzLmhlYWRlciAmJiByZXMuaGVhZGVyWyd4LXRjYi10cmFjZSddO1xuICAgIGlmIChyZXNUcmFjZUhlYWRlcikge1xuICAgICAgdGhpcy5fbG9jYWxDYWNoZS5zZXRTdG9yZSh0Y2JUcmFjZUtleSwgcmVzVHJhY2VIZWFkZXIpO1xuICAgIH1cblxuICAgIGlmICgoTnVtYmVyKHJlcy5zdGF0dXMpICE9PSAyMDAgJiYgTnVtYmVyKHJlcy5zdGF0dXNDb2RlKSAhPT0gMjAwKSB8fCAhcmVzLmRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbmV0d29yayByZXF1ZXN0IGVycm9yJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZW5kKGFjdGlvbjogc3RyaW5nLCBkYXRhOiBLVjxhbnk+ID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdChhY3Rpb24sIGRhdGEsIHsgb25VcGxvYWRQcm9ncmVzczogZGF0YS5vblVwbG9hZFByb2dyZXNzIH0pO1xuICAgIGlmIChyZXNwb25zZS5kYXRhLmNvZGUgPT09ICdBQ0NFU1NfVE9LRU5fRVhQSVJFRCcgJiYgQUNUSU9OU19XSVRIT1VUX0FDQ0VTU1RPS0VOLmluZGV4T2YoYWN0aW9uKSA9PT0gLTEpIHtcbiAgICAgIC8vIGFjY2Vzc190b2tlbui/h+acn++8jOmHjeaWsOiOt+WPllxuICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoQWNjZXNzVG9rZW4oKTtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0KGFjdGlvbiwgZGF0YSwgeyBvblVwbG9hZFByb2dyZXNzOiBkYXRhLm9uVXBsb2FkUHJvZ3Jlc3MgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlc3BvbnNlLmRhdGEuY29kZSAmJiB0aGlzLl90aHJvd1doZW5SZXF1ZXN0RmFpbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLk9QRVJBVElPTl9GQUlMLFxuICAgICAgICBtc2c6IGBbJHtyZXNwb25zZS5kYXRhLmNvZGV9XSAke3Jlc3BvbnNlLmRhdGEubWVzc2FnZX1gXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gIH1cblxuICAvLyDosIPnlKjmjqXlj6PliLfmlrBhY2Nlc3MgdG9rZW7vvIzlubbkuJTov5Tlm55cbiAgcHJpdmF0ZSBhc3luYyBfcmVmcmVzaEFjY2Vzc1Rva2VuKHJldHJ5TnVtID0gMSk6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXksIHJlZnJlc2hUb2tlbktleSwgbG9naW5UeXBlS2V5LCBhbm9ueW1vdXNVdWlkS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpO1xuXG4gICAgbGV0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZiAoIXJlZnJlc2hUb2tlbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLFxuICAgICAgICBtc2c6ICdub3QgbG9naW4nXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGNvbnN0IHBhcmFtczogS1Y8c3RyaW5nPiA9IHtcbiAgICAgIHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlblxuICAgIH07XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QoJ2F1dGguZmV0Y2hBY2Nlc3NUb2tlbldpdGhSZWZyZXNoVG9rZW4nLCBwYXJhbXMpO1xuICAgIGlmIChyZXNwb25zZS5kYXRhLmNvZGUpIHtcbiAgICAgIGNvbnN0IHsgY29kZSB9ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIGlmIChjb2RlID09PSAnU0lHTl9QQVJBTV9JTlZBTElEJyB8fCBjb2RlID09PSAnUkVGUkVTSF9UT0tFTl9FWFBJUkVEJyB8fCBjb2RlID09PSAnSU5WQUxJRF9SRUZSRVNIX1RPS0VOJykge1xuICAgICAgICAvLyDov5nph4zlpITnkIbku6XkuIvpgLvovpHvvJpcbiAgICAgICAgLy8g5Yy/5ZCN55m75b2V5pe277yM5aaC5p6c5Yi35pawYWNjZXNzIHRva2Vu5oql6ZSZcmVmcmVzaCB0b2tlbui/h+acn++8jOatpOaXtuW6lOivpe+8mlxuICAgICAgICAvLyAxLiDlho3nlKggdXVpZCDmi7/kuIDmrKHmlrDnmoRyZWZyZXNoIHRva2VuXG4gICAgICAgIC8vIDIuIOaLv+aWsOeahHJlZnJlc2ggdG9rZW7mjaJhY2Nlc3MgdG9rZW5cbiAgICAgICAgY29uc3QgaXNBbm9ueW1vdXMgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGxvZ2luVHlwZUtleSkgPT09IExPR0lOVFlQRS5BTk9OWU1PVVM7XG4gICAgICAgIGlmIChpc0Fub255bW91cyAmJiBjb2RlID09PSAnSU5WQUxJRF9SRUZSRVNIX1RPS0VOJykge1xuICAgICAgICAgIC8vIOiOt+WPluaWsOeahCByZWZyZXNoIHRva2VuXG4gICAgICAgICAgY29uc3QgYW5vbnltb3VzX3V1aWQgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFub255bW91c1V1aWRLZXkpO1xuICAgICAgICAgIC8vIOatpOWkhGNhY2hl5Li65Z+657G7cHJvcGVydHlcbiAgICAgICAgICBjb25zdCByZWZyZXNoX3Rva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuc2VuZCgnYXV0aC5zaWduSW5Bbm9ueW1vdXNseScsIHtcbiAgICAgICAgICAgIGFub255bW91c191dWlkLFxuICAgICAgICAgICAgcmVmcmVzaF90b2tlblxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuX3NldFJlZnJlc2hUb2tlbihyZXMucmVmcmVzaF90b2tlbik7XG4gICAgICAgICAgaWYgKHJldHJ5TnVtID49IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW4oLS1yZXRyeU51bSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIGNvZGU6IEVSUk9SUy5PUEVSQVRJT05fRkFJTCxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAn6YeN6K+V6I635Y+WIHJlZnJlc2ggdG9rZW4g5aSx6LSlJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjbG91ZGJhc2UuZmlyZShFVkVOVFMuTE9HSU5fU1RBVEVfRVhQSVJFRCk7XG4gICAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5ORVRXT1JLX0VSUk9SLFxuICAgICAgICBtc2c6IGByZWZyZXNoIGFjY2Vzc190b2tlbiBmYWlsZWTvvJoke3Jlc3BvbnNlLmRhdGEuY29kZX1gXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmIChyZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbikge1xuICAgICAgY2xvdWRiYXNlLmZpcmUoRVZFTlRTLkFDQ0VTU19UT0tFTl9SRUZSRVNIRCk7XG4gICAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5LCByZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbik7XG4gICAgICAvLyDmnKzlnLDml7bpl7Tlj6/og73msqHmnInlkIzmraVcbiAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXksIHJlc3BvbnNlLmRhdGEuYWNjZXNzX3Rva2VuX2V4cGlyZSArIERhdGUubm93KCkpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWNjZXNzVG9rZW46IHJlc3BvbnNlLmRhdGEuYWNjZXNzX3Rva2VuLFxuICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyZTogcmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW5fZXhwaXJlXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyDljL/lkI3nmbvlvZVyZWZyZXNoX3Rva2Vu6L+H5pyf5oOF5Ya15LiL6L+U5ZuecmVmcmVzaF90b2tlblxuICAgIC8vIOatpOWcuuaZr+S4i+S9v+eUqOaWsOeahHJlZnJlc2hfdG9rZW7ojrflj5ZhY2Nlc3NfdG9rZW5cbiAgICBpZiAocmVzcG9uc2UuZGF0YS5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICBhd2FpdCB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSwgcmVzcG9uc2UuZGF0YS5yZWZyZXNoX3Rva2VuKTtcbiAgICAgIGF3YWl0IHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2ZldGNoQWNjZXNzVG9rZW5Gcm9tT2F1dGhTZXJ2ZXIocmVmcmVzaFRva2VuOiBzdHJpbmcsIGNsaWVudElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCByZXNwID0gYXdhaXQgdGhpcy5mZXRjaCgnL2F1dGgvdjEvdG9rZW4nLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgZ3JhbnRfdHlwZTogJ3JlZnJlc2hfdG9rZW4nLFxuICAgICAgICBjbGllbnRfaWQ6IGNsaWVudElkLFxuICAgICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW5cbiAgICAgIH0pXG4gICAgfSlcbiAgICAvLyBSZXNwOlxuICAgIC8vIHtcbiAgICAvLyAgIFwidG9rZW5fdHlwZVwiOiBcIkJlYXJlclwiLFxuICAgIC8vICAgXCJhY2Nlc3NfdG9rZW5cIjogXCJcIixcbiAgICAvLyAgIFwicmVmcmVzaF90b2tlblwiOlwiXCIsXG4gICAgLy8gICBcImV4cGlyZXNfaW5cIjogMjU5MjAwLFxuICAgIC8vICAgXCJzdWJcIjogXCJcIlxuICAgIC8vIH1cbiAgICAvLyDku6XkuIvku6PnoIHph43lpI1cbiAgICBjb25zdCBzZXFJZEZyb21IZWFkZXIgPSByZXNwLmhlYWRlcnMuZ2V0KCdTZXFJZCcpIHx8IHJlc3AuaGVhZGVycy5nZXQoJ1JlcXVlc3RJZCcpXG4gICAgaWYgKHJlc3Auc3RhdHVzID49IDQwMCAmJiByZXNwLnN0YXR1cyA8IDUwMCkge1xuICAgICAgY29uc3QgYm9keTogYW55ID0gYXdhaXQgcmVzcC5qc29uKClcbiAgICAgIGNvbnN0IHNlcUlkID0gYm9keS5yZXF1ZXN0X2lkIHx8IHNlcUlkRnJvbUhlYWRlclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHtnZXRTZGtOYW1lKCl9LyR7Z2V0U2RrVmVyc2lvbigpfV1bT0F1dGgyQXV0aFByb3ZpZGVyXVtzdGF0dXM6JHtyZXNwLnN0YXR1c31dWyR7Ym9keS5lcnJvcn0oJHtib2R5LmVycm9yX2NvZGV9KV0gJHtib2R5LmVycm9yX2Rlc2NyaXB0aW9ufSAoJHtzZXFJZH0pYClcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzcC5zdGF0dXMgPj0gNTAwKSB7XG4gICAgICBjb25zdCBib2R5OiBhbnkgPSBhd2FpdCByZXNwLmpzb24oKVxuICAgICAgY29uc3Qgc2VxSWQgPSBib2R5LnJlcXVlc3RfaWQgfHwgc2VxSWRGcm9tSGVhZGVyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFske2dldFNka05hbWUoKX0vJHtnZXRTZGtWZXJzaW9uKCl9XVtPQXV0aDJBdXRoUHJvdmlkZXJdW3N0YXR1czoke3Jlc3Auc3RhdHVzfV1bJHtib2R5LmVycm9yfSgke2JvZHkuZXJyb3JfY29kZX0pXSAke2JvZHkuZXJyb3JfZGVzY3JpcHRpb259ICgke3NlcUlkfSlgKVxuICAgIH1cbiAgICByZXR1cm4gcmVzcC5qc29uKClcbiAgfVxuXG4gIC8vIOiwg+eUqOaOpeWPo+WIt+aWsGFjY2VzcyB0b2tlbu+8jOW5tuS4lOi/lOWbnlxuICBwcml2YXRlIGFzeW5jIF9yZWZyZXNoQWNjZXNzVG9rZW5Gcm9tT2F1dGhTZXJ2ZXIoY2xpZW50SWQ6IHN0cmluZyk6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXksIHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgaWYgKCFyZWZyZXNoVG9rZW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX09QRVJBVElPTixcbiAgICAgICAgbXNnOiAnbm90IGxvZ2luJ1xuICAgICAgfSkpO1xuICAgIH1cblxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy5fZmV0Y2hBY2Nlc3NUb2tlbkZyb21PYXV0aFNlcnZlcihyZWZyZXNoVG9rZW4sIGNsaWVudElkKTtcbiAgICBjb25zdCB7IHJlZnJlc2hfdG9rZW46IG5ld1JlZnJlc2hUb2tlbiwgYWNjZXNzX3Rva2VuOiBhY2Nlc3NUb2tlbiwgZXhwaXJlc19pbjogYWNjZXNzVG9rZW5FeHBpcmUgfSA9IHRva2VuXG5cbiAgICAvLyDplJnor6/lpITnkIZcbiAgICBpZiAoIWFjY2Vzc1Rva2VuIHx8ICFhY2Nlc3NUb2tlbkV4cGlyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLk5FVFdPUktfRVJST1IsXG4gICAgICAgIG1zZzogJ3JlZnJlc2ggYWNjZXNzX3Rva2VuIGZhaWxlZCdcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYgKGFjY2Vzc1Rva2VuICYmIGFjY2Vzc1Rva2VuRXhwaXJlKSB7XG4gICAgICBpZiAobmV3UmVmcmVzaFRva2VuID09PSByZWZyZXNoVG9rZW4pIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXksIG5ld1JlZnJlc2hUb2tlbik7XG4gICAgICB9XG4gICAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbik7XG4gICAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5LCBhY2Nlc3NUb2tlbkV4cGlyZSAqIDEwMDAgKyBEYXRlLm5vdygpKTtcbiAgICAgIGNsb3VkYmFzZS5maXJlKEVWRU5UUy5BQ0NFU1NfVE9LRU5fUkVGUkVTSEQpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWNjZXNzVG9rZW46IGFjY2Vzc1Rva2VuLFxuICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyZTogYWNjZXNzVG9rZW5FeHBpcmVcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfc2V0UmVmcmVzaFRva2VuKHJlZnJlc2hUb2tlbjogc3RyaW5nKSB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXksIHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICAvLyByZWZyZXNoIHRva2Vu6K6+572u5YmN77yM5YWI5riF5o6JIGFjY2VzcyB0b2tlblxuICAgIC8vIOiuvue9ruaYr+ebtOaOpeaLieWPluaWsCBhY2Nlc3MgdG9rZW4g6KaG55uW77yM6ICM5LiN5pivIHJlbW92ZVxuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5LCByZWZyZXNoVG9rZW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXREZXZpY2VJZCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHsgZGV2aWNlSWRLZXkgfSA9IHRoaXMuX2NhY2hlLmtleXNcbiAgICBjb25zdCBkZXZpY2VJZCA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoZGV2aWNlSWRLZXkpXG5cbiAgICBpZiAoIWRldmljZUlkKSB7XG4gICAgICAvLyBjb25zdCBmcCA9IGF3YWl0IGZwUHJvbWlzZVxuICAgICAgLy8gY29uc3QgcmVzdWx0ID0gYXdhaXQgZnAuZ2V0KClcbiAgICAgIC8vIGNvbnN0IGRldmljZUlkID0gcmVzdWx0LnZpc2l0b3JJZFxuICAgICAgY29uc3QgbmV3RGV2aWNlSWQgPSB1dWlkdjQoKVxuICAgICAgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhkZXZpY2VJZEtleSwgbmV3RGV2aWNlSWQpXG4gICAgICByZXR1cm4gbmV3RGV2aWNlSWRcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZGV2aWNlSWRcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGNoZWNrRnJvbUF1dGhWMigpIHtcbiAgICAvLyBjb25zdCBhdXRoSW5zdGFuY2UgPSB0aGlzLl9mcm9tQXBwLmF1dGhJbnN0YW5jZVxuICAgIGNvbnN0IG9hdXRoSW5zdGFuY2UgPSB0aGlzLl9mcm9tQXBwLm9hdXRoSW5zdGFuY2UgfHwgKHRoaXMuX2Zyb21BcHAgYXMgYW55KS5vYXV0aCgpXG4gICAgLy8gY29uc3QgYXV0aExvZ2luID0gYXV0aEluc3RhbmNlICYmIGF3YWl0IGF1dGhJbnN0YW5jZS5nZXRMb2dpblN0YXRlKClcbiAgICAvLyBjb25zb2xlLmxvZygnYXV0aExvZ2luJywgYXV0aExvZ2luKVxuICAgIC8vIGlmIChhdXRoTG9naW4pIHtcbiAgICAvLyAgIHJldHVybiAnYXV0aCdcbiAgICAvLyB9XG4gICAgY29uc3Qgb2F1dGhMb2dpbiA9IG9hdXRoSW5zdGFuY2UgJiYgYXdhaXQgb2F1dGhJbnN0YW5jZS5oYXNMb2dpblN0YXRlKClcbiAgICBpZiAob2F1dGhMb2dpbikge1xuICAgICAgcmV0dXJuICdvYXV0aCdcbiAgICB9XG4gICAgcmV0dXJuICcnXG4gIH1cbn1cblxuY29uc3QgcmVxdWVzdE1hcDogS1Y8Q2xvdWRiYXNlUmVxdWVzdD4gPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRSZXF1ZXN0KGNvbmZpZzogSUNsb3VkYmFzZVJlcXVlc3RDb25maWcpIHtcbiAgcmVxdWVzdE1hcFtjb25maWcuZW52XSA9IG5ldyBDbG91ZGJhc2VSZXF1ZXN0KHtcbiAgICAuLi5jb25maWcsXG4gICAgdGhyb3c6IHRydWVcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZXF1ZXN0QnlFbnZJZChlbnY6IHN0cmluZyk6IENsb3VkYmFzZVJlcXVlc3Qge1xuICByZXR1cm4gcmVxdWVzdE1hcFtlbnZdO1xufSJdfQ==