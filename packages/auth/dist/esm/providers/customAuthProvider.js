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
import { utils, constants, helpers } from '@cloudbase/utilities';
import { AuthProvider } from './base';
import { LOGINTYPE } from '../constants';
import { eventBus, EVENTS, LoginState } from '..';
var ERRORS = constants.ERRORS, COMMUNITY_SITE_URL = constants.COMMUNITY_SITE_URL;
var isString = utils.isString;
var catchErrorsDecorator = helpers.catchErrorsDecorator, stopAuthLoginWithOAuth = helpers.stopAuthLoginWithOAuth;
var CustomAuthProvider = (function (_super) {
    __extends(CustomAuthProvider, _super);
    function CustomAuthProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomAuthProvider.prototype.signIn = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshTokenKey, res, _a, _b, _c, _d, loginState;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!isString(ticket)) {
                            throw new Error(JSON.stringify({
                                code: ERRORS.INVALID_PARAMS,
                                msg: 'ticket must be a string'
                            }));
                        }
                        refreshTokenKey = this._cache.keys.refreshTokenKey;
                        _b = (_a = this._request).send;
                        _c = ['auth.signInWithTicket'];
                        _d = {
                            ticket: ticket
                        };
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 1: return [4, _b.apply(_a, _c.concat([(_d.refresh_token = (_e.sent()) || '',
                                _d)]))];
                    case 2:
                        res = _e.sent();
                        if (!res.refresh_token) return [3, 7];
                        return [4, this.setRefreshToken(res.refresh_token)];
                    case 3:
                        _e.sent();
                        return [4, this._request.refreshAccessToken()];
                    case 4:
                        _e.sent();
                        eventBus.fire(EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this._config.env,
                            loginType: LOGINTYPE.CUSTOM,
                            persistence: this._config.persistence
                        });
                        eventBus.fire(EVENTS.LOGIN_STATE_CHANGED);
                        return [4, this.refreshUserInfo()];
                    case 5:
                        _e.sent();
                        loginState = new LoginState({
                            envId: this._config.env,
                            cache: this._cache,
                            request: this._request
                        });
                        return [4, loginState.checkLocalStateAsync()];
                    case 6:
                        _e.sent();
                        return [2, loginState];
                    case 7: throw new Error(JSON.stringify({
                        code: ERRORS.OPERATION_FAIL,
                        msg: 'custom signIn failed'
                    }));
                }
            });
        });
    };
    __decorate([
        stopAuthLoginWithOAuth(),
        catchErrorsDecorator({
            title: '自定义登录失败',
            messages: [
                '请确认以下各项：',
                '  1 - 当前环境是否开启了自定义登录',
                '  2 - 调用 auth().customAuthProvider().signIn() 的语法或参数是否正确',
                '  3 - ticket 是否归属于当前环境',
                '  4 - 创建 ticket 的自定义登录私钥是否过期',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], CustomAuthProvider.prototype, "signIn", null);
    return CustomAuthProvider;
}(AuthProvider));
export { CustomAuthProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tQXV0aFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy9jdXN0b21BdXRoUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWpFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFMUMsSUFBQSxNQUFNLEdBQXlCLFNBQVMsT0FBbEMsRUFBRSxrQkFBa0IsR0FBSyxTQUFTLG1CQUFkLENBQWU7QUFDekMsSUFBQSxRQUFRLEdBQUssS0FBSyxTQUFWLENBQVc7QUFDbkIsSUFBQSxvQkFBb0IsR0FBNkIsT0FBTyxxQkFBcEMsRUFBRSxzQkFBc0IsR0FBSyxPQUFPLHVCQUFaLENBQWE7QUFFakU7SUFBd0Msc0NBQVk7SUFBcEQ7O0lBeURBLENBQUM7SUEzQ2MsbUNBQU0sR0FBbkIsVUFBb0IsTUFBYzs7Ozs7O3dCQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFOzRCQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0NBQzdCLElBQUksRUFBRSxNQUFNLENBQUMsY0FBYztnQ0FDM0IsR0FBRyxFQUFFLHlCQUF5Qjs2QkFDL0IsQ0FBQyxDQUFDLENBQUM7eUJBQ0w7d0JBQ08sZUFBZSxHQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxnQkFBckIsQ0FBc0I7d0JBQzNCLEtBQUEsQ0FBQSxLQUFBLElBQUksQ0FBQyxRQUFRLENBQUEsQ0FBQyxJQUFJLENBQUE7OEJBQUMsdUJBQXVCOzs0QkFDMUQsTUFBTSxRQUFBOzt3QkFDUyxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxFQUFBOzRCQUZyRCxXQUFNLHlCQUVoQixnQkFBYSxHQUFFLENBQUEsU0FBZ0QsS0FBSSxFQUFFO3NDQUNyRSxFQUFBOzt3QkFISSxHQUFHLEdBQUcsU0FHVjs2QkFDRSxHQUFHLENBQUMsYUFBYSxFQUFqQixjQUFpQjt3QkFFbkIsV0FBTSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBQTs7d0JBQTdDLFNBQTZDLENBQUM7d0JBQzlDLFdBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxFQUFBOzt3QkFBeEMsU0FBd0MsQ0FBQzt3QkFFekMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUU7NEJBQ3ZDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7NEJBQ3JCLFNBQVMsRUFBRSxTQUFTLENBQUMsTUFBTTs0QkFDM0IsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVzt5QkFDdEMsQ0FBQyxDQUFDO3dCQUVILFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7d0JBRzFDLFdBQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFBOzt3QkFBNUIsU0FBNEIsQ0FBQzt3QkFFdkIsVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDOzRCQUNoQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzRCQUN2QixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07NEJBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUTt5QkFDdkIsQ0FBQyxDQUFDO3dCQUNILFdBQU0sVUFBVSxDQUFDLG9CQUFvQixFQUFFLEVBQUE7O3dCQUF2QyxTQUF1QyxDQUFDO3dCQUV4QyxXQUFPLFVBQVUsRUFBQzs0QkFFbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO3dCQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLGNBQWM7d0JBQzNCLEdBQUcsRUFBRSxzQkFBc0I7cUJBQzVCLENBQUMsQ0FBQyxDQUFDOzs7O0tBRVA7SUExQ0Q7UUFaQyxzQkFBc0IsRUFBRTtRQUN4QixvQkFBb0IsQ0FBQztZQUNwQixLQUFLLEVBQUUsU0FBUztZQUNoQixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVixzQkFBc0I7Z0JBQ3RCLDBEQUEwRDtnQkFDMUQsd0JBQXdCO2dCQUN4Qiw4QkFBOEI7Z0JBQzlCLGlLQUE2QixrQkFBb0I7YUFDbEQ7U0FDRixDQUFDOzs7O29EQTJDRDtJQUNILHlCQUFDO0NBQUEsQUF6REQsQ0FBd0MsWUFBWSxHQXlEbkQ7U0F6RFksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyB1dGlscywgY29uc3RhbnRzLCBoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgSUxvZ2luU3RhdGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2F1dGgnO1xuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IExPR0lOVFlQRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBldmVudEJ1cywgRVZFTlRTLCBMb2dpblN0YXRlIH0gZnJvbSAnLi4nO1xuXG5jb25zdCB7IEVSUk9SUywgQ09NTVVOSVRZX1NJVEVfVVJMIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IGlzU3RyaW5nIH0gPSB1dGlscztcbmNvbnN0IHsgY2F0Y2hFcnJvcnNEZWNvcmF0b3IsIHN0b3BBdXRoTG9naW5XaXRoT0F1dGggfSA9IGhlbHBlcnM7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21BdXRoUHJvdmlkZXIgZXh0ZW5kcyBBdXRoUHJvdmlkZXIge1xuXG4gIEBzdG9wQXV0aExvZ2luV2l0aE9BdXRoKClcbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iHquWumuS5ieeZu+W9leWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOW9k+WJjeeOr+Wig+aYr+WQpuW8gOWQr+S6huiHquWumuS5ieeZu+W9lScsXG4gICAgICAnICAyIC0g6LCD55SoIGF1dGgoKS5jdXN0b21BdXRoUHJvdmlkZXIoKS5zaWduSW4oKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMyAtIHRpY2tldCDmmK/lkKblvZLlsZ7kuo7lvZPliY3njq/looMnLFxuICAgICAgJyAgNCAtIOWIm+W7uiB0aWNrZXQg55qE6Ieq5a6a5LmJ55m75b2V56eB6ZKl5piv5ZCm6L+H5pyfJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgc2lnbkluKHRpY2tldDogc3RyaW5nKTogUHJvbWlzZTxJTG9naW5TdGF0ZT4ge1xuICAgIGlmICghaXNTdHJpbmcodGlja2V0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICBtc2c6ICd0aWNrZXQgbXVzdCBiZSBhIHN0cmluZydcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgY29uc3QgeyByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnNpZ25JbldpdGhUaWNrZXQnLCB7XG4gICAgICB0aWNrZXQsXG4gICAgICByZWZyZXNoX3Rva2VuOiBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKHJlZnJlc2hUb2tlbktleSkgfHwgJydcbiAgICB9KTtcbiAgICBpZiAocmVzLnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgIC8vIOS/neWtmOaWsHJlZnJlc2ggdG9rZW7lubbkuJTliLfmlrBhY2Nlc3MgdG9rZW5cbiAgICAgIGF3YWl0IHRoaXMuc2V0UmVmcmVzaFRva2VuKHJlcy5yZWZyZXNoX3Rva2VuKTtcbiAgICAgIGF3YWl0IHRoaXMuX3JlcXVlc3QucmVmcmVzaEFjY2Vzc1Rva2VuKCk7XG5cbiAgICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCwge1xuICAgICAgICBlbnY6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGxvZ2luVHlwZTogTE9HSU5UWVBFLkNVU1RPTSxcbiAgICAgICAgcGVyc2lzdGVuY2U6IHRoaXMuX2NvbmZpZy5wZXJzaXN0ZW5jZVxuICAgICAgfSk7XG5cbiAgICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1NUQVRFX0NIQU5HRUQpO1xuXG4gICAgICAvLyBzZXQgdXNlciBpbmZvXG4gICAgICBhd2FpdCB0aGlzLnJlZnJlc2hVc2VySW5mbygpO1xuXG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IGxvZ2luU3RhdGUuY2hlY2tMb2NhbFN0YXRlQXN5bmMoKTtcblxuICAgICAgcmV0dXJuIGxvZ2luU3RhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5PUEVSQVRJT05fRkFJTCxcbiAgICAgICAgbXNnOiAnY3VzdG9tIHNpZ25JbiBmYWlsZWQnXG4gICAgICB9KSk7XG4gICAgfVxuICB9XG59Il19