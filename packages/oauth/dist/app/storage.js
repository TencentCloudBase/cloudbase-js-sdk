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
exports.DefaultStorage = void 0;
var DefaultStorage = (function () {
    function DefaultStorage(opts) {
        this._env = opts.env;
    }
    DefaultStorage.prototype.getItem = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, localStorage.getItem(key + this._env)];
            });
        });
    };
    DefaultStorage.prototype.removeItem = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, localStorage.removeItem(key + this._env)];
            });
        });
    };
    DefaultStorage.prototype.setItem = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, localStorage.setItem(key + this._env, value)];
            });
        });
    };
    return DefaultStorage;
}());
exports.DefaultStorage = DefaultStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvc3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkE7SUFHRSx3QkFBWSxJQUFvQjtRQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7SUFDdEIsQ0FBQztJQU1LLGdDQUFPLEdBQWIsVUFBYyxHQUFXOzs7Z0JBQ3ZCLFdBQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDOzs7S0FDOUM7SUFNSyxtQ0FBVSxHQUFoQixVQUFpQixHQUFXOzs7Z0JBQzFCLFdBQU8sWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDOzs7S0FDakQ7SUFPSyxnQ0FBTyxHQUFiLFVBQWMsR0FBVyxFQUFFLEtBQWE7OztnQkFDdEMsV0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFDOzs7S0FDckQ7SUFDSCxxQkFBQztBQUFELENBQUMsQUEvQkQsSUErQkM7QUEvQlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQW4gaW50ZXJmYWNlIG9mIHRoZSBTaW1wbGUgIFdlYiBTdG9yYWdlIEFQSSAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3RvcmFnZSB7XG4gIC8qKlxuICAgKiB2YWx1ZSA9IHN0b3JhZ2Vba2V5XVxuICAgKi9cbiAgZ2V0SXRlbTogKGtleTogc3RyaW5nKSA9PiBQcm9taXNlPHN0cmluZyB8IG51bGw+O1xuXG4gIC8qKlxuICAgKiBkZWxldGUgc3RvcmFnZVtrZXldXG4gICAqL1xuICByZW1vdmVJdGVtOiAoa2V5OiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIHN0b3JhZ2Vba2V5XSA9IHZhbHVlXG4gICAqL1xuICBzZXRJdGVtOiAoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD47XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBTdG9yYWdlT3B0aW9ucyB7XG4gIGVudjogc3RyaW5nO1xufVxuXG4vKipcbiAqIERlZmF1bHQgU3RvcmFnZS5cbiAqL1xuZXhwb3J0IGNsYXNzIERlZmF1bHRTdG9yYWdlIGltcGxlbWVudHMgU3RvcmFnZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2Vudjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKG9wdHM6IFN0b3JhZ2VPcHRpb25zKSB7XG4gICAgdGhpcy5fZW52ID0gb3B0cy5lbnZcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRlbS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgKi9cbiAgYXN5bmMgZ2V0SXRlbShrZXk6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkgKyB0aGlzLl9lbnYpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBpdGVtLlxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAqL1xuICBhc3luYyByZW1vdmVJdGVtKGtleTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSArIHRoaXMuX2Vudik7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGl0ZW0uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqL1xuICBhc3luYyBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSArIHRoaXMuX2VudiwgdmFsdWUpO1xuICB9XG59XG4iXX0=