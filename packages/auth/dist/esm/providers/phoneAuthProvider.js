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
var catchErrorsDecorator = helpers.catchErrorsDecorator, stopAuthLoginWithOAuth = helpers.stopAuthLoginWithOAuth;
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
}(AuthProvider));
export { PhoneAuthProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvbmVBdXRoUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvdmlkZXJzL3Bob25lQXV0aFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRTFDLElBQUEsVUFBVSxHQUErQixLQUFLLFdBQXBDLEVBQUUsUUFBUSxHQUFxQixLQUFLLFNBQTFCLEVBQUUsY0FBYyxHQUFLLEtBQUssZUFBVixDQUFXO0FBQy9DLElBQUEsTUFBTSxHQUF5QixTQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUssU0FBUyxtQkFBZCxDQUFlO0FBQ3pDLElBQUEsb0JBQW9CLEdBQTZCLE9BQU8scUJBQXBDLEVBQUUsc0JBQXNCLEdBQUssT0FBTyx1QkFBWixDQUFhO0FBRWpFLE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRztJQUN6QixNQUFNLEVBQUUsUUFBUTtJQUNoQixNQUFNLEVBQUUsUUFBUTtJQUNoQixhQUFhLEVBQUUsZUFBZTtDQUMvQixDQUFBO0FBRUQ7SUFBdUMscUNBQVk7SUFBbkQ7O0lBbUhBLENBQUM7SUF2R2Msa0NBQU0sR0FBbkIsVUFBb0IsS0FLbkI7Ozs7Ozt3QkFDTyxXQUFXLEdBQXNDLEtBQUssWUFBM0MsRUFBRSxTQUFTLEdBQTJCLEtBQUssVUFBaEMsRUFBRSxRQUFRLEdBQWlCLEtBQUssU0FBdEIsRUFBRSxVQUFVLEdBQUss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Q1IsVUFBVSxFQUFFLFdBQVcsQ0FBQyxNQUFNO3FCQUMvQixDQUFDLEVBQUE7OztLQUNIO0lBaUJZLHlDQUFhLEdBQTFCLFVBQTJCLFdBQW1CLEVBQUUsU0FBaUIsRUFBRSxRQUFnQjs7O2dCQUNqRixXQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7d0JBQ2pCLFdBQVcsYUFBQTt3QkFDWCxTQUFTLFdBQUE7d0JBQ1QsUUFBUSxVQUFBO3dCQUNSLFVBQVUsRUFBRSxXQUFXLENBQUMsYUFBYTtxQkFDdEMsQ0FBQyxFQUFBOzs7S0FDSDtJQXRHRDtRQVhDLHNCQUFzQixFQUFFO1FBQ3hCLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLDhDQUE4QztnQkFDOUMsd0JBQXdCO2dCQUN4QixvQkFBb0I7Z0JBQ3BCLGlLQUE2QixrQkFBb0I7YUFDbEQ7U0FDRixDQUFDOzs7O21EQXVERDtJQWlCRDtRQVZDLHNCQUFzQixFQUFFO1FBQ3hCLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxVQUFVO1lBQ2pCLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLGtEQUFrRDtnQkFDbEQsd0JBQXdCO2dCQUN4QixpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7OzttREFRRDtJQWlCRDtRQVRDLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxVQUFVO1lBQ2pCLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLDRDQUE0QztnQkFDNUMsd0JBQXdCO2dCQUN4QixpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7OzswREFRRDtJQUNILHdCQUFDO0NBQUEsQUFuSEQsQ0FBdUMsWUFBWSxHQW1IbEQ7U0FuSFksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uc3RhbnRzLCB1dGlscywgaGVscGVycyB9IGZyb20gJ0BjbG91ZGJhc2UvdXRpbGl0aWVzJztcbmltcG9ydCB7IElMb2dpblN0YXRlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9hdXRoJztcbmltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgeyBMT0dJTlRZUEUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZXZlbnRCdXMsIEVWRU5UUywgTG9naW5TdGF0ZSB9IGZyb20gJy4uJztcblxuY29uc3QgeyB0aHJvd0Vycm9yLCBpc1N0cmluZywgdHJhbnNmb3JtUGhvbmUgfSA9IHV0aWxzO1xuY29uc3QgeyBFUlJPUlMsIENPTU1VTklUWV9TSVRFX1VSTCB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyBjYXRjaEVycm9yc0RlY29yYXRvciwgc3RvcEF1dGhMb2dpbldpdGhPQXV0aCB9ID0gaGVscGVycztcblxuZXhwb3J0IGNvbnN0IFNJR05fTUVUSE9EID0ge1xuICBTSUdOSU46ICdTSUdOSU4nLFxuICBTSUdOVVA6ICdTSUdOVVAnLFxuICBGT1JDRVJFU0VUUFdEOiAnRk9SQ0VSRVNFVFBXRCdcbn1cblxuZXhwb3J0IGNsYXNzIFBob25lQXV0aFByb3ZpZGVyIGV4dGVuZHMgQXV0aFByb3ZpZGVyIHtcbiAgQHN0b3BBdXRoTG9naW5XaXRoT0F1dGgoKVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5omL5py65Y+355m75b2V5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5TbXNBdXRoUHJvdmlkZXIoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huefreS/oemqjOivgeeggeeZu+W9lScsXG4gICAgICAnICAzIC0g55+t5L+h6aqM6K+B56CBL+WvhueggeaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHNpZ25JbihwYXJhbToge1xuICAgIHBob25lTnVtYmVyOiBzdHJpbmdcbiAgICBwaG9uZUNvZGU/OiBzdHJpbmdcbiAgICBwYXNzd29yZD86IHN0cmluZ1xuICAgIHNpZ25NZXRob2Q/OiBzdHJpbmdcbiAgfSk6IFByb21pc2U8SUxvZ2luU3RhdGU+IHtcbiAgICBsZXQgeyBwaG9uZU51bWJlciwgcGhvbmVDb2RlLCBwYXNzd29yZCwgc2lnbk1ldGhvZCB9ID0gcGFyYW1cbiAgICBpZiAoIWlzU3RyaW5nKHBob25lTnVtYmVyKSkge1xuICAgICAgdGhyb3dFcnJvcihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsICdwaG9uZU51bWJlciBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgaWYgKCFpc1N0cmluZyhwaG9uZUNvZGUpICYmICFpc1N0cmluZyhwYXNzd29yZCkpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCAncGhvbmVDb2RlIG9yIHBhc3N3b3JkIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICBpZiAoIXNpZ25NZXRob2QpIHtcbiAgICAgIHNpZ25NZXRob2QgPSBTSUdOX01FVEhPRC5TSUdOSU5cbiAgICB9XG5cbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGguc2lnbkluJywge1xuICAgICAgbG9naW5UeXBlOiBMT0dJTlRZUEUuUEhPTkUsXG4gICAgICBwaG9uZU51bWJlcjogdHJhbnNmb3JtUGhvbmUocGhvbmVOdW1iZXIpLFxuICAgICAgcGhvbmVDb2RlLFxuICAgICAgcGFzc3dvcmQsXG4gICAgICByZWZyZXNoX3Rva2VuOiB0aGlzLl9jYWNoZS5nZXRTdG9yZShyZWZyZXNoVG9rZW5LZXkpIHx8ICcnLFxuICAgICAgc2lnbk1ldGhvZFxuICAgIH0pO1xuICAgIGNvbnN0IHsgcmVmcmVzaF90b2tlbiwgYWNjZXNzX3Rva2VuLCBhY2Nlc3NfdG9rZW5fZXhwaXJlIH0gPSByZXM7XG4gICAgaWYgKHJlZnJlc2hfdG9rZW4pIHtcbiAgICAgIGF3YWl0IHRoaXMuc2V0UmVmcmVzaFRva2VuKHJlZnJlc2hfdG9rZW4pO1xuICAgICAgaWYgKGFjY2Vzc190b2tlbiAmJiBhY2Nlc3NfdG9rZW5fZXhwaXJlKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2V0QWNjZXNzVG9rZW4oYWNjZXNzX3Rva2VuLCBhY2Nlc3NfdG9rZW5fZXhwaXJlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3JlcXVlc3QucmVmcmVzaEFjY2Vzc1Rva2VuKCk7XG4gICAgICB9XG4gICAgICAvLyBzZXQgdXNlciBpbmZvXG4gICAgICBhd2FpdCB0aGlzLnJlZnJlc2hVc2VySW5mbygpO1xuICAgICAgZXZlbnRCdXMuZmlyZShFVkVOVFMuTE9HSU5fU1RBVEVfQ0hBTkdFRCk7XG4gICAgICBldmVudEJ1cy5maXJlKEVWRU5UUy5MT0dJTl9UWVBFX0NIQU5HRUQsIHtcbiAgICAgICAgZW52OiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgICBsb2dpblR5cGU6IExPR0lOVFlQRS5QSE9ORSxcbiAgICAgICAgcGVyc2lzdGVuY2U6IHRoaXMuX2NvbmZpZy5wZXJzaXN0ZW5jZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHJlcy5jb2RlKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5PUEVSQVRJT05fRkFJTCwgYFBob25lIGxvZ2luIGZhaWxbJHtyZXMuY29kZX1dICR7cmVzLm1lc3NhZ2V9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLk9QRVJBVElPTl9GQUlMLCBgUGhvbmUgbG9naW4gZmFpbGApO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog5omL5py65Y+35rOo5YaMXG4gICAqIEBwYXJhbSBwaG9uZU51bWJlclxuICAgKiBAcGFyYW0gcGhvbmVDb2RlXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKi9cbiAgQHN0b3BBdXRoTG9naW5XaXRoT0F1dGgoKVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5omL5py655+t5L+h5rOo5YaM5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5zaWduVXBXaXRoUGhvbmVDb2RlKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobnn63kv6Hpqozor4HnoIHnmbvlvZUnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBzaWduVXAocGhvbmVOdW1iZXI6IHN0cmluZywgcGhvbmVDb2RlOiBzdHJpbmcsIHBhc3N3b3JkPzogc3RyaW5nKTogUHJvbWlzZTxJTG9naW5TdGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLnNpZ25Jbih7XG4gICAgICBwaG9uZU51bWJlcixcbiAgICAgIHBob25lQ29kZSxcbiAgICAgIHBhc3N3b3JkLFxuICAgICAgc2lnbk1ldGhvZDogU0lHTl9NRVRIT0QuU0lHTlVQXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiDmiYvmnLrlj7fms6jlhoxcbiAgICogQHBhcmFtIHBob25lTnVtYmVyXG4gICAqIEBwYXJhbSBwaG9uZUNvZGVcbiAgICogQHBhcmFtIHBhc3N3b3JkXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5omL5py65a+G56CB6YeN572u5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5mb3JjZVJlc2V0UHdkKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobnn63kv6Hpqozor4HnoIHnmbvlvZUnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBmb3JjZVJlc2V0UHdkKHBob25lTnVtYmVyOiBzdHJpbmcsIHBob25lQ29kZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxJTG9naW5TdGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLnNpZ25Jbih7XG4gICAgICBwaG9uZU51bWJlcixcbiAgICAgIHBob25lQ29kZSxcbiAgICAgIHBhc3N3b3JkLFxuICAgICAgc2lnbk1ldGhvZDogU0lHTl9NRVRIT0QuRk9SQ0VSRVNFVFBXRFxuICAgIH0pXG4gIH1cbn0iXX0=