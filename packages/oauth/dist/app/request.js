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
exports.defaultRequest = exports.ErrorType = void 0;
var ErrorType;
(function (ErrorType) {
    ErrorType["UNREACHABLE"] = "unreachable";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
exports.defaultRequest = function (url, options) { return __awaiter(void 0, void 0, void 0, function () {
    var result, responseError, copyOptions, responseResult, jsonResponse, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = null;
                responseError = null;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                copyOptions = Object.assign({}, options);
                if (!copyOptions.method) {
                    copyOptions.method = 'GET';
                }
                if (copyOptions.body && typeof copyOptions.body !== 'string') {
                    copyOptions.body = JSON.stringify(copyOptions.body);
                }
                return [4, fetch(url, copyOptions)];
            case 2:
                responseResult = _a.sent();
                return [4, responseResult.json()];
            case 3:
                jsonResponse = _a.sent();
                if (responseResult.status >= 400) {
                    responseError = jsonResponse;
                    responseError.error_uri = new URL(url).pathname;
                }
                else {
                    result = jsonResponse;
                }
                return [3, 5];
            case 4:
                error_1 = _a.sent();
                responseError = {
                    error: ErrorType.UNREACHABLE,
                    error_description: error_1.message,
                    error_uri: new URL(url).pathname,
                };
                return [3, 5];
            case 5:
                if (responseError) {
                    throw responseError;
                }
                else {
                    return [2, result];
                }
                return [2];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRQSxJQUFZLFNBRVg7QUFGRCxXQUFZLFNBQVM7SUFDbkIsd0NBQTJCLENBQUE7QUFDN0IsQ0FBQyxFQUZXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBRXBCO0FBWVksUUFBQSxjQUFjLEdBQWMsVUFDdkMsR0FBVyxFQUNYLE9BQXdCOzs7OztnQkFFcEIsTUFBTSxHQUFhLElBQUksQ0FBQztnQkFDeEIsYUFBYSxHQUF5QixJQUFJLENBQUM7Ozs7Z0JBR3ZDLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3ZCLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2lCQUM1QjtnQkFDRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLElBQUksT0FBTyxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDNUQsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDckQ7Z0JBQ2dDLFdBQU0sS0FBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsRUFBQTs7Z0JBQXhELGNBQWMsR0FBYSxTQUE2QjtnQkFDekMsV0FBTSxjQUFjLENBQUMsSUFBSSxFQUFFLEVBQUE7O2dCQUExQyxZQUFZLEdBQUcsU0FBMkI7Z0JBQ2hELElBQUksY0FBYyxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7b0JBQ2hDLGFBQWEsR0FBRyxZQUE2QixDQUFDO29CQUM5QyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztpQkFDakQ7cUJBQU07b0JBQ0wsTUFBTSxHQUFHLFlBQWlCLENBQUM7aUJBQzVCOzs7O2dCQUVELGFBQWEsR0FBRztvQkFDZCxLQUFLLEVBQUUsU0FBUyxDQUFDLFdBQVc7b0JBQzVCLGlCQUFpQixFQUFFLE9BQUssQ0FBQyxPQUFPO29CQUNoQyxTQUFTLEVBQUUsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUTtpQkFDakMsQ0FBQzs7O2dCQUVKLElBQUksYUFBYSxFQUFFO29CQUNqQixNQUFNLGFBQWEsQ0FBQztpQkFDckI7cUJBQU07b0JBQ0wsV0FBTyxNQUFNLEVBQUM7aUJBQ2Y7Ozs7S0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0T3B0aW9ucyB7XG4gIGJvZHk/OiBhbnkgfCBudWxsO1xuICBoZWFkZXJzPzogYW55IHwgbnVsbDtcbiAgbWV0aG9kPzogc3RyaW5nO1xuXG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGVudW0gRXJyb3JUeXBlIHtcbiAgVU5SRUFDSEFCTEUgPSAndW5yZWFjaGFibGUnXG59XG5cbmV4cG9ydCB0eXBlIFJlcXVlc3RGbiA9IDxUPih1cmw6IHN0cmluZywgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zKSA9PiBQcm9taXNlPFQ+O1xuXG4vKiogQW4gRXJyb3IgRm9yIGFsbCBjb25jZXJuICoqL1xuZXhwb3J0IGludGVyZmFjZSBSZXNwb25zZUVycm9yIHtcbiAgZXJyb3I6IHN0cmluZztcbiAgZXJyb3JfZGVzY3JpcHRpb24/OiBzdHJpbmcgfCBudWxsO1xuICBlcnJvcl91cmk/OiBzdHJpbmcgfCBudWxsO1xuICBkZXRhaWxzPzogYW55IHwgbnVsbDtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRSZXF1ZXN0OiBSZXF1ZXN0Rm4gPSBhc3luYyA8VD4oXG4gIHVybDogc3RyaW5nLFxuICBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnMsXG4pOiBQcm9taXNlPFQ+ID0+IHtcbiAgbGV0IHJlc3VsdDogVCB8IG51bGwgPSBudWxsO1xuICBsZXQgcmVzcG9uc2VFcnJvcjogUmVzcG9uc2VFcnJvciB8IG51bGwgPSBudWxsO1xuICB0cnkge1xuICAgIC8vIE9iamVjdHMgbXVzdCBiZSBjb3BpZWQgdG8gcHJldmVudCBtb2RpZmljYXRpb24gb2YgZGF0YSBzdWNoIGFzIGJvZHkuXG4gICAgY29uc3QgY29weU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcbiAgICBpZiAoIWNvcHlPcHRpb25zLm1ldGhvZCkge1xuICAgICAgY29weU9wdGlvbnMubWV0aG9kID0gJ0dFVCc7XG4gICAgfVxuICAgIGlmIChjb3B5T3B0aW9ucy5ib2R5ICYmIHR5cGVvZiBjb3B5T3B0aW9ucy5ib2R5ICE9PSAnc3RyaW5nJykge1xuICAgICAgY29weU9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGNvcHlPcHRpb25zLmJvZHkpO1xuICAgIH1cbiAgICBjb25zdCByZXNwb25zZVJlc3VsdDogUmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIGNvcHlPcHRpb25zKTtcbiAgICBjb25zdCBqc29uUmVzcG9uc2UgPSBhd2FpdCByZXNwb25zZVJlc3VsdC5qc29uKCk7XG4gICAgaWYgKHJlc3BvbnNlUmVzdWx0LnN0YXR1cyA+PSA0MDApIHtcbiAgICAgIHJlc3BvbnNlRXJyb3IgPSBqc29uUmVzcG9uc2UgYXMgUmVzcG9uc2VFcnJvcjtcbiAgICAgIHJlc3BvbnNlRXJyb3IuZXJyb3JfdXJpID0gbmV3IFVSTCh1cmwpLnBhdGhuYW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSBqc29uUmVzcG9uc2UgYXMgVDtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzcG9uc2VFcnJvciA9IHtcbiAgICAgIGVycm9yOiBFcnJvclR5cGUuVU5SRUFDSEFCTEUsXG4gICAgICBlcnJvcl9kZXNjcmlwdGlvbjogZXJyb3IubWVzc2FnZSxcbiAgICAgIGVycm9yX3VyaTogbmV3IFVSTCh1cmwpLnBhdGhuYW1lLFxuICAgIH07XG4gIH1cbiAgaWYgKHJlc3BvbnNlRXJyb3IpIHtcbiAgICB0aHJvdyByZXNwb25zZUVycm9yO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07Il19