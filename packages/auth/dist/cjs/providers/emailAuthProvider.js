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
exports.EmailAuthProvider = void 0;
var utilities_1 = require("@cloudbase/utilities");
var base_1 = require("./base");
var constants_1 = require("../constants");
var __1 = require("..");
var throwError = utilities_1.utils.throwError, isString = utilities_1.utils.isString;
var ERRORS = utilities_1.constants.ERRORS, COMMUNITY_SITE_URL = utilities_1.constants.COMMUNITY_SITE_URL;
var catchErrorsDecorator = utilities_1.helpers.catchErrorsDecorator, stopAuthLoginWithOAuth = utilities_1.helpers.stopAuthLoginWithOAuth;
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
                        __1.eventBus.fire(__1.EVENTS.LOGIN_STATE_CHANGED);
                        __1.eventBus.fire(__1.EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this._config.env,
                            loginType: constants_1.LOGINTYPE.EMAIL,
                            persistence: this._config.persistence
                        });
                        return [2, new __1.LoginState({
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
        stopAuthLoginWithOAuth(),
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
        stopAuthLoginWithOAuth(),
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
}(base_1.AuthProvider));
exports.EmailAuthProvider = EmailAuthProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWxBdXRoUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvdmlkZXJzL2VtYWlsQXV0aFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBaUU7QUFFakUsK0JBQXNDO0FBQ3RDLDBDQUF5QztBQUN6Qyx3QkFBa0Q7QUFFMUMsSUFBQSxVQUFVLEdBQWUsaUJBQUssV0FBcEIsRUFBRSxRQUFRLEdBQUssaUJBQUssU0FBVixDQUFXO0FBQy9CLElBQUEsTUFBTSxHQUF5QixxQkFBUyxPQUFsQyxFQUFFLGtCQUFrQixHQUFLLHFCQUFTLG1CQUFkLENBQWU7QUFDekMsSUFBQSxvQkFBb0IsR0FBNkIsbUJBQU8scUJBQXBDLEVBQUUsc0JBQXNCLEdBQUssbUJBQU8sdUJBQVosQ0FBYTtBQUVqRTtJQUF1QyxxQ0FBWTtJQUFuRDs7SUFtSUEsQ0FBQztJQXRIYyxrQ0FBTSxHQUFuQixVQUFvQixLQUFhLEVBQUUsUUFBZ0I7Ozs7Ozt3QkFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTs0QkFDcEIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsd0JBQXdCLENBQUMsQ0FBQzt5QkFDN0Q7d0JBQ08sZUFBZSxHQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxnQkFBckIsQ0FBc0I7d0JBQ2pDLFdBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO2dDQUNsRCxTQUFTLEVBQUUsT0FBTztnQ0FDbEIsS0FBSyxPQUFBO2dDQUNMLFFBQVEsVUFBQTtnQ0FDUixhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRTs2QkFDM0QsQ0FBQyxFQUFBOzt3QkFMSSxHQUFHLEdBQUcsU0FLVjt3QkFDTSxhQUFhLEdBQXdDLEdBQUcsY0FBM0MsRUFBRSxZQUFZLEdBQTBCLEdBQUcsYUFBN0IsRUFBRSxtQkFBbUIsR0FBSyxHQUFHLG9CQUFSLENBQVM7NkJBQzdELGFBQWEsRUFBYixjQUFhO3dCQUNmLFdBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsRUFBQTs7d0JBQXpDLFNBQXlDLENBQUM7NkJBQ3RDLENBQUEsWUFBWSxJQUFJLG1CQUFtQixDQUFBLEVBQW5DLGNBQW1DO3dCQUNyQyxXQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLG1CQUFtQixDQUFDLEVBQUE7O3dCQUE1RCxTQUE0RCxDQUFDOzs0QkFFN0QsV0FBTSxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLEVBQUE7O3dCQUF4QyxTQUF3QyxDQUFDOzs0QkFHM0MsV0FBTSxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUE7O3dCQUE1QixTQUE0QixDQUFDO3dCQUM3QixZQUFRLENBQUMsSUFBSSxDQUFDLFVBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO3dCQUMxQyxZQUFRLENBQUMsSUFBSSxDQUFDLFVBQU0sQ0FBQyxrQkFBa0IsRUFBRTs0QkFDdkMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzs0QkFDckIsU0FBUyxFQUFFLHFCQUFTLENBQUMsS0FBSzs0QkFDMUIsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVzt5QkFDdEMsQ0FBQyxDQUFDO3dCQUNILFdBQU8sSUFBSSxjQUFVLENBQUM7Z0NBQ3BCLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7Z0NBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtnQ0FDbEIsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFROzZCQUN2QixDQUFDLEVBQUM7O3dCQUNFLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTs0QkFDbkIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsc0JBQW9CLEdBQUcsQ0FBQyxJQUFJLFVBQUssR0FBRyxDQUFDLE9BQVMsQ0FBQyxDQUFDO3lCQUNuRjs2QkFBTTs0QkFDTCxVQUFVLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO3lCQUN2RDs7Ozs7O0tBQ0Y7SUFpQlksa0NBQU0sR0FBbkIsVUFBb0IsS0FBYSxFQUFFLFFBQWdCOzs7Z0JBQ2pELFdBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUU7d0JBQzNELEtBQUssT0FBQTt3QkFDTCxRQUFRLFVBQUE7cUJBQ1QsQ0FBQyxFQUFDOzs7S0FDSjtJQWdCWSx5Q0FBYSxHQUExQixVQUEyQixLQUFhOzs7Z0JBQ3RDLFdBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEVBQUU7d0JBQ3ZELEtBQUssT0FBQTtxQkFDTixDQUFDLEVBQUM7OztLQUNKO0lBZVksa0RBQXNCLEdBQW5DLFVBQW9DLEtBQWEsRUFBRSxXQUFtQjs7O2dCQUNwRSxXQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFO3dCQUN2RCxLQUFLLE9BQUE7d0JBQ0wsV0FBVyxhQUFBO3FCQUNaLENBQUMsRUFBQzs7O0tBQ0o7SUFjWSxvQ0FBUSxHQUFyQixVQUFzQixLQUFhOzs7Z0JBQ2pDLFdBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUU7d0JBQ3BELEtBQUssT0FBQTtxQkFDTixDQUFDLEVBQUM7OztLQUNKO0lBckhEO1FBWEMsc0JBQXNCLEVBQUU7UUFDeEIsb0JBQW9CLENBQUM7WUFDcEIsS0FBSyxFQUFFLFVBQVU7WUFDakIsUUFBUSxFQUFFO2dCQUNSLFVBQVU7Z0JBQ1YsZ0RBQWdEO2dCQUNoRCxxQkFBcUI7Z0JBQ3JCLG1CQUFtQjtnQkFDbkIsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7bURBc0NEO0lBaUJEO1FBWEMsc0JBQXNCLEVBQUU7UUFDeEIsb0JBQW9CLENBQUM7WUFDcEIsS0FBSyxFQUFFLFFBQVE7WUFDZixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVix5REFBeUQ7Z0JBQ3pELHFCQUFxQjtnQkFDckIsd0JBQXdCO2dCQUN4QixpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7OzttREFNRDtJQWdCRDtRQVhDLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxRQUFRO1lBQ2YsUUFBUSxFQUFFO2dCQUNSLFVBQVU7Z0JBQ1YscURBQXFEO2dCQUNyRCxxQkFBcUI7Z0JBQ3JCLHdCQUF3QjtnQkFDeEIsd0JBQXdCO2dCQUN4QixpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7OzswREFLRDtJQWVEO1FBVEMsb0JBQW9CLENBQUM7WUFDcEIsS0FBSyxFQUFFLFFBQVE7WUFDZixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVixtQkFBbUI7Z0JBQ25CLHFCQUFxQjtnQkFDckIsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7bUVBTUQ7SUFjRDtRQVRDLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxRQUFRO1lBQ2YsUUFBUSxFQUFFO2dCQUNSLFVBQVU7Z0JBQ1YsbUJBQW1CO2dCQUNuQixxQkFBcUI7Z0JBQ3JCLGlLQUE2QixrQkFBb0I7YUFDbEQ7U0FDRixDQUFDOzs7O3FEQUtEO0lBQ0gsd0JBQUM7Q0FBQSxBQW5JRCxDQUF1QyxtQkFBWSxHQW1JbEQ7QUFuSVksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uc3RhbnRzLCB1dGlscywgaGVscGVycyB9IGZyb20gJ0BjbG91ZGJhc2UvdXRpbGl0aWVzJztcbmltcG9ydCB7IElMb2dpblN0YXRlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9hdXRoJztcbmltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgeyBMT0dJTlRZUEUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZXZlbnRCdXMsIEVWRU5UUywgTG9naW5TdGF0ZSB9IGZyb20gJy4uJztcblxuY29uc3QgeyB0aHJvd0Vycm9yLCBpc1N0cmluZyB9ID0gdXRpbHM7XG5jb25zdCB7IEVSUk9SUywgQ09NTVVOSVRZX1NJVEVfVVJMIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IGNhdGNoRXJyb3JzRGVjb3JhdG9yLCBzdG9wQXV0aExvZ2luV2l0aE9BdXRoIH0gPSBoZWxwZXJzO1xuXG5leHBvcnQgY2xhc3MgRW1haWxBdXRoUHJvdmlkZXIgZXh0ZW5kcyBBdXRoUHJvdmlkZXIge1xuXG4gIEBzdG9wQXV0aExvZ2luV2l0aE9BdXRoKClcbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+mCrueuseWvhueggeeZu+W9leWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuZW1haWxBdXRoUHJvdmlkZXIoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6humCrueuseeZu+W9lScsXG4gICAgICAnICAzIC0g6YKu566x5Zyw5Z2A5LiO5a+G56CB5piv5ZCm5Yy56YWNJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgc2lnbkluKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPElMb2dpblN0YXRlPiB7XG4gICAgaWYgKCFpc1N0cmluZyhlbWFpbCkpIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCAnZW1haWwgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cbiAgICBjb25zdCB7IHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGguc2lnbkluJywge1xuICAgICAgbG9naW5UeXBlOiAnRU1BSUwnLFxuICAgICAgZW1haWwsXG4gICAgICBwYXNzd29yZCxcbiAgICAgIHJlZnJlc2hfdG9rZW46IHRoaXMuX2NhY2hlLmdldFN0b3JlKHJlZnJlc2hUb2tlbktleSkgfHwgJydcbiAgICB9KTtcbiAgICBjb25zdCB7IHJlZnJlc2hfdG9rZW4sIGFjY2Vzc190b2tlbiwgYWNjZXNzX3Rva2VuX2V4cGlyZSB9ID0gcmVzO1xuICAgIGlmIChyZWZyZXNoX3Rva2VuKSB7XG4gICAgICBhd2FpdCB0aGlzLnNldFJlZnJlc2hUb2tlbihyZWZyZXNoX3Rva2VuKTtcbiAgICAgIGlmIChhY2Nlc3NfdG9rZW4gJiYgYWNjZXNzX3Rva2VuX2V4cGlyZSkge1xuICAgICAgICBhd2FpdCB0aGlzLnNldEFjY2Vzc1Rva2VuKGFjY2Vzc190b2tlbiwgYWNjZXNzX3Rva2VuX2V4cGlyZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCB0aGlzLl9yZXF1ZXN0LnJlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgICAgfVxuICAgICAgLy8gc2V0IHVzZXIgaW5mb1xuICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoVXNlckluZm8oKTtcbiAgICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQpO1xuICAgICAgZXZlbnRCdXMuZmlyZShFVkVOVFMuTE9HSU5fVFlQRV9DSEFOR0VELCB7XG4gICAgICAgIGVudjogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgbG9naW5UeXBlOiBMT0dJTlRZUEUuRU1BSUwsXG4gICAgICAgIHBlcnNpc3RlbmNlOiB0aGlzLl9jb25maWcucGVyc2lzdGVuY2VcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBMb2dpblN0YXRlKHtcbiAgICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChyZXMuY29kZSkge1xuICAgICAgdGhyb3dFcnJvcihFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsIGBFbWFpbCBsb2dpbiBmYWlsWyR7cmVzLmNvZGV9XSAke3Jlcy5tZXNzYWdlfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvd0Vycm9yKEVSUk9SUy5PUEVSQVRJT05fRkFJTCwgYEVtYWlsIGxvZ2luIGZhaWxgKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOazqOWGjFxuICAgKiBAcGFyYW0gZW1haWxcbiAgICogQHBhcmFtIHBhc3N3b3JkXG4gICAqL1xuICBAc3RvcEF1dGhMb2dpbldpdGhPQXV0aCgpXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfpgq7nrrHms6jlhozlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLnNpZ25VcFdpdGhFbWFpbEFuZFBhc3N3b3JkKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobpgq7nrrHnmbvlvZUnLFxuICAgICAgJyAgMyAtIOatpOmCrueuseWcsOWdgOaYr+WQpuW3sue7j+iiq+WFtuS7lueUqOaIt+WNoOeUqCcsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHNpZ25VcChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5zaWduVXBXaXRoRW1haWxBbmRQYXNzd29yZCcsIHtcbiAgICAgIGVtYWlsLFxuICAgICAgcGFzc3dvcmRcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog5Y+R6LW36YeN572u5a+G56CB6K+35rGC77yM5Y+R6LW35ZCO5o6o6YCB6YKu5Lu25Yiw5oyH5a6a6YKu566xXG4gICAqIEBwYXJhbSBlbWFpbFxuICAgKi9cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+mHjee9ruWvhueggeWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkuc2VuZFBhc3N3b3JkUmVzZXRFbWFpbCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG6YKu566x55m75b2VJyxcbiAgICAgICcgIDMgLSDmraTpgq7nrrHlnLDlnYDmmK/lkKblt7Lnu4/kuI7lvZPliY3nlKjmiLfnu5HlrponLFxuICAgICAgJyAgNCAtIOatpOmCrueuseWcsOWdgOaYr+WQpuW3sue7j+iiq+WFtuS7lueUqOaIt+WNoOeUqCcsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHJlc2V0UGFzc3dvcmQoZW1haWw6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGguc2VuZFBhc3N3b3JkUmVzZXRFbWFpbCcsIHtcbiAgICAgIGVtYWlsXG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOmHjee9ruWvhueggVxuICAgKiBAcGFyYW0gdG9rZW5cbiAgICogQHBhcmFtIG5ld1Bhc3N3b3JkXG4gICAqL1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6YeN572u5a+G56CB5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55So6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPmmK/lkKblvIDpgJrkuobpgq7nrrHnmbvlvZUnLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyByZXNldFBhc3N3b3JkV2l0aFRva2VuKHRva2VuOiBzdHJpbmcsIG5ld1Bhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnJlc2V0UGFzc3dvcmRXaXRoVG9rZW4nLCB7XG4gICAgICB0b2tlbixcbiAgICAgIG5ld1Bhc3N3b3JkXG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOa/gOa0u+mCrueusVxuICAgKiBAcGFyYW0gdG9rZW5cbiAgICovXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfpgq7nrrHmv4DmtLvlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKjor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOmAmuS6humCrueuseeZu+W9lScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGFjdGl2YXRlKHRva2VuOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLmFjdGl2YXRlRW5kVXNlck1haWwnLCB7XG4gICAgICB0b2tlblxuICAgIH0pO1xuICB9XG59Il19