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
import { adapters, constants, utils, helpers } from '@cloudbase/utilities';
import adapterForWxMp from 'cloudbase-adapter-wx_mp';
import { registerComponent, registerHook } from './libs/component';
import { Platform } from './libs/adapter';
import { initCache, getCacheByEnvId, getLocalCache } from './libs/cache';
import { initRequest, getRequestByEnvId } from './libs/request';
import { getSdkName, setSdkVersion, setEndPoint, setRegionLevelEndpoint, setSdkName } from './constants/common';
var useAdapters = adapters.useAdapters, useDefaultAdapter = adapters.useDefaultAdapter, RUNTIME = adapters.RUNTIME;
var ERRORS = constants.ERRORS, COMMUNITY_SITE_URL = constants.COMMUNITY_SITE_URL;
var printWarn = utils.printWarn;
var catchErrorsDecorator = helpers.catchErrorsDecorator;
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
            return Platform;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cloudbase.prototype, "cache", {
        get: function () {
            return getCacheByEnvId(this._config.env);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cloudbase.prototype, "localCache", {
        get: function () {
            return getLocalCache(this._config.env);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cloudbase.prototype, "request", {
        get: function () {
            return getRequestByEnvId(this._config.env);
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
        if (!Platform.adapter) {
            this._useDefaultAdapter();
        }
        this.requestClient = new Platform.adapter.reqClass({
            timeout: config.timeout || 5000,
            timeoutMsg: "[" + getSdkName() + "][REQUEST TIMEOUT] request had been abort since didn't finished within" + config.timeout / 1000 + "s"
        });
        if (Platform.runtime !== RUNTIME.WEB) {
            if (!config.appSecret) {
                throw new Error(JSON.stringify({
                    code: ERRORS.INVALID_PARAMS,
                    msg: 'invalid appSecret'
                }));
            }
            var appSign_1 = Platform.adapter.getAppSign ? Platform.adapter.getAppSign() : '';
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
        initCache({ env: env, persistence: persistence, debug: debug, platformInfo: this.platform });
        initRequest({ env: env, region: config.region || '', timeout: timeout, appSecret: appSecret, appSign: appSign });
        if (config.region) {
            setRegionLevelEndpoint(env, config.region || '');
        }
        var app = new Cloudbase(this._config);
        app.requestClient = this.requestClient;
        return app;
    };
    Cloudbase.prototype.updateConfig = function (config) {
        var persistence = config.persistence, debug = config.debug;
        this._config.persistence = persistence;
        this._config.debug = debug;
        initCache({ env: this._config.env, persistence: persistence, debug: debug, platformInfo: this.platform });
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
        adapter && (Platform.adapter = adapter);
        runtime && (Platform.runtime = runtime);
    };
    Cloudbase.prototype.registerHook = function (hook) {
        registerHook(Cloudbase, hook);
    };
    Cloudbase.prototype.registerComponent = function (component) {
        registerComponent(Cloudbase, component);
    };
    Cloudbase.prototype.registerVersion = function (version) {
        setSdkVersion(version);
    };
    Cloudbase.prototype.registerSdkName = function (name) {
        setSdkName(name);
    };
    Cloudbase.prototype.registerEndPoint = function (url, protocol) {
        setEndPoint(url, protocol);
    };
    Cloudbase.prototype._useDefaultAdapter = function () {
        var _a = useDefaultAdapter(), adapter = _a.adapter, runtime = _a.runtime;
        Platform.adapter = adapter;
        Platform.runtime = runtime;
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
export var cloudbase = new Cloudbase();
cloudbase.useAdapters(adapterForWxMp);
export default cloudbase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFJM0UsT0FBTyxjQUFjLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUcxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxzQkFBc0IsRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV4RyxJQUFBLFdBQVcsR0FBaUMsUUFBUSxZQUF6QyxFQUFFLGlCQUFpQixHQUFjLFFBQVEsa0JBQXRCLEVBQUUsT0FBTyxHQUFLLFFBQVEsUUFBYixDQUFjO0FBQ3JELElBQUEsTUFBTSxHQUF5QixTQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUssU0FBUyxtQkFBZCxDQUFlO0FBQ3pDLElBQUEsU0FBUyxHQUFLLEtBQUssVUFBVixDQUFXO0FBQ3BCLElBQUEsb0JBQW9CLEdBQUssT0FBTyxxQkFBWixDQUFhO0FBS3pDLElBQU0sbUJBQW1CLEdBQThCO0lBQ3JELE9BQU8sRUFBRSxLQUFLO0lBQ2QsV0FBVyxFQUFFLFNBQVM7Q0FDdkIsQ0FBQztBQUdGLElBQU0sV0FBVyxHQUFHLElBQUksR0FB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QUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVixzQ0FBc0M7Z0JBQ3RDLDJHQUEyRztnQkFDM0csaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozt3Q0FDcUMsU0FBUzt5Q0F5RC9DO0lBc0JEO1FBVEMsb0JBQW9CLENBQUM7WUFDcEIsS0FBSyxFQUFFLFVBQVU7WUFDakIsUUFBUSxFQUFFO2dCQUNSLFVBQVU7Z0JBQ1YsdUNBQXVDO2dCQUN2QyxnREFBZ0Q7Z0JBQ2hELGlLQUE2QixrQkFBb0I7YUFDbEQ7U0FDRixDQUFDOzs7O29EQVdEO0lBOENILGdCQUFDO0NBQUEsQUEvS0QsSUErS0M7QUFFRCxNQUFNLENBQUMsSUFBTSxTQUFTLEdBQWUsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUNyRCxTQUFTLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRXRDLGVBQWUsU0FBUyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWRhcHRlcnMsIGNvbnN0YW50cywgdXRpbHMsIGhlbHBlcnMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBTREtBZGFwdGVySW50ZXJmYWNlLCBDbG91ZGJhc2VBZGFwdGVyLCBJUmVxdWVzdENvbmZpZyB9IGZyb20gJ0BjbG91ZGJhc2UvYWRhcHRlci1pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNvbmZpZywgSUNsb3VkYmFzZVVwZ3JhZGVkQ29uZmlnLCBJQ2xvdWRiYXNlLCBJQ2xvdWRiYXNlRXh0ZW5zaW9uLCBLViwgSUNsb3VkYmFzZVBsYXRmb3JtSW5mbyB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUF1dGggfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2F1dGgnO1xuaW1wb3J0IGFkYXB0ZXJGb3JXeE1wIGZyb20gJ2Nsb3VkYmFzZS1hZGFwdGVyLXd4X21wJztcbmltcG9ydCB7IHJlZ2lzdGVyQ29tcG9uZW50LCByZWdpc3Rlckhvb2sgfSBmcm9tICcuL2xpYnMvY29tcG9uZW50JztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi9saWJzL2FkYXB0ZXInO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNvbXBvbmVudCwgSUNsb3VkYmFzZUhvb2sgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ2FjaGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NhY2hlJztcbmltcG9ydCB7IGluaXRDYWNoZSwgZ2V0Q2FjaGVCeUVudklkLCBnZXRMb2NhbENhY2hlIH0gZnJvbSAnLi9saWJzL2NhY2hlJztcbmltcG9ydCB7IElDbG91ZGJhc2VSZXF1ZXN0IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9yZXF1ZXN0JztcbmltcG9ydCB7IGluaXRSZXF1ZXN0LCBnZXRSZXF1ZXN0QnlFbnZJZCB9IGZyb20gJy4vbGlicy9yZXF1ZXN0JztcbmltcG9ydCB7IGdldFNka05hbWUsIHNldFNka1ZlcnNpb24sIHNldEVuZFBvaW50LCBzZXRSZWdpb25MZXZlbEVuZHBvaW50LCBzZXRTZGtOYW1lIH0gZnJvbSAnLi9jb25zdGFudHMvY29tbW9uJztcblxuY29uc3QgeyB1c2VBZGFwdGVycywgdXNlRGVmYXVsdEFkYXB0ZXIsIFJVTlRJTUUgfSA9IGFkYXB0ZXJzO1xuY29uc3QgeyBFUlJPUlMsIENPTU1VTklUWV9TSVRFX1VSTCB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyBwcmludFdhcm4gfSA9IHV0aWxzO1xuY29uc3QgeyBjYXRjaEVycm9yc0RlY29yYXRvciB9ID0gaGVscGVycztcblxuLyoqXG4gKiBAY29uc3RhbnQg6buY6K6k6YWN572uXG4gKi9cbmNvbnN0IERFRkFVTFRfSU5JVF9DT05GSUc6IFBhcnRpYWw8SUNsb3VkYmFzZUNvbmZpZz4gPSB7XG4gIHRpbWVvdXQ6IDE1MDAwLFxuICBwZXJzaXN0ZW5jZTogJ3Nlc3Npb24nXG59O1xuXG4vLyB0aW1lb3V05LiK6ZmQMTDliIbpkp9cbmNvbnN0IE1BWF9USU1FT1VUID0gMTAwMCAqIDYwICogMTA7XG4vLyB0aW1lb3V05LiL6ZmQMTAwbXNcbmNvbnN0IE1JTl9USU1FT1VUID0gMTAwO1xuXG5jb25zdCBleHRlbnNpb25NYXA6IEtWPElDbG91ZGJhc2VFeHRlbnNpb24+ID0ge307XG5cbmNsYXNzIENsb3VkYmFzZSBpbXBsZW1lbnRzIElDbG91ZGJhc2Uge1xuICBwdWJsaWMgYXV0aEluc3RhbmNlOiBJQ2xvdWRiYXNlQXV0aDtcbiAgcHVibGljIHJlcXVlc3RDbGllbnQ6IGFueTtcbiAgcHJpdmF0ZSBfY29uZmlnOiBJQ2xvdWRiYXNlQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZz86IElDbG91ZGJhc2VDb25maWcpIHtcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWcgPyBjb25maWcgOiB0aGlzLl9jb25maWc7XG4gICAgdGhpcy5hdXRoSW5zdGFuY2UgPSBudWxsO1xuICB9XG5cbiAgZ2V0IGNvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9XG5cbiAgZ2V0IHBsYXRmb3JtKCk6IElDbG91ZGJhc2VQbGF0Zm9ybUluZm8ge1xuICAgIHJldHVybiBQbGF0Zm9ybTtcbiAgfVxuXG4gIGdldCBjYWNoZSgpOiBJQ2xvdWRiYXNlQ2FjaGUge1xuICAgIHJldHVybiBnZXRDYWNoZUJ5RW52SWQodGhpcy5fY29uZmlnLmVudik7XG4gIH1cblxuICBnZXQgbG9jYWxDYWNoZSgpOiBJQ2xvdWRiYXNlQ2FjaGUge1xuICAgIHJldHVybiBnZXRMb2NhbENhY2hlKHRoaXMuX2NvbmZpZy5lbnYpO1xuICB9XG5cbiAgZ2V0IHJlcXVlc3QoKTogSUNsb3VkYmFzZVJlcXVlc3Qge1xuICAgIHJldHVybiBnZXRSZXF1ZXN0QnlFbnZJZCh0aGlzLl9jb25maWcuZW52KTtcbiAgfVxuXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgbW9kZTogJ3N5bmMnLFxuICAgIHRpdGxlOiAnQ2xvdWRiYXNlIOWIneWni+WMluWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBjbG91ZGJhc2UuaW5pdCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5aaC5p6c5piv6Z2e5rWP6KeI5Zmo546v5aKD77yM5piv5ZCm6YWN572u5LqG5a6J5YWo5bqU55So5p2l5rqQ77yIaHR0cHM6Ly9kb2NzLmNsb3VkYmFzZS5uZXQvYXBpLXJlZmVyZW5jZS93ZWJ2Mi9hZGFwdGVyLmh0bWwjamllLXJ1LWxpdS1jaGVuZ++8iScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGluaXQoY29uZmlnOiBJQ2xvdWRiYXNlQ29uZmlnKTogQ2xvdWRiYXNlIHtcbiAgICBpZiAoIWNvbmZpZy5lbnYpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgbXNnOiAnZW52IG11c3Qgbm90IGJlIHNwZWNpZmllZCdcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgLy8g5Yid5aeL5YyW5pe26Iul5pyq5YW85a655bmz5Y+w77yM5YiZ5L2/55So6buY6K6kYWRhcHRlclxuICAgIGlmICghUGxhdGZvcm0uYWRhcHRlcikge1xuICAgICAgdGhpcy5fdXNlRGVmYXVsdEFkYXB0ZXIoKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlcXVlc3RDbGllbnQgPSBuZXcgUGxhdGZvcm0uYWRhcHRlci5yZXFDbGFzcyh7XG4gICAgICB0aW1lb3V0OiBjb25maWcudGltZW91dCB8fCA1MDAwLFxuICAgICAgdGltZW91dE1zZzogYFske2dldFNka05hbWUoKX1dW1JFUVVFU1QgVElNRU9VVF0gcmVxdWVzdCBoYWQgYmVlbiBhYm9ydCBzaW5jZSBkaWRuXFwndCBmaW5pc2hlZCB3aXRoaW4ke2NvbmZpZy50aW1lb3V0IC8gMTAwMH1zYFxuICAgIH0gYXMgSVJlcXVlc3RDb25maWcpO1xuICAgIGlmIChQbGF0Zm9ybS5ydW50aW1lICE9PSBSVU5USU1FLldFQikge1xuICAgICAgaWYgKCFjb25maWcuYXBwU2VjcmV0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICAgIG1zZzogJ2ludmFsaWQgYXBwU2VjcmV0J1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICAvLyBhZGFwdGVy5o+Q5L6b6I635Y+W5bqU55So5qCH6K+G55qE5o6l5Y+jXG4gICAgICBjb25zdCBhcHBTaWduID0gUGxhdGZvcm0uYWRhcHRlci5nZXRBcHBTaWduID8gUGxhdGZvcm0uYWRhcHRlci5nZXRBcHBTaWduKCkgOiAnJztcbiAgICAgIGlmIChjb25maWcuYXBwU2lnbiAmJiBhcHBTaWduICYmIGNvbmZpZy5hcHBTaWduICE9PSBhcHBTaWduKSB7XG4gICAgICAgIC8vIOS8oOWFpeeahGFwcFNpZ27kuI5zZGvojrflj5bnmoTkuI3kuIDoh7RcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgICAgbXNnOiAnaW52YWxpZCBhcHBTaWduJ1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICBhcHBTaWduICYmIChjb25maWcuYXBwU2lnbiA9IGFwcFNpZ24pO1xuICAgICAgaWYgKCFjb25maWcuYXBwU2lnbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgICBtc2c6ICdpbnZhbGlkIGFwcFNpZ24nXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fY29uZmlnID0ge1xuICAgICAgLi4uREVGQVVMVF9JTklUX0NPTkZJRyxcbiAgICAgIC4uLmNvbmZpZ1xuICAgIH07XG4gICAgLy8g5L+u5q2jdGltZW91dOWPluWAvFxuICAgIHRoaXMuX2NvbmZpZy50aW1lb3V0ID0gdGhpcy5fZm9ybWF0VGltZW91dCh0aGlzLl9jb25maWcudGltZW91dCk7XG4gICAgLy8g5Yid5aeL5YyWY2FjaGXlkoxyZXF1ZXN0XG4gICAgY29uc3QgeyBlbnYsIHBlcnNpc3RlbmNlLCBkZWJ1ZywgdGltZW91dCwgYXBwU2VjcmV0LCBhcHBTaWduIH0gPSB0aGlzLl9jb25maWc7XG4gICAgaW5pdENhY2hlKHsgZW52LCBwZXJzaXN0ZW5jZSwgZGVidWcsIHBsYXRmb3JtSW5mbzogdGhpcy5wbGF0Zm9ybSB9KTtcbiAgICBpbml0UmVxdWVzdCh7IGVudiwgcmVnaW9uOiBjb25maWcucmVnaW9uIHx8ICcnLCB0aW1lb3V0LCBhcHBTZWNyZXQsIGFwcFNpZ24gfSk7XG5cbiAgICBpZiAoY29uZmlnLnJlZ2lvbikge1xuICAgICAgc2V0UmVnaW9uTGV2ZWxFbmRwb2ludChlbnYsIGNvbmZpZy5yZWdpb24gfHwgJycpXG4gICAgfVxuICAgIGNvbnN0IGFwcCA9IG5ldyBDbG91ZGJhc2UodGhpcy5fY29uZmlnKTtcbiAgICBhcHAucmVxdWVzdENsaWVudCA9IHRoaXMucmVxdWVzdENsaWVudDtcbiAgICByZXR1cm4gYXBwO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZUNvbmZpZyhjb25maWc6IElDbG91ZGJhc2VVcGdyYWRlZENvbmZpZykge1xuICAgIGNvbnN0IHsgcGVyc2lzdGVuY2UsIGRlYnVnIH0gPSBjb25maWc7XG4gICAgdGhpcy5fY29uZmlnLnBlcnNpc3RlbmNlID0gcGVyc2lzdGVuY2U7XG4gICAgdGhpcy5fY29uZmlnLmRlYnVnID0gZGVidWc7XG4gICAgLy8gcGVyc2lzdGVuY2XmlLnliqjlvbHlk41jYWNoZVxuICAgIGluaXRDYWNoZSh7IGVudjogdGhpcy5fY29uZmlnLmVudiwgcGVyc2lzdGVuY2UsIGRlYnVnLCBwbGF0Zm9ybUluZm86IHRoaXMucGxhdGZvcm0gfSk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJFeHRlbnNpb24oZXh0OiBJQ2xvdWRiYXNlRXh0ZW5zaW9uKSB7XG4gICAgZXh0ZW5zaW9uTWFwW2V4dC5uYW1lXSA9IGV4dDtcbiAgfVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6LCD55So5omp5bGV6IO95Yqb5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGludm9rZUV4dGVuc2lvbigpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g6KKr6LCD55So55qE5omp5bGV6IO95Yqb5piv5ZCm5bey57uP5a6J6KOF5bm26YCa6L+HIHJlZ2lzdGVyRXh0ZW5zaW9uKCkg5rOo5YaMJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgaW52b2tlRXh0ZW5zaW9uKG5hbWU6IHN0cmluZywgb3B0czogYW55KSB7XG4gICAgY29uc3QgZXh0ID0gZXh0ZW5zaW9uTWFwW25hbWVdO1xuICAgIGlmICghZXh0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgIG1zZzogYGV4dGVuc2lvbjoke25hbWV9IG11c3QgYmUgcmVnaXN0ZXJlZCBiZWZvcmUgaW52b2tlYFxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIHJldHVybiBhd2FpdCBleHQuaW52b2tlKG9wdHMsIHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHVzZUFkYXB0ZXJzKGFkYXB0ZXJzOiBDbG91ZGJhc2VBZGFwdGVyIHwgQ2xvdWRiYXNlQWRhcHRlcltdKSB7XG4gICAgY29uc3QgeyBhZGFwdGVyLCBydW50aW1lIH0gPSB1c2VBZGFwdGVycyhhZGFwdGVycykgfHwge307XG4gICAgYWRhcHRlciAmJiAoUGxhdGZvcm0uYWRhcHRlciA9IGFkYXB0ZXIgYXMgU0RLQWRhcHRlckludGVyZmFjZSk7XG4gICAgcnVudGltZSAmJiAoUGxhdGZvcm0ucnVudGltZSA9IHJ1bnRpbWUgYXMgc3RyaW5nKTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlckhvb2soaG9vazogSUNsb3VkYmFzZUhvb2spIHtcbiAgICByZWdpc3Rlckhvb2soQ2xvdWRiYXNlLCBob29rKVxuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudDogSUNsb3VkYmFzZUNvbXBvbmVudCkge1xuICAgIHJlZ2lzdGVyQ29tcG9uZW50KENsb3VkYmFzZSwgY29tcG9uZW50KTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlclZlcnNpb24odmVyc2lvbjogc3RyaW5nKSB7XG4gICAgc2V0U2RrVmVyc2lvbih2ZXJzaW9uKTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlclNka05hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgc2V0U2RrTmFtZShuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlckVuZFBvaW50KHVybDogc3RyaW5nLCBwcm90b2NvbD86ICdodHRwJyB8ICdodHRwcycpIHtcbiAgICBzZXRFbmRQb2ludCh1cmwsIHByb3RvY29sKVxuICB9XG5cbiAgcHJpdmF0ZSBfdXNlRGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgY29uc3QgeyBhZGFwdGVyLCBydW50aW1lIH0gPSB1c2VEZWZhdWx0QWRhcHRlcigpO1xuICAgIFBsYXRmb3JtLmFkYXB0ZXIgPSBhZGFwdGVyIGFzIFNES0FkYXB0ZXJJbnRlcmZhY2U7XG4gICAgUGxhdGZvcm0ucnVudGltZSA9IHJ1bnRpbWUgYXMgc3RyaW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9ybWF0VGltZW91dCh0aW1lb3V0OiBudW1iZXIpIHtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgdGltZW91dCA+IE1BWF9USU1FT1VUOlxuICAgICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfUEFSQU1TLCAndGltZW91dCBpcyBncmVhdGVyIHRoYW4gbWF4aW11bSB2YWx1ZVsxMG1pbl0nKTtcbiAgICAgICAgcmV0dXJuIE1BWF9USU1FT1VUO1xuICAgICAgY2FzZSB0aW1lb3V0IDwgTUlOX1RJTUVPVVQ6XG4gICAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsICd0aW1lb3V0IGlzIGxlc3MgdGhhbiBtYXhpbXVtIHZhbHVlWzEwMG1zXScpO1xuICAgICAgICByZXR1cm4gTUlOX1RJTUVPVVQ7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGltZW91dDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNsb3VkYmFzZTogSUNsb3VkYmFzZSA9IG5ldyBDbG91ZGJhc2UoKTtcbmNsb3VkYmFzZS51c2VBZGFwdGVycyhhZGFwdGVyRm9yV3hNcCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsb3VkYmFzZTsiXX0=