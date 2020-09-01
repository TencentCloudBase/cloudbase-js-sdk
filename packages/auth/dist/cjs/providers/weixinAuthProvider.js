"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.WeixinAuthProvider = void 0;
var base_1 = require("./base");
var utilities_1 = require("@cloudbase/utilities/");
var __1 = require("..");
var constants_1 = require("../constants");
var getSdkName = utilities_1.constants.getSdkName, ERRORS = utilities_1.constants.ERRORS, COMMUNITY_SITE_URL = utilities_1.constants.COMMUNITY_SITE_URL;
var RUNTIME = utilities_1.adapters.RUNTIME;
var getQuery = utilities_1.utils.getQuery, getHash = utilities_1.utils.getHash, removeParam = utilities_1.utils.removeParam, printWarn = utilities_1.utils.printWarn;
var catchErrorsDecorator = utilities_1.helpers.catchErrorsDecorator;
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
                        __1.eventBus.fire(__1.EVENTS.LOGIN_STATE_CHANGED);
                        __1.eventBus.fire(__1.EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this._config.env,
                            loginType: constants_1.LOGINTYPE.WECHAT,
                            persistence: this._config.persistence
                        });
                        return [4, this.refreshUserInfo()];
                    case 7:
                        _b.sent();
                        loginState = new __1.LoginState({
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
                action = 'auth.signIn';
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
    __decorate([
        catchErrorsDecorator({
            title: '跳转微信公众号授权失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().weixinAuthProvider().signInWithRedirect() 的语法或参数是否正确',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], WeixinAuthProvider.prototype, "signInWithRedirect", null);
    __decorate([
        catchErrorsDecorator({
            title: '微信公众号登录失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().weixinAuthProvider().getRedirectResult() 的语法或参数是否正确',
                '  2 - 当前环境是否开通了微信公众号登录授权',
                '  3 - 微信公众号的 AppId 与 AppSecret 配置是否正确',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], WeixinAuthProvider.prototype, "getRedirectResult", null);
    __decorate([
        catchErrorsDecorator({
            title: '获取微信重定向绑定结果',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().weixinAuthProvider().getLinkRedirectResult() 的语法或参数是否正确',
                '  2 - 当前环境是否开通了微信公众号登录授权',
                '  3 - 微信公众号的 AppId 与 AppSecret 配置是否正确',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], WeixinAuthProvider.prototype, "getLinkRedirectResult", null);
    return WeixinAuthProvider;
}(base_1.AuthProvider));
exports.WeixinAuthProvider = WeixinAuthProvider;
function getWeixinCode() {
    return getQuery('code') || getHash('code');
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VpeGluQXV0aFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy93ZWl4aW5BdXRoUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUFzQztBQUl0QyxtREFBMkU7QUFDM0Usd0JBQWtEO0FBQ2xELDBDQUF5QztBQUVqQyxJQUFBLFVBQVUsR0FBaUMscUJBQVMsV0FBMUMsRUFBRSxNQUFNLEdBQXlCLHFCQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUsscUJBQVMsbUJBQWQsQ0FBZTtBQUNyRCxJQUFBLE9BQU8sR0FBSyxvQkFBUSxRQUFiLENBQWM7QUFDckIsSUFBQSxRQUFRLEdBQXNDLGlCQUFLLFNBQTNDLEVBQUUsT0FBTyxHQUE2QixpQkFBSyxRQUFsQyxFQUFFLFdBQVcsR0FBZ0IsaUJBQUssWUFBckIsRUFBRSxTQUFTLEdBQUssaUJBQUssVUFBVixDQUFXO0FBQ3BELElBQUEsb0JBQW9CLEdBQUssbUJBQU8scUJBQVosQ0FBYTtBQUV6QztJQUF3QyxzQ0FBWTtJQU1sRCw0QkFBWSxNQUE2RixFQUFFLEtBQWEsRUFBRSxLQUFhLEVBQUUsS0FBYztRQUF2SixZQUNFLGtCQUFNLE1BQU0sQ0FBQyxTQU1kO1FBSkMsS0FBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQy9CLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxJQUFJLFFBQVEsQ0FBQzs7SUFDbEMsQ0FBQztJQUVZLG1DQUFNLEdBQW5COzs7Z0JBQ0UsV0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBQyx1RUFBdUUsQ0FBQyxFQUFDOzs7S0FDakg7SUFTWSwrQ0FBa0IsR0FBL0I7OztnQkFDRSxXQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBQzs7O0tBQ3pCO0lBV1ksOENBQWlCLEdBQTlCLFVBQStCLE9BQXlEOzs7O2dCQUNoRixJQUFJLEdBQUcsYUFBYSxFQUFFLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1QsV0FBTyxJQUFJLEVBQUM7aUJBQ2I7Z0JBQ0QsV0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBQyxPQUFPLENBQUMsRUFBQzs7O0tBQzNDO0lBV0ssa0RBQXFCLEdBQTNCLFVBQTRCLE9BQXVDO1FBQXZDLHdCQUFBLEVBQUEsWUFBdUM7Ozs7Z0JBQ3pELEtBQXdCLE9BQU8sWUFBWixFQUFuQixXQUFXLG1CQUFHLEtBQUssS0FBQSxDQUFhO2dCQUNsQyxJQUFJLEdBQUcsYUFBYSxFQUFFLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1QsV0FBTyxJQUFJLEVBQUM7aUJBQ2I7Z0JBQ2UsS0FBSyxHQUFLLElBQUksT0FBVCxDQUFVO2dCQUN6QixTQUFTLEdBQUcsQ0FBQyxVQUFBLEtBQUs7b0JBQ3RCLFFBQVEsS0FBSyxFQUFFO3dCQUNiLEtBQUssY0FBYzs0QkFDakIsT0FBTyxhQUFhLENBQUM7d0JBQ3ZCOzRCQUNFLE9BQU8sZUFBZSxDQUFDO3FCQUMxQjtnQkFDSCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ1YsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7Z0JBQ2xFLFdBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUU7d0JBQ25ELE9BQU8sRUFBRTs0QkFDUCxLQUFLLE9BQUE7NEJBQ0wsU0FBUyxXQUFBOzRCQUNULElBQUksTUFBQTs0QkFDSixhQUFhLGVBQUE7NEJBQ2IsV0FBVyxhQUFBO3lCQUNaO3FCQUNGLENBQUMsRUFBQzs7O0tBQ0o7SUFFTyxzQ0FBUyxHQUFqQjtRQUNFLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV0QyxJQUFJLElBQUksR0FBRywrQ0FBK0MsQ0FBQztRQUMzRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssY0FBYyxFQUFFO1lBQ2xDLElBQUksR0FBRyx3Q0FBd0MsQ0FBQztTQUNqRDtRQUNELElBQUc7WUFDRCxRQUFRLENBQUMsSUFBSSxHQUFNLElBQUksZUFBVSxJQUFJLENBQUMsTUFBTSxzQkFBaUIsT0FBTyxrQ0FBNkIsSUFBSSxDQUFDLE1BQU0sZUFBVSxJQUFJLENBQUMsTUFBTSxxQkFBa0IsQ0FBQztTQUNySjtRQUFBLE9BQU0sQ0FBQyxFQUFDO1lBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFJLFVBQVUsRUFBRSxVQUFLLE1BQU0sQ0FBQyxZQUFZLFNBQUksQ0FBRyxDQUFDLENBQUE7U0FDakU7SUFDSCxDQUFDO0lBRWEsNENBQWUsR0FBN0IsVUFBOEIsSUFBVyxFQUFDLE9BQU87Ozs7Ozt3QkFDekMsS0FBNEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQTFFLGNBQWMsb0JBQUEsRUFBRSxvQkFBb0IsMEJBQUEsRUFBRSxlQUFlLHFCQUFBLENBQXNCO3dCQUU3RSxTQUFTLEdBQUcsQ0FBQyxVQUFBLEtBQUs7NEJBQ3RCLFFBQVEsS0FBSyxFQUFFO2dDQUNiLEtBQUssY0FBYztvQ0FDakIsT0FBTyxhQUFhLENBQUM7Z0NBQ3ZCO29DQUNFLE9BQU8sZUFBZSxDQUFDOzZCQUMxQjt3QkFDSCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBRVEsV0FBTSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFDLE9BQU8sQ0FBQyxFQUFBOzt3QkFBM0YsZUFBZSxHQUFHLFNBQXlFO3dCQUN6RixZQUFZLEdBQUssZUFBZSxhQUFwQixDQUFxQjt3QkFHekMsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLEVBQUE7O3dCQUE5RCxTQUE4RCxDQUFDOzZCQUMzRCxlQUFlLENBQUMsV0FBVyxFQUEzQixjQUEyQjt3QkFDN0IsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLFdBQVcsQ0FBQyxFQUFBOzt3QkFBNUUsU0FBNEUsQ0FBQzs7OzZCQUUzRSxlQUFlLENBQUMsaUJBQWlCLEVBQWpDLGNBQWlDO3dCQUNuQyxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLG9CQUFvQixFQUFFLE1BQU0sQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBQTs7d0JBQTdHLFNBQTZHLENBQUM7Ozt3QkFFaEgsWUFBUSxDQUFDLElBQUksQ0FBQyxVQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQzt3QkFFMUMsWUFBUSxDQUFDLElBQUksQ0FBQyxVQUFNLENBQUMsa0JBQWtCLEVBQUU7NEJBQ3ZDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7NEJBQ3JCLFNBQVMsRUFBRSxxQkFBUyxDQUFDLE1BQU07NEJBQzNCLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7eUJBQ3RDLENBQUMsQ0FBQzt3QkFDSCxXQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBQTs7d0JBQTVCLFNBQTRCLENBQUM7d0JBQ3ZCLFVBQVUsR0FBRyxJQUFJLGNBQVUsQ0FBQzs0QkFDaEMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzs0QkFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNOzRCQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7eUJBQ3ZCLENBQUMsQ0FBQzt3QkFDSCxXQUFNLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxFQUFBOzt3QkFBdkMsU0FBdUMsQ0FBQzt3QkFFeEMsV0FBTyxVQUFVLEVBQUM7Ozs7S0FDbkI7SUFFYSxxREFBd0IsR0FBdEMsVUFDRSxLQUFhLEVBQ2IsU0FBaUIsRUFDakIsSUFBWSxFQUNaLE9BQWlCO1FBQWpCLHdCQUFBLEVBQUEsWUFBaUI7Ozs7Z0JBRVQsS0FBMkMsT0FBTyxZQUEvQixFQUFuQixXQUFXLG1CQUFHLEtBQUssS0FBQSxFQUFFLEtBQXNCLE9BQU8sV0FBWixFQUFqQixVQUFVLG1CQUFHLElBQUksS0FBQSxDQUFhO2dCQUVyRCxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksSUFBSSxLQUFLLENBQUM7Z0JBRXJGLE1BQU0sR0FBRyxhQUFhLENBQUM7Z0JBQ3ZCLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUNsRSxXQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDaEMsS0FBSyxPQUFBO3dCQUNMLFNBQVMsV0FBQTt3QkFDVCxhQUFhLGVBQUE7d0JBQ2IsWUFBWSxjQUFBO3dCQUNaLGVBQWUsRUFBRSxJQUFJO3dCQUNyQixXQUFXLGFBQUE7d0JBQ1gsVUFBVSxZQUFBO3FCQUNYLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO3dCQUNULElBQUksR0FBRyxDQUFDLElBQUksRUFBRTs0QkFDWixNQUFNLElBQUksS0FBSyxDQUFDLE1BQUksVUFBVSxFQUFFLFVBQUssTUFBTSxDQUFDLGNBQWMsbUNBQThCLEdBQUcsQ0FBQyxJQUFNLENBQUMsQ0FBQzt5QkFDckc7d0JBQ0QsSUFBSSxHQUFHLENBQUMsYUFBYSxFQUFFOzRCQUNyQixPQUFPO2dDQUNMLFlBQVksRUFBRSxHQUFHLENBQUMsYUFBYTtnQ0FDL0IsV0FBVyxFQUFFLEdBQUcsQ0FBQyxZQUFZO2dDQUM3QixpQkFBaUIsRUFBRSxHQUFHLENBQUMsbUJBQW1COzZCQUMzQyxDQUFDO3lCQUNIOzZCQUFNOzRCQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBSSxVQUFVLEVBQUUsVUFBSyxNQUFNLENBQUMsY0FBYyw0Q0FBeUMsQ0FBQyxDQUFDO3lCQUN0RztvQkFDSCxDQUFDLENBQUMsRUFBQzs7O0tBQ0o7SUFwSkQ7UUFSQyxvQkFBb0IsQ0FBQztZQUNwQixLQUFLLEVBQUUsYUFBYTtZQUNwQixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVixzRUFBc0U7Z0JBQ3RFLGlLQUE2QixrQkFBb0I7YUFDbEQ7U0FDRixDQUFDOzs7O2dFQUdEO0lBV0Q7UUFWQyxvQkFBb0IsQ0FBQztZQUNwQixLQUFLLEVBQUUsV0FBVztZQUNsQixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVixxRUFBcUU7Z0JBQ3JFLDBCQUEwQjtnQkFDMUIsdUNBQXVDO2dCQUN2QyxpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7OzsrREFPRDtJQVdEO1FBVkMsb0JBQW9CLENBQUM7WUFDcEIsS0FBSyxFQUFFLGFBQWE7WUFDcEIsUUFBUSxFQUFFO2dCQUNSLFVBQVU7Z0JBQ1YseUVBQXlFO2dCQUN6RSwwQkFBMEI7Z0JBQzFCLHVDQUF1QztnQkFDdkMsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7bUVBMEJEO0lBOEZILHlCQUFDO0NBQUEsQUEvS0QsQ0FBd0MsbUJBQVksR0ErS25EO0FBL0tZLGdEQUFrQjtBQWlML0IsU0FBUyxhQUFhO0lBQ3BCLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQXV0aENvbmZpZyB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvYXV0aCc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ2FjaGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NhY2hlJztcbmltcG9ydCB7IElDbG91ZGJhc2VSZXF1ZXN0IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9yZXF1ZXN0JztcbmltcG9ydCB7IGNvbnN0YW50cywgYWRhcHRlcnMsdXRpbHMsIGhlbHBlcnMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcy8nO1xuaW1wb3J0IHsgZXZlbnRCdXMsIEVWRU5UUywgTG9naW5TdGF0ZSB9IGZyb20gJy4uJztcbmltcG9ydCB7IExPR0lOVFlQRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5cbmNvbnN0IHsgZ2V0U2RrTmFtZSwgRVJST1JTLCBDT01NVU5JVFlfU0lURV9VUkwgfSA9IGNvbnN0YW50cztcbmNvbnN0IHsgUlVOVElNRSB9ID0gYWRhcHRlcnM7XG5jb25zdCB7IGdldFF1ZXJ5LCBnZXRIYXNoLCByZW1vdmVQYXJhbSwgcHJpbnRXYXJuIH0gPSB1dGlscztcbmNvbnN0IHsgY2F0Y2hFcnJvcnNEZWNvcmF0b3IgfSA9IGhlbHBlcnM7XG5cbmV4cG9ydCBjbGFzcyBXZWl4aW5BdXRoUHJvdmlkZXIgZXh0ZW5kcyBBdXRoUHJvdmlkZXIge1xuICBwcml2YXRlIHJlYWRvbmx5IF9zY29wZTogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IF9zdGF0ZTogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hcHBpZDogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IF9ydW50aW1lOnN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IElDbG91ZGJhc2VBdXRoQ29uZmlnJntjYWNoZTpJQ2xvdWRiYXNlQ2FjaGUscmVxdWVzdDpJQ2xvdWRiYXNlUmVxdWVzdCxydW50aW1lOnN0cmluZ30sIGFwcGlkOiBzdHJpbmcsIHNjb3BlOiBzdHJpbmcsIHN0YXRlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoY29uZmlnKTtcblxuICAgIHRoaXMuX3J1bnRpbWUgPSBjb25maWcucnVudGltZTtcbiAgICB0aGlzLl9hcHBpZCA9IGFwcGlkO1xuICAgIHRoaXMuX3Njb3BlID0gc2NvcGU7XG4gICAgdGhpcy5fc3RhdGUgPSBzdGF0ZSB8fCAnd2VpeGluJztcbiAgfVxuICBcbiAgcHVibGljIGFzeW5jIHNpZ25Jbigpe1xuICAgIHJldHVybiBwcmludFdhcm4oRVJST1JTLk9QRVJBVElPTl9GQUlMLCdBUEkgc2lnbkluIGhhcyBiZWVuIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2Ugc2lnbkluV2l0aFJlZGlyZWN0IGluc3RlZWQnKTtcbiAgfVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6Lez6L2s5b6u5L+h5YWs5LyX5Y+35o6I5p2D5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS53ZWl4aW5BdXRoUHJvdmlkZXIoKS5zaWduSW5XaXRoUmVkaXJlY3QoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBzaWduSW5XaXRoUmVkaXJlY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlZGlyZWN0KCk7XG4gIH1cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+W+ruS/oeWFrOS8l+WPt+eZu+W9leWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkud2VpeGluQXV0aFByb3ZpZGVyKCkuZ2V0UmVkaXJlY3RSZXN1bHQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huW+ruS/oeWFrOS8l+WPt+eZu+W9leaOiOadgycsXG4gICAgICAnICAzIC0g5b6u5L+h5YWs5LyX5Y+355qEIEFwcElkIOS4jiBBcHBTZWNyZXQg6YWN572u5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0UmVkaXJlY3RSZXN1bHQob3B0aW9uczp7IHdpdGhVbmlvbklkPzogYm9vbGVhbjsgc3luY1VzZXJJbmZvPzogYm9vbGVhbiB9KSB7XG4gICAgY29uc3QgY29kZSA9IGdldFdlaXhpbkNvZGUoKTtcbiAgICBpZiAoIWNvZGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fc2lnbkluV2l0aENvZGUoY29kZSxvcHRpb25zKTtcbiAgfVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W5b6u5L+h6YeN5a6a5ZCR57uR5a6a57uT5p6cJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS53ZWl4aW5BdXRoUHJvdmlkZXIoKS5nZXRMaW5rUmVkaXJlY3RSZXN1bHQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huW+ruS/oeWFrOS8l+WPt+eZu+W9leaOiOadgycsXG4gICAgICAnICAzIC0g5b6u5L+h5YWs5LyX5Y+355qEIEFwcElkIOS4jiBBcHBTZWNyZXQg6YWN572u5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBhc3luYyBnZXRMaW5rUmVkaXJlY3RSZXN1bHQob3B0aW9uczogeyB3aXRoVW5pb25JZD86IGJvb2xlYW4gfSA9IHt9KSB7XG4gICAgY29uc3QgeyB3aXRoVW5pb25JZCA9IGZhbHNlIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IGNvZGUgPSBnZXRXZWl4aW5Db2RlKCk7XG4gICAgaWYgKCFjb2RlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgeyBfYXBwaWQ6IGFwcGlkIH0gPSB0aGlzO1xuICAgIGNvbnN0IGxvZ2luVHlwZSA9IChzY29wZSA9PiB7XG4gICAgICBzd2l0Y2ggKHNjb3BlKSB7XG4gICAgICAgIGNhc2UgJ3Nuc2FwaV9sb2dpbic6XG4gICAgICAgICAgcmV0dXJuICdXRUNIQVQtT1BFTic7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuICdXRUNIQVQtUFVCTElDJztcbiAgICAgIH1cbiAgICB9KSh0aGlzLl9zY29wZSk7XG4gICAgY29uc3QgaHlicmlkTWluaWFwcCA9IHRoaXMuX3J1bnRpbWUgPT09IFJVTlRJTUUuV1hfTVAgPyAnMScgOiAnMCc7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5saW5rV2l0aFdlaXhpbkNvZGUnLCB7IFxuICAgICAgcGF5bG9hZDogeyBcbiAgICAgICAgYXBwaWQsIFxuICAgICAgICBsb2dpblR5cGUsIFxuICAgICAgICBjb2RlLCBcbiAgICAgICAgaHlicmlkTWluaWFwcCwgXG4gICAgICAgIHdpdGhVbmlvbklkXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9yZWRpcmVjdCgpOiBhbnkge1xuICAgIGxldCBjdXJyVXJsID0gcmVtb3ZlUGFyYW0oJ2NvZGUnLCBsb2NhdGlvbi5ocmVmKTtcbiAgICBjdXJyVXJsID0gcmVtb3ZlUGFyYW0oJ3N0YXRlJywgY3VyclVybCk7XG4gICAgY3VyclVybCA9IGVuY29kZVVSSUNvbXBvbmVudChjdXJyVXJsKTtcblxuICAgIGxldCBob3N0ID0gJy8vb3Blbi53ZWl4aW4ucXEuY29tL2Nvbm5lY3Qvb2F1dGgyL2F1dGhvcml6ZSc7XG4gICAgaWYgKHRoaXMuX3Njb3BlID09PSAnc25zYXBpX2xvZ2luJykge1xuICAgICAgaG9zdCA9ICcvL29wZW4ud2VpeGluLnFxLmNvbS9jb25uZWN0L3FyY29ubmVjdCc7XG4gICAgfVxuICAgIHRyeXtcbiAgICAgIGxvY2F0aW9uLmhyZWYgPSBgJHtob3N0fT9hcHBpZD0ke3RoaXMuX2FwcGlkfSZyZWRpcmVjdF91cmk9JHtjdXJyVXJsfSZyZXNwb25zZV90eXBlPWNvZGUmc2NvcGU9JHt0aGlzLl9zY29wZX0mc3RhdGU9JHt0aGlzLl9zdGF0ZX0jd2VjaGF0X3JlZGlyZWN0YDtcbiAgICB9Y2F0Y2goZSl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFske2dldFNka05hbWUoKX1dWyR7RVJST1JTLlVOS09XTl9FUlJPUn1dJHtlfWApXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfc2lnbkluV2l0aENvZGUoY29kZTpzdHJpbmcsb3B0aW9ucykge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuRXhwaXJlS2V5LCByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgLy8g5pyJY29kZe+8jOeUqGNvZGXmjaJyZWZyZXNoIHRva2VuXG4gICAgY29uc3QgbG9naW5UeXBlID0gKHNjb3BlID0+IHtcbiAgICAgIHN3aXRjaCAoc2NvcGUpIHtcbiAgICAgICAgY2FzZSAnc25zYXBpX2xvZ2luJzpcbiAgICAgICAgICByZXR1cm4gJ1dFQ0hBVC1PUEVOJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gJ1dFQ0hBVC1QVUJMSUMnO1xuICAgICAgfVxuICAgIH0pKHRoaXMuX3Njb3BlKTtcblxuICAgIGNvbnN0IHJlZnJlc2hUb2tlblJlcyA9IGF3YWl0IHRoaXMuX2dldFJlZnJlc2hUb2tlbkJ5V1hDb2RlKHRoaXMuX2FwcGlkLCBsb2dpblR5cGUsIGNvZGUsb3B0aW9ucyk7XG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW4gfSA9IHJlZnJlc2hUb2tlblJlcztcblxuICAgIC8vIOacrOWcsOWtmOS4i1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5LCByZWZyZXNoVG9rZW4pO1xuICAgIGlmIChyZWZyZXNoVG9rZW5SZXMuYWNjZXNzVG9rZW4pIHtcbiAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXksIHJlZnJlc2hUb2tlblJlcy5hY2Nlc3NUb2tlbik7XG4gICAgfVxuICAgIGlmIChyZWZyZXNoVG9rZW5SZXMuYWNjZXNzVG9rZW5FeHBpcmUpIHtcbiAgICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXksIFN0cmluZyhyZWZyZXNoVG9rZW5SZXMuYWNjZXNzVG9rZW5FeHBpcmUgKyBEYXRlLm5vdygpKSk7XG4gICAgfVxuICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQpO1xuICAgIC8vIOaKm+WHuueZu+W9leexu+Wei+abtOaUueS6i+S7tlxuICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCwgeyBcbiAgICAgIGVudjogdGhpcy5fY29uZmlnLmVudixcbiAgICAgIGxvZ2luVHlwZTogTE9HSU5UWVBFLldFQ0hBVCwgXG4gICAgICBwZXJzaXN0ZW5jZTogdGhpcy5fY29uZmlnLnBlcnNpc3RlbmNlIFxuICAgIH0pO1xuICAgIGF3YWl0IHRoaXMucmVmcmVzaFVzZXJJbmZvKCk7XG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgIH0pO1xuICAgIGF3YWl0IGxvZ2luU3RhdGUuY2hlY2tMb2NhbFN0YXRlQXN5bmMoKTtcbiAgICBcbiAgICByZXR1cm4gbG9naW5TdGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2dldFJlZnJlc2hUb2tlbkJ5V1hDb2RlKFxuICAgIGFwcGlkOiBzdHJpbmcsIFxuICAgIGxvZ2luVHlwZTogc3RyaW5nLCBcbiAgICBjb2RlOiBzdHJpbmcsXG4gICAgb3B0aW9uczogYW55ID0ge31cbiAgKTogUHJvbWlzZTx7IHJlZnJlc2hUb2tlbjogc3RyaW5nOyBhY2Nlc3NUb2tlbjogc3RyaW5nOyBhY2Nlc3NUb2tlbkV4cGlyZTogbnVtYmVyIH0+IHtcbiAgICBjb25zdCB7IHdpdGhVbmlvbklkID0gZmFsc2UsIGNyZWF0ZVVzZXIgPSB0cnVlIH0gPSBvcHRpb25zO1xuICAgIC8vIHNuc2FwaV91c2VyaW5mbyDlkowgc25zYXBpX2xvZ2luIOaJjeWPr+S7peiOt+WPlueUqOaIt+eahOW+ruS/oeS/oeaBr1xuICAgIGNvbnN0IHN5bmNVc2VySW5mbyA9IHRoaXMuX3Njb3BlID09PSAnc25zYXBpX2Jhc2UnID8gZmFsc2UgOiBvcHRpb25zLnN5bmNVc2VySW5mbyB8fCBmYWxzZTtcblxuICAgIGNvbnN0IGFjdGlvbiA9ICdhdXRoLnNpZ25Jbic7XG4gICAgY29uc3QgaHlicmlkTWluaWFwcCA9IHRoaXMuX3J1bnRpbWUgPT09IFJVTlRJTUUuV1hfTVAgPyAnMScgOiAnMCc7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZChhY3Rpb24sIHsgXG4gICAgICBhcHBpZCwgXG4gICAgICBsb2dpblR5cGUsIFxuICAgICAgaHlicmlkTWluaWFwcCxcbiAgICAgIHN5bmNVc2VySW5mbyxcbiAgICAgIGxvZ2luQ3JlZGVudGlhbDogY29kZSxcbiAgICAgIHdpdGhVbmlvbklkLFxuICAgICAgY3JlYXRlVXNlclxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXMuY29kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFske2dldFNka05hbWUoKX1dWyR7RVJST1JTLk9QRVJBVElPTl9GQUlMfV0gZmFpbGVkIGxvZ2luIHZpYSB3ZWNoYXQ6ICR7cmVzLmNvZGV9YCk7XG4gICAgICB9XG4gICAgICBpZiAocmVzLnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByZWZyZXNoVG9rZW46IHJlcy5yZWZyZXNoX3Rva2VuLFxuICAgICAgICAgIGFjY2Vzc1Rva2VuOiByZXMuYWNjZXNzX3Rva2VuLFxuICAgICAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlOiByZXMuYWNjZXNzX3Rva2VuX2V4cGlyZVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHtnZXRTZGtOYW1lKCl9XVske0VSUk9SUy5PUEVSQVRJT05fRkFJTH1dIGFjdGlvbjpnZXRKd3Qgbm90IHJldHVybiByZWZyZXNoVG9rZW5gKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRXZWl4aW5Db2RlICgpIHtcbiAgcmV0dXJuIGdldFF1ZXJ5KCdjb2RlJykgfHwgZ2V0SGFzaCgnY29kZScpO1xufTsiXX0=