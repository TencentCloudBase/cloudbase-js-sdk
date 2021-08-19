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
exports.OAuth2Client = exports.LocalCredentials = exports.defaultStorage = exports.generateRequestId = exports.toResponseError = exports.defaultRequest = void 0;
var consts_1 = require("./consts");
var uuid_1 = require("../utils/uuid");
var single_promise_1 = require("../utils/function/single-promise");
var RequestIdHeaderName = 'x-request-id';
var DeviceIdHeaderName = 'x-device-id';
var DeviceIdSectionName = 'device_id';
exports.defaultRequest = function (url, options) { return __awaiter(void 0, void 0, void 0, function () {
    var result, responseError, copyOptions, responseResult, jsonResponse, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = null;
                responseError = null;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                copyOptions = Object.assign({}, options);
                if (!copyOptions.method) {
                    copyOptions.method = 'GET';
                }
                if (copyOptions.body && typeof copyOptions.body !== 'string') {
                    copyOptions.body = JSON.stringify(copyOptions.body);
                }
                return [4, fetch(url, copyOptions)];
            case 2:
                responseResult = _a.sent();
                return [4, responseResult.json()];
            case 3:
                jsonResponse = _a.sent();
                if (jsonResponse === null || jsonResponse === void 0 ? void 0 : jsonResponse.error) {
                    responseError = jsonResponse;
                    responseError.error_uri = new URL(url).pathname;
                }
                else {
                    result = jsonResponse;
                }
                return [3, 5];
            case 4:
                error_1 = _a.sent();
                responseError = {
                    error: consts_1.ErrorType.UNREACHABLE,
                    error_description: error_1.message,
                    error_uri: new URL(url).pathname,
                };
                return [3, 5];
            case 5:
                if (responseError) {
                    throw responseError;
                }
                else {
                    return [2, result];
                }
                return [2];
        }
    });
}); };
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
var DefaultStorage = (function () {
    function DefaultStorage() {
    }
    DefaultStorage.prototype.getItem = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, window.localStorage.getItem(key)];
            });
        });
    };
    DefaultStorage.prototype.removeItem = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                window.localStorage.removeItem(key);
                return [2];
            });
        });
    };
    DefaultStorage.prototype.setItem = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                window.localStorage.setItem(key, value);
                return [2];
            });
        });
    };
    return DefaultStorage;
}());
exports.defaultStorage = new DefaultStorage();
function isCredentialsExpired(credentials) {
    var isExpired = true;
    if ((credentials === null || credentials === void 0 ? void 0 : credentials.expires_at) && credentials.access_token) {
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
                        if (!(credentials === null || credentials === void 0 ? void 0 : credentials.expires_in)) return [3, 3];
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
                        var credentials, tokenStr, error_2;
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
                                    if (credentials === null || credentials === void 0 ? void 0 : credentials.expires_at) {
                                        credentials.expires_at = new Date(credentials.expires_at);
                                    }
                                    return [3, 5];
                                case 3:
                                    error_2 = _a.sent();
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
        this._apiOrigin = options.apiOrigin;
        this._clientId = options.clientId;
        this._retry = this._formatRetry(options.retry, OAuth2Client._defaultRetry);
        if (options.baseRequest != undefined) {
            this._baseRequest = options.baseRequest;
        }
        else {
            this._baseRequest = exports.defaultRequest;
        }
        this._tokenInURL = options.tokenInURL;
        this._headers = options.headers;
        this._storage = options.storage || exports.defaultStorage;
        this._localCredentials = new LocalCredentials({
            tokenSectionName: 'credentials_' + options.clientId,
            storage: this._storage,
        });
        this._clientSecret = options.clientSecret;
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
            var retry, credentials, response, maxRequestTimes, requestTime, responseError_1;
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
                        if (!options.headers[DeviceIdHeaderName]) {
                            options.headers[DeviceIdHeaderName] = this._getDeviceId();
                        }
                        if (!(options === null || options === void 0 ? void 0 : options.withCredentials)) return [3, 2];
                        return [4, this._getCredentials()];
                    case 1:
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
                        return [3, 3];
                    case 2:
                        if (this._clientId && url.indexOf('client_id') < 0) {
                            url += url.indexOf('?') < 0 ? '?' : '&';
                            url += 'client_id=' + this._clientId;
                        }
                        _a.label = 3;
                    case 3:
                        if (url.startsWith('/')) {
                            url = this._apiOrigin + url;
                        }
                        response = null;
                        maxRequestTimes = retry + 1;
                        requestTime = 0;
                        _a.label = 4;
                    case 4:
                        if (!(requestTime < maxRequestTimes)) return [3, 11];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4, this._baseRequest(url, options)];
                    case 6:
                        response = _a.sent();
                        return [3, 11];
                    case 7:
                        responseError_1 = _a.sent();
                        if (requestTime === retry ||
                            !responseError_1 ||
                            responseError_1.error !== 'unreachable') {
                            return [2, Promise.reject(responseError_1)];
                        }
                        return [3, 8];
                    case 8: return [4, this._sleep(OAuth2Client._retryInterval)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        requestTime++;
                        return [3, 4];
                    case 11: return [2, response];
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
                        var newCredentials, error_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!credentials || !credentials.refresh_token) {
                                        return [2, this._unAuthenticatedError('no refresh token found')];
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
                                    return [3, 7];
                                case 4:
                                    error_3 = _a.sent();
                                    if (!(error_3.error === consts_1.ErrorType.INVALID_GRANT)) return [3, 6];
                                    return [4, this._localCredentials.setCredentials(null)];
                                case 5:
                                    _a.sent();
                                    return [2, this._unAuthenticatedError(error_3.error_description)];
                                case 6: return [2, Promise.reject(error_3)];
                                case 7: return [2, this._localCredentials.getCredentials()];
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
            body: {
                client_id: this._clientId,
                client_secret: this._clientSecret,
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
                        if (!isCredentialsExpired(credentials)) return [3, 3];
                        return [4, this._refreshToken(credentials)];
                    case 2:
                        credentials = _a.sent();
                        _a.label = 3;
                    case 3: return [2, credentials];
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
    OAuth2Client._defaultRetry = 1;
    OAuth2Client._minRetry = 0;
    OAuth2Client._maxRetry = 5;
    OAuth2Client._retryInterval = 1000;
    return OAuth2Client;
}());
exports.OAuth2Client = OAuth2Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgyY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29hdXRoMmNsaWVudC9vYXV0aDJjbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBcUM7QUFhckMsc0NBQXVDO0FBRXZDLG1FQUFpRTtBQUVqRSxJQUFNLG1CQUFtQixHQUFHLGNBQWMsQ0FBQztBQUMzQyxJQUFNLGtCQUFrQixHQUFHLGFBQWEsQ0FBQztBQUN6QyxJQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQztBQVMzQixRQUFBLGNBQWMsR0FBb0IsVUFDM0MsR0FBVyxFQUNYLE9BQXdCOzs7OztnQkFFcEIsTUFBTSxHQUFhLElBQUksQ0FBQztnQkFDeEIsYUFBYSxHQUF5QixJQUFJLENBQUM7Ozs7Z0JBR3JDLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JCLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2lCQUM5QjtnQkFDRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLElBQUksT0FBTyxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDMUQsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDdkQ7Z0JBQ2dDLFdBQU0sS0FBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsRUFBQTs7Z0JBQXhELGNBQWMsR0FBYSxTQUE2QjtnQkFDekMsV0FBTSxjQUFjLENBQUMsSUFBSSxFQUFFLEVBQUE7O2dCQUExQyxZQUFZLEdBQUcsU0FBMkI7Z0JBQ2hELElBQUksWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLEtBQUssRUFBRTtvQkFD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QUFDO1lBQ2xCLEtBQUssRUFBRSxrQkFBUyxDQUFDLGVBQWU7WUFDaEMsaUJBQWlCLEVBQUUsR0FBRztTQUNSLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBclJjLDBCQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLHNCQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2Qsc0JBQVMsR0FBRyxDQUFDLENBQUM7SUFDZCwyQkFBYyxHQUFHLElBQUksQ0FBQztJQW1SekMsbUJBQUM7Q0FBQSxBQXZSRCxJQXVSQztBQXZSWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVycm9yVHlwZSB9IGZyb20gJy4vY29uc3RzJztcblxuaW1wb3J0IHsgQXV0aENsaWVudCwgU2ltcGxlU3RvcmFnZSB9IGZyb20gJy4vaW50ZXJmYWNlJztcblxuaW1wb3J0IHtcbiAgICBDcmVkZW50aWFscyxcbiAgICBSZXNwb25zZUVycm9yLFxuICAgIFJlcXVlc3RPcHRpb25zLFxuICAgIFJlcXVlc3RGdW5jdGlvbixcbiAgICBPQXV0aDJDbGllbnRPcHRpb25zLFxuICAgIEF1dGhDbGllbnRSZXF1ZXN0T3B0aW9ucyxcbn0gZnJvbSAnLi9tb2RlbHMnO1xuXG5pbXBvcnQgeyB1dWlkdjQgfSBmcm9tICcuLi91dGlscy91dWlkJztcblxuaW1wb3J0IHsgU2luZ2xlUHJvbWlzZSB9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uL3NpbmdsZS1wcm9taXNlJztcblxuY29uc3QgUmVxdWVzdElkSGVhZGVyTmFtZSA9ICd4LXJlcXVlc3QtaWQnO1xuY29uc3QgRGV2aWNlSWRIZWFkZXJOYW1lID0gJ3gtZGV2aWNlLWlkJztcbmNvbnN0IERldmljZUlkU2VjdGlvbk5hbWUgPSAnZGV2aWNlX2lkJztcblxuZXhwb3J0IGludGVyZmFjZSBUb1Jlc3BvbnNlRXJyb3JPcHRpb25zIHtcbiAgICBlcnJvcj86IEVycm9yVHlwZTtcbiAgICBlcnJvcl9kZXNjcmlwdGlvbj86IHN0cmluZyB8IG51bGw7XG4gICAgZXJyb3JfdXJpPzogc3RyaW5nIHwgbnVsbDtcbiAgICBkZXRhaWxzPzogYW55IHwgbnVsbDtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRSZXF1ZXN0OiBSZXF1ZXN0RnVuY3Rpb24gPSBhc3luYyA8VD4oXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zLFxuKTogUHJvbWlzZTxUPiA9PiB7XG4gICAgbGV0IHJlc3VsdDogVCB8IG51bGwgPSBudWxsO1xuICAgIGxldCByZXNwb25zZUVycm9yOiBSZXNwb25zZUVycm9yIHwgbnVsbCA9IG51bGw7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gT2JqZWN0cyBtdXN0IGJlIGNvcGllZCB0byBwcmV2ZW50IG1vZGlmaWNhdGlvbiBvZiBkYXRhIHN1Y2ggYXMgYm9keS5cbiAgICAgICAgY29uc3QgY29weU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcbiAgICAgICAgaWYgKCFjb3B5T3B0aW9ucy5tZXRob2QpIHtcbiAgICAgICAgICAgIGNvcHlPcHRpb25zLm1ldGhvZCA9ICdHRVQnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3B5T3B0aW9ucy5ib2R5ICYmIHR5cGVvZiBjb3B5T3B0aW9ucy5ib2R5ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29weU9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGNvcHlPcHRpb25zLmJvZHkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlUmVzdWx0OiBSZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgY29weU9wdGlvbnMpO1xuICAgICAgICBjb25zdCBqc29uUmVzcG9uc2UgPSBhd2FpdCByZXNwb25zZVJlc3VsdC5qc29uKCk7XG4gICAgICAgIGlmIChqc29uUmVzcG9uc2U/LmVycm9yKSB7XG4gICAgICAgICAgICByZXNwb25zZUVycm9yID0ganNvblJlc3BvbnNlIGFzIFJlc3BvbnNlRXJyb3I7XG4gICAgICAgICAgICByZXNwb25zZUVycm9yLmVycm9yX3VyaSA9IG5ldyBVUkwodXJsKS5wYXRobmFtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGpzb25SZXNwb25zZSBhcyBUO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmVzcG9uc2VFcnJvciA9IHtcbiAgICAgICAgICAgIGVycm9yOiBFcnJvclR5cGUuVU5SRUFDSEFCTEUsXG4gICAgICAgICAgICBlcnJvcl9kZXNjcmlwdGlvbjogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICAgIGVycm9yX3VyaTogbmV3IFVSTCh1cmwpLnBhdGhuYW1lLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAocmVzcG9uc2VFcnJvcikge1xuICAgICAgICB0aHJvdyByZXNwb25zZUVycm9yO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHRvUmVzcG9uc2VFcnJvciA9IChcbiAgICBlcnJvcjogUmVzcG9uc2VFcnJvciB8IEVycm9yLFxuICAgIG9wdGlvbnM/OiBUb1Jlc3BvbnNlRXJyb3JPcHRpb25zLFxuKTogUmVzcG9uc2VFcnJvciA9PiB7XG4gICAgbGV0IHJlc3BvbnNlRXJyb3I6IFJlc3BvbnNlRXJyb3I7XG4gICAgY29uc3QgZm9ybWF0T3B0aW9uczogVG9SZXNwb25zZUVycm9yT3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgcmVzcG9uc2VFcnJvciA9IHtcbiAgICAgICAgICAgIGVycm9yOiBmb3JtYXRPcHRpb25zLmVycm9yIHx8IEVycm9yVHlwZS5MT0NBTCxcbiAgICAgICAgICAgIGVycm9yX2Rlc2NyaXB0aW9uOiBmb3JtYXRPcHRpb25zLmVycm9yX2Rlc2NyaXB0aW9uIHx8IGVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgICBlcnJvcl91cmk6IGZvcm1hdE9wdGlvbnMuZXJyb3JfdXJpLFxuICAgICAgICAgICAgZGV0YWlsczogZm9ybWF0T3B0aW9ucy5kZXRhaWxzIHx8IGVycm9yLnN0YWNrLFxuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdEVycm9yOiBUb1Jlc3BvbnNlRXJyb3JPcHRpb25zID0gZXJyb3IgfHwge307XG4gICAgICAgIHJlc3BvbnNlRXJyb3IgPSB7XG4gICAgICAgICAgICBlcnJvcjogZm9ybWF0T3B0aW9ucy5lcnJvciB8fCBmb3JtYXRFcnJvci5lcnJvciB8fCBFcnJvclR5cGUuTE9DQUwsXG4gICAgICAgICAgICBlcnJvcl9kZXNjcmlwdGlvbjpcbiAgICAgICAgICAgICAgICBmb3JtYXRPcHRpb25zLmVycm9yX2Rlc2NyaXB0aW9uIHx8IGZvcm1hdEVycm9yLmVycm9yX2Rlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZXJyb3JfdXJpOiBmb3JtYXRPcHRpb25zLmVycm9yX3VyaSB8fCBmb3JtYXRFcnJvci5lcnJvcl91cmksXG4gICAgICAgICAgICBkZXRhaWxzOiBmb3JtYXRPcHRpb25zLmRldGFpbHMgfHwgZm9ybWF0RXJyb3IuZGV0YWlscyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlRXJyb3I7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIHJlcXVlc3QgaWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVJlcXVlc3RJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB1dWlkdjQoKTtcbn1cblxuXG4vKipcbiAqIERlZmF1bHQgU3RvcmFnZS5cbiAqL1xuY2xhc3MgRGVmYXVsdFN0b3JhZ2UgaW1wbGVtZW50cyBTaW1wbGVTdG9yYWdlIHtcbiAgICAvKipcbiAgICAgKiBHZXQgaXRlbS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICovXG4gICAgYXN5bmMgZ2V0SXRlbShrZXk6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgICAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGl0ZW0uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqL1xuICAgIGFzeW5jIHJlbW92ZUl0ZW0oa2V5OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGl0ZW0uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgICAqL1xuICAgIGFzeW5jIHNldEl0ZW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTdG9yYWdlID0gbmV3IERlZmF1bHRTdG9yYWdlKCk7XG5cbmludGVyZmFjZSBMb2NhbENyZWRlbnRpYWxzT3B0aW9ucyB7XG4gICAgdG9rZW5TZWN0aW9uTmFtZTogc3RyaW5nO1xuICAgIHN0b3JhZ2U6IFNpbXBsZVN0b3JhZ2U7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgY3JlZGVudGlhbHMgaXMgZXhwaXJlZC5cbiAqIEBwYXJhbSB7Q3JlZGVudGlhbHN9IGNyZWRlbnRpYWxzXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0NyZWRlbnRpYWxzRXhwaXJlZChjcmVkZW50aWFsczogQ3JlZGVudGlhbHMpOiBib29sZWFuIHtcbiAgICBsZXQgaXNFeHBpcmVkID0gdHJ1ZTtcbiAgICBpZiAoY3JlZGVudGlhbHM/LmV4cGlyZXNfYXQgJiYgY3JlZGVudGlhbHMuYWNjZXNzX3Rva2VuKSB7XG4gICAgICAgIGlzRXhwaXJlZCA9IGNyZWRlbnRpYWxzLmV4cGlyZXNfYXQgPCBuZXcgRGF0ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gaXNFeHBpcmVkO1xufVxuXG4vKipcbiAqIExvY2FsIGNyZWRlbnRpYWxzLlxuICogTG9jYWwgY3JlZGVudGlhbHMsIHdpdGggbWVtb3J5IGNhY2hlIGFuZCBzdG9yYWdlIGNhY2hlLlxuICogSWYgdGhlIG1lbW9yeSBjYWNoZSBleHBpcmVzLCB0aGUgc3RvcmFnZSBjYWNoZSBpcyBhdXRvbWF0aWNhbGx5IGxvYWRlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIExvY2FsQ3JlZGVudGlhbHMge1xuICAgIHByaXZhdGUgX3Rva2VuU2VjdGlvbk5hbWU6IHN0cmluZztcblxuICAgIHByaXZhdGUgX3N0b3JhZ2U6IFNpbXBsZVN0b3JhZ2U7XG5cbiAgICBwcml2YXRlIF9jcmVkZW50aWFsczogQ3JlZGVudGlhbHMgfCBudWxsID0gbnVsbDtcblxuICAgIHByaXZhdGUgX3NpbmdsZVByb21pc2U6IFNpbmdsZVByb21pc2UgPSBuZXcgU2luZ2xlUHJvbWlzZSgpO1xuXG4gICAgLyoqXG4gICAgICogY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0xvY2FsQ3JlZGVudGlhbHNPcHRpb25zfSBvcHRpb25zXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogTG9jYWxDcmVkZW50aWFsc09wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fdG9rZW5TZWN0aW9uTmFtZSA9IG9wdGlvbnMudG9rZW5TZWN0aW9uTmFtZTtcbiAgICAgICAgdGhpcy5fc3RvcmFnZSA9IG9wdGlvbnMuc3RvcmFnZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRDcmVkZW50aWFscyBQcm92aWRlcyBhbiBhbHRlcm5hdGl2ZSBmZXRjaCBhcGkgcmVxdWVzdCBpbXBsZW1lbnRhdGlvbiB3aXRoIGF1dGggY3JlZGVudGlhbHNcbiAgICAgKiBAcGFyYW0ge0NyZWRlbnRpYWxzfSBjcmVkZW50aWFsc1xuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzZXRDcmVkZW50aWFscyhjcmVkZW50aWFscz86IENyZWRlbnRpYWxzKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmIChjcmVkZW50aWFscz8uZXhwaXJlc19pbikge1xuICAgICAgICAgICAgY3JlZGVudGlhbHMuZXhwaXJlc19hdCA9IG5ldyBEYXRlKFxuICAgICAgICAgICAgICAgIERhdGUubm93KCkgKyAoY3JlZGVudGlhbHMuZXhwaXJlc19pbiAtIDMwKSAqIDEwMDAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3N0b3JhZ2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlblN0cjogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoY3JlZGVudGlhbHMpO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3N0b3JhZ2Uuc2V0SXRlbSh0aGlzLl90b2tlblNlY3Rpb25OYW1lLCB0b2tlblN0cik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jcmVkZW50aWFscyA9IGNyZWRlbnRpYWxzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3N0b3JhZ2UpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9zdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5fdG9rZW5TZWN0aW9uTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jcmVkZW50aWFscyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgY3JlZGVudGlhbHMuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscyB8IG51bGw+fVxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZXRDcmVkZW50aWFscygpOiBQcm9taXNlPENyZWRlbnRpYWxzIHwgbnVsbD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2luZ2xlUHJvbWlzZS5ydW4oJ2dldENyZWRlbnRpYWxzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzQ3JlZGVudGlhbHNFeHBpcmVkKHRoaXMuX2NyZWRlbnRpYWxzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fZ2V0U3RvcmFnZUNyZWRlbnRpYWxzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3JlZGVudGlhbHM7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBzdG9yYWdlIGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgX2dldFN0b3JhZ2VDcmVkZW50aWFscygpOiBQcm9taXNlPENyZWRlbnRpYWxzIHwgbnVsbD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2luZ2xlUHJvbWlzZS5ydW4oJ19nZXRTdG9yYWdlQ3JlZGVudGlhbHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzID0gbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuU3RyOiBzdHJpbmcgPSBhd2FpdCB0aGlzLl9zdG9yYWdlLmdldEl0ZW0oXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9rZW5TZWN0aW9uTmFtZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAodG9rZW5TdHIgIT09IHVuZGVmaW5lZCAmJiB0b2tlblN0ciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzID0gSlNPTi5wYXJzZSh0b2tlblN0cik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjcmVkZW50aWFscz8uZXhwaXJlc19hdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbHMuZXhwaXJlc19hdCA9IG5ldyBEYXRlKGNyZWRlbnRpYWxzLmV4cGlyZXNfYXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fc3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuX3Rva2VuU2VjdGlvbk5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFscyA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNyZWRlbnRpYWxzO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICogT0F1dGgyQ2xpZW50XG4gKi9cbmV4cG9ydCBjbGFzcyBPQXV0aDJDbGllbnQgaW1wbGVtZW50cyBBdXRoQ2xpZW50IHtcbiAgICBwcml2YXRlIHN0YXRpYyBfZGVmYXVsdFJldHJ5ID0gMTtcbiAgICBwcml2YXRlIHN0YXRpYyBfbWluUmV0cnkgPSAwO1xuICAgIHByaXZhdGUgc3RhdGljIF9tYXhSZXRyeSA9IDU7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX3JldHJ5SW50ZXJ2YWwgPSAxMDAwO1xuXG4gICAgcHJpdmF0ZSBfYXBpT3JpZ2luOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfY2xpZW50SWQ6IHN0cmluZztcbiAgICBwcml2YXRlIF9yZXRyeTogbnVtYmVyO1xuICAgIHByaXZhdGUgX2NsaWVudFNlY3JldD86IHN0cmluZztcbiAgICBwcml2YXRlIF9iYXNlUmVxdWVzdDogPFQ+KFxuICAgICAgICB1cmw6IHN0cmluZyxcbiAgICAgICAgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zLFxuICAgICkgPT4gUHJvbWlzZTxUPjtcbiAgICBwcml2YXRlIF9sb2NhbENyZWRlbnRpYWxzOiBMb2NhbENyZWRlbnRpYWxzO1xuICAgIHByaXZhdGUgX3N0b3JhZ2U6IFNpbXBsZVN0b3JhZ2U7XG4gICAgcHJpdmF0ZSBfZGV2aWNlSUQ/OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfdG9rZW5JblVSTD86IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfcmVmcmVzaFRva2VuRnVuYzogKHJlZnJlc2hUb2tlbj86IHN0cmluZykgPT4gUHJvbWlzZTxDcmVkZW50aWFscz47XG4gICAgcHJpdmF0ZSBfaGVhZGVycz86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG4gICAgcHJpdmF0ZSBfc2luZ2xlUHJvbWlzZTogU2luZ2xlUHJvbWlzZSA9IG5ldyBTaW5nbGVQcm9taXNlKCk7XG5cbiAgICAvKipcbiAgICAgKiBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7T0F1dGgyQ2xpZW50T3B0aW9uc30gb3B0aW9uc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9BdXRoMkNsaWVudE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fYXBpT3JpZ2luID0gb3B0aW9ucy5hcGlPcmlnaW47XG4gICAgICAgIHRoaXMuX2NsaWVudElkID0gb3B0aW9ucy5jbGllbnRJZDtcbiAgICAgICAgdGhpcy5fcmV0cnkgPSB0aGlzLl9mb3JtYXRSZXRyeShvcHRpb25zLnJldHJ5LCBPQXV0aDJDbGllbnQuX2RlZmF1bHRSZXRyeSk7XG4gICAgICAgIGlmIChvcHRpb25zLmJhc2VSZXF1ZXN0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5fYmFzZVJlcXVlc3QgPSBvcHRpb25zLmJhc2VSZXF1ZXN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYmFzZVJlcXVlc3QgPSBkZWZhdWx0UmVxdWVzdDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90b2tlbkluVVJMID0gb3B0aW9ucy50b2tlbkluVVJMO1xuICAgICAgICB0aGlzLl9oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuX3N0b3JhZ2UgPSBvcHRpb25zLnN0b3JhZ2UgfHwgZGVmYXVsdFN0b3JhZ2U7XG4gICAgICAgIHRoaXMuX2xvY2FsQ3JlZGVudGlhbHMgPSBuZXcgTG9jYWxDcmVkZW50aWFscyh7XG4gICAgICAgICAgICB0b2tlblNlY3Rpb25OYW1lOiAnY3JlZGVudGlhbHNfJyArIG9wdGlvbnMuY2xpZW50SWQsXG4gICAgICAgICAgICBzdG9yYWdlOiB0aGlzLl9zdG9yYWdlLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fY2xpZW50U2VjcmV0ID0gb3B0aW9ucy5jbGllbnRTZWNyZXQ7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hUb2tlbkZ1bmMgPVxuICAgICAgICAgICAgb3B0aW9ucy5yZWZyZXNoVG9rZW5GdW5jIHx8IHRoaXMuX2RlZmF1bHRSZWZyZXNoVG9rZW5GdW5jO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldENyZWRlbnRpYWxzIFByb3ZpZGVzIGFuIGFsdGVybmF0aXZlIGZldGNoIGFwaSByZXF1ZXN0IGltcGxlbWVudGF0aW9uIHdpdGggYXV0aCBjcmVkZW50aWFsc1xuICAgICAqIEBwYXJhbSB7Q3JlZGVudGlhbHN9IGNyZWRlbnRpYWxzXG4gICAgICogQHJldHVybiB7UHJvbWlzZTx2b2lkPn1cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0Q3JlZGVudGlhbHMoY3JlZGVudGlhbHM/OiBDcmVkZW50aWFscyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxDcmVkZW50aWFscy5zZXRDcmVkZW50aWFscyhjcmVkZW50aWFscyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0QWNjZXNzVG9rZW4gcmV0dXJuIGEgdmFsaWRhdGUgYWNjZXNzIHRva2VuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdldEFjY2Vzc1Rva2VuKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2dldENyZWRlbnRpYWxzKCk7XG4gICAgICAgIGlmIChjcmVkZW50aWFscz8uYWNjZXNzX3Rva2VuKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNyZWRlbnRpYWxzLmFjY2Vzc190b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHsgZXJyb3I6IEVycm9yVHlwZS5VTkFVVEhFTlRJQ0FURUQgfSBhcyBSZXNwb25zZUVycm9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXF1ZXN0IGh0dHAgbGlrZSBzaW1wbGUgZmV0Y2ggYXBpLCBleHA6cmVxdWVzdCgnL3YxL3VzZXIvbWUnLCB7d2l0aENyZWRlbnRpYWxzOnRydWV9KVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge0F1dGhDbGllbnRSZXF1ZXN0T3B0aW9uc30gb3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyByZXF1ZXN0PFQ+KFxuICAgICAgICB1cmw6IHN0cmluZyxcbiAgICAgICAgb3B0aW9ucz86IEF1dGhDbGllbnRSZXF1ZXN0T3B0aW9ucyxcbiAgICApOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmV0cnk6IG51bWJlciA9IHRoaXMuX2Zvcm1hdFJldHJ5KG9wdGlvbnMucmV0cnksIHRoaXMuX3JldHJ5KTtcbiAgICAgICAgb3B0aW9ucy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9O1xuICAgICAgICBpZiAodGhpcy5faGVhZGVycykge1xuICAgICAgICAgICAgb3B0aW9ucy5oZWFkZXJzID0ge1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuX2hlYWRlcnMsXG4gICAgICAgICAgICAgICAgLi4ub3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9wdGlvbnMuaGVhZGVyc1tSZXF1ZXN0SWRIZWFkZXJOYW1lXSkge1xuICAgICAgICAgICAgb3B0aW9ucy5oZWFkZXJzW1JlcXVlc3RJZEhlYWRlck5hbWVdID0gZ2VuZXJhdGVSZXF1ZXN0SWQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9wdGlvbnMuaGVhZGVyc1tEZXZpY2VJZEhlYWRlck5hbWVdKSB7XG4gICAgICAgICAgICBvcHRpb25zLmhlYWRlcnNbRGV2aWNlSWRIZWFkZXJOYW1lXSA9IHRoaXMuX2dldERldmljZUlkKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnM/LndpdGhDcmVkZW50aWFscykge1xuICAgICAgICAgICAgY29uc3QgY3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9nZXRDcmVkZW50aWFscygpO1xuICAgICAgICAgICAgaWYgKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rva2VuSW5VUkwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVybC5pbmRleE9mKCc/JykgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgKz0gJz8nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHVybCArPSAnYWNjZXNzX3Rva2VuPScgKyBjcmVkZW50aWFscy5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5oZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPVxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbHMudG9rZW5fdHlwZSArICcgJyArIGNyZWRlbnRpYWxzLmFjY2Vzc190b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2xpZW50SWQgJiYgdXJsLmluZGV4T2YoJ2NsaWVudF9pZCcpIDwgMCkge1xuICAgICAgICAgICAgICAgIHVybCArPSB1cmwuaW5kZXhPZignPycpIDwgMCA/ICc/JyA6ICcmJztcbiAgICAgICAgICAgICAgICB1cmwgKz0gJ2NsaWVudF9pZD0nICsgdGhpcy5fY2xpZW50SWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVybC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgIHVybCA9IHRoaXMuX2FwaU9yaWdpbiArIHVybDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzcG9uc2U6IFQgfCBudWxsID0gbnVsbDtcbiAgICAgICAgY29uc3QgbWF4UmVxdWVzdFRpbWVzOiBudW1iZXIgPSByZXRyeSArIDE7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgcmVxdWVzdFRpbWUgPSAwO1xuICAgICAgICAgICAgcmVxdWVzdFRpbWUgPCBtYXhSZXF1ZXN0VGltZXM7XG4gICAgICAgICAgICByZXF1ZXN0VGltZSsrXG4gICAgICAgICkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2Jhc2VSZXF1ZXN0PFQ+KHVybCwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGNhdGNoIChyZXNwb25zZUVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0VGltZSA9PT0gcmV0cnkgfHxcbiAgICAgICAgICAgICAgICAgICAgIXJlc3BvbnNlRXJyb3IgfHxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VFcnJvci5lcnJvciAhPT0gJ3VucmVhY2hhYmxlJ1xuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2VFcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fc2xlZXAoT0F1dGgyQ2xpZW50Ll9yZXRyeUludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgcmV0cnkgdmFsdWUuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJldHJ5XG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuICAgIHByaXZhdGUgX2NoZWNrUmV0cnkocmV0cnk6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGxldCByZXNwb25zZUVycm9yOiBSZXNwb25zZUVycm9yIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiByZXRyeSAhPT0gJ251bWJlcicgfHxcbiAgICAgICAgICAgIHJldHJ5IDwgT0F1dGgyQ2xpZW50Ll9taW5SZXRyeSB8fFxuICAgICAgICAgICAgcmV0cnkgPiBPQXV0aDJDbGllbnQuX21heFJldHJ5XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmVzcG9uc2VFcnJvciA9IHtcbiAgICAgICAgICAgICAgICBlcnJvcjogRXJyb3JUeXBlLlVOUkVBQ0hBQkxFLFxuICAgICAgICAgICAgICAgIGVycm9yX2Rlc2NyaXB0aW9uOiAnd3Jvbmcgb3B0aW9ucyBwYXJhbTogcmV0cnknLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzcG9uc2VFcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgcmVzcG9uc2VFcnJvcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0cnk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9ybWF0IHJldHJ5IHZhbHVlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZXRyeVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWZhdWx0VmFsZVxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICBwcml2YXRlIF9mb3JtYXRSZXRyeShyZXRyeTogbnVtYmVyLCBkZWZhdWx0VmFsZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXRyeSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jaGVja1JldHJ5KHJldHJ5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNsZWVwLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2U8dm9pZD59XG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBfc2xlZXAobXM6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0sIG1zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVmcmVzaCBleHBpcmVkIHRva2VuLlxuICAgICAqIEBwYXJhbSB7Q3JlZGVudGlhbHN9IGNyZWRlbnRpYWxzXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59XG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBfcmVmcmVzaFRva2VuKGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpbmdsZVByb21pc2UucnVuKCdfcmVmcmVzaFRva2VuJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFjcmVkZW50aWFscyB8fCAhY3JlZGVudGlhbHMucmVmcmVzaF90b2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl91bkF1dGhlbnRpY2F0ZWRFcnJvcignbm8gcmVmcmVzaCB0b2tlbiBmb3VuZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdDcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9yZWZyZXNoVG9rZW5GdW5jKFxuICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFscy5yZWZyZXNoX3Rva2VuLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fbG9jYWxDcmVkZW50aWFscy5zZXRDcmVkZW50aWFscyhuZXdDcmVkZW50aWFscyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvci5lcnJvciA9PT0gRXJyb3JUeXBlLklOVkFMSURfR1JBTlQpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fbG9jYWxDcmVkZW50aWFscy5zZXRDcmVkZW50aWFscyhudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VuQXV0aGVudGljYXRlZEVycm9yKGVycm9yLmVycm9yX2Rlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2NhbENyZWRlbnRpYWxzLmdldENyZWRlbnRpYWxzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgcmVmcmVzaCB0b2tlbiBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVmcmVzaFRva2VuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59XG4gICAgICovXG4gICAgcHJpdmF0ZSBfZGVmYXVsdFJlZnJlc2hUb2tlbkZ1bmMoXG4gICAgICAgIHJlZnJlc2hUb2tlbj86IHN0cmluZyxcbiAgICApOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgICAgIGlmIChyZWZyZXNoVG9rZW4gPT09IHVuZGVmaW5lZCB8fCByZWZyZXNoVG9rZW4gPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdW5BdXRoZW50aWNhdGVkRXJyb3IoJ3JlZnJlc2ggdG9rZW4gbm90IGZvdW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnL2F1dGgvdjEvdG9rZW4nLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICBjbGllbnRfaWQ6IHRoaXMuX2NsaWVudElkLFxuICAgICAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IHRoaXMuX2NsaWVudFNlY3JldCxcbiAgICAgICAgICAgICAgICBncmFudF90eXBlOiAncmVmcmVzaF90b2tlbicsXG4gICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgX2dldENyZWRlbnRpYWxzKCk6IFByb21pc2U8Q3JlZGVudGlhbHMgfCBudWxsPiB7XG4gICAgICAgIGxldCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9sb2NhbENyZWRlbnRpYWxzLmdldENyZWRlbnRpYWxzKCk7XG4gICAgICAgIGlmIChpc0NyZWRlbnRpYWxzRXhwaXJlZChjcmVkZW50aWFscykpIHtcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fcmVmcmVzaFRva2VuKGNyZWRlbnRpYWxzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGRldmljZUlkXG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBfZ2V0RGV2aWNlSWQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgaWYgKHRoaXMuX2RldmljZUlEKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGV2aWNlSUQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRldmljZUlkOiBzdHJpbmcgPSBhd2FpdCB0aGlzLl9zdG9yYWdlLmdldEl0ZW0oXG4gICAgICAgICAgICBEZXZpY2VJZFNlY3Rpb25OYW1lLFxuICAgICAgICApO1xuICAgICAgICBpZiAoISh0eXBlb2YgZGV2aWNlSWQgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgICBkZXZpY2VJZC5sZW5ndGggPj0gMTYgJiZcbiAgICAgICAgICAgIGRldmljZUlkLmxlbmd0aCA8PSA0OCkpIHtcbiAgICAgICAgICAgIGRldmljZUlkID0gdXVpZHY0KCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9zdG9yYWdlLnNldEl0ZW0oRGV2aWNlSWRTZWN0aW9uTmFtZSwgZGV2aWNlSWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2RldmljZUlEID0gZGV2aWNlSWQ7XG4gICAgICAgIHJldHVybiBkZXZpY2VJZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgdW5BdXRoZW50aWNhdGVkIGVycm9yLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFQ+fVxuICAgICAqL1xuICAgIHByaXZhdGUgX3VuQXV0aGVudGljYXRlZEVycm9yPFQ+KGVycj86IHN0cmluZyk6IFByb21pc2U8VD4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoe1xuICAgICAgICAgICAgZXJyb3I6IEVycm9yVHlwZS5VTkFVVEhFTlRJQ0FURUQsXG4gICAgICAgICAgICBlcnJvcl9kZXNjcmlwdGlvbjogZXJyLFxuICAgICAgICB9IGFzIFJlc3BvbnNlRXJyb3IpO1xuICAgIH1cbn1cbiJdfQ==