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
exports.registerAuth = exports.Auth = exports.LoginState = void 0;
var utilities_1 = require("@cloudbase/utilities");
var oauth_1 = require("@cloudbase/oauth");
var printWarn = utilities_1.utils.printWarn, throwError = utilities_1.utils.throwError;
var ERRORS = utilities_1.constants.ERRORS, COMMUNITY_SITE_URL = utilities_1.constants.COMMUNITY_SITE_URL;
var catchErrorsDecorator = utilities_1.helpers.catchErrorsDecorator;
var CloudbaseEventEmitter = utilities_1.events.CloudbaseEventEmitter;
var COMPONENT_NAME = 'auth';
var EVENTS = {
    LOGIN_STATE_CHANGED: 'loginStateChanged',
};
var eventBus = new CloudbaseEventEmitter();
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
            var newUserInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._oauthInstance.authApi.setUserProfile(__assign({}, userInfo))];
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
exports.LoginState = LoginState;
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
                    case 0: return [4, this._oauthInstance.authApi.signUp(params)];
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
            var exist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof username !== 'string') {
                            throwError(ERRORS.INVALID_PARAMS, 'username must be a string');
                        }
                        return [4, this._oauthInstance.authApi.checkIfUserExist({ username: username })];
                    case 1:
                        exist = (_a.sent()).exist;
                        return [2, exist];
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
                        eventBus.fire(EVENTS.LOGIN_STATE_CHANGED);
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
    Auth.prototype.deleteMe = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._oauthInstance.authApi.deleteMe(params)];
            });
        });
    };
    Auth.prototype.getProviders = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._oauthInstance.authApi.getProviders()];
            });
        });
    };
    Auth.prototype.loginScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._oauthInstance.authApi.loginScope()];
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
                        eventBus.fire(EVENTS.LOGIN_STATE_CHANGED);
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
exports.Auth = Auth;
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
        var oauthInstance = new oauth_1.CloudbaseOAuth({
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
function registerAuth(app) {
    try {
        app.registerComponent(component);
    }
    catch (e) {
        console.warn(e);
    }
}
exports.registerAuth = registerAuth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrREFBeUU7QUFNekUsMENBQTZEO0FBSXJELElBQUEsU0FBUyxHQUFpQixpQkFBSyxVQUF0QixFQUFFLFVBQVUsR0FBSyxpQkFBSyxXQUFWLENBQVc7QUFDaEMsSUFBQSxNQUFNLEdBQXlCLHFCQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUsscUJBQVMsbUJBQWQsQ0FBZTtBQUN6QyxJQUFBLG9CQUFvQixHQUFLLG1CQUFPLHFCQUFaLENBQWE7QUFDakMsSUFBQSxxQkFBcUIsR0FBSyxrQkFBTSxzQkFBWCxDQUFZO0FBRXpDLElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQztBQUU5QixJQUFNLE1BQU0sR0FBRztJQUViLG1CQUFtQixFQUFFLG1CQUFtQjtDQUN6QyxDQUFDO0FBbUJGLElBQU0sUUFBUSxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztBQVE3QztJQXdCRSxjQUFZLE9BQXFCO1FBQ3ZCLElBQUEsS0FBSyxHQUFvQixPQUFPLE1BQTNCLEVBQUUsYUFBYSxHQUFLLE9BQU8sY0FBWixDQUFhO1FBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBRW5DLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBSVksNkJBQWMsR0FBM0I7OztnQkFDRSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQVcsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFXLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBVyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQVcsQ0FBQztnQkFDL0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFXLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFZLENBQUM7Z0JBQzFFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBVyxDQUFBO2dCQUNwRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQVcsQ0FBQTtnQkFDNUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFXLENBQUE7Z0JBQ3BELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBVyxDQUFBO2dCQUM5RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQVcsQ0FBQTtnQkFDNUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFXLENBQUE7Z0JBQ3hELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBVyxDQUFBO2dCQUNsRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQVcsQ0FBQTtnQkFDcEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFRLENBQUE7Ozs7S0FDNUQ7SUFJWSxrQ0FBbUIsR0FBaEM7Ozs7Ozt3QkFDRSxLQUFBLElBQUksQ0FBQTt3QkFBTyxXQUFNLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsRUFBQTs7d0JBQW5ELEdBQUssR0FBRyxHQUFHLFNBQXdDLENBQUM7d0JBQ3BELEtBQUEsSUFBSSxDQUFBO3dCQUFVLFdBQU0sSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxFQUFBOzt3QkFBekQsR0FBSyxNQUFNLEdBQUcsU0FBMkMsQ0FBQzt3QkFDMUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFXLENBQUM7d0JBQzNELEtBQUEsSUFBSSxDQUFBO3dCQUFhLFdBQU0sSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxFQUFBOzt3QkFBL0QsR0FBSyxTQUFTLEdBQUcsU0FBOEMsQ0FBQzt3QkFDaEUsS0FBQSxJQUFJLENBQUE7d0JBQVMsV0FBTSxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUF2RCxHQUFLLEtBQUssR0FBRyxTQUEwQyxDQUFDO3dCQUN4RCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBWSxDQUFDO3dCQUMxRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQVcsQ0FBQTt3QkFDcEUsS0FBQSxJQUFJLENBQUE7d0JBQVksV0FBTSxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLEVBQUE7O3dCQUE3RCxHQUFLLFFBQVEsR0FBRyxTQUE2QyxDQUFBO3dCQUM3RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQVcsQ0FBQTt3QkFDcEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFXLENBQUE7d0JBQzlELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBVyxDQUFBO3dCQUM1RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQVcsQ0FBQTt3QkFDeEQsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFXLENBQUE7d0JBQ2xELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBVyxDQUFBO3dCQUNwRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQVEsQ0FBQTs7Ozs7S0FDNUQ7SUFnQlkscUJBQU0sR0FBbkIsVUFBb0IsUUFBZ0M7Ozs7OzRCQUU5QixXQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLGNBQWMsY0FBTSxRQUFRLEVBQUcsRUFBQTs7d0JBQS9FLFdBQVcsR0FBRyxTQUFpRTt3QkFFckYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7OztLQUNyQztJQWVNLDZCQUFjLEdBQXJCLFVBQXNCLFdBQW1CLEVBQUUsV0FBbUI7UUFDNUQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztZQUNyRCxZQUFZLEVBQUUsV0FBVztZQUN6QixZQUFZLEVBQUUsV0FBVztTQUMxQixDQUFDLENBQUE7SUFDSixDQUFDO0lBZU0sNkJBQWMsR0FBckIsVUFBc0IsUUFBZ0I7UUFDcEMsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDaEMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztTQUNoRTtRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNqQixRQUFRLFVBQUE7U0FDVCxDQUFDLENBQUE7SUFDSixDQUFDO0lBYVksc0JBQU8sR0FBcEI7Ozs7OzRCQUNzQixXQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFBOzt3QkFBN0QsV0FBVyxHQUFHLFNBQStDO3dCQUNuRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ3BDLFdBQU8sV0FBVyxFQUFDOzs7O0tBQ3BCO0lBRU8sZ0NBQWlCLEdBQXpCLFVBQTBCLEdBQVc7UUFDM0IsSUFBQSxXQUFXLEdBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFlBQXJCLENBQXNCO1FBQ3pDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFYSxxQ0FBc0IsR0FBcEMsVUFBcUMsR0FBVzs7Ozs7O3dCQUN0QyxXQUFXLEdBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFlBQXJCLENBQXNCO3dCQUN4QixXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFBOzt3QkFBdkQsUUFBUSxHQUFHLFNBQTRDO3dCQUM3RCxXQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBQzs7OztLQUN0QjtJQUVPLDJCQUFZLEdBQXBCO1FBQUEsaUJBdUJDO1FBdEJTLElBQUEsV0FBVyxHQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxZQUFyQixDQUFzQjtRQUN6QyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRDtZQUNFLEtBQUs7WUFDTCxPQUFPO1lBQ1AsTUFBTTtZQUNOLFFBQVE7WUFDUixTQUFTO1lBQ1QsV0FBVztZQUNYLE9BQU87WUFDUCxnQkFBZ0I7WUFDaEIsY0FBYztZQUNkLFdBQVc7WUFDWCxVQUFVO1lBQ1YsUUFBUTtZQUNSLEtBQUs7WUFDTCxjQUFjO1lBQ2QsV0FBVztZQUNYLFVBQVU7U0FDWCxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87WUFDZixLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGdDQUFpQixHQUF6QixVQUEwQixRQUFhO1FBQzdCLElBQUEsV0FBVyxHQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxZQUFyQixDQUFzQjtRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUE1R0Q7UUFUQyxvQkFBb0IsQ0FBQztZQUNwQixLQUFLLEVBQUUsVUFBVTtZQUNqQixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVixtQ0FBbUM7Z0JBQ25DLG9CQUFvQjtnQkFDcEIsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7c0NBTUQ7SUFlRDtRQVRDLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxRQUFRO1lBQ2YsUUFBUSxFQUFFO2dCQUNSLFVBQVU7Z0JBQ1YsMkNBQTJDO2dCQUMzQyxvQkFBb0I7Z0JBQ3BCLGlLQUE2QixrQkFBb0I7YUFDbEQ7U0FDRixDQUFDOzs7OzhDQU1EO0lBZUQ7UUFUQyxvQkFBb0IsQ0FBQztZQUNwQixLQUFLLEVBQUUsU0FBUztZQUNoQixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDViwyQ0FBMkM7Z0JBQzNDLHdCQUF3QjtnQkFDeEIsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7OENBU0Q7SUFhRDtRQVJDLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxZQUFZO1lBQ25CLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLG9DQUFvQztnQkFDcEMsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7dUNBS0Q7SUE0Q0gsV0FBQztDQUFBLEFBbk1ELElBbU1DO0FBSUQ7SUFPRSxvQkFBWSxPQUEyQjtRQUM3QixJQUFBLEtBQUssR0FBMkIsT0FBTyxNQUFsQyxFQUFFLEtBQUssR0FBb0IsT0FBTyxNQUEzQixFQUFFLGFBQWEsR0FBSyxPQUFPLGNBQVosQ0FBYTtRQUNoRCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsVUFBVSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztTQUMzRDtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBRW5DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUM7WUFDbkIsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ2xCLGFBQWEsZUFBQTtTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxvQ0FBZSxHQUF0Qjs7UUFDRSxJQUFJLENBQUMsZUFBZSxTQUFHLElBQUksQ0FBQyxjQUFjLDBDQUFFLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO1FBQ3ZFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVZLHlDQUFvQixHQUFqQzs7Ozs7NEJBQ0Usa0JBQU0sSUFBSSxDQUFDLGNBQWMsMENBQUUsT0FBTyxDQUFDLGFBQWEsS0FBRTs7d0JBQWxELFNBQWtELENBQUE7d0JBQ2xELFdBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFBOzt3QkFBckMsU0FBcUMsQ0FBQzs7Ozs7S0FDdkM7SUFDSCxpQkFBQztBQUFELENBQUMsQUE5QkQsSUE4QkM7QUE5QlksZ0NBQVU7QUFnQ3ZCO0lBT0UsY0FBWSxNQUF3RztRQUNsSCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFFM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFBO0lBQzVDLENBQUM7SUFnQlksOEJBQWUsR0FBNUIsVUFBNkIsTUFBbUM7OztnQkFDOUQsV0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUE7OztLQUNyRDtJQWVZLDZCQUFjLEdBQTNCLFVBQTRCLE1BQXdDOzs7Z0JBQ2xFLFdBQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFBOzs7S0FDMUQ7SUFpQk0sd0JBQVMsR0FBaEIsVUFBaUIsTUFBbUM7UUFDbEQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdEQsQ0FBQztJQWlCWSxxQkFBTSxHQUFuQixVQUFvQixNQUFnQzs7O2dCQUNsRCxXQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQTs7O0tBQ2xEO0lBaUJZLDhCQUFlLEdBQTVCLFVBQ0UsTUFBeUM7OztnQkFFekMsV0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUE7OztLQUMzRDtJQUtELHNCQUFJLDZCQUFXO2FBQWY7WUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtnQkFFaEMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxnRkFBZ0YsQ0FBQyxDQUFDO2dCQUN0SCxPQUFPO2FBQ1I7WUFFRCxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFeEMsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsT0FBTyxVQUFVLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQzthQUNoQztpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQzthQUNiO1FBQ0gsQ0FBQzs7O09BQUE7SUFhWSw2QkFBYyxHQUEzQjs7Ozs7NEJBQ3FCLFdBQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFBOzt3QkFBdkMsVUFBVSxHQUFHLFNBQTBCOzZCQUN6QyxVQUFVLEVBQVYsY0FBVTt3QkFDWixXQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBQTs7d0JBQTNDLFNBQTJDLENBQUM7d0JBQzVDLFdBQU8sVUFBVSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUM7NEJBRS9CLFdBQU8sSUFBSSxFQUFDOzs7O0tBRWY7SUFpQlksZ0NBQWlCLEdBQTlCOzs7OzRCQUNFLFdBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsRUFBQTs7d0JBQXJELFNBQXFELENBQUE7d0JBQ3JELFdBQU8sSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUE7Ozs7S0FDL0I7SUFPTSxnQ0FBaUIsR0FBeEIsVUFBeUIsU0FBMkM7UUFDbEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDMUQsQ0FBQztJQWtCWSxxQ0FBc0IsR0FBbkM7Ozs7NEJBQ0UsV0FBTSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxFQUFBOzt3QkFBMUQsU0FBMEQsQ0FBQTt3QkFDMUQsV0FBTyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBQTs7OztLQUMvQjtJQVFZLHFCQUFNLEdBQW5CLFVBQW9CLE1BQWdDOzs7OzRCQUNsRCxXQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQWhELFNBQWdELENBQUE7d0JBQ2hELFdBQU8sSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUE7Ozs7S0FDL0I7SUFpQlkscUJBQU0sR0FBbkIsVUFBb0IsTUFBZ0M7Ozs7NEJBQ2xELFdBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBaEQsU0FBZ0QsQ0FBQTt3QkFDaEQsV0FBTyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBQTs7OztLQUMvQjtJQVFZLDBCQUFXLEdBQXhCLFVBQXlCLE1BQXFDOzs7Z0JBQzVELFdBQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFBOzs7S0FDdkQ7SUFjWSxtQ0FBb0IsR0FBakMsVUFBa0MsUUFBZ0I7Ozs7Ozt3QkFDaEQsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7NEJBQ2hDLFVBQVUsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLDJCQUEyQixDQUFDLENBQUM7eUJBQ2hFO3dCQUVpQixXQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsUUFBUSxVQUFBLEVBQUUsQ0FBQyxFQUFBOzt3QkFBMUUsS0FBSyxHQUFLLENBQUEsU0FBZ0UsQ0FBQSxNQUFyRTt3QkFDYixXQUFPLEtBQUssRUFBQTs7OztLQUNiO0lBY1ksc0JBQU8sR0FBcEI7Ozs7Ozt3QkFDVSxXQUFXLEdBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFlBQXJCLENBQXNCO3dCQUN6QyxXQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFBOzt3QkFBM0MsU0FBMkMsQ0FBQTt3QkFDM0MsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFBOzt3QkFBL0MsU0FBK0MsQ0FBQTt3QkFDL0MsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQTs7Ozs7S0FDMUM7SUFLTSw0QkFBYSxHQUFwQjs7UUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUVoQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLCtFQUErRSxDQUFDLENBQUM7WUFDckgsT0FBTztTQUNSO1FBRUQsSUFBTSxlQUFlLFNBQUcsSUFBSSxDQUFDLGNBQWMsMENBQUUsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUE7UUFDeEUsSUFBSSxlQUFlLEVBQUU7WUFDbkIsSUFBTSxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUM7Z0JBQ2hDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7Z0JBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbEIsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO2FBQ25DLENBQUMsQ0FBQTtZQUNGLE9BQU8sVUFBVSxDQUFBO1NBQ2xCO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQTtTQUNaO0lBQ0gsQ0FBQztJQWNZLDRCQUFhLEdBQTFCOzs7Ozs0QkFDMEIsV0FBTSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBQTs7d0JBQW5FLGVBQWUsR0FBRyxTQUFpRDt3QkFDekUsSUFBSSxlQUFlLEVBQUU7NEJBQ2IsVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDO2dDQUNoQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO2dDQUN2QixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0NBQ2xCLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYzs2QkFDbkMsQ0FBQyxDQUFBOzRCQUNGLFdBQU8sVUFBVSxFQUFBO3lCQUNsQjt3QkFFRCxXQUFPLElBQUksRUFBQTs7OztLQUNaO0lBV1ksMEJBQVcsR0FBeEI7OztnQkFDRSxXQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFBOzs7S0FDakQ7SUFrQlksK0JBQWdCLEdBQTdCLFVBQ0UsTUFBMEM7OztnQkFFMUMsV0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBQTs7O0tBQzVEO0lBUVksd0JBQVMsR0FBdEIsVUFDRSxRQUE0Qzs7O2dCQUU1QyxXQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUFBOzs7S0FDOUQ7SUFFWSw2QkFBYyxHQUEzQjs7Ozs7NEJBQzhCLFdBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLEVBQUE7O3dCQUE3RSxtQkFBbUIsR0FBRyxTQUF1RDt3QkFDbkYsV0FBTztnQ0FDTCxXQUFXLEVBQUUsbUJBQW1CO2dDQUNoQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzZCQUN0QixFQUFDOzs7O0tBQ0g7SUFFWSxpQ0FBa0IsR0FBL0IsVUFDRSxNQUE0Qzs7O2dCQUU1QyxXQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFBOzs7S0FDOUQ7SUFFWSxpQ0FBa0IsR0FBL0IsVUFDRSxNQUE0Qzs7Ozs0QkFFNUMsV0FBTSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQTVELFNBQTRELENBQUE7d0JBQzVELFdBQU8sSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUE7Ozs7S0FDL0I7SUFFWSx5QkFBVSxHQUF2QixVQUF3QixNQUFvQzs7Ozs0QkFDMUQsV0FBTSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUFwRCxTQUFvRCxDQUFBO3dCQUNwRCxXQUFPLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFBOzs7O0tBQy9CO0lBRVkscUNBQXNCLEdBQW5DLFVBQ0UsTUFBZ0Q7OztnQkFFaEQsV0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsRUFBQTs7O0tBQ2xFO0lBRVksNEJBQWEsR0FBMUIsVUFBMkIsTUFBdUM7OztnQkFDaEUsV0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUE7OztLQUN6RDtJQUVZLDhCQUFlLEdBQTVCLFVBQTZCLE1BQXlDOzs7Z0JBQ3BFLFdBQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzs7S0FDM0Q7SUFFWSxtQkFBSSxHQUFqQixVQUFrQixNQUE4Qjs7O2dCQUM5QyxXQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQTs7O0tBQ2hEO0lBRVksdUJBQVEsR0FBckIsVUFBc0IsTUFBa0M7OztnQkFDdEQsV0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUE7OztLQUNwRDtJQUVZLDJCQUFZLEdBQXpCOzs7Z0JBQ0UsV0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBQTs7O0tBQ2xEO0lBRVkseUJBQVUsR0FBdkI7OztnQkFDRSxXQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFBOzs7S0FDaEQ7SUFFWSxrQ0FBbUIsR0FBaEMsVUFBaUMsUUFBa0I7Ozs7Ozs7d0JBQ2pELFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFOzs7OzRDQUNuQixXQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQTs7d0NBQXZDLFVBQVUsR0FBRyxTQUEwQjt3Q0FDN0MsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7Ozs7NkJBQ2pDLENBQUMsQ0FBQzt3QkFFZ0IsV0FBTSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUE7O3dCQUF2QyxVQUFVLEdBQUcsU0FBMEI7d0JBQzdDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDOzs7OztLQUNqQztJQUVhLCtCQUFnQixHQUE5Qjs7Ozs7O3dCQUNRLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQzs0QkFDaEMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzs0QkFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNOzRCQUNsQixhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWM7eUJBQ25DLENBQUMsQ0FBQTt3QkFFRixXQUFNLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxFQUFBOzt3QkFBdkMsU0FBdUMsQ0FBQzt3QkFDeEMsV0FBTSxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFBOzt3QkFBL0IsU0FBK0IsQ0FBQzt3QkFDaEMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQzt3QkFDMUMsV0FBTyxVQUFVLEVBQUE7Ozs7S0FDbEI7SUF4YUQ7UUFUQyxvQkFBb0IsQ0FBQztZQUNwQixLQUFLLEVBQUUsU0FBUztZQUNoQixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDViw4Q0FBOEM7Z0JBQzlDLHdCQUF3QjtnQkFDeEIsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7K0NBR0Q7SUFlRDtRQVRDLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxVQUFVO1lBQ2pCLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLDZDQUE2QztnQkFDN0Msd0JBQXdCO2dCQUN4QixpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7Ozs4Q0FHRDtJQWlCRDtRQVRDLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxVQUFVO1lBQ2pCLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLHdDQUF3QztnQkFDeEMsdUJBQXVCO2dCQUN2QixpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7Ozt5Q0FHRDtJQWlCRDtRQVRDLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLHFDQUFxQztnQkFDckMsMkJBQTJCO2dCQUMzQixpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7OztzQ0FHRDtJQWlCRDtRQVRDLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLDhDQUE4QztnQkFDOUMsMkJBQTJCO2dCQUMzQixpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7OzsrQ0FLRDtJQWdDRDtRQVJDLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxVQUFVO1lBQ2pCLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLDRDQUE0QztnQkFDNUMsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7OENBU0Q7SUFpQkQ7UUFUQyxvQkFBb0IsQ0FBQztZQUNwQixLQUFLLEVBQUUsUUFBUTtZQUNmLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLHFCQUFxQjtnQkFDckIsZ0RBQWdEO2dCQUNoRCxpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7OztpREFJRDtJQTJCRDtRQVhDLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLHNCQUFzQjtnQkFDdEIscURBQXFEO2dCQUNyRCx3QkFBd0I7Z0JBQ3hCLDhCQUE4QjtnQkFDOUIsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7c0RBSUQ7SUE0QkQ7UUFUQyxvQkFBb0IsQ0FBQztZQUNwQixLQUFLLEVBQUUsTUFBTTtZQUNiLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLHVCQUF1QjtnQkFDdkIscUNBQXFDO2dCQUNyQyxpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7OztzQ0FJRDtJQXdCRDtRQVJDLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxhQUFhO1lBQ3BCLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLG1EQUFtRDtnQkFDbkQsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7b0RBUUQ7SUFjRDtRQVRDLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxRQUFRO1lBQ2YsUUFBUSxFQUFFO2dCQUNSLFVBQVU7Z0JBQ1Ysc0NBQXNDO2dCQUN0QyxtQ0FBbUM7Z0JBQ25DLGlLQUE2QixrQkFBb0I7YUFDbEQ7U0FDRixDQUFDOzs7O3VDQU1EO0lBcUNEO1FBUkMsb0JBQW9CLENBQUM7WUFDcEIsS0FBSyxFQUFFLFdBQVc7WUFDbEIsUUFBUSxFQUFFO2dCQUNSLFVBQVU7Z0JBQ1YsNENBQTRDO2dCQUM1QyxpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7Ozs2Q0FhRDtJQVdEO1FBVEMsb0JBQW9CLENBQUM7WUFDcEIsS0FBSyxFQUFFLFVBQVU7WUFDakIsUUFBUSxFQUFFO2dCQUNSLFVBQVU7Z0JBQ1YsYUFBYTtnQkFDYiwwQ0FBMEM7Z0JBQzFDLGlLQUE2QixrQkFBb0I7YUFDbEQ7U0FDRixDQUFDOzs7OzJDQUdEO0lBa0JEO1FBVEMsb0JBQW9CLENBQUM7WUFDcEIsS0FBSyxFQUFFLGFBQWE7WUFDcEIsUUFBUSxFQUFFO2dCQUNSLFVBQVU7Z0JBQ1YsK0NBQStDO2dCQUMvQyxxQkFBcUI7Z0JBQ3JCLGlLQUE2QixrQkFBb0I7YUFDbEQ7U0FDRixDQUFDOzs7O2dEQUtEO0lBNEZILFdBQUM7Q0FBQSxBQXJjRCxJQXFjQztBQWtEQyxvQkFBSTtBQWhETixJQUFNLFNBQVMsR0FBd0I7SUFDckMsSUFBSSxFQUFFLGNBQWM7SUFDcEIsU0FBUyxFQUFFLE1BQU07SUFDakIsTUFBTSxFQUFFLFVBQVUsTUFBbUc7UUFBbkcsdUJBQUEsRUFBQSxXQUFpRSxNQUFNLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUU7UUFDbkgsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsMERBQTBELENBQUMsQ0FBQztZQUNoRyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDMUI7UUFDSyxJQUFBLEtBQXVCLElBQUksQ0FBQyxRQUFRLEVBQWxDLE9BQU8sYUFBQSxFQUFFLE9BQU8sYUFBa0IsQ0FBQztRQUUzQyxJQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDcEUsSUFBSSxjQUFjLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNsRSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUE7U0FDbkQ7UUFFSyxJQUFBLEtBQXdDLElBQUksQ0FBQyxNQUFNLEVBQWpELEdBQUcsU0FBQSxFQUFFLFdBQVcsaUJBQUEsRUFBRSxLQUFLLFdBQUEsRUFBRSxRQUFRLGNBQWdCLENBQUM7UUFDMUQsSUFBTSxhQUFhLEdBQUcsSUFBSSxzQkFBYyxDQUFDO1lBQ3ZDLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRTtTQUMxQyxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQTtRQUVsQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksSUFBSSxDQUFDO1lBQzNCLEdBQUcsS0FBQTtZQUNILE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNyQixXQUFXLGFBQUE7WUFDWCxLQUFLLE9BQUE7WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFFakIsT0FBTyxFQUFFLE9BQU87WUFDaEIsUUFBUSxFQUFFLElBQUk7WUFFZCxhQUFhLGVBQUE7U0FDZCxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztDQUNGLENBQUE7QUFFRCxJQUFJO0lBR0YsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQ3hDO0FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRztBQVNmLFNBQWdCLFlBQVksQ0FBQyxHQUEwQztJQUNyRSxJQUFJO1FBQ0YsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2xDO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pCO0FBQ0gsQ0FBQztBQU5ELG9DQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNsb3VkYmFzZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuaW1wb3J0IHsgdXRpbHMsIGNvbnN0YW50cywgaGVscGVycywgZXZlbnRzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNhY2hlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlUmVxdWVzdCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVxdWVzdCc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQXV0aENvbmZpZywgSVVzZXIsIElVc2VySW5mbywgSUxvZ2luU3RhdGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2F1dGgnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNvbXBvbmVudCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY29tcG9uZW50JztcblxuaW1wb3J0IHsgYXV0aE1vZGVscywgQ2xvdWRiYXNlT0F1dGggfSBmcm9tICdAY2xvdWRiYXNlL29hdXRoJ1xuXG5kZWNsYXJlIGNvbnN0IGNsb3VkYmFzZTogSUNsb3VkYmFzZTtcblxuY29uc3QgeyBwcmludFdhcm4sIHRocm93RXJyb3IgfSA9IHV0aWxzO1xuY29uc3QgeyBFUlJPUlMsIENPTU1VTklUWV9TSVRFX1VSTCB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyBjYXRjaEVycm9yc0RlY29yYXRvciB9ID0gaGVscGVycztcbmNvbnN0IHsgQ2xvdWRiYXNlRXZlbnRFbWl0dGVyIH0gPSBldmVudHM7XG5cbmNvbnN0IENPTVBPTkVOVF9OQU1FID0gJ2F1dGgnO1xuXG5jb25zdCBFVkVOVFMgPSB7XG4gIC8vIOeZu+W9leaAgeaUueWPmOWQjuinpuWPkVxuICBMT0dJTl9TVEFURV9DSEFOR0VEOiAnbG9naW5TdGF0ZUNoYW5nZWQnLFxufTtcblxuaW50ZXJmYWNlIFVzZXJJbmZvIHtcbiAgdWlkPzogc3RyaW5nO1xuICBnZW5kZXI/OiBzdHJpbmc7XG4gIGF2YXRhclVybD86IHN0cmluZztcbiAgcGljdHVyZT86IHN0cmluZztcbiAgZW1haWw/OiBzdHJpbmc7XG4gIGVtYWlsX3ZlcmlmaWVkPzogYm9vbGVhbjtcbiAgcGhvbmVfbnVtYmVyPzogc3RyaW5nO1xuICB1c2VybmFtZT86IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgYmlydGhkYXRlPzogc3RyaW5nO1xuICB6b25laW5mbz86IHN0cmluZztcbiAgbG9jYWxlPzogc3RyaW5nO1xuICBzdWI/OiBzdHJpbmc7XG4gIGNyZWF0ZWRfZnJvbT86IHN0cmluZztcbn1cblxuY29uc3QgZXZlbnRCdXMgPSBuZXcgQ2xvdWRiYXNlRXZlbnRFbWl0dGVyKCk7XG5cbmludGVyZmFjZSBJVXNlck9wdGlvbnMge1xuICBjYWNoZTogSUNsb3VkYmFzZUNhY2hlO1xuICAvLyByZXF1ZXN0OiBJQ2xvdWRiYXNlUmVxdWVzdDtcbiAgb2F1dGhJbnN0YW5jZTogQ2xvdWRiYXNlT0F1dGhcbn1cblxuY2xhc3MgVXNlciBpbXBsZW1lbnRzIElVc2VyIHtcbiAgcHVibGljIHVpZD86IHN0cmluZztcbiAgcHVibGljIGdlbmRlcj86IHN0cmluZztcbiAgcHVibGljIGF2YXRhclVybD86IHN0cmluZztcbiAgcHVibGljIHBpY3R1cmU/OiBzdHJpbmc7XG4gIHB1YmxpYyBlbWFpbD86IHN0cmluZztcbiAgcHVibGljIGVtYWlsX3ZlcmlmaWVkPzogYm9vbGVhbjtcbiAgcHVibGljIHBob25lX251bWJlcj86IHN0cmluZztcbiAgcHVibGljIHVzZXJuYW1lPzogc3RyaW5nO1xuICBwdWJsaWMgbmFtZT86IHN0cmluZztcbiAgcHVibGljIHByb3ZpZGVycz86IHtcbiAgICBpZD86IHN0cmluZztcbiAgICBwcm92aWRlcl91c2VyX2lkPzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gIH1bXVxuICBwdWJsaWMgYmlydGhkYXRlPzogc3RyaW5nO1xuICBwdWJsaWMgem9uZWluZm8/OiBzdHJpbmc7XG4gIHB1YmxpYyBsb2NhbGU/OiBzdHJpbmc7XG4gIHB1YmxpYyBzdWI/OiBzdHJpbmc7XG4gIHB1YmxpYyBjcmVhdGVkX2Zyb20/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfY2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcbiAgcHJpdmF0ZSBfb2F1dGhJbnN0YW5jZTogQ2xvdWRiYXNlT0F1dGggLy8gQ2xvdWRiYXNlT0F1dGgg57G75Z6LXG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogSVVzZXJPcHRpb25zKSB7XG4gICAgY29uc3QgeyBjYWNoZSwgb2F1dGhJbnN0YW5jZSB9ID0gb3B0aW9ucztcbiAgICB0aGlzLl9jYWNoZSA9IGNhY2hlO1xuICAgIHRoaXMuX29hdXRoSW5zdGFuY2UgPSBvYXV0aEluc3RhbmNlXG5cbiAgICB0aGlzLl9zZXRVc2VySW5mbygpO1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnlKjmiLfkv6Hmga8t5ZCM5q2lXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hlY2tMb2NhbEluZm8oKSB7XG4gICAgdGhpcy51aWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd1aWQnKSBhcyBzdHJpbmc7XG4gICAgdGhpcy5nZW5kZXIgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdnZW5kZXInKSBhcyBzdHJpbmc7XG4gICAgdGhpcy5waWN0dXJlID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncGljdHVyZScpIGFzIHN0cmluZztcbiAgICB0aGlzLmF2YXRhclVybCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2F2YXRhclVybCcpIGFzIHN0cmluZztcbiAgICB0aGlzLmVtYWlsID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnZW1haWwnKSBhcyBzdHJpbmc7XG4gICAgdGhpcy5lbWFpbF92ZXJpZmllZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2VtYWlsX3ZlcmlmaWVkJykgYXMgYm9vbGVhbjtcbiAgICB0aGlzLnBob25lX251bWJlciA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3Bob25lX251bWJlcicpIGFzIHN0cmluZ1xuICAgIHRoaXMudXNlcm5hbWUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd1c2VybmFtZScpIGFzIHN0cmluZ1xuICAgIHRoaXMubmFtZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ25hbWUnKSBhcyBzdHJpbmdcbiAgICB0aGlzLmJpcnRoZGF0ZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2JpcnRoZGF0ZScpIGFzIHN0cmluZ1xuICAgIHRoaXMuem9uZWluZm8gPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd6b25laW5mbycpIGFzIHN0cmluZ1xuICAgIHRoaXMubG9jYWxlID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnbG9jYWxlJykgYXMgc3RyaW5nXG4gICAgdGhpcy5zdWIgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdzdWInKSBhcyBzdHJpbmdcbiAgICB0aGlzLmNyZWF0ZWRfZnJvbSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2NyZWF0ZWRfZnJvbScpIGFzIHN0cmluZ1xuICAgIHRoaXMucHJvdmlkZXJzID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncHJvdmlkZXJzJykgYXMgYW55XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluacrOWcsOeUqOaIt+S/oeaBry3lvILmraVcbiAgICovXG4gIHB1YmxpYyBhc3luYyBjaGVja0xvY2FsSW5mb0FzeW5jKCkge1xuICAgIHRoaXMudWlkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd1aWQnKTtcbiAgICB0aGlzLmdlbmRlciA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnZ2VuZGVyJyk7XG4gICAgdGhpcy5waWN0dXJlID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncGljdHVyZScpIGFzIHN0cmluZztcbiAgICB0aGlzLmF2YXRhclVybCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnYXZhdGFyVXJsJyk7XG4gICAgdGhpcy5lbWFpbCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnZW1haWwnKTtcbiAgICB0aGlzLmVtYWlsX3ZlcmlmaWVkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnZW1haWxfdmVyaWZpZWQnKSBhcyBib29sZWFuO1xuICAgIHRoaXMucGhvbmVfbnVtYmVyID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncGhvbmVfbnVtYmVyJykgYXMgc3RyaW5nXG4gICAgdGhpcy51c2VybmFtZSA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygndXNlcm5hbWUnKVxuICAgIHRoaXMubmFtZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ25hbWUnKSBhcyBzdHJpbmdcbiAgICB0aGlzLmJpcnRoZGF0ZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2JpcnRoZGF0ZScpIGFzIHN0cmluZ1xuICAgIHRoaXMuem9uZWluZm8gPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd6b25laW5mbycpIGFzIHN0cmluZ1xuICAgIHRoaXMubG9jYWxlID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnbG9jYWxlJykgYXMgc3RyaW5nXG4gICAgdGhpcy5zdWIgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdzdWInKSBhcyBzdHJpbmdcbiAgICB0aGlzLmNyZWF0ZWRfZnJvbSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2NyZWF0ZWRfZnJvbScpIGFzIHN0cmluZ1xuICAgIHRoaXMucHJvdmlkZXJzID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncHJvdmlkZXJzJykgYXMgYW55XG4gIH1cblxuXG4gIC8qKlxuICAgKiDmm7TmlrDnlKjmiLfkv6Hmga9cbiAgICogQHBhcmFtIHVzZXJJbmZvXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw55So5oi35L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDnlKjmiLfkv6Hmga/kuK3mmK/lkKbljIXlkKvpnZ7ms5XlgLwnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUodXNlckluZm86IGF1dGhNb2RlbHMuVXNlclByb2ZpbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBjb25zdCB7IG5hbWUsIGdlbmRlciwgYXZhdGFyVXJsLCBwcm92aW5jZSwgY291bnRyeSwgY2l0eSB9ID0gdXNlckluZm87XG4gICAgY29uc3QgbmV3VXNlckluZm8gPSBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuc2V0VXNlclByb2ZpbGUoeyAuLi51c2VySW5mbyB9KVxuXG4gICAgdGhpcy5fc2V0TG9jYWxVc2VySW5mbyhuZXdVc2VySW5mbyk7XG4gIH1cbiAgLyoqXG4gICAqIOabtOaWsOWvhueggVxuICAgKiBAcGFyYW0gbmV3UGFzc3dvcmRcbiAgICogQHBhcmFtIG9sZFBhc3N3b3JkXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw5a+G56CB5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlUGFzc3dvcmQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMyAtIOaWsOWvhueggeS4reaYr+WQpuWMheWQq+mdnuazleWtl+espicsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIHVwZGF0ZVBhc3N3b3JkKG5ld1Bhc3N3b3JkOiBzdHJpbmcsIG9sZFBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnVwZGF0ZVBhc3N3b3JkQnlPbGQoe1xuICAgICAgb2xkX3Bhc3N3b3JkOiBvbGRQYXNzd29yZCxcbiAgICAgIG5ld19wYXNzd29yZDogbmV3UGFzc3dvcmRcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIOabtOaWsOeUqOaIt+WQjVxuICAgKiBAcGFyYW0gdXNlcm5hbWVcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmm7TmlrDnlKjmiLflkI3lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci51cGRhdGVVc2VybmFtZSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG55So5oi35ZCN5a+G56CB55m75b2VJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgdXBkYXRlVXNlcm5hbWUodXNlcm5hbWU6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgdXNlcm5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ3VzZXJuYW1lIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy51cGRhdGUoe1xuICAgICAgdXNlcm5hbWVcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIOWIt+aWsOacrOWcsOeUqOaIt+S/oeaBr+OAguW9k+eUqOaIt+WcqOWFtuS7luWuouaIt+err+abtOaWsOeUqOaIt+S/oeaBr+S5i+WQju+8jOWPr+S7peiwg+eUqOatpOaOpeWPo+WQjOatpeabtOaWsOS5i+WQjueahOS/oeaBr+OAglxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+WIt+aWsOacrOWcsOeUqOaIt+S/oeaBr+Wksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnJlZnJlc2goKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyByZWZyZXNoKCk6IFByb21pc2U8SVVzZXJJbmZvPiB7XG4gICAgY29uc3QgbmV3VXNlckluZm8gPSBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuZ2V0VXNlckluZm8oKVxuICAgIHRoaXMuX3NldExvY2FsVXNlckluZm8obmV3VXNlckluZm8pO1xuICAgIHJldHVybiBuZXdVc2VySW5mbztcbiAgfVxuXG4gIHByaXZhdGUgX2dldExvY2FsVXNlckluZm8oa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCBib29sZWFuIHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodXNlckluZm9LZXkpO1xuICAgIHJldHVybiB1c2VySW5mb1trZXldO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfZ2V0TG9jYWxVc2VySW5mb0FzeW5jKGtleTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyh1c2VySW5mb0tleSk7XG4gICAgcmV0dXJuIHVzZXJJbmZvW2tleV07XG4gIH1cblxuICBwcml2YXRlIF9zZXRVc2VySW5mbygpIHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodXNlckluZm9LZXkpO1xuICAgIFtcbiAgICAgICd1aWQnLFxuICAgICAgJ2VtYWlsJyxcbiAgICAgICduYW1lJyxcbiAgICAgICdnZW5kZXInLFxuICAgICAgJ3BpY3R1cmUnLFxuICAgICAgJ2F2YXRhclVybCcsXG4gICAgICAncGhvbmUnLFxuICAgICAgJ2VtYWlsX3ZlcmlmaWVkJyxcbiAgICAgICdwaG9uZV9udW1iZXInLFxuICAgICAgJ2JpcnRoZGF0ZScsXG4gICAgICAnem9uZWluZm8nLFxuICAgICAgJ2xvY2FsZScsXG4gICAgICAnc3ViJyxcbiAgICAgICdjcmVhdGVkX2Zyb20nLFxuICAgICAgJ3Byb3ZpZGVycycsXG4gICAgICAndXNlcm5hbWUnXG4gICAgXS5mb3JFYWNoKGluZm9LZXkgPT4ge1xuICAgICAgdGhpc1tpbmZvS2V5XSA9IHVzZXJJbmZvW2luZm9LZXldO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0TG9jYWxVc2VySW5mbyh1c2VySW5mbzogYW55KSB7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICB0aGlzLl9jYWNoZS5zZXRTdG9yZSh1c2VySW5mb0tleSwgdXNlckluZm8pO1xuICAgIHRoaXMuX3NldFVzZXJJbmZvKCk7XG4gIH1cbn1cbmludGVyZmFjZSBJTG9naW5TdGF0ZU9wdGlvbnMgZXh0ZW5kcyBJVXNlck9wdGlvbnMge1xuICBlbnZJZDogc3RyaW5nO1xufVxuZXhwb3J0IGNsYXNzIExvZ2luU3RhdGUgaW1wbGVtZW50cyBJTG9naW5TdGF0ZSB7XG4gIHB1YmxpYyB1c2VyOiBJVXNlcjtcbiAgcHVibGljIG9hdXRoTG9naW5TdGF0ZTogYW55XG5cbiAgcHJpdmF0ZSBfb2F1dGhJbnN0YW5jZTogQ2xvdWRiYXNlT0F1dGhcbiAgcHJpdmF0ZSBfY2FjaGU6IElDbG91ZGJhc2VDYWNoZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJTG9naW5TdGF0ZU9wdGlvbnMpIHtcbiAgICBjb25zdCB7IGVudklkLCBjYWNoZSwgb2F1dGhJbnN0YW5jZSB9ID0gb3B0aW9ucztcbiAgICBpZiAoIWVudklkKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ2VudklkIGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuICAgIHRoaXMuX2NhY2hlID0gY2FjaGU7XG4gICAgdGhpcy5fb2F1dGhJbnN0YW5jZSA9IG9hdXRoSW5zdGFuY2VcblxuICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKHtcbiAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgIG9hdXRoSW5zdGFuY2VcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjaGVja0xvY2FsU3RhdGUoKSB7XG4gICAgdGhpcy5vYXV0aExvZ2luU3RhdGUgPSB0aGlzLl9vYXV0aEluc3RhbmNlPy5hdXRoQXBpLmhhc0xvZ2luU3RhdGVTeW5jKClcbiAgICB0aGlzLnVzZXIuY2hlY2tMb2NhbEluZm8oKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjaGVja0xvY2FsU3RhdGVBc3luYygpIHtcbiAgICBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlPy5hdXRoQXBpLmdldExvZ2luU3RhdGUoKVxuICAgIGF3YWl0IHRoaXMudXNlci5jaGVja0xvY2FsSW5mb0FzeW5jKCk7XG4gIH1cbn1cblxuY2xhc3MgQXV0aCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2NvbmZpZzogSUNsb3VkYmFzZUF1dGhDb25maWc7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2NhY2hlOiBJQ2xvdWRiYXNlQ2FjaGVcbiAgLy8gcHJpdmF0ZSByZWFkb25seSBfcmVxdWVzdDogSUNsb3VkYmFzZVJlcXVlc3Q7XG5cbiAgcHJpdmF0ZSBfb2F1dGhJbnN0YW5jZTogQ2xvdWRiYXNlT0F1dGhcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IElDbG91ZGJhc2VBdXRoQ29uZmlnICYgeyBjYWNoZTogSUNsb3VkYmFzZUNhY2hlLCByZXF1ZXN0PzogSUNsb3VkYmFzZVJlcXVlc3QsIHJ1bnRpbWU/OiBzdHJpbmcgfSkge1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLl9jYWNoZSA9IGNvbmZpZy5jYWNoZTtcbiAgICAvLyB0aGlzLl9yZXF1ZXN0ID0gY29uZmlnLnJlcXVlc3Q7XG4gICAgdGhpcy5fb2F1dGhJbnN0YW5jZSA9IGNvbmZpZy5vYXV0aEluc3RhbmNlXG4gIH1cblxuICAvKipcbiAgKiDnu5HlrprmiYvmnLrlj7dcbiAgKiBAcGFyYW0gcGhvbmVOdW1iZXJcbiAgKiBAcGFyYW0gcGhvbmVDb2RlXG4gICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnu5HlrprmiYvmnLrlj7flpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmJpbmRQaG9uZU51bWJlcigpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG55+t5L+h6aqM6K+B56CB55m75b2VJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgYmluZFBob25lTnVtYmVyKHBhcmFtczogYXV0aE1vZGVscy5CaW5kUGhvbmVSZXF1ZXN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5iaW5kUGhvbmUocGFyYW1zKVxuICB9XG5cbiAgLyoqXG4gICAqIOino+e7keS4ieaWuee7keWumlxuICAgKiBAcGFyYW0gbG9naW5UeXBlXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6Kej6Zmk5LiJ5pa557uR5a6a5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS51bmJpbmRQcm92aWRlcigpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN6LSm5oi35piv5ZCm5bey57uP5LiO5q2k55m75b2V5pa55byP6Kej57uRJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgdW5iaW5kUHJvdmlkZXIocGFyYW1zOiBhdXRoTW9kZWxzLlVuYmluZFByb3ZpZGVyUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkudW5iaW5kUHJvdmlkZXIocGFyYW1zKVxuICB9XG5cbiAgLyoqXG4gKiDmm7TmlrDpgq7nrrHlnLDlnYBcbiAqIEBwYXJhbSBlbWFpbFxuICogQHBhcmFtIHN1ZG9fdG9rZW5cbiAqIEBwYXJhbSB2ZXJpZmljYXRpb25fdG9rZW5cbiAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn57uR5a6a6YKu566x5Zyw5Z2A5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5iaW5kRW1haWwoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6humCrueuseWvhueggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGJpbmRFbWFpbChwYXJhbXM6IGF1dGhNb2RlbHMuQmluZEVtYWlsUmVxdWVzdCkge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuYmluZEVtYWlsKHBhcmFtcylcbiAgfVxuXG4gIC8qKlxuICAgKiB2ZXJpZnlcbiAgICogQHBhcmFtIHthdXRoTW9kZWxzLlZlcmlmeVJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhdXRoTW9kZWxzLlZlcmlmeVJlc3BvbnNlPn1cbiAgICogQG1lbWJlcm9mIFVzZXJcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfpqozor4HnoIHpqozor4HlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLnZlcmlmeSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG5omL5py66aqM6K+B56CBL+mCrueuseeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHZlcmlmeShwYXJhbXM6IGF1dGhNb2RlbHMuVmVyaWZ5UmVxdWVzdCk6IFByb21pc2U8YXV0aE1vZGVscy5WZXJpZnlSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkudmVyaWZ5KHBhcmFtcylcbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5bpqozor4HnoIFcbiAgICogQHBhcmFtIHthdXRoTW9kZWxzLkdldFZlcmlmaWNhdGlvblJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhdXRoTW9kZWxzLkdldFZlcmlmaWNhdGlvblJlc3BvbnNlPn1cbiAgICogQG1lbWJlcm9mIFVzZXJcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5bpqozor4HnoIHlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmdldFZlcmlmaWNhdGlvbigpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG5omL5py66aqM6K+B56CBL+mCrueuseeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGdldFZlcmlmaWNhdGlvbihcbiAgICBwYXJhbXM6IGF1dGhNb2RlbHMuR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxhdXRoTW9kZWxzLkdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5nZXRWZXJpZmljYXRpb24ocGFyYW1zKVxuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluW9k+WJjeeZu+W9leeahOeUqOaIt+S/oeaBry3lkIzmraVcbiAgICovXG4gIGdldCBjdXJyZW50VXNlcigpIHtcbiAgICBpZiAodGhpcy5fY2FjaGUubW9kZSA9PT0gJ2FzeW5jJykge1xuICAgICAgLy8gYXN5bmMgc3RvcmFnZeeahOW5s+WPsOiwg+eUqOatpEFQSeaPkOekulxuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwgJ2N1cnJlbnQgcGxhdGZvcm1cXCdzIHN0b3JhZ2UgaXMgYXN5bmNocm9ub3VzLCBwbGVhc2UgdXNlIGdldEN1cnJlbnRVc2VyIGluc3RlZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsb2dpblN0YXRlID0gdGhpcy5oYXNMb2dpblN0YXRlKCk7XG5cbiAgICBpZiAobG9naW5TdGF0ZSkge1xuICAgICAgcmV0dXJuIGxvZ2luU3RhdGUudXNlciB8fCBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6I635Y+W5b2T5YmN55m75b2V55qE55So5oi35L+h5oGvLeW8guatpVxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iOt+WPlueUqOaIt+S/oeaBr+Wksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuZ2V0Q3VycmVuVXNlcigpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGdldEN1cnJlbnRVc2VyKCkge1xuICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBhd2FpdCB0aGlzLmdldExvZ2luU3RhdGUoKTtcbiAgICBpZiAobG9naW5TdGF0ZSkge1xuICAgICAgYXdhaXQgbG9naW5TdGF0ZS51c2VyLmNoZWNrTG9jYWxJbmZvQXN5bmMoKTtcbiAgICAgIHJldHVybiBsb2dpblN0YXRlLnVzZXIgfHwgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICog5Yy/5ZCN55m75b2VXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPExvZ2luU3RhdGU+fVxuICAgKiBAbWVtYmVyb2YgQXV0aFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+WMv+WQjeeZu+W9leWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOWQr+S6huWMv+WQjeeZu+W9lScsXG4gICAgICAnICAyIC0g6LCD55SoIGF1dGgoKS5zaWduSW5Bbm9ueW1vdXNseSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHNpZ25JbkFub255bW91c2x5KCk6IFByb21pc2U8TG9naW5TdGF0ZT4ge1xuICAgIGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5zaWduSW5Bbm9ueW1vdXNseSgpXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlTG9naW5TdGF0ZSgpXG4gIH1cblxuICAvKipcbiAgICog6K6+572u6I635Y+W6Ieq5a6a5LmJ55m75b2VIHRpY2tldCDlh73mlbBcbiAgICogQHBhcmFtIHthdXRoTW9kZWxzLkdldEN1c3RvbVNpZ25UaWNrZXRGbn0gZ2V0VGlja0ZuXG4gICAqIEBtZW1iZXJvZiBBdXRoXG4gICAqL1xuICBwdWJsaWMgc2V0Q3VzdG9tU2lnbkZ1bmMoZ2V0VGlja0ZuOiBhdXRoTW9kZWxzLkdldEN1c3RvbVNpZ25UaWNrZXRGbik6IHZvaWQge1xuICAgIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5zZXRDdXN0b21TaWduRnVuYyhnZXRUaWNrRm4pXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8TG9naW5TdGF0ZT59XG4gICAqIEBtZW1iZXJvZiBBdXRoXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6Ieq5a6a5LmJ55m75b2V5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g5b2T5YmN546v5aKD5piv5ZCm5byA5ZCv5LqG6Ieq5a6a5LmJ55m75b2VJyxcbiAgICAgICcgIDIgLSDosIPnlKggYXV0aCgpLnNpZ25JbldpdGhDdXN0b21UaWNrZXQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMyAtIHRpY2tldCDmmK/lkKblvZLlsZ7kuo7lvZPliY3njq/looMnLFxuICAgICAgJyAgNCAtIOWIm+W7uiB0aWNrZXQg55qE6Ieq5a6a5LmJ55m75b2V56eB6ZKl5piv5ZCm6L+H5pyfJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aEN1c3RvbVRpY2tldCgpOiBQcm9taXNlPExvZ2luU3RhdGU+IHtcbiAgICBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuc2lnbkluV2l0aEN1c3RvbVRpY2tldCgpXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlTG9naW5TdGF0ZSgpXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHthdXRoTW9kZWxzLlNpZ25JblJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxMb2dpblN0YXRlPn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduSW4ocGFyYW1zOiBhdXRoTW9kZWxzLlNpZ25JblJlcXVlc3QpOiBQcm9taXNlPExvZ2luU3RhdGU+IHtcbiAgICBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuc2lnbkluKHBhcmFtcylcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVMb2dpblN0YXRlKClcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge2F1dGhNb2RlbHMuU2lnblVwUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPExvZ2luU3RhdGU+fVxuICAgKiBAbWVtYmVyb2YgQXV0aFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+azqOWGjOWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOWQr+S6huaMh+WumueZu+W9leaWueW8jycsXG4gICAgICAnICAyIC0g6LCD55SoIGF1dGgoKS5zaWduVXAoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBzaWduVXAocGFyYW1zOiBhdXRoTW9kZWxzLlNpZ25VcFJlcXVlc3QpOiBQcm9taXNlPExvZ2luU3RhdGU+IHtcbiAgICBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuc2lnblVwKHBhcmFtcylcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVMb2dpblN0YXRlKClcbiAgfVxuXG4gIC8qKlxuICAgKiDorr7nva7lr4bnoIFcbiAgICogQHBhcmFtIHthdXRoTW9kZWxzLlNldFBhc3N3b3JkUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKiBAbWVtYmVyb2YgQXV0aFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNldFBhc3N3b3JkKHBhcmFtczogYXV0aE1vZGVscy5TZXRQYXNzd29yZFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnNldFBhc3N3b3JkKHBhcmFtcylcbiAgfVxuXG4gIC8qKlxuICAgKiDmo4DmtYvnlKjmiLflkI3mmK/lkKblt7Lnu4/ljaDnlKhcbiAgICogQHBhcmFtIHVzZXJuYW1lXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W55So5oi35piv5ZCm6KKr5Y2g55So5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5pc1VzZXJuYW1lUmVnaXN0ZXJlZCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGlzVXNlcm5hbWVSZWdpc3RlcmVkKHVzZXJuYW1lOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAodHlwZW9mIHVzZXJuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3dFcnJvcihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsICd1c2VybmFtZSBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBleGlzdCB9ID0gYXdhaXQgdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLmNoZWNrSWZVc2VyRXhpc3QoeyB1c2VybmFtZSB9KVxuICAgIHJldHVybiBleGlzdFxuICB9XG5cbiAgLyoqXG4gICAqIOeZu+WHulxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+eUqOaIt+eZu+WHuuWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuc2lnbk91dCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN55So5oi35piv5ZCm5Li65Yy/5ZCN55m75b2V77yI5Yy/5ZCN55m75b2V5LiN5pSv5oyBc2lnbk91dO+8iScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHNpZ25PdXQoKSB7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuc2lnbk91dCgpXG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyh1c2VySW5mb0tleSlcbiAgICBldmVudEJ1cy5maXJlKEVWRU5UUy5MT0dJTl9TVEFURV9DSEFOR0VEKVxuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluacrOWcsOeZu+W9leaAgS3lkIzmraVcbiAgICovXG4gIHB1YmxpYyBoYXNMb2dpblN0YXRlKCk6IExvZ2luU3RhdGUgfCBudWxsIHtcbiAgICBpZiAodGhpcy5fY2FjaGUubW9kZSA9PT0gJ2FzeW5jJykge1xuICAgICAgLy8gYXN5bmMgc3RvcmFnZeeahOW5s+WPsOiwg+eUqOatpEFQSeaPkOekulxuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwgJ2N1cnJlbnQgcGxhdGZvcm1cXCdzIHN0b3JhZ2UgaXMgYXN5bmNocm9ub3VzLCBwbGVhc2UgdXNlIGdldExvZ2luU3RhdGUgaW5zdGVlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9hdXRoTG9naW5TdGF0ZSA9IHRoaXMuX29hdXRoSW5zdGFuY2U/LmF1dGhBcGkuaGFzTG9naW5TdGF0ZVN5bmMoKVxuICAgIGlmIChvYXV0aExvZ2luU3RhdGUpIHtcbiAgICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBuZXcgTG9naW5TdGF0ZSh7XG4gICAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIG9hdXRoSW5zdGFuY2U6IHRoaXMuX29hdXRoSW5zdGFuY2UsXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGxvZ2luU3RhdGVcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6I635Y+W5pys5Zyw55m75b2V5oCBLeW8guatpVxuICAgKiDmraRBUEnkuLrlhbzlrrnlvILmraVzdG9yYWdl55qE5bmz5Y+wXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W5pys5Zyw55m75b2V5oCB5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5nZXRMb2dpblN0YXRlKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0TG9naW5TdGF0ZSgpIHtcbiAgICBjb25zdCBvYXV0aExvZ2luU3RhdGUgPSBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuZ2V0TG9naW5TdGF0ZSgpXG4gICAgaWYgKG9hdXRoTG9naW5TdGF0ZSkge1xuICAgICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgb2F1dGhJbnN0YW5jZTogdGhpcy5fb2F1dGhJbnN0YW5jZSxcbiAgICAgIH0pXG4gICAgICByZXR1cm4gbG9naW5TdGF0ZVxuICAgIH1cblxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W55So5oi35L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g5piv5ZCm5bey55m75b2VJyxcbiAgICAgICcgIDIgLSDosIPnlKggYXV0aCgpLmdldFVzZXJJbmZvKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0VXNlckluZm8oKTogUHJvbWlzZTxJVXNlckluZm8+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLmdldFVzZXJJbmZvKClcbiAgfVxuXG5cbiAgLyoqXG4gICAqIOS4uuW3suaciei0puaIt+e7keesrOS4ieaWuei0puaIt1xuICAgKiBAcGFyYW0ge2F1dGhNb2RlbHMuQmluZFdpdGhQcm92aWRlclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnu5HlrprnrKzkuInmlrnnmbvlvZXmlrnlvI/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmJpbmRXaXRoUHJvdmlkZXIoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOatpOi0puaIt+aYr+WQpuW3sue7j+e7keWumuatpOesrOS4ieaWuScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGJpbmRXaXRoUHJvdmlkZXIoXG4gICAgcGFyYW1zOiBhdXRoTW9kZWxzLkJpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLmJpbmRXaXRoUHJvdmlkZXIocGFyYW1zKVxuICB9XG5cbiAgLyoqXG4gICAqIOafpeivoueUqOaIt1xuICAgKiBAcGFyYW0ge2F1dGhNb2RlbHMuUXVlcnlVc2VyUHJvZmlsZVJlcXVlc3R9IGFwcGVuZGVkX3BhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhdXRoTW9kZWxzLlVzZXJQcm9maWxlPn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIHB1YmxpYyBhc3luYyBxdWVyeVVzZXIoXG4gICAgcXVlcnlPYmo6IGF1dGhNb2RlbHMuUXVlcnlVc2VyUHJvZmlsZVJlcXVlc3QsXG4gICk6IFByb21pc2U8YXV0aE1vZGVscy5RdWVyeVVzZXJQcm9maWxlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnF1ZXJ5VXNlclByb2ZpbGUocXVlcnlPYmopXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0QWNjZXNzVG9rZW4oKSB7XG4gICAgY29uc3Qgb2F1dGhBY2Nlc3NUb2tlblJlcyA9IGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2Uub2F1dGgyY2xpZW50LmdldEFjY2Vzc1Rva2VuKClcbiAgICByZXR1cm4ge1xuICAgICAgYWNjZXNzVG9rZW46IG9hdXRoQWNjZXNzVG9rZW5SZXMsXG4gICAgICBlbnY6IHRoaXMuX2NvbmZpZy5lbnZcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdyYW50UHJvdmlkZXJUb2tlbihcbiAgICBwYXJhbXM6IGF1dGhNb2RlbHMuR3JhbnRQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxhdXRoTW9kZWxzLkdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5ncmFudFByb3ZpZGVyVG9rZW4ocGFyYW1zKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNpZ25JbldpdGhQcm92aWRlcihcbiAgICBwYXJhbXM6IGF1dGhNb2RlbHMuU2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxMb2dpblN0YXRlPiB7XG4gICAgYXdhaXQgdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnNpZ25JbldpdGhQcm92aWRlcihwYXJhbXMpXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlTG9naW5TdGF0ZSgpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ3JhbnRUb2tlbihwYXJhbXM6IGF1dGhNb2RlbHMuR3JhbnRUb2tlblJlcXVlc3QpOiBQcm9taXNlPExvZ2luU3RhdGU+IHtcbiAgICBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuZ3JhbnRUb2tlbihwYXJhbXMpXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlTG9naW5TdGF0ZSgpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2VuUHJvdmlkZXJSZWRpcmVjdFVyaShcbiAgICBwYXJhbXM6IGF1dGhNb2RlbHMuR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlcXVlc3QsXG4gICk6IFByb21pc2U8YXV0aE1vZGVscy5HZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLmdlblByb3ZpZGVyUmVkaXJlY3RVcmkocGFyYW1zKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlc2V0UGFzc3dvcmQocGFyYW1zOiBhdXRoTW9kZWxzLlJlc2V0UGFzc3dvcmRSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5yZXNldFBhc3N3b3JkKHBhcmFtcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXZpY2VBdXRob3JpemUocGFyYW1zOiBhdXRoTW9kZWxzLkRldmljZUF1dGhvcml6ZVJlcXVlc3QpOiBQcm9taXNlPGF1dGhNb2RlbHMuRGV2aWNlQXV0aG9yaXplUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLmRldmljZUF1dGhvcml6ZShwYXJhbXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc3VkbyhwYXJhbXM6IGF1dGhNb2RlbHMuU3Vkb1JlcXVlc3QpOiBQcm9taXNlPGF1dGhNb2RlbHMuU3Vkb1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5zdWRvKHBhcmFtcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZWxldGVNZShwYXJhbXM6IGF1dGhNb2RlbHMuV2l0aFN1ZG9SZXF1ZXN0KTogUHJvbWlzZTxhdXRoTW9kZWxzLlVzZXJQcm9maWxlPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5kZWxldGVNZShwYXJhbXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0UHJvdmlkZXJzKCk6IFByb21pc2U8YXV0aE1vZGVscy5Vc2VyUHJvZmlsZVByb3ZpZGVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5nZXRQcm92aWRlcnMoKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGxvZ2luU2NvcGUoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLmxvZ2luU2NvcGUoKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uTG9naW5TdGF0ZUNoYW5nZWQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgZXZlbnRCdXMub24oRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBhd2FpdCB0aGlzLmdldExvZ2luU3RhdGUoKTtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgbG9naW5TdGF0ZSk7XG4gICAgfSk7XG4gICAgLy8g56uL5Yi75omn6KGM5LiA5qyh5Zue6LCDXG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IGF3YWl0IHRoaXMuZ2V0TG9naW5TdGF0ZSgpO1xuICAgIGNhbGxiYWNrLmNhbGwodGhpcywgbG9naW5TdGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGNyZWF0ZUxvZ2luU3RhdGUoKTogUHJvbWlzZTxMb2dpblN0YXRlPiB7XG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgb2F1dGhJbnN0YW5jZTogdGhpcy5fb2F1dGhJbnN0YW5jZSxcbiAgICB9KVxuXG4gICAgYXdhaXQgbG9naW5TdGF0ZS5jaGVja0xvY2FsU3RhdGVBc3luYygpO1xuICAgIGF3YWl0IGxvZ2luU3RhdGUudXNlci5yZWZyZXNoKCk7XG4gICAgZXZlbnRCdXMuZmlyZShFVkVOVFMuTE9HSU5fU1RBVEVfQ0hBTkdFRCk7XG4gICAgcmV0dXJuIGxvZ2luU3RhdGVcbiAgfVxufVxuXG5jb25zdCBjb21wb25lbnQ6IElDbG91ZGJhc2VDb21wb25lbnQgPSB7XG4gIG5hbWU6IENPTVBPTkVOVF9OQU1FLFxuICBuYW1lc3BhY2U6ICdhdXRoJyxcbiAgZW50aXR5OiBmdW5jdGlvbiAoY29uZmlnOiBQaWNrPElDbG91ZGJhc2VBdXRoQ29uZmlnLCAncmVnaW9uJyB8ICdwZXJzaXN0ZW5jZSc+ID0geyByZWdpb246ICcnLCBwZXJzaXN0ZW5jZTogJ2xvY2FsJyB9KSB7XG4gICAgaWYgKHRoaXMuYXV0aEluc3RhbmNlKSB7XG4gICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLCAnZXZlcnkgY2xvdWRiYXNlIGluc3RhbmNlIHNob3VsZCBoYXMgb25seSBvbmUgYXV0aCBvYmplY3QnKTtcbiAgICAgIHJldHVybiB0aGlzLmF1dGhJbnN0YW5jZTtcbiAgICB9XG4gICAgY29uc3QgeyBhZGFwdGVyLCBydW50aW1lIH0gPSB0aGlzLnBsYXRmb3JtO1xuICAgIC8vIOWmguS4jeaYjuehruaMh+WumnBlcnNpc3RlbmNl5YiZ5LyY5YWI5Y+W5ZCE5bmz5Y+wYWRhcHRlcummlumAie+8jOWFtuasoWxvY2FsU3RvcmFnZVxuICAgIGNvbnN0IG5ld1BlcnNpc3RlbmNlID0gY29uZmlnLnBlcnNpc3RlbmNlIHx8IGFkYXB0ZXIucHJpbWFyeVN0b3JhZ2U7XG4gICAgaWYgKG5ld1BlcnNpc3RlbmNlICYmIChuZXdQZXJzaXN0ZW5jZSAhPT0gdGhpcy5jb25maWcucGVyc2lzdGVuY2UpKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbmZpZyh7IHBlcnNpc3RlbmNlOiBuZXdQZXJzaXN0ZW5jZSB9KVxuICAgIH1cblxuICAgIGNvbnN0IHsgZW52LCBwZXJzaXN0ZW5jZSwgZGVidWcsIGNsaWVudElkIH0gPSB0aGlzLmNvbmZpZztcbiAgICBjb25zdCBvYXV0aEluc3RhbmNlID0gbmV3IENsb3VkYmFzZU9BdXRoKHtcbiAgICAgIGNsaWVudElkOiBjbGllbnRJZCxcbiAgICAgIGFwaU9yaWdpbjogdGhpcy5yZXF1ZXN0LmdldEJhc2VFbmRQb2ludCgpLFxuICAgIH0pXG5cbiAgICB0aGlzLm9hdXRoSW5zdGFuY2UgPSBvYXV0aEluc3RhbmNlXG5cbiAgICB0aGlzLmF1dGhJbnN0YW5jZSA9IG5ldyBBdXRoKHtcbiAgICAgIGVudixcbiAgICAgIHJlZ2lvbjogY29uZmlnLnJlZ2lvbixcbiAgICAgIHBlcnNpc3RlbmNlLFxuICAgICAgZGVidWcsXG4gICAgICBjYWNoZTogdGhpcy5jYWNoZSxcbiAgICAgIC8vIHJlcXVlc3Q6IHRoaXMucmVxdWVzdCxcbiAgICAgIHJ1bnRpbWU6IHJ1bnRpbWUsXG4gICAgICBfZnJvbUFwcDogdGhpcyxcbiAgICAgIC8vIG9hdXRoSW5zdGFuY2U6IHRoaXMub2F1dGhJbnN0YW5jZSB8fCAodGhpcyBhcyBhbnkpLm9hdXRoKClcbiAgICAgIG9hdXRoSW5zdGFuY2VcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmF1dGhJbnN0YW5jZTtcbiAgfVxufVxuXG50cnkge1xuICAvLyDlsJ3or5Xoh6rliqjms6jlhozoh7PlhajlsYDlj5jph49jbG91ZGJhc2VcbiAgLy8g5q2k6KGM5Li65Y+q5Zyo5rWP6KeI5Zmo546v5aKD5LiL5pyJ5pWIXG4gIGNsb3VkYmFzZS5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xufSBjYXRjaCAoZSkgeyB9XG5cbmV4cG9ydCB7XG4gIFVzZXJJbmZvLFxuICBBdXRoLFxufTtcbi8qKlxuICogQGFwaSDmiYvliqjms6jlhozoh7NjbG91ZGJhc2UgYXBwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckF1dGgoYXBwOiBQaWNrPElDbG91ZGJhc2UsICdyZWdpc3RlckNvbXBvbmVudCc+KSB7XG4gIHRyeSB7XG4gICAgYXBwLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLndhcm4oZSk7XG4gIH1cbn1cblxuIl19