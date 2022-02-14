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
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        return [4, this._getLocalUserInfoAsync('uid')];
                    case 1:
                        _a.uid = _e.sent();
                        _b = this;
                        return [4, this._getLocalUserInfoAsync('gender')];
                    case 2:
                        _b.gender = _e.sent();
                        this.picture = this._getLocalUserInfo('picture');
                        _c = this;
                        return [4, this._getLocalUserInfoAsync('email')];
                    case 3:
                        _c.email = _e.sent();
                        this.email_verified = this._getLocalUserInfo('email_verified');
                        this.phone_number = this._getLocalUserInfo('phone_number');
                        _d = this;
                        return [4, this._getLocalUserInfoAsync('username')];
                    case 4:
                        _d.username = _e.sent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrREFBeUU7QUFNekUsMENBQTZEO0FBSXJELElBQUEsU0FBUyxHQUFpQixpQkFBSyxVQUF0QixFQUFFLFVBQVUsR0FBSyxpQkFBSyxXQUFWLENBQVc7QUFDaEMsSUFBQSxNQUFNLEdBQXlCLHFCQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUsscUJBQVMsbUJBQWQsQ0FBZTtBQUN6QyxJQUFBLG9CQUFvQixHQUFLLG1CQUFPLHFCQUFaLENBQWE7QUFDakMsSUFBQSxxQkFBcUIsR0FBSyxrQkFBTSxzQkFBWCxDQUFZO0FBRXpDLElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQztBQUU5QixJQUFNLE1BQU0sR0FBRztJQUViLG1CQUFtQixFQUFFLG1CQUFtQjtDQUN6QyxDQUFDO0FBa0JGLElBQU0sUUFBUSxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztBQVE3QztJQXVCRSxjQUFZLE9BQXFCO1FBQ3ZCLElBQUEsS0FBSyxHQUFvQixPQUFPLE1BQTNCLEVBQUUsYUFBYSxHQUFLLE9BQU8sY0FBWixDQUFhO1FBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBRW5DLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBSVksNkJBQWMsR0FBM0I7OztnQkFDRSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQVcsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFXLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxPQUFPLEdB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QUU7U0FDMUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUE7UUFFbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQztZQUMzQixHQUFHLEtBQUE7WUFDSCxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsV0FBVyxhQUFBO1lBQ1gsS0FBSyxPQUFBO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBRWpCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFFBQVEsRUFBRSxJQUFJO1lBRWQsYUFBYSxlQUFBO1NBQ2QsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7Q0FDRixDQUFBO0FBRUQsSUFBSTtJQUdGLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUN4QztBQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUc7QUFTZixTQUFnQixZQUFZLENBQUMsR0FBMEM7SUFDckUsSUFBSTtRQUNGLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNsQztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUM7QUFORCxvQ0FNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbG91ZGJhc2UgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcbmltcG9ydCB7IHV0aWxzLCBjb25zdGFudHMsIGhlbHBlcnMsIGV2ZW50cyB9IGZyb20gJ0BjbG91ZGJhc2UvdXRpbGl0aWVzJztcbmltcG9ydCB7IElDbG91ZGJhc2VDYWNoZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY2FjaGUnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZVJlcXVlc3QgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL3JlcXVlc3QnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUF1dGhDb25maWcsIElVc2VyLCBJVXNlckluZm8sIElMb2dpblN0YXRlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9hdXRoJztcbmltcG9ydCB7IElDbG91ZGJhc2VDb21wb25lbnQgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NvbXBvbmVudCc7XG5cbmltcG9ydCB7IGF1dGhNb2RlbHMsIENsb3VkYmFzZU9BdXRoIH0gZnJvbSAnQGNsb3VkYmFzZS9vYXV0aCdcblxuZGVjbGFyZSBjb25zdCBjbG91ZGJhc2U6IElDbG91ZGJhc2U7XG5cbmNvbnN0IHsgcHJpbnRXYXJuLCB0aHJvd0Vycm9yIH0gPSB1dGlscztcbmNvbnN0IHsgRVJST1JTLCBDT01NVU5JVFlfU0lURV9VUkwgfSA9IGNvbnN0YW50cztcbmNvbnN0IHsgY2F0Y2hFcnJvcnNEZWNvcmF0b3IgfSA9IGhlbHBlcnM7XG5jb25zdCB7IENsb3VkYmFzZUV2ZW50RW1pdHRlciB9ID0gZXZlbnRzO1xuXG5jb25zdCBDT01QT05FTlRfTkFNRSA9ICdhdXRoJztcblxuY29uc3QgRVZFTlRTID0ge1xuICAvLyDnmbvlvZXmgIHmlLnlj5jlkI7op6blj5FcbiAgTE9HSU5fU1RBVEVfQ0hBTkdFRDogJ2xvZ2luU3RhdGVDaGFuZ2VkJyxcbn07XG5cbmludGVyZmFjZSBVc2VySW5mbyB7XG4gIHVpZD86IHN0cmluZztcbiAgZ2VuZGVyPzogc3RyaW5nO1xuICBwaWN0dXJlPzogc3RyaW5nO1xuICBlbWFpbD86IHN0cmluZztcbiAgZW1haWxfdmVyaWZpZWQ/OiBib29sZWFuO1xuICBwaG9uZV9udW1iZXI/OiBzdHJpbmc7XG4gIHVzZXJuYW1lPzogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBiaXJ0aGRhdGU/OiBzdHJpbmc7XG4gIHpvbmVpbmZvPzogc3RyaW5nO1xuICBsb2NhbGU/OiBzdHJpbmc7XG4gIHN1Yj86IHN0cmluZztcbiAgY3JlYXRlZF9mcm9tPzogc3RyaW5nO1xufVxuXG5jb25zdCBldmVudEJ1cyA9IG5ldyBDbG91ZGJhc2VFdmVudEVtaXR0ZXIoKTtcblxuaW50ZXJmYWNlIElVc2VyT3B0aW9ucyB7XG4gIGNhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG4gIC8vIHJlcXVlc3Q6IElDbG91ZGJhc2VSZXF1ZXN0O1xuICBvYXV0aEluc3RhbmNlOiBDbG91ZGJhc2VPQXV0aFxufVxuXG5jbGFzcyBVc2VyIGltcGxlbWVudHMgSVVzZXIge1xuICBwdWJsaWMgdWlkPzogc3RyaW5nO1xuICBwdWJsaWMgZ2VuZGVyPzogc3RyaW5nO1xuICBwdWJsaWMgcGljdHVyZT86IHN0cmluZztcbiAgcHVibGljIGVtYWlsPzogc3RyaW5nO1xuICBwdWJsaWMgZW1haWxfdmVyaWZpZWQ/OiBib29sZWFuO1xuICBwdWJsaWMgcGhvbmVfbnVtYmVyPzogc3RyaW5nO1xuICBwdWJsaWMgdXNlcm5hbWU/OiBzdHJpbmc7XG4gIHB1YmxpYyBuYW1lPzogc3RyaW5nO1xuICBwdWJsaWMgcHJvdmlkZXJzPzoge1xuICAgIGlkPzogc3RyaW5nO1xuICAgIHByb3ZpZGVyX3VzZXJfaWQ/OiBzdHJpbmc7XG4gICAgbmFtZT86IHN0cmluZztcbiAgfVtdXG4gIHB1YmxpYyBiaXJ0aGRhdGU/OiBzdHJpbmc7XG4gIHB1YmxpYyB6b25laW5mbz86IHN0cmluZztcbiAgcHVibGljIGxvY2FsZT86IHN0cmluZztcbiAgcHVibGljIHN1Yj86IHN0cmluZztcbiAgcHVibGljIGNyZWF0ZWRfZnJvbT86IHN0cmluZztcblxuICBwcml2YXRlIF9jYWNoZTogSUNsb3VkYmFzZUNhY2hlO1xuICBwcml2YXRlIF9vYXV0aEluc3RhbmNlOiBDbG91ZGJhc2VPQXV0aCAvLyBDbG91ZGJhc2VPQXV0aCDnsbvlnotcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJVXNlck9wdGlvbnMpIHtcbiAgICBjb25zdCB7IGNhY2hlLCBvYXV0aEluc3RhbmNlIH0gPSBvcHRpb25zO1xuICAgIHRoaXMuX2NhY2hlID0gY2FjaGU7XG4gICAgdGhpcy5fb2F1dGhJbnN0YW5jZSA9IG9hdXRoSW5zdGFuY2VcblxuICAgIHRoaXMuX3NldFVzZXJJbmZvKCk7XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluacrOWcsOeUqOaIt+S/oeaBry3lkIzmraVcbiAgICovXG4gIHB1YmxpYyBhc3luYyBjaGVja0xvY2FsSW5mbygpIHtcbiAgICB0aGlzLnVpZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3VpZCcpIGFzIHN0cmluZztcbiAgICB0aGlzLmdlbmRlciA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2dlbmRlcicpIGFzIHN0cmluZztcbiAgICB0aGlzLnBpY3R1cmUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdwaWN0dXJlJykgYXMgc3RyaW5nO1xuICAgIHRoaXMuZW1haWwgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdlbWFpbCcpIGFzIHN0cmluZztcbiAgICB0aGlzLmVtYWlsX3ZlcmlmaWVkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnZW1haWxfdmVyaWZpZWQnKSBhcyBib29sZWFuO1xuICAgIHRoaXMucGhvbmVfbnVtYmVyID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncGhvbmVfbnVtYmVyJykgYXMgc3RyaW5nXG4gICAgdGhpcy51c2VybmFtZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3VzZXJuYW1lJykgYXMgc3RyaW5nXG4gICAgdGhpcy5uYW1lID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnbmFtZScpIGFzIHN0cmluZ1xuICAgIHRoaXMuYmlydGhkYXRlID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnYmlydGhkYXRlJykgYXMgc3RyaW5nXG4gICAgdGhpcy56b25laW5mbyA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3pvbmVpbmZvJykgYXMgc3RyaW5nXG4gICAgdGhpcy5sb2NhbGUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdsb2NhbGUnKSBhcyBzdHJpbmdcbiAgICB0aGlzLnN1YiA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3N1YicpIGFzIHN0cmluZ1xuICAgIHRoaXMuY3JlYXRlZF9mcm9tID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnY3JlYXRlZF9mcm9tJykgYXMgc3RyaW5nXG4gICAgdGhpcy5wcm92aWRlcnMgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdwcm92aWRlcnMnKSBhcyBhbnlcbiAgfVxuICAvKipcbiAgICog6I635Y+W5pys5Zyw55So5oi35L+h5oGvLeW8guatpVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNoZWNrTG9jYWxJbmZvQXN5bmMoKSB7XG4gICAgdGhpcy51aWQgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3VpZCcpO1xuICAgIHRoaXMuZ2VuZGVyID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCdnZW5kZXInKTtcbiAgICB0aGlzLnBpY3R1cmUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdwaWN0dXJlJykgYXMgc3RyaW5nO1xuICAgIHRoaXMuZW1haWwgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2VtYWlsJyk7XG4gICAgdGhpcy5lbWFpbF92ZXJpZmllZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2VtYWlsX3ZlcmlmaWVkJykgYXMgYm9vbGVhbjtcbiAgICB0aGlzLnBob25lX251bWJlciA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3Bob25lX251bWJlcicpIGFzIHN0cmluZ1xuICAgIHRoaXMudXNlcm5hbWUgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3VzZXJuYW1lJylcbiAgICB0aGlzLm5hbWUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCduYW1lJykgYXMgc3RyaW5nXG4gICAgdGhpcy5iaXJ0aGRhdGUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdiaXJ0aGRhdGUnKSBhcyBzdHJpbmdcbiAgICB0aGlzLnpvbmVpbmZvID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnem9uZWluZm8nKSBhcyBzdHJpbmdcbiAgICB0aGlzLmxvY2FsZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2xvY2FsZScpIGFzIHN0cmluZ1xuICAgIHRoaXMuc3ViID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnc3ViJykgYXMgc3RyaW5nXG4gICAgdGhpcy5jcmVhdGVkX2Zyb20gPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdjcmVhdGVkX2Zyb20nKSBhcyBzdHJpbmdcbiAgICB0aGlzLnByb3ZpZGVycyA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3Byb3ZpZGVycycpIGFzIGFueVxuICB9XG5cblxuICAvKipcbiAgICog5pu05paw55So5oi35L+h5oGvXG4gICAqIEBwYXJhbSB1c2VySW5mb1xuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+abtOaWsOeUqOaIt+S/oeaBr+Wksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnVwZGF0ZSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g55So5oi35L+h5oGv5Lit5piv5ZCm5YyF5ZCr6Z2e5rOV5YC8JyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKHVzZXJJbmZvOiBhdXRoTW9kZWxzLlVzZXJQcm9maWxlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gY29uc3QgeyBuYW1lLCBnZW5kZXIsIGF2YXRhclVybCwgcHJvdmluY2UsIGNvdW50cnksIGNpdHkgfSA9IHVzZXJJbmZvO1xuICAgIGNvbnN0IG5ld1VzZXJJbmZvID0gYXdhaXQgdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnNldFVzZXJQcm9maWxlKHsgLi4udXNlckluZm8gfSlcblxuICAgIHRoaXMuX3NldExvY2FsVXNlckluZm8obmV3VXNlckluZm8pO1xuICB9XG4gIC8qKlxuICAgKiDmm7TmlrDlr4bnoIFcbiAgICogQHBhcmFtIG5ld1Bhc3N3b3JkXG4gICAqIEBwYXJhbSBvbGRQYXNzd29yZFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+abtOaWsOWvhueggeWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnVwZGF0ZVBhc3N3b3JkKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDMgLSDmlrDlr4bnoIHkuK3mmK/lkKbljIXlkKvpnZ7ms5XlrZfnrKYnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyB1cGRhdGVQYXNzd29yZChuZXdQYXNzd29yZDogc3RyaW5nLCBvbGRQYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS51cGRhdGVQYXNzd29yZEJ5T2xkKHtcbiAgICAgIG9sZF9wYXNzd29yZDogb2xkUGFzc3dvcmQsXG4gICAgICBuZXdfcGFzc3dvcmQ6IG5ld1Bhc3N3b3JkXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiDmm7TmlrDnlKjmiLflkI1cbiAgICogQHBhcmFtIHVzZXJuYW1lXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5pu05paw55So5oi35ZCN5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlVXNlcm5hbWUoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6hueUqOaIt+WQjeWvhueggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIHVwZGF0ZVVzZXJuYW1lKHVzZXJuYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHVzZXJuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3dFcnJvcihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsICd1c2VybmFtZSBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMudXBkYXRlKHtcbiAgICAgIHVzZXJuYW1lXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiDliLfmlrDmnKzlnLDnlKjmiLfkv6Hmga/jgILlvZPnlKjmiLflnKjlhbbku5blrqLmiLfnq6/mm7TmlrDnlKjmiLfkv6Hmga/kuYvlkI7vvIzlj6/ku6XosIPnlKjmraTmjqXlj6PlkIzmraXmm7TmlrDkuYvlkI7nmoTkv6Hmga/jgIJcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfliLfmlrDmnKzlnLDnlKjmiLfkv6Hmga/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggVXNlci5yZWZyZXNoKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgcmVmcmVzaCgpOiBQcm9taXNlPElVc2VySW5mbz4ge1xuICAgIGNvbnN0IG5ld1VzZXJJbmZvID0gYXdhaXQgdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLmdldFVzZXJJbmZvKClcbiAgICB0aGlzLl9zZXRMb2NhbFVzZXJJbmZvKG5ld1VzZXJJbmZvKTtcbiAgICByZXR1cm4gbmV3VXNlckluZm87XG4gIH1cblxuICBwcml2YXRlIF9nZXRMb2NhbFVzZXJJbmZvKGtleTogc3RyaW5nKTogc3RyaW5nIHwgYm9vbGVhbiB7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCB1c2VySW5mbyA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKHVzZXJJbmZvS2V5KTtcbiAgICByZXR1cm4gdXNlckluZm9ba2V5XTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2dldExvY2FsVXNlckluZm9Bc3luYyhrZXk6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCB1c2VySW5mbyA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmModXNlckluZm9LZXkpO1xuICAgIHJldHVybiB1c2VySW5mb1trZXldO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0VXNlckluZm8oKSB7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCB1c2VySW5mbyA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKHVzZXJJbmZvS2V5KTtcbiAgICBbXG4gICAgICAndWlkJyxcbiAgICAgICdlbWFpbCcsXG4gICAgICAnbmFtZScsXG4gICAgICAnZ2VuZGVyJyxcbiAgICAgICdwaWN0dXJlJyxcbiAgICAgICdlbWFpbF92ZXJpZmllZCcsXG4gICAgICAncGhvbmVfbnVtYmVyJyxcbiAgICAgICdiaXJ0aGRhdGUnLFxuICAgICAgJ3pvbmVpbmZvJyxcbiAgICAgICdsb2NhbGUnLFxuICAgICAgJ3N1YicsXG4gICAgICAnY3JlYXRlZF9mcm9tJyxcbiAgICAgICdwcm92aWRlcnMnLFxuICAgICAgJ3VzZXJuYW1lJ1xuICAgIF0uZm9yRWFjaChpbmZvS2V5ID0+IHtcbiAgICAgIHRoaXNbaW5mb0tleV0gPSB1c2VySW5mb1tpbmZvS2V5XTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldExvY2FsVXNlckluZm8odXNlckluZm86IGFueSkge1xuICAgIGNvbnN0IHsgdXNlckluZm9LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgdGhpcy5fY2FjaGUuc2V0U3RvcmUodXNlckluZm9LZXksIHVzZXJJbmZvKTtcbiAgICB0aGlzLl9zZXRVc2VySW5mbygpO1xuICB9XG59XG5pbnRlcmZhY2UgSUxvZ2luU3RhdGVPcHRpb25zIGV4dGVuZHMgSVVzZXJPcHRpb25zIHtcbiAgZW52SWQ6IHN0cmluZztcbn1cbmV4cG9ydCBjbGFzcyBMb2dpblN0YXRlIGltcGxlbWVudHMgSUxvZ2luU3RhdGUge1xuICBwdWJsaWMgdXNlcjogSVVzZXI7XG4gIHB1YmxpYyBvYXV0aExvZ2luU3RhdGU6IGFueVxuXG4gIHByaXZhdGUgX29hdXRoSW5zdGFuY2U6IENsb3VkYmFzZU9BdXRoXG4gIHByaXZhdGUgX2NhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogSUxvZ2luU3RhdGVPcHRpb25zKSB7XG4gICAgY29uc3QgeyBlbnZJZCwgY2FjaGUsIG9hdXRoSW5zdGFuY2UgfSA9IG9wdGlvbnM7XG4gICAgaWYgKCFlbnZJZCkge1xuICAgICAgdGhyb3dFcnJvcihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsICdlbnZJZCBpcyBub3QgZGVmaW5lZCcpO1xuICAgIH1cbiAgICB0aGlzLl9jYWNoZSA9IGNhY2hlO1xuICAgIHRoaXMuX29hdXRoSW5zdGFuY2UgPSBvYXV0aEluc3RhbmNlXG5cbiAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcih7XG4gICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICBvYXV0aEluc3RhbmNlXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY2hlY2tMb2NhbFN0YXRlKCkge1xuICAgIHRoaXMub2F1dGhMb2dpblN0YXRlID0gdGhpcy5fb2F1dGhJbnN0YW5jZT8uYXV0aEFwaS5oYXNMb2dpblN0YXRlU3luYygpXG4gICAgdGhpcy51c2VyLmNoZWNrTG9jYWxJbmZvKCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2hlY2tMb2NhbFN0YXRlQXN5bmMoKSB7XG4gICAgYXdhaXQgdGhpcy5fb2F1dGhJbnN0YW5jZT8uYXV0aEFwaS5nZXRMb2dpblN0YXRlKClcbiAgICBhd2FpdCB0aGlzLnVzZXIuY2hlY2tMb2NhbEluZm9Bc3luYygpO1xuICB9XG59XG5cbmNsYXNzIEF1dGgge1xuICBwcml2YXRlIHJlYWRvbmx5IF9jb25maWc6IElDbG91ZGJhc2VBdXRoQ29uZmlnO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jYWNoZTogSUNsb3VkYmFzZUNhY2hlXG4gIC8vIHByaXZhdGUgcmVhZG9ubHkgX3JlcXVlc3Q6IElDbG91ZGJhc2VSZXF1ZXN0O1xuXG4gIHByaXZhdGUgX29hdXRoSW5zdGFuY2U6IENsb3VkYmFzZU9BdXRoXG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJQ2xvdWRiYXNlQXV0aENvbmZpZyAmIHsgY2FjaGU6IElDbG91ZGJhc2VDYWNoZSwgcmVxdWVzdD86IElDbG91ZGJhc2VSZXF1ZXN0LCBydW50aW1lPzogc3RyaW5nIH0pIHtcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gICAgdGhpcy5fY2FjaGUgPSBjb25maWcuY2FjaGU7XG4gICAgLy8gdGhpcy5fcmVxdWVzdCA9IGNvbmZpZy5yZXF1ZXN0O1xuICAgIHRoaXMuX29hdXRoSW5zdGFuY2UgPSBjb25maWcub2F1dGhJbnN0YW5jZVxuICB9XG5cbiAgLyoqXG4gICog57uR5a6a5omL5py65Y+3XG4gICogQHBhcmFtIHBob25lTnVtYmVyXG4gICogQHBhcmFtIHBob25lQ29kZVxuICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn57uR5a6a5omL5py65Y+35aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5iaW5kUGhvbmVOdW1iZXIoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huefreS/oemqjOivgeeggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGJpbmRQaG9uZU51bWJlcihwYXJhbXM6IGF1dGhNb2RlbHMuQmluZFBob25lUmVxdWVzdCkge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuYmluZFBob25lKHBhcmFtcylcbiAgfVxuXG4gIC8qKlxuICAgKiDop6Pnu5HkuInmlrnnu5HlrppcbiAgICogQHBhcmFtIGxvZ2luVHlwZVxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+ino+mZpOS4ieaWuee7keWumuWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkudW5iaW5kUHJvdmlkZXIoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjei0puaIt+aYr+WQpuW3sue7j+S4juatpOeZu+W9leaWueW8j+ino+e7kScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHVuYmluZFByb3ZpZGVyKHBhcmFtczogYXV0aE1vZGVscy5VbmJpbmRQcm92aWRlclJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnVuYmluZFByb3ZpZGVyKHBhcmFtcylcbiAgfVxuXG4gIC8qKlxuICog5pu05paw6YKu566x5Zyw5Z2AXG4gKiBAcGFyYW0gZW1haWxcbiAqIEBwYXJhbSBzdWRvX3Rva2VuXG4gKiBAcGFyYW0gdmVyaWZpY2F0aW9uX3Rva2VuXG4gKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+e7keWumumCrueuseWcsOWdgOWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuYmluZEVtYWlsKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobpgq7nrrHlr4bnoIHnmbvlvZUnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBiaW5kRW1haWwocGFyYW1zOiBhdXRoTW9kZWxzLkJpbmRFbWFpbFJlcXVlc3QpIHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLmJpbmRFbWFpbChwYXJhbXMpXG4gIH1cblxuICAvKipcbiAgICogdmVyaWZ5XG4gICAqIEBwYXJhbSB7YXV0aE1vZGVscy5WZXJpZnlSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybnMge1Byb21pc2U8YXV0aE1vZGVscy5WZXJpZnlSZXNwb25zZT59XG4gICAqIEBtZW1iZXJvZiBVc2VyXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6aqM6K+B56CB6aqM6K+B5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS52ZXJpZnkoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huaJi+acuumqjOivgeeggS/pgq7nrrHnmbvlvZUnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyB2ZXJpZnkocGFyYW1zOiBhdXRoTW9kZWxzLlZlcmlmeVJlcXVlc3QpOiBQcm9taXNlPGF1dGhNb2RlbHMuVmVyaWZ5UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnZlcmlmeShwYXJhbXMpXG4gIH1cblxuICAvKipcbiAgICog6I635Y+W6aqM6K+B56CBXG4gICAqIEBwYXJhbSB7YXV0aE1vZGVscy5HZXRWZXJpZmljYXRpb25SZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybnMge1Byb21pc2U8YXV0aE1vZGVscy5HZXRWZXJpZmljYXRpb25SZXNwb25zZT59XG4gICAqIEBtZW1iZXJvZiBVc2VyXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6I635Y+W6aqM6K+B56CB5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5nZXRWZXJpZmljYXRpb24oKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huaJi+acuumqjOivgeeggS/pgq7nrrHnmbvlvZUnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRWZXJpZmljYXRpb24oXG4gICAgcGFyYW1zOiBhdXRoTW9kZWxzLkdldFZlcmlmaWNhdGlvblJlcXVlc3QsXG4gICk6IFByb21pc2U8YXV0aE1vZGVscy5HZXRWZXJpZmljYXRpb25SZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuZ2V0VmVyaWZpY2F0aW9uKHBhcmFtcylcbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5blvZPliY3nmbvlvZXnmoTnlKjmiLfkv6Hmga8t5ZCM5q2lXG4gICAqL1xuICBnZXQgY3VycmVudFVzZXIoKSB7XG4gICAgaWYgKHRoaXMuX2NhY2hlLm1vZGUgPT09ICdhc3luYycpIHtcbiAgICAgIC8vIGFzeW5jIHN0b3JhZ2XnmoTlubPlj7DosIPnlKjmraRBUEnmj5DnpLpcbiAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sICdjdXJyZW50IHBsYXRmb3JtXFwncyBzdG9yYWdlIGlzIGFzeW5jaHJvbm91cywgcGxlYXNlIHVzZSBnZXRDdXJyZW50VXNlciBpbnN0ZWVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IHRoaXMuaGFzTG9naW5TdGF0ZSgpO1xuXG4gICAgaWYgKGxvZ2luU3RhdGUpIHtcbiAgICAgIHJldHVybiBsb2dpblN0YXRlLnVzZXIgfHwgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluW9k+WJjeeZu+W9leeahOeUqOaIt+S/oeaBry3lvILmraVcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfojrflj5bnlKjmiLfkv6Hmga/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmdldEN1cnJlblVzZXIoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRDdXJyZW50VXNlcigpIHtcbiAgICBjb25zdCBsb2dpblN0YXRlID0gYXdhaXQgdGhpcy5nZXRMb2dpblN0YXRlKCk7XG4gICAgaWYgKGxvZ2luU3RhdGUpIHtcbiAgICAgIGF3YWl0IGxvZ2luU3RhdGUudXNlci5jaGVja0xvY2FsSW5mb0FzeW5jKCk7XG4gICAgICByZXR1cm4gbG9naW5TdGF0ZS51c2VyIHx8IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIOWMv+WQjeeZu+W9lVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxMb2dpblN0YXRlPn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfljL/lkI3nmbvlvZXlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDlvZPliY3njq/looPmmK/lkKblvIDlkK/kuobljL/lkI3nmbvlvZUnLFxuICAgICAgJyAgMiAtIOiwg+eUqCBhdXRoKCkuc2lnbkluQW5vbnltb3VzbHkoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBzaWduSW5Bbm9ueW1vdXNseSgpOiBQcm9taXNlPExvZ2luU3RhdGU+IHtcbiAgICBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuc2lnbkluQW5vbnltb3VzbHkoKVxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUxvZ2luU3RhdGUoKVxuICB9XG5cbiAgLyoqXG4gICAqIOiuvue9ruiOt+WPluiHquWumuS5ieeZu+W9lSB0aWNrZXQg5Ye95pWwXG4gICAqIEBwYXJhbSB7YXV0aE1vZGVscy5HZXRDdXN0b21TaWduVGlja2V0Rm59IGdldFRpY2tGblxuICAgKiBAbWVtYmVyb2YgQXV0aFxuICAgKi9cbiAgcHVibGljIHNldEN1c3RvbVNpZ25GdW5jKGdldFRpY2tGbjogYXV0aE1vZGVscy5HZXRDdXN0b21TaWduVGlja2V0Rm4pOiB2b2lkIHtcbiAgICB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuc2V0Q3VzdG9tU2lnbkZ1bmMoZ2V0VGlja0ZuKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPExvZ2luU3RhdGU+fVxuICAgKiBAbWVtYmVyb2YgQXV0aFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iHquWumuS5ieeZu+W9leWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOWQr+S6huiHquWumuS5ieeZu+W9lScsXG4gICAgICAnICAyIC0g6LCD55SoIGF1dGgoKS5zaWduSW5XaXRoQ3VzdG9tVGlja2V0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDMgLSB0aWNrZXQg5piv5ZCm5b2S5bGe5LqO5b2T5YmN546v5aKDJyxcbiAgICAgICcgIDQgLSDliJvlu7ogdGlja2V0IOeahOiHquWumuS5ieeZu+W9leengemSpeaYr+WQpui/h+acnycsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHNpZ25JbldpdGhDdXN0b21UaWNrZXQoKTogUHJvbWlzZTxMb2dpblN0YXRlPiB7XG4gICAgYXdhaXQgdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnNpZ25JbldpdGhDdXN0b21UaWNrZXQoKVxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUxvZ2luU3RhdGUoKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7YXV0aE1vZGVscy5TaWduSW5SZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybnMge1Byb21pc2U8TG9naW5TdGF0ZT59XG4gICAqIEBtZW1iZXJvZiBBdXRoXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbkluKHBhcmFtczogYXV0aE1vZGVscy5TaWduSW5SZXF1ZXN0KTogUHJvbWlzZTxMb2dpblN0YXRlPiB7XG4gICAgYXdhaXQgdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnNpZ25JbihwYXJhbXMpXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlTG9naW5TdGF0ZSgpXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHthdXRoTW9kZWxzLlNpZ25VcFJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxMb2dpblN0YXRlPn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfms6jlhozlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDlvZPliY3njq/looPmmK/lkKblvIDlkK/kuobmjIflrprnmbvlvZXmlrnlvI8nLFxuICAgICAgJyAgMiAtIOiwg+eUqCBhdXRoKCkuc2lnblVwKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgc2lnblVwKHBhcmFtczogYXV0aE1vZGVscy5TaWduVXBSZXF1ZXN0KTogUHJvbWlzZTxMb2dpblN0YXRlPiB7XG4gICAgYXdhaXQgdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnNpZ25VcChwYXJhbXMpXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlTG9naW5TdGF0ZSgpXG4gIH1cblxuICAvKipcbiAgICog6K6+572u5a+G56CBXG4gICAqIEBwYXJhbSB7YXV0aE1vZGVscy5TZXRQYXNzd29yZFJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZXRQYXNzd29yZChwYXJhbXM6IGF1dGhNb2RlbHMuU2V0UGFzc3dvcmRSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5zZXRQYXNzd29yZChwYXJhbXMpXG4gIH1cblxuICAvKipcbiAgICog5qOA5rWL55So5oi35ZCN5piv5ZCm5bey57uP5Y2g55SoXG4gICAqIEBwYXJhbSB1c2VybmFtZVxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iOt+WPlueUqOaIt+aYr+WQpuiiq+WNoOeUqOWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuaXNVc2VybmFtZVJlZ2lzdGVyZWQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBpc1VzZXJuYW1lUmVnaXN0ZXJlZCh1c2VybmFtZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKHR5cGVvZiB1c2VybmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCAndXNlcm5hbWUgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZXhpc3QgfSA9IGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5jaGVja0lmVXNlckV4aXN0KHsgdXNlcm5hbWUgfSlcbiAgICByZXR1cm4gZXhpc3RcbiAgfVxuXG4gIC8qKlxuICAgKiDnmbvlh7pcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnlKjmiLfnmbvlh7rlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLnNpZ25PdXQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeUqOaIt+aYr+WQpuS4uuWMv+WQjeeZu+W9le+8iOWMv+WQjeeZu+W9leS4jeaUr+aMgXNpZ25PdXTvvIknLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBzaWduT3V0KCkge1xuICAgIGNvbnN0IHsgdXNlckluZm9LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgYXdhaXQgdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnNpZ25PdXQoKVxuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmModXNlckluZm9LZXkpXG4gICAgZXZlbnRCdXMuZmlyZShFVkVOVFMuTE9HSU5fU1RBVEVfQ0hBTkdFRClcbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnmbvlvZXmgIEt5ZCM5q2lXG4gICAqL1xuICBwdWJsaWMgaGFzTG9naW5TdGF0ZSgpOiBMb2dpblN0YXRlIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuX2NhY2hlLm1vZGUgPT09ICdhc3luYycpIHtcbiAgICAgIC8vIGFzeW5jIHN0b3JhZ2XnmoTlubPlj7DosIPnlKjmraRBUEnmj5DnpLpcbiAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sICdjdXJyZW50IHBsYXRmb3JtXFwncyBzdG9yYWdlIGlzIGFzeW5jaHJvbm91cywgcGxlYXNlIHVzZSBnZXRMb2dpblN0YXRlIGluc3RlZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvYXV0aExvZ2luU3RhdGUgPSB0aGlzLl9vYXV0aEluc3RhbmNlPy5hdXRoQXBpLmhhc0xvZ2luU3RhdGVTeW5jKClcbiAgICBpZiAob2F1dGhMb2dpblN0YXRlKSB7XG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICBvYXV0aEluc3RhbmNlOiB0aGlzLl9vYXV0aEluc3RhbmNlLFxuICAgICAgfSlcbiAgICAgIHJldHVybiBsb2dpblN0YXRlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluacrOWcsOeZu+W9leaAgS3lvILmraVcbiAgICog5q2kQVBJ5Li65YW85a655byC5q2lc3RvcmFnZeeahOW5s+WPsFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iOt+WPluacrOWcsOeZu+W9leaAgeWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuZ2V0TG9naW5TdGF0ZSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGdldExvZ2luU3RhdGUoKSB7XG4gICAgY29uc3Qgb2F1dGhMb2dpblN0YXRlID0gYXdhaXQgdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLmdldExvZ2luU3RhdGUoKVxuICAgIGlmIChvYXV0aExvZ2luU3RhdGUpIHtcbiAgICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBuZXcgTG9naW5TdGF0ZSh7XG4gICAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIG9hdXRoSW5zdGFuY2U6IHRoaXMuX29hdXRoSW5zdGFuY2UsXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGxvZ2luU3RhdGVcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iOt+WPlueUqOaIt+S/oeaBr+Wksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOaYr+WQpuW3sueZu+W9lScsXG4gICAgICAnICAyIC0g6LCD55SoIGF1dGgoKS5nZXRVc2VySW5mbygpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGdldFVzZXJJbmZvKCk6IFByb21pc2U8SVVzZXJJbmZvPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5nZXRVc2VySW5mbygpXG4gIH1cblxuXG4gIC8qKlxuICAgKiDkuLrlt7LmnInotKbmiLfnu5HnrKzkuInmlrnotKbmiLdcbiAgICogQHBhcmFtIHthdXRoTW9kZWxzLkJpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqIEBtZW1iZXJvZiBBdXRoXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn57uR5a6a56ys5LiJ5pa555m75b2V5pa55byP5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5iaW5kV2l0aFByb3ZpZGVyKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDmraTotKbmiLfmmK/lkKblt7Lnu4/nu5HlrprmraTnrKzkuInmlrknLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBiaW5kV2l0aFByb3ZpZGVyKFxuICAgIHBhcmFtczogYXV0aE1vZGVscy5CaW5kV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5iaW5kV2l0aFByb3ZpZGVyKHBhcmFtcylcbiAgfVxuXG4gIC8qKlxuICAgKiDmn6Xor6LnlKjmiLdcbiAgICogQHBhcmFtIHthdXRoTW9kZWxzLlF1ZXJ5VXNlclByb2ZpbGVSZXF1ZXN0fSBhcHBlbmRlZF9wYXJhbXNcbiAgICogQHJldHVybnMge1Byb21pc2U8YXV0aE1vZGVscy5Vc2VyUHJvZmlsZT59XG4gICAqIEBtZW1iZXJvZiBBdXRoXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcXVlcnlVc2VyKFxuICAgIHF1ZXJ5T2JqOiBhdXRoTW9kZWxzLlF1ZXJ5VXNlclByb2ZpbGVSZXF1ZXN0LFxuICApOiBQcm9taXNlPGF1dGhNb2RlbHMuUXVlcnlVc2VyUHJvZmlsZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5xdWVyeVVzZXJQcm9maWxlKHF1ZXJ5T2JqKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldEFjY2Vzc1Rva2VuKCkge1xuICAgIGNvbnN0IG9hdXRoQWNjZXNzVG9rZW5SZXMgPSBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLm9hdXRoMmNsaWVudC5nZXRBY2Nlc3NUb2tlbigpXG4gICAgcmV0dXJuIHtcbiAgICAgIGFjY2Vzc1Rva2VuOiBvYXV0aEFjY2Vzc1Rva2VuUmVzLFxuICAgICAgZW52OiB0aGlzLl9jb25maWcuZW52XG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBncmFudFByb3ZpZGVyVG9rZW4oXG4gICAgcGFyYW1zOiBhdXRoTW9kZWxzLkdyYW50UHJvdmlkZXJUb2tlblJlcXVlc3QsXG4gICk6IFByb21pc2U8YXV0aE1vZGVscy5HcmFudFByb3ZpZGVyVG9rZW5SZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuZ3JhbnRQcm92aWRlclRva2VuKHBhcmFtcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzaWduSW5XaXRoUHJvdmlkZXIoXG4gICAgcGFyYW1zOiBhdXRoTW9kZWxzLlNpZ25JbldpdGhQcm92aWRlclJlcXVlc3QsXG4gICk6IFByb21pc2U8TG9naW5TdGF0ZT4ge1xuICAgIGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5zaWduSW5XaXRoUHJvdmlkZXIocGFyYW1zKVxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUxvZ2luU3RhdGUoKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdyYW50VG9rZW4ocGFyYW1zOiBhdXRoTW9kZWxzLkdyYW50VG9rZW5SZXF1ZXN0KTogUHJvbWlzZTxMb2dpblN0YXRlPiB7XG4gICAgYXdhaXQgdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLmdyYW50VG9rZW4ocGFyYW1zKVxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUxvZ2luU3RhdGUoKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdlblByb3ZpZGVyUmVkaXJlY3RVcmkoXG4gICAgcGFyYW1zOiBhdXRoTW9kZWxzLkdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXF1ZXN0LFxuICApOiBQcm9taXNlPGF1dGhNb2RlbHMuR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5nZW5Qcm92aWRlclJlZGlyZWN0VXJpKHBhcmFtcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZXNldFBhc3N3b3JkKHBhcmFtczogYXV0aE1vZGVscy5SZXNldFBhc3N3b3JkUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkucmVzZXRQYXNzd29yZChwYXJhbXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGV2aWNlQXV0aG9yaXplKHBhcmFtczogYXV0aE1vZGVscy5EZXZpY2VBdXRob3JpemVSZXF1ZXN0KTogUHJvbWlzZTxhdXRoTW9kZWxzLkRldmljZUF1dGhvcml6ZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5kZXZpY2VBdXRob3JpemUocGFyYW1zKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHN1ZG8ocGFyYW1zOiBhdXRoTW9kZWxzLlN1ZG9SZXF1ZXN0KTogUHJvbWlzZTxhdXRoTW9kZWxzLlN1ZG9SZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuc3VkbyhwYXJhbXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVsZXRlTWUocGFyYW1zOiBhdXRoTW9kZWxzLldpdGhTdWRvUmVxdWVzdCk6IFByb21pc2U8YXV0aE1vZGVscy5Vc2VyUHJvZmlsZT4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuZGVsZXRlTWUocGFyYW1zKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFByb3ZpZGVycygpOiBQcm9taXNlPGF1dGhNb2RlbHMuVXNlclByb2ZpbGVQcm92aWRlcj4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuZ2V0UHJvdmlkZXJzKClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBsb2dpblNjb3BlKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5sb2dpblNjb3BlKClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbkxvZ2luU3RhdGVDaGFuZ2VkKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGV2ZW50QnVzLm9uKEVWRU5UUy5MT0dJTl9TVEFURV9DSEFOR0VELCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gYXdhaXQgdGhpcy5nZXRMb2dpblN0YXRlKCk7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGxvZ2luU3RhdGUpO1xuICAgIH0pO1xuICAgIC8vIOeri+WIu+aJp+ihjOS4gOasoeWbnuiwg1xuICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBhd2FpdCB0aGlzLmdldExvZ2luU3RhdGUoKTtcbiAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGxvZ2luU3RhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjcmVhdGVMb2dpblN0YXRlKCk6IFByb21pc2U8TG9naW5TdGF0ZT4ge1xuICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBuZXcgTG9naW5TdGF0ZSh7XG4gICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgIG9hdXRoSW5zdGFuY2U6IHRoaXMuX29hdXRoSW5zdGFuY2UsXG4gICAgfSlcblxuICAgIGF3YWl0IGxvZ2luU3RhdGUuY2hlY2tMb2NhbFN0YXRlQXN5bmMoKTtcbiAgICBhd2FpdCBsb2dpblN0YXRlLnVzZXIucmVmcmVzaCgpO1xuICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQpO1xuICAgIHJldHVybiBsb2dpblN0YXRlXG4gIH1cbn1cblxuY29uc3QgY29tcG9uZW50OiBJQ2xvdWRiYXNlQ29tcG9uZW50ID0ge1xuICBuYW1lOiBDT01QT05FTlRfTkFNRSxcbiAgbmFtZXNwYWNlOiAnYXV0aCcsXG4gIGVudGl0eTogZnVuY3Rpb24gKGNvbmZpZzogUGljazxJQ2xvdWRiYXNlQXV0aENvbmZpZywgJ3JlZ2lvbicgfCAncGVyc2lzdGVuY2UnPiA9IHsgcmVnaW9uOiAnJywgcGVyc2lzdGVuY2U6ICdsb2NhbCcgfSkge1xuICAgIGlmICh0aGlzLmF1dGhJbnN0YW5jZSkge1xuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwgJ2V2ZXJ5IGNsb3VkYmFzZSBpbnN0YW5jZSBzaG91bGQgaGFzIG9ubHkgb25lIGF1dGggb2JqZWN0Jyk7XG4gICAgICByZXR1cm4gdGhpcy5hdXRoSW5zdGFuY2U7XG4gICAgfVxuICAgIGNvbnN0IHsgYWRhcHRlciwgcnVudGltZSB9ID0gdGhpcy5wbGF0Zm9ybTtcbiAgICAvLyDlpoLkuI3mmI7noa7mjIflrppwZXJzaXN0ZW5jZeWImeS8mOWFiOWPluWQhOW5s+WPsGFkYXB0ZXLpppbpgInvvIzlhbbmrKFsb2NhbFN0b3JhZ2VcbiAgICBjb25zdCBuZXdQZXJzaXN0ZW5jZSA9IGNvbmZpZy5wZXJzaXN0ZW5jZSB8fCBhZGFwdGVyLnByaW1hcnlTdG9yYWdlO1xuICAgIGlmIChuZXdQZXJzaXN0ZW5jZSAmJiAobmV3UGVyc2lzdGVuY2UgIT09IHRoaXMuY29uZmlnLnBlcnNpc3RlbmNlKSkge1xuICAgICAgdGhpcy51cGRhdGVDb25maWcoeyBwZXJzaXN0ZW5jZTogbmV3UGVyc2lzdGVuY2UgfSlcbiAgICB9XG5cbiAgICBjb25zdCB7IGVudiwgcGVyc2lzdGVuY2UsIGRlYnVnLCBjbGllbnRJZCB9ID0gdGhpcy5jb25maWc7XG4gICAgY29uc3Qgb2F1dGhJbnN0YW5jZSA9IG5ldyBDbG91ZGJhc2VPQXV0aCh7XG4gICAgICBjbGllbnRJZDogY2xpZW50SWQsXG4gICAgICBhcGlPcmlnaW46IHRoaXMucmVxdWVzdC5nZXRCYXNlRW5kUG9pbnQoKSxcbiAgICB9KVxuXG4gICAgdGhpcy5vYXV0aEluc3RhbmNlID0gb2F1dGhJbnN0YW5jZVxuXG4gICAgdGhpcy5hdXRoSW5zdGFuY2UgPSBuZXcgQXV0aCh7XG4gICAgICBlbnYsXG4gICAgICByZWdpb246IGNvbmZpZy5yZWdpb24sXG4gICAgICBwZXJzaXN0ZW5jZSxcbiAgICAgIGRlYnVnLFxuICAgICAgY2FjaGU6IHRoaXMuY2FjaGUsXG4gICAgICAvLyByZXF1ZXN0OiB0aGlzLnJlcXVlc3QsXG4gICAgICBydW50aW1lOiBydW50aW1lLFxuICAgICAgX2Zyb21BcHA6IHRoaXMsXG4gICAgICAvLyBvYXV0aEluc3RhbmNlOiB0aGlzLm9hdXRoSW5zdGFuY2UgfHwgKHRoaXMgYXMgYW55KS5vYXV0aCgpXG4gICAgICBvYXV0aEluc3RhbmNlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5hdXRoSW5zdGFuY2U7XG4gIH1cbn1cblxudHJ5IHtcbiAgLy8g5bCd6K+V6Ieq5Yqo5rOo5YaM6Iez5YWo5bGA5Y+Y6YePY2xvdWRiYXNlXG4gIC8vIOatpOihjOS4uuWPquWcqOa1j+iniOWZqOeOr+Wig+S4i+acieaViFxuICBjbG91ZGJhc2UucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbn0gY2F0Y2ggKGUpIHsgfVxuXG5leHBvcnQge1xuICBVc2VySW5mbyxcbiAgQXV0aCxcbn07XG4vKipcbiAqIEBhcGkg5omL5Yqo5rOo5YaM6IezY2xvdWRiYXNlIGFwcFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJBdXRoKGFwcDogUGljazxJQ2xvdWRiYXNlLCAncmVnaXN0ZXJDb21wb25lbnQnPikge1xuICB0cnkge1xuICAgIGFwcC5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS53YXJuKGUpO1xuICB9XG59XG5cbiJdfQ==