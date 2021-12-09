"use strict";
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
var oauth_1 = require("@cloudbase/oauth");
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
    return User;
}());
var LoginState = (function () {
    function LoginState(options) {
        var envId = options.envId, cache = options.cache, oauthInstance = options.oauthInstance;
        if (!envId) {
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
            var loginState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._oauthInstance.authApi.signInAnonymously()];
                    case 1:
                        _a.sent();
                        loginState = new LoginState({
                            envId: this._config.env,
                            cache: this._cache,
                            oauthInstance: this._oauthInstance,
                        });
                        return [4, loginState.checkLocalStateAsync()];
                    case 2:
                        _a.sent();
                        return [4, loginState.user.refresh()];
                    case 3:
                        _a.sent();
                        return [2, loginState];
                }
            });
        });
    };
    Auth.prototype.setCustomSignFunc = function (getTickFn) {
        this._oauthInstance.authApi.setCustomSignFunc(getTickFn);
    };
    Auth.prototype.signInWithCustomTicket = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loginState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._oauthInstance.authApi.signInWithCustomTicket()];
                    case 1:
                        _a.sent();
                        loginState = new LoginState({
                            envId: this._config.env,
                            cache: this._cache,
                            oauthInstance: this._oauthInstance,
                        });
                        return [4, loginState.checkLocalStateAsync()];
                    case 2:
                        _a.sent();
                        return [4, loginState.user.refresh()];
                    case 3:
                        _a.sent();
                        return [2, loginState];
                }
            });
        });
    };
    Auth.prototype.signIn = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var loginState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._oauthInstance.authApi.signIn(params)];
                    case 1:
                        _a.sent();
                        loginState = new LoginState({
                            envId: this._config.env,
                            cache: this._cache,
                            oauthInstance: this._oauthInstance,
                        });
                        return [4, loginState.checkLocalStateAsync()];
                    case 2:
                        _a.sent();
                        return [4, loginState.user.refresh()];
                    case 3:
                        _a.sent();
                        return [2, loginState];
                }
            });
        });
    };
    Auth.prototype.signUp = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var loginState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._oauthInstance.authApi.signUp(params)];
                    case 1:
                        _a.sent();
                        loginState = new LoginState({
                            envId: this._config.env,
                            cache: this._cache,
                            oauthInstance: this._oauthInstance,
                        });
                        return [4, loginState.checkLocalStateAsync()];
                    case 2:
                        _a.sent();
                        return [4, loginState.user.refresh()];
                    case 3:
                        _a.sent();
                        return [2, loginState];
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
            var loginState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._oauthInstance.authApi.signInWithProvider(params)];
                    case 1:
                        _a.sent();
                        loginState = new LoginState({
                            envId: this._config.env,
                            cache: this._cache,
                            oauthInstance: this._oauthInstance,
                        });
                        return [4, loginState.checkLocalStateAsync()];
                    case 2:
                        _a.sent();
                        return [4, loginState.user.refresh()];
                    case 3:
                        _a.sent();
                        return [2, loginState];
                }
            });
        });
    };
    Auth.prototype.grantToken = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var loginState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._oauthInstance.authApi.grantToken(params)];
                    case 1:
                        _a.sent();
                        loginState = new LoginState({
                            envId: this._config.env,
                            cache: this._cache,
                            oauthInstance: this._oauthInstance,
                        });
                        return [4, loginState.checkLocalStateAsync()];
                    case 2:
                        _a.sent();
                        return [4, loginState.user.refresh()];
                    case 3:
                        _a.sent();
                        return [2, loginState];
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
    return Auth;
}());
exports.Auth = Auth;
var component = {
    name: COMPONENT_NAME,
    namespace: 'auth',
    entity: function (config) {
        if (config === void 0) { config = { region: '', persistence: 'local' }; }
        if (this.authInstance) {
            return this.authInstance;
        }
        var _a = this.platform, adapter = _a.adapter, runtime = _a.runtime;
        var newPersistence = config.persistence || adapter.primaryStorage;
        if (newPersistence && (newPersistence !== this.config.persistence)) {
            this.updateConfig({ persistence: newPersistence });
        }
        var _b = this.config, env = _b.env, persistence = _b.persistence, debug = _b.debug;
        var oauthInstance = new oauth_1.CloudbaseOAuth({
            clientId: env,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsMENBQTZEO0FBUTdELElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQztBQXlCOUI7SUF3QkUsY0FBWSxPQUFxQjtRQUN2QixJQUFBLEtBQUssR0FBb0IsT0FBTyxNQUEzQixFQUFFLGFBQWEsR0FBSyxPQUFPLGNBQVosQ0FBYTtRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtRQUVuQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUlZLDZCQUFjLEdBQTNCOzs7Z0JBQ0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFXLENBQUM7Z0JBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBVyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQVcsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFXLENBQUM7Z0JBQy9ELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBVyxDQUFDO2dCQUN2RCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBWSxDQUFDO2dCQUMxRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQVcsQ0FBQTtnQkFDcEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENB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QyxDQUFDO0tBQ2pCO0FBQ0gsQ0FBQztBQU5ELG9DQU1DIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgYW55IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG4vLyBpbXBvcnQgeyB1dGlscywgY29uc3RhbnRzLCBoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuLy8gaW1wb3J0IHsgYW55IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSc7XG4vLyBpbXBvcnQgeyBhbnkgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL3JlcXVlc3QnO1xuLy8gaW1wb3J0IHsgYW55LCBhbnksIGFueSwgYW55IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9hdXRoJztcbi8vIGltcG9ydCB7IGFueSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY29tcG9uZW50JztcblxuaW1wb3J0IHsgYXV0aE1vZGVscywgQ2xvdWRiYXNlT0F1dGggfSBmcm9tICdAY2xvdWRiYXNlL29hdXRoJ1xuXG5kZWNsYXJlIGNvbnN0IGNsb3VkYmFzZTogYW55O1xuXG4vLyBjb25zdCB7IHByaW50V2FybiwgdGhyb3dFcnJvciB9ID0gdXRpbHM7XG4vLyBjb25zdCB7IEVSUk9SUywgQ09NTVVOSVRZX1NJVEVfVVJMIH0gPSBjb25zdGFudHM7XG4vLyBjb25zdCB7IGNhdGNoRXJyb3JzRGVjb3JhdG9yIH0gPSBoZWxwZXJzO1xuXG5jb25zdCBDT01QT05FTlRfTkFNRSA9ICdhdXRoJztcblxuaW50ZXJmYWNlIFVzZXJJbmZvIHtcbiAgdWlkPzogc3RyaW5nO1xuICBnZW5kZXI/OiBzdHJpbmc7XG4gIGF2YXRhclVybD86IHN0cmluZztcbiAgcGljdHVyZT86IHN0cmluZztcbiAgZW1haWw/OiBzdHJpbmc7XG4gIGVtYWlsX3ZlcmlmaWVkPzogYm9vbGVhbjtcbiAgcGhvbmVfbnVtYmVyPzogc3RyaW5nO1xuICB1c2VybmFtZT86IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgYmlydGhkYXRlPzogc3RyaW5nO1xuICB6b25laW5mbz86IHN0cmluZztcbiAgbG9jYWxlPzogc3RyaW5nO1xuICBzdWI/OiBzdHJpbmc7XG4gIGNyZWF0ZWRfZnJvbT86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElVc2VyT3B0aW9ucyB7XG4gIGNhY2hlOiBhbnk7XG4gIC8vIHJlcXVlc3Q6IGFueTtcbiAgb2F1dGhJbnN0YW5jZTogQ2xvdWRiYXNlT0F1dGhcbn1cblxuY2xhc3MgVXNlciB7XG4gIHB1YmxpYyB1aWQ/OiBzdHJpbmc7XG4gIHB1YmxpYyBnZW5kZXI/OiBzdHJpbmc7XG4gIHB1YmxpYyBhdmF0YXJVcmw/OiBzdHJpbmc7XG4gIHB1YmxpYyBwaWN0dXJlPzogc3RyaW5nO1xuICBwdWJsaWMgZW1haWw/OiBzdHJpbmc7XG4gIHB1YmxpYyBlbWFpbF92ZXJpZmllZD86IGJvb2xlYW47XG4gIHB1YmxpYyBwaG9uZV9udW1iZXI/OiBzdHJpbmc7XG4gIHB1YmxpYyB1c2VybmFtZT86IHN0cmluZztcbiAgcHVibGljIG5hbWU/OiBzdHJpbmc7XG4gIHB1YmxpYyBwcm92aWRlcnM/OiB7XG4gICAgaWQ/OiBzdHJpbmc7XG4gICAgcHJvdmlkZXJfdXNlcl9pZD86IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICB9W11cbiAgcHVibGljIGJpcnRoZGF0ZT86IHN0cmluZztcbiAgcHVibGljIHpvbmVpbmZvPzogc3RyaW5nO1xuICBwdWJsaWMgbG9jYWxlPzogc3RyaW5nO1xuICBwdWJsaWMgc3ViPzogc3RyaW5nO1xuICBwdWJsaWMgY3JlYXRlZF9mcm9tPzogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2NhY2hlOiBhbnk7XG4gIHByaXZhdGUgX29hdXRoSW5zdGFuY2U6IENsb3VkYmFzZU9BdXRoIC8vIENsb3VkYmFzZU9BdXRoIOexu+Wei1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElVc2VyT3B0aW9ucykge1xuICAgIGNvbnN0IHsgY2FjaGUsIG9hdXRoSW5zdGFuY2UgfSA9IG9wdGlvbnM7XG4gICAgdGhpcy5fY2FjaGUgPSBjYWNoZTtcbiAgICB0aGlzLl9vYXV0aEluc3RhbmNlID0gb2F1dGhJbnN0YW5jZVxuXG4gICAgdGhpcy5fc2V0VXNlckluZm8oKTtcbiAgfVxuICAvKipcbiAgICog6I635Y+W5pys5Zyw55So5oi35L+h5oGvLeWQjOatpVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNoZWNrTG9jYWxJbmZvKCkge1xuICAgIHRoaXMudWlkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygndWlkJykgYXMgc3RyaW5nO1xuICAgIHRoaXMuZ2VuZGVyID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnZ2VuZGVyJykgYXMgc3RyaW5nO1xuICAgIHRoaXMucGljdHVyZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3BpY3R1cmUnKSBhcyBzdHJpbmc7XG4gICAgdGhpcy5hdmF0YXJVcmwgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdhdmF0YXJVcmwnKSBhcyBzdHJpbmc7XG4gICAgdGhpcy5lbWFpbCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2VtYWlsJykgYXMgc3RyaW5nO1xuICAgIHRoaXMuZW1haWxfdmVyaWZpZWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdlbWFpbF92ZXJpZmllZCcpIGFzIGJvb2xlYW47XG4gICAgdGhpcy5waG9uZV9udW1iZXIgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdwaG9uZV9udW1iZXInKSBhcyBzdHJpbmdcbiAgICB0aGlzLnVzZXJuYW1lID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygndXNlcm5hbWUnKSBhcyBzdHJpbmdcbiAgICB0aGlzLm5hbWUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCduYW1lJykgYXMgc3RyaW5nXG4gICAgdGhpcy5iaXJ0aGRhdGUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdiaXJ0aGRhdGUnKSBhcyBzdHJpbmdcbiAgICB0aGlzLnpvbmVpbmZvID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnem9uZWluZm8nKSBhcyBzdHJpbmdcbiAgICB0aGlzLmxvY2FsZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2xvY2FsZScpIGFzIHN0cmluZ1xuICAgIHRoaXMuc3ViID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnc3ViJykgYXMgc3RyaW5nXG4gICAgdGhpcy5jcmVhdGVkX2Zyb20gPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdjcmVhdGVkX2Zyb20nKSBhcyBzdHJpbmdcbiAgICB0aGlzLnByb3ZpZGVycyA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3Byb3ZpZGVycycpIGFzIGFueVxuICB9XG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnlKjmiLfkv6Hmga8t5byC5q2lXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hlY2tMb2NhbEluZm9Bc3luYygpIHtcbiAgICB0aGlzLnVpZCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygndWlkJyk7XG4gICAgdGhpcy5nZW5kZXIgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2dlbmRlcicpO1xuICAgIHRoaXMucGljdHVyZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3BpY3R1cmUnKSBhcyBzdHJpbmc7XG4gICAgdGhpcy5hdmF0YXJVcmwgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2F2YXRhclVybCcpO1xuICAgIHRoaXMuZW1haWwgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ2VtYWlsJyk7XG4gICAgdGhpcy5lbWFpbF92ZXJpZmllZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2VtYWlsX3ZlcmlmaWVkJykgYXMgYm9vbGVhbjtcbiAgICB0aGlzLnBob25lX251bWJlciA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3Bob25lX251bWJlcicpIGFzIHN0cmluZ1xuICAgIHRoaXMudXNlcm5hbWUgPSBhd2FpdCB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvQXN5bmMoJ3VzZXJuYW1lJylcbiAgICB0aGlzLm5hbWUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCduYW1lJykgYXMgc3RyaW5nXG4gICAgdGhpcy5iaXJ0aGRhdGUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdiaXJ0aGRhdGUnKSBhcyBzdHJpbmdcbiAgICB0aGlzLnpvbmVpbmZvID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnem9uZWluZm8nKSBhcyBzdHJpbmdcbiAgICB0aGlzLmxvY2FsZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2xvY2FsZScpIGFzIHN0cmluZ1xuICAgIHRoaXMuc3ViID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnc3ViJykgYXMgc3RyaW5nXG4gICAgdGhpcy5jcmVhdGVkX2Zyb20gPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdjcmVhdGVkX2Zyb20nKSBhcyBzdHJpbmdcbiAgICB0aGlzLnByb3ZpZGVycyA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3Byb3ZpZGVycycpIGFzIGFueVxuICB9XG5cblxuICAvKipcbiAgICog5pu05paw55So5oi35L+h5oGvXG4gICAqIEBwYXJhbSB1c2VySW5mb1xuICAgKi9cbiAgLy8gQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgLy8gICB0aXRsZTogJ+abtOaWsOeUqOaIt+S/oeaBr+Wksei0pScsXG4gIC8vICAgbWVzc2FnZXM6IFtcbiAgLy8gICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAvLyAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnVwZGF0ZSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gIC8vICAgICAnICAyIC0g55So5oi35L+h5oGv5Lit5piv5ZCm5YyF5ZCr6Z2e5rOV5YC8JyxcbiAgLy8gICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gIC8vICAgXVxuICAvLyB9KVxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKHVzZXJJbmZvOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IG5hbWUsIGdlbmRlciwgYXZhdGFyVXJsLCBwcm92aW5jZSwgY291bnRyeSwgY2l0eSB9ID0gdXNlckluZm87XG4gICAgY29uc3QgbmV3VXNlckluZm8gPSBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuc2V0VXNlclByb2ZpbGUoeyBuYW1lLCBnZW5kZXIsIGF2YXRhclVybCwgcHJvdmluY2UsIGNvdW50cnksIGNpdHkgfSlcblxuICAgIHRoaXMuX3NldExvY2FsVXNlckluZm8obmV3VXNlckluZm8pO1xuICB9XG4gIC8qKlxuICAgKiDmm7TmlrDlr4bnoIFcbiAgICogQHBhcmFtIG5ld1Bhc3N3b3JkXG4gICAqIEBwYXJhbSBvbGRQYXNzd29yZFxuICAgKi9cbiAgLy8gQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgLy8gICB0aXRsZTogJ+abtOaWsOWvhueggeWksei0pScsXG4gIC8vICAgbWVzc2FnZXM6IFtcbiAgLy8gICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAvLyAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnVwZGF0ZVBhc3N3b3JkKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgLy8gICAgICcgIDMgLSDmlrDlr4bnoIHkuK3mmK/lkKbljIXlkKvpnZ7ms5XlrZfnrKYnLFxuICAvLyAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgLy8gICBdXG4gIC8vIH0pXG4gIHB1YmxpYyB1cGRhdGVQYXNzd29yZChuZXdQYXNzd29yZDogc3RyaW5nLCBvbGRQYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS51cGRhdGVQYXNzd29yZEJ5T2xkKHtcbiAgICAgIG9sZF9wYXNzd29yZDogb2xkUGFzc3dvcmQsXG4gICAgICBuZXdfcGFzc3dvcmQ6IG5ld1Bhc3N3b3JkXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiDmm7TmlrDnlKjmiLflkI1cbiAgICogQHBhcmFtIHVzZXJuYW1lXG4gICAqL1xuICAvLyBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAvLyAgIHRpdGxlOiAn5pu05paw55So5oi35ZCN5aSx6LSlJyxcbiAgLy8gICBtZXNzYWdlczogW1xuICAvLyAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gIC8vICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlVXNlcm5hbWUoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAvLyAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6hueUqOaIt+WQjeWvhueggeeZu+W9lScsXG4gIC8vICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAvLyAgIF1cbiAgLy8gfSlcbiAgcHVibGljIHVwZGF0ZVVzZXJuYW1lKHVzZXJuYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHVzZXJuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgLy8gdGhyb3dFcnJvcihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsICd1c2VybmFtZSBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMudXBkYXRlKHtcbiAgICAgIHVzZXJuYW1lXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiDliLfmlrDmnKzlnLDnlKjmiLfkv6Hmga/jgILlvZPnlKjmiLflnKjlhbbku5blrqLmiLfnq6/mm7TmlrDnlKjmiLfkv6Hmga/kuYvlkI7vvIzlj6/ku6XosIPnlKjmraTmjqXlj6PlkIzmraXmm7TmlrDkuYvlkI7nmoTkv6Hmga/jgIJcbiAgICovXG4gIC8vIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gIC8vICAgdGl0bGU6ICfliLfmlrDmnKzlnLDnlKjmiLfkv6Hmga/lpLHotKUnLFxuICAvLyAgIG1lc3NhZ2VzOiBbXG4gIC8vICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgLy8gICAgICcgIDEgLSDosIPnlKggVXNlci5yZWZyZXNoKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgLy8gICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gIC8vICAgXVxuICAvLyB9KVxuICBwdWJsaWMgYXN5bmMgcmVmcmVzaCgpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IG5ld1VzZXJJbmZvID0gYXdhaXQgdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLmdldFVzZXJJbmZvKClcbiAgICB0aGlzLl9zZXRMb2NhbFVzZXJJbmZvKG5ld1VzZXJJbmZvKTtcbiAgICByZXR1cm4gbmV3VXNlckluZm87XG4gIH1cblxuICBwcml2YXRlIF9nZXRMb2NhbFVzZXJJbmZvKGtleTogc3RyaW5nKTogc3RyaW5nIHwgYm9vbGVhbiB7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCB1c2VySW5mbyA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKHVzZXJJbmZvS2V5KTtcbiAgICByZXR1cm4gdXNlckluZm9ba2V5XTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2dldExvY2FsVXNlckluZm9Bc3luYyhrZXk6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCB1c2VySW5mbyA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmModXNlckluZm9LZXkpO1xuICAgIHJldHVybiB1c2VySW5mb1trZXldO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0VXNlckluZm8oKSB7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCB1c2VySW5mbyA9IHRoaXMuX2NhY2hlLmdldFN0b3JlKHVzZXJJbmZvS2V5KTtcbiAgICBbXG4gICAgICAndWlkJyxcbiAgICAgICdlbWFpbCcsXG4gICAgICAnbmFtZScsXG4gICAgICAnZ2VuZGVyJyxcbiAgICAgICdwaWN0dXJlJyxcbiAgICAgICdhdmF0YXJVcmwnLFxuICAgICAgJ3Bob25lJyxcbiAgICAgICdlbWFpbF92ZXJpZmllZCcsXG4gICAgICAncGhvbmVfbnVtYmVyJyxcbiAgICAgICdiaXJ0aGRhdGUnLFxuICAgICAgJ3pvbmVpbmZvJyxcbiAgICAgICdsb2NhbGUnLFxuICAgICAgJ3N1YicsXG4gICAgICAnY3JlYXRlZF9mcm9tJyxcbiAgICAgICdwcm92aWRlcnMnLFxuICAgICAgJ3VzZXJuYW1lJ1xuICAgIF0uZm9yRWFjaChpbmZvS2V5ID0+IHtcbiAgICAgIHRoaXNbaW5mb0tleV0gPSB1c2VySW5mb1tpbmZvS2V5XTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldExvY2FsVXNlckluZm8odXNlckluZm86IGFueSkge1xuICAgIGNvbnN0IHsgdXNlckluZm9LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgdGhpcy5fY2FjaGUuc2V0U3RvcmUodXNlckluZm9LZXksIHVzZXJJbmZvKTtcbiAgICB0aGlzLl9zZXRVc2VySW5mbygpO1xuICB9XG59XG5pbnRlcmZhY2UgSUxvZ2luU3RhdGVPcHRpb25zIGV4dGVuZHMgSVVzZXJPcHRpb25zIHtcbiAgZW52SWQ6IHN0cmluZztcbn1cbmV4cG9ydCBjbGFzcyBMb2dpblN0YXRlIHtcbiAgcHVibGljIHVzZXI6IGFueTtcbiAgcHVibGljIG9hdXRoTG9naW5TdGF0ZTogYW55XG5cbiAgcHJpdmF0ZSBfb2F1dGhJbnN0YW5jZTogQ2xvdWRiYXNlT0F1dGhcbiAgcHJpdmF0ZSBfY2FjaGU6IGFueTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJTG9naW5TdGF0ZU9wdGlvbnMpIHtcbiAgICBjb25zdCB7IGVudklkLCBjYWNoZSwgb2F1dGhJbnN0YW5jZSB9ID0gb3B0aW9ucztcbiAgICBpZiAoIWVudklkKSB7XG4gICAgICAvLyB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ2VudklkIGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuICAgIHRoaXMuX2NhY2hlID0gY2FjaGU7XG4gICAgdGhpcy5fb2F1dGhJbnN0YW5jZSA9IG9hdXRoSW5zdGFuY2VcblxuICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKHtcbiAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgIG9hdXRoSW5zdGFuY2VcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjaGVja0xvY2FsU3RhdGUoKSB7XG4gICAgdGhpcy5vYXV0aExvZ2luU3RhdGUgPSB0aGlzLl9vYXV0aEluc3RhbmNlPy5hdXRoQXBpLmhhc0xvZ2luU3RhdGVTeW5jKClcbiAgICB0aGlzLnVzZXIuY2hlY2tMb2NhbEluZm8oKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjaGVja0xvY2FsU3RhdGVBc3luYygpIHtcbiAgICBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlPy5hdXRoQXBpLmdldExvZ2luU3RhdGUoKVxuICAgIGF3YWl0IHRoaXMudXNlci5jaGVja0xvY2FsSW5mb0FzeW5jKCk7XG4gIH1cbn1cblxuY2xhc3MgQXV0aCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2NvbmZpZzogYW55O1xuICBwcml2YXRlIHJlYWRvbmx5IF9jYWNoZTogYW55XG4gIC8vIHByaXZhdGUgcmVhZG9ubHkgX3JlcXVlc3Q6IGFueTtcblxuICBwcml2YXRlIF9vYXV0aEluc3RhbmNlOiBDbG91ZGJhc2VPQXV0aFxuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogYW55ICYgeyBjYWNoZTogYW55LCByZXF1ZXN0PzogYW55LCBydW50aW1lPzogc3RyaW5nIH0pIHtcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gICAgdGhpcy5fY2FjaGUgPSBjb25maWcuY2FjaGU7XG4gICAgLy8gdGhpcy5fcmVxdWVzdCA9IGNvbmZpZy5yZXF1ZXN0O1xuICAgIHRoaXMuX29hdXRoSW5zdGFuY2UgPSBjb25maWcub2F1dGhJbnN0YW5jZVxuICB9XG5cbiAgLyoqXG4gICog57uR5a6a5omL5py65Y+3XG4gICogQHBhcmFtIHBob25lTnVtYmVyXG4gICogQHBhcmFtIHBob25lQ29kZVxuICAqL1xuICAvLyBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAvLyAgIHRpdGxlOiAn57uR5a6a5omL5py65Y+35aSx6LSlJyxcbiAgLy8gICBtZXNzYWdlczogW1xuICAvLyAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gIC8vICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5iaW5kUGhvbmVOdW1iZXIoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAvLyAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huefreS/oemqjOivgeeggeeZu+W9lScsXG4gIC8vICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAvLyAgIF1cbiAgLy8gfSlcbiAgcHVibGljIGFzeW5jIGJpbmRQaG9uZU51bWJlcihwYXJhbXM6IGF1dGhNb2RlbHMuQmluZFBob25lUmVxdWVzdCkge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuYmluZFBob25lKHBhcmFtcylcbiAgfVxuXG4gIC8qKlxuICAgKiDop6Pnu5HkuInmlrnnu5HlrppcbiAgICogQHBhcmFtIGxvZ2luVHlwZVxuICAgKi9cbiAgLy8gQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgLy8gICB0aXRsZTogJ+ino+mZpOS4ieaWuee7keWumuWksei0pScsXG4gIC8vICAgbWVzc2FnZXM6IFtcbiAgLy8gICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAvLyAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkudW5saW5rKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgLy8gICAgICcgIDIgLSDlvZPliY3otKbmiLfmmK/lkKblt7Lnu4/kuI7mraTnmbvlvZXmlrnlvI/op6Pnu5EnLFxuICAvLyAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgLy8gICBdXG4gIC8vIH0pXG4gIHB1YmxpYyBhc3luYyB1bmJpbmRQcm92aWRlcihwYXJhbXM6IGF1dGhNb2RlbHMuVW5iaW5kUHJvdmlkZXJSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS51bmJpbmRQcm92aWRlcihwYXJhbXMpXG4gIH1cblxuICAvKipcbiAqIOabtOaWsOmCrueuseWcsOWdgFxuICogQHBhcmFtIGVtYWlsXG4gKiBAcGFyYW0gc3Vkb190b2tlblxuICogQHBhcmFtIHZlcmlmaWNhdGlvbl90b2tlblxuICovXG4gIC8vIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gIC8vICAgdGl0bGU6ICfnu5Hlrprpgq7nrrHlnLDlnYDlpLHotKUnLFxuICAvLyAgIG1lc3NhZ2VzOiBbXG4gIC8vICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgLy8gICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmJpbmRFbWFpbCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gIC8vICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG6YKu566x5a+G56CB55m75b2VJyxcbiAgLy8gICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gIC8vICAgXVxuICAvLyB9KVxuICBwdWJsaWMgYmluZEVtYWlsKHBhcmFtczogYXV0aE1vZGVscy5CaW5kRW1haWxSZXF1ZXN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5iaW5kRW1haWwocGFyYW1zKVxuICB9XG5cbiAgLyoqXG4gICAqIHZlcmlmeVxuICAgKiBAcGFyYW0ge2F1dGhNb2RlbHMuVmVyaWZ5UmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGF1dGhNb2RlbHMuVmVyaWZ5UmVzcG9uc2U+fVxuICAgKiBAbWVtYmVyb2YgVXNlclxuICAgKi9cbiAgLy8gQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgLy8gICB0aXRsZTogJ+mqjOivgeeggemqjOivgeWksei0pScsXG4gIC8vICAgbWVzc2FnZXM6IFtcbiAgLy8gICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAvLyAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkudmVyaWZ5KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgLy8gICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobmiYvmnLrpqozor4HnoIEv6YKu566x55m75b2VJyxcbiAgLy8gICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gIC8vICAgXVxuICAvLyB9KVxuICBwdWJsaWMgYXN5bmMgdmVyaWZ5KHBhcmFtczogYXV0aE1vZGVscy5WZXJpZnlSZXF1ZXN0KTogUHJvbWlzZTxhdXRoTW9kZWxzLlZlcmlmeVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS52ZXJpZnkocGFyYW1zKVxuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPlumqjOivgeeggVxuICAgKiBAcGFyYW0ge2F1dGhNb2RlbHMuR2V0VmVyaWZpY2F0aW9uUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGF1dGhNb2RlbHMuR2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+fVxuICAgKiBAbWVtYmVyb2YgVXNlclxuICAgKi9cbiAgLy8gQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgLy8gICB0aXRsZTogJ+iOt+WPlumqjOivgeeggeWksei0pScsXG4gIC8vICAgbWVzc2FnZXM6IFtcbiAgLy8gICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAvLyAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuZ2V0VmVyaWZpY2F0aW9uKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgLy8gICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobmiYvmnLrpqozor4HnoIEv6YKu566x55m75b2VJyxcbiAgLy8gICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gIC8vICAgXVxuICAvLyB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0VmVyaWZpY2F0aW9uKFxuICAgIHBhcmFtczogYXV0aE1vZGVscy5HZXRWZXJpZmljYXRpb25SZXF1ZXN0LFxuICApOiBQcm9taXNlPGF1dGhNb2RlbHMuR2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLmdldFZlcmlmaWNhdGlvbihwYXJhbXMpXG4gIH1cblxuICAvKipcbiAgICog6I635Y+W5b2T5YmN55m75b2V55qE55So5oi35L+h5oGvLeWQjOatpVxuICAgKi9cbiAgZ2V0IGN1cnJlbnRVc2VyKCkge1xuICAgIGlmICh0aGlzLl9jYWNoZS5tb2RlID09PSAnYXN5bmMnKSB7XG4gICAgICAvLyBhc3luYyBzdG9yYWdl55qE5bmz5Y+w6LCD55So5q2kQVBJ5o+Q56S6XG4gICAgICAvLyBwcmludFdhcm4oRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLCAnY3VycmVudCBwbGF0Zm9ybVxcJ3Mgc3RvcmFnZSBpcyBhc3luY2hyb25vdXMsIHBsZWFzZSB1c2UgZ2V0Q3VycmVudFVzZXIgaW5zdGVlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGxvZ2luU3RhdGUgPSB0aGlzLmhhc0xvZ2luU3RhdGUoKTtcblxuICAgIGlmIChsb2dpblN0YXRlKSB7XG4gICAgICByZXR1cm4gbG9naW5TdGF0ZS51c2VyIHx8IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5blvZPliY3nmbvlvZXnmoTnlKjmiLfkv6Hmga8t5byC5q2lXG4gICAqL1xuICAvLyBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAvLyAgIHRpdGxlOiAn6I635Y+W55So5oi35L+h5oGv5aSx6LSlJyxcbiAgLy8gICBtZXNzYWdlczogW1xuICAvLyAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gIC8vICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5nZXRDdXJyZW5Vc2VyKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgLy8gICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gIC8vICAgXVxuICAvLyB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0Q3VycmVudFVzZXIoKSB7XG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IGF3YWl0IHRoaXMuZ2V0TG9naW5TdGF0ZSgpO1xuICAgIGlmIChsb2dpblN0YXRlKSB7XG4gICAgICBhd2FpdCBsb2dpblN0YXRlLnVzZXIuY2hlY2tMb2NhbEluZm9Bc3luYygpO1xuICAgICAgcmV0dXJuIGxvZ2luU3RhdGUudXNlciB8fCBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiDljL/lkI3nmbvlvZVcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIC8vIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gIC8vICAgdGl0bGU6ICfljL/lkI3nmbvlvZXlpLHotKUnLFxuICAvLyAgIG1lc3NhZ2VzOiBbXG4gIC8vICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgLy8gICAgICcgIDEgLSDlvZPliY3njq/looPmmK/lkKblvIDlkK/kuobljL/lkI3nmbvlvZUnLFxuICAvLyAgICAgJyAgMiAtIOiwg+eUqCBhdXRoKCkuc2lnbkluQW5vbnltb3VzbHkoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAvLyAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgLy8gICBdXG4gIC8vIH0pXG4gIHB1YmxpYyBhc3luYyBzaWduSW5Bbm9ueW1vdXNseSgpOiBQcm9taXNlPGFueT4ge1xuICAgIGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5zaWduSW5Bbm9ueW1vdXNseSgpXG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgb2F1dGhJbnN0YW5jZTogdGhpcy5fb2F1dGhJbnN0YW5jZSxcbiAgICB9KVxuXG4gICAgYXdhaXQgbG9naW5TdGF0ZS5jaGVja0xvY2FsU3RhdGVBc3luYygpO1xuICAgIGF3YWl0IGxvZ2luU3RhdGUudXNlci5yZWZyZXNoKCk7XG4gICAgcmV0dXJuIGxvZ2luU3RhdGVcbiAgfVxuXG4gIC8qKlxuICAgKiDorr7nva7ojrflj5boh6rlrprkuYnnmbvlvZUgdGlja2V0IOWHveaVsFxuICAgKiBAcGFyYW0ge2F1dGhNb2RlbHMuR2V0Q3VzdG9tU2lnblRpY2tldEZufSBnZXRUaWNrRm5cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIHB1YmxpYyBzZXRDdXN0b21TaWduRnVuYyhnZXRUaWNrRm46IGF1dGhNb2RlbHMuR2V0Q3VzdG9tU2lnblRpY2tldEZuKTogdm9pZCB7XG4gICAgdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnNldEN1c3RvbVNpZ25GdW5jKGdldFRpY2tGbilcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgKiBAbWVtYmVyb2YgQXV0aFxuICAgKi9cbiAgLy8gQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgLy8gICB0aXRsZTogJ+iHquWumuS5ieeZu+W9leWksei0pScsXG4gIC8vICAgbWVzc2FnZXM6IFtcbiAgLy8gICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAvLyAgICAgJyAgMSAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOWQr+S6huiHquWumuS5ieeZu+W9lScsXG4gIC8vICAgICAnICAyIC0g6LCD55SoIGF1dGgoKS5zaWduSW5XaXRoQ3VzdG9tVGlja2V0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgLy8gICAgICcgIDMgLSB0aWNrZXQg5piv5ZCm5b2S5bGe5LqO5b2T5YmN546v5aKDJyxcbiAgLy8gICAgICcgIDQgLSDliJvlu7ogdGlja2V0IOeahOiHquWumuS5ieeZu+W9leengemSpeaYr+WQpui/h+acnycsXG4gIC8vICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAvLyAgIF1cbiAgLy8gfSlcbiAgcHVibGljIGFzeW5jIHNpZ25JbldpdGhDdXN0b21UaWNrZXQoKTogUHJvbWlzZTxhbnk+IHtcbiAgICBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuc2lnbkluV2l0aEN1c3RvbVRpY2tldCgpXG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgb2F1dGhJbnN0YW5jZTogdGhpcy5fb2F1dGhJbnN0YW5jZSxcbiAgICB9KVxuXG4gICAgYXdhaXQgbG9naW5TdGF0ZS5jaGVja0xvY2FsU3RhdGVBc3luYygpO1xuICAgIGF3YWl0IGxvZ2luU3RhdGUudXNlci5yZWZyZXNoKCk7XG4gICAgcmV0dXJuIGxvZ2luU3RhdGVcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge2F1dGhNb2RlbHMuU2lnbkluUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqIEBtZW1iZXJvZiBBdXRoXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbkluKHBhcmFtczogYXV0aE1vZGVscy5TaWduSW5SZXF1ZXN0KTogUHJvbWlzZTxhbnk+IHtcbiAgICBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuc2lnbkluKHBhcmFtcylcbiAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICBvYXV0aEluc3RhbmNlOiB0aGlzLl9vYXV0aEluc3RhbmNlLFxuICAgIH0pXG5cbiAgICBhd2FpdCBsb2dpblN0YXRlLmNoZWNrTG9jYWxTdGF0ZUFzeW5jKCk7XG4gICAgYXdhaXQgbG9naW5TdGF0ZS51c2VyLnJlZnJlc2goKTtcbiAgICByZXR1cm4gbG9naW5TdGF0ZVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7YXV0aE1vZGVscy5TaWduVXBSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduVXAocGFyYW1zOiBhdXRoTW9kZWxzLlNpZ25VcFJlcXVlc3QpOiBQcm9taXNlPGFueT4ge1xuICAgIGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5zaWduVXAocGFyYW1zKVxuICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBuZXcgTG9naW5TdGF0ZSh7XG4gICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgIG9hdXRoSW5zdGFuY2U6IHRoaXMuX29hdXRoSW5zdGFuY2UsXG4gICAgfSlcblxuICAgIGF3YWl0IGxvZ2luU3RhdGUuY2hlY2tMb2NhbFN0YXRlQXN5bmMoKTtcbiAgICBhd2FpdCBsb2dpblN0YXRlLnVzZXIucmVmcmVzaCgpO1xuICAgIHJldHVybiBsb2dpblN0YXRlXG4gIH1cblxuICAvKipcbiAgICog6K6+572u5a+G56CBXG4gICAqIEBwYXJhbSB7YXV0aE1vZGVscy5TZXRQYXNzd29yZFJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZXRQYXNzd29yZChwYXJhbXM6IGF1dGhNb2RlbHMuU2V0UGFzc3dvcmRSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5zZXRQYXNzd29yZChwYXJhbXMpXG4gIH1cblxuICAvKipcbiAgICog5qOA5rWL55So5oi35ZCN5piv5ZCm5bey57uP5Y2g55SoXG4gICAqIEBwYXJhbSB1c2VybmFtZVxuICAgKi9cbiAgLy8gQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgLy8gICB0aXRsZTogJ+iOt+WPlueUqOaIt+aYr+WQpuiiq+WNoOeUqOWksei0pScsXG4gIC8vICAgbWVzc2FnZXM6IFtcbiAgLy8gICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAvLyAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuaXNVc2VybmFtZVJlZ2lzdGVyZWQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAvLyAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgLy8gICBdXG4gIC8vIH0pXG4gIHB1YmxpYyBhc3luYyBpc1VzZXJuYW1lUmVnaXN0ZXJlZCh1c2VybmFtZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKHR5cGVvZiB1c2VybmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCAndXNlcm5hbWUgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXJ5UmVzID0gYXdhaXQgdGhpcy5xdWVyeVVzZXIoe1xuICAgICAgdXNlcm5hbWVcbiAgICB9KVxuXG4gICAgcmV0dXJuIHBhcnNlSW50KHF1ZXJ5UmVzLnRvdGFsKSA/IHRydWUgOiBmYWxzZVxuICB9XG5cbiAgLyoqXG4gICAqIOeZu+WHulxuICAgKi9cbiAgLy8gQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgLy8gICB0aXRsZTogJ+eUqOaIt+eZu+WHuuWksei0pScsXG4gIC8vICAgbWVzc2FnZXM6IFtcbiAgLy8gICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAvLyAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuc2lnbk91dCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gIC8vICAgICAnICAyIC0g5b2T5YmN55So5oi35piv5ZCm5Li65Yy/5ZCN55m75b2V77yI5Yy/5ZCN55m75b2V5LiN5pSv5oyBc2lnbk91dO+8iScsXG4gIC8vICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAvLyAgIF1cbiAgLy8gfSlcbiAgcHVibGljIGFzeW5jIHNpZ25PdXQoKSB7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuc2lnbk91dCgpXG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyh1c2VySW5mb0tleSlcbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnmbvlvZXmgIEt5ZCM5q2lXG4gICAqL1xuICBwdWJsaWMgaGFzTG9naW5TdGF0ZSgpOiBhbnkgfCBudWxsIHtcbiAgICBpZiAodGhpcy5fY2FjaGUubW9kZSA9PT0gJ2FzeW5jJykge1xuICAgICAgLy8gYXN5bmMgc3RvcmFnZeeahOW5s+WPsOiwg+eUqOatpEFQSeaPkOekulxuICAgICAgLy8gcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwgJ2N1cnJlbnQgcGxhdGZvcm1cXCdzIHN0b3JhZ2UgaXMgYXN5bmNocm9ub3VzLCBwbGVhc2UgdXNlIGdldExvZ2luU3RhdGUgaW5zdGVlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9hdXRoTG9naW5TdGF0ZSA9IHRoaXMuX29hdXRoSW5zdGFuY2U/LmF1dGhBcGkuaGFzTG9naW5TdGF0ZVN5bmMoKVxuICAgIGlmIChvYXV0aExvZ2luU3RhdGUpIHtcbiAgICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBuZXcgTG9naW5TdGF0ZSh7XG4gICAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIG9hdXRoSW5zdGFuY2U6IHRoaXMuX29hdXRoSW5zdGFuY2UsXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGxvZ2luU3RhdGVcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6I635Y+W5pys5Zyw55m75b2V5oCBLeW8guatpVxuICAgKiDmraRBUEnkuLrlhbzlrrnlvILmraVzdG9yYWdl55qE5bmz5Y+wXG4gICAqL1xuICAvLyBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAvLyAgIHRpdGxlOiAn6I635Y+W5pys5Zyw55m75b2V5oCB5aSx6LSlJyxcbiAgLy8gICBtZXNzYWdlczogW1xuICAvLyAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gIC8vICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5nZXRMb2dpblN0YXRlKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgLy8gICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gIC8vICAgXVxuICAvLyB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0TG9naW5TdGF0ZSgpIHtcbiAgICBjb25zdCBvYXV0aExvZ2luU3RhdGUgPSBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuZ2V0TG9naW5TdGF0ZSgpXG4gICAgaWYgKG9hdXRoTG9naW5TdGF0ZSkge1xuICAgICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgb2F1dGhJbnN0YW5jZTogdGhpcy5fb2F1dGhJbnN0YW5jZSxcbiAgICAgIH0pXG4gICAgICByZXR1cm4gbG9naW5TdGF0ZVxuICAgIH1cblxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICAvLyBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAvLyAgIHRpdGxlOiAn6I635Y+W55So5oi35L+h5oGv5aSx6LSlJyxcbiAgLy8gICBtZXNzYWdlczogW1xuICAvLyAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gIC8vICAgICAnICAxIC0g5piv5ZCm5bey55m75b2VJyxcbiAgLy8gICAgICcgIDIgLSDosIPnlKggYXV0aCgpLmdldFVzZXJJbmZvKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgLy8gICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gIC8vICAgXVxuICAvLyB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0VXNlckluZm8oKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLmdldFVzZXJJbmZvKClcbiAgfVxuXG5cbiAgLyoqXG4gICAqIOS4uuW3suaciei0puaIt+e7keesrOS4ieaWuei0puaIt1xuICAgKiBAcGFyYW0ge2F1dGhNb2RlbHMuQmluZFdpdGhQcm92aWRlclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIC8vIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gIC8vICAgdGl0bGU6ICfnu5HlrprnrKzkuInmlrnnmbvlvZXmlrnlvI/lpLHotKUnLFxuICAvLyAgIG1lc3NhZ2VzOiBbXG4gIC8vICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgLy8gICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmJpbmRXaXRoUHJvdmlkZXIoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAvLyAgICAgJyAgMiAtIOatpOi0puaIt+aYr+WQpuW3sue7j+e7keWumuatpOesrOS4ieaWuScsXG4gIC8vICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAvLyAgIF1cbiAgLy8gfSlcbiAgcHVibGljIGFzeW5jIGJpbmRXaXRoUHJvdmlkZXIoXG4gICAgcGFyYW1zOiBhdXRoTW9kZWxzLkJpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLmJpbmRXaXRoUHJvdmlkZXIocGFyYW1zKVxuICB9XG5cbiAgLyoqXG4gICAqIOafpeivoueUqOaIt1xuICAgKiBAcGFyYW0ge2F1dGhNb2RlbHMuUXVlcnlVc2VyUHJvZmlsZVJlcXVlc3R9IGFwcGVuZGVkX3BhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhdXRoTW9kZWxzLlVzZXJQcm9maWxlPn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIHB1YmxpYyBhc3luYyBxdWVyeVVzZXIoXG4gICAgcXVlcnlPYmo6IGF1dGhNb2RlbHMuUXVlcnlVc2VyUHJvZmlsZVJlcXVlc3QsXG4gICk6IFByb21pc2U8YXV0aE1vZGVscy5RdWVyeVVzZXJQcm9maWxlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnF1ZXJ5VXNlclByb2ZpbGUocXVlcnlPYmopXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0QWNjZXNzVG9rZW4oKSB7XG4gICAgY29uc3Qgb2F1dGhBY2Nlc3NUb2tlblJlcyA9IGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2Uub2F1dGgyY2xpZW50LmdldEFjY2Vzc1Rva2VuKClcbiAgICByZXR1cm4ge1xuICAgICAgYWNjZXNzVG9rZW46IG9hdXRoQWNjZXNzVG9rZW5SZXMsXG4gICAgICBlbnY6IHRoaXMuX2NvbmZpZy5lbnZcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdyYW50UHJvdmlkZXJUb2tlbihcbiAgICBwYXJhbXM6IGF1dGhNb2RlbHMuR3JhbnRQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxhdXRoTW9kZWxzLkdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5ncmFudFByb3ZpZGVyVG9rZW4ocGFyYW1zKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNpZ25JbldpdGhQcm92aWRlcihcbiAgICBwYXJhbXM6IGF1dGhNb2RlbHMuU2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxhbnk+IHtcbiAgICBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuc2lnbkluV2l0aFByb3ZpZGVyKHBhcmFtcylcbiAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICBvYXV0aEluc3RhbmNlOiB0aGlzLl9vYXV0aEluc3RhbmNlLFxuICAgIH0pXG5cbiAgICBhd2FpdCBsb2dpblN0YXRlLmNoZWNrTG9jYWxTdGF0ZUFzeW5jKCk7XG4gICAgYXdhaXQgbG9naW5TdGF0ZS51c2VyLnJlZnJlc2goKTtcbiAgICByZXR1cm4gbG9naW5TdGF0ZVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdyYW50VG9rZW4ocGFyYW1zOiBhdXRoTW9kZWxzLkdyYW50VG9rZW5SZXF1ZXN0KTogUHJvbWlzZTxhbnk+IHtcbiAgICBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuZ3JhbnRUb2tlbihwYXJhbXMpXG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgb2F1dGhJbnN0YW5jZTogdGhpcy5fb2F1dGhJbnN0YW5jZSxcbiAgICB9KVxuXG4gICAgYXdhaXQgbG9naW5TdGF0ZS5jaGVja0xvY2FsU3RhdGVBc3luYygpO1xuICAgIGF3YWl0IGxvZ2luU3RhdGUudXNlci5yZWZyZXNoKCk7XG4gICAgcmV0dXJuIGxvZ2luU3RhdGVcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZW5Qcm92aWRlclJlZGlyZWN0VXJpKFxuICAgIHBhcmFtczogYXV0aE1vZGVscy5HZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxhdXRoTW9kZWxzLkdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuZ2VuUHJvdmlkZXJSZWRpcmVjdFVyaShwYXJhbXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVzZXRQYXNzd29yZChwYXJhbXM6IGF1dGhNb2RlbHMuUmVzZXRQYXNzd29yZFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnJlc2V0UGFzc3dvcmQocGFyYW1zKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRldmljZUF1dGhvcml6ZShwYXJhbXM6IGF1dGhNb2RlbHMuRGV2aWNlQXV0aG9yaXplUmVxdWVzdCk6IFByb21pc2U8YXV0aE1vZGVscy5EZXZpY2VBdXRob3JpemVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuZGV2aWNlQXV0aG9yaXplKHBhcmFtcylcbiAgfVxufVxuXG5jb25zdCBjb21wb25lbnQ6IGFueSA9IHtcbiAgbmFtZTogQ09NUE9ORU5UX05BTUUsXG4gIG5hbWVzcGFjZTogJ2F1dGgnLFxuICBlbnRpdHk6IGZ1bmN0aW9uIChjb25maWc6IFBpY2s8YW55LCAncmVnaW9uJyB8ICdwZXJzaXN0ZW5jZSc+ID0geyByZWdpb246ICcnLCBwZXJzaXN0ZW5jZTogJ2xvY2FsJyB9KSB7XG4gICAgaWYgKHRoaXMuYXV0aEluc3RhbmNlKSB7XG4gICAgICAvLyBwcmludFdhcm4oRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLCAnZXZlcnkgY2xvdWRiYXNlIGluc3RhbmNlIHNob3VsZCBoYXMgb25seSBvbmUgYXV0aCBvYmplY3QnKTtcbiAgICAgIHJldHVybiB0aGlzLmF1dGhJbnN0YW5jZTtcbiAgICB9XG4gICAgY29uc3QgeyBhZGFwdGVyLCBydW50aW1lIH0gPSB0aGlzLnBsYXRmb3JtO1xuICAgIC8vIOWmguS4jeaYjuehruaMh+WumnBlcnNpc3RlbmNl5YiZ5LyY5YWI5Y+W5ZCE5bmz5Y+wYWRhcHRlcummlumAie+8jOWFtuasoWxvY2FsU3RvcmFnZVxuICAgIGNvbnN0IG5ld1BlcnNpc3RlbmNlID0gY29uZmlnLnBlcnNpc3RlbmNlIHx8IGFkYXB0ZXIucHJpbWFyeVN0b3JhZ2U7XG4gICAgaWYgKG5ld1BlcnNpc3RlbmNlICYmIChuZXdQZXJzaXN0ZW5jZSAhPT0gdGhpcy5jb25maWcucGVyc2lzdGVuY2UpKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbmZpZyh7IHBlcnNpc3RlbmNlOiBuZXdQZXJzaXN0ZW5jZSB9KVxuICAgIH1cblxuICAgIGNvbnN0IHsgZW52LCBwZXJzaXN0ZW5jZSwgZGVidWcgfSA9IHRoaXMuY29uZmlnO1xuICAgIGNvbnN0IG9hdXRoSW5zdGFuY2UgPSBuZXcgQ2xvdWRiYXNlT0F1dGgoe1xuICAgICAgY2xpZW50SWQ6IGVudixcbiAgICAgIGFwaU9yaWdpbjogdGhpcy5yZXF1ZXN0LmdldEJhc2VFbmRQb2ludCgpLFxuICAgIH0pXG5cbiAgICB0aGlzLm9hdXRoSW5zdGFuY2UgPSBvYXV0aEluc3RhbmNlXG5cbiAgICB0aGlzLmF1dGhJbnN0YW5jZSA9IG5ldyBBdXRoKHtcbiAgICAgIGVudixcbiAgICAgIHJlZ2lvbjogY29uZmlnLnJlZ2lvbixcbiAgICAgIHBlcnNpc3RlbmNlLFxuICAgICAgZGVidWcsXG4gICAgICBjYWNoZTogdGhpcy5jYWNoZSxcbiAgICAgIC8vIHJlcXVlc3Q6IHRoaXMucmVxdWVzdCxcbiAgICAgIHJ1bnRpbWU6IHJ1bnRpbWUsXG4gICAgICBfZnJvbUFwcDogdGhpcyxcbiAgICAgIC8vIG9hdXRoSW5zdGFuY2U6IHRoaXMub2F1dGhJbnN0YW5jZSB8fCAodGhpcyBhcyBhbnkpLm9hdXRoKClcbiAgICAgIG9hdXRoSW5zdGFuY2VcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmF1dGhJbnN0YW5jZTtcbiAgfVxufVxuXG50cnkge1xuICAvLyDlsJ3or5Xoh6rliqjms6jlhozoh7PlhajlsYDlj5jph49jbG91ZGJhc2VcbiAgLy8g5q2k6KGM5Li65Y+q5Zyo5rWP6KeI5Zmo546v5aKD5LiL5pyJ5pWIXG4gIGNsb3VkYmFzZS5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xufSBjYXRjaCAoZSkgeyB9XG5cbmV4cG9ydCB7XG4gIFVzZXJJbmZvLFxuICBBdXRoLFxufTtcbi8qKlxuICogQGFwaSDmiYvliqjms6jlhozoh7NjbG91ZGJhc2UgYXBwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckF1dGgoYXBwOiBQaWNrPGFueSwgJ3JlZ2lzdGVyQ29tcG9uZW50Jz4pIHtcbiAgdHJ5IHtcbiAgICBhcHAucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUud2FybihlKTtcbiAgfVxufVxuXG4iXX0=