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
                return [2, this._config.request(consts_1.ApiUrls.AUTH_SET_PASSWORD, {
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
            return __generator(this, function (_a) {
                return [2, this._config.request(consts_1.ApiUrls.CHECK_IF_USER_EXIST, {
                        method: 'POST',
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
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRoL2FwaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFYixtQ0FBbUM7QUEwQ25DLDZEQUE0RTtBQUU1RSw4Q0FBNkM7QUFjN0M7SUFTRSxjQUFZLElBQWlCO1FBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDM0IsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsSUFBTSxXQUFXLEdBQUc7Z0JBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQztZQUNGLFlBQVksR0FBRyxJQUFJLDJCQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDOUM7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osSUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUQsSUFBTSxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDO2dCQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLE9BQU8sRUFBRSxXQUFXO2dCQUNwQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ3hDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNiLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsT0FB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ZnJvbSAnLi9jb25zdHMnO1xuaW1wb3J0IHtcbiAgR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCxcbiAgR2V0VmVyaWZpY2F0aW9uUmVzcG9uc2UsXG4gIFVzZXJQcm9maWxlLFxuICBVc2VySW5mbyxcbiAgU2lnbkluUmVxdWVzdCxcbiAgU2lnblVwUmVxdWVzdCxcbiAgVmVyaWZ5UmVxdWVzdCxcbiAgVmVyaWZ5UmVzcG9uc2UsXG4gIEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXF1ZXN0LFxuICBHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVzcG9uc2UsXG4gIEdyYW50UHJvdmlkZXJUb2tlblJlcXVlc3QsXG4gIEdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlLFxuICBQYXRjaFByb3ZpZGVyVG9rZW5SZXF1ZXN0LFxuICBQYXRjaFByb3ZpZGVyVG9rZW5SZXNwb25zZSxcbiAgU2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgQmluZFdpdGhQcm92aWRlclJlcXVlc3QsXG4gIFRyYW5zQnlQcm92aWRlclJlcXVlc3QsXG4gIEdyYW50VG9rZW5SZXF1ZXN0LFxuICBVc2VyUHJvZmlsZVByb3ZpZGVyLFxuICBVbmJpbmRQcm92aWRlclJlcXVlc3QsXG4gIENoZWNrUGFzc3dvcmRyUmVxdWVzdCxcbiAgQmluZFBob25lUmVxdWVzdCxcbiAgQmluZEVtYWlsUmVxdWVzdCxcbiAgU2V0UGFzc3dvcmRSZXF1ZXN0LFxuICBDaGFuZ2VCaW5kZWRQcm92aWRlclJlcXVlc3QsXG4gIENoYW5nZUJpbmRlZFByb3ZpZGVyUmVzcG9uc2UsXG4gIFVwZGF0ZVBhc3N3b3JkUmVxdWVzdCxcbiAgU3Vkb1Jlc3BvbnNlLFxuICBTdWRvUmVxdWVzdCxcbiAgR2V0Q3VzdG9tU2lnblRpY2tldEZuLFxuICBRdWVyeVVzZXJQcm9maWxlUmVxdWVzdCxcbiAgUXVlcnlVc2VyUHJvZmlsZVJlc3BvbnNlLFxuICBSZXNldFBhc3N3b3JkUmVxdWVzdCxcbiAgRGV2aWNlQXV0aG9yaXplUmVxdWVzdCxcbiAgRGV2aWNlQXV0aG9yaXplUmVzcG9uc2UsXG4gIENoZWNrVXNlcm5hbWVSZXF1ZXN0LFxuICBDaGVja0lmVXNlckV4aXN0UmVxdWVzdCxcbiAgQ2hlY2tJZlVzZXJFeGlzdFJlc3BvbnNlXG59IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IFNpbXBsZVN0b3JhZ2UsIFJlcXVlc3RGdW5jdGlvbiB9IGZyb20gJy4uL29hdXRoMmNsaWVudC9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgT0F1dGgyQ2xpZW50LCBkZWZhdWx0U3RvcmFnZSB9IGZyb20gJy4uL29hdXRoMmNsaWVudC9vYXV0aDJjbGllbnQnO1xuaW1wb3J0IHsgQ3JlZGVudGlhbHMgfSBmcm9tICcuLi9vYXV0aDJjbGllbnQvbW9kZWxzJztcbmltcG9ydCB7IENhcHRjaGEgfSBmcm9tICcuLi9jYXB0Y2hhL2NhcHRjaGEnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQXV0aE9wdGlvbnMge1xuICBhcGlPcmlnaW46IHN0cmluZztcbiAgY2xpZW50SWQ6IHN0cmluZztcbiAgY3JlZGVudGlhbHNDbGllbnQ/OiBPQXV0aDJDbGllbnQ7XG4gIHJlcXVlc3Q/OiBSZXF1ZXN0RnVuY3Rpb247XG4gIHN0b3JhZ2U/OiBTaW1wbGVTdG9yYWdlO1xufVxuXG4vKipcbiAqIEF1dGhcbiAqL1xuZXhwb3J0IGNsYXNzIEF1dGgge1xuICBwcml2YXRlIF9jb25maWc6IEF1dGhPcHRpb25zO1xuICBwcml2YXRlIF9nZXRDdXN0b21TaWduVGlja2V0Rm4/OiBHZXRDdXN0b21TaWduVGlja2V0Rm47XG5cblxuICAvKipcbiAgICogY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtBdXRoT3B0aW9uc30gb3B0c1xuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0czogQXV0aE9wdGlvbnMpIHtcbiAgICBsZXQgcmVxdWVzdCA9IG9wdHMucmVxdWVzdDtcbiAgICBsZXQgb0F1dGgyQ2xpZW50ID0gb3B0cy5jcmVkZW50aWFsc0NsaWVudDtcbiAgICBpZiAoIW9BdXRoMkNsaWVudCkge1xuICAgICAgY29uc3QgaW5pdE9wdGlvbnMgPSB7XG4gICAgICAgIGFwaU9yaWdpbjogb3B0cy5hcGlPcmlnaW4sXG4gICAgICAgIGNsaWVudElkOiBvcHRzLmNsaWVudElkLFxuICAgICAgICBzdG9yYWdlOiBvcHRzLnN0b3JhZ2UsXG4gICAgICB9O1xuICAgICAgb0F1dGgyQ2xpZW50ID0gbmV3IE9BdXRoMkNsaWVudChpbml0T3B0aW9ucyk7XG4gICAgfVxuICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgY29uc3QgYmFzZVJlcXVlc3QgPSBvQXV0aDJDbGllbnQucmVxdWVzdC5iaW5kKG9BdXRoMkNsaWVudCk7XG4gICAgICBjb25zdCBjYXB0Y2hhID0gbmV3IENhcHRjaGEoe1xuICAgICAgICBjbGllbnRJZDogb3B0cy5jbGllbnRJZCxcbiAgICAgICAgcmVxdWVzdDogYmFzZVJlcXVlc3QsXG4gICAgICAgIHN0b3JhZ2U6IG9wdHMuc3RvcmFnZSxcbiAgICAgIH0pXG4gICAgICByZXF1ZXN0ID0gY2FwdGNoYS5yZXF1ZXN0LmJpbmQoY2FwdGNoYSlcbiAgICB9XG4gICAgdGhpcy5fY29uZmlnID0ge1xuICAgICAgYXBpT3JpZ2luOiBvcHRzLmFwaU9yaWdpbixcbiAgICAgIGNsaWVudElkOiBvcHRzLmNsaWVudElkLFxuICAgICAgcmVxdWVzdDogcmVxdWVzdCxcbiAgICAgIGNyZWRlbnRpYWxzQ2xpZW50OiBvQXV0aDJDbGllbnQsXG4gICAgICBzdG9yYWdlOiBvcHRzLnN0b3JhZ2UgfHwgZGVmYXVsdFN0b3JhZ2UsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaWduIGluLlxuICAgKiBAcGFyYW0ge1NpZ25JblJlcXVlc3R9IHBhcmFtcyBBIFNpZ25JblJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbkluKHBhcmFtczogU2lnbkluUmVxdWVzdCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICBjb25zdCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLkFVVEhfU0lHTl9JTl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXNcbiAgICAgIH0sXG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuc2V0Q3JlZGVudGlhbHMoY3JlZGVudGlhbHMpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3JlZGVudGlhbHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpZ24gaW4gQW5vbnltb3VzbHlcbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbkFub255bW91c2x5KCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICBjb25zdCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLkFVVEhfU0lHTl9JTl9BTk9OWU1PVVNMWV9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiB7fVxuICAgICAgfSxcbiAgICApO1xuICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5zZXRDcmVkZW50aWFscyhjcmVkZW50aWFscyk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjcmVkZW50aWFscyk7XG4gIH1cblxuICAvKipcbiAgICogU2lnbiB1cC5cbiAgICogQHBhcmFtIHtTaWduVXBSZXF1ZXN0fSBwYXJhbXMgQSBTaWduVXBSZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25VcChwYXJhbXM6IFNpZ25VcFJlcXVlc3QpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgY29uc3QgZGF0YTogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLkFVVEhfU0lHTl9VUF9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB9LFxuICAgICk7XG4gICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKGRhdGEpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogU2lnbiBvdXQuXG4gICAqIEByZXR1cm4ge09iamVjdH0gQSBQcm9taXNlPHZvaWQ+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduT3V0KCk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgYWNjZXNzVG9rZW46IHN0cmluZyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5nZXRBY2Nlc3NUb2tlbigpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdChBcGlVcmxzLkFVVEhfUkVWT0tFX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiB7XG4gICAgICAgIHRva2VuOiBhY2Nlc3NUb2tlbixcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKCk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZlcmlmaWNhdGlvbi5cbiAgICogQHBhcmFtIHtHZXRWZXJpZmljYXRpb25SZXF1ZXN0fSBwYXJhbXMgQSBHZXRWZXJpZmljYXRpb25SZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT59IEEgUHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFZlcmlmaWNhdGlvbihcbiAgICBwYXJhbXM6IEdldFZlcmlmaWNhdGlvblJlcXVlc3QsXG4gICk6IFByb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IHtcbiAgICBsZXQgd2l0aENyZWRlbnRpYWxzID0gZmFsc2U7XG4gICAgLy8g5Y+R6YCB55+t5L+h5pe277yM5aaC5p6c5pe257uZ5b2T5YmN55So5oi35Y+R77yM5YiZ6ZyA6KaB5bim5LiK6Ym05p2D5L+h5oGvXG4gICAgaWYgKHBhcmFtcy50YXJnZXQgPT0gJ0NVUl9VU0VSJykge1xuICAgICAgd2l0aENyZWRlbnRpYWxzID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBoYXNMb2dpbiA9IGF3YWl0IHRoaXMuaGFzTG9naW5TdGF0ZSgpXG4gICAgICBpZiAoaGFzTG9naW4pIHtcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+KFxuICAgICAgQXBpVXJscy5WRVJJRklDQVRJT05fVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgICB3aXRoQ2FwdGNoYTogdHJ1ZSxcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB3aXRoQ3JlZGVudGlhbHMsXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogIFZlcmlmeSB0aGUgY29kZVxuICAgKiBAcGFyYW0ge1ZlcmlmeVJlcXVlc3R9IHBhcmFtcyBBIFZlcmlmeVJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFZlcmlmeVJlc3BvbnNlPn0gQSBQcm9taXNlPFZlcmlmeVJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdmVyaWZ5KHBhcmFtczogVmVyaWZ5UmVxdWVzdCk6IFByb21pc2U8VmVyaWZ5UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VmVyaWZ5UmVzcG9uc2U+KEFwaVVybHMuVkVSSUZZX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2VuIHByb3ZpZGVyIHJlZGlyZWN0IHVyaS5cbiAgICogQHBhcmFtIHtHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVxdWVzdH0gcGFyYW1zIEEgR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT59IEEgUHJvbWlzZTxHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZW5Qcm92aWRlclJlZGlyZWN0VXJpKFxuICAgIHBhcmFtczogR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlcXVlc3QsXG4gICk6IFByb21pc2U8R2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlc3BvbnNlPiB7XG4gICAgbGV0IHVybCA9IGAke0FwaVVybHMuUFJPVklERVJfVVJJX1VSTH0/Y2xpZW50X2lkPSR7dGhpcy5fY29uZmlnLmNsaWVudElkXG4gICAgICB9JnByb3ZpZGVyX2lkPSR7cGFyYW1zLnByb3ZpZGVyX2lkfSZyZWRpcmVjdF91cmk9JHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgIHBhcmFtcy5wcm92aWRlcl9yZWRpcmVjdF91cmksXG4gICAgICApfSZzdGF0ZT0ke3BhcmFtcy5zdGF0ZX1gO1xuICAgIGNvbnN0IG90aGVyX3BhcmFtcyA9IHBhcmFtcy5vdGhlcl9wYXJhbXM7XG4gICAgaWYgKG90aGVyX3BhcmFtcykge1xuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2Ygb3RoZXJfcGFyYW1zLnNpZ25fb3V0X3VyaSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgb3RoZXJfcGFyYW1zLnNpZ25fb3V0X3VyaS5sZW5ndGggPiAwXG4gICAgICApIHtcbiAgICAgICAgdXJsICs9IGAmb3RoZXJfcGFyYW1zW3NpZ25fb3V0X3VyaV09JHtvdGhlcl9wYXJhbXMuc2lnbl9vdXRfdXJpfWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVzcG9uc2U+KHVybCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHcmFudCBwcm92aWRlciB0b2tlbi5cbiAgICogQHBhcmFtIHtHcmFudFByb3ZpZGVyVG9rZW5SZXF1ZXN0fSBwYXJhbXMgQSBHcmFudFByb3ZpZGVyVG9rZW5SZXF1ZXN0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxHcmFudFByb3ZpZGVyVG9rZW5SZXNwb25zZT59IEEgUHJvbWlzZTxHcmFudFByb3ZpZGVyVG9rZW5SZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdyYW50UHJvdmlkZXJUb2tlbihcbiAgICBwYXJhbXM6IEdyYW50UHJvdmlkZXJUb2tlblJlcXVlc3QsXG4gICk6IFByb21pc2U8R3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8R3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2U+KFxuICAgICAgQXBpVXJscy5QUk9WSURFUl9UT0tFTl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR3JhbnQgcHJvdmlkZXIgdG9rZW4uXG4gICAqIEBwYXJhbSB7UGF0Y2hQcm92aWRlclRva2VuUmVxdWVzdH0gcGFyYW1zIEEgUGF0Y2hQcm92aWRlclRva2VuUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UGF0Y2hQcm92aWRlclRva2VuUmVzcG9uc2U+fSBBIFByb21pc2U8UGF0Y2hQcm92aWRlclRva2VuUmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBwYXRjaFByb3ZpZGVyVG9rZW4oXG4gICAgcGFyYW1zOiBQYXRjaFByb3ZpZGVyVG9rZW5SZXF1ZXN0LFxuICApOiBQcm9taXNlPFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPihcbiAgICAgIEFwaVVybHMuUFJPVklERVJfVE9LRU5fVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaWduaW4gd2l0aCBwcm92aWRlciByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge1NpZ25JbldpdGhQcm92aWRlclJlcXVlc3R9IHBhcmFtcyBBIFNpZ25JbldpdGhQcm92aWRlclJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aFByb3ZpZGVyKFxuICAgIHBhcmFtczogU2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIGNvbnN0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgIEFwaVVybHMuQVVUSF9TSUdOX0lOX1dJVEhfUFJPVklERVJfVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgfSxcbiAgICApO1xuICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5zZXRDcmVkZW50aWFscyhjcmVkZW50aWFscyk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjcmVkZW50aWFscyk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCB3aXRoIHByb3ZpZGVyXG4gICAqIEBwYXJhbSB7QmluZFdpdGhQcm92aWRlclJlcXVlc3R9IHBhcmFtcyBBIEJpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTx2b2lkPn0gQSBQcm9taXNlPGFueT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGJpbmRXaXRoUHJvdmlkZXIoXG4gICAgcGFyYW1zOiBCaW5kV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oQXBpVXJscy5QUk9WSURFUl9CSU5EX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB1c2VyIHByb2ZpbGUuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VXNlclByb2ZpbGU+fSBBIFByb21pc2U8VXNlclByb2ZpbGU+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRVc2VyUHJvZmlsZSgpOiBQcm9taXNlPFVzZXJQcm9maWxlPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VXNlckluZm8oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHVzZXIgaW5mby5cbiAgICogQHJldHVybiB7UHJvbWlzZTxVc2VySW5mbz59IEEgUHJvbWlzZTxVc2VyUHJvZmlsZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFVzZXJJbmZvKCk6IFByb21pc2U8VXNlckluZm8+IHtcbiAgICBjb25zdCB1c2VySW5mbyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFVzZXJJbmZvPihBcGlVcmxzLlVTRVJfTUVfVVJMLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuICAgIGlmICh1c2VySW5mby5waWN0dXJlKSB7XG4gICAgICB1c2VySW5mby5hdmF0YXJVcmwgPSB1c2VySW5mby5waWN0dXJlO1xuICAgIH1cblxuICAgIGlmICh1c2VySW5mby5zdWIpIHtcbiAgICAgIHVzZXJJbmZvLnVpZCA9IHVzZXJJbmZvLnN1YlxuICAgIH1cblxuICAgIHJldHVybiB1c2VySW5mbztcbiAgfVxuXG4gIC8qKlxuICAgKiBoYXNMb2dpblN0YXRlIGNoZWNrIGlmIGhhcyBsb2dpbiBzdGF0ZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPGJvb2xlYW4+fSBBIFByb21pc2U8Ym9vbGVhbj4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGhhc0xvZ2luU3RhdGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5nZXRBY2Nlc3NUb2tlbigpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaGFzTG9naW5TdGF0ZVN5bmMoKTogQ3JlZGVudGlhbHMgfCBudWxsIHtcbiAgICBjb25zdCBjcmVkZW50aWFscyA9IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5nZXRDcmVkZW50aWFsc1N5bmMoKVxuICAgIHJldHVybiBjcmVkZW50aWFsc1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldExvZ2luU3RhdGUoKTogUHJvbWlzZTxDcmVkZW50aWFscyB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LmdldENyZWRlbnRpYWxzQXN5bmMoKVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zIGJ5IHByb3ZpZGVyLlxuICAgKiBAcGFyYW0ge1RyYW5zQnlQcm92aWRlclJlcXVlc3R9IHBhcmFtcyBBIFRyYW5zQnlQcm92aWRlclJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdHJhbnNCeVByb3ZpZGVyKFxuICAgIHBhcmFtczogVHJhbnNCeVByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLlVTRVJfVFJBTlNfQllfUFJPVklERVJfVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyYW50IHRva2VuLlxuICAgKiBAcGFyYW0ge0dyYW50VG9rZW5SZXF1ZXN0fSBwYXJhbXMgQSBHcmFudFRva2VuUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fSBBIFByb21pc2U8Q3JlZGVudGlhbHM+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBncmFudFRva2VuKHBhcmFtczogR3JhbnRUb2tlblJlcXVlc3QpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihBcGlVcmxzLkFVVEhfVE9LRU5fVVJMLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHByb3ZpZGUgbGlzdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxVc2VyUHJvZmlsZVByb3ZpZGVyPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlUHJvdmlkZXI+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRQcm92aWRlcnMoKTogUHJvbWlzZTxVc2VyUHJvZmlsZVByb3ZpZGVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFVzZXJQcm9maWxlUHJvdmlkZXI+KEFwaVVybHMuUFJPVklERVJfTElTVCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1bmJpbmQgcHJvdmlkZXIuXG4gICAqIEBwYXJhbSB7VW5iaW5kUHJvdmlkZXJSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHVuYmluZFByb3ZpZGVyKHBhcmFtczogVW5iaW5kUHJvdmlkZXJSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oXG4gICAgICBgJHtBcGlVcmxzLlBST1ZJREVSX1VOQklORF9VUkx9LyR7cGFyYW1zLnByb3ZpZGVyX2lkfWAsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayBQYXNzd29yZC5cbiAgICogQHBhcmFtIHtDaGVja1Bhc3N3b3JkclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hlY2tQYXNzd29yZChwYXJhbXM6IENoZWNrUGFzc3dvcmRyUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KGAke0FwaVVybHMuQ0hFQ0tfUFdEX1VSTH1gLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayBQYXNzd29yZC5cbiAgICogQHBhcmFtIHtDaGVja1Bhc3N3b3JkclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgYmluZFBob25lKHBhcmFtczogQmluZFBob25lUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KGAke0FwaVVybHMuQklORF9DT05UQUNUX1VSTH1gLCB7XG4gICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgUGFzc3dvcmQuXG4gICAqIEBwYXJhbSB7Q2hlY2tQYXNzd29yZHJSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGJpbmRFbWFpbChwYXJhbXM6IEJpbmRFbWFpbFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8YW55PihgJHtBcGlVcmxzLkJJTkRfQ09OVEFDVF9VUkx9YCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBQYXNzd29yZC5cbiAgICogQHBhcmFtIHtTZXRQYXNzd29yZHJSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNldFBhc3N3b3JkKHBhcmFtczogU2V0UGFzc3dvcmRSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oYCR7QXBpVXJscy5BVVRIX1NFVF9QQVNTV09SRH1gLCB7XG4gICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAqIHVwZGF0ZVBhc3N3b3JkQnlPbGQg5L2/55So5pen5a+G56CB5L+u5pS55a+G56CB77yM5aaC5p6c5bey57uP57uR5a6a5omL5py65Y+377yM6K+35YWI77yac3Vkb++8jOWGjeS/ruaUueWvhueggVxuICogQHBhcmFtIHtTZXRQYXNzd29yZHJSZXF1ZXN0fSBwYXJhbXNcbiAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAqL1xuICBwdWJsaWMgYXN5bmMgdXBkYXRlUGFzc3dvcmRCeU9sZChwYXJhbXM6IFVwZGF0ZVBhc3N3b3JkUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHN1ZG9Ub2tlbiA9IGF3YWl0IHRoaXMuc3Vkbyh7IHBhc3N3b3JkOiBwYXJhbXMub2xkX3Bhc3N3b3JkIH0pXG4gICAgcmV0dXJuIHRoaXMuc2V0UGFzc3dvcmQoe1xuICAgICAgc3Vkb190b2tlbjogc3Vkb1Rva2VuLnN1ZG9fdG9rZW4sXG4gICAgICBuZXdfcGFzc3dvcmQ6IHBhcmFtcy5uZXdfcGFzc3dvcmQsXG4gICAgfSlcbiAgfVxuXG5cbiAgLyoqXG4gICAqIHN1ZG9cbiAgICogQHBhcmFtIHtzdWRvfSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHN1ZG8ocGFyYW1zOiBTdWRvUmVxdWVzdCk6IFByb21pc2U8U3Vkb1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFN1ZG9SZXNwb25zZT4oYCR7QXBpVXJscy5TVURPX1VSTH1gLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgdXNlciB2ZXJpZmljYXRpb24uXG4gICAqIEBwYXJhbSB7R2V0VmVyaWZpY2F0aW9uUmVxdWVzdH0gcGFyYW1zIEEgR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCBPYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+fSBBIFByb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRDdXJVc2VyVmVyaWZpY2F0aW9uKFxuICAgIHBhcmFtczogR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4ge1xuICAgIHBhcmFtcy50YXJnZXQgPSAnQ1VSX1VTRVInO1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4oXG4gICAgICBBcGlVcmxzLlZFUklGSUNBVElPTl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgICAgd2l0aENhcHRjaGE6IHRydWVcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGFuZ2UgYmluZGVkIHByb3ZpZGVyLlxuICAgKiBAcGFyYW0ge0dldFZlcmlmaWNhdGlvblJlcXVlc3R9IHBhcmFtcyBBIEdldFZlcmlmaWNhdGlvblJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPn0gQSBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hhbmdlQmluZGVkUHJvdmlkZXIoXG4gICAgcGFyYW1zOiBDaGFuZ2VCaW5kZWRQcm92aWRlclJlcXVlc3QsXG4gICk6IFByb21pc2U8Q2hhbmdlQmluZGVkUHJvdmlkZXJSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxDaGFuZ2VCaW5kZWRQcm92aWRlclJlc3BvbnNlPihcbiAgICAgIGAke0FwaVVybHMuUFJPVklERVJfTElTVH0vJHtwYXJhbXMucHJvdmlkZXJfaWR9L3RyYW5zYCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBwcm92aWRlcl90cmFuc190b2tlbjogcGFyYW1zLnRyYW5zX3Rva2VuLFxuICAgICAgICB9LFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUGF0Y2ggdGhlIHVzZXIgcHJvZmlsZS5cbiAgICogQHBhcmFtIHtVc2VyUHJvZmlsZX0gcGFyYW1zIEEgVXNlclByb2ZpbGUgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2V0VXNlclByb2ZpbGUocGFyYW1zOiBVc2VyUHJvZmlsZSk6IFByb21pc2U8VXNlclByb2ZpbGU+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VXNlclByb2ZpbGU+KEFwaVVybHMuVVNFUl9QUklGSUxFX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhdGNoIHRoZSB1c2VyIHByb2ZpbGUuXG4gICAqIEBwYXJhbSB7UXVlcnlVc2VyUHJvZmlsZVJlcX0gYXBwZW5kZWRfcGFyYW1zIEEgUXVlcnlVc2VyUHJvZmlsZVJlcSBPYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VXNlclByb2ZpbGU+fSBBIFByb21pc2U8VXNlclByb2ZpbGU+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBxdWVyeVVzZXJQcm9maWxlKFxuICAgIHBhcmFtczogUXVlcnlVc2VyUHJvZmlsZVJlcXVlc3QsXG4gICk6IFByb21pc2U8UXVlcnlVc2VyUHJvZmlsZVJlc3BvbnNlPiB7XG4gICAgLy8gbGV0IHVybCA9IG5ldyBVUkwoQXBpVXJscy5VU0VSX1FVRVJZX1VSTCk7XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbXMgYXMgYW55KTtcbiAgICAvLyB1cmwuc2VhcmNoID0gc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFF1ZXJ5VXNlclByb2ZpbGVSZXNwb25zZT4oYCR7QXBpVXJscy5VU0VSX1FVRVJZX1VSTH0/JHtzZWFyY2hQYXJhbXMudG9TdHJpbmcoKX1gLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldEN1c3RvbVNpZ25GdW5jIHNldCB0aGUgZ2V0IHRpY2tldCBmdW5jdGlvblxuICAgKiBAcGFyYW0gZ2V0VGlja0ZuXG4gICAqL1xuICBwdWJsaWMgc2V0Q3VzdG9tU2lnbkZ1bmMoZ2V0VGlja0ZuOiBHZXRDdXN0b21TaWduVGlja2V0Rm4pIHtcbiAgICB0aGlzLl9nZXRDdXN0b21TaWduVGlja2V0Rm4gPSBnZXRUaWNrRm5cbiAgfVxuXG4gIC8qKlxuICAgKiBTaWduSW5XaXRoQ3VzdG9tVGlja2V0IGN1c3RvbSBzaWduSW5cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aEN1c3RvbVRpY2tldCgpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgY29uc3QgY3VzdG9tVGlja2V0ID0gYXdhaXQgdGhpcy5fZ2V0Q3VzdG9tU2lnblRpY2tldEZuKClcbiAgICByZXR1cm4gdGhpcy5zaWduSW5XaXRoUHJvdmlkZXIoe1xuICAgICAgcHJvdmlkZXJfaWQ6ICdjdXN0b20nLFxuICAgICAgcHJvdmlkZXJfdG9rZW46IGN1c3RvbVRpY2tldFxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgcGFzc3dvcmRcbiAgICogQHBhcmFtIHtSZXNldFBhc3N3b3JkUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKiBAbWVtYmVyb2YgQXV0aFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHJlc2V0UGFzc3dvcmQocGFyYW1zOiBSZXNldFBhc3N3b3JkUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdChBcGlVcmxzLkFVVEhfU0VUX1BBU1NXT1JELCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIC8vIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogZGV2aWNlIGF1dGhvcml6YXRpb25cbiAgICogQHBhcmFtIHtEZXZpY2VBdXRob3JpemVSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybnMge1Byb21pc2U8RGV2aWNlQXV0aG9yaXplUmVzcG9uc2U+fVxuICAgKiBAbWVtYmVyb2YgQXV0aFxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRldmljZUF1dGhvcml6ZShwYXJhbXM6IERldmljZUF1dGhvcml6ZVJlcXVlc3QpOiBQcm9taXNlPERldmljZUF1dGhvcml6ZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0KEFwaVVybHMuQVVUSF9HRVRfREVWSUNFX0NPREUsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjaGVja1VzZXJuYW1lKHBhcmFtczogQ2hlY2tVc2VybmFtZVJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3QoQXBpVXJscy5DSEVDS19VU0VSTkFNRSwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2hlY2tJZlVzZXJFeGlzdChwYXJhbXM6IENoZWNrSWZVc2VyRXhpc3RSZXF1ZXN0KTogUHJvbWlzZTxDaGVja0lmVXNlckV4aXN0UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q2hlY2tJZlVzZXJFeGlzdFJlc3BvbnNlPihBcGlVcmxzLkNIRUNLX0lGX1VTRVJfRVhJU1QsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGxvZ2luU2NvcGUoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LmdldFNjb3BlKClcbiAgfVxufVxuIl19