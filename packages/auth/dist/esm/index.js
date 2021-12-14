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
import { utils, constants, helpers } from '@cloudbase/utilities';
import { authModels, CloudbaseOAuth } from '@cloudbase/oauth';
var printWarn = utils.printWarn, throwError = utils.throwError;
var ERRORS = constants.ERRORS, COMMUNITY_SITE_URL = constants.COMMUNITY_SITE_URL;
var catchErrorsDecorator = helpers.catchErrorsDecorator;
var COMPONENT_NAME = 'auth';
var User = (function () {
    function User(options) {
        var cache = options.cache, oauthInstance = options.oauthInstance;
        this._cache = cache;
        this._oauthInstance = oauthInstance;
        this._setUserInfo();
    }
    User.prototype.checkLocalInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.uid = this._getLocalUserInfo('uid');
                this.gender = this._getLocalUserInfo('gender');
                this.picture = this._getLocalUserInfo('picture');
                this.avatarUrl = this._getLocalUserInfo('avatarUrl');
                this.email = this._getLocalUserInfo('email');
                this.email_verified = this._getLocalUserInfo('email_verified');
                this.phone_number = this._getLocalUserInfo('phone_number');
                this.username = this._getLocalUserInfo('username');
                this.name = this._getLocalUserInfo('name');
                this.birthdate = this._getLocalUserInfo('birthdate');
                this.zoneinfo = this._getLocalUserInfo('zoneinfo');
                this.locale = this._getLocalUserInfo('locale');
                this.sub = this._getLocalUserInfo('sub');
                this.created_from = this._getLocalUserInfo('created_from');
                this.providers = this._getLocalUserInfo('providers');
                return [2];
            });
        });
    };
    User.prototype.checkLocalInfoAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = this;
                        return [4, this._getLocalUserInfoAsync('uid')];
                    case 1:
                        _a.uid = _f.sent();
                        _b = this;
                        return [4, this._getLocalUserInfoAsync('gender')];
                    case 2:
                        _b.gender = _f.sent();
                        this.picture = this._getLocalUserInfo('picture');
                        _c = this;
                        return [4, this._getLocalUserInfoAsync('avatarUrl')];
                    case 3:
                        _c.avatarUrl = _f.sent();
                        _d = this;
                        return [4, this._getLocalUserInfoAsync('email')];
                    case 4:
                        _d.email = _f.sent();
                        this.email_verified = this._getLocalUserInfo('email_verified');
                        this.phone_number = this._getLocalUserInfo('phone_number');
                        _e = this;
                        return [4, this._getLocalUserInfoAsync('username')];
                    case 5:
                        _e.username = _f.sent();
                        this.name = this._getLocalUserInfo('name');
                        this.birthdate = this._getLocalUserInfo('birthdate');
                        this.zoneinfo = this._getLocalUserInfo('zoneinfo');
                        this.locale = this._getLocalUserInfo('locale');
                        this.sub = this._getLocalUserInfo('sub');
                        this.created_from = this._getLocalUserInfo('created_from');
                        this.providers = this._getLocalUserInfo('providers');
                        return [2];
                }
            });
        });
    };
    User.prototype.update = function (userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var name, gender, avatarUrl, province, country, city, newUserInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = userInfo.name, gender = userInfo.gender, avatarUrl = userInfo.avatarUrl, province = userInfo.province, country = userInfo.country, city = userInfo.city;
                        return [4, this._oauthInstance.authApi.setUserProfile({ name: name, gender: gender, avatarUrl: avatarUrl, province: province, country: country, city: city })];
                    case 1:
                        newUserInfo = _a.sent();
                        this._setLocalUserInfo(newUserInfo);
                        return [2];
                }
            });
        });
    };
    User.prototype.updatePassword = function (newPassword, oldPassword) {
        return this._oauthInstance.authApi.updatePasswordByOld({
            old_password: oldPassword,
            new_password: newPassword
        });
    };
    User.prototype.updateUsername = function (username) {
        if (typeof username !== 'string') {
            throwError(ERRORS.INVALID_PARAMS, 'username must be a string');
        }
        return this.update({
            username: username
        });
    };
    User.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newUserInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._oauthInstance.authApi.getUserInfo()];
                    case 1:
                        newUserInfo = _a.sent();
                        this._setLocalUserInfo(newUserInfo);
                        return [2, newUserInfo];
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
            'email',
            'name',
            'gender',
            'picture',
            'avatarUrl',
            'phone',
            'email_verified',
            'phone_number',
            'birthdate',
            'zoneinfo',
            'locale',
            'sub',
            'created_from',
            'providers',
            'username'
        ].forEach(function (infoKey) {
            _this[infoKey] = userInfo[infoKey];
        });
    };
    User.prototype._setLocalUserInfo = function (userInfo) {
        var userInfoKey = this._cache.keys.userInfoKey;
        this._cache.setStore(userInfoKey, userInfo);
        this._setUserInfo();
    };
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
        var envId = options.envId, cache = options.cache, oauthInstance = options.oauthInstance;
        if (!envId) {
            throwError(ERRORS.INVALID_PARAMS, 'envId is not defined');
        }
        this._cache = cache;
        this._oauthInstance = oauthInstance;
        this.user = new User({
            cache: this._cache,
            oauthInstance: oauthInstance
        });
    }
    LoginState.prototype.checkLocalState = function () {
        var _a;
        this.oauthLoginState = (_a = this._oauthInstance) === null || _a === void 0 ? void 0 : _a.authApi.hasLoginStateSync();
        this.user.checkLocalInfo();
    };
    LoginState.prototype.checkLocalStateAsync = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, ((_a = this._oauthInstance) === null || _a === void 0 ? void 0 : _a.authApi.getLoginState())];
                    case 1:
                        _b.sent();
                        return [4, this.user.checkLocalInfoAsync()];
                    case 2:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    return LoginState;
}());
export { LoginState };
var Auth = (function () {
    function Auth(config) {
        this._config = config;
        this._cache = config.cache;
        this._oauthInstance = config.oauthInstance;
    }
    Auth.prototype.bindPhoneNumber = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._oauthInstance.authApi.bindPhone(params)];
            });
        });
    };
    Auth.prototype.unbindProvider = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._oauthInstance.authApi.unbindProvider(params)];
            });
        });
    };
    Auth.prototype.bindEmail = function (params) {
        return this._oauthInstance.authApi.bindEmail(params);
    };
    Auth.prototype.verify = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._oauthInstance.authApi.verify(params)];
            });
        });
    };
    Auth.prototype.getVerification = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._oauthInstance.authApi.getVerification(params)];
            });
        });
    };
    Object.defineProperty(Auth.prototype, "currentUser", {
        get: function () {
            if (this._cache.mode === 'async') {
                printWarn(ERRORS.INVALID_OPERATION, 'current platform\'s storage is asynchronous, please use getCurrentUser insteed');
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
    Auth.prototype.getCurrentUser = function () {
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
    Auth.prototype.signInAnonymously = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._oauthInstance.authApi.signInAnonymously()];
                    case 1:
                        _a.sent();
                        return [2, this.createLoginState()];
                }
            });
        });
    };
    Auth.prototype.setCustomSignFunc = function (getTickFn) {
        this._oauthInstance.authApi.setCustomSignFunc(getTickFn);
    };
    Auth.prototype.signInWithCustomTicket = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._oauthInstance.authApi.signInWithCustomTicket()];
                    case 1:
                        _a.sent();
                        return [2, this.createLoginState()];
                }
            });
        });
    };
    Auth.prototype.signIn = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._oauthInstance.authApi.signIn(params)];
                    case 1:
                        _a.sent();
                        return [2, this.createLoginState()];
                }
            });
        });
    };
    Auth.prototype.signUp = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('ggg');
                        return [4, this._oauthInstance.authApi.signUp(params)];
                    case 1:
                        _a.sent();
                        return [2, this.createLoginState()];
                }
            });
        });
    };
    Auth.prototype.setPassword = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._oauthInstance.authApi.setPassword(params)];
            });
        });
    };
    Auth.prototype.isUsernameRegistered = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var queryRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof username !== 'string') {
                            throwError(ERRORS.INVALID_PARAMS, 'username must be a string');
                        }
                        return [4, this.queryUser({
                                username: username
                            })];
                    case 1:
                        queryRes = _a.sent();
                        return [2, parseInt(queryRes.total) ? true : false];
                }
            });
        });
    };
    Auth.prototype.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfoKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInfoKey = this._cache.keys.userInfoKey;
                        return [4, this._oauthInstance.authApi.signOut()];
                    case 1:
                        _a.sent();
                        return [4, this._cache.removeStoreAsync(userInfoKey)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Auth.prototype.hasLoginState = function () {
        var _a;
        if (this._cache.mode === 'async') {
            printWarn(ERRORS.INVALID_OPERATION, 'current platform\'s storage is asynchronous, please use getLoginState insteed');
            return;
        }
        var oauthLoginState = (_a = this._oauthInstance) === null || _a === void 0 ? void 0 : _a.authApi.hasLoginStateSync();
        if (oauthLoginState) {
            var loginState = new LoginState({
                envId: this._config.env,
                cache: this._cache,
                oauthInstance: this._oauthInstance,
            });
            return loginState;
        }
        else {
            return null;
        }
    };
    Auth.prototype.getLoginState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var oauthLoginState, loginState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._oauthInstance.authApi.getLoginState()];
                    case 1:
                        oauthLoginState = _a.sent();
                        if (oauthLoginState) {
                            loginState = new LoginState({
                                envId: this._config.env,
                                cache: this._cache,
                                oauthInstance: this._oauthInstance,
                            });
                            return [2, loginState];
                        }
                        return [2, null];
                }
            });
        });
    };
    Auth.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._oauthInstance.authApi.getUserInfo()];
            });
        });
    };
    Auth.prototype.bindWithProvider = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._oauthInstance.authApi.bindWithProvider(params)];
            });
        });
    };
    Auth.prototype.queryUser = function (queryObj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._oauthInstance.authApi.queryUserProfile(queryObj)];
            });
        });
    };
    Auth.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var oauthAccessTokenRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._oauthInstance.oauth2client.getAccessToken()];
                    case 1:
                        oauthAccessTokenRes = _a.sent();
                        return [2, {
                                accessToken: oauthAccessTokenRes,
                                env: this._config.env
                            }];
                }
            });
        });
    };
    Auth.prototype.grantProviderToken = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._oauthInstance.authApi.grantProviderToken(params)];
            });
        });
    };
    Auth.prototype.signInWithProvider = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._oauthInstance.authApi.signInWithProvider(params)];
                    case 1:
                        _a.sent();
                        return [2, this.createLoginState()];
                }
            });
        });
    };
    Auth.prototype.grantToken = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._oauthInstance.authApi.grantToken(params)];
                    case 1:
                        _a.sent();
                        return [2, this.createLoginState()];
                }
            });
        });
    };
    Auth.prototype.genProviderRedirectUri = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._oauthInstance.authApi.genProviderRedirectUri(params)];
            });
        });
    };
    Auth.prototype.resetPassword = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._oauthInstance.authApi.resetPassword(params)];
            });
        });
    };
    Auth.prototype.deviceAuthorize = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._oauthInstance.authApi.deviceAuthorize(params)];
            });
        });
    };
    Auth.prototype.sudo = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._oauthInstance.authApi.sudo(params)];
            });
        });
    };
    Auth.prototype.createLoginState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loginState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loginState = new LoginState({
                            envId: this._config.env,
                            cache: this._cache,
                            oauthInstance: this._oauthInstance,
                        });
                        return [4, loginState.checkLocalStateAsync()];
                    case 1:
                        _a.sent();
                        return [4, loginState.user.refresh()];
                    case 2:
                        _a.sent();
                        return [2, loginState];
                }
            });
        });
    };
    __decorate([
        catchErrorsDecorator({
            title: '绑定手机号失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().bindPhoneNumber() 的语法或参数是否正确',
                '  2 - 当前环境是否开通了短信验证码登录',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Auth.prototype, "bindPhoneNumber", null);
    __decorate([
        catchErrorsDecorator({
            title: '解除三方绑定失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().unbindProvider() 的语法或参数是否正确',
                '  2 - 当前账户是否已经与此登录方式解绑',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Auth.prototype, "unbindProvider", null);
    __decorate([
        catchErrorsDecorator({
            title: '绑定邮箱地址失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().bindEmail() 的语法或参数是否正确',
                '  2 - 当前环境是否开通了邮箱密码登录',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Auth.prototype, "bindEmail", null);
    __decorate([
        catchErrorsDecorator({
            title: '验证码验证失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().verify() 的语法或参数是否正确',
                '  2 - 当前环境是否开通了手机验证码/邮箱登录',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Auth.prototype, "verify", null);
    __decorate([
        catchErrorsDecorator({
            title: '获取验证码失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().getVerification() 的语法或参数是否正确',
                '  2 - 当前环境是否开通了手机验证码/邮箱登录',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Auth.prototype, "getVerification", null);
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
    ], Auth.prototype, "getCurrentUser", null);
    __decorate([
        catchErrorsDecorator({
            title: '匿名登录失败',
            messages: [
                '请确认以下各项：',
                '  1 - 当前环境是否开启了匿名登录',
                '  2 - 调用 auth().signInAnonymously() 的语法或参数是否正确',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Auth.prototype, "signInAnonymously", null);
    __decorate([
        catchErrorsDecorator({
            title: '自定义登录失败',
            messages: [
                '请确认以下各项：',
                '  1 - 当前环境是否开启了自定义登录',
                '  2 - 调用 auth().signInWithCustomTicket() 的语法或参数是否正确',
                '  3 - ticket 是否归属于当前环境',
                '  4 - 创建 ticket 的自定义登录私钥是否过期',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Auth.prototype, "signInWithCustomTicket", null);
    __decorate([
        catchErrorsDecorator({
            title: '注册失败',
            messages: [
                '请确认以下各项：',
                '  1 - 当前环境是否开启了指定登录方式',
                '  2 - 调用 auth().signUp() 的语法或参数是否正确',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Auth.prototype, "signUp", null);
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
            title: '绑定第三方登录方式失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().bindWithProvider() 的语法或参数是否正确',
                '  2 - 此账户是否已经绑定此第三方',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Auth.prototype, "bindWithProvider", null);
    return Auth;
}());
var component = {
    name: COMPONENT_NAME,
    namespace: 'auth',
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
        var _b = this.config, env = _b.env, persistence = _b.persistence, debug = _b.debug, clientId = _b.clientId;
        var oauthInstance = new CloudbaseOAuth({
            clientId: clientId,
            apiOrigin: this.request.getBaseEndPoint(),
        });
        this.oauthInstance = oauthInstance;
        this.authInstance = new Auth({
            env: env,
            region: config.region,
            persistence: persistence,
            debug: debug,
            cache: this.cache,
            runtime: runtime,
            _fromApp: this,
            oauthInstance: oauthInstance
        });
        return this.authInstance;
    }
};
try {
    cloudbase.registerComponent(component);
}
catch (e) { }
export { Auth, };
export function registerAuth(app) {
    try {
        app.registerComponent(component);
    }
    catch (e) {
        console.warn(e);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFNakUsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUlyRCxJQUFBLFNBQVMsR0FBaUIsS0FBSyxVQUF0QixFQUFFLFVBQVUsR0FBSyxLQUFLLFdBQVYsQ0FBVztBQUNoQyxJQUFBLE1BQU0sR0FBeUIsU0FBUyxPQUFsQyxFQUFFLGtCQUFrQixHQUFLLFNBQVMsbUJBQWQsQ0FBZTtBQUN6QyxJQUFBLG9CQUFvQixHQUFLLE9BQU8scUJBQVosQ0FBYTtBQUV6QyxJQUFNLGNBQWMsR0FBRyxNQUFNLENBQUM7QUF5QjlCO0lBd0JFLGNBQVksT0FBcUI7UUFDdkIsSUFBQSxLQUFLLEdBQW9CLE9BQU8sTUFBM0IsRUFBRSxhQUFhLEdBQUssT0FBTyxjQUFaLENBQWE7UUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7UUFFbkMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFJWSw2QkFBYyxHQUEzQjs7O2dCQUNFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBVyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQVcsQ0FBQztnQkFDekQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFXLENBQUM7Z0JBQzNELElBQUksQ0FBQyxTQUFTLEdBQUcs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QUM7SUFDM0IsQ0FBQztDQUNGLENBQUE7QUFFRCxJQUFJO0lBR0YsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQ3hDO0FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRztBQUVmLE9BQU8sRUFFTCxJQUFJLEdBQ0wsQ0FBQztBQUlGLE1BQU0sVUFBVSxZQUFZLENBQUMsR0FBMEM7SUFDckUsSUFBSTtRQUNGLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNsQztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyB1dGlscywgY29uc3RhbnRzLCBoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNhY2hlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlUmVxdWVzdCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVxdWVzdCc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQXV0aENvbmZpZywgSVVzZXIsIElVc2VySW5mbywgSUxvZ2luU3RhdGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2F1dGgnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNvbXBvbmVudCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY29tcG9uZW50JztcblxuaW1wb3J0IHsgYXV0aE1vZGVscywgQ2xvdWRiYXNlT0F1dGggfSBmcm9tICdAY2xvdWRiYXNlL29hdXRoJ1xuXG5kZWNsYXJlIGNvbnN0IGNsb3VkYmFzZTogSUNsb3VkYmFzZTtcblxuY29uc3QgeyBwcmludFdhcm4sIHRocm93RXJyb3IgfSA9IHV0aWxzO1xuY29uc3QgeyBFUlJPUlMsIENPTU1VTklUWV9TSVRFX1VSTCB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyBjYXRjaEVycm9yc0RlY29yYXRvciB9ID0gaGVscGVycztcblxuY29uc3QgQ09NUE9ORU5UX05BTUUgPSAnYXV0aCc7XG5cbmludGVyZmFjZSBVc2VySW5mbyB7XG4gIHVpZD86IHN0cmluZztcbiAgZ2VuZGVyPzogc3RyaW5nO1xuICBhdmF0YXJVcmw/OiBzdHJpbmc7XG4gIHBpY3R1cmU/OiBzdHJpbmc7XG4gIGVtYWlsPzogc3RyaW5nO1xuICBlbWFpbF92ZXJpZmllZD86IGJvb2xlYW47XG4gIHBob25lX251bWJlcj86IHN0cmluZztcbiAgdXNlcm5hbWU/OiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGJpcnRoZGF0ZT86IHN0cmluZztcbiAgem9uZWluZm8/OiBzdHJpbmc7XG4gIGxvY2FsZT86IHN0cmluZztcbiAgc3ViPzogc3RyaW5nO1xuICBjcmVhdGVkX2Zyb20/OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBJVXNlck9wdGlvbnMge1xuICBjYWNoZTogSUNsb3VkYmFzZUNhY2hlO1xuICAvLyByZXF1ZXN0OiBJQ2xvdWRiYXNlUmVxdWVzdDtcbiAgb2F1dGhJbnN0YW5jZTogQ2xvdWRiYXNlT0F1dGhcbn1cblxuY2xhc3MgVXNlciBpbXBsZW1lbnRzIElVc2VyIHtcbiAgcHVibGljIHVpZD86IHN0cmluZztcbiAgcHVibGljIGdlbmRlcj86IHN0cmluZztcbiAgcHVibGljIGF2YXRhclVybD86IHN0cmluZztcbiAgcHVibGljIHBpY3R1cmU/OiBzdHJpbmc7XG4gIHB1YmxpYyBlbWFpbD86IHN0cmluZztcbiAgcHVibGljIGVtYWlsX3ZlcmlmaWVkPzogYm9vbGVhbjtcbiAgcHVibGljIHBob25lX251bWJlcj86IHN0cmluZztcbiAgcHVibGljIHVzZXJuYW1lPzogc3RyaW5nO1xuICBwdWJsaWMgbmFtZT86IHN0cmluZztcbiAgcHVibGljIHByb3ZpZGVycz86IHtcbiAgICBpZD86IHN0cmluZztcbiAgICBwcm92aWRlcl91c2VyX2lkPzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gIH1bXVxuICBwdWJsaWMgYmlydGhkYXRlPzogc3RyaW5nO1xuICBwdWJsaWMgem9uZWluZm8/OiBzdHJpbmc7XG4gIHB1YmxpYyBsb2NhbGU/OiBzdHJpbmc7XG4gIHB1YmxpYyBzdWI/OiBzdHJpbmc7XG4gIHB1YmxpYyBjcmVhdGVkX2Zyb20/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfY2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcbiAgcHJpdmF0ZSBfb2F1dGhJbnN0YW5jZTogQ2xvdWRiYXNlT0F1dGggLy8gQ2xvdWRiYXNlT0F1dGgg57G75Z6LXG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogSVVzZXJPcHRpb25zKSB7XG4gICAgY29uc3QgeyBjYWNoZSwgb2F1dGhJbnN0YW5jZSB9ID0gb3B0aW9ucztcbiAgICB0aGlzLl9jYWNoZSA9IGNhY2hlO1xuICAgIHRoaXMuX29hdXRoSW5zdGFuY2UgPSBvYXV0aEluc3RhbmNlXG5cbiAgICB0aGlzLl9zZXRVc2VySW5mbygpO1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnlKjmiLfkv6Hmga8t5ZCM5q2lXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hlY2tMb2NhbEluZm8oKSB7XG4gICAgdGhpcy51aWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd1aWQnKSBhcyBzdHJpbmc7XG4gICAgdGhpcy5nZW5kZXIgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdnZW5kZXInKSBhcyBzdHJpbmc7XG4gICAgdGhpcy5waWN0dXJlID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncGljdHVyZScpIGFzIHN0cmluZztcbiAgICB0aGlzLmF2YXRhclVybCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2F2YXRhclVybCcpIGFzIHN0cmluZztcbiAgICB0aGlzLmVtYWlsID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnZW1haWwnKSBhcyBzdHJpbmc7XG4gICAgdGhpcy5lbWFpbF92ZXJpZmllZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2VtYWlsX3ZlcmlmaWVkJykgYXMgYm9vbGVhbjtcbiAgICB0aGlzLnBob25lX251bWJlciA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3Bob25lX251bWJlcicpIGFzIHN0cmluZ1xuICAgIHRoaXMudXNlcm5hbWUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd1c2VybmFtZScpIGFzIHN0cmluZ1xuICAgIHRoaXMubmFtZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ25hbWUnKSBhcyBzdHJpbmdcbiAgICB0aGlzLmJpcnRoZGF0ZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2JpcnRoZGF0ZScpIGFzIHN0cmluZ1xuICAgIHRoaXMuem9uZWluZm8gPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd6b25laW5mbycpIGFzIHN0cmluZ1xuICAgIHRoaXMubG9jYWxlID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnbG9jYWxlJykgYXMgc3RyaW5nXG4gICAgdGhpcy5zdWIgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdzdWInKSBhcyBzdHJpbmdcbiAgICB0aGlzLmNyZWF0ZWRfZnJvbSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2NyZWF0ZWRfZnJvbScpIGFzIHN0cmluZ1xuICAgIHRoaXMucHJvdmlkZXJzID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncHJvdmlkZXJzJykgYXMgYW55XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluacrOWcsOeUqOaIt+S/oeaBry3lvILmraVcbiAgICovXG4gIHB1YmxpYyBhc3luYyBjaGVja0xvY2FsSW5mb0FzeW5jKCkge1xuICAgIHRoaXMudWlkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd1aWQnKTtcbiAgICB0aGlzLmdlbmRlciA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnZ2VuZGVyJyk7XG4gICAgdGhpcy5waWN0dXJlID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncGljdHVyZScpIGFzIHN0cmluZztcbiAgICB0aGlzLmF2YXRhclVybCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnYXZhdGFyVXJsJyk7XG4gICAgdGhpcy5lbWFpbCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnZW1haWwnKTtcbiAgICB0aGlzLmVtYWlsX3ZlcmlmaWVkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnZW1haWxfdmVyaWZpZWQnKSBhcyBib29sZWFuO1xuICAgIHRoaXMucGhvbmVfbnVtYmVyID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncGhvbmVfbnVtYmVyJykgYXMgc3RyaW5nXG4gICAgdGhpcy51c2VybmFtZSA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygndXNlcm5hbWUnKVxuICAgIHRoaXMubmFtZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ25hbWUnKSBhcyBzdHJpbmdcbiAgICB0aGlzLmJpcnRoZGF0ZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2JpcnRoZGF0ZScpIGFzIHN0cmluZ1xuICAgIHRoaXMuem9uZWluZm8gPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd6b25laW5mbycpIGFzIHN0cmluZ1xuICAgIHRoaXMubG9jYWxlID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnbG9jYWxlJykgYXMgc3RyaW5nXG4gICAgdGhpcy5zdWIgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdzdWInKSBhcyBzdHJpbmdcbiAgICB0aGlzLmNyZWF0ZWRfZnJvbSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2NyZWF0ZWRfZnJvbScpIGFzIHN0cmluZ1xuICAgIHRoaXMucHJvdmlkZXJzID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncHJvdmlkZXJzJykgYXMgYW55XG4gIH1cblxuXG4gIC8qKlxuICAgKiDmm7TmlrDnlKjmiLfkv6Hmga9cbiAgICogQHBhcmFtIHVzZXJJbmZvXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw55So5oi35L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDnlKjmiLfkv6Hmga/kuK3mmK/lkKbljIXlkKvpnZ7ms5XlgLwnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUodXNlckluZm86IElVc2VySW5mbyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgbmFtZSwgZ2VuZGVyLCBhdmF0YXJVcmwsIHByb3ZpbmNlLCBjb3VudHJ5LCBjaXR5IH0gPSB1c2VySW5mbztcbiAgICBjb25zdCBuZXdVc2VySW5mbyA9IGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5zZXRVc2VyUHJvZmlsZSh7IG5hbWUsIGdlbmRlciwgYXZhdGFyVXJsLCBwcm92aW5jZSwgY291bnRyeSwgY2l0eSB9KVxuXG4gICAgdGhpcy5fc2V0TG9jYWxVc2VySW5mbyhuZXdVc2VySW5mbyk7XG4gIH1cbiAgLyoqXG4gICAqIOabtOaWsOWvhueggVxuICAgKiBAcGFyYW0gbmV3UGFzc3dvcmRcbiAgICogQHBhcmFtIG9sZFBhc3N3b3JkXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw5a+G56CB5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlUGFzc3dvcmQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMyAtIOaWsOWvhueggeS4reaYr+WQpuWMheWQq+mdnuazleWtl+espicsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIHVwZGF0ZVBhc3N3b3JkKG5ld1Bhc3N3b3JkOiBzdHJpbmcsIG9sZFBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnVwZGF0ZVBhc3N3b3JkQnlPbGQoe1xuICAgICAgb2xkX3Bhc3N3b3JkOiBvbGRQYXNzd29yZCxcbiAgICAgIG5ld19wYXNzd29yZDogbmV3UGFzc3dvcmRcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIOabtOaWsOeUqOaIt+WQjVxuICAgKiBAcGFyYW0gdXNlcm5hbWVcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmm7TmlrDnlKjmiLflkI3lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci51cGRhdGVVc2VybmFtZSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG55So5oi35ZCN5a+G56CB55m75b2VJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgdXBkYXRlVXNlcm5hbWUodXNlcm5hbWU6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgdXNlcm5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ3VzZXJuYW1lIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy51cGRhdGUoe1xuICAgICAgdXNlcm5hbWVcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIOWIt+aWsOacrOWcsOeUqOaIt+S/oeaBr+OAguW9k+eUqOaIt+WcqOWFtuS7luWuouaIt+err+abtOaWsOeUqOaIt+S/oeaBr+S5i+WQju+8jOWPr+S7peiwg+eUqOatpOaOpeWPo+WQjOatpeabtOaWsOS5i+WQjueahOS/oeaBr+OAglxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+WIt+aWsOacrOWcsOeUqOaIt+S/oeaBr+Wksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnJlZnJlc2goKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyByZWZyZXNoKCk6IFByb21pc2U8SVVzZXJJbmZvPiB7XG4gICAgY29uc3QgbmV3VXNlckluZm8gPSBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuZ2V0VXNlckluZm8oKVxuICAgIHRoaXMuX3NldExvY2FsVXNlckluZm8obmV3VXNlckluZm8pO1xuICAgIHJldHVybiBuZXdVc2VySW5mbztcbiAgfVxuXG4gIHByaXZhdGUgX2dldExvY2FsVXNlckluZm8oa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCBib29sZWFuIHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodXNlckluZm9LZXkpO1xuICAgIHJldHVybiB1c2VySW5mb1trZXldO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfZ2V0TG9jYWxVc2VySW5mb0FzeW5jKGtleTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyh1c2VySW5mb0tleSk7XG4gICAgcmV0dXJuIHVzZXJJbmZvW2tleV07XG4gIH1cblxuICBwcml2YXRlIF9zZXRVc2VySW5mbygpIHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodXNlckluZm9LZXkpO1xuICAgIFtcbiAgICAgICd1aWQnLFxuICAgICAgJ2VtYWlsJyxcbiAgICAgICduYW1lJyxcbiAgICAgICdnZW5kZXInLFxuICAgICAgJ3BpY3R1cmUnLFxuICAgICAgJ2F2YXRhclVybCcsXG4gICAgICAncGhvbmUnLFxuICAgICAgJ2VtYWlsX3ZlcmlmaWVkJyxcbiAgICAgICdwaG9uZV9udW1iZXInLFxuICAgICAgJ2JpcnRoZGF0ZScsXG4gICAgICAnem9uZWluZm8nLFxuICAgICAgJ2xvY2FsZScsXG4gICAgICAnc3ViJyxcbiAgICAgICdjcmVhdGVkX2Zyb20nLFxuICAgICAgJ3Byb3ZpZGVycycsXG4gICAgICAndXNlcm5hbWUnXG4gICAgXS5mb3JFYWNoKGluZm9LZXkgPT4ge1xuICAgICAgdGhpc1tpbmZvS2V5XSA9IHVzZXJJbmZvW2luZm9LZXldO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0TG9jYWxVc2VySW5mbyh1c2VySW5mbzogYW55KSB7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICB0aGlzLl9jYWNoZS5zZXRTdG9yZSh1c2VySW5mb0tleSwgdXNlckluZm8pO1xuICAgIHRoaXMuX3NldFVzZXJJbmZvKCk7XG4gIH1cbn1cbmludGVyZmFjZSBJTG9naW5TdGF0ZU9wdGlvbnMgZXh0ZW5kcyBJVXNlck9wdGlvbnMge1xuICBlbnZJZDogc3RyaW5nO1xufVxuZXhwb3J0IGNsYXNzIExvZ2luU3RhdGUgaW1wbGVtZW50cyBJTG9naW5TdGF0ZSB7XG4gIHB1YmxpYyB1c2VyOiBJVXNlcjtcbiAgcHVibGljIG9hdXRoTG9naW5TdGF0ZTogYW55XG5cbiAgcHJpdmF0ZSBfb2F1dGhJbnN0YW5jZTogQ2xvdWRiYXNlT0F1dGhcbiAgcHJpdmF0ZSBfY2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJTG9naW5TdGF0ZU9wdGlvbnMpIHtcbiAgICBjb25zdCB7IGVudklkLCBjYWNoZSwgb2F1dGhJbnN0YW5jZSB9ID0gb3B0aW9ucztcbiAgICBpZiAoIWVudklkKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ2VudklkIGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuICAgIHRoaXMuX2NhY2hlID0gY2FjaGU7XG4gICAgdGhpcy5fb2F1dGhJbnN0YW5jZSA9IG9hdXRoSW5zdGFuY2VcblxuICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKHtcbiAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgIG9hdXRoSW5zdGFuY2VcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjaGVja0xvY2FsU3RhdGUoKSB7XG4gICAgdGhpcy5vYXV0aExvZ2luU3RhdGUgPSB0aGlzLl9vYXV0aEluc3RhbmNlPy5hdXRoQXBpLmhhc0xvZ2luU3RhdGVTeW5jKClcbiAgICB0aGlzLnVzZXIuY2hlY2tMb2NhbEluZm8oKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjaGVja0xvY2FsU3RhdGVBc3luYygpIHtcbiAgICBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlPy5hdXRoQXBpLmdldExvZ2luU3RhdGUoKVxuICAgIGF3YWl0IHRoaXMudXNlci5jaGVja0xvY2FsSW5mb0FzeW5jKCk7XG4gIH1cbn1cblxuY2xhc3MgQXV0aCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2NvbmZpZzogSUNsb3VkYmFzZUF1dGhDb25maWc7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2NhY2hlOiBJQ2xvdWRiYXNlQ2FjaGVcbiAgLy8gcHJpdmF0ZSByZWFkb25seSBfcmVxdWVzdDogSUNsb3VkYmFzZVJlcXVlc3Q7XG5cbiAgcHJpdmF0ZSBfb2F1dGhJbnN0YW5jZTogQ2xvdWRiYXNlT0F1dGhcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IElDbG91ZGJhc2VBdXRoQ29uZmlnICYgeyBjYWNoZTogSUNsb3VkYmFzZUNhY2hlLCByZXF1ZXN0PzogSUNsb3VkYmFzZVJlcXVlc3QsIHJ1bnRpbWU/OiBzdHJpbmcgfSkge1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLl9jYWNoZSA9IGNvbmZpZy5jYWNoZTtcbiAgICAvLyB0aGlzLl9yZXF1ZXN0ID0gY29uZmlnLnJlcXVlc3Q7XG4gICAgdGhpcy5fb2F1dGhJbnN0YW5jZSA9IGNvbmZpZy5vYXV0aEluc3RhbmNlXG4gIH1cblxuICAvKipcbiAgKiDnu5HlrprmiYvmnLrlj7dcbiAgKiBAcGFyYW0gcGhvbmVOdW1iZXJcbiAgKiBAcGFyYW0gcGhvbmVDb2RlXG4gICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnu5HlrprmiYvmnLrlj7flpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmJpbmRQaG9uZU51bWJlcigpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG55+t5L+h6aqM6K+B56CB55m75b2VJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgYmluZFBob25lTnVtYmVyKHBhcmFtczogYXV0aE1vZGVscy5CaW5kUGhvbmVSZXF1ZXN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5iaW5kUGhvbmUocGFyYW1zKVxuICB9XG5cbiAgLyoqXG4gICAqIOino+e7keS4ieaWuee7keWumlxuICAgKiBAcGFyYW0gbG9naW5UeXBlXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6Kej6Zmk5LiJ5pa557uR5a6a5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS51bmJpbmRQcm92aWRlcigpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN6LSm5oi35piv5ZCm5bey57uP5LiO5q2k55m75b2V5pa55byP6Kej57uRJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgdW5iaW5kUHJvdmlkZXIocGFyYW1zOiBhdXRoTW9kZWxzLlVuYmluZFByb3ZpZGVyUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkudW5iaW5kUHJvdmlkZXIocGFyYW1zKVxuICB9XG5cbiAgLyoqXG4gKiDmm7TmlrDpgq7nrrHlnLDlnYBcbiAqIEBwYXJhbSBlbWFpbFxuICogQHBhcmFtIHN1ZG9fdG9rZW5cbiAqIEBwYXJhbSB2ZXJpZmljYXRpb25fdG9rZW5cbiAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn57uR5a6a6YKu566x5Zyw5Z2A5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5iaW5kRW1haWwoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6humCrueuseWvhueggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGJpbmRFbWFpbChwYXJhbXM6IGF1dGhNb2RlbHMuQmluZEVtYWlsUmVxdWVzdCkge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuYmluZEVtYWlsKHBhcmFtcylcbiAgfVxuXG4gIC8qKlxuICAgKiB2ZXJpZnlcbiAgICogQHBhcmFtIHthdXRoTW9kZWxzLlZlcmlmeVJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhdXRoTW9kZWxzLlZlcmlmeVJlc3BvbnNlPn1cbiAgICogQG1lbWJlcm9mIFVzZXJcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfpqozor4HnoIHpqozor4HlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLnZlcmlmeSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG5omL5py66aqM6K+B56CBL+mCrueuseeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHZlcmlmeShwYXJhbXM6IGF1dGhNb2RlbHMuVmVyaWZ5UmVxdWVzdCk6IFByb21pc2U8YXV0aE1vZGVscy5WZXJpZnlSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkudmVyaWZ5KHBhcmFtcylcbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5bpqozor4HnoIFcbiAgICogQHBhcmFtIHthdXRoTW9kZWxzLkdldFZlcmlmaWNhdGlvblJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhdXRoTW9kZWxzLkdldFZlcmlmaWNhdGlvblJlc3BvbnNlPn1cbiAgICogQG1lbWJlcm9mIFVzZXJcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5bpqozor4HnoIHlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmdldFZlcmlmaWNhdGlvbigpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG5omL5py66aqM6K+B56CBL+mCrueuseeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGdldFZlcmlmaWNhdGlvbihcbiAgICBwYXJhbXM6IGF1dGhNb2RlbHMuR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxhdXRoTW9kZWxzLkdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5nZXRWZXJpZmljYXRpb24ocGFyYW1zKVxuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluW9k+WJjeeZu+W9leeahOeUqOaIt+S/oeaBry3lkIzmraVcbiAgICovXG4gIGdldCBjdXJyZW50VXNlcigpIHtcbiAgICBpZiAodGhpcy5fY2FjaGUubW9kZSA9PT0gJ2FzeW5jJykge1xuICAgICAgLy8gYXN5bmMgc3RvcmFnZeeahOW5s+WPsOiwg+eUqOatpEFQSeaPkOekulxuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwgJ2N1cnJlbnQgcGxhdGZvcm1cXCdzIHN0b3JhZ2UgaXMgYXN5bmNocm9ub3VzLCBwbGVhc2UgdXNlIGdldEN1cnJlbnRVc2VyIGluc3RlZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsb2dpblN0YXRlID0gdGhpcy5oYXNMb2dpblN0YXRlKCk7XG5cbiAgICBpZiAobG9naW5TdGF0ZSkge1xuICAgICAgcmV0dXJuIGxvZ2luU3RhdGUudXNlciB8fCBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6I635Y+W5b2T5YmN55m75b2V55qE55So5oi35L+h5oGvLeW8guatpVxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iOt+WPlueUqOaIt+S/oeaBr+Wksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuZ2V0Q3VycmVuVXNlcigpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGdldEN1cnJlbnRVc2VyKCkge1xuICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBhd2FpdCB0aGlzLmdldExvZ2luU3RhdGUoKTtcbiAgICBpZiAobG9naW5TdGF0ZSkge1xuICAgICAgYXdhaXQgbG9naW5TdGF0ZS51c2VyLmNoZWNrTG9jYWxJbmZvQXN5bmMoKTtcbiAgICAgIHJldHVybiBsb2dpblN0YXRlLnVzZXIgfHwgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICog5Yy/5ZCN55m75b2VXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPElMb2dpblN0YXRlPn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfljL/lkI3nmbvlvZXlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDlvZPliY3njq/looPmmK/lkKblvIDlkK/kuobljL/lkI3nmbvlvZUnLFxuICAgICAgJyAgMiAtIOiwg+eUqCBhdXRoKCkuc2lnbkluQW5vbnltb3VzbHkoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBzaWduSW5Bbm9ueW1vdXNseSgpOiBQcm9taXNlPElMb2dpblN0YXRlPiB7XG4gICAgYXdhaXQgdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnNpZ25JbkFub255bW91c2x5KClcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVMb2dpblN0YXRlKClcbiAgfVxuXG4gIC8qKlxuICAgKiDorr7nva7ojrflj5boh6rlrprkuYnnmbvlvZUgdGlja2V0IOWHveaVsFxuICAgKiBAcGFyYW0ge2F1dGhNb2RlbHMuR2V0Q3VzdG9tU2lnblRpY2tldEZufSBnZXRUaWNrRm5cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIHB1YmxpYyBzZXRDdXN0b21TaWduRnVuYyhnZXRUaWNrRm46IGF1dGhNb2RlbHMuR2V0Q3VzdG9tU2lnblRpY2tldEZuKTogdm9pZCB7XG4gICAgdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnNldEN1c3RvbVNpZ25GdW5jKGdldFRpY2tGbilcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxJTG9naW5TdGF0ZT59XG4gICAqIEBtZW1iZXJvZiBBdXRoXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6Ieq5a6a5LmJ55m75b2V5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g5b2T5YmN546v5aKD5piv5ZCm5byA5ZCv5LqG6Ieq5a6a5LmJ55m75b2VJyxcbiAgICAgICcgIDIgLSDosIPnlKggYXV0aCgpLnNpZ25JbldpdGhDdXN0b21UaWNrZXQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMyAtIHRpY2tldCDmmK/lkKblvZLlsZ7kuo7lvZPliY3njq/looMnLFxuICAgICAgJyAgNCAtIOWIm+W7uiB0aWNrZXQg55qE6Ieq5a6a5LmJ55m75b2V56eB6ZKl5piv5ZCm6L+H5pyfJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aEN1c3RvbVRpY2tldCgpOiBQcm9taXNlPElMb2dpblN0YXRlPiB7XG4gICAgYXdhaXQgdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnNpZ25JbldpdGhDdXN0b21UaWNrZXQoKVxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUxvZ2luU3RhdGUoKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7YXV0aE1vZGVscy5TaWduSW5SZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybnMge1Byb21pc2U8SUxvZ2luU3RhdGU+fVxuICAgKiBAbWVtYmVyb2YgQXV0aFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbihwYXJhbXM6IGF1dGhNb2RlbHMuU2lnbkluUmVxdWVzdCk6IFByb21pc2U8SUxvZ2luU3RhdGU+IHtcbiAgICBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuc2lnbkluKHBhcmFtcylcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVMb2dpblN0YXRlKClcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge2F1dGhNb2RlbHMuU2lnblVwUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPElMb2dpblN0YXRlPn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfms6jlhozlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDlvZPliY3njq/looPmmK/lkKblvIDlkK/kuobmjIflrprnmbvlvZXmlrnlvI8nLFxuICAgICAgJyAgMiAtIOiwg+eUqCBhdXRoKCkuc2lnblVwKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgc2lnblVwKHBhcmFtczogYXV0aE1vZGVscy5TaWduVXBSZXF1ZXN0KTogUHJvbWlzZTxJTG9naW5TdGF0ZT4ge1xuICAgIGNvbnNvbGUubG9nKCdnZ2cnKVxuICAgIGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5zaWduVXAocGFyYW1zKVxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUxvZ2luU3RhdGUoKVxuICB9XG5cbiAgLyoqXG4gICAqIOiuvue9ruWvhueggVxuICAgKiBAcGFyYW0ge2F1dGhNb2RlbHMuU2V0UGFzc3dvcmRSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqIEBtZW1iZXJvZiBBdXRoXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2V0UGFzc3dvcmQocGFyYW1zOiBhdXRoTW9kZWxzLlNldFBhc3N3b3JkUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuc2V0UGFzc3dvcmQocGFyYW1zKVxuICB9XG5cbiAgLyoqXG4gICAqIOajgOa1i+eUqOaIt+WQjeaYr+WQpuW3sue7j+WNoOeUqFxuICAgKiBAcGFyYW0gdXNlcm5hbWVcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5bnlKjmiLfmmK/lkKbooqvljaDnlKjlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmlzVXNlcm5hbWVSZWdpc3RlcmVkKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgaXNVc2VybmFtZVJlZ2lzdGVyZWQodXNlcm5hbWU6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICh0eXBlb2YgdXNlcm5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ3VzZXJuYW1lIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWVyeVJlcyA9IGF3YWl0IHRoaXMucXVlcnlVc2VyKHtcbiAgICAgIHVzZXJuYW1lXG4gICAgfSlcblxuICAgIHJldHVybiBwYXJzZUludChxdWVyeVJlcy50b3RhbCkgPyB0cnVlIDogZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKiDnmbvlh7pcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnlKjmiLfnmbvlh7rlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLnNpZ25PdXQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeUqOaIt+aYr+WQpuS4uuWMv+WQjeeZu+W9le+8iOWMv+WQjeeZu+W9leS4jeaUr+aMgXNpZ25PdXTvvIknLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBzaWduT3V0KCkge1xuICAgIGNvbnN0IHsgdXNlckluZm9LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgYXdhaXQgdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnNpZ25PdXQoKVxuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmModXNlckluZm9LZXkpXG4gIH1cblxuICAvKipcbiAgICog6I635Y+W5pys5Zyw55m75b2V5oCBLeWQjOatpVxuICAgKi9cbiAgcHVibGljIGhhc0xvZ2luU3RhdGUoKTogSUxvZ2luU3RhdGUgfCBudWxsIHtcbiAgICBpZiAodGhpcy5fY2FjaGUubW9kZSA9PT0gJ2FzeW5jJykge1xuICAgICAgLy8gYXN5bmMgc3RvcmFnZeeahOW5s+WPsOiwg+eUqOatpEFQSeaPkOekulxuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwgJ2N1cnJlbnQgcGxhdGZvcm1cXCdzIHN0b3JhZ2UgaXMgYXN5bmNocm9ub3VzLCBwbGVhc2UgdXNlIGdldExvZ2luU3RhdGUgaW5zdGVlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9hdXRoTG9naW5TdGF0ZSA9IHRoaXMuX29hdXRoSW5zdGFuY2U/LmF1dGhBcGkuaGFzTG9naW5TdGF0ZVN5bmMoKVxuICAgIGlmIChvYXV0aExvZ2luU3RhdGUpIHtcbiAgICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBuZXcgTG9naW5TdGF0ZSh7XG4gICAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIG9hdXRoSW5zdGFuY2U6IHRoaXMuX29hdXRoSW5zdGFuY2UsXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGxvZ2luU3RhdGVcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6I635Y+W5pys5Zyw55m75b2V5oCBLeW8guatpVxuICAgKiDmraRBUEnkuLrlhbzlrrnlvILmraVzdG9yYWdl55qE5bmz5Y+wXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W5pys5Zyw55m75b2V5oCB5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5nZXRMb2dpblN0YXRlKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0TG9naW5TdGF0ZSgpIHtcbiAgICBjb25zdCBvYXV0aExvZ2luU3RhdGUgPSBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuZ2V0TG9naW5TdGF0ZSgpXG4gICAgaWYgKG9hdXRoTG9naW5TdGF0ZSkge1xuICAgICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgb2F1dGhJbnN0YW5jZTogdGhpcy5fb2F1dGhJbnN0YW5jZSxcbiAgICAgIH0pXG4gICAgICByZXR1cm4gbG9naW5TdGF0ZVxuICAgIH1cblxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W55So5oi35L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g5piv5ZCm5bey55m75b2VJyxcbiAgICAgICcgIDIgLSDosIPnlKggYXV0aCgpLmdldFVzZXJJbmZvKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0VXNlckluZm8oKTogUHJvbWlzZTxJVXNlckluZm8+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLmdldFVzZXJJbmZvKClcbiAgfVxuXG5cbiAgLyoqXG4gICAqIOS4uuW3suaciei0puaIt+e7keesrOS4ieaWuei0puaIt1xuICAgKiBAcGFyYW0ge2F1dGhNb2RlbHMuQmluZFdpdGhQcm92aWRlclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnu5HlrprnrKzkuInmlrnnmbvlvZXmlrnlvI/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmJpbmRXaXRoUHJvdmlkZXIoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOatpOi0puaIt+aYr+WQpuW3sue7j+e7keWumuatpOesrOS4ieaWuScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGJpbmRXaXRoUHJvdmlkZXIoXG4gICAgcGFyYW1zOiBhdXRoTW9kZWxzLkJpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLmJpbmRXaXRoUHJvdmlkZXIocGFyYW1zKVxuICB9XG5cbiAgLyoqXG4gICAqIOafpeivoueUqOaIt1xuICAgKiBAcGFyYW0ge2F1dGhNb2RlbHMuUXVlcnlVc2VyUHJvZmlsZVJlcXVlc3R9IGFwcGVuZGVkX3BhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhdXRoTW9kZWxzLlVzZXJQcm9maWxlPn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIHB1YmxpYyBhc3luYyBxdWVyeVVzZXIoXG4gICAgcXVlcnlPYmo6IGF1dGhNb2RlbHMuUXVlcnlVc2VyUHJvZmlsZVJlcXVlc3QsXG4gICk6IFByb21pc2U8YXV0aE1vZGVscy5RdWVyeVVzZXJQcm9maWxlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnF1ZXJ5VXNlclByb2ZpbGUocXVlcnlPYmopXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0QWNjZXNzVG9rZW4oKSB7XG4gICAgY29uc3Qgb2F1dGhBY2Nlc3NUb2tlblJlcyA9IGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2Uub2F1dGgyY2xpZW50LmdldEFjY2Vzc1Rva2VuKClcbiAgICByZXR1cm4ge1xuICAgICAgYWNjZXNzVG9rZW46IG9hdXRoQWNjZXNzVG9rZW5SZXMsXG4gICAgICBlbnY6IHRoaXMuX2NvbmZpZy5lbnZcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdyYW50UHJvdmlkZXJUb2tlbihcbiAgICBwYXJhbXM6IGF1dGhNb2RlbHMuR3JhbnRQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxhdXRoTW9kZWxzLkdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5ncmFudFByb3ZpZGVyVG9rZW4ocGFyYW1zKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNpZ25JbldpdGhQcm92aWRlcihcbiAgICBwYXJhbXM6IGF1dGhNb2RlbHMuU2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxJTG9naW5TdGF0ZT4ge1xuICAgIGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5zaWduSW5XaXRoUHJvdmlkZXIocGFyYW1zKVxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUxvZ2luU3RhdGUoKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdyYW50VG9rZW4ocGFyYW1zOiBhdXRoTW9kZWxzLkdyYW50VG9rZW5SZXF1ZXN0KTogUHJvbWlzZTxJTG9naW5TdGF0ZT4ge1xuICAgIGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5ncmFudFRva2VuKHBhcmFtcylcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVMb2dpblN0YXRlKClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZW5Qcm92aWRlclJlZGlyZWN0VXJpKFxuICAgIHBhcmFtczogYXV0aE1vZGVscy5HZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxhdXRoTW9kZWxzLkdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuZ2VuUHJvdmlkZXJSZWRpcmVjdFVyaShwYXJhbXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVzZXRQYXNzd29yZChwYXJhbXM6IGF1dGhNb2RlbHMuUmVzZXRQYXNzd29yZFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnJlc2V0UGFzc3dvcmQocGFyYW1zKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRldmljZUF1dGhvcml6ZShwYXJhbXM6IGF1dGhNb2RlbHMuRGV2aWNlQXV0aG9yaXplUmVxdWVzdCk6IFByb21pc2U8YXV0aE1vZGVscy5EZXZpY2VBdXRob3JpemVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuZGV2aWNlQXV0aG9yaXplKHBhcmFtcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzdWRvKHBhcmFtczogYXV0aE1vZGVscy5TdWRvUmVxdWVzdCk6IFByb21pc2U8YXV0aE1vZGVscy5TdWRvUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnN1ZG8ocGFyYW1zKVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjcmVhdGVMb2dpblN0YXRlKCk6IFByb21pc2U8SUxvZ2luU3RhdGU+IHtcbiAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICBvYXV0aEluc3RhbmNlOiB0aGlzLl9vYXV0aEluc3RhbmNlLFxuICAgIH0pXG5cbiAgICBhd2FpdCBsb2dpblN0YXRlLmNoZWNrTG9jYWxTdGF0ZUFzeW5jKCk7XG4gICAgYXdhaXQgbG9naW5TdGF0ZS51c2VyLnJlZnJlc2goKTtcbiAgICByZXR1cm4gbG9naW5TdGF0ZVxuICB9XG59XG5cbmNvbnN0IGNvbXBvbmVudDogSUNsb3VkYmFzZUNvbXBvbmVudCA9IHtcbiAgbmFtZTogQ09NUE9ORU5UX05BTUUsXG4gIG5hbWVzcGFjZTogJ2F1dGgnLFxuICBlbnRpdHk6IGZ1bmN0aW9uIChjb25maWc6IFBpY2s8SUNsb3VkYmFzZUF1dGhDb25maWcsICdyZWdpb24nIHwgJ3BlcnNpc3RlbmNlJz4gPSB7IHJlZ2lvbjogJycsIHBlcnNpc3RlbmNlOiAnbG9jYWwnIH0pIHtcbiAgICBpZiAodGhpcy5hdXRoSW5zdGFuY2UpIHtcbiAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sICdldmVyeSBjbG91ZGJhc2UgaW5zdGFuY2Ugc2hvdWxkIGhhcyBvbmx5IG9uZSBhdXRoIG9iamVjdCcpO1xuICAgICAgcmV0dXJuIHRoaXMuYXV0aEluc3RhbmNlO1xuICAgIH1cbiAgICBjb25zdCB7IGFkYXB0ZXIsIHJ1bnRpbWUgfSA9IHRoaXMucGxhdGZvcm07XG4gICAgLy8g5aaC5LiN5piO56Gu5oyH5a6acGVyc2lzdGVuY2XliJnkvJjlhYjlj5blkITlubPlj7BhZGFwdGVy6aaW6YCJ77yM5YW25qyhbG9jYWxTdG9yYWdlXG4gICAgY29uc3QgbmV3UGVyc2lzdGVuY2UgPSBjb25maWcucGVyc2lzdGVuY2UgfHwgYWRhcHRlci5wcmltYXJ5U3RvcmFnZTtcbiAgICBpZiAobmV3UGVyc2lzdGVuY2UgJiYgKG5ld1BlcnNpc3RlbmNlICE9PSB0aGlzLmNvbmZpZy5wZXJzaXN0ZW5jZSkpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29uZmlnKHsgcGVyc2lzdGVuY2U6IG5ld1BlcnNpc3RlbmNlIH0pXG4gICAgfVxuXG4gICAgY29uc3QgeyBlbnYsIHBlcnNpc3RlbmNlLCBkZWJ1ZywgY2xpZW50SWQgfSA9IHRoaXMuY29uZmlnO1xuICAgIGNvbnN0IG9hdXRoSW5zdGFuY2UgPSBuZXcgQ2xvdWRiYXNlT0F1dGgoe1xuICAgICAgY2xpZW50SWQ6IGNsaWVudElkLFxuICAgICAgYXBpT3JpZ2luOiB0aGlzLnJlcXVlc3QuZ2V0QmFzZUVuZFBvaW50KCksXG4gICAgfSlcblxuICAgIHRoaXMub2F1dGhJbnN0YW5jZSA9IG9hdXRoSW5zdGFuY2VcblxuICAgIHRoaXMuYXV0aEluc3RhbmNlID0gbmV3IEF1dGgoe1xuICAgICAgZW52LFxuICAgICAgcmVnaW9uOiBjb25maWcucmVnaW9uLFxuICAgICAgcGVyc2lzdGVuY2UsXG4gICAgICBkZWJ1ZyxcbiAgICAgIGNhY2hlOiB0aGlzLmNhY2hlLFxuICAgICAgLy8gcmVxdWVzdDogdGhpcy5yZXF1ZXN0LFxuICAgICAgcnVudGltZTogcnVudGltZSxcbiAgICAgIF9mcm9tQXBwOiB0aGlzLFxuICAgICAgLy8gb2F1dGhJbnN0YW5jZTogdGhpcy5vYXV0aEluc3RhbmNlIHx8ICh0aGlzIGFzIGFueSkub2F1dGgoKVxuICAgICAgb2F1dGhJbnN0YW5jZVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXV0aEluc3RhbmNlO1xuICB9XG59XG5cbnRyeSB7XG4gIC8vIOWwneivleiHquWKqOazqOWGjOiHs+WFqOWxgOWPmOmHj2Nsb3VkYmFzZVxuICAvLyDmraTooYzkuLrlj6rlnKjmtY/op4jlmajnjq/looPkuIvmnInmlYhcbiAgY2xvdWRiYXNlLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG59IGNhdGNoIChlKSB7IH1cblxuZXhwb3J0IHtcbiAgVXNlckluZm8sXG4gIEF1dGgsXG59O1xuLyoqXG4gKiBAYXBpIOaJi+WKqOazqOWGjOiHs2Nsb3VkYmFzZSBhcHBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQXV0aChhcHA6IFBpY2s8SUNsb3VkYmFzZSwgJ3JlZ2lzdGVyQ29tcG9uZW50Jz4pIHtcbiAgdHJ5IHtcbiAgICBhcHAucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUud2FybihlKTtcbiAgfVxufVxuXG4iXX0=