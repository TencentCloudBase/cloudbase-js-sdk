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
export { getBaseEndPoint } from './constants/common';
var useAdapters = adapters.useAdapters, useDefaultAdapter = adapters.useDefaultAdapter, RUNTIME = adapters.RUNTIME;
var ERRORS = constants.ERRORS, COMMUNITY_SITE_URL = constants.COMMUNITY_SITE_URL;
var printWarn = utils.printWarn;
var catchErrorsDecorator = helpers.catchErrorsDecorator;
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
        this.oauthInstance = null;
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
        var _a = this._config, env = _a.env, persistence = _a.persistence, debug = _a.debug, timeout = _a.timeout, appSecret = _a.appSecret, appSign = _a.appSign, oauthClient = _a.oauthClient;
        initCache({ env: env, persistence: persistence, debug: debug, platformInfo: this.platform });
        setRegionLevelEndpoint(env, config.region || '');
        var app = new Cloudbase(this._config);
        initRequest({ env: env, region: config.region || '', timeout: timeout, appSecret: appSecret, appSign: appSign, oauthClient: oauthClient, _fromApp: app });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFJM0UsT0FBTyxjQUFjLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUcxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxzQkFBc0IsRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoSCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDNUMsSUFBQSxXQUFXLEdBQWlDLFFBQVEsWUFBekMsRUFBRSxpQkFBaUIsR0FBYyxRQUFRLGtCQUF0QixFQUFFLE9BQU8sR0FBSyxRQUFRLFFBQWIsQ0FBYztBQUNyRCxJQUFBLE1BQU0sR0FBeUIsU0FBUyxPQUFsQyxFQUFFLGtCQUFrQixHQUFLLFNBQVMsbUJBQWQsQ0FBZTtBQUN6QyxJQUFBLFNBQVMsR0FBSyxLQUFLLFVBQVYsQ0FBVztBQUNwQixJQUFBLG9CQUFvQixHQUFLLE9BQU8scUJBQVosQ0FBYTtBQUt6QyxJQUFNLG1CQUFtQixHQUE4QjtJQUNyRCxPQUFPLEVBQUUsS0FBSztJQUNkLFdBQVcsRUFBRSxP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QUM5RSxPQUFPLFdBQVcsQ0FBQztZQUNyQjtnQkFDRSxPQUFPLE9BQU8sQ0FBQztTQUNsQjtJQUNILENBQUM7SUF0SUQ7UUFWQyxvQkFBb0IsQ0FBQztZQUNwQixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxpQkFBaUI7WUFDeEIsUUFBUSxFQUFFO2dCQUNSLFVBQVU7Z0JBQ1Ysc0NBQXNDO2dCQUN0QywyR0FBMkc7Z0JBQzNHLGlLQUE2QixrQkFBb0I7YUFDbEQ7U0FDRixDQUFDOzs7d0NBQ3FDLFNBQVM7eUNBeUQvQztJQXNCRDtRQVRDLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxVQUFVO1lBQ2pCLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLHVDQUF1QztnQkFDdkMsZ0RBQWdEO2dCQUNoRCxpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7OztvREFXRDtJQThDSCxnQkFBQztDQUFBLEFBbkxELElBbUxDO0FBRUQsTUFBTSxDQUFDLElBQU0sU0FBUyxHQUFlLElBQUksU0FBUyxFQUFFLENBQUM7QUFDckQsU0FBUyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUV0QyxlQUFlLFNBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFkYXB0ZXJzLCBjb25zdGFudHMsIHV0aWxzLCBoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgU0RLQWRhcHRlckludGVyZmFjZSwgQ2xvdWRiYXNlQWRhcHRlciwgSVJlcXVlc3RDb25maWcgfSBmcm9tICdAY2xvdWRiYXNlL2FkYXB0ZXItaW50ZXJmYWNlJztcbmltcG9ydCB7IElDbG91ZGJhc2VDb25maWcsIElDbG91ZGJhc2VVcGdyYWRlZENvbmZpZywgSUNsb3VkYmFzZSwgSUNsb3VkYmFzZUV4dGVuc2lvbiwgS1YsIElDbG91ZGJhc2VQbGF0Zm9ybUluZm8gfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcbmltcG9ydCB7IElDbG91ZGJhc2VBdXRoIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9hdXRoJztcbmltcG9ydCBhZGFwdGVyRm9yV3hNcCBmcm9tICdjbG91ZGJhc2UtYWRhcHRlci13eF9tcCc7XG5pbXBvcnQgeyByZWdpc3RlckNvbXBvbmVudCwgcmVnaXN0ZXJIb29rIH0gZnJvbSAnLi9saWJzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vbGlicy9hZGFwdGVyJztcbmltcG9ydCB7IElDbG91ZGJhc2VDb21wb25lbnQsIElDbG91ZGJhc2VIb29rIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jb21wb25lbnQnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNhY2hlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSc7XG5pbXBvcnQgeyBpbml0Q2FjaGUsIGdldENhY2hlQnlFbnZJZCwgZ2V0TG9jYWxDYWNoZSB9IGZyb20gJy4vbGlicy9jYWNoZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlUmVxdWVzdCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVxdWVzdCc7XG5pbXBvcnQgeyBpbml0UmVxdWVzdCwgZ2V0UmVxdWVzdEJ5RW52SWQgfSBmcm9tICcuL2xpYnMvcmVxdWVzdCc7XG5pbXBvcnQgeyBnZXRTZGtOYW1lLCBzZXRTZGtWZXJzaW9uLCBzZXRFbmRQb2ludCwgc2V0UmVnaW9uTGV2ZWxFbmRwb2ludCwgc2V0U2RrTmFtZSB9IGZyb20gJy4vY29uc3RhbnRzL2NvbW1vbic7XG5leHBvcnQgeyBnZXRCYXNlRW5kUG9pbnQgfSBmcm9tICcuL2NvbnN0YW50cy9jb21tb24nXG5jb25zdCB7IHVzZUFkYXB0ZXJzLCB1c2VEZWZhdWx0QWRhcHRlciwgUlVOVElNRSB9ID0gYWRhcHRlcnM7XG5jb25zdCB7IEVSUk9SUywgQ09NTVVOSVRZX1NJVEVfVVJMIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IHByaW50V2FybiB9ID0gdXRpbHM7XG5jb25zdCB7IGNhdGNoRXJyb3JzRGVjb3JhdG9yIH0gPSBoZWxwZXJzO1xuXG4vKipcbiAqIEBjb25zdGFudCDpu5jorqTphY3nva5cbiAqL1xuY29uc3QgREVGQVVMVF9JTklUX0NPTkZJRzogUGFydGlhbDxJQ2xvdWRiYXNlQ29uZmlnPiA9IHtcbiAgdGltZW91dDogMTUwMDAsXG4gIHBlcnNpc3RlbmNlOiAnbG9jYWwnXG59O1xuXG4vLyB0aW1lb3V05LiK6ZmQMTDliIbpkp9cbmNvbnN0IE1BWF9USU1FT1VUID0gMTAwMCAqIDYwICogMTA7XG4vLyB0aW1lb3V05LiL6ZmQMTAwbXNcbmNvbnN0IE1JTl9USU1FT1VUID0gMTAwO1xuXG5jb25zdCBleHRlbnNpb25NYXA6IEtWPElDbG91ZGJhc2VFeHRlbnNpb24+ID0ge307XG5cbmNsYXNzIENsb3VkYmFzZSBpbXBsZW1lbnRzIElDbG91ZGJhc2Uge1xuICBwdWJsaWMgYXV0aEluc3RhbmNlOiBJQ2xvdWRiYXNlQXV0aDtcbiAgcHVibGljIG9hdXRoSW5zdGFuY2U6IGFueTtcbiAgcHVibGljIHJlcXVlc3RDbGllbnQ6IGFueTtcbiAgcHVibGljIG9hdXRoQ2xpZW50OiBhbnlcbiAgcHJpdmF0ZSBfY29uZmlnOiBJQ2xvdWRiYXNlQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZz86IElDbG91ZGJhc2VDb25maWcpIHtcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWcgPyBjb25maWcgOiB0aGlzLl9jb25maWc7XG4gICAgdGhpcy5hdXRoSW5zdGFuY2UgPSBudWxsO1xuICAgIHRoaXMub2F1dGhJbnN0YW5jZSA9IG51bGxcbiAgfVxuXG4gIGdldCBjb25maWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuXG4gIGdldCBwbGF0Zm9ybSgpOiBJQ2xvdWRiYXNlUGxhdGZvcm1JbmZvIHtcbiAgICByZXR1cm4gUGxhdGZvcm07XG4gIH1cblxuICBnZXQgY2FjaGUoKTogSUNsb3VkYmFzZUNhY2hlIHtcbiAgICByZXR1cm4gZ2V0Q2FjaGVCeUVudklkKHRoaXMuX2NvbmZpZy5lbnYpO1xuICB9XG5cbiAgZ2V0IGxvY2FsQ2FjaGUoKTogSUNsb3VkYmFzZUNhY2hlIHtcbiAgICByZXR1cm4gZ2V0TG9jYWxDYWNoZSh0aGlzLl9jb25maWcuZW52KTtcbiAgfVxuXG4gIGdldCByZXF1ZXN0KCk6IElDbG91ZGJhc2VSZXF1ZXN0IHtcbiAgICByZXR1cm4gZ2V0UmVxdWVzdEJ5RW52SWQodGhpcy5fY29uZmlnLmVudik7XG4gIH1cblxuXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgbW9kZTogJ3N5bmMnLFxuICAgIHRpdGxlOiAnQ2xvdWRiYXNlIOWIneWni+WMluWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBjbG91ZGJhc2UuaW5pdCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5aaC5p6c5piv6Z2e5rWP6KeI5Zmo546v5aKD77yM5piv5ZCm6YWN572u5LqG5a6J5YWo5bqU55So5p2l5rqQ77yIaHR0cHM6Ly9kb2NzLmNsb3VkYmFzZS5uZXQvYXBpLXJlZmVyZW5jZS93ZWJ2Mi9hZGFwdGVyLmh0bWwjamllLXJ1LWxpdS1jaGVuZ++8iScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGluaXQoY29uZmlnOiBJQ2xvdWRiYXNlQ29uZmlnKTogQ2xvdWRiYXNlIHtcbiAgICBpZiAoIWNvbmZpZy5lbnYpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgbXNnOiAnZW52IG11c3Qgbm90IGJlIHNwZWNpZmllZCdcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgLy8g5Yid5aeL5YyW5pe26Iul5pyq5YW85a655bmz5Y+w77yM5YiZ5L2/55So6buY6K6kYWRhcHRlclxuICAgIGlmICghUGxhdGZvcm0uYWRhcHRlcikge1xuICAgICAgdGhpcy5fdXNlRGVmYXVsdEFkYXB0ZXIoKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlcXVlc3RDbGllbnQgPSBuZXcgUGxhdGZvcm0uYWRhcHRlci5yZXFDbGFzcyh7XG4gICAgICB0aW1lb3V0OiBjb25maWcudGltZW91dCB8fCA1MDAwLFxuICAgICAgdGltZW91dE1zZzogYFske2dldFNka05hbWUoKX1dW1JFUVVFU1QgVElNRU9VVF0gcmVxdWVzdCBoYWQgYmVlbiBhYm9ydCBzaW5jZSBkaWRuXFwndCBmaW5pc2hlZCB3aXRoaW4ke2NvbmZpZy50aW1lb3V0IC8gMTAwMH1zYFxuICAgIH0gYXMgSVJlcXVlc3RDb25maWcpO1xuICAgIGlmIChQbGF0Zm9ybS5ydW50aW1lICE9PSBSVU5USU1FLldFQikge1xuICAgICAgaWYgKCFjb25maWcuYXBwU2VjcmV0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICAgIG1zZzogJ2ludmFsaWQgYXBwU2VjcmV0J1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICAvLyBhZGFwdGVy5o+Q5L6b6I635Y+W5bqU55So5qCH6K+G55qE5o6l5Y+jXG4gICAgICBjb25zdCBhcHBTaWduID0gUGxhdGZvcm0uYWRhcHRlci5nZXRBcHBTaWduID8gUGxhdGZvcm0uYWRhcHRlci5nZXRBcHBTaWduKCkgOiAnJztcbiAgICAgIGlmIChjb25maWcuYXBwU2lnbiAmJiBhcHBTaWduICYmIGNvbmZpZy5hcHBTaWduICE9PSBhcHBTaWduKSB7XG4gICAgICAgIC8vIOS8oOWFpeeahGFwcFNpZ27kuI5zZGvojrflj5bnmoTkuI3kuIDoh7RcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgICAgbXNnOiAnaW52YWxpZCBhcHBTaWduJ1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICBhcHBTaWduICYmIChjb25maWcuYXBwU2lnbiA9IGFwcFNpZ24pO1xuICAgICAgaWYgKCFjb25maWcuYXBwU2lnbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgICBtc2c6ICdpbnZhbGlkIGFwcFNpZ24nXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fY29uZmlnID0ge1xuICAgICAgLi4uREVGQVVMVF9JTklUX0NPTkZJRyxcbiAgICAgIC4uLmNvbmZpZ1xuICAgIH07XG4gICAgLy8g5L+u5q2jdGltZW91dOWPluWAvFxuICAgIHRoaXMuX2NvbmZpZy50aW1lb3V0ID0gdGhpcy5fZm9ybWF0VGltZW91dCh0aGlzLl9jb25maWcudGltZW91dCk7XG4gICAgLy8g5Yid5aeL5YyWY2FjaGXlkoxyZXF1ZXN0XG4gICAgY29uc3QgeyBlbnYsIHBlcnNpc3RlbmNlLCBkZWJ1ZywgdGltZW91dCwgYXBwU2VjcmV0LCBhcHBTaWduLCBvYXV0aENsaWVudCB9ID0gdGhpcy5fY29uZmlnO1xuICAgIGluaXRDYWNoZSh7IGVudiwgcGVyc2lzdGVuY2UsIGRlYnVnLCBwbGF0Zm9ybUluZm86IHRoaXMucGxhdGZvcm0gfSk7XG5cblxuICAgIHNldFJlZ2lvbkxldmVsRW5kcG9pbnQoZW52LCBjb25maWcucmVnaW9uIHx8ICcnKVxuXG4gICAgY29uc3QgYXBwID0gbmV3IENsb3VkYmFzZSh0aGlzLl9jb25maWcpO1xuICAgIGluaXRSZXF1ZXN0KHsgZW52LCByZWdpb246IGNvbmZpZy5yZWdpb24gfHwgJycsIHRpbWVvdXQsIGFwcFNlY3JldCwgYXBwU2lnbiwgb2F1dGhDbGllbnQsIF9mcm9tQXBwOiBhcHAgfSk7XG4gICAgYXBwLnJlcXVlc3RDbGllbnQgPSB0aGlzLnJlcXVlc3RDbGllbnQ7XG4gICAgcmV0dXJuIGFwcDtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVDb25maWcoY29uZmlnOiBJQ2xvdWRiYXNlVXBncmFkZWRDb25maWcpIHtcbiAgICBjb25zdCB7IHBlcnNpc3RlbmNlLCBkZWJ1ZyB9ID0gY29uZmlnO1xuICAgIHRoaXMuX2NvbmZpZy5wZXJzaXN0ZW5jZSA9IHBlcnNpc3RlbmNlO1xuICAgIHRoaXMuX2NvbmZpZy5kZWJ1ZyA9IGRlYnVnO1xuICAgIC8vIHBlcnNpc3RlbmNl5pS55Yqo5b2x5ZONY2FjaGVcbiAgICBpbml0Q2FjaGUoeyBlbnY6IHRoaXMuX2NvbmZpZy5lbnYsIHBlcnNpc3RlbmNlLCBkZWJ1ZywgcGxhdGZvcm1JbmZvOiB0aGlzLnBsYXRmb3JtIH0pO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyRXh0ZW5zaW9uKGV4dDogSUNsb3VkYmFzZUV4dGVuc2lvbikge1xuICAgIGV4dGVuc2lvbk1hcFtleHQubmFtZV0gPSBleHQ7XG4gIH1cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iwg+eUqOaJqeWxleiDveWKm+Wksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBpbnZva2VFeHRlbnNpb24oKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOiiq+iwg+eUqOeahOaJqeWxleiDveWKm+aYr+WQpuW3sue7j+WuieijheW5tumAmui/hyByZWdpc3RlckV4dGVuc2lvbigpIOazqOWGjCcsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGludm9rZUV4dGVuc2lvbihuYW1lOiBzdHJpbmcsIG9wdHM6IGFueSkge1xuICAgIGNvbnN0IGV4dCA9IGV4dGVuc2lvbk1hcFtuYW1lXTtcbiAgICBpZiAoIWV4dCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICBtc2c6IGBleHRlbnNpb246JHtuYW1lfSBtdXN0IGJlIHJlZ2lzdGVyZWQgYmVmb3JlIGludm9rZWBcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXdhaXQgZXh0Lmludm9rZShvcHRzLCB0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyB1c2VBZGFwdGVycyhhZGFwdGVyczogQ2xvdWRiYXNlQWRhcHRlciB8IENsb3VkYmFzZUFkYXB0ZXJbXSkge1xuICAgIGNvbnN0IHsgYWRhcHRlciwgcnVudGltZSB9ID0gdXNlQWRhcHRlcnMoYWRhcHRlcnMpIHx8IHt9O1xuICAgIGFkYXB0ZXIgJiYgKFBsYXRmb3JtLmFkYXB0ZXIgPSBhZGFwdGVyIGFzIFNES0FkYXB0ZXJJbnRlcmZhY2UpO1xuICAgIHJ1bnRpbWUgJiYgKFBsYXRmb3JtLnJ1bnRpbWUgPSBydW50aW1lIGFzIHN0cmluZyk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJIb29rKGhvb2s6IElDbG91ZGJhc2VIb29rKSB7XG4gICAgcmVnaXN0ZXJIb29rKENsb3VkYmFzZSwgaG9vaylcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQ6IElDbG91ZGJhc2VDb21wb25lbnQpIHtcbiAgICByZWdpc3RlckNvbXBvbmVudChDbG91ZGJhc2UsIGNvbXBvbmVudCk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJWZXJzaW9uKHZlcnNpb246IHN0cmluZykge1xuICAgIHNldFNka1ZlcnNpb24odmVyc2lvbik7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJTZGtOYW1lKG5hbWU6IHN0cmluZykge1xuICAgIHNldFNka05hbWUobmFtZSk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJFbmRQb2ludCh1cmw6IHN0cmluZywgcHJvdG9jb2w/OiAnaHR0cCcgfCAnaHR0cHMnKSB7XG4gICAgc2V0RW5kUG9pbnQodXJsLCBwcm90b2NvbClcbiAgfVxuXG4gIHByaXZhdGUgX3VzZURlZmF1bHRBZGFwdGVyKCkge1xuICAgIGNvbnN0IHsgYWRhcHRlciwgcnVudGltZSB9ID0gdXNlRGVmYXVsdEFkYXB0ZXIoKTtcbiAgICBQbGF0Zm9ybS5hZGFwdGVyID0gYWRhcHRlciBhcyBTREtBZGFwdGVySW50ZXJmYWNlO1xuICAgIFBsYXRmb3JtLnJ1bnRpbWUgPSBydW50aW1lIGFzIHN0cmluZztcbiAgfVxuXG4gIHByaXZhdGUgX2Zvcm1hdFRpbWVvdXQodGltZW91dDogbnVtYmVyKSB7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIHRpbWVvdXQgPiBNQVhfVElNRU9VVDpcbiAgICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ3RpbWVvdXQgaXMgZ3JlYXRlciB0aGFuIG1heGltdW0gdmFsdWVbMTBtaW5dJyk7XG4gICAgICAgIHJldHVybiBNQVhfVElNRU9VVDtcbiAgICAgIGNhc2UgdGltZW91dCA8IE1JTl9USU1FT1VUOlxuICAgICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfUEFSQU1TLCAndGltZW91dCBpcyBsZXNzIHRoYW4gbWF4aW11bSB2YWx1ZVsxMDBtc10nKTtcbiAgICAgICAgcmV0dXJuIE1JTl9USU1FT1VUO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRpbWVvdXQ7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBjbG91ZGJhc2U6IElDbG91ZGJhc2UgPSBuZXcgQ2xvdWRiYXNlKCk7XG5jbG91ZGJhc2UudXNlQWRhcHRlcnMoYWRhcHRlckZvcld4TXApO1xuXG5leHBvcnQgZGVmYXVsdCBjbG91ZGJhc2U7Il19