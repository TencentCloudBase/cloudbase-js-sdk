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
                ajax.addEventListener('progress', onUploadProgress);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FkYXB0ZXJzL3BsYXRmb3Jtcy93ZWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBUXNDO0FBQ3RDLHdDQUF1RTtBQUN2RSxpREFBcUQ7QUFLckQ7SUFBeUIsOEJBQWtCO0lBT3pDLG9CQUFZLE1BQXNCO1FBQWxDLFlBQ0UsaUJBQU8sU0FLUjtRQUpTLElBQUEsT0FBTyxHQUFvQyxNQUFNLFFBQTFDLEVBQUUsVUFBVSxHQUF3QixNQUFNLFdBQTlCLEVBQUUsaUJBQWlCLEdBQUssTUFBTSxrQkFBWCxDQUFZO1FBQzFELEtBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxJQUFJLENBQUMsQ0FBQztRQUM3QixLQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsSUFBSSxNQUFNLENBQUM7UUFDeEMsS0FBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7O0lBQ3ZGLENBQUM7SUFDTSx3QkFBRyxHQUFWLFVBQVcsT0FBd0I7UUFDakMsT0FBTyxJQUFJLENBQUMsUUFBUSx1QkFDZixPQUFPLEtBQ1YsTUFBTSxFQUFFLEtBQUssS0FDWixJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUNNLHlCQUFJLEdBQVgsVUFBWSxPQUF3QjtRQUNsQyxPQUFPLElBQUksQ0FBQyxRQUFRLHVCQUNmLE9BQU8sS0FDVixNQUFNLEVBQUUsTUFBTSxLQUNiLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ00sd0JBQUcsR0FBVixVQUFXLE9BQXdCO1FB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WUFFRCxJQUFJLE9BQU8sQ0FBQztZQUNaLElBQUksaUJBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFFcEIsT0FBTyxHQUFHLElBQUksQ0FBQzthQUNoQjtpQkFBTSxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxtQ0FBbUMsRUFBRTtnQkFDMUUsT0FBTyxHQUFHLG9CQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDL0I7aUJBQU0sSUFBSSxJQUFJLEVBQUU7Z0JBQ2YsT0FBTyxHQUFHLElBQUksQ0FBQzthQUNoQjtpQkFBTTtnQkFFTCxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7YUFDbkQ7WUFFRCxJQUFJLGVBQWUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7YUFDN0I7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQWpKRCxDQUF5QixzQ0FBa0IsR0FpSjFDO0FBYW9CLGdDQUFVO0FBWC9CLFNBQVMsVUFBVTtJQUNqQixJQUFNLE9BQU8sR0FBd0I7UUFDbkMsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsVUFBVTtRQUNwQixPQUFPLEVBQUUsU0FBUztRQUNsQixZQUFZLEVBQUUsWUFBWTtRQUMxQixjQUFjLEVBQUUsY0FBYztLQUMvQixDQUFDO0lBQ0YsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUVRLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgU0RLQWRhcHRlckludGVyZmFjZSxcbiAgQWJzdHJhY3RTREtSZXF1ZXN0LFxuICBJUmVxdWVzdE9wdGlvbnMsXG4gIFJlc3BvbnNlT2JqZWN0LFxuICBJVXBsb2FkUmVxdWVzdE9wdGlvbnMsXG4gIElSZXF1ZXN0Q29uZmlnLFxuICBJUmVxdWVzdE1ldGhvZFxufSBmcm9tICdAY2xvdWRiYXNlL2FkYXB0ZXItaW50ZXJmYWNlJztcbmltcG9ydCB7IGlzRm9ybURhdGEsIGZvcm1hdFVybCwgdG9RdWVyeVN0cmluZyB9IGZyb20gJy4uLy4uL2xpYnMvdXRpbCc7XG5pbXBvcnQgeyBnZXRQcm90b2NvbCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9jb21tb24nO1xuXG4vKipcbiAqIEBjbGFzcyBXZWJSZXF1ZXN0XG4gKi9cbmNsYXNzIFdlYlJlcXVlc3QgZXh0ZW5kcyBBYnN0cmFjdFNES1JlcXVlc3Qge1xuICAvLyDpu5jorqTkuI3pmZDotoXml7ZcbiAgcHJpdmF0ZSByZWFkb25seSBfdGltZW91dDogbnVtYmVyO1xuICAvLyDotoXml7bmj5DnpLrmlofmoYhcbiAgcHJpdmF0ZSByZWFkb25seSBfdGltZW91dE1zZzogc3RyaW5nO1xuICAvLyDotoXml7blj5fpmZDor7fmsYLnsbvlnovvvIzpu5jorqTmiYDmnInor7fmsYLlnYflj5fpmZBcbiAgcHJpdmF0ZSByZWFkb25seSBfcmVzdHJpY3RlZE1ldGhvZHM6IEFycmF5PElSZXF1ZXN0TWV0aG9kPjtcbiAgY29uc3RydWN0b3IoY29uZmlnOiBJUmVxdWVzdENvbmZpZykge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc3QgeyB0aW1lb3V0LCB0aW1lb3V0TXNnLCByZXN0cmljdGVkTWV0aG9kcyB9ID0gY29uZmlnO1xuICAgIHRoaXMuX3RpbWVvdXQgPSB0aW1lb3V0IHx8IDA7XG4gICAgdGhpcy5fdGltZW91dE1zZyA9IHRpbWVvdXRNc2cgfHwgJ+ivt+axgui2heaXtic7XG4gICAgdGhpcy5fcmVzdHJpY3RlZE1ldGhvZHMgPSByZXN0cmljdGVkTWV0aG9kcyB8fCBbJ2dldCcsICdwb3N0JywgJ3VwbG9hZCcsICdkb3dubG9hZCddO1xuICB9XG4gIHB1YmxpYyBnZXQob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxSZXNwb25zZU9iamVjdD4ge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6ICdnZXQnXG4gICAgfSwgdGhpcy5fcmVzdHJpY3RlZE1ldGhvZHMuaW5jbHVkZXMoJ2dldCcpKTtcbiAgfVxuICBwdWJsaWMgcG9zdChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Qoe1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSwgdGhpcy5fcmVzdHJpY3RlZE1ldGhvZHMuaW5jbHVkZXMoJ3Bvc3QnKSk7XG4gIH1cbiAgcHVibGljIHB1dChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3Qoe1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogJ3B1dCdcbiAgICB9KTtcbiAgfVxuICBwdWJsaWMgdXBsb2FkKG9wdGlvbnM6IElVcGxvYWRSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCB7IGRhdGEsIGZpbGUsIG5hbWUgfSA9IG9wdGlvbnM7XG4gICAgLy8gdXBsb2Fk6LCD55SoZGF0YeS4um9iamVjdOexu+Wei++8jOWcqOatpOWkhOi9rOS4ukZvcm1EYXRhXG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xuICAgIH1cbiAgICBmb3JtRGF0YS5hcHBlbmQoJ2tleScsIG5hbWUpO1xuICAgIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUpO1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBkYXRhOiBmb3JtRGF0YSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSwgdGhpcy5fcmVzdHJpY3RlZE1ldGhvZHMuaW5jbHVkZXMoJ3VwbG9hZCcpKTtcbiAgfVxuICBwdWJsaWMgYXN5bmMgZG93bmxvYWQob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxhbnk+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCB0aGlzLmdldCh7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIGhlYWRlcnM6IHt9LCAvLyDkuIvovb3otYTmupDor7fmsYLkuI3nu4/ov4dzZXJ2aWNl77yMaGVhZGVy5riF56m6XG4gICAgICAgIHJlc3BvbnNlVHlwZTogJ2Jsb2InXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtkYXRhXSkpO1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBkZWNvZGVVUklDb21wb25lbnQobmV3IFVSTChvcHRpb25zLnVybCkucGF0aG5hbWUuc3BsaXQoJy8nKS5wb3AoKSB8fCAnJyk7XG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG4gICAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBmaWxlTmFtZSk7XG4gICAgICBsaW5rLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICAvLyDlm57mlLblhoXlrZhcbiAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgcmVzb2x2ZSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgdGVtcEZpbGVQYXRoOiBvcHRpb25zLnVybFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7SVJlcXVlc3RPcHRpb25zfSBvcHRpb25zXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlQWJvcnQg5piv5ZCm6LaF5pe25Lit5pat6K+35rGCXG4gICAqL1xuICBwcm90ZWN0ZWQgX3JlcXVlc3Qob3B0aW9uczogSVJlcXVlc3RPcHRpb25zLCBlbmFibGVBYm9ydCA9IGZhbHNlKTogUHJvbWlzZTxSZXNwb25zZU9iamVjdD4ge1xuICAgIGNvbnN0IG1ldGhvZCA9IChTdHJpbmcob3B0aW9ucy5tZXRob2QpKS50b0xvd2VyQ2FzZSgpIHx8ICdnZXQnO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IHsgdXJsLCBoZWFkZXJzID0ge30sIGRhdGEsIHJlc3BvbnNlVHlwZSwgd2l0aENyZWRlbnRpYWxzLCBib2R5LCBvblVwbG9hZFByb2dyZXNzIH0gPSBvcHRpb25zO1xuICAgICAgY29uc3QgcmVhbFVybCA9IGZvcm1hdFVybChnZXRQcm90b2NvbCgpLCB1cmwsIG1ldGhvZCA9PT0gJ2dldCcgPyBkYXRhIDoge30pO1xuICAgICAgY29uc3QgYWpheCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgYWpheC5vcGVuKG1ldGhvZCwgcmVhbFVybCk7XG4gICAgICByZXNwb25zZVR5cGUgJiYgKGFqYXgucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlKTtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGhlYWRlcnMpIHtcbiAgICAgICAgYWpheC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyc1trZXldKTtcbiAgICAgIH1cbiAgICAgIGxldCB0aW1lcjtcbiAgICAgIGlmIChvblVwbG9hZFByb2dyZXNzKSB7XG4gICAgICAgIGFqYXguYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBvblVwbG9hZFByb2dyZXNzKTtcbiAgICAgIH1cbiAgICAgIGFqYXgub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQ6IFJlc3BvbnNlT2JqZWN0ID0ge307XG4gICAgICAgIGlmIChhamF4LnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICBsZXQgaGVhZGVycyA9IGFqYXguZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCk7XG4gICAgICAgICAgbGV0IGFyciA9IGhlYWRlcnMudHJpbSgpLnNwbGl0KC9bXFxyXFxuXSsvKTtcbiAgICAgICAgICAvLyBDcmVhdGUgYSBtYXAgb2YgaGVhZGVyIG5hbWVzIHRvIHZhbHVlc1xuICAgICAgICAgIGxldCBoZWFkZXJNYXAgPSB7fTtcbiAgICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiAobGluZSkge1xuICAgICAgICAgICAgbGV0IHBhcnRzID0gbGluZS5zcGxpdCgnOiAnKTtcbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSBwYXJ0cy5zaGlmdCgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBwYXJ0cy5qb2luKCc6ICcpO1xuICAgICAgICAgICAgaGVhZGVyTWFwW2hlYWRlcl0gPSB2YWx1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXN1bHQuaGVhZGVyID0gaGVhZGVyTWFwO1xuICAgICAgICAgIHJlc3VsdC5zdGF0dXNDb2RlID0gYWpheC5zdGF0dXM7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIOS4iuS8oHBvc3Tor7fmsYLov5Tlm57mlbDmja7moLzlvI/kuLp4bWzvvIzmraTlpITlrrnplJlcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhID0gcmVzcG9uc2VUeXBlID09PSAnYmxvYicgPyBhamF4LnJlc3BvbnNlIDogSlNPTi5wYXJzZShhamF4LnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmVzdWx0LmRhdGEgPSByZXNwb25zZVR5cGUgPT09ICdibG9iJyA/IGFqYXgucmVzcG9uc2UgOiBhamF4LnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBpZiAoZW5hYmxlQWJvcnQgJiYgdGhpcy5fdGltZW91dCkge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUud2Fybih0aGlzLl90aW1lb3V0TXNnKTtcbiAgICAgICAgICBhamF4LmFib3J0KCk7XG4gICAgICAgIH0sIHRoaXMuX3RpbWVvdXQpO1xuICAgICAgfVxuICAgICAgLy8g5aSE55CGIHBheWxvYWRcbiAgICAgIGxldCBwYXlsb2FkO1xuICAgICAgaWYgKGlzRm9ybURhdGEoZGF0YSkpIHtcbiAgICAgICAgLy8gRm9ybURhdGHvvIzkuI3lpITnkIZcbiAgICAgICAgcGF5bG9hZCA9IGRhdGE7XG4gICAgICB9IGVsc2UgaWYgKGhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID09PSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykge1xuICAgICAgICBwYXlsb2FkID0gdG9RdWVyeVN0cmluZyhkYXRhKTtcbiAgICAgIH0gZWxzZSBpZiAoYm9keSkge1xuICAgICAgICBwYXlsb2FkID0gYm9keTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOWFtuWug+aDheWGtVxuICAgICAgICBwYXlsb2FkID0gZGF0YSA/IEpTT04uc3RyaW5naWZ5KGRhdGEpIDogdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBpZiAod2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICAgIGFqYXgud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGFqYXguc2VuZChwYXlsb2FkKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZW5BZGFwdGVyKCkge1xuICBjb25zdCBhZGFwdGVyOiBTREtBZGFwdGVySW50ZXJmYWNlID0ge1xuICAgIHJvb3Q6IHdpbmRvdyxcbiAgICByZXFDbGFzczogV2ViUmVxdWVzdCxcbiAgICB3c0NsYXNzOiBXZWJTb2NrZXQsXG4gICAgbG9jYWxTdG9yYWdlOiBsb2NhbFN0b3JhZ2UsXG4gICAgc2Vzc2lvblN0b3JhZ2U6IHNlc3Npb25TdG9yYWdlXG4gIH07XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG5leHBvcnQgeyBnZW5BZGFwdGVyLCBXZWJSZXF1ZXN0IH07XG4iXX0=