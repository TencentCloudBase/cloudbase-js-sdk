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
var auth_1 = require("@cloudbase/auth");
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
    Object.defineProperty(Cloudbase.prototype, "eventBus", {
        get: function () {
            return auth_1.eventBus;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBMkU7QUFJM0Usb0ZBQXFEO0FBQ3JELDhDQUFtRTtBQUNuRSwwQ0FBMEM7QUFHMUMsc0NBQXlFO0FBRXpFLDBDQUFnRTtBQUNoRSw2Q0FBZ0g7QUFDaEgsd0NBQTBDO0FBRWxDLElBQUEsV0FBVyxHQUFpQyxvQkFBUSxZQUF6QyxFQUFFLGlCQUFpQixHQUFjLG9CQUFRLGtCQUF0QixFQUFFLE9BQU8sR0FBSyxvQkFBUSxRQUFiLENBQWM7QUFDckQsSUFBQSxNQUFNLEdBQXlCLHFCQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUsscUJBQVMsbUJBQWQsQ0FBZTtBQUN6QyxJQUFBLFNBQVMsR0FBSyxpQkFBSyxVQUFWLENBQVc7QUFDcEIsSUFBQSxvQkFBb0IsR0FBSyxtQkFBTyxxQkFBWixDQUFhO0FBS3pDLElBQU0sbUJBQW1CLEdBQThCO0lBQ3JELE9BQU8sRUFBRSxLQUFLO0lBQ2QsV0FBVyxFQUFFLE9BQU87Q0FDckIsQ0FBQztBQUdGLElBQU0sV0FBVyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBRW5DLElBQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUV4QixJQUFNLFlBQVksR0FBNEIsRUFBRSxDQUFDO0FBRWpEO0lBS0UsbUJBQVksTUFBeUI7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM5QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRUQsc0JBQUksNkJBQU07YUFBVjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8s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Z0JBQ1IsVUFBVTtnQkFDVix1Q0FBdUM7Z0JBQ3ZDLGdEQUFnRDtnQkFDaEQsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7b0RBV0Q7SUE4Q0gsZ0JBQUM7Q0FBQSxBQW5MRCxJQW1MQztBQUVZLFFBQUEsU0FBUyxHQUFlLElBQUksU0FBUyxFQUFFLENBQUM7QUFDckQsaUJBQVMsQ0FBQyxXQUFXLENBQUMsaUNBQWMsQ0FBQyxDQUFDO0FBRXRDLGtCQUFlLGlCQUFTLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhZGFwdGVycywgY29uc3RhbnRzLCB1dGlscywgaGVscGVycyB9IGZyb20gJ0BjbG91ZGJhc2UvdXRpbGl0aWVzJztcbmltcG9ydCB7IFNES0FkYXB0ZXJJbnRlcmZhY2UsIENsb3VkYmFzZUFkYXB0ZXIsIElSZXF1ZXN0Q29uZmlnIH0gZnJvbSAnQGNsb3VkYmFzZS9hZGFwdGVyLWludGVyZmFjZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ29uZmlnLCBJQ2xvdWRiYXNlVXBncmFkZWRDb25maWcsIElDbG91ZGJhc2UsIElDbG91ZGJhc2VFeHRlbnNpb24sIEtWLCBJQ2xvdWRiYXNlUGxhdGZvcm1JbmZvIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQXV0aCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvYXV0aCc7XG5pbXBvcnQgYWRhcHRlckZvcld4TXAgZnJvbSAnY2xvdWRiYXNlLWFkYXB0ZXItd3hfbXAnO1xuaW1wb3J0IHsgcmVnaXN0ZXJDb21wb25lbnQsIHJlZ2lzdGVySG9vayB9IGZyb20gJy4vbGlicy9jb21wb25lbnQnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuL2xpYnMvYWRhcHRlcic7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ29tcG9uZW50LCBJQ2xvdWRiYXNlSG9vayB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY29tcG9uZW50JztcbmltcG9ydCB7IElDbG91ZGJhc2VDYWNoZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY2FjaGUnO1xuaW1wb3J0IHsgaW5pdENhY2hlLCBnZXRDYWNoZUJ5RW52SWQsIGdldExvY2FsQ2FjaGUgfSBmcm9tICcuL2xpYnMvY2FjaGUnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZVJlcXVlc3QgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL3JlcXVlc3QnO1xuaW1wb3J0IHsgaW5pdFJlcXVlc3QsIGdldFJlcXVlc3RCeUVudklkIH0gZnJvbSAnLi9saWJzL3JlcXVlc3QnO1xuaW1wb3J0IHsgZ2V0U2RrTmFtZSwgc2V0U2RrVmVyc2lvbiwgc2V0RW5kUG9pbnQsIHNldFJlZ2lvbkxldmVsRW5kcG9pbnQsIHNldFNka05hbWUgfSBmcm9tICcuL2NvbnN0YW50cy9jb21tb24nO1xuaW1wb3J0IHsgZXZlbnRCdXMgfSBmcm9tIFwiQGNsb3VkYmFzZS9hdXRoXCJcblxuY29uc3QgeyB1c2VBZGFwdGVycywgdXNlRGVmYXVsdEFkYXB0ZXIsIFJVTlRJTUUgfSA9IGFkYXB0ZXJzO1xuY29uc3QgeyBFUlJPUlMsIENPTU1VTklUWV9TSVRFX1VSTCB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyBwcmludFdhcm4gfSA9IHV0aWxzO1xuY29uc3QgeyBjYXRjaEVycm9yc0RlY29yYXRvciB9ID0gaGVscGVycztcblxuLyoqXG4gKiBAY29uc3RhbnQg6buY6K6k6YWN572uXG4gKi9cbmNvbnN0IERFRkFVTFRfSU5JVF9DT05GSUc6IFBhcnRpYWw8SUNsb3VkYmFzZUNvbmZpZz4gPSB7XG4gIHRpbWVvdXQ6IDE1MDAwLFxuICBwZXJzaXN0ZW5jZTogJ2xvY2FsJ1xufTtcblxuLy8gdGltZW91dOS4iumZkDEw5YiG6ZKfXG5jb25zdCBNQVhfVElNRU9VVCA9IDEwMDAgKiA2MCAqIDEwO1xuLy8gdGltZW91dOS4i+mZkDEwMG1zXG5jb25zdCBNSU5fVElNRU9VVCA9IDEwMDtcblxuY29uc3QgZXh0ZW5zaW9uTWFwOiBLVjxJQ2xvdWRiYXNlRXh0ZW5zaW9uPiA9IHt9O1xuXG5jbGFzcyBDbG91ZGJhc2UgaW1wbGVtZW50cyBJQ2xvdWRiYXNlIHtcbiAgcHVibGljIGF1dGhJbnN0YW5jZTogSUNsb3VkYmFzZUF1dGg7XG4gIHB1YmxpYyByZXF1ZXN0Q2xpZW50OiBhbnk7XG4gIHByaXZhdGUgX2NvbmZpZzogSUNsb3VkYmFzZUNvbmZpZztcblxuICBjb25zdHJ1Y3Rvcihjb25maWc/OiBJQ2xvdWRiYXNlQ29uZmlnKSB7XG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnID8gY29uZmlnIDogdGhpcy5fY29uZmlnO1xuICAgIHRoaXMuYXV0aEluc3RhbmNlID0gbnVsbDtcbiAgfVxuXG4gIGdldCBjb25maWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuXG4gIGdldCBwbGF0Zm9ybSgpOiBJQ2xvdWRiYXNlUGxhdGZvcm1JbmZvIHtcbiAgICByZXR1cm4gUGxhdGZvcm07XG4gIH1cblxuICBnZXQgY2FjaGUoKTogSUNsb3VkYmFzZUNhY2hlIHtcbiAgICByZXR1cm4gZ2V0Q2FjaGVCeUVudklkKHRoaXMuX2NvbmZpZy5lbnYpO1xuICB9XG5cbiAgZ2V0IGxvY2FsQ2FjaGUoKTogSUNsb3VkYmFzZUNhY2hlIHtcbiAgICByZXR1cm4gZ2V0TG9jYWxDYWNoZSh0aGlzLl9jb25maWcuZW52KTtcbiAgfVxuXG4gIGdldCByZXF1ZXN0KCk6IElDbG91ZGJhc2VSZXF1ZXN0IHtcbiAgICByZXR1cm4gZ2V0UmVxdWVzdEJ5RW52SWQodGhpcy5fY29uZmlnLmVudik7XG4gIH1cblxuICBnZXQgZXZlbnRCdXMoKSB7XG4gICAgcmV0dXJuIGV2ZW50QnVzXG4gIH1cblxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIG1vZGU6ICdzeW5jJyxcbiAgICB0aXRsZTogJ0Nsb3VkYmFzZSDliJ3lp4vljJblpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggY2xvdWRiYXNlLmluaXQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOWmguaenOaYr+mdnua1j+iniOWZqOeOr+Wig++8jOaYr+WQpumFjee9ruS6huWuieWFqOW6lOeUqOadpea6kO+8iGh0dHBzOi8vZG9jcy5jbG91ZGJhc2UubmV0L2FwaS1yZWZlcmVuY2Uvd2VidjIvYWRhcHRlci5odG1sI2ppZS1ydS1saXUtY2hlbmfvvIknLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBpbml0KGNvbmZpZzogSUNsb3VkYmFzZUNvbmZpZyk6IENsb3VkYmFzZSB7XG4gICAgaWYgKCFjb25maWcuZW52KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgIG1zZzogJ2VudiBtdXN0IG5vdCBiZSBzcGVjaWZpZWQnXG4gICAgICB9KSk7XG4gICAgfVxuICAgIC8vIOWIneWni+WMluaXtuiLpeacquWFvOWuueW5s+WPsO+8jOWImeS9v+eUqOm7mOiupGFkYXB0ZXJcbiAgICBpZiAoIVBsYXRmb3JtLmFkYXB0ZXIpIHtcbiAgICAgIHRoaXMuX3VzZURlZmF1bHRBZGFwdGVyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZXF1ZXN0Q2xpZW50ID0gbmV3IFBsYXRmb3JtLmFkYXB0ZXIucmVxQ2xhc3Moe1xuICAgICAgdGltZW91dDogY29uZmlnLnRpbWVvdXQgfHwgNTAwMCxcbiAgICAgIHRpbWVvdXRNc2c6IGBbJHtnZXRTZGtOYW1lKCl9XVtSRVFVRVNUIFRJTUVPVVRdIHJlcXVlc3QgaGFkIGJlZW4gYWJvcnQgc2luY2UgZGlkblxcJ3QgZmluaXNoZWQgd2l0aGluJHtjb25maWcudGltZW91dCAvIDEwMDB9c2BcbiAgICB9IGFzIElSZXF1ZXN0Q29uZmlnKTtcbiAgICBpZiAoUGxhdGZvcm0ucnVudGltZSAhPT0gUlVOVElNRS5XRUIpIHtcbiAgICAgIGlmICghY29uZmlnLmFwcFNlY3JldCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgICBtc2c6ICdpbnZhbGlkIGFwcFNlY3JldCdcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgLy8gYWRhcHRlcuaPkOS+m+iOt+WPluW6lOeUqOagh+ivhueahOaOpeWPo1xuICAgICAgY29uc3QgYXBwU2lnbiA9IFBsYXRmb3JtLmFkYXB0ZXIuZ2V0QXBwU2lnbiA/IFBsYXRmb3JtLmFkYXB0ZXIuZ2V0QXBwU2lnbigpIDogJyc7XG4gICAgICBpZiAoY29uZmlnLmFwcFNpZ24gJiYgYXBwU2lnbiAmJiBjb25maWcuYXBwU2lnbiAhPT0gYXBwU2lnbikge1xuICAgICAgICAvLyDkvKDlhaXnmoRhcHBTaWdu5LiOc2Rr6I635Y+W55qE5LiN5LiA6Ie0XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICAgIG1zZzogJ2ludmFsaWQgYXBwU2lnbidcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgYXBwU2lnbiAmJiAoY29uZmlnLmFwcFNpZ24gPSBhcHBTaWduKTtcbiAgICAgIGlmICghY29uZmlnLmFwcFNpZ24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgICAgbXNnOiAnaW52YWxpZCBhcHBTaWduJ1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2NvbmZpZyA9IHtcbiAgICAgIC4uLkRFRkFVTFRfSU5JVF9DT05GSUcsXG4gICAgICAuLi5jb25maWdcbiAgICB9O1xuICAgIC8vIOS/ruato3RpbWVvdXTlj5blgLxcbiAgICB0aGlzLl9jb25maWcudGltZW91dCA9IHRoaXMuX2Zvcm1hdFRpbWVvdXQodGhpcy5fY29uZmlnLnRpbWVvdXQpO1xuICAgIC8vIOWIneWni+WMlmNhY2hl5ZKMcmVxdWVzdFxuICAgIGNvbnN0IHsgZW52LCBwZXJzaXN0ZW5jZSwgZGVidWcsIHRpbWVvdXQsIGFwcFNlY3JldCwgYXBwU2lnbiB9ID0gdGhpcy5fY29uZmlnO1xuICAgIGluaXRDYWNoZSh7IGVudiwgcGVyc2lzdGVuY2UsIGRlYnVnLCBwbGF0Zm9ybUluZm86IHRoaXMucGxhdGZvcm0gfSk7XG4gICAgaW5pdFJlcXVlc3QoeyBlbnYsIHJlZ2lvbjogY29uZmlnLnJlZ2lvbiB8fCAnJywgdGltZW91dCwgYXBwU2VjcmV0LCBhcHBTaWduIH0pO1xuXG4gICAgaWYgKGNvbmZpZy5yZWdpb24pIHtcbiAgICAgIHNldFJlZ2lvbkxldmVsRW5kcG9pbnQoZW52LCBjb25maWcucmVnaW9uIHx8ICcnKVxuICAgIH1cbiAgICBjb25zdCBhcHAgPSBuZXcgQ2xvdWRiYXNlKHRoaXMuX2NvbmZpZyk7XG4gICAgYXBwLnJlcXVlc3RDbGllbnQgPSB0aGlzLnJlcXVlc3RDbGllbnQ7XG4gICAgcmV0dXJuIGFwcDtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVDb25maWcoY29uZmlnOiBJQ2xvdWRiYXNlVXBncmFkZWRDb25maWcpIHtcbiAgICBjb25zdCB7IHBlcnNpc3RlbmNlLCBkZWJ1ZyB9ID0gY29uZmlnO1xuICAgIHRoaXMuX2NvbmZpZy5wZXJzaXN0ZW5jZSA9IHBlcnNpc3RlbmNlO1xuICAgIHRoaXMuX2NvbmZpZy5kZWJ1ZyA9IGRlYnVnO1xuICAgIC8vIHBlcnNpc3RlbmNl5pS55Yqo5b2x5ZONY2FjaGVcbiAgICBpbml0Q2FjaGUoeyBlbnY6IHRoaXMuX2NvbmZpZy5lbnYsIHBlcnNpc3RlbmNlLCBkZWJ1ZywgcGxhdGZvcm1JbmZvOiB0aGlzLnBsYXRmb3JtIH0pO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyRXh0ZW5zaW9uKGV4dDogSUNsb3VkYmFzZUV4dGVuc2lvbikge1xuICAgIGV4dGVuc2lvbk1hcFtleHQubmFtZV0gPSBleHQ7XG4gIH1cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iwg+eUqOaJqeWxleiDveWKm+Wksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBpbnZva2VFeHRlbnNpb24oKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOiiq+iwg+eUqOeahOaJqeWxleiDveWKm+aYr+WQpuW3sue7j+WuieijheW5tumAmui/hyByZWdpc3RlckV4dGVuc2lvbigpIOazqOWGjCcsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGludm9rZUV4dGVuc2lvbihuYW1lOiBzdHJpbmcsIG9wdHM6IGFueSkge1xuICAgIGNvbnN0IGV4dCA9IGV4dGVuc2lvbk1hcFtuYW1lXTtcbiAgICBpZiAoIWV4dCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICBtc2c6IGBleHRlbnNpb246JHtuYW1lfSBtdXN0IGJlIHJlZ2lzdGVyZWQgYmVmb3JlIGludm9rZWBcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXdhaXQgZXh0Lmludm9rZShvcHRzLCB0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyB1c2VBZGFwdGVycyhhZGFwdGVyczogQ2xvdWRiYXNlQWRhcHRlciB8IENsb3VkYmFzZUFkYXB0ZXJbXSkge1xuICAgIGNvbnN0IHsgYWRhcHRlciwgcnVudGltZSB9ID0gdXNlQWRhcHRlcnMoYWRhcHRlcnMpIHx8IHt9O1xuICAgIGFkYXB0ZXIgJiYgKFBsYXRmb3JtLmFkYXB0ZXIgPSBhZGFwdGVyIGFzIFNES0FkYXB0ZXJJbnRlcmZhY2UpO1xuICAgIHJ1bnRpbWUgJiYgKFBsYXRmb3JtLnJ1bnRpbWUgPSBydW50aW1lIGFzIHN0cmluZyk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJIb29rKGhvb2s6IElDbG91ZGJhc2VIb29rKSB7XG4gICAgcmVnaXN0ZXJIb29rKENsb3VkYmFzZSwgaG9vaylcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQ6IElDbG91ZGJhc2VDb21wb25lbnQpIHtcbiAgICByZWdpc3RlckNvbXBvbmVudChDbG91ZGJhc2UsIGNvbXBvbmVudCk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJWZXJzaW9uKHZlcnNpb246IHN0cmluZykge1xuICAgIHNldFNka1ZlcnNpb24odmVyc2lvbik7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJTZGtOYW1lKG5hbWU6IHN0cmluZykge1xuICAgIHNldFNka05hbWUobmFtZSk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJFbmRQb2ludCh1cmw6IHN0cmluZywgcHJvdG9jb2w/OiAnaHR0cCcgfCAnaHR0cHMnKSB7XG4gICAgc2V0RW5kUG9pbnQodXJsLCBwcm90b2NvbClcbiAgfVxuXG4gIHByaXZhdGUgX3VzZURlZmF1bHRBZGFwdGVyKCkge1xuICAgIGNvbnN0IHsgYWRhcHRlciwgcnVudGltZSB9ID0gdXNlRGVmYXVsdEFkYXB0ZXIoKTtcbiAgICBQbGF0Zm9ybS5hZGFwdGVyID0gYWRhcHRlciBhcyBTREtBZGFwdGVySW50ZXJmYWNlO1xuICAgIFBsYXRmb3JtLnJ1bnRpbWUgPSBydW50aW1lIGFzIHN0cmluZztcbiAgfVxuXG4gIHByaXZhdGUgX2Zvcm1hdFRpbWVvdXQodGltZW91dDogbnVtYmVyKSB7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRpbWVvdXQgPiBNQVhfVElNRU9VVDpcbiAgICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ3RpbWVvdXQgaXMgZ3JlYXRlciB0aGFuIG1heGltdW0gdmFsdWVbMTBtaW5dJyk7XG4gICAgICAgIHJldHVybiBNQVhfVElNRU9VVDtcbiAgICAgIGNhc2UgdGltZW91dCA8IE1JTl9USU1FT1VUOlxuICAgICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfUEFSQU1TLCAndGltZW91dCBpcyBsZXNzIHRoYW4gbWF4aW11bSB2YWx1ZVsxMDBtc10nKTtcbiAgICAgICAgcmV0dXJuIE1JTl9USU1FT1VUO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRpbWVvdXQ7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBjbG91ZGJhc2U6IElDbG91ZGJhc2UgPSBuZXcgQ2xvdWRiYXNlKCk7XG5jbG91ZGJhc2UudXNlQWRhcHRlcnMoYWRhcHRlckZvcld4TXApO1xuXG5leHBvcnQgZGVmYXVsdCBjbG91ZGJhc2U7Il19