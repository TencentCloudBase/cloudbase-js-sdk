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
                        if (!(options && options.withCredentials)) return [3, 2];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgyY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29hdXRoMmNsaWVudC9vYXV0aDJjbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBbUM7QUFhbkMsc0NBQXFDO0FBRXJDLG1FQUErRDtBQUUvRCxJQUFNLG1CQUFtQixHQUFXLGNBQWMsQ0FBQztBQVN0QyxRQUFBLGNBQWMsR0FBb0IsVUFDN0MsR0FBVyxFQUNYLE9BQXdCOzs7OztnQkFFcEIsTUFBTSxHQUFhLElBQUksQ0FBQztnQkFDeEIsYUFBYSxHQUF5QixJQUFJLENBQUM7Ozs7Z0JBR3ZDLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3ZCLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2lCQUM1QjtnQkFDRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLElBQUksT0FBTyxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDNUQsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDckQ7Z0JBQ2dDLFdBQU0sS0FBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsRUFBQTs7Z0JBQXhELGNBQWMsR0FBYSxTQUE2QjtnQkFDekMsV0FBTSxjQUFjLENBQUMsSUFBSSxFQUFFLEVBQUE7O2dCQUExQyxZQUFZLEdBQUcsU0FBMkI7Z0JBQ2hELElBQUksWUFBWSxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUU7b0JBQ3RDLGFBQWEsR0FBRyxZQUE2QixDQUFDO29CQUM5QyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxD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QUFvQixDQUFDLFdBQVcsQ0FBQyxFQUFqQyxjQUFpQzt3QkFDckIsV0FBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFBOzt3QkFBbkQsV0FBVyxHQUFHLFNBQXFDLENBQUM7OzRCQUV0RCxXQUFPLFdBQVcsRUFBQzs7OztLQUNwQjtJQU9PLDRDQUFxQixHQUE3QixVQUFpQyxHQUFZO1FBQzNDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNwQixLQUFLLEVBQUUsa0JBQVMsQ0FBQyxlQUFlO1lBQ2hDLGlCQUFpQixFQUFFLEdBQUc7U0FDTixDQUFDLENBQUM7SUFDdEIsQ0FBQztJQWhRYywwQkFBYSxHQUFXLENBQUMsQ0FBQztJQUMxQixzQkFBUyxHQUFXLENBQUMsQ0FBQztJQUN0QixzQkFBUyxHQUFXLENBQUMsQ0FBQztJQUN0QiwyQkFBYyxHQUFXLElBQUksQ0FBQztJQThQL0MsbUJBQUM7Q0FBQSxBQWxRRCxJQWtRQztBQWxRWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXJyb3JUeXBlfSBmcm9tICcuL2NvbnN0cyc7XG5cbmltcG9ydCB7QXV0aENsaWVudCwgU2ltcGxlU3RvcmFnZX0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG5pbXBvcnQge1xuICBDcmVkZW50aWFscyxcbiAgUmVzcG9uc2VFcnJvcixcbiAgUmVxdWVzdE9wdGlvbnMsXG4gIFJlcXVlc3RGdW5jdGlvbixcbiAgT0F1dGgyQ2xpZW50T3B0aW9ucyxcbiAgQXV0aENsaWVudFJlcXVlc3RPcHRpb25zLFxufSBmcm9tICcuL21vZGVscyc7XG5cbmltcG9ydCB7dXVpZHY0fSBmcm9tICcuLi91dGlscy91dWlkJztcblxuaW1wb3J0IHtTaW5nbGVQcm9taXNlfSBmcm9tICcuLi91dGlscy9mdW5jdGlvbi9zaW5nbGUtcHJvbWlzZSc7XG5cbmNvbnN0IFJlcXVlc3RJZEhlYWRlck5hbWU6IHN0cmluZyA9ICd4LXJlcXVlc3QtaWQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRvUmVzcG9uc2VFcnJvck9wdGlvbnMge1xuICBlcnJvcj86IEVycm9yVHlwZTtcbiAgZXJyb3JfZGVzY3JpcHRpb24/OiBzdHJpbmcgfCBudWxsO1xuICBlcnJvcl91cmk/OiBzdHJpbmcgfCBudWxsO1xuICBkZXRhaWxzPzogYW55IHwgbnVsbDtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRSZXF1ZXN0OiBSZXF1ZXN0RnVuY3Rpb24gPSBhc3luYyA8VD4oXG4gIHVybDogc3RyaW5nLFxuICBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnMsXG4pOiBQcm9taXNlPFQ+ID0+IHtcbiAgbGV0IHJlc3VsdDogVCB8IG51bGwgPSBudWxsO1xuICBsZXQgcmVzcG9uc2VFcnJvcjogUmVzcG9uc2VFcnJvciB8IG51bGwgPSBudWxsO1xuICB0cnkge1xuICAgIC8vIE9iamVjdHMgbXVzdCBiZSBjb3BpZWQgdG8gcHJldmVudCBtb2RpZmljYXRpb24gb2YgZGF0YSBzdWNoIGFzIGJvZHkuXG4gICAgY29uc3QgY29weU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcbiAgICBpZiAoIWNvcHlPcHRpb25zLm1ldGhvZCkge1xuICAgICAgY29weU9wdGlvbnMubWV0aG9kID0gJ0dFVCc7XG4gICAgfVxuICAgIGlmIChjb3B5T3B0aW9ucy5ib2R5ICYmIHR5cGVvZiBjb3B5T3B0aW9ucy5ib2R5ICE9PSAnc3RyaW5nJykge1xuICAgICAgY29weU9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGNvcHlPcHRpb25zLmJvZHkpO1xuICAgIH1cbiAgICBjb25zdCByZXNwb25zZVJlc3VsdDogUmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIGNvcHlPcHRpb25zKTtcbiAgICBjb25zdCBqc29uUmVzcG9uc2UgPSBhd2FpdCByZXNwb25zZVJlc3VsdC5qc29uKCk7XG4gICAgaWYgKGpzb25SZXNwb25zZSAmJiBqc29uUmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgIHJlc3BvbnNlRXJyb3IgPSBqc29uUmVzcG9uc2UgYXMgUmVzcG9uc2VFcnJvcjtcbiAgICAgIHJlc3BvbnNlRXJyb3IuZXJyb3JfdXJpID0gbmV3IFVSTCh1cmwpLnBhdGhuYW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSBqc29uUmVzcG9uc2UgYXMgVDtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzcG9uc2VFcnJvciA9IHtcbiAgICAgIGVycm9yOiBFcnJvclR5cGUuVU5SRUFDSEFCTEUsXG4gICAgICBlcnJvcl9kZXNjcmlwdGlvbjogZXJyb3IubWVzc2FnZSxcbiAgICAgIGVycm9yX3VyaTogbmV3IFVSTCh1cmwpLnBhdGhuYW1lLFxuICAgIH07XG4gIH1cbiAgaWYgKHJlc3BvbnNlRXJyb3IpIHtcbiAgICB0aHJvdyByZXNwb25zZUVycm9yO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB0b1Jlc3BvbnNlRXJyb3IgPSAoXG4gIGVycm9yOiBSZXNwb25zZUVycm9yIHwgRXJyb3IsXG4gIG9wdGlvbnM/OiBUb1Jlc3BvbnNlRXJyb3JPcHRpb25zLFxuKTogUmVzcG9uc2VFcnJvciA9PiB7XG4gIGxldCByZXNwb25zZUVycm9yOiBSZXNwb25zZUVycm9yO1xuICBjb25zdCBmb3JtYXRPcHRpb25zOiBUb1Jlc3BvbnNlRXJyb3JPcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICByZXNwb25zZUVycm9yID0ge1xuICAgICAgZXJyb3I6IGZvcm1hdE9wdGlvbnMuZXJyb3IgfHwgRXJyb3JUeXBlLkxPQ0FMLFxuICAgICAgZXJyb3JfZGVzY3JpcHRpb246IGZvcm1hdE9wdGlvbnMuZXJyb3JfZGVzY3JpcHRpb24gfHwgZXJyb3IubWVzc2FnZSxcbiAgICAgIGVycm9yX3VyaTogZm9ybWF0T3B0aW9ucy5lcnJvcl91cmksXG4gICAgICBkZXRhaWxzOiBmb3JtYXRPcHRpb25zLmRldGFpbHMgfHwgZXJyb3Iuc3RhY2ssXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBmb3JtYXRFcnJvcjogVG9SZXNwb25zZUVycm9yT3B0aW9ucyA9IGVycm9yIHx8IHt9O1xuICAgIHJlc3BvbnNlRXJyb3IgPSB7XG4gICAgICBlcnJvcjogZm9ybWF0T3B0aW9ucy5lcnJvciB8fCBmb3JtYXRFcnJvci5lcnJvciB8fCBFcnJvclR5cGUuTE9DQUwsXG4gICAgICBlcnJvcl9kZXNjcmlwdGlvbjpcbiAgICAgICAgZm9ybWF0T3B0aW9ucy5lcnJvcl9kZXNjcmlwdGlvbiB8fCBmb3JtYXRFcnJvci5lcnJvcl9kZXNjcmlwdGlvbixcbiAgICAgIGVycm9yX3VyaTogZm9ybWF0T3B0aW9ucy5lcnJvcl91cmkgfHwgZm9ybWF0RXJyb3IuZXJyb3JfdXJpLFxuICAgICAgZGV0YWlsczogZm9ybWF0T3B0aW9ucy5kZXRhaWxzIHx8IGZvcm1hdEVycm9yLmRldGFpbHMsXG4gICAgfTtcbiAgfVxuICByZXR1cm4gcmVzcG9uc2VFcnJvcjtcbn07XG5cbi8qKlxuICogR2VuZXJhdGUgcmVxdWVzdCBpZC5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUmVxdWVzdElkKCk6IHN0cmluZyB7XG4gIHJldHVybiB1dWlkdjQoKTtcbn1cblxuLyoqXG4gKiBEZWZhdWx0IFN0b3JhZ2UuXG4gKi9cbmNsYXNzIERlZmF1bHRTdG9yYWdlIGltcGxlbWVudHMgU2ltcGxlU3RvcmFnZSB7XG4gIC8qKlxuICAgKiBHZXQgaXRlbS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgKi9cbiAgYXN5bmMgZ2V0SXRlbShrZXk6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgaXRlbS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgKi9cbiAgYXN5bmMgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpdGVtLlxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgYXN5bmMgc2V0SXRlbShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdFN0b3JhZ2UgPSBuZXcgRGVmYXVsdFN0b3JhZ2UoKTtcblxuaW50ZXJmYWNlIExvY2FsQ3JlZGVudGlhbHNPcHRpb25zIHtcbiAgdG9rZW5TZWN0aW9uTmFtZTogc3RyaW5nO1xuICBzdG9yYWdlOiBTaW1wbGVTdG9yYWdlO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGNyZWRlbnRpYWxzIGlzIGV4cGlyZWQuXG4gKiBAcGFyYW0ge0NyZWRlbnRpYWxzfSBjcmVkZW50aWFsc1xuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNDcmVkZW50aWFsc0V4cGlyZWQoY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzKTogYm9vbGVhbiB7XG4gIGxldCBpc0V4cGlyZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBpZiAoY3JlZGVudGlhbHMgJiYgY3JlZGVudGlhbHMuZXhwaXJlc19hdCAmJiBjcmVkZW50aWFscy5hY2Nlc3NfdG9rZW4pIHtcbiAgICBpc0V4cGlyZWQgPSBjcmVkZW50aWFscy5leHBpcmVzX2F0IDwgbmV3IERhdGUoKTtcbiAgfVxuICByZXR1cm4gaXNFeHBpcmVkO1xufVxuXG4vKipcbiAqIExvY2FsIGNyZWRlbnRpYWxzLlxuICogTG9jYWwgY3JlZGVudGlhbHMsIHdpdGggbWVtb3J5IGNhY2hlIGFuZCBzdG9yYWdlIGNhY2hlLlxuICogSWYgdGhlIG1lbW9yeSBjYWNoZSBleHBpcmVzLCB0aGUgc3RvcmFnZSBjYWNoZSBpcyBhdXRvbWF0aWNhbGx5IGxvYWRlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIExvY2FsQ3JlZGVudGlhbHMge1xuICBwcml2YXRlIF90b2tlblNlY3Rpb25OYW1lOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfc3RvcmFnZTogU2ltcGxlU3RvcmFnZTtcblxuICBwcml2YXRlIF9jcmVkZW50aWFsczogQ3JlZGVudGlhbHMgfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIF9zaW5nbGVQcm9taXNlOiBTaW5nbGVQcm9taXNlID0gbmV3IFNpbmdsZVByb21pc2UoKTtcblxuICAvKipcbiAgICogY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtMb2NhbENyZWRlbnRpYWxzT3B0aW9uc30gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9uczogTG9jYWxDcmVkZW50aWFsc09wdGlvbnMpIHtcbiAgICB0aGlzLl90b2tlblNlY3Rpb25OYW1lID0gb3B0aW9ucy50b2tlblNlY3Rpb25OYW1lO1xuICAgIHRoaXMuX3N0b3JhZ2UgPSBvcHRpb25zLnN0b3JhZ2U7XG4gIH1cblxuICAvKipcbiAgICogc2V0Q3JlZGVudGlhbHMgUHJvdmlkZXMgYW4gYWx0ZXJuYXRpdmUgZmV0Y2ggYXBpIHJlcXVlc3QgaW1wbGVtZW50YXRpb24gd2l0aCBhdXRoIGNyZWRlbnRpYWxzXG4gICAqIEBwYXJhbSB7Q3JlZGVudGlhbHN9IGNyZWRlbnRpYWxzXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2V0Q3JlZGVudGlhbHMoY3JlZGVudGlhbHM/OiBDcmVkZW50aWFscyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChjcmVkZW50aWFscyAmJiBjcmVkZW50aWFscy5leHBpcmVzX2luKSB7XG4gICAgICBjcmVkZW50aWFscy5leHBpcmVzX2F0ID0gbmV3IERhdGUoXG4gICAgICAgIERhdGUubm93KCkgKyAoY3JlZGVudGlhbHMuZXhwaXJlc19pbiAtIDMwKSAqIDEwMDAsXG4gICAgICApO1xuICAgICAgaWYgKHRoaXMuX3N0b3JhZ2UpIHtcbiAgICAgICAgY29uc3QgdG9rZW5TdHI6IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGNyZWRlbnRpYWxzKTtcbiAgICAgICAgYXdhaXQgdGhpcy5fc3RvcmFnZS5zZXRJdGVtKHRoaXMuX3Rva2VuU2VjdGlvbk5hbWUsIHRva2VuU3RyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2NyZWRlbnRpYWxzID0gY3JlZGVudGlhbHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9zdG9yYWdlKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3N0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLl90b2tlblNlY3Rpb25OYW1lKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2NyZWRlbnRpYWxzID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNyZWRlbnRpYWxzLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENyZWRlbnRpYWxzIHwgbnVsbD59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0Q3JlZGVudGlhbHMoKTogUHJvbWlzZTxDcmVkZW50aWFscyB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fc2luZ2xlUHJvbWlzZS5ydW4oJ2dldENyZWRlbnRpYWxzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKGlzQ3JlZGVudGlhbHNFeHBpcmVkKHRoaXMuX2NyZWRlbnRpYWxzKSkge1xuICAgICAgICB0aGlzLl9jcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuX2dldFN0b3JhZ2VDcmVkZW50aWFscygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX2NyZWRlbnRpYWxzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBzdG9yYWdlIGNyZWRlbnRpYWxzLlxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfZ2V0U3RvcmFnZUNyZWRlbnRpYWxzKCk6IFByb21pc2U8Q3JlZGVudGlhbHMgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NpbmdsZVByb21pc2UucnVuKCdfZ2V0U3RvcmFnZUNyZWRlbnRpYWxzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IG51bGw7XG4gICAgICBjb25zdCB0b2tlblN0cjogc3RyaW5nID0gYXdhaXQgdGhpcy5fc3RvcmFnZS5nZXRJdGVtKFxuICAgICAgICB0aGlzLl90b2tlblNlY3Rpb25OYW1lLFxuICAgICAgKTtcbiAgICAgIGlmICh0b2tlblN0ciAhPT0gdW5kZWZpbmVkICYmIHRva2VuU3RyICE9PSBudWxsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY3JlZGVudGlhbHMgPSBKU09OLnBhcnNlKHRva2VuU3RyKTtcbiAgICAgICAgICBpZiAoY3JlZGVudGlhbHMgJiYgY3JlZGVudGlhbHMuZXhwaXJlc19hdCkge1xuICAgICAgICAgICAgY3JlZGVudGlhbHMuZXhwaXJlc19hdCA9IG5ldyBEYXRlKGNyZWRlbnRpYWxzLmV4cGlyZXNfYXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9zdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5fdG9rZW5TZWN0aW9uTmFtZSk7XG4gICAgICAgICAgY3JlZGVudGlhbHMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY3JlZGVudGlhbHM7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBPQXV0aDJDbGllbnRcbiAqL1xuZXhwb3J0IGNsYXNzIE9BdXRoMkNsaWVudCBpbXBsZW1lbnRzIEF1dGhDbGllbnQge1xuICBwcml2YXRlIHN0YXRpYyBfZGVmYXVsdFJldHJ5OiBudW1iZXIgPSAxO1xuICBwcml2YXRlIHN0YXRpYyBfbWluUmV0cnk6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgc3RhdGljIF9tYXhSZXRyeTogbnVtYmVyID0gNTtcbiAgcHJpdmF0ZSBzdGF0aWMgX3JldHJ5SW50ZXJ2YWw6IG51bWJlciA9IDEwMDA7XG5cbiAgLy8gcHJpdmF0ZSBfZGV2TW9kZTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfYXBpT3JpZ2luOiBzdHJpbmc7XG4gIHByaXZhdGUgX2NsaWVudElkOiBzdHJpbmc7XG4gIHByaXZhdGUgX3JldHJ5OiBudW1iZXI7XG4gIHByaXZhdGUgX2NsaWVudFNlY3JldD86IHN0cmluZztcbiAgcHJpdmF0ZSBfYmFzZVJlcXVlc3Q6IDxUPihcbiAgICB1cmw6IHN0cmluZyxcbiAgICBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnMsXG4gICkgPT4gUHJvbWlzZTxUPjtcbiAgcHJpdmF0ZSBfbG9jYWxDcmVkZW50aWFsczogTG9jYWxDcmVkZW50aWFscztcbiAgcHJpdmF0ZSBfc3RvcmFnZTogU2ltcGxlU3RvcmFnZTtcbiAgcHJpdmF0ZSBfdG9rZW5JblVSTD86IGJvb2xlYW47XG4gIHByaXZhdGUgX3JlZnJlc2hUb2tlbkZ1bmM6IChyZWZyZXNoVG9rZW4/OiBzdHJpbmcpID0+IFByb21pc2U8Q3JlZGVudGlhbHM+O1xuICBwcml2YXRlIF9oZWFkZXJzPzoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gIHByaXZhdGUgX3NpbmdsZVByb21pc2U6IFNpbmdsZVByb21pc2UgPSBuZXcgU2luZ2xlUHJvbWlzZSgpO1xuXG4gIC8qKlxuICAgKiBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09BdXRoMkNsaWVudE9wdGlvbnN9IG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9BdXRoMkNsaWVudE9wdGlvbnMpIHtcbiAgICAvLyB0aGlzLl9kZXZNb2RlID0gb3B0aW9ucy5kZXZNb2RlO1xuICAgIHRoaXMuX2FwaU9yaWdpbiA9IG9wdGlvbnMuYXBpT3JpZ2luO1xuICAgIHRoaXMuX2NsaWVudElkID0gb3B0aW9ucy5jbGllbnRJZDtcbiAgICB0aGlzLl9yZXRyeSA9IHRoaXMuX2Zvcm1hdFJldHJ5KG9wdGlvbnMucmV0cnksIE9BdXRoMkNsaWVudC5fZGVmYXVsdFJldHJ5KTtcbiAgICBpZiAob3B0aW9ucy5iYXNlUmVxdWVzdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX2Jhc2VSZXF1ZXN0ID0gb3B0aW9ucy5iYXNlUmVxdWVzdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYmFzZVJlcXVlc3QgPSBkZWZhdWx0UmVxdWVzdDtcbiAgICB9XG4gICAgdGhpcy5fdG9rZW5JblVSTCA9IG9wdGlvbnMudG9rZW5JblVSTDtcbiAgICB0aGlzLl9oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLl9zdG9yYWdlID0gb3B0aW9ucy5zdG9yYWdlIHx8IGRlZmF1bHRTdG9yYWdlO1xuICAgIHRoaXMuX2xvY2FsQ3JlZGVudGlhbHMgPSBuZXcgTG9jYWxDcmVkZW50aWFscyh7XG4gICAgICB0b2tlblNlY3Rpb25OYW1lOiAnY3JlZGVudGlhbHNfJyArIG9wdGlvbnMuY2xpZW50SWQsXG4gICAgICBzdG9yYWdlOiB0aGlzLl9zdG9yYWdlLFxuICAgIH0pO1xuICAgIHRoaXMuX2NsaWVudFNlY3JldCA9IG9wdGlvbnMuY2xpZW50U2VjcmV0O1xuICAgIHRoaXMuX3JlZnJlc2hUb2tlbkZ1bmMgPVxuICAgICAgb3B0aW9ucy5yZWZyZXNoVG9rZW5GdW5jIHx8IHRoaXMuX2RlZmF1bHRSZWZyZXNoVG9rZW5GdW5jO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldENyZWRlbnRpYWxzIFByb3ZpZGVzIGFuIGFsdGVybmF0aXZlIGZldGNoIGFwaSByZXF1ZXN0IGltcGxlbWVudGF0aW9uIHdpdGggYXV0aCBjcmVkZW50aWFsc1xuICAgKiBAcGFyYW0ge0NyZWRlbnRpYWxzfSBjcmVkZW50aWFsc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgcHVibGljIHNldENyZWRlbnRpYWxzKGNyZWRlbnRpYWxzPzogQ3JlZGVudGlhbHMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxDcmVkZW50aWFscy5zZXRDcmVkZW50aWFscyhjcmVkZW50aWFscyk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0QWNjZXNzVG9rZW4gcmV0dXJuIGEgdmFsaWRhdGUgYWNjZXNzIHRva2VuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0QWNjZXNzVG9rZW4oKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9nZXRDcmVkZW50aWFscygpO1xuICAgIGlmIChjcmVkZW50aWFscyAmJiBjcmVkZW50aWFscy5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3JlZGVudGlhbHMuYWNjZXNzX3Rva2VuKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHtlcnJvcjogRXJyb3JUeXBlLlVOQVVUSEVOVElDQVRFRH0gYXMgUmVzcG9uc2VFcnJvcik7XG4gIH1cblxuICAvKipcbiAgICogcmVxdWVzdCBodHRwIGxpa2Ugc2ltcGxlIGZldGNoIGFwaSwgZXhwOnJlcXVlc3QoJy92MS91c2VyL21lJywge3dpdGhDcmVkZW50aWFsczp0cnVlfSlcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKiBAcGFyYW0ge0F1dGhDbGllbnRSZXF1ZXN0T3B0aW9uc30gb3B0aW9uc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIHJlcXVlc3Q8VD4oXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgb3B0aW9ucz86IEF1dGhDbGllbnRSZXF1ZXN0T3B0aW9ucyxcbiAgKTogUHJvbWlzZTxUPiB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIGNvbnN0IHJldHJ5OiBudW1iZXIgPSB0aGlzLl9mb3JtYXRSZXRyeShvcHRpb25zLnJldHJ5LCB0aGlzLl9yZXRyeSk7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9O1xuICAgIGlmICh0aGlzLl9oZWFkZXJzKSB7XG4gICAgICBvcHRpb25zLmhlYWRlcnMgPSB7XG4gICAgICAgIC4uLnRoaXMuX2hlYWRlcnMsXG4gICAgICAgIC4uLm9wdGlvbnMuaGVhZGVycyxcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghb3B0aW9ucy5oZWFkZXJzW1JlcXVlc3RJZEhlYWRlck5hbWVdKSB7XG4gICAgICBvcHRpb25zLmhlYWRlcnNbUmVxdWVzdElkSGVhZGVyTmFtZV0gPSBnZW5lcmF0ZVJlcXVlc3RJZCgpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLndpdGhDcmVkZW50aWFscykge1xuICAgICAgY29uc3QgY3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9nZXRDcmVkZW50aWFscygpO1xuICAgICAgaWYgKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGlmICh0aGlzLl90b2tlbkluVVJMKSB7XG4gICAgICAgICAgaWYgKHVybC5pbmRleE9mKCc/JykgPCAwKSB7XG4gICAgICAgICAgICB1cmwgKz0gJz8nO1xuICAgICAgICAgIH1cbiAgICAgICAgICB1cmwgKz0gJ2FjY2Vzc190b2tlbj0nICsgY3JlZGVudGlhbHMuYWNjZXNzX3Rva2VuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMuaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID1cbiAgICAgICAgICAgIGNyZWRlbnRpYWxzLnRva2VuX3R5cGUgKyAnICcgKyBjcmVkZW50aWFscy5hY2Nlc3NfdG9rZW47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2NsaWVudElkICYmIHVybC5pbmRleE9mKCdjbGllbnRfaWQnKSA8IDApIHtcbiAgICAgICAgdXJsICs9IHVybC5pbmRleE9mKCc/JykgPCAwID8gJz8nIDogJyYnO1xuICAgICAgICB1cmwgKz0gJ2NsaWVudF9pZD0nICsgdGhpcy5fY2xpZW50SWQ7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh1cmwuc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICB1cmwgPSB0aGlzLl9hcGlPcmlnaW4gKyB1cmw7XG4gICAgfVxuICAgIGxldCByZXNwb25zZTogVCB8IG51bGwgPSBudWxsO1xuICAgIGNvbnN0IG1heFJlcXVlc3RUaW1lczogbnVtYmVyID0gcmV0cnkgKyAxO1xuICAgIGZvciAoXG4gICAgICBsZXQgcmVxdWVzdFRpbWU6IG51bWJlciA9IDA7XG4gICAgICByZXF1ZXN0VGltZSA8IG1heFJlcXVlc3RUaW1lcztcbiAgICAgIHJlcXVlc3RUaW1lKytcbiAgICApIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fYmFzZVJlcXVlc3Q8VD4odXJsLCBvcHRpb25zKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGNhdGNoIChyZXNwb25zZUVycm9yKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICByZXF1ZXN0VGltZSA9PT0gcmV0cnkgfHxcbiAgICAgICAgICAhcmVzcG9uc2VFcnJvciB8fFxuICAgICAgICAgIHJlc3BvbnNlRXJyb3IuZXJyb3IgIT09ICd1bnJlYWNoYWJsZSdcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlRXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhd2FpdCB0aGlzLl9zbGVlcChPQXV0aDJDbGllbnQuX3JldHJ5SW50ZXJ2YWwpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgcmV0cnkgdmFsdWUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByZXRyeVxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBwcml2YXRlIF9jaGVja1JldHJ5KHJldHJ5OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCByZXNwb25zZUVycm9yOiBSZXNwb25zZUVycm9yIHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgdHlwZW9mIHJldHJ5ICE9PSAnbnVtYmVyJyB8fFxuICAgICAgcmV0cnkgPCBPQXV0aDJDbGllbnQuX21pblJldHJ5IHx8XG4gICAgICByZXRyeSA+IE9BdXRoMkNsaWVudC5fbWF4UmV0cnlcbiAgICApIHtcbiAgICAgIHJlc3BvbnNlRXJyb3IgPSB7XG4gICAgICAgIGVycm9yOiBFcnJvclR5cGUuVU5SRUFDSEFCTEUsXG4gICAgICAgIGVycm9yX2Rlc2NyaXB0aW9uOiAnd3Jvbmcgb3B0aW9ucyBwYXJhbTogcmV0cnknLFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKHJlc3BvbnNlRXJyb3IpIHtcbiAgICAgIHRocm93IHJlc3BvbnNlRXJyb3I7XG4gICAgfVxuICAgIHJldHVybiByZXRyeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgcmV0cnkgdmFsdWUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByZXRyeVxuICAgKiBAcGFyYW0ge251bWJlcn0gZGVmYXVsdFZhbGVcbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgcHJpdmF0ZSBfZm9ybWF0UmV0cnkocmV0cnk6IG51bWJlciwgZGVmYXVsdFZhbGU6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHR5cGVvZiByZXRyeSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBkZWZhdWx0VmFsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrUmV0cnkocmV0cnkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTbGVlcC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG1zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9zbGVlcChtczogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSwgbXMpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZnJlc2ggZXhwaXJlZCB0b2tlbi5cbiAgICogQHBhcmFtIHtDcmVkZW50aWFsc30gY3JlZGVudGlhbHNcbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59XG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9yZWZyZXNoVG9rZW4oY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIHJldHVybiB0aGlzLl9zaW5nbGVQcm9taXNlLnJ1bignX3JlZnJlc2hUb2tlbicsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghY3JlZGVudGlhbHMgfHwgIWNyZWRlbnRpYWxzLnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VuQXV0aGVudGljYXRlZEVycm9yKCdubyByZWZyZXNoIHRva2VuIGZvdW5kJyk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBuZXdDcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9yZWZyZXNoVG9rZW5GdW5jKFxuICAgICAgICAgIGNyZWRlbnRpYWxzLnJlZnJlc2hfdG9rZW4sXG4gICAgICAgICk7XG4gICAgICAgIGF3YWl0IHRoaXMuX2xvY2FsQ3JlZGVudGlhbHMuc2V0Q3JlZGVudGlhbHMobmV3Q3JlZGVudGlhbHMpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yLmVycm9yID09PSBFcnJvclR5cGUuSU5WQUxJRF9HUkFOVCkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX2xvY2FsQ3JlZGVudGlhbHMuc2V0Q3JlZGVudGlhbHMobnVsbCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX3VuQXV0aGVudGljYXRlZEVycm9yKGVycm9yLmVycm9yX2Rlc2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsQ3JlZGVudGlhbHMuZ2V0Q3JlZGVudGlhbHMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHJlZnJlc2ggdG9rZW4gZnVuY3Rpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWZyZXNoVG9rZW5cbiAgICogQHJldHVybiB7UHJvbWlzZTxDcmVkZW50aWFscz59XG4gICAqL1xuICBwcml2YXRlIF9kZWZhdWx0UmVmcmVzaFRva2VuRnVuYyhcbiAgICByZWZyZXNoVG9rZW4/OiBzdHJpbmcsXG4gICk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICBpZiAocmVmcmVzaFRva2VuID09PSB1bmRlZmluZWQgfHwgcmVmcmVzaFRva2VuID09PSAnJykge1xuICAgICAgcmV0dXJuIHRoaXMuX3VuQXV0aGVudGljYXRlZEVycm9yKCdyZWZyZXNoIHRva2VuIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCcvYXV0aC92MS90b2tlbicsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keToge1xuICAgICAgICBjbGllbnRfaWQ6IHRoaXMuX2NsaWVudElkLFxuICAgICAgICBjbGllbnRfc2VjcmV0OiB0aGlzLl9jbGllbnRTZWNyZXQsXG4gICAgICAgIGdyYW50X3R5cGU6ICdyZWZyZXNoX3Rva2VuJyxcbiAgICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY3JlZGVudGlhbHMuXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9nZXRDcmVkZW50aWFscygpOiBQcm9taXNlPENyZWRlbnRpYWxzIHwgbnVsbD4ge1xuICAgIGxldCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9sb2NhbENyZWRlbnRpYWxzLmdldENyZWRlbnRpYWxzKCk7XG4gICAgaWYgKGlzQ3JlZGVudGlhbHNFeHBpcmVkKGNyZWRlbnRpYWxzKSkge1xuICAgICAgY3JlZGVudGlhbHMgPSBhd2FpdCB0aGlzLl9yZWZyZXNoVG9rZW4oY3JlZGVudGlhbHMpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlZGVudGlhbHM7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgdW5BdXRoZW50aWNhdGVkIGVycm9yLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VD59XG4gICAqL1xuICBwcml2YXRlIF91bkF1dGhlbnRpY2F0ZWRFcnJvcjxUPihlcnI/OiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoe1xuICAgICAgZXJyb3I6IEVycm9yVHlwZS5VTkFVVEhFTlRJQ0FURUQsXG4gICAgICBlcnJvcl9kZXNjcmlwdGlvbjogZXJyLFxuICAgIH0gYXMgUmVzcG9uc2VFcnJvcik7XG4gIH1cbn1cbiJdfQ==