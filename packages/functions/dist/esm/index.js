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
    try {
        app.registerComponent(component);
    }
    catch (e) {
        console.warn(e);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsT0FBTyxFQUFFLFNBQVMsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFJdkQsSUFBQSxVQUFVLEdBQWlDLFNBQVMsV0FBMUMsRUFBRSxNQUFNLEdBQXlCLFNBQVMsT0FBbEMsRUFBRSxrQkFBa0IsR0FBSyxTQUFTLG1CQUFkLENBQWU7QUFDckQsSUFBQSxZQUFZLEdBQUssS0FBSyxhQUFWLENBQVc7QUFDdkIsSUFBQSxvQkFBb0IsR0FBSyxPQUFPLHFCQUFaLENBQWE7QUFFekMsSUFBTSxjQUFjLEdBQUcsV0FBVyxDQUFDO0FBRW5DO0lBQUE7SUF5RUEsQ0FBQztJQTFEYyx5Q0FBWSxHQUF6QixVQUEwQixPQUE0QixFQUFDLFFBQWtCOzs7Ozs7d0JBQy9ELElBQUksR0FBaUMsT0FBTyxLQUF4QyxFQUFFLElBQUksR0FBMkIsT0FBTyxLQUFsQyxFQUFFLEtBQUssR0FBb0IsT0FBTyxNQUEzQixFQUFFLEtBQUssR0FBYSxPQUFPLE1BQXBCLEVBQUUsTUFBTSxHQUFLLE9BQU8sT0FBWixDQUFhO3dCQUNyRCxJQUFJLENBQUMsSUFBSSxFQUFFOzRCQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQ0FDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjO2dDQUMzQixHQUFHLEVBQUUsTUFBSSxjQUFjLHlDQUFzQzs2QkFDOUQsQ0FBQyxDQUFDLENBQUM7eUJBQ0w7d0JBRUQsSUFBSTs0QkFDRixRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7eUJBQzdDO3dCQUFDLE9BQU8sQ0FBQyxFQUFFOzRCQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQ0FDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjO2dDQUMzQixHQUFHLEVBQUUsTUFBSSxjQUFjLGdDQUE2Qjs2QkFDckQsQ0FBQyxDQUFDLENBQUM7eUJBQ0w7d0JBRUssTUFBTSxHQUFHLDBCQUEwQixDQUFDO3dCQUVwQyxNQUFNLEdBQUc7NEJBQ2IsT0FBTyxFQUFFLEtBQUs7NEJBQ2QsS0FBSyxPQUFBOzRCQUNMLE1BQU0sUUFBQTs0QkFDTixhQUFhLEVBQUUsSUFBSTs0QkFDbkIsWUFBWSxFQUFFLFFBQVE7eUJBQ3ZCLENBQUM7d0JBRUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7Ozs7d0JBR2YsV0FBTSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBQTs7d0JBQXhDLEdBQUcsR0FBRyxTQUFrQzt3QkFDOUMsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFOzRCQUNaLFdBQU8sWUFBWSxDQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLEVBQUM7eUJBQ3hDOzZCQUFNOzRCQUNELE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzs0QkFFcEMsSUFBSSxLQUFLLEVBQUU7Z0NBQ1QsV0FBTyxZQUFZLENBQUMsUUFBUSxFQUFDLElBQUksRUFBRTt3Q0FDakMsTUFBTSxRQUFBO3dDQUNOLFNBQVMsRUFBRSxHQUFHLENBQUMsU0FBUztxQ0FDekIsQ0FBQyxFQUFDOzZCQUNKO2lDQUFNO2dDQUNMLElBQUk7b0NBQ0YsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQ0FDNUMsV0FBTyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRTs0Q0FDbEMsTUFBTSxRQUFBOzRDQUNOLFNBQVMsRUFBRSxHQUFHLENBQUMsU0FBUzt5Q0FDekIsQ0FBQyxFQUFDO2lDQUNKO2dDQUFDLE9BQU8sQ0FBQyxFQUFFO29DQUNWLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxLQUFLLENBQUMsTUFBSSxVQUFVLEVBQUUsVUFBSyxNQUFNLENBQUMsY0FBYyxVQUFLLGNBQWMsOENBQTJDLENBQUMsQ0FBQyxDQUFDO2lDQUM3STs2QkFDRjt5QkFDRjs7Ozt3QkFFRCxZQUFZLENBQUMsUUFBUSxFQUFDLEdBQUMsQ0FBQyxDQUFDOzs7Ozs7S0FFNUI7SUF6REQ7UUFkQyxvQkFBb0IsQ0FBQztZQUNwQixVQUFVLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLFdBQVc7Z0JBQ3RCLFVBQVUsRUFBRSxjQUFjO2FBQzNCO1lBQ0QsS0FBSyxFQUFFLFFBQVE7WUFDZixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVixvQ0FBb0M7Z0JBQ3BDLG9CQUFvQjtnQkFDcEIsMkJBQTJCO2dCQUMzQixpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7aURBQytELFFBQVE7OzBEQXlEeEU7SUFDSCx5QkFBQztDQUFBLEFBekVELElBeUVDO0FBRUQsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7QUFFcEQsSUFBTSxTQUFTLEdBQXVCO0lBQ3BDLElBQUksRUFBRSxjQUFjO0lBQ3BCLE1BQU0sRUFBRTtRQUNOLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxZQUFZO0tBQzlDO0NBQ0YsQ0FBQTtBQUNELElBQUc7SUFDRCxTQUFTLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDeEM7QUFBQSxPQUFNLENBQUMsRUFBQyxHQUFFO0FBRVgsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEdBQXlDO0lBQ3pFLElBQUc7UUFDRCxHQUFHLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDbEM7SUFBQSxPQUFNLENBQUMsRUFBQztRQUNQLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakI7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNsb3VkYmFzZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNvbXBvbmVudCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY29tcG9uZW50JztcbmltcG9ydCB7IElDYWxsRnVuY3Rpb25PcHRpb25zIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9mdW5jdGlvbnMnO1xuaW1wb3J0IHsgY29uc3RhbnRzLHV0aWxzLGhlbHBlcnMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcyc7XG5cbmRlY2xhcmUgY29uc3QgY2xvdWRiYXNlOiBJQ2xvdWRiYXNlO1xuXG5jb25zdCB7IGdldFNka05hbWUgLEVSUk9SUywgQ09NTVVOSVRZX1NJVEVfVVJMIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IGV4ZWNDYWxsYmFjayB9ID0gdXRpbHM7XG5jb25zdCB7IGNhdGNoRXJyb3JzRGVjb3JhdG9yIH0gPSBoZWxwZXJzO1xuXG5jb25zdCBDT01QT05FTlRfTkFNRSA9ICdmdW5jdGlvbnMnO1xuXG5jbGFzcyBDbG91ZGJhc2VGdW5jdGlvbnN7XG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgY3VzdG9tSW5mbzoge1xuICAgICAgY2xhc3NOYW1lOiAnQ2xvdWRiYXNlJyxcbiAgICAgIG1ldGhvZE5hbWU6ICdjYWxsRnVuY3Rpb24nXG4gICAgfSxcbiAgICB0aXRsZTogJ+WHveaVsOiwg+eUqOWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBjYWxsRnVuY3Rpb24oKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeeOr+Wig+S4i+aYr+WQpuWtmOWcqOatpOWHveaVsCcsXG4gICAgICAnICAzIC0g5Ye95pWw5a6J5YWo6KeE5YiZ5piv5ZCm6ZmQ5Yi25LqG5b2T5YmN55m75b2V54q25oCB6K6/6ZeuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgY2FsbEZ1bmN0aW9uKG9wdGlvbnM6SUNhbGxGdW5jdGlvbk9wdGlvbnMsY2FsbGJhY2s/OkZ1bmN0aW9uKXtcbiAgICBjb25zdCB7IG5hbWUsIGRhdGEsIHF1ZXJ5LCBwYXJzZSwgc2VhcmNoIH0gPSBvcHRpb25zO1xuICAgIGlmICghbmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICBtc2c6IGBbJHtDT01QT05FTlRfTkFNRX0uY2FsbEZ1bmN0aW9uXSBpbnZhbGlkIGZ1bmN0aW9uIG5hbWVgXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGxldCBqc29uRGF0YTtcbiAgICB0cnkge1xuICAgICAganNvbkRhdGEgPSBkYXRhID8gSlNPTi5zdHJpbmdpZnkoZGF0YSkgOiAnJztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgIG1zZzogYFske0NPTVBPTkVOVF9OQU1FfS5jYWxsRnVuY3Rpb25dIGludmFsaWQgZGF0YWBcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBjb25zdCBhY3Rpb24gPSAnZnVuY3Rpb25zLmludm9rZUZ1bmN0aW9uJztcblxuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIGluUXVlcnk6IHF1ZXJ5LFxuICAgICAgcGFyc2UsXG4gICAgICBzZWFyY2gsXG4gICAgICBmdW5jdGlvbl9uYW1lOiBuYW1lLFxuICAgICAgcmVxdWVzdF9kYXRhOiBqc29uRGF0YVxuICAgIH07XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLnJlcXVlc3Q7XG5cbiAgICB0cnl7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0LnNlbmQoYWN0aW9uLCBwYXJhbXMpO1xuICAgICAgaWYgKHJlcy5jb2RlKSB7XG4gICAgICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssbnVsbCxyZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHJlcy5kYXRhLnJlc3BvbnNlX2RhdGE7XG4gICAgICAgIC8vIHBhcnNlIOS4uiB0cnVlIOaXtuacjeWKoeerr+ino+aekCBKU09O77yMU0RLIOS4jeWGjeasoeino+aekFxuICAgICAgICBpZiAocGFyc2UpIHtcbiAgICAgICAgICByZXR1cm4gZXhlY0NhbGxiYWNrKGNhbGxiYWNrLG51bGwsIHtcbiAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgIHJlcXVlc3RJZDogcmVzLnJlcXVlc3RJZFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSBKU09OLnBhcnNlKHJlcy5kYXRhLnJlc3BvbnNlX2RhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjaywgbnVsbCwge1xuICAgICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICAgIHJlcXVlc3RJZDogcmVzLnJlcXVlc3RJZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZXhlY0NhbGxiYWNrKGNhbGxiYWNrLCBuZXcgRXJyb3IoYFske2dldFNka05hbWUoKX1dWyR7RVJST1JTLklOVkFMSURfUEFSQU1TfV1bJHtDT01QT05FTlRfTkFNRX0uY2FsbEZ1bmN0aW9uXSByZXNwb25zZSBkYXRhIG11c3QgYmUganNvbmApKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9Y2F0Y2goZSl7XG4gICAgICBleGVjQ2FsbGJhY2soY2FsbGJhY2ssZSk7XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGNsb3VkYmFzZUZ1bmN0aW9ucyA9IG5ldyBDbG91ZGJhc2VGdW5jdGlvbnMoKTtcblxuY29uc3QgY29tcG9uZW50OklDbG91ZGJhc2VDb21wb25lbnQgPSB7XG4gIG5hbWU6IENPTVBPTkVOVF9OQU1FLFxuICBlbnRpdHk6IHtcbiAgICBjYWxsRnVuY3Rpb246IGNsb3VkYmFzZUZ1bmN0aW9ucy5jYWxsRnVuY3Rpb25cbiAgfVxufVxudHJ5e1xuICBjbG91ZGJhc2UucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbn1jYXRjaChlKXt9XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckZ1bmN0aW9ucyhhcHA6UGljazxJQ2xvdWRiYXNlLCAncmVnaXN0ZXJDb21wb25lbnQnPil7XG4gIHRyeXtcbiAgICBhcHAucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbiAgfWNhdGNoKGUpe1xuICAgIGNvbnNvbGUud2FybihlKTtcbiAgfVxufSJdfQ==