var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { AuthProvider } from './base';
import { constants, adapters, utils } from '@cloudbase/utilities/';
import { eventBus, EVENTS, LoginState } from '..';
import { LOGINTYPE } from '../constants';
var getSdkName = constants.getSdkName, ERRORS = constants.ERRORS;
var RUNTIME = adapters.RUNTIME;
var getQuery = utils.getQuery, getHash = utils.getHash, removeParam = utils.removeParam, printWarn = utils.printWarn;
var WeixinAuthProvider = (function (_super) {
    __extends(WeixinAuthProvider, _super);
    function WeixinAuthProvider(config, appid, scope, state) {
        var _this = _super.call(this, config) || this;
        _this._runtime = config.runtime;
        _this._appid = appid;
        _this._scope = scope;
        _this._state = state || 'weixin';
        return _this;
    }
    WeixinAuthProvider.prototype.signIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, printWarn(ERRORS.OPERATION_FAIL, 'API signIn has been deprecated, please use signInWithRedirect insteed')];
            });
        });
    };
    WeixinAuthProvider.prototype.signInWithRedirect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._redirect()];
            });
        });
    };
    WeixinAuthProvider.prototype.getRedirectResult = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var code;
            return __generator(this, function (_a) {
                code = getWeixinCode();
                if (!code) {
                    return [2, null];
                }
                return [2, this._signInWithCode(code, options)];
            });
        });
    };
    WeixinAuthProvider.prototype.getLinkRedirectResult = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, withUnionId, code, appid, loginType, hybridMiniapp;
            return __generator(this, function (_b) {
                _a = options.withUnionId, withUnionId = _a === void 0 ? false : _a;
                code = getWeixinCode();
                if (!code) {
                    return [2, null];
                }
                appid = this._appid;
                loginType = (function (scope) {
                    switch (scope) {
                        case 'snsapi_login':
                            return 'WECHAT-OPEN';
                        default:
                            return 'WECHAT-PUBLIC';
                    }
                })(this._scope);
                hybridMiniapp = this._runtime === RUNTIME.WX_MP ? '1' : '0';
                return [2, this._request.send('auth.linkWithWeixinCode', {
                        payload: {
                            appid: appid,
                            loginType: loginType,
                            code: code,
                            hybridMiniapp: hybridMiniapp,
                            withUnionId: withUnionId
                        }
                    })];
            });
        });
    };
    WeixinAuthProvider.prototype._redirect = function () {
        var currUrl = removeParam('code', location.href);
        currUrl = removeParam('state', currUrl);
        currUrl = encodeURIComponent(currUrl);
        var host = '//open.weixin.qq.com/connect/oauth2/authorize';
        if (this._scope === 'snsapi_login') {
            host = '//open.weixin.qq.com/connect/qrconnect';
        }
        try {
            location.href = host + "?appid=" + this._appid + "&redirect_uri=" + currUrl + "&response_type=code&scope=" + this._scope + "&state=" + this._state + "#wechat_redirect";
        }
        catch (e) {
            throw new Error("[" + getSdkName() + "][" + ERRORS.UNKOWN_ERROR + "]" + e);
        }
    };
    WeixinAuthProvider.prototype._signInWithCode = function (code, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accessTokenKey, accessTokenExpireKey, refreshTokenKey, loginType, refreshTokenRes, refreshToken, loginState;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._cache.keys, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey, refreshTokenKey = _a.refreshTokenKey;
                        loginType = (function (scope) {
                            switch (scope) {
                                case 'snsapi_login':
                                    return 'WECHAT-OPEN';
                                default:
                                    return 'WECHAT-PUBLIC';
                            }
                        })(this._scope);
                        return [4, this._getRefreshTokenByWXCode(this._appid, loginType, code, options)];
                    case 1:
                        refreshTokenRes = _b.sent();
                        refreshToken = refreshTokenRes.refreshToken;
                        return [4, this._cache.setStoreAsync(refreshTokenKey, refreshToken)];
                    case 2:
                        _b.sent();
                        if (!refreshTokenRes.accessToken) return [3, 4];
                        return [4, this._cache.setStoreAsync(accessTokenKey, refreshTokenRes.accessToken)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!refreshTokenRes.accessTokenExpire) return [3, 6];
                        return [4, this._cache.setStoreAsync(accessTokenExpireKey, String(refreshTokenRes.accessTokenExpire + Date.now()))];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        eventBus.fire(EVENTS.LOGIN_STATE_CHANGED);
                        eventBus.fire(EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this._config.env,
                            loginType: LOGINTYPE.WECHAT,
                            persistence: this._config.persistence
                        });
                        return [4, this.refreshUserInfo()];
                    case 7:
                        _b.sent();
                        loginState = new LoginState({
                            envId: this._config.env,
                            cache: this._cache,
                            request: this._request
                        });
                        return [4, loginState.checkLocalStateAsync()];
                    case 8:
                        _b.sent();
                        return [2, loginState];
                }
            });
        });
    };
    WeixinAuthProvider.prototype._getRefreshTokenByWXCode = function (appid, loginType, code, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, withUnionId, _b, createUser, syncUserInfo, action, hybridMiniapp;
            return __generator(this, function (_c) {
                _a = options.withUnionId, withUnionId = _a === void 0 ? false : _a, _b = options.createUser, createUser = _b === void 0 ? true : _b;
                syncUserInfo = this._scope === 'snsapi_base' ? false : options.syncUserInfo || false;
                action = 'auth.getJwt';
                hybridMiniapp = this._runtime === RUNTIME.WX_MP ? '1' : '0';
                return [2, this._request.send(action, {
                        appid: appid,
                        loginType: loginType,
                        hybridMiniapp: hybridMiniapp,
                        syncUserInfo: syncUserInfo,
                        loginCredential: code,
                        withUnionId: withUnionId,
                        createUser: createUser
                    }).then(function (res) {
                        if (res.code) {
                            throw new Error("[" + getSdkName() + "][" + ERRORS.OPERATION_FAIL + "] failed login via wechat: " + res.code);
                        }
                        if (res.refresh_token) {
                            return {
                                refreshToken: res.refresh_token,
                                accessToken: res.access_token,
                                accessTokenExpire: res.access_token_expire
                            };
                        }
                        else {
                            throw new Error("[" + getSdkName() + "][" + ERRORS.OPERATION_FAIL + "] action:getJwt not return refreshToken");
                        }
                    })];
            });
        });
    };
    return WeixinAuthProvider;
}(AuthProvider));
export { WeixinAuthProvider };
function getWeixinCode() {
    return getQuery('code') || getHash('code');
}
;
