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
exports.UsernameAuthProvider = void 0;
var base_1 = require("./base");
var __1 = require("..");
var constants_1 = require("../constants");
var utilities_1 = require("@cloudbase/utilities");
var printWarn = utilities_1.utils.printWarn;
var ERRORS = utilities_1.constants.ERRORS, COMMUNITY_SITE_URL = utilities_1.constants.COMMUNITY_SITE_URL;
var catchErrorsDecorator = utilities_1.helpers.catchErrorsDecorator, stopAuthLoginWithOAuth = utilities_1.helpers.stopAuthLoginWithOAuth;
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
                            loginType: constants_1.LOGINTYPE.USERNAME,
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
                        __1.eventBus.fire(__1.EVENTS.LOGIN_STATE_CHANGED);
                        __1.eventBus.fire(__1.EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this._config.env,
                            loginType: constants_1.LOGINTYPE.USERNAME,
                            persistence: this._config.persistence
                        });
                        return [2, new __1.LoginState({
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
}(base_1.AuthProvider));
exports.UsernameAuthProvider = UsernameAuthProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcm5hbWVBdXRoUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvdmlkZXJzL3VzZXJuYW1lQXV0aFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBc0M7QUFFdEMsd0JBQWtEO0FBQ2xELDBDQUF5QztBQUN6QyxrREFBaUU7QUFFekQsSUFBQSxTQUFTLEdBQUssaUJBQUssVUFBVixDQUFXO0FBQ3BCLElBQUEsTUFBTSxHQUF5QixxQkFBUyxPQUFsQyxFQUFFLGtCQUFrQixHQUFLLHFCQUFTLG1CQUFkLENBQWU7QUFDekMsSUFBQSxvQkFBb0IsR0FBNkIsbUJBQU8scUJBQXBDLEVBQUUsc0JBQXNCLEdBQUssbUJBQU8sdUJBQVosQ0FBYTtBQUVqRTtJQUEwQyx3Q0FBWTtJQUF0RDs7SUFrRUEsQ0FBQztJQXREYyxxQ0FBTSxHQUFuQixVQUFvQixRQUFnQixFQUFFLFFBQWdCOzs7Ozs7d0JBQ3BELElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFOzRCQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0NBQzdCLElBQUksRUFBRSxNQUFNLENBQUMsY0FBYztnQ0FDM0IsR0FBRyxFQUFFLDJCQUEyQjs2QkFDakMsQ0FBQyxDQUFDLENBQUM7eUJBQ0w7d0JBRUQsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7NEJBQ2hDLFFBQVEsR0FBRyxFQUFFLENBQUM7NEJBQ2QsU0FBUyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsbUJBQW1CLENBQUMsQ0FBQzt5QkFDdkQ7d0JBRU8sZUFBZSxHQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxnQkFBckIsQ0FBc0I7d0JBQzNCLEtBQUEsQ0FBQSxLQUFBLElBQUksQ0FBQyxRQUFRLENBQUEsQ0FBQyxJQUFJLENBQUE7OEJBQUMsYUFBYTs7NEJBQ2hELFNBQVMsRUFBRSxxQkFBUyxDQUFDLFFBQVE7NEJBQzdCLFFBQVEsVUFBQTs0QkFDUixRQUFRLFVBQUE7O3dCQUNPLFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEVBQUE7NEJBSnJELFdBQU0seUJBSWhCLGdCQUFhLEdBQUUsQ0FBQSxTQUFnRCxLQUFJLEVBQUU7c0NBQ3JFLEVBQUE7O3dCQUxJLEdBQUcsR0FBRyxTQUtWO3dCQUVNLGFBQWEsR0FBd0MsR0FBRyxjQUEzQyxFQUFFLG1CQUFtQixHQUFtQixHQUFHLG9CQUF0QixFQUFFLFlBQVksR0FBSyxHQUFHLGFBQVIsQ0FBUzs2QkFDN0QsYUFBYSxFQUFiLGNBQWE7d0JBQ2YsV0FBTSxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxFQUFBOzt3QkFBekMsU0FBeUMsQ0FBQzs2QkFDdEMsQ0FBQSxZQUFZLElBQUksbUJBQW1CLENBQUEsRUFBbkMsY0FBbUM7d0JBQ3JDLFdBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUMsRUFBQTs7d0JBQTVELFNBQTRELENBQUM7OzRCQUU3RCxXQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsRUFBQTs7d0JBQXhDLFNBQXdDLENBQUM7OzRCQUczQyxXQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBQTs7d0JBQTVCLFNBQTRCLENBQUM7d0JBQzdCLFlBQVEsQ0FBQyxJQUFJLENBQUMsVUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7d0JBQzFDLFlBQVEsQ0FBQyxJQUFJLENBQUMsVUFBTSxDQUFDLGtCQUFrQixFQUFFOzRCQUN2QyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzRCQUNyQixTQUFTLEVBQUUscUJBQVMsQ0FBQyxRQUFROzRCQUM3QixXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXO3lCQUN0QyxDQUFDLENBQUM7d0JBQ0gsV0FBTyxJQUFJLGNBQVUsQ0FBQztnQ0FDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztnQ0FDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO2dDQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7NkJBQ3ZCLENBQUMsRUFBQzs7d0JBQ0UsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFOzRCQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0NBQzdCLElBQUksRUFBRSxNQUFNLENBQUMsY0FBYztnQ0FDM0IsR0FBRyxFQUFFLCtCQUE2QixHQUFHLENBQUMsSUFBSSxVQUFLLEdBQUcsQ0FBQyxPQUFTOzZCQUM3RCxDQUFDLENBQUMsQ0FBQzt5QkFDTDs2QkFBTTs0QkFDTCxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0NBQzdCLElBQUksRUFBRSxNQUFNLENBQUMsY0FBYztnQ0FDM0IsR0FBRyxFQUFFLDBCQUEwQjs2QkFDaEMsQ0FBQyxDQUFDLENBQUM7eUJBQ0w7Ozs7OztLQUNGO0lBckREO1FBWEMsc0JBQXNCLEVBQUU7UUFDeEIsb0JBQW9CLENBQUM7WUFDcEIsS0FBSyxFQUFFLFdBQVc7WUFDbEIsUUFBUSxFQUFFO2dCQUNSLFVBQVU7Z0JBQ1YsNERBQTREO2dCQUM1RCx3QkFBd0I7Z0JBQ3hCLGlCQUFpQjtnQkFDakIsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7c0RBc0REO0lBQ0gsMkJBQUM7Q0FBQSxBQWxFRCxDQUEwQyxtQkFBWSxHQWtFckQ7QUFsRVksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IElMb2dpblN0YXRlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9hdXRoJztcbmltcG9ydCB7IGV2ZW50QnVzLCBFVkVOVFMsIExvZ2luU3RhdGUgfSBmcm9tICcuLic7XG5pbXBvcnQgeyBMT0dJTlRZUEUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgdXRpbHMsIGNvbnN0YW50cywgaGVscGVycyB9IGZyb20gJ0BjbG91ZGJhc2UvdXRpbGl0aWVzJztcblxuY29uc3QgeyBwcmludFdhcm4gfSA9IHV0aWxzO1xuY29uc3QgeyBFUlJPUlMsIENPTU1VTklUWV9TSVRFX1VSTCB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyBjYXRjaEVycm9yc0RlY29yYXRvciwgc3RvcEF1dGhMb2dpbldpdGhPQXV0aCB9ID0gaGVscGVycztcblxuZXhwb3J0IGNsYXNzIFVzZXJuYW1lQXV0aFByb3ZpZGVyIGV4dGVuZHMgQXV0aFByb3ZpZGVyIHtcbiAgQHN0b3BBdXRoTG9naW5XaXRoT0F1dGgoKVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn55So5oi35ZCN5a+G56CB55m75b2V5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5zaWduSW5XaXRoVXNlcm5hbWVBbmRQYXNzd29yZCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG55So5oi35ZCN5a+G56CB55m75b2VJyxcbiAgICAgICcgIDMgLSDnlKjmiLflkI3lr4bnoIHmmK/lkKbljLnphY0nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBzaWduSW4odXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8SUxvZ2luU3RhdGU+IHtcbiAgICBpZiAodHlwZW9mIHVzZXJuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICBtc2c6ICd1c2VybmFtZSBtdXN0IGJlIGEgc3RyaW5nJ1xuICAgICAgfSkpO1xuICAgIH1cbiAgICAvLyDnlKjmiLfkuI3orr7nva7lr4bnoIFcbiAgICBpZiAodHlwZW9mIHBhc3N3b3JkICE9PSAnc3RyaW5nJykge1xuICAgICAgcGFzc3dvcmQgPSAnJztcbiAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsICdwYXNzd29yZCBpcyBlbXB0eScpO1xuICAgIH1cblxuICAgIGNvbnN0IHsgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX3JlcXVlc3Quc2VuZCgnYXV0aC5zaWduSW4nLCB7XG4gICAgICBsb2dpblR5cGU6IExPR0lOVFlQRS5VU0VSTkFNRSxcbiAgICAgIHVzZXJuYW1lLFxuICAgICAgcGFzc3dvcmQsXG4gICAgICByZWZyZXNoX3Rva2VuOiBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSkgfHwgJydcbiAgICB9KTtcblxuICAgIGNvbnN0IHsgcmVmcmVzaF90b2tlbiwgYWNjZXNzX3Rva2VuX2V4cGlyZSwgYWNjZXNzX3Rva2VuIH0gPSByZXM7XG4gICAgaWYgKHJlZnJlc2hfdG9rZW4pIHtcbiAgICAgIGF3YWl0IHRoaXMuc2V0UmVmcmVzaFRva2VuKHJlZnJlc2hfdG9rZW4pO1xuICAgICAgaWYgKGFjY2Vzc190b2tlbiAmJiBhY2Nlc3NfdG9rZW5fZXhwaXJlKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2V0QWNjZXNzVG9rZW4oYWNjZXNzX3Rva2VuLCBhY2Nlc3NfdG9rZW5fZXhwaXJlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3JlcXVlc3QucmVmcmVzaEFjY2Vzc1Rva2VuKCk7XG4gICAgICB9XG4gICAgICAvLyBzZXQgdXNlciBpbmZvXG4gICAgICBhd2FpdCB0aGlzLnJlZnJlc2hVc2VySW5mbygpO1xuICAgICAgZXZlbnRCdXMuZmlyZShFVkVOVFMuTE9HSU5fU1RBVEVfQ0hBTkdFRCk7XG4gICAgICBldmVudEJ1cy5maXJlKEVWRU5UUy5MT0dJTl9UWVBFX0NIQU5HRUQsIHtcbiAgICAgICAgZW52OiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgICBsb2dpblR5cGU6IExPR0lOVFlQRS5VU0VSTkFNRSxcbiAgICAgICAgcGVyc2lzdGVuY2U6IHRoaXMuX2NvbmZpZy5wZXJzaXN0ZW5jZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHJlcy5jb2RlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsXG4gICAgICAgIG1zZzogYGxvZ2luIGJ5IHVzZXJuYW1lIGZhaWxlZDpbJHtyZXMuY29kZX1dICR7cmVzLm1lc3NhZ2V9YFxuICAgICAgfSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsXG4gICAgICAgIG1zZzogJ2xvZ2luIGJ5IHVzZXJuYW1lIGZhaWxlZCdcbiAgICAgIH0pKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==