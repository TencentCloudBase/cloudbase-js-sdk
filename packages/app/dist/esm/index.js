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
import { getSdkName, setSdkVersion, setEndPoint, setSdkName } from './constants/common';
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
        initRequest({ env: env, timeout: timeout, appSecret: appSecret, appSign: appSign });
        return new Cloudbase(this._config);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFJM0UsT0FBTyxjQUFjLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUcxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVoRixJQUFBLFdBQVcsR0FBaUMsUUFBUSxZQUF6QyxFQUFFLGlCQUFpQixHQUFjLFFBQVEsa0JBQXRCLEVBQUUsT0FBTyxHQUFLLFFBQVEsUUFBYixDQUFjO0FBQ3JELElBQUEsTUFBTSxHQUF5QixTQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUssU0FBUyxtQkFBZCxDQUFlO0FBQ3pDLElBQUEsU0FBUyxHQUFLLEtBQUssVUFBVixDQUFXO0FBQ3BCLElBQUEsb0JBQW9CLEdBQUssT0FBTyxxQkFBWixDQUFhO0FBS3pDLElBQU0sbUJBQW1CLEdBQTZCO0lBQ3BELE9BQU8sRUFBRSxLQUFLO0lBQ2QsV0FBVyxFQUFFLFNBQVM7Q0FDdkIsQ0FBQztBQUdGLElBQU0sV0FBVyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcs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QUF1QztnQkFDdkMsZ0RBQWdEO2dCQUNoRCxpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7OztvREFXRDtJQThDSCxnQkFBQztDQUFBLEFBektELElBeUtDO0FBRUQsTUFBTSxDQUFDLElBQU0sU0FBUyxHQUFjLElBQUksU0FBUyxFQUFFLENBQUM7QUFDcEQsU0FBUyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUV0QyxlQUFlLFNBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFkYXB0ZXJzLCBjb25zdGFudHMsIHV0aWxzLCBoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgU0RLQWRhcHRlckludGVyZmFjZSwgQ2xvdWRiYXNlQWRhcHRlciwgSVJlcXVlc3RDb25maWcgfSBmcm9tICdAY2xvdWRiYXNlL2FkYXB0ZXItaW50ZXJmYWNlJztcbmltcG9ydCB7IElDbG91ZGJhc2VDb25maWcsIElDbG91ZGJhc2VVcGdyYWRlZENvbmZpZywgSUNsb3VkYmFzZSwgSUNsb3VkYmFzZUV4dGVuc2lvbiwgS1YsIElDbG91ZGJhc2VQbGF0Zm9ybUluZm8gfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcbmltcG9ydCB7IElDbG91ZGJhc2VBdXRoIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9hdXRoJztcbmltcG9ydCBhZGFwdGVyRm9yV3hNcCBmcm9tICdjbG91ZGJhc2UtYWRhcHRlci13eF9tcCc7XG5pbXBvcnQgeyByZWdpc3RlckNvbXBvbmVudCwgcmVnaXN0ZXJIb29rIH0gZnJvbSAnLi9saWJzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vbGlicy9hZGFwdGVyJztcbmltcG9ydCB7IElDbG91ZGJhc2VDb21wb25lbnQsIElDbG91ZGJhc2VIb29rIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jb21wb25lbnQnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNhY2hlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSc7XG5pbXBvcnQgeyBpbml0Q2FjaGUsIGdldENhY2hlQnlFbnZJZCwgZ2V0TG9jYWxDYWNoZSB9IGZyb20gJy4vbGlicy9jYWNoZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlUmVxdWVzdCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVxdWVzdCc7XG5pbXBvcnQgeyBpbml0UmVxdWVzdCwgZ2V0UmVxdWVzdEJ5RW52SWQgfSBmcm9tICcuL2xpYnMvcmVxdWVzdCc7XG5pbXBvcnQgeyBnZXRTZGtOYW1lLCBzZXRTZGtWZXJzaW9uLCBzZXRFbmRQb2ludCwgc2V0U2RrTmFtZSB9IGZyb20gJy4vY29uc3RhbnRzL2NvbW1vbic7XG5cbmNvbnN0IHsgdXNlQWRhcHRlcnMsIHVzZURlZmF1bHRBZGFwdGVyLCBSVU5USU1FIH0gPSBhZGFwdGVycztcbmNvbnN0IHsgRVJST1JTLCBDT01NVU5JVFlfU0lURV9VUkwgfSA9IGNvbnN0YW50cztcbmNvbnN0IHsgcHJpbnRXYXJuIH0gPSB1dGlscztcbmNvbnN0IHsgY2F0Y2hFcnJvcnNEZWNvcmF0b3IgfSA9IGhlbHBlcnM7XG5cbi8qKlxuICogQGNvbnN0YW50IOm7mOiupOmFjee9rlxuICovXG5jb25zdCBERUZBVUxUX0lOSVRfQ09ORklHOlBhcnRpYWw8SUNsb3VkYmFzZUNvbmZpZz4gPSB7XG4gIHRpbWVvdXQ6IDE1MDAwLFxuICBwZXJzaXN0ZW5jZTogJ3Nlc3Npb24nXG59O1xuXG4vLyB0aW1lb3V05LiK6ZmQMTDliIbpkp9cbmNvbnN0IE1BWF9USU1FT1VUID0gMTAwMCAqIDYwICogMTA7XG4vLyB0aW1lb3V05LiL6ZmQMTAwbXNcbmNvbnN0IE1JTl9USU1FT1VUID0gMTAwO1xuXG5jb25zdCBleHRlbnNpb25NYXA6S1Y8SUNsb3VkYmFzZUV4dGVuc2lvbj4gPSB7fTtcblxuY2xhc3MgQ2xvdWRiYXNlIGltcGxlbWVudHMgSUNsb3VkYmFzZXtcbiAgcHVibGljIGF1dGhJbnN0YW5jZTogSUNsb3VkYmFzZUF1dGg7XG4gIHB1YmxpYyByZXF1ZXN0Q2xpZW50OiBhbnk7XG4gIHByaXZhdGUgX2NvbmZpZzogSUNsb3VkYmFzZUNvbmZpZztcblxuICBjb25zdHJ1Y3Rvcihjb25maWc/OiBJQ2xvdWRiYXNlQ29uZmlnKSB7XG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnID8gY29uZmlnIDogdGhpcy5fY29uZmlnO1xuICAgIHRoaXMuYXV0aEluc3RhbmNlID0gbnVsbDtcbiAgfVxuXG4gIGdldCBjb25maWcoKXtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9XG5cbiAgZ2V0IHBsYXRmb3JtKCk6SUNsb3VkYmFzZVBsYXRmb3JtSW5mb3tcbiAgICByZXR1cm4gUGxhdGZvcm07XG4gIH1cblxuICBnZXQgY2FjaGUoKTpJQ2xvdWRiYXNlQ2FjaGV7XG4gICAgcmV0dXJuIGdldENhY2hlQnlFbnZJZCh0aGlzLl9jb25maWcuZW52KTtcbiAgfVxuXG4gIGdldCBsb2NhbENhY2hlKCk6SUNsb3VkYmFzZUNhY2hle1xuICAgIHJldHVybiBnZXRMb2NhbENhY2hlKHRoaXMuX2NvbmZpZy5lbnYpO1xuICB9XG5cbiAgZ2V0IHJlcXVlc3QoKTpJQ2xvdWRiYXNlUmVxdWVzdHtcbiAgICByZXR1cm4gZ2V0UmVxdWVzdEJ5RW52SWQodGhpcy5fY29uZmlnLmVudik7XG4gIH1cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICBtb2RlOiAnc3luYycsXG4gICAgdGl0bGU6ICdDbG91ZGJhc2Ug5Yid5aeL5YyW5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGNsb3VkYmFzZS5pbml0KCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlpoLmnpzmmK/pnZ7mtY/op4jlmajnjq/looPvvIzmmK/lkKbphY3nva7kuoblronlhajlupTnlKjmnaXmupDvvIhodHRwczovL2RvY3MuY2xvdWRiYXNlLm5ldC9hcGktcmVmZXJlbmNlL3dlYnYyL2FkYXB0ZXIuaHRtbCNqaWUtcnUtbGl1LWNoZW5n77yJJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgaW5pdChjb25maWc6IElDbG91ZGJhc2VDb25maWcpOkNsb3VkYmFzZSB7XG4gICAgaWYoIWNvbmZpZy5lbnYpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICBtc2c6ICdlbnYgbXVzdCBub3QgYmUgc3BlY2lmaWVkJ1xuICAgICAgfSkpO1xuICAgIH1cbiAgICAvLyDliJ3lp4vljJbml7boi6XmnKrlhbzlrrnlubPlj7DvvIzliJnkvb/nlKjpu5jorqRhZGFwdGVyXG4gICAgaWYgKCFQbGF0Zm9ybS5hZGFwdGVyKSB7XG4gICAgICB0aGlzLl91c2VEZWZhdWx0QWRhcHRlcigpO1xuICAgIH1cblxuICAgIHRoaXMucmVxdWVzdENsaWVudCA9IG5ldyBQbGF0Zm9ybS5hZGFwdGVyLnJlcUNsYXNzKHtcbiAgICAgIHRpbWVvdXQ6IGNvbmZpZy50aW1lb3V0IHx8IDUwMDAsXG4gICAgICB0aW1lb3V0TXNnOiBgWyR7Z2V0U2RrTmFtZSgpfV1bUkVRVUVTVCBUSU1FT1VUXSByZXF1ZXN0IGhhZCBiZWVuIGFib3J0IHNpbmNlIGRpZG5cXCd0IGZpbmlzaGVkIHdpdGhpbiR7Y29uZmlnLnRpbWVvdXQgLyAxMDAwfXNgXG4gICAgfSBhcyBJUmVxdWVzdENvbmZpZyk7XG4gICAgaWYgKFBsYXRmb3JtLnJ1bnRpbWUgIT09IFJVTlRJTUUuV0VCKSB7XG4gICAgICBpZiAoIWNvbmZpZy5hcHBTZWNyZXQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgICAgbXNnOiAnaW52YWxpZCBhcHBTZWNyZXQnXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIC8vIGFkYXB0ZXLmj5Dkvpvojrflj5blupTnlKjmoIfor4bnmoTmjqXlj6NcbiAgICAgIGNvbnN0IGFwcFNpZ24gPSBQbGF0Zm9ybS5hZGFwdGVyLmdldEFwcFNpZ24gPyBQbGF0Zm9ybS5hZGFwdGVyLmdldEFwcFNpZ24oKSA6ICcnO1xuICAgICAgaWYgKGNvbmZpZy5hcHBTaWduICYmIGFwcFNpZ24gJiYgY29uZmlnLmFwcFNpZ24gIT09IGFwcFNpZ24pIHtcbiAgICAgICAgLy8g5Lyg5YWl55qEYXBwU2lnbuS4jnNka+iOt+WPlueahOS4jeS4gOiHtFxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgICBtc2c6ICdpbnZhbGlkIGFwcFNpZ24nXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIGFwcFNpZ24gJiYgKGNvbmZpZy5hcHBTaWduID0gYXBwU2lnbik7XG4gICAgICBpZiAoIWNvbmZpZy5hcHBTaWduKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICAgIG1zZzogJ2ludmFsaWQgYXBwU2lnbidcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9jb25maWcgPSB7XG4gICAgICAuLi5ERUZBVUxUX0lOSVRfQ09ORklHLFxuICAgICAgLi4uY29uZmlnXG4gICAgfTtcbiAgICAvLyDkv67mraN0aW1lb3V05Y+W5YC8XG4gICAgdGhpcy5fY29uZmlnLnRpbWVvdXQgPSB0aGlzLl9mb3JtYXRUaW1lb3V0KHRoaXMuX2NvbmZpZy50aW1lb3V0KTtcbiAgICAvLyDliJ3lp4vljJZjYWNoZeWSjHJlcXVlc3RcbiAgICBjb25zdCB7IGVudiwgcGVyc2lzdGVuY2UsIGRlYnVnLCB0aW1lb3V0LCBhcHBTZWNyZXQsIGFwcFNpZ259ID0gdGhpcy5fY29uZmlnO1xuICAgIGluaXRDYWNoZSh7IGVudiwgcGVyc2lzdGVuY2UsIGRlYnVnLCBwbGF0Zm9ybUluZm86dGhpcy5wbGF0Zm9ybX0pO1xuICAgIGluaXRSZXF1ZXN0KHsgZW52LCB0aW1lb3V0LCBhcHBTZWNyZXQsIGFwcFNpZ259KTtcblxuICAgIHJldHVybiBuZXcgQ2xvdWRiYXNlKHRoaXMuX2NvbmZpZyk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQ29uZmlnKGNvbmZpZzogSUNsb3VkYmFzZVVwZ3JhZGVkQ29uZmlnKXtcbiAgICBjb25zdCB7IHBlcnNpc3RlbmNlLCBkZWJ1ZyB9ID0gY29uZmlnO1xuICAgIHRoaXMuX2NvbmZpZy5wZXJzaXN0ZW5jZSA9IHBlcnNpc3RlbmNlO1xuICAgIHRoaXMuX2NvbmZpZy5kZWJ1ZyA9IGRlYnVnO1xuICAgIC8vIHBlcnNpc3RlbmNl5pS55Yqo5b2x5ZONY2FjaGVcbiAgICBpbml0Q2FjaGUoeyBlbnY6dGhpcy5fY29uZmlnLmVudiwgcGVyc2lzdGVuY2UsIGRlYnVnLCBwbGF0Zm9ybUluZm86dGhpcy5wbGF0Zm9ybX0pO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyRXh0ZW5zaW9uKGV4dDpJQ2xvdWRiYXNlRXh0ZW5zaW9uKSB7XG4gICAgZXh0ZW5zaW9uTWFwW2V4dC5uYW1lXSA9IGV4dDtcbiAgfVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIHRpdGxlOiAn6LCD55So5omp5bGV6IO95Yqb5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGludm9rZUV4dGVuc2lvbigpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g6KKr6LCD55So55qE5omp5bGV6IO95Yqb5piv5ZCm5bey57uP5a6J6KOF5bm26YCa6L+HIHJlZ2lzdGVyRXh0ZW5zaW9uKCkg5rOo5YaMJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgaW52b2tlRXh0ZW5zaW9uKG5hbWU6c3RyaW5nLCBvcHRzOmFueSkge1xuICAgIGNvbnN0IGV4dCA9IGV4dGVuc2lvbk1hcFtuYW1lXTtcbiAgICBpZiAoIWV4dCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICBtc2c6IGBleHRlbnNpb246JHtuYW1lfSBtdXN0IGJlIHJlZ2lzdGVyZWQgYmVmb3JlIGludm9rZWBcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXdhaXQgZXh0Lmludm9rZShvcHRzLCB0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyB1c2VBZGFwdGVycyhhZGFwdGVyczogQ2xvdWRiYXNlQWRhcHRlcnxDbG91ZGJhc2VBZGFwdGVyW10pIHtcbiAgICBjb25zdCB7IGFkYXB0ZXIsIHJ1bnRpbWUgfSA9IHVzZUFkYXB0ZXJzKGFkYXB0ZXJzKSB8fCB7fTtcbiAgICBhZGFwdGVyICYmIChQbGF0Zm9ybS5hZGFwdGVyID0gYWRhcHRlciBhcyBTREtBZGFwdGVySW50ZXJmYWNlKTtcbiAgICBydW50aW1lICYmIChQbGF0Zm9ybS5ydW50aW1lID0gcnVudGltZSBhcyBzdHJpbmcpO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVySG9vayhob29rOklDbG91ZGJhc2VIb29rKXtcbiAgICByZWdpc3Rlckhvb2soQ2xvdWRiYXNlLGhvb2spXG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50OklDbG91ZGJhc2VDb21wb25lbnQpe1xuICAgIHJlZ2lzdGVyQ29tcG9uZW50KENsb3VkYmFzZSxjb21wb25lbnQpO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyVmVyc2lvbih2ZXJzaW9uOnN0cmluZyl7XG4gICAgc2V0U2RrVmVyc2lvbih2ZXJzaW9uKTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlclNka05hbWUobmFtZTpzdHJpbmcpe1xuICAgIHNldFNka05hbWUobmFtZSk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJFbmRQb2ludCh1cmw6c3RyaW5nLHByb3RvY29sPzonaHR0cCd8J2h0dHBzJyl7XG4gICAgc2V0RW5kUG9pbnQodXJsLHByb3RvY29sKVxuICB9XG5cbiAgcHJpdmF0ZSBfdXNlRGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgY29uc3QgeyBhZGFwdGVyLCBydW50aW1lIH0gPSB1c2VEZWZhdWx0QWRhcHRlcigpO1xuICAgIFBsYXRmb3JtLmFkYXB0ZXIgPSBhZGFwdGVyIGFzIFNES0FkYXB0ZXJJbnRlcmZhY2U7XG4gICAgUGxhdGZvcm0ucnVudGltZSA9IHJ1bnRpbWUgYXMgc3RyaW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9ybWF0VGltZW91dCh0aW1lb3V0Om51bWJlcil7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRpbWVvdXQgPiBNQVhfVElNRU9VVDpcbiAgICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX1BBUkFNUywndGltZW91dCBpcyBncmVhdGVyIHRoYW4gbWF4aW11bSB2YWx1ZVsxMG1pbl0nKTtcbiAgICAgICAgcmV0dXJuIE1BWF9USU1FT1VUO1xuICAgICAgY2FzZSB0aW1lb3V0IDwgTUlOX1RJTUVPVVQ6XG4gICAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsJ3RpbWVvdXQgaXMgbGVzcyB0aGFuIG1heGltdW0gdmFsdWVbMTAwbXNdJyk7XG4gICAgICAgIHJldHVybiBNSU5fVElNRU9VVDtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0aW1lb3V0O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY2xvdWRiYXNlOklDbG91ZGJhc2UgPSBuZXcgQ2xvdWRiYXNlKCk7XG5jbG91ZGJhc2UudXNlQWRhcHRlcnMoYWRhcHRlckZvcld4TXApO1xuXG5leHBvcnQgZGVmYXVsdCBjbG91ZGJhc2U7Il19