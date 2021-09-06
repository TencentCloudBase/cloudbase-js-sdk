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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneAuthProvider = exports.SIGN_METHOD = void 0;
var utilities_1 = require("@cloudbase/utilities");
var base_1 = require("./base");
var constants_1 = require("../constants");
var __1 = require("..");
var throwError = utilities_1.utils.throwError, isString = utilities_1.utils.isString, transformPhone = utilities_1.utils.transformPhone;
var ERRORS = utilities_1.constants.ERRORS, COMMUNITY_SITE_URL = utilities_1.constants.COMMUNITY_SITE_URL;
var catchErrorsDecorator = utilities_1.helpers.catchErrorsDecorator, stopAuthLoginWithOAuth = utilities_1.helpers.stopAuthLoginWithOAuth;
exports.SIGN_METHOD = {
    SIGNIN: 'SIGNIN',
    SIGNUP: 'SIGNUP',
    FORCERESETPWD: 'FORCERESETPWD'
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
                            signMethod = exports.SIGN_METHOD.SIGNIN;
                        }
                        refreshTokenKey = this._cache.keys.refreshTokenKey;
                        return [4, this._request.send('auth.signIn', {
                                loginType: constants_1.LOGINTYPE.PHONE,
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
                        __1.eventBus.fire(__1.EVENTS.LOGIN_STATE_CHANGED);
                        __1.eventBus.fire(__1.EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this._config.env,
                            loginType: constants_1.LOGINTYPE.PHONE,
                            persistence: this._config.persistence
                        });
                        return [2, new __1.LoginState({
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
                        signMethod: exports.SIGN_METHOD.SIGNUP
                    })];
            });
        });
    };
    PhoneAuthProvider.prototype.forceResetPwd = function (phoneNumber, phoneCode, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.signIn({
                        phoneNumber: phoneNumber,
                        phoneCode: phoneCode,
                        password: password,
                        signMethod: exports.SIGN_METHOD.FORCERESETPWD
                    })];
            });
        });
    };
    __decorate([
        stopAuthLoginWithOAuth(),
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
        stopAuthLoginWithOAuth(),
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
    __decorate([
        catchErrorsDecorator({
            title: '手机密码重置失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().forceResetPwd() 的语法或参数是否正确',
                '  2 - 当前环境是否开通了短信验证码登录',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String]),
        __metadata("design:returntype", Promise)
    ], PhoneAuthProvider.prototype, "forceResetPwd", null);
    return PhoneAuthProvider;
}(base_1.AuthProvider));
exports.PhoneAuthProvider = PhoneAuthProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvbmVBdXRoUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvdmlkZXJzL3Bob25lQXV0aFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBaUU7QUFFakUsK0JBQXNDO0FBQ3RDLDBDQUF5QztBQUN6Qyx3QkFBa0Q7QUFFMUMsSUFBQSxVQUFVLEdBQStCLGlCQUFLLFdBQXBDLEVBQUUsUUFBUSxHQUFxQixpQkFBSyxTQUExQixFQUFFLGNBQWMsR0FBSyxpQkFBSyxlQUFWLENBQVc7QUFDL0MsSUFBQSxNQUFNLEdBQXlCLHFCQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUsscUJBQVMsbUJBQWQsQ0FBZTtBQUN6QyxJQUFBLG9CQUFvQixHQUE2QixtQkFBTyxxQkFBcEMsRUFBRSxzQkFBc0IsR0FBSyxtQkFBTyx1QkFBWixDQUFhO0FBRXBELFFBQUEsV0FBVyxHQUFHO0lBQ3pCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLGFBQWEsRUFBRSxlQUFlO0NBQy9CLENBQUE7QUFFRDtJQUF1QyxxQ0FBWTtJQUFuRDs7SUFtSEEsQ0FBQztJQXZHYyxrQ0FBTSxHQUFuQixVQUFvQixLQUtuQjs7Ozs7O3dCQUNPLFdBQVcsR0FBc0MsS0FBSyxZQUEzQyxFQUFFLFNBQVMsR0FBMkIsS0FBSyxVQUFoQyxFQUFFLFFBQVEsR0FBaUIsS0FBSyxTQUF0QixFQUFFLFVBQVUsR0FBSyxLQUFLLFdBQVYsQ0FBVTt3QkFDNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTs0QkFDMUIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsOEJBQThCLENBQUMsQ0FBQzt5QkFDbkU7d0JBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMs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YUFBQTt3QkFDWCxTQUFTLFdBQUE7d0JBQ1QsUUFBUSxVQUFBO3dCQUNSLFVBQVUsRUFBRSxtQkFBVyxDQUFDLGFBQWE7cUJBQ3RDLENBQUMsRUFBQTs7O0tBQ0g7SUF0R0Q7UUFYQyxzQkFBc0IsRUFBRTtRQUN4QixvQkFBb0IsQ0FBQztZQUNwQixLQUFLLEVBQUUsU0FBUztZQUNoQixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDViw4Q0FBOEM7Z0JBQzlDLHdCQUF3QjtnQkFDeEIsb0JBQW9CO2dCQUNwQixpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7OzttREF1REQ7SUFpQkQ7UUFWQyxzQkFBc0IsRUFBRTtRQUN4QixvQkFBb0IsQ0FBQztZQUNwQixLQUFLLEVBQUUsVUFBVTtZQUNqQixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVixrREFBa0Q7Z0JBQ2xELHdCQUF3QjtnQkFDeEIsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7bURBUUQ7SUFpQkQ7UUFUQyxvQkFBb0IsQ0FBQztZQUNwQixLQUFLLEVBQUUsVUFBVTtZQUNqQixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDViw0Q0FBNEM7Z0JBQzVDLHdCQUF3QjtnQkFDeEIsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7MERBUUQ7SUFDSCx3QkFBQztDQUFBLEFBbkhELENBQXVDLG1CQUFZLEdBbUhsRDtBQW5IWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb25zdGFudHMsIHV0aWxzLCBoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgSUxvZ2luU3RhdGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2F1dGgnO1xuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IExPR0lOVFlQRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBldmVudEJ1cywgRVZFTlRTLCBMb2dpblN0YXRlIH0gZnJvbSAnLi4nO1xuXG5jb25zdCB7IHRocm93RXJyb3IsIGlzU3RyaW5nLCB0cmFuc2Zvcm1QaG9uZSB9ID0gdXRpbHM7XG5jb25zdCB7IEVSUk9SUywgQ09NTVVOSVRZX1NJVEVfVVJMIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IGNhdGNoRXJyb3JzRGVjb3JhdG9yLCBzdG9wQXV0aExvZ2luV2l0aE9BdXRoIH0gPSBoZWxwZXJzO1xuXG5leHBvcnQgY29uc3QgU0lHTl9NRVRIT0QgPSB7XG4gIFNJR05JTjogJ1NJR05JTicsXG4gIFNJR05VUDogJ1NJR05VUCcsXG4gIEZPUkNFUkVTRVRQV0Q6ICdGT1JDRVJFU0VUUFdEJ1xufVxuXG5leHBvcnQgY2xhc3MgUGhvbmVBdXRoUHJvdmlkZXIgZXh0ZW5kcyBBdXRoUHJvdmlkZXIge1xuICBAc3RvcEF1dGhMb2dpbldpdGhPQXV0aCgpXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmiYvmnLrlj7fnmbvlvZXlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLlNtc0F1dGhQcm92aWRlcigpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG55+t5L+h6aqM6K+B56CB55m75b2VJyxcbiAgICAgICcgIDMgLSDnn63kv6Hpqozor4HnoIEv5a+G56CB5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgc2lnbkluKHBhcmFtOiB7XG4gICAgcGhvbmVOdW1iZXI6IHN0cmluZ1xuICAgIHBob25lQ29kZT86IHN0cmluZ1xuICAgIHBhc3N3b3JkPzogc3RyaW5nXG4gICAgc2lnbk1ldGhvZD86IHN0cmluZ1xuICB9KTogUHJvbWlzZTxJTG9naW5TdGF0ZT4ge1xuICAgIGxldCB7IHBob25lTnVtYmVyLCBwaG9uZUNvZGUsIHBhc3N3b3JkLCBzaWduTWV0aG9kIH0gPSBwYXJhbVxuICAgIGlmICghaXNTdHJpbmcocGhvbmVOdW1iZXIpKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ3Bob25lTnVtYmVyIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzU3RyaW5nKHBob25lQ29kZSkgJiYgIWlzU3RyaW5nKHBhc3N3b3JkKSkge1xuICAgICAgdGhyb3dFcnJvcihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsICdwaG9uZUNvZGUgb3IgcGFzc3dvcmQgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cblxuICAgIGlmICghc2lnbk1ldGhvZCkge1xuICAgICAgc2lnbk1ldGhvZCA9IFNJR05fTUVUSE9ELlNJR05JTlxuICAgIH1cblxuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5zaWduSW4nLCB7XG4gICAgICBsb2dpblR5cGU6IExPR0lOVFlQRS5QSE9ORSxcbiAgICAgIHBob25lTnVtYmVyOiB0cmFuc2Zvcm1QaG9uZShwaG9uZU51bWJlciksXG4gICAgICBwaG9uZUNvZGUsXG4gICAgICBwYXNzd29yZCxcbiAgICAgIHJlZnJlc2hfdG9rZW46IHRoaXMuX2NhY2hlLmdldFN0b3JlKHJlZnJlc2hUb2tlbktleSkgfHwgJycsXG4gICAgICBzaWduTWV0aG9kXG4gICAgfSk7XG4gICAgY29uc3QgeyByZWZyZXNoX3Rva2VuLCBhY2Nlc3NfdG9rZW4sIGFjY2Vzc190b2tlbl9leHBpcmUgfSA9IHJlcztcbiAgICBpZiAocmVmcmVzaF90b2tlbikge1xuICAgICAgYXdhaXQgdGhpcy5zZXRSZWZyZXNoVG9rZW4ocmVmcmVzaF90b2tlbik7XG4gICAgICBpZiAoYWNjZXNzX3Rva2VuICYmIGFjY2Vzc190b2tlbl9leHBpcmUpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRBY2Nlc3NUb2tlbihhY2Nlc3NfdG9rZW4sIGFjY2Vzc190b2tlbl9leHBpcmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fcmVxdWVzdC5yZWZyZXNoQWNjZXNzVG9rZW4oKTtcbiAgICAgIH1cbiAgICAgIC8vIHNldCB1c2VyIGluZm9cbiAgICAgIGF3YWl0IHRoaXMucmVmcmVzaFVzZXJJbmZvKCk7XG4gICAgICBldmVudEJ1cy5maXJlKEVWRU5UUy5MT0dJTl9TVEFURV9DSEFOR0VEKTtcbiAgICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCwge1xuICAgICAgICBlbnY6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGxvZ2luVHlwZTogTE9HSU5UWVBFLlBIT05FLFxuICAgICAgICBwZXJzaXN0ZW5jZTogdGhpcy5fY29uZmlnLnBlcnNpc3RlbmNlXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgTG9naW5TdGF0ZSh7XG4gICAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgIHJlcXVlc3Q6IHRoaXMuX3JlcXVlc3RcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAocmVzLmNvZGUpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLk9QRVJBVElPTl9GQUlMLCBgUGhvbmUgbG9naW4gZmFpbFske3Jlcy5jb2RlfV0gJHtyZXMubWVzc2FnZX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3dFcnJvcihFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsIGBQaG9uZSBsb2dpbiBmYWlsYCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDmiYvmnLrlj7fms6jlhoxcbiAgICogQHBhcmFtIHBob25lTnVtYmVyXG4gICAqIEBwYXJhbSBwaG9uZUNvZGVcbiAgICogQHBhcmFtIHBhc3N3b3JkXG4gICAqL1xuICBAc3RvcEF1dGhMb2dpbldpdGhPQXV0aCgpXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmiYvmnLrnn63kv6Hms6jlhozlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLnNpZ25VcFdpdGhQaG9uZUNvZGUoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huefreS/oemqjOivgeeggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHNpZ25VcChwaG9uZU51bWJlcjogc3RyaW5nLCBwaG9uZUNvZGU6IHN0cmluZywgcGFzc3dvcmQ/OiBzdHJpbmcpOiBQcm9taXNlPElMb2dpblN0YXRlPiB7XG4gICAgcmV0dXJuIHRoaXMuc2lnbkluKHtcbiAgICAgIHBob25lTnVtYmVyLFxuICAgICAgcGhvbmVDb2RlLFxuICAgICAgcGFzc3dvcmQsXG4gICAgICBzaWduTWV0aG9kOiBTSUdOX01FVEhPRC5TSUdOVVBcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIOaJi+acuuWPt+azqOWGjFxuICAgKiBAcGFyYW0gcGhvbmVOdW1iZXJcbiAgICogQHBhcmFtIHBob25lQ29kZVxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmiYvmnLrlr4bnoIHph43nva7lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmZvcmNlUmVzZXRQd2QoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huefreS/oemqjOivgeeggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGZvcmNlUmVzZXRQd2QocGhvbmVOdW1iZXI6IHN0cmluZywgcGhvbmVDb2RlOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPElMb2dpblN0YXRlPiB7XG4gICAgcmV0dXJuIHRoaXMuc2lnbkluKHtcbiAgICAgIHBob25lTnVtYmVyLFxuICAgICAgcGhvbmVDb2RlLFxuICAgICAgcGFzc3dvcmQsXG4gICAgICBzaWduTWV0aG9kOiBTSUdOX01FVEhPRC5GT1JDRVJFU0VUUFdEXG4gICAgfSlcbiAgfVxufSJdfQ==