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
                return [2, this._config.request("" + consts_1.ApiUrls.BIND_PHONE_URL, {
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
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRoL2FwaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFYixtQ0FBbUM7QUE4Qm5DLDZEQUE0RTtBQUU1RSw4Q0FBNkM7QUFnQjdDO0lBT0UsY0FBWSxJQUFpQjtRQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzNCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUMxQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pCLElBQU0sV0FBVyxHQUFHO2dCQUNsQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO2FBQ3RCLENBQUM7WUFDRixZQUFZLEdBQUcsSUFBSSwyQkFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLElBQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzVELElBQU0sT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQztnQkFDMUIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixPQUFPLEVBQUUsV0FBVztnQkFDcEIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO2FBQ3RCLENBQUMsQ0FBQTtZQUNGLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUN4QztRQUNELElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDYixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLE9B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Q3pDLFdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQ3RCLGdCQUFPLENBQUMsYUFBYSxTQUFJLE1BQU0sQ0FBQyxXQUFXLFdBQVEsRUFDdEQ7d0JBQ0UsTUFBTSxFQUFFLE1BQU07d0JBQ2QsSUFBSSxFQUFFOzRCQUNKLG9CQUFvQixFQUFFLE1BQU0sQ0FBQyxXQUFXO3lCQUN6Qzt3QkFDRCxlQUFlLEVBQUUsSUFBSTtxQkFDdEIsQ0FDRixFQUFDOzs7S0FDSDtJQU9ZLDZCQUFjLEdBQTNCLFVBQTRCLE1BQW1COzs7Z0JBQzdDLFdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQWMsZ0JBQU8sQ0FBQyxnQkFBZ0IsRUFBRTt3QkFDakUsTUFBTSxFQUFFLE9BQU87d0JBQ2YsSUFBSSxFQUFFLE1BQU07d0JBQ1osZUFBZSxFQUFFLElBQUk7cUJBQ3RCLENBQUMsRUFBQzs7O0tBQ0o7SUFPWSwrQkFBZ0IsR0FBN0IsVUFDRSxlQUFvQzs7OztnQkFFOUIsR0FBRyxHQUFHLEtBQUcsZ0JBQU8sQ0FBQyxjQUFjLEdBQUcsZUFBaUIsQ0FBQztnQkFDMUQsV0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBYyxHQUFHLEVBQUU7d0JBQzVDLE1BQU0sRUFBRSxLQUFLO3dCQUNiLGVBQWUsRUFBRSxJQUFJO3FCQUN0QixDQUFDLEVBQUM7OztLQUNKO0lBQ0gsV0FBQztBQUFELENBQUMsQUF4Y0QsSUF3Y0M7QUF4Y1ksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IEFwaVVybHMgfSBmcm9tICcuL2NvbnN0cyc7XG5pbXBvcnQge1xuICBHZXRWZXJpZmljYXRpb25SZXF1ZXN0LFxuICBHZXRWZXJpZmljYXRpb25SZXNwb25zZSxcbiAgVXNlclByb2ZpbGUsXG4gIFVzZXJJbmZvLFxuICBTaWduSW5SZXF1ZXN0LFxuICBTaWduVXBSZXF1ZXN0LFxuICBWZXJpZnlSZXF1ZXN0LFxuICBWZXJpZnlSZXNwb25zZSxcbiAgR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlcXVlc3QsXG4gIEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZSxcbiAgR3JhbnRQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgR3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2UsXG4gIFBhdGNoUHJvdmlkZXJUb2tlblJlcXVlc3QsXG4gIFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlLFxuICBTaWduSW5XaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICBCaW5kV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgVHJhbnNCeVByb3ZpZGVyUmVxdWVzdCxcbiAgR3JhbnRUb2tlblJlcXVlc3QsXG4gIFVzZXJQcm9maWxlUHJvdmlkZXIsXG4gIFVuYmluZFByb3ZpZGVyUmVxdWVzdCxcbiAgQ2hlY2tQYXNzd29yZHJSZXF1ZXN0LFxuICBCaW5kUGhvbmVSZXF1ZXN0LFxuICBTZXRQYXNzd29yZFJlcXVlc3QsXG4gIENoYW5nZUJpbmRlZFByb3ZpZGVyUmVxdWVzdCxcbiAgQ2hhbmdlQmluZGVkUHJvdmlkZXJSZXNwb25zZSxcbiAgUXVlcnlVc2VyUHJvZmlsZVJlcSxcbn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgU2ltcGxlU3RvcmFnZSwgUmVxdWVzdEZ1bmN0aW9uIH0gZnJvbSAnLi4vb2F1dGgyY2xpZW50L2ludGVyZmFjZSc7XG5pbXBvcnQgeyBPQXV0aDJDbGllbnQsIGRlZmF1bHRTdG9yYWdlIH0gZnJvbSAnLi4vb2F1dGgyY2xpZW50L29hdXRoMmNsaWVudCc7XG5pbXBvcnQgeyBDcmVkZW50aWFscyB9IGZyb20gJy4uL29hdXRoMmNsaWVudC9tb2RlbHMnO1xuaW1wb3J0IHsgQ2FwdGNoYSB9IGZyb20gJy4uL2NhcHRjaGEvY2FwdGNoYSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBBdXRoT3B0aW9ucyB7XG4gIGFwaU9yaWdpbjogc3RyaW5nO1xuICBjbGllbnRJZDogc3RyaW5nO1xuICBjcmVkZW50aWFsc0NsaWVudD86IE9BdXRoMkNsaWVudDtcbiAgcmVxdWVzdD86IFJlcXVlc3RGdW5jdGlvbjtcbiAgc3RvcmFnZT86IFNpbXBsZVN0b3JhZ2U7XG4gIF9mcm9tQXBwPzogSUNsb3VkYmFzZSAvLyDmiYDlsZ5jbG91ZGJhc2UgYXBw5a+56LGhXG59XG5cbi8qKlxuICogQXV0aFxuICovXG5leHBvcnQgY2xhc3MgQXV0aCB7XG4gIHByaXZhdGUgX2NvbmZpZzogQXV0aE9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7QXV0aE9wdGlvbnN9IG9wdHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdHM6IEF1dGhPcHRpb25zKSB7XG4gICAgbGV0IHJlcXVlc3QgPSBvcHRzLnJlcXVlc3Q7XG4gICAgbGV0IG9BdXRoMkNsaWVudCA9IG9wdHMuY3JlZGVudGlhbHNDbGllbnQ7XG4gICAgaWYgKCFvQXV0aDJDbGllbnQpIHtcbiAgICAgIGNvbnN0IGluaXRPcHRpb25zID0ge1xuICAgICAgICBhcGlPcmlnaW46IG9wdHMuYXBpT3JpZ2luLFxuICAgICAgICBjbGllbnRJZDogb3B0cy5jbGllbnRJZCxcbiAgICAgICAgc3RvcmFnZTogb3B0cy5zdG9yYWdlLFxuICAgICAgfTtcbiAgICAgIG9BdXRoMkNsaWVudCA9IG5ldyBPQXV0aDJDbGllbnQoaW5pdE9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgIGNvbnN0IGJhc2VSZXF1ZXN0ID0gb0F1dGgyQ2xpZW50LnJlcXVlc3QuYmluZChvQXV0aDJDbGllbnQpO1xuICAgICAgY29uc3QgY2FwdGNoYSA9IG5ldyBDYXB0Y2hhKHtcbiAgICAgICAgY2xpZW50SWQ6IG9wdHMuY2xpZW50SWQsXG4gICAgICAgIHJlcXVlc3Q6IGJhc2VSZXF1ZXN0LFxuICAgICAgICBzdG9yYWdlOiBvcHRzLnN0b3JhZ2UsXG4gICAgICB9KVxuICAgICAgcmVxdWVzdCA9IGNhcHRjaGEucmVxdWVzdC5iaW5kKGNhcHRjaGEpXG4gICAgfVxuICAgIHRoaXMuX2NvbmZpZyA9IHtcbiAgICAgIGFwaU9yaWdpbjogb3B0cy5hcGlPcmlnaW4sXG4gICAgICBjbGllbnRJZDogb3B0cy5jbGllbnRJZCxcbiAgICAgIHJlcXVlc3Q6IHJlcXVlc3QsXG4gICAgICBjcmVkZW50aWFsc0NsaWVudDogb0F1dGgyQ2xpZW50LFxuICAgICAgc3RvcmFnZTogb3B0cy5zdG9yYWdlIHx8IGRlZmF1bHRTdG9yYWdlLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU2lnbiBpbi5cbiAgICogQHBhcmFtIHtTaWduSW5SZXF1ZXN0fSBwYXJhbXMgQSBTaWduSW5SZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbihwYXJhbXM6IFNpZ25JblJlcXVlc3QpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICBjb25zdCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLkFVVEhfU0lHTl9JTl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXNcbiAgICAgIH0sXG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuc2V0Q3JlZGVudGlhbHMoY3JlZGVudGlhbHMpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3JlZGVudGlhbHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpZ24gaW4gQW5vbnltb3VzbHlcbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbkFub255bW91c2x5KCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICBjb25zdCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLkFVVEhfU0lHTl9JTl9BTk9OWU1PVVNMWV9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgY2xpZW50X2lkOiB0aGlzLl9jb25maWcuY2xpZW50SWRcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5zZXRDcmVkZW50aWFscyhjcmVkZW50aWFscyk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjcmVkZW50aWFscyk7XG4gIH1cblxuICAvKipcbiAgICogU2lnbiB1cC5cbiAgICogQHBhcmFtIHtTaWduVXBSZXF1ZXN0fSBwYXJhbXMgQSBTaWduVXBSZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHJvdGVjdGVkIGFzeW5jIHNpZ25VcChwYXJhbXM6IFNpZ25VcFJlcXVlc3QpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICBjb25zdCBkYXRhOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgIEFwaVVybHMuQVVUSF9TSUdOX1VQX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIH0sXG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuc2V0Q3JlZGVudGlhbHMoZGF0YSk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaWduIG91dC5cbiAgICogQHJldHVybiB7T2JqZWN0fSBBIFByb21pc2U8dm9pZD4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25PdXQoKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbjogc3RyaW5nID0gYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LmdldEFjY2Vzc1Rva2VuKCk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0KEFwaVVybHMuQVVUSF9SRVZPS0VfVVJMLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgY2xpZW50X2lkOiB0aGlzLl9jb25maWcuY2xpZW50SWQsXG4gICAgICAgIHRva2VuOiBhY2Nlc3NUb2tlbixcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKCk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZlcmlmaWNhdGlvbi5cbiAgICogQHBhcmFtIHtHZXRWZXJpZmljYXRpb25SZXF1ZXN0fSBwYXJhbXMgQSBHZXRWZXJpZmljYXRpb25SZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT59IEEgUHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFZlcmlmaWNhdGlvbihcbiAgICBwYXJhbXM6IEdldFZlcmlmaWNhdGlvblJlcXVlc3QsXG4gICk6IFByb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IHtcbiAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4oXG4gICAgICBBcGlVcmxzLlZFUklGSUNBVElPTl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICAgIHdpdGhDYXB0Y2hhOiB0cnVlXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogIFZlcmlmeSB0aGUgY29kZVxuICAgKiBAcGFyYW0ge1ZlcmlmeVJlcXVlc3R9IHBhcmFtcyBBIFZlcmlmeVJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFZlcmlmeVJlc3BvbnNlPn0gQSBQcm9taXNlPFZlcmlmeVJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdmVyaWZ5KHBhcmFtczogVmVyaWZ5UmVxdWVzdCk6IFByb21pc2U8VmVyaWZ5UmVzcG9uc2U+IHtcbiAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxWZXJpZnlSZXNwb25zZT4oQXBpVXJscy5WRVJJRllfVVJMLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW4gcHJvdmlkZXIgcmVkaXJlY3QgdXJpLlxuICAgKiBAcGFyYW0ge0dlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXF1ZXN0fSBwYXJhbXMgQSBHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8R2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlc3BvbnNlPn0gQSBQcm9taXNlPEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdlblByb3ZpZGVyUmVkaXJlY3RVcmkoXG4gICAgcGFyYW1zOiBHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVzcG9uc2U+IHtcbiAgICBsZXQgdXJsID0gYCR7QXBpVXJscy5QUk9WSURFUl9VUklfVVJMfT9jbGllbnRfaWQ9JHt0aGlzLl9jb25maWcuY2xpZW50SWRcbiAgICAgIH0mcHJvdmlkZXJfaWQ9JHtwYXJhbXMucHJvdmlkZXJfaWR9JnJlZGlyZWN0X3VyaT0ke2VuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgcGFyYW1zLnByb3ZpZGVyX3JlZGlyZWN0X3VyaSxcbiAgICAgICl9JnN0YXRlPSR7cGFyYW1zLnN0YXRlfWA7XG4gICAgY29uc3Qgb3RoZXJfcGFyYW1zID0gcGFyYW1zLm90aGVyX3BhcmFtcztcbiAgICBpZiAob3RoZXJfcGFyYW1zKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBvdGhlcl9wYXJhbXMuc2lnbl9vdXRfdXJpID09PSAnc3RyaW5nJyAmJlxuICAgICAgICBvdGhlcl9wYXJhbXMuc2lnbl9vdXRfdXJpLmxlbmd0aCA+IDBcbiAgICAgICkge1xuICAgICAgICB1cmwgKz0gYCZvdGhlcl9wYXJhbXNbc2lnbl9vdXRfdXJpXT0ke290aGVyX3BhcmFtcy5zaWduX291dF91cml9YDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT4odXJsLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyYW50IHByb3ZpZGVyIHRva2VuLlxuICAgKiBAcGFyYW0ge0dyYW50UHJvdmlkZXJUb2tlblJlcXVlc3R9IHBhcmFtcyBBIEdyYW50UHJvdmlkZXJUb2tlblJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlPn0gQSBQcm9taXNlPEdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ3JhbnRQcm92aWRlclRva2VuKFxuICAgIHBhcmFtczogR3JhbnRQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxHcmFudFByb3ZpZGVyVG9rZW5SZXNwb25zZT4ge1xuICAgIHBhcmFtcy5jbGllbnRfaWQgPSB0aGlzLl9jb25maWcuY2xpZW50SWQ7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PEdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlPihcbiAgICAgIEFwaVVybHMuUFJPVklERVJfVE9LRU5fVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyYW50IHByb3ZpZGVyIHRva2VuLlxuICAgKiBAcGFyYW0ge1BhdGNoUHJvdmlkZXJUb2tlblJlcXVlc3R9IHBhcmFtcyBBIFBhdGNoUHJvdmlkZXJUb2tlblJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPn0gQSBQcm9taXNlPFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcGF0Y2hQcm92aWRlclRva2VuKFxuICAgIHBhcmFtczogUGF0Y2hQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxQYXRjaFByb3ZpZGVyVG9rZW5SZXNwb25zZT4ge1xuICAgIHBhcmFtcy5jbGllbnRfaWQgPSB0aGlzLl9jb25maWcuY2xpZW50SWQ7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPihcbiAgICAgIEFwaVVybHMuUFJPVklERVJfVE9LRU5fVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaWduaW4gd2l0aCBwcm92aWRlciByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge1NpZ25JbldpdGhQcm92aWRlclJlcXVlc3R9IHBhcmFtcyBBIFNpZ25JbldpdGhQcm92aWRlclJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aFByb3ZpZGVyKFxuICAgIHBhcmFtczogU2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIHBhcmFtcy5jbGllbnRfaWQgPSB0aGlzLl9jb25maWcuY2xpZW50SWQ7XG4gICAgY29uc3QgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q3JlZGVudGlhbHM+KFxuICAgICAgQXBpVXJscy5BVVRIX1NJR05fSU5fV0lUSF9QUk9WSURFUl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB9LFxuICAgICk7XG4gICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKGNyZWRlbnRpYWxzKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNyZWRlbnRpYWxzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIHdpdGggcHJvdmlkZXJcbiAgICogQHBhcmFtIHtCaW5kV2l0aFByb3ZpZGVyUmVxdWVzdH0gcGFyYW1zIEEgQmluZFdpdGhQcm92aWRlclJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPHZvaWQ+fSBBIFByb21pc2U8YW55PiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgYmluZFdpdGhQcm92aWRlcihcbiAgICBwYXJhbXM6IEJpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KEFwaVVybHMuUFJPVklERVJfQklORF9VUkwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdXNlciBwcm9maWxlLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0VXNlclByb2ZpbGUoKTogUHJvbWlzZTxVc2VyUHJvZmlsZT4ge1xuICAgIHJldHVybiB0aGlzLmdldFVzZXJJbmZvKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB1c2VyIGluZm8uXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VXNlckluZm8+fSBBIFByb21pc2U8VXNlclByb2ZpbGU+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRVc2VySW5mbygpOiBQcm9taXNlPFVzZXJJbmZvPiB7XG4gICAgY29uc3QgdXNlckluZm8gPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxVc2VySW5mbz4oQXBpVXJscy5VU0VSX01FX1VSTCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICB9KTtcbiAgICBpZiAodXNlckluZm8ucGljdHVyZSkge1xuICAgICAgdXNlckluZm8uYXZhdGFyVXJsID0gdXNlckluZm8ucGljdHVyZTtcbiAgICB9XG5cbiAgICBpZiAodXNlckluZm8uc3ViKSB7XG4gICAgICB1c2VySW5mby51aWQgPSB1c2VySW5mby5zdWJcbiAgICB9XG5cbiAgICBpZiAodXNlckluZm8ubmFtZSkge1xuICAgICAgdXNlckluZm8udXNlcm5hbWUgPSB1c2VySW5mby5uYW1lXG4gICAgfVxuICAgIHJldHVybiB1c2VySW5mbztcbiAgfVxuXG4gIC8qKlxuICAgKiBoYXNMb2dpblN0YXRlIGNoZWNrIGlmIGhhcyBsb2dpbiBzdGF0ZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPGJvb2xlYW4+fSBBIFByb21pc2U8Ym9vbGVhbj4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGhhc0xvZ2luU3RhdGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5nZXRBY2Nlc3NUb2tlbigpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaGFzTG9naW5TdGF0ZVN5bmMoKTogQ3JlZGVudGlhbHMgfCBudWxsIHtcbiAgICBjb25zdCBjcmVkZW50aWFscyA9IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5nZXRDcmVkZW50aWFsc1N5bmMoKVxuICAgIHJldHVybiBjcmVkZW50aWFsc1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldExvZ2luU3RhdGUoKTogUHJvbWlzZTxDcmVkZW50aWFscyB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LmdldENyZWRlbnRpYWxzQXN5bmMoKVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zIGJ5IHByb3ZpZGVyLlxuICAgKiBAcGFyYW0ge1RyYW5zQnlQcm92aWRlclJlcXVlc3R9IHBhcmFtcyBBIFRyYW5zQnlQcm92aWRlclJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdHJhbnNCeVByb3ZpZGVyKFxuICAgIHBhcmFtczogVHJhbnNCeVByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLlVTRVJfVFJBTlNfQllfUFJPVklERVJfVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyYW50IHRva2VuLlxuICAgKiBAcGFyYW0ge0dyYW50VG9rZW5SZXF1ZXN0fSBwYXJhbXMgQSBHcmFudFRva2VuUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fSBBIFByb21pc2U8Q3JlZGVudGlhbHM+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBncmFudFRva2VuKHBhcmFtczogR3JhbnRUb2tlblJlcXVlc3QpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q3JlZGVudGlhbHM+KEFwaVVybHMuQVVUSF9UT0tFTl9VUkwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcHJvdmlkZSBsaXN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlUHJvdmlkZXI+fSBBIFByb21pc2U8VXNlclByb2ZpbGVQcm92aWRlcj4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFByb3ZpZGVycygpOiBQcm9taXNlPFVzZXJQcm9maWxlUHJvdmlkZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VXNlclByb2ZpbGVQcm92aWRlcj4oQXBpVXJscy5QUk9WSURFUl9MSVNULCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVuYmluZCBwcm92aWRlci5cbiAgICogQHBhcmFtIHtVbmJpbmRQcm92aWRlclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdW5iaW5kUHJvdmlkZXIocGFyYW1zOiBVbmJpbmRQcm92aWRlclJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KFxuICAgICAgYCR7QXBpVXJscy5QUk9WSURFUl9VTkJJTkRfVVJMfS8ke3BhcmFtcy5wcm92aWRlcl9pZH1gLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgUGFzc3dvcmQuXG4gICAqIEBwYXJhbSB7Q2hlY2tQYXNzd29yZHJSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNoZWNrUGFzc3dvcmQocGFyYW1zOiBDaGVja1Bhc3N3b3JkclJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8YW55PihgJHtBcGlVcmxzLkNIRUNLX1BXRF9VUkx9YCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgUGFzc3dvcmQuXG4gICAqIEBwYXJhbSB7Q2hlY2tQYXNzd29yZHJSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGJpbmRQaG9uZShwYXJhbXM6IEJpbmRQaG9uZVJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8YW55PihgJHtBcGlVcmxzLkJJTkRfUEhPTkVfVVJMfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgUGFzc3dvcmQuXG4gICAqIEBwYXJhbSB7U2V0UGFzc3dvcmRyUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZXRQYXNzd29yZChwYXJhbXM6IFNldFBhc3N3b3JkUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KGAke0FwaVVybHMuQVVUSF9TRVRfUEFTU1dPUkR9YCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCB1c2VyIHZlcmlmaWNhdGlvbi5cbiAgICogQHBhcmFtIHtHZXRWZXJpZmljYXRpb25SZXF1ZXN0fSBwYXJhbXMgQSBHZXRWZXJpZmljYXRpb25SZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT59IEEgUHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEN1clVzZXJWZXJpZmljYXRpb24oXG4gICAgcGFyYW1zOiBHZXRWZXJpZmljYXRpb25SZXF1ZXN0LFxuICApOiBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiB7XG4gICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICBwYXJhbXMudGFyZ2V0ID0gJ0NVUl9VU0VSJztcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+KFxuICAgICAgQXBpVXJscy5WRVJJRklDQVRJT05fVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICAgIHdpdGhDYXB0Y2hhOiB0cnVlXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogY2hhbmdlIGJpbmRlZCBwcm92aWRlci5cbiAgICogQHBhcmFtIHtHZXRWZXJpZmljYXRpb25SZXF1ZXN0fSBwYXJhbXMgQSBHZXRWZXJpZmljYXRpb25SZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT59IEEgUHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNoYW5nZUJpbmRlZFByb3ZpZGVyKFxuICAgIHBhcmFtczogQ2hhbmdlQmluZGVkUHJvdmlkZXJSZXF1ZXN0LFxuICApOiBQcm9taXNlPENoYW5nZUJpbmRlZFByb3ZpZGVyUmVzcG9uc2U+IHtcbiAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxDaGFuZ2VCaW5kZWRQcm92aWRlclJlc3BvbnNlPihcbiAgICAgIGAke0FwaVVybHMuUFJPVklERVJfTElTVH0vJHtwYXJhbXMucHJvdmlkZXJfaWR9L3RyYW5zYCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBwcm92aWRlcl90cmFuc190b2tlbjogcGFyYW1zLnRyYW5zX3Rva2VuLFxuICAgICAgICB9LFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUGF0Y2ggdGhlIHVzZXIgcHJvZmlsZS5cbiAgICogQHBhcmFtIHtVc2VyUHJvZmlsZX0gcGFyYW1zIEEgVXNlclByb2ZpbGUgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2V0VXNlclByb2ZpbGUocGFyYW1zOiBVc2VyUHJvZmlsZSk6IFByb21pc2U8VXNlclByb2ZpbGU+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VXNlclByb2ZpbGU+KEFwaVVybHMuVVNFUl9QUklGSUxFX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhdGNoIHRoZSB1c2VyIHByb2ZpbGUuXG4gICAqIEBwYXJhbSB7UXVlcnlVc2VyUHJvZmlsZVJlcX0gYXBwZW5kZWRfcGFyYW1zIEEgUXVlcnlVc2VyUHJvZmlsZVJlcSBPYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VXNlclByb2ZpbGU+fSBBIFByb21pc2U8VXNlclByb2ZpbGU+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBxdWVyeVVzZXJQcm9maWxlKFxuICAgIGFwcGVuZGVkX3BhcmFtczogUXVlcnlVc2VyUHJvZmlsZVJlcSxcbiAgKTogUHJvbWlzZTxVc2VyUHJvZmlsZT4ge1xuICAgIGNvbnN0IHVybCA9IGAke0FwaVVybHMuVVNFUl9RVUVSWV9VUkx9JHthcHBlbmRlZF9wYXJhbXN9YDtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VXNlclByb2ZpbGU+KHVybCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICB9KTtcbiAgfVxufVxuIl19