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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.WebRequest = exports.genAdapter = void 0;
var adapter_interface_1 = require("@cloudbase/adapter-interface");
var util_1 = require("../../libs/util");
var common_1 = require("../../constants/common");
var WebRequest = (function (_super) {
    __extends(WebRequest, _super);
    function WebRequest(config) {
        var _this = _super.call(this) || this;
        var timeout = config.timeout, timeoutMsg = config.timeoutMsg, restrictedMethods = config.restrictedMethods;
        _this._timeout = timeout || 0;
        _this._timeoutMsg = timeoutMsg || '请求超时';
        _this._restrictedMethods = restrictedMethods || ['get', 'post', 'upload', 'download'];
        return _this;
    }
    WebRequest.prototype.get = function (options) {
        return this._request(__assign(__assign({}, options), { method: 'get' }), this._restrictedMethods.includes('get'));
    };
    WebRequest.prototype.post = function (options) {
        return this._request(__assign(__assign({}, options), { method: 'post' }), this._restrictedMethods.includes('post'));
    };
    WebRequest.prototype.put = function (options) {
        return this._request(__assign(__assign({}, options), { method: 'put' }));
    };
    WebRequest.prototype.upload = function (options) {
        var data = options.data, file = options.file, name = options.name;
        var formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }
        formData.append('key', name);
        formData.append('file', file);
        return this._request(__assign(__assign({}, options), { data: formData, method: 'post' }), this._restrictedMethods.includes('upload'));
    };
    WebRequest.prototype.download = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, url, fileName, link, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.get(__assign(__assign({}, options), { headers: {}, responseType: 'blob' }))];
                    case 1:
                        data = (_a.sent()).data;
                        url = window.URL.createObjectURL(new Blob([data]));
                        fileName = decodeURIComponent(new URL(options.url).pathname.split('/').pop() || '');
                        link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', fileName);
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                        window.URL.revokeObjectURL(url);
                        document.body.removeChild(link);
                        return [3, 3];
                    case 2:
                        e_1 = _a.sent();
                        return [3, 3];
                    case 3: return [2, new Promise(function (resolve) {
                            resolve({
                                statusCode: 200,
                                tempFilePath: options.url
                            });
                        })];
                }
            });
        });
    };
    WebRequest.prototype._request = function (options, enableAbort) {
        var _this = this;
        if (enableAbort === void 0) { enableAbort = false; }
        var method = (String(options.method)).toLowerCase() || 'get';
        return new Promise(function (resolve) {
            var url = options.url, _a = options.headers, headers = _a === void 0 ? {} : _a, data = options.data, responseType = options.responseType, withCredentials = options.withCredentials, body = options.body, onUploadProgress = options.onUploadProgress;
            var realUrl = util_1.formatUrl(common_1.getProtocol(), url, method === 'get' ? data : {});
            var ajax = new XMLHttpRequest();
            ajax.open(method, realUrl);
            responseType && (ajax.responseType = responseType);
            for (var key in headers) {
                ajax.setRequestHeader(key, headers[key]);
            }
            var timer;
            if (onUploadProgress) {
                ajax.upload.addEventListener('progress', onUploadProgress);
            }
            ajax.onreadystatechange = function () {
                var result = {};
                if (ajax.readyState === 4) {
                    var headers_1 = ajax.getAllResponseHeaders();
                    var arr = headers_1.trim().split(/[\r\n]+/);
                    var headerMap_1 = {};
                    arr.forEach(function (line) {
                        var parts = line.split(': ');
                        var header = parts.shift().toLowerCase();
                        var value = parts.join(': ');
                        headerMap_1[header] = value;
                    });
                    result.header = headerMap_1;
                    result.statusCode = ajax.status;
                    try {
                        result.data = responseType === 'blob' ? ajax.response : JSON.parse(ajax.responseText);
                    }
                    catch (e) {
                        result.data = responseType === 'blob' ? ajax.response : ajax.responseText;
                    }
                    clearTimeout(timer);
                    resolve(result);
                }
            };
            if (enableAbort && _this._timeout) {
                timer = setTimeout(function () {
                    console.warn(_this._timeoutMsg);
                    ajax.abort();
                }, _this._timeout);
            }
            var payload;
            if (util_1.isFormData(data)) {
                payload = data;
            }
            else if (headers['content-type'] === 'application/x-www-form-urlencoded') {
                payload = util_1.toQueryString(data);
            }
            else if (body) {
                payload = body;
            }
            else {
                payload = data ? JSON.stringify(data) : undefined;
            }
            if (withCredentials) {
                ajax.withCredentials = true;
            }
            ajax.send(payload);
        });
    };
    return WebRequest;
}(adapter_interface_1.AbstractSDKRequest));
exports.WebRequest = WebRequest;
function genAdapter() {
    var adapter = {
        root: window,
        reqClass: WebRequest,
        wsClass: WebSocket,
        localStorage: localStorage,
        sessionStorage: sessionStorage
    };
    return adapter;
}
exports.genAdapter = genAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FkYXB0ZXJzL3BsYXRmb3Jtcy93ZWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBUXNDO0FBQ3RDLHdDQUFxRTtBQUNyRSxpREFBcUQ7QUFLckQ7SUFBeUIsOEJBQWtCO0lBT3pDLG9CQUFZLE1BQXNCO1FBQWxDLFlBQ0UsaUJBQU8sU0FLUjtRQUpTLElBQUEsT0FBTyxHQUFrQyxNQUFNLFFBQXhDLEVBQUMsVUFBVSxHQUF1QixNQUFNLFdBQTdCLEVBQUMsaUJBQWlCLEdBQUssTUFBTSxrQkFBWCxDQUFZO1FBQ3hELEtBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxJQUFJLENBQUMsQ0FBQztRQUM3QixLQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsSUFBSSxNQUFNLENBQUM7UUFDeEMsS0FBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixJQUFJLENBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsVUFBVSxDQUFDLENBQUM7O0lBQ3BGLENBQUM7SUFDTSx3QkFBRyxHQUFWLFVBQVcsT0FBd0I7UUFDakMsT0FBTyxJQUFJLENBQUMsUUFBUSx1QkFDZixPQUFPLEtBQ1YsTUFBTSxFQUFFLEtBQUssS0FDYixJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUNNLHlCQUFJLEdBQVgsVUFBWSxPQUF3QjtRQUNsQyxPQUFPLElBQUksQ0FBQyxRQUFRLHVCQUNmLE9BQU8sS0FDVixNQUFNLEVBQUUsTUFBTSxLQUNkLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ00sd0JBQUcsR0FBVixVQUFXLE9BQXdCO1FB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QUM7YUFDbEI7WUFFRCxJQUFJLE9BQU8sQ0FBQztZQUNaLElBQUcsaUJBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFFbkIsT0FBTyxHQUFHLElBQUksQ0FBQzthQUNoQjtpQkFBTSxJQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxtQ0FBbUMsRUFBRTtnQkFDekUsT0FBTyxHQUFHLG9CQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDL0I7aUJBQU0sSUFBRyxJQUFJLEVBQUU7Z0JBQ2QsT0FBTyxHQUFHLElBQUksQ0FBQzthQUNoQjtpQkFBTTtnQkFFTCxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7YUFDbkQ7WUFFRCxJQUFHLGVBQWUsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7YUFDN0I7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQWpKRCxDQUF5QixzQ0FBa0IsR0FpSjFDO0FBYW1CLGdDQUFVO0FBWDlCLFNBQVMsVUFBVTtJQUNqQixJQUFNLE9BQU8sR0FBd0I7UUFDbkMsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsVUFBVTtRQUNwQixPQUFPLEVBQUUsU0FBUztRQUNsQixZQUFZLEVBQUUsWUFBWTtRQUMxQixjQUFjLEVBQUUsY0FBYztLQUMvQixDQUFDO0lBQ0YsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUVRLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgU0RLQWRhcHRlckludGVyZmFjZSxcbiAgQWJzdHJhY3RTREtSZXF1ZXN0LFxuICBJUmVxdWVzdE9wdGlvbnMsXG4gIFJlc3BvbnNlT2JqZWN0LFxuICBJVXBsb2FkUmVxdWVzdE9wdGlvbnMsXG4gIElSZXF1ZXN0Q29uZmlnLFxuICBJUmVxdWVzdE1ldGhvZFxufSBmcm9tICdAY2xvdWRiYXNlL2FkYXB0ZXItaW50ZXJmYWNlJztcbmltcG9ydCB7IGlzRm9ybURhdGEsZm9ybWF0VXJsLHRvUXVlcnlTdHJpbmcgfSBmcm9tICcuLi8uLi9saWJzL3V0aWwnO1xuaW1wb3J0IHsgZ2V0UHJvdG9jb2wgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvY29tbW9uJztcblxuLyoqXG4gKiBAY2xhc3MgV2ViUmVxdWVzdFxuICovXG5jbGFzcyBXZWJSZXF1ZXN0IGV4dGVuZHMgQWJzdHJhY3RTREtSZXF1ZXN0IHtcbiAgLy8g6buY6K6k5LiN6ZmQ6LaF5pe2XG4gIHByaXZhdGUgcmVhZG9ubHkgX3RpbWVvdXQ6IG51bWJlcjtcbiAgLy8g6LaF5pe25o+Q56S65paH5qGIXG4gIHByaXZhdGUgcmVhZG9ubHkgX3RpbWVvdXRNc2c6IHN0cmluZztcbiAgLy8g6LaF5pe25Y+X6ZmQ6K+35rGC57G75Z6L77yM6buY6K6k5omA5pyJ6K+35rGC5Z2H5Y+X6ZmQXG4gIHByaXZhdGUgcmVhZG9ubHkgX3Jlc3RyaWN0ZWRNZXRob2RzOiBBcnJheTxJUmVxdWVzdE1ldGhvZD47XG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSVJlcXVlc3RDb25maWcpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IHsgdGltZW91dCx0aW1lb3V0TXNnLHJlc3RyaWN0ZWRNZXRob2RzIH0gPSBjb25maWc7XG4gICAgdGhpcy5fdGltZW91dCA9IHRpbWVvdXQgfHwgMDtcbiAgICB0aGlzLl90aW1lb3V0TXNnID0gdGltZW91dE1zZyB8fCAn6K+35rGC6LaF5pe2JztcbiAgICB0aGlzLl9yZXN0cmljdGVkTWV0aG9kcyA9IHJlc3RyaWN0ZWRNZXRob2RzIHx8IFsnZ2V0JywncG9zdCcsJ3VwbG9hZCcsJ2Rvd25sb2FkJ107XG4gIH1cbiAgcHVibGljIGdldChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Qoe1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogJ2dldCdcbiAgICB9LHRoaXMuX3Jlc3RyaWN0ZWRNZXRob2RzLmluY2x1ZGVzKCdnZXQnKSk7XG4gIH1cbiAgcHVibGljIHBvc3Qob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxSZXNwb25zZU9iamVjdD4ge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0sdGhpcy5fcmVzdHJpY3RlZE1ldGhvZHMuaW5jbHVkZXMoJ3Bvc3QnKSk7XG4gIH1cbiAgcHVibGljIHB1dChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Qoe1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogJ3B1dCdcbiAgICB9KTtcbiAgfVxuICBwdWJsaWMgdXBsb2FkKG9wdGlvbnM6IElVcGxvYWRSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCB7IGRhdGEsZmlsZSxuYW1lIH0gPSBvcHRpb25zO1xuICAgIC8vIHVwbG9hZOiwg+eUqGRhdGHkuLpvYmplY3TnsbvlnovvvIzlnKjmraTlpITovazkuLpGb3JtRGF0YVxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZm9yKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LGRhdGFba2V5XSk7XG4gICAgfVxuICAgIGZvcm1EYXRhLmFwcGVuZCgna2V5JyxuYW1lKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLGZpbGUpO1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBkYXRhOiBmb3JtRGF0YSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSx0aGlzLl9yZXN0cmljdGVkTWV0aG9kcy5pbmNsdWRlcygndXBsb2FkJykpO1xuICB9XG4gIHB1YmxpYyBhc3luYyBkb3dubG9hZChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPGFueT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuZ2V0KHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgaGVhZGVyczoge30sIC8vIOS4i+i9vei1hOa6kOivt+axguS4jee7j+i/h3NlcnZpY2XvvIxoZWFkZXLmuIXnqbpcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnYmxvYidcbiAgICAgIH0pO1xuICAgICAgY29uc3QgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW2RhdGFdKSk7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGRlY29kZVVSSUNvbXBvbmVudChuZXcgVVJMKG9wdGlvbnMudXJsKS5wYXRobmFtZS5zcGxpdCgnLycpLnBvcCgpIHx8ICcnKTtcbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsZmlsZU5hbWUpO1xuICAgICAgbGluay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgbGluay5jbGljaygpO1xuICAgICAgLy8g5Zue5pS25YaF5a2YXG4gICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcbiAgICB9IGNhdGNoKGUpIHsgfVxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHJlc29sdmUoe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIHRlbXBGaWxlUGF0aDogb3B0aW9ucy51cmxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge0lSZXF1ZXN0T3B0aW9uc30gb3B0aW9uc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZUFib3J0IOaYr+WQpui2heaXtuS4reaWreivt+axglxuICAgKi9cbiAgcHJvdGVjdGVkIF9yZXF1ZXN0KG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyxlbmFibGVBYm9ydCA9IGZhbHNlKTogUHJvbWlzZTxSZXNwb25zZU9iamVjdD4ge1xuICAgIGNvbnN0IG1ldGhvZCA9IChTdHJpbmcob3B0aW9ucy5tZXRob2QpKS50b0xvd2VyQ2FzZSgpIHx8ICdnZXQnO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IHsgdXJsLGhlYWRlcnMgPSB7fSxkYXRhLHJlc3BvbnNlVHlwZSx3aXRoQ3JlZGVudGlhbHMsYm9keSxvblVwbG9hZFByb2dyZXNzIH0gPSBvcHRpb25zO1xuICAgICAgY29uc3QgcmVhbFVybCA9IGZvcm1hdFVybChnZXRQcm90b2NvbCgpLHVybCxtZXRob2QgPT09ICdnZXQnID8gZGF0YSA6IHt9KTtcbiAgICAgIGNvbnN0IGFqYXggPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIGFqYXgub3BlbihtZXRob2QscmVhbFVybCk7XG4gICAgICByZXNwb25zZVR5cGUgJiYgKGFqYXgucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlKTtcbiAgICAgIGZvcihjb25zdCBrZXkgaW4gaGVhZGVycykge1xuICAgICAgICBhamF4LnNldFJlcXVlc3RIZWFkZXIoa2V5LGhlYWRlcnNba2V5XSk7XG4gICAgICB9XG4gICAgICBsZXQgdGltZXI7XG4gICAgICBpZihvblVwbG9hZFByb2dyZXNzKSB7XG4gICAgICAgIGFqYXgudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJyxvblVwbG9hZFByb2dyZXNzKTtcbiAgICAgIH1cbiAgICAgIGFqYXgub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQ6IFJlc3BvbnNlT2JqZWN0ID0ge307XG4gICAgICAgIGlmKGFqYXgucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgIGxldCBoZWFkZXJzID0gYWpheC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKTtcbiAgICAgICAgICBsZXQgYXJyID0gaGVhZGVycy50cmltKCkuc3BsaXQoL1tcXHJcXG5dKy8pO1xuICAgICAgICAgIC8vIENyZWF0ZSBhIG1hcCBvZiBoZWFkZXIgbmFtZXMgdG8gdmFsdWVzXG4gICAgICAgICAgbGV0IGhlYWRlck1hcCA9IHt9O1xuICAgICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIGxldCBwYXJ0cyA9IGxpbmUuc3BsaXQoJzogJyk7XG4gICAgICAgICAgICBsZXQgaGVhZGVyID0gcGFydHMuc2hpZnQoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gcGFydHMuam9pbignOiAnKTtcbiAgICAgICAgICAgIGhlYWRlck1hcFtoZWFkZXJdID0gdmFsdWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmVzdWx0LmhlYWRlciA9IGhlYWRlck1hcDtcbiAgICAgICAgICByZXN1bHQuc3RhdHVzQ29kZSA9IGFqYXguc3RhdHVzO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyDkuIrkvKBwb3N06K+35rGC6L+U5Zue5pWw5o2u5qC85byP5Li6eG1s77yM5q2k5aSE5a656ZSZXG4gICAgICAgICAgICByZXN1bHQuZGF0YSA9IHJlc3BvbnNlVHlwZSA9PT0gJ2Jsb2InID8gYWpheC5yZXNwb25zZSA6IEpTT04ucGFyc2UoYWpheC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgcmVzdWx0LmRhdGEgPSByZXNwb25zZVR5cGUgPT09ICdibG9iJyA/IGFqYXgucmVzcG9uc2UgOiBhamF4LnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBpZihlbmFibGVBYm9ydCAmJiB0aGlzLl90aW1lb3V0KSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS53YXJuKHRoaXMuX3RpbWVvdXRNc2cpO1xuICAgICAgICAgIGFqYXguYWJvcnQoKTtcbiAgICAgICAgfSx0aGlzLl90aW1lb3V0KTtcbiAgICAgIH1cbiAgICAgIC8vIOWkhOeQhiBwYXlsb2FkXG4gICAgICBsZXQgcGF5bG9hZDtcbiAgICAgIGlmKGlzRm9ybURhdGEoZGF0YSkpIHtcbiAgICAgICAgLy8gRm9ybURhdGHvvIzkuI3lpITnkIZcbiAgICAgICAgcGF5bG9hZCA9IGRhdGE7XG4gICAgICB9IGVsc2UgaWYoaGVhZGVyc1snY29udGVudC10eXBlJ10gPT09ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSB7XG4gICAgICAgIHBheWxvYWQgPSB0b1F1ZXJ5U3RyaW5nKGRhdGEpO1xuICAgICAgfSBlbHNlIGlmKGJvZHkpIHtcbiAgICAgICAgcGF5bG9hZCA9IGJvZHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDlhbblroPmg4XlhrVcbiAgICAgICAgcGF5bG9hZCA9IGRhdGEgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgaWYod2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICAgIGFqYXgud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGFqYXguc2VuZChwYXlsb2FkKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZW5BZGFwdGVyKCkge1xuICBjb25zdCBhZGFwdGVyOiBTREtBZGFwdGVySW50ZXJmYWNlID0ge1xuICAgIHJvb3Q6IHdpbmRvdyxcbiAgICByZXFDbGFzczogV2ViUmVxdWVzdCxcbiAgICB3c0NsYXNzOiBXZWJTb2NrZXQsXG4gICAgbG9jYWxTdG9yYWdlOiBsb2NhbFN0b3JhZ2UsXG4gICAgc2Vzc2lvblN0b3JhZ2U6IHNlc3Npb25TdG9yYWdlXG4gIH07XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG5leHBvcnQgeyBnZW5BZGFwdGVyLFdlYlJlcXVlc3QgfTtcbiJdfQ==