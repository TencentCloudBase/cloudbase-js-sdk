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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
import { AuthProvider } from './base';
import { constants, utils, helpers } from '@cloudbase/utilities';
import { LOGINTYPE } from '../constants';
import { EVENTS, eventBus, LoginState } from '..';
var ERRORS = constants.ERRORS, COMMUNITY_SITE_URL = constants.COMMUNITY_SITE_URL;
var throwError = utils.throwError, isString = utils.isString;
var catchErrorsDecorator = helpers.catchErrorsDecorator;
var AnonymousAuthProvider = (function (_super) {
    __extends(AnonymousAuthProvider, _super);
    function AnonymousAuthProvider(config) {
        var _this = _super.call(this, config) || this;
        _this._onConverted = _this._onConverted.bind(_this);
        addEventListener(EVENTS.ANONYMOUS_CONVERTED, _this._onConverted);
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
                        eventBus.fire(EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this._config.env,
                            loginType: LOGINTYPE.ANONYMOUS,
                            persistence: 'local'
                        });
                        eventBus.fire(EVENTS.LOGIN_STATE_CHANGED);
                        loginState = new LoginState({
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
                    case 10: throw new Error(JSON.stringify({
                        code: ERRORS.OPERATION_FAIL,
                        msg: JSON.stringify(res) || 'anonymous signIn failed'
                    }));
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
                        eventBus.fire(EVENTS.ANONYMOUS_CONVERTED, { env: this._config.env });
                        eventBus.fire(EVENTS.LOGIN_TYPE_CHANGED, { loginType: LOGINTYPE.CUSTOM, persistence: 'local' });
                        loginState = new LoginState({
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
                        return [4, this._cache.setStoreAsync(loginTypeKey, LOGINTYPE.ANONYMOUS)];
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
    __decorate([
        catchErrorsDecorator({
            title: '匿名登录失败',
            messages: [
                '请确认以下各项：',
                '  1 - 当前环境是否开启了匿名登录',
                '  2 - 调用 auth().anonymouseProvider().signIn() 的语法或参数是否正确',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], AnonymousAuthProvider.prototype, "signIn", null);
    return AnonymousAuthProvider;
}(AuthProvider));
export { AnonymousAuthProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5vbnltb3VzQXV0aFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy9hbm9ueW1vdXNBdXRoUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHakUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFMUMsSUFBQSxNQUFNLEdBQXlCLFNBQVMsT0FBbEMsRUFBRSxrQkFBa0IsR0FBSyxTQUFTLG1CQUFkLENBQWU7QUFDekMsSUFBQSxVQUFVLEdBQWUsS0FBSyxXQUFwQixFQUFFLFFBQVEsR0FBSyxLQUFLLFNBQVYsQ0FBVztBQUMvQixJQUFBLG9CQUFvQixHQUFLLE9BQU8scUJBQVosQ0FBYTtBQUV6QztJQUEyQyx5Q0FBWTtJQUNyRCwrQkFBWSxNQUE2RTtRQUF6RixZQUNFLGtCQUFNLE1BQU0sQ0FBQyxTQUtkO1FBSEMsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUVqRCxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDOztJQUNsRSxDQUFDO0lBV1ksc0NBQU0sR0FBbkI7Ozs7OzRCQUVFLFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsRUFBQTs7d0JBQWpELFNBQWlELENBQUM7d0JBQzVDLEtB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O1NBL0dZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQXV0aENvbmZpZywgSUxvZ2luU3RhdGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2F1dGgnO1xuaW1wb3J0IHsgY29uc3RhbnRzLCB1dGlscywgaGVscGVycyB9IGZyb20gJ0BjbG91ZGJhc2UvdXRpbGl0aWVzJztcbmltcG9ydCB7IElDbG91ZGJhc2VDYWNoZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY2FjaGUnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZVJlcXVlc3QgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL3JlcXVlc3QnO1xuaW1wb3J0IHsgTE9HSU5UWVBFIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IEVWRU5UUywgZXZlbnRCdXMsIExvZ2luU3RhdGUgfSBmcm9tICcuLic7XG5cbmNvbnN0IHsgRVJST1JTLCBDT01NVU5JVFlfU0lURV9VUkwgfSA9IGNvbnN0YW50cztcbmNvbnN0IHsgdGhyb3dFcnJvciwgaXNTdHJpbmcgfSA9IHV0aWxzO1xuY29uc3QgeyBjYXRjaEVycm9yc0RlY29yYXRvciB9ID0gaGVscGVycztcblxuZXhwb3J0IGNsYXNzIEFub255bW91c0F1dGhQcm92aWRlciBleHRlbmRzIEF1dGhQcm92aWRlciB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZzpJQ2xvdWRiYXNlQXV0aENvbmZpZyZ7Y2FjaGU6SUNsb3VkYmFzZUNhY2hlLHJlcXVlc3Q6SUNsb3VkYmFzZVJlcXVlc3R9KXtcbiAgICBzdXBlcihjb25maWcpO1xuXG4gICAgdGhpcy5fb25Db252ZXJ0ZWQgPSB0aGlzLl9vbkNvbnZlcnRlZC5iaW5kKHRoaXMpO1xuICAgIC8vIOebkeWQrOi9rOato+S6i+S7tlxuICAgIGFkZEV2ZW50TGlzdGVuZXIoRVZFTlRTLkFOT05ZTU9VU19DT05WRVJURUQsIHRoaXMuX29uQ29udmVydGVkKTtcbiAgfVxuXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfljL/lkI3nmbvlvZXlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDlvZPliY3njq/looPmmK/lkKblvIDlkK/kuobljL/lkI3nmbvlvZUnLFxuICAgICAgJyAgMiAtIOiwg+eUqCBhdXRoKCkuYW5vbnltb3VzZVByb3ZpZGVyKCkuc2lnbkluKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgc2lnbkluKCk6UHJvbWlzZTxJTG9naW5TdGF0ZT4ge1xuICAgIC8vIOWMv+WQjeeZu+W9leWJjei/geenu2NhY2hl5YiwbG9jYWxzdG9yYWdlXG4gICAgYXdhaXQgdGhpcy5fY2FjaGUudXBkYXRlUGVyc2lzdGVuY2VBc3luYygnbG9jYWwnKTtcbiAgICBjb25zdCB7IGFub255bW91c1V1aWRLZXksIHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICAvLyDlpoLmnpzmnKzlnLDlrZjmnIl1aWTliJnljL/lkI3nmbvlvZXml7bkvKDnu5lzZXJ2ZXJcbiAgICBjb25zdCBhbm9ueW1vdXNfdXVpZCA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYW5vbnltb3VzVXVpZEtleSk7XG4gICAgLy8g5q2k5aSEY2FjaGXkuLrln7rnsbtwcm9wZXJ0eVxuICAgIGNvbnN0IHJlZnJlc2hfdG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGguc2lnbkluQW5vbnltb3VzbHknLCB7XG4gICAgICBhbm9ueW1vdXNfdXVpZCxcbiAgICAgIHJlZnJlc2hfdG9rZW5cbiAgICB9KTtcbiAgICBpZiAocmVzLnV1aWQgJiYgcmVzLnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgIGF3YWl0IHRoaXMuX3NldEFub255bW91c1VVSUQocmVzLnV1aWQpO1xuICAgICAgYXdhaXQgdGhpcy5zZXRSZWZyZXNoVG9rZW4ocmVzLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgYXdhaXQgdGhpcy5fcmVxdWVzdC5yZWZyZXNoQWNjZXNzVG9rZW4oKTtcblxuICAgICAgZXZlbnRCdXMuZmlyZShFVkVOVFMuTE9HSU5fVFlQRV9DSEFOR0VELCB7XG4gICAgICAgIGVudjogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgbG9naW5UeXBlOiBMT0dJTlRZUEUuQU5PTllNT1VTLFxuICAgICAgICBwZXJzaXN0ZW5jZTogJ2xvY2FsJ1xuICAgICAgfSk7XG5cbiAgICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQpO1xuXG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IGxvZ2luU3RhdGUuY2hlY2tMb2NhbFN0YXRlQXN5bmMoKTtcbiAgICAgIGF3YWl0IGxvZ2luU3RhdGUudXNlci5yZWZyZXNoKCk7XG4gICAgICByZXR1cm4gbG9naW5TdGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLk9QRVJBVElPTl9GQUlMLFxuICAgICAgICBtc2c6IEpTT04uc3RyaW5naWZ5KHJlcyl8fCdhbm9ueW1vdXMgc2lnbkluIGZhaWxlZCdcbiAgICAgIH0pKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOWMv+WQjei9rOato1xuICAgKiBAcGFyYW0gdGlja2V0IFxuICAgKi9cbiAgcHVibGljIGFzeW5jIGxpbmtBbmRSZXRyaWV2ZURhdGFXaXRoVGlja2V0KHRpY2tldDogc3RyaW5nKTpQcm9taXNlPElMb2dpblN0YXRlPiB7XG4gICAgaWYoIWlzU3RyaW5nKHRpY2tldCkpe1xuICAgICAgdGhyb3dFcnJvcihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsJ3RpY2tldCBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgfVxuICAgIGNvbnN0IHsgYW5vbnltb3VzVXVpZEtleSwgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IGFub255bW91c191dWlkID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhhbm9ueW1vdXNVdWlkS2V5KTtcbiAgICBjb25zdCByZWZyZXNoX3Rva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5saW5rQW5kUmV0cmlldmVEYXRhV2l0aFRpY2tldCcsIHtcbiAgICAgIGFub255bW91c191dWlkLFxuICAgICAgcmVmcmVzaF90b2tlbixcbiAgICAgIHRpY2tldFxuICAgIH0pO1xuICAgIGlmIChyZXMucmVmcmVzaF90b2tlbikge1xuICAgICAgLy8g6L2s5q2j5ZCO5riF6Zmk5pys5Zyw5L+d5a2Y55qE5Yy/5ZCNdXVpZFxuICAgICAgYXdhaXQgdGhpcy5fY2xlYXJBbm9ueW1vdXNVVUlEKCk7XG4gICAgICBhd2FpdCB0aGlzLnNldFJlZnJlc2hUb2tlbihyZXMucmVmcmVzaF90b2tlbik7XG4gICAgICBhd2FpdCB0aGlzLl9yZXF1ZXN0LnJlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgICAgZXZlbnRCdXMuZmlyZShFVkVOVFMuQU5PTllNT1VTX0NPTlZFUlRFRCwgeyBlbnY6IHRoaXMuX2NvbmZpZy5lbnYgfSk7XG4gICAgICBldmVudEJ1cy5maXJlKEVWRU5UUy5MT0dJTl9UWVBFX0NIQU5HRUQsIHsgbG9naW5UeXBlOiBMT0dJTlRZUEUuQ1VTVE9NLCBwZXJzaXN0ZW5jZTogJ2xvY2FsJyB9KTtcbiAgICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBuZXcgTG9naW5TdGF0ZSh7XG4gICAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgbG9naW5TdGF0ZS5jaGVja0xvY2FsU3RhdGVBc3luYygpO1xuICAgICAgXG4gICAgICByZXR1cm4gbG9naW5TdGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3dFcnJvcihFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsSlNPTi5zdHJpbmdpZnkocmVzKXx8J2xpbmtBbmRSZXRyaWV2ZURhdGFXaXRoVGlja2V0IGZhaWxlZCcpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIGFzeW5jIF9zZXRBbm9ueW1vdXNVVUlEKGlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB7IGFub255bW91c1V1aWRLZXksIGxvZ2luVHlwZUtleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKGFub255bW91c1V1aWRLZXkpO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoYW5vbnltb3VzVXVpZEtleSwgaWQpO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMobG9naW5UeXBlS2V5LCBMT0dJTlRZUEUuQU5PTllNT1VTKTtcbiAgfVxuICBwcml2YXRlIGFzeW5jIF9jbGVhckFub255bW91c1VVSUQoKSB7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyh0aGlzLl9jYWNoZS5rZXlzLmFub255bW91c1V1aWRLZXkpO1xuICB9XG4gIHByaXZhdGUgYXN5bmMgX29uQ29udmVydGVkKGV2KSB7XG4gICAgY29uc3QgeyBlbnYgfSA9IGV2LmRhdGE7XG4gICAgaWYgKGVudiAhPT0gdGhpcy5fY29uZmlnLmVudikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDljL/lkI3ovazmraPlkI7ov4Hnp7tjYWNoZVxuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnVwZGF0ZVBlcnNpc3RlbmNlQXN5bmModGhpcy5fY29uZmlnLnBlcnNpc3RlbmNlKTtcbiAgfVxufSJdfQ==