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
var common_1 = require("./common");
var constants_1 = require("./constants");
var base_1 = require("./providers/base");
Object.defineProperty(exports, "AuthProvider", { enumerable: true, get: function () { return base_1.AuthProvider; } });
var oauth2AuthProvider_1 = require("./providers/oauth2AuthProvider");
var anonymousAuthProvider_1 = require("./providers/anonymousAuthProvider");
var customAuthProvider_1 = require("./providers/customAuthProvider");
var emailAuthProvider_1 = require("./providers/emailAuthProvider");
var phoneAuthProvider_1 = require("./providers/phoneAuthProvider");
var usernameAuthProvider_1 = require("./providers/usernameAuthProvider");
var weixinAuthProvider_1 = require("./providers/weixinAuthProvider");
var CloudbaseEventEmitter = utilities_1.events.CloudbaseEventEmitter;
var RUNTIME = utilities_1.adapters.RUNTIME;
var printWarn = utilities_1.utils.printWarn, throwError = utilities_1.utils.throwError, transformPhone = utilities_1.utils.transformPhone;
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
                this.phone = this._getLocalUserInfo('phone');
                this.username = this._getLocalUserInfo('username');
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
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
            return __generator(this, function (_u) {
                switch (_u.label) {
                    case 0:
                        _a = this;
                        return [4, this._getLocalUserInfoAsync('uid')];
                    case 1:
                        _a.uid = _u.sent();
                        _b = this;
                        return [4, this._getLocalUserInfoAsync('loginType')];
                    case 2:
                        _b.loginType = _u.sent();
                        _c = this;
                        return [4, this._getLocalUserInfoAsync('wxOpenId')];
                    case 3:
                        _c.openid = _u.sent();
                        _d = this;
                        return [4, this._getLocalUserInfoAsync('wxOpenId')];
                    case 4:
                        _d.wxOpenId = _u.sent();
                        _e = this;
                        return [4, this._getLocalUserInfoAsync('wxPublicId')];
                    case 5:
                        _e.wxPublicId = _u.sent();
                        _f = this;
                        return [4, this._getLocalUserInfoAsync('wxUnionId')];
                    case 6:
                        _f.unionId = _u.sent();
                        _g = this;
                        return [4, this._getLocalUserInfoAsync('qqMiniOpenId')];
                    case 7:
                        _g.qqMiniOpenId = _u.sent();
                        _h = this;
                        return [4, this._getLocalUserInfoAsync('customUserId')];
                    case 8:
                        _h.customUserId = _u.sent();
                        _j = this;
                        return [4, this._getLocalUserInfoAsync('nickName')];
                    case 9:
                        _j.nickName = _u.sent();
                        _k = this;
                        return [4, this._getLocalUserInfoAsync('gender')];
                    case 10:
                        _k.gender = _u.sent();
                        _l = this;
                        return [4, this._getLocalUserInfoAsync('avatarUrl')];
                    case 11:
                        _l.avatarUrl = _u.sent();
                        _m = this;
                        return [4, this._getLocalUserInfoAsync('email')];
                    case 12:
                        _m.email = _u.sent();
                        _o = this;
                        _p = Boolean;
                        return [4, this._getLocalUserInfoAsync('hasPassword')];
                    case 13:
                        _o.hasPassword = _p.apply(void 0, [_u.sent()]);
                        _q = this;
                        return [4, this._getLocalUserInfoAsync('phone')];
                    case 14:
                        _q.phone = _u.sent();
                        _r = this;
                        return [4, this._getLocalUserInfoAsync('username')];
                    case 15:
                        _r.username = _u.sent();
                        _s = this;
                        _t = {};
                        return [4, this._getLocalUserInfoAsync('country')];
                    case 16:
                        _t.country = _u.sent();
                        return [4, this._getLocalUserInfoAsync('province')];
                    case 17:
                        _t.province = _u.sent();
                        return [4, this._getLocalUserInfoAsync('city')];
                    case 18:
                        _s.location = (_t.city = _u.sent(),
                            _t);
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
    User.prototype.updateEmail = function (newEmail, password) {
        return this._request.send('auth.updateEmail', {
            newEmail: newEmail,
            password: password
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
    User.prototype.linkWithPhoneNumber = function (phoneNumber, phoneCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._request.send('auth.linkOrUpdatePhoneNumber', {
                        phoneNumber: transformPhone(phoneNumber),
                        phoneCode: phoneCode
                    })];
            });
        });
    };
    User.prototype.updatePhoneNumber = function (phoneNumber, phoneCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._request.send('auth.linkOrUpdatePhoneNumber', {
                        phoneNumber: transformPhone(phoneNumber),
                        phoneCode: phoneCode
                    })];
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
            'phone',
            'username'
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
        __metadata("design:paramtypes", [String, String]),
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
    __decorate([
        catchErrorsDecorator({
            title: '绑定手机号失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().linkWithPhoneNumber() 的语法或参数是否正确',
                '  2 - 当前环境是否开通了短信验证码登录',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], User.prototype, "linkWithPhoneNumber", null);
    __decorate([
        catchErrorsDecorator({
            title: '更新手机号失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用语法或参数是否正确',
                '  2 - 当前环境是否开通了短信验证码登录',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], User.prototype, "updatePhoneNumber", null);
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
    Object.defineProperty(LoginState.prototype, "isPhoneAuth", {
        get: function () {
            return this.loginType === constants_1.LOGINTYPE.PHONE;
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
            var _fromApp, authObj, authType, instance, loginState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _fromApp = this._config._fromApp;
                        return [4, common_1.checkFromAuthV2(_fromApp)];
                    case 1:
                        authObj = _a.sent();
                        authType = authObj.authType, instance = authObj.instance;
                        if (!(authType === 'oauth')) return [3, 3];
                        return [4, instance.getUserInfo()];
                    case 2: return [2, _a.sent()];
                    case 3: return [4, this.getLoginState()];
                    case 4:
                        loginState = _a.sent();
                        if (!loginState) return [3, 6];
                        return [4, loginState.user.checkLocalInfoAsync()];
                    case 5:
                        _a.sent();
                        return [2, loginState.user || null];
                    case 6: return [2, null];
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
    Auth.prototype.phoneAuthProvider = function () {
        if (!this._phoneAuthProvider) {
            this._phoneAuthProvider = new phoneAuthProvider_1.PhoneAuthProvider(__assign(__assign({}, this._config), { cache: this._cache, request: this._request }));
        }
        return this._phoneAuthProvider;
    };
    Auth.prototype.oAuth2AuthProvider = function (options) {
        if (options === void 0) { options = {}; }
        if (!this._oAuth2AuthProvider) {
            this._oAuth2AuthProvider = new oauth2AuthProvider_1.OAuth2AuthProvider(__assign(__assign({}, this._config), { cache: this._cache, request: this._request, runtime: this._runtime }), options);
        }
        return this._oAuth2AuthProvider;
    };
    Auth.prototype.signWithOAuth2Popup = function () {
        this._oAuth2AuthProvider.signInWithPopup();
    };
    Auth.prototype.signInWithOAuth2Modal = function (elemId) {
        this._oAuth2AuthProvider.signInWithModal(elemId);
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
            var _fromApp, authObj, authType, instance, loginType, _a, refreshTokenKey, accessTokenKey, accessTokenExpireKey, refresh_token, accessToken, accessTokenExpire, _b, resp, seqIdFromHeader, body, seqId, body, seqId;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _fromApp = this._config._fromApp;
                        return [4, common_1.checkFromAuthV2(_fromApp)];
                    case 1:
                        authObj = _c.sent();
                        authType = authObj.authType, instance = authObj.instance;
                        if (!(authType === 'oauth')) return [3, 3];
                        return [4, instance.signOut()];
                    case 2: return [2, _c.sent()];
                    case 3: return [4, this.getLoginType()];
                    case 4:
                        loginType = _c.sent();
                        _a = this._cache.keys, refreshTokenKey = _a.refreshTokenKey, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey;
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 5:
                        refresh_token = _c.sent();
                        if (!refresh_token) {
                            return [2];
                        }
                        if (!loginType.startsWith(constants_1.OAUTH2_LOGINTYPE_PREFIX)) return [3, 15];
                        return [4, this._cache.getStoreAsync(accessTokenKey)];
                    case 6:
                        accessToken = _c.sent();
                        _b = Number;
                        return [4, this._cache.getStoreAsync(accessTokenExpireKey)];
                    case 7:
                        accessTokenExpire = _b.apply(void 0, [_c.sent()]);
                        if (!accessToken) return [3, 14];
                        if (!(Date.now() < accessTokenExpire)) return [3, 13];
                        return [4, this._request.fetch('/auth/v1/revoke', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    token: accessToken
                                })
                            })];
                    case 8:
                        resp = _c.sent();
                        seqIdFromHeader = resp.headers.get('SeqId') || resp.headers.get('RequestId');
                        if (!(resp.status >= 400 && resp.status < 500)) return [3, 10];
                        return [4, resp.json()];
                    case 9:
                        body = _c.sent();
                        seqId = body.request_id || seqIdFromHeader;
                        throw new Error("[OAuth2AuthProvider][status:" + resp.status + "][" + body.error + "(" + body.error_code + ")] " + body.error_description + " (" + seqId + ")");
                    case 10:
                        if (!(resp.status >= 500)) return [3, 12];
                        return [4, resp.json()];
                    case 11:
                        body = _c.sent();
                        seqId = body.request_id || seqIdFromHeader;
                        throw new Error("[OAuth2AuthProvider][status:" + resp.status + "][" + body.error + "(" + body.error_code + ")] " + body.error_description + " (" + seqId + ")");
                    case 12: return [3, 13];
                    case 13: return [3, 14];
                    case 14: return [3, 17];
                    case 15: return [4, this._request.send('auth.logout', { refresh_token: refresh_token })];
                    case 16:
                        _c.sent();
                        _c.label = 17;
                    case 17:
                        this._cache.removeStoreAsync(refreshTokenKey);
                        this._cache.removeStoreAsync(accessTokenKey);
                        this._cache.removeStoreAsync(accessTokenExpireKey);
                        eventBus.fire(EVENTS.LOGIN_STATE_CHANGED);
                        eventBus.fire(EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this._config.env,
                            loginType: constants_1.LOGINTYPE.NULL,
                            persistence: this._config.persistence
                        });
                        return [2, true];
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
        var _fromApp = this._config._fromApp;
        var oauthInstance = _fromApp.oauthInstance;
        var oauthLoginState = oauthInstance === null || oauthInstance === void 0 ? void 0 : oauthInstance.hasLoginStateSync();
        if (oauthLoginState) {
            return oauthLoginState;
        }
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
            var _fromApp, oauthInstance, oauthLoginState, _a, refreshTokenKey, refreshToken, loginState;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _fromApp = this._config._fromApp;
                        oauthInstance = _fromApp.oauthInstance || _fromApp.oauth();
                        _a = oauthInstance;
                        if (!_a) return [3, 2];
                        return [4, oauthInstance.getLoginState()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        oauthLoginState = _a;
                        if (oauthLoginState) {
                            return [2, oauthLoginState];
                        }
                        refreshTokenKey = this._cache.keys.refreshTokenKey;
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 3:
                        refreshToken = _b.sent();
                        if (!refreshToken) return [3, 5];
                        loginState = new LoginState({
                            envId: this._config.env,
                            cache: this._cache,
                            request: this._request
                        });
                        return [4, loginState.checkLocalStateAsync()];
                    case 4:
                        _b.sent();
                        return [2, loginState];
                    case 5: return [2, null];
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
    Auth.prototype.sendPhoneCode = function (phoneNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._request.send('auth.sendPhoneCode', {
                            phoneNumber: transformPhone(phoneNumber)
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2, data.SendStatus === 'Ok'];
                }
            });
        });
    };
    Auth.prototype.signUpWithPhoneCode = function (phoneNumber, phoneCode, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.phoneAuthProvider().signUp(phoneNumber, phoneCode, password)];
            });
        });
    };
    Auth.prototype.signInWithPhoneCodeOrPassword = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.phoneAuthProvider().signIn(param)];
            });
        });
    };
    Auth.prototype.forceResetPwdByPhoneCode = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.phoneAuthProvider().signIn(__assign(__assign({}, param), { signMethod: phoneAuthProvider_1.SIGN_METHOD.FORCERESETPWD }))];
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
    __decorate([
        catchErrorsDecorator({
            title: '发送短信验证码失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用语法或参数是否正确',
                '  2 - 当前环境是否开通了短信验证码登录',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], Auth.prototype, "sendPhoneCode", null);
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
        if (config === void 0) { config = { region: '', persistence: 'local' }; }
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
            runtime: runtime,
            _fromApp: this
        });
        return this.authInstance;
    }
};
try {
    cloudbase.registerComponent(component);
}
catch (e) { }
function registerAuth(app) {
    try {
        app.registerComponent(component);
    }
    catch (e) {
        console.warn(e);
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrREFBbUY7QUFLbkYsbUNBQTBDO0FBRTFDLHlDQUFpRTtBQUVqRSx5Q0FBZ0Q7QUE4a0M5Qyw2RkE5a0NPLG1CQUFZLE9BOGtDUDtBQTVrQ2QscUVBQWdHO0FBRWhHLDJFQUEwRTtBQUMxRSxxRUFBb0U7QUFDcEUsbUVBQWtFO0FBQ2xFLG1FQUE4RTtBQUM5RSx5RUFBd0U7QUFDeEUscUVBQW9FO0FBSTVELElBQUEscUJBQXFCLEdBQUssa0JBQU0sc0JBQVgsQ0FBWTtBQUNqQyxJQUFBLE9BQU8sR0FBSyxvQkFBUSxRQUFiLENBQWM7QUFDckIsSUFBQSxTQUFTLEdBQWlDLGlCQUFLLFVBQXRDLEVBQUUsVUFBVSxHQUFxQixpQkFBSyxXQUExQixFQUFFLGNBQWMsR0FBSyxpQkFBSyxlQUFWLENBQVc7QUFDaEQsSUFBQSxNQUFNLEdBQXlCLHFCQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUsscUJBQVMsbUJBQWQsQ0FBZTtBQUN6QyxJQUFBLG9CQUFvQixHQUFLLG1CQUFPLHFCQUFaLENBQWE7QUFFekMsSUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDO0FBYzlCLElBQU0sUUFBUSxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztBQStpQzNDLDRCQUFRO0FBeGlDVjtJQXlCRSxjQUFZLE9BQXFCO1FBQ3ZCLElBQUEsS0FBSyxHQUFjLE9BQU8sTUFBckIsRUFBRSxPQUFPLEdBQUssT0FBTyxRQUFaLENBQWE7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFFeEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7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LENBQUMsQ0FBQztLQUNsQztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUM7QUFORCxvQ0FNQztBQWVELFNBQWdCLGdCQUFnQixDQUFDLElBQVksRUFBRSxRQUFtQjtJQUNoRSxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzdCLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLE9BQWU7UUFDckMsSUFBTSxXQUFXLEdBQUcsTUFBSSxJQUFNLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxRQUFRLHVCQUMzQixPQUFPLEdBQ1AsSUFBSSxDQUFDLE9BQU8sRUFDZixDQUFDO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUM7QUFDSixDQUFDO0FBWkQsNENBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBldmVudHMsIGFkYXB0ZXJzLCB1dGlscywgY29uc3RhbnRzLCBoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNhY2hlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlUmVxdWVzdCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVxdWVzdCc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQXV0aENvbmZpZywgSUNyZWRlbnRpYWwsIElVc2VyLCBJVXNlckluZm8sIElBdXRoUHJvdmlkZXIsIElMb2dpblN0YXRlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9hdXRoJztcbmltcG9ydCB7IElDbG91ZGJhc2VDb21wb25lbnQgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBjaGVja0Zyb21BdXRoVjIgfSBmcm9tICcuL2NvbW1vbidcblxuaW1wb3J0IHsgTE9HSU5UWVBFLCBPQVVUSDJfTE9HSU5UWVBFX1BSRUZJWCB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvYmFzZSc7XG5cbmltcG9ydCB7IE9BdXRoMkF1dGhQcm92aWRlciwgSU9BdXRoMkF1dGhQcm92aWRlck9wdGlvbnMgfSBmcm9tICcuL3Byb3ZpZGVycy9vYXV0aDJBdXRoUHJvdmlkZXInO1xuXG5pbXBvcnQgeyBBbm9ueW1vdXNBdXRoUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9hbm9ueW1vdXNBdXRoUHJvdmlkZXInO1xuaW1wb3J0IHsgQ3VzdG9tQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvY3VzdG9tQXV0aFByb3ZpZGVyJztcbmltcG9ydCB7IEVtYWlsQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvZW1haWxBdXRoUHJvdmlkZXInO1xuaW1wb3J0IHsgUGhvbmVBdXRoUHJvdmlkZXIsIFNJR05fTUVUSE9EIH0gZnJvbSAnLi9wcm92aWRlcnMvcGhvbmVBdXRoUHJvdmlkZXInXG5pbXBvcnQgeyBVc2VybmFtZUF1dGhQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL3VzZXJuYW1lQXV0aFByb3ZpZGVyJztcbmltcG9ydCB7IFdlaXhpbkF1dGhQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL3dlaXhpbkF1dGhQcm92aWRlcic7XG5cbmRlY2xhcmUgY29uc3QgY2xvdWRiYXNlOiBJQ2xvdWRiYXNlO1xuXG5jb25zdCB7IENsb3VkYmFzZUV2ZW50RW1pdHRlciB9ID0gZXZlbnRzO1xuY29uc3QgeyBSVU5USU1FIH0gPSBhZGFwdGVycztcbmNvbnN0IHsgcHJpbnRXYXJuLCB0aHJvd0Vycm9yLCB0cmFuc2Zvcm1QaG9uZSB9ID0gdXRpbHM7XG5jb25zdCB7IEVSUk9SUywgQ09NTVVOSVRZX1NJVEVfVVJMIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IGNhdGNoRXJyb3JzRGVjb3JhdG9yIH0gPSBoZWxwZXJzO1xuXG5jb25zdCBDT01QT05FTlRfTkFNRSA9ICdhdXRoJztcblxuaW50ZXJmYWNlIFVzZXJJbmZvIHtcbiAgb3BlbmlkOiBzdHJpbmc7XG4gIG5pY2tuYW1lPzogc3RyaW5nO1xuICBzZXg/OiBudW1iZXI7XG4gIHByb3ZpbmNlPzogc3RyaW5nO1xuICBjaXR5Pzogc3RyaW5nO1xuICBjb3VudHJ5Pzogc3RyaW5nO1xuICBoZWFkaW1ndXJsPzogc3RyaW5nO1xuICBwcml2aWxlZ2U/OiBbc3RyaW5nXTtcbiAgdW5pb25pZD86IHN0cmluZztcbn1cblxuY29uc3QgZXZlbnRCdXMgPSBuZXcgQ2xvdWRiYXNlRXZlbnRFbWl0dGVyKCk7XG5cbmludGVyZmFjZSBJVXNlck9wdGlvbnMge1xuICBjYWNoZTogSUNsb3VkYmFzZUNhY2hlO1xuICByZXF1ZXN0OiBJQ2xvdWRiYXNlUmVxdWVzdDtcbn1cblxuY2xhc3MgVXNlciBpbXBsZW1lbnRzIElVc2VyIHtcbiAgcHVibGljIHVpZDogc3RyaW5nO1xuICBwdWJsaWMgbG9naW5UeXBlOiBzdHJpbmc7XG4gIHB1YmxpYyBvcGVuaWQ6IHN0cmluZztcbiAgcHVibGljIHd4T3BlbklkOiBzdHJpbmc7XG4gIHB1YmxpYyB3eFB1YmxpY0lkOiBzdHJpbmc7XG4gIHB1YmxpYyB1bmlvbklkOiBzdHJpbmc7XG4gIHB1YmxpYyBxcU1pbmlPcGVuSWQ6IHN0cmluZztcbiAgcHVibGljIGN1c3RvbVVzZXJJZDogc3RyaW5nO1xuICBwdWJsaWMgbmlja05hbWU6IHN0cmluZztcbiAgcHVibGljIGdlbmRlcjogc3RyaW5nO1xuICBwdWJsaWMgYXZhdGFyVXJsOiBzdHJpbmc7XG4gIHB1YmxpYyBlbWFpbDogc3RyaW5nO1xuICBwdWJsaWMgaGFzUGFzc3dvcmQ6IGJvb2xlYW47XG4gIHB1YmxpYyBwaG9uZT86IHN0cmluZztcbiAgcHVibGljIHVzZXJuYW1lPzogc3RyaW5nO1xuICBwdWJsaWMgbG9jYXRpb24/OiB7XG4gICAgY291bnRyeT86IHN0cmluZztcbiAgICBwcm92aW5jZT86IHN0cmluZztcbiAgICBjaXR5Pzogc3RyaW5nO1xuICB9O1xuXG4gIHByaXZhdGUgX2NhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG4gIHByaXZhdGUgX3JlcXVlc3Q6IElDbG91ZGJhc2VSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElVc2VyT3B0aW9ucykge1xuICAgIGNvbnN0IHsgY2FjaGUsIHJlcXVlc3QgfSA9IG9wdGlvbnM7XG4gICAgdGhpcy5fY2FjaGUgPSBjYWNoZTtcbiAgICB0aGlzLl9yZXF1ZXN0ID0gcmVxdWVzdDtcblxuICAgIHRoaXMuX3NldFVzZXJJbmZvKCk7XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluacrOWcsOeUqOaIt+S/oeaBry3lkIzmraVcbiAgICovXG4gIHB1YmxpYyBhc3luYyBjaGVja0xvY2FsSW5mbygpIHtcbiAgICB0aGlzLnVpZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3VpZCcpO1xuICAgIHRoaXMubG9naW5UeXBlID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnbG9naW5UeXBlJyk7XG4gICAgdGhpcy5vcGVuaWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd3eE9wZW5JZCcpO1xuICAgIHRoaXMud3hPcGVuSWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd3eE9wZW5JZCcpO1xuICAgIHRoaXMud3hQdWJsaWNJZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3d4UHVibGljSWQnKTtcbiAgICB0aGlzLnVuaW9uSWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd3eFVuaW9uSWQnKTtcbiAgICB0aGlzLnFxTWluaU9wZW5JZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3FxTWluaU9wZW5JZCcpO1xuICAgIHRoaXMuY3VzdG9tVXNlcklkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnY3VzdG9tVXNlcklkJyk7XG4gICAgdGhpcy5uaWNrTmFtZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ25pY2tOYW1lJyk7XG4gICAgdGhpcy5nZW5kZXIgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdnZW5kZXInKTtcbiAgICB0aGlzLmF2YXRhclVybCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2F2YXRhclVybCcpO1xuICAgIHRoaXMuZW1haWwgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdlbWFpbCcpO1xuICAgIHRoaXMuaGFzUGFzc3dvcmQgPSBCb29sZWFuKHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2hhc1Bhc3N3b3JkJykpO1xuICAgIHRoaXMucGhvbmUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdwaG9uZScpXG4gICAgdGhpcy51c2VybmFtZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3VzZXJuYW1lJylcbiAgICB0aGlzLmxvY2F0aW9uID0ge1xuICAgICAgY291bnRyeTogdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnY291bnRyeScpLFxuICAgICAgcHJvdmluY2U6IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3Byb3ZpbmNlJyksXG4gICAgICBjaXR5OiB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdjaXR5JylcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnlKjmiLfkv6Hmga8t5byC5q2lXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hlY2tMb2NhbEluZm9Bc3luYygpIHtcbiAgICB0aGlzLnVpZCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygndWlkJyk7XG4gICAgdGhpcy5sb2dpblR5cGUgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2xvZ2luVHlwZScpO1xuICAgIHRoaXMub3BlbmlkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd3eE9wZW5JZCcpO1xuICAgIHRoaXMud3hPcGVuSWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3d4T3BlbklkJyk7XG4gICAgdGhpcy53eFB1YmxpY0lkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd3eFB1YmxpY0lkJyk7XG4gICAgdGhpcy51bmlvbklkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd3eFVuaW9uSWQnKTtcbiAgICB0aGlzLnFxTWluaU9wZW5JZCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygncXFNaW5pT3BlbklkJyk7XG4gICAgdGhpcy5jdXN0b21Vc2VySWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2N1c3RvbVVzZXJJZCcpO1xuICAgIHRoaXMubmlja05hbWUgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ25pY2tOYW1lJyk7XG4gICAgdGhpcy5nZW5kZXIgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2dlbmRlcicpO1xuICAgIHRoaXMuYXZhdGFyVXJsID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdhdmF0YXJVcmwnKTtcbiAgICB0aGlzLmVtYWlsID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdlbWFpbCcpO1xuICAgIHRoaXMuaGFzUGFzc3dvcmQgPSBCb29sZWFuKGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnaGFzUGFzc3dvcmQnKSk7XG4gICAgdGhpcy5waG9uZSA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygncGhvbmUnKVxuICAgIHRoaXMudXNlcm5hbWUgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3VzZXJuYW1lJylcbiAgICB0aGlzLmxvY2F0aW9uID0ge1xuICAgICAgY291bnRyeTogYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdjb3VudHJ5JyksXG4gICAgICBwcm92aW5jZTogYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdwcm92aW5jZScpLFxuICAgICAgY2l0eTogYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdjaXR5JylcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIOWwhuW9k+WJjei0puaIt+S4juiHquWumuS5ieeZu+W9lSBUaWNrZXQg6L+b6KGM57uR5a6a77yM57uR5a6a5LmL5ZCO5L6/5Y+v5Lul6YCa6L+H6Ieq5a6a5LmJ55m75b2V55m75b2V5b2T5YmN5LqR5byA5Y+R6LSm5oi344CCXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aWNrZXQg6Ieq5a6a5LmJ55m75b2VdGlja2V0XG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn57uR5a6a6Ieq5a6a5LmJ55m75b2V5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIubGlua1dpdGhUaWNrZXQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOatpOi0puaIt+aYr+WQpuW3sue7j+e7keWumuiHquWumuS5ieeZu+W9lScsXG4gICAgICAnICAzIC0gdGlja2V0IOWPguaVsOaYr+WQpuW9kuWxnuW9k+WJjeeOr+WigycsXG4gICAgICAnICA0IC0g5Yib5bu6IHRpY2tldCDnmoToh6rlrprkuYnnmbvlvZXnp4HpkqXmmK/lkKbov4fmnJ8nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBsaW5rV2l0aFRpY2tldCh0aWNrZXQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0eXBlb2YgdGlja2V0ICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aWNrZXQgbXVzdCBiZSBzdHJpbmcnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5saW5rV2l0aFRpY2tldCcsIHsgdGlja2V0IH0pO1xuICB9XG4gIC8qKlxuICAgKiDlsIblvZPliY3otKbmiLfkuI7nrKzkuInmlrnpibTmnYPmj5DkvpvmlrnvvIzku6Xph43lrprlkJHnmoTlvaLlvI/vvIzov5vooYznu5HlrprvvIznu5HlrprkuYvlkI7kvr/lj6/ku6XpgJrov4fnrKzkuInmlrnpibTmnYPmj5DkvpvmlrnnmbvlvZXlvZPliY3nmoTkupHlvIDlj5HotKbmiLfjgIJcbiAgICogQHBhcmFtIHByb3ZpZGVyIOeJueWumueZu+W9leaWueW8j+eahHByb3ZpZGVy77yM5b+F6aG75YW35aSHc2lnbkluV2l0aFJlZGlyZWN05pa55rOVXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn57uR5a6a56ys5LiJ5pa555m75b2V5pa55byP5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIubGlua1dpdGhSZWRpcmVjdCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5q2k6LSm5oi35piv5ZCm5bey57uP57uR5a6a5q2k56ys5LiJ5pa5JyxcbiAgICAgICcgIDMgLSDmraTnrKzkuInmlrnmmK/lkKblt7Lnu4/mjojmnYMnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBsaW5rV2l0aFJlZGlyZWN0KHByb3ZpZGVyOiBJQXV0aFByb3ZpZGVyKTogdm9pZCB7XG4gICAgcHJvdmlkZXIuc2lnbkluV2l0aFJlZGlyZWN0KCk7XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluW9k+WJjei0puaIt+eahOW+ruS/oSBVbmlvbklEIOe7keWumueahOS6keW8gOWPkei0puaIt+WIl+ihqOOAguWmguaenOW9k+WJjei0puaIt+S4jeWtmOWcqCBVbmlvbklE77yM5Lya6L+U5Zue6ZSZ6K+v44CCXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W6LSm5oi35YiX6KGo5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIuZ2V0TGlua2VkVWlkTGlzdCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGdldExpbmtlZFVpZExpc3QoKSB7XG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGguZ2V0TGlua2VkVWlkTGlzdCcsIHt9KTtcbiAgICBsZXQgaGFzUHJpbWFyeVVpZCA9IGZhbHNlO1xuICAgIGNvbnN0IHVzZXJzID0gZGF0YS51c2VycyBhcyBJVXNlckluZm9bXTtcbiAgICBmb3IgKGNvbnN0IHVzZXIgb2YgdXNlcnMpIHtcbiAgICAgIGlmICh1c2VyLnd4T3BlbklkICYmIHVzZXIud3hQdWJsaWNJZCkge1xuICAgICAgICBoYXNQcmltYXJ5VWlkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB1c2VycyxcbiAgICAgIGhhc1ByaW1hcnlVaWRcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiDorr7nva7lvq7kv6HkuLvotKblj7fvvIzpgJrluLjmkK3phY3lkowgVXNlci5nZXRMaW5rZWRVaWRMaXN0KCkg5L2/55So77yM55So5LqO5Zyo5ZCM5Liq5b6u5L+hIFVuaW9uSUQg5a+55bqU55qE5aSa5Liq5LqR5byA5Y+R6LSm5Y+35Lit77yM6K6+572u5YW25Lit5LiA5Liq5Li65Li76LSm5Y+3XG4gICAqIOiuvue9ruS5i+WQju+8jOmAmui/hyBVbmlvbklEIOeZu+W9leS+v+S8mueZu+W9leiHs+S4u+i0puWPt+S5i+S4iuOAglxuICAgKiBAcGFyYW0gdWlkXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6K6+572u5b6u5L+h5Li76LSm5Y+35aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIuc2V0UHJpbWFyeVVpZCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIHNldFByaW1hcnlVaWQodWlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnNldFByaW1hcnlVaWQnLCB7IHVpZCB9KTtcbiAgfVxuICAvKipcbiAgICog6Kej57uR5p+Q5Liq55m75b2V5pa55byPXG4gICAqIEBwYXJhbSBsb2dpblR5cGVcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmjqXop6bnu5HlrprlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci51bmxpbmsoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjei0puaIt+aYr+WQpuW3sue7j+S4juatpOeZu+W9leaWueW8j+ino+e7kScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIHVubGluayhsb2dpblR5cGU6ICdDVVNUT00nIHwgJ1dFQ0hBVC1PUEVOJyB8ICdXRUNIQVQtUFVCTElDJyB8ICdXRUNIQVQtVU5JT04nIHwgJ1BIT05FJykge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGgudW5saW5rJywgeyBwbGF0Zm9ybTogbG9naW5UeXBlIH0pO1xuICB9XG4gIC8qKlxuICAgKiDmm7TmlrDnlKjmiLfkv6Hmga9cbiAgICogQHBhcmFtIHVzZXJJbmZvXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw55So5oi35L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDnlKjmiLfkv6Hmga/kuK3mmK/lkKbljIXlkKvpnZ7ms5XlgLwnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUodXNlckluZm86IElVc2VySW5mbyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgbmlja05hbWUsIGdlbmRlciwgYXZhdGFyVXJsLCBwcm92aW5jZSwgY291bnRyeSwgY2l0eSB9ID0gdXNlckluZm87XG4gICAgY29uc3QgeyBkYXRhOiBuZXdVc2VySW5mbyB9ID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnVwZGF0ZVVzZXJJbmZvJywgeyBuaWNrTmFtZSwgZ2VuZGVyLCBhdmF0YXJVcmwsIHByb3ZpbmNlLCBjb3VudHJ5LCBjaXR5IH0pO1xuICAgIHRoaXMuX3NldExvY2FsVXNlckluZm8obmV3VXNlckluZm8pO1xuICB9XG4gIC8qKlxuICAgKiDmm7TmlrDlr4bnoIFcbiAgICogQHBhcmFtIG5ld1Bhc3N3b3JkXG4gICAqIEBwYXJhbSBvbGRQYXNzd29yZFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+abtOaWsOWvhueggeWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnVwZGF0ZVBhc3N3b3JkKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDMgLSDmlrDlr4bnoIHkuK3mmK/lkKbljIXlkKvpnZ7ms5XlrZfnrKYnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyB1cGRhdGVQYXNzd29yZChuZXdQYXNzd29yZDogc3RyaW5nLCBvbGRQYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC51cGRhdGVQYXNzd29yZCcsIHtcbiAgICAgIG9sZFBhc3N3b3JkLFxuICAgICAgbmV3UGFzc3dvcmRcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog5pu05paw6YKu566x5Zyw5Z2AXG4gICAqIEBwYXJhbSBuZXdFbWFpbFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+abtOaWsOmCrueuseWcsOWdgOWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnVwZGF0ZUVtYWlsKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobpgq7nrrHlr4bnoIHnmbvlvZUnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyB1cGRhdGVFbWFpbChuZXdFbWFpbDogc3RyaW5nLCBwYXNzd29yZD86IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGgudXBkYXRlRW1haWwnLCB7XG4gICAgICBuZXdFbWFpbCxcbiAgICAgIHBhc3N3b3JkXG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOabtOaWsOeUqOaIt+WQjVxuICAgKiBAcGFyYW0gdXNlcm5hbWVcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmm7TmlrDnlKjmiLflkI3lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci51cGRhdGVVc2VybmFtZSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG55So5oi35ZCN5a+G56CB55m75b2VJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgdXBkYXRlVXNlcm5hbWUodXNlcm5hbWU6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgdXNlcm5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ3VzZXJuYW1lIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnVwZGF0ZVVzZXJuYW1lJywge1xuICAgICAgdXNlcm5hbWVcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog5Yi35paw5pys5Zyw55So5oi35L+h5oGv44CC5b2T55So5oi35Zyo5YW25LuW5a6i5oi356uv5pu05paw55So5oi35L+h5oGv5LmL5ZCO77yM5Y+v5Lul6LCD55So5q2k5o6l5Y+j5ZCM5q2l5pu05paw5LmL5ZCO55qE5L+h5oGv44CCXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5Yi35paw5pys5Zyw55So5oi35L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIucmVmcmVzaCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHJlZnJlc2goKTogUHJvbWlzZTxJVXNlckluZm8+IHtcbiAgICBjb25zdCBhY3Rpb24gPSAnYXV0aC5nZXRVc2VySW5mbyc7XG4gICAgY29uc3QgeyBkYXRhOiB1c2VySW5mbyB9ID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKGFjdGlvbiwge30pO1xuICAgIHRoaXMuX3NldExvY2FsVXNlckluZm8odXNlckluZm8pO1xuICAgIHJldHVybiB1c2VySW5mbztcbiAgfVxuXG4gIC8qKlxuICog57uR5a6a5omL5py65Y+3XG4gKiBAcGFyYW0gcGhvbmVOdW1iZXJcbiAqIEBwYXJhbSBwaG9uZUNvZGVcbiAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn57uR5a6a5omL5py65Y+35aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5saW5rV2l0aFBob25lTnVtYmVyKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobnn63kv6Hpqozor4HnoIHnmbvlvZUnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBsaW5rV2l0aFBob25lTnVtYmVyKHBob25lTnVtYmVyOiBzdHJpbmcsIHBob25lQ29kZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5saW5rT3JVcGRhdGVQaG9uZU51bWJlcicsIHtcbiAgICAgIHBob25lTnVtYmVyOiB0cmFuc2Zvcm1QaG9uZShwaG9uZU51bWJlciksXG4gICAgICBwaG9uZUNvZGVcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog5pu05paw5omL5py65Y+3XG4gICAqIEBwYXJhbSBwaG9uZU51bWJlclxuICAgKiBAcGFyYW0gcGhvbmVDb2RlXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw5omL5py65Y+35aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55So6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobnn63kv6Hpqozor4HnoIHnmbvlvZUnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyB1cGRhdGVQaG9uZU51bWJlcihwaG9uZU51bWJlcjogc3RyaW5nLCBwaG9uZUNvZGU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGgubGlua09yVXBkYXRlUGhvbmVOdW1iZXInLCB7XG4gICAgICBwaG9uZU51bWJlcjogdHJhbnNmb3JtUGhvbmUocGhvbmVOdW1iZXIpLFxuICAgICAgcGhvbmVDb2RlXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRMb2NhbFVzZXJJbmZvKGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodXNlckluZm9LZXkpO1xuICAgIHJldHVybiB1c2VySW5mb1trZXldO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfZ2V0TG9jYWxVc2VySW5mb0FzeW5jKGtleTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyh1c2VySW5mb0tleSk7XG4gICAgcmV0dXJuIHVzZXJJbmZvW2tleV07XG4gIH1cblxuICBwcml2YXRlIF9zZXRVc2VySW5mbygpIHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodXNlckluZm9LZXkpO1xuICAgIFtcbiAgICAgICd1aWQnLFxuICAgICAgJ2xvZ2luVHlwZScsXG4gICAgICAnb3BlbmlkJyxcbiAgICAgICd3eE9wZW5JZCcsXG4gICAgICAnd3hQdWJsaWNJZCcsXG4gICAgICAndW5pb25JZCcsXG4gICAgICAncXFNaW5pT3BlbklkJyxcbiAgICAgICdlbWFpbCcsXG4gICAgICAnaGFzUGFzc3dvcmQnLFxuICAgICAgJ2N1c3RvbVVzZXJJZCcsXG4gICAgICAnbmlja05hbWUnLFxuICAgICAgJ2dlbmRlcicsXG4gICAgICAnYXZhdGFyVXJsJyxcbiAgICAgICdwaG9uZScsXG4gICAgICAndXNlcm5hbWUnXG4gICAgXS5mb3JFYWNoKGluZm9LZXkgPT4ge1xuICAgICAgdGhpc1tpbmZvS2V5XSA9IHVzZXJJbmZvW2luZm9LZXldO1xuICAgIH0pO1xuXG4gICAgdGhpcy5sb2NhdGlvbiA9IHtcbiAgICAgIGNvdW50cnk6IHVzZXJJbmZvWydjb3VudHJ5J10sXG4gICAgICBwcm92aW5jZTogdXNlckluZm9bJ3Byb3ZpbmNlJ10sXG4gICAgICBjaXR5OiB1c2VySW5mb1snY2l0eSddXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldExvY2FsVXNlckluZm8odXNlckluZm86IGFueSkge1xuICAgIGNvbnN0IHsgdXNlckluZm9LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgdGhpcy5fY2FjaGUuc2V0U3RvcmUodXNlckluZm9LZXksIHVzZXJJbmZvKTtcbiAgICB0aGlzLl9zZXRVc2VySW5mbygpO1xuICB9XG59XG5pbnRlcmZhY2UgSUxvZ2luU3RhdGVPcHRpb25zIGV4dGVuZHMgSVVzZXJPcHRpb25zIHtcbiAgZW52SWQ6IHN0cmluZztcbn1cbmV4cG9ydCBjbGFzcyBMb2dpblN0YXRlIGltcGxlbWVudHMgSUxvZ2luU3RhdGUge1xuICBwdWJsaWMgY3JlZGVudGlhbDogSUNyZWRlbnRpYWw7XG4gIHB1YmxpYyB1c2VyOiBJVXNlcjtcblxuICBwcml2YXRlIF9jYWNoZTogSUNsb3VkYmFzZUNhY2hlO1xuICBwcml2YXRlIF9sb2dpblR5cGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJTG9naW5TdGF0ZU9wdGlvbnMpIHtcbiAgICBjb25zdCB7IGVudklkLCBjYWNoZSwgcmVxdWVzdCB9ID0gb3B0aW9ucztcbiAgICBpZiAoIWVudklkKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ2VudklkIGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuICAgIHRoaXMuX2NhY2hlID0gY2FjaGU7XG5cbiAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcih7XG4gICAgICBjYWNoZSxcbiAgICAgIHJlcXVlc3RcbiAgICB9KTtcbiAgfVxuXG5cbiAgcHVibGljIGFzeW5jIGNoZWNrTG9jYWxTdGF0ZSgpIHtcbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSwgYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuRXhwaXJlS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKHJlZnJlc2hUb2tlbktleSk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZShhY2Nlc3NUb2tlbktleSk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW5FeHBpcmUgPSB0aGlzLl9jYWNoZS5nZXRTdG9yZShhY2Nlc3NUb2tlbkV4cGlyZUtleSk7XG5cbiAgICB0aGlzLmNyZWRlbnRpYWwgPSB7XG4gICAgICByZWZyZXNoVG9rZW4sXG4gICAgICBhY2Nlc3NUb2tlbixcbiAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlXG4gICAgfTtcblxuICAgIHRoaXMuX2xvZ2luVHlwZSA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKHRoaXMuX2NhY2hlLmtleXMubG9naW5UeXBlS2V5KTtcblxuICAgIHRoaXMudXNlci5jaGVja0xvY2FsSW5mbygpO1xuICB9XG4gIHB1YmxpYyBhc3luYyBjaGVja0xvY2FsU3RhdGVBc3luYygpIHtcbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSwgYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuRXhwaXJlS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuRXhwaXJlID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSk7XG5cbiAgICB0aGlzLmNyZWRlbnRpYWwgPSB7XG4gICAgICByZWZyZXNoVG9rZW4sXG4gICAgICBhY2Nlc3NUb2tlbixcbiAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlXG4gICAgfTtcblxuICAgIHRoaXMuX2xvZ2luVHlwZSA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmModGhpcy5fY2FjaGUua2V5cy5sb2dpblR5cGVLZXkpO1xuXG5cbiAgICBhd2FpdCB0aGlzLnVzZXIuY2hlY2tMb2NhbEluZm9Bc3luYygpO1xuICB9XG5cbiAgZ2V0IGlzQW5vbnltb3VzQXV0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2dpblR5cGUgPT09IExPR0lOVFlQRS5BTk9OWU1PVVM7XG4gIH1cblxuICBnZXQgaXNDdXN0b21BdXRoKCkge1xuICAgIHJldHVybiB0aGlzLmxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLkNVU1RPTTtcbiAgfVxuXG4gIGdldCBpc1dlaXhpbkF1dGgoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9naW5UeXBlID09PSBMT0dJTlRZUEUuV0VDSEFUIHx8IHRoaXMubG9naW5UeXBlID09PSBMT0dJTlRZUEUuV0VDSEFUX09QRU4gfHwgdGhpcy5sb2dpblR5cGUgPT09IExPR0lOVFlQRS5XRUNIQVRfUFVCTElDO1xuICB9XG5cbiAgZ2V0IGlzVXNlcm5hbWVBdXRoKCkge1xuICAgIHJldHVybiB0aGlzLmxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLlVTRVJOQU1FO1xuICB9XG5cbiAgZ2V0IGxvZ2luVHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbG9naW5UeXBlXG4gIH1cblxuICBnZXQgaXNQaG9uZUF1dGgoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9naW5UeXBlID09PSBMT0dJTlRZUEUuUEhPTkVcbiAgfVxufVxuXG5jbGFzcyBBdXRoIHtcbiAgcHJpdmF0ZSByZWFkb25seSBfY29uZmlnOiBJQ2xvdWRiYXNlQXV0aENvbmZpZztcbiAgcHJpdmF0ZSByZWFkb25seSBfY2FjaGU6IElDbG91ZGJhc2VDYWNoZVxuICBwcml2YXRlIHJlYWRvbmx5IF9yZXF1ZXN0OiBJQ2xvdWRiYXNlUmVxdWVzdDtcbiAgcHJpdmF0ZSByZWFkb25seSBfcnVudGltZTogc3RyaW5nO1xuICBwcml2YXRlIF9hbm9ueW1vdXNBdXRoUHJvdmlkZXI6IEFub255bW91c0F1dGhQcm92aWRlcjtcbiAgcHJpdmF0ZSBfY3VzdG9tQXV0aFByb3ZpZGVyOiBDdXN0b21BdXRoUHJvdmlkZXI7XG4gIHByaXZhdGUgX3dlaXhpbkF1dGhQcm92aWRlcjogV2VpeGluQXV0aFByb3ZpZGVyO1xuICBwcml2YXRlIF9lbWFpbEF1dGhQcm92aWRlcjogRW1haWxBdXRoUHJvdmlkZXI7XG4gIHByaXZhdGUgX3VzZXJuYW1lQXV0aFByb3ZpZGVyOiBVc2VybmFtZUF1dGhQcm92aWRlcjtcbiAgcHJpdmF0ZSBfcGhvbmVBdXRoUHJvdmlkZXI6IFBob25lQXV0aFByb3ZpZGVyO1xuICAvLyBwcml2YXRlIF9mcm9tQXBwOiBJQ2xvdWRiYXNlXG5cbiAgcHJpdmF0ZSBfb0F1dGgyQXV0aFByb3ZpZGVyOiBPQXV0aDJBdXRoUHJvdmlkZXI7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJQ2xvdWRiYXNlQXV0aENvbmZpZyAmIHsgY2FjaGU6IElDbG91ZGJhc2VDYWNoZSwgcmVxdWVzdDogSUNsb3VkYmFzZVJlcXVlc3QsIHJ1bnRpbWU/OiBzdHJpbmcgfSkge1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLl9jYWNoZSA9IGNvbmZpZy5jYWNoZTtcbiAgICB0aGlzLl9yZXF1ZXN0ID0gY29uZmlnLnJlcXVlc3Q7XG4gICAgdGhpcy5fcnVudGltZSA9IGNvbmZpZy5ydW50aW1lIHx8IFJVTlRJTUUuV0VCXG4gICAgLy8gdGhpcy5fZnJvbUFwcCA9IGNvbmZpZy5fZnJvbUFwcFxuXG4gICAgZXZlbnRCdXMub24oRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCwgdGhpcy5fb25Mb2dpblR5cGVDaGFuZ2VkLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluW9k+WJjeeZu+W9leeahOeUqOaIt+S/oeaBry3lkIzmraVcbiAgICovXG4gIGdldCBjdXJyZW50VXNlcigpIHtcbiAgICBpZiAodGhpcy5fY2FjaGUubW9kZSA9PT0gJ2FzeW5jJykge1xuICAgICAgLy8gYXN5bmMgc3RvcmFnZeeahOW5s+WPsOiwg+eUqOatpEFQSeaPkOekulxuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwgJ2N1cnJlbnQgcGxhdGZvcm1cXCdzIHN0b3JhZ2UgaXMgYXN5bmNocm9ub3VzLCBwbGVhc2UgdXNlIGdldEN1cnJlblVzZXIgaW5zdGVlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGxvZ2luU3RhdGUgPSB0aGlzLmhhc0xvZ2luU3RhdGUoKTtcblxuICAgIGlmIChsb2dpblN0YXRlKSB7XG4gICAgICByZXR1cm4gbG9naW5TdGF0ZS51c2VyIHx8IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICog6I635Y+W5b2T5YmN55m75b2V57G75Z6LLeWQjOatpVxuICovXG4gIGdldCBsb2dpblR5cGUoKTogTE9HSU5UWVBFIHtcbiAgICByZXR1cm4gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodGhpcy5fY2FjaGUua2V5cy5sb2dpblR5cGVLZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluW9k+WJjeeZu+W9leeahOeUqOaIt+S/oeaBry3lvILmraVcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5bnlKjmiLfkv6Hmga/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmdldEN1cnJlblVzZXIoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRDdXJyZW5Vc2VyKCkge1xuICAgIGNvbnN0IHsgX2Zyb21BcHAgfSA9IHRoaXMuX2NvbmZpZ1xuICAgIGNvbnN0IGF1dGhPYmogPSBhd2FpdCBjaGVja0Zyb21BdXRoVjIoX2Zyb21BcHApXG4gICAgY29uc3QgeyBhdXRoVHlwZSwgaW5zdGFuY2UgfSA9IGF1dGhPYmpcbiAgICBpZiAoYXV0aFR5cGUgPT09ICdvYXV0aCcpIHtcbiAgICAgIHJldHVybiBhd2FpdCBpbnN0YW5jZS5nZXRVc2VySW5mbygpXG4gICAgfVxuXG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IGF3YWl0IHRoaXMuZ2V0TG9naW5TdGF0ZSgpO1xuICAgIGlmIChsb2dpblN0YXRlKSB7XG4gICAgICBhd2FpdCBsb2dpblN0YXRlLnVzZXIuY2hlY2tMb2NhbEluZm9Bc3luYygpO1xuICAgICAgcmV0dXJuIGxvZ2luU3RhdGUudXNlciB8fCBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluW9k+WJjeeZu+W9leexu+Weiy3lvILmraVcbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRMb2dpblR5cGUoKTogUHJvbWlzZTxMT0dJTlRZUEU+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyh0aGlzLl9jYWNoZS5rZXlzLmxvZ2luVHlwZUtleSkgYXMgTE9HSU5UWVBFO1xuICB9XG4gIHB1YmxpYyBhc3luYyBnZXRBY2Nlc3NUb2tlbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWNjZXNzVG9rZW46IChhd2FpdCB0aGlzLl9yZXF1ZXN0LmdldEFjY2Vzc1Rva2VuKCkpLmFjY2Vzc1Rva2VuLFxuICAgICAgZW52OiB0aGlzLl9jb25maWcuZW52XG4gICAgfTtcbiAgfVxuICBwdWJsaWMgd2VpeGluQXV0aFByb3ZpZGVyKHsgYXBwaWQsIHNjb3BlLCBzdGF0ZSB9KTogV2VpeGluQXV0aFByb3ZpZGVyIHtcbiAgICBpZiAoIXRoaXMuX3dlaXhpbkF1dGhQcm92aWRlcikge1xuICAgICAgdGhpcy5fd2VpeGluQXV0aFByb3ZpZGVyID0gbmV3IFdlaXhpbkF1dGhQcm92aWRlcih7XG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0LFxuICAgICAgICBydW50aW1lOiB0aGlzLl9ydW50aW1lXG4gICAgICB9LCBhcHBpZCwgc2NvcGUsIHN0YXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3dlaXhpbkF1dGhQcm92aWRlcjtcbiAgfVxuICBwdWJsaWMgYW5vbnltb3VzQXV0aFByb3ZpZGVyKCk6IEFub255bW91c0F1dGhQcm92aWRlciB7XG4gICAgaWYgKCF0aGlzLl9hbm9ueW1vdXNBdXRoUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuX2Fub255bW91c0F1dGhQcm92aWRlciA9IG5ldyBBbm9ueW1vdXNBdXRoUHJvdmlkZXIoe1xuICAgICAgICAuLi50aGlzLl9jb25maWcsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdCxcbiAgICAgICAgLy8gX2Zyb21BcHA6IHRoaXMuX2Zyb21BcHBcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYW5vbnltb3VzQXV0aFByb3ZpZGVyO1xuICB9XG4gIHB1YmxpYyBjdXN0b21BdXRoUHJvdmlkZXIoKTogQ3VzdG9tQXV0aFByb3ZpZGVyIHtcbiAgICBpZiAoIXRoaXMuX2N1c3RvbUF1dGhQcm92aWRlcikge1xuICAgICAgdGhpcy5fY3VzdG9tQXV0aFByb3ZpZGVyID0gbmV3IEN1c3RvbUF1dGhQcm92aWRlcih7XG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2N1c3RvbUF1dGhQcm92aWRlcjtcbiAgfVxuICBwdWJsaWMgZW1haWxBdXRoUHJvdmlkZXIoKTogRW1haWxBdXRoUHJvdmlkZXIge1xuICAgIGlmICghdGhpcy5fZW1haWxBdXRoUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuX2VtYWlsQXV0aFByb3ZpZGVyID0gbmV3IEVtYWlsQXV0aFByb3ZpZGVyKHtcbiAgICAgICAgLi4udGhpcy5fY29uZmlnLFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZW1haWxBdXRoUHJvdmlkZXI7XG4gIH1cbiAgcHVibGljIHVzZXJuYW1lQXV0aFByb3ZpZGVyKCk6IFVzZXJuYW1lQXV0aFByb3ZpZGVyIHtcbiAgICBpZiAoIXRoaXMuX3VzZXJuYW1lQXV0aFByb3ZpZGVyKSB7XG4gICAgICB0aGlzLl91c2VybmFtZUF1dGhQcm92aWRlciA9IG5ldyBVc2VybmFtZUF1dGhQcm92aWRlcih7XG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3VzZXJuYW1lQXV0aFByb3ZpZGVyO1xuICB9XG5cbiAgcHVibGljIHBob25lQXV0aFByb3ZpZGVyKCk6IFBob25lQXV0aFByb3ZpZGVyIHtcbiAgICBpZiAoIXRoaXMuX3Bob25lQXV0aFByb3ZpZGVyKSB7XG4gICAgICB0aGlzLl9waG9uZUF1dGhQcm92aWRlciA9IG5ldyBQaG9uZUF1dGhQcm92aWRlcih7XG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3Bob25lQXV0aFByb3ZpZGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIG9BdXRoMkF1dGhQcm92aWRlclxuICAgKiBvcHRpb25zXG4gICAqIHtcbiAgICogICBwcm92aWRlcklkOiAnZ29vZ2xlJyxcbiAgICogICBzY29wZTogJ29wZW5pZCtlbWFpbCtwcm9maWxlJyxcbiAgICogICByZWRpcmVjdFVyaTogJ2h0dHBzOi8vJ1xuICAgKiB9XG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgb3B0aW9uc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gIG9wdGlvbnMucHJvdmlkZXJJZCAgICAgICAgICAgIC0g5L6b5bqU5ZWGSWTvvIzlpoIgV2VDaGF044CBR29vZ2xl44CBR2l0aHViIOetiVxuICAgKiBAcGFyYW0ge3N0cmluZ30gIG9wdGlvbnMuY2xpZW50SWQgICAgICAgICAgICAgIC0g5a6i5oi356uvSWTvvIzlubPlj7Dmj5DkvpvnmoTlrqLmiLfnq6/moIfor4ZJZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gIFtvcHRpb25zLnJlc3BvbnNlVHlwZT10b2tlbl0gIC0g5ZON5bqU57G75Z6L77yadG9rZW7jgIFjb2RlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgb3B0aW9ucy5zY29wZSAgICAgICAgICAgICAgICAgLSDmnYPpmZDojIPlm7RcbiAgICogQHBhcmFtIHtzdHJpbmd9ICBvcHRpb25zLnJlZGlyZWN0VXJpICAgICAgICAgICAtIOaOiOadg+aIkOWKn+Wbnuiwg+WcsOWdgFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuc3luY1Byb2ZpbGUgICAgICAgICAgIC0g5piv5ZCm5ZCM5q2l55So5oi3IFByb2ZpbGUg5L+h5oGvXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5mb3JjZURpc2FibGVTaWduVXAgICAgLSDmmK/lkKblvLrliLblhbPpl63nlKjmiLfms6jlhoxcbiAgICogQHJldHVybnNcbiAgICovXG4gIHB1YmxpYyBvQXV0aDJBdXRoUHJvdmlkZXIob3B0aW9uczogSU9BdXRoMkF1dGhQcm92aWRlck9wdGlvbnMgPSB7fSk6IE9BdXRoMkF1dGhQcm92aWRlciB7XG4gICAgaWYgKCF0aGlzLl9vQXV0aDJBdXRoUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuX29BdXRoMkF1dGhQcm92aWRlciA9IG5ldyBPQXV0aDJBdXRoUHJvdmlkZXIoe1xuICAgICAgICAuLi50aGlzLl9jb25maWcsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdCxcbiAgICAgICAgcnVudGltZTogdGhpcy5fcnVudGltZVxuICAgICAgfSwgb3B0aW9ucylcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX29BdXRoMkF1dGhQcm92aWRlclxuICB9XG5cbiAgLyoqXG4gICAqIHNpZ25XaXRoT0F1dGgyUG9wdXAgLSBPQXV0aDLlvLnnqpfnmbvlvZVcbiAgICovXG4gIHB1YmxpYyBzaWduV2l0aE9BdXRoMlBvcHVwKCkge1xuICAgIHRoaXMuX29BdXRoMkF1dGhQcm92aWRlci5zaWduSW5XaXRoUG9wdXAoKVxuICB9XG5cbiAgcHVibGljIHNpZ25JbldpdGhPQXV0aDJNb2RhbChlbGVtSWQ6IHN0cmluZykge1xuICAgIHRoaXMuX29BdXRoMkF1dGhQcm92aWRlci5zaWduSW5XaXRoTW9kYWwoZWxlbUlkKVxuICB9XG5cbiAgLyoqXG4gICAqIOeUqOaIt+WQjeWvhueggeeZu+W9lVxuICAgKiBAcGFyYW0gdXNlcm5hbWVcbiAgICogQHBhcmFtIHBhc3N3b3JkXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aFVzZXJuYW1lQW5kUGFzc3dvcmQodXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnVzZXJuYW1lQXV0aFByb3ZpZGVyKCkuc2lnbkluKHVzZXJuYW1lLCBwYXNzd29yZCk7XG4gIH1cbiAgLyoqXG4gICAqIOajgOa1i+eUqOaIt+WQjeaYr+WQpuW3sue7j+WNoOeUqFxuICAgKiBAcGFyYW0gdXNlcm5hbWVcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5bnlKjmiLfmmK/lkKbooqvljaDnlKjlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmlzVXNlcm5hbWVSZWdpc3RlcmVkKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgaXNVc2VybmFtZVJlZ2lzdGVyZWQodXNlcm5hbWU6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICh0eXBlb2YgdXNlcm5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ3VzZXJuYW1lIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5pc1VzZXJuYW1lUmVnaXN0ZXJlZCcsIHtcbiAgICAgIHVzZXJuYW1lXG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE/LmlzUmVnaXN0ZXJlZDtcbiAgfVxuICAvKipcbiAgICog6YKu566x5a+G56CB55m75b2VXG4gICAqIEBwYXJhbSBlbWFpbFxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1haWxBdXRoUHJvdmlkZXIoKS5zaWduSW4oZW1haWwsIHBhc3N3b3JkKTtcbiAgfVxuICAvKipcbiAgICog6YKu566x5a+G56CB5rOo5YaMXG4gICAqIEBwYXJhbSBlbWFpbFxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduVXBXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1haWxBdXRoUHJvdmlkZXIoKS5zaWduVXAoZW1haWwsIHBhc3N3b3JkKTtcbiAgfVxuICAvKipcbiAgICog6YeN572u6YKu566x5a+G56CBXG4gICAqIEBwYXJhbSBlbWFpbFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlbmRQYXNzd29yZFJlc2V0RW1haWwoZW1haWw6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmVtYWlsQXV0aFByb3ZpZGVyKCkucmVzZXRQYXNzd29yZChlbWFpbCk7XG4gIH1cbiAgLyoqXG4gICAqIOeZu+WHulxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+eUqOaIt+eZu+WHuuWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuc2lnbk91dCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN55So5oi35piv5ZCm5Li65Yy/5ZCN55m75b2V77yI5Yy/5ZCN55m75b2V5LiN5pSv5oyBc2lnbk91dO+8iScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHNpZ25PdXQoKSB7XG4gICAgLy8g5YW85a65IG9hdXRoXG4gICAgY29uc3QgeyBfZnJvbUFwcCB9ID0gdGhpcy5fY29uZmlnXG4gICAgY29uc3QgYXV0aE9iaiA9IGF3YWl0IGNoZWNrRnJvbUF1dGhWMihfZnJvbUFwcClcbiAgICBjb25zdCB7IGF1dGhUeXBlLCBpbnN0YW5jZSB9ID0gYXV0aE9ialxuICAgIGlmIChhdXRoVHlwZSA9PT0gJ29hdXRoJykge1xuICAgICAgcmV0dXJuIGF3YWl0IGluc3RhbmNlLnNpZ25PdXQoKVxuICAgIH1cblxuICAgIGNvbnN0IGxvZ2luVHlwZSA9IGF3YWl0IHRoaXMuZ2V0TG9naW5UeXBlKClcbiAgICAvLyBpZiAobG9naW5UeXBlID09PSBMT0dJTlRZUEUuQU5PTllNT1VTKSB7XG4gICAgLy8gICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgIC8vICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sXG4gICAgLy8gICAgIG1zZzogJ2Fub255bW91cyB1c2VyIGRvZXNuXFwndCBzdXBwb3J0IHNpZ25PdXQgYWN0aW9uJ1xuICAgIC8vICAgfSkpXG4gICAgLy8gfVxuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5LCBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXkgfSA9IHRoaXMuX2NhY2hlLmtleXNcblxuICAgIGNvbnN0IHJlZnJlc2hfdG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgaWYgKCFyZWZyZXNoX3Rva2VuKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAobG9naW5UeXBlLnN0YXJ0c1dpdGgoT0FVVEgyX0xPR0lOVFlQRV9QUkVGSVgpKSB7XG4gICAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpXG4gICAgICBjb25zdCBhY2Nlc3NUb2tlbkV4cGlyZSA9IE51bWJlcihhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5KSlcbiAgICAgIGlmIChhY2Nlc3NUb2tlbikge1xuICAgICAgICBpZiAoRGF0ZS5ub3coKSA8IGFjY2Vzc1Rva2VuRXhwaXJlKSB7XG4gICAgICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMuX3JlcXVlc3QuZmV0Y2goJy9hdXRoL3YxL3Jldm9rZScsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICB0b2tlbjogYWNjZXNzVG9rZW5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjb25zdCBzZXFJZEZyb21IZWFkZXIgPSByZXNwLmhlYWRlcnMuZ2V0KCdTZXFJZCcpIHx8IHJlc3AuaGVhZGVycy5nZXQoJ1JlcXVlc3RJZCcpXG4gICAgICAgICAgaWYgKHJlc3Auc3RhdHVzID49IDQwMCAmJiByZXNwLnN0YXR1cyA8IDUwMCkge1xuICAgICAgICAgICAgY29uc3QgYm9keTogYW55ID0gYXdhaXQgcmVzcC5qc29uKClcbiAgICAgICAgICAgIGNvbnN0IHNlcUlkID0gYm9keS5yZXF1ZXN0X2lkIHx8IHNlcUlkRnJvbUhlYWRlclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBbT0F1dGgyQXV0aFByb3ZpZGVyXVtzdGF0dXM6JHtyZXNwLnN0YXR1c31dWyR7Ym9keS5lcnJvcn0oJHtib2R5LmVycm9yX2NvZGV9KV0gJHtib2R5LmVycm9yX2Rlc2NyaXB0aW9ufSAoJHtzZXFJZH0pYClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAocmVzcC5zdGF0dXMgPj0gNTAwKSB7XG4gICAgICAgICAgICBjb25zdCBib2R5OiBhbnkgPSBhd2FpdCByZXNwLmpzb24oKVxuICAgICAgICAgICAgY29uc3Qgc2VxSWQgPSBib2R5LnJlcXVlc3RfaWQgfHwgc2VxSWRGcm9tSGVhZGVyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFtPQXV0aDJBdXRoUHJvdmlkZXJdW3N0YXR1czoke3Jlc3Auc3RhdHVzfV1bJHtib2R5LmVycm9yfSgke2JvZHkuZXJyb3JfY29kZX0pXSAke2JvZHkuZXJyb3JfZGVzY3JpcHRpb259ICgke3NlcUlkfSlgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAvLyBjb25zb2xlLndhcm4oYFtTaWduT3V0XSBhY2Nlc3N0b2tlbiBleHBpcmVkYClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIGNvbnNvbGUud2FybihgW1NpZ25PdXRdIGFjY2Vzc3Rva2VuIG5vdCBleGlzdHNgKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5sb2dvdXQnLCB7IHJlZnJlc2hfdG9rZW4gfSlcbiAgICB9XG5cbiAgICB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSlcbiAgICB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5KVxuICAgIHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpXG5cbiAgICBldmVudEJ1cy5maXJlKEVWRU5UUy5MT0dJTl9TVEFURV9DSEFOR0VEKVxuICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCwge1xuICAgICAgZW52OiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgbG9naW5UeXBlOiBMT0dJTlRZUEUuTlVMTCxcbiAgICAgIHBlcnNpc3RlbmNlOiB0aGlzLl9jb25maWcucGVyc2lzdGVuY2VcbiAgICB9KVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBwdWJsaWMgYXN5bmMgb25Mb2dpblN0YXRlQ2hhbmdlZChjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBldmVudEJ1cy5vbihFVkVOVFMuTE9HSU5fU1RBVEVfQ0hBTkdFRCwgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgbG9naW5TdGF0ZSA9IGF3YWl0IHRoaXMuZ2V0TG9naW5TdGF0ZSgpO1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBsb2dpblN0YXRlKTtcbiAgICB9KTtcbiAgICAvLyDnq4vliLvmiafooYzkuIDmrKHlm57osINcbiAgICBjb25zdCBsb2dpblN0YXRlID0gYXdhaXQgdGhpcy5nZXRMb2dpblN0YXRlKCk7XG4gICAgY2FsbGJhY2suY2FsbCh0aGlzLCBsb2dpblN0YXRlKTtcbiAgfVxuICBwdWJsaWMgb25Mb2dpblN0YXRlRXhwaXJlZChjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBldmVudEJ1cy5vbihFVkVOVFMuTE9HSU5fU1RBVEVfRVhQSVJFRCwgY2FsbGJhY2suYmluZCh0aGlzKSk7XG4gIH1cbiAgcHVibGljIG9uQWNjZXNzVG9rZW5SZWZyZXNoZWQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgZXZlbnRCdXMub24oRVZFTlRTLkFDQ0VTU19UT0tFTl9SRUZSRVNIRCwgY2FsbGJhY2suYmluZCh0aGlzKSk7XG4gIH1cbiAgcHVibGljIG9uQW5vbnltb3VzQ29udmVydGVkKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGV2ZW50QnVzLm9uKEVWRU5UUy5BTk9OWU1PVVNfQ09OVkVSVEVELCBjYWxsYmFjay5iaW5kKHRoaXMpKTtcbiAgfVxuICBwdWJsaWMgb25Mb2dpblR5cGVDaGFuZ2VkKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGV2ZW50QnVzLm9uKEVWRU5UUy5MT0dJTl9UWVBFX0NIQU5HRUQsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBhd2FpdCB0aGlzLmdldExvZ2luU3RhdGUoKTtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgbG9naW5TdGF0ZSk7XG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluacrOWcsOeZu+W9leaAgS3lkIzmraVcbiAgICovXG4gIHB1YmxpYyBoYXNMb2dpblN0YXRlKCk6IElMb2dpblN0YXRlIHwgbnVsbCB7XG4gICAgLy8g5YW85a65b2F1dGgg6YC76L6R77yM5Yik5pat5b2T5YmN55m75b2V5L2T57O7IGF1dGggb3Igb2F1dGhcbiAgICBjb25zdCB7IF9mcm9tQXBwIH0gPSB0aGlzLl9jb25maWdcbiAgICBjb25zdCBvYXV0aEluc3RhbmNlID0gX2Zyb21BcHAub2F1dGhJbnN0YW5jZVxuICAgIGNvbnN0IG9hdXRoTG9naW5TdGF0ZSA9IG9hdXRoSW5zdGFuY2U/Lmhhc0xvZ2luU3RhdGVTeW5jKClcbiAgICBpZiAob2F1dGhMb2dpblN0YXRlKSB7XG4gICAgICByZXR1cm4gb2F1dGhMb2dpblN0YXRlXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2NhY2hlLm1vZGUgPT09ICdhc3luYycpIHtcbiAgICAgIC8vIGFzeW5jIHN0b3JhZ2XnmoTlubPlj7DosIPnlKjmraRBUEnmj5DnpLpcbiAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sICdjdXJyZW50IHBsYXRmb3JtXFwncyBzdG9yYWdlIGlzIGFzeW5jaHJvbm91cywgcGxlYXNlIHVzZSBnZXRMb2dpblN0YXRlIGluc3RlZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUocmVmcmVzaFRva2VuS2V5KTtcblxuICAgIGlmIChyZWZyZXNoVG9rZW4pIHtcbiAgICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBuZXcgTG9naW5TdGF0ZSh7XG4gICAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgICAgbG9naW5TdGF0ZS5jaGVja0xvY2FsU3RhdGUoKTtcbiAgICAgIHJldHVybiBsb2dpblN0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluacrOWcsOeZu+W9leaAgS3lvILmraVcbiAgICog5q2kQVBJ5Li65YW85a655byC5q2lc3RvcmFnZeeahOW5s+WPsFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iOt+WPluacrOWcsOeZu+W9leaAgeWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuZ2V0TG9naW5TdGF0ZSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGdldExvZ2luU3RhdGUoKSB7XG4gICAgLy8g5qOA5p+l5b2T5YmN55m75b2V5L2T57O7IGF1dGggb3Igb2F1dGhcbiAgICAvLyBjb25zdCB7IF9mcm9tQXBwIH0gPSB0aGlzLl9jb25maWdcbiAgICAvLyBjb25zdCBhdXRoT2JqID0gYXdhaXQgY2hlY2tGcm9tQXV0aFYxT3JWMihfZnJvbUFwcClcbiAgICAvLyBjb25zdCB7IGF1dGhUeXBlLCBpbnN0YW5jZSB9ID0gYXV0aE9ialxuICAgIC8vIGlmIChhdXRoVHlwZSA9PT0gJ29hdXRoJykge1xuICAgIC8vICAgcmV0dXJuIGF3YWl0IGluc3RhbmNlLmdldExvZ2luU3RhdGUoKVxuICAgIC8vIH1cbiAgICBjb25zdCB7IF9mcm9tQXBwIH0gPSB0aGlzLl9jb25maWdcbiAgICBjb25zdCBvYXV0aEluc3RhbmNlID0gX2Zyb21BcHAub2F1dGhJbnN0YW5jZSB8fCAoX2Zyb21BcHAgYXMgYW55KS5vYXV0aCgpXG4gICAgY29uc3Qgb2F1dGhMb2dpblN0YXRlID0gb2F1dGhJbnN0YW5jZSAmJiBhd2FpdCBvYXV0aEluc3RhbmNlLmdldExvZ2luU3RhdGUoKVxuICAgIGlmIChvYXV0aExvZ2luU3RhdGUpIHtcbiAgICAgIHJldHVybiBvYXV0aExvZ2luU3RhdGVcbiAgICB9XG5cbiAgICAvLyBhdXRoIOS9k+ezu+i1sOm7mOiupOmAu+i+kVxuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZiAocmVmcmVzaFRva2VuKSB7XG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IGxvZ2luU3RhdGUuY2hlY2tMb2NhbFN0YXRlQXN5bmMoKTtcbiAgICAgIHJldHVybiBsb2dpblN0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuKGhvb2spIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5fcmVxdWVzdC5fc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuSG9vayA9IGhvb2suYmluZCh0aGlzKTtcbiAgfVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W55So5oi35L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g5piv5ZCm5bey55m75b2VJyxcbiAgICAgICcgIDIgLSDosIPnlKggYXV0aCgpLmdldFVzZXJJbmZvKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0VXNlckluZm8oKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBhY3Rpb24gPSAnYXV0aC5nZXRVc2VySW5mbyc7XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoYWN0aW9uLCB7fSk7XG4gICAgaWYgKHJlcy5jb2RlKSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5yZXMuZGF0YSxcbiAgICAgICAgcmVxdWVzdElkOiByZXMuc2VxSWRcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDojrflj5ZIdHRw6Ym05p2DaGVhZGVy77yM55So5LqO5LqR5o6l5YWlIEhUVFAg6K6/6Zeu5LqR5Ye95pWw5pe255qE6Ym05p2DXG4gICAqL1xuICBwdWJsaWMgZ2V0QXV0aEhlYWRlcigpIHtcbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSwgYWNjZXNzVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUocmVmcmVzaFRva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICByZXR1cm4ge1xuICAgICAgJ3gtY2xvdWRiYXNlLWNyZWRlbnRpYWxzJzogYWNjZXNzVG9rZW4gKyAnL0BALycgKyByZWZyZXNoVG9rZW5cbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiDlvILmraXmqKHlvI/ojrflj5ZIdHRw6Ym05p2DaGVhZGVy77yM55So5LqO5LqR5o6l5YWlIEhUVFAg6K6/6Zeu5LqR5Ye95pWw5pe255qE6Ym05p2DXG4gICAqIOiwg+eUqOatpEFQSeS8muWIt+aWsOeZu+W9leaAgVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEF1dGhIZWFkZXJBc3luYygpIHtcbiAgICBhd2FpdCB0aGlzLl9yZXF1ZXN0LnJlZnJlc2hBY2Nlc3NUb2tlbigpO1xuXG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXksIGFjY2Vzc1Rva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIHJldHVybiB7XG4gICAgICAneC1jbG91ZGJhc2UtY3JlZGVudGlhbHMnOiBhY2Nlc3NUb2tlbiArICcvQEAvJyArIHJlZnJlc2hUb2tlblxuICAgIH07XG4gIH1cblxuICAvKipcbiAqIOWPkemAgemqjOivgeeggVxuICogQHBhcmFtIHBob25lTnVtYmVyXG4gKiBAcGFyYW0gcGhvbmVDb2RlXG4gKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+WPkemAgeefreS/oemqjOivgeeggeWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG55+t5L+h6aqM6K+B56CB55m75b2VJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgc2VuZFBob25lQ29kZShwaG9uZU51bWJlcjogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGguc2VuZFBob25lQ29kZScsIHtcbiAgICAgIHBob25lTnVtYmVyOiB0cmFuc2Zvcm1QaG9uZShwaG9uZU51bWJlcilcbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YS5TZW5kU3RhdHVzID09PSAnT2snXG4gIH1cblxuICAvKipcbiAgICog5omL5py655+t5L+h5rOo5YaMXG4gICAqIEBwYXJhbSBlbWFpbFxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduVXBXaXRoUGhvbmVDb2RlKHBob25lTnVtYmVyOiBzdHJpbmcsIHBob25lQ29kZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMucGhvbmVBdXRoUHJvdmlkZXIoKS5zaWduVXAocGhvbmVOdW1iZXIsIHBob25lQ29kZSwgcGFzc3dvcmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIOaJi+acuumqjOivgeeggSBvciDlr4bnoIHnmbvlvZVcbiAgICogQHBhcmFtIGVtYWlsXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbldpdGhQaG9uZUNvZGVPclBhc3N3b3JkKHBhcmFtOiB7XG4gICAgcGhvbmVOdW1iZXI6IHN0cmluZ1xuICAgIHBob25lQ29kZT86IHN0cmluZ1xuICAgIHBhc3N3b3JkPzogc3RyaW5nXG4gICAgc2lnbk1ldGhvZD86IHN0cmluZ1xuICB9KSB7XG4gICAgcmV0dXJuIHRoaXMucGhvbmVBdXRoUHJvdmlkZXIoKS5zaWduSW4ocGFyYW0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGZvcmNlUmVzZXRQd2RCeVBob25lQ29kZShwYXJhbToge1xuICAgIHBob25lTnVtYmVyOiBzdHJpbmdcbiAgICBwaG9uZUNvZGU6IHN0cmluZ1xuICAgIHBhc3N3b3JkOiBzdHJpbmdcbiAgfSkge1xuICAgIHJldHVybiB0aGlzLnBob25lQXV0aFByb3ZpZGVyKCkuc2lnbkluKHtcbiAgICAgIC4uLnBhcmFtLFxuICAgICAgc2lnbk1ldGhvZDogU0lHTl9NRVRIT0QuRk9SQ0VSRVNFVFBXRFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfb25Mb2dpblR5cGVDaGFuZ2VkKGV2KSB7XG4gICAgY29uc3QgeyBsb2dpblR5cGUsIHBlcnNpc3RlbmNlLCBlbnYgfSA9IGV2LmRhdGE7XG4gICAgaWYgKGVudiAhPT0gdGhpcy5fY29uZmlnLmVudikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDnmbvlvZXmgIHovazlj5jlkI7ov4Hnp7tjYWNoZe+8jOmYsuatouWcqOWMv+WQjeeZu+W9leeKtuaAgeS4i2NhY2hl5re355SoXG4gICAgYXdhaXQgdGhpcy5fY2FjaGUudXBkYXRlUGVyc2lzdGVuY2VBc3luYyhwZXJzaXN0ZW5jZSk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyh0aGlzLl9jYWNoZS5rZXlzLmxvZ2luVHlwZUtleSwgbG9naW5UeXBlKTtcbiAgfVxufVxuXG5jb25zdCBFVkVOVFMgPSB7XG4gIC8vIOeZu+W9leaAgeaUueWPmOWQjuinpuWPkVxuICBMT0dJTl9TVEFURV9DSEFOR0VEOiAnbG9naW5TdGF0ZUNoYW5nZWQnLFxuICAvLyDnmbvlvZXmgIHov4fmnJ/lkI7op6blj5FcbiAgTE9HSU5fU1RBVEVfRVhQSVJFRDogJ2xvZ2luU3RhdGVFeHBpcmUnLFxuICAvLyDnmbvlvZXnsbvlnovmlLnlj5jlkI7op6blj5FcbiAgTE9HSU5fVFlQRV9DSEFOR0VEOiAnbG9naW5UeXBlQ2hhbmdlZCcsXG4gIC8vIOWMv+WQjei0puaIt+iiq+i9rOato+WQjuinpuWPkVxuICBBTk9OWU1PVVNfQ09OVkVSVEVEOiAnYW5vbnltb3VzQ29udmVydGVkJyxcbiAgLy8gYWNjZXNzIHRva2Vu5Yi35paw5ZCO6Kem5Y+RXG4gIEFDQ0VTU19UT0tFTl9SRUZSRVNIRDogJ3JlZnJlc2hBY2Nlc3NUb2tlbidcbn07XG5cbmNvbnN0IGNvbXBvbmVudDogSUNsb3VkYmFzZUNvbXBvbmVudCA9IHtcbiAgbmFtZTogQ09NUE9ORU5UX05BTUUsXG4gIG5hbWVzcGFjZTogJ2F1dGgnLFxuICBpbmplY3RFdmVudHM6IHtcbiAgICBidXM6IGV2ZW50QnVzLFxuICAgIGV2ZW50czogW1xuICAgICAgRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCxcbiAgICAgIEVWRU5UUy5MT0dJTl9TVEFURV9FWFBJUkVELFxuICAgICAgRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQsXG4gICAgICBFVkVOVFMuQUNDRVNTX1RPS0VOX1JFRlJFU0hELFxuICAgICAgRVZFTlRTLkFOT05ZTU9VU19DT05WRVJURURcbiAgICBdXG4gIH0sXG4gIGVudGl0eTogZnVuY3Rpb24gKGNvbmZpZzogUGljazxJQ2xvdWRiYXNlQXV0aENvbmZpZywgJ3JlZ2lvbicgfCAncGVyc2lzdGVuY2UnPiA9IHsgcmVnaW9uOiAnJywgcGVyc2lzdGVuY2U6ICdsb2NhbCcgfSkge1xuICAgIGlmICh0aGlzLmF1dGhJbnN0YW5jZSkge1xuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwgJ2V2ZXJ5IGNsb3VkYmFzZSBpbnN0YW5jZSBzaG91bGQgaGFzIG9ubHkgb25lIGF1dGggb2JqZWN0Jyk7XG4gICAgICByZXR1cm4gdGhpcy5hdXRoSW5zdGFuY2U7XG4gICAgfVxuICAgIGNvbnN0IHsgYWRhcHRlciwgcnVudGltZSB9ID0gdGhpcy5wbGF0Zm9ybTtcbiAgICAvLyDlpoLkuI3mmI7noa7mjIflrppwZXJzaXN0ZW5jZeWImeS8mOWFiOWPluWQhOW5s+WPsGFkYXB0ZXLpppbpgInvvIzlhbbmrKFzZXNzaW9uXG4gICAgY29uc3QgbmV3UGVyc2lzdGVuY2UgPSBjb25maWcucGVyc2lzdGVuY2UgfHwgYWRhcHRlci5wcmltYXJ5U3RvcmFnZTtcbiAgICBpZiAobmV3UGVyc2lzdGVuY2UgJiYgKG5ld1BlcnNpc3RlbmNlICE9PSB0aGlzLmNvbmZpZy5wZXJzaXN0ZW5jZSkpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29uZmlnKHsgcGVyc2lzdGVuY2U6IG5ld1BlcnNpc3RlbmNlIH0pXG4gICAgfVxuXG4gICAgY29uc3QgeyBlbnYsIHBlcnNpc3RlbmNlLCBkZWJ1ZyB9ID0gdGhpcy5jb25maWc7XG4gICAgdGhpcy5hdXRoSW5zdGFuY2UgPSBuZXcgQXV0aCh7XG4gICAgICBlbnYsXG4gICAgICByZWdpb246IGNvbmZpZy5yZWdpb24sXG4gICAgICBwZXJzaXN0ZW5jZSxcbiAgICAgIGRlYnVnLFxuICAgICAgY2FjaGU6IHRoaXMuY2FjaGUsXG4gICAgICByZXF1ZXN0OiB0aGlzLnJlcXVlc3QsXG4gICAgICBydW50aW1lOiBydW50aW1lLFxuICAgICAgX2Zyb21BcHA6IHRoaXNcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5hdXRoSW5zdGFuY2U7XG4gIH1cbn1cblxudHJ5IHtcbiAgLy8g5bCd6K+V6Ieq5Yqo5rOo5YaM6Iez5YWo5bGA5Y+Y6YePY2xvdWRiYXNlXG4gIC8vIOatpOihjOS4uuWPquWcqOa1j+iniOWZqOeOr+Wig+S4i+acieaViFxuICBjbG91ZGJhc2UucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbn0gY2F0Y2ggKGUpIHsgfVxuXG5leHBvcnQge1xuICBVc2VySW5mbyxcbiAgQXV0aCxcbiAgQXV0aFByb3ZpZGVyLFxuICBFVkVOVFMsXG4gIGV2ZW50QnVzXG59O1xuLyoqXG4gKiBAYXBpIOaJi+WKqOazqOWGjOiHs2Nsb3VkYmFzZSBhcHBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQXV0aChhcHA6IFBpY2s8SUNsb3VkYmFzZSwgJ3JlZ2lzdGVyQ29tcG9uZW50Jz4pIHtcbiAgdHJ5IHtcbiAgICBhcHAucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUud2FybihlKTtcbiAgfVxufVxuXG50eXBlIElQcm92aWRlciA9IG5ldyAoLi4uYXJnczogYW55W10pID0+IGFueTtcbi8qKlxuICog5rOo5YaMcHJvdmlkZXLvvIzlpoLmnpxcbiAqIEBwYXJhbSBuYW1lXG4gKiBAcGFyYW0gcHJvdmlkZXJcbiAqIEBleGFtcGxlXG4gKiAvLyDms6jlhoxcbiAqIHJlZ2lzdGVyUHJvdmlkZXIoJ2VtYWlsQXV0aFByb3ZpZGVyJyxmdW5jdGlvbigpe1xuICogICAvLyAuLi5cbiAqIH0pO1xuICogLy8g5L2/55So5pawcHJvdmlkZXLnmbvlvZVcbiAqIGNsb3VkYmFzZS5hdXRoKCkuZW1haWxBdXRoUHJvdmlkZXIoKS5zaWduSW4oKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyUHJvdmlkZXIobmFtZTogc3RyaW5nLCBwcm92aWRlcjogSVByb3ZpZGVyKSB7XG4gIGNvbnN0IHByb3RvID0gQXV0aC5wcm90b3R5cGU7XG4gIHByb3RvW25hbWVdID0gZnVuY3Rpb24gKG9wdGlvbnM6IG9iamVjdCkge1xuICAgIGNvbnN0IHByaXZhdGVOYW1lID0gYF8ke25hbWV9YDtcbiAgICBpZiAoIXRoaXNbcHJpdmF0ZU5hbWVdKSB7XG4gICAgICB0aGlzW3ByaXZhdGVOYW1lXSA9IG5ldyBwcm92aWRlcih7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzW3ByaXZhdGVOYW1lXTtcbiAgfTtcbn0iXX0=