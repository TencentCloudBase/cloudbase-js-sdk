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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFPLHNCQUFzQixDQUFDO0FBS2pGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBSWhFLElBQUEscUJBQXFCLEdBQUssTUFBTSxzQkFBWCxDQUFZO0FBQ2pDLElBQUEsT0FBTyxHQUFLLFFBQVEsUUFBYixDQUFjO0FBQ3JCLElBQUEsU0FBUyxHQUFpQixLQUFLLFVBQXRCLEVBQUUsVUFBVSxHQUFLLEtBQUssV0FBVixDQUFXO0FBQ2hDLElBQUEsTUFBTSxHQUF5QixTQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUssU0FBUyxtQkFBZCxDQUFlO0FBQ3pDLElBQUEsb0JBQW9CLEdBQUssT0FBTyxxQkFBWixDQUFhO0FBRXpDLElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQztBQWM5QixJQUFNLFFBQVEsR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7QUFPN0M7SUF1QkUsY0FBWSxPQUFxQjtRQUN2QixJQUFB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QztBQWVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxJQUFXLEVBQUMsUUFBa0I7SUFDN0QsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUM3QixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBUyxPQUFjO1FBQ25DLElBQU0sV0FBVyxHQUFHLE1BQUksSUFBTSxDQUFDO1FBQy9CLElBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUM7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksUUFBUSx1QkFDM0IsT0FBTyxHQUNQLElBQUksQ0FBQyxPQUFPLEVBQ2YsQ0FBQztTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbG91ZGJhc2UgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcbmltcG9ydCB7IGV2ZW50cyxhZGFwdGVycyx1dGlscyxjb25zdGFudHMsIGhlbHBlcnMgfSBmcm9tICAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNhY2hlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlUmVxdWVzdCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVxdWVzdCc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQXV0aENvbmZpZywgSUNyZWRlbnRpYWwsIElVc2VyLCBJVXNlckluZm8sIElBdXRoUHJvdmlkZXIsIElMb2dpblN0YXRlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9hdXRoJztcbmltcG9ydCB7IElDbG91ZGJhc2VDb21wb25lbnQgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWl4aW5BdXRoUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy93ZWl4aW5BdXRoUHJvdmlkZXInO1xuaW1wb3J0IHsgQW5vbnltb3VzQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvYW5vbnltb3VzQXV0aFByb3ZpZGVyJztcbmltcG9ydCB7IEN1c3RvbUF1dGhQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2N1c3RvbUF1dGhQcm92aWRlcic7XG5pbXBvcnQgeyBMT0dJTlRZUEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9iYXNlJztcbmltcG9ydCB7IEVtYWlsQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvZW1haWxBdXRoUHJvdmlkZXInO1xuaW1wb3J0IHsgVXNlcm5hbWVBdXRoUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy91c2VybmFtZUF1dGhQcm92aWRlcic7XG5cbmRlY2xhcmUgY29uc3QgY2xvdWRiYXNlOiBJQ2xvdWRiYXNlO1xuXG5jb25zdCB7IENsb3VkYmFzZUV2ZW50RW1pdHRlciB9ID0gZXZlbnRzO1xuY29uc3QgeyBSVU5USU1FIH0gPSBhZGFwdGVycztcbmNvbnN0IHsgcHJpbnRXYXJuLCB0aHJvd0Vycm9yIH0gPSB1dGlscztcbmNvbnN0IHsgRVJST1JTLCBDT01NVU5JVFlfU0lURV9VUkwgfSA9IGNvbnN0YW50cztcbmNvbnN0IHsgY2F0Y2hFcnJvcnNEZWNvcmF0b3IgfSA9IGhlbHBlcnM7XG5cbmNvbnN0IENPTVBPTkVOVF9OQU1FID0gJ2F1dGgnO1xuXG5pbnRlcmZhY2UgVXNlckluZm8ge1xuICBvcGVuaWQ6IHN0cmluZztcbiAgbmlja25hbWU/OiBzdHJpbmc7XG4gIHNleD86IG51bWJlcjtcbiAgcHJvdmluY2U/OiBzdHJpbmc7XG4gIGNpdHk/OiBzdHJpbmc7XG4gIGNvdW50cnk/OiBzdHJpbmc7XG4gIGhlYWRpbWd1cmw/OiBzdHJpbmc7XG4gIHByaXZpbGVnZT86IFtzdHJpbmddO1xuICB1bmlvbmlkPzogc3RyaW5nO1xufVxuXG5jb25zdCBldmVudEJ1cyA9IG5ldyBDbG91ZGJhc2VFdmVudEVtaXR0ZXIoKTtcblxuaW50ZXJmYWNlIElVc2VyT3B0aW9uc3tcbiAgY2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcbiAgcmVxdWVzdDogSUNsb3VkYmFzZVJlcXVlc3Q7XG59XG5cbmNsYXNzIFVzZXIgaW1wbGVtZW50cyBJVXNlcntcbiAgcHVibGljIHVpZDogc3RyaW5nO1xuICBwdWJsaWMgbG9naW5UeXBlOiBzdHJpbmc7XG4gIHB1YmxpYyBvcGVuaWQ6IHN0cmluZztcbiAgcHVibGljIHd4T3BlbklkOiBzdHJpbmc7XG4gIHB1YmxpYyB3eFB1YmxpY0lkOiBzdHJpbmc7XG4gIHB1YmxpYyB1bmlvbklkOiBzdHJpbmc7XG4gIHB1YmxpYyBxcU1pbmlPcGVuSWQ6IHN0cmluZztcbiAgcHVibGljIGN1c3RvbVVzZXJJZDogc3RyaW5nO1xuICBwdWJsaWMgbmlja05hbWU6IHN0cmluZztcbiAgcHVibGljIGdlbmRlcjogc3RyaW5nO1xuICBwdWJsaWMgYXZhdGFyVXJsOiBzdHJpbmc7XG4gIHB1YmxpYyBlbWFpbDogc3RyaW5nO1xuICBwdWJsaWMgaGFzUGFzc3dvcmQ6IGJvb2xlYW47XG4gIHB1YmxpYyBsb2NhdGlvbj86IHtcbiAgICBjb3VudHJ5Pzogc3RyaW5nO1xuICAgIHByb3ZpbmNlPzogc3RyaW5nO1xuICAgIGNpdHk/OiBzdHJpbmc7XG4gIH07XG5cbiAgcHJpdmF0ZSBfY2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcbiAgcHJpdmF0ZSBfcmVxdWVzdDogSUNsb3VkYmFzZVJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogSVVzZXJPcHRpb25zKSB7XG4gICAgY29uc3QgeyBjYWNoZSwgcmVxdWVzdH0gPSBvcHRpb25zO1xuICAgIHRoaXMuX2NhY2hlID0gY2FjaGU7XG4gICAgdGhpcy5fcmVxdWVzdCA9IHJlcXVlc3Q7XG5cbiAgICB0aGlzLl9zZXRVc2VySW5mbygpO1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnlKjmiLfkv6Hmga8t5ZCM5q2lXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hlY2tMb2NhbEluZm8oKXtcbiAgICB0aGlzLnVpZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3VpZCcpO1xuICAgIHRoaXMubG9naW5UeXBlID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnbG9naW5UeXBlJyk7XG4gICAgdGhpcy5vcGVuaWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd3eE9wZW5JZCcpO1xuICAgIHRoaXMud3hPcGVuSWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd3eE9wZW5JZCcpO1xuICAgIHRoaXMud3hQdWJsaWNJZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3d4UHVibGljSWQnKTtcbiAgICB0aGlzLnVuaW9uSWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd3eFVuaW9uSWQnKTtcbiAgICB0aGlzLnFxTWluaU9wZW5JZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3FxTWluaU9wZW5JZCcpO1xuICAgIHRoaXMuY3VzdG9tVXNlcklkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnY3VzdG9tVXNlcklkJyk7XG4gICAgdGhpcy5uaWNrTmFtZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ25pY2tOYW1lJyk7XG4gICAgdGhpcy5nZW5kZXIgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdnZW5kZXInKTtcbiAgICB0aGlzLmF2YXRhclVybCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2F2YXRhclVybCcpO1xuICAgIHRoaXMuZW1haWwgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdlbWFpbCcpO1xuICAgIHRoaXMuaGFzUGFzc3dvcmQgPSBCb29sZWFuKHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2hhc1Bhc3N3b3JkJykpO1xuICAgIHRoaXMubG9jYXRpb24gPSB7XG4gICAgICBjb3VudHJ5OiB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdjb3VudHJ5JyksXG4gICAgICBwcm92aW5jZTogdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncHJvdmluY2UnKSxcbiAgICAgIGNpdHk6IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2NpdHknKVxuICAgIH07XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluacrOWcsOeUqOaIt+S/oeaBry3lvILmraVcbiAgICovXG4gIHB1YmxpYyBhc3luYyBjaGVja0xvY2FsSW5mb0FzeW5jKCl7XG4gICAgdGhpcy51aWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3VpZCcpO1xuICAgIHRoaXMubG9naW5UeXBlID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdsb2dpblR5cGUnKTtcbiAgICB0aGlzLm9wZW5pZCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnd3hPcGVuSWQnKTtcbiAgICB0aGlzLnd4T3BlbklkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd3eE9wZW5JZCcpO1xuICAgIHRoaXMud3hQdWJsaWNJZCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnd3hQdWJsaWNJZCcpO1xuICAgIHRoaXMudW5pb25JZCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnd3hVbmlvbklkJyk7XG4gICAgdGhpcy5xcU1pbmlPcGVuSWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3FxTWluaU9wZW5JZCcpO1xuICAgIHRoaXMuY3VzdG9tVXNlcklkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdjdXN0b21Vc2VySWQnKTtcbiAgICB0aGlzLm5pY2tOYW1lID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCduaWNrTmFtZScpO1xuICAgIHRoaXMuZ2VuZGVyID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdnZW5kZXInKTtcbiAgICB0aGlzLmF2YXRhclVybCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnYXZhdGFyVXJsJyk7XG4gICAgdGhpcy5lbWFpbCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnZW1haWwnKTtcbiAgICB0aGlzLmhhc1Bhc3N3b3JkID0gQm9vbGVhbihhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2hhc1Bhc3N3b3JkJykpO1xuICAgIHRoaXMubG9jYXRpb24gPSB7XG4gICAgICBjb3VudHJ5OiBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2NvdW50cnknKSxcbiAgICAgIHByb3ZpbmNlOiBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3Byb3ZpbmNlJyksXG4gICAgICBjaXR5OiBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2NpdHknKVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICog5bCG5b2T5YmN6LSm5oi35LiO6Ieq5a6a5LmJ55m75b2VIFRpY2tldCDov5vooYznu5HlrprvvIznu5HlrprkuYvlkI7kvr/lj6/ku6XpgJrov4foh6rlrprkuYnnmbvlvZXnmbvlvZXlvZPliY3kupHlvIDlj5HotKbmiLfjgIJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpY2tldCDoh6rlrprkuYnnmbvlvZV0aWNrZXRcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnu5Hlrproh6rlrprkuYnnmbvlvZXlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5saW5rV2l0aFRpY2tldCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5q2k6LSm5oi35piv5ZCm5bey57uP57uR5a6a6Ieq5a6a5LmJ55m75b2VJyxcbiAgICAgICcgIDMgLSB0aWNrZXQg5Y+C5pWw5piv5ZCm5b2S5bGe5b2T5YmN546v5aKDJyxcbiAgICAgICcgIDQgLSDliJvlu7ogdGlja2V0IOeahOiHquWumuS5ieeZu+W9leengemSpeaYr+WQpui/h+acnycsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGxpbmtXaXRoVGlja2V0KHRpY2tldDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHR5cGVvZiB0aWNrZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RpY2tldCBtdXN0IGJlIHN0cmluZycpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLmxpbmtXaXRoVGlja2V0JywgeyB0aWNrZXQgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOWwhuW9k+WJjei0puaIt+S4juesrOS4ieaWuemJtOadg+aPkOS+m+aWue+8jOS7pemHjeWumuWQkeeahOW9ouW8j++8jOi/m+ihjOe7keWumu+8jOe7keWumuS5i+WQjuS+v+WPr+S7pemAmui/h+esrOS4ieaWuemJtOadg+aPkOS+m+aWueeZu+W9leW9k+WJjeeahOS6keW8gOWPkei0puaIt+OAglxuICAgKiBAcGFyYW0gcHJvdmlkZXIg54m55a6a55m75b2V5pa55byP55qEcHJvdmlkZXLvvIzlv4XpobvlhbflpIdzaWduSW5XaXRoUmVkaXJlY3Tmlrnms5VcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnu5HlrprnrKzkuInmlrnnmbvlvZXmlrnlvI/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5saW5rV2l0aFJlZGlyZWN0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDmraTotKbmiLfmmK/lkKblt7Lnu4/nu5HlrprmraTnrKzkuInmlrknLFxuICAgICAgJyAgMyAtIOatpOesrOS4ieaWueaYr+WQpuW3sue7j+aOiOadgycsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGxpbmtXaXRoUmVkaXJlY3QocHJvdmlkZXI6SUF1dGhQcm92aWRlcik6IHZvaWQge1xuICAgIHByb3ZpZGVyLnNpZ25JbldpdGhSZWRpcmVjdCgpO1xuICB9XG4gIC8qKlxuICAgKiDojrflj5blvZPliY3otKbmiLfnmoTlvq7kv6EgVW5pb25JRCDnu5HlrprnmoTkupHlvIDlj5HotKbmiLfliJfooajjgILlpoLmnpzlvZPliY3otKbmiLfkuI3lrZjlnKggVW5pb25JRO+8jOS8mui/lOWbnumUmeivr+OAglxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iOt+WPlui0puaIt+WIl+ihqOWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLmdldExpbmtlZFVpZExpc3QoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRMaW5rZWRVaWRMaXN0KCkge1xuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLmdldExpbmtlZFVpZExpc3QnLCB7fSk7XG4gICAgbGV0IGhhc1ByaW1hcnlVaWQgPSBmYWxzZTtcbiAgICBjb25zdCB1c2VycyA9IGRhdGEudXNlcnMgYXMgSVVzZXJJbmZvW107XG4gICAgZm9yKGNvbnN0IHVzZXIgb2YgdXNlcnMpe1xuICAgICAgaWYgKHVzZXIud3hPcGVuSWQgJiYgdXNlci53eFB1YmxpY0lkKSB7XG4gICAgICAgIGhhc1ByaW1hcnlVaWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXJzLFxuICAgICAgaGFzUHJpbWFyeVVpZFxuICAgIH07XG4gIH1cbiAgLyoqXG4gICAqIOiuvue9ruW+ruS/oeS4u+i0puWPt++8jOmAmuW4uOaQremFjeWSjCBVc2VyLmdldExpbmtlZFVpZExpc3QoKSDkvb/nlKjvvIznlKjkuo7lnKjlkIzkuKrlvq7kv6EgVW5pb25JRCDlr7nlupTnmoTlpJrkuKrkupHlvIDlj5HotKblj7fkuK3vvIzorr7nva7lhbbkuK3kuIDkuKrkuLrkuLvotKblj7dcbiAgICog6K6+572u5LmL5ZCO77yM6YCa6L+HIFVuaW9uSUQg55m75b2V5L6/5Lya55m75b2V6Iez5Li76LSm5Y+35LmL5LiK44CCXG4gICAqIEBwYXJhbSB1aWQgXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6K6+572u5b6u5L+h5Li76LSm5Y+35aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIuc2V0UHJpbWFyeVVpZCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIHNldFByaW1hcnlVaWQodWlkOnN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGguc2V0UHJpbWFyeVVpZCcsIHsgdWlkIH0pO1xuICB9XG4gIC8qKlxuICAgKiDop6Pnu5Hmn5DkuKrnmbvlvZXmlrnlvI9cbiAgICogQHBhcmFtIGxvZ2luVHlwZSBcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmjqXop6bnu5HlrprlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci51bmxpbmsoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjei0puaIt+aYr+WQpuW3sue7j+S4juatpOeZu+W9leaWueW8j+ino+e7kScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIHVubGluayhsb2dpblR5cGU6J0NVU1RPTSd8J1dFQ0hBVC1PUEVOJ3wnV0VDSEFULVBVQkxJQyd8J1dFQ0hBVC1VTklPTicpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnVubGluaycsIHsgcGxhdGZvcm06IGxvZ2luVHlwZSB9KTtcbiAgfVxuICAvKipcbiAgICog5pu05paw55So5oi35L+h5oGvXG4gICAqIEBwYXJhbSB1c2VySW5mbyBcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmm7TmlrDnlKjmiLfkv6Hmga/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci51cGRhdGUoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOeUqOaIt+S/oeaBr+S4reaYr+WQpuWMheWQq+mdnuazleWAvCcsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHVwZGF0ZSh1c2VySW5mbzpJVXNlckluZm8pOlByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgbmlja05hbWUsIGdlbmRlciwgYXZhdGFyVXJsLCBwcm92aW5jZSwgY291bnRyeSwgY2l0eSB9ID0gdXNlckluZm87XG4gICAgY29uc3QgeyBkYXRhOiBuZXdVc2VySW5mbyB9ID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnVwZGF0ZVVzZXJJbmZvJywgeyBuaWNrTmFtZSwgZ2VuZGVyLCBhdmF0YXJVcmwsIHByb3ZpbmNlLCBjb3VudHJ5LCBjaXR5IH0pO1xuICAgIHRoaXMuX3NldExvY2FsVXNlckluZm8obmV3VXNlckluZm8pO1xuICB9XG4gIC8qKlxuICAgKiDmm7TmlrDlr4bnoIFcbiAgICogQHBhcmFtIG5ld1Bhc3N3b3JkIFxuICAgKiBAcGFyYW0gb2xkUGFzc3dvcmQgXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw5a+G56CB5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlUGFzc3dvcmQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMyAtIOaWsOWvhueggeS4reaYr+WQpuWMheWQq+mdnuazleWtl+espicsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIHVwZGF0ZVBhc3N3b3JkKG5ld1Bhc3N3b3JkOnN0cmluZywgb2xkUGFzc3dvcmQ6c3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC51cGRhdGVQYXNzd29yZCcsIHtcbiAgICAgIG9sZFBhc3N3b3JkLFxuICAgICAgbmV3UGFzc3dvcmRcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog5pu05paw6YKu566x5Zyw5Z2AXG4gICAqIEBwYXJhbSBuZXdFbWFpbCBcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmm7TmlrDpgq7nrrHlnLDlnYDlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci51cGRhdGVFbWFpbCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG6YKu566x5a+G56CB55m75b2VJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgdXBkYXRlRW1haWwobmV3RW1haWw6c3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC51cGRhdGVFbWFpbCcsIHtcbiAgICAgIG5ld0VtYWlsXG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOabtOaWsOeUqOaIt+WQjVxuICAgKiBAcGFyYW0gdXNlcm5hbWUgXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw55So5oi35ZCN5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlVXNlcm5hbWUoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6hueUqOaIt+WQjeWvhueggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIHVwZGF0ZVVzZXJuYW1lKHVzZXJuYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHVzZXJuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3dFcnJvcihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsJ3VzZXJuYW1lIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnVwZGF0ZVVzZXJuYW1lJywge1xuICAgICAgdXNlcm5hbWVcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog5Yi35paw5pys5Zyw55So5oi35L+h5oGv44CC5b2T55So5oi35Zyo5YW25LuW5a6i5oi356uv5pu05paw55So5oi35L+h5oGv5LmL5ZCO77yM5Y+v5Lul6LCD55So5q2k5o6l5Y+j5ZCM5q2l5pu05paw5LmL5ZCO55qE5L+h5oGv44CCXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5Yi35paw5pys5Zyw55So5oi35L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIucmVmcmVzaCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHJlZnJlc2goKTpQcm9taXNlPElVc2VySW5mbz4ge1xuICAgIGNvbnN0IGFjdGlvbiA9ICdhdXRoLmdldFVzZXJJbmZvJztcbiAgICBjb25zdCB7IGRhdGE6IHVzZXJJbmZvIH0gPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoYWN0aW9uLCB7fSk7XG4gICAgdGhpcy5fc2V0TG9jYWxVc2VySW5mbyh1c2VySW5mbyk7XG4gICAgcmV0dXJuIHVzZXJJbmZvO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TG9jYWxVc2VySW5mbyhrZXk6c3RyaW5nKTpzdHJpbmcge1xuICAgIGNvbnN0IHsgdXNlckluZm9LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgdXNlckluZm8gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZSh1c2VySW5mb0tleSk7XG4gICAgcmV0dXJuIHVzZXJJbmZvW2tleV07XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoa2V5OnN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCB1c2VySW5mbyA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmModXNlckluZm9LZXkpO1xuICAgIHJldHVybiB1c2VySW5mb1trZXldO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0VXNlckluZm8oKXtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodXNlckluZm9LZXkpO1xuICAgIFtcbiAgICAgICd1aWQnLFxuICAgICAgJ2xvZ2luVHlwZScsXG4gICAgICAnb3BlbmlkJyxcbiAgICAgICd3eE9wZW5JZCcsXG4gICAgICAnd3hQdWJsaWNJZCcsXG4gICAgICAndW5pb25JZCcsXG4gICAgICAncXFNaW5pT3BlbklkJyxcbiAgICAgICdlbWFpbCcsXG4gICAgICAnaGFzUGFzc3dvcmQnLFxuICAgICAgJ2N1c3RvbVVzZXJJZCcsXG4gICAgICAnbmlja05hbWUnLFxuICAgICAgJ2dlbmRlcicsXG4gICAgICAnYXZhdGFyVXJsJyxcbiAgICBdLmZvckVhY2goaW5mb0tleSA9PiB7XG4gICAgICB0aGlzW2luZm9LZXldID0gdXNlckluZm9baW5mb0tleV07XG4gICAgfSk7XG5cbiAgICB0aGlzLmxvY2F0aW9uID0ge1xuICAgICAgY291bnRyeTogdXNlckluZm9bJ2NvdW50cnknXSxcbiAgICAgIHByb3ZpbmNlOiB1c2VySW5mb1sncHJvdmluY2UnXSxcbiAgICAgIGNpdHk6IHVzZXJJbmZvWydjaXR5J11cbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0TG9jYWxVc2VySW5mbyh1c2VySW5mbzphbnkpIHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIHRoaXMuX2NhY2hlLnNldFN0b3JlKHVzZXJJbmZvS2V5LCB1c2VySW5mbyk7XG4gICAgdGhpcy5fc2V0VXNlckluZm8oKTtcbiAgfVxufVxuaW50ZXJmYWNlIElMb2dpblN0YXRlT3B0aW9ucyBleHRlbmRzIElVc2VyT3B0aW9ucyB7XG4gIGVudklkOiBzdHJpbmc7XG59XG5leHBvcnQgY2xhc3MgTG9naW5TdGF0ZSBpbXBsZW1lbnRzIElMb2dpblN0YXRle1xuICBwdWJsaWMgY3JlZGVudGlhbDogSUNyZWRlbnRpYWw7XG4gIHB1YmxpYyB1c2VyOiBJVXNlcjtcblxuICBwcml2YXRlIF9jYWNoZTogSUNsb3VkYmFzZUNhY2hlO1xuICBwcml2YXRlIF9sb2dpblR5cGU6IHN0cmluZztcbiAgXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6SUxvZ2luU3RhdGVPcHRpb25zKSB7XG4gICAgY29uc3QgeyBlbnZJZCwgY2FjaGUsIHJlcXVlc3QgfSA9IG9wdGlvbnM7XG4gICAgaWYgKCFlbnZJZCkge1xuICAgICAgdGhyb3dFcnJvcihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsICdlbnZJZCBpcyBub3QgZGVmaW5lZCcpO1xuICAgIH1cbiAgICB0aGlzLl9jYWNoZSA9IGNhY2hlO1xuXG4gICAgdGhpcy51c2VyID0gbmV3IFVzZXIoe1xuICAgICAgY2FjaGUsXG4gICAgICByZXF1ZXN0XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2hlY2tMb2NhbFN0YXRlKCl7XG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXksIGFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbkV4cGlyZUtleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZShyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUoYWNjZXNzVG9rZW5LZXkpO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuRXhwaXJlID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUoYWNjZXNzVG9rZW5FeHBpcmVLZXkpO1xuXG4gICAgdGhpcy5jcmVkZW50aWFsID0ge1xuICAgICAgcmVmcmVzaFRva2VuLFxuICAgICAgYWNjZXNzVG9rZW4sXG4gICAgICBhY2Nlc3NUb2tlbkV4cGlyZVxuICAgIH07XG5cbiAgICB0aGlzLl9sb2dpblR5cGUgPSB0aGlzLl9jYWNoZS5nZXRTdG9yZSh0aGlzLl9jYWNoZS5rZXlzLmxvZ2luVHlwZUtleSk7XG5cbiAgICB0aGlzLnVzZXIuY2hlY2tMb2NhbEluZm8oKTtcbiAgfVxuICBwdWJsaWMgYXN5bmMgY2hlY2tMb2NhbFN0YXRlQXN5bmMoKXtcbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSwgYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuRXhwaXJlS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuRXhwaXJlID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSk7XG5cbiAgICB0aGlzLmNyZWRlbnRpYWwgPSB7XG4gICAgICByZWZyZXNoVG9rZW4sXG4gICAgICBhY2Nlc3NUb2tlbixcbiAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlXG4gICAgfTtcblxuICAgIHRoaXMuX2xvZ2luVHlwZSA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmModGhpcy5fY2FjaGUua2V5cy5sb2dpblR5cGVLZXkpO1xuXG4gICAgYXdhaXQgdGhpcy51c2VyLmNoZWNrTG9jYWxJbmZvQXN5bmMoKTtcbiAgfVxuXG4gIGdldCBpc0Fub255bW91c0F1dGgoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9naW5UeXBlID09PSBMT0dJTlRZUEUuQU5PTllNT1VTO1xuICB9XG5cbiAgZ2V0IGlzQ3VzdG9tQXV0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2dpblR5cGUgPT09IExPR0lOVFlQRS5DVVNUT007XG4gIH1cblxuICBnZXQgaXNXZWl4aW5BdXRoKCkge1xuICAgIHJldHVybiB0aGlzLmxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLldFQ0hBVCB8fCB0aGlzLmxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLldFQ0hBVF9PUEVOIHx8IHRoaXMubG9naW5UeXBlID09PSBMT0dJTlRZUEUuV0VDSEFUX1BVQkxJQztcbiAgfVxuXG4gIGdldCBpc1VzZXJuYW1lQXV0aCgpe1xuICAgIHJldHVybiB0aGlzLmxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLlVTRVJOQU1FO1xuICB9XG5cbiAgZ2V0IGxvZ2luVHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbG9naW5UeXBlXG4gIH1cbn1cblxuY2xhc3MgQXV0aHtcbiAgcHJpdmF0ZSByZWFkb25seSBfY29uZmlnOiBJQ2xvdWRiYXNlQXV0aENvbmZpZztcbiAgcHJpdmF0ZSByZWFkb25seSBfY2FjaGU6IElDbG91ZGJhc2VDYWNoZVxuICBwcml2YXRlIHJlYWRvbmx5IF9yZXF1ZXN0OiBJQ2xvdWRiYXNlUmVxdWVzdDtcbiAgcHJpdmF0ZSByZWFkb25seSBfcnVudGltZTogc3RyaW5nO1xuICBwcml2YXRlIF9hbm9ueW1vdXNBdXRoUHJvdmlkZXI6IEFub255bW91c0F1dGhQcm92aWRlcjtcbiAgcHJpdmF0ZSBfY3VzdG9tQXV0aFByb3ZpZGVyOiBDdXN0b21BdXRoUHJvdmlkZXI7XG4gIHByaXZhdGUgX3dlaXhpbkF1dGhQcm92aWRlcjogV2VpeGluQXV0aFByb3ZpZGVyO1xuICBwcml2YXRlIF9lbWFpbEF1dGhQcm92aWRlcjogRW1haWxBdXRoUHJvdmlkZXI7XG4gIHByaXZhdGUgX3VzZXJuYW1lQXV0aFByb3ZpZGVyOiBVc2VybmFtZUF1dGhQcm92aWRlcjtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IElDbG91ZGJhc2VBdXRoQ29uZmlnJntjYWNoZTpJQ2xvdWRiYXNlQ2FjaGUscmVxdWVzdDpJQ2xvdWRiYXNlUmVxdWVzdCxydW50aW1lPzpzdHJpbmd9KSB7XG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICAgIHRoaXMuX2NhY2hlID0gY29uZmlnLmNhY2hlO1xuICAgIHRoaXMuX3JlcXVlc3QgPSBjb25maWcucmVxdWVzdDtcbiAgICB0aGlzLl9ydW50aW1lID0gY29uZmlnLnJ1bnRpbWV8fFJVTlRJTUUuV0VCXG5cbiAgICBldmVudEJ1cy5vbihFVkVOVFMuTE9HSU5fVFlQRV9DSEFOR0VELCB0aGlzLl9vbkxvZ2luVHlwZUNoYW5nZWQuYmluZCh0aGlzKSk7XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluW9k+WJjeeZu+W9leeahOeUqOaIt+S/oeaBry3lkIzmraVcbiAgICovXG4gIGdldCBjdXJyZW50VXNlcigpIHtcbiAgICBpZih0aGlzLl9jYWNoZS5tb2RlPT09J2FzeW5jJyl7XG4gICAgICAvLyBhc3luYyBzdG9yYWdl55qE5bmz5Y+w6LCD55So5q2kQVBJ5o+Q56S6XG4gICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLCdjdXJyZW50IHBsYXRmb3JtXFwncyBzdG9yYWdlIGlzIGFzeW5jaHJvbm91cywgcGxlYXNlIHVzZSBnZXRDdXJyZW5Vc2VyIGluc3RlZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IHRoaXMuaGFzTG9naW5TdGF0ZSgpO1xuICAgIGlmIChsb2dpblN0YXRlKSB7XG4gICAgICByZXR1cm4gbG9naW5TdGF0ZS51c2VyIHx8IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog6I635Y+W5b2T5YmN55m75b2V57G75Z6LLeWQjOatpVxuICAgKi9cbiAgZ2V0IGxvZ2luVHlwZSgpOiBMT0dJTlRZUEUge1xuICAgIHJldHVybiB0aGlzLl9jYWNoZS5nZXRTdG9yZSh0aGlzLl9jYWNoZS5rZXlzLmxvZ2luVHlwZUtleSk7XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluW9k+WJjeeZu+W9leeahOeUqOaIt+S/oeaBry3lvILmraVcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5bnlKjmiLfkv6Hmga/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmdldEN1cnJlblVzZXIoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRDdXJyZW5Vc2VyKCl7XG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IGF3YWl0IHRoaXMuZ2V0TG9naW5TdGF0ZSgpO1xuICAgIGlmIChsb2dpblN0YXRlKSB7XG4gICAgICBhd2FpdCBsb2dpblN0YXRlLnVzZXIuY2hlY2tMb2NhbEluZm9Bc3luYygpO1xuICAgICAgcmV0dXJuIGxvZ2luU3RhdGUudXNlciB8fCBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluW9k+WJjeeZu+W9leexu+Weiy3lvILmraVcbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRMb2dpblR5cGUoKTogUHJvbWlzZTxMT0dJTlRZUEU+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyh0aGlzLl9jYWNoZS5rZXlzLmxvZ2luVHlwZUtleSkgYXMgTE9HSU5UWVBFO1xuICB9XG4gIHB1YmxpYyBhc3luYyBnZXRBY2Nlc3NUb2tlbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWNjZXNzVG9rZW46IChhd2FpdCB0aGlzLl9yZXF1ZXN0LmdldEFjY2Vzc1Rva2VuKCkpLmFjY2Vzc1Rva2VuLFxuICAgICAgZW52OiB0aGlzLl9jb25maWcuZW52XG4gICAgfTtcbiAgfVxuICBwdWJsaWMgd2VpeGluQXV0aFByb3ZpZGVyKHsgYXBwaWQsIHNjb3BlLCBzdGF0ZSB9KTpXZWl4aW5BdXRoUHJvdmlkZXIge1xuICAgIGlmKCF0aGlzLl93ZWl4aW5BdXRoUHJvdmlkZXIpe1xuICAgICAgdGhpcy5fd2VpeGluQXV0aFByb3ZpZGVyID0gbmV3IFdlaXhpbkF1dGhQcm92aWRlcih7XG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0LFxuICAgICAgICBydW50aW1lOiB0aGlzLl9ydW50aW1lXG4gICAgICB9LCBhcHBpZCwgc2NvcGUsIHN0YXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3dlaXhpbkF1dGhQcm92aWRlcjtcbiAgfVxuICBwdWJsaWMgYW5vbnltb3VzQXV0aFByb3ZpZGVyKCk6QW5vbnltb3VzQXV0aFByb3ZpZGVyIHtcbiAgICBpZiAoIXRoaXMuX2Fub255bW91c0F1dGhQcm92aWRlcikge1xuICAgICAgdGhpcy5fYW5vbnltb3VzQXV0aFByb3ZpZGVyID0gbmV3IEFub255bW91c0F1dGhQcm92aWRlcih7XG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2Fub255bW91c0F1dGhQcm92aWRlcjtcbiAgfVxuICBwdWJsaWMgY3VzdG9tQXV0aFByb3ZpZGVyKCk6Q3VzdG9tQXV0aFByb3ZpZGVyIHtcbiAgICBpZighdGhpcy5fY3VzdG9tQXV0aFByb3ZpZGVyKXtcbiAgICAgIHRoaXMuX2N1c3RvbUF1dGhQcm92aWRlciA9IG5ldyBDdXN0b21BdXRoUHJvdmlkZXIoe1xuICAgICAgICAuLi50aGlzLl9jb25maWcsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jdXN0b21BdXRoUHJvdmlkZXI7XG4gIH1cbiAgcHVibGljIGVtYWlsQXV0aFByb3ZpZGVyKCk6RW1haWxBdXRoUHJvdmlkZXIge1xuICAgIGlmKCF0aGlzLl9lbWFpbEF1dGhQcm92aWRlcil7XG4gICAgICB0aGlzLl9lbWFpbEF1dGhQcm92aWRlciA9IG5ldyBFbWFpbEF1dGhQcm92aWRlcih7XG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2VtYWlsQXV0aFByb3ZpZGVyO1xuICB9XG4gIHB1YmxpYyB1c2VybmFtZUF1dGhQcm92aWRlcigpOlVzZXJuYW1lQXV0aFByb3ZpZGVyIHtcbiAgICBpZighdGhpcy5fdXNlcm5hbWVBdXRoUHJvdmlkZXIpe1xuICAgICAgdGhpcy5fdXNlcm5hbWVBdXRoUHJvdmlkZXIgPSBuZXcgVXNlcm5hbWVBdXRoUHJvdmlkZXIoe1xuICAgICAgICAuLi50aGlzLl9jb25maWcsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl91c2VybmFtZUF1dGhQcm92aWRlcjtcbiAgfVxuICAvKipcbiAgICog55So5oi35ZCN5a+G56CB55m75b2VXG4gICAqIEBwYXJhbSB1c2VybmFtZSBcbiAgICogQHBhcmFtIHBhc3N3b3JkIFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbldpdGhVc2VybmFtZUFuZFBhc3N3b3JkKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy51c2VybmFtZUF1dGhQcm92aWRlcigpLnNpZ25Jbih1c2VybmFtZSwgcGFzc3dvcmQpO1xuICB9XG4gIC8qKlxuICAgKiDmo4DmtYvnlKjmiLflkI3mmK/lkKblt7Lnu4/ljaDnlKhcbiAgICogQHBhcmFtIHVzZXJuYW1lIFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iOt+WPlueUqOaIt+aYr+WQpuiiq+WNoOeUqOWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuaXNVc2VybmFtZVJlZ2lzdGVyZWQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBpc1VzZXJuYW1lUmVnaXN0ZXJlZCh1c2VybmFtZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKHR5cGVvZiB1c2VybmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCd1c2VybmFtZSBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGguaXNVc2VybmFtZVJlZ2lzdGVyZWQnLCB7XG4gICAgICB1c2VybmFtZVxuICAgIH0pO1xuICAgIHJldHVybiBkYXRhPy5pc1JlZ2lzdGVyZWQ7XG4gIH1cbiAgLyoqXG4gICAqIOmCrueuseWvhueggeeZu+W9lVxuICAgKiBAcGFyYW0gZW1haWwgXG4gICAqIEBwYXJhbSBwYXNzd29yZCBcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1haWxBdXRoUHJvdmlkZXIoKS5zaWduSW4oZW1haWwsIHBhc3N3b3JkKTtcbiAgfVxuICAvKipcbiAgICog6YKu566x5a+G56CB5rOo5YaMXG4gICAqIEBwYXJhbSBlbWFpbCBcbiAgICogQHBhcmFtIHBhc3N3b3JkIFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25VcFdpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsOnN0cmluZywgcGFzc3dvcmQ6c3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1haWxBdXRoUHJvdmlkZXIoKS5zaWduVXAoZW1haWwscGFzc3dvcmQpO1xuICB9XG4gIC8qKlxuICAgKiDph43nva7pgq7nrrHlr4bnoIFcbiAgICogQHBhcmFtIGVtYWlsIFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlbmRQYXNzd29yZFJlc2V0RW1haWwoZW1haWw6c3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1haWxBdXRoUHJvdmlkZXIoKS5yZXNldFBhc3N3b3JkKGVtYWlsKTtcbiAgfVxuICAvKipcbiAgICog55m75Ye6XG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn55So5oi355m75Ye65aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5zaWduT3V0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3nlKjmiLfmmK/lkKbkuLrljL/lkI3nmbvlvZXvvIjljL/lkI3nmbvlvZXkuI3mlK/mjIFzaWduT3V077yJJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgc2lnbk91dCgpIHtcbiAgICBjb25zdCBsb2dpblR5cGUgPSBhd2FpdCB0aGlzLmdldExvZ2luVHlwZSgpO1xuICAgIGlmIChsb2dpblR5cGUgPT09IExPR0lOVFlQRS5BTk9OWU1PVVMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX09QRVJBVElPTixcbiAgICAgICAgbXNnOiAnYW5vbnltb3VzIHVzZXIgZG9lc25cXCd0IHN1cHBvcnQgc2lnbk91dCBhY3Rpb24nXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5LCBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgYWN0aW9uID0gJ2F1dGgubG9nb3V0JztcblxuICAgIGNvbnN0IHJlZnJlc2hfdG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgaWYgKCFyZWZyZXNoX3Rva2VuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZChhY3Rpb24sIHsgcmVmcmVzaF90b2tlbiB9KTtcblxuICAgIHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5KTtcblxuICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQpO1xuICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCwge1xuICAgICAgZW52OiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgbG9naW5UeXBlOiBMT0dJTlRZUEUuTlVMTCxcbiAgICAgIHBlcnNpc3RlbmNlOiB0aGlzLl9jb25maWcucGVyc2lzdGVuY2VcbiAgICB9KTtcblxuICAgIHJldHVybiByZXM7XG4gIH1cbiAgcHVibGljIGFzeW5jIG9uTG9naW5TdGF0ZUNoYW5nZWQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgZXZlbnRCdXMub24oRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBhd2FpdCB0aGlzLmdldExvZ2luU3RhdGUoKTtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgbG9naW5TdGF0ZSk7XG4gICAgfSk7XG4gICAgLy8g56uL5Yi75omn6KGM5LiA5qyh5Zue6LCDXG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IGF3YWl0IHRoaXMuZ2V0TG9naW5TdGF0ZSgpO1xuICAgIGNhbGxiYWNrLmNhbGwodGhpcywgbG9naW5TdGF0ZSk7XG4gIH1cbiAgcHVibGljIG9uTG9naW5TdGF0ZUV4cGlyZWQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgZXZlbnRCdXMub24oRVZFTlRTLkxPR0lOX1NUQVRFX0VYUElSRUQsIGNhbGxiYWNrLmJpbmQodGhpcykpO1xuICB9XG4gIHB1YmxpYyBvbkFjY2Vzc1Rva2VuUmVmcmVzaGVkKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGV2ZW50QnVzLm9uKEVWRU5UUy5BQ0NFU1NfVE9LRU5fUkVGUkVTSEQsIGNhbGxiYWNrLmJpbmQodGhpcykpO1xuICB9XG4gIHB1YmxpYyBvbkFub255bW91c0NvbnZlcnRlZChjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBldmVudEJ1cy5vbihFVkVOVFMuQU5PTllNT1VTX0NPTlZFUlRFRCwgY2FsbGJhY2suYmluZCh0aGlzKSk7XG4gIH1cbiAgcHVibGljIG9uTG9naW5UeXBlQ2hhbmdlZChjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBldmVudEJ1cy5vbihFVkVOVFMuTE9HSU5fVFlQRV9DSEFOR0VELCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gYXdhaXQgdGhpcy5nZXRMb2dpblN0YXRlKCk7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGxvZ2luU3RhdGUpO1xuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnmbvlvZXmgIEt5ZCM5q2lXG4gICAqL1xuICBwdWJsaWMgaGFzTG9naW5TdGF0ZSgpOiBJTG9naW5TdGF0ZXxudWxsIHtcbiAgICBpZih0aGlzLl9jYWNoZS5tb2RlPT09J2FzeW5jJyl7XG4gICAgICAvLyBhc3luYyBzdG9yYWdl55qE5bmz5Y+w6LCD55So5q2kQVBJ5o+Q56S6XG4gICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLCdjdXJyZW50IHBsYXRmb3JtXFwncyBzdG9yYWdlIGlzIGFzeW5jaHJvbm91cywgcGxlYXNlIHVzZSBnZXRMb2dpblN0YXRlIGluc3RlZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUocmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZiAocmVmcmVzaFRva2VuKSB7XG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICAgIGxvZ2luU3RhdGUuY2hlY2tMb2NhbFN0YXRlKCk7XG4gICAgICByZXR1cm4gbG9naW5TdGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnmbvlvZXmgIEt5byC5q2lXG4gICAqIOatpEFQSeS4uuWFvOWuueW8guatpXN0b3JhZ2XnmoTlubPlj7BcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5bmnKzlnLDnmbvlvZXmgIHlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmdldExvZ2luU3RhdGUoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRMb2dpblN0YXRlKCkge1xuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZiAocmVmcmVzaFRva2VuKSB7XG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IGxvZ2luU3RhdGUuY2hlY2tMb2NhbFN0YXRlQXN5bmMoKTtcbiAgICAgIHJldHVybiBsb2dpblN0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuKGhvb2spIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5fcmVxdWVzdC5fc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuSG9vayA9IGhvb2suYmluZCh0aGlzKTtcbiAgfVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W55So5oi35L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g5piv5ZCm5bey55m75b2VJyxcbiAgICAgICcgIDIgLSDosIPnlKggYXV0aCgpLmdldFVzZXJJbmZvKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0VXNlckluZm8oKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBhY3Rpb24gPSAnYXV0aC5nZXRVc2VySW5mbyc7XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoYWN0aW9uLCB7fSk7XG4gICAgaWYgKHJlcy5jb2RlKSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5yZXMuZGF0YSxcbiAgICAgICAgcmVxdWVzdElkOiByZXMuc2VxSWRcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDojrflj5ZIdHRw6Ym05p2DaGVhZGVy77yM55So5LqO5LqR5o6l5YWlIEhUVFAg6K6/6Zeu5LqR5Ye95pWw5pe255qE6Ym05p2DXG4gICAqL1xuICBwdWJsaWMgZ2V0QXV0aEhlYWRlcigpIHtcbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSwgYWNjZXNzVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUocmVmcmVzaFRva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICByZXR1cm4ge1xuICAgICAgJ3gtY2xvdWRiYXNlLWNyZWRlbnRpYWxzJzogYWNjZXNzVG9rZW4gKyAnL0BALycgKyByZWZyZXNoVG9rZW5cbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiDlvILmraXmqKHlvI/ojrflj5ZIdHRw6Ym05p2DaGVhZGVy77yM55So5LqO5LqR5o6l5YWlIEhUVFAg6K6/6Zeu5LqR5Ye95pWw5pe255qE6Ym05p2DXG4gICAqIOiwg+eUqOatpEFQSeS8muWIt+aWsOeZu+W9leaAgVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEF1dGhIZWFkZXJBc3luYygpIHtcbiAgICBhd2FpdCB0aGlzLl9yZXF1ZXN0LnJlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgIFxuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5LCBhY2Nlc3NUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCAgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICd4LWNsb3VkYmFzZS1jcmVkZW50aWFscyc6IGFjY2Vzc1Rva2VuICsgJy9AQC8nICsgcmVmcmVzaFRva2VuXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX29uTG9naW5UeXBlQ2hhbmdlZChldikge1xuICAgIGNvbnN0IHsgbG9naW5UeXBlLCBwZXJzaXN0ZW5jZSwgZW52IH0gPSBldi5kYXRhO1xuICAgIGlmIChlbnYgIT09IHRoaXMuX2NvbmZpZy5lbnYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8g55m75b2V5oCB6L2s5Y+Y5ZCO6L+B56e7Y2FjaGXvvIzpmLLmraLlnKjljL/lkI3nmbvlvZXnirbmgIHkuItjYWNoZea3t+eUqFxuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnVwZGF0ZVBlcnNpc3RlbmNlQXN5bmMocGVyc2lzdGVuY2UpO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmModGhpcy5fY2FjaGUua2V5cy5sb2dpblR5cGVLZXksIGxvZ2luVHlwZSk7XG4gIH1cbn1cblxuY29uc3QgRVZFTlRTID0ge1xuICAvLyDnmbvlvZXmgIHmlLnlj5jlkI7op6blj5FcbiAgTE9HSU5fU1RBVEVfQ0hBTkdFRCAgOiAnbG9naW5TdGF0ZUNoYW5nZWQnLFxuICAvLyDnmbvlvZXmgIHov4fmnJ/lkI7op6blj5FcbiAgTE9HSU5fU1RBVEVfRVhQSVJFRCAgOiAnbG9naW5TdGF0ZUV4cGlyZScsXG4gIC8vIOeZu+W9leexu+Wei+aUueWPmOWQjuinpuWPkVxuICBMT0dJTl9UWVBFX0NIQU5HRUQgICA6ICdsb2dpblR5cGVDaGFuZ2VkJyxcbiAgLy8g5Yy/5ZCN6LSm5oi36KKr6L2s5q2j5ZCO6Kem5Y+RXG4gIEFOT05ZTU9VU19DT05WRVJURUQgIDogJ2Fub255bW91c0NvbnZlcnRlZCcsIFxuICAvLyBhY2Nlc3MgdG9rZW7liLfmlrDlkI7op6blj5FcbiAgQUNDRVNTX1RPS0VOX1JFRlJFU0hEOiAncmVmcmVzaEFjY2Vzc1Rva2VuJ1xufTtcblxuY29uc3QgY29tcG9uZW50OklDbG91ZGJhc2VDb21wb25lbnQgPSB7XG4gIG5hbWU6IENPTVBPTkVOVF9OQU1FLFxuICBuYW1lc3BhY2U6ICdhdXRoJyxcbiAgaW5qZWN0RXZlbnRzOiB7XG4gICAgYnVzOiBldmVudEJ1cyxcbiAgICBldmVudHM6IFtcbiAgICAgIEVWRU5UUy5MT0dJTl9UWVBFX0NIQU5HRUQsXG4gICAgICBFVkVOVFMuTE9HSU5fU1RBVEVfRVhQSVJFRCxcbiAgICAgIEVWRU5UUy5MT0dJTl9TVEFURV9DSEFOR0VELFxuICAgICAgRVZFTlRTLkFDQ0VTU19UT0tFTl9SRUZSRVNIRCxcbiAgICAgIEVWRU5UUy5BTk9OWU1PVVNfQ09OVkVSVEVEXG4gICAgXVxuICB9LFxuICBlbnRpdHk6IGZ1bmN0aW9uKGNvbmZpZzpQaWNrPElDbG91ZGJhc2VBdXRoQ29uZmlnLCdwZXJzaXN0ZW5jZSc+PXtwZXJzaXN0ZW5jZTonc2Vzc2lvbid9KXtcbiAgICBpZiAodGhpcy5hdXRoSW5zdGFuY2UpIHtcbiAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sJ2V2ZXJ5IGNsb3VkYmFzZSBpbnN0YW5jZSBzaG91bGQgaGFzIG9ubHkgb25lIGF1dGggb2JqZWN0Jyk7XG4gICAgICByZXR1cm4gdGhpcy5hdXRoSW5zdGFuY2U7XG4gICAgfVxuICAgIGNvbnN0IHsgYWRhcHRlcixydW50aW1lIH0gPSB0aGlzLnBsYXRmb3JtO1xuICAgIC8vIOWmguS4jeaYjuehruaMh+WumnBlcnNpc3RlbmNl5YiZ5LyY5YWI5Y+W5ZCE5bmz5Y+wYWRhcHRlcummlumAie+8jOWFtuasoXNlc3Npb25cbiAgICBjb25zdCBuZXdQZXJzaXN0ZW5jZSA9IGNvbmZpZy5wZXJzaXN0ZW5jZSB8fCBhZGFwdGVyLnByaW1hcnlTdG9yYWdlO1xuICAgIGlmIChuZXdQZXJzaXN0ZW5jZSYmKG5ld1BlcnNpc3RlbmNlICE9PSB0aGlzLmNvbmZpZy5wZXJzaXN0ZW5jZSkpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29uZmlnKHtwZXJzaXN0ZW5jZTogbmV3UGVyc2lzdGVuY2V9KVxuICAgIH1cblxuICAgIGNvbnN0IHsgZW52LCBwZXJzaXN0ZW5jZSwgZGVidWcgfSA9IHRoaXMuY29uZmlnO1xuICAgIHRoaXMuYXV0aEluc3RhbmNlID0gbmV3IEF1dGgoe1xuICAgICAgZW52LCBcbiAgICAgIHBlcnNpc3RlbmNlLCBcbiAgICAgIGRlYnVnLFxuICAgICAgY2FjaGU6IHRoaXMuY2FjaGUsXG4gICAgICByZXF1ZXN0OiB0aGlzLnJlcXVlc3QsXG4gICAgICBydW50aW1lOiBydW50aW1lXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuYXV0aEluc3RhbmNlO1xuICB9XG59XG5cbnRyeXtcbiAgLy8g5bCd6K+V6Ieq5Yqo5rOo5YaM6Iez5YWo5bGA5Y+Y6YePY2xvdWRiYXNlXG4gIC8vIOatpOihjOS4uuWPquWcqOa1j+iniOWZqOeOr+Wig+S4i+acieaViFxuICBjbG91ZGJhc2UucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbn1jYXRjaChlKXt9XG5cbmV4cG9ydCB7XG4gIFVzZXJJbmZvLFxuICBBdXRoLFxuICBBdXRoUHJvdmlkZXIsXG4gIEVWRU5UUyxcbiAgZXZlbnRCdXNcbn07XG4vKipcbiAqIEBhcGkg5omL5Yqo5rOo5YaM6IezY2xvdWRiYXNlIGFwcFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJBdXRoKGFwcDpQaWNrPElDbG91ZGJhc2UsICdyZWdpc3RlckNvbXBvbmVudCc+KXtcbiAgdHJ5e1xuICAgIGFwcC5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xuICB9Y2F0Y2goZSl7XG4gICAgY29uc29sZS53YXJuKGUpO1xuICB9XG59XG5cbnR5cGUgSVByb3ZpZGVyID0gbmV3KC4uLmFyZ3M6YW55W10pID0+IGFueTtcbi8qKlxuICog5rOo5YaMcHJvdmlkZXLvvIzlpoLmnpxcbiAqIEBwYXJhbSBuYW1lIFxuICogQHBhcmFtIHByb3ZpZGVyIFxuICogQGV4YW1wbGUgXG4gKiAvLyDms6jlhoxcbiAqIHJlZ2lzdGVyUHJvdmlkZXIoJ2VtYWlsQXV0aFByb3ZpZGVyJyxmdW5jdGlvbigpe1xuICogICAvLyAuLi5cbiAqIH0pO1xuICogLy8g5L2/55So5pawcHJvdmlkZXLnmbvlvZVcbiAqIGNsb3VkYmFzZS5hdXRoKCkuZW1haWxBdXRoUHJvdmlkZXIoKS5zaWduSW4oKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyUHJvdmlkZXIobmFtZTpzdHJpbmcscHJvdmlkZXI6SVByb3ZpZGVyKXtcbiAgY29uc3QgcHJvdG8gPSBBdXRoLnByb3RvdHlwZTtcbiAgcHJvdG9bbmFtZV0gPSBmdW5jdGlvbihvcHRpb25zOm9iamVjdCl7XG4gICAgY29uc3QgcHJpdmF0ZU5hbWUgPSBgXyR7bmFtZX1gO1xuICAgIGlmKCF0aGlzW3ByaXZhdGVOYW1lXSl7XG4gICAgICB0aGlzW3ByaXZhdGVOYW1lXSA9IG5ldyBwcm92aWRlcih7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzW3ByaXZhdGVOYW1lXTtcbiAgfTtcbn0iXX0=