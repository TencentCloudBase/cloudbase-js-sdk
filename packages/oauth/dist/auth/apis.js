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
            return __generator(this, function (_a) {
                return [2, this._config.request(consts_1.ApiUrls.VERIFICATION_URL, {
                        method: 'POST',
                        body: params,
                        withCaptcha: true
                    })];
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
            var url, searchParams;
            return __generator(this, function (_a) {
                url = new URL(consts_1.ApiUrls.USER_QUERY_URL);
                searchParams = new URLSearchParams(params);
                url.search = searchParams.toString();
                return [2, this._config.request(url.toString(), {
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
                        withCredentials: true
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
                return [2, this._config.request(consts_1.ApiUrls.AUTH_GET_DEVICE_CODE, {
                        method: 'GET',
                        body: params,
                        withCredentials: true
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRoL2FwaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFYixtQ0FBbUM7QUF3Q25DLDZEQUE0RTtBQUU1RSw4Q0FBNkM7QUFjN0M7SUFTRSxjQUFZLElBQWlCO1FBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDM0IsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsSUFBTSxXQUFXLEdBQUc7Z0JBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQztZQUNGLFlBQVksR0FBRyxJQUFJLDJCQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDOUM7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osSUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUQsSUFBTSxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDO2dCQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLE9BQU8sRUFBRSxXQUFXO2dCQUNwQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ3hDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNiLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsT0FB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QUNaLGVBQWUsRUFBRSxJQUFJO3FCQUN0QixDQUFDLEVBQUE7OztLQUNIO0lBUVksOEJBQWUsR0FBNUIsVUFBNkIsTUFBOEI7OztnQkFDekQsV0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBTyxDQUFDLG9CQUFvQixFQUFFO3dCQUN4RCxNQUFNLEVBQUUsTUFBTTt3QkFDZCxJQUFJLEVBQUUsTUFBTTt3QkFDWixlQUFlLEVBQUUsSUFBSTtxQkFDdEIsQ0FBQyxFQUFBOzs7S0FDSDtJQUVZLDRCQUFhLEdBQTFCLFVBQTJCLE1BQTRCOzs7Z0JBQ3JELFdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZ0JBQU8sQ0FBQyxvQkFBb0IsRUFBRTt3QkFDeEQsTUFBTSxFQUFFLEtBQUs7d0JBQ2IsSUFBSSxFQUFFLE1BQU07d0JBQ1osZUFBZSxFQUFFLElBQUk7cUJBQ3RCLENBQUMsRUFBQTs7O0tBQ0g7SUFFWSx5QkFBVSxHQUF2Qjs7O2dCQUNFLFdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsRUFBQTs7O0tBQ2pEO0lBQ0gsV0FBQztBQUFELENBQUMsQUE5aEJELElBOGhCQztBQTloQlksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IEFwaVVybHMgfSBmcm9tICcuL2NvbnN0cyc7XG5pbXBvcnQge1xuICBHZXRWZXJpZmljYXRpb25SZXF1ZXN0LFxuICBHZXRWZXJpZmljYXRpb25SZXNwb25zZSxcbiAgVXNlclByb2ZpbGUsXG4gIFVzZXJJbmZvLFxuICBTaWduSW5SZXF1ZXN0LFxuICBTaWduVXBSZXF1ZXN0LFxuICBWZXJpZnlSZXF1ZXN0LFxuICBWZXJpZnlSZXNwb25zZSxcbiAgR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlcXVlc3QsXG4gIEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZSxcbiAgR3JhbnRQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgR3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2UsXG4gIFBhdGNoUHJvdmlkZXJUb2tlblJlcXVlc3QsXG4gIFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlLFxuICBTaWduSW5XaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICBCaW5kV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgVHJhbnNCeVByb3ZpZGVyUmVxdWVzdCxcbiAgR3JhbnRUb2tlblJlcXVlc3QsXG4gIFVzZXJQcm9maWxlUHJvdmlkZXIsXG4gIFVuYmluZFByb3ZpZGVyUmVxdWVzdCxcbiAgQ2hlY2tQYXNzd29yZHJSZXF1ZXN0LFxuICBCaW5kUGhvbmVSZXF1ZXN0LFxuICBCaW5kRW1haWxSZXF1ZXN0LFxuICBTZXRQYXNzd29yZFJlcXVlc3QsXG4gIENoYW5nZUJpbmRlZFByb3ZpZGVyUmVxdWVzdCxcbiAgQ2hhbmdlQmluZGVkUHJvdmlkZXJSZXNwb25zZSxcbiAgVXBkYXRlUGFzc3dvcmRSZXF1ZXN0LFxuICBTdWRvUmVzcG9uc2UsXG4gIFN1ZG9SZXF1ZXN0LFxuICBHZXRDdXN0b21TaWduVGlja2V0Rm4sXG4gIFF1ZXJ5VXNlclByb2ZpbGVSZXF1ZXN0LFxuICBRdWVyeVVzZXJQcm9maWxlUmVzcG9uc2UsXG4gIFJlc2V0UGFzc3dvcmRSZXF1ZXN0LFxuICBEZXZpY2VBdXRob3JpemVSZXF1ZXN0LFxuICBEZXZpY2VBdXRob3JpemVSZXNwb25zZSxcbiAgQ2hlY2tVc2VybmFtZVJlcXVlc3Rcbn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgU2ltcGxlU3RvcmFnZSwgUmVxdWVzdEZ1bmN0aW9uIH0gZnJvbSAnLi4vb2F1dGgyY2xpZW50L2ludGVyZmFjZSc7XG5pbXBvcnQgeyBPQXV0aDJDbGllbnQsIGRlZmF1bHRTdG9yYWdlIH0gZnJvbSAnLi4vb2F1dGgyY2xpZW50L29hdXRoMmNsaWVudCc7XG5pbXBvcnQgeyBDcmVkZW50aWFscyB9IGZyb20gJy4uL29hdXRoMmNsaWVudC9tb2RlbHMnO1xuaW1wb3J0IHsgQ2FwdGNoYSB9IGZyb20gJy4uL2NhcHRjaGEvY2FwdGNoYSc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBBdXRoT3B0aW9ucyB7XG4gIGFwaU9yaWdpbjogc3RyaW5nO1xuICBjbGllbnRJZDogc3RyaW5nO1xuICBjcmVkZW50aWFsc0NsaWVudD86IE9BdXRoMkNsaWVudDtcbiAgcmVxdWVzdD86IFJlcXVlc3RGdW5jdGlvbjtcbiAgc3RvcmFnZT86IFNpbXBsZVN0b3JhZ2U7XG59XG5cbi8qKlxuICogQXV0aFxuICovXG5leHBvcnQgY2xhc3MgQXV0aCB7XG4gIHByaXZhdGUgX2NvbmZpZzogQXV0aE9wdGlvbnM7XG4gIHByaXZhdGUgX2dldEN1c3RvbVNpZ25UaWNrZXRGbj86IEdldEN1c3RvbVNpZ25UaWNrZXRGbjtcblxuXG4gIC8qKlxuICAgKiBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0F1dGhPcHRpb25zfSBvcHRzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRzOiBBdXRoT3B0aW9ucykge1xuICAgIGxldCByZXF1ZXN0ID0gb3B0cy5yZXF1ZXN0O1xuICAgIGxldCBvQXV0aDJDbGllbnQgPSBvcHRzLmNyZWRlbnRpYWxzQ2xpZW50O1xuICAgIGlmICghb0F1dGgyQ2xpZW50KSB7XG4gICAgICBjb25zdCBpbml0T3B0aW9ucyA9IHtcbiAgICAgICAgYXBpT3JpZ2luOiBvcHRzLmFwaU9yaWdpbixcbiAgICAgICAgY2xpZW50SWQ6IG9wdHMuY2xpZW50SWQsXG4gICAgICAgIHN0b3JhZ2U6IG9wdHMuc3RvcmFnZSxcbiAgICAgIH07XG4gICAgICBvQXV0aDJDbGllbnQgPSBuZXcgT0F1dGgyQ2xpZW50KGluaXRPcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICBjb25zdCBiYXNlUmVxdWVzdCA9IG9BdXRoMkNsaWVudC5yZXF1ZXN0LmJpbmQob0F1dGgyQ2xpZW50KTtcbiAgICAgIGNvbnN0IGNhcHRjaGEgPSBuZXcgQ2FwdGNoYSh7XG4gICAgICAgIGNsaWVudElkOiBvcHRzLmNsaWVudElkLFxuICAgICAgICByZXF1ZXN0OiBiYXNlUmVxdWVzdCxcbiAgICAgICAgc3RvcmFnZTogb3B0cy5zdG9yYWdlLFxuICAgICAgfSlcbiAgICAgIHJlcXVlc3QgPSBjYXB0Y2hhLnJlcXVlc3QuYmluZChjYXB0Y2hhKVxuICAgIH1cbiAgICB0aGlzLl9jb25maWcgPSB7XG4gICAgICBhcGlPcmlnaW46IG9wdHMuYXBpT3JpZ2luLFxuICAgICAgY2xpZW50SWQ6IG9wdHMuY2xpZW50SWQsXG4gICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgY3JlZGVudGlhbHNDbGllbnQ6IG9BdXRoMkNsaWVudCxcbiAgICAgIHN0b3JhZ2U6IG9wdHMuc3RvcmFnZSB8fCBkZWZhdWx0U3RvcmFnZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNpZ24gaW4uXG4gICAqIEBwYXJhbSB7U2lnbkluUmVxdWVzdH0gcGFyYW1zIEEgU2lnbkluUmVxdWVzdCBPYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fSBBIFByb21pc2U8Q3JlZGVudGlhbHM+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduSW4ocGFyYW1zOiBTaWduSW5SZXF1ZXN0KTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIGNvbnN0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgIEFwaVVybHMuQVVUSF9TSUdOX0lOX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHBhcmFtc1xuICAgICAgfSxcbiAgICApO1xuICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5zZXRDcmVkZW50aWFscyhjcmVkZW50aWFscyk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjcmVkZW50aWFscyk7XG4gIH1cblxuICAvKipcbiAgICogU2lnbiBpbiBBbm9ueW1vdXNseVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbkluQW5vbnltb3VzbHkoKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIGNvbnN0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgIEFwaVVybHMuQVVUSF9TSUdOX0lOX0FOT05ZTU9VU0xZX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHt9XG4gICAgICB9LFxuICAgICk7XG4gICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKGNyZWRlbnRpYWxzKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNyZWRlbnRpYWxzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaWduIHVwLlxuICAgKiBAcGFyYW0ge1NpZ25VcFJlcXVlc3R9IHBhcmFtcyBBIFNpZ25VcFJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnblVwKHBhcmFtczogU2lnblVwUmVxdWVzdCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICBjb25zdCBkYXRhOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgIEFwaVVybHMuQVVUSF9TSUdOX1VQX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIH0sXG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuc2V0Q3JlZGVudGlhbHMoZGF0YSk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaWduIG91dC5cbiAgICogQHJldHVybiB7T2JqZWN0fSBBIFByb21pc2U8dm9pZD4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25PdXQoKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbjogc3RyaW5nID0gYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LmdldEFjY2Vzc1Rva2VuKCk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0KEFwaVVybHMuQVVUSF9SRVZPS0VfVVJMLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgdG9rZW46IGFjY2Vzc1Rva2VuLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuc2V0Q3JlZGVudGlhbHMoKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdmVyaWZpY2F0aW9uLlxuICAgKiBAcGFyYW0ge0dldFZlcmlmaWNhdGlvblJlcXVlc3R9IHBhcmFtcyBBIEdldFZlcmlmaWNhdGlvblJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPn0gQSBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0VmVyaWZpY2F0aW9uKFxuICAgIHBhcmFtczogR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4oXG4gICAgICBBcGlVcmxzLlZFUklGSUNBVElPTl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICAgIHdpdGhDYXB0Y2hhOiB0cnVlXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogIFZlcmlmeSB0aGUgY29kZVxuICAgKiBAcGFyYW0ge1ZlcmlmeVJlcXVlc3R9IHBhcmFtcyBBIFZlcmlmeVJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFZlcmlmeVJlc3BvbnNlPn0gQSBQcm9taXNlPFZlcmlmeVJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdmVyaWZ5KHBhcmFtczogVmVyaWZ5UmVxdWVzdCk6IFByb21pc2U8VmVyaWZ5UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VmVyaWZ5UmVzcG9uc2U+KEFwaVVybHMuVkVSSUZZX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2VuIHByb3ZpZGVyIHJlZGlyZWN0IHVyaS5cbiAgICogQHBhcmFtIHtHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVxdWVzdH0gcGFyYW1zIEEgR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT59IEEgUHJvbWlzZTxHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZW5Qcm92aWRlclJlZGlyZWN0VXJpKFxuICAgIHBhcmFtczogR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlcXVlc3QsXG4gICk6IFByb21pc2U8R2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlc3BvbnNlPiB7XG4gICAgbGV0IHVybCA9IGAke0FwaVVybHMuUFJPVklERVJfVVJJX1VSTH0/Y2xpZW50X2lkPSR7dGhpcy5fY29uZmlnLmNsaWVudElkXG4gICAgICB9JnByb3ZpZGVyX2lkPSR7cGFyYW1zLnByb3ZpZGVyX2lkfSZyZWRpcmVjdF91cmk9JHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgIHBhcmFtcy5wcm92aWRlcl9yZWRpcmVjdF91cmksXG4gICAgICApfSZzdGF0ZT0ke3BhcmFtcy5zdGF0ZX1gO1xuICAgIGNvbnN0IG90aGVyX3BhcmFtcyA9IHBhcmFtcy5vdGhlcl9wYXJhbXM7XG4gICAgaWYgKG90aGVyX3BhcmFtcykge1xuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2Ygb3RoZXJfcGFyYW1zLnNpZ25fb3V0X3VyaSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgb3RoZXJfcGFyYW1zLnNpZ25fb3V0X3VyaS5sZW5ndGggPiAwXG4gICAgICApIHtcbiAgICAgICAgdXJsICs9IGAmb3RoZXJfcGFyYW1zW3NpZ25fb3V0X3VyaV09JHtvdGhlcl9wYXJhbXMuc2lnbl9vdXRfdXJpfWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVzcG9uc2U+KHVybCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHcmFudCBwcm92aWRlciB0b2tlbi5cbiAgICogQHBhcmFtIHtHcmFudFByb3ZpZGVyVG9rZW5SZXF1ZXN0fSBwYXJhbXMgQSBHcmFudFByb3ZpZGVyVG9rZW5SZXF1ZXN0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxHcmFudFByb3ZpZGVyVG9rZW5SZXNwb25zZT59IEEgUHJvbWlzZTxHcmFudFByb3ZpZGVyVG9rZW5SZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdyYW50UHJvdmlkZXJUb2tlbihcbiAgICBwYXJhbXM6IEdyYW50UHJvdmlkZXJUb2tlblJlcXVlc3QsXG4gICk6IFByb21pc2U8R3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8R3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2U+KFxuICAgICAgQXBpVXJscy5QUk9WSURFUl9UT0tFTl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR3JhbnQgcHJvdmlkZXIgdG9rZW4uXG4gICAqIEBwYXJhbSB7UGF0Y2hQcm92aWRlclRva2VuUmVxdWVzdH0gcGFyYW1zIEEgUGF0Y2hQcm92aWRlclRva2VuUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UGF0Y2hQcm92aWRlclRva2VuUmVzcG9uc2U+fSBBIFByb21pc2U8UGF0Y2hQcm92aWRlclRva2VuUmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBwYXRjaFByb3ZpZGVyVG9rZW4oXG4gICAgcGFyYW1zOiBQYXRjaFByb3ZpZGVyVG9rZW5SZXF1ZXN0LFxuICApOiBQcm9taXNlPFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPihcbiAgICAgIEFwaVVybHMuUFJPVklERVJfVE9LRU5fVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaWduaW4gd2l0aCBwcm92aWRlciByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge1NpZ25JbldpdGhQcm92aWRlclJlcXVlc3R9IHBhcmFtcyBBIFNpZ25JbldpdGhQcm92aWRlclJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aFByb3ZpZGVyKFxuICAgIHBhcmFtczogU2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIGNvbnN0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgIEFwaVVybHMuQVVUSF9TSUdOX0lOX1dJVEhfUFJPVklERVJfVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgfSxcbiAgICApO1xuICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5zZXRDcmVkZW50aWFscyhjcmVkZW50aWFscyk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjcmVkZW50aWFscyk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCB3aXRoIHByb3ZpZGVyXG4gICAqIEBwYXJhbSB7QmluZFdpdGhQcm92aWRlclJlcXVlc3R9IHBhcmFtcyBBIEJpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTx2b2lkPn0gQSBQcm9taXNlPGFueT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGJpbmRXaXRoUHJvdmlkZXIoXG4gICAgcGFyYW1zOiBCaW5kV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oQXBpVXJscy5QUk9WSURFUl9CSU5EX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB1c2VyIHByb2ZpbGUuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VXNlclByb2ZpbGU+fSBBIFByb21pc2U8VXNlclByb2ZpbGU+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRVc2VyUHJvZmlsZSgpOiBQcm9taXNlPFVzZXJQcm9maWxlPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VXNlckluZm8oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHVzZXIgaW5mby5cbiAgICogQHJldHVybiB7UHJvbWlzZTxVc2VySW5mbz59IEEgUHJvbWlzZTxVc2VyUHJvZmlsZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFVzZXJJbmZvKCk6IFByb21pc2U8VXNlckluZm8+IHtcbiAgICBjb25zdCB1c2VySW5mbyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFVzZXJJbmZvPihBcGlVcmxzLlVTRVJfTUVfVVJMLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuICAgIGlmICh1c2VySW5mby5waWN0dXJlKSB7XG4gICAgICB1c2VySW5mby5hdmF0YXJVcmwgPSB1c2VySW5mby5waWN0dXJlO1xuICAgIH1cblxuICAgIGlmICh1c2VySW5mby5zdWIpIHtcbiAgICAgIHVzZXJJbmZvLnVpZCA9IHVzZXJJbmZvLnN1YlxuICAgIH1cblxuICAgIHJldHVybiB1c2VySW5mbztcbiAgfVxuXG4gIC8qKlxuICAgKiBoYXNMb2dpblN0YXRlIGNoZWNrIGlmIGhhcyBsb2dpbiBzdGF0ZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPGJvb2xlYW4+fSBBIFByb21pc2U8Ym9vbGVhbj4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGhhc0xvZ2luU3RhdGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5nZXRBY2Nlc3NUb2tlbigpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaGFzTG9naW5TdGF0ZVN5bmMoKTogQ3JlZGVudGlhbHMgfCBudWxsIHtcbiAgICBjb25zdCBjcmVkZW50aWFscyA9IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5nZXRDcmVkZW50aWFsc1N5bmMoKVxuICAgIHJldHVybiBjcmVkZW50aWFsc1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldExvZ2luU3RhdGUoKTogUHJvbWlzZTxDcmVkZW50aWFscyB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LmdldENyZWRlbnRpYWxzQXN5bmMoKVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zIGJ5IHByb3ZpZGVyLlxuICAgKiBAcGFyYW0ge1RyYW5zQnlQcm92aWRlclJlcXVlc3R9IHBhcmFtcyBBIFRyYW5zQnlQcm92aWRlclJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdHJhbnNCeVByb3ZpZGVyKFxuICAgIHBhcmFtczogVHJhbnNCeVByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLlVTRVJfVFJBTlNfQllfUFJPVklERVJfVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyYW50IHRva2VuLlxuICAgKiBAcGFyYW0ge0dyYW50VG9rZW5SZXF1ZXN0fSBwYXJhbXMgQSBHcmFudFRva2VuUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fSBBIFByb21pc2U8Q3JlZGVudGlhbHM+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBncmFudFRva2VuKHBhcmFtczogR3JhbnRUb2tlblJlcXVlc3QpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihBcGlVcmxzLkFVVEhfVE9LRU5fVVJMLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHByb3ZpZGUgbGlzdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxVc2VyUHJvZmlsZVByb3ZpZGVyPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlUHJvdmlkZXI+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRQcm92aWRlcnMoKTogUHJvbWlzZTxVc2VyUHJvZmlsZVByb3ZpZGVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFVzZXJQcm9maWxlUHJvdmlkZXI+KEFwaVVybHMuUFJPVklERVJfTElTVCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1bmJpbmQgcHJvdmlkZXIuXG4gICAqIEBwYXJhbSB7VW5iaW5kUHJvdmlkZXJSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHVuYmluZFByb3ZpZGVyKHBhcmFtczogVW5iaW5kUHJvdmlkZXJSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oXG4gICAgICBgJHtBcGlVcmxzLlBST1ZJREVSX1VOQklORF9VUkx9LyR7cGFyYW1zLnByb3ZpZGVyX2lkfWAsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayBQYXNzd29yZC5cbiAgICogQHBhcmFtIHtDaGVja1Bhc3N3b3JkclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hlY2tQYXNzd29yZChwYXJhbXM6IENoZWNrUGFzc3dvcmRyUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KGAke0FwaVVybHMuQ0hFQ0tfUFdEX1VSTH1gLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayBQYXNzd29yZC5cbiAgICogQHBhcmFtIHtDaGVja1Bhc3N3b3JkclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgYmluZFBob25lKHBhcmFtczogQmluZFBob25lUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KGAke0FwaVVybHMuQklORF9DT05UQUNUX1VSTH1gLCB7XG4gICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgUGFzc3dvcmQuXG4gICAqIEBwYXJhbSB7Q2hlY2tQYXNzd29yZHJSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGJpbmRFbWFpbChwYXJhbXM6IEJpbmRFbWFpbFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8YW55PihgJHtBcGlVcmxzLkJJTkRfQ09OVEFDVF9VUkx9YCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBQYXNzd29yZC5cbiAgICogQHBhcmFtIHtTZXRQYXNzd29yZHJSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNldFBhc3N3b3JkKHBhcmFtczogU2V0UGFzc3dvcmRSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oYCR7QXBpVXJscy5BVVRIX1NFVF9QQVNTV09SRH1gLCB7XG4gICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAqIHVwZGF0ZVBhc3N3b3JkQnlPbGQg5L2/55So5pen5a+G56CB5L+u5pS55a+G56CB77yM5aaC5p6c5bey57uP57uR5a6a5omL5py65Y+377yM6K+35YWI77yac3Vkb++8jOWGjeS/ruaUueWvhueggVxuICogQHBhcmFtIHtTZXRQYXNzd29yZHJSZXF1ZXN0fSBwYXJhbXNcbiAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAqL1xuICBwdWJsaWMgYXN5bmMgdXBkYXRlUGFzc3dvcmRCeU9sZChwYXJhbXM6IFVwZGF0ZVBhc3N3b3JkUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHN1ZG9Ub2tlbiA9IGF3YWl0IHRoaXMuc3Vkbyh7IHBhc3N3b3JkOiBwYXJhbXMub2xkX3Bhc3N3b3JkIH0pXG4gICAgcmV0dXJuIHRoaXMuc2V0UGFzc3dvcmQoe1xuICAgICAgc3Vkb190b2tlbjogc3Vkb1Rva2VuLnN1ZG9fdG9rZW4sXG4gICAgICBuZXdfcGFzc3dvcmQ6IHBhcmFtcy5uZXdfcGFzc3dvcmQsXG4gICAgfSlcbiAgfVxuXG5cbiAgLyoqXG4gICAqIHN1ZG9cbiAgICogQHBhcmFtIHtzdWRvfSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHN1ZG8ocGFyYW1zOiBTdWRvUmVxdWVzdCk6IFByb21pc2U8U3Vkb1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFN1ZG9SZXNwb25zZT4oYCR7QXBpVXJscy5TVURPX1VSTH1gLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgdXNlciB2ZXJpZmljYXRpb24uXG4gICAqIEBwYXJhbSB7R2V0VmVyaWZpY2F0aW9uUmVxdWVzdH0gcGFyYW1zIEEgR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCBPYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+fSBBIFByb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRDdXJVc2VyVmVyaWZpY2F0aW9uKFxuICAgIHBhcmFtczogR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4ge1xuICAgIHBhcmFtcy50YXJnZXQgPSAnQ1VSX1VTRVInO1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4oXG4gICAgICBBcGlVcmxzLlZFUklGSUNBVElPTl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgICAgd2l0aENhcHRjaGE6IHRydWVcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGFuZ2UgYmluZGVkIHByb3ZpZGVyLlxuICAgKiBAcGFyYW0ge0dldFZlcmlmaWNhdGlvblJlcXVlc3R9IHBhcmFtcyBBIEdldFZlcmlmaWNhdGlvblJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPn0gQSBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hhbmdlQmluZGVkUHJvdmlkZXIoXG4gICAgcGFyYW1zOiBDaGFuZ2VCaW5kZWRQcm92aWRlclJlcXVlc3QsXG4gICk6IFByb21pc2U8Q2hhbmdlQmluZGVkUHJvdmlkZXJSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxDaGFuZ2VCaW5kZWRQcm92aWRlclJlc3BvbnNlPihcbiAgICAgIGAke0FwaVVybHMuUFJPVklERVJfTElTVH0vJHtwYXJhbXMucHJvdmlkZXJfaWR9L3RyYW5zYCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBwcm92aWRlcl90cmFuc190b2tlbjogcGFyYW1zLnRyYW5zX3Rva2VuLFxuICAgICAgICB9LFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUGF0Y2ggdGhlIHVzZXIgcHJvZmlsZS5cbiAgICogQHBhcmFtIHtVc2VyUHJvZmlsZX0gcGFyYW1zIEEgVXNlclByb2ZpbGUgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2V0VXNlclByb2ZpbGUocGFyYW1zOiBVc2VyUHJvZmlsZSk6IFByb21pc2U8VXNlclByb2ZpbGU+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VXNlclByb2ZpbGU+KEFwaVVybHMuVVNFUl9QUklGSUxFX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhdGNoIHRoZSB1c2VyIHByb2ZpbGUuXG4gICAqIEBwYXJhbSB7UXVlcnlVc2VyUHJvZmlsZVJlcX0gYXBwZW5kZWRfcGFyYW1zIEEgUXVlcnlVc2VyUHJvZmlsZVJlcSBPYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VXNlclByb2ZpbGU+fSBBIFByb21pc2U8VXNlclByb2ZpbGU+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBxdWVyeVVzZXJQcm9maWxlKFxuICAgIHBhcmFtczogUXVlcnlVc2VyUHJvZmlsZVJlcXVlc3QsXG4gICk6IFByb21pc2U8UXVlcnlVc2VyUHJvZmlsZVJlc3BvbnNlPiB7XG4gICAgbGV0IHVybCA9IG5ldyBVUkwoQXBpVXJscy5VU0VSX1FVRVJZX1VSTCk7XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbXMgYXMgYW55KTtcbiAgICB1cmwuc2VhcmNoID0gc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFF1ZXJ5VXNlclByb2ZpbGVSZXNwb25zZT4odXJsLnRvU3RyaW5nKCksIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogc2V0Q3VzdG9tU2lnbkZ1bmMgc2V0IHRoZSBnZXQgdGlja2V0IGZ1bmN0aW9uXG4gICAqIEBwYXJhbSBnZXRUaWNrRm5cbiAgICovXG4gIHB1YmxpYyBzZXRDdXN0b21TaWduRnVuYyhnZXRUaWNrRm46IEdldEN1c3RvbVNpZ25UaWNrZXRGbikge1xuICAgIHRoaXMuX2dldEN1c3RvbVNpZ25UaWNrZXRGbiA9IGdldFRpY2tGblxuICB9XG5cbiAgLyoqXG4gICAqIFNpZ25JbldpdGhDdXN0b21UaWNrZXQgY3VzdG9tIHNpZ25JblxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduSW5XaXRoQ3VzdG9tVGlja2V0KCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICBjb25zdCBjdXN0b21UaWNrZXQgPSBhd2FpdCB0aGlzLl9nZXRDdXN0b21TaWduVGlja2V0Rm4oKVxuICAgIHJldHVybiB0aGlzLnNpZ25JbldpdGhQcm92aWRlcih7XG4gICAgICBwcm92aWRlcl9pZDogJ2N1c3RvbScsXG4gICAgICBwcm92aWRlcl90b2tlbjogY3VzdG9tVGlja2V0XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBwYXNzd29yZFxuICAgKiBAcGFyYW0ge1Jlc2V0UGFzc3dvcmRSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqIEBtZW1iZXJvZiBBdXRoXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcmVzZXRQYXNzd29yZChwYXJhbXM6IFJlc2V0UGFzc3dvcmRSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0KEFwaVVybHMuQVVUSF9TRVRfUEFTU1dPUkQsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXZpY2UgYXV0aG9yaXphdGlvblxuICAgKiBAcGFyYW0ge0RldmljZUF1dGhvcml6ZVJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxEZXZpY2VBdXRob3JpemVSZXNwb25zZT59XG4gICAqIEBtZW1iZXJvZiBBdXRoXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZGV2aWNlQXV0aG9yaXplKHBhcmFtczogRGV2aWNlQXV0aG9yaXplUmVxdWVzdCk6IFByb21pc2U8RGV2aWNlQXV0aG9yaXplUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3QoQXBpVXJscy5BVVRIX0dFVF9ERVZJQ0VfQ09ERSwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGNoZWNrVXNlcm5hbWUocGFyYW1zOiBDaGVja1VzZXJuYW1lUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdChBcGlVcmxzLkFVVEhfR0VUX0RFVklDRV9DT0RFLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBsb2dpblNjb3BlKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5nZXRTY29wZSgpXG4gIH1cbn1cbiJdfQ==