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
                        if (userInfo.picture) {
                            userInfo.avatarUrl = userInfo.picture;
                        }
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
                        method: 'GET',
                        body: params,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRoL2FwaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFYixtQ0FBbUM7QUEyQ25DLDZEQUE0RTtBQUU1RSw4Q0FBNkM7QUFjN0M7SUFTRSxjQUFZLElBQWlCO1FBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDM0IsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsSUFBTSxXQUFXLEdBQUc7Z0JBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQztZQUNGLFlBQVksR0FBRyxJQUFJLDJCQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDOUM7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osSUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUQsSUFBTSxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDO2dCQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLE9BQU8sRUFBRSxXQUFXO2dCQUNwQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ3hDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNiLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsT0FB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QUFPLENBQUMsbUJBQW1CLFNBQUksWUFBWSxDQUFDLFFBQVEsRUFBSSxFQUFFO3dCQUNqSCxNQUFNLEVBQUUsS0FBSzt3QkFDYixJQUFJLEVBQUUsTUFBTTtxQkFDYixDQUFDLEVBQUM7OztLQUNKO0lBRVkseUJBQVUsR0FBdkI7OztnQkFDRSxXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEVBQUE7OztLQUNqRDtJQUVjLHdCQUFtQixHQUFsQyxVQUFtQyxNQUFXO1FBQzVDLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ25CO1NBQ0Y7UUFDRCxJQUFNLFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBQyxNQUFhLENBQUMsQ0FBQztRQUN4RCxPQUFPLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBQ0gsV0FBQztBQUFELENBQUMsQUF4a0JELElBd2tCQztBQXhrQlksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IEFwaVVybHMgfSBmcm9tICcuL2NvbnN0cyc7XG5pbXBvcnQge1xuICBHZXRWZXJpZmljYXRpb25SZXF1ZXN0LFxuICBHZXRWZXJpZmljYXRpb25SZXNwb25zZSxcbiAgVXNlclByb2ZpbGUsXG4gIFVzZXJJbmZvLFxuICBTaWduSW5SZXF1ZXN0LFxuICBTaWduVXBSZXF1ZXN0LFxuICBWZXJpZnlSZXF1ZXN0LFxuICBWZXJpZnlSZXNwb25zZSxcbiAgR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlcXVlc3QsXG4gIEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZSxcbiAgR3JhbnRQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgR3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2UsXG4gIFBhdGNoUHJvdmlkZXJUb2tlblJlcXVlc3QsXG4gIFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlLFxuICBTaWduSW5XaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICBCaW5kV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgVHJhbnNCeVByb3ZpZGVyUmVxdWVzdCxcbiAgR3JhbnRUb2tlblJlcXVlc3QsXG4gIFVzZXJQcm9maWxlUHJvdmlkZXIsXG4gIFVuYmluZFByb3ZpZGVyUmVxdWVzdCxcbiAgQ2hlY2tQYXNzd29yZHJSZXF1ZXN0LFxuICBCaW5kUGhvbmVSZXF1ZXN0LFxuICBCaW5kRW1haWxSZXF1ZXN0LFxuICBTZXRQYXNzd29yZFJlcXVlc3QsXG4gIENoYW5nZUJpbmRlZFByb3ZpZGVyUmVxdWVzdCxcbiAgQ2hhbmdlQmluZGVkUHJvdmlkZXJSZXNwb25zZSxcbiAgVXBkYXRlUGFzc3dvcmRSZXF1ZXN0LFxuICBTdWRvUmVzcG9uc2UsXG4gIFN1ZG9SZXF1ZXN0LFxuICBHZXRDdXN0b21TaWduVGlja2V0Rm4sXG4gIFF1ZXJ5VXNlclByb2ZpbGVSZXF1ZXN0LFxuICBRdWVyeVVzZXJQcm9maWxlUmVzcG9uc2UsXG4gIFJlc2V0UGFzc3dvcmRSZXF1ZXN0LFxuICBEZXZpY2VBdXRob3JpemVSZXF1ZXN0LFxuICBEZXZpY2VBdXRob3JpemVSZXNwb25zZSxcbiAgQ2hlY2tVc2VybmFtZVJlcXVlc3QsXG4gIENoZWNrSWZVc2VyRXhpc3RSZXF1ZXN0LFxuICBDaGVja0lmVXNlckV4aXN0UmVzcG9uc2UsXG4gIFdpdGhTdWRvUmVxdWVzdFxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBTaW1wbGVTdG9yYWdlLCBSZXF1ZXN0RnVuY3Rpb24gfSBmcm9tICcuLi9vYXV0aDJjbGllbnQvaW50ZXJmYWNlJztcbmltcG9ydCB7IE9BdXRoMkNsaWVudCwgZGVmYXVsdFN0b3JhZ2UgfSBmcm9tICcuLi9vYXV0aDJjbGllbnQvb2F1dGgyY2xpZW50JztcbmltcG9ydCB7IENyZWRlbnRpYWxzIH0gZnJvbSAnLi4vb2F1dGgyY2xpZW50L21vZGVscyc7XG5pbXBvcnQgeyBDYXB0Y2hhIH0gZnJvbSAnLi4vY2FwdGNoYS9jYXB0Y2hhJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhPcHRpb25zIHtcbiAgYXBpT3JpZ2luOiBzdHJpbmc7XG4gIGNsaWVudElkOiBzdHJpbmc7XG4gIGNyZWRlbnRpYWxzQ2xpZW50PzogT0F1dGgyQ2xpZW50O1xuICByZXF1ZXN0PzogUmVxdWVzdEZ1bmN0aW9uO1xuICBzdG9yYWdlPzogU2ltcGxlU3RvcmFnZTtcbn1cblxuLyoqXG4gKiBBdXRoXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRoIHtcbiAgcHJpdmF0ZSBfY29uZmlnOiBBdXRoT3B0aW9ucztcbiAgcHJpdmF0ZSBfZ2V0Q3VzdG9tU2lnblRpY2tldEZuPzogR2V0Q3VzdG9tU2lnblRpY2tldEZuO1xuXG5cbiAgLyoqXG4gICAqIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7QXV0aE9wdGlvbnN9IG9wdHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdHM6IEF1dGhPcHRpb25zKSB7XG4gICAgbGV0IHJlcXVlc3QgPSBvcHRzLnJlcXVlc3Q7XG4gICAgbGV0IG9BdXRoMkNsaWVudCA9IG9wdHMuY3JlZGVudGlhbHNDbGllbnQ7XG4gICAgaWYgKCFvQXV0aDJDbGllbnQpIHtcbiAgICAgIGNvbnN0IGluaXRPcHRpb25zID0ge1xuICAgICAgICBhcGlPcmlnaW46IG9wdHMuYXBpT3JpZ2luLFxuICAgICAgICBjbGllbnRJZDogb3B0cy5jbGllbnRJZCxcbiAgICAgICAgc3RvcmFnZTogb3B0cy5zdG9yYWdlLFxuICAgICAgfTtcbiAgICAgIG9BdXRoMkNsaWVudCA9IG5ldyBPQXV0aDJDbGllbnQoaW5pdE9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgIGNvbnN0IGJhc2VSZXF1ZXN0ID0gb0F1dGgyQ2xpZW50LnJlcXVlc3QuYmluZChvQXV0aDJDbGllbnQpO1xuICAgICAgY29uc3QgY2FwdGNoYSA9IG5ldyBDYXB0Y2hhKHtcbiAgICAgICAgY2xpZW50SWQ6IG9wdHMuY2xpZW50SWQsXG4gICAgICAgIHJlcXVlc3Q6IGJhc2VSZXF1ZXN0LFxuICAgICAgICBzdG9yYWdlOiBvcHRzLnN0b3JhZ2UsXG4gICAgICB9KVxuICAgICAgcmVxdWVzdCA9IGNhcHRjaGEucmVxdWVzdC5iaW5kKGNhcHRjaGEpXG4gICAgfVxuICAgIHRoaXMuX2NvbmZpZyA9IHtcbiAgICAgIGFwaU9yaWdpbjogb3B0cy5hcGlPcmlnaW4sXG4gICAgICBjbGllbnRJZDogb3B0cy5jbGllbnRJZCxcbiAgICAgIHJlcXVlc3Q6IHJlcXVlc3QsXG4gICAgICBjcmVkZW50aWFsc0NsaWVudDogb0F1dGgyQ2xpZW50LFxuICAgICAgc3RvcmFnZTogb3B0cy5zdG9yYWdlIHx8IGRlZmF1bHRTdG9yYWdlLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU2lnbiBpbi5cbiAgICogQHBhcmFtIHtTaWduSW5SZXF1ZXN0fSBwYXJhbXMgQSBTaWduSW5SZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbihwYXJhbXM6IFNpZ25JblJlcXVlc3QpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgY29uc3QgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q3JlZGVudGlhbHM+KFxuICAgICAgQXBpVXJscy5BVVRIX1NJR05fSU5fVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogcGFyYW1zXG4gICAgICB9LFxuICAgICk7XG4gICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKGNyZWRlbnRpYWxzKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNyZWRlbnRpYWxzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaWduIGluIEFub255bW91c2x5XG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fSBBIFByb21pc2U8Q3JlZGVudGlhbHM+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduSW5Bbm9ueW1vdXNseSgpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgY29uc3QgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q3JlZGVudGlhbHM+KFxuICAgICAgQXBpVXJscy5BVVRIX1NJR05fSU5fQU5PTllNT1VTTFlfVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keToge31cbiAgICAgIH0sXG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuc2V0Q3JlZGVudGlhbHMoY3JlZGVudGlhbHMpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3JlZGVudGlhbHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpZ24gdXAuXG4gICAqIEBwYXJhbSB7U2lnblVwUmVxdWVzdH0gcGFyYW1zIEEgU2lnblVwUmVxdWVzdCBPYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fSBBIFByb21pc2U8Q3JlZGVudGlhbHM+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduVXAocGFyYW1zOiBTaWduVXBSZXF1ZXN0KTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIGNvbnN0IGRhdGE6IENyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q3JlZGVudGlhbHM+KFxuICAgICAgQXBpVXJscy5BVVRIX1NJR05fVVBfVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgfSxcbiAgICApO1xuICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5zZXRDcmVkZW50aWFscyhkYXRhKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpZ24gb3V0LlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IEEgUHJvbWlzZTx2b2lkPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbk91dCgpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuOiBzdHJpbmcgPSBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuZ2V0QWNjZXNzVG9rZW4oKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5fY29uZmlnLnJlcXVlc3QoQXBpVXJscy5BVVRIX1JFVk9LRV9VUkwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keToge1xuICAgICAgICB0b2tlbjogYWNjZXNzVG9rZW4sXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5zZXRDcmVkZW50aWFscygpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB2ZXJpZmljYXRpb24uXG4gICAqIEBwYXJhbSB7R2V0VmVyaWZpY2F0aW9uUmVxdWVzdH0gcGFyYW1zIEEgR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCBPYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+fSBBIFByb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRWZXJpZmljYXRpb24oXG4gICAgcGFyYW1zOiBHZXRWZXJpZmljYXRpb25SZXF1ZXN0LFxuICApOiBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiB7XG4gICAgbGV0IHdpdGhDcmVkZW50aWFscyA9IGZhbHNlO1xuICAgIC8vIOWPkemAgeefreS/oeaXtu+8jOWmguaenOaXtue7meW9k+WJjeeUqOaIt+WPke+8jOWImemcgOimgeW4puS4iumJtOadg+S/oeaBr1xuICAgIGlmIChwYXJhbXMudGFyZ2V0ID09ICdDVVJfVVNFUicpIHtcbiAgICAgIHdpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaGFzTG9naW4gPSBhd2FpdCB0aGlzLmhhc0xvZ2luU3RhdGUoKVxuICAgICAgaWYgKGhhc0xvZ2luKSB7XG4gICAgICAgIHdpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPihcbiAgICAgIEFwaVVybHMuVkVSSUZJQ0FUSU9OX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgd2l0aENhcHRjaGE6IHRydWUsXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogd2l0aENyZWRlbnRpYWxzLFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqICBWZXJpZnkgdGhlIGNvZGVcbiAgICogQHBhcmFtIHtWZXJpZnlSZXF1ZXN0fSBwYXJhbXMgQSBWZXJpZnlSZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxWZXJpZnlSZXNwb25zZT59IEEgUHJvbWlzZTxWZXJpZnlSZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHZlcmlmeShwYXJhbXM6IFZlcmlmeVJlcXVlc3QpOiBQcm9taXNlPFZlcmlmeVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFZlcmlmeVJlc3BvbnNlPihBcGlVcmxzLlZFUklGWV9VUkwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbiBwcm92aWRlciByZWRpcmVjdCB1cmkuXG4gICAqIEBwYXJhbSB7R2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlcXVlc3R9IHBhcmFtcyBBIEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXF1ZXN0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVzcG9uc2U+fSBBIFByb21pc2U8R2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2VuUHJvdmlkZXJSZWRpcmVjdFVyaShcbiAgICBwYXJhbXM6IEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXF1ZXN0LFxuICApOiBQcm9taXNlPEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT4ge1xuICAgIGxldCB1cmwgPSBgJHtBcGlVcmxzLlBST1ZJREVSX1VSSV9VUkx9P2NsaWVudF9pZD0ke3RoaXMuX2NvbmZpZy5jbGllbnRJZFxuICAgICAgfSZwcm92aWRlcl9pZD0ke3BhcmFtcy5wcm92aWRlcl9pZH0mcmVkaXJlY3RfdXJpPSR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICBwYXJhbXMucHJvdmlkZXJfcmVkaXJlY3RfdXJpLFxuICAgICAgKX0mc3RhdGU9JHtwYXJhbXMuc3RhdGV9YDtcbiAgICBjb25zdCBvdGhlcl9wYXJhbXMgPSBwYXJhbXMub3RoZXJfcGFyYW1zO1xuICAgIGlmIChvdGhlcl9wYXJhbXMpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIG90aGVyX3BhcmFtcy5zaWduX291dF91cmkgPT09ICdzdHJpbmcnICYmXG4gICAgICAgIG90aGVyX3BhcmFtcy5zaWduX291dF91cmkubGVuZ3RoID4gMFxuICAgICAgKSB7XG4gICAgICAgIHVybCArPSBgJm90aGVyX3BhcmFtc1tzaWduX291dF91cmldPSR7b3RoZXJfcGFyYW1zLnNpZ25fb3V0X3VyaX1gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8R2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlc3BvbnNlPih1cmwsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR3JhbnQgcHJvdmlkZXIgdG9rZW4uXG4gICAqIEBwYXJhbSB7R3JhbnRQcm92aWRlclRva2VuUmVxdWVzdH0gcGFyYW1zIEEgR3JhbnRQcm92aWRlclRva2VuUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8R3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2U+fSBBIFByb21pc2U8R3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBncmFudFByb3ZpZGVyVG9rZW4oXG4gICAgcGFyYW1zOiBHcmFudFByb3ZpZGVyVG9rZW5SZXF1ZXN0LFxuICApOiBQcm9taXNlPEdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PEdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlPihcbiAgICAgIEFwaVVybHMuUFJPVklERVJfVE9LRU5fVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyYW50IHByb3ZpZGVyIHRva2VuLlxuICAgKiBAcGFyYW0ge1BhdGNoUHJvdmlkZXJUb2tlblJlcXVlc3R9IHBhcmFtcyBBIFBhdGNoUHJvdmlkZXJUb2tlblJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPn0gQSBQcm9taXNlPFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcGF0Y2hQcm92aWRlclRva2VuKFxuICAgIHBhcmFtczogUGF0Y2hQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxQYXRjaFByb3ZpZGVyVG9rZW5SZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxQYXRjaFByb3ZpZGVyVG9rZW5SZXNwb25zZT4oXG4gICAgICBBcGlVcmxzLlBST1ZJREVSX1RPS0VOX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU2lnbmluIHdpdGggcHJvdmlkZXIgcmVxdWVzdC5cbiAgICogQHBhcmFtIHtTaWduSW5XaXRoUHJvdmlkZXJSZXF1ZXN0fSBwYXJhbXMgQSBTaWduSW5XaXRoUHJvdmlkZXJSZXF1ZXN0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbldpdGhQcm92aWRlcihcbiAgICBwYXJhbXM6IFNpZ25JbldpdGhQcm92aWRlclJlcXVlc3QsXG4gICk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICBjb25zdCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLkFVVEhfU0lHTl9JTl9XSVRIX1BST1ZJREVSX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIH0sXG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuc2V0Q3JlZGVudGlhbHMoY3JlZGVudGlhbHMpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3JlZGVudGlhbHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgd2l0aCBwcm92aWRlclxuICAgKiBAcGFyYW0ge0JpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0fSBwYXJhbXMgQSBCaW5kV2l0aFByb3ZpZGVyUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8dm9pZD59IEEgUHJvbWlzZTxhbnk+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBiaW5kV2l0aFByb3ZpZGVyKFxuICAgIHBhcmFtczogQmluZFdpdGhQcm92aWRlclJlcXVlc3QsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KEFwaVVybHMuUFJPVklERVJfQklORF9VUkwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdXNlciBwcm9maWxlLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0VXNlclByb2ZpbGUoKTogUHJvbWlzZTxVc2VyUHJvZmlsZT4ge1xuICAgIHJldHVybiB0aGlzLmdldFVzZXJJbmZvKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB1c2VyIGluZm8uXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VXNlckluZm8+fSBBIFByb21pc2U8VXNlclByb2ZpbGU+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRVc2VySW5mbygpOiBQcm9taXNlPFVzZXJJbmZvPiB7XG4gICAgY29uc3QgdXNlckluZm8gPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxVc2VySW5mbz4oQXBpVXJscy5VU0VSX01FX1VSTCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICB9KTtcbiAgICBpZiAodXNlckluZm8ucGljdHVyZSkge1xuICAgICAgdXNlckluZm8uYXZhdGFyVXJsID0gdXNlckluZm8ucGljdHVyZTtcbiAgICB9XG5cbiAgICBpZiAodXNlckluZm8uc3ViKSB7XG4gICAgICB1c2VySW5mby51aWQgPSB1c2VySW5mby5zdWJcbiAgICB9XG5cbiAgICByZXR1cm4gdXNlckluZm87XG4gIH1cblxuICAvKipcbiAgICAgKiBEZWxldGUgbWVcbiAgICAgKiBAcGFyYW0gcGFyYW1zXG4gICAgICovXG4gIHB1YmxpYyBhc3luYyBkZWxldGVNZShwYXJhbXM6IFdpdGhTdWRvUmVxdWVzdCk6IFByb21pc2U8VXNlclByb2ZpbGU+IHtcbiAgICBjb25zdCB1cmwgPSBgJHtBcGlVcmxzLlVTRVJfTUVfVVJMfT8ke0F1dGgucGFyc2VQYXJhbXNUb1NlYXJjaChwYXJhbXMpfWA7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFVzZXJQcm9maWxlPih1cmwsIHtcbiAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogaGFzTG9naW5TdGF0ZSBjaGVjayBpZiBoYXMgbG9naW4gc3RhdGVcbiAgICogQHJldHVybiB7UHJvbWlzZTxib29sZWFuPn0gQSBQcm9taXNlPGJvb2xlYW4+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBoYXNMb2dpblN0YXRlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuZ2V0QWNjZXNzVG9rZW4oKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGhhc0xvZ2luU3RhdGVTeW5jKCk6IENyZWRlbnRpYWxzIHwgbnVsbCB7XG4gICAgY29uc3QgY3JlZGVudGlhbHMgPSB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuZ2V0Q3JlZGVudGlhbHNTeW5jKClcbiAgICByZXR1cm4gY3JlZGVudGlhbHNcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRMb2dpblN0YXRlKCk6IFByb21pc2U8Q3JlZGVudGlhbHMgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5nZXRDcmVkZW50aWFsc0FzeW5jKClcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFucyBieSBwcm92aWRlci5cbiAgICogQHBhcmFtIHtUcmFuc0J5UHJvdmlkZXJSZXF1ZXN0fSBwYXJhbXMgQSBUcmFuc0J5UHJvdmlkZXJSZXF1ZXN0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHRyYW5zQnlQcm92aWRlcihcbiAgICBwYXJhbXM6IFRyYW5zQnlQcm92aWRlclJlcXVlc3QsXG4gICk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q3JlZGVudGlhbHM+KFxuICAgICAgQXBpVXJscy5VU0VSX1RSQU5TX0JZX1BST1ZJREVSX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHcmFudCB0b2tlbi5cbiAgICogQHBhcmFtIHtHcmFudFRva2VuUmVxdWVzdH0gcGFyYW1zIEEgR3JhbnRUb2tlblJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ3JhbnRUb2tlbihwYXJhbXM6IEdyYW50VG9rZW5SZXF1ZXN0KTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oQXBpVXJscy5BVVRIX1RPS0VOX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBwcm92aWRlIGxpc3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VXNlclByb2ZpbGVQcm92aWRlcj59IEEgUHJvbWlzZTxVc2VyUHJvZmlsZVByb3ZpZGVyPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0UHJvdmlkZXJzKCk6IFByb21pc2U8VXNlclByb2ZpbGVQcm92aWRlcj4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxVc2VyUHJvZmlsZVByb3ZpZGVyPihBcGlVcmxzLlBST1ZJREVSX0xJU1QsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdW5iaW5kIHByb3ZpZGVyLlxuICAgKiBAcGFyYW0ge1VuYmluZFByb3ZpZGVyUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyB1bmJpbmRQcm92aWRlcihwYXJhbXM6IFVuYmluZFByb3ZpZGVyUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KFxuICAgICAgYCR7QXBpVXJscy5QUk9WSURFUl9VTkJJTkRfVVJMfS8ke3BhcmFtcy5wcm92aWRlcl9pZH1gLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgUGFzc3dvcmQuXG4gICAqIEBwYXJhbSB7Q2hlY2tQYXNzd29yZHJSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNoZWNrUGFzc3dvcmQocGFyYW1zOiBDaGVja1Bhc3N3b3JkclJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8YW55PihgJHtBcGlVcmxzLkNIRUNLX1BXRF9VUkx9YCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgUGFzc3dvcmQuXG4gICAqIEBwYXJhbSB7Q2hlY2tQYXNzd29yZHJSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGJpbmRQaG9uZShwYXJhbXM6IEJpbmRQaG9uZVJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8YW55PihgJHtBcGlVcmxzLkJJTkRfQ09OVEFDVF9VUkx9YCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrIFBhc3N3b3JkLlxuICAgKiBAcGFyYW0ge0NoZWNrUGFzc3dvcmRyUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBiaW5kRW1haWwocGFyYW1zOiBCaW5kRW1haWxSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oYCR7QXBpVXJscy5CSU5EX0NPTlRBQ1RfVVJMfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgUGFzc3dvcmQuXG4gICAqIEBwYXJhbSB7U2V0UGFzc3dvcmRyUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZXRQYXNzd29yZChwYXJhbXM6IFNldFBhc3N3b3JkUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KGAke0FwaVVybHMuQVVUSF9TRVRfUEFTU1dPUkR9YCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gKiB1cGRhdGVQYXNzd29yZEJ5T2xkIOS9v+eUqOaXp+WvhueggeS/ruaUueWvhuegge+8jOWmguaenOW3sue7j+e7keWumuaJi+acuuWPt++8jOivt+WFiO+8mnN1ZG/vvIzlho3kv67mlLnlr4bnoIFcbiAqIEBwYXJhbSB7U2V0UGFzc3dvcmRyUmVxdWVzdH0gcGFyYW1zXG4gKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gKi9cbiAgcHVibGljIGFzeW5jIHVwZGF0ZVBhc3N3b3JkQnlPbGQocGFyYW1zOiBVcGRhdGVQYXNzd29yZFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzdWRvVG9rZW4gPSBhd2FpdCB0aGlzLnN1ZG8oeyBwYXNzd29yZDogcGFyYW1zLm9sZF9wYXNzd29yZCB9KVxuICAgIHJldHVybiB0aGlzLnNldFBhc3N3b3JkKHtcbiAgICAgIHN1ZG9fdG9rZW46IHN1ZG9Ub2tlbi5zdWRvX3Rva2VuLFxuICAgICAgbmV3X3Bhc3N3b3JkOiBwYXJhbXMubmV3X3Bhc3N3b3JkLFxuICAgIH0pXG4gIH1cblxuXG4gIC8qKlxuICAgKiBzdWRvXG4gICAqIEBwYXJhbSB7c3Vkb30gcGFyYW1zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzdWRvKHBhcmFtczogU3Vkb1JlcXVlc3QpOiBQcm9taXNlPFN1ZG9SZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxTdWRvUmVzcG9uc2U+KGAke0FwaVVybHMuU1VET19VUkx9YCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IHVzZXIgdmVyaWZpY2F0aW9uLlxuICAgKiBAcGFyYW0ge0dldFZlcmlmaWNhdGlvblJlcXVlc3R9IHBhcmFtcyBBIEdldFZlcmlmaWNhdGlvblJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPn0gQSBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0Q3VyVXNlclZlcmlmaWNhdGlvbihcbiAgICBwYXJhbXM6IEdldFZlcmlmaWNhdGlvblJlcXVlc3QsXG4gICk6IFByb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IHtcbiAgICBwYXJhbXMudGFyZ2V0ID0gJ0NVUl9VU0VSJztcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+KFxuICAgICAgQXBpVXJscy5WRVJJRklDQVRJT05fVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICAgIHdpdGhDYXB0Y2hhOiB0cnVlXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogY2hhbmdlIGJpbmRlZCBwcm92aWRlci5cbiAgICogQHBhcmFtIHtHZXRWZXJpZmljYXRpb25SZXF1ZXN0fSBwYXJhbXMgQSBHZXRWZXJpZmljYXRpb25SZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT59IEEgUHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNoYW5nZUJpbmRlZFByb3ZpZGVyKFxuICAgIHBhcmFtczogQ2hhbmdlQmluZGVkUHJvdmlkZXJSZXF1ZXN0LFxuICApOiBQcm9taXNlPENoYW5nZUJpbmRlZFByb3ZpZGVyUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q2hhbmdlQmluZGVkUHJvdmlkZXJSZXNwb25zZT4oXG4gICAgICBgJHtBcGlVcmxzLlBST1ZJREVSX0xJU1R9LyR7cGFyYW1zLnByb3ZpZGVyX2lkfS90cmFuc2AsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgcHJvdmlkZXJfdHJhbnNfdG9rZW46IHBhcmFtcy50cmFuc190b2tlbixcbiAgICAgICAgfSxcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhdGNoIHRoZSB1c2VyIHByb2ZpbGUuXG4gICAqIEBwYXJhbSB7VXNlclByb2ZpbGV9IHBhcmFtcyBBIFVzZXJQcm9maWxlIE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxVc2VyUHJvZmlsZT59IEEgUHJvbWlzZTxVc2VyUHJvZmlsZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNldFVzZXJQcm9maWxlKHBhcmFtczogVXNlclByb2ZpbGUpOiBQcm9taXNlPFVzZXJQcm9maWxlPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFVzZXJQcm9maWxlPihBcGlVcmxzLlVTRVJfUFJJRklMRV9VUkwsIHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXRjaCB0aGUgdXNlciBwcm9maWxlLlxuICAgKiBAcGFyYW0ge1F1ZXJ5VXNlclByb2ZpbGVSZXF9IGFwcGVuZGVkX3BhcmFtcyBBIFF1ZXJ5VXNlclByb2ZpbGVSZXEgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcXVlcnlVc2VyUHJvZmlsZShcbiAgICBwYXJhbXM6IFF1ZXJ5VXNlclByb2ZpbGVSZXF1ZXN0LFxuICApOiBQcm9taXNlPFF1ZXJ5VXNlclByb2ZpbGVSZXNwb25zZT4ge1xuICAgIC8vIGxldCB1cmwgPSBuZXcgVVJMKEFwaVVybHMuVVNFUl9RVUVSWV9VUkwpO1xuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1zIGFzIGFueSk7XG4gICAgLy8gdXJsLnNlYXJjaCA9IHNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxRdWVyeVVzZXJQcm9maWxlUmVzcG9uc2U+KGAke0FwaVVybHMuVVNFUl9RVUVSWV9VUkx9PyR7c2VhcmNoUGFyYW1zLnRvU3RyaW5nKCl9YCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRDdXN0b21TaWduRnVuYyBzZXQgdGhlIGdldCB0aWNrZXQgZnVuY3Rpb25cbiAgICogQHBhcmFtIGdldFRpY2tGblxuICAgKi9cbiAgcHVibGljIHNldEN1c3RvbVNpZ25GdW5jKGdldFRpY2tGbjogR2V0Q3VzdG9tU2lnblRpY2tldEZuKSB7XG4gICAgdGhpcy5fZ2V0Q3VzdG9tU2lnblRpY2tldEZuID0gZ2V0VGlja0ZuXG4gIH1cblxuICAvKipcbiAgICogU2lnbkluV2l0aEN1c3RvbVRpY2tldCBjdXN0b20gc2lnbkluXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbldpdGhDdXN0b21UaWNrZXQoKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIGNvbnN0IGN1c3RvbVRpY2tldCA9IGF3YWl0IHRoaXMuX2dldEN1c3RvbVNpZ25UaWNrZXRGbigpXG4gICAgcmV0dXJuIHRoaXMuc2lnbkluV2l0aFByb3ZpZGVyKHtcbiAgICAgIHByb3ZpZGVyX2lkOiAnY3VzdG9tJyxcbiAgICAgIHByb3ZpZGVyX3Rva2VuOiBjdXN0b21UaWNrZXRcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHBhc3N3b3JkXG4gICAqIEBwYXJhbSB7UmVzZXRQYXNzd29yZFJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIHB1YmxpYyBhc3luYyByZXNldFBhc3N3b3JkKHBhcmFtczogUmVzZXRQYXNzd29yZFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3QoQXBpVXJscy5BVVRIX1JFU0VUX1BBU1NXT1JELCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIC8vIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogZGV2aWNlIGF1dGhvcml6YXRpb25cbiAgICogQHBhcmFtIHtEZXZpY2VBdXRob3JpemVSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybnMge1Byb21pc2U8RGV2aWNlQXV0aG9yaXplUmVzcG9uc2U+fVxuICAgKiBAbWVtYmVyb2YgQXV0aFxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRldmljZUF1dGhvcml6ZShwYXJhbXM6IERldmljZUF1dGhvcml6ZVJlcXVlc3QpOiBQcm9taXNlPERldmljZUF1dGhvcml6ZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0KEFwaVVybHMuQVVUSF9HRVRfREVWSUNFX0NPREUsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjaGVja1VzZXJuYW1lKHBhcmFtczogQ2hlY2tVc2VybmFtZVJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3QoQXBpVXJscy5DSEVDS19VU0VSTkFNRSwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2hlY2tJZlVzZXJFeGlzdChwYXJhbXM6IENoZWNrSWZVc2VyRXhpc3RSZXF1ZXN0KTogUHJvbWlzZTxDaGVja0lmVXNlckV4aXN0UmVzcG9uc2U+IHtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtcyBhcyBhbnkpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENoZWNrSWZVc2VyRXhpc3RSZXNwb25zZT4oYCR7QXBpVXJscy5DSEVDS19JRl9VU0VSX0VYSVNUfT8ke3NlYXJjaFBhcmFtcy50b1N0cmluZygpfWAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbG9naW5TY29wZSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuZ2V0U2NvcGUoKVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcGFyc2VQYXJhbXNUb1NlYXJjaChwYXJhbXM6IGFueSk6IHN0cmluZyB7XG4gICAgZm9yIChsZXQga2V5IGluIHBhcmFtcykge1xuICAgICAgaWYgKCFwYXJhbXNba2V5XSkge1xuICAgICAgICBkZWxldGUgcGFyYW1zW2tleV1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbXMgYXMgYW55KTtcbiAgICByZXR1cm4gc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG4gIH1cbn1cbiJdfQ==