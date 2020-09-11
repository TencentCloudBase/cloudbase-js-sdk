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
import { VirtualWebSocketClient } from './virtual-websocket-client';
import { genRequestId } from './message';
import { CLOSE_EVENT_CODE, CLOSE_EVENT_CODE_INFO, getWSCloseError } from './ws-event';
import { ERR_CODE, TimeoutError, RealtimeErrorMessageError, CloudSDKError } from './error';
import { getWsClass, getRuntime } from './common';
import { sleep } from './utils';
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
                                                        return [4, sleep(0)];
                                                    case 1:
                                                        _a.sent();
                                                        if (!_hasResolved || !_hasRejected) {
                                                            reject(new TimeoutError('wsclient.send timedout'));
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
                            this.close(CLOSE_EVENT_CODE.ReconnectWebSocket);
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
                                                    var wsClass = getWsClass();
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
                                            return [4, sleep(this._reconnectInterval)];
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
                                                this.closeAllClients(new CloudSDKError({
                                                    errCode: ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_RECONNECT_WATCH_FAIL,
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
                            return client.closeWithError(new CloudSDKError({
                                errCode: ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_WEBSOCKET_CONNECTION_ERROR,
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
                        case CLOSE_EVENT_CODE.ReconnectWebSocket: {
                            break;
                        }
                        case CLOSE_EVENT_CODE.NoRealtimeListeners: {
                            break;
                        }
                        case CLOSE_EVENT_CODE.HeartbeatPingError:
                        case CLOSE_EVENT_CODE.HeartbeatPongTimeoutError:
                        case CLOSE_EVENT_CODE.NormalClosure:
                        case CLOSE_EVENT_CODE.AbnormalClosure: {
                            if (_this._maxReconnect > 0) {
                                _this.initWebSocketConnection(true, _this._maxReconnect);
                            }
                            else {
                                _this.closeAllClients(getWSCloseError(closeEvent.code));
                            }
                            break;
                        }
                        case CLOSE_EVENT_CODE.NoAuthentication: {
                            _this.closeAllClients(getWSCloseError(closeEvent.code, closeEvent.reason));
                            break;
                        }
                        default: {
                            if (_this._maxReconnect > 0) {
                                _this.initWebSocketConnection(true, _this._maxReconnect);
                            }
                            else {
                                _this.closeAllClients(getWSCloseError(closeEvent.code));
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
                                responseWaitSpec.reject(new RealtimeErrorMessageError(msg));
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
                                            requestId: genRequestId(),
                                            msgType: 'LOGIN',
                                            msgData: msgData,
                                            exMsgData: {
                                                runtime: getRuntime(),
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
                        return [4, this._context.appConfig.request.send('auth.wsWebSign', { runtime: getRuntime() })];
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
                            requestId: genRequestId(),
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
                _this.close(CLOSE_EVENT_CODE.NoRealtimeListeners);
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
            this._ws.close(code, CLOSE_EVENT_CODE_INFO[code].name);
            this._ws = undefined;
        }
    };
    RealtimeWebSocketClient.prototype.watch = function (options) {
        if (!this._ws && !this._wsInitPromise) {
            this.initWebSocketConnection(false);
        }
        var virtualClient = new VirtualWebSocketClient(__assign(__assign({}, options), { send: this.send, login: this.webLogin, isWSConnected: this.isWSConnected, onceWSConnected: this.onceWSConnected, getWaitExpectedTimeoutLength: this.getWaitExpectedTimeoutLength, onWatchStart: this.onWatchStart, onWatchClose: this.onWatchClose, debug: true }));
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
                            this.close(CLOSE_EVENT_CODE.HeartbeatPingError);
                        }
                        return [3, 3];
                    case 3: return [2];
                }
            });
        }); }, immediate ? 0 : this._context.appConfig.realtimePingInterval);
    };
    return RealtimeWebSocketClient;
}());
export { RealtimeWebSocketClient };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LWNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJzb2NrZXQtY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDbkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFdBQVcsQ0FBQTtBQWN4QyxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLHFCQUFxQixFQUNyQixlQUFlLEVBQ2hCLE1BQU0sWUFBWSxDQUFBO0FBRW5CLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLHlCQUF5QixFQUFDLGFBQWEsRUFBRSxNQUFNLFNBQVMsQ0FBQTtBQUN6RixPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUNqRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBNEQvQixJQUFNLGNBQWMsR0FBRztJQUNyQixVQUFVLEVBQUUsQ0FBQztJQUNiLElBQUksRUFBRSxDQUFDO0lBQ1AsT0FBTyxFQUFFLENBQUM7SUFDVixNQUFNLEVBQUUsQ0FBQztDQUNWLENBQUE7QUFFRCxJQUFNLGdCQUFnQixHQUFHLENBQUMsQ0FBQTtBQUMxQixJQUFNLGdDQUFnQyxHQUFHLElBQUksQ0FBQTtBQUM3QyxJQUFNLCtCQUErQixHQUFHLEtBQUssQ0FBQTtBQUM3QyxJQUFNLHFCQUFxQixHQUFHLENBQUMsQ0FBQTtBQUMvQixJQUFNLDZCQUE2QixHQUFHLEtBQUssQ0FBQTtBQUUzQyxJQUFNLDJCQUEyQixHQUFHLENBQUMsQ0FBQTtBQUNyQyxJQUFNLDJCQUEyQixHQUFHLENBQUMsQ0FBQTtBQUNyQyxJQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQTtBQUVsQztJQStCRSxpQ0FBWSxPQUFtRDtRQUEvRCxpQkFN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QUFFLENBQUE7d0JBQ2pDLFdBQU0sSUFBSSxDQUFDLElBQUksRUFBRSxFQUFBOzt3QkFBakIsU0FBaUIsQ0FBQTt3QkFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUE7d0JBR3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDOzRCQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUE7NEJBQy9CLElBQUksS0FBSSxDQUFDLFdBQVcsR0FBRywyQkFBMkIsRUFBRTtnQ0FDbEQsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO2dDQUNsQixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBOzZCQUNyQjtpQ0FBTTtnQ0FFTCxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUE7NkJBQ25DO3dCQUNILENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBOzs7O3dCQUVuRCxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsMkJBQTJCLEVBQUU7NEJBQ2xELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTs0QkFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO3lCQUNqQjs2QkFBTTs0QkFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUE7eUJBQ2hEOzs7OzthQUVKLEVBQ0QsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUM3RCxDQUFBO0lBQ0gsQ0FBQztJQStCSCw4QkFBQztBQUFELENBQUMsQUEzM0JELElBMjNCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpcnR1YWxXZWJTb2NrZXRDbGllbnQgfSBmcm9tICcuL3ZpcnR1YWwtd2Vic29ja2V0LWNsaWVudCdcbmltcG9ydCB7IGdlblJlcXVlc3RJZCB9IGZyb20gJy4vbWVzc2FnZSdcbmltcG9ydCB7XG4gIElEYXRhYmFzZVNlcnZpY2VDb250ZXh0LFxufSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2RhdGFiYXNlJ1xuaW1wb3J0IHtcbiAgSVdhdGNoT3B0aW9ucyxcbiAgREJSZWFsdGltZUxpc3RlbmVyLFxuICBJUmVxdWVzdE1lc3NhZ2UsXG4gIElSZXNwb25zZU1lc3NhZ2UsXG4gIElSZXF1ZXN0TWVzc2FnZVBpbmdNc2csXG4gIElSZXF1ZXN0TWVzc2FnZUxvZ2luTXNnLFxuICBJUmVzcG9uc2VNZXNzYWdlTG9naW5SZXNNc2csXG4gIElSZXF1ZXN0TWVzc2FnZUxvZ2luRGF0YVxufSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL3JlYWx0aW1lJ1xuaW1wb3J0IHtcbiAgQ0xPU0VfRVZFTlRfQ09ERSxcbiAgQ0xPU0VfRVZFTlRfQ09ERV9JTkZPLFxuICBnZXRXU0Nsb3NlRXJyb3Jcbn0gZnJvbSAnLi93cy1ldmVudCdcblxuaW1wb3J0IHsgRVJSX0NPREUsIFRpbWVvdXRFcnJvciwgUmVhbHRpbWVFcnJvck1lc3NhZ2VFcnJvcixDbG91ZFNES0Vycm9yIH0gZnJvbSAnLi9lcnJvcidcbmltcG9ydCB7IGdldFdzQ2xhc3MsIGdldFJ1bnRpbWUgfSBmcm9tICcuL2NvbW1vbidcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IGludGVyZmFjZSBJUmVhbHRpbWVXZWJTb2NrZXRDbGllbnRDb25zdHJ1Y3Rvck9wdGlvbnMge1xuICBtYXhSZWNvbm5lY3Q/OiBudW1iZXJcbiAgcmVjb25uZWN0SW50ZXJ2YWw/OiBudW1iZXJcbiAgY29udGV4dDogSURhdGFiYXNlU2VydmljZUNvbnRleHRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU2lnbmF0dXJlIHtcbiAgZW52SWQ6IHN0cmluZ1xuICBzZWNyZXRWZXJzaW9uOiBudW1iZXJcbiAgc2lnblN0cjogc3RyaW5nXG4gIHdzVXJsOiBzdHJpbmdcbiAgZXhwaXJlVFM6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElMb2dpbkluZm8ge1xuICBsb2dnZWRJbjogYm9vbGVhblxuICBsb2dnaW5nSW5Qcm9taXNlPzogUHJvbWlzZTxJTG9naW5SZXN1bHQ+XG4gIGxvZ2luU3RhcnRUUz86IG51bWJlclxuICBsb2dpblJlc3VsdD86IElMb2dpblJlc3VsdFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElMb2dpblJlc3VsdCB7XG4gIGVudklkOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJV1NTZW5kT3B0aW9ucyB7XG4gIG1zZzogSVJlcXVlc3RNZXNzYWdlXG4gIHdhaXRSZXNwb25zZT86IGJvb2xlYW5cbiAgLy8gd2hlbiB3YWl0UmVzcG9uc2UgaXMgc2V0IHRvIHRydWUsIGlmIHNraXBPbk1lc3NhZ2UgaXMgdHJ1ZSwgZ2VuZXJhbCBvbk1lc3NhZ2UgaGFuZGxlciB3aWxsIGJlIHNraXBwZWRcbiAgc2tpcE9uTWVzc2FnZT86IGJvb2xlYW5cbiAgdGltZW91dD86IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElXU1dhdGNoT3B0aW9ucyBleHRlbmRzIElXYXRjaE9wdGlvbnMge1xuICBlbnZJZD86IHN0cmluZ1xuICBjb2xsZWN0aW9uTmFtZTogc3RyaW5nXG4gIHF1ZXJ5OiBzdHJpbmdcbiAgbGltaXQ/OiBudW1iZXJcbiAgb3JkZXJCeT86IFJlY29yZDxzdHJpbmcsIHN0cmluZz5cbn1cblxuaW50ZXJmYWNlIElSZXNvbHZlUmVqZWN0IHtcbiAgcmVzb2x2ZTogKHZhbHVlPzogYW55IHwgUHJvbWlzZUxpa2U8YW55PiB8IHVuZGVmaW5lZCkgPT4gdm9pZFxuICByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWRcbn1cblxuaW50ZXJmYWNlIElSZXNwb25zZVdhaXRTcGVjIGV4dGVuZHMgSVJlc29sdmVSZWplY3Qge1xuICBza2lwT25NZXNzYWdlPzogYm9vbGVhblxufVxuXG5pbnRlcmZhY2UgSVdzU2lnbiB7XG4gIHNpZ25TdHI6IHN0cmluZyxcbiAgd3NVcmw6IHN0cmluZyxcbiAgc2VjcmV0VmVyc2lvbjogc3RyaW5nXG4gIGVudklkOiBzdHJpbmdcbiAgZXhwaXJlZFRzOiBudW1iZXJcbn1cblxuY29uc3QgV1NfUkVBRFlfU1RBVEUgPSB7XG4gIENPTk5FQ1RJTkc6IDAsXG4gIE9QRU46IDEsXG4gIENMT1NJTkc6IDIsXG4gIENMT1NFRDogM1xufVxuXG5jb25zdCBNQVhfUlRUX09CU0VSVkVEID0gM1xuY29uc3QgREVGQVVMVF9FWFBFQ1RFRF9FVkVOVF9XQUlUX1RJTUUgPSA1MDAwXG5jb25zdCBERUZBVUxUX1VOVFJVU1RFRF9SVFRfVEhSRVNIT0xEID0gMTAwMDBcbmNvbnN0IERFRkFVTFRfTUFYX1JFQ09OTkVDVCA9IDVcbmNvbnN0IERFRkFVTFRfV1NfUkVDT05ORUNUX0lOVEVSVkFMID0gMTAwMDBcbi8vIGNvbnN0IERFRkFVTFRfV1NfUkVDT05ORUNUX01BWF9WQUxJRF9JTlRFUlZBTCA9IDMgKiA2MCAqIDEwMDBcbmNvbnN0IERFRkFVTFRfUElOR19GQUlMX1RPTEVSQU5DRSA9IDJcbmNvbnN0IERFRkFVTFRfUE9OR19NSVNTX1RPTEVSQU5DRSA9IDJcbmNvbnN0IERFRkFVTFRfTE9HSU5fVElNRU9VVCA9IDUwMDBcblxuZXhwb3J0IGNsYXNzIFJlYWx0aW1lV2ViU29ja2V0Q2xpZW50IHtcbiAgcHJpdmF0ZSBfdmlydHVhbFdTQ2xpZW50OiBTZXQ8VmlydHVhbFdlYlNvY2tldENsaWVudD4gPSBuZXcgU2V0KClcbiAgLy8gYWZ0ZXIgbGlzdGVuZXIgaW5pdFdhdGNoLCB0aGUgbGlzdGVuZXIgaGFzIHRoZSBxdWVyeUlEIGFuZCBjYW4gc3RvcmUgaXQgaGVyZVxuICBwcml2YXRlIF9xdWVyeUlkQ2xpZW50TWFwOiBNYXA8c3RyaW5nLCBWaXJ0dWFsV2ViU29ja2V0Q2xpZW50PiA9IG5ldyBNYXAoKVxuICBwcml2YXRlIF93YXRjaElkQ2xpZW50TWFwOiBNYXA8c3RyaW5nLCBWaXJ0dWFsV2ViU29ja2V0Q2xpZW50PiA9IG5ldyBNYXAoKVxuICBwcml2YXRlIF9tYXhSZWNvbm5lY3Q6IG51bWJlclxuICAvLyBwcml2YXRlIF9hdmFpbGFibGVSZXRyaWVzOiBudW1iZXJcbiAgcHJpdmF0ZSBfcmVjb25uZWN0SW50ZXJ2YWw6IG51bWJlclxuICBwcml2YXRlIF9jb250ZXh0OiBJRGF0YWJhc2VTZXJ2aWNlQ29udGV4dFxuICAvLyBwcml2YXRlIF93cz86IFdYTlMuU29ja2V0LklTb2NrZXRUYXNrXG4gIHByaXZhdGUgX3dzPzogYW55XG4gIHByaXZhdGUgX2xhc3RQaW5nU2VuZFRTPzogbnVtYmVyXG4gIHByaXZhdGUgX3BpbmdGYWlsZWQgPSAwXG4gIHByaXZhdGUgX3BvbmdNaXNzZWQgPSAwXG4gIHByaXZhdGUgX3BpbmdUaW1lb3V0SWQ/OiBudW1iZXJcbiAgcHJpdmF0ZSBfcG9uZ1RpbWVvdXRJZD86IG51bWJlclxuICBwcml2YXRlIF9sb2dpbnM6IE1hcDxzdHJpbmcgLyogZW52SWQgKi8sIElMb2dpbkluZm8+ID0gbmV3IE1hcCgpXG4gIC8vIHByaXZhdGUgX2xvZ2luSW5mbzogSUxvZ2luSW5mb1xuICAvLyBwcml2YXRlIF9zaWduYXR1cmVzOiBNYXA8c3RyaW5nIC8qIGVudklkICovLCBJU2lnbmF0dXJlPiA9IG5ldyBNYXAoKVxuICBwcml2YXRlIF93c0luaXRQcm9taXNlPzogUHJvbWlzZTx2b2lkPlxuICBwcml2YXRlIF93c1JlYWR5U3Vic3JpYmVyczogSVJlc29sdmVSZWplY3RbXSA9IFtdXG4gIHByaXZhdGUgX3dzUmVzcG9uc2VXYWl0OiBNYXA8XG4gICAgc3RyaW5nIC8qIHJlcXVlc3RJZCAqLyxcbiAgICBJUmVzcG9uc2VXYWl0U3BlY1xuICA+ID0gbmV3IE1hcCgpXG4gIHByaXZhdGUgX3J0dE9ic2VydmVkOiBudW1iZXJbXSA9IFtdXG4gIHByaXZhdGUgX3JlY29ubmVjdFN0YXRlOiBib29sZWFuXG4gIC8vIG9idGFpbmVkIGZyb20gdGhlIGZpcnN0IGdldFNpZ25hdHVyZSB3aXRoIG5vIGVudklkIHByb3ZpZGVkXG4gIC8vIHByaXZhdGUgX2RlZmF1bHRFbnZJZD86IHN0cmluZ1xuICBwcml2YXRlIF93c1NpZ246IElXc1NpZ25cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJUmVhbHRpbWVXZWJTb2NrZXRDbGllbnRDb25zdHJ1Y3Rvck9wdGlvbnMpIHtcbiAgICB0aGlzLl9tYXhSZWNvbm5lY3QgPSBvcHRpb25zLm1heFJlY29ubmVjdCB8fCBERUZBVUxUX01BWF9SRUNPTk5FQ1RcbiAgICAvLyB0aGlzLl9hdmFpbGFibGVSZXRyaWVzID0gdGhpcy5fbWF4UmVjb25uZWN0XG4gICAgdGhpcy5fcmVjb25uZWN0SW50ZXJ2YWwgPVxuICAgICAgb3B0aW9ucy5yZWNvbm5lY3RJbnRlcnZhbCB8fCBERUZBVUxUX1dTX1JFQ09OTkVDVF9JTlRFUlZBTFxuICAgIHRoaXMuX2NvbnRleHQgPSBvcHRpb25zLmNvbnRleHRcbiAgfVxuXG4gIGNsZWFySGVhcnRiZWF0KCkge1xuICAgIHRoaXMuX3BpbmdUaW1lb3V0SWQgJiYgY2xlYXJUaW1lb3V0KHRoaXMuX3BpbmdUaW1lb3V0SWQpXG4gICAgdGhpcy5fcG9uZ1RpbWVvdXRJZCAmJiBjbGVhclRpbWVvdXQodGhpcy5fcG9uZ1RpbWVvdXRJZClcbiAgfVxuXG4gIHNlbmQgPSBhc3luYyA8VCA9IGFueT4ob3B0czogSVdTU2VuZE9wdGlvbnMpOiBQcm9taXNlPFQ+ID0+XG4gICAgbmV3IFByb21pc2U8VD4oYXN5bmMgKF9yZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgdGltZW91dElkOiBudW1iZXJcbiAgICAgIGxldCBfaGFzUmVzb2x2ZWQgPSBmYWxzZVxuICAgICAgbGV0IF9oYXNSZWplY3RlZCA9IGZhbHNlXG5cbiAgICAgIGNvbnN0IHJlc29sdmU6IHR5cGVvZiBfcmVzb2x2ZSA9IChcbiAgICAgICAgdmFsdWU/OiBUIHwgUHJvbWlzZUxpa2U8VD4gfCB1bmRlZmluZWRcbiAgICAgICkgPT4ge1xuICAgICAgICBfaGFzUmVzb2x2ZWQgPSB0cnVlXG4gICAgICAgIHRpbWVvdXRJZCAmJiBjbGVhclRpbWVvdXQodGltZW91dElkKVxuICAgICAgICBfcmVzb2x2ZSh2YWx1ZSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVqZWN0OiB0eXBlb2YgX3JlamVjdCA9IChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgIF9oYXNSZWplY3RlZCA9IHRydWVcbiAgICAgICAgdGltZW91dElkICYmIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpXG4gICAgICAgIF9yZWplY3QoZXJyb3IpXG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRzLnRpbWVvdXQpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICBpZiAoIV9oYXNSZXNvbHZlZCB8fCAhX2hhc1JlamVjdGVkKSB7XG4gICAgICAgICAgICAvLyB3YWl0IGFub3RoZXIgaW1tZWRpYXRlIHRpbWVvdXQgdG8gYWxsb3cgdGhlIHN1Y2Nlc3MvZmFpbCBjYWxsYmFjayB0byBiZSBpbnZva2VkIGlmIHdzIGhhcyBhbHJlYWR5IGdvdCB0aGUgcmVzdWx0LFxuICAgICAgICAgICAgLy8gdGhpcyBpcyBiZWNhdXNlIHRoZSB0aW1lciBpcyByZWdpc3RlcmVkIGJlZm9yZSB3cy5zZW5kXG4gICAgICAgICAgICBhd2FpdCBzbGVlcCgwKVxuICAgICAgICAgICAgaWYgKCFfaGFzUmVzb2x2ZWQgfHwgIV9oYXNSZWplY3RlZCkge1xuICAgICAgICAgICAgICByZWplY3QobmV3IFRpbWVvdXRFcnJvcignd3NjbGllbnQuc2VuZCB0aW1lZG91dCcpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0cy50aW1lb3V0KVxuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBpZiAodGhpcy5fY29udGV4dC5kZWJ1Zykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgW3JlYWx0aW1lXSB3cyBzZW5kICgke25ldyBEYXRlKCl9KTogYCwgb3B0cylcbiAgICAgICAgLy8gY29uc29sZS5sb2coXG4gICAgICAgIC8vICAgYFtyZWFsdGltZV0gd3Mgc2VuZCAke1xuICAgICAgICAvLyAgICAgb3B0cy5tc2cubXNnVHlwZVxuICAgICAgICAvLyAgIH0gKCR7bmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpfSk6IGAsXG4gICAgICAgIC8vICAgb3B0c1xuICAgICAgICAvLyApXG4gICAgICAgIC8vIH1cblxuICAgICAgICBpZiAodGhpcy5fd3NJbml0UHJvbWlzZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX3dzSW5pdFByb21pc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fd3MpIHtcbiAgICAgICAgICByZWplY3QoXG4gICAgICAgICAgICBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICdpbnZhbGlkIHN0YXRlOiB3cyBjb25uZWN0aW9uIG5vdCBleGlzdHMsIGNhbiBub3Qgc2VuZCBtZXNzYWdlJ1xuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl93cy5yZWFkeVN0YXRlICE9PSBXU19SRUFEWV9TVEFURS5PUEVOKSB7XG4gICAgICAgICAgcmVqZWN0KFxuICAgICAgICAgICAgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgd3MgcmVhZHlTdGF0ZSBpbnZhbGlkOiAke3RoaXMuX3dzLnJlYWR5U3RhdGV9LCBjYW4gbm90IHNlbmQgbWVzc2FnZWBcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0cy53YWl0UmVzcG9uc2UpIHtcbiAgICAgICAgICB0aGlzLl93c1Jlc3BvbnNlV2FpdC5zZXQob3B0cy5tc2cucmVxdWVzdElkLCB7XG4gICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgcmVqZWN0LFxuICAgICAgICAgICAgc2tpcE9uTWVzc2FnZTogb3B0cy5za2lwT25NZXNzYWdlXG4gICAgICAgICAgfSBhcyBJUmVzcG9uc2VXYWl0U3BlYylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzZW5kIG1zZzonLCBvcHRzLm1zZylcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl93cy5zZW5kKEpTT04uc3RyaW5naWZ5KG9wdHMubXNnKSlcbiAgICAgICAgICBpZiAoIW9wdHMud2FpdFJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpXG4gICAgICAgICAgICBpZiAob3B0cy53YWl0UmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgdGhpcy5fd3NSZXNwb25zZVdhaXQuZGVsZXRlKG9wdHMubXNnLnJlcXVlc3RJZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5fd3Muc2VuZChKU09OLnN0cmluZ2lmeShvcHRzLm1zZyksIGVyciA9PiB7XG4gICAgICAgIC8vICAgaWYgKGVycikge1xuICAgICAgICAvLyAgICAgcmVqZWN0KGVycilcbiAgICAgICAgLy8gICAgIGlmIChvcHRzLndhaXRSZXNwb25zZSkge1xuICAgICAgICAvLyAgICAgICB0aGlzLl93c1Jlc3BvbnNlV2FpdC5kZWxldGUob3B0cy5tc2cucmVxdWVzdElkKVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgcmV0dXJuXG4gICAgICAgIC8vICAgfVxuXG4gICAgICAgIC8vICAgaWYgKCFvcHRzLndhaXRSZXNwb25zZSkge1xuICAgICAgICAvLyAgICAgcmVzb2x2ZSgpXG4gICAgICAgIC8vICAgfVxuICAgICAgICAvLyB9KVxuXG4gICAgICAgIC8vIHRoaXMuX3dzLnNlbmQoe1xuICAgICAgICAvLyAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KG9wdHMubXNnKSxcbiAgICAgICAgLy8gICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAvLyAgICAgaWYgKCFvcHRzLndhaXRSZXNwb25zZSkge1xuICAgICAgICAvLyAgICAgICByZXNvbHZlKHJlcylcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICB9LFxuICAgICAgICAvLyAgIGZhaWw6IGUgPT4ge1xuICAgICAgICAvLyAgICAgcmVqZWN0KGUpXG4gICAgICAgIC8vICAgICBpZiAob3B0cy53YWl0UmVzcG9uc2UpIHtcbiAgICAgICAgLy8gICAgICAgdGhpcy5fd3NSZXNwb25zZVdhaXQuZGVsZXRlKG9wdHMubXNnLnJlcXVlc3RJZClcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vIH0pXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlamVjdChlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgY2xvc2UoY29kZTogQ0xPU0VfRVZFTlRfQ09ERSkge1xuICAgIHRoaXMuY2xlYXJIZWFydGJlYXQoKVxuXG4gICAgaWYgKHRoaXMuX3dzKSB7XG4gICAgICB0aGlzLl93cy5jbG9zZShjb2RlLCBDTE9TRV9FVkVOVF9DT0RFX0lORk9bY29kZV0ubmFtZSlcbiAgICAgIHRoaXMuX3dzID0gdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgY2xvc2VBbGxDbGllbnRzID0gKGVycm9yOiBhbnkpID0+IHtcbiAgICB0aGlzLl92aXJ0dWFsV1NDbGllbnQuZm9yRWFjaChjbGllbnQgPT4ge1xuICAgICAgY2xpZW50LmNsb3NlV2l0aEVycm9yKGVycm9yKVxuICAgIH0pXG4gIH1cblxuICBwYXVzZUNsaWVudHMgPSAoY2xpZW50cz86IFNldDxWaXJ0dWFsV2ViU29ja2V0Q2xpZW50PikgPT4ge1xuICAgIDsoY2xpZW50cyB8fCB0aGlzLl92aXJ0dWFsV1NDbGllbnQpLmZvckVhY2goY2xpZW50ID0+IHtcbiAgICAgIGNsaWVudC5wYXVzZSgpXG4gICAgfSlcbiAgfVxuXG4gIHJlc3VtZUNsaWVudHMgPSAoY2xpZW50cz86IFNldDxWaXJ0dWFsV2ViU29ja2V0Q2xpZW50PikgPT4ge1xuICAgIDsoY2xpZW50cyB8fCB0aGlzLl92aXJ0dWFsV1NDbGllbnQpLmZvckVhY2goY2xpZW50ID0+IHtcbiAgICAgIGNsaWVudC5yZXN1bWUoKVxuICAgIH0pXG4gIH1cblxuICB3YXRjaChvcHRpb25zOiBJV1NXYXRjaE9wdGlvbnMpOiBEQlJlYWx0aW1lTGlzdGVuZXIge1xuICAgIGlmICghdGhpcy5fd3MgJiYgIXRoaXMuX3dzSW5pdFByb21pc2UpIHtcbiAgICAgIHRoaXMuaW5pdFdlYlNvY2tldENvbm5lY3Rpb24oZmFsc2UpXG4gICAgfVxuXG4gICAgY29uc3QgdmlydHVhbENsaWVudCA9IG5ldyBWaXJ0dWFsV2ViU29ja2V0Q2xpZW50KHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBzZW5kOiB0aGlzLnNlbmQsXG4gICAgICBsb2dpbjogdGhpcy53ZWJMb2dpbixcbiAgICAgIGlzV1NDb25uZWN0ZWQ6IHRoaXMuaXNXU0Nvbm5lY3RlZCxcbiAgICAgIG9uY2VXU0Nvbm5lY3RlZDogdGhpcy5vbmNlV1NDb25uZWN0ZWQsXG4gICAgICBnZXRXYWl0RXhwZWN0ZWRUaW1lb3V0TGVuZ3RoOiB0aGlzLmdldFdhaXRFeHBlY3RlZFRpbWVvdXRMZW5ndGgsXG4gICAgICBvbldhdGNoU3RhcnQ6IHRoaXMub25XYXRjaFN0YXJ0LFxuICAgICAgb25XYXRjaENsb3NlOiB0aGlzLm9uV2F0Y2hDbG9zZSxcbiAgICAgIGRlYnVnOiB0cnVlXG4gICAgfSlcbiAgICB0aGlzLl92aXJ0dWFsV1NDbGllbnQuYWRkKHZpcnR1YWxDbGllbnQpXG4gICAgdGhpcy5fd2F0Y2hJZENsaWVudE1hcC5zZXQodmlydHVhbENsaWVudC53YXRjaElkLCB2aXJ0dWFsQ2xpZW50KVxuICAgIHJldHVybiB2aXJ0dWFsQ2xpZW50Lmxpc3RlbmVyXG4gIH1cblxuICBwcml2YXRlIGluaXRXZWJTb2NrZXRDb25uZWN0aW9uID0gYXN5bmMgKFxuICAgIHJlY29ubmVjdDogYm9vbGVhbixcbiAgICBhdmFpbGFibGVSZXRyaWVzOiBudW1iZXIgPSB0aGlzLl9tYXhSZWNvbm5lY3RcbiAgKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgLy8g5b2T5YmN5aSE5LqO5q2j5Zyo6YeN6L+e5Lit55qE54q25oCBXG4gICAgaWYgKHJlY29ubmVjdCAmJiB0aGlzLl9yZWNvbm5lY3RTdGF0ZSkge1xuICAgICAgcmV0dXJuIC8vIOW/veeVpVxuICAgIH1cblxuICAgIGlmIChyZWNvbm5lY3QpIHtcbiAgICAgIHRoaXMuX3JlY29ubmVjdFN0YXRlID0gdHJ1ZSAvLyDph43ov57nirbmgIHlvIDlp4tcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fd3NJbml0UHJvbWlzZSkge1xuICAgICAgLy8gdGhlcmUgYWxyZWFkeSBleGlzdHMgYSB3ZWJzb2NrZXQgaW5pdGlhdGlvbiwganVzdCB3YWl0IGZvciBpdFxuICAgICAgcmV0dXJuIHRoaXMuX3dzSW5pdFByb21pc2VcbiAgICB9XG5cbiAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAvLyAgIGBbcmVhbHRpbWVdIGluaXRXZWJTb2NrZXRDb25uZWN0aW9uIHJlY29ubmVjdCAke3JlY29ubmVjdH0gYXZhaWxhYmxlUmV0cmllcyAke2F2YWlsYWJsZVJldHJpZXN9YFxuICAgIC8vIClcbiAgICAvLyB9XG5cbiAgICBpZiAocmVjb25uZWN0KSB7XG4gICAgICB0aGlzLnBhdXNlQ2xpZW50cygpXG4gICAgfVxuXG4gICAgdGhpcy5jbG9zZShDTE9TRV9FVkVOVF9DT0RFLlJlY29ubmVjdFdlYlNvY2tldClcblxuICAgIHRoaXMuX3dzSW5pdFByb21pc2UgPSBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXG4gICAgICAgIC8vICAgJ1tyZWFsdGltZV0gaW5pdFdlYlNvY2tldENvbm5lY3Rpb24gc3RhcnQgdGhyb3dFcnJvcklmTmV0d29ya09mZmxpbmUnXG4gICAgICAgIC8vIClcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIOaaguS4jeajgOafpee9kee7nOaAgVxuICAgICAgICAvLyBhd2FpdCB0aHJvd0Vycm9ySWZOZXR3b3JrT2ZmbGluZSgpXG5cbiAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdbcmVhbHRpbWVdIGluaXRXZWJTb2NrZXRDb25uZWN0aW9uIHN0YXJ0IGdldFNpZ25hdHVyZScpXG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCB0aGlzLmdldFNpZ25hdHVyZSgpXG4gICAgICAgIGNvbnN0IHdzU2lnbiA9IGF3YWl0IHRoaXMuZ2V0V3NTaWduKClcblxuICAgICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1tyZWFsdGltZV0gaW5pdFdlYlNvY2tldENvbm5lY3Rpb24gZ2V0U2lnbmF0dXJlIHN1Y2Nlc3MnKVxuICAgICAgICAvLyBjb25zb2xlLmxvZygnW3JlYWx0aW1lXSBpbml0V2ViU29ja2V0Q29ubmVjdGlvbiBzdGFydCBjb25uZWN0U29ja2V0JylcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHN1Y2Nlc3MgPT4ge1xuICAgICAgICAgIC8vIHRoaXMuX3dzID0gZ2V0U0RLKHRoaXMuX2NvbnRleHQuaWRlbnRpZmllcnMpXG4gICAgICAgICAgLy8gICAuX3NvY2tldFNraXBDaGVja0RvbWFpbkZhY3RvcnkoKVxuICAgICAgICAgIC8vICAgLmNvbm5lY3RTb2NrZXQoe1xuICAgICAgICAgIC8vICAgICB1cmw6IHNpZ25hdHVyZS53c1VybCxcbiAgICAgICAgICAvLyAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgLy8gICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAvLyAgICAgc3VjY2VzczogKCkgPT4gc3VjY2VzcygpLFxuICAgICAgICAgIC8vICAgICBmYWlsXG4gICAgICAgICAgLy8gICB9KVxuXG4gICAgICAgICAgY29uc3QgdXJsID0gd3NTaWduLndzVXJsIHx8ICd3c3M6Ly90Y2Itd3MudGVuY2VudGNsb3VkYXBpLmNvbSc7XG4gICAgICAgICAgY29uc3Qgd3NDbGFzcyA9IGdldFdzQ2xhc3MoKTtcbiAgICAgICAgICB0aGlzLl93cyA9IHdzQ2xhc3MgPyBuZXcgd3NDbGFzcyh1cmwpIDogbmV3IFdlYlNvY2tldCh1cmwpXG4gICAgICAgICAgc3VjY2VzcygpXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYodGhpcy5fd3MuY29ubmVjdCl7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fd3MuY29ubmVjdCgpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXG4gICAgICAgIC8vICAgJ1tyZWFsdGltZV0gaW5pdFdlYlNvY2tldENvbm5lY3Rpb24gY29ubmVjdFNvY2tldCBzdWNjZXNzZnVsbHkgZmlyZWQnXG4gICAgICAgIC8vIClcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuaW5pdFdlYlNvY2tldEV2ZW50KClcbiAgICAgICAgcmVzb2x2ZSgpXG5cbiAgICAgICAgaWYgKHJlY29ubmVjdCkge1xuICAgICAgICAgIHRoaXMucmVzdW1lQ2xpZW50cygpXG4gICAgICAgICAgdGhpcy5fcmVjb25uZWN0U3RhdGUgPSBmYWxzZSAvLyDph43ov57nirbmgIHnu5PmnZ9cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignW3JlYWx0aW1lXSBpbml0V2ViU29ja2V0Q29ubmVjdGlvbiBjb25uZWN0IGZhaWwnLCBlKVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgaWYgKGF2YWlsYWJsZVJldHJpZXMgPiAwKSB7XG4gICAgICAgICAgLy8gdGhpcyBpcyBhbiBvcHRpbWl6YXRpb24sIGluIGNhc2Ugb2YgbmV0d29yayBvZmZsaW5lLCB3ZSBkb24ndCBuZWVkIHRvIHN0dWJib3JubHkgc2xlZXAgZm9yIHNvbWV0aW1lLFxuICAgICAgICAgIC8vIHdlIG9ubHkgbmVlZCB0byB3YWl0IGZvciB0aGUgbmV0d29yayB0byBiZSBiYWNrIG9ubGluZSwgdGhpcyBlbnN1cmVzIG1pbmltdW0gZG93bnRpbWVcbiAgICAgICAgICAvLyBjb25zdCB7IGlzQ29ubmVjdGVkIH0gPSBhd2FpdCBnZXROZXR3b3JrU3RhdHVzKClcbiAgICAgICAgICBjb25zdCBpc0Nvbm5lY3RlZCA9IHRydWVcblxuICAgICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFxuICAgICAgICAgIC8vICAgJ1tyZWFsdGltZV0gaW5pdFdlYlNvY2tldENvbm5lY3Rpb24gd2FpdGluZyBmb3IgbmV0d29yayBvbmxpbmUnXG4gICAgICAgICAgLy8gKVxuICAgICAgICAgIC8vIH1cblxuICAgICAgICAgIC8vIGF1dG8gd2FpdCB1bnRpbCBuZXR3b3JrIG9ubGluZSwgY2F1c2UnIGl0IHdvdWxkIGJlIG1lYW5pbmdsZXNzIHRvIHJlY29ubmVjdCB3aGlsZSBuZXR3b3JrIGlzIG9mZmxpbmVcblxuICAgICAgICAgIC8vIGF3YWl0IG9uY2VOZXR3b3JrT25saW5lKClcblxuICAgICAgICAgIC8vIENPTVBBVElCSUxJVFk6IHdhaXQgZm9yIGlkZSBzdGF0ZSB1cGRhdGVcbiAgICAgICAgICAvLyBpZiAoaXNEZXZUb29scygpKSB7XG4gICAgICAgICAgLy8gICBhd2FpdCBzbGVlcCgwKVxuICAgICAgICAgIC8vIH1cblxuICAgICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdbcmVhbHRpbWVdIGluaXRXZWJTb2NrZXRDb25uZWN0aW9uIG5ldHdvcmsgb25saW5lJylcbiAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICB0aGlzLl93c0luaXRQcm9taXNlID0gdW5kZWZpbmVkXG5cbiAgICAgICAgICBpZiAoaXNDb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXG4gICAgICAgICAgICAvLyAgIGBbcmVhbHRpbWVdIGluaXRXZWJTb2NrZXRDb25uZWN0aW9uIHNsZWVwICR7dGhpcy5fcmVjb25uZWN0SW50ZXJ2YWx9bXNgXG4gICAgICAgICAgICAvLyApXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBhd2FpdCBzbGVlcCh0aGlzLl9yZWNvbm5lY3RJbnRlcnZhbClcbiAgICAgICAgICAgIGlmIChyZWNvbm5lY3QpIHtcbiAgICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0U3RhdGUgPSBmYWxzZSAvLyDph43ov57lvILluLjkuZ/nrpfph43ov57nirbmgIHnu5PmnZ9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXNvbHZlKHRoaXMuaW5pdFdlYlNvY2tldENvbm5lY3Rpb24ocmVjb25uZWN0LCBhdmFpbGFibGVSZXRyaWVzIC0gMSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KGUpXG5cbiAgICAgICAgICBpZiAocmVjb25uZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlQWxsQ2xpZW50cyhcbiAgICAgICAgICAgICAgbmV3IENsb3VkU0RLRXJyb3Ioe1xuICAgICAgICAgICAgICAgIGVyckNvZGU6IEVSUl9DT0RFLlNES19EQVRBQkFTRV9SRUFMVElNRV9MSVNURU5FUl9SRUNPTk5FQ1RfV0FUQ0hfRkFJTCBhcyBzdHJpbmcsXG4gICAgICAgICAgICAgICAgZXJyTXNnOiBlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIGxldCBzdWNjZXNzID0gZmFsc2VcblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLl93c0luaXRQcm9taXNlXG4gICAgICAvLyBzdWNjZXNzID0gdHJ1ZVxuICAgICAgdGhpcy5fd3NSZWFkeVN1YnNyaWJlcnMuZm9yRWFjaCgoeyByZXNvbHZlIH0pID0+IHJlc29sdmUoKSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLl93c1JlYWR5U3Vic3JpYmVycy5mb3JFYWNoKCh7IHJlamVjdCB9KSA9PiByZWplY3QoKSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5fd3NJbml0UHJvbWlzZSA9IHVuZGVmaW5lZFxuICAgICAgdGhpcy5fd3NSZWFkeVN1YnNyaWJlcnMgPSBbXVxuICAgIH1cblxuICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgIC8vIGNvbnNvbGUubG9nKFxuICAgIC8vICAgYFtyZWFsdGltZV0gaW5pdFdlYlNvY2tldENvbm5lY3Rpb24gJHtzdWNjZXNzID8gJ3N1Y2Nlc3MnIDogJ2ZhaWwnfWBcbiAgICAvLyApXG4gICAgLy8gfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0V2ViU29ja2V0RXZlbnQgPSAoKSA9PlxuICAgIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghdGhpcy5fd3MpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW4gbm90IGluaXRXZWJTb2NrZXRFdmVudCwgd3Mgbm90IGV4aXN0cycpXG4gICAgICB9XG5cbiAgICAgIGxldCB3c09wZW5lZCA9IGZhbHNlXG5cbiAgICAgIHRoaXMuX3dzLm9ub3BlbiA9IGV2ZW50ID0+IHtcbiAgICAgICAgLy8gdGhpcy5fd3Mub25PcGVuKCgpID0+IHtcbiAgICAgICAgLy8gdGhpcy5fd3Mub24oXCJvcGVuXCIsICgpID0+IHtcbiAgICAgICAgLy8gdGhpcy5fY29udGV4dC5kZWJ1ZyAmJlxuICAgICAgICBjb25zb2xlLndhcm4oJ1tyZWFsdGltZV0gd3MgZXZlbnQ6IG9wZW4nLCBldmVudClcbiAgICAgICAgd3NPcGVuZWQgPSB0cnVlXG4gICAgICAgIHJlc29sdmUoKVxuICAgICAgfVxuXG4gICAgICB0aGlzLl93cy5vbmVycm9yID0gZXZlbnQgPT4ge1xuICAgICAgICAvLyB0aGlzLl93cy5vbihcImVycm9yXCIsIGVycm9yID0+IHtcbiAgICAgICAgLy8gdGhpcy5fd3Mub25FcnJvcihlcnJvciA9PiB7XG4gICAgICAgIC8vIGFsbCBsb2dpbnMgYXJlIGludmFsaWQgYWZ0ZXIgZGlzY29ubmVjdGlvblxuICAgICAgICB0aGlzLl9sb2dpbnMgPSBuZXcgTWFwKClcblxuICAgICAgICAvLyBlcnJvcuWGmei/m2ZpbGVcblxuICAgICAgICBpZiAoIXdzT3BlbmVkKSB7XG4gICAgICAgICAgLy8gdGhpcy5fY29udGV4dC5kZWJ1ZyAmJlxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tyZWFsdGltZV0gd3Mgb3BlbiBmYWlsZWQgd2l0aCB3cyBldmVudDogZXJyb3InLCBldmVudClcbiAgICAgICAgICAvLyB3cml0ZVRvRmlsZShcbiAgICAgICAgICAvLyAgIFwid3NlcnJvci50eHRcIixcbiAgICAgICAgICAvLyAgIGAke1xuICAgICAgICAgIC8vICAgICB0aGlzLnNwZWNpYWxOdW1iZXJcbiAgICAgICAgICAvLyAgIH0gW3JlYWx0aW1lXSB3cyBvcGVuIGZhaWxlZCB3aXRoIHdzIGV2ZW50OiBlcnJvciAke2Vycm9yfSBcXG5gXG4gICAgICAgICAgLy8gKVxuXG4gICAgICAgICAgcmVqZWN0KGV2ZW50KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHRoaXMuX2NvbnRleHQuZGVidWcgJiZcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdbcmVhbHRpbWVdIHdzIGV2ZW50OiBlcnJvcicsIGV2ZW50KVxuXG4gICAgICAgICAgLy8gd3JpdGVUb0ZpbGUoXG4gICAgICAgICAgLy8gICBcIndzZXJyb3IudHh0XCIsXG4gICAgICAgICAgLy8gICBgJHt0aGlzLnNwZWNpYWxOdW1iZXJ9IFtyZWFsdGltZV0gd3MgZXZlbnQ6IGVycm9yICR7ZXJyb3J9IFxcbmBcbiAgICAgICAgICAvLyApXG5cbiAgICAgICAgICB0aGlzLmNsZWFySGVhcnRiZWF0KClcbiAgICAgICAgICB0aGlzLl92aXJ0dWFsV1NDbGllbnQuZm9yRWFjaChjbGllbnQgPT5cbiAgICAgICAgICAgIGNsaWVudC5jbG9zZVdpdGhFcnJvcihcbiAgICAgICAgICAgICAgbmV3IENsb3VkU0RLRXJyb3Ioe1xuICAgICAgICAgICAgICAgIGVyckNvZGU6IEVSUl9DT0RFLlNES19EQVRBQkFTRV9SRUFMVElNRV9MSVNURU5FUl9XRUJTT0NLRVRfQ09OTkVDVElPTl9FUlJPUiBhcyBzdHJpbmcsXG4gICAgICAgICAgICAgICAgZXJyTXNnOiBldmVudFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUT0RPOiByZWNvbm5lY3RcbiAgICAgIHRoaXMuX3dzLm9uY2xvc2UgPSBjbG9zZUV2ZW50ID0+IHtcbiAgICAgICAgLy8gdGhpcy5fd3Mub24oXCJjbG9zZVwiLCAoY2xvc2VFdmVudCwgY2xvc2VyZWFzb24pID0+IHtcbiAgICAgICAgLy8gdGhpcy5fd3Mub25DbG9zZShjbG9zZUV2ZW50ID0+IHtcbiAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignW3JlYWx0aW1lXSB3cyBldmVudDogY2xvc2UnLCBjbG9zZUV2ZW50KVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gd3JpdGVUb0ZpbGUoXG4gICAgICAgIC8vICAgXCJ3c2Nsb3NlLnR4dFwiLFxuICAgICAgICAvLyAgIGAke1xuICAgICAgICAvLyAgICAgdGhpcy5zcGVjaWFsTnVtYmVyXG4gICAgICAgIC8vICAgfSBbcmVhbHRpbWVdIHdzIGV2ZW50OiBjbG9zZSAke2Nsb3NlRXZlbnR9ICR7Y2xvc2VyZWFzb259IFxcbmBcbiAgICAgICAgLy8gKVxuXG4gICAgICAgIC8vIGFsbCBsb2dpbnMgYXJlIGludmFsaWQgYWZ0ZXIgZGlzY29ubmVjdGlvblxuICAgICAgICB0aGlzLl9sb2dpbnMgPSBuZXcgTWFwKClcblxuICAgICAgICB0aGlzLmNsZWFySGVhcnRiZWF0KClcbiAgICAgICAgc3dpdGNoIChjbG9zZUV2ZW50LmNvZGUpIHtcbiAgICAgICAgICBjYXNlIENMT1NFX0VWRU5UX0NPREUuUmVjb25uZWN0V2ViU29ja2V0OiB7XG4gICAgICAgICAgICAvLyBqdXN0IGlnbm9yZVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSBDTE9TRV9FVkVOVF9DT0RFLk5vUmVhbHRpbWVMaXN0ZW5lcnM6IHtcbiAgICAgICAgICAgIC8vIHF1aXRcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgQ0xPU0VfRVZFTlRfQ09ERS5IZWFydGJlYXRQaW5nRXJyb3I6XG4gICAgICAgICAgY2FzZSBDTE9TRV9FVkVOVF9DT0RFLkhlYXJ0YmVhdFBvbmdUaW1lb3V0RXJyb3I6XG4gICAgICAgICAgY2FzZSBDTE9TRV9FVkVOVF9DT0RFLk5vcm1hbENsb3N1cmU6XG4gICAgICAgICAgY2FzZSBDTE9TRV9FVkVOVF9DT0RFLkFibm9ybWFsQ2xvc3VyZToge1xuICAgICAgICAgICAgLy8gTm9ybWFsIENsb3N1cmUgYW5kIEFibm9ybWFsIENsb3N1cmU6XG4gICAgICAgICAgICAvLyAgIGV4cGVjdGVkIGNsb3N1cmUsIG1vc3QgbGlrZWx5IGRpc3BhdGNoZWQgYnkgd2VjaGF0IGNsaWVudCxcbiAgICAgICAgICAgIC8vICAgc2luY2UgdGhpcyBpcyB0aGUgc3RhdHVzIGNvZGUgZGlzcGF0Y2hlZCBpbiBjYXNlIG9mIG5ldHdvcmsgZmFpbHVyZSxcbiAgICAgICAgICAgIC8vICAgd2Ugc2hvdWxkIHJldHJ5XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXhSZWNvbm5lY3QgPiAwKSB7XG4gICAgICAgICAgICAgIC8vIGlmICh0aGlzLl9hdmFpbGFibGVSZXRyaWVzID4gMCkge1xuICAgICAgICAgICAgICB0aGlzLmluaXRXZWJTb2NrZXRDb25uZWN0aW9uKHRydWUsIHRoaXMuX21heFJlY29ubmVjdClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuY2xvc2VBbGxDbGllbnRzKGdldFdTQ2xvc2VFcnJvcihjbG9zZUV2ZW50LmNvZGUpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSBDTE9TRV9FVkVOVF9DT0RFLk5vQXV0aGVudGljYXRpb246IHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VBbGxDbGllbnRzKFxuICAgICAgICAgICAgICBnZXRXU0Nsb3NlRXJyb3IoY2xvc2VFdmVudC5jb2RlLCBjbG9zZUV2ZW50LnJlYXNvbilcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIC8vIHdlIHNob3VsZCByZXRyeSBieSBkZWZhdWx0XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4UmVjb25uZWN0ID4gMCkge1xuICAgICAgICAgICAgICAvLyBpZiAodGhpcy5fYXZhaWxhYmxlUmV0cmllcyA+IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5pbml0V2ViU29ja2V0Q29ubmVjdGlvbih0cnVlLCB0aGlzLl9tYXhSZWNvbm5lY3QpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmNsb3NlQWxsQ2xpZW50cyhnZXRXU0Nsb3NlRXJyb3IoY2xvc2VFdmVudC5jb2RlKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybihgW3JlYWx0aW1lXSB1bnJlY29nbml6ZSB3cyBjbG9zZSBldmVudGAsIGNsb3NlRXZlbnQpXG4gICAgICAgICAgICAvLyB0aGlzLmNsb3NlQWxsQ2xpZW50cyhnZXRXU0Nsb3NlRXJyb3IoY2xvc2VFdmVudC5jb2RlKSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fd3Mub25tZXNzYWdlID0gcmVzID0+IHtcbiAgICAgICAgLy8gdGhpcy5fd3Mub24oXCJtZXNzYWdlXCIsIHJlcyA9PiB7XG4gICAgICAgIC8vIHRoaXMuX3dzLm9uTWVzc2FnZShyZXMgPT4ge1xuICAgICAgICAvLyBjb25zdCByYXdNc2cgPSByZXMuZGF0YVxuICAgICAgICBjb25zdCByYXdNc2cgPSByZXMuZGF0YVxuXG4gICAgICAgIC8vIHJlc2V0ICYgcmVzdGFydCBoZWFydGJlYXRcbiAgICAgICAgdGhpcy5oZWFydGJlYXQoKVxuXG4gICAgICAgIGxldCBtc2c6IElSZXNwb25zZU1lc3NhZ2VcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIG1zZyA9IEpTT04ucGFyc2UocmF3TXNnIGFzIHN0cmluZylcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgW3JlYWx0aW1lXSBvbk1lc3NhZ2UgcGFyc2UgcmVzLmRhdGEgZXJyb3I6ICR7ZX1gKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXG4gICAgICAgIC8vICAgYFtyZWFsdGltZV0gb25NZXNzYWdlICR7XG4gICAgICAgIC8vICAgICBtc2cubXNnVHlwZVxuICAgICAgICAvLyAgIH0gKCR7bmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpfSlgLFxuICAgICAgICAvLyAgIG1zZ1xuICAgICAgICAvLyApXG5cbiAgICAgICAgaWYgKG1zZy5tc2dUeXBlID09PSAnRVJST1InKSB7XG4gICAgICAgICAgLy8g5om+5Yiw5b2T5YmN55uR5ZCs77yM5bm25bCGZXJyb3Lov5Tlm55cbiAgICAgICAgICBsZXQgdmlydHVhbFdhdGNoID0gbnVsbFxuICAgICAgICAgIHRoaXMuX3ZpcnR1YWxXU0NsaWVudC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0ud2F0Y2hJZCA9PT0gbXNnLndhdGNoSWQpIHtcbiAgICAgICAgICAgICAgdmlydHVhbFdhdGNoID0gaXRlbVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBpZiAodmlydHVhbFdhdGNoKSB7XG4gICAgICAgICAgICB2aXJ0dWFsV2F0Y2gubGlzdGVuZXIub25FcnJvcihtc2cpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2VXYWl0U3BlYyA9IHRoaXMuX3dzUmVzcG9uc2VXYWl0LmdldChtc2cucmVxdWVzdElkKVxuICAgICAgICBpZiAocmVzcG9uc2VXYWl0U3BlYykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAobXNnLm1zZ1R5cGUgPT09ICdFUlJPUicpIHtcbiAgICAgICAgICAgICAgcmVzcG9uc2VXYWl0U3BlYy5yZWplY3QobmV3IFJlYWx0aW1lRXJyb3JNZXNzYWdlRXJyb3IobXNnKSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlc3BvbnNlV2FpdFNwZWMucmVzb2x2ZShtc2cpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gdGhpcy5fY29udGV4dC5kZWJ1ZyAmJlxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgJ3dzIG9uTWVzc2FnZSByZXNwb25zZVdhaXRTcGVjLnJlc29sdmUobXNnKSBlcnJvcmVkOicsXG4gICAgICAgICAgICAgIGVcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5fd3NSZXNwb25zZVdhaXQuZGVsZXRlKG1zZy5yZXF1ZXN0SWQpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXNwb25zZVdhaXRTcGVjLnNraXBPbk1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtc2cubXNnVHlwZSA9PT0gJ1BPTkcnKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2xhc3RQaW5nU2VuZFRTKSB7XG4gICAgICAgICAgICBjb25zdCBydHQgPSBEYXRlLm5vdygpIC0gdGhpcy5fbGFzdFBpbmdTZW5kVFNcbiAgICAgICAgICAgIGlmIChydHQgPiBERUZBVUxUX1VOVFJVU1RFRF9SVFRfVEhSRVNIT0xEKSB7XG4gICAgICAgICAgICAgIC8vIHRoaXMuX2NvbnRleHQuZGVidWcgJiZcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBbcmVhbHRpbWVdIHVudHJ1c3RlZCBydHQgb2JzZXJ2ZWQ6ICR7cnR0fWApXG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX3J0dE9ic2VydmVkLmxlbmd0aCA+PSBNQVhfUlRUX09CU0VSVkVEKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3J0dE9ic2VydmVkLnNwbGljZShcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIHRoaXMuX3J0dE9ic2VydmVkLmxlbmd0aCAtIE1BWF9SVFRfT0JTRVJWRUQgKyAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3J0dE9ic2VydmVkLnB1c2gocnR0KVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjbGllbnQgPSBtc2cud2F0Y2hJZCAmJiB0aGlzLl93YXRjaElkQ2xpZW50TWFwLmdldChtc2cud2F0Y2hJZClcbiAgICAgICAgaWYgKGNsaWVudCkge1xuICAgICAgICAgIGNsaWVudC5vbk1lc3NhZ2UobXNnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRPRE8sIHRoaXMgaXMgYSB0ZW1wb3JhcnkgZml4IGRvbmUgZm9yIHNlcnZlclxuICAgICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICBgW3JlYWx0aW1lXSBubyByZWFsdGltZSBsaXN0ZW5lciBmb3VuZCByZXNwb25zaWJsZSBmb3Igd2F0Y2hJZCAke21zZy53YXRjaElkfTogYCxcbiAgICAgICAgICAgIG1zZ1xuICAgICAgICAgIClcbiAgICAgICAgICAvLyB9XG4gICAgICAgICAgc3dpdGNoIChtc2cubXNnVHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnSU5JVF9FVkVOVCc6XG4gICAgICAgICAgICBjYXNlICdORVhUX0VWRU5UJzpcbiAgICAgICAgICAgIGNhc2UgJ0NIRUNLX0VWRU5UJzoge1xuICAgICAgICAgICAgICBjbGllbnQgPSB0aGlzLl9xdWVyeUlkQ2xpZW50TWFwLmdldChtc2cubXNnRGF0YS5xdWVyeUlEKVxuICAgICAgICAgICAgICBpZiAoY2xpZW50KSB7XG4gICAgICAgICAgICAgICAgY2xpZW50Lm9uTWVzc2FnZShtc2cpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBbLGNsaWVudF0gb2YgQXJyYXkuZnJvbSh0aGlzLl93YXRjaElkQ2xpZW50TWFwLmVudHJpZXMoKSkpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnd2F0Y2hpZCoqKioqJywgd2F0Y2hJZClcbiAgICAgICAgICAgICAgICBjbGllbnQub25NZXNzYWdlKG1zZylcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaGVhcnRiZWF0KClcbiAgICB9KVxuXG4gIHByaXZhdGUgaXNXU0Nvbm5lY3RlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLl93cyAmJiB0aGlzLl93cy5yZWFkeVN0YXRlID09PSBXU19SRUFEWV9TVEFURS5PUEVOKVxuICB9XG5cbiAgcHJpdmF0ZSBvbmNlV1NDb25uZWN0ZWQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKHRoaXMuaXNXU0Nvbm5lY3RlZCgpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fd3NJbml0UHJvbWlzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3dzSW5pdFByb21pc2VcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fd3NSZWFkeVN1YnNyaWJlcnMucHVzaCh7XG4gICAgICAgIHJlc29sdmUsXG4gICAgICAgIHJlamVjdFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHJpdmF0ZSB3ZWJMb2dpbiA9IGFzeW5jIChcbiAgICBlbnZJZD86IHN0cmluZyxcbiAgICByZWZyZXNoPzogYm9vbGVhblxuICApOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGlmICghcmVmcmVzaCkge1xuICAgICAgLy8gbGV0IGxvZ2luSW5mbyA9IHRoaXMuX2xvZ2luSW5mb1xuICAgICAgaWYgKGVudklkKSB7XG4gICAgICAgIGNvbnN0IGxvZ2luSW5mbyA9IHRoaXMuX2xvZ2lucy5nZXQoZW52SWQpXG4gICAgICAgIGlmIChsb2dpbkluZm8pIHtcbiAgICAgICAgICBpZiAobG9naW5JbmZvLmxvZ2dlZEluICYmIGxvZ2luSW5mby5sb2dpblJlc3VsdCkge1xuICAgICAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnW3JlYWx0aW1lXSBsb2dpbjogYWxyZWFkeSBsb2dnZWQgaW4nKVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgcmV0dXJuIGxvZ2luSW5mby5sb2dpblJlc3VsdFxuICAgICAgICAgIH0gZWxzZSBpZiAobG9naW5JbmZvLmxvZ2dpbmdJblByb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2dpbkluZm8ubG9nZ2luZ0luUHJvbWlzZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZW1wdHlFbnZMb2dpbkluZm8gPSB0aGlzLl9sb2dpbnMuZ2V0KCcnKVxuICAgICAgICBpZiAoZW1wdHlFbnZMb2dpbkluZm8/LmxvZ2dpbmdJblByb21pc2UpIHtcbiAgICAgICAgICByZXR1cm4gZW1wdHlFbnZMb2dpbkluZm8ubG9nZ2luZ0luUHJvbWlzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKCdbcmVhbHRpbWVdIGxvZ2luOiBsb2dnaW5nIGluJylcblxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZTxJTG9naW5SZXN1bHQ+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIGNvbnN0IHNpZ25hdHVyZSA9IGF3YWl0IHRoaXMuZ2V0U2lnbmF0dXJlKGVudklkLCByZWZyZXNoKVxuXG4gICAgICAgIGNvbnN0IHdzU2lnbiA9IGF3YWl0IHRoaXMuZ2V0V3NTaWduKClcblxuICAgICAgICAvLyBjb25zdCB3eFZlcnNpb24gPSBnZXRXWFZlcnNpb24oKVxuICAgICAgICBjb25zdCBtc2dEYXRhOiBJUmVxdWVzdE1lc3NhZ2VMb2dpbkRhdGEgPSB7XG4gICAgICAgICAgZW52SWQ6IHdzU2lnbi5lbnZJZCB8fCAnJyxcbiAgICAgICAgICBhY2Nlc3NUb2tlbjogJycsIC8vIOW3suW6n+W8g+Wtl+autVxuICAgICAgICAgIC8vIHNpZ25TdHI6IHNpZ25hdHVyZS5zaWduU3RyLFxuICAgICAgICAgIC8vIHNlY3JldFZlcnNpb246IHNpZ25hdHVyZS5zZWNyZXRWZXJzaW9uLFxuICAgICAgICAgIHJlZmVycmVyOiAnd2ViJyxcbiAgICAgICAgICBzZGtWZXJzaW9uOiAnJyxcbiAgICAgICAgICBkYXRhVmVyc2lvbjogJydcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsb2dpbk1zZzogSVJlcXVlc3RNZXNzYWdlTG9naW5Nc2cgPSB7XG4gICAgICAgICAgd2F0Y2hJZDogdW5kZWZpbmVkLFxuICAgICAgICAgIHJlcXVlc3RJZDogZ2VuUmVxdWVzdElkKCksXG4gICAgICAgICAgbXNnVHlwZTogJ0xPR0lOJyxcbiAgICAgICAgICBtc2dEYXRhLFxuICAgICAgICAgIGV4TXNnRGF0YToge1xuICAgICAgICAgICAgcnVudGltZTogZ2V0UnVudGltZSgpLFxuICAgICAgICAgICAgc2lnblN0cjogd3NTaWduLnNpZ25TdHIsXG4gICAgICAgICAgICBzZWNyZXRWZXJzaW9uOiB3c1NpZ24uc2VjcmV0VmVyc2lvblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsb2dpblJlc01zZyA9IGF3YWl0IHRoaXMuc2VuZDxJUmVzcG9uc2VNZXNzYWdlTG9naW5SZXNNc2c+KHtcbiAgICAgICAgICBtc2c6IGxvZ2luTXNnLFxuICAgICAgICAgIHdhaXRSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgICBza2lwT25NZXNzYWdlOiB0cnVlLFxuICAgICAgICAgIHRpbWVvdXQ6IERFRkFVTFRfTE9HSU5fVElNRU9VVFxuICAgICAgICB9KVxuXG4gICAgICAgIGlmICghbG9naW5SZXNNc2cubXNnRGF0YS5jb2RlKSB7XG4gICAgICAgICAgLy8gbG9naW4gc3VjY2Vzc1xuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgZW52SWQ6IHdzU2lnbi5lbnZJZFxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbG9naW4gZmFpbGVkXG4gICAgICAgICAgcmVqZWN0KFxuICAgICAgICAgICAgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgJHtsb2dpblJlc01zZy5tc2dEYXRhLmNvZGV9ICR7bG9naW5SZXNNc2cubXNnRGF0YS5tZXNzYWdlfWBcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0KGUpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIGxldCBsb2dpbkluZm8gPSB0aGlzLl9sb2dpbkluZm9cbiAgICBsZXQgbG9naW5JbmZvID0gZW52SWQgJiYgdGhpcy5fbG9naW5zLmdldChlbnZJZClcblxuICAgIGNvbnN0IGxvZ2luU3RhcnRUUyA9IERhdGUubm93KClcblxuICAgIGlmIChsb2dpbkluZm8pIHtcbiAgICAgIGxvZ2luSW5mby5sb2dnZWRJbiA9IGZhbHNlXG4gICAgICBsb2dpbkluZm8ubG9nZ2luZ0luUHJvbWlzZSA9IHByb21pc2VcbiAgICAgIGxvZ2luSW5mby5sb2dpblN0YXJ0VFMgPSBsb2dpblN0YXJ0VFNcbiAgICB9IGVsc2Uge1xuICAgICAgbG9naW5JbmZvID0ge1xuICAgICAgICBsb2dnZWRJbjogZmFsc2UsXG4gICAgICAgIGxvZ2dpbmdJblByb21pc2U6IHByb21pc2UsXG4gICAgICAgIGxvZ2luU3RhcnRUU1xuICAgICAgfVxuICAgICAgLy8gdGhpcy5fbG9naW5JbmZvID0gbG9naW5JbmZvXG4gICAgICB0aGlzLl9sb2dpbnMuc2V0KGVudklkIHx8ICcnLCBsb2dpbkluZm8pXG4gICAgfVxuXG4gICAgLy8gdHJ5IHtcbiAgICAvLyAgIGNvbnN0IGxvZ2luUmVzdWx0ID0gYXdhaXQgcHJvbWlzZVxuICAgIC8vICAgbG9naW5JbmZvLmxvZ2dlZEluID0gdHJ1ZVxuICAgIC8vICAgbG9naW5JbmZvLmxvZ2dpbmdJblByb21pc2UgPSB1bmRlZmluZWRcbiAgICAvLyAgIGxvZ2luSW5mby5sb2dpblN0YXJ0VFMgPSB1bmRlZmluZWRcbiAgICAvLyAgIGxvZ2luSW5mby5sb2dpblJlc3VsdCA9IGxvZ2luUmVzdWx0XG4gICAgLy8gICByZXR1cm4gbG9naW5SZXN1bHRcbiAgICAvLyB9IGNhdGNoIChlKSB7XG4gICAgLy8gICBsb2dpbkluZm8ubG9nZ2VkSW4gPSBmYWxzZVxuICAgIC8vICAgbG9naW5JbmZvLmxvZ2dpbmdJblByb21pc2UgPSB1bmRlZmluZWRcbiAgICAvLyAgIGxvZ2luSW5mby5sb2dpblN0YXJ0VFMgPSB1bmRlZmluZWRcbiAgICAvLyAgIGxvZ2luSW5mby5sb2dpblJlc3VsdCA9IHVuZGVmaW5lZFxuICAgIC8vICAgdGhyb3cgZVxuICAgIC8vIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBsb2dpblJlc3VsdCA9IGF3YWl0IHByb21pc2VcbiAgICAgIGNvbnN0IGN1ckxvZ2luSW5mbyA9IGVudklkICYmIHRoaXMuX2xvZ2lucy5nZXQoZW52SWQpXG4gICAgICBpZiAoXG4gICAgICAgIGN1ckxvZ2luSW5mbyAmJlxuICAgICAgICBjdXJMb2dpbkluZm8gPT09IGxvZ2luSW5mbyAmJlxuICAgICAgICBjdXJMb2dpbkluZm8ubG9naW5TdGFydFRTID09PSBsb2dpblN0YXJ0VFNcbiAgICAgICkge1xuICAgICAgICBsb2dpbkluZm8ubG9nZ2VkSW4gPSB0cnVlXG4gICAgICAgIGxvZ2luSW5mby5sb2dnaW5nSW5Qcm9taXNlID0gdW5kZWZpbmVkXG4gICAgICAgIGxvZ2luSW5mby5sb2dpblN0YXJ0VFMgPSB1bmRlZmluZWRcbiAgICAgICAgbG9naW5JbmZvLmxvZ2luUmVzdWx0ID0gbG9naW5SZXN1bHRcbiAgICAgICAgcmV0dXJuIGxvZ2luUmVzdWx0XG4gICAgICB9IGVsc2UgaWYgKGN1ckxvZ2luSW5mbykge1xuICAgICAgICBpZiAoY3VyTG9naW5JbmZvLmxvZ2dlZEluICYmIGN1ckxvZ2luSW5mby5sb2dpblJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiBjdXJMb2dpbkluZm8ubG9naW5SZXN1bHRcbiAgICAgICAgfSBlbHNlIGlmIChjdXJMb2dpbkluZm8ubG9nZ2luZ0luUHJvbWlzZSkge1xuICAgICAgICAgIHJldHVybiBjdXJMb2dpbkluZm8ubG9nZ2luZ0luUHJvbWlzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignd3MgdW5leHBlY3RlZCBsb2dpbiBpbmZvJylcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd3cyBsb2dpbiBpbmZvIHJlc2V0JylcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2dpbkluZm8ubG9nZ2VkSW4gPSBmYWxzZVxuICAgICAgbG9naW5JbmZvLmxvZ2dpbmdJblByb21pc2UgPSB1bmRlZmluZWRcbiAgICAgIGxvZ2luSW5mby5sb2dpblN0YXJ0VFMgPSB1bmRlZmluZWRcbiAgICAgIGxvZ2luSW5mby5sb2dpblJlc3VsdCA9IHVuZGVmaW5lZFxuICAgICAgdGhyb3cgZVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0V3NTaWduID0gYXN5bmMgKCk6IFByb21pc2U8SVdzU2lnbj4gPT4ge1xuICAgIGlmICh0aGlzLl93c1NpZ24gJiYgdGhpcy5fd3NTaWduLmV4cGlyZWRUcyA+IERhdGUubm93KCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl93c1NpZ25cbiAgICB9XG4gICAgY29uc3QgZXhwaXJlZFRzID0gRGF0ZS5ub3coKSArIDYwMDAwXG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fY29udGV4dC5hcHBDb25maWcucmVxdWVzdC5zZW5kKCdhdXRoLndzV2ViU2lnbicsIHtydW50aW1lOiBnZXRSdW50aW1lKCl9KVxuXG4gICAgaWYgKHJlcy5jb2RlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFt0Y2ItanMtc2RrXSDojrflj5blrp7ml7bmlbDmja7mjqjpgIHnmbvlvZXnpajmja7lpLHotKU6ICR7cmVzLmNvZGV9YClcbiAgICB9XG5cbiAgICBpZiAocmVzLmRhdGEpIHtcbiAgICAgIGNvbnN0IHtzaWduU3RyLCB3c1VybCwgc2VjcmV0VmVyc2lvbiwgZW52SWR9ID0gcmVzLmRhdGFcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNpZ25TdHIsXG4gICAgICAgIHdzVXJsLFxuICAgICAgICBzZWNyZXRWZXJzaW9uLFxuICAgICAgICBlbnZJZCxcbiAgICAgICAgZXhwaXJlZFRzXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignW3RjYi1qcy1zZGtdIOiOt+WPluWunuaXtuaVsOaNruaOqOmAgeeZu+W9leelqOaNruWksei0pScpXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRXYWl0RXhwZWN0ZWRUaW1lb3V0TGVuZ3RoID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5fcnR0T2JzZXJ2ZWQubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gREVGQVVMVF9FWFBFQ1RFRF9FVkVOVF9XQUlUX1RJTUVcbiAgICB9XG5cbiAgICAvLyAxLjUgKiBSVFRcbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMuX3J0dE9ic2VydmVkLnJlZHVjZSgoYWNjLCBjdXIpID0+IGFjYyArIGN1cikgL1xuICAgICAgICB0aGlzLl9ydHRPYnNlcnZlZC5sZW5ndGgpICpcbiAgICAgIDEuNVxuICAgIClcbiAgfVxuXG4gIHByaXZhdGUgaGVhcnRiZWF0KGltbWVkaWF0ZT86IGJvb2xlYW4pIHtcbiAgICB0aGlzLmNsZWFySGVhcnRiZWF0KClcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5fcGluZ1RpbWVvdXRJZCA9IHNldFRpbWVvdXQoXG4gICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCF0aGlzLl93cyB8fCB0aGlzLl93cy5yZWFkeVN0YXRlICE9PSBXU19SRUFEWV9TVEFURS5PUEVOKSB7XG4gICAgICAgICAgICAvLyBubyBuZWVkIHRvIHBpbmdcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2xhc3RQaW5nU2VuZFRTID0gRGF0ZS5ub3coKVxuICAgICAgICAgIGF3YWl0IHRoaXMucGluZygpXG4gICAgICAgICAgdGhpcy5fcGluZ0ZhaWxlZCA9IDBcblxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICB0aGlzLl9wb25nVGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdwb25nIHRpbWVkIG91dCcpXG4gICAgICAgICAgICBpZiAodGhpcy5fcG9uZ01pc3NlZCA8IERFRkFVTFRfUE9OR19NSVNTX1RPTEVSQU5DRSkge1xuICAgICAgICAgICAgICB0aGlzLl9wb25nTWlzc2VkKytcbiAgICAgICAgICAgICAgdGhpcy5oZWFydGJlYXQodHJ1ZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGxvZ2ljYWwgcGVyY2VpdmVkIGNvbm5lY3Rpb24gbG9zdCwgZXZlbiB0aG91Z2ggd2Vic29ja2V0IGRpZCBub3QgcmVjZWl2ZSBlcnJvciBvciBjbG9zZSBldmVudFxuICAgICAgICAgICAgICB0aGlzLmluaXRXZWJTb2NrZXRDb25uZWN0aW9uKHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgdGhpcy5fY29udGV4dC5hcHBDb25maWcucmVhbHRpbWVQb25nV2FpdFRpbWVvdXQpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBpZiAodGhpcy5fcGluZ0ZhaWxlZCA8IERFRkFVTFRfUElOR19GQUlMX1RPTEVSQU5DRSkge1xuICAgICAgICAgICAgdGhpcy5fcGluZ0ZhaWxlZCsrXG4gICAgICAgICAgICB0aGlzLmhlYXJ0YmVhdCgpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoQ0xPU0VfRVZFTlRfQ09ERS5IZWFydGJlYXRQaW5nRXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaW1tZWRpYXRlID8gMCA6IHRoaXMuX2NvbnRleHQuYXBwQ29uZmlnLnJlYWx0aW1lUGluZ0ludGVydmFsXG4gICAgKVxuICB9XG5cbiAgcHJpdmF0ZSBwaW5nID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IG1zZzogSVJlcXVlc3RNZXNzYWdlUGluZ01zZyA9IHtcbiAgICAgIHdhdGNoSWQ6IHVuZGVmaW5lZCxcbiAgICAgIHJlcXVlc3RJZDogZ2VuUmVxdWVzdElkKCksXG4gICAgICBtc2dUeXBlOiAnUElORycsXG4gICAgICBtc2dEYXRhOiBudWxsXG4gICAgfVxuICAgIGF3YWl0IHRoaXMuc2VuZCh7XG4gICAgICBtc2dcbiAgICB9KVxuICAgIC8vIGNvbnNvbGUubG9nKCdwaW5nIHNlbnQnKVxuICB9XG5cbiAgcHJpdmF0ZSBvbldhdGNoU3RhcnQgPSAoY2xpZW50OiBWaXJ0dWFsV2ViU29ja2V0Q2xpZW50LCBxdWVyeUlEOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLl9xdWVyeUlkQ2xpZW50TWFwLnNldChxdWVyeUlELCBjbGllbnQpXG4gIH1cblxuICBwcml2YXRlIG9uV2F0Y2hDbG9zZSA9IChjbGllbnQ6IFZpcnR1YWxXZWJTb2NrZXRDbGllbnQsIHF1ZXJ5SUQ6IHN0cmluZykgPT4ge1xuICAgIGlmIChxdWVyeUlEKSB7XG4gICAgICB0aGlzLl9xdWVyeUlkQ2xpZW50TWFwLmRlbGV0ZShxdWVyeUlEKVxuICAgIH1cbiAgICB0aGlzLl93YXRjaElkQ2xpZW50TWFwLmRlbGV0ZShjbGllbnQud2F0Y2hJZClcbiAgICB0aGlzLl92aXJ0dWFsV1NDbGllbnQuZGVsZXRlKGNsaWVudClcblxuICAgIGlmICghdGhpcy5fdmlydHVhbFdTQ2xpZW50LnNpemUpIHtcbiAgICAgIC8vIG5vIG1vcmUgZXhpc3Rpbmcgd2F0Y2gsIHdlIHNob3VsZCByZWxlYXNlIHRoZSB3ZWJzb2NrZXQgY29ubmVjdGlvblxuICAgICAgdGhpcy5jbG9zZShDTE9TRV9FVkVOVF9DT0RFLk5vUmVhbHRpbWVMaXN0ZW5lcnMpXG4gICAgfVxuICB9XG59XG4iXX0=