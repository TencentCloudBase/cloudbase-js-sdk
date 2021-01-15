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
    if (report_data.action_time !== undefined && !Number.isInteger(report_data.action_time)) {
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
            var action, action_time, transformData, params, request;
            return __generator(this, function (_a) {
                if (!validateAnalyticsData(requestData)) {
                    throw new Error(JSON.stringify({
                        code: ERRORS.INVALID_PARAMS,
                        msg: "[" + COMPONENT_NAME + ".analytics] invalid report data"
                    }));
                }
                action = 'analytics.report';
                action_time = requestData.report_data.action_time === undefined ? Math.floor(Date.now() / 1000) : requestData.report_data.action_time;
                transformData = {
                    analytics_scene: requestData.report_type,
                    analytics_data: Object.assign({}, requestData.report_data, {
                        action_time: action_time
                    })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0RBQXlEO0FBSWpELElBQUEsTUFBTSxHQUF3QixxQkFBUyxPQUFqQyxFQUFDLGtCQUFrQixHQUFLLHFCQUFTLG1CQUFkLENBQWU7QUFDeEMsSUFBQSxvQkFBb0IsR0FBSyxtQkFBTyxxQkFBWixDQUFhO0FBRXpDLElBQU0sY0FBYyxHQUFHLFdBQVcsQ0FBQztBQUVuQyxJQUFNLFdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBRTVCLFNBQVMscUJBQXFCLENBQUMsSUFBaUI7SUFDOUMsSUFBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUNoRSxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRU8sSUFBQSxXQUFXLEdBQWlCLElBQUksWUFBckIsRUFBQyxXQUFXLEdBQUssSUFBSSxZQUFULENBQVM7SUFFeEMsSUFBRyxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssRUFBRTtRQUM5QyxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsSUFBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUN2RSxPQUFPLEtBQUssQ0FBQTtLQUNiO0lBRUQsSUFBRyxXQUFXLENBQUMsV0FBVyxLQUFLLFNBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ3RGLE9BQU8sS0FBSyxDQUFBO0tBQ2I7SUFFRCxJQUFHLE9BQU8sV0FBVyxDQUFDLFdBQVcsS0FBSyxRQUFRLEVBQUU7UUFDOUMsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUNELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQztBQUVEO0lBQUE7SUF1Q0EsQ0FBQztJQTFCYyxzQ0FBUyxHQUF0QixVQUF1QixXQUF3Qjs7OztnQkFDN0MsSUFBRyxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUN0QyxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7d0JBQzdCLElBQUksRUFBRSxNQUFNLENBQUMsY0FBYzt3QkFDM0IsR0FBRyxFQUFFLE1BQUksY0FBYyxvQ0FBaUM7cUJBQ3pELENBQUMsQ0FBQyxDQUFBO2lCQUNKO2dCQUVLLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQztnQkFFNUIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFBO2dCQUNySSxhQUFhLEdBQXVCO29CQUN4QyxlQUFlLEVBQUUsV0FBVyxDQUFDLFdBQVc7b0JBQ3hDLGNBQWMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBQyxXQUFXLENBQUMsV0FBVyxFQUFDO3dCQUN2RCxXQUFXLGFBQUE7cUJBQ1osQ0FBQztpQkFDSCxDQUFBO2dCQUVLLE1BQU0sR0FBRztvQkFDYixXQUFXLEVBQUUsYUFBYTtpQkFDM0IsQ0FBQztnQkFFSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFFN0IsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLENBQUM7Ozs7S0FDN0I7SUF6QkQ7UUFaQyxvQkFBb0IsQ0FBQztZQUNwQixVQUFVLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLFdBQVc7Z0JBQ3RCLFVBQVUsRUFBRSxXQUFXO2FBQ3hCO1lBQ0QsS0FBSyxFQUFFLFFBQVE7WUFDZixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVixpQ0FBaUM7Z0JBQ2pDLGlLQUE2QixrQkFBb0I7YUFDbEQ7U0FDRixDQUFDOzs7O3VEQTBCRDtJQUNILHlCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7QUFFRCxJQUFNLGtCQUFrQixHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztBQUVwRCxJQUFNLFNBQVMsR0FBd0I7SUFDckMsSUFBSSxFQUFFLGNBQWM7SUFDcEIsTUFBTSxFQUFFO1FBQ04sU0FBUyxFQUFFLGtCQUFrQixDQUFDLFNBQVM7S0FDeEM7Q0FDRixDQUFBO0FBQ0QsSUFBSTtJQUNGLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUN4QztBQUFDLE9BQU0sQ0FBQyxFQUFFLEdBQUc7QUFFZCxTQUFnQixpQkFBaUIsQ0FBQyxHQUF5QztJQUN6RSxJQUFJO1FBQ0YsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2xDO0lBQUMsT0FBTSxDQUFDLEVBQUU7UUFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pCO0FBQ0gsQ0FBQztBQU5ELDhDQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNsb3VkYmFzZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNvbXBvbmVudCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY29tcG9uZW50JztcbmltcG9ydCB7IElSZXBvcnREYXRhLElBbmFseXRpY3NEYXRhSXRlbSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvYW5hbHl0aWNzJztcbmltcG9ydCB7IGNvbnN0YW50cyxoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuXG5kZWNsYXJlIGNvbnN0IGNsb3VkYmFzZTogSUNsb3VkYmFzZTtcblxuY29uc3QgeyBFUlJPUlMsQ09NTVVOSVRZX1NJVEVfVVJMIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IGNhdGNoRXJyb3JzRGVjb3JhdG9yIH0gPSBoZWxwZXJzO1xuXG5jb25zdCBDT01QT05FTlRfTkFNRSA9ICdhbmFseXRpY3MnO1xuXG5jb25zdCByZXBvcnRUeXBlcyA9IFsnbWFsbCddXG5cbmZ1bmN0aW9uIHZhbGlkYXRlQW5hbHl0aWNzRGF0YShkYXRhOiBJUmVwb3J0RGF0YSk6IGJvb2xlYW4ge1xuICBpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0YSkuc2xpY2UoOCwtMSkgIT09ICdPYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb25zdCB7IHJlcG9ydF9kYXRhLHJlcG9ydF90eXBlIH0gPSBkYXRhXG5cbiAgaWYocmVwb3J0VHlwZXMuaW5jbHVkZXMocmVwb3J0X3R5cGUpID09PSBmYWxzZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgaWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHJlcG9ydF9kYXRhKS5zbGljZSg4LC0xKSAhPT0gJ09iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGlmKHJlcG9ydF9kYXRhLmFjdGlvbl90aW1lICE9PSB1bmRlZmluZWQgJiYgIU51bWJlci5pc0ludGVnZXIocmVwb3J0X2RhdGEuYWN0aW9uX3RpbWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBpZih0eXBlb2YgcmVwb3J0X2RhdGEuYWN0aW9uX3R5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuY2xhc3MgQ2xvdWRiYXNlQW5hbHl0aWNzIHtcbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICBjdXN0b21JbmZvOiB7XG4gICAgICBjbGFzc05hbWU6ICdDbG91ZGJhc2UnLFxuICAgICAgbWV0aG9kTmFtZTogJ2FuYWx5dGljcydcbiAgICB9LFxuICAgIHRpdGxlOiAn5LiK5oql6LCD55So5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGFuYWx5dGljcygpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGFuYWx5dGljcyhyZXF1ZXN0RGF0YTogSVJlcG9ydERhdGEpIHtcbiAgICBpZighdmFsaWRhdGVBbmFseXRpY3NEYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICBtc2c6IGBbJHtDT01QT05FTlRfTkFNRX0uYW5hbHl0aWNzXSBpbnZhbGlkIHJlcG9ydCBkYXRhYFxuICAgICAgfSkpXG4gICAgfVxuXG4gICAgY29uc3QgYWN0aW9uID0gJ2FuYWx5dGljcy5yZXBvcnQnO1xuXG4gICAgY29uc3QgYWN0aW9uX3RpbWUgPSByZXF1ZXN0RGF0YS5yZXBvcnRfZGF0YS5hY3Rpb25fdGltZSA9PT0gdW5kZWZpbmVkID8gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCkgOiByZXF1ZXN0RGF0YS5yZXBvcnRfZGF0YS5hY3Rpb25fdGltZVxuICAgIGNvbnN0IHRyYW5zZm9ybURhdGE6IElBbmFseXRpY3NEYXRhSXRlbSA9IHtcbiAgICAgIGFuYWx5dGljc19zY2VuZTogcmVxdWVzdERhdGEucmVwb3J0X3R5cGUsXG4gICAgICBhbmFseXRpY3NfZGF0YTogT2JqZWN0LmFzc2lnbih7fSxyZXF1ZXN0RGF0YS5yZXBvcnRfZGF0YSx7XG4gICAgICAgIGFjdGlvbl90aW1lXG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIHJlcXVlc3REYXRhOiB0cmFuc2Zvcm1EYXRhXG4gICAgfTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMucmVxdWVzdDtcblxuICAgIHJlcXVlc3Quc2VuZChhY3Rpb24scGFyYW1zKTtcbiAgfVxufVxuXG5jb25zdCBjbG91ZGJhc2VBbmFseXRpY3MgPSBuZXcgQ2xvdWRiYXNlQW5hbHl0aWNzKCk7XG5cbmNvbnN0IGNvbXBvbmVudDogSUNsb3VkYmFzZUNvbXBvbmVudCA9IHtcbiAgbmFtZTogQ09NUE9ORU5UX05BTUUsXG4gIGVudGl0eToge1xuICAgIGFuYWx5dGljczogY2xvdWRiYXNlQW5hbHl0aWNzLmFuYWx5dGljc1xuICB9XG59XG50cnkge1xuICBjbG91ZGJhc2UucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbn0gY2F0Y2goZSkgeyB9XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckFuYWx5dGljcyhhcHA6IFBpY2s8SUNsb3VkYmFzZSwncmVnaXN0ZXJDb21wb25lbnQnPikge1xuICB0cnkge1xuICAgIGFwcC5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xuICB9IGNhdGNoKGUpIHtcbiAgICBjb25zb2xlLndhcm4oZSk7XG4gIH1cbn0iXX0=