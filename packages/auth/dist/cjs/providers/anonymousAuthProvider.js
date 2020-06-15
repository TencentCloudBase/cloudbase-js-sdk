"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.AnonymousAuthProvider = void 0;
var base_1 = require("./base");
var utilities_1 = require("@cloudbase/utilities");
var constants_1 = require("../constants");
var __1 = require("..");
var ERRORS = utilities_1.constants.ERRORS;
var throwError = utilities_1.utils.throwError, isString = utilities_1.utils.isString;
var AnonymousAuthProvider = (function (_super) {
    __extends(AnonymousAuthProvider, _super);
    function AnonymousAuthProvider(config) {
        var _this = _super.call(this, config) || this;
        _this._onConverted = _this._onConverted.bind(_this);
        addEventListener(__1.EVENTS.ANONYMOUS_CONVERTED, _this._onConverted);
        return _this;
    }
    AnonymousAuthProvider.prototype.signIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, anonymousUuidKey, refreshTokenKey, anonymous_uuid, refresh_token, res, loginState;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this._cache.updatePersistenceAsync('local')];
                    case 1:
                        _b.sent();
                        _a = this._cache.keys, anonymousUuidKey = _a.anonymousUuidKey, refreshTokenKey = _a.refreshTokenKey;
                        return [4, this._cache.getStoreAsync(anonymousUuidKey)];
                    case 2:
                        anonymous_uuid = _b.sent();
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 3:
                        refresh_token = _b.sent();
                        return [4, this._request.send('auth.signInAnonymously', {
                                anonymous_uuid: anonymous_uuid,
                                refresh_token: refresh_token
                            })];
                    case 4:
                        res = _b.sent();
                        if (!(res.uuid && res.refresh_token)) return [3, 10];
                        return [4, this._setAnonymousUUID(res.uuid)];
                    case 5:
                        _b.sent();
                        return [4, this.setRefreshToken(res.refresh_token)];
                    case 6:
                        _b.sent();
                        return [4, this._request.refreshAccessToken()];
                    case 7:
                        _b.sent();
                        __1.eventBus.fire(__1.EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this._config.env,
                            loginType: constants_1.LOGINTYPE.ANONYMOUS,
                            persistence: 'local'
                        });
                        __1.eventBus.fire(__1.EVENTS.LOGIN_STATE_CHANGED);
                        loginState = new __1.LoginState({
                            envId: this._config.env,
                            cache: this._cache,
                            request: this._request
                        });
                        return [4, loginState.checkLocalStateAsync()];
                    case 8:
                        _b.sent();
                        return [4, loginState.user.refresh()];
                    case 9:
                        _b.sent();
                        return [2, loginState];
                    case 10:
                        throwError(ERRORS.OPERATION_FAIL, JSON.stringify(res) || 'anonymous signIn failed');
                        _b.label = 11;
                    case 11: return [2];
                }
            });
        });
    };
    AnonymousAuthProvider.prototype.linkAndRetrieveDataWithTicket = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, anonymousUuidKey, refreshTokenKey, anonymous_uuid, refresh_token, res, loginState;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!isString(ticket)) {
                            throwError(ERRORS.INVALID_PARAMS, 'ticket must be a string');
                        }
                        _a = this._cache.keys, anonymousUuidKey = _a.anonymousUuidKey, refreshTokenKey = _a.refreshTokenKey;
                        return [4, this._cache.getStoreAsync(anonymousUuidKey)];
                    case 1:
                        anonymous_uuid = _b.sent();
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 2:
                        refresh_token = _b.sent();
                        return [4, this._request.send('auth.linkAndRetrieveDataWithTicket', {
                                anonymous_uuid: anonymous_uuid,
                                refresh_token: refresh_token,
                                ticket: ticket
                            })];
                    case 3:
                        res = _b.sent();
                        if (!res.refresh_token) return [3, 8];
                        return [4, this._clearAnonymousUUID()];
                    case 4:
                        _b.sent();
                        return [4, this.setRefreshToken(res.refresh_token)];
                    case 5:
                        _b.sent();
                        return [4, this._request.refreshAccessToken()];
                    case 6:
                        _b.sent();
                        __1.eventBus.fire(__1.EVENTS.ANONYMOUS_CONVERTED, { env: this._config.env });
                        __1.eventBus.fire(__1.EVENTS.LOGIN_TYPE_CHANGED, { loginType: constants_1.LOGINTYPE.CUSTOM, persistence: 'local' });
                        loginState = new __1.LoginState({
                            envId: this._config.env,
                            cache: this._cache,
                            request: this._request
                        });
                        return [4, loginState.checkLocalStateAsync()];
                    case 7:
                        _b.sent();
                        return [2, loginState];
                    case 8:
                        throwError(ERRORS.OPERATION_FAIL, JSON.stringify(res) || 'linkAndRetrieveDataWithTicket failed');
                        _b.label = 9;
                    case 9: return [2];
                }
            });
        });
    };
    AnonymousAuthProvider.prototype._setAnonymousUUID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, anonymousUuidKey, loginTypeKey;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._cache.keys, anonymousUuidKey = _a.anonymousUuidKey, loginTypeKey = _a.loginTypeKey;
                        return [4, this._cache.removeStoreAsync(anonymousUuidKey)];
                    case 1:
                        _b.sent();
                        return [4, this._cache.setStoreAsync(anonymousUuidKey, id)];
                    case 2:
                        _b.sent();
                        return [4, this._cache.setStoreAsync(loginTypeKey, constants_1.LOGINTYPE.ANONYMOUS)];
                    case 3:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    AnonymousAuthProvider.prototype._clearAnonymousUUID = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._cache.removeStoreAsync(this._cache.keys.anonymousUuidKey)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    AnonymousAuthProvider.prototype._onConverted = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var env;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        env = ev.data.env;
                        if (env !== this._config.env) {
                            return [2];
                        }
                        return [4, this._cache.updatePersistenceAsync(this._config.persistence)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return AnonymousAuthProvider;
}(base_1.AuthProvider));
exports.AnonymousAuthProvider = AnonymousAuthProvider;
