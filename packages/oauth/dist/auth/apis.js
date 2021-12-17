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
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRoL2FwaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFYixtQ0FBbUM7QUF3Q25DLDZEQUE0RTtBQUU1RSw4Q0FBNkM7QUFjN0M7SUFTRSxjQUFZLElBQWlCO1FBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDM0IsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsSUFBTSxXQUFXLEdBQUc7Z0JBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQztZQUNGLFlBQVksR0FBRyxJQUFJLDJCQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDOUM7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osSUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUQsSUFBTSxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDO2dCQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLE9BQU8sRUFBRSxXQUFXO2dCQUNwQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ3hDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNiLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsT0FB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QUNaLGVBQWUsRUFBRSxJQUFJO3FCQUN0QixDQUFDLEVBQUE7OztLQUNIO0lBUVksOEJBQWUsR0FBNUIsVUFBNkIsTUFBOEI7OztnQkFDekQsV0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBTyxDQUFDLG9CQUFvQixFQUFFO3dCQUN4RCxNQUFNLEVBQUUsTUFBTTt3QkFDZCxJQUFJLEVBQUUsTUFBTTt3QkFDWixlQUFlLEVBQUUsSUFBSTtxQkFDdEIsQ0FBQyxFQUFBOzs7S0FDSDtJQUVZLDRCQUFhLEdBQTFCLFVBQTJCLE1BQTRCOzs7Z0JBQ3JELFdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZ0JBQU8sQ0FBQyxvQkFBb0IsRUFBRTt3QkFDeEQsTUFBTSxFQUFFLEtBQUs7d0JBQ2IsSUFBSSxFQUFFLE1BQU07d0JBQ1osZUFBZSxFQUFFLElBQUk7cUJBQ3RCLENBQUMsRUFBQTs7O0tBQ0g7SUFDSCxXQUFDO0FBQUQsQ0FBQyxBQTFoQkQsSUEwaEJDO0FBMWhCWSxvQkFBSSIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgQXBpVXJscyB9IGZyb20gJy4vY29uc3RzJztcbmltcG9ydCB7XG4gIEdldFZlcmlmaWNhdGlvblJlcXVlc3QsXG4gIEdldFZlcmlmaWNhdGlvblJlc3BvbnNlLFxuICBVc2VyUHJvZmlsZSxcbiAgVXNlckluZm8sXG4gIFNpZ25JblJlcXVlc3QsXG4gIFNpZ25VcFJlcXVlc3QsXG4gIFZlcmlmeVJlcXVlc3QsXG4gIFZlcmlmeVJlc3BvbnNlLFxuICBHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVxdWVzdCxcbiAgR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlc3BvbnNlLFxuICBHcmFudFByb3ZpZGVyVG9rZW5SZXF1ZXN0LFxuICBHcmFudFByb3ZpZGVyVG9rZW5SZXNwb25zZSxcbiAgUGF0Y2hQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgUGF0Y2hQcm92aWRlclRva2VuUmVzcG9uc2UsXG4gIFNpZ25JbldpdGhQcm92aWRlclJlcXVlc3QsXG4gIEJpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICBUcmFuc0J5UHJvdmlkZXJSZXF1ZXN0LFxuICBHcmFudFRva2VuUmVxdWVzdCxcbiAgVXNlclByb2ZpbGVQcm92aWRlcixcbiAgVW5iaW5kUHJvdmlkZXJSZXF1ZXN0LFxuICBDaGVja1Bhc3N3b3JkclJlcXVlc3QsXG4gIEJpbmRQaG9uZVJlcXVlc3QsXG4gIEJpbmRFbWFpbFJlcXVlc3QsXG4gIFNldFBhc3N3b3JkUmVxdWVzdCxcbiAgQ2hhbmdlQmluZGVkUHJvdmlkZXJSZXF1ZXN0LFxuICBDaGFuZ2VCaW5kZWRQcm92aWRlclJlc3BvbnNlLFxuICBVcGRhdGVQYXNzd29yZFJlcXVlc3QsXG4gIFN1ZG9SZXNwb25zZSxcbiAgU3Vkb1JlcXVlc3QsXG4gIEdldEN1c3RvbVNpZ25UaWNrZXRGbixcbiAgUXVlcnlVc2VyUHJvZmlsZVJlcXVlc3QsXG4gIFF1ZXJ5VXNlclByb2ZpbGVSZXNwb25zZSxcbiAgUmVzZXRQYXNzd29yZFJlcXVlc3QsXG4gIERldmljZUF1dGhvcml6ZVJlcXVlc3QsXG4gIERldmljZUF1dGhvcml6ZVJlc3BvbnNlLFxuICBDaGVja1VzZXJuYW1lUmVxdWVzdFxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBTaW1wbGVTdG9yYWdlLCBSZXF1ZXN0RnVuY3Rpb24gfSBmcm9tICcuLi9vYXV0aDJjbGllbnQvaW50ZXJmYWNlJztcbmltcG9ydCB7IE9BdXRoMkNsaWVudCwgZGVmYXVsdFN0b3JhZ2UgfSBmcm9tICcuLi9vYXV0aDJjbGllbnQvb2F1dGgyY2xpZW50JztcbmltcG9ydCB7IENyZWRlbnRpYWxzIH0gZnJvbSAnLi4vb2F1dGgyY2xpZW50L21vZGVscyc7XG5pbXBvcnQgeyBDYXB0Y2hhIH0gZnJvbSAnLi4vY2FwdGNoYS9jYXB0Y2hhJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhPcHRpb25zIHtcbiAgYXBpT3JpZ2luOiBzdHJpbmc7XG4gIGNsaWVudElkOiBzdHJpbmc7XG4gIGNyZWRlbnRpYWxzQ2xpZW50PzogT0F1dGgyQ2xpZW50O1xuICByZXF1ZXN0PzogUmVxdWVzdEZ1bmN0aW9uO1xuICBzdG9yYWdlPzogU2ltcGxlU3RvcmFnZTtcbn1cblxuLyoqXG4gKiBBdXRoXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRoIHtcbiAgcHJpdmF0ZSBfY29uZmlnOiBBdXRoT3B0aW9ucztcbiAgcHJpdmF0ZSBfZ2V0Q3VzdG9tU2lnblRpY2tldEZuPzogR2V0Q3VzdG9tU2lnblRpY2tldEZuO1xuXG5cbiAgLyoqXG4gICAqIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7QXV0aE9wdGlvbnN9IG9wdHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdHM6IEF1dGhPcHRpb25zKSB7XG4gICAgbGV0IHJlcXVlc3QgPSBvcHRzLnJlcXVlc3Q7XG4gICAgbGV0IG9BdXRoMkNsaWVudCA9IG9wdHMuY3JlZGVudGlhbHNDbGllbnQ7XG4gICAgaWYgKCFvQXV0aDJDbGllbnQpIHtcbiAgICAgIGNvbnN0IGluaXRPcHRpb25zID0ge1xuICAgICAgICBhcGlPcmlnaW46IG9wdHMuYXBpT3JpZ2luLFxuICAgICAgICBjbGllbnRJZDogb3B0cy5jbGllbnRJZCxcbiAgICAgICAgc3RvcmFnZTogb3B0cy5zdG9yYWdlLFxuICAgICAgfTtcbiAgICAgIG9BdXRoMkNsaWVudCA9IG5ldyBPQXV0aDJDbGllbnQoaW5pdE9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgIGNvbnN0IGJhc2VSZXF1ZXN0ID0gb0F1dGgyQ2xpZW50LnJlcXVlc3QuYmluZChvQXV0aDJDbGllbnQpO1xuICAgICAgY29uc3QgY2FwdGNoYSA9IG5ldyBDYXB0Y2hhKHtcbiAgICAgICAgY2xpZW50SWQ6IG9wdHMuY2xpZW50SWQsXG4gICAgICAgIHJlcXVlc3Q6IGJhc2VSZXF1ZXN0LFxuICAgICAgICBzdG9yYWdlOiBvcHRzLnN0b3JhZ2UsXG4gICAgICB9KVxuICAgICAgcmVxdWVzdCA9IGNhcHRjaGEucmVxdWVzdC5iaW5kKGNhcHRjaGEpXG4gICAgfVxuICAgIHRoaXMuX2NvbmZpZyA9IHtcbiAgICAgIGFwaU9yaWdpbjogb3B0cy5hcGlPcmlnaW4sXG4gICAgICBjbGllbnRJZDogb3B0cy5jbGllbnRJZCxcbiAgICAgIHJlcXVlc3Q6IHJlcXVlc3QsXG4gICAgICBjcmVkZW50aWFsc0NsaWVudDogb0F1dGgyQ2xpZW50LFxuICAgICAgc3RvcmFnZTogb3B0cy5zdG9yYWdlIHx8IGRlZmF1bHRTdG9yYWdlLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU2lnbiBpbi5cbiAgICogQHBhcmFtIHtTaWduSW5SZXF1ZXN0fSBwYXJhbXMgQSBTaWduSW5SZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbihwYXJhbXM6IFNpZ25JblJlcXVlc3QpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgY29uc3QgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q3JlZGVudGlhbHM+KFxuICAgICAgQXBpVXJscy5BVVRIX1NJR05fSU5fVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogcGFyYW1zXG4gICAgICB9LFxuICAgICk7XG4gICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKGNyZWRlbnRpYWxzKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNyZWRlbnRpYWxzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaWduIGluIEFub255bW91c2x5XG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fSBBIFByb21pc2U8Q3JlZGVudGlhbHM+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduSW5Bbm9ueW1vdXNseSgpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgY29uc3QgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q3JlZGVudGlhbHM+KFxuICAgICAgQXBpVXJscy5BVVRIX1NJR05fSU5fQU5PTllNT1VTTFlfVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keToge31cbiAgICAgIH0sXG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuc2V0Q3JlZGVudGlhbHMoY3JlZGVudGlhbHMpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3JlZGVudGlhbHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpZ24gdXAuXG4gICAqIEBwYXJhbSB7U2lnblVwUmVxdWVzdH0gcGFyYW1zIEEgU2lnblVwUmVxdWVzdCBPYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fSBBIFByb21pc2U8Q3JlZGVudGlhbHM+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduVXAocGFyYW1zOiBTaWduVXBSZXF1ZXN0KTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIGNvbnN0IGRhdGE6IENyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q3JlZGVudGlhbHM+KFxuICAgICAgQXBpVXJscy5BVVRIX1NJR05fVVBfVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgfSxcbiAgICApO1xuICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5zZXRDcmVkZW50aWFscyhkYXRhKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpZ24gb3V0LlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IEEgUHJvbWlzZTx2b2lkPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbk91dCgpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuOiBzdHJpbmcgPSBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuZ2V0QWNjZXNzVG9rZW4oKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5fY29uZmlnLnJlcXVlc3QoQXBpVXJscy5BVVRIX1JFVk9LRV9VUkwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keToge1xuICAgICAgICB0b2tlbjogYWNjZXNzVG9rZW4sXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5zZXRDcmVkZW50aWFscygpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB2ZXJpZmljYXRpb24uXG4gICAqIEBwYXJhbSB7R2V0VmVyaWZpY2F0aW9uUmVxdWVzdH0gcGFyYW1zIEEgR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCBPYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+fSBBIFByb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRWZXJpZmljYXRpb24oXG4gICAgcGFyYW1zOiBHZXRWZXJpZmljYXRpb25SZXF1ZXN0LFxuICApOiBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPihcbiAgICAgIEFwaVVybHMuVkVSSUZJQ0FUSU9OX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgd2l0aENhcHRjaGE6IHRydWVcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgVmVyaWZ5IHRoZSBjb2RlXG4gICAqIEBwYXJhbSB7VmVyaWZ5UmVxdWVzdH0gcGFyYW1zIEEgVmVyaWZ5UmVxdWVzdCBPYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VmVyaWZ5UmVzcG9uc2U+fSBBIFByb21pc2U8VmVyaWZ5UmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyB2ZXJpZnkocGFyYW1zOiBWZXJpZnlSZXF1ZXN0KTogUHJvbWlzZTxWZXJpZnlSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxWZXJpZnlSZXNwb25zZT4oQXBpVXJscy5WRVJJRllfVVJMLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW4gcHJvdmlkZXIgcmVkaXJlY3QgdXJpLlxuICAgKiBAcGFyYW0ge0dlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXF1ZXN0fSBwYXJhbXMgQSBHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8R2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlc3BvbnNlPn0gQSBQcm9taXNlPEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdlblByb3ZpZGVyUmVkaXJlY3RVcmkoXG4gICAgcGFyYW1zOiBHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVzcG9uc2U+IHtcbiAgICBsZXQgdXJsID0gYCR7QXBpVXJscy5QUk9WSURFUl9VUklfVVJMfT9jbGllbnRfaWQ9JHt0aGlzLl9jb25maWcuY2xpZW50SWRcbiAgICAgIH0mcHJvdmlkZXJfaWQ9JHtwYXJhbXMucHJvdmlkZXJfaWR9JnJlZGlyZWN0X3VyaT0ke2VuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgcGFyYW1zLnByb3ZpZGVyX3JlZGlyZWN0X3VyaSxcbiAgICAgICl9JnN0YXRlPSR7cGFyYW1zLnN0YXRlfWA7XG4gICAgY29uc3Qgb3RoZXJfcGFyYW1zID0gcGFyYW1zLm90aGVyX3BhcmFtcztcbiAgICBpZiAob3RoZXJfcGFyYW1zKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBvdGhlcl9wYXJhbXMuc2lnbl9vdXRfdXJpID09PSAnc3RyaW5nJyAmJlxuICAgICAgICBvdGhlcl9wYXJhbXMuc2lnbl9vdXRfdXJpLmxlbmd0aCA+IDBcbiAgICAgICkge1xuICAgICAgICB1cmwgKz0gYCZvdGhlcl9wYXJhbXNbc2lnbl9vdXRfdXJpXT0ke290aGVyX3BhcmFtcy5zaWduX291dF91cml9YDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT4odXJsLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyYW50IHByb3ZpZGVyIHRva2VuLlxuICAgKiBAcGFyYW0ge0dyYW50UHJvdmlkZXJUb2tlblJlcXVlc3R9IHBhcmFtcyBBIEdyYW50UHJvdmlkZXJUb2tlblJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlPn0gQSBQcm9taXNlPEdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ3JhbnRQcm92aWRlclRva2VuKFxuICAgIHBhcmFtczogR3JhbnRQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxHcmFudFByb3ZpZGVyVG9rZW5SZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxHcmFudFByb3ZpZGVyVG9rZW5SZXNwb25zZT4oXG4gICAgICBBcGlVcmxzLlBST1ZJREVSX1RPS0VOX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHcmFudCBwcm92aWRlciB0b2tlbi5cbiAgICogQHBhcmFtIHtQYXRjaFByb3ZpZGVyVG9rZW5SZXF1ZXN0fSBwYXJhbXMgQSBQYXRjaFByb3ZpZGVyVG9rZW5SZXF1ZXN0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxQYXRjaFByb3ZpZGVyVG9rZW5SZXNwb25zZT59IEEgUHJvbWlzZTxQYXRjaFByb3ZpZGVyVG9rZW5SZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHBhdGNoUHJvdmlkZXJUb2tlbihcbiAgICBwYXJhbXM6IFBhdGNoUHJvdmlkZXJUb2tlblJlcXVlc3QsXG4gICk6IFByb21pc2U8UGF0Y2hQcm92aWRlclRva2VuUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8UGF0Y2hQcm92aWRlclRva2VuUmVzcG9uc2U+KFxuICAgICAgQXBpVXJscy5QUk9WSURFUl9UT0tFTl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpZ25pbiB3aXRoIHByb3ZpZGVyIHJlcXVlc3QuXG4gICAqIEBwYXJhbSB7U2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdH0gcGFyYW1zIEEgU2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fSBBIFByb21pc2U8Q3JlZGVudGlhbHM+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduSW5XaXRoUHJvdmlkZXIoXG4gICAgcGFyYW1zOiBTaWduSW5XaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICApOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgY29uc3QgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q3JlZGVudGlhbHM+KFxuICAgICAgQXBpVXJscy5BVVRIX1NJR05fSU5fV0lUSF9QUk9WSURFUl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB9LFxuICAgICk7XG4gICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKGNyZWRlbnRpYWxzKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNyZWRlbnRpYWxzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIHdpdGggcHJvdmlkZXJcbiAgICogQHBhcmFtIHtCaW5kV2l0aFByb3ZpZGVyUmVxdWVzdH0gcGFyYW1zIEEgQmluZFdpdGhQcm92aWRlclJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPHZvaWQ+fSBBIFByb21pc2U8YW55PiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgYmluZFdpdGhQcm92aWRlcihcbiAgICBwYXJhbXM6IEJpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8YW55PihBcGlVcmxzLlBST1ZJREVSX0JJTkRfVVJMLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHVzZXIgcHJvZmlsZS5cbiAgICogQHJldHVybiB7UHJvbWlzZTxVc2VyUHJvZmlsZT59IEEgUHJvbWlzZTxVc2VyUHJvZmlsZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFVzZXJQcm9maWxlKCk6IFByb21pc2U8VXNlclByb2ZpbGU+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRVc2VySW5mbygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdXNlciBpbmZvLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJJbmZvPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0VXNlckluZm8oKTogUHJvbWlzZTxVc2VySW5mbz4ge1xuICAgIGNvbnN0IHVzZXJJbmZvID0gYXdhaXQgdGhpcy5fY29uZmlnLnJlcXVlc3Q8VXNlckluZm8+KEFwaVVybHMuVVNFUl9NRV9VUkwsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSk7XG4gICAgaWYgKHVzZXJJbmZvLnBpY3R1cmUpIHtcbiAgICAgIHVzZXJJbmZvLmF2YXRhclVybCA9IHVzZXJJbmZvLnBpY3R1cmU7XG4gICAgfVxuXG4gICAgaWYgKHVzZXJJbmZvLnN1Yikge1xuICAgICAgdXNlckluZm8udWlkID0gdXNlckluZm8uc3ViXG4gICAgfVxuXG4gICAgcmV0dXJuIHVzZXJJbmZvO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhc0xvZ2luU3RhdGUgY2hlY2sgaWYgaGFzIGxvZ2luIHN0YXRlXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Ym9vbGVhbj59IEEgUHJvbWlzZTxib29sZWFuPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaGFzTG9naW5TdGF0ZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LmdldEFjY2Vzc1Rva2VuKClcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBoYXNMb2dpblN0YXRlU3luYygpOiBDcmVkZW50aWFscyB8IG51bGwge1xuICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LmdldENyZWRlbnRpYWxzU3luYygpXG4gICAgcmV0dXJuIGNyZWRlbnRpYWxzXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0TG9naW5TdGF0ZSgpOiBQcm9taXNlPENyZWRlbnRpYWxzIHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuZ2V0Q3JlZGVudGlhbHNBc3luYygpXG4gIH1cblxuICAvKipcbiAgICogVHJhbnMgYnkgcHJvdmlkZXIuXG4gICAqIEBwYXJhbSB7VHJhbnNCeVByb3ZpZGVyUmVxdWVzdH0gcGFyYW1zIEEgVHJhbnNCeVByb3ZpZGVyUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fSBBIFByb21pc2U8Q3JlZGVudGlhbHM+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyB0cmFuc0J5UHJvdmlkZXIoXG4gICAgcGFyYW1zOiBUcmFuc0J5UHJvdmlkZXJSZXF1ZXN0LFxuICApOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgIEFwaVVybHMuVVNFUl9UUkFOU19CWV9QUk9WSURFUl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR3JhbnQgdG9rZW4uXG4gICAqIEBwYXJhbSB7R3JhbnRUb2tlblJlcXVlc3R9IHBhcmFtcyBBIEdyYW50VG9rZW5SZXF1ZXN0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdyYW50VG9rZW4ocGFyYW1zOiBHcmFudFRva2VuUmVxdWVzdCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q3JlZGVudGlhbHM+KEFwaVVybHMuQVVUSF9UT0tFTl9VUkwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcHJvdmlkZSBsaXN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlUHJvdmlkZXI+fSBBIFByb21pc2U8VXNlclByb2ZpbGVQcm92aWRlcj4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFByb3ZpZGVycygpOiBQcm9taXNlPFVzZXJQcm9maWxlUHJvdmlkZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VXNlclByb2ZpbGVQcm92aWRlcj4oQXBpVXJscy5QUk9WSURFUl9MSVNULCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVuYmluZCBwcm92aWRlci5cbiAgICogQHBhcmFtIHtVbmJpbmRQcm92aWRlclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdW5iaW5kUHJvdmlkZXIocGFyYW1zOiBVbmJpbmRQcm92aWRlclJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8YW55PihcbiAgICAgIGAke0FwaVVybHMuUFJPVklERVJfVU5CSU5EX1VSTH0vJHtwYXJhbXMucHJvdmlkZXJfaWR9YCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrIFBhc3N3b3JkLlxuICAgKiBAcGFyYW0ge0NoZWNrUGFzc3dvcmRyUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBjaGVja1Bhc3N3b3JkKHBhcmFtczogQ2hlY2tQYXNzd29yZHJSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oYCR7QXBpVXJscy5DSEVDS19QV0RfVVJMfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrIFBhc3N3b3JkLlxuICAgKiBAcGFyYW0ge0NoZWNrUGFzc3dvcmRyUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBiaW5kUGhvbmUocGFyYW1zOiBCaW5kUGhvbmVSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oYCR7QXBpVXJscy5CSU5EX0NPTlRBQ1RfVVJMfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayBQYXNzd29yZC5cbiAgICogQHBhcmFtIHtDaGVja1Bhc3N3b3JkclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgYmluZEVtYWlsKHBhcmFtczogQmluZEVtYWlsUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KGAke0FwaVVybHMuQklORF9DT05UQUNUX1VSTH1gLCB7XG4gICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFBhc3N3b3JkLlxuICAgKiBAcGFyYW0ge1NldFBhc3N3b3JkclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2V0UGFzc3dvcmQocGFyYW1zOiBTZXRQYXNzd29yZFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8YW55PihgJHtBcGlVcmxzLkFVVEhfU0VUX1BBU1NXT1JEfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICogdXBkYXRlUGFzc3dvcmRCeU9sZCDkvb/nlKjml6flr4bnoIHkv67mlLnlr4bnoIHvvIzlpoLmnpzlt7Lnu4/nu5HlrprmiYvmnLrlj7fvvIzor7flhYjvvJpzdWRv77yM5YaN5L+u5pS55a+G56CBXG4gKiBAcGFyYW0ge1NldFBhc3N3b3JkclJlcXVlc3R9IHBhcmFtc1xuICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICovXG4gIHB1YmxpYyBhc3luYyB1cGRhdGVQYXNzd29yZEJ5T2xkKHBhcmFtczogVXBkYXRlUGFzc3dvcmRSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3Vkb1Rva2VuID0gYXdhaXQgdGhpcy5zdWRvKHsgcGFzc3dvcmQ6IHBhcmFtcy5vbGRfcGFzc3dvcmQgfSlcbiAgICByZXR1cm4gdGhpcy5zZXRQYXNzd29yZCh7XG4gICAgICBzdWRvX3Rva2VuOiBzdWRvVG9rZW4uc3Vkb190b2tlbixcbiAgICAgIG5ld19wYXNzd29yZDogcGFyYW1zLm5ld19wYXNzd29yZCxcbiAgICB9KVxuICB9XG5cblxuICAvKipcbiAgICogc3Vkb1xuICAgKiBAcGFyYW0ge3N1ZG99IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc3VkbyhwYXJhbXM6IFN1ZG9SZXF1ZXN0KTogUHJvbWlzZTxTdWRvUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8U3Vkb1Jlc3BvbnNlPihgJHtBcGlVcmxzLlNVRE9fVVJMfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCB1c2VyIHZlcmlmaWNhdGlvbi5cbiAgICogQHBhcmFtIHtHZXRWZXJpZmljYXRpb25SZXF1ZXN0fSBwYXJhbXMgQSBHZXRWZXJpZmljYXRpb25SZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT59IEEgUHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEN1clVzZXJWZXJpZmljYXRpb24oXG4gICAgcGFyYW1zOiBHZXRWZXJpZmljYXRpb25SZXF1ZXN0LFxuICApOiBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiB7XG4gICAgcGFyYW1zLnRhcmdldCA9ICdDVVJfVVNFUic7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPihcbiAgICAgIEFwaVVybHMuVkVSSUZJQ0FUSU9OX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICB3aXRoQ2FwdGNoYTogdHJ1ZVxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIGNoYW5nZSBiaW5kZWQgcHJvdmlkZXIuXG4gICAqIEBwYXJhbSB7R2V0VmVyaWZpY2F0aW9uUmVxdWVzdH0gcGFyYW1zIEEgR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCBPYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+fSBBIFByb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBjaGFuZ2VCaW5kZWRQcm92aWRlcihcbiAgICBwYXJhbXM6IENoYW5nZUJpbmRlZFByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxDaGFuZ2VCaW5kZWRQcm92aWRlclJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENoYW5nZUJpbmRlZFByb3ZpZGVyUmVzcG9uc2U+KFxuICAgICAgYCR7QXBpVXJscy5QUk9WSURFUl9MSVNUfS8ke3BhcmFtcy5wcm92aWRlcl9pZH0vdHJhbnNgLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIHByb3ZpZGVyX3RyYW5zX3Rva2VuOiBwYXJhbXMudHJhbnNfdG9rZW4sXG4gICAgICAgIH0sXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXRjaCB0aGUgdXNlciBwcm9maWxlLlxuICAgKiBAcGFyYW0ge1VzZXJQcm9maWxlfSBwYXJhbXMgQSBVc2VyUHJvZmlsZSBPYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VXNlclByb2ZpbGU+fSBBIFByb21pc2U8VXNlclByb2ZpbGU+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZXRVc2VyUHJvZmlsZShwYXJhbXM6IFVzZXJQcm9maWxlKTogUHJvbWlzZTxVc2VyUHJvZmlsZT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxVc2VyUHJvZmlsZT4oQXBpVXJscy5VU0VSX1BSSUZJTEVfVVJMLCB7XG4gICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUGF0Y2ggdGhlIHVzZXIgcHJvZmlsZS5cbiAgICogQHBhcmFtIHtRdWVyeVVzZXJQcm9maWxlUmVxfSBhcHBlbmRlZF9wYXJhbXMgQSBRdWVyeVVzZXJQcm9maWxlUmVxIE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxVc2VyUHJvZmlsZT59IEEgUHJvbWlzZTxVc2VyUHJvZmlsZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHF1ZXJ5VXNlclByb2ZpbGUoXG4gICAgcGFyYW1zOiBRdWVyeVVzZXJQcm9maWxlUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxRdWVyeVVzZXJQcm9maWxlUmVzcG9uc2U+IHtcbiAgICBsZXQgdXJsID0gbmV3IFVSTChBcGlVcmxzLlVTRVJfUVVFUllfVVJMKTtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtcyBhcyBhbnkpO1xuICAgIHVybC5zZWFyY2ggPSBzZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8UXVlcnlVc2VyUHJvZmlsZVJlc3BvbnNlPih1cmwudG9TdHJpbmcoKSwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRDdXN0b21TaWduRnVuYyBzZXQgdGhlIGdldCB0aWNrZXQgZnVuY3Rpb25cbiAgICogQHBhcmFtIGdldFRpY2tGblxuICAgKi9cbiAgcHVibGljIHNldEN1c3RvbVNpZ25GdW5jKGdldFRpY2tGbjogR2V0Q3VzdG9tU2lnblRpY2tldEZuKSB7XG4gICAgdGhpcy5fZ2V0Q3VzdG9tU2lnblRpY2tldEZuID0gZ2V0VGlja0ZuXG4gIH1cblxuICAvKipcbiAgICogU2lnbkluV2l0aEN1c3RvbVRpY2tldCBjdXN0b20gc2lnbkluXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbldpdGhDdXN0b21UaWNrZXQoKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIGNvbnN0IGN1c3RvbVRpY2tldCA9IGF3YWl0IHRoaXMuX2dldEN1c3RvbVNpZ25UaWNrZXRGbigpXG4gICAgcmV0dXJuIHRoaXMuc2lnbkluV2l0aFByb3ZpZGVyKHtcbiAgICAgIHByb3ZpZGVyX2lkOiAnY3VzdG9tJyxcbiAgICAgIHByb3ZpZGVyX3Rva2VuOiBjdXN0b21UaWNrZXRcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHBhc3N3b3JkXG4gICAqIEBwYXJhbSB7UmVzZXRQYXNzd29yZFJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIHB1YmxpYyBhc3luYyByZXNldFBhc3N3b3JkKHBhcmFtczogUmVzZXRQYXNzd29yZFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3QoQXBpVXJscy5BVVRIX1NFVF9QQVNTV09SRCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIGRldmljZSBhdXRob3JpemF0aW9uXG4gICAqIEBwYXJhbSB7RGV2aWNlQXV0aG9yaXplUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPERldmljZUF1dGhvcml6ZVJlc3BvbnNlPn1cbiAgICogQG1lbWJlcm9mIEF1dGhcbiAgICovXG4gIHB1YmxpYyBhc3luYyBkZXZpY2VBdXRob3JpemUocGFyYW1zOiBEZXZpY2VBdXRob3JpemVSZXF1ZXN0KTogUHJvbWlzZTxEZXZpY2VBdXRob3JpemVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdChBcGlVcmxzLkFVVEhfR0VUX0RFVklDRV9DT0RFLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2hlY2tVc2VybmFtZShwYXJhbXM6IENoZWNrVXNlcm5hbWVSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0KEFwaVVybHMuQVVUSF9HRVRfREVWSUNFX0NPREUsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcbiAgICB9KVxuICB9XG59XG4iXX0=