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
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
            return __generator(this, function (_t) {
                switch (_t.label) {
                    case 0:
                        _a = this;
                        return [4, this._getLocalUserInfoAsync('uid')];
                    case 1:
                        _a.uid = _t.sent();
                        _b = this;
                        return [4, this._getLocalUserInfoAsync('loginType')];
                    case 2:
                        _b.loginType = _t.sent();
                        _c = this;
                        return [4, this._getLocalUserInfoAsync('wxOpenId')];
                    case 3:
                        _c.openid = _t.sent();
                        _d = this;
                        return [4, this._getLocalUserInfoAsync('wxOpenId')];
                    case 4:
                        _d.wxOpenId = _t.sent();
                        _e = this;
                        return [4, this._getLocalUserInfoAsync('wxPublicId')];
                    case 5:
                        _e.wxPublicId = _t.sent();
                        _f = this;
                        return [4, this._getLocalUserInfoAsync('wxUnionId')];
                    case 6:
                        _f.unionId = _t.sent();
                        _g = this;
                        return [4, this._getLocalUserInfoAsync('qqMiniOpenId')];
                    case 7:
                        _g.qqMiniOpenId = _t.sent();
                        _h = this;
                        return [4, this._getLocalUserInfoAsync('customUserId')];
                    case 8:
                        _h.customUserId = _t.sent();
                        _j = this;
                        return [4, this._getLocalUserInfoAsync('nickName')];
                    case 9:
                        _j.nickName = _t.sent();
                        _k = this;
                        return [4, this._getLocalUserInfoAsync('gender')];
                    case 10:
                        _k.gender = _t.sent();
                        _l = this;
                        return [4, this._getLocalUserInfoAsync('avatarUrl')];
                    case 11:
                        _l.avatarUrl = _t.sent();
                        _m = this;
                        return [4, this._getLocalUserInfoAsync('email')];
                    case 12:
                        _m.email = _t.sent();
                        _o = this;
                        _p = Boolean;
                        return [4, this._getLocalUserInfoAsync('hasPassword')];
                    case 13:
                        _o.hasPassword = _p.apply(void 0, [_t.sent()]);
                        _q = this;
                        return [4, this._getLocalUserInfoAsync('phone')];
                    case 14:
                        _q.phone = _t.sent();
                        _r = this;
                        _s = {};
                        return [4, this._getLocalUserInfoAsync('country')];
                    case 15:
                        _s.country = _t.sent();
                        return [4, this._getLocalUserInfoAsync('province')];
                    case 16:
                        _s.province = _t.sent();
                        return [4, this._getLocalUserInfoAsync('city')];
                    case 17:
                        _r.location = (_s.city = _t.sent(),
                            _s);
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
            'phone'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBS25GLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFBO0FBSXpELElBQUEscUJBQXFCLEdBQUssTUFBTSxzQkFBWCxDQUFZO0FBQ2pDLElBQUEsT0FBTyxHQUFLLFFBQVEsUUFBYixDQUFjO0FBQ3JCLElBQUEsU0FBUyxHQUFpQyxLQUFLLFVBQXRDLEVBQUUsVUFBVSxHQUFxQixLQUFLLFdBQTFCLEVBQUUsY0FBYyxHQUFLLEtBQUssZUFBVixDQUFXO0FBQ2hELElBQUEsTUFBTSxHQUF5QixTQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUssU0FBUyxtQkFBZCxDQUFlO0FBQ3pDLElBQUEsb0JBQW9CLEdBQUssT0FBTyxxQkFBWixDQUFhO0FBRXpDLElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQztBQWM5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QUMsQ0FBQztLQUNsQztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUM7QUFlRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsSUFBWSxFQUFFLFFBQW1CO0lBQ2hFLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDN0IsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsT0FBZTtRQUNyQyxJQUFNLFdBQVcsR0FBRyxNQUFJLElBQU0sQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLFFBQVEsdUJBQzNCLE9BQU8sR0FDUCxJQUFJLENBQUMsT0FBTyxFQUNmLENBQUM7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBldmVudHMsIGFkYXB0ZXJzLCB1dGlscywgY29uc3RhbnRzLCBoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNhY2hlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlUmVxdWVzdCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVxdWVzdCc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQXV0aENvbmZpZywgSUNyZWRlbnRpYWwsIElVc2VyLCBJVXNlckluZm8sIElBdXRoUHJvdmlkZXIsIElMb2dpblN0YXRlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9hdXRoJztcbmltcG9ydCB7IElDbG91ZGJhc2VDb21wb25lbnQgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBXZWl4aW5BdXRoUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy93ZWl4aW5BdXRoUHJvdmlkZXInO1xuaW1wb3J0IHsgQW5vbnltb3VzQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvYW5vbnltb3VzQXV0aFByb3ZpZGVyJztcbmltcG9ydCB7IEN1c3RvbUF1dGhQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2N1c3RvbUF1dGhQcm92aWRlcic7XG5pbXBvcnQgeyBMT0dJTlRZUEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy9iYXNlJztcbmltcG9ydCB7IEVtYWlsQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvZW1haWxBdXRoUHJvdmlkZXInO1xuaW1wb3J0IHsgVXNlcm5hbWVBdXRoUHJvdmlkZXIgfSBmcm9tICcuL3Byb3ZpZGVycy91c2VybmFtZUF1dGhQcm92aWRlcic7XG5pbXBvcnQgeyBQaG9uZUF1dGhQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL3Bob25lQXV0aFByb3ZpZGVyJ1xuXG5kZWNsYXJlIGNvbnN0IGNsb3VkYmFzZTogSUNsb3VkYmFzZTtcblxuY29uc3QgeyBDbG91ZGJhc2VFdmVudEVtaXR0ZXIgfSA9IGV2ZW50cztcbmNvbnN0IHsgUlVOVElNRSB9ID0gYWRhcHRlcnM7XG5jb25zdCB7IHByaW50V2FybiwgdGhyb3dFcnJvciwgdHJhbnNmb3JtUGhvbmUgfSA9IHV0aWxzO1xuY29uc3QgeyBFUlJPUlMsIENPTU1VTklUWV9TSVRFX1VSTCB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyBjYXRjaEVycm9yc0RlY29yYXRvciB9ID0gaGVscGVycztcblxuY29uc3QgQ09NUE9ORU5UX05BTUUgPSAnYXV0aCc7XG5cbmludGVyZmFjZSBVc2VySW5mbyB7XG4gIG9wZW5pZDogc3RyaW5nO1xuICBuaWNrbmFtZT86IHN0cmluZztcbiAgc2V4PzogbnVtYmVyO1xuICBwcm92aW5jZT86IHN0cmluZztcbiAgY2l0eT86IHN0cmluZztcbiAgY291bnRyeT86IHN0cmluZztcbiAgaGVhZGltZ3VybD86IHN0cmluZztcbiAgcHJpdmlsZWdlPzogW3N0cmluZ107XG4gIHVuaW9uaWQ/OiBzdHJpbmc7XG59XG5cbmNvbnN0IGV2ZW50QnVzID0gbmV3IENsb3VkYmFzZUV2ZW50RW1pdHRlcigpO1xuXG5pbnRlcmZhY2UgSVVzZXJPcHRpb25zIHtcbiAgY2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcbiAgcmVxdWVzdDogSUNsb3VkYmFzZVJlcXVlc3Q7XG59XG5cbmNsYXNzIFVzZXIgaW1wbGVtZW50cyBJVXNlciB7XG4gIHB1YmxpYyB1aWQ6IHN0cmluZztcbiAgcHVibGljIGxvZ2luVHlwZTogc3RyaW5nO1xuICBwdWJsaWMgb3BlbmlkOiBzdHJpbmc7XG4gIHB1YmxpYyB3eE9wZW5JZDogc3RyaW5nO1xuICBwdWJsaWMgd3hQdWJsaWNJZDogc3RyaW5nO1xuICBwdWJsaWMgdW5pb25JZDogc3RyaW5nO1xuICBwdWJsaWMgcXFNaW5pT3BlbklkOiBzdHJpbmc7XG4gIHB1YmxpYyBjdXN0b21Vc2VySWQ6IHN0cmluZztcbiAgcHVibGljIG5pY2tOYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBnZW5kZXI6IHN0cmluZztcbiAgcHVibGljIGF2YXRhclVybDogc3RyaW5nO1xuICBwdWJsaWMgZW1haWw6IHN0cmluZztcbiAgcHVibGljIGhhc1Bhc3N3b3JkOiBib29sZWFuO1xuICBwdWJsaWMgcGhvbmU/OiBzdHJpbmc7XG4gIHB1YmxpYyBsb2NhdGlvbj86IHtcbiAgICBjb3VudHJ5Pzogc3RyaW5nO1xuICAgIHByb3ZpbmNlPzogc3RyaW5nO1xuICAgIGNpdHk/OiBzdHJpbmc7XG4gIH07XG5cbiAgcHJpdmF0ZSBfY2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcbiAgcHJpdmF0ZSBfcmVxdWVzdDogSUNsb3VkYmFzZVJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogSVVzZXJPcHRpb25zKSB7XG4gICAgY29uc3QgeyBjYWNoZSwgcmVxdWVzdCB9ID0gb3B0aW9ucztcbiAgICB0aGlzLl9jYWNoZSA9IGNhY2hlO1xuICAgIHRoaXMuX3JlcXVlc3QgPSByZXF1ZXN0O1xuXG4gICAgdGhpcy5fc2V0VXNlckluZm8oKTtcbiAgfVxuICAvKipcbiAgICog6I635Y+W5pys5Zyw55So5oi35L+h5oGvLeWQjOatpVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNoZWNrTG9jYWxJbmZvKCkge1xuICAgIHRoaXMudWlkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygndWlkJyk7XG4gICAgdGhpcy5sb2dpblR5cGUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdsb2dpblR5cGUnKTtcbiAgICB0aGlzLm9wZW5pZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3d4T3BlbklkJyk7XG4gICAgdGhpcy53eE9wZW5JZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3d4T3BlbklkJyk7XG4gICAgdGhpcy53eFB1YmxpY0lkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnd3hQdWJsaWNJZCcpO1xuICAgIHRoaXMudW5pb25JZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3d4VW5pb25JZCcpO1xuICAgIHRoaXMucXFNaW5pT3BlbklkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncXFNaW5pT3BlbklkJyk7XG4gICAgdGhpcy5jdXN0b21Vc2VySWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdjdXN0b21Vc2VySWQnKTtcbiAgICB0aGlzLm5pY2tOYW1lID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnbmlja05hbWUnKTtcbiAgICB0aGlzLmdlbmRlciA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2dlbmRlcicpO1xuICAgIHRoaXMuYXZhdGFyVXJsID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnYXZhdGFyVXJsJyk7XG4gICAgdGhpcy5lbWFpbCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2VtYWlsJyk7XG4gICAgdGhpcy5oYXNQYXNzd29yZCA9IEJvb2xlYW4odGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnaGFzUGFzc3dvcmQnKSk7XG4gICAgdGhpcy5waG9uZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3Bob25lJylcbiAgICB0aGlzLmxvY2F0aW9uID0ge1xuICAgICAgY291bnRyeTogdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnY291bnRyeScpLFxuICAgICAgcHJvdmluY2U6IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3Byb3ZpbmNlJyksXG4gICAgICBjaXR5OiB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdjaXR5JylcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnlKjmiLfkv6Hmga8t5byC5q2lXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hlY2tMb2NhbEluZm9Bc3luYygpIHtcbiAgICB0aGlzLnVpZCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygndWlkJyk7XG4gICAgdGhpcy5sb2dpblR5cGUgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2xvZ2luVHlwZScpO1xuICAgIHRoaXMub3BlbmlkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd3eE9wZW5JZCcpO1xuICAgIHRoaXMud3hPcGVuSWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3d4T3BlbklkJyk7XG4gICAgdGhpcy53eFB1YmxpY0lkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd3eFB1YmxpY0lkJyk7XG4gICAgdGhpcy51bmlvbklkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd3eFVuaW9uSWQnKTtcbiAgICB0aGlzLnFxTWluaU9wZW5JZCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygncXFNaW5pT3BlbklkJyk7XG4gICAgdGhpcy5jdXN0b21Vc2VySWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2N1c3RvbVVzZXJJZCcpO1xuICAgIHRoaXMubmlja05hbWUgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ25pY2tOYW1lJyk7XG4gICAgdGhpcy5nZW5kZXIgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2dlbmRlcicpO1xuICAgIHRoaXMuYXZhdGFyVXJsID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdhdmF0YXJVcmwnKTtcbiAgICB0aGlzLmVtYWlsID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdlbWFpbCcpO1xuICAgIHRoaXMuaGFzUGFzc3dvcmQgPSBCb29sZWFuKGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnaGFzUGFzc3dvcmQnKSk7XG4gICAgdGhpcy5waG9uZSA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygncGhvbmUnKVxuICAgIHRoaXMubG9jYXRpb24gPSB7XG4gICAgICBjb3VudHJ5OiBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2NvdW50cnknKSxcbiAgICAgIHByb3ZpbmNlOiBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3Byb3ZpbmNlJyksXG4gICAgICBjaXR5OiBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2NpdHknKVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICog5bCG5b2T5YmN6LSm5oi35LiO6Ieq5a6a5LmJ55m75b2VIFRpY2tldCDov5vooYznu5HlrprvvIznu5HlrprkuYvlkI7kvr/lj6/ku6XpgJrov4foh6rlrprkuYnnmbvlvZXnmbvlvZXlvZPliY3kupHlvIDlj5HotKbmiLfjgIJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpY2tldCDoh6rlrprkuYnnmbvlvZV0aWNrZXRcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnu5Hlrproh6rlrprkuYnnmbvlvZXlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5saW5rV2l0aFRpY2tldCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5q2k6LSm5oi35piv5ZCm5bey57uP57uR5a6a6Ieq5a6a5LmJ55m75b2VJyxcbiAgICAgICcgIDMgLSB0aWNrZXQg5Y+C5pWw5piv5ZCm5b2S5bGe5b2T5YmN546v5aKDJyxcbiAgICAgICcgIDQgLSDliJvlu7ogdGlja2V0IOeahOiHquWumuS5ieeZu+W9leengemSpeaYr+WQpui/h+acnycsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGxpbmtXaXRoVGlja2V0KHRpY2tldDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHR5cGVvZiB0aWNrZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RpY2tldCBtdXN0IGJlIHN0cmluZycpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLmxpbmtXaXRoVGlja2V0JywgeyB0aWNrZXQgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOWwhuW9k+WJjei0puaIt+S4juesrOS4ieaWuemJtOadg+aPkOS+m+aWue+8jOS7pemHjeWumuWQkeeahOW9ouW8j++8jOi/m+ihjOe7keWumu+8jOe7keWumuS5i+WQjuS+v+WPr+S7pemAmui/h+esrOS4ieaWuemJtOadg+aPkOS+m+aWueeZu+W9leW9k+WJjeeahOS6keW8gOWPkei0puaIt+OAglxuICAgKiBAcGFyYW0gcHJvdmlkZXIg54m55a6a55m75b2V5pa55byP55qEcHJvdmlkZXLvvIzlv4XpobvlhbflpIdzaWduSW5XaXRoUmVkaXJlY3Tmlrnms5VcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnu5HlrprnrKzkuInmlrnnmbvlvZXmlrnlvI/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5saW5rV2l0aFJlZGlyZWN0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDmraTotKbmiLfmmK/lkKblt7Lnu4/nu5HlrprmraTnrKzkuInmlrknLFxuICAgICAgJyAgMyAtIOatpOesrOS4ieaWueaYr+WQpuW3sue7j+aOiOadgycsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGxpbmtXaXRoUmVkaXJlY3QocHJvdmlkZXI6IElBdXRoUHJvdmlkZXIpOiB2b2lkIHtcbiAgICBwcm92aWRlci5zaWduSW5XaXRoUmVkaXJlY3QoKTtcbiAgfVxuICAvKipcbiAgICog6I635Y+W5b2T5YmN6LSm5oi355qE5b6u5L+hIFVuaW9uSUQg57uR5a6a55qE5LqR5byA5Y+R6LSm5oi35YiX6KGo44CC5aaC5p6c5b2T5YmN6LSm5oi35LiN5a2Y5ZyoIFVuaW9uSUTvvIzkvJrov5Tlm57plJnor6/jgIJcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5botKbmiLfliJfooajlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5nZXRMaW5rZWRVaWRMaXN0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0TGlua2VkVWlkTGlzdCgpIHtcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5nZXRMaW5rZWRVaWRMaXN0Jywge30pO1xuICAgIGxldCBoYXNQcmltYXJ5VWlkID0gZmFsc2U7XG4gICAgY29uc3QgdXNlcnMgPSBkYXRhLnVzZXJzIGFzIElVc2VySW5mb1tdO1xuICAgIGZvciAoY29uc3QgdXNlciBvZiB1c2Vycykge1xuICAgICAgaWYgKHVzZXIud3hPcGVuSWQgJiYgdXNlci53eFB1YmxpY0lkKSB7XG4gICAgICAgIGhhc1ByaW1hcnlVaWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXJzLFxuICAgICAgaGFzUHJpbWFyeVVpZFxuICAgIH07XG4gIH1cbiAgLyoqXG4gICAqIOiuvue9ruW+ruS/oeS4u+i0puWPt++8jOmAmuW4uOaQremFjeWSjCBVc2VyLmdldExpbmtlZFVpZExpc3QoKSDkvb/nlKjvvIznlKjkuo7lnKjlkIzkuKrlvq7kv6EgVW5pb25JRCDlr7nlupTnmoTlpJrkuKrkupHlvIDlj5HotKblj7fkuK3vvIzorr7nva7lhbbkuK3kuIDkuKrkuLrkuLvotKblj7dcbiAgICog6K6+572u5LmL5ZCO77yM6YCa6L+HIFVuaW9uSUQg55m75b2V5L6/5Lya55m75b2V6Iez5Li76LSm5Y+35LmL5LiK44CCXG4gICAqIEBwYXJhbSB1aWRcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICforr7nva7lvq7kv6HkuLvotKblj7flpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5zZXRQcmltYXJ5VWlkKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgc2V0UHJpbWFyeVVpZCh1aWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGguc2V0UHJpbWFyeVVpZCcsIHsgdWlkIH0pO1xuICB9XG4gIC8qKlxuICAgKiDop6Pnu5Hmn5DkuKrnmbvlvZXmlrnlvI9cbiAgICogQHBhcmFtIGxvZ2luVHlwZVxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+aOpeinpue7keWumuWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnVubGluaygpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN6LSm5oi35piv5ZCm5bey57uP5LiO5q2k55m75b2V5pa55byP6Kej57uRJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgdW5saW5rKGxvZ2luVHlwZTogJ0NVU1RPTScgfCAnV0VDSEFULU9QRU4nIHwgJ1dFQ0hBVC1QVUJMSUMnIHwgJ1dFQ0hBVC1VTklPTicgfCAnUEhPTkUnKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC51bmxpbmsnLCB7IHBsYXRmb3JtOiBsb2dpblR5cGUgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOabtOaWsOeUqOaIt+S/oeaBr1xuICAgKiBAcGFyYW0gdXNlckluZm9cbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmm7TmlrDnlKjmiLfkv6Hmga/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci51cGRhdGUoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOeUqOaIt+S/oeaBr+S4reaYr+WQpuWMheWQq+mdnuazleWAvCcsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHVwZGF0ZSh1c2VySW5mbzogSVVzZXJJbmZvKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBuaWNrTmFtZSwgZ2VuZGVyLCBhdmF0YXJVcmwsIHByb3ZpbmNlLCBjb3VudHJ5LCBjaXR5IH0gPSB1c2VySW5mbztcbiAgICBjb25zdCB7IGRhdGE6IG5ld1VzZXJJbmZvIH0gPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGgudXBkYXRlVXNlckluZm8nLCB7IG5pY2tOYW1lLCBnZW5kZXIsIGF2YXRhclVybCwgcHJvdmluY2UsIGNvdW50cnksIGNpdHkgfSk7XG4gICAgdGhpcy5fc2V0TG9jYWxVc2VySW5mbyhuZXdVc2VySW5mbyk7XG4gIH1cbiAgLyoqXG4gICAqIOabtOaWsOWvhueggVxuICAgKiBAcGFyYW0gbmV3UGFzc3dvcmRcbiAgICogQHBhcmFtIG9sZFBhc3N3b3JkXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw5a+G56CB5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlUGFzc3dvcmQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMyAtIOaWsOWvhueggeS4reaYr+WQpuWMheWQq+mdnuazleWtl+espicsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIHVwZGF0ZVBhc3N3b3JkKG5ld1Bhc3N3b3JkOiBzdHJpbmcsIG9sZFBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnVwZGF0ZVBhc3N3b3JkJywge1xuICAgICAgb2xkUGFzc3dvcmQsXG4gICAgICBuZXdQYXNzd29yZFxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDmm7TmlrDpgq7nrrHlnLDlnYBcbiAgICogQHBhcmFtIG5ld0VtYWlsXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw6YKu566x5Zyw5Z2A5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlRW1haWwoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6humCrueuseWvhueggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIHVwZGF0ZUVtYWlsKG5ld0VtYWlsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnVwZGF0ZUVtYWlsJywge1xuICAgICAgbmV3RW1haWxcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog5pu05paw55So5oi35ZCNXG4gICAqIEBwYXJhbSB1c2VybmFtZVxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+abtOaWsOeUqOaIt+WQjeWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnVwZGF0ZVVzZXJuYW1lKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobnlKjmiLflkI3lr4bnoIHnmbvlvZUnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyB1cGRhdGVVc2VybmFtZSh1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiB1c2VybmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCAndXNlcm5hbWUgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGgudXBkYXRlVXNlcm5hbWUnLCB7XG4gICAgICB1c2VybmFtZVxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDliLfmlrDmnKzlnLDnlKjmiLfkv6Hmga/jgILlvZPnlKjmiLflnKjlhbbku5blrqLmiLfnq6/mm7TmlrDnlKjmiLfkv6Hmga/kuYvlkI7vvIzlj6/ku6XosIPnlKjmraTmjqXlj6PlkIzmraXmm7TmlrDkuYvlkI7nmoTkv6Hmga/jgIJcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfliLfmlrDmnKzlnLDnlKjmiLfkv6Hmga/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5yZWZyZXNoKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgcmVmcmVzaCgpOiBQcm9taXNlPElVc2VySW5mbz4ge1xuICAgIGNvbnN0IGFjdGlvbiA9ICdhdXRoLmdldFVzZXJJbmZvJztcbiAgICBjb25zdCB7IGRhdGE6IHVzZXJJbmZvIH0gPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoYWN0aW9uLCB7fSk7XG4gICAgdGhpcy5fc2V0TG9jYWxVc2VySW5mbyh1c2VySW5mbyk7XG4gICAgcmV0dXJuIHVzZXJJbmZvO1xuICB9XG5cbiAgLyoqXG4gKiDnu5HlrprmiYvmnLrlj7dcbiAqIEBwYXJhbSBwaG9uZU51bWJlclxuICogQHBhcmFtIHBob25lQ29kZVxuICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnu5HlrprmiYvmnLrlj7flpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmxpbmtXaXRoUGhvbmVOdW1iZXIoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huefreS/oemqjOivgeeggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGxpbmtXaXRoUGhvbmVOdW1iZXIocGhvbmVOdW1iZXI6IHN0cmluZywgcGhvbmVDb2RlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLmxpbmtPclVwZGF0ZVBob25lTnVtYmVyJywge1xuICAgICAgcGhvbmVOdW1iZXI6IHRyYW5zZm9ybVBob25lKHBob25lTnVtYmVyKSxcbiAgICAgIHBob25lQ29kZVxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDmm7TmlrDmiYvmnLrlj7dcbiAgICogQHBhcmFtIHBob25lTnVtYmVyXG4gICAqIEBwYXJhbSBwaG9uZUNvZGVcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmm7TmlrDmiYvmnLrlj7flpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKjor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huefreS/oemqjOivgeeggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHVwZGF0ZVBob25lTnVtYmVyKHBob25lTnVtYmVyOiBzdHJpbmcsIHBob25lQ29kZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5saW5rT3JVcGRhdGVQaG9uZU51bWJlcicsIHtcbiAgICAgIHBob25lTnVtYmVyOiB0cmFuc2Zvcm1QaG9uZShwaG9uZU51bWJlciksXG4gICAgICBwaG9uZUNvZGVcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldExvY2FsVXNlckluZm8oa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHsgdXNlckluZm9LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgdXNlckluZm8gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZSh1c2VySW5mb0tleSk7XG4gICAgcmV0dXJuIHVzZXJJbmZvW2tleV07XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoa2V5OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHsgdXNlckluZm9LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgdXNlckluZm8gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHVzZXJJbmZvS2V5KTtcbiAgICByZXR1cm4gdXNlckluZm9ba2V5XTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldFVzZXJJbmZvKCkge1xuICAgIGNvbnN0IHsgdXNlckluZm9LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgdXNlckluZm8gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZSh1c2VySW5mb0tleSk7XG4gICAgW1xuICAgICAgJ3VpZCcsXG4gICAgICAnbG9naW5UeXBlJyxcbiAgICAgICdvcGVuaWQnLFxuICAgICAgJ3d4T3BlbklkJyxcbiAgICAgICd3eFB1YmxpY0lkJyxcbiAgICAgICd1bmlvbklkJyxcbiAgICAgICdxcU1pbmlPcGVuSWQnLFxuICAgICAgJ2VtYWlsJyxcbiAgICAgICdoYXNQYXNzd29yZCcsXG4gICAgICAnY3VzdG9tVXNlcklkJyxcbiAgICAgICduaWNrTmFtZScsXG4gICAgICAnZ2VuZGVyJyxcbiAgICAgICdhdmF0YXJVcmwnLFxuICAgICAgJ3Bob25lJ1xuICAgIF0uZm9yRWFjaChpbmZvS2V5ID0+IHtcbiAgICAgIHRoaXNbaW5mb0tleV0gPSB1c2VySW5mb1tpbmZvS2V5XTtcbiAgICB9KTtcblxuICAgIHRoaXMubG9jYXRpb24gPSB7XG4gICAgICBjb3VudHJ5OiB1c2VySW5mb1snY291bnRyeSddLFxuICAgICAgcHJvdmluY2U6IHVzZXJJbmZvWydwcm92aW5jZSddLFxuICAgICAgY2l0eTogdXNlckluZm9bJ2NpdHknXVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9zZXRMb2NhbFVzZXJJbmZvKHVzZXJJbmZvOiBhbnkpIHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIHRoaXMuX2NhY2hlLnNldFN0b3JlKHVzZXJJbmZvS2V5LCB1c2VySW5mbyk7XG4gICAgdGhpcy5fc2V0VXNlckluZm8oKTtcbiAgfVxufVxuaW50ZXJmYWNlIElMb2dpblN0YXRlT3B0aW9ucyBleHRlbmRzIElVc2VyT3B0aW9ucyB7XG4gIGVudklkOiBzdHJpbmc7XG59XG5leHBvcnQgY2xhc3MgTG9naW5TdGF0ZSBpbXBsZW1lbnRzIElMb2dpblN0YXRlIHtcbiAgcHVibGljIGNyZWRlbnRpYWw6IElDcmVkZW50aWFsO1xuICBwdWJsaWMgdXNlcjogSVVzZXI7XG5cbiAgcHJpdmF0ZSBfY2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcbiAgcHJpdmF0ZSBfbG9naW5UeXBlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogSUxvZ2luU3RhdGVPcHRpb25zKSB7XG4gICAgY29uc3QgeyBlbnZJZCwgY2FjaGUsIHJlcXVlc3QgfSA9IG9wdGlvbnM7XG4gICAgaWYgKCFlbnZJZCkge1xuICAgICAgdGhyb3dFcnJvcihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsICdlbnZJZCBpcyBub3QgZGVmaW5lZCcpO1xuICAgIH1cbiAgICB0aGlzLl9jYWNoZSA9IGNhY2hlO1xuXG4gICAgdGhpcy51c2VyID0gbmV3IFVzZXIoe1xuICAgICAgY2FjaGUsXG4gICAgICByZXF1ZXN0XG4gICAgfSk7XG4gIH1cblxuXG4gIHB1YmxpYyBhc3luYyBjaGVja0xvY2FsU3RhdGUoKSB7XG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXksIGFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbkV4cGlyZUtleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZShyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUoYWNjZXNzVG9rZW5LZXkpO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuRXhwaXJlID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUoYWNjZXNzVG9rZW5FeHBpcmVLZXkpO1xuXG4gICAgdGhpcy5jcmVkZW50aWFsID0ge1xuICAgICAgcmVmcmVzaFRva2VuLFxuICAgICAgYWNjZXNzVG9rZW4sXG4gICAgICBhY2Nlc3NUb2tlbkV4cGlyZVxuICAgIH07XG5cbiAgICB0aGlzLl9sb2dpblR5cGUgPSB0aGlzLl9jYWNoZS5nZXRTdG9yZSh0aGlzLl9jYWNoZS5rZXlzLmxvZ2luVHlwZUtleSk7XG5cbiAgICB0aGlzLnVzZXIuY2hlY2tMb2NhbEluZm8oKTtcbiAgfVxuICBwdWJsaWMgYXN5bmMgY2hlY2tMb2NhbFN0YXRlQXN5bmMoKSB7XG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXksIGFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbkV4cGlyZUtleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbkV4cGlyZSA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpO1xuXG4gICAgdGhpcy5jcmVkZW50aWFsID0ge1xuICAgICAgcmVmcmVzaFRva2VuLFxuICAgICAgYWNjZXNzVG9rZW4sXG4gICAgICBhY2Nlc3NUb2tlbkV4cGlyZVxuICAgIH07XG5cbiAgICB0aGlzLl9sb2dpblR5cGUgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHRoaXMuX2NhY2hlLmtleXMubG9naW5UeXBlS2V5KTtcblxuXG4gICAgYXdhaXQgdGhpcy51c2VyLmNoZWNrTG9jYWxJbmZvQXN5bmMoKTtcbiAgfVxuXG4gIGdldCBpc0Fub255bW91c0F1dGgoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9naW5UeXBlID09PSBMT0dJTlRZUEUuQU5PTllNT1VTO1xuICB9XG5cbiAgZ2V0IGlzQ3VzdG9tQXV0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2dpblR5cGUgPT09IExPR0lOVFlQRS5DVVNUT007XG4gIH1cblxuICBnZXQgaXNXZWl4aW5BdXRoKCkge1xuICAgIHJldHVybiB0aGlzLmxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLldFQ0hBVCB8fCB0aGlzLmxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLldFQ0hBVF9PUEVOIHx8IHRoaXMubG9naW5UeXBlID09PSBMT0dJTlRZUEUuV0VDSEFUX1BVQkxJQztcbiAgfVxuXG4gIGdldCBpc1VzZXJuYW1lQXV0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2dpblR5cGUgPT09IExPR0lOVFlQRS5VU0VSTkFNRTtcbiAgfVxuXG4gIGdldCBsb2dpblR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvZ2luVHlwZVxuICB9XG5cbiAgZ2V0IGlzUGhvbmVBdXRoKCkge1xuICAgIHJldHVybiB0aGlzLmxvZ2luVHlwZSA9PT0gTE9HSU5UWVBFLlBIT05FXG4gIH1cbn1cblxuY2xhc3MgQXV0aCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2NvbmZpZzogSUNsb3VkYmFzZUF1dGhDb25maWc7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2NhY2hlOiBJQ2xvdWRiYXNlQ2FjaGVcbiAgcHJpdmF0ZSByZWFkb25seSBfcmVxdWVzdDogSUNsb3VkYmFzZVJlcXVlc3Q7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3J1bnRpbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfYW5vbnltb3VzQXV0aFByb3ZpZGVyOiBBbm9ueW1vdXNBdXRoUHJvdmlkZXI7XG4gIHByaXZhdGUgX2N1c3RvbUF1dGhQcm92aWRlcjogQ3VzdG9tQXV0aFByb3ZpZGVyO1xuICBwcml2YXRlIF93ZWl4aW5BdXRoUHJvdmlkZXI6IFdlaXhpbkF1dGhQcm92aWRlcjtcbiAgcHJpdmF0ZSBfZW1haWxBdXRoUHJvdmlkZXI6IEVtYWlsQXV0aFByb3ZpZGVyO1xuICBwcml2YXRlIF91c2VybmFtZUF1dGhQcm92aWRlcjogVXNlcm5hbWVBdXRoUHJvdmlkZXI7XG4gIHByaXZhdGUgX3Bob25lQXV0aFByb3ZpZGVyOiBQaG9uZUF1dGhQcm92aWRlcjtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IElDbG91ZGJhc2VBdXRoQ29uZmlnICYgeyBjYWNoZTogSUNsb3VkYmFzZUNhY2hlLCByZXF1ZXN0OiBJQ2xvdWRiYXNlUmVxdWVzdCwgcnVudGltZT86IHN0cmluZyB9KSB7XG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICAgIHRoaXMuX2NhY2hlID0gY29uZmlnLmNhY2hlO1xuICAgIHRoaXMuX3JlcXVlc3QgPSBjb25maWcucmVxdWVzdDtcbiAgICB0aGlzLl9ydW50aW1lID0gY29uZmlnLnJ1bnRpbWUgfHwgUlVOVElNRS5XRUJcblxuICAgIGV2ZW50QnVzLm9uKEVWRU5UUy5MT0dJTl9UWVBFX0NIQU5HRUQsIHRoaXMuX29uTG9naW5UeXBlQ2hhbmdlZC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5blvZPliY3nmbvlvZXnmoTnlKjmiLfkv6Hmga8t5ZCM5q2lXG4gICAqL1xuICBnZXQgY3VycmVudFVzZXIoKSB7XG4gICAgaWYgKHRoaXMuX2NhY2hlLm1vZGUgPT09ICdhc3luYycpIHtcbiAgICAgIC8vIGFzeW5jIHN0b3JhZ2XnmoTlubPlj7DosIPnlKjmraRBUEnmj5DnpLpcbiAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sICdjdXJyZW50IHBsYXRmb3JtXFwncyBzdG9yYWdlIGlzIGFzeW5jaHJvbm91cywgcGxlYXNlIHVzZSBnZXRDdXJyZW5Vc2VyIGluc3RlZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsb2dpblN0YXRlID0gdGhpcy5oYXNMb2dpblN0YXRlKCk7XG5cbiAgICBpZiAobG9naW5TdGF0ZSkge1xuICAgICAgcmV0dXJuIGxvZ2luU3RhdGUudXNlciB8fCBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAqIOiOt+WPluW9k+WJjeeZu+W9leexu+Weiy3lkIzmraVcbiAqL1xuICBnZXQgbG9naW5UeXBlKCk6IExPR0lOVFlQRSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlLmdldFN0b3JlKHRoaXMuX2NhY2hlLmtleXMubG9naW5UeXBlS2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5blvZPliY3nmbvlvZXnmoTnlKjmiLfkv6Hmga8t5byC5q2lXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W55So5oi35L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5nZXRDdXJyZW5Vc2VyKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0Q3VycmVuVXNlcigpIHtcbiAgICBjb25zdCBsb2dpblN0YXRlID0gYXdhaXQgdGhpcy5nZXRMb2dpblN0YXRlKCk7XG4gICAgaWYgKGxvZ2luU3RhdGUpIHtcbiAgICAgIGF3YWl0IGxvZ2luU3RhdGUudXNlci5jaGVja0xvY2FsSW5mb0FzeW5jKCk7XG4gICAgICByZXR1cm4gbG9naW5TdGF0ZS51c2VyIHx8IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog6I635Y+W5b2T5YmN55m75b2V57G75Z6LLeW8guatpVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldExvZ2luVHlwZSgpOiBQcm9taXNlPExPR0lOVFlQRT4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHRoaXMuX2NhY2hlLmtleXMubG9naW5UeXBlS2V5KSBhcyBMT0dJTlRZUEU7XG4gIH1cbiAgcHVibGljIGFzeW5jIGdldEFjY2Vzc1Rva2VuKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhY2Nlc3NUb2tlbjogKGF3YWl0IHRoaXMuX3JlcXVlc3QuZ2V0QWNjZXNzVG9rZW4oKSkuYWNjZXNzVG9rZW4sXG4gICAgICBlbnY6IHRoaXMuX2NvbmZpZy5lbnZcbiAgICB9O1xuICB9XG4gIHB1YmxpYyB3ZWl4aW5BdXRoUHJvdmlkZXIoeyBhcHBpZCwgc2NvcGUsIHN0YXRlIH0pOiBXZWl4aW5BdXRoUHJvdmlkZXIge1xuICAgIGlmICghdGhpcy5fd2VpeGluQXV0aFByb3ZpZGVyKSB7XG4gICAgICB0aGlzLl93ZWl4aW5BdXRoUHJvdmlkZXIgPSBuZXcgV2VpeGluQXV0aFByb3ZpZGVyKHtcbiAgICAgICAgLi4udGhpcy5fY29uZmlnLFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3QsXG4gICAgICAgIHJ1bnRpbWU6IHRoaXMuX3J1bnRpbWVcbiAgICAgIH0sIGFwcGlkLCBzY29wZSwgc3RhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fd2VpeGluQXV0aFByb3ZpZGVyO1xuICB9XG4gIHB1YmxpYyBhbm9ueW1vdXNBdXRoUHJvdmlkZXIoKTogQW5vbnltb3VzQXV0aFByb3ZpZGVyIHtcbiAgICBpZiAoIXRoaXMuX2Fub255bW91c0F1dGhQcm92aWRlcikge1xuICAgICAgdGhpcy5fYW5vbnltb3VzQXV0aFByb3ZpZGVyID0gbmV3IEFub255bW91c0F1dGhQcm92aWRlcih7XG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2Fub255bW91c0F1dGhQcm92aWRlcjtcbiAgfVxuICBwdWJsaWMgY3VzdG9tQXV0aFByb3ZpZGVyKCk6IEN1c3RvbUF1dGhQcm92aWRlciB7XG4gICAgaWYgKCF0aGlzLl9jdXN0b21BdXRoUHJvdmlkZXIpIHtcbiAgICAgIHRoaXMuX2N1c3RvbUF1dGhQcm92aWRlciA9IG5ldyBDdXN0b21BdXRoUHJvdmlkZXIoe1xuICAgICAgICAuLi50aGlzLl9jb25maWcsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jdXN0b21BdXRoUHJvdmlkZXI7XG4gIH1cbiAgcHVibGljIGVtYWlsQXV0aFByb3ZpZGVyKCk6IEVtYWlsQXV0aFByb3ZpZGVyIHtcbiAgICBpZiAoIXRoaXMuX2VtYWlsQXV0aFByb3ZpZGVyKSB7XG4gICAgICB0aGlzLl9lbWFpbEF1dGhQcm92aWRlciA9IG5ldyBFbWFpbEF1dGhQcm92aWRlcih7XG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2VtYWlsQXV0aFByb3ZpZGVyO1xuICB9XG4gIHB1YmxpYyB1c2VybmFtZUF1dGhQcm92aWRlcigpOiBVc2VybmFtZUF1dGhQcm92aWRlciB7XG4gICAgaWYgKCF0aGlzLl91c2VybmFtZUF1dGhQcm92aWRlcikge1xuICAgICAgdGhpcy5fdXNlcm5hbWVBdXRoUHJvdmlkZXIgPSBuZXcgVXNlcm5hbWVBdXRoUHJvdmlkZXIoe1xuICAgICAgICAuLi50aGlzLl9jb25maWcsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl91c2VybmFtZUF1dGhQcm92aWRlcjtcbiAgfVxuXG4gIHB1YmxpYyBwaG9uZUF1dGhQcm92aWRlcigpOiBQaG9uZUF1dGhQcm92aWRlciB7XG4gICAgaWYgKCF0aGlzLl9waG9uZUF1dGhQcm92aWRlcikge1xuICAgICAgdGhpcy5fcGhvbmVBdXRoUHJvdmlkZXIgPSBuZXcgUGhvbmVBdXRoUHJvdmlkZXIoe1xuICAgICAgICAuLi50aGlzLl9jb25maWcsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9waG9uZUF1dGhQcm92aWRlcjtcbiAgfVxuICAvKipcbiAgICog55So5oi35ZCN5a+G56CB55m75b2VXG4gICAqIEBwYXJhbSB1c2VybmFtZVxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduSW5XaXRoVXNlcm5hbWVBbmRQYXNzd29yZCh1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlcm5hbWVBdXRoUHJvdmlkZXIoKS5zaWduSW4odXNlcm5hbWUsIHBhc3N3b3JkKTtcbiAgfVxuICAvKipcbiAgICog5qOA5rWL55So5oi35ZCN5piv5ZCm5bey57uP5Y2g55SoXG4gICAqIEBwYXJhbSB1c2VybmFtZVxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iOt+WPlueUqOaIt+aYr+WQpuiiq+WNoOeUqOWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuaXNVc2VybmFtZVJlZ2lzdGVyZWQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBpc1VzZXJuYW1lUmVnaXN0ZXJlZCh1c2VybmFtZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKHR5cGVvZiB1c2VybmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCAndXNlcm5hbWUgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLmlzVXNlcm5hbWVSZWdpc3RlcmVkJywge1xuICAgICAgdXNlcm5hbWVcbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YT8uaXNSZWdpc3RlcmVkO1xuICB9XG4gIC8qKlxuICAgKiDpgq7nrrHlr4bnoIHnmbvlvZVcbiAgICogQHBhcmFtIGVtYWlsXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5lbWFpbEF1dGhQcm92aWRlcigpLnNpZ25JbihlbWFpbCwgcGFzc3dvcmQpO1xuICB9XG4gIC8qKlxuICAgKiDpgq7nrrHlr4bnoIHms6jlhoxcbiAgICogQHBhcmFtIGVtYWlsXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25VcFdpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5lbWFpbEF1dGhQcm92aWRlcigpLnNpZ25VcChlbWFpbCwgcGFzc3dvcmQpO1xuICB9XG4gIC8qKlxuICAgKiDph43nva7pgq7nrrHlr4bnoIFcbiAgICogQHBhcmFtIGVtYWlsXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VuZFBhc3N3b3JkUmVzZXRFbWFpbChlbWFpbDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1haWxBdXRoUHJvdmlkZXIoKS5yZXNldFBhc3N3b3JkKGVtYWlsKTtcbiAgfVxuICAvKipcbiAgICog55m75Ye6XG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn55So5oi355m75Ye65aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5zaWduT3V0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3nlKjmiLfmmK/lkKbkuLrljL/lkI3nmbvlvZXvvIjljL/lkI3nmbvlvZXkuI3mlK/mjIFzaWduT3V077yJJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgc2lnbk91dCgpIHtcbiAgICBjb25zdCBsb2dpblR5cGUgPSBhd2FpdCB0aGlzLmdldExvZ2luVHlwZSgpO1xuICAgIGlmIChsb2dpblR5cGUgPT09IExPR0lOVFlQRS5BTk9OWU1PVVMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX09QRVJBVElPTixcbiAgICAgICAgbXNnOiAnYW5vbnltb3VzIHVzZXIgZG9lc25cXCd0IHN1cHBvcnQgc2lnbk91dCBhY3Rpb24nXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5LCBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgYWN0aW9uID0gJ2F1dGgubG9nb3V0JztcblxuICAgIGNvbnN0IHJlZnJlc2hfdG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgaWYgKCFyZWZyZXNoX3Rva2VuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZChhY3Rpb24sIHsgcmVmcmVzaF90b2tlbiB9KTtcblxuICAgIHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5KTtcblxuICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQpO1xuICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCwge1xuICAgICAgZW52OiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgbG9naW5UeXBlOiBMT0dJTlRZUEUuTlVMTCxcbiAgICAgIHBlcnNpc3RlbmNlOiB0aGlzLl9jb25maWcucGVyc2lzdGVuY2VcbiAgICB9KTtcblxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBwdWJsaWMgYXN5bmMgb25Mb2dpblN0YXRlQ2hhbmdlZChjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBldmVudEJ1cy5vbihFVkVOVFMuTE9HSU5fU1RBVEVfQ0hBTkdFRCwgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgbG9naW5TdGF0ZSA9IGF3YWl0IHRoaXMuZ2V0TG9naW5TdGF0ZSgpO1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBsb2dpblN0YXRlKTtcbiAgICB9KTtcbiAgICAvLyDnq4vliLvmiafooYzkuIDmrKHlm57osINcbiAgICBjb25zdCBsb2dpblN0YXRlID0gYXdhaXQgdGhpcy5nZXRMb2dpblN0YXRlKCk7XG4gICAgY2FsbGJhY2suY2FsbCh0aGlzLCBsb2dpblN0YXRlKTtcbiAgfVxuICBwdWJsaWMgb25Mb2dpblN0YXRlRXhwaXJlZChjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBldmVudEJ1cy5vbihFVkVOVFMuTE9HSU5fU1RBVEVfRVhQSVJFRCwgY2FsbGJhY2suYmluZCh0aGlzKSk7XG4gIH1cbiAgcHVibGljIG9uQWNjZXNzVG9rZW5SZWZyZXNoZWQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgZXZlbnRCdXMub24oRVZFTlRTLkFDQ0VTU19UT0tFTl9SRUZSRVNIRCwgY2FsbGJhY2suYmluZCh0aGlzKSk7XG4gIH1cbiAgcHVibGljIG9uQW5vbnltb3VzQ29udmVydGVkKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGV2ZW50QnVzLm9uKEVWRU5UUy5BTk9OWU1PVVNfQ09OVkVSVEVELCBjYWxsYmFjay5iaW5kKHRoaXMpKTtcbiAgfVxuICBwdWJsaWMgb25Mb2dpblR5cGVDaGFuZ2VkKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGV2ZW50QnVzLm9uKEVWRU5UUy5MT0dJTl9UWVBFX0NIQU5HRUQsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBhd2FpdCB0aGlzLmdldExvZ2luU3RhdGUoKTtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgbG9naW5TdGF0ZSk7XG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluacrOWcsOeZu+W9leaAgS3lkIzmraVcbiAgICovXG4gIHB1YmxpYyBoYXNMb2dpblN0YXRlKCk6IElMb2dpblN0YXRlIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuX2NhY2hlLm1vZGUgPT09ICdhc3luYycpIHtcbiAgICAgIC8vIGFzeW5jIHN0b3JhZ2XnmoTlubPlj7DosIPnlKjmraRBUEnmj5DnpLpcbiAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sICdjdXJyZW50IHBsYXRmb3JtXFwncyBzdG9yYWdlIGlzIGFzeW5jaHJvbm91cywgcGxlYXNlIHVzZSBnZXRMb2dpblN0YXRlIGluc3RlZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUocmVmcmVzaFRva2VuS2V5KTtcblxuICAgIGlmIChyZWZyZXNoVG9rZW4pIHtcbiAgICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBuZXcgTG9naW5TdGF0ZSh7XG4gICAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgICAgbG9naW5TdGF0ZS5jaGVja0xvY2FsU3RhdGUoKTtcbiAgICAgIHJldHVybiBsb2dpblN0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluacrOWcsOeZu+W9leaAgS3lvILmraVcbiAgICog5q2kQVBJ5Li65YW85a655byC5q2lc3RvcmFnZeeahOW5s+WPsFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iOt+WPluacrOWcsOeZu+W9leaAgeWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuZ2V0TG9naW5TdGF0ZSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGdldExvZ2luU3RhdGUoKSB7XG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGlmIChyZWZyZXNoVG9rZW4pIHtcbiAgICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBuZXcgTG9naW5TdGF0ZSh7XG4gICAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgbG9naW5TdGF0ZS5jaGVja0xvY2FsU3RhdGVBc3luYygpO1xuICAgICAgcmV0dXJuIGxvZ2luU3RhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzaG91bGRSZWZyZXNoQWNjZXNzVG9rZW4oaG9vaykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLl9yZXF1ZXN0Ll9zaG91bGRSZWZyZXNoQWNjZXNzVG9rZW5Ib29rID0gaG9vay5iaW5kKHRoaXMpO1xuICB9XG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5bnlKjmiLfkv6Hmga/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDmmK/lkKblt7LnmbvlvZUnLFxuICAgICAgJyAgMiAtIOiwg+eUqCBhdXRoKCkuZ2V0VXNlckluZm8oKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRVc2VySW5mbygpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IGFjdGlvbiA9ICdhdXRoLmdldFVzZXJJbmZvJztcblxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZChhY3Rpb24sIHt9KTtcbiAgICBpZiAocmVzLmNvZGUpIHtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnJlcy5kYXRhLFxuICAgICAgICByZXF1ZXN0SWQ6IHJlcy5zZXFJZFxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPlkh0dHDpibTmnYNoZWFkZXLvvIznlKjkuo7kupHmjqXlhaUgSFRUUCDorr/pl67kupHlh73mlbDml7bnmoTpibTmnYNcbiAgICovXG4gIHB1YmxpYyBnZXRBdXRoSGVhZGVyKCkge1xuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5LCBhY2Nlc3NUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZWZyZXNoVG9rZW4gPSB0aGlzLl9jYWNoZS5nZXRTdG9yZShyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUoYWNjZXNzVG9rZW5LZXkpO1xuICAgIHJldHVybiB7XG4gICAgICAneC1jbG91ZGJhc2UtY3JlZGVudGlhbHMnOiBhY2Nlc3NUb2tlbiArICcvQEAvJyArIHJlZnJlc2hUb2tlblxuICAgIH07XG4gIH1cbiAgLyoqXG4gICAqIOW8guatpeaooeW8j+iOt+WPlkh0dHDpibTmnYNoZWFkZXLvvIznlKjkuo7kupHmjqXlhaUgSFRUUCDorr/pl67kupHlh73mlbDml7bnmoTpibTmnYNcbiAgICog6LCD55So5q2kQVBJ5Lya5Yi35paw55m75b2V5oCBXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0QXV0aEhlYWRlckFzeW5jKCkge1xuICAgIGF3YWl0IHRoaXMuX3JlcXVlc3QucmVmcmVzaEFjY2Vzc1Rva2VuKCk7XG5cbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSwgYWNjZXNzVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVmcmVzaFRva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICd4LWNsb3VkYmFzZS1jcmVkZW50aWFscyc6IGFjY2Vzc1Rva2VuICsgJy9AQC8nICsgcmVmcmVzaFRva2VuXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICog5Y+R6YCB6aqM6K+B56CBXG4gKiBAcGFyYW0gcGhvbmVOdW1iZXJcbiAqIEBwYXJhbSBwaG9uZUNvZGVcbiAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5Y+R6YCB55+t5L+h6aqM6K+B56CB5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55So6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobnn63kv6Hpqozor4HnoIHnmbvlvZUnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBzZW5kUGhvbmVDb2RlKHBob25lTnVtYmVyOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5zZW5kUGhvbmVDb2RlJywge1xuICAgICAgcGhvbmVOdW1iZXI6IHRyYW5zZm9ybVBob25lKHBob25lTnVtYmVyKVxuICAgIH0pO1xuICAgIHJldHVybiBkYXRhLlNlbmRTdGF0dXMgPT09ICdPaydcbiAgfVxuXG4gIC8qKlxuICAgKiDmiYvmnLrnn63kv6Hms6jlhoxcbiAgICogQHBhcmFtIGVtYWlsXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25VcFdpdGhQaG9uZUNvZGUocGhvbmVOdW1iZXI6IHN0cmluZywgcGhvbmVDb2RlOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5waG9uZUF1dGhQcm92aWRlcigpLnNpZ25VcChwaG9uZU51bWJlciwgcGhvbmVDb2RlLCBwYXNzd29yZCk7XG4gIH1cblxuICAvKipcbiAgICog5omL5py66aqM6K+B56CBIG9yIOWvhueggeeZu+W9lVxuICAgKiBAcGFyYW0gZW1haWxcbiAgICogQHBhcmFtIHBhc3N3b3JkXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aFBob25lQ29kZU9yUGFzc3dvcmQocGFyYW06IHtcbiAgICBwaG9uZU51bWJlcjogc3RyaW5nXG4gICAgcGhvbmVDb2RlPzogc3RyaW5nXG4gICAgcGFzc3dvcmQ/OiBzdHJpbmdcbiAgICBzaWduTWV0aG9kPzogc3RyaW5nXG4gIH0pIHtcbiAgICByZXR1cm4gdGhpcy5waG9uZUF1dGhQcm92aWRlcigpLnNpZ25JbihwYXJhbSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9vbkxvZ2luVHlwZUNoYW5nZWQoZXYpIHtcbiAgICBjb25zdCB7IGxvZ2luVHlwZSwgcGVyc2lzdGVuY2UsIGVudiB9ID0gZXYuZGF0YTtcbiAgICBpZiAoZW52ICE9PSB0aGlzLl9jb25maWcuZW52KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIOeZu+W9leaAgei9rOWPmOWQjui/geenu2NhY2hl77yM6Ziy5q2i5Zyo5Yy/5ZCN55m75b2V54q25oCB5LiLY2FjaGXmt7fnlKhcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS51cGRhdGVQZXJzaXN0ZW5jZUFzeW5jKHBlcnNpc3RlbmNlKTtcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKHRoaXMuX2NhY2hlLmtleXMubG9naW5UeXBlS2V5LCBsb2dpblR5cGUpO1xuICB9XG59XG5cbmNvbnN0IEVWRU5UUyA9IHtcbiAgLy8g55m75b2V5oCB5pS55Y+Y5ZCO6Kem5Y+RXG4gIExPR0lOX1NUQVRFX0NIQU5HRUQ6ICdsb2dpblN0YXRlQ2hhbmdlZCcsXG4gIC8vIOeZu+W9leaAgei/h+acn+WQjuinpuWPkVxuICBMT0dJTl9TVEFURV9FWFBJUkVEOiAnbG9naW5TdGF0ZUV4cGlyZScsXG4gIC8vIOeZu+W9leexu+Wei+aUueWPmOWQjuinpuWPkVxuICBMT0dJTl9UWVBFX0NIQU5HRUQ6ICdsb2dpblR5cGVDaGFuZ2VkJyxcbiAgLy8g5Yy/5ZCN6LSm5oi36KKr6L2s5q2j5ZCO6Kem5Y+RXG4gIEFOT05ZTU9VU19DT05WRVJURUQ6ICdhbm9ueW1vdXNDb252ZXJ0ZWQnLFxuICAvLyBhY2Nlc3MgdG9rZW7liLfmlrDlkI7op6blj5FcbiAgQUNDRVNTX1RPS0VOX1JFRlJFU0hEOiAncmVmcmVzaEFjY2Vzc1Rva2VuJ1xufTtcblxuY29uc3QgY29tcG9uZW50OiBJQ2xvdWRiYXNlQ29tcG9uZW50ID0ge1xuICBuYW1lOiBDT01QT05FTlRfTkFNRSxcbiAgbmFtZXNwYWNlOiAnYXV0aCcsXG4gIGluamVjdEV2ZW50czoge1xuICAgIGJ1czogZXZlbnRCdXMsXG4gICAgZXZlbnRzOiBbXG4gICAgICBFVkVOVFMuTE9HSU5fVFlQRV9DSEFOR0VELFxuICAgICAgRVZFTlRTLkxPR0lOX1NUQVRFX0VYUElSRUQsXG4gICAgICBFVkVOVFMuTE9HSU5fU1RBVEVfQ0hBTkdFRCxcbiAgICAgIEVWRU5UUy5BQ0NFU1NfVE9LRU5fUkVGUkVTSEQsXG4gICAgICBFVkVOVFMuQU5PTllNT1VTX0NPTlZFUlRFRFxuICAgIF1cbiAgfSxcbiAgZW50aXR5OiBmdW5jdGlvbiAoY29uZmlnOiBQaWNrPElDbG91ZGJhc2VBdXRoQ29uZmlnLCAncmVnaW9uJyB8ICdwZXJzaXN0ZW5jZSc+ID0geyByZWdpb246ICcnLCBwZXJzaXN0ZW5jZTogJ2xvY2FsJyB9KSB7XG4gICAgaWYgKHRoaXMuYXV0aEluc3RhbmNlKSB7XG4gICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLCAnZXZlcnkgY2xvdWRiYXNlIGluc3RhbmNlIHNob3VsZCBoYXMgb25seSBvbmUgYXV0aCBvYmplY3QnKTtcbiAgICAgIHJldHVybiB0aGlzLmF1dGhJbnN0YW5jZTtcbiAgICB9XG4gICAgY29uc3QgeyBhZGFwdGVyLCBydW50aW1lIH0gPSB0aGlzLnBsYXRmb3JtO1xuICAgIC8vIOWmguS4jeaYjuehruaMh+WumnBlcnNpc3RlbmNl5YiZ5LyY5YWI5Y+W5ZCE5bmz5Y+wYWRhcHRlcummlumAie+8jOWFtuasoXNlc3Npb25cbiAgICBjb25zdCBuZXdQZXJzaXN0ZW5jZSA9IGNvbmZpZy5wZXJzaXN0ZW5jZSB8fCBhZGFwdGVyLnByaW1hcnlTdG9yYWdlO1xuICAgIGlmIChuZXdQZXJzaXN0ZW5jZSAmJiAobmV3UGVyc2lzdGVuY2UgIT09IHRoaXMuY29uZmlnLnBlcnNpc3RlbmNlKSkge1xuICAgICAgdGhpcy51cGRhdGVDb25maWcoeyBwZXJzaXN0ZW5jZTogbmV3UGVyc2lzdGVuY2UgfSlcbiAgICB9XG5cbiAgICBjb25zdCB7IGVudiwgcGVyc2lzdGVuY2UsIGRlYnVnIH0gPSB0aGlzLmNvbmZpZztcbiAgICB0aGlzLmF1dGhJbnN0YW5jZSA9IG5ldyBBdXRoKHtcbiAgICAgIGVudixcbiAgICAgIHJlZ2lvbjogY29uZmlnLnJlZ2lvbixcbiAgICAgIHBlcnNpc3RlbmNlLFxuICAgICAgZGVidWcsXG4gICAgICBjYWNoZTogdGhpcy5jYWNoZSxcbiAgICAgIHJlcXVlc3Q6IHRoaXMucmVxdWVzdCxcbiAgICAgIHJ1bnRpbWU6IHJ1bnRpbWVcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5hdXRoSW5zdGFuY2U7XG4gIH1cbn1cblxudHJ5IHtcbiAgLy8g5bCd6K+V6Ieq5Yqo5rOo5YaM6Iez5YWo5bGA5Y+Y6YePY2xvdWRiYXNlXG4gIC8vIOatpOihjOS4uuWPquWcqOa1j+iniOWZqOeOr+Wig+S4i+acieaViFxuICBjbG91ZGJhc2UucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbn0gY2F0Y2ggKGUpIHsgfVxuXG5leHBvcnQge1xuICBVc2VySW5mbyxcbiAgQXV0aCxcbiAgQXV0aFByb3ZpZGVyLFxuICBFVkVOVFMsXG4gIGV2ZW50QnVzXG59O1xuLyoqXG4gKiBAYXBpIOaJi+WKqOazqOWGjOiHs2Nsb3VkYmFzZSBhcHBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQXV0aChhcHA6IFBpY2s8SUNsb3VkYmFzZSwgJ3JlZ2lzdGVyQ29tcG9uZW50Jz4pIHtcbiAgdHJ5IHtcbiAgICBhcHAucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUud2FybihlKTtcbiAgfVxufVxuXG50eXBlIElQcm92aWRlciA9IG5ldyAoLi4uYXJnczogYW55W10pID0+IGFueTtcbi8qKlxuICog5rOo5YaMcHJvdmlkZXLvvIzlpoLmnpxcbiAqIEBwYXJhbSBuYW1lXG4gKiBAcGFyYW0gcHJvdmlkZXJcbiAqIEBleGFtcGxlXG4gKiAvLyDms6jlhoxcbiAqIHJlZ2lzdGVyUHJvdmlkZXIoJ2VtYWlsQXV0aFByb3ZpZGVyJyxmdW5jdGlvbigpe1xuICogICAvLyAuLi5cbiAqIH0pO1xuICogLy8g5L2/55So5pawcHJvdmlkZXLnmbvlvZVcbiAqIGNsb3VkYmFzZS5hdXRoKCkuZW1haWxBdXRoUHJvdmlkZXIoKS5zaWduSW4oKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyUHJvdmlkZXIobmFtZTogc3RyaW5nLCBwcm92aWRlcjogSVByb3ZpZGVyKSB7XG4gIGNvbnN0IHByb3RvID0gQXV0aC5wcm90b3R5cGU7XG4gIHByb3RvW25hbWVdID0gZnVuY3Rpb24gKG9wdGlvbnM6IG9iamVjdCkge1xuICAgIGNvbnN0IHByaXZhdGVOYW1lID0gYF8ke25hbWV9YDtcbiAgICBpZiAoIXRoaXNbcHJpdmF0ZU5hbWVdKSB7XG4gICAgICB0aGlzW3ByaXZhdGVOYW1lXSA9IG5ldyBwcm92aWRlcih7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzW3ByaXZhdGVOYW1lXTtcbiAgfTtcbn0iXX0=
