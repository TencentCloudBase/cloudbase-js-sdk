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
var catchErrorsDecorator = utilities_1.helpers.catchErrorsDecorator;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcm5hbWVBdXRoUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvdmlkZXJzL3VzZXJuYW1lQXV0aFByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBc0M7QUFFdEMsd0JBQWtEO0FBQ2xELDBDQUF5QztBQUN6QyxrREFBaUU7QUFFekQsSUFBQSxTQUFTLEdBQUssaUJBQUssVUFBVixDQUFXO0FBQ3BCLElBQUEsTUFBTSxHQUF5QixxQkFBUyxPQUFsQyxFQUFFLGtCQUFrQixHQUFLLHFCQUFTLG1CQUFkLENBQWU7QUFDekMsSUFBQSxvQkFBb0IsR0FBSyxtQkFBTyxxQkFBWixDQUFhO0FBRXpDO0lBQTBDLHdDQUFZO0lBQXREOztJQWlFQSxDQUFDO0lBdERjLHFDQUFNLEdBQW5CLFVBQW9CLFFBQWdCLEVBQUUsUUFBZ0I7Ozs7Ozt3QkFDcEQsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7NEJBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQ0FDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjO2dDQUMzQixHQUFHLEVBQUUsMkJBQTJCOzZCQUNqQyxDQUFDLENBQUMsQ0FBQzt5QkFDTDt3QkFFRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTs0QkFDaEMsUUFBUSxHQUFHLEVBQUUsQ0FBQzs0QkFDZCxTQUFTLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBQyxtQkFBbUIsQ0FBQyxDQUFDO3lCQUN0RDt3QkFFTyxlQUFlLEdBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGdCQUFyQixDQUFzQjt3QkFDM0IsS0FBQSxDQUFBLEtBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQSxDQUFDLElBQUksQ0FBQTs4QkFBQyxhQUFhOzs0QkFDaEQsU0FBUyxFQUFFLHFCQUFTLENBQUMsUUFBUTs0QkFDN0IsUUFBUSxVQUFBOzRCQUNSLFFBQVEsVUFBQTs7d0JBQ08sV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsRUFBQTs0QkFKckQsV0FBTSx5QkFJaEIsZ0JBQWEsR0FBRSxDQUFBLFNBQWdELEtBQUksRUFBRTtzQ0FDckUsRUFBQTs7d0JBTEksR0FBRyxHQUFHLFNBS1Y7d0JBRU0sYUFBYSxHQUF3QyxHQUFHLGNBQTNDLEVBQUUsbUJBQW1CLEdBQW1CLEdBQUcsb0JBQXRCLEVBQUUsWUFBWSxHQUFLLEdBQUcsYUFBUixDQUFTOzZCQUM3RCxhQUFhLEVBQWIsY0FBYTt3QkFDZixXQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEVBQUE7O3dCQUF6QyxTQUF5QyxDQUFDOzZCQUN0QyxDQUFBLFlBQVksSUFBSSxtQkFBbUIsQ0FBQSxFQUFuQyxjQUFtQzt3QkFDckMsV0FBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQyxFQUFBOzt3QkFBNUQsU0FBNEQsQ0FBQzs7NEJBRTdELFdBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxFQUFBOzt3QkFBeEMsU0FBd0MsQ0FBQzs7NEJBRzNDLFdBQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFBOzt3QkFBNUIsU0FBNEIsQ0FBQzt3QkFDN0IsWUFBUSxDQUFDLElBQUksQ0FBQyxVQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQzt3QkFDMUMsWUFBUSxDQUFDLElBQUksQ0FBQyxVQUFNLENBQUMsa0JBQWtCLEVBQUU7NEJBQ3ZDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7NEJBQ3JCLFNBQVMsRUFBRSxxQkFBUyxDQUFDLFFBQVE7NEJBQzdCLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7eUJBQ3RDLENBQUMsQ0FBQzt3QkFDSCxXQUFPLElBQUksY0FBVSxDQUFDO2dDQUNwQixLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO2dDQUN2QixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0NBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUTs2QkFDdkIsQ0FBQyxFQUFDOzt3QkFDRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7NEJBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQ0FDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjO2dDQUMzQixHQUFHLEVBQUUsK0JBQTZCLEdBQUcsQ0FBQyxJQUFJLFVBQUssR0FBRyxDQUFDLE9BQVM7NkJBQzdELENBQUMsQ0FBQyxDQUFDO3lCQUNMOzZCQUFNOzRCQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQ0FDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjO2dDQUMzQixHQUFHLEVBQUUsMEJBQTBCOzZCQUNoQyxDQUFDLENBQUMsQ0FBQzt5QkFDTDs7Ozs7O0tBQ0Y7SUFyREQ7UUFWQyxvQkFBb0IsQ0FBQztZQUNwQixLQUFLLEVBQUUsV0FBVztZQUNsQixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDViw0REFBNEQ7Z0JBQzVELHdCQUF3QjtnQkFDeEIsaUJBQWlCO2dCQUNqQixpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7OztzREFzREQ7SUFDSCwyQkFBQztDQUFBLEFBakVELENBQTBDLG1CQUFZLEdBaUVyRDtBQWpFWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IHsgSUxvZ2luU3RhdGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2F1dGgnO1xuaW1wb3J0IHsgZXZlbnRCdXMsIEVWRU5UUywgTG9naW5TdGF0ZSB9IGZyb20gJy4uJztcbmltcG9ydCB7IExPR0lOVFlQRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyB1dGlscywgY29uc3RhbnRzLCBoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuXG5jb25zdCB7IHByaW50V2FybiB9ID0gdXRpbHM7XG5jb25zdCB7IEVSUk9SUywgQ09NTVVOSVRZX1NJVEVfVVJMIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IGNhdGNoRXJyb3JzRGVjb3JhdG9yIH0gPSBoZWxwZXJzO1xuXG5leHBvcnQgY2xhc3MgVXNlcm5hbWVBdXRoUHJvdmlkZXIgZXh0ZW5kcyBBdXRoUHJvdmlkZXIge1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn55So5oi35ZCN5a+G56CB55m75b2V5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGF1dGgoKS5zaWduSW5XaXRoVXNlcm5hbWVBbmRQYXNzd29yZCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5piv5ZCm5byA6YCa5LqG55So5oi35ZCN5a+G56CB55m75b2VJyxcbiAgICAgICcgIDMgLSDnlKjmiLflkI3lr4bnoIHmmK/lkKbljLnphY0nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBzaWduSW4odXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8SUxvZ2luU3RhdGU+IHtcbiAgICBpZiAodHlwZW9mIHVzZXJuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICBtc2c6ICd1c2VybmFtZSBtdXN0IGJlIGEgc3RyaW5nJ1xuICAgICAgfSkpO1xuICAgIH1cbiAgICAvLyDnlKjmiLfkuI3orr7nva7lr4bnoIFcbiAgICBpZiAodHlwZW9mIHBhc3N3b3JkICE9PSAnc3RyaW5nJykge1xuICAgICAgcGFzc3dvcmQgPSAnJztcbiAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsJ3Bhc3N3b3JkIGlzIGVtcHR5Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnNpZ25Jbicse1xuICAgICAgbG9naW5UeXBlOiBMT0dJTlRZUEUuVVNFUk5BTUUsXG4gICAgICB1c2VybmFtZSxcbiAgICAgIHBhc3N3b3JkLFxuICAgICAgcmVmcmVzaF90b2tlbjogYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpIHx8ICcnXG4gICAgfSk7XG5cbiAgICBjb25zdCB7IHJlZnJlc2hfdG9rZW4sIGFjY2Vzc190b2tlbl9leHBpcmUsIGFjY2Vzc190b2tlbiB9ID0gcmVzO1xuICAgIGlmIChyZWZyZXNoX3Rva2VuKSB7XG4gICAgICBhd2FpdCB0aGlzLnNldFJlZnJlc2hUb2tlbihyZWZyZXNoX3Rva2VuKTtcbiAgICAgIGlmIChhY2Nlc3NfdG9rZW4gJiYgYWNjZXNzX3Rva2VuX2V4cGlyZSkge1xuICAgICAgICBhd2FpdCB0aGlzLnNldEFjY2Vzc1Rva2VuKGFjY2Vzc190b2tlbiwgYWNjZXNzX3Rva2VuX2V4cGlyZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCB0aGlzLl9yZXF1ZXN0LnJlZnJlc2hBY2Nlc3NUb2tlbigpO1xuICAgICAgfVxuICAgICAgLy8gc2V0IHVzZXIgaW5mb1xuICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoVXNlckluZm8oKTtcbiAgICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQpO1xuICAgICAgZXZlbnRCdXMuZmlyZShFVkVOVFMuTE9HSU5fVFlQRV9DSEFOR0VELCB7XG4gICAgICAgIGVudjogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgbG9naW5UeXBlOiBMT0dJTlRZUEUuVVNFUk5BTUUsXG4gICAgICAgIHBlcnNpc3RlbmNlOiB0aGlzLl9jb25maWcucGVyc2lzdGVuY2VcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBMb2dpblN0YXRlKHtcbiAgICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChyZXMuY29kZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLk9QRVJBVElPTl9GQUlMLFxuICAgICAgICBtc2c6IGBsb2dpbiBieSB1c2VybmFtZSBmYWlsZWQ6WyR7cmVzLmNvZGV9XSAke3Jlcy5tZXNzYWdlfWBcbiAgICAgIH0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLk9QRVJBVElPTl9GQUlMLFxuICAgICAgICBtc2c6ICdsb2dpbiBieSB1c2VybmFtZSBmYWlsZWQnXG4gICAgICB9KSk7XG4gICAgfVxuICB9XG59XG4iXX0=