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
exports.registerFunctions = void 0;
var utilities_1 = require("@cloudbase/utilities");
var getSdkName = utilities_1.constants.getSdkName, ERRORS = utilities_1.constants.ERRORS, COMMUNITY_SITE_URL = utilities_1.constants.COMMUNITY_SITE_URL;
var execCallback = utilities_1.utils.execCallback;
var catchErrorsDecorator = utilities_1.helpers.catchErrorsDecorator;
var COMPONENT_NAME = 'functions';
var CloudbaseFunctions = (function () {
    function CloudbaseFunctions() {
    }
    CloudbaseFunctions.prototype.callFunction = function (options, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var name, data, query, parse, search, jsonData, action, params, request, res, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = options.name, data = options.data, query = options.query, parse = options.parse, search = options.search;
                        if (!name) {
                            throw new Error(JSON.stringify({
                                code: ERRORS.INVALID_PARAMS,
                                msg: "[" + COMPONENT_NAME + ".callFunction] invalid function name"
                            }));
                        }
                        try {
                            jsonData = data ? JSON.stringify(data) : '';
                        }
                        catch (e) {
                            throw new Error(JSON.stringify({
                                code: ERRORS.INVALID_PARAMS,
                                msg: "[" + COMPONENT_NAME + ".callFunction] invalid data"
                            }));
                        }
                        action = 'functions.invokeFunction';
                        params = {
                            inQuery: query,
                            parse: parse,
                            search: search,
                            function_name: name,
                            request_data: jsonData
                        };
                        request = this.request;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, request.send(action, params)];
                    case 2:
                        res = _a.sent();
                        if (res.code) {
                            return [2, execCallback(callback, null, res)];
                        }
                        else {
                            result = res.data.response_data;
                            if (parse) {
                                return [2, execCallback(callback, null, {
                                        result: result,
                                        requestId: res.requestId
                                    })];
                            }
                            else {
                                try {
                                    result = JSON.parse(res.data.response_data);
                                    return [2, execCallback(callback, null, {
                                            result: result,
                                            requestId: res.requestId
                                        })];
                                }
                                catch (e) {
                                    execCallback(callback, new Error("[" + getSdkName() + "][" + ERRORS.INVALID_PARAMS + "][" + COMPONENT_NAME + ".callFunction] response data must be json"));
                                }
                            }
                        }
                        return [3, 4];
                    case 3:
                        e_1 = _a.sent();
                        execCallback(callback, e_1);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    __decorate([
        catchErrorsDecorator({
            customInfo: {
                className: 'Cloudbase',
                methodName: 'callFunction'
            },
            title: '函数调用失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 callFunction() 的语法或参数是否正确',
                '  2 - 当前环境下是否存在此函数',
                '  3 - 函数安全规则是否限制了当前登录状态访问',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Function]),
        __metadata("design:returntype", Promise)
    ], CloudbaseFunctions.prototype, "callFunction", null);
    return CloudbaseFunctions;
}());
var cloudbaseFunctions = new CloudbaseFunctions();
var component = {
    name: COMPONENT_NAME,
    entity: {
        callFunction: cloudbaseFunctions.callFunction
    }
};
try {
    cloudbase.registerComponent(component);
}
catch (e) { }
function registerFunctions(app) {
    try {
        app.registerComponent(component);
    }
    catch (e) {
        console.warn(e);
    }
}
exports.registerFunctions = registerFunctions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0RBQStEO0FBSXZELElBQUEsVUFBVSxHQUFpQyxxQkFBUyxXQUExQyxFQUFFLE1BQU0sR0FBeUIscUJBQVMsT0FBbEMsRUFBRSxrQkFBa0IsR0FBSyxxQkFBUyxtQkFBZCxDQUFlO0FBQ3JELElBQUEsWUFBWSxHQUFLLGlCQUFLLGFBQVYsQ0FBVztBQUN2QixJQUFBLG9CQUFvQixHQUFLLG1CQUFPLHFCQUFaLENBQWE7QUFFekMsSUFBTSxjQUFjLEdBQUcsV0FBVyxDQUFDO0FBRW5DO0lBQUE7SUF5RUEsQ0FBQztJQTFEYyx5Q0FBWSxHQUF6QixVQUEwQixPQUE0QixFQUFDLFFBQWtCOzs7Ozs7d0JBQy9ELElBQUksR0FBaUMsT0FBTyxLQUF4QyxFQUFFLElBQUksR0FBMkIsT0FBTyxLQUFsQyxFQUFFLEtBQUssR0FBb0IsT0FBTyxNQUEzQixFQUFFLEtBQUssR0FBYSxPQUFPLE1BQXBCLEVBQUUsTUFBTSxHQUFLLE9BQU8sT0FBWixDQUFhO3dCQUNyRCxJQUFJLENBQUMsSUFBSSxFQUFFOzRCQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQ0FDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjO2dDQUMzQixHQUFHLEVBQUUsTUFBSSxjQUFjLHlDQUFzQzs2QkFDOUQsQ0FBQyxDQUFDLENBQUM7eUJBQ0w7d0JBRUQsSUFBSTs0QkFDRixRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7eUJBQzdDO3dCQUFDLE9BQU8sQ0FBQyxFQUFFOzRCQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQ0FDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjO2dDQUMzQixHQUFHLEVBQUUsTUFBSSxjQUFjLGdDQUE2Qjs2QkFDckQsQ0FBQyxDQUFDLENBQUM7eUJBQ0w7d0JBRUssTUFBTSxHQUFHLDBCQUEwQixDQUFDO3dCQUVwQyxNQUFNLEdBQUc7NEJBQ2IsT0FBTyxFQUFFLEtBQUs7NEJBQ2QsS0FBSyxPQUFBOzRCQUNMLE1BQU0sUUFBQTs0QkFDTixhQUFhLEVBQUUsSUFBSTs0QkFDbkIsWUFBWSxFQUFFLFFBQVE7eUJBQ3ZCLENBQUM7d0JBRUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7Ozs7d0JBR2YsV0FBTSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBQTs7d0JBQXhDLEdBQUcsR0FBRyxTQUFrQzt3QkFDOUMsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFOzRCQUNaLFdBQU8sWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLEVBQUM7eUJBQ3hDOzZCQUFNOzRCQUNELE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzs0QkFFcEMsSUFBSSxLQUFLLEVBQUU7Z0NBQ1QsV0FBTyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksRUFBRTt3Q0FDakMsTUFBTSxRQUFBO3dDQUNOLFNBQVMsRUFBRSxHQUFHLENBQUMsU0FBUztxQ0FDekIsQ0FBQyxFQUFDOzZCQUNKO2lDQUFNO2dDQUNMLElBQUk7b0NBQ0YsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQ0FDNUMsV0FBTyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRTs0Q0FDbEMsTUFBTSxRQUFBOzRDQUNOLFNBQVMsRUFBRSxHQUFHLENBQUMsU0FBUzt5Q0FDekIsQ0FBQyxFQUFDO2lDQUNKO2dDQUFDLE9BQU8sQ0FBQyxFQUFFO29DQUNWLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxLQUFLLENBQUMsTUFBSSxVQUFVLEVBQUUsVUFBSyxNQUFNLENBQUMsY0FBYyxVQUFLLGNBQWMsOENBQTJDLENBQUMsQ0FBQyxDQUFDO2lDQUM3STs2QkFDRjt5QkFDRjs7Ozt3QkFFRCxZQUFZLENBQUMsUUFBUSxFQUFDLEdBQUMsQ0FBQyxDQUFDOzs7Ozs7S0FFNUI7SUF6REQ7UUFkQyxvQkFBb0IsQ0FBQztZQUNwQixVQUFVLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLFdBQVc7Z0JBQ3RCLFVBQVUsRUFBRSxjQUFjO2FBQzNCO1lBQ0QsS0FBSyxFQUFFLFFBQVE7WUFDZixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVixvQ0FBb0M7Z0JBQ3BDLG9CQUFvQjtnQkFDcEIsMkJBQTJCO2dCQUMzQixpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7aURBQytELFFBQVE7OzBEQXlEeEU7SUFDSCx5QkFBQztDQUFBLEFBekVELElBeUVDO0FBRUQsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7QUFFcEQsSUFBTSxTQUFTLEdBQXVCO0lBQ3BDLElBQUksRUFBRSxjQUFjO0lBQ3BCLE1BQU0sRUFBRTtRQUNOLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxZQUFZO0tBQzlDO0NBQ0YsQ0FBQTtBQUNELElBQUc7SUFDRCxTQUFTLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDeEM7QUFBQSxPQUFNLENBQUMsRUFBQyxHQUFFO0FBRVgsU0FBZ0IsaUJBQWlCLENBQUMsR0FBeUM7SUFDekUsSUFBRztRQUNELEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNsQztJQUFBLE9BQU0sQ0FBQyxFQUFDO1FBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUM7QUFORCw4Q0FNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbG91ZGJhc2UgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcbmltcG9ydCB7IElDbG91ZGJhc2VDb21wb25lbnQgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBJQ2FsbEZ1bmN0aW9uT3B0aW9ucyB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvZnVuY3Rpb25zJztcbmltcG9ydCB7IGNvbnN0YW50cyx1dGlscyxoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuXG5kZWNsYXJlIGNvbnN0IGNsb3VkYmFzZTogSUNsb3VkYmFzZTtcblxuY29uc3QgeyBnZXRTZGtOYW1lICxFUlJPUlMsIENPTU1VTklUWV9TSVRFX1VSTCB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyBleGVjQ2FsbGJhY2sgfSA9IHV0aWxzO1xuY29uc3QgeyBjYXRjaEVycm9yc0RlY29yYXRvciB9ID0gaGVscGVycztcblxuY29uc3QgQ09NUE9ORU5UX05BTUUgPSAnZnVuY3Rpb25zJztcblxuY2xhc3MgQ2xvdWRiYXNlRnVuY3Rpb25ze1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIGN1c3RvbUluZm86IHtcbiAgICAgIGNsYXNzTmFtZTogJ0Nsb3VkYmFzZScsXG4gICAgICBtZXRob2ROYW1lOiAnY2FsbEZ1bmN0aW9uJ1xuICAgIH0sXG4gICAgdGl0bGU6ICflh73mlbDosIPnlKjlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggY2FsbEZ1bmN0aW9uKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3njq/looPkuIvmmK/lkKblrZjlnKjmraTlh73mlbAnLFxuICAgICAgJyAgMyAtIOWHveaVsOWuieWFqOinhOWImeaYr+WQpumZkOWItuS6huW9k+WJjeeZu+W9leeKtuaAgeiuv+mXricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGNhbGxGdW5jdGlvbihvcHRpb25zOklDYWxsRnVuY3Rpb25PcHRpb25zLGNhbGxiYWNrPzpGdW5jdGlvbil7XG4gICAgY29uc3QgeyBuYW1lLCBkYXRhLCBxdWVyeSwgcGFyc2UsIHNlYXJjaCB9ID0gb3B0aW9ucztcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgbXNnOiBgWyR7Q09NUE9ORU5UX05BTUV9LmNhbGxGdW5jdGlvbl0gaW52YWxpZCBmdW5jdGlvbiBuYW1lYFxuICAgICAgfSkpO1xuICAgIH1cbiAgICBsZXQganNvbkRhdGE7XG4gICAgdHJ5IHtcbiAgICAgIGpzb25EYXRhID0gZGF0YSA/IEpTT04uc3RyaW5naWZ5KGRhdGEpIDogJyc7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICBtc2c6IGBbJHtDT01QT05FTlRfTkFNRX0uY2FsbEZ1bmN0aW9uXSBpbnZhbGlkIGRhdGFgXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aW9uID0gJ2Z1bmN0aW9ucy5pbnZva2VGdW5jdGlvbic7XG5cbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBpblF1ZXJ5OiBxdWVyeSxcbiAgICAgIHBhcnNlLFxuICAgICAgc2VhcmNoLFxuICAgICAgZnVuY3Rpb25fbmFtZTogbmFtZSxcbiAgICAgIHJlcXVlc3RfZGF0YToganNvbkRhdGFcbiAgICB9O1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCByZXF1ZXN0ID0gdGhpcy5yZXF1ZXN0O1xuXG4gICAgdHJ5e1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdC5zZW5kKGFjdGlvbiwgcGFyYW1zKTtcbiAgICAgIGlmIChyZXMuY29kZSkge1xuICAgICAgICByZXR1cm4gZXhlY0NhbGxiYWNrKGNhbGxiYWNrLG51bGwscmVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCByZXN1bHQgPSByZXMuZGF0YS5yZXNwb25zZV9kYXRhO1xuICAgICAgICAvLyBwYXJzZSDkuLogdHJ1ZSDml7bmnI3liqHnq6/op6PmnpAgSlNPTu+8jFNESyDkuI3lho3mrKHop6PmnpBcbiAgICAgICAgaWYgKHBhcnNlKSB7XG4gICAgICAgICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjayxudWxsLCB7XG4gICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICByZXF1ZXN0SWQ6IHJlcy5yZXF1ZXN0SWRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZShyZXMuZGF0YS5yZXNwb25zZV9kYXRhKTtcbiAgICAgICAgICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssIG51bGwsIHtcbiAgICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgICByZXF1ZXN0SWQ6IHJlcy5yZXF1ZXN0SWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGV4ZWNDYWxsYmFjayhjYWxsYmFjaywgbmV3IEVycm9yKGBbJHtnZXRTZGtOYW1lKCl9XVske0VSUk9SUy5JTlZBTElEX1BBUkFNU31dWyR7Q09NUE9ORU5UX05BTUV9LmNhbGxGdW5jdGlvbl0gcmVzcG9uc2UgZGF0YSBtdXN0IGJlIGpzb25gKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfWNhdGNoKGUpe1xuICAgICAgZXhlY0NhbGxiYWNrKGNhbGxiYWNrLGUpO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBjbG91ZGJhc2VGdW5jdGlvbnMgPSBuZXcgQ2xvdWRiYXNlRnVuY3Rpb25zKCk7XG5cbmNvbnN0IGNvbXBvbmVudDpJQ2xvdWRiYXNlQ29tcG9uZW50ID0ge1xuICBuYW1lOiBDT01QT05FTlRfTkFNRSxcbiAgZW50aXR5OiB7XG4gICAgY2FsbEZ1bmN0aW9uOiBjbG91ZGJhc2VGdW5jdGlvbnMuY2FsbEZ1bmN0aW9uXG4gIH1cbn1cbnRyeXtcbiAgY2xvdWRiYXNlLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG59Y2F0Y2goZSl7fVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJGdW5jdGlvbnMoYXBwOlBpY2s8SUNsb3VkYmFzZSwgJ3JlZ2lzdGVyQ29tcG9uZW50Jz4pe1xuICB0cnl7XG4gICAgYXBwLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gIH1jYXRjaChlKXtcbiAgICBjb25zb2xlLndhcm4oZSk7XG4gIH1cbn0iXX0=