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
import { constants, utils, helpers } from '@cloudbase/utilities';
import { AuthProvider } from './base';
import { LOGINTYPE } from '../constants';
import { eventBus, EVENTS, LoginState } from '..';
var throwError = utils.throwError, isString = utils.isString, transformPhone = utils.transformPhone;
var ERRORS = constants.ERRORS, COMMUNITY_SITE_URL = constants.COMMUNITY_SITE_URL;
var catchErrorsDecorator = helpers.catchErrorsDecorator;
var SIGN_METHOD = {
    SIGNIN: 'SIGNIN',
    SIGNUP: 'SIGNUP'
};
var PhoneAuthProvider = (function (_super) {
    __extends(PhoneAuthProvider, _super);
    function PhoneAuthProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PhoneAuthProvider.prototype.signIn = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var phoneNumber, phoneCode, password, signMethod, refreshTokenKey, res, refresh_token, access_token, access_token_expire;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        phoneNumber = param.phoneNumber, phoneCode = param.phoneCode, password = param.password, signMethod = param.signMethod;
                        if (!isString(phoneNumber)) {
                            throwError(ERRORS.INVALID_PARAMS, 'phoneNumber must be a string');
                        }
                        if (!isString(phoneCode) && !isString(password)) {
                            throwError(ERRORS.INVALID_PARAMS, 'phoneCode or password must be a string');
                        }
                        if (!signMethod) {
                            signMethod = SIGN_METHOD.SIGNIN;
                        }
                        refreshTokenKey = this._cache.keys.refreshTokenKey;
                        return [4, this._request.send('auth.signIn', {
                                loginType: LOGINTYPE.PHONE,
                                phoneNumber: transformPhone(phoneNumber),
                                phoneCode: phoneCode,
                                password: password,
                                refresh_token: this._cache.getStore(refreshTokenKey) || '',
                                signMethod: signMethod
                            })];
                    case 1:
                        res = _a.sent();
                        refresh_token = res.refresh_token, access_token = res.access_token, access_token_expire = res.access_token_expire;
                        if (!refresh_token) return [3, 8];
                        return [4, this.setRefreshToken(refresh_token)];
                    case 2:
                        _a.sent();
                        if (!(access_token && access_token_expire)) return [3, 4];
                        return [4, this.setAccessToken(access_token, access_token_expire)];
                    case 3:
                        _a.sent();
                        return [3, 6];
                    case 4: return [4, this._request.refreshAccessToken()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [4, this.refreshUserInfo()];
                    case 7:
                        _a.sent();
                        eventBus.fire(EVENTS.LOGIN_STATE_CHANGED);
                        eventBus.fire(EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this._config.env,
                            loginType: LOGINTYPE.PHONE,
                            persistence: this._config.persistence
                        });
                        return [2, new LoginState({
                                envId: this._config.env,
                                cache: this._cache,
                                request: this._request
                            })];
                    case 8:
                        if (res.code) {
                            throwError(ERRORS.OPERATION_FAIL, "Phone login fail[" + res.code + "] " + res.message);
                        }
                        else {
                            throwError(ERRORS.OPERATION_FAIL, "Phone login fail");
                        }
                        _a.label = 9;
                    case 9: return [2];
                }
            });
        });
    };
    PhoneAuthProvider.prototype.signUp = function (phoneNumber, phoneCode, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.signIn({
                        phoneNumber: phoneNumber,
                        phoneCode: phoneCode,
                        password: password,
                        signMethod: SIGN_METHOD.SIGNUP
                    })];
            });
        });
    };
    __decorate([
        catchErrorsDecorator({
            title: '手机号登录失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().SmsAuthProvider() 的语法或参数是否正确',
                '  2 - 当前环境是否开通了短信验证码登录',
                '  3 - 短信验证码/密码是否正确',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], PhoneAuthProvider.prototype, "signIn", null);
    __decorate([
        catchErrorsDecorator({
            title: '手机短信注册失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().signUpWithPhoneCode() 的语法或参数是否正确',
                '  2 - 当前环境是否开通了短信验证码登录',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String]),
        __metadata("design:returntype", Promise)
    ], PhoneAuthProvider.prototype, "signUp", null);
    return PhoneAuthProvider;
}(AuthProvider));
export { PhoneAuthProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvbmVBdXRoUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvdmlkZXJzL3Bob25lQXV0aFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUUvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLFFBQVEsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRXhDLElBQUEsVUFBVSxHQUE2QixLQUFLLFdBQWxDLEVBQUMsUUFBUSxHQUFvQixLQUFLLFNBQXpCLEVBQUMsY0FBYyxHQUFLLEtBQUssZUFBVixDQUFXO0FBQzdDLElBQUEsTUFBTSxHQUF3QixTQUFTLE9BQWpDLEVBQUMsa0JBQWtCLEdBQUssU0FBUyxtQkFBZCxDQUFlO0FBQ3hDLElBQUEsb0JBQW9CLEdBQUssT0FBTyxxQkFBWixDQUFhO0FBRXpDLElBQU0sV0FBVyxHQUFHO0lBQ2xCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0NBQ2pCLENBQUE7QUFFRDtJQUF1QyxxQ0FBWTtJQUFuRDs7SUF5RkEsQ0FBQztJQTlFYyxrQ0FBTSxHQUFuQixVQUFvQixLQUtuQjs7Ozs7O3dCQUNPLFdBQVcsR0FBbUMsS0FBSyxZQUF4QyxFQUFDLFNBQVMsR0FBeUIsS0FBSyxVQUE5QixFQUFDLFFBQVEsR0FBZ0IsS0FBSyxTQUFyQixFQUFDLFVBQVUsR0FBSyxLQUFLLFdBQVYsQ0FBVTt3QkFDekQsSUFBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTs0QkFD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QyxvQkFBb0IsQ0FBQztZQUNwQixLQUFLLEVBQUUsU0FBUztZQUNoQixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDViw4Q0FBOEM7Z0JBQzlDLHdCQUF3QjtnQkFDeEIsb0JBQW9CO2dCQUNwQixpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7OzttREF1REQ7SUFnQkQ7UUFUQyxvQkFBb0IsQ0FBQztZQUNwQixLQUFLLEVBQUUsVUFBVTtZQUNqQixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVixrREFBa0Q7Z0JBQ2xELHdCQUF3QjtnQkFDeEIsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7bURBUUQ7SUFDSCx3QkFBQztDQUFBLEFBekZELENBQXVDLFlBQVksR0F5RmxEO1NBekZZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbnN0YW50cyx1dGlscyxoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgSUxvZ2luU3RhdGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2F1dGgnO1xuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IExPR0lOVFlQRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBldmVudEJ1cyxFVkVOVFMsTG9naW5TdGF0ZSB9IGZyb20gJy4uJztcblxuY29uc3QgeyB0aHJvd0Vycm9yLGlzU3RyaW5nLHRyYW5zZm9ybVBob25lIH0gPSB1dGlscztcbmNvbnN0IHsgRVJST1JTLENPTU1VTklUWV9TSVRFX1VSTCB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyBjYXRjaEVycm9yc0RlY29yYXRvciB9ID0gaGVscGVycztcblxuY29uc3QgU0lHTl9NRVRIT0QgPSB7XG4gIFNJR05JTjogJ1NJR05JTicsXG4gIFNJR05VUDogJ1NJR05VUCdcbn1cblxuZXhwb3J0IGNsYXNzIFBob25lQXV0aFByb3ZpZGVyIGV4dGVuZHMgQXV0aFByb3ZpZGVyIHtcbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+aJi+acuuWPt+eZu+W9leWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuU21zQXV0aFByb3ZpZGVyKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobnn63kv6Hpqozor4HnoIHnmbvlvZUnLFxuICAgICAgJyAgMyAtIOefreS/oemqjOivgeeggS/lr4bnoIHmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBzaWduSW4ocGFyYW06IHtcbiAgICBwaG9uZU51bWJlcjogc3RyaW5nXG4gICAgcGhvbmVDb2RlPzogc3RyaW5nXG4gICAgcGFzc3dvcmQ/OiBzdHJpbmdcbiAgICBzaWduTWV0aG9kPzogc3RyaW5nXG4gIH0pOiBQcm9taXNlPElMb2dpblN0YXRlPiB7XG4gICAgbGV0IHsgcGhvbmVOdW1iZXIscGhvbmVDb2RlLHBhc3N3b3JkLHNpZ25NZXRob2QgfSA9IHBhcmFtXG4gICAgaWYoIWlzU3RyaW5nKHBob25lTnVtYmVyKSkge1xuICAgICAgdGhyb3dFcnJvcihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsJ3Bob25lTnVtYmVyIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICBpZighaXNTdHJpbmcocGhvbmVDb2RlKSAmJiAhaXNTdHJpbmcocGFzc3dvcmQpKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywncGhvbmVDb2RlIG9yIHBhc3N3b3JkIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICBpZighc2lnbk1ldGhvZCkge1xuICAgICAgc2lnbk1ldGhvZCA9IFNJR05fTUVUSE9ELlNJR05JTlxuICAgIH1cblxuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5zaWduSW4nLHtcbiAgICAgIGxvZ2luVHlwZTogTE9HSU5UWVBFLlBIT05FLFxuICAgICAgcGhvbmVOdW1iZXI6IHRyYW5zZm9ybVBob25lKHBob25lTnVtYmVyKSxcbiAgICAgIHBob25lQ29kZSxcbiAgICAgIHBhc3N3b3JkLFxuICAgICAgcmVmcmVzaF90b2tlbjogdGhpcy5fY2FjaGUuZ2V0U3RvcmUocmVmcmVzaFRva2VuS2V5KSB8fCAnJyxcbiAgICAgIHNpZ25NZXRob2RcbiAgICB9KTtcbiAgICBjb25zdCB7IHJlZnJlc2hfdG9rZW4sYWNjZXNzX3Rva2VuLGFjY2Vzc190b2tlbl9leHBpcmUgfSA9IHJlcztcbiAgICBpZihyZWZyZXNoX3Rva2VuKSB7XG4gICAgICBhd2FpdCB0aGlzLnNldFJlZnJlc2hUb2tlbihyZWZyZXNoX3Rva2VuKTtcbiAgICAgIGlmKGFjY2Vzc190b2tlbiAmJiBhY2Nlc3NfdG9rZW5fZXhwaXJlKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2V0QWNjZXNzVG9rZW4oYWNjZXNzX3Rva2VuLGFjY2Vzc190b2tlbl9leHBpcmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fcmVxdWVzdC5yZWZyZXNoQWNjZXNzVG9rZW4oKTtcbiAgICAgIH1cbiAgICAgIC8vIHNldCB1c2VyIGluZm9cbiAgICAgIGF3YWl0IHRoaXMucmVmcmVzaFVzZXJJbmZvKCk7XG4gICAgICBldmVudEJ1cy5maXJlKEVWRU5UUy5MT0dJTl9TVEFURV9DSEFOR0VEKTtcbiAgICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCx7XG4gICAgICAgIGVudjogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgbG9naW5UeXBlOiBMT0dJTlRZUEUuUEhPTkUsXG4gICAgICAgIHBlcnNpc3RlbmNlOiB0aGlzLl9jb25maWcucGVyc2lzdGVuY2VcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBMb2dpblN0YXRlKHtcbiAgICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmKHJlcy5jb2RlKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5PUEVSQVRJT05fRkFJTCxgUGhvbmUgbG9naW4gZmFpbFske3Jlcy5jb2RlfV0gJHtyZXMubWVzc2FnZX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3dFcnJvcihFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsYFBob25lIGxvZ2luIGZhaWxgKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOaJi+acuuWPt+azqOWGjFxuICAgKiBAcGFyYW0gcGhvbmVOdW1iZXJcbiAgICogQHBhcmFtIHBob25lQ29kZVxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmiYvmnLrnn63kv6Hms6jlhozlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLnNpZ25VcFdpdGhQaG9uZUNvZGUoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huefreS/oemqjOivgeeggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHNpZ25VcChwaG9uZU51bWJlcjogc3RyaW5nLHBob25lQ29kZTogc3RyaW5nLHBhc3N3b3JkPzogc3RyaW5nKTogUHJvbWlzZTxJTG9naW5TdGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLnNpZ25Jbih7XG4gICAgICBwaG9uZU51bWJlcixcbiAgICAgIHBob25lQ29kZSxcbiAgICAgIHBhc3N3b3JkLFxuICAgICAgc2lnbk1ldGhvZDogU0lHTl9NRVRIT0QuU0lHTlVQXG4gICAgfSlcbiAgfVxufSJdfQ==