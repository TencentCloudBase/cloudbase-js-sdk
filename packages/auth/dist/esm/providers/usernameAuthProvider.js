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
import { eventBus, EVENTS, LoginState } from '..';
import { LOGINTYPE } from '../constants';
import { utils, constants, helpers } from '@cloudbase/utilities';
var printWarn = utils.printWarn;
var ERRORS = constants.ERRORS, COMMUNITY_SITE_URL = constants.COMMUNITY_SITE_URL;
var catchErrorsDecorator = helpers.catchErrorsDecorator, stopAuthLoginWithOAuth = helpers.stopAuthLoginWithOAuth;
var UsernameAuthProvider = (function (_super) {
    __extends(UsernameAuthProvider, _super);
    function UsernameAuthProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UsernameAuthProvider.prototype.signIn = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshTokenKey, res, _a, _b, _c, _d, refresh_token, access_token_expire, access_token;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (typeof username !== 'string') {
                            throw new Error(JSON.stringify({
                                code: ERRORS.INVALID_PARAMS,
                                msg: 'username must be a string'
                            }));
                        }
                        if (typeof password !== 'string') {
                            password = '';
                            printWarn(ERRORS.INVALID_PARAMS, 'password is empty');
                        }
                        refreshTokenKey = this._cache.keys.refreshTokenKey;
                        _b = (_a = this._request).send;
                        _c = ['auth.signIn'];
                        _d = {
                            loginType: LOGINTYPE.USERNAME,
                            username: username,
                            password: password
                        };
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 1: return [4, _b.apply(_a, _c.concat([(_d.refresh_token = (_e.sent()) || '',
                                _d)]))];
                    case 2:
                        res = _e.sent();
                        refresh_token = res.refresh_token, access_token_expire = res.access_token_expire, access_token = res.access_token;
                        if (!refresh_token) return [3, 9];
                        return [4, this.setRefreshToken(refresh_token)];
                    case 3:
                        _e.sent();
                        if (!(access_token && access_token_expire)) return [3, 5];
                        return [4, this.setAccessToken(access_token, access_token_expire)];
                    case 4:
                        _e.sent();
                        return [3, 7];
                    case 5: return [4, this._request.refreshAccessToken()];
                    case 6:
                        _e.sent();
                        _e.label = 7;
                    case 7: return [4, this.refreshUserInfo()];
                    case 8:
                        _e.sent();
                        eventBus.fire(EVENTS.LOGIN_STATE_CHANGED);
                        eventBus.fire(EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this._config.env,
                            loginType: LOGINTYPE.USERNAME,
                            persistence: this._config.persistence
                        });
                        return [2, new LoginState({
                                envId: this._config.env,
                                cache: this._cache,
                                request: this._request
                            })];
                    case 9:
                        if (res.code) {
                            throw new Error(JSON.stringify({
                                code: ERRORS.OPERATION_FAIL,
                                msg: "login by username failed:[" + res.code + "] " + res.message
                            }));
                        }
                        else {
                            throw new Error(JSON.stringify({
                                code: ERRORS.OPERATION_FAIL,
                                msg: 'login by username failed'
                            }));
                        }
                        _e.label = 10;
                    case 10: return [2];
                }
            });
        });
    };
    __decorate([
        stopAuthLoginWithOAuth(),
        catchErrorsDecorator({
            title: '用户名密码登录失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().signInWithUsernameAndPassword() 的语法或参数是否正确',
                '  2 - 当前环境是否开通了用户名密码登录',
                '  3 - 用户名密码是否匹配',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], UsernameAuthProvider.prototype, "signIn", null);
    return UsernameAuthProvider;
}(AuthProvider));
export { UsernameAuthProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcm5hbWVBdXRoUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvdmlkZXJzL3VzZXJuYW1lQXV0aFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRXRDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLElBQUksQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELElBQUEsU0FBUyxHQUFLLEtBQUssVUFBVixDQUFXO0FBQ3BCLElBQUEsTUFBTSxHQUF5QixTQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUssU0FBUyxtQkFBZCxDQUFlO0FBQ3pDLElBQUEsb0JBQW9CLEdBQTZCLE9BQU8scUJBQXBDLEVBQUUsc0JBQXNCLEdBQUssT0FBTyx1QkFBWixDQUFhO0FBRWpFO0lBQTBDLHdDQUFZO0lBQXREOztJQWtFQSxDQUFDO0lBdERjLHFDQUFNLEdBQW5CLFVBQW9CLFFBQWdCLEVBQUUsUUFBZ0I7Ozs7Ozt3QkFDcEQsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7NEJBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQ0FDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjO2dDQUMzQixHQUFHLEVBQUUsMkJBQTJCOzZCQUNqQyxDQUFDLENBQUMsQ0FBQzt5QkFDTDt3QkFFRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTs0QkFDaEMsUUFBUSxHQUFHLEVBQUUsQ0FBQzs0QkFDZCxT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UHJvdmlkZXIgfSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IHsgSUxvZ2luU3RhdGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2F1dGgnO1xuaW1wb3J0IHsgZXZlbnRCdXMsIEVWRU5UUywgTG9naW5TdGF0ZSB9IGZyb20gJy4uJztcbmltcG9ydCB7IExPR0lOVFlQRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyB1dGlscywgY29uc3RhbnRzLCBoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuXG5jb25zdCB7IHByaW50V2FybiB9ID0gdXRpbHM7XG5jb25zdCB7IEVSUk9SUywgQ09NTVVOSVRZX1NJVEVfVVJMIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IGNhdGNoRXJyb3JzRGVjb3JhdG9yLCBzdG9wQXV0aExvZ2luV2l0aE9BdXRoIH0gPSBoZWxwZXJzO1xuXG5leHBvcnQgY2xhc3MgVXNlcm5hbWVBdXRoUHJvdmlkZXIgZXh0ZW5kcyBBdXRoUHJvdmlkZXIge1xuICBAc3RvcEF1dGhMb2dpbldpdGhPQXV0aCgpXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfnlKjmiLflkI3lr4bnoIHnmbvlvZXlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLnNpZ25JbldpdGhVc2VybmFtZUFuZFBhc3N3b3JkKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobnlKjmiLflkI3lr4bnoIHnmbvlvZUnLFxuICAgICAgJyAgMyAtIOeUqOaIt+WQjeWvhueggeaYr+WQpuWMuemFjScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHNpZ25Jbih1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxJTG9naW5TdGF0ZT4ge1xuICAgIGlmICh0eXBlb2YgdXNlcm5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgIG1zZzogJ3VzZXJuYW1lIG11c3QgYmUgYSBzdHJpbmcnXG4gICAgICB9KSk7XG4gICAgfVxuICAgIC8vIOeUqOaIt+S4jeiuvue9ruWvhueggVxuICAgIGlmICh0eXBlb2YgcGFzc3dvcmQgIT09ICdzdHJpbmcnKSB7XG4gICAgICBwYXNzd29yZCA9ICcnO1xuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ3Bhc3N3b3JkIGlzIGVtcHR5Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnNpZ25JbicsIHtcbiAgICAgIGxvZ2luVHlwZTogTE9HSU5UWVBFLlVTRVJOQU1FLFxuICAgICAgdXNlcm5hbWUsXG4gICAgICBwYXNzd29yZCxcbiAgICAgIHJlZnJlc2hfdG9rZW46IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KSB8fCAnJ1xuICAgIH0pO1xuXG4gICAgY29uc3QgeyByZWZyZXNoX3Rva2VuLCBhY2Nlc3NfdG9rZW5fZXhwaXJlLCBhY2Nlc3NfdG9rZW4gfSA9IHJlcztcbiAgICBpZiAocmVmcmVzaF90b2tlbikge1xuICAgICAgYXdhaXQgdGhpcy5zZXRSZWZyZXNoVG9rZW4ocmVmcmVzaF90b2tlbik7XG4gICAgICBpZiAoYWNjZXNzX3Rva2VuICYmIGFjY2Vzc190b2tlbl9leHBpcmUpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRBY2Nlc3NUb2tlbihhY2Nlc3NfdG9rZW4sIGFjY2Vzc190b2tlbl9leHBpcmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fcmVxdWVzdC5yZWZyZXNoQWNjZXNzVG9rZW4oKTtcbiAgICAgIH1cbiAgICAgIC8vIHNldCB1c2VyIGluZm9cbiAgICAgIGF3YWl0IHRoaXMucmVmcmVzaFVzZXJJbmZvKCk7XG4gICAgICBldmVudEJ1cy5maXJlKEVWRU5UUy5MT0dJTl9TVEFURV9DSEFOR0VEKTtcbiAgICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCwge1xuICAgICAgICBlbnY6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGxvZ2luVHlwZTogTE9HSU5UWVBFLlVTRVJOQU1FLFxuICAgICAgICBwZXJzaXN0ZW5jZTogdGhpcy5fY29uZmlnLnBlcnNpc3RlbmNlXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgTG9naW5TdGF0ZSh7XG4gICAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAocmVzLmNvZGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5PUEVSQVRJT05fRkFJTCxcbiAgICAgICAgbXNnOiBgbG9naW4gYnkgdXNlcm5hbWUgZmFpbGVkOlske3Jlcy5jb2RlfV0gJHtyZXMubWVzc2FnZX1gXG4gICAgICB9KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5PUEVSQVRJT05fRkFJTCxcbiAgICAgICAgbXNnOiAnbG9naW4gYnkgdXNlcm5hbWUgZmFpbGVkJ1xuICAgICAgfSkpO1xuICAgIH1cbiAgfVxufVxuIl19