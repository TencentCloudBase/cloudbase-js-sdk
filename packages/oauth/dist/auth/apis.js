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
var Auth = (function () {
    function Auth(opts) {
        var request = opts.request;
        var oAuth2Client = opts.credentialsClient;
        if (!request) {
            var initOptions = {
                apiOrigin: opts.apiOrigin,
                clientId: opts.clientId,
                storage: opts.storage,
            };
            oAuth2Client = new oauth2client_1.OAuth2Client(initOptions);
            request = oAuth2Client.request.bind(oAuth2Client);
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
            var captchaMeta, credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        captchaMeta = {};
                        if (params.username.startsWith('+')) {
                            captchaMeta.phone_number = params.username;
                        }
                        else if (params.username.includes('@')) {
                            captchaMeta.email = params.username;
                        }
                        else {
                            captchaMeta.username = params.username;
                        }
                        params.client_id = this._config.clientId;
                        return [4, this._config.request(consts_1.ApiUrls.AUTH_SIGN_IN_URL, {
                                method: 'POST',
                                body: params,
                                withCaptchaMeta: captchaMeta,
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
            var captchaMeta;
            return __generator(this, function (_a) {
                captchaMeta = {};
                if (params.phone_number) {
                    captchaMeta.phone_number = params.phone_number;
                }
                else {
                    captchaMeta.email = params.email;
                }
                params.client_id = this._config.clientId;
                return [2, this._config.request(consts_1.ApiUrls.VERIFICATION_URL, {
                        method: 'POST',
                        body: params,
                        withCaptcha: true,
                        withCaptchaMeta: captchaMeta,
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
            var captchaMeta;
            return __generator(this, function (_a) {
                captchaMeta = {};
                params.client_id = this._config.clientId;
                params.target = 'CUR_USER';
                return [2, this._config.request(consts_1.ApiUrls.VERIFICATION_URL, {
                        method: 'POST',
                        body: params,
                        withCredentials: true,
                        withCaptcha: true,
                        withCaptchaMeta: captchaMeta,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRoL2FwaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFYixtQ0FBbUM7QUE4Qm5DLDZEQUE0RTtBQWM1RTtJQU1JLGNBQVksSUFBaUI7UUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMzQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLElBQUksV0FBVyxHQUFHO2dCQUNoQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO2FBQ3RCLENBQUM7WUFDRixZQUFZLEdBQUcsSUFBSSwyQkFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdDLE9BQU8sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNuRDtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDYixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLGlCQUFpQixFQUFFLFlBQVk7WUFDL0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLElBQUksNkJBQWM7U0FDeEMsQ0FBQztJQUNKLENBQUM7SUFPWSxxQkFBTSxHQUFuQixVQUFvQixNQUFxQjs7Ozs7O3dCQUNqQyxXQUFXLEdBQVEsRUFBRSxDQUFDO3dCQUM1QixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFOzRCQUNuQyxXQUFXLENBQUMsWUFBWSxHQUFHLE1BQU0s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dC9tZW1iZXItb3JkZXJpbmcgKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgQXBpVXJscyB9IGZyb20gJy4vY29uc3RzJztcbmltcG9ydCB7XG4gIEdldFZlcmlmaWNhdGlvblJlcXVlc3QsXG4gIEdldFZlcmlmaWNhdGlvblJlc3BvbnNlLFxuICBVc2VyUHJvZmlsZSxcbiAgVXNlckluZm8sXG4gIFNpZ25JblJlcXVlc3QsXG4gIFNpZ25VcFJlcXVlc3QsXG4gIFZlcmlmeVJlcXVlc3QsXG4gIFZlcmlmeVJlc3BvbnNlLFxuICBHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVxdWVzdCxcbiAgR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlc3BvbnNlLFxuICBHcmFudFByb3ZpZGVyVG9rZW5SZXF1ZXN0LFxuICBHcmFudFByb3ZpZGVyVG9rZW5SZXNwb25zZSxcbiAgUGF0Y2hQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgUGF0Y2hQcm92aWRlclRva2VuUmVzcG9uc2UsXG4gIFNpZ25JbldpdGhQcm92aWRlclJlcXVlc3QsXG4gIEJpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICBUcmFuc0J5UHJvdmlkZXJSZXF1ZXN0LFxuICBHcmFudFRva2VuUmVxdWVzdCxcbiAgVXNlclByb2ZpbGVQcm92aWRlcixcbiAgVW5iaW5kUHJvdmlkZXJSZXF1ZXN0LFxuICBDaGVja1Bhc3N3b3JkclJlcXVlc3QsXG4gIEJpbmRQaG9uZVJlcXVlc3QsXG4gIFNldFBhc3N3b3JkUmVxdWVzdCxcbiAgQ2hhbmdlQmluZGVkUHJvdmlkZXJSZXF1ZXN0LFxuICBDaGFuZ2VCaW5kZWRQcm92aWRlclJlc3BvbnNlLFxuICBRdWVyeVVzZXJQcm9maWxlUmVxLFxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBTaW1wbGVTdG9yYWdlIH0gZnJvbSAnLi4vb2F1dGgyY2xpZW50L2ludGVyZmFjZSc7XG5pbXBvcnQgeyBPQXV0aDJDbGllbnQsIGRlZmF1bHRTdG9yYWdlIH0gZnJvbSAnLi4vb2F1dGgyY2xpZW50L29hdXRoMmNsaWVudCc7XG5pbXBvcnQgeyBDcmVkZW50aWFscyB9IGZyb20gJy4uL29hdXRoMmNsaWVudC9tb2RlbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhPcHRpb25zIHtcbiAgICBhcGlPcmlnaW46IHN0cmluZztcbiAgICBjbGllbnRJZDogc3RyaW5nO1xuICAgIGNyZWRlbnRpYWxzQ2xpZW50PzogT0F1dGgyQ2xpZW50O1xuICAgIHJlcXVlc3Q/OiA8VD4odXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBhbnkpID0+IFByb21pc2U8VD47XG4gICAgc3RvcmFnZT86IFNpbXBsZVN0b3JhZ2U7XG59XG5cbi8qKlxuICogQXV0aFxuICovXG5leHBvcnQgY2xhc3MgQXV0aCB7XG4gICAgcHJpdmF0ZSBfY29uZmlnOiBBdXRoT3B0aW9ucztcbiAgICAvKipcbiAgICAgKiBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7QXV0aE9wdGlvbnN9IG9wdHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBBdXRoT3B0aW9ucykge1xuICAgICAgbGV0IHJlcXVlc3QgPSBvcHRzLnJlcXVlc3Q7XG4gICAgICBsZXQgb0F1dGgyQ2xpZW50ID0gb3B0cy5jcmVkZW50aWFsc0NsaWVudDtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICBsZXQgaW5pdE9wdGlvbnMgPSB7XG4gICAgICAgICAgYXBpT3JpZ2luOiBvcHRzLmFwaU9yaWdpbixcbiAgICAgICAgICBjbGllbnRJZDogb3B0cy5jbGllbnRJZCxcbiAgICAgICAgICBzdG9yYWdlOiBvcHRzLnN0b3JhZ2UsXG4gICAgICAgIH07XG4gICAgICAgIG9BdXRoMkNsaWVudCA9IG5ldyBPQXV0aDJDbGllbnQoaW5pdE9wdGlvbnMpO1xuICAgICAgICByZXF1ZXN0ID0gb0F1dGgyQ2xpZW50LnJlcXVlc3QuYmluZChvQXV0aDJDbGllbnQpO1xuICAgICAgfVxuICAgICAgdGhpcy5fY29uZmlnID0ge1xuICAgICAgICBhcGlPcmlnaW46IG9wdHMuYXBpT3JpZ2luLFxuICAgICAgICBjbGllbnRJZDogb3B0cy5jbGllbnRJZCxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdCxcbiAgICAgICAgY3JlZGVudGlhbHNDbGllbnQ6IG9BdXRoMkNsaWVudCxcbiAgICAgICAgc3RvcmFnZTogb3B0cy5zdG9yYWdlIHx8IGRlZmF1bHRTdG9yYWdlLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaWduIGluLlxuICAgICAqIEBwYXJhbSB7U2lnbkluUmVxdWVzdH0gcGFyYW1zIEEgU2lnbkluUmVxdWVzdCBPYmplY3QuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzaWduSW4ocGFyYW1zOiBTaWduSW5SZXF1ZXN0KTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgICAgY29uc3QgY2FwdGNoYU1ldGE6IGFueSA9IHt9O1xuICAgICAgaWYgKHBhcmFtcy51c2VybmFtZS5zdGFydHNXaXRoKCcrJykpIHtcbiAgICAgICAgY2FwdGNoYU1ldGEucGhvbmVfbnVtYmVyID0gcGFyYW1zLnVzZXJuYW1lO1xuICAgICAgfSBlbHNlIGlmIChwYXJhbXMudXNlcm5hbWUuaW5jbHVkZXMoJ0AnKSkge1xuICAgICAgICBjYXB0Y2hhTWV0YS5lbWFpbCA9IHBhcmFtcy51c2VybmFtZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhcHRjaGFNZXRhLnVzZXJuYW1lID0gcGFyYW1zLnVzZXJuYW1lO1xuICAgICAgfVxuICAgICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICAgIGNvbnN0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgICAgQXBpVXJscy5BVVRIX1NJR05fSU5fVVJMLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgICAgIHdpdGhDYXB0Y2hhTWV0YTogY2FwdGNoYU1ldGEsXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKGNyZWRlbnRpYWxzKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3JlZGVudGlhbHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNpZ24gdXAuXG4gICAgICogQHBhcmFtIHtTaWduVXBSZXF1ZXN0fSBwYXJhbXMgQSBTaWduVXBSZXF1ZXN0IE9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFzeW5jIHNpZ25VcChwYXJhbXM6IFNpZ25VcFJlcXVlc3QpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgICAgY29uc3QgZGF0YTogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICAgIEFwaVVybHMuQVVUSF9TSUdOX1VQX1VSTCxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgICBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuc2V0Q3JlZGVudGlhbHMoZGF0YSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNpZ24gb3V0LlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQSBQcm9taXNlPHZvaWQ+IG9iamVjdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc2lnbk91dCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuOiBzdHJpbmcgPSBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuZ2V0QWNjZXNzVG9rZW4oKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDx2b2lkPihBcGlVcmxzLkFVVEhfUkVWT0tFX1VSTCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIGNsaWVudF9pZDogdGhpcy5fY29uZmlnLmNsaWVudElkLFxuICAgICAgICAgIHRva2VuOiBhY2Nlc3NUb2tlbixcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdmVyaWZpY2F0aW9uLlxuICAgICAqIEBwYXJhbSB7R2V0VmVyaWZpY2F0aW9uUmVxdWVzdH0gcGFyYW1zIEEgR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCBPYmplY3QuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT59IEEgUHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4gb2JqZWN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZXRWZXJpZmljYXRpb24oXG4gICAgICBwYXJhbXM6IEdldFZlcmlmaWNhdGlvblJlcXVlc3QsXG4gICAgKTogUHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4ge1xuICAgICAgY29uc3QgY2FwdGNoYU1ldGE6IGFueSA9IHt9O1xuICAgICAgaWYgKHBhcmFtcy5waG9uZV9udW1iZXIpIHtcbiAgICAgICAgY2FwdGNoYU1ldGEucGhvbmVfbnVtYmVyID0gcGFyYW1zLnBob25lX251bWJlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhcHRjaGFNZXRhLmVtYWlsID0gcGFyYW1zLmVtYWlsO1xuICAgICAgfVxuICAgICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4oXG4gICAgICAgIEFwaVVybHMuVkVSSUZJQ0FUSU9OX1VSTCxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgICB3aXRoQ2FwdGNoYTogdHJ1ZSxcbiAgICAgICAgICB3aXRoQ2FwdGNoYU1ldGE6IGNhcHRjaGFNZXRhLFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgVmVyaWZ5IHRoZSBjb2RlXG4gICAgICogQHBhcmFtIHtWZXJpZnlSZXF1ZXN0fSBwYXJhbXMgQSBWZXJpZnlSZXF1ZXN0IE9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFZlcmlmeVJlc3BvbnNlPn0gQSBQcm9taXNlPFZlcmlmeVJlc3BvbnNlPiBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHZlcmlmeShwYXJhbXM6IFZlcmlmeVJlcXVlc3QpOiBQcm9taXNlPFZlcmlmeVJlc3BvbnNlPiB7XG4gICAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFZlcmlmeVJlc3BvbnNlPihBcGlVcmxzLlZFUklGWV9VUkwsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbiBwcm92aWRlciByZWRpcmVjdCB1cmkuXG4gICAgICogQHBhcmFtIHtHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVxdWVzdH0gcGFyYW1zIEEgR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlcXVlc3Qgb2JqZWN0LlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8R2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlc3BvbnNlPn0gQSBQcm9taXNlPEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT4gb2JqZWN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZW5Qcm92aWRlclJlZGlyZWN0VXJpKFxuICAgICAgcGFyYW1zOiBHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVxdWVzdCxcbiAgICApOiBQcm9taXNlPEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT4ge1xuICAgICAgbGV0IHVybCA9IGAke0FwaVVybHMuUFJPVklERVJfVVJJX1VSTH0/Y2xpZW50X2lkPSR7dGhpcy5fY29uZmlnLmNsaWVudElkXG4gICAgICB9JnByb3ZpZGVyX2lkPSR7cGFyYW1zLnByb3ZpZGVyX2lkfSZyZWRpcmVjdF91cmk9JHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgIHBhcmFtcy5wcm92aWRlcl9yZWRpcmVjdF91cmksXG4gICAgICApfSZzdGF0ZT0ke3BhcmFtcy5zdGF0ZX1gO1xuICAgICAgY29uc3Qgb3RoZXJfcGFyYW1zID0gcGFyYW1zLm90aGVyX3BhcmFtcztcbiAgICAgIGlmIChvdGhlcl9wYXJhbXMpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHR5cGVvZiBvdGhlcl9wYXJhbXMuc2lnbl9vdXRfdXJpID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAgICAgICAgIG90aGVyX3BhcmFtcy5zaWduX291dF91cmkubGVuZ3RoID4gMFxuICAgICAgICApIHtcbiAgICAgICAgICB1cmwgKz0gYCZvdGhlcl9wYXJhbXNbc2lnbl9vdXRfdXJpXT0ke290aGVyX3BhcmFtcy5zaWduX291dF91cml9YDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT4odXJsLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHcmFudCBwcm92aWRlciB0b2tlbi5cbiAgICAgKiBAcGFyYW0ge0dyYW50UHJvdmlkZXJUb2tlblJlcXVlc3R9IHBhcmFtcyBBIEdyYW50UHJvdmlkZXJUb2tlblJlcXVlc3Qgb2JqZWN0LlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8R3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2U+fSBBIFByb21pc2U8R3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2U+IG9iamVjdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ3JhbnRQcm92aWRlclRva2VuKFxuICAgICAgcGFyYW1zOiBHcmFudFByb3ZpZGVyVG9rZW5SZXF1ZXN0LFxuICAgICk6IFByb21pc2U8R3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2U+IHtcbiAgICAgIHBhcmFtcy5jbGllbnRfaWQgPSB0aGlzLl9jb25maWcuY2xpZW50SWQ7XG4gICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8R3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2U+KFxuICAgICAgICBBcGlVcmxzLlBST1ZJREVSX1RPS0VOX1VSTCxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR3JhbnQgcHJvdmlkZXIgdG9rZW4uXG4gICAgICogQHBhcmFtIHtQYXRjaFByb3ZpZGVyVG9rZW5SZXF1ZXN0fSBwYXJhbXMgQSBQYXRjaFByb3ZpZGVyVG9rZW5SZXF1ZXN0IG9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPn0gQSBQcm9taXNlPFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPiBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHBhdGNoUHJvdmlkZXJUb2tlbihcbiAgICAgIHBhcmFtczogUGF0Y2hQcm92aWRlclRva2VuUmVxdWVzdCxcbiAgICApOiBQcm9taXNlPFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPiB7XG4gICAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPihcbiAgICAgICAgQXBpVXJscy5QUk9WSURFUl9UT0tFTl9VUkwsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaWduaW4gd2l0aCBwcm92aWRlciByZXF1ZXN0LlxuICAgICAqIEBwYXJhbSB7U2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdH0gcGFyYW1zIEEgU2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdCBvYmplY3QuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzaWduSW5XaXRoUHJvdmlkZXIoXG4gICAgICBwYXJhbXM6IFNpZ25JbldpdGhQcm92aWRlclJlcXVlc3QsXG4gICAgKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICAgIGNvbnN0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgICAgQXBpVXJscy5BVVRIX1NJR05fSU5fV0lUSF9QUk9WSURFUl9VUkwsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKGNyZWRlbnRpYWxzKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3JlZGVudGlhbHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJpbmQgd2l0aCBwcm92aWRlclxuICAgICAqIEBwYXJhbSB7QmluZFdpdGhQcm92aWRlclJlcXVlc3R9IHBhcmFtcyBBIEJpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0IG9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPHZvaWQ+fSBBIFByb21pc2U8YW55PiBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGJpbmRXaXRoUHJvdmlkZXIoXG4gICAgICBwYXJhbXM6IEJpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICAgICk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KEFwaVVybHMuUFJPVklERVJfQklORF9VUkwsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB1c2VyIHByb2ZpbGUuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxVc2VyUHJvZmlsZT59IEEgUHJvbWlzZTxVc2VyUHJvZmlsZT4gb2JqZWN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZXRVc2VyUHJvZmlsZSgpOiBQcm9taXNlPFVzZXJQcm9maWxlPiB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRVc2VySW5mbygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdXNlciBpbmZvLlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8VXNlckluZm8+fSBBIFByb21pc2U8VXNlclByb2ZpbGU+IG9iamVjdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0VXNlckluZm8oKTogUHJvbWlzZTxVc2VySW5mbz4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFVzZXJJbmZvPihBcGlVcmxzLlVTRVJfTUVfVVJMLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYW5zIGJ5IHByb3ZpZGVyLlxuICAgICAqIEBwYXJhbSB7VHJhbnNCeVByb3ZpZGVyUmVxdWVzdH0gcGFyYW1zIEEgVHJhbnNCeVByb3ZpZGVyUmVxdWVzdCBvYmplY3QuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB0cmFuc0J5UHJvdmlkZXIoXG4gICAgICBwYXJhbXM6IFRyYW5zQnlQcm92aWRlclJlcXVlc3QsXG4gICAgKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgICAgQXBpVXJscy5VU0VSX1RSQU5TX0JZX1BST1ZJREVSX1VSTCxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHcmFudCB0b2tlbi5cbiAgICAgKiBAcGFyYW0ge0dyYW50VG9rZW5SZXF1ZXN0fSBwYXJhbXMgQSBHcmFudFRva2VuUmVxdWVzdCBvYmplY3QuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBncmFudFRva2VuKHBhcmFtczogR3JhbnRUb2tlblJlcXVlc3QpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihBcGlVcmxzLkFVVEhfVE9LRU5fVVJMLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHByb3ZpZGUgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlUHJvdmlkZXI+fSBBIFByb21pc2U8VXNlclByb2ZpbGVQcm92aWRlcj4gb2JqZWN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZXRQcm92aWRlcnMoKTogUHJvbWlzZTxVc2VyUHJvZmlsZVByb3ZpZGVyPiB7XG4gICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VXNlclByb2ZpbGVQcm92aWRlcj4oQXBpVXJscy5QUk9WSURFUl9MSVNULCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHVuYmluZCBwcm92aWRlci5cbiAgICAgKiBAcGFyYW0ge1VuYmluZFByb3ZpZGVyUmVxdWVzdH0gcGFyYW1zXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB1bmJpbmRQcm92aWRlcihwYXJhbXM6IFVuYmluZFByb3ZpZGVyUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KFxuICAgICAgICBgJHtBcGlVcmxzLlBST1ZJREVSX1VOQklORF9VUkx9LyR7cGFyYW1zLnByb3ZpZGVyX2lkfWAsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hlY2sgUGFzc3dvcmQuXG4gICAgICogQHBhcmFtIHtDaGVja1Bhc3N3b3JkclJlcXVlc3R9IHBhcmFtc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgY2hlY2tQYXNzd29yZChwYXJhbXM6IENoZWNrUGFzc3dvcmRyUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oYCR7QXBpVXJscy5DSEVDS19QV0RfVVJMfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hlY2sgUGFzc3dvcmQuXG4gICAgICogQHBhcmFtIHtDaGVja1Bhc3N3b3JkclJlcXVlc3R9IHBhcmFtc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgYmluZFBob25lKHBhcmFtczogQmluZFBob25lUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oYCR7QXBpVXJscy5CSU5EX1BIT05FX1VSTH1gLCB7XG4gICAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgUGFzc3dvcmQuXG4gICAgICogQHBhcmFtIHtTZXRQYXNzd29yZHJSZXF1ZXN0fSBwYXJhbXNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNldFBhc3N3b3JkKHBhcmFtczogU2V0UGFzc3dvcmRSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8YW55PihgJHtBcGlVcmxzLkFVVEhfU0VUX1BBU1NXT1JEfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCB1c2VyIHZlcmlmaWNhdGlvbi5cbiAgICAgKiBAcGFyYW0ge0dldFZlcmlmaWNhdGlvblJlcXVlc3R9IHBhcmFtcyBBIEdldFZlcmlmaWNhdGlvblJlcXVlc3QgT2JqZWN0LlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+fSBBIFByb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IG9iamVjdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0Q3VyVXNlclZlcmlmaWNhdGlvbihcbiAgICAgIHBhcmFtczogR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCxcbiAgICApOiBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiB7XG4gICAgICBjb25zdCBjYXB0Y2hhTWV0YTogYW55ID0ge307XG4gICAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgICAgcGFyYW1zLnRhcmdldCA9ICdDVVJfVVNFUic7XG4gICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+KFxuICAgICAgICBBcGlVcmxzLlZFUklGSUNBVElPTl9VUkwsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICAgIHdpdGhDYXB0Y2hhOiB0cnVlLFxuICAgICAgICAgIHdpdGhDYXB0Y2hhTWV0YTogY2FwdGNoYU1ldGEsXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoYW5nZSBiaW5kZWQgcHJvdmlkZXIuXG4gICAgICogQHBhcmFtIHtHZXRWZXJpZmljYXRpb25SZXF1ZXN0fSBwYXJhbXMgQSBHZXRWZXJpZmljYXRpb25SZXF1ZXN0IE9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPn0gQSBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGNoYW5nZUJpbmRlZFByb3ZpZGVyKFxuICAgICAgcGFyYW1zOiBDaGFuZ2VCaW5kZWRQcm92aWRlclJlcXVlc3QsXG4gICAgKTogUHJvbWlzZTxDaGFuZ2VCaW5kZWRQcm92aWRlclJlc3BvbnNlPiB7XG4gICAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENoYW5nZUJpbmRlZFByb3ZpZGVyUmVzcG9uc2U+KFxuICAgICAgICBgJHtBcGlVcmxzLlBST1ZJREVSX0xJU1R9LyR7cGFyYW1zLnByb3ZpZGVyX2lkfS90cmFuc2AsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBwcm92aWRlcl90cmFuc190b2tlbjogcGFyYW1zLnRyYW5zX3Rva2VuLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXRjaCB0aGUgdXNlciBwcm9maWxlLlxuICAgICAqIEBwYXJhbSB7VXNlclByb2ZpbGV9IHBhcmFtcyBBIFVzZXJQcm9maWxlIE9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlPiBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNldFVzZXJQcm9maWxlKHBhcmFtczogVXNlclByb2ZpbGUpOiBQcm9taXNlPFVzZXJQcm9maWxlPiB7XG4gICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VXNlclByb2ZpbGU+KEFwaVVybHMuVVNFUl9QUklGSUxFX1VSTCwge1xuICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGF0Y2ggdGhlIHVzZXIgcHJvZmlsZS5cbiAgICAgKiBAcGFyYW0ge1F1ZXJ5VXNlclByb2ZpbGVSZXF9IGFwcGVuZGVkX3BhcmFtcyBBIFF1ZXJ5VXNlclByb2ZpbGVSZXEgT2JqZWN0LlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8VXNlclByb2ZpbGU+fSBBIFByb21pc2U8VXNlclByb2ZpbGU+IG9iamVjdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcXVlcnlVc2VyUHJvZmlsZShcbiAgICAgIGFwcGVuZGVkX3BhcmFtczogUXVlcnlVc2VyUHJvZmlsZVJlcSxcbiAgICApOiBQcm9taXNlPFVzZXJQcm9maWxlPiB7XG4gICAgICBjb25zdCB1cmwgPSBgJHtBcGlVcmxzLlVTRVJfUVVFUllfVVJMfSR7YXBwZW5kZWRfcGFyYW1zfWA7XG4gICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VXNlclByb2ZpbGU+KHVybCwge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG59XG4iXX0=