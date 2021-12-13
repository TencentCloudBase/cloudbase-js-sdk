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
        localStorage: localStorage
    };
    return adapter;
}
exports.genAdapter = genAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FkYXB0ZXJzL3BsYXRmb3Jtcy93ZWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBUXNDO0FBQ3RDLHdDQUF1RTtBQUN2RSxpREFBcUQ7QUFLckQ7SUFBeUIsOEJBQWtCO0lBT3pDLG9CQUFZLE1BQXNCO1FBQWxDLFlBQ0UsaUJBQU8sU0FLUjtRQUpTLElBQUEsT0FBTyxHQUFvQyxNQUFNLFFBQTFDLEVBQUUsVUFBVSxHQUF3QixNQUFNLFdBQTlCLEVBQUUsaUJBQWlCLEdBQUssTUFBTSxrQkFBWCxDQUFZO1FBQzFELEtBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxJQUFJLENBQUMsQ0FBQztRQUM3QixLQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsSUFBSSxNQUFNLENBQUM7UUFDeEMsS0FBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7O0lBQ3ZGLENBQUM7SUFDTSx3QkFBRyxHQUFWLFVBQVcsT0FBd0I7UUFDakMsT0FBTyxJQUFJLENBQUMsUUFBUSx1QkFDZixPQUFPLEtBQ1YsTUFBTSxFQUFFLEtBQUssS0FDWixJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUNNLHlCQUFJLEdBQVgsVUFBWSxPQUF3QjtRQUNsQyxPQUFPLElBQUksQ0FBQyxRQUFRLHVCQUNmLE9BQU8sS0FDVixNQUFNLEVBQUUsTUFBTSxLQUNiLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ00sd0JBQUcsR0FBVixVQUFXLE9BQXdCO1FB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QUFDO2FBQ25CO1lBRUQsSUFBSSxPQUFPLENBQUM7WUFDWixJQUFJLGlCQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBRXBCLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDaEI7aUJBQU0sSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssbUNBQW1DLEVBQUU7Z0JBQzFFLE9BQU8sR0FBRyxvQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9CO2lCQUFNLElBQUksSUFBSSxFQUFFO2dCQUNmLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDaEI7aUJBQU07Z0JBRUwsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2FBQ25EO1lBRUQsSUFBSSxlQUFlLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2FBQzdCO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUFqSkQsQ0FBeUIsc0NBQWtCLEdBaUoxQztBQVlvQixnQ0FBVTtBQVYvQixTQUFTLFVBQVU7SUFDakIsSUFBTSxPQUFPLEdBQXdCO1FBQ25DLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLFVBQVU7UUFDcEIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsWUFBWSxFQUFFLFlBQVk7S0FDM0IsQ0FBQztJQUNGLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFFUSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFNES0FkYXB0ZXJJbnRlcmZhY2UsXG4gIEFic3RyYWN0U0RLUmVxdWVzdCxcbiAgSVJlcXVlc3RPcHRpb25zLFxuICBSZXNwb25zZU9iamVjdCxcbiAgSVVwbG9hZFJlcXVlc3RPcHRpb25zLFxuICBJUmVxdWVzdENvbmZpZyxcbiAgSVJlcXVlc3RNZXRob2Rcbn0gZnJvbSAnQGNsb3VkYmFzZS9hZGFwdGVyLWludGVyZmFjZSc7XG5pbXBvcnQgeyBpc0Zvcm1EYXRhLCBmb3JtYXRVcmwsIHRvUXVlcnlTdHJpbmcgfSBmcm9tICcuLi8uLi9saWJzL3V0aWwnO1xuaW1wb3J0IHsgZ2V0UHJvdG9jb2wgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvY29tbW9uJztcblxuLyoqXG4gKiBAY2xhc3MgV2ViUmVxdWVzdFxuICovXG5jbGFzcyBXZWJSZXF1ZXN0IGV4dGVuZHMgQWJzdHJhY3RTREtSZXF1ZXN0IHtcbiAgLy8g6buY6K6k5LiN6ZmQ6LaF5pe2XG4gIHByaXZhdGUgcmVhZG9ubHkgX3RpbWVvdXQ6IG51bWJlcjtcbiAgLy8g6LaF5pe25o+Q56S65paH5qGIXG4gIHByaXZhdGUgcmVhZG9ubHkgX3RpbWVvdXRNc2c6IHN0cmluZztcbiAgLy8g6LaF5pe25Y+X6ZmQ6K+35rGC57G75Z6L77yM6buY6K6k5omA5pyJ6K+35rGC5Z2H5Y+X6ZmQXG4gIHByaXZhdGUgcmVhZG9ubHkgX3Jlc3RyaWN0ZWRNZXRob2RzOiBBcnJheTxJUmVxdWVzdE1ldGhvZD47XG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSVJlcXVlc3RDb25maWcpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IHsgdGltZW91dCwgdGltZW91dE1zZywgcmVzdHJpY3RlZE1ldGhvZHMgfSA9IGNvbmZpZztcbiAgICB0aGlzLl90aW1lb3V0ID0gdGltZW91dCB8fCAwO1xuICAgIHRoaXMuX3RpbWVvdXRNc2cgPSB0aW1lb3V0TXNnIHx8ICfor7fmsYLotoXml7YnO1xuICAgIHRoaXMuX3Jlc3RyaWN0ZWRNZXRob2RzID0gcmVzdHJpY3RlZE1ldGhvZHMgfHwgWydnZXQnLCAncG9zdCcsICd1cGxvYWQnLCAnZG93bmxvYWQnXTtcbiAgfVxuICBwdWJsaWMgZ2V0KG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCh7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiAnZ2V0J1xuICAgIH0sIHRoaXMuX3Jlc3RyaWN0ZWRNZXRob2RzLmluY2x1ZGVzKCdnZXQnKSk7XG4gIH1cbiAgcHVibGljIHBvc3Qob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxSZXNwb25zZU9iamVjdD4ge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0sIHRoaXMuX3Jlc3RyaWN0ZWRNZXRob2RzLmluY2x1ZGVzKCdwb3N0JykpO1xuICB9XG4gIHB1YmxpYyBwdXQob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxSZXNwb25zZU9iamVjdD4ge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6ICdwdXQnXG4gICAgfSk7XG4gIH1cbiAgcHVibGljIHVwbG9hZChvcHRpb25zOiBJVXBsb2FkUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgeyBkYXRhLCBmaWxlLCBuYW1lIH0gPSBvcHRpb25zO1xuICAgIC8vIHVwbG9hZOiwg+eUqGRhdGHkuLpvYmplY3TnsbvlnovvvIzlnKjmraTlpITovazkuLpGb3JtRGF0YVxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcbiAgICB9XG4gICAgZm9ybURhdGEuYXBwZW5kKCdrZXknLCBuYW1lKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlKTtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCh7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgZGF0YTogZm9ybURhdGEsXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0sIHRoaXMuX3Jlc3RyaWN0ZWRNZXRob2RzLmluY2x1ZGVzKCd1cGxvYWQnKSk7XG4gIH1cbiAgcHVibGljIGFzeW5jIGRvd25sb2FkKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8YW55PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgdGhpcy5nZXQoe1xuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICBoZWFkZXJzOiB7fSwgLy8g5LiL6L296LWE5rqQ6K+35rGC5LiN57uP6L+Hc2VydmljZe+8jGhlYWRlcua4heepulxuICAgICAgICByZXNwb25zZVR5cGU6ICdibG9iJ1xuICAgICAgfSk7XG4gICAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbZGF0YV0pKTtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZGVjb2RlVVJJQ29tcG9uZW50KG5ldyBVUkwob3B0aW9ucy51cmwpLnBhdGhuYW1lLnNwbGl0KCcvJykucG9wKCkgfHwgJycpO1xuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgICAgbGluay5ocmVmID0gdXJsO1xuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgZmlsZU5hbWUpO1xuICAgICAgbGluay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgbGluay5jbGljaygpO1xuICAgICAgLy8g5Zue5pS25YaF5a2YXG4gICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcbiAgICB9IGNhdGNoIChlKSB7IH1cbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICByZXNvbHZlKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICB0ZW1wRmlsZVBhdGg6IG9wdGlvbnMudXJsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtJUmVxdWVzdE9wdGlvbnN9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtib29sZWFufSBlbmFibGVBYm9ydCDmmK/lkKbotoXml7bkuK3mlq3or7fmsYJcbiAgICovXG4gIHByb3RlY3RlZCBfcmVxdWVzdChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMsIGVuYWJsZUFib3J0ID0gZmFsc2UpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgbWV0aG9kID0gKFN0cmluZyhvcHRpb25zLm1ldGhvZCkpLnRvTG93ZXJDYXNlKCkgfHwgJ2dldCc7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgeyB1cmwsIGhlYWRlcnMgPSB7fSwgZGF0YSwgcmVzcG9uc2VUeXBlLCB3aXRoQ3JlZGVudGlhbHMsIGJvZHksIG9uVXBsb2FkUHJvZ3Jlc3MgfSA9IG9wdGlvbnM7XG4gICAgICBjb25zdCByZWFsVXJsID0gZm9ybWF0VXJsKGdldFByb3RvY29sKCksIHVybCwgbWV0aG9kID09PSAnZ2V0JyA/IGRhdGEgOiB7fSk7XG4gICAgICBjb25zdCBhamF4ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICBhamF4Lm9wZW4obWV0aG9kLCByZWFsVXJsKTtcbiAgICAgIHJlc3BvbnNlVHlwZSAmJiAoYWpheC5yZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUpO1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gaGVhZGVycykge1xuICAgICAgICBhamF4LnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJzW2tleV0pO1xuICAgICAgfVxuICAgICAgbGV0IHRpbWVyO1xuICAgICAgaWYgKG9uVXBsb2FkUHJvZ3Jlc3MpIHtcbiAgICAgICAgYWpheC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBvblVwbG9hZFByb2dyZXNzKTtcbiAgICAgIH1cbiAgICAgIGFqYXgub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQ6IFJlc3BvbnNlT2JqZWN0ID0ge307XG4gICAgICAgIGlmIChhamF4LnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICBsZXQgaGVhZGVycyA9IGFqYXguZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCk7XG4gICAgICAgICAgbGV0IGFyciA9IGhlYWRlcnMudHJpbSgpLnNwbGl0KC9bXFxyXFxuXSsvKTtcbiAgICAgICAgICAvLyBDcmVhdGUgYSBtYXAgb2YgaGVhZGVyIG5hbWVzIHRvIHZhbHVlc1xuICAgICAgICAgIGxldCBoZWFkZXJNYXAgPSB7fTtcbiAgICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiAobGluZSkge1xuICAgICAgICAgICAgbGV0IHBhcnRzID0gbGluZS5zcGxpdCgnOiAnKTtcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSBwYXJ0cy5zaGlmdCgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBwYXJ0cy5qb2luKCc6ICcpO1xuICAgICAgICAgICAgaGVhZGVyTWFwW2hlYWRlcl0gPSB2YWx1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXN1bHQuaGVhZGVyID0gaGVhZGVyTWFwO1xuICAgICAgICAgIHJlc3VsdC5zdGF0dXNDb2RlID0gYWpheC5zdGF0dXM7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIOS4iuS8oHBvc3Tor7fmsYLov5Tlm57mlbDmja7moLzlvI/kuLp4bWzvvIzmraTlpITlrrnplJlcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhID0gcmVzcG9uc2VUeXBlID09PSAnYmxvYicgPyBhamF4LnJlc3BvbnNlIDogSlNPTi5wYXJzZShhamF4LnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmVzdWx0LmRhdGEgPSByZXNwb25zZVR5cGUgPT09ICdibG9iJyA/IGFqYXgucmVzcG9uc2UgOiBhamF4LnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBpZiAoZW5hYmxlQWJvcnQgJiYgdGhpcy5fdGltZW91dCkge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUud2Fybih0aGlzLl90aW1lb3V0TXNnKTtcbiAgICAgICAgICBhamF4LmFib3J0KCk7XG4gICAgICAgIH0sIHRoaXMuX3RpbWVvdXQpO1xuICAgICAgfVxuICAgICAgLy8g5aSE55CGIHBheWxvYWRcbiAgICAgIGxldCBwYXlsb2FkO1xuICAgICAgaWYgKGlzRm9ybURhdGEoZGF0YSkpIHtcbiAgICAgICAgLy8gRm9ybURhdGHvvIzkuI3lpITnkIZcbiAgICAgICAgcGF5bG9hZCA9IGRhdGE7XG4gICAgICB9IGVsc2UgaWYgKGhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID09PSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykge1xuICAgICAgICBwYXlsb2FkID0gdG9RdWVyeVN0cmluZyhkYXRhKTtcbiAgICAgIH0gZWxzZSBpZiAoYm9keSkge1xuICAgICAgICBwYXlsb2FkID0gYm9keTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOWFtuWug+aDheWGtVxuICAgICAgICBwYXlsb2FkID0gZGF0YSA/IEpTT04uc3RyaW5naWZ5KGRhdGEpIDogdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBpZiAod2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICAgIGFqYXgud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGFqYXguc2VuZChwYXlsb2FkKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZW5BZGFwdGVyKCkge1xuICBjb25zdCBhZGFwdGVyOiBTREtBZGFwdGVySW50ZXJmYWNlID0ge1xuICAgIHJvb3Q6IHdpbmRvdyxcbiAgICByZXFDbGFzczogV2ViUmVxdWVzdCxcbiAgICB3c0NsYXNzOiBXZWJTb2NrZXQsXG4gICAgbG9jYWxTdG9yYWdlOiBsb2NhbFN0b3JhZ2VcbiAgfTtcbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbmV4cG9ydCB7IGdlbkFkYXB0ZXIsIFdlYlJlcXVlc3QgfTtcbiJdfQ==