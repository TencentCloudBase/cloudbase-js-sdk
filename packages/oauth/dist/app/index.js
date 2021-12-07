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
exports.AppImpl = exports.initializeApp = void 0;
var request_1 = require("./request");
var openuri_1 = require("./openuri");
var storage_1 = require("./storage");
function initializeApp(options) {
    return new AppImpl(options);
}
exports.initializeApp = initializeApp;
var AppImpl = (function () {
    function AppImpl(options) {
        var _this = this;
        this._container = new Map();
        if (!options.region) {
            options.region = 'ap-shanghai';
        }
        if (!options.apiOrigin) {
            options.apiOrigin = "https://" + options.env + "." + options.region + ".tcb-api.tencentcloudapi.com";
        }
        var storageEnv = options.env;
        if (!options.clientId) {
            options.clientId = '';
        }
        else {
            storageEnv = options.clientId;
        }
        if (!options.storage) {
            options.storage = new storage_1.DefaultStorage({ env: storageEnv });
        }
        if (!options.openURIWithCallback) {
            options.openURIWithCallback = openuri_1.defaultOpenURIWithCallback;
        }
        var baseRequest = options.request;
        if (!baseRequest) {
            baseRequest = request_1.defaultRequest;
        }
        var apiOrigin = options.apiOrigin;
        options.request = function (url, options) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (url.startsWith('/')) {
                    url = apiOrigin + url;
                }
                return [2, baseRequest(url, options)];
            });
        }); };
        this._options = options;
    }
    Object.defineProperty(AppImpl.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppImpl.prototype, "container", {
        get: function () {
            return this._container;
        },
        enumerable: false,
        configurable: true
    });
    return AppImpl;
}());
exports.AppImpl = AppImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFxRztBQUNyRyxxQ0FBbUc7QUFDbkcscUNBQStEO0FBZS9ELFNBQWdCLGFBQWEsQ0FDM0IsT0FBZ0I7SUFFaEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBSkQsc0NBSUM7QUFNRDtJQUlFLGlCQUFZLE9BQWdCO1FBQTVCLGlCQWtDQztRQXBDZ0IsZUFBVSxHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7UUFHbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDbkIsT0FBTyxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUE7U0FDL0I7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUN0QixPQUFPLENBQUMsU0FBUyxHQUFHLGFBQVcsT0FBTyxDQUFDLEdBQUcsU0FBSSxPQUFPLENBQUMsTUFBTSxpQ0FBOEIsQ0FBQTtTQUMzRjtRQUNELElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUE7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDckIsT0FBTyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUE7U0FDdEI7YUFBTTtZQUNMLFVBQVUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDcEIsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLHdCQUFjLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztTQUMzRDtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUU7WUFDaEMsT0FBTyxDQUFDLG1CQUFtQixHQUFHLG9DQUEwQixDQUFDO1NBQzFEO1FBQ0QsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQTtRQUNqQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLFdBQVcsR0FBRyx3QkFBYyxDQUFBO1NBQzdCO1FBQ0QsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQTtRQUNuQyxPQUFPLENBQUMsT0FBTyxHQUFHLFVBQ2hCLEdBQVcsRUFDWCxPQUF3Qjs7Z0JBRXhCLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDdkIsR0FBRyxHQUFHLFNBQVMsR0FBRyxHQUFHLENBQUM7aUJBQ3ZCO2dCQUNELFdBQU8sV0FBVyxDQUFJLEdBQUcsRUFBRSxPQUFPLENBQUMsRUFBQTs7YUFDcEMsQ0FBQTtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzFCLENBQUM7SUFFRCxzQkFBSSw0QkFBTzthQUFYO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksOEJBQVM7YUFBYjtZQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUNILGNBQUM7QUFBRCxDQUFDLEFBL0NELElBK0NDO0FBL0NZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVmYXVsdFJlcXVlc3QsIFJlcXVlc3RGbiBhcyByZXF1ZXN0Rm4sIFJlcXVlc3RPcHRpb25zIGFzIHJlcXVlc3RPcHRpb25zIH0gZnJvbSBcIi4vcmVxdWVzdFwiO1xuaW1wb3J0IHsgT3BlblVSSVdpdGhDYWxsYmFjayBhcyBvcGVuVVJJV2l0aENhbGxiYWNrLCBkZWZhdWx0T3BlblVSSVdpdGhDYWxsYmFjayB9IGZyb20gXCIuL29wZW51cmlcIjtcbmltcG9ydCB7IERlZmF1bHRTdG9yYWdlLCBTdG9yYWdlIGFzIHN0b3JhZ2UgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9ucyB7XG4gIGVudjogc3RyaW5nLFxuICByZWdpb24/OiBzdHJpbmcsXG4gIGFwaU9yaWdpbj86IHN0cmluZztcbiAgY2xpZW50SWQ/OiBzdHJpbmc7XG4gIGNsaWVudFNlY3JldD86IHN0cmluZztcblxuICAvLyBwbHVnaW5zIGNhbiBzZXQgcGxhdGZvcm0gZnVuY3Rpb25zXG4gIHJlcXVlc3Q/OiByZXF1ZXN0Rm47XG4gIHN0b3JhZ2U/OiBzdG9yYWdlO1xuICBvcGVuVVJJV2l0aENhbGxiYWNrPzogb3BlblVSSVdpdGhDYWxsYmFjaztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVBcHAoXG4gIG9wdGlvbnM6IE9wdGlvbnMsXG4pOiBBcHAge1xuICByZXR1cm4gbmV3IEFwcEltcGwob3B0aW9ucyk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBwIHtcbiAgcmVhZG9ubHkgb3B0aW9uczogT3B0aW9ucztcbn1cblxuZXhwb3J0IGNsYXNzIEFwcEltcGwgaW1wbGVtZW50cyBBcHAge1xuICBwcml2YXRlIHJlYWRvbmx5IF9vcHRpb25zOiBPcHRpb25zO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jb250YWluZXIgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMucmVnaW9uKSB7XG4gICAgICBvcHRpb25zLnJlZ2lvbiA9ICdhcC1zaGFuZ2hhaSdcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zLmFwaU9yaWdpbikge1xuICAgICAgb3B0aW9ucy5hcGlPcmlnaW4gPSBgaHR0cHM6Ly8ke29wdGlvbnMuZW52fS4ke29wdGlvbnMucmVnaW9ufS50Y2ItYXBpLnRlbmNlbnRjbG91ZGFwaS5jb21gXG4gICAgfVxuICAgIGxldCBzdG9yYWdlRW52ID0gb3B0aW9ucy5lbnZcbiAgICBpZiAoIW9wdGlvbnMuY2xpZW50SWQpIHtcbiAgICAgIG9wdGlvbnMuY2xpZW50SWQgPSAnJ1xuICAgIH0gZWxzZSB7XG4gICAgICBzdG9yYWdlRW52ID0gb3B0aW9ucy5jbGllbnRJZFxuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMuc3RvcmFnZSkge1xuICAgICAgb3B0aW9ucy5zdG9yYWdlID0gbmV3IERlZmF1bHRTdG9yYWdlKHsgZW52OiBzdG9yYWdlRW52IH0pO1xuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMub3BlblVSSVdpdGhDYWxsYmFjaykge1xuICAgICAgb3B0aW9ucy5vcGVuVVJJV2l0aENhbGxiYWNrID0gZGVmYXVsdE9wZW5VUklXaXRoQ2FsbGJhY2s7XG4gICAgfVxuICAgIGxldCBiYXNlUmVxdWVzdCA9IG9wdGlvbnMucmVxdWVzdFxuICAgIGlmICghYmFzZVJlcXVlc3QpIHtcbiAgICAgIGJhc2VSZXF1ZXN0ID0gZGVmYXVsdFJlcXVlc3RcbiAgICB9XG4gICAgY29uc3QgYXBpT3JpZ2luID0gb3B0aW9ucy5hcGlPcmlnaW5cbiAgICBvcHRpb25zLnJlcXVlc3QgPSBhc3luYyA8VD4oXG4gICAgICB1cmw6IHN0cmluZyxcbiAgICAgIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9ucyxcbiAgICApOiBQcm9taXNlPFQ+ID0+IHtcbiAgICAgIGlmICh1cmwuc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgIHVybCA9IGFwaU9yaWdpbiArIHVybDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBiYXNlUmVxdWVzdDxUPih1cmwsIG9wdGlvbnMpXG4gICAgfVxuICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgZ2V0IG9wdGlvbnMoKTogT3B0aW9ucyB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gIH1cblxuICBnZXQgY29udGFpbmVyKCk6IE1hcDxzdHJpbmcsIGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9jb250YWluZXI7XG4gIH1cbn1cblxuXG5leHBvcnQgdHlwZSBSZXF1ZXN0Rm4gPSByZXF1ZXN0Rm5cbmV4cG9ydCB0eXBlIFJlcXVlc3RPcHRpb25zID0gcmVxdWVzdE9wdGlvbnNcbmV4cG9ydCB0eXBlIE9wZW5VUklXaXRoQ2FsbGJhY2sgPSBvcGVuVVJJV2l0aENhbGxiYWNrXG5leHBvcnQgdHlwZSBTdG9yYWdlID0gc3RvcmFnZVxuXG4iXX0=