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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcm92aWRlcnMvYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSx3QkFBZ0M7QUFFaEM7SUFLRSxzQkFBWSxNQUE4RTtRQUN4RixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2pDLENBQUM7SUFJZSwyQ0FBb0IsR0FBcEM7Ozs7Ozt3QkFDUSxLQUEyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBekQsY0FBYyxvQkFBQSxFQUFFLG9CQUFvQiwwQkFBQSxDQUFzQjt3QkFDOUMsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsRUFBQTs7d0JBQTdELFdBQVcsR0FBRyxTQUErQzt3QkFDekMsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFBOzt3QkFBekUsaUJBQWlCLEdBQUcsU0FBcUQ7NkJBRTNFLFdBQVcsRUFBWCxjQUFXOzZCQUNULENBQUEsaUJBQWlCLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBLEVBQW5ELGNBQW1EO3dCQUUvQyxVQUFVLEdBQUcsSUFBSSxjQUFVLENBQUM7NEJBQ2hDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7NEJBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTs0QkFDbEIsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRO3lCQUN2QixDQUFDLENBQUM7d0JBQ0gsV0FBTSxVQUFVLENBQUMsb0JBQW9CLEVBQUUsRUFBQTs7d0JBQXZDLFNBQXVDLENBQUM7d0JBRXhDLFdBQU8sVUFBVSxFQUFDOzs7OztLQU92QjtJQUNlLHNDQUFlLEdBQS9CLFVBQWdDLFlBQW1COzs7Ozs7d0JBQzNDLEtBQTRELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUExRSxjQUFjLG9CQUFBLEVBQUUsb0JBQW9CLDBCQUFBLEVBQUUsZUFBZSxxQkFBQSxDQUFzQjt3QkFFbkYsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxFQUFBOzt3QkFBbEQsU0FBa0QsQ0FBQzt3QkFDbkQsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLEVBQUE7O3dCQUF4RCxTQUF3RCxDQUFDO3dCQUN6RCxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsRUFBQTs7d0JBQTlELFNBQThELENBQUM7Ozs7O0tBQ2hFO0lBQ2UscUNBQWMsR0FBOUIsVUFBK0IsV0FBa0IsRUFBRSxpQkFBd0I7Ozs7Ozt3QkFDbkUsS0FBMkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQXpELGNBQWMsb0JBQUEsRUFBRSxvQkFBb0IsMEJBQUEsQ0FBc0I7d0JBQ2xFLFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxFQUFBOzt3QkFBNUQsU0FBNEQsQ0FBQzt3QkFDN0QsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsRUFBRSxpQkFBaUIsQ0FBQyxFQUFBOzt3QkFBeEUsU0FBd0UsQ0FBQzs7Ozs7S0FDMUU7SUFDZSxzQ0FBZSxHQUEvQjs7Ozs7O3dCQUNRLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQzt3QkFDUCxXQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBQTs7d0JBQWpELFFBQVEsR0FBSyxDQUFBLFNBQW9DLENBQUEsS0FBekM7d0JBQ3RCLFdBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUFBOzt3QkFBckMsU0FBcUMsQ0FBQzt3QkFDdEMsV0FBTyxRQUFRLEVBQUM7Ozs7S0FDakI7SUFDZSx1Q0FBZ0IsR0FBaEMsVUFBaUMsUUFBUTs7Ozs7O3dCQUMvQixXQUFXLEdBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFlBQXJCLENBQXNCO3dCQUN6QyxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBQTs7d0JBQXRELFNBQXNELENBQUM7Ozs7O0tBQ3hEO0lBRUgsbUJBQUM7QUFBRCxDQUFDLEFBM0RELElBMkRDO0FBM0RxQixvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbG91ZGJhc2VDb25maWcgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcbmltcG9ydCB7IElDbG91ZGJhc2VDYWNoZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY2FjaGUnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZVJlcXVlc3QgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL3JlcXVlc3QnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUF1dGhDb25maWcgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2F1dGgnO1xuaW1wb3J0IHsgTG9naW5TdGF0ZSB9IGZyb20gJy4uJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEF1dGhQcm92aWRlciB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfY29uZmlnOiBJQ2xvdWRiYXNlQ29uZmlnO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2NhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG4gIHByb3RlY3RlZCByZWFkb25seSBfcmVxdWVzdDogSUNsb3VkYmFzZVJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJQ2xvdWRiYXNlQXV0aENvbmZpZyZ7Y2FjaGU6SUNsb3VkYmFzZUNhY2hlLHJlcXVlc3Q6SUNsb3VkYmFzZVJlcXVlc3R9KSB7XG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICAgIHRoaXMuX2NhY2hlID0gY29uZmlnLmNhY2hlO1xuICAgIHRoaXMuX3JlcXVlc3QgPSBjb25maWcucmVxdWVzdDtcbiAgfVxuICAvKipcbiAgICog5Yik5pat5pys5Zyw5piv5ZCm5bey57uP5pyJ55m75b2V5oCB77yM5aaC5p6c5pyJ5LiU5rKh6L+H5pyf77yM5YiZ6L+U5ZuedHJ1Ze+8jOWQpuWImea4heeQhuacrOWcsOeZu+W9leaAgVxuICAgKi9cbiAgcHJvdGVjdGVkIGFzeW5jIGNoZWNrTG9jYWxMb2dpblN0YXRlKCkge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuRXhwaXJlS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYXdhaXQgdGhpcy5fY2FjaGUuZ2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgY29uc3QgYWNjZXNzVG9rZW5FeHBpcmUgPSBhd2FpdCB0aGlzLl9jYWNoZS5nZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5KTtcblxuICAgIGlmIChhY2Nlc3NUb2tlbikge1xuICAgICAgaWYgKGFjY2Vzc1Rva2VuRXhwaXJlICYmIGFjY2Vzc1Rva2VuRXhwaXJlID4gRGF0ZS5ub3coKSkge1xuICAgICAgICAvLyBhY2Nlc3PlrZjlnKjkuJTmsqHmnInov4fmnJ/vvIzpgqPkuYjnm7TmjqXov5Tlm55cbiAgICAgICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgICAgICBlbnZJZDogdGhpcy5fY29uZmlnLmVudixcbiAgICAgICAgICBjYWNoZTogdGhpcy5fY2FjaGUsXG4gICAgICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgbG9naW5TdGF0ZS5jaGVja0xvY2FsU3RhdGVBc3luYygpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGxvZ2luU3RhdGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhY2Nlc3MgdG9rZW7lrZjlnKjkvYbmmK/ov4fmnJ/kuobvvIzpgqPkuYjliKDpmaTmjonph43mlrDmi4lcbiAgICAgICAgLy8gYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgICAgIC8vIGF3YWl0IHRoaXMuX2NhY2hlLnJlbW92ZVN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBwcm90ZWN0ZWQgYXN5bmMgc2V0UmVmcmVzaFRva2VuKHJlZnJlc2hUb2tlbjpzdHJpbmcpIHtcbiAgICBjb25zdCB7IGFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbkV4cGlyZUtleSwgcmVmcmVzaFRva2VuS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIC8vIHJlZnJlc2ggdG9rZW7orr7nva7liY3vvIzlhYjmuIXmjokgYWNjZXNzIHRva2VuXG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUucmVtb3ZlU3RvcmVBc3luYyhhY2Nlc3NUb2tlbkV4cGlyZUtleSk7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXksIHJlZnJlc2hUb2tlbik7XG4gIH1cbiAgcHJvdGVjdGVkIGFzeW5jIHNldEFjY2Vzc1Rva2VuKGFjY2Vzc1Rva2VuOnN0cmluZywgYWNjZXNzVG9rZW5FeHBpcmU6c3RyaW5nKSB7XG4gICAgY29uc3QgeyBhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW5FeHBpcmVLZXkgfSA9IHRoaXMuX2NhY2hlLmtleXM7XG4gICAgYXdhaXQgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhhY2Nlc3NUb2tlbktleSwgYWNjZXNzVG9rZW4pO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmMoYWNjZXNzVG9rZW5FeHBpcmVLZXksIGFjY2Vzc1Rva2VuRXhwaXJlKTtcbiAgfVxuICBwcm90ZWN0ZWQgYXN5bmMgcmVmcmVzaFVzZXJJbmZvKCkge1xuICAgIGNvbnN0IGFjdGlvbiA9ICdhdXRoLmdldFVzZXJJbmZvJztcbiAgICBjb25zdCB7IGRhdGE6IHVzZXJJbmZvIH0gPSBhd2FpdCB0aGlzLl9yZXF1ZXN0LnNlbmQoYWN0aW9uLCB7fSk7XG4gICAgYXdhaXQgdGhpcy5zZXRMb2NhbFVzZXJJbmZvKHVzZXJJbmZvKTtcbiAgICByZXR1cm4gdXNlckluZm87XG4gIH1cbiAgcHJvdGVjdGVkIGFzeW5jIHNldExvY2FsVXNlckluZm8odXNlckluZm8pIHtcbiAgICBjb25zdCB7IHVzZXJJbmZvS2V5IH0gPSB0aGlzLl9jYWNoZS5rZXlzO1xuICAgIGF3YWl0IHRoaXMuX2NhY2hlLnNldFN0b3JlQXN5bmModXNlckluZm9LZXksIHVzZXJJbmZvKTtcbiAgfVxuICBhYnN0cmFjdCBzaWduSW4oLi4uYXJnczphbnlbXSk6UHJvbWlzZTxhbnk+O1xufSJdfQ==