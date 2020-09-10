"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualWebSocketClient = void 0;
var lodash_set_1 = __importDefault(require("lodash.set"));
var lodash_unset_1 = __importDefault(require("lodash.unset"));
var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
var message_1 = require("./message");
var utilities_1 = require("@cloudbase/utilities");
var listener_1 = require("./listener");
var snapshot_1 = require("./snapshot");
var error_1 = require("./error");
var sleep = utilities_1.utils.sleep;
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
                                            requestId: message_1.genRequestId(),
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
                                            snapshot = new snapshot_1.Snapshot({
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
                                            requestId: message_1.genRequestId(),
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
                    _this.closeWithError(new error_1.CloudSDKError({
                        errCode: isInitWatch
                            ? error_1.ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_INIT_WATCH_FAIL
                            : error_1.ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_REBUILD_WATCH_FAIL,
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
                                    options.reject(new error_1.CancelledError(options.operationName + " cancelled due to pause after unknownError"));
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
                            requestId: message_1.genRequestId(),
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
                        this.closeWithError(new error_1.CloudSDKError({
                            errCode: error_1.ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_CLOSE_WATCH_FAIL,
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
                            requestId: message_1.genRequestId(),
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
                        if (error_1.isRealtimeErrorMessageError(e_5)) {
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
                                    this.closeWithError(new error_1.CloudSDKError({
                                        errCode: error_1.ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_CHECK_LAST_FAIL,
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
                            this.closeWithError(new error_1.CloudSDKError({
                                errCode: error_1.ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_CHECK_LAST_FAIL,
                                errMsg: e_5
                            }));
                        }
                        return [3, 3];
                    case 3: return [2];
                }
            });
        }); };
        this.handleCommonError = function (e, options) {
            if (error_1.isRealtimeErrorMessageError(e)) {
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
            else if (error_1.isTimeoutError(e)) {
                options.onTimeoutError(e);
                return;
            }
            else if (error_1.isCancelledError(e)) {
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
        this.listener = new listener_1.RealtimeListener({
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
                this.closeWithError(new error_1.CloudSDKError({
                    errCode: error_1.ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_SERVER_ERROR_MSG,
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
                            this.closeWithError(new error_1.CloudSDKError({
                                errCode: error_1.ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_RECEIVE_INVALID_SERVER_DATA,
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
                                                                doc = lodash_clonedeep_1.default(localDoc);
                                                                if (change.updatedFields) {
                                                                    for (fieldPath in change.updatedFields) {
                                                                        lodash_set_1.default(doc, fieldPath, change.updatedFields[fieldPath]);
                                                                    }
                                                                }
                                                                if (change.removedFields) {
                                                                    for (_i = 0, _a = change.removedFields; _i < _a.length; _i++) {
                                                                        fieldPath = _a[_i];
                                                                        lodash_unset_1.default(doc, fieldPath);
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
                                                            err = new error_1.CloudSDKError({
                                                                errCode: error_1.ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_UNEXPECTED_FATAL_ERROR,
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
                                                    err = new error_1.CloudSDKError({
                                                        errCode: error_1.ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_UNEXPECTED_FATAL_ERROR,
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
                                                            err = new error_1.CloudSDKError({
                                                                errCode: error_1.ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_UNEXPECTED_FATAL_ERROR,
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
                                            snapshot = new snapshot_1.Snapshot({
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
exports.VirtualWebSocketClient = VirtualWebSocketClient;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC13ZWJzb2NrZXQtY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZpcnR1YWwtd2Vic29ja2V0LWNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQTRCO0FBQzVCLDhEQUFnQztBQUNoQyxzRUFBd0M7QUFDeEMscUNBQXdDO0FBZ0J4QyxrREFBNEM7QUFFNUMsdUNBQTZDO0FBQzdDLHVDQUFxQztBQUVyQyxpQ0FTZ0I7QUFFUixJQUFBLEtBQUssR0FBSyxpQkFBSyxNQUFWLENBQVc7QUE0Q3hCLElBQUssWUFVSjtBQVZELFdBQUssWUFBWTtJQUNmLHVDQUF1QixDQUFBO0lBQ3ZCLG1DQUFtQixDQUFBO0lBQ25CLHlDQUF5QixDQUFBO0lBQ3pCLGlDQUFpQixDQUFBO0lBQ2pCLG1DQUFtQixDQUFBO0lBQ25CLG1DQUFtQixDQUFBO0lBQ25CLGlDQUFpQixDQUFBO0lBQ2pCLGlDQUFpQixDQUFBO0lBQ2pCLHFDQUFxQixDQUFBO0FBQ3ZCLENBQUMsRUFWSSxZQUFZLEtBQVosWUFBWSxRQVVoQjtBQUVELElBQU0sa0NBQWtDLEdBQUcsR0FBRyxDQUFBO0FBQzlDLElBQU0sK0JBQStCLEdBQUcsQ0FBQyxDQUFBO0FBQ3pDLElBQU0sd0NBQXdDLEdBQUcsQ0FBQyxDQUFBO0FBQ2xELElBQU0saUNBQWlDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQTtBQUNuRCxJQUFNLDBCQUEwQixHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUE7QUFDNUMsSUFBTSw2QkFBNkIsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFBO0FBRS9DO0lBcUNFLGdDQUFZLE9BQWtEO1FBQTlELGlCQStCQztRQTNDTyxnQkFBVyxHQUFpQixZQUFZLENBQUMsT0FBTyxDQUFBO1FBME1oRCxXQUFNLEdBQUcsVUFDZixLQUFjLEVBQ2QsT0FBaUI7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QUFBO0lBRUQsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUUvQixJQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUU7WUFDdkIsQ0FBQyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQTtTQUNsRDtRQUdELElBQUksS0FBSyxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUMsYUFBYSxFQUFFO1lBSzlDLENBQUMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7U0FDbEQ7S0FDRjtJQUVELE9BQU8sQ0FBQyxDQUFBO0FBQ1YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzZXQgZnJvbSAnbG9kYXNoLnNldCdcbmltcG9ydCB1bnNldCBmcm9tICdsb2Rhc2gudW5zZXQnXG5pbXBvcnQgY2xvbmVEZWVwIGZyb20gJ2xvZGFzaC5jbG9uZWRlZXAnXG5pbXBvcnQgeyBnZW5SZXF1ZXN0SWQgfSBmcm9tICcuL21lc3NhZ2UnXG5pbXBvcnQge1xuICBJUmVzcG9uc2VNZXNzYWdlLFxuICBJUmVxdWVzdE1lc3NhZ2VJbml0V2F0Y2hNc2csXG4gIElSZXNwb25zZU1lc3NhZ2VJbml0RXZlbnRNc2csXG4gIElEQkV2ZW50LFxuICBJUmVxdWVzdE1lc3NhZ2VSZWJ1aWxkV2F0Y2hNc2csXG4gIElSZXF1ZXN0TWVzc2FnZUNsb3NlV2F0Y2hNc2csXG4gIElSZXF1ZXN0TXNnVHlwZSxcbiAgSVJlc3BvbnNlTWVzc2FnZU5leHRFdmVudE1zZyxcbiAgSVJlcXVlc3RNZXNzYWdlQ2hlY2tMYXN0TXNnLFxuICBJV2F0Y2hPcHRpb25zXG59IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVhbHRpbWUnXG5pbXBvcnQgeyBcbiAgSVNpbmdsZURCRXZlbnRcbn0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9kYXRhYmFzZSdcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnXG4vLyBpbXBvcnQgUmVwb3J0ZXIgZnJvbSBcIi4vZXh0ZXJuYWxzL3B1YmxpYy1saWIvcmVwb3J0ZXJcIlxuaW1wb3J0IHsgUmVhbHRpbWVMaXN0ZW5lciB9IGZyb20gJy4vbGlzdGVuZXInXG5pbXBvcnQgeyBTbmFwc2hvdCB9IGZyb20gJy4vc25hcHNob3QnXG5pbXBvcnQgeyBJV1NTZW5kT3B0aW9ucywgSUxvZ2luUmVzdWx0IH0gZnJvbSAnLi93ZWJzb2NrZXQtY2xpZW50J1xuaW1wb3J0IHsgXG4gIEVSUl9DT0RFLFxuICBDbG91ZFNES0Vycm9yLFxuICBpc1RpbWVvdXRFcnJvcixcbiAgQ2FuY2VsbGVkRXJyb3IsXG4gIGlzQ2FuY2VsbGVkRXJyb3IsXG4gIGlzUmVhbHRpbWVFcnJvck1lc3NhZ2VFcnJvciwgXG4gIFJlYWx0aW1lRXJyb3JNZXNzYWdlRXJyb3IsIFxuICBUaW1lb3V0RXJyb3IgXG59IGZyb20gJy4vZXJyb3InXG5cbmNvbnN0IHsgc2xlZXAgfSA9IHV0aWxzO1xuXG4vLyA9PT09PT09PT09PT09PT0gUmVhbHRpbWUgVmlydHVhbCBXZWJTb2NrZXQgQ2xpZW50IChJbnRlcm5hbCkgPT09PT09PT09PT09PT09PT09PT1cblxuaW50ZXJmYWNlIElWaXJ0dWFsV2ViU29ja2V0Q2xpZW50Q29uc3RydWN0b3JPcHRpb25zIGV4dGVuZHMgSVdhdGNoT3B0aW9ucyB7XG4gIC8vIHdzOiBSZWFsdGltZVdlYlNvY2tldENsaWVudFxuICBlbnZJZD86IHN0cmluZ1xuICBjb2xsZWN0aW9uTmFtZTogc3RyaW5nXG4gIHF1ZXJ5OiBzdHJpbmdcbiAgbGltaXQ/OiBudW1iZXJcbiAgb3JkZXJCeT86IFJlY29yZDxzdHJpbmcsIHN0cmluZz5cbiAgc2VuZDogPFQgPSBhbnk+KG9wdHM6IElXU1NlbmRPcHRpb25zKSA9PiBQcm9taXNlPFQ+XG4gIGxvZ2luOiAoZW52SWQ/OiBzdHJpbmcsIHJlZnJlc2g/OiBib29sZWFuKSA9PiBQcm9taXNlPGFueT5cbiAgaXNXU0Nvbm5lY3RlZDogKCkgPT4gYm9vbGVhblxuICBvbmNlV1NDb25uZWN0ZWQ6ICgpID0+IFByb21pc2U8dm9pZD5cbiAgZ2V0V2FpdEV4cGVjdGVkVGltZW91dExlbmd0aDogKCkgPT4gbnVtYmVyXG4gIG9uV2F0Y2hTdGFydDogKGNsaWVudDogVmlydHVhbFdlYlNvY2tldENsaWVudCwgcXVlcnlJRDogc3RyaW5nKSA9PiB2b2lkXG4gIG9uV2F0Y2hDbG9zZTogKGNsaWVudDogVmlydHVhbFdlYlNvY2tldENsaWVudCwgcXVlcnlJRDogc3RyaW5nKSA9PiB2b2lkXG4gIGRlYnVnPzogYm9vbGVhblxufVxuXG5pbnRlcmZhY2UgSVdhdGNoU2Vzc2lvbkluZm8ge1xuICBxdWVyeUlEOiBzdHJpbmdcbiAgY3VycmVudEV2ZW50SWQ6IG51bWJlclxuICBjdXJyZW50RG9jczogUmVjb3JkPHN0cmluZywgYW55PltdXG4gIGV4cGVjdEV2ZW50SWQ/OiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIElIYW5kbGVDb21tb25FcnJvck9wdGlvbnMge1xuICBvblNpZ25FcnJvcjogKGU6IFJlYWx0aW1lRXJyb3JNZXNzYWdlRXJyb3IpID0+IHZvaWRcbiAgb25UaW1lb3V0RXJyb3I6IChlOiBUaW1lb3V0RXJyb3IpID0+IHZvaWRcbiAgb25DYW5jZWxsZWRFcnJvcjogKGU6IENhbmNlbGxlZEVycm9yKSA9PiB2b2lkXG4gIG9uTm90UmV0cnlhYmxlRXJyb3I6IChlOiBSZWFsdGltZUVycm9yTWVzc2FnZUVycm9yKSA9PiB2b2lkXG4gIG9uVW5rbm93bkVycm9yOiAoZTogYW55KSA9PiB2b2lkXG59XG5cbmludGVyZmFjZSBJSGFuZGxlV2F0Y2hFc3RhYmxpc2htZW50RXJyb3JPcHRpb25zIHtcbiAgb3BlcmF0aW9uTmFtZTogJ0lOSVRfV0FUQ0gnIHwgJ1JFQlVJTERfV0FUQ0gnXG4gIHJlc29sdmU6ICh2YWx1ZT86IFByb21pc2VMaWtlPHZvaWQ+IHwgdW5kZWZpbmVkKSA9PiB2b2lkXG4gIHJlamVjdDogKGU6IGFueSkgPT4gdm9pZFxuICAvLyByZXRyeTogKHJlZnJlc2hMb2dpbj86IGJvb2xlYW4pID0+IHZvaWRcbiAgLy8gYWJvcnRXYXRjaDogKGU6IGFueSkgPT4gdm9pZFxufVxuXG5lbnVtIFdBVENIX1NUQVRVUyB7XG4gIExPR0dJTkdJTiA9ICdMT0dHSU5HSU4nLFxuICBJTklUSU5HID0gJ0lOSVRJTkcnLFxuICBSRUJVSUxESU5HID0gJ1JFQlVJTERJTkcnLFxuICBBQ1RJVkUgPSAnQUNUSVZFJyxcbiAgRVJST1JFRCA9ICdFUlJPUkVEJyxcbiAgQ0xPU0lORyA9ICdDTE9TSU5HJyxcbiAgQ0xPU0VEID0gJ0NMT1NFRCcsXG4gIFBBVVNFRCA9ICdQQVVTRUQnLFxuICBSRVNVTUlORyA9ICdSRVNVTUlORydcbn1cblxuY29uc3QgREVGQVVMVF9XQUlUX1RJTUVfT05fVU5LTk9XTl9FUlJPUiA9IDEwMFxuY29uc3QgREVGQVVMVF9NQVhfQVVUT19SRVRSWV9PTl9FUlJPUiA9IDJcbmNvbnN0IERFRkFVTFRfTUFYX1NFTkRfQUNLX0FVVE9fUkVUUllfT05fRVJST1IgPSAyXG5jb25zdCBERUZBVUxUX1NFTkRfQUNLX0RFQk9VTkNFX1RJTUVPVVQgPSAxMCAqIDEwMDBcbmNvbnN0IERFRkFVTFRfSU5JVF9XQVRDSF9USU1FT1VUID0gMTAgKiAxMDAwXG5jb25zdCBERUZBVUxUX1JFQlVJTERfV0FUQ0hfVElNRU9VVCA9IDEwICogMTAwMFxuXG5leHBvcnQgY2xhc3MgVmlydHVhbFdlYlNvY2tldENsaWVudCB7XG4gIC8vIHBhc3NlZCBvdmVyXG4gIHdhdGNoSWQ6IHN0cmluZ1xuICAvLyBvd25cbiAgbGlzdGVuZXI6IFJlYWx0aW1lTGlzdGVuZXJcbiAgcHJpdmF0ZSBlbnZJZD86IHN0cmluZ1xuICBwcml2YXRlIGNvbGxlY3Rpb25OYW1lOiBzdHJpbmdcbiAgcHJpdmF0ZSBxdWVyeTogc3RyaW5nXG4gIHByaXZhdGUgbGltaXQ6IG51bWJlclxuICBwcml2YXRlIG9yZGVyQnk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz5cbiAgcHJpdmF0ZSBzZW5kOiA8VCA9IGFueT4ob3B0czogSVdTU2VuZE9wdGlvbnMpID0+IFByb21pc2U8VD5cbiAgcHJpdmF0ZSBsb2dpbjogKGVudklkPzogc3RyaW5nLCByZWZyZXNoPzogYm9vbGVhbikgPT4gUHJvbWlzZTxhbnk+XG4gIHByaXZhdGUgaXNXU0Nvbm5lY3RlZDogKCkgPT4gYm9vbGVhblxuICBwcml2YXRlIG9uY2VXU0Nvbm5lY3RlZDogKCkgPT4gUHJvbWlzZTx2b2lkPlxuICBwcml2YXRlIGdldFdhaXRFeHBlY3RlZFRpbWVvdXRMZW5ndGg6ICgpID0+IG51bWJlclxuICBwcml2YXRlIG9uV2F0Y2hTdGFydDogKFxuICAgIGNsaWVudDogVmlydHVhbFdlYlNvY2tldENsaWVudCxcbiAgICBxdWVyeUlEOiBzdHJpbmdcbiAgKSA9PiB2b2lkXG4gIHByaXZhdGUgb25XYXRjaENsb3NlOiAoXG4gICAgY2xpZW50OiBWaXJ0dWFsV2ViU29ja2V0Q2xpZW50LFxuICAgIHF1ZXJ5SUQ6IHN0cmluZ1xuICApID0+IHZvaWRcbiAgcHJpdmF0ZSBkZWJ1Zz86IGJvb2xlYW5cblxuICBwcml2YXRlIHdhdGNoU3RhdHVzOiBXQVRDSF9TVEFUVVMgPSBXQVRDSF9TVEFUVVMuSU5JVElOR1xuICBwcml2YXRlIF9hdmFpbGFibGVSZXRyaWVzOiBQYXJ0aWFsPFJlY29yZDxJUmVxdWVzdE1zZ1R5cGUsIG51bWJlcj4+XG4gIHByaXZhdGUgX2Fja1RpbWVvdXRJZD86IG51bWJlclxuICBwcml2YXRlIF9pbml0V2F0Y2hQcm9taXNlPzogUHJvbWlzZTx2b2lkPlxuICBwcml2YXRlIF9yZWJ1aWxkV2F0Y2hQcm9taXNlPzogUHJvbWlzZTx2b2lkPlxuXG4gIC8vIG9idGFpbmVkXG4gIHByaXZhdGUgc2Vzc2lvbkluZm8/OiBJV2F0Y2hTZXNzaW9uSW5mb1xuXG4gIC8vIGludGVybmFsXG4gIHByaXZhdGUgX3dhaXRFeHBlY3RlZFRpbWVvdXRJZD86IG51bWJlclxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElWaXJ0dWFsV2ViU29ja2V0Q2xpZW50Q29uc3RydWN0b3JPcHRpb25zKSB7XG4gICAgdGhpcy53YXRjaElkID0gYHdhdGNoaWRfJHsrbmV3IERhdGUoKX1fJHtNYXRoLnJhbmRvbSgpfWBcbiAgICB0aGlzLmVudklkID0gb3B0aW9ucy5lbnZJZFxuICAgIHRoaXMuY29sbGVjdGlvbk5hbWUgPSBvcHRpb25zLmNvbGxlY3Rpb25OYW1lXG4gICAgdGhpcy5xdWVyeSA9IG9wdGlvbnMucXVlcnlcbiAgICB0aGlzLmxpbWl0ID0gb3B0aW9ucy5saW1pdFxuICAgIHRoaXMub3JkZXJCeSA9IG9wdGlvbnMub3JkZXJCeVxuICAgIHRoaXMuc2VuZCA9IG9wdGlvbnMuc2VuZFxuICAgIHRoaXMubG9naW4gPSBvcHRpb25zLmxvZ2luXG4gICAgdGhpcy5pc1dTQ29ubmVjdGVkID0gb3B0aW9ucy5pc1dTQ29ubmVjdGVkXG4gICAgdGhpcy5vbmNlV1NDb25uZWN0ZWQgPSBvcHRpb25zLm9uY2VXU0Nvbm5lY3RlZFxuICAgIHRoaXMuZ2V0V2FpdEV4cGVjdGVkVGltZW91dExlbmd0aCA9IG9wdGlvbnMuZ2V0V2FpdEV4cGVjdGVkVGltZW91dExlbmd0aFxuICAgIHRoaXMub25XYXRjaFN0YXJ0ID0gb3B0aW9ucy5vbldhdGNoU3RhcnRcbiAgICB0aGlzLm9uV2F0Y2hDbG9zZSA9IG9wdGlvbnMub25XYXRjaENsb3NlXG4gICAgdGhpcy5kZWJ1ZyA9IG9wdGlvbnMuZGVidWdcblxuICAgIHRoaXMuX2F2YWlsYWJsZVJldHJpZXMgPSB7XG4gICAgICBJTklUX1dBVENIOiBERUZBVUxUX01BWF9BVVRPX1JFVFJZX09OX0VSUk9SLFxuICAgICAgUkVCVUlMRF9XQVRDSDogREVGQVVMVF9NQVhfQVVUT19SRVRSWV9PTl9FUlJPUixcbiAgICAgIENIRUNLX0xBU1Q6IERFRkFVTFRfTUFYX1NFTkRfQUNLX0FVVE9fUkVUUllfT05fRVJST1JcbiAgICB9XG5cbiAgICB0aGlzLmxpc3RlbmVyID0gbmV3IFJlYWx0aW1lTGlzdGVuZXIoe1xuICAgICAgY2xvc2U6IHRoaXMuY2xvc2VXYXRjaCxcbiAgICAgIG9uQ2hhbmdlOiBvcHRpb25zLm9uQ2hhbmdlLFxuICAgICAgb25FcnJvcjogb3B0aW9ucy5vbkVycm9yLFxuICAgICAgZGVidWc6IHRoaXMuZGVidWcsXG4gICAgICB2aXJ0dWFsQ2xpZW50OiB0aGlzXG4gICAgfSlcblxuICAgIHRoaXMuaW5pdFdhdGNoKClcbiAgfVxuXG4gIG9uTWVzc2FnZShtc2c6IElSZXNwb25zZU1lc3NhZ2UpIHtcbiAgICAvLyB3YXRjaFN0YXR1cyBzYW5pdHkgY2hlY2tcbiAgICBzd2l0Y2ggKHRoaXMud2F0Y2hTdGF0dXMpIHtcbiAgICAgIGNhc2UgV0FUQ0hfU1RBVFVTLlBBVVNFRDoge1xuICAgICAgICAvLyBpZ25vcmUgYWxsIGJ1dCBlcnJvciBtZXNzYWdlXG4gICAgICAgIGlmIChtc2cubXNnVHlwZSAhPT0gJ0VSUk9SJykge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlIFdBVENIX1NUQVRVUy5MT0dHSU5HSU46XG4gICAgICBjYXNlIFdBVENIX1NUQVRVUy5JTklUSU5HOlxuICAgICAgY2FzZSBXQVRDSF9TVEFUVVMuUkVCVUlMRElORzoge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFtyZWFsdGltZSBsaXN0ZW5lcl0gaW50ZXJuYWwgbm9uLWZhdGFsIGVycm9yOiB1bmV4cGVjdGVkIG1lc3NhZ2UgcmVjZWl2ZWQgd2hpbGUgJHt0aGlzLndhdGNoU3RhdHVzfWBcbiAgICAgICAgKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNhc2UgV0FUQ0hfU1RBVFVTLkNMT1NFRDoge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgJ1tyZWFsdGltZSBsaXN0ZW5lcl0gaW50ZXJuYWwgbm9uLWZhdGFsIGVycm9yOiB1bmV4cGVjdGVkIG1lc3NhZ2UgcmVjZWl2ZWQgd2hlbiB0aGUgd2F0Y2ggaGFzIGNsb3NlZCdcbiAgICAgICAgKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNhc2UgV0FUQ0hfU1RBVFVTLkVSUk9SRUQ6IHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdbcmVhbHRpbWUgbGlzdGVuZXJdIGludGVybmFsIG5vbi1mYXRhbCBlcnJvcjogdW5leHBlY3RlZCBtZXNzYWdlIHJlY2VpdmVkIHdoZW4gdGhlIHdhdGNoIGhhcyBlbmRlZCB3aXRoIGVycm9yJ1xuICAgICAgICApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy5zZXNzaW9uSW5mbykge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnW3JlYWx0aW1lIGxpc3RlbmVyXSBpbnRlcm5hbCBub24tZmF0YWwgZXJyb3I6IHNlc3Npb25JbmZvIG5vdCBmb3VuZCB3aGlsZSBtZXNzYWdlIGlzIHJlY2VpdmVkLidcbiAgICAgIClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuc2NoZWR1bGVTZW5kQUNLKClcblxuICAgIHN3aXRjaCAobXNnLm1zZ1R5cGUpIHtcbiAgICAgIGNhc2UgJ05FWFRfRVZFTlQnOiB7XG4gICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIC8vIGlmICh3eC5faWdub3JlKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgbmV4dGV2ZW50ICR7bXNnLm1zZ0RhdGEuY3VyckV2ZW50fSBpZ25vcmVkYCwgbXNnKVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIC8vIHd4Ll9pZ25vcmUgPSBmYWxzZVxuICAgICAgICAvLyByZXR1cm5cbiAgICAgICAgLy8gfVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJFdmVudHMobXNnKVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSAnQ0hFQ0tfRVZFTlQnOiB7XG4gICAgICAgIGlmICh0aGlzLnNlc3Npb25JbmZvLmN1cnJlbnRFdmVudElkIDwgbXNnLm1zZ0RhdGEuY3VyckV2ZW50KSB7XG4gICAgICAgICAgLy8gY2xpZW50IGV2ZW50SUQgPCBzZXJ2ZXIgZXZlbnRJRDpcbiAgICAgICAgICAvLyB0aGVyZSBtaWdodCBiZSBvbmUgb3IgbW9yZSBwZW5kaW5nIGV2ZW50cyBub3QgeWV0IHJlY2VpdmVkIGJ1dCBzZW50IGJ5IHRoZSBzZXJ2ZXJcbiAgICAgICAgICB0aGlzLnNlc3Npb25JbmZvLmV4cGVjdEV2ZW50SWQgPSBtc2cubXNnRGF0YS5jdXJyRXZlbnRcbiAgICAgICAgICB0aGlzLmNsZWFyV2FpdEV4cGVjdGVkRXZlbnQoKVxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICB0aGlzLl93YWl0RXhwZWN0ZWRUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vIG11c3QgcmVidWlsZCB3YXRjaFxuICAgICAgICAgICAgdGhpcy5yZWJ1aWxkV2F0Y2goKVxuICAgICAgICAgIH0sIHRoaXMuZ2V0V2FpdEV4cGVjdGVkVGltZW91dExlbmd0aCgpKVxuXG4gICAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgW3JlYWx0aW1lXSB3YWl0RXhwZWN0ZWRUaW1lb3V0TGVuZ3RoICR7dGhpcy5nZXRXYWl0RXhwZWN0ZWRUaW1lb3V0TGVuZ3RoKCl9YFxuICAgICAgICAgIClcbiAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ0VSUk9SJzoge1xuICAgICAgICAvLyByZWNlaXZlIHNlcnZlciBlcnJvclxuICAgICAgICB0aGlzLmNsb3NlV2l0aEVycm9yKFxuICAgICAgICAgIG5ldyBDbG91ZFNES0Vycm9yKHtcbiAgICAgICAgICAgIGVyckNvZGU6IEVSUl9DT0RFLlNES19EQVRBQkFTRV9SRUFMVElNRV9MSVNURU5FUl9TRVJWRVJfRVJST1JfTVNHIGFzIHN0cmluZyxcbiAgICAgICAgICAgIGVyck1zZzogYCR7bXNnLm1zZ0RhdGEuY29kZX0gLSAke21zZy5tc2dEYXRhLm1lc3NhZ2V9YFxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgW3JlYWx0aW1lIGxpc3RlbmVyXSB2aXJ0dWFsIGNsaWVudCByZWNlaXZlIHVuZXhwZWN0ZWQgbXNnICR7bXNnLm1zZ1R5cGV9OiBgLFxuICAgICAgICAgIG1zZ1xuICAgICAgICApXG4gICAgICAgIC8vIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjbG9zZVdpdGhFcnJvcihlcnJvcjogYW55KSB7XG4gICAgdGhpcy53YXRjaFN0YXR1cyA9IFdBVENIX1NUQVRVUy5FUlJPUkVEXG4gICAgdGhpcy5jbGVhckFDS1NjaGVkdWxlKClcbiAgICB0aGlzLmxpc3RlbmVyLm9uRXJyb3IoZXJyb3IpXG4gICAgLy8gUmVwb3J0ZXIuc3Vycm91bmRUaGlyZEJ5VHJ5Q2F0Y2goKCkgPT4gdGhpcy5saXN0ZW5lci5vbkVycm9yKGVycm9yKSlcbiAgICB0aGlzLm9uV2F0Y2hDbG9zZShcbiAgICAgIHRoaXMsXG4gICAgICAodGhpcy5zZXNzaW9uSW5mbyAmJiB0aGlzLnNlc3Npb25JbmZvLnF1ZXJ5SUQpIHx8ICcnXG4gICAgKVxuXG4gICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgW3JlYWx0aW1lXSBjbGllbnQgY2xvc2VkICgke3RoaXMuY29sbGVjdGlvbk5hbWV9ICR7dGhpcy5xdWVyeX0pICh3YXRjaElkICR7dGhpcy53YXRjaElkfSlgXG4gICAgKVxuICAgIC8vIH1cbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMud2F0Y2hTdGF0dXMgPSBXQVRDSF9TVEFUVVMuUEFVU0VEXG4gICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgW3JlYWx0aW1lXSBjbGllbnQgcGF1c2VkICgke3RoaXMuY29sbGVjdGlvbk5hbWV9ICR7dGhpcy5xdWVyeX0pICh3YXRjaElkICR7dGhpcy53YXRjaElkfSlgXG4gICAgKVxuICAgIC8vIH1cbiAgfVxuXG4gIC8vIHJlc3VtZSgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5zZXNzaW9uSW5mbyA/IHRoaXMucmVidWlsZFdhdGNoKCkgOiB0aGlzLmluaXRXYXRjaCgpXG4gIC8vIH1cblxuICBhc3luYyByZXN1bWUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy53YXRjaFN0YXR1cyA9IFdBVENIX1NUQVRVUy5SRVNVTUlOR1xuXG4gICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgW3JlYWx0aW1lXSBjbGllbnQgcmVzdW1pbmcgd2l0aCAke1xuICAgICAgICB0aGlzLnNlc3Npb25JbmZvID8gJ1JFQlVJTERfV0FUQ0gnIDogJ0lOSVRfV0FUQ0gnXG4gICAgICB9ICgke3RoaXMuY29sbGVjdGlvbk5hbWV9ICR7dGhpcy5xdWVyeX0pICgke3RoaXMud2F0Y2hJZH0pYFxuICAgIClcbiAgICAvLyB9XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgKHRoaXMuc2Vzc2lvbkluZm8gPyB0aGlzLnJlYnVpbGRXYXRjaCgpIDogdGhpcy5pbml0V2F0Y2goKSlcblxuICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYFtyZWFsdGltZV0gY2xpZW50IHN1Y2Nlc3NmdWxseSByZXN1bWVkICgke3RoaXMuY29sbGVjdGlvbk5hbWV9ICR7dGhpcy5xdWVyeX0pICgke3RoaXMud2F0Y2hJZH0pYFxuICAgICAgKVxuICAgICAgLy8gfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgYFtyZWFsdGltZV0gY2xpZW50IHJlc3VtZSBmYWlsZWQgKCR7dGhpcy5jb2xsZWN0aW9uTmFtZX0gJHt0aGlzLnF1ZXJ5fSkgKCR7dGhpcy53YXRjaElkfSlgLFxuICAgICAgICBlXG4gICAgICApXG4gICAgICAvLyB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbG9naW4gPSBhc3luYyAoXG4gICAgZW52SWQ/OiBzdHJpbmcsXG4gICAgcmVmcmVzaD86IGJvb2xlYW5cbiAgKTogUHJvbWlzZTxJTG9naW5SZXN1bHQ+ID0+IHtcbiAgICB0aGlzLndhdGNoU3RhdHVzID0gV0FUQ0hfU1RBVFVTLkxPR0dJTkdJTlxuICAgIGNvbnN0IGxvZ2luUmVzdWx0ID0gYXdhaXQgdGhpcy5sb2dpbihlbnZJZCwgcmVmcmVzaClcbiAgICBpZiAoIXRoaXMuZW52SWQpIHtcbiAgICAgIHRoaXMuZW52SWQgPSBsb2dpblJlc3VsdC5lbnZJZFxuICAgIH1cbiAgICByZXR1cm4gbG9naW5SZXN1bHRcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFdhdGNoID0gYXN5bmMgKGZvcmNlUmVmcmVzaExvZ2luPzogYm9vbGVhbik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmICh0aGlzLl9pbml0V2F0Y2hQcm9taXNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5faW5pdFdhdGNoUHJvbWlzZVxuICAgIH1cblxuICAgIHRoaXMuX2luaXRXYXRjaFByb21pc2UgPSBuZXcgUHJvbWlzZTx2b2lkPihcbiAgICAgIGFzeW5jIChyZXNvbHZlLCByZWplY3QpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAodGhpcy53YXRjaFN0YXR1cyA9PT0gV0FUQ0hfU1RBVFVTLlBBVVNFRCkge1xuICAgICAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnW3JlYWx0aW1lXSBpbml0V2F0Y2ggY2FuY2VsbGVkIG9uIHBhdXNlJylcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCB7IGVudklkIH0gPSBhd2FpdCB0aGlzLl9sb2dpbih0aGlzLmVudklkLCBmb3JjZVJlZnJlc2hMb2dpbilcblxuICAgICAgICAgIC8vIGlmICghdGhpcy5zZXNzaW9uSW5mbykge1xuICAgICAgICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKGBjYW4gbm90IHJlYnVpbGRXYXRjaCB3aXRob3V0IGEgc3VjY2Vzc2Z1bCBpbml0V2F0Y2ggKGxhY2sgb2Ygc2Vzc2lvbkluZm8pYClcbiAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICBpZiAoKHRoaXMud2F0Y2hTdGF0dXMgYXMgV0FUQ0hfU1RBVFVTKSA9PT0gV0FUQ0hfU1RBVFVTLlBBVVNFRCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tyZWFsdGltZV0gaW5pdFdhdGNoIGNhbmNlbGxlZCBvbiBwYXVzZScpXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy53YXRjaFN0YXR1cyA9IFdBVENIX1NUQVRVUy5JTklUSU5HXG5cbiAgICAgICAgICBjb25zdCBpbml0V2F0Y2hNc2c6IElSZXF1ZXN0TWVzc2FnZUluaXRXYXRjaE1zZyA9IHtcbiAgICAgICAgICAgIHdhdGNoSWQ6IHRoaXMud2F0Y2hJZCxcbiAgICAgICAgICAgIHJlcXVlc3RJZDogZ2VuUmVxdWVzdElkKCksXG4gICAgICAgICAgICBtc2dUeXBlOiAnSU5JVF9XQVRDSCcsXG4gICAgICAgICAgICBtc2dEYXRhOiB7XG4gICAgICAgICAgICAgIGVudklkLFxuICAgICAgICAgICAgICBjb2xsTmFtZTogdGhpcy5jb2xsZWN0aW9uTmFtZSxcbiAgICAgICAgICAgICAgcXVlcnk6IHRoaXMucXVlcnksXG4gICAgICAgICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxuICAgICAgICAgICAgICBvcmRlckJ5OiB0aGlzLm9yZGVyQnlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBpbml0RXZlbnRNc2cgPSBhd2FpdCB0aGlzLnNlbmQ8SVJlc3BvbnNlTWVzc2FnZUluaXRFdmVudE1zZz4oe1xuICAgICAgICAgICAgbXNnOiBpbml0V2F0Y2hNc2csXG4gICAgICAgICAgICB3YWl0UmVzcG9uc2U6IHRydWUsXG4gICAgICAgICAgICBza2lwT25NZXNzYWdlOiB0cnVlLFxuICAgICAgICAgICAgdGltZW91dDogREVGQVVMVF9JTklUX1dBVENIX1RJTUVPVVRcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgY29uc3QgeyBldmVudHMsIGN1cnJFdmVudCB9ID0gaW5pdEV2ZW50TXNnLm1zZ0RhdGFcblxuICAgICAgICAgIHRoaXMuc2Vzc2lvbkluZm8gPSB7XG4gICAgICAgICAgICBxdWVyeUlEOiBpbml0RXZlbnRNc2cubXNnRGF0YS5xdWVyeUlELFxuICAgICAgICAgICAgY3VycmVudEV2ZW50SWQ6IGN1cnJFdmVudCAtIDEsXG4gICAgICAgICAgICBjdXJyZW50RG9jczogW11cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBGSVg6IGluIGluaXRFdmVudCBtZXNzYWdlLCBhbGwgZXZlbnRzIGhhdmUgaWQgMCwgd2hpY2ggaXMgaW5jb25zaXN0ZW50IHdpdGggY3VyckV2ZW50XG4gICAgICAgICAgaWYgKGV2ZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGUgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICAgIGUuSUQgPSBjdXJyRXZlbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlU2VydmVyRXZlbnRzKGluaXRFdmVudE1zZylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXNzaW9uSW5mby5jdXJyZW50RXZlbnRJZCA9IGN1cnJFdmVudFxuICAgICAgICAgICAgY29uc3Qgc25hcHNob3QgPSBuZXcgU25hcHNob3Qoe1xuICAgICAgICAgICAgICBpZDogY3VyckV2ZW50LFxuICAgICAgICAgICAgICBkb2NDaGFuZ2VzOiBbXSxcbiAgICAgICAgICAgICAgZG9jczogW10sXG4gICAgICAgICAgICAgIHR5cGU6ICdpbml0J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXIub25DaGFuZ2Uoc25hcHNob3QpXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlU2VuZEFDSygpXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMub25XYXRjaFN0YXJ0KHRoaXMsIHRoaXMuc2Vzc2lvbkluZm8ucXVlcnlJRClcbiAgICAgICAgICB0aGlzLndhdGNoU3RhdHVzID0gV0FUQ0hfU1RBVFVTLkFDVElWRVxuICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVJldHJpZXMuSU5JVF9XQVRDSCA9IERFRkFVTFRfTUFYX0FVVE9fUkVUUllfT05fRVJST1JcbiAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlV2F0Y2hFc3RhYmxpc2htZW50RXJyb3IoZSwge1xuICAgICAgICAgICAgb3BlcmF0aW9uTmFtZTogJ0lOSVRfV0FUQ0gnLFxuICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApXG5cbiAgICBsZXQgc3VjY2VzcyA9IGZhbHNlXG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5faW5pdFdhdGNoUHJvbWlzZVxuICAgICAgc3VjY2VzcyA9IHRydWVcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5faW5pdFdhdGNoUHJvbWlzZSA9IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgIGNvbnNvbGUubG9nKGBbcmVhbHRpbWVdIGluaXRXYXRjaCAke3N1Y2Nlc3MgPyAnc3VjY2VzcycgOiAnZmFpbCd9YClcbiAgICAvLyB9XG4gIH1cblxuICBwcml2YXRlIHJlYnVpbGRXYXRjaCA9IGFzeW5jIChmb3JjZVJlZnJlc2hMb2dpbj86IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAodGhpcy5fcmVidWlsZFdhdGNoUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlYnVpbGRXYXRjaFByb21pc2VcbiAgICB9XG5cbiAgICB0aGlzLl9yZWJ1aWxkV2F0Y2hQcm9taXNlID0gbmV3IFByb21pc2U8dm9pZD4oXG4gICAgICBhc3luYyAocmVzb2x2ZSwgcmVqZWN0KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHRoaXMud2F0Y2hTdGF0dXMgPT09IFdBVENIX1NUQVRVUy5QQVVTRUQpIHtcbiAgICAgICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tyZWFsdGltZV0gcmVidWlsZFdhdGNoIGNhbmNlbGxlZCBvbiBwYXVzZScpXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHsgZW52SWQgfSA9IGF3YWl0IHRoaXMuX2xvZ2luKHRoaXMuZW52SWQsIGZvcmNlUmVmcmVzaExvZ2luKVxuXG4gICAgICAgICAgaWYgKCF0aGlzLnNlc3Npb25JbmZvKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICdjYW4gbm90IHJlYnVpbGRXYXRjaCB3aXRob3V0IGEgc3VjY2Vzc2Z1bCBpbml0V2F0Y2ggKGxhY2sgb2Ygc2Vzc2lvbkluZm8pJ1xuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICgodGhpcy53YXRjaFN0YXR1cyBhcyBXQVRDSF9TVEFUVVMpID09PSBXQVRDSF9TVEFUVVMuUEFVU0VEKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnW3JlYWx0aW1lXSByZWJ1aWxkV2F0Y2ggY2FuY2VsbGVkIG9uIHBhdXNlJylcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLndhdGNoU3RhdHVzID0gV0FUQ0hfU1RBVFVTLlJFQlVJTERJTkdcblxuICAgICAgICAgIGNvbnN0IHJlYnVpbGRXYXRjaE1zZzogSVJlcXVlc3RNZXNzYWdlUmVidWlsZFdhdGNoTXNnID0ge1xuICAgICAgICAgICAgd2F0Y2hJZDogdGhpcy53YXRjaElkLFxuICAgICAgICAgICAgcmVxdWVzdElkOiBnZW5SZXF1ZXN0SWQoKSxcbiAgICAgICAgICAgIG1zZ1R5cGU6ICdSRUJVSUxEX1dBVENIJyxcbiAgICAgICAgICAgIG1zZ0RhdGE6IHtcbiAgICAgICAgICAgICAgZW52SWQsXG4gICAgICAgICAgICAgIGNvbGxOYW1lOiB0aGlzLmNvbGxlY3Rpb25OYW1lLFxuICAgICAgICAgICAgICBxdWVyeUlEOiB0aGlzLnNlc3Npb25JbmZvLnF1ZXJ5SUQsXG4gICAgICAgICAgICAgIGV2ZW50SUQ6IHRoaXMuc2Vzc2lvbkluZm8uY3VycmVudEV2ZW50SWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBuZXh0RXZlbnRNc2cgPSBhd2FpdCB0aGlzLnNlbmQ8SVJlc3BvbnNlTWVzc2FnZU5leHRFdmVudE1zZz4oe1xuICAgICAgICAgICAgbXNnOiByZWJ1aWxkV2F0Y2hNc2csXG4gICAgICAgICAgICB3YWl0UmVzcG9uc2U6IHRydWUsXG4gICAgICAgICAgICBza2lwT25NZXNzYWdlOiBmYWxzZSxcbiAgICAgICAgICAgIHRpbWVvdXQ6IERFRkFVTFRfUkVCVUlMRF9XQVRDSF9USU1FT1VUXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIHRoaXMuaGFuZGxlU2VydmVyRXZlbnRzKG5leHRFdmVudE1zZylcblxuICAgICAgICAgIHRoaXMud2F0Y2hTdGF0dXMgPSBXQVRDSF9TVEFUVVMuQUNUSVZFXG4gICAgICAgICAgdGhpcy5fYXZhaWxhYmxlUmV0cmllcy5SRUJVSUxEX1dBVENIID0gREVGQVVMVF9NQVhfQVVUT19SRVRSWV9PTl9FUlJPUlxuICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVXYXRjaEVzdGFibGlzaG1lbnRFcnJvcihlLCB7XG4gICAgICAgICAgICBvcGVyYXRpb25OYW1lOiAnUkVCVUlMRF9XQVRDSCcsXG4gICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIClcblxuICAgIGxldCBzdWNjZXNzID0gZmFsc2VcblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLl9yZWJ1aWxkV2F0Y2hQcm9taXNlXG4gICAgICBzdWNjZXNzID0gdHJ1ZVxuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLl9yZWJ1aWxkV2F0Y2hQcm9taXNlID0gdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgY29uc29sZS5sb2coYFtyZWFsdGltZV0gcmVidWlsZFdhdGNoICR7c3VjY2VzcyA/ICdzdWNjZXNzJyA6ICdmYWlsJ31gKVxuICAgIC8vIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlV2F0Y2hFc3RhYmxpc2htZW50RXJyb3IgPSBhc3luYyAoXG4gICAgZTogYW55LFxuICAgIG9wdGlvbnM6IElIYW5kbGVXYXRjaEVzdGFibGlzaG1lbnRFcnJvck9wdGlvbnNcbiAgKSA9PiB7XG4gICAgY29uc3QgaXNJbml0V2F0Y2ggPSBvcHRpb25zLm9wZXJhdGlvbk5hbWUgPT09ICdJTklUX1dBVENIJ1xuXG4gICAgY29uc3QgYWJvcnRXYXRjaCA9ICgpID0+IHtcbiAgICAgIC8vIG1vY2sgdGVtcCBjb21tZW50XG4gICAgICB0aGlzLmNsb3NlV2l0aEVycm9yKFxuICAgICAgICBuZXcgQ2xvdWRTREtFcnJvcih7XG4gICAgICAgICAgZXJyQ29kZTogaXNJbml0V2F0Y2hcbiAgICAgICAgICAgID8gKEVSUl9DT0RFLlNES19EQVRBQkFTRV9SRUFMVElNRV9MSVNURU5FUl9JTklUX1dBVENIX0ZBSUwgYXMgc3RyaW5nKVxuICAgICAgICAgICAgOiAoRVJSX0NPREUuU0RLX0RBVEFCQVNFX1JFQUxUSU1FX0xJU1RFTkVSX1JFQlVJTERfV0FUQ0hfRkFJTCBhcyBzdHJpbmcpLFxuICAgICAgICAgIGVyck1zZzogZVxuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgb3B0aW9ucy5yZWplY3QoZSlcbiAgICB9XG5cbiAgICBjb25zdCByZXRyeSA9IChyZWZyZXNoTG9naW4/OiBib29sZWFuKSA9PiB7XG4gICAgICBpZiAodGhpcy51c2VSZXRyeVRpY2tldChvcHRpb25zLm9wZXJhdGlvbk5hbWUpKSB7XG4gICAgICAgIGlmIChpc0luaXRXYXRjaCkge1xuICAgICAgICAgIHRoaXMuX2luaXRXYXRjaFByb21pc2UgPSB1bmRlZmluZWRcbiAgICAgICAgICBvcHRpb25zLnJlc29sdmUodGhpcy5pbml0V2F0Y2gocmVmcmVzaExvZ2luKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9yZWJ1aWxkV2F0Y2hQcm9taXNlID0gdW5kZWZpbmVkXG4gICAgICAgICAgb3B0aW9ucy5yZXNvbHZlKHRoaXMucmVidWlsZFdhdGNoKHJlZnJlc2hMb2dpbikpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFib3J0V2F0Y2goKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlQ29tbW9uRXJyb3IoZSwge1xuICAgICAgb25TaWduRXJyb3I6ICgpID0+IHJldHJ5KHRydWUpLFxuICAgICAgb25UaW1lb3V0RXJyb3I6ICgpID0+IHJldHJ5KGZhbHNlKSxcbiAgICAgIG9uTm90UmV0cnlhYmxlRXJyb3I6IGFib3J0V2F0Y2gsXG4gICAgICBvbkNhbmNlbGxlZEVycm9yOiBvcHRpb25zLnJlamVjdCxcbiAgICAgIG9uVW5rbm93bkVycm9yOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3Qgb25XU0Rpc2Nvbm5lY3RlZCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5vbmNlV1NDb25uZWN0ZWQoKVxuICAgICAgICAgICAgcmV0cnkodHJ1ZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXRoaXMuaXNXU0Nvbm5lY3RlZCgpKSB7XG4gICAgICAgICAgICBhd2FpdCBvbldTRGlzY29ubmVjdGVkKClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXdhaXQgc2xlZXAoREVGQVVMVF9XQUlUX1RJTUVfT05fVU5LTk9XTl9FUlJPUilcbiAgICAgICAgICAgIGlmICh0aGlzLndhdGNoU3RhdHVzID09PSBXQVRDSF9TVEFUVVMuUEFVU0VEKSB7XG4gICAgICAgICAgICAgIC8vIGNhbmNlbFxuICAgICAgICAgICAgICBvcHRpb25zLnJlamVjdChcbiAgICAgICAgICAgICAgICBuZXcgQ2FuY2VsbGVkRXJyb3IoXG4gICAgICAgICAgICAgICAgICBgJHtvcHRpb25zLm9wZXJhdGlvbk5hbWV9IGNhbmNlbGxlZCBkdWUgdG8gcGF1c2UgYWZ0ZXIgdW5rbm93bkVycm9yYFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5pc1dTQ29ubmVjdGVkKCkpIHtcbiAgICAgICAgICAgICAgYXdhaXQgb25XU0Rpc2Nvbm5lY3RlZCgpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXRyeShmYWxzZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIGVycm9yIHdoaWxlIGhhbmRsaW5nIGVycm9yLCBpbiBvcmRlciB0byBwcm92aWRlIG1heGltdW0gZWZmb3J0IG9uIFNFQU1JTkdMRVNTIEZBVUxUIFRPTEVSQU5DRSwganVzdCByZXRyeVxuICAgICAgICAgIHJldHJ5KHRydWUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHJpdmF0ZSBjbG9zZVdhdGNoID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHF1ZXJ5SWQgPSB0aGlzLnNlc3Npb25JbmZvID8gdGhpcy5zZXNzaW9uSW5mby5xdWVyeUlEIDogJydcblxuICAgIGlmICh0aGlzLndhdGNoU3RhdHVzICE9PSBXQVRDSF9TVEFUVVMuQUNUSVZFKSB7XG4gICAgICB0aGlzLndhdGNoU3RhdHVzID0gV0FUQ0hfU1RBVFVTLkNMT1NFRFxuICAgICAgdGhpcy5vbldhdGNoQ2xvc2UodGhpcywgcXVlcnlJZClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB0aGlzLndhdGNoU3RhdHVzID0gV0FUQ0hfU1RBVFVTLkNMT1NJTkdcblxuICAgICAgY29uc3QgY2xvc2VXYXRjaE1zZzogSVJlcXVlc3RNZXNzYWdlQ2xvc2VXYXRjaE1zZyA9IHtcbiAgICAgICAgd2F0Y2hJZDogdGhpcy53YXRjaElkLFxuICAgICAgICByZXF1ZXN0SWQ6IGdlblJlcXVlc3RJZCgpLFxuICAgICAgICBtc2dUeXBlOiAnQ0xPU0VfV0FUQ0gnLFxuICAgICAgICBtc2dEYXRhOiBudWxsXG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHRoaXMuc2VuZCh7XG4gICAgICAgIG1zZzogY2xvc2VXYXRjaE1zZ1xuICAgICAgfSlcblxuICAgICAgdGhpcy5zZXNzaW9uSW5mbyA9IHVuZGVmaW5lZFxuICAgICAgdGhpcy53YXRjaFN0YXR1cyA9IFdBVENIX1NUQVRVUy5DTE9TRURcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmNsb3NlV2l0aEVycm9yKFxuICAgICAgICBuZXcgQ2xvdWRTREtFcnJvcih7XG4gICAgICAgICAgZXJyQ29kZTogRVJSX0NPREUuU0RLX0RBVEFCQVNFX1JFQUxUSU1FX0xJU1RFTkVSX0NMT1NFX1dBVENIX0ZBSUwgYXMgc3RyaW5nLFxuICAgICAgICAgIGVyck1zZzogZVxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLm9uV2F0Y2hDbG9zZSh0aGlzLCBxdWVyeUlkKVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2NoZWR1bGVTZW5kQUNLID0gKCkgPT4ge1xuICAgIHRoaXMuY2xlYXJBQ0tTY2hlZHVsZSgpXG5cbiAgICAvLyBUT0RPOiBzaG91bGQgd2UgY2hlY2sgc3RhdHVzIGFmdGVyIHRpbWVvdXRcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5fYWNrVGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fd2FpdEV4cGVjdGVkVGltZW91dElkKSB7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVTZW5kQUNLKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VuZEFDSygpXG4gICAgICB9XG4gICAgfSwgREVGQVVMVF9TRU5EX0FDS19ERUJPVU5DRV9USU1FT1VUKVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhckFDS1NjaGVkdWxlID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLl9hY2tUaW1lb3V0SWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9hY2tUaW1lb3V0SWQpXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZW5kQUNLID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy53YXRjaFN0YXR1cyAhPT0gV0FUQ0hfU1RBVFVTLkFDVElWRSkge1xuICAgICAgICB0aGlzLnNjaGVkdWxlU2VuZEFDSygpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuc2Vzc2lvbkluZm8pIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdbcmVhbHRpbWUgbGlzdGVuZXJdIGNhbiBub3Qgc2VuZCBhY2sgd2l0aG91dCBhIHN1Y2Nlc3NmdWwgaW5pdFdhdGNoIChsYWNrIG9mIHNlc3Npb25JbmZvKSdcbiAgICAgICAgKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgYWNrTXNnOiBJUmVxdWVzdE1lc3NhZ2VDaGVja0xhc3RNc2cgPSB7XG4gICAgICAgIHdhdGNoSWQ6IHRoaXMud2F0Y2hJZCxcbiAgICAgICAgcmVxdWVzdElkOiBnZW5SZXF1ZXN0SWQoKSxcbiAgICAgICAgbXNnVHlwZTogJ0NIRUNLX0xBU1QnLFxuICAgICAgICBtc2dEYXRhOiB7XG4gICAgICAgICAgcXVlcnlJRDogdGhpcy5zZXNzaW9uSW5mby5xdWVyeUlELFxuICAgICAgICAgIGV2ZW50SUQ6IHRoaXMuc2Vzc2lvbkluZm8uY3VycmVudEV2ZW50SWRcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhd2FpdCB0aGlzLnNlbmQoe1xuICAgICAgICBtc2c6IGFja01zZ1xuICAgICAgfSlcblxuICAgICAgdGhpcy5zY2hlZHVsZVNlbmRBQ0soKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFRPRE86IHJlZmFjdG9yXG4gICAgICBpZiAoaXNSZWFsdGltZUVycm9yTWVzc2FnZUVycm9yKGUpKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IGUucGF5bG9hZFxuICAgICAgICBzd2l0Y2ggKG1zZy5tc2dEYXRhLmNvZGUpIHtcbiAgICAgICAgICAvLyBzaWduYXR1cmUgZXJyb3IgLT4gcmV0cnkgd2l0aCByZWZyZXNoZWQgc2lnbmF0dXJlXG4gICAgICAgICAgY2FzZSAnQ0hFQ0tfTE9HSU5fRkFJTEVEJzpcbiAgICAgICAgICBjYXNlICdTSUdOX0VYUElSRURfRVJST1InOlxuICAgICAgICAgIGNhc2UgJ1NJR05fSU5WQUxJRF9FUlJPUic6XG4gICAgICAgICAgY2FzZSAnU0lHTl9QQVJBTV9JTlZBTElEJzoge1xuICAgICAgICAgICAgdGhpcy5yZWJ1aWxkV2F0Y2goKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIG90aGVyIC0+IHRocm93XG4gICAgICAgICAgY2FzZSAnUVVFUllJRF9JTlZBTElEX0VSUk9SJzpcbiAgICAgICAgICBjYXNlICdTWVNfRVJSJzpcbiAgICAgICAgICBjYXNlICdJTlZBTElJRF9FTlYnOlxuICAgICAgICAgIGNhc2UgJ0NPTExFQ1RJT05fUEVSTUlTU0lPTl9ERU5JRUQnOiB7XG4gICAgICAgICAgICAvLyBtdXN0IHRocm93XG4gICAgICAgICAgICB0aGlzLmNsb3NlV2l0aEVycm9yKFxuICAgICAgICAgICAgICBuZXcgQ2xvdWRTREtFcnJvcih7XG4gICAgICAgICAgICAgICAgZXJyQ29kZTogRVJSX0NPREUuU0RLX0RBVEFCQVNFX1JFQUxUSU1FX0xJU1RFTkVSX0NIRUNLX0xBU1RfRkFJTCBhcyBzdHJpbmcsXG4gICAgICAgICAgICAgICAgZXJyTXNnOiBtc2cubXNnRGF0YS5jb2RlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gbWF5YmUgcmV0cnlhYmxlXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuX2F2YWlsYWJsZVJldHJpZXMuQ0hFQ0tfTEFTVCAmJlxuICAgICAgICB0aGlzLl9hdmFpbGFibGVSZXRyaWVzLkNIRUNLX0xBU1QgPiAwXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fYXZhaWxhYmxlUmV0cmllcy5DSEVDS19MQVNULS1cbiAgICAgICAgdGhpcy5zY2hlZHVsZVNlbmRBQ0soKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jbG9zZVdpdGhFcnJvcihcbiAgICAgICAgICBuZXcgQ2xvdWRTREtFcnJvcih7XG4gICAgICAgICAgICBlcnJDb2RlOiBFUlJfQ09ERS5TREtfREFUQUJBU0VfUkVBTFRJTUVfTElTVEVORVJfQ0hFQ0tfTEFTVF9GQUlMIGFzIHN0cmluZyxcbiAgICAgICAgICAgIGVyck1zZzogZVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUNvbW1vbkVycm9yID0gKFxuICAgIGU6IGFueSxcbiAgICBvcHRpb25zOiBJSGFuZGxlQ29tbW9uRXJyb3JPcHRpb25zXG4gICk6IHZvaWQgPT4ge1xuICAgIGlmIChpc1JlYWx0aW1lRXJyb3JNZXNzYWdlRXJyb3IoZSkpIHtcbiAgICAgIGNvbnN0IG1zZyA9IGUucGF5bG9hZFxuICAgICAgc3dpdGNoIChtc2cubXNnRGF0YS5jb2RlKSB7XG4gICAgICAgIC8vIHNpZ25hdHVyZSBlcnJvciAtPiByZXRyeSB3aXRoIHJlZnJlc2hlZCBzaWduYXR1cmVcbiAgICAgICAgY2FzZSAnQ0hFQ0tfTE9HSU5fRkFJTEVEJzpcbiAgICAgICAgY2FzZSAnU0lHTl9FWFBJUkVEX0VSUk9SJzpcbiAgICAgICAgY2FzZSAnU0lHTl9JTlZBTElEX0VSUk9SJzpcbiAgICAgICAgY2FzZSAnU0lHTl9QQVJBTV9JTlZBTElEJzoge1xuICAgICAgICAgIG9wdGlvbnMub25TaWduRXJyb3IoZSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICAvLyBub3QtcmV0cnlhYmxlIGVycm9yIC0+IHRocm93XG4gICAgICAgIGNhc2UgJ1FVRVJZSURfSU5WQUxJRF9FUlJPUic6XG4gICAgICAgIGNhc2UgJ1NZU19FUlInOlxuICAgICAgICBjYXNlICdJTlZBTElJRF9FTlYnOlxuICAgICAgICBjYXNlICdDT0xMRUNUSU9OX1BFUk1JU1NJT05fREVOSUVEJzoge1xuICAgICAgICAgIG9wdGlvbnMub25Ob3RSZXRyeWFibGVFcnJvcihlKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICBvcHRpb25zLm9uTm90UmV0cnlhYmxlRXJyb3IoZSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNUaW1lb3V0RXJyb3IoZSkpIHtcbiAgICAgIC8vIHRpbWVvdXQgZXJyb3JcbiAgICAgIG9wdGlvbnMub25UaW1lb3V0RXJyb3IoZSlcbiAgICAgIHJldHVyblxuICAgIH0gZWxzZSBpZiAoaXNDYW5jZWxsZWRFcnJvcihlKSkge1xuICAgICAgLy8gY2FuY2VsbGVkIGVycm9yXG4gICAgICBvcHRpb25zLm9uQ2FuY2VsbGVkRXJyb3IoZSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIHVua25vd24gZXJyb3JcbiAgICBvcHRpb25zLm9uVW5rbm93bkVycm9yKGUpXG4gIH1cblxuICAvLyBjcmVkaXQgYSByZXRyeSBjaGFuY2UgZnJvbSBhdmFpbGFibGVSZXRyaWVzXG4gIHByaXZhdGUgdXNlUmV0cnlUaWNrZXQob3BlcmF0aW9uTmFtZTogSVJlcXVlc3RNc2dUeXBlKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5fYXZhaWxhYmxlUmV0cmllc1tvcGVyYXRpb25OYW1lXSAmJlxuICAgICAgdGhpcy5fYXZhaWxhYmxlUmV0cmllc1tvcGVyYXRpb25OYW1lXSEgPiAwXG4gICAgKSB7XG4gICAgICB0aGlzLl9hdmFpbGFibGVSZXRyaWVzW29wZXJhdGlvbk5hbWVdIS0tXG5cbiAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBbcmVhbHRpbWVdICR7b3BlcmF0aW9uTmFtZX0gdXNlIGEgcmV0cnkgdGlja2V0LCBub3cgb25seSAke3RoaXMuX2F2YWlsYWJsZVJldHJpZXNbb3BlcmF0aW9uTmFtZV19IHJldHJ5IGxlZnRgXG4gICAgICApXG4gICAgICAvLyB9XG5cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVTZXJ2ZXJFdmVudHMoXG4gICAgbXNnOiBJUmVzcG9uc2VNZXNzYWdlSW5pdEV2ZW50TXNnIHwgSVJlc3BvbnNlTWVzc2FnZU5leHRFdmVudE1zZ1xuICApIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5zY2hlZHVsZVNlbmRBQ0soKVxuICAgICAgYXdhaXQgdGhpcy5faGFuZGxlU2VydmVyRXZlbnRzKG1zZylcbiAgICAgIHRoaXMuX3Bvc3RIYW5kbGVTZXJ2ZXJFdmVudHNWYWxpZGl0eUNoZWNrKG1zZylcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgIC8vIFRPRE86IHJlcG9ydFxuICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgJ1tyZWFsdGltZSBsaXN0ZW5lcl0gaW50ZXJuYWwgbm9uLWZhdGFsIGVycm9yOiBoYW5kbGUgc2VydmVyIGV2ZW50cyBmYWlsZWQgd2l0aCBlcnJvcjogJyxcbiAgICAgICAgZVxuICAgICAgKVxuXG4gICAgICAvLyB3cml0ZVRvRmlsZShcbiAgICAgIC8vICAgXCJ3c2Vycm9yLnR4dFwiLFxuICAgICAgLy8gICBgW3JlYWx0aW1lIGxpc3RlbmVyXSBpbnRlcm5hbCBub24tZmF0YWwgZXJyb3I6IGhhbmRsZSBzZXJ2ZXIgZXZlbnRzIGZhaWxlZCB3aXRoIGVycm9yOiAgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKHt9LCBlLCB7XG4gICAgICAvLyAgICAgICByZXF1ZXN0SWQ6IG1zZy5yZXF1ZXN0SWQsXG4gICAgICAvLyAgICAgICB3YXRjaElkOiBtc2cud2F0Y2hJZFxuICAgICAgLy8gICAgIH0pXG4gICAgICAvLyAgICl9IFxcbmBcbiAgICAgIC8vIClcbiAgICAgIC8vIH1cblxuICAgICAgdGhyb3cgZVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2hhbmRsZVNlcnZlckV2ZW50cyhcbiAgICBtc2c6IElSZXNwb25zZU1lc3NhZ2VJbml0RXZlbnRNc2cgfCBJUmVzcG9uc2VNZXNzYWdlTmV4dEV2ZW50TXNnXG4gICkge1xuICAgIGNvbnN0IHsgcmVxdWVzdElkIH0gPSBtc2dcblxuICAgIGNvbnN0IHsgZXZlbnRzIH0gPSBtc2cubXNnRGF0YVxuICAgIGNvbnN0IHsgbXNnVHlwZSB9ID0gbXNnXG5cbiAgICBpZiAoIWV2ZW50cy5sZW5ndGggfHwgIXRoaXMuc2Vzc2lvbkluZm8pIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHNlc3Npb25JbmZvID0gdGhpcy5zZXNzaW9uSW5mb1xuXG4gICAgbGV0IGFsbENoYW5nZUV2ZW50czogSVNpbmdsZURCRXZlbnRbXVxuICAgIHRyeSB7XG4gICAgICBhbGxDaGFuZ2VFdmVudHMgPSBldmVudHMubWFwKGdldFB1YmxpY0V2ZW50KVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuY2xvc2VXaXRoRXJyb3IoXG4gICAgICAgIG5ldyBDbG91ZFNES0Vycm9yKHtcbiAgICAgICAgICBlcnJDb2RlOiBFUlJfQ09ERS5TREtfREFUQUJBU0VfUkVBTFRJTUVfTElTVEVORVJfUkVDRUlWRV9JTlZBTElEX1NFUlZFUl9EQVRBIGFzIHN0cmluZyxcbiAgICAgICAgICBlcnJNc2c6IGVcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIGFnZ3JlZ2F0ZSBkb2NzXG4gICAgbGV0IGRvY3MgPSBbLi4uc2Vzc2lvbkluZm8uY3VycmVudERvY3NdXG4gICAgbGV0IGluaXRFbmNvdW50ZXJlZCA9IGZhbHNlXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFsbENoYW5nZUV2ZW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgY2hhbmdlID0gYWxsQ2hhbmdlRXZlbnRzW2ldXG5cbiAgICAgIGlmIChzZXNzaW9uSW5mby5jdXJyZW50RXZlbnRJZCA+PSBjaGFuZ2UuaWQpIHtcbiAgICAgICAgaWYgKCFhbGxDaGFuZ2VFdmVudHNbaSAtIDFdIHx8IGNoYW5nZS5pZCA+IGFsbENoYW5nZUV2ZW50c1tpIC0gMV0uaWQpIHtcbiAgICAgICAgICAvLyBkdXBsaWNhdGUgZXZlbnQsIGRyb3BhYmxlXG4gICAgICAgICAgLy8gVE9ETzogcmVwb3J0XG4gICAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgYFtyZWFsdGltZV0gZHVwbGljYXRlIGV2ZW50IHJlY2VpdmVkLCBjdXIgJHtzZXNzaW9uSW5mby5jdXJyZW50RXZlbnRJZH0gYnV0IGdvdCAke2NoYW5nZS5pZH1gXG4gICAgICAgICAgKVxuICAgICAgICAgIC8vIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBhbGxDaGFuZ2VFdmVudHMgc2hvdWxkIGJlIGluIGFzY2VuZGluZyBvcmRlciBhY2NvcmRpbmcgdG8gZXZlbnRJZCwgdGhpcyBzaG91bGQgbmV2ZXIgaGFwcGVucywgbXVzdCByZXBvcnQgYSBub24tZmF0YWwgZXJyb3JcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgYFtyZWFsdGltZSBsaXN0ZW5lcl0gc2VydmVyIG5vbi1mYXRhbCBlcnJvcjogZXZlbnRzIG91dCBvZiBvcmRlciAodGhlIGxhdHRlciBldmVudCdzIGlkIGlzIHNtYWxsZXIgdGhhbiB0aGF0IG9mIHRoZSBmb3JtZXIpIChyZXF1ZXN0SWQgJHtyZXF1ZXN0SWR9KWBcbiAgICAgICAgICApXG5cbiAgICAgICAgICAvLyB3cml0ZVRvRmlsZShcbiAgICAgICAgICAvLyAgIFwid3NlcnJvci50eHRcIixcbiAgICAgICAgICAvLyAgIGBbcmVhbHRpbWUgbGlzdGVuZXJdIHNlcnZlciBub24tZmF0YWwgZXJyb3I6IGV2ZW50cyBvdXQgb2Ygb3JkZXIgKHRoZSBsYXR0ZXIgZXZlbnQncyBpZCBpcyBzbWFsbGVyIHRoYW4gdGhhdCBvZiB0aGUgZm9ybWVyKSAgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAvLyAgICAgICB7fSxcbiAgICAgICAgICAvLyAgICAgICB7XG4gICAgICAgICAgLy8gICAgICAgICByZXF1ZXN0SWQ6IG1zZy5yZXF1ZXN0SWQsXG4gICAgICAgICAgLy8gICAgICAgICB3YXRjaElkOiBtc2cud2F0Y2hJZFxuICAgICAgICAgIC8vICAgICAgIH1cbiAgICAgICAgICAvLyAgICAgKVxuICAgICAgICAgIC8vICAgKX0gXFxuYFxuICAgICAgICAgIC8vIClcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZVxuICAgICAgfSBlbHNlIGlmIChzZXNzaW9uSW5mby5jdXJyZW50RXZlbnRJZCA9PT0gY2hhbmdlLmlkIC0gMSkge1xuICAgICAgICAvLyBjb3JyZWN0IHNlcXVlbmNlXG4gICAgICAgIC8vIGZpcnN0IGhhbmRsZSBkYXRhVHlwZSB0aGVuIHF1ZXVlVHlwZTpcbiAgICAgICAgLy8gMS4gZGF0YVR5cGU6IHdlIE9OTFkgcG9wdWxhdGUgY2hhbmdlLmRvYyBpZiBuZWNjZXNzYXJ5XG4gICAgICAgIC8vIDIuIHF1ZXVlVHlwZTogd2UgYnVpbGQgdGhlIGRhdGEgc25hcHNob3RcblxuICAgICAgICBzd2l0Y2ggKGNoYW5nZS5kYXRhVHlwZSkge1xuICAgICAgICAgIGNhc2UgJ3VwZGF0ZSc6IHtcbiAgICAgICAgICAgIC8vIG9ubHkgbmVlZCB0byBwb3B1bGF0ZSBjaGFuZ2UuZG9jIHdoZW4gaXQgaXMgbm90IHByb3ZpZGVkXG4gICAgICAgICAgICBpZiAoIWNoYW5nZS5kb2MpIHtcbiAgICAgICAgICAgICAgc3dpdGNoIChjaGFuZ2UucXVldWVUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAndXBkYXRlJzpcbiAgICAgICAgICAgICAgICBjYXNlICdkZXF1ZXVlJzoge1xuICAgICAgICAgICAgICAgICAgY29uc3QgbG9jYWxEb2MgPSBkb2NzLmZpbmQoZG9jID0+IGRvYy5faWQgPT09IGNoYW5nZS5kb2NJZClcbiAgICAgICAgICAgICAgICAgIGlmIChsb2NhbERvYykge1xuICAgICAgICAgICAgICAgICAgICAvLyBhIHBhcnRpYWwgdXBkYXRlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRvYyA9IGNsb25lRGVlcChsb2NhbERvYylcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlLnVwZGF0ZWRGaWVsZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkUGF0aCBpbiBjaGFuZ2UudXBkYXRlZEZpZWxkcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KGRvYywgZmllbGRQYXRoLCBjaGFuZ2UudXBkYXRlZEZpZWxkc1tmaWVsZFBhdGhdKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UucmVtb3ZlZEZpZWxkcykge1xuICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZmllbGRQYXRoIG9mIGNoYW5nZS5yZW1vdmVkRmllbGRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bnNldChkb2MsIGZpZWxkUGF0aClcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2UuZG9jID0gZG9jXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIHJlcG9ydFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgICAgICAgICdbcmVhbHRpbWUgbGlzdGVuZXJdIGludGVybmFsIG5vbi1mYXRhbCBzZXJ2ZXIgZXJyb3I6IHVuZXhwZWN0ZWQgdXBkYXRlIGRhdGFUeXBlIGV2ZW50IHdoZXJlIG5vIGRvYyBpcyBhc3NvY2lhdGVkLidcbiAgICAgICAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHdyaXRlVG9GaWxlKFxuICAgICAgICAgICAgICAgICAgICAvLyAgIFwid3NlcnJvci50eHRcIixcbiAgICAgICAgICAgICAgICAgICAgLy8gICBgW3JlYWx0aW1lIGxpc3RlbmVyXSBpbnRlcm5hbCBub24tZmF0YWwgc2VydmVyIGVycm9yOiB1bmV4cGVjdGVkIHVwZGF0ZSBkYXRhVHlwZSBldmVudCB3aGVyZSBubyBkb2MgaXMgYXNzb2NpYXRlZC4gICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICB7fSxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJlcXVlc3RJZDogbXNnLnJlcXVlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB3YXRjaElkOiBtc2cud2F0Y2hJZFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICApXG4gICAgICAgICAgICAgICAgICAgIC8vICAgKX0gXFxuYFxuICAgICAgICAgICAgICAgICAgICAvLyApXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlICdlbnF1ZXVlJzoge1xuICAgICAgICAgICAgICAgICAgLy8gZG9jIGlzIHByb3ZpZGVkIGJ5IHNlcnZlciwgdGhpcyBzaG91bGQgbmV2ZXIgb2NjdXJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBDbG91ZFNES0Vycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyQ29kZTogRVJSX0NPREUuU0RLX0RBVEFCQVNFX1JFQUxUSU1FX0xJU1RFTkVSX1VORVhQRUNURURfRkFUQUxfRVJST1IgYXMgc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBlcnJNc2c6IGBIYW5kbGVTZXJ2ZXJFdmVudHM6IGZ1bGwgZG9jIGlzIG5vdCBwcm92aWRlZCB3aXRoIGRhdGFUeXBlPVwidXBkYXRlXCIgYW5kIHF1ZXVlVHlwZT1cImVucXVldWVcIiAocmVxdWVzdElkICR7bXNnLnJlcXVlc3RJZH0pYFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VXaXRoRXJyb3IoZXJyKVxuICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdyZXBsYWNlJzoge1xuICAgICAgICAgICAgLy8gdmFsaWRhdGlvblxuICAgICAgICAgICAgaWYgKCFjaGFuZ2UuZG9jKSB7XG4gICAgICAgICAgICAgIC8vIGRvYyBpcyBwcm92aWRlZCBieSBzZXJ2ZXIsIHRoaXMgc2hvdWxkIG5ldmVyIG9jY3VyXG4gICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBDbG91ZFNES0Vycm9yKHtcbiAgICAgICAgICAgICAgICBlcnJDb2RlOiBFUlJfQ09ERS5TREtfREFUQUJBU0VfUkVBTFRJTUVfTElTVEVORVJfVU5FWFBFQ1RFRF9GQVRBTF9FUlJPUiBhcyBzdHJpbmcsXG4gICAgICAgICAgICAgICAgZXJyTXNnOiBgSGFuZGxlU2VydmVyRXZlbnRzOiBmdWxsIGRvYyBpcyBub3QgcHJvdmlkZWQgd2l0aCBkYXRhVHlwZT1cInJlcGxhY2VcIiAocmVxdWVzdElkICR7bXNnLnJlcXVlc3RJZH0pYFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB0aGlzLmNsb3NlV2l0aEVycm9yKGVycilcbiAgICAgICAgICAgICAgdGhyb3cgZXJyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdyZW1vdmUnOiB7XG4gICAgICAgICAgICBjb25zdCBkb2MgPSBkb2NzLmZpbmQoZG9jID0+IGRvYy5faWQgPT09IGNoYW5nZS5kb2NJZClcbiAgICAgICAgICAgIGlmIChkb2MpIHtcbiAgICAgICAgICAgICAgY2hhbmdlLmRvYyA9IGRvY1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gVE9ETyByZXBvcnRcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICAnW3JlYWx0aW1lIGxpc3RlbmVyXSBpbnRlcm5hbCBub24tZmF0YWwgc2VydmVyIGVycm9yOiB1bmV4cGVjdGVkIHJlbW92ZSBldmVudCB3aGVyZSBubyBkb2MgaXMgYXNzb2NpYXRlZC4nXG4gICAgICAgICAgICAgIClcblxuICAgICAgICAgICAgICAvLyB3cml0ZVRvRmlsZShcbiAgICAgICAgICAgICAgLy8gICBcIndzZXJyb3IudHh0XCIsXG4gICAgICAgICAgICAgIC8vICAgYFtyZWFsdGltZSBsaXN0ZW5lcl0gaW50ZXJuYWwgbm9uLWZhdGFsIHNlcnZlciBlcnJvcjogdW5leHBlY3RlZCByZW1vdmUgZXZlbnQgd2hlcmUgbm8gZG9jIGlzIGFzc29jaWF0ZWQuICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgICAvLyAgICAgICB7fSxcbiAgICAgICAgICAgICAgLy8gICAgICAge1xuICAgICAgICAgICAgICAvLyAgICAgICAgIHJlcXVlc3RJZDogbXNnLnJlcXVlc3RJZCxcbiAgICAgICAgICAgICAgLy8gICAgICAgICB3YXRjaElkOiBtc2cud2F0Y2hJZFxuICAgICAgICAgICAgICAvLyAgICAgICB9XG4gICAgICAgICAgICAgIC8vICAgICApXG4gICAgICAgICAgICAgIC8vICAgKX0gXFxuYFxuICAgICAgICAgICAgICAvLyApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdsaW1pdCc6IHtcbiAgICAgICAgICAgIGlmICghY2hhbmdlLmRvYykge1xuICAgICAgICAgICAgICBzd2l0Y2goY2hhbmdlLnF1ZXVlVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RlcXVldWUnOiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBkb2MgPSBkb2NzLmZpbmQoZG9jID0+IGRvYy5faWQgPT09IGNoYW5nZS5kb2NJZClcbiAgICAgICAgICAgICAgICAgIGlmIChkb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlLmRvYyA9IGRvY1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAnW3JlYWx0aW1lIGxpc3RlbmVyXSBpbnRlcm5hbCBub24tZmF0YWwgc2VydmVyIGVycm9yOiB1bmV4cGVjdGVkIGxpbWl0IGRhdGFUeXBlIGV2ZW50IHdoZXJlIG5vIGRvYyBpcyBhc3NvY2lhdGVkLidcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSAnZW5xdWV1ZSc6IHtcbiAgICAgICAgICAgICAgICAgIC8vIGRvYyBpcyBwcm92aWRlZCBieSBzZXJ2ZXIsIHRoaXMgc2hvdWxkIG5ldmVyIG9jY3VyXG4gICAgICAgICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgQ2xvdWRTREtFcnJvcih7XG4gICAgICAgICAgICAgICAgICAgIGVyckNvZGU6IEVSUl9DT0RFLlNES19EQVRBQkFTRV9SRUFMVElNRV9MSVNURU5FUl9VTkVYUEVDVEVEX0ZBVEFMX0VSUk9SIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgZXJyTXNnOiBgSGFuZGxlU2VydmVyRXZlbnRzOiBmdWxsIGRvYyBpcyBub3QgcHJvdmlkZWQgd2l0aCBkYXRhVHlwZT1cImxpbWl0XCIgYW5kIHF1ZXVlVHlwZT1cImVucXVldWVcIiAocmVxdWVzdElkICR7bXNnLnJlcXVlc3RJZH0pYFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VXaXRoRXJyb3IoZXJyKVxuICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoY2hhbmdlLnF1ZXVlVHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2luaXQnOiB7XG4gICAgICAgICAgICBpZiAoIWluaXRFbmNvdW50ZXJlZCkge1xuICAgICAgICAgICAgICBpbml0RW5jb3VudGVyZWQgPSB0cnVlXG4gICAgICAgICAgICAgIGRvY3MgPSBbY2hhbmdlLmRvY11cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRvY3MucHVzaChjaGFuZ2UuZG9jKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSAnZW5xdWV1ZSc6IHtcbiAgICAgICAgICAgIGRvY3MucHVzaChjaGFuZ2UuZG9jKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSAnZGVxdWV1ZSc6IHtcbiAgICAgICAgICAgIGNvbnN0IGluZCA9IGRvY3MuZmluZEluZGV4KGRvYyA9PiBkb2MuX2lkID09PSBjaGFuZ2UuZG9jSWQpXG4gICAgICAgICAgICBpZiAoaW5kID4gLTEpIHtcbiAgICAgICAgICAgICAgZG9jcy5zcGxpY2UoaW5kLCAxKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gVE9ETyByZXBvcnRcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICAnW3JlYWx0aW1lIGxpc3RlbmVyXSBpbnRlcm5hbCBub24tZmF0YWwgc2VydmVyIGVycm9yOiB1bmV4cGVjdGVkIGRlcXVldWUgZXZlbnQgd2hlcmUgbm8gZG9jIGlzIGFzc29jaWF0ZWQuJ1xuICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgLy8gd3JpdGVUb0ZpbGUoXG4gICAgICAgICAgICAgIC8vICAgXCJ3c2Vycm9yLnR4dFwiLFxuICAgICAgICAgICAgICAvLyAgIGBbcmVhbHRpbWUgbGlzdGVuZXJdIGludGVybmFsIG5vbi1mYXRhbCBzZXJ2ZXIgZXJyb3I6IHVuZXhwZWN0ZWQgZGVxdWV1ZSBldmVudCB3aGVyZSBubyBkb2MgaXMgYXNzb2NpYXRlZC4gJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICAgIC8vICAgICAgIHt9LFxuICAgICAgICAgICAgICAvLyAgICAgICB7XG4gICAgICAgICAgICAgIC8vICAgICAgICAgcmVxdWVzdElkOiBtc2cucmVxdWVzdElkLFxuICAgICAgICAgICAgICAvLyAgICAgICAgIHdhdGNoSWQ6IG1zZy53YXRjaElkXG4gICAgICAgICAgICAgIC8vICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gICAgIClcbiAgICAgICAgICAgICAgLy8gICApfSBcXG5gXG4gICAgICAgICAgICAgIC8vIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ3VwZGF0ZSc6IHtcbiAgICAgICAgICAgIC8vIHdyaXRlVG9GaWxlKFxuICAgICAgICAgICAgLy8gICBcIndzZXJyb3IudHh0XCIsXG4gICAgICAgICAgICAvLyAgIGBbcmVhbHRpbWUgbGlzdGVuZXJdIGRvY3MgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgIC8vICAgICBkb2NzXG4gICAgICAgICAgICAvLyAgICl9IGNoYW5nZSBkb2MgJHtKU09OLnN0cmluZ2lmeShjaGFuZ2UpfSBcXG5gXG4gICAgICAgICAgICAvLyApXG4gICAgICAgICAgICBjb25zdCBpbmQgPSBkb2NzLmZpbmRJbmRleChkb2MgPT4gZG9jLl9pZCA9PT0gY2hhbmdlLmRvY0lkKVxuICAgICAgICAgICAgaWYgKGluZCA+IC0xKSB7XG4gICAgICAgICAgICAgIGRvY3NbaW5kXSA9IGNoYW5nZS5kb2NcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFRPRE8gcmVwb3J0XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgJ1tyZWFsdGltZSBsaXN0ZW5lcl0gaW50ZXJuYWwgbm9uLWZhdGFsIHNlcnZlciBlcnJvcjogdW5leHBlY3RlZCBxdWV1ZVR5cGUgdXBkYXRlIGV2ZW50IHdoZXJlIG5vIGRvYyBpcyBhc3NvY2lhdGVkLidcbiAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgIC8vIHdyaXRlVG9GaWxlKFxuICAgICAgICAgICAgICAvLyAgIFwid3NlcnJvci50eHRcIixcbiAgICAgICAgICAgICAgLy8gICBgW3JlYWx0aW1lIGxpc3RlbmVyXSBpbnRlcm5hbCBub24tZmF0YWwgc2VydmVyIGVycm9yOiB1bmV4cGVjdGVkIHF1ZXVlVHlwZSB1cGRhdGUgZXZlbnQgd2hlcmUgbm8gZG9jIGlzIGFzc29jaWF0ZWQuICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgICAvLyAgICAgICB7fSxcbiAgICAgICAgICAgICAgLy8gICAgICAge1xuICAgICAgICAgICAgICAvLyAgICAgICAgIHJlcXVlc3RJZDogbXNnLnJlcXVlc3RJZCxcbiAgICAgICAgICAgICAgLy8gICAgICAgICB3YXRjaElkOiBtc2cud2F0Y2hJZFxuICAgICAgICAgICAgICAvLyAgICAgICB9XG4gICAgICAgICAgICAgIC8vICAgICApXG4gICAgICAgICAgICAgIC8vICAgKX0gXFxuYFxuICAgICAgICAgICAgICAvLyApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBpID09PSBsZW4gLSAxIHx8XG4gICAgICAgICAgKGFsbENoYW5nZUV2ZW50c1tpICsgMV0gJiYgYWxsQ2hhbmdlRXZlbnRzW2kgKyAxXS5pZCAhPT0gY2hhbmdlLmlkKVxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBhIHNoYWxsb3cgc2xpY2UgY3JlYXRlcyBhIHNoYWxsb3cgc25hcHNob3RcbiAgICAgICAgICBjb25zdCBkb2NzU25hcHNob3QgPSBbLi4uZG9jc11cblxuICAgICAgICAgIC8vIHdlIHNsaWNlIGZpcnN0IGNhdXNlJyBpZiB0aGVyZSdyZSBhbGxDaGFuZ2VFdmVudHMgdGhhdCBhcmUgb2YgdGhlIHNhbWUgaWQgYWZ0ZXIgdGhpcyBjaGFuZ2UsIHdlIGRvbid0IHdhbnQgdG8gaW52b2x2ZSBpdCBmb3IgaXQgaXMgdW5leHBlY3RlZCBpbnZhbGlkIG9yZGVyXG4gICAgICAgICAgY29uc3QgZG9jQ2hhbmdlcyA9IGFsbENoYW5nZUV2ZW50c1xuICAgICAgICAgICAgLnNsaWNlKDAsIGkgKyAxKVxuICAgICAgICAgICAgLmZpbHRlcihjID0+IGMuaWQgPT09IGNoYW5nZS5pZClcblxuICAgICAgICAgIC8vIGFsbCBjaGFuZ2VzIG9mIHRoaXMgZXZlbnQgaGFzIGJlZW4gaGFuZGxlLCB3ZSBjb3VsZCBkaXNwYXRjaCB0aGUgZXZlbnQgbm93XG4gICAgICAgICAgdGhpcy5zZXNzaW9uSW5mby5jdXJyZW50RXZlbnRJZCA9IGNoYW5nZS5pZFxuICAgICAgICAgIHRoaXMuc2Vzc2lvbkluZm8uY3VycmVudERvY3MgPSBkb2NzXG5cbiAgICAgICAgICBjb25zdCBzbmFwc2hvdCA9IG5ldyBTbmFwc2hvdCh7XG4gICAgICAgICAgICBpZDogY2hhbmdlLmlkLFxuICAgICAgICAgICAgZG9jQ2hhbmdlcyxcbiAgICAgICAgICAgIGRvY3M6IGRvY3NTbmFwc2hvdCxcbiAgICAgICAgICAgIG1zZ1R5cGVcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgLy8gUmVwb3J0ZXIuc3Vycm91bmRUaGlyZEJ5VHJ5Q2F0Y2goKCkgPT5cbiAgICAgICAgICB0aGlzLmxpc3RlbmVyLm9uQ2hhbmdlKHNuYXBzaG90KVxuICAgICAgICAgIC8vICkoKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBvdXQtb2Ytb3JkZXIgZXZlbnRcbiAgICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAgIC8vIFRPRE86IHJlcG9ydFxuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFtyZWFsdGltZSBsaXN0ZW5lcl0gZXZlbnQgcmVjZWl2ZWQgaXMgb3V0IG9mIG9yZGVyLCBjdXIgJHt0aGlzLnNlc3Npb25JbmZvLmN1cnJlbnRFdmVudElkfSBidXQgZ290ICR7Y2hhbmdlLmlkfWBcbiAgICAgICAgKVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHJlYnVpbGQgd2F0Y2hcbiAgICAgICAgYXdhaXQgdGhpcy5yZWJ1aWxkV2F0Y2goKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9wb3N0SGFuZGxlU2VydmVyRXZlbnRzVmFsaWRpdHlDaGVjayhcbiAgICBtc2c6IElSZXNwb25zZU1lc3NhZ2VJbml0RXZlbnRNc2cgfCBJUmVzcG9uc2VNZXNzYWdlTmV4dEV2ZW50TXNnXG4gICkge1xuICAgIGlmICghdGhpcy5zZXNzaW9uSW5mbykge1xuICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgJ1tyZWFsdGltZSBsaXN0ZW5lcl0gaW50ZXJuYWwgbm9uLWZhdGFsIGVycm9yOiBzZXNzaW9uSW5mbyBsb3N0IGFmdGVyIHNlcnZlciBldmVudCBoYW5kbGluZywgdGhpcyBzaG91bGQgbmV2ZXIgb2NjdXInXG4gICAgICApXG5cbiAgICAgIC8vIHdyaXRlVG9GaWxlKFxuICAgICAgLy8gICBcIndzZXJyb3IudHh0XCIsXG4gICAgICAvLyAgIGBbcmVhbHRpbWUgbGlzdGVuZXJdIGludGVybmFsIG5vbi1mYXRhbCBlcnJvcjogc2Vzc2lvbkluZm8gbG9zdCBhZnRlciBzZXJ2ZXIgZXZlbnQgaGFuZGxpbmcsIHRoaXMgc2hvdWxkIG5ldmVyIG9jY3VyICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgIC8vICAgICAgIHt9LFxuICAgICAgLy8gICAgICAge1xuICAgICAgLy8gICAgICAgICByZXF1ZXN0SWQ6IG1zZy5yZXF1ZXN0SWQsXG4gICAgICAvLyAgICAgICAgIHdhdGNoSWQ6IG1zZy53YXRjaElkXG4gICAgICAvLyAgICAgICB9XG4gICAgICAvLyAgICAgKVxuICAgICAgLy8gICApfSBcXG5gXG4gICAgICAvLyApXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLnNlc3Npb25JbmZvLmV4cGVjdEV2ZW50SWQgJiZcbiAgICAgIHRoaXMuc2Vzc2lvbkluZm8uY3VycmVudEV2ZW50SWQgPj0gdGhpcy5zZXNzaW9uSW5mby5leHBlY3RFdmVudElkXG4gICAgKSB7XG4gICAgICB0aGlzLmNsZWFyV2FpdEV4cGVjdGVkRXZlbnQoKVxuICAgIH1cblxuICAgIGlmICh0aGlzLnNlc3Npb25JbmZvLmN1cnJlbnRFdmVudElkIDwgbXNnLm1zZ0RhdGEuY3VyckV2ZW50KSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdbcmVhbHRpbWUgbGlzdGVuZXJdIGludGVybmFsIG5vbi1mYXRhbCBlcnJvcjogY2xpZW50IGV2ZW50SWQgZG9lcyBub3QgbWF0Y2ggd2l0aCBzZXJ2ZXIgZXZlbnQgaWQgYWZ0ZXIgc2VydmVyIGV2ZW50IGhhbmRsaW5nJ1xuICAgICAgKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhcldhaXRFeHBlY3RlZEV2ZW50KCkge1xuICAgIGlmICh0aGlzLl93YWl0RXhwZWN0ZWRUaW1lb3V0SWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl93YWl0RXhwZWN0ZWRUaW1lb3V0SWQpXG4gICAgICB0aGlzLl93YWl0RXhwZWN0ZWRUaW1lb3V0SWQgPSB1bmRlZmluZWRcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0UHVibGljRXZlbnQoZXZlbnQ6IElEQkV2ZW50KTogSVNpbmdsZURCRXZlbnQge1xuICBjb25zdCBlOiBJU2luZ2xlREJFdmVudCA9IHtcbiAgICBpZDogZXZlbnQuSUQsXG4gICAgZGF0YVR5cGU6IGV2ZW50LkRhdGFUeXBlLFxuICAgIHF1ZXVlVHlwZTogZXZlbnQuUXVldWVUeXBlLFxuICAgIGRvY0lkOiBldmVudC5Eb2NJRCxcbiAgICBkb2M6IGV2ZW50LkRvYyAmJiBldmVudC5Eb2MgIT09ICd7fScgPyBKU09OLnBhcnNlKGV2ZW50LkRvYykgOiB1bmRlZmluZWRcbiAgfVxuXG4gIGlmIChldmVudC5EYXRhVHlwZSA9PT0gJ3VwZGF0ZScpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKGV2ZW50LlVwZGF0ZWRGaWVsZHMpIHtcbiAgICAgIGUudXBkYXRlZEZpZWxkcyA9IEpTT04ucGFyc2UoZXZlbnQuVXBkYXRlZEZpZWxkcylcbiAgICB9XG4gICAgLy8gVE9ETzogd2FpdCBmb3IgdGNiIHRvIGNoYW5nZSByZW1vdmVkRmllbGRzIHRvIFJlbW92ZWRGaWVsZHNcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKGV2ZW50LnJlbW92ZWRGaWVsZHMgfHwgZXZlbnQuUmVtb3ZlZEZpZWxkcykge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgLy8gZS5yZW1vdmVkRmllbGRzID0gZXZlbnQucmVtb3ZlZEZpZWxkc1xuICAgICAgLy8gICA/IEpTT04ucGFyc2UoZXZlbnQucmVtb3ZlZEZpZWxkcylcbiAgICAgIC8vICAgOiBKU09OLnBhcnNlKGV2ZW50LlJlbW92ZWRGaWVsZHMpXG4gICAgICBlLnJlbW92ZWRGaWVsZHMgPSBKU09OLnBhcnNlKGV2ZW50LnJlbW92ZWRGaWVsZHMpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVcbn1cbiJdfQ==