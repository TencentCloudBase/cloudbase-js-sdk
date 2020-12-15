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
import { events, adapters, utils, constants, helpers } from '@cloudbase/utilities';
import { WeixinAuthProvider } from './providers/weixinAuthProvider';
import { AnonymousAuthProvider } from './providers/anonymousAuthProvider';
import { CustomAuthProvider } from './providers/customAuthProvider';
import { LOGINTYPE } from './constants';
import { AuthProvider } from './providers/base';
import { EmailAuthProvider } from './providers/emailAuthProvider';
import { UsernameAuthProvider } from './providers/usernameAuthProvider';
var CloudbaseEventEmitter = events.CloudbaseEventEmitter;
var RUNTIME = adapters.RUNTIME;
var printWarn = utils.printWarn, throwError = utils.throwError;
var ERRORS = constants.ERRORS, COMMUNITY_SITE_URL = constants.COMMUNITY_SITE_URL;
var catchErrorsDecorator = helpers.catchErrorsDecorator;
var COMPONENT_NAME = 'auth';
var eventBus = new CloudbaseEventEmitter();
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
            return this.loginType === LOGINTYPE.ANONYMOUS;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginState.prototype, "isCustomAuth", {
        get: function () {
            return this.loginType === LOGINTYPE.CUSTOM;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginState.prototype, "isWeixinAuth", {
        get: function () {
            return this.loginType === LOGINTYPE.WECHAT || this.loginType === LOGINTYPE.WECHAT_OPEN || this.loginType === LOGINTYPE.WECHAT_PUBLIC;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginState.prototype, "isUsernameAuth", {
        get: function () {
            return this.loginType === LOGINTYPE.USERNAME;
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
export { LoginState };
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
            this._weixinAuthProvider = new WeixinAuthProvider(__assign(__assign({}, this._config), { cache: this._cache, request: this._request, runtime: this._runtime }), appid, scope, state);
        }
        return this._weixinAuthProvider;
    };
    Auth.prototype.anonymousAuthProvider = function () {
        if (!this._anonymousAuthProvider) {
            this._anonymousAuthProvider = new AnonymousAuthProvider(__assign(__assign({}, this._config), { cache: this._cache, request: this._request }));
        }
        return this._anonymousAuthProvider;
    };
    Auth.prototype.customAuthProvider = function () {
        if (!this._customAuthProvider) {
            this._customAuthProvider = new CustomAuthProvider(__assign(__assign({}, this._config), { cache: this._cache, request: this._request }));
        }
        return this._customAuthProvider;
    };
    Auth.prototype.emailAuthProvider = function () {
        if (!this._emailAuthProvider) {
            this._emailAuthProvider = new EmailAuthProvider(__assign(__assign({}, this._config), { cache: this._cache, request: this._request }));
        }
        return this._emailAuthProvider;
    };
    Auth.prototype.usernameAuthProvider = function () {
        if (!this._usernameAuthProvider) {
            this._usernameAuthProvider = new UsernameAuthProvider(__assign(__assign({}, this._config), { cache: this._cache, request: this._request }));
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
                        if (loginType === LOGINTYPE.ANONYMOUS) {
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
                            loginType: LOGINTYPE.NULL,
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
var EVENTS = {
    LOGIN_STATE_CHANGED: 'loginStateChanged',
    LOGIN_STATE_EXPIRED: 'loginStateExpire',
    LOGIN_TYPE_CHANGED: 'loginTypeChanged',
    ANONYMOUS_CONVERTED: 'anonymousConverted',
    ACCESS_TOKEN_REFRESHD: 'refreshAccessToken'
};
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
        if (config === void 0) { config = { region: '', persistence: 'session' }; }
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
            region: config.region,
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
export { Auth, AuthProvider, EVENTS, eventBus };
export function registerAuth(app) {
    try {
        app.registerComponent(component);
    }
    catch (e) {
        console.warn(e);
    }
}
export function registerProvider(name, provider) {
    var proto = Auth.prototype;
    proto[name] = function (options) {
        var privateName = "_" + name;
        if (!this[privateName]) {
            this[privateName] = new provider(__assign(__assign({}, options), this._config));
        }
        return this[privateName];
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBSy9FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBSWhFLElBQUEscUJBQXFCLEdBQUssTUFBTSxzQkFBWCxDQUFZO0FBQ2pDLElBQUEsT0FBTyxHQUFLLFFBQVEsUUFBYixDQUFjO0FBQ3JCLElBQUEsU0FBUyxHQUFnQixLQUFLLFVBQXJCLEVBQUMsVUFBVSxHQUFLLEtBQUssV0FBVixDQUFXO0FBQy9CLElBQUEsTUFBTSxHQUF3QixTQUFTLE9BQWpDLEVBQUMsa0JBQWtCLEdBQUssU0FBUyxtQkFBZCxDQUFlO0FBQ3hDLElBQUEsb0JBQW9CLEdBQUssT0FBTyxxQkFBWixDQUFhO0FBRXpDLElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQztBQWM5QixJQUFNLFFBQVEsR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7QUFPN0M7SUF1QkUsY0FBWSxPQUFxQjtRQUN2QixJQUFB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Q1QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUM7QUFlRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsSUFBWSxFQUFDLFFBQW1CO0lBQy9ELElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDN0IsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVMsT0FBZTtRQUNwQyxJQUFNLFdBQVcsR0FBRyxNQUFJLElBQU0sQ0FBQztRQUMvQixJQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLFFBQVEsdUJBQzNCLE9BQU8sR0FDUCxJQUFJLENBQUMsT0FBTyxFQUNmLENBQUM7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBldmVudHMsYWRhcHRlcnMsdXRpbHMsY29uc3RhbnRzLGhlbHBlcnMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ2FjaGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NhY2hlJztcbmltcG9ydCB7IElDbG91ZGJhc2VSZXF1ZXN0IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9yZXF1ZXN0JztcbmltcG9ydCB7IElDbG91ZGJhc2VBdXRoQ29uZmlnLElDcmVkZW50aWFsLElVc2VyLElVc2VySW5mbyxJQXV0aFByb3ZpZGVyLElMb2dpblN0YXRlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9hdXRoJztcbmltcG9ydCB7IElDbG91ZGJhc2VDb21wb25lbnQgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWl4aW5BdXRoUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy93ZWl4aW5BdXRoUHJvdmlkZXInO1xuaW1wb3J0IHsgQW5vbnltb3VzQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvYW5vbnltb3VzQXV0aFByb3ZpZGVyJztcbmltcG9ydCB7IEN1c3RvbUF1dGhQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2N1c3RvbUF1dGhQcm92aWRlcic7XG5pbXBvcnQgeyBMT0dJTlRZUEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9iYXNlJztcbmltcG9ydCB7IEVtYWlsQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvZW1haWxBdXRoUHJvdmlkZXInO1xuaW1wb3J0IHsgVXNlcm5hbWVBdXRoUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy91c2VybmFtZUF1dGhQcm92aWRlcic7XG5cbmRlY2xhcmUgY29uc3QgY2xvdWRiYXNlOiBJQ2xvdWRiYXNlO1xuXG5jb25zdCB7IENsb3VkYmFzZUV2ZW50RW1pdHRlciB9ID0gZXZlbnRzO1xuY29uc3QgeyBSVU5USU1FIH0gPSBhZGFwdGVycztcbmNvbnN0IHsgcHJpbnRXYXJuLHRocm93RXJyb3IgfSA9IHV0aWxzO1xuY29uc3QgeyBFUlJPUlMsQ09NTVVOSVRZX1NJVEVfVVJMIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IGNhdGNoRXJyb3JzRGVjb3JhdG9yIH0gPSBoZWxwZXJzO1xuXG5jb25zdCBDT01QT05FTlRfTkFNRSA9ICdhdXRoJztcblxuaW50ZXJmYWNlIFVzZXJJbmZvIHtcbiAgb3BlbmlkOiBzdHJpbmc7XG4gIG5pY2tuYW1lPzogc3RyaW5nO1xuICBzZXg/OiBudW1iZXI7XG4gIHByb3ZpbmNlPzogc3RyaW5nO1xuICBjaXR5Pzogc3RyaW5nO1xuICBjb3VudHJ5Pzogc3RyaW5nO1xuICBoZWFkaW1ndXJsPzogc3RyaW5nO1xuICBwcml2aWxlZ2U/OiBbc3RyaW5nXTtcbiAgdW5pb25pZD86IHN0cmluZztcbn1cblxuY29uc3QgZXZlbnRCdXMgPSBuZXcgQ2xvdWRiYXNlRXZlbnRFbWl0dGVyKCk7XG5cbmludGVyZmFjZSBJVXNlck9wdGlvbnMge1xuICBjYWNoZTogSUNsb3VkYmFzZUNhY2hlO1xuICByZXF1ZXN0OiBJQ2xvdWRiYXNlUmVxdWVzdDtcbn1cblxuY2xhc3MgVXNlciBpbXBsZW1lbnRzIElVc2VyIHtcbiAgcHVibGljIHVpZDogc3RyaW5nO1xuICBwdWJsaWMgbG9naW5UeXBlOiBzdHJpbmc7XG4gIHB1YmxpYyBvcGVuaWQ6IHN0cmluZztcbiAgcHVibGljIHd4T3BlbklkOiBzdHJpbmc7XG4gIHB1YmxpYyB3eFB1YmxpY0lkOiBzdHJpbmc7XG4gIHB1YmxpYyB1bmlvbklkOiBzdHJpbmc7XG4gIHB1YmxpYyBxcU1pbmlPcGVuSWQ6IHN0cmluZztcbiAgcHVibGljIGN1c3RvbVVzZXJJZDogc3RyaW5nO1xuICBwdWJsaWMgbmlja05hbWU6IHN0cmluZztcbiAgcHVibGljIGdlbmRlcjogc3RyaW5nO1xuICBwdWJsaWMgYXZhdGFyVXJsOiBzdHJpbmc7XG4gIHB1YmxpYyBlbWFpbDogc3RyaW5nO1xuICBwdWJsaWMgaGFzUGFzc3dvcmQ6IGJvb2xlYW47XG4gIHB1YmxpYyBsb2NhdGlvbj86IHtcbiAgICBjb3VudHJ5Pzogc3RyaW5nO1xuICAgIHByb3ZpbmNlPzogc3RyaW5nO1xuICAgIGNpdHk/OiBzdHJpbmc7XG4gIH07XG5cbiAgcHJpdmF0ZSBfY2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcbiAgcHJpdmF0ZSBfcmVxdWVzdDogSUNsb3VkYmFzZVJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogSVVzZXJPcHRpb25zKSB7XG4gICAgY29uc3QgeyBjYWNoZSxyZXF1ZXN0IH0gPSBvcHRpb25zO1xuICAgIHRoaXMuX2NhY2hlID0gY2FjaGU7XG4gICAgdGhpcy5fcmVxdWVzdCA9IHJlcXVlc3Q7XG5cbiAgICB0aGlzLl9zZXRVc2VySW5mbygpO1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnlKjmiLfkv6Hmga8t5ZCM5q2lXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hlY2tMb2NhbEluZm8oKSB7XG4gICAgdGhpcy51aWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd1aWQnKTtcbiAgICB0aGlzLmxvZ2luVHlwZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2xvZ2luVHlwZScpO1xuICAgIHRoaXMub3BlbmlkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnd3hPcGVuSWQnKTtcbiAgICB0aGlzLnd4T3BlbklkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnd3hPcGVuSWQnKTtcbiAgICB0aGlzLnd4UHVibGljSWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd3eFB1YmxpY0lkJyk7XG4gICAgdGhpcy51bmlvbklkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnd3hVbmlvbklkJyk7XG4gICAgdGhpcy5xcU1pbmlPcGVuSWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdxcU1pbmlPcGVuSWQnKTtcbiAgICB0aGlzLmN1c3RvbVVzZXJJZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2N1c3RvbVVzZXJJZCcpO1xuICAgIHRoaXMubmlja05hbWUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCduaWNrTmFtZScpO1xuICAgIHRoaXMuZ2VuZGVyID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnZ2VuZGVyJyk7XG4gICAgdGhpcy5hdmF0YXJVcmwgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdhdmF0YXJVcmwnKTtcbiAgICB0aGlzLmVtYWlsID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnZW1haWwnKTtcbiAgICB0aGlzLmhhc1Bhc3N3b3JkID0gQm9vbGVhbih0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdoYXNQYXNzd29yZCcpKTtcbiAgICB0aGlzLmxvY2F0aW9uID0ge1xuICAgICAgY291bnRyeTogdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnY291bnRyeScpLFxuICAgICAgcHJvdmluY2U6IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3Byb3ZpbmNlJyksXG4gICAgICBjaXR5OiB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdjaXR5JylcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnlKjmiLfkv6Hmga8t5byC5q2lXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hlY2tMb2NhbEluZm9Bc3luYygpIHtcbiAgICB0aGlzLnVpZCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygndWlkJyk7XG4gICAgdGhpcy5sb2dpblR5cGUgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2xvZ2luVHlwZScpO1xuICAgIHRoaXMub3BlbmlkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd3eE9wZW5JZCcpO1xuICAgIHRoaXMud3hPcGVuSWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3d4T3BlbklkJyk7XG4gICAgdGhpcy53eFB1YmxpY0lkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd3eFB1YmxpY0lkJyk7XG4gICAgdGhpcy51bmlvbklkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd3eFVuaW9uSWQnKTtcbiAgICB0aGlzLnFxTWluaU9wZW5JZCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygncXFNaW5pT3BlbklkJyk7XG4gICAgdGhpcy5jdXN0b21Vc2VySWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2N1c3RvbVVzZXJJZCcpO1xuICAgIHRoaXMubmlja05hbWUgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ25pY2tOYW1lJyk7XG4gICAgdGhpcy5nZW5kZXIgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2dlbmRlcicpO1xuICAgIHRoaXMuYXZhdGFyVXJsID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdhdmF0YXJVcmwnKTtcbiAgICB0aGlzLmVtYWlsID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdlbWFpbCcpO1xuICAgIHRoaXMuaGFzUGFzc3dvcmQgPSBCb29sZWFuKGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnaGFzUGFzc3dvcmQnKSk7XG4gICAgdGhpcy5sb2NhdGlvbiA9IHtcbiAgICAgIGNvdW50cnk6IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnY291bnRyeScpLFxuICAgICAgcHJvdmluY2U6IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygncHJvdmluY2UnKSxcbiAgICAgIGNpdHk6IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnY2l0eScpXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiDlsIblvZPliY3otKbmiLfkuI7oh6rlrprkuYnnmbvlvZUgVGlja2V0IOi/m+ihjOe7keWumu+8jOe7keWumuS5i+WQjuS+v+WPr+S7pemAmui/h+iHquWumuS5ieeZu+W9leeZu+W9leW9k+WJjeS6keW8gOWPkei0puaIt+OAglxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGlja2V0IOiHquWumuS5ieeZu+W9lXRpY2tldFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+e7keWumuiHquWumuS5ieeZu+W9leWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLmxpbmtXaXRoVGlja2V0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDmraTotKbmiLfmmK/lkKblt7Lnu4/nu5Hlrproh6rlrprkuYnnmbvlvZUnLFxuICAgICAgJyAgMyAtIHRpY2tldCDlj4LmlbDmmK/lkKblvZLlsZ7lvZPliY3njq/looMnLFxuICAgICAgJyAgNCAtIOWIm+W7uiB0aWNrZXQg55qE6Ieq5a6a5LmJ55m75b2V56eB6ZKl5piv5ZCm6L+H5pyfJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgbGlua1dpdGhUaWNrZXQodGlja2V0OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZih0eXBlb2YgdGlja2V0ICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aWNrZXQgbXVzdCBiZSBzdHJpbmcnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5saW5rV2l0aFRpY2tldCcseyB0aWNrZXQgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOWwhuW9k+WJjei0puaIt+S4juesrOS4ieaWuemJtOadg+aPkOS+m+aWue+8jOS7pemHjeWumuWQkeeahOW9ouW8j++8jOi/m+ihjOe7keWumu+8jOe7keWumuS5i+WQjuS+v+WPr+S7pemAmui/h+esrOS4ieaWuemJtOadg+aPkOS+m+aWueeZu+W9leW9k+WJjeeahOS6keW8gOWPkei0puaIt+OAglxuICAgKiBAcGFyYW0gcHJvdmlkZXIg54m55a6a55m75b2V5pa55byP55qEcHJvdmlkZXLvvIzlv4XpobvlhbflpIdzaWduSW5XaXRoUmVkaXJlY3Tmlrnms5VcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnu5HlrprnrKzkuInmlrnnmbvlvZXmlrnlvI/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5saW5rV2l0aFJlZGlyZWN0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDmraTotKbmiLfmmK/lkKblt7Lnu4/nu5HlrprmraTnrKzkuInmlrknLFxuICAgICAgJyAgMyAtIOatpOesrOS4ieaWueaYr+WQpuW3sue7j+aOiOadgycsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGxpbmtXaXRoUmVkaXJlY3QocHJvdmlkZXI6IElBdXRoUHJvdmlkZXIpOiB2b2lkIHtcbiAgICBwcm92aWRlci5zaWduSW5XaXRoUmVkaXJlY3QoKTtcbiAgfVxuICAvKipcbiAgICog6I635Y+W5b2T5YmN6LSm5oi355qE5b6u5L+hIFVuaW9uSUQg57uR5a6a55qE5LqR5byA5Y+R6LSm5oi35YiX6KGo44CC5aaC5p6c5b2T5YmN6LSm5oi35LiN5a2Y5ZyoIFVuaW9uSUTvvIzkvJrov5Tlm57plJnor6/jgIJcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5botKbmiLfliJfooajlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5nZXRMaW5rZWRVaWRMaXN0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0TGlua2VkVWlkTGlzdCgpIHtcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5nZXRMaW5rZWRVaWRMaXN0Jyx7fSk7XG4gICAgbGV0IGhhc1ByaW1hcnlVaWQgPSBmYWxzZTtcbiAgICBjb25zdCB1c2VycyA9IGRhdGEudXNlcnMgYXMgSVVzZXJJbmZvW107XG4gICAgZm9yKGNvbnN0IHVzZXIgb2YgdXNlcnMpIHtcbiAgICAgIGlmKHVzZXIud3hPcGVuSWQgJiYgdXNlci53eFB1YmxpY0lkKSB7XG4gICAgICAgIGhhc1ByaW1hcnlVaWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXJzLFxuICAgICAgaGFzUHJpbWFyeVVpZFxuICAgIH07XG4gIH1cbiAgLyoqXG4gICAqIOiuvue9ruW+ruS/oeS4u+i0puWPt++8jOmAmuW4uOaQremFjeWSjCBVc2VyLmdldExpbmtlZFVpZExpc3QoKSDkvb/nlKjvvIznlKjkuo7lnKjlkIzkuKrlvq7kv6EgVW5pb25JRCDlr7nlupTnmoTlpJrkuKrkupHlvIDlj5HotKblj7fkuK3vvIzorr7nva7lhbbkuK3kuIDkuKrkuLrkuLvotKblj7dcbiAgICog6K6+572u5LmL5ZCO77yM6YCa6L+HIFVuaW9uSUQg55m75b2V5L6/5Lya55m75b2V6Iez5Li76LSm5Y+35LmL5LiK44CCXG4gICAqIEBwYXJhbSB1aWRcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICforr7nva7lvq7kv6HkuLvotKblj7flpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5zZXRQcmltYXJ5VWlkKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgc2V0UHJpbWFyeVVpZCh1aWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGguc2V0UHJpbWFyeVVpZCcseyB1aWQgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOino+e7keafkOS4queZu+W9leaWueW8j1xuICAgKiBAcGFyYW0gbG9naW5UeXBlXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5o6l6Kem57uR5a6a5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudW5saW5rKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3otKbmiLfmmK/lkKblt7Lnu4/kuI7mraTnmbvlvZXmlrnlvI/op6Pnu5EnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyB1bmxpbmsobG9naW5UeXBlOiAnQ1VTVE9NJyB8ICdXRUNIQVQtT1BFTicgfCAnV0VDSEFULVBVQkxJQycgfCAnV0VDSEFULVVOSU9OJykge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGgudW5saW5rJyx7IHBsYXRmb3JtOiBsb2dpblR5cGUgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOabtOaWsOeUqOaIt+S/oeaBr1xuICAgKiBAcGFyYW0gdXNlckluZm9cbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmm7TmlrDnlKjmiLfkv6Hmga/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci51cGRhdGUoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOeUqOaIt+S/oeaBr+S4reaYr+WQpuWMheWQq+mdnuazleWAvCcsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHVwZGF0ZSh1c2VySW5mbzogSVVzZXJJbmZvKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBuaWNrTmFtZSxnZW5kZXIsYXZhdGFyVXJsLHByb3ZpbmNlLGNvdW50cnksY2l0eSB9ID0gdXNlckluZm87XG4gICAgY29uc3QgeyBkYXRhOiBuZXdVc2VySW5mbyB9ID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnVwZGF0ZVVzZXJJbmZvJyx7IG5pY2tOYW1lLGdlbmRlcixhdmF0YXJVcmwscHJvdmluY2UsY291bnRyeSxjaXR5IH0pO1xuICAgIHRoaXMuX3NldExvY2FsVXNlckluZm8obmV3VXNlckluZm8pO1xuICB9XG4gIC8qKlxuICAgKiDmm7TmlrDlr4bnoIFcbiAgICogQHBhcmFtIG5ld1Bhc3N3b3JkXG4gICAqIEBwYXJhbSBvbGRQYXNzd29yZFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+abtOaWsOWvhueggeWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnVwZGF0ZVBhc3N3b3JkKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDMgLSDmlrDlr4bnoIHkuK3mmK/lkKbljIXlkKvpnZ7ms5XlrZfnrKYnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyB1cGRhdGVQYXNzd29yZChuZXdQYXNzd29yZDogc3RyaW5nLG9sZFBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnVwZGF0ZVBhc3N3b3JkJyx7XG4gICAgICBvbGRQYXNzd29yZCxcbiAgICAgIG5ld1Bhc3N3b3JkXG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOabtOaWsOmCrueuseWcsOWdgFxuICAgKiBAcGFyYW0gbmV3RW1haWxcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmm7TmlrDpgq7nrrHlnLDlnYDlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci51cGRhdGVFbWFpbCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG6YKu566x5a+G56CB55m75b2VJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgdXBkYXRlRW1haWwobmV3RW1haWw6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGgudXBkYXRlRW1haWwnLHtcbiAgICAgIG5ld0VtYWlsXG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOabtOaWsOeUqOaIt+WQjVxuICAgKiBAcGFyYW0gdXNlcm5hbWVcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmm7TmlrDnlKjmiLflkI3lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci51cGRhdGVVc2VybmFtZSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG55So5oi35ZCN5a+G56CB55m75b2VJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgdXBkYXRlVXNlcm5hbWUodXNlcm5hbWU6IHN0cmluZykge1xuICAgIGlmKHR5cGVvZiB1c2VybmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCd1c2VybmFtZSBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC51cGRhdGVVc2VybmFtZScse1xuICAgICAgdXNlcm5hbWVcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog5Yi35paw5pys5Zyw55So5oi35L+h5oGv44CC5b2T55So5oi35Zyo5YW25LuW5a6i5oi356uv5pu05paw55So5oi35L+h5oGv5LmL5ZCO77yM5Y+v5Lul6LCD55So5q2k5o6l5Y+j5ZCM5q2l5pu05paw5LmL5ZCO55qE5L+h5oGv44CCXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5Yi35paw5pys5Zyw55So5oi35L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIucmVmcmVzaCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHJlZnJlc2goKTogUHJvbWlzZTxJVXNlckluZm8+IHtcbiAgICBjb25zdCBhY3Rpb24gPSAnYXV0aC5nZXRVc2VySW5mbyc7XG4gICAgY29uc3QgeyBkYXRhOiB1c2VySW5mbyB9ID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKGFjdGlvbix7fSk7XG4gICAgdGhpcy5fc2V0TG9jYWxVc2VySW5mbyh1c2VySW5mbyk7XG4gICAgcmV0dXJuIHVzZXJJbmZvO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TG9jYWxVc2VySW5mbyhrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCB1c2VySW5mbyA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKHVzZXJJbmZvS2V5KTtcbiAgICByZXR1cm4gdXNlckluZm9ba2V5XTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2dldExvY2FsVXNlckluZm9Bc3luYyhrZXk6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCB1c2VySW5mbyA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmModXNlckluZm9LZXkpO1xuICAgIHJldHVybiB1c2VySW5mb1trZXldO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0VXNlckluZm8oKSB7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCB1c2VySW5mbyA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKHVzZXJJbmZvS2V5KTtcbiAgICBbXG4gICAgICAndWlkJyxcbiAgICAgICdsb2dpblR5cGUnLFxuICAgICAgJ29wZW5pZCcsXG4gICAgICAnd3hPcGVuSWQnLFxuICAgICAgJ3d4UHVibGljSWQnLFxuICAgICAgJ3VuaW9uSWQnLFxuICAgICAgJ3FxTWluaU9wZW5JZCcsXG4gICAgICAnZW1haWwnLFxuICAgICAgJ2hhc1Bhc3N3b3JkJyxcbiAgICAgICdjdXN0b21Vc2VySWQnLFxuICAgICAgJ25pY2tOYW1lJyxcbiAgICAgICdnZW5kZXInLFxuICAgICAgJ2F2YXRhclVybCcsXG4gICAgXS5mb3JFYWNoKGluZm9LZXkgPT4ge1xuICAgICAgdGhpc1tpbmZvS2V5XSA9IHVzZXJJbmZvW2luZm9LZXldO1xuICAgIH0pO1xuXG4gICAgdGhpcy5sb2NhdGlvbiA9IHtcbiAgICAgIGNvdW50cnk6IHVzZXJJbmZvWydjb3VudHJ5J10sXG4gICAgICBwcm92aW5jZTogdXNlckluZm9bJ3Byb3ZpbmNlJ10sXG4gICAgICBjaXR5OiB1c2VySW5mb1snY2l0eSddXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldExvY2FsVXNlckluZm8odXNlckluZm86IGFueSkge1xuICAgIGNvbnN0IHsgdXNlckluZm9LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgdGhpcy5fY2FjaGUuc2V0U3RvcmUodXNlckluZm9LZXksdXNlckluZm8pO1xuICAgIHRoaXMuX3NldFVzZXJJbmZvKCk7XG4gIH1cbn1cbmludGVyZmFjZSBJTG9naW5TdGF0ZU9wdGlvbnMgZXh0ZW5kcyBJVXNlck9wdGlvbnMge1xuICBlbnZJZDogc3RyaW5nO1xufVxuZXhwb3J0IGNsYXNzIExvZ2luU3RhdGUgaW1wbGVtZW50cyBJTG9naW5TdGF0ZSB7XG4gIHB1YmxpYyBjcmVkZW50aWFsOiBJQ3JlZGVudGlhbDtcbiAgcHVibGljIHVzZXI6IElVc2VyO1xuXG4gIHByaXZhdGUgX2NhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG4gIHByaXZhdGUgX2xvZ2luVHlwZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElMb2dpblN0YXRlT3B0aW9ucykge1xuICAgIGNvbnN0IHsgZW52SWQsY2FjaGUscmVxdWVzdCB9ID0gb3B0aW9ucztcbiAgICBpZighZW52SWQpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCdlbnZJZCBpcyBub3QgZGVmaW5lZCcpO1xuICAgIH1cbiAgICB0aGlzLl9jYWNoZSA9IGNhY2hlO1xuXG4gICAgdGhpcy51c2VyID0gbmV3IFVzZXIoe1xuICAgICAgY2FjaGUsXG4gICAgICByZXF1ZXN0XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2hlY2tMb2NhbFN0YXRlKCkge1xuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5LGFjY2Vzc1Rva2VuS2V5LGFjY2Vzc1Rva2VuRXhwaXJlS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKHJlZnJlc2hUb2tlbktleSk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZShhY2Nlc3NUb2tlbktleSk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW5FeHBpcmUgPSB0aGlzLl9jYWNoZS5nZXRTdG9yZShhY2Nlc3NUb2tlbkV4cGlyZUtleSk7XG5cbiAgICB0aGlzLmNyZWRlbnRpYWwgPSB7XG4gICAgICByZWZyZXNoVG9rZW4sXG4gICAgICBhY2Nlc3NUb2tlbixcbiAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlXG4gICAgfTtcblxuICAgIHRoaXMuX2xvZ2luVHlwZSA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKHRoaXMuX2NhY2hlLmtleXMubG9naW5UeXBlS2V5KTtcblxuICAgIHRoaXMudXNlci5jaGVja0xvY2FsSW5mbygpO1xuICB9XG4gIHB1YmxpYyBhc3luYyBjaGVja0xvY2FsU3RhdGVBc3luYygpIHtcbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSxhY2Nlc3NUb2tlbktleSxhY2Nlc3NUb2tlbkV4cGlyZUtleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbkV4cGlyZSA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpO1xuXG4gICAgdGhpcy5jcmVkZW50aWFsID0ge1xuICAgICAgcmVmcmVzaFRva2VuLFxuICAgICAgYWNjZXNzVG9rZW4sXG4gICAgICBhY2Nlc3NUb2tlbkV4cGlyZVxuICAgIH07XG5cbiAgICB0aGlzLl9sb2dpblR5cGUgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHRoaXMuX2NhY2hlLmtleXMubG9naW5UeXBlS2V5KTtcblxuICAgIGF3YWl0IHRoaXMudXNlci5jaGVja0xvY2FsSW5mb0FzeW5jKCk7XG4gIH1cblxuICBnZXQgaXNBbm9ueW1vdXNBdXRoKCkge1xuICAgIHJldHVybiB0aGlzLmxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLkFOT05ZTU9VUztcbiAgfVxuXG4gIGdldCBpc0N1c3RvbUF1dGgoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9naW5UeXBlID09PSBMT0dJTlRZUEUuQ1VTVE9NO1xuICB9XG5cbiAgZ2V0IGlzV2VpeGluQXV0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2dpblR5cGUgPT09IExPR0lOVFlQRS5XRUNIQVQgfHwgdGhpcy5sb2dpblR5cGUgPT09IExPR0lOVFlQRS5XRUNIQVRfT1BFTiB8fCB0aGlzLmxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLldFQ0hBVF9QVUJMSUM7XG4gIH1cblxuICBnZXQgaXNVc2VybmFtZUF1dGgoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9naW5UeXBlID09PSBMT0dJTlRZUEUuVVNFUk5BTUU7XG4gIH1cblxuICBnZXQgbG9naW5UeXBlKCkge1xuICAgIHJldHVybiB0aGlzLl9sb2dpblR5cGVcbiAgfVxufVxuXG5jbGFzcyBBdXRoIHtcbiAgcHJpdmF0ZSByZWFkb25seSBfY29uZmlnOiBJQ2xvdWRiYXNlQXV0aENvbmZpZztcbiAgcHJpdmF0ZSByZWFkb25seSBfY2FjaGU6IElDbG91ZGJhc2VDYWNoZVxuICBwcml2YXRlIHJlYWRvbmx5IF9yZXF1ZXN0OiBJQ2xvdWRiYXNlUmVxdWVzdDtcbiAgcHJpdmF0ZSByZWFkb25seSBfcnVudGltZTogc3RyaW5nO1xuICBwcml2YXRlIF9hbm9ueW1vdXNBdXRoUHJvdmlkZXI6IEFub255bW91c0F1dGhQcm92aWRlcjtcbiAgcHJpdmF0ZSBfY3VzdG9tQXV0aFByb3ZpZGVyOiBDdXN0b21BdXRoUHJvdmlkZXI7XG4gIHByaXZhdGUgX3dlaXhpbkF1dGhQcm92aWRlcjogV2VpeGluQXV0aFByb3ZpZGVyO1xuICBwcml2YXRlIF9lbWFpbEF1dGhQcm92aWRlcjogRW1haWxBdXRoUHJvdmlkZXI7XG4gIHByaXZhdGUgX3VzZXJuYW1lQXV0aFByb3ZpZGVyOiBVc2VybmFtZUF1dGhQcm92aWRlcjtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IElDbG91ZGJhc2VBdXRoQ29uZmlnICYgeyBjYWNoZTogSUNsb3VkYmFzZUNhY2hlLHJlcXVlc3Q6IElDbG91ZGJhc2VSZXF1ZXN0LHJ1bnRpbWU/OiBzdHJpbmcgfSkge1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLl9jYWNoZSA9IGNvbmZpZy5jYWNoZTtcbiAgICB0aGlzLl9yZXF1ZXN0ID0gY29uZmlnLnJlcXVlc3Q7XG4gICAgdGhpcy5fcnVudGltZSA9IGNvbmZpZy5ydW50aW1lIHx8IFJVTlRJTUUuV0VCXG5cbiAgICBldmVudEJ1cy5vbihFVkVOVFMuTE9HSU5fVFlQRV9DSEFOR0VELHRoaXMuX29uTG9naW5UeXBlQ2hhbmdlZC5iaW5kKHRoaXMpKTtcbiAgfVxuICAvKipcbiAgICog6I635Y+W5b2T5YmN55m75b2V55qE55So5oi35L+h5oGvLeWQjOatpVxuICAgKi9cbiAgZ2V0IGN1cnJlbnRVc2VyKCkge1xuICAgIGlmKHRoaXMuX2NhY2hlLm1vZGUgPT09ICdhc3luYycpIHtcbiAgICAgIC8vIGFzeW5jIHN0b3JhZ2XnmoTlubPlj7DosIPnlKjmraRBUEnmj5DnpLpcbiAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sJ2N1cnJlbnQgcGxhdGZvcm1cXCdzIHN0b3JhZ2UgaXMgYXN5bmNocm9ub3VzLCBwbGVhc2UgdXNlIGdldEN1cnJlblVzZXIgaW5zdGVlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBsb2dpblN0YXRlID0gdGhpcy5oYXNMb2dpblN0YXRlKCk7XG4gICAgaWYobG9naW5TdGF0ZSkge1xuICAgICAgcmV0dXJuIGxvZ2luU3RhdGUudXNlciB8fCBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluW9k+WJjeeZu+W9leexu+Weiy3lkIzmraVcbiAgICovXG4gIGdldCBsb2dpblR5cGUoKTogTE9HSU5UWVBFIHtcbiAgICByZXR1cm4gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodGhpcy5fY2FjaGUua2V5cy5sb2dpblR5cGVLZXkpO1xuICB9XG4gIC8qKlxuICAgKiDojrflj5blvZPliY3nmbvlvZXnmoTnlKjmiLfkv6Hmga8t5byC5q2lXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W55So5oi35L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5nZXRDdXJyZW5Vc2VyKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0Q3VycmVuVXNlcigpIHtcbiAgICBjb25zdCBsb2dpblN0YXRlID0gYXdhaXQgdGhpcy5nZXRMb2dpblN0YXRlKCk7XG4gICAgaWYobG9naW5TdGF0ZSkge1xuICAgICAgYXdhaXQgbG9naW5TdGF0ZS51c2VyLmNoZWNrTG9jYWxJbmZvQXN5bmMoKTtcbiAgICAgIHJldHVybiBsb2dpblN0YXRlLnVzZXIgfHwgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDojrflj5blvZPliY3nmbvlvZXnsbvlnost5byC5q2lXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0TG9naW5UeXBlKCk6IFByb21pc2U8TE9HSU5UWVBFPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmModGhpcy5fY2FjaGUua2V5cy5sb2dpblR5cGVLZXkpIGFzIExPR0lOVFlQRTtcbiAgfVxuICBwdWJsaWMgYXN5bmMgZ2V0QWNjZXNzVG9rZW4oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjY2Vzc1Rva2VuOiAoYXdhaXQgdGhpcy5fcmVxdWVzdC5nZXRBY2Nlc3NUb2tlbigpKS5hY2Nlc3NUb2tlbixcbiAgICAgIGVudjogdGhpcy5fY29uZmlnLmVudlxuICAgIH07XG4gIH1cbiAgcHVibGljIHdlaXhpbkF1dGhQcm92aWRlcih7IGFwcGlkLHNjb3BlLHN0YXRlIH0pOiBXZWl4aW5BdXRoUHJvdmlkZXIge1xuICAgIGlmKCF0aGlzLl93ZWl4aW5BdXRoUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuX3dlaXhpbkF1dGhQcm92aWRlciA9IG5ldyBXZWl4aW5BdXRoUHJvdmlkZXIoe1xuICAgICAgICAuLi50aGlzLl9jb25maWcsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdCxcbiAgICAgICAgcnVudGltZTogdGhpcy5fcnVudGltZVxuICAgICAgfSxhcHBpZCxzY29wZSxzdGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl93ZWl4aW5BdXRoUHJvdmlkZXI7XG4gIH1cbiAgcHVibGljIGFub255bW91c0F1dGhQcm92aWRlcigpOiBBbm9ueW1vdXNBdXRoUHJvdmlkZXIge1xuICAgIGlmKCF0aGlzLl9hbm9ueW1vdXNBdXRoUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuX2Fub255bW91c0F1dGhQcm92aWRlciA9IG5ldyBBbm9ueW1vdXNBdXRoUHJvdmlkZXIoe1xuICAgICAgICAuLi50aGlzLl9jb25maWcsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9hbm9ueW1vdXNBdXRoUHJvdmlkZXI7XG4gIH1cbiAgcHVibGljIGN1c3RvbUF1dGhQcm92aWRlcigpOiBDdXN0b21BdXRoUHJvdmlkZXIge1xuICAgIGlmKCF0aGlzLl9jdXN0b21BdXRoUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuX2N1c3RvbUF1dGhQcm92aWRlciA9IG5ldyBDdXN0b21BdXRoUHJvdmlkZXIoe1xuICAgICAgICAuLi50aGlzLl9jb25maWcsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jdXN0b21BdXRoUHJvdmlkZXI7XG4gIH1cbiAgcHVibGljIGVtYWlsQXV0aFByb3ZpZGVyKCk6IEVtYWlsQXV0aFByb3ZpZGVyIHtcbiAgICBpZighdGhpcy5fZW1haWxBdXRoUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuX2VtYWlsQXV0aFByb3ZpZGVyID0gbmV3IEVtYWlsQXV0aFByb3ZpZGVyKHtcbiAgICAgICAgLi4udGhpcy5fY29uZmlnLFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZW1haWxBdXRoUHJvdmlkZXI7XG4gIH1cbiAgcHVibGljIHVzZXJuYW1lQXV0aFByb3ZpZGVyKCk6IFVzZXJuYW1lQXV0aFByb3ZpZGVyIHtcbiAgICBpZighdGhpcy5fdXNlcm5hbWVBdXRoUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuX3VzZXJuYW1lQXV0aFByb3ZpZGVyID0gbmV3IFVzZXJuYW1lQXV0aFByb3ZpZGVyKHtcbiAgICAgICAgLi4udGhpcy5fY29uZmlnLFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdXNlcm5hbWVBdXRoUHJvdmlkZXI7XG4gIH1cbiAgLyoqXG4gICAqIOeUqOaIt+WQjeWvhueggeeZu+W9lVxuICAgKiBAcGFyYW0gdXNlcm5hbWVcbiAgICogQHBhcmFtIHBhc3N3b3JkXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aFVzZXJuYW1lQW5kUGFzc3dvcmQodXNlcm5hbWU6IHN0cmluZyxwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlcm5hbWVBdXRoUHJvdmlkZXIoKS5zaWduSW4odXNlcm5hbWUscGFzc3dvcmQpO1xuICB9XG4gIC8qKlxuICAgKiDmo4DmtYvnlKjmiLflkI3mmK/lkKblt7Lnu4/ljaDnlKhcbiAgICogQHBhcmFtIHVzZXJuYW1lXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W55So5oi35piv5ZCm6KKr5Y2g55So5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5pc1VzZXJuYW1lUmVnaXN0ZXJlZCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGlzVXNlcm5hbWVSZWdpc3RlcmVkKHVzZXJuYW1lOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZih0eXBlb2YgdXNlcm5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywndXNlcm5hbWUgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLmlzVXNlcm5hbWVSZWdpc3RlcmVkJyx7XG4gICAgICB1c2VybmFtZVxuICAgIH0pO1xuICAgIHJldHVybiBkYXRhID8uaXNSZWdpc3RlcmVkO1xuICB9XG4gIC8qKlxuICAgKiDpgq7nrrHlr4bnoIHnmbvlvZVcbiAgICogQHBhcmFtIGVtYWlsXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsOiBzdHJpbmcscGFzc3dvcmQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmVtYWlsQXV0aFByb3ZpZGVyKCkuc2lnbkluKGVtYWlsLHBhc3N3b3JkKTtcbiAgfVxuICAvKipcbiAgICog6YKu566x5a+G56CB5rOo5YaMXG4gICAqIEBwYXJhbSBlbWFpbFxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduVXBXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbDogc3RyaW5nLHBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5lbWFpbEF1dGhQcm92aWRlcigpLnNpZ25VcChlbWFpbCxwYXNzd29yZCk7XG4gIH1cbiAgLyoqXG4gICAqIOmHjee9rumCrueuseWvhueggVxuICAgKiBAcGFyYW0gZW1haWxcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZW5kUGFzc3dvcmRSZXNldEVtYWlsKGVtYWlsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5lbWFpbEF1dGhQcm92aWRlcigpLnJlc2V0UGFzc3dvcmQoZW1haWwpO1xuICB9XG4gIC8qKlxuICAgKiDnmbvlh7pcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnlKjmiLfnmbvlh7rlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLnNpZ25PdXQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeUqOaIt+aYr+WQpuS4uuWMv+WQjeeZu+W9le+8iOWMv+WQjeeZu+W9leS4jeaUr+aMgXNpZ25PdXTvvIknLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBzaWduT3V0KCkge1xuICAgIGNvbnN0IGxvZ2luVHlwZSA9IGF3YWl0IHRoaXMuZ2V0TG9naW5UeXBlKCk7XG4gICAgaWYobG9naW5UeXBlID09PSBMT0dJTlRZUEUuQU5PTllNT1VTKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sXG4gICAgICAgIG1zZzogJ2Fub255bW91cyB1c2VyIGRvZXNuXFwndCBzdXBwb3J0IHNpZ25PdXQgYWN0aW9uJ1xuICAgICAgfSkpO1xuICAgIH1cbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSxhY2Nlc3NUb2tlbktleSxhY2Nlc3NUb2tlbkV4cGlyZUtleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCBhY3Rpb24gPSAnYXV0aC5sb2dvdXQnO1xuXG4gICAgY29uc3QgcmVmcmVzaF90b2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZighcmVmcmVzaF90b2tlbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoYWN0aW9uLHsgcmVmcmVzaF90b2tlbiB9KTtcblxuICAgIHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5KTtcblxuICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQpO1xuICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCx7XG4gICAgICBlbnY6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICBsb2dpblR5cGU6IExPR0lOVFlQRS5OVUxMLFxuICAgICAgcGVyc2lzdGVuY2U6IHRoaXMuX2NvbmZpZy5wZXJzaXN0ZW5jZVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBwdWJsaWMgYXN5bmMgb25Mb2dpblN0YXRlQ2hhbmdlZChjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBldmVudEJ1cy5vbihFVkVOVFMuTE9HSU5fU1RBVEVfQ0hBTkdFRCxhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gYXdhaXQgdGhpcy5nZXRMb2dpblN0YXRlKCk7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXMsbG9naW5TdGF0ZSk7XG4gICAgfSk7XG4gICAgLy8g56uL5Yi75omn6KGM5LiA5qyh5Zue6LCDXG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IGF3YWl0IHRoaXMuZ2V0TG9naW5TdGF0ZSgpO1xuICAgIGNhbGxiYWNrLmNhbGwodGhpcyxsb2dpblN0YXRlKTtcbiAgfVxuICBwdWJsaWMgb25Mb2dpblN0YXRlRXhwaXJlZChjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBldmVudEJ1cy5vbihFVkVOVFMuTE9HSU5fU1RBVEVfRVhQSVJFRCxjYWxsYmFjay5iaW5kKHRoaXMpKTtcbiAgfVxuICBwdWJsaWMgb25BY2Nlc3NUb2tlblJlZnJlc2hlZChjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBldmVudEJ1cy5vbihFVkVOVFMuQUNDRVNTX1RPS0VOX1JFRlJFU0hELGNhbGxiYWNrLmJpbmQodGhpcykpO1xuICB9XG4gIHB1YmxpYyBvbkFub255bW91c0NvbnZlcnRlZChjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBldmVudEJ1cy5vbihFVkVOVFMuQU5PTllNT1VTX0NPTlZFUlRFRCxjYWxsYmFjay5iaW5kKHRoaXMpKTtcbiAgfVxuICBwdWJsaWMgb25Mb2dpblR5cGVDaGFuZ2VkKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGV2ZW50QnVzLm9uKEVWRU5UUy5MT0dJTl9UWVBFX0NIQU5HRUQsYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgbG9naW5TdGF0ZSA9IGF3YWl0IHRoaXMuZ2V0TG9naW5TdGF0ZSgpO1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLGxvZ2luU3RhdGUpO1xuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnmbvlvZXmgIEt5ZCM5q2lXG4gICAqL1xuICBwdWJsaWMgaGFzTG9naW5TdGF0ZSgpOiBJTG9naW5TdGF0ZSB8IG51bGwge1xuICAgIGlmKHRoaXMuX2NhY2hlLm1vZGUgPT09ICdhc3luYycpIHtcbiAgICAgIC8vIGFzeW5jIHN0b3JhZ2XnmoTlubPlj7DosIPnlKjmraRBUEnmj5DnpLpcbiAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sJ2N1cnJlbnQgcGxhdGZvcm1cXCdzIHN0b3JhZ2UgaXMgYXN5bmNocm9ub3VzLCBwbGVhc2UgdXNlIGdldExvZ2luU3RhdGUgaW5zdGVlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZShyZWZyZXNoVG9rZW5LZXkpO1xuXG4gICAgaWYocmVmcmVzaFRva2VuKSB7XG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICAgIGxvZ2luU3RhdGUuY2hlY2tMb2NhbFN0YXRlKCk7XG4gICAgICByZXR1cm4gbG9naW5TdGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnmbvlvZXmgIEt5byC5q2lXG4gICAqIOatpEFQSeS4uuWFvOWuueW8guatpXN0b3JhZ2XnmoTlubPlj7BcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5bmnKzlnLDnmbvlvZXmgIHlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmdldExvZ2luU3RhdGUoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRMb2dpblN0YXRlKCkge1xuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZihyZWZyZXNoVG9rZW4pIHtcbiAgICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBuZXcgTG9naW5TdGF0ZSh7XG4gICAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgbG9naW5TdGF0ZS5jaGVja0xvY2FsU3RhdGVBc3luYygpO1xuICAgICAgcmV0dXJuIGxvZ2luU3RhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzaG91bGRSZWZyZXNoQWNjZXNzVG9rZW4oaG9vaykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLl9yZXF1ZXN0Ll9zaG91bGRSZWZyZXNoQWNjZXNzVG9rZW5Ib29rID0gaG9vay5iaW5kKHRoaXMpO1xuICB9XG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5bnlKjmiLfkv6Hmga/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDmmK/lkKblt7LnmbvlvZUnLFxuICAgICAgJyAgMiAtIOiwg+eUqCBhdXRoKCkuZ2V0VXNlckluZm8oKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRVc2VySW5mbygpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IGFjdGlvbiA9ICdhdXRoLmdldFVzZXJJbmZvJztcblxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZChhY3Rpb24se30pO1xuICAgIGlmKHJlcy5jb2RlKSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5yZXMuZGF0YSxcbiAgICAgICAgcmVxdWVzdElkOiByZXMuc2VxSWRcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDojrflj5ZIdHRw6Ym05p2DaGVhZGVy77yM55So5LqO5LqR5o6l5YWlIEhUVFAg6K6/6Zeu5LqR5Ye95pWw5pe255qE6Ym05p2DXG4gICAqL1xuICBwdWJsaWMgZ2V0QXV0aEhlYWRlcigpIHtcbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSxhY2Nlc3NUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZShyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUoYWNjZXNzVG9rZW5LZXkpO1xuICAgIHJldHVybiB7XG4gICAgICAneC1jbG91ZGJhc2UtY3JlZGVudGlhbHMnOiBhY2Nlc3NUb2tlbiArICcvQEAvJyArIHJlZnJlc2hUb2tlblxuICAgIH07XG4gIH1cbiAgLyoqXG4gICAqIOW8guatpeaooeW8j+iOt+WPlkh0dHDpibTmnYNoZWFkZXLvvIznlKjkuo7kupHmjqXlhaUgSFRUUCDorr/pl67kupHlh73mlbDml7bnmoTpibTmnYNcbiAgICog6LCD55So5q2kQVBJ5Lya5Yi35paw55m75b2V5oCBXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0QXV0aEhlYWRlckFzeW5jKCkge1xuICAgIGF3YWl0IHRoaXMuX3JlcXVlc3QucmVmcmVzaEFjY2Vzc1Rva2VuKCk7XG5cbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSxhY2Nlc3NUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICByZXR1cm4ge1xuICAgICAgJ3gtY2xvdWRiYXNlLWNyZWRlbnRpYWxzJzogYWNjZXNzVG9rZW4gKyAnL0BALycgKyByZWZyZXNoVG9rZW5cbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfb25Mb2dpblR5cGVDaGFuZ2VkKGV2KSB7XG4gICAgY29uc3QgeyBsb2dpblR5cGUscGVyc2lzdGVuY2UsZW52IH0gPSBldi5kYXRhO1xuICAgIGlmKGVudiAhPT0gdGhpcy5fY29uZmlnLmVudikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDnmbvlvZXmgIHovazlj5jlkI7ov4Hnp7tjYWNoZe+8jOmYsuatouWcqOWMv+WQjeeZu+W9leeKtuaAgeS4i2NhY2hl5re355SoXG4gICAgYXdhaXQgdGhpcy5fY2FjaGUudXBkYXRlUGVyc2lzdGVuY2VBc3luYyhwZXJzaXN0ZW5jZSk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyh0aGlzLl9jYWNoZS5rZXlzLmxvZ2luVHlwZUtleSxsb2dpblR5cGUpO1xuICB9XG59XG5cbmNvbnN0IEVWRU5UUyA9IHtcbiAgLy8g55m75b2V5oCB5pS55Y+Y5ZCO6Kem5Y+RXG4gIExPR0lOX1NUQVRFX0NIQU5HRUQ6ICdsb2dpblN0YXRlQ2hhbmdlZCcsXG4gIC8vIOeZu+W9leaAgei/h+acn+WQjuinpuWPkVxuICBMT0dJTl9TVEFURV9FWFBJUkVEOiAnbG9naW5TdGF0ZUV4cGlyZScsXG4gIC8vIOeZu+W9leexu+Wei+aUueWPmOWQjuinpuWPkVxuICBMT0dJTl9UWVBFX0NIQU5HRUQ6ICdsb2dpblR5cGVDaGFuZ2VkJyxcbiAgLy8g5Yy/5ZCN6LSm5oi36KKr6L2s5q2j5ZCO6Kem5Y+RXG4gIEFOT05ZTU9VU19DT05WRVJURUQ6ICdhbm9ueW1vdXNDb252ZXJ0ZWQnLFxuICAvLyBhY2Nlc3MgdG9rZW7liLfmlrDlkI7op6blj5FcbiAgQUNDRVNTX1RPS0VOX1JFRlJFU0hEOiAncmVmcmVzaEFjY2Vzc1Rva2VuJ1xufTtcblxuY29uc3QgY29tcG9uZW50OiBJQ2xvdWRiYXNlQ29tcG9uZW50ID0ge1xuICBuYW1lOiBDT01QT05FTlRfTkFNRSxcbiAgbmFtZXNwYWNlOiAnYXV0aCcsXG4gIGluamVjdEV2ZW50czoge1xuICAgIGJ1czogZXZlbnRCdXMsXG4gICAgZXZlbnRzOiBbXG4gICAgICBFVkVOVFMuTE9HSU5fVFlQRV9DSEFOR0VELFxuICAgICAgRVZFTlRTLkxPR0lOX1NUQVRFX0VYUElSRUQsXG4gICAgICBFVkVOVFMuTE9HSU5fU1RBVEVfQ0hBTkdFRCxcbiAgICAgIEVWRU5UUy5BQ0NFU1NfVE9LRU5fUkVGUkVTSEQsXG4gICAgICBFVkVOVFMuQU5PTllNT1VTX0NPTlZFUlRFRFxuICAgIF1cbiAgfSxcbiAgZW50aXR5OiBmdW5jdGlvbihjb25maWc6IFBpY2s8SUNsb3VkYmFzZUF1dGhDb25maWcsJ3JlZ2lvbicgfCAncGVyc2lzdGVuY2UnPiA9IHsgcmVnaW9uOiAnJyxwZXJzaXN0ZW5jZTogJ3Nlc3Npb24nIH0pIHtcbiAgICBpZih0aGlzLmF1dGhJbnN0YW5jZSkge1xuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwnZXZlcnkgY2xvdWRiYXNlIGluc3RhbmNlIHNob3VsZCBoYXMgb25seSBvbmUgYXV0aCBvYmplY3QnKTtcbiAgICAgIHJldHVybiB0aGlzLmF1dGhJbnN0YW5jZTtcbiAgICB9XG4gICAgY29uc3QgeyBhZGFwdGVyLHJ1bnRpbWUgfSA9IHRoaXMucGxhdGZvcm07XG4gICAgLy8g5aaC5LiN5piO56Gu5oyH5a6acGVyc2lzdGVuY2XliJnkvJjlhYjlj5blkITlubPlj7BhZGFwdGVy6aaW6YCJ77yM5YW25qyhc2Vzc2lvblxuICAgIGNvbnN0IG5ld1BlcnNpc3RlbmNlID0gY29uZmlnLnBlcnNpc3RlbmNlIHx8IGFkYXB0ZXIucHJpbWFyeVN0b3JhZ2U7XG4gICAgaWYobmV3UGVyc2lzdGVuY2UgJiYgKG5ld1BlcnNpc3RlbmNlICE9PSB0aGlzLmNvbmZpZy5wZXJzaXN0ZW5jZSkpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29uZmlnKHsgcGVyc2lzdGVuY2U6IG5ld1BlcnNpc3RlbmNlIH0pXG4gICAgfVxuXG4gICAgY29uc3QgeyBlbnYscGVyc2lzdGVuY2UsZGVidWcgfSA9IHRoaXMuY29uZmlnO1xuICAgIHRoaXMuYXV0aEluc3RhbmNlID0gbmV3IEF1dGgoe1xuICAgICAgZW52LFxuICAgICAgcmVnaW9uOiBjb25maWcucmVnaW9uLFxuICAgICAgcGVyc2lzdGVuY2UsXG4gICAgICBkZWJ1ZyxcbiAgICAgIGNhY2hlOiB0aGlzLmNhY2hlLFxuICAgICAgcmVxdWVzdDogdGhpcy5yZXF1ZXN0LFxuICAgICAgcnVudGltZTogcnVudGltZVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmF1dGhJbnN0YW5jZTtcbiAgfVxufVxuXG50cnkge1xuICAvLyDlsJ3or5Xoh6rliqjms6jlhozoh7PlhajlsYDlj5jph49jbG91ZGJhc2VcbiAgLy8g5q2k6KGM5Li65Y+q5Zyo5rWP6KeI5Zmo546v5aKD5LiL5pyJ5pWIXG4gIGNsb3VkYmFzZS5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xufSBjYXRjaChlKSB7IH1cblxuZXhwb3J0IHtcbiAgVXNlckluZm8sXG4gIEF1dGgsXG4gIEF1dGhQcm92aWRlcixcbiAgRVZFTlRTLFxuICBldmVudEJ1c1xufTtcbi8qKlxuICogQGFwaSDmiYvliqjms6jlhozoh7NjbG91ZGJhc2UgYXBwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckF1dGgoYXBwOiBQaWNrPElDbG91ZGJhc2UsJ3JlZ2lzdGVyQ29tcG9uZW50Jz4pIHtcbiAgdHJ5IHtcbiAgICBhcHAucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbiAgfSBjYXRjaChlKSB7XG4gICAgY29uc29sZS53YXJuKGUpO1xuICB9XG59XG5cbnR5cGUgSVByb3ZpZGVyID0gbmV3ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xuLyoqXG4gKiDms6jlhoxwcm92aWRlcu+8jOWmguaenFxuICogQHBhcmFtIG5hbWVcbiAqIEBwYXJhbSBwcm92aWRlclxuICogQGV4YW1wbGVcbiAqIC8vIOazqOWGjFxuICogcmVnaXN0ZXJQcm92aWRlcignZW1haWxBdXRoUHJvdmlkZXInLGZ1bmN0aW9uKCl7XG4gKiAgIC8vIC4uLlxuICogfSk7XG4gKiAvLyDkvb/nlKjmlrBwcm92aWRlcueZu+W9lVxuICogY2xvdWRiYXNlLmF1dGgoKS5lbWFpbEF1dGhQcm92aWRlcigpLnNpZ25JbigpO1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJQcm92aWRlcihuYW1lOiBzdHJpbmcscHJvdmlkZXI6IElQcm92aWRlcikge1xuICBjb25zdCBwcm90byA9IEF1dGgucHJvdG90eXBlO1xuICBwcm90b1tuYW1lXSA9IGZ1bmN0aW9uKG9wdGlvbnM6IG9iamVjdCkge1xuICAgIGNvbnN0IHByaXZhdGVOYW1lID0gYF8ke25hbWV9YDtcbiAgICBpZighdGhpc1twcml2YXRlTmFtZV0pIHtcbiAgICAgIHRoaXNbcHJpdmF0ZU5hbWVdID0gbmV3IHByb3ZpZGVyKHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgLi4udGhpcy5fY29uZmlnXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNbcHJpdmF0ZU5hbWVdO1xuICB9O1xufSJdfQ==