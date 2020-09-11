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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import set from 'lodash.set';
import unset from 'lodash.unset';
import cloneDeep from 'lodash.clonedeep';
import { genRequestId } from './message';
import { RealtimeListener } from './listener';
import { Snapshot } from './snapshot';
import { ERR_CODE, CloudSDKError, isTimeoutError, CancelledError, isCancelledError, isRealtimeErrorMessageError } from './error';
import { sleep } from './utils';
var WATCH_STATUS;
(function (WATCH_STATUS) {
    WATCH_STATUS["LOGGINGIN"] = "LOGGINGIN";
    WATCH_STATUS["INITING"] = "INITING";
    WATCH_STATUS["REBUILDING"] = "REBUILDING";
    WATCH_STATUS["ACTIVE"] = "ACTIVE";
    WATCH_STATUS["ERRORED"] = "ERRORED";
    WATCH_STATUS["CLOSING"] = "CLOSING";
    WATCH_STATUS["CLOSED"] = "CLOSED";
    WATCH_STATUS["PAUSED"] = "PAUSED";
    WATCH_STATUS["RESUMING"] = "RESUMING";
})(WATCH_STATUS || (WATCH_STATUS = {}));
var DEFAULT_WAIT_TIME_ON_UNKNOWN_ERROR = 100;
var DEFAULT_MAX_AUTO_RETRY_ON_ERROR = 2;
var DEFAULT_MAX_SEND_ACK_AUTO_RETRY_ON_ERROR = 2;
var DEFAULT_SEND_ACK_DEBOUNCE_TIMEOUT = 10 * 1000;
var DEFAULT_INIT_WATCH_TIMEOUT = 10 * 1000;
var DEFAULT_REBUILD_WATCH_TIMEOUT = 10 * 1000;
var VirtualWebSocketClient = (function () {
    function VirtualWebSocketClient(options) {
        var _this = this;
        this.watchStatus = WATCH_STATUS.INITING;
        this._login = function (envId, refresh) { return __awaiter(_this, void 0, void 0, function () {
            var loginResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.watchStatus = WATCH_STATUS.LOGGINGIN;
                        return [4, this.login(envId, refresh)];
                    case 1:
                        loginResult = _a.sent();
                        if (!this.envId) {
                            this.envId = loginResult.envId;
                        }
                        return [2, loginResult];
                }
            });
        }); };
        this.initWatch = function (forceRefreshLogin) { return __awaiter(_this, void 0, void 0, function () {
            var success;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._initWatchPromise) {
                            return [2, this._initWatchPromise];
                        }
                        this._initWatchPromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var envId, initWatchMsg, initEventMsg, _a, events, currEvent, _i, events_1, e, snapshot, e_1;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 3, , 4]);
                                        if (this.watchStatus === WATCH_STATUS.PAUSED) {
                                            console.log('[realtime] initWatch cancelled on pause');
                                            return [2, resolve()];
                                        }
                                        return [4, this._login(this.envId, forceRefreshLogin)];
                                    case 1:
                                        envId = (_b.sent()).envId;
                                        if (this.watchStatus === WATCH_STATUS.PAUSED) {
                                            console.log('[realtime] initWatch cancelled on pause');
                                            return [2, resolve()];
                                        }
                                        this.watchStatus = WATCH_STATUS.INITING;
                                        initWatchMsg = {
                                            watchId: this.watchId,
                                            requestId: genRequestId(),
                                            msgType: 'INIT_WATCH',
                                            msgData: {
                                                envId: envId,
                                                collName: this.collectionName,
                                                query: this.query,
                                                limit: this.limit,
                                                orderBy: this.orderBy
                                            }
                                        };
                                        return [4, this.send({
                                                msg: initWatchMsg,
                                                waitResponse: true,
                                                skipOnMessage: true,
                                                timeout: DEFAULT_INIT_WATCH_TIMEOUT
                                            })];
                                    case 2:
                                        initEventMsg = _b.sent();
                                        _a = initEventMsg.msgData, events = _a.events, currEvent = _a.currEvent;
                                        this.sessionInfo = {
                                            queryID: initEventMsg.msgData.queryID,
                                            currentEventId: currEvent - 1,
                                            currentDocs: []
                                        };
                                        if (events.length > 0) {
                                            for (_i = 0, events_1 = events; _i < events_1.length; _i++) {
                                                e = events_1[_i];
                                                e.ID = currEvent;
                                            }
                                            this.handleServerEvents(initEventMsg);
                                        }
                                        else {
                                            this.sessionInfo.currentEventId = currEvent;
                                            snapshot = new Snapshot({
                                                id: currEvent,
                                                docChanges: [],
                                                docs: [],
                                                type: 'init'
                                            });
                                            this.listener.onChange(snapshot);
                                            this.scheduleSendACK();
                                        }
                                        this.onWatchStart(this, this.sessionInfo.queryID);
                                        this.watchStatus = WATCH_STATUS.ACTIVE;
                                        this._availableRetries.INIT_WATCH = DEFAULT_MAX_AUTO_RETRY_ON_ERROR;
                                        resolve();
                                        return [3, 4];
                                    case 3:
                                        e_1 = _b.sent();
                                        this.handleWatchEstablishmentError(e_1, {
                                            operationName: 'INIT_WATCH',
                                            resolve: resolve,
                                            reject: reject
                                        });
                                        return [3, 4];
                                    case 4: return [2];
                                }
                            });
                        }); });
                        success = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4, this._initWatchPromise];
                    case 2:
                        _a.sent();
                        success = true;
                        return [3, 4];
                    case 3:
                        this._initWatchPromise = undefined;
                        return [7];
                    case 4:
                        console.log("[realtime] initWatch " + (success ? 'success' : 'fail'));
                        return [2];
                }
            });
        }); };
        this.rebuildWatch = function (forceRefreshLogin) { return __awaiter(_this, void 0, void 0, function () {
            var success;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._rebuildWatchPromise) {
                            return [2, this._rebuildWatchPromise];
                        }
                        this._rebuildWatchPromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var envId, rebuildWatchMsg, nextEventMsg, e_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 3, , 4]);
                                        if (this.watchStatus === WATCH_STATUS.PAUSED) {
                                            console.log('[realtime] rebuildWatch cancelled on pause');
                                            return [2, resolve()];
                                        }
                                        return [4, this._login(this.envId, forceRefreshLogin)];
                                    case 1:
                                        envId = (_a.sent()).envId;
                                        if (!this.sessionInfo) {
                                            throw new Error('can not rebuildWatch without a successful initWatch (lack of sessionInfo)');
                                        }
                                        if (this.watchStatus === WATCH_STATUS.PAUSED) {
                                            console.log('[realtime] rebuildWatch cancelled on pause');
                                            return [2, resolve()];
                                        }
                                        this.watchStatus = WATCH_STATUS.REBUILDING;
                                        rebuildWatchMsg = {
                                            watchId: this.watchId,
                                            requestId: genRequestId(),
                                            msgType: 'REBUILD_WATCH',
                                            msgData: {
                                                envId: envId,
                                                collName: this.collectionName,
                                                queryID: this.sessionInfo.queryID,
                                                eventID: this.sessionInfo.currentEventId
                                            }
                                        };
                                        return [4, this.send({
                                                msg: rebuildWatchMsg,
                                                waitResponse: true,
                                                skipOnMessage: false,
                                                timeout: DEFAULT_REBUILD_WATCH_TIMEOUT
                                            })];
                                    case 2:
                                        nextEventMsg = _a.sent();
                                        this.handleServerEvents(nextEventMsg);
                                        this.watchStatus = WATCH_STATUS.ACTIVE;
                                        this._availableRetries.REBUILD_WATCH = DEFAULT_MAX_AUTO_RETRY_ON_ERROR;
                                        resolve();
                                        return [3, 4];
                                    case 3:
                                        e_2 = _a.sent();
                                        this.handleWatchEstablishmentError(e_2, {
                                            operationName: 'REBUILD_WATCH',
                                            resolve: resolve,
                                            reject: reject
                                        });
                                        return [3, 4];
                                    case 4: return [2];
                                }
                            });
                        }); });
                        success = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4, this._rebuildWatchPromise];
                    case 2:
                        _a.sent();
                        success = true;
                        return [3, 4];
                    case 3:
                        this._rebuildWatchPromise = undefined;
                        return [7];
                    case 4:
                        console.log("[realtime] rebuildWatch " + (success ? 'success' : 'fail'));
                        return [2];
                }
            });
        }); };
        this.handleWatchEstablishmentError = function (e, options) { return __awaiter(_this, void 0, void 0, function () {
            var isInitWatch, abortWatch, retry;
            var _this = this;
            return __generator(this, function (_a) {
                isInitWatch = options.operationName === 'INIT_WATCH';
                abortWatch = function () {
                    _this.closeWithError(new CloudSDKError({
                        errCode: isInitWatch
                            ? ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_INIT_WATCH_FAIL
                            : ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_REBUILD_WATCH_FAIL,
                        errMsg: e
                    }));
                    options.reject(e);
                };
                retry = function (refreshLogin) {
                    if (_this.useRetryTicket(options.operationName)) {
                        if (isInitWatch) {
                            _this._initWatchPromise = undefined;
                            options.resolve(_this.initWatch(refreshLogin));
                        }
                        else {
                            _this._rebuildWatchPromise = undefined;
                            options.resolve(_this.rebuildWatch(refreshLogin));
                        }
                    }
                    else {
                        abortWatch();
                    }
                };
                this.handleCommonError(e, {
                    onSignError: function () { return retry(true); },
                    onTimeoutError: function () { return retry(false); },
                    onNotRetryableError: abortWatch,
                    onCancelledError: options.reject,
                    onUnknownError: function () { return __awaiter(_this, void 0, void 0, function () {
                        var onWSDisconnected, e_3;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 8, , 9]);
                                    onWSDisconnected = function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    this.pause();
                                                    return [4, this.onceWSConnected()];
                                                case 1:
                                                    _a.sent();
                                                    retry(true);
                                                    return [2];
                                            }
                                        });
                                    }); };
                                    if (!!this.isWSConnected()) return [3, 2];
                                    return [4, onWSDisconnected()];
                                case 1:
                                    _a.sent();
                                    return [3, 7];
                                case 2: return [4, sleep(DEFAULT_WAIT_TIME_ON_UNKNOWN_ERROR)];
                                case 3:
                                    _a.sent();
                                    if (!(this.watchStatus === WATCH_STATUS.PAUSED)) return [3, 4];
                                    options.reject(new CancelledError(options.operationName + " cancelled due to pause after unknownError"));
                                    return [3, 7];
                                case 4:
                                    if (!!this.isWSConnected()) return [3, 6];
                                    return [4, onWSDisconnected()];
                                case 5:
                                    _a.sent();
                                    return [3, 7];
                                case 6:
                                    retry(false);
                                    _a.label = 7;
                                case 7: return [3, 9];
                                case 8:
                                    e_3 = _a.sent();
                                    retry(true);
                                    return [3, 9];
                                case 9: return [2];
                            }
                        });
                    }); }
                });
                return [2];
            });
        }); };
        this.closeWatch = function () { return __awaiter(_this, void 0, void 0, function () {
            var queryId, closeWatchMsg, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryId = this.sessionInfo ? this.sessionInfo.queryID : '';
                        if (this.watchStatus !== WATCH_STATUS.ACTIVE) {
                            this.watchStatus = WATCH_STATUS.CLOSED;
                            this.onWatchClose(this, queryId);
                            return [2];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.watchStatus = WATCH_STATUS.CLOSING;
                        closeWatchMsg = {
                            watchId: this.watchId,
                            requestId: genRequestId(),
                            msgType: 'CLOSE_WATCH',
                            msgData: null
                        };
                        return [4, this.send({
                                msg: closeWatchMsg
                            })];
                    case 2:
                        _a.sent();
                        this.sessionInfo = undefined;
                        this.watchStatus = WATCH_STATUS.CLOSED;
                        return [3, 5];
                    case 3:
                        e_4 = _a.sent();
                        this.closeWithError(new CloudSDKError({
                            errCode: ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_CLOSE_WATCH_FAIL,
                            errMsg: e_4
                        }));
                        return [3, 5];
                    case 4:
                        this.onWatchClose(this, queryId);
                        return [7];
                    case 5: return [2];
                }
            });
        }); };
        this.scheduleSendACK = function () {
            _this.clearACKSchedule();
            _this._ackTimeoutId = setTimeout(function () {
                if (_this._waitExpectedTimeoutId) {
                    _this.scheduleSendACK();
                }
                else {
                    _this.sendACK();
                }
            }, DEFAULT_SEND_ACK_DEBOUNCE_TIMEOUT);
        };
        this.clearACKSchedule = function () {
            if (_this._ackTimeoutId) {
                clearTimeout(_this._ackTimeoutId);
            }
        };
        this.sendACK = function () { return __awaiter(_this, void 0, void 0, function () {
            var ackMsg, e_5, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.watchStatus !== WATCH_STATUS.ACTIVE) {
                            this.scheduleSendACK();
                            return [2];
                        }
                        if (!this.sessionInfo) {
                            console.warn('[realtime listener] can not send ack without a successful initWatch (lack of sessionInfo)');
                            return [2];
                        }
                        ackMsg = {
                            watchId: this.watchId,
                            requestId: genRequestId(),
                            msgType: 'CHECK_LAST',
                            msgData: {
                                queryID: this.sessionInfo.queryID,
                                eventID: this.sessionInfo.currentEventId
                            }
                        };
                        return [4, this.send({
                                msg: ackMsg
                            })];
                    case 1:
                        _a.sent();
                        this.scheduleSendACK();
                        return [3, 3];
                    case 2:
                        e_5 = _a.sent();
                        if (isRealtimeErrorMessageError(e_5)) {
                            msg = e_5.payload;
                            switch (msg.msgData.code) {
                                case 'CHECK_LOGIN_FAILED':
                                case 'SIGN_EXPIRED_ERROR':
                                case 'SIGN_INVALID_ERROR':
                                case 'SIGN_PARAM_INVALID': {
                                    this.rebuildWatch();
                                    return [2];
                                }
                                case 'QUERYID_INVALID_ERROR':
                                case 'SYS_ERR':
                                case 'INVALIID_ENV':
                                case 'COLLECTION_PERMISSION_DENIED': {
                                    this.closeWithError(new CloudSDKError({
                                        errCode: ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_CHECK_LAST_FAIL,
                                        errMsg: msg.msgData.code
                                    }));
                                    return [2];
                                }
                                default: {
                                    break;
                                }
                            }
                        }
                        if (this._availableRetries.CHECK_LAST &&
                            this._availableRetries.CHECK_LAST > 0) {
                            this._availableRetries.CHECK_LAST--;
                            this.scheduleSendACK();
                        }
                        else {
                            this.closeWithError(new CloudSDKError({
                                errCode: ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_CHECK_LAST_FAIL,
                                errMsg: e_5
                            }));
                        }
                        return [3, 3];
                    case 3: return [2];
                }
            });
        }); };
        this.handleCommonError = function (e, options) {
            if (isRealtimeErrorMessageError(e)) {
                var msg = e.payload;
                switch (msg.msgData.code) {
                    case 'CHECK_LOGIN_FAILED':
                    case 'SIGN_EXPIRED_ERROR':
                    case 'SIGN_INVALID_ERROR':
                    case 'SIGN_PARAM_INVALID': {
                        options.onSignError(e);
                        return;
                    }
                    case 'QUERYID_INVALID_ERROR':
                    case 'SYS_ERR':
                    case 'INVALIID_ENV':
                    case 'COLLECTION_PERMISSION_DENIED': {
                        options.onNotRetryableError(e);
                        return;
                    }
                    default: {
                        options.onNotRetryableError(e);
                        return;
                    }
                }
            }
            else if (isTimeoutError(e)) {
                options.onTimeoutError(e);
                return;
            }
            else if (isCancelledError(e)) {
                options.onCancelledError(e);
                return;
            }
            options.onUnknownError(e);
        };
        this.watchId = "watchid_" + +new Date() + "_" + Math.random();
        this.envId = options.envId;
        this.collectionName = options.collectionName;
        this.query = options.query;
        this.limit = options.limit;
        this.orderBy = options.orderBy;
        this.send = options.send;
        this.login = options.login;
        this.isWSConnected = options.isWSConnected;
        this.onceWSConnected = options.onceWSConnected;
        this.getWaitExpectedTimeoutLength = options.getWaitExpectedTimeoutLength;
        this.onWatchStart = options.onWatchStart;
        this.onWatchClose = options.onWatchClose;
        this.debug = options.debug;
        this._availableRetries = {
            INIT_WATCH: DEFAULT_MAX_AUTO_RETRY_ON_ERROR,
            REBUILD_WATCH: DEFAULT_MAX_AUTO_RETRY_ON_ERROR,
            CHECK_LAST: DEFAULT_MAX_SEND_ACK_AUTO_RETRY_ON_ERROR
        };
        this.listener = new RealtimeListener({
            close: this.closeWatch,
            onChange: options.onChange,
            onError: options.onError,
            debug: this.debug,
            virtualClient: this
        });
        this.initWatch();
    }
    VirtualWebSocketClient.prototype.onMessage = function (msg) {
        var _this = this;
        switch (this.watchStatus) {
            case WATCH_STATUS.PAUSED: {
                if (msg.msgType !== 'ERROR') {
                    return;
                }
                break;
            }
            case WATCH_STATUS.LOGGINGIN:
            case WATCH_STATUS.INITING:
            case WATCH_STATUS.REBUILDING: {
                console.warn("[realtime listener] internal non-fatal error: unexpected message received while " + this.watchStatus);
                return;
            }
            case WATCH_STATUS.CLOSED: {
                console.warn('[realtime listener] internal non-fatal error: unexpected message received when the watch has closed');
                return;
            }
            case WATCH_STATUS.ERRORED: {
                console.warn('[realtime listener] internal non-fatal error: unexpected message received when the watch has ended with error');
                return;
            }
        }
        if (!this.sessionInfo) {
            console.warn('[realtime listener] internal non-fatal error: sessionInfo not found while message is received.');
            return;
        }
        this.scheduleSendACK();
        switch (msg.msgType) {
            case 'NEXT_EVENT': {
                console.warn("nextevent " + msg.msgData.currEvent + " ignored", msg);
                this.handleServerEvents(msg);
                break;
            }
            case 'CHECK_EVENT': {
                if (this.sessionInfo.currentEventId < msg.msgData.currEvent) {
                    this.sessionInfo.expectEventId = msg.msgData.currEvent;
                    this.clearWaitExpectedEvent();
                    this._waitExpectedTimeoutId = setTimeout(function () {
                        _this.rebuildWatch();
                    }, this.getWaitExpectedTimeoutLength());
                    console.log("[realtime] waitExpectedTimeoutLength " + this.getWaitExpectedTimeoutLength());
                }
                break;
            }
            case 'ERROR': {
                this.closeWithError(new CloudSDKError({
                    errCode: ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_SERVER_ERROR_MSG,
                    errMsg: msg.msgData.code + " - " + msg.msgData.message
                }));
                break;
            }
            default: {
                console.warn("[realtime listener] virtual client receive unexpected msg " + msg.msgType + ": ", msg);
                break;
            }
        }
    };
    VirtualWebSocketClient.prototype.closeWithError = function (error) {
        this.watchStatus = WATCH_STATUS.ERRORED;
        this.clearACKSchedule();
        this.listener.onError(error);
        this.onWatchClose(this, (this.sessionInfo && this.sessionInfo.queryID) || '');
        console.log("[realtime] client closed (" + this.collectionName + " " + this.query + ") (watchId " + this.watchId + ")");
    };
    VirtualWebSocketClient.prototype.pause = function () {
        this.watchStatus = WATCH_STATUS.PAUSED;
        console.log("[realtime] client paused (" + this.collectionName + " " + this.query + ") (watchId " + this.watchId + ")");
    };
    VirtualWebSocketClient.prototype.resume = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.watchStatus = WATCH_STATUS.RESUMING;
                        console.log("[realtime] client resuming with " + (this.sessionInfo ? 'REBUILD_WATCH' : 'INIT_WATCH') + " (" + this.collectionName + " " + this.query + ") (" + this.watchId + ")");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, (this.sessionInfo ? this.rebuildWatch() : this.initWatch())];
                    case 2:
                        _a.sent();
                        console.log("[realtime] client successfully resumed (" + this.collectionName + " " + this.query + ") (" + this.watchId + ")");
                        return [3, 4];
                    case 3:
                        e_6 = _a.sent();
                        console.error("[realtime] client resume failed (" + this.collectionName + " " + this.query + ") (" + this.watchId + ")", e_6);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    VirtualWebSocketClient.prototype.useRetryTicket = function (operationName) {
        if (this._availableRetries[operationName] &&
            this._availableRetries[operationName] > 0) {
            this._availableRetries[operationName]--;
            console.log("[realtime] " + operationName + " use a retry ticket, now only " + this._availableRetries[operationName] + " retry left");
            return true;
        }
        return false;
    };
    VirtualWebSocketClient.prototype.handleServerEvents = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.scheduleSendACK();
                        return [4, this._handleServerEvents(msg)];
                    case 1:
                        _a.sent();
                        this._postHandleServerEventsValidityCheck(msg);
                        return [3, 3];
                    case 2:
                        e_7 = _a.sent();
                        console.error('[realtime listener] internal non-fatal error: handle server events failed with error: ', e_7);
                        throw e_7;
                    case 3: return [2];
                }
            });
        });
    };
    VirtualWebSocketClient.prototype._handleServerEvents = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var requestId, events, msgType, sessionInfo, allChangeEvents, docs, initEncountered, _loop_1, this_1, i, len, state_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestId = msg.requestId;
                        events = msg.msgData.events;
                        msgType = msg.msgType;
                        if (!events.length || !this.sessionInfo) {
                            return [2];
                        }
                        sessionInfo = this.sessionInfo;
                        try {
                            allChangeEvents = events.map(getPublicEvent);
                        }
                        catch (e) {
                            this.closeWithError(new CloudSDKError({
                                errCode: ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_RECEIVE_INVALID_SERVER_DATA,
                                errMsg: e
                            }));
                            return [2];
                        }
                        docs = __spreadArrays(sessionInfo.currentDocs);
                        initEncountered = false;
                        _loop_1 = function (i, len) {
                            var change, localDoc, doc, fieldPath, _i, _a, fieldPath, err, err, doc, doc, err, ind, ind, docsSnapshot, docChanges, snapshot;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        change = allChangeEvents[i];
                                        if (!(sessionInfo.currentEventId >= change.id)) return [3, 1];
                                        if (!allChangeEvents[i - 1] || change.id > allChangeEvents[i - 1].id) {
                                            console.warn("[realtime] duplicate event received, cur " + sessionInfo.currentEventId + " but got " + change.id);
                                        }
                                        else {
                                            console.error("[realtime listener] server non-fatal error: events out of order (the latter event's id is smaller than that of the former) (requestId " + requestId + ")");
                                        }
                                        return [2, "continue"];
                                    case 1:
                                        if (!(sessionInfo.currentEventId === change.id - 1)) return [3, 2];
                                        switch (change.dataType) {
                                            case 'update': {
                                                if (!change.doc) {
                                                    switch (change.queueType) {
                                                        case 'update':
                                                        case 'dequeue': {
                                                            localDoc = docs.find(function (doc) { return doc._id === change.docId; });
                                                            if (localDoc) {
                                                                doc = cloneDeep(localDoc);
                                                                if (change.updatedFields) {
                                                                    for (fieldPath in change.updatedFields) {
                                                                        set(doc, fieldPath, change.updatedFields[fieldPath]);
                                                                    }
                                                                }
                                                                if (change.removedFields) {
                                                                    for (_i = 0, _a = change.removedFields; _i < _a.length; _i++) {
                                                                        fieldPath = _a[_i];
                                                                        unset(doc, fieldPath);
                                                                    }
                                                                }
                                                                change.doc = doc;
                                                            }
                                                            else {
                                                                console.error('[realtime listener] internal non-fatal server error: unexpected update dataType event where no doc is associated.');
                                                            }
                                                            break;
                                                        }
                                                        case 'enqueue': {
                                                            err = new CloudSDKError({
                                                                errCode: ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_UNEXPECTED_FATAL_ERROR,
                                                                errMsg: "HandleServerEvents: full doc is not provided with dataType=\"update\" and queueType=\"enqueue\" (requestId " + msg.requestId + ")"
                                                            });
                                                            this_1.closeWithError(err);
                                                            throw err;
                                                        }
                                                        default: {
                                                            break;
                                                        }
                                                    }
                                                }
                                                break;
                                            }
                                            case 'replace': {
                                                if (!change.doc) {
                                                    err = new CloudSDKError({
                                                        errCode: ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_UNEXPECTED_FATAL_ERROR,
                                                        errMsg: "HandleServerEvents: full doc is not provided with dataType=\"replace\" (requestId " + msg.requestId + ")"
                                                    });
                                                    this_1.closeWithError(err);
                                                    throw err;
                                                }
                                                break;
                                            }
                                            case 'remove': {
                                                doc = docs.find(function (doc) { return doc._id === change.docId; });
                                                if (doc) {
                                                    change.doc = doc;
                                                }
                                                else {
                                                    console.error('[realtime listener] internal non-fatal server error: unexpected remove event where no doc is associated.');
                                                }
                                                break;
                                            }
                                            case 'limit': {
                                                if (!change.doc) {
                                                    switch (change.queueType) {
                                                        case 'dequeue': {
                                                            doc = docs.find(function (doc) { return doc._id === change.docId; });
                                                            if (doc) {
                                                                change.doc = doc;
                                                            }
                                                            else {
                                                                console.error('[realtime listener] internal non-fatal server error: unexpected limit dataType event where no doc is associated.');
                                                            }
                                                            break;
                                                        }
                                                        case 'enqueue': {
                                                            err = new CloudSDKError({
                                                                errCode: ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_UNEXPECTED_FATAL_ERROR,
                                                                errMsg: "HandleServerEvents: full doc is not provided with dataType=\"limit\" and queueType=\"enqueue\" (requestId " + msg.requestId + ")"
                                                            });
                                                            this_1.closeWithError(err);
                                                            throw err;
                                                        }
                                                        default: {
                                                            break;
                                                        }
                                                    }
                                                }
                                                break;
                                            }
                                        }
                                        switch (change.queueType) {
                                            case 'init': {
                                                if (!initEncountered) {
                                                    initEncountered = true;
                                                    docs = [change.doc];
                                                }
                                                else {
                                                    docs.push(change.doc);
                                                }
                                                break;
                                            }
                                            case 'enqueue': {
                                                docs.push(change.doc);
                                                break;
                                            }
                                            case 'dequeue': {
                                                ind = docs.findIndex(function (doc) { return doc._id === change.docId; });
                                                if (ind > -1) {
                                                    docs.splice(ind, 1);
                                                }
                                                else {
                                                    console.error('[realtime listener] internal non-fatal server error: unexpected dequeue event where no doc is associated.');
                                                }
                                                break;
                                            }
                                            case 'update': {
                                                ind = docs.findIndex(function (doc) { return doc._id === change.docId; });
                                                if (ind > -1) {
                                                    docs[ind] = change.doc;
                                                }
                                                else {
                                                    console.error('[realtime listener] internal non-fatal server error: unexpected queueType update event where no doc is associated.');
                                                }
                                                break;
                                            }
                                        }
                                        if (i === len - 1 ||
                                            (allChangeEvents[i + 1] && allChangeEvents[i + 1].id !== change.id)) {
                                            docsSnapshot = __spreadArrays(docs);
                                            docChanges = allChangeEvents
                                                .slice(0, i + 1)
                                                .filter(function (c) { return c.id === change.id; });
                                            this_1.sessionInfo.currentEventId = change.id;
                                            this_1.sessionInfo.currentDocs = docs;
                                            snapshot = new Snapshot({
                                                id: change.id,
                                                docChanges: docChanges,
                                                docs: docsSnapshot,
                                                msgType: msgType
                                            });
                                            this_1.listener.onChange(snapshot);
                                        }
                                        return [3, 4];
                                    case 2:
                                        console.warn("[realtime listener] event received is out of order, cur " + this_1.sessionInfo.currentEventId + " but got " + change.id);
                                        return [4, this_1.rebuildWatch()];
                                    case 3:
                                        _b.sent();
                                        return [2, { value: void 0 }];
                                    case 4: return [2];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0, len = allChangeEvents.length;
                        _a.label = 1;
                    case 1:
                        if (!(i < len)) return [3, 4];
                        return [5, _loop_1(i, len)];
                    case 2:
                        state_1 = _a.sent();
                        if (typeof state_1 === "object")
                            return [2, state_1.value];
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    VirtualWebSocketClient.prototype._postHandleServerEventsValidityCheck = function (msg) {
        if (!this.sessionInfo) {
            console.error('[realtime listener] internal non-fatal error: sessionInfo lost after server event handling, this should never occur');
            return;
        }
        if (this.sessionInfo.expectEventId &&
            this.sessionInfo.currentEventId >= this.sessionInfo.expectEventId) {
            this.clearWaitExpectedEvent();
        }
        if (this.sessionInfo.currentEventId < msg.msgData.currEvent) {
            console.warn('[realtime listener] internal non-fatal error: client eventId does not match with server event id after server event handling');
            return;
        }
    };
    VirtualWebSocketClient.prototype.clearWaitExpectedEvent = function () {
        if (this._waitExpectedTimeoutId) {
            clearTimeout(this._waitExpectedTimeoutId);
            this._waitExpectedTimeoutId = undefined;
        }
    };
    return VirtualWebSocketClient;
}());
export { VirtualWebSocketClient };
function getPublicEvent(event) {
    var e = {
        id: event.ID,
        dataType: event.DataType,
        queueType: event.QueueType,
        docId: event.DocID,
        doc: event.Doc && event.Doc !== '{}' ? JSON.parse(event.Doc) : undefined
    };
    if (event.DataType === 'update') {
        if (event.UpdatedFields) {
            e.updatedFields = JSON.parse(event.UpdatedFields);
        }
        if (event.removedFields || event.RemovedFields) {
            e.removedFields = JSON.parse(event.removedFields);
        }
    }
    return e;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC13ZWJzb2NrZXQtY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZpcnR1YWwtd2Vic29ja2V0LWNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxHQUFHLE1BQU0sWUFBWSxDQUFBO0FBQzVCLE9BQU8sS0FBSyxNQUFNLGNBQWMsQ0FBQTtBQUNoQyxPQUFPLFNBQVMsTUFBTSxrQkFBa0IsQ0FBQTtBQUN4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sV0FBVyxDQUFBO0FBaUJ4QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFDN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUVyQyxPQUFPLEVBQ0wsUUFBUSxFQUNSLGFBQWEsRUFDYixjQUFjLEVBQ2QsY0FBYyxFQUNkLGdCQUFnQixFQUNoQiwyQkFBMkIsRUFHNUIsTUFBTSxTQUFTLENBQUE7QUFDaEIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQTtBQTRDL0IsSUFBSyxZQVVKO0FBVkQsV0FBSyxZQUFZO0lBQ2YsdUNBQXVCLENBQUE7SUFDdkIsbUNBQW1CLENBQUE7SUFDbkIseUNBQXlCLENBQUE7SUFDekIsaUNBQWlCLENBQUE7SUFDakIsbUNBQW1CLENBQUE7SUFDbkIsbUNBQW1CLENBQUE7SUFDbkIsaUNBQWlCLENBQUE7SUFDakIsaUNBQWlCLENBQUE7SUFDakIscUNBQXFCLENBQUE7QUFDdkIsQ0FBQyxFQVZJLFlBQVksS0FBWixZQUFZLFFBVWhCO0FBRUQsSUFBTSxrQ0FBa0MsR0FBRyxHQUFHLENBQUE7QUFDOUMsSUFBTSwrQkFBK0IsR0FBRyxDQUFDLENBQUE7QUFDekMsSUFBTSx3Q0FBd0MsR0FBRyxDQUFDLENBQUE7QUFDbEQsSUFBTSxpQ0FBaUMsR0FBRyxFQUFFLEdB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QUssRUFBRSxLQUFLLENBQUMsS0FBSztRQUNsQixHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7S0FDekUsQ0FBQTtJQUVELElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7UUFFL0IsSUFBSSxLQUFLLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLENBQUMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7U0FDbEQ7UUFHRCxJQUFJLEtBQUssQ0FBQyxhQUFhLElBQUksS0FBSyxDQUFDLGFBQWEsRUFBRTtZQUs5QyxDQUFDLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1NBQ2xEO0tBQ0Y7SUFFRCxPQUFPLENBQUMsQ0FBQTtBQUNWLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2V0IGZyb20gJ2xvZGFzaC5zZXQnXG5pbXBvcnQgdW5zZXQgZnJvbSAnbG9kYXNoLnVuc2V0J1xuaW1wb3J0IGNsb25lRGVlcCBmcm9tICdsb2Rhc2guY2xvbmVkZWVwJ1xuaW1wb3J0IHsgZ2VuUmVxdWVzdElkIH0gZnJvbSAnLi9tZXNzYWdlJ1xuaW1wb3J0IHtcbiAgSVJlc3BvbnNlTWVzc2FnZSxcbiAgSVJlcXVlc3RNZXNzYWdlSW5pdFdhdGNoTXNnLFxuICBJUmVzcG9uc2VNZXNzYWdlSW5pdEV2ZW50TXNnLFxuICBJREJFdmVudCxcbiAgSVJlcXVlc3RNZXNzYWdlUmVidWlsZFdhdGNoTXNnLFxuICBJUmVxdWVzdE1lc3NhZ2VDbG9zZVdhdGNoTXNnLFxuICBJUmVxdWVzdE1zZ1R5cGUsXG4gIElSZXNwb25zZU1lc3NhZ2VOZXh0RXZlbnRNc2csXG4gIElSZXF1ZXN0TWVzc2FnZUNoZWNrTGFzdE1zZyxcbiAgSVdhdGNoT3B0aW9uc1xufSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL3JlYWx0aW1lJ1xuaW1wb3J0IHsgXG4gIElTaW5nbGVEQkV2ZW50XG59IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvZGF0YWJhc2UnXG4vLyBpbXBvcnQgUmVwb3J0ZXIgZnJvbSBcIi4vZXh0ZXJuYWxzL3B1YmxpYy1saWIvcmVwb3J0ZXJcIlxuaW1wb3J0IHsgUmVhbHRpbWVMaXN0ZW5lciB9IGZyb20gJy4vbGlzdGVuZXInXG5pbXBvcnQgeyBTbmFwc2hvdCB9IGZyb20gJy4vc25hcHNob3QnXG5pbXBvcnQgeyBJV1NTZW5kT3B0aW9ucywgSUxvZ2luUmVzdWx0IH0gZnJvbSAnLi93ZWJzb2NrZXQtY2xpZW50J1xuaW1wb3J0IHsgXG4gIEVSUl9DT0RFLFxuICBDbG91ZFNES0Vycm9yLFxuICBpc1RpbWVvdXRFcnJvcixcbiAgQ2FuY2VsbGVkRXJyb3IsXG4gIGlzQ2FuY2VsbGVkRXJyb3IsXG4gIGlzUmVhbHRpbWVFcnJvck1lc3NhZ2VFcnJvciwgXG4gIFJlYWx0aW1lRXJyb3JNZXNzYWdlRXJyb3IsIFxuICBUaW1lb3V0RXJyb3IgXG59IGZyb20gJy4vZXJyb3InXG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJy4vdXRpbHMnXG5cbi8vID09PT09PT09PT09PT09PSBSZWFsdGltZSBWaXJ0dWFsIFdlYlNvY2tldCBDbGllbnQgKEludGVybmFsKSA9PT09PT09PT09PT09PT09PT09PVxuXG5pbnRlcmZhY2UgSVZpcnR1YWxXZWJTb2NrZXRDbGllbnRDb25zdHJ1Y3Rvck9wdGlvbnMgZXh0ZW5kcyBJV2F0Y2hPcHRpb25zIHtcbiAgLy8gd3M6IFJlYWx0aW1lV2ViU29ja2V0Q2xpZW50XG4gIGVudklkPzogc3RyaW5nXG4gIGNvbGxlY3Rpb25OYW1lOiBzdHJpbmdcbiAgcXVlcnk6IHN0cmluZ1xuICBsaW1pdD86IG51bWJlclxuICBvcmRlckJ5PzogUmVjb3JkPHN0cmluZywgc3RyaW5nPlxuICBzZW5kOiA8VCA9IGFueT4ob3B0czogSVdTU2VuZE9wdGlvbnMpID0+IFByb21pc2U8VD5cbiAgbG9naW46IChlbnZJZD86IHN0cmluZywgcmVmcmVzaD86IGJvb2xlYW4pID0+IFByb21pc2U8YW55PlxuICBpc1dTQ29ubmVjdGVkOiAoKSA9PiBib29sZWFuXG4gIG9uY2VXU0Nvbm5lY3RlZDogKCkgPT4gUHJvbWlzZTx2b2lkPlxuICBnZXRXYWl0RXhwZWN0ZWRUaW1lb3V0TGVuZ3RoOiAoKSA9PiBudW1iZXJcbiAgb25XYXRjaFN0YXJ0OiAoY2xpZW50OiBWaXJ0dWFsV2ViU29ja2V0Q2xpZW50LCBxdWVyeUlEOiBzdHJpbmcpID0+IHZvaWRcbiAgb25XYXRjaENsb3NlOiAoY2xpZW50OiBWaXJ0dWFsV2ViU29ja2V0Q2xpZW50LCBxdWVyeUlEOiBzdHJpbmcpID0+IHZvaWRcbiAgZGVidWc/OiBib29sZWFuXG59XG5cbmludGVyZmFjZSBJV2F0Y2hTZXNzaW9uSW5mbyB7XG4gIHF1ZXJ5SUQ6IHN0cmluZ1xuICBjdXJyZW50RXZlbnRJZDogbnVtYmVyXG4gIGN1cnJlbnREb2NzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+W11cbiAgZXhwZWN0RXZlbnRJZD86IG51bWJlclxufVxuXG5pbnRlcmZhY2UgSUhhbmRsZUNvbW1vbkVycm9yT3B0aW9ucyB7XG4gIG9uU2lnbkVycm9yOiAoZTogUmVhbHRpbWVFcnJvck1lc3NhZ2VFcnJvcikgPT4gdm9pZFxuICBvblRpbWVvdXRFcnJvcjogKGU6IFRpbWVvdXRFcnJvcikgPT4gdm9pZFxuICBvbkNhbmNlbGxlZEVycm9yOiAoZTogQ2FuY2VsbGVkRXJyb3IpID0+IHZvaWRcbiAgb25Ob3RSZXRyeWFibGVFcnJvcjogKGU6IFJlYWx0aW1lRXJyb3JNZXNzYWdlRXJyb3IpID0+IHZvaWRcbiAgb25Vbmtub3duRXJyb3I6IChlOiBhbnkpID0+IHZvaWRcbn1cblxuaW50ZXJmYWNlIElIYW5kbGVXYXRjaEVzdGFibGlzaG1lbnRFcnJvck9wdGlvbnMge1xuICBvcGVyYXRpb25OYW1lOiAnSU5JVF9XQVRDSCcgfCAnUkVCVUlMRF9XQVRDSCdcbiAgcmVzb2x2ZTogKHZhbHVlPzogUHJvbWlzZUxpa2U8dm9pZD4gfCB1bmRlZmluZWQpID0+IHZvaWRcbiAgcmVqZWN0OiAoZTogYW55KSA9PiB2b2lkXG4gIC8vIHJldHJ5OiAocmVmcmVzaExvZ2luPzogYm9vbGVhbikgPT4gdm9pZFxuICAvLyBhYm9ydFdhdGNoOiAoZTogYW55KSA9PiB2b2lkXG59XG5cbmVudW0gV0FUQ0hfU1RBVFVTIHtcbiAgTE9HR0lOR0lOID0gJ0xPR0dJTkdJTicsXG4gIElOSVRJTkcgPSAnSU5JVElORycsXG4gIFJFQlVJTERJTkcgPSAnUkVCVUlMRElORycsXG4gIEFDVElWRSA9ICdBQ1RJVkUnLFxuICBFUlJPUkVEID0gJ0VSUk9SRUQnLFxuICBDTE9TSU5HID0gJ0NMT1NJTkcnLFxuICBDTE9TRUQgPSAnQ0xPU0VEJyxcbiAgUEFVU0VEID0gJ1BBVVNFRCcsXG4gIFJFU1VNSU5HID0gJ1JFU1VNSU5HJ1xufVxuXG5jb25zdCBERUZBVUxUX1dBSVRfVElNRV9PTl9VTktOT1dOX0VSUk9SID0gMTAwXG5jb25zdCBERUZBVUxUX01BWF9BVVRPX1JFVFJZX09OX0VSUk9SID0gMlxuY29uc3QgREVGQVVMVF9NQVhfU0VORF9BQ0tfQVVUT19SRVRSWV9PTl9FUlJPUiA9IDJcbmNvbnN0IERFRkFVTFRfU0VORF9BQ0tfREVCT1VOQ0VfVElNRU9VVCA9IDEwICogMTAwMFxuY29uc3QgREVGQVVMVF9JTklUX1dBVENIX1RJTUVPVVQgPSAxMCAqIDEwMDBcbmNvbnN0IERFRkFVTFRfUkVCVUlMRF9XQVRDSF9USU1FT1VUID0gMTAgKiAxMDAwXG5cbmV4cG9ydCBjbGFzcyBWaXJ0dWFsV2ViU29ja2V0Q2xpZW50IHtcbiAgLy8gcGFzc2VkIG92ZXJcbiAgd2F0Y2hJZDogc3RyaW5nXG4gIC8vIG93blxuICBsaXN0ZW5lcjogUmVhbHRpbWVMaXN0ZW5lclxuICBwcml2YXRlIGVudklkPzogc3RyaW5nXG4gIHByaXZhdGUgY29sbGVjdGlvbk5hbWU6IHN0cmluZ1xuICBwcml2YXRlIHF1ZXJ5OiBzdHJpbmdcbiAgcHJpdmF0ZSBsaW1pdDogbnVtYmVyXG4gIHByaXZhdGUgb3JkZXJCeTogUmVjb3JkPHN0cmluZywgc3RyaW5nPlxuICBwcml2YXRlIHNlbmQ6IDxUID0gYW55PihvcHRzOiBJV1NTZW5kT3B0aW9ucykgPT4gUHJvbWlzZTxUPlxuICBwcml2YXRlIGxvZ2luOiAoZW52SWQ/OiBzdHJpbmcsIHJlZnJlc2g/OiBib29sZWFuKSA9PiBQcm9taXNlPGFueT5cbiAgcHJpdmF0ZSBpc1dTQ29ubmVjdGVkOiAoKSA9PiBib29sZWFuXG4gIHByaXZhdGUgb25jZVdTQ29ubmVjdGVkOiAoKSA9PiBQcm9taXNlPHZvaWQ+XG4gIHByaXZhdGUgZ2V0V2FpdEV4cGVjdGVkVGltZW91dExlbmd0aDogKCkgPT4gbnVtYmVyXG4gIHByaXZhdGUgb25XYXRjaFN0YXJ0OiAoXG4gICAgY2xpZW50OiBWaXJ0dWFsV2ViU29ja2V0Q2xpZW50LFxuICAgIHF1ZXJ5SUQ6IHN0cmluZ1xuICApID0+IHZvaWRcbiAgcHJpdmF0ZSBvbldhdGNoQ2xvc2U6IChcbiAgICBjbGllbnQ6IFZpcnR1YWxXZWJTb2NrZXRDbGllbnQsXG4gICAgcXVlcnlJRDogc3RyaW5nXG4gICkgPT4gdm9pZFxuICBwcml2YXRlIGRlYnVnPzogYm9vbGVhblxuXG4gIHByaXZhdGUgd2F0Y2hTdGF0dXM6IFdBVENIX1NUQVRVUyA9IFdBVENIX1NUQVRVUy5JTklUSU5HXG4gIHByaXZhdGUgX2F2YWlsYWJsZVJldHJpZXM6IFBhcnRpYWw8UmVjb3JkPElSZXF1ZXN0TXNnVHlwZSwgbnVtYmVyPj5cbiAgcHJpdmF0ZSBfYWNrVGltZW91dElkPzogbnVtYmVyXG4gIHByaXZhdGUgX2luaXRXYXRjaFByb21pc2U/OiBQcm9taXNlPHZvaWQ+XG4gIHByaXZhdGUgX3JlYnVpbGRXYXRjaFByb21pc2U/OiBQcm9taXNlPHZvaWQ+XG5cbiAgLy8gb2J0YWluZWRcbiAgcHJpdmF0ZSBzZXNzaW9uSW5mbz86IElXYXRjaFNlc3Npb25JbmZvXG5cbiAgLy8gaW50ZXJuYWxcbiAgcHJpdmF0ZSBfd2FpdEV4cGVjdGVkVGltZW91dElkPzogbnVtYmVyXG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogSVZpcnR1YWxXZWJTb2NrZXRDbGllbnRDb25zdHJ1Y3Rvck9wdGlvbnMpIHtcbiAgICB0aGlzLndhdGNoSWQgPSBgd2F0Y2hpZF8keytuZXcgRGF0ZSgpfV8ke01hdGgucmFuZG9tKCl9YFxuICAgIHRoaXMuZW52SWQgPSBvcHRpb25zLmVudklkXG4gICAgdGhpcy5jb2xsZWN0aW9uTmFtZSA9IG9wdGlvbnMuY29sbGVjdGlvbk5hbWVcbiAgICB0aGlzLnF1ZXJ5ID0gb3B0aW9ucy5xdWVyeVxuICAgIHRoaXMubGltaXQgPSBvcHRpb25zLmxpbWl0XG4gICAgdGhpcy5vcmRlckJ5ID0gb3B0aW9ucy5vcmRlckJ5XG4gICAgdGhpcy5zZW5kID0gb3B0aW9ucy5zZW5kXG4gICAgdGhpcy5sb2dpbiA9IG9wdGlvbnMubG9naW5cbiAgICB0aGlzLmlzV1NDb25uZWN0ZWQgPSBvcHRpb25zLmlzV1NDb25uZWN0ZWRcbiAgICB0aGlzLm9uY2VXU0Nvbm5lY3RlZCA9IG9wdGlvbnMub25jZVdTQ29ubmVjdGVkXG4gICAgdGhpcy5nZXRXYWl0RXhwZWN0ZWRUaW1lb3V0TGVuZ3RoID0gb3B0aW9ucy5nZXRXYWl0RXhwZWN0ZWRUaW1lb3V0TGVuZ3RoXG4gICAgdGhpcy5vbldhdGNoU3RhcnQgPSBvcHRpb25zLm9uV2F0Y2hTdGFydFxuICAgIHRoaXMub25XYXRjaENsb3NlID0gb3B0aW9ucy5vbldhdGNoQ2xvc2VcbiAgICB0aGlzLmRlYnVnID0gb3B0aW9ucy5kZWJ1Z1xuXG4gICAgdGhpcy5fYXZhaWxhYmxlUmV0cmllcyA9IHtcbiAgICAgIElOSVRfV0FUQ0g6IERFRkFVTFRfTUFYX0FVVE9fUkVUUllfT05fRVJST1IsXG4gICAgICBSRUJVSUxEX1dBVENIOiBERUZBVUxUX01BWF9BVVRPX1JFVFJZX09OX0VSUk9SLFxuICAgICAgQ0hFQ0tfTEFTVDogREVGQVVMVF9NQVhfU0VORF9BQ0tfQVVUT19SRVRSWV9PTl9FUlJPUlxuICAgIH1cblxuICAgIHRoaXMubGlzdGVuZXIgPSBuZXcgUmVhbHRpbWVMaXN0ZW5lcih7XG4gICAgICBjbG9zZTogdGhpcy5jbG9zZVdhdGNoLFxuICAgICAgb25DaGFuZ2U6IG9wdGlvbnMub25DaGFuZ2UsXG4gICAgICBvbkVycm9yOiBvcHRpb25zLm9uRXJyb3IsXG4gICAgICBkZWJ1ZzogdGhpcy5kZWJ1ZyxcbiAgICAgIHZpcnR1YWxDbGllbnQ6IHRoaXNcbiAgICB9KVxuXG4gICAgdGhpcy5pbml0V2F0Y2goKVxuICB9XG5cbiAgb25NZXNzYWdlKG1zZzogSVJlc3BvbnNlTWVzc2FnZSkge1xuICAgIC8vIHdhdGNoU3RhdHVzIHNhbml0eSBjaGVja1xuICAgIHN3aXRjaCAodGhpcy53YXRjaFN0YXR1cykge1xuICAgICAgY2FzZSBXQVRDSF9TVEFUVVMuUEFVU0VEOiB7XG4gICAgICAgIC8vIGlnbm9yZSBhbGwgYnV0IGVycm9yIG1lc3NhZ2VcbiAgICAgICAgaWYgKG1zZy5tc2dUeXBlICE9PSAnRVJST1InKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgV0FUQ0hfU1RBVFVTLkxPR0dJTkdJTjpcbiAgICAgIGNhc2UgV0FUQ0hfU1RBVFVTLklOSVRJTkc6XG4gICAgICBjYXNlIFdBVENIX1NUQVRVUy5SRUJVSUxESU5HOiB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgW3JlYWx0aW1lIGxpc3RlbmVyXSBpbnRlcm5hbCBub24tZmF0YWwgZXJyb3I6IHVuZXhwZWN0ZWQgbWVzc2FnZSByZWNlaXZlZCB3aGlsZSAke3RoaXMud2F0Y2hTdGF0dXN9YFxuICAgICAgICApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY2FzZSBXQVRDSF9TVEFUVVMuQ0xPU0VEOiB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAnW3JlYWx0aW1lIGxpc3RlbmVyXSBpbnRlcm5hbCBub24tZmF0YWwgZXJyb3I6IHVuZXhwZWN0ZWQgbWVzc2FnZSByZWNlaXZlZCB3aGVuIHRoZSB3YXRjaCBoYXMgY2xvc2VkJ1xuICAgICAgICApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY2FzZSBXQVRDSF9TVEFUVVMuRVJST1JFRDoge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgJ1tyZWFsdGltZSBsaXN0ZW5lcl0gaW50ZXJuYWwgbm9uLWZhdGFsIGVycm9yOiB1bmV4cGVjdGVkIG1lc3NhZ2UgcmVjZWl2ZWQgd2hlbiB0aGUgd2F0Y2ggaGFzIGVuZGVkIHdpdGggZXJyb3InXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnNlc3Npb25JbmZvKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdbcmVhbHRpbWUgbGlzdGVuZXJdIGludGVybmFsIG5vbi1mYXRhbCBlcnJvcjogc2Vzc2lvbkluZm8gbm90IGZvdW5kIHdoaWxlIG1lc3NhZ2UgaXMgcmVjZWl2ZWQuJ1xuICAgICAgKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5zY2hlZHVsZVNlbmRBQ0soKVxuXG4gICAgc3dpdGNoIChtc2cubXNnVHlwZSkge1xuICAgICAgY2FzZSAnTkVYVF9FVkVOVCc6IHtcbiAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgLy8gaWYgKHd4Ll9pZ25vcmUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBuZXh0ZXZlbnQgJHttc2cubXNnRGF0YS5jdXJyRXZlbnR9IGlnbm9yZWRgLCBtc2cpXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgLy8gd3guX2lnbm9yZSA9IGZhbHNlXG4gICAgICAgIC8vIHJldHVyblxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIH1cblxuICAgICAgICB0aGlzLmhhbmRsZVNlcnZlckV2ZW50cyhtc2cpXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlICdDSEVDS19FVkVOVCc6IHtcbiAgICAgICAgaWYgKHRoaXMuc2Vzc2lvbkluZm8uY3VycmVudEV2ZW50SWQgPCBtc2cubXNnRGF0YS5jdXJyRXZlbnQpIHtcbiAgICAgICAgICAvLyBjbGllbnQgZXZlbnRJRCA8IHNlcnZlciBldmVudElEOlxuICAgICAgICAgIC8vIHRoZXJlIG1pZ2h0IGJlIG9uZSBvciBtb3JlIHBlbmRpbmcgZXZlbnRzIG5vdCB5ZXQgcmVjZWl2ZWQgYnV0IHNlbnQgYnkgdGhlIHNlcnZlclxuICAgICAgICAgIHRoaXMuc2Vzc2lvbkluZm8uZXhwZWN0RXZlbnRJZCA9IG1zZy5tc2dEYXRhLmN1cnJFdmVudFxuICAgICAgICAgIHRoaXMuY2xlYXJXYWl0RXhwZWN0ZWRFdmVudCgpXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHRoaXMuX3dhaXRFeHBlY3RlZFRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgLy8gbXVzdCByZWJ1aWxkIHdhdGNoXG4gICAgICAgICAgICB0aGlzLnJlYnVpbGRXYXRjaCgpXG4gICAgICAgICAgfSwgdGhpcy5nZXRXYWl0RXhwZWN0ZWRUaW1lb3V0TGVuZ3RoKCkpXG5cbiAgICAgICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBbcmVhbHRpbWVdIHdhaXRFeHBlY3RlZFRpbWVvdXRMZW5ndGggJHt0aGlzLmdldFdhaXRFeHBlY3RlZFRpbWVvdXRMZW5ndGgoKX1gXG4gICAgICAgICAgKVxuICAgICAgICAgIC8vIH1cbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSAnRVJST1InOiB7XG4gICAgICAgIC8vIHJlY2VpdmUgc2VydmVyIGVycm9yXG4gICAgICAgIHRoaXMuY2xvc2VXaXRoRXJyb3IoXG4gICAgICAgICAgbmV3IENsb3VkU0RLRXJyb3Ioe1xuICAgICAgICAgICAgZXJyQ29kZTogRVJSX0NPREUuU0RLX0RBVEFCQVNFX1JFQUxUSU1FX0xJU1RFTkVSX1NFUlZFUl9FUlJPUl9NU0cgYXMgc3RyaW5nLFxuICAgICAgICAgICAgZXJyTXNnOiBgJHttc2cubXNnRGF0YS5jb2RlfSAtICR7bXNnLm1zZ0RhdGEubWVzc2FnZX1gXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBbcmVhbHRpbWUgbGlzdGVuZXJdIHZpcnR1YWwgY2xpZW50IHJlY2VpdmUgdW5leHBlY3RlZCBtc2cgJHttc2cubXNnVHlwZX06IGAsXG4gICAgICAgICAgbXNnXG4gICAgICAgIClcbiAgICAgICAgLy8gfVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNsb3NlV2l0aEVycm9yKGVycm9yOiBhbnkpIHtcbiAgICB0aGlzLndhdGNoU3RhdHVzID0gV0FUQ0hfU1RBVFVTLkVSUk9SRURcbiAgICB0aGlzLmNsZWFyQUNLU2NoZWR1bGUoKVxuICAgIHRoaXMubGlzdGVuZXIub25FcnJvcihlcnJvcilcbiAgICAvLyBSZXBvcnRlci5zdXJyb3VuZFRoaXJkQnlUcnlDYXRjaCgoKSA9PiB0aGlzLmxpc3RlbmVyLm9uRXJyb3IoZXJyb3IpKVxuICAgIHRoaXMub25XYXRjaENsb3NlKFxuICAgICAgdGhpcyxcbiAgICAgICh0aGlzLnNlc3Npb25JbmZvICYmIHRoaXMuc2Vzc2lvbkluZm8ucXVlcnlJRCkgfHwgJydcbiAgICApXG5cbiAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBbcmVhbHRpbWVdIGNsaWVudCBjbG9zZWQgKCR7dGhpcy5jb2xsZWN0aW9uTmFtZX0gJHt0aGlzLnF1ZXJ5fSkgKHdhdGNoSWQgJHt0aGlzLndhdGNoSWR9KWBcbiAgICApXG4gICAgLy8gfVxuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy53YXRjaFN0YXR1cyA9IFdBVENIX1NUQVRVUy5QQVVTRURcbiAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBbcmVhbHRpbWVdIGNsaWVudCBwYXVzZWQgKCR7dGhpcy5jb2xsZWN0aW9uTmFtZX0gJHt0aGlzLnF1ZXJ5fSkgKHdhdGNoSWQgJHt0aGlzLndhdGNoSWR9KWBcbiAgICApXG4gICAgLy8gfVxuICB9XG5cbiAgLy8gcmVzdW1lKCkge1xuICAvLyAgIHJldHVybiB0aGlzLnNlc3Npb25JbmZvID8gdGhpcy5yZWJ1aWxkV2F0Y2goKSA6IHRoaXMuaW5pdFdhdGNoKClcbiAgLy8gfVxuXG4gIGFzeW5jIHJlc3VtZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLndhdGNoU3RhdHVzID0gV0FUQ0hfU1RBVFVTLlJFU1VNSU5HXG5cbiAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBbcmVhbHRpbWVdIGNsaWVudCByZXN1bWluZyB3aXRoICR7XG4gICAgICAgIHRoaXMuc2Vzc2lvbkluZm8gPyAnUkVCVUlMRF9XQVRDSCcgOiAnSU5JVF9XQVRDSCdcbiAgICAgIH0gKCR7dGhpcy5jb2xsZWN0aW9uTmFtZX0gJHt0aGlzLnF1ZXJ5fSkgKCR7dGhpcy53YXRjaElkfSlgXG4gICAgKVxuICAgIC8vIH1cblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCAodGhpcy5zZXNzaW9uSW5mbyA/IHRoaXMucmVidWlsZFdhdGNoKCkgOiB0aGlzLmluaXRXYXRjaCgpKVxuXG4gICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgW3JlYWx0aW1lXSBjbGllbnQgc3VjY2Vzc2Z1bGx5IHJlc3VtZWQgKCR7dGhpcy5jb2xsZWN0aW9uTmFtZX0gJHt0aGlzLnF1ZXJ5fSkgKCR7dGhpcy53YXRjaElkfSlgXG4gICAgICApXG4gICAgICAvLyB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICBgW3JlYWx0aW1lXSBjbGllbnQgcmVzdW1lIGZhaWxlZCAoJHt0aGlzLmNvbGxlY3Rpb25OYW1lfSAke3RoaXMucXVlcnl9KSAoJHt0aGlzLndhdGNoSWR9KWAsXG4gICAgICAgIGVcbiAgICAgIClcbiAgICAgIC8vIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9sb2dpbiA9IGFzeW5jIChcbiAgICBlbnZJZD86IHN0cmluZyxcbiAgICByZWZyZXNoPzogYm9vbGVhblxuICApOiBQcm9taXNlPElMb2dpblJlc3VsdD4gPT4ge1xuICAgIHRoaXMud2F0Y2hTdGF0dXMgPSBXQVRDSF9TVEFUVVMuTE9HR0lOR0lOXG4gICAgY29uc3QgbG9naW5SZXN1bHQgPSBhd2FpdCB0aGlzLmxvZ2luKGVudklkLCByZWZyZXNoKVxuICAgIGlmICghdGhpcy5lbnZJZCkge1xuICAgICAgdGhpcy5lbnZJZCA9IGxvZ2luUmVzdWx0LmVudklkXG4gICAgfVxuICAgIHJldHVybiBsb2dpblJlc3VsdFxuICB9XG5cbiAgcHJpdmF0ZSBpbml0V2F0Y2ggPSBhc3luYyAoZm9yY2VSZWZyZXNoTG9naW4/OiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKHRoaXMuX2luaXRXYXRjaFByb21pc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pbml0V2F0Y2hQcm9taXNlXG4gICAgfVxuXG4gICAgdGhpcy5faW5pdFdhdGNoUHJvbWlzZSA9IG5ldyBQcm9taXNlPHZvaWQ+KFxuICAgICAgYXN5bmMgKHJlc29sdmUsIHJlamVjdCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICh0aGlzLndhdGNoU3RhdHVzID09PSBXQVRDSF9TVEFUVVMuUEFVU0VEKSB7XG4gICAgICAgICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbcmVhbHRpbWVdIGluaXRXYXRjaCBjYW5jZWxsZWQgb24gcGF1c2UnKVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHsgZW52SWQgfSA9IGF3YWl0IHRoaXMuX2xvZ2luKHRoaXMuZW52SWQsIGZvcmNlUmVmcmVzaExvZ2luKVxuXG4gICAgICAgICAgLy8gaWYgKCF0aGlzLnNlc3Npb25JbmZvKSB7XG4gICAgICAgICAgLy8gICB0aHJvdyBuZXcgRXJyb3IoYGNhbiBub3QgcmVidWlsZFdhdGNoIHdpdGhvdXQgYSBzdWNjZXNzZnVsIGluaXRXYXRjaCAobGFjayBvZiBzZXNzaW9uSW5mbylgKVxuICAgICAgICAgIC8vIH1cblxuICAgICAgICAgIGlmICgodGhpcy53YXRjaFN0YXR1cyBhcyBXQVRDSF9TVEFUVVMpID09PSBXQVRDSF9TVEFUVVMuUEFVU0VEKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnW3JlYWx0aW1lXSBpbml0V2F0Y2ggY2FuY2VsbGVkIG9uIHBhdXNlJylcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLndhdGNoU3RhdHVzID0gV0FUQ0hfU1RBVFVTLklOSVRJTkdcblxuICAgICAgICAgIGNvbnN0IGluaXRXYXRjaE1zZzogSVJlcXVlc3RNZXNzYWdlSW5pdFdhdGNoTXNnID0ge1xuICAgICAgICAgICAgd2F0Y2hJZDogdGhpcy53YXRjaElkLFxuICAgICAgICAgICAgcmVxdWVzdElkOiBnZW5SZXF1ZXN0SWQoKSxcbiAgICAgICAgICAgIG1zZ1R5cGU6ICdJTklUX1dBVENIJyxcbiAgICAgICAgICAgIG1zZ0RhdGE6IHtcbiAgICAgICAgICAgICAgZW52SWQsXG4gICAgICAgICAgICAgIGNvbGxOYW1lOiB0aGlzLmNvbGxlY3Rpb25OYW1lLFxuICAgICAgICAgICAgICBxdWVyeTogdGhpcy5xdWVyeSxcbiAgICAgICAgICAgICAgbGltaXQ6IHRoaXMubGltaXQsXG4gICAgICAgICAgICAgIG9yZGVyQnk6IHRoaXMub3JkZXJCeVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGluaXRFdmVudE1zZyA9IGF3YWl0IHRoaXMuc2VuZDxJUmVzcG9uc2VNZXNzYWdlSW5pdEV2ZW50TXNnPih7XG4gICAgICAgICAgICBtc2c6IGluaXRXYXRjaE1zZyxcbiAgICAgICAgICAgIHdhaXRSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgICAgIHNraXBPbk1lc3NhZ2U6IHRydWUsXG4gICAgICAgICAgICB0aW1lb3V0OiBERUZBVUxUX0lOSVRfV0FUQ0hfVElNRU9VVFxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBjb25zdCB7IGV2ZW50cywgY3VyckV2ZW50IH0gPSBpbml0RXZlbnRNc2cubXNnRGF0YVxuXG4gICAgICAgICAgdGhpcy5zZXNzaW9uSW5mbyA9IHtcbiAgICAgICAgICAgIHF1ZXJ5SUQ6IGluaXRFdmVudE1zZy5tc2dEYXRhLnF1ZXJ5SUQsXG4gICAgICAgICAgICBjdXJyZW50RXZlbnRJZDogY3VyckV2ZW50IC0gMSxcbiAgICAgICAgICAgIGN1cnJlbnREb2NzOiBbXVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEZJWDogaW4gaW5pdEV2ZW50IG1lc3NhZ2UsIGFsbCBldmVudHMgaGF2ZSBpZCAwLCB3aGljaCBpcyBpbmNvbnNpc3RlbnQgd2l0aCBjdXJyRXZlbnRcbiAgICAgICAgICBpZiAoZXZlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZSBvZiBldmVudHMpIHtcbiAgICAgICAgICAgICAgZS5JRCA9IGN1cnJFdmVudFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJFdmVudHMoaW5pdEV2ZW50TXNnKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlc3Npb25JbmZvLmN1cnJlbnRFdmVudElkID0gY3VyckV2ZW50XG4gICAgICAgICAgICBjb25zdCBzbmFwc2hvdCA9IG5ldyBTbmFwc2hvdCh7XG4gICAgICAgICAgICAgIGlkOiBjdXJyRXZlbnQsXG4gICAgICAgICAgICAgIGRvY0NoYW5nZXM6IFtdLFxuICAgICAgICAgICAgICBkb2NzOiBbXSxcbiAgICAgICAgICAgICAgdHlwZTogJ2luaXQnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lci5vbkNoYW5nZShzbmFwc2hvdClcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVTZW5kQUNLKClcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5vbldhdGNoU3RhcnQodGhpcywgdGhpcy5zZXNzaW9uSW5mby5xdWVyeUlEKVxuICAgICAgICAgIHRoaXMud2F0Y2hTdGF0dXMgPSBXQVRDSF9TVEFUVVMuQUNUSVZFXG4gICAgICAgICAgdGhpcy5fYXZhaWxhYmxlUmV0cmllcy5JTklUX1dBVENIID0gREVGQVVMVF9NQVhfQVVUT19SRVRSWV9PTl9FUlJPUlxuICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVXYXRjaEVzdGFibGlzaG1lbnRFcnJvcihlLCB7XG4gICAgICAgICAgICBvcGVyYXRpb25OYW1lOiAnSU5JVF9XQVRDSCcsXG4gICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIClcblxuICAgIGxldCBzdWNjZXNzID0gZmFsc2VcblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLl9pbml0V2F0Y2hQcm9taXNlXG4gICAgICBzdWNjZXNzID0gdHJ1ZVxuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLl9pbml0V2F0Y2hQcm9taXNlID0gdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgY29uc29sZS5sb2coYFtyZWFsdGltZV0gaW5pdFdhdGNoICR7c3VjY2VzcyA/ICdzdWNjZXNzJyA6ICdmYWlsJ31gKVxuICAgIC8vIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVidWlsZFdhdGNoID0gYXN5bmMgKGZvcmNlUmVmcmVzaExvZ2luPzogYm9vbGVhbik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmICh0aGlzLl9yZWJ1aWxkV2F0Y2hQcm9taXNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVidWlsZFdhdGNoUHJvbWlzZVxuICAgIH1cblxuICAgIHRoaXMuX3JlYnVpbGRXYXRjaFByb21pc2UgPSBuZXcgUHJvbWlzZTx2b2lkPihcbiAgICAgIGFzeW5jIChyZXNvbHZlLCByZWplY3QpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAodGhpcy53YXRjaFN0YXR1cyA9PT0gV0FUQ0hfU1RBVFVTLlBBVVNFRCkge1xuICAgICAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnW3JlYWx0aW1lXSByZWJ1aWxkV2F0Y2ggY2FuY2VsbGVkIG9uIHBhdXNlJylcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKClcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgeyBlbnZJZCB9ID0gYXdhaXQgdGhpcy5fbG9naW4odGhpcy5lbnZJZCwgZm9yY2VSZWZyZXNoTG9naW4pXG5cbiAgICAgICAgICBpZiAoIXRoaXMuc2Vzc2lvbkluZm8pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgJ2NhbiBub3QgcmVidWlsZFdhdGNoIHdpdGhvdXQgYSBzdWNjZXNzZnVsIGluaXRXYXRjaCAobGFjayBvZiBzZXNzaW9uSW5mbyknXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCh0aGlzLndhdGNoU3RhdHVzIGFzIFdBVENIX1NUQVRVUykgPT09IFdBVENIX1NUQVRVUy5QQVVTRUQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbcmVhbHRpbWVdIHJlYnVpbGRXYXRjaCBjYW5jZWxsZWQgb24gcGF1c2UnKVxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMud2F0Y2hTdGF0dXMgPSBXQVRDSF9TVEFUVVMuUkVCVUlMRElOR1xuXG4gICAgICAgICAgY29uc3QgcmVidWlsZFdhdGNoTXNnOiBJUmVxdWVzdE1lc3NhZ2VSZWJ1aWxkV2F0Y2hNc2cgPSB7XG4gICAgICAgICAgICB3YXRjaElkOiB0aGlzLndhdGNoSWQsXG4gICAgICAgICAgICByZXF1ZXN0SWQ6IGdlblJlcXVlc3RJZCgpLFxuICAgICAgICAgICAgbXNnVHlwZTogJ1JFQlVJTERfV0FUQ0gnLFxuICAgICAgICAgICAgbXNnRGF0YToge1xuICAgICAgICAgICAgICBlbnZJZCxcbiAgICAgICAgICAgICAgY29sbE5hbWU6IHRoaXMuY29sbGVjdGlvbk5hbWUsXG4gICAgICAgICAgICAgIHF1ZXJ5SUQ6IHRoaXMuc2Vzc2lvbkluZm8ucXVlcnlJRCxcbiAgICAgICAgICAgICAgZXZlbnRJRDogdGhpcy5zZXNzaW9uSW5mby5jdXJyZW50RXZlbnRJZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG5leHRFdmVudE1zZyA9IGF3YWl0IHRoaXMuc2VuZDxJUmVzcG9uc2VNZXNzYWdlTmV4dEV2ZW50TXNnPih7XG4gICAgICAgICAgICBtc2c6IHJlYnVpbGRXYXRjaE1zZyxcbiAgICAgICAgICAgIHdhaXRSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgICAgIHNraXBPbk1lc3NhZ2U6IGZhbHNlLFxuICAgICAgICAgICAgdGltZW91dDogREVGQVVMVF9SRUJVSUxEX1dBVENIX1RJTUVPVVRcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJFdmVudHMobmV4dEV2ZW50TXNnKVxuXG4gICAgICAgICAgdGhpcy53YXRjaFN0YXR1cyA9IFdBVENIX1NUQVRVUy5BQ1RJVkVcbiAgICAgICAgICB0aGlzLl9hdmFpbGFibGVSZXRyaWVzLlJFQlVJTERfV0FUQ0ggPSBERUZBVUxUX01BWF9BVVRPX1JFVFJZX09OX0VSUk9SXG4gICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aGlzLmhhbmRsZVdhdGNoRXN0YWJsaXNobWVudEVycm9yKGUsIHtcbiAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6ICdSRUJVSUxEX1dBVENIJyxcbiAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICByZWplY3RcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgKVxuXG4gICAgbGV0IHN1Y2Nlc3MgPSBmYWxzZVxuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuX3JlYnVpbGRXYXRjaFByb21pc2VcbiAgICAgIHN1Y2Nlc3MgPSB0cnVlXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuX3JlYnVpbGRXYXRjaFByb21pc2UgPSB1bmRlZmluZWRcbiAgICB9XG5cbiAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICBjb25zb2xlLmxvZyhgW3JlYWx0aW1lXSByZWJ1aWxkV2F0Y2ggJHtzdWNjZXNzID8gJ3N1Y2Nlc3MnIDogJ2ZhaWwnfWApXG4gICAgLy8gfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVXYXRjaEVzdGFibGlzaG1lbnRFcnJvciA9IGFzeW5jIChcbiAgICBlOiBhbnksXG4gICAgb3B0aW9uczogSUhhbmRsZVdhdGNoRXN0YWJsaXNobWVudEVycm9yT3B0aW9uc1xuICApID0+IHtcbiAgICBjb25zdCBpc0luaXRXYXRjaCA9IG9wdGlvbnMub3BlcmF0aW9uTmFtZSA9PT0gJ0lOSVRfV0FUQ0gnXG5cbiAgICBjb25zdCBhYm9ydFdhdGNoID0gKCkgPT4ge1xuICAgICAgLy8gbW9jayB0ZW1wIGNvbW1lbnRcbiAgICAgIHRoaXMuY2xvc2VXaXRoRXJyb3IoXG4gICAgICAgIG5ldyBDbG91ZFNES0Vycm9yKHtcbiAgICAgICAgICBlcnJDb2RlOiBpc0luaXRXYXRjaFxuICAgICAgICAgICAgPyAoRVJSX0NPREUuU0RLX0RBVEFCQVNFX1JFQUxUSU1FX0xJU1RFTkVSX0lOSVRfV0FUQ0hfRkFJTCBhcyBzdHJpbmcpXG4gICAgICAgICAgICA6IChFUlJfQ09ERS5TREtfREFUQUJBU0VfUkVBTFRJTUVfTElTVEVORVJfUkVCVUlMRF9XQVRDSF9GQUlMIGFzIHN0cmluZyksXG4gICAgICAgICAgZXJyTXNnOiBlXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICBvcHRpb25zLnJlamVjdChlKVxuICAgIH1cblxuICAgIGNvbnN0IHJldHJ5ID0gKHJlZnJlc2hMb2dpbj86IGJvb2xlYW4pID0+IHtcbiAgICAgIGlmICh0aGlzLnVzZVJldHJ5VGlja2V0KG9wdGlvbnMub3BlcmF0aW9uTmFtZSkpIHtcbiAgICAgICAgaWYgKGlzSW5pdFdhdGNoKSB7XG4gICAgICAgICAgdGhpcy5faW5pdFdhdGNoUHJvbWlzZSA9IHVuZGVmaW5lZFxuICAgICAgICAgIG9wdGlvbnMucmVzb2x2ZSh0aGlzLmluaXRXYXRjaChyZWZyZXNoTG9naW4pKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3JlYnVpbGRXYXRjaFByb21pc2UgPSB1bmRlZmluZWRcbiAgICAgICAgICBvcHRpb25zLnJlc29sdmUodGhpcy5yZWJ1aWxkV2F0Y2gocmVmcmVzaExvZ2luKSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWJvcnRXYXRjaCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVDb21tb25FcnJvcihlLCB7XG4gICAgICBvblNpZ25FcnJvcjogKCkgPT4gcmV0cnkodHJ1ZSksXG4gICAgICBvblRpbWVvdXRFcnJvcjogKCkgPT4gcmV0cnkoZmFsc2UpLFxuICAgICAgb25Ob3RSZXRyeWFibGVFcnJvcjogYWJvcnRXYXRjaCxcbiAgICAgIG9uQ2FuY2VsbGVkRXJyb3I6IG9wdGlvbnMucmVqZWN0LFxuICAgICAgb25Vbmtub3duRXJyb3I6IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBvbldTRGlzY29ubmVjdGVkID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYXVzZSgpXG4gICAgICAgICAgICBhd2FpdCB0aGlzLm9uY2VXU0Nvbm5lY3RlZCgpXG4gICAgICAgICAgICByZXRyeSh0cnVlKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghdGhpcy5pc1dTQ29ubmVjdGVkKCkpIHtcbiAgICAgICAgICAgIGF3YWl0IG9uV1NEaXNjb25uZWN0ZWQoKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCBzbGVlcChERUZBVUxUX1dBSVRfVElNRV9PTl9VTktOT1dOX0VSUk9SKVxuICAgICAgICAgICAgaWYgKHRoaXMud2F0Y2hTdGF0dXMgPT09IFdBVENIX1NUQVRVUy5QQVVTRUQpIHtcbiAgICAgICAgICAgICAgLy8gY2FuY2VsXG4gICAgICAgICAgICAgIG9wdGlvbnMucmVqZWN0KFxuICAgICAgICAgICAgICAgIG5ldyBDYW5jZWxsZWRFcnJvcihcbiAgICAgICAgICAgICAgICAgIGAke29wdGlvbnMub3BlcmF0aW9uTmFtZX0gY2FuY2VsbGVkIGR1ZSB0byBwYXVzZSBhZnRlciB1bmtub3duRXJyb3JgXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzV1NDb25uZWN0ZWQoKSkge1xuICAgICAgICAgICAgICBhd2FpdCBvbldTRGlzY29ubmVjdGVkKClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHJ5KGZhbHNlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgZXJyb3Igd2hpbGUgaGFuZGxpbmcgZXJyb3IsIGluIG9yZGVyIHRvIHByb3ZpZGUgbWF4aW11bSBlZmZvcnQgb24gU0VBTUlOR0xFU1MgRkFVTFQgVE9MRVJBTkNFLCBqdXN0IHJldHJ5XG4gICAgICAgICAgcmV0cnkodHJ1ZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBwcml2YXRlIGNsb3NlV2F0Y2ggPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcXVlcnlJZCA9IHRoaXMuc2Vzc2lvbkluZm8gPyB0aGlzLnNlc3Npb25JbmZvLnF1ZXJ5SUQgOiAnJ1xuXG4gICAgaWYgKHRoaXMud2F0Y2hTdGF0dXMgIT09IFdBVENIX1NUQVRVUy5BQ1RJVkUpIHtcbiAgICAgIHRoaXMud2F0Y2hTdGF0dXMgPSBXQVRDSF9TVEFUVVMuQ0xPU0VEXG4gICAgICB0aGlzLm9uV2F0Y2hDbG9zZSh0aGlzLCBxdWVyeUlkKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMud2F0Y2hTdGF0dXMgPSBXQVRDSF9TVEFUVVMuQ0xPU0lOR1xuXG4gICAgICBjb25zdCBjbG9zZVdhdGNoTXNnOiBJUmVxdWVzdE1lc3NhZ2VDbG9zZVdhdGNoTXNnID0ge1xuICAgICAgICB3YXRjaElkOiB0aGlzLndhdGNoSWQsXG4gICAgICAgIHJlcXVlc3RJZDogZ2VuUmVxdWVzdElkKCksXG4gICAgICAgIG1zZ1R5cGU6ICdDTE9TRV9XQVRDSCcsXG4gICAgICAgIG1zZ0RhdGE6IG51bGxcbiAgICAgIH1cblxuICAgICAgYXdhaXQgdGhpcy5zZW5kKHtcbiAgICAgICAgbXNnOiBjbG9zZVdhdGNoTXNnXG4gICAgICB9KVxuXG4gICAgICB0aGlzLnNlc3Npb25JbmZvID0gdW5kZWZpbmVkXG4gICAgICB0aGlzLndhdGNoU3RhdHVzID0gV0FUQ0hfU1RBVFVTLkNMT1NFRFxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuY2xvc2VXaXRoRXJyb3IoXG4gICAgICAgIG5ldyBDbG91ZFNES0Vycm9yKHtcbiAgICAgICAgICBlcnJDb2RlOiBFUlJfQ09ERS5TREtfREFUQUJBU0VfUkVBTFRJTUVfTElTVEVORVJfQ0xPU0VfV0FUQ0hfRkFJTCBhcyBzdHJpbmcsXG4gICAgICAgICAgZXJyTXNnOiBlXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMub25XYXRjaENsb3NlKHRoaXMsIHF1ZXJ5SWQpXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzY2hlZHVsZVNlbmRBQ0sgPSAoKSA9PiB7XG4gICAgdGhpcy5jbGVhckFDS1NjaGVkdWxlKClcblxuICAgIC8vIFRPRE86IHNob3VsZCB3ZSBjaGVjayBzdGF0dXMgYWZ0ZXIgdGltZW91dFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLl9hY2tUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl93YWl0RXhwZWN0ZWRUaW1lb3V0SWQpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZVNlbmRBQ0soKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZW5kQUNLKClcbiAgICAgIH1cbiAgICB9LCBERUZBVUxUX1NFTkRfQUNLX0RFQk9VTkNFX1RJTUVPVVQpXG4gIH1cblxuICBwcml2YXRlIGNsZWFyQUNLU2NoZWR1bGUgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuX2Fja1RpbWVvdXRJZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2Fja1RpbWVvdXRJZClcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlbmRBQ0sgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLndhdGNoU3RhdHVzICE9PSBXQVRDSF9TVEFUVVMuQUNUSVZFKSB7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVTZW5kQUNLKClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5zZXNzaW9uSW5mbykge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgJ1tyZWFsdGltZSBsaXN0ZW5lcl0gY2FuIG5vdCBzZW5kIGFjayB3aXRob3V0IGEgc3VjY2Vzc2Z1bCBpbml0V2F0Y2ggKGxhY2sgb2Ygc2Vzc2lvbkluZm8pJ1xuICAgICAgICApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBhY2tNc2c6IElSZXF1ZXN0TWVzc2FnZUNoZWNrTGFzdE1zZyA9IHtcbiAgICAgICAgd2F0Y2hJZDogdGhpcy53YXRjaElkLFxuICAgICAgICByZXF1ZXN0SWQ6IGdlblJlcXVlc3RJZCgpLFxuICAgICAgICBtc2dUeXBlOiAnQ0hFQ0tfTEFTVCcsXG4gICAgICAgIG1zZ0RhdGE6IHtcbiAgICAgICAgICBxdWVyeUlEOiB0aGlzLnNlc3Npb25JbmZvLnF1ZXJ5SUQsXG4gICAgICAgICAgZXZlbnRJRDogdGhpcy5zZXNzaW9uSW5mby5jdXJyZW50RXZlbnRJZFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHRoaXMuc2VuZCh7XG4gICAgICAgIG1zZzogYWNrTXNnXG4gICAgICB9KVxuXG4gICAgICB0aGlzLnNjaGVkdWxlU2VuZEFDSygpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gVE9ETzogcmVmYWN0b3JcbiAgICAgIGlmIChpc1JlYWx0aW1lRXJyb3JNZXNzYWdlRXJyb3IoZSkpIHtcbiAgICAgICAgY29uc3QgbXNnID0gZS5wYXlsb2FkXG4gICAgICAgIHN3aXRjaCAobXNnLm1zZ0RhdGEuY29kZSkge1xuICAgICAgICAgIC8vIHNpZ25hdHVyZSBlcnJvciAtPiByZXRyeSB3aXRoIHJlZnJlc2hlZCBzaWduYXR1cmVcbiAgICAgICAgICBjYXNlICdDSEVDS19MT0dJTl9GQUlMRUQnOlxuICAgICAgICAgIGNhc2UgJ1NJR05fRVhQSVJFRF9FUlJPUic6XG4gICAgICAgICAgY2FzZSAnU0lHTl9JTlZBTElEX0VSUk9SJzpcbiAgICAgICAgICBjYXNlICdTSUdOX1BBUkFNX0lOVkFMSUQnOiB7XG4gICAgICAgICAgICB0aGlzLnJlYnVpbGRXYXRjaCgpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gb3RoZXIgLT4gdGhyb3dcbiAgICAgICAgICBjYXNlICdRVUVSWUlEX0lOVkFMSURfRVJST1InOlxuICAgICAgICAgIGNhc2UgJ1NZU19FUlInOlxuICAgICAgICAgIGNhc2UgJ0lOVkFMSUlEX0VOVic6XG4gICAgICAgICAgY2FzZSAnQ09MTEVDVElPTl9QRVJNSVNTSU9OX0RFTklFRCc6IHtcbiAgICAgICAgICAgIC8vIG11c3QgdGhyb3dcbiAgICAgICAgICAgIHRoaXMuY2xvc2VXaXRoRXJyb3IoXG4gICAgICAgICAgICAgIG5ldyBDbG91ZFNES0Vycm9yKHtcbiAgICAgICAgICAgICAgICBlcnJDb2RlOiBFUlJfQ09ERS5TREtfREFUQUJBU0VfUkVBTFRJTUVfTElTVEVORVJfQ0hFQ0tfTEFTVF9GQUlMIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICBlcnJNc2c6IG1zZy5tc2dEYXRhLmNvZGVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBtYXliZSByZXRyeWFibGVcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5fYXZhaWxhYmxlUmV0cmllcy5DSEVDS19MQVNUICYmXG4gICAgICAgIHRoaXMuX2F2YWlsYWJsZVJldHJpZXMuQ0hFQ0tfTEFTVCA+IDBcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9hdmFpbGFibGVSZXRyaWVzLkNIRUNLX0xBU1QtLVxuICAgICAgICB0aGlzLnNjaGVkdWxlU2VuZEFDSygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNsb3NlV2l0aEVycm9yKFxuICAgICAgICAgIG5ldyBDbG91ZFNES0Vycm9yKHtcbiAgICAgICAgICAgIGVyckNvZGU6IEVSUl9DT0RFLlNES19EQVRBQkFTRV9SRUFMVElNRV9MSVNURU5FUl9DSEVDS19MQVNUX0ZBSUwgYXMgc3RyaW5nLFxuICAgICAgICAgICAgZXJyTXNnOiBlXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlQ29tbW9uRXJyb3IgPSAoXG4gICAgZTogYW55LFxuICAgIG9wdGlvbnM6IElIYW5kbGVDb21tb25FcnJvck9wdGlvbnNcbiAgKTogdm9pZCA9PiB7XG4gICAgaWYgKGlzUmVhbHRpbWVFcnJvck1lc3NhZ2VFcnJvcihlKSkge1xuICAgICAgY29uc3QgbXNnID0gZS5wYXlsb2FkXG4gICAgICBzd2l0Y2ggKG1zZy5tc2dEYXRhLmNvZGUpIHtcbiAgICAgICAgLy8gc2lnbmF0dXJlIGVycm9yIC0+IHJldHJ5IHdpdGggcmVmcmVzaGVkIHNpZ25hdHVyZVxuICAgICAgICBjYXNlICdDSEVDS19MT0dJTl9GQUlMRUQnOlxuICAgICAgICBjYXNlICdTSUdOX0VYUElSRURfRVJST1InOlxuICAgICAgICBjYXNlICdTSUdOX0lOVkFMSURfRVJST1InOlxuICAgICAgICBjYXNlICdTSUdOX1BBUkFNX0lOVkFMSUQnOiB7XG4gICAgICAgICAgb3B0aW9ucy5vblNpZ25FcnJvcihlKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIC8vIG5vdC1yZXRyeWFibGUgZXJyb3IgLT4gdGhyb3dcbiAgICAgICAgY2FzZSAnUVVFUllJRF9JTlZBTElEX0VSUk9SJzpcbiAgICAgICAgY2FzZSAnU1lTX0VSUic6XG4gICAgICAgIGNhc2UgJ0lOVkFMSUlEX0VOVic6XG4gICAgICAgIGNhc2UgJ0NPTExFQ1RJT05fUEVSTUlTU0lPTl9ERU5JRUQnOiB7XG4gICAgICAgICAgb3B0aW9ucy5vbk5vdFJldHJ5YWJsZUVycm9yKGUpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgIG9wdGlvbnMub25Ob3RSZXRyeWFibGVFcnJvcihlKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1RpbWVvdXRFcnJvcihlKSkge1xuICAgICAgLy8gdGltZW91dCBlcnJvclxuICAgICAgb3B0aW9ucy5vblRpbWVvdXRFcnJvcihlKVxuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIGlmIChpc0NhbmNlbGxlZEVycm9yKGUpKSB7XG4gICAgICAvLyBjYW5jZWxsZWQgZXJyb3JcbiAgICAgIG9wdGlvbnMub25DYW5jZWxsZWRFcnJvcihlKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gdW5rbm93biBlcnJvclxuICAgIG9wdGlvbnMub25Vbmtub3duRXJyb3IoZSlcbiAgfVxuXG4gIC8vIGNyZWRpdCBhIHJldHJ5IGNoYW5jZSBmcm9tIGF2YWlsYWJsZVJldHJpZXNcbiAgcHJpdmF0ZSB1c2VSZXRyeVRpY2tldChvcGVyYXRpb25OYW1lOiBJUmVxdWVzdE1zZ1R5cGUpOiBib29sZWFuIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLl9hdmFpbGFibGVSZXRyaWVzW29wZXJhdGlvbk5hbWVdICYmXG4gICAgICB0aGlzLl9hdmFpbGFibGVSZXRyaWVzW29wZXJhdGlvbk5hbWVdISA+IDBcbiAgICApIHtcbiAgICAgIHRoaXMuX2F2YWlsYWJsZVJldHJpZXNbb3BlcmF0aW9uTmFtZV0hLS1cblxuICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYFtyZWFsdGltZV0gJHtvcGVyYXRpb25OYW1lfSB1c2UgYSByZXRyeSB0aWNrZXQsIG5vdyBvbmx5ICR7dGhpcy5fYXZhaWxhYmxlUmV0cmllc1tvcGVyYXRpb25OYW1lXX0gcmV0cnkgbGVmdGBcbiAgICAgIClcbiAgICAgIC8vIH1cblxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZVNlcnZlckV2ZW50cyhcbiAgICBtc2c6IElSZXNwb25zZU1lc3NhZ2VJbml0RXZlbnRNc2cgfCBJUmVzcG9uc2VNZXNzYWdlTmV4dEV2ZW50TXNnXG4gICkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnNjaGVkdWxlU2VuZEFDSygpXG4gICAgICBhd2FpdCB0aGlzLl9oYW5kbGVTZXJ2ZXJFdmVudHMobXNnKVxuICAgICAgdGhpcy5fcG9zdEhhbmRsZVNlcnZlckV2ZW50c1ZhbGlkaXR5Q2hlY2sobXNnKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgLy8gVE9ETzogcmVwb3J0XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAnW3JlYWx0aW1lIGxpc3RlbmVyXSBpbnRlcm5hbCBub24tZmF0YWwgZXJyb3I6IGhhbmRsZSBzZXJ2ZXIgZXZlbnRzIGZhaWxlZCB3aXRoIGVycm9yOiAnLFxuICAgICAgICBlXG4gICAgICApXG5cbiAgICAgIC8vIHdyaXRlVG9GaWxlKFxuICAgICAgLy8gICBcIndzZXJyb3IudHh0XCIsXG4gICAgICAvLyAgIGBbcmVhbHRpbWUgbGlzdGVuZXJdIGludGVybmFsIG5vbi1mYXRhbCBlcnJvcjogaGFuZGxlIHNlcnZlciBldmVudHMgZmFpbGVkIHdpdGggZXJyb3I6ICAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24oe30sIGUsIHtcbiAgICAgIC8vICAgICAgIHJlcXVlc3RJZDogbXNnLnJlcXVlc3RJZCxcbiAgICAgIC8vICAgICAgIHdhdGNoSWQ6IG1zZy53YXRjaElkXG4gICAgICAvLyAgICAgfSlcbiAgICAgIC8vICAgKX0gXFxuYFxuICAgICAgLy8gKVxuICAgICAgLy8gfVxuXG4gICAgICB0aHJvdyBlXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfaGFuZGxlU2VydmVyRXZlbnRzKFxuICAgIG1zZzogSVJlc3BvbnNlTWVzc2FnZUluaXRFdmVudE1zZyB8IElSZXNwb25zZU1lc3NhZ2VOZXh0RXZlbnRNc2dcbiAgKSB7XG4gICAgY29uc3QgeyByZXF1ZXN0SWQgfSA9IG1zZ1xuXG4gICAgY29uc3QgeyBldmVudHMgfSA9IG1zZy5tc2dEYXRhXG4gICAgY29uc3QgeyBtc2dUeXBlIH0gPSBtc2dcblxuICAgIGlmICghZXZlbnRzLmxlbmd0aCB8fCAhdGhpcy5zZXNzaW9uSW5mbykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgc2Vzc2lvbkluZm8gPSB0aGlzLnNlc3Npb25JbmZvXG5cbiAgICBsZXQgYWxsQ2hhbmdlRXZlbnRzOiBJU2luZ2xlREJFdmVudFtdXG4gICAgdHJ5IHtcbiAgICAgIGFsbENoYW5nZUV2ZW50cyA9IGV2ZW50cy5tYXAoZ2V0UHVibGljRXZlbnQpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5jbG9zZVdpdGhFcnJvcihcbiAgICAgICAgbmV3IENsb3VkU0RLRXJyb3Ioe1xuICAgICAgICAgIGVyckNvZGU6IEVSUl9DT0RFLlNES19EQVRBQkFTRV9SRUFMVElNRV9MSVNURU5FUl9SRUNFSVZFX0lOVkFMSURfU0VSVkVSX0RBVEEgYXMgc3RyaW5nLFxuICAgICAgICAgIGVyck1zZzogZVxuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gYWdncmVnYXRlIGRvY3NcbiAgICBsZXQgZG9jcyA9IFsuLi5zZXNzaW9uSW5mby5jdXJyZW50RG9jc11cbiAgICBsZXQgaW5pdEVuY291bnRlcmVkID0gZmFsc2VcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYWxsQ2hhbmdlRXZlbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBjaGFuZ2UgPSBhbGxDaGFuZ2VFdmVudHNbaV1cblxuICAgICAgaWYgKHNlc3Npb25JbmZvLmN1cnJlbnRFdmVudElkID49IGNoYW5nZS5pZCkge1xuICAgICAgICBpZiAoIWFsbENoYW5nZUV2ZW50c1tpIC0gMV0gfHwgY2hhbmdlLmlkID4gYWxsQ2hhbmdlRXZlbnRzW2kgLSAxXS5pZCkge1xuICAgICAgICAgIC8vIGR1cGxpY2F0ZSBldmVudCwgZHJvcGFibGVcbiAgICAgICAgICAvLyBUT0RPOiByZXBvcnRcbiAgICAgICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgW3JlYWx0aW1lXSBkdXBsaWNhdGUgZXZlbnQgcmVjZWl2ZWQsIGN1ciAke3Nlc3Npb25JbmZvLmN1cnJlbnRFdmVudElkfSBidXQgZ290ICR7Y2hhbmdlLmlkfWBcbiAgICAgICAgICApXG4gICAgICAgICAgLy8gfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGFsbENoYW5nZUV2ZW50cyBzaG91bGQgYmUgaW4gYXNjZW5kaW5nIG9yZGVyIGFjY29yZGluZyB0byBldmVudElkLCB0aGlzIHNob3VsZCBuZXZlciBoYXBwZW5zLCBtdXN0IHJlcG9ydCBhIG5vbi1mYXRhbCBlcnJvclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICBgW3JlYWx0aW1lIGxpc3RlbmVyXSBzZXJ2ZXIgbm9uLWZhdGFsIGVycm9yOiBldmVudHMgb3V0IG9mIG9yZGVyICh0aGUgbGF0dGVyIGV2ZW50J3MgaWQgaXMgc21hbGxlciB0aGFuIHRoYXQgb2YgdGhlIGZvcm1lcikgKHJlcXVlc3RJZCAke3JlcXVlc3RJZH0pYFxuICAgICAgICAgIClcblxuICAgICAgICAgIC8vIHdyaXRlVG9GaWxlKFxuICAgICAgICAgIC8vICAgXCJ3c2Vycm9yLnR4dFwiLFxuICAgICAgICAgIC8vICAgYFtyZWFsdGltZSBsaXN0ZW5lcl0gc2VydmVyIG5vbi1mYXRhbCBlcnJvcjogZXZlbnRzIG91dCBvZiBvcmRlciAodGhlIGxhdHRlciBldmVudCdzIGlkIGlzIHNtYWxsZXIgdGhhbiB0aGF0IG9mIHRoZSBmb3JtZXIpICAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIC8vICAgICAgIHt9LFxuICAgICAgICAgIC8vICAgICAgIHtcbiAgICAgICAgICAvLyAgICAgICAgIHJlcXVlc3RJZDogbXNnLnJlcXVlc3RJZCxcbiAgICAgICAgICAvLyAgICAgICAgIHdhdGNoSWQ6IG1zZy53YXRjaElkXG4gICAgICAgICAgLy8gICAgICAgfVxuICAgICAgICAgIC8vICAgICApXG4gICAgICAgICAgLy8gICApfSBcXG5gXG4gICAgICAgICAgLy8gKVxuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9IGVsc2UgaWYgKHNlc3Npb25JbmZvLmN1cnJlbnRFdmVudElkID09PSBjaGFuZ2UuaWQgLSAxKSB7XG4gICAgICAgIC8vIGNvcnJlY3Qgc2VxdWVuY2VcbiAgICAgICAgLy8gZmlyc3QgaGFuZGxlIGRhdGFUeXBlIHRoZW4gcXVldWVUeXBlOlxuICAgICAgICAvLyAxLiBkYXRhVHlwZTogd2UgT05MWSBwb3B1bGF0ZSBjaGFuZ2UuZG9jIGlmIG5lY2Nlc3NhcnlcbiAgICAgICAgLy8gMi4gcXVldWVUeXBlOiB3ZSBidWlsZCB0aGUgZGF0YSBzbmFwc2hvdFxuXG4gICAgICAgIHN3aXRjaCAoY2hhbmdlLmRhdGFUeXBlKSB7XG4gICAgICAgICAgY2FzZSAndXBkYXRlJzoge1xuICAgICAgICAgICAgLy8gb25seSBuZWVkIHRvIHBvcHVsYXRlIGNoYW5nZS5kb2Mgd2hlbiBpdCBpcyBub3QgcHJvdmlkZWRcbiAgICAgICAgICAgIGlmICghY2hhbmdlLmRvYykge1xuICAgICAgICAgICAgICBzd2l0Y2ggKGNoYW5nZS5xdWV1ZVR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICd1cGRhdGUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2RlcXVldWUnOiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBsb2NhbERvYyA9IGRvY3MuZmluZChkb2MgPT4gZG9jLl9pZCA9PT0gY2hhbmdlLmRvY0lkKVxuICAgICAgICAgICAgICAgICAgaWYgKGxvY2FsRG9jKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGEgcGFydGlhbCB1cGRhdGVcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZG9jID0gY2xvbmVEZWVwKGxvY2FsRG9jKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UudXBkYXRlZEZpZWxkcykge1xuICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZmllbGRQYXRoIGluIGNoYW5nZS51cGRhdGVkRmllbGRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoZG9jLCBmaWVsZFBhdGgsIGNoYW5nZS51cGRhdGVkRmllbGRzW2ZpZWxkUGF0aF0pXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZS5yZW1vdmVkRmllbGRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBmaWVsZFBhdGggb2YgY2hhbmdlLnJlbW92ZWRGaWVsZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuc2V0KGRvYywgZmllbGRQYXRoKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZS5kb2MgPSBkb2NcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gcmVwb3J0XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgJ1tyZWFsdGltZSBsaXN0ZW5lcl0gaW50ZXJuYWwgbm9uLWZhdGFsIHNlcnZlciBlcnJvcjogdW5leHBlY3RlZCB1cGRhdGUgZGF0YVR5cGUgZXZlbnQgd2hlcmUgbm8gZG9jIGlzIGFzc29jaWF0ZWQuJ1xuICAgICAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gd3JpdGVUb0ZpbGUoXG4gICAgICAgICAgICAgICAgICAgIC8vICAgXCJ3c2Vycm9yLnR4dFwiLFxuICAgICAgICAgICAgICAgICAgICAvLyAgIGBbcmVhbHRpbWUgbGlzdGVuZXJdIGludGVybmFsIG5vbi1mYXRhbCBzZXJ2ZXIgZXJyb3I6IHVuZXhwZWN0ZWQgdXBkYXRlIGRhdGFUeXBlIGV2ZW50IHdoZXJlIG5vIGRvYyBpcyBhc3NvY2lhdGVkLiAgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHt9LFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgcmVxdWVzdElkOiBtc2cucmVxdWVzdElkLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHdhdGNoSWQ6IG1zZy53YXRjaElkXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIClcbiAgICAgICAgICAgICAgICAgICAgLy8gICApfSBcXG5gXG4gICAgICAgICAgICAgICAgICAgIC8vIClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgJ2VucXVldWUnOiB7XG4gICAgICAgICAgICAgICAgICAvLyBkb2MgaXMgcHJvdmlkZWQgYnkgc2VydmVyLCB0aGlzIHNob3VsZCBuZXZlciBvY2N1clxuICAgICAgICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IENsb3VkU0RLRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICBlcnJDb2RlOiBFUlJfQ09ERS5TREtfREFUQUJBU0VfUkVBTFRJTUVfTElTVEVORVJfVU5FWFBFQ1RFRF9GQVRBTF9FUlJPUiBhcyBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIGVyck1zZzogYEhhbmRsZVNlcnZlckV2ZW50czogZnVsbCBkb2MgaXMgbm90IHByb3ZpZGVkIHdpdGggZGF0YVR5cGU9XCJ1cGRhdGVcIiBhbmQgcXVldWVUeXBlPVwiZW5xdWV1ZVwiIChyZXF1ZXN0SWQgJHttc2cucmVxdWVzdElkfSlgXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVdpdGhFcnJvcihlcnIpXG4gICAgICAgICAgICAgICAgICB0aHJvdyBlcnJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOiB7XG4gICAgICAgICAgICAvLyB2YWxpZGF0aW9uXG4gICAgICAgICAgICBpZiAoIWNoYW5nZS5kb2MpIHtcbiAgICAgICAgICAgICAgLy8gZG9jIGlzIHByb3ZpZGVkIGJ5IHNlcnZlciwgdGhpcyBzaG91bGQgbmV2ZXIgb2NjdXJcbiAgICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IENsb3VkU0RLRXJyb3Ioe1xuICAgICAgICAgICAgICAgIGVyckNvZGU6IEVSUl9DT0RFLlNES19EQVRBQkFTRV9SRUFMVElNRV9MSVNURU5FUl9VTkVYUEVDVEVEX0ZBVEFMX0VSUk9SIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICBlcnJNc2c6IGBIYW5kbGVTZXJ2ZXJFdmVudHM6IGZ1bGwgZG9jIGlzIG5vdCBwcm92aWRlZCB3aXRoIGRhdGFUeXBlPVwicmVwbGFjZVwiIChyZXF1ZXN0SWQgJHttc2cucmVxdWVzdElkfSlgXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIHRoaXMuY2xvc2VXaXRoRXJyb3IoZXJyKVxuICAgICAgICAgICAgICB0aHJvdyBlcnJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6IHtcbiAgICAgICAgICAgIGNvbnN0IGRvYyA9IGRvY3MuZmluZChkb2MgPT4gZG9jLl9pZCA9PT0gY2hhbmdlLmRvY0lkKVxuICAgICAgICAgICAgaWYgKGRvYykge1xuICAgICAgICAgICAgICBjaGFuZ2UuZG9jID0gZG9jXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBUT0RPIHJlcG9ydFxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgICdbcmVhbHRpbWUgbGlzdGVuZXJdIGludGVybmFsIG5vbi1mYXRhbCBzZXJ2ZXIgZXJyb3I6IHVuZXhwZWN0ZWQgcmVtb3ZlIGV2ZW50IHdoZXJlIG5vIGRvYyBpcyBhc3NvY2lhdGVkLidcbiAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgIC8vIHdyaXRlVG9GaWxlKFxuICAgICAgICAgICAgICAvLyAgIFwid3NlcnJvci50eHRcIixcbiAgICAgICAgICAgICAgLy8gICBgW3JlYWx0aW1lIGxpc3RlbmVyXSBpbnRlcm5hbCBub24tZmF0YWwgc2VydmVyIGVycm9yOiB1bmV4cGVjdGVkIHJlbW92ZSBldmVudCB3aGVyZSBubyBkb2MgaXMgYXNzb2NpYXRlZC4gJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICAgIC8vICAgICAgIHt9LFxuICAgICAgICAgICAgICAvLyAgICAgICB7XG4gICAgICAgICAgICAgIC8vICAgICAgICAgcmVxdWVzdElkOiBtc2cucmVxdWVzdElkLFxuICAgICAgICAgICAgICAvLyAgICAgICAgIHdhdGNoSWQ6IG1zZy53YXRjaElkXG4gICAgICAgICAgICAgIC8vICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gICAgIClcbiAgICAgICAgICAgICAgLy8gICApfSBcXG5gXG4gICAgICAgICAgICAgIC8vIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ2xpbWl0Jzoge1xuICAgICAgICAgICAgaWYgKCFjaGFuZ2UuZG9jKSB7XG4gICAgICAgICAgICAgIHN3aXRjaChjaGFuZ2UucXVldWVUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGVxdWV1ZSc6IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGRvYyA9IGRvY3MuZmluZChkb2MgPT4gZG9jLl9pZCA9PT0gY2hhbmdlLmRvY0lkKVxuICAgICAgICAgICAgICAgICAgaWYgKGRvYykge1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2UuZG9jID0gZG9jXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgICAgICAgICdbcmVhbHRpbWUgbGlzdGVuZXJdIGludGVybmFsIG5vbi1mYXRhbCBzZXJ2ZXIgZXJyb3I6IHVuZXhwZWN0ZWQgbGltaXQgZGF0YVR5cGUgZXZlbnQgd2hlcmUgbm8gZG9jIGlzIGFzc29jaWF0ZWQuJ1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlICdlbnF1ZXVlJzoge1xuICAgICAgICAgICAgICAgICAgLy8gZG9jIGlzIHByb3ZpZGVkIGJ5IHNlcnZlciwgdGhpcyBzaG91bGQgbmV2ZXIgb2NjdXJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBDbG91ZFNES0Vycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyQ29kZTogRVJSX0NPREUuU0RLX0RBVEFCQVNFX1JFQUxUSU1FX0xJU1RFTkVSX1VORVhQRUNURURfRkFUQUxfRVJST1IgYXMgc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBlcnJNc2c6IGBIYW5kbGVTZXJ2ZXJFdmVudHM6IGZ1bGwgZG9jIGlzIG5vdCBwcm92aWRlZCB3aXRoIGRhdGFUeXBlPVwibGltaXRcIiBhbmQgcXVldWVUeXBlPVwiZW5xdWV1ZVwiIChyZXF1ZXN0SWQgJHttc2cucmVxdWVzdElkfSlgXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVdpdGhFcnJvcihlcnIpXG4gICAgICAgICAgICAgICAgICB0aHJvdyBlcnJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChjaGFuZ2UucXVldWVUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnaW5pdCc6IHtcbiAgICAgICAgICAgIGlmICghaW5pdEVuY291bnRlcmVkKSB7XG4gICAgICAgICAgICAgIGluaXRFbmNvdW50ZXJlZCA9IHRydWVcbiAgICAgICAgICAgICAgZG9jcyA9IFtjaGFuZ2UuZG9jXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZG9jcy5wdXNoKGNoYW5nZS5kb2MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdlbnF1ZXVlJzoge1xuICAgICAgICAgICAgZG9jcy5wdXNoKGNoYW5nZS5kb2MpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdkZXF1ZXVlJzoge1xuICAgICAgICAgICAgY29uc3QgaW5kID0gZG9jcy5maW5kSW5kZXgoZG9jID0+IGRvYy5faWQgPT09IGNoYW5nZS5kb2NJZClcbiAgICAgICAgICAgIGlmIChpbmQgPiAtMSkge1xuICAgICAgICAgICAgICBkb2NzLnNwbGljZShpbmQsIDEpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBUT0RPIHJlcG9ydFxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgICdbcmVhbHRpbWUgbGlzdGVuZXJdIGludGVybmFsIG5vbi1mYXRhbCBzZXJ2ZXIgZXJyb3I6IHVuZXhwZWN0ZWQgZGVxdWV1ZSBldmVudCB3aGVyZSBubyBkb2MgaXMgYXNzb2NpYXRlZC4nXG4gICAgICAgICAgICAgIClcblxuICAgICAgICAgICAgICAvLyB3cml0ZVRvRmlsZShcbiAgICAgICAgICAgICAgLy8gICBcIndzZXJyb3IudHh0XCIsXG4gICAgICAgICAgICAgIC8vICAgYFtyZWFsdGltZSBsaXN0ZW5lcl0gaW50ZXJuYWwgbm9uLWZhdGFsIHNlcnZlciBlcnJvcjogdW5leHBlY3RlZCBkZXF1ZXVlIGV2ZW50IHdoZXJlIG5vIGRvYyBpcyBhc3NvY2lhdGVkLiAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgICAgLy8gICAgICAge30sXG4gICAgICAgICAgICAgIC8vICAgICAgIHtcbiAgICAgICAgICAgICAgLy8gICAgICAgICByZXF1ZXN0SWQ6IG1zZy5yZXF1ZXN0SWQsXG4gICAgICAgICAgICAgIC8vICAgICAgICAgd2F0Y2hJZDogbXNnLndhdGNoSWRcbiAgICAgICAgICAgICAgLy8gICAgICAgfVxuICAgICAgICAgICAgICAvLyAgICAgKVxuICAgICAgICAgICAgICAvLyAgICl9IFxcbmBcbiAgICAgICAgICAgICAgLy8gKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSAndXBkYXRlJzoge1xuICAgICAgICAgICAgLy8gd3JpdGVUb0ZpbGUoXG4gICAgICAgICAgICAvLyAgIFwid3NlcnJvci50eHRcIixcbiAgICAgICAgICAgIC8vICAgYFtyZWFsdGltZSBsaXN0ZW5lcl0gZG9jcyAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgLy8gICAgIGRvY3NcbiAgICAgICAgICAgIC8vICAgKX0gY2hhbmdlIGRvYyAke0pTT04uc3RyaW5naWZ5KGNoYW5nZSl9IFxcbmBcbiAgICAgICAgICAgIC8vIClcbiAgICAgICAgICAgIGNvbnN0IGluZCA9IGRvY3MuZmluZEluZGV4KGRvYyA9PiBkb2MuX2lkID09PSBjaGFuZ2UuZG9jSWQpXG4gICAgICAgICAgICBpZiAoaW5kID4gLTEpIHtcbiAgICAgICAgICAgICAgZG9jc1tpbmRdID0gY2hhbmdlLmRvY1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gVE9ETyByZXBvcnRcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICAnW3JlYWx0aW1lIGxpc3RlbmVyXSBpbnRlcm5hbCBub24tZmF0YWwgc2VydmVyIGVycm9yOiB1bmV4cGVjdGVkIHF1ZXVlVHlwZSB1cGRhdGUgZXZlbnQgd2hlcmUgbm8gZG9jIGlzIGFzc29jaWF0ZWQuJ1xuICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgLy8gd3JpdGVUb0ZpbGUoXG4gICAgICAgICAgICAgIC8vICAgXCJ3c2Vycm9yLnR4dFwiLFxuICAgICAgICAgICAgICAvLyAgIGBbcmVhbHRpbWUgbGlzdGVuZXJdIGludGVybmFsIG5vbi1mYXRhbCBzZXJ2ZXIgZXJyb3I6IHVuZXhwZWN0ZWQgcXVldWVUeXBlIHVwZGF0ZSBldmVudCB3aGVyZSBubyBkb2MgaXMgYXNzb2NpYXRlZC4gJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICAgIC8vICAgICAgIHt9LFxuICAgICAgICAgICAgICAvLyAgICAgICB7XG4gICAgICAgICAgICAgIC8vICAgICAgICAgcmVxdWVzdElkOiBtc2cucmVxdWVzdElkLFxuICAgICAgICAgICAgICAvLyAgICAgICAgIHdhdGNoSWQ6IG1zZy53YXRjaElkXG4gICAgICAgICAgICAgIC8vICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gICAgIClcbiAgICAgICAgICAgICAgLy8gICApfSBcXG5gXG4gICAgICAgICAgICAgIC8vIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGkgPT09IGxlbiAtIDEgfHxcbiAgICAgICAgICAoYWxsQ2hhbmdlRXZlbnRzW2kgKyAxXSAmJiBhbGxDaGFuZ2VFdmVudHNbaSArIDFdLmlkICE9PSBjaGFuZ2UuaWQpXG4gICAgICAgICkge1xuICAgICAgICAgIC8vIGEgc2hhbGxvdyBzbGljZSBjcmVhdGVzIGEgc2hhbGxvdyBzbmFwc2hvdFxuICAgICAgICAgIGNvbnN0IGRvY3NTbmFwc2hvdCA9IFsuLi5kb2NzXVxuXG4gICAgICAgICAgLy8gd2Ugc2xpY2UgZmlyc3QgY2F1c2UnIGlmIHRoZXJlJ3JlIGFsbENoYW5nZUV2ZW50cyB0aGF0IGFyZSBvZiB0aGUgc2FtZSBpZCBhZnRlciB0aGlzIGNoYW5nZSwgd2UgZG9uJ3Qgd2FudCB0byBpbnZvbHZlIGl0IGZvciBpdCBpcyB1bmV4cGVjdGVkIGludmFsaWQgb3JkZXJcbiAgICAgICAgICBjb25zdCBkb2NDaGFuZ2VzID0gYWxsQ2hhbmdlRXZlbnRzXG4gICAgICAgICAgICAuc2xpY2UoMCwgaSArIDEpXG4gICAgICAgICAgICAuZmlsdGVyKGMgPT4gYy5pZCA9PT0gY2hhbmdlLmlkKVxuXG4gICAgICAgICAgLy8gYWxsIGNoYW5nZXMgb2YgdGhpcyBldmVudCBoYXMgYmVlbiBoYW5kbGUsIHdlIGNvdWxkIGRpc3BhdGNoIHRoZSBldmVudCBub3dcbiAgICAgICAgICB0aGlzLnNlc3Npb25JbmZvLmN1cnJlbnRFdmVudElkID0gY2hhbmdlLmlkXG4gICAgICAgICAgdGhpcy5zZXNzaW9uSW5mby5jdXJyZW50RG9jcyA9IGRvY3NcblxuICAgICAgICAgIGNvbnN0IHNuYXBzaG90ID0gbmV3IFNuYXBzaG90KHtcbiAgICAgICAgICAgIGlkOiBjaGFuZ2UuaWQsXG4gICAgICAgICAgICBkb2NDaGFuZ2VzLFxuICAgICAgICAgICAgZG9jczogZG9jc1NuYXBzaG90LFxuICAgICAgICAgICAgbXNnVHlwZVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICAvLyBSZXBvcnRlci5zdXJyb3VuZFRoaXJkQnlUcnlDYXRjaCgoKSA9PlxuICAgICAgICAgIHRoaXMubGlzdGVuZXIub25DaGFuZ2Uoc25hcHNob3QpXG4gICAgICAgICAgLy8gKSgpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG91dC1vZi1vcmRlciBldmVudFxuICAgICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgLy8gVE9ETzogcmVwb3J0XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgW3JlYWx0aW1lIGxpc3RlbmVyXSBldmVudCByZWNlaXZlZCBpcyBvdXQgb2Ygb3JkZXIsIGN1ciAke3RoaXMuc2Vzc2lvbkluZm8uY3VycmVudEV2ZW50SWR9IGJ1dCBnb3QgJHtjaGFuZ2UuaWR9YFxuICAgICAgICApXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gcmVidWlsZCB3YXRjaFxuICAgICAgICBhd2FpdCB0aGlzLnJlYnVpbGRXYXRjaCgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3Bvc3RIYW5kbGVTZXJ2ZXJFdmVudHNWYWxpZGl0eUNoZWNrKFxuICAgIG1zZzogSVJlc3BvbnNlTWVzc2FnZUluaXRFdmVudE1zZyB8IElSZXNwb25zZU1lc3NhZ2VOZXh0RXZlbnRNc2dcbiAgKSB7XG4gICAgaWYgKCF0aGlzLnNlc3Npb25JbmZvKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAnW3JlYWx0aW1lIGxpc3RlbmVyXSBpbnRlcm5hbCBub24tZmF0YWwgZXJyb3I6IHNlc3Npb25JbmZvIGxvc3QgYWZ0ZXIgc2VydmVyIGV2ZW50IGhhbmRsaW5nLCB0aGlzIHNob3VsZCBuZXZlciBvY2N1cidcbiAgICAgIClcblxuICAgICAgLy8gd3JpdGVUb0ZpbGUoXG4gICAgICAvLyAgIFwid3NlcnJvci50eHRcIixcbiAgICAgIC8vICAgYFtyZWFsdGltZSBsaXN0ZW5lcl0gaW50ZXJuYWwgbm9uLWZhdGFsIGVycm9yOiBzZXNzaW9uSW5mbyBsb3N0IGFmdGVyIHNlcnZlciBldmVudCBoYW5kbGluZywgdGhpcyBzaG91bGQgbmV2ZXIgb2NjdXIgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgLy8gICAgICAge30sXG4gICAgICAvLyAgICAgICB7XG4gICAgICAvLyAgICAgICAgIHJlcXVlc3RJZDogbXNnLnJlcXVlc3RJZCxcbiAgICAgIC8vICAgICAgICAgd2F0Y2hJZDogbXNnLndhdGNoSWRcbiAgICAgIC8vICAgICAgIH1cbiAgICAgIC8vICAgICApXG4gICAgICAvLyAgICl9IFxcbmBcbiAgICAgIC8vIClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHRoaXMuc2Vzc2lvbkluZm8uZXhwZWN0RXZlbnRJZCAmJlxuICAgICAgdGhpcy5zZXNzaW9uSW5mby5jdXJyZW50RXZlbnRJZCA+PSB0aGlzLnNlc3Npb25JbmZvLmV4cGVjdEV2ZW50SWRcbiAgICApIHtcbiAgICAgIHRoaXMuY2xlYXJXYWl0RXhwZWN0ZWRFdmVudCgpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2Vzc2lvbkluZm8uY3VycmVudEV2ZW50SWQgPCBtc2cubXNnRGF0YS5jdXJyRXZlbnQpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1tyZWFsdGltZSBsaXN0ZW5lcl0gaW50ZXJuYWwgbm9uLWZhdGFsIGVycm9yOiBjbGllbnQgZXZlbnRJZCBkb2VzIG5vdCBtYXRjaCB3aXRoIHNlcnZlciBldmVudCBpZCBhZnRlciBzZXJ2ZXIgZXZlbnQgaGFuZGxpbmcnXG4gICAgICApXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFyV2FpdEV4cGVjdGVkRXZlbnQoKSB7XG4gICAgaWYgKHRoaXMuX3dhaXRFeHBlY3RlZFRpbWVvdXRJZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3dhaXRFeHBlY3RlZFRpbWVvdXRJZClcbiAgICAgIHRoaXMuX3dhaXRFeHBlY3RlZFRpbWVvdXRJZCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRQdWJsaWNFdmVudChldmVudDogSURCRXZlbnQpOiBJU2luZ2xlREJFdmVudCB7XG4gIGNvbnN0IGU6IElTaW5nbGVEQkV2ZW50ID0ge1xuICAgIGlkOiBldmVudC5JRCxcbiAgICBkYXRhVHlwZTogZXZlbnQuRGF0YVR5cGUsXG4gICAgcXVldWVUeXBlOiBldmVudC5RdWV1ZVR5cGUsXG4gICAgZG9jSWQ6IGV2ZW50LkRvY0lELFxuICAgIGRvYzogZXZlbnQuRG9jICYmIGV2ZW50LkRvYyAhPT0gJ3t9JyA/IEpTT04ucGFyc2UoZXZlbnQuRG9jKSA6IHVuZGVmaW5lZFxuICB9XG5cbiAgaWYgKGV2ZW50LkRhdGFUeXBlID09PSAndXBkYXRlJykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAoZXZlbnQuVXBkYXRlZEZpZWxkcykge1xuICAgICAgZS51cGRhdGVkRmllbGRzID0gSlNPTi5wYXJzZShldmVudC5VcGRhdGVkRmllbGRzKVxuICAgIH1cbiAgICAvLyBUT0RPOiB3YWl0IGZvciB0Y2IgdG8gY2hhbmdlIHJlbW92ZWRGaWVsZHMgdG8gUmVtb3ZlZEZpZWxkc1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAoZXZlbnQucmVtb3ZlZEZpZWxkcyB8fCBldmVudC5SZW1vdmVkRmllbGRzKSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAvLyBlLnJlbW92ZWRGaWVsZHMgPSBldmVudC5yZW1vdmVkRmllbGRzXG4gICAgICAvLyAgID8gSlNPTi5wYXJzZShldmVudC5yZW1vdmVkRmllbGRzKVxuICAgICAgLy8gICA6IEpTT04ucGFyc2UoZXZlbnQuUmVtb3ZlZEZpZWxkcylcbiAgICAgIGUucmVtb3ZlZEZpZWxkcyA9IEpTT04ucGFyc2UoZXZlbnQucmVtb3ZlZEZpZWxkcylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZVxufVxuIl19