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
import { constants, utils, helpers, events } from '@cloudbase/utilities';
import { LOGINTYPE } from '../constants';
import { EVENTS, eventBus, LoginState } from '..';
var ERRORS = constants.ERRORS, COMMUNITY_SITE_URL = constants.COMMUNITY_SITE_URL;
var throwError = utils.throwError, isString = utils.isString;
var addEventListener = events.addEventListener;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5vbnltb3VzQXV0aFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy9hbm9ueW1vdXNBdXRoUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR3pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRTFDLElBQUEsTUFBTSxHQUF5QixTQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUssU0FBUyxtQkFBZCxDQUFlO0FBQ3pDLElBQUEsVUFBVSxHQUFlLEtBQUssV0FBcEIsRUFBRSxRQUFRLEdBQUssS0FBSyxTQUFWLENBQVc7QUFDL0IsSUFBQSxnQkFBZ0IsR0FBSyxNQUFNLGlCQUFYLENBQVk7QUFDNUIsSUFBQSxvQkFBb0IsR0FBSyxPQUFPLHFCQUFaLENBQWE7QUFFekM7SUFBMkMseUNBQVk7SUFDckQsK0JBQVksTUFBNkU7UUFBekYsWUFDRSxrQkFBTSxNQUFNLENBQUMsU0FLZDtRQUhDLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7UUFFakQsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7SUFDbEUsQ0FBQztJQVdZLHNDQUFNLEdBQW5COzs7Ozs0QkFFRSxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNC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Ozt1REF5Q0Q7SUFxREgsNEJBQUM7Q0FBQSxBQS9HRCxDQUEyQyxZQUFZLEdBK0d0RDtTQS9HWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUF1dGhDb25maWcsIElMb2dpblN0YXRlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9hdXRoJztcbmltcG9ydCB7IGNvbnN0YW50cywgdXRpbHMsIGhlbHBlcnMsIGV2ZW50cyB9IGZyb20gJ0BjbG91ZGJhc2UvdXRpbGl0aWVzJztcbmltcG9ydCB7IElDbG91ZGJhc2VDYWNoZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY2FjaGUnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZVJlcXVlc3QgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL3JlcXVlc3QnO1xuaW1wb3J0IHsgTE9HSU5UWVBFIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IEVWRU5UUywgZXZlbnRCdXMsIExvZ2luU3RhdGUgfSBmcm9tICcuLic7XG5cbmNvbnN0IHsgRVJST1JTLCBDT01NVU5JVFlfU0lURV9VUkwgfSA9IGNvbnN0YW50cztcbmNvbnN0IHsgdGhyb3dFcnJvciwgaXNTdHJpbmcgfSA9IHV0aWxzO1xuY29uc3QgeyBhZGRFdmVudExpc3RlbmVyIH0gPSBldmVudHM7XG5jb25zdCB7IGNhdGNoRXJyb3JzRGVjb3JhdG9yIH0gPSBoZWxwZXJzO1xuXG5leHBvcnQgY2xhc3MgQW5vbnltb3VzQXV0aFByb3ZpZGVyIGV4dGVuZHMgQXV0aFByb3ZpZGVyIHtcbiAgY29uc3RydWN0b3IoY29uZmlnOklDbG91ZGJhc2VBdXRoQ29uZmlnJntjYWNoZTpJQ2xvdWRiYXNlQ2FjaGUscmVxdWVzdDpJQ2xvdWRiYXNlUmVxdWVzdH0pe1xuICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICB0aGlzLl9vbkNvbnZlcnRlZCA9IHRoaXMuX29uQ29udmVydGVkLmJpbmQodGhpcyk7XG4gICAgLy8g55uR5ZCs6L2s5q2j5LqL5Lu2XG4gICAgYWRkRXZlbnRMaXN0ZW5lcihFVkVOVFMuQU5PTllNT1VTX0NPTlZFUlRFRCwgdGhpcy5fb25Db252ZXJ0ZWQpO1xuICB9XG5cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+WMv+WQjeeZu+W9leWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOWQr+S6huWMv+WQjeeZu+W9lScsXG4gICAgICAnICAyIC0g6LCD55SoIGF1dGgoKS5hbm9ueW1vdXNlUHJvdmlkZXIoKS5zaWduSW4oKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBzaWduSW4oKTpQcm9taXNlPElMb2dpblN0YXRlPiB7XG4gICAgLy8g5Yy/5ZCN55m75b2V5YmN6L+B56e7Y2FjaGXliLBsb2NhbHN0b3JhZ2VcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS51cGRhdGVQZXJzaXN0ZW5jZUFzeW5jKCdsb2NhbCcpO1xuICAgIGNvbnN0IHsgYW5vbnltb3VzVXVpZEtleSwgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIC8vIOWmguaenOacrOWcsOWtmOaciXVpZOWImeWMv+WQjeeZu+W9leaXtuS8oOe7mXNlcnZlclxuICAgIGNvbnN0IGFub255bW91c191dWlkID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhhbm9ueW1vdXNVdWlkS2V5KTtcbiAgICAvLyDmraTlpIRjYWNoZeS4uuWfuuexu3Byb3BlcnR5XG4gICAgY29uc3QgcmVmcmVzaF90b2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcblxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5zaWduSW5Bbm9ueW1vdXNseScsIHtcbiAgICAgIGFub255bW91c191dWlkLFxuICAgICAgcmVmcmVzaF90b2tlblxuICAgIH0pO1xuICAgIGlmIChyZXMudXVpZCAmJiByZXMucmVmcmVzaF90b2tlbikge1xuICAgICAgYXdhaXQgdGhpcy5fc2V0QW5vbnltb3VzVVVJRChyZXMudXVpZCk7XG4gICAgICBhd2FpdCB0aGlzLnNldFJlZnJlc2hUb2tlbihyZXMucmVmcmVzaF90b2tlbik7XG4gICAgICBhd2FpdCB0aGlzLl9yZXF1ZXN0LnJlZnJlc2hBY2Nlc3NUb2tlbigpO1xuXG4gICAgICBldmVudEJ1cy5maXJlKEVWRU5UUy5MT0dJTl9UWVBFX0NIQU5HRUQsIHtcbiAgICAgICAgZW52OiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgICBsb2dpblR5cGU6IExPR0lOVFlQRS5BTk9OWU1PVVMsXG4gICAgICAgIHBlcnNpc3RlbmNlOiAnbG9jYWwnXG4gICAgICB9KTtcblxuICAgICAgZXZlbnRCdXMuZmlyZShFVkVOVFMuTE9HSU5fU1RBVEVfQ0hBTkdFRCk7XG5cbiAgICAgIGNvbnN0IGxvZ2luU3RhdGUgPSBuZXcgTG9naW5TdGF0ZSh7XG4gICAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgbG9naW5TdGF0ZS5jaGVja0xvY2FsU3RhdGVBc3luYygpO1xuICAgICAgYXdhaXQgbG9naW5TdGF0ZS51c2VyLnJlZnJlc2goKTtcbiAgICAgIHJldHVybiBsb2dpblN0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsXG4gICAgICAgIG1zZzogSlNPTi5zdHJpbmdpZnkocmVzKXx8J2Fub255bW91cyBzaWduSW4gZmFpbGVkJ1xuICAgICAgfSkpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog5Yy/5ZCN6L2s5q2jXG4gICAqIEBwYXJhbSB0aWNrZXQgXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgbGlua0FuZFJldHJpZXZlRGF0YVdpdGhUaWNrZXQodGlja2V0OiBzdHJpbmcpOlByb21pc2U8SUxvZ2luU3RhdGU+IHtcbiAgICBpZighaXNTdHJpbmcodGlja2V0KSl7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywndGlja2V0IG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICB9XG4gICAgY29uc3QgeyBhbm9ueW1vdXNVdWlkS2V5LCByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgYW5vbnltb3VzX3V1aWQgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFub255bW91c1V1aWRLZXkpO1xuICAgIGNvbnN0IHJlZnJlc2hfdG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLmxpbmtBbmRSZXRyaWV2ZURhdGFXaXRoVGlja2V0Jywge1xuICAgICAgYW5vbnltb3VzX3V1aWQsXG4gICAgICByZWZyZXNoX3Rva2VuLFxuICAgICAgdGlja2V0XG4gICAgfSk7XG4gICAgaWYgKHJlcy5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICAvLyDovazmraPlkI7muIXpmaTmnKzlnLDkv53lrZjnmoTljL/lkI11dWlkXG4gICAgICBhd2FpdCB0aGlzLl9jbGVhckFub255bW91c1VVSUQoKTtcbiAgICAgIGF3YWl0IHRoaXMuc2V0UmVmcmVzaFRva2VuKHJlcy5yZWZyZXNoX3Rva2VuKTtcbiAgICAgIGF3YWl0IHRoaXMuX3JlcXVlc3QucmVmcmVzaEFjY2Vzc1Rva2VuKCk7XG4gICAgICBldmVudEJ1cy5maXJlKEVWRU5UUy5BTk9OWU1PVVNfQ09OVkVSVEVELCB7IGVudjogdGhpcy5fY29uZmlnLmVudiB9KTtcbiAgICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCwgeyBsb2dpblR5cGU6IExPR0lOVFlQRS5DVVNUT00sIHBlcnNpc3RlbmNlOiAnbG9jYWwnIH0pO1xuICAgICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBsb2dpblN0YXRlLmNoZWNrTG9jYWxTdGF0ZUFzeW5jKCk7XG4gICAgICBcbiAgICAgIHJldHVybiBsb2dpblN0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5PUEVSQVRJT05fRkFJTCxKU09OLnN0cmluZ2lmeShyZXMpfHwnbGlua0FuZFJldHJpZXZlRGF0YVdpdGhUaWNrZXQgZmFpbGVkJyk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgYXN5bmMgX3NldEFub255bW91c1VVSUQoaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHsgYW5vbnltb3VzVXVpZEtleSwgbG9naW5UeXBlS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYW5vbnltb3VzVXVpZEtleSk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhhbm9ueW1vdXNVdWlkS2V5LCBpZCk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhsb2dpblR5cGVLZXksIExPR0lOVFlQRS5BTk9OWU1PVVMpO1xuICB9XG4gIHByaXZhdGUgYXN5bmMgX2NsZWFyQW5vbnltb3VzVVVJRCgpIHtcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS5yZW1vdmVTdG9yZUFzeW5jKHRoaXMuX2NhY2hlLmtleXMuYW5vbnltb3VzVXVpZEtleSk7XG4gIH1cbiAgcHJpdmF0ZSBhc3luYyBfb25Db252ZXJ0ZWQoZXYpIHtcbiAgICBjb25zdCB7IGVudiB9ID0gZXYuZGF0YTtcbiAgICBpZiAoZW52ICE9PSB0aGlzLl9jb25maWcuZW52KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIOWMv+WQjei9rOato+WQjui/geenu2NhY2hlXG4gICAgYXdhaXQgdGhpcy5fY2FjaGUudXBkYXRlUGVyc2lzdGVuY2VBc3luYyh0aGlzLl9jb25maWcucGVyc2lzdGVuY2UpO1xuICB9XG59Il19