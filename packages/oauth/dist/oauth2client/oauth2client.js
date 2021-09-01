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
                if (jsonResponse && jsonResponse.error) {
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
                                    if (credentials && credentials.expires_at) {
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
                        if (credentials && credentials.access_token) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgyY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29hdXRoMmNsaWVudC9vYXV0aDJjbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBbUM7QUFhbkMsc0NBQXFDO0FBRXJDLG1FQUErRDtBQUUvRCxJQUFNLG1CQUFtQixHQUFHLGNBQWMsQ0FBQztBQUMzQyxJQUFNLGtCQUFrQixHQUFHLGFBQWEsQ0FBQztBQUN6QyxJQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQztBQVMzQixRQUFBLGNBQWMsR0FBb0IsVUFDM0MsR0FBVyxFQUNYLE9BQXdCOzs7OztnQkFFcEIsTUFBTSxHQUFhLElBQUksQ0FBQztnQkFDeEIsYUFBYSxHQUF5QixJQUFJLENBQUM7Ozs7Z0JBR3JDLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JCLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2lCQUM5QjtnQkFDRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLElBQUksT0FBTyxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDMUQsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDdkQ7Z0JBQ2dDLFdBQU0sS0FBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsRUFBQTs7Z0JBQXhELGNBQWMsR0FBYSxTQUE2QjtnQkFDekMsV0FBTSxjQUFjLENBQUMsSUFBSSxFQUFFLEVBQUE7O2dCQUExQyxZQUFZLEdBQUcsU0FBMkI7Z0JBQ2hELElBQUksWUFBWSxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUU7b0JBQ3BDLGFBQWEsR0FB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Q0FBQyxNQUFNLENBQUM7WUFDbEIsS0FBSyxFQUFFLGtCQUFTLENBQUMsZUFBZTtZQUNoQyxpQkFBaUIsRUFBRSxHQUFHO1NBQ1IsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUF4VGMsMEJBQWEsR0FBRyxDQUFDLENBQUM7SUFDbEIsc0JBQVMsR0FBRyxDQUFDLENBQUM7SUFDZCxzQkFBUyxHQUFHLENBQUMsQ0FBQztJQUNkLDJCQUFjLEdBQUcsSUFBSSxDQUFDO0lBc1R6QyxtQkFBQztDQUFBLEFBMVRELElBMFRDO0FBMVRZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFcnJvclR5cGV9IGZyb20gJy4vY29uc3RzJztcblxuaW1wb3J0IHtBdXRoQ2xpZW50LCBTaW1wbGVTdG9yYWdlfSBmcm9tICcuL2ludGVyZmFjZSc7XG5cbmltcG9ydCB7XG4gICAgQ3JlZGVudGlhbHMsXG4gICAgUmVzcG9uc2VFcnJvcixcbiAgICBSZXF1ZXN0T3B0aW9ucyxcbiAgICBSZXF1ZXN0RnVuY3Rpb24sXG4gICAgT0F1dGgyQ2xpZW50T3B0aW9ucyxcbiAgICBBdXRoQ2xpZW50UmVxdWVzdE9wdGlvbnMsXG59IGZyb20gJy4vbW9kZWxzJztcblxuaW1wb3J0IHt1dWlkdjR9IGZyb20gJy4uL3V0aWxzL3V1aWQnO1xuXG5pbXBvcnQge1NpbmdsZVByb21pc2V9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uL3NpbmdsZS1wcm9taXNlJztcblxuY29uc3QgUmVxdWVzdElkSGVhZGVyTmFtZSA9ICd4LXJlcXVlc3QtaWQnO1xuY29uc3QgRGV2aWNlSWRIZWFkZXJOYW1lID0gJ3gtZGV2aWNlLWlkJztcbmNvbnN0IERldmljZUlkU2VjdGlvbk5hbWUgPSAnZGV2aWNlX2lkJztcblxuZXhwb3J0IGludGVyZmFjZSBUb1Jlc3BvbnNlRXJyb3JPcHRpb25zIHtcbiAgICBlcnJvcj86IEVycm9yVHlwZTtcbiAgICBlcnJvcl9kZXNjcmlwdGlvbj86IHN0cmluZyB8IG51bGw7XG4gICAgZXJyb3JfdXJpPzogc3RyaW5nIHwgbnVsbDtcbiAgICBkZXRhaWxzPzogYW55IHwgbnVsbDtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRSZXF1ZXN0OiBSZXF1ZXN0RnVuY3Rpb24gPSBhc3luYyA8VD4oXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zLFxuKTogUHJvbWlzZTxUPiA9PiB7XG4gICAgbGV0IHJlc3VsdDogVCB8IG51bGwgPSBudWxsO1xuICAgIGxldCByZXNwb25zZUVycm9yOiBSZXNwb25zZUVycm9yIHwgbnVsbCA9IG51bGw7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gT2JqZWN0cyBtdXN0IGJlIGNvcGllZCB0byBwcmV2ZW50IG1vZGlmaWNhdGlvbiBvZiBkYXRhIHN1Y2ggYXMgYm9keS5cbiAgICAgICAgY29uc3QgY29weU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcbiAgICAgICAgaWYgKCFjb3B5T3B0aW9ucy5tZXRob2QpIHtcbiAgICAgICAgICAgIGNvcHlPcHRpb25zLm1ldGhvZCA9ICdHRVQnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3B5T3B0aW9ucy5ib2R5ICYmIHR5cGVvZiBjb3B5T3B0aW9ucy5ib2R5ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29weU9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGNvcHlPcHRpb25zLmJvZHkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlUmVzdWx0OiBSZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgY29weU9wdGlvbnMpO1xuICAgICAgICBjb25zdCBqc29uUmVzcG9uc2UgPSBhd2FpdCByZXNwb25zZVJlc3VsdC5qc29uKCk7XG4gICAgICAgIGlmIChqc29uUmVzcG9uc2UgJiYganNvblJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICByZXNwb25zZUVycm9yID0ganNvblJlc3BvbnNlIGFzIFJlc3BvbnNlRXJyb3I7XG4gICAgICAgICAgICByZXNwb25zZUVycm9yLmVycm9yX3VyaSA9IG5ldyBVUkwodXJsKS5wYXRobmFtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGpzb25SZXNwb25zZSBhcyBUO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmVzcG9uc2VFcnJvciA9IHtcbiAgICAgICAgICAgIGVycm9yOiBFcnJvclR5cGUuVU5SRUFDSEFCTEUsXG4gICAgICAgICAgICBlcnJvcl9kZXNjcmlwdGlvbjogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICAgIGVycm9yX3VyaTogbmV3IFVSTCh1cmwpLnBhdGhuYW1lLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAocmVzcG9uc2VFcnJvcikge1xuICAgICAgICB0aHJvdyByZXNwb25zZUVycm9yO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHRvUmVzcG9uc2VFcnJvciA9IChcbiAgICBlcnJvcjogUmVzcG9uc2VFcnJvciB8IEVycm9yLFxuICAgIG9wdGlvbnM/OiBUb1Jlc3BvbnNlRXJyb3JPcHRpb25zLFxuKTogUmVzcG9uc2VFcnJvciA9PiB7XG4gICAgbGV0IHJlc3BvbnNlRXJyb3I6IFJlc3BvbnNlRXJyb3I7XG4gICAgY29uc3QgZm9ybWF0T3B0aW9uczogVG9SZXNwb25zZUVycm9yT3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgcmVzcG9uc2VFcnJvciA9IHtcbiAgICAgICAgICAgIGVycm9yOiBmb3JtYXRPcHRpb25zLmVycm9yIHx8IEVycm9yVHlwZS5MT0NBTCxcbiAgICAgICAgICAgIGVycm9yX2Rlc2NyaXB0aW9uOiBmb3JtYXRPcHRpb25zLmVycm9yX2Rlc2NyaXB0aW9uIHx8IGVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgICBlcnJvcl91cmk6IGZvcm1hdE9wdGlvbnMuZXJyb3JfdXJpLFxuICAgICAgICAgICAgZGV0YWlsczogZm9ybWF0T3B0aW9ucy5kZXRhaWxzIHx8IGVycm9yLnN0YWNrLFxuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdEVycm9yOiBUb1Jlc3BvbnNlRXJyb3JPcHRpb25zID0gZXJyb3IgfHwge307XG4gICAgICAgIHJlc3BvbnNlRXJyb3IgPSB7XG4gICAgICAgICAgICBlcnJvcjogZm9ybWF0T3B0aW9ucy5lcnJvciB8fCBmb3JtYXRFcnJvci5lcnJvciB8fCBFcnJvclR5cGUuTE9DQUwsXG4gICAgICAgICAgICBlcnJvcl9kZXNjcmlwdGlvbjpcbiAgICAgICAgICAgICAgICBmb3JtYXRPcHRpb25zLmVycm9yX2Rlc2NyaXB0aW9uIHx8IGZvcm1hdEVycm9yLmVycm9yX2Rlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZXJyb3JfdXJpOiBmb3JtYXRPcHRpb25zLmVycm9yX3VyaSB8fCBmb3JtYXRFcnJvci5lcnJvcl91cmksXG4gICAgICAgICAgICBkZXRhaWxzOiBmb3JtYXRPcHRpb25zLmRldGFpbHMgfHwgZm9ybWF0RXJyb3IuZGV0YWlscyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlRXJyb3I7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIHJlcXVlc3QgaWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVJlcXVlc3RJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB1dWlkdjQoKTtcbn1cblxuXG4vKipcbiAqIERlZmF1bHQgU3RvcmFnZS5cbiAqL1xuY2xhc3MgRGVmYXVsdFN0b3JhZ2UgaW1wbGVtZW50cyBTaW1wbGVTdG9yYWdlIHtcbiAgICAvKipcbiAgICAgKiBHZXQgaXRlbS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICovXG4gICAgYXN5bmMgZ2V0SXRlbShrZXk6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgICAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGl0ZW0uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqL1xuICAgIGFzeW5jIHJlbW92ZUl0ZW0oa2V5OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGl0ZW0uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgICAqL1xuICAgIGFzeW5jIHNldEl0ZW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTdG9yYWdlID0gbmV3IERlZmF1bHRTdG9yYWdlKCk7XG5cbmludGVyZmFjZSBMb2NhbENyZWRlbnRpYWxzT3B0aW9ucyB7XG4gICAgdG9rZW5TZWN0aW9uTmFtZTogc3RyaW5nO1xuICAgIHN0b3JhZ2U6IFNpbXBsZVN0b3JhZ2U7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgY3JlZGVudGlhbHMgaXMgZXhwaXJlZC5cbiAqIEBwYXJhbSB7Q3JlZGVudGlhbHN9IGNyZWRlbnRpYWxzXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0NyZWRlbnRpYWxzRXhwaXJlZChjcmVkZW50aWFsczogQ3JlZGVudGlhbHMpOiBib29sZWFuIHtcbiAgICBsZXQgaXNFeHBpcmVkID0gdHJ1ZTtcbiAgICBpZiAoY3JlZGVudGlhbHMgJiYgY3JlZGVudGlhbHMuZXhwaXJlc19hdCAmJiBjcmVkZW50aWFscy5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgICAgaXNFeHBpcmVkID0gY3JlZGVudGlhbHMuZXhwaXJlc19hdCA8IG5ldyBEYXRlKCk7XG4gICAgfVxuICAgIHJldHVybiBpc0V4cGlyZWQ7XG59XG5cbi8qKlxuICogTG9jYWwgY3JlZGVudGlhbHMuXG4gKiBMb2NhbCBjcmVkZW50aWFscywgd2l0aCBtZW1vcnkgY2FjaGUgYW5kIHN0b3JhZ2UgY2FjaGUuXG4gKiBJZiB0aGUgbWVtb3J5IGNhY2hlIGV4cGlyZXMsIHRoZSBzdG9yYWdlIGNhY2hlIGlzIGF1dG9tYXRpY2FsbHkgbG9hZGVkLlxuICovXG5leHBvcnQgY2xhc3MgTG9jYWxDcmVkZW50aWFscyB7XG4gICAgcHJpdmF0ZSBfdG9rZW5TZWN0aW9uTmFtZTogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBfc3RvcmFnZTogU2ltcGxlU3RvcmFnZTtcblxuICAgIHByaXZhdGUgX2NyZWRlbnRpYWxzOiBDcmVkZW50aWFscyB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfc2luZ2xlUHJvbWlzZTogU2luZ2xlUHJvbWlzZSA9IG5ldyBTaW5nbGVQcm9taXNlKCk7XG5cbiAgICAvKipcbiAgICAgKiBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7TG9jYWxDcmVkZW50aWFsc09wdGlvbnN9IG9wdGlvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBMb2NhbENyZWRlbnRpYWxzT3B0aW9ucykge1xuICAgICAgICB0aGlzLl90b2tlblNlY3Rpb25OYW1lID0gb3B0aW9ucy50b2tlblNlY3Rpb25OYW1lO1xuICAgICAgICB0aGlzLl9zdG9yYWdlID0gb3B0aW9ucy5zdG9yYWdlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldENyZWRlbnRpYWxzIFByb3ZpZGVzIGFuIGFsdGVybmF0aXZlIGZldGNoIGFwaSByZXF1ZXN0IGltcGxlbWVudGF0aW9uIHdpdGggYXV0aCBjcmVkZW50aWFsc1xuICAgICAqIEBwYXJhbSB7Q3JlZGVudGlhbHN9IGNyZWRlbnRpYWxzXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNldENyZWRlbnRpYWxzKGNyZWRlbnRpYWxzPzogQ3JlZGVudGlhbHMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKGNyZWRlbnRpYWxzICYmIGNyZWRlbnRpYWxzLmV4cGlyZXNfaW4pIHtcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzLmV4cGlyZXNfYXQgPSBuZXcgRGF0ZShcbiAgICAgICAgICAgICAgICBEYXRlLm5vdygpICsgKGNyZWRlbnRpYWxzLmV4cGlyZXNfaW4gLSAzMCkgKiAxMDAwLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zdG9yYWdlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW5TdHI6IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGNyZWRlbnRpYWxzKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9zdG9yYWdlLnNldEl0ZW0odGhpcy5fdG9rZW5TZWN0aW9uTmFtZSwgdG9rZW5TdHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY3JlZGVudGlhbHMgPSBjcmVkZW50aWFscztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zdG9yYWdlKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fc3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuX3Rva2VuU2VjdGlvbk5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY3JlZGVudGlhbHMgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGNyZWRlbnRpYWxzLlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHMgfCBudWxsPn1cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0Q3JlZGVudGlhbHMoKTogUHJvbWlzZTxDcmVkZW50aWFscyB8IG51bGw+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpbmdsZVByb21pc2UucnVuKCdnZXRDcmVkZW50aWFscycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0NyZWRlbnRpYWxzRXhwaXJlZCh0aGlzLl9jcmVkZW50aWFscykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2dldFN0b3JhZ2VDcmVkZW50aWFscygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWRlbnRpYWxzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgc3RvcmFnZSBjcmVkZW50aWFscy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIF9nZXRTdG9yYWdlQ3JlZGVudGlhbHMoKTogUHJvbWlzZTxDcmVkZW50aWFscyB8IG51bGw+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpbmdsZVByb21pc2UucnVuKCdfZ2V0U3RvcmFnZUNyZWRlbnRpYWxzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IG51bGw7XG4gICAgICAgICAgICBjb25zdCB0b2tlblN0cjogc3RyaW5nID0gYXdhaXQgdGhpcy5fc3RvcmFnZS5nZXRJdGVtKFxuICAgICAgICAgICAgICAgIHRoaXMuX3Rva2VuU2VjdGlvbk5hbWUsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHRva2VuU3RyICE9PSB1bmRlZmluZWQgJiYgdG9rZW5TdHIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFscyA9IEpTT04ucGFyc2UodG9rZW5TdHIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3JlZGVudGlhbHMgJiYgY3JlZGVudGlhbHMuZXhwaXJlc19hdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbHMuZXhwaXJlc19hdCA9IG5ldyBEYXRlKGNyZWRlbnRpYWxzLmV4cGlyZXNfYXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fc3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuX3Rva2VuU2VjdGlvbk5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFscyA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNyZWRlbnRpYWxzO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICogT0F1dGgyQ2xpZW50XG4gKi9cbmV4cG9ydCBjbGFzcyBPQXV0aDJDbGllbnQgaW1wbGVtZW50cyBBdXRoQ2xpZW50IHtcbiAgICBwcml2YXRlIHN0YXRpYyBfZGVmYXVsdFJldHJ5ID0gMjtcbiAgICBwcml2YXRlIHN0YXRpYyBfbWluUmV0cnkgPSAwO1xuICAgIHByaXZhdGUgc3RhdGljIF9tYXhSZXRyeSA9IDU7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX3JldHJ5SW50ZXJ2YWwgPSAxMDAwO1xuXG4gICAgcHJpdmF0ZSBfYXBpT3JpZ2luOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfY2xpZW50SWQ6IHN0cmluZztcbiAgICBwcml2YXRlIF9yZXRyeTogbnVtYmVyO1xuICAgIHByaXZhdGUgX2NsaWVudFNlY3JldD86IHN0cmluZztcbiAgICBwcml2YXRlIF9iYXNlUmVxdWVzdDogPFQ+KFxuICAgICAgICB1cmw6IHN0cmluZyxcbiAgICAgICAgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zLFxuICAgICkgPT4gUHJvbWlzZTxUPjtcbiAgICBwcml2YXRlIF9sb2NhbENyZWRlbnRpYWxzOiBMb2NhbENyZWRlbnRpYWxzO1xuICAgIHByaXZhdGUgX3N0b3JhZ2U6IFNpbXBsZVN0b3JhZ2U7XG4gICAgcHJpdmF0ZSBfZGV2aWNlSUQ/OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfdG9rZW5JblVSTD86IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfcmVmcmVzaFRva2VuRnVuYzogKHJlZnJlc2hUb2tlbj86IHN0cmluZykgPT4gUHJvbWlzZTxDcmVkZW50aWFscz47XG4gICAgcHJpdmF0ZSBfaGVhZGVycz86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG4gICAgcHJpdmF0ZSBfc2luZ2xlUHJvbWlzZTogU2luZ2xlUHJvbWlzZSA9IG5ldyBTaW5nbGVQcm9taXNlKCk7XG5cbiAgICAvKipcbiAgICAgKiBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7T0F1dGgyQ2xpZW50T3B0aW9uc30gb3B0aW9uc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9BdXRoMkNsaWVudE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fYXBpT3JpZ2luID0gb3B0aW9ucy5hcGlPcmlnaW47XG4gICAgICAgIHRoaXMuX2NsaWVudElkID0gb3B0aW9ucy5jbGllbnRJZDtcbiAgICAgICAgdGhpcy5fcmV0cnkgPSB0aGlzLl9mb3JtYXRSZXRyeShvcHRpb25zLnJldHJ5LCBPQXV0aDJDbGllbnQuX2RlZmF1bHRSZXRyeSk7XG4gICAgICAgIGlmIChvcHRpb25zLmJhc2VSZXF1ZXN0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5fYmFzZVJlcXVlc3QgPSBvcHRpb25zLmJhc2VSZXF1ZXN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYmFzZVJlcXVlc3QgPSBkZWZhdWx0UmVxdWVzdDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90b2tlbkluVVJMID0gb3B0aW9ucy50b2tlbkluVVJMO1xuICAgICAgICB0aGlzLl9oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuX3N0b3JhZ2UgPSBvcHRpb25zLnN0b3JhZ2UgfHwgZGVmYXVsdFN0b3JhZ2U7XG4gICAgICAgIHRoaXMuX2xvY2FsQ3JlZGVudGlhbHMgPSBuZXcgTG9jYWxDcmVkZW50aWFscyh7XG4gICAgICAgICAgICB0b2tlblNlY3Rpb25OYW1lOiAnY3JlZGVudGlhbHNfJyArIG9wdGlvbnMuY2xpZW50SWQsXG4gICAgICAgICAgICBzdG9yYWdlOiB0aGlzLl9zdG9yYWdlLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fY2xpZW50U2VjcmV0ID0gb3B0aW9ucy5jbGllbnRTZWNyZXQ7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hUb2tlbkZ1bmMgPVxuICAgICAgICAgICAgb3B0aW9ucy5yZWZyZXNoVG9rZW5GdW5jIHx8IHRoaXMuX2RlZmF1bHRSZWZyZXNoVG9rZW5GdW5jO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldENyZWRlbnRpYWxzIFByb3ZpZGVzIGFuIGFsdGVybmF0aXZlIGZldGNoIGFwaSByZXF1ZXN0IGltcGxlbWVudGF0aW9uIHdpdGggYXV0aCBjcmVkZW50aWFsc1xuICAgICAqIEBwYXJhbSB7Q3JlZGVudGlhbHN9IGNyZWRlbnRpYWxzXG4gICAgICogQHJldHVybiB7UHJvbWlzZTx2b2lkPn1cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0Q3JlZGVudGlhbHMoY3JlZGVudGlhbHM/OiBDcmVkZW50aWFscyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxDcmVkZW50aWFscy5zZXRDcmVkZW50aWFscyhjcmVkZW50aWFscyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0QWNjZXNzVG9rZW4gcmV0dXJuIGEgdmFsaWRhdGUgYWNjZXNzIHRva2VuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdldEFjY2Vzc1Rva2VuKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2dldENyZWRlbnRpYWxzKCk7XG4gICAgICAgIGlmIChjcmVkZW50aWFscyAmJiBjcmVkZW50aWFscy5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3JlZGVudGlhbHMuYWNjZXNzX3Rva2VuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoe2Vycm9yOiBFcnJvclR5cGUuVU5BVVRIRU5USUNBVEVEfSBhcyBSZXNwb25zZUVycm9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXF1ZXN0IGh0dHAgbGlrZSBzaW1wbGUgZmV0Y2ggYXBpLCBleHA6cmVxdWVzdCgnL3YxL3VzZXIvbWUnLCB7d2l0aENyZWRlbnRpYWxzOnRydWV9KVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge0F1dGhDbGllbnRSZXF1ZXN0T3B0aW9uc30gb3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyByZXF1ZXN0PFQ+KFxuICAgICAgICB1cmw6IHN0cmluZyxcbiAgICAgICAgb3B0aW9ucz86IEF1dGhDbGllbnRSZXF1ZXN0T3B0aW9ucyxcbiAgICApOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmV0cnk6IG51bWJlciA9IHRoaXMuX2Zvcm1hdFJldHJ5KG9wdGlvbnMucmV0cnksIHRoaXMuX3JldHJ5KTtcbiAgICAgICAgb3B0aW9ucy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9O1xuICAgICAgICBpZiAodGhpcy5faGVhZGVycykge1xuICAgICAgICAgICAgb3B0aW9ucy5oZWFkZXJzID0ge1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuX2hlYWRlcnMsXG4gICAgICAgICAgICAgICAgLi4ub3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9wdGlvbnMuaGVhZGVyc1tSZXF1ZXN0SWRIZWFkZXJOYW1lXSkge1xuICAgICAgICAgICAgb3B0aW9ucy5oZWFkZXJzW1JlcXVlc3RJZEhlYWRlck5hbWVdID0gZ2VuZXJhdGVSZXF1ZXN0SWQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9wdGlvbnMuaGVhZGVyc1tEZXZpY2VJZEhlYWRlck5hbWVdKSB7XG4gICAgICAgICAgICAgY29uc3QgZGV2aWNlSWQgPSBhd2FpdCB0aGlzLl9nZXREZXZpY2VJZCgpO1xuICAgICAgICAgICAgIG9wdGlvbnMuaGVhZGVyc1tEZXZpY2VJZEhlYWRlck5hbWVdID0gZGV2aWNlSWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fZ2V0Q3JlZGVudGlhbHMoKTtcbiAgICAgICAgICAgIGlmIChjcmVkZW50aWFscykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b2tlbkluVVJMKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cmwuaW5kZXhPZignPycpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsICs9ICc/JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB1cmwgKz0gJ2FjY2Vzc190b2tlbj0nICsgY3JlZGVudGlhbHMuYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzLnRva2VuX3R5cGUgKyAnICcgKyBjcmVkZW50aWFscy5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NsaWVudElkICYmIHVybC5pbmRleE9mKCdjbGllbnRfaWQnKSA8IDApIHtcbiAgICAgICAgICAgICAgICB1cmwgKz0gdXJsLmluZGV4T2YoJz8nKSA8IDAgPyAnPycgOiAnJic7XG4gICAgICAgICAgICAgICAgdXJsICs9ICdjbGllbnRfaWQ9JyArIHRoaXMuX2NsaWVudElkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh1cmwuc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICB1cmwgPSB0aGlzLl9hcGlPcmlnaW4gKyB1cmw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3BvbnNlOiBUIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIGNvbnN0IG1heFJlcXVlc3RUaW1lczogbnVtYmVyID0gcmV0cnkgKyAxO1xuICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IHJlcXVlc3RUaW1lID0gMDtcbiAgICAgICAgICAgIHJlcXVlc3RUaW1lIDwgbWF4UmVxdWVzdFRpbWVzO1xuICAgICAgICAgICAgcmVxdWVzdFRpbWUrK1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9iYXNlUmVxdWVzdDxUPih1cmwsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBjYXRjaCAocmVzcG9uc2VFcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFRpbWUgPT09IHJldHJ5IHx8XG4gICAgICAgICAgICAgICAgICAgICFyZXNwb25zZUVycm9yIHx8XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3IuZXJyb3IgIT09ICd1bnJlYWNoYWJsZSdcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlRXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3NsZWVwKE9BdXRoMkNsaWVudC5fcmV0cnlJbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIHJldHJ5IHZhbHVlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZXRyeVxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICBwcml2YXRlIF9jaGVja1JldHJ5KHJldHJ5OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBsZXQgcmVzcG9uc2VFcnJvcjogUmVzcG9uc2VFcnJvciB8IG51bGwgPSBudWxsO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgcmV0cnkgIT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICByZXRyeSA8IE9BdXRoMkNsaWVudC5fbWluUmV0cnkgfHxcbiAgICAgICAgICAgIHJldHJ5ID4gT0F1dGgyQ2xpZW50Ll9tYXhSZXRyeVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJlc3BvbnNlRXJyb3IgPSB7XG4gICAgICAgICAgICAgICAgZXJyb3I6IEVycm9yVHlwZS5VTlJFQUNIQUJMRSxcbiAgICAgICAgICAgICAgICBlcnJvcl9kZXNjcmlwdGlvbjogJ3dyb25nIG9wdGlvbnMgcGFyYW06IHJldHJ5JyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3BvbnNlRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IHJlc3BvbnNlRXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHJ5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvcm1hdCByZXRyeSB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmV0cnlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVmYXVsdFZhbGVcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgcHJpdmF0ZSBfZm9ybWF0UmV0cnkocmV0cnk6IG51bWJlciwgZGVmYXVsdFZhbGU6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGlmICh0eXBlb2YgcmV0cnkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tSZXRyeShyZXRyeSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTbGVlcC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbXNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPHZvaWQ+fVxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgX3NsZWVwKG1zOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9LCBtcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZnJlc2ggZXhwaXJlZCB0b2tlbi5cbiAgICAgKiBAcGFyYW0ge0NyZWRlbnRpYWxzfSBjcmVkZW50aWFsc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fVxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgX3JlZnJlc2hUb2tlbihjcmVkZW50aWFsczogQ3JlZGVudGlhbHMpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaW5nbGVQcm9taXNlLnJ1bignX3JlZnJlc2hUb2tlbicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmICghY3JlZGVudGlhbHMgfHwgIWNyZWRlbnRpYWxzLnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdW5BdXRoZW50aWNhdGVkRXJyb3IoJ25vIHJlZnJlc2ggdG9rZW4gZm91bmQgaW4gY3JlZGVudGlhbHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Q3JlZGVudGlhbHM6IENyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fcmVmcmVzaFRva2VuRnVuYyhcbiAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbHMucmVmcmVzaF90b2tlbixcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2xvY2FsQ3JlZGVudGlhbHMuc2V0Q3JlZGVudGlhbHMobmV3Q3JlZGVudGlhbHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdDcmVkZW50aWFsc1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IuZXJyb3IgPT09IEVycm9yVHlwZS5JTlZBTElEX0dSQU5UKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2xvY2FsQ3JlZGVudGlhbHMuc2V0Q3JlZGVudGlhbHMobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl91bkF1dGhlbnRpY2F0ZWRFcnJvcihlcnJvci5lcnJvcl9kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFub255bW91cyBzaWduSW5cbiAgICAgKiBAcGFyYW0ge0NyZWRlbnRpYWxzfSBjcmVkZW50aWFsc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2U8Q3JlZGVudGlhbHM+fVxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgX2Fub255bW91c1NpZ25JbihjcmVkZW50aWFsczogQ3JlZGVudGlhbHMpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaW5nbGVQcm9taXNlLnJ1bignX2Fub255bW91cycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmICghY3JlZGVudGlhbHMgfHwgY3JlZGVudGlhbHMuc2NvcGUgIT09ICdhbm9ueW1vdXMnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VuQXV0aGVudGljYXRlZEVycm9yKCdubyBhbm9ueW1vdXMgaW4gY3JlZGVudGlhbHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Q3JlZGVudGlhbHM6IENyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCcvYXV0aC92MS9zaWduaW4vYW5vbnltb3VzbHknLCB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRfaWQ6IHRoaXMuX2NsaWVudElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50X3NlY3JldDogdGhpcy5fY2xpZW50U2VjcmV0LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2xvY2FsQ3JlZGVudGlhbHMuc2V0Q3JlZGVudGlhbHMobmV3Q3JlZGVudGlhbHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdDcmVkZW50aWFsc1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IuZXJyb3IgPT09IEVycm9yVHlwZS5JTlZBTElEX0dSQU5UKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2xvY2FsQ3JlZGVudGlhbHMuc2V0Q3JlZGVudGlhbHMobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl91bkF1dGhlbnRpY2F0ZWRFcnJvcihlcnJvci5lcnJvcl9kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgcmVmcmVzaCB0b2tlbiBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVmcmVzaFRva2VuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59XG4gICAgICovXG4gICAgcHJpdmF0ZSBfZGVmYXVsdFJlZnJlc2hUb2tlbkZ1bmMoXG4gICAgICAgIHJlZnJlc2hUb2tlbj86IHN0cmluZyxcbiAgICApOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgICAgIGlmIChyZWZyZXNoVG9rZW4gPT09IHVuZGVmaW5lZCB8fCByZWZyZXNoVG9rZW4gPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdW5BdXRoZW50aWNhdGVkRXJyb3IoJ3JlZnJlc2ggdG9rZW4gbm90IGZvdW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnL2F1dGgvdjEvdG9rZW4nLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICBjbGllbnRfaWQ6IHRoaXMuX2NsaWVudElkLFxuICAgICAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IHRoaXMuX2NsaWVudFNlY3JldCxcbiAgICAgICAgICAgICAgICBncmFudF90eXBlOiAncmVmcmVzaF90b2tlbicsXG4gICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGNyZWRlbnRpYWxzLlxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgX2dldENyZWRlbnRpYWxzKCk6IFByb21pc2U8Q3JlZGVudGlhbHMgfCBudWxsPiB7XG4gICAgICAgIGxldCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9sb2NhbENyZWRlbnRpYWxzLmdldENyZWRlbnRpYWxzKCk7XG4gICAgICAgIGlmIChpc0NyZWRlbnRpYWxzRXhwaXJlZChjcmVkZW50aWFscykpIHtcbiAgICAgICAgICAgIGlmIChjcmVkZW50aWFscyAmJiBjcmVkZW50aWFscy5zY29wZSA9PT0gJ2Fub255bW91cycpIHtcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuIF9hbm9ueW1vdXNTaWduSW4oY3JlZGVudGlhbHMpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5fcmVmcmVzaFRva2VuKGNyZWRlbnRpYWxzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGRldmljZUlkXG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBfZ2V0RGV2aWNlSWQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgaWYgKHRoaXMuX2RldmljZUlEKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGV2aWNlSUQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRldmljZUlkOiBzdHJpbmcgPSBhd2FpdCB0aGlzLl9zdG9yYWdlLmdldEl0ZW0oXG4gICAgICAgICAgICBEZXZpY2VJZFNlY3Rpb25OYW1lLFxuICAgICAgICApO1xuICAgICAgICBpZiAoISh0eXBlb2YgZGV2aWNlSWQgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgICBkZXZpY2VJZC5sZW5ndGggPj0gMTYgJiZcbiAgICAgICAgICAgIGRldmljZUlkLmxlbmd0aCA8PSA0OCkpIHtcbiAgICAgICAgICAgIGRldmljZUlkID0gdXVpZHY0KCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9zdG9yYWdlLnNldEl0ZW0oRGV2aWNlSWRTZWN0aW9uTmFtZSwgZGV2aWNlSWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2RldmljZUlEID0gZGV2aWNlSWQ7XG4gICAgICAgIHJldHVybiBkZXZpY2VJZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgdW5BdXRoZW50aWNhdGVkIGVycm9yLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFQ+fVxuICAgICAqL1xuICAgIHByaXZhdGUgX3VuQXV0aGVudGljYXRlZEVycm9yPFQ+KGVycj86IHN0cmluZyk6IFByb21pc2U8VD4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoe1xuICAgICAgICAgICAgZXJyb3I6IEVycm9yVHlwZS5VTkFVVEhFTlRJQ0FURUQsXG4gICAgICAgICAgICBlcnJvcl9kZXNjcmlwdGlvbjogZXJyLFxuICAgICAgICB9IGFzIFJlc3BvbnNlRXJyb3IpO1xuICAgIH1cbn1cbiJdfQ==