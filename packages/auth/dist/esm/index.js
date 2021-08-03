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
import { PhoneAuthProvider, SIGN_METHOD } from './providers/phoneAuthProvider';
var CloudbaseEventEmitter = events.CloudbaseEventEmitter;
var RUNTIME = adapters.RUNTIME;
var printWarn = utils.printWarn, throwError = utils.throwError, transformPhone = utils.transformPhone;
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
    Object.defineProperty(LoginState.prototype, "isPhoneAuth", {
        get: function () {
            return this.loginType === LOGINTYPE.PHONE;
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
    Auth.prototype.phoneAuthProvider = function () {
        if (!this._phoneAuthProvider) {
            this._phoneAuthProvider = new PhoneAuthProvider(__assign(__assign({}, this._config), { cache: this._cache, request: this._request }));
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
                return [2, this.phoneAuthProvider().signIn(__assign(__assign({}, param), { signMethod: SIGN_METHOD.FORCERESETPWD }))];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBS25GLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQTtBQUl0RSxJQUFBLHFCQUFxQixHQUFLLE1BQU0sc0JBQVgsQ0FBWTtBQUNqQyxJQUFBLE9BQU8sR0FBSyxRQUFRLFFBQWIsQ0FBYztBQUNyQixJQUFBLFNBQVMsR0FBaUMsS0FBSyxVQUF0QyxFQUFFLFVBQVUsR0FBcUIsS0FBSyxXQUExQixFQUFFLGNBQWMsR0FBSyxLQUFLLGVBQVYsQ0FBVztBQUNoRCxJQUFBLE1BQU0sR0FBeUIsU0FBUyxPQUFsQyxFQUFFLGtCQUFrQixHQUFLLFNBQVMsbUJBQWQsQ0FBZTtBQUN6QyxJQUFBLG9CQUFvQixHQUFLLE9BQU8scUJBQVosQ0FBYTtBQUV6QyxJQUFNLGNBQWMsR0FBRyxNQUFN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Q0osWUFBWSxFQUNaLE1BQU0sRUFDTixRQUFRLEVBQ1QsQ0FBQztBQUlGLE1BQU0sVUFBVSxZQUFZLENBQUMsR0FBMEM7SUFDckUsSUFBSTtRQUNGLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNsQztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUM7QUFlRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsSUFBWSxFQUFFLFFBQW1CO0lBQ2hFLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDN0IsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsT0FBZTtRQUNyQyxJQUFNLFdBQVcsR0FBRyxNQUFJLElBQU0sQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLFFBQVEsdUJBQzNCLE9BQU8sR0FDUCxJQUFJLENBQUMsT0FBTyxFQUNmLENBQUM7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBldmVudHMsIGFkYXB0ZXJzLCB1dGlscywgY29uc3RhbnRzLCBoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNhY2hlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlUmVxdWVzdCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVxdWVzdCc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQXV0aENvbmZpZywgSUNyZWRlbnRpYWwsIElVc2VyLCBJVXNlckluZm8sIElBdXRoUHJvdmlkZXIsIElMb2dpblN0YXRlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9hdXRoJztcbmltcG9ydCB7IElDbG91ZGJhc2VDb21wb25lbnQgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWl4aW5BdXRoUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy93ZWl4aW5BdXRoUHJvdmlkZXInO1xuaW1wb3J0IHsgQW5vbnltb3VzQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvYW5vbnltb3VzQXV0aFByb3ZpZGVyJztcbmltcG9ydCB7IEN1c3RvbUF1dGhQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2N1c3RvbUF1dGhQcm92aWRlcic7XG5pbXBvcnQgeyBMT0dJTlRZUEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9iYXNlJztcbmltcG9ydCB7IEVtYWlsQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvZW1haWxBdXRoUHJvdmlkZXInO1xuaW1wb3J0IHsgVXNlcm5hbWVBdXRoUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy91c2VybmFtZUF1dGhQcm92aWRlcic7XG5pbXBvcnQgeyBQaG9uZUF1dGhQcm92aWRlciwgU0lHTl9NRVRIT0QgfSBmcm9tICcuL3Byb3ZpZGVycy9waG9uZUF1dGhQcm92aWRlcidcblxuZGVjbGFyZSBjb25zdCBjbG91ZGJhc2U6IElDbG91ZGJhc2U7XG5cbmNvbnN0IHsgQ2xvdWRiYXNlRXZlbnRFbWl0dGVyIH0gPSBldmVudHM7XG5jb25zdCB7IFJVTlRJTUUgfSA9IGFkYXB0ZXJzO1xuY29uc3QgeyBwcmludFdhcm4sIHRocm93RXJyb3IsIHRyYW5zZm9ybVBob25lIH0gPSB1dGlscztcbmNvbnN0IHsgRVJST1JTLCBDT01NVU5JVFlfU0lURV9VUkwgfSA9IGNvbnN0YW50cztcbmNvbnN0IHsgY2F0Y2hFcnJvcnNEZWNvcmF0b3IgfSA9IGhlbHBlcnM7XG5cbmNvbnN0IENPTVBPTkVOVF9OQU1FID0gJ2F1dGgnO1xuXG5pbnRlcmZhY2UgVXNlckluZm8ge1xuICBvcGVuaWQ6IHN0cmluZztcbiAgbmlja25hbWU/OiBzdHJpbmc7XG4gIHNleD86IG51bWJlcjtcbiAgcHJvdmluY2U/OiBzdHJpbmc7XG4gIGNpdHk/OiBzdHJpbmc7XG4gIGNvdW50cnk/OiBzdHJpbmc7XG4gIGhlYWRpbWd1cmw/OiBzdHJpbmc7XG4gIHByaXZpbGVnZT86IFtzdHJpbmddO1xuICB1bmlvbmlkPzogc3RyaW5nO1xufVxuXG5jb25zdCBldmVudEJ1cyA9IG5ldyBDbG91ZGJhc2VFdmVudEVtaXR0ZXIoKTtcblxuaW50ZXJmYWNlIElVc2VyT3B0aW9ucyB7XG4gIGNhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG4gIHJlcXVlc3Q6IElDbG91ZGJhc2VSZXF1ZXN0O1xufVxuXG5jbGFzcyBVc2VyIGltcGxlbWVudHMgSVVzZXIge1xuICBwdWJsaWMgdWlkOiBzdHJpbmc7XG4gIHB1YmxpYyBsb2dpblR5cGU6IHN0cmluZztcbiAgcHVibGljIG9wZW5pZDogc3RyaW5nO1xuICBwdWJsaWMgd3hPcGVuSWQ6IHN0cmluZztcbiAgcHVibGljIHd4UHVibGljSWQ6IHN0cmluZztcbiAgcHVibGljIHVuaW9uSWQ6IHN0cmluZztcbiAgcHVibGljIHFxTWluaU9wZW5JZDogc3RyaW5nO1xuICBwdWJsaWMgY3VzdG9tVXNlcklkOiBzdHJpbmc7XG4gIHB1YmxpYyBuaWNrTmFtZTogc3RyaW5nO1xuICBwdWJsaWMgZ2VuZGVyOiBzdHJpbmc7XG4gIHB1YmxpYyBhdmF0YXJVcmw6IHN0cmluZztcbiAgcHVibGljIGVtYWlsOiBzdHJpbmc7XG4gIHB1YmxpYyBoYXNQYXNzd29yZDogYm9vbGVhbjtcbiAgcHVibGljIHBob25lPzogc3RyaW5nO1xuICBwdWJsaWMgdXNlcm5hbWU/OiBzdHJpbmc7XG4gIHB1YmxpYyBsb2NhdGlvbj86IHtcbiAgICBjb3VudHJ5Pzogc3RyaW5nO1xuICAgIHByb3ZpbmNlPzogc3RyaW5nO1xuICAgIGNpdHk/OiBzdHJpbmc7XG4gIH07XG5cbiAgcHJpdmF0ZSBfY2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcbiAgcHJpdmF0ZSBfcmVxdWVzdDogSUNsb3VkYmFzZVJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogSVVzZXJPcHRpb25zKSB7XG4gICAgY29uc3QgeyBjYWNoZSwgcmVxdWVzdCB9ID0gb3B0aW9ucztcbiAgICB0aGlzLl9jYWNoZSA9IGNhY2hlO1xuICAgIHRoaXMuX3JlcXVlc3QgPSByZXF1ZXN0O1xuXG4gICAgdGhpcy5fc2V0VXNlckluZm8oKTtcbiAgfVxuICAvKipcbiAgICog6I635Y+W5pys5Zyw55So5oi35L+h5oGvLeWQjOatpVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNoZWNrTG9jYWxJbmZvKCkge1xuICAgIHRoaXMudWlkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygndWlkJyk7XG4gICAgdGhpcy5sb2dpblR5cGUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdsb2dpblR5cGUnKTtcbiAgICB0aGlzLm9wZW5pZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3d4T3BlbklkJyk7XG4gICAgdGhpcy53eE9wZW5JZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3d4T3BlbklkJyk7XG4gICAgdGhpcy53eFB1YmxpY0lkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnd3hQdWJsaWNJZCcpO1xuICAgIHRoaXMudW5pb25JZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3d4VW5pb25JZCcpO1xuICAgIHRoaXMucXFNaW5pT3BlbklkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncXFNaW5pT3BlbklkJyk7XG4gICAgdGhpcy5jdXN0b21Vc2VySWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdjdXN0b21Vc2VySWQnKTtcbiAgICB0aGlzLm5pY2tOYW1lID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnbmlja05hbWUnKTtcbiAgICB0aGlzLmdlbmRlciA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2dlbmRlcicpO1xuICAgIHRoaXMuYXZhdGFyVXJsID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnYXZhdGFyVXJsJyk7XG4gICAgdGhpcy5lbWFpbCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2VtYWlsJyk7XG4gICAgdGhpcy5oYXNQYXNzd29yZCA9IEJvb2xlYW4odGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnaGFzUGFzc3dvcmQnKSk7XG4gICAgdGhpcy5waG9uZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3Bob25lJylcbiAgICB0aGlzLnVzZXJuYW1lID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygndXNlcm5hbWUnKVxuICAgIHRoaXMubG9jYXRpb24gPSB7XG4gICAgICBjb3VudHJ5OiB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdjb3VudHJ5JyksXG4gICAgICBwcm92aW5jZTogdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncHJvdmluY2UnKSxcbiAgICAgIGNpdHk6IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2NpdHknKVxuICAgIH07XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluacrOWcsOeUqOaIt+S/oeaBry3lvILmraVcbiAgICovXG4gIHB1YmxpYyBhc3luYyBjaGVja0xvY2FsSW5mb0FzeW5jKCkge1xuICAgIHRoaXMudWlkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd1aWQnKTtcbiAgICB0aGlzLmxvZ2luVHlwZSA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnbG9naW5UeXBlJyk7XG4gICAgdGhpcy5vcGVuaWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3d4T3BlbklkJyk7XG4gICAgdGhpcy53eE9wZW5JZCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnd3hPcGVuSWQnKTtcbiAgICB0aGlzLnd4UHVibGljSWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3d4UHVibGljSWQnKTtcbiAgICB0aGlzLnVuaW9uSWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3d4VW5pb25JZCcpO1xuICAgIHRoaXMucXFNaW5pT3BlbklkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdxcU1pbmlPcGVuSWQnKTtcbiAgICB0aGlzLmN1c3RvbVVzZXJJZCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnY3VzdG9tVXNlcklkJyk7XG4gICAgdGhpcy5uaWNrTmFtZSA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnbmlja05hbWUnKTtcbiAgICB0aGlzLmdlbmRlciA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnZ2VuZGVyJyk7XG4gICAgdGhpcy5hdmF0YXJVcmwgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2F2YXRhclVybCcpO1xuICAgIHRoaXMuZW1haWwgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2VtYWlsJyk7XG4gICAgdGhpcy5oYXNQYXNzd29yZCA9IEJvb2xlYW4oYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdoYXNQYXNzd29yZCcpKTtcbiAgICB0aGlzLnBob25lID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdwaG9uZScpXG4gICAgdGhpcy51c2VybmFtZSA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygndXNlcm5hbWUnKVxuICAgIHRoaXMubG9jYXRpb24gPSB7XG4gICAgICBjb3VudHJ5OiBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2NvdW50cnknKSxcbiAgICAgIHByb3ZpbmNlOiBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3Byb3ZpbmNlJyksXG4gICAgICBjaXR5OiBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2NpdHknKVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICog5bCG5b2T5YmN6LSm5oi35LiO6Ieq5a6a5LmJ55m75b2VIFRpY2tldCDov5vooYznu5HlrprvvIznu5HlrprkuYvlkI7kvr/lj6/ku6XpgJrov4foh6rlrprkuYnnmbvlvZXnmbvlvZXlvZPliY3kupHlvIDlj5HotKbmiLfjgIJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpY2tldCDoh6rlrprkuYnnmbvlvZV0aWNrZXRcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnu5Hlrproh6rlrprkuYnnmbvlvZXlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5saW5rV2l0aFRpY2tldCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5q2k6LSm5oi35piv5ZCm5bey57uP57uR5a6a6Ieq5a6a5LmJ55m75b2VJyxcbiAgICAgICcgIDMgLSB0aWNrZXQg5Y+C5pWw5piv5ZCm5b2S5bGe5b2T5YmN546v5aKDJyxcbiAgICAgICcgIDQgLSDliJvlu7ogdGlja2V0IOeahOiHquWumuS5ieeZu+W9leengemSpeaYr+WQpui/h+acnycsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGxpbmtXaXRoVGlja2V0KHRpY2tldDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHR5cGVvZiB0aWNrZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RpY2tldCBtdXN0IGJlIHN0cmluZycpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLmxpbmtXaXRoVGlja2V0JywgeyB0aWNrZXQgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOWwhuW9k+WJjei0puaIt+S4juesrOS4ieaWuemJtOadg+aPkOS+m+aWue+8jOS7pemHjeWumuWQkeeahOW9ouW8j++8jOi/m+ihjOe7keWumu+8jOe7keWumuS5i+WQjuS+v+WPr+S7pemAmui/h+esrOS4ieaWuemJtOadg+aPkOS+m+aWueeZu+W9leW9k+WJjeeahOS6keW8gOWPkei0puaIt+OAglxuICAgKiBAcGFyYW0gcHJvdmlkZXIg54m55a6a55m75b2V5pa55byP55qEcHJvdmlkZXLvvIzlv4XpobvlhbflpIdzaWduSW5XaXRoUmVkaXJlY3Tmlrnms5VcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnu5HlrprnrKzkuInmlrnnmbvlvZXmlrnlvI/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5saW5rV2l0aFJlZGlyZWN0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDmraTotKbmiLfmmK/lkKblt7Lnu4/nu5HlrprmraTnrKzkuInmlrknLFxuICAgICAgJyAgMyAtIOatpOesrOS4ieaWueaYr+WQpuW3sue7j+aOiOadgycsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGxpbmtXaXRoUmVkaXJlY3QocHJvdmlkZXI6IElBdXRoUHJvdmlkZXIpOiB2b2lkIHtcbiAgICBwcm92aWRlci5zaWduSW5XaXRoUmVkaXJlY3QoKTtcbiAgfVxuICAvKipcbiAgICog6I635Y+W5b2T5YmN6LSm5oi355qE5b6u5L+hIFVuaW9uSUQg57uR5a6a55qE5LqR5byA5Y+R6LSm5oi35YiX6KGo44CC5aaC5p6c5b2T5YmN6LSm5oi35LiN5a2Y5ZyoIFVuaW9uSUTvvIzkvJrov5Tlm57plJnor6/jgIJcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5botKbmiLfliJfooajlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5nZXRMaW5rZWRVaWRMaXN0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0TGlua2VkVWlkTGlzdCgpIHtcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5nZXRMaW5rZWRVaWRMaXN0Jywge30pO1xuICAgIGxldCBoYXNQcmltYXJ5VWlkID0gZmFsc2U7XG4gICAgY29uc3QgdXNlcnMgPSBkYXRhLnVzZXJzIGFzIElVc2VySW5mb1tdO1xuICAgIGZvciAoY29uc3QgdXNlciBvZiB1c2Vycykge1xuICAgICAgaWYgKHVzZXIud3hPcGVuSWQgJiYgdXNlci53eFB1YmxpY0lkKSB7XG4gICAgICAgIGhhc1ByaW1hcnlVaWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXJzLFxuICAgICAgaGFzUHJpbWFyeVVpZFxuICAgIH07XG4gIH1cbiAgLyoqXG4gICAqIOiuvue9ruW+ruS/oeS4u+i0puWPt++8jOmAmuW4uOaQremFjeWSjCBVc2VyLmdldExpbmtlZFVpZExpc3QoKSDkvb/nlKjvvIznlKjkuo7lnKjlkIzkuKrlvq7kv6EgVW5pb25JRCDlr7nlupTnmoTlpJrkuKrkupHlvIDlj5HotKblj7fkuK3vvIzorr7nva7lhbbkuK3kuIDkuKrkuLrkuLvotKblj7dcbiAgICog6K6+572u5LmL5ZCO77yM6YCa6L+HIFVuaW9uSUQg55m75b2V5L6/5Lya55m75b2V6Iez5Li76LSm5Y+35LmL5LiK44CCXG4gICAqIEBwYXJhbSB1aWRcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICforr7nva7lvq7kv6HkuLvotKblj7flpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5zZXRQcmltYXJ5VWlkKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgc2V0UHJpbWFyeVVpZCh1aWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGguc2V0UHJpbWFyeVVpZCcsIHsgdWlkIH0pO1xuICB9XG4gIC8qKlxuICAgKiDop6Pnu5Hmn5DkuKrnmbvlvZXmlrnlvI9cbiAgICogQHBhcmFtIGxvZ2luVHlwZVxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+aOpeinpue7keWumuWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnVubGluaygpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN6LSm5oi35piv5ZCm5bey57uP5LiO5q2k55m75b2V5pa55byP6Kej57uRJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgdW5saW5rKGxvZ2luVHlwZTogJ0NVU1RPTScgfCAnV0VDSEFULU9QRU4nIHwgJ1dFQ0hBVC1QVUJMSUMnIHwgJ1dFQ0hBVC1VTklPTicgfCAnUEhPTkUnKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC51bmxpbmsnLCB7IHBsYXRmb3JtOiBsb2dpblR5cGUgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOabtOaWsOeUqOaIt+S/oeaBr1xuICAgKiBAcGFyYW0gdXNlckluZm9cbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmm7TmlrDnlKjmiLfkv6Hmga/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci51cGRhdGUoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOeUqOaIt+S/oeaBr+S4reaYr+WQpuWMheWQq+mdnuazleWAvCcsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHVwZGF0ZSh1c2VySW5mbzogSVVzZXJJbmZvKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBuaWNrTmFtZSwgZ2VuZGVyLCBhdmF0YXJVcmwsIHByb3ZpbmNlLCBjb3VudHJ5LCBjaXR5IH0gPSB1c2VySW5mbztcbiAgICBjb25zdCB7IGRhdGE6IG5ld1VzZXJJbmZvIH0gPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGgudXBkYXRlVXNlckluZm8nLCB7IG5pY2tOYW1lLCBnZW5kZXIsIGF2YXRhclVybCwgcHJvdmluY2UsIGNvdW50cnksIGNpdHkgfSk7XG4gICAgdGhpcy5fc2V0TG9jYWxVc2VySW5mbyhuZXdVc2VySW5mbyk7XG4gIH1cbiAgLyoqXG4gICAqIOabtOaWsOWvhueggVxuICAgKiBAcGFyYW0gbmV3UGFzc3dvcmRcbiAgICogQHBhcmFtIG9sZFBhc3N3b3JkXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw5a+G56CB5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlUGFzc3dvcmQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMyAtIOaWsOWvhueggeS4reaYr+WQpuWMheWQq+mdnuazleWtl+espicsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIHVwZGF0ZVBhc3N3b3JkKG5ld1Bhc3N3b3JkOiBzdHJpbmcsIG9sZFBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnVwZGF0ZVBhc3N3b3JkJywge1xuICAgICAgb2xkUGFzc3dvcmQsXG4gICAgICBuZXdQYXNzd29yZFxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDmm7TmlrDpgq7nrrHlnLDlnYBcbiAgICogQHBhcmFtIG5ld0VtYWlsXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw6YKu566x5Zyw5Z2A5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlRW1haWwoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6humCrueuseWvhueggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIHVwZGF0ZUVtYWlsKG5ld0VtYWlsOiBzdHJpbmcsIHBhc3N3b3JkPzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC51cGRhdGVFbWFpbCcsIHtcbiAgICAgIG5ld0VtYWlsLFxuICAgICAgcGFzc3dvcmRcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog5pu05paw55So5oi35ZCNXG4gICAqIEBwYXJhbSB1c2VybmFtZVxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+abtOaWsOeUqOaIt+WQjeWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnVwZGF0ZVVzZXJuYW1lKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobnlKjmiLflkI3lr4bnoIHnmbvlvZUnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyB1cGRhdGVVc2VybmFtZSh1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiB1c2VybmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCAndXNlcm5hbWUgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGgudXBkYXRlVXNlcm5hbWUnLCB7XG4gICAgICB1c2VybmFtZVxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDliLfmlrDmnKzlnLDnlKjmiLfkv6Hmga/jgILlvZPnlKjmiLflnKjlhbbku5blrqLmiLfnq6/mm7TmlrDnlKjmiLfkv6Hmga/kuYvlkI7vvIzlj6/ku6XosIPnlKjmraTmjqXlj6PlkIzmraXmm7TmlrDkuYvlkI7nmoTkv6Hmga/jgIJcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfliLfmlrDmnKzlnLDnlKjmiLfkv6Hmga/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5yZWZyZXNoKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgcmVmcmVzaCgpOiBQcm9taXNlPElVc2VySW5mbz4ge1xuICAgIGNvbnN0IGFjdGlvbiA9ICdhdXRoLmdldFVzZXJJbmZvJztcbiAgICBjb25zdCB7IGRhdGE6IHVzZXJJbmZvIH0gPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoYWN0aW9uLCB7fSk7XG4gICAgdGhpcy5fc2V0TG9jYWxVc2VySW5mbyh1c2VySW5mbyk7XG4gICAgcmV0dXJuIHVzZXJJbmZvO1xuICB9XG5cbiAgLyoqXG4gKiDnu5HlrprmiYvmnLrlj7dcbiAqIEBwYXJhbSBwaG9uZU51bWJlclxuICogQHBhcmFtIHBob25lQ29kZVxuICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnu5HlrprmiYvmnLrlj7flpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmxpbmtXaXRoUGhvbmVOdW1iZXIoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huefreS/oemqjOivgeeggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGxpbmtXaXRoUGhvbmVOdW1iZXIocGhvbmVOdW1iZXI6IHN0cmluZywgcGhvbmVDb2RlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLmxpbmtPclVwZGF0ZVBob25lTnVtYmVyJywge1xuICAgICAgcGhvbmVOdW1iZXI6IHRyYW5zZm9ybVBob25lKHBob25lTnVtYmVyKSxcbiAgICAgIHBob25lQ29kZVxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDmm7TmlrDmiYvmnLrlj7dcbiAgICogQHBhcmFtIHBob25lTnVtYmVyXG4gICAqIEBwYXJhbSBwaG9uZUNvZGVcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmm7TmlrDmiYvmnLrlj7flpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKjor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huefreS/oemqjOivgeeggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHVwZGF0ZVBob25lTnVtYmVyKHBob25lTnVtYmVyOiBzdHJpbmcsIHBob25lQ29kZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5saW5rT3JVcGRhdGVQaG9uZU51bWJlcicsIHtcbiAgICAgIHBob25lTnVtYmVyOiB0cmFuc2Zvcm1QaG9uZShwaG9uZU51bWJlciksXG4gICAgICBwaG9uZUNvZGVcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldExvY2FsVXNlckluZm8oa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHsgdXNlckluZm9LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgdXNlckluZm8gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZSh1c2VySW5mb0tleSk7XG4gICAgcmV0dXJuIHVzZXJJbmZvW2tleV07XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoa2V5OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHsgdXNlckluZm9LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgdXNlckluZm8gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHVzZXJJbmZvS2V5KTtcbiAgICByZXR1cm4gdXNlckluZm9ba2V5XTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldFVzZXJJbmZvKCkge1xuICAgIGNvbnN0IHsgdXNlckluZm9LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgdXNlckluZm8gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZSh1c2VySW5mb0tleSk7XG4gICAgW1xuICAgICAgJ3VpZCcsXG4gICAgICAnbG9naW5UeXBlJyxcbiAgICAgICdvcGVuaWQnLFxuICAgICAgJ3d4T3BlbklkJyxcbiAgICAgICd3eFB1YmxpY0lkJyxcbiAgICAgICd1bmlvbklkJyxcbiAgICAgICdxcU1pbmlPcGVuSWQnLFxuICAgICAgJ2VtYWlsJyxcbiAgICAgICdoYXNQYXNzd29yZCcsXG4gICAgICAnY3VzdG9tVXNlcklkJyxcbiAgICAgICduaWNrTmFtZScsXG4gICAgICAnZ2VuZGVyJyxcbiAgICAgICdhdmF0YXJVcmwnLFxuICAgICAgJ3Bob25lJyxcbiAgICAgICd1c2VybmFtZSdcbiAgICBdLmZvckVhY2goaW5mb0tleSA9PiB7XG4gICAgICB0aGlzW2luZm9LZXldID0gdXNlckluZm9baW5mb0tleV07XG4gICAgfSk7XG5cbiAgICB0aGlzLmxvY2F0aW9uID0ge1xuICAgICAgY291bnRyeTogdXNlckluZm9bJ2NvdW50cnknXSxcbiAgICAgIHByb3ZpbmNlOiB1c2VySW5mb1sncHJvdmluY2UnXSxcbiAgICAgIGNpdHk6IHVzZXJJbmZvWydjaXR5J11cbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0TG9jYWxVc2VySW5mbyh1c2VySW5mbzogYW55KSB7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICB0aGlzLl9jYWNoZS5zZXRTdG9yZSh1c2VySW5mb0tleSwgdXNlckluZm8pO1xuICAgIHRoaXMuX3NldFVzZXJJbmZvKCk7XG4gIH1cbn1cbmludGVyZmFjZSBJTG9naW5TdGF0ZU9wdGlvbnMgZXh0ZW5kcyBJVXNlck9wdGlvbnMge1xuICBlbnZJZDogc3RyaW5nO1xufVxuZXhwb3J0IGNsYXNzIExvZ2luU3RhdGUgaW1wbGVtZW50cyBJTG9naW5TdGF0ZSB7XG4gIHB1YmxpYyBjcmVkZW50aWFsOiBJQ3JlZGVudGlhbDtcbiAgcHVibGljIHVzZXI6IElVc2VyO1xuXG4gIHByaXZhdGUgX2NhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG4gIHByaXZhdGUgX2xvZ2luVHlwZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElMb2dpblN0YXRlT3B0aW9ucykge1xuICAgIGNvbnN0IHsgZW52SWQsIGNhY2hlLCByZXF1ZXN0IH0gPSBvcHRpb25zO1xuICAgIGlmICghZW52SWQpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCAnZW52SWQgaXMgbm90IGRlZmluZWQnKTtcbiAgICB9XG4gICAgdGhpcy5fY2FjaGUgPSBjYWNoZTtcblxuICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKHtcbiAgICAgIGNhY2hlLFxuICAgICAgcmVxdWVzdFxuICAgIH0pO1xuICB9XG5cblxuICBwdWJsaWMgYXN5bmMgY2hlY2tMb2NhbFN0YXRlKCkge1xuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5LCBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUocmVmcmVzaFRva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbkV4cGlyZSA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKGFjY2Vzc1Rva2VuRXhwaXJlS2V5KTtcblxuICAgIHRoaXMuY3JlZGVudGlhbCA9IHtcbiAgICAgIHJlZnJlc2hUb2tlbixcbiAgICAgIGFjY2Vzc1Rva2VuLFxuICAgICAgYWNjZXNzVG9rZW5FeHBpcmVcbiAgICB9O1xuXG4gICAgdGhpcy5fbG9naW5UeXBlID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodGhpcy5fY2FjaGUua2V5cy5sb2dpblR5cGVLZXkpO1xuXG4gICAgdGhpcy51c2VyLmNoZWNrTG9jYWxJbmZvKCk7XG4gIH1cbiAgcHVibGljIGFzeW5jIGNoZWNrTG9jYWxTdGF0ZUFzeW5jKCkge1xuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5LCBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW5FeHBpcmUgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5KTtcblxuICAgIHRoaXMuY3JlZGVudGlhbCA9IHtcbiAgICAgIHJlZnJlc2hUb2tlbixcbiAgICAgIGFjY2Vzc1Rva2VuLFxuICAgICAgYWNjZXNzVG9rZW5FeHBpcmVcbiAgICB9O1xuXG4gICAgdGhpcy5fbG9naW5UeXBlID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyh0aGlzLl9jYWNoZS5rZXlzLmxvZ2luVHlwZUtleSk7XG5cblxuICAgIGF3YWl0IHRoaXMudXNlci5jaGVja0xvY2FsSW5mb0FzeW5jKCk7XG4gIH1cblxuICBnZXQgaXNBbm9ueW1vdXNBdXRoKCkge1xuICAgIHJldHVybiB0aGlzLmxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLkFOT05ZTU9VUztcbiAgfVxuXG4gIGdldCBpc0N1c3RvbUF1dGgoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9naW5UeXBlID09PSBMT0dJTlRZUEUuQ1VTVE9NO1xuICB9XG5cbiAgZ2V0IGlzV2VpeGluQXV0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2dpblR5cGUgPT09IExPR0lOVFlQRS5XRUNIQVQgfHwgdGhpcy5sb2dpblR5cGUgPT09IExPR0lOVFlQRS5XRUNIQVRfT1BFTiB8fCB0aGlzLmxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLldFQ0hBVF9QVUJMSUM7XG4gIH1cblxuICBnZXQgaXNVc2VybmFtZUF1dGgoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9naW5UeXBlID09PSBMT0dJTlRZUEUuVVNFUk5BTUU7XG4gIH1cblxuICBnZXQgbG9naW5UeXBlKCkge1xuICAgIHJldHVybiB0aGlzLl9sb2dpblR5cGVcbiAgfVxuXG4gIGdldCBpc1Bob25lQXV0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2dpblR5cGUgPT09IExPR0lOVFlQRS5QSE9ORVxuICB9XG59XG5cbmNsYXNzIEF1dGgge1xuICBwcml2YXRlIHJlYWRvbmx5IF9jb25maWc6IElDbG91ZGJhc2VBdXRoQ29uZmlnO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jYWNoZTogSUNsb3VkYmFzZUNhY2hlXG4gIHByaXZhdGUgcmVhZG9ubHkgX3JlcXVlc3Q6IElDbG91ZGJhc2VSZXF1ZXN0O1xuICBwcml2YXRlIHJlYWRvbmx5IF9ydW50aW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgX2Fub255bW91c0F1dGhQcm92aWRlcjogQW5vbnltb3VzQXV0aFByb3ZpZGVyO1xuICBwcml2YXRlIF9jdXN0b21BdXRoUHJvdmlkZXI6IEN1c3RvbUF1dGhQcm92aWRlcjtcbiAgcHJpdmF0ZSBfd2VpeGluQXV0aFByb3ZpZGVyOiBXZWl4aW5BdXRoUHJvdmlkZXI7XG4gIHByaXZhdGUgX2VtYWlsQXV0aFByb3ZpZGVyOiBFbWFpbEF1dGhQcm92aWRlcjtcbiAgcHJpdmF0ZSBfdXNlcm5hbWVBdXRoUHJvdmlkZXI6IFVzZXJuYW1lQXV0aFByb3ZpZGVyO1xuICBwcml2YXRlIF9waG9uZUF1dGhQcm92aWRlcjogUGhvbmVBdXRoUHJvdmlkZXI7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJQ2xvdWRiYXNlQXV0aENvbmZpZyAmIHsgY2FjaGU6IElDbG91ZGJhc2VDYWNoZSwgcmVxdWVzdDogSUNsb3VkYmFzZVJlcXVlc3QsIHJ1bnRpbWU/OiBzdHJpbmcgfSkge1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLl9jYWNoZSA9IGNvbmZpZy5jYWNoZTtcbiAgICB0aGlzLl9yZXF1ZXN0ID0gY29uZmlnLnJlcXVlc3Q7XG4gICAgdGhpcy5fcnVudGltZSA9IGNvbmZpZy5ydW50aW1lIHx8IFJVTlRJTUUuV0VCXG5cbiAgICBldmVudEJ1cy5vbihFVkVOVFMuTE9HSU5fVFlQRV9DSEFOR0VELCB0aGlzLl9vbkxvZ2luVHlwZUNoYW5nZWQuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICog6I635Y+W5b2T5YmN55m75b2V55qE55So5oi35L+h5oGvLeWQjOatpVxuICAgKi9cbiAgZ2V0IGN1cnJlbnRVc2VyKCkge1xuICAgIGlmICh0aGlzLl9jYWNoZS5tb2RlID09PSAnYXN5bmMnKSB7XG4gICAgICAvLyBhc3luYyBzdG9yYWdl55qE5bmz5Y+w6LCD55So5q2kQVBJ5o+Q56S6XG4gICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLCAnY3VycmVudCBwbGF0Zm9ybVxcJ3Mgc3RvcmFnZSBpcyBhc3luY2hyb25vdXMsIHBsZWFzZSB1c2UgZ2V0Q3VycmVuVXNlciBpbnN0ZWVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IHRoaXMuaGFzTG9naW5TdGF0ZSgpO1xuXG4gICAgaWYgKGxvZ2luU3RhdGUpIHtcbiAgICAgIHJldHVybiBsb2dpblN0YXRlLnVzZXIgfHwgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gKiDojrflj5blvZPliY3nmbvlvZXnsbvlnost5ZCM5q2lXG4gKi9cbiAgZ2V0IGxvZ2luVHlwZSgpOiBMT0dJTlRZUEUge1xuICAgIHJldHVybiB0aGlzLl9jYWNoZS5nZXRTdG9yZSh0aGlzLl9jYWNoZS5rZXlzLmxvZ2luVHlwZUtleSk7XG4gIH1cblxuICAvKipcbiAgICog6I635Y+W5b2T5YmN55m75b2V55qE55So5oi35L+h5oGvLeW8guatpVxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iOt+WPlueUqOaIt+S/oeaBr+Wksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuZ2V0Q3VycmVuVXNlcigpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGdldEN1cnJlblVzZXIoKSB7XG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IGF3YWl0IHRoaXMuZ2V0TG9naW5TdGF0ZSgpO1xuICAgIGlmIChsb2dpblN0YXRlKSB7XG4gICAgICBhd2FpdCBsb2dpblN0YXRlLnVzZXIuY2hlY2tMb2NhbEluZm9Bc3luYygpO1xuICAgICAgcmV0dXJuIGxvZ2luU3RhdGUudXNlciB8fCBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluW9k+WJjeeZu+W9leexu+Weiy3lvILmraVcbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRMb2dpblR5cGUoKTogUHJvbWlzZTxMT0dJTlRZUEU+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyh0aGlzLl9jYWNoZS5rZXlzLmxvZ2luVHlwZUtleSkgYXMgTE9HSU5UWVBFO1xuICB9XG4gIHB1YmxpYyBhc3luYyBnZXRBY2Nlc3NUb2tlbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWNjZXNzVG9rZW46IChhd2FpdCB0aGlzLl9yZXF1ZXN0LmdldEFjY2Vzc1Rva2VuKCkpLmFjY2Vzc1Rva2VuLFxuICAgICAgZW52OiB0aGlzLl9jb25maWcuZW52XG4gICAgfTtcbiAgfVxuICBwdWJsaWMgd2VpeGluQXV0aFByb3ZpZGVyKHsgYXBwaWQsIHNjb3BlLCBzdGF0ZSB9KTogV2VpeGluQXV0aFByb3ZpZGVyIHtcbiAgICBpZiAoIXRoaXMuX3dlaXhpbkF1dGhQcm92aWRlcikge1xuICAgICAgdGhpcy5fd2VpeGluQXV0aFByb3ZpZGVyID0gbmV3IFdlaXhpbkF1dGhQcm92aWRlcih7XG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0LFxuICAgICAgICBydW50aW1lOiB0aGlzLl9ydW50aW1lXG4gICAgICB9LCBhcHBpZCwgc2NvcGUsIHN0YXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3dlaXhpbkF1dGhQcm92aWRlcjtcbiAgfVxuICBwdWJsaWMgYW5vbnltb3VzQXV0aFByb3ZpZGVyKCk6IEFub255bW91c0F1dGhQcm92aWRlciB7XG4gICAgaWYgKCF0aGlzLl9hbm9ueW1vdXNBdXRoUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuX2Fub255bW91c0F1dGhQcm92aWRlciA9IG5ldyBBbm9ueW1vdXNBdXRoUHJvdmlkZXIoe1xuICAgICAgICAuLi50aGlzLl9jb25maWcsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9hbm9ueW1vdXNBdXRoUHJvdmlkZXI7XG4gIH1cbiAgcHVibGljIGN1c3RvbUF1dGhQcm92aWRlcigpOiBDdXN0b21BdXRoUHJvdmlkZXIge1xuICAgIGlmICghdGhpcy5fY3VzdG9tQXV0aFByb3ZpZGVyKSB7XG4gICAgICB0aGlzLl9jdXN0b21BdXRoUHJvdmlkZXIgPSBuZXcgQ3VzdG9tQXV0aFByb3ZpZGVyKHtcbiAgICAgICAgLi4udGhpcy5fY29uZmlnLFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY3VzdG9tQXV0aFByb3ZpZGVyO1xuICB9XG4gIHB1YmxpYyBlbWFpbEF1dGhQcm92aWRlcigpOiBFbWFpbEF1dGhQcm92aWRlciB7XG4gICAgaWYgKCF0aGlzLl9lbWFpbEF1dGhQcm92aWRlcikge1xuICAgICAgdGhpcy5fZW1haWxBdXRoUHJvdmlkZXIgPSBuZXcgRW1haWxBdXRoUHJvdmlkZXIoe1xuICAgICAgICAuLi50aGlzLl9jb25maWcsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9lbWFpbEF1dGhQcm92aWRlcjtcbiAgfVxuICBwdWJsaWMgdXNlcm5hbWVBdXRoUHJvdmlkZXIoKTogVXNlcm5hbWVBdXRoUHJvdmlkZXIge1xuICAgIGlmICghdGhpcy5fdXNlcm5hbWVBdXRoUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuX3VzZXJuYW1lQXV0aFByb3ZpZGVyID0gbmV3IFVzZXJuYW1lQXV0aFByb3ZpZGVyKHtcbiAgICAgICAgLi4udGhpcy5fY29uZmlnLFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdXNlcm5hbWVBdXRoUHJvdmlkZXI7XG4gIH1cblxuICBwdWJsaWMgcGhvbmVBdXRoUHJvdmlkZXIoKTogUGhvbmVBdXRoUHJvdmlkZXIge1xuICAgIGlmICghdGhpcy5fcGhvbmVBdXRoUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuX3Bob25lQXV0aFByb3ZpZGVyID0gbmV3IFBob25lQXV0aFByb3ZpZGVyKHtcbiAgICAgICAgLi4udGhpcy5fY29uZmlnLFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcGhvbmVBdXRoUHJvdmlkZXI7XG4gIH1cbiAgLyoqXG4gICAqIOeUqOaIt+WQjeWvhueggeeZu+W9lVxuICAgKiBAcGFyYW0gdXNlcm5hbWVcbiAgICogQHBhcmFtIHBhc3N3b3JkXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aFVzZXJuYW1lQW5kUGFzc3dvcmQodXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnVzZXJuYW1lQXV0aFByb3ZpZGVyKCkuc2lnbkluKHVzZXJuYW1lLCBwYXNzd29yZCk7XG4gIH1cbiAgLyoqXG4gICAqIOajgOa1i+eUqOaIt+WQjeaYr+WQpuW3sue7j+WNoOeUqFxuICAgKiBAcGFyYW0gdXNlcm5hbWVcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5bnlKjmiLfmmK/lkKbooqvljaDnlKjlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmlzVXNlcm5hbWVSZWdpc3RlcmVkKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgaXNVc2VybmFtZVJlZ2lzdGVyZWQodXNlcm5hbWU6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICh0eXBlb2YgdXNlcm5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ3VzZXJuYW1lIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5pc1VzZXJuYW1lUmVnaXN0ZXJlZCcsIHtcbiAgICAgIHVzZXJuYW1lXG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE/LmlzUmVnaXN0ZXJlZDtcbiAgfVxuICAvKipcbiAgICog6YKu566x5a+G56CB55m75b2VXG4gICAqIEBwYXJhbSBlbWFpbFxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1haWxBdXRoUHJvdmlkZXIoKS5zaWduSW4oZW1haWwsIHBhc3N3b3JkKTtcbiAgfVxuICAvKipcbiAgICog6YKu566x5a+G56CB5rOo5YaMXG4gICAqIEBwYXJhbSBlbWFpbFxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduVXBXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1haWxBdXRoUHJvdmlkZXIoKS5zaWduVXAoZW1haWwsIHBhc3N3b3JkKTtcbiAgfVxuICAvKipcbiAgICog6YeN572u6YKu566x5a+G56CBXG4gICAqIEBwYXJhbSBlbWFpbFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlbmRQYXNzd29yZFJlc2V0RW1haWwoZW1haWw6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmVtYWlsQXV0aFByb3ZpZGVyKCkucmVzZXRQYXNzd29yZChlbWFpbCk7XG4gIH1cbiAgLyoqXG4gICAqIOeZu+WHulxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+eUqOaIt+eZu+WHuuWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuc2lnbk91dCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN55So5oi35piv5ZCm5Li65Yy/5ZCN55m75b2V77yI5Yy/5ZCN55m75b2V5LiN5pSv5oyBc2lnbk91dO+8iScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHNpZ25PdXQoKSB7XG4gICAgLy8gY29uc3QgbG9naW5UeXBlID0gYXdhaXQgdGhpcy5nZXRMb2dpblR5cGUoKTtcbiAgICAvLyBpZiAobG9naW5UeXBlID09PSBMT0dJTlRZUEUuQU5PTllNT1VTKSB7XG4gICAgLy8gICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgIC8vICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sXG4gICAgLy8gICAgIG1zZzogJ2Fub255bW91cyB1c2VyIGRvZXNuXFwndCBzdXBwb3J0IHNpZ25PdXQgYWN0aW9uJ1xuICAgIC8vICAgfSkpO1xuICAgIC8vIH1cbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSwgYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuRXhwaXJlS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IGFjdGlvbiA9ICdhdXRoLmxvZ291dCc7XG5cbiAgICBjb25zdCByZWZyZXNoX3Rva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGlmICghcmVmcmVzaF90b2tlbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoYWN0aW9uLCB7IHJlZnJlc2hfdG9rZW4gfSk7XG5cbiAgICB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSk7XG5cbiAgICBldmVudEJ1cy5maXJlKEVWRU5UUy5MT0dJTl9TVEFURV9DSEFOR0VEKTtcbiAgICBldmVudEJ1cy5maXJlKEVWRU5UUy5MT0dJTl9UWVBFX0NIQU5HRUQsIHtcbiAgICAgIGVudjogdGhpcy5fY29uZmlnLmVudixcbiAgICAgIGxvZ2luVHlwZTogTE9HSU5UWVBFLk5VTEwsXG4gICAgICBwZXJzaXN0ZW5jZTogdGhpcy5fY29uZmlnLnBlcnNpc3RlbmNlXG4gICAgfSk7XG5cblxuICAgIHJldHVybiByZXM7XG4gIH1cbiAgcHVibGljIGFzeW5jIG9uTG9naW5TdGF0ZUNoYW5nZWQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgZXZlbnRCdXMub24oRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBhd2FpdCB0aGlzLmdldExvZ2luU3RhdGUoKTtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgbG9naW5TdGF0ZSk7XG4gICAgfSk7XG4gICAgLy8g56uL5Yi75omn6KGM5LiA5qyh5Zue6LCDXG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IGF3YWl0IHRoaXMuZ2V0TG9naW5TdGF0ZSgpO1xuICAgIGNhbGxiYWNrLmNhbGwodGhpcywgbG9naW5TdGF0ZSk7XG4gIH1cbiAgcHVibGljIG9uTG9naW5TdGF0ZUV4cGlyZWQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgZXZlbnRCdXMub24oRVZFTlRTLkxPR0lOX1NUQVRFX0VYUElSRUQsIGNhbGxiYWNrLmJpbmQodGhpcykpO1xuICB9XG4gIHB1YmxpYyBvbkFjY2Vzc1Rva2VuUmVmcmVzaGVkKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGV2ZW50QnVzLm9uKEVWRU5UUy5BQ0NFU1NfVE9LRU5fUkVGUkVTSEQsIGNhbGxiYWNrLmJpbmQodGhpcykpO1xuICB9XG4gIHB1YmxpYyBvbkFub255bW91c0NvbnZlcnRlZChjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBldmVudEJ1cy5vbihFVkVOVFMuQU5PTllNT1VTX0NPTlZFUlRFRCwgY2FsbGJhY2suYmluZCh0aGlzKSk7XG4gIH1cbiAgcHVibGljIG9uTG9naW5UeXBlQ2hhbmdlZChjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBldmVudEJ1cy5vbihFVkVOVFMuTE9HSU5fVFlQRV9DSEFOR0VELCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gYXdhaXQgdGhpcy5nZXRMb2dpblN0YXRlKCk7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGxvZ2luU3RhdGUpO1xuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnmbvlvZXmgIEt5ZCM5q2lXG4gICAqL1xuICBwdWJsaWMgaGFzTG9naW5TdGF0ZSgpOiBJTG9naW5TdGF0ZSB8IG51bGwge1xuICAgIGlmICh0aGlzLl9jYWNoZS5tb2RlID09PSAnYXN5bmMnKSB7XG4gICAgICAvLyBhc3luYyBzdG9yYWdl55qE5bmz5Y+w6LCD55So5q2kQVBJ5o+Q56S6XG4gICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLCAnY3VycmVudCBwbGF0Zm9ybVxcJ3Mgc3RvcmFnZSBpcyBhc3luY2hyb25vdXMsIHBsZWFzZSB1c2UgZ2V0TG9naW5TdGF0ZSBpbnN0ZWVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKHJlZnJlc2hUb2tlbktleSk7XG5cbiAgICBpZiAocmVmcmVzaFRva2VuKSB7XG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICAgIGxvZ2luU3RhdGUuY2hlY2tMb2NhbFN0YXRlKCk7XG4gICAgICByZXR1cm4gbG9naW5TdGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnmbvlvZXmgIEt5byC5q2lXG4gICAqIOatpEFQSeS4uuWFvOWuueW8guatpXN0b3JhZ2XnmoTlubPlj7BcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5bmnKzlnLDnmbvlvZXmgIHlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmdldExvZ2luU3RhdGUoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRMb2dpblN0YXRlKCkge1xuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBpZiAocmVmcmVzaFRva2VuKSB7XG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IGxvZ2luU3RhdGUuY2hlY2tMb2NhbFN0YXRlQXN5bmMoKTtcbiAgICAgIHJldHVybiBsb2dpblN0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuKGhvb2spIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5fcmVxdWVzdC5fc2hvdWxkUmVmcmVzaEFjY2Vzc1Rva2VuSG9vayA9IGhvb2suYmluZCh0aGlzKTtcbiAgfVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W55So5oi35L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g5piv5ZCm5bey55m75b2VJyxcbiAgICAgICcgIDIgLSDosIPnlKggYXV0aCgpLmdldFVzZXJJbmZvKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0VXNlckluZm8oKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBhY3Rpb24gPSAnYXV0aC5nZXRVc2VySW5mbyc7XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoYWN0aW9uLCB7fSk7XG4gICAgaWYgKHJlcy5jb2RlKSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5yZXMuZGF0YSxcbiAgICAgICAgcmVxdWVzdElkOiByZXMuc2VxSWRcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDojrflj5ZIdHRw6Ym05p2DaGVhZGVy77yM55So5LqO5LqR5o6l5YWlIEhUVFAg6K6/6Zeu5LqR5Ye95pWw5pe255qE6Ym05p2DXG4gICAqL1xuICBwdWJsaWMgZ2V0QXV0aEhlYWRlcigpIHtcbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSwgYWNjZXNzVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUocmVmcmVzaFRva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICByZXR1cm4ge1xuICAgICAgJ3gtY2xvdWRiYXNlLWNyZWRlbnRpYWxzJzogYWNjZXNzVG9rZW4gKyAnL0BALycgKyByZWZyZXNoVG9rZW5cbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiDlvILmraXmqKHlvI/ojrflj5ZIdHRw6Ym05p2DaGVhZGVy77yM55So5LqO5LqR5o6l5YWlIEhUVFAg6K6/6Zeu5LqR5Ye95pWw5pe255qE6Ym05p2DXG4gICAqIOiwg+eUqOatpEFQSeS8muWIt+aWsOeZu+W9leaAgVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEF1dGhIZWFkZXJBc3luYygpIHtcbiAgICBhd2FpdCB0aGlzLl9yZXF1ZXN0LnJlZnJlc2hBY2Nlc3NUb2tlbigpO1xuXG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXksIGFjY2Vzc1Rva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIHJldHVybiB7XG4gICAgICAneC1jbG91ZGJhc2UtY3JlZGVudGlhbHMnOiBhY2Nlc3NUb2tlbiArICcvQEAvJyArIHJlZnJlc2hUb2tlblxuICAgIH07XG4gIH1cblxuICAvKipcbiAqIOWPkemAgemqjOivgeeggVxuICogQHBhcmFtIHBob25lTnVtYmVyXG4gKiBAcGFyYW0gcGhvbmVDb2RlXG4gKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+WPkemAgeefreS/oemqjOivgeeggeWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG55+t5L+h6aqM6K+B56CB55m75b2VJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgc2VuZFBob25lQ29kZShwaG9uZU51bWJlcjogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGguc2VuZFBob25lQ29kZScsIHtcbiAgICAgIHBob25lTnVtYmVyOiB0cmFuc2Zvcm1QaG9uZShwaG9uZU51bWJlcilcbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YS5TZW5kU3RhdHVzID09PSAnT2snXG4gIH1cblxuICAvKipcbiAgICog5omL5py655+t5L+h5rOo5YaMXG4gICAqIEBwYXJhbSBlbWFpbFxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduVXBXaXRoUGhvbmVDb2RlKHBob25lTnVtYmVyOiBzdHJpbmcsIHBob25lQ29kZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMucGhvbmVBdXRoUHJvdmlkZXIoKS5zaWduVXAocGhvbmVOdW1iZXIsIHBob25lQ29kZSwgcGFzc3dvcmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIOaJi+acuumqjOivgeeggSBvciDlr4bnoIHnmbvlvZVcbiAgICogQHBhcmFtIGVtYWlsXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbldpdGhQaG9uZUNvZGVPclBhc3N3b3JkKHBhcmFtOiB7XG4gICAgcGhvbmVOdW1iZXI6IHN0cmluZ1xuICAgIHBob25lQ29kZT86IHN0cmluZ1xuICAgIHBhc3N3b3JkPzogc3RyaW5nXG4gICAgc2lnbk1ldGhvZD86IHN0cmluZ1xuICB9KSB7XG4gICAgcmV0dXJuIHRoaXMucGhvbmVBdXRoUHJvdmlkZXIoKS5zaWduSW4ocGFyYW0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGZvcmNlUmVzZXRQd2RCeVBob25lQ29kZShwYXJhbToge1xuICAgIHBob25lTnVtYmVyOiBzdHJpbmdcbiAgICBwaG9uZUNvZGU6IHN0cmluZ1xuICAgIHBhc3N3b3JkOiBzdHJpbmdcbiAgfSkge1xuICAgIHJldHVybiB0aGlzLnBob25lQXV0aFByb3ZpZGVyKCkuc2lnbkluKHtcbiAgICAgIC4uLnBhcmFtLFxuICAgICAgc2lnbk1ldGhvZDogU0lHTl9NRVRIT0QuRk9SQ0VSRVNFVFBXRFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfb25Mb2dpblR5cGVDaGFuZ2VkKGV2KSB7XG4gICAgY29uc3QgeyBsb2dpblR5cGUsIHBlcnNpc3RlbmNlLCBlbnYgfSA9IGV2LmRhdGE7XG4gICAgaWYgKGVudiAhPT0gdGhpcy5fY29uZmlnLmVudikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDnmbvlvZXmgIHovazlj5jlkI7ov4Hnp7tjYWNoZe+8jOmYsuatouWcqOWMv+WQjeeZu+W9leeKtuaAgeS4i2NhY2hl5re355SoXG4gICAgYXdhaXQgdGhpcy5fY2FjaGUudXBkYXRlUGVyc2lzdGVuY2VBc3luYyhwZXJzaXN0ZW5jZSk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyh0aGlzLl9jYWNoZS5rZXlzLmxvZ2luVHlwZUtleSwgbG9naW5UeXBlKTtcbiAgfVxufVxuXG5jb25zdCBFVkVOVFMgPSB7XG4gIC8vIOeZu+W9leaAgeaUueWPmOWQjuinpuWPkVxuICBMT0dJTl9TVEFURV9DSEFOR0VEOiAnbG9naW5TdGF0ZUNoYW5nZWQnLFxuICAvLyDnmbvlvZXmgIHov4fmnJ/lkI7op6blj5FcbiAgTE9HSU5fU1RBVEVfRVhQSVJFRDogJ2xvZ2luU3RhdGVFeHBpcmUnLFxuICAvLyDnmbvlvZXnsbvlnovmlLnlj5jlkI7op6blj5FcbiAgTE9HSU5fVFlQRV9DSEFOR0VEOiAnbG9naW5UeXBlQ2hhbmdlZCcsXG4gIC8vIOWMv+WQjei0puaIt+iiq+i9rOato+WQjuinpuWPkVxuICBBTk9OWU1PVVNfQ09OVkVSVEVEOiAnYW5vbnltb3VzQ29udmVydGVkJyxcbiAgLy8gYWNjZXNzIHRva2Vu5Yi35paw5ZCO6Kem5Y+RXG4gIEFDQ0VTU19UT0tFTl9SRUZSRVNIRDogJ3JlZnJlc2hBY2Nlc3NUb2tlbidcbn07XG5cbmNvbnN0IGNvbXBvbmVudDogSUNsb3VkYmFzZUNvbXBvbmVudCA9IHtcbiAgbmFtZTogQ09NUE9ORU5UX05BTUUsXG4gIG5hbWVzcGFjZTogJ2F1dGgnLFxuICBpbmplY3RFdmVudHM6IHtcbiAgICBidXM6IGV2ZW50QnVzLFxuICAgIGV2ZW50czogW1xuICAgICAgRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCxcbiAgICAgIEVWRU5UUy5MT0dJTl9TVEFURV9FWFBJUkVELFxuICAgICAgRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQsXG4gICAgICBFVkVOVFMuQUNDRVNTX1RPS0VOX1JFRlJFU0hELFxuICAgICAgRVZFTlRTLkFOT05ZTU9VU19DT05WRVJURURcbiAgICBdXG4gIH0sXG4gIGVudGl0eTogZnVuY3Rpb24gKGNvbmZpZzogUGljazxJQ2xvdWRiYXNlQXV0aENvbmZpZywgJ3JlZ2lvbicgfCAncGVyc2lzdGVuY2UnPiA9IHsgcmVnaW9uOiAnJywgcGVyc2lzdGVuY2U6ICdsb2NhbCcgfSkge1xuICAgIGlmICh0aGlzLmF1dGhJbnN0YW5jZSkge1xuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwgJ2V2ZXJ5IGNsb3VkYmFzZSBpbnN0YW5jZSBzaG91bGQgaGFzIG9ubHkgb25lIGF1dGggb2JqZWN0Jyk7XG4gICAgICByZXR1cm4gdGhpcy5hdXRoSW5zdGFuY2U7XG4gICAgfVxuICAgIGNvbnN0IHsgYWRhcHRlciwgcnVudGltZSB9ID0gdGhpcy5wbGF0Zm9ybTtcbiAgICAvLyDlpoLkuI3mmI7noa7mjIflrppwZXJzaXN0ZW5jZeWImeS8mOWFiOWPluWQhOW5s+WPsGFkYXB0ZXLpppbpgInvvIzlhbbmrKFzZXNzaW9uXG4gICAgY29uc3QgbmV3UGVyc2lzdGVuY2UgPSBjb25maWcucGVyc2lzdGVuY2UgfHwgYWRhcHRlci5wcmltYXJ5U3RvcmFnZTtcbiAgICBpZiAobmV3UGVyc2lzdGVuY2UgJiYgKG5ld1BlcnNpc3RlbmNlICE9PSB0aGlzLmNvbmZpZy5wZXJzaXN0ZW5jZSkpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29uZmlnKHsgcGVyc2lzdGVuY2U6IG5ld1BlcnNpc3RlbmNlIH0pXG4gICAgfVxuXG4gICAgY29uc3QgeyBlbnYsIHBlcnNpc3RlbmNlLCBkZWJ1ZyB9ID0gdGhpcy5jb25maWc7XG4gICAgdGhpcy5hdXRoSW5zdGFuY2UgPSBuZXcgQXV0aCh7XG4gICAgICBlbnYsXG4gICAgICByZWdpb246IGNvbmZpZy5yZWdpb24sXG4gICAgICBwZXJzaXN0ZW5jZSxcbiAgICAgIGRlYnVnLFxuICAgICAgY2FjaGU6IHRoaXMuY2FjaGUsXG4gICAgICByZXF1ZXN0OiB0aGlzLnJlcXVlc3QsXG4gICAgICBydW50aW1lOiBydW50aW1lXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuYXV0aEluc3RhbmNlO1xuICB9XG59XG5cbnRyeSB7XG4gIC8vIOWwneivleiHquWKqOazqOWGjOiHs+WFqOWxgOWPmOmHj2Nsb3VkYmFzZVxuICAvLyDmraTooYzkuLrlj6rlnKjmtY/op4jlmajnjq/looPkuIvmnInmlYhcbiAgY2xvdWRiYXNlLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG59IGNhdGNoIChlKSB7IH1cblxuZXhwb3J0IHtcbiAgVXNlckluZm8sXG4gIEF1dGgsXG4gIEF1dGhQcm92aWRlcixcbiAgRVZFTlRTLFxuICBldmVudEJ1c1xufTtcbi8qKlxuICogQGFwaSDmiYvliqjms6jlhozoh7NjbG91ZGJhc2UgYXBwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckF1dGgoYXBwOiBQaWNrPElDbG91ZGJhc2UsICdyZWdpc3RlckNvbXBvbmVudCc+KSB7XG4gIHRyeSB7XG4gICAgYXBwLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLndhcm4oZSk7XG4gIH1cbn1cblxudHlwZSBJUHJvdmlkZXIgPSBuZXcgKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG4vKipcbiAqIOazqOWGjHByb3ZpZGVy77yM5aaC5p6cXG4gKiBAcGFyYW0gbmFtZVxuICogQHBhcmFtIHByb3ZpZGVyXG4gKiBAZXhhbXBsZVxuICogLy8g5rOo5YaMXG4gKiByZWdpc3RlclByb3ZpZGVyKCdlbWFpbEF1dGhQcm92aWRlcicsZnVuY3Rpb24oKXtcbiAqICAgLy8gLi4uXG4gKiB9KTtcbiAqIC8vIOS9v+eUqOaWsHByb3ZpZGVy55m75b2VXG4gKiBjbG91ZGJhc2UuYXV0aCgpLmVtYWlsQXV0aFByb3ZpZGVyKCkuc2lnbkluKCk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclByb3ZpZGVyKG5hbWU6IHN0cmluZywgcHJvdmlkZXI6IElQcm92aWRlcikge1xuICBjb25zdCBwcm90byA9IEF1dGgucHJvdG90eXBlO1xuICBwcm90b1tuYW1lXSA9IGZ1bmN0aW9uIChvcHRpb25zOiBvYmplY3QpIHtcbiAgICBjb25zdCBwcml2YXRlTmFtZSA9IGBfJHtuYW1lfWA7XG4gICAgaWYgKCF0aGlzW3ByaXZhdGVOYW1lXSkge1xuICAgICAgdGhpc1twcml2YXRlTmFtZV0gPSBuZXcgcHJvdmlkZXIoe1xuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAuLi50aGlzLl9jb25maWdcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpc1twcml2YXRlTmFtZV07XG4gIH07XG59Il19