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
import { constants, utils, helpers } from '@cloudbase/utilities';
var getSdkName = constants.getSdkName, ERRORS = constants.ERRORS, COMMUNITY_SITE_URL = constants.COMMUNITY_SITE_URL;
var execCallback = utils.execCallback;
var catchErrorsDecorator = helpers.catchErrorsDecorator;
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
export function registerFunctions(app) {
    app.registerComponent(component);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsT0FBTyxFQUFFLFNBQVMsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFJdkQsSUFBQSxVQUFVLEdBQWlDLFNBQVMsV0FBMUMsRUFBRSxNQUFNLEdBQXlCLFNBQVMsT0FBbEMsRUFBRSxrQkFBa0IsR0FBSyxTQUFTLG1CQUFkLENBQWU7QUFDckQsSUFBQSxZQUFZLEdBQUssS0FBSyxhQUFWLENBQVc7QUFDdkIsSUFBQSxvQkFBb0IsR0FBSyxPQUFPLHFCQUFaLENBQWE7QUFFekMsSUFBTSxjQUFjLEdBQUcsV0FBVyxDQUFDO0FBRW5DO0lBQUE7SUF5RUEsQ0FBQztJQTFEYyx5Q0FBWSxHQUF6QixVQUEwQixPQUE0QixFQUFDLFFBQWtCOzs7Ozs7d0JBQy9ELElBQUksR0FBaUMsT0FBTyxLQUF4QyxFQUFFLElBQUksR0FBMkIsT0FBTyxLQUFsQyxFQUFFLEtBQUssR0FBb0IsT0FBTyxNQUEzQixFQUFFLEtBQUssR0FBYSxPQUFPLE1BQXBCLEVBQUUsTUFBTSxHQUFLLE9BQU8sT0FBWixDQUFhO3dCQUNyRCxJQUFJLENBQUMsSUFBSSxFQUFFOzRCQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQ0FDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjO2dDQUMzQixHQUFHLEVBQUUsTUFBSSxjQUFjLHlDQUFzQzs2QkFDOUQsQ0FBQyxDQUFDLENBQUM7eUJBQ0w7d0JBRUQsSUFBSTs0QkFDRixRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7eUJBQzdDO3dCQUFDLE9BQU8sQ0FBQyxFQUFFOzRCQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQ0FDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjO2dDQUMzQixHQUFHLEVBQUUsTUFBSSxjQUFjLGdDQUE2Qjs2QkFDckQsQ0FBQyxDQUFDLENBQUM7eUJBQ0w7d0JBRUssTUFBTSxHQUFHLDBCQUEwQixDQUFDO3dCQUVwQyxNQUFNLEdBQUc7NEJBQ2IsT0FBTyxFQUFFLEtBQUs7NEJBQ2QsS0FBSyxPQUFBOzRCQUNMLE1BQU0sUUFBQTs0QkFDTixhQUFhLEVBQUUsSUFBSTs0QkFDbkIsWUFBWSxFQUFFLFFBQVE7eUJBQ3ZCLENBQUM7d0JBRUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7Ozs7d0JBR2YsV0FBTSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBQTs7d0JBQXhDLEdBQUcsR0FBRyxTQUFrQzt3QkFDOUMsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFOzRCQUNaLFdBQU8sWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLEVBQUM7eUJBQ3hDOzZCQUFNOzRCQUNELE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzs0QkFFcEMsSUFBSSxLQUFLLEVBQUU7Z0NBQ1QsV0FBTyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksRUFBRTt3Q0FDakMsTUFBTSxRQUFBO3dDQUNOLFNBQVMsRUFBRSxHQUFHLENBQUMsU0FBUztxQ0FDekIsQ0FBQyxFQUFDOzZCQUNKO2lDQUFNO2dDQUNMLElBQUk7b0NBQ0YsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQ0FDNUMsV0FBTyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRTs0Q0FDbEMsTUFBTSxRQUFBOzRDQUNOLFNBQVMsRUFBRSxHQUFHLENBQUMsU0FBUzt5Q0FDekIsQ0FBQyxFQUFDO2lDQUNKO2dDQUFDLE9BQU8sQ0FBQyxFQUFFO29DQUNWLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxLQUFLLENBQUMsTUFBSSxVQUFVLEVBQUUsVUFBSyxNQUFNLENBQUMsY0FBYyxVQUFLLGNBQWMsOENBQTJDLENBQUMsQ0FBQyxDQUFDO2lDQUM3STs2QkFDRjt5QkFDRjs7Ozt3QkFFRCxZQUFZLENBQUMsUUFBUSxFQUFDLEdBQUMsQ0FBQyxDQUFDOzs7Ozs7S0FFNUI7SUF6REQ7UUFkQyxvQkFBb0IsQ0FBQztZQUNwQixVQUFVLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLFdBQVc7Z0JBQ3RCLFVBQVUsRUFBRSxjQUFjO2FBQzNCO1lBQ0QsS0FBSyxFQUFFLFFBQVE7WUFDZixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVixvQ0FBb0M7Z0JBQ3BDLG9CQUFvQjtnQkFDcEIsMkJBQTJCO2dCQUMzQixpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7aURBQytELFFBQVE7OzBEQXlEeEU7SUFDSCx5QkFBQztDQUFBLEFBekVELElBeUVDO0FBRUQsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7QUFFcEQsSUFBTSxTQUFTLEdBQXVCO0lBQ3BDLElBQUksRUFBRSxjQUFjO0lBQ3BCLE1BQU0sRUFBRTtRQUNOLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxZQUFZO0tBQzlDO0NBQ0YsQ0FBQTtBQUNELElBQUc7SUFDRCxTQUFTLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDeEM7QUFBQSxPQUFNLENBQUMsRUFBQyxHQUFFO0FBRVgsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEdBQWM7SUFDOUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ29tcG9uZW50IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jb21wb25lbnQnO1xuaW1wb3J0IHsgSUNhbGxGdW5jdGlvbk9wdGlvbnMgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBjb25zdGFudHMsdXRpbHMsaGVscGVycyB9IGZyb20gJ0BjbG91ZGJhc2UvdXRpbGl0aWVzJztcblxuZGVjbGFyZSBjb25zdCBjbG91ZGJhc2U6IElDbG91ZGJhc2U7XG5cbmNvbnN0IHsgZ2V0U2RrTmFtZSAsRVJST1JTLCBDT01NVU5JVFlfU0lURV9VUkwgfSA9IGNvbnN0YW50cztcbmNvbnN0IHsgZXhlY0NhbGxiYWNrIH0gPSB1dGlscztcbmNvbnN0IHsgY2F0Y2hFcnJvcnNEZWNvcmF0b3IgfSA9IGhlbHBlcnM7XG5cbmNvbnN0IENPTVBPTkVOVF9OQU1FID0gJ2Z1bmN0aW9ucyc7XG5cbmNsYXNzIENsb3VkYmFzZUZ1bmN0aW9uc3tcbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICBjdXN0b21JbmZvOiB7XG4gICAgICBjbGFzc05hbWU6ICdDbG91ZGJhc2UnLFxuICAgICAgbWV0aG9kTmFtZTogJ2NhbGxGdW5jdGlvbidcbiAgICB9LFxuICAgIHRpdGxlOiAn5Ye95pWw6LCD55So5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGNhbGxGdW5jdGlvbigpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN546v5aKD5LiL5piv5ZCm5a2Y5Zyo5q2k5Ye95pWwJyxcbiAgICAgICcgIDMgLSDlh73mlbDlronlhajop4TliJnmmK/lkKbpmZDliLbkuoblvZPliY3nmbvlvZXnirbmgIHorr/pl64nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBjYWxsRnVuY3Rpb24ob3B0aW9uczpJQ2FsbEZ1bmN0aW9uT3B0aW9ucyxjYWxsYmFjaz86RnVuY3Rpb24pe1xuICAgIGNvbnN0IHsgbmFtZSwgZGF0YSwgcXVlcnksIHBhcnNlLCBzZWFyY2ggfSA9IG9wdGlvbnM7XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgIG1zZzogYFske0NPTVBPTkVOVF9OQU1FfS5jYWxsRnVuY3Rpb25dIGludmFsaWQgZnVuY3Rpb24gbmFtZWBcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgbGV0IGpzb25EYXRhO1xuICAgIHRyeSB7XG4gICAgICBqc29uRGF0YSA9IGRhdGEgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6ICcnO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgbXNnOiBgWyR7Q09NUE9ORU5UX05BTUV9LmNhbGxGdW5jdGlvbl0gaW52YWxpZCBkYXRhYFxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGlvbiA9ICdmdW5jdGlvbnMuaW52b2tlRnVuY3Rpb24nO1xuXG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgaW5RdWVyeTogcXVlcnksXG4gICAgICBwYXJzZSxcbiAgICAgIHNlYXJjaCxcbiAgICAgIGZ1bmN0aW9uX25hbWU6IG5hbWUsXG4gICAgICByZXF1ZXN0X2RhdGE6IGpzb25EYXRhXG4gICAgfTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMucmVxdWVzdDtcblxuICAgIHRyeXtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3Quc2VuZChhY3Rpb24sIHBhcmFtcyk7XG4gICAgICBpZiAocmVzLmNvZGUpIHtcbiAgICAgICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjayxudWxsLHJlcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcmVzdWx0ID0gcmVzLmRhdGEucmVzcG9uc2VfZGF0YTtcbiAgICAgICAgLy8gcGFyc2Ug5Li6IHRydWUg5pe25pyN5Yqh56uv6Kej5p6QIEpTT07vvIxTREsg5LiN5YaN5qyh6Kej5p6QXG4gICAgICAgIGlmIChwYXJzZSkge1xuICAgICAgICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssbnVsbCwge1xuICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgcmVxdWVzdElkOiByZXMucmVxdWVzdElkXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2UocmVzLmRhdGEucmVzcG9uc2VfZGF0YSk7XG4gICAgICAgICAgICByZXR1cm4gZXhlY0NhbGxiYWNrKGNhbGxiYWNrLCBudWxsLCB7XG4gICAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgICAgcmVxdWVzdElkOiByZXMucmVxdWVzdElkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBleGVjQ2FsbGJhY2soY2FsbGJhY2ssIG5ldyBFcnJvcihgWyR7Z2V0U2RrTmFtZSgpfV1bJHtFUlJPUlMuSU5WQUxJRF9QQVJBTVN9XVske0NPTVBPTkVOVF9OQU1FfS5jYWxsRnVuY3Rpb25dIHJlc3BvbnNlIGRhdGEgbXVzdCBiZSBqc29uYCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1jYXRjaChlKXtcbiAgICAgIGV4ZWNDYWxsYmFjayhjYWxsYmFjayxlKTtcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgY2xvdWRiYXNlRnVuY3Rpb25zID0gbmV3IENsb3VkYmFzZUZ1bmN0aW9ucygpO1xuXG5jb25zdCBjb21wb25lbnQ6SUNsb3VkYmFzZUNvbXBvbmVudCA9IHtcbiAgbmFtZTogQ09NUE9ORU5UX05BTUUsXG4gIGVudGl0eToge1xuICAgIGNhbGxGdW5jdGlvbjogY2xvdWRiYXNlRnVuY3Rpb25zLmNhbGxGdW5jdGlvblxuICB9XG59XG50cnl7XG4gIGNsb3VkYmFzZS5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xufWNhdGNoKGUpe31cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRnVuY3Rpb25zKGFwcDpJQ2xvdWRiYXNlKXtcbiAgYXBwLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG59Il19