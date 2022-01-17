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
    DefaultStorage.prototype.getItemSync = function (key) {
        return window.localStorage.getItem(key);
    };
    DefaultStorage.prototype.removeItemSync = function (key) {
        window.localStorage.removeItem(key);
    };
    DefaultStorage.prototype.setItemSync = function (key, value) {
        window.localStorage.setItem(key, value);
    };
    return DefaultStorage;
}());
exports.defaultStorage = new DefaultStorage();
function isCredentialsExpired(credentials) {
    var isExpired = true;
    if ((credentials === null || credentials === void 0 ? void 0 : credentials.expires_at) && (credentials === null || credentials === void 0 ? void 0 : credentials.access_token)) {
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
    LocalCredentials.prototype._getStorageCredentialsSync = function () {
        var credentials = null;
        var tokenStr = this._storage.getItemSync(this._tokenSectionName);
        if (tokenStr !== undefined && tokenStr !== null) {
            try {
                credentials = JSON.parse(tokenStr);
                if (credentials === null || credentials === void 0 ? void 0 : credentials.expires_at) {
                    credentials.expires_at = new Date(credentials.expires_at);
                }
            }
            catch (error) {
                this._storage.removeItem(this._tokenSectionName);
                credentials = null;
            }
        }
        return credentials;
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
                        if (!(options === null || options === void 0 ? void 0 : options.withCredentials)) return [3, 4];
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
                        return [3, 5];
                    case 4:
                        if (this._clientId && url.indexOf('client_id') < 0) {
                            url += url.indexOf('?') < 0 ? '?' : '&';
                            url += 'client_id=' + this._clientId;
                        }
                        _a.label = 5;
                    case 5:
                        if (url.startsWith('/')) {
                            url = this._apiOrigin + url;
                        }
                        response = null;
                        maxRequestTimes = retry + 1;
                        requestTime = 0;
                        _a.label = 6;
                    case 6:
                        if (!(requestTime < maxRequestTimes)) return [3, 13];
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        return [4, this._baseRequest(url, options)];
                    case 8:
                        response = _a.sent();
                        return [3, 13];
                    case 9:
                        responseError_1 = _a.sent();
                        if (requestTime === retry ||
                            !responseError_1 ||
                            responseError_1.error !== 'unreachable') {
                            return [2, Promise.reject(responseError_1)];
                        }
                        return [3, 10];
                    case 10: return [4, this._sleep(OAuth2Client._retryInterval)];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        requestTime++;
                        return [3, 6];
                    case 13: return [2, response];
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
    OAuth2Client.prototype._anonymousSignIn = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, this._singlePromise.run('_anonymous', function () { return __awaiter(_this, void 0, void 0, function () {
                        var newCredentials, error_4;
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
                                            body: {
                                                client_id: this._clientId,
                                                client_secret: this._clientSecret,
                                            },
                                        })];
                                case 2:
                                    newCredentials = _a.sent();
                                    return [4, this._localCredentials.setCredentials(newCredentials)];
                                case 3:
                                    _a.sent();
                                    return [2, newCredentials];
                                case 4:
                                    error_4 = _a.sent();
                                    if (!(error_4.error === consts_1.ErrorType.INVALID_GRANT)) return [3, 6];
                                    return [4, this._localCredentials.setCredentials(null)];
                                case 5:
                                    _a.sent();
                                    return [2, this._unAuthenticatedError(error_4.error_description)];
                                case 6: return [2, Promise.reject(error_4)];
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
    OAuth2Client.prototype.getCredentialsSync = function () {
        var credentials = this._localCredentials._getStorageCredentialsSync();
        return credentials;
    };
    OAuth2Client.prototype.getCredentialsAsync = function () {
        return this._localCredentials.getCredentials();
    };
    OAuth2Client.prototype.getScope = function () {
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
                        return [2, credentials.scope];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgyY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29hdXRoMmNsaWVudC9vYXV0aDJjbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBcUM7QUFhckMsc0NBQXVDO0FBRXZDLG1FQUFpRTtBQUVqRSxJQUFNLG1CQUFtQixHQUFHLGNBQWMsQ0FBQztBQUMzQyxJQUFNLGtCQUFrQixHQUFHLGFBQWEsQ0FBQztBQUN6QyxJQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQztBQVMzQixRQUFBLGNBQWMsR0FBb0IsVUFDN0MsR0FBVyxFQUNYLE9BQXdCOzs7OztnQkFFcEIsTUFBTSxHQUFhLElBQUksQ0FBQztnQkFDeEIsYUFBYSxHQUF5QixJQUFJLENBQUM7Ozs7Z0JBR3ZDLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3ZCLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2lCQUM1QjtnQkFDRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLElBQUksT0FBTyxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDNUQsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDckQ7Z0JBQ2dDLFdBQU0sS0FBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsRUFBQTs7Z0JBQXhELGNBQWMsR0FBYSxTQUE2QjtnQkFDekMsV0FBTSxjQUFjLENBQUMsSUFBSSxFQUFFLEVBQUE7O2dCQUExQyxZQUFZLEdBQUcsU0FBMkI7Z0JBQ2hELElBQUksWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLEtBQUssRUFBRTtvQkFD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QUE7O3dCQUZHLFFBQVEsR0FBVyxTQUV0Qjs2QkFDRyxDQUFDLENBQUMsT0FBTyxRQUFRLEtBQUssUUFBUTs0QkFDaEMsUUFBUSxDQUFDLE1BQU0sSUFBSSxFQUFFOzRCQUNyQixRQUFRLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxFQUZwQixjQUVvQjt3QkFDdEIsUUFBUSxHQUFHLGFBQU0sRUFBRSxDQUFDO3dCQUNwQixXQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxFQUFBOzt3QkFBMUQsU0FBMEQsQ0FBQzs7O3dCQUU3RCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQzt3QkFDMUIsV0FBTyxRQUFRLEVBQUM7Ozs7S0FDakI7SUFNTyw0Q0FBcUIsR0FBN0IsVUFBaUMsR0FBWTtRQUMzQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDcEIsS0FBSyxFQUFFLGtCQUFTLENBQUMsZUFBZTtZQUNoQyxpQkFBaUIsRUFBRSxHQUFHO1NBQ04sQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUEzVWMsMEJBQWEsR0FBRyxDQUFDLENBQUM7SUFDbEIsc0JBQVMsR0FBRyxDQUFDLENBQUM7SUFDZCxzQkFBUyxHQUFHLENBQUMsQ0FBQztJQUNkLDJCQUFjLEdBQUcsSUFBSSxDQUFDO0lBeVV2QyxtQkFBQztDQUFBLEFBN1VELElBNlVDO0FBN1VZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXJyb3JUeXBlIH0gZnJvbSAnLi9jb25zdHMnO1xuXG5pbXBvcnQgeyBBdXRoQ2xpZW50LCBTaW1wbGVTdG9yYWdlIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG5pbXBvcnQge1xuICBDcmVkZW50aWFscyxcbiAgUmVzcG9uc2VFcnJvcixcbiAgUmVxdWVzdE9wdGlvbnMsXG4gIFJlcXVlc3RGdW5jdGlvbixcbiAgT0F1dGgyQ2xpZW50T3B0aW9ucyxcbiAgQXV0aENsaWVudFJlcXVlc3RPcHRpb25zLFxufSBmcm9tICcuL21vZGVscyc7XG5cbmltcG9ydCB7IHV1aWR2NCB9IGZyb20gJy4uL3V0aWxzL3V1aWQnO1xuXG5pbXBvcnQgeyBTaW5nbGVQcm9taXNlIH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb24vc2luZ2xlLXByb21pc2UnO1xuXG5jb25zdCBSZXF1ZXN0SWRIZWFkZXJOYW1lID0gJ3gtcmVxdWVzdC1pZCc7XG5jb25zdCBEZXZpY2VJZEhlYWRlck5hbWUgPSAneC1kZXZpY2UtaWQnO1xuY29uc3QgRGV2aWNlSWRTZWN0aW9uTmFtZSA9ICdkZXZpY2VfaWQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRvUmVzcG9uc2VFcnJvck9wdGlvbnMge1xuICBlcnJvcj86IEVycm9yVHlwZTtcbiAgZXJyb3JfZGVzY3JpcHRpb24/OiBzdHJpbmcgfCBudWxsO1xuICBlcnJvcl91cmk/OiBzdHJpbmcgfCBudWxsO1xuICBkZXRhaWxzPzogYW55IHwgbnVsbDtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRSZXF1ZXN0OiBSZXF1ZXN0RnVuY3Rpb24gPSBhc3luYyA8VD4oXG4gIHVybDogc3RyaW5nLFxuICBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnMsXG4pOiBQcm9taXNlPFQ+ID0+IHtcbiAgbGV0IHJlc3VsdDogVCB8IG51bGwgPSBudWxsO1xuICBsZXQgcmVzcG9uc2VFcnJvcjogUmVzcG9uc2VFcnJvciB8IG51bGwgPSBudWxsO1xuICB0cnkge1xuICAgIC8vIE9iamVjdHMgbXVzdCBiZSBjb3BpZWQgdG8gcHJldmVudCBtb2RpZmljYXRpb24gb2YgZGF0YSBzdWNoIGFzIGJvZHkuXG4gICAgY29uc3QgY29weU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcbiAgICBpZiAoIWNvcHlPcHRpb25zLm1ldGhvZCkge1xuICAgICAgY29weU9wdGlvbnMubWV0aG9kID0gJ0dFVCc7XG4gICAgfVxuICAgIGlmIChjb3B5T3B0aW9ucy5ib2R5ICYmIHR5cGVvZiBjb3B5T3B0aW9ucy5ib2R5ICE9PSAnc3RyaW5nJykge1xuICAgICAgY29weU9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGNvcHlPcHRpb25zLmJvZHkpO1xuICAgIH1cbiAgICBjb25zdCByZXNwb25zZVJlc3VsdDogUmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIGNvcHlPcHRpb25zKTtcbiAgICBjb25zdCBqc29uUmVzcG9uc2UgPSBhd2FpdCByZXNwb25zZVJlc3VsdC5qc29uKCk7XG4gICAgaWYgKGpzb25SZXNwb25zZT8uZXJyb3IpIHtcbiAgICAgIHJlc3BvbnNlRXJyb3IgPSBqc29uUmVzcG9uc2UgYXMgUmVzcG9uc2VFcnJvcjtcbiAgICAgIHJlc3BvbnNlRXJyb3IuZXJyb3JfdXJpID0gbmV3IFVSTCh1cmwpLnBhdGhuYW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSBqc29uUmVzcG9uc2UgYXMgVDtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzcG9uc2VFcnJvciA9IHtcbiAgICAgIGVycm9yOiBFcnJvclR5cGUuVU5SRUFDSEFCTEUsXG4gICAgICBlcnJvcl9kZXNjcmlwdGlvbjogZXJyb3IubWVzc2FnZSxcbiAgICAgIGVycm9yX3VyaTogbmV3IFVSTCh1cmwpLnBhdGhuYW1lLFxuICAgIH07XG4gIH1cbiAgaWYgKHJlc3BvbnNlRXJyb3IpIHtcbiAgICB0aHJvdyByZXNwb25zZUVycm9yO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB0b1Jlc3BvbnNlRXJyb3IgPSAoXG4gIGVycm9yOiBSZXNwb25zZUVycm9yIHwgRXJyb3IsXG4gIG9wdGlvbnM/OiBUb1Jlc3BvbnNlRXJyb3JPcHRpb25zLFxuKTogUmVzcG9uc2VFcnJvciA9PiB7XG4gIGxldCByZXNwb25zZUVycm9yOiBSZXNwb25zZUVycm9yO1xuICBjb25zdCBmb3JtYXRPcHRpb25zOiBUb1Jlc3BvbnNlRXJyb3JPcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICByZXNwb25zZUVycm9yID0ge1xuICAgICAgZXJyb3I6IGZvcm1hdE9wdGlvbnMuZXJyb3IgfHwgRXJyb3JUeXBlLkxPQ0FMLFxuICAgICAgZXJyb3JfZGVzY3JpcHRpb246IGZvcm1hdE9wdGlvbnMuZXJyb3JfZGVzY3JpcHRpb24gfHwgZXJyb3IubWVzc2FnZSxcbiAgICAgIGVycm9yX3VyaTogZm9ybWF0T3B0aW9ucy5lcnJvcl91cmksXG4gICAgICBkZXRhaWxzOiBmb3JtYXRPcHRpb25zLmRldGFpbHMgfHwgZXJyb3Iuc3RhY2ssXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBmb3JtYXRFcnJvcjogVG9SZXNwb25zZUVycm9yT3B0aW9ucyA9IGVycm9yIHx8IHt9O1xuICAgIHJlc3BvbnNlRXJyb3IgPSB7XG4gICAgICBlcnJvcjogZm9ybWF0T3B0aW9ucy5lcnJvciB8fCBmb3JtYXRFcnJvci5lcnJvciB8fCBFcnJvclR5cGUuTE9DQUwsXG4gICAgICBlcnJvcl9kZXNjcmlwdGlvbjpcbiAgICAgICAgZm9ybWF0T3B0aW9ucy5lcnJvcl9kZXNjcmlwdGlvbiB8fCBmb3JtYXRFcnJvci5lcnJvcl9kZXNjcmlwdGlvbixcbiAgICAgIGVycm9yX3VyaTogZm9ybWF0T3B0aW9ucy5lcnJvcl91cmkgfHwgZm9ybWF0RXJyb3IuZXJyb3JfdXJpLFxuICAgICAgZGV0YWlsczogZm9ybWF0T3B0aW9ucy5kZXRhaWxzIHx8IGZvcm1hdEVycm9yLmRldGFpbHMsXG4gICAgfTtcbiAgfVxuICByZXR1cm4gcmVzcG9uc2VFcnJvcjtcbn07XG5cbi8qKlxuICogR2VuZXJhdGUgcmVxdWVzdCBpZC5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUmVxdWVzdElkKCk6IHN0cmluZyB7XG4gIHJldHVybiB1dWlkdjQoKTtcbn1cblxuXG4vKipcbiAqIERlZmF1bHQgU3RvcmFnZS5cbiAqL1xuY2xhc3MgRGVmYXVsdFN0b3JhZ2UgaW1wbGVtZW50cyBTaW1wbGVTdG9yYWdlIHtcbiAgLyoqXG4gICAgICogR2V0IGl0ZW0uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqL1xuICBhc3luYyBnZXRJdGVtKGtleTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICB9XG5cbiAgLyoqXG4gICAgICogUmVtb3ZlIGl0ZW0uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqL1xuICBhc3luYyByZW1vdmVJdGVtKGtleTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gIH1cblxuICAvKipcbiAgICAgKiBTZXQgaXRlbS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAgICovXG4gIGFzeW5jIHNldEl0ZW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICAgKiBHZXQgaXRlbSBzeW5jLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKi9cbiAgZ2V0SXRlbVN5bmMoa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gIH1cblxuICAvKipcbiAgICAgKiBSZW1vdmUgaXRlbSBzeW5jLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKi9cbiAgcmVtb3ZlSXRlbVN5bmMoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgICAqIFNldCBpdGVtIHN5bmMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgICAqL1xuICBzZXRJdGVtU3luYyhrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdFN0b3JhZ2UgPSBuZXcgRGVmYXVsdFN0b3JhZ2UoKTtcblxuaW50ZXJmYWNlIExvY2FsQ3JlZGVudGlhbHNPcHRpb25zIHtcbiAgdG9rZW5TZWN0aW9uTmFtZTogc3RyaW5nO1xuICBzdG9yYWdlOiBTaW1wbGVTdG9yYWdlO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGNyZWRlbnRpYWxzIGlzIGV4cGlyZWQuXG4gKiBAcGFyYW0ge0NyZWRlbnRpYWxzfSBjcmVkZW50aWFsc1xuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNDcmVkZW50aWFsc0V4cGlyZWQoY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzKTogYm9vbGVhbiB7XG4gIGxldCBpc0V4cGlyZWQgPSB0cnVlO1xuICBpZiAoY3JlZGVudGlhbHM/LmV4cGlyZXNfYXQgJiYgY3JlZGVudGlhbHM/LmFjY2Vzc190b2tlbikge1xuICAgIGlzRXhwaXJlZCA9IGNyZWRlbnRpYWxzLmV4cGlyZXNfYXQgPCBuZXcgRGF0ZSgpO1xuICB9XG4gIHJldHVybiBpc0V4cGlyZWQ7XG59XG5cbi8qKlxuICogTG9jYWwgY3JlZGVudGlhbHMuXG4gKiBMb2NhbCBjcmVkZW50aWFscywgd2l0aCBtZW1vcnkgY2FjaGUgYW5kIHN0b3JhZ2UgY2FjaGUuXG4gKiBJZiB0aGUgbWVtb3J5IGNhY2hlIGV4cGlyZXMsIHRoZSBzdG9yYWdlIGNhY2hlIGlzIGF1dG9tYXRpY2FsbHkgbG9hZGVkLlxuICovXG5leHBvcnQgY2xhc3MgTG9jYWxDcmVkZW50aWFscyB7XG4gIHByaXZhdGUgX3Rva2VuU2VjdGlvbk5hbWU6IHN0cmluZztcblxuICBwcml2YXRlIF9zdG9yYWdlOiBTaW1wbGVTdG9yYWdlO1xuXG4gIHByaXZhdGUgX2NyZWRlbnRpYWxzOiBDcmVkZW50aWFscyB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgX3NpbmdsZVByb21pc2U6IFNpbmdsZVByb21pc2UgPSBuZXcgU2luZ2xlUHJvbWlzZSgpO1xuXG4gIC8qKlxuICAgKiBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0xvY2FsQ3JlZGVudGlhbHNPcHRpb25zfSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBMb2NhbENyZWRlbnRpYWxzT3B0aW9ucykge1xuICAgIHRoaXMuX3Rva2VuU2VjdGlvbk5hbWUgPSBvcHRpb25zLnRva2VuU2VjdGlvbk5hbWU7XG4gICAgdGhpcy5fc3RvcmFnZSA9IG9wdGlvbnMuc3RvcmFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRDcmVkZW50aWFscyBQcm92aWRlcyBhbiBhbHRlcm5hdGl2ZSBmZXRjaCBhcGkgcmVxdWVzdCBpbXBsZW1lbnRhdGlvbiB3aXRoIGF1dGggY3JlZGVudGlhbHNcbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZGVudGlhbHNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZXRDcmVkZW50aWFscyhjcmVkZW50aWFscz86IENyZWRlbnRpYWxzKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGNyZWRlbnRpYWxzPy5leHBpcmVzX2luKSB7XG4gICAgICBjcmVkZW50aWFscy5leHBpcmVzX2F0ID0gbmV3IERhdGUoXG4gICAgICAgIERhdGUubm93KCkgKyAoY3JlZGVudGlhbHMuZXhwaXJlc19pbiAtIDMwKSAqIDEwMDAsXG4gICAgICApO1xuICAgICAgaWYgKHRoaXMuX3N0b3JhZ2UpIHtcbiAgICAgICAgY29uc3QgdG9rZW5TdHI6IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGNyZWRlbnRpYWxzKTtcbiAgICAgICAgYXdhaXQgdGhpcy5fc3RvcmFnZS5zZXRJdGVtKHRoaXMuX3Rva2VuU2VjdGlvbk5hbWUsIHRva2VuU3RyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2NyZWRlbnRpYWxzID0gY3JlZGVudGlhbHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9zdG9yYWdlKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3N0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLl90b2tlblNlY3Rpb25OYW1lKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2NyZWRlbnRpYWxzID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNyZWRlbnRpYWxzLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzIHwgbnVsbD59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0Q3JlZGVudGlhbHMoKTogUHJvbWlzZTxDcmVkZW50aWFscyB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fc2luZ2xlUHJvbWlzZS5ydW4oJ2dldENyZWRlbnRpYWxzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKGlzQ3JlZGVudGlhbHNFeHBpcmVkKHRoaXMuX2NyZWRlbnRpYWxzKSkge1xuICAgICAgICB0aGlzLl9jcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2dldFN0b3JhZ2VDcmVkZW50aWFscygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX2NyZWRlbnRpYWxzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBzdG9yYWdlIGNyZWRlbnRpYWxzLlxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfZ2V0U3RvcmFnZUNyZWRlbnRpYWxzKCk6IFByb21pc2U8Q3JlZGVudGlhbHMgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NpbmdsZVByb21pc2UucnVuKCdfZ2V0U3RvcmFnZUNyZWRlbnRpYWxzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IG51bGw7XG4gICAgICBjb25zdCB0b2tlblN0cjogc3RyaW5nID0gYXdhaXQgdGhpcy5fc3RvcmFnZS5nZXRJdGVtKFxuICAgICAgICB0aGlzLl90b2tlblNlY3Rpb25OYW1lLFxuICAgICAgKTtcbiAgICAgIGlmICh0b2tlblN0ciAhPT0gdW5kZWZpbmVkICYmIHRva2VuU3RyICE9PSBudWxsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY3JlZGVudGlhbHMgPSBKU09OLnBhcnNlKHRva2VuU3RyKTtcbiAgICAgICAgICBpZiAoY3JlZGVudGlhbHM/LmV4cGlyZXNfYXQpIHtcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzLmV4cGlyZXNfYXQgPSBuZXcgRGF0ZShjcmVkZW50aWFscy5leHBpcmVzX2F0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fc3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuX3Rva2VuU2VjdGlvbk5hbWUpO1xuICAgICAgICAgIGNyZWRlbnRpYWxzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNyZWRlbnRpYWxzO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIF9nZXRTdG9yYWdlQ3JlZGVudGlhbHNTeW5jKCk6IENyZWRlbnRpYWxzIHwgbnVsbCB7XG4gICAgbGV0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IG51bGw7XG4gICAgY29uc3QgdG9rZW5TdHI6IHN0cmluZyA9IHRoaXMuX3N0b3JhZ2UuZ2V0SXRlbVN5bmMoXG4gICAgICB0aGlzLl90b2tlblNlY3Rpb25OYW1lLFxuICAgICk7XG4gICAgaWYgKHRva2VuU3RyICE9PSB1bmRlZmluZWQgJiYgdG9rZW5TdHIgIT09IG51bGwpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNyZWRlbnRpYWxzID0gSlNPTi5wYXJzZSh0b2tlblN0cik7XG4gICAgICAgIGlmIChjcmVkZW50aWFscz8uZXhwaXJlc19hdCkge1xuICAgICAgICAgIGNyZWRlbnRpYWxzLmV4cGlyZXNfYXQgPSBuZXcgRGF0ZShjcmVkZW50aWFscy5leHBpcmVzX2F0KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5fc3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuX3Rva2VuU2VjdGlvbk5hbWUpO1xuICAgICAgICBjcmVkZW50aWFscyA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjcmVkZW50aWFsc1xuICB9XG5cbn1cblxuLyoqXG4gKiBPQXV0aDJDbGllbnRcbiAqL1xuZXhwb3J0IGNsYXNzIE9BdXRoMkNsaWVudCBpbXBsZW1lbnRzIEF1dGhDbGllbnQge1xuICBwcml2YXRlIHN0YXRpYyBfZGVmYXVsdFJldHJ5ID0gMjtcbiAgcHJpdmF0ZSBzdGF0aWMgX21pblJldHJ5ID0gMDtcbiAgcHJpdmF0ZSBzdGF0aWMgX21heFJldHJ5ID0gNTtcbiAgcHJpdmF0ZSBzdGF0aWMgX3JldHJ5SW50ZXJ2YWwgPSAxMDAwO1xuXG4gIHByaXZhdGUgX2FwaU9yaWdpbjogc3RyaW5nO1xuICBwcml2YXRlIF9jbGllbnRJZDogc3RyaW5nO1xuICBwcml2YXRlIF9yZXRyeTogbnVtYmVyO1xuICBwcml2YXRlIF9jbGllbnRTZWNyZXQ/OiBzdHJpbmc7XG4gIHByaXZhdGUgX2Jhc2VSZXF1ZXN0OiA8VD4oXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zLFxuICApID0+IFByb21pc2U8VD47XG4gIHByaXZhdGUgX2xvY2FsQ3JlZGVudGlhbHM6IExvY2FsQ3JlZGVudGlhbHM7XG4gIHByaXZhdGUgX3N0b3JhZ2U6IFNpbXBsZVN0b3JhZ2U7XG4gIHByaXZhdGUgX2RldmljZUlEPzogc3RyaW5nO1xuICBwcml2YXRlIF90b2tlbkluVVJMPzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfcmVmcmVzaFRva2VuRnVuYzogKHJlZnJlc2hUb2tlbj86IHN0cmluZykgPT4gUHJvbWlzZTxDcmVkZW50aWFscz47XG4gIHByaXZhdGUgX2hlYWRlcnM/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xuICBwcml2YXRlIF9zaW5nbGVQcm9taXNlOiBTaW5nbGVQcm9taXNlID0gbmV3IFNpbmdsZVByb21pc2UoKTtcblxuICAvKipcbiAgICogY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPQXV0aDJDbGllbnRPcHRpb25zfSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPQXV0aDJDbGllbnRPcHRpb25zKSB7XG4gICAgdGhpcy5fYXBpT3JpZ2luID0gb3B0aW9ucy5hcGlPcmlnaW47XG4gICAgdGhpcy5fY2xpZW50SWQgPSBvcHRpb25zLmNsaWVudElkO1xuICAgIHRoaXMuX3JldHJ5ID0gdGhpcy5fZm9ybWF0UmV0cnkob3B0aW9ucy5yZXRyeSwgT0F1dGgyQ2xpZW50Ll9kZWZhdWx0UmV0cnkpO1xuICAgIGlmIChvcHRpb25zLmJhc2VSZXF1ZXN0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fYmFzZVJlcXVlc3QgPSBvcHRpb25zLmJhc2VSZXF1ZXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9iYXNlUmVxdWVzdCA9IGRlZmF1bHRSZXF1ZXN0O1xuICAgIH1cbiAgICB0aGlzLl90b2tlbkluVVJMID0gb3B0aW9ucy50b2tlbkluVVJMO1xuICAgIHRoaXMuX2hlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnM7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMuX3N0b3JhZ2UgPSBvcHRpb25zLnN0b3JhZ2UgfHwgZGVmYXVsdFN0b3JhZ2U7XG4gICAgdGhpcy5fbG9jYWxDcmVkZW50aWFscyA9IG5ldyBMb2NhbENyZWRlbnRpYWxzKHtcbiAgICAgIHRva2VuU2VjdGlvbk5hbWU6ICdjcmVkZW50aWFsc18nICsgb3B0aW9ucy5jbGllbnRJZCxcbiAgICAgIHN0b3JhZ2U6IHRoaXMuX3N0b3JhZ2UsXG4gICAgfSk7XG4gICAgdGhpcy5fY2xpZW50U2VjcmV0ID0gb3B0aW9ucy5jbGllbnRTZWNyZXQ7XG4gICAgdGhpcy5fcmVmcmVzaFRva2VuRnVuYyA9XG4gICAgICBvcHRpb25zLnJlZnJlc2hUb2tlbkZ1bmMgfHwgdGhpcy5fZGVmYXVsdFJlZnJlc2hUb2tlbkZ1bmM7XG4gIH1cblxuICAvKipcbiAgICogc2V0Q3JlZGVudGlhbHMgUHJvdmlkZXMgYW4gYWx0ZXJuYXRpdmUgZmV0Y2ggYXBpIHJlcXVlc3QgaW1wbGVtZW50YXRpb24gd2l0aCBhdXRoIGNyZWRlbnRpYWxzXG4gICAqIEBwYXJhbSB7Q3JlZGVudGlhbHN9IGNyZWRlbnRpYWxzXG4gICAqIEByZXR1cm4ge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBwdWJsaWMgc2V0Q3JlZGVudGlhbHMoY3JlZGVudGlhbHM/OiBDcmVkZW50aWFscyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9sb2NhbENyZWRlbnRpYWxzLnNldENyZWRlbnRpYWxzKGNyZWRlbnRpYWxzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXRBY2Nlc3NUb2tlbiByZXR1cm4gYSB2YWxpZGF0ZSBhY2Nlc3MgdG9rZW5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRBY2Nlc3NUb2tlbigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2dldENyZWRlbnRpYWxzKCk7XG4gICAgaWYgKGNyZWRlbnRpYWxzPy5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3JlZGVudGlhbHMuYWNjZXNzX3Rva2VuKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHsgZXJyb3I6IEVycm9yVHlwZS5VTkFVVEhFTlRJQ0FURUQgfSBhcyBSZXNwb25zZUVycm9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXF1ZXN0IGh0dHAgbGlrZSBzaW1wbGUgZmV0Y2ggYXBpLCBleHA6cmVxdWVzdCgnL3YxL3VzZXIvbWUnLCB7d2l0aENyZWRlbnRpYWxzOnRydWV9KVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqIEBwYXJhbSB7QXV0aENsaWVudFJlcXVlc3RPcHRpb25zfSBvcHRpb25zXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcmVxdWVzdDxUPihcbiAgICB1cmw6IHN0cmluZyxcbiAgICBvcHRpb25zPzogQXV0aENsaWVudFJlcXVlc3RPcHRpb25zLFxuICApOiBQcm9taXNlPFQ+IHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgY29uc3QgcmV0cnk6IG51bWJlciA9IHRoaXMuX2Zvcm1hdFJldHJ5KG9wdGlvbnMucmV0cnksIHRoaXMuX3JldHJ5KTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwge307XG4gICAgaWYgKHRoaXMuX2hlYWRlcnMpIHtcbiAgICAgIG9wdGlvbnMuaGVhZGVycyA9IHtcbiAgICAgICAgLi4udGhpcy5faGVhZGVycyxcbiAgICAgICAgLi4ub3B0aW9ucy5oZWFkZXJzLFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zLmhlYWRlcnNbUmVxdWVzdElkSGVhZGVyTmFtZV0pIHtcbiAgICAgIG9wdGlvbnMuaGVhZGVyc1tSZXF1ZXN0SWRIZWFkZXJOYW1lXSA9IGdlbmVyYXRlUmVxdWVzdElkKCk7XG4gICAgfVxuICAgIGlmICghb3B0aW9ucy5oZWFkZXJzW0RldmljZUlkSGVhZGVyTmFtZV0pIHtcbiAgICAgIGNvbnN0IGRldmljZUlkID0gYXdhaXQgdGhpcy5fZ2V0RGV2aWNlSWQoKTtcbiAgICAgIG9wdGlvbnMuaGVhZGVyc1tEZXZpY2VJZEhlYWRlck5hbWVdID0gZGV2aWNlSWQ7XG4gICAgfVxuICAgIGlmIChvcHRpb25zPy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fZ2V0Q3JlZGVudGlhbHMoKTtcbiAgICAgIGlmIChjcmVkZW50aWFscykge1xuICAgICAgICBpZiAodGhpcy5fdG9rZW5JblVSTCkge1xuICAgICAgICAgIGlmICh1cmwuaW5kZXhPZignPycpIDwgMCkge1xuICAgICAgICAgICAgdXJsICs9ICc/JztcbiAgICAgICAgICB9XG4gICAgICAgICAgdXJsICs9ICdhY2Nlc3NfdG9rZW49JyArIGNyZWRlbnRpYWxzLmFjY2Vzc190b2tlbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zLmhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9XG4gICAgICAgICAgICBjcmVkZW50aWFscy50b2tlbl90eXBlICsgJyAnICsgY3JlZGVudGlhbHMuYWNjZXNzX3Rva2VuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9jbGllbnRJZCAmJiB1cmwuaW5kZXhPZignY2xpZW50X2lkJykgPCAwKSB7XG4gICAgICAgIHVybCArPSB1cmwuaW5kZXhPZignPycpIDwgMCA/ICc/JyA6ICcmJztcbiAgICAgICAgdXJsICs9ICdjbGllbnRfaWQ9JyArIHRoaXMuX2NsaWVudElkO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodXJsLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgdXJsID0gdGhpcy5fYXBpT3JpZ2luICsgdXJsO1xuICAgIH1cbiAgICBsZXQgcmVzcG9uc2U6IFQgfCBudWxsID0gbnVsbDtcbiAgICBjb25zdCBtYXhSZXF1ZXN0VGltZXM6IG51bWJlciA9IHJldHJ5ICsgMTtcbiAgICBmb3IgKFxuICAgICAgbGV0IHJlcXVlc3RUaW1lID0gMDtcbiAgICAgIHJlcXVlc3RUaW1lIDwgbWF4UmVxdWVzdFRpbWVzO1xuICAgICAgcmVxdWVzdFRpbWUrK1xuICAgICkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9iYXNlUmVxdWVzdDxUPih1cmwsIG9wdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gY2F0Y2ggKHJlc3BvbnNlRXJyb3IpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHJlcXVlc3RUaW1lID09PSByZXRyeSB8fFxuICAgICAgICAgICFyZXNwb25zZUVycm9yIHx8XG4gICAgICAgICAgcmVzcG9uc2VFcnJvci5lcnJvciAhPT0gJ3VucmVhY2hhYmxlJ1xuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2VFcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGF3YWl0IHRoaXMuX3NsZWVwKE9BdXRoMkNsaWVudC5fcmV0cnlJbnRlcnZhbCk7XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayByZXRyeSB2YWx1ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHJldHJ5XG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIHByaXZhdGUgX2NoZWNrUmV0cnkocmV0cnk6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHJlc3BvbnNlRXJyb3I6IFJlc3BvbnNlRXJyb3IgfCBudWxsID0gbnVsbDtcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgcmV0cnkgIT09ICdudW1iZXInIHx8XG4gICAgICByZXRyeSA8IE9BdXRoMkNsaWVudC5fbWluUmV0cnkgfHxcbiAgICAgIHJldHJ5ID4gT0F1dGgyQ2xpZW50Ll9tYXhSZXRyeVxuICAgICkge1xuICAgICAgcmVzcG9uc2VFcnJvciA9IHtcbiAgICAgICAgZXJyb3I6IEVycm9yVHlwZS5VTlJFQUNIQUJMRSxcbiAgICAgICAgZXJyb3JfZGVzY3JpcHRpb246ICd3cm9uZyBvcHRpb25zIHBhcmFtOiByZXRyeScsXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAocmVzcG9uc2VFcnJvcikge1xuICAgICAgdGhyb3cgcmVzcG9uc2VFcnJvcjtcbiAgICB9XG4gICAgcmV0dXJuIHJldHJ5O1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCByZXRyeSB2YWx1ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHJldHJ5XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkZWZhdWx0VmFsZVxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBwcml2YXRlIF9mb3JtYXRSZXRyeShyZXRyeTogbnVtYmVyLCBkZWZhdWx0VmFsZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodHlwZW9mIHJldHJ5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIGRlZmF1bHRWYWxlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fY2hlY2tSZXRyeShyZXRyeSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNsZWVwLlxuICAgKiBAcGFyYW0ge251bWJlcn0gbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgX3NsZWVwKG1zOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9LCBtcyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaCBleHBpcmVkIHRva2VuLlxuICAgKiBAcGFyYW0ge0NyZWRlbnRpYWxzfSBjcmVkZW50aWFsc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzPn1cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgX3JlZnJlc2hUb2tlbihjcmVkZW50aWFsczogQ3JlZGVudGlhbHMpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NpbmdsZVByb21pc2UucnVuKCdfcmVmcmVzaFRva2VuJywgYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCFjcmVkZW50aWFscyB8fCAhY3JlZGVudGlhbHMucmVmcmVzaF90b2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy5fdW5BdXRoZW50aWNhdGVkRXJyb3IoJ25vIHJlZnJlc2ggdG9rZW4gZm91bmQgaW4gY3JlZGVudGlhbHMnKTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IG5ld0NyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX3JlZnJlc2hUb2tlbkZ1bmMoXG4gICAgICAgICAgY3JlZGVudGlhbHMucmVmcmVzaF90b2tlbixcbiAgICAgICAgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5fbG9jYWxDcmVkZW50aWFscy5zZXRDcmVkZW50aWFscyhuZXdDcmVkZW50aWFscyk7XG4gICAgICAgIHJldHVybiBuZXdDcmVkZW50aWFsc1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yLmVycm9yID09PSBFcnJvclR5cGUuSU5WQUxJRF9HUkFOVCkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX2xvY2FsQ3JlZGVudGlhbHMuc2V0Q3JlZGVudGlhbHMobnVsbCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX3VuQXV0aGVudGljYXRlZEVycm9yKGVycm9yLmVycm9yX2Rlc2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGFub255bW91cyBzaWduSW5cbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZGVudGlhbHNcbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59XG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9hbm9ueW1vdXNTaWduSW4oY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIHJldHVybiB0aGlzLl9zaW5nbGVQcm9taXNlLnJ1bignX2Fub255bW91cycsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghY3JlZGVudGlhbHMgfHwgY3JlZGVudGlhbHMuc2NvcGUgIT09ICdhbm9ueW1vdXMnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91bkF1dGhlbnRpY2F0ZWRFcnJvcignbm8gYW5vbnltb3VzIGluIGNyZWRlbnRpYWxzJyk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBuZXdDcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLnJlcXVlc3QoJy9hdXRoL3YxL3NpZ25pbi9hbm9ueW1vdXNseScsIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBjbGllbnRfaWQ6IHRoaXMuX2NsaWVudElkLFxuICAgICAgICAgICAgY2xpZW50X3NlY3JldDogdGhpcy5fY2xpZW50U2VjcmV0LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLl9sb2NhbENyZWRlbnRpYWxzLnNldENyZWRlbnRpYWxzKG5ld0NyZWRlbnRpYWxzKTtcbiAgICAgICAgcmV0dXJuIG5ld0NyZWRlbnRpYWxzXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IuZXJyb3IgPT09IEVycm9yVHlwZS5JTlZBTElEX0dSQU5UKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fbG9jYWxDcmVkZW50aWFscy5zZXRDcmVkZW50aWFscyhudWxsKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fdW5BdXRoZW50aWNhdGVkRXJyb3IoZXJyb3IuZXJyb3JfZGVzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVmYXVsdCByZWZyZXNoIHRva2VuIGZ1bmN0aW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVmcmVzaFRva2VuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fVxuICAgKi9cbiAgcHJpdmF0ZSBfZGVmYXVsdFJlZnJlc2hUb2tlbkZ1bmMoXG4gICAgcmVmcmVzaFRva2VuPzogc3RyaW5nLFxuICApOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgaWYgKHJlZnJlc2hUb2tlbiA9PT0gdW5kZWZpbmVkIHx8IHJlZnJlc2hUb2tlbiA9PT0gJycpIHtcbiAgICAgIHJldHVybiB0aGlzLl91bkF1dGhlbnRpY2F0ZWRFcnJvcigncmVmcmVzaCB0b2tlbiBub3QgZm91bmQnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnL2F1dGgvdjEvdG9rZW4nLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgY2xpZW50X2lkOiB0aGlzLl9jbGllbnRJZCxcbiAgICAgICAgY2xpZW50X3NlY3JldDogdGhpcy5fY2xpZW50U2VjcmV0LFxuICAgICAgICBncmFudF90eXBlOiAncmVmcmVzaF90b2tlbicsXG4gICAgICAgIHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlbixcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNyZWRlbnRpYWxzLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIF9nZXRDcmVkZW50aWFscygpOiBQcm9taXNlPENyZWRlbnRpYWxzIHwgbnVsbD4ge1xuICAgIGxldCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9sb2NhbENyZWRlbnRpYWxzLmdldENyZWRlbnRpYWxzKCk7XG4gICAgaWYgKGlzQ3JlZGVudGlhbHNFeHBpcmVkKGNyZWRlbnRpYWxzKSkge1xuICAgICAgaWYgKGNyZWRlbnRpYWxzICYmIGNyZWRlbnRpYWxzLnNjb3BlID09PSAnYW5vbnltb3VzJykge1xuICAgICAgICBjcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2Fub255bW91c1NpZ25JbihjcmVkZW50aWFscylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fcmVmcmVzaFRva2VuKGNyZWRlbnRpYWxzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNyZWRlbnRpYWxzO1xuICB9XG5cbiAgcHVibGljIGdldENyZWRlbnRpYWxzU3luYygpOiBDcmVkZW50aWFscyB8IG51bGwge1xuICAgIGNvbnN0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IHRoaXMuX2xvY2FsQ3JlZGVudGlhbHMuX2dldFN0b3JhZ2VDcmVkZW50aWFsc1N5bmMoKTtcbiAgICByZXR1cm4gY3JlZGVudGlhbHNcbiAgfVxuXG4gIHB1YmxpYyBnZXRDcmVkZW50aWFsc0FzeW5jKCk6IFByb21pc2U8Q3JlZGVudGlhbHMgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsQ3JlZGVudGlhbHMuZ2V0Q3JlZGVudGlhbHMoKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFNjb3BlKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgbGV0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2xvY2FsQ3JlZGVudGlhbHMuZ2V0Q3JlZGVudGlhbHMoKTtcbiAgICBpZiAoY3JlZGVudGlhbHMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3VuQXV0aGVudGljYXRlZEVycm9yKFwiY3JlZGVudGlhbHMgbm90IGZvdW5kXCIpXG4gICAgfVxuICAgIHJldHVybiBjcmVkZW50aWFscy5zY29wZTtcbiAgfVxuXG5cblxuICAvKipcbiAgICogR2V0IGRldmljZUlkXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9nZXREZXZpY2VJZCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGlmICh0aGlzLl9kZXZpY2VJRCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2RldmljZUlEO1xuICAgIH1cbiAgICBsZXQgZGV2aWNlSWQ6IHN0cmluZyA9IGF3YWl0IHRoaXMuX3N0b3JhZ2UuZ2V0SXRlbShcbiAgICAgIERldmljZUlkU2VjdGlvbk5hbWUsXG4gICAgKTtcbiAgICBpZiAoISh0eXBlb2YgZGV2aWNlSWQgPT09ICdzdHJpbmcnICYmXG4gICAgICBkZXZpY2VJZC5sZW5ndGggPj0gMTYgJiZcbiAgICAgIGRldmljZUlkLmxlbmd0aCA8PSA0OCkpIHtcbiAgICAgIGRldmljZUlkID0gdXVpZHY0KCk7XG4gICAgICBhd2FpdCB0aGlzLl9zdG9yYWdlLnNldEl0ZW0oRGV2aWNlSWRTZWN0aW9uTmFtZSwgZGV2aWNlSWQpO1xuICAgIH1cbiAgICB0aGlzLl9kZXZpY2VJRCA9IGRldmljZUlkO1xuICAgIHJldHVybiBkZXZpY2VJZDtcbiAgfVxuICAvKipcbiAgICogR2VuZXJhdGUgdW5BdXRoZW50aWNhdGVkIGVycm9yLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VD59XG4gICAqL1xuICBwcml2YXRlIF91bkF1dGhlbnRpY2F0ZWRFcnJvcjxUPihlcnI/OiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoe1xuICAgICAgZXJyb3I6IEVycm9yVHlwZS5VTkFVVEhFTlRJQ0FURUQsXG4gICAgICBlcnJvcl9kZXNjcmlwdGlvbjogZXJyLFxuICAgIH0gYXMgUmVzcG9uc2VFcnJvcik7XG4gIH1cbn1cbiJdfQ==