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
exports.registerProvider = exports.registerAuth = exports.eventBus = exports.EVENTS = exports.AuthProvider = exports.Auth = exports.LoginState = void 0;
var utilities_1 = require("@cloudbase/utilities");
var weixinAuthProvider_1 = require("./providers/weixinAuthProvider");
var anonymousAuthProvider_1 = require("./providers/anonymousAuthProvider");
var customAuthProvider_1 = require("./providers/customAuthProvider");
var constants_1 = require("./constants");
var base_1 = require("./providers/base");
Object.defineProperty(exports, "AuthProvider", { enumerable: true, get: function () { return base_1.AuthProvider; } });
var emailAuthProvider_1 = require("./providers/emailAuthProvider");
var usernameAuthProvider_1 = require("./providers/usernameAuthProvider");
var CloudbaseEventEmitter = utilities_1.events.CloudbaseEventEmitter;
var RUNTIME = utilities_1.adapters.RUNTIME;
var printWarn = utilities_1.utils.printWarn, throwError = utilities_1.utils.throwError;
var ERRORS = utilities_1.constants.ERRORS, COMMUNITY_SITE_URL = utilities_1.constants.COMMUNITY_SITE_URL;
var catchErrorsDecorator = utilities_1.helpers.catchErrorsDecorator;
var COMPONENT_NAME = 'auth';
var eventBus = new CloudbaseEventEmitter();
exports.eventBus = eventBus;
var User = (function () {
    function User(options) {
        var cache = options.cache, request = options.request;
        this._cache = cache;
        this._request = request;
        this._setUserInfo();
    }
    User.prototype.checkLocalInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.uid = this._getLocalUserInfo('uid');
                this.loginType = this._getLocalUserInfo('loginType');
                this.openid = this._getLocalUserInfo('wxOpenId');
                this.wxOpenId = this._getLocalUserInfo('wxOpenId');
                this.wxPublicId = this._getLocalUserInfo('wxPublicId');
                this.unionId = this._getLocalUserInfo('wxUnionId');
                this.qqMiniOpenId = this._getLocalUserInfo('qqMiniOpenId');
                this.customUserId = this._getLocalUserInfo('customUserId');
                this.nickName = this._getLocalUserInfo('nickName');
                this.gender = this._getLocalUserInfo('gender');
                this.avatarUrl = this._getLocalUserInfo('avatarUrl');
                this.email = this._getLocalUserInfo('email');
                this.hasPassword = Boolean(this._getLocalUserInfo('hasPassword'));
                this.location = {
                    country: this._getLocalUserInfo('country'),
                    province: this._getLocalUserInfo('province'),
                    city: this._getLocalUserInfo('city')
                };
                return [2];
            });
        });
    };
    User.prototype.checkLocalInfoAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            return __generator(this, function (_s) {
                switch (_s.label) {
                    case 0:
                        _a = this;
                        return [4, this._getLocalUserInfoAsync('uid')];
                    case 1:
                        _a.uid = _s.sent();
                        _b = this;
                        return [4, this._getLocalUserInfoAsync('loginType')];
                    case 2:
                        _b.loginType = _s.sent();
                        _c = this;
                        return [4, this._getLocalUserInfoAsync('wxOpenId')];
                    case 3:
                        _c.openid = _s.sent();
                        _d = this;
                        return [4, this._getLocalUserInfoAsync('wxOpenId')];
                    case 4:
                        _d.wxOpenId = _s.sent();
                        _e = this;
                        return [4, this._getLocalUserInfoAsync('wxPublicId')];
                    case 5:
                        _e.wxPublicId = _s.sent();
                        _f = this;
                        return [4, this._getLocalUserInfoAsync('wxUnionId')];
                    case 6:
                        _f.unionId = _s.sent();
                        _g = this;
                        return [4, this._getLocalUserInfoAsync('qqMiniOpenId')];
                    case 7:
                        _g.qqMiniOpenId = _s.sent();
                        _h = this;
                        return [4, this._getLocalUserInfoAsync('customUserId')];
                    case 8:
                        _h.customUserId = _s.sent();
                        _j = this;
                        return [4, this._getLocalUserInfoAsync('nickName')];
                    case 9:
                        _j.nickName = _s.sent();
                        _k = this;
                        return [4, this._getLocalUserInfoAsync('gender')];
                    case 10:
                        _k.gender = _s.sent();
                        _l = this;
                        return [4, this._getLocalUserInfoAsync('avatarUrl')];
                    case 11:
                        _l.avatarUrl = _s.sent();
                        _m = this;
                        return [4, this._getLocalUserInfoAsync('email')];
                    case 12:
                        _m.email = _s.sent();
                        _o = this;
                        _p = Boolean;
                        return [4, this._getLocalUserInfoAsync('hasPassword')];
                    case 13:
                        _o.hasPassword = _p.apply(void 0, [_s.sent()]);
                        _q = this;
                        _r = {};
                        return [4, this._getLocalUserInfoAsync('country')];
                    case 14:
                        _r.country = _s.sent();
                        return [4, this._getLocalUserInfoAsync('province')];
                    case 15:
                        _r.province = _s.sent();
                        return [4, this._getLocalUserInfoAsync('city')];
                    case 16:
                        _q.location = (_r.city = _s.sent(),
                            _r);
                        return [2];
                }
            });
        });
    };
    User.prototype.linkWithTicket = function (ticket) {
        if (typeof ticket !== 'string') {
            throw new Error('ticket must be string');
        }
        return this._request.send('auth.linkWithTicket', { ticket: ticket });
    };
    User.prototype.linkWithRedirect = function (provider) {
        provider.signInWithRedirect();
    };
    User.prototype.getLinkedUidList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, hasPrimaryUid, users, _i, users_1, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._request.send('auth.getLinkedUidList', {})];
                    case 1:
                        data = (_a.sent()).data;
                        hasPrimaryUid = false;
                        users = data.users;
                        for (_i = 0, users_1 = users; _i < users_1.length; _i++) {
                            user = users_1[_i];
                            if (user.wxOpenId && user.wxPublicId) {
                                hasPrimaryUid = true;
                                break;
                            }
                        }
                        return [2, {
                                users: users,
                                hasPrimaryUid: hasPrimaryUid
                            }];
                }
            });
        });
    };
    User.prototype.setPrimaryUid = function (uid) {
        return this._request.send('auth.setPrimaryUid', { uid: uid });
    };
    User.prototype.unlink = function (loginType) {
        return this._request.send('auth.unlink', { platform: loginType });
    };
    User.prototype.update = function (userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var nickName, gender, avatarUrl, province, country, city, newUserInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nickName = userInfo.nickName, gender = userInfo.gender, avatarUrl = userInfo.avatarUrl, province = userInfo.province, country = userInfo.country, city = userInfo.city;
                        return [4, this._request.send('auth.updateUserInfo', { nickName: nickName, gender: gender, avatarUrl: avatarUrl, province: province, country: country, city: city })];
                    case 1:
                        newUserInfo = (_a.sent()).data;
                        this._setLocalUserInfo(newUserInfo);
                        return [2];
                }
            });
        });
    };
    User.prototype.updatePassword = function (newPassword, oldPassword) {
        return this._request.send('auth.updatePassword', {
            oldPassword: oldPassword,
            newPassword: newPassword
        });
    };
    User.prototype.updateEmail = function (newEmail) {
        return this._request.send('auth.updateEmail', {
            newEmail: newEmail
        });
    };
    User.prototype.updateUsername = function (username) {
        if (typeof username !== 'string') {
            throwError(ERRORS.INVALID_PARAMS, 'username must be a string');
        }
        return this._request.send('auth.updateUsername', {
            username: username
        });
    };
    User.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var action, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        action = 'auth.getUserInfo';
                        return [4, this._request.send(action, {})];
                    case 1:
                        userInfo = (_a.sent()).data;
                        this._setLocalUserInfo(userInfo);
                        return [2, userInfo];
                }
            });
        });
    };
    User.prototype._getLocalUserInfo = function (key) {
        var userInfoKey = this._cache.keys.userInfoKey;
        var userInfo = this._cache.getStore(userInfoKey);
        return userInfo[key];
    };
    User.prototype._getLocalUserInfoAsync = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var userInfoKey, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInfoKey = this._cache.keys.userInfoKey;
                        return [4, this._cache.getStoreAsync(userInfoKey)];
                    case 1:
                        userInfo = _a.sent();
                        return [2, userInfo[key]];
                }
            });
        });
    };
    User.prototype._setUserInfo = function () {
        var _this = this;
        var userInfoKey = this._cache.keys.userInfoKey;
        var userInfo = this._cache.getStore(userInfoKey);
        [
            'uid',
            'loginType',
            'openid',
            'wxOpenId',
            'wxPublicId',
            'unionId',
            'qqMiniOpenId',
            'email',
            'hasPassword',
            'customUserId',
            'nickName',
            'gender',
            'avatarUrl',
        ].forEach(function (infoKey) {
            _this[infoKey] = userInfo[infoKey];
        });
        this.location = {
            country: userInfo['country'],
            province: userInfo['province'],
            city: userInfo['city']
        };
    };
    User.prototype._setLocalUserInfo = function (userInfo) {
        var userInfoKey = this._cache.keys.userInfoKey;
        this._cache.setStore(userInfoKey, userInfo);
        this._setUserInfo();
    };
    __decorate([
        catchErrorsDecorator({
            title: '绑定自定义登录失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 User.linkWithTicket() 的语法或参数是否正确',
                '  2 - 此账户是否已经绑定自定义登录',
                '  3 - ticket 参数是否归属当前环境',
                '  4 - 创建 ticket 的自定义登录私钥是否过期',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], User.prototype, "linkWithTicket", null);
    __decorate([
        catchErrorsDecorator({
            title: '绑定第三方登录方式失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 User.linkWithRedirect() 的语法或参数是否正确',
                '  2 - 此账户是否已经绑定此第三方',
                '  3 - 此第三方是否已经授权',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], User.prototype, "linkWithRedirect", null);
    __decorate([
        catchErrorsDecorator({
            title: '获取账户列表失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 User.getLinkedUidList() 的语法或参数是否正确',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], User.prototype, "getLinkedUidList", null);
    __decorate([
        catchErrorsDecorator({
            title: '设置微信主账号失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 User.setPrimaryUid() 的语法或参数是否正确',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], User.prototype, "setPrimaryUid", null);
    __decorate([
        catchErrorsDecorator({
            title: '接触绑定失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 User.unlink() 的语法或参数是否正确',
                '  2 - 当前账户是否已经与此登录方式解绑',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], User.prototype, "unlink", null);
    __decorate([
        catchErrorsDecorator({
            title: '更新用户信息失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 User.update() 的语法或参数是否正确',
                '  2 - 用户信息中是否包含非法值',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], User.prototype, "update", null);
    __decorate([
        catchErrorsDecorator({
            title: '更新密码失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 User.updatePassword() 的语法或参数是否正确',
                '  3 - 新密码中是否包含非法字符',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", void 0)
    ], User.prototype, "updatePassword", null);
    __decorate([
        catchErrorsDecorator({
            title: '更新邮箱地址失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 User.updateEmail() 的语法或参数是否正确',
                '  2 - 当前环境是否开通了邮箱密码登录',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], User.prototype, "updateEmail", null);
    __decorate([
        catchErrorsDecorator({
            title: '更新用户名失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 User.updateUsername() 的语法或参数是否正确',
                '  2 - 当前环境是否开通了用户名密码登录',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], User.prototype, "updateUsername", null);
    __decorate([
        catchErrorsDecorator({
            title: '刷新本地用户信息失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 User.refresh() 的语法或参数是否正确',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], User.prototype, "refresh", null);
    return User;
}());
var LoginState = (function () {
    function LoginState(options) {
        var envId = options.envId, cache = options.cache, request = options.request;
        if (!envId) {
            throwError(ERRORS.INVALID_PARAMS, 'envId is not defined');
        }
        this._cache = cache;
        this.user = new User({
            cache: cache,
            request: request
        });
    }
    LoginState.prototype.checkLocalState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, refreshTokenKey, accessTokenKey, accessTokenExpireKey, refreshToken, accessToken, accessTokenExpire;
            return __generator(this, function (_b) {
                _a = this._cache.keys, refreshTokenKey = _a.refreshTokenKey, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey;
                refreshToken = this._cache.getStore(refreshTokenKey);
                accessToken = this._cache.getStore(accessTokenKey);
                accessTokenExpire = this._cache.getStore(accessTokenExpireKey);
                this.credential = {
                    refreshToken: refreshToken,
                    accessToken: accessToken,
                    accessTokenExpire: accessTokenExpire
                };
                this._loginType = this._cache.getStore(this._cache.keys.loginTypeKey);
                this.user.checkLocalInfo();
                return [2];
            });
        });
    };
    LoginState.prototype.checkLocalStateAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, refreshTokenKey, accessTokenKey, accessTokenExpireKey, refreshToken, accessToken, accessTokenExpire, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this._cache.keys, refreshTokenKey = _a.refreshTokenKey, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey;
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 1:
                        refreshToken = _c.sent();
                        return [4, this._cache.getStoreAsync(accessTokenKey)];
                    case 2:
                        accessToken = _c.sent();
                        return [4, this._cache.getStoreAsync(accessTokenExpireKey)];
                    case 3:
                        accessTokenExpire = _c.sent();
                        this.credential = {
                            refreshToken: refreshToken,
                            accessToken: accessToken,
                            accessTokenExpire: accessTokenExpire
                        };
                        _b = this;
                        return [4, this._cache.getStoreAsync(this._cache.keys.loginTypeKey)];
                    case 4:
                        _b._loginType = _c.sent();
                        return [4, this.user.checkLocalInfoAsync()];
                    case 5:
                        _c.sent();
                        return [2];
                }
            });
        });
    };
    Object.defineProperty(LoginState.prototype, "isAnonymousAuth", {
        get: function () {
            return this.loginType === constants_1.LOGINTYPE.ANONYMOUS;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginState.prototype, "isCustomAuth", {
        get: function () {
            return this.loginType === constants_1.LOGINTYPE.CUSTOM;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginState.prototype, "isWeixinAuth", {
        get: function () {
            return this.loginType === constants_1.LOGINTYPE.WECHAT || this.loginType === constants_1.LOGINTYPE.WECHAT_OPEN || this.loginType === constants_1.LOGINTYPE.WECHAT_PUBLIC;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginState.prototype, "isUsernameAuth", {
        get: function () {
            return this.loginType === constants_1.LOGINTYPE.USERNAME;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginState.prototype, "loginType", {
        get: function () {
            return this._loginType;
        },
        enumerable: false,
        configurable: true
    });
    return LoginState;
}());
exports.LoginState = LoginState;
var Auth = (function () {
    function Auth(config) {
        this._config = config;
        this._cache = config.cache;
        this._request = config.request;
        this._runtime = config.runtime || RUNTIME.WEB;
        eventBus.on(EVENTS.LOGIN_TYPE_CHANGED, this._onLoginTypeChanged.bind(this));
    }
    Object.defineProperty(Auth.prototype, "currentUser", {
        get: function () {
            if (this._cache.mode === 'async') {
                printWarn(ERRORS.INVALID_OPERATION, 'current platform\'s storage is asynchronous, please use getCurrenUser insteed');
                return;
            }
            var loginState = this.hasLoginState();
            if (loginState) {
                return loginState.user || null;
            }
            else {
                return null;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Auth.prototype, "loginType", {
        get: function () {
            return this._cache.getStore(this._cache.keys.loginTypeKey);
        },
        enumerable: false,
        configurable: true
    });
    Auth.prototype.getCurrenUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loginState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getLoginState()];
                    case 1:
                        loginState = _a.sent();
                        if (!loginState) return [3, 3];
                        return [4, loginState.user.checkLocalInfoAsync()];
                    case 2:
                        _a.sent();
                        return [2, loginState.user || null];
                    case 3: return [2, null];
                }
            });
        });
    };
    Auth.prototype.getLoginType = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._cache.getStoreAsync(this._cache.keys.loginTypeKey)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Auth.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4, this._request.getAccessToken()];
                    case 1: return [2, (_a.accessToken = (_b.sent()).accessToken,
                            _a.env = this._config.env,
                            _a)];
                }
            });
        });
    };
    Auth.prototype.weixinAuthProvider = function (_a) {
        var appid = _a.appid, scope = _a.scope, state = _a.state;
        if (!this._weixinAuthProvider) {
            this._weixinAuthProvider = new weixinAuthProvider_1.WeixinAuthProvider(__assign(__assign({}, this._config), { cache: this._cache, request: this._request, runtime: this._runtime }), appid, scope, state);
        }
        return this._weixinAuthProvider;
    };
    Auth.prototype.anonymousAuthProvider = function () {
        if (!this._anonymousAuthProvider) {
            this._anonymousAuthProvider = new anonymousAuthProvider_1.AnonymousAuthProvider(__assign(__assign({}, this._config), { cache: this._cache, request: this._request }));
        }
        return this._anonymousAuthProvider;
    };
    Auth.prototype.customAuthProvider = function () {
        if (!this._customAuthProvider) {
            this._customAuthProvider = new customAuthProvider_1.CustomAuthProvider(__assign(__assign({}, this._config), { cache: this._cache, request: this._request }));
        }
        return this._customAuthProvider;
    };
    Auth.prototype.emailAuthProvider = function () {
        if (!this._emailAuthProvider) {
            this._emailAuthProvider = new emailAuthProvider_1.EmailAuthProvider(__assign(__assign({}, this._config), { cache: this._cache, request: this._request }));
        }
        return this._emailAuthProvider;
    };
    Auth.prototype.usernameAuthProvider = function () {
        if (!this._usernameAuthProvider) {
            this._usernameAuthProvider = new usernameAuthProvider_1.UsernameAuthProvider(__assign(__assign({}, this._config), { cache: this._cache, request: this._request }));
        }
        return this._usernameAuthProvider;
    };
    Auth.prototype.signInWithUsernameAndPassword = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.usernameAuthProvider().signIn(username, password)];
            });
        });
    };
    Auth.prototype.isUsernameRegistered = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof username !== 'string') {
                            throwError(ERRORS.INVALID_PARAMS, 'username must be a string');
                        }
                        return [4, this._request.send('auth.isUsernameRegistered', {
                                username: username
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2, data === null || data === void 0 ? void 0 : data.isRegistered];
                }
            });
        });
    };
    Auth.prototype.signInWithEmailAndPassword = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.emailAuthProvider().signIn(email, password)];
            });
        });
    };
    Auth.prototype.signUpWithEmailAndPassword = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.emailAuthProvider().signUp(email, password)];
            });
        });
    };
    Auth.prototype.sendPasswordResetEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.emailAuthProvider().resetPassword(email)];
            });
        });
    };
    Auth.prototype.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loginType, _a, refreshTokenKey, accessTokenKey, accessTokenExpireKey, action, refresh_token, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.getLoginType()];
                    case 1:
                        loginType = _b.sent();
                        if (loginType === constants_1.LOGINTYPE.ANONYMOUS) {
                            throw new Error(JSON.stringify({
                                code: ERRORS.INVALID_OPERATION,
                                msg: 'anonymous user doesn\'t support signOut action'
                            }));
                        }
                        _a = this._cache.keys, refreshTokenKey = _a.refreshTokenKey, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey;
                        action = 'auth.logout';
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 2:
                        refresh_token = _b.sent();
                        if (!refresh_token) {
                            return [2];
                        }
                        return [4, this._request.send(action, { refresh_token: refresh_token })];
                    case 3:
                        res = _b.sent();
                        this._cache.removeStoreAsync(refreshTokenKey);
                        this._cache.removeStoreAsync(accessTokenKey);
                        this._cache.removeStoreAsync(accessTokenExpireKey);
                        eventBus.fire(EVENTS.LOGIN_STATE_CHANGED);
                        eventBus.fire(EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this._config.env,
                            loginType: constants_1.LOGINTYPE.NULL,
                            persistence: this._config.persistence
                        });
                        return [2, res];
                }
            });
        });
    };
    Auth.prototype.onLoginStateChanged = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var loginState;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventBus.on(EVENTS.LOGIN_STATE_CHANGED, function () { return __awaiter(_this, void 0, void 0, function () {
                            var loginState;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, this.getLoginState()];
                                    case 1:
                                        loginState = _a.sent();
                                        callback.call(this, loginState);
                                        return [2];
                                }
                            });
                        }); });
                        return [4, this.getLoginState()];
                    case 1:
                        loginState = _a.sent();
                        callback.call(this, loginState);
                        return [2];
                }
            });
        });
    };
    Auth.prototype.onLoginStateExpired = function (callback) {
        eventBus.on(EVENTS.LOGIN_STATE_EXPIRED, callback.bind(this));
    };
    Auth.prototype.onAccessTokenRefreshed = function (callback) {
        eventBus.on(EVENTS.ACCESS_TOKEN_REFRESHD, callback.bind(this));
    };
    Auth.prototype.onAnonymousConverted = function (callback) {
        eventBus.on(EVENTS.ANONYMOUS_CONVERTED, callback.bind(this));
    };
    Auth.prototype.onLoginTypeChanged = function (callback) {
        var _this = this;
        eventBus.on(EVENTS.LOGIN_TYPE_CHANGED, function () { return __awaiter(_this, void 0, void 0, function () {
            var loginState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getLoginState()];
                    case 1:
                        loginState = _a.sent();
                        callback.call(this, loginState);
                        return [2];
                }
            });
        }); });
    };
    Auth.prototype.hasLoginState = function () {
        if (this._cache.mode === 'async') {
            printWarn(ERRORS.INVALID_OPERATION, 'current platform\'s storage is asynchronous, please use getLoginState insteed');
            return;
        }
        var refreshTokenKey = this._cache.keys.refreshTokenKey;
        var refreshToken = this._cache.getStore(refreshTokenKey);
        if (refreshToken) {
            var loginState = new LoginState({
                envId: this._config.env,
                cache: this._cache,
                request: this._request
            });
            loginState.checkLocalState();
            return loginState;
        }
        else {
            return null;
        }
    };
    Auth.prototype.getLoginState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refreshTokenKey, refreshToken, loginState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshTokenKey = this._cache.keys.refreshTokenKey;
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 1:
                        refreshToken = _a.sent();
                        if (!refreshToken) return [3, 3];
                        loginState = new LoginState({
                            envId: this._config.env,
                            cache: this._cache,
                            request: this._request
                        });
                        return [4, loginState.checkLocalStateAsync()];
                    case 2:
                        _a.sent();
                        return [2, loginState];
                    case 3: return [2, null];
                }
            });
        });
    };
    Auth.prototype.shouldRefreshAccessToken = function (hook) {
        this._request._shouldRefreshAccessTokenHook = hook.bind(this);
    };
    Auth.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var action, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        action = 'auth.getUserInfo';
                        return [4, this._request.send(action, {})];
                    case 1:
                        res = _a.sent();
                        if (res.code) {
                            return [2, res];
                        }
                        else {
                            return [2, __assign(__assign({}, res.data), { requestId: res.seqId })];
                        }
                        return [2];
                }
            });
        });
    };
    Auth.prototype.getAuthHeader = function () {
        var _a = this._cache.keys, refreshTokenKey = _a.refreshTokenKey, accessTokenKey = _a.accessTokenKey;
        var refreshToken = this._cache.getStore(refreshTokenKey);
        var accessToken = this._cache.getStore(accessTokenKey);
        return {
            'x-cloudbase-credentials': accessToken + '/@@/' + refreshToken
        };
    };
    Auth.prototype.getAuthHeaderAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, refreshTokenKey, accessTokenKey, refreshToken, accessToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this._request.refreshAccessToken()];
                    case 1:
                        _b.sent();
                        _a = this._cache.keys, refreshTokenKey = _a.refreshTokenKey, accessTokenKey = _a.accessTokenKey;
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 2:
                        refreshToken = _b.sent();
                        return [4, this._cache.getStoreAsync(accessTokenKey)];
                    case 3:
                        accessToken = _b.sent();
                        return [2, {
                                'x-cloudbase-credentials': accessToken + '/@@/' + refreshToken
                            }];
                }
            });
        });
    };
    Auth.prototype._onLoginTypeChanged = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, loginType, persistence, env;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ev.data, loginType = _a.loginType, persistence = _a.persistence, env = _a.env;
                        if (env !== this._config.env) {
                            return [2];
                        }
                        return [4, this._cache.updatePersistenceAsync(persistence)];
                    case 1:
                        _b.sent();
                        return [4, this._cache.setStoreAsync(this._cache.keys.loginTypeKey, loginType)];
                    case 2:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    __decorate([
        catchErrorsDecorator({
            title: '获取用户信息失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().getCurrenUser() 的语法或参数是否正确',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Auth.prototype, "getCurrenUser", null);
    __decorate([
        catchErrorsDecorator({
            title: '获取用户是否被占用失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().isUsernameRegistered() 的语法或参数是否正确',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], Auth.prototype, "isUsernameRegistered", null);
    __decorate([
        catchErrorsDecorator({
            title: '用户登出失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().signOut() 的语法或参数是否正确',
                '  2 - 当前用户是否为匿名登录（匿名登录不支持signOut）',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Auth.prototype, "signOut", null);
    __decorate([
        catchErrorsDecorator({
            title: '获取本地登录态失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().getLoginState() 的语法或参数是否正确',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Auth.prototype, "getLoginState", null);
    __decorate([
        catchErrorsDecorator({
            title: '获取用户信息失败',
            messages: [
                '请确认以下各项：',
                '  1 - 是否已登录',
                '  2 - 调用 auth().getUserInfo() 的语法或参数是否正确',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Auth.prototype, "getUserInfo", null);
    return Auth;
}());
exports.Auth = Auth;
var EVENTS = {
    LOGIN_STATE_CHANGED: 'loginStateChanged',
    LOGIN_STATE_EXPIRED: 'loginStateExpire',
    LOGIN_TYPE_CHANGED: 'loginTypeChanged',
    ANONYMOUS_CONVERTED: 'anonymousConverted',
    ACCESS_TOKEN_REFRESHD: 'refreshAccessToken'
};
exports.EVENTS = EVENTS;
var component = {
    name: COMPONENT_NAME,
    namespace: 'auth',
    injectEvents: {
        bus: eventBus,
        events: [
            EVENTS.LOGIN_TYPE_CHANGED,
            EVENTS.LOGIN_STATE_EXPIRED,
            EVENTS.LOGIN_STATE_CHANGED,
            EVENTS.ACCESS_TOKEN_REFRESHD,
            EVENTS.ANONYMOUS_CONVERTED
        ]
    },
    entity: function (config) {
        if (config === void 0) { config = { persistence: 'session' }; }
        if (this.authInstance) {
            printWarn(ERRORS.INVALID_OPERATION, 'every cloudbase instance should has only one auth object');
            return this.authInstance;
        }
        var _a = this.platform, adapter = _a.adapter, runtime = _a.runtime;
        var newPersistence = config.persistence || adapter.primaryStorage;
        if (newPersistence && (newPersistence !== this.config.persistence)) {
            this.updateConfig({ persistence: newPersistence });
        }
        var _b = this.config, env = _b.env, persistence = _b.persistence, debug = _b.debug;
        this.authInstance = new Auth({
            env: env,
            persistence: persistence,
            debug: debug,
            cache: this.cache,
            request: this.request,
            runtime: runtime
        });
        return this.authInstance;
    }
};
try {
    cloudbase.registerComponent(component);
}
catch (e) { }
function registerAuth(app) {
    app.registerComponent(component);
}
exports.registerAuth = registerAuth;
function registerProvider(name, provider) {
    var proto = Auth.prototype;
    proto[name] = function (options) {
        var privateName = "_" + name;
        if (!this[privateName]) {
            this[privateName] = new provider(__assign(__assign({}, options), this._config));
        }
        return this[privateName];
    };
}
exports.registerProvider = registerProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrREFBaUY7QUFLakYscUVBQW9FO0FBQ3BFLDJFQUEwRTtBQUMxRSxxRUFBb0U7QUFDcEUseUNBQXdDO0FBQ3hDLHlDQUFnRDtBQTAwQjlDLDZGQTEwQk8sbUJBQVksT0EwMEJQO0FBejBCZCxtRUFBa0U7QUFDbEUseUVBQXdFO0FBSWhFLElBQUEscUJBQXFCLEdBQUssa0JBQU0sc0JBQVgsQ0FBWTtBQUNqQyxJQUFBLE9BQU8sR0FBSyxvQkFBUSxRQUFiLENBQWM7QUFDckIsSUFBQSxTQUFTLEdBQWlCLGlCQUFLLFVBQXRCLEVBQUUsVUFBVSxHQUFLLGlCQUFLLFdBQVYsQ0FBVztBQUNoQyxJQUFBLE1BQU0sR0FBeUIscUJBQVMsT0FBbEMsRUFBRSxrQkFBa0IsR0FBSyxxQkFBUyxtQkFBZCxDQUFlO0FBQ3pDLElBQUEsb0JBQW9CLEdBQUssbUJBQU8scUJBQVosQ0FBYTtBQUV6QyxJQUFNLGNBQWMsR0FBRyxNQUFNLENBQUM7QUFjOUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO0FBa3pCM0MsNEJBQVE7QUEzeUJWO0lBdUJFLGNBQVksT0FBcUI7UUFDdkIsSUFBQSxLQUFLLEdBQWEsT0FBTyxNQUFwQixFQUFFLE9BQU8sR0FBSSxPQUFPLFFBQVgsQ0FBWTtRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUV4QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUlZLDZCQUFjLEdBQTNCOzs7Z0JBQ0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMs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QztJQUMzQixDQUFDLENBQUM7QUFDSixDQUFDO0FBWkQsNENBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBldmVudHMsYWRhcHRlcnMsdXRpbHMsY29uc3RhbnRzLCBoZWxwZXJzIH0gZnJvbSAgJ0BjbG91ZGJhc2UvdXRpbGl0aWVzJztcbmltcG9ydCB7IElDbG91ZGJhc2VDYWNoZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY2FjaGUnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZVJlcXVlc3QgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL3JlcXVlc3QnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUF1dGhDb25maWcsIElDcmVkZW50aWFsLCBJVXNlciwgSVVzZXJJbmZvLCBJQXV0aFByb3ZpZGVyLCBJTG9naW5TdGF0ZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvYXV0aCc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ29tcG9uZW50IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jb21wb25lbnQnO1xuaW1wb3J0IHsgV2VpeGluQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvd2VpeGluQXV0aFByb3ZpZGVyJztcbmltcG9ydCB7IEFub255bW91c0F1dGhQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2Fub255bW91c0F1dGhQcm92aWRlcic7XG5pbXBvcnQgeyBDdXN0b21BdXRoUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9jdXN0b21BdXRoUHJvdmlkZXInO1xuaW1wb3J0IHsgTE9HSU5UWVBFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvYmFzZSc7XG5pbXBvcnQgeyBFbWFpbEF1dGhQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2VtYWlsQXV0aFByb3ZpZGVyJztcbmltcG9ydCB7IFVzZXJuYW1lQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvdXNlcm5hbWVBdXRoUHJvdmlkZXInO1xuXG5kZWNsYXJlIGNvbnN0IGNsb3VkYmFzZTogSUNsb3VkYmFzZTtcblxuY29uc3QgeyBDbG91ZGJhc2VFdmVudEVtaXR0ZXIgfSA9IGV2ZW50cztcbmNvbnN0IHsgUlVOVElNRSB9ID0gYWRhcHRlcnM7XG5jb25zdCB7IHByaW50V2FybiwgdGhyb3dFcnJvciB9ID0gdXRpbHM7XG5jb25zdCB7IEVSUk9SUywgQ09NTVVOSVRZX1NJVEVfVVJMIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IGNhdGNoRXJyb3JzRGVjb3JhdG9yIH0gPSBoZWxwZXJzO1xuXG5jb25zdCBDT01QT05FTlRfTkFNRSA9ICdhdXRoJztcblxuaW50ZXJmYWNlIFVzZXJJbmZvIHtcbiAgb3BlbmlkOiBzdHJpbmc7XG4gIG5pY2tuYW1lPzogc3RyaW5nO1xuICBzZXg/OiBudW1iZXI7XG4gIHByb3ZpbmNlPzogc3RyaW5nO1xuICBjaXR5Pzogc3RyaW5nO1xuICBjb3VudHJ5Pzogc3RyaW5nO1xuICBoZWFkaW1ndXJsPzogc3RyaW5nO1xuICBwcml2aWxlZ2U/OiBbc3RyaW5nXTtcbiAgdW5pb25pZD86IHN0cmluZztcbn1cblxuY29uc3QgZXZlbnRCdXMgPSBuZXcgQ2xvdWRiYXNlRXZlbnRFbWl0dGVyKCk7XG5cbmludGVyZmFjZSBJVXNlck9wdGlvbnN7XG4gIGNhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG4gIHJlcXVlc3Q6IElDbG91ZGJhc2VSZXF1ZXN0O1xufVxuXG5jbGFzcyBVc2VyIGltcGxlbWVudHMgSVVzZXJ7XG4gIHB1YmxpYyB1aWQ6IHN0cmluZztcbiAgcHVibGljIGxvZ2luVHlwZTogc3RyaW5nO1xuICBwdWJsaWMgb3BlbmlkOiBzdHJpbmc7XG4gIHB1YmxpYyB3eE9wZW5JZDogc3RyaW5nO1xuICBwdWJsaWMgd3hQdWJsaWNJZDogc3RyaW5nO1xuICBwdWJsaWMgdW5pb25JZDogc3RyaW5nO1xuICBwdWJsaWMgcXFNaW5pT3BlbklkOiBzdHJpbmc7XG4gIHB1YmxpYyBjdXN0b21Vc2VySWQ6IHN0cmluZztcbiAgcHVibGljIG5pY2tOYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBnZW5kZXI6IHN0cmluZztcbiAgcHVibGljIGF2YXRhclVybDogc3RyaW5nO1xuICBwdWJsaWMgZW1haWw6IHN0cmluZztcbiAgcHVibGljIGhhc1Bhc3N3b3JkOiBib29sZWFuO1xuICBwdWJsaWMgbG9jYXRpb24/OiB7XG4gICAgY291bnRyeT86IHN0cmluZztcbiAgICBwcm92aW5jZT86IHN0cmluZztcbiAgICBjaXR5Pzogc3RyaW5nO1xuICB9O1xuXG4gIHByaXZhdGUgX2NhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG4gIHByaXZhdGUgX3JlcXVlc3Q6IElDbG91ZGJhc2VSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElVc2VyT3B0aW9ucykge1xuICAgIGNvbnN0IHsgY2FjaGUsIHJlcXVlc3R9ID0gb3B0aW9ucztcbiAgICB0aGlzLl9jYWNoZSA9IGNhY2hlO1xuICAgIHRoaXMuX3JlcXVlc3QgPSByZXF1ZXN0O1xuXG4gICAgdGhpcy5fc2V0VXNlckluZm8oKTtcbiAgfVxuICAvKipcbiAgICog6I635Y+W5pys5Zyw55So5oi35L+h5oGvLeWQjOatpVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNoZWNrTG9jYWxJbmZvKCl7XG4gICAgdGhpcy51aWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd1aWQnKTtcbiAgICB0aGlzLmxvZ2luVHlwZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2xvZ2luVHlwZScpO1xuICAgIHRoaXMub3BlbmlkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnd3hPcGVuSWQnKTtcbiAgICB0aGlzLnd4T3BlbklkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnd3hPcGVuSWQnKTtcbiAgICB0aGlzLnd4UHVibGljSWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd3eFB1YmxpY0lkJyk7XG4gICAgdGhpcy51bmlvbklkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnd3hVbmlvbklkJyk7XG4gICAgdGhpcy5xcU1pbmlPcGVuSWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdxcU1pbmlPcGVuSWQnKTtcbiAgICB0aGlzLmN1c3RvbVVzZXJJZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2N1c3RvbVVzZXJJZCcpO1xuICAgIHRoaXMubmlja05hbWUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCduaWNrTmFtZScpO1xuICAgIHRoaXMuZ2VuZGVyID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnZ2VuZGVyJyk7XG4gICAgdGhpcy5hdmF0YXJVcmwgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdhdmF0YXJVcmwnKTtcbiAgICB0aGlzLmVtYWlsID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnZW1haWwnKTtcbiAgICB0aGlzLmhhc1Bhc3N3b3JkID0gQm9vbGVhbih0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdoYXNQYXNzd29yZCcpKTtcbiAgICB0aGlzLmxvY2F0aW9uID0ge1xuICAgICAgY291bnRyeTogdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnY291bnRyeScpLFxuICAgICAgcHJvdmluY2U6IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3Byb3ZpbmNlJyksXG4gICAgICBjaXR5OiB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdjaXR5JylcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnlKjmiLfkv6Hmga8t5byC5q2lXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hlY2tMb2NhbEluZm9Bc3luYygpe1xuICAgIHRoaXMudWlkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd1aWQnKTtcbiAgICB0aGlzLmxvZ2luVHlwZSA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnbG9naW5UeXBlJyk7XG4gICAgdGhpcy5vcGVuaWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3d4T3BlbklkJyk7XG4gICAgdGhpcy53eE9wZW5JZCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnd3hPcGVuSWQnKTtcbiAgICB0aGlzLnd4UHVibGljSWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3d4UHVibGljSWQnKTtcbiAgICB0aGlzLnVuaW9uSWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3d4VW5pb25JZCcpO1xuICAgIHRoaXMucXFNaW5pT3BlbklkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdxcU1pbmlPcGVuSWQnKTtcbiAgICB0aGlzLmN1c3RvbVVzZXJJZCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnY3VzdG9tVXNlcklkJyk7XG4gICAgdGhpcy5uaWNrTmFtZSA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnbmlja05hbWUnKTtcbiAgICB0aGlzLmdlbmRlciA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnZ2VuZGVyJyk7XG4gICAgdGhpcy5hdmF0YXJVcmwgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2F2YXRhclVybCcpO1xuICAgIHRoaXMuZW1haWwgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2VtYWlsJyk7XG4gICAgdGhpcy5oYXNQYXNzd29yZCA9IEJvb2xlYW4oYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdoYXNQYXNzd29yZCcpKTtcbiAgICB0aGlzLmxvY2F0aW9uID0ge1xuICAgICAgY291bnRyeTogYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdjb3VudHJ5JyksXG4gICAgICBwcm92aW5jZTogYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdwcm92aW5jZScpLFxuICAgICAgY2l0eTogYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdjaXR5JylcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIOWwhuW9k+WJjei0puaIt+S4juiHquWumuS5ieeZu+W9lSBUaWNrZXQg6L+b6KGM57uR5a6a77yM57uR5a6a5LmL5ZCO5L6/5Y+v5Lul6YCa6L+H6Ieq5a6a5LmJ55m75b2V55m75b2V5b2T5YmN5LqR5byA5Y+R6LSm5oi344CCXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aWNrZXQg6Ieq5a6a5LmJ55m75b2VdGlja2V0XG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn57uR5a6a6Ieq5a6a5LmJ55m75b2V5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIubGlua1dpdGhUaWNrZXQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOatpOi0puaIt+aYr+WQpuW3sue7j+e7keWumuiHquWumuS5ieeZu+W9lScsXG4gICAgICAnICAzIC0gdGlja2V0IOWPguaVsOaYr+WQpuW9kuWxnuW9k+WJjeeOr+WigycsXG4gICAgICAnICA0IC0g5Yib5bu6IHRpY2tldCDnmoToh6rlrprkuYnnmbvlvZXnp4HpkqXmmK/lkKbov4fmnJ8nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBsaW5rV2l0aFRpY2tldCh0aWNrZXQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0eXBlb2YgdGlja2V0ICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aWNrZXQgbXVzdCBiZSBzdHJpbmcnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5saW5rV2l0aFRpY2tldCcsIHsgdGlja2V0IH0pO1xuICB9XG4gIC8qKlxuICAgKiDlsIblvZPliY3otKbmiLfkuI7nrKzkuInmlrnpibTmnYPmj5DkvpvmlrnvvIzku6Xph43lrprlkJHnmoTlvaLlvI/vvIzov5vooYznu5HlrprvvIznu5HlrprkuYvlkI7kvr/lj6/ku6XpgJrov4fnrKzkuInmlrnpibTmnYPmj5DkvpvmlrnnmbvlvZXlvZPliY3nmoTkupHlvIDlj5HotKbmiLfjgIJcbiAgICogQHBhcmFtIHByb3ZpZGVyIOeJueWumueZu+W9leaWueW8j+eahHByb3ZpZGVy77yM5b+F6aG75YW35aSHc2lnbkluV2l0aFJlZGlyZWN05pa55rOVXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn57uR5a6a56ys5LiJ5pa555m75b2V5pa55byP5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIubGlua1dpdGhSZWRpcmVjdCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5q2k6LSm5oi35piv5ZCm5bey57uP57uR5a6a5q2k56ys5LiJ5pa5JyxcbiAgICAgICcgIDMgLSDmraTnrKzkuInmlrnmmK/lkKblt7Lnu4/mjojmnYMnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBsaW5rV2l0aFJlZGlyZWN0KHByb3ZpZGVyOklBdXRoUHJvdmlkZXIpOiB2b2lkIHtcbiAgICBwcm92aWRlci5zaWduSW5XaXRoUmVkaXJlY3QoKTtcbiAgfVxuICAvKipcbiAgICog6I635Y+W5b2T5YmN6LSm5oi355qE5b6u5L+hIFVuaW9uSUQg57uR5a6a55qE5LqR5byA5Y+R6LSm5oi35YiX6KGo44CC5aaC5p6c5b2T5YmN6LSm5oi35LiN5a2Y5ZyoIFVuaW9uSUTvvIzkvJrov5Tlm57plJnor6/jgIJcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5botKbmiLfliJfooajlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5nZXRMaW5rZWRVaWRMaXN0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0TGlua2VkVWlkTGlzdCgpIHtcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5nZXRMaW5rZWRVaWRMaXN0Jywge30pO1xuICAgIGxldCBoYXNQcmltYXJ5VWlkID0gZmFsc2U7XG4gICAgY29uc3QgdXNlcnMgPSBkYXRhLnVzZXJzIGFzIElVc2VySW5mb1tdO1xuICAgIGZvcihjb25zdCB1c2VyIG9mIHVzZXJzKXtcbiAgICAgIGlmICh1c2VyLnd4T3BlbklkICYmIHVzZXIud3hQdWJsaWNJZCkge1xuICAgICAgICBoYXNQcmltYXJ5VWlkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB1c2VycyxcbiAgICAgIGhhc1ByaW1hcnlVaWRcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiDorr7nva7lvq7kv6HkuLvotKblj7fvvIzpgJrluLjmkK3phY3lkowgVXNlci5nZXRMaW5rZWRVaWRMaXN0KCkg5L2/55So77yM55So5LqO5Zyo5ZCM5Liq5b6u5L+hIFVuaW9uSUQg5a+55bqU55qE5aSa5Liq5LqR5byA5Y+R6LSm5Y+35Lit77yM6K6+572u5YW25Lit5LiA5Liq5Li65Li76LSm5Y+3XG4gICAqIOiuvue9ruS5i+WQju+8jOmAmui/hyBVbmlvbklEIOeZu+W9leS+v+S8mueZu+W9leiHs+S4u+i0puWPt+S5i+S4iuOAglxuICAgKiBAcGFyYW0gdWlkIFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iuvue9ruW+ruS/oeS4u+i0puWPt+Wksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnNldFByaW1hcnlVaWQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBzZXRQcmltYXJ5VWlkKHVpZDpzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnNldFByaW1hcnlVaWQnLCB7IHVpZCB9KTtcbiAgfVxuICAvKipcbiAgICog6Kej57uR5p+Q5Liq55m75b2V5pa55byPXG4gICAqIEBwYXJhbSBsb2dpblR5cGUgXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5o6l6Kem57uR5a6a5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudW5saW5rKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3otKbmiLfmmK/lkKblt7Lnu4/kuI7mraTnmbvlvZXmlrnlvI/op6Pnu5EnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyB1bmxpbmsobG9naW5UeXBlOidDVVNUT00nfCdXRUNIQVQtT1BFTid8J1dFQ0hBVC1QVUJMSUMnfCdXRUNIQVQtVU5JT04nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC51bmxpbmsnLCB7IHBsYXRmb3JtOiBsb2dpblR5cGUgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOabtOaWsOeUqOaIt+S/oeaBr1xuICAgKiBAcGFyYW0gdXNlckluZm8gXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw55So5oi35L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDnlKjmiLfkv6Hmga/kuK3mmK/lkKbljIXlkKvpnZ7ms5XlgLwnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUodXNlckluZm86SVVzZXJJbmZvKTpQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IG5pY2tOYW1lLCBnZW5kZXIsIGF2YXRhclVybCwgcHJvdmluY2UsIGNvdW50cnksIGNpdHkgfSA9IHVzZXJJbmZvO1xuICAgIGNvbnN0IHsgZGF0YTogbmV3VXNlckluZm8gfSA9IGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC51cGRhdGVVc2VySW5mbycsIHsgbmlja05hbWUsIGdlbmRlciwgYXZhdGFyVXJsLCBwcm92aW5jZSwgY291bnRyeSwgY2l0eSB9KTtcbiAgICB0aGlzLl9zZXRMb2NhbFVzZXJJbmZvKG5ld1VzZXJJbmZvKTtcbiAgfVxuICAvKipcbiAgICog5pu05paw5a+G56CBXG4gICAqIEBwYXJhbSBuZXdQYXNzd29yZCBcbiAgICogQHBhcmFtIG9sZFBhc3N3b3JkIFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+abtOaWsOWvhueggeWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnVwZGF0ZVBhc3N3b3JkKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDMgLSDmlrDlr4bnoIHkuK3mmK/lkKbljIXlkKvpnZ7ms5XlrZfnrKYnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyB1cGRhdGVQYXNzd29yZChuZXdQYXNzd29yZDpzdHJpbmcsIG9sZFBhc3N3b3JkOnN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGgudXBkYXRlUGFzc3dvcmQnLCB7XG4gICAgICBvbGRQYXNzd29yZCxcbiAgICAgIG5ld1Bhc3N3b3JkXG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOabtOaWsOmCrueuseWcsOWdgFxuICAgKiBAcGFyYW0gbmV3RW1haWwgXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw6YKu566x5Zyw5Z2A5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlRW1haWwoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6humCrueuseWvhueggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIHVwZGF0ZUVtYWlsKG5ld0VtYWlsOnN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGgudXBkYXRlRW1haWwnLCB7XG4gICAgICBuZXdFbWFpbFxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDmm7TmlrDnlKjmiLflkI1cbiAgICogQHBhcmFtIHVzZXJuYW1lIFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+abtOaWsOeUqOaIt+WQjeWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnVwZGF0ZVVzZXJuYW1lKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobnlKjmiLflkI3lr4bnoIHnmbvlvZUnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyB1cGRhdGVVc2VybmFtZSh1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiB1c2VybmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCd1c2VybmFtZSBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC51cGRhdGVVc2VybmFtZScsIHtcbiAgICAgIHVzZXJuYW1lXG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOWIt+aWsOacrOWcsOeUqOaIt+S/oeaBr+OAguW9k+eUqOaIt+WcqOWFtuS7luWuouaIt+err+abtOaWsOeUqOaIt+S/oeaBr+S5i+WQju+8jOWPr+S7peiwg+eUqOatpOaOpeWPo+WQjOatpeabtOaWsOS5i+WQjueahOS/oeaBr+OAglxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+WIt+aWsOacrOWcsOeUqOaIt+S/oeaBr+Wksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnJlZnJlc2goKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyByZWZyZXNoKCk6UHJvbWlzZTxJVXNlckluZm8+IHtcbiAgICBjb25zdCBhY3Rpb24gPSAnYXV0aC5nZXRVc2VySW5mbyc7XG4gICAgY29uc3QgeyBkYXRhOiB1c2VySW5mbyB9ID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKGFjdGlvbiwge30pO1xuICAgIHRoaXMuX3NldExvY2FsVXNlckluZm8odXNlckluZm8pO1xuICAgIHJldHVybiB1c2VySW5mbztcbiAgfVxuXG4gIHByaXZhdGUgX2dldExvY2FsVXNlckluZm8oa2V5OnN0cmluZyk6c3RyaW5nIHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodXNlckluZm9LZXkpO1xuICAgIHJldHVybiB1c2VySW5mb1trZXldO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfZ2V0TG9jYWxVc2VySW5mb0FzeW5jKGtleTpzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHsgdXNlckluZm9LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgdXNlckluZm8gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHVzZXJJbmZvS2V5KTtcbiAgICByZXR1cm4gdXNlckluZm9ba2V5XTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldFVzZXJJbmZvKCl7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCB1c2VySW5mbyA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKHVzZXJJbmZvS2V5KTtcbiAgICBbXG4gICAgICAndWlkJyxcbiAgICAgICdsb2dpblR5cGUnLFxuICAgICAgJ29wZW5pZCcsXG4gICAgICAnd3hPcGVuSWQnLFxuICAgICAgJ3d4UHVibGljSWQnLFxuICAgICAgJ3VuaW9uSWQnLFxuICAgICAgJ3FxTWluaU9wZW5JZCcsXG4gICAgICAnZW1haWwnLFxuICAgICAgJ2hhc1Bhc3N3b3JkJyxcbiAgICAgICdjdXN0b21Vc2VySWQnLFxuICAgICAgJ25pY2tOYW1lJyxcbiAgICAgICdnZW5kZXInLFxuICAgICAgJ2F2YXRhclVybCcsXG4gICAgXS5mb3JFYWNoKGluZm9LZXkgPT4ge1xuICAgICAgdGhpc1tpbmZvS2V5XSA9IHVzZXJJbmZvW2luZm9LZXldO1xuICAgIH0pO1xuXG4gICAgdGhpcy5sb2NhdGlvbiA9IHtcbiAgICAgIGNvdW50cnk6IHVzZXJJbmZvWydjb3VudHJ5J10sXG4gICAgICBwcm92aW5jZTogdXNlckluZm9bJ3Byb3ZpbmNlJ10sXG4gICAgICBjaXR5OiB1c2VySW5mb1snY2l0eSddXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldExvY2FsVXNlckluZm8odXNlckluZm86YW55KSB7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICB0aGlzLl9jYWNoZS5zZXRTdG9yZSh1c2VySW5mb0tleSwgdXNlckluZm8pO1xuICAgIHRoaXMuX3NldFVzZXJJbmZvKCk7XG4gIH1cbn1cbmludGVyZmFjZSBJTG9naW5TdGF0ZU9wdGlvbnMgZXh0ZW5kcyBJVXNlck9wdGlvbnMge1xuICBlbnZJZDogc3RyaW5nO1xufVxuZXhwb3J0IGNsYXNzIExvZ2luU3RhdGUgaW1wbGVtZW50cyBJTG9naW5TdGF0ZXtcbiAgcHVibGljIGNyZWRlbnRpYWw6IElDcmVkZW50aWFsO1xuICBwdWJsaWMgdXNlcjogSVVzZXI7XG5cbiAgcHJpdmF0ZSBfY2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcbiAgcHJpdmF0ZSBfbG9naW5UeXBlOiBzdHJpbmc7XG4gIFxuICBjb25zdHJ1Y3RvcihvcHRpb25zOklMb2dpblN0YXRlT3B0aW9ucykge1xuICAgIGNvbnN0IHsgZW52SWQsIGNhY2hlLCByZXF1ZXN0IH0gPSBvcHRpb25zO1xuICAgIGlmICghZW52SWQpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCAnZW52SWQgaXMgbm90IGRlZmluZWQnKTtcbiAgICB9XG4gICAgdGhpcy5fY2FjaGUgPSBjYWNoZTtcblxuICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKHtcbiAgICAgIGNhY2hlLFxuICAgICAgcmVxdWVzdFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNoZWNrTG9jYWxTdGF0ZSgpe1xuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5LCBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUocmVmcmVzaFRva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbkV4cGlyZSA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKGFjY2Vzc1Rva2VuRXhwaXJlS2V5KTtcblxuICAgIHRoaXMuY3JlZGVudGlhbCA9IHtcbiAgICAgIHJlZnJlc2hUb2tlbixcbiAgICAgIGFjY2Vzc1Rva2VuLFxuICAgICAgYWNjZXNzVG9rZW5FeHBpcmVcbiAgICB9O1xuXG4gICAgdGhpcy5fbG9naW5UeXBlID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodGhpcy5fY2FjaGUua2V5cy5sb2dpblR5cGVLZXkpO1xuXG4gICAgdGhpcy51c2VyLmNoZWNrTG9jYWxJbmZvKCk7XG4gIH1cbiAgcHVibGljIGFzeW5jIGNoZWNrTG9jYWxTdGF0ZUFzeW5jKCl7XG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXksIGFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbkV4cGlyZUtleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbkV4cGlyZSA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpO1xuXG4gICAgdGhpcy5jcmVkZW50aWFsID0ge1xuICAgICAgcmVmcmVzaFRva2VuLFxuICAgICAgYWNjZXNzVG9rZW4sXG4gICAgICBhY2Nlc3NUb2tlbkV4cGlyZVxuICAgIH07XG5cbiAgICB0aGlzLl9sb2dpblR5cGUgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHRoaXMuX2NhY2hlLmtleXMubG9naW5UeXBlS2V5KTtcblxuICAgIGF3YWl0IHRoaXMudXNlci5jaGVja0xvY2FsSW5mb0FzeW5jKCk7XG4gIH1cblxuICBnZXQgaXNBbm9ueW1vdXNBdXRoKCkge1xuICAgIHJldHVybiB0aGlzLmxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLkFOT05ZTU9VUztcbiAgfVxuXG4gIGdldCBpc0N1c3RvbUF1dGgoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9naW5UeXBlID09PSBMT0dJTlRZUEUuQ1VTVE9NO1xuICB9XG5cbiAgZ2V0IGlzV2VpeGluQXV0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2dpblR5cGUgPT09IExPR0lOVFlQRS5XRUNIQVQgfHwgdGhpcy5sb2dpblR5cGUgPT09IExPR0lOVFlQRS5XRUNIQVRfT1BFTiB8fCB0aGlzLmxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLldFQ0hBVF9QVUJMSUM7XG4gIH1cblxuICBnZXQgaXNVc2VybmFtZUF1dGgoKXtcbiAgICByZXR1cm4gdGhpcy5sb2dpblR5cGUgPT09IExPR0lOVFlQRS5VU0VSTkFNRTtcbiAgfVxuXG4gIGdldCBsb2dpblR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvZ2luVHlwZVxuICB9XG59XG5cbmNsYXNzIEF1dGh7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2NvbmZpZzogSUNsb3VkYmFzZUF1dGhDb25maWc7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2NhY2hlOiBJQ2xvdWRiYXNlQ2FjaGVcbiAgcHJpdmF0ZSByZWFkb25seSBfcmVxdWVzdDogSUNsb3VkYmFzZVJlcXVlc3Q7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3J1bnRpbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfYW5vbnltb3VzQXV0aFByb3ZpZGVyOiBBbm9ueW1vdXNBdXRoUHJvdmlkZXI7XG4gIHByaXZhdGUgX2N1c3RvbUF1dGhQcm92aWRlcjogQ3VzdG9tQXV0aFByb3ZpZGVyO1xuICBwcml2YXRlIF93ZWl4aW5BdXRoUHJvdmlkZXI6IFdlaXhpbkF1dGhQcm92aWRlcjtcbiAgcHJpdmF0ZSBfZW1haWxBdXRoUHJvdmlkZXI6IEVtYWlsQXV0aFByb3ZpZGVyO1xuICBwcml2YXRlIF91c2VybmFtZUF1dGhQcm92aWRlcjogVXNlcm5hbWVBdXRoUHJvdmlkZXI7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJQ2xvdWRiYXNlQXV0aENvbmZpZyZ7Y2FjaGU6SUNsb3VkYmFzZUNhY2hlLHJlcXVlc3Q6SUNsb3VkYmFzZVJlcXVlc3QscnVudGltZT86c3RyaW5nfSkge1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLl9jYWNoZSA9IGNvbmZpZy5jYWNoZTtcbiAgICB0aGlzLl9yZXF1ZXN0ID0gY29uZmlnLnJlcXVlc3Q7XG4gICAgdGhpcy5fcnVudGltZSA9IGNvbmZpZy5ydW50aW1lfHxSVU5USU1FLldFQlxuXG4gICAgZXZlbnRCdXMub24oRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCwgdGhpcy5fb25Mb2dpblR5cGVDaGFuZ2VkLmJpbmQodGhpcykpO1xuICB9XG4gIC8qKlxuICAgKiDojrflj5blvZPliY3nmbvlvZXnmoTnlKjmiLfkv6Hmga8t5ZCM5q2lXG4gICAqL1xuICBnZXQgY3VycmVudFVzZXIoKSB7XG4gICAgaWYodGhpcy5fY2FjaGUubW9kZT09PSdhc3luYycpe1xuICAgICAgLy8gYXN5bmMgc3RvcmFnZeeahOW5s+WPsOiwg+eUqOatpEFQSeaPkOekulxuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwnY3VycmVudCBwbGF0Zm9ybVxcJ3Mgc3RvcmFnZSBpcyBhc3luY2hyb25vdXMsIHBsZWFzZSB1c2UgZ2V0Q3VycmVuVXNlciBpbnN0ZWVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGxvZ2luU3RhdGUgPSB0aGlzLmhhc0xvZ2luU3RhdGUoKTtcbiAgICBpZiAobG9naW5TdGF0ZSkge1xuICAgICAgcmV0dXJuIGxvZ2luU3RhdGUudXNlciB8fCBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluW9k+WJjeeZu+W9leexu+Weiy3lkIzmraVcbiAgICovXG4gIGdldCBsb2dpblR5cGUoKTogTE9HSU5UWVBFIHtcbiAgICByZXR1cm4gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodGhpcy5fY2FjaGUua2V5cy5sb2dpblR5cGVLZXkpO1xuICB9XG4gIC8qKlxuICAgKiDojrflj5blvZPliY3nmbvlvZXnmoTnlKjmiLfkv6Hmga8t5byC5q2lXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W55So5oi35L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5nZXRDdXJyZW5Vc2VyKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0Q3VycmVuVXNlcigpe1xuICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBhd2FpdCB0aGlzLmdldExvZ2luU3RhdGUoKTtcbiAgICBpZiAobG9naW5TdGF0ZSkge1xuICAgICAgYXdhaXQgbG9naW5TdGF0ZS51c2VyLmNoZWNrTG9jYWxJbmZvQXN5bmMoKTtcbiAgICAgIHJldHVybiBsb2dpblN0YXRlLnVzZXIgfHwgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDojrflj5blvZPliY3nmbvlvZXnsbvlnost5byC5q2lXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0TG9naW5UeXBlKCk6IFByb21pc2U8TE9HSU5UWVBFPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmModGhpcy5fY2FjaGUua2V5cy5sb2dpblR5cGVLZXkpIGFzIExPR0lOVFlQRTtcbiAgfVxuICBwdWJsaWMgYXN5bmMgZ2V0QWNjZXNzVG9rZW4oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjY2Vzc1Rva2VuOiAoYXdhaXQgdGhpcy5fcmVxdWVzdC5nZXRBY2Nlc3NUb2tlbigpKS5hY2Nlc3NUb2tlbixcbiAgICAgIGVudjogdGhpcy5fY29uZmlnLmVudlxuICAgIH07XG4gIH1cbiAgcHVibGljIHdlaXhpbkF1dGhQcm92aWRlcih7IGFwcGlkLCBzY29wZSwgc3RhdGUgfSk6V2VpeGluQXV0aFByb3ZpZGVyIHtcbiAgICBpZighdGhpcy5fd2VpeGluQXV0aFByb3ZpZGVyKXtcbiAgICAgIHRoaXMuX3dlaXhpbkF1dGhQcm92aWRlciA9IG5ldyBXZWl4aW5BdXRoUHJvdmlkZXIoe1xuICAgICAgICAuLi50aGlzLl9jb25maWcsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdCxcbiAgICAgICAgcnVudGltZTogdGhpcy5fcnVudGltZVxuICAgICAgfSwgYXBwaWQsIHNjb3BlLCBzdGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl93ZWl4aW5BdXRoUHJvdmlkZXI7XG4gIH1cbiAgcHVibGljIGFub255bW91c0F1dGhQcm92aWRlcigpOkFub255bW91c0F1dGhQcm92aWRlciB7XG4gICAgaWYgKCF0aGlzLl9hbm9ueW1vdXNBdXRoUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuX2Fub255bW91c0F1dGhQcm92aWRlciA9IG5ldyBBbm9ueW1vdXNBdXRoUHJvdmlkZXIoe1xuICAgICAgICAuLi50aGlzLl9jb25maWcsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9hbm9ueW1vdXNBdXRoUHJvdmlkZXI7XG4gIH1cbiAgcHVibGljIGN1c3RvbUF1dGhQcm92aWRlcigpOkN1c3RvbUF1dGhQcm92aWRlciB7XG4gICAgaWYoIXRoaXMuX2N1c3RvbUF1dGhQcm92aWRlcil7XG4gICAgICB0aGlzLl9jdXN0b21BdXRoUHJvdmlkZXIgPSBuZXcgQ3VzdG9tQXV0aFByb3ZpZGVyKHtcbiAgICAgICAgLi4udGhpcy5fY29uZmlnLFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY3VzdG9tQXV0aFByb3ZpZGVyO1xuICB9XG4gIHB1YmxpYyBlbWFpbEF1dGhQcm92aWRlcigpOkVtYWlsQXV0aFByb3ZpZGVyIHtcbiAgICBpZighdGhpcy5fZW1haWxBdXRoUHJvdmlkZXIpe1xuICAgICAgdGhpcy5fZW1haWxBdXRoUHJvdmlkZXIgPSBuZXcgRW1haWxBdXRoUHJvdmlkZXIoe1xuICAgICAgICAuLi50aGlzLl9jb25maWcsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9lbWFpbEF1dGhQcm92aWRlcjtcbiAgfVxuICBwdWJsaWMgdXNlcm5hbWVBdXRoUHJvdmlkZXIoKTpVc2VybmFtZUF1dGhQcm92aWRlciB7XG4gICAgaWYoIXRoaXMuX3VzZXJuYW1lQXV0aFByb3ZpZGVyKXtcbiAgICAgIHRoaXMuX3VzZXJuYW1lQXV0aFByb3ZpZGVyID0gbmV3IFVzZXJuYW1lQXV0aFByb3ZpZGVyKHtcbiAgICAgICAgLi4udGhpcy5fY29uZmlnLFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdXNlcm5hbWVBdXRoUHJvdmlkZXI7XG4gIH1cbiAgLyoqXG4gICAqIOeUqOaIt+WQjeWvhueggeeZu+W9lVxuICAgKiBAcGFyYW0gdXNlcm5hbWUgXG4gICAqIEBwYXJhbSBwYXNzd29yZCBcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduSW5XaXRoVXNlcm5hbWVBbmRQYXNzd29yZCh1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlcm5hbWVBdXRoUHJvdmlkZXIoKS5zaWduSW4odXNlcm5hbWUsIHBhc3N3b3JkKTtcbiAgfVxuICAvKipcbiAgICog5qOA5rWL55So5oi35ZCN5piv5ZCm5bey57uP5Y2g55SoXG4gICAqIEBwYXJhbSB1c2VybmFtZSBcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5bnlKjmiLfmmK/lkKbooqvljaDnlKjlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmlzVXNlcm5hbWVSZWdpc3RlcmVkKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgaXNVc2VybmFtZVJlZ2lzdGVyZWQodXNlcm5hbWU6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICh0eXBlb2YgdXNlcm5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywndXNlcm5hbWUgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLmlzVXNlcm5hbWVSZWdpc3RlcmVkJywge1xuICAgICAgdXNlcm5hbWVcbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YT8uaXNSZWdpc3RlcmVkO1xuICB9XG4gIC8qKlxuICAgKiDpgq7nrrHlr4bnoIHnmbvlvZVcbiAgICogQHBhcmFtIGVtYWlsIFxuICAgKiBAcGFyYW0gcGFzc3dvcmQgXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmVtYWlsQXV0aFByb3ZpZGVyKCkuc2lnbkluKGVtYWlsLCBwYXNzd29yZCk7XG4gIH1cbiAgLyoqXG4gICAqIOmCrueuseWvhueggeazqOWGjFxuICAgKiBAcGFyYW0gZW1haWwgXG4gICAqIEBwYXJhbSBwYXNzd29yZCBcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduVXBXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbDpzdHJpbmcsIHBhc3N3b3JkOnN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmVtYWlsQXV0aFByb3ZpZGVyKCkuc2lnblVwKGVtYWlsLHBhc3N3b3JkKTtcbiAgfVxuICAvKipcbiAgICog6YeN572u6YKu566x5a+G56CBXG4gICAqIEBwYXJhbSBlbWFpbCBcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZW5kUGFzc3dvcmRSZXNldEVtYWlsKGVtYWlsOnN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmVtYWlsQXV0aFByb3ZpZGVyKCkucmVzZXRQYXNzd29yZChlbWFpbCk7XG4gIH1cbiAgLyoqXG4gICAqIOeZu+WHulxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+eUqOaIt+eZu+WHuuWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuc2lnbk91dCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN55So5oi35piv5ZCm5Li65Yy/5ZCN55m75b2V77yI5Yy/5ZCN55m75b2V5LiN5pSv5oyBc2lnbk91dO+8iScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHNpZ25PdXQoKSB7XG4gICAgY29uc3QgbG9naW5UeXBlID0gYXdhaXQgdGhpcy5nZXRMb2dpblR5cGUoKTtcbiAgICBpZiAobG9naW5UeXBlID09PSBMT0dJTlRZUEUuQU5PTllNT1VTKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sXG4gICAgICAgIG1zZzogJ2Fub255bW91cyB1c2VyIGRvZXNuXFwndCBzdXBwb3J0IHNpZ25PdXQgYWN0aW9uJ1xuICAgICAgfSkpO1xuICAgIH1cbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSwgYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuRXhwaXJlS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IGFjdGlvbiA9ICdhdXRoLmxvZ291dCc7XG5cbiAgICBjb25zdCByZWZyZXNoX3Rva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGlmICghcmVmcmVzaF90b2tlbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoYWN0aW9uLCB7IHJlZnJlc2hfdG9rZW4gfSk7XG5cbiAgICB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSk7XG5cbiAgICBldmVudEJ1cy5maXJlKEVWRU5UUy5MT0dJTl9TVEFURV9DSEFOR0VEKTtcbiAgICBldmVudEJ1cy5maXJlKEVWRU5UUy5MT0dJTl9UWVBFX0NIQU5HRUQsIHtcbiAgICAgIGVudjogdGhpcy5fY29uZmlnLmVudixcbiAgICAgIGxvZ2luVHlwZTogTE9HSU5UWVBFLk5VTEwsXG4gICAgICBwZXJzaXN0ZW5jZTogdGhpcy5fY29uZmlnLnBlcnNpc3RlbmNlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIHB1YmxpYyBhc3luYyBvbkxvZ2luU3RhdGVDaGFuZ2VkKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGV2ZW50QnVzLm9uKEVWRU5UUy5MT0dJTl9TVEFURV9DSEFOR0VELCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gYXdhaXQgdGhpcy5nZXRMb2dpblN0YXRlKCk7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGxvZ2luU3RhdGUpO1xuICAgIH0pO1xuICAgIC8vIOeri+WIu+aJp+ihjOS4gOasoeWbnuiwg1xuICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBhd2FpdCB0aGlzLmdldExvZ2luU3RhdGUoKTtcbiAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGxvZ2luU3RhdGUpO1xuICB9XG4gIHB1YmxpYyBvbkxvZ2luU3RhdGVFeHBpcmVkKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGV2ZW50QnVzLm9uKEVWRU5UUy5MT0dJTl9TVEFURV9FWFBJUkVELCBjYWxsYmFjay5iaW5kKHRoaXMpKTtcbiAgfVxuICBwdWJsaWMgb25BY2Nlc3NUb2tlblJlZnJlc2hlZChjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBldmVudEJ1cy5vbihFVkVOVFMuQUNDRVNTX1RPS0VOX1JFRlJFU0hELCBjYWxsYmFjay5iaW5kKHRoaXMpKTtcbiAgfVxuICBwdWJsaWMgb25Bbm9ueW1vdXNDb252ZXJ0ZWQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgZXZlbnRCdXMub24oRVZFTlRTLkFOT05ZTU9VU19DT05WRVJURUQsIGNhbGxiYWNrLmJpbmQodGhpcykpO1xuICB9XG4gIHB1YmxpYyBvbkxvZ2luVHlwZUNoYW5nZWQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgZXZlbnRCdXMub24oRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCwgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgbG9naW5TdGF0ZSA9IGF3YWl0IHRoaXMuZ2V0TG9naW5TdGF0ZSgpO1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBsb2dpblN0YXRlKTtcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog6I635Y+W5pys5Zyw55m75b2V5oCBLeWQjOatpVxuICAgKi9cbiAgcHVibGljIGhhc0xvZ2luU3RhdGUoKTogSUxvZ2luU3RhdGV8bnVsbCB7XG4gICAgaWYodGhpcy5fY2FjaGUubW9kZT09PSdhc3luYycpe1xuICAgICAgLy8gYXN5bmMgc3RvcmFnZeeahOW5s+WPsOiwg+eUqOatpEFQSeaPkOekulxuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwnY3VycmVudCBwbGF0Zm9ybVxcJ3Mgc3RvcmFnZSBpcyBhc3luY2hyb25vdXMsIHBsZWFzZSB1c2UgZ2V0TG9naW5TdGF0ZSBpbnN0ZWVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKHJlZnJlc2hUb2tlbktleSk7XG4gICAgaWYgKHJlZnJlc2hUb2tlbikge1xuICAgICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgICBsb2dpblN0YXRlLmNoZWNrTG9jYWxTdGF0ZSgpO1xuICAgICAgcmV0dXJuIGxvZ2luU3RhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog6I635Y+W5pys5Zyw55m75b2V5oCBLeW8guatpVxuICAgKiDmraRBUEnkuLrlhbzlrrnlvILmraVzdG9yYWdl55qE5bmz5Y+wXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W5pys5Zyw55m75b2V5oCB5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5nZXRMb2dpblN0YXRlKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0TG9naW5TdGF0ZSgpIHtcbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgaWYgKHJlZnJlc2hUb2tlbikge1xuICAgICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBsb2dpblN0YXRlLmNoZWNrTG9jYWxTdGF0ZUFzeW5jKCk7XG4gICAgICByZXR1cm4gbG9naW5TdGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbihob29rKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMuX3JlcXVlc3QuX3Nob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbkhvb2sgPSBob29rLmJpbmQodGhpcyk7XG4gIH1cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iOt+WPlueUqOaIt+S/oeaBr+Wksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOaYr+WQpuW3sueZu+W9lScsXG4gICAgICAnICAyIC0g6LCD55SoIGF1dGgoKS5nZXRVc2VySW5mbygpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGdldFVzZXJJbmZvKCk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgYWN0aW9uID0gJ2F1dGguZ2V0VXNlckluZm8nO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKGFjdGlvbiwge30pO1xuICAgIGlmIChyZXMuY29kZSkge1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ucmVzLmRhdGEsXG4gICAgICAgIHJlcXVlc3RJZDogcmVzLnNlcUlkXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog6I635Y+WSHR0cOmJtOadg2hlYWRlcu+8jOeUqOS6juS6keaOpeWFpSBIVFRQIOiuv+mXruS6keWHveaVsOaXtueahOmJtOadg1xuICAgKi9cbiAgcHVibGljIGdldEF1dGhIZWFkZXIoKSB7XG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXksIGFjY2Vzc1Rva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKHJlZnJlc2hUb2tlbktleSk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZShhY2Nlc3NUb2tlbktleSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICd4LWNsb3VkYmFzZS1jcmVkZW50aWFscyc6IGFjY2Vzc1Rva2VuICsgJy9AQC8nICsgcmVmcmVzaFRva2VuXG4gICAgfTtcbiAgfVxuICAvKipcbiAgICog5byC5q2l5qih5byP6I635Y+WSHR0cOmJtOadg2hlYWRlcu+8jOeUqOS6juS6keaOpeWFpSBIVFRQIOiuv+mXruS6keWHveaVsOaXtueahOmJtOadg1xuICAgKiDosIPnlKjmraRBUEnkvJrliLfmlrDnmbvlvZXmgIFcbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRBdXRoSGVhZGVyQXN5bmMoKSB7XG4gICAgYXdhaXQgdGhpcy5fcmVxdWVzdC5yZWZyZXNoQWNjZXNzVG9rZW4oKTtcbiAgICBcbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSwgYWNjZXNzVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gYXdhaXQgIHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIHJldHVybiB7XG4gICAgICAneC1jbG91ZGJhc2UtY3JlZGVudGlhbHMnOiBhY2Nlc3NUb2tlbiArICcvQEAvJyArIHJlZnJlc2hUb2tlblxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9vbkxvZ2luVHlwZUNoYW5nZWQoZXYpIHtcbiAgICBjb25zdCB7IGxvZ2luVHlwZSwgcGVyc2lzdGVuY2UsIGVudiB9ID0gZXYuZGF0YTtcbiAgICBpZiAoZW52ICE9PSB0aGlzLl9jb25maWcuZW52KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIOeZu+W9leaAgei9rOWPmOWQjui/geenu2NhY2hl77yM6Ziy5q2i5Zyo5Yy/5ZCN55m75b2V54q25oCB5LiLY2FjaGXmt7fnlKhcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS51cGRhdGVQZXJzaXN0ZW5jZUFzeW5jKHBlcnNpc3RlbmNlKTtcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKHRoaXMuX2NhY2hlLmtleXMubG9naW5UeXBlS2V5LCBsb2dpblR5cGUpO1xuICB9XG59XG5cbmNvbnN0IEVWRU5UUyA9IHtcbiAgLy8g55m75b2V5oCB5pS55Y+Y5ZCO6Kem5Y+RXG4gIExPR0lOX1NUQVRFX0NIQU5HRUQgIDogJ2xvZ2luU3RhdGVDaGFuZ2VkJyxcbiAgLy8g55m75b2V5oCB6L+H5pyf5ZCO6Kem5Y+RXG4gIExPR0lOX1NUQVRFX0VYUElSRUQgIDogJ2xvZ2luU3RhdGVFeHBpcmUnLFxuICAvLyDnmbvlvZXnsbvlnovmlLnlj5jlkI7op6blj5FcbiAgTE9HSU5fVFlQRV9DSEFOR0VEICAgOiAnbG9naW5UeXBlQ2hhbmdlZCcsXG4gIC8vIOWMv+WQjei0puaIt+iiq+i9rOato+WQjuinpuWPkVxuICBBTk9OWU1PVVNfQ09OVkVSVEVEICA6ICdhbm9ueW1vdXNDb252ZXJ0ZWQnLCBcbiAgLy8gYWNjZXNzIHRva2Vu5Yi35paw5ZCO6Kem5Y+RXG4gIEFDQ0VTU19UT0tFTl9SRUZSRVNIRDogJ3JlZnJlc2hBY2Nlc3NUb2tlbidcbn07XG5cbmNvbnN0IGNvbXBvbmVudDpJQ2xvdWRiYXNlQ29tcG9uZW50ID0ge1xuICBuYW1lOiBDT01QT05FTlRfTkFNRSxcbiAgbmFtZXNwYWNlOiAnYXV0aCcsXG4gIGluamVjdEV2ZW50czoge1xuICAgIGJ1czogZXZlbnRCdXMsXG4gICAgZXZlbnRzOiBbXG4gICAgICBFVkVOVFMuTE9HSU5fVFlQRV9DSEFOR0VELFxuICAgICAgRVZFTlRTLkxPR0lOX1NUQVRFX0VYUElSRUQsXG4gICAgICBFVkVOVFMuTE9HSU5fU1RBVEVfQ0hBTkdFRCxcbiAgICAgIEVWRU5UUy5BQ0NFU1NfVE9LRU5fUkVGUkVTSEQsXG4gICAgICBFVkVOVFMuQU5PTllNT1VTX0NPTlZFUlRFRFxuICAgIF1cbiAgfSxcbiAgZW50aXR5OiBmdW5jdGlvbihjb25maWc6UGljazxJQ2xvdWRiYXNlQXV0aENvbmZpZywncGVyc2lzdGVuY2UnPj17cGVyc2lzdGVuY2U6J3Nlc3Npb24nfSl7XG4gICAgaWYgKHRoaXMuYXV0aEluc3RhbmNlKSB7XG4gICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLCdldmVyeSBjbG91ZGJhc2UgaW5zdGFuY2Ugc2hvdWxkIGhhcyBvbmx5IG9uZSBhdXRoIG9iamVjdCcpO1xuICAgICAgcmV0dXJuIHRoaXMuYXV0aEluc3RhbmNlO1xuICAgIH1cbiAgICBjb25zdCB7IGFkYXB0ZXIscnVudGltZSB9ID0gdGhpcy5wbGF0Zm9ybTtcbiAgICAvLyDlpoLkuI3mmI7noa7mjIflrppwZXJzaXN0ZW5jZeWImeS8mOWFiOWPluWQhOW5s+WPsGFkYXB0ZXLpppbpgInvvIzlhbbmrKFzZXNzaW9uXG4gICAgY29uc3QgbmV3UGVyc2lzdGVuY2UgPSBjb25maWcucGVyc2lzdGVuY2UgfHwgYWRhcHRlci5wcmltYXJ5U3RvcmFnZTtcbiAgICBpZiAobmV3UGVyc2lzdGVuY2UmJihuZXdQZXJzaXN0ZW5jZSAhPT0gdGhpcy5jb25maWcucGVyc2lzdGVuY2UpKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbmZpZyh7cGVyc2lzdGVuY2U6IG5ld1BlcnNpc3RlbmNlfSlcbiAgICB9XG5cbiAgICBjb25zdCB7IGVudiwgcGVyc2lzdGVuY2UsIGRlYnVnIH0gPSB0aGlzLmNvbmZpZztcbiAgICB0aGlzLmF1dGhJbnN0YW5jZSA9IG5ldyBBdXRoKHtcbiAgICAgIGVudiwgXG4gICAgICBwZXJzaXN0ZW5jZSwgXG4gICAgICBkZWJ1ZyxcbiAgICAgIGNhY2hlOiB0aGlzLmNhY2hlLFxuICAgICAgcmVxdWVzdDogdGhpcy5yZXF1ZXN0LFxuICAgICAgcnVudGltZTogcnVudGltZVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmF1dGhJbnN0YW5jZTtcbiAgfVxufVxuXG50cnl7XG4gIC8vIOWwneivleiHquWKqOazqOWGjOiHs+WFqOWxgOWPmOmHj2Nsb3VkYmFzZVxuICAvLyDmraTooYzkuLrlj6rlnKjmtY/op4jlmajnjq/looPkuIvmnInmlYhcbiAgY2xvdWRiYXNlLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG59Y2F0Y2goZSl7fVxuXG5leHBvcnQge1xuICBVc2VySW5mbyxcbiAgQXV0aCxcbiAgQXV0aFByb3ZpZGVyLFxuICBFVkVOVFMsXG4gIGV2ZW50QnVzXG59O1xuLyoqXG4gKiBAYXBpIOaJi+WKqOazqOWGjOiHs2Nsb3VkYmFzZSBhcHBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQXV0aChhcHA6SUNsb3VkYmFzZSl7XG4gIGFwcC5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xufVxuXG50eXBlIElQcm92aWRlciA9IG5ldyguLi5hcmdzOmFueVtdKSA9PiBhbnk7XG4vKipcbiAqIOazqOWGjHByb3ZpZGVy77yM5aaC5p6cXG4gKiBAcGFyYW0gbmFtZSBcbiAqIEBwYXJhbSBwcm92aWRlciBcbiAqIEBleGFtcGxlIFxuICogLy8g5rOo5YaMXG4gKiByZWdpc3RlclByb3ZpZGVyKCdlbWFpbEF1dGhQcm92aWRlcicsZnVuY3Rpb24oKXtcbiAqICAgLy8gLi4uXG4gKiB9KTtcbiAqIC8vIOS9v+eUqOaWsHByb3ZpZGVy55m75b2VXG4gKiBjbG91ZGJhc2UuYXV0aCgpLmVtYWlsQXV0aFByb3ZpZGVyKCkuc2lnbkluKCk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclByb3ZpZGVyKG5hbWU6c3RyaW5nLHByb3ZpZGVyOklQcm92aWRlcil7XG4gIGNvbnN0IHByb3RvID0gQXV0aC5wcm90b3R5cGU7XG4gIHByb3RvW25hbWVdID0gZnVuY3Rpb24ob3B0aW9uczpvYmplY3Qpe1xuICAgIGNvbnN0IHByaXZhdGVOYW1lID0gYF8ke25hbWV9YDtcbiAgICBpZighdGhpc1twcml2YXRlTmFtZV0pe1xuICAgICAgdGhpc1twcml2YXRlTmFtZV0gPSBuZXcgcHJvdmlkZXIoe1xuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAuLi50aGlzLl9jb25maWdcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpc1twcml2YXRlTmFtZV07XG4gIH07XG59Il19