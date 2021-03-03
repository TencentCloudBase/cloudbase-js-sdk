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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFJM0UsT0FBTyxjQUFjLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUcxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxzQkFBc0IsRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV4RyxJQUFBLFdBQVcsR0FBaUMsUUFBUSxZQUF6QyxFQUFFLGlCQUFpQixHQUFjLFFBQVEsa0JBQXRCLEVBQUUsT0FBTyxHQUFLLFFBQVEsUUFBYixDQUFjO0FBQ3JELElBQUEsTUFBTSxHQUF5QixTQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUssU0FBUyxtQkFBZCxDQUFlO0FBQ3pDLElBQUEsU0FBUyxHQUFLLEtBQUssVUFBVixDQUFXO0FBQ3BCLElBQUEsb0JBQW9CLEdBQUssT0FBTyxxQkFBWixDQUFhO0FBS3pDLElBQU0sbUJBQW1CLEdBQTZCO0lBQ3BELE9BQU8sRUFBRSxLQUFLO0lBQ2QsV0FBVyxFQUFFLFNBQVM7Q0FDdkIsQ0FBQztBQUdGLElBQU0sV0FBVyxHQUFHLElBQUksR0FB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QUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVixzQ0FBc0M7Z0JBQ3RDLDJHQUEyRztnQkFDM0csaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozt3Q0FDb0MsU0FBUzt5Q0F5RDlDO0lBc0JEO1FBVEMsb0JBQW9CLENBQUM7WUFDcEIsS0FBSyxFQUFFLFVBQVU7WUFDakIsUUFBUSxFQUFFO2dCQUNSLFVBQVU7Z0JBQ1YsdUNBQXVDO2dCQUN2QyxnREFBZ0Q7Z0JBQ2hELGlLQUE2QixrQkFBb0I7YUFDbEQ7U0FDRixDQUFDOzs7O29EQVdEO0lBOENILGdCQUFDO0NBQUEsQUE5S0QsSUE4S0M7QUFFRCxNQUFNLENBQUMsSUFBTSxTQUFTLEdBQWMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUNwRCxTQUFTLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRXRDLGVBQWUsU0FBUyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWRhcHRlcnMsIGNvbnN0YW50cywgdXRpbHMsIGhlbHBlcnMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBTREtBZGFwdGVySW50ZXJmYWNlLCBDbG91ZGJhc2VBZGFwdGVyLCBJUmVxdWVzdENvbmZpZyB9IGZyb20gJ0BjbG91ZGJhc2UvYWRhcHRlci1pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNvbmZpZywgSUNsb3VkYmFzZVVwZ3JhZGVkQ29uZmlnLCBJQ2xvdWRiYXNlLCBJQ2xvdWRiYXNlRXh0ZW5zaW9uLCBLViwgSUNsb3VkYmFzZVBsYXRmb3JtSW5mbyB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUF1dGggfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2F1dGgnO1xuaW1wb3J0IGFkYXB0ZXJGb3JXeE1wIGZyb20gJ2Nsb3VkYmFzZS1hZGFwdGVyLXd4X21wJztcbmltcG9ydCB7IHJlZ2lzdGVyQ29tcG9uZW50LCByZWdpc3Rlckhvb2sgfSBmcm9tICcuL2xpYnMvY29tcG9uZW50JztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi9saWJzL2FkYXB0ZXInO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNvbXBvbmVudCwgSUNsb3VkYmFzZUhvb2sgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ2FjaGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NhY2hlJztcbmltcG9ydCB7IGluaXRDYWNoZSwgZ2V0Q2FjaGVCeUVudklkLCBnZXRMb2NhbENhY2hlIH0gZnJvbSAnLi9saWJzL2NhY2hlJztcbmltcG9ydCB7IElDbG91ZGJhc2VSZXF1ZXN0IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9yZXF1ZXN0JztcbmltcG9ydCB7IGluaXRSZXF1ZXN0LCBnZXRSZXF1ZXN0QnlFbnZJZCB9IGZyb20gJy4vbGlicy9yZXF1ZXN0JztcbmltcG9ydCB7IGdldFNka05hbWUsIHNldFNka1ZlcnNpb24sIHNldEVuZFBvaW50LCBzZXRSZWdpb25MZXZlbEVuZHBvaW50LCBzZXRTZGtOYW1lIH0gZnJvbSAnLi9jb25zdGFudHMvY29tbW9uJztcblxuY29uc3QgeyB1c2VBZGFwdGVycywgdXNlRGVmYXVsdEFkYXB0ZXIsIFJVTlRJTUUgfSA9IGFkYXB0ZXJzO1xuY29uc3QgeyBFUlJPUlMsIENPTU1VTklUWV9TSVRFX1VSTCB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyBwcmludFdhcm4gfSA9IHV0aWxzO1xuY29uc3QgeyBjYXRjaEVycm9yc0RlY29yYXRvciB9ID0gaGVscGVycztcblxuLyoqXG4gKiBAY29uc3RhbnQg6buY6K6k6YWN572uXG4gKi9cbmNvbnN0IERFRkFVTFRfSU5JVF9DT05GSUc6UGFydGlhbDxJQ2xvdWRiYXNlQ29uZmlnPiA9IHtcbiAgdGltZW91dDogMTUwMDAsXG4gIHBlcnNpc3RlbmNlOiAnc2Vzc2lvbidcbn07XG5cbi8vIHRpbWVvdXTkuIrpmZAxMOWIhumSn1xuY29uc3QgTUFYX1RJTUVPVVQgPSAxMDAwICogNjAgKiAxMDtcbi8vIHRpbWVvdXTkuIvpmZAxMDBtc1xuY29uc3QgTUlOX1RJTUVPVVQgPSAxMDA7XG5cbmNvbnN0IGV4dGVuc2lvbk1hcDpLVjxJQ2xvdWRiYXNlRXh0ZW5zaW9uPiA9IHt9O1xuXG5jbGFzcyBDbG91ZGJhc2UgaW1wbGVtZW50cyBJQ2xvdWRiYXNle1xuICBwdWJsaWMgYXV0aEluc3RhbmNlOiBJQ2xvdWRiYXNlQXV0aDtcbiAgcHVibGljIHJlcXVlc3RDbGllbnQ6IGFueTtcbiAgcHJpdmF0ZSBfY29uZmlnOiBJQ2xvdWRiYXNlQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZz86IElDbG91ZGJhc2VDb25maWcpIHtcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWcgPyBjb25maWcgOiB0aGlzLl9jb25maWc7XG4gICAgdGhpcy5hdXRoSW5zdGFuY2UgPSBudWxsO1xuICB9XG5cbiAgZ2V0IGNvbmZpZygpe1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICBnZXQgcGxhdGZvcm0oKTpJQ2xvdWRiYXNlUGxhdGZvcm1JbmZve1xuICAgIHJldHVybiBQbGF0Zm9ybTtcbiAgfVxuXG4gIGdldCBjYWNoZSgpOklDbG91ZGJhc2VDYWNoZXtcbiAgICByZXR1cm4gZ2V0Q2FjaGVCeUVudklkKHRoaXMuX2NvbmZpZy5lbnYpO1xuICB9XG5cbiAgZ2V0IGxvY2FsQ2FjaGUoKTpJQ2xvdWRiYXNlQ2FjaGV7XG4gICAgcmV0dXJuIGdldExvY2FsQ2FjaGUodGhpcy5fY29uZmlnLmVudik7XG4gIH1cblxuICBnZXQgcmVxdWVzdCgpOklDbG91ZGJhc2VSZXF1ZXN0e1xuICAgIHJldHVybiBnZXRSZXF1ZXN0QnlFbnZJZCh0aGlzLl9jb25maWcuZW52KTtcbiAgfVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIG1vZGU6ICdzeW5jJyxcbiAgICB0aXRsZTogJ0Nsb3VkYmFzZSDliJ3lp4vljJblpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggY2xvdWRiYXNlLmluaXQoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOWmguaenOaYr+mdnua1j+iniOWZqOeOr+Wig++8jOaYr+WQpumFjee9ruS6huWuieWFqOW6lOeUqOadpea6kO+8iGh0dHBzOi8vZG9jcy5jbG91ZGJhc2UubmV0L2FwaS1yZWZlcmVuY2Uvd2VidjIvYWRhcHRlci5odG1sI2ppZS1ydS1saXUtY2hlbmfvvIknLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBpbml0KGNvbmZpZzogSUNsb3VkYmFzZUNvbmZpZyk6Q2xvdWRiYXNlIHtcbiAgICBpZighY29uZmlnLmVudil7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgIG1zZzogJ2VudiBtdXN0IG5vdCBiZSBzcGVjaWZpZWQnXG4gICAgICB9KSk7XG4gICAgfVxuICAgIC8vIOWIneWni+WMluaXtuiLpeacquWFvOWuueW5s+WPsO+8jOWImeS9v+eUqOm7mOiupGFkYXB0ZXJcbiAgICBpZiAoIVBsYXRmb3JtLmFkYXB0ZXIpIHtcbiAgICAgIHRoaXMuX3VzZURlZmF1bHRBZGFwdGVyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZXF1ZXN0Q2xpZW50ID0gbmV3IFBsYXRmb3JtLmFkYXB0ZXIucmVxQ2xhc3Moe1xuICAgICAgdGltZW91dDogY29uZmlnLnRpbWVvdXQgfHwgNTAwMCxcbiAgICAgIHRpbWVvdXRNc2c6IGBbJHtnZXRTZGtOYW1lKCl9XVtSRVFVRVNUIFRJTUVPVVRdIHJlcXVlc3QgaGFkIGJlZW4gYWJvcnQgc2luY2UgZGlkblxcJ3QgZmluaXNoZWQgd2l0aGluJHtjb25maWcudGltZW91dCAvIDEwMDB9c2BcbiAgICB9IGFzIElSZXF1ZXN0Q29uZmlnKTtcbiAgICBpZiAoUGxhdGZvcm0ucnVudGltZSAhPT0gUlVOVElNRS5XRUIpIHtcbiAgICAgIGlmICghY29uZmlnLmFwcFNlY3JldCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgICBtc2c6ICdpbnZhbGlkIGFwcFNlY3JldCdcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgLy8gYWRhcHRlcuaPkOS+m+iOt+WPluW6lOeUqOagh+ivhueahOaOpeWPo1xuICAgICAgY29uc3QgYXBwU2lnbiA9IFBsYXRmb3JtLmFkYXB0ZXIuZ2V0QXBwU2lnbiA/IFBsYXRmb3JtLmFkYXB0ZXIuZ2V0QXBwU2lnbigpIDogJyc7XG4gICAgICBpZiAoY29uZmlnLmFwcFNpZ24gJiYgYXBwU2lnbiAmJiBjb25maWcuYXBwU2lnbiAhPT0gYXBwU2lnbikge1xuICAgICAgICAvLyDkvKDlhaXnmoRhcHBTaWdu5LiOc2Rr6I635Y+W55qE5LiN5LiA6Ie0XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICAgIG1zZzogJ2ludmFsaWQgYXBwU2lnbidcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgYXBwU2lnbiAmJiAoY29uZmlnLmFwcFNpZ24gPSBhcHBTaWduKTtcbiAgICAgIGlmICghY29uZmlnLmFwcFNpZ24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgICAgbXNnOiAnaW52YWxpZCBhcHBTaWduJ1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2NvbmZpZyA9IHtcbiAgICAgIC4uLkRFRkFVTFRfSU5JVF9DT05GSUcsXG4gICAgICAuLi5jb25maWdcbiAgICB9O1xuICAgIC8vIOS/ruato3RpbWVvdXTlj5blgLxcbiAgICB0aGlzLl9jb25maWcudGltZW91dCA9IHRoaXMuX2Zvcm1hdFRpbWVvdXQodGhpcy5fY29uZmlnLnRpbWVvdXQpO1xuICAgIC8vIOWIneWni+WMlmNhY2hl5ZKMcmVxdWVzdFxuICAgIGNvbnN0IHsgZW52LCBwZXJzaXN0ZW5jZSwgZGVidWcsIHRpbWVvdXQsIGFwcFNlY3JldCwgYXBwU2lnbn0gPSB0aGlzLl9jb25maWc7XG4gICAgaW5pdENhY2hlKHsgZW52LCBwZXJzaXN0ZW5jZSwgZGVidWcsIHBsYXRmb3JtSW5mbzp0aGlzLnBsYXRmb3JtfSk7XG4gICAgaW5pdFJlcXVlc3QoeyBlbnYsIHJlZ2lvbjpjb25maWcucmVnaW9uIHx8ICcnLCB0aW1lb3V0LCBhcHBTZWNyZXQsIGFwcFNpZ259KTtcblxuICAgIGlmIChjb25maWcucmVnaW9uKSB7XG4gICAgICBzZXRSZWdpb25MZXZlbEVuZHBvaW50KGVudiwgY29uZmlnLnJlZ2lvbiB8fCAnJylcbiAgICB9XG4gICAgY29uc3QgYXBwID0gbmV3IENsb3VkYmFzZSh0aGlzLl9jb25maWcpO1xuICAgIGFwcC5yZXF1ZXN0Q2xpZW50ID0gdGhpcy5yZXF1ZXN0Q2xpZW50O1xuICAgIHJldHVybiBhcHA7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQ29uZmlnKGNvbmZpZzogSUNsb3VkYmFzZVVwZ3JhZGVkQ29uZmlnKXtcbiAgICBjb25zdCB7IHBlcnNpc3RlbmNlLCBkZWJ1ZyB9ID0gY29uZmlnO1xuICAgIHRoaXMuX2NvbmZpZy5wZXJzaXN0ZW5jZSA9IHBlcnNpc3RlbmNlO1xuICAgIHRoaXMuX2NvbmZpZy5kZWJ1ZyA9IGRlYnVnO1xuICAgIC8vIHBlcnNpc3RlbmNl5pS55Yqo5b2x5ZONY2FjaGVcbiAgICBpbml0Q2FjaGUoeyBlbnY6dGhpcy5fY29uZmlnLmVudiwgcGVyc2lzdGVuY2UsIGRlYnVnLCBwbGF0Zm9ybUluZm86dGhpcy5wbGF0Zm9ybX0pO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyRXh0ZW5zaW9uKGV4dDpJQ2xvdWRiYXNlRXh0ZW5zaW9uKSB7XG4gICAgZXh0ZW5zaW9uTWFwW2V4dC5uYW1lXSA9IGV4dDtcbiAgfVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6LCD55So5omp5bGV6IO95Yqb5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGludm9rZUV4dGVuc2lvbigpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g6KKr6LCD55So55qE5omp5bGV6IO95Yqb5piv5ZCm5bey57uP5a6J6KOF5bm26YCa6L+HIHJlZ2lzdGVyRXh0ZW5zaW9uKCkg5rOo5YaMJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgaW52b2tlRXh0ZW5zaW9uKG5hbWU6c3RyaW5nLCBvcHRzOmFueSkge1xuICAgIGNvbnN0IGV4dCA9IGV4dGVuc2lvbk1hcFtuYW1lXTtcbiAgICBpZiAoIWV4dCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICBtc2c6IGBleHRlbnNpb246JHtuYW1lfSBtdXN0IGJlIHJlZ2lzdGVyZWQgYmVmb3JlIGludm9rZWBcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXdhaXQgZXh0Lmludm9rZShvcHRzLCB0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyB1c2VBZGFwdGVycyhhZGFwdGVyczogQ2xvdWRiYXNlQWRhcHRlcnxDbG91ZGJhc2VBZGFwdGVyW10pIHtcbiAgICBjb25zdCB7IGFkYXB0ZXIsIHJ1bnRpbWUgfSA9IHVzZUFkYXB0ZXJzKGFkYXB0ZXJzKSB8fCB7fTtcbiAgICBhZGFwdGVyICYmIChQbGF0Zm9ybS5hZGFwdGVyID0gYWRhcHRlciBhcyBTREtBZGFwdGVySW50ZXJmYWNlKTtcbiAgICBydW50aW1lICYmIChQbGF0Zm9ybS5ydW50aW1lID0gcnVudGltZSBhcyBzdHJpbmcpO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVySG9vayhob29rOklDbG91ZGJhc2VIb29rKXtcbiAgICByZWdpc3Rlckhvb2soQ2xvdWRiYXNlLGhvb2spXG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50OklDbG91ZGJhc2VDb21wb25lbnQpe1xuICAgIHJlZ2lzdGVyQ29tcG9uZW50KENsb3VkYmFzZSxjb21wb25lbnQpO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyVmVyc2lvbih2ZXJzaW9uOnN0cmluZyl7XG4gICAgc2V0U2RrVmVyc2lvbih2ZXJzaW9uKTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlclNka05hbWUobmFtZTpzdHJpbmcpe1xuICAgIHNldFNka05hbWUobmFtZSk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJFbmRQb2ludCh1cmw6c3RyaW5nLHByb3RvY29sPzonaHR0cCd8J2h0dHBzJyl7XG4gICAgc2V0RW5kUG9pbnQodXJsLHByb3RvY29sKVxuICB9XG5cbiAgcHJpdmF0ZSBfdXNlRGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgY29uc3QgeyBhZGFwdGVyLCBydW50aW1lIH0gPSB1c2VEZWZhdWx0QWRhcHRlcigpO1xuICAgIFBsYXRmb3JtLmFkYXB0ZXIgPSBhZGFwdGVyIGFzIFNES0FkYXB0ZXJJbnRlcmZhY2U7XG4gICAgUGxhdGZvcm0ucnVudGltZSA9IHJ1bnRpbWUgYXMgc3RyaW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9ybWF0VGltZW91dCh0aW1lb3V0Om51bWJlcil7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRpbWVvdXQgPiBNQVhfVElNRU9VVDpcbiAgICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX1BBUkFNUywndGltZW91dCBpcyBncmVhdGVyIHRoYW4gbWF4aW11bSB2YWx1ZVsxMG1pbl0nKTtcbiAgICAgICAgcmV0dXJuIE1BWF9USU1FT1VUO1xuICAgICAgY2FzZSB0aW1lb3V0IDwgTUlOX1RJTUVPVVQ6XG4gICAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsJ3RpbWVvdXQgaXMgbGVzcyB0aGFuIG1heGltdW0gdmFsdWVbMTAwbXNdJyk7XG4gICAgICAgIHJldHVybiBNSU5fVElNRU9VVDtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0aW1lb3V0O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY2xvdWRiYXNlOklDbG91ZGJhc2UgPSBuZXcgQ2xvdWRiYXNlKCk7XG5jbG91ZGJhc2UudXNlQWRhcHRlcnMoYWRhcHRlckZvcld4TXApO1xuXG5leHBvcnQgZGVmYXVsdCBjbG91ZGJhc2U7Il19