"use strict";
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
exports.registerAnalytics = void 0;
var utilities_1 = require("@cloudbase/utilities");
var ERRORS = utilities_1.constants.ERRORS, COMMUNITY_SITE_URL = utilities_1.constants.COMMUNITY_SITE_URL;
var catchErrorsDecorator = utilities_1.helpers.catchErrorsDecorator;
var COMPONENT_NAME = 'analytics';
var reportTypes = ['mall'];
function validateAnalyticsData(data) {
    if (Object.prototype.toString.call(data).slice(8, -1) !== 'Object') {
        return false;
    }
    var report_data = data.report_data, report_type = data.report_type;
    if (reportTypes.includes(report_type) === false) {
        return false;
    }
    if (Object.prototype.toString.call(report_data).slice(8, -1) !== 'Object') {
        return false;
    }
    if (!Number.isInteger(report_data.action_time)) {
        return false;
    }
    if (typeof report_data.action_type !== 'string') {
        return false;
    }
    return true;
}
var CloudbaseAnalytics = (function () {
    function CloudbaseAnalytics() {
    }
    CloudbaseAnalytics.prototype.analytics = function (requestData) {
        return __awaiter(this, void 0, void 0, function () {
            var action, transformData, params, request;
            return __generator(this, function (_a) {
                if (!validateAnalyticsData(requestData)) {
                    throw new Error(JSON.stringify({
                        code: ERRORS.INVALID_PARAMS,
                        msg: "[" + COMPONENT_NAME + ".analytics] invalid report data"
                    }));
                }
                action = 'analytics.report';
                transformData = {
                    analytics_scene: requestData.report_type,
                    analytics_data: Object.assign({}, requestData.report_data)
                };
                params = {
                    requestData: transformData
                };
                request = this.request;
                request.send(action, params);
                return [2];
            });
        });
    };
    __decorate([
        catchErrorsDecorator({
            customInfo: {
                className: 'Cloudbase',
                methodName: 'analytics'
            },
            title: '上报调用失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 analytics() 的语法或参数是否正确',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], CloudbaseAnalytics.prototype, "analytics", null);
    return CloudbaseAnalytics;
}());
var cloudbaseAnalytics = new CloudbaseAnalytics();
var component = {
    name: COMPONENT_NAME,
    entity: {
        analytics: cloudbaseAnalytics.analytics
    }
};
try {
    cloudbase.registerComponent(component);
}
catch (e) { }
function registerAnalytics(app) {
    try {
        app.registerComponent(component);
    }
    catch (e) {
        console.warn(e);
    }
}
exports.registerAnalytics = registerAnalytics;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0RBQXlEO0FBSWpELElBQUEsTUFBTSxHQUF3QixxQkFBUyxPQUFqQyxFQUFDLGtCQUFrQixHQUFLLHFCQUFTLG1CQUFkLENBQWU7QUFDeEMsSUFBQSxvQkFBb0IsR0FBSyxtQkFBTyxxQkFBWixDQUFhO0FBRXpDLElBQU0sY0FBYyxHQUFHLFdBQVcsQ0FBQztBQUVuQyxJQUFNLFdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBRTVCLFNBQVMscUJBQXFCLENBQUMsSUFBaUI7SUFDOUMsSUFBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUNoRSxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRU8sSUFBQSxXQUFXLEdBQWlCLElBQUksWUFBckIsRUFBQyxXQUFXLEdBQUssSUFBSSxZQUFULENBQVM7SUFFeEMsSUFBRyxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssRUFBRTtRQUM5QyxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsSUFBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUN2RSxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsSUFBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQzdDLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxJQUFHLE9BQU8sV0FBVyxDQUFDLFdBQVcsS0FBSyxRQUFRLEVBQUU7UUFDOUMsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUNELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQztBQUVEO0lBQUE7SUFvQ0EsQ0FBQztJQXZCYyxzQ0FBUyxHQUF0QixVQUF1QixXQUF3Qjs7OztnQkFDN0MsSUFBRyxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUN0QyxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7d0JBQzdCLElBQUksRUFBRSxNQUFNLENBQUMsY0FBYzt3QkFDM0IsR0FBRyxFQUFFLE1BQUksY0FBYyxvQ0FBaUM7cUJBQ3pELENBQUMsQ0FBQyxDQUFBO2lCQUNKO2dCQUVLLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQztnQkFFNUIsYUFBYSxHQUF1QjtvQkFDeEMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxXQUFXO29CQUN4QyxjQUFjLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztpQkFDMUQsQ0FBQTtnQkFFSyxNQUFNLEdBQUc7b0JBQ2IsV0FBVyxFQUFFLGFBQWE7aUJBQzNCLENBQUM7Z0JBRUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBRTdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxDQUFDOzs7O0tBQzdCO0lBdEJEO1FBWkcsb0JBQW9CLENBQUM7WUFDcEIsVUFBVSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxXQUFXO2dCQUN0QixVQUFVLEVBQUUsV0FBVzthQUN4QjtZQUNELEtBQUssRUFBRSxRQUFRO1lBQ2YsUUFBUSxFQUFFO2dCQUNSLFVBQVU7Z0JBQ1YsaUNBQWlDO2dCQUNqQyxpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7Ozt1REF1Qkg7SUFDSCx5QkFBQztDQUFBLEFBcENELElBb0NDO0FBRUQsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7QUFFcEQsSUFBTSxTQUFTLEdBQXdCO0lBQ3JDLElBQUksRUFBRSxjQUFjO0lBQ3BCLE1BQU0sRUFBRTtRQUNOLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxTQUFTO0tBQ3hDO0NBQ0YsQ0FBQTtBQUNELElBQUk7SUFDRixTQUFTLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDeEM7QUFBQyxPQUFNLENBQUMsRUFBRSxHQUFHO0FBRWQsU0FBZ0IsaUJBQWlCLENBQUMsR0FBeUM7SUFDekUsSUFBSTtRQUNGLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNsQztJQUFDLE9BQU0sQ0FBQyxFQUFFO1FBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUM7QUFORCw4Q0FNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbG91ZGJhc2UgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcbmltcG9ydCB7IElDbG91ZGJhc2VDb21wb25lbnQgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBJUmVwb3J0RGF0YSxJQW5hbHl0aWNzRGF0YUl0ZW0gfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2FuYWx5dGljcyc7XG5pbXBvcnQgeyBjb25zdGFudHMsaGVscGVycyB9IGZyb20gJ0BjbG91ZGJhc2UvdXRpbGl0aWVzJztcblxuZGVjbGFyZSBjb25zdCBjbG91ZGJhc2U6IElDbG91ZGJhc2U7XG5cbmNvbnN0IHsgRVJST1JTLENPTU1VTklUWV9TSVRFX1VSTCB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyBjYXRjaEVycm9yc0RlY29yYXRvciB9ID0gaGVscGVycztcblxuY29uc3QgQ09NUE9ORU5UX05BTUUgPSAnYW5hbHl0aWNzJztcblxuY29uc3QgcmVwb3J0VHlwZXMgPSBbJ21hbGwnXVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUFuYWx5dGljc0RhdGEoZGF0YTogSVJlcG9ydERhdGEpOiBib29sZWFuIHtcbiAgaWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGRhdGEpLnNsaWNlKDgsLTEpICE9PSAnT2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgeyByZXBvcnRfZGF0YSxyZXBvcnRfdHlwZSB9ID0gZGF0YVxuXG4gIGlmKHJlcG9ydFR5cGVzLmluY2x1ZGVzKHJlcG9ydF90eXBlKSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChyZXBvcnRfZGF0YSkuc2xpY2UoOCwtMSkgIT09ICdPYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBpZighTnVtYmVyLmlzSW50ZWdlcihyZXBvcnRfZGF0YS5hY3Rpb25fdGltZSkpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGlmKHR5cGVvZiByZXBvcnRfZGF0YS5hY3Rpb25fdHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5jbGFzcyBDbG91ZGJhc2VBbmFseXRpY3Mge1xuICAgIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgICBjdXN0b21JbmZvOiB7XG4gICAgICAgIGNsYXNzTmFtZTogJ0Nsb3VkYmFzZScsXG4gICAgICAgIG1ldGhvZE5hbWU6ICdhbmFseXRpY3MnXG4gICAgICB9LFxuICAgICAgdGl0bGU6ICfkuIrmiqXosIPnlKjlpLHotKUnLFxuICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAgICcgIDEgLSDosIPnlKggYW5hbHl0aWNzKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICAgIF1cbiAgICB9KVxuICBwdWJsaWMgYXN5bmMgYW5hbHl0aWNzKHJlcXVlc3REYXRhOiBJUmVwb3J0RGF0YSkge1xuICAgIGlmKCF2YWxpZGF0ZUFuYWx5dGljc0RhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgIG1zZzogYFske0NPTVBPTkVOVF9OQU1FfS5hbmFseXRpY3NdIGludmFsaWQgcmVwb3J0IGRhdGFgXG4gICAgICB9KSlcbiAgICB9XG5cbiAgICBjb25zdCBhY3Rpb24gPSAnYW5hbHl0aWNzLnJlcG9ydCc7XG5cbiAgICBjb25zdCB0cmFuc2Zvcm1EYXRhOiBJQW5hbHl0aWNzRGF0YUl0ZW0gPSB7XG4gICAgICBhbmFseXRpY3Nfc2NlbmU6IHJlcXVlc3REYXRhLnJlcG9ydF90eXBlLFxuICAgICAgYW5hbHl0aWNzX2RhdGE6IE9iamVjdC5hc3NpZ24oe30scmVxdWVzdERhdGEucmVwb3J0X2RhdGEpXG4gICAgfVxuXG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgcmVxdWVzdERhdGE6IHRyYW5zZm9ybURhdGFcbiAgICB9O1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCByZXF1ZXN0ID0gdGhpcy5yZXF1ZXN0O1xuXG4gICAgcmVxdWVzdC5zZW5kKGFjdGlvbixwYXJhbXMpO1xuICB9XG59XG5cbmNvbnN0IGNsb3VkYmFzZUFuYWx5dGljcyA9IG5ldyBDbG91ZGJhc2VBbmFseXRpY3MoKTtcblxuY29uc3QgY29tcG9uZW50OiBJQ2xvdWRiYXNlQ29tcG9uZW50ID0ge1xuICBuYW1lOiBDT01QT05FTlRfTkFNRSxcbiAgZW50aXR5OiB7XG4gICAgYW5hbHl0aWNzOiBjbG91ZGJhc2VBbmFseXRpY3MuYW5hbHl0aWNzXG4gIH1cbn1cbnRyeSB7XG4gIGNsb3VkYmFzZS5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xufSBjYXRjaChlKSB7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQW5hbHl0aWNzKGFwcDogUGljazxJQ2xvdWRiYXNlLCdyZWdpc3RlckNvbXBvbmVudCc+KSB7XG4gIHRyeSB7XG4gICAgYXBwLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gIH0gY2F0Y2goZSkge1xuICAgIGNvbnNvbGUud2FybihlKTtcbiAgfVxufSJdfQ==