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
exports.Auth = exports.getAuth = void 0;
var consts_1 = require("./consts");
var consts_2 = require("./consts");
Object.defineProperty(exports, "ErrorType", { enumerable: true, get: function () { return consts_2.ErrorType; } });
var oauthclient_1 = require("../oauthclient");
var captcha_1 = require("../captcha");
var internal_1 = require("../app/internal");
function getAuth(app) {
    return internal_1._getComponent(app, "auth", function () {
        var credentialsClient = oauthclient_1.getOAuthClient(app);
        var baseRequest = credentialsClient.request.bind(credentialsClient);
        var captcha = captcha_1.getCaptcha(app, { request: baseRequest });
        return new Auth({
            credentialsClient: credentialsClient,
            captcha: captcha
        });
    });
}
exports.getAuth = getAuth;
var Auth = (function () {
    function Auth(opts) {
        this.request = opts.captcha.request.bind(opts.captcha);
        this.credentialsClient = opts.credentialsClient;
    }
    Auth.prototype.signIn = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.request(consts_1.ApiUrls.AUTH_SIGN_IN_URL, {
                            method: 'POST',
                            withBasicAuth: true,
                            body: params
                        })];
                    case 1:
                        credentials = _a.sent();
                        return [4, this.credentialsClient.setCredentials(credentials)];
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
                    case 0: return [4, this.request(consts_1.ApiUrls.AUTH_SIGN_IN_ANONYMOUSLY_URL, {
                            method: 'POST',
                            withBasicAuth: true,
                            body: {}
                        })];
                    case 1:
                        credentials = _a.sent();
                        return [4, this.credentialsClient.setCredentials(credentials)];
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
                    case 0: return [4, this.request(consts_1.ApiUrls.AUTH_SIGN_UP_URL, {
                            method: 'POST',
                            withBasicAuth: true,
                            body: params,
                        })];
                    case 1:
                        data = _a.sent();
                        return [4, this.credentialsClient.setCredentials(data)];
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
                    case 0: return [4, this.credentialsClient.getAccessToken()];
                    case 1:
                        accessToken = _a.sent();
                        return [4, this.request(consts_1.ApiUrls.AUTH_REVOKE_URL, {
                                method: 'POST',
                                withBasicAuth: true,
                                body: {
                                    token: accessToken,
                                },
                            })];
                    case 2:
                        data = _a.sent();
                        return [4, this.credentialsClient.setCredentials()];
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
                return [2, this.request(consts_1.ApiUrls.VERIFICATION_URL, {
                        method: 'POST',
                        withBasicAuth: true,
                        body: params,
                        withCaptcha: true
                    })];
            });
        });
    };
    Auth.prototype.verify = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.request(consts_1.ApiUrls.VERIFY_URL, {
                        method: 'POST',
                        withBasicAuth: true,
                        body: params,
                    })];
            });
        });
    };
    Auth.prototype.genProviderRedirectUri = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, other_params;
            return __generator(this, function (_a) {
                url = consts_1.ApiUrls.PROVIDER_URI_URL + "?provider_id=" + params.provider_id + "&redirect_uri=" + encodeURIComponent(params.provider_redirect_uri) + "&state=" + params.state;
                other_params = params.other_params;
                if (other_params) {
                    if (typeof other_params.sign_out_uri === 'string' &&
                        other_params.sign_out_uri.length > 0) {
                        url += "&other_params[sign_out_uri]=" + other_params.sign_out_uri;
                    }
                }
                return [2, this.request(url, {
                        method: 'GET',
                        withBasicAuth: true,
                    })];
            });
        });
    };
    Auth.prototype.grantProviderToken = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.request(consts_1.ApiUrls.PROVIDER_TOKEN_URL, {
                        method: 'POST',
                        withBasicAuth: true,
                        body: params,
                    })];
            });
        });
    };
    Auth.prototype.patchProviderToken = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.request(consts_1.ApiUrls.PROVIDER_TOKEN_URL, {
                        method: 'PATCH',
                        withBasicAuth: true,
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
                    case 0: return [4, this.request(consts_1.ApiUrls.AUTH_SIGN_IN_WITH_PROVIDER_URL, {
                            method: 'POST',
                            withBasicAuth: true,
                            body: params,
                        })];
                    case 1:
                        credentials = _a.sent();
                        return [4, this.credentialsClient.setCredentials(credentials)];
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
                return [2, this.request(consts_1.ApiUrls.PROVIDER_BIND_URL, {
                        method: 'POST',
                        withBasicAuth: true,
                        body: params,
                        withCredentials: true,
                    })];
            });
        });
    };
    Auth.prototype.getUserProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.request(consts_1.ApiUrls.USER_ME_URL, {
                        method: 'GET',
                        withCredentials: true,
                    })];
            });
        });
    };
    Auth.prototype.updateUserProfile = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.request(consts_1.ApiUrls.USER_ME_URL, {
                        method: 'PATCH',
                        withCredentials: true,
                        body: params,
                    })];
            });
        });
    };
    Auth.prototype.hasLoginState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.credentialsClient.getAccessToken()];
                    case 1:
                        _a.sent();
                        return [2, true];
                    case 2:
                        err_1 = _a.sent();
                        if (err_1.error === oauthclient_1.ErrorType.UNAUTHENTICATED) {
                            return [2, false];
                        }
                        return [2, Promise.reject(err_1)];
                    case 3: return [2];
                }
            });
        });
    };
    Auth.prototype.transByProvider = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.request(consts_1.ApiUrls.USER_TRANS_BY_PROVIDER_URL, {
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
                return [2, this.request(consts_1.ApiUrls.AUTH_TOKEN_URL, {
                        method: 'POST',
                        withBasicAuth: true,
                        body: params,
                    })];
            });
        });
    };
    Auth.prototype.getProviders = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.request(consts_1.ApiUrls.PROVIDER_LIST, {
                        method: 'GET',
                        withCredentials: true,
                    })];
            });
        });
    };
    Auth.prototype.unbindProvider = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.request(consts_1.ApiUrls.PROVIDER_UNBIND_URL + "/" + params.provider_id, {
                        method: 'DELETE',
                        withCredentials: true,
                    })];
            });
        });
    };
    Auth.prototype.checkPassword = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.request("" + consts_1.ApiUrls.SUDO_URL, {
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
                return [2, this.request("" + consts_1.ApiUrls.BIND_CONTACT_URL, {
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
                return [2, this.request("" + consts_1.ApiUrls.AUTH_SET_PASSWORD, {
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
                return [2, this.request("" + consts_1.ApiUrls.SUDO_URL, {
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
                return [2, this.request(consts_1.ApiUrls.VERIFICATION_URL, {
                        method: 'POST',
                        body: params,
                        withCredentials: true,
                        withCaptcha: true
                    })];
            });
        });
    };
    Auth.prototype.changeBoundProvider = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.request(consts_1.ApiUrls.PROVIDER_LIST + "/" + params.provider_id + "/trans", {
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
                return [2, this.request(consts_1.ApiUrls.USER_PRIFILE_URL, {
                        method: 'PATCH',
                        body: params,
                        withCredentials: true,
                    })];
            });
        });
    };
    Auth.prototype.setCustomSignFunc = function (getTickFn) {
        this._getCustomSignTicketFn = getTickFn;
    };
    Auth.prototype.SignInWithCustomTicket = function () {
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
    Auth.prototype.queryUserProfile = function (appended_params) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = "" + consts_1.ApiUrls.USER_QUERY_URL + appended_params;
                return [2, this.request(url, {
                        method: 'GET',
                        withCredentials: true,
                    })];
            });
        });
    };
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXV0aC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUViLG1DQUFtQztBQUVuQyxtQ0FBcUM7QUFBNUIsbUdBQUEsU0FBUyxPQUFBO0FBNkJsQiw4Q0FBcUg7QUFDckgsc0NBQWlEO0FBRWpELDRDQUFnRDtBQVdoRCxTQUFnQixPQUFPLENBQUMsR0FBUTtJQUM5QixPQUFPLHdCQUFhLENBQU8sR0FBRyxFQUFFLE1BQU0sRUFBRTtRQUN0QyxJQUFNLGlCQUFpQixHQUFHLDRCQUFjLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDN0MsSUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3RFLElBQU0sT0FBTyxHQUFHLG9CQUFVLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUE7UUFDekQsT0FBTyxJQUFJLElBQUksQ0FBQztZQUNkLGlCQUFpQixFQUFFLGlCQUFpQjtZQUNwQyxPQUFPLEVBQUUsT0FBTztTQUNqQixDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFWRCwwQkFVQztBQU9EO0lBU0UsY0FBWSxJQUFpQjtRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDdEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQTtJQUNqRCxDQUFDO0lBT1kscUJBQU0sR0FBbkIsVUFBb0IsTUFBcUI7Ozs7OzRCQUNOLFdBQU0sSUFBSSxDQUFDLE9BQU8sQ0FDakQsZ0JBQU8sQ0FBQyxnQkFBZ0IsRUFD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QyxBQTljRCxJQThjQztBQTljWSxvQkFBSSIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgQXBpVXJscyB9IGZyb20gJy4vY29uc3RzJztcblxuZXhwb3J0IHsgRXJyb3JUeXBlIH0gZnJvbSAnLi9jb25zdHMnO1xuaW1wb3J0IHtcbiAgR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCxcbiAgR2V0VmVyaWZpY2F0aW9uUmVzcG9uc2UsXG4gIFVzZXJQcm9maWxlLFxuICBTaWduSW5SZXF1ZXN0LFxuICBTaWduVXBSZXF1ZXN0LFxuICBWZXJpZnlSZXF1ZXN0LFxuICBWZXJpZnlSZXNwb25zZSxcbiAgR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlcXVlc3QsXG4gIEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZSxcbiAgR3JhbnRQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgR3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2UsXG4gIFBhdGNoUHJvdmlkZXJUb2tlblJlcXVlc3QsXG4gIFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlLFxuICBTaWduSW5XaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICBCaW5kV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgVHJhbnNCeVByb3ZpZGVyUmVxdWVzdCxcbiAgR3JhbnRUb2tlblJlcXVlc3QsXG4gIFVzZXJQcm9maWxlUHJvdmlkZXIsXG4gIFVuYmluZFByb3ZpZGVyUmVxdWVzdCxcbiAgQ2hlY2tQYXNzd29yZHJSZXF1ZXN0LFxuICBCaW5kUGhvbmVSZXF1ZXN0LFxuICBTZXRQYXNzd29yZFJlcXVlc3QsXG4gIENoYW5nZUJvdW5kUHJvdmlkZXJSZXF1ZXN0LFxuICBDaGFuZ2VCb3VuZFByb3ZpZGVyUmVzcG9uc2UsXG4gIFF1ZXJ5VXNlclByb2ZpbGVSZXEsIFVwZGF0ZVBhc3N3b3JkUmVxdWVzdCwgU3Vkb1JlcXVlc3QsIFN1ZG9SZXNwb25zZSxcbn0gZnJvbSAnLi9tb2RlbHMnO1xuXG5pbXBvcnQgeyBnZXRPQXV0aENsaWVudCwgQ3JlZGVudGlhbHMsIEF1dGhDbGllbnQsIFJlc3BvbnNlRXJyb3IsIEVycm9yVHlwZSBhcyBvYXV0aEVycm9yVHlwZSB9IGZyb20gXCIuLi9vYXV0aGNsaWVudFwiO1xuaW1wb3J0IHsgZ2V0Q2FwdGNoYSwgQ2FwdGNoYSB9IGZyb20gJy4uL2NhcHRjaGEnO1xuaW1wb3J0IHsgQXBwLCBSZXF1ZXN0Rm4gYXMgYXBwUmVxdWVzdEZuIH0gZnJvbSBcIi4uL2FwcFwiO1xuaW1wb3J0IHsgX2dldENvbXBvbmVudCB9IGZyb20gXCIuLi9hcHAvaW50ZXJuYWxcIjtcblxuXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhPcHRpb25zIHtcbiAgY3JlZGVudGlhbHNDbGllbnQ6IEF1dGhDbGllbnRcbiAgY2FwdGNoYTogQ2FwdGNoYVxufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGV4aXN0aW5nIGBBdXRoYCBpbnN0YW5jZSB0aGF0IGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgYXBwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdXRoKGFwcDogQXBwKTogQXV0aCB7XG4gIHJldHVybiBfZ2V0Q29tcG9uZW50PEF1dGg+KGFwcCwgXCJhdXRoXCIsICgpOiBBdXRoID0+IHtcbiAgICBjb25zdCBjcmVkZW50aWFsc0NsaWVudCA9IGdldE9BdXRoQ2xpZW50KGFwcClcbiAgICBjb25zdCBiYXNlUmVxdWVzdCA9IGNyZWRlbnRpYWxzQ2xpZW50LnJlcXVlc3QuYmluZChjcmVkZW50aWFsc0NsaWVudCk7XG4gICAgY29uc3QgY2FwdGNoYSA9IGdldENhcHRjaGEoYXBwLCB7IHJlcXVlc3Q6IGJhc2VSZXF1ZXN0IH0pXG4gICAgcmV0dXJuIG5ldyBBdXRoKHtcbiAgICAgIGNyZWRlbnRpYWxzQ2xpZW50OiBjcmVkZW50aWFsc0NsaWVudCxcbiAgICAgIGNhcHRjaGE6IGNhcHRjaGFcbiAgICB9KVxuICB9KTtcbn1cblxuZXhwb3J0IHR5cGUgR2V0Q3VzdG9tU2lnblRpY2tldEZuID0gKCkgPT4gUHJvbWlzZTxzdHJpbmc+O1xuXG4vKipcbiAqIEF1dGhcbiAqL1xuZXhwb3J0IGNsYXNzIEF1dGgge1xuICBwdWJsaWMgcmVhZG9ubHkgcmVxdWVzdDogYXBwUmVxdWVzdEZuO1xuICBwdWJsaWMgcmVhZG9ubHkgY3JlZGVudGlhbHNDbGllbnQ6IEF1dGhDbGllbnRcbiAgcHJpdmF0ZSBfZ2V0Q3VzdG9tU2lnblRpY2tldEZuPzogR2V0Q3VzdG9tU2lnblRpY2tldEZuO1xuXG4gIC8qKlxuICAgKiBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0F1dGhPcHRpb25zfSBvcHRzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRzOiBBdXRoT3B0aW9ucykge1xuICAgIHRoaXMucmVxdWVzdCA9IG9wdHMuY2FwdGNoYS5yZXF1ZXN0LmJpbmQob3B0cy5jYXB0Y2hhKVxuICAgIHRoaXMuY3JlZGVudGlhbHNDbGllbnQgPSBvcHRzLmNyZWRlbnRpYWxzQ2xpZW50XG4gIH1cblxuICAvKipcbiAgICogU2lnbiBpbi5cbiAgICogQHBhcmFtIHtTaWduSW5SZXF1ZXN0fSBwYXJhbXMgQSBTaWduSW5SZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbihwYXJhbXM6IFNpZ25JblJlcXVlc3QpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgY29uc3QgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgIEFwaVVybHMuQVVUSF9TSUdOX0lOX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHdpdGhCYXNpY0F1dGg6IHRydWUsXG4gICAgICAgIGJvZHk6IHBhcmFtc1xuICAgICAgfSxcbiAgICApO1xuICAgIGF3YWl0IHRoaXMuY3JlZGVudGlhbHNDbGllbnQuc2V0Q3JlZGVudGlhbHMoY3JlZGVudGlhbHMpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3JlZGVudGlhbHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpZ24gaW4gQW5vbnltb3VzbHlcbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNpZ25JbkFub255bW91c2x5KCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICBjb25zdCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLnJlcXVlc3Q8Q3JlZGVudGlhbHM+KFxuICAgICAgQXBpVXJscy5BVVRIX1NJR05fSU5fQU5PTllNT1VTTFlfVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgd2l0aEJhc2ljQXV0aDogdHJ1ZSxcbiAgICAgICAgYm9keToge31cbiAgICAgIH0sXG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKGNyZWRlbnRpYWxzKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNyZWRlbnRpYWxzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaWduIHVwLlxuICAgKiBAcGFyYW0ge1NpZ25VcFJlcXVlc3R9IHBhcmFtcyBBIFNpZ25VcFJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgc2lnblVwKHBhcmFtczogU2lnblVwUmVxdWVzdCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICBjb25zdCBkYXRhOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLkFVVEhfU0lHTl9VUF9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB3aXRoQmFzaWNBdXRoOiB0cnVlLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB9LFxuICAgICk7XG4gICAgYXdhaXQgdGhpcy5jcmVkZW50aWFsc0NsaWVudC5zZXRDcmVkZW50aWFscyhkYXRhKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpZ24gb3V0LlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IEEgUHJvbWlzZTx2b2lkPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbk91dCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbjogc3RyaW5nID0gYXdhaXQgdGhpcy5jcmVkZW50aWFsc0NsaWVudC5nZXRBY2Nlc3NUb2tlbigpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnJlcXVlc3Q8dm9pZD4oQXBpVXJscy5BVVRIX1JFVk9LRV9VUkwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgd2l0aEJhc2ljQXV0aDogdHJ1ZSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgdG9rZW46IGFjY2Vzc1Rva2VuLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBhd2FpdCB0aGlzLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKCk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZlcmlmaWNhdGlvbi5cbiAgICogQHBhcmFtIHtHZXRWZXJpZmljYXRpb25SZXF1ZXN0fSBwYXJhbXMgQSBHZXRWZXJpZmljYXRpb25SZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT59IEEgUHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFZlcmlmaWNhdGlvbihcbiAgICBwYXJhbXM6IEdldFZlcmlmaWNhdGlvblJlcXVlc3QsXG4gICk6IFByb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPihcbiAgICAgIEFwaVVybHMuVkVSSUZJQ0FUSU9OX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHdpdGhCYXNpY0F1dGg6IHRydWUsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgd2l0aENhcHRjaGE6IHRydWVcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgVmVyaWZ5IHRoZSBjb2RlXG4gICAqIEBwYXJhbSB7VmVyaWZ5UmVxdWVzdH0gcGFyYW1zIEEgVmVyaWZ5UmVxdWVzdCBPYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VmVyaWZ5UmVzcG9uc2U+fSBBIFByb21pc2U8VmVyaWZ5UmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyB2ZXJpZnkocGFyYW1zOiBWZXJpZnlSZXF1ZXN0KTogUHJvbWlzZTxWZXJpZnlSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3Q8VmVyaWZ5UmVzcG9uc2U+KEFwaVVybHMuVkVSSUZZX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB3aXRoQmFzaWNBdXRoOiB0cnVlLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbiBwcm92aWRlciByZWRpcmVjdCB1cmkuXG4gICAqIEBwYXJhbSB7R2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlcXVlc3R9IHBhcmFtcyBBIEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXF1ZXN0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVzcG9uc2U+fSBBIFByb21pc2U8R2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2VuUHJvdmlkZXJSZWRpcmVjdFVyaShcbiAgICBwYXJhbXM6IEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXF1ZXN0LFxuICApOiBQcm9taXNlPEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT4ge1xuICAgIGxldCB1cmwgPSBgJHtBcGlVcmxzLlBST1ZJREVSX1VSSV9VUkx9P3Byb3ZpZGVyX2lkPSR7cGFyYW1zLnByb3ZpZGVyX2lkfSZyZWRpcmVjdF91cmk9JHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICBwYXJhbXMucHJvdmlkZXJfcmVkaXJlY3RfdXJpLFxuICAgICl9JnN0YXRlPSR7cGFyYW1zLnN0YXRlfWA7XG4gICAgY29uc3Qgb3RoZXJfcGFyYW1zID0gcGFyYW1zLm90aGVyX3BhcmFtcztcbiAgICBpZiAob3RoZXJfcGFyYW1zKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBvdGhlcl9wYXJhbXMuc2lnbl9vdXRfdXJpID09PSAnc3RyaW5nJyAmJlxuICAgICAgICBvdGhlcl9wYXJhbXMuc2lnbl9vdXRfdXJpLmxlbmd0aCA+IDBcbiAgICAgICkge1xuICAgICAgICB1cmwgKz0gYCZvdGhlcl9wYXJhbXNbc2lnbl9vdXRfdXJpXT0ke290aGVyX3BhcmFtcy5zaWduX291dF91cml9YDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdDxHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVzcG9uc2U+KHVybCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHdpdGhCYXNpY0F1dGg6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR3JhbnQgcHJvdmlkZXIgdG9rZW4uXG4gICAqIEBwYXJhbSB7R3JhbnRQcm92aWRlclRva2VuUmVxdWVzdH0gcGFyYW1zIEEgR3JhbnRQcm92aWRlclRva2VuUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8R3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2U+fSBBIFByb21pc2U8R3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBncmFudFByb3ZpZGVyVG9rZW4oXG4gICAgcGFyYW1zOiBHcmFudFByb3ZpZGVyVG9rZW5SZXF1ZXN0LFxuICApOiBQcm9taXNlPEdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdDxHcmFudFByb3ZpZGVyVG9rZW5SZXNwb25zZT4oXG4gICAgICBBcGlVcmxzLlBST1ZJREVSX1RPS0VOX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHdpdGhCYXNpY0F1dGg6IHRydWUsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHcmFudCBwcm92aWRlciB0b2tlbi5cbiAgICogQHBhcmFtIHtQYXRjaFByb3ZpZGVyVG9rZW5SZXF1ZXN0fSBwYXJhbXMgQSBQYXRjaFByb3ZpZGVyVG9rZW5SZXF1ZXN0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxQYXRjaFByb3ZpZGVyVG9rZW5SZXNwb25zZT59IEEgUHJvbWlzZTxQYXRjaFByb3ZpZGVyVG9rZW5SZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHBhdGNoUHJvdmlkZXJUb2tlbihcbiAgICBwYXJhbXM6IFBhdGNoUHJvdmlkZXJUb2tlblJlcXVlc3QsXG4gICk6IFByb21pc2U8UGF0Y2hQcm92aWRlclRva2VuUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPihcbiAgICAgIEFwaVVybHMuUFJPVklERVJfVE9LRU5fVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgIHdpdGhCYXNpY0F1dGg6IHRydWUsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaWduaW4gd2l0aCBwcm92aWRlciByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge1NpZ25JbldpdGhQcm92aWRlclJlcXVlc3R9IHBhcmFtcyBBIFNpZ25JbldpdGhQcm92aWRlclJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aFByb3ZpZGVyKFxuICAgIHBhcmFtczogU2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIGNvbnN0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLkFVVEhfU0lHTl9JTl9XSVRIX1BST1ZJREVSX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHdpdGhCYXNpY0F1dGg6IHRydWUsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIH0sXG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKGNyZWRlbnRpYWxzKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNyZWRlbnRpYWxzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIHdpdGggcHJvdmlkZXJcbiAgICogQHBhcmFtIHtCaW5kV2l0aFByb3ZpZGVyUmVxdWVzdH0gcGFyYW1zIEEgQmluZFdpdGhQcm92aWRlclJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPHZvaWQ+fSBBIFByb21pc2U8YW55PiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgYmluZFdpdGhQcm92aWRlcihcbiAgICBwYXJhbXM6IEJpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PGFueT4oQXBpVXJscy5QUk9WSURFUl9CSU5EX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB3aXRoQmFzaWNBdXRoOiB0cnVlLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdXNlciBwcm9maWxlLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0VXNlclByb2ZpbGUoKTogUHJvbWlzZTxVc2VyUHJvZmlsZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3Q8VXNlclByb2ZpbGU+KEFwaVVybHMuVVNFUl9NRV9VUkwsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB1c2VyIHByb2ZpbGUuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VXNlclByb2ZpbGU+fSBBIFByb21pc2U8VXNlclByb2ZpbGU+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyB1cGRhdGVVc2VyUHJvZmlsZShwYXJhbXM6IFVzZXJQcm9maWxlKTogUHJvbWlzZTxVc2VyUHJvZmlsZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3Q8VXNlclByb2ZpbGU+KEFwaVVybHMuVVNFUl9NRV9VUkwsIHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYXNMb2dpblN0YXRlIGNoZWNrIGlmIGhhcyBsb2dpbiBzdGF0ZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPGJvb2xlYW4+fSBBIFByb21pc2U8Ym9vbGVhbj4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGhhc0xvZ2luU3RhdGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuY3JlZGVudGlhbHNDbGllbnQuZ2V0QWNjZXNzVG9rZW4oKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmICgoZXJyIGFzIFJlc3BvbnNlRXJyb3IpLmVycm9yID09PSBvYXV0aEVycm9yVHlwZS5VTkFVVEhFTlRJQ0FURUQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFucyBieSBwcm92aWRlci5cbiAgICogQHBhcmFtIHtUcmFuc0J5UHJvdmlkZXJSZXF1ZXN0fSBwYXJhbXMgQSBUcmFuc0J5UHJvdmlkZXJSZXF1ZXN0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHRyYW5zQnlQcm92aWRlcihcbiAgICBwYXJhbXM6IFRyYW5zQnlQcm92aWRlclJlcXVlc3QsXG4gICk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgIEFwaVVybHMuVVNFUl9UUkFOU19CWV9QUk9WSURFUl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR3JhbnQgdG9rZW4uXG4gICAqIEBwYXJhbSB7R3JhbnRUb2tlblJlcXVlc3R9IHBhcmFtcyBBIEdyYW50VG9rZW5SZXF1ZXN0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdyYW50VG9rZW4ocGFyYW1zOiBHcmFudFRva2VuUmVxdWVzdCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PENyZWRlbnRpYWxzPihBcGlVcmxzLkFVVEhfVE9LRU5fVVJMLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHdpdGhCYXNpY0F1dGg6IHRydWUsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBwcm92aWRlIGxpc3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VXNlclByb2ZpbGVQcm92aWRlcj59IEEgUHJvbWlzZTxVc2VyUHJvZmlsZVByb3ZpZGVyPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0UHJvdmlkZXJzKCk6IFByb21pc2U8VXNlclByb2ZpbGVQcm92aWRlcj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3Q8VXNlclByb2ZpbGVQcm92aWRlcj4oQXBpVXJscy5QUk9WSURFUl9MSVNULCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVuYmluZCBwcm92aWRlci5cbiAgICogQHBhcmFtIHtVbmJpbmRQcm92aWRlclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdW5iaW5kUHJvdmlkZXIocGFyYW1zOiBVbmJpbmRQcm92aWRlclJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PGFueT4oXG4gICAgICBgJHtBcGlVcmxzLlBST1ZJREVSX1VOQklORF9VUkx9LyR7cGFyYW1zLnByb3ZpZGVyX2lkfWAsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayBQYXNzd29yZC5cbiAgICogQHBhcmFtIHtDaGVja1Bhc3N3b3JkclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hlY2tQYXNzd29yZChwYXJhbXM6IENoZWNrUGFzc3dvcmRyUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3Q8YW55PihgJHtBcGlVcmxzLlNVRE9fVVJMfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrIFBhc3N3b3JkLlxuICAgKiBAcGFyYW0ge0NoZWNrUGFzc3dvcmRyUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBiaW5kUGhvbmUocGFyYW1zOiBCaW5kUGhvbmVSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdDxhbnk+KGAke0FwaVVybHMuQklORF9DT05UQUNUX1VSTH1gLCB7XG4gICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFBhc3N3b3JkLlxuICAgKiBAcGFyYW0ge1NldFBhc3N3b3JkclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2V0UGFzc3dvcmQocGFyYW1zOiBTZXRQYXNzd29yZFJlcXVlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PGFueT4oYCR7QXBpVXJscy5BVVRIX1NFVF9QQVNTV09SRH1gLCB7XG4gICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlUGFzc3dvcmRCeU9sZCDkvb/nlKjml6flr4bnoIHkv67mlLnlr4bnoIHvvIzlpoLmnpzlt7Lnu4/nu5HlrprmiYvmnLrlj7fvvIzor7flhYjvvJpzdWRv77yM5YaN5L+u5pS55a+G56CBXG4gICAqIEBwYXJhbSB7U2V0UGFzc3dvcmRyUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyB1cGRhdGVQYXNzd29yZEJ5T2xkKHBhcmFtczogVXBkYXRlUGFzc3dvcmRSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3Vkb1Rva2VuID0gYXdhaXQgdGhpcy5zdWRvKHsgcGFzc3dvcmQ6IHBhcmFtcy5vbGRfcGFzc3dvcmQgfSlcbiAgICByZXR1cm4gdGhpcy5zZXRQYXNzd29yZCh7XG4gICAgICBzdWRvX3Rva2VuOiBzdWRvVG9rZW4uc3Vkb190b2tlbixcbiAgICAgIG5ld19wYXNzd29yZDogcGFyYW1zLm5ld19wYXNzd29yZCxcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIHN1ZG9cbiAgICogQHBhcmFtIHtzdWRvfSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHN1ZG8ocGFyYW1zOiBTdWRvUmVxdWVzdCk6IFByb21pc2U8U3Vkb1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdDxTdWRvUmVzcG9uc2U+KGAke0FwaVVybHMuU1VET19VUkx9YCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IHVzZXIgdmVyaWZpY2F0aW9uLlxuICAgKiBAcGFyYW0ge0dldFZlcmlmaWNhdGlvblJlcXVlc3R9IHBhcmFtcyBBIEdldFZlcmlmaWNhdGlvblJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPn0gQSBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0Q3VyVXNlclZlcmlmaWNhdGlvbihcbiAgICBwYXJhbXM6IEdldFZlcmlmaWNhdGlvblJlcXVlc3QsXG4gICk6IFByb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IHtcbiAgICBwYXJhbXMudGFyZ2V0ID0gJ0NVUl9VU0VSJztcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPihcbiAgICAgIEFwaVVybHMuVkVSSUZJQ0FUSU9OX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICB3aXRoQ2FwdGNoYTogdHJ1ZVxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIGNoYW5nZSBCb3VuZCBwcm92aWRlci5cbiAgICogQHBhcmFtIHtHZXRWZXJpZmljYXRpb25SZXF1ZXN0fSBwYXJhbXMgQSBHZXRWZXJpZmljYXRpb25SZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT59IEEgUHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNoYW5nZUJvdW5kUHJvdmlkZXIoXG4gICAgcGFyYW1zOiBDaGFuZ2VCb3VuZFByb3ZpZGVyUmVxdWVzdCxcbiAgKTogUHJvbWlzZTxDaGFuZ2VCb3VuZFByb3ZpZGVyUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PENoYW5nZUJvdW5kUHJvdmlkZXJSZXNwb25zZT4oXG4gICAgICBgJHtBcGlVcmxzLlBST1ZJREVSX0xJU1R9LyR7cGFyYW1zLnByb3ZpZGVyX2lkfS90cmFuc2AsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgcHJvdmlkZXJfdHJhbnNfdG9rZW46IHBhcmFtcy50cmFuc190b2tlbixcbiAgICAgICAgfSxcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhdGNoIHRoZSB1c2VyIHByb2ZpbGUuXG4gICAqIEBwYXJhbSB7VXNlclByb2ZpbGV9IHBhcmFtcyBBIFVzZXJQcm9maWxlIE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxVc2VyUHJvZmlsZT59IEEgUHJvbWlzZTxVc2VyUHJvZmlsZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNldFVzZXJQcm9maWxlKHBhcmFtczogVXNlclByb2ZpbGUpOiBQcm9taXNlPFVzZXJQcm9maWxlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdDxVc2VyUHJvZmlsZT4oQXBpVXJscy5VU0VSX1BSSUZJTEVfVVJMLCB7XG4gICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogc2V0Q3VzdG9tU2lnbkZ1bmMgc2V0IHRoZSBnZXQgdGlja2V0IGZ1bmN0aW9uXG4gICAqIEBwYXJhbSBnZXRUaWNrRm5cbiAgICovXG4gIHB1YmxpYyBzZXRDdXN0b21TaWduRnVuYyhnZXRUaWNrRm46IEdldEN1c3RvbVNpZ25UaWNrZXRGbikge1xuICAgIHRoaXMuX2dldEN1c3RvbVNpZ25UaWNrZXRGbiA9IGdldFRpY2tGblxuICB9XG5cbiAgLyoqXG4gICAqIFNpZ25JbldpdGhDdXN0b21UaWNrZXQgY3VzdG9tIHNpZ25JblxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIHB1YmxpYyBhc3luYyBTaWduSW5XaXRoQ3VzdG9tVGlja2V0KCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICBjb25zdCBjdXN0b21UaWNrZXQgPSBhd2FpdCB0aGlzLl9nZXRDdXN0b21TaWduVGlja2V0Rm4oKVxuICAgIHJldHVybiB0aGlzLnNpZ25JbldpdGhQcm92aWRlcih7XG4gICAgICBwcm92aWRlcl9pZDogJ2N1c3RvbScsXG4gICAgICBwcm92aWRlcl90b2tlbjogY3VzdG9tVGlja2V0XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXRjaCB0aGUgdXNlciBwcm9maWxlLlxuICAgKiBAcGFyYW0ge1F1ZXJ5VXNlclByb2ZpbGVSZXF9IGFwcGVuZGVkX3BhcmFtcyBBIFF1ZXJ5VXNlclByb2ZpbGVSZXEgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcXVlcnlVc2VyUHJvZmlsZShcbiAgICBhcHBlbmRlZF9wYXJhbXM6IFF1ZXJ5VXNlclByb2ZpbGVSZXEsXG4gICk6IFByb21pc2U8VXNlclByb2ZpbGU+IHtcbiAgICBjb25zdCB1cmwgPSBgJHtBcGlVcmxzLlVTRVJfUVVFUllfVVJMfSR7YXBwZW5kZWRfcGFyYW1zfWA7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdDxVc2VyUHJvZmlsZT4odXJsLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuICB9XG59XG4iXX0=