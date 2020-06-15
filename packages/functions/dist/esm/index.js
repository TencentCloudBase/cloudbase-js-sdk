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
import { constants, utils } from '@cloudbase/utilities';
var SDK_NAME = constants.SDK_NAME, ERRORS = constants.ERRORS;
var execCallback = utils.execCallback;
var COMPONENT_NAME = 'functions';
var callFunction = function (options, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var name, data, query, parse, search, jsonData, action, params, request, res, result, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = options.name, data = options.data, query = options.query, parse = options.parse, search = options.search;
                    if (!name) {
                        execCallback(callback, new Error("[" + SDK_NAME + "][" + ERRORS.INVALID_PARAMS + "][" + COMPONENT_NAME + ".callFunction] invalid name"));
                    }
                    try {
                        jsonData = data ? JSON.stringify(data) : '';
                    }
                    catch (e) {
                        execCallback(callback, new Error("[" + SDK_NAME + "][" + ERRORS.INVALID_PARAMS + "][" + COMPONENT_NAME + ".callFunction] invalid data"));
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
                                execCallback(callback, new Error("[" + SDK_NAME + "][" + ERRORS.INVALID_PARAMS + "][" + COMPONENT_NAME + ".callFunction] response data must be json"));
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
var component = {
    name: COMPONENT_NAME,
    entity: {
        callFunction: callFunction
    }
};
try {
    cloudbase.registerComponent(component);
}
catch (e) { }
export function registerFunctions(app) {
    app.registerComponent(component);
}
