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
var consts_1 = require("../oauth2client/consts");
var consts_2 = require("./consts");
var oauth2client_1 = require("../oauth2client/oauth2client");
var uuid_1 = require("../utils/uuid");
var devicdIdSectionName = 'device_id';
var Auth = (function () {
    function Auth(opts) {
        this._config = {
            clientId: opts.clientId,
            request: opts.request,
            credentialsClient: opts.credentialsClient,
            storage: opts.storage || oauth2client_1.defaultStorage,
        };
    }
    Auth.prototype.setDeviceId = function (deviceId) {
        return __awaiter(this, void 0, void 0, function () {
            var error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._isDeviceIdValid(deviceId)) return [3, 2];
                        return [4, this._config.storage.setItem(devicdIdSectionName, deviceId)];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        error = {
                            error: consts_1.ErrorType.INVALID_ARGUMENT,
                            error_description: 'deviceId is invalid, deviceId must be a string of 16 to 40 characters.',
                        };
                        throw error;
                    case 3: return [2];
                }
            });
        });
    };
    Auth.prototype.getDeviceId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var deviceId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._config.storage.getItem(devicdIdSectionName)];
                    case 1:
                        deviceId = _a.sent();
                        if (!!this._isDeviceIdValid(deviceId)) return [3, 3];
                        deviceId = uuid_1.uuidv4();
                        return [4, this._config.storage.setItem(devicdIdSectionName, deviceId)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2, deviceId];
                }
            });
        });
    };
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
                        return [4, this._config.request(consts_2.ApiUrls.AUTH_SIGN_IN_URL, {
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
                        return [4, this._config.request(consts_2.ApiUrls.AUTH_SIGN_UP_URL, {
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
                        return [4, this._config.request(consts_2.ApiUrls.AUTH_REVOKE_URL, {
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
                return [2, this._config.request(consts_2.ApiUrls.VERIFICATION_URL, {
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
                return [2, this._config.request(consts_2.ApiUrls.VERIFY_URL, {
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
                url = consts_2.ApiUrls.PROVIDER_URI_URL + "?client_id=" + this._config.clientId + "&provider_id=" + params.provider_id + "&redirect_uri=" + encodeURIComponent(params.provider_redirect_uri) + "&state=" + params.state;
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
                return [2, this._config.request(consts_2.ApiUrls.PROVIDER_TOKEN_URL, {
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
                return [2, this._config.request(consts_2.ApiUrls.PROVIDER_TOKEN_URL, {
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
                        return [4, this._config.request(consts_2.ApiUrls.AUTH_SIGN_IN_WITH_PROVIDER_URL, {
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
                return [2, this._config.request(consts_2.ApiUrls.PROVIDER_BIND_URL, {
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
                return [2, this._config.request(consts_2.ApiUrls.USER_ME_URL, {
                        method: 'GET',
                        withCredentials: true,
                    })];
            });
        });
    };
    Auth.prototype.transByProvider = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request(consts_2.ApiUrls.USER_TRANS_BY_PROVIDER_URL, {
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
                return [2, this._config.request(consts_2.ApiUrls.AUTH_TOKEN_URL, {
                        method: 'POST',
                        body: params,
                    })];
            });
        });
    };
    Auth.prototype.getProviders = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request(consts_2.ApiUrls.PROVIDER_LIST, {
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
                return [2, this._config.request(consts_2.ApiUrls.PROVIDER_UNBIND_URL + "/" + params.provider_id, {
                        method: 'DELETE',
                        withCredentials: true,
                    })];
            });
        });
    };
    Auth.prototype.checkPassword = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._config.request("" + consts_2.ApiUrls.CHECK_PWD_URL, {
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
                return [2, this._config.request("" + consts_2.ApiUrls.BIND_PHONE_URL, {
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
                return [2, this._config.request("" + consts_2.ApiUrls.AUTH_SET_PASSWORD, {
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
                return [2, this._config.request(consts_2.ApiUrls.VERIFICATION_URL, {
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
                return [2, this._config.request(consts_2.ApiUrls.PROVIDER_LIST + "/" + params.provider_id + "/trans", {
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
                return [2, this._config.request(consts_2.ApiUrls.USER_PRIFILE_URL, {
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
                url = "" + consts_2.ApiUrls.USER_QUERY_URL + appended_params;
                return [2, this._config.request(url, {
                        method: 'GET',
                        withCredentials: true,
                    })];
            });
        });
    };
    Auth.prototype._isDeviceIdValid = function (deviceId) {
        return (typeof deviceId === 'string' &&
            deviceId.length >= 16 &&
            deviceId.length <= 48);
    };
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRoL2FwaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFYixpREFBaUQ7QUFFakQsbUNBQWlDO0FBOEJqQyw2REFBMEU7QUFHMUUsc0NBQXFDO0FBRXJDLElBQU0sbUJBQW1CLEdBQVcsV0FBVyxDQUFDO0FBWWhEO0lBT0UsY0FBWSxJQUFpQjtRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ2IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCO1lBQ3pDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLDZCQUFjO1NBQ3hDLENBQUM7SUFDSixDQUFDO0lBTVksMEJBQVcsR0FBeEIsVUFBeUIsUUFBZ0I7Ozs7Ozs2QkFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUEvQixjQUErQjt3QkFDakMsV0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLEVBQUE7O3dCQUFqRSxTQUFpRSxDQUFDOzs7d0JBRTVELEtBQUssR0FBa0I7NEJBQzNCLEtBQUssRUFBRSxrQkFBUyxDQUFDLGdCQUFnQjs0QkFDakMsaUJBQWlCLEVBQ2Ysd0VBQXdFO3lCQUMzRSxDQUFDO3dCQUNGLE1BQU0sS0FBSyxDQUFDOzs7OztLQUVmO0lBTVksMEJBQVcsR0FBeEI7Ozs7OzRCQUN5QixXQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FDdkQsbUJBQW1CLENBQ3BCLEVBQUE7O3dCQUZHLFFBQVEsR0FBVyxTQUV0Qjs2QkFDRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0Is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LEVBQUUsSUFBSTtxQkFDdEIsQ0FBQyxFQUFDOzs7S0FDSjtJQU1ZLCtCQUFnQixHQUE3QixVQUNFLGVBQW9DOzs7O2dCQUU5QixHQUFHLEdBQVcsS0FBRyxnQkFBTyxDQUFDLGNBQWMsR0FBRyxlQUFpQixDQUFDO2dCQUNsRSxXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFjLEdBQUcsRUFBRTt3QkFDNUMsTUFBTSxFQUFFLEtBQUs7d0JBQ2IsZUFBZSxFQUFFLElBQUk7cUJBQ3RCLENBQUMsRUFBQzs7O0tBQ0o7SUFPTywrQkFBZ0IsR0FBeEIsVUFBeUIsUUFBZ0I7UUFDdkMsT0FBTyxDQUNMLE9BQU8sUUFBUSxLQUFLLFFBQVE7WUFDNUIsUUFBUSxDQUFDLE1BQU0sSUFBSSxFQUFFO1lBQ3JCLFFBQVEsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUN0QixDQUFDO0lBQ0osQ0FBQztJQUNILFdBQUM7QUFBRCxDQUFDLEFBN2JELElBNmJDO0FBN2JZLG9CQUFJIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge0Vycm9yVHlwZX0gZnJvbSAnLi4vb2F1dGgyY2xpZW50L2NvbnN0cyc7XG5cbmltcG9ydCB7QXBpVXJsc30gZnJvbSAnLi9jb25zdHMnO1xuaW1wb3J0IHtcbiAgR2V0VmVyaWZpY2F0aW9uUmVxdWVzdCxcbiAgR2V0VmVyaWZpY2F0aW9uUmVzcG9uc2UsXG4gIFVzZXJQcm9maWxlLFxuICBVc2VySW5mbyxcbiAgU2lnbkluUmVxdWVzdCxcbiAgU2lnblVwUmVxdWVzdCxcbiAgVmVyaWZ5UmVxdWVzdCxcbiAgVmVyaWZ5UmVzcG9uc2UsXG4gIEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXF1ZXN0LFxuICBHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVzcG9uc2UsXG4gIEdyYW50UHJvdmlkZXJUb2tlblJlcXVlc3QsXG4gIEdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlLFxuICBQYXRjaFByb3ZpZGVyVG9rZW5SZXF1ZXN0LFxuICBQYXRjaFByb3ZpZGVyVG9rZW5SZXNwb25zZSxcbiAgU2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdCxcbiAgQmluZFdpdGhQcm92aWRlclJlcXVlc3QsXG4gIFRyYW5zQnlQcm92aWRlclJlcXVlc3QsXG4gIEdyYW50VG9rZW5SZXF1ZXN0LFxuICBVc2VyUHJvZmlsZVByb3ZpZGVyLFxuICBVbmJpbmRQcm92aWRlclJlcXVlc3QsXG4gIENoZWNrUGFzc3dvcmRyUmVxdWVzdCxcbiAgQmluZFBob25lUmVxdWVzdCxcbiAgU2V0UGFzc3dvcmRSZXF1ZXN0LFxuICBDaGFuZ2VCaW5kZWRQcm92aWRlclJlcXVlc3QsXG4gIENoYW5nZUJpbmRlZFByb3ZpZGVyUmVzcG9uc2UsXG4gIFF1ZXJ5VXNlclByb2ZpbGVSZXEsXG59IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7U2ltcGxlU3RvcmFnZX0gZnJvbSAnLi4vb2F1dGgyY2xpZW50L2ludGVyZmFjZSc7XG5pbXBvcnQge09BdXRoMkNsaWVudCwgZGVmYXVsdFN0b3JhZ2V9IGZyb20gJy4uL29hdXRoMmNsaWVudC9vYXV0aDJjbGllbnQnO1xuaW1wb3J0IHtDcmVkZW50aWFscywgUmVzcG9uc2VFcnJvcn0gZnJvbSAnLi4vb2F1dGgyY2xpZW50L21vZGVscyc7XG5cbmltcG9ydCB7dXVpZHY0fSBmcm9tICcuLi91dGlscy91dWlkJztcblxuY29uc3QgZGV2aWNkSWRTZWN0aW9uTmFtZTogc3RyaW5nID0gJ2RldmljZV9pZCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXV0aE9wdGlvbnMge1xuICBjbGllbnRJZDogc3RyaW5nO1xuICBjcmVkZW50aWFsc0NsaWVudDogT0F1dGgyQ2xpZW50O1xuICByZXF1ZXN0PzogPFQ+KHVybDogc3RyaW5nLCBvcHRpb25zPzogYW55KSA9PiBQcm9taXNlPFQ+O1xuICBzdG9yYWdlPzogU2ltcGxlU3RvcmFnZTtcbn1cblxuLyoqXG4gKiBBdXRoXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRoIHtcbiAgcHJpdmF0ZSBfY29uZmlnOiBBdXRoT3B0aW9ucztcblxuICAvKipcbiAgICogY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtBdXRoT3B0aW9uc30gb3B0c1xuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0czogQXV0aE9wdGlvbnMpIHtcbiAgICB0aGlzLl9jb25maWcgPSB7XG4gICAgICBjbGllbnRJZDogb3B0cy5jbGllbnRJZCxcbiAgICAgIHJlcXVlc3Q6IG9wdHMucmVxdWVzdCxcbiAgICAgIGNyZWRlbnRpYWxzQ2xpZW50OiBvcHRzLmNyZWRlbnRpYWxzQ2xpZW50LFxuICAgICAgc3RvcmFnZTogb3B0cy5zdG9yYWdlIHx8IGRlZmF1bHRTdG9yYWdlLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU2V0IGRldmljZSBpZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGRldmljZUlkIERldmljZSBpZC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZXREZXZpY2VJZChkZXZpY2VJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuX2lzRGV2aWNlSWRWYWxpZChkZXZpY2VJZCkpIHtcbiAgICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5zdG9yYWdlLnNldEl0ZW0oZGV2aWNkSWRTZWN0aW9uTmFtZSwgZGV2aWNlSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBlcnJvcjogUmVzcG9uc2VFcnJvciA9IHtcbiAgICAgICAgZXJyb3I6IEVycm9yVHlwZS5JTlZBTElEX0FSR1VNRU5ULFxuICAgICAgICBlcnJvcl9kZXNjcmlwdGlvbjpcbiAgICAgICAgICAnZGV2aWNlSWQgaXMgaW52YWxpZCwgZGV2aWNlSWQgbXVzdCBiZSBhIHN0cmluZyBvZiAxNiB0byA0MCBjaGFyYWN0ZXJzLicsXG4gICAgICB9O1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBkZXZpY2UgaWQuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8c3RyaW5nPn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXREZXZpY2VJZCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGxldCBkZXZpY2VJZDogc3RyaW5nID0gYXdhaXQgdGhpcy5fY29uZmlnLnN0b3JhZ2UuZ2V0SXRlbShcbiAgICAgIGRldmljZElkU2VjdGlvbk5hbWUsXG4gICAgKTtcbiAgICBpZiAoIXRoaXMuX2lzRGV2aWNlSWRWYWxpZChkZXZpY2VJZCkpIHtcbiAgICAgIGRldmljZUlkID0gdXVpZHY0KCk7XG4gICAgICBhd2FpdCB0aGlzLl9jb25maWcuc3RvcmFnZS5zZXRJdGVtKGRldmljZElkU2VjdGlvbk5hbWUsIGRldmljZUlkKTtcbiAgICB9XG4gICAgcmV0dXJuIGRldmljZUlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpZ24gaW4uXG4gICAqIEBwYXJhbSB7U2lnbkluUmVxdWVzdH0gcGFyYW1zIEEgU2lnbkluUmVxdWVzdCBPYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fSBBIFByb21pc2U8Q3JlZGVudGlhbHM+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduSW4ocGFyYW1zOiBTaWduSW5SZXF1ZXN0KTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIGNvbnN0IGNhcHRjaGFNZXRhOiBhbnkgPSB7fTtcbiAgICBpZiAocGFyYW1zLnVzZXJuYW1lLnN0YXJ0c1dpdGgoJysnKSkge1xuICAgICAgY2FwdGNoYU1ldGEucGhvbmVfbnVtYmVyID0gcGFyYW1zLnVzZXJuYW1lO1xuICAgIH0gZWxzZSBpZiAocGFyYW1zLnVzZXJuYW1lLmluY2x1ZGVzKCdAJykpIHtcbiAgICAgIGNhcHRjaGFNZXRhLmVtYWlsID0gcGFyYW1zLnVzZXJuYW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYXB0Y2hhTWV0YS51c2VybmFtZSA9IHBhcmFtcy51c2VybmFtZTtcbiAgICB9XG4gICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICBjb25zdCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLkFVVEhfU0lHTl9JTl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICAgIHdpdGhDYXB0Y2hhTWV0YTogY2FwdGNoYU1ldGEsXG4gICAgICB9LFxuICAgICk7XG4gICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKGNyZWRlbnRpYWxzKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNyZWRlbnRpYWxzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaWduIHVwLlxuICAgKiBAcGFyYW0ge1NpZ25VcFJlcXVlc3R9IHBhcmFtcyBBIFNpZ25VcFJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn0gQSBQcm9taXNlPENyZWRlbnRpYWxzPiBvYmplY3QuXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgc2lnblVwKHBhcmFtczogU2lnblVwUmVxdWVzdCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgIGNvbnN0IGRhdGE6IENyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fY29uZmlnLnJlcXVlc3Q8Q3JlZGVudGlhbHM+KFxuICAgICAgQXBpVXJscy5BVVRIX1NJR05fVVBfVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgfSxcbiAgICApO1xuICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5jcmVkZW50aWFsc0NsaWVudC5zZXRDcmVkZW50aWFscyhkYXRhKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpZ24gb3V0LlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IEEgUHJvbWlzZTx2b2lkPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2lnbk91dCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbjogc3RyaW5nID0gYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LmdldEFjY2Vzc1Rva2VuKCk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0PHZvaWQ+KEFwaVVybHMuQVVUSF9SRVZPS0VfVVJMLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgY2xpZW50X2lkOiB0aGlzLl9jb25maWcuY2xpZW50SWQsXG4gICAgICAgIHRva2VuOiBhY2Nlc3NUb2tlbixcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgYXdhaXQgdGhpcy5fY29uZmlnLmNyZWRlbnRpYWxzQ2xpZW50LnNldENyZWRlbnRpYWxzKCk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZlcmlmaWNhdGlvbi5cbiAgICogQHBhcmFtIHtHZXRWZXJpZmljYXRpb25SZXF1ZXN0fSBwYXJhbXMgQSBHZXRWZXJpZmljYXRpb25SZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT59IEEgUHJvbWlzZTxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFZlcmlmaWNhdGlvbihcbiAgICBwYXJhbXM6IEdldFZlcmlmaWNhdGlvblJlcXVlc3QsXG4gICk6IFByb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IHtcbiAgICBjb25zdCBjYXB0Y2hhTWV0YTogYW55ID0ge307XG4gICAgaWYgKHBhcmFtcy5waG9uZV9udW1iZXIpIHtcbiAgICAgIGNhcHRjaGFNZXRhLnBob25lX251bWJlciA9IHBhcmFtcy5waG9uZV9udW1iZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhcHRjaGFNZXRhLmVtYWlsID0gcGFyYW1zLmVtYWlsO1xuICAgIH1cbiAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxHZXRWZXJpZmljYXRpb25SZXNwb25zZT4oXG4gICAgICBBcGlVcmxzLlZFUklGSUNBVElPTl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICAgIHdpdGhDYXB0Y2hhOiB0cnVlLFxuICAgICAgICB3aXRoQ2FwdGNoYU1ldGE6IGNhcHRjaGFNZXRhLFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqICBWZXJpZnkgdGhlIGNvZGVcbiAgICogQHBhcmFtIHtWZXJpZnlSZXF1ZXN0fSBwYXJhbXMgQSBWZXJpZnlSZXF1ZXN0IE9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxWZXJpZnlSZXNwb25zZT59IEEgUHJvbWlzZTxWZXJpZnlSZXNwb25zZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHZlcmlmeShwYXJhbXM6IFZlcmlmeVJlcXVlc3QpOiBQcm9taXNlPFZlcmlmeVJlc3BvbnNlPiB7XG4gICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VmVyaWZ5UmVzcG9uc2U+KEFwaVVybHMuVkVSSUZZX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2VuIHByb3ZpZGVyIHJlZGlyZWN0IHVyaS5cbiAgICogQHBhcmFtIHtHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVxdWVzdH0gcGFyYW1zIEEgR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlcXVlc3Qgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEdlblByb3ZpZGVyUmVkaXJlY3RVcmlSZXNwb25zZT59IEEgUHJvbWlzZTxHZW5Qcm92aWRlclJlZGlyZWN0VXJpUmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZW5Qcm92aWRlclJlZGlyZWN0VXJpKFxuICAgIHBhcmFtczogR2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlcXVlc3QsXG4gICk6IFByb21pc2U8R2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlc3BvbnNlPiB7XG4gICAgbGV0IHVybDogc3RyaW5nID0gYCR7QXBpVXJscy5QUk9WSURFUl9VUklfVVJMfT9jbGllbnRfaWQ9JHtcbiAgICAgIHRoaXMuX2NvbmZpZy5jbGllbnRJZFxuICAgIH0mcHJvdmlkZXJfaWQ9JHtwYXJhbXMucHJvdmlkZXJfaWR9JnJlZGlyZWN0X3VyaT0ke2VuY29kZVVSSUNvbXBvbmVudChcbiAgICAgIHBhcmFtcy5wcm92aWRlcl9yZWRpcmVjdF91cmksXG4gICAgKX0mc3RhdGU9JHtwYXJhbXMuc3RhdGV9YDtcbiAgICBjb25zdCBvdGhlcl9wYXJhbXMgPSBwYXJhbXMub3RoZXJfcGFyYW1zO1xuICAgIGlmIChvdGhlcl9wYXJhbXMpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIG90aGVyX3BhcmFtcy5zaWduX291dF91cmkgPT09ICdzdHJpbmcnICYmXG4gICAgICAgIG90aGVyX3BhcmFtcy5zaWduX291dF91cmkubGVuZ3RoID4gMFxuICAgICAgKSB7XG4gICAgICAgIHVybCArPSBgJm90aGVyX3BhcmFtc1tzaWduX291dF91cmldPSR7b3RoZXJfcGFyYW1zLnNpZ25fb3V0X3VyaX1gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8R2VuUHJvdmlkZXJSZWRpcmVjdFVyaVJlc3BvbnNlPih1cmwsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR3JhbnQgcHJvdmlkZXIgdG9rZW4uXG4gICAqIEBwYXJhbSB7R3JhbnRQcm92aWRlclRva2VuUmVxdWVzdH0gcGFyYW1zIEEgR3JhbnRQcm92aWRlclRva2VuUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8R3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2U+fSBBIFByb21pc2U8R3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBncmFudFByb3ZpZGVyVG9rZW4oXG4gICAgcGFyYW1zOiBHcmFudFByb3ZpZGVyVG9rZW5SZXF1ZXN0LFxuICApOiBQcm9taXNlPEdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlPiB7XG4gICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8R3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2U+KFxuICAgICAgQXBpVXJscy5QUk9WSURFUl9UT0tFTl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR3JhbnQgcHJvdmlkZXIgdG9rZW4uXG4gICAqIEBwYXJhbSB7UGF0Y2hQcm92aWRlclRva2VuUmVxdWVzdH0gcGFyYW1zIEEgUGF0Y2hQcm92aWRlclRva2VuUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UGF0Y2hQcm92aWRlclRva2VuUmVzcG9uc2U+fSBBIFByb21pc2U8UGF0Y2hQcm92aWRlclRva2VuUmVzcG9uc2U+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBwYXRjaFByb3ZpZGVyVG9rZW4oXG4gICAgcGFyYW1zOiBQYXRjaFByb3ZpZGVyVG9rZW5SZXF1ZXN0LFxuICApOiBQcm9taXNlPFBhdGNoUHJvdmlkZXJUb2tlblJlc3BvbnNlPiB7XG4gICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8UGF0Y2hQcm92aWRlclRva2VuUmVzcG9uc2U+KFxuICAgICAgQXBpVXJscy5QUk9WSURFUl9UT0tFTl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpZ25pbiB3aXRoIHByb3ZpZGVyIHJlcXVlc3QuXG4gICAqIEBwYXJhbSB7U2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdH0gcGFyYW1zIEEgU2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fSBBIFByb21pc2U8Q3JlZGVudGlhbHM+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzaWduSW5XaXRoUHJvdmlkZXIoXG4gICAgcGFyYW1zOiBTaWduSW5XaXRoUHJvdmlkZXJSZXF1ZXN0LFxuICApOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICBjb25zdCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oXG4gICAgICBBcGlVcmxzLkFVVEhfU0lHTl9JTl9XSVRIX1BST1ZJREVSX1VSTCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICAgIH0sXG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLl9jb25maWcuY3JlZGVudGlhbHNDbGllbnQuc2V0Q3JlZGVudGlhbHMoY3JlZGVudGlhbHMpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3JlZGVudGlhbHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgd2l0aCBwcm92aWRlclxuICAgKiBAcGFyYW0ge0JpbmRXaXRoUHJvdmlkZXJSZXF1ZXN0fSBwYXJhbXMgQSBCaW5kV2l0aFByb3ZpZGVyUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8dm9pZD59IEEgUHJvbWlzZTxhbnk+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBiaW5kV2l0aFByb3ZpZGVyKFxuICAgIHBhcmFtczogQmluZFdpdGhQcm92aWRlclJlcXVlc3QsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHBhcmFtcy5jbGllbnRfaWQgPSB0aGlzLl9jb25maWcuY2xpZW50SWQ7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oQXBpVXJscy5QUk9WSURFUl9CSU5EX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB1c2VyIHByb2ZpbGUuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VXNlclByb2ZpbGU+fSBBIFByb21pc2U8VXNlclByb2ZpbGU+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRVc2VyUHJvZmlsZSgpOiBQcm9taXNlPFVzZXJQcm9maWxlPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VXNlckluZm8oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHVzZXIgaW5mby5cbiAgICogQHJldHVybiB7UHJvbWlzZTxVc2VySW5mbz59IEEgUHJvbWlzZTxVc2VyUHJvZmlsZT4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFVzZXJJbmZvKCk6IFByb21pc2U8VXNlckluZm8+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VXNlckluZm8+KEFwaVVybHMuVVNFUl9NRV9VUkwsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVHJhbnMgYnkgcHJvdmlkZXIuXG4gICAqIEBwYXJhbSB7VHJhbnNCeVByb3ZpZGVyUmVxdWVzdH0gcGFyYW1zIEEgVHJhbnNCeVByb3ZpZGVyUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fSBBIFByb21pc2U8Q3JlZGVudGlhbHM+IG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyB0cmFuc0J5UHJvdmlkZXIoXG4gICAgcGFyYW1zOiBUcmFuc0J5UHJvdmlkZXJSZXF1ZXN0LFxuICApOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENyZWRlbnRpYWxzPihcbiAgICAgIEFwaVVybHMuVVNFUl9UUkFOU19CWV9QUk9WSURFUl9VUkwsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR3JhbnQgdG9rZW4uXG4gICAqIEBwYXJhbSB7R3JhbnRUb2tlblJlcXVlc3R9IHBhcmFtcyBBIEdyYW50VG9rZW5SZXF1ZXN0IG9iamVjdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59IEEgUHJvbWlzZTxDcmVkZW50aWFscz4gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdyYW50VG9rZW4ocGFyYW1zOiBHcmFudFRva2VuUmVxdWVzdCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICBwYXJhbXMuY2xpZW50X2lkID0gdGhpcy5fY29uZmlnLmNsaWVudElkO1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxDcmVkZW50aWFscz4oQXBpVXJscy5BVVRIX1RPS0VOX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBwcm92aWRlIGxpc3QuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VXNlclByb2ZpbGVQcm92aWRlcj59IEEgUHJvbWlzZTxVc2VyUHJvZmlsZVByb3ZpZGVyPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0UHJvdmlkZXJzKCk6IFByb21pc2U8VXNlclByb2ZpbGVQcm92aWRlcj4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxVc2VyUHJvZmlsZVByb3ZpZGVyPihBcGlVcmxzLlBST1ZJREVSX0xJU1QsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdW5iaW5kIHByb3ZpZGVyLlxuICAgKiBAcGFyYW0ge1VuYmluZFByb3ZpZGVyUmVxdWVzdH0gcGFyYW1zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyB1bmJpbmRQcm92aWRlcihwYXJhbXM6IFVuYmluZFByb3ZpZGVyUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHBhcmFtcy5jbGllbnRfaWQgPSB0aGlzLl9jb25maWcuY2xpZW50SWQ7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oXG4gICAgICBgJHtBcGlVcmxzLlBST1ZJREVSX1VOQklORF9VUkx9LyR7cGFyYW1zLnByb3ZpZGVyX2lkfWAsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayBQYXNzd29yZC5cbiAgICogQHBhcmFtIHtDaGVja1Bhc3N3b3JkclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hlY2tQYXNzd29yZChwYXJhbXM6IENoZWNrUGFzc3dvcmRyUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KGAke0FwaVVybHMuQ0hFQ0tfUFdEX1VSTH1gLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIGJvZHk6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayBQYXNzd29yZC5cbiAgICogQHBhcmFtIHtDaGVja1Bhc3N3b3JkclJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgYmluZFBob25lKHBhcmFtczogQmluZFBob25lUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxhbnk+KGAke0FwaVVybHMuQklORF9QSE9ORV9VUkx9YCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBQYXNzd29yZC5cbiAgICogQHBhcmFtIHtTZXRQYXNzd29yZHJSZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNldFBhc3N3b3JkKHBhcmFtczogU2V0UGFzc3dvcmRSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PGFueT4oYCR7QXBpVXJscy5BVVRIX1NFVF9QQVNTV09SRH1gLCB7XG4gICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICBib2R5OiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IHVzZXIgdmVyaWZpY2F0aW9uLlxuICAgKiBAcGFyYW0ge0dldFZlcmlmaWNhdGlvblJlcXVlc3R9IHBhcmFtcyBBIEdldFZlcmlmaWNhdGlvblJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPn0gQSBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0Q3VyVXNlclZlcmlmaWNhdGlvbihcbiAgICBwYXJhbXM6IEdldFZlcmlmaWNhdGlvblJlcXVlc3QsXG4gICk6IFByb21pc2U8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+IHtcbiAgICBjb25zdCBjYXB0Y2hhTWV0YTogYW55ID0ge307XG4gICAgcGFyYW1zLmNsaWVudF9pZCA9IHRoaXMuX2NvbmZpZy5jbGllbnRJZDtcbiAgICBwYXJhbXMudGFyZ2V0ID0gJ0NVUl9VU0VSJztcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8R2V0VmVyaWZpY2F0aW9uUmVzcG9uc2U+KFxuICAgICAgQXBpVXJscy5WRVJJRklDQVRJT05fVVJMLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICAgIHdpdGhDYXB0Y2hhOiB0cnVlLFxuICAgICAgICB3aXRoQ2FwdGNoYU1ldGE6IGNhcHRjaGFNZXRhLFxuICAgICAgfSxcbiAgICApO1xuICB9XG4gIC8qKlxuICAgKiBjaGFuZ2UgYmluZGVkIHByb3ZpZGVyLlxuICAgKiBAcGFyYW0ge0dldFZlcmlmaWNhdGlvblJlcXVlc3R9IHBhcmFtcyBBIEdldFZlcmlmaWNhdGlvblJlcXVlc3QgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPn0gQSBQcm9taXNlPEdldFZlcmlmaWNhdGlvblJlc3BvbnNlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2hhbmdlQmluZGVkUHJvdmlkZXIoXG4gICAgcGFyYW1zOiBDaGFuZ2VCaW5kZWRQcm92aWRlclJlcXVlc3QsXG4gICk6IFByb21pc2U8Q2hhbmdlQmluZGVkUHJvdmlkZXJSZXNwb25zZT4ge1xuICAgIHBhcmFtcy5jbGllbnRfaWQgPSB0aGlzLl9jb25maWcuY2xpZW50SWQ7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PENoYW5nZUJpbmRlZFByb3ZpZGVyUmVzcG9uc2U+KFxuICAgICAgYCR7QXBpVXJscy5QUk9WSURFUl9MSVNUfS8ke3BhcmFtcy5wcm92aWRlcl9pZH0vdHJhbnNgLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIHByb3ZpZGVyX3RyYW5zX3Rva2VuOiBwYXJhbXMudHJhbnNfdG9rZW4sXG4gICAgICAgIH0sXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuICAvKipcbiAgICogUGF0Y2ggdGhlIHVzZXIgcHJvZmlsZS5cbiAgICogQHBhcmFtIHtVc2VyUHJvZmlsZX0gcGFyYW1zIEEgVXNlclByb2ZpbGUgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2V0VXNlclByb2ZpbGUocGFyYW1zOiBVc2VyUHJvZmlsZSk6IFByb21pc2U8VXNlclByb2ZpbGU+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VXNlclByb2ZpbGU+KEFwaVVybHMuVVNFUl9QUklGSUxFX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgYm9keTogcGFyYW1zLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiBQYXRjaCB0aGUgdXNlciBwcm9maWxlLlxuICAgKiBAcGFyYW0ge1F1ZXJ5VXNlclByb2ZpbGVSZXF9IGFwcGVuZGVkX3BhcmFtcyBBIFF1ZXJ5VXNlclByb2ZpbGVSZXEgT2JqZWN0LlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFVzZXJQcm9maWxlPn0gQSBQcm9taXNlPFVzZXJQcm9maWxlPiBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcXVlcnlVc2VyUHJvZmlsZShcbiAgICBhcHBlbmRlZF9wYXJhbXM6IFF1ZXJ5VXNlclByb2ZpbGVSZXEsXG4gICk6IFByb21pc2U8VXNlclByb2ZpbGU+IHtcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IGAke0FwaVVybHMuVVNFUl9RVUVSWV9VUkx9JHthcHBlbmRlZF9wYXJhbXN9YDtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VXNlclByb2ZpbGU+KHVybCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBpcyBkZXZpY2UgaWQgdmFsaWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkZXZpY2VJZFxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgcHJpdmF0ZSBfaXNEZXZpY2VJZFZhbGlkKGRldmljZUlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdHlwZW9mIGRldmljZUlkID09PSAnc3RyaW5nJyAmJlxuICAgICAgZGV2aWNlSWQubGVuZ3RoID49IDE2ICYmXG4gICAgICBkZXZpY2VJZC5sZW5ndGggPD0gNDhcbiAgICApO1xuICB9XG59XG4iXX0=