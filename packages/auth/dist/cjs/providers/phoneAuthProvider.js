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
exports.PhoneAuthProvider = void 0;
var utilities_1 = require("@cloudbase/utilities");
var base_1 = require("./base");
var constants_1 = require("../constants");
var __1 = require("..");
var throwError = utilities_1.utils.throwError, isString = utilities_1.utils.isString, transformPhone = utilities_1.utils.transformPhone;
var ERRORS = utilities_1.constants.ERRORS, COMMUNITY_SITE_URL = utilities_1.constants.COMMUNITY_SITE_URL;
var catchErrorsDecorator = utilities_1.helpers.catchErrorsDecorator;
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
}(base_1.AuthProvider));
exports.PhoneAuthProvider = PhoneAuthProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvbmVBdXRoUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvdmlkZXJzL3Bob25lQXV0aFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBK0Q7QUFFL0QsK0JBQXNDO0FBQ3RDLDBDQUF5QztBQUN6Qyx3QkFBZ0Q7QUFFeEMsSUFBQSxVQUFVLEdBQTZCLGlCQUFLLFdBQWxDLEVBQUMsUUFBUSxHQUFvQixpQkFBSyxTQUF6QixFQUFDLGNBQWMsR0FBSyxpQkFBSyxlQUFWLENBQVc7QUFDN0MsSUFBQSxNQUFNLEdBQXdCLHFCQUFTLE9BQWpDLEVBQUMsa0JBQWtCLEdBQUsscUJBQVMsbUJBQWQsQ0FBZTtBQUN4QyxJQUFBLG9CQUFvQixHQUFLLG1CQUFPLHFCQUFaLENBQWE7QUFFekMsSUFBTSxXQUFXLEdBQUc7SUFDbEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7Q0FDakIsQ0FBQTtBQUVEO0lBQXVDLHFDQUFZO0lBQW5EOztJQXlGQSxDQUFDO0lBOUVjLGtDQUFNLEdBQW5CLFVBQW9CLEtBS25COzs7Ozs7d0JBQ08sV0FBVyxHQUFtQyxLQUFLLFlBQXhDLEVBQUMsU0FBUyxHQUF5QixLQUFLLFVBQTlCLEVBQUMsUUFBUSxHQUFnQixLQUFLLFNBQXJCLEVBQUMsVUFBVSxHQUFLLEtBQUssV0FBVixDQUFVO3dCQUN6RCxJQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFOzRCQUN6QixVQUFVLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBQyw4QkFBOEIsQ0FBQyxDQUFDO3lCQUNsRTt3QkFFRCxJQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFOzRCQUM5QyxVQUFVLENBQUMs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bURBdUREO0lBZ0JEO1FBVEMsb0JBQW9CLENBQUM7WUFDcEIsS0FBSyxFQUFFLFVBQVU7WUFDakIsUUFBUSxFQUFFO2dCQUNSLFVBQVU7Z0JBQ1Ysa0RBQWtEO2dCQUNsRCx3QkFBd0I7Z0JBQ3hCLGlLQUE2QixrQkFBb0I7YUFDbEQ7U0FDRixDQUFDOzs7O21EQVFEO0lBQ0gsd0JBQUM7Q0FBQSxBQXpGRCxDQUF1QyxtQkFBWSxHQXlGbEQ7QUF6RlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uc3RhbnRzLHV0aWxzLGhlbHBlcnMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBJTG9naW5TdGF0ZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvYXV0aCc7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IHsgTE9HSU5UWVBFIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGV2ZW50QnVzLEVWRU5UUyxMb2dpblN0YXRlIH0gZnJvbSAnLi4nO1xuXG5jb25zdCB7IHRocm93RXJyb3IsaXNTdHJpbmcsdHJhbnNmb3JtUGhvbmUgfSA9IHV0aWxzO1xuY29uc3QgeyBFUlJPUlMsQ09NTVVOSVRZX1NJVEVfVVJMIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IGNhdGNoRXJyb3JzRGVjb3JhdG9yIH0gPSBoZWxwZXJzO1xuXG5jb25zdCBTSUdOX01FVEhPRCA9IHtcbiAgU0lHTklOOiAnU0lHTklOJyxcbiAgU0lHTlVQOiAnU0lHTlVQJ1xufVxuXG5leHBvcnQgY2xhc3MgUGhvbmVBdXRoUHJvdmlkZXIgZXh0ZW5kcyBBdXRoUHJvdmlkZXIge1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5omL5py65Y+355m75b2V5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5TbXNBdXRoUHJvdmlkZXIoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6huefreS/oemqjOivgeeggeeZu+W9lScsXG4gICAgICAnICAzIC0g55+t5L+h6aqM6K+B56CBL+WvhueggeaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHNpZ25JbihwYXJhbToge1xuICAgIHBob25lTnVtYmVyOiBzdHJpbmdcbiAgICBwaG9uZUNvZGU/OiBzdHJpbmdcbiAgICBwYXNzd29yZD86IHN0cmluZ1xuICAgIHNpZ25NZXRob2Q/OiBzdHJpbmdcbiAgfSk6IFByb21pc2U8SUxvZ2luU3RhdGU+IHtcbiAgICBsZXQgeyBwaG9uZU51bWJlcixwaG9uZUNvZGUscGFzc3dvcmQsc2lnbk1ldGhvZCB9ID0gcGFyYW1cbiAgICBpZighaXNTdHJpbmcocGhvbmVOdW1iZXIpKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywncGhvbmVOdW1iZXIgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cblxuICAgIGlmKCFpc1N0cmluZyhwaG9uZUNvZGUpICYmICFpc1N0cmluZyhwYXNzd29yZCkpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCdwaG9uZUNvZGUgb3IgcGFzc3dvcmQgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cblxuICAgIGlmKCFzaWduTWV0aG9kKSB7XG4gICAgICBzaWduTWV0aG9kID0gU0lHTl9NRVRIT0QuU0lHTklOXG4gICAgfVxuXG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnNpZ25Jbicse1xuICAgICAgbG9naW5UeXBlOiBMT0dJTlRZUEUuUEhPTkUsXG4gICAgICBwaG9uZU51bWJlcjogdHJhbnNmb3JtUGhvbmUocGhvbmVOdW1iZXIpLFxuICAgICAgcGhvbmVDb2RlLFxuICAgICAgcGFzc3dvcmQsXG4gICAgICByZWZyZXNoX3Rva2VuOiB0aGlzLl9jYWNoZS5nZXRTdG9yZShyZWZyZXNoVG9rZW5LZXkpIHx8ICcnLFxuICAgICAgc2lnbk1ldGhvZFxuICAgIH0pO1xuICAgIGNvbnN0IHsgcmVmcmVzaF90b2tlbixhY2Nlc3NfdG9rZW4sYWNjZXNzX3Rva2VuX2V4cGlyZSB9ID0gcmVzO1xuICAgIGlmKHJlZnJlc2hfdG9rZW4pIHtcbiAgICAgIGF3YWl0IHRoaXMuc2V0UmVmcmVzaFRva2VuKHJlZnJlc2hfdG9rZW4pO1xuICAgICAgaWYoYWNjZXNzX3Rva2VuICYmIGFjY2Vzc190b2tlbl9leHBpcmUpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRBY2Nlc3NUb2tlbihhY2Nlc3NfdG9rZW4sYWNjZXNzX3Rva2VuX2V4cGlyZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCB0aGlzLl9yZXF1ZXN0LnJlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgICAgfVxuICAgICAgLy8gc2V0IHVzZXIgaW5mb1xuICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoVXNlckluZm8oKTtcbiAgICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQpO1xuICAgICAgZXZlbnRCdXMuZmlyZShFVkVOVFMuTE9HSU5fVFlQRV9DSEFOR0VELHtcbiAgICAgICAgZW52OiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgICBsb2dpblR5cGU6IExPR0lOVFlQRS5QSE9ORSxcbiAgICAgICAgcGVyc2lzdGVuY2U6IHRoaXMuX2NvbmZpZy5wZXJzaXN0ZW5jZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYocmVzLmNvZGUpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLk9QRVJBVElPTl9GQUlMLGBQaG9uZSBsb2dpbiBmYWlsWyR7cmVzLmNvZGV9XSAke3Jlcy5tZXNzYWdlfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5PUEVSQVRJT05fRkFJTCxgUGhvbmUgbG9naW4gZmFpbGApO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog5omL5py65Y+35rOo5YaMXG4gICAqIEBwYXJhbSBwaG9uZU51bWJlclxuICAgKiBAcGFyYW0gcGhvbmVDb2RlXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+aJi+acuuefreS/oeazqOWGjOWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuc2lnblVwV2l0aFBob25lQ29kZSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG55+t5L+h6aqM6K+B56CB55m75b2VJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgc2lnblVwKHBob25lTnVtYmVyOiBzdHJpbmcscGhvbmVDb2RlOiBzdHJpbmcscGFzc3dvcmQ/OiBzdHJpbmcpOiBQcm9taXNlPElMb2dpblN0YXRlPiB7XG4gICAgcmV0dXJuIHRoaXMuc2lnbkluKHtcbiAgICAgIHBob25lTnVtYmVyLFxuICAgICAgcGhvbmVDb2RlLFxuICAgICAgcGFzc3dvcmQsXG4gICAgICBzaWduTWV0aG9kOiBTSUdOX01FVEhPRC5TSUdOVVBcbiAgICB9KVxuICB9XG59Il19