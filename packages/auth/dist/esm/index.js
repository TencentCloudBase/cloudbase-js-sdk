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
import { CloudbaseOAuth } from '@cloudbase/oauth';
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
        var oauthInstance = new CloudbaseOAuth({
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
export { Auth, };
export function registerAuth(app) {
    try {
        app.registerComponent(component);
    }
    catch (e) {
        console.warn(e);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsT0FBTyxFQUFjLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBUTdELElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQztBQXlCOUI7SUF3QkUsY0FBWSxPQUFxQjtRQUN2QixJQUFBLEtBQUssR0FBb0IsT0FBTyxNQUEzQixFQUFFLGFBQWEsR0FBSyxPQUFPLGNBQVosQ0FBYTtRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtRQUVuQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUlZLDZCQUFjLEdBQTNCOzs7Z0JBQ0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFXLENBQUM7Z0JBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBVyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQVcsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFXLENBQUM7Z0JBQy9ELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBVyxDQUFDO2dCQUN2RCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBWSxDQUFDO2dCQUMxRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQVcsQ0FBQTtnQkFDcEUsSUFBSSxDQUFDLFFB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O1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBhbnkgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcbi8vIGltcG9ydCB7IHV0aWxzLCBjb25zdGFudHMsIGhlbHBlcnMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcyc7XG4vLyBpbXBvcnQgeyBhbnkgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NhY2hlJztcbi8vIGltcG9ydCB7IGFueSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVxdWVzdCc7XG4vLyBpbXBvcnQgeyBhbnksIGFueSwgYW55LCBhbnkgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2F1dGgnO1xuLy8gaW1wb3J0IHsgYW55IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBhdXRoTW9kZWxzLCBDbG91ZGJhc2VPQXV0aCB9IGZyb20gJ0BjbG91ZGJhc2Uvb2F1dGgnXG5cbmRlY2xhcmUgY29uc3QgY2xvdWRiYXNlOiBhbnk7XG5cbi8vIGNvbnN0IHsgcHJpbnRXYXJuLCB0aHJvd0Vycm9yIH0gPSB1dGlscztcbi8vIGNvbnN0IHsgRVJST1JTLCBDT01NVU5JVFlfU0lURV9VUkwgfSA9IGNvbnN0YW50cztcbi8vIGNvbnN0IHsgY2F0Y2hFcnJvcnNEZWNvcmF0b3IgfSA9IGhlbHBlcnM7XG5cbmNvbnN0IENPTVBPTkVOVF9OQU1FID0gJ2F1dGgnO1xuXG5pbnRlcmZhY2UgVXNlckluZm8ge1xuICB1aWQ/OiBzdHJpbmc7XG4gIGdlbmRlcj86IHN0cmluZztcbiAgYXZhdGFyVXJsPzogc3RyaW5nO1xuICBwaWN0dXJlPzogc3RyaW5nO1xuICBlbWFpbD86IHN0cmluZztcbiAgZW1haWxfdmVyaWZpZWQ/OiBib29sZWFuO1xuICBwaG9uZV9udW1iZXI/OiBzdHJpbmc7XG4gIHVzZXJuYW1lPzogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBiaXJ0aGRhdGU/OiBzdHJpbmc7XG4gIHpvbmVpbmZvPzogc3RyaW5nO1xuICBsb2NhbGU/OiBzdHJpbmc7XG4gIHN1Yj86IHN0cmluZztcbiAgY3JlYXRlZF9mcm9tPzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgSVVzZXJPcHRpb25zIHtcbiAgY2FjaGU6IGFueTtcbiAgLy8gcmVxdWVzdDogYW55O1xuICBvYXV0aEluc3RhbmNlOiBDbG91ZGJhc2VPQXV0aFxufVxuXG5jbGFzcyBVc2VyIHtcbiAgcHVibGljIHVpZD86IHN0cmluZztcbiAgcHVibGljIGdlbmRlcj86IHN0cmluZztcbiAgcHVibGljIGF2YXRhclVybD86IHN0cmluZztcbiAgcHVibGljIHBpY3R1cmU/OiBzdHJpbmc7XG4gIHB1YmxpYyBlbWFpbD86IHN0cmluZztcbiAgcHVibGljIGVtYWlsX3ZlcmlmaWVkPzogYm9vbGVhbjtcbiAgcHVibGljIHBob25lX251bWJlcj86IHN0cmluZztcbiAgcHVibGljIHVzZXJuYW1lPzogc3RyaW5nO1xuICBwdWJsaWMgbmFtZT86IHN0cmluZztcbiAgcHVibGljIHByb3ZpZGVycz86IHtcbiAgICBpZD86IHN0cmluZztcbiAgICBwcm92aWRlcl91c2VyX2lkPzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gIH1bXVxuICBwdWJsaWMgYmlydGhkYXRlPzogc3RyaW5nO1xuICBwdWJsaWMgem9uZWluZm8/OiBzdHJpbmc7XG4gIHB1YmxpYyBsb2NhbGU/OiBzdHJpbmc7XG4gIHB1YmxpYyBzdWI/OiBzdHJpbmc7XG4gIHB1YmxpYyBjcmVhdGVkX2Zyb20/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfY2FjaGU6IGFueTtcbiAgcHJpdmF0ZSBfb2F1dGhJbnN0YW5jZTogQ2xvdWRiYXNlT0F1dGggLy8gQ2xvdWRiYXNlT0F1dGgg57G75Z6LXG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogSVVzZXJPcHRpb25zKSB7XG4gICAgY29uc3QgeyBjYWNoZSwgb2F1dGhJbnN0YW5jZSB9ID0gb3B0aW9ucztcbiAgICB0aGlzLl9jYWNoZSA9IGNhY2hlO1xuICAgIHRoaXMuX29hdXRoSW5zdGFuY2UgPSBvYXV0aEluc3RhbmNlXG5cbiAgICB0aGlzLl9zZXRVc2VySW5mbygpO1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnlKjmiLfkv6Hmga8t5ZCM5q2lXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hlY2tMb2NhbEluZm8oKSB7XG4gICAgdGhpcy51aWQgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd1aWQnKSBhcyBzdHJpbmc7XG4gICAgdGhpcy5nZW5kZXIgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdnZW5kZXInKSBhcyBzdHJpbmc7XG4gICAgdGhpcy5waWN0dXJlID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncGljdHVyZScpIGFzIHN0cmluZztcbiAgICB0aGlzLmF2YXRhclVybCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2F2YXRhclVybCcpIGFzIHN0cmluZztcbiAgICB0aGlzLmVtYWlsID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnZW1haWwnKSBhcyBzdHJpbmc7XG4gICAgdGhpcy5lbWFpbF92ZXJpZmllZCA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2VtYWlsX3ZlcmlmaWVkJykgYXMgYm9vbGVhbjtcbiAgICB0aGlzLnBob25lX251bWJlciA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ3Bob25lX251bWJlcicpIGFzIHN0cmluZ1xuICAgIHRoaXMudXNlcm5hbWUgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd1c2VybmFtZScpIGFzIHN0cmluZ1xuICAgIHRoaXMubmFtZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ25hbWUnKSBhcyBzdHJpbmdcbiAgICB0aGlzLmJpcnRoZGF0ZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2JpcnRoZGF0ZScpIGFzIHN0cmluZ1xuICAgIHRoaXMuem9uZWluZm8gPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd6b25laW5mbycpIGFzIHN0cmluZ1xuICAgIHRoaXMubG9jYWxlID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnbG9jYWxlJykgYXMgc3RyaW5nXG4gICAgdGhpcy5zdWIgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdzdWInKSBhcyBzdHJpbmdcbiAgICB0aGlzLmNyZWF0ZWRfZnJvbSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2NyZWF0ZWRfZnJvbScpIGFzIHN0cmluZ1xuICAgIHRoaXMucHJvdmlkZXJzID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncHJvdmlkZXJzJykgYXMgYW55XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluacrOWcsOeUqOaIt+S/oeaBry3lvILmraVcbiAgICovXG4gIHB1YmxpYyBhc3luYyBjaGVja0xvY2FsSW5mb0FzeW5jKCkge1xuICAgIHRoaXMudWlkID0gYXdhaXQgdGhpcy5fZ2V0TG9jYWxVc2VySW5mb0FzeW5jKCd1aWQnKTtcbiAgICB0aGlzLmdlbmRlciA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnZ2VuZGVyJyk7XG4gICAgdGhpcy5waWN0dXJlID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncGljdHVyZScpIGFzIHN0cmluZztcbiAgICB0aGlzLmF2YXRhclVybCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnYXZhdGFyVXJsJyk7XG4gICAgdGhpcy5lbWFpbCA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygnZW1haWwnKTtcbiAgICB0aGlzLmVtYWlsX3ZlcmlmaWVkID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnZW1haWxfdmVyaWZpZWQnKSBhcyBib29sZWFuO1xuICAgIHRoaXMucGhvbmVfbnVtYmVyID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncGhvbmVfbnVtYmVyJykgYXMgc3RyaW5nXG4gICAgdGhpcy51c2VybmFtZSA9IGF3YWl0IHRoaXMuX2dldExvY2FsVXNlckluZm9Bc3luYygndXNlcm5hbWUnKVxuICAgIHRoaXMubmFtZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ25hbWUnKSBhcyBzdHJpbmdcbiAgICB0aGlzLmJpcnRoZGF0ZSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2JpcnRoZGF0ZScpIGFzIHN0cmluZ1xuICAgIHRoaXMuem9uZWluZm8gPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCd6b25laW5mbycpIGFzIHN0cmluZ1xuICAgIHRoaXMubG9jYWxlID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygnbG9jYWxlJykgYXMgc3RyaW5nXG4gICAgdGhpcy5zdWIgPSB0aGlzLl9nZXRMb2NhbFVzZXJJbmZvKCdzdWInKSBhcyBzdHJpbmdcbiAgICB0aGlzLmNyZWF0ZWRfZnJvbSA9IHRoaXMuX2dldExvY2FsVXNlckluZm8oJ2NyZWF0ZWRfZnJvbScpIGFzIHN0cmluZ1xuICAgIHRoaXMucHJvdmlkZXJzID0gdGhpcy5fZ2V0TG9jYWxVc2VySW5mbygncHJvdmlkZXJzJykgYXMgYW55XG4gIH1cblxuXG4gIC8qKlxuICAgKiDmm7TmlrDnlKjmiLfkv6Hmga9cbiAgICogQHBhcmFtIHVzZXJJbmZvXG4gICAqL1xuICAvLyBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAvLyAgIHRpdGxlOiAn5pu05paw55So5oi35L+h5oGv5aSx6LSlJyxcbiAgLy8gICBtZXNzYWdlczogW1xuICAvLyAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gIC8vICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgLy8gICAgICcgIDIgLSDnlKjmiLfkv6Hmga/kuK3mmK/lkKbljIXlkKvpnZ7ms5XlgLwnLFxuICAvLyAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgLy8gICBdXG4gIC8vIH0pXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUodXNlckluZm86IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgbmFtZSwgZ2VuZGVyLCBhdmF0YXJVcmwsIHByb3ZpbmNlLCBjb3VudHJ5LCBjaXR5IH0gPSB1c2VySW5mbztcbiAgICBjb25zdCBuZXdVc2VySW5mbyA9IGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5zZXRVc2VyUHJvZmlsZSh7IG5hbWUsIGdlbmRlciwgYXZhdGFyVXJsLCBwcm92aW5jZSwgY291bnRyeSwgY2l0eSB9KVxuXG4gICAgdGhpcy5fc2V0TG9jYWxVc2VySW5mbyhuZXdVc2VySW5mbyk7XG4gIH1cbiAgLyoqXG4gICAqIOabtOaWsOWvhueggVxuICAgKiBAcGFyYW0gbmV3UGFzc3dvcmRcbiAgICogQHBhcmFtIG9sZFBhc3N3b3JkXG4gICAqL1xuICAvLyBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAvLyAgIHRpdGxlOiAn5pu05paw5a+G56CB5aSx6LSlJyxcbiAgLy8gICBtZXNzYWdlczogW1xuICAvLyAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gIC8vICAgICAnICAxIC0g6LCD55SoIFVzZXIudXBkYXRlUGFzc3dvcmQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAvLyAgICAgJyAgMyAtIOaWsOWvhueggeS4reaYr+WQpuWMheWQq+mdnuazleWtl+espicsXG4gIC8vICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAvLyAgIF1cbiAgLy8gfSlcbiAgcHVibGljIHVwZGF0ZVBhc3N3b3JkKG5ld1Bhc3N3b3JkOiBzdHJpbmcsIG9sZFBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnVwZGF0ZVBhc3N3b3JkQnlPbGQoe1xuICAgICAgb2xkX3Bhc3N3b3JkOiBvbGRQYXNzd29yZCxcbiAgICAgIG5ld19wYXNzd29yZDogbmV3UGFzc3dvcmRcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIOabtOaWsOeUqOaIt+WQjVxuICAgKiBAcGFyYW0gdXNlcm5hbWVcbiAgICovXG4gIC8vIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gIC8vICAgdGl0bGU6ICfmm7TmlrDnlKjmiLflkI3lpLHotKUnLFxuICAvLyAgIG1lc3NhZ2VzOiBbXG4gIC8vICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgLy8gICAgICcgIDEgLSDosIPnlKggVXNlci51cGRhdGVVc2VybmFtZSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gIC8vICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG55So5oi35ZCN5a+G56CB55m75b2VJyxcbiAgLy8gICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gIC8vICAgXVxuICAvLyB9KVxuICBwdWJsaWMgdXBkYXRlVXNlcm5hbWUodXNlcm5hbWU6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgdXNlcm5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ3VzZXJuYW1lIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy51cGRhdGUoe1xuICAgICAgdXNlcm5hbWVcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIOWIt+aWsOacrOWcsOeUqOaIt+S/oeaBr+OAguW9k+eUqOaIt+WcqOWFtuS7luWuouaIt+err+abtOaWsOeUqOaIt+S/oeaBr+S5i+WQju+8jOWPr+S7peiwg+eUqOatpOaOpeWPo+WQjOatpeabtOaWsOS5i+WQjueahOS/oeaBr+OAglxuICAgKi9cbiAgLy8gQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgLy8gICB0aXRsZTogJ+WIt+aWsOacrOWcsOeUqOaIt+S/oeaBr+Wksei0pScsXG4gIC8vICAgbWVzc2FnZXM6IFtcbiAgLy8gICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAvLyAgICAgJyAgMSAtIOiwg+eUqCBVc2VyLnJlZnJlc2goKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAvLyAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgLy8gICBdXG4gIC8vIH0pXG4gIHB1YmxpYyBhc3luYyByZWZyZXNoKCk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgbmV3VXNlckluZm8gPSBhd2FpdCB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuZ2V0VXNlckluZm8oKVxuICAgIHRoaXMuX3NldExvY2FsVXNlckluZm8obmV3VXNlckluZm8pO1xuICAgIHJldHVybiBuZXdVc2VySW5mbztcbiAgfVxuXG4gIHByaXZhdGUgX2dldExvY2FsVXNlckluZm8oa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCBib29sZWFuIHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodXNlckluZm9LZXkpO1xuICAgIHJldHVybiB1c2VySW5mb1trZXldO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfZ2V0TG9jYWxVc2VySW5mb0FzeW5jKGtleTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyh1c2VySW5mb0tleSk7XG4gICAgcmV0dXJuIHVzZXJJbmZvW2tleV07XG4gIH1cblxuICBwcml2YXRlIF9zZXRVc2VySW5mbygpIHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHVzZXJJbmZvID0gdGhpcy5fY2FjaGUuZ2V0U3RvcmUodXNlckluZm9LZXkpO1xuICAgIFtcbiAgICAgICd1aWQnLFxuICAgICAgJ2VtYWlsJyxcbiAgICAgICduYW1lJyxcbiAgICAgICdnZW5kZXInLFxuICAgICAgJ3BpY3R1cmUnLFxuICAgICAgJ2F2YXRhclVybCcsXG4gICAgICAncGhvbmUnLFxuICAgICAgJ2VtYWlsX3ZlcmlmaWVkJyxcbiAgICAgICdwaG9uZV9udW1iZXInLFxuICAgICAgJ2JpcnRoZGF0ZScsXG4gICAgICAnem9uZWluZm8nLFxuICAgICAgJ2xvY2FsZScsXG4gICAgICAnc3ViJyxcbiAgICAgICdjcmVhdGVkX2Zyb20nLFxuICAgICAgJ3Byb3ZpZGVycycsXG4gICAgICAndXNlcm5hbWUnXG4gICAgXS5mb3JFYWNoKGluZm9LZXkgPT4ge1xuICAgICAgdGhpc1tpbmZvS2V5XSA9IHVzZXJJbmZvW2luZm9LZXldO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0TG9jYWxVc2VySW5mbyh1c2VySW5mbzogYW55KSB7XG4gICAgY29uc3QgeyB1c2VySW5mb0tleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICB0aGlzLl9jYWNoZS5zZXRTdG9yZSh1c2VySW5mb0tleSwgdXNlckluZm8pO1xuICAgIHRoaXMuX3NldFVzZXJJbmZvKCk7XG4gIH1cbn1cbmludGVyZmFjZSBJTG9naW5TdGF0ZU9wdGlvbnMgZXh0ZW5kcyBJVXNlck9wdGlvbnMge1xuICBlbnZJZDogc3RyaW5nO1xufVxuZXhwb3J0IGNsYXNzIExvZ2luU3RhdGUge1xuICBwdWJsaWMgdXNlcjogYW55O1xuICBwdWJsaWMgb2F1dGhMb2dpblN0YXRlOiBhbnlcblxuICBwcml2YXRlIF9vYXV0aEluc3RhbmNlOiBDbG91ZGJhc2VPQXV0aFxuICBwcml2YXRlIF9jYWNoZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElMb2dpblN0YXRlT3B0aW9ucykge1xuICAgIGNvbnN0IHsgZW52SWQsIGNhY2hlLCBvYXV0aEluc3RhbmNlIH0gPSBvcHRpb25zO1xuICAgIGlmICghZW52SWQpIHtcbiAgICAgIC8vIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCAnZW52SWQgaXMgbm90IGRlZmluZWQnKTtcbiAgICB9XG4gICAgdGhpcy5fY2FjaGUgPSBjYWNoZTtcbiAgICB0aGlzLl9vYXV0aEluc3RhbmNlID0gb2F1dGhJbnN0YW5jZVxuXG4gICAgdGhpcy51c2VyID0gbmV3IFVzZXIoe1xuICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgb2F1dGhJbnN0YW5jZVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNoZWNrTG9jYWxTdGF0ZSgpIHtcbiAgICB0aGlzLm9hdXRoTG9naW5TdGF0ZSA9IHRoaXMuX29hdXRoSW5zdGFuY2U/LmF1dGhBcGkuaGFzTG9naW5TdGF0ZVN5bmMoKVxuICAgIHRoaXMudXNlci5jaGVja0xvY2FsSW5mbygpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNoZWNrTG9jYWxTdGF0ZUFzeW5jKCkge1xuICAgIGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2U/LmF1dGhBcGkuZ2V0TG9naW5TdGF0ZSgpXG4gICAgYXdhaXQgdGhpcy51c2VyLmNoZWNrTG9jYWxJbmZvQXN5bmMoKTtcbiAgfVxufVxuXG5jbGFzcyBBdXRoIHtcbiAgcHJpdmF0ZSByZWFkb25seSBfY29uZmlnOiBhbnk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2NhY2hlOiBhbnlcbiAgLy8gcHJpdmF0ZSByZWFkb25seSBfcmVxdWVzdDogYW55O1xuXG4gIHByaXZhdGUgX29hdXRoSW5zdGFuY2U6IENsb3VkYmFzZU9BdXRoXG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBhbnkgJiB7IGNhY2hlOiBhbnksIHJlcXVlc3Q/OiBhbnksIHJ1bnRpbWU/OiBzdHJpbmcgfSkge1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLl9jYWNoZSA9IGNvbmZpZy5jYWNoZTtcbiAgICAvLyB0aGlzLl9yZXF1ZXN0ID0gY29uZmlnLnJlcXVlc3Q7XG4gICAgdGhpcy5fb2F1dGhJbnN0YW5jZSA9IGNvbmZpZy5vYXV0aEluc3RhbmNlXG4gIH1cblxuICAvKipcbiAgKiDnu5HlrprmiYvmnLrlj7dcbiAgKiBAcGFyYW0gcGhvbmVOdW1iZXJcbiAgKiBAcGFyYW0gcGhvbmVDb2RlXG4gICovXG4gIC8vIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gIC8vICAgdGl0bGU6ICfnu5HlrprmiYvmnLrlj7flpLHotKUnLFxuICAvLyAgIG1lc3NhZ2VzOiBbXG4gIC8vICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgLy8gICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmJpbmRQaG9uZU51bWJlcigpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gIC8vICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG55+t5L+h6aqM6K+B56CB55m75b2VJyxcbiAgLy8gICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gIC8vICAgXVxuICAvLyB9KVxuICBwdWJsaWMgYXN5bmMgYmluZFBob25lTnVtYmVyKHBhcmFtczogYXV0aE1vZGVscy5CaW5kUGhvbmVSZXF1ZXN0KSB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5iaW5kUGhvbmUocGFyYW1zKVxuICB9XG5cbiAgLyoqXG4gICAqIOino+e7keS4ieaWuee7keWumlxuICAgKiBAcGFyYW0gbG9naW5UeXBlXG4gICAqL1xuICAvLyBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAvLyAgIHRpdGxlOiAn6Kej6Zmk5LiJ5pa557uR5a6a5aSx6LSlJyxcbiAgLy8gICBtZXNzYWdlczogW1xuICAvLyAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gIC8vICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS51bmxpbmsoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAvLyAgICAgJyAgMiAtIOW9k+WJjei0puaIt+aYr+WQpuW3sue7j+S4juatpOeZu+W9leaWueW8j+ino+e7kScsXG4gIC8vICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAvLyAgIF1cbiAgLy8gfSlcbiAgcHVibGljIGFzeW5jIHVuYmluZFByb3ZpZGVyKHBhcmFtczogYXV0aE1vZGVscy5VbmJpbmRQcm92aWRlclJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnVuYmluZFByb3ZpZGVyKHBhcmFtcylcbiAgfVxuXG4gIC8qKlxuICog5pu05paw6YKu566x5Zyw5Z2AXG4gKiBAcGFyYW0gZW1haWxcbiAqIEBwYXJhbSBzdWRvX3Rva2VuXG4gKiBAcGFyYW0gdmVyaWZpY2F0aW9uX3Rva2VuXG4gKi9cbiAgLy8gQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgLy8gICB0aXRsZTogJ+e7keWumumCrueuseWcsOWdgOWksei0pScsXG4gIC8vICAgbWVzc2FnZXM6IFtcbiAgLy8gICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAvLyAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuYmluZEVtYWlsKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgLy8gICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobpgq7nrrHlr4bnoIHnmbvlvZUnLFxuICAvLyAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgLy8gICBdXG4gIC8vIH0pXG4gIHB1YmxpYyBiaW5kRW1haWwocGFyYW1zOiBhdXRoTW9kZWxzLkJpbmRFbWFpbFJlcXVlc3QpIHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLmJpbmRFbWFpbChwYXJhbXMpXG4gIH1cblxuICAvKipcbiAgICogdmVyaWZ5XG4gICAqIEBwYXJhbSB7YXV0aE1vZGVscy5WZXJpZnlSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybnMge1Byb21pc2U8YXV0aE1vZGVscy5WZXJpZnlSZXNwb25zZT59XG4gICAqIEBtZW1iZXJvZiBVc2VyXG4gICAqL1xuICAvLyBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAvLyAgIHRpdGxlOiAn6aqM6K+B56CB6aqM6K+B5aSx6LSlJyxcbiAgLy8gICBtZXNzYWdlczogW1xuICAvLyAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gIC8vICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS52ZXJpZnkoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAvLyAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huaJi+acuumqjOivgeeggS/pgq7nrrHnmbvlvZUnLFxuICAvLyAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgLy8gICBdXG4gIC8vIH0pXG4gIHB1YmxpYyBhc3luYyB2ZXJpZnkocGFyYW1zOiBhdXRoTW9kZWxzLlZlcmlmeVJlcXVlc3QpOiBQcm9taXNlPGF1dGhNb2RlbHMuVmVyaWZ5UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnZlcmlmeShwYXJhbXMpXG4gIH1cblxuICAvKipcbiAgICog6I635Y+W6aqM6K+B56CBXG4gICAqIEBwYXJhbSB7YXV0aE1vZGVscy5HZXRWZXJpZmljYXRpb25SZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybnMge1Byb21pc2U8YXV0aE1vZGVscy5HZXRWZXJpZmljYXRpb25SZXNwb25zZT59XG4gICAqIEBtZW1iZXJvZiBVc2VyXG4gICAqL1xuICAvLyBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAvLyAgIHRpdGxlOiAn6I635Y+W6aqM6K+B56CB5aSx6LSlJyxcbiAgLy8gICBtZXNzYWdlczogW1xuICAvLyAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gIC8vICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5nZXRWZXJpZmljYXRpb24oKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAvLyAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huaJi+acuumqjOivgeeggS/pgq7nrrHnmbvlvZUnLFxuICAvLyAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgLy8gICBdXG4gIC8vIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRWZXJpZmljYXRpb24oXG4gICAgcGFyYW1zOiBhdXRoTW9kZWxzLkdldFZlcmlmaWNhdGlvblJlcXVlc3QsXG4gICk6IFByb21pc2U8YXV0aE1vZGVscy5HZXRWZXJpZmljYXRpb25SZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuZ2V0VmVyaWZpY2F0aW9uKHBhcmFtcylcbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5blvZPliY3nmbvlvZXnmoTnlKjmiLfkv6Hmga8t5ZCM5q2lXG4gICAqL1xuICBnZXQgY3VycmVudFVzZXIoKSB7XG4gICAgaWYgKHRoaXMuX2NhY2hlLm1vZGUgPT09ICdhc3luYycpIHtcbiAgICAgIC8vIGFzeW5jIHN0b3JhZ2XnmoTlubPlj7DosIPnlKjmraRBUEnmj5DnpLpcbiAgICAgIC8vIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sICdjdXJyZW50IHBsYXRmb3JtXFwncyBzdG9yYWdlIGlzIGFzeW5jaHJvbm91cywgcGxlYXNlIHVzZSBnZXRDdXJyZW50VXNlciBpbnN0ZWVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IHRoaXMuaGFzTG9naW5TdGF0ZSgpO1xuXG4gICAgaWYgKGxvZ2luU3RhdGUpIHtcbiAgICAgIHJldHVybiBsb2dpblN0YXRlLnVzZXIgfHwgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluW9k+WJjeeZu+W9leeahOeUqOaIt+S/oeaBry3lvILmraVcbiAgICovXG4gIC8vIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gIC8vICAgdGl0bGU6ICfojrflj5bnlKjmiLfkv6Hmga/lpLHotKUnLFxuICAvLyAgIG1lc3NhZ2VzOiBbXG4gIC8vICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgLy8gICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmdldEN1cnJlblVzZXIoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAvLyAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgLy8gICBdXG4gIC8vIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRDdXJyZW50VXNlcigpIHtcbiAgICBjb25zdCBsb2dpblN0YXRlID0gYXdhaXQgdGhpcy5nZXRMb2dpblN0YXRlKCk7XG4gICAgaWYgKGxvZ2luU3RhdGUpIHtcbiAgICAgIGF3YWl0IGxvZ2luU3RhdGUudXNlci5jaGVja0xvY2FsSW5mb0FzeW5jKCk7XG4gICAgICByZXR1cm4gbG9naW5TdGF0ZS51c2VyIHx8IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIOWMv+WQjeeZu+W9lVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgKiBAbWVtYmVyb2YgQXV0aFxuICAgKi9cbiAgLy8gQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgLy8gICB0aXRsZTogJ+WMv+WQjeeZu+W9leWksei0pScsXG4gIC8vICAgbWVzc2FnZXM6IFtcbiAgLy8gICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAvLyAgICAgJyAgMSAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOWQr+S6huWMv+WQjeeZu+W9lScsXG4gIC8vICAgICAnICAyIC0g6LCD55SoIGF1dGgoKS5zaWduSW5Bbm9ueW1vdXNseSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gIC8vICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAvLyAgIF1cbiAgLy8gfSlcbiAgcHVibGljIGFzeW5jIHNpZ25JbkFub255bW91c2x5KCk6IFByb21pc2U8YW55PiB7XG4gICAgYXdhaXQgdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnNpZ25JbkFub255bW91c2x5KClcbiAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICBvYXV0aEluc3RhbmNlOiB0aGlzLl9vYXV0aEluc3RhbmNlLFxuICAgIH0pXG5cbiAgICBhd2FpdCBsb2dpblN0YXRlLmNoZWNrTG9jYWxTdGF0ZUFzeW5jKCk7XG4gICAgYXdhaXQgbG9naW5TdGF0ZS51c2VyLnJlZnJlc2goKTtcbiAgICByZXR1cm4gbG9naW5TdGF0ZVxuICB9XG5cbiAgLyoqXG4gICAqIOiuvue9ruiOt+WPluiHquWumuS5ieeZu+W9lSB0aWNrZXQg5Ye95pWwXG4gICAqIEBwYXJhbSB7YXV0aE1vZGVscy5HZXRDdXN0b21TaWduVGlja2V0Rm59IGdldFRpY2tGblxuICAgKiBAbWVtYmVyb2YgQXV0aFxuICAgKi9cbiAgcHVibGljIHNldEN1c3RvbVNpZ25GdW5jKGdldFRpY2tGbjogYXV0aE1vZGVscy5HZXRDdXN0b21TaWduVGlja2V0Rm4pOiB2b2lkIHtcbiAgICB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuc2V0Q3VzdG9tU2lnbkZ1bmMoZ2V0VGlja0ZuKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqIEBtZW1iZXJvZiBBdXRoXG4gICAqL1xuICAvLyBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAvLyAgIHRpdGxlOiAn6Ieq5a6a5LmJ55m75b2V5aSx6LSlJyxcbiAgLy8gICBtZXNzYWdlczogW1xuICAvLyAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gIC8vICAgICAnICAxIC0g5b2T5YmN546v5aKD5piv5ZCm5byA5ZCv5LqG6Ieq5a6a5LmJ55m75b2VJyxcbiAgLy8gICAgICcgIDIgLSDosIPnlKggYXV0aCgpLnNpZ25JbldpdGhDdXN0b21UaWNrZXQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAvLyAgICAgJyAgMyAtIHRpY2tldCDmmK/lkKblvZLlsZ7kuo7lvZPliY3njq/looMnLFxuICAvLyAgICAgJyAgNCAtIOWIm+W7uiB0aWNrZXQg55qE6Ieq5a6a5LmJ55m75b2V56eB6ZKl5piv5ZCm6L+H5pyfJyxcbiAgLy8gICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gIC8vICAgXVxuICAvLyB9KVxuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aEN1c3RvbVRpY2tldCgpOiBQcm9taXNlPGFueT4ge1xuICAgIGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5zaWduSW5XaXRoQ3VzdG9tVGlja2V0KClcbiAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICBvYXV0aEluc3RhbmNlOiB0aGlzLl9vYXV0aEluc3RhbmNlLFxuICAgIH0pXG5cbiAgICBhd2FpdCBsb2dpblN0YXRlLmNoZWNrTG9jYWxTdGF0ZUFzeW5jKCk7XG4gICAgYXdhaXQgbG9naW5TdGF0ZS51c2VyLnJlZnJlc2goKTtcbiAgICByZXR1cm4gbG9naW5TdGF0ZVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7YXV0aE1vZGVscy5TaWduSW5SZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduSW4ocGFyYW1zOiBhdXRoTW9kZWxzLlNpZ25JblJlcXVlc3QpOiBQcm9taXNlPGFueT4ge1xuICAgIGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5zaWduSW4ocGFyYW1zKVxuICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBuZXcgTG9naW5TdGF0ZSh7XG4gICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgIG9hdXRoSW5zdGFuY2U6IHRoaXMuX29hdXRoSW5zdGFuY2UsXG4gICAgfSlcblxuICAgIGF3YWl0IGxvZ2luU3RhdGUuY2hlY2tMb2NhbFN0YXRlQXN5bmMoKTtcbiAgICBhd2FpdCBsb2dpblN0YXRlLnVzZXIucmVmcmVzaCgpO1xuICAgIHJldHVybiBsb2dpblN0YXRlXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHthdXRoTW9kZWxzLlNpZ25VcFJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgKiBAbWVtYmVyb2YgQXV0aFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25VcChwYXJhbXM6IGF1dGhNb2RlbHMuU2lnblVwUmVxdWVzdCk6IFByb21pc2U8YW55PiB7XG4gICAgYXdhaXQgdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnNpZ25VcChwYXJhbXMpXG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgb2F1dGhJbnN0YW5jZTogdGhpcy5fb2F1dGhJbnN0YW5jZSxcbiAgICB9KVxuXG4gICAgYXdhaXQgbG9naW5TdGF0ZS5jaGVja0xvY2FsU3RhdGVBc3luYygpO1xuICAgIGF3YWl0IGxvZ2luU3RhdGUudXNlci5yZWZyZXNoKCk7XG4gICAgcmV0dXJuIGxvZ2luU3RhdGVcbiAgfVxuXG4gIC8qKlxuICAgKiDorr7nva7lr4bnoIFcbiAgICogQHBhcmFtIHthdXRoTW9kZWxzLlNldFBhc3N3b3JkUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKiBAbWVtYmVyb2YgQXV0aFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNldFBhc3N3b3JkKHBhcmFtczogYXV0aE1vZGVscy5TZXRQYXNzd29yZFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLnNldFBhc3N3b3JkKHBhcmFtcylcbiAgfVxuXG4gIC8qKlxuICAgKiDmo4DmtYvnlKjmiLflkI3mmK/lkKblt7Lnu4/ljaDnlKhcbiAgICogQHBhcmFtIHVzZXJuYW1lXG4gICAqL1xuICAvLyBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAvLyAgIHRpdGxlOiAn6I635Y+W55So5oi35piv5ZCm6KKr5Y2g55So5aSx6LSlJyxcbiAgLy8gICBtZXNzYWdlczogW1xuICAvLyAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gIC8vICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5pc1VzZXJuYW1lUmVnaXN0ZXJlZCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gIC8vICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAvLyAgIF1cbiAgLy8gfSlcbiAgcHVibGljIGFzeW5jIGlzVXNlcm5hbWVSZWdpc3RlcmVkKHVzZXJuYW1lOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAodHlwZW9mIHVzZXJuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgLy8gdGhyb3dFcnJvcihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsICd1c2VybmFtZSBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcXVlcnlSZXMgPSBhd2FpdCB0aGlzLnF1ZXJ5VXNlcih7XG4gICAgICB1c2VybmFtZVxuICAgIH0pXG5cbiAgICByZXR1cm4gcGFyc2VJbnQocXVlcnlSZXMudG90YWwpID8gdHJ1ZSA6IGZhbHNlXG4gIH1cblxuICAvKipcbiAgICog55m75Ye6XG4gICAqL1xuICAvLyBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAvLyAgIHRpdGxlOiAn55So5oi355m75Ye65aSx6LSlJyxcbiAgLy8gICBtZXNzYWdlczogW1xuICAvLyAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gIC8vICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5zaWduT3V0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgLy8gICAgICcgIDIgLSDlvZPliY3nlKjmiLfmmK/lkKbkuLrljL/lkI3nmbvlvZXvvIjljL/lkI3nmbvlvZXkuI3mlK/mjIFzaWduT3V077yJJyxcbiAgLy8gICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gIC8vICAgXVxuICAvLyB9KVxuICBwdWJsaWMgYXN5bmMgc2lnbk91dCgpIHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5zaWduT3V0KClcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKHVzZXJJbmZvS2V5KVxuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluacrOWcsOeZu+W9leaAgS3lkIzmraVcbiAgICovXG4gIHB1YmxpYyBoYXNMb2dpblN0YXRlKCk6IGFueSB8IG51bGwge1xuICAgIGlmICh0aGlzLl9jYWNoZS5tb2RlID09PSAnYXN5bmMnKSB7XG4gICAgICAvLyBhc3luYyBzdG9yYWdl55qE5bmz5Y+w6LCD55So5q2kQVBJ5o+Q56S6XG4gICAgICAvLyBwcmludFdhcm4oRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLCAnY3VycmVudCBwbGF0Zm9ybVxcJ3Mgc3RvcmFnZSBpcyBhc3luY2hyb25vdXMsIHBsZWFzZSB1c2UgZ2V0TG9naW5TdGF0ZSBpbnN0ZWVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgb2F1dGhMb2dpblN0YXRlID0gdGhpcy5fb2F1dGhJbnN0YW5jZT8uYXV0aEFwaS5oYXNMb2dpblN0YXRlU3luYygpXG4gICAgaWYgKG9hdXRoTG9naW5TdGF0ZSkge1xuICAgICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgb2F1dGhJbnN0YW5jZTogdGhpcy5fb2F1dGhJbnN0YW5jZSxcbiAgICAgIH0pXG4gICAgICByZXR1cm4gbG9naW5TdGF0ZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5bmnKzlnLDnmbvlvZXmgIEt5byC5q2lXG4gICAqIOatpEFQSeS4uuWFvOWuueW8guatpXN0b3JhZ2XnmoTlubPlj7BcbiAgICovXG4gIC8vIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gIC8vICAgdGl0bGU6ICfojrflj5bmnKzlnLDnmbvlvZXmgIHlpLHotKUnLFxuICAvLyAgIG1lc3NhZ2VzOiBbXG4gIC8vICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgLy8gICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmdldExvZ2luU3RhdGUoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAvLyAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgLy8gICBdXG4gIC8vIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRMb2dpblN0YXRlKCkge1xuICAgIGNvbnN0IG9hdXRoTG9naW5TdGF0ZSA9IGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5nZXRMb2dpblN0YXRlKClcbiAgICBpZiAob2F1dGhMb2dpblN0YXRlKSB7XG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICBvYXV0aEluc3RhbmNlOiB0aGlzLl9vYXV0aEluc3RhbmNlLFxuICAgICAgfSlcbiAgICAgIHJldHVybiBsb2dpblN0YXRlXG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIC8vIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gIC8vICAgdGl0bGU6ICfojrflj5bnlKjmiLfkv6Hmga/lpLHotKUnLFxuICAvLyAgIG1lc3NhZ2VzOiBbXG4gIC8vICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgLy8gICAgICcgIDEgLSDmmK/lkKblt7LnmbvlvZUnLFxuICAvLyAgICAgJyAgMiAtIOiwg+eUqCBhdXRoKCkuZ2V0VXNlckluZm8oKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAvLyAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgLy8gICBdXG4gIC8vIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRVc2VySW5mbygpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuZ2V0VXNlckluZm8oKVxuICB9XG5cblxuICAvKipcbiAgICog5Li65bey5pyJ6LSm5oi357uR56ys5LiJ5pa56LSm5oi3XG4gICAqIEBwYXJhbSB7YXV0aE1vZGVscy5CaW5kV2l0aFByb3ZpZGVyUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKiBAbWVtYmVyb2YgQXV0aFxuICAgKi9cbiAgLy8gQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgLy8gICB0aXRsZTogJ+e7keWumuesrOS4ieaWueeZu+W9leaWueW8j+Wksei0pScsXG4gIC8vICAgbWVzc2FnZXM6IFtcbiAgLy8gICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAvLyAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuYmluZFdpdGhQcm92aWRlcigpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gIC8vICAgICAnICAyIC0g5q2k6LSm5oi35piv5ZCm5bey57uP57uR5a6a5q2k56ys5LiJ5pa5JyxcbiAgLy8gICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gIC8vICAgXVxuICAvLyB9KVxuICBwdWJsaWMgYXN5bmMgYmluZFdpdGhQcm92aWRlcihcbiAgICBwYXJhbXM6IGF1dGhNb2RlbHMuQmluZFdpdGhQcm92aWRlclJlcXVlc3QsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkuYmluZFdpdGhQcm92aWRlcihwYXJhbXMpXG4gIH1cblxuICAvKipcbiAgICog5p+l6K+i55So5oi3XG4gICAqIEBwYXJhbSB7YXV0aE1vZGVscy5RdWVyeVVzZXJQcm9maWxlUmVxdWVzdH0gYXBwZW5kZWRfcGFyYW1zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGF1dGhNb2RlbHMuVXNlclByb2ZpbGU+fVxuICAgKiBAbWVtYmVyb2YgQXV0aFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHF1ZXJ5VXNlcihcbiAgICBxdWVyeU9iajogYXV0aE1vZGVscy5RdWVyeVVzZXJQcm9maWxlUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxhdXRoTW9kZWxzLlF1ZXJ5VXNlclByb2ZpbGVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkucXVlcnlVc2VyUHJvZmlsZShxdWVyeU9iailcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRBY2Nlc3NUb2tlbigpIHtcbiAgICBjb25zdCBvYXV0aEFjY2Vzc1Rva2VuUmVzID0gYXdhaXQgdGhpcy5fb2F1dGhJbnN0YW5jZS5vYXV0aDJjbGllbnQuZ2V0QWNjZXNzVG9rZW4oKVxuICAgIHJldHVybiB7XG4gICAgICBhY2Nlc3NUb2tlbjogb2F1dGhBY2Nlc3NUb2tlblJlcyxcbiAgICAgIGVudjogdGhpcy5fY29uZmlnLmVudlxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ3JhbnRQcm92aWRlclRva2VuKFxuICAgIHBhcmFtczogYXV0aE1vZGVscy5HcmFudFByb3ZpZGVyVG9rZW5SZXF1ZXN0LFxuICApOiBQcm9taXNlPGF1dGhNb2RlbHMuR3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fb2F1dGhJbnN0YW5jZS5hdXRoQXBpLmdyYW50UHJvdmlkZXJUb2tlbihwYXJhbXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aFByb3ZpZGVyKFxuICAgIHBhcmFtczogYXV0aE1vZGVscy5TaWduSW5XaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICApOiBQcm9taXNlPGFueT4ge1xuICAgIGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5zaWduSW5XaXRoUHJvdmlkZXIocGFyYW1zKVxuICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBuZXcgTG9naW5TdGF0ZSh7XG4gICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgIG9hdXRoSW5zdGFuY2U6IHRoaXMuX29hdXRoSW5zdGFuY2UsXG4gICAgfSlcblxuICAgIGF3YWl0IGxvZ2luU3RhdGUuY2hlY2tMb2NhbFN0YXRlQXN5bmMoKTtcbiAgICBhd2FpdCBsb2dpblN0YXRlLnVzZXIucmVmcmVzaCgpO1xuICAgIHJldHVybiBsb2dpblN0YXRlXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ3JhbnRUb2tlbihwYXJhbXM6IGF1dGhNb2RlbHMuR3JhbnRUb2tlblJlcXVlc3QpOiBQcm9taXNlPGFueT4ge1xuICAgIGF3YWl0IHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5ncmFudFRva2VuKHBhcmFtcylcbiAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICBvYXV0aEluc3RhbmNlOiB0aGlzLl9vYXV0aEluc3RhbmNlLFxuICAgIH0pXG5cbiAgICBhd2FpdCBsb2dpblN0YXRlLmNoZWNrTG9jYWxTdGF0ZUFzeW5jKCk7XG4gICAgYXdhaXQgbG9naW5TdGF0ZS51c2VyLnJlZnJlc2goKTtcbiAgICByZXR1cm4gbG9naW5TdGF0ZVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdlblByb3ZpZGVyUmVkaXJlY3RVcmkoXG4gICAgcGFyYW1zOiBhdXRoTW9kZWxzLkdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXF1ZXN0LFxuICApOiBQcm9taXNlPGF1dGhNb2RlbHMuR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5nZW5Qcm92aWRlclJlZGlyZWN0VXJpKHBhcmFtcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZXNldFBhc3N3b3JkKHBhcmFtczogYXV0aE1vZGVscy5SZXNldFBhc3N3b3JkUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9vYXV0aEluc3RhbmNlLmF1dGhBcGkucmVzZXRQYXNzd29yZChwYXJhbXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGV2aWNlQXV0aG9yaXplKHBhcmFtczogYXV0aE1vZGVscy5EZXZpY2VBdXRob3JpemVSZXF1ZXN0KTogUHJvbWlzZTxhdXRoTW9kZWxzLkRldmljZUF1dGhvcml6ZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX29hdXRoSW5zdGFuY2UuYXV0aEFwaS5kZXZpY2VBdXRob3JpemUocGFyYW1zKVxuICB9XG59XG5cbmNvbnN0IGNvbXBvbmVudDogYW55ID0ge1xuICBuYW1lOiBDT01QT05FTlRfTkFNRSxcbiAgbmFtZXNwYWNlOiAnYXV0aCcsXG4gIGVudGl0eTogZnVuY3Rpb24gKGNvbmZpZzogUGljazxhbnksICdyZWdpb24nIHwgJ3BlcnNpc3RlbmNlJz4gPSB7IHJlZ2lvbjogJycsIHBlcnNpc3RlbmNlOiAnbG9jYWwnIH0pIHtcbiAgICBpZiAodGhpcy5hdXRoSW5zdGFuY2UpIHtcbiAgICAgIC8vIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sICdldmVyeSBjbG91ZGJhc2UgaW5zdGFuY2Ugc2hvdWxkIGhhcyBvbmx5IG9uZSBhdXRoIG9iamVjdCcpO1xuICAgICAgcmV0dXJuIHRoaXMuYXV0aEluc3RhbmNlO1xuICAgIH1cbiAgICBjb25zdCB7IGFkYXB0ZXIsIHJ1bnRpbWUgfSA9IHRoaXMucGxhdGZvcm07XG4gICAgLy8g5aaC5LiN5piO56Gu5oyH5a6acGVyc2lzdGVuY2XliJnkvJjlhYjlj5blkITlubPlj7BhZGFwdGVy6aaW6YCJ77yM5YW25qyhbG9jYWxTdG9yYWdlXG4gICAgY29uc3QgbmV3UGVyc2lzdGVuY2UgPSBjb25maWcucGVyc2lzdGVuY2UgfHwgYWRhcHRlci5wcmltYXJ5U3RvcmFnZTtcbiAgICBpZiAobmV3UGVyc2lzdGVuY2UgJiYgKG5ld1BlcnNpc3RlbmNlICE9PSB0aGlzLmNvbmZpZy5wZXJzaXN0ZW5jZSkpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29uZmlnKHsgcGVyc2lzdGVuY2U6IG5ld1BlcnNpc3RlbmNlIH0pXG4gICAgfVxuXG4gICAgY29uc3QgeyBlbnYsIHBlcnNpc3RlbmNlLCBkZWJ1ZyB9ID0gdGhpcy5jb25maWc7XG4gICAgY29uc3Qgb2F1dGhJbnN0YW5jZSA9IG5ldyBDbG91ZGJhc2VPQXV0aCh7XG4gICAgICBjbGllbnRJZDogZW52LFxuICAgICAgYXBpT3JpZ2luOiB0aGlzLnJlcXVlc3QuZ2V0QmFzZUVuZFBvaW50KCksXG4gICAgfSlcblxuICAgIHRoaXMub2F1dGhJbnN0YW5jZSA9IG9hdXRoSW5zdGFuY2VcblxuICAgIHRoaXMuYXV0aEluc3RhbmNlID0gbmV3IEF1dGgoe1xuICAgICAgZW52LFxuICAgICAgcmVnaW9uOiBjb25maWcucmVnaW9uLFxuICAgICAgcGVyc2lzdGVuY2UsXG4gICAgICBkZWJ1ZyxcbiAgICAgIGNhY2hlOiB0aGlzLmNhY2hlLFxuICAgICAgLy8gcmVxdWVzdDogdGhpcy5yZXF1ZXN0LFxuICAgICAgcnVudGltZTogcnVudGltZSxcbiAgICAgIF9mcm9tQXBwOiB0aGlzLFxuICAgICAgLy8gb2F1dGhJbnN0YW5jZTogdGhpcy5vYXV0aEluc3RhbmNlIHx8ICh0aGlzIGFzIGFueSkub2F1dGgoKVxuICAgICAgb2F1dGhJbnN0YW5jZVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXV0aEluc3RhbmNlO1xuICB9XG59XG5cbnRyeSB7XG4gIC8vIOWwneivleiHquWKqOazqOWGjOiHs+WFqOWxgOWPmOmHj2Nsb3VkYmFzZVxuICAvLyDmraTooYzkuLrlj6rlnKjmtY/op4jlmajnjq/looPkuIvmnInmlYhcbiAgY2xvdWRiYXNlLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG59IGNhdGNoIChlKSB7IH1cblxuZXhwb3J0IHtcbiAgVXNlckluZm8sXG4gIEF1dGgsXG59O1xuLyoqXG4gKiBAYXBpIOaJi+WKqOazqOWGjOiHs2Nsb3VkYmFzZSBhcHBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQXV0aChhcHA6IFBpY2s8YW55LCAncmVnaXN0ZXJDb21wb25lbnQnPikge1xuICB0cnkge1xuICAgIGFwcC5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS53YXJuKGUpO1xuICB9XG59XG5cbiJdfQ==