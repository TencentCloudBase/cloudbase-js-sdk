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
    persistence: 'local'
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
        var app = new Cloudbase(this._config);
        app.requestClient = this.requestClient;
        return app;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBMkU7QUFJM0Usb0ZBQXFEO0FBQ3JELDhDQUFtRTtBQUNuRSwwQ0FBMEM7QUFHMUMsc0NBQXlFO0FBRXpFLDBDQUFnRTtBQUNoRSw2Q0FBZ0g7QUFDeEcsSUFBQSxXQUFXLEdBQWlDLG9CQUFRLFlBQXpDLEVBQUUsaUJBQWlCLEdBQWMsb0JBQVEsa0JBQXRCLEVBQUUsT0FBTyxHQUFLLG9CQUFRLFFBQWIsQ0FBYztBQUNyRCxJQUFBLE1BQU0sR0FBeUIscUJBQVMsT0FBbEMsRUFBRSxrQkFBa0IsR0FBSyxxQkFBUyxtQkFBZCxDQUFlO0FBQ3pDLElBQUEsU0FBUyxHQUFLLGlCQUFLLFVBQVYsQ0FBVztBQUNwQixJQUFBLG9CQUFvQixHQUFLLG1CQUFPLHFCQUFaLENBQWE7QUFLekMsSUFBTSxtQkFBbUIsR0FBOEI7SUFDckQsT0FBTyxFQUFFLEtBQUs7SUFDZCxXQUFXLEVBQUUsT0FBTztDQUNyQixDQUFDO0FBR0YsSUFBTSxXQUFXLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFFbkMsSUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBRXhCLElBQU0sWUFBWSxHQUE0QixFQUFFLENBQUM7QUFFakQ7SUFLRSxtQkFBWSxNQUF5QjtRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzlDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFRCxzQkFBSSw2QkFBTTthQUFWO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENB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Qzs7OztvREFXRDtJQThDSCxnQkFBQztDQUFBLEFBaExELElBZ0xDO0FBRVksUUFBQSxTQUFTLEdBQWUsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUNyRCxpQkFBUyxDQUFDLFdBQVcsQ0FBQyxpQ0FBYyxDQUFDLENBQUM7QUFFdEMsa0JBQWUsaUJBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFkYXB0ZXJzLCBjb25zdGFudHMsIHV0aWxzLCBoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgU0RLQWRhcHRlckludGVyZmFjZSwgQ2xvdWRiYXNlQWRhcHRlciwgSVJlcXVlc3RDb25maWcgfSBmcm9tICdAY2xvdWRiYXNlL2FkYXB0ZXItaW50ZXJmYWNlJztcbmltcG9ydCB7IElDbG91ZGJhc2VDb25maWcsIElDbG91ZGJhc2VVcGdyYWRlZENvbmZpZywgSUNsb3VkYmFzZSwgSUNsb3VkYmFzZUV4dGVuc2lvbiwgS1YsIElDbG91ZGJhc2VQbGF0Zm9ybUluZm8gfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcbmltcG9ydCB7IElDbG91ZGJhc2VBdXRoIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9hdXRoJztcbmltcG9ydCBhZGFwdGVyRm9yV3hNcCBmcm9tICdjbG91ZGJhc2UtYWRhcHRlci13eF9tcCc7XG5pbXBvcnQgeyByZWdpc3RlckNvbXBvbmVudCwgcmVnaXN0ZXJIb29rIH0gZnJvbSAnLi9saWJzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vbGlicy9hZGFwdGVyJztcbmltcG9ydCB7IElDbG91ZGJhc2VDb21wb25lbnQsIElDbG91ZGJhc2VIb29rIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jb21wb25lbnQnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNhY2hlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSc7XG5pbXBvcnQgeyBpbml0Q2FjaGUsIGdldENhY2hlQnlFbnZJZCwgZ2V0TG9jYWxDYWNoZSB9IGZyb20gJy4vbGlicy9jYWNoZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlUmVxdWVzdCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVxdWVzdCc7XG5pbXBvcnQgeyBpbml0UmVxdWVzdCwgZ2V0UmVxdWVzdEJ5RW52SWQgfSBmcm9tICcuL2xpYnMvcmVxdWVzdCc7XG5pbXBvcnQgeyBnZXRTZGtOYW1lLCBzZXRTZGtWZXJzaW9uLCBzZXRFbmRQb2ludCwgc2V0UmVnaW9uTGV2ZWxFbmRwb2ludCwgc2V0U2RrTmFtZSB9IGZyb20gJy4vY29uc3RhbnRzL2NvbW1vbic7XG5jb25zdCB7IHVzZUFkYXB0ZXJzLCB1c2VEZWZhdWx0QWRhcHRlciwgUlVOVElNRSB9ID0gYWRhcHRlcnM7XG5jb25zdCB7IEVSUk9SUywgQ09NTVVOSVRZX1NJVEVfVVJMIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IHByaW50V2FybiB9ID0gdXRpbHM7XG5jb25zdCB7IGNhdGNoRXJyb3JzRGVjb3JhdG9yIH0gPSBoZWxwZXJzO1xuXG4vKipcbiAqIEBjb25zdGFudCDpu5jorqTphY3nva5cbiAqL1xuY29uc3QgREVGQVVMVF9JTklUX0NPTkZJRzogUGFydGlhbDxJQ2xvdWRiYXNlQ29uZmlnPiA9IHtcbiAgdGltZW91dDogMTUwMDAsXG4gIHBlcnNpc3RlbmNlOiAnbG9jYWwnXG59O1xuXG4vLyB0aW1lb3V05LiK6ZmQMTDliIbpkp9cbmNvbnN0IE1BWF9USU1FT1VUID0gMTAwMCAqIDYwICogMTA7XG4vLyB0aW1lb3V05LiL6ZmQMTAwbXNcbmNvbnN0IE1JTl9USU1FT1VUID0gMTAwO1xuXG5jb25zdCBleHRlbnNpb25NYXA6IEtWPElDbG91ZGJhc2VFeHRlbnNpb24+ID0ge307XG5cbmNsYXNzIENsb3VkYmFzZSBpbXBsZW1lbnRzIElDbG91ZGJhc2Uge1xuICBwdWJsaWMgYXV0aEluc3RhbmNlOiBJQ2xvdWRiYXNlQXV0aDtcbiAgcHVibGljIHJlcXVlc3RDbGllbnQ6IGFueTtcbiAgcHJpdmF0ZSBfY29uZmlnOiBJQ2xvdWRiYXNlQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZz86IElDbG91ZGJhc2VDb25maWcpIHtcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWcgPyBjb25maWcgOiB0aGlzLl9jb25maWc7XG4gICAgdGhpcy5hdXRoSW5zdGFuY2UgPSBudWxsO1xuICB9XG5cbiAgZ2V0IGNvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9XG5cbiAgZ2V0IHBsYXRmb3JtKCk6IElDbG91ZGJhc2VQbGF0Zm9ybUluZm8ge1xuICAgIHJldHVybiBQbGF0Zm9ybTtcbiAgfVxuXG4gIGdldCBjYWNoZSgpOiBJQ2xvdWRiYXNlQ2FjaGUge1xuICAgIHJldHVybiBnZXRDYWNoZUJ5RW52SWQodGhpcy5fY29uZmlnLmVudik7XG4gIH1cblxuICBnZXQgbG9jYWxDYWNoZSgpOiBJQ2xvdWRiYXNlQ2FjaGUge1xuICAgIHJldHVybiBnZXRMb2NhbENhY2hlKHRoaXMuX2NvbmZpZy5lbnYpO1xuICB9XG5cbiAgZ2V0IHJlcXVlc3QoKTogSUNsb3VkYmFzZVJlcXVlc3Qge1xuICAgIHJldHVybiBnZXRSZXF1ZXN0QnlFbnZJZCh0aGlzLl9jb25maWcuZW52KTtcbiAgfVxuXG5cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICBtb2RlOiAnc3luYycsXG4gICAgdGl0bGU6ICdDbG91ZGJhc2Ug5Yid5aeL5YyW5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGNsb3VkYmFzZS5pbml0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlpoLmnpzmmK/pnZ7mtY/op4jlmajnjq/looPvvIzmmK/lkKbphY3nva7kuoblronlhajlupTnlKjmnaXmupDvvIhodHRwczovL2RvY3MuY2xvdWRiYXNlLm5ldC9hcGktcmVmZXJlbmNlL3dlYnYyL2FkYXB0ZXIuaHRtbCNqaWUtcnUtbGl1LWNoZW5n77yJJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgaW5pdChjb25maWc6IElDbG91ZGJhc2VDb25maWcpOiBDbG91ZGJhc2Uge1xuICAgIGlmICghY29uZmlnLmVudikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICBtc2c6ICdlbnYgbXVzdCBub3QgYmUgc3BlY2lmaWVkJ1xuICAgICAgfSkpO1xuICAgIH1cbiAgICAvLyDliJ3lp4vljJbml7boi6XmnKrlhbzlrrnlubPlj7DvvIzliJnkvb/nlKjpu5jorqRhZGFwdGVyXG4gICAgaWYgKCFQbGF0Zm9ybS5hZGFwdGVyKSB7XG4gICAgICB0aGlzLl91c2VEZWZhdWx0QWRhcHRlcigpO1xuICAgIH1cblxuICAgIHRoaXMucmVxdWVzdENsaWVudCA9IG5ldyBQbGF0Zm9ybS5hZGFwdGVyLnJlcUNsYXNzKHtcbiAgICAgIHRpbWVvdXQ6IGNvbmZpZy50aW1lb3V0IHx8IDUwMDAsXG4gICAgICB0aW1lb3V0TXNnOiBgWyR7Z2V0U2RrTmFtZSgpfV1bUkVRVUVTVCBUSU1FT1VUXSByZXF1ZXN0IGhhZCBiZWVuIGFib3J0IHNpbmNlIGRpZG5cXCd0IGZpbmlzaGVkIHdpdGhpbiR7Y29uZmlnLnRpbWVvdXQgLyAxMDAwfXNgXG4gICAgfSBhcyBJUmVxdWVzdENvbmZpZyk7XG4gICAgaWYgKFBsYXRmb3JtLnJ1bnRpbWUgIT09IFJVTlRJTUUuV0VCKSB7XG4gICAgICBpZiAoIWNvbmZpZy5hcHBTZWNyZXQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgICAgbXNnOiAnaW52YWxpZCBhcHBTZWNyZXQnXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIC8vIGFkYXB0ZXLmj5Dkvpvojrflj5blupTnlKjmoIfor4bnmoTmjqXlj6NcbiAgICAgIGNvbnN0IGFwcFNpZ24gPSBQbGF0Zm9ybS5hZGFwdGVyLmdldEFwcFNpZ24gPyBQbGF0Zm9ybS5hZGFwdGVyLmdldEFwcFNpZ24oKSA6ICcnO1xuICAgICAgaWYgKGNvbmZpZy5hcHBTaWduICYmIGFwcFNpZ24gJiYgY29uZmlnLmFwcFNpZ24gIT09IGFwcFNpZ24pIHtcbiAgICAgICAgLy8g5Lyg5YWl55qEYXBwU2lnbuS4jnNka+iOt+WPlueahOS4jeS4gOiHtFxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgICBtc2c6ICdpbnZhbGlkIGFwcFNpZ24nXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIGFwcFNpZ24gJiYgKGNvbmZpZy5hcHBTaWduID0gYXBwU2lnbik7XG4gICAgICBpZiAoIWNvbmZpZy5hcHBTaWduKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICAgIG1zZzogJ2ludmFsaWQgYXBwU2lnbidcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9jb25maWcgPSB7XG4gICAgICAuLi5ERUZBVUxUX0lOSVRfQ09ORklHLFxuICAgICAgLi4uY29uZmlnXG4gICAgfTtcbiAgICAvLyDkv67mraN0aW1lb3V05Y+W5YC8XG4gICAgdGhpcy5fY29uZmlnLnRpbWVvdXQgPSB0aGlzLl9mb3JtYXRUaW1lb3V0KHRoaXMuX2NvbmZpZy50aW1lb3V0KTtcbiAgICAvLyDliJ3lp4vljJZjYWNoZeWSjHJlcXVlc3RcbiAgICBjb25zdCB7IGVudiwgcGVyc2lzdGVuY2UsIGRlYnVnLCB0aW1lb3V0LCBhcHBTZWNyZXQsIGFwcFNpZ24gfSA9IHRoaXMuX2NvbmZpZztcbiAgICBpbml0Q2FjaGUoeyBlbnYsIHBlcnNpc3RlbmNlLCBkZWJ1ZywgcGxhdGZvcm1JbmZvOiB0aGlzLnBsYXRmb3JtIH0pO1xuICAgIGluaXRSZXF1ZXN0KHsgZW52LCByZWdpb246IGNvbmZpZy5yZWdpb24gfHwgJycsIHRpbWVvdXQsIGFwcFNlY3JldCwgYXBwU2lnbiB9KTtcblxuICAgIGlmIChjb25maWcucmVnaW9uKSB7XG4gICAgICBzZXRSZWdpb25MZXZlbEVuZHBvaW50KGVudiwgY29uZmlnLnJlZ2lvbiB8fCAnJylcbiAgICB9XG4gICAgY29uc3QgYXBwID0gbmV3IENsb3VkYmFzZSh0aGlzLl9jb25maWcpO1xuICAgIGFwcC5yZXF1ZXN0Q2xpZW50ID0gdGhpcy5yZXF1ZXN0Q2xpZW50O1xuICAgIHJldHVybiBhcHA7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQ29uZmlnKGNvbmZpZzogSUNsb3VkYmFzZVVwZ3JhZGVkQ29uZmlnKSB7XG4gICAgY29uc3QgeyBwZXJzaXN0ZW5jZSwgZGVidWcgfSA9IGNvbmZpZztcbiAgICB0aGlzLl9jb25maWcucGVyc2lzdGVuY2UgPSBwZXJzaXN0ZW5jZTtcbiAgICB0aGlzLl9jb25maWcuZGVidWcgPSBkZWJ1ZztcbiAgICAvLyBwZXJzaXN0ZW5jZeaUueWKqOW9seWTjWNhY2hlXG4gICAgaW5pdENhY2hlKHsgZW52OiB0aGlzLl9jb25maWcuZW52LCBwZXJzaXN0ZW5jZSwgZGVidWcsIHBsYXRmb3JtSW5mbzogdGhpcy5wbGF0Zm9ybSB9KTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlckV4dGVuc2lvbihleHQ6IElDbG91ZGJhc2VFeHRlbnNpb24pIHtcbiAgICBleHRlbnNpb25NYXBbZXh0Lm5hbWVdID0gZXh0O1xuICB9XG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfosIPnlKjmianlsZXog73lipvlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggaW52b2tlRXh0ZW5zaW9uKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDooqvosIPnlKjnmoTmianlsZXog73lipvmmK/lkKblt7Lnu4/lronoo4XlubbpgJrov4cgcmVnaXN0ZXJFeHRlbnNpb24oKSDms6jlhownLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBpbnZva2VFeHRlbnNpb24obmFtZTogc3RyaW5nLCBvcHRzOiBhbnkpIHtcbiAgICBjb25zdCBleHQgPSBleHRlbnNpb25NYXBbbmFtZV07XG4gICAgaWYgKCFleHQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgbXNnOiBgZXh0ZW5zaW9uOiR7bmFtZX0gbXVzdCBiZSByZWdpc3RlcmVkIGJlZm9yZSBpbnZva2VgXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF3YWl0IGV4dC5pbnZva2Uob3B0cywgdGhpcyk7XG4gIH1cblxuICBwdWJsaWMgdXNlQWRhcHRlcnMoYWRhcHRlcnM6IENsb3VkYmFzZUFkYXB0ZXIgfCBDbG91ZGJhc2VBZGFwdGVyW10pIHtcbiAgICBjb25zdCB7IGFkYXB0ZXIsIHJ1bnRpbWUgfSA9IHVzZUFkYXB0ZXJzKGFkYXB0ZXJzKSB8fCB7fTtcbiAgICBhZGFwdGVyICYmIChQbGF0Zm9ybS5hZGFwdGVyID0gYWRhcHRlciBhcyBTREtBZGFwdGVySW50ZXJmYWNlKTtcbiAgICBydW50aW1lICYmIChQbGF0Zm9ybS5ydW50aW1lID0gcnVudGltZSBhcyBzdHJpbmcpO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVySG9vayhob29rOiBJQ2xvdWRiYXNlSG9vaykge1xuICAgIHJlZ2lzdGVySG9vayhDbG91ZGJhc2UsIGhvb2spXG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50OiBJQ2xvdWRiYXNlQ29tcG9uZW50KSB7XG4gICAgcmVnaXN0ZXJDb21wb25lbnQoQ2xvdWRiYXNlLCBjb21wb25lbnQpO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyVmVyc2lvbih2ZXJzaW9uOiBzdHJpbmcpIHtcbiAgICBzZXRTZGtWZXJzaW9uKHZlcnNpb24pO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyU2RrTmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICBzZXRTZGtOYW1lKG5hbWUpO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyRW5kUG9pbnQodXJsOiBzdHJpbmcsIHByb3RvY29sPzogJ2h0dHAnIHwgJ2h0dHBzJykge1xuICAgIHNldEVuZFBvaW50KHVybCwgcHJvdG9jb2wpXG4gIH1cblxuICBwcml2YXRlIF91c2VEZWZhdWx0QWRhcHRlcigpIHtcbiAgICBjb25zdCB7IGFkYXB0ZXIsIHJ1bnRpbWUgfSA9IHVzZURlZmF1bHRBZGFwdGVyKCk7XG4gICAgUGxhdGZvcm0uYWRhcHRlciA9IGFkYXB0ZXIgYXMgU0RLQWRhcHRlckludGVyZmFjZTtcbiAgICBQbGF0Zm9ybS5ydW50aW1lID0gcnVudGltZSBhcyBzdHJpbmc7XG4gIH1cblxuICBwcml2YXRlIF9mb3JtYXRUaW1lb3V0KHRpbWVvdXQ6IG51bWJlcikge1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB0aW1lb3V0ID4gTUFYX1RJTUVPVVQ6XG4gICAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsICd0aW1lb3V0IGlzIGdyZWF0ZXIgdGhhbiBtYXhpbXVtIHZhbHVlWzEwbWluXScpO1xuICAgICAgICByZXR1cm4gTUFYX1RJTUVPVVQ7XG4gICAgICBjYXNlIHRpbWVvdXQgPCBNSU5fVElNRU9VVDpcbiAgICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ3RpbWVvdXQgaXMgbGVzcyB0aGFuIG1heGltdW0gdmFsdWVbMTAwbXNdJyk7XG4gICAgICAgIHJldHVybiBNSU5fVElNRU9VVDtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0aW1lb3V0O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY2xvdWRiYXNlOiBJQ2xvdWRiYXNlID0gbmV3IENsb3VkYmFzZSgpO1xuY2xvdWRiYXNlLnVzZUFkYXB0ZXJzKGFkYXB0ZXJGb3JXeE1wKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xvdWRiYXNlOyJdfQ==