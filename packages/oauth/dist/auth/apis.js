'use strict';
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
exports.Auth = void 0;
var consts_1 = require("./consts");
var oauth2client_1 = require("../oauth2client/oauth2client");
var captcha_1 = require("../captcha/captcha");
var Auth = (function () {
    function Auth(opts) {
        var request = opts.request;
        var oAuth2Client = opts.credentialsClient;
        if (!oAuth2Client) {
            var initOptions = {
                apiOrigin: opts.apiOrigin,
                clientId: opts.clientId,
                storage: opts.storage,
            };
            oAuth2Client = new oauth2client_1.OAuth2Client(initOptions);
        }
        if (!request) {
            var baseRequest = oAuth2Client.request.bind(oAuth2Client);
            var captcha = new captcha_1.Captcha({
                clientId: opts.clientId,
                request: baseRequest,
                storage: opts.storage,
            });
            request = captcha.request.bind(captcha);
        }
        this._config = {
            apiOrigin: opts.apiOrigin,
            clientId: opts.clientId,
            request: request,
            credentialsClient: oAuth2Client,
            storage: opts.storage || oauth2client_1.defaultStorage,
        };
    }
    Auth.prototype.signIn = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._config.request(consts_1.ApiUrls.AUTH_SIGN_IN_URL, {
                            method: 'POST',
                            body: params
                        })];
                    case 1:
                        credentials = _a.sent();
                        return [4, this._config.credentialsClient.setCredentials(credentials)];
                    case 2:
                        _a.sent();
                        return [2, Promise.resolve(credentials)];
                }
            });
        });
    };
    Auth.prototype.signInAnonymously = function () {
        return __awaiter(this, void 0, void 0, function () {
            var credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._config.request(consts_1.ApiUrls.AUTH_SIGN_IN_ANONYMOUSLY_URL, {
                            method: 'POST',
                            body: {}
                        })];
                    case 1:
                        credentials = _a.sent();
                        return [4, this._config.credentialsClient.setCredentials(credentials)];
                    case 2:
                        _a.sent();
                        return [2, Promise.resolve(credentials)];
                }
            });
        });
    };
    Auth.prototype.signUp = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._config.request(consts_1.ApiUrls.AUTH_SIGN_UP_URL, {
                            method: 'POST',
                            body: params,
                        })];
                    case 1:
                        data = _a.sent();
                        return [4, this._config.credentialsClient.setCredentials(data)];
                    case 2:
                        _a.sent();
                        return [2, Promise.resolve(data)];
                }
            });
        });
    };
    Auth.prototype.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._config.credentialsClient.getAccessToken()];
                    case 1:
                        accessToken = _a.sent();
                        return [4, this._config.request(consts_1.ApiUrls.AUTH_REVOKE_URL, {
                                method: 'POST',
                                body: {
                                    token: accessToken,
                                },
                            })];
                    case 2:
                        data = _a.sent();
                        return [4, this._config.credentialsClient.setCredentials()];
                    case 3:
                        _a.sent();
                        return [2, Promise.resolve(data)];
                }
            });
        });
    };
    Auth.prototype.getVerification = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var withCredentials, hasLogin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        withCredentials = false;
                        if (!(params.target == 'CUR_USER')) return [3, 1];
                        withCredentials = true;
                        return [3, 3];
                    case 1: return [4, this.hasLoginState()];
                    case 2:
                        hasLogin = _a.sent();
                        if (hasLogin) {
                            withCredentials = true;
                        }
                        _a.label = 3;
                    case 3: return [2, this._config.request(consts_1.ApiUrls.VERIFICATION_URL, {
                            method: 'POST',
                            body: params,
                            withCaptcha: true,
                            withCredentials: withCredentials,
                        })];
                }
            });
        });
    };
    Auth.prototype.verify = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request(consts_1.ApiUrls.VERIFY_URL, {
                        method: 'POST',
                        body: params,
                    })];
            });
        });
    };
    Auth.prototype.genProviderRedirectUri = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, other_params;
            return __generator(this, function (_a) {
                url = consts_1.ApiUrls.PROVIDER_URI_URL + "?client_id=" + this._config.clientId + "&provider_id=" + params.provider_id + "&redirect_uri=" + encodeURIComponent(params.provider_redirect_uri) + "&state=" + params.state;
                other_params = params.other_params;
                if (other_params) {
                    if (typeof other_params.sign_out_uri === 'string' &&
                        other_params.sign_out_uri.length > 0) {
                        url += "&other_params[sign_out_uri]=" + other_params.sign_out_uri;
                    }
                }
                return [2, this._config.request(url, {
                        method: 'GET',
                    })];
            });
        });
    };
    Auth.prototype.grantProviderToken = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request(consts_1.ApiUrls.PROVIDER_TOKEN_URL, {
                        method: 'POST',
                        body: params,
                    })];
            });
        });
    };
    Auth.prototype.patchProviderToken = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request(consts_1.ApiUrls.PROVIDER_TOKEN_URL, {
                        method: 'PATCH',
                        body: params,
                    })];
            });
        });
    };
    Auth.prototype.signInWithProvider = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._config.request(consts_1.ApiUrls.AUTH_SIGN_IN_WITH_PROVIDER_URL, {
                            method: 'POST',
                            body: params,
                        })];
                    case 1:
                        credentials = _a.sent();
                        return [4, this._config.credentialsClient.setCredentials(credentials)];
                    case 2:
                        _a.sent();
                        return [2, Promise.resolve(credentials)];
                }
            });
        });
    };
    Auth.prototype.bindWithProvider = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request(consts_1.ApiUrls.PROVIDER_BIND_URL, {
                        method: 'POST',
                        body: params,
                        withCredentials: true,
                    })];
            });
        });
    };
    Auth.prototype.getUserProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.getUserInfo()];
            });
        });
    };
    Auth.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._config.request(consts_1.ApiUrls.USER_ME_URL, {
                            method: 'GET',
                            withCredentials: true,
                        })];
                    case 1:
                        userInfo = _a.sent();
                        if (userInfo.sub) {
                            userInfo.uid = userInfo.sub;
                        }
                        return [2, userInfo];
                }
            });
        });
    };
    Auth.prototype.deleteMe = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = consts_1.ApiUrls.USER_ME_URL + "?" + Auth.parseParamsToSearch(params);
                return [2, this._config.request(url, {
                        method: 'DELETE',
                        withCredentials: true,
                    })];
            });
        });
    };
    Auth.prototype.hasLoginState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this._config.credentialsClient.getAccessToken()];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        error_1 = _a.sent();
                        return [2, false];
                    case 3: return [2];
                }
            });
        });
    };
    Auth.prototype.hasLoginStateSync = function () {
        var credentials = this._config.credentialsClient.getCredentialsSync();
        return credentials;
    };
    Auth.prototype.getLoginState = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.credentialsClient.getCredentialsAsync()];
            });
        });
    };
    Auth.prototype.transByProvider = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request(consts_1.ApiUrls.USER_TRANS_BY_PROVIDER_URL, {
                        method: 'PATCH',
                        body: params,
                        withCredentials: true,
                    })];
            });
        });
    };
    Auth.prototype.grantToken = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request(consts_1.ApiUrls.AUTH_TOKEN_URL, {
                        method: 'POST',
                        body: params,
                    })];
            });
        });
    };
    Auth.prototype.getProviders = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request(consts_1.ApiUrls.PROVIDER_LIST, {
                        method: 'GET',
                        withCredentials: true,
                    })];
            });
        });
    };
    Auth.prototype.unbindProvider = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request(consts_1.ApiUrls.PROVIDER_UNBIND_URL + "/" + params.provider_id, {
                        method: 'DELETE',
                        withCredentials: true,
                    })];
            });
        });
    };
    Auth.prototype.checkPassword = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request("" + consts_1.ApiUrls.CHECK_PWD_URL, {
                        method: 'POST',
                        withCredentials: true,
                        body: params,
                    })];
            });
        });
    };
    Auth.prototype.bindPhone = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request("" + consts_1.ApiUrls.BIND_CONTACT_URL, {
                        method: 'PATCH',
                        withCredentials: true,
                        body: params,
                    })];
            });
        });
    };
    Auth.prototype.bindEmail = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request("" + consts_1.ApiUrls.BIND_CONTACT_URL, {
                        method: 'PATCH',
                        withCredentials: true,
                        body: params,
                    })];
            });
        });
    };
    Auth.prototype.setPassword = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request("" + consts_1.ApiUrls.AUTH_SET_PASSWORD, {
                        method: 'PATCH',
                        withCredentials: true,
                        body: params,
                    })];
            });
        });
    };
    Auth.prototype.updatePasswordByOld = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var sudoToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.sudo({ password: params.old_password })];
                    case 1:
                        sudoToken = _a.sent();
                        return [2, this.setPassword({
                                sudo_token: sudoToken.sudo_token,
                                new_password: params.new_password,
                            })];
                }
            });
        });
    };
    Auth.prototype.sudo = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request("" + consts_1.ApiUrls.SUDO_URL, {
                        method: 'POST',
                        withCredentials: true,
                        body: params,
                    })];
            });
        });
    };
    Auth.prototype.getCurUserVerification = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                params.target = 'CUR_USER';
                return [2, this._config.request(consts_1.ApiUrls.VERIFICATION_URL, {
                        method: 'POST',
                        body: params,
                        withCredentials: true,
                        withCaptcha: true
                    })];
            });
        });
    };
    Auth.prototype.changeBindedProvider = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request(consts_1.ApiUrls.PROVIDER_LIST + "/" + params.provider_id + "/trans", {
                        method: 'POST',
                        body: {
                            provider_trans_token: params.trans_token,
                        },
                        withCredentials: true,
                    })];
            });
        });
    };
    Auth.prototype.setUserProfile = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request(consts_1.ApiUrls.USER_PRIFILE_URL, {
                        method: 'PATCH',
                        body: params,
                        withCredentials: true,
                    })];
            });
        });
    };
    Auth.prototype.queryUserProfile = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var searchParams;
            return __generator(this, function (_a) {
                searchParams = new URLSearchParams(params);
                return [2, this._config.request(consts_1.ApiUrls.USER_QUERY_URL + "?" + searchParams.toString(), {
                        method: 'GET',
                        withCredentials: true,
                    })];
            });
        });
    };
    Auth.prototype.setCustomSignFunc = function (getTickFn) {
        this._getCustomSignTicketFn = getTickFn;
    };
    Auth.prototype.signInWithCustomTicket = function () {
        return __awaiter(this, void 0, void 0, function () {
            var customTicket;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._getCustomSignTicketFn()];
                    case 1:
                        customTicket = _a.sent();
                        return [2, this.signInWithProvider({
                                provider_id: 'custom',
                                provider_token: customTicket
                            })];
                }
            });
        });
    };
    Auth.prototype.resetPassword = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request(consts_1.ApiUrls.AUTH_RESET_PASSWORD, {
                        method: 'POST',
                        body: params,
                    })];
            });
        });
    };
    Auth.prototype.deviceAuthorize = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request(consts_1.ApiUrls.AUTH_GET_DEVICE_CODE, {
                        method: 'POST',
                        body: params,
                        withCredentials: true
                    })];
            });
        });
    };
    Auth.prototype.checkUsername = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request(consts_1.ApiUrls.CHECK_USERNAME, {
                        method: 'GET',
                        body: params,
                        withCredentials: true
                    })];
            });
        });
    };
    Auth.prototype.checkIfUserExist = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var searchParams;
            return __generator(this, function (_a) {
                searchParams = new URLSearchParams(params);
                return [2, this._config.request(consts_1.ApiUrls.CHECK_IF_USER_EXIST + "?" + searchParams.toString(), {
                        method: 'GET'
                    })];
            });
        });
    };
    Auth.prototype.loginScope = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.credentialsClient.getScope()];
            });
        });
    };
    Auth.parseParamsToSearch = function (params) {
        for (var key in params) {
            if (!params[key]) {
                delete params[key];
            }
        }
        var searchParams = new URLSearchParams(params);
        return searchParams.toString();
    };
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRoL2FwaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFYixtQ0FBbUM7QUEyQ25DLDZEQUE0RTtBQUU1RSw4Q0FBNkM7QUFjN0M7SUFTRSxjQUFZLElBQWlCO1FBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDM0IsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsSUFBTSxXQUFXLEdBQUc7Z0JBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQztZQUNGLFlBQVksR0FBRyxJQUFJLDJCQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDOUM7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osSUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUQsSUFBTSxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDO2dCQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLE9BQU8sRUFBRSxXQUFXO2dCQUNwQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ3hDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNiLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsT0FB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O0tBQ0o7SUFFWSx5QkFBVSxHQUF2Qjs7O2dCQUNFLFdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsRUFBQTs7O0tBQ2pEO0lBRWMsd0JBQW1CLEdBQWxDLFVBQW1DLE1BQVc7UUFDNUMsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDaEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDbkI7U0FDRjtRQUNELElBQU0sWUFBWSxHQUFHLElBQUksZUFBZSxDQUFDLE1BQWEsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FBQyxBQXBrQkQsSUFva0JDO0FBcGtCWSxvQkFBSSIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgQXBpVXJscyB9IGZyb20gJy4vY29uc3RzJztcbmltcG9ydCB7XG4gIEdldFZlcmlmaWNhdGlvblJlcXVlc3QsXG4gIEdldFZlcmlmaWNhdGlvblJlc3BvbnNlLFxuICBVc2VyUHJvZmlsZSxcbiAgVXNlckluZm8sXG4gIFNpZ25JblJlcXVlc3QsXG4gIFNpZ25VcFJlcXVlc3QsXG4gIFZlcmlmeVJlcXVlc3QsXG4gIFZlcmlmeVJlc3BvbnNlLFxuICBHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVxdWVzdCxcbiAgR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlc3BvbnNlLFxuICBHcmFudFByb3ZpZGVyVG9rZW5SZXF1ZXN0LFxuICBHcmFudFByb3ZpZGVyVG9rZW5SZXNwb25zZSxcbiAgUGF0Y2hQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgUGF0Y2hQcm92aWRlclRva2VuUmVzcG9uc2UsXG4gIFNpZ25JbldpdGhQcm92aWRlclJlcXVlc3QsXG4gIEJpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICBUcmFuc0J5UHJvdmlkZXJSZXF1ZXN0LFxuICBHcmFudFRva2VuUmVxdWVzdCxcbiAgVXNlclByb2ZpbGVQcm92aWRlcixcbiAgVW5iaW5kUHJvdmlkZXJSZXF1ZXN0LFxuICBDaGVja1Bhc3N3b3JkclJlcXVlc3QsXG4gIEJpbmRQaG9uZVJlcXVlc3QsXG4gIEJpbmRFbWFpbFJlcXVlc3QsXG4gIFNldFBhc3N3b3JkUmVxdWVzdCxcbiAgQ2hhbmdlQmluZGVkUHJvdmlkZXJSZXF1ZXN0LFxuICBDaGFuZ2VCaW5kZWRQcm92aWRlclJlc3BvbnNlLFxuICBVcGRhdGVQYXNzd29yZFJlcXVlc3QsXG4gIFN1ZG9SZXNwb25zZSxcbiAgU3Vkb1JlcXVlc3QsXG4gIEdldEN1c3RvbVNpZ25UaWNrZXRGbixcbiAgUXVlcnlVc2VyUHJvZmlsZVJlcXVlc3QsXG4gIFF1ZXJ5VXNlclByb2ZpbGVSZXNwb25zZSxcbiAgUmVzZXRQYXNzd29yZFJlcXVlc3QsXG4gIERldmljZUF1dGhvcml6ZVJlcXVlc3QsXG4gIERldmljZUF1dGhvcml6ZVJlc3BvbnNlLFxuICBDaGVja1VzZXJuYW1lUmVxdWVzdCxcbiAgQ2hlY2tJZlVzZXJFeGlzdFJlcXVlc3QsXG4gIENoZWNrSWZVc2VyRXhpc3RSZXNwb25zZSxcbiAgV2l0aFN1ZG9SZXF1ZXN0XG59IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IFNpbXBsZVN0b3JhZ2UsIFJlcXVlc3RGdW5jdGlvbiB9IGZyb20gJy4uL29hdXRoMmNsaWVudC9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgT0F1dGgyQ2xpZW50LCBkZWZhdWx0U3RvcmFnZSB9IGZyb20gJy4uL29hdXRoMmNsaWVudC9vYXV0aDJjbGllbnQnO1xuaW1wb3J0IHsgQ3JlZGVudGlhbHMgfSBmcm9tICcuLi9vYXV0aDJjbGllbnQvbW9kZWxzJztcbmltcG9ydCB7IENhcHRjaGEgfSBmcm9tICcuLi9jYXB0Y2hhL2NhcHRjaGEnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQXV0aE9wdGlvbnMge1xuICBhcGlPcmlnaW46IHN0cmluZztcbiAgY2xpZW50SWQ6IHN0cmluZztcbiAgY3JlZGVudGlhbHNDbGllbnQ/OiBPQXV0aDJDbGllbnQ7XG4gIHJlcXVlc3Q/OiBSZXF1ZXN0RnVuY3Rpb247XG4gIHN0b3JhZ2U/OiBTaW1wbGVTdG9yYWdlO1xufVxuXG4vKipcbiAqIEF1dGhcbiAqL1xuZXhwb3J0IGNsYXNzIEF1dGgge1xuICBwcml2YXRlIF9jb25maWc6IEF1dGhPcHRpb25zO1xuICBwcml2YXRlIF9nZXRDdXN0b21TaWduVGlja2V0Rm4/OiBHZXRDdXN0b21TaWduVGlja2V0Rm47XG5cblxuICAvKipcbiAgICogY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtBdXRoT3B0aW9uc30gb3B0c1xuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0czogQXV0aE9wdGlvbnMpIHtcbiAgICBsZXQgcmVxdWVzdCA9IG9wdHMucmVxdWVzdDtcbiAgICBsZXQgb0F1dGgyQ2xpZW50ID0gb3B0cy5jcmVkZW50aWFsc0NsaWVudDtcbiAgICBpZiAoIW9BdXRoMkNsaWVudCkge1xuICAgICAgY29uc3QgaW5pdE9wdGlvbnMgPSB7XG4gICAgICAgIGFwaU9yaWdpbjogb3B0cy5hcGlPcmlnaW4sXG4gICAgICAgIGNsaWVudElkOiBvcHRzLmNsaWVudElkLFxuICAgICAgICBzdG9yYWdlOiBvcHRzLnN0b3JhZ2UsXG4gICAgICB9O1xuICAgICAgb0F1dGgyQ2xpZW50ID0gbmV3IE9BdXRoMkNsaWVudChpbml0T3B0aW9ucyk7XG4gICAgfVxuICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgY29uc3QgYmFzZVJlcXVlc3QgPSBvQXV0aDJDbGllbnQucmVxdWVzdC5iaW5kKG9BdXRoMkNsaWVudCk7XG4gICAgICBjb25zdCBjYXB0Y2hhID0gbmV3IENhcHRjaGEoe1xuICAgICAgICBjbGllbnRJZDogb3B0cy5jbGllbnRJZCxcbiAgICAgICAgcmVxdWVzdDogYmFzZVJlcXVlc3QsXG4gICAgICAgIHN0b3JhZ2U6IG9wdHMuc3RvcmFnZSxcbiAgICAgIH0pXG4gICAgICByZXF1ZXN0ID0gY2FwdGNoYS5yZXF1ZXN0LmJpbmQoY2FwdGNoYSlcbiAgICB9XG4gICAgdGhpcy5fY29uZmlnID0ge1xuICAgICAgYXBpT3JpZ2luOiBvcHRzLmFwaU9yaWdpbixcbiAgICAgIGNsaWVudElkOiBvcHRzLmNsaWVudElkLFxuICAgICAgcmVxdWVzdDogcmVxdWVzdCxcbiAgICAgIGNyZWRlbnRpYWxzQ2xpZW50OiBvQXV0aDJDbGllbnQsXG4gICAgICBzdG9yYWdlOiBvcHRzLnN0b3JhZ2UgfHwgZGVmYXVsdFN0b3JhZ2UsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaWduIGluLlxuICAgKiBAcGFyYW0ge1NpZ25JblJlcXVlc3R9IHBhcmFtcyBBIFNpZ25JblJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbkluKHBhcmFtczogU2lnbkluUmVxdWVzdCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICBjb25zdCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLkFVVEhfU0lHTl9JTl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXNcbiAgICAgIH0sXG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuc2V0Q3JlZGVudGlhbHMoY3JlZGVudGlhbHMpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3JlZGVudGlhbHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpZ24gaW4gQW5vbnltb3VzbHlcbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbkFub255bW91c2x5KCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICBjb25zdCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLkFVVEhfU0lHTl9JTl9BTk9OWU1PVVNMWV9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiB7fVxuICAgICAgfSxcbiAgICApO1xuICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5zZXRDcmVkZW50aWFscyhjcmVkZW50aWFscyk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjcmVkZW50aWFscyk7XG4gIH1cblxuICAvKipcbiAgICogU2lnbiB1cC5cbiAgICogQHBhcmFtIHtTaWduVXBSZXF1ZXN0fSBwYXJhbXMgQSBTaWduVXBSZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25VcChwYXJhbXM6IFNpZ25VcFJlcXVlc3QpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgY29uc3QgZGF0YTogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLkFVVEhfU0lHTl9VUF9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB9LFxuICAgICk7XG4gICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKGRhdGEpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogU2lnbiBvdXQuXG4gICAqIEByZXR1cm4ge09iamVjdH0gQSBQcm9taXNlPHZvaWQ+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduT3V0KCk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgYWNjZXNzVG9rZW46IHN0cmluZyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5nZXRBY2Nlc3NUb2tlbigpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdChBcGlVcmxzLkFVVEhfUkVWT0tFX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiB7XG4gICAgICAgIHRva2VuOiBhY2Nlc3NUb2tlbixcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKCk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZlcmlmaWNhdGlvbi5cbiAgICogQHBhcmFtIHtHZXRWZXJpZmljYXRpb25SZXF1ZXN0fSBwYXJhbXMgQSBHZXRWZXJpZmljYXRpb25SZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT59IEEgUHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFZlcmlmaWNhdGlvbihcbiAgICBwYXJhbXM6IEdldFZlcmlmaWNhdGlvblJlcXVlc3QsXG4gICk6IFByb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IHtcbiAgICBsZXQgd2l0aENyZWRlbnRpYWxzID0gZmFsc2U7XG4gICAgLy8g5Y+R6YCB55+t5L+h5pe277yM5aaC5p6c5pe257uZ5b2T5YmN55So5oi35Y+R77yM5YiZ6ZyA6KaB5bim5LiK6Ym05p2D5L+h5oGvXG4gICAgaWYgKHBhcmFtcy50YXJnZXQgPT0gJ0NVUl9VU0VSJykge1xuICAgICAgd2l0aENyZWRlbnRpYWxzID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBoYXNMb2dpbiA9IGF3YWl0IHRoaXMuaGFzTG9naW5TdGF0ZSgpXG4gICAgICBpZiAoaGFzTG9naW4pIHtcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+KFxuICAgICAgQXBpVXJscy5WRVJJRklDQVRJT05fVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgICB3aXRoQ2FwdGNoYTogdHJ1ZSxcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB3aXRoQ3JlZGVudGlhbHMsXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogIFZlcmlmeSB0aGUgY29kZVxuICAgKiBAcGFyYW0ge1ZlcmlmeVJlcXVlc3R9IHBhcmFtcyBBIFZlcmlmeVJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFZlcmlmeVJlc3BvbnNlPn0gQSBQcm9taXNlPFZlcmlmeVJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdmVyaWZ5KHBhcmFtczogVmVyaWZ5UmVxdWVzdCk6IFByb21pc2U8VmVyaWZ5UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VmVyaWZ5UmVzcG9uc2U+KEFwaVVybHMuVkVSSUZZX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2VuIHByb3ZpZGVyIHJlZGlyZWN0IHVyaS5cbiAgICogQHBhcmFtIHtHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVxdWVzdH0gcGFyYW1zIEEgR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT59IEEgUHJvbWlzZTxHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZW5Qcm92aWRlclJlZGlyZWN0VXJpKFxuICAgIHBhcmFtczogR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlcXVlc3QsXG4gICk6IFByb21pc2U8R2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlc3BvbnNlPiB7XG4gICAgbGV0IHVybCA9IGAke0FwaVVybHMuUFJPVklERVJfVVJJX1VSTH0/Y2xpZW50X2lkPSR7dGhpcy5fY29uZmlnLmNsaWVudElkXG4gICAgICB9JnByb3ZpZGVyX2lkPSR7cGFyYW1zLnByb3ZpZGVyX2lkfSZyZWRpcmVjdF91cmk9JHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgIHBhcmFtcy5wcm92aWRlcl9yZWRpcmVjdF91cmksXG4gICAgICApfSZzdGF0ZT0ke3BhcmFtcy5zdGF0ZX1gO1xuICAgIGNvbnN0IG90aGVyX3BhcmFtcyA9IHBhcmFtcy5vdGhlcl9wYXJhbXM7XG4gICAgaWYgKG90aGVyX3BhcmFtcykge1xuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2Ygb3RoZXJfcGFyYW1zLnNpZ25fb3V0X3VyaSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgb3RoZXJfcGFyYW1zLnNpZ25fb3V0X3VyaS5sZW5ndGggPiAwXG4gICAgICApIHtcbiAgICAgICAgdXJsICs9IGAmb3RoZXJfcGFyYW1zW3NpZ25fb3V0X3VyaV09JHtvdGhlcl9wYXJhbXMuc2lnbl9vdXRfdXJpfWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVzcG9uc2U+KHVybCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHcmFudCBwcm92aWRlciB0b2tlbi5cbiAgICogQHBhcmFtIHtHcmFudFByb3ZpZGVyVG9rZW5SZXF1ZXN0fSBwYXJhbXMgQSBHcmFudFByb3ZpZGVyVG9rZW5SZXF1ZXN0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxHcmFudFByb3ZpZGVyVG9rZW5SZXNwb25zZT59IEEgUHJvbWlzZTxHcmFudFByb3ZpZGVyVG9rZW5SZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdyYW50UHJvdmlkZXJUb2tlbihcbiAgICBwYXJhbXM6IEdyYW50UHJvdmlkZXJUb2tlblJlcXVlc3QsXG4gICk6IFByb21pc2U8R3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8R3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2U+KFxuICAgICAgQXBpVXJscy5QUk9WSURFUl9UT0tFTl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR3JhbnQgcHJvdmlkZXIgdG9rZW4uXG4gICAqIEBwYXJhbSB7UGF0Y2hQcm92aWRlclRva2VuUmVxdWVzdH0gcGFyYW1zIEEgUGF0Y2hQcm92aWRlclRva2VuUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UGF0Y2hQcm92aWRlclRva2VuUmVzcG9uc2U+fSBBIFByb21pc2U8UGF0Y2hQcm92aWRlclRva2VuUmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBwYXRjaFByb3ZpZGVyVG9rZW4oXG4gICAgcGFyYW1zOiBQYXRjaFByb3ZpZGVyVG9rZW5SZXF1ZXN0LFxuICApOiBQcm9taXNlPFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPihcbiAgICAgIEFwaVVybHMuUFJPVklERVJfVE9LRU5fVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaWduaW4gd2l0aCBwcm92aWRlciByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge1NpZ25JbldpdGhQcm92aWRlclJlcXVlc3R9IHBhcmFtcyBBIFNpZ25JbldpdGhQcm92aWRlclJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aFByb3ZpZGVyKFxuICAgIHBhcmFtczogU2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIGNvbnN0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgIEFwaVVybHMuQVVUSF9TSUdOX0lOX1dJVEhfUFJPVklERVJfVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgfSxcbiAgICApO1xuICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5zZXRDcmVkZW50aWFscyhjcmVkZW50aWFscyk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjcmVkZW50aWFscyk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCB3aXRoIHByb3ZpZGVyXG4gICAqIEBwYXJhbSB7QmluZFdpdGhQcm92aWRlclJlcXVlc3R9IHBhcmFtcyBBIEJpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTx2b2lkPn0gQSBQcm9taXNlPGFueT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGJpbmRXaXRoUHJvdmlkZXIoXG4gICAgcGFyYW1zOiBCaW5kV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oQXBpVXJscy5QUk9WSURFUl9CSU5EX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB1c2VyIHByb2ZpbGUuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VXNlclByb2ZpbGU+fSBBIFByb21pc2U8VXNlclByb2ZpbGU+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRVc2VyUHJvZmlsZSgpOiBQcm9taXNlPFVzZXJQcm9maWxlPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VXNlckluZm8oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHVzZXIgaW5mby5cbiAgICogQHJldHVybiB7UHJvbWlzZTxVc2VySW5mbz59IEEgUHJvbWlzZTxVc2VyUHJvZmlsZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFVzZXJJbmZvKCk6IFByb21pc2U8VXNlckluZm8+IHtcbiAgICBjb25zdCB1c2VySW5mbyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFVzZXJJbmZvPihBcGlVcmxzLlVTRVJfTUVfVVJMLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgaWYgKHVzZXJJbmZvLnN1Yikge1xuICAgICAgdXNlckluZm8udWlkID0gdXNlckluZm8uc3ViXG4gICAgfVxuXG4gICAgcmV0dXJuIHVzZXJJbmZvO1xuICB9XG5cbiAgLyoqXG4gICAgICogRGVsZXRlIG1lXG4gICAgICogQHBhcmFtIHBhcmFtc1xuICAgICAqL1xuICBwdWJsaWMgYXN5bmMgZGVsZXRlTWUocGFyYW1zOiBXaXRoU3Vkb1JlcXVlc3QpOiBQcm9taXNlPFVzZXJQcm9maWxlPiB7XG4gICAgY29uc3QgdXJsID0gYCR7QXBpVXJscy5VU0VSX01FX1VSTH0/JHtBdXRoLnBhcnNlUGFyYW1zVG9TZWFyY2gocGFyYW1zKX1gO1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxVc2VyUHJvZmlsZT4odXJsLCB7XG4gICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhc0xvZ2luU3RhdGUgY2hlY2sgaWYgaGFzIGxvZ2luIHN0YXRlXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Ym9vbGVhbj59IEEgUHJvbWlzZTxib29sZWFuPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaGFzTG9naW5TdGF0ZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LmdldEFjY2Vzc1Rva2VuKClcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBoYXNMb2dpblN0YXRlU3luYygpOiBDcmVkZW50aWFscyB8IG51bGwge1xuICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LmdldENyZWRlbnRpYWxzU3luYygpXG4gICAgcmV0dXJuIGNyZWRlbnRpYWxzXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0TG9naW5TdGF0ZSgpOiBQcm9taXNlPENyZWRlbnRpYWxzIHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuZ2V0Q3JlZGVudGlhbHNBc3luYygpXG4gIH1cblxuICAvKipcbiAgICogVHJhbnMgYnkgcHJvdmlkZXIuXG4gICAqIEBwYXJhbSB7VHJhbnNCeVByb3ZpZGVyUmVxdWVzdH0gcGFyYW1zIEEgVHJhbnNCeVByb3ZpZGVyUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fSBBIFByb21pc2U8Q3JlZGVudGlhbHM+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyB0cmFuc0J5UHJvdmlkZXIoXG4gICAgcGFyYW1zOiBUcmFuc0J5UHJvdmlkZXJSZXF1ZXN0LFxuICApOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgIEFwaVVybHMuVVNFUl9UUkFOU19CWV9QUk9WSURFUl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR3JhbnQgdG9rZW4uXG4gICAqIEBwYXJhbSB7R3JhbnRUb2tlblJlcXVlc3R9IHBhcmFtcyBBIEdyYW50VG9rZW5SZXF1ZXN0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdyYW50VG9rZW4ocGFyYW1zOiBHcmFudFRva2VuUmVxdWVzdCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q3JlZGVudGlhbHM+KEFwaVVybHMuQVVUSF9UT0tFTl9VUkwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcHJvdmlkZSBsaXN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlUHJvdmlkZXI+fSBBIFByb21pc2U8VXNlclByb2ZpbGVQcm92aWRlcj4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFByb3ZpZGVycygpOiBQcm9taXNlPFVzZXJQcm9maWxlUHJvdmlkZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VXNlclByb2ZpbGVQcm92aWRlcj4oQXBpVXJscy5QUk9WSURFUl9MSVNULCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVuYmluZCBwcm92aWRlci5cbiAgICogQHBhcmFtIHtVbmJpbmRQcm92aWRlclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdW5iaW5kUHJvdmlkZXIocGFyYW1zOiBVbmJpbmRQcm92aWRlclJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8YW55PihcbiAgICAgIGAke0FwaVVybHMuUFJPVklERVJfVU5CSU5EX1VSTH0vJHtwYXJhbXMucHJvdmlkZXJfaWR9YCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrIFBhc3N3b3JkLlxuICAgKiBAcGFyYW0ge0NoZWNrUGFzc3dvcmRyUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBjaGVja1Bhc3N3b3JkKHBhcmFtczogQ2hlY2tQYXNzd29yZHJSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oYCR7QXBpVXJscy5DSEVDS19QV0RfVVJMfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrIFBhc3N3b3JkLlxuICAgKiBAcGFyYW0ge0NoZWNrUGFzc3dvcmRyUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBiaW5kUGhvbmUocGFyYW1zOiBCaW5kUGhvbmVSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oYCR7QXBpVXJscy5CSU5EX0NPTlRBQ1RfVVJMfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayBQYXNzd29yZC5cbiAgICogQHBhcmFtIHtDaGVja1Bhc3N3b3JkclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgYmluZEVtYWlsKHBhcmFtczogQmluZEVtYWlsUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KGAke0FwaVVybHMuQklORF9DT05UQUNUX1VSTH1gLCB7XG4gICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFBhc3N3b3JkLlxuICAgKiBAcGFyYW0ge1NldFBhc3N3b3JkclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2V0UGFzc3dvcmQocGFyYW1zOiBTZXRQYXNzd29yZFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8YW55PihgJHtBcGlVcmxzLkFVVEhfU0VUX1BBU1NXT1JEfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICogdXBkYXRlUGFzc3dvcmRCeU9sZCDkvb/nlKjml6flr4bnoIHkv67mlLnlr4bnoIHvvIzlpoLmnpzlt7Lnu4/nu5HlrprmiYvmnLrlj7fvvIzor7flhYjvvJpzdWRv77yM5YaN5L+u5pS55a+G56CBXG4gKiBAcGFyYW0ge1NldFBhc3N3b3JkclJlcXVlc3R9IHBhcmFtc1xuICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICovXG4gIHB1YmxpYyBhc3luYyB1cGRhdGVQYXNzd29yZEJ5T2xkKHBhcmFtczogVXBkYXRlUGFzc3dvcmRSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3Vkb1Rva2VuID0gYXdhaXQgdGhpcy5zdWRvKHsgcGFzc3dvcmQ6IHBhcmFtcy5vbGRfcGFzc3dvcmQgfSlcbiAgICByZXR1cm4gdGhpcy5zZXRQYXNzd29yZCh7XG4gICAgICBzdWRvX3Rva2VuOiBzdWRvVG9rZW4uc3Vkb190b2tlbixcbiAgICAgIG5ld19wYXNzd29yZDogcGFyYW1zLm5ld19wYXNzd29yZCxcbiAgICB9KVxuICB9XG5cblxuICAvKipcbiAgICogc3Vkb1xuICAgKiBAcGFyYW0ge3N1ZG99IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc3VkbyhwYXJhbXM6IFN1ZG9SZXF1ZXN0KTogUHJvbWlzZTxTdWRvUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8U3Vkb1Jlc3BvbnNlPihgJHtBcGlVcmxzLlNVRE9fVVJMfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCB1c2VyIHZlcmlmaWNhdGlvbi5cbiAgICogQHBhcmFtIHtHZXRWZXJpZmljYXRpb25SZXF1ZXN0fSBwYXJhbXMgQSBHZXRWZXJpZmljYXRpb25SZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT59IEEgUHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEN1clVzZXJWZXJpZmljYXRpb24oXG4gICAgcGFyYW1zOiBHZXRWZXJpZmljYXRpb25SZXF1ZXN0LFxuICApOiBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiB7XG4gICAgcGFyYW1zLnRhcmdldCA9ICdDVVJfVVNFUic7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPihcbiAgICAgIEFwaVVybHMuVkVSSUZJQ0FUSU9OX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICB3aXRoQ2FwdGNoYTogdHJ1ZVxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIGNoYW5nZSBiaW5kZWQgcHJvdmlkZXIuXG4gICAqIEBwYXJhbSB7R2V0VmVyaWZpY2F0aW9uUmVxdWVzdH0gcGFyYW1zIEEgR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCBPYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+fSBBIFByb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBjaGFuZ2VCaW5kZWRQcm92aWRlcihcbiAgICBwYXJhbXM6IENoYW5nZUJpbmRlZFByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxDaGFuZ2VCaW5kZWRQcm92aWRlclJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENoYW5nZUJpbmRlZFByb3ZpZGVyUmVzcG9uc2U+KFxuICAgICAgYCR7QXBpVXJscy5QUk9WSURFUl9MSVNUfS8ke3BhcmFtcy5wcm92aWRlcl9pZH0vdHJhbnNgLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIHByb3ZpZGVyX3RyYW5zX3Rva2VuOiBwYXJhbXMudHJhbnNfdG9rZW4sXG4gICAgICAgIH0sXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXRjaCB0aGUgdXNlciBwcm9maWxlLlxuICAgKiBAcGFyYW0ge1VzZXJQcm9maWxlfSBwYXJhbXMgQSBVc2VyUHJvZmlsZSBPYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VXNlclByb2ZpbGU+fSBBIFByb21pc2U8VXNlclByb2ZpbGU+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZXRVc2VyUHJvZmlsZShwYXJhbXM6IFVzZXJQcm9maWxlKTogUHJvbWlzZTxVc2VyUHJvZmlsZT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxVc2VyUHJvZmlsZT4oQXBpVXJscy5VU0VSX1BSSUZJTEVfVVJMLCB7XG4gICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUGF0Y2ggdGhlIHVzZXIgcHJvZmlsZS5cbiAgICogQHBhcmFtIHtRdWVyeVVzZXJQcm9maWxlUmVxfSBhcHBlbmRlZF9wYXJhbXMgQSBRdWVyeVVzZXJQcm9maWxlUmVxIE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxVc2VyUHJvZmlsZT59IEEgUHJvbWlzZTxVc2VyUHJvZmlsZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHF1ZXJ5VXNlclByb2ZpbGUoXG4gICAgcGFyYW1zOiBRdWVyeVVzZXJQcm9maWxlUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxRdWVyeVVzZXJQcm9maWxlUmVzcG9uc2U+IHtcbiAgICAvLyBsZXQgdXJsID0gbmV3IFVSTChBcGlVcmxzLlVTRVJfUVVFUllfVVJMKTtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtcyBhcyBhbnkpO1xuICAgIC8vIHVybC5zZWFyY2ggPSBzZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8UXVlcnlVc2VyUHJvZmlsZVJlc3BvbnNlPihgJHtBcGlVcmxzLlVTRVJfUVVFUllfVVJMfT8ke3NlYXJjaFBhcmFtcy50b1N0cmluZygpfWAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogc2V0Q3VzdG9tU2lnbkZ1bmMgc2V0IHRoZSBnZXQgdGlja2V0IGZ1bmN0aW9uXG4gICAqIEBwYXJhbSBnZXRUaWNrRm5cbiAgICovXG4gIHB1YmxpYyBzZXRDdXN0b21TaWduRnVuYyhnZXRUaWNrRm46IEdldEN1c3RvbVNpZ25UaWNrZXRGbikge1xuICAgIHRoaXMuX2dldEN1c3RvbVNpZ25UaWNrZXRGbiA9IGdldFRpY2tGblxuICB9XG5cbiAgLyoqXG4gICAqIFNpZ25JbldpdGhDdXN0b21UaWNrZXQgY3VzdG9tIHNpZ25JblxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduSW5XaXRoQ3VzdG9tVGlja2V0KCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICBjb25zdCBjdXN0b21UaWNrZXQgPSBhd2FpdCB0aGlzLl9nZXRDdXN0b21TaWduVGlja2V0Rm4oKVxuICAgIHJldHVybiB0aGlzLnNpZ25JbldpdGhQcm92aWRlcih7XG4gICAgICBwcm92aWRlcl9pZDogJ2N1c3RvbScsXG4gICAgICBwcm92aWRlcl90b2tlbjogY3VzdG9tVGlja2V0XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBwYXNzd29yZFxuICAgKiBAcGFyYW0ge1Jlc2V0UGFzc3dvcmRSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqIEBtZW1iZXJvZiBBdXRoXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcmVzZXRQYXNzd29yZChwYXJhbXM6IFJlc2V0UGFzc3dvcmRSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0KEFwaVVybHMuQVVUSF9SRVNFVF9QQVNTV09SRCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgICAvLyB3aXRoQ3JlZGVudGlhbHM6IHRydWVcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIGRldmljZSBhdXRob3JpemF0aW9uXG4gICAqIEBwYXJhbSB7RGV2aWNlQXV0aG9yaXplUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPERldmljZUF1dGhvcml6ZVJlc3BvbnNlPn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIHB1YmxpYyBhc3luYyBkZXZpY2VBdXRob3JpemUocGFyYW1zOiBEZXZpY2VBdXRob3JpemVSZXF1ZXN0KTogUHJvbWlzZTxEZXZpY2VBdXRob3JpemVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdChBcGlVcmxzLkFVVEhfR0VUX0RFVklDRV9DT0RFLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2hlY2tVc2VybmFtZShwYXJhbXM6IENoZWNrVXNlcm5hbWVSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0KEFwaVVybHMuQ0hFQ0tfVVNFUk5BTUUsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGNoZWNrSWZVc2VyRXhpc3QocGFyYW1zOiBDaGVja0lmVXNlckV4aXN0UmVxdWVzdCk6IFByb21pc2U8Q2hlY2tJZlVzZXJFeGlzdFJlc3BvbnNlPiB7XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbXMgYXMgYW55KTtcblxuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxDaGVja0lmVXNlckV4aXN0UmVzcG9uc2U+KGAke0FwaVVybHMuQ0hFQ0tfSUZfVVNFUl9FWElTVH0/JHtzZWFyY2hQYXJhbXMudG9TdHJpbmcoKX1gLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbG9naW5TY29wZSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuZ2V0U2NvcGUoKVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcGFyc2VQYXJhbXNUb1NlYXJjaChwYXJhbXM6IGFueSk6IHN0cmluZyB7XG4gICAgZm9yIChsZXQga2V5IGluIHBhcmFtcykge1xuICAgICAgaWYgKCFwYXJhbXNba2V5XSkge1xuICAgICAgICBkZWxldGUgcGFyYW1zW2tleV1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbXMgYXMgYW55KTtcbiAgICByZXR1cm4gc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG4gIH1cbn1cbiJdfQ==