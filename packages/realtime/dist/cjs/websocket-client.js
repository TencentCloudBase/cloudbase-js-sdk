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
exports.RealtimeWebSocketClient = void 0;
var virtual_websocket_client_1 = require("./virtual-websocket-client");
var message_1 = require("./message");
var ws_event_1 = require("./ws-event");
var error_1 = require("./error");
var common_1 = require("./common");
var utils_1 = require("./utils");
var WS_READY_STATE = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
};
var MAX_RTT_OBSERVED = 3;
var DEFAULT_EXPECTED_EVENT_WAIT_TIME = 5000;
var DEFAULT_UNTRUSTED_RTT_THRESHOLD = 10000;
var DEFAULT_MAX_RECONNECT = 5;
var DEFAULT_WS_RECONNECT_INTERVAL = 10000;
var DEFAULT_PING_FAIL_TOLERANCE = 2;
var DEFAULT_PONG_MISS_TOLERANCE = 2;
var DEFAULT_LOGIN_TIMEOUT = 5000;
var RealtimeWebSocketClient = (function () {
    function RealtimeWebSocketClient(options) {
        var _this = this;
        this._virtualWSClient = new Set();
        this._queryIdClientMap = new Map();
        this._watchIdClientMap = new Map();
        this._pingFailed = 0;
        this._pongMissed = 0;
        this._logins = new Map();
        this._wsReadySubsribers = [];
        this._wsResponseWait = new Map();
        this._rttObserved = [];
        this.send = function (opts) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (_resolve, _reject) { return __awaiter(_this, void 0, void 0, function () {
                        var timeoutId, _hasResolved, _hasRejected, resolve, reject, err_1, e_1;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _hasResolved = false;
                                    _hasRejected = false;
                                    resolve = function (value) {
                                        _hasResolved = true;
                                        timeoutId && clearTimeout(timeoutId);
                                        _resolve(value);
                                    };
                                    reject = function (error) {
                                        _hasRejected = true;
                                        timeoutId && clearTimeout(timeoutId);
                                        _reject(error);
                                    };
                                    if (opts.timeout) {
                                        timeoutId = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!(!_hasResolved || !_hasRejected)) return [3, 2];
                                                        return [4, utils_1.sleep(0)];
                                                    case 1:
                                                        _a.sent();
                                                        if (!_hasResolved || !_hasRejected) {
                                                            reject(new error_1.TimeoutError('wsclient.send timedout'));
                                                        }
                                                        _a.label = 2;
                                                    case 2: return [2];
                                                }
                                            });
                                        }); }, opts.timeout);
                                    }
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 8, , 9]);
                                    if (!this._wsInitPromise) return [3, 3];
                                    return [4, this._wsInitPromise];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    if (!this._ws) {
                                        reject(new Error('invalid state: ws connection not exists, can not send message'));
                                        return [2];
                                    }
                                    if (this._ws.readyState !== WS_READY_STATE.OPEN) {
                                        reject(new Error("ws readyState invalid: " + this._ws.readyState + ", can not send message"));
                                        return [2];
                                    }
                                    if (opts.waitResponse) {
                                        this._wsResponseWait.set(opts.msg.requestId, {
                                            resolve: resolve,
                                            reject: reject,
                                            skipOnMessage: opts.skipOnMessage
                                        });
                                    }
                                    _a.label = 4;
                                case 4:
                                    _a.trys.push([4, 6, , 7]);
                                    return [4, this._ws.send(JSON.stringify(opts.msg))];
                                case 5:
                                    _a.sent();
                                    if (!opts.waitResponse) {
                                        resolve();
                                    }
                                    return [3, 7];
                                case 6:
                                    err_1 = _a.sent();
                                    if (err_1) {
                                        reject(err_1);
                                        if (opts.waitResponse) {
                                            this._wsResponseWait.delete(opts.msg.requestId);
                                        }
                                    }
                                    return [3, 7];
                                case 7: return [3, 9];
                                case 8:
                                    e_1 = _a.sent();
                                    reject(e_1);
                                    return [3, 9];
                                case 9: return [2];
                            }
                        });
                    }); })];
            });
        }); };
        this.closeAllClients = function (error) {
            _this._virtualWSClient.forEach(function (client) {
                client.closeWithError(error);
            });
        };
        this.pauseClients = function (clients) {
            ;
            (clients || _this._virtualWSClient).forEach(function (client) {
                client.pause();
            });
        };
        this.resumeClients = function (clients) {
            ;
            (clients || _this._virtualWSClient).forEach(function (client) {
                client.resume();
            });
        };
        this.initWebSocketConnection = function (reconnect, availableRetries) {
            if (availableRetries === void 0) { availableRetries = _this._maxReconnect; }
            return __awaiter(_this, void 0, void 0, function () {
                var e_2;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (reconnect && this._reconnectState) {
                                return [2];
                            }
                            if (reconnect) {
                                this._reconnectState = true;
                            }
                            if (this._wsInitPromise) {
                                return [2, this._wsInitPromise];
                            }
                            if (reconnect) {
                                this.pauseClients();
                            }
                            this.close(ws_event_1.CLOSE_EVENT_CODE.ReconnectWebSocket);
                            this._wsInitPromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var wsSign_1, e_3, isConnected;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 6, , 11]);
                                            return [4, this.getWsSign()];
                                        case 1:
                                            wsSign_1 = _a.sent();
                                            return [4, new Promise(function (success) {
                                                    var url = wsSign_1.wsUrl || 'wss://tcb-ws.tencentcloudapi.com';
                                                    var wsClass = common_1.getWsClass();
                                                    _this._ws = wsClass ? new wsClass(url) : new WebSocket(url);
                                                    success();
                                                })];
                                        case 2:
                                            _a.sent();
                                            if (!this._ws.connect) return [3, 4];
                                            return [4, this._ws.connect()];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4: return [4, this.initWebSocketEvent()];
                                        case 5:
                                            _a.sent();
                                            resolve();
                                            if (reconnect) {
                                                this.resumeClients();
                                                this._reconnectState = false;
                                            }
                                            return [3, 11];
                                        case 6:
                                            e_3 = _a.sent();
                                            console.error('[realtime] initWebSocketConnection connect fail', e_3);
                                            if (!(availableRetries > 0)) return [3, 9];
                                            isConnected = true;
                                            this._wsInitPromise = undefined;
                                            if (!isConnected) return [3, 8];
                                            return [4, utils_1.sleep(this._reconnectInterval)];
                                        case 7:
                                            _a.sent();
                                            if (reconnect) {
                                                this._reconnectState = false;
                                            }
                                            _a.label = 8;
                                        case 8:
                                            resolve(this.initWebSocketConnection(reconnect, availableRetries - 1));
                                            return [3, 10];
                                        case 9:
                                            reject(e_3);
                                            if (reconnect) {
                                                this.closeAllClients(new error_1.CloudSDKError({
                                                    errCode: error_1.ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_RECONNECT_WATCH_FAIL,
                                                    errMsg: e_3
                                                }));
                                            }
                                            _a.label = 10;
                                        case 10: return [3, 11];
                                        case 11: return [2];
                                    }
                                });
                            }); });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4, this._wsInitPromise];
                        case 2:
                            _a.sent();
                            this._wsReadySubsribers.forEach(function (_a) {
                                var resolve = _a.resolve;
                                return resolve();
                            });
                            return [3, 5];
                        case 3:
                            e_2 = _a.sent();
                            this._wsReadySubsribers.forEach(function (_a) {
                                var reject = _a.reject;
                                return reject();
                            });
                            return [3, 5];
                        case 4:
                            this._wsInitPromise = undefined;
                            this._wsReadySubsribers = [];
                            return [7];
                        case 5: return [2];
                    }
                });
            });
        };
        this.initWebSocketEvent = function () {
            return new Promise(function (resolve, reject) {
                if (!_this._ws) {
                    throw new Error('can not initWebSocketEvent, ws not exists');
                }
                var wsOpened = false;
                _this._ws.onopen = function (event) {
                    console.warn('[realtime] ws event: open', event);
                    wsOpened = true;
                    resolve();
                };
                _this._ws.onerror = function (event) {
                    _this._logins = new Map();
                    if (!wsOpened) {
                        console.error('[realtime] ws open failed with ws event: error', event);
                        reject(event);
                    }
                    else {
                        console.error('[realtime] ws event: error', event);
                        _this.clearHeartbeat();
                        _this._virtualWSClient.forEach(function (client) {
                            return client.closeWithError(new error_1.CloudSDKError({
                                errCode: error_1.ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_WEBSOCKET_CONNECTION_ERROR,
                                errMsg: event
                            }));
                        });
                    }
                };
                _this._ws.onclose = function (closeEvent) {
                    console.warn('[realtime] ws event: close', closeEvent);
                    _this._logins = new Map();
                    _this.clearHeartbeat();
                    switch (closeEvent.code) {
                        case ws_event_1.CLOSE_EVENT_CODE.ReconnectWebSocket: {
                            break;
                        }
                        case ws_event_1.CLOSE_EVENT_CODE.NoRealtimeListeners: {
                            break;
                        }
                        case ws_event_1.CLOSE_EVENT_CODE.HeartbeatPingError:
                        case ws_event_1.CLOSE_EVENT_CODE.HeartbeatPongTimeoutError:
                        case ws_event_1.CLOSE_EVENT_CODE.NormalClosure:
                        case ws_event_1.CLOSE_EVENT_CODE.AbnormalClosure: {
                            if (_this._maxReconnect > 0) {
                                _this.initWebSocketConnection(true, _this._maxReconnect);
                            }
                            else {
                                _this.closeAllClients(ws_event_1.getWSCloseError(closeEvent.code));
                            }
                            break;
                        }
                        case ws_event_1.CLOSE_EVENT_CODE.NoAuthentication: {
                            _this.closeAllClients(ws_event_1.getWSCloseError(closeEvent.code, closeEvent.reason));
                            break;
                        }
                        default: {
                            if (_this._maxReconnect > 0) {
                                _this.initWebSocketConnection(true, _this._maxReconnect);
                            }
                            else {
                                _this.closeAllClients(ws_event_1.getWSCloseError(closeEvent.code));
                            }
                        }
                    }
                };
                _this._ws.onmessage = function (res) {
                    var rawMsg = res.data;
                    _this.heartbeat();
                    var msg;
                    try {
                        msg = JSON.parse(rawMsg);
                    }
                    catch (e) {
                        throw new Error("[realtime] onMessage parse res.data error: " + e);
                    }
                    if (msg.msgType === 'ERROR') {
                        var virtualWatch_1 = null;
                        _this._virtualWSClient.forEach(function (item) {
                            if (item.watchId === msg.watchId) {
                                virtualWatch_1 = item;
                            }
                        });
                        if (virtualWatch_1) {
                            virtualWatch_1.listener.onError(msg);
                        }
                    }
                    var responseWaitSpec = _this._wsResponseWait.get(msg.requestId);
                    if (responseWaitSpec) {
                        try {
                            if (msg.msgType === 'ERROR') {
                                responseWaitSpec.reject(new error_1.RealtimeErrorMessageError(msg));
                            }
                            else {
                                responseWaitSpec.resolve(msg);
                            }
                        }
                        catch (e) {
                            console.error('ws onMessage responseWaitSpec.resolve(msg) errored:', e);
                        }
                        finally {
                            _this._wsResponseWait.delete(msg.requestId);
                        }
                        if (responseWaitSpec.skipOnMessage) {
                            return;
                        }
                    }
                    if (msg.msgType === 'PONG') {
                        if (_this._lastPingSendTS) {
                            var rtt = Date.now() - _this._lastPingSendTS;
                            if (rtt > DEFAULT_UNTRUSTED_RTT_THRESHOLD) {
                                console.warn("[realtime] untrusted rtt observed: " + rtt);
                                return;
                            }
                            if (_this._rttObserved.length >= MAX_RTT_OBSERVED) {
                                _this._rttObserved.splice(0, _this._rttObserved.length - MAX_RTT_OBSERVED + 1);
                            }
                            _this._rttObserved.push(rtt);
                        }
                        return;
                    }
                    var client = msg.watchId && _this._watchIdClientMap.get(msg.watchId);
                    if (client) {
                        client.onMessage(msg);
                    }
                    else {
                        console.error("[realtime] no realtime listener found responsible for watchId " + msg.watchId + ": ", msg);
                        switch (msg.msgType) {
                            case 'INIT_EVENT':
                            case 'NEXT_EVENT':
                            case 'CHECK_EVENT': {
                                client = _this._queryIdClientMap.get(msg.msgData.queryID);
                                if (client) {
                                    client.onMessage(msg);
                                }
                                break;
                            }
                            default: {
                                for (var _i = 0, _a = Array.from(_this._watchIdClientMap.entries()); _i < _a.length; _i++) {
                                    var _b = _a[_i], client_1 = _b[1];
                                    client_1.onMessage(msg);
                                    break;
                                }
                            }
                        }
                    }
                };
                _this.heartbeat();
            });
        };
        this.isWSConnected = function () {
            return Boolean(_this._ws && _this._ws.readyState === WS_READY_STATE.OPEN);
        };
        this.onceWSConnected = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.isWSConnected()) {
                    return [2];
                }
                if (this._wsInitPromise) {
                    return [2, this._wsInitPromise];
                }
                return [2, new Promise(function (resolve, reject) {
                        _this._wsReadySubsribers.push({
                            resolve: resolve,
                            reject: reject
                        });
                    })];
            });
        }); };
        this.webLogin = function (envId, refresh) { return __awaiter(_this, void 0, void 0, function () {
            var loginInfo_1, emptyEnvLoginInfo, promise, loginInfo, loginStartTS, loginResult, curLoginInfo, e_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!refresh) {
                            if (envId) {
                                loginInfo_1 = this._logins.get(envId);
                                if (loginInfo_1) {
                                    if (loginInfo_1.loggedIn && loginInfo_1.loginResult) {
                                        return [2, loginInfo_1.loginResult];
                                    }
                                    else if (loginInfo_1.loggingInPromise) {
                                        return [2, loginInfo_1.loggingInPromise];
                                    }
                                }
                            }
                            else {
                                emptyEnvLoginInfo = this._logins.get('');
                                if (emptyEnvLoginInfo === null || emptyEnvLoginInfo === void 0 ? void 0 : emptyEnvLoginInfo.loggingInPromise) {
                                    return [2, emptyEnvLoginInfo.loggingInPromise];
                                }
                            }
                        }
                        promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var wsSign, msgData, loginMsg, loginResMsg, e_5;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 3, , 4]);
                                        return [4, this.getWsSign()];
                                    case 1:
                                        wsSign = _a.sent();
                                        msgData = {
                                            envId: wsSign.envId || '',
                                            accessToken: '',
                                            referrer: 'web',
                                            sdkVersion: '',
                                            dataVersion: ''
                                        };
                                        loginMsg = {
                                            watchId: undefined,
                                            requestId: message_1.genRequestId(),
                                            msgType: 'LOGIN',
                                            msgData: msgData,
                                            exMsgData: {
                                                runtime: common_1.getRuntime(),
                                                signStr: wsSign.signStr,
                                                secretVersion: wsSign.secretVersion
                                            }
                                        };
                                        return [4, this.send({
                                                msg: loginMsg,
                                                waitResponse: true,
                                                skipOnMessage: true,
                                                timeout: DEFAULT_LOGIN_TIMEOUT
                                            })];
                                    case 2:
                                        loginResMsg = _a.sent();
                                        if (!loginResMsg.msgData.code) {
                                            resolve({
                                                envId: wsSign.envId
                                            });
                                        }
                                        else {
                                            reject(new Error(loginResMsg.msgData.code + " " + loginResMsg.msgData.message));
                                        }
                                        return [3, 4];
                                    case 3:
                                        e_5 = _a.sent();
                                        reject(e_5);
                                        return [3, 4];
                                    case 4: return [2];
                                }
                            });
                        }); });
                        loginInfo = envId && this._logins.get(envId);
                        loginStartTS = Date.now();
                        if (loginInfo) {
                            loginInfo.loggedIn = false;
                            loginInfo.loggingInPromise = promise;
                            loginInfo.loginStartTS = loginStartTS;
                        }
                        else {
                            loginInfo = {
                                loggedIn: false,
                                loggingInPromise: promise,
                                loginStartTS: loginStartTS
                            };
                            this._logins.set(envId || '', loginInfo);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, promise];
                    case 2:
                        loginResult = _a.sent();
                        curLoginInfo = envId && this._logins.get(envId);
                        if (curLoginInfo &&
                            curLoginInfo === loginInfo &&
                            curLoginInfo.loginStartTS === loginStartTS) {
                            loginInfo.loggedIn = true;
                            loginInfo.loggingInPromise = undefined;
                            loginInfo.loginStartTS = undefined;
                            loginInfo.loginResult = loginResult;
                            return [2, loginResult];
                        }
                        else if (curLoginInfo) {
                            if (curLoginInfo.loggedIn && curLoginInfo.loginResult) {
                                return [2, curLoginInfo.loginResult];
                            }
                            else if (curLoginInfo.loggingInPromise) {
                                return [2, curLoginInfo.loggingInPromise];
                            }
                            else {
                                throw new Error('ws unexpected login info');
                            }
                        }
                        else {
                            throw new Error('ws login info reset');
                        }
                        return [3, 4];
                    case 3:
                        e_4 = _a.sent();
                        loginInfo.loggedIn = false;
                        loginInfo.loggingInPromise = undefined;
                        loginInfo.loginStartTS = undefined;
                        loginInfo.loginResult = undefined;
                        throw e_4;
                    case 4: return [2];
                }
            });
        }); };
        this.getWsSign = function () { return __awaiter(_this, void 0, void 0, function () {
            var expiredTs, res, _a, signStr, wsUrl, secretVersion, envId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this._wsSign && this._wsSign.expiredTs > Date.now()) {
                            return [2, this._wsSign];
                        }
                        expiredTs = Date.now() + 60000;
                        return [4, this._context.appConfig.request.send('auth.wsWebSign', { runtime: common_1.getRuntime() })];
                    case 1:
                        res = _b.sent();
                        if (res.code) {
                            throw new Error("[tcb-js-sdk] \u83B7\u53D6\u5B9E\u65F6\u6570\u636E\u63A8\u9001\u767B\u5F55\u7968\u636E\u5931\u8D25: " + res.code);
                        }
                        if (res.data) {
                            _a = res.data, signStr = _a.signStr, wsUrl = _a.wsUrl, secretVersion = _a.secretVersion, envId = _a.envId;
                            return [2, {
                                    signStr: signStr,
                                    wsUrl: wsUrl,
                                    secretVersion: secretVersion,
                                    envId: envId,
                                    expiredTs: expiredTs
                                }];
                        }
                        else {
                            throw new Error('[tcb-js-sdk] 获取实时数据推送登录票据失败');
                        }
                        return [2];
                }
            });
        }); };
        this.getWaitExpectedTimeoutLength = function () {
            if (!_this._rttObserved.length) {
                return DEFAULT_EXPECTED_EVENT_WAIT_TIME;
            }
            return ((_this._rttObserved.reduce(function (acc, cur) { return acc + cur; }) /
                _this._rttObserved.length) *
                1.5);
        };
        this.ping = function () { return __awaiter(_this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            watchId: undefined,
                            requestId: message_1.genRequestId(),
                            msgType: 'PING',
                            msgData: null
                        };
                        return [4, this.send({
                                msg: msg
                            })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); };
        this.onWatchStart = function (client, queryID) {
            _this._queryIdClientMap.set(queryID, client);
        };
        this.onWatchClose = function (client, queryID) {
            if (queryID) {
                _this._queryIdClientMap.delete(queryID);
            }
            _this._watchIdClientMap.delete(client.watchId);
            _this._virtualWSClient.delete(client);
            if (!_this._virtualWSClient.size) {
                _this.close(ws_event_1.CLOSE_EVENT_CODE.NoRealtimeListeners);
            }
        };
        this._maxReconnect = options.maxReconnect || DEFAULT_MAX_RECONNECT;
        this._reconnectInterval =
            options.reconnectInterval || DEFAULT_WS_RECONNECT_INTERVAL;
        this._context = options.context;
    }
    RealtimeWebSocketClient.prototype.clearHeartbeat = function () {
        this._pingTimeoutId && clearTimeout(this._pingTimeoutId);
        this._pongTimeoutId && clearTimeout(this._pongTimeoutId);
    };
    RealtimeWebSocketClient.prototype.close = function (code) {
        this.clearHeartbeat();
        if (this._ws) {
            this._ws.close(code, ws_event_1.CLOSE_EVENT_CODE_INFO[code].name);
            this._ws = undefined;
        }
    };
    RealtimeWebSocketClient.prototype.watch = function (options) {
        if (!this._ws && !this._wsInitPromise) {
            this.initWebSocketConnection(false);
        }
        var virtualClient = new virtual_websocket_client_1.VirtualWebSocketClient(__assign(__assign({}, options), { send: this.send, login: this.webLogin, isWSConnected: this.isWSConnected, onceWSConnected: this.onceWSConnected, getWaitExpectedTimeoutLength: this.getWaitExpectedTimeoutLength, onWatchStart: this.onWatchStart, onWatchClose: this.onWatchClose, debug: true }));
        this._virtualWSClient.add(virtualClient);
        this._watchIdClientMap.set(virtualClient.watchId, virtualClient);
        return virtualClient.listener;
    };
    RealtimeWebSocketClient.prototype.heartbeat = function (immediate) {
        var _this = this;
        this.clearHeartbeat();
        this._pingTimeoutId = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_6;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this._ws || this._ws.readyState !== WS_READY_STATE.OPEN) {
                            return [2];
                        }
                        this._lastPingSendTS = Date.now();
                        return [4, this.ping()];
                    case 1:
                        _a.sent();
                        this._pingFailed = 0;
                        this._pongTimeoutId = setTimeout(function () {
                            console.error('pong timed out');
                            if (_this._pongMissed < DEFAULT_PONG_MISS_TOLERANCE) {
                                _this._pongMissed++;
                                _this.heartbeat(true);
                            }
                            else {
                                _this.initWebSocketConnection(true);
                            }
                        }, this._context.appConfig.realtimePongWaitTimeout);
                        return [3, 3];
                    case 2:
                        e_6 = _a.sent();
                        if (this._pingFailed < DEFAULT_PING_FAIL_TOLERANCE) {
                            this._pingFailed++;
                            this.heartbeat();
                        }
                        else {
                            this.close(ws_event_1.CLOSE_EVENT_CODE.HeartbeatPingError);
                        }
                        return [3, 3];
                    case 3: return [2];
                }
            });
        }); }, immediate ? 0 : this._context.appConfig.realtimePingInterval);
    };
    return RealtimeWebSocketClient;
}());
exports.RealtimeWebSocketClient = RealtimeWebSocketClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LWNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJzb2NrZXQtY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUVBQW1FO0FBQ25FLHFDQUF3QztBQWN4Qyx1Q0FJbUI7QUFFbkIsaUNBQXlGO0FBQ3pGLG1DQUFpRDtBQUNqRCxpQ0FBK0I7QUE0RC9CLElBQU0sY0FBYyxHQUFHO0lBQ3JCLFVBQVUsRUFBRSxDQUFDO0lBQ2IsSUFBSSxFQUFFLENBQUM7SUFDUCxPQUFPLEVBQUUsQ0FBQztJQUNWLE1BQU0sRUFBRSxDQUFDO0NBQ1YsQ0FBQTtBQUVELElBQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFBO0FBQzFCLElBQU0sZ0NBQWdDLEdBQUcsSUFBSSxDQUFBO0FBQzdDLElBQU0sK0JBQStCLEdBQUcsS0FBSyxDQUFBO0FBQzdDLElBQU0scUJBQXFCLEdBQUcsQ0FBQyxDQUFBO0FBQy9CLElBQU0sNkJBQTZCLEdBQUcsS0FBSyxDQUFBO0FBRTNDLElBQU0sMkJBQTJCLEdBQUcsQ0FBQyxDQUFBO0FBQ3JDLElBQU0sMkJBQTJCLEdBQUcsQ0FBQyxDQUFBO0FBQ3JDLElBQU0scUJBQXFCLEdBQUcsSUFBSSxDQUFBO0FBRWxDO0lBK0JFLGlDQUFZLE9BQW1EO1FBQS9ELGlCQU1DO1FBcENPLHFCQUFnQixHQUFnQyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBRXpELHNCQUFpQixHQUF3QyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ2xFLHNCQUFpQixHQUF3QyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBUWxFLGdCQUFXLEdBQUcsQ0FBQyxDQUFBO1FBQ2YsZ0JBQVcsR0FBRyxDQUFDLENBQUE7UUFHZixZQUFPLEdBQXdDLElBQUksR0FBRyxFQUFFLENBQUE7UUFJeEQsdUJBQWtCLEdBQXFCLEVBQUUsQ0FBQTtRQUN6QyxvQkFBZSxHQUduQixJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ0wsaUJBQVksR0FBYSxFQUFFLENBQUE7UUFtQm5DLFNBQUksR0FBRyxVQUFnQixJQUFvQjs7O2dCQUN6QyxXQUFBLElBQUksT0FBTyxDQUFJLFVBQU8sUUFBUSxFQUFFLE9BQU87Ozs7OztvQ0FFakMsWUFBWSxHQUFHLEtBQUssQ0FBQTtvQ0FDcEIsWUFBWSxHQUFHLEtBQUssQ0FBQTtvQ0FFbEIsT0FBTyxHQUFvQixVQUMvQixLQUFzQzt3Q0FFdEMsWUFBWSxHQUFHLElBQUksQ0FBQTt3Q0FDbkIsU0FBUyxJQUFJLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQTt3Q0FDcEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO29DQUNqQixDQUFDLENBQUE7b0NBRUssTUFBTSxHQUFtQixVQUFDLEtBQVU7d0NBQ3hDLFlBQVksR0FBRyxJQUFJLENBQUE7d0NBQ25CLFNBQVMsSUFBSSxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUE7d0NBQ3BDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQ0FDaEIsQ0FBQyxDQUFBO29DQUVELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTt3Q0FFaEIsU0FBUyxHQUFHLFVBQVUsQ0FBQzs7Ozs2REFDakIsQ0FBQSxDQUFDLFlBQVksSUFBSSxDQUFDLFlBQVksQ0FBQSxFQUE5QixjQUE4Qjt3REFHaEMsV0FBTSxhQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUE7O3dEQUFkLFNBQWMsQ0FBQTt3REFDZCxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsWUFBWSxFQUFFOzREQUNsQyxNQUFNLENBQUMsSUFBSSxvQkFBWSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQTt5REFDbkQ7Ozs7OzZDQUVKLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO3FDQUNqQjs7Ozt5Q0FhSyxJQUFJLENBQUMsY0FBYyxFQUFuQixjQUFtQjtvQ0FDckIsV0FBTSxJQUFJLENBQUMsY0FBYyxFQUFBOztvQ0FBekIsU0FBeUIsQ0FBQTs7O29DQUczQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTt3Q0FDYixNQUFNLENBQ0osSUFBSSxLQUFLLENBQ1AsK0RBQStELENBQ2hFLENBQ0YsQ0FBQTt3Q0FDRCxXQUFNO3FDQUNQO29DQUVELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssY0FBYyxDQUFDLElBQUksRUFBRTt3Q0FDL0MsTUFBTSxDQUNKLElBQUksS0FBSyxDQUNQLDRCQUEwQixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsMkJBQXdCLENBQ3RFLENBQ0YsQ0FBQTt3Q0FDRCxXQUFNO3FDQUNQO29DQUVELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTt3Q0FDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUU7NENBQzNDLE9BQU8sU0FBQTs0Q0FDUCxNQUFNLFFBQUE7NENBQ04sYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO3lDQUNiLENBQUMsQ0FBQTtxQ0FDeEI7Ozs7b0NBSUMsV0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFBOztvQ0FBN0MsU0FBNkMsQ0FBQTtvQ0FDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7d0NBQ3RCLE9BQU8sRUFBRSxDQUFBO3FDQUNWOzs7O29DQUVELElBQUksS0FBRyxFQUFFO3dDQUNQLE1BQU0sQ0FBQyxLQUFHLENBQUMsQ0FBQTt3Q0FDWCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7NENBQ3JCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7eUNBQ2hEO3FDQUNGOzs7OztvQ0ErQkgsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFBOzs7Ozt5QkFFWixDQUFDLEVBQUE7O2FBQUEsQ0FBQTtRQVdKLG9CQUFlLEdBQUcsVUFBQyxLQUFVO1lBQzNCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO2dCQUNsQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzlCLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFBO1FBRUQsaUJBQVksR0FBRyxVQUFDLE9BQXFDO1lBQ25ELENBQUM7WUFBQSxDQUFDLE9BQU8sSUFBSSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO2dCQUNoRCxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUE7UUFFRCxrQkFBYSxHQUFHLFVBQUMsT0FBcUM7WUFDcEQsQ0FBQztZQUFBLENBQUMsT0FBTyxJQUFJLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07Z0JBQ2hELE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUNqQixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQTtRQXVCTyw0QkFBdUIsR0FBRyxVQUNoQyxTQUFrQixFQUNsQixnQkFBNkM7WUFBN0MsaUNBQUEsRUFBQSxtQkFBMkIsS0FBSSxDQUFDLGFBQWE7Ozs7Ozs7NEJBRzdDLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0NBQ3JDLFdBQU07NkJBQ1A7NEJBRUQsSUFBSSxTQUFTLEVBQUU7Z0NBQ2IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUE7NkJBQzVCOzRCQUVELElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtnQ0FFdkIsV0FBTyxJQUFJLENBQUMsY0FBYyxFQUFBOzZCQUMzQjs0QkFRRCxJQUFJLFNBQVMsRUFBRTtnQ0FDYixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7NkJBQ3BCOzRCQUVELElBQUksQ0FBQyxLQUFLLENBQUMsMkJBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQTs0QkFFL0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLE9BQU8sQ0FBTyxVQUFPLE9BQU8sRUFBRSxNQUFNOzs7Ozs7OzRDQWdCM0MsV0FBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7OzRDQUEvQixXQUFTLFNBQXNCOzRDQU9yQyxXQUFNLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTztvREFZdkIsSUFBTSxHQUFHLEdBQUcsUUFBTSxDQUFDLEtBQUssSUFBSSxrQ0FBa0MsQ0FBQztvREFDL0QsSUFBTSxPQUFPLEdBQUcsbUJBQVUsRUFBRSxDQUFDO29EQUM3QixLQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBO29EQUMxRCxPQUFPLEVBQUUsQ0FBQTtnREFDWCxDQUFDLENBQUMsRUFBQTs7NENBaEJGLFNBZ0JFLENBQUE7aURBRUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQWhCLGNBQWdCOzRDQUNqQixXQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUE7OzRDQUF4QixTQUF3QixDQUFBOztnREFTMUIsV0FBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBQTs7NENBQS9CLFNBQStCLENBQUE7NENBQy9CLE9BQU8sRUFBRSxDQUFBOzRDQUVULElBQUksU0FBUyxFQUFFO2dEQUNiLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtnREFDcEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUE7NkNBQzdCOzs7OzRDQUdELE9BQU8sQ0FBQyxLQUFLLENBQUMsaURBQWlELEVBQUUsR0FBQyxDQUFDLENBQUE7aURBRy9ELENBQUEsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFBLEVBQXBCLGNBQW9COzRDQUloQixXQUFXLEdBQUcsSUFBSSxDQUFBOzRDQXFCeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUE7aURBRTNCLFdBQVcsRUFBWCxjQUFXOzRDQU1iLFdBQU0sYUFBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFBOzs0Q0FBcEMsU0FBb0MsQ0FBQTs0Q0FDcEMsSUFBSSxTQUFTLEVBQUU7Z0RBQ2IsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUE7NkNBQzdCOzs7NENBR0gsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTs7OzRDQUV0RSxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUE7NENBRVQsSUFBSSxTQUFTLEVBQUU7Z0RBQ2IsSUFBSSxDQUFDLGVBQWUsQ0FDbEIsSUFBSSxxQkFBYSxDQUFDO29EQUNoQixPQUFPLEVBQUUsZ0JBQVEsQ0FBQyxtREFBNkQ7b0RBQy9FLE1BQU0sRUFBRSxHQUFDO2lEQUNWLENBQUMsQ0FDSCxDQUFBOzZDQUNGOzs7Ozs7aUNBR04sQ0FBQyxDQUFBOzs7OzRCQUtBLFdBQU0sSUFBSSxDQUFDLGNBQWMsRUFBQTs7NEJBQXpCLFNBQXlCLENBQUE7NEJBRXpCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFXO29DQUFULE9BQU8sYUFBQTtnQ0FBTyxPQUFBLE9BQU8sRUFBRTs0QkFBVCxDQUFTLENBQUMsQ0FBQTs7Ozs0QkFFM0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFDLEVBQVU7b0NBQVIsTUFBTSxZQUFBO2dDQUFPLE9BQUEsTUFBTSxFQUFFOzRCQUFSLENBQVEsQ0FBQyxDQUFBOzs7NEJBRXpELElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFBOzRCQUMvQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFBOzs7Ozs7U0FRL0IsQ0FBQTtRQUVPLHVCQUFrQixHQUFHO1lBQzNCLE9BQUEsSUFBSSxPQUFPLENBQU8sVUFBQyxPQUFPLEVBQUUsTUFBTTtnQkFDaEMsSUFBSSxDQUFDLEtBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFBO2lCQUM3RDtnQkFFRCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUE7Z0JBRXBCLEtBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLFVBQUEsS0FBSztvQkFJckIsT0FBTyxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxLQUFLLENBQUMsQ0FBQTtvQkFDaEQsUUFBUSxHQUFHLElBQUksQ0FBQTtvQkFDZixPQUFPLEVBQUUsQ0FBQTtnQkFDWCxDQUFDLENBQUE7Z0JBRUQsS0FBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsVUFBQSxLQUFLO29CQUl0QixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7b0JBSXhCLElBQUksQ0FBQyxRQUFRLEVBQUU7d0JBRWIsT0FBTyxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsRUFBRSxLQUFLLENBQUMsQ0FBQTt3QkFRdEUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO3FCQUNkO3lCQUFNO3dCQUVMLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUE7d0JBT2xELEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTt3QkFDckIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07NEJBQ2xDLE9BQUEsTUFBTSxDQUFDLGNBQWMsQ0FDbkIsSUFBSSxxQkFBYSxDQUFDO2dDQUNoQixPQUFPLEVBQUUsZ0JBQVEsQ0FBQyx5REFBbUU7Z0NBQ3JGLE1BQU0sRUFBRSxLQUFLOzZCQUNkLENBQUMsQ0FDSDt3QkFMRCxDQUtDLENBQ0YsQ0FBQTtxQkFDRjtnQkFDSCxDQUFDLENBQUE7Z0JBR0QsS0FBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsVUFBQSxVQUFVO29CQUkzQixPQUFPLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLFVBQVUsQ0FBQyxDQUFBO29CQVd0RCxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7b0JBRXhCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtvQkFDckIsUUFBUSxVQUFVLENBQUMsSUFBSSxFQUFFO3dCQUN2QixLQUFLLDJCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7NEJBRXhDLE1BQUs7eUJBQ047d0JBQ0QsS0FBSywyQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzRCQUV6QyxNQUFLO3lCQUNOO3dCQUNELEtBQUssMkJBQWdCLENBQUMsa0JBQWtCLENBQUM7d0JBQ3pDLEtBQUssMkJBQWdCLENBQUMseUJBQXlCLENBQUM7d0JBQ2hELEtBQUssMkJBQWdCLENBQUMsYUFBYSxDQUFDO3dCQUNwQyxLQUFLLDJCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDOzRCQU1yQyxJQUFJLEtBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFO2dDQUUxQixLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTs2QkFDdkQ7aUNBQU07Z0NBQ0wsS0FBSSxDQUFDLGVBQWUsQ0FBQywwQkFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBOzZCQUN2RDs0QkFDRCxNQUFLO3lCQUNOO3dCQUNELEtBQUssMkJBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs0QkFDdEMsS0FBSSxDQUFDLGVBQWUsQ0FDbEIsMEJBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FDcEQsQ0FBQTs0QkFDRCxNQUFLO3lCQUNOO3dCQUNELE9BQU8sQ0FBQyxDQUFDOzRCQUVQLElBQUksS0FBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEVBQUU7Z0NBRTFCLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBOzZCQUN2RDtpQ0FBTTtnQ0FDTCxLQUFJLENBQUMsZUFBZSxDQUFDLDBCQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7NkJBQ3ZEO3lCQUdGO3FCQUNGO2dCQUNILENBQUMsQ0FBQTtnQkFFRCxLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxVQUFBLEdBQUc7b0JBSXRCLElBQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7b0JBR3ZCLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtvQkFFaEIsSUFBSSxHQUFxQixDQUFBO29CQUV6QixJQUFJO3dCQUNGLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQWdCLENBQUMsQ0FBQTtxQkFDbkM7b0JBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBOEMsQ0FBRyxDQUFDLENBQUE7cUJBQ25FO29CQVNELElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQUU7d0JBRTNCLElBQUksY0FBWSxHQUFHLElBQUksQ0FBQTt3QkFDdkIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7NEJBQ2hDLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxHQUFHLENBQUMsT0FBTyxFQUFFO2dDQUNoQyxjQUFZLEdBQUcsSUFBSSxDQUFBOzZCQUNwQjt3QkFDSCxDQUFDLENBQUMsQ0FBQTt3QkFFRixJQUFJLGNBQVksRUFBRTs0QkFDaEIsY0FBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7eUJBQ25DO3FCQUNGO29CQUVELElBQU0sZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO29CQUNoRSxJQUFJLGdCQUFnQixFQUFFO3dCQUNwQixJQUFJOzRCQUNGLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQUU7Z0NBQzNCLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLGlDQUF5QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7NkJBQzVEO2lDQUFNO2dDQUNMLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTs2QkFDOUI7eUJBQ0Y7d0JBQUMsT0FBTyxDQUFDLEVBQUU7NEJBRVYsT0FBTyxDQUFDLEtBQUssQ0FDWCxxREFBcUQsRUFDckQsQ0FBQyxDQUNGLENBQUE7eUJBQ0Y7Z0NBQVM7NEJBQ1IsS0FBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO3lCQUMzQzt3QkFDRCxJQUFJLGdCQUFnQixDQUFDLGFBQWEsRUFBRTs0QkFDbEMsT0FBTTt5QkFDUDtxQkFDRjtvQkFFRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO3dCQUMxQixJQUFJLEtBQUksQ0FBQyxlQUFlLEVBQUU7NEJBQ3hCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFBOzRCQUM3QyxJQUFJLEdBQUcsR0FBRywrQkFBK0IsRUFBRTtnQ0FFekMsT0FBTyxDQUFDLElBQUksQ0FBQyx3Q0FBc0MsR0FBSyxDQUFDLENBQUE7Z0NBQ3pELE9BQU07NkJBQ1A7NEJBQ0QsSUFBSSxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxnQkFBZ0IsRUFBRTtnQ0FDaEQsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQ3RCLENBQUMsRUFDRCxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsR0FBRyxDQUFDLENBQ2hELENBQUE7NkJBQ0Y7NEJBQ0QsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7eUJBQzVCO3dCQUNELE9BQU07cUJBQ1A7b0JBRUQsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sSUFBSSxLQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtvQkFDbkUsSUFBSSxNQUFNLEVBQUU7d0JBQ1YsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtxQkFDdEI7eUJBQU07d0JBR0wsT0FBTyxDQUFDLEtBQUssQ0FDWCxtRUFBaUUsR0FBRyxDQUFDLE9BQU8sT0FBSSxFQUNoRixHQUFHLENBQ0osQ0FBQTt3QkFFRCxRQUFRLEdBQUcsQ0FBQyxPQUFPLEVBQUU7NEJBQ25CLEtBQUssWUFBWSxDQUFDOzRCQUNsQixLQUFLLFlBQVksQ0FBQzs0QkFDbEIsS0FBSyxhQUFhLENBQUMsQ0FBQztnQ0FDbEIsTUFBTSxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQ0FDeEQsSUFBSSxNQUFNLEVBQUU7b0NBQ1YsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtpQ0FDdEI7Z0NBQ0QsTUFBSzs2QkFDTjs0QkFDRCxPQUFPLENBQUMsQ0FBQztnQ0FDUCxLQUF3QixVQUE0QyxFQUE1QyxLQUFBLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQTVDLGNBQTRDLEVBQTVDLElBQTRDLEVBQUU7b0NBQTNELElBQUEsV0FBUyxFQUFQLFFBQU0sUUFBQTtvQ0FFakIsUUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQ0FDckIsTUFBSztpQ0FDTjs2QkFDRjt5QkFDRjtxQkFDRjtnQkFDSCxDQUFDLENBQUE7Z0JBRUQsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO1lBQ2xCLENBQUMsQ0FBQztRQXpPRixDQXlPRSxDQUFBO1FBRUksa0JBQWEsR0FBRztZQUN0QixPQUFPLE9BQU8sQ0FBQyxLQUFJLENBQUMsR0FBRyxJQUFJLEtBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN6RSxDQUFDLENBQUE7UUFFTyxvQkFBZSxHQUFHOzs7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFO29CQUN4QixXQUFNO2lCQUNQO2dCQUVELElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDdkIsV0FBTyxJQUFJLENBQUMsY0FBYyxFQUFBO2lCQUMzQjtnQkFFRCxXQUFPLElBQUksT0FBTyxDQUFPLFVBQUMsT0FBTyxFQUFFLE1BQU07d0JBQ3ZDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7NEJBQzNCLE9BQU8sU0FBQTs0QkFDUCxNQUFNLFFBQUE7eUJBQ1AsQ0FBQyxDQUFBO29CQUNKLENBQUMsQ0FBQyxFQUFBOzthQUNILENBQUE7UUFFTyxhQUFRLEdBQUcsVUFDakIsS0FBYyxFQUNkLE9BQWlCOzs7Ozs7d0JBRWpCLElBQUksQ0FBQyxPQUFPLEVBQUU7NEJBRVosSUFBSSxLQUFLLEVBQUU7Z0NBQ0gsY0FBWSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQ0FDekMsSUFBSSxXQUFTLEVBQUU7b0NBQ2IsSUFBSSxXQUFTLENBQUMsUUFBUSxJQUFJLFdBQVMsQ0FBQyxXQUFXLEVBQUU7d0NBSS9DLFdBQU8sV0FBUyxDQUFDLFdBQVcsRUFBQTtxQ0FDN0I7eUNBQU0sSUFBSSxXQUFTLENBQUMsZ0JBQWdCLEVBQUU7d0NBQ3JDLFdBQU8sV0FBUyxDQUFDLGdCQUFnQixFQUFBO3FDQUNsQztpQ0FDRjs2QkFDRjtpQ0FBTTtnQ0FDQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQ0FDOUMsSUFBSSxpQkFBaUIsYUFBakIsaUJBQWlCLHVCQUFqQixpQkFBaUIsQ0FBRSxnQkFBZ0IsRUFBRTtvQ0FDdkMsV0FBTyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBQTtpQ0FDMUM7NkJBQ0Y7eUJBQ0Y7d0JBR0ssT0FBTyxHQUFHLElBQUksT0FBTyxDQUFlLFVBQU8sT0FBTyxFQUFFLE1BQU07Ozs7Ozt3Q0FJN0MsV0FBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dDQUEvQixNQUFNLEdBQUcsU0FBc0I7d0NBRy9CLE9BQU8sR0FBNkI7NENBQ3hDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUU7NENBQ3pCLFdBQVcsRUFBRSxFQUFFOzRDQUdmLFFBQVEsRUFBRSxLQUFLOzRDQUNmLFVBQVUsRUFBRSxFQUFFOzRDQUNkLFdBQVcsRUFBRSxFQUFFO3lDQUNoQixDQUFBO3dDQUNLLFFBQVEsR0FBNEI7NENBQ3hDLE9BQU8sRUFBRSxTQUFTOzRDQUNsQixTQUFTLEVBQUUsc0JBQVksRUFBRTs0Q0FDekIsT0FBTyxFQUFFLE9BQU87NENBQ2hCLE9BQU8sU0FBQTs0Q0FDUCxTQUFTLEVBQUU7Z0RBQ1QsT0FBTyxFQUFFLG1CQUFVLEVBQUU7Z0RBQ3JCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTztnREFDdkIsYUFBYSxFQUFFLE1BQU0sQ0FBQyxhQUFhOzZDQUNwQzt5Q0FDRixDQUFBO3dDQUNtQixXQUFNLElBQUksQ0FBQyxJQUFJLENBQThCO2dEQUMvRCxHQUFHLEVBQUUsUUFBUTtnREFDYixZQUFZLEVBQUUsSUFBSTtnREFDbEIsYUFBYSxFQUFFLElBQUk7Z0RBQ25CLE9BQU8sRUFBRSxxQkFBcUI7NkNBQy9CLENBQUMsRUFBQTs7d0NBTEksV0FBVyxHQUFHLFNBS2xCO3dDQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTs0Q0FFN0IsT0FBTyxDQUFDO2dEQUNOLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSzs2Q0FDcEIsQ0FBQyxDQUFBO3lDQUNIOzZDQUFNOzRDQUVMLE1BQU0sQ0FDSixJQUFJLEtBQUssQ0FDSixXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksU0FBSSxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQVMsQ0FDN0QsQ0FDRixDQUFBO3lDQUNGOzs7O3dDQUVELE1BQU0sQ0FBQyxHQUFDLENBQUMsQ0FBQTs7Ozs7NkJBRVosQ0FBQyxDQUFBO3dCQUdFLFNBQVMsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7d0JBRTFDLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7d0JBRS9CLElBQUksU0FBUyxFQUFFOzRCQUNiLFNBQVMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBOzRCQUMxQixTQUFTLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFBOzRCQUNwQyxTQUFTLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQTt5QkFDdEM7NkJBQU07NEJBQ0wsU0FBUyxHQUFHO2dDQUNWLFFBQVEsRUFBRSxLQUFLO2dDQUNmLGdCQUFnQixFQUFFLE9BQU87Z0NBQ3pCLFlBQVksY0FBQTs2QkFDYixDQUFBOzRCQUVELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUE7eUJBQ3pDOzs7O3dCQWtCcUIsV0FBTSxPQUFPLEVBQUE7O3dCQUEzQixXQUFXLEdBQUcsU0FBYTt3QkFDM0IsWUFBWSxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTt3QkFDckQsSUFDRSxZQUFZOzRCQUNaLFlBQVksS0FBSyxTQUFTOzRCQUMxQixZQUFZLENBQUMsWUFBWSxLQUFLLFlBQVksRUFDMUM7NEJBQ0EsU0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7NEJBQ3pCLFNBQVMsQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUE7NEJBQ3RDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFBOzRCQUNsQyxTQUFTLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQTs0QkFDbkMsV0FBTyxXQUFXLEVBQUE7eUJBQ25COzZCQUFNLElBQUksWUFBWSxFQUFFOzRCQUN2QixJQUFJLFlBQVksQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDLFdBQVcsRUFBRTtnQ0FDckQsV0FBTyxZQUFZLENBQUMsV0FBVyxFQUFBOzZCQUNoQztpQ0FBTSxJQUFJLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRTtnQ0FDeEMsV0FBTyxZQUFZLENBQUMsZ0JBQWdCLEVBQUE7NkJBQ3JDO2lDQUFNO2dDQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQTs2QkFDNUM7eUJBQ0Y7NkJBQU07NEJBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO3lCQUN2Qzs7Ozt3QkFFRCxTQUFTLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQTt3QkFDMUIsU0FBUyxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQTt3QkFDdEMsU0FBUyxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUE7d0JBQ2xDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFBO3dCQUNqQyxNQUFNLEdBQUMsQ0FBQTs7OzthQUVWLENBQUE7UUFFTyxjQUFTLEdBQUc7Ozs7O3dCQUNsQixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFOzRCQUN2RCxXQUFPLElBQUksQ0FBQyxPQUFPLEVBQUE7eUJBQ3BCO3dCQUNLLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFBO3dCQUN4QixXQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBQyxPQUFPLEVBQUUsbUJBQVUsRUFBRSxFQUFDLENBQUMsRUFBQTs7d0JBQTNGLEdBQUcsR0FBRyxTQUFxRjt3QkFFakcsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFOzRCQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsd0dBQWdDLEdBQUcsQ0FBQyxJQUFNLENBQUMsQ0FBQTt5QkFDNUQ7d0JBRUQsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFOzRCQUNOLEtBQXlDLEdBQUcsQ0FBQyxJQUFJLEVBQWhELE9BQU8sYUFBQSxFQUFFLEtBQUssV0FBQSxFQUFFLGFBQWEsbUJBQUEsRUFBRSxLQUFLLFdBQUEsQ0FBWTs0QkFDdkQsV0FBTztvQ0FDTCxPQUFPLFNBQUE7b0NBQ1AsS0FBSyxPQUFBO29DQUNMLGFBQWEsZUFBQTtvQ0FDYixLQUFLLE9BQUE7b0NBQ0wsU0FBUyxXQUFBO2lDQUNWLEVBQUE7eUJBQ0Y7NkJBQU07NEJBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO3lCQUMvQzs7OzthQUNGLENBQUE7UUFFTyxpQ0FBNEIsR0FBRztZQUNyQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7Z0JBQzdCLE9BQU8sZ0NBQWdDLENBQUE7YUFDeEM7WUFHRCxPQUFPLENBQ0wsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHLElBQUssT0FBQSxHQUFHLEdBQUcsR0FBRyxFQUFULENBQVMsQ0FBQztnQkFDaEQsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7Z0JBQzNCLEdBQUcsQ0FDSixDQUFBO1FBQ0gsQ0FBQyxDQUFBO1FBeUNPLFNBQUksR0FBRzs7Ozs7d0JBQ1AsR0FBRyxHQUEyQjs0QkFDbEMsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLFNBQVMsRUFBRSxzQkFBWSxFQUFFOzRCQUN6QixPQUFPLEVBQUUsTUFBTTs0QkFDZixPQUFPLEVBQUUsSUFBSTt5QkFDZCxDQUFBO3dCQUNELFdBQU0sSUFBSSxDQUFDLElBQUksQ0FBQztnQ0FDZCxHQUFHLEtBQUE7NkJBQ0osQ0FBQyxFQUFBOzt3QkFGRixTQUVFLENBQUE7Ozs7YUFFSCxDQUFBO1FBRU8saUJBQVksR0FBRyxVQUFDLE1BQThCLEVBQUUsT0FBZTtZQUNyRSxLQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUM3QyxDQUFDLENBQUE7UUFFTyxpQkFBWSxHQUFHLFVBQUMsTUFBOEIsRUFBRSxPQUFlO1lBQ3JFLElBQUksT0FBTyxFQUFFO2dCQUNYLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7YUFDdkM7WUFDRCxLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUM3QyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBRXBDLElBQUksQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO2dCQUUvQixLQUFJLENBQUMsS0FBSyxDQUFDLDJCQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUE7YUFDakQ7UUFDSCxDQUFDLENBQUE7UUExMUJDLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLFlBQVksSUFBSSxxQkFBcUIsQ0FBQTtRQUVsRSxJQUFJLENBQUMsa0JBQWtCO1lBQ3JCLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSw2QkFBNkIsQ0FBQTtRQUM1RCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUE7SUFDakMsQ0FBQztJQUVELGdEQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsY0FBYyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDeEQsSUFBSSxDQUFDLGNBQWMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQzFELENBQUM7SUE0SEQsdUNBQUssR0FBTCxVQUFNLElBQXNCO1FBQzFCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtRQUVyQixJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsZ0NBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdEQsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUE7U0FDckI7SUFDSCxDQUFDO0lBb0JELHVDQUFLLEdBQUwsVUFBTSxPQUF3QjtRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ3BDO1FBRUQsSUFBTSxhQUFhLEdBQUcsSUFBSSxpREFBc0IsdUJBQzNDLE9BQU8sS0FDVixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFDcEIsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQ2pDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUNyQyw0QkFBNEIsRUFBRSxJQUFJLENBQUMsNEJBQTRCLEVBQy9ELFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUMvQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFDL0IsS0FBSyxFQUFFLElBQUksSUFDWCxDQUFBO1FBQ0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUN4QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUE7UUFDaEUsT0FBTyxhQUFhLENBQUMsUUFBUSxDQUFBO0lBQy9CLENBQUM7SUFtbUJPLDJDQUFTLEdBQWpCLFVBQWtCLFNBQW1CO1FBQXJDLGlCQXFDQztRQXBDQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7UUFFckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQzlCOzs7Ozs7O3dCQUVJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLGNBQWMsQ0FBQyxJQUFJLEVBQUU7NEJBRTVELFdBQU07eUJBQ1A7d0JBRUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7d0JBQ2pDLFdBQU0sSUFBSSxDQUFDLElBQUksRUFBRSxFQUFBOzt3QkFBakIsU0FBaUIsQ0FBQTt3QkFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUE7d0JBR3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDOzRCQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUE7NEJBQy9CLElBQUksS0FBSSxDQUFDLFdBQVcsR0FBRywyQkFBMkIsRUFBRTtnQ0FDbEQsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO2dDQUNsQixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBOzZCQUNyQjtpQ0FBTTtnQ0FFTCxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUE7NkJBQ25DO3dCQUNILENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBOzs7O3dCQUVuRCxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsMkJBQTJCLEVBQUU7NEJBQ2xELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTs0QkFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO3lCQUNqQjs2QkFBTTs0QkFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLDJCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUE7eUJBQ2hEOzs7OzthQUVKLEVBQ0QsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUM3RCxDQUFBO0lBQ0gsQ0FBQztJQStCSCw4QkFBQztBQUFELENBQUMsQUEzM0JELElBMjNCQztBQTMzQlksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlydHVhbFdlYlNvY2tldENsaWVudCB9IGZyb20gJy4vdmlydHVhbC13ZWJzb2NrZXQtY2xpZW50J1xuaW1wb3J0IHsgZ2VuUmVxdWVzdElkIH0gZnJvbSAnLi9tZXNzYWdlJ1xuaW1wb3J0IHtcbiAgSURhdGFiYXNlU2VydmljZUNvbnRleHQsXG59IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvZGF0YWJhc2UnXG5pbXBvcnQge1xuICBJV2F0Y2hPcHRpb25zLFxuICBEQlJlYWx0aW1lTGlzdGVuZXIsXG4gIElSZXF1ZXN0TWVzc2FnZSxcbiAgSVJlc3BvbnNlTWVzc2FnZSxcbiAgSVJlcXVlc3RNZXNzYWdlUGluZ01zZyxcbiAgSVJlcXVlc3RNZXNzYWdlTG9naW5Nc2csXG4gIElSZXNwb25zZU1lc3NhZ2VMb2dpblJlc01zZyxcbiAgSVJlcXVlc3RNZXNzYWdlTG9naW5EYXRhXG59IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVhbHRpbWUnXG5pbXBvcnQge1xuICBDTE9TRV9FVkVOVF9DT0RFLFxuICBDTE9TRV9FVkVOVF9DT0RFX0lORk8sXG4gIGdldFdTQ2xvc2VFcnJvclxufSBmcm9tICcuL3dzLWV2ZW50J1xuXG5pbXBvcnQgeyBFUlJfQ09ERSwgVGltZW91dEVycm9yLCBSZWFsdGltZUVycm9yTWVzc2FnZUVycm9yLENsb3VkU0RLRXJyb3IgfSBmcm9tICcuL2Vycm9yJ1xuaW1wb3J0IHsgZ2V0V3NDbGFzcywgZ2V0UnVudGltZSB9IGZyb20gJy4vY29tbW9uJ1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElSZWFsdGltZVdlYlNvY2tldENsaWVudENvbnN0cnVjdG9yT3B0aW9ucyB7XG4gIG1heFJlY29ubmVjdD86IG51bWJlclxuICByZWNvbm5lY3RJbnRlcnZhbD86IG51bWJlclxuICBjb250ZXh0OiBJRGF0YWJhc2VTZXJ2aWNlQ29udGV4dFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTaWduYXR1cmUge1xuICBlbnZJZDogc3RyaW5nXG4gIHNlY3JldFZlcnNpb246IG51bWJlclxuICBzaWduU3RyOiBzdHJpbmdcbiAgd3NVcmw6IHN0cmluZ1xuICBleHBpcmVUUzogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUxvZ2luSW5mbyB7XG4gIGxvZ2dlZEluOiBib29sZWFuXG4gIGxvZ2dpbmdJblByb21pc2U/OiBQcm9taXNlPElMb2dpblJlc3VsdD5cbiAgbG9naW5TdGFydFRTPzogbnVtYmVyXG4gIGxvZ2luUmVzdWx0PzogSUxvZ2luUmVzdWx0XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUxvZ2luUmVzdWx0IHtcbiAgZW52SWQ6IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElXU1NlbmRPcHRpb25zIHtcbiAgbXNnOiBJUmVxdWVzdE1lc3NhZ2VcbiAgd2FpdFJlc3BvbnNlPzogYm9vbGVhblxuICAvLyB3aGVuIHdhaXRSZXNwb25zZSBpcyBzZXQgdG8gdHJ1ZSwgaWYgc2tpcE9uTWVzc2FnZSBpcyB0cnVlLCBnZW5lcmFsIG9uTWVzc2FnZSBoYW5kbGVyIHdpbGwgYmUgc2tpcHBlZFxuICBza2lwT25NZXNzYWdlPzogYm9vbGVhblxuICB0aW1lb3V0PzogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVdTV2F0Y2hPcHRpb25zIGV4dGVuZHMgSVdhdGNoT3B0aW9ucyB7XG4gIGVudklkPzogc3RyaW5nXG4gIGNvbGxlY3Rpb25OYW1lOiBzdHJpbmdcbiAgcXVlcnk6IHN0cmluZ1xuICBsaW1pdD86IG51bWJlclxuICBvcmRlckJ5PzogUmVjb3JkPHN0cmluZywgc3RyaW5nPlxufVxuXG5pbnRlcmZhY2UgSVJlc29sdmVSZWplY3Qge1xuICByZXNvbHZlOiAodmFsdWU/OiBhbnkgfCBQcm9taXNlTGlrZTxhbnk+IHwgdW5kZWZpbmVkKSA9PiB2b2lkXG4gIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZFxufVxuXG5pbnRlcmZhY2UgSVJlc3BvbnNlV2FpdFNwZWMgZXh0ZW5kcyBJUmVzb2x2ZVJlamVjdCB7XG4gIHNraXBPbk1lc3NhZ2U/OiBib29sZWFuXG59XG5cbmludGVyZmFjZSBJV3NTaWduIHtcbiAgc2lnblN0cjogc3RyaW5nLFxuICB3c1VybDogc3RyaW5nLFxuICBzZWNyZXRWZXJzaW9uOiBzdHJpbmdcbiAgZW52SWQ6IHN0cmluZ1xuICBleHBpcmVkVHM6IG51bWJlclxufVxuXG5jb25zdCBXU19SRUFEWV9TVEFURSA9IHtcbiAgQ09OTkVDVElORzogMCxcbiAgT1BFTjogMSxcbiAgQ0xPU0lORzogMixcbiAgQ0xPU0VEOiAzXG59XG5cbmNvbnN0IE1BWF9SVFRfT0JTRVJWRUQgPSAzXG5jb25zdCBERUZBVUxUX0VYUEVDVEVEX0VWRU5UX1dBSVRfVElNRSA9IDUwMDBcbmNvbnN0IERFRkFVTFRfVU5UUlVTVEVEX1JUVF9USFJFU0hPTEQgPSAxMDAwMFxuY29uc3QgREVGQVVMVF9NQVhfUkVDT05ORUNUID0gNVxuY29uc3QgREVGQVVMVF9XU19SRUNPTk5FQ1RfSU5URVJWQUwgPSAxMDAwMFxuLy8gY29uc3QgREVGQVVMVF9XU19SRUNPTk5FQ1RfTUFYX1ZBTElEX0lOVEVSVkFMID0gMyAqIDYwICogMTAwMFxuY29uc3QgREVGQVVMVF9QSU5HX0ZBSUxfVE9MRVJBTkNFID0gMlxuY29uc3QgREVGQVVMVF9QT05HX01JU1NfVE9MRVJBTkNFID0gMlxuY29uc3QgREVGQVVMVF9MT0dJTl9USU1FT1VUID0gNTAwMFxuXG5leHBvcnQgY2xhc3MgUmVhbHRpbWVXZWJTb2NrZXRDbGllbnQge1xuICBwcml2YXRlIF92aXJ0dWFsV1NDbGllbnQ6IFNldDxWaXJ0dWFsV2ViU29ja2V0Q2xpZW50PiA9IG5ldyBTZXQoKVxuICAvLyBhZnRlciBsaXN0ZW5lciBpbml0V2F0Y2gsIHRoZSBsaXN0ZW5lciBoYXMgdGhlIHF1ZXJ5SUQgYW5kIGNhbiBzdG9yZSBpdCBoZXJlXG4gIHByaXZhdGUgX3F1ZXJ5SWRDbGllbnRNYXA6IE1hcDxzdHJpbmcsIFZpcnR1YWxXZWJTb2NrZXRDbGllbnQ+ID0gbmV3IE1hcCgpXG4gIHByaXZhdGUgX3dhdGNoSWRDbGllbnRNYXA6IE1hcDxzdHJpbmcsIFZpcnR1YWxXZWJTb2NrZXRDbGllbnQ+ID0gbmV3IE1hcCgpXG4gIHByaXZhdGUgX21heFJlY29ubmVjdDogbnVtYmVyXG4gIC8vIHByaXZhdGUgX2F2YWlsYWJsZVJldHJpZXM6IG51bWJlclxuICBwcml2YXRlIF9yZWNvbm5lY3RJbnRlcnZhbDogbnVtYmVyXG4gIHByaXZhdGUgX2NvbnRleHQ6IElEYXRhYmFzZVNlcnZpY2VDb250ZXh0XG4gIC8vIHByaXZhdGUgX3dzPzogV1hOUy5Tb2NrZXQuSVNvY2tldFRhc2tcbiAgcHJpdmF0ZSBfd3M/OiBhbnlcbiAgcHJpdmF0ZSBfbGFzdFBpbmdTZW5kVFM/OiBudW1iZXJcbiAgcHJpdmF0ZSBfcGluZ0ZhaWxlZCA9IDBcbiAgcHJpdmF0ZSBfcG9uZ01pc3NlZCA9IDBcbiAgcHJpdmF0ZSBfcGluZ1RpbWVvdXRJZD86IG51bWJlclxuICBwcml2YXRlIF9wb25nVGltZW91dElkPzogbnVtYmVyXG4gIHByaXZhdGUgX2xvZ2luczogTWFwPHN0cmluZyAvKiBlbnZJZCAqLywgSUxvZ2luSW5mbz4gPSBuZXcgTWFwKClcbiAgLy8gcHJpdmF0ZSBfbG9naW5JbmZvOiBJTG9naW5JbmZvXG4gIC8vIHByaXZhdGUgX3NpZ25hdHVyZXM6IE1hcDxzdHJpbmcgLyogZW52SWQgKi8sIElTaWduYXR1cmU+ID0gbmV3IE1hcCgpXG4gIHByaXZhdGUgX3dzSW5pdFByb21pc2U/OiBQcm9taXNlPHZvaWQ+XG4gIHByaXZhdGUgX3dzUmVhZHlTdWJzcmliZXJzOiBJUmVzb2x2ZVJlamVjdFtdID0gW11cbiAgcHJpdmF0ZSBfd3NSZXNwb25zZVdhaXQ6IE1hcDxcbiAgICBzdHJpbmcgLyogcmVxdWVzdElkICovLFxuICAgIElSZXNwb25zZVdhaXRTcGVjXG4gID4gPSBuZXcgTWFwKClcbiAgcHJpdmF0ZSBfcnR0T2JzZXJ2ZWQ6IG51bWJlcltdID0gW11cbiAgcHJpdmF0ZSBfcmVjb25uZWN0U3RhdGU6IGJvb2xlYW5cbiAgLy8gb2J0YWluZWQgZnJvbSB0aGUgZmlyc3QgZ2V0U2lnbmF0dXJlIHdpdGggbm8gZW52SWQgcHJvdmlkZWRcbiAgLy8gcHJpdmF0ZSBfZGVmYXVsdEVudklkPzogc3RyaW5nXG4gIHByaXZhdGUgX3dzU2lnbjogSVdzU2lnblxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElSZWFsdGltZVdlYlNvY2tldENsaWVudENvbnN0cnVjdG9yT3B0aW9ucykge1xuICAgIHRoaXMuX21heFJlY29ubmVjdCA9IG9wdGlvbnMubWF4UmVjb25uZWN0IHx8IERFRkFVTFRfTUFYX1JFQ09OTkVDVFxuICAgIC8vIHRoaXMuX2F2YWlsYWJsZVJldHJpZXMgPSB0aGlzLl9tYXhSZWNvbm5lY3RcbiAgICB0aGlzLl9yZWNvbm5lY3RJbnRlcnZhbCA9XG4gICAgICBvcHRpb25zLnJlY29ubmVjdEludGVydmFsIHx8IERFRkFVTFRfV1NfUkVDT05ORUNUX0lOVEVSVkFMXG4gICAgdGhpcy5fY29udGV4dCA9IG9wdGlvbnMuY29udGV4dFxuICB9XG5cbiAgY2xlYXJIZWFydGJlYXQoKSB7XG4gICAgdGhpcy5fcGluZ1RpbWVvdXRJZCAmJiBjbGVhclRpbWVvdXQodGhpcy5fcGluZ1RpbWVvdXRJZClcbiAgICB0aGlzLl9wb25nVGltZW91dElkICYmIGNsZWFyVGltZW91dCh0aGlzLl9wb25nVGltZW91dElkKVxuICB9XG5cbiAgc2VuZCA9IGFzeW5jIDxUID0gYW55PihvcHRzOiBJV1NTZW5kT3B0aW9ucyk6IFByb21pc2U8VD4gPT5cbiAgICBuZXcgUHJvbWlzZTxUPihhc3luYyAoX3Jlc29sdmUsIF9yZWplY3QpID0+IHtcbiAgICAgIGxldCB0aW1lb3V0SWQ6IG51bWJlclxuICAgICAgbGV0IF9oYXNSZXNvbHZlZCA9IGZhbHNlXG4gICAgICBsZXQgX2hhc1JlamVjdGVkID0gZmFsc2VcblxuICAgICAgY29uc3QgcmVzb2x2ZTogdHlwZW9mIF9yZXNvbHZlID0gKFxuICAgICAgICB2YWx1ZT86IFQgfCBQcm9taXNlTGlrZTxUPiB8IHVuZGVmaW5lZFxuICAgICAgKSA9PiB7XG4gICAgICAgIF9oYXNSZXNvbHZlZCA9IHRydWVcbiAgICAgICAgdGltZW91dElkICYmIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpXG4gICAgICAgIF9yZXNvbHZlKHZhbHVlKVxuICAgICAgfVxuXG4gICAgICBjb25zdCByZWplY3Q6IHR5cGVvZiBfcmVqZWN0ID0gKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgX2hhc1JlamVjdGVkID0gdHJ1ZVxuICAgICAgICB0aW1lb3V0SWQgJiYgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZClcbiAgICAgICAgX3JlamVjdChlcnJvcilcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdHMudGltZW91dCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGlmICghX2hhc1Jlc29sdmVkIHx8ICFfaGFzUmVqZWN0ZWQpIHtcbiAgICAgICAgICAgIC8vIHdhaXQgYW5vdGhlciBpbW1lZGlhdGUgdGltZW91dCB0byBhbGxvdyB0aGUgc3VjY2Vzcy9mYWlsIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgaWYgd3MgaGFzIGFscmVhZHkgZ290IHRoZSByZXN1bHQsXG4gICAgICAgICAgICAvLyB0aGlzIGlzIGJlY2F1c2UgdGhlIHRpbWVyIGlzIHJlZ2lzdGVyZWQgYmVmb3JlIHdzLnNlbmRcbiAgICAgICAgICAgIGF3YWl0IHNsZWVwKDApXG4gICAgICAgICAgICBpZiAoIV9oYXNSZXNvbHZlZCB8fCAhX2hhc1JlamVjdGVkKSB7XG4gICAgICAgICAgICAgIHJlamVjdChuZXcgVGltZW91dEVycm9yKCd3c2NsaWVudC5zZW5kIHRpbWVkb3V0JykpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBvcHRzLnRpbWVvdXQpXG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIGlmICh0aGlzLl9jb250ZXh0LmRlYnVnKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBbcmVhbHRpbWVdIHdzIHNlbmQgKCR7bmV3IERhdGUoKX0pOiBgLCBvcHRzKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAgICAgLy8gICBgW3JlYWx0aW1lXSB3cyBzZW5kICR7XG4gICAgICAgIC8vICAgICBvcHRzLm1zZy5tc2dUeXBlXG4gICAgICAgIC8vICAgfSAoJHtuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCl9KTogYCxcbiAgICAgICAgLy8gICBvcHRzXG4gICAgICAgIC8vIClcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGlmICh0aGlzLl93c0luaXRQcm9taXNlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fd3NJbml0UHJvbWlzZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl93cykge1xuICAgICAgICAgIHJlamVjdChcbiAgICAgICAgICAgIG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgJ2ludmFsaWQgc3RhdGU6IHdzIGNvbm5lY3Rpb24gbm90IGV4aXN0cywgY2FuIG5vdCBzZW5kIG1lc3NhZ2UnXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3dzLnJlYWR5U3RhdGUgIT09IFdTX1JFQURZX1NUQVRFLk9QRU4pIHtcbiAgICAgICAgICByZWplY3QoXG4gICAgICAgICAgICBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGB3cyByZWFkeVN0YXRlIGludmFsaWQ6ICR7dGhpcy5fd3MucmVhZHlTdGF0ZX0sIGNhbiBub3Qgc2VuZCBtZXNzYWdlYFxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRzLndhaXRSZXNwb25zZSkge1xuICAgICAgICAgIHRoaXMuX3dzUmVzcG9uc2VXYWl0LnNldChvcHRzLm1zZy5yZXF1ZXN0SWQsIHtcbiAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICByZWplY3QsXG4gICAgICAgICAgICBza2lwT25NZXNzYWdlOiBvcHRzLnNraXBPbk1lc3NhZ2VcbiAgICAgICAgICB9IGFzIElSZXNwb25zZVdhaXRTcGVjKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3NlbmQgbXNnOicsIG9wdHMubXNnKVxuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX3dzLnNlbmQoSlNPTi5zdHJpbmdpZnkob3B0cy5tc2cpKVxuICAgICAgICAgIGlmICghb3B0cy53YWl0UmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycilcbiAgICAgICAgICAgIGlmIChvcHRzLndhaXRSZXNwb25zZSkge1xuICAgICAgICAgICAgICB0aGlzLl93c1Jlc3BvbnNlV2FpdC5kZWxldGUob3B0cy5tc2cucmVxdWVzdElkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLl93cy5zZW5kKEpTT04uc3RyaW5naWZ5KG9wdHMubXNnKSwgZXJyID0+IHtcbiAgICAgICAgLy8gICBpZiAoZXJyKSB7XG4gICAgICAgIC8vICAgICByZWplY3QoZXJyKVxuICAgICAgICAvLyAgICAgaWYgKG9wdHMud2FpdFJlc3BvbnNlKSB7XG4gICAgICAgIC8vICAgICAgIHRoaXMuX3dzUmVzcG9uc2VXYWl0LmRlbGV0ZShvcHRzLm1zZy5yZXF1ZXN0SWQpXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICByZXR1cm5cbiAgICAgICAgLy8gICB9XG5cbiAgICAgICAgLy8gICBpZiAoIW9wdHMud2FpdFJlc3BvbnNlKSB7XG4gICAgICAgIC8vICAgICByZXNvbHZlKClcbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vIH0pXG5cbiAgICAgICAgLy8gdGhpcy5fd3Muc2VuZCh7XG4gICAgICAgIC8vICAgZGF0YTogSlNPTi5zdHJpbmdpZnkob3B0cy5tc2cpLFxuICAgICAgICAvLyAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIC8vICAgICBpZiAoIW9wdHMud2FpdFJlc3BvbnNlKSB7XG4gICAgICAgIC8vICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgIH0sXG4gICAgICAgIC8vICAgZmFpbDogZSA9PiB7XG4gICAgICAgIC8vICAgICByZWplY3QoZSlcbiAgICAgICAgLy8gICAgIGlmIChvcHRzLndhaXRSZXNwb25zZSkge1xuICAgICAgICAvLyAgICAgICB0aGlzLl93c1Jlc3BvbnNlV2FpdC5kZWxldGUob3B0cy5tc2cucmVxdWVzdElkKVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gfSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0KGUpXG4gICAgICB9XG4gICAgfSlcblxuICBjbG9zZShjb2RlOiBDTE9TRV9FVkVOVF9DT0RFKSB7XG4gICAgdGhpcy5jbGVhckhlYXJ0YmVhdCgpXG5cbiAgICBpZiAodGhpcy5fd3MpIHtcbiAgICAgIHRoaXMuX3dzLmNsb3NlKGNvZGUsIENMT1NFX0VWRU5UX0NPREVfSU5GT1tjb2RlXS5uYW1lKVxuICAgICAgdGhpcy5fd3MgPSB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBjbG9zZUFsbENsaWVudHMgPSAoZXJyb3I6IGFueSkgPT4ge1xuICAgIHRoaXMuX3ZpcnR1YWxXU0NsaWVudC5mb3JFYWNoKGNsaWVudCA9PiB7XG4gICAgICBjbGllbnQuY2xvc2VXaXRoRXJyb3IoZXJyb3IpXG4gICAgfSlcbiAgfVxuXG4gIHBhdXNlQ2xpZW50cyA9IChjbGllbnRzPzogU2V0PFZpcnR1YWxXZWJTb2NrZXRDbGllbnQ+KSA9PiB7XG4gICAgOyhjbGllbnRzIHx8IHRoaXMuX3ZpcnR1YWxXU0NsaWVudCkuZm9yRWFjaChjbGllbnQgPT4ge1xuICAgICAgY2xpZW50LnBhdXNlKClcbiAgICB9KVxuICB9XG5cbiAgcmVzdW1lQ2xpZW50cyA9IChjbGllbnRzPzogU2V0PFZpcnR1YWxXZWJTb2NrZXRDbGllbnQ+KSA9PiB7XG4gICAgOyhjbGllbnRzIHx8IHRoaXMuX3ZpcnR1YWxXU0NsaWVudCkuZm9yRWFjaChjbGllbnQgPT4ge1xuICAgICAgY2xpZW50LnJlc3VtZSgpXG4gICAgfSlcbiAgfVxuXG4gIHdhdGNoKG9wdGlvbnM6IElXU1dhdGNoT3B0aW9ucyk6IERCUmVhbHRpbWVMaXN0ZW5lciB7XG4gICAgaWYgKCF0aGlzLl93cyAmJiAhdGhpcy5fd3NJbml0UHJvbWlzZSkge1xuICAgICAgdGhpcy5pbml0V2ViU29ja2V0Q29ubmVjdGlvbihmYWxzZSlcbiAgICB9XG5cbiAgICBjb25zdCB2aXJ0dWFsQ2xpZW50ID0gbmV3IFZpcnR1YWxXZWJTb2NrZXRDbGllbnQoe1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIHNlbmQ6IHRoaXMuc2VuZCxcbiAgICAgIGxvZ2luOiB0aGlzLndlYkxvZ2luLFxuICAgICAgaXNXU0Nvbm5lY3RlZDogdGhpcy5pc1dTQ29ubmVjdGVkLFxuICAgICAgb25jZVdTQ29ubmVjdGVkOiB0aGlzLm9uY2VXU0Nvbm5lY3RlZCxcbiAgICAgIGdldFdhaXRFeHBlY3RlZFRpbWVvdXRMZW5ndGg6IHRoaXMuZ2V0V2FpdEV4cGVjdGVkVGltZW91dExlbmd0aCxcbiAgICAgIG9uV2F0Y2hTdGFydDogdGhpcy5vbldhdGNoU3RhcnQsXG4gICAgICBvbldhdGNoQ2xvc2U6IHRoaXMub25XYXRjaENsb3NlLFxuICAgICAgZGVidWc6IHRydWVcbiAgICB9KVxuICAgIHRoaXMuX3ZpcnR1YWxXU0NsaWVudC5hZGQodmlydHVhbENsaWVudClcbiAgICB0aGlzLl93YXRjaElkQ2xpZW50TWFwLnNldCh2aXJ0dWFsQ2xpZW50LndhdGNoSWQsIHZpcnR1YWxDbGllbnQpXG4gICAgcmV0dXJuIHZpcnR1YWxDbGllbnQubGlzdGVuZXJcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFdlYlNvY2tldENvbm5lY3Rpb24gPSBhc3luYyAoXG4gICAgcmVjb25uZWN0OiBib29sZWFuLFxuICAgIGF2YWlsYWJsZVJldHJpZXM6IG51bWJlciA9IHRoaXMuX21heFJlY29ubmVjdFxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAvLyDlvZPliY3lpITkuo7mraPlnKjph43ov57kuK3nmoTnirbmgIFcbiAgICBpZiAocmVjb25uZWN0ICYmIHRoaXMuX3JlY29ubmVjdFN0YXRlKSB7XG4gICAgICByZXR1cm4gLy8g5b+955WlXG4gICAgfVxuXG4gICAgaWYgKHJlY29ubmVjdCkge1xuICAgICAgdGhpcy5fcmVjb25uZWN0U3RhdGUgPSB0cnVlIC8vIOmHjei/nueKtuaAgeW8gOWni1xuICAgIH1cblxuICAgIGlmICh0aGlzLl93c0luaXRQcm9taXNlKSB7XG4gICAgICAvLyB0aGVyZSBhbHJlYWR5IGV4aXN0cyBhIHdlYnNvY2tldCBpbml0aWF0aW9uLCBqdXN0IHdhaXQgZm9yIGl0XG4gICAgICByZXR1cm4gdGhpcy5fd3NJbml0UHJvbWlzZVxuICAgIH1cblxuICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgIC8vIGNvbnNvbGUubG9nKFxuICAgIC8vICAgYFtyZWFsdGltZV0gaW5pdFdlYlNvY2tldENvbm5lY3Rpb24gcmVjb25uZWN0ICR7cmVjb25uZWN0fSBhdmFpbGFibGVSZXRyaWVzICR7YXZhaWxhYmxlUmV0cmllc31gXG4gICAgLy8gKVxuICAgIC8vIH1cblxuICAgIGlmIChyZWNvbm5lY3QpIHtcbiAgICAgIHRoaXMucGF1c2VDbGllbnRzKClcbiAgICB9XG5cbiAgICB0aGlzLmNsb3NlKENMT1NFX0VWRU5UX0NPREUuUmVjb25uZWN0V2ViU29ja2V0KVxuXG4gICAgdGhpcy5fd3NJbml0UHJvbWlzZSA9IG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAgICAgLy8gICAnW3JlYWx0aW1lXSBpbml0V2ViU29ja2V0Q29ubmVjdGlvbiBzdGFydCB0aHJvd0Vycm9ySWZOZXR3b3JrT2ZmbGluZSdcbiAgICAgICAgLy8gKVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8g5pqC5LiN5qOA5p+l572R57uc5oCBXG4gICAgICAgIC8vIGF3YWl0IHRocm93RXJyb3JJZk5ldHdvcmtPZmZsaW5lKClcblxuICAgICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1tyZWFsdGltZV0gaW5pdFdlYlNvY2tldENvbm5lY3Rpb24gc3RhcnQgZ2V0U2lnbmF0dXJlJylcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGNvbnN0IHNpZ25hdHVyZSA9IGF3YWl0IHRoaXMuZ2V0U2lnbmF0dXJlKClcbiAgICAgICAgY29uc3Qgd3NTaWduID0gYXdhaXQgdGhpcy5nZXRXc1NpZ24oKVxuXG4gICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnW3JlYWx0aW1lXSBpbml0V2ViU29ja2V0Q29ubmVjdGlvbiBnZXRTaWduYXR1cmUgc3VjY2VzcycpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdbcmVhbHRpbWVdIGluaXRXZWJTb2NrZXRDb25uZWN0aW9uIHN0YXJ0IGNvbm5lY3RTb2NrZXQnKVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2Uoc3VjY2VzcyA9PiB7XG4gICAgICAgICAgLy8gdGhpcy5fd3MgPSBnZXRTREsodGhpcy5fY29udGV4dC5pZGVudGlmaWVycylcbiAgICAgICAgICAvLyAgIC5fc29ja2V0U2tpcENoZWNrRG9tYWluRmFjdG9yeSgpXG4gICAgICAgICAgLy8gICAuY29ubmVjdFNvY2tldCh7XG4gICAgICAgICAgLy8gICAgIHVybDogc2lnbmF0dXJlLndzVXJsLFxuICAgICAgICAgIC8vICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAvLyAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgIC8vICAgICB9LFxuICAgICAgICAgIC8vICAgICBzdWNjZXNzOiAoKSA9PiBzdWNjZXNzKCksXG4gICAgICAgICAgLy8gICAgIGZhaWxcbiAgICAgICAgICAvLyAgIH0pXG5cbiAgICAgICAgICBjb25zdCB1cmwgPSB3c1NpZ24ud3NVcmwgfHwgJ3dzczovL3RjYi13cy50ZW5jZW50Y2xvdWRhcGkuY29tJztcbiAgICAgICAgICBjb25zdCB3c0NsYXNzID0gZ2V0V3NDbGFzcygpO1xuICAgICAgICAgIHRoaXMuX3dzID0gd3NDbGFzcyA/IG5ldyB3c0NsYXNzKHVybCkgOiBuZXcgV2ViU29ja2V0KHVybClcbiAgICAgICAgICBzdWNjZXNzKClcbiAgICAgICAgfSlcblxuICAgICAgICBpZih0aGlzLl93cy5jb25uZWN0KXtcbiAgICAgICAgICBhd2FpdCB0aGlzLl93cy5jb25uZWN0KClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAgICAgLy8gICAnW3JlYWx0aW1lXSBpbml0V2ViU29ja2V0Q29ubmVjdGlvbiBjb25uZWN0U29ja2V0IHN1Y2Nlc3NmdWxseSBmaXJlZCdcbiAgICAgICAgLy8gKVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5pbml0V2ViU29ja2V0RXZlbnQoKVxuICAgICAgICByZXNvbHZlKClcblxuICAgICAgICBpZiAocmVjb25uZWN0KSB7XG4gICAgICAgICAgdGhpcy5yZXN1bWVDbGllbnRzKClcbiAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RTdGF0ZSA9IGZhbHNlIC8vIOmHjei/nueKtuaAgee7k+adn1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbcmVhbHRpbWVdIGluaXRXZWJTb2NrZXRDb25uZWN0aW9uIGNvbm5lY3QgZmFpbCcsIGUpXG4gICAgICAgIC8vIH1cblxuICAgICAgICBpZiAoYXZhaWxhYmxlUmV0cmllcyA+IDApIHtcbiAgICAgICAgICAvLyB0aGlzIGlzIGFuIG9wdGltaXphdGlvbiwgaW4gY2FzZSBvZiBuZXR3b3JrIG9mZmxpbmUsIHdlIGRvbid0IG5lZWQgdG8gc3R1YmJvcm5seSBzbGVlcCBmb3Igc29tZXRpbWUsXG4gICAgICAgICAgLy8gd2Ugb25seSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBuZXR3b3JrIHRvIGJlIGJhY2sgb25saW5lLCB0aGlzIGVuc3VyZXMgbWluaW11bSBkb3dudGltZVxuICAgICAgICAgIC8vIGNvbnN0IHsgaXNDb25uZWN0ZWQgfSA9IGF3YWl0IGdldE5ldHdvcmtTdGF0dXMoKVxuICAgICAgICAgIGNvbnN0IGlzQ29ubmVjdGVkID0gdHJ1ZVxuXG4gICAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXG4gICAgICAgICAgLy8gICAnW3JlYWx0aW1lXSBpbml0V2ViU29ja2V0Q29ubmVjdGlvbiB3YWl0aW5nIGZvciBuZXR3b3JrIG9ubGluZSdcbiAgICAgICAgICAvLyApXG4gICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgLy8gYXV0byB3YWl0IHVudGlsIG5ldHdvcmsgb25saW5lLCBjYXVzZScgaXQgd291bGQgYmUgbWVhbmluZ2xlc3MgdG8gcmVjb25uZWN0IHdoaWxlIG5ldHdvcmsgaXMgb2ZmbGluZVxuXG4gICAgICAgICAgLy8gYXdhaXQgb25jZU5ldHdvcmtPbmxpbmUoKVxuXG4gICAgICAgICAgLy8gQ09NUEFUSUJJTElUWTogd2FpdCBmb3IgaWRlIHN0YXRlIHVwZGF0ZVxuICAgICAgICAgIC8vIGlmIChpc0RldlRvb2xzKCkpIHtcbiAgICAgICAgICAvLyAgIGF3YWl0IHNsZWVwKDApXG4gICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ1tyZWFsdGltZV0gaW5pdFdlYlNvY2tldENvbm5lY3Rpb24gbmV0d29yayBvbmxpbmUnKVxuICAgICAgICAgIC8vIH1cblxuICAgICAgICAgIHRoaXMuX3dzSW5pdFByb21pc2UgPSB1bmRlZmluZWRcblxuICAgICAgICAgIGlmIChpc0Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIC8vICAgYFtyZWFsdGltZV0gaW5pdFdlYlNvY2tldENvbm5lY3Rpb24gc2xlZXAgJHt0aGlzLl9yZWNvbm5lY3RJbnRlcnZhbH1tc2BcbiAgICAgICAgICAgIC8vIClcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGF3YWl0IHNsZWVwKHRoaXMuX3JlY29ubmVjdEludGVydmFsKVxuICAgICAgICAgICAgaWYgKHJlY29ubmVjdCkge1xuICAgICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RTdGF0ZSA9IGZhbHNlIC8vIOmHjei/nuW8guW4uOS5n+eul+mHjei/nueKtuaAgee7k+adn1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlc29sdmUodGhpcy5pbml0V2ViU29ja2V0Q29ubmVjdGlvbihyZWNvbm5lY3QsIGF2YWlsYWJsZVJldHJpZXMgLSAxKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QoZSlcblxuICAgICAgICAgIGlmIChyZWNvbm5lY3QpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VBbGxDbGllbnRzKFxuICAgICAgICAgICAgICBuZXcgQ2xvdWRTREtFcnJvcih7XG4gICAgICAgICAgICAgICAgZXJyQ29kZTogRVJSX0NPREUuU0RLX0RBVEFCQVNFX1JFQUxUSU1FX0xJU1RFTkVSX1JFQ09OTkVDVF9XQVRDSF9GQUlMIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICBlcnJNc2c6IGVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gbGV0IHN1Y2Nlc3MgPSBmYWxzZVxuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuX3dzSW5pdFByb21pc2VcbiAgICAgIC8vIHN1Y2Nlc3MgPSB0cnVlXG4gICAgICB0aGlzLl93c1JlYWR5U3Vic3JpYmVycy5mb3JFYWNoKCh7IHJlc29sdmUgfSkgPT4gcmVzb2x2ZSgpKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuX3dzUmVhZHlTdWJzcmliZXJzLmZvckVhY2goKHsgcmVqZWN0IH0pID0+IHJlamVjdCgpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLl93c0luaXRQcm9taXNlID0gdW5kZWZpbmVkXG4gICAgICB0aGlzLl93c1JlYWR5U3Vic3JpYmVycyA9IFtdXG4gICAgfVxuXG4gICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgLy8gY29uc29sZS5sb2coXG4gICAgLy8gICBgW3JlYWx0aW1lXSBpbml0V2ViU29ja2V0Q29ubmVjdGlvbiAke3N1Y2Nlc3MgPyAnc3VjY2VzcycgOiAnZmFpbCd9YFxuICAgIC8vIClcbiAgICAvLyB9XG4gIH1cblxuICBwcml2YXRlIGluaXRXZWJTb2NrZXRFdmVudCA9ICgpID0+XG4gICAgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLl93cykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbiBub3QgaW5pdFdlYlNvY2tldEV2ZW50LCB3cyBub3QgZXhpc3RzJylcbiAgICAgIH1cblxuICAgICAgbGV0IHdzT3BlbmVkID0gZmFsc2VcblxuICAgICAgdGhpcy5fd3Mub25vcGVuID0gZXZlbnQgPT4ge1xuICAgICAgICAvLyB0aGlzLl93cy5vbk9wZW4oKCkgPT4ge1xuICAgICAgICAvLyB0aGlzLl93cy5vbihcIm9wZW5cIiwgKCkgPT4ge1xuICAgICAgICAvLyB0aGlzLl9jb250ZXh0LmRlYnVnICYmXG4gICAgICAgIGNvbnNvbGUud2FybignW3JlYWx0aW1lXSB3cyBldmVudDogb3BlbicsIGV2ZW50KVxuICAgICAgICB3c09wZW5lZCA9IHRydWVcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3dzLm9uZXJyb3IgPSBldmVudCA9PiB7XG4gICAgICAgIC8vIHRoaXMuX3dzLm9uKFwiZXJyb3JcIiwgZXJyb3IgPT4ge1xuICAgICAgICAvLyB0aGlzLl93cy5vbkVycm9yKGVycm9yID0+IHtcbiAgICAgICAgLy8gYWxsIGxvZ2lucyBhcmUgaW52YWxpZCBhZnRlciBkaXNjb25uZWN0aW9uXG4gICAgICAgIHRoaXMuX2xvZ2lucyA9IG5ldyBNYXAoKVxuXG4gICAgICAgIC8vIGVycm9y5YaZ6L+bZmlsZVxuXG4gICAgICAgIGlmICghd3NPcGVuZWQpIHtcbiAgICAgICAgICAvLyB0aGlzLl9jb250ZXh0LmRlYnVnICYmXG4gICAgICAgICAgY29uc29sZS5lcnJvcignW3JlYWx0aW1lXSB3cyBvcGVuIGZhaWxlZCB3aXRoIHdzIGV2ZW50OiBlcnJvcicsIGV2ZW50KVxuICAgICAgICAgIC8vIHdyaXRlVG9GaWxlKFxuICAgICAgICAgIC8vICAgXCJ3c2Vycm9yLnR4dFwiLFxuICAgICAgICAgIC8vICAgYCR7XG4gICAgICAgICAgLy8gICAgIHRoaXMuc3BlY2lhbE51bWJlclxuICAgICAgICAgIC8vICAgfSBbcmVhbHRpbWVdIHdzIG9wZW4gZmFpbGVkIHdpdGggd3MgZXZlbnQ6IGVycm9yICR7ZXJyb3J9IFxcbmBcbiAgICAgICAgICAvLyApXG5cbiAgICAgICAgICByZWplY3QoZXZlbnQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gdGhpcy5fY29udGV4dC5kZWJ1ZyAmJlxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tyZWFsdGltZV0gd3MgZXZlbnQ6IGVycm9yJywgZXZlbnQpXG5cbiAgICAgICAgICAvLyB3cml0ZVRvRmlsZShcbiAgICAgICAgICAvLyAgIFwid3NlcnJvci50eHRcIixcbiAgICAgICAgICAvLyAgIGAke3RoaXMuc3BlY2lhbE51bWJlcn0gW3JlYWx0aW1lXSB3cyBldmVudDogZXJyb3IgJHtlcnJvcn0gXFxuYFxuICAgICAgICAgIC8vIClcblxuICAgICAgICAgIHRoaXMuY2xlYXJIZWFydGJlYXQoKVxuICAgICAgICAgIHRoaXMuX3ZpcnR1YWxXU0NsaWVudC5mb3JFYWNoKGNsaWVudCA9PlxuICAgICAgICAgICAgY2xpZW50LmNsb3NlV2l0aEVycm9yKFxuICAgICAgICAgICAgICBuZXcgQ2xvdWRTREtFcnJvcih7XG4gICAgICAgICAgICAgICAgZXJyQ29kZTogRVJSX0NPREUuU0RLX0RBVEFCQVNFX1JFQUxUSU1FX0xJU1RFTkVSX1dFQlNPQ0tFVF9DT05ORUNUSU9OX0VSUk9SIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICBlcnJNc2c6IGV2ZW50XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE86IHJlY29ubmVjdFxuICAgICAgdGhpcy5fd3Mub25jbG9zZSA9IGNsb3NlRXZlbnQgPT4ge1xuICAgICAgICAvLyB0aGlzLl93cy5vbihcImNsb3NlXCIsIChjbG9zZUV2ZW50LCBjbG9zZXJlYXNvbikgPT4ge1xuICAgICAgICAvLyB0aGlzLl93cy5vbkNsb3NlKGNsb3NlRXZlbnQgPT4ge1xuICAgICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdbcmVhbHRpbWVdIHdzIGV2ZW50OiBjbG9zZScsIGNsb3NlRXZlbnQpXG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyB3cml0ZVRvRmlsZShcbiAgICAgICAgLy8gICBcIndzY2xvc2UudHh0XCIsXG4gICAgICAgIC8vICAgYCR7XG4gICAgICAgIC8vICAgICB0aGlzLnNwZWNpYWxOdW1iZXJcbiAgICAgICAgLy8gICB9IFtyZWFsdGltZV0gd3MgZXZlbnQ6IGNsb3NlICR7Y2xvc2VFdmVudH0gJHtjbG9zZXJlYXNvbn0gXFxuYFxuICAgICAgICAvLyApXG5cbiAgICAgICAgLy8gYWxsIGxvZ2lucyBhcmUgaW52YWxpZCBhZnRlciBkaXNjb25uZWN0aW9uXG4gICAgICAgIHRoaXMuX2xvZ2lucyA9IG5ldyBNYXAoKVxuXG4gICAgICAgIHRoaXMuY2xlYXJIZWFydGJlYXQoKVxuICAgICAgICBzd2l0Y2ggKGNsb3NlRXZlbnQuY29kZSkge1xuICAgICAgICAgIGNhc2UgQ0xPU0VfRVZFTlRfQ09ERS5SZWNvbm5lY3RXZWJTb2NrZXQ6IHtcbiAgICAgICAgICAgIC8vIGp1c3QgaWdub3JlXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlIENMT1NFX0VWRU5UX0NPREUuTm9SZWFsdGltZUxpc3RlbmVyczoge1xuICAgICAgICAgICAgLy8gcXVpdFxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSBDTE9TRV9FVkVOVF9DT0RFLkhlYXJ0YmVhdFBpbmdFcnJvcjpcbiAgICAgICAgICBjYXNlIENMT1NFX0VWRU5UX0NPREUuSGVhcnRiZWF0UG9uZ1RpbWVvdXRFcnJvcjpcbiAgICAgICAgICBjYXNlIENMT1NFX0VWRU5UX0NPREUuTm9ybWFsQ2xvc3VyZTpcbiAgICAgICAgICBjYXNlIENMT1NFX0VWRU5UX0NPREUuQWJub3JtYWxDbG9zdXJlOiB7XG4gICAgICAgICAgICAvLyBOb3JtYWwgQ2xvc3VyZSBhbmQgQWJub3JtYWwgQ2xvc3VyZTpcbiAgICAgICAgICAgIC8vICAgZXhwZWN0ZWQgY2xvc3VyZSwgbW9zdCBsaWtlbHkgZGlzcGF0Y2hlZCBieSB3ZWNoYXQgY2xpZW50LFxuICAgICAgICAgICAgLy8gICBzaW5jZSB0aGlzIGlzIHRoZSBzdGF0dXMgY29kZSBkaXNwYXRjaGVkIGluIGNhc2Ugb2YgbmV0d29yayBmYWlsdXJlLFxuICAgICAgICAgICAgLy8gICB3ZSBzaG91bGQgcmV0cnlcblxuICAgICAgICAgICAgaWYgKHRoaXMuX21heFJlY29ubmVjdCA+IDApIHtcbiAgICAgICAgICAgICAgLy8gaWYgKHRoaXMuX2F2YWlsYWJsZVJldHJpZXMgPiAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuaW5pdFdlYlNvY2tldENvbm5lY3Rpb24odHJ1ZSwgdGhpcy5fbWF4UmVjb25uZWN0KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5jbG9zZUFsbENsaWVudHMoZ2V0V1NDbG9zZUVycm9yKGNsb3NlRXZlbnQuY29kZSkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlIENMT1NFX0VWRU5UX0NPREUuTm9BdXRoZW50aWNhdGlvbjoge1xuICAgICAgICAgICAgdGhpcy5jbG9zZUFsbENsaWVudHMoXG4gICAgICAgICAgICAgIGdldFdTQ2xvc2VFcnJvcihjbG9zZUV2ZW50LmNvZGUsIGNsb3NlRXZlbnQucmVhc29uKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgLy8gd2Ugc2hvdWxkIHJldHJ5IGJ5IGRlZmF1bHRcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXhSZWNvbm5lY3QgPiAwKSB7XG4gICAgICAgICAgICAgIC8vIGlmICh0aGlzLl9hdmFpbGFibGVSZXRyaWVzID4gMCkge1xuICAgICAgICAgICAgICB0aGlzLmluaXRXZWJTb2NrZXRDb25uZWN0aW9uKHRydWUsIHRoaXMuX21heFJlY29ubmVjdClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuY2xvc2VBbGxDbGllbnRzKGdldFdTQ2xvc2VFcnJvcihjbG9zZUV2ZW50LmNvZGUpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY29uc29sZS53YXJuKGBbcmVhbHRpbWVdIHVucmVjb2duaXplIHdzIGNsb3NlIGV2ZW50YCwgY2xvc2VFdmVudClcbiAgICAgICAgICAgIC8vIHRoaXMuY2xvc2VBbGxDbGllbnRzKGdldFdTQ2xvc2VFcnJvcihjbG9zZUV2ZW50LmNvZGUpKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl93cy5vbm1lc3NhZ2UgPSByZXMgPT4ge1xuICAgICAgICAvLyB0aGlzLl93cy5vbihcIm1lc3NhZ2VcIiwgcmVzID0+IHtcbiAgICAgICAgLy8gdGhpcy5fd3Mub25NZXNzYWdlKHJlcyA9PiB7XG4gICAgICAgIC8vIGNvbnN0IHJhd01zZyA9IHJlcy5kYXRhXG4gICAgICAgIGNvbnN0IHJhd01zZyA9IHJlcy5kYXRhXG5cbiAgICAgICAgLy8gcmVzZXQgJiByZXN0YXJ0IGhlYXJ0YmVhdFxuICAgICAgICB0aGlzLmhlYXJ0YmVhdCgpXG5cbiAgICAgICAgbGV0IG1zZzogSVJlc3BvbnNlTWVzc2FnZVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbXNnID0gSlNPTi5wYXJzZShyYXdNc2cgYXMgc3RyaW5nKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBbcmVhbHRpbWVdIG9uTWVzc2FnZSBwYXJzZSByZXMuZGF0YSBlcnJvcjogJHtlfWApXG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAgICAgLy8gICBgW3JlYWx0aW1lXSBvbk1lc3NhZ2UgJHtcbiAgICAgICAgLy8gICAgIG1zZy5tc2dUeXBlXG4gICAgICAgIC8vICAgfSAoJHtuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCl9KWAsXG4gICAgICAgIC8vICAgbXNnXG4gICAgICAgIC8vIClcblxuICAgICAgICBpZiAobXNnLm1zZ1R5cGUgPT09ICdFUlJPUicpIHtcbiAgICAgICAgICAvLyDmib7liLDlvZPliY3nm5HlkKzvvIzlubblsIZlcnJvcui/lOWbnlxuICAgICAgICAgIGxldCB2aXJ0dWFsV2F0Y2ggPSBudWxsXG4gICAgICAgICAgdGhpcy5fdmlydHVhbFdTQ2xpZW50LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS53YXRjaElkID09PSBtc2cud2F0Y2hJZCkge1xuICAgICAgICAgICAgICB2aXJ0dWFsV2F0Y2ggPSBpdGVtXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGlmICh2aXJ0dWFsV2F0Y2gpIHtcbiAgICAgICAgICAgIHZpcnR1YWxXYXRjaC5saXN0ZW5lci5vbkVycm9yKG1zZylcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNwb25zZVdhaXRTcGVjID0gdGhpcy5fd3NSZXNwb25zZVdhaXQuZ2V0KG1zZy5yZXF1ZXN0SWQpXG4gICAgICAgIGlmIChyZXNwb25zZVdhaXRTcGVjKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChtc2cubXNnVHlwZSA9PT0gJ0VSUk9SJykge1xuICAgICAgICAgICAgICByZXNwb25zZVdhaXRTcGVjLnJlamVjdChuZXcgUmVhbHRpbWVFcnJvck1lc3NhZ2VFcnJvcihtc2cpKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzcG9uc2VXYWl0U3BlYy5yZXNvbHZlKG1zZylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyB0aGlzLl9jb250ZXh0LmRlYnVnICYmXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAnd3Mgb25NZXNzYWdlIHJlc3BvbnNlV2FpdFNwZWMucmVzb2x2ZShtc2cpIGVycm9yZWQ6JyxcbiAgICAgICAgICAgICAgZVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLl93c1Jlc3BvbnNlV2FpdC5kZWxldGUobXNnLnJlcXVlc3RJZClcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3BvbnNlV2FpdFNwZWMuc2tpcE9uTWVzc2FnZSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1zZy5tc2dUeXBlID09PSAnUE9ORycpIHtcbiAgICAgICAgICBpZiAodGhpcy5fbGFzdFBpbmdTZW5kVFMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJ0dCA9IERhdGUubm93KCkgLSB0aGlzLl9sYXN0UGluZ1NlbmRUU1xuICAgICAgICAgICAgaWYgKHJ0dCA+IERFRkFVTFRfVU5UUlVTVEVEX1JUVF9USFJFU0hPTEQpIHtcbiAgICAgICAgICAgICAgLy8gdGhpcy5fY29udGV4dC5kZWJ1ZyAmJlxuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtyZWFsdGltZV0gdW50cnVzdGVkIHJ0dCBvYnNlcnZlZDogJHtydHR9YClcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fcnR0T2JzZXJ2ZWQubGVuZ3RoID49IE1BWF9SVFRfT0JTRVJWRUQpIHtcbiAgICAgICAgICAgICAgdGhpcy5fcnR0T2JzZXJ2ZWQuc3BsaWNlKFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgdGhpcy5fcnR0T2JzZXJ2ZWQubGVuZ3RoIC0gTUFYX1JUVF9PQlNFUlZFRCArIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcnR0T2JzZXJ2ZWQucHVzaChydHQpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNsaWVudCA9IG1zZy53YXRjaElkICYmIHRoaXMuX3dhdGNoSWRDbGllbnRNYXAuZ2V0KG1zZy53YXRjaElkKVxuICAgICAgICBpZiAoY2xpZW50KSB7XG4gICAgICAgICAgY2xpZW50Lm9uTWVzc2FnZShtc2cpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVE9ETywgdGhpcyBpcyBhIHRlbXBvcmFyeSBmaXggZG9uZSBmb3Igc2VydmVyXG4gICAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIGBbcmVhbHRpbWVdIG5vIHJlYWx0aW1lIGxpc3RlbmVyIGZvdW5kIHJlc3BvbnNpYmxlIGZvciB3YXRjaElkICR7bXNnLndhdGNoSWR9OiBgLFxuICAgICAgICAgICAgbXNnXG4gICAgICAgICAgKVxuICAgICAgICAgIC8vIH1cbiAgICAgICAgICBzd2l0Y2ggKG1zZy5tc2dUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdJTklUX0VWRU5UJzpcbiAgICAgICAgICAgIGNhc2UgJ05FWFRfRVZFTlQnOlxuICAgICAgICAgICAgY2FzZSAnQ0hFQ0tfRVZFTlQnOiB7XG4gICAgICAgICAgICAgIGNsaWVudCA9IHRoaXMuX3F1ZXJ5SWRDbGllbnRNYXAuZ2V0KG1zZy5tc2dEYXRhLnF1ZXJ5SUQpXG4gICAgICAgICAgICAgIGlmIChjbGllbnQpIHtcbiAgICAgICAgICAgICAgICBjbGllbnQub25NZXNzYWdlKG1zZylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IFssY2xpZW50XSBvZiBBcnJheS5mcm9tKHRoaXMuX3dhdGNoSWRDbGllbnRNYXAuZW50cmllcygpKSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd3YXRjaGlkKioqKionLCB3YXRjaElkKVxuICAgICAgICAgICAgICAgIGNsaWVudC5vbk1lc3NhZ2UobXNnKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5oZWFydGJlYXQoKVxuICAgIH0pXG5cbiAgcHJpdmF0ZSBpc1dTQ29ubmVjdGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMuX3dzICYmIHRoaXMuX3dzLnJlYWR5U3RhdGUgPT09IFdTX1JFQURZX1NUQVRFLk9QRU4pXG4gIH1cblxuICBwcml2YXRlIG9uY2VXU0Nvbm5lY3RlZCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAodGhpcy5pc1dTQ29ubmVjdGVkKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICh0aGlzLl93c0luaXRQcm9taXNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fd3NJbml0UHJvbWlzZVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLl93c1JlYWR5U3Vic3JpYmVycy5wdXNoKHtcbiAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgcmVqZWN0XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwcml2YXRlIHdlYkxvZ2luID0gYXN5bmMgKFxuICAgIGVudklkPzogc3RyaW5nLFxuICAgIHJlZnJlc2g/OiBib29sZWFuXG4gICk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgaWYgKCFyZWZyZXNoKSB7XG4gICAgICAvLyBsZXQgbG9naW5JbmZvID0gdGhpcy5fbG9naW5JbmZvXG4gICAgICBpZiAoZW52SWQpIHtcbiAgICAgICAgY29uc3QgbG9naW5JbmZvID0gdGhpcy5fbG9naW5zLmdldChlbnZJZClcbiAgICAgICAgaWYgKGxvZ2luSW5mbykge1xuICAgICAgICAgIGlmIChsb2dpbkluZm8ubG9nZ2VkSW4gJiYgbG9naW5JbmZvLmxvZ2luUmVzdWx0KSB7XG4gICAgICAgICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdbcmVhbHRpbWVdIGxvZ2luOiBhbHJlYWR5IGxvZ2dlZCBpbicpXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICByZXR1cm4gbG9naW5JbmZvLmxvZ2luUmVzdWx0XG4gICAgICAgICAgfSBlbHNlIGlmIChsb2dpbkluZm8ubG9nZ2luZ0luUHJvbWlzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGxvZ2luSW5mby5sb2dnaW5nSW5Qcm9taXNlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBlbXB0eUVudkxvZ2luSW5mbyA9IHRoaXMuX2xvZ2lucy5nZXQoJycpXG4gICAgICAgIGlmIChlbXB0eUVudkxvZ2luSW5mbz8ubG9nZ2luZ0luUHJvbWlzZSkge1xuICAgICAgICAgIHJldHVybiBlbXB0eUVudkxvZ2luSW5mby5sb2dnaW5nSW5Qcm9taXNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coJ1tyZWFsdGltZV0gbG9naW46IGxvZ2dpbmcgaW4nKVxuXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPElMb2dpblJlc3VsdD4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgdGhpcy5nZXRTaWduYXR1cmUoZW52SWQsIHJlZnJlc2gpXG5cbiAgICAgICAgY29uc3Qgd3NTaWduID0gYXdhaXQgdGhpcy5nZXRXc1NpZ24oKVxuXG4gICAgICAgIC8vIGNvbnN0IHd4VmVyc2lvbiA9IGdldFdYVmVyc2lvbigpXG4gICAgICAgIGNvbnN0IG1zZ0RhdGE6IElSZXF1ZXN0TWVzc2FnZUxvZ2luRGF0YSA9IHtcbiAgICAgICAgICBlbnZJZDogd3NTaWduLmVudklkIHx8ICcnLFxuICAgICAgICAgIGFjY2Vzc1Rva2VuOiAnJywgLy8g5bey5bqf5byD5a2X5q61XG4gICAgICAgICAgLy8gc2lnblN0cjogc2lnbmF0dXJlLnNpZ25TdHIsXG4gICAgICAgICAgLy8gc2VjcmV0VmVyc2lvbjogc2lnbmF0dXJlLnNlY3JldFZlcnNpb24sXG4gICAgICAgICAgcmVmZXJyZXI6ICd3ZWInLFxuICAgICAgICAgIHNka1ZlcnNpb246ICcnLFxuICAgICAgICAgIGRhdGFWZXJzaW9uOiAnJ1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxvZ2luTXNnOiBJUmVxdWVzdE1lc3NhZ2VMb2dpbk1zZyA9IHtcbiAgICAgICAgICB3YXRjaElkOiB1bmRlZmluZWQsXG4gICAgICAgICAgcmVxdWVzdElkOiBnZW5SZXF1ZXN0SWQoKSxcbiAgICAgICAgICBtc2dUeXBlOiAnTE9HSU4nLFxuICAgICAgICAgIG1zZ0RhdGEsXG4gICAgICAgICAgZXhNc2dEYXRhOiB7XG4gICAgICAgICAgICBydW50aW1lOiBnZXRSdW50aW1lKCksXG4gICAgICAgICAgICBzaWduU3RyOiB3c1NpZ24uc2lnblN0cixcbiAgICAgICAgICAgIHNlY3JldFZlcnNpb246IHdzU2lnbi5zZWNyZXRWZXJzaW9uXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxvZ2luUmVzTXNnID0gYXdhaXQgdGhpcy5zZW5kPElSZXNwb25zZU1lc3NhZ2VMb2dpblJlc01zZz4oe1xuICAgICAgICAgIG1zZzogbG9naW5Nc2csXG4gICAgICAgICAgd2FpdFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICAgIHNraXBPbk1lc3NhZ2U6IHRydWUsXG4gICAgICAgICAgdGltZW91dDogREVGQVVMVF9MT0dJTl9USU1FT1VUXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCFsb2dpblJlc01zZy5tc2dEYXRhLmNvZGUpIHtcbiAgICAgICAgICAvLyBsb2dpbiBzdWNjZXNzXG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICBlbnZJZDogd3NTaWduLmVudklkXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBsb2dpbiBmYWlsZWRcbiAgICAgICAgICByZWplY3QoXG4gICAgICAgICAgICBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGAke2xvZ2luUmVzTXNnLm1zZ0RhdGEuY29kZX0gJHtsb2dpblJlc01zZy5tc2dEYXRhLm1lc3NhZ2V9YFxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3QoZSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gbGV0IGxvZ2luSW5mbyA9IHRoaXMuX2xvZ2luSW5mb1xuICAgIGxldCBsb2dpbkluZm8gPSBlbnZJZCAmJiB0aGlzLl9sb2dpbnMuZ2V0KGVudklkKVxuXG4gICAgY29uc3QgbG9naW5TdGFydFRTID0gRGF0ZS5ub3coKVxuXG4gICAgaWYgKGxvZ2luSW5mbykge1xuICAgICAgbG9naW5JbmZvLmxvZ2dlZEluID0gZmFsc2VcbiAgICAgIGxvZ2luSW5mby5sb2dnaW5nSW5Qcm9taXNlID0gcHJvbWlzZVxuICAgICAgbG9naW5JbmZvLmxvZ2luU3RhcnRUUyA9IGxvZ2luU3RhcnRUU1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2dpbkluZm8gPSB7XG4gICAgICAgIGxvZ2dlZEluOiBmYWxzZSxcbiAgICAgICAgbG9nZ2luZ0luUHJvbWlzZTogcHJvbWlzZSxcbiAgICAgICAgbG9naW5TdGFydFRTXG4gICAgICB9XG4gICAgICAvLyB0aGlzLl9sb2dpbkluZm8gPSBsb2dpbkluZm9cbiAgICAgIHRoaXMuX2xvZ2lucy5zZXQoZW52SWQgfHwgJycsIGxvZ2luSW5mbylcbiAgICB9XG5cbiAgICAvLyB0cnkge1xuICAgIC8vICAgY29uc3QgbG9naW5SZXN1bHQgPSBhd2FpdCBwcm9taXNlXG4gICAgLy8gICBsb2dpbkluZm8ubG9nZ2VkSW4gPSB0cnVlXG4gICAgLy8gICBsb2dpbkluZm8ubG9nZ2luZ0luUHJvbWlzZSA9IHVuZGVmaW5lZFxuICAgIC8vICAgbG9naW5JbmZvLmxvZ2luU3RhcnRUUyA9IHVuZGVmaW5lZFxuICAgIC8vICAgbG9naW5JbmZvLmxvZ2luUmVzdWx0ID0gbG9naW5SZXN1bHRcbiAgICAvLyAgIHJldHVybiBsb2dpblJlc3VsdFxuICAgIC8vIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyAgIGxvZ2luSW5mby5sb2dnZWRJbiA9IGZhbHNlXG4gICAgLy8gICBsb2dpbkluZm8ubG9nZ2luZ0luUHJvbWlzZSA9IHVuZGVmaW5lZFxuICAgIC8vICAgbG9naW5JbmZvLmxvZ2luU3RhcnRUUyA9IHVuZGVmaW5lZFxuICAgIC8vICAgbG9naW5JbmZvLmxvZ2luUmVzdWx0ID0gdW5kZWZpbmVkXG4gICAgLy8gICB0aHJvdyBlXG4gICAgLy8gfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGxvZ2luUmVzdWx0ID0gYXdhaXQgcHJvbWlzZVxuICAgICAgY29uc3QgY3VyTG9naW5JbmZvID0gZW52SWQgJiYgdGhpcy5fbG9naW5zLmdldChlbnZJZClcbiAgICAgIGlmIChcbiAgICAgICAgY3VyTG9naW5JbmZvICYmXG4gICAgICAgIGN1ckxvZ2luSW5mbyA9PT0gbG9naW5JbmZvICYmXG4gICAgICAgIGN1ckxvZ2luSW5mby5sb2dpblN0YXJ0VFMgPT09IGxvZ2luU3RhcnRUU1xuICAgICAgKSB7XG4gICAgICAgIGxvZ2luSW5mby5sb2dnZWRJbiA9IHRydWVcbiAgICAgICAgbG9naW5JbmZvLmxvZ2dpbmdJblByb21pc2UgPSB1bmRlZmluZWRcbiAgICAgICAgbG9naW5JbmZvLmxvZ2luU3RhcnRUUyA9IHVuZGVmaW5lZFxuICAgICAgICBsb2dpbkluZm8ubG9naW5SZXN1bHQgPSBsb2dpblJlc3VsdFxuICAgICAgICByZXR1cm4gbG9naW5SZXN1bHRcbiAgICAgIH0gZWxzZSBpZiAoY3VyTG9naW5JbmZvKSB7XG4gICAgICAgIGlmIChjdXJMb2dpbkluZm8ubG9nZ2VkSW4gJiYgY3VyTG9naW5JbmZvLmxvZ2luUmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIGN1ckxvZ2luSW5mby5sb2dpblJlc3VsdFxuICAgICAgICB9IGVsc2UgaWYgKGN1ckxvZ2luSW5mby5sb2dnaW5nSW5Qcm9taXNlKSB7XG4gICAgICAgICAgcmV0dXJuIGN1ckxvZ2luSW5mby5sb2dnaW5nSW5Qcm9taXNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd3cyB1bmV4cGVjdGVkIGxvZ2luIGluZm8nKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3dzIGxvZ2luIGluZm8gcmVzZXQnKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZ2luSW5mby5sb2dnZWRJbiA9IGZhbHNlXG4gICAgICBsb2dpbkluZm8ubG9nZ2luZ0luUHJvbWlzZSA9IHVuZGVmaW5lZFxuICAgICAgbG9naW5JbmZvLmxvZ2luU3RhcnRUUyA9IHVuZGVmaW5lZFxuICAgICAgbG9naW5JbmZvLmxvZ2luUmVzdWx0ID0gdW5kZWZpbmVkXG4gICAgICB0aHJvdyBlXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRXc1NpZ24gPSBhc3luYyAoKTogUHJvbWlzZTxJV3NTaWduPiA9PiB7XG4gICAgaWYgKHRoaXMuX3dzU2lnbiAmJiB0aGlzLl93c1NpZ24uZXhwaXJlZFRzID4gRGF0ZS5ub3coKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3dzU2lnblxuICAgIH1cbiAgICBjb25zdCBleHBpcmVkVHMgPSBEYXRlLm5vdygpICsgNjAwMDBcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9jb250ZXh0LmFwcENvbmZpZy5yZXF1ZXN0LnNlbmQoJ2F1dGgud3NXZWJTaWduJywge3J1bnRpbWU6IGdldFJ1bnRpbWUoKX0pXG5cbiAgICBpZiAocmVzLmNvZGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgW3RjYi1qcy1zZGtdIOiOt+WPluWunuaXtuaVsOaNruaOqOmAgeeZu+W9leelqOaNruWksei0pTogJHtyZXMuY29kZX1gKVxuICAgIH1cblxuICAgIGlmIChyZXMuZGF0YSkge1xuICAgICAgY29uc3Qge3NpZ25TdHIsIHdzVXJsLCBzZWNyZXRWZXJzaW9uLCBlbnZJZH0gPSByZXMuZGF0YVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2lnblN0cixcbiAgICAgICAgd3NVcmwsXG4gICAgICAgIHNlY3JldFZlcnNpb24sXG4gICAgICAgIGVudklkLFxuICAgICAgICBleHBpcmVkVHNcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbdGNiLWpzLXNka10g6I635Y+W5a6e5pe25pWw5o2u5o6o6YCB55m75b2V56Wo5o2u5aSx6LSlJylcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFdhaXRFeHBlY3RlZFRpbWVvdXRMZW5ndGggPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLl9ydHRPYnNlcnZlZC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBERUZBVUxUX0VYUEVDVEVEX0VWRU5UX1dBSVRfVElNRVxuICAgIH1cblxuICAgIC8vIDEuNSAqIFJUVFxuICAgIHJldHVybiAoXG4gICAgICAodGhpcy5fcnR0T2JzZXJ2ZWQucmVkdWNlKChhY2MsIGN1cikgPT4gYWNjICsgY3VyKSAvXG4gICAgICAgIHRoaXMuX3J0dE9ic2VydmVkLmxlbmd0aCkgKlxuICAgICAgMS41XG4gICAgKVxuICB9XG5cbiAgcHJpdmF0ZSBoZWFydGJlYXQoaW1tZWRpYXRlPzogYm9vbGVhbikge1xuICAgIHRoaXMuY2xlYXJIZWFydGJlYXQoKVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLl9waW5nVGltZW91dElkID0gc2V0VGltZW91dChcbiAgICAgIGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIXRoaXMuX3dzIHx8IHRoaXMuX3dzLnJlYWR5U3RhdGUgIT09IFdTX1JFQURZX1NUQVRFLk9QRU4pIHtcbiAgICAgICAgICAgIC8vIG5vIG5lZWQgdG8gcGluZ1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fbGFzdFBpbmdTZW5kVFMgPSBEYXRlLm5vdygpXG4gICAgICAgICAgYXdhaXQgdGhpcy5waW5nKClcbiAgICAgICAgICB0aGlzLl9waW5nRmFpbGVkID0gMFxuXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHRoaXMuX3BvbmdUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3BvbmcgdGltZWQgb3V0JylcbiAgICAgICAgICAgIGlmICh0aGlzLl9wb25nTWlzc2VkIDwgREVGQVVMVF9QT05HX01JU1NfVE9MRVJBTkNFKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3BvbmdNaXNzZWQrK1xuICAgICAgICAgICAgICB0aGlzLmhlYXJ0YmVhdCh0cnVlKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gbG9naWNhbCBwZXJjZWl2ZWQgY29ubmVjdGlvbiBsb3N0LCBldmVuIHRob3VnaCB3ZWJzb2NrZXQgZGlkIG5vdCByZWNlaXZlIGVycm9yIG9yIGNsb3NlIGV2ZW50XG4gICAgICAgICAgICAgIHRoaXMuaW5pdFdlYlNvY2tldENvbm5lY3Rpb24odHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCB0aGlzLl9jb250ZXh0LmFwcENvbmZpZy5yZWFsdGltZVBvbmdXYWl0VGltZW91dClcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmICh0aGlzLl9waW5nRmFpbGVkIDwgREVGQVVMVF9QSU5HX0ZBSUxfVE9MRVJBTkNFKSB7XG4gICAgICAgICAgICB0aGlzLl9waW5nRmFpbGVkKytcbiAgICAgICAgICAgIHRoaXMuaGVhcnRiZWF0KClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbG9zZShDTE9TRV9FVkVOVF9DT0RFLkhlYXJ0YmVhdFBpbmdFcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpbW1lZGlhdGUgPyAwIDogdGhpcy5fY29udGV4dC5hcHBDb25maWcucmVhbHRpbWVQaW5nSW50ZXJ2YWxcbiAgICApXG4gIH1cblxuICBwcml2YXRlIHBpbmcgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgbXNnOiBJUmVxdWVzdE1lc3NhZ2VQaW5nTXNnID0ge1xuICAgICAgd2F0Y2hJZDogdW5kZWZpbmVkLFxuICAgICAgcmVxdWVzdElkOiBnZW5SZXF1ZXN0SWQoKSxcbiAgICAgIG1zZ1R5cGU6ICdQSU5HJyxcbiAgICAgIG1zZ0RhdGE6IG51bGxcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5zZW5kKHtcbiAgICAgIG1zZ1xuICAgIH0pXG4gICAgLy8gY29uc29sZS5sb2coJ3Bpbmcgc2VudCcpXG4gIH1cblxuICBwcml2YXRlIG9uV2F0Y2hTdGFydCA9IChjbGllbnQ6IFZpcnR1YWxXZWJTb2NrZXRDbGllbnQsIHF1ZXJ5SUQ6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuX3F1ZXJ5SWRDbGllbnRNYXAuc2V0KHF1ZXJ5SUQsIGNsaWVudClcbiAgfVxuXG4gIHByaXZhdGUgb25XYXRjaENsb3NlID0gKGNsaWVudDogVmlydHVhbFdlYlNvY2tldENsaWVudCwgcXVlcnlJRDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKHF1ZXJ5SUQpIHtcbiAgICAgIHRoaXMuX3F1ZXJ5SWRDbGllbnRNYXAuZGVsZXRlKHF1ZXJ5SUQpXG4gICAgfVxuICAgIHRoaXMuX3dhdGNoSWRDbGllbnRNYXAuZGVsZXRlKGNsaWVudC53YXRjaElkKVxuICAgIHRoaXMuX3ZpcnR1YWxXU0NsaWVudC5kZWxldGUoY2xpZW50KVxuXG4gICAgaWYgKCF0aGlzLl92aXJ0dWFsV1NDbGllbnQuc2l6ZSkge1xuICAgICAgLy8gbm8gbW9yZSBleGlzdGluZyB3YXRjaCwgd2Ugc2hvdWxkIHJlbGVhc2UgdGhlIHdlYnNvY2tldCBjb25uZWN0aW9uXG4gICAgICB0aGlzLmNsb3NlKENMT1NFX0VWRU5UX0NPREUuTm9SZWFsdGltZUxpc3RlbmVycylcbiAgICB9XG4gIH1cbn1cbiJdfQ==