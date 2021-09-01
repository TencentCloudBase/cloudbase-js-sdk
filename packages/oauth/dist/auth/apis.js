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
            return __generator(this, function (_a) {
                return [2, this._config.request(consts_1.ApiUrls.USER_ME_URL, {
                        method: 'GET',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRoL2FwaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFYixtQ0FBaUM7QUE4QmpDLDZEQUEwRTtBQUUxRSw4Q0FBMkM7QUFhM0M7SUFPSSxjQUFZLElBQWlCO1FBQ3pCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDM0IsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDZixJQUFNLFdBQVcsR0FBRztnQkFDaEIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzthQUN4QixDQUFDO1lBQ0YsWUFBWSxHQUFHLElBQUksMkJBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNoRDtRQUNELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDVixJQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM1RCxJQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUM7Z0JBQ3hCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkIsT0FBTyxFQUFFLFdBQVc7Z0JBQ3BCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzthQUN4QixDQUFDLENBQUE7WUFDRixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDMUM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1gsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixPQUFP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LE9BQU8sQ0FBYyxHQUFHLEVBQUU7d0JBQzFDLE1BQU0sRUFBRSxLQUFLO3dCQUNiLGVBQWUsRUFBRSxJQUFJO3FCQUN4QixDQUFDLEVBQUM7OztLQUNOO0lBQ0wsV0FBQztBQUFELENBQUMsQUFwYkQsSUFvYkM7QUFwYlksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7QXBpVXJsc30gZnJvbSAnLi9jb25zdHMnO1xuaW1wb3J0IHtcbiAgICBHZXRWZXJpZmljYXRpb25SZXF1ZXN0LFxuICAgIEdldFZlcmlmaWNhdGlvblJlc3BvbnNlLFxuICAgIFVzZXJQcm9maWxlLFxuICAgIFVzZXJJbmZvLFxuICAgIFNpZ25JblJlcXVlc3QsXG4gICAgU2lnblVwUmVxdWVzdCxcbiAgICBWZXJpZnlSZXF1ZXN0LFxuICAgIFZlcmlmeVJlc3BvbnNlLFxuICAgIEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXF1ZXN0LFxuICAgIEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZSxcbiAgICBHcmFudFByb3ZpZGVyVG9rZW5SZXF1ZXN0LFxuICAgIEdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlLFxuICAgIFBhdGNoUHJvdmlkZXJUb2tlblJlcXVlc3QsXG4gICAgUGF0Y2hQcm92aWRlclRva2VuUmVzcG9uc2UsXG4gICAgU2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgICBCaW5kV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgICBUcmFuc0J5UHJvdmlkZXJSZXF1ZXN0LFxuICAgIEdyYW50VG9rZW5SZXF1ZXN0LFxuICAgIFVzZXJQcm9maWxlUHJvdmlkZXIsXG4gICAgVW5iaW5kUHJvdmlkZXJSZXF1ZXN0LFxuICAgIENoZWNrUGFzc3dvcmRyUmVxdWVzdCxcbiAgICBCaW5kUGhvbmVSZXF1ZXN0LFxuICAgIFNldFBhc3N3b3JkUmVxdWVzdCxcbiAgICBDaGFuZ2VCaW5kZWRQcm92aWRlclJlcXVlc3QsXG4gICAgQ2hhbmdlQmluZGVkUHJvdmlkZXJSZXNwb25zZSxcbiAgICBRdWVyeVVzZXJQcm9maWxlUmVxLFxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge1NpbXBsZVN0b3JhZ2UsIFJlcXVlc3RGdW5jdGlvbn0gZnJvbSAnLi4vb2F1dGgyY2xpZW50L2ludGVyZmFjZSc7XG5pbXBvcnQge09BdXRoMkNsaWVudCwgZGVmYXVsdFN0b3JhZ2V9IGZyb20gJy4uL29hdXRoMmNsaWVudC9vYXV0aDJjbGllbnQnO1xuaW1wb3J0IHtDcmVkZW50aWFsc30gZnJvbSAnLi4vb2F1dGgyY2xpZW50L21vZGVscyc7XG5pbXBvcnQge0NhcHRjaGF9IGZyb20gJy4uL2NhcHRjaGEvY2FwdGNoYSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXV0aE9wdGlvbnMge1xuICAgIGFwaU9yaWdpbjogc3RyaW5nO1xuICAgIGNsaWVudElkOiBzdHJpbmc7XG4gICAgY3JlZGVudGlhbHNDbGllbnQ/OiBPQXV0aDJDbGllbnQ7XG4gICAgcmVxdWVzdD86IFJlcXVlc3RGdW5jdGlvbjtcbiAgICBzdG9yYWdlPzogU2ltcGxlU3RvcmFnZTtcbn1cblxuLyoqXG4gKiBBdXRoXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRoIHtcbiAgICBwcml2YXRlIF9jb25maWc6IEF1dGhPcHRpb25zO1xuXG4gICAgLyoqXG4gICAgICogY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0F1dGhPcHRpb25zfSBvcHRzXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0czogQXV0aE9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBvcHRzLnJlcXVlc3Q7XG4gICAgICAgIGxldCBvQXV0aDJDbGllbnQgPSBvcHRzLmNyZWRlbnRpYWxzQ2xpZW50O1xuICAgICAgICBpZiAoIW9BdXRoMkNsaWVudCkge1xuICAgICAgICAgICAgY29uc3QgaW5pdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgYXBpT3JpZ2luOiBvcHRzLmFwaU9yaWdpbixcbiAgICAgICAgICAgICAgICBjbGllbnRJZDogb3B0cy5jbGllbnRJZCxcbiAgICAgICAgICAgICAgICBzdG9yYWdlOiBvcHRzLnN0b3JhZ2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgb0F1dGgyQ2xpZW50ID0gbmV3IE9BdXRoMkNsaWVudChpbml0T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgICBjb25zdCBiYXNlUmVxdWVzdCA9IG9BdXRoMkNsaWVudC5yZXF1ZXN0LmJpbmQob0F1dGgyQ2xpZW50KTtcbiAgICAgICAgICAgIGNvbnN0IGNhcHRjaGEgPSBuZXcgQ2FwdGNoYSh7XG4gICAgICAgICAgICAgICAgY2xpZW50SWQ6IG9wdHMuY2xpZW50SWQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdDogYmFzZVJlcXVlc3QsXG4gICAgICAgICAgICAgICAgc3RvcmFnZTogb3B0cy5zdG9yYWdlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJlcXVlc3QgPSBjYXB0Y2hhLnJlcXVlc3QuYmluZChjYXB0Y2hhKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHtcbiAgICAgICAgICAgIGFwaU9yaWdpbjogb3B0cy5hcGlPcmlnaW4sXG4gICAgICAgICAgICBjbGllbnRJZDogb3B0cy5jbGllbnRJZCxcbiAgICAgICAgICAgIHJlcXVlc3Q6IHJlcXVlc3QsXG4gICAgICAgICAgICBjcmVkZW50aWFsc0NsaWVudDogb0F1dGgyQ2xpZW50LFxuICAgICAgICAgICAgc3RvcmFnZTogb3B0cy5zdG9yYWdlIHx8IGRlZmF1bHRTdG9yYWdlLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNpZ24gaW4uXG4gICAgICogQHBhcmFtIHtTaWduSW5SZXF1ZXN0fSBwYXJhbXMgQSBTaWduSW5SZXF1ZXN0IE9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNpZ25JbihwYXJhbXM6IFNpZ25JblJlcXVlc3QpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgICAgIHBhcmFtcy5jbGllbnRfaWQgPSB0aGlzLl9jb25maWcuY2xpZW50SWQ7XG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgICAgICAgIEFwaVVybHMuQVVUSF9TSUdOX0lOX1VSTCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBib2R5OiBwYXJhbXNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5zZXRDcmVkZW50aWFscyhjcmVkZW50aWFscyk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3JlZGVudGlhbHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNpZ24gaW4gQW5vbnltb3VzbHlcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNpZ25JbkFub255bW91c2x5KCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICAgICAgY29uc3QgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q3JlZGVudGlhbHM+KFxuICAgICAgICAgICAgQXBpVXJscy5BVVRIX1NJR05fSU5fQU5PTllNT1VTTFlfVVJMLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50X2lkOiB0aGlzLl9jb25maWcuY2xpZW50SWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgICAgICBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuc2V0Q3JlZGVudGlhbHMoY3JlZGVudGlhbHMpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNyZWRlbnRpYWxzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaWduIHVwLlxuICAgICAqIEBwYXJhbSB7U2lnblVwUmVxdWVzdH0gcGFyYW1zIEEgU2lnblVwUmVxdWVzdCBPYmplY3QuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhc3luYyBzaWduVXAocGFyYW1zOiBTaWduVXBSZXF1ZXN0KTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgICAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgICAgICBjb25zdCBkYXRhOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgICAgICAgIEFwaVVybHMuQVVUSF9TSUdOX1VQX1VSTCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgICAgICBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuc2V0Q3JlZGVudGlhbHMoZGF0YSk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2lnbiBvdXQuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBBIFByb21pc2U8dm9pZD4gb2JqZWN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzaWduT3V0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbjogc3RyaW5nID0gYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LmdldEFjY2Vzc1Rva2VuKCk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDx2b2lkPihBcGlVcmxzLkFVVEhfUkVWT0tFX1VSTCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgY2xpZW50X2lkOiB0aGlzLl9jb25maWcuY2xpZW50SWQsXG4gICAgICAgICAgICAgICAgdG9rZW46IGFjY2Vzc1Rva2VuLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5zZXRDcmVkZW50aWFscygpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdmVyaWZpY2F0aW9uLlxuICAgICAqIEBwYXJhbSB7R2V0VmVyaWZpY2F0aW9uUmVxdWVzdH0gcGFyYW1zIEEgR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCBPYmplY3QuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT59IEEgUHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4gb2JqZWN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZXRWZXJpZmljYXRpb24oXG4gICAgICAgIHBhcmFtczogR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCxcbiAgICApOiBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiB7XG4gICAgICAgIHBhcmFtcy5jbGllbnRfaWQgPSB0aGlzLl9jb25maWcuY2xpZW50SWQ7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4oXG4gICAgICAgICAgICBBcGlVcmxzLlZFUklGSUNBVElPTl9VUkwsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgICAgICAgICAgIHdpdGhDYXB0Y2hhOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBWZXJpZnkgdGhlIGNvZGVcbiAgICAgKiBAcGFyYW0ge1ZlcmlmeVJlcXVlc3R9IHBhcmFtcyBBIFZlcmlmeVJlcXVlc3QgT2JqZWN0LlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8VmVyaWZ5UmVzcG9uc2U+fSBBIFByb21pc2U8VmVyaWZ5UmVzcG9uc2U+IG9iamVjdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgdmVyaWZ5KHBhcmFtczogVmVyaWZ5UmVxdWVzdCk6IFByb21pc2U8VmVyaWZ5UmVzcG9uc2U+IHtcbiAgICAgICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFZlcmlmeVJlc3BvbnNlPihBcGlVcmxzLlZFUklGWV9VUkwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW4gcHJvdmlkZXIgcmVkaXJlY3QgdXJpLlxuICAgICAqIEBwYXJhbSB7R2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlcXVlc3R9IHBhcmFtcyBBIEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXF1ZXN0IG9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT59IEEgUHJvbWlzZTxHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVzcG9uc2U+IG9iamVjdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2VuUHJvdmlkZXJSZWRpcmVjdFVyaShcbiAgICAgICAgcGFyYW1zOiBHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVxdWVzdCxcbiAgICApOiBQcm9taXNlPEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT4ge1xuICAgICAgICBsZXQgdXJsID0gYCR7QXBpVXJscy5QUk9WSURFUl9VUklfVVJMfT9jbGllbnRfaWQ9JHtcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jbGllbnRJZFxuICAgICAgICB9JnByb3ZpZGVyX2lkPSR7cGFyYW1zLnByb3ZpZGVyX2lkfSZyZWRpcmVjdF91cmk9JHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICAgICBwYXJhbXMucHJvdmlkZXJfcmVkaXJlY3RfdXJpLFxuICAgICAgICApfSZzdGF0ZT0ke3BhcmFtcy5zdGF0ZX1gO1xuICAgICAgICBjb25zdCBvdGhlcl9wYXJhbXMgPSBwYXJhbXMub3RoZXJfcGFyYW1zO1xuICAgICAgICBpZiAob3RoZXJfcGFyYW1zKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdHlwZW9mIG90aGVyX3BhcmFtcy5zaWduX291dF91cmkgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgICAgICAgb3RoZXJfcGFyYW1zLnNpZ25fb3V0X3VyaS5sZW5ndGggPiAwXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB1cmwgKz0gYCZvdGhlcl9wYXJhbXNbc2lnbl9vdXRfdXJpXT0ke290aGVyX3BhcmFtcy5zaWduX291dF91cml9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8R2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlc3BvbnNlPih1cmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdyYW50IHByb3ZpZGVyIHRva2VuLlxuICAgICAqIEBwYXJhbSB7R3JhbnRQcm92aWRlclRva2VuUmVxdWVzdH0gcGFyYW1zIEEgR3JhbnRQcm92aWRlclRva2VuUmVxdWVzdCBvYmplY3QuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxHcmFudFByb3ZpZGVyVG9rZW5SZXNwb25zZT59IEEgUHJvbWlzZTxHcmFudFByb3ZpZGVyVG9rZW5SZXNwb25zZT4gb2JqZWN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBncmFudFByb3ZpZGVyVG9rZW4oXG4gICAgICAgIHBhcmFtczogR3JhbnRQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgICApOiBQcm9taXNlPEdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlPiB7XG4gICAgICAgIHBhcmFtcy5jbGllbnRfaWQgPSB0aGlzLl9jb25maWcuY2xpZW50SWQ7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxHcmFudFByb3ZpZGVyVG9rZW5SZXNwb25zZT4oXG4gICAgICAgICAgICBBcGlVcmxzLlBST1ZJREVSX1RPS0VOX1VSTCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdyYW50IHByb3ZpZGVyIHRva2VuLlxuICAgICAqIEBwYXJhbSB7UGF0Y2hQcm92aWRlclRva2VuUmVxdWVzdH0gcGFyYW1zIEEgUGF0Y2hQcm92aWRlclRva2VuUmVxdWVzdCBvYmplY3QuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxQYXRjaFByb3ZpZGVyVG9rZW5SZXNwb25zZT59IEEgUHJvbWlzZTxQYXRjaFByb3ZpZGVyVG9rZW5SZXNwb25zZT4gb2JqZWN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBwYXRjaFByb3ZpZGVyVG9rZW4oXG4gICAgICAgIHBhcmFtczogUGF0Y2hQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgICApOiBQcm9taXNlPFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPiB7XG4gICAgICAgIHBhcmFtcy5jbGllbnRfaWQgPSB0aGlzLl9jb25maWcuY2xpZW50SWQ7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxQYXRjaFByb3ZpZGVyVG9rZW5SZXNwb25zZT4oXG4gICAgICAgICAgICBBcGlVcmxzLlBST1ZJREVSX1RPS0VOX1VSTCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgICAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaWduaW4gd2l0aCBwcm92aWRlciByZXF1ZXN0LlxuICAgICAqIEBwYXJhbSB7U2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdH0gcGFyYW1zIEEgU2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdCBvYmplY3QuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzaWduSW5XaXRoUHJvdmlkZXIoXG4gICAgICAgIHBhcmFtczogU2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgICApOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgICAgIHBhcmFtcy5jbGllbnRfaWQgPSB0aGlzLl9jb25maWcuY2xpZW50SWQ7XG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgICAgICAgIEFwaVVybHMuQVVUSF9TSUdOX0lOX1dJVEhfUFJPVklERVJfVVJMLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5zZXRDcmVkZW50aWFscyhjcmVkZW50aWFscyk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3JlZGVudGlhbHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJpbmQgd2l0aCBwcm92aWRlclxuICAgICAqIEBwYXJhbSB7QmluZFdpdGhQcm92aWRlclJlcXVlc3R9IHBhcmFtcyBBIEJpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0IG9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPHZvaWQ+fSBBIFByb21pc2U8YW55PiBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGJpbmRXaXRoUHJvdmlkZXIoXG4gICAgICAgIHBhcmFtczogQmluZFdpdGhQcm92aWRlclJlcXVlc3QsXG4gICAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHBhcmFtcy5jbGllbnRfaWQgPSB0aGlzLl9jb25maWcuY2xpZW50SWQ7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KEFwaVVybHMuUFJPVklERVJfQklORF9VUkwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHVzZXIgcHJvZmlsZS5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlPiBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdldFVzZXJQcm9maWxlKCk6IFByb21pc2U8VXNlclByb2ZpbGU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VXNlckluZm8oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHVzZXIgaW5mby5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJJbmZvPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlPiBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdldFVzZXJJbmZvKCk6IFByb21pc2U8VXNlckluZm8+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFVzZXJJbmZvPihBcGlVcmxzLlVTRVJfTUVfVVJMLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBoYXNMb2dpblN0YXRlIGNoZWNrIGlmIGhhcyBsb2dpbiBzdGF0ZVxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8Ym9vbGVhbj59IEEgUHJvbWlzZTxib29sZWFuPiBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGhhc0xvZ2luU3RhdGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuZ2V0QWNjZXNzVG9rZW4oKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhbnMgYnkgcHJvdmlkZXIuXG4gICAgICogQHBhcmFtIHtUcmFuc0J5UHJvdmlkZXJSZXF1ZXN0fSBwYXJhbXMgQSBUcmFuc0J5UHJvdmlkZXJSZXF1ZXN0IG9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHRyYW5zQnlQcm92aWRlcihcbiAgICAgICAgcGFyYW1zOiBUcmFuc0J5UHJvdmlkZXJSZXF1ZXN0LFxuICAgICk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgICAgICAgIEFwaVVybHMuVVNFUl9UUkFOU19CWV9QUk9WSURFUl9VUkwsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgICAgICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdyYW50IHRva2VuLlxuICAgICAqIEBwYXJhbSB7R3JhbnRUb2tlblJlcXVlc3R9IHBhcmFtcyBBIEdyYW50VG9rZW5SZXF1ZXN0IG9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdyYW50VG9rZW4ocGFyYW1zOiBHcmFudFRva2VuUmVxdWVzdCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICAgICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihBcGlVcmxzLkFVVEhfVE9LRU5fVVJMLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBwcm92aWRlIGxpc3QuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxVc2VyUHJvZmlsZVByb3ZpZGVyPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlUHJvdmlkZXI+IG9iamVjdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0UHJvdmlkZXJzKCk6IFByb21pc2U8VXNlclByb2ZpbGVQcm92aWRlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VXNlclByb2ZpbGVQcm92aWRlcj4oQXBpVXJscy5QUk9WSURFUl9MSVNULCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB1bmJpbmQgcHJvdmlkZXIuXG4gICAgICogQHBhcmFtIHtVbmJpbmRQcm92aWRlclJlcXVlc3R9IHBhcmFtc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgdW5iaW5kUHJvdmlkZXIocGFyYW1zOiBVbmJpbmRQcm92aWRlclJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oXG4gICAgICAgICAgICBgJHtBcGlVcmxzLlBST1ZJREVSX1VOQklORF9VUkx9LyR7cGFyYW1zLnByb3ZpZGVyX2lkfWAsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoZWNrIFBhc3N3b3JkLlxuICAgICAqIEBwYXJhbSB7Q2hlY2tQYXNzd29yZHJSZXF1ZXN0fSBwYXJhbXNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGNoZWNrUGFzc3dvcmQocGFyYW1zOiBDaGVja1Bhc3N3b3JkclJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oYCR7QXBpVXJscy5DSEVDS19QV0RfVVJMfWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGVjayBQYXNzd29yZC5cbiAgICAgKiBAcGFyYW0ge0NoZWNrUGFzc3dvcmRyUmVxdWVzdH0gcGFyYW1zXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBiaW5kUGhvbmUocGFyYW1zOiBCaW5kUGhvbmVSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KGAke0FwaVVybHMuQklORF9QSE9ORV9VUkx9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgUGFzc3dvcmQuXG4gICAgICogQHBhcmFtIHtTZXRQYXNzd29yZHJSZXF1ZXN0fSBwYXJhbXNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNldFBhc3N3b3JkKHBhcmFtczogU2V0UGFzc3dvcmRSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KGAke0FwaVVybHMuQVVUSF9TRVRfUEFTU1dPUkR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgdXNlciB2ZXJpZmljYXRpb24uXG4gICAgICogQHBhcmFtIHtHZXRWZXJpZmljYXRpb25SZXF1ZXN0fSBwYXJhbXMgQSBHZXRWZXJpZmljYXRpb25SZXF1ZXN0IE9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPn0gQSBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdldEN1clVzZXJWZXJpZmljYXRpb24oXG4gICAgICAgIHBhcmFtczogR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCxcbiAgICApOiBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiB7XG4gICAgICAgIHBhcmFtcy5jbGllbnRfaWQgPSB0aGlzLl9jb25maWcuY2xpZW50SWQ7XG4gICAgICAgIHBhcmFtcy50YXJnZXQgPSAnQ1VSX1VTRVInO1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+KFxuICAgICAgICAgICAgQXBpVXJscy5WRVJJRklDQVRJT05fVVJMLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICAgICAgICAgICAgd2l0aENhcHRjaGE6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hhbmdlIGJpbmRlZCBwcm92aWRlci5cbiAgICAgKiBAcGFyYW0ge0dldFZlcmlmaWNhdGlvblJlcXVlc3R9IHBhcmFtcyBBIEdldFZlcmlmaWNhdGlvblJlcXVlc3QgT2JqZWN0LlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+fSBBIFByb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IG9iamVjdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgY2hhbmdlQmluZGVkUHJvdmlkZXIoXG4gICAgICAgIHBhcmFtczogQ2hhbmdlQmluZGVkUHJvdmlkZXJSZXF1ZXN0LFxuICAgICk6IFByb21pc2U8Q2hhbmdlQmluZGVkUHJvdmlkZXJSZXNwb25zZT4ge1xuICAgICAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q2hhbmdlQmluZGVkUHJvdmlkZXJSZXNwb25zZT4oXG4gICAgICAgICAgICBgJHtBcGlVcmxzLlBST1ZJREVSX0xJU1R9LyR7cGFyYW1zLnByb3ZpZGVyX2lkfS90cmFuc2AsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlcl90cmFuc190b2tlbjogcGFyYW1zLnRyYW5zX3Rva2VuLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXRjaCB0aGUgdXNlciBwcm9maWxlLlxuICAgICAqIEBwYXJhbSB7VXNlclByb2ZpbGV9IHBhcmFtcyBBIFVzZXJQcm9maWxlIE9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlPiBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNldFVzZXJQcm9maWxlKHBhcmFtczogVXNlclByb2ZpbGUpOiBQcm9taXNlPFVzZXJQcm9maWxlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxVc2VyUHJvZmlsZT4oQXBpVXJscy5VU0VSX1BSSUZJTEVfVVJMLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhdGNoIHRoZSB1c2VyIHByb2ZpbGUuXG4gICAgICogQHBhcmFtIHtRdWVyeVVzZXJQcm9maWxlUmVxfSBhcHBlbmRlZF9wYXJhbXMgQSBRdWVyeVVzZXJQcm9maWxlUmVxIE9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlPiBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHF1ZXJ5VXNlclByb2ZpbGUoXG4gICAgICAgIGFwcGVuZGVkX3BhcmFtczogUXVlcnlVc2VyUHJvZmlsZVJlcSxcbiAgICApOiBQcm9taXNlPFVzZXJQcm9maWxlPiB7XG4gICAgICAgIGNvbnN0IHVybCA9IGAke0FwaVVybHMuVVNFUl9RVUVSWV9VUkx9JHthcHBlbmRlZF9wYXJhbXN9YDtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFVzZXJQcm9maWxlPih1cmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==