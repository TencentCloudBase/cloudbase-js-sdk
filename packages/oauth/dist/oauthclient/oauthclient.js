"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.OAuth2Client = exports.LocalCredentials = exports.generateRequestId = exports.toResponseError = void 0;
var consts_1 = require("./consts");
var uuid_1 = require("../utils/uuid");
var single_promise_1 = require("../utils/single-promise");
var RequestIdHeaderName = 'x-request-id';
var DeviceIdHeaderName = 'x-device-id';
var DeviceIdSectionName = 'device_';
exports.toResponseError = function (error, options) {
    var responseError;
    var formatOptions = options || {};
    if (error instanceof Error) {
        responseError = {
            error: formatOptions.error || consts_1.ErrorType.LOCAL,
            error_description: formatOptions.error_description || error.message,
            error_uri: formatOptions.error_uri,
            details: formatOptions.details || error.stack,
        };
    }
    else {
        var formatError = error || {};
        responseError = {
            error: formatOptions.error || formatError.error || consts_1.ErrorType.LOCAL,
            error_description: formatOptions.error_description || formatError.error_description,
            error_uri: formatOptions.error_uri || formatError.error_uri,
            details: formatOptions.details || formatError.details,
        };
    }
    return responseError;
};
function generateRequestId() {
    return uuid_1.uuidv4();
}
exports.generateRequestId = generateRequestId;
function isCredentialsExpired(credentials) {
    var isExpired = true;
    if (credentials && credentials.expires_at && credentials.access_token) {
        isExpired = credentials.expires_at < new Date();
    }
    return isExpired;
}
var LocalCredentials = (function () {
    function LocalCredentials(options) {
        this._credentials = null;
        this._singlePromise = new single_promise_1.SinglePromise();
        this._tokenSectionName = options.tokenSectionName;
        this._storage = options.storage;
    }
    LocalCredentials.prototype.setCredentials = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenStr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(credentials && credentials.expires_in)) return [3, 3];
                        credentials.expires_at = new Date(Date.now() + (credentials.expires_in - 30) * 1000);
                        if (!this._storage) return [3, 2];
                        tokenStr = JSON.stringify(credentials);
                        return [4, this._storage.setItem(this._tokenSectionName, tokenStr)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this._credentials = credentials;
                        return [3, 6];
                    case 3:
                        if (!this._storage) return [3, 5];
                        return [4, this._storage.removeItem(this._tokenSectionName)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this._credentials = null;
                        _a.label = 6;
                    case 6: return [2];
                }
            });
        });
    };
    LocalCredentials.prototype.getCredentials = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, this._singlePromise.run('getCredentials', function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!isCredentialsExpired(this._credentials)) return [3, 2];
                                    _a = this;
                                    return [4, this._getStorageCredentials()];
                                case 1:
                                    _a._credentials = _b.sent();
                                    _b.label = 2;
                                case 2: return [2, this._credentials];
                            }
                        });
                    }); })];
            });
        });
    };
    LocalCredentials.prototype._getStorageCredentials = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, this._singlePromise.run('_getStorageCredentials', function () { return __awaiter(_this, void 0, void 0, function () {
                        var credentials, tokenStr, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    credentials = null;
                                    return [4, this._storage.getItem(this._tokenSectionName)];
                                case 1:
                                    tokenStr = _a.sent();
                                    if (!(tokenStr !== undefined && tokenStr !== null)) return [3, 5];
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 3, , 5]);
                                    credentials = JSON.parse(tokenStr);
                                    if (credentials && credentials.expires_at) {
                                        credentials.expires_at = new Date(credentials.expires_at);
                                    }
                                    return [3, 5];
                                case 3:
                                    error_1 = _a.sent();
                                    return [4, this._storage.removeItem(this._tokenSectionName)];
                                case 4:
                                    _a.sent();
                                    credentials = null;
                                    return [3, 5];
                                case 5: return [2, credentials];
                            }
                        });
                    }); })];
            });
        });
    };
    return LocalCredentials;
}());
exports.LocalCredentials = LocalCredentials;
var OAuth2Client = (function () {
    function OAuth2Client(options) {
        this._singlePromise = new single_promise_1.SinglePromise();
        this._retry = this._formatRetry(options.retry, OAuth2Client._defaultRetry);
        this._baseRequest = options.request;
        if (!options.clientSecret) {
            options.clientSecret = "";
        }
        if (options.clientId !== '') {
            this._basicAuth = "Basic " + btoa(options.clientId + ":" + options.clientSecret);
        }
        this._tokenInURL = options.tokenInURL;
        this._headers = options.headers;
        this._storage = options.storage || defaultStorage;
        this._localCredentials = new LocalCredentials({
            tokenSectionName: 'credentials_',
            storage: this._storage,
        });
        this._refreshTokenFunc =
            options.refreshTokenFunc || this._defaultRefreshTokenFunc;
    }
    OAuth2Client.prototype.setCredentials = function (credentials) {
        return this._localCredentials.setCredentials(credentials);
    };
    OAuth2Client.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._getCredentials()];
                    case 1:
                        credentials = _a.sent();
                        if (credentials === null || credentials === void 0 ? void 0 : credentials.access_token) {
                            return [2, Promise.resolve(credentials.access_token)];
                        }
                        return [2, Promise.reject({ error: consts_1.ErrorType.UNAUTHENTICATED })];
                }
            });
        });
    };
    OAuth2Client.prototype.request = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var retry, deviceId, credentials, response, maxRequestTimes, requestTime, responseError_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options) {
                            options = {};
                        }
                        retry = this._formatRetry(options.retry, this._retry);
                        options.headers = options.headers || {};
                        if (this._headers) {
                            options.headers = __assign(__assign({}, this._headers), options.headers);
                        }
                        if (!options.headers[RequestIdHeaderName]) {
                            options.headers[RequestIdHeaderName] = generateRequestId();
                        }
                        if (!!options.headers[DeviceIdHeaderName]) return [3, 2];
                        return [4, this._getDeviceId()];
                    case 1:
                        deviceId = _a.sent();
                        options.headers[DeviceIdHeaderName] = deviceId;
                        _a.label = 2;
                    case 2:
                        if (options && options.withBasicAuth && this._basicAuth) {
                            options.headers['Authorization'] = this._basicAuth;
                        }
                        if (!(options && options.withCredentials)) return [3, 4];
                        return [4, this._getCredentials()];
                    case 3:
                        credentials = _a.sent();
                        if (credentials) {
                            if (this._tokenInURL) {
                                if (url.indexOf('?') < 0) {
                                    url += '?';
                                }
                                url += 'access_token=' + credentials.access_token;
                            }
                            else {
                                options.headers['Authorization'] =
                                    credentials.token_type + ' ' + credentials.access_token;
                            }
                        }
                        _a.label = 4;
                    case 4:
                        response = null;
                        maxRequestTimes = retry + 1;
                        requestTime = 0;
                        _a.label = 5;
                    case 5:
                        if (!(requestTime < maxRequestTimes)) return [3, 12];
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4, this._baseRequest(url, options)];
                    case 7:
                        response = _a.sent();
                        return [3, 12];
                    case 8:
                        responseError_1 = _a.sent();
                        if (requestTime === retry ||
                            !responseError_1 ||
                            responseError_1.error !== 'unreachable') {
                            return [2, Promise.reject(responseError_1)];
                        }
                        return [3, 9];
                    case 9: return [4, this._sleep(OAuth2Client._retryInterval)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        requestTime++;
                        return [3, 5];
                    case 12: return [2, response];
                }
            });
        });
    };
    OAuth2Client.prototype._checkRetry = function (retry) {
        var responseError = null;
        if (typeof retry !== 'number' ||
            retry < OAuth2Client._minRetry ||
            retry > OAuth2Client._maxRetry) {
            responseError = {
                error: consts_1.ErrorType.UNREACHABLE,
                error_description: 'wrong options param: retry',
            };
        }
        if (responseError) {
            throw responseError;
        }
        return retry;
    };
    OAuth2Client.prototype._formatRetry = function (retry, defaultVale) {
        if (typeof retry === 'undefined') {
            return defaultVale;
        }
        else {
            return this._checkRetry(retry);
        }
    };
    OAuth2Client.prototype._sleep = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve();
                        }, ms);
                    })];
            });
        });
    };
    OAuth2Client.prototype._refreshToken = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, this._singlePromise.run('_refreshToken', function () { return __awaiter(_this, void 0, void 0, function () {
                        var newCredentials, error_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!credentials || !credentials.refresh_token) {
                                        return [2, this._unAuthenticatedError('no refresh token found in credentials')];
                                    }
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 4, , 7]);
                                    return [4, this._refreshTokenFunc(credentials.refresh_token)];
                                case 2:
                                    newCredentials = _a.sent();
                                    return [4, this._localCredentials.setCredentials(newCredentials)];
                                case 3:
                                    _a.sent();
                                    return [2, newCredentials];
                                case 4:
                                    error_2 = _a.sent();
                                    if (!(error_2.error === consts_1.ErrorType.INVALID_GRANT)) return [3, 6];
                                    return [4, this._localCredentials.setCredentials(null)];
                                case 5:
                                    _a.sent();
                                    return [2, this._unAuthenticatedError(error_2.error_description)];
                                case 6: return [2, Promise.reject(error_2)];
                                case 7: return [2];
                            }
                        });
                    }); })];
            });
        });
    };
    OAuth2Client.prototype._anonymousSignIn = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, this._singlePromise.run('_anonymous', function () { return __awaiter(_this, void 0, void 0, function () {
                        var newCredentials, error_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!credentials || credentials.scope !== 'anonymous') {
                                        return [2, this._unAuthenticatedError('no anonymous in credentials')];
                                    }
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 4, , 7]);
                                    return [4, this.request('/auth/v1/signin/anonymously', {
                                            method: 'POST',
                                            withBasicAuth: true,
                                            body: {}
                                        })];
                                case 2:
                                    newCredentials = _a.sent();
                                    return [4, this._localCredentials.setCredentials(newCredentials)];
                                case 3:
                                    _a.sent();
                                    return [2, newCredentials];
                                case 4:
                                    error_3 = _a.sent();
                                    if (!(error_3.error === consts_1.ErrorType.INVALID_GRANT)) return [3, 6];
                                    return [4, this._localCredentials.setCredentials(null)];
                                case 5:
                                    _a.sent();
                                    return [2, this._unAuthenticatedError(error_3.error_description)];
                                case 6: return [2, Promise.reject(error_3)];
                                case 7: return [2];
                            }
                        });
                    }); })];
            });
        });
    };
    OAuth2Client.prototype._defaultRefreshTokenFunc = function (refreshToken) {
        if (refreshToken === undefined || refreshToken === '') {
            return this._unAuthenticatedError('refresh token not found');
        }
        return this.request('/auth/v1/token', {
            method: 'POST',
            withBasicAuth: true,
            body: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            },
        });
    };
    OAuth2Client.prototype._getCredentials = function () {
        return __awaiter(this, void 0, void 0, function () {
            var credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._localCredentials.getCredentials()];
                    case 1:
                        credentials = _a.sent();
                        if (credentials == null) {
                            return [2, this._unAuthenticatedError("credentials not found")];
                        }
                        if (!isCredentialsExpired(credentials)) return [3, 5];
                        if (!(credentials && credentials.scope === 'anonymous')) return [3, 3];
                        return [4, this._anonymousSignIn(credentials)];
                    case 2:
                        credentials = _a.sent();
                        return [3, 5];
                    case 3: return [4, this._refreshToken(credentials)];
                    case 4:
                        credentials = _a.sent();
                        _a.label = 5;
                    case 5: return [2, credentials];
                }
            });
        });
    };
    OAuth2Client.prototype._getDeviceId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var deviceId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._deviceID) {
                            return [2, this._deviceID];
                        }
                        return [4, this._storage.getItem(DeviceIdSectionName)];
                    case 1:
                        deviceId = _a.sent();
                        if (!!(typeof deviceId === 'string' &&
                            deviceId.length >= 16 &&
                            deviceId.length <= 48)) return [3, 3];
                        deviceId = uuid_1.uuidv4();
                        return [4, this._storage.setItem(DeviceIdSectionName, deviceId)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this._deviceID = deviceId;
                        return [2, deviceId];
                }
            });
        });
    };
    OAuth2Client.prototype._unAuthenticatedError = function (err) {
        return Promise.reject({
            error: consts_1.ErrorType.UNAUTHENTICATED,
            error_description: err,
        });
    };
    OAuth2Client._defaultRetry = 2;
    OAuth2Client._minRetry = 0;
    OAuth2Client._maxRetry = 5;
    OAuth2Client._retryInterval = 1000;
    return OAuth2Client;
}());
exports.OAuth2Client = OAuth2Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGhjbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvb2F1dGhjbGllbnQvb2F1dGhjbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBcUM7QUFZckMsc0NBQXVDO0FBRXZDLDBEQUF3RDtBQUV4RCxJQUFNLG1CQUFtQixHQUFHLGNBQWMsQ0FBQztBQUMzQyxJQUFNLGtCQUFrQixHQUFHLGFBQWEsQ0FBQztBQUN6QyxJQUFNLG1CQUFtQixHQUFHLFNBQVMsQ0FBQztBQVV6QixRQUFBLGVBQWUsR0FBRyxVQUM3QixLQUE0QixFQUM1QixPQUFnQztJQUVoQyxJQUFJLGFBQTRCLENBQUM7SUFDakMsSUFBTSxhQUFhLEdBQTJCLE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDNUQsSUFBSSxLQUFLLFlBQVksS0FBSyxFQUFFO1FBQzFCLGFBQWEsR0FBRztZQUNkLEtBQUssRUFBRSxhQUFhLENBQUMsS0FBSyxJQUFJLGtCQUFTLENBQUMsS0FBSztZQUM3QyxpQkFBaUIsRUFBRSxhQUFhLENBQUMsaUJBQWlCLElBQUksS0FBSyxDQUFDLE9BQU87WUFDbkUsU0FBUyxFQUFFLGFBQWEsQ0FBQyxTQUFTO1lBQ2xDLE9BQU8sRUFBRSxhQUFhLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxLQUFLO1NBQzlDLENBQUM7S0FDSDtTQUFNO1FBQ0wsSUFBTSxXQUFXLEdBQTJCLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDeEQsYUFBYSxHQUFHO1lBQ2QsS0FBSyxFQUFFLGFBQWEsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLEtBQUssSUFBSSxrQkFBUyxDQUFDLEtBQUs7WUFDbEUsaUJBQWlCLEVBQ2YsYUFBYSxDQUFDLGlCQUFpQixJQUFJLFdBQVcsQ0FBQyxpQkFBaUI7WUFDbEUsU0FBUyxFQUFFLGFBQWEsQ0FBQyxTQUFTLElBQUks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d0JBQ3RCLFFBQVEsR0FBRyxhQUFNLEVBQUUsQ0FBQzt3QkFDcEIsV0FBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsRUFBQTs7d0JBQTFELFNBQTBELENBQUM7Ozt3QkFFN0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7d0JBQzFCLFdBQU8sUUFBUSxFQUFDOzs7O0tBQ2pCO0lBT08sNENBQXFCLEdBQTdCLFVBQWlDLEdBQVk7UUFDM0MsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3BCLEtBQUssRUFBRSxrQkFBUyxDQUFDLGVBQWU7WUFDaEMsaUJBQWlCLEVBQUUsR0FBRztTQUNOLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBN1NjLDBCQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLHNCQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2Qsc0JBQVMsR0FBRyxDQUFDLENBQUM7SUFDZCwyQkFBYyxHQUFHLElBQUksQ0FBQztJQTJTdkMsbUJBQUM7Q0FBQSxBQS9TRCxJQStTQztBQS9TWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVycm9yVHlwZSB9IGZyb20gJy4vY29uc3RzJztcblxuaW1wb3J0IHsgQXV0aENsaWVudCB9IGZyb20gJy4vaW50ZXJmYWNlJztcbmltcG9ydCB7IFJlcXVlc3RGbiwgU3RvcmFnZSB9IGZyb20gXCIuLi9hcHBcIjtcblxuaW1wb3J0IHtcbiAgQ3JlZGVudGlhbHMsXG4gIFJlc3BvbnNlRXJyb3IsXG4gIE9BdXRoMkNsaWVudE9wdGlvbnMsXG4gIEF1dGhDbGllbnRSZXF1ZXN0T3B0aW9ucyxcbn0gZnJvbSAnLi9tb2RlbHMnO1xuXG5pbXBvcnQgeyB1dWlkdjQgfSBmcm9tICcuLi91dGlscy91dWlkJztcblxuaW1wb3J0IHsgU2luZ2xlUHJvbWlzZSB9IGZyb20gJy4uL3V0aWxzL3NpbmdsZS1wcm9taXNlJztcblxuY29uc3QgUmVxdWVzdElkSGVhZGVyTmFtZSA9ICd4LXJlcXVlc3QtaWQnO1xuY29uc3QgRGV2aWNlSWRIZWFkZXJOYW1lID0gJ3gtZGV2aWNlLWlkJztcbmNvbnN0IERldmljZUlkU2VjdGlvbk5hbWUgPSAnZGV2aWNlXyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9SZXNwb25zZUVycm9yT3B0aW9ucyB7XG4gIGVycm9yPzogRXJyb3JUeXBlO1xuICBlcnJvcl9kZXNjcmlwdGlvbj86IHN0cmluZyB8IG51bGw7XG4gIGVycm9yX3VyaT86IHN0cmluZyB8IG51bGw7XG4gIGRldGFpbHM/OiBhbnkgfCBudWxsO1xufVxuXG5cbmV4cG9ydCBjb25zdCB0b1Jlc3BvbnNlRXJyb3IgPSAoXG4gIGVycm9yOiBSZXNwb25zZUVycm9yIHwgRXJyb3IsXG4gIG9wdGlvbnM/OiBUb1Jlc3BvbnNlRXJyb3JPcHRpb25zLFxuKTogUmVzcG9uc2VFcnJvciA9PiB7XG4gIGxldCByZXNwb25zZUVycm9yOiBSZXNwb25zZUVycm9yO1xuICBjb25zdCBmb3JtYXRPcHRpb25zOiBUb1Jlc3BvbnNlRXJyb3JPcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICByZXNwb25zZUVycm9yID0ge1xuICAgICAgZXJyb3I6IGZvcm1hdE9wdGlvbnMuZXJyb3IgfHwgRXJyb3JUeXBlLkxPQ0FMLFxuICAgICAgZXJyb3JfZGVzY3JpcHRpb246IGZvcm1hdE9wdGlvbnMuZXJyb3JfZGVzY3JpcHRpb24gfHwgZXJyb3IubWVzc2FnZSxcbiAgICAgIGVycm9yX3VyaTogZm9ybWF0T3B0aW9ucy5lcnJvcl91cmksXG4gICAgICBkZXRhaWxzOiBmb3JtYXRPcHRpb25zLmRldGFpbHMgfHwgZXJyb3Iuc3RhY2ssXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBmb3JtYXRFcnJvcjogVG9SZXNwb25zZUVycm9yT3B0aW9ucyA9IGVycm9yIHx8IHt9O1xuICAgIHJlc3BvbnNlRXJyb3IgPSB7XG4gICAgICBlcnJvcjogZm9ybWF0T3B0aW9ucy5lcnJvciB8fCBmb3JtYXRFcnJvci5lcnJvciB8fCBFcnJvclR5cGUuTE9DQUwsXG4gICAgICBlcnJvcl9kZXNjcmlwdGlvbjpcbiAgICAgICAgZm9ybWF0T3B0aW9ucy5lcnJvcl9kZXNjcmlwdGlvbiB8fCBmb3JtYXRFcnJvci5lcnJvcl9kZXNjcmlwdGlvbixcbiAgICAgIGVycm9yX3VyaTogZm9ybWF0T3B0aW9ucy5lcnJvcl91cmkgfHwgZm9ybWF0RXJyb3IuZXJyb3JfdXJpLFxuICAgICAgZGV0YWlsczogZm9ybWF0T3B0aW9ucy5kZXRhaWxzIHx8IGZvcm1hdEVycm9yLmRldGFpbHMsXG4gICAgfTtcbiAgfVxuICByZXR1cm4gcmVzcG9uc2VFcnJvcjtcbn07XG5cbi8qKlxuICogR2VuZXJhdGUgcmVxdWVzdCBpZC5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUmVxdWVzdElkKCk6IHN0cmluZyB7XG4gIHJldHVybiB1dWlkdjQoKTtcbn1cblxuXG5pbnRlcmZhY2UgTG9jYWxDcmVkZW50aWFsc09wdGlvbnMge1xuICB0b2tlblNlY3Rpb25OYW1lOiBzdHJpbmc7XG4gIHN0b3JhZ2U6IFN0b3JhZ2U7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgY3JlZGVudGlhbHMgaXMgZXhwaXJlZC5cbiAqIEBwYXJhbSB7Q3JlZGVudGlhbHN9IGNyZWRlbnRpYWxzXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0NyZWRlbnRpYWxzRXhwaXJlZChjcmVkZW50aWFsczogQ3JlZGVudGlhbHMpOiBib29sZWFuIHtcbiAgbGV0IGlzRXhwaXJlZCA9IHRydWU7XG4gIGlmIChjcmVkZW50aWFscyAmJiBjcmVkZW50aWFscy5leHBpcmVzX2F0ICYmIGNyZWRlbnRpYWxzLmFjY2Vzc190b2tlbikge1xuICAgIGlzRXhwaXJlZCA9IGNyZWRlbnRpYWxzLmV4cGlyZXNfYXQgPCBuZXcgRGF0ZSgpO1xuICB9XG4gIHJldHVybiBpc0V4cGlyZWQ7XG59XG5cbi8qKlxuICogTG9jYWwgY3JlZGVudGlhbHMuXG4gKiBMb2NhbCBjcmVkZW50aWFscywgd2l0aCBtZW1vcnkgY2FjaGUgYW5kIHN0b3JhZ2UgY2FjaGUuXG4gKiBJZiB0aGUgbWVtb3J5IGNhY2hlIGV4cGlyZXMsIHRoZSBzdG9yYWdlIGNhY2hlIGlzIGF1dG9tYXRpY2FsbHkgbG9hZGVkLlxuICovXG5leHBvcnQgY2xhc3MgTG9jYWxDcmVkZW50aWFscyB7XG4gIHByaXZhdGUgX3Rva2VuU2VjdGlvbk5hbWU6IHN0cmluZztcblxuICBwcml2YXRlIF9zdG9yYWdlOiBTdG9yYWdlO1xuXG4gIHByaXZhdGUgX2NyZWRlbnRpYWxzOiBDcmVkZW50aWFscyB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgX3NpbmdsZVByb21pc2U6IFNpbmdsZVByb21pc2UgPSBuZXcgU2luZ2xlUHJvbWlzZSgpO1xuXG4gIC8qKlxuICAgKiBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0xvY2FsQ3JlZGVudGlhbHNPcHRpb25zfSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBMb2NhbENyZWRlbnRpYWxzT3B0aW9ucykge1xuICAgIHRoaXMuX3Rva2VuU2VjdGlvbk5hbWUgPSBvcHRpb25zLnRva2VuU2VjdGlvbk5hbWU7XG4gICAgdGhpcy5fc3RvcmFnZSA9IG9wdGlvbnMuc3RvcmFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRDcmVkZW50aWFscyBQcm92aWRlcyBhbiBhbHRlcm5hdGl2ZSBmZXRjaCBhcGkgcmVxdWVzdCBpbXBsZW1lbnRhdGlvbiB3aXRoIGF1dGggY3JlZGVudGlhbHNcbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZGVudGlhbHNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZXRDcmVkZW50aWFscyhjcmVkZW50aWFscz86IENyZWRlbnRpYWxzKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGNyZWRlbnRpYWxzICYmIGNyZWRlbnRpYWxzLmV4cGlyZXNfaW4pIHtcbiAgICAgIGNyZWRlbnRpYWxzLmV4cGlyZXNfYXQgPSBuZXcgRGF0ZShcbiAgICAgICAgRGF0ZS5ub3coKSArIChjcmVkZW50aWFscy5leHBpcmVzX2luIC0gMzApICogMTAwMCxcbiAgICAgICk7XG4gICAgICBpZiAodGhpcy5fc3RvcmFnZSkge1xuICAgICAgICBjb25zdCB0b2tlblN0cjogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoY3JlZGVudGlhbHMpO1xuICAgICAgICBhd2FpdCB0aGlzLl9zdG9yYWdlLnNldEl0ZW0odGhpcy5fdG9rZW5TZWN0aW9uTmFtZSwgdG9rZW5TdHIpO1xuICAgICAgfVxuICAgICAgdGhpcy5fY3JlZGVudGlhbHMgPSBjcmVkZW50aWFscztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX3N0b3JhZ2UpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fc3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuX3Rva2VuU2VjdGlvbk5hbWUpO1xuICAgICAgfVxuICAgICAgdGhpcy5fY3JlZGVudGlhbHMgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY3JlZGVudGlhbHMuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHMgfCBudWxsPn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRDcmVkZW50aWFscygpOiBQcm9taXNlPENyZWRlbnRpYWxzIHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9zaW5nbGVQcm9taXNlLnJ1bignZ2V0Q3JlZGVudGlhbHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoaXNDcmVkZW50aWFsc0V4cGlyZWQodGhpcy5fY3JlZGVudGlhbHMpKSB7XG4gICAgICAgIHRoaXMuX2NyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fZ2V0U3RvcmFnZUNyZWRlbnRpYWxzKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5fY3JlZGVudGlhbHM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHN0b3JhZ2UgY3JlZGVudGlhbHMuXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9nZXRTdG9yYWdlQ3JlZGVudGlhbHMoKTogUHJvbWlzZTxDcmVkZW50aWFscyB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fc2luZ2xlUHJvbWlzZS5ydW4oJ19nZXRTdG9yYWdlQ3JlZGVudGlhbHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzID0gbnVsbDtcbiAgICAgIGNvbnN0IHRva2VuU3RyOiBzdHJpbmcgPSBhd2FpdCB0aGlzLl9zdG9yYWdlLmdldEl0ZW0oXG4gICAgICAgIHRoaXMuX3Rva2VuU2VjdGlvbk5hbWUsXG4gICAgICApO1xuICAgICAgaWYgKHRva2VuU3RyICE9PSB1bmRlZmluZWQgJiYgdG9rZW5TdHIgIT09IG51bGwpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjcmVkZW50aWFscyA9IEpTT04ucGFyc2UodG9rZW5TdHIpO1xuICAgICAgICAgIGlmIChjcmVkZW50aWFscyAmJiBjcmVkZW50aWFscy5leHBpcmVzX2F0KSB7XG4gICAgICAgICAgICBjcmVkZW50aWFscy5leHBpcmVzX2F0ID0gbmV3IERhdGUoY3JlZGVudGlhbHMuZXhwaXJlc19hdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX3N0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLl90b2tlblNlY3Rpb25OYW1lKTtcbiAgICAgICAgICBjcmVkZW50aWFscyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjcmVkZW50aWFscztcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIE9BdXRoMkNsaWVudFxuICovXG5leHBvcnQgY2xhc3MgT0F1dGgyQ2xpZW50IGltcGxlbWVudHMgQXV0aENsaWVudCB7XG4gIHByaXZhdGUgc3RhdGljIF9kZWZhdWx0UmV0cnkgPSAyO1xuICBwcml2YXRlIHN0YXRpYyBfbWluUmV0cnkgPSAwO1xuICBwcml2YXRlIHN0YXRpYyBfbWF4UmV0cnkgPSA1O1xuICBwcml2YXRlIHN0YXRpYyBfcmV0cnlJbnRlcnZhbCA9IDEwMDA7XG4gIHByaXZhdGUgX3JldHJ5OiBudW1iZXI7XG4gIHByaXZhdGUgX2Jhc2VSZXF1ZXN0OiBSZXF1ZXN0Rm47XG4gIHByaXZhdGUgX2Jhc2ljQXV0aD86IHN0cmluZztcbiAgcHJpdmF0ZSBfbG9jYWxDcmVkZW50aWFsczogTG9jYWxDcmVkZW50aWFscztcbiAgcHJpdmF0ZSBfc3RvcmFnZTogU3RvcmFnZTtcbiAgcHJpdmF0ZSBfZGV2aWNlSUQ/OiBzdHJpbmc7XG4gIHByaXZhdGUgX3Rva2VuSW5VUkw/OiBib29sZWFuO1xuICBwcml2YXRlIF9yZWZyZXNoVG9rZW5GdW5jOiAocmVmcmVzaFRva2VuPzogc3RyaW5nKSA9PiBQcm9taXNlPENyZWRlbnRpYWxzPjtcbiAgcHJpdmF0ZSBfaGVhZGVycz86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG4gIHByaXZhdGUgX3NpbmdsZVByb21pc2U6IFNpbmdsZVByb21pc2UgPSBuZXcgU2luZ2xlUHJvbWlzZSgpO1xuXG4gIC8qKlxuICAgKiBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09BdXRoMkNsaWVudE9wdGlvbnN9IG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9BdXRoMkNsaWVudE9wdGlvbnMpIHtcbiAgICB0aGlzLl9yZXRyeSA9IHRoaXMuX2Zvcm1hdFJldHJ5KG9wdGlvbnMucmV0cnksIE9BdXRoMkNsaWVudC5fZGVmYXVsdFJldHJ5KTtcbiAgICB0aGlzLl9iYXNlUmVxdWVzdCA9IG9wdGlvbnMucmVxdWVzdFxuICAgIGlmICghb3B0aW9ucy5jbGllbnRTZWNyZXQpIHtcbiAgICAgIG9wdGlvbnMuY2xpZW50U2VjcmV0ID0gXCJcIlxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5jbGllbnRJZCAhPT0gJycpIHtcbiAgICAgIHRoaXMuX2Jhc2ljQXV0aCA9IFwiQmFzaWMgXCIgKyBidG9hKG9wdGlvbnMuY2xpZW50SWQgKyBcIjpcIiArIG9wdGlvbnMuY2xpZW50U2VjcmV0KTtcbiAgICB9XG4gICAgdGhpcy5fdG9rZW5JblVSTCA9IG9wdGlvbnMudG9rZW5JblVSTDtcbiAgICB0aGlzLl9oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLl9zdG9yYWdlID0gb3B0aW9ucy5zdG9yYWdlIHx8IGRlZmF1bHRTdG9yYWdlO1xuICAgIHRoaXMuX2xvY2FsQ3JlZGVudGlhbHMgPSBuZXcgTG9jYWxDcmVkZW50aWFscyh7XG4gICAgICB0b2tlblNlY3Rpb25OYW1lOiAnY3JlZGVudGlhbHNfJyxcbiAgICAgIHN0b3JhZ2U6IHRoaXMuX3N0b3JhZ2UsXG4gICAgfSk7XG4gICAgdGhpcy5fcmVmcmVzaFRva2VuRnVuYyA9XG4gICAgICBvcHRpb25zLnJlZnJlc2hUb2tlbkZ1bmMgfHwgdGhpcy5fZGVmYXVsdFJlZnJlc2hUb2tlbkZ1bmM7XG4gIH1cblxuICAvKipcbiAgICogc2V0Q3JlZGVudGlhbHMgUHJvdmlkZXMgYW4gYWx0ZXJuYXRpdmUgZmV0Y2ggYXBpIHJlcXVlc3QgaW1wbGVtZW50YXRpb24gd2l0aCBhdXRoIGNyZWRlbnRpYWxzXG4gICAqIEBwYXJhbSB7Q3JlZGVudGlhbHN9IGNyZWRlbnRpYWxzXG4gICAqIEByZXR1cm4ge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBwdWJsaWMgc2V0Q3JlZGVudGlhbHMoY3JlZGVudGlhbHM/OiBDcmVkZW50aWFscyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9sb2NhbENyZWRlbnRpYWxzLnNldENyZWRlbnRpYWxzKGNyZWRlbnRpYWxzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXRBY2Nlc3NUb2tlbiByZXR1cm4gYSB2YWxpZGF0ZSBhY2Nlc3MgdG9rZW5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRBY2Nlc3NUb2tlbigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2dldENyZWRlbnRpYWxzKCk7XG4gICAgaWYgKGNyZWRlbnRpYWxzPy5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3JlZGVudGlhbHMuYWNjZXNzX3Rva2VuKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHsgZXJyb3I6IEVycm9yVHlwZS5VTkFVVEhFTlRJQ0FURUQgfSBhcyBSZXNwb25zZUVycm9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXF1ZXN0IGh0dHAgbGlrZSBzaW1wbGUgZmV0Y2ggYXBpLCBleHA6cmVxdWVzdCgnL3YxL3VzZXIvbWUnLCB7d2l0aENyZWRlbnRpYWxzOnRydWV9KVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqIEBwYXJhbSB7QXV0aENsaWVudFJlcXVlc3RPcHRpb25zfSBvcHRpb25zXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcmVxdWVzdDxUPihcbiAgICB1cmw6IHN0cmluZyxcbiAgICBvcHRpb25zPzogQXV0aENsaWVudFJlcXVlc3RPcHRpb25zLFxuICApOiBQcm9taXNlPFQ+IHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgY29uc3QgcmV0cnk6IG51bWJlciA9IHRoaXMuX2Zvcm1hdFJldHJ5KG9wdGlvbnMucmV0cnksIHRoaXMuX3JldHJ5KTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwge307XG4gICAgaWYgKHRoaXMuX2hlYWRlcnMpIHtcbiAgICAgIG9wdGlvbnMuaGVhZGVycyA9IHtcbiAgICAgICAgLi4udGhpcy5faGVhZGVycyxcbiAgICAgICAgLi4ub3B0aW9ucy5oZWFkZXJzLFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zLmhlYWRlcnNbUmVxdWVzdElkSGVhZGVyTmFtZV0pIHtcbiAgICAgIG9wdGlvbnMuaGVhZGVyc1tSZXF1ZXN0SWRIZWFkZXJOYW1lXSA9IGdlbmVyYXRlUmVxdWVzdElkKCk7XG4gICAgfVxuICAgIGlmICghb3B0aW9ucy5oZWFkZXJzW0RldmljZUlkSGVhZGVyTmFtZV0pIHtcbiAgICAgIGNvbnN0IGRldmljZUlkID0gYXdhaXQgdGhpcy5fZ2V0RGV2aWNlSWQoKTtcbiAgICAgIG9wdGlvbnMuaGVhZGVyc1tEZXZpY2VJZEhlYWRlck5hbWVdID0gZGV2aWNlSWQ7XG4gICAgfVxuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMud2l0aEJhc2ljQXV0aCAmJiB0aGlzLl9iYXNpY0F1dGgpIHtcbiAgICAgIG9wdGlvbnMuaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gdGhpcy5fYmFzaWNBdXRoXG4gICAgfVxuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICBjb25zdCBjcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2dldENyZWRlbnRpYWxzKCk7XG4gICAgICBpZiAoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Rva2VuSW5VUkwpIHtcbiAgICAgICAgICBpZiAodXJsLmluZGV4T2YoJz8nKSA8IDApIHtcbiAgICAgICAgICAgIHVybCArPSAnPyc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHVybCArPSAnYWNjZXNzX3Rva2VuPScgKyBjcmVkZW50aWFscy5hY2Nlc3NfdG9rZW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucy5oZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPVxuICAgICAgICAgICAgY3JlZGVudGlhbHMudG9rZW5fdHlwZSArICcgJyArIGNyZWRlbnRpYWxzLmFjY2Vzc190b2tlbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBsZXQgcmVzcG9uc2U6IFQgfCBudWxsID0gbnVsbDtcbiAgICBjb25zdCBtYXhSZXF1ZXN0VGltZXM6IG51bWJlciA9IHJldHJ5ICsgMTtcbiAgICBmb3IgKFxuICAgICAgbGV0IHJlcXVlc3RUaW1lID0gMDtcbiAgICAgIHJlcXVlc3RUaW1lIDwgbWF4UmVxdWVzdFRpbWVzO1xuICAgICAgcmVxdWVzdFRpbWUrK1xuICAgICkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9iYXNlUmVxdWVzdDxUPih1cmwsIG9wdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gY2F0Y2ggKHJlc3BvbnNlRXJyb3IpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHJlcXVlc3RUaW1lID09PSByZXRyeSB8fFxuICAgICAgICAgICFyZXNwb25zZUVycm9yIHx8XG4gICAgICAgICAgcmVzcG9uc2VFcnJvci5lcnJvciAhPT0gJ3VucmVhY2hhYmxlJ1xuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2VFcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGF3YWl0IHRoaXMuX3NsZWVwKE9BdXRoMkNsaWVudC5fcmV0cnlJbnRlcnZhbCk7XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayByZXRyeSB2YWx1ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHJldHJ5XG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIHByaXZhdGUgX2NoZWNrUmV0cnkocmV0cnk6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHJlc3BvbnNlRXJyb3I6IFJlc3BvbnNlRXJyb3IgfCBudWxsID0gbnVsbDtcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgcmV0cnkgIT09ICdudW1iZXInIHx8XG4gICAgICByZXRyeSA8IE9BdXRoMkNsaWVudC5fbWluUmV0cnkgfHxcbiAgICAgIHJldHJ5ID4gT0F1dGgyQ2xpZW50Ll9tYXhSZXRyeVxuICAgICkge1xuICAgICAgcmVzcG9uc2VFcnJvciA9IHtcbiAgICAgICAgZXJyb3I6IEVycm9yVHlwZS5VTlJFQUNIQUJMRSxcbiAgICAgICAgZXJyb3JfZGVzY3JpcHRpb246ICd3cm9uZyBvcHRpb25zIHBhcmFtOiByZXRyeScsXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAocmVzcG9uc2VFcnJvcikge1xuICAgICAgdGhyb3cgcmVzcG9uc2VFcnJvcjtcbiAgICB9XG4gICAgcmV0dXJuIHJldHJ5O1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCByZXRyeSB2YWx1ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHJldHJ5XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkZWZhdWx0VmFsZVxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBwcml2YXRlIF9mb3JtYXRSZXRyeShyZXRyeTogbnVtYmVyLCBkZWZhdWx0VmFsZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodHlwZW9mIHJldHJ5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIGRlZmF1bHRWYWxlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fY2hlY2tSZXRyeShyZXRyeSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNsZWVwLlxuICAgKiBAcGFyYW0ge251bWJlcn0gbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgX3NsZWVwKG1zOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9LCBtcyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaCBleHBpcmVkIHRva2VuLlxuICAgKiBAcGFyYW0ge0NyZWRlbnRpYWxzfSBjcmVkZW50aWFsc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn1cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgX3JlZnJlc2hUb2tlbihjcmVkZW50aWFsczogQ3JlZGVudGlhbHMpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NpbmdsZVByb21pc2UucnVuKCdfcmVmcmVzaFRva2VuJywgYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCFjcmVkZW50aWFscyB8fCAhY3JlZGVudGlhbHMucmVmcmVzaF90b2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy5fdW5BdXRoZW50aWNhdGVkRXJyb3IoJ25vIHJlZnJlc2ggdG9rZW4gZm91bmQgaW4gY3JlZGVudGlhbHMnKTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IG5ld0NyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX3JlZnJlc2hUb2tlbkZ1bmMoXG4gICAgICAgICAgY3JlZGVudGlhbHMucmVmcmVzaF90b2tlbixcbiAgICAgICAgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5fbG9jYWxDcmVkZW50aWFscy5zZXRDcmVkZW50aWFscyhuZXdDcmVkZW50aWFscyk7XG4gICAgICAgIHJldHVybiBuZXdDcmVkZW50aWFsc1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yLmVycm9yID09PSBFcnJvclR5cGUuSU5WQUxJRF9HUkFOVCkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX2xvY2FsQ3JlZGVudGlhbHMuc2V0Q3JlZGVudGlhbHMobnVsbCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX3VuQXV0aGVudGljYXRlZEVycm9yKGVycm9yLmVycm9yX2Rlc2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGFub255bW91cyBzaWduSW5cbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZGVudGlhbHNcbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59XG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9hbm9ueW1vdXNTaWduSW4oY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIHJldHVybiB0aGlzLl9zaW5nbGVQcm9taXNlLnJ1bignX2Fub255bW91cycsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghY3JlZGVudGlhbHMgfHwgY3JlZGVudGlhbHMuc2NvcGUgIT09ICdhbm9ueW1vdXMnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91bkF1dGhlbnRpY2F0ZWRFcnJvcignbm8gYW5vbnltb3VzIGluIGNyZWRlbnRpYWxzJyk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBuZXdDcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLnJlcXVlc3QoJy9hdXRoL3YxL3NpZ25pbi9hbm9ueW1vdXNseScsIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICB3aXRoQmFzaWNBdXRoOiB0cnVlLFxuICAgICAgICAgIGJvZHk6IHt9XG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLl9sb2NhbENyZWRlbnRpYWxzLnNldENyZWRlbnRpYWxzKG5ld0NyZWRlbnRpYWxzKTtcbiAgICAgICAgcmV0dXJuIG5ld0NyZWRlbnRpYWxzXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IuZXJyb3IgPT09IEVycm9yVHlwZS5JTlZBTElEX0dSQU5UKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fbG9jYWxDcmVkZW50aWFscy5zZXRDcmVkZW50aWFscyhudWxsKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fdW5BdXRoZW50aWNhdGVkRXJyb3IoZXJyb3IuZXJyb3JfZGVzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVmYXVsdCByZWZyZXNoIHRva2VuIGZ1bmN0aW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVmcmVzaFRva2VuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fVxuICAgKi9cbiAgcHJpdmF0ZSBfZGVmYXVsdFJlZnJlc2hUb2tlbkZ1bmMoXG4gICAgcmVmcmVzaFRva2VuPzogc3RyaW5nLFxuICApOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgaWYgKHJlZnJlc2hUb2tlbiA9PT0gdW5kZWZpbmVkIHx8IHJlZnJlc2hUb2tlbiA9PT0gJycpIHtcbiAgICAgIHJldHVybiB0aGlzLl91bkF1dGhlbnRpY2F0ZWRFcnJvcigncmVmcmVzaCB0b2tlbiBub3QgZm91bmQnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnL2F1dGgvdjEvdG9rZW4nLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHdpdGhCYXNpY0F1dGg6IHRydWUsXG4gICAgICBib2R5OiB7XG4gICAgICAgIGdyYW50X3R5cGU6ICdyZWZyZXNoX3Rva2VuJyxcbiAgICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY3JlZGVudGlhbHMuXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9nZXRDcmVkZW50aWFscygpOiBQcm9taXNlPENyZWRlbnRpYWxzIHwgbnVsbD4ge1xuICAgIGxldCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9sb2NhbENyZWRlbnRpYWxzLmdldENyZWRlbnRpYWxzKCk7XG4gICAgaWYgKGNyZWRlbnRpYWxzID09IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLl91bkF1dGhlbnRpY2F0ZWRFcnJvcihcImNyZWRlbnRpYWxzIG5vdCBmb3VuZFwiKVxuICAgIH1cbiAgICBpZiAoaXNDcmVkZW50aWFsc0V4cGlyZWQoY3JlZGVudGlhbHMpKSB7XG4gICAgICBpZiAoY3JlZGVudGlhbHMgJiYgY3JlZGVudGlhbHMuc2NvcGUgPT09ICdhbm9ueW1vdXMnKSB7XG4gICAgICAgIGNyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fYW5vbnltb3VzU2lnbkluKGNyZWRlbnRpYWxzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9yZWZyZXNoVG9rZW4oY3JlZGVudGlhbHMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3JlZGVudGlhbHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGRldmljZUlkXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9nZXREZXZpY2VJZCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGlmICh0aGlzLl9kZXZpY2VJRCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2RldmljZUlEO1xuICAgIH1cbiAgICBsZXQgZGV2aWNlSWQ6IHN0cmluZyA9IGF3YWl0IHRoaXMuX3N0b3JhZ2UuZ2V0SXRlbShcbiAgICAgIERldmljZUlkU2VjdGlvbk5hbWUsXG4gICAgKTtcbiAgICBpZiAoISh0eXBlb2YgZGV2aWNlSWQgPT09ICdzdHJpbmcnICYmXG4gICAgICBkZXZpY2VJZC5sZW5ndGggPj0gMTYgJiZcbiAgICAgIGRldmljZUlkLmxlbmd0aCA8PSA0OCkpIHtcbiAgICAgIGRldmljZUlkID0gdXVpZHY0KCk7XG4gICAgICBhd2FpdCB0aGlzLl9zdG9yYWdlLnNldEl0ZW0oRGV2aWNlSWRTZWN0aW9uTmFtZSwgZGV2aWNlSWQpO1xuICAgIH1cbiAgICB0aGlzLl9kZXZpY2VJRCA9IGRldmljZUlkO1xuICAgIHJldHVybiBkZXZpY2VJZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSB1bkF1dGhlbnRpY2F0ZWQgZXJyb3IuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJcbiAgICogQHJldHVybiB7UHJvbWlzZTxUPn1cbiAgICovXG4gIHByaXZhdGUgX3VuQXV0aGVudGljYXRlZEVycm9yPFQ+KGVycj86IHN0cmluZyk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh7XG4gICAgICBlcnJvcjogRXJyb3JUeXBlLlVOQVVUSEVOVElDQVRFRCxcbiAgICAgIGVycm9yX2Rlc2NyaXB0aW9uOiBlcnIsXG4gICAgfSBhcyBSZXNwb25zZUVycm9yKTtcbiAgfVxufVxuIl19