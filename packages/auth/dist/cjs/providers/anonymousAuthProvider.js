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
exports.AnonymousAuthProvider = void 0;
var base_1 = require("./base");
var utilities_1 = require("@cloudbase/utilities");
var constants_1 = require("../constants");
var __1 = require("..");
var ERRORS = utilities_1.constants.ERRORS, COMMUNITY_SITE_URL = utilities_1.constants.COMMUNITY_SITE_URL;
var throwError = utilities_1.utils.throwError, isString = utilities_1.utils.isString;
var addEventListener = utilities_1.events.addEventListener;
var catchErrorsDecorator = utilities_1.helpers.catchErrorsDecorator;
var AnonymousAuthProvider = (function (_super) {
    __extends(AnonymousAuthProvider, _super);
    function AnonymousAuthProvider(config) {
        var _this = _super.call(this, config) || this;
        _this._onConverted = _this._onConverted.bind(_this);
        addEventListener(__1.EVENTS.ANONYMOUS_CONVERTED, _this._onConverted);
        return _this;
    }
    AnonymousAuthProvider.prototype.signIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, anonymousUuidKey, refreshTokenKey, anonymous_uuid, refresh_token, res, loginState;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this._cache.updatePersistenceAsync('local')];
                    case 1:
                        _b.sent();
                        _a = this._cache.keys, anonymousUuidKey = _a.anonymousUuidKey, refreshTokenKey = _a.refreshTokenKey;
                        return [4, this._cache.getStoreAsync(anonymousUuidKey)];
                    case 2:
                        anonymous_uuid = _b.sent();
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 3:
                        refresh_token = _b.sent();
                        return [4, this._request.send('auth.signInAnonymously', {
                                anonymous_uuid: anonymous_uuid,
                                refresh_token: refresh_token
                            })];
                    case 4:
                        res = _b.sent();
                        if (!(res.uuid && res.refresh_token)) return [3, 10];
                        return [4, this._setAnonymousUUID(res.uuid)];
                    case 5:
                        _b.sent();
                        return [4, this.setRefreshToken(res.refresh_token)];
                    case 6:
                        _b.sent();
                        return [4, this._request.refreshAccessToken()];
                    case 7:
                        _b.sent();
                        __1.eventBus.fire(__1.EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this._config.env,
                            loginType: constants_1.LOGINTYPE.ANONYMOUS,
                            persistence: 'local'
                        });
                        __1.eventBus.fire(__1.EVENTS.LOGIN_STATE_CHANGED);
                        loginState = new __1.LoginState({
                            envId: this._config.env,
                            cache: this._cache,
                            request: this._request
                        });
                        return [4, loginState.checkLocalStateAsync()];
                    case 8:
                        _b.sent();
                        return [4, loginState.user.refresh()];
                    case 9:
                        _b.sent();
                        return [2, loginState];
                    case 10: throw new Error(JSON.stringify({
                        code: ERRORS.OPERATION_FAIL,
                        msg: JSON.stringify(res) || 'anonymous signIn failed'
                    }));
                }
            });
        });
    };
    AnonymousAuthProvider.prototype.linkAndRetrieveDataWithTicket = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, anonymousUuidKey, refreshTokenKey, anonymous_uuid, refresh_token, res, loginState;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!isString(ticket)) {
                            throwError(ERRORS.INVALID_PARAMS, 'ticket must be a string');
                        }
                        _a = this._cache.keys, anonymousUuidKey = _a.anonymousUuidKey, refreshTokenKey = _a.refreshTokenKey;
                        return [4, this._cache.getStoreAsync(anonymousUuidKey)];
                    case 1:
                        anonymous_uuid = _b.sent();
                        return [4, this._cache.getStoreAsync(refreshTokenKey)];
                    case 2:
                        refresh_token = _b.sent();
                        return [4, this._request.send('auth.linkAndRetrieveDataWithTicket', {
                                anonymous_uuid: anonymous_uuid,
                                refresh_token: refresh_token,
                                ticket: ticket
                            })];
                    case 3:
                        res = _b.sent();
                        if (!res.refresh_token) return [3, 8];
                        return [4, this._clearAnonymousUUID()];
                    case 4:
                        _b.sent();
                        return [4, this.setRefreshToken(res.refresh_token)];
                    case 5:
                        _b.sent();
                        return [4, this._request.refreshAccessToken()];
                    case 6:
                        _b.sent();
                        __1.eventBus.fire(__1.EVENTS.ANONYMOUS_CONVERTED, { env: this._config.env });
                        __1.eventBus.fire(__1.EVENTS.LOGIN_TYPE_CHANGED, { loginType: constants_1.LOGINTYPE.CUSTOM, persistence: 'local' });
                        loginState = new __1.LoginState({
                            envId: this._config.env,
                            cache: this._cache,
                            request: this._request
                        });
                        return [4, loginState.checkLocalStateAsync()];
                    case 7:
                        _b.sent();
                        return [2, loginState];
                    case 8:
                        throwError(ERRORS.OPERATION_FAIL, JSON.stringify(res) || 'linkAndRetrieveDataWithTicket failed');
                        _b.label = 9;
                    case 9: return [2];
                }
            });
        });
    };
    AnonymousAuthProvider.prototype._setAnonymousUUID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, anonymousUuidKey, loginTypeKey;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._cache.keys, anonymousUuidKey = _a.anonymousUuidKey, loginTypeKey = _a.loginTypeKey;
                        return [4, this._cache.removeStoreAsync(anonymousUuidKey)];
                    case 1:
                        _b.sent();
                        return [4, this._cache.setStoreAsync(anonymousUuidKey, id)];
                    case 2:
                        _b.sent();
                        return [4, this._cache.setStoreAsync(loginTypeKey, constants_1.LOGINTYPE.ANONYMOUS)];
                    case 3:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    AnonymousAuthProvider.prototype._clearAnonymousUUID = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._cache.removeStoreAsync(this._cache.keys.anonymousUuidKey)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    AnonymousAuthProvider.prototype._onConverted = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var env;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        env = ev.data.env;
                        if (env !== this._config.env) {
                            return [2];
                        }
                        return [4, this._cache.updatePersistenceAsync(this._config.persistence)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    __decorate([
        catchErrorsDecorator({
            title: '匿名登录失败',
            messages: [
                '请确认以下各项：',
                '  1 - 当前环境是否开启了匿名登录',
                '  2 - 调用 auth().anonymouseProvider().signIn() 的语法或参数是否正确',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], AnonymousAuthProvider.prototype, "signIn", null);
    return AnonymousAuthProvider;
}(base_1.AuthProvider));
exports.AnonymousAuthProvider = AnonymousAuthProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5vbnltb3VzQXV0aFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy9hbm9ueW1vdXNBdXRoUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUFzQztBQUV0QyxrREFBeUU7QUFHekUsMENBQXlDO0FBQ3pDLHdCQUFrRDtBQUUxQyxJQUFBLE1BQU0sR0FBeUIscUJBQVMsT0FBbEMsRUFBRSxrQkFBa0IsR0FBSyxxQkFBUyxtQkFBZCxDQUFlO0FBQ3pDLElBQUEsVUFBVSxHQUFlLGlCQUFLLFdBQXBCLEVBQUUsUUFBUSxHQUFLLGlCQUFLLFNBQVYsQ0FBVztBQUMvQixJQUFBLGdCQUFnQixHQUFLLGtCQUFNLGlCQUFYLENBQVk7QUFDNUIsSUFBQSxvQkFBb0IsR0FBSyxtQkFBTyxxQkFBWixDQUFhO0FBRXpDO0lBQTJDLHlDQUFZO0lBQ3JELCtCQUFZLE1BQTZFO1FBQXpGLFlBQ0Usa0JBQU0sTUFBTSxDQUFDLFNBS2Q7UUFIQyxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO1FBRWpELGdCQUFnQixDQUFDLFVBQU0sQ0FBQyxtQkFBbUIsRUFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7O0lBQ2xFLENBQUM7SUFXWSxzQ0FBTSxHQUFuQjs7Ozs7NEJBRUUsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxFQUFBOzt3QkFBakQsU0FBaUQsQ0FBQzt3QkFDNUMsS0FBd0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQXRELGdCQUFnQixzQkFBQSxFQUFFLGVBQWUscUJBQUEsQ0FBc0I7d0JBRXhDLFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFh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QyxFQUFBOzt3QkFBcEQsU0FBb0QsQ0FBQzt3QkFDckQsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsRUFBQTs7d0JBQXJELFNBQXFELENBQUM7d0JBQ3RELFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLHFCQUFTLENBQUMsU0FBUyxDQUFDLEVBQUE7O3dCQUFsRSxTQUFrRSxDQUFDOzs7OztLQUNwRTtJQUNhLG1EQUFtQixHQUFqQzs7Ozs0QkFDRSxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBQTs7d0JBQXJFLFNBQXFFLENBQUM7Ozs7O0tBQ3ZFO0lBQ2EsNENBQVksR0FBMUIsVUFBMkIsRUFBRTs7Ozs7O3dCQUNuQixHQUFHLEdBQUssRUFBRSxDQUFDLElBQUksSUFBWixDQUFhO3dCQUN4QixJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTs0QkFDNUIsV0FBTzt5QkFDUjt3QkFFRCxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBQTs7d0JBQWxFLFNBQWtFLENBQUM7Ozs7O0tBQ3BFO0lBNUZEO1FBVEMsb0JBQW9CLENBQUM7WUFDcEIsS0FBSyxFQUFFLFFBQVE7WUFDZixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVixxQkFBcUI7Z0JBQ3JCLDBEQUEwRDtnQkFDMUQsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7dURBeUNEO0lBcURILDRCQUFDO0NBQUEsQUEvR0QsQ0FBMkMsbUJBQVksR0ErR3REO0FBL0dZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQXV0aENvbmZpZywgSUxvZ2luU3RhdGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2F1dGgnO1xuaW1wb3J0IHsgY29uc3RhbnRzLCB1dGlscywgaGVscGVycywgZXZlbnRzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNhY2hlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlUmVxdWVzdCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVxdWVzdCc7XG5pbXBvcnQgeyBMT0dJTlRZUEUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgRVZFTlRTLCBldmVudEJ1cywgTG9naW5TdGF0ZSB9IGZyb20gJy4uJztcblxuY29uc3QgeyBFUlJPUlMsIENPTU1VTklUWV9TSVRFX1VSTCB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyB0aHJvd0Vycm9yLCBpc1N0cmluZyB9ID0gdXRpbHM7XG5jb25zdCB7IGFkZEV2ZW50TGlzdGVuZXIgfSA9IGV2ZW50cztcbmNvbnN0IHsgY2F0Y2hFcnJvcnNEZWNvcmF0b3IgfSA9IGhlbHBlcnM7XG5cbmV4cG9ydCBjbGFzcyBBbm9ueW1vdXNBdXRoUHJvdmlkZXIgZXh0ZW5kcyBBdXRoUHJvdmlkZXIge1xuICBjb25zdHJ1Y3Rvcihjb25maWc6SUNsb3VkYmFzZUF1dGhDb25maWcme2NhY2hlOklDbG91ZGJhc2VDYWNoZSxyZXF1ZXN0OklDbG91ZGJhc2VSZXF1ZXN0fSl7XG4gICAgc3VwZXIoY29uZmlnKTtcblxuICAgIHRoaXMuX29uQ29udmVydGVkID0gdGhpcy5fb25Db252ZXJ0ZWQuYmluZCh0aGlzKTtcbiAgICAvLyDnm5HlkKzovazmraPkuovku7ZcbiAgICBhZGRFdmVudExpc3RlbmVyKEVWRU5UUy5BTk9OWU1PVVNfQ09OVkVSVEVELCB0aGlzLl9vbkNvbnZlcnRlZCk7XG4gIH1cblxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn5Yy/5ZCN55m75b2V5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g5b2T5YmN546v5aKD5piv5ZCm5byA5ZCv5LqG5Yy/5ZCN55m75b2VJyxcbiAgICAgICcgIDIgLSDosIPnlKggYXV0aCgpLmFub255bW91c2VQcm92aWRlcigpLnNpZ25JbigpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHNpZ25JbigpOlByb21pc2U8SUxvZ2luU3RhdGU+IHtcbiAgICAvLyDljL/lkI3nmbvlvZXliY3ov4Hnp7tjYWNoZeWIsGxvY2Fsc3RvcmFnZVxuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnVwZGF0ZVBlcnNpc3RlbmNlQXN5bmMoJ2xvY2FsJyk7XG4gICAgY29uc3QgeyBhbm9ueW1vdXNVdWlkS2V5LCByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgLy8g5aaC5p6c5pys5Zyw5a2Y5pyJdWlk5YiZ5Yy/5ZCN55m75b2V5pe25Lyg57uZc2VydmVyXG4gICAgY29uc3QgYW5vbnltb3VzX3V1aWQgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFub255bW91c1V1aWRLZXkpO1xuICAgIC8vIOatpOWkhGNhY2hl5Li65Z+657G7cHJvcGVydHlcbiAgICBjb25zdCByZWZyZXNoX3Rva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXkpO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxdWVzdC5zZW5kKCdhdXRoLnNpZ25JbkFub255bW91c2x5Jywge1xuICAgICAgYW5vbnltb3VzX3V1aWQsXG4gICAgICByZWZyZXNoX3Rva2VuXG4gICAgfSk7XG4gICAgaWYgKHJlcy51dWlkICYmIHJlcy5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICBhd2FpdCB0aGlzLl9zZXRBbm9ueW1vdXNVVUlEKHJlcy51dWlkKTtcbiAgICAgIGF3YWl0IHRoaXMuc2V0UmVmcmVzaFRva2VuKHJlcy5yZWZyZXNoX3Rva2VuKTtcbiAgICAgIGF3YWl0IHRoaXMuX3JlcXVlc3QucmVmcmVzaEFjY2Vzc1Rva2VuKCk7XG5cbiAgICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkxPR0lOX1RZUEVfQ0hBTkdFRCwge1xuICAgICAgICBlbnY6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGxvZ2luVHlwZTogTE9HSU5UWVBFLkFOT05ZTU9VUyxcbiAgICAgICAgcGVyc2lzdGVuY2U6ICdsb2NhbCdcbiAgICAgIH0pO1xuXG4gICAgICBldmVudEJ1cy5maXJlKEVWRU5UUy5MT0dJTl9TVEFURV9DSEFOR0VEKTtcblxuICAgICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgICAgZW52SWQ6IHRoaXMuX2NvbmZpZy5lbnYsXG4gICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBsb2dpblN0YXRlLmNoZWNrTG9jYWxTdGF0ZUFzeW5jKCk7XG4gICAgICBhd2FpdCBsb2dpblN0YXRlLnVzZXIucmVmcmVzaCgpO1xuICAgICAgcmV0dXJuIGxvZ2luU3RhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5PUEVSQVRJT05fRkFJTCxcbiAgICAgICAgbXNnOiBKU09OLnN0cmluZ2lmeShyZXMpfHwnYW5vbnltb3VzIHNpZ25JbiBmYWlsZWQnXG4gICAgICB9KSk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDljL/lkI3ovazmraNcbiAgICogQHBhcmFtIHRpY2tldCBcbiAgICovXG4gIHB1YmxpYyBhc3luYyBsaW5rQW5kUmV0cmlldmVEYXRhV2l0aFRpY2tldCh0aWNrZXQ6IHN0cmluZyk6UHJvbWlzZTxJTG9naW5TdGF0ZT4ge1xuICAgIGlmKCFpc1N0cmluZyh0aWNrZXQpKXtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLklOVkFMSURfUEFSQU1TLCd0aWNrZXQgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cbiAgICBjb25zdCB7IGFub255bW91c1V1aWRLZXksIHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICBjb25zdCBhbm9ueW1vdXNfdXVpZCA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYW5vbnltb3VzVXVpZEtleSk7XG4gICAgY29uc3QgcmVmcmVzaF90b2tlbiA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5KTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoJ2F1dGgubGlua0FuZFJldHJpZXZlRGF0YVdpdGhUaWNrZXQnLCB7XG4gICAgICBhbm9ueW1vdXNfdXVpZCxcbiAgICAgIHJlZnJlc2hfdG9rZW4sXG4gICAgICB0aWNrZXRcbiAgICB9KTtcbiAgICBpZiAocmVzLnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgIC8vIOi9rOato+WQjua4hemZpOacrOWcsOS/neWtmOeahOWMv+WQjXV1aWRcbiAgICAgIGF3YWl0IHRoaXMuX2NsZWFyQW5vbnltb3VzVVVJRCgpO1xuICAgICAgYXdhaXQgdGhpcy5zZXRSZWZyZXNoVG9rZW4ocmVzLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgYXdhaXQgdGhpcy5fcmVxdWVzdC5yZWZyZXNoQWNjZXNzVG9rZW4oKTtcbiAgICAgIGV2ZW50QnVzLmZpcmUoRVZFTlRTLkFOT05ZTU9VU19DT05WRVJURUQsIHsgZW52OiB0aGlzLl9jb25maWcuZW52IH0pO1xuICAgICAgZXZlbnRCdXMuZmlyZShFVkVOVFMuTE9HSU5fVFlQRV9DSEFOR0VELCB7IGxvZ2luVHlwZTogTE9HSU5UWVBFLkNVU1RPTSwgcGVyc2lzdGVuY2U6ICdsb2NhbCcgfSk7XG4gICAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IGxvZ2luU3RhdGUuY2hlY2tMb2NhbFN0YXRlQXN5bmMoKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIGxvZ2luU3RhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93RXJyb3IoRVJST1JTLk9QRVJBVElPTl9GQUlMLEpTT04uc3RyaW5naWZ5KHJlcyl8fCdsaW5rQW5kUmV0cmlldmVEYXRhV2l0aFRpY2tldCBmYWlsZWQnKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBhc3luYyBfc2V0QW5vbnltb3VzVVVJRChpZDogc3RyaW5nKSB7XG4gICAgY29uc3QgeyBhbm9ueW1vdXNVdWlkS2V5LCBsb2dpblR5cGVLZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhbm9ueW1vdXNVdWlkS2V5KTtcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKGFub255bW91c1V1aWRLZXksIGlkKTtcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKGxvZ2luVHlwZUtleSwgTE9HSU5UWVBFLkFOT05ZTU9VUyk7XG4gIH1cbiAgcHJpdmF0ZSBhc3luYyBfY2xlYXJBbm9ueW1vdXNVVUlEKCkge1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmModGhpcy5fY2FjaGUua2V5cy5hbm9ueW1vdXNVdWlkS2V5KTtcbiAgfVxuICBwcml2YXRlIGFzeW5jIF9vbkNvbnZlcnRlZChldikge1xuICAgIGNvbnN0IHsgZW52IH0gPSBldi5kYXRhO1xuICAgIGlmIChlbnYgIT09IHRoaXMuX2NvbmZpZy5lbnYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8g5Yy/5ZCN6L2s5q2j5ZCO6L+B56e7Y2FjaGVcbiAgICBhd2FpdCB0aGlzLl9jYWNoZS51cGRhdGVQZXJzaXN0ZW5jZUFzeW5jKHRoaXMuX2NvbmZpZy5wZXJzaXN0ZW5jZSk7XG4gIH1cbn0iXX0=