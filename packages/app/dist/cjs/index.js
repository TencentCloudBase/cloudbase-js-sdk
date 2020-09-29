"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudbase = void 0;
var utilities_1 = require("@cloudbase/utilities");
var cloudbase_adapter_wx_mp_1 = __importDefault(require("cloudbase-adapter-wx_mp"));
var component_1 = require("./libs/component");
var adapter_1 = require("./libs/adapter");
var cache_1 = require("./libs/cache");
var request_1 = require("./libs/request");
var common_1 = require("./constants/common");
var useAdapters = utilities_1.adapters.useAdapters, useDefaultAdapter = utilities_1.adapters.useDefaultAdapter, RUNTIME = utilities_1.adapters.RUNTIME;
var ERRORS = utilities_1.constants.ERRORS, COMMUNITY_SITE_URL = utilities_1.constants.COMMUNITY_SITE_URL;
var printWarn = utilities_1.utils.printWarn;
var catchErrorsDecorator = utilities_1.helpers.catchErrorsDecorator;
var DEFAULT_INIT_CONFIG = {
    timeout: 15000,
    persistence: 'session'
};
var MAX_TIMEOUT = 1000 * 60 * 10;
var MIN_TIMEOUT = 100;
var extensionMap = {};
var Cloudbase = (function () {
    function Cloudbase(config) {
        this._config = config ? config : this._config;
        this.authInstance = null;
    }
    Object.defineProperty(Cloudbase.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cloudbase.prototype, "platform", {
        get: function () {
            return adapter_1.Platform;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cloudbase.prototype, "cache", {
        get: function () {
            return cache_1.getCacheByEnvId(this._config.env);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cloudbase.prototype, "localCache", {
        get: function () {
            return cache_1.getLocalCache(this._config.env);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cloudbase.prototype, "request", {
        get: function () {
            return request_1.getRequestByEnvId(this._config.env);
        },
        enumerable: false,
        configurable: true
    });
    Cloudbase.prototype.init = function (config) {
        if (!config.env) {
            throw new Error(JSON.stringify({
                code: ERRORS.INVALID_PARAMS,
                msg: 'env must not be specified'
            }));
        }
        if (!adapter_1.Platform.adapter) {
            this._useDefaultAdapter();
        }
        this.requestClient = new adapter_1.Platform.adapter.reqClass({
            timeout: config.timeout || 5000,
            timeoutMsg: "[" + common_1.getSdkName() + "][REQUEST TIMEOUT] request had been abort since didn't finished within" + config.timeout / 1000 + "s"
        });
        if (adapter_1.Platform.runtime !== RUNTIME.WEB) {
            if (!config.appSecret) {
                throw new Error(JSON.stringify({
                    code: ERRORS.INVALID_PARAMS,
                    msg: 'invalid appSecret'
                }));
            }
            var appSign_1 = adapter_1.Platform.adapter.getAppSign ? adapter_1.Platform.adapter.getAppSign() : '';
            if (config.appSign && appSign_1 && config.appSign !== appSign_1) {
                throw new Error(JSON.stringify({
                    code: ERRORS.INVALID_PARAMS,
                    msg: 'invalid appSign'
                }));
            }
            appSign_1 && (config.appSign = appSign_1);
            if (!config.appSign) {
                throw new Error(JSON.stringify({
                    code: ERRORS.INVALID_PARAMS,
                    msg: 'invalid appSign'
                }));
            }
        }
        this._config = __assign(__assign({}, DEFAULT_INIT_CONFIG), config);
        this._config.timeout = this._formatTimeout(this._config.timeout);
        var _a = this._config, env = _a.env, persistence = _a.persistence, debug = _a.debug, timeout = _a.timeout, appSecret = _a.appSecret, appSign = _a.appSign;
        cache_1.initCache({ env: env, persistence: persistence, debug: debug, platformInfo: this.platform });
        request_1.initRequest({ env: env, region: config.region || '', timeout: timeout, appSecret: appSecret, appSign: appSign });
        if (config.region) {
            common_1.setRegionLevelEndpoint(env, config.region || '');
        }
        return new Cloudbase(this._config);
    };
    Cloudbase.prototype.updateConfig = function (config) {
        var persistence = config.persistence, debug = config.debug;
        this._config.persistence = persistence;
        this._config.debug = debug;
        cache_1.initCache({ env: this._config.env, persistence: persistence, debug: debug, platformInfo: this.platform });
    };
    Cloudbase.prototype.registerExtension = function (ext) {
        extensionMap[ext.name] = ext;
    };
    Cloudbase.prototype.invokeExtension = function (name, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var ext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ext = extensionMap[name];
                        if (!ext) {
                            throw new Error(JSON.stringify({
                                code: ERRORS.INVALID_PARAMS,
                                msg: "extension:" + name + " must be registered before invoke"
                            }));
                        }
                        return [4, ext.invoke(opts, this)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Cloudbase.prototype.useAdapters = function (adapters) {
        var _a = useAdapters(adapters) || {}, adapter = _a.adapter, runtime = _a.runtime;
        adapter && (adapter_1.Platform.adapter = adapter);
        runtime && (adapter_1.Platform.runtime = runtime);
    };
    Cloudbase.prototype.registerHook = function (hook) {
        component_1.registerHook(Cloudbase, hook);
    };
    Cloudbase.prototype.registerComponent = function (component) {
        component_1.registerComponent(Cloudbase, component);
    };
    Cloudbase.prototype.registerVersion = function (version) {
        common_1.setSdkVersion(version);
    };
    Cloudbase.prototype.registerSdkName = function (name) {
        common_1.setSdkName(name);
    };
    Cloudbase.prototype.registerEndPoint = function (url, protocol) {
        common_1.setEndPoint(url, protocol);
    };
    Cloudbase.prototype._useDefaultAdapter = function () {
        var _a = useDefaultAdapter(), adapter = _a.adapter, runtime = _a.runtime;
        adapter_1.Platform.adapter = adapter;
        adapter_1.Platform.runtime = runtime;
    };
    Cloudbase.prototype._formatTimeout = function (timeout) {
        switch (true) {
            case timeout > MAX_TIMEOUT:
                printWarn(ERRORS.INVALID_PARAMS, 'timeout is greater than maximum value[10min]');
                return MAX_TIMEOUT;
            case timeout < MIN_TIMEOUT:
                printWarn(ERRORS.INVALID_PARAMS, 'timeout is less than maximum value[100ms]');
                return MIN_TIMEOUT;
            default:
                return timeout;
        }
    };
    __decorate([
        catchErrorsDecorator({
            mode: 'sync',
            title: 'Cloudbase 初始化失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 cloudbase.init() 的语法或参数是否正确',
                '  2 - 如果是非浏览器环境，是否配置了安全应用来源（https://docs.cloudbase.net/api-reference/webv2/adapter.html#jie-ru-liu-cheng）',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Cloudbase)
    ], Cloudbase.prototype, "init", null);
    __decorate([
        catchErrorsDecorator({
            title: '调用扩展能力失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 invokeExtension() 的语法或参数是否正确',
                '  2 - 被调用的扩展能力是否已经安装并通过 registerExtension() 注册',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], Cloudbase.prototype, "invokeExtension", null);
    return Cloudbase;
}());
exports.cloudbase = new Cloudbase();
exports.cloudbase.useAdapters(cloudbase_adapter_wx_mp_1.default);
exports.default = exports.cloudbase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBMkU7QUFJM0Usb0ZBQXFEO0FBQ3JELDhDQUFtRTtBQUNuRSwwQ0FBMEM7QUFHMUMsc0NBQXlFO0FBRXpFLDBDQUFnRTtBQUNoRSw2Q0FBZ0g7QUFFeEcsSUFBQSxXQUFXLEdBQWlDLG9CQUFRLFlBQXpDLEVBQUUsaUJBQWlCLEdBQWMsb0JBQVEsa0JBQXRCLEVBQUUsT0FBTyxHQUFLLG9CQUFRLFFBQWIsQ0FBYztBQUNyRCxJQUFBLE1BQU0sR0FBeUIscUJBQVMsT0FBbEMsRUFBRSxrQkFBa0IsR0FBSyxxQkFBUyxtQkFBZCxDQUFlO0FBQ3pDLElBQUEsU0FBUyxHQUFLLGlCQUFLLFVBQVYsQ0FBVztBQUNwQixJQUFBLG9CQUFvQixHQUFLLG1CQUFPLHFCQUFaLENBQWE7QUFLekMsSUFBTSxtQkFBbUIsR0FBNkI7SUFDcEQsT0FBTyxFQUFFLEtBQUs7SUFDZCxXQUFXLEVBQUUsU0FBUztDQUN2QixDQUFDO0FBR0YsSUFBTSxXQUFXLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFFbkMsSUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBRXhCLElBQU0sWUFBWSxHQUEyQixFQUFFLENBQUM7QUFFaEQ7SUFLRSxtQkFBWSxNQUF5QjtRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzlDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFRCxzQkFBSSw2QkFBTTthQUFWO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksK0JBQVE7YUFBWjtZQUNFLE9BQU8sa0JBQVEsQ0FBQztRQUNsQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDRCQUFLO2FBQVQ7WUFDRSxPQUFPLHVCQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGlDQUFVO2FBQWQ7WUFDRSxPQUFPLHFCQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDhCQUFPO2FBQVg7WUFDRSxPQUFPLDJCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsQ0FBQzs7O09BQUE7SUFXTSx3QkFBSSxHQUFYLFVBQVksTUFBd0I7UUFDbEMsSUFBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUM7WUFDYixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQzdCLElBQUksRUFBRSxNQUFNLENBQUMsY0FBYztnQkFDM0IsR0FBRyxFQUFFLDJCQUEyQjthQUNqQyxDQUFDLENBQUMsQ0FBQztTQUNMO1FBRUQsSUFBSSxDQUFDLGtCQUFRLENBQUMsT0FBTyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNCO1FBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGtCQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUNqRCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJO1lBQy9CLFVBQVUsRUFBRSxNQUFJLG1CQUFVLEVBQUUsOEVBQTBFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxNQUFHO1NBQzdHLENBQUMsQ0FBQztRQUNyQixJQUFJLGtCQUFRLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7Z0JBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjO29CQUMzQixHQUFHLEVBQUUsbUJBQW1CO2lCQUN6QixDQUFDLENBQUMsQ0FBQzthQUNMO1lBRUQsSUFBTSxTQUFPLEdBQUcsa0JBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxrQkFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2pGLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxTQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sS0FBSyxTQUFPLEVBQUU7Z0JBRTNELE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjO29CQUMzQixHQUFHLEVBQUUsaUJBQWlCO2lCQUN2QixDQUFDLENBQUMsQ0FBQzthQUNMO1lBQ0QsU0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFPLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLGNBQWM7b0JBQzNCLEdBQUcsRUFBRSxpQkFBaUI7aUJBQ3ZCLENBQUMsQ0FBQyxDQUFDO2FBQ0w7U0FDRjtRQUNELElBQUksQ0FBQyxPQUFPLHlCQUNQLG1CQUFtQixHQUNuQixNQUFNLENBQ1YsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUzRCxJQUFBLEtBQTBELElBQUksQ0FBQyxPQUFPLEVBQXBFLEdBQUcsU0FBQSxFQUFFLFdBQVcsaUJBQUEsRUFBRSxLQUFLLFdBQUEsRUFBRSxPQUFPLGFBQUEsRUFBRSxTQUFTLGVBQUEsRUFBRSxPQUFPLGFBQWdCLENBQUM7UUFDN0UsaUJBQVMsQ0FBQyxFQUFFLEdBQUcsS0FBQSxFQUFFLFdBQVcsYUFBQSxFQUFFLEtBQUssT0FBQSxFQUFFLFlBQVksRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztRQUNsRSxxQkFBVyxDQUFDLEVBQUUsR0FBRyxLQUFBLEVBQUUsTUFBTSxFQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLFNBQVMsV0FBQSxFQUFFLE9BQU8sU0FBQSxFQUFDLENBQUMsQ0FBQztRQUU3RSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDakIsK0JBQXNCLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUE7U0FDakQ7UUFDRCxPQUFPLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sZ0NBQVksR0FBbkIsVUFBb0IsTUFBZ0M7UUFDMUMsSUFBQSxXQUFXLEdBQVksTUFBTSxZQUFsQixFQUFFLEtBQUssR0FBSyxNQUFNLE1BQVgsQ0FBWTtRQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRTNCLGlCQUFTLENBQUMsRUFBRSxHQUFHLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsV0FBVyxhQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsWUFBWSxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFTSxxQ0FBaUIsR0FBeEIsVUFBeUIsR0FBdUI7UUFDOUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDL0IsQ0FBQztJQVVZLG1DQUFlLEdBQTVCLFVBQTZCLElBQVcsRUFBRSxJQUFROzs7Ozs7d0JBQzFDLEdBQUcsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQy9CLElBQUksQ0FBQyxHQUFHLEVBQUU7NEJBQ1IsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dDQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLGNBQWM7Z0NBQzNCLEdBQUcsRUFBRSxlQUFhLElBQUksc0NBQW1DOzZCQUMxRCxDQUFDLENBQUMsQ0FBQzt5QkFDTDt3QkFFTSxXQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFBOzRCQUFuQyxXQUFPLFNBQTRCLEVBQUM7Ozs7S0FDckM7SUFFTSwrQkFBVyxHQUFsQixVQUFtQixRQUE2QztRQUN4RCxJQUFBLEtBQXVCLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWhELE9BQU8sYUFBQSxFQUFFLE9BQU8sYUFBZ0MsQ0FBQztRQUN6RCxPQUFPLElBQUksQ0FBQyxrQkFBUSxDQUFDLE9BQU8sR0FBRyxPQUE4QixDQUFDLENBQUM7UUFDL0QsT0FBTyxJQUFJLENBQUMsa0JBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBaUIsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFTSxnQ0FBWSxHQUFuQixVQUFvQixJQUFtQjtRQUNyQyx3QkFBWSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQTtJQUM5QixDQUFDO0lBRU0scUNBQWlCLEdBQXhCLFVBQXlCLFNBQTZCO1FBQ3BELDZCQUFpQixDQUFDLFNBQVMsRUFBQyxTQUFTLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sbUNBQWUsR0FBdEIsVUFBdUIsT0FBYztRQUNuQyxzQkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTSxtQ0FBZSxHQUF0QixVQUF1QixJQUFXO1FBQ2hDLG1CQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVNLG9DQUFnQixHQUF2QixVQUF3QixHQUFVLEVBQUMsUUFBd0I7UUFDekQsb0JBQVcsQ0FBQyxHQUFHLEVBQUMsUUFBUSxDQUFDLENBQUE7SUFDM0IsQ0FBQztJQUVPLHNDQUFrQixHQUExQjtRQUNRLElBQUEsS0FBdUIsaUJBQWlCLEVBQUUsRUFBeEMsT0FBTyxhQUFBLEVBQUUsT0FBTyxhQUF3QixDQUFDO1FBQ2pELGtCQUFRLENBQUMsT0FBTyxHQUFHLE9BQThCLENBQUM7UUFDbEQsa0JBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBaUIsQ0FBQztJQUN2QyxDQUFDO0lBRU8sa0NBQWMsR0FBdEIsVUFBdUIsT0FBYztRQUNuQyxRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssT0FBTyxHQUFHLFdBQVc7Z0JBQ3hCLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFDLDhDQUE4QyxDQUFDLENBQUM7Z0JBQ2hGLE9BQU8sV0FBVyxDQUFDO1lBQ3JCLEtBQUssT0FBTyxHQUFHLFdBQVc7Z0JBQ3hCLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFDLDJDQUEyQyxDQUFDLENBQUM7Z0JBQzdFLE9BQU8sV0FBVyxDQUFDO1lBQ3JCO2dCQUNFLE9BQU8sT0FBTyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQXBJRDtRQVZDLG9CQUFvQixDQUFDO1lBQ3BCLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVixzQ0FBc0M7Z0JBQ3RDLDJHQUEyRztnQkFDM0csaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozt3Q0FDb0MsU0FBUzt5Q0F1RDlDO0lBc0JEO1FBVEMsb0JBQW9CLENBQUM7WUFDcEIsS0FBSyxFQUFFLFVBQVU7WUFDakIsUUFBUSxFQUFFO2dCQUNSLFVBQVU7Z0JBQ1YsdUNBQXVDO2dCQUN2QyxnREFBZ0Q7Z0JBQ2hELGlLQUE2QixrQkFBb0I7YUFDbEQ7U0FDRixDQUFDOzs7O29EQVdEO0lBOENILGdCQUFDO0NBQUEsQUE1S0QsSUE0S0M7QUFFWSxRQUFBLFNBQVMsR0FBYyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQ3BELGlCQUFTLENBQUMsV0FBVyxDQUFDLGlDQUFjLENBQUMsQ0FBQztBQUV0QyxrQkFBZSxpQkFBUyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWRhcHRlcnMsIGNvbnN0YW50cywgdXRpbHMsIGhlbHBlcnMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBTREtBZGFwdGVySW50ZXJmYWNlLCBDbG91ZGJhc2VBZGFwdGVyLCBJUmVxdWVzdENvbmZpZyB9IGZyb20gJ0BjbG91ZGJhc2UvYWRhcHRlci1pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNvbmZpZywgSUNsb3VkYmFzZVVwZ3JhZGVkQ29uZmlnLCBJQ2xvdWRiYXNlLCBJQ2xvdWRiYXNlRXh0ZW5zaW9uLCBLViwgSUNsb3VkYmFzZVBsYXRmb3JtSW5mbyB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUF1dGggfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2F1dGgnO1xuaW1wb3J0IGFkYXB0ZXJGb3JXeE1wIGZyb20gJ2Nsb3VkYmFzZS1hZGFwdGVyLXd4X21wJztcbmltcG9ydCB7IHJlZ2lzdGVyQ29tcG9uZW50LCByZWdpc3Rlckhvb2sgfSBmcm9tICcuL2xpYnMvY29tcG9uZW50JztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi9saWJzL2FkYXB0ZXInO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNvbXBvbmVudCwgSUNsb3VkYmFzZUhvb2sgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ2FjaGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NhY2hlJztcbmltcG9ydCB7IGluaXRDYWNoZSwgZ2V0Q2FjaGVCeUVudklkLCBnZXRMb2NhbENhY2hlIH0gZnJvbSAnLi9saWJzL2NhY2hlJztcbmltcG9ydCB7IElDbG91ZGJhc2VSZXF1ZXN0IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9yZXF1ZXN0JztcbmltcG9ydCB7IGluaXRSZXF1ZXN0LCBnZXRSZXF1ZXN0QnlFbnZJZCB9IGZyb20gJy4vbGlicy9yZXF1ZXN0JztcbmltcG9ydCB7IGdldFNka05hbWUsIHNldFNka1ZlcnNpb24sIHNldEVuZFBvaW50LCBzZXRSZWdpb25MZXZlbEVuZHBvaW50LCBzZXRTZGtOYW1lIH0gZnJvbSAnLi9jb25zdGFudHMvY29tbW9uJztcblxuY29uc3QgeyB1c2VBZGFwdGVycywgdXNlRGVmYXVsdEFkYXB0ZXIsIFJVTlRJTUUgfSA9IGFkYXB0ZXJzO1xuY29uc3QgeyBFUlJPUlMsIENPTU1VTklUWV9TSVRFX1VSTCB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyBwcmludFdhcm4gfSA9IHV0aWxzO1xuY29uc3QgeyBjYXRjaEVycm9yc0RlY29yYXRvciB9ID0gaGVscGVycztcblxuLyoqXG4gKiBAY29uc3RhbnQg6buY6K6k6YWN572uXG4gKi9cbmNvbnN0IERFRkFVTFRfSU5JVF9DT05GSUc6UGFydGlhbDxJQ2xvdWRiYXNlQ29uZmlnPiA9IHtcbiAgdGltZW91dDogMTUwMDAsXG4gIHBlcnNpc3RlbmNlOiAnc2Vzc2lvbidcbn07XG5cbi8vIHRpbWVvdXTkuIrpmZAxMOWIhumSn1xuY29uc3QgTUFYX1RJTUVPVVQgPSAxMDAwICogNjAgKiAxMDtcbi8vIHRpbWVvdXTkuIvpmZAxMDBtc1xuY29uc3QgTUlOX1RJTUVPVVQgPSAxMDA7XG5cbmNvbnN0IGV4dGVuc2lvbk1hcDpLVjxJQ2xvdWRiYXNlRXh0ZW5zaW9uPiA9IHt9O1xuXG5jbGFzcyBDbG91ZGJhc2UgaW1wbGVtZW50cyBJQ2xvdWRiYXNle1xuICBwdWJsaWMgYXV0aEluc3RhbmNlOiBJQ2xvdWRiYXNlQXV0aDtcbiAgcHVibGljIHJlcXVlc3RDbGllbnQ6IGFueTtcbiAgcHJpdmF0ZSBfY29uZmlnOiBJQ2xvdWRiYXNlQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZz86IElDbG91ZGJhc2VDb25maWcpIHtcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWcgPyBjb25maWcgOiB0aGlzLl9jb25maWc7XG4gICAgdGhpcy5hdXRoSW5zdGFuY2UgPSBudWxsO1xuICB9XG5cbiAgZ2V0IGNvbmZpZygpe1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICBnZXQgcGxhdGZvcm0oKTpJQ2xvdWRiYXNlUGxhdGZvcm1JbmZve1xuICAgIHJldHVybiBQbGF0Zm9ybTtcbiAgfVxuXG4gIGdldCBjYWNoZSgpOklDbG91ZGJhc2VDYWNoZXtcbiAgICByZXR1cm4gZ2V0Q2FjaGVCeUVudklkKHRoaXMuX2NvbmZpZy5lbnYpO1xuICB9XG5cbiAgZ2V0IGxvY2FsQ2FjaGUoKTpJQ2xvdWRiYXNlQ2FjaGV7XG4gICAgcmV0dXJuIGdldExvY2FsQ2FjaGUodGhpcy5fY29uZmlnLmVudik7XG4gIH1cblxuICBnZXQgcmVxdWVzdCgpOklDbG91ZGJhc2VSZXF1ZXN0e1xuICAgIHJldHVybiBnZXRSZXF1ZXN0QnlFbnZJZCh0aGlzLl9jb25maWcuZW52KTtcbiAgfVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIG1vZGU6ICdzeW5jJyxcbiAgICB0aXRsZTogJ0Nsb3VkYmFzZSDliJ3lp4vljJblpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggY2xvdWRiYXNlLmluaXQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOWmguaenOaYr+mdnua1j+iniOWZqOeOr+Wig++8jOaYr+WQpumFjee9ruS6huWuieWFqOW6lOeUqOadpea6kO+8iGh0dHBzOi8vZG9jcy5jbG91ZGJhc2UubmV0L2FwaS1yZWZlcmVuY2Uvd2VidjIvYWRhcHRlci5odG1sI2ppZS1ydS1saXUtY2hlbmfvvIknLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBpbml0KGNvbmZpZzogSUNsb3VkYmFzZUNvbmZpZyk6Q2xvdWRiYXNlIHtcbiAgICBpZighY29uZmlnLmVudil7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgIG1zZzogJ2VudiBtdXN0IG5vdCBiZSBzcGVjaWZpZWQnXG4gICAgICB9KSk7XG4gICAgfVxuICAgIC8vIOWIneWni+WMluaXtuiLpeacquWFvOWuueW5s+WPsO+8jOWImeS9v+eUqOm7mOiupGFkYXB0ZXJcbiAgICBpZiAoIVBsYXRmb3JtLmFkYXB0ZXIpIHtcbiAgICAgIHRoaXMuX3VzZURlZmF1bHRBZGFwdGVyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZXF1ZXN0Q2xpZW50ID0gbmV3IFBsYXRmb3JtLmFkYXB0ZXIucmVxQ2xhc3Moe1xuICAgICAgdGltZW91dDogY29uZmlnLnRpbWVvdXQgfHwgNTAwMCxcbiAgICAgIHRpbWVvdXRNc2c6IGBbJHtnZXRTZGtOYW1lKCl9XVtSRVFVRVNUIFRJTUVPVVRdIHJlcXVlc3QgaGFkIGJlZW4gYWJvcnQgc2luY2UgZGlkblxcJ3QgZmluaXNoZWQgd2l0aGluJHtjb25maWcudGltZW91dCAvIDEwMDB9c2BcbiAgICB9IGFzIElSZXF1ZXN0Q29uZmlnKTtcbiAgICBpZiAoUGxhdGZvcm0ucnVudGltZSAhPT0gUlVOVElNRS5XRUIpIHtcbiAgICAgIGlmICghY29uZmlnLmFwcFNlY3JldCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgICBtc2c6ICdpbnZhbGlkIGFwcFNlY3JldCdcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgLy8gYWRhcHRlcuaPkOS+m+iOt+WPluW6lOeUqOagh+ivhueahOaOpeWPo1xuICAgICAgY29uc3QgYXBwU2lnbiA9IFBsYXRmb3JtLmFkYXB0ZXIuZ2V0QXBwU2lnbiA/IFBsYXRmb3JtLmFkYXB0ZXIuZ2V0QXBwU2lnbigpIDogJyc7XG4gICAgICBpZiAoY29uZmlnLmFwcFNpZ24gJiYgYXBwU2lnbiAmJiBjb25maWcuYXBwU2lnbiAhPT0gYXBwU2lnbikge1xuICAgICAgICAvLyDkvKDlhaXnmoRhcHBTaWdu5LiOc2Rr6I635Y+W55qE5LiN5LiA6Ie0XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICAgIG1zZzogJ2ludmFsaWQgYXBwU2lnbidcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgYXBwU2lnbiAmJiAoY29uZmlnLmFwcFNpZ24gPSBhcHBTaWduKTtcbiAgICAgIGlmICghY29uZmlnLmFwcFNpZ24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgICAgbXNnOiAnaW52YWxpZCBhcHBTaWduJ1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2NvbmZpZyA9IHtcbiAgICAgIC4uLkRFRkFVTFRfSU5JVF9DT05GSUcsXG4gICAgICAuLi5jb25maWdcbiAgICB9O1xuICAgIC8vIOS/ruato3RpbWVvdXTlj5blgLxcbiAgICB0aGlzLl9jb25maWcudGltZW91dCA9IHRoaXMuX2Zvcm1hdFRpbWVvdXQodGhpcy5fY29uZmlnLnRpbWVvdXQpO1xuICAgIC8vIOWIneWni+WMlmNhY2hl5ZKMcmVxdWVzdFxuICAgIGNvbnN0IHsgZW52LCBwZXJzaXN0ZW5jZSwgZGVidWcsIHRpbWVvdXQsIGFwcFNlY3JldCwgYXBwU2lnbn0gPSB0aGlzLl9jb25maWc7XG4gICAgaW5pdENhY2hlKHsgZW52LCBwZXJzaXN0ZW5jZSwgZGVidWcsIHBsYXRmb3JtSW5mbzp0aGlzLnBsYXRmb3JtfSk7XG4gICAgaW5pdFJlcXVlc3QoeyBlbnYsIHJlZ2lvbjpjb25maWcucmVnaW9uIHx8ICcnLCB0aW1lb3V0LCBhcHBTZWNyZXQsIGFwcFNpZ259KTtcblxuICAgIGlmIChjb25maWcucmVnaW9uKSB7XG4gICAgICBzZXRSZWdpb25MZXZlbEVuZHBvaW50KGVudiwgY29uZmlnLnJlZ2lvbiB8fCAnJylcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBDbG91ZGJhc2UodGhpcy5fY29uZmlnKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVDb25maWcoY29uZmlnOiBJQ2xvdWRiYXNlVXBncmFkZWRDb25maWcpe1xuICAgIGNvbnN0IHsgcGVyc2lzdGVuY2UsIGRlYnVnIH0gPSBjb25maWc7XG4gICAgdGhpcy5fY29uZmlnLnBlcnNpc3RlbmNlID0gcGVyc2lzdGVuY2U7XG4gICAgdGhpcy5fY29uZmlnLmRlYnVnID0gZGVidWc7XG4gICAgLy8gcGVyc2lzdGVuY2XmlLnliqjlvbHlk41jYWNoZVxuICAgIGluaXRDYWNoZSh7IGVudjp0aGlzLl9jb25maWcuZW52LCBwZXJzaXN0ZW5jZSwgZGVidWcsIHBsYXRmb3JtSW5mbzp0aGlzLnBsYXRmb3JtfSk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJFeHRlbnNpb24oZXh0OklDbG91ZGJhc2VFeHRlbnNpb24pIHtcbiAgICBleHRlbnNpb25NYXBbZXh0Lm5hbWVdID0gZXh0O1xuICB9XG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfosIPnlKjmianlsZXog73lipvlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggaW52b2tlRXh0ZW5zaW9uKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDooqvosIPnlKjnmoTmianlsZXog73lipvmmK/lkKblt7Lnu4/lronoo4XlubbpgJrov4cgcmVnaXN0ZXJFeHRlbnNpb24oKSDms6jlhownLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBpbnZva2VFeHRlbnNpb24obmFtZTpzdHJpbmcsIG9wdHM6YW55KSB7XG4gICAgY29uc3QgZXh0ID0gZXh0ZW5zaW9uTWFwW25hbWVdO1xuICAgIGlmICghZXh0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgIG1zZzogYGV4dGVuc2lvbjoke25hbWV9IG11c3QgYmUgcmVnaXN0ZXJlZCBiZWZvcmUgaW52b2tlYFxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIHJldHVybiBhd2FpdCBleHQuaW52b2tlKG9wdHMsIHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHVzZUFkYXB0ZXJzKGFkYXB0ZXJzOiBDbG91ZGJhc2VBZGFwdGVyfENsb3VkYmFzZUFkYXB0ZXJbXSkge1xuICAgIGNvbnN0IHsgYWRhcHRlciwgcnVudGltZSB9ID0gdXNlQWRhcHRlcnMoYWRhcHRlcnMpIHx8IHt9O1xuICAgIGFkYXB0ZXIgJiYgKFBsYXRmb3JtLmFkYXB0ZXIgPSBhZGFwdGVyIGFzIFNES0FkYXB0ZXJJbnRlcmZhY2UpO1xuICAgIHJ1bnRpbWUgJiYgKFBsYXRmb3JtLnJ1bnRpbWUgPSBydW50aW1lIGFzIHN0cmluZyk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJIb29rKGhvb2s6SUNsb3VkYmFzZUhvb2spe1xuICAgIHJlZ2lzdGVySG9vayhDbG91ZGJhc2UsaG9vaylcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQ6SUNsb3VkYmFzZUNvbXBvbmVudCl7XG4gICAgcmVnaXN0ZXJDb21wb25lbnQoQ2xvdWRiYXNlLGNvbXBvbmVudCk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJWZXJzaW9uKHZlcnNpb246c3RyaW5nKXtcbiAgICBzZXRTZGtWZXJzaW9uKHZlcnNpb24pO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyU2RrTmFtZShuYW1lOnN0cmluZyl7XG4gICAgc2V0U2RrTmFtZShuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlckVuZFBvaW50KHVybDpzdHJpbmcscHJvdG9jb2w/OidodHRwJ3wnaHR0cHMnKXtcbiAgICBzZXRFbmRQb2ludCh1cmwscHJvdG9jb2wpXG4gIH1cblxuICBwcml2YXRlIF91c2VEZWZhdWx0QWRhcHRlcigpIHtcbiAgICBjb25zdCB7IGFkYXB0ZXIsIHJ1bnRpbWUgfSA9IHVzZURlZmF1bHRBZGFwdGVyKCk7XG4gICAgUGxhdGZvcm0uYWRhcHRlciA9IGFkYXB0ZXIgYXMgU0RLQWRhcHRlckludGVyZmFjZTtcbiAgICBQbGF0Zm9ybS5ydW50aW1lID0gcnVudGltZSBhcyBzdHJpbmc7XG4gIH1cblxuICBwcml2YXRlIF9mb3JtYXRUaW1lb3V0KHRpbWVvdXQ6bnVtYmVyKXtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgdGltZW91dCA+IE1BWF9USU1FT1VUOlxuICAgICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfUEFSQU1TLCd0aW1lb3V0IGlzIGdyZWF0ZXIgdGhhbiBtYXhpbXVtIHZhbHVlWzEwbWluXScpO1xuICAgICAgICByZXR1cm4gTUFYX1RJTUVPVVQ7XG4gICAgICBjYXNlIHRpbWVvdXQgPCBNSU5fVElNRU9VVDpcbiAgICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX1BBUkFNUywndGltZW91dCBpcyBsZXNzIHRoYW4gbWF4aW11bSB2YWx1ZVsxMDBtc10nKTtcbiAgICAgICAgcmV0dXJuIE1JTl9USU1FT1VUO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRpbWVvdXQ7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBjbG91ZGJhc2U6SUNsb3VkYmFzZSA9IG5ldyBDbG91ZGJhc2UoKTtcbmNsb3VkYmFzZS51c2VBZGFwdGVycyhhZGFwdGVyRm9yV3hNcCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsb3VkYmFzZTsiXX0=