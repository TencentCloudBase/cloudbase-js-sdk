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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestByEnvId = exports.initRequest = exports.CloudbaseRequest = void 0;
var common_1 = require("../constants/common");
var utilities_1 = require("@cloudbase/utilities");
var cache_1 = require("./cache");
var adapter_1 = require("./adapter");
var ERRORS = utilities_1.constants.ERRORS;
var genSeqId = utilities_1.utils.genSeqId, isFormData = utilities_1.utils.isFormData, formatUrl = utilities_1.utils.formatUrl, createSign = utilities_1.utils.createSign;
var RUNTIME = utilities_1.adapters.RUNTIME;
var ACTIONS_WITHOUT_ACCESSTOKEN = [
    'auth.getJwt',
    'auth.logout',
    'auth.signInWithTicket',
    'auth.signInAnonymously',
    'auth.signIn',
    'auth.fetchAccessTokenWithRefreshToken',
    'auth.signUpWithEmailAndPassword',
    'auth.activateEndUserMail',
    'auth.sendPasswordResetEmail',
    'auth.resetPasswordWithToken',
    'auth.isUsernameRegistered'
];
function bindHooks(instance, name, hooks) {
    var originMethod = instance[name];
    instance[name] = function (options) {
        var data = {};
        var headers = {};
        hooks.forEach(function (hook) {
            var _a = hook.call(instance, options), appendedData = _a.data, appendedHeaders = _a.headers;
            Object.assign(data, appendedData);
            Object.assign(headers, appendedHeaders);
        });
        var originData = options.data;
        originData && (function () {
            if (isFormData(originData)) {
                for (var key in data) {
                    originData.append(key, data[key]);
                }
                return;
            }
            options.data = __assign(__assign({}, originData), data);
        })();
        options.headers = __assign(__assign({}, (options.headers || {})), headers);
        return originMethod.call(instance, options);
    };
}
function beforeEach() {
    var seqId = genSeqId();
    return {
        data: {
            seqId: seqId
        },
        headers: {
            'X-SDK-Version': "@cloudbase/js-sdk/" + common_1.getSdkVersion(),
            'x-seqid': seqId
        }
    };
}
var CloudbaseRequest = (function () {
    function CloudbaseRequest(config) {
        this._throwWhenRequestFail = false;
        this.config = config;
        this._reqClass = new adapter_1.Platform.adapter.reqClass({
            timeout: this.config.timeout,
            timeoutMsg: "[@cloudbase/js-sdk] \u8BF7\u6C42\u5728" + this.config.timeout / 1000 + "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD",
            restrictedMethods: ['post']
        });
        this._throwWhenRequestFail = config.throw || false;
        this._localCache = cache_1.getLocalCache(this.config.env);
        bindHooks(this._reqClass, 'post', [beforeEach]);
        bindHooks(this._reqClass, 'upload', [beforeEach]);
        bindHooks(this._reqClass, 'download', [beforeEach]);
    }
    CloudbaseRequest.prototype.post = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._reqClass.post(options)];
                    case 1:
                        res = _a.sent();
                        return [2, res];
                }
            });
        });
    };
    CloudbaseRequest.prototype.upload = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._reqClass.upload(options)];
                    case 1:
                        res = _a.sent();
                        return [2, res];
                }
            });
        });
    };
    CloudbaseRequest.prototype.download = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._reqClass.download(options)];
                    case 1:
                        res = _a.sent();
                        return [2, res];
                }
            });
        });
    };
    CloudbaseRequest.prototype.getBaseEndPoint = function () {
        return common_1.getBaseEndPoint();
    };
    CloudbaseRequest.prototype.getOauthAccessTokenV2 = function (oauthClient) {
        return __awaiter(this, void 0, void 0, function () {
            var validAccessToken, credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, oauthClient.getAccessToken()];
                    case 1:
                        validAccessToken = _a.sent();
                        return [4, oauthClient._getCredentials()];
                    case 2:
                        credentials = _a.sent();
                        return [2, {
                                accessToken: validAccessToken,
                                accessTokenExpire: new Date(credentials.expires_at).getTime()
                            }];
                }
            });
        });
    };
    CloudbaseRequest.prototype.request = function (action, params, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tcbTraceKey, contentType, tmpObj, app, oauthInstance, oauthClient, _a, payload, key, key, opts, traceHeader, _b, appSign, appSecret, timestamp, appAccessKey, appAccessKeyId, sign, parse, inQuery, search, formatQuery, _c, BASE_URL, PROTOCOL, newUrl, res, resTraceHeader;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        tcbTraceKey = "x-tcb-trace_" + this.config.env;
                        contentType = 'application/x-www-form-urlencoded';
                        tmpObj = __assign({ action: action, dataVersion: common_1.DATA_VERSION, env: this.config.env }, params);
                        if (!(ACTIONS_WITHOUT_ACCESSTOKEN.indexOf(action) === -1)) return [3, 2];
                        app = this.config._fromApp;
                        if (!app.oauthInstance) {
                            throw new Error("you can't request without auth");
                        }
                        oauthInstance = app.oauthInstance;
                        oauthClient = oauthInstance.oauth2client;
                        _a = tmpObj;
                        return [4, this.getOauthAccessTokenV2(oauthClient)];
                    case 1:
                        _a.access_token = (_d.sent()).accessToken;
                        _d.label = 2;
                    case 2:
                        if (action === 'storage.uploadFile') {
                            payload = new FormData();
                            for (key in payload) {
                                if (payload.hasOwnProperty(key) && payload[key] !== undefined) {
                                    payload.append(key, tmpObj[key]);
                                }
                            }
                            contentType = 'multipart/form-data';
                        }
                        else {
                            contentType = 'application/json;charset=UTF-8';
                            payload = {};
                            for (key in tmpObj) {
                                if (tmpObj[key] !== undefined) {
                                    payload[key] = tmpObj[key];
                                }
                            }
                        }
                        opts = {
                            headers: {
                                'content-type': contentType
                            }
                        };
                        if (options === null || options === void 0 ? void 0 : options['onUploadProgress']) {
                            opts.onUploadProgress = options['onUploadProgress'];
                        }
                        if (this.config.region) {
                            opts.headers['X-TCB-Region'] = this.config.region;
                        }
                        traceHeader = this._localCache.getStore(tcbTraceKey);
                        if (traceHeader) {
                            opts.headers['X-TCB-Trace'] = traceHeader;
                        }
                        if (adapter_1.Platform.runtime !== RUNTIME.WEB) {
                            _b = this.config, appSign = _b.appSign, appSecret = _b.appSecret;
                            timestamp = Date.now();
                            appAccessKey = appSecret.appAccessKey, appAccessKeyId = appSecret.appAccessKeyId;
                            sign = createSign({
                                data: {},
                                timestamp: timestamp,
                                appAccessKeyId: appAccessKeyId,
                                appSign: appSign
                            }, appAccessKey);
                            opts.headers['X-TCB-App-Source'] = "timestamp=" + timestamp + ";appAccessKeyId=" + appAccessKeyId + ";appSign=" + appSign + ";sign=" + sign;
                        }
                        parse = params.parse, inQuery = params.inQuery, search = params.search;
                        formatQuery = {
                            env: this.config.env
                        };
                        parse && (formatQuery.parse = true);
                        inQuery && (formatQuery = __assign(__assign({}, inQuery), formatQuery));
                        _c = common_1.getEndPoint(), BASE_URL = _c.BASE_URL, PROTOCOL = _c.PROTOCOL;
                        newUrl = formatUrl(PROTOCOL, BASE_URL, formatQuery);
                        if (search) {
                            newUrl += search;
                        }
                        return [4, this.post(__assign({ url: newUrl, data: payload }, opts))];
                    case 3:
                        res = _d.sent();
                        resTraceHeader = res.header && res.header['x-tcb-trace'];
                        if (resTraceHeader) {
                            this._localCache.setStore(tcbTraceKey, resTraceHeader);
                        }
                        if ((Number(res.status) !== 200 && Number(res.statusCode) !== 200) || !res.data) {
                            throw new Error('network request error');
                        }
                        return [2, res];
                }
            });
        });
    };
    CloudbaseRequest.prototype.send = function (action, data) {
        if (data === void 0) { data = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.request(action, data, { onUploadProgress: data.onUploadProgress })];
                    case 1:
                        response = _a.sent();
                        if (response.data.code && this._throwWhenRequestFail) {
                            throw new Error(JSON.stringify({
                                code: ERRORS.OPERATION_FAIL,
                                msg: "[" + response.data.code + "] " + response.data.message
                            }));
                        }
                        return [2, response.data];
                }
            });
        });
    };
    return CloudbaseRequest;
}());
exports.CloudbaseRequest = CloudbaseRequest;
var requestMap = {};
function initRequest(config) {
    requestMap[config.env] = new CloudbaseRequest(__assign(__assign({}, config), { throw: true }));
}
exports.initRequest = initRequest;
function getRequestByEnvId(env) {
    return requestMap[env];
}
exports.getRequestByEnvId = getRequestByEnvId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWJzL3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FLNkI7QUFRN0Isa0RBQWtFO0FBSWxFLGlDQUF3QztBQUN4QyxxQ0FBcUM7QUFDN0IsSUFBQSxNQUFNLEdBQUsscUJBQVMsT0FBZCxDQUFlO0FBQ3JCLElBQUEsUUFBUSxHQUF3QyxpQkFBSyxTQUE3QyxFQUFFLFVBQVUsR0FBNEIsaUJBQUssV0FBakMsRUFBRSxTQUFTLEdBQWlCLGlCQUFLLFVBQXRCLEVBQUUsVUFBVSxHQUFLLGlCQUFLLFdBQVYsQ0FBVztBQUN0RCxJQUFBLE9BQU8sR0FBSyxvQkFBUSxRQUFiLENBQWM7QUFNN0IsSUFBTSwyQkFBMkIsR0FBRztJQUNsQyxhQUFhO0lBQ2IsYUFBYTtJQUNiLHVCQUF1QjtJQUN2Qix3QkFBd0I7SUFDeEIsYUFBYTtJQUNiLHVDQUF1QztJQUN2QyxpQ0FBaUM7SUFDakMsMEJBQTBCO0lBQzFCLDZCQUE2QjtJQUM3Qiw2QkFBNkI7SUFDN0IsMkJBQTJCO0NBQzVCLENBQUM7QUFFRixTQUFTLFNBQVMsQ0FBQyxRQUE2QixFQUFFLElBQVksRUFBRSxLQUEyQjtJQUN6RixJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsT0FBd0I7UUFDakQsSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNuQixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUNWLElBQUEsS0FBbUQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQXZFLFlBQVksVUFBQSxFQUFXLGVBQWUsYUFBaUMs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NkU7d0JBRTVGLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFOzRCQUNwRCxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0NBQzdCLElBQUksRUFBRSxNQUFNLENBQUMsY0FBYztnQ0FDM0IsR0FBRyxFQUFFLE1BQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFTOzZCQUN4RCxDQUFDLENBQUMsQ0FBQzt5QkFDTDt3QkFFRCxXQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUM7Ozs7S0FDdEI7SUFDSCx1QkFBQztBQUFELENBQUMsQUF4TEQsSUF3TEM7QUF4TFksNENBQWdCO0FBMEw3QixJQUFNLFVBQVUsR0FBeUIsRUFBRSxDQUFDO0FBRTVDLFNBQWdCLFdBQVcsQ0FBQyxNQUErQjtJQUN6RCxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksZ0JBQWdCLHVCQUN4QyxNQUFNLEtBQ1QsS0FBSyxFQUFFLElBQUksSUFDWCxDQUFDO0FBQ0wsQ0FBQztBQUxELGtDQUtDO0FBRUQsU0FBZ0IsaUJBQWlCLENBQUMsR0FBVztJQUMzQyxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRkQsOENBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEQVRBX1ZFUlNJT04sXG4gIGdldFNka1ZlcnNpb24sXG4gIGdldEVuZFBvaW50LFxuICBnZXRCYXNlRW5kUG9pbnRcbn0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbW1vbic7XG5pbXBvcnQge1xuICBJUmVxdWVzdE9wdGlvbnMsXG4gIFNES1JlcXVlc3RJbnRlcmZhY2UsXG4gIFJlc3BvbnNlT2JqZWN0LFxuICBJVXBsb2FkUmVxdWVzdE9wdGlvbnMsXG4gIElSZXF1ZXN0Q29uZmlnXG59IGZyb20gJ0BjbG91ZGJhc2UvYWRhcHRlci1pbnRlcmZhY2UnO1xuaW1wb3J0IHsgdXRpbHMsIGFkYXB0ZXJzLCBjb25zdGFudHMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBLViB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuaW1wb3J0IHsgSUdldEFjY2Vzc1Rva2VuUmVzdWx0LCBJQ2xvdWRiYXNlUmVxdWVzdENvbmZpZywgSUFwcGVuZGVkUmVxdWVzdEluZm8sIElSZXF1ZXN0QmVmb3JlSG9vayB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVxdWVzdCc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ2FjaGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NhY2hlJztcbmltcG9ydCB7IGdldExvY2FsQ2FjaGUgfSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi9hZGFwdGVyJztcbmNvbnN0IHsgRVJST1JTIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IGdlblNlcUlkLCBpc0Zvcm1EYXRhLCBmb3JtYXRVcmwsIGNyZWF0ZVNpZ24gfSA9IHV0aWxzO1xuY29uc3QgeyBSVU5USU1FIH0gPSBhZGFwdGVycztcblxuLy8gaW1wb3J0IEZpbmdlcnByaW50SlMgZnJvbSAnQGZpbmdlcnByaW50anMvZmluZ2VycHJpbnRqcydcbi8vIGNvbnN0IGZwUHJvbWlzZSA9IEZpbmdlcnByaW50SlMubG9hZCgpXG5cbi8vIOS4i+mdouWHoOenjSBhY3Rpb24g5LiN6ZyA6KaBIGFjY2VzcyB0b2tlblxuY29uc3QgQUNUSU9OU19XSVRIT1VUX0FDQ0VTU1RPS0VOID0gW1xuICAnYXV0aC5nZXRKd3QnLFxuICAnYXV0aC5sb2dvdXQnLFxuICAnYXV0aC5zaWduSW5XaXRoVGlja2V0JyxcbiAgJ2F1dGguc2lnbkluQW5vbnltb3VzbHknLFxuICAnYXV0aC5zaWduSW4nLFxuICAnYXV0aC5mZXRjaEFjY2Vzc1Rva2VuV2l0aFJlZnJlc2hUb2tlbicsXG4gICdhdXRoLnNpZ25VcFdpdGhFbWFpbEFuZFBhc3N3b3JkJyxcbiAgJ2F1dGguYWN0aXZhdGVFbmRVc2VyTWFpbCcsXG4gICdhdXRoLnNlbmRQYXNzd29yZFJlc2V0RW1haWwnLFxuICAnYXV0aC5yZXNldFBhc3N3b3JkV2l0aFRva2VuJyxcbiAgJ2F1dGguaXNVc2VybmFtZVJlZ2lzdGVyZWQnXG5dO1xuXG5mdW5jdGlvbiBiaW5kSG9va3MoaW5zdGFuY2U6IFNES1JlcXVlc3RJbnRlcmZhY2UsIG5hbWU6IHN0cmluZywgaG9va3M6IElSZXF1ZXN0QmVmb3JlSG9va1tdKSB7XG4gIGNvbnN0IG9yaWdpbk1ldGhvZCA9IGluc3RhbmNlW25hbWVdO1xuICBpbnN0YW5jZVtuYW1lXSA9IGZ1bmN0aW9uIChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpIHtcbiAgICBjb25zdCBkYXRhID0ge307XG4gICAgY29uc3QgaGVhZGVycyA9IHt9O1xuICAgIGhvb2tzLmZvckVhY2goaG9vayA9PiB7XG4gICAgICBjb25zdCB7IGRhdGE6IGFwcGVuZGVkRGF0YSwgaGVhZGVyczogYXBwZW5kZWRIZWFkZXJzIH0gPSBob29rLmNhbGwoaW5zdGFuY2UsIG9wdGlvbnMpO1xuICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCBhcHBlbmRlZERhdGEpO1xuICAgICAgT2JqZWN0LmFzc2lnbihoZWFkZXJzLCBhcHBlbmRlZEhlYWRlcnMpO1xuICAgIH0pO1xuICAgIGNvbnN0IG9yaWdpbkRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgb3JpZ2luRGF0YSAmJiAoKCkgPT4ge1xuICAgICAgaWYgKGlzRm9ybURhdGEob3JpZ2luRGF0YSkpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgIChvcmlnaW5EYXRhIGFzIEZvcm1EYXRhKS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMuZGF0YSA9IHtcbiAgICAgICAgLi4ub3JpZ2luRGF0YSxcbiAgICAgICAgLi4uZGF0YVxuICAgICAgfTtcbiAgICB9KSgpO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHtcbiAgICAgIC4uLihvcHRpb25zLmhlYWRlcnMgfHwge30pLFxuICAgICAgLi4uaGVhZGVyc1xuICAgIH07XG4gICAgcmV0dXJuIChvcmlnaW5NZXRob2QgYXMgRnVuY3Rpb24pLmNhbGwoaW5zdGFuY2UsIG9wdGlvbnMpO1xuICB9O1xufVxuZnVuY3Rpb24gYmVmb3JlRWFjaCgpOiBJQXBwZW5kZWRSZXF1ZXN0SW5mbyB7XG4gIGNvbnN0IHNlcUlkID0gZ2VuU2VxSWQoKTtcbiAgcmV0dXJuIHtcbiAgICBkYXRhOiB7XG4gICAgICBzZXFJZFxuICAgIH0sXG4gICAgaGVhZGVyczoge1xuICAgICAgJ1gtU0RLLVZlcnNpb24nOiBgQGNsb3VkYmFzZS9qcy1zZGsvJHtnZXRTZGtWZXJzaW9uKCl9YCxcbiAgICAgICd4LXNlcWlkJzogc2VxSWRcbiAgICB9XG4gIH07XG59XG5leHBvcnQgaW50ZXJmYWNlIElDbG91ZGJhc2VSZXF1ZXN0IHtcbiAgcG9zdDogKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucykgPT4gUHJvbWlzZTxSZXNwb25zZU9iamVjdD47XG4gIHVwbG9hZDogKG9wdGlvbnM6IElVcGxvYWRSZXF1ZXN0T3B0aW9ucykgPT4gUHJvbWlzZTxSZXNwb25zZU9iamVjdD47XG4gIGRvd25sb2FkOiAob3B0aW9uczogSVJlcXVlc3RPcHRpb25zKSA9PiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PjtcbiAgcmVxdWVzdDogKGFjdGlvbjogc3RyaW5nLCBwYXJhbXM6IEtWPGFueT4sIG9wdGlvbnM/OiBLVjxhbnk+KSA9PiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PjtcbiAgc2VuZDogKGFjdGlvbjogc3RyaW5nLCBkYXRhOiBLVjxhbnk+KSA9PiBQcm9taXNlPGFueT47XG59XG5cbi8qKlxuICogQGNsYXNzIENsb3VkYmFzZVJlcXVlc3RcbiAqL1xuZXhwb3J0IGNsYXNzIENsb3VkYmFzZVJlcXVlc3QgaW1wbGVtZW50cyBJQ2xvdWRiYXNlUmVxdWVzdCB7XG4gIGNvbmZpZzogSUNsb3VkYmFzZVJlcXVlc3RDb25maWc7XG4gIF9zaG91bGRSZWZyZXNoQWNjZXNzVG9rZW5Ib29rOiBGdW5jdGlvblxuICBfcmVmcmVzaEFjY2Vzc1Rva2VuUHJvbWlzZTogUHJvbWlzZTxJR2V0QWNjZXNzVG9rZW5SZXN1bHQ+IHwgbnVsbFxuICBfcmVxQ2xhc3M6IFNES1JlcXVlc3RJbnRlcmZhY2U7XG4gIC8vIOivt+axguWksei0peaYr+WQpuaKm+WHukVycm9yXG4gIHByaXZhdGUgX3Rocm93V2hlblJlcXVlc3RGYWlsID0gZmFsc2U7XG4gIC8vIOaMgeS5heWMluacrOWcsOWtmOWCqFxuICBwcml2YXRlIF9sb2NhbENhY2hlOiBJQ2xvdWRiYXNlQ2FjaGU7XG4gIC8qKlxuICAgKiDliJ3lp4vljJZcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJQ2xvdWRiYXNlUmVxdWVzdENvbmZpZyAmIHsgdGhyb3c/OiBib29sZWFuIH0pIHtcblxuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIHRoaXMuX3JlcUNsYXNzID0gbmV3IFBsYXRmb3JtLmFkYXB0ZXIucmVxQ2xhc3MoPElSZXF1ZXN0Q29uZmlnPntcbiAgICAgIHRpbWVvdXQ6IHRoaXMuY29uZmlnLnRpbWVvdXQsXG4gICAgICB0aW1lb3V0TXNnOiBgW0BjbG91ZGJhc2UvanMtc2RrXSDor7fmsYLlnKgke3RoaXMuY29uZmlnLnRpbWVvdXQgLyAxMDAwfXPlhoXmnKrlrozmiJDvvIzlt7LkuK3mlq1gLFxuICAgICAgcmVzdHJpY3RlZE1ldGhvZHM6IFsncG9zdCddXG4gICAgfSk7XG4gICAgdGhpcy5fdGhyb3dXaGVuUmVxdWVzdEZhaWwgPSBjb25maWcudGhyb3cgfHwgZmFsc2U7XG4gICAgdGhpcy5fbG9jYWxDYWNoZSA9IGdldExvY2FsQ2FjaGUodGhpcy5jb25maWcuZW52KTtcbiAgICBiaW5kSG9va3ModGhpcy5fcmVxQ2xhc3MsICdwb3N0JywgW2JlZm9yZUVhY2hdKTtcbiAgICBiaW5kSG9va3ModGhpcy5fcmVxQ2xhc3MsICd1cGxvYWQnLCBbYmVmb3JlRWFjaF0pO1xuICAgIGJpbmRIb29rcyh0aGlzLl9yZXFDbGFzcywgJ2Rvd25sb2FkJywgW2JlZm9yZUVhY2hdKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwb3N0KG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXFDbGFzcy5wb3N0KG9wdGlvbnMpO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgcHVibGljIGFzeW5jIHVwbG9hZChvcHRpb25zOiBJVXBsb2FkUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fcmVxQ2xhc3MudXBsb2FkKG9wdGlvbnMpO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgcHVibGljIGFzeW5jIGRvd25sb2FkKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9yZXFDbGFzcy5kb3dubG9hZChvcHRpb25zKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHVibGljIGdldEJhc2VFbmRQb2ludCgpIHtcbiAgICByZXR1cm4gZ2V0QmFzZUVuZFBvaW50KClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRPYXV0aEFjY2Vzc1Rva2VuVjIob2F1dGhDbGllbnQ6IGFueSk6IFByb21pc2U8SUdldEFjY2Vzc1Rva2VuUmVzdWx0PiB7XG4gICAgY29uc3QgdmFsaWRBY2Nlc3NUb2tlbiA9IGF3YWl0IG9hdXRoQ2xpZW50LmdldEFjY2Vzc1Rva2VuKClcbiAgICBjb25zdCBjcmVkZW50aWFscyA9IGF3YWl0IG9hdXRoQ2xpZW50Ll9nZXRDcmVkZW50aWFscygpXG4gICAgcmV0dXJuIHtcbiAgICAgIGFjY2Vzc1Rva2VuOiB2YWxpZEFjY2Vzc1Rva2VuLFxuICAgICAgYWNjZXNzVG9rZW5FeHBpcmU6IG5ldyBEYXRlKGNyZWRlbnRpYWxzLmV4cGlyZXNfYXQpLmdldFRpbWUoKVxuICAgIH1cbiAgfVxuXG5cbiAgLyogZXNsaW50LWRpc2FibGUgY29tcGxleGl0eSAqL1xuICBwdWJsaWMgYXN5bmMgcmVxdWVzdChhY3Rpb246IHN0cmluZywgcGFyYW1zOiBLVjxhbnk+LCBvcHRpb25zPzogS1Y8YW55Pik6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBjb25zdCB0Y2JUcmFjZUtleSA9IGB4LXRjYi10cmFjZV8ke3RoaXMuY29uZmlnLmVudn1gO1xuICAgIGxldCBjb250ZW50VHlwZSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnO1xuICAgIC8vIGNvbnN0IHdlYkRldmljZUlkID0gYXdhaXQgZ2V0VGNiRmluZ2VycHJpbnRJZCgpO1xuICAgIGNvbnN0IHRtcE9iajogS1Y8YW55PiA9IHtcbiAgICAgIGFjdGlvbixcbiAgICAgIC8vIHdlYkRldmljZUlkLFxuICAgICAgZGF0YVZlcnNpb246IERBVEFfVkVSU0lPTixcbiAgICAgIGVudjogdGhpcy5jb25maWcuZW52LFxuICAgICAgLi4ucGFyYW1zXG4gICAgfTtcblxuICAgIGlmIChBQ1RJT05TX1dJVEhPVVRfQUNDRVNTVE9LRU4uaW5kZXhPZihhY3Rpb24pID09PSAtMSkge1xuICAgICAgY29uc3QgYXBwID0gdGhpcy5jb25maWcuX2Zyb21BcHBcblxuICAgICAgaWYgKCFhcHAub2F1dGhJbnN0YW5jZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHlvdSBjYW4ndCByZXF1ZXN0IHdpdGhvdXQgYXV0aGApXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9hdXRoSW5zdGFuY2UgPSBhcHAub2F1dGhJbnN0YW5jZVxuICAgICAgY29uc3Qgb2F1dGhDbGllbnQgPSBvYXV0aEluc3RhbmNlLm9hdXRoMmNsaWVudFxuICAgICAgdG1wT2JqLmFjY2Vzc190b2tlbiA9IChhd2FpdCB0aGlzLmdldE9hdXRoQWNjZXNzVG9rZW5WMihvYXV0aENsaWVudCkpLmFjY2Vzc1Rva2VuXG4gICAgfVxuXG4gICAgLy8g5ou8Ym9keeWSjGNvbnRlbnQtdHlwZVxuICAgIGxldCBwYXlsb2FkO1xuICAgIGlmIChhY3Rpb24gPT09ICdzdG9yYWdlLnVwbG9hZEZpbGUnKSB7XG4gICAgICBwYXlsb2FkID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gcGF5bG9hZCkge1xuICAgICAgICBpZiAocGF5bG9hZC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHBheWxvYWRba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcGF5bG9hZC5hcHBlbmQoa2V5LCB0bXBPYmpba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnRlbnRUeXBlID0gJ211bHRpcGFydC9mb3JtLWRhdGEnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50VHlwZSA9ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnO1xuICAgICAgcGF5bG9hZCA9IHt9O1xuICAgICAgZm9yIChsZXQga2V5IGluIHRtcE9iaikge1xuICAgICAgICBpZiAodG1wT2JqW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHBheWxvYWRba2V5XSA9IHRtcE9ialtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBvcHRzOiBhbnkgPSB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdjb250ZW50LXR5cGUnOiBjb250ZW50VHlwZVxuICAgICAgfVxuICAgIH07XG4gICAgaWYgKG9wdGlvbnM/Llsnb25VcGxvYWRQcm9ncmVzcyddKSB7XG4gICAgICBvcHRzLm9uVXBsb2FkUHJvZ3Jlc3MgPSBvcHRpb25zWydvblVwbG9hZFByb2dyZXNzJ107XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLnJlZ2lvbikge1xuICAgICAgb3B0cy5oZWFkZXJzWydYLVRDQi1SZWdpb24nXSA9IHRoaXMuY29uZmlnLnJlZ2lvbjtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFjZUhlYWRlciA9IHRoaXMuX2xvY2FsQ2FjaGUuZ2V0U3RvcmUodGNiVHJhY2VLZXkpO1xuICAgIGlmICh0cmFjZUhlYWRlcikge1xuICAgICAgb3B0cy5oZWFkZXJzWydYLVRDQi1UcmFjZSddID0gdHJhY2VIZWFkZXI7XG4gICAgfVxuICAgIC8vIOmdnndlYuW5s+WPsOS9v+eUqOWHreivgeajgOmqjOacieaViOaAp1xuICAgIGlmIChQbGF0Zm9ybS5ydW50aW1lICE9PSBSVU5USU1FLldFQikge1xuICAgICAgY29uc3QgeyBhcHBTaWduLCBhcHBTZWNyZXQgfSA9IHRoaXMuY29uZmlnO1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgIGNvbnN0IHsgYXBwQWNjZXNzS2V5LCBhcHBBY2Nlc3NLZXlJZCB9ID0gYXBwU2VjcmV0O1xuICAgICAgY29uc3Qgc2lnbiA9IGNyZWF0ZVNpZ24oe1xuICAgICAgICBkYXRhOiB7fSwgLy8g5qCh6aqM562+5ZCN5rWB56iL5a6e6ZmF5pyq55So5Yiw77yM5Y+v6K6+56m6XG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgYXBwQWNjZXNzS2V5SWQsXG4gICAgICAgIGFwcFNpZ25cbiAgICAgIH0sIGFwcEFjY2Vzc0tleSk7XG5cbiAgICAgIG9wdHMuaGVhZGVyc1snWC1UQ0ItQXBwLVNvdXJjZSddID0gYHRpbWVzdGFtcD0ke3RpbWVzdGFtcH07YXBwQWNjZXNzS2V5SWQ9JHthcHBBY2Nlc3NLZXlJZH07YXBwU2lnbj0ke2FwcFNpZ259O3NpZ249JHtzaWdufWA7XG4gICAgfVxuXG4gICAgLy8g5Y+R5Ye66K+35rGCXG4gICAgLy8g5paw55qEIHVybCDpnIDopoHmkLrluKYgZW52IOWPguaVsOi/m+ihjCBDT1JTIOagoemqjFxuICAgIC8vIOivt+axgumTvuaOpeaUr+aMgea3u+WKoOWKqOaAgSBxdWVyeSDlj4LmlbDvvIzmlrnkvr/nlKjmiLfosIPor5XlrprkvY3or7fmsYJcbiAgICBjb25zdCB7IHBhcnNlLCBpblF1ZXJ5LCBzZWFyY2ggfSA9IHBhcmFtcztcbiAgICBsZXQgZm9ybWF0UXVlcnk6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7XG4gICAgICBlbnY6IHRoaXMuY29uZmlnLmVudlxuICAgIH07XG4gICAgLy8g5bCd6K+V6Kej5p6Q5ZON5bqU5pWw5o2u5Li6IEpTT05cbiAgICBwYXJzZSAmJiAoZm9ybWF0UXVlcnkucGFyc2UgPSB0cnVlKTtcbiAgICBpblF1ZXJ5ICYmIChmb3JtYXRRdWVyeSA9IHtcbiAgICAgIC4uLmluUXVlcnksXG4gICAgICAuLi5mb3JtYXRRdWVyeVxuICAgIH0pO1xuICAgIGNvbnN0IHsgQkFTRV9VUkwsIFBST1RPQ09MIH0gPSBnZXRFbmRQb2ludCgpO1xuICAgIC8vIOeUn+aIkOivt+axgiB1cmxcbiAgICBsZXQgbmV3VXJsID0gZm9ybWF0VXJsKFBST1RPQ09MLCBCQVNFX1VSTCwgZm9ybWF0UXVlcnkpO1xuXG4gICAgaWYgKHNlYXJjaCkge1xuICAgICAgbmV3VXJsICs9IHNlYXJjaDtcbiAgICB9XG5cbiAgICBjb25zdCByZXM6IFJlc3BvbnNlT2JqZWN0ID0gYXdhaXQgdGhpcy5wb3N0KHtcbiAgICAgIHVybDogbmV3VXJsLFxuICAgICAgZGF0YTogcGF5bG9hZCxcbiAgICAgIC4uLm9wdHNcbiAgICB9KTtcblxuICAgIC8vIOS/neWtmCB0cmFjZSBoZWFkZXJcbiAgICBjb25zdCByZXNUcmFjZUhlYWRlciA9IHJlcy5oZWFkZXIgJiYgcmVzLmhlYWRlclsneC10Y2ItdHJhY2UnXTtcbiAgICBpZiAocmVzVHJhY2VIZWFkZXIpIHtcbiAgICAgIHRoaXMuX2xvY2FsQ2FjaGUuc2V0U3RvcmUodGNiVHJhY2VLZXksIHJlc1RyYWNlSGVhZGVyKTtcbiAgICB9XG5cbiAgICBpZiAoKE51bWJlcihyZXMuc3RhdHVzKSAhPT0gMjAwICYmIE51bWJlcihyZXMuc3RhdHVzQ29kZSkgIT09IDIwMCkgfHwgIXJlcy5kYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25ldHdvcmsgcmVxdWVzdCBlcnJvcicpO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2VuZChhY3Rpb246IHN0cmluZywgZGF0YTogS1Y8YW55PiA9IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QoYWN0aW9uLCBkYXRhLCB7IG9uVXBsb2FkUHJvZ3Jlc3M6IGRhdGEub25VcGxvYWRQcm9ncmVzcyB9KTtcblxuICAgIGlmIChyZXNwb25zZS5kYXRhLmNvZGUgJiYgdGhpcy5fdGhyb3dXaGVuUmVxdWVzdEZhaWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5PUEVSQVRJT05fRkFJTCxcbiAgICAgICAgbXNnOiBgWyR7cmVzcG9uc2UuZGF0YS5jb2RlfV0gJHtyZXNwb25zZS5kYXRhLm1lc3NhZ2V9YFxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICB9XG59XG5cbmNvbnN0IHJlcXVlc3RNYXA6IEtWPENsb3VkYmFzZVJlcXVlc3Q+ID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0UmVxdWVzdChjb25maWc6IElDbG91ZGJhc2VSZXF1ZXN0Q29uZmlnKSB7XG4gIHJlcXVlc3RNYXBbY29uZmlnLmVudl0gPSBuZXcgQ2xvdWRiYXNlUmVxdWVzdCh7XG4gICAgLi4uY29uZmlnLFxuICAgIHRocm93OiB0cnVlXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVxdWVzdEJ5RW52SWQoZW52OiBzdHJpbmcpOiBDbG91ZGJhc2VSZXF1ZXN0IHtcbiAgcmV0dXJuIHJlcXVlc3RNYXBbZW52XTtcbn0iXX0=