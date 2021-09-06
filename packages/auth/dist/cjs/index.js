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
                        console.log('_fromApp', _fromApp);
                        oauthInstance = _fromApp.oauthInstance || _fromApp.oauth();
                        console.log('oauthInstance', oauthInstance);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrREFBbUY7QUFLbkYsbUNBQTBDO0FBRTFDLHlDQUFpRTtBQUVqRSx5Q0FBZ0Q7QUFnbEM5Qyw2RkFobENPLG1CQUFZLE9BZ2xDUDtBQTlrQ2QscUVBQWdHO0FBRWhHLDJFQUEwRTtBQUMxRSxxRUFBb0U7QUFDcEUsbUVBQWtFO0FBQ2xFLG1FQUE4RTtBQUM5RSx5RUFBd0U7QUFDeEUscUVBQW9FO0FBSTVELElBQUEscUJBQXFCLEdBQUssa0JBQU0sc0JBQVgsQ0FBWTtBQUNqQyxJQUFBLE9BQU8sR0FBSyxvQkFBUSxRQUFiLENBQWM7QUFDckIsSUFBQSxTQUFTLEdBQWlDLGlCQUFLLFVBQXRDLEVBQUUsVUFBVSxHQUFxQixpQkFBSyxXQUExQixFQUFFLGNBQWMsR0FBSyxpQkFBSyxlQUFWLENBQVc7QUFDaEQsSUFBQSxNQUFNLEdBQXlCLHFCQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUsscUJBQVMsbUJBQWQsQ0FBZTtBQUN6QyxJQUFBLG9CQUFvQixHQUFLLG1CQUFPLHFCQUFaLENBQWE7QUFFekMsSUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDO0FBYzlCLElBQU0sUUFBUSxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztBQWlqQzNDLDRCQUFRO0FBMWlDVjtJQXlCRSxjQUFZLE9BQXFCO1FBQ3ZCLElBQUEsS0FBSyxHQUFjLE9BQU8sTUFBckIsRUFBRSxPQUFPLEdBQUssT0FBTyxRQUFaLENBQWE7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFFeEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7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QUFDO0NBQ3hDO0FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRztBQVlmLFNBQWdCLFlBQVksQ0FBQyxHQUEwQztJQUNyRSxJQUFJO1FBQ0YsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2xDO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pCO0FBQ0gsQ0FBQztBQU5ELG9DQU1DO0FBZUQsU0FBZ0IsZ0JBQWdCLENBQUMsSUFBWSxFQUFFLFFBQW1CO0lBQ2hFLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDN0IsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsT0FBZTtRQUNyQyxJQUFNLFdBQVcsR0FBRyxNQUFJLElBQU0sQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLFFBQVEsdUJBQzNCLE9BQU8sR0FDUCxJQUFJLENBQUMsT0FBTyxFQUNmLENBQUM7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztBQUNKLENBQUM7QUFaRCw0Q0FZQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbG91ZGJhc2UgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcbmltcG9ydCB7IGV2ZW50cywgYWRhcHRlcnMsIHV0aWxzLCBjb25zdGFudHMsIGhlbHBlcnMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ2FjaGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NhY2hlJztcbmltcG9ydCB7IElDbG91ZGJhc2VSZXF1ZXN0IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9yZXF1ZXN0JztcbmltcG9ydCB7IElDbG91ZGJhc2VBdXRoQ29uZmlnLCBJQ3JlZGVudGlhbCwgSVVzZXIsIElVc2VySW5mbywgSUF1dGhQcm92aWRlciwgSUxvZ2luU3RhdGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2F1dGgnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNvbXBvbmVudCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY29tcG9uZW50JztcbmltcG9ydCB7IGNoZWNrRnJvbUF1dGhWMiB9IGZyb20gJy4vY29tbW9uJ1xuXG5pbXBvcnQgeyBMT0dJTlRZUEUsIE9BVVRIMl9MT0dJTlRZUEVfUFJFRklYIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9iYXNlJztcblxuaW1wb3J0IHsgT0F1dGgyQXV0aFByb3ZpZGVyLCBJT0F1dGgyQXV0aFByb3ZpZGVyT3B0aW9ucyB9IGZyb20gJy4vcHJvdmlkZXJzL29hdXRoMkF1dGhQcm92aWRlcic7XG5cbmltcG9ydCB7IEFub255bW91c0F1dGhQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2Fub255bW91c0F1dGhQcm92aWRlcic7XG5pbXBvcnQgeyBDdXN0b21BdXRoUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9jdXN0b21BdXRoUHJvdmlkZXInO1xuaW1wb3J0IHsgRW1haWxBdXRoUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9lbWFpbEF1dGhQcm92aWRlcic7XG5pbXBvcnQgeyBQaG9uZUF1dGhQcm92aWRlciwgU0lHTl9NRVRIT0QgfSBmcm9tICcuL3Byb3ZpZGVycy9waG9uZUF1dGhQcm92aWRlcidcbmltcG9ydCB7IFVzZXJuYW1lQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvdXNlcm5hbWVBdXRoUHJvdmlkZXInO1xuaW1wb3J0IHsgV2VpeGluQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvd2VpeGluQXV0aFByb3ZpZGVyJztcblxuZGVjbGFyZSBjb25zdCBjbG91ZGJhc2U6IElDbG91ZGJhc2U7XG5cbmNvbnN0IHsgQ2xvdWRiYXNlRXZlbnRFbWl0dGVyIH0gPSBldmVudHM7XG5jb25zdCB7IFJVTlRJTUUgfSA9IGFkYXB0ZXJzO1xuY29uc3QgeyBwcmludFdhcm4sIHRocm93RXJyb3IsIHRyYW5zZm9ybVBob25lIH0gPSB1dGlscztcbmNvbnN0IHsgRVJST1JTLCBDT01NVU5JVFlfU0lURV9VUkwgfSA9IGNvbnN0YW50cztcbmNvbnN0IHsgY2F0Y2hFcnJvcnNEZWNvcmF0b3IgfSA9IGhlbHBlcnM7XG5cbmNvbnN0IENPTVBPTkVOVF9OQU1FID0gJ2F1dGgnO1xuXG5pbnRlcmZhY2UgVXNlckluZm8ge1xuICBvcGVuaWQ6IHN0cmluZztcbiAgbmlja25hbWU/OiBzdHJpbmc7XG4gIHNleD86IG51bWJlcjtcbiAgcHJvdmluY2U/OiBzdHJpbmc7XG4gIGNpdHk/OiBzdHJpbmc7XG4gIGNvdW50cnk/OiBzdHJpbmc7XG4gIGhlYWRpbWd1cmw/OiBzdHJpbmc7XG4gIHByaXZpbGVnZT86IFtzdHJpbmddO1xuICB1bmlvbmlkPzogc3RyaW5nO1xufVxuXG5jb25zdCBldmVudEJ1cyA9IG5ldyBDbG91ZGJhc2VFdmVudEVtaXR0ZXIoKTtcblxuaW50ZXJmYWNlIElVc2VyT3B0aW9ucyB7XG4gIGNhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG4gIHJlcXVlc3Q6IElDbG91ZGJhc2VSZXF1ZXN0O1xufVxuXG5jbGFzcyBVc2VyIGltcGxlbWVudHMgSVVzZXIge1xuICBwdWJsaWMgdWlkOiBzdHJpbmc7XG4gIHB1YmxpYyBsb2dpblR5cGU6IHN0cmluZztcbiAgcHVibGljIG9wZW5pZDogc3RyaW5nO1xuICBwdWJsaWMgd3hPcGVuSWQ6IHN0cmluZztcbiAgcHVibGljIHd4UHVibGljSWQ6IHN0cmluZztcbiAgcHVibGljIHVuaW9uSWQ6IHN0cmluZztcbiAgcHVibGljIHFxTWluaU9wZW5JZDogc3RyaW5nO1xuICBwdWJsaWMgY3VzdG9tVXNlcklkOiBzdHJpbmc7XG4gIHB1YmxpYyBuaWNrTmFtZTogc3RyaW5nO1xuICBwdWJsaWMgZ2VuZGVyOiBzdHJpbmc7XG4gIHB1YmxpYyBhdmF0YXJVcmw6IHN0cmluZztcbiAgcHVibGljIGVtYWlsOiBzdHJpbmc7XG4gIHB1YmxpYyBoYXNQYXNzd29yZDogYm9vbGVhbjtcbiAgcHVibGljIHBob25lPzogc3RyaW5nO1xuICBwdWJsaWMgdXNlcm5hbWU/OiBzdHJpbmc7XG4gIHB1YmxpYyBsb2NhdGlvbj86IHtcbiAgICBjb3VudHJ5Pzogc3RyaW5nO1xuICAgIHByb3ZpbmNlPzogc3RyaW5nO1xuICAgIGNpdHk/OiBzdHJpbmc7XG4gIH07XG5cbiAgcHJpdmF0ZSBfY2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcbiAgcHJpdmF0ZSBfcmVxdWVzdDogSUNsb3VkYmFzZVJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogSVVzZXJPcHRpb25zKSB7XG4gICAgY29uc3QgeyBjYWNoZSwgcmVxdWVzdCB9ID0gb3B0aW9ucztcbiAgICB0aGlzLl9jYWNoZSA9IGNhY2hlO1xuICAgIHRoaXMuX3JlcXVlc3QgPSByZXF1ZXN0O1xuXG4gICAgdGhpcy5fc2V0VXNlckluZm8oKTtcbiAgfVxuICAvKipcbiAgICog6I635Y+W5pys5Zyw55So5oi35L+h5oGvLeWQjOatpVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNoZWNrTG9jYWxJbmZvKCkge1xuICAgIHRoaXMudWlkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygndWlkJyk7XG4gICAgdGhpcy5sb2dpblR5cGUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdsb2dpblR5cGUnKTtcbiAgICB0aGlzLm9wZW5pZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3d4T3BlbklkJyk7XG4gICAgdGhpcy53eE9wZW5JZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3d4T3BlbklkJyk7XG4gICAgdGhpcy53eFB1YmxpY0lkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnd3hQdWJsaWNJZCcpO1xuICAgIHRoaXMudW5pb25JZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3d4VW5pb25JZCcpO1xuICAgIHRoaXMucXFNaW5pT3BlbklkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncXFNaW5pT3BlbklkJyk7XG4gICAgdGhpcy5jdXN0b21Vc2VySWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdjdXN0b21Vc2VySWQnKTtcbiAgICB0aGlzLm5pY2tOYW1lID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnbmlja05hbWUnKTtcbiAgICB0aGlzLmdlbmRlciA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2dlbmRlcicpO1xuICAgIHRoaXMuYXZhdGFyVXJsID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnYXZhdGFyVXJsJyk7XG4gICAgdGhpcy5lbWFpbCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2VtYWlsJyk7XG4gICAgdGhpcy5oYXNQYXNzd29yZCA9IEJvb2xlYW4odGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnaGFzUGFzc3dvcmQnKSk7XG4gICAgdGhpcy5waG9uZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3Bob25lJylcbiAgICB0aGlzLnVzZXJuYW1lID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygndXNlcm5hbWUnKVxuICAgIHRoaXMubG9jYXRpb24gPSB7XG4gICAgICBjb3VudHJ5OiB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdjb3VudHJ5JyksXG4gICAgICBwcm92aW5jZTogdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncHJvdmluY2UnKSxcbiAgICAgIGNpdHk6IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2NpdHknKVxuICAgIH07XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluacrOWcsOeUqOaIt+S/oeaBry3lvILmraVcbiAgICovXG4gIHB1YmxpYyBhc3luYyBjaGVja0xvY2FsSW5mb0FzeW5jKCkge1xuICAgIHRoaXMudWlkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd1aWQnKTtcbiAgICB0aGlzLmxvZ2luVHlwZSA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnbG9naW5UeXBlJyk7XG4gICAgdGhpcy5vcGVuaWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3d4T3BlbklkJyk7XG4gICAgdGhpcy53eE9wZW5JZCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnd3hPcGVuSWQnKTtcbiAgICB0aGlzLnd4UHVibGljSWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3d4UHVibGljSWQnKTtcbiAgICB0aGlzLnVuaW9uSWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3d4VW5pb25JZCcpO1xuICAgIHRoaXMucXFNaW5pT3BlbklkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdxcU1pbmlPcGVuSWQnKTtcbiAgICB0aGlzLmN1c3RvbVVzZXJJZCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnY3VzdG9tVXNlcklkJyk7XG4gICAgdGhpcy5uaWNrTmFtZSA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnbmlja05hbWUnKTtcbiAgICB0aGlzLmdlbmRlciA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnZ2VuZGVyJyk7XG4gICAgdGhpcy5hdmF0YXJVcmwgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2F2YXRhclVybCcpO1xuICAgIHRoaXMuZW1haWwgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2VtYWlsJyk7XG4gICAgdGhpcy5oYXNQYXNzd29yZCA9IEJvb2xlYW4oYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdoYXNQYXNzd29yZCcpKTtcbiAgICB0aGlzLnBob25lID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdwaG9uZScpXG4gICAgdGhpcy51c2VybmFtZSA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygndXNlcm5hbWUnKVxuICAgIHRoaXMubG9jYXRpb24gPSB7XG4gICAgICBjb3VudHJ5OiBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2NvdW50cnknKSxcbiAgICAgIHByb3ZpbmNlOiBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3Byb3ZpbmNlJyksXG4gICAgICBjaXR5OiBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2NpdHknKVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICog5bCG5b2T5YmN6LSm5oi35LiO6Ieq5a6a5LmJ55m75b2VIFRpY2tldCDov5vooYznu5HlrprvvIznu5HlrprkuYvlkI7kvr/lj6/ku6XpgJrov4foh6rlrprkuYnnmbvlvZXnmbvlvZXlvZPliY3kupHlvIDlj5HotKbmiLfjgIJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpY2tldCDoh6rlrprkuYnnmbvlvZV0aWNrZXRcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnu5Hlrproh6rlrprkuYnnmbvlvZXlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5saW5rV2l0aFRpY2tldCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5q2k6LSm5oi35piv5ZCm5bey57uP57uR5a6a6Ieq5a6a5LmJ55m75b2VJyxcbiAgICAgICcgIDMgLSB0aWNrZXQg5Y+C5pWw5piv5ZCm5b2S5bGe5b2T5YmN546v5aKDJyxcbiAgICAgICcgIDQgLSDliJvlu7ogdGlja2V0IOeahOiHquWumuS5ieeZu+W9leengemSpeaYr+WQpui/h+acnycsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGxpbmtXaXRoVGlja2V0KHRpY2tldDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHR5cGVvZiB0aWNrZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RpY2tldCBtdXN0IGJlIHN0cmluZycpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLmxpbmtXaXRoVGlja2V0JywgeyB0aWNrZXQgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOWwhuW9k+WJjei0puaIt+S4juesrOS4ieaWuemJtOadg+aPkOS+m+aWue+8jOS7pemHjeWumuWQkeeahOW9ouW8j++8jOi/m+ihjOe7keWumu+8jOe7keWumuS5i+WQjuS+v+WPr+S7pemAmui/h+esrOS4ieaWuemJtOadg+aPkOS+m+aWueeZu+W9leW9k+WJjeeahOS6keW8gOWPkei0puaIt+OAglxuICAgKiBAcGFyYW0gcHJvdmlkZXIg54m55a6a55m75b2V5pa55byP55qEcHJvdmlkZXLvvIzlv4XpobvlhbflpIdzaWduSW5XaXRoUmVkaXJlY3Tmlrnms5VcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnu5HlrprnrKzkuInmlrnnmbvlvZXmlrnlvI/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5saW5rV2l0aFJlZGlyZWN0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDmraTotKbmiLfmmK/lkKblt7Lnu4/nu5HlrprmraTnrKzkuInmlrknLFxuICAgICAgJyAgMyAtIOatpOesrOS4ieaWueaYr+WQpuW3sue7j+aOiOadgycsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGxpbmtXaXRoUmVkaXJlY3QocHJvdmlkZXI6IElBdXRoUHJvdmlkZXIpOiB2b2lkIHtcbiAgICBwcm92aWRlci5zaWduSW5XaXRoUmVkaXJlY3QoKTtcbiAgfVxuICAvKipcbiAgICog6I635Y+W5b2T5YmN6LSm5oi355qE5b6u5L+hIFVuaW9uSUQg57uR5a6a55qE5LqR5byA5Y+R6LSm5oi35YiX6KGo44CC5aaC5p6c5b2T5YmN6LSm5oi35LiN5a2Y5ZyoIFVuaW9uSUTvvIzkvJrov5Tlm57plJnor6/jgIJcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5botKbmiLfliJfooajlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5nZXRMaW5rZWRVaWRMaXN0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0TGlua2VkVWlkTGlzdCgpIHtcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5nZXRMaW5rZWRVaWRMaXN0Jywge30pO1xuICAgIGxldCBoYXNQcmltYXJ5VWlkID0gZmFsc2U7XG4gICAgY29uc3QgdXNlcnMgPSBkYXRhLnVzZXJzIGFzIElVc2VySW5mb1tdO1xuICAgIGZvciAoY29uc3QgdXNlciBvZiB1c2Vycykge1xuICAgICAgaWYgKHVzZXIud3hPcGVuSWQgJiYgdXNlci53eFB1YmxpY0lkKSB7XG4gICAgICAgIGhhc1ByaW1hcnlVaWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXJzLFxuICAgICAgaGFzUHJpbWFyeVVpZFxuICAgIH07XG4gIH1cbiAgLyoqXG4gICAqIOiuvue9ruW+ruS/oeS4u+i0puWPt++8jOmAmuW4uOaQremFjeWSjCBVc2VyLmdldExpbmtlZFVpZExpc3QoKSDkvb/nlKjvvIznlKjkuo7lnKjlkIzkuKrlvq7kv6EgVW5pb25JRCDlr7nlupTnmoTlpJrkuKrkupHlvIDlj5HotKblj7fkuK3vvIzorr7nva7lhbbkuK3kuIDkuKrkuLrkuLvotKblj7dcbiAgICog6K6+572u5LmL5ZCO77yM6YCa6L+HIFVuaW9uSUQg55m75b2V5L6/5Lya55m75b2V6Iez5Li76LSm5Y+35LmL5LiK44CCXG4gICAqIEBwYXJhbSB1aWRcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICforr7nva7lvq7kv6HkuLvotKblj7flpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5zZXRQcmltYXJ5VWlkKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgc2V0UHJpbWFyeVVpZCh1aWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGguc2V0UHJpbWFyeVVpZCcsIHsgdWlkIH0pO1xuICB9XG4gIC8qKlxuICAgKiDop6Pnu5Hmn5DkuKrnmbvlvZXmlrnlvI9cbiAgICogQHBhcmFtIGxvZ2luVHlwZVxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+aOpeinpue7keWumuWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnVubGluaygpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN6LSm5oi35piv5ZCm5bey57uP5LiO5q2k55m75b2V5pa55byP6Kej57uRJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgdW5saW5rKGxvZ2luVHlwZTogJ0NVU1RPTScgfCAnV0VDSEFULU9QRU4nIHwgJ1dFQ0hBVC1QVUJMSUMnIHwgJ1dFQ0hBVC1VTklPTicgfCAnUEhPTkUnKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC51bmxpbmsnLCB7IHBsYXRmb3JtOiBsb2dpblR5cGUgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOabtOaWsOeUqOaIt+S/oeaBr1xuICAgKiBAcGFyYW0gdXNlckluZm9cbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmm7TmlrDnlKjmiLfkv6Hmga/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci51cGRhdGUoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOeUqOaIt+S/oeaBr+S4reaYr+WQpuWMheWQq+mdnuazleWAvCcsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHVwZGF0ZSh1c2VySW5mbzogSVVzZXJJbmZvKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBuaWNrTmFtZSwgZ2VuZGVyLCBhdmF0YXJVcmwsIHByb3ZpbmNlLCBjb3VudHJ5LCBjaXR5IH0gPSB1c2VySW5mbztcbiAgICBjb25zdCB7IGRhdGE6IG5ld1VzZXJJbmZvIH0gPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGgudXBkYXRlVXNlckluZm8nLCB7IG5pY2tOYW1lLCBnZW5kZXIsIGF2YXRhclVybCwgcHJvdmluY2UsIGNvdW50cnksIGNpdHkgfSk7XG4gICAgdGhpcy5fc2V0TG9jYWxVc2VySW5mbyhuZXdVc2VySW5mbyk7XG4gIH1cbiAgLyoqXG4gICAqIOabtOaWsOWvhueggVxuICAgKiBAcGFyYW0gbmV3UGFzc3dvcmRcbiAgICogQHBhcmFtIG9sZFBhc3N3b3JkXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw5a+G56CB5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlUGFzc3dvcmQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMyAtIOaWsOWvhueggeS4reaYr+WQpuWMheWQq+mdnuazleWtl+espicsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIHVwZGF0ZVBhc3N3b3JkKG5ld1Bhc3N3b3JkOiBzdHJpbmcsIG9sZFBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnVwZGF0ZVBhc3N3b3JkJywge1xuICAgICAgb2xkUGFzc3dvcmQsXG4gICAgICBuZXdQYXNzd29yZFxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDmm7TmlrDpgq7nrrHlnLDlnYBcbiAgICogQHBhcmFtIG5ld0VtYWlsXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw6YKu566x5Zyw5Z2A5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlRW1haWwoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6humCrueuseWvhueggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIHVwZGF0ZUVtYWlsKG5ld0VtYWlsOiBzdHJpbmcsIHBhc3N3b3JkPzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC51cGRhdGVFbWFpbCcsIHtcbiAgICAgIG5ld0VtYWlsLFxuICAgICAgcGFzc3dvcmRcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog5pu05paw55So5oi35ZCNXG4gICAqIEBwYXJhbSB1c2VybmFtZVxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+abtOaWsOeUqOaIt+WQjeWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnVwZGF0ZVVzZXJuYW1lKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobnlKjmiLflkI3lr4bnoIHnmbvlvZUnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyB1cGRhdGVVc2VybmFtZSh1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiB1c2VybmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCAndXNlcm5hbWUgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGgudXBkYXRlVXNlcm5hbWUnLCB7XG4gICAgICB1c2VybmFtZVxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDliLfmlrDmnKzlnLDnlKjmiLfkv6Hmga/jgILlvZPnlKjmiLflnKjlhbbku5blrqLmiLfnq6/mm7TmlrDnlKjmiLfkv6Hmga/kuYvlkI7vvIzlj6/ku6XosIPnlKjmraTmjqXlj6PlkIzmraXmm7TmlrDkuYvlkI7nmoTkv6Hmga/jgIJcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfliLfmlrDmnKzlnLDnlKjmiLfkv6Hmga/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5yZWZyZXNoKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgcmVmcmVzaCgpOiBQcm9taXNlPElVc2VySW5mbz4ge1xuICAgIGNvbnN0IGFjdGlvbiA9ICdhdXRoLmdldFVzZXJJbmZvJztcbiAgICBjb25zdCB7IGRhdGE6IHVzZXJJbmZvIH0gPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoYWN0aW9uLCB7fSk7XG4gICAgdGhpcy5fc2V0TG9jYWxVc2VySW5mbyh1c2VySW5mbyk7XG4gICAgcmV0dXJuIHVzZXJJbmZvO1xuICB9XG5cbiAgLyoqXG4gKiDnu5HlrprmiYvmnLrlj7dcbiAqIEBwYXJhbSBwaG9uZU51bWJlclxuICogQHBhcmFtIHBob25lQ29kZVxuICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnu5HlrprmiYvmnLrlj7flpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmxpbmtXaXRoUGhvbmVOdW1iZXIoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huefreS/oemqjOivgeeggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGxpbmtXaXRoUGhvbmVOdW1iZXIocGhvbmVOdW1iZXI6IHN0cmluZywgcGhvbmVDb2RlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLmxpbmtPclVwZGF0ZVBob25lTnVtYmVyJywge1xuICAgICAgcGhvbmVOdW1iZXI6IHRyYW5zZm9ybVBob25lKHBob25lTnVtYmVyKSxcbiAgICAgIHBob25lQ29kZVxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDmm7TmlrDmiYvmnLrlj7dcbiAgICogQHBhcmFtIHBob25lTnVtYmVyXG4gICAqIEBwYXJhbSBwaG9uZUNvZGVcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmm7TmlrDmiYvmnLrlj7flpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKjor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huefreS/oemqjOivgeeggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHVwZGF0ZVBob25lTnVtYmVyKHBob25lTnVtYmVyOiBzdHJpbmcsIHBob25lQ29kZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5saW5rT3JVcGRhdGVQaG9uZU51bWJlcicsIHtcbiAgICAgIHBob25lTnVtYmVyOiB0cmFuc2Zvcm1QaG9uZShwaG9uZU51bWJlciksXG4gICAgICBwaG9uZUNvZGVcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldExvY2FsVXNlckluZm8oa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHsgdXNlckluZm9LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgdXNlckluZm8gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZSh1c2VySW5mb0tleSk7XG4gICAgcmV0dXJuIHVzZXJJbmZvW2tleV07XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoa2V5OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHsgdXNlckluZm9LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgdXNlckluZm8gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHVzZXJJbmZvS2V5KTtcbiAgICByZXR1cm4gdXNlckluZm9ba2V5XTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldFVzZXJJbmZvKCkge1xuICAgIGNvbnN0IHsgdXNlckluZm9LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgdXNlckluZm8gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZSh1c2VySW5mb0tleSk7XG4gICAgW1xuICAgICAgJ3VpZCcsXG4gICAgICAnbG9naW5UeXBlJyxcbiAgICAgICdvcGVuaWQnLFxuICAgICAgJ3d4T3BlbklkJyxcbiAgICAgICd3eFB1YmxpY0lkJyxcbiAgICAgICd1bmlvbklkJyxcbiAgICAgICdxcU1pbmlPcGVuSWQnLFxuICAgICAgJ2VtYWlsJyxcbiAgICAgICdoYXNQYXNzd29yZCcsXG4gICAgICAnY3VzdG9tVXNlcklkJyxcbiAgICAgICduaWNrTmFtZScsXG4gICAgICAnZ2VuZGVyJyxcbiAgICAgICdhdmF0YXJVcmwnLFxuICAgICAgJ3Bob25lJyxcbiAgICAgICd1c2VybmFtZSdcbiAgICBdLmZvckVhY2goaW5mb0tleSA9PiB7XG4gICAgICB0aGlzW2luZm9LZXldID0gdXNlckluZm9baW5mb0tleV07XG4gICAgfSk7XG5cbiAgICB0aGlzLmxvY2F0aW9uID0ge1xuICAgICAgY291bnRyeTogdXNlckluZm9bJ2NvdW50cnknXSxcbiAgICAgIHByb3ZpbmNlOiB1c2VySW5mb1sncHJvdmluY2UnXSxcbiAgICAgIGNpdHk6IHVzZXJJbmZvWydjaXR5J11cbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0TG9jYWxVc2VySW5mbyh1c2VySW5mbzogYW55KSB7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICB0aGlzLl9jYWNoZS5zZXRTdG9yZSh1c2VySW5mb0tleSwgdXNlckluZm8pO1xuICAgIHRoaXMuX3NldFVzZXJJbmZvKCk7XG4gIH1cbn1cbmludGVyZmFjZSBJTG9naW5TdGF0ZU9wdGlvbnMgZXh0ZW5kcyBJVXNlck9wdGlvbnMge1xuICBlbnZJZDogc3RyaW5nO1xufVxuZXhwb3J0IGNsYXNzIExvZ2luU3RhdGUgaW1wbGVtZW50cyBJTG9naW5TdGF0ZSB7XG4gIHB1YmxpYyBjcmVkZW50aWFsOiBJQ3JlZGVudGlhbDtcbiAgcHVibGljIHVzZXI6IElVc2VyO1xuXG4gIHByaXZhdGUgX2NhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG4gIHByaXZhdGUgX2xvZ2luVHlwZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElMb2dpblN0YXRlT3B0aW9ucykge1xuICAgIGNvbnN0IHsgZW52SWQsIGNhY2hlLCByZXF1ZXN0IH0gPSBvcHRpb25zO1xuICAgIGlmICghZW52SWQpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCAnZW52SWQgaXMgbm90IGRlZmluZWQnKTtcbiAgICB9XG4gICAgdGhpcy5fY2FjaGUgPSBjYWNoZTtcblxuICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKHtcbiAgICAgIGNhY2hlLFxuICAgICAgcmVxdWVzdFxuICAgIH0pO1xuICB9XG5cblxuICBwdWJsaWMgYXN5bmMgY2hlY2tMb2NhbFN0YXRlKCkge1xuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5LCBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUocmVmcmVzaFRva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbkV4cGlyZSA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKGFjY2Vzc1Rva2VuRXhwaXJlS2V5KTtcblxuICAgIHRoaXMuY3JlZGVudGlhbCA9IHtcbiAgICAgIHJlZnJlc2hUb2tlbixcbiAgICAgIGFjY2Vzc1Rva2VuLFxuICAgICAgYWNjZXNzVG9rZW5FeHBpcmVcbiAgICB9O1xuXG4gICAgdGhpcy5fbG9naW5UeXBlID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodGhpcy5fY2FjaGUua2V5cy5sb2dpblR5cGVLZXkpO1xuXG4gICAgdGhpcy51c2VyLmNoZWNrTG9jYWxJbmZvKCk7XG4gIH1cbiAgcHVibGljIGFzeW5jIGNoZWNrTG9jYWxTdGF0ZUFzeW5jKCkge1xuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5LCBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW5FeHBpcmUgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5KTtcblxuICAgIHRoaXMuY3JlZGVudGlhbCA9IHtcbiAgICAgIHJlZnJlc2hUb2tlbixcbiAgICAgIGFjY2Vzc1Rva2VuLFxuICAgICAgYWNjZXNzVG9rZW5FeHBpcmVcbiAgICB9O1xuXG4gICAgdGhpcy5fbG9naW5UeXBlID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyh0aGlzLl9jYWNoZS5rZXlzLmxvZ2luVHlwZUtleSk7XG5cblxuICAgIGF3YWl0IHRoaXMudXNlci5jaGVja0xvY2FsSW5mb0FzeW5jKCk7XG4gIH1cblxuICBnZXQgaXNBbm9ueW1vdXNBdXRoKCkge1xuICAgIHJldHVybiB0aGlzLmxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLkFOT05ZTU9VUztcbiAgfVxuXG4gIGdldCBpc0N1c3RvbUF1dGgoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9naW5UeXBlID09PSBMT0dJTlRZUEUuQ1VTVE9NO1xuICB9XG5cbiAgZ2V0IGlzV2VpeGluQXV0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2dpblR5cGUgPT09IExPR0lOVFlQRS5XRUNIQVQgfHwgdGhpcy5sb2dpblR5cGUgPT09IExPR0lOVFlQRS5XRUNIQVRfT1BFTiB8fCB0aGlzLmxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLldFQ0hBVF9QVUJMSUM7XG4gIH1cblxuICBnZXQgaXNVc2VybmFtZUF1dGgoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9naW5UeXBlID09PSBMT0dJTlRZUEUuVVNFUk5BTUU7XG4gIH1cblxuICBnZXQgbG9naW5UeXBlKCkge1xuICAgIHJldHVybiB0aGlzLl9sb2dpblR5cGVcbiAgfVxuXG4gIGdldCBpc1Bob25lQXV0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2dpblR5cGUgPT09IExPR0lOVFlQRS5QSE9ORVxuICB9XG59XG5cbmNsYXNzIEF1dGgge1xuICBwcml2YXRlIHJlYWRvbmx5IF9jb25maWc6IElDbG91ZGJhc2VBdXRoQ29uZmlnO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jYWNoZTogSUNsb3VkYmFzZUNhY2hlXG4gIHByaXZhdGUgcmVhZG9ubHkgX3JlcXVlc3Q6IElDbG91ZGJhc2VSZXF1ZXN0O1xuICBwcml2YXRlIHJlYWRvbmx5IF9ydW50aW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgX2Fub255bW91c0F1dGhQcm92aWRlcjogQW5vbnltb3VzQXV0aFByb3ZpZGVyO1xuICBwcml2YXRlIF9jdXN0b21BdXRoUHJvdmlkZXI6IEN1c3RvbUF1dGhQcm92aWRlcjtcbiAgcHJpdmF0ZSBfd2VpeGluQXV0aFByb3ZpZGVyOiBXZWl4aW5BdXRoUHJvdmlkZXI7XG4gIHByaXZhdGUgX2VtYWlsQXV0aFByb3ZpZGVyOiBFbWFpbEF1dGhQcm92aWRlcjtcbiAgcHJpdmF0ZSBfdXNlcm5hbWVBdXRoUHJvdmlkZXI6IFVzZXJuYW1lQXV0aFByb3ZpZGVyO1xuICBwcml2YXRlIF9waG9uZUF1dGhQcm92aWRlcjogUGhvbmVBdXRoUHJvdmlkZXI7XG4gIC8vIHByaXZhdGUgX2Zyb21BcHA6IElDbG91ZGJhc2VcblxuICBwcml2YXRlIF9vQXV0aDJBdXRoUHJvdmlkZXI6IE9BdXRoMkF1dGhQcm92aWRlcjtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IElDbG91ZGJhc2VBdXRoQ29uZmlnICYgeyBjYWNoZTogSUNsb3VkYmFzZUNhY2hlLCByZXF1ZXN0OiBJQ2xvdWRiYXNlUmVxdWVzdCwgcnVudGltZT86IHN0cmluZyB9KSB7XG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICAgIHRoaXMuX2NhY2hlID0gY29uZmlnLmNhY2hlO1xuICAgIHRoaXMuX3JlcXVlc3QgPSBjb25maWcucmVxdWVzdDtcbiAgICB0aGlzLl9ydW50aW1lID0gY29uZmlnLnJ1bnRpbWUgfHwgUlVOVElNRS5XRUJcbiAgICAvLyB0aGlzLl9mcm9tQXBwID0gY29uZmlnLl9mcm9tQXBwXG5cbiAgICBldmVudEJ1cy5vbihFVkVOVFMuTE9HSU5fVFlQRV9DSEFOR0VELCB0aGlzLl9vbkxvZ2luVHlwZUNoYW5nZWQuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICog6I635Y+W5b2T5YmN55m75b2V55qE55So5oi35L+h5oGvLeWQjOatpVxuICAgKi9cbiAgZ2V0IGN1cnJlbnRVc2VyKCkge1xuICAgIGlmICh0aGlzLl9jYWNoZS5tb2RlID09PSAnYXN5bmMnKSB7XG4gICAgICAvLyBhc3luYyBzdG9yYWdl55qE5bmz5Y+w6LCD55So5q2kQVBJ5o+Q56S6XG4gICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLCAnY3VycmVudCBwbGF0Zm9ybVxcJ3Mgc3RvcmFnZSBpcyBhc3luY2hyb25vdXMsIHBsZWFzZSB1c2UgZ2V0Q3VycmVuVXNlciBpbnN0ZWVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IHRoaXMuaGFzTG9naW5TdGF0ZSgpO1xuXG4gICAgaWYgKGxvZ2luU3RhdGUpIHtcbiAgICAgIHJldHVybiBsb2dpblN0YXRlLnVzZXIgfHwgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gKiDojrflj5blvZPliY3nmbvlvZXnsbvlnost5ZCM5q2lXG4gKi9cbiAgZ2V0IGxvZ2luVHlwZSgpOiBMT0dJTlRZUEUge1xuICAgIHJldHVybiB0aGlzLl9jYWNoZS5nZXRTdG9yZSh0aGlzLl9jYWNoZS5rZXlzLmxvZ2luVHlwZUtleSk7XG4gIH1cblxuICAvKipcbiAgICog6I635Y+W5b2T5YmN55m75b2V55qE55So5oi35L+h5oGvLeW8guatpVxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iOt+WPlueUqOaIt+S/oeaBr+Wksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuZ2V0Q3VycmVuVXNlcigpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGdldEN1cnJlblVzZXIoKSB7XG4gICAgY29uc3QgeyBfZnJvbUFwcCB9ID0gdGhpcy5fY29uZmlnXG4gICAgY29uc3QgYXV0aE9iaiA9IGF3YWl0IGNoZWNrRnJvbUF1dGhWMihfZnJvbUFwcClcbiAgICBjb25zdCB7IGF1dGhUeXBlLCBpbnN0YW5jZSB9ID0gYXV0aE9ialxuICAgIGlmIChhdXRoVHlwZSA9PT0gJ29hdXRoJykge1xuICAgICAgcmV0dXJuIGF3YWl0IGluc3RhbmNlLmdldFVzZXJJbmZvKClcbiAgICB9XG5cbiAgICBjb25zdCBsb2dpblN0YXRlID0gYXdhaXQgdGhpcy5nZXRMb2dpblN0YXRlKCk7XG4gICAgaWYgKGxvZ2luU3RhdGUpIHtcbiAgICAgIGF3YWl0IGxvZ2luU3RhdGUudXNlci5jaGVja0xvY2FsSW5mb0FzeW5jKCk7XG4gICAgICByZXR1cm4gbG9naW5TdGF0ZS51c2VyIHx8IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog6I635Y+W5b2T5YmN55m75b2V57G75Z6LLeW8guatpVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldExvZ2luVHlwZSgpOiBQcm9taXNlPExPR0lOVFlQRT4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHRoaXMuX2NhY2hlLmtleXMubG9naW5UeXBlS2V5KSBhcyBMT0dJTlRZUEU7XG4gIH1cbiAgcHVibGljIGFzeW5jIGdldEFjY2Vzc1Rva2VuKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhY2Nlc3NUb2tlbjogKGF3YWl0IHRoaXMuX3JlcXVlc3QuZ2V0QWNjZXNzVG9rZW4oKSkuYWNjZXNzVG9rZW4sXG4gICAgICBlbnY6IHRoaXMuX2NvbmZpZy5lbnZcbiAgICB9O1xuICB9XG4gIHB1YmxpYyB3ZWl4aW5BdXRoUHJvdmlkZXIoeyBhcHBpZCwgc2NvcGUsIHN0YXRlIH0pOiBXZWl4aW5BdXRoUHJvdmlkZXIge1xuICAgIGlmICghdGhpcy5fd2VpeGluQXV0aFByb3ZpZGVyKSB7XG4gICAgICB0aGlzLl93ZWl4aW5BdXRoUHJvdmlkZXIgPSBuZXcgV2VpeGluQXV0aFByb3ZpZGVyKHtcbiAgICAgICAgLi4udGhpcy5fY29uZmlnLFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3QsXG4gICAgICAgIHJ1bnRpbWU6IHRoaXMuX3J1bnRpbWVcbiAgICAgIH0sIGFwcGlkLCBzY29wZSwgc3RhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fd2VpeGluQXV0aFByb3ZpZGVyO1xuICB9XG4gIHB1YmxpYyBhbm9ueW1vdXNBdXRoUHJvdmlkZXIoKTogQW5vbnltb3VzQXV0aFByb3ZpZGVyIHtcbiAgICBpZiAoIXRoaXMuX2Fub255bW91c0F1dGhQcm92aWRlcikge1xuICAgICAgdGhpcy5fYW5vbnltb3VzQXV0aFByb3ZpZGVyID0gbmV3IEFub255bW91c0F1dGhQcm92aWRlcih7XG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0LFxuICAgICAgICAvLyBfZnJvbUFwcDogdGhpcy5fZnJvbUFwcFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9hbm9ueW1vdXNBdXRoUHJvdmlkZXI7XG4gIH1cbiAgcHVibGljIGN1c3RvbUF1dGhQcm92aWRlcigpOiBDdXN0b21BdXRoUHJvdmlkZXIge1xuICAgIGlmICghdGhpcy5fY3VzdG9tQXV0aFByb3ZpZGVyKSB7XG4gICAgICB0aGlzLl9jdXN0b21BdXRoUHJvdmlkZXIgPSBuZXcgQ3VzdG9tQXV0aFByb3ZpZGVyKHtcbiAgICAgICAgLi4udGhpcy5fY29uZmlnLFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY3VzdG9tQXV0aFByb3ZpZGVyO1xuICB9XG4gIHB1YmxpYyBlbWFpbEF1dGhQcm92aWRlcigpOiBFbWFpbEF1dGhQcm92aWRlciB7XG4gICAgaWYgKCF0aGlzLl9lbWFpbEF1dGhQcm92aWRlcikge1xuICAgICAgdGhpcy5fZW1haWxBdXRoUHJvdmlkZXIgPSBuZXcgRW1haWxBdXRoUHJvdmlkZXIoe1xuICAgICAgICAuLi50aGlzLl9jb25maWcsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9lbWFpbEF1dGhQcm92aWRlcjtcbiAgfVxuICBwdWJsaWMgdXNlcm5hbWVBdXRoUHJvdmlkZXIoKTogVXNlcm5hbWVBdXRoUHJvdmlkZXIge1xuICAgIGlmICghdGhpcy5fdXNlcm5hbWVBdXRoUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuX3VzZXJuYW1lQXV0aFByb3ZpZGVyID0gbmV3IFVzZXJuYW1lQXV0aFByb3ZpZGVyKHtcbiAgICAgICAgLi4udGhpcy5fY29uZmlnLFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdXNlcm5hbWVBdXRoUHJvdmlkZXI7XG4gIH1cblxuICBwdWJsaWMgcGhvbmVBdXRoUHJvdmlkZXIoKTogUGhvbmVBdXRoUHJvdmlkZXIge1xuICAgIGlmICghdGhpcy5fcGhvbmVBdXRoUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuX3Bob25lQXV0aFByb3ZpZGVyID0gbmV3IFBob25lQXV0aFByb3ZpZGVyKHtcbiAgICAgICAgLi4udGhpcy5fY29uZmlnLFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcGhvbmVBdXRoUHJvdmlkZXI7XG4gIH1cblxuICAvKipcbiAgICogb0F1dGgyQXV0aFByb3ZpZGVyXG4gICAqIG9wdGlvbnNcbiAgICoge1xuICAgKiAgIHByb3ZpZGVySWQ6ICdnb29nbGUnLFxuICAgKiAgIHNjb3BlOiAnb3BlbmlkK2VtYWlsK3Byb2ZpbGUnLFxuICAgKiAgIHJlZGlyZWN0VXJpOiAnaHR0cHM6Ly8nXG4gICAqIH1cbiAgICogQHBhcmFtIHtPYmplY3R9ICBvcHRpb25zXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgb3B0aW9ucy5wcm92aWRlcklkICAgICAgICAgICAgLSDkvpvlupTllYZJZO+8jOWmgiBXZUNoYXTjgIFHb29nbGXjgIFHaXRodWIg562JXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgb3B0aW9ucy5jbGllbnRJZCAgICAgICAgICAgICAgLSDlrqLmiLfnq69JZO+8jOW5s+WPsOaPkOS+m+eahOWuouaIt+err+agh+ivhklkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgW29wdGlvbnMucmVzcG9uc2VUeXBlPXRva2VuXSAgLSDlk43lupTnsbvlnovvvJp0b2tlbuOAgWNvZGVcbiAgICogQHBhcmFtIHtzdHJpbmd9ICBvcHRpb25zLnNjb3BlICAgICAgICAgICAgICAgICAtIOadg+mZkOiMg+WbtFxuICAgKiBAcGFyYW0ge3N0cmluZ30gIG9wdGlvbnMucmVkaXJlY3RVcmkgICAgICAgICAgIC0g5o6I5p2D5oiQ5Yqf5Zue6LCD5Zyw5Z2AXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5zeW5jUHJvZmlsZSAgICAgICAgICAgLSDmmK/lkKblkIzmraXnlKjmiLcgUHJvZmlsZSDkv6Hmga9cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmZvcmNlRGlzYWJsZVNpZ25VcCAgICAtIOaYr+WQpuW8uuWItuWFs+mXreeUqOaIt+azqOWGjFxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHVibGljIG9BdXRoMkF1dGhQcm92aWRlcihvcHRpb25zOiBJT0F1dGgyQXV0aFByb3ZpZGVyT3B0aW9ucyA9IHt9KTogT0F1dGgyQXV0aFByb3ZpZGVyIHtcbiAgICBpZiAoIXRoaXMuX29BdXRoMkF1dGhQcm92aWRlcikge1xuICAgICAgdGhpcy5fb0F1dGgyQXV0aFByb3ZpZGVyID0gbmV3IE9BdXRoMkF1dGhQcm92aWRlcih7XG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0LFxuICAgICAgICBydW50aW1lOiB0aGlzLl9ydW50aW1lXG4gICAgICB9LCBvcHRpb25zKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fb0F1dGgyQXV0aFByb3ZpZGVyXG4gIH1cblxuICAvKipcbiAgICogc2lnbldpdGhPQXV0aDJQb3B1cCAtIE9BdXRoMuW8ueeql+eZu+W9lVxuICAgKi9cbiAgcHVibGljIHNpZ25XaXRoT0F1dGgyUG9wdXAoKSB7XG4gICAgdGhpcy5fb0F1dGgyQXV0aFByb3ZpZGVyLnNpZ25JbldpdGhQb3B1cCgpXG4gIH1cblxuICBwdWJsaWMgc2lnbkluV2l0aE9BdXRoMk1vZGFsKGVsZW1JZDogc3RyaW5nKSB7XG4gICAgdGhpcy5fb0F1dGgyQXV0aFByb3ZpZGVyLnNpZ25JbldpdGhNb2RhbChlbGVtSWQpXG4gIH1cblxuICAvKipcbiAgICog55So5oi35ZCN5a+G56CB55m75b2VXG4gICAqIEBwYXJhbSB1c2VybmFtZVxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduSW5XaXRoVXNlcm5hbWVBbmRQYXNzd29yZCh1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlcm5hbWVBdXRoUHJvdmlkZXIoKS5zaWduSW4odXNlcm5hbWUsIHBhc3N3b3JkKTtcbiAgfVxuICAvKipcbiAgICog5qOA5rWL55So5oi35ZCN5piv5ZCm5bey57uP5Y2g55SoXG4gICAqIEBwYXJhbSB1c2VybmFtZVxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iOt+WPlueUqOaIt+aYr+WQpuiiq+WNoOeUqOWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuaXNVc2VybmFtZVJlZ2lzdGVyZWQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBpc1VzZXJuYW1lUmVnaXN0ZXJlZCh1c2VybmFtZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKHR5cGVvZiB1c2VybmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCAndXNlcm5hbWUgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLmlzVXNlcm5hbWVSZWdpc3RlcmVkJywge1xuICAgICAgdXNlcm5hbWVcbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YT8uaXNSZWdpc3RlcmVkO1xuICB9XG4gIC8qKlxuICAgKiDpgq7nrrHlr4bnoIHnmbvlvZVcbiAgICogQHBhcmFtIGVtYWlsXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5lbWFpbEF1dGhQcm92aWRlcigpLnNpZ25JbihlbWFpbCwgcGFzc3dvcmQpO1xuICB9XG4gIC8qKlxuICAgKiDpgq7nrrHlr4bnoIHms6jlhoxcbiAgICogQHBhcmFtIGVtYWlsXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25VcFdpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5lbWFpbEF1dGhQcm92aWRlcigpLnNpZ25VcChlbWFpbCwgcGFzc3dvcmQpO1xuICB9XG4gIC8qKlxuICAgKiDph43nva7pgq7nrrHlr4bnoIFcbiAgICogQHBhcmFtIGVtYWlsXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VuZFBhc3N3b3JkUmVzZXRFbWFpbChlbWFpbDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1haWxBdXRoUHJvdmlkZXIoKS5yZXNldFBhc3N3b3JkKGVtYWlsKTtcbiAgfVxuICAvKipcbiAgICog55m75Ye6XG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn55So5oi355m75Ye65aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5zaWduT3V0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3nlKjmiLfmmK/lkKbkuLrljL/lkI3nmbvlvZXvvIjljL/lkI3nmbvlvZXkuI3mlK/mjIFzaWduT3V077yJJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgc2lnbk91dCgpIHtcbiAgICAvLyDlhbzlrrkgb2F1dGhcbiAgICBjb25zdCB7IF9mcm9tQXBwIH0gPSB0aGlzLl9jb25maWdcbiAgICBjb25zdCBhdXRoT2JqID0gYXdhaXQgY2hlY2tGcm9tQXV0aFYyKF9mcm9tQXBwKVxuICAgIGNvbnN0IHsgYXV0aFR5cGUsIGluc3RhbmNlIH0gPSBhdXRoT2JqXG4gICAgaWYgKGF1dGhUeXBlID09PSAnb2F1dGgnKSB7XG4gICAgICByZXR1cm4gYXdhaXQgaW5zdGFuY2Uuc2lnbk91dCgpXG4gICAgfVxuXG4gICAgY29uc3QgbG9naW5UeXBlID0gYXdhaXQgdGhpcy5nZXRMb2dpblR5cGUoKVxuICAgIC8vIGlmIChsb2dpblR5cGUgPT09IExPR0lOVFlQRS5BTk9OWU1PVVMpIHtcbiAgICAvLyAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgLy8gICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX09QRVJBVElPTixcbiAgICAvLyAgICAgbXNnOiAnYW5vbnltb3VzIHVzZXIgZG9lc25cXCd0IHN1cHBvcnQgc2lnbk91dCBhY3Rpb24nXG4gICAgLy8gICB9KSlcbiAgICAvLyB9XG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXksIGFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbkV4cGlyZUtleSB9ID0gdGhpcy5fY2FjaGUua2V5c1xuXG4gICAgY29uc3QgcmVmcmVzaF90b2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZiAoIXJlZnJlc2hfdG9rZW4pIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChsb2dpblR5cGUuc3RhcnRzV2l0aChPQVVUSDJfTE9HSU5UWVBFX1BSRUZJWCkpIHtcbiAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSlcbiAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuRXhwaXJlID0gTnVtYmVyKGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpKVxuICAgICAgaWYgKGFjY2Vzc1Rva2VuKSB7XG4gICAgICAgIGlmIChEYXRlLm5vdygpIDwgYWNjZXNzVG9rZW5FeHBpcmUpIHtcbiAgICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5mZXRjaCgnL2F1dGgvdjEvcmV2b2tlJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgIHRva2VuOiBhY2Nlc3NUb2tlblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnN0IHNlcUlkRnJvbUhlYWRlciA9IHJlc3AuaGVhZGVycy5nZXQoJ1NlcUlkJykgfHwgcmVzcC5oZWFkZXJzLmdldCgnUmVxdWVzdElkJylcbiAgICAgICAgICBpZiAocmVzcC5zdGF0dXMgPj0gNDAwICYmIHJlc3Auc3RhdHVzIDwgNTAwKSB7XG4gICAgICAgICAgICBjb25zdCBib2R5OiBhbnkgPSBhd2FpdCByZXNwLmpzb24oKVxuICAgICAgICAgICAgY29uc3Qgc2VxSWQgPSBib2R5LnJlcXVlc3RfaWQgfHwgc2VxSWRGcm9tSGVhZGVyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFtPQXV0aDJBdXRoUHJvdmlkZXJdW3N0YXR1czoke3Jlc3Auc3RhdHVzfV1bJHtib2R5LmVycm9yfSgke2JvZHkuZXJyb3JfY29kZX0pXSAke2JvZHkuZXJyb3JfZGVzY3JpcHRpb259ICgke3NlcUlkfSlgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChyZXNwLnN0YXR1cyA+PSA1MDApIHtcbiAgICAgICAgICAgIGNvbnN0IGJvZHk6IGFueSA9IGF3YWl0IHJlc3AuanNvbigpXG4gICAgICAgICAgICBjb25zdCBzZXFJZCA9IGJvZHkucmVxdWVzdF9pZCB8fCBzZXFJZEZyb21IZWFkZXJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgW09BdXRoMkF1dGhQcm92aWRlcl1bc3RhdHVzOiR7cmVzcC5zdGF0dXN9XVske2JvZHkuZXJyb3J9KCR7Ym9keS5lcnJvcl9jb2RlfSldICR7Ym9keS5lcnJvcl9kZXNjcmlwdGlvbn0gKCR7c2VxSWR9KWApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIC8vIGNvbnNvbGUud2FybihgW1NpZ25PdXRdIGFjY2Vzc3Rva2VuIGV4cGlyZWRgKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gY29uc29sZS53YXJuKGBbU2lnbk91dF0gYWNjZXNzdG9rZW4gbm90IGV4aXN0c2ApXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLmxvZ291dCcsIHsgcmVmcmVzaF90b2tlbiB9KVxuICAgIH1cblxuICAgIHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KVxuICAgIHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpXG4gICAgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSlcblxuICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQpXG4gICAgZXZlbnRCdXMuZmlyZShFVkVOVFMuTE9HSU5fVFlQRV9DSEFOR0VELCB7XG4gICAgICBlbnY6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICBsb2dpblR5cGU6IExPR0lOVFlQRS5OVUxMLFxuICAgICAgcGVyc2lzdGVuY2U6IHRoaXMuX2NvbmZpZy5wZXJzaXN0ZW5jZVxuICAgIH0pXG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIHB1YmxpYyBhc3luYyBvbkxvZ2luU3RhdGVDaGFuZ2VkKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGV2ZW50QnVzLm9uKEVWRU5UUy5MT0dJTl9TVEFURV9DSEFOR0VELCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gYXdhaXQgdGhpcy5nZXRMb2dpblN0YXRlKCk7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGxvZ2luU3RhdGUpO1xuICAgIH0pO1xuICAgIC8vIOeri+WIu+aJp+ihjOS4gOasoeWbnuiwg1xuICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBhd2FpdCB0aGlzLmdldExvZ2luU3RhdGUoKTtcbiAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGxvZ2luU3RhdGUpO1xuICB9XG4gIHB1YmxpYyBvbkxvZ2luU3RhdGVFeHBpcmVkKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGV2ZW50QnVzLm9uKEVWRU5UUy5MT0dJTl9TVEFURV9FWFBJUkVELCBjYWxsYmFjay5iaW5kKHRoaXMpKTtcbiAgfVxuICBwdWJsaWMgb25BY2Nlc3NUb2tlblJlZnJlc2hlZChjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBldmVudEJ1cy5vbihFVkVOVFMuQUNDRVNTX1RPS0VOX1JFRlJFU0hELCBjYWxsYmFjay5iaW5kKHRoaXMpKTtcbiAgfVxuICBwdWJsaWMgb25Bbm9ueW1vdXNDb252ZXJ0ZWQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgZXZlbnRCdXMub24oRVZFTlRTLkFOT05ZTU9VU19DT05WRVJURUQsIGNhbGxiYWNrLmJpbmQodGhpcykpO1xuICB9XG4gIHB1YmxpYyBvbkxvZ2luVHlwZUNoYW5nZWQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgZXZlbnRCdXMub24oRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCwgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgbG9naW5TdGF0ZSA9IGF3YWl0IHRoaXMuZ2V0TG9naW5TdGF0ZSgpO1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBsb2dpblN0YXRlKTtcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog6I635Y+W5pys5Zyw55m75b2V5oCBLeWQjOatpVxuICAgKi9cbiAgcHVibGljIGhhc0xvZ2luU3RhdGUoKTogSUxvZ2luU3RhdGUgfCBudWxsIHtcbiAgICAvLyDlhbzlrrlvYXV0aCDpgLvovpHvvIzliKTmlq3lvZPliY3nmbvlvZXkvZPns7sgYXV0aCBvciBvYXV0aFxuICAgIGNvbnN0IHsgX2Zyb21BcHAgfSA9IHRoaXMuX2NvbmZpZ1xuICAgIGNvbnN0IG9hdXRoSW5zdGFuY2UgPSBfZnJvbUFwcC5vYXV0aEluc3RhbmNlXG4gICAgY29uc3Qgb2F1dGhMb2dpblN0YXRlID0gb2F1dGhJbnN0YW5jZT8uaGFzTG9naW5TdGF0ZVN5bmMoKVxuICAgIGlmIChvYXV0aExvZ2luU3RhdGUpIHtcbiAgICAgIHJldHVybiBvYXV0aExvZ2luU3RhdGVcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY2FjaGUubW9kZSA9PT0gJ2FzeW5jJykge1xuICAgICAgLy8gYXN5bmMgc3RvcmFnZeeahOW5s+WPsOiwg+eUqOatpEFQSeaPkOekulxuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwgJ2N1cnJlbnQgcGxhdGZvcm1cXCdzIHN0b3JhZ2UgaXMgYXN5bmNocm9ub3VzLCBwbGVhc2UgdXNlIGdldExvZ2luU3RhdGUgaW5zdGVlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZShyZWZyZXNoVG9rZW5LZXkpO1xuXG4gICAgaWYgKHJlZnJlc2hUb2tlbikge1xuICAgICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgICBsb2dpblN0YXRlLmNoZWNrTG9jYWxTdGF0ZSgpO1xuICAgICAgcmV0dXJuIGxvZ2luU3RhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog6I635Y+W5pys5Zyw55m75b2V5oCBLeW8guatpVxuICAgKiDmraRBUEnkuLrlhbzlrrnlvILmraVzdG9yYWdl55qE5bmz5Y+wXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W5pys5Zyw55m75b2V5oCB5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5nZXRMb2dpblN0YXRlKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0TG9naW5TdGF0ZSgpIHtcbiAgICAvLyDmo4Dmn6XlvZPliY3nmbvlvZXkvZPns7sgYXV0aCBvciBvYXV0aFxuICAgIC8vIGNvbnN0IHsgX2Zyb21BcHAgfSA9IHRoaXMuX2NvbmZpZ1xuICAgIC8vIGNvbnN0IGF1dGhPYmogPSBhd2FpdCBjaGVja0Zyb21BdXRoVjFPclYyKF9mcm9tQXBwKVxuICAgIC8vIGNvbnN0IHsgYXV0aFR5cGUsIGluc3RhbmNlIH0gPSBhdXRoT2JqXG4gICAgLy8gaWYgKGF1dGhUeXBlID09PSAnb2F1dGgnKSB7XG4gICAgLy8gICByZXR1cm4gYXdhaXQgaW5zdGFuY2UuZ2V0TG9naW5TdGF0ZSgpXG4gICAgLy8gfVxuICAgIGNvbnN0IHsgX2Zyb21BcHAgfSA9IHRoaXMuX2NvbmZpZ1xuICAgIGNvbnNvbGUubG9nKCdfZnJvbUFwcCcsIF9mcm9tQXBwKVxuICAgIGNvbnN0IG9hdXRoSW5zdGFuY2UgPSBfZnJvbUFwcC5vYXV0aEluc3RhbmNlIHx8IChfZnJvbUFwcCBhcyBhbnkpLm9hdXRoKClcbiAgICBjb25zb2xlLmxvZygnb2F1dGhJbnN0YW5jZScsIG9hdXRoSW5zdGFuY2UpXG4gICAgY29uc3Qgb2F1dGhMb2dpblN0YXRlID0gb2F1dGhJbnN0YW5jZSAmJiBhd2FpdCBvYXV0aEluc3RhbmNlLmdldExvZ2luU3RhdGUoKVxuICAgIGlmIChvYXV0aExvZ2luU3RhdGUpIHtcbiAgICAgIHJldHVybiBvYXV0aExvZ2luU3RhdGVcbiAgICB9XG5cbiAgICAvLyBhdXRoIOS9k+ezu+i1sOm7mOiupOmAu+i+kVxuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZiAocmVmcmVzaFRva2VuKSB7XG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IGxvZ2luU3RhdGUuY2hlY2tMb2NhbFN0YXRlQXN5bmMoKTtcbiAgICAgIHJldHVybiBsb2dpblN0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuKGhvb2spIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5fcmVxdWVzdC5fc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuSG9vayA9IGhvb2suYmluZCh0aGlzKTtcbiAgfVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W55So5oi35L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g5piv5ZCm5bey55m75b2VJyxcbiAgICAgICcgIDIgLSDosIPnlKggYXV0aCgpLmdldFVzZXJJbmZvKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0VXNlckluZm8oKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBhY3Rpb24gPSAnYXV0aC5nZXRVc2VySW5mbyc7XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoYWN0aW9uLCB7fSk7XG4gICAgaWYgKHJlcy5jb2RlKSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5yZXMuZGF0YSxcbiAgICAgICAgcmVxdWVzdElkOiByZXMuc2VxSWRcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDojrflj5ZIdHRw6Ym05p2DaGVhZGVy77yM55So5LqO5LqR5o6l5YWlIEhUVFAg6K6/6Zeu5LqR5Ye95pWw5pe255qE6Ym05p2DXG4gICAqL1xuICBwdWJsaWMgZ2V0QXV0aEhlYWRlcigpIHtcbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSwgYWNjZXNzVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUocmVmcmVzaFRva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICByZXR1cm4ge1xuICAgICAgJ3gtY2xvdWRiYXNlLWNyZWRlbnRpYWxzJzogYWNjZXNzVG9rZW4gKyAnL0BALycgKyByZWZyZXNoVG9rZW5cbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiDlvILmraXmqKHlvI/ojrflj5ZIdHRw6Ym05p2DaGVhZGVy77yM55So5LqO5LqR5o6l5YWlIEhUVFAg6K6/6Zeu5LqR5Ye95pWw5pe255qE6Ym05p2DXG4gICAqIOiwg+eUqOatpEFQSeS8muWIt+aWsOeZu+W9leaAgVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEF1dGhIZWFkZXJBc3luYygpIHtcbiAgICBhd2FpdCB0aGlzLl9yZXF1ZXN0LnJlZnJlc2hBY2Nlc3NUb2tlbigpO1xuXG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXksIGFjY2Vzc1Rva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIHJldHVybiB7XG4gICAgICAneC1jbG91ZGJhc2UtY3JlZGVudGlhbHMnOiBhY2Nlc3NUb2tlbiArICcvQEAvJyArIHJlZnJlc2hUb2tlblxuICAgIH07XG4gIH1cblxuICAvKipcbiAqIOWPkemAgemqjOivgeeggVxuICogQHBhcmFtIHBob25lTnVtYmVyXG4gKiBAcGFyYW0gcGhvbmVDb2RlXG4gKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+WPkemAgeefreS/oemqjOivgeeggeWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG55+t5L+h6aqM6K+B56CB55m75b2VJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgc2VuZFBob25lQ29kZShwaG9uZU51bWJlcjogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGguc2VuZFBob25lQ29kZScsIHtcbiAgICAgIHBob25lTnVtYmVyOiB0cmFuc2Zvcm1QaG9uZShwaG9uZU51bWJlcilcbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YS5TZW5kU3RhdHVzID09PSAnT2snXG4gIH1cblxuICAvKipcbiAgICog5omL5py655+t5L+h5rOo5YaMXG4gICAqIEBwYXJhbSBlbWFpbFxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduVXBXaXRoUGhvbmVDb2RlKHBob25lTnVtYmVyOiBzdHJpbmcsIHBob25lQ29kZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMucGhvbmVBdXRoUHJvdmlkZXIoKS5zaWduVXAocGhvbmVOdW1iZXIsIHBob25lQ29kZSwgcGFzc3dvcmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIOaJi+acuumqjOivgeeggSBvciDlr4bnoIHnmbvlvZVcbiAgICogQHBhcmFtIGVtYWlsXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbldpdGhQaG9uZUNvZGVPclBhc3N3b3JkKHBhcmFtOiB7XG4gICAgcGhvbmVOdW1iZXI6IHN0cmluZ1xuICAgIHBob25lQ29kZT86IHN0cmluZ1xuICAgIHBhc3N3b3JkPzogc3RyaW5nXG4gICAgc2lnbk1ldGhvZD86IHN0cmluZ1xuICB9KSB7XG4gICAgcmV0dXJuIHRoaXMucGhvbmVBdXRoUHJvdmlkZXIoKS5zaWduSW4ocGFyYW0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGZvcmNlUmVzZXRQd2RCeVBob25lQ29kZShwYXJhbToge1xuICAgIHBob25lTnVtYmVyOiBzdHJpbmdcbiAgICBwaG9uZUNvZGU6IHN0cmluZ1xuICAgIHBhc3N3b3JkOiBzdHJpbmdcbiAgfSkge1xuICAgIHJldHVybiB0aGlzLnBob25lQXV0aFByb3ZpZGVyKCkuc2lnbkluKHtcbiAgICAgIC4uLnBhcmFtLFxuICAgICAgc2lnbk1ldGhvZDogU0lHTl9NRVRIT0QuRk9SQ0VSRVNFVFBXRFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfb25Mb2dpblR5cGVDaGFuZ2VkKGV2KSB7XG4gICAgY29uc3QgeyBsb2dpblR5cGUsIHBlcnNpc3RlbmNlLCBlbnYgfSA9IGV2LmRhdGE7XG4gICAgaWYgKGVudiAhPT0gdGhpcy5fY29uZmlnLmVudikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDnmbvlvZXmgIHovazlj5jlkI7ov4Hnp7tjYWNoZe+8jOmYsuatouWcqOWMv+WQjeeZu+W9leeKtuaAgeS4i2NhY2hl5re355SoXG4gICAgYXdhaXQgdGhpcy5fY2FjaGUudXBkYXRlUGVyc2lzdGVuY2VBc3luYyhwZXJzaXN0ZW5jZSk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyh0aGlzLl9jYWNoZS5rZXlzLmxvZ2luVHlwZUtleSwgbG9naW5UeXBlKTtcbiAgfVxufVxuXG5jb25zdCBFVkVOVFMgPSB7XG4gIC8vIOeZu+W9leaAgeaUueWPmOWQjuinpuWPkVxuICBMT0dJTl9TVEFURV9DSEFOR0VEOiAnbG9naW5TdGF0ZUNoYW5nZWQnLFxuICAvLyDnmbvlvZXmgIHov4fmnJ/lkI7op6blj5FcbiAgTE9HSU5fU1RBVEVfRVhQSVJFRDogJ2xvZ2luU3RhdGVFeHBpcmUnLFxuICAvLyDnmbvlvZXnsbvlnovmlLnlj5jlkI7op6blj5FcbiAgTE9HSU5fVFlQRV9DSEFOR0VEOiAnbG9naW5UeXBlQ2hhbmdlZCcsXG4gIC8vIOWMv+WQjei0puaIt+iiq+i9rOato+WQjuinpuWPkVxuICBBTk9OWU1PVVNfQ09OVkVSVEVEOiAnYW5vbnltb3VzQ29udmVydGVkJyxcbiAgLy8gYWNjZXNzIHRva2Vu5Yi35paw5ZCO6Kem5Y+RXG4gIEFDQ0VTU19UT0tFTl9SRUZSRVNIRDogJ3JlZnJlc2hBY2Nlc3NUb2tlbidcbn07XG5cbmNvbnN0IGNvbXBvbmVudDogSUNsb3VkYmFzZUNvbXBvbmVudCA9IHtcbiAgbmFtZTogQ09NUE9ORU5UX05BTUUsXG4gIG5hbWVzcGFjZTogJ2F1dGgnLFxuICBpbmplY3RFdmVudHM6IHtcbiAgICBidXM6IGV2ZW50QnVzLFxuICAgIGV2ZW50czogW1xuICAgICAgRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCxcbiAgICAgIEVWRU5UUy5MT0dJTl9TVEFURV9FWFBJUkVELFxuICAgICAgRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQsXG4gICAgICBFVkVOVFMuQUNDRVNTX1RPS0VOX1JFRlJFU0hELFxuICAgICAgRVZFTlRTLkFOT05ZTU9VU19DT05WRVJURURcbiAgICBdXG4gIH0sXG4gIGVudGl0eTogZnVuY3Rpb24gKGNvbmZpZzogUGljazxJQ2xvdWRiYXNlQXV0aENvbmZpZywgJ3JlZ2lvbicgfCAncGVyc2lzdGVuY2UnPiA9IHsgcmVnaW9uOiAnJywgcGVyc2lzdGVuY2U6ICdsb2NhbCcgfSkge1xuICAgIGlmICh0aGlzLmF1dGhJbnN0YW5jZSkge1xuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwgJ2V2ZXJ5IGNsb3VkYmFzZSBpbnN0YW5jZSBzaG91bGQgaGFzIG9ubHkgb25lIGF1dGggb2JqZWN0Jyk7XG4gICAgICByZXR1cm4gdGhpcy5hdXRoSW5zdGFuY2U7XG4gICAgfVxuICAgIGNvbnN0IHsgYWRhcHRlciwgcnVudGltZSB9ID0gdGhpcy5wbGF0Zm9ybTtcbiAgICAvLyDlpoLkuI3mmI7noa7mjIflrppwZXJzaXN0ZW5jZeWImeS8mOWFiOWPluWQhOW5s+WPsGFkYXB0ZXLpppbpgInvvIzlhbbmrKFzZXNzaW9uXG4gICAgY29uc3QgbmV3UGVyc2lzdGVuY2UgPSBjb25maWcucGVyc2lzdGVuY2UgfHwgYWRhcHRlci5wcmltYXJ5U3RvcmFnZTtcbiAgICBpZiAobmV3UGVyc2lzdGVuY2UgJiYgKG5ld1BlcnNpc3RlbmNlICE9PSB0aGlzLmNvbmZpZy5wZXJzaXN0ZW5jZSkpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29uZmlnKHsgcGVyc2lzdGVuY2U6IG5ld1BlcnNpc3RlbmNlIH0pXG4gICAgfVxuXG4gICAgY29uc3QgeyBlbnYsIHBlcnNpc3RlbmNlLCBkZWJ1ZyB9ID0gdGhpcy5jb25maWc7XG4gICAgdGhpcy5hdXRoSW5zdGFuY2UgPSBuZXcgQXV0aCh7XG4gICAgICBlbnYsXG4gICAgICByZWdpb246IGNvbmZpZy5yZWdpb24sXG4gICAgICBwZXJzaXN0ZW5jZSxcbiAgICAgIGRlYnVnLFxuICAgICAgY2FjaGU6IHRoaXMuY2FjaGUsXG4gICAgICByZXF1ZXN0OiB0aGlzLnJlcXVlc3QsXG4gICAgICBydW50aW1lOiBydW50aW1lLFxuICAgICAgX2Zyb21BcHA6IHRoaXNcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5hdXRoSW5zdGFuY2U7XG4gIH1cbn1cblxudHJ5IHtcbiAgLy8g5bCd6K+V6Ieq5Yqo5rOo5YaM6Iez5YWo5bGA5Y+Y6YePY2xvdWRiYXNlXG4gIC8vIOatpOihjOS4uuWPquWcqOa1j+iniOWZqOeOr+Wig+S4i+acieaViFxuICBjbG91ZGJhc2UucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbn0gY2F0Y2ggKGUpIHsgfVxuXG5leHBvcnQge1xuICBVc2VySW5mbyxcbiAgQXV0aCxcbiAgQXV0aFByb3ZpZGVyLFxuICBFVkVOVFMsXG4gIGV2ZW50QnVzXG59O1xuLyoqXG4gKiBAYXBpIOaJi+WKqOazqOWGjOiHs2Nsb3VkYmFzZSBhcHBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQXV0aChhcHA6IFBpY2s8SUNsb3VkYmFzZSwgJ3JlZ2lzdGVyQ29tcG9uZW50Jz4pIHtcbiAgdHJ5IHtcbiAgICBhcHAucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUud2FybihlKTtcbiAgfVxufVxuXG50eXBlIElQcm92aWRlciA9IG5ldyAoLi4uYXJnczogYW55W10pID0+IGFueTtcbi8qKlxuICog5rOo5YaMcHJvdmlkZXLvvIzlpoLmnpxcbiAqIEBwYXJhbSBuYW1lXG4gKiBAcGFyYW0gcHJvdmlkZXJcbiAqIEBleGFtcGxlXG4gKiAvLyDms6jlhoxcbiAqIHJlZ2lzdGVyUHJvdmlkZXIoJ2VtYWlsQXV0aFByb3ZpZGVyJyxmdW5jdGlvbigpe1xuICogICAvLyAuLi5cbiAqIH0pO1xuICogLy8g5L2/55So5pawcHJvdmlkZXLnmbvlvZVcbiAqIGNsb3VkYmFzZS5hdXRoKCkuZW1haWxBdXRoUHJvdmlkZXIoKS5zaWduSW4oKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyUHJvdmlkZXIobmFtZTogc3RyaW5nLCBwcm92aWRlcjogSVByb3ZpZGVyKSB7XG4gIGNvbnN0IHByb3RvID0gQXV0aC5wcm90b3R5cGU7XG4gIHByb3RvW25hbWVdID0gZnVuY3Rpb24gKG9wdGlvbnM6IG9iamVjdCkge1xuICAgIGNvbnN0IHByaXZhdGVOYW1lID0gYF8ke25hbWV9YDtcbiAgICBpZiAoIXRoaXNbcHJpdmF0ZU5hbWVdKSB7XG4gICAgICB0aGlzW3ByaXZhdGVOYW1lXSA9IG5ldyBwcm92aWRlcih7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzW3ByaXZhdGVOYW1lXTtcbiAgfTtcbn0iXX0=