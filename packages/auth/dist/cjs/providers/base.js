"use strict";
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
exports.AuthProvider = void 0;
var __1 = require("..");
var AuthProvider = (function () {
    function AuthProvider(config) {
        this._config = config;
        this._cache = config.cache;
        this._request = config.request;
        this._fromApp = config._fromApp;
    }
    AuthProvider.prototype.checkLocalLoginState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accessTokenKey, accessTokenExpireKey, accessToken, accessTokenExpire, loginState;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._cache.keys, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey;
                        return [4, this._cache.getStoreAsync(accessTokenKey)];
                    case 1:
                        accessToken = _b.sent();
                        return [4, this._cache.getStoreAsync(accessTokenExpireKey)];
                    case 2:
                        accessTokenExpire = _b.sent();
                        if (!accessToken) return [3, 4];
                        if (!(accessTokenExpire && accessTokenExpire > Date.now())) return [3, 4];
                        loginState = new __1.LoginState({
                            envId: this._config.env,
                            cache: this._cache,
                            request: this._request
                        });
                        return [4, loginState.checkLocalStateAsync()];
                    case 3:
                        _b.sent();
                        return [2, loginState];
                    case 4: return [2];
                }
            });
        });
    };
    AuthProvider.prototype.setRefreshToken = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accessTokenKey, accessTokenExpireKey, refreshTokenKey;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._cache.keys, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey, refreshTokenKey = _a.refreshTokenKey;
                        return [4, this._cache.removeStoreAsync(accessTokenKey)];
                    case 1:
                        _b.sent();
                        return [4, this._cache.removeStoreAsync(accessTokenExpireKey)];
                    case 2:
                        _b.sent();
                        return [4, this._cache.setStoreAsync(refreshTokenKey, refreshToken)];
                    case 3:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    AuthProvider.prototype.setAccessToken = function (accessToken, accessTokenExpire) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accessTokenKey, accessTokenExpireKey;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._cache.keys, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey;
                        return [4, this._cache.setStoreAsync(accessTokenKey, accessToken)];
                    case 1:
                        _b.sent();
                        return [4, this._cache.setStoreAsync(accessTokenExpireKey, accessTokenExpire)];
                    case 2:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    AuthProvider.prototype.refreshUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var action, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        action = 'auth.getUserInfo';
                        return [4, this._request.send(action, {})];
                    case 1:
                        userInfo = (_a.sent()).data;
                        return [4, this.setLocalUserInfo(userInfo)];
                    case 2:
                        _a.sent();
                        return [2, userInfo];
                }
            });
        });
    };
    AuthProvider.prototype.setLocalUserInfo = function (userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var userInfoKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInfoKey = this._cache.keys.userInfoKey;
                        return [4, this._cache.setStoreAsync(userInfoKey, userInfo)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return AuthProvider;
}());
exports.AuthProvider = AuthProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcm92aWRlcnMvYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSx3QkFBZ0M7QUFFaEM7SUFNRSxzQkFBWSxNQUFxRjtRQUMvRixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQTtJQUNqQyxDQUFDO0lBSWUsMkNBQW9CLEdBQXBDOzs7Ozs7d0JBQ1EsS0FBMkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQXpELGNBQWMsb0JBQUEsRUFBRSxvQkFBb0IsMEJBQUEsQ0FBc0I7d0JBQzlDLFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUE7O3dCQUE3RCxXQUFXLEdBQUcsU0FBK0M7d0JBQ3pDLFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsRUFBQTs7d0JBQXpFLGlCQUFpQixHQUFHLFNBQXFEOzZCQUUzRSxXQUFXLEVBQVgsY0FBVzs2QkFDVCxDQUFBLGlCQUFpQixJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQSxFQUFuRCxjQUFtRDt3QkFFL0MsVUFBVSxHQUFHLElBQUksY0FBVSxDQUFDOzRCQUNoQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzRCQUN2QixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07NEJBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUTt5QkFDdkIsQ0FBQyxDQUFDO3dCQUNILFdBQU0sVUFBVSxDQUFDLG9CQUFvQixFQUFFLEVBQUE7O3dCQUF2QyxTQUF1QyxDQUFDO3dCQUV4QyxXQUFPLFVBQVUsRUFBQzs7Ozs7S0FPdkI7SUFDZSxzQ0FBZSxHQUEvQixVQUFnQyxZQUFvQjs7Ozs7O3dCQUM1QyxLQUE0RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBMUUsY0FBYyxvQkFBQSxFQUFFLG9CQUFvQiwwQkFBQSxFQUFFLGVBQWUscUJBQUEsQ0FBc0I7d0JBRW5GLFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsRUFBQTs7d0JBQWxELFNBQWtELENBQUM7d0JBQ25ELFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFBOzt3QkFBeEQsU0FBd0QsQ0FBQzt3QkFDekQsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLEVBQUE7O3dCQUE5RCxTQUE4RCxDQUFDOzs7OztLQUNoRTtJQUNlLHFDQUFjLEdBQTlCLFVBQStCLFdBQW1CLEVBQUUsaUJBQXlCOzs7Ozs7d0JBQ3JFLEtBQTJDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUF6RCxjQUFjLG9CQUFBLEVBQUUsb0JBQW9CLDBCQUFBLENBQXNCO3dCQUNsRSxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsRUFBQTs7d0JBQTVELFNBQTRELENBQUM7d0JBQzdELFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsb0JBQW9CLEVBQUUsaUJBQWlCLENBQUMsRUFBQTs7d0JBQXhFLFNBQXdFLENBQUM7Ozs7O0tBQzFFO0lBQ2Usc0NBQWUsR0FBL0I7Ozs7Ozt3QkFDUSxNQUFNLEdBQUcsa0JBQWtCLENBQUM7d0JBQ1AsV0FBTSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUE7O3dCQUFqRCxRQUFRLEdBQUssQ0FBQSxTQUFvQyxDQUFBLEtBQXpDO3dCQUN0QixXQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsRUFBQTs7d0JBQXJDLFNBQXFDLENBQUM7d0JBQ3RDLFdBQU8sUUFBUSxFQUFDOzs7O0tBQ2pCO0lBQ2UsdUNBQWdCLEdBQWhDLFVBQWlDLFFBQVE7Ozs7Ozt3QkFDL0IsV0FBVyxHQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxZQUFyQixDQUFzQjt3QkFDekMsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUE7O3dCQUF0RCxTQUFzRCxDQUFDOzs7OztLQUN4RDtJQVlILG1CQUFDO0FBQUQsQ0FBQyxBQXZFRCxJQXVFQztBQXZFcUIsb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2xvdWRiYXNlQ29uZmlnLCBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ2FjaGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NhY2hlJztcbmltcG9ydCB7IElDbG91ZGJhc2VSZXF1ZXN0IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9yZXF1ZXN0JztcbmltcG9ydCB7IElDbG91ZGJhc2VBdXRoQ29uZmlnIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9hdXRoJztcbmltcG9ydCB7IExvZ2luU3RhdGUgfSBmcm9tICcuLic7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBdXRoUHJvdmlkZXIge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2NvbmZpZzogSUNsb3VkYmFzZUNvbmZpZztcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9jYWNoZTogSUNsb3VkYmFzZUNhY2hlO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3JlcXVlc3Q6IElDbG91ZGJhc2VSZXF1ZXN0O1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2Zyb21BcHA6IElDbG91ZGJhc2U7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJQ2xvdWRiYXNlQXV0aENvbmZpZyAmIHsgY2FjaGU6IElDbG91ZGJhc2VDYWNoZSwgcmVxdWVzdDogSUNsb3VkYmFzZVJlcXVlc3QgfSkge1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLl9jYWNoZSA9IGNvbmZpZy5jYWNoZTtcbiAgICB0aGlzLl9yZXF1ZXN0ID0gY29uZmlnLnJlcXVlc3Q7XG4gICAgdGhpcy5fZnJvbUFwcCA9IGNvbmZpZy5fZnJvbUFwcFxuICB9XG4gIC8qKlxuICAgKiDliKTmlq3mnKzlnLDmmK/lkKblt7Lnu4/mnInnmbvlvZXmgIHvvIzlpoLmnpzmnInkuJTmsqHov4fmnJ/vvIzliJnov5Tlm550cnVl77yM5ZCm5YiZ5riF55CG5pys5Zyw55m75b2V5oCBXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgY2hlY2tMb2NhbExvZ2luU3RhdGUoKSB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbkV4cGlyZSA9IGF3YWl0IHRoaXMuX2NhY2hlLmdldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpO1xuXG4gICAgaWYgKGFjY2Vzc1Rva2VuKSB7XG4gICAgICBpZiAoYWNjZXNzVG9rZW5FeHBpcmUgJiYgYWNjZXNzVG9rZW5FeHBpcmUgPiBEYXRlLm5vdygpKSB7XG4gICAgICAgIC8vIGFjY2Vzc+WtmOWcqOS4lOayoeaciei/h+acn++8jOmCo+S5iOebtOaOpei/lOWbnlxuICAgICAgICBjb25zdCBsb2dpblN0YXRlID0gbmV3IExvZ2luU3RhdGUoe1xuICAgICAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgICAgIGNhY2hlOiB0aGlzLl9jYWNoZSxcbiAgICAgICAgICByZXF1ZXN0OiB0aGlzLl9yZXF1ZXN0XG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCBsb2dpblN0YXRlLmNoZWNrTG9jYWxTdGF0ZUFzeW5jKCk7XG5cbiAgICAgICAgcmV0dXJuIGxvZ2luU3RhdGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhY2Nlc3MgdG9rZW7lrZjlnKjkvYbmmK/ov4fmnJ/kuobvvIzpgqPkuYjliKDpmaTmjonph43mlrDmi4lcbiAgICAgICAgLy8gYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgICAgIC8vIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBwcm90ZWN0ZWQgYXN5bmMgc2V0UmVmcmVzaFRva2VuKHJlZnJlc2hUb2tlbjogc3RyaW5nKSB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXksIHJlZnJlc2hUb2tlbktleSB9ID0gdGhpcy5fY2FjaGUua2V5cztcbiAgICAvLyByZWZyZXNoIHRva2Vu6K6+572u5YmN77yM5YWI5riF5o6JIGFjY2VzcyB0b2tlblxuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5LZXkpO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMocmVmcmVzaFRva2VuS2V5LCByZWZyZXNoVG9rZW4pO1xuICB9XG4gIHByb3RlY3RlZCBhc3luYyBzZXRBY2Nlc3NUb2tlbihhY2Nlc3NUb2tlbjogc3RyaW5nLCBhY2Nlc3NUb2tlbkV4cGlyZTogc3RyaW5nKSB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW4pO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXksIGFjY2Vzc1Rva2VuRXhwaXJlKTtcbiAgfVxuICBwcm90ZWN0ZWQgYXN5bmMgcmVmcmVzaFVzZXJJbmZvKCkge1xuICAgIGNvbnN0IGFjdGlvbiA9ICdhdXRoLmdldFVzZXJJbmZvJztcbiAgICBjb25zdCB7IGRhdGE6IHVzZXJJbmZvIH0gPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoYWN0aW9uLCB7fSk7XG4gICAgYXdhaXQgdGhpcy5zZXRMb2NhbFVzZXJJbmZvKHVzZXJJbmZvKTtcbiAgICByZXR1cm4gdXNlckluZm87XG4gIH1cbiAgcHJvdGVjdGVkIGFzeW5jIHNldExvY2FsVXNlckluZm8odXNlckluZm8pIHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmModXNlckluZm9LZXksIHVzZXJJbmZvKTtcbiAgfVxuXG4gIC8vIHByb3RlY3RlZCBhc3luYyBzdG9wQXV0aExvZ2luV2l0aE9hdXRoKCkge1xuICAvLyAgIGNvbnN0IHsgX2Zyb21BcHAgfSA9IHRoaXMuX2NvbmZpZ1xuICAvLyAgIGNvbnN0IGNoZWNrUmVzID0gYXdhaXQgY2hlY2tGcm9tQXV0aFYxT3JWMihfZnJvbUFwcClcbiAgLy8gICBjb25zdCB7IGF1dGhUeXBlIH0gPSBjaGVja1Jlc1xuICAvLyAgIGNvbnNvbGUubG9nKCdhdXRoVHlwZScsIGF1dGhUeXBlKVxuICAvLyAgIGlmIChhdXRoVHlwZSA9PT0gJ29hdXRoJykge1xuICAvLyAgICAgdGhyb3cgRXJyb3IoJ+W9k+WJjeW3suS9v+eUqCBvYXV0aCDnmbvlvZXvvIzor7fmiYvliqjpgIDlh7ogb2F1dGgg55m75b2V5ZCO5YaN6L+b6KGMIGF1dGgg55m75b2VJylcbiAgLy8gICB9XG4gIC8vIH1cbiAgYWJzdHJhY3Qgc2lnbkluKC4uLmFyZ3M6IGFueVtdKTogUHJvbWlzZTxhbnk+O1xufSJdfQ==