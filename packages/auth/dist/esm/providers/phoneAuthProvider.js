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
export var SIGN_METHOD = {
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
    PhoneAuthProvider.prototype.forceResetPwd = function (phoneNumber, phoneCode, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.signIn({
                        phoneNumber: phoneNumber,
                        phoneCode: phoneCode,
                        password: password,
                        signMethod: SIGN_METHOD.FORCERESETPWD
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
}(AuthProvider));
export { PhoneAuthProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvbmVBdXRoUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvdmlkZXJzL3Bob25lQXV0aFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRTFDLElBQUEsVUFBVSxHQUErQixLQUFLLFdBQXBDLEVBQUUsUUFBUSxHQUFxQixLQUFLLFNBQTFCLEVBQUUsY0FBYyxHQUFLLEtBQUssZUFBVixDQUFXO0FBQy9DLElBQUEsTUFBTSxHQUF5QixTQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUssU0FBUyxtQkFBZCxDQUFlO0FBQ3pDLElBQUEsb0JBQW9CLEdBQUssT0FBTyxxQkFBWixDQUFhO0FBRXpDLE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRztJQUN6QixNQUFNLEVBQUUsUUFBUTtJQUNoQixNQUFNLEVBQUUsUUFBUTtJQUNoQixhQUFhLEVBQUUsZUFBZTtDQUMvQixDQUFBO0FBRUQ7SUFBdUMscUNBQVk7SUFBbkQ7O0lBaUhBLENBQUM7SUF0R2Msa0NBQU0sR0FBbkIsVUFBb0IsS0FLbkI7Ozs7Ozt3QkFDTyxXQUFXLEdBQXNDLEtBQUssWUFBM0MsRUFBRSxTQUFTLEdBQTJCLEtBQUssVUFBaEMsRUFBRSxRQUFRLEdBQWlCLEtBQUssU0FBdEIsRUFBRSxVQUFVLEdBQUssS0FBSyxXQUFWLENBQVU7d0JBQzVELElBQUksQ0FB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QUMvQixDQUFDLEVBQUE7OztLQUNIO0lBaUJZLHlDQUFhLEdBQTFCLFVBQTJCLFdBQW1CLEVBQUUsU0FBaUIsRUFBRSxRQUFnQjs7O2dCQUNqRixXQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7d0JBQ2pCLFdBQVcsYUFBQTt3QkFDWCxTQUFTLFdBQUE7d0JBQ1QsUUFBUSxVQUFBO3dCQUNSLFVBQVUsRUFBRSxXQUFXLENBQUMsYUFBYTtxQkFDdEMsQ0FBQyxFQUFBOzs7S0FDSDtJQXJHRDtRQVZDLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLDhDQUE4QztnQkFDOUMsd0JBQXdCO2dCQUN4QixvQkFBb0I7Z0JBQ3BCLGlLQUE2QixrQkFBb0I7YUFDbEQ7U0FDRixDQUFDOzs7O21EQXVERDtJQWdCRDtRQVRDLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxVQUFVO1lBQ2pCLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLGtEQUFrRDtnQkFDbEQsd0JBQXdCO2dCQUN4QixpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7OzttREFRRDtJQWlCRDtRQVRDLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxVQUFVO1lBQ2pCLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLDRDQUE0QztnQkFDNUMsd0JBQXdCO2dCQUN4QixpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7OzswREFRRDtJQUNILHdCQUFDO0NBQUEsQUFqSEQsQ0FBdUMsWUFBWSxHQWlIbEQ7U0FqSFksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uc3RhbnRzLCB1dGlscywgaGVscGVycyB9IGZyb20gJ0BjbG91ZGJhc2UvdXRpbGl0aWVzJztcbmltcG9ydCB7IElMb2dpblN0YXRlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9hdXRoJztcbmltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgeyBMT0dJTlRZUEUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZXZlbnRCdXMsIEVWRU5UUywgTG9naW5TdGF0ZSB9IGZyb20gJy4uJztcblxuY29uc3QgeyB0aHJvd0Vycm9yLCBpc1N0cmluZywgdHJhbnNmb3JtUGhvbmUgfSA9IHV0aWxzO1xuY29uc3QgeyBFUlJPUlMsIENPTU1VTklUWV9TSVRFX1VSTCB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyBjYXRjaEVycm9yc0RlY29yYXRvciB9ID0gaGVscGVycztcblxuZXhwb3J0IGNvbnN0IFNJR05fTUVUSE9EID0ge1xuICBTSUdOSU46ICdTSUdOSU4nLFxuICBTSUdOVVA6ICdTSUdOVVAnLFxuICBGT1JDRVJFU0VUUFdEOiAnRk9SQ0VSRVNFVFBXRCdcbn1cblxuZXhwb3J0IGNsYXNzIFBob25lQXV0aFByb3ZpZGVyIGV4dGVuZHMgQXV0aFByb3ZpZGVyIHtcbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+aJi+acuuWPt+eZu+W9leWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuU21zQXV0aFByb3ZpZGVyKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobnn63kv6Hpqozor4HnoIHnmbvlvZUnLFxuICAgICAgJyAgMyAtIOefreS/oemqjOivgeeggS/lr4bnoIHmmK/lkKbmraPnoa4nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBzaWduSW4ocGFyYW06IHtcbiAgICBwaG9uZU51bWJlcjogc3RyaW5nXG4gICAgcGhvbmVDb2RlPzogc3RyaW5nXG4gICAgcGFzc3dvcmQ/OiBzdHJpbmdcbiAgICBzaWduTWV0aG9kPzogc3RyaW5nXG4gIH0pOiBQcm9taXNlPElMb2dpblN0YXRlPiB7XG4gICAgbGV0IHsgcGhvbmVOdW1iZXIsIHBob25lQ29kZSwgcGFzc3dvcmQsIHNpZ25NZXRob2QgfSA9IHBhcmFtXG4gICAgaWYgKCFpc1N0cmluZyhwaG9uZU51bWJlcikpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCAncGhvbmVOdW1iZXIgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cblxuICAgIGlmICghaXNTdHJpbmcocGhvbmVDb2RlKSAmJiAhaXNTdHJpbmcocGFzc3dvcmQpKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ3Bob25lQ29kZSBvciBwYXNzd29yZCBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgaWYgKCFzaWduTWV0aG9kKSB7XG4gICAgICBzaWduTWV0aG9kID0gU0lHTl9NRVRIT0QuU0lHTklOXG4gICAgfVxuXG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnNpZ25JbicsIHtcbiAgICAgIGxvZ2luVHlwZTogTE9HSU5UWVBFLlBIT05FLFxuICAgICAgcGhvbmVOdW1iZXI6IHRyYW5zZm9ybVBob25lKHBob25lTnVtYmVyKSxcbiAgICAgIHBob25lQ29kZSxcbiAgICAgIHBhc3N3b3JkLFxuICAgICAgcmVmcmVzaF90b2tlbjogdGhpcy5fY2FjaGUuZ2V0U3RvcmUocmVmcmVzaFRva2VuS2V5KSB8fCAnJyxcbiAgICAgIHNpZ25NZXRob2RcbiAgICB9KTtcbiAgICBjb25zdCB7IHJlZnJlc2hfdG9rZW4sIGFjY2Vzc190b2tlbiwgYWNjZXNzX3Rva2VuX2V4cGlyZSB9ID0gcmVzO1xuICAgIGlmIChyZWZyZXNoX3Rva2VuKSB7XG4gICAgICBhd2FpdCB0aGlzLnNldFJlZnJlc2hUb2tlbihyZWZyZXNoX3Rva2VuKTtcbiAgICAgIGlmIChhY2Nlc3NfdG9rZW4gJiYgYWNjZXNzX3Rva2VuX2V4cGlyZSkge1xuICAgICAgICBhd2FpdCB0aGlzLnNldEFjY2Vzc1Rva2VuKGFjY2Vzc190b2tlbiwgYWNjZXNzX3Rva2VuX2V4cGlyZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCB0aGlzLl9yZXF1ZXN0LnJlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgICAgfVxuICAgICAgLy8gc2V0IHVzZXIgaW5mb1xuICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoVXNlckluZm8oKTtcbiAgICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQpO1xuICAgICAgZXZlbnRCdXMuZmlyZShFVkVOVFMuTE9HSU5fVFlQRV9DSEFOR0VELCB7XG4gICAgICAgIGVudjogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgbG9naW5UeXBlOiBMT0dJTlRZUEUuUEhPTkUsXG4gICAgICAgIHBlcnNpc3RlbmNlOiB0aGlzLl9jb25maWcucGVyc2lzdGVuY2VcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBMb2dpblN0YXRlKHtcbiAgICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChyZXMuY29kZSkge1xuICAgICAgdGhyb3dFcnJvcihFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsIGBQaG9uZSBsb2dpbiBmYWlsWyR7cmVzLmNvZGV9XSAke3Jlcy5tZXNzYWdlfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5PUEVSQVRJT05fRkFJTCwgYFBob25lIGxvZ2luIGZhaWxgKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOaJi+acuuWPt+azqOWGjFxuICAgKiBAcGFyYW0gcGhvbmVOdW1iZXJcbiAgICogQHBhcmFtIHBob25lQ29kZVxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmiYvmnLrnn63kv6Hms6jlhozlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLnNpZ25VcFdpdGhQaG9uZUNvZGUoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huefreS/oemqjOivgeeggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHNpZ25VcChwaG9uZU51bWJlcjogc3RyaW5nLCBwaG9uZUNvZGU6IHN0cmluZywgcGFzc3dvcmQ/OiBzdHJpbmcpOiBQcm9taXNlPElMb2dpblN0YXRlPiB7XG4gICAgcmV0dXJuIHRoaXMuc2lnbkluKHtcbiAgICAgIHBob25lTnVtYmVyLFxuICAgICAgcGhvbmVDb2RlLFxuICAgICAgcGFzc3dvcmQsXG4gICAgICBzaWduTWV0aG9kOiBTSUdOX01FVEhPRC5TSUdOVVBcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIOaJi+acuuWPt+azqOWGjFxuICAgKiBAcGFyYW0gcGhvbmVOdW1iZXJcbiAgICogQHBhcmFtIHBob25lQ29kZVxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfmiYvmnLrlr4bnoIHph43nva7lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmZvcmNlUmVzZXRQd2QoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huefreS/oemqjOivgeeggeeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGZvcmNlUmVzZXRQd2QocGhvbmVOdW1iZXI6IHN0cmluZywgcGhvbmVDb2RlOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPElMb2dpblN0YXRlPiB7XG4gICAgcmV0dXJuIHRoaXMuc2lnbkluKHtcbiAgICAgIHBob25lTnVtYmVyLFxuICAgICAgcGhvbmVDb2RlLFxuICAgICAgcGFzc3dvcmQsXG4gICAgICBzaWduTWV0aG9kOiBTSUdOX01FVEhPRC5GT1JDRVJFU0VUUFdEXG4gICAgfSlcbiAgfVxufSJdfQ==