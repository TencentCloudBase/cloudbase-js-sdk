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
import { utils } from '@cloudbase/utilities';
import { genRequestId } from './message';
import { CLOSE_EVENT_CODE, CLOSE_EVENT_CODE_INFO, getWSCloseError } from './ws-event';
import { ERR_CODE, TimeoutError, RealtimeErrorMessageError, CloudSDKError } from './error';
import { getWsClass, getRuntime } from './common';
var sleep = utils.sleep;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LWNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJzb2NrZXQtY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDbkUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBQzVDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFjeEMsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixxQkFBcUIsRUFDckIsZUFBZSxFQUNoQixNQUFNLFlBQVksQ0FBQTtBQUVuQixPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSx5QkFBeUIsRUFBQyxhQUFhLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFDekYsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFekMsSUFBQSxLQUFLLEdBQUssS0FBSyxNQUFWLENBQVc7QUE0RHhCLElBQU0sY0FBYyxHQUFHO0lBQ3JCLFVBQVUsRUFBRSxDQUFDO0lBQ2IsSUFBSSxFQUFFLENBQUM7SUFDUCxPQUFPLEVBQUUsQ0FBQztJQUNWLE1BQU0sRUFBRSxDQUFDO0NBQ1YsQ0FBQTtBQUVELElBQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFBO0FBQzFCLElBQU0sZ0NBQWdDLEdBQUcsSUFBSSxDQUFBO0FBQzdDLElBQU0sK0JBQStCLEdBQUcsS0FBSyxDQUFBO0FBQzdDLElBQU0scUJBQXFCLEdBQUcsQ0FBQyxDQUFBO0FBQy9CLElBQU0sNkJBQTZCLEdBQUcsS0FBSyxDQUFBO0FBRTNDLElBQU0sMkJBQTJCLEdBQUcsQ0FBQyxDQUFBO0FBQ3JDLElBQU0sMkJBQTJCLEdBQUcsQ0FBQyxDQUFBO0FBQ3JDLElBQU0scUJBQXFCLEdBQUcsSUFBSSxDQUFBO0FBRWxDO0lBK0JFLGlDQUFZLE9BQW1EO1FBQS9ELGlCQU1DO1FBcENPLHFCQUFnQixHQUFnQyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBRXpELHNCQUFpQixHQUF3QyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ2xFLHNCQUFpQixHQUF3QyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBUWxFLGdCQUFXLEdBQUcsQ0FBQyxDQUFBO1FBQ2YsZ0JBQVcsR0FBRyxDQUFDLENBQUE7UUFHZixZQUFPLEdBQXdDLElBQUksR0FBRyxFQUFFLENBQUE7UUFJeEQsdUJBQWtCLEdBQXFCLEVBQUUsQ0FBQTtRQUN6QyxvQkFBZSxHQUduQixJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ0wsaUJBQVksR0FBYSxFQUFFLENBQUE7UUFtQm5DLFNBQUksR0FBRyxVQUFnQixJQUFvQjs7O2dCQUN6QyxXQUFBLElBQUksT0FBTyxDQUFJLFVBQU8sUUFBUSxFQUFFLE9BQU87Ozs7OztvQ0FFakMsWUFBWSxHQUFHLEtBQUssQ0FBQTtvQ0FDcEIsWUFBWSxHQUFHLEtBQUssQ0FBQTtvQ0FFbEIsT0FBTyxHQUFvQixVQUMvQixLQUFzQzt3Q0FFdEMsWUFBWSxHQUFHLElBQUksQ0FBQTt3Q0FDbkIsU0FBUyxJQUFJLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQTt3Q0FDcEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO29DQUNqQixDQUFDLENBQUE7b0NBRUssTUFBTSxHQUFtQixVQUFDLEtBQVU7d0NBQ3hDLFlBQVksR0FBRyxJQUFJLENBQUE7d0NBQ25CLFNBQVMsSUFBSSxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUE7d0NBQ3BDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQ0FDaEIsQ0FBQyxDQUFBO29DQUVELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTt3Q0FFaEIsU0FBUyxHQUFHLFVBQVUsQ0FBQzs7Ozs2REFDakIsQ0FBQSxDQUFDLFlBQVksSUFBSSxDQUFDLFlBQVksQ0FBQSxFQUE5QixjQUE4Qjt3REFHaEMsV0FBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUE7O3dEQUFkLFNBQWMsQ0FBQTt3REFDZCxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsWUFBWSxFQUFFOzREQUNsQyxNQUFNLENBQUMsSUFBSSxZQUFZLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFBO3lEQUNuRDs7Ozs7NkNBRUosRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7cUNBQ2pCOzs7O3lDQWFLLElBQUksQ0FBQyxjQUFjLEVBQW5CLGNBQW1CO29DQUNyQixXQUFNLElBQUksQ0FBQyxjQUFjLEVBQUE7O29DQUF6QixTQUF5QixDQUFBOzs7b0NBRzNCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO3dDQUNiLE1BQU0sQ0FDSixJQUFJLEtBQUssQ0FDUCwrREFBK0QsQ0FDaEUsQ0FDRixDQUFBO3dDQUNELFdBQU07cUNBQ1A7b0NBRUQsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxjQUFjLENBQUMsSUFBSSxFQUFFO3dDQUMvQyxNQUFNLENBQ0osSUFBSSxLQUFLLENBQ1AsNEJBQTBCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSwyQkFBd0IsQ0FDdEUsQ0FDRixDQUFBO3dDQUNELFdBQU07cUNBQ1A7b0NBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO3dDQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRTs0Q0FDM0MsT0FBTyxTQUFBOzRDQUNQLE1BQU0sUUFBQTs0Q0FDTixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7eUNBQ2IsQ0FBQyxDQUFBO3FDQUN4Qjs7OztvQ0FJQyxXQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUE7O29DQUE3QyxTQUE2QyxDQUFBO29DQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTt3Q0FDdEIsT0FBTyxFQUFFLENBQUE7cUNBQ1Y7Ozs7b0NBRUQsSUFBSSxLQUFHLEVBQUU7d0NBQ1AsTUFBTSxDQUFDLEtBQUcsQ0FBQyxDQUFBO3dDQUNYLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTs0Q0FDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTt5Q0FDaEQ7cUNBQ0Y7Ozs7O29DQStCSCxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUE7Ozs7O3lCQUVaLENBQUMsRUFBQTs7YUFBQSxDQUFBO1FBV0osb0JBQWUsR0FBRyxVQUFDLEtBQVU7WUFDM0IsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07Z0JBQ2xDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDOUIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUE7UUFFRCxpQkFBWSxHQUFHLFVBQUMsT0FBcUM7WUFDbkQsQ0FBQztZQUFBLENBQUMsT0FBTyxJQUFJLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07Z0JBQ2hELE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUNoQixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQTtRQUVELGtCQUFhLEdBQUcsVUFBQyxPQUFxQztZQUNwRCxDQUFDO1lBQUEsQ0FBQyxPQUFPLElBQUksS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtnQkFDaEQsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO1lBQ2pCLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFBO1FBdUJPLDRCQUF1QixHQUFHLFVBQ2hDLFNBQWtCLEVBQ2xCLGdCQUE2QztZQUE3QyxpQ0FBQSxFQUFBLG1CQUEyQixLQUFJLENBQUMsYUFBYTs7Ozs7Ozs0QkFHN0MsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtnQ0FDckMsV0FBTTs2QkFDUDs0QkFFRCxJQUFJLFNBQVMsRUFBRTtnQ0FDYixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQTs2QkFDNUI7NEJBRUQsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO2dDQUV2QixXQUFPLElBQUksQ0FBQyxjQUFjLEVBQUE7NkJBQzNCOzRCQVFELElBQUksU0FBUyxFQUFFO2dDQUNiLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTs2QkFDcEI7NEJBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBOzRCQUUvQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksT0FBTyxDQUFPLFVBQU8sT0FBTyxFQUFFLE1BQU07Ozs7Ozs7NENBZ0IzQyxXQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBQTs7NENBQS9CLFdBQVMsU0FBc0I7NENBT3JDLFdBQU0sSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPO29EQVl2QixJQUFNLEdBQUcsR0FBRyxRQUFNLENBQUMsS0FBSyxJQUFJLGtDQUFrQyxDQUFDO29EQUMvRCxJQUFNLE9BQU8sR0FBRyxVQUFVLEVBQUUsQ0FBQztvREFDN0IsS0FBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtvREFDMUQsT0FBTyxFQUFFLENBQUE7Z0RBQ1gsQ0FBQyxDQUFDLEVBQUE7OzRDQWhCRixTQWdCRSxDQUFBO2lEQUVDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFoQixjQUFnQjs0Q0FDakIsV0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFBOzs0Q0FBeEIsU0FBd0IsQ0FBQTs7Z0RBUzFCLFdBQU0sSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUE7OzRDQUEvQixTQUErQixDQUFBOzRDQUMvQixPQUFPLEVBQUUsQ0FBQTs0Q0FFVCxJQUFJLFNBQVMsRUFBRTtnREFDYixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7Z0RBQ3BCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFBOzZDQUM3Qjs7Ozs0Q0FHRCxPQUFPLENBQUMsS0FBSyxDQUFDLGlEQUFpRCxFQUFFLEdBQUMsQ0FBQyxDQUFBO2lEQUcvRCxDQUFBLGdCQUFnQixHQUFHLENBQUMsQ0FBQSxFQUFwQixjQUFvQjs0Q0FJaEIsV0FBVyxHQUFHLElBQUksQ0FBQTs0Q0FxQnhCLElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFBO2lEQUUzQixXQUFXLEVBQVgsY0FBVzs0Q0FNYixXQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBQTs7NENBQXBDLFNBQW9DLENBQUE7NENBQ3BDLElBQUksU0FBUyxFQUFFO2dEQUNiLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFBOzZDQUM3Qjs7OzRDQUdILE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxFQUFFLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7Ozs0Q0FFdEUsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFBOzRDQUVULElBQUksU0FBUyxFQUFFO2dEQUNiLElBQUksQ0FBQyxlQUFlLENBQ2xCLElBQUksYUFBYSxDQUFDO29EQUNoQixPQUFPLEVBQUUsUUFBUSxDQUFDLG1EQUE2RDtvREFDL0UsTUFBTSxFQUFFLEdBQUM7aURBQ1YsQ0FBQyxDQUNILENBQUE7NkNBQ0Y7Ozs7OztpQ0FHTixDQUFDLENBQUE7Ozs7NEJBS0EsV0FBTSxJQUFJLENBQUMsY0FBYyxFQUFBOzs0QkFBekIsU0FBeUIsQ0FBQTs0QkFFekIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFDLEVBQVc7b0NBQVQsT0FBTyxhQUFBO2dDQUFPLE9BQUEsT0FBTyxFQUFFOzRCQUFULENBQVMsQ0FBQyxDQUFBOzs7OzRCQUUzRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBVTtvQ0FBUixNQUFNLFlBQUE7Z0NBQU8sT0FBQSxNQUFNLEVBQUU7NEJBQVIsQ0FBUSxDQUFDLENBQUE7Ozs0QkFFekQsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUE7NEJBQy9CLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUE7Ozs7OztTQVEvQixDQUFBO1FBRU8sdUJBQWtCLEdBQUc7WUFDM0IsT0FBQSxJQUFJLE9BQU8sQ0FBTyxVQUFDLE9BQU8sRUFBRSxNQUFNO2dCQUNoQyxJQUFJLENBQUMsS0FBSSxDQUFDLEdBQUcsRUFBRTtvQkFDYixNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUE7aUJBQzdEO2dCQUVELElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQTtnQkFFcEIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsVUFBQSxLQUFLO29CQUlyQixPQUFPLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLEtBQUssQ0FBQyxDQUFBO29CQUNoRCxRQUFRLEdBQUcsSUFBSSxDQUFBO29CQUNmLE9BQU8sRUFBRSxDQUFBO2dCQUNYLENBQUMsQ0FBQTtnQkFFRCxLQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxVQUFBLEtBQUs7b0JBSXRCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtvQkFJeEIsSUFBSSxDQUFDLFFBQVEsRUFBRTt3QkFFYixPQUFPLENBQUMsS0FBSyxDQUFDLGdEQUFnRCxFQUFFLEtBQUssQ0FBQyxDQUFBO3dCQVF0RSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7cUJBQ2Q7eUJBQU07d0JBRUwsT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsRUFBRSxLQUFLLENBQUMsQ0FBQTt3QkFPbEQsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO3dCQUNyQixLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTs0QkFDbEMsT0FBQSxNQUFNLENBQUMsY0FBYyxDQUNuQixJQUFJLGFBQWEsQ0FBQztnQ0FDaEIsT0FBTyxFQUFFLFFBQVEsQ0FBQyx5REFBbUU7Z0NBQ3JGLE1BQU0sRUFBRSxLQUFLOzZCQUNkLENBQUMsQ0FDSDt3QkFMRCxDQUtDLENBQ0YsQ0FBQTtxQkFDRjtnQkFDSCxDQUFDLENBQUE7Z0JBR0QsS0FBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsVUFBQSxVQUFVO29CQUkzQixPQUFPLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLFVBQVUsQ0FBQyxDQUFBO29CQVd0RCxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7b0JBRXhCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtvQkFDckIsUUFBUSxVQUFVLENBQUMsSUFBSSxFQUFFO3dCQUN2QixLQUFLLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7NEJBRXhDLE1BQUs7eUJBQ047d0JBQ0QsS0FBSyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzRCQUV6QyxNQUFLO3lCQUNOO3dCQUNELEtBQUssZ0JBQWdCLENBQUMsa0JBQWtCLENBQUM7d0JBQ3pDLEtBQUssZ0JBQWdCLENBQUMseUJBQXlCLENBQUM7d0JBQ2hELEtBQUssZ0JBQWdCLENBQUMsYUFBYSxDQUFDO3dCQUNwQyxLQUFLLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDOzRCQU1yQyxJQUFJLEtBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFO2dDQUUxQixLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTs2QkFDdkQ7aUNBQU07Z0NBQ0wsS0FBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7NkJBQ3ZEOzRCQUNELE1BQUs7eUJBQ047d0JBQ0QsS0FBSyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOzRCQUN0QyxLQUFJLENBQUMsZUFBZSxDQUNsQixlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQ3BELENBQUE7NEJBQ0QsTUFBSzt5QkFDTjt3QkFDRCxPQUFPLENBQUMsQ0FBQzs0QkFFUCxJQUFJLEtBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFO2dDQUUxQixLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTs2QkFDdkQ7aUNBQU07Z0NBQ0wsS0FBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7NkJBQ3ZEO3lCQUdGO3FCQUNGO2dCQUNILENBQUMsQ0FBQTtnQkFFRCxLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxVQUFBLEdBQUc7b0JBSXRCLElBQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7b0JBR3ZCLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtvQkFFaEIsSUFBSSxHQUFxQixDQUFBO29CQUV6QixJQUFJO3dCQUNGLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQWdCLENBQUMsQ0FBQTtxQkFDbkM7b0JBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBOEMsQ0FBRyxDQUFDLENBQUE7cUJBQ25FO29CQVNELElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQUU7d0JBRTNCLElBQUksY0FBWSxHQUFHLElBQUksQ0FBQTt3QkFDdkIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7NEJBQ2hDLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxHQUFHLENBQUMsT0FBTyxFQUFFO2dDQUNoQyxjQUFZLEdBQUcsSUFBSSxDQUFBOzZCQUNwQjt3QkFDSCxDQUFDLENBQUMsQ0FBQTt3QkFFRixJQUFJLGNBQVksRUFBRTs0QkFDaEIsY0FBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7eUJBQ25DO3FCQUNGO29CQUVELElBQU0sZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO29CQUNoRSxJQUFJLGdCQUFnQixFQUFFO3dCQUNwQixJQUFJOzRCQUNGLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQUU7Z0NBQzNCLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7NkJBQzVEO2lDQUFNO2dDQUNMLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTs2QkFDOUI7eUJBQ0Y7d0JBQUMsT0FBTyxDQUFDLEVBQUU7NEJBRVYsT0FBTyxDQUFDLEtBQUssQ0FDWCxxREFBcUQsRUFDckQsQ0FBQyxDQUNGLENBQUE7eUJBQ0Y7Z0NBQVM7NEJBQ1IsS0FBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO3lCQUMzQzt3QkFDRCxJQUFJLGdCQUFnQixDQUFDLGFBQWEsRUFBRTs0QkFDbEMsT0FBTTt5QkFDUDtxQkFDRjtvQkFFRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO3dCQUMxQixJQUFJLEtBQUksQ0FBQyxlQUFlLEVBQUU7NEJBQ3hCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFBOzRCQUM3QyxJQUFJLEdBQUcsR0FBRywrQkFBK0IsRUFBRTtnQ0FFekMsT0FBTyxDQUFDLElBQUksQ0FBQyx3Q0FBc0MsR0FBSyxDQUFDLENBQUE7Z0NBQ3pELE9BQU07NkJBQ1A7NEJBQ0QsSUFBSSxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxnQkFBZ0IsRUFBRTtnQ0FDaEQsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQ3RCLENBQUMsRUFDRCxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsR0FBRyxDQUFDLENBQ2hELENBQUE7NkJBQ0Y7NEJBQ0QsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7eUJBQzVCO3dCQUNELE9BQU07cUJBQ1A7b0JBRUQsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sSUFBSSxLQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtvQkFDbkUsSUFBSSxNQUFNLEVBQUU7d0JBQ1YsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtxQkFDdEI7eUJBQU07d0JBR0wsT0FBTyxDQUFDLEtBQUssQ0FDWCxtRUFBaUUsR0FBRyxDQUFDLE9BQU8sT0FBSSxFQUNoRixHQUFHLENBQ0osQ0FBQTt3QkFFRCxRQUFRLEdBQUcsQ0FBQyxPQUFPLEVBQUU7NEJBQ25CLEtBQUssWUFBWSxDQUFDOzRCQUNsQixLQUFLLFlBQVksQ0FBQzs0QkFDbEIsS0FBSyxhQUFhLENBQUMsQ0FBQztnQ0FDbEIsTUFBTSxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQ0FDeEQsSUFBSSxNQUFNLEVBQUU7b0NBQ1YsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtpQ0FDdEI7Z0NBQ0QsTUFBSzs2QkFDTjs0QkFDRCxPQUFPLENBQUMsQ0FBQztnQ0FDUCxLQUF3QixVQUE0QyxFQUE1QyxLQUFBLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQTVDLGNBQTRDLEVBQTVDLElBQTRDLEVBQUU7b0NBQTNELElBQUEsV0FBUyxFQUFQLFFBQU0sUUFBQTtvQ0FFakIsUUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQ0FDckIsTUFBSztpQ0FDTjs2QkFDRjt5QkFDRjtxQkFDRjtnQkFDSCxDQUFDLENBQUE7Z0JBRUQsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO1lBQ2xCLENBQUMsQ0FBQztRQXpPRixDQXlPRSxDQUFBO1FBRUksa0JBQWEsR0FBRztZQUN0QixPQUFPLE9BQU8sQ0FBQyxLQUFJLENBQUMsR0FBRyxJQUFJLEtBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN6RSxDQUFDLENBQUE7UUFFTyxvQkFBZSxHQUFHOzs7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFO29CQUN4QixXQUFNO2lCQUNQO2dCQUVELElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDdkIsV0FBTyxJQUFJLENBQUMsY0FBYyxFQUFBO2lCQUMzQjtnQkFFRCxXQUFPLElBQUksT0FBTyxDQUFPLFVBQUMsT0FBTyxFQUFFLE1BQU07d0JBQ3ZDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7NEJBQzNCLE9BQU8sU0FBQTs0QkFDUCxNQUFNLFFBQUE7eUJBQ1AsQ0FBQyxDQUFBO29CQUNKLENBQUMsQ0FBQyxFQUFBOzthQUNILENBQUE7UUFFTyxhQUFRLEdBQUcsVUFDakIsS0FBYyxFQUNkLE9BQWlCOzs7Ozs7d0JBRWpCLElBQUksQ0FBQyxPQUFPLEVBQUU7NEJBRVosSUFBSSxLQUFLLEVBQUU7Z0NBQ0gsY0FBWSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQ0FDekMsSUFBSSxXQUFTLEVBQUU7b0NBQ2IsSUFBSSxXQUFTLENBQUMsUUFBUSxJQUFJLFdBQVMsQ0FBQyxXQUFXLEVBQUU7d0NBSS9DLFdBQU8sV0FBUyxDQUFDLFdBQVcsRUFBQTtxQ0FDN0I7eUNBQU0sSUFBSSxXQUFTLENBQUMsZ0JBQWdCLEVBQUU7d0NBQ3JDLFdBQU8sV0FBUyxDQUFDLGdCQUFnQixFQUFBO3FDQUNsQztpQ0FDRjs2QkFDRjtpQ0FBTTtnQ0FDQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQ0FDOUMsSUFBSSxpQkFBaUIsYUFBakIsaUJBQWlCLHVCQUFqQixpQkFBaUIsQ0FBRSxnQkFBZ0IsRUFBRTtvQ0FDdkMsV0FBTyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBQTtpQ0FDMUM7NkJBQ0Y7eUJBQ0Y7d0JBR0ssT0FBTyxHQUFHLElBQUksT0FBTyxDQUFlLFVBQU8sT0FBTyxFQUFFLE1BQU07Ozs7Ozt3Q0FJN0MsV0FBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dDQUEvQixNQUFNLEdBQUcsU0FBc0I7d0NBRy9CLE9BQU8sR0FBNkI7NENBQ3hDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUU7NENBQ3pCLFdBQVcsRUFBRSxFQUFFOzRDQUdmLFFBQVEsRUFBRSxLQUFLOzRDQUNmLFVBQVUsRUFBRSxFQUFFOzRDQUNkLFdBQVcsRUFBRSxFQUFFO3lDQUNoQixDQUFBO3dDQUNLLFFBQVEsR0FBNEI7NENBQ3hDLE9BQU8sRUFBRSxTQUFTOzRDQUNsQixTQUFTLEVBQUUsWUFBWSxFQUFFOzRDQUN6QixPQUFPLEVBQUUsT0FBTzs0Q0FDaEIsT0FBTyxTQUFBOzRDQUNQLFNBQVMsRUFBRTtnREFDVCxPQUFPLEVBQUUsVUFBVSxFQUFFO2dEQUNyQixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87Z0RBQ3ZCLGFBQWEsRUFBRSxNQUFNLENBQUMsYUFBYTs2Q0FDcEM7eUNBQ0YsQ0FBQTt3Q0FDbUIsV0FBTSxJQUFJLENBQUMsSUFBSSxDQUE4QjtnREFDL0QsR0FBRyxFQUFFLFFBQVE7Z0RBQ2IsWUFBWSxFQUFFLElBQUk7Z0RBQ2xCLGFBQWEsRUFBRSxJQUFJO2dEQUNuQixPQUFPLEVBQUUscUJBQXFCOzZDQUMvQixDQUFDLEVBQUE7O3dDQUxJLFdBQVcsR0FBRyxTQUtsQjt3Q0FFRixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7NENBRTdCLE9BQU8sQ0FBQztnREFDTixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7NkNBQ3BCLENBQUMsQ0FBQTt5Q0FDSDs2Q0FBTTs0Q0FFTCxNQUFNLENBQ0osSUFBSSxLQUFLLENBQ0osV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLFNBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFTLENBQzdELENBQ0YsQ0FBQTt5Q0FDRjs7Ozt3Q0FFRCxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUE7Ozs7OzZCQUVaLENBQUMsQ0FBQTt3QkFHRSxTQUFTLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO3dCQUUxQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO3dCQUUvQixJQUFJLFNBQVMsRUFBRTs0QkFDYixTQUFTLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQTs0QkFDMUIsU0FBUyxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQTs0QkFDcEMsU0FBUyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUE7eUJBQ3RDOzZCQUFNOzRCQUNMLFNBQVMsR0FBRztnQ0FDVixRQUFRLEVBQUUsS0FBSztnQ0FDZixnQkFBZ0IsRUFBRSxPQUFPO2dDQUN6QixZQUFZLGNBQUE7NkJBQ2IsQ0FBQTs0QkFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFBO3lCQUN6Qzs7Ozt3QkFrQnFCLFdBQU0sT0FBTyxFQUFBOzt3QkFBM0IsV0FBVyxHQUFHLFNBQWE7d0JBQzNCLFlBQVksR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7d0JBQ3JELElBQ0UsWUFBWTs0QkFDWixZQUFZLEtBQUssU0FBUzs0QkFDMUIsWUFBWSxDQUFDLFlBQVksS0FBSyxZQUFZLEVBQzFDOzRCQUNBLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBOzRCQUN6QixTQUFTLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFBOzRCQUN0QyxTQUFTLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQTs0QkFDbEMsU0FBUyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUE7NEJBQ25DLFdBQU8sV0FBVyxFQUFBO3lCQUNuQjs2QkFBTSxJQUFJLFlBQVksRUFBRTs0QkFDdkIsSUFBSSxZQUFZLENBQUMsUUFBUSxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUU7Z0NBQ3JELFdBQU8sWUFBWSxDQUFDLFdBQVcsRUFBQTs2QkFDaEM7aUNBQU0sSUFBSSxZQUFZLENBQUMsZ0JBQWdCLEVBQUU7Z0NBQ3hDLFdBQU8sWUFBWSxDQUFDLGdCQUFnQixFQUFBOzZCQUNyQztpQ0FBTTtnQ0FDTCxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUE7NkJBQzVDO3lCQUNGOzZCQUFNOzRCQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQTt5QkFDdkM7Ozs7d0JBRUQsU0FBUyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7d0JBQzFCLFNBQVMsQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUE7d0JBQ3RDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFBO3dCQUNsQyxTQUFTLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQTt3QkFDakMsTUFBTSxHQUFDLENBQUE7Ozs7YUFFVixDQUFBO1FBRU8sY0FBUyxHQUFHOzs7Ozt3QkFDbEIsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRTs0QkFDdkQsV0FBTyxJQUFJLENBQUMsT0FBTyxFQUFBO3lCQUNwQjt3QkFDSyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQTt3QkFDeEIsV0FBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFDLENBQUMsRUFBQTs7d0JBQTNGLEdBQUcsR0FBRyxTQUFxRjt3QkFFakcsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFOzRCQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsd0dBQWdDLEdBQUcsQ0FBQyxJQUFNLENBQUMsQ0FBQTt5QkFDNUQ7d0JBRUQsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFOzRCQUNOLEtBQXlDLEdBQUcsQ0FBQyxJQUFJLEVBQWhELE9BQU8sYUFBQSxFQUFFLEtBQUssV0FBQSxFQUFFLGFBQWEsbUJBQUEsRUFBRSxLQUFLLFdBQUEsQ0FBWTs0QkFDdkQsV0FBTztvQ0FDTCxPQUFPLFNBQUE7b0NBQ1AsS0FBSyxPQUFBO29DQUNMLGFBQWEsZUFBQTtvQ0FDYixLQUFLLE9BQUE7b0NBQ0wsU0FBUyxXQUFBO2lDQUNWLEVBQUE7eUJBQ0Y7NkJBQU07NEJBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO3lCQUMvQzs7OzthQUNGLENBQUE7UUFFTyxpQ0FBNEIsR0FBRztZQUNyQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7Z0JBQzdCLE9BQU8sZ0NBQWdDLENBQUE7YUFDeEM7WUFHRCxPQUFPLENBQ0wsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHLElBQUssT0FBQSxHQUFHLEdBQUcsR0FBRyxFQUFULENBQVMsQ0FBQztnQkFDaEQsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7Z0JBQzNCLEdBQUcsQ0FDSixDQUFBO1FBQ0gsQ0FBQyxDQUFBO1FBeUNPLFNBQUksR0FBRzs7Ozs7d0JBQ1AsR0FBRyxHQUEyQjs0QkFDbEMsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLFNBQVMsRUFBRSxZQUFZLEVBQUU7NEJBQ3pCLE9BQU8sRUFBRSxNQUFNOzRCQUNmLE9BQU8sRUFBRSxJQUFJO3lCQUNkLENBQUE7d0JBQ0QsV0FBTSxJQUFJLENBQUMsSUFBSSxDQUFDO2dDQUNkLEdBQUcsS0FBQTs2QkFDSixDQUFDLEVBQUE7O3dCQUZGLFNBRUUsQ0FBQTs7OzthQUVILENBQUE7UUFFTyxpQkFBWSxHQUFHLFVBQUMsTUFBOEIsRUFBRSxPQUFlO1lBQ3JFLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzdDLENBQUMsQ0FBQTtRQUVPLGlCQUFZLEdBQUcsVUFBQyxNQUE4QixFQUFFLE9BQWU7WUFDckUsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTthQUN2QztZQUNELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzdDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7WUFFcEMsSUFBSSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7Z0JBRS9CLEtBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQTthQUNqRDtRQUNILENBQUMsQ0FBQTtRQTExQkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsWUFBWSxJQUFJLHFCQUFxQixDQUFBO1FBRWxFLElBQUksQ0FBQyxrQkFBa0I7WUFDckIsT0FBTyxDQUFDLGlCQUFpQixJQUFJLDZCQUE2QixDQUFBO1FBQzVELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQTtJQUNqQyxDQUFDO0lBRUQsZ0RBQWMsR0FBZDtRQUNFLElBQUksQ0FBQyxjQUFjLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUN4RCxJQUFJLENBQUMsY0FBYyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDMUQsQ0FBQztJQTRIRCx1Q0FBSyxHQUFMLFVBQU0sSUFBc0I7UUFDMUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBRXJCLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN0RCxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQTtTQUNyQjtJQUNILENBQUM7SUFvQkQsdUNBQUssR0FBTCxVQUFNLE9BQXdCO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDcEM7UUFFRCxJQUFNLGFBQWEsR0FBRyxJQUFJLHNCQUFzQix1QkFDM0MsT0FBTyxLQUNWLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUNwQixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFDakMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQ3JDLDRCQUE0QixFQUFFLElBQUksQ0FBQyw0QkFBNEIsRUFDL0QsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQy9CLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUMvQixLQUFLLEVBQUUsSUFBSSxJQUNYLENBQUE7UUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQTtRQUNoRSxPQUFPLGFBQWEsQ0FBQyxRQUFRLENBQUE7SUFDL0IsQ0FBQztJQW1tQk8sMkNBQVMsR0FBakIsVUFBa0IsU0FBbUI7UUFBckMsaUJBcUNDO1FBcENDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtRQUVyQixJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FDOUI7Ozs7Ozs7d0JBRUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssY0FBYyxDQUFDLElBQUksRUFBRTs0QkFFNUQsV0FBTTt5QkFDUDt3QkFFRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTt3QkFDakMsV0FBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUFqQixTQUFpQixDQUFBO3dCQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQTt3QkFHcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUM7NEJBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTs0QkFDL0IsSUFBSSxLQUFJLENBQUMsV0FBVyxHQUFHLDJCQUEyQixFQUFFO2dDQUNsRCxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7Z0NBQ2xCLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7NkJBQ3JCO2lDQUFNO2dDQUVMLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTs2QkFDbkM7d0JBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLENBQUE7Ozs7d0JBRW5ELElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRywyQkFBMkIsRUFBRTs0QkFDbEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBOzRCQUNsQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7eUJBQ2pCOzZCQUFNOzRCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQTt5QkFDaEQ7Ozs7O2FBRUosRUFDRCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQzdELENBQUE7SUFDSCxDQUFDO0lBK0JILDhCQUFDO0FBQUQsQ0FBQyxBQTMzQkQsSUEyM0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlydHVhbFdlYlNvY2tldENsaWVudCB9IGZyb20gJy4vdmlydHVhbC13ZWJzb2NrZXQtY2xpZW50J1xuaW1wb3J0IHsgdXRpbHMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcydcbmltcG9ydCB7IGdlblJlcXVlc3RJZCB9IGZyb20gJy4vbWVzc2FnZSdcbmltcG9ydCB7XG4gIElEYXRhYmFzZVNlcnZpY2VDb250ZXh0LFxufSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2RhdGFiYXNlJ1xuaW1wb3J0IHtcbiAgSVdhdGNoT3B0aW9ucyxcbiAgREJSZWFsdGltZUxpc3RlbmVyLFxuICBJUmVxdWVzdE1lc3NhZ2UsXG4gIElSZXNwb25zZU1lc3NhZ2UsXG4gIElSZXF1ZXN0TWVzc2FnZVBpbmdNc2csXG4gIElSZXF1ZXN0TWVzc2FnZUxvZ2luTXNnLFxuICBJUmVzcG9uc2VNZXNzYWdlTG9naW5SZXNNc2csXG4gIElSZXF1ZXN0TWVzc2FnZUxvZ2luRGF0YVxufSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL3JlYWx0aW1lJ1xuaW1wb3J0IHtcbiAgQ0xPU0VfRVZFTlRfQ09ERSxcbiAgQ0xPU0VfRVZFTlRfQ09ERV9JTkZPLFxuICBnZXRXU0Nsb3NlRXJyb3Jcbn0gZnJvbSAnLi93cy1ldmVudCdcblxuaW1wb3J0IHsgRVJSX0NPREUsIFRpbWVvdXRFcnJvciwgUmVhbHRpbWVFcnJvck1lc3NhZ2VFcnJvcixDbG91ZFNES0Vycm9yIH0gZnJvbSAnLi9lcnJvcidcbmltcG9ydCB7IGdldFdzQ2xhc3MsIGdldFJ1bnRpbWUgfSBmcm9tICcuL2NvbW1vbidcblxuY29uc3QgeyBzbGVlcCB9ID0gdXRpbHM7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlYWx0aW1lV2ViU29ja2V0Q2xpZW50Q29uc3RydWN0b3JPcHRpb25zIHtcbiAgbWF4UmVjb25uZWN0PzogbnVtYmVyXG4gIHJlY29ubmVjdEludGVydmFsPzogbnVtYmVyXG4gIGNvbnRleHQ6IElEYXRhYmFzZVNlcnZpY2VDb250ZXh0XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNpZ25hdHVyZSB7XG4gIGVudklkOiBzdHJpbmdcbiAgc2VjcmV0VmVyc2lvbjogbnVtYmVyXG4gIHNpZ25TdHI6IHN0cmluZ1xuICB3c1VybDogc3RyaW5nXG4gIGV4cGlyZVRTOiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTG9naW5JbmZvIHtcbiAgbG9nZ2VkSW46IGJvb2xlYW5cbiAgbG9nZ2luZ0luUHJvbWlzZT86IFByb21pc2U8SUxvZ2luUmVzdWx0PlxuICBsb2dpblN0YXJ0VFM/OiBudW1iZXJcbiAgbG9naW5SZXN1bHQ/OiBJTG9naW5SZXN1bHRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTG9naW5SZXN1bHQge1xuICBlbnZJZDogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVdTU2VuZE9wdGlvbnMge1xuICBtc2c6IElSZXF1ZXN0TWVzc2FnZVxuICB3YWl0UmVzcG9uc2U/OiBib29sZWFuXG4gIC8vIHdoZW4gd2FpdFJlc3BvbnNlIGlzIHNldCB0byB0cnVlLCBpZiBza2lwT25NZXNzYWdlIGlzIHRydWUsIGdlbmVyYWwgb25NZXNzYWdlIGhhbmRsZXIgd2lsbCBiZSBza2lwcGVkXG4gIHNraXBPbk1lc3NhZ2U/OiBib29sZWFuXG4gIHRpbWVvdXQ/OiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJV1NXYXRjaE9wdGlvbnMgZXh0ZW5kcyBJV2F0Y2hPcHRpb25zIHtcbiAgZW52SWQ/OiBzdHJpbmdcbiAgY29sbGVjdGlvbk5hbWU6IHN0cmluZ1xuICBxdWVyeTogc3RyaW5nXG4gIGxpbWl0PzogbnVtYmVyXG4gIG9yZGVyQnk/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+XG59XG5cbmludGVyZmFjZSBJUmVzb2x2ZVJlamVjdCB7XG4gIHJlc29sdmU6ICh2YWx1ZT86IGFueSB8IFByb21pc2VMaWtlPGFueT4gfCB1bmRlZmluZWQpID0+IHZvaWRcbiAgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkXG59XG5cbmludGVyZmFjZSBJUmVzcG9uc2VXYWl0U3BlYyBleHRlbmRzIElSZXNvbHZlUmVqZWN0IHtcbiAgc2tpcE9uTWVzc2FnZT86IGJvb2xlYW5cbn1cblxuaW50ZXJmYWNlIElXc1NpZ24ge1xuICBzaWduU3RyOiBzdHJpbmcsXG4gIHdzVXJsOiBzdHJpbmcsXG4gIHNlY3JldFZlcnNpb246IHN0cmluZ1xuICBlbnZJZDogc3RyaW5nXG4gIGV4cGlyZWRUczogbnVtYmVyXG59XG5cbmNvbnN0IFdTX1JFQURZX1NUQVRFID0ge1xuICBDT05ORUNUSU5HOiAwLFxuICBPUEVOOiAxLFxuICBDTE9TSU5HOiAyLFxuICBDTE9TRUQ6IDNcbn1cblxuY29uc3QgTUFYX1JUVF9PQlNFUlZFRCA9IDNcbmNvbnN0IERFRkFVTFRfRVhQRUNURURfRVZFTlRfV0FJVF9USU1FID0gNTAwMFxuY29uc3QgREVGQVVMVF9VTlRSVVNURURfUlRUX1RIUkVTSE9MRCA9IDEwMDAwXG5jb25zdCBERUZBVUxUX01BWF9SRUNPTk5FQ1QgPSA1XG5jb25zdCBERUZBVUxUX1dTX1JFQ09OTkVDVF9JTlRFUlZBTCA9IDEwMDAwXG4vLyBjb25zdCBERUZBVUxUX1dTX1JFQ09OTkVDVF9NQVhfVkFMSURfSU5URVJWQUwgPSAzICogNjAgKiAxMDAwXG5jb25zdCBERUZBVUxUX1BJTkdfRkFJTF9UT0xFUkFOQ0UgPSAyXG5jb25zdCBERUZBVUxUX1BPTkdfTUlTU19UT0xFUkFOQ0UgPSAyXG5jb25zdCBERUZBVUxUX0xPR0lOX1RJTUVPVVQgPSA1MDAwXG5cbmV4cG9ydCBjbGFzcyBSZWFsdGltZVdlYlNvY2tldENsaWVudCB7XG4gIHByaXZhdGUgX3ZpcnR1YWxXU0NsaWVudDogU2V0PFZpcnR1YWxXZWJTb2NrZXRDbGllbnQ+ID0gbmV3IFNldCgpXG4gIC8vIGFmdGVyIGxpc3RlbmVyIGluaXRXYXRjaCwgdGhlIGxpc3RlbmVyIGhhcyB0aGUgcXVlcnlJRCBhbmQgY2FuIHN0b3JlIGl0IGhlcmVcbiAgcHJpdmF0ZSBfcXVlcnlJZENsaWVudE1hcDogTWFwPHN0cmluZywgVmlydHVhbFdlYlNvY2tldENsaWVudD4gPSBuZXcgTWFwKClcbiAgcHJpdmF0ZSBfd2F0Y2hJZENsaWVudE1hcDogTWFwPHN0cmluZywgVmlydHVhbFdlYlNvY2tldENsaWVudD4gPSBuZXcgTWFwKClcbiAgcHJpdmF0ZSBfbWF4UmVjb25uZWN0OiBudW1iZXJcbiAgLy8gcHJpdmF0ZSBfYXZhaWxhYmxlUmV0cmllczogbnVtYmVyXG4gIHByaXZhdGUgX3JlY29ubmVjdEludGVydmFsOiBudW1iZXJcbiAgcHJpdmF0ZSBfY29udGV4dDogSURhdGFiYXNlU2VydmljZUNvbnRleHRcbiAgLy8gcHJpdmF0ZSBfd3M/OiBXWE5TLlNvY2tldC5JU29ja2V0VGFza1xuICBwcml2YXRlIF93cz86IGFueVxuICBwcml2YXRlIF9sYXN0UGluZ1NlbmRUUz86IG51bWJlclxuICBwcml2YXRlIF9waW5nRmFpbGVkID0gMFxuICBwcml2YXRlIF9wb25nTWlzc2VkID0gMFxuICBwcml2YXRlIF9waW5nVGltZW91dElkPzogbnVtYmVyXG4gIHByaXZhdGUgX3BvbmdUaW1lb3V0SWQ/OiBudW1iZXJcbiAgcHJpdmF0ZSBfbG9naW5zOiBNYXA8c3RyaW5nIC8qIGVudklkICovLCBJTG9naW5JbmZvPiA9IG5ldyBNYXAoKVxuICAvLyBwcml2YXRlIF9sb2dpbkluZm86IElMb2dpbkluZm9cbiAgLy8gcHJpdmF0ZSBfc2lnbmF0dXJlczogTWFwPHN0cmluZyAvKiBlbnZJZCAqLywgSVNpZ25hdHVyZT4gPSBuZXcgTWFwKClcbiAgcHJpdmF0ZSBfd3NJbml0UHJvbWlzZT86IFByb21pc2U8dm9pZD5cbiAgcHJpdmF0ZSBfd3NSZWFkeVN1YnNyaWJlcnM6IElSZXNvbHZlUmVqZWN0W10gPSBbXVxuICBwcml2YXRlIF93c1Jlc3BvbnNlV2FpdDogTWFwPFxuICAgIHN0cmluZyAvKiByZXF1ZXN0SWQgKi8sXG4gICAgSVJlc3BvbnNlV2FpdFNwZWNcbiAgPiA9IG5ldyBNYXAoKVxuICBwcml2YXRlIF9ydHRPYnNlcnZlZDogbnVtYmVyW10gPSBbXVxuICBwcml2YXRlIF9yZWNvbm5lY3RTdGF0ZTogYm9vbGVhblxuICAvLyBvYnRhaW5lZCBmcm9tIHRoZSBmaXJzdCBnZXRTaWduYXR1cmUgd2l0aCBubyBlbnZJZCBwcm92aWRlZFxuICAvLyBwcml2YXRlIF9kZWZhdWx0RW52SWQ/OiBzdHJpbmdcbiAgcHJpdmF0ZSBfd3NTaWduOiBJV3NTaWduXG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogSVJlYWx0aW1lV2ViU29ja2V0Q2xpZW50Q29uc3RydWN0b3JPcHRpb25zKSB7XG4gICAgdGhpcy5fbWF4UmVjb25uZWN0ID0gb3B0aW9ucy5tYXhSZWNvbm5lY3QgfHwgREVGQVVMVF9NQVhfUkVDT05ORUNUXG4gICAgLy8gdGhpcy5fYXZhaWxhYmxlUmV0cmllcyA9IHRoaXMuX21heFJlY29ubmVjdFxuICAgIHRoaXMuX3JlY29ubmVjdEludGVydmFsID1cbiAgICAgIG9wdGlvbnMucmVjb25uZWN0SW50ZXJ2YWwgfHwgREVGQVVMVF9XU19SRUNPTk5FQ1RfSU5URVJWQUxcbiAgICB0aGlzLl9jb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0XG4gIH1cblxuICBjbGVhckhlYXJ0YmVhdCgpIHtcbiAgICB0aGlzLl9waW5nVGltZW91dElkICYmIGNsZWFyVGltZW91dCh0aGlzLl9waW5nVGltZW91dElkKVxuICAgIHRoaXMuX3BvbmdUaW1lb3V0SWQgJiYgY2xlYXJUaW1lb3V0KHRoaXMuX3BvbmdUaW1lb3V0SWQpXG4gIH1cblxuICBzZW5kID0gYXN5bmMgPFQgPSBhbnk+KG9wdHM6IElXU1NlbmRPcHRpb25zKTogUHJvbWlzZTxUPiA9PlxuICAgIG5ldyBQcm9taXNlPFQ+KGFzeW5jIChfcmVzb2x2ZSwgX3JlamVjdCkgPT4ge1xuICAgICAgbGV0IHRpbWVvdXRJZDogbnVtYmVyXG4gICAgICBsZXQgX2hhc1Jlc29sdmVkID0gZmFsc2VcbiAgICAgIGxldCBfaGFzUmVqZWN0ZWQgPSBmYWxzZVxuXG4gICAgICBjb25zdCByZXNvbHZlOiB0eXBlb2YgX3Jlc29sdmUgPSAoXG4gICAgICAgIHZhbHVlPzogVCB8IFByb21pc2VMaWtlPFQ+IHwgdW5kZWZpbmVkXG4gICAgICApID0+IHtcbiAgICAgICAgX2hhc1Jlc29sdmVkID0gdHJ1ZVxuICAgICAgICB0aW1lb3V0SWQgJiYgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZClcbiAgICAgICAgX3Jlc29sdmUodmFsdWUpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlamVjdDogdHlwZW9mIF9yZWplY3QgPSAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICBfaGFzUmVqZWN0ZWQgPSB0cnVlXG4gICAgICAgIHRpbWVvdXRJZCAmJiBjbGVhclRpbWVvdXQodGltZW91dElkKVxuICAgICAgICBfcmVqZWN0KGVycm9yKVxuICAgICAgfVxuXG4gICAgICBpZiAob3B0cy50aW1lb3V0KSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGltZW91dElkID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgaWYgKCFfaGFzUmVzb2x2ZWQgfHwgIV9oYXNSZWplY3RlZCkge1xuICAgICAgICAgICAgLy8gd2FpdCBhbm90aGVyIGltbWVkaWF0ZSB0aW1lb3V0IHRvIGFsbG93IHRoZSBzdWNjZXNzL2ZhaWwgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCBpZiB3cyBoYXMgYWxyZWFkeSBnb3QgdGhlIHJlc3VsdCxcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgYmVjYXVzZSB0aGUgdGltZXIgaXMgcmVnaXN0ZXJlZCBiZWZvcmUgd3Muc2VuZFxuICAgICAgICAgICAgYXdhaXQgc2xlZXAoMClcbiAgICAgICAgICAgIGlmICghX2hhc1Jlc29sdmVkIHx8ICFfaGFzUmVqZWN0ZWQpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KG5ldyBUaW1lb3V0RXJyb3IoJ3dzY2xpZW50LnNlbmQgdGltZWRvdXQnKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIG9wdHMudGltZW91dClcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gaWYgKHRoaXMuX2NvbnRleHQuZGVidWcpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYFtyZWFsdGltZV0gd3Mgc2VuZCAoJHtuZXcgRGF0ZSgpfSk6IGAsIG9wdHMpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFxuICAgICAgICAvLyAgIGBbcmVhbHRpbWVdIHdzIHNlbmQgJHtcbiAgICAgICAgLy8gICAgIG9wdHMubXNnLm1zZ1R5cGVcbiAgICAgICAgLy8gICB9ICgke25ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKX0pOiBgLFxuICAgICAgICAvLyAgIG9wdHNcbiAgICAgICAgLy8gKVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3dzSW5pdFByb21pc2UpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl93c0luaXRQcm9taXNlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX3dzKSB7XG4gICAgICAgICAgcmVqZWN0KFxuICAgICAgICAgICAgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAnaW52YWxpZCBzdGF0ZTogd3MgY29ubmVjdGlvbiBub3QgZXhpc3RzLCBjYW4gbm90IHNlbmQgbWVzc2FnZSdcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fd3MucmVhZHlTdGF0ZSAhPT0gV1NfUkVBRFlfU1RBVEUuT1BFTikge1xuICAgICAgICAgIHJlamVjdChcbiAgICAgICAgICAgIG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYHdzIHJlYWR5U3RhdGUgaW52YWxpZDogJHt0aGlzLl93cy5yZWFkeVN0YXRlfSwgY2FuIG5vdCBzZW5kIG1lc3NhZ2VgXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdHMud2FpdFJlc3BvbnNlKSB7XG4gICAgICAgICAgdGhpcy5fd3NSZXNwb25zZVdhaXQuc2V0KG9wdHMubXNnLnJlcXVlc3RJZCwge1xuICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdCxcbiAgICAgICAgICAgIHNraXBPbk1lc3NhZ2U6IG9wdHMuc2tpcE9uTWVzc2FnZVxuICAgICAgICAgIH0gYXMgSVJlc3BvbnNlV2FpdFNwZWMpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnc2VuZCBtc2c6Jywgb3B0cy5tc2cpXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fd3Muc2VuZChKU09OLnN0cmluZ2lmeShvcHRzLm1zZykpXG4gICAgICAgICAgaWYgKCFvcHRzLndhaXRSZXNwb25zZSkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKVxuICAgICAgICAgICAgaWYgKG9wdHMud2FpdFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3dzUmVzcG9uc2VXYWl0LmRlbGV0ZShvcHRzLm1zZy5yZXF1ZXN0SWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuX3dzLnNlbmQoSlNPTi5zdHJpbmdpZnkob3B0cy5tc2cpLCBlcnIgPT4ge1xuICAgICAgICAvLyAgIGlmIChlcnIpIHtcbiAgICAgICAgLy8gICAgIHJlamVjdChlcnIpXG4gICAgICAgIC8vICAgICBpZiAob3B0cy53YWl0UmVzcG9uc2UpIHtcbiAgICAgICAgLy8gICAgICAgdGhpcy5fd3NSZXNwb25zZVdhaXQuZGVsZXRlKG9wdHMubXNnLnJlcXVlc3RJZClcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIHJldHVyblxuICAgICAgICAvLyAgIH1cblxuICAgICAgICAvLyAgIGlmICghb3B0cy53YWl0UmVzcG9uc2UpIHtcbiAgICAgICAgLy8gICAgIHJlc29sdmUoKVxuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gfSlcblxuICAgICAgICAvLyB0aGlzLl93cy5zZW5kKHtcbiAgICAgICAgLy8gICBkYXRhOiBKU09OLnN0cmluZ2lmeShvcHRzLm1zZyksXG4gICAgICAgIC8vICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgLy8gICAgIGlmICghb3B0cy53YWl0UmVzcG9uc2UpIHtcbiAgICAgICAgLy8gICAgICAgcmVzb2x2ZShyZXMpXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgfSxcbiAgICAgICAgLy8gICBmYWlsOiBlID0+IHtcbiAgICAgICAgLy8gICAgIHJlamVjdChlKVxuICAgICAgICAvLyAgICAgaWYgKG9wdHMud2FpdFJlc3BvbnNlKSB7XG4gICAgICAgIC8vICAgICAgIHRoaXMuX3dzUmVzcG9uc2VXYWl0LmRlbGV0ZShvcHRzLm1zZy5yZXF1ZXN0SWQpXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgfVxuICAgICAgICAvLyB9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3QoZSlcbiAgICAgIH1cbiAgICB9KVxuXG4gIGNsb3NlKGNvZGU6IENMT1NFX0VWRU5UX0NPREUpIHtcbiAgICB0aGlzLmNsZWFySGVhcnRiZWF0KClcblxuICAgIGlmICh0aGlzLl93cykge1xuICAgICAgdGhpcy5fd3MuY2xvc2UoY29kZSwgQ0xPU0VfRVZFTlRfQ09ERV9JTkZPW2NvZGVdLm5hbWUpXG4gICAgICB0aGlzLl93cyA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIGNsb3NlQWxsQ2xpZW50cyA9IChlcnJvcjogYW55KSA9PiB7XG4gICAgdGhpcy5fdmlydHVhbFdTQ2xpZW50LmZvckVhY2goY2xpZW50ID0+IHtcbiAgICAgIGNsaWVudC5jbG9zZVdpdGhFcnJvcihlcnJvcilcbiAgICB9KVxuICB9XG5cbiAgcGF1c2VDbGllbnRzID0gKGNsaWVudHM/OiBTZXQ8VmlydHVhbFdlYlNvY2tldENsaWVudD4pID0+IHtcbiAgICA7KGNsaWVudHMgfHwgdGhpcy5fdmlydHVhbFdTQ2xpZW50KS5mb3JFYWNoKGNsaWVudCA9PiB7XG4gICAgICBjbGllbnQucGF1c2UoKVxuICAgIH0pXG4gIH1cblxuICByZXN1bWVDbGllbnRzID0gKGNsaWVudHM/OiBTZXQ8VmlydHVhbFdlYlNvY2tldENsaWVudD4pID0+IHtcbiAgICA7KGNsaWVudHMgfHwgdGhpcy5fdmlydHVhbFdTQ2xpZW50KS5mb3JFYWNoKGNsaWVudCA9PiB7XG4gICAgICBjbGllbnQucmVzdW1lKClcbiAgICB9KVxuICB9XG5cbiAgd2F0Y2gob3B0aW9uczogSVdTV2F0Y2hPcHRpb25zKTogREJSZWFsdGltZUxpc3RlbmVyIHtcbiAgICBpZiAoIXRoaXMuX3dzICYmICF0aGlzLl93c0luaXRQcm9taXNlKSB7XG4gICAgICB0aGlzLmluaXRXZWJTb2NrZXRDb25uZWN0aW9uKGZhbHNlKVxuICAgIH1cblxuICAgIGNvbnN0IHZpcnR1YWxDbGllbnQgPSBuZXcgVmlydHVhbFdlYlNvY2tldENsaWVudCh7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgc2VuZDogdGhpcy5zZW5kLFxuICAgICAgbG9naW46IHRoaXMud2ViTG9naW4sXG4gICAgICBpc1dTQ29ubmVjdGVkOiB0aGlzLmlzV1NDb25uZWN0ZWQsXG4gICAgICBvbmNlV1NDb25uZWN0ZWQ6IHRoaXMub25jZVdTQ29ubmVjdGVkLFxuICAgICAgZ2V0V2FpdEV4cGVjdGVkVGltZW91dExlbmd0aDogdGhpcy5nZXRXYWl0RXhwZWN0ZWRUaW1lb3V0TGVuZ3RoLFxuICAgICAgb25XYXRjaFN0YXJ0OiB0aGlzLm9uV2F0Y2hTdGFydCxcbiAgICAgIG9uV2F0Y2hDbG9zZTogdGhpcy5vbldhdGNoQ2xvc2UsXG4gICAgICBkZWJ1ZzogdHJ1ZVxuICAgIH0pXG4gICAgdGhpcy5fdmlydHVhbFdTQ2xpZW50LmFkZCh2aXJ0dWFsQ2xpZW50KVxuICAgIHRoaXMuX3dhdGNoSWRDbGllbnRNYXAuc2V0KHZpcnR1YWxDbGllbnQud2F0Y2hJZCwgdmlydHVhbENsaWVudClcbiAgICByZXR1cm4gdmlydHVhbENsaWVudC5saXN0ZW5lclxuICB9XG5cbiAgcHJpdmF0ZSBpbml0V2ViU29ja2V0Q29ubmVjdGlvbiA9IGFzeW5jIChcbiAgICByZWNvbm5lY3Q6IGJvb2xlYW4sXG4gICAgYXZhaWxhYmxlUmV0cmllczogbnVtYmVyID0gdGhpcy5fbWF4UmVjb25uZWN0XG4gICk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIC8vIOW9k+WJjeWkhOS6juato+WcqOmHjei/nuS4reeahOeKtuaAgVxuICAgIGlmIChyZWNvbm5lY3QgJiYgdGhpcy5fcmVjb25uZWN0U3RhdGUpIHtcbiAgICAgIHJldHVybiAvLyDlv73nlaVcbiAgICB9XG5cbiAgICBpZiAocmVjb25uZWN0KSB7XG4gICAgICB0aGlzLl9yZWNvbm5lY3RTdGF0ZSA9IHRydWUgLy8g6YeN6L+e54q25oCB5byA5aeLXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3dzSW5pdFByb21pc2UpIHtcbiAgICAgIC8vIHRoZXJlIGFscmVhZHkgZXhpc3RzIGEgd2Vic29ja2V0IGluaXRpYXRpb24sIGp1c3Qgd2FpdCBmb3IgaXRcbiAgICAgIHJldHVybiB0aGlzLl93c0luaXRQcm9taXNlXG4gICAgfVxuXG4gICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgLy8gY29uc29sZS5sb2coXG4gICAgLy8gICBgW3JlYWx0aW1lXSBpbml0V2ViU29ja2V0Q29ubmVjdGlvbiByZWNvbm5lY3QgJHtyZWNvbm5lY3R9IGF2YWlsYWJsZVJldHJpZXMgJHthdmFpbGFibGVSZXRyaWVzfWBcbiAgICAvLyApXG4gICAgLy8gfVxuXG4gICAgaWYgKHJlY29ubmVjdCkge1xuICAgICAgdGhpcy5wYXVzZUNsaWVudHMoKVxuICAgIH1cblxuICAgIHRoaXMuY2xvc2UoQ0xPU0VfRVZFTlRfQ09ERS5SZWNvbm5lY3RXZWJTb2NrZXQpXG5cbiAgICB0aGlzLl93c0luaXRQcm9taXNlID0gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFxuICAgICAgICAvLyAgICdbcmVhbHRpbWVdIGluaXRXZWJTb2NrZXRDb25uZWN0aW9uIHN0YXJ0IHRocm93RXJyb3JJZk5ldHdvcmtPZmZsaW5lJ1xuICAgICAgICAvLyApXG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyDmmoLkuI3mo4Dmn6XnvZHnu5zmgIFcbiAgICAgICAgLy8gYXdhaXQgdGhyb3dFcnJvcklmTmV0d29ya09mZmxpbmUoKVxuXG4gICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnW3JlYWx0aW1lXSBpbml0V2ViU29ja2V0Q29ubmVjdGlvbiBzdGFydCBnZXRTaWduYXR1cmUnKVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgdGhpcy5nZXRTaWduYXR1cmUoKVxuICAgICAgICBjb25zdCB3c1NpZ24gPSBhd2FpdCB0aGlzLmdldFdzU2lnbigpXG5cbiAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdbcmVhbHRpbWVdIGluaXRXZWJTb2NrZXRDb25uZWN0aW9uIGdldFNpZ25hdHVyZSBzdWNjZXNzJylcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1tyZWFsdGltZV0gaW5pdFdlYlNvY2tldENvbm5lY3Rpb24gc3RhcnQgY29ubmVjdFNvY2tldCcpXG4gICAgICAgIC8vIH1cblxuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShzdWNjZXNzID0+IHtcbiAgICAgICAgICAvLyB0aGlzLl93cyA9IGdldFNESyh0aGlzLl9jb250ZXh0LmlkZW50aWZpZXJzKVxuICAgICAgICAgIC8vICAgLl9zb2NrZXRTa2lwQ2hlY2tEb21haW5GYWN0b3J5KClcbiAgICAgICAgICAvLyAgIC5jb25uZWN0U29ja2V0KHtcbiAgICAgICAgICAvLyAgICAgdXJsOiBzaWduYXR1cmUud3NVcmwsXG4gICAgICAgICAgLy8gICAgIGhlYWRlcjoge1xuICAgICAgICAgIC8vICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgLy8gICAgIH0sXG4gICAgICAgICAgLy8gICAgIHN1Y2Nlc3M6ICgpID0+IHN1Y2Nlc3MoKSxcbiAgICAgICAgICAvLyAgICAgZmFpbFxuICAgICAgICAgIC8vICAgfSlcblxuICAgICAgICAgIGNvbnN0IHVybCA9IHdzU2lnbi53c1VybCB8fCAnd3NzOi8vdGNiLXdzLnRlbmNlbnRjbG91ZGFwaS5jb20nO1xuICAgICAgICAgIGNvbnN0IHdzQ2xhc3MgPSBnZXRXc0NsYXNzKCk7XG4gICAgICAgICAgdGhpcy5fd3MgPSB3c0NsYXNzID8gbmV3IHdzQ2xhc3ModXJsKSA6IG5ldyBXZWJTb2NrZXQodXJsKVxuICAgICAgICAgIHN1Y2Nlc3MoKVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmKHRoaXMuX3dzLmNvbm5lY3Qpe1xuICAgICAgICAgIGF3YWl0IHRoaXMuX3dzLmNvbm5lY3QoKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFxuICAgICAgICAvLyAgICdbcmVhbHRpbWVdIGluaXRXZWJTb2NrZXRDb25uZWN0aW9uIGNvbm5lY3RTb2NrZXQgc3VjY2Vzc2Z1bGx5IGZpcmVkJ1xuICAgICAgICAvLyApXG4gICAgICAgIC8vIH1cblxuICAgICAgICBhd2FpdCB0aGlzLmluaXRXZWJTb2NrZXRFdmVudCgpXG4gICAgICAgIHJlc29sdmUoKVxuXG4gICAgICAgIGlmIChyZWNvbm5lY3QpIHtcbiAgICAgICAgICB0aGlzLnJlc3VtZUNsaWVudHMoKVxuICAgICAgICAgIHRoaXMuX3JlY29ubmVjdFN0YXRlID0gZmFsc2UgLy8g6YeN6L+e54q25oCB57uT5p2fXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tyZWFsdGltZV0gaW5pdFdlYlNvY2tldENvbm5lY3Rpb24gY29ubmVjdCBmYWlsJywgZSlcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGlmIChhdmFpbGFibGVSZXRyaWVzID4gMCkge1xuICAgICAgICAgIC8vIHRoaXMgaXMgYW4gb3B0aW1pemF0aW9uLCBpbiBjYXNlIG9mIG5ldHdvcmsgb2ZmbGluZSwgd2UgZG9uJ3QgbmVlZCB0byBzdHViYm9ybmx5IHNsZWVwIGZvciBzb21ldGltZSxcbiAgICAgICAgICAvLyB3ZSBvbmx5IG5lZWQgdG8gd2FpdCBmb3IgdGhlIG5ldHdvcmsgdG8gYmUgYmFjayBvbmxpbmUsIHRoaXMgZW5zdXJlcyBtaW5pbXVtIGRvd250aW1lXG4gICAgICAgICAgLy8gY29uc3QgeyBpc0Nvbm5lY3RlZCB9ID0gYXdhaXQgZ2V0TmV0d29ya1N0YXR1cygpXG4gICAgICAgICAgY29uc3QgaXNDb25uZWN0ZWQgPSB0cnVlXG5cbiAgICAgICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAgICAgICAvLyAgICdbcmVhbHRpbWVdIGluaXRXZWJTb2NrZXRDb25uZWN0aW9uIHdhaXRpbmcgZm9yIG5ldHdvcmsgb25saW5lJ1xuICAgICAgICAgIC8vIClcbiAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAvLyBhdXRvIHdhaXQgdW50aWwgbmV0d29yayBvbmxpbmUsIGNhdXNlJyBpdCB3b3VsZCBiZSBtZWFuaW5nbGVzcyB0byByZWNvbm5lY3Qgd2hpbGUgbmV0d29yayBpcyBvZmZsaW5lXG5cbiAgICAgICAgICAvLyBhd2FpdCBvbmNlTmV0d29ya09ubGluZSgpXG5cbiAgICAgICAgICAvLyBDT01QQVRJQklMSVRZOiB3YWl0IGZvciBpZGUgc3RhdGUgdXBkYXRlXG4gICAgICAgICAgLy8gaWYgKGlzRGV2VG9vbHMoKSkge1xuICAgICAgICAgIC8vICAgYXdhaXQgc2xlZXAoMClcbiAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnW3JlYWx0aW1lXSBpbml0V2ViU29ja2V0Q29ubmVjdGlvbiBuZXR3b3JrIG9ubGluZScpXG4gICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgdGhpcy5fd3NJbml0UHJvbWlzZSA9IHVuZGVmaW5lZFxuXG4gICAgICAgICAgaWYgKGlzQ29ubmVjdGVkKSB7XG4gICAgICAgICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgLy8gICBgW3JlYWx0aW1lXSBpbml0V2ViU29ja2V0Q29ubmVjdGlvbiBzbGVlcCAke3RoaXMuX3JlY29ubmVjdEludGVydmFsfW1zYFxuICAgICAgICAgICAgLy8gKVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgYXdhaXQgc2xlZXAodGhpcy5fcmVjb25uZWN0SW50ZXJ2YWwpXG4gICAgICAgICAgICBpZiAocmVjb25uZWN0KSB7XG4gICAgICAgICAgICAgIHRoaXMuX3JlY29ubmVjdFN0YXRlID0gZmFsc2UgLy8g6YeN6L+e5byC5bi45Lmf566X6YeN6L+e54q25oCB57uT5p2fXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLmluaXRXZWJTb2NrZXRDb25uZWN0aW9uKHJlY29ubmVjdCwgYXZhaWxhYmxlUmV0cmllcyAtIDEpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChlKVxuXG4gICAgICAgICAgaWYgKHJlY29ubmVjdCkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZUFsbENsaWVudHMoXG4gICAgICAgICAgICAgIG5ldyBDbG91ZFNES0Vycm9yKHtcbiAgICAgICAgICAgICAgICBlcnJDb2RlOiBFUlJfQ09ERS5TREtfREFUQUJBU0VfUkVBTFRJTUVfTElTVEVORVJfUkVDT05ORUNUX1dBVENIX0ZBSUwgYXMgc3RyaW5nLFxuICAgICAgICAgICAgICAgIGVyck1zZzogZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBsZXQgc3VjY2VzcyA9IGZhbHNlXG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5fd3NJbml0UHJvbWlzZVxuICAgICAgLy8gc3VjY2VzcyA9IHRydWVcbiAgICAgIHRoaXMuX3dzUmVhZHlTdWJzcmliZXJzLmZvckVhY2goKHsgcmVzb2x2ZSB9KSA9PiByZXNvbHZlKCkpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5fd3NSZWFkeVN1YnNyaWJlcnMuZm9yRWFjaCgoeyByZWplY3QgfSkgPT4gcmVqZWN0KCkpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuX3dzSW5pdFByb21pc2UgPSB1bmRlZmluZWRcbiAgICAgIHRoaXMuX3dzUmVhZHlTdWJzcmliZXJzID0gW11cbiAgICB9XG5cbiAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAvLyAgIGBbcmVhbHRpbWVdIGluaXRXZWJTb2NrZXRDb25uZWN0aW9uICR7c3VjY2VzcyA/ICdzdWNjZXNzJyA6ICdmYWlsJ31gXG4gICAgLy8gKVxuICAgIC8vIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdFdlYlNvY2tldEV2ZW50ID0gKCkgPT5cbiAgICBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX3dzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY2FuIG5vdCBpbml0V2ViU29ja2V0RXZlbnQsIHdzIG5vdCBleGlzdHMnKVxuICAgICAgfVxuXG4gICAgICBsZXQgd3NPcGVuZWQgPSBmYWxzZVxuXG4gICAgICB0aGlzLl93cy5vbm9wZW4gPSBldmVudCA9PiB7XG4gICAgICAgIC8vIHRoaXMuX3dzLm9uT3BlbigoKSA9PiB7XG4gICAgICAgIC8vIHRoaXMuX3dzLm9uKFwib3BlblwiLCAoKSA9PiB7XG4gICAgICAgIC8vIHRoaXMuX2NvbnRleHQuZGVidWcgJiZcbiAgICAgICAgY29uc29sZS53YXJuKCdbcmVhbHRpbWVdIHdzIGV2ZW50OiBvcGVuJywgZXZlbnQpXG4gICAgICAgIHdzT3BlbmVkID0gdHJ1ZVxuICAgICAgICByZXNvbHZlKClcbiAgICAgIH1cblxuICAgICAgdGhpcy5fd3Mub25lcnJvciA9IGV2ZW50ID0+IHtcbiAgICAgICAgLy8gdGhpcy5fd3Mub24oXCJlcnJvclwiLCBlcnJvciA9PiB7XG4gICAgICAgIC8vIHRoaXMuX3dzLm9uRXJyb3IoZXJyb3IgPT4ge1xuICAgICAgICAvLyBhbGwgbG9naW5zIGFyZSBpbnZhbGlkIGFmdGVyIGRpc2Nvbm5lY3Rpb25cbiAgICAgICAgdGhpcy5fbG9naW5zID0gbmV3IE1hcCgpXG5cbiAgICAgICAgLy8gZXJyb3Llhpnov5tmaWxlXG5cbiAgICAgICAgaWYgKCF3c09wZW5lZCkge1xuICAgICAgICAgIC8vIHRoaXMuX2NvbnRleHQuZGVidWcgJiZcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdbcmVhbHRpbWVdIHdzIG9wZW4gZmFpbGVkIHdpdGggd3MgZXZlbnQ6IGVycm9yJywgZXZlbnQpXG4gICAgICAgICAgLy8gd3JpdGVUb0ZpbGUoXG4gICAgICAgICAgLy8gICBcIndzZXJyb3IudHh0XCIsXG4gICAgICAgICAgLy8gICBgJHtcbiAgICAgICAgICAvLyAgICAgdGhpcy5zcGVjaWFsTnVtYmVyXG4gICAgICAgICAgLy8gICB9IFtyZWFsdGltZV0gd3Mgb3BlbiBmYWlsZWQgd2l0aCB3cyBldmVudDogZXJyb3IgJHtlcnJvcn0gXFxuYFxuICAgICAgICAgIC8vIClcblxuICAgICAgICAgIHJlamVjdChldmVudClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB0aGlzLl9jb250ZXh0LmRlYnVnICYmXG4gICAgICAgICAgY29uc29sZS5lcnJvcignW3JlYWx0aW1lXSB3cyBldmVudDogZXJyb3InLCBldmVudClcblxuICAgICAgICAgIC8vIHdyaXRlVG9GaWxlKFxuICAgICAgICAgIC8vICAgXCJ3c2Vycm9yLnR4dFwiLFxuICAgICAgICAgIC8vICAgYCR7dGhpcy5zcGVjaWFsTnVtYmVyfSBbcmVhbHRpbWVdIHdzIGV2ZW50OiBlcnJvciAke2Vycm9yfSBcXG5gXG4gICAgICAgICAgLy8gKVxuXG4gICAgICAgICAgdGhpcy5jbGVhckhlYXJ0YmVhdCgpXG4gICAgICAgICAgdGhpcy5fdmlydHVhbFdTQ2xpZW50LmZvckVhY2goY2xpZW50ID0+XG4gICAgICAgICAgICBjbGllbnQuY2xvc2VXaXRoRXJyb3IoXG4gICAgICAgICAgICAgIG5ldyBDbG91ZFNES0Vycm9yKHtcbiAgICAgICAgICAgICAgICBlcnJDb2RlOiBFUlJfQ09ERS5TREtfREFUQUJBU0VfUkVBTFRJTUVfTElTVEVORVJfV0VCU09DS0VUX0NPTk5FQ1RJT05fRVJST1IgYXMgc3RyaW5nLFxuICAgICAgICAgICAgICAgIGVyck1zZzogZXZlbnRcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVE9ETzogcmVjb25uZWN0XG4gICAgICB0aGlzLl93cy5vbmNsb3NlID0gY2xvc2VFdmVudCA9PiB7XG4gICAgICAgIC8vIHRoaXMuX3dzLm9uKFwiY2xvc2VcIiwgKGNsb3NlRXZlbnQsIGNsb3NlcmVhc29uKSA9PiB7XG4gICAgICAgIC8vIHRoaXMuX3dzLm9uQ2xvc2UoY2xvc2VFdmVudCA9PiB7XG4gICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1tyZWFsdGltZV0gd3MgZXZlbnQ6IGNsb3NlJywgY2xvc2VFdmVudClcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIHdyaXRlVG9GaWxlKFxuICAgICAgICAvLyAgIFwid3NjbG9zZS50eHRcIixcbiAgICAgICAgLy8gICBgJHtcbiAgICAgICAgLy8gICAgIHRoaXMuc3BlY2lhbE51bWJlclxuICAgICAgICAvLyAgIH0gW3JlYWx0aW1lXSB3cyBldmVudDogY2xvc2UgJHtjbG9zZUV2ZW50fSAke2Nsb3NlcmVhc29ufSBcXG5gXG4gICAgICAgIC8vIClcblxuICAgICAgICAvLyBhbGwgbG9naW5zIGFyZSBpbnZhbGlkIGFmdGVyIGRpc2Nvbm5lY3Rpb25cbiAgICAgICAgdGhpcy5fbG9naW5zID0gbmV3IE1hcCgpXG5cbiAgICAgICAgdGhpcy5jbGVhckhlYXJ0YmVhdCgpXG4gICAgICAgIHN3aXRjaCAoY2xvc2VFdmVudC5jb2RlKSB7XG4gICAgICAgICAgY2FzZSBDTE9TRV9FVkVOVF9DT0RFLlJlY29ubmVjdFdlYlNvY2tldDoge1xuICAgICAgICAgICAgLy8ganVzdCBpZ25vcmVcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgQ0xPU0VfRVZFTlRfQ09ERS5Ob1JlYWx0aW1lTGlzdGVuZXJzOiB7XG4gICAgICAgICAgICAvLyBxdWl0XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlIENMT1NFX0VWRU5UX0NPREUuSGVhcnRiZWF0UGluZ0Vycm9yOlxuICAgICAgICAgIGNhc2UgQ0xPU0VfRVZFTlRfQ09ERS5IZWFydGJlYXRQb25nVGltZW91dEVycm9yOlxuICAgICAgICAgIGNhc2UgQ0xPU0VfRVZFTlRfQ09ERS5Ob3JtYWxDbG9zdXJlOlxuICAgICAgICAgIGNhc2UgQ0xPU0VfRVZFTlRfQ09ERS5BYm5vcm1hbENsb3N1cmU6IHtcbiAgICAgICAgICAgIC8vIE5vcm1hbCBDbG9zdXJlIGFuZCBBYm5vcm1hbCBDbG9zdXJlOlxuICAgICAgICAgICAgLy8gICBleHBlY3RlZCBjbG9zdXJlLCBtb3N0IGxpa2VseSBkaXNwYXRjaGVkIGJ5IHdlY2hhdCBjbGllbnQsXG4gICAgICAgICAgICAvLyAgIHNpbmNlIHRoaXMgaXMgdGhlIHN0YXR1cyBjb2RlIGRpc3BhdGNoZWQgaW4gY2FzZSBvZiBuZXR3b3JrIGZhaWx1cmUsXG4gICAgICAgICAgICAvLyAgIHdlIHNob3VsZCByZXRyeVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4UmVjb25uZWN0ID4gMCkge1xuICAgICAgICAgICAgICAvLyBpZiAodGhpcy5fYXZhaWxhYmxlUmV0cmllcyA+IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5pbml0V2ViU29ja2V0Q29ubmVjdGlvbih0cnVlLCB0aGlzLl9tYXhSZWNvbm5lY3QpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmNsb3NlQWxsQ2xpZW50cyhnZXRXU0Nsb3NlRXJyb3IoY2xvc2VFdmVudC5jb2RlKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgQ0xPU0VfRVZFTlRfQ09ERS5Ob0F1dGhlbnRpY2F0aW9uOiB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlQWxsQ2xpZW50cyhcbiAgICAgICAgICAgICAgZ2V0V1NDbG9zZUVycm9yKGNsb3NlRXZlbnQuY29kZSwgY2xvc2VFdmVudC5yZWFzb24pXG4gICAgICAgICAgICApXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAvLyB3ZSBzaG91bGQgcmV0cnkgYnkgZGVmYXVsdFxuICAgICAgICAgICAgaWYgKHRoaXMuX21heFJlY29ubmVjdCA+IDApIHtcbiAgICAgICAgICAgICAgLy8gaWYgKHRoaXMuX2F2YWlsYWJsZVJldHJpZXMgPiAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuaW5pdFdlYlNvY2tldENvbm5lY3Rpb24odHJ1ZSwgdGhpcy5fbWF4UmVjb25uZWN0KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5jbG9zZUFsbENsaWVudHMoZ2V0V1NDbG9zZUVycm9yKGNsb3NlRXZlbnQuY29kZSkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oYFtyZWFsdGltZV0gdW5yZWNvZ25pemUgd3MgY2xvc2UgZXZlbnRgLCBjbG9zZUV2ZW50KVxuICAgICAgICAgICAgLy8gdGhpcy5jbG9zZUFsbENsaWVudHMoZ2V0V1NDbG9zZUVycm9yKGNsb3NlRXZlbnQuY29kZSkpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3dzLm9ubWVzc2FnZSA9IHJlcyA9PiB7XG4gICAgICAgIC8vIHRoaXMuX3dzLm9uKFwibWVzc2FnZVwiLCByZXMgPT4ge1xuICAgICAgICAvLyB0aGlzLl93cy5vbk1lc3NhZ2UocmVzID0+IHtcbiAgICAgICAgLy8gY29uc3QgcmF3TXNnID0gcmVzLmRhdGFcbiAgICAgICAgY29uc3QgcmF3TXNnID0gcmVzLmRhdGFcblxuICAgICAgICAvLyByZXNldCAmIHJlc3RhcnQgaGVhcnRiZWF0XG4gICAgICAgIHRoaXMuaGVhcnRiZWF0KClcblxuICAgICAgICBsZXQgbXNnOiBJUmVzcG9uc2VNZXNzYWdlXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBtc2cgPSBKU09OLnBhcnNlKHJhd01zZyBhcyBzdHJpbmcpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFtyZWFsdGltZV0gb25NZXNzYWdlIHBhcnNlIHJlcy5kYXRhIGVycm9yOiAke2V9YClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFxuICAgICAgICAvLyAgIGBbcmVhbHRpbWVdIG9uTWVzc2FnZSAke1xuICAgICAgICAvLyAgICAgbXNnLm1zZ1R5cGVcbiAgICAgICAgLy8gICB9ICgke25ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKX0pYCxcbiAgICAgICAgLy8gICBtc2dcbiAgICAgICAgLy8gKVxuXG4gICAgICAgIGlmIChtc2cubXNnVHlwZSA9PT0gJ0VSUk9SJykge1xuICAgICAgICAgIC8vIOaJvuWIsOW9k+WJjeebkeWQrO+8jOW5tuWwhmVycm9y6L+U5ZueXG4gICAgICAgICAgbGV0IHZpcnR1YWxXYXRjaCA9IG51bGxcbiAgICAgICAgICB0aGlzLl92aXJ0dWFsV1NDbGllbnQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLndhdGNoSWQgPT09IG1zZy53YXRjaElkKSB7XG4gICAgICAgICAgICAgIHZpcnR1YWxXYXRjaCA9IGl0ZW1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgaWYgKHZpcnR1YWxXYXRjaCkge1xuICAgICAgICAgICAgdmlydHVhbFdhdGNoLmxpc3RlbmVyLm9uRXJyb3IobXNnKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlV2FpdFNwZWMgPSB0aGlzLl93c1Jlc3BvbnNlV2FpdC5nZXQobXNnLnJlcXVlc3RJZClcbiAgICAgICAgaWYgKHJlc3BvbnNlV2FpdFNwZWMpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG1zZy5tc2dUeXBlID09PSAnRVJST1InKSB7XG4gICAgICAgICAgICAgIHJlc3BvbnNlV2FpdFNwZWMucmVqZWN0KG5ldyBSZWFsdGltZUVycm9yTWVzc2FnZUVycm9yKG1zZykpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXNwb25zZVdhaXRTcGVjLnJlc29sdmUobXNnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIHRoaXMuX2NvbnRleHQuZGVidWcgJiZcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICd3cyBvbk1lc3NhZ2UgcmVzcG9uc2VXYWl0U3BlYy5yZXNvbHZlKG1zZykgZXJyb3JlZDonLFxuICAgICAgICAgICAgICBlXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuX3dzUmVzcG9uc2VXYWl0LmRlbGV0ZShtc2cucmVxdWVzdElkKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzcG9uc2VXYWl0U3BlYy5za2lwT25NZXNzYWdlKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobXNnLm1zZ1R5cGUgPT09ICdQT05HJykge1xuICAgICAgICAgIGlmICh0aGlzLl9sYXN0UGluZ1NlbmRUUykge1xuICAgICAgICAgICAgY29uc3QgcnR0ID0gRGF0ZS5ub3coKSAtIHRoaXMuX2xhc3RQaW5nU2VuZFRTXG4gICAgICAgICAgICBpZiAocnR0ID4gREVGQVVMVF9VTlRSVVNURURfUlRUX1RIUkVTSE9MRCkge1xuICAgICAgICAgICAgICAvLyB0aGlzLl9jb250ZXh0LmRlYnVnICYmXG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihgW3JlYWx0aW1lXSB1bnRydXN0ZWQgcnR0IG9ic2VydmVkOiAke3J0dH1gKVxuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9ydHRPYnNlcnZlZC5sZW5ndGggPj0gTUFYX1JUVF9PQlNFUlZFRCkge1xuICAgICAgICAgICAgICB0aGlzLl9ydHRPYnNlcnZlZC5zcGxpY2UoXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICB0aGlzLl9ydHRPYnNlcnZlZC5sZW5ndGggLSBNQVhfUlRUX09CU0VSVkVEICsgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9ydHRPYnNlcnZlZC5wdXNoKHJ0dClcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY2xpZW50ID0gbXNnLndhdGNoSWQgJiYgdGhpcy5fd2F0Y2hJZENsaWVudE1hcC5nZXQobXNnLndhdGNoSWQpXG4gICAgICAgIGlmIChjbGllbnQpIHtcbiAgICAgICAgICBjbGllbnQub25NZXNzYWdlKG1zZylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBUT0RPLCB0aGlzIGlzIGEgdGVtcG9yYXJ5IGZpeCBkb25lIGZvciBzZXJ2ZXJcbiAgICAgICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgYFtyZWFsdGltZV0gbm8gcmVhbHRpbWUgbGlzdGVuZXIgZm91bmQgcmVzcG9uc2libGUgZm9yIHdhdGNoSWQgJHttc2cud2F0Y2hJZH06IGAsXG4gICAgICAgICAgICBtc2dcbiAgICAgICAgICApXG4gICAgICAgICAgLy8gfVxuICAgICAgICAgIHN3aXRjaCAobXNnLm1zZ1R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0lOSVRfRVZFTlQnOlxuICAgICAgICAgICAgY2FzZSAnTkVYVF9FVkVOVCc6XG4gICAgICAgICAgICBjYXNlICdDSEVDS19FVkVOVCc6IHtcbiAgICAgICAgICAgICAgY2xpZW50ID0gdGhpcy5fcXVlcnlJZENsaWVudE1hcC5nZXQobXNnLm1zZ0RhdGEucXVlcnlJRClcbiAgICAgICAgICAgICAgaWYgKGNsaWVudCkge1xuICAgICAgICAgICAgICAgIGNsaWVudC5vbk1lc3NhZ2UobXNnKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgWyxjbGllbnRdIG9mIEFycmF5LmZyb20odGhpcy5fd2F0Y2hJZENsaWVudE1hcC5lbnRyaWVzKCkpKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3dhdGNoaWQqKioqKicsIHdhdGNoSWQpXG4gICAgICAgICAgICAgICAgY2xpZW50Lm9uTWVzc2FnZShtc2cpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmhlYXJ0YmVhdCgpXG4gICAgfSlcblxuICBwcml2YXRlIGlzV1NDb25uZWN0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIEJvb2xlYW4odGhpcy5fd3MgJiYgdGhpcy5fd3MucmVhZHlTdGF0ZSA9PT0gV1NfUkVBRFlfU1RBVEUuT1BFTilcbiAgfVxuXG4gIHByaXZhdGUgb25jZVdTQ29ubmVjdGVkID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmICh0aGlzLmlzV1NDb25uZWN0ZWQoKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3dzSW5pdFByb21pc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLl93c0luaXRQcm9taXNlXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuX3dzUmVhZHlTdWJzcmliZXJzLnB1c2goe1xuICAgICAgICByZXNvbHZlLFxuICAgICAgICByZWplY3RcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgd2ViTG9naW4gPSBhc3luYyAoXG4gICAgZW52SWQ/OiBzdHJpbmcsXG4gICAgcmVmcmVzaD86IGJvb2xlYW5cbiAgKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICBpZiAoIXJlZnJlc2gpIHtcbiAgICAgIC8vIGxldCBsb2dpbkluZm8gPSB0aGlzLl9sb2dpbkluZm9cbiAgICAgIGlmIChlbnZJZCkge1xuICAgICAgICBjb25zdCBsb2dpbkluZm8gPSB0aGlzLl9sb2dpbnMuZ2V0KGVudklkKVxuICAgICAgICBpZiAobG9naW5JbmZvKSB7XG4gICAgICAgICAgaWYgKGxvZ2luSW5mby5sb2dnZWRJbiAmJiBsb2dpbkluZm8ubG9naW5SZXN1bHQpIHtcbiAgICAgICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1tyZWFsdGltZV0gbG9naW46IGFscmVhZHkgbG9nZ2VkIGluJylcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHJldHVybiBsb2dpbkluZm8ubG9naW5SZXN1bHRcbiAgICAgICAgICB9IGVsc2UgaWYgKGxvZ2luSW5mby5sb2dnaW5nSW5Qcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9naW5JbmZvLmxvZ2dpbmdJblByb21pc2VcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVtcHR5RW52TG9naW5JbmZvID0gdGhpcy5fbG9naW5zLmdldCgnJylcbiAgICAgICAgaWYgKGVtcHR5RW52TG9naW5JbmZvPy5sb2dnaW5nSW5Qcm9taXNlKSB7XG4gICAgICAgICAgcmV0dXJuIGVtcHR5RW52TG9naW5JbmZvLmxvZ2dpbmdJblByb21pc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZygnW3JlYWx0aW1lXSBsb2dpbjogbG9nZ2luZyBpbicpXG5cbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2U8SUxvZ2luUmVzdWx0Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCB0aGlzLmdldFNpZ25hdHVyZShlbnZJZCwgcmVmcmVzaClcblxuICAgICAgICBjb25zdCB3c1NpZ24gPSBhd2FpdCB0aGlzLmdldFdzU2lnbigpXG5cbiAgICAgICAgLy8gY29uc3Qgd3hWZXJzaW9uID0gZ2V0V1hWZXJzaW9uKClcbiAgICAgICAgY29uc3QgbXNnRGF0YTogSVJlcXVlc3RNZXNzYWdlTG9naW5EYXRhID0ge1xuICAgICAgICAgIGVudklkOiB3c1NpZ24uZW52SWQgfHwgJycsXG4gICAgICAgICAgYWNjZXNzVG9rZW46ICcnLCAvLyDlt7Llup/lvIPlrZfmrrVcbiAgICAgICAgICAvLyBzaWduU3RyOiBzaWduYXR1cmUuc2lnblN0cixcbiAgICAgICAgICAvLyBzZWNyZXRWZXJzaW9uOiBzaWduYXR1cmUuc2VjcmV0VmVyc2lvbixcbiAgICAgICAgICByZWZlcnJlcjogJ3dlYicsXG4gICAgICAgICAgc2RrVmVyc2lvbjogJycsXG4gICAgICAgICAgZGF0YVZlcnNpb246ICcnXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbG9naW5Nc2c6IElSZXF1ZXN0TWVzc2FnZUxvZ2luTXNnID0ge1xuICAgICAgICAgIHdhdGNoSWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICByZXF1ZXN0SWQ6IGdlblJlcXVlc3RJZCgpLFxuICAgICAgICAgIG1zZ1R5cGU6ICdMT0dJTicsXG4gICAgICAgICAgbXNnRGF0YSxcbiAgICAgICAgICBleE1zZ0RhdGE6IHtcbiAgICAgICAgICAgIHJ1bnRpbWU6IGdldFJ1bnRpbWUoKSxcbiAgICAgICAgICAgIHNpZ25TdHI6IHdzU2lnbi5zaWduU3RyLFxuICAgICAgICAgICAgc2VjcmV0VmVyc2lvbjogd3NTaWduLnNlY3JldFZlcnNpb25cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbG9naW5SZXNNc2cgPSBhd2FpdCB0aGlzLnNlbmQ8SVJlc3BvbnNlTWVzc2FnZUxvZ2luUmVzTXNnPih7XG4gICAgICAgICAgbXNnOiBsb2dpbk1zZyxcbiAgICAgICAgICB3YWl0UmVzcG9uc2U6IHRydWUsXG4gICAgICAgICAgc2tpcE9uTWVzc2FnZTogdHJ1ZSxcbiAgICAgICAgICB0aW1lb3V0OiBERUZBVUxUX0xPR0lOX1RJTUVPVVRcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoIWxvZ2luUmVzTXNnLm1zZ0RhdGEuY29kZSkge1xuICAgICAgICAgIC8vIGxvZ2luIHN1Y2Nlc3NcbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIGVudklkOiB3c1NpZ24uZW52SWRcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGxvZ2luIGZhaWxlZFxuICAgICAgICAgIHJlamVjdChcbiAgICAgICAgICAgIG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYCR7bG9naW5SZXNNc2cubXNnRGF0YS5jb2RlfSAke2xvZ2luUmVzTXNnLm1zZ0RhdGEubWVzc2FnZX1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlamVjdChlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBsZXQgbG9naW5JbmZvID0gdGhpcy5fbG9naW5JbmZvXG4gICAgbGV0IGxvZ2luSW5mbyA9IGVudklkICYmIHRoaXMuX2xvZ2lucy5nZXQoZW52SWQpXG5cbiAgICBjb25zdCBsb2dpblN0YXJ0VFMgPSBEYXRlLm5vdygpXG5cbiAgICBpZiAobG9naW5JbmZvKSB7XG4gICAgICBsb2dpbkluZm8ubG9nZ2VkSW4gPSBmYWxzZVxuICAgICAgbG9naW5JbmZvLmxvZ2dpbmdJblByb21pc2UgPSBwcm9taXNlXG4gICAgICBsb2dpbkluZm8ubG9naW5TdGFydFRTID0gbG9naW5TdGFydFRTXG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2luSW5mbyA9IHtcbiAgICAgICAgbG9nZ2VkSW46IGZhbHNlLFxuICAgICAgICBsb2dnaW5nSW5Qcm9taXNlOiBwcm9taXNlLFxuICAgICAgICBsb2dpblN0YXJ0VFNcbiAgICAgIH1cbiAgICAgIC8vIHRoaXMuX2xvZ2luSW5mbyA9IGxvZ2luSW5mb1xuICAgICAgdGhpcy5fbG9naW5zLnNldChlbnZJZCB8fCAnJywgbG9naW5JbmZvKVxuICAgIH1cblxuICAgIC8vIHRyeSB7XG4gICAgLy8gICBjb25zdCBsb2dpblJlc3VsdCA9IGF3YWl0IHByb21pc2VcbiAgICAvLyAgIGxvZ2luSW5mby5sb2dnZWRJbiA9IHRydWVcbiAgICAvLyAgIGxvZ2luSW5mby5sb2dnaW5nSW5Qcm9taXNlID0gdW5kZWZpbmVkXG4gICAgLy8gICBsb2dpbkluZm8ubG9naW5TdGFydFRTID0gdW5kZWZpbmVkXG4gICAgLy8gICBsb2dpbkluZm8ubG9naW5SZXN1bHQgPSBsb2dpblJlc3VsdFxuICAgIC8vICAgcmV0dXJuIGxvZ2luUmVzdWx0XG4gICAgLy8gfSBjYXRjaCAoZSkge1xuICAgIC8vICAgbG9naW5JbmZvLmxvZ2dlZEluID0gZmFsc2VcbiAgICAvLyAgIGxvZ2luSW5mby5sb2dnaW5nSW5Qcm9taXNlID0gdW5kZWZpbmVkXG4gICAgLy8gICBsb2dpbkluZm8ubG9naW5TdGFydFRTID0gdW5kZWZpbmVkXG4gICAgLy8gICBsb2dpbkluZm8ubG9naW5SZXN1bHQgPSB1bmRlZmluZWRcbiAgICAvLyAgIHRocm93IGVcbiAgICAvLyB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgbG9naW5SZXN1bHQgPSBhd2FpdCBwcm9taXNlXG4gICAgICBjb25zdCBjdXJMb2dpbkluZm8gPSBlbnZJZCAmJiB0aGlzLl9sb2dpbnMuZ2V0KGVudklkKVxuICAgICAgaWYgKFxuICAgICAgICBjdXJMb2dpbkluZm8gJiZcbiAgICAgICAgY3VyTG9naW5JbmZvID09PSBsb2dpbkluZm8gJiZcbiAgICAgICAgY3VyTG9naW5JbmZvLmxvZ2luU3RhcnRUUyA9PT0gbG9naW5TdGFydFRTXG4gICAgICApIHtcbiAgICAgICAgbG9naW5JbmZvLmxvZ2dlZEluID0gdHJ1ZVxuICAgICAgICBsb2dpbkluZm8ubG9nZ2luZ0luUHJvbWlzZSA9IHVuZGVmaW5lZFxuICAgICAgICBsb2dpbkluZm8ubG9naW5TdGFydFRTID0gdW5kZWZpbmVkXG4gICAgICAgIGxvZ2luSW5mby5sb2dpblJlc3VsdCA9IGxvZ2luUmVzdWx0XG4gICAgICAgIHJldHVybiBsb2dpblJlc3VsdFxuICAgICAgfSBlbHNlIGlmIChjdXJMb2dpbkluZm8pIHtcbiAgICAgICAgaWYgKGN1ckxvZ2luSW5mby5sb2dnZWRJbiAmJiBjdXJMb2dpbkluZm8ubG9naW5SZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gY3VyTG9naW5JbmZvLmxvZ2luUmVzdWx0XG4gICAgICAgIH0gZWxzZSBpZiAoY3VyTG9naW5JbmZvLmxvZ2dpbmdJblByb21pc2UpIHtcbiAgICAgICAgICByZXR1cm4gY3VyTG9naW5JbmZvLmxvZ2dpbmdJblByb21pc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3dzIHVuZXhwZWN0ZWQgbG9naW4gaW5mbycpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignd3MgbG9naW4gaW5mbyByZXNldCcpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9naW5JbmZvLmxvZ2dlZEluID0gZmFsc2VcbiAgICAgIGxvZ2luSW5mby5sb2dnaW5nSW5Qcm9taXNlID0gdW5kZWZpbmVkXG4gICAgICBsb2dpbkluZm8ubG9naW5TdGFydFRTID0gdW5kZWZpbmVkXG4gICAgICBsb2dpbkluZm8ubG9naW5SZXN1bHQgPSB1bmRlZmluZWRcbiAgICAgIHRocm93IGVcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFdzU2lnbiA9IGFzeW5jICgpOiBQcm9taXNlPElXc1NpZ24+ID0+IHtcbiAgICBpZiAodGhpcy5fd3NTaWduICYmIHRoaXMuX3dzU2lnbi5leHBpcmVkVHMgPiBEYXRlLm5vdygpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fd3NTaWduXG4gICAgfVxuICAgIGNvbnN0IGV4cGlyZWRUcyA9IERhdGUubm93KCkgKyA2MDAwMFxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX2NvbnRleHQuYXBwQ29uZmlnLnJlcXVlc3Quc2VuZCgnYXV0aC53c1dlYlNpZ24nLCB7cnVudGltZTogZ2V0UnVudGltZSgpfSlcblxuICAgIGlmIChyZXMuY29kZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbdGNiLWpzLXNka10g6I635Y+W5a6e5pe25pWw5o2u5o6o6YCB55m75b2V56Wo5o2u5aSx6LSlOiAke3Jlcy5jb2RlfWApXG4gICAgfVxuXG4gICAgaWYgKHJlcy5kYXRhKSB7XG4gICAgICBjb25zdCB7c2lnblN0ciwgd3NVcmwsIHNlY3JldFZlcnNpb24sIGVudklkfSA9IHJlcy5kYXRhXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzaWduU3RyLFxuICAgICAgICB3c1VybCxcbiAgICAgICAgc2VjcmV0VmVyc2lvbixcbiAgICAgICAgZW52SWQsXG4gICAgICAgIGV4cGlyZWRUc1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1t0Y2ItanMtc2RrXSDojrflj5blrp7ml7bmlbDmja7mjqjpgIHnmbvlvZXnpajmja7lpLHotKUnKVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0V2FpdEV4cGVjdGVkVGltZW91dExlbmd0aCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuX3J0dE9ic2VydmVkLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIERFRkFVTFRfRVhQRUNURURfRVZFTlRfV0FJVF9USU1FXG4gICAgfVxuXG4gICAgLy8gMS41ICogUlRUXG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLl9ydHRPYnNlcnZlZC5yZWR1Y2UoKGFjYywgY3VyKSA9PiBhY2MgKyBjdXIpIC9cbiAgICAgICAgdGhpcy5fcnR0T2JzZXJ2ZWQubGVuZ3RoKSAqXG4gICAgICAxLjVcbiAgICApXG4gIH1cblxuICBwcml2YXRlIGhlYXJ0YmVhdChpbW1lZGlhdGU/OiBib29sZWFuKSB7XG4gICAgdGhpcy5jbGVhckhlYXJ0YmVhdCgpXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMuX3BpbmdUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KFxuICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghdGhpcy5fd3MgfHwgdGhpcy5fd3MucmVhZHlTdGF0ZSAhPT0gV1NfUkVBRFlfU1RBVEUuT1BFTikge1xuICAgICAgICAgICAgLy8gbm8gbmVlZCB0byBwaW5nXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9sYXN0UGluZ1NlbmRUUyA9IERhdGUubm93KClcbiAgICAgICAgICBhd2FpdCB0aGlzLnBpbmcoKVxuICAgICAgICAgIHRoaXMuX3BpbmdGYWlsZWQgPSAwXG5cbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgdGhpcy5fcG9uZ1RpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncG9uZyB0aW1lZCBvdXQnKVxuICAgICAgICAgICAgaWYgKHRoaXMuX3BvbmdNaXNzZWQgPCBERUZBVUxUX1BPTkdfTUlTU19UT0xFUkFOQ0UpIHtcbiAgICAgICAgICAgICAgdGhpcy5fcG9uZ01pc3NlZCsrXG4gICAgICAgICAgICAgIHRoaXMuaGVhcnRiZWF0KHRydWUpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBsb2dpY2FsIHBlcmNlaXZlZCBjb25uZWN0aW9uIGxvc3QsIGV2ZW4gdGhvdWdoIHdlYnNvY2tldCBkaWQgbm90IHJlY2VpdmUgZXJyb3Igb3IgY2xvc2UgZXZlbnRcbiAgICAgICAgICAgICAgdGhpcy5pbml0V2ViU29ja2V0Q29ubmVjdGlvbih0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHRoaXMuX2NvbnRleHQuYXBwQ29uZmlnLnJlYWx0aW1lUG9uZ1dhaXRUaW1lb3V0KVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX3BpbmdGYWlsZWQgPCBERUZBVUxUX1BJTkdfRkFJTF9UT0xFUkFOQ0UpIHtcbiAgICAgICAgICAgIHRoaXMuX3BpbmdGYWlsZWQrK1xuICAgICAgICAgICAgdGhpcy5oZWFydGJlYXQoKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKENMT1NFX0VWRU5UX0NPREUuSGVhcnRiZWF0UGluZ0Vycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGltbWVkaWF0ZSA/IDAgOiB0aGlzLl9jb250ZXh0LmFwcENvbmZpZy5yZWFsdGltZVBpbmdJbnRlcnZhbFxuICAgIClcbiAgfVxuXG4gIHByaXZhdGUgcGluZyA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBtc2c6IElSZXF1ZXN0TWVzc2FnZVBpbmdNc2cgPSB7XG4gICAgICB3YXRjaElkOiB1bmRlZmluZWQsXG4gICAgICByZXF1ZXN0SWQ6IGdlblJlcXVlc3RJZCgpLFxuICAgICAgbXNnVHlwZTogJ1BJTkcnLFxuICAgICAgbXNnRGF0YTogbnVsbFxuICAgIH1cbiAgICBhd2FpdCB0aGlzLnNlbmQoe1xuICAgICAgbXNnXG4gICAgfSlcbiAgICAvLyBjb25zb2xlLmxvZygncGluZyBzZW50JylcbiAgfVxuXG4gIHByaXZhdGUgb25XYXRjaFN0YXJ0ID0gKGNsaWVudDogVmlydHVhbFdlYlNvY2tldENsaWVudCwgcXVlcnlJRDogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5fcXVlcnlJZENsaWVudE1hcC5zZXQocXVlcnlJRCwgY2xpZW50KVxuICB9XG5cbiAgcHJpdmF0ZSBvbldhdGNoQ2xvc2UgPSAoY2xpZW50OiBWaXJ0dWFsV2ViU29ja2V0Q2xpZW50LCBxdWVyeUlEOiBzdHJpbmcpID0+IHtcbiAgICBpZiAocXVlcnlJRCkge1xuICAgICAgdGhpcy5fcXVlcnlJZENsaWVudE1hcC5kZWxldGUocXVlcnlJRClcbiAgICB9XG4gICAgdGhpcy5fd2F0Y2hJZENsaWVudE1hcC5kZWxldGUoY2xpZW50LndhdGNoSWQpXG4gICAgdGhpcy5fdmlydHVhbFdTQ2xpZW50LmRlbGV0ZShjbGllbnQpXG5cbiAgICBpZiAoIXRoaXMuX3ZpcnR1YWxXU0NsaWVudC5zaXplKSB7XG4gICAgICAvLyBubyBtb3JlIGV4aXN0aW5nIHdhdGNoLCB3ZSBzaG91bGQgcmVsZWFzZSB0aGUgd2Vic29ja2V0IGNvbm5lY3Rpb25cbiAgICAgIHRoaXMuY2xvc2UoQ0xPU0VfRVZFTlRfQ09ERS5Ob1JlYWx0aW1lTGlzdGVuZXJzKVxuICAgIH1cbiAgfVxufVxuIl19