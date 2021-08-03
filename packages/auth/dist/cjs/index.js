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
var phoneAuthProvider_1 = require("./providers/phoneAuthProvider");
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
    Auth.prototype.phoneAuthProvider = function () {
        if (!this._phoneAuthProvider) {
            this._phoneAuthProvider = new phoneAuthProvider_1.PhoneAuthProvider(__assign(__assign({}, this._config), { cache: this._cache, request: this._request }));
        }
        return this._phoneAuthProvider;
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
            var _a, refreshTokenKey, accessTokenKey, accessTokenExpireKey, action, refresh_token, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._cache.keys, refreshTokenKey = _a.refreshTokenKey, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey;
                        action = 'auth.logout';
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 1:
                        refresh_token = _b.sent();
                        if (!refresh_token) {
                            return [2];
                        }
                        return [4, this._request.send(action, { refresh_token: refresh_token })];
                    case 2:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrREFBbUY7QUFLbkYscUVBQW9FO0FBQ3BFLDJFQUEwRTtBQUMxRSxxRUFBb0U7QUFDcEUseUNBQXdDO0FBQ3hDLHlDQUFnRDtBQTg4QjlDLDZGQTk4Qk8sbUJBQVksT0E4OEJQO0FBNzhCZCxtRUFBa0U7QUFDbEUseUVBQXdFO0FBQ3hFLG1FQUE4RTtBQUl0RSxJQUFBLHFCQUFxQixHQUFLLGtCQUFNLHNCQUFYLENBQVk7QUFDakMsSUFBQSxPQUFPLEdBQUssb0JBQVEsUUFBYixDQUFjO0FBQ3JCLElBQUEsU0FBUyxHQUFpQyxpQkFBSyxVQUF0QyxFQUFFLFVBQVUsR0FBcUIsaUJBQUssV0FBMUIsRUFBRSxjQUFjLEdBQUssaUJBQUssZUFBVixDQUFXO0FBQ2hELElBQUEsTUFBTSxHQUF5QixxQkFBUyxPQUFsQyxFQUFFLGtCQUFrQixHQUFLLHFCQUFTLG1CQUFkLENBQWU7QUFDekMsSUFBQSxvQkFBb0IsR0FBSyxtQkFBTyxxQkFBWixDQUFhO0FBRXpDLElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQztBQWM5QixJQUFNLFFBQVEsR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7QUFxN0IzQyw0QkFBUTtBQTk2QlY7SUF5QkUsY0FBWSxPQUFxQjtRQUN2QixJQUFBLEtBQUssR0FBYyxPQUFPLE1BQXJCLEVBQUUsT0FBTyxHQUFLLE9BQU8sUUFBWixDQUFhO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBRXhCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBSVksNkJBQWMsR0FBM0I7OztnQkFDRSxJ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Q0FBQztJQUM3QixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxPQUFlO1FBQ3JDLElBQU0sV0FBVyxHQUFHLE1BQUksSUFBTSxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksUUFBUSx1QkFDM0IsT0FBTyxHQUNQLElBQUksQ0FBQyxPQUFPLEVBQ2YsQ0FBQztTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQVpELDRDQVlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNsb3VkYmFzZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuaW1wb3J0IHsgZXZlbnRzLCBhZGFwdGVycywgdXRpbHMsIGNvbnN0YW50cywgaGVscGVycyB9IGZyb20gJ0BjbG91ZGJhc2UvdXRpbGl0aWVzJztcbmltcG9ydCB7IElDbG91ZGJhc2VDYWNoZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY2FjaGUnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZVJlcXVlc3QgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL3JlcXVlc3QnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUF1dGhDb25maWcsIElDcmVkZW50aWFsLCBJVXNlciwgSVVzZXJJbmZvLCBJQXV0aFByb3ZpZGVyLCBJTG9naW5TdGF0ZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvYXV0aCc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ29tcG9uZW50IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jb21wb25lbnQnO1xuaW1wb3J0IHsgV2VpeGluQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvd2VpeGluQXV0aFByb3ZpZGVyJztcbmltcG9ydCB7IEFub255bW91c0F1dGhQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2Fub255bW91c0F1dGhQcm92aWRlcic7XG5pbXBvcnQgeyBDdXN0b21BdXRoUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9jdXN0b21BdXRoUHJvdmlkZXInO1xuaW1wb3J0IHsgTE9HSU5UWVBFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvYmFzZSc7XG5pbXBvcnQgeyBFbWFpbEF1dGhQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2VtYWlsQXV0aFByb3ZpZGVyJztcbmltcG9ydCB7IFVzZXJuYW1lQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvdXNlcm5hbWVBdXRoUHJvdmlkZXInO1xuaW1wb3J0IHsgUGhvbmVBdXRoUHJvdmlkZXIsIFNJR05fTUVUSE9EIH0gZnJvbSAnLi9wcm92aWRlcnMvcGhvbmVBdXRoUHJvdmlkZXInXG5cbmRlY2xhcmUgY29uc3QgY2xvdWRiYXNlOiBJQ2xvdWRiYXNlO1xuXG5jb25zdCB7IENsb3VkYmFzZUV2ZW50RW1pdHRlciB9ID0gZXZlbnRzO1xuY29uc3QgeyBSVU5USU1FIH0gPSBhZGFwdGVycztcbmNvbnN0IHsgcHJpbnRXYXJuLCB0aHJvd0Vycm9yLCB0cmFuc2Zvcm1QaG9uZSB9ID0gdXRpbHM7XG5jb25zdCB7IEVSUk9SUywgQ09NTVVOSVRZX1NJVEVfVVJMIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IGNhdGNoRXJyb3JzRGVjb3JhdG9yIH0gPSBoZWxwZXJzO1xuXG5jb25zdCBDT01QT05FTlRfTkFNRSA9ICdhdXRoJztcblxuaW50ZXJmYWNlIFVzZXJJbmZvIHtcbiAgb3BlbmlkOiBzdHJpbmc7XG4gIG5pY2tuYW1lPzogc3RyaW5nO1xuICBzZXg/OiBudW1iZXI7XG4gIHByb3ZpbmNlPzogc3RyaW5nO1xuICBjaXR5Pzogc3RyaW5nO1xuICBjb3VudHJ5Pzogc3RyaW5nO1xuICBoZWFkaW1ndXJsPzogc3RyaW5nO1xuICBwcml2aWxlZ2U/OiBbc3RyaW5nXTtcbiAgdW5pb25pZD86IHN0cmluZztcbn1cblxuY29uc3QgZXZlbnRCdXMgPSBuZXcgQ2xvdWRiYXNlRXZlbnRFbWl0dGVyKCk7XG5cbmludGVyZmFjZSBJVXNlck9wdGlvbnMge1xuICBjYWNoZTogSUNsb3VkYmFzZUNhY2hlO1xuICByZXF1ZXN0OiBJQ2xvdWRiYXNlUmVxdWVzdDtcbn1cblxuY2xhc3MgVXNlciBpbXBsZW1lbnRzIElVc2VyIHtcbiAgcHVibGljIHVpZDogc3RyaW5nO1xuICBwdWJsaWMgbG9naW5UeXBlOiBzdHJpbmc7XG4gIHB1YmxpYyBvcGVuaWQ6IHN0cmluZztcbiAgcHVibGljIHd4T3BlbklkOiBzdHJpbmc7XG4gIHB1YmxpYyB3eFB1YmxpY0lkOiBzdHJpbmc7XG4gIHB1YmxpYyB1bmlvbklkOiBzdHJpbmc7XG4gIHB1YmxpYyBxcU1pbmlPcGVuSWQ6IHN0cmluZztcbiAgcHVibGljIGN1c3RvbVVzZXJJZDogc3RyaW5nO1xuICBwdWJsaWMgbmlja05hbWU6IHN0cmluZztcbiAgcHVibGljIGdlbmRlcjogc3RyaW5nO1xuICBwdWJsaWMgYXZhdGFyVXJsOiBzdHJpbmc7XG4gIHB1YmxpYyBlbWFpbDogc3RyaW5nO1xuICBwdWJsaWMgaGFzUGFzc3dvcmQ6IGJvb2xlYW47XG4gIHB1YmxpYyBwaG9uZT86IHN0cmluZztcbiAgcHVibGljIHVzZXJuYW1lPzogc3RyaW5nO1xuICBwdWJsaWMgbG9jYXRpb24/OiB7XG4gICAgY291bnRyeT86IHN0cmluZztcbiAgICBwcm92aW5jZT86IHN0cmluZztcbiAgICBjaXR5Pzogc3RyaW5nO1xuICB9O1xuXG4gIHByaXZhdGUgX2NhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG4gIHByaXZhdGUgX3JlcXVlc3Q6IElDbG91ZGJhc2VSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElVc2VyT3B0aW9ucykge1xuICAgIGNvbnN0IHsgY2FjaGUsIHJlcXVlc3QgfSA9IG9wdGlvbnM7XG4gICAgdGhpcy5fY2FjaGUgPSBjYWNoZTtcbiAgICB0aGlzLl9yZXF1ZXN0ID0gcmVxdWVzdDtcblxuICAgIHRoaXMuX3NldFVzZXJJbmZvKCk7XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluacrOWcsOeUqOaIt+S/oeaBry3lkIzmraVcbiAgICovXG4gIHB1YmxpYyBhc3luYyBjaGVja0xvY2FsSW5mbygpIHtcbiAgICB0aGlzLnVpZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3VpZCcpO1xuICAgIHRoaXMubG9naW5UeXBlID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnbG9naW5UeXBlJyk7XG4gICAgdGhpcy5vcGVuaWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd3eE9wZW5JZCcpO1xuICAgIHRoaXMud3hPcGVuSWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd3eE9wZW5JZCcpO1xuICAgIHRoaXMud3hQdWJsaWNJZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3d4UHVibGljSWQnKTtcbiAgICB0aGlzLnVuaW9uSWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd3eFVuaW9uSWQnKTtcbiAgICB0aGlzLnFxTWluaU9wZW5JZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3FxTWluaU9wZW5JZCcpO1xuICAgIHRoaXMuY3VzdG9tVXNlcklkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnY3VzdG9tVXNlcklkJyk7XG4gICAgdGhpcy5uaWNrTmFtZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ25pY2tOYW1lJyk7XG4gICAgdGhpcy5nZW5kZXIgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdnZW5kZXInKTtcbiAgICB0aGlzLmF2YXRhclVybCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2F2YXRhclVybCcpO1xuICAgIHRoaXMuZW1haWwgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdlbWFpbCcpO1xuICAgIHRoaXMuaGFzUGFzc3dvcmQgPSBCb29sZWFuKHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2hhc1Bhc3N3b3JkJykpO1xuICAgIHRoaXMucGhvbmUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdwaG9uZScpXG4gICAgdGhpcy51c2VybmFtZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3VzZXJuYW1lJylcbiAgICB0aGlzLmxvY2F0aW9uID0ge1xuICAgICAgY291bnRyeTogdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnY291bnRyeScpLFxuICAgICAgcHJvdmluY2U6IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3Byb3ZpbmNlJyksXG4gICAgICBjaXR5OiB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdjaXR5JylcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnlKjmiLfkv6Hmga8t5byC5q2lXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hlY2tMb2NhbEluZm9Bc3luYygpIHtcbiAgICB0aGlzLnVpZCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygndWlkJyk7XG4gICAgdGhpcy5sb2dpblR5cGUgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2xvZ2luVHlwZScpO1xuICAgIHRoaXMub3BlbmlkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd3eE9wZW5JZCcpO1xuICAgIHRoaXMud3hPcGVuSWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3d4T3BlbklkJyk7XG4gICAgdGhpcy53eFB1YmxpY0lkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd3eFB1YmxpY0lkJyk7XG4gICAgdGhpcy51bmlvbklkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd3eFVuaW9uSWQnKTtcbiAgICB0aGlzLnFxTWluaU9wZW5JZCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygncXFNaW5pT3BlbklkJyk7XG4gICAgdGhpcy5jdXN0b21Vc2VySWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2N1c3RvbVVzZXJJZCcpO1xuICAgIHRoaXMubmlja05hbWUgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ25pY2tOYW1lJyk7XG4gICAgdGhpcy5nZW5kZXIgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2dlbmRlcicpO1xuICAgIHRoaXMuYXZhdGFyVXJsID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdhdmF0YXJVcmwnKTtcbiAgICB0aGlzLmVtYWlsID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdlbWFpbCcpO1xuICAgIHRoaXMuaGFzUGFzc3dvcmQgPSBCb29sZWFuKGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnaGFzUGFzc3dvcmQnKSk7XG4gICAgdGhpcy5waG9uZSA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygncGhvbmUnKVxuICAgIHRoaXMudXNlcm5hbWUgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3VzZXJuYW1lJylcbiAgICB0aGlzLmxvY2F0aW9uID0ge1xuICAgICAgY291bnRyeTogYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdjb3VudHJ5JyksXG4gICAgICBwcm92aW5jZTogYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdwcm92aW5jZScpLFxuICAgICAgY2l0eTogYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdjaXR5JylcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIOWwhuW9k+WJjei0puaIt+S4juiHquWumuS5ieeZu+W9lSBUaWNrZXQg6L+b6KGM57uR5a6a77yM57uR5a6a5LmL5ZCO5L6/5Y+v5Lul6YCa6L+H6Ieq5a6a5LmJ55m75b2V55m75b2V5b2T5YmN5LqR5byA5Y+R6LSm5oi344CCXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aWNrZXQg6Ieq5a6a5LmJ55m75b2VdGlja2V0XG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn57uR5a6a6Ieq5a6a5LmJ55m75b2V5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIubGlua1dpdGhUaWNrZXQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOatpOi0puaIt+aYr+WQpuW3sue7j+e7keWumuiHquWumuS5ieeZu+W9lScsXG4gICAgICAnICAzIC0gdGlja2V0IOWPguaVsOaYr+WQpuW9kuWxnuW9k+WJjeeOr+WigycsXG4gICAgICAnICA0IC0g5Yib5bu6IHRpY2tldCDnmoToh6rlrprkuYnnmbvlvZXnp4HpkqXmmK/lkKbov4fmnJ8nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBsaW5rV2l0aFRpY2tldCh0aWNrZXQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0eXBlb2YgdGlja2V0ICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aWNrZXQgbXVzdCBiZSBzdHJpbmcnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5saW5rV2l0aFRpY2tldCcsIHsgdGlja2V0IH0pO1xuICB9XG4gIC8qKlxuICAgKiDlsIblvZPliY3otKbmiLfkuI7nrKzkuInmlrnpibTmnYPmj5DkvpvmlrnvvIzku6Xph43lrprlkJHnmoTlvaLlvI/vvIzov5vooYznu5HlrprvvIznu5HlrprkuYvlkI7kvr/lj6/ku6XpgJrov4fnrKzkuInmlrnpibTmnYPmj5DkvpvmlrnnmbvlvZXlvZPliY3nmoTkupHlvIDlj5HotKbmiLfjgIJcbiAgICogQHBhcmFtIHByb3ZpZGVyIOeJueWumueZu+W9leaWueW8j+eahHByb3ZpZGVy77yM5b+F6aG75YW35aSHc2lnbkluV2l0aFJlZGlyZWN05pa55rOVXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn57uR5a6a56ys5LiJ5pa555m75b2V5pa55byP5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIubGlua1dpdGhSZWRpcmVjdCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5q2k6LSm5oi35piv5ZCm5bey57uP57uR5a6a5q2k56ys5LiJ5pa5JyxcbiAgICAgICcgIDMgLSDmraTnrKzkuInmlrnmmK/lkKblt7Lnu4/mjojmnYMnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBsaW5rV2l0aFJlZGlyZWN0KHByb3ZpZGVyOiBJQXV0aFByb3ZpZGVyKTogdm9pZCB7XG4gICAgcHJvdmlkZXIuc2lnbkluV2l0aFJlZGlyZWN0KCk7XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluW9k+WJjei0puaIt+eahOW+ruS/oSBVbmlvbklEIOe7keWumueahOS6keW8gOWPkei0puaIt+WIl+ihqOOAguWmguaenOW9k+WJjei0puaIt+S4jeWtmOWcqCBVbmlvbklE77yM5Lya6L+U5Zue6ZSZ6K+v44CCXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W6LSm5oi35YiX6KGo5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIuZ2V0TGlua2VkVWlkTGlzdCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGdldExpbmtlZFVpZExpc3QoKSB7XG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGguZ2V0TGlua2VkVWlkTGlzdCcsIHt9KTtcbiAgICBsZXQgaGFzUHJpbWFyeVVpZCA9IGZhbHNlO1xuICAgIGNvbnN0IHVzZXJzID0gZGF0YS51c2VycyBhcyBJVXNlckluZm9bXTtcbiAgICBmb3IgKGNvbnN0IHVzZXIgb2YgdXNlcnMpIHtcbiAgICAgIGlmICh1c2VyLnd4T3BlbklkICYmIHVzZXIud3hQdWJsaWNJZCkge1xuICAgICAgICBoYXNQcmltYXJ5VWlkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB1c2VycyxcbiAgICAgIGhhc1ByaW1hcnlVaWRcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiDorr7nva7lvq7kv6HkuLvotKblj7fvvIzpgJrluLjmkK3phY3lkowgVXNlci5nZXRMaW5rZWRVaWRMaXN0KCkg5L2/55So77yM55So5LqO5Zyo5ZCM5Liq5b6u5L+hIFVuaW9uSUQg5a+55bqU55qE5aSa5Liq5LqR5byA5Y+R6LSm5Y+35Lit77yM6K6+572u5YW25Lit5LiA5Liq5Li65Li76LSm5Y+3XG4gICAqIOiuvue9ruS5i+WQju+8jOmAmui/hyBVbmlvbklEIOeZu+W9leS+v+S8mueZu+W9leiHs+S4u+i0puWPt+S5i+S4iuOAglxuICAgKiBAcGFyYW0gdWlkXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6K6+572u5b6u5L+h5Li76LSm5Y+35aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIuc2V0UHJpbWFyeVVpZCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIHNldFByaW1hcnlVaWQodWlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnNldFByaW1hcnlVaWQnLCB7IHVpZCB9KTtcbiAgfVxuICAvKipcbiAgICog6Kej57uR5p+Q5Liq55m75b2V5pa55byPXG4gICAqIEBwYXJhbSBsb2dpblR5cGVcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmjqXop6bnu5HlrprlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci51bmxpbmsoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjei0puaIt+aYr+WQpuW3sue7j+S4juatpOeZu+W9leaWueW8j+ino+e7kScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIHVubGluayhsb2dpblR5cGU6ICdDVVNUT00nIHwgJ1dFQ0hBVC1PUEVOJyB8ICdXRUNIQVQtUFVCTElDJyB8ICdXRUNIQVQtVU5JT04nIHwgJ1BIT05FJykge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGgudW5saW5rJywgeyBwbGF0Zm9ybTogbG9naW5UeXBlIH0pO1xuICB9XG4gIC8qKlxuICAgKiDmm7TmlrDnlKjmiLfkv6Hmga9cbiAgICogQHBhcmFtIHVzZXJJbmZvXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw55So5oi35L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDnlKjmiLfkv6Hmga/kuK3mmK/lkKbljIXlkKvpnZ7ms5XlgLwnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUodXNlckluZm86IElVc2VySW5mbyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgbmlja05hbWUsIGdlbmRlciwgYXZhdGFyVXJsLCBwcm92aW5jZSwgY291bnRyeSwgY2l0eSB9ID0gdXNlckluZm87XG4gICAgY29uc3QgeyBkYXRhOiBuZXdVc2VySW5mbyB9ID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnVwZGF0ZVVzZXJJbmZvJywgeyBuaWNrTmFtZSwgZ2VuZGVyLCBhdmF0YXJVcmwsIHByb3ZpbmNlLCBjb3VudHJ5LCBjaXR5IH0pO1xuICAgIHRoaXMuX3NldExvY2FsVXNlckluZm8obmV3VXNlckluZm8pO1xuICB9XG4gIC8qKlxuICAgKiDmm7TmlrDlr4bnoIFcbiAgICogQHBhcmFtIG5ld1Bhc3N3b3JkXG4gICAqIEBwYXJhbSBvbGRQYXNzd29yZFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+abtOaWsOWvhueggeWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnVwZGF0ZVBhc3N3b3JkKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDMgLSDmlrDlr4bnoIHkuK3mmK/lkKbljIXlkKvpnZ7ms5XlrZfnrKYnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyB1cGRhdGVQYXNzd29yZChuZXdQYXNzd29yZDogc3RyaW5nLCBvbGRQYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC51cGRhdGVQYXNzd29yZCcsIHtcbiAgICAgIG9sZFBhc3N3b3JkLFxuICAgICAgbmV3UGFzc3dvcmRcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog5pu05paw6YKu566x5Zyw5Z2AXG4gICAqIEBwYXJhbSBuZXdFbWFpbFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+abtOaWsOmCrueuseWcsOWdgOWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnVwZGF0ZUVtYWlsKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobpgq7nrrHlr4bnoIHnmbvlvZUnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyB1cGRhdGVFbWFpbChuZXdFbWFpbDogc3RyaW5nLCBwYXNzd29yZD86IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGgudXBkYXRlRW1haWwnLCB7XG4gICAgICBuZXdFbWFpbCxcbiAgICAgIHBhc3N3b3JkXG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOabtOaWsOeUqOaIt+WQjVxuICAgKiBAcGFyYW0gdXNlcm5hbWVcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmm7TmlrDnlKjmiLflkI3lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci51cGRhdGVVc2VybmFtZSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG55So5oi35ZCN5a+G56CB55m75b2VJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgdXBkYXRlVXNlcm5hbWUodXNlcm5hbWU6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgdXNlcm5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ3VzZXJuYW1lIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnVwZGF0ZVVzZXJuYW1lJywge1xuICAgICAgdXNlcm5hbWVcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog5Yi35paw5pys5Zyw55So5oi35L+h5oGv44CC5b2T55So5oi35Zyo5YW25LuW5a6i5oi356uv5pu05paw55So5oi35L+h5oGv5LmL5ZCO77yM5Y+v5Lul6LCD55So5q2k5o6l5Y+j5ZCM5q2l5pu05paw5LmL5ZCO55qE5L+h5oGv44CCXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5Yi35paw5pys5Zyw55So5oi35L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIucmVmcmVzaCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHJlZnJlc2goKTogUHJvbWlzZTxJVXNlckluZm8+IHtcbiAgICBjb25zdCBhY3Rpb24gPSAnYXV0aC5nZXRVc2VySW5mbyc7XG4gICAgY29uc3QgeyBkYXRhOiB1c2VySW5mbyB9ID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKGFjdGlvbiwge30pO1xuICAgIHRoaXMuX3NldExvY2FsVXNlckluZm8odXNlckluZm8pO1xuICAgIHJldHVybiB1c2VySW5mbztcbiAgfVxuXG4gIC8qKlxuICog57uR5a6a5omL5py65Y+3XG4gKiBAcGFyYW0gcGhvbmVOdW1iZXJcbiAqIEBwYXJhbSBwaG9uZUNvZGVcbiAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn57uR5a6a5omL5py65Y+35aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5saW5rV2l0aFBob25lTnVtYmVyKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobnn63kv6Hpqozor4HnoIHnmbvlvZUnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBsaW5rV2l0aFBob25lTnVtYmVyKHBob25lTnVtYmVyOiBzdHJpbmcsIHBob25lQ29kZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5saW5rT3JVcGRhdGVQaG9uZU51bWJlcicsIHtcbiAgICAgIHBob25lTnVtYmVyOiB0cmFuc2Zvcm1QaG9uZShwaG9uZU51bWJlciksXG4gICAgICBwaG9uZUNvZGVcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog5pu05paw5omL5py65Y+3XG4gICAqIEBwYXJhbSBwaG9uZU51bWJlclxuICAgKiBAcGFyYW0gcGhvbmVDb2RlXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw5omL5py65Y+35aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55So6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobnn63kv6Hpqozor4HnoIHnmbvlvZUnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyB1cGRhdGVQaG9uZU51bWJlcihwaG9uZU51bWJlcjogc3RyaW5nLCBwaG9uZUNvZGU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGgubGlua09yVXBkYXRlUGhvbmVOdW1iZXInLCB7XG4gICAgICBwaG9uZU51bWJlcjogdHJhbnNmb3JtUGhvbmUocGhvbmVOdW1iZXIpLFxuICAgICAgcGhvbmVDb2RlXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRMb2NhbFVzZXJJbmZvKGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodXNlckluZm9LZXkpO1xuICAgIHJldHVybiB1c2VySW5mb1trZXldO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfZ2V0TG9jYWxVc2VySW5mb0FzeW5jKGtleTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyh1c2VySW5mb0tleSk7XG4gICAgcmV0dXJuIHVzZXJJbmZvW2tleV07XG4gIH1cblxuICBwcml2YXRlIF9zZXRVc2VySW5mbygpIHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodXNlckluZm9LZXkpO1xuICAgIFtcbiAgICAgICd1aWQnLFxuICAgICAgJ2xvZ2luVHlwZScsXG4gICAgICAnb3BlbmlkJyxcbiAgICAgICd3eE9wZW5JZCcsXG4gICAgICAnd3hQdWJsaWNJZCcsXG4gICAgICAndW5pb25JZCcsXG4gICAgICAncXFNaW5pT3BlbklkJyxcbiAgICAgICdlbWFpbCcsXG4gICAgICAnaGFzUGFzc3dvcmQnLFxuICAgICAgJ2N1c3RvbVVzZXJJZCcsXG4gICAgICAnbmlja05hbWUnLFxuICAgICAgJ2dlbmRlcicsXG4gICAgICAnYXZhdGFyVXJsJyxcbiAgICAgICdwaG9uZScsXG4gICAgICAndXNlcm5hbWUnXG4gICAgXS5mb3JFYWNoKGluZm9LZXkgPT4ge1xuICAgICAgdGhpc1tpbmZvS2V5XSA9IHVzZXJJbmZvW2luZm9LZXldO1xuICAgIH0pO1xuXG4gICAgdGhpcy5sb2NhdGlvbiA9IHtcbiAgICAgIGNvdW50cnk6IHVzZXJJbmZvWydjb3VudHJ5J10sXG4gICAgICBwcm92aW5jZTogdXNlckluZm9bJ3Byb3ZpbmNlJ10sXG4gICAgICBjaXR5OiB1c2VySW5mb1snY2l0eSddXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldExvY2FsVXNlckluZm8odXNlckluZm86IGFueSkge1xuICAgIGNvbnN0IHsgdXNlckluZm9LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgdGhpcy5fY2FjaGUuc2V0U3RvcmUodXNlckluZm9LZXksIHVzZXJJbmZvKTtcbiAgICB0aGlzLl9zZXRVc2VySW5mbygpO1xuICB9XG59XG5pbnRlcmZhY2UgSUxvZ2luU3RhdGVPcHRpb25zIGV4dGVuZHMgSVVzZXJPcHRpb25zIHtcbiAgZW52SWQ6IHN0cmluZztcbn1cbmV4cG9ydCBjbGFzcyBMb2dpblN0YXRlIGltcGxlbWVudHMgSUxvZ2luU3RhdGUge1xuICBwdWJsaWMgY3JlZGVudGlhbDogSUNyZWRlbnRpYWw7XG4gIHB1YmxpYyB1c2VyOiBJVXNlcjtcblxuICBwcml2YXRlIF9jYWNoZTogSUNsb3VkYmFzZUNhY2hlO1xuICBwcml2YXRlIF9sb2dpblR5cGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJTG9naW5TdGF0ZU9wdGlvbnMpIHtcbiAgICBjb25zdCB7IGVudklkLCBjYWNoZSwgcmVxdWVzdCB9ID0gb3B0aW9ucztcbiAgICBpZiAoIWVudklkKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ2VudklkIGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuICAgIHRoaXMuX2NhY2hlID0gY2FjaGU7XG5cbiAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcih7XG4gICAgICBjYWNoZSxcbiAgICAgIHJlcXVlc3RcbiAgICB9KTtcbiAgfVxuXG5cbiAgcHVibGljIGFzeW5jIGNoZWNrTG9jYWxTdGF0ZSgpIHtcbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSwgYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuRXhwaXJlS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKHJlZnJlc2hUb2tlbktleSk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZShhY2Nlc3NUb2tlbktleSk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW5FeHBpcmUgPSB0aGlzLl9jYWNoZS5nZXRTdG9yZShhY2Nlc3NUb2tlbkV4cGlyZUtleSk7XG5cbiAgICB0aGlzLmNyZWRlbnRpYWwgPSB7XG4gICAgICByZWZyZXNoVG9rZW4sXG4gICAgICBhY2Nlc3NUb2tlbixcbiAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlXG4gICAgfTtcblxuICAgIHRoaXMuX2xvZ2luVHlwZSA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKHRoaXMuX2NhY2hlLmtleXMubG9naW5UeXBlS2V5KTtcblxuICAgIHRoaXMudXNlci5jaGVja0xvY2FsSW5mbygpO1xuICB9XG4gIHB1YmxpYyBhc3luYyBjaGVja0xvY2FsU3RhdGVBc3luYygpIHtcbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSwgYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuRXhwaXJlS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuRXhwaXJlID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSk7XG5cbiAgICB0aGlzLmNyZWRlbnRpYWwgPSB7XG4gICAgICByZWZyZXNoVG9rZW4sXG4gICAgICBhY2Nlc3NUb2tlbixcbiAgICAgIGFjY2Vzc1Rva2VuRXhwaXJlXG4gICAgfTtcblxuICAgIHRoaXMuX2xvZ2luVHlwZSA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmModGhpcy5fY2FjaGUua2V5cy5sb2dpblR5cGVLZXkpO1xuXG5cbiAgICBhd2FpdCB0aGlzLnVzZXIuY2hlY2tMb2NhbEluZm9Bc3luYygpO1xuICB9XG5cbiAgZ2V0IGlzQW5vbnltb3VzQXV0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2dpblR5cGUgPT09IExPR0lOVFlQRS5BTk9OWU1PVVM7XG4gIH1cblxuICBnZXQgaXNDdXN0b21BdXRoKCkge1xuICAgIHJldHVybiB0aGlzLmxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLkNVU1RPTTtcbiAgfVxuXG4gIGdldCBpc1dlaXhpbkF1dGgoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9naW5UeXBlID09PSBMT0dJTlRZUEUuV0VDSEFUIHx8IHRoaXMubG9naW5UeXBlID09PSBMT0dJTlRZUEUuV0VDSEFUX09QRU4gfHwgdGhpcy5sb2dpblR5cGUgPT09IExPR0lOVFlQRS5XRUNIQVRfUFVCTElDO1xuICB9XG5cbiAgZ2V0IGlzVXNlcm5hbWVBdXRoKCkge1xuICAgIHJldHVybiB0aGlzLmxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLlVTRVJOQU1FO1xuICB9XG5cbiAgZ2V0IGxvZ2luVHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbG9naW5UeXBlXG4gIH1cblxuICBnZXQgaXNQaG9uZUF1dGgoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9naW5UeXBlID09PSBMT0dJTlRZUEUuUEhPTkVcbiAgfVxufVxuXG5jbGFzcyBBdXRoIHtcbiAgcHJpdmF0ZSByZWFkb25seSBfY29uZmlnOiBJQ2xvdWRiYXNlQXV0aENvbmZpZztcbiAgcHJpdmF0ZSByZWFkb25seSBfY2FjaGU6IElDbG91ZGJhc2VDYWNoZVxuICBwcml2YXRlIHJlYWRvbmx5IF9yZXF1ZXN0OiBJQ2xvdWRiYXNlUmVxdWVzdDtcbiAgcHJpdmF0ZSByZWFkb25seSBfcnVudGltZTogc3RyaW5nO1xuICBwcml2YXRlIF9hbm9ueW1vdXNBdXRoUHJvdmlkZXI6IEFub255bW91c0F1dGhQcm92aWRlcjtcbiAgcHJpdmF0ZSBfY3VzdG9tQXV0aFByb3ZpZGVyOiBDdXN0b21BdXRoUHJvdmlkZXI7XG4gIHByaXZhdGUgX3dlaXhpbkF1dGhQcm92aWRlcjogV2VpeGluQXV0aFByb3ZpZGVyO1xuICBwcml2YXRlIF9lbWFpbEF1dGhQcm92aWRlcjogRW1haWxBdXRoUHJvdmlkZXI7XG4gIHByaXZhdGUgX3VzZXJuYW1lQXV0aFByb3ZpZGVyOiBVc2VybmFtZUF1dGhQcm92aWRlcjtcbiAgcHJpdmF0ZSBfcGhvbmVBdXRoUHJvdmlkZXI6IFBob25lQXV0aFByb3ZpZGVyO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSUNsb3VkYmFzZUF1dGhDb25maWcgJiB7IGNhY2hlOiBJQ2xvdWRiYXNlQ2FjaGUsIHJlcXVlc3Q6IElDbG91ZGJhc2VSZXF1ZXN0LCBydW50aW1lPzogc3RyaW5nIH0pIHtcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gICAgdGhpcy5fY2FjaGUgPSBjb25maWcuY2FjaGU7XG4gICAgdGhpcy5fcmVxdWVzdCA9IGNvbmZpZy5yZXF1ZXN0O1xuICAgIHRoaXMuX3J1bnRpbWUgPSBjb25maWcucnVudGltZSB8fCBSVU5USU1FLldFQlxuXG4gICAgZXZlbnRCdXMub24oRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCwgdGhpcy5fb25Mb2dpblR5cGVDaGFuZ2VkLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluW9k+WJjeeZu+W9leeahOeUqOaIt+S/oeaBry3lkIzmraVcbiAgICovXG4gIGdldCBjdXJyZW50VXNlcigpIHtcbiAgICBpZiAodGhpcy5fY2FjaGUubW9kZSA9PT0gJ2FzeW5jJykge1xuICAgICAgLy8gYXN5bmMgc3RvcmFnZeeahOW5s+WPsOiwg+eUqOatpEFQSeaPkOekulxuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwgJ2N1cnJlbnQgcGxhdGZvcm1cXCdzIHN0b3JhZ2UgaXMgYXN5bmNocm9ub3VzLCBwbGVhc2UgdXNlIGdldEN1cnJlblVzZXIgaW5zdGVlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGxvZ2luU3RhdGUgPSB0aGlzLmhhc0xvZ2luU3RhdGUoKTtcblxuICAgIGlmIChsb2dpblN0YXRlKSB7XG4gICAgICByZXR1cm4gbG9naW5TdGF0ZS51c2VyIHx8IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICog6I635Y+W5b2T5YmN55m75b2V57G75Z6LLeWQjOatpVxuICovXG4gIGdldCBsb2dpblR5cGUoKTogTE9HSU5UWVBFIHtcbiAgICByZXR1cm4gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodGhpcy5fY2FjaGUua2V5cy5sb2dpblR5cGVLZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluW9k+WJjeeZu+W9leeahOeUqOaIt+S/oeaBry3lvILmraVcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5bnlKjmiLfkv6Hmga/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmdldEN1cnJlblVzZXIoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRDdXJyZW5Vc2VyKCkge1xuICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBhd2FpdCB0aGlzLmdldExvZ2luU3RhdGUoKTtcbiAgICBpZiAobG9naW5TdGF0ZSkge1xuICAgICAgYXdhaXQgbG9naW5TdGF0ZS51c2VyLmNoZWNrTG9jYWxJbmZvQXN5bmMoKTtcbiAgICAgIHJldHVybiBsb2dpblN0YXRlLnVzZXIgfHwgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDojrflj5blvZPliY3nmbvlvZXnsbvlnost5byC5q2lXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0TG9naW5UeXBlKCk6IFByb21pc2U8TE9HSU5UWVBFPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmModGhpcy5fY2FjaGUua2V5cy5sb2dpblR5cGVLZXkpIGFzIExPR0lOVFlQRTtcbiAgfVxuICBwdWJsaWMgYXN5bmMgZ2V0QWNjZXNzVG9rZW4oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjY2Vzc1Rva2VuOiAoYXdhaXQgdGhpcy5fcmVxdWVzdC5nZXRBY2Nlc3NUb2tlbigpKS5hY2Nlc3NUb2tlbixcbiAgICAgIGVudjogdGhpcy5fY29uZmlnLmVudlxuICAgIH07XG4gIH1cbiAgcHVibGljIHdlaXhpbkF1dGhQcm92aWRlcih7IGFwcGlkLCBzY29wZSwgc3RhdGUgfSk6IFdlaXhpbkF1dGhQcm92aWRlciB7XG4gICAgaWYgKCF0aGlzLl93ZWl4aW5BdXRoUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuX3dlaXhpbkF1dGhQcm92aWRlciA9IG5ldyBXZWl4aW5BdXRoUHJvdmlkZXIoe1xuICAgICAgICAuLi50aGlzLl9jb25maWcsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdCxcbiAgICAgICAgcnVudGltZTogdGhpcy5fcnVudGltZVxuICAgICAgfSwgYXBwaWQsIHNjb3BlLCBzdGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl93ZWl4aW5BdXRoUHJvdmlkZXI7XG4gIH1cbiAgcHVibGljIGFub255bW91c0F1dGhQcm92aWRlcigpOiBBbm9ueW1vdXNBdXRoUHJvdmlkZXIge1xuICAgIGlmICghdGhpcy5fYW5vbnltb3VzQXV0aFByb3ZpZGVyKSB7XG4gICAgICB0aGlzLl9hbm9ueW1vdXNBdXRoUHJvdmlkZXIgPSBuZXcgQW5vbnltb3VzQXV0aFByb3ZpZGVyKHtcbiAgICAgICAgLi4udGhpcy5fY29uZmlnLFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYW5vbnltb3VzQXV0aFByb3ZpZGVyO1xuICB9XG4gIHB1YmxpYyBjdXN0b21BdXRoUHJvdmlkZXIoKTogQ3VzdG9tQXV0aFByb3ZpZGVyIHtcbiAgICBpZiAoIXRoaXMuX2N1c3RvbUF1dGhQcm92aWRlcikge1xuICAgICAgdGhpcy5fY3VzdG9tQXV0aFByb3ZpZGVyID0gbmV3IEN1c3RvbUF1dGhQcm92aWRlcih7XG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2N1c3RvbUF1dGhQcm92aWRlcjtcbiAgfVxuICBwdWJsaWMgZW1haWxBdXRoUHJvdmlkZXIoKTogRW1haWxBdXRoUHJvdmlkZXIge1xuICAgIGlmICghdGhpcy5fZW1haWxBdXRoUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuX2VtYWlsQXV0aFByb3ZpZGVyID0gbmV3IEVtYWlsQXV0aFByb3ZpZGVyKHtcbiAgICAgICAgLi4udGhpcy5fY29uZmlnLFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZW1haWxBdXRoUHJvdmlkZXI7XG4gIH1cbiAgcHVibGljIHVzZXJuYW1lQXV0aFByb3ZpZGVyKCk6IFVzZXJuYW1lQXV0aFByb3ZpZGVyIHtcbiAgICBpZiAoIXRoaXMuX3VzZXJuYW1lQXV0aFByb3ZpZGVyKSB7XG4gICAgICB0aGlzLl91c2VybmFtZUF1dGhQcm92aWRlciA9IG5ldyBVc2VybmFtZUF1dGhQcm92aWRlcih7XG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3VzZXJuYW1lQXV0aFByb3ZpZGVyO1xuICB9XG5cbiAgcHVibGljIHBob25lQXV0aFByb3ZpZGVyKCk6IFBob25lQXV0aFByb3ZpZGVyIHtcbiAgICBpZiAoIXRoaXMuX3Bob25lQXV0aFByb3ZpZGVyKSB7XG4gICAgICB0aGlzLl9waG9uZUF1dGhQcm92aWRlciA9IG5ldyBQaG9uZUF1dGhQcm92aWRlcih7XG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3Bob25lQXV0aFByb3ZpZGVyO1xuICB9XG4gIC8qKlxuICAgKiDnlKjmiLflkI3lr4bnoIHnmbvlvZVcbiAgICogQHBhcmFtIHVzZXJuYW1lXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbldpdGhVc2VybmFtZUFuZFBhc3N3b3JkKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy51c2VybmFtZUF1dGhQcm92aWRlcigpLnNpZ25Jbih1c2VybmFtZSwgcGFzc3dvcmQpO1xuICB9XG4gIC8qKlxuICAgKiDmo4DmtYvnlKjmiLflkI3mmK/lkKblt7Lnu4/ljaDnlKhcbiAgICogQHBhcmFtIHVzZXJuYW1lXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W55So5oi35piv5ZCm6KKr5Y2g55So5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5pc1VzZXJuYW1lUmVnaXN0ZXJlZCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGlzVXNlcm5hbWVSZWdpc3RlcmVkKHVzZXJuYW1lOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAodHlwZW9mIHVzZXJuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3dFcnJvcihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsICd1c2VybmFtZSBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGguaXNVc2VybmFtZVJlZ2lzdGVyZWQnLCB7XG4gICAgICB1c2VybmFtZVxuICAgIH0pO1xuICAgIHJldHVybiBkYXRhPy5pc1JlZ2lzdGVyZWQ7XG4gIH1cbiAgLyoqXG4gICAqIOmCrueuseWvhueggeeZu+W9lVxuICAgKiBAcGFyYW0gZW1haWxcbiAgICogQHBhcmFtIHBhc3N3b3JkXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmVtYWlsQXV0aFByb3ZpZGVyKCkuc2lnbkluKGVtYWlsLCBwYXNzd29yZCk7XG4gIH1cbiAgLyoqXG4gICAqIOmCrueuseWvhueggeazqOWGjFxuICAgKiBAcGFyYW0gZW1haWxcbiAgICogQHBhcmFtIHBhc3N3b3JkXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnblVwV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmVtYWlsQXV0aFByb3ZpZGVyKCkuc2lnblVwKGVtYWlsLCBwYXNzd29yZCk7XG4gIH1cbiAgLyoqXG4gICAqIOmHjee9rumCrueuseWvhueggVxuICAgKiBAcGFyYW0gZW1haWxcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZW5kUGFzc3dvcmRSZXNldEVtYWlsKGVtYWlsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5lbWFpbEF1dGhQcm92aWRlcigpLnJlc2V0UGFzc3dvcmQoZW1haWwpO1xuICB9XG4gIC8qKlxuICAgKiDnmbvlh7pcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnlKjmiLfnmbvlh7rlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLnNpZ25PdXQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeUqOaIt+aYr+WQpuS4uuWMv+WQjeeZu+W9le+8iOWMv+WQjeeZu+W9leS4jeaUr+aMgXNpZ25PdXTvvIknLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBzaWduT3V0KCkge1xuICAgIC8vIGNvbnN0IGxvZ2luVHlwZSA9IGF3YWl0IHRoaXMuZ2V0TG9naW5UeXBlKCk7XG4gICAgLy8gaWYgKGxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLkFOT05ZTU9VUykge1xuICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAvLyAgICAgY29kZTogRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLFxuICAgIC8vICAgICBtc2c6ICdhbm9ueW1vdXMgdXNlciBkb2VzblxcJ3Qgc3VwcG9ydCBzaWduT3V0IGFjdGlvbidcbiAgICAvLyAgIH0pKTtcbiAgICAvLyB9XG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXksIGFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbkV4cGlyZUtleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCBhY3Rpb24gPSAnYXV0aC5sb2dvdXQnO1xuXG4gICAgY29uc3QgcmVmcmVzaF90b2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZiAoIXJlZnJlc2hfdG9rZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKGFjdGlvbiwgeyByZWZyZXNoX3Rva2VuIH0pO1xuXG4gICAgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgIHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpO1xuXG4gICAgZXZlbnRCdXMuZmlyZShFVkVOVFMuTE9HSU5fU1RBVEVfQ0hBTkdFRCk7XG4gICAgZXZlbnRCdXMuZmlyZShFVkVOVFMuTE9HSU5fVFlQRV9DSEFOR0VELCB7XG4gICAgICBlbnY6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICBsb2dpblR5cGU6IExPR0lOVFlQRS5OVUxMLFxuICAgICAgcGVyc2lzdGVuY2U6IHRoaXMuX2NvbmZpZy5wZXJzaXN0ZW5jZVxuICAgIH0pO1xuXG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIHB1YmxpYyBhc3luYyBvbkxvZ2luU3RhdGVDaGFuZ2VkKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGV2ZW50QnVzLm9uKEVWRU5UUy5MT0dJTl9TVEFURV9DSEFOR0VELCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gYXdhaXQgdGhpcy5nZXRMb2dpblN0YXRlKCk7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGxvZ2luU3RhdGUpO1xuICAgIH0pO1xuICAgIC8vIOeri+WIu+aJp+ihjOS4gOasoeWbnuiwg1xuICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBhd2FpdCB0aGlzLmdldExvZ2luU3RhdGUoKTtcbiAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGxvZ2luU3RhdGUpO1xuICB9XG4gIHB1YmxpYyBvbkxvZ2luU3RhdGVFeHBpcmVkKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGV2ZW50QnVzLm9uKEVWRU5UUy5MT0dJTl9TVEFURV9FWFBJUkVELCBjYWxsYmFjay5iaW5kKHRoaXMpKTtcbiAgfVxuICBwdWJsaWMgb25BY2Nlc3NUb2tlblJlZnJlc2hlZChjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBldmVudEJ1cy5vbihFVkVOVFMuQUNDRVNTX1RPS0VOX1JFRlJFU0hELCBjYWxsYmFjay5iaW5kKHRoaXMpKTtcbiAgfVxuICBwdWJsaWMgb25Bbm9ueW1vdXNDb252ZXJ0ZWQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgZXZlbnRCdXMub24oRVZFTlRTLkFOT05ZTU9VU19DT05WRVJURUQsIGNhbGxiYWNrLmJpbmQodGhpcykpO1xuICB9XG4gIHB1YmxpYyBvbkxvZ2luVHlwZUNoYW5nZWQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgZXZlbnRCdXMub24oRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCwgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgbG9naW5TdGF0ZSA9IGF3YWl0IHRoaXMuZ2V0TG9naW5TdGF0ZSgpO1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBsb2dpblN0YXRlKTtcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog6I635Y+W5pys5Zyw55m75b2V5oCBLeWQjOatpVxuICAgKi9cbiAgcHVibGljIGhhc0xvZ2luU3RhdGUoKTogSUxvZ2luU3RhdGUgfCBudWxsIHtcbiAgICBpZiAodGhpcy5fY2FjaGUubW9kZSA9PT0gJ2FzeW5jJykge1xuICAgICAgLy8gYXN5bmMgc3RvcmFnZeeahOW5s+WPsOiwg+eUqOatpEFQSeaPkOekulxuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwgJ2N1cnJlbnQgcGxhdGZvcm1cXCdzIHN0b3JhZ2UgaXMgYXN5bmNocm9ub3VzLCBwbGVhc2UgdXNlIGdldExvZ2luU3RhdGUgaW5zdGVlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZShyZWZyZXNoVG9rZW5LZXkpO1xuXG4gICAgaWYgKHJlZnJlc2hUb2tlbikge1xuICAgICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgICBsb2dpblN0YXRlLmNoZWNrTG9jYWxTdGF0ZSgpO1xuICAgICAgcmV0dXJuIGxvZ2luU3RhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog6I635Y+W5pys5Zyw55m75b2V5oCBLeW8guatpVxuICAgKiDmraRBUEnkuLrlhbzlrrnlvILmraVzdG9yYWdl55qE5bmz5Y+wXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W5pys5Zyw55m75b2V5oCB5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5nZXRMb2dpblN0YXRlKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0TG9naW5TdGF0ZSgpIHtcbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgaWYgKHJlZnJlc2hUb2tlbikge1xuICAgICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBsb2dpblN0YXRlLmNoZWNrTG9jYWxTdGF0ZUFzeW5jKCk7XG4gICAgICByZXR1cm4gbG9naW5TdGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbihob29rKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMuX3JlcXVlc3QuX3Nob3VsZFJlZnJlc2hBY2Nlc3NUb2tlbkhvb2sgPSBob29rLmJpbmQodGhpcyk7XG4gIH1cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iOt+WPlueUqOaIt+S/oeaBr+Wksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOaYr+WQpuW3sueZu+W9lScsXG4gICAgICAnICAyIC0g6LCD55SoIGF1dGgoKS5nZXRVc2VySW5mbygpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGdldFVzZXJJbmZvKCk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgYWN0aW9uID0gJ2F1dGguZ2V0VXNlckluZm8nO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKGFjdGlvbiwge30pO1xuICAgIGlmIChyZXMuY29kZSkge1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ucmVzLmRhdGEsXG4gICAgICAgIHJlcXVlc3RJZDogcmVzLnNlcUlkXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog6I635Y+WSHR0cOmJtOadg2hlYWRlcu+8jOeUqOS6juS6keaOpeWFpSBIVFRQIOiuv+mXruS6keWHveaVsOaXtueahOmJtOadg1xuICAgKi9cbiAgcHVibGljIGdldEF1dGhIZWFkZXIoKSB7XG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXksIGFjY2Vzc1Rva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKHJlZnJlc2hUb2tlbktleSk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZShhY2Nlc3NUb2tlbktleSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICd4LWNsb3VkYmFzZS1jcmVkZW50aWFscyc6IGFjY2Vzc1Rva2VuICsgJy9AQC8nICsgcmVmcmVzaFRva2VuXG4gICAgfTtcbiAgfVxuICAvKipcbiAgICog5byC5q2l5qih5byP6I635Y+WSHR0cOmJtOadg2hlYWRlcu+8jOeUqOS6juS6keaOpeWFpSBIVFRQIOiuv+mXruS6keWHveaVsOaXtueahOmJtOadg1xuICAgKiDosIPnlKjmraRBUEnkvJrliLfmlrDnmbvlvZXmgIFcbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRBdXRoSGVhZGVyQXN5bmMoKSB7XG4gICAgYXdhaXQgdGhpcy5fcmVxdWVzdC5yZWZyZXNoQWNjZXNzVG9rZW4oKTtcblxuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5LCBhY2Nlc3NUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICByZXR1cm4ge1xuICAgICAgJ3gtY2xvdWRiYXNlLWNyZWRlbnRpYWxzJzogYWNjZXNzVG9rZW4gKyAnL0BALycgKyByZWZyZXNoVG9rZW5cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gKiDlj5HpgIHpqozor4HnoIFcbiAqIEBwYXJhbSBwaG9uZU51bWJlclxuICogQHBhcmFtIHBob25lQ29kZVxuICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICflj5HpgIHnn63kv6Hpqozor4HnoIHlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKjor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huefreS/oemqjOivgeeggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHNlbmRQaG9uZUNvZGUocGhvbmVOdW1iZXI6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnNlbmRQaG9uZUNvZGUnLCB7XG4gICAgICBwaG9uZU51bWJlcjogdHJhbnNmb3JtUGhvbmUocGhvbmVOdW1iZXIpXG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGEuU2VuZFN0YXR1cyA9PT0gJ09rJ1xuICB9XG5cbiAgLyoqXG4gICAqIOaJi+acuuefreS/oeazqOWGjFxuICAgKiBAcGFyYW0gZW1haWxcbiAgICogQHBhcmFtIHBhc3N3b3JkXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnblVwV2l0aFBob25lQ29kZShwaG9uZU51bWJlcjogc3RyaW5nLCBwaG9uZUNvZGU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnBob25lQXV0aFByb3ZpZGVyKCkuc2lnblVwKHBob25lTnVtYmVyLCBwaG9uZUNvZGUsIHBhc3N3b3JkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmiYvmnLrpqozor4HnoIEgb3Ig5a+G56CB55m75b2VXG4gICAqIEBwYXJhbSBlbWFpbFxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduSW5XaXRoUGhvbmVDb2RlT3JQYXNzd29yZChwYXJhbToge1xuICAgIHBob25lTnVtYmVyOiBzdHJpbmdcbiAgICBwaG9uZUNvZGU/OiBzdHJpbmdcbiAgICBwYXNzd29yZD86IHN0cmluZ1xuICAgIHNpZ25NZXRob2Q/OiBzdHJpbmdcbiAgfSkge1xuICAgIHJldHVybiB0aGlzLnBob25lQXV0aFByb3ZpZGVyKCkuc2lnbkluKHBhcmFtKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBmb3JjZVJlc2V0UHdkQnlQaG9uZUNvZGUocGFyYW06IHtcbiAgICBwaG9uZU51bWJlcjogc3RyaW5nXG4gICAgcGhvbmVDb2RlOiBzdHJpbmdcbiAgICBwYXNzd29yZDogc3RyaW5nXG4gIH0pIHtcbiAgICByZXR1cm4gdGhpcy5waG9uZUF1dGhQcm92aWRlcigpLnNpZ25Jbih7XG4gICAgICAuLi5wYXJhbSxcbiAgICAgIHNpZ25NZXRob2Q6IFNJR05fTUVUSE9ELkZPUkNFUkVTRVRQV0RcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX29uTG9naW5UeXBlQ2hhbmdlZChldikge1xuICAgIGNvbnN0IHsgbG9naW5UeXBlLCBwZXJzaXN0ZW5jZSwgZW52IH0gPSBldi5kYXRhO1xuICAgIGlmIChlbnYgIT09IHRoaXMuX2NvbmZpZy5lbnYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8g55m75b2V5oCB6L2s5Y+Y5ZCO6L+B56e7Y2FjaGXvvIzpmLLmraLlnKjljL/lkI3nmbvlvZXnirbmgIHkuItjYWNoZea3t+eUqFxuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnVwZGF0ZVBlcnNpc3RlbmNlQXN5bmMocGVyc2lzdGVuY2UpO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmModGhpcy5fY2FjaGUua2V5cy5sb2dpblR5cGVLZXksIGxvZ2luVHlwZSk7XG4gIH1cbn1cblxuY29uc3QgRVZFTlRTID0ge1xuICAvLyDnmbvlvZXmgIHmlLnlj5jlkI7op6blj5FcbiAgTE9HSU5fU1RBVEVfQ0hBTkdFRDogJ2xvZ2luU3RhdGVDaGFuZ2VkJyxcbiAgLy8g55m75b2V5oCB6L+H5pyf5ZCO6Kem5Y+RXG4gIExPR0lOX1NUQVRFX0VYUElSRUQ6ICdsb2dpblN0YXRlRXhwaXJlJyxcbiAgLy8g55m75b2V57G75Z6L5pS55Y+Y5ZCO6Kem5Y+RXG4gIExPR0lOX1RZUEVfQ0hBTkdFRDogJ2xvZ2luVHlwZUNoYW5nZWQnLFxuICAvLyDljL/lkI3otKbmiLfooqvovazmraPlkI7op6blj5FcbiAgQU5PTllNT1VTX0NPTlZFUlRFRDogJ2Fub255bW91c0NvbnZlcnRlZCcsXG4gIC8vIGFjY2VzcyB0b2tlbuWIt+aWsOWQjuinpuWPkVxuICBBQ0NFU1NfVE9LRU5fUkVGUkVTSEQ6ICdyZWZyZXNoQWNjZXNzVG9rZW4nXG59O1xuXG5jb25zdCBjb21wb25lbnQ6IElDbG91ZGJhc2VDb21wb25lbnQgPSB7XG4gIG5hbWU6IENPTVBPTkVOVF9OQU1FLFxuICBuYW1lc3BhY2U6ICdhdXRoJyxcbiAgaW5qZWN0RXZlbnRzOiB7XG4gICAgYnVzOiBldmVudEJ1cyxcbiAgICBldmVudHM6IFtcbiAgICAgIEVWRU5UUy5MT0dJTl9UWVBFX0NIQU5HRUQsXG4gICAgICBFVkVOVFMuTE9HSU5fU1RBVEVfRVhQSVJFRCxcbiAgICAgIEVWRU5UUy5MT0dJTl9TVEFURV9DSEFOR0VELFxuICAgICAgRVZFTlRTLkFDQ0VTU19UT0tFTl9SRUZSRVNIRCxcbiAgICAgIEVWRU5UUy5BTk9OWU1PVVNfQ09OVkVSVEVEXG4gICAgXVxuICB9LFxuICBlbnRpdHk6IGZ1bmN0aW9uIChjb25maWc6IFBpY2s8SUNsb3VkYmFzZUF1dGhDb25maWcsICdyZWdpb24nIHwgJ3BlcnNpc3RlbmNlJz4gPSB7IHJlZ2lvbjogJycsIHBlcnNpc3RlbmNlOiAnbG9jYWwnIH0pIHtcbiAgICBpZiAodGhpcy5hdXRoSW5zdGFuY2UpIHtcbiAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sICdldmVyeSBjbG91ZGJhc2UgaW5zdGFuY2Ugc2hvdWxkIGhhcyBvbmx5IG9uZSBhdXRoIG9iamVjdCcpO1xuICAgICAgcmV0dXJuIHRoaXMuYXV0aEluc3RhbmNlO1xuICAgIH1cbiAgICBjb25zdCB7IGFkYXB0ZXIsIHJ1bnRpbWUgfSA9IHRoaXMucGxhdGZvcm07XG4gICAgLy8g5aaC5LiN5piO56Gu5oyH5a6acGVyc2lzdGVuY2XliJnkvJjlhYjlj5blkITlubPlj7BhZGFwdGVy6aaW6YCJ77yM5YW25qyhc2Vzc2lvblxuICAgIGNvbnN0IG5ld1BlcnNpc3RlbmNlID0gY29uZmlnLnBlcnNpc3RlbmNlIHx8IGFkYXB0ZXIucHJpbWFyeVN0b3JhZ2U7XG4gICAgaWYgKG5ld1BlcnNpc3RlbmNlICYmIChuZXdQZXJzaXN0ZW5jZSAhPT0gdGhpcy5jb25maWcucGVyc2lzdGVuY2UpKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbmZpZyh7IHBlcnNpc3RlbmNlOiBuZXdQZXJzaXN0ZW5jZSB9KVxuICAgIH1cblxuICAgIGNvbnN0IHsgZW52LCBwZXJzaXN0ZW5jZSwgZGVidWcgfSA9IHRoaXMuY29uZmlnO1xuICAgIHRoaXMuYXV0aEluc3RhbmNlID0gbmV3IEF1dGgoe1xuICAgICAgZW52LFxuICAgICAgcmVnaW9uOiBjb25maWcucmVnaW9uLFxuICAgICAgcGVyc2lzdGVuY2UsXG4gICAgICBkZWJ1ZyxcbiAgICAgIGNhY2hlOiB0aGlzLmNhY2hlLFxuICAgICAgcmVxdWVzdDogdGhpcy5yZXF1ZXN0LFxuICAgICAgcnVudGltZTogcnVudGltZVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmF1dGhJbnN0YW5jZTtcbiAgfVxufVxuXG50cnkge1xuICAvLyDlsJ3or5Xoh6rliqjms6jlhozoh7PlhajlsYDlj5jph49jbG91ZGJhc2VcbiAgLy8g5q2k6KGM5Li65Y+q5Zyo5rWP6KeI5Zmo546v5aKD5LiL5pyJ5pWIXG4gIGNsb3VkYmFzZS5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xufSBjYXRjaCAoZSkgeyB9XG5cbmV4cG9ydCB7XG4gIFVzZXJJbmZvLFxuICBBdXRoLFxuICBBdXRoUHJvdmlkZXIsXG4gIEVWRU5UUyxcbiAgZXZlbnRCdXNcbn07XG4vKipcbiAqIEBhcGkg5omL5Yqo5rOo5YaM6IezY2xvdWRiYXNlIGFwcFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJBdXRoKGFwcDogUGljazxJQ2xvdWRiYXNlLCAncmVnaXN0ZXJDb21wb25lbnQnPikge1xuICB0cnkge1xuICAgIGFwcC5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS53YXJuKGUpO1xuICB9XG59XG5cbnR5cGUgSVByb3ZpZGVyID0gbmV3ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xuLyoqXG4gKiDms6jlhoxwcm92aWRlcu+8jOWmguaenFxuICogQHBhcmFtIG5hbWVcbiAqIEBwYXJhbSBwcm92aWRlclxuICogQGV4YW1wbGVcbiAqIC8vIOazqOWGjFxuICogcmVnaXN0ZXJQcm92aWRlcignZW1haWxBdXRoUHJvdmlkZXInLGZ1bmN0aW9uKCl7XG4gKiAgIC8vIC4uLlxuICogfSk7XG4gKiAvLyDkvb/nlKjmlrBwcm92aWRlcueZu+W9lVxuICogY2xvdWRiYXNlLmF1dGgoKS5lbWFpbEF1dGhQcm92aWRlcigpLnNpZ25JbigpO1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJQcm92aWRlcihuYW1lOiBzdHJpbmcsIHByb3ZpZGVyOiBJUHJvdmlkZXIpIHtcbiAgY29uc3QgcHJvdG8gPSBBdXRoLnByb3RvdHlwZTtcbiAgcHJvdG9bbmFtZV0gPSBmdW5jdGlvbiAob3B0aW9uczogb2JqZWN0KSB7XG4gICAgY29uc3QgcHJpdmF0ZU5hbWUgPSBgXyR7bmFtZX1gO1xuICAgIGlmICghdGhpc1twcml2YXRlTmFtZV0pIHtcbiAgICAgIHRoaXNbcHJpdmF0ZU5hbWVdID0gbmV3IHByb3ZpZGVyKHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgLi4udGhpcy5fY29uZmlnXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNbcHJpdmF0ZU5hbWVdO1xuICB9O1xufSJdfQ==