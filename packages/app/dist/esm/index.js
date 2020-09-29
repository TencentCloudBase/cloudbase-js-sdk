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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFJM0UsT0FBTyxjQUFjLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUcxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxzQkFBc0IsRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV4RyxJQUFBLFdBQVcsR0FBaUMsUUFBUSxZQUF6QyxFQUFFLGlCQUFpQixHQUFjLFFBQVEsa0JBQXRCLEVBQUUsT0FBTyxHQUFLLFFBQVEsUUFBYixDQUFjO0FBQ3JELElBQUEsTUFBTSxHQUF5QixTQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUssU0FBUyxtQkFBZCxDQUFlO0FBQ3pDLElBQUEsU0FBUyxHQUFLLEtBQUssVUFBVixDQUFXO0FBQ3BCLElBQUEsb0JBQW9CLEdBQUssT0FBTyxxQkFBWixDQUFhO0FBS3pDLElBQU0sbUJBQW1CLEdBQTZCO0lBQ3BELE9BQU8sRUFBRSxLQUFLO0lBQ2QsV0FBVyxFQUFFLFNBQVM7Q0FDdkIsQ0FBQztBQUdGLElBQU0sV0FBVyxHQUFHLElBQUksR0FB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QkFDdEMsMkdBQTJHO2dCQUMzRyxpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7O3dDQUNvQyxTQUFTO3lDQXVEOUM7SUFzQkQ7UUFUQyxvQkFBb0IsQ0FBQztZQUNwQixLQUFLLEVBQUUsVUFBVTtZQUNqQixRQUFRLEVBQUU7Z0JBQ1IsVUFBVTtnQkFDVix1Q0FBdUM7Z0JBQ3ZDLGdEQUFnRDtnQkFDaEQsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7b0RBV0Q7SUE4Q0gsZ0JBQUM7Q0FBQSxBQTVLRCxJQTRLQztBQUVELE1BQU0sQ0FBQyxJQUFNLFNBQVMsR0FBYyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQ3BELFNBQVMsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFdEMsZUFBZSxTQUFTLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhZGFwdGVycywgY29uc3RhbnRzLCB1dGlscywgaGVscGVycyB9IGZyb20gJ0BjbG91ZGJhc2UvdXRpbGl0aWVzJztcbmltcG9ydCB7IFNES0FkYXB0ZXJJbnRlcmZhY2UsIENsb3VkYmFzZUFkYXB0ZXIsIElSZXF1ZXN0Q29uZmlnIH0gZnJvbSAnQGNsb3VkYmFzZS9hZGFwdGVyLWludGVyZmFjZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ29uZmlnLCBJQ2xvdWRiYXNlVXBncmFkZWRDb25maWcsIElDbG91ZGJhc2UsIElDbG91ZGJhc2VFeHRlbnNpb24sIEtWLCBJQ2xvdWRiYXNlUGxhdGZvcm1JbmZvIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQXV0aCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvYXV0aCc7XG5pbXBvcnQgYWRhcHRlckZvcld4TXAgZnJvbSAnY2xvdWRiYXNlLWFkYXB0ZXItd3hfbXAnO1xuaW1wb3J0IHsgcmVnaXN0ZXJDb21wb25lbnQsIHJlZ2lzdGVySG9vayB9IGZyb20gJy4vbGlicy9jb21wb25lbnQnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuL2xpYnMvYWRhcHRlcic7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ29tcG9uZW50LCBJQ2xvdWRiYXNlSG9vayB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY29tcG9uZW50JztcbmltcG9ydCB7IElDbG91ZGJhc2VDYWNoZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY2FjaGUnO1xuaW1wb3J0IHsgaW5pdENhY2hlLCBnZXRDYWNoZUJ5RW52SWQsIGdldExvY2FsQ2FjaGUgfSBmcm9tICcuL2xpYnMvY2FjaGUnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZVJlcXVlc3QgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL3JlcXVlc3QnO1xuaW1wb3J0IHsgaW5pdFJlcXVlc3QsIGdldFJlcXVlc3RCeUVudklkIH0gZnJvbSAnLi9saWJzL3JlcXVlc3QnO1xuaW1wb3J0IHsgZ2V0U2RrTmFtZSwgc2V0U2RrVmVyc2lvbiwgc2V0RW5kUG9pbnQsIHNldFJlZ2lvbkxldmVsRW5kcG9pbnQsIHNldFNka05hbWUgfSBmcm9tICcuL2NvbnN0YW50cy9jb21tb24nO1xuXG5jb25zdCB7IHVzZUFkYXB0ZXJzLCB1c2VEZWZhdWx0QWRhcHRlciwgUlVOVElNRSB9ID0gYWRhcHRlcnM7XG5jb25zdCB7IEVSUk9SUywgQ09NTVVOSVRZX1NJVEVfVVJMIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IHByaW50V2FybiB9ID0gdXRpbHM7XG5jb25zdCB7IGNhdGNoRXJyb3JzRGVjb3JhdG9yIH0gPSBoZWxwZXJzO1xuXG4vKipcbiAqIEBjb25zdGFudCDpu5jorqTphY3nva5cbiAqL1xuY29uc3QgREVGQVVMVF9JTklUX0NPTkZJRzpQYXJ0aWFsPElDbG91ZGJhc2VDb25maWc+ID0ge1xuICB0aW1lb3V0OiAxNTAwMCxcbiAgcGVyc2lzdGVuY2U6ICdzZXNzaW9uJ1xufTtcblxuLy8gdGltZW91dOS4iumZkDEw5YiG6ZKfXG5jb25zdCBNQVhfVElNRU9VVCA9IDEwMDAgKiA2MCAqIDEwO1xuLy8gdGltZW91dOS4i+mZkDEwMG1zXG5jb25zdCBNSU5fVElNRU9VVCA9IDEwMDtcblxuY29uc3QgZXh0ZW5zaW9uTWFwOktWPElDbG91ZGJhc2VFeHRlbnNpb24+ID0ge307XG5cbmNsYXNzIENsb3VkYmFzZSBpbXBsZW1lbnRzIElDbG91ZGJhc2V7XG4gIHB1YmxpYyBhdXRoSW5zdGFuY2U6IElDbG91ZGJhc2VBdXRoO1xuICBwdWJsaWMgcmVxdWVzdENsaWVudDogYW55O1xuICBwcml2YXRlIF9jb25maWc6IElDbG91ZGJhc2VDb25maWc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnPzogSUNsb3VkYmFzZUNvbmZpZykge1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZyA/IGNvbmZpZyA6IHRoaXMuX2NvbmZpZztcbiAgICB0aGlzLmF1dGhJbnN0YW5jZSA9IG51bGw7XG4gIH1cblxuICBnZXQgY29uZmlnKCl7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuXG4gIGdldCBwbGF0Zm9ybSgpOklDbG91ZGJhc2VQbGF0Zm9ybUluZm97XG4gICAgcmV0dXJuIFBsYXRmb3JtO1xuICB9XG5cbiAgZ2V0IGNhY2hlKCk6SUNsb3VkYmFzZUNhY2hle1xuICAgIHJldHVybiBnZXRDYWNoZUJ5RW52SWQodGhpcy5fY29uZmlnLmVudik7XG4gIH1cblxuICBnZXQgbG9jYWxDYWNoZSgpOklDbG91ZGJhc2VDYWNoZXtcbiAgICByZXR1cm4gZ2V0TG9jYWxDYWNoZSh0aGlzLl9jb25maWcuZW52KTtcbiAgfVxuXG4gIGdldCByZXF1ZXN0KCk6SUNsb3VkYmFzZVJlcXVlc3R7XG4gICAgcmV0dXJuIGdldFJlcXVlc3RCeUVudklkKHRoaXMuX2NvbmZpZy5lbnYpO1xuICB9XG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgbW9kZTogJ3N5bmMnLFxuICAgIHRpdGxlOiAnQ2xvdWRiYXNlIOWIneWni+WMluWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBjbG91ZGJhc2UuaW5pdCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5aaC5p6c5piv6Z2e5rWP6KeI5Zmo546v5aKD77yM5piv5ZCm6YWN572u5LqG5a6J5YWo5bqU55So5p2l5rqQ77yIaHR0cHM6Ly9kb2NzLmNsb3VkYmFzZS5uZXQvYXBpLXJlZmVyZW5jZS93ZWJ2Mi9hZGFwdGVyLmh0bWwjamllLXJ1LWxpdS1jaGVuZ++8iScsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGluaXQoY29uZmlnOiBJQ2xvdWRiYXNlQ29uZmlnKTpDbG91ZGJhc2Uge1xuICAgIGlmKCFjb25maWcuZW52KXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgbXNnOiAnZW52IG11c3Qgbm90IGJlIHNwZWNpZmllZCdcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgLy8g5Yid5aeL5YyW5pe26Iul5pyq5YW85a655bmz5Y+w77yM5YiZ5L2/55So6buY6K6kYWRhcHRlclxuICAgIGlmICghUGxhdGZvcm0uYWRhcHRlcikge1xuICAgICAgdGhpcy5fdXNlRGVmYXVsdEFkYXB0ZXIoKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlcXVlc3RDbGllbnQgPSBuZXcgUGxhdGZvcm0uYWRhcHRlci5yZXFDbGFzcyh7XG4gICAgICB0aW1lb3V0OiBjb25maWcudGltZW91dCB8fCA1MDAwLFxuICAgICAgdGltZW91dE1zZzogYFske2dldFNka05hbWUoKX1dW1JFUVVFU1QgVElNRU9VVF0gcmVxdWVzdCBoYWQgYmVlbiBhYm9ydCBzaW5jZSBkaWRuXFwndCBmaW5pc2hlZCB3aXRoaW4ke2NvbmZpZy50aW1lb3V0IC8gMTAwMH1zYFxuICAgIH0gYXMgSVJlcXVlc3RDb25maWcpO1xuICAgIGlmIChQbGF0Zm9ybS5ydW50aW1lICE9PSBSVU5USU1FLldFQikge1xuICAgICAgaWYgKCFjb25maWcuYXBwU2VjcmV0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICAgIG1zZzogJ2ludmFsaWQgYXBwU2VjcmV0J1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICAvLyBhZGFwdGVy5o+Q5L6b6I635Y+W5bqU55So5qCH6K+G55qE5o6l5Y+jXG4gICAgICBjb25zdCBhcHBTaWduID0gUGxhdGZvcm0uYWRhcHRlci5nZXRBcHBTaWduID8gUGxhdGZvcm0uYWRhcHRlci5nZXRBcHBTaWduKCkgOiAnJztcbiAgICAgIGlmIChjb25maWcuYXBwU2lnbiAmJiBhcHBTaWduICYmIGNvbmZpZy5hcHBTaWduICE9PSBhcHBTaWduKSB7XG4gICAgICAgIC8vIOS8oOWFpeeahGFwcFNpZ27kuI5zZGvojrflj5bnmoTkuI3kuIDoh7RcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgICAgbXNnOiAnaW52YWxpZCBhcHBTaWduJ1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICBhcHBTaWduICYmIChjb25maWcuYXBwU2lnbiA9IGFwcFNpZ24pO1xuICAgICAgaWYgKCFjb25maWcuYXBwU2lnbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgICBtc2c6ICdpbnZhbGlkIGFwcFNpZ24nXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fY29uZmlnID0ge1xuICAgICAgLi4uREVGQVVMVF9JTklUX0NPTkZJRyxcbiAgICAgIC4uLmNvbmZpZ1xuICAgIH07XG4gICAgLy8g5L+u5q2jdGltZW91dOWPluWAvFxuICAgIHRoaXMuX2NvbmZpZy50aW1lb3V0ID0gdGhpcy5fZm9ybWF0VGltZW91dCh0aGlzLl9jb25maWcudGltZW91dCk7XG4gICAgLy8g5Yid5aeL5YyWY2FjaGXlkoxyZXF1ZXN0XG4gICAgY29uc3QgeyBlbnYsIHBlcnNpc3RlbmNlLCBkZWJ1ZywgdGltZW91dCwgYXBwU2VjcmV0LCBhcHBTaWdufSA9IHRoaXMuX2NvbmZpZztcbiAgICBpbml0Q2FjaGUoeyBlbnYsIHBlcnNpc3RlbmNlLCBkZWJ1ZywgcGxhdGZvcm1JbmZvOnRoaXMucGxhdGZvcm19KTtcbiAgICBpbml0UmVxdWVzdCh7IGVudiwgcmVnaW9uOmNvbmZpZy5yZWdpb24gfHwgJycsIHRpbWVvdXQsIGFwcFNlY3JldCwgYXBwU2lnbn0pO1xuXG4gICAgaWYgKGNvbmZpZy5yZWdpb24pIHtcbiAgICAgIHNldFJlZ2lvbkxldmVsRW5kcG9pbnQoZW52LCBjb25maWcucmVnaW9uIHx8ICcnKVxuICAgIH1cbiAgICByZXR1cm4gbmV3IENsb3VkYmFzZSh0aGlzLl9jb25maWcpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZUNvbmZpZyhjb25maWc6IElDbG91ZGJhc2VVcGdyYWRlZENvbmZpZyl7XG4gICAgY29uc3QgeyBwZXJzaXN0ZW5jZSwgZGVidWcgfSA9IGNvbmZpZztcbiAgICB0aGlzLl9jb25maWcucGVyc2lzdGVuY2UgPSBwZXJzaXN0ZW5jZTtcbiAgICB0aGlzLl9jb25maWcuZGVidWcgPSBkZWJ1ZztcbiAgICAvLyBwZXJzaXN0ZW5jZeaUueWKqOW9seWTjWNhY2hlXG4gICAgaW5pdENhY2hlKHsgZW52OnRoaXMuX2NvbmZpZy5lbnYsIHBlcnNpc3RlbmNlLCBkZWJ1ZywgcGxhdGZvcm1JbmZvOnRoaXMucGxhdGZvcm19KTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlckV4dGVuc2lvbihleHQ6SUNsb3VkYmFzZUV4dGVuc2lvbikge1xuICAgIGV4dGVuc2lvbk1hcFtleHQubmFtZV0gPSBleHQ7XG4gIH1cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+iwg+eUqOaJqeWxleiDveWKm+Wksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBpbnZva2VFeHRlbnNpb24oKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOiiq+iwg+eUqOeahOaJqeWxleiDveWKm+aYr+WQpuW3sue7j+WuieijheW5tumAmui/hyByZWdpc3RlckV4dGVuc2lvbigpIOazqOWGjCcsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGludm9rZUV4dGVuc2lvbihuYW1lOnN0cmluZywgb3B0czphbnkpIHtcbiAgICBjb25zdCBleHQgPSBleHRlbnNpb25NYXBbbmFtZV07XG4gICAgaWYgKCFleHQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgbXNnOiBgZXh0ZW5zaW9uOiR7bmFtZX0gbXVzdCBiZSByZWdpc3RlcmVkIGJlZm9yZSBpbnZva2VgXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF3YWl0IGV4dC5pbnZva2Uob3B0cywgdGhpcyk7XG4gIH1cblxuICBwdWJsaWMgdXNlQWRhcHRlcnMoYWRhcHRlcnM6IENsb3VkYmFzZUFkYXB0ZXJ8Q2xvdWRiYXNlQWRhcHRlcltdKSB7XG4gICAgY29uc3QgeyBhZGFwdGVyLCBydW50aW1lIH0gPSB1c2VBZGFwdGVycyhhZGFwdGVycykgfHwge307XG4gICAgYWRhcHRlciAmJiAoUGxhdGZvcm0uYWRhcHRlciA9IGFkYXB0ZXIgYXMgU0RLQWRhcHRlckludGVyZmFjZSk7XG4gICAgcnVudGltZSAmJiAoUGxhdGZvcm0ucnVudGltZSA9IHJ1bnRpbWUgYXMgc3RyaW5nKTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlckhvb2soaG9vazpJQ2xvdWRiYXNlSG9vayl7XG4gICAgcmVnaXN0ZXJIb29rKENsb3VkYmFzZSxob29rKVxuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudDpJQ2xvdWRiYXNlQ29tcG9uZW50KXtcbiAgICByZWdpc3RlckNvbXBvbmVudChDbG91ZGJhc2UsY29tcG9uZW50KTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlclZlcnNpb24odmVyc2lvbjpzdHJpbmcpe1xuICAgIHNldFNka1ZlcnNpb24odmVyc2lvbik7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJTZGtOYW1lKG5hbWU6c3RyaW5nKXtcbiAgICBzZXRTZGtOYW1lKG5hbWUpO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyRW5kUG9pbnQodXJsOnN0cmluZyxwcm90b2NvbD86J2h0dHAnfCdodHRwcycpe1xuICAgIHNldEVuZFBvaW50KHVybCxwcm90b2NvbClcbiAgfVxuXG4gIHByaXZhdGUgX3VzZURlZmF1bHRBZGFwdGVyKCkge1xuICAgIGNvbnN0IHsgYWRhcHRlciwgcnVudGltZSB9ID0gdXNlRGVmYXVsdEFkYXB0ZXIoKTtcbiAgICBQbGF0Zm9ybS5hZGFwdGVyID0gYWRhcHRlciBhcyBTREtBZGFwdGVySW50ZXJmYWNlO1xuICAgIFBsYXRmb3JtLnJ1bnRpbWUgPSBydW50aW1lIGFzIHN0cmluZztcbiAgfVxuXG4gIHByaXZhdGUgX2Zvcm1hdFRpbWVvdXQodGltZW91dDpudW1iZXIpe1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB0aW1lb3V0ID4gTUFYX1RJTUVPVVQ6XG4gICAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsJ3RpbWVvdXQgaXMgZ3JlYXRlciB0aGFuIG1heGltdW0gdmFsdWVbMTBtaW5dJyk7XG4gICAgICAgIHJldHVybiBNQVhfVElNRU9VVDtcbiAgICAgIGNhc2UgdGltZW91dCA8IE1JTl9USU1FT1VUOlxuICAgICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfUEFSQU1TLCd0aW1lb3V0IGlzIGxlc3MgdGhhbiBtYXhpbXVtIHZhbHVlWzEwMG1zXScpO1xuICAgICAgICByZXR1cm4gTUlOX1RJTUVPVVQ7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGltZW91dDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNsb3VkYmFzZTpJQ2xvdWRiYXNlID0gbmV3IENsb3VkYmFzZSgpO1xuY2xvdWRiYXNlLnVzZUFkYXB0ZXJzKGFkYXB0ZXJGb3JXeE1wKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xvdWRiYXNlOyJdfQ==