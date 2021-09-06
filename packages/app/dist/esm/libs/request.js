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
                        console.log('loginFlag', loginFlag);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWJzL3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0wsWUFBWSxFQUNaLFNBQVMsRUFDVCxhQUFhLEVBQ2IsV0FBVyxFQUNYLGVBQWUsRUFDZix1QkFBdUIsRUFDeEIsTUFBTSxxQkFBcUIsQ0FBQztBQVE3QixPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFJdkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLElBQUksQ0FBQztBQUMvQixPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM3QixJQUFBLFVBQVUsR0FBYSxTQUFTLFdBQXRCLEVBQUUsTUFBTSxHQUFLLFNBQVMsT0FBZCxDQUFlO0FBQ2pDLElBQUEsUUFBUSxHQUF3QyxLQUFLLFNBQTdDLEVBQUUsVUFBVSxHQUE0QixLQUFLLFdBQWpDLEVBQUUsU0FBUyxHQUFpQixLQUFLLFVBQXRCLEVBQUUsVUFBVSxHQUFLLEtBQUssV0FBVixDQUFXO0FBQ3RELElBQUEsT0FBTyxHQUFLLFFBQVEsUUFBYixDQUFjO0FBRTdCLE9BQU8sRUFBRSxFQUFFLElBQUksTUFBTSxFQUFFLE1BQU0sTUFBTSxDQUFBO0FBTW5DLElBQU0sMkJBQTJCLEdBQUc7SUFDbEMsYUFBYTtJQUNiLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsd0JBQXdCO0lBQ3hCLGFBQWE7SUFDYix1Q0FBdUM7SUFDdkMsaUNBQWlDO0lBQ2pDLDBCQUEwQjtJQUMxQiw2QkFB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ZXJzaW9uLFxuICBnZXRFbmRQb2ludCxcbiAgZ2V0QmFzZUVuZFBvaW50LFxuICBPQVVUSDJfTE9HSU5UWVBFX1BSRUZJWFxufSBmcm9tICcuLi9jb25zdGFudHMvY29tbW9uJztcbmltcG9ydCB7XG4gIElSZXF1ZXN0T3B0aW9ucyxcbiAgU0RLUmVxdWVzdEludGVyZmFjZSxcbiAgUmVzcG9uc2VPYmplY3QsXG4gIElVcGxvYWRSZXF1ZXN0T3B0aW9ucyxcbiAgSVJlcXVlc3RDb25maWdcbn0gZnJvbSAnQGNsb3VkYmFzZS9hZGFwdGVyLWludGVyZmFjZSc7XG5pbXBvcnQgeyB1dGlscywgand0LCBhZGFwdGVycywgY29uc3RhbnRzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgS1YsIElDbG91ZGJhc2UgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcbmltcG9ydCB7IElHZXRBY2Nlc3NUb2tlblJlc3VsdCwgSUNsb3VkYmFzZVJlcXVlc3RDb25maWcsIElBcHBlbmRlZFJlcXVlc3RJbmZvLCBJUmVxdWVzdEJlZm9yZUhvb2sgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL3JlcXVlc3QnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNhY2hlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSc7XG5pbXBvcnQgeyBjbG91ZGJhc2UgfSBmcm9tICcuLic7XG5pbXBvcnQgeyBnZXRDYWNoZUJ5RW52SWQsIGdldExvY2FsQ2FjaGUgfSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCB7IEVWRU5UUyB9IGZyb20gJy4uL2NvbnN0YW50cy9ldmVudHMnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuL2FkYXB0ZXInO1xuY29uc3QgeyBnZXRTZGtOYW1lLCBFUlJPUlMgfSA9IGNvbnN0YW50cztcbmNvbnN0IHsgZ2VuU2VxSWQsIGlzRm9ybURhdGEsIGZvcm1hdFVybCwgY3JlYXRlU2lnbiB9ID0gdXRpbHM7XG5jb25zdCB7IFJVTlRJTUUgfSA9IGFkYXB0ZXJzO1xuXG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJ1xuXG4vLyBpbXBvcnQgRmluZ2VycHJpbnRKUyBmcm9tICdAZmluZ2VycHJpbnRqcy9maW5nZXJwcmludGpzJ1xuLy8gY29uc3QgZnBQcm9taXNlID0gRmluZ2VycHJpbnRKUy5sb2FkKClcblxuLy8g5LiL6Z2i5Yeg56eNIGFjdGlvbiDkuI3pnIDopoEgYWNjZXNzIHRva2VuXG5jb25zdCBBQ1RJT05TX1dJVEhPVVRfQUNDRVNTVE9LRU4gPSBbXG4gICdhdXRoLmdldEp3dCcsXG4gICdhdXRoLmxvZ291dCcsXG4gICdhdXRoLnNpZ25JbldpdGhUaWNrZXQnLFxuICAnYXV0aC5zaWduSW5Bbm9ueW1vdXNseScsXG4gICdhdXRoLnNpZ25JbicsXG4gICdhdXRoLmZldGNoQWNjZXNzVG9rZW5XaXRoUmVmcmVzaFRva2VuJyxcbiAgJ2F1dGguc2lnblVwV2l0aEVtYWlsQW5kUGFzc3dvcmQnLFxuICAnYXV0aC5hY3RpdmF0ZUVuZFVzZXJNYWlsJyxcbiAgJ2F1dGguc2VuZFBhc3N3b3JkUmVzZXRFbWFpbCcsXG4gICdhdXRoLnJlc2V0UGFzc3dvcmRXaXRoVG9rZW4nLFxuICAnYXV0aC5pc1VzZXJuYW1lUmVnaXN0ZXJlZCdcbl07XG5cbmZ1bmN0aW9uIGJpbmRIb29rcyhpbnN0YW5jZTogU0RLUmVxdWVzdEludGVyZmFjZSwgbmFtZTogc3RyaW5nLCBob29rczogSVJlcXVlc3RCZWZvcmVIb29rW10pIHtcbiAgY29uc3Qgb3JpZ2luTWV0aG9kID0gaW5zdGFuY2VbbmFtZV07XG4gIGluc3RhbmNlW25hbWVdID0gZnVuY3Rpb24gKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucykge1xuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBjb25zdCBoZWFkZXJzID0ge307XG4gICAgaG9va3MuZm9yRWFjaChob29rID0+IHtcbiAgICAgIGNvbnN0IHsgZGF0YTogYXBwZW5kZWREYXRhLCBoZWFkZXJzOiBhcHBlbmRlZEhlYWRlcnMgfSA9IGhvb2suY2FsbChpbnN0YW5jZSwgb3B0aW9ucyk7XG4gICAgICBPYmplY3QuYXNzaWduKGRhdGEsIGFwcGVuZGVkRGF0YSk7XG4gICAgICBPYmplY3QuYXNzaWduKGhlYWRlcnMsIGFwcGVuZGVkSGVhZGVycyk7XG4gICAgfSk7XG4gICAgY29uc3Qgb3JpZ2luRGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICBvcmlnaW5EYXRhICYmICgoKSA9PiB7XG4gICAgICBpZiAoaXNGb3JtRGF0YShvcmlnaW5EYXRhKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgKG9yaWdpbkRhdGEgYXMgRm9ybURhdGEpLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgb3B0aW9ucy5kYXRhID0ge1xuICAgICAgICAuLi5vcmlnaW5EYXRhLFxuICAgICAgICAuLi5kYXRhXG4gICAgICB9O1xuICAgIH0pKCk7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0ge1xuICAgICAgLi4uKG9wdGlvbnMuaGVhZGVycyB8fCB7fSksXG4gICAgICAuLi5oZWFkZXJzXG4gICAgfTtcbiAgICByZXR1cm4gKG9yaWdpbk1ldGhvZCBhcyBGdW5jdGlvbikuY2FsbChpbnN0YW5jZSwgb3B0aW9ucyk7XG4gIH07XG59XG5mdW5jdGlvbiBiZWZvcmVFYWNoKCk6IElBcHBlbmRlZFJlcXVlc3RJbmZvIHtcbiAgY29uc3Qgc2VxSWQgPSBnZW5TZXFJZCgpO1xuICByZXR1cm4ge1xuICAgIGRhdGE6IHtcbiAgICAgIHNlcUlkXG4gICAgfSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnWC1TREstVmVyc2lvbic6IGBAY2xvdWRiYXNlL2pzLXNkay8ke2dldFNka1ZlcnNpb24oKX1gLFxuICAgICAgJ3gtc2VxaWQnOiBzZXFJZFxuICAgIH1cbiAgfTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUNsb3VkYmFzZVJlcXVlc3Qge1xuICBmZXRjaDogKHVybE9yUGF0aDogc3RyaW5nLCBpbml0PzogUmVxdWVzdEluaXQpID0+IFByb21pc2U8UmVzcG9uc2U+O1xuICBwb3N0OiAob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKSA9PiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PjtcbiAgdXBsb2FkOiAob3B0aW9uczogSVVwbG9hZFJlcXVlc3RPcHRpb25zKSA9PiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PjtcbiAgZG93bmxvYWQ6IChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpID0+IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+O1xuICByZWZyZXNoQWNjZXNzVG9rZW46ICgpID0+IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PjtcbiAgZ2V0QWNjZXNzVG9rZW46ICgpID0+IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PjtcbiAgcmVxdWVzdDogKGFjdGlvbjogc3RyaW5nLCBwYXJhbXM6IEtWPGFueT4sIG9wdGlvbnM/OiBLVjxhbnk+KSA9PiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PjtcbiAgc2VuZDogKGFjdGlvbjogc3RyaW5nLCBkYXRhOiBLVjxhbnk+KSA9PiBQcm9taXNlPGFueT47XG59XG5cbi8qKlxuICogQGNsYXNzIENsb3VkYmFzZVJlcXVlc3RcbiAqL1xuZXhwb3J0IGNsYXNzIENsb3VkYmFzZVJlcXVlc3QgaW1wbGVtZW50cyBJQ2xvdWRiYXNlUmVxdWVzdCB7XG4gIGNvbmZpZzogSUNsb3VkYmFzZVJlcXVlc3RDb25maWc7XG4gIF9zaG91bGRSZWZyZXNoQWNjZXNzVG9rZW5Ib29rOiBGdW5jdGlvblxuICBfcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZTogUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+IHwgbnVsbFxuICBfcmVxQ2xhc3M6IFNES1JlcXVlc3RJbnRlcmZhY2U7XG4gIC8vIOivt+axguWksei0peaYr+WQpuaKm+WHukVycm9yXG4gIHByaXZhdGUgX3Rocm93V2hlblJlcXVlc3RGYWlsID0gZmFsc2U7XG4gIHByaXZhdGUgX2NhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG4gIC8vIOaMgeS5heWMluacrOWcsOWtmOWCqFxuICBwcml2YXRlIF9sb2NhbENhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG4gIHByaXZhdGUgX2Zyb21BcHA6IElDbG91ZGJhc2VcbiAgLyoqXG4gICAqIOWIneWni+WMllxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25maWc6IElDbG91ZGJhc2VSZXF1ZXN0Q29uZmlnICYgeyB0aHJvdz86IGJvb2xlYW4gfSkge1xuICAgIGNvbnN0IHsgX2Zyb21BcHAgfSA9IGNvbmZpZztcblxuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIHRoaXMuX2Zyb21BcHAgPSBfZnJvbUFwcFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIHRoaXMuX3JlcUNsYXNzID0gbmV3IFBsYXRmb3JtLmFkYXB0ZXIucmVxQ2xhc3MoPElSZXF1ZXN0Q29uZmlnPntcbiAgICAgIHRpbWVvdXQ6IHRoaXMuY29uZmlnLnRpbWVvdXQsXG4gICAgICB0aW1lb3V0TXNnOiBgW0BjbG91ZGJhc2UvanMtc2RrXSDor7fmsYLlnKgke3RoaXMuY29uZmlnLnRpbWVvdXQgLyAxMDAwfXPlhoXmnKrlrozmiJDvvIzlt7LkuK3mlq1gLFxuICAgICAgcmVzdHJpY3RlZE1ldGhvZHM6IFsncG9zdCddXG4gICAgfSk7XG4gICAgdGhpcy5fdGhyb3dXaGVuUmVxdWVzdEZhaWwgPSBjb25maWcudGhyb3cgfHwgZmFsc2U7XG4gICAgdGhpcy5fY2FjaGUgPSBnZXRDYWNoZUJ5RW52SWQodGhpcy5jb25maWcuZW52KTtcbiAgICB0aGlzLl9sb2NhbENhY2hlID0gZ2V0TG9jYWxDYWNoZSh0aGlzLmNvbmZpZy5lbnYpO1xuICAgIGJpbmRIb29rcyh0aGlzLl9yZXFDbGFzcywgJ3Bvc3QnLCBbYmVmb3JlRWFjaF0pO1xuICAgIGJpbmRIb29rcyh0aGlzLl9yZXFDbGFzcywgJ3VwbG9hZCcsIFtiZWZvcmVFYWNoXSk7XG4gICAgYmluZEhvb2tzKHRoaXMuX3JlcUNsYXNzLCAnZG93bmxvYWQnLCBbYmVmb3JlRWFjaF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOWll+S4gOWxgiBmZXRjaO+8jOaWueS+v+WkhOeQhuivt+axguWcsOWdgFxuICAgKiBAcGFyYW0ge3N0cmluZ30gICAgICB1cmxPclBhdGhcbiAgICogQHBhcmFtIHtSZXF1ZXN0SW5pdH0gaW5pdFxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIGZldGNoKHVybE9yUGF0aDogc3RyaW5nLCBpbml0PzogUmVxdWVzdEluaXQpOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gICAgY29uc3QgZGV2aWNlSWQgPSBhd2FpdCB0aGlzLmdldERldmljZUlkKCk7XG5cbiAgICBjb25zdCBoZWFkZXJzID0ge1xuICAgICAgJ1gtUHJvamVjdC1JZCc6IHRoaXMuY29uZmlnLmVudixcbiAgICAgICdYLVNESy1WZXJzaW9uJzogYEBjbG91ZGJhc2UvanMtc2RrLyR7Z2V0U2RrVmVyc2lvbigpfWAsXG4gICAgICAnWC1SZXF1ZXN0LUlkJzogZ2VuU2VxSWQoKSxcbiAgICAgICdYLVJlcXVlc3QtVGltZXN0YW1wJzogRGF0ZS5ub3coKSxcbiAgICAgICdYLURldmljZS1JZCc6IGRldmljZUlkXG4gICAgfVxuICAgIC8vIOmdnndlYuW5s+WPsOS9v+eUqOWHreivgeajgOmqjOacieaViOaAp1xuICAgIGlmIChQbGF0Zm9ybS5ydW50aW1lICE9PSBSVU5USU1FLldFQikge1xuICAgICAgY29uc3QgeyBhcHBTaWduLCBhcHBTZWNyZXQgfSA9IHRoaXMuY29uZmlnXG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpXG4gICAgICBjb25zdCB7IGFwcEFjY2Vzc0tleSwgYXBwQWNjZXNzS2V5SWQgfSA9IGFwcFNlY3JldFxuICAgICAgY29uc3Qgc2lnbiA9IGNyZWF0ZVNpZ24oe1xuICAgICAgICAvLyBkYXRhOiBpbml0LmJvZHksXG4gICAgICAgIGRhdGE6IHt9LFxuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgIGFwcEFjY2Vzc0tleUlkLFxuICAgICAgICBhcHBTaWduXG4gICAgICB9LCBhcHBBY2Nlc3NLZXkpXG5cbiAgICAgIGhlYWRlcnNbJ1gtVENCLUFwcC1Tb3VyY2UnXSA9IGB0aW1lc3RhbXA9JHt0aW1lc3RhbXB9O2FwcEFjY2Vzc0tleUlkPSR7YXBwQWNjZXNzS2V5SWR9O2FwcFNpZ249JHthcHBTaWdufTtzaWduPSR7c2lnbn1gXG4gICAgfVxuXG4gICAgaW5pdC5oZWFkZXJzID0gT2JqZWN0LmFzc2lnbih7fSwgaW5pdC5oZWFkZXJzLCBoZWFkZXJzKVxuXG4gICAgY29uc3QgdXJsID0gdXJsT3JQYXRoLnN0YXJ0c1dpdGgoJ2h0dHAnKVxuICAgICAgPyB1cmxPclBhdGhcbiAgICAgIDogYCR7Z2V0QmFzZUVuZFBvaW50KCl9JHt1cmxPclBhdGh9YFxuICAgIHJldHVybiBhd2FpdCBmZXRjaCh1cmwsIGluaXQpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcG9zdChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxQ2xhc3MucG9zdChvcHRpb25zKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIHB1YmxpYyBhc3luYyB1cGxvYWQob3B0aW9uczogSVVwbG9hZFJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxSZXNwb25zZU9iamVjdD4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX3JlcUNsYXNzLnVwbG9hZChvcHRpb25zKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIHB1YmxpYyBhc3luYyBkb3dubG9hZChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxQ2xhc3MuZG93bmxvYWQob3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZWZyZXNoQWNjZXNzVG9rZW4oKTogUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+IHtcbiAgICAvLyDlj6/og73kvJrlkIzml7bosIPnlKjlpJrmrKHliLfmlrBhY2Nlc3MgdG9rZW7vvIzov5nph4zmiorlroPku6zlkIjlubbmiJDkuIDkuKpcbiAgICBpZiAoIXRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UpIHtcbiAgICAgIC8vIOayoeacieato+WcqOWIt+aWsO+8jOmCo+S5iOato+W4uOaJp+ihjOWIt+aWsOmAu+i+kVxuICAgICAgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZSA9IHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQ7XG4gICAgbGV0IGVycjtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlcnIgPSBlO1xuICAgIH1cbiAgICB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlID0gbnVsbDtcbiAgICB0aGlzLl9zaG91bGRSZWZyZXNoQWNjZXNzVG9rZW5Ib29rID0gbnVsbDtcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVmcmVzaEFjY2Vzc1Rva2VuRnJvbU9hdXRoU2VydmVyKGNsaWVudElkOiBzdHJpbmcpOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4ge1xuICAgIC8vIOWPr+iDveS8muWQjOaXtuiwg+eUqOWkmuasoeWIt+aWsCBhY2Nlc3MgdG9rZW7vvIzov5nph4zmiorlroPku6zlkIjlubbmiJDkuIDkuKpcbiAgICBpZiAoIXRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UpIHtcbiAgICAgIC8vIOayoeacieato+WcqOWIt+aWsO+8jOmCo+S5iOato+W4uOaJp+ihjOWIt+aWsOmAu+i+kVxuICAgICAgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZSA9IHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlbkZyb21PYXV0aFNlcnZlcihjbGllbnRJZCk7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdDtcbiAgICBsZXQgZXJyO1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW5Qcm9taXNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGVyciA9IGU7XG4gICAgfVxuICAgIHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlblByb21pc2UgPSBudWxsO1xuICAgIHRoaXMuX3Nob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbkhvb2sgPSBudWxsO1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIOiOt+WPliBPQXV0aCBhY2Nlc3N0b2tlblxuICBwdWJsaWMgYXN5bmMgZ2V0T2F1dGhBY2Nlc3NUb2tlbigpOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4ge1xuICAgIGNvbnN0IHsgb2F1dGhDbGllbnQgfSA9IHRoaXMuY29uZmlnXG4gICAgaWYgKG9hdXRoQ2xpZW50KSB7XG4gICAgICAvLyBjb25zdCB2YWxpZEFjY2Vzc1Rva2VuID0gYXdhaXQgb2F1dGhDbGllbnQuZ2V0QWNjZXNzVG9rZW4oKVxuICAgICAgLy8gY29uc3QgY3JlZGVudGlhbHMgPSBhd2FpdCBvYXV0aENsaWVudC5fZ2V0Q3JlZGVudGlhbHMoKVxuICAgICAgLy8gcmV0dXJuIHtcbiAgICAgIC8vICAgYWNjZXNzVG9rZW46IHZhbGlkQWNjZXNzVG9rZW4sXG4gICAgICAvLyAgIGFjY2Vzc1Rva2VuRXhwaXJlOiBuZXcgRGF0ZShjcmVkZW50aWFscy5leHBpcmVzX2F0KS5nZXRUaW1lKClcbiAgICAgIC8vIH1cbiAgICAgIHJldHVybiB0aGlzLmdldE9hdXRoQWNjZXNzVG9rZW5WMihvYXV0aENsaWVudClcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0T2F1dGhBY2Nlc3NUb2tlblYyKG9hdXRoQ2xpZW50OiBhbnkpOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4ge1xuICAgIGNvbnN0IHZhbGlkQWNjZXNzVG9rZW4gPSBhd2FpdCBvYXV0aENsaWVudC5nZXRBY2Nlc3NUb2tlbigpXG4gICAgY29uc3QgY3JlZGVudGlhbHMgPSBhd2FpdCBvYXV0aENsaWVudC5fZ2V0Q3JlZGVudGlhbHMoKVxuICAgIHJldHVybiB7XG4gICAgICBhY2Nlc3NUb2tlbjogdmFsaWRBY2Nlc3NUb2tlbixcbiAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlOiBuZXcgRGF0ZShjcmVkZW50aWFscy5leHBpcmVzX2F0KS5nZXRUaW1lKClcbiAgICB9XG4gIH1cblxuICAvLyDojrflj5YgYWNjZXNzIHRva2VuXG4gIHB1YmxpYyBhc3luYyBnZXRBY2Nlc3NUb2tlbigpOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4ge1xuICAgIGNvbnN0IHsgbG9naW5UeXBlS2V5LCBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXksIHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCBsb2dpblR5cGUgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGxvZ2luVHlwZUtleSk7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGlmICghcmVmcmVzaFRva2VuKSB7XG4gICAgICAvLyDkuI3or6Xlh7rnjrDnmoTnirbmgIHvvJrmnIkgYWNjZXNzIHRva2VuIOWNtOayoeaciSByZWZyZXNoIHRva2VuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsXG4gICAgICAgIG1zZzogJ3JlZnJlc2ggdG9rZW4gaXMgbm90IGV4aXN0LCB5b3VyIGxvY2FsIGRhdGEgbWlnaHQgYmUgbWVzc2VkIHVwLCBwbGVhc2UgcmV0cnkgYWZ0ZXIgY2xlYXIgbG9jYWxTdG9yYWdlIG9yIHNlc3Npb25TdG9yYWdlJ1xuICAgICAgfSkpO1xuICAgIH1cbiAgICAvLyDlpoLmnpzmsqHmnIlhY2Nlc3MgdG9rZW7miJbogIXov4fmnJ/vvIzpgqPkuYjliLfmlrBcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuRXhwaXJlID0gTnVtYmVyKGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpKTtcblxuICAgIC8vIOiwg+eUqOmSqeWtkOWHveaVsFxuICAgIGxldCBzaG91bGRSZWZyZXNoQWNjZXNzVG9rZW4gPSB0cnVlO1xuICAgIGlmICh0aGlzLl9zaG91bGRSZWZyZXNoQWNjZXNzVG9rZW5Ib29rICYmICEoYXdhaXQgdGhpcy5fc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuSG9vayhhY2Nlc3NUb2tlbiwgYWNjZXNzVG9rZW5FeHBpcmUpKSkge1xuICAgICAgc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCghYWNjZXNzVG9rZW4gfHwgIWFjY2Vzc1Rva2VuRXhwaXJlIHx8IGFjY2Vzc1Rva2VuRXhwaXJlIDwgRGF0ZS5ub3coKSkgJiYgc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuKSB7XG4gICAgICBpZiAobG9naW5UeXBlLnN0YXJ0c1dpdGgoT0FVVEgyX0xPR0lOVFlQRV9QUkVGSVgpKSB7XG4gICAgICAgIC8vIE5PVEU6IOi/memHjOmcgOimgeS7jiBhY2Nlc3NUb2tlbiDop6Plh7rmnaXpg6jliIbkv6Hmga/vvIznlKjkuo7liLfmlrAgYWNjZXNzVG9rZW5cbiAgICAgICAgLy8g5omA5Lul6L+H5pyf55qEIGFjY2Vzc1Rva2VuIOS4jeiDveWIoOmZpO+8jOiAjOaYr+eUqOaWsCBhY2Nlc3NUb2tlbiDopobnm5ZcbiAgICAgICAgaWYgKGFjY2Vzc1Rva2VuKSB7XG4gICAgICAgICAgbGV0IGhlYWRlciA9IG51bGxcbiAgICAgICAgICBsZXQgcGF5bG9hZCA9IG51bGxcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaGVhZGVyID0gand0LmRlY29kZShhY2Nlc3NUb2tlbiwgeyBoZWFkZXI6IHRydWUgfSlcbiAgICAgICAgICAgIHBheWxvYWQgPSBqd3QuZGVjb2RlKGFjY2Vzc1Rva2VuKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBbREVDT0RFX0FDQ0VTU19UT0tFTl9FUlJPUl0gJHtlLm1lc3NhZ2V9LCBhY2Nlc3N0b2tlbjogJHthY2Nlc3NUb2tlbn1gKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGVhZGVyPy5raWQgJiYgcGF5bG9hZD8ucHJvamVjdF9pZCkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVmcmVzaEFjY2Vzc1Rva2VuRnJvbU9hdXRoU2VydmVyKHBheWxvYWQ/LnByb2plY3RfaWQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIC8vIOi/memHjOeUqCBlbnYg6K+V5LiA5LiLXG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVmcmVzaEFjY2Vzc1Rva2VuRnJvbU9hdXRoU2VydmVyKHRoaXMuY29uZmlnLmVudilcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyDov5Tlm57mnKzlnLDnmoRhY2Nlc3MgdG9rZW5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjY2Vzc1Rva2VuLFxuICAgICAgICBhY2Nlc3NUb2tlbkV4cGlyZVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG4gIHB1YmxpYyBhc3luYyByZXF1ZXN0KGFjdGlvbjogc3RyaW5nLCBwYXJhbXM6IEtWPGFueT4sIG9wdGlvbnM/OiBLVjxhbnk+KTogUHJvbWlzZTxSZXNwb25zZU9iamVjdD4ge1xuICAgIGNvbnN0IHsgb2F1dGhDbGllbnQgfSA9IHRoaXMuY29uZmlnXG4gICAgY29uc3QgdGNiVHJhY2VLZXkgPSBgeC10Y2ItdHJhY2VfJHt0aGlzLmNvbmZpZy5lbnZ9YDtcbiAgICBsZXQgY29udGVudFR5cGUgPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJztcbiAgICAvLyBjb25zdCB3ZWJEZXZpY2VJZCA9IGF3YWl0IGdldFRjYkZpbmdlcnByaW50SWQoKTtcbiAgICBjb25zdCB0bXBPYmo6IEtWPGFueT4gPSB7XG4gICAgICBhY3Rpb24sXG4gICAgICAvLyB3ZWJEZXZpY2VJZCxcbiAgICAgIGRhdGFWZXJzaW9uOiBEQVRBX1ZFUlNJT04sXG4gICAgICBlbnY6IHRoaXMuY29uZmlnLmVudixcbiAgICAgIC4uLnBhcmFtc1xuICAgIH07XG5cbiAgICAvLyDoi6Xor4bliKvliLDms6jlhozkuoYgT2F1dGgg5qih5Z2X77yM5YiZ5L2/55Sob2F1dGggZ2V0QWNjZXNzVG9rZW5cbiAgICBpZiAob2F1dGhDbGllbnQpIHtcbiAgICAgIHRtcE9iai5hY2Nlc3NfdG9rZW4gPSAoYXdhaXQgdGhpcy5nZXRPYXV0aEFjY2Vzc1Rva2VuKCkpLmFjY2Vzc1Rva2VuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOivhuWIq+W9k+WJjeeZu+W9leaAgSDmmK/lkKbkuLogb2F1dGhcbiAgICAgIGNvbnN0IGxvZ2luRmxhZyA9IGF3YWl0IHRoaXMuY2hlY2tGcm9tQXV0aFYyKClcbiAgICAgIGNvbnNvbGUubG9nKCdsb2dpbkZsYWcnLCBsb2dpbkZsYWcpXG4gICAgICBpZiAobG9naW5GbGFnID09PSAnb2F1dGgnKSB7XG4gICAgICAgIGNvbnN0IGFwcCA9IHRoaXMuY29uZmlnLl9mcm9tQXBwXG4gICAgICAgIGNvbnN0IG9hdXRoQ2xpZW50ID0gYXBwLm9hdXRoSW5zdGFuY2Uub2F1dGgyY2xpZW50XG4gICAgICAgIHRtcE9iai5hY2Nlc3NfdG9rZW4gPSAoYXdhaXQgdGhpcy5nZXRPYXV0aEFjY2Vzc1Rva2VuVjIob2F1dGhDbGllbnQpKS5hY2Nlc3NUb2tlblxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChBQ1RJT05TX1dJVEhPVVRfQUNDRVNTVE9LRU4uaW5kZXhPZihhY3Rpb24pID09PSAtMSkge1xuICAgICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG5cbiAgICAgIC8vIOiLpeaciSByZWZyZXNoVG9rZW4g5YiZ5Lu75Yqh5pyJ55m75b2V5oCBIOWItyBhY2Nlc3NUb2tlblxuICAgICAgY29uc3QgcmVmcmVzaFRva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgICAgaWYgKHJlZnJlc2hUb2tlbikge1xuICAgICAgICB0bXBPYmouYWNjZXNzX3Rva2VuID0gKGF3YWl0IHRoaXMuZ2V0QWNjZXNzVG9rZW4oKSkuYWNjZXNzVG9rZW47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8g5ou8Ym9keeWSjGNvbnRlbnQtdHlwZVxuICAgIGxldCBwYXlsb2FkO1xuICAgIGlmIChhY3Rpb24gPT09ICdzdG9yYWdlLnVwbG9hZEZpbGUnKSB7XG4gICAgICBwYXlsb2FkID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gcGF5bG9hZCkge1xuICAgICAgICBpZiAocGF5bG9hZC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHBheWxvYWRba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcGF5bG9hZC5hcHBlbmQoa2V5LCB0bXBPYmpba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnRlbnRUeXBlID0gJ211bHRpcGFydC9mb3JtLWRhdGEnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50VHlwZSA9ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnO1xuICAgICAgcGF5bG9hZCA9IHt9O1xuICAgICAgZm9yIChsZXQga2V5IGluIHRtcE9iaikge1xuICAgICAgICBpZiAodG1wT2JqW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHBheWxvYWRba2V5XSA9IHRtcE9ialtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBvcHRzOiBhbnkgPSB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdjb250ZW50LXR5cGUnOiBjb250ZW50VHlwZVxuICAgICAgfVxuICAgIH07XG4gICAgaWYgKG9wdGlvbnM/Llsnb25VcGxvYWRQcm9ncmVzcyddKSB7XG4gICAgICBvcHRzLm9uVXBsb2FkUHJvZ3Jlc3MgPSBvcHRpb25zWydvblVwbG9hZFByb2dyZXNzJ107XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLnJlZ2lvbikge1xuICAgICAgb3B0cy5oZWFkZXJzWydYLVRDQi1SZWdpb24nXSA9IHRoaXMuY29uZmlnLnJlZ2lvbjtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFjZUhlYWRlciA9IHRoaXMuX2xvY2FsQ2FjaGUuZ2V0U3RvcmUodGNiVHJhY2VLZXkpO1xuICAgIGlmICh0cmFjZUhlYWRlcikge1xuICAgICAgb3B0cy5oZWFkZXJzWydYLVRDQi1UcmFjZSddID0gdHJhY2VIZWFkZXI7XG4gICAgfVxuICAgIC8vIOmdnndlYuW5s+WPsOS9v+eUqOWHreivgeajgOmqjOacieaViOaAp1xuICAgIGlmIChQbGF0Zm9ybS5ydW50aW1lICE9PSBSVU5USU1FLldFQikge1xuICAgICAgY29uc3QgeyBhcHBTaWduLCBhcHBTZWNyZXQgfSA9IHRoaXMuY29uZmlnO1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgIGNvbnN0IHsgYXBwQWNjZXNzS2V5LCBhcHBBY2Nlc3NLZXlJZCB9ID0gYXBwU2VjcmV0O1xuICAgICAgY29uc3Qgc2lnbiA9IGNyZWF0ZVNpZ24oe1xuICAgICAgICBkYXRhOiB7fSwgLy8g5qCh6aqM562+5ZCN5rWB56iL5a6e6ZmF5pyq55So5Yiw77yM5Y+v6K6+56m6XG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgYXBwQWNjZXNzS2V5SWQsXG4gICAgICAgIGFwcFNpZ25cbiAgICAgIH0sIGFwcEFjY2Vzc0tleSk7XG5cbiAgICAgIG9wdHMuaGVhZGVyc1snWC1UQ0ItQXBwLVNvdXJjZSddID0gYHRpbWVzdGFtcD0ke3RpbWVzdGFtcH07YXBwQWNjZXNzS2V5SWQ9JHthcHBBY2Nlc3NLZXlJZH07YXBwU2lnbj0ke2FwcFNpZ259O3NpZ249JHtzaWdufWA7XG4gICAgfVxuXG4gICAgLy8g5Y+R5Ye66K+35rGCXG4gICAgLy8g5paw55qEIHVybCDpnIDopoHmkLrluKYgZW52IOWPguaVsOi/m+ihjCBDT1JTIOagoemqjFxuICAgIC8vIOivt+axgumTvuaOpeaUr+aMgea3u+WKoOWKqOaAgSBxdWVyeSDlj4LmlbDvvIzmlrnkvr/nlKjmiLfosIPor5XlrprkvY3or7fmsYJcbiAgICBjb25zdCB7IHBhcnNlLCBpblF1ZXJ5LCBzZWFyY2ggfSA9IHBhcmFtcztcbiAgICBsZXQgZm9ybWF0UXVlcnk6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7XG4gICAgICBlbnY6IHRoaXMuY29uZmlnLmVudlxuICAgIH07XG4gICAgLy8g5bCd6K+V6Kej5p6Q5ZON5bqU5pWw5o2u5Li6IEpTT05cbiAgICBwYXJzZSAmJiAoZm9ybWF0UXVlcnkucGFyc2UgPSB0cnVlKTtcbiAgICBpblF1ZXJ5ICYmIChmb3JtYXRRdWVyeSA9IHtcbiAgICAgIC4uLmluUXVlcnksXG4gICAgICAuLi5mb3JtYXRRdWVyeVxuICAgIH0pO1xuICAgIGNvbnN0IHsgQkFTRV9VUkwsIFBST1RPQ09MIH0gPSBnZXRFbmRQb2ludCgpO1xuICAgIC8vIOeUn+aIkOivt+axgiB1cmxcbiAgICBsZXQgbmV3VXJsID0gZm9ybWF0VXJsKFBST1RPQ09MLCBCQVNFX1VSTCwgZm9ybWF0UXVlcnkpO1xuXG4gICAgaWYgKHNlYXJjaCkge1xuICAgICAgbmV3VXJsICs9IHNlYXJjaDtcbiAgICB9XG5cbiAgICBjb25zdCByZXM6IFJlc3BvbnNlT2JqZWN0ID0gYXdhaXQgdGhpcy5wb3N0KHtcbiAgICAgIHVybDogbmV3VXJsLFxuICAgICAgZGF0YTogcGF5bG9hZCxcbiAgICAgIC4uLm9wdHNcbiAgICB9KTtcblxuICAgIC8vIOS/neWtmCB0cmFjZSBoZWFkZXJcbiAgICBjb25zdCByZXNUcmFjZUhlYWRlciA9IHJlcy5oZWFkZXIgJiYgcmVzLmhlYWRlclsneC10Y2ItdHJhY2UnXTtcbiAgICBpZiAocmVzVHJhY2VIZWFkZXIpIHtcbiAgICAgIHRoaXMuX2xvY2FsQ2FjaGUuc2V0U3RvcmUodGNiVHJhY2VLZXksIHJlc1RyYWNlSGVhZGVyKTtcbiAgICB9XG5cbiAgICBpZiAoKE51bWJlcihyZXMuc3RhdHVzKSAhPT0gMjAwICYmIE51bWJlcihyZXMuc3RhdHVzQ29kZSkgIT09IDIwMCkgfHwgIXJlcy5kYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25ldHdvcmsgcmVxdWVzdCBlcnJvcicpO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2VuZChhY3Rpb246IHN0cmluZywgZGF0YTogS1Y8YW55PiA9IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QoYWN0aW9uLCBkYXRhLCB7IG9uVXBsb2FkUHJvZ3Jlc3M6IGRhdGEub25VcGxvYWRQcm9ncmVzcyB9KTtcbiAgICBpZiAocmVzcG9uc2UuZGF0YS5jb2RlID09PSAnQUNDRVNTX1RPS0VOX0VYUElSRUQnICYmIEFDVElPTlNfV0lUSE9VVF9BQ0NFU1NUT0tFTi5pbmRleE9mKGFjdGlvbikgPT09IC0xKSB7XG4gICAgICAvLyBhY2Nlc3NfdG9rZW7ov4fmnJ/vvIzph43mlrDojrflj5ZcbiAgICAgIGF3YWl0IHRoaXMucmVmcmVzaEFjY2Vzc1Rva2VuKCk7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdChhY3Rpb24sIGRhdGEsIHsgb25VcGxvYWRQcm9ncmVzczogZGF0YS5vblVwbG9hZFByb2dyZXNzIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXNwb25zZS5kYXRhLmNvZGUgJiYgdGhpcy5fdGhyb3dXaGVuUmVxdWVzdEZhaWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5PUEVSQVRJT05fRkFJTCxcbiAgICAgICAgbXNnOiBgWyR7cmVzcG9uc2UuZGF0YS5jb2RlfV0gJHtyZXNwb25zZS5kYXRhLm1lc3NhZ2V9YFxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICB9XG5cbiAgLy8g6LCD55So5o6l5Y+j5Yi35pawYWNjZXNzIHRva2Vu77yM5bm25LiU6L+U5ZueXG4gIHByaXZhdGUgYXN5bmMgX3JlZnJlc2hBY2Nlc3NUb2tlbihyZXRyeU51bSA9IDEpOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4ge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuRXhwaXJlS2V5LCByZWZyZXNoVG9rZW5LZXksIGxvZ2luVHlwZUtleSwgYW5vbnltb3VzVXVpZEtleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5KTtcblxuICAgIGxldCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgaWYgKCFyZWZyZXNoVG9rZW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX09QRVJBVElPTixcbiAgICAgICAgbXNnOiAnbm90IGxvZ2luJ1xuICAgICAgfSkpO1xuICAgIH1cbiAgICBjb25zdCBwYXJhbXM6IEtWPHN0cmluZz4gPSB7XG4gICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW5cbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCdhdXRoLmZldGNoQWNjZXNzVG9rZW5XaXRoUmVmcmVzaFRva2VuJywgcGFyYW1zKTtcbiAgICBpZiAocmVzcG9uc2UuZGF0YS5jb2RlKSB7XG4gICAgICBjb25zdCB7IGNvZGUgfSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICBpZiAoY29kZSA9PT0gJ1NJR05fUEFSQU1fSU5WQUxJRCcgfHwgY29kZSA9PT0gJ1JFRlJFU0hfVE9LRU5fRVhQSVJFRCcgfHwgY29kZSA9PT0gJ0lOVkFMSURfUkVGUkVTSF9UT0tFTicpIHtcbiAgICAgICAgLy8g6L+Z6YeM5aSE55CG5Lul5LiL6YC76L6R77yaXG4gICAgICAgIC8vIOWMv+WQjeeZu+W9leaXtu+8jOWmguaenOWIt+aWsGFjY2VzcyB0b2tlbuaKpemUmXJlZnJlc2ggdG9rZW7ov4fmnJ/vvIzmraTml7blupTor6XvvJpcbiAgICAgICAgLy8gMS4g5YaN55SoIHV1aWQg5ou/5LiA5qyh5paw55qEcmVmcmVzaCB0b2tlblxuICAgICAgICAvLyAyLiDmi7/mlrDnmoRyZWZyZXNoIHRva2Vu5o2iYWNjZXNzIHRva2VuXG4gICAgICAgIGNvbnN0IGlzQW5vbnltb3VzID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhsb2dpblR5cGVLZXkpID09PSBMT0dJTlRZUEUuQU5PTllNT1VTO1xuICAgICAgICBpZiAoaXNBbm9ueW1vdXMgJiYgY29kZSA9PT0gJ0lOVkFMSURfUkVGUkVTSF9UT0tFTicpIHtcbiAgICAgICAgICAvLyDojrflj5bmlrDnmoQgcmVmcmVzaCB0b2tlblxuICAgICAgICAgIGNvbnN0IGFub255bW91c191dWlkID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhhbm9ueW1vdXNVdWlkS2V5KTtcbiAgICAgICAgICAvLyDmraTlpIRjYWNoZeS4uuWfuuexu3Byb3BlcnR5XG4gICAgICAgICAgY29uc3QgcmVmcmVzaF90b2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLnNlbmQoJ2F1dGguc2lnbkluQW5vbnltb3VzbHknLCB7XG4gICAgICAgICAgICBhbm9ueW1vdXNfdXVpZCxcbiAgICAgICAgICAgIHJlZnJlc2hfdG9rZW5cbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLl9zZXRSZWZyZXNoVG9rZW4ocmVzLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgICAgIGlmIChyZXRyeU51bSA+PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuKC0tcmV0cnlOdW0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICBjb2RlOiBFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ+mHjeivleiOt+WPliByZWZyZXNoIHRva2VuIOWksei0pSdcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2xvdWRiYXNlLmZpcmUoRVZFTlRTLkxPR0lOX1NUQVRFX0VYUElSRUQpO1xuICAgICAgICBhd2FpdCB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuTkVUV09SS19FUlJPUixcbiAgICAgICAgbXNnOiBgcmVmcmVzaCBhY2Nlc3NfdG9rZW4gZmFpbGVk77yaJHtyZXNwb25zZS5kYXRhLmNvZGV9YFxuICAgICAgfSkpO1xuICAgIH1cbiAgICBpZiAocmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgIGNsb3VkYmFzZS5maXJlKEVWRU5UUy5BQ0NFU1NfVE9LRU5fUkVGUkVTSEQpO1xuICAgICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSwgcmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW4pO1xuICAgICAgLy8g5pys5Zyw5pe26Ze05Y+v6IO95rKh5pyJ5ZCM5q2lXG4gICAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5LCByZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbl9leHBpcmUgKyBEYXRlLm5vdygpKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjY2Vzc1Rva2VuOiByZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbixcbiAgICAgICAgYWNjZXNzVG9rZW5FeHBpcmU6IHJlc3BvbnNlLmRhdGEuYWNjZXNzX3Rva2VuX2V4cGlyZVxuICAgICAgfTtcbiAgICB9XG4gICAgLy8g5Yy/5ZCN55m75b2VcmVmcmVzaF90b2tlbui/h+acn+aDheWGteS4i+i/lOWbnnJlZnJlc2hfdG9rZW5cbiAgICAvLyDmraTlnLrmma/kuIvkvb/nlKjmlrDnmoRyZWZyZXNoX3Rva2Vu6I635Y+WYWNjZXNzX3Rva2VuXG4gICAgaWYgKHJlc3BvbnNlLmRhdGEucmVmcmVzaF90b2tlbikge1xuICAgICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXksIHJlc3BvbnNlLmRhdGEucmVmcmVzaF90b2tlbik7XG4gICAgICBhd2FpdCB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW4oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9mZXRjaEFjY2Vzc1Rva2VuRnJvbU9hdXRoU2VydmVyKHJlZnJlc2hUb2tlbjogc3RyaW5nLCBjbGllbnRJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMuZmV0Y2goJy9hdXRoL3YxL3Rva2VuJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGdyYW50X3R5cGU6ICdyZWZyZXNoX3Rva2VuJyxcbiAgICAgICAgY2xpZW50X2lkOiBjbGllbnRJZCxcbiAgICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuXG4gICAgICB9KVxuICAgIH0pXG4gICAgLy8gUmVzcDpcbiAgICAvLyB7XG4gICAgLy8gICBcInRva2VuX3R5cGVcIjogXCJCZWFyZXJcIixcbiAgICAvLyAgIFwiYWNjZXNzX3Rva2VuXCI6IFwiXCIsXG4gICAgLy8gICBcInJlZnJlc2hfdG9rZW5cIjpcIlwiLFxuICAgIC8vICAgXCJleHBpcmVzX2luXCI6IDI1OTIwMCxcbiAgICAvLyAgIFwic3ViXCI6IFwiXCJcbiAgICAvLyB9XG4gICAgLy8g5Lul5LiL5Luj56CB6YeN5aSNXG4gICAgY29uc3Qgc2VxSWRGcm9tSGVhZGVyID0gcmVzcC5oZWFkZXJzLmdldCgnU2VxSWQnKSB8fCByZXNwLmhlYWRlcnMuZ2V0KCdSZXF1ZXN0SWQnKVxuICAgIGlmIChyZXNwLnN0YXR1cyA+PSA0MDAgJiYgcmVzcC5zdGF0dXMgPCA1MDApIHtcbiAgICAgIGNvbnN0IGJvZHk6IGFueSA9IGF3YWl0IHJlc3AuanNvbigpXG4gICAgICBjb25zdCBzZXFJZCA9IGJvZHkucmVxdWVzdF9pZCB8fCBzZXFJZEZyb21IZWFkZXJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7Z2V0U2RrTmFtZSgpfS8ke2dldFNka1ZlcnNpb24oKX1dW09BdXRoMkF1dGhQcm92aWRlcl1bc3RhdHVzOiR7cmVzcC5zdGF0dXN9XVske2JvZHkuZXJyb3J9KCR7Ym9keS5lcnJvcl9jb2RlfSldICR7Ym9keS5lcnJvcl9kZXNjcmlwdGlvbn0gKCR7c2VxSWR9KWApXG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc3Auc3RhdHVzID49IDUwMCkge1xuICAgICAgY29uc3QgYm9keTogYW55ID0gYXdhaXQgcmVzcC5qc29uKClcbiAgICAgIGNvbnN0IHNlcUlkID0gYm9keS5yZXF1ZXN0X2lkIHx8IHNlcUlkRnJvbUhlYWRlclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHtnZXRTZGtOYW1lKCl9LyR7Z2V0U2RrVmVyc2lvbigpfV1bT0F1dGgyQXV0aFByb3ZpZGVyXVtzdGF0dXM6JHtyZXNwLnN0YXR1c31dWyR7Ym9keS5lcnJvcn0oJHtib2R5LmVycm9yX2NvZGV9KV0gJHtib2R5LmVycm9yX2Rlc2NyaXB0aW9ufSAoJHtzZXFJZH0pYClcbiAgICB9XG4gICAgcmV0dXJuIHJlc3AuanNvbigpXG4gIH1cblxuICAvLyDosIPnlKjmjqXlj6PliLfmlrBhY2Nlc3MgdG9rZW7vvIzlubbkuJTov5Tlm55cbiAgcHJpdmF0ZSBhc3luYyBfcmVmcmVzaEFjY2Vzc1Rva2VuRnJvbU9hdXRoU2VydmVyKGNsaWVudElkOiBzdHJpbmcpOiBQcm9taXNlPElHZXRBY2Nlc3NUb2tlblJlc3VsdD4ge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuRXhwaXJlS2V5LCByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGlmICghcmVmcmVzaFRva2VuKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sXG4gICAgICAgIG1zZzogJ25vdCBsb2dpbidcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMuX2ZldGNoQWNjZXNzVG9rZW5Gcm9tT2F1dGhTZXJ2ZXIocmVmcmVzaFRva2VuLCBjbGllbnRJZCk7XG4gICAgY29uc3QgeyByZWZyZXNoX3Rva2VuOiBuZXdSZWZyZXNoVG9rZW4sIGFjY2Vzc190b2tlbjogYWNjZXNzVG9rZW4sIGV4cGlyZXNfaW46IGFjY2Vzc1Rva2VuRXhwaXJlIH0gPSB0b2tlblxuXG4gICAgLy8g6ZSZ6K+v5aSE55CGXG4gICAgaWYgKCFhY2Nlc3NUb2tlbiB8fCAhYWNjZXNzVG9rZW5FeHBpcmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5ORVRXT1JLX0VSUk9SLFxuICAgICAgICBtc2c6ICdyZWZyZXNoIGFjY2Vzc190b2tlbiBmYWlsZWQnXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmIChhY2Nlc3NUb2tlbiAmJiBhY2Nlc3NUb2tlbkV4cGlyZSkge1xuICAgICAgaWYgKG5ld1JlZnJlc2hUb2tlbiA9PT0gcmVmcmVzaFRva2VuKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5LCBuZXdSZWZyZXNoVG9rZW4pO1xuICAgICAgfVxuICAgICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW4pO1xuICAgICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSwgYWNjZXNzVG9rZW5FeHBpcmUgKiAxMDAwICsgRGF0ZS5ub3coKSk7XG4gICAgICBjbG91ZGJhc2UuZmlyZShFVkVOVFMuQUNDRVNTX1RPS0VOX1JFRlJFU0hEKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjY2Vzc1Rva2VuOiBhY2Nlc3NUb2tlbixcbiAgICAgICAgYWNjZXNzVG9rZW5FeHBpcmU6IGFjY2Vzc1Rva2VuRXhwaXJlXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3NldFJlZnJlc2hUb2tlbihyZWZyZXNoVG9rZW46IHN0cmluZykge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuRXhwaXJlS2V5LCByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgLy8gcmVmcmVzaCB0b2tlbuiuvue9ruWJje+8jOWFiOa4heaOiSBhY2Nlc3MgdG9rZW5cbiAgICAvLyDorr7nva7mmK/nm7TmjqXmi4nlj5bmlrAgYWNjZXNzIHRva2VuIOimhueblu+8jOiAjOS4jeaYryByZW1vdmVcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5KTtcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSwgcmVmcmVzaFRva2VuKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZ2V0RGV2aWNlSWQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCB7IGRldmljZUlkS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzXG4gICAgY29uc3QgZGV2aWNlSWQgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGRldmljZUlkS2V5KVxuXG4gICAgaWYgKCFkZXZpY2VJZCkge1xuICAgICAgLy8gY29uc3QgZnAgPSBhd2FpdCBmcFByb21pc2VcbiAgICAgIC8vIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZwLmdldCgpXG4gICAgICAvLyBjb25zdCBkZXZpY2VJZCA9IHJlc3VsdC52aXNpdG9ySWRcbiAgICAgIGNvbnN0IG5ld0RldmljZUlkID0gdXVpZHY0KClcbiAgICAgIHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoZGV2aWNlSWRLZXksIG5ld0RldmljZUlkKVxuICAgICAgcmV0dXJuIG5ld0RldmljZUlkXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIGRldmljZUlkXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjaGVja0Zyb21BdXRoVjIoKSB7XG4gICAgLy8gY29uc3QgYXV0aEluc3RhbmNlID0gdGhpcy5fZnJvbUFwcC5hdXRoSW5zdGFuY2VcbiAgICBjb25zdCBvYXV0aEluc3RhbmNlID0gdGhpcy5fZnJvbUFwcC5vYXV0aEluc3RhbmNlIHx8ICh0aGlzLl9mcm9tQXBwIGFzIGFueSkub2F1dGgoKVxuICAgIC8vIGNvbnN0IGF1dGhMb2dpbiA9IGF1dGhJbnN0YW5jZSAmJiBhd2FpdCBhdXRoSW5zdGFuY2UuZ2V0TG9naW5TdGF0ZSgpXG4gICAgLy8gY29uc29sZS5sb2coJ2F1dGhMb2dpbicsIGF1dGhMb2dpbilcbiAgICAvLyBpZiAoYXV0aExvZ2luKSB7XG4gICAgLy8gICByZXR1cm4gJ2F1dGgnXG4gICAgLy8gfVxuICAgIGNvbnN0IG9hdXRoTG9naW4gPSBvYXV0aEluc3RhbmNlICYmIGF3YWl0IG9hdXRoSW5zdGFuY2UuaGFzTG9naW5TdGF0ZSgpXG4gICAgaWYgKG9hdXRoTG9naW4pIHtcbiAgICAgIHJldHVybiAnb2F1dGgnXG4gICAgfVxuICAgIHJldHVybiAnJ1xuICB9XG59XG5cbmNvbnN0IHJlcXVlc3RNYXA6IEtWPENsb3VkYmFzZVJlcXVlc3Q+ID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0UmVxdWVzdChjb25maWc6IElDbG91ZGJhc2VSZXF1ZXN0Q29uZmlnKSB7XG4gIHJlcXVlc3RNYXBbY29uZmlnLmVudl0gPSBuZXcgQ2xvdWRiYXNlUmVxdWVzdCh7XG4gICAgLi4uY29uZmlnLFxuICAgIHRocm93OiB0cnVlXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVxdWVzdEJ5RW52SWQoZW52OiBzdHJpbmcpOiBDbG91ZGJhc2VSZXF1ZXN0IHtcbiAgcmV0dXJuIHJlcXVlc3RNYXBbZW52XTtcbn0iXX0=