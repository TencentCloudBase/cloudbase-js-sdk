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
var throwError = utils.throwError, isString = utils.isString;
var ERRORS = constants.ERRORS, COMMUNITY_SITE_URL = constants.COMMUNITY_SITE_URL;
var catchErrorsDecorator = helpers.catchErrorsDecorator;
var EmailAuthProvider = (function (_super) {
    __extends(EmailAuthProvider, _super);
    function EmailAuthProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmailAuthProvider.prototype.signIn = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshTokenKey, res, refresh_token, access_token, access_token_expire;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isString(email)) {
                            throwError(ERRORS.INVALID_PARAMS, 'email must be a string');
                        }
                        refreshTokenKey = this._cache.keys.refreshTokenKey;
                        return [4, this._request.send('auth.signIn', {
                                loginType: 'EMAIL',
                                email: email,
                                password: password,
                                refresh_token: this._cache.getStore(refreshTokenKey) || ''
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
                            loginType: LOGINTYPE.EMAIL,
                            persistence: this._config.persistence
                        });
                        return [2, new LoginState({
                                envId: this._config.env,
                                cache: this._cache,
                                request: this._request
                            })];
                    case 8:
                        if (res.code) {
                            throwError(ERRORS.OPERATION_FAIL, "Email login fail[" + res.code + "] " + res.message);
                        }
                        else {
                            throwError(ERRORS.OPERATION_FAIL, "Email login fail");
                        }
                        _a.label = 9;
                    case 9: return [2];
                }
            });
        });
    };
    EmailAuthProvider.prototype.signUp = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._request.send('auth.signUpWithEmailAndPassword', {
                        email: email,
                        password: password
                    })];
            });
        });
    };
    EmailAuthProvider.prototype.resetPassword = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._request.send('auth.sendPasswordResetEmail', {
                        email: email
                    })];
            });
        });
    };
    EmailAuthProvider.prototype.resetPasswordWithToken = function (token, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._request.send('auth.resetPasswordWithToken', {
                        token: token,
                        newPassword: newPassword
                    })];
            });
        });
    };
    EmailAuthProvider.prototype.activate = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._request.send('auth.activateEndUserMail', {
                        token: token
                    })];
            });
        });
    };
    __decorate([
        catchErrorsDecorator({
            title: '邮箱密码登录失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().emailAuthProvider() 的语法或参数是否正确',
                '  2 - 当前环境是否开通了邮箱登录',
                '  3 - 邮箱地址与密码是否匹配',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], EmailAuthProvider.prototype, "signIn", null);
    __decorate([
        catchErrorsDecorator({
            title: '邮箱注册失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().signUpWithEmailAndPassword() 的语法或参数是否正确',
                '  2 - 当前环境是否开通了邮箱登录',
                '  3 - 此邮箱地址是否已经被其他用户占用',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], EmailAuthProvider.prototype, "signUp", null);
    __decorate([
        catchErrorsDecorator({
            title: '重置密码失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().sendPasswordResetEmail() 的语法或参数是否正确',
                '  2 - 当前环境是否开通了邮箱登录',
                '  3 - 此邮箱地址是否已经与当前用户绑定',
                '  4 - 此邮箱地址是否已经被其他用户占用',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], EmailAuthProvider.prototype, "resetPassword", null);
    __decorate([
        catchErrorsDecorator({
            title: '重置密码失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用语法或参数是否正确',
                '  2 - 当前环境是否开通了邮箱登录',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], EmailAuthProvider.prototype, "resetPasswordWithToken", null);
    __decorate([
        catchErrorsDecorator({
            title: '邮箱激活失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用语法或参数是否正确',
                '  2 - 当前环境是否开通了邮箱登录',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], EmailAuthProvider.prototype, "activate", null);
    return EmailAuthProvider;
}(AuthProvider));
export { EmailAuthProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWxBdXRoUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvdmlkZXJzL2VtYWlsQXV0aFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUUvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRTFDLElBQUEsVUFBVSxHQUFlLEtBQUssV0FBcEIsRUFBRSxRQUFRLEdBQUssS0FBSyxTQUFWLENBQVc7QUFDL0IsSUFBQSxNQUFNLEdBQXlCLFNBQVMsT0FBbEMsRUFBRSxrQkFBa0IsR0FBSyxTQUFTLG1CQUFkLENBQWU7QUFDekMsSUFBQSxvQkFBb0IsR0FBSyxPQUFPLHFCQUFaLENBQWE7QUFFekM7SUFBdUMscUNBQVk7SUFBbkQ7O0lBZ0lBLENBQUM7SUFySGMsa0NBQU0sR0FBbkIsVUFBb0IsS0FBYSxFQUFFLFFBQWdCOzs7Ozs7d0JBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQ3BCLFVBQVUsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFDLHdCQUF3QixDQUFDLENBQUM7eUJBQzVEO3dCQUNPLGVBQWUsR0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksZ0JBQXJCLENBQXNCO3dCQUNqQyxXQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQ0FDbEQsU0FBUyxFQUFFLE9BQU87Z0NBQ2xCLEtBQUssT0FBQTtn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QUNuQixpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7OzttREFzQ0Q7SUFnQkQ7UUFWQyxvQkFBb0IsQ0FBQztZQUNwQixLQUFLLEVBQUUsUUFBUTtZQUNmLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLHlEQUF5RDtnQkFDekQscUJBQXFCO2dCQUNyQix3QkFBd0I7Z0JBQ3hCLGlLQUE2QixrQkFBb0I7YUFDbEQ7U0FDRixDQUFDOzs7O21EQU1EO0lBZ0JEO1FBWEMsb0JBQW9CLENBQUM7WUFDcEIsS0FBSyxFQUFFLFFBQVE7WUFDZixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVixxREFBcUQ7Z0JBQ3JELHFCQUFxQjtnQkFDckIsd0JBQXdCO2dCQUN4Qix3QkFBd0I7Z0JBQ3hCLGlLQUE2QixrQkFBb0I7YUFDbEQ7U0FDRixDQUFDOzs7OzBEQUtEO0lBZUQ7UUFUQyxvQkFBb0IsQ0FBQztZQUNwQixLQUFLLEVBQUUsUUFBUTtZQUNmLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLG1CQUFtQjtnQkFDbkIscUJBQXFCO2dCQUNyQixpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7OzttRUFNRDtJQWNEO1FBVEMsb0JBQW9CLENBQUM7WUFDcEIsS0FBSyxFQUFFLFFBQVE7WUFDZixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVixtQkFBbUI7Z0JBQ25CLHFCQUFxQjtnQkFDckIsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7cURBS0Q7SUFDSCx3QkFBQztDQUFBLEFBaElELENBQXVDLFlBQVksR0FnSWxEO1NBaElZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbnN0YW50cyx1dGlscyxoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgSUxvZ2luU3RhdGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2F1dGgnO1xuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IExPR0lOVFlQRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBldmVudEJ1cywgRVZFTlRTLCBMb2dpblN0YXRlIH0gZnJvbSAnLi4nO1xuXG5jb25zdCB7IHRocm93RXJyb3IsIGlzU3RyaW5nIH0gPSB1dGlscztcbmNvbnN0IHsgRVJST1JTLCBDT01NVU5JVFlfU0lURV9VUkwgfSA9IGNvbnN0YW50cztcbmNvbnN0IHsgY2F0Y2hFcnJvcnNEZWNvcmF0b3IgfSA9IGhlbHBlcnM7XG5cbmV4cG9ydCBjbGFzcyBFbWFpbEF1dGhQcm92aWRlciBleHRlbmRzIEF1dGhQcm92aWRlciB7XG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfpgq7nrrHlr4bnoIHnmbvlvZXlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLmVtYWlsQXV0aFByb3ZpZGVyKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobpgq7nrrHnmbvlvZUnLFxuICAgICAgJyAgMyAtIOmCrueuseWcsOWdgOS4juWvhueggeaYr+WQpuWMuemFjScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHNpZ25JbihlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxJTG9naW5TdGF0ZT4ge1xuICAgIGlmICghaXNTdHJpbmcoZW1haWwpKSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5JTlZBTElEX1BBUkFNUywnZW1haWwgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGguc2lnbkluJywge1xuICAgICAgbG9naW5UeXBlOiAnRU1BSUwnLFxuICAgICAgZW1haWwsXG4gICAgICBwYXNzd29yZCxcbiAgICAgIHJlZnJlc2hfdG9rZW46IHRoaXMuX2NhY2hlLmdldFN0b3JlKHJlZnJlc2hUb2tlbktleSkgfHwgJydcbiAgICB9KTtcbiAgICBjb25zdCB7IHJlZnJlc2hfdG9rZW4sIGFjY2Vzc190b2tlbiwgYWNjZXNzX3Rva2VuX2V4cGlyZSB9ID0gcmVzO1xuICAgIGlmIChyZWZyZXNoX3Rva2VuKSB7XG4gICAgICBhd2FpdCB0aGlzLnNldFJlZnJlc2hUb2tlbihyZWZyZXNoX3Rva2VuKTtcbiAgICAgIGlmIChhY2Nlc3NfdG9rZW4gJiYgYWNjZXNzX3Rva2VuX2V4cGlyZSkge1xuICAgICAgICBhd2FpdCB0aGlzLnNldEFjY2Vzc1Rva2VuKGFjY2Vzc190b2tlbiwgYWNjZXNzX3Rva2VuX2V4cGlyZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCB0aGlzLl9yZXF1ZXN0LnJlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgICAgfVxuICAgICAgLy8gc2V0IHVzZXIgaW5mb1xuICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoVXNlckluZm8oKTtcbiAgICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQpO1xuICAgICAgZXZlbnRCdXMuZmlyZShFVkVOVFMuTE9HSU5fVFlQRV9DSEFOR0VELCB7XG4gICAgICAgIGVudjogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgbG9naW5UeXBlOiBMT0dJTlRZUEUuRU1BSUwsXG4gICAgICAgIHBlcnNpc3RlbmNlOiB0aGlzLl9jb25maWcucGVyc2lzdGVuY2VcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBMb2dpblN0YXRlKHtcbiAgICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChyZXMuY29kZSkge1xuICAgICAgdGhyb3dFcnJvcihFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsYEVtYWlsIGxvZ2luIGZhaWxbJHtyZXMuY29kZX1dICR7cmVzLm1lc3NhZ2V9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLk9QRVJBVElPTl9GQUlMLGBFbWFpbCBsb2dpbiBmYWlsYCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDms6jlhoxcbiAgICogQHBhcmFtIGVtYWlsIFxuICAgKiBAcGFyYW0gcGFzc3dvcmQgXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6YKu566x5rOo5YaM5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5zaWduVXBXaXRoRW1haWxBbmRQYXNzd29yZCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG6YKu566x55m75b2VJyxcbiAgICAgICcgIDMgLSDmraTpgq7nrrHlnLDlnYDmmK/lkKblt7Lnu4/ooqvlhbbku5bnlKjmiLfljaDnlKgnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBzaWduVXAoZW1haWw6c3RyaW5nLCBwYXNzd29yZDpzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnNpZ25VcFdpdGhFbWFpbEFuZFBhc3N3b3JkJywge1xuICAgICAgZW1haWwsXG4gICAgICBwYXNzd29yZFxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDlj5Hotbfph43nva7lr4bnoIHor7fmsYLvvIzlj5HotbflkI7mjqjpgIHpgq7ku7bliLDmjIflrprpgq7nrrFcbiAgICogQHBhcmFtIGVtYWlsIFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+mHjee9ruWvhueggeWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuc2VuZFBhc3N3b3JkUmVzZXRFbWFpbCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG6YKu566x55m75b2VJyxcbiAgICAgICcgIDMgLSDmraTpgq7nrrHlnLDlnYDmmK/lkKblt7Lnu4/kuI7lvZPliY3nlKjmiLfnu5HlrponLFxuICAgICAgJyAgNCAtIOatpOmCrueuseWcsOWdgOaYr+WQpuW3sue7j+iiq+WFtuS7lueUqOaIt+WNoOeUqCcsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHJlc2V0UGFzc3dvcmQoZW1haWw6c3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5zZW5kUGFzc3dvcmRSZXNldEVtYWlsJywge1xuICAgICAgZW1haWxcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog6YeN572u5a+G56CBXG4gICAqIEBwYXJhbSB0b2tlbiBcbiAgICogQHBhcmFtIG5ld1Bhc3N3b3JkIFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+mHjee9ruWvhueggeWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG6YKu566x55m75b2VJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgcmVzZXRQYXNzd29yZFdpdGhUb2tlbih0b2tlbjpzdHJpbmcsIG5ld1Bhc3N3b3JkOnN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGgucmVzZXRQYXNzd29yZFdpdGhUb2tlbicsIHtcbiAgICAgIHRva2VuLFxuICAgICAgbmV3UGFzc3dvcmRcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog5r+A5rS76YKu566xXG4gICAqIEBwYXJhbSB0b2tlbiBcbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfpgq7nrrHmv4DmtLvlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKjor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6humCrueuseeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGFjdGl2YXRlKHRva2VuOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLmFjdGl2YXRlRW5kVXNlck1haWwnLCB7XG4gICAgICB0b2tlblxuICAgIH0pO1xuICB9XG59Il19