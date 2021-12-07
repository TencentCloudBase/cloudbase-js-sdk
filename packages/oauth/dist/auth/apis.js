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
                    case 0:
                        params.client_id = this._config.clientId;
                        return [4, this._config.request(consts_1.ApiUrls.AUTH_SIGN_IN_URL, {
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
                            body: {
                                client_id: this._config.clientId
                            }
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
                    case 0:
                        params.client_id = this._config.clientId;
                        return [4, this._config.request(consts_1.ApiUrls.AUTH_SIGN_UP_URL, {
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
                                    client_id: this._config.clientId,
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
                params.client_id = this._config.clientId;
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
                params.client_id = this._config.clientId;
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
                params.client_id = this._config.clientId;
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
                params.client_id = this._config.clientId;
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
                    case 0:
                        params.client_id = this._config.clientId;
                        return [4, this._config.request(consts_1.ApiUrls.AUTH_SIGN_IN_WITH_PROVIDER_URL, {
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
                params.client_id = this._config.clientId;
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
                        if (userInfo.name) {
                            userInfo.username = userInfo.name;
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
                params.client_id = this._config.clientId;
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
                params.client_id = this._config.clientId;
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
                params.client_id = this._config.clientId;
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
                params.client_id = this._config.clientId;
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
    Auth.prototype.queryUserProfile = function (appended_params) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = "" + consts_1.ApiUrls.USER_QUERY_URL + appended_params;
                return [2, this._config.request(url, {
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
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRoL2FwaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFYixtQ0FBbUM7QUFvQ25DLDZEQUE0RTtBQUU1RSw4Q0FBNkM7QUFjN0M7SUFTRSxjQUFZLElBQWlCO1FBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDM0IsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsSUFBTSxXQUFXLEdBQUc7Z0JBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQztZQUNGLFlBQVksR0FBRyxJQUFJLDJCQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDOUM7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osSUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUQsSUFBTSxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDO2dCQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLE9BQU8sRUFBRSxXQUFXO2dCQUNwQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ3hDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNiLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsT0FB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QUFDLE9BQU8sQ0FBYyxnQkFBTyxDQUFDLGdCQUFnQixFQUFFO3dCQUNqRSxNQUFNLEVBQUUsT0FBTzt3QkFDZixJQUFJLEVBQUUsTUFBTTt3QkFDWixlQUFlLEVBQUUsSUFBSTtxQkFDdEIsQ0FBQyxFQUFDOzs7S0FDSjtJQU9ZLCtCQUFnQixHQUE3QixVQUNFLGVBQW9DOzs7O2dCQUU5QixHQUFHLEdBQUcsS0FBRyxnQkFBTyxDQUFDLGNBQWMsR0FBRyxlQUFpQixDQUFDO2dCQUMxRCxXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUEyQixHQUFHLEVBQUU7d0JBQ3pELE1BQU0sRUFBRSxLQUFLO3dCQUNiLGVBQWUsRUFBRSxJQUFJO3FCQUN0QixDQUFDLEVBQUM7OztLQUNKO0lBTU0sZ0NBQWlCLEdBQXhCLFVBQXlCLFNBQWdDO1FBQ3ZELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxTQUFTLENBQUE7SUFDekMsQ0FBQztJQU1ZLHFDQUFzQixHQUFuQzs7Ozs7NEJBQ3VCLFdBQU0sSUFBSSxDQUFDLHNCQUFzQixFQUFFLEVBQUE7O3dCQUFsRCxZQUFZLEdBQUcsU0FBbUM7d0JBQ3hELFdBQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO2dDQUM3QixXQUFXLEVBQUUsUUFBUTtnQ0FDckIsY0FBYyxFQUFFLFlBQVk7NkJBQzdCLENBQUMsRUFBQTs7OztLQUNIO0lBQ0gsV0FBQztBQUFELENBQUMsQUF0Z0JELElBc2dCQztBQXRnQlksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IEFwaVVybHMgfSBmcm9tICcuL2NvbnN0cyc7XG5pbXBvcnQge1xuICBHZXRWZXJpZmljYXRpb25SZXF1ZXN0LFxuICBHZXRWZXJpZmljYXRpb25SZXNwb25zZSxcbiAgVXNlclByb2ZpbGUsXG4gIFVzZXJJbmZvLFxuICBTaWduSW5SZXF1ZXN0LFxuICBTaWduVXBSZXF1ZXN0LFxuICBWZXJpZnlSZXF1ZXN0LFxuICBWZXJpZnlSZXNwb25zZSxcbiAgR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlcXVlc3QsXG4gIEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZSxcbiAgR3JhbnRQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgR3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2UsXG4gIFBhdGNoUHJvdmlkZXJUb2tlblJlcXVlc3QsXG4gIFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlLFxuICBTaWduSW5XaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICBCaW5kV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgVHJhbnNCeVByb3ZpZGVyUmVxdWVzdCxcbiAgR3JhbnRUb2tlblJlcXVlc3QsXG4gIFVzZXJQcm9maWxlUHJvdmlkZXIsXG4gIFVuYmluZFByb3ZpZGVyUmVxdWVzdCxcbiAgQ2hlY2tQYXNzd29yZHJSZXF1ZXN0LFxuICBCaW5kUGhvbmVSZXF1ZXN0LFxuICBCaW5kRW1haWxSZXF1ZXN0LFxuICBTZXRQYXNzd29yZFJlcXVlc3QsXG4gIENoYW5nZUJpbmRlZFByb3ZpZGVyUmVxdWVzdCxcbiAgQ2hhbmdlQmluZGVkUHJvdmlkZXJSZXNwb25zZSxcbiAgUXVlcnlVc2VyUHJvZmlsZVJlcSxcbiAgVXBkYXRlUGFzc3dvcmRSZXF1ZXN0LFxuICBTdWRvUmVzcG9uc2UsXG4gIFN1ZG9SZXF1ZXN0LFxuICBHZXRDdXN0b21TaWduVGlja2V0Rm4sXG4gIFF1ZXJ5VXNlclByb2ZpbGVSZXNwb25zZVxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBTaW1wbGVTdG9yYWdlLCBSZXF1ZXN0RnVuY3Rpb24gfSBmcm9tICcuLi9vYXV0aDJjbGllbnQvaW50ZXJmYWNlJztcbmltcG9ydCB7IE9BdXRoMkNsaWVudCwgZGVmYXVsdFN0b3JhZ2UgfSBmcm9tICcuLi9vYXV0aDJjbGllbnQvb2F1dGgyY2xpZW50JztcbmltcG9ydCB7IENyZWRlbnRpYWxzIH0gZnJvbSAnLi4vb2F1dGgyY2xpZW50L21vZGVscyc7XG5pbXBvcnQgeyBDYXB0Y2hhIH0gZnJvbSAnLi4vY2FwdGNoYS9jYXB0Y2hhJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhPcHRpb25zIHtcbiAgYXBpT3JpZ2luOiBzdHJpbmc7XG4gIGNsaWVudElkOiBzdHJpbmc7XG4gIGNyZWRlbnRpYWxzQ2xpZW50PzogT0F1dGgyQ2xpZW50O1xuICByZXF1ZXN0PzogUmVxdWVzdEZ1bmN0aW9uO1xuICBzdG9yYWdlPzogU2ltcGxlU3RvcmFnZTtcbn1cblxuLyoqXG4gKiBBdXRoXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRoIHtcbiAgcHJpdmF0ZSBfY29uZmlnOiBBdXRoT3B0aW9ucztcbiAgcHJpdmF0ZSBfZ2V0Q3VzdG9tU2lnblRpY2tldEZuPzogR2V0Q3VzdG9tU2lnblRpY2tldEZuO1xuXG5cbiAgLyoqXG4gICAqIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7QXV0aE9wdGlvbnN9IG9wdHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdHM6IEF1dGhPcHRpb25zKSB7XG4gICAgbGV0IHJlcXVlc3QgPSBvcHRzLnJlcXVlc3Q7XG4gICAgbGV0IG9BdXRoMkNsaWVudCA9IG9wdHMuY3JlZGVudGlhbHNDbGllbnQ7XG4gICAgaWYgKCFvQXV0aDJDbGllbnQpIHtcbiAgICAgIGNvbnN0IGluaXRPcHRpb25zID0ge1xuICAgICAgICBhcGlPcmlnaW46IG9wdHMuYXBpT3JpZ2luLFxuICAgICAgICBjbGllbnRJZDogb3B0cy5jbGllbnRJZCxcbiAgICAgICAgc3RvcmFnZTogb3B0cy5zdG9yYWdlLFxuICAgICAgfTtcbiAgICAgIG9BdXRoMkNsaWVudCA9IG5ldyBPQXV0aDJDbGllbnQoaW5pdE9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgIGNvbnN0IGJhc2VSZXF1ZXN0ID0gb0F1dGgyQ2xpZW50LnJlcXVlc3QuYmluZChvQXV0aDJDbGllbnQpO1xuICAgICAgY29uc3QgY2FwdGNoYSA9IG5ldyBDYXB0Y2hhKHtcbiAgICAgICAgY2xpZW50SWQ6IG9wdHMuY2xpZW50SWQsXG4gICAgICAgIHJlcXVlc3Q6IGJhc2VSZXF1ZXN0LFxuICAgICAgICBzdG9yYWdlOiBvcHRzLnN0b3JhZ2UsXG4gICAgICB9KVxuICAgICAgcmVxdWVzdCA9IGNhcHRjaGEucmVxdWVzdC5iaW5kKGNhcHRjaGEpXG4gICAgfVxuICAgIHRoaXMuX2NvbmZpZyA9IHtcbiAgICAgIGFwaU9yaWdpbjogb3B0cy5hcGlPcmlnaW4sXG4gICAgICBjbGllbnRJZDogb3B0cy5jbGllbnRJZCxcbiAgICAgIHJlcXVlc3Q6IHJlcXVlc3QsXG4gICAgICBjcmVkZW50aWFsc0NsaWVudDogb0F1dGgyQ2xpZW50LFxuICAgICAgc3RvcmFnZTogb3B0cy5zdG9yYWdlIHx8IGRlZmF1bHRTdG9yYWdlLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU2lnbiBpbi5cbiAgICogQHBhcmFtIHtTaWduSW5SZXF1ZXN0fSBwYXJhbXMgQSBTaWduSW5SZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbihwYXJhbXM6IFNpZ25JblJlcXVlc3QpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICBjb25zdCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLkFVVEhfU0lHTl9JTl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXNcbiAgICAgIH0sXG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuc2V0Q3JlZGVudGlhbHMoY3JlZGVudGlhbHMpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3JlZGVudGlhbHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpZ24gaW4gQW5vbnltb3VzbHlcbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbkFub255bW91c2x5KCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICBjb25zdCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLkFVVEhfU0lHTl9JTl9BTk9OWU1PVVNMWV9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgY2xpZW50X2lkOiB0aGlzLl9jb25maWcuY2xpZW50SWRcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5zZXRDcmVkZW50aWFscyhjcmVkZW50aWFscyk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjcmVkZW50aWFscyk7XG4gIH1cblxuICAvKipcbiAgICogU2lnbiB1cC5cbiAgICogQHBhcmFtIHtTaWduVXBSZXF1ZXN0fSBwYXJhbXMgQSBTaWduVXBSZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25VcChwYXJhbXM6IFNpZ25VcFJlcXVlc3QpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICBjb25zdCBkYXRhOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgIEFwaVVybHMuQVVUSF9TSUdOX1VQX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIH0sXG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuc2V0Q3JlZGVudGlhbHMoZGF0YSk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaWduIG91dC5cbiAgICogQHJldHVybiB7T2JqZWN0fSBBIFByb21pc2U8dm9pZD4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25PdXQoKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbjogc3RyaW5nID0gYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LmdldEFjY2Vzc1Rva2VuKCk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0KEFwaVVybHMuQVVUSF9SRVZPS0VfVVJMLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgY2xpZW50X2lkOiB0aGlzLl9jb25maWcuY2xpZW50SWQsXG4gICAgICAgIHRva2VuOiBhY2Nlc3NUb2tlbixcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKCk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZlcmlmaWNhdGlvbi5cbiAgICogQHBhcmFtIHtHZXRWZXJpZmljYXRpb25SZXF1ZXN0fSBwYXJhbXMgQSBHZXRWZXJpZmljYXRpb25SZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT59IEEgUHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFZlcmlmaWNhdGlvbihcbiAgICBwYXJhbXM6IEdldFZlcmlmaWNhdGlvblJlcXVlc3QsXG4gICk6IFByb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IHtcbiAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4oXG4gICAgICBBcGlVcmxzLlZFUklGSUNBVElPTl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICAgIHdpdGhDYXB0Y2hhOiB0cnVlXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogIFZlcmlmeSB0aGUgY29kZVxuICAgKiBAcGFyYW0ge1ZlcmlmeVJlcXVlc3R9IHBhcmFtcyBBIFZlcmlmeVJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFZlcmlmeVJlc3BvbnNlPn0gQSBQcm9taXNlPFZlcmlmeVJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdmVyaWZ5KHBhcmFtczogVmVyaWZ5UmVxdWVzdCk6IFByb21pc2U8VmVyaWZ5UmVzcG9uc2U+IHtcbiAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxWZXJpZnlSZXNwb25zZT4oQXBpVXJscy5WRVJJRllfVVJMLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW4gcHJvdmlkZXIgcmVkaXJlY3QgdXJpLlxuICAgKiBAcGFyYW0ge0dlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXF1ZXN0fSBwYXJhbXMgQSBHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8R2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlc3BvbnNlPn0gQSBQcm9taXNlPEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdlblByb3ZpZGVyUmVkaXJlY3RVcmkoXG4gICAgcGFyYW1zOiBHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVzcG9uc2U+IHtcbiAgICBsZXQgdXJsID0gYCR7QXBpVXJscy5QUk9WSURFUl9VUklfVVJMfT9jbGllbnRfaWQ9JHt0aGlzLl9jb25maWcuY2xpZW50SWRcbiAgICAgIH0mcHJvdmlkZXJfaWQ9JHtwYXJhbXMucHJvdmlkZXJfaWR9JnJlZGlyZWN0X3VyaT0ke2VuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgcGFyYW1zLnByb3ZpZGVyX3JlZGlyZWN0X3VyaSxcbiAgICAgICl9JnN0YXRlPSR7cGFyYW1zLnN0YXRlfWA7XG4gICAgY29uc3Qgb3RoZXJfcGFyYW1zID0gcGFyYW1zLm90aGVyX3BhcmFtcztcbiAgICBpZiAob3RoZXJfcGFyYW1zKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBvdGhlcl9wYXJhbXMuc2lnbl9vdXRfdXJpID09PSAnc3RyaW5nJyAmJlxuICAgICAgICBvdGhlcl9wYXJhbXMuc2lnbl9vdXRfdXJpLmxlbmd0aCA+IDBcbiAgICAgICkge1xuICAgICAgICB1cmwgKz0gYCZvdGhlcl9wYXJhbXNbc2lnbl9vdXRfdXJpXT0ke290aGVyX3BhcmFtcy5zaWduX291dF91cml9YDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT4odXJsLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyYW50IHByb3ZpZGVyIHRva2VuLlxuICAgKiBAcGFyYW0ge0dyYW50UHJvdmlkZXJUb2tlblJlcXVlc3R9IHBhcmFtcyBBIEdyYW50UHJvdmlkZXJUb2tlblJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlPn0gQSBQcm9taXNlPEdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ3JhbnRQcm92aWRlclRva2VuKFxuICAgIHBhcmFtczogR3JhbnRQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxHcmFudFByb3ZpZGVyVG9rZW5SZXNwb25zZT4ge1xuICAgIHBhcmFtcy5jbGllbnRfaWQgPSB0aGlzLl9jb25maWcuY2xpZW50SWQ7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PEdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlPihcbiAgICAgIEFwaVVybHMuUFJPVklERVJfVE9LRU5fVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyYW50IHByb3ZpZGVyIHRva2VuLlxuICAgKiBAcGFyYW0ge1BhdGNoUHJvdmlkZXJUb2tlblJlcXVlc3R9IHBhcmFtcyBBIFBhdGNoUHJvdmlkZXJUb2tlblJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPn0gQSBQcm9taXNlPFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcGF0Y2hQcm92aWRlclRva2VuKFxuICAgIHBhcmFtczogUGF0Y2hQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxQYXRjaFByb3ZpZGVyVG9rZW5SZXNwb25zZT4ge1xuICAgIHBhcmFtcy5jbGllbnRfaWQgPSB0aGlzLl9jb25maWcuY2xpZW50SWQ7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPihcbiAgICAgIEFwaVVybHMuUFJPVklERVJfVE9LRU5fVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaWduaW4gd2l0aCBwcm92aWRlciByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge1NpZ25JbldpdGhQcm92aWRlclJlcXVlc3R9IHBhcmFtcyBBIFNpZ25JbldpdGhQcm92aWRlclJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aFByb3ZpZGVyKFxuICAgIHBhcmFtczogU2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIHBhcmFtcy5jbGllbnRfaWQgPSB0aGlzLl9jb25maWcuY2xpZW50SWQ7XG4gICAgY29uc3QgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q3JlZGVudGlhbHM+KFxuICAgICAgQXBpVXJscy5BVVRIX1NJR05fSU5fV0lUSF9QUk9WSURFUl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB9LFxuICAgICk7XG4gICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKGNyZWRlbnRpYWxzKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNyZWRlbnRpYWxzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIHdpdGggcHJvdmlkZXJcbiAgICogQHBhcmFtIHtCaW5kV2l0aFByb3ZpZGVyUmVxdWVzdH0gcGFyYW1zIEEgQmluZFdpdGhQcm92aWRlclJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPHZvaWQ+fSBBIFByb21pc2U8YW55PiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgYmluZFdpdGhQcm92aWRlcihcbiAgICBwYXJhbXM6IEJpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KEFwaVVybHMuUFJPVklERVJfQklORF9VUkwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdXNlciBwcm9maWxlLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0VXNlclByb2ZpbGUoKTogUHJvbWlzZTxVc2VyUHJvZmlsZT4ge1xuICAgIHJldHVybiB0aGlzLmdldFVzZXJJbmZvKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB1c2VyIGluZm8uXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VXNlckluZm8+fSBBIFByb21pc2U8VXNlclByb2ZpbGU+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRVc2VySW5mbygpOiBQcm9taXNlPFVzZXJJbmZvPiB7XG4gICAgY29uc3QgdXNlckluZm8gPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxVc2VySW5mbz4oQXBpVXJscy5VU0VSX01FX1VSTCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICB9KTtcbiAgICBpZiAodXNlckluZm8ucGljdHVyZSkge1xuICAgICAgdXNlckluZm8uYXZhdGFyVXJsID0gdXNlckluZm8ucGljdHVyZTtcbiAgICB9XG5cbiAgICBpZiAodXNlckluZm8uc3ViKSB7XG4gICAgICB1c2VySW5mby51aWQgPSB1c2VySW5mby5zdWJcbiAgICB9XG5cbiAgICBpZiAodXNlckluZm8ubmFtZSkge1xuICAgICAgdXNlckluZm8udXNlcm5hbWUgPSB1c2VySW5mby5uYW1lXG4gICAgfVxuICAgIHJldHVybiB1c2VySW5mbztcbiAgfVxuXG4gIC8qKlxuICAgKiBoYXNMb2dpblN0YXRlIGNoZWNrIGlmIGhhcyBsb2dpbiBzdGF0ZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPGJvb2xlYW4+fSBBIFByb21pc2U8Ym9vbGVhbj4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGhhc0xvZ2luU3RhdGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5nZXRBY2Nlc3NUb2tlbigpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaGFzTG9naW5TdGF0ZVN5bmMoKTogQ3JlZGVudGlhbHMgfCBudWxsIHtcbiAgICBjb25zdCBjcmVkZW50aWFscyA9IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5nZXRDcmVkZW50aWFsc1N5bmMoKVxuICAgIHJldHVybiBjcmVkZW50aWFsc1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldExvZ2luU3RhdGUoKTogUHJvbWlzZTxDcmVkZW50aWFscyB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LmdldENyZWRlbnRpYWxzQXN5bmMoKVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zIGJ5IHByb3ZpZGVyLlxuICAgKiBAcGFyYW0ge1RyYW5zQnlQcm92aWRlclJlcXVlc3R9IHBhcmFtcyBBIFRyYW5zQnlQcm92aWRlclJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdHJhbnNCeVByb3ZpZGVyKFxuICAgIHBhcmFtczogVHJhbnNCeVByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLlVTRVJfVFJBTlNfQllfUFJPVklERVJfVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyYW50IHRva2VuLlxuICAgKiBAcGFyYW0ge0dyYW50VG9rZW5SZXF1ZXN0fSBwYXJhbXMgQSBHcmFudFRva2VuUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fSBBIFByb21pc2U8Q3JlZGVudGlhbHM+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBncmFudFRva2VuKHBhcmFtczogR3JhbnRUb2tlblJlcXVlc3QpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q3JlZGVudGlhbHM+KEFwaVVybHMuQVVUSF9UT0tFTl9VUkwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcHJvdmlkZSBsaXN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlUHJvdmlkZXI+fSBBIFByb21pc2U8VXNlclByb2ZpbGVQcm92aWRlcj4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFByb3ZpZGVycygpOiBQcm9taXNlPFVzZXJQcm9maWxlUHJvdmlkZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VXNlclByb2ZpbGVQcm92aWRlcj4oQXBpVXJscy5QUk9WSURFUl9MSVNULCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVuYmluZCBwcm92aWRlci5cbiAgICogQHBhcmFtIHtVbmJpbmRQcm92aWRlclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdW5iaW5kUHJvdmlkZXIocGFyYW1zOiBVbmJpbmRQcm92aWRlclJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KFxuICAgICAgYCR7QXBpVXJscy5QUk9WSURFUl9VTkJJTkRfVVJMfS8ke3BhcmFtcy5wcm92aWRlcl9pZH1gLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgUGFzc3dvcmQuXG4gICAqIEBwYXJhbSB7Q2hlY2tQYXNzd29yZHJSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNoZWNrUGFzc3dvcmQocGFyYW1zOiBDaGVja1Bhc3N3b3JkclJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8YW55PihgJHtBcGlVcmxzLkNIRUNLX1BXRF9VUkx9YCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgUGFzc3dvcmQuXG4gICAqIEBwYXJhbSB7Q2hlY2tQYXNzd29yZHJSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGJpbmRQaG9uZShwYXJhbXM6IEJpbmRQaG9uZVJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8YW55PihgJHtBcGlVcmxzLkJJTkRfQ09OVEFDVF9VUkx9YCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrIFBhc3N3b3JkLlxuICAgKiBAcGFyYW0ge0NoZWNrUGFzc3dvcmRyUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBiaW5kRW1haWwocGFyYW1zOiBCaW5kRW1haWxSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oYCR7QXBpVXJscy5CSU5EX0NPTlRBQ1RfVVJMfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgUGFzc3dvcmQuXG4gICAqIEBwYXJhbSB7U2V0UGFzc3dvcmRyUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZXRQYXNzd29yZChwYXJhbXM6IFNldFBhc3N3b3JkUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KGAke0FwaVVybHMuQVVUSF9TRVRfUEFTU1dPUkR9YCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gKiB1cGRhdGVQYXNzd29yZEJ5T2xkIOS9v+eUqOaXp+WvhueggeS/ruaUueWvhuegge+8jOWmguaenOW3sue7j+e7keWumuaJi+acuuWPt++8jOivt+WFiO+8mnN1ZG/vvIzlho3kv67mlLnlr4bnoIFcbiAqIEBwYXJhbSB7U2V0UGFzc3dvcmRyUmVxdWVzdH0gcGFyYW1zXG4gKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gKi9cbiAgcHVibGljIGFzeW5jIHVwZGF0ZVBhc3N3b3JkQnlPbGQocGFyYW1zOiBVcGRhdGVQYXNzd29yZFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzdWRvVG9rZW4gPSBhd2FpdCB0aGlzLnN1ZG8oeyBwYXNzd29yZDogcGFyYW1zLm9sZF9wYXNzd29yZCB9KVxuICAgIHJldHVybiB0aGlzLnNldFBhc3N3b3JkKHtcbiAgICAgIHN1ZG9fdG9rZW46IHN1ZG9Ub2tlbi5zdWRvX3Rva2VuLFxuICAgICAgbmV3X3Bhc3N3b3JkOiBwYXJhbXMubmV3X3Bhc3N3b3JkLFxuICAgIH0pXG4gIH1cblxuXG4gIC8qKlxuICAgKiBzdWRvXG4gICAqIEBwYXJhbSB7c3Vkb30gcGFyYW1zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzdWRvKHBhcmFtczogU3Vkb1JlcXVlc3QpOiBQcm9taXNlPFN1ZG9SZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxTdWRvUmVzcG9uc2U+KGAke0FwaVVybHMuU1VET19VUkx9YCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IHVzZXIgdmVyaWZpY2F0aW9uLlxuICAgKiBAcGFyYW0ge0dldFZlcmlmaWNhdGlvblJlcXVlc3R9IHBhcmFtcyBBIEdldFZlcmlmaWNhdGlvblJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPn0gQSBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0Q3VyVXNlclZlcmlmaWNhdGlvbihcbiAgICBwYXJhbXM6IEdldFZlcmlmaWNhdGlvblJlcXVlc3QsXG4gICk6IFByb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IHtcbiAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgIHBhcmFtcy50YXJnZXQgPSAnQ1VSX1VTRVInO1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4oXG4gICAgICBBcGlVcmxzLlZFUklGSUNBVElPTl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgICAgd2l0aENhcHRjaGE6IHRydWVcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGFuZ2UgYmluZGVkIHByb3ZpZGVyLlxuICAgKiBAcGFyYW0ge0dldFZlcmlmaWNhdGlvblJlcXVlc3R9IHBhcmFtcyBBIEdldFZlcmlmaWNhdGlvblJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPn0gQSBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hhbmdlQmluZGVkUHJvdmlkZXIoXG4gICAgcGFyYW1zOiBDaGFuZ2VCaW5kZWRQcm92aWRlclJlcXVlc3QsXG4gICk6IFByb21pc2U8Q2hhbmdlQmluZGVkUHJvdmlkZXJSZXNwb25zZT4ge1xuICAgIHBhcmFtcy5jbGllbnRfaWQgPSB0aGlzLl9jb25maWcuY2xpZW50SWQ7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENoYW5nZUJpbmRlZFByb3ZpZGVyUmVzcG9uc2U+KFxuICAgICAgYCR7QXBpVXJscy5QUk9WSURFUl9MSVNUfS8ke3BhcmFtcy5wcm92aWRlcl9pZH0vdHJhbnNgLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIHByb3ZpZGVyX3RyYW5zX3Rva2VuOiBwYXJhbXMudHJhbnNfdG9rZW4sXG4gICAgICAgIH0sXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXRjaCB0aGUgdXNlciBwcm9maWxlLlxuICAgKiBAcGFyYW0ge1VzZXJQcm9maWxlfSBwYXJhbXMgQSBVc2VyUHJvZmlsZSBPYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VXNlclByb2ZpbGU+fSBBIFByb21pc2U8VXNlclByb2ZpbGU+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZXRVc2VyUHJvZmlsZShwYXJhbXM6IFVzZXJQcm9maWxlKTogUHJvbWlzZTxVc2VyUHJvZmlsZT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxVc2VyUHJvZmlsZT4oQXBpVXJscy5VU0VSX1BSSUZJTEVfVVJMLCB7XG4gICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUGF0Y2ggdGhlIHVzZXIgcHJvZmlsZS5cbiAgICogQHBhcmFtIHtRdWVyeVVzZXJQcm9maWxlUmVxfSBhcHBlbmRlZF9wYXJhbXMgQSBRdWVyeVVzZXJQcm9maWxlUmVxIE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxVc2VyUHJvZmlsZT59IEEgUHJvbWlzZTxVc2VyUHJvZmlsZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHF1ZXJ5VXNlclByb2ZpbGUoXG4gICAgYXBwZW5kZWRfcGFyYW1zOiBRdWVyeVVzZXJQcm9maWxlUmVxLFxuICApOiBQcm9taXNlPFF1ZXJ5VXNlclByb2ZpbGVSZXNwb25zZT4ge1xuICAgIGNvbnN0IHVybCA9IGAke0FwaVVybHMuVVNFUl9RVUVSWV9VUkx9JHthcHBlbmRlZF9wYXJhbXN9YDtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8UXVlcnlVc2VyUHJvZmlsZVJlc3BvbnNlPih1cmwsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogc2V0Q3VzdG9tU2lnbkZ1bmMgc2V0IHRoZSBnZXQgdGlja2V0IGZ1bmN0aW9uXG4gICAqIEBwYXJhbSBnZXRUaWNrRm5cbiAgICovXG4gIHB1YmxpYyBzZXRDdXN0b21TaWduRnVuYyhnZXRUaWNrRm46IEdldEN1c3RvbVNpZ25UaWNrZXRGbikge1xuICAgIHRoaXMuX2dldEN1c3RvbVNpZ25UaWNrZXRGbiA9IGdldFRpY2tGblxuICB9XG5cbiAgLyoqXG4gICAqIFNpZ25JbldpdGhDdXN0b21UaWNrZXQgY3VzdG9tIHNpZ25JblxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduSW5XaXRoQ3VzdG9tVGlja2V0KCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICBjb25zdCBjdXN0b21UaWNrZXQgPSBhd2FpdCB0aGlzLl9nZXRDdXN0b21TaWduVGlja2V0Rm4oKVxuICAgIHJldHVybiB0aGlzLnNpZ25JbldpdGhQcm92aWRlcih7XG4gICAgICBwcm92aWRlcl9pZDogJ2N1c3RvbScsXG4gICAgICBwcm92aWRlcl90b2tlbjogY3VzdG9tVGlja2V0XG4gICAgfSlcbiAgfVxufVxuIl19