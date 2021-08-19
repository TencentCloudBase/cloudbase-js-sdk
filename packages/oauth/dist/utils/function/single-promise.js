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
exports.SinglePromise = void 0;
var SinglePromise = (function () {
    function SinglePromise() {
        this._fnPromiseMap = new Map();
    }
    SinglePromise.prototype.run = function (key, fn) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                result = this._fnPromiseMap.get(key);
                if (!result) {
                    result = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var fnResult, _a, error_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 3, 4, 5]);
                                    return [4, this._runIdlePromise()];
                                case 1:
                                    _b.sent();
                                    fnResult = fn();
                                    _a = resolve;
                                    return [4, fnResult];
                                case 2:
                                    _a.apply(void 0, [_b.sent()]);
                                    return [3, 5];
                                case 3:
                                    error_1 = _b.sent();
                                    reject(error_1);
                                    return [3, 5];
                                case 4:
                                    this._fnPromiseMap.delete(key);
                                    return [7];
                                case 5: return [2];
                            }
                        });
                    }); });
                    this._fnPromiseMap.set(key, result);
                }
                return [2, result];
            });
        });
    };
    SinglePromise.prototype._runIdlePromise = function () {
        return Promise.resolve();
    };
    return SinglePromise;
}());
exports.SinglePromise = SinglePromise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlLXByb21pc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZnVuY3Rpb24vc2luZ2xlLXByb21pc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7SUFBQTtRQW1DVSxrQkFBYSxHQUE4QixJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQy9ELENBQUM7SUE3Qk8sMkJBQUcsR0FBVCxVQUFhLEdBQVcsRUFBRSxFQUFvQjs7Ozs7Z0JBQ3hDLE1BQU0sR0FBaUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ1gsTUFBTSxHQUFHLElBQUksT0FBTyxDQUFNLFVBQU8sT0FBTyxFQUFFLE1BQU07Ozs7OztvQ0FJNUMsV0FBTSxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUE7O29DQUE1QixTQUE0QixDQUFDO29DQUN2QixRQUFRLEdBQWUsRUFBRSxFQUFFLENBQUM7b0NBQ2xDLEtBQUEsT0FBTyxDQUFBO29DQUFDLFdBQU0sUUFBUSxFQUFBOztvQ0FBdEIsa0JBQVEsU0FBYyxFQUFDLENBQUM7Ozs7b0NBRXhCLE1BQU0sQ0FBQyxPQUFLLENBQUMsQ0FBQzs7O29DQUVkLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozt5QkFFbEMsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDckM7Z0JBQ0QsV0FBTyxNQUFNLEVBQUM7OztLQUNmO0lBS08sdUNBQWUsR0FBdkI7UUFDRSxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBR0gsb0JBQUM7QUFBRCxDQUFDLEFBcENELElBb0NDO0FBcENZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTaW5nbGUgUHJvbWlzZVxuICovXG5leHBvcnQgY2xhc3MgU2luZ2xlUHJvbWlzZSB7XG4gIC8qKlxuICogUnVuIHNpbmdsZSBwcm9taXNlLlxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1Byb21pc2U8VD59XG4gKi9cbiAgYXN5bmMgcnVuPFQ+KGtleTogc3RyaW5nLCBmbjogKCkgPT4gUHJvbWlzZTxUPik6IFByb21pc2U8VD4ge1xuICAgIGxldCByZXN1bHQ6IFByb21pc2U8YW55PiA9IHRoaXMuX2ZuUHJvbWlzZU1hcC5nZXQoa2V5KTtcbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmVzdWx0ID0gbmV3IFByb21pc2U8YW55Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhlIGlkbGUgcHJvbWlzZSBtdXN0IGJlIHJ1biB0byBwcmV2ZW50IF9mblByb21pc2VNYXAgZnJvbVxuICAgICAgICAgIC8vIHN0b3JpbmcgdGhlIGN1cnJlbnQgcHJvbWlzZSBmdW5jdGlvbi5cbiAgICAgICAgICBhd2FpdCB0aGlzLl9ydW5JZGxlUHJvbWlzZSgpO1xuICAgICAgICAgIGNvbnN0IGZuUmVzdWx0OiBQcm9taXNlPFQ+ID0gZm4oKTtcbiAgICAgICAgICByZXNvbHZlKGF3YWl0IGZuUmVzdWx0KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIHRoaXMuX2ZuUHJvbWlzZU1hcC5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLl9mblByb21pc2VNYXAuc2V0KGtleSwgcmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICAvKipcbiAqIFJ1biBpZGxlIHByb21pc2UuXG4gKiBAcmV0dXJuIHtQcm9taXNlPHZvaWQ+fVxuICovXG4gIHByaXZhdGUgX3J1bklkbGVQcm9taXNlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZuUHJvbWlzZU1hcDogTWFwPHN0cmluZywgUHJvbWlzZTxhbnk+PiA9IG5ldyBNYXAoKTtcbn1cbiJdfQ==