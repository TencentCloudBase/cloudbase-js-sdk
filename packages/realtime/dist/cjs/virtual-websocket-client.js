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
var listener_1 = require("./listener");
var snapshot_1 = require("./snapshot");
var error_1 = require("./error");
var utils_1 = require("./utils");
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
                                case 2: return [4, utils_1.sleep(DEFAULT_WAIT_TIME_ON_UNKNOWN_ERROR)];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC13ZWJzb2NrZXQtY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZpcnR1YWwtd2Vic29ja2V0LWNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQTRCO0FBQzVCLDhEQUFnQztBQUNoQyxzRUFBd0M7QUFDeEMscUNBQXdDO0FBaUJ4Qyx1Q0FBNkM7QUFDN0MsdUNBQXFDO0FBRXJDLGlDQVNnQjtBQUNoQixpQ0FBK0I7QUE0Qy9CLElBQUssWUFVSjtBQVZELFdBQUssWUFBWTtJQUNmLHVDQUF1QixDQUFBO0lBQ3ZCLG1DQUFtQixDQUFBO0lBQ25CLHlDQUF5QixDQUFBO0lBQ3pCLGlDQUFpQixDQUFBO0lBQ2pCLG1DQUFtQixDQUFBO0lBQ25CLG1DQUFtQixDQUFBO0lBQ25CLGlDQUFpQixDQUFBO0lBQ2pCLGlDQUFpQixDQUFBO0lBQ2pCLHFDQUFxQixDQUFBO0FBQ3ZCLENBQUMsRUFWSSxZQUFZLEtBQVosWUFBWSxRQVVoQjtBQUVELElBQU0sa0NBQWtDLEdBQUcsR0FBRyxDQUFBO0FBQzlDLElBQU0sK0JBQStCLEdBQUcsQ0FBQyxDQUFBO0FBQ3pDLElBQU0sd0NBQXdDLEdBQUcsQ0FBQyxDQUFBO0FBQ2xELElBQU0saUNBQWlDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQTtBQUNuRCxJQUFNLDBCQUEwQixHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUE7QUFDNUMsSUFBTSw2QkFBNkIsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFBO0FBRS9DO0lBcUNFLGdDQUFZLE9BQWtEO1FBQTlELGlCQStCQztRQTNDTyxnQkFBVyxHQUFpQixZQUFZLENBQUMsT0FBTyxDQUFBO1FBME1oRCxXQUFNLEdBQUcsVUFDZixLQUFjLEVBQ2QsT0FBaUI7Ozs7O3dCQUVqQixJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVks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QVEsRUFBRTtRQUUvQixJQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUU7WUFDdkIsQ0FBQyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQTtTQUNsRDtRQUdELElBQUksS0FBSyxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUMsYUFBYSxFQUFFO1lBSzlDLENBQUMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7U0FDbEQ7S0FDRjtJQUVELE9BQU8sQ0FBQyxDQUFBO0FBQ1YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzZXQgZnJvbSAnbG9kYXNoLnNldCdcbmltcG9ydCB1bnNldCBmcm9tICdsb2Rhc2gudW5zZXQnXG5pbXBvcnQgY2xvbmVEZWVwIGZyb20gJ2xvZGFzaC5jbG9uZWRlZXAnXG5pbXBvcnQgeyBnZW5SZXF1ZXN0SWQgfSBmcm9tICcuL21lc3NhZ2UnXG5pbXBvcnQge1xuICBJUmVzcG9uc2VNZXNzYWdlLFxuICBJUmVxdWVzdE1lc3NhZ2VJbml0V2F0Y2hNc2csXG4gIElSZXNwb25zZU1lc3NhZ2VJbml0RXZlbnRNc2csXG4gIElEQkV2ZW50LFxuICBJUmVxdWVzdE1lc3NhZ2VSZWJ1aWxkV2F0Y2hNc2csXG4gIElSZXF1ZXN0TWVzc2FnZUNsb3NlV2F0Y2hNc2csXG4gIElSZXF1ZXN0TXNnVHlwZSxcbiAgSVJlc3BvbnNlTWVzc2FnZU5leHRFdmVudE1zZyxcbiAgSVJlcXVlc3RNZXNzYWdlQ2hlY2tMYXN0TXNnLFxuICBJV2F0Y2hPcHRpb25zXG59IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVhbHRpbWUnXG5pbXBvcnQgeyBcbiAgSVNpbmdsZURCRXZlbnRcbn0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9kYXRhYmFzZSdcbi8vIGltcG9ydCBSZXBvcnRlciBmcm9tIFwiLi9leHRlcm5hbHMvcHVibGljLWxpYi9yZXBvcnRlclwiXG5pbXBvcnQgeyBSZWFsdGltZUxpc3RlbmVyIH0gZnJvbSAnLi9saXN0ZW5lcidcbmltcG9ydCB7IFNuYXBzaG90IH0gZnJvbSAnLi9zbmFwc2hvdCdcbmltcG9ydCB7IElXU1NlbmRPcHRpb25zLCBJTG9naW5SZXN1bHQgfSBmcm9tICcuL3dlYnNvY2tldC1jbGllbnQnXG5pbXBvcnQgeyBcbiAgRVJSX0NPREUsXG4gIENsb3VkU0RLRXJyb3IsXG4gIGlzVGltZW91dEVycm9yLFxuICBDYW5jZWxsZWRFcnJvcixcbiAgaXNDYW5jZWxsZWRFcnJvcixcbiAgaXNSZWFsdGltZUVycm9yTWVzc2FnZUVycm9yLCBcbiAgUmVhbHRpbWVFcnJvck1lc3NhZ2VFcnJvciwgXG4gIFRpbWVvdXRFcnJvciBcbn0gZnJvbSAnLi9lcnJvcidcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi91dGlscydcblxuLy8gPT09PT09PT09PT09PT09IFJlYWx0aW1lIFZpcnR1YWwgV2ViU29ja2V0IENsaWVudCAoSW50ZXJuYWwpID09PT09PT09PT09PT09PT09PT09XG5cbmludGVyZmFjZSBJVmlydHVhbFdlYlNvY2tldENsaWVudENvbnN0cnVjdG9yT3B0aW9ucyBleHRlbmRzIElXYXRjaE9wdGlvbnMge1xuICAvLyB3czogUmVhbHRpbWVXZWJTb2NrZXRDbGllbnRcbiAgZW52SWQ/OiBzdHJpbmdcbiAgY29sbGVjdGlvbk5hbWU6IHN0cmluZ1xuICBxdWVyeTogc3RyaW5nXG4gIGxpbWl0PzogbnVtYmVyXG4gIG9yZGVyQnk/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+XG4gIHNlbmQ6IDxUID0gYW55PihvcHRzOiBJV1NTZW5kT3B0aW9ucykgPT4gUHJvbWlzZTxUPlxuICBsb2dpbjogKGVudklkPzogc3RyaW5nLCByZWZyZXNoPzogYm9vbGVhbikgPT4gUHJvbWlzZTxhbnk+XG4gIGlzV1NDb25uZWN0ZWQ6ICgpID0+IGJvb2xlYW5cbiAgb25jZVdTQ29ubmVjdGVkOiAoKSA9PiBQcm9taXNlPHZvaWQ+XG4gIGdldFdhaXRFeHBlY3RlZFRpbWVvdXRMZW5ndGg6ICgpID0+IG51bWJlclxuICBvbldhdGNoU3RhcnQ6IChjbGllbnQ6IFZpcnR1YWxXZWJTb2NrZXRDbGllbnQsIHF1ZXJ5SUQ6IHN0cmluZykgPT4gdm9pZFxuICBvbldhdGNoQ2xvc2U6IChjbGllbnQ6IFZpcnR1YWxXZWJTb2NrZXRDbGllbnQsIHF1ZXJ5SUQ6IHN0cmluZykgPT4gdm9pZFxuICBkZWJ1Zz86IGJvb2xlYW5cbn1cblxuaW50ZXJmYWNlIElXYXRjaFNlc3Npb25JbmZvIHtcbiAgcXVlcnlJRDogc3RyaW5nXG4gIGN1cnJlbnRFdmVudElkOiBudW1iZXJcbiAgY3VycmVudERvY3M6IFJlY29yZDxzdHJpbmcsIGFueT5bXVxuICBleHBlY3RFdmVudElkPzogbnVtYmVyXG59XG5cbmludGVyZmFjZSBJSGFuZGxlQ29tbW9uRXJyb3JPcHRpb25zIHtcbiAgb25TaWduRXJyb3I6IChlOiBSZWFsdGltZUVycm9yTWVzc2FnZUVycm9yKSA9PiB2b2lkXG4gIG9uVGltZW91dEVycm9yOiAoZTogVGltZW91dEVycm9yKSA9PiB2b2lkXG4gIG9uQ2FuY2VsbGVkRXJyb3I6IChlOiBDYW5jZWxsZWRFcnJvcikgPT4gdm9pZFxuICBvbk5vdFJldHJ5YWJsZUVycm9yOiAoZTogUmVhbHRpbWVFcnJvck1lc3NhZ2VFcnJvcikgPT4gdm9pZFxuICBvblVua25vd25FcnJvcjogKGU6IGFueSkgPT4gdm9pZFxufVxuXG5pbnRlcmZhY2UgSUhhbmRsZVdhdGNoRXN0YWJsaXNobWVudEVycm9yT3B0aW9ucyB7XG4gIG9wZXJhdGlvbk5hbWU6ICdJTklUX1dBVENIJyB8ICdSRUJVSUxEX1dBVENIJ1xuICByZXNvbHZlOiAodmFsdWU/OiBQcm9taXNlTGlrZTx2b2lkPiB8IHVuZGVmaW5lZCkgPT4gdm9pZFxuICByZWplY3Q6IChlOiBhbnkpID0+IHZvaWRcbiAgLy8gcmV0cnk6IChyZWZyZXNoTG9naW4/OiBib29sZWFuKSA9PiB2b2lkXG4gIC8vIGFib3J0V2F0Y2g6IChlOiBhbnkpID0+IHZvaWRcbn1cblxuZW51bSBXQVRDSF9TVEFUVVMge1xuICBMT0dHSU5HSU4gPSAnTE9HR0lOR0lOJyxcbiAgSU5JVElORyA9ICdJTklUSU5HJyxcbiAgUkVCVUlMRElORyA9ICdSRUJVSUxESU5HJyxcbiAgQUNUSVZFID0gJ0FDVElWRScsXG4gIEVSUk9SRUQgPSAnRVJST1JFRCcsXG4gIENMT1NJTkcgPSAnQ0xPU0lORycsXG4gIENMT1NFRCA9ICdDTE9TRUQnLFxuICBQQVVTRUQgPSAnUEFVU0VEJyxcbiAgUkVTVU1JTkcgPSAnUkVTVU1JTkcnXG59XG5cbmNvbnN0IERFRkFVTFRfV0FJVF9USU1FX09OX1VOS05PV05fRVJST1IgPSAxMDBcbmNvbnN0IERFRkFVTFRfTUFYX0FVVE9fUkVUUllfT05fRVJST1IgPSAyXG5jb25zdCBERUZBVUxUX01BWF9TRU5EX0FDS19BVVRPX1JFVFJZX09OX0VSUk9SID0gMlxuY29uc3QgREVGQVVMVF9TRU5EX0FDS19ERUJPVU5DRV9USU1FT1VUID0gMTAgKiAxMDAwXG5jb25zdCBERUZBVUxUX0lOSVRfV0FUQ0hfVElNRU9VVCA9IDEwICogMTAwMFxuY29uc3QgREVGQVVMVF9SRUJVSUxEX1dBVENIX1RJTUVPVVQgPSAxMCAqIDEwMDBcblxuZXhwb3J0IGNsYXNzIFZpcnR1YWxXZWJTb2NrZXRDbGllbnQge1xuICAvLyBwYXNzZWQgb3ZlclxuICB3YXRjaElkOiBzdHJpbmdcbiAgLy8gb3duXG4gIGxpc3RlbmVyOiBSZWFsdGltZUxpc3RlbmVyXG4gIHByaXZhdGUgZW52SWQ/OiBzdHJpbmdcbiAgcHJpdmF0ZSBjb2xsZWN0aW9uTmFtZTogc3RyaW5nXG4gIHByaXZhdGUgcXVlcnk6IHN0cmluZ1xuICBwcml2YXRlIGxpbWl0OiBudW1iZXJcbiAgcHJpdmF0ZSBvcmRlckJ5OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+XG4gIHByaXZhdGUgc2VuZDogPFQgPSBhbnk+KG9wdHM6IElXU1NlbmRPcHRpb25zKSA9PiBQcm9taXNlPFQ+XG4gIHByaXZhdGUgbG9naW46IChlbnZJZD86IHN0cmluZywgcmVmcmVzaD86IGJvb2xlYW4pID0+IFByb21pc2U8YW55PlxuICBwcml2YXRlIGlzV1NDb25uZWN0ZWQ6ICgpID0+IGJvb2xlYW5cbiAgcHJpdmF0ZSBvbmNlV1NDb25uZWN0ZWQ6ICgpID0+IFByb21pc2U8dm9pZD5cbiAgcHJpdmF0ZSBnZXRXYWl0RXhwZWN0ZWRUaW1lb3V0TGVuZ3RoOiAoKSA9PiBudW1iZXJcbiAgcHJpdmF0ZSBvbldhdGNoU3RhcnQ6IChcbiAgICBjbGllbnQ6IFZpcnR1YWxXZWJTb2NrZXRDbGllbnQsXG4gICAgcXVlcnlJRDogc3RyaW5nXG4gICkgPT4gdm9pZFxuICBwcml2YXRlIG9uV2F0Y2hDbG9zZTogKFxuICAgIGNsaWVudDogVmlydHVhbFdlYlNvY2tldENsaWVudCxcbiAgICBxdWVyeUlEOiBzdHJpbmdcbiAgKSA9PiB2b2lkXG4gIHByaXZhdGUgZGVidWc/OiBib29sZWFuXG5cbiAgcHJpdmF0ZSB3YXRjaFN0YXR1czogV0FUQ0hfU1RBVFVTID0gV0FUQ0hfU1RBVFVTLklOSVRJTkdcbiAgcHJpdmF0ZSBfYXZhaWxhYmxlUmV0cmllczogUGFydGlhbDxSZWNvcmQ8SVJlcXVlc3RNc2dUeXBlLCBudW1iZXI+PlxuICBwcml2YXRlIF9hY2tUaW1lb3V0SWQ/OiBudW1iZXJcbiAgcHJpdmF0ZSBfaW5pdFdhdGNoUHJvbWlzZT86IFByb21pc2U8dm9pZD5cbiAgcHJpdmF0ZSBfcmVidWlsZFdhdGNoUHJvbWlzZT86IFByb21pc2U8dm9pZD5cblxuICAvLyBvYnRhaW5lZFxuICBwcml2YXRlIHNlc3Npb25JbmZvPzogSVdhdGNoU2Vzc2lvbkluZm9cblxuICAvLyBpbnRlcm5hbFxuICBwcml2YXRlIF93YWl0RXhwZWN0ZWRUaW1lb3V0SWQ/OiBudW1iZXJcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJVmlydHVhbFdlYlNvY2tldENsaWVudENvbnN0cnVjdG9yT3B0aW9ucykge1xuICAgIHRoaXMud2F0Y2hJZCA9IGB3YXRjaGlkXyR7K25ldyBEYXRlKCl9XyR7TWF0aC5yYW5kb20oKX1gXG4gICAgdGhpcy5lbnZJZCA9IG9wdGlvbnMuZW52SWRcbiAgICB0aGlzLmNvbGxlY3Rpb25OYW1lID0gb3B0aW9ucy5jb2xsZWN0aW9uTmFtZVxuICAgIHRoaXMucXVlcnkgPSBvcHRpb25zLnF1ZXJ5XG4gICAgdGhpcy5saW1pdCA9IG9wdGlvbnMubGltaXRcbiAgICB0aGlzLm9yZGVyQnkgPSBvcHRpb25zLm9yZGVyQnlcbiAgICB0aGlzLnNlbmQgPSBvcHRpb25zLnNlbmRcbiAgICB0aGlzLmxvZ2luID0gb3B0aW9ucy5sb2dpblxuICAgIHRoaXMuaXNXU0Nvbm5lY3RlZCA9IG9wdGlvbnMuaXNXU0Nvbm5lY3RlZFxuICAgIHRoaXMub25jZVdTQ29ubmVjdGVkID0gb3B0aW9ucy5vbmNlV1NDb25uZWN0ZWRcbiAgICB0aGlzLmdldFdhaXRFeHBlY3RlZFRpbWVvdXRMZW5ndGggPSBvcHRpb25zLmdldFdhaXRFeHBlY3RlZFRpbWVvdXRMZW5ndGhcbiAgICB0aGlzLm9uV2F0Y2hTdGFydCA9IG9wdGlvbnMub25XYXRjaFN0YXJ0XG4gICAgdGhpcy5vbldhdGNoQ2xvc2UgPSBvcHRpb25zLm9uV2F0Y2hDbG9zZVxuICAgIHRoaXMuZGVidWcgPSBvcHRpb25zLmRlYnVnXG5cbiAgICB0aGlzLl9hdmFpbGFibGVSZXRyaWVzID0ge1xuICAgICAgSU5JVF9XQVRDSDogREVGQVVMVF9NQVhfQVVUT19SRVRSWV9PTl9FUlJPUixcbiAgICAgIFJFQlVJTERfV0FUQ0g6IERFRkFVTFRfTUFYX0FVVE9fUkVUUllfT05fRVJST1IsXG4gICAgICBDSEVDS19MQVNUOiBERUZBVUxUX01BWF9TRU5EX0FDS19BVVRPX1JFVFJZX09OX0VSUk9SXG4gICAgfVxuXG4gICAgdGhpcy5saXN0ZW5lciA9IG5ldyBSZWFsdGltZUxpc3RlbmVyKHtcbiAgICAgIGNsb3NlOiB0aGlzLmNsb3NlV2F0Y2gsXG4gICAgICBvbkNoYW5nZTogb3B0aW9ucy5vbkNoYW5nZSxcbiAgICAgIG9uRXJyb3I6IG9wdGlvbnMub25FcnJvcixcbiAgICAgIGRlYnVnOiB0aGlzLmRlYnVnLFxuICAgICAgdmlydHVhbENsaWVudDogdGhpc1xuICAgIH0pXG5cbiAgICB0aGlzLmluaXRXYXRjaCgpXG4gIH1cblxuICBvbk1lc3NhZ2UobXNnOiBJUmVzcG9uc2VNZXNzYWdlKSB7XG4gICAgLy8gd2F0Y2hTdGF0dXMgc2FuaXR5IGNoZWNrXG4gICAgc3dpdGNoICh0aGlzLndhdGNoU3RhdHVzKSB7XG4gICAgICBjYXNlIFdBVENIX1NUQVRVUy5QQVVTRUQ6IHtcbiAgICAgICAgLy8gaWdub3JlIGFsbCBidXQgZXJyb3IgbWVzc2FnZVxuICAgICAgICBpZiAobXNnLm1zZ1R5cGUgIT09ICdFUlJPUicpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSBXQVRDSF9TVEFUVVMuTE9HR0lOR0lOOlxuICAgICAgY2FzZSBXQVRDSF9TVEFUVVMuSU5JVElORzpcbiAgICAgIGNhc2UgV0FUQ0hfU1RBVFVTLlJFQlVJTERJTkc6IHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBbcmVhbHRpbWUgbGlzdGVuZXJdIGludGVybmFsIG5vbi1mYXRhbCBlcnJvcjogdW5leHBlY3RlZCBtZXNzYWdlIHJlY2VpdmVkIHdoaWxlICR7dGhpcy53YXRjaFN0YXR1c31gXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjYXNlIFdBVENIX1NUQVRVUy5DTE9TRUQ6IHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdbcmVhbHRpbWUgbGlzdGVuZXJdIGludGVybmFsIG5vbi1mYXRhbCBlcnJvcjogdW5leHBlY3RlZCBtZXNzYWdlIHJlY2VpdmVkIHdoZW4gdGhlIHdhdGNoIGhhcyBjbG9zZWQnXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjYXNlIFdBVENIX1NUQVRVUy5FUlJPUkVEOiB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAnW3JlYWx0aW1lIGxpc3RlbmVyXSBpbnRlcm5hbCBub24tZmF0YWwgZXJyb3I6IHVuZXhwZWN0ZWQgbWVzc2FnZSByZWNlaXZlZCB3aGVuIHRoZSB3YXRjaCBoYXMgZW5kZWQgd2l0aCBlcnJvcidcbiAgICAgICAgKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuc2Vzc2lvbkluZm8pIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1tyZWFsdGltZSBsaXN0ZW5lcl0gaW50ZXJuYWwgbm9uLWZhdGFsIGVycm9yOiBzZXNzaW9uSW5mbyBub3QgZm91bmQgd2hpbGUgbWVzc2FnZSBpcyByZWNlaXZlZC4nXG4gICAgICApXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLnNjaGVkdWxlU2VuZEFDSygpXG5cbiAgICBzd2l0Y2ggKG1zZy5tc2dUeXBlKSB7XG4gICAgICBjYXNlICdORVhUX0VWRU5UJzoge1xuICAgICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAvLyBpZiAod3guX2lnbm9yZSkge1xuICAgICAgICBjb25zb2xlLndhcm4oYG5leHRldmVudCAke21zZy5tc2dEYXRhLmN1cnJFdmVudH0gaWdub3JlZGAsIG1zZylcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAvLyB3eC5faWdub3JlID0gZmFsc2VcbiAgICAgICAgLy8gcmV0dXJuXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHRoaXMuaGFuZGxlU2VydmVyRXZlbnRzKG1zZylcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ0NIRUNLX0VWRU5UJzoge1xuICAgICAgICBpZiAodGhpcy5zZXNzaW9uSW5mby5jdXJyZW50RXZlbnRJZCA8IG1zZy5tc2dEYXRhLmN1cnJFdmVudCkge1xuICAgICAgICAgIC8vIGNsaWVudCBldmVudElEIDwgc2VydmVyIGV2ZW50SUQ6XG4gICAgICAgICAgLy8gdGhlcmUgbWlnaHQgYmUgb25lIG9yIG1vcmUgcGVuZGluZyBldmVudHMgbm90IHlldCByZWNlaXZlZCBidXQgc2VudCBieSB0aGUgc2VydmVyXG4gICAgICAgICAgdGhpcy5zZXNzaW9uSW5mby5leHBlY3RFdmVudElkID0gbXNnLm1zZ0RhdGEuY3VyckV2ZW50XG4gICAgICAgICAgdGhpcy5jbGVhcldhaXRFeHBlY3RlZEV2ZW50KClcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgdGhpcy5fd2FpdEV4cGVjdGVkVGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBtdXN0IHJlYnVpbGQgd2F0Y2hcbiAgICAgICAgICAgIHRoaXMucmVidWlsZFdhdGNoKClcbiAgICAgICAgICB9LCB0aGlzLmdldFdhaXRFeHBlY3RlZFRpbWVvdXRMZW5ndGgoKSlcblxuICAgICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYFtyZWFsdGltZV0gd2FpdEV4cGVjdGVkVGltZW91dExlbmd0aCAke3RoaXMuZ2V0V2FpdEV4cGVjdGVkVGltZW91dExlbmd0aCgpfWBcbiAgICAgICAgICApXG4gICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlICdFUlJPUic6IHtcbiAgICAgICAgLy8gcmVjZWl2ZSBzZXJ2ZXIgZXJyb3JcbiAgICAgICAgdGhpcy5jbG9zZVdpdGhFcnJvcihcbiAgICAgICAgICBuZXcgQ2xvdWRTREtFcnJvcih7XG4gICAgICAgICAgICBlcnJDb2RlOiBFUlJfQ09ERS5TREtfREFUQUJBU0VfUkVBTFRJTUVfTElTVEVORVJfU0VSVkVSX0VSUk9SX01TRyBhcyBzdHJpbmcsXG4gICAgICAgICAgICBlcnJNc2c6IGAke21zZy5tc2dEYXRhLmNvZGV9IC0gJHttc2cubXNnRGF0YS5tZXNzYWdlfWBcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFtyZWFsdGltZSBsaXN0ZW5lcl0gdmlydHVhbCBjbGllbnQgcmVjZWl2ZSB1bmV4cGVjdGVkIG1zZyAke21zZy5tc2dUeXBlfTogYCxcbiAgICAgICAgICBtc2dcbiAgICAgICAgKVxuICAgICAgICAvLyB9XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xvc2VXaXRoRXJyb3IoZXJyb3I6IGFueSkge1xuICAgIHRoaXMud2F0Y2hTdGF0dXMgPSBXQVRDSF9TVEFUVVMuRVJST1JFRFxuICAgIHRoaXMuY2xlYXJBQ0tTY2hlZHVsZSgpXG4gICAgdGhpcy5saXN0ZW5lci5vbkVycm9yKGVycm9yKVxuICAgIC8vIFJlcG9ydGVyLnN1cnJvdW5kVGhpcmRCeVRyeUNhdGNoKCgpID0+IHRoaXMubGlzdGVuZXIub25FcnJvcihlcnJvcikpXG4gICAgdGhpcy5vbldhdGNoQ2xvc2UoXG4gICAgICB0aGlzLFxuICAgICAgKHRoaXMuc2Vzc2lvbkluZm8gJiYgdGhpcy5zZXNzaW9uSW5mby5xdWVyeUlEKSB8fCAnJ1xuICAgIClcblxuICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFtyZWFsdGltZV0gY2xpZW50IGNsb3NlZCAoJHt0aGlzLmNvbGxlY3Rpb25OYW1lfSAke3RoaXMucXVlcnl9KSAod2F0Y2hJZCAke3RoaXMud2F0Y2hJZH0pYFxuICAgIClcbiAgICAvLyB9XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICB0aGlzLndhdGNoU3RhdHVzID0gV0FUQ0hfU1RBVFVTLlBBVVNFRFxuICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFtyZWFsdGltZV0gY2xpZW50IHBhdXNlZCAoJHt0aGlzLmNvbGxlY3Rpb25OYW1lfSAke3RoaXMucXVlcnl9KSAod2F0Y2hJZCAke3RoaXMud2F0Y2hJZH0pYFxuICAgIClcbiAgICAvLyB9XG4gIH1cblxuICAvLyByZXN1bWUoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuc2Vzc2lvbkluZm8gPyB0aGlzLnJlYnVpbGRXYXRjaCgpIDogdGhpcy5pbml0V2F0Y2goKVxuICAvLyB9XG5cbiAgYXN5bmMgcmVzdW1lKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMud2F0Y2hTdGF0dXMgPSBXQVRDSF9TVEFUVVMuUkVTVU1JTkdcblxuICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFtyZWFsdGltZV0gY2xpZW50IHJlc3VtaW5nIHdpdGggJHtcbiAgICAgICAgdGhpcy5zZXNzaW9uSW5mbyA/ICdSRUJVSUxEX1dBVENIJyA6ICdJTklUX1dBVENIJ1xuICAgICAgfSAoJHt0aGlzLmNvbGxlY3Rpb25OYW1lfSAke3RoaXMucXVlcnl9KSAoJHt0aGlzLndhdGNoSWR9KWBcbiAgICApXG4gICAgLy8gfVxuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0ICh0aGlzLnNlc3Npb25JbmZvID8gdGhpcy5yZWJ1aWxkV2F0Y2goKSA6IHRoaXMuaW5pdFdhdGNoKCkpXG5cbiAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBbcmVhbHRpbWVdIGNsaWVudCBzdWNjZXNzZnVsbHkgcmVzdW1lZCAoJHt0aGlzLmNvbGxlY3Rpb25OYW1lfSAke3RoaXMucXVlcnl9KSAoJHt0aGlzLndhdGNoSWR9KWBcbiAgICAgIClcbiAgICAgIC8vIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgIGBbcmVhbHRpbWVdIGNsaWVudCByZXN1bWUgZmFpbGVkICgke3RoaXMuY29sbGVjdGlvbk5hbWV9ICR7dGhpcy5xdWVyeX0pICgke3RoaXMud2F0Y2hJZH0pYCxcbiAgICAgICAgZVxuICAgICAgKVxuICAgICAgLy8gfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2xvZ2luID0gYXN5bmMgKFxuICAgIGVudklkPzogc3RyaW5nLFxuICAgIHJlZnJlc2g/OiBib29sZWFuXG4gICk6IFByb21pc2U8SUxvZ2luUmVzdWx0PiA9PiB7XG4gICAgdGhpcy53YXRjaFN0YXR1cyA9IFdBVENIX1NUQVRVUy5MT0dHSU5HSU5cbiAgICBjb25zdCBsb2dpblJlc3VsdCA9IGF3YWl0IHRoaXMubG9naW4oZW52SWQsIHJlZnJlc2gpXG4gICAgaWYgKCF0aGlzLmVudklkKSB7XG4gICAgICB0aGlzLmVudklkID0gbG9naW5SZXN1bHQuZW52SWRcbiAgICB9XG4gICAgcmV0dXJuIGxvZ2luUmVzdWx0XG4gIH1cblxuICBwcml2YXRlIGluaXRXYXRjaCA9IGFzeW5jIChmb3JjZVJlZnJlc2hMb2dpbj86IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAodGhpcy5faW5pdFdhdGNoUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2luaXRXYXRjaFByb21pc2VcbiAgICB9XG5cbiAgICB0aGlzLl9pbml0V2F0Y2hQcm9taXNlID0gbmV3IFByb21pc2U8dm9pZD4oXG4gICAgICBhc3luYyAocmVzb2x2ZSwgcmVqZWN0KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHRoaXMud2F0Y2hTdGF0dXMgPT09IFdBVENIX1NUQVRVUy5QQVVTRUQpIHtcbiAgICAgICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tyZWFsdGltZV0gaW5pdFdhdGNoIGNhbmNlbGxlZCBvbiBwYXVzZScpXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgeyBlbnZJZCB9ID0gYXdhaXQgdGhpcy5fbG9naW4odGhpcy5lbnZJZCwgZm9yY2VSZWZyZXNoTG9naW4pXG5cbiAgICAgICAgICAvLyBpZiAoIXRoaXMuc2Vzc2lvbkluZm8pIHtcbiAgICAgICAgICAvLyAgIHRocm93IG5ldyBFcnJvcihgY2FuIG5vdCByZWJ1aWxkV2F0Y2ggd2l0aG91dCBhIHN1Y2Nlc3NmdWwgaW5pdFdhdGNoIChsYWNrIG9mIHNlc3Npb25JbmZvKWApXG4gICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgaWYgKCh0aGlzLndhdGNoU3RhdHVzIGFzIFdBVENIX1NUQVRVUykgPT09IFdBVENIX1NUQVRVUy5QQVVTRUQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbcmVhbHRpbWVdIGluaXRXYXRjaCBjYW5jZWxsZWQgb24gcGF1c2UnKVxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMud2F0Y2hTdGF0dXMgPSBXQVRDSF9TVEFUVVMuSU5JVElOR1xuXG4gICAgICAgICAgY29uc3QgaW5pdFdhdGNoTXNnOiBJUmVxdWVzdE1lc3NhZ2VJbml0V2F0Y2hNc2cgPSB7XG4gICAgICAgICAgICB3YXRjaElkOiB0aGlzLndhdGNoSWQsXG4gICAgICAgICAgICByZXF1ZXN0SWQ6IGdlblJlcXVlc3RJZCgpLFxuICAgICAgICAgICAgbXNnVHlwZTogJ0lOSVRfV0FUQ0gnLFxuICAgICAgICAgICAgbXNnRGF0YToge1xuICAgICAgICAgICAgICBlbnZJZCxcbiAgICAgICAgICAgICAgY29sbE5hbWU6IHRoaXMuY29sbGVjdGlvbk5hbWUsXG4gICAgICAgICAgICAgIHF1ZXJ5OiB0aGlzLnF1ZXJ5LFxuICAgICAgICAgICAgICBsaW1pdDogdGhpcy5saW1pdCxcbiAgICAgICAgICAgICAgb3JkZXJCeTogdGhpcy5vcmRlckJ5XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgaW5pdEV2ZW50TXNnID0gYXdhaXQgdGhpcy5zZW5kPElSZXNwb25zZU1lc3NhZ2VJbml0RXZlbnRNc2c+KHtcbiAgICAgICAgICAgIG1zZzogaW5pdFdhdGNoTXNnLFxuICAgICAgICAgICAgd2FpdFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICAgICAgc2tpcE9uTWVzc2FnZTogdHJ1ZSxcbiAgICAgICAgICAgIHRpbWVvdXQ6IERFRkFVTFRfSU5JVF9XQVRDSF9USU1FT1VUXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGNvbnN0IHsgZXZlbnRzLCBjdXJyRXZlbnQgfSA9IGluaXRFdmVudE1zZy5tc2dEYXRhXG5cbiAgICAgICAgICB0aGlzLnNlc3Npb25JbmZvID0ge1xuICAgICAgICAgICAgcXVlcnlJRDogaW5pdEV2ZW50TXNnLm1zZ0RhdGEucXVlcnlJRCxcbiAgICAgICAgICAgIGN1cnJlbnRFdmVudElkOiBjdXJyRXZlbnQgLSAxLFxuICAgICAgICAgICAgY3VycmVudERvY3M6IFtdXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRklYOiBpbiBpbml0RXZlbnQgbWVzc2FnZSwgYWxsIGV2ZW50cyBoYXZlIGlkIDAsIHdoaWNoIGlzIGluY29uc2lzdGVudCB3aXRoIGN1cnJFdmVudFxuICAgICAgICAgIGlmIChldmVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBlIG9mIGV2ZW50cykge1xuICAgICAgICAgICAgICBlLklEID0gY3VyckV2ZW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVNlcnZlckV2ZW50cyhpbml0RXZlbnRNc2cpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbkluZm8uY3VycmVudEV2ZW50SWQgPSBjdXJyRXZlbnRcbiAgICAgICAgICAgIGNvbnN0IHNuYXBzaG90ID0gbmV3IFNuYXBzaG90KHtcbiAgICAgICAgICAgICAgaWQ6IGN1cnJFdmVudCxcbiAgICAgICAgICAgICAgZG9jQ2hhbmdlczogW10sXG4gICAgICAgICAgICAgIGRvY3M6IFtdLFxuICAgICAgICAgICAgICB0eXBlOiAnaW5pdCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyLm9uQ2hhbmdlKHNuYXBzaG90KVxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZVNlbmRBQ0soKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm9uV2F0Y2hTdGFydCh0aGlzLCB0aGlzLnNlc3Npb25JbmZvLnF1ZXJ5SUQpXG4gICAgICAgICAgdGhpcy53YXRjaFN0YXR1cyA9IFdBVENIX1NUQVRVUy5BQ1RJVkVcbiAgICAgICAgICB0aGlzLl9hdmFpbGFibGVSZXRyaWVzLklOSVRfV0FUQ0ggPSBERUZBVUxUX01BWF9BVVRPX1JFVFJZX09OX0VSUk9SXG4gICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aGlzLmhhbmRsZVdhdGNoRXN0YWJsaXNobWVudEVycm9yKGUsIHtcbiAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6ICdJTklUX1dBVENIJyxcbiAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICByZWplY3RcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgKVxuXG4gICAgbGV0IHN1Y2Nlc3MgPSBmYWxzZVxuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuX2luaXRXYXRjaFByb21pc2VcbiAgICAgIHN1Y2Nlc3MgPSB0cnVlXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuX2luaXRXYXRjaFByb21pc2UgPSB1bmRlZmluZWRcbiAgICB9XG5cbiAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICBjb25zb2xlLmxvZyhgW3JlYWx0aW1lXSBpbml0V2F0Y2ggJHtzdWNjZXNzID8gJ3N1Y2Nlc3MnIDogJ2ZhaWwnfWApXG4gICAgLy8gfVxuICB9XG5cbiAgcHJpdmF0ZSByZWJ1aWxkV2F0Y2ggPSBhc3luYyAoZm9yY2VSZWZyZXNoTG9naW4/OiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKHRoaXMuX3JlYnVpbGRXYXRjaFByb21pc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZWJ1aWxkV2F0Y2hQcm9taXNlXG4gICAgfVxuXG4gICAgdGhpcy5fcmVidWlsZFdhdGNoUHJvbWlzZSA9IG5ldyBQcm9taXNlPHZvaWQ+KFxuICAgICAgYXN5bmMgKHJlc29sdmUsIHJlamVjdCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICh0aGlzLndhdGNoU3RhdHVzID09PSBXQVRDSF9TVEFUVVMuUEFVU0VEKSB7XG4gICAgICAgICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbcmVhbHRpbWVdIHJlYnVpbGRXYXRjaCBjYW5jZWxsZWQgb24gcGF1c2UnKVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB7IGVudklkIH0gPSBhd2FpdCB0aGlzLl9sb2dpbih0aGlzLmVudklkLCBmb3JjZVJlZnJlc2hMb2dpbilcblxuICAgICAgICAgIGlmICghdGhpcy5zZXNzaW9uSW5mbykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAnY2FuIG5vdCByZWJ1aWxkV2F0Y2ggd2l0aG91dCBhIHN1Y2Nlc3NmdWwgaW5pdFdhdGNoIChsYWNrIG9mIHNlc3Npb25JbmZvKSdcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoKHRoaXMud2F0Y2hTdGF0dXMgYXMgV0FUQ0hfU1RBVFVTKSA9PT0gV0FUQ0hfU1RBVFVTLlBBVVNFRCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tyZWFsdGltZV0gcmVidWlsZFdhdGNoIGNhbmNlbGxlZCBvbiBwYXVzZScpXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy53YXRjaFN0YXR1cyA9IFdBVENIX1NUQVRVUy5SRUJVSUxESU5HXG5cbiAgICAgICAgICBjb25zdCByZWJ1aWxkV2F0Y2hNc2c6IElSZXF1ZXN0TWVzc2FnZVJlYnVpbGRXYXRjaE1zZyA9IHtcbiAgICAgICAgICAgIHdhdGNoSWQ6IHRoaXMud2F0Y2hJZCxcbiAgICAgICAgICAgIHJlcXVlc3RJZDogZ2VuUmVxdWVzdElkKCksXG4gICAgICAgICAgICBtc2dUeXBlOiAnUkVCVUlMRF9XQVRDSCcsXG4gICAgICAgICAgICBtc2dEYXRhOiB7XG4gICAgICAgICAgICAgIGVudklkLFxuICAgICAgICAgICAgICBjb2xsTmFtZTogdGhpcy5jb2xsZWN0aW9uTmFtZSxcbiAgICAgICAgICAgICAgcXVlcnlJRDogdGhpcy5zZXNzaW9uSW5mby5xdWVyeUlELFxuICAgICAgICAgICAgICBldmVudElEOiB0aGlzLnNlc3Npb25JbmZvLmN1cnJlbnRFdmVudElkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgbmV4dEV2ZW50TXNnID0gYXdhaXQgdGhpcy5zZW5kPElSZXNwb25zZU1lc3NhZ2VOZXh0RXZlbnRNc2c+KHtcbiAgICAgICAgICAgIG1zZzogcmVidWlsZFdhdGNoTXNnLFxuICAgICAgICAgICAgd2FpdFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICAgICAgc2tpcE9uTWVzc2FnZTogZmFsc2UsXG4gICAgICAgICAgICB0aW1lb3V0OiBERUZBVUxUX1JFQlVJTERfV0FUQ0hfVElNRU9VVFxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICB0aGlzLmhhbmRsZVNlcnZlckV2ZW50cyhuZXh0RXZlbnRNc2cpXG5cbiAgICAgICAgICB0aGlzLndhdGNoU3RhdHVzID0gV0FUQ0hfU1RBVFVTLkFDVElWRVxuICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVJldHJpZXMuUkVCVUlMRF9XQVRDSCA9IERFRkFVTFRfTUFYX0FVVE9fUkVUUllfT05fRVJST1JcbiAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlV2F0Y2hFc3RhYmxpc2htZW50RXJyb3IoZSwge1xuICAgICAgICAgICAgb3BlcmF0aW9uTmFtZTogJ1JFQlVJTERfV0FUQ0gnLFxuICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApXG5cbiAgICBsZXQgc3VjY2VzcyA9IGZhbHNlXG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5fcmVidWlsZFdhdGNoUHJvbWlzZVxuICAgICAgc3VjY2VzcyA9IHRydWVcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5fcmVidWlsZFdhdGNoUHJvbWlzZSA9IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgIGNvbnNvbGUubG9nKGBbcmVhbHRpbWVdIHJlYnVpbGRXYXRjaCAke3N1Y2Nlc3MgPyAnc3VjY2VzcycgOiAnZmFpbCd9YClcbiAgICAvLyB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVdhdGNoRXN0YWJsaXNobWVudEVycm9yID0gYXN5bmMgKFxuICAgIGU6IGFueSxcbiAgICBvcHRpb25zOiBJSGFuZGxlV2F0Y2hFc3RhYmxpc2htZW50RXJyb3JPcHRpb25zXG4gICkgPT4ge1xuICAgIGNvbnN0IGlzSW5pdFdhdGNoID0gb3B0aW9ucy5vcGVyYXRpb25OYW1lID09PSAnSU5JVF9XQVRDSCdcblxuICAgIGNvbnN0IGFib3J0V2F0Y2ggPSAoKSA9PiB7XG4gICAgICAvLyBtb2NrIHRlbXAgY29tbWVudFxuICAgICAgdGhpcy5jbG9zZVdpdGhFcnJvcihcbiAgICAgICAgbmV3IENsb3VkU0RLRXJyb3Ioe1xuICAgICAgICAgIGVyckNvZGU6IGlzSW5pdFdhdGNoXG4gICAgICAgICAgICA/IChFUlJfQ09ERS5TREtfREFUQUJBU0VfUkVBTFRJTUVfTElTVEVORVJfSU5JVF9XQVRDSF9GQUlMIGFzIHN0cmluZylcbiAgICAgICAgICAgIDogKEVSUl9DT0RFLlNES19EQVRBQkFTRV9SRUFMVElNRV9MSVNURU5FUl9SRUJVSUxEX1dBVENIX0ZBSUwgYXMgc3RyaW5nKSxcbiAgICAgICAgICBlcnJNc2c6IGVcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIG9wdGlvbnMucmVqZWN0KGUpXG4gICAgfVxuXG4gICAgY29uc3QgcmV0cnkgPSAocmVmcmVzaExvZ2luPzogYm9vbGVhbikgPT4ge1xuICAgICAgaWYgKHRoaXMudXNlUmV0cnlUaWNrZXQob3B0aW9ucy5vcGVyYXRpb25OYW1lKSkge1xuICAgICAgICBpZiAoaXNJbml0V2F0Y2gpIHtcbiAgICAgICAgICB0aGlzLl9pbml0V2F0Y2hQcm9taXNlID0gdW5kZWZpbmVkXG4gICAgICAgICAgb3B0aW9ucy5yZXNvbHZlKHRoaXMuaW5pdFdhdGNoKHJlZnJlc2hMb2dpbikpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcmVidWlsZFdhdGNoUHJvbWlzZSA9IHVuZGVmaW5lZFxuICAgICAgICAgIG9wdGlvbnMucmVzb2x2ZSh0aGlzLnJlYnVpbGRXYXRjaChyZWZyZXNoTG9naW4pKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhYm9ydFdhdGNoKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZUNvbW1vbkVycm9yKGUsIHtcbiAgICAgIG9uU2lnbkVycm9yOiAoKSA9PiByZXRyeSh0cnVlKSxcbiAgICAgIG9uVGltZW91dEVycm9yOiAoKSA9PiByZXRyeShmYWxzZSksXG4gICAgICBvbk5vdFJldHJ5YWJsZUVycm9yOiBhYm9ydFdhdGNoLFxuICAgICAgb25DYW5jZWxsZWRFcnJvcjogb3B0aW9ucy5yZWplY3QsXG4gICAgICBvblVua25vd25FcnJvcjogYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IG9uV1NEaXNjb25uZWN0ZWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlKClcbiAgICAgICAgICAgIGF3YWl0IHRoaXMub25jZVdTQ29ubmVjdGVkKClcbiAgICAgICAgICAgIHJldHJ5KHRydWUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCF0aGlzLmlzV1NDb25uZWN0ZWQoKSkge1xuICAgICAgICAgICAgYXdhaXQgb25XU0Rpc2Nvbm5lY3RlZCgpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IHNsZWVwKERFRkFVTFRfV0FJVF9USU1FX09OX1VOS05PV05fRVJST1IpXG4gICAgICAgICAgICBpZiAodGhpcy53YXRjaFN0YXR1cyA9PT0gV0FUQ0hfU1RBVFVTLlBBVVNFRCkge1xuICAgICAgICAgICAgICAvLyBjYW5jZWxcbiAgICAgICAgICAgICAgb3B0aW9ucy5yZWplY3QoXG4gICAgICAgICAgICAgICAgbmV3IENhbmNlbGxlZEVycm9yKFxuICAgICAgICAgICAgICAgICAgYCR7b3B0aW9ucy5vcGVyYXRpb25OYW1lfSBjYW5jZWxsZWQgZHVlIHRvIHBhdXNlIGFmdGVyIHVua25vd25FcnJvcmBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNXU0Nvbm5lY3RlZCgpKSB7XG4gICAgICAgICAgICAgIGF3YWl0IG9uV1NEaXNjb25uZWN0ZWQoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0cnkoZmFsc2UpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gdW5leHBlY3RlZCBlcnJvciB3aGlsZSBoYW5kbGluZyBlcnJvciwgaW4gb3JkZXIgdG8gcHJvdmlkZSBtYXhpbXVtIGVmZm9ydCBvbiBTRUFNSU5HTEVTUyBGQVVMVCBUT0xFUkFOQ0UsIGp1c3QgcmV0cnlcbiAgICAgICAgICByZXRyeSh0cnVlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgY2xvc2VXYXRjaCA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBxdWVyeUlkID0gdGhpcy5zZXNzaW9uSW5mbyA/IHRoaXMuc2Vzc2lvbkluZm8ucXVlcnlJRCA6ICcnXG5cbiAgICBpZiAodGhpcy53YXRjaFN0YXR1cyAhPT0gV0FUQ0hfU1RBVFVTLkFDVElWRSkge1xuICAgICAgdGhpcy53YXRjaFN0YXR1cyA9IFdBVENIX1NUQVRVUy5DTE9TRURcbiAgICAgIHRoaXMub25XYXRjaENsb3NlKHRoaXMsIHF1ZXJ5SWQpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgdGhpcy53YXRjaFN0YXR1cyA9IFdBVENIX1NUQVRVUy5DTE9TSU5HXG5cbiAgICAgIGNvbnN0IGNsb3NlV2F0Y2hNc2c6IElSZXF1ZXN0TWVzc2FnZUNsb3NlV2F0Y2hNc2cgPSB7XG4gICAgICAgIHdhdGNoSWQ6IHRoaXMud2F0Y2hJZCxcbiAgICAgICAgcmVxdWVzdElkOiBnZW5SZXF1ZXN0SWQoKSxcbiAgICAgICAgbXNnVHlwZTogJ0NMT1NFX1dBVENIJyxcbiAgICAgICAgbXNnRGF0YTogbnVsbFxuICAgICAgfVxuXG4gICAgICBhd2FpdCB0aGlzLnNlbmQoe1xuICAgICAgICBtc2c6IGNsb3NlV2F0Y2hNc2dcbiAgICAgIH0pXG5cbiAgICAgIHRoaXMuc2Vzc2lvbkluZm8gPSB1bmRlZmluZWRcbiAgICAgIHRoaXMud2F0Y2hTdGF0dXMgPSBXQVRDSF9TVEFUVVMuQ0xPU0VEXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5jbG9zZVdpdGhFcnJvcihcbiAgICAgICAgbmV3IENsb3VkU0RLRXJyb3Ioe1xuICAgICAgICAgIGVyckNvZGU6IEVSUl9DT0RFLlNES19EQVRBQkFTRV9SRUFMVElNRV9MSVNURU5FUl9DTE9TRV9XQVRDSF9GQUlMIGFzIHN0cmluZyxcbiAgICAgICAgICBlcnJNc2c6IGVcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5vbldhdGNoQ2xvc2UodGhpcywgcXVlcnlJZClcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNjaGVkdWxlU2VuZEFDSyA9ICgpID0+IHtcbiAgICB0aGlzLmNsZWFyQUNLU2NoZWR1bGUoKVxuXG4gICAgLy8gVE9ETzogc2hvdWxkIHdlIGNoZWNrIHN0YXR1cyBhZnRlciB0aW1lb3V0XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMuX2Fja1RpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3dhaXRFeHBlY3RlZFRpbWVvdXRJZCkge1xuICAgICAgICB0aGlzLnNjaGVkdWxlU2VuZEFDSygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbmRBQ0soKVxuICAgICAgfVxuICAgIH0sIERFRkFVTFRfU0VORF9BQ0tfREVCT1VOQ0VfVElNRU9VVClcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJBQ0tTY2hlZHVsZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5fYWNrVGltZW91dElkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fYWNrVGltZW91dElkKVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VuZEFDSyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMud2F0Y2hTdGF0dXMgIT09IFdBVENIX1NUQVRVUy5BQ1RJVkUpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZVNlbmRBQ0soKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLnNlc3Npb25JbmZvKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAnW3JlYWx0aW1lIGxpc3RlbmVyXSBjYW4gbm90IHNlbmQgYWNrIHdpdGhvdXQgYSBzdWNjZXNzZnVsIGluaXRXYXRjaCAobGFjayBvZiBzZXNzaW9uSW5mbyknXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFja01zZzogSVJlcXVlc3RNZXNzYWdlQ2hlY2tMYXN0TXNnID0ge1xuICAgICAgICB3YXRjaElkOiB0aGlzLndhdGNoSWQsXG4gICAgICAgIHJlcXVlc3RJZDogZ2VuUmVxdWVzdElkKCksXG4gICAgICAgIG1zZ1R5cGU6ICdDSEVDS19MQVNUJyxcbiAgICAgICAgbXNnRGF0YToge1xuICAgICAgICAgIHF1ZXJ5SUQ6IHRoaXMuc2Vzc2lvbkluZm8ucXVlcnlJRCxcbiAgICAgICAgICBldmVudElEOiB0aGlzLnNlc3Npb25JbmZvLmN1cnJlbnRFdmVudElkXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYXdhaXQgdGhpcy5zZW5kKHtcbiAgICAgICAgbXNnOiBhY2tNc2dcbiAgICAgIH0pXG5cbiAgICAgIHRoaXMuc2NoZWR1bGVTZW5kQUNLKClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBUT0RPOiByZWZhY3RvclxuICAgICAgaWYgKGlzUmVhbHRpbWVFcnJvck1lc3NhZ2VFcnJvcihlKSkge1xuICAgICAgICBjb25zdCBtc2cgPSBlLnBheWxvYWRcbiAgICAgICAgc3dpdGNoIChtc2cubXNnRGF0YS5jb2RlKSB7XG4gICAgICAgICAgLy8gc2lnbmF0dXJlIGVycm9yIC0+IHJldHJ5IHdpdGggcmVmcmVzaGVkIHNpZ25hdHVyZVxuICAgICAgICAgIGNhc2UgJ0NIRUNLX0xPR0lOX0ZBSUxFRCc6XG4gICAgICAgICAgY2FzZSAnU0lHTl9FWFBJUkVEX0VSUk9SJzpcbiAgICAgICAgICBjYXNlICdTSUdOX0lOVkFMSURfRVJST1InOlxuICAgICAgICAgIGNhc2UgJ1NJR05fUEFSQU1fSU5WQUxJRCc6IHtcbiAgICAgICAgICAgIHRoaXMucmVidWlsZFdhdGNoKClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBvdGhlciAtPiB0aHJvd1xuICAgICAgICAgIGNhc2UgJ1FVRVJZSURfSU5WQUxJRF9FUlJPUic6XG4gICAgICAgICAgY2FzZSAnU1lTX0VSUic6XG4gICAgICAgICAgY2FzZSAnSU5WQUxJSURfRU5WJzpcbiAgICAgICAgICBjYXNlICdDT0xMRUNUSU9OX1BFUk1JU1NJT05fREVOSUVEJzoge1xuICAgICAgICAgICAgLy8gbXVzdCB0aHJvd1xuICAgICAgICAgICAgdGhpcy5jbG9zZVdpdGhFcnJvcihcbiAgICAgICAgICAgICAgbmV3IENsb3VkU0RLRXJyb3Ioe1xuICAgICAgICAgICAgICAgIGVyckNvZGU6IEVSUl9DT0RFLlNES19EQVRBQkFTRV9SRUFMVElNRV9MSVNURU5FUl9DSEVDS19MQVNUX0ZBSUwgYXMgc3RyaW5nLFxuICAgICAgICAgICAgICAgIGVyck1zZzogbXNnLm1zZ0RhdGEuY29kZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIG1heWJlIHJldHJ5YWJsZVxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLl9hdmFpbGFibGVSZXRyaWVzLkNIRUNLX0xBU1QgJiZcbiAgICAgICAgdGhpcy5fYXZhaWxhYmxlUmV0cmllcy5DSEVDS19MQVNUID4gMFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX2F2YWlsYWJsZVJldHJpZXMuQ0hFQ0tfTEFTVC0tXG4gICAgICAgIHRoaXMuc2NoZWR1bGVTZW5kQUNLKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2xvc2VXaXRoRXJyb3IoXG4gICAgICAgICAgbmV3IENsb3VkU0RLRXJyb3Ioe1xuICAgICAgICAgICAgZXJyQ29kZTogRVJSX0NPREUuU0RLX0RBVEFCQVNFX1JFQUxUSU1FX0xJU1RFTkVSX0NIRUNLX0xBU1RfRkFJTCBhcyBzdHJpbmcsXG4gICAgICAgICAgICBlcnJNc2c6IGVcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVDb21tb25FcnJvciA9IChcbiAgICBlOiBhbnksXG4gICAgb3B0aW9uczogSUhhbmRsZUNvbW1vbkVycm9yT3B0aW9uc1xuICApOiB2b2lkID0+IHtcbiAgICBpZiAoaXNSZWFsdGltZUVycm9yTWVzc2FnZUVycm9yKGUpKSB7XG4gICAgICBjb25zdCBtc2cgPSBlLnBheWxvYWRcbiAgICAgIHN3aXRjaCAobXNnLm1zZ0RhdGEuY29kZSkge1xuICAgICAgICAvLyBzaWduYXR1cmUgZXJyb3IgLT4gcmV0cnkgd2l0aCByZWZyZXNoZWQgc2lnbmF0dXJlXG4gICAgICAgIGNhc2UgJ0NIRUNLX0xPR0lOX0ZBSUxFRCc6XG4gICAgICAgIGNhc2UgJ1NJR05fRVhQSVJFRF9FUlJPUic6XG4gICAgICAgIGNhc2UgJ1NJR05fSU5WQUxJRF9FUlJPUic6XG4gICAgICAgIGNhc2UgJ1NJR05fUEFSQU1fSU5WQUxJRCc6IHtcbiAgICAgICAgICBvcHRpb25zLm9uU2lnbkVycm9yKGUpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgLy8gbm90LXJldHJ5YWJsZSBlcnJvciAtPiB0aHJvd1xuICAgICAgICBjYXNlICdRVUVSWUlEX0lOVkFMSURfRVJST1InOlxuICAgICAgICBjYXNlICdTWVNfRVJSJzpcbiAgICAgICAgY2FzZSAnSU5WQUxJSURfRU5WJzpcbiAgICAgICAgY2FzZSAnQ09MTEVDVElPTl9QRVJNSVNTSU9OX0RFTklFRCc6IHtcbiAgICAgICAgICBvcHRpb25zLm9uTm90UmV0cnlhYmxlRXJyb3IoZSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgb3B0aW9ucy5vbk5vdFJldHJ5YWJsZUVycm9yKGUpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzVGltZW91dEVycm9yKGUpKSB7XG4gICAgICAvLyB0aW1lb3V0IGVycm9yXG4gICAgICBvcHRpb25zLm9uVGltZW91dEVycm9yKGUpXG4gICAgICByZXR1cm5cbiAgICB9IGVsc2UgaWYgKGlzQ2FuY2VsbGVkRXJyb3IoZSkpIHtcbiAgICAgIC8vIGNhbmNlbGxlZCBlcnJvclxuICAgICAgb3B0aW9ucy5vbkNhbmNlbGxlZEVycm9yKGUpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyB1bmtub3duIGVycm9yXG4gICAgb3B0aW9ucy5vblVua25vd25FcnJvcihlKVxuICB9XG5cbiAgLy8gY3JlZGl0IGEgcmV0cnkgY2hhbmNlIGZyb20gYXZhaWxhYmxlUmV0cmllc1xuICBwcml2YXRlIHVzZVJldHJ5VGlja2V0KG9wZXJhdGlvbk5hbWU6IElSZXF1ZXN0TXNnVHlwZSk6IGJvb2xlYW4ge1xuICAgIGlmIChcbiAgICAgIHRoaXMuX2F2YWlsYWJsZVJldHJpZXNbb3BlcmF0aW9uTmFtZV0gJiZcbiAgICAgIHRoaXMuX2F2YWlsYWJsZVJldHJpZXNbb3BlcmF0aW9uTmFtZV0hID4gMFxuICAgICkge1xuICAgICAgdGhpcy5fYXZhaWxhYmxlUmV0cmllc1tvcGVyYXRpb25OYW1lXSEtLVxuXG4gICAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgW3JlYWx0aW1lXSAke29wZXJhdGlvbk5hbWV9IHVzZSBhIHJldHJ5IHRpY2tldCwgbm93IG9ubHkgJHt0aGlzLl9hdmFpbGFibGVSZXRyaWVzW29wZXJhdGlvbk5hbWVdfSByZXRyeSBsZWZ0YFxuICAgICAgKVxuICAgICAgLy8gfVxuXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlU2VydmVyRXZlbnRzKFxuICAgIG1zZzogSVJlc3BvbnNlTWVzc2FnZUluaXRFdmVudE1zZyB8IElSZXNwb25zZU1lc3NhZ2VOZXh0RXZlbnRNc2dcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuc2NoZWR1bGVTZW5kQUNLKClcbiAgICAgIGF3YWl0IHRoaXMuX2hhbmRsZVNlcnZlckV2ZW50cyhtc2cpXG4gICAgICB0aGlzLl9wb3N0SGFuZGxlU2VydmVyRXZlbnRzVmFsaWRpdHlDaGVjayhtc2cpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgICAvLyBUT0RPOiByZXBvcnRcbiAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICdbcmVhbHRpbWUgbGlzdGVuZXJdIGludGVybmFsIG5vbi1mYXRhbCBlcnJvcjogaGFuZGxlIHNlcnZlciBldmVudHMgZmFpbGVkIHdpdGggZXJyb3I6ICcsXG4gICAgICAgIGVcbiAgICAgIClcblxuICAgICAgLy8gd3JpdGVUb0ZpbGUoXG4gICAgICAvLyAgIFwid3NlcnJvci50eHRcIixcbiAgICAgIC8vICAgYFtyZWFsdGltZSBsaXN0ZW5lcl0gaW50ZXJuYWwgbm9uLWZhdGFsIGVycm9yOiBoYW5kbGUgc2VydmVyIGV2ZW50cyBmYWlsZWQgd2l0aCBlcnJvcjogICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbih7fSwgZSwge1xuICAgICAgLy8gICAgICAgcmVxdWVzdElkOiBtc2cucmVxdWVzdElkLFxuICAgICAgLy8gICAgICAgd2F0Y2hJZDogbXNnLndhdGNoSWRcbiAgICAgIC8vICAgICB9KVxuICAgICAgLy8gICApfSBcXG5gXG4gICAgICAvLyApXG4gICAgICAvLyB9XG5cbiAgICAgIHRocm93IGVcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9oYW5kbGVTZXJ2ZXJFdmVudHMoXG4gICAgbXNnOiBJUmVzcG9uc2VNZXNzYWdlSW5pdEV2ZW50TXNnIHwgSVJlc3BvbnNlTWVzc2FnZU5leHRFdmVudE1zZ1xuICApIHtcbiAgICBjb25zdCB7IHJlcXVlc3RJZCB9ID0gbXNnXG5cbiAgICBjb25zdCB7IGV2ZW50cyB9ID0gbXNnLm1zZ0RhdGFcbiAgICBjb25zdCB7IG1zZ1R5cGUgfSA9IG1zZ1xuXG4gICAgaWYgKCFldmVudHMubGVuZ3RoIHx8ICF0aGlzLnNlc3Npb25JbmZvKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBzZXNzaW9uSW5mbyA9IHRoaXMuc2Vzc2lvbkluZm9cblxuICAgIGxldCBhbGxDaGFuZ2VFdmVudHM6IElTaW5nbGVEQkV2ZW50W11cbiAgICB0cnkge1xuICAgICAgYWxsQ2hhbmdlRXZlbnRzID0gZXZlbnRzLm1hcChnZXRQdWJsaWNFdmVudClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmNsb3NlV2l0aEVycm9yKFxuICAgICAgICBuZXcgQ2xvdWRTREtFcnJvcih7XG4gICAgICAgICAgZXJyQ29kZTogRVJSX0NPREUuU0RLX0RBVEFCQVNFX1JFQUxUSU1FX0xJU1RFTkVSX1JFQ0VJVkVfSU5WQUxJRF9TRVJWRVJfREFUQSBhcyBzdHJpbmcsXG4gICAgICAgICAgZXJyTXNnOiBlXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBhZ2dyZWdhdGUgZG9jc1xuICAgIGxldCBkb2NzID0gWy4uLnNlc3Npb25JbmZvLmN1cnJlbnREb2NzXVxuICAgIGxldCBpbml0RW5jb3VudGVyZWQgPSBmYWxzZVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhbGxDaGFuZ2VFdmVudHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IGNoYW5nZSA9IGFsbENoYW5nZUV2ZW50c1tpXVxuXG4gICAgICBpZiAoc2Vzc2lvbkluZm8uY3VycmVudEV2ZW50SWQgPj0gY2hhbmdlLmlkKSB7XG4gICAgICAgIGlmICghYWxsQ2hhbmdlRXZlbnRzW2kgLSAxXSB8fCBjaGFuZ2UuaWQgPiBhbGxDaGFuZ2VFdmVudHNbaSAtIDFdLmlkKSB7XG4gICAgICAgICAgLy8gZHVwbGljYXRlIGV2ZW50LCBkcm9wYWJsZVxuICAgICAgICAgIC8vIFRPRE86IHJlcG9ydFxuICAgICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIGBbcmVhbHRpbWVdIGR1cGxpY2F0ZSBldmVudCByZWNlaXZlZCwgY3VyICR7c2Vzc2lvbkluZm8uY3VycmVudEV2ZW50SWR9IGJ1dCBnb3QgJHtjaGFuZ2UuaWR9YFxuICAgICAgICAgIClcbiAgICAgICAgICAvLyB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gYWxsQ2hhbmdlRXZlbnRzIHNob3VsZCBiZSBpbiBhc2NlbmRpbmcgb3JkZXIgYWNjb3JkaW5nIHRvIGV2ZW50SWQsIHRoaXMgc2hvdWxkIG5ldmVyIGhhcHBlbnMsIG11c3QgcmVwb3J0IGEgbm9uLWZhdGFsIGVycm9yXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIGBbcmVhbHRpbWUgbGlzdGVuZXJdIHNlcnZlciBub24tZmF0YWwgZXJyb3I6IGV2ZW50cyBvdXQgb2Ygb3JkZXIgKHRoZSBsYXR0ZXIgZXZlbnQncyBpZCBpcyBzbWFsbGVyIHRoYW4gdGhhdCBvZiB0aGUgZm9ybWVyKSAocmVxdWVzdElkICR7cmVxdWVzdElkfSlgXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgLy8gd3JpdGVUb0ZpbGUoXG4gICAgICAgICAgLy8gICBcIndzZXJyb3IudHh0XCIsXG4gICAgICAgICAgLy8gICBgW3JlYWx0aW1lIGxpc3RlbmVyXSBzZXJ2ZXIgbm9uLWZhdGFsIGVycm9yOiBldmVudHMgb3V0IG9mIG9yZGVyICh0aGUgbGF0dGVyIGV2ZW50J3MgaWQgaXMgc21hbGxlciB0aGFuIHRoYXQgb2YgdGhlIGZvcm1lcikgICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgLy8gICAgICAge30sXG4gICAgICAgICAgLy8gICAgICAge1xuICAgICAgICAgIC8vICAgICAgICAgcmVxdWVzdElkOiBtc2cucmVxdWVzdElkLFxuICAgICAgICAgIC8vICAgICAgICAgd2F0Y2hJZDogbXNnLndhdGNoSWRcbiAgICAgICAgICAvLyAgICAgICB9XG4gICAgICAgICAgLy8gICAgIClcbiAgICAgICAgICAvLyAgICl9IFxcbmBcbiAgICAgICAgICAvLyApXG4gICAgICAgIH1cbiAgICAgICAgY29udGludWVcbiAgICAgIH0gZWxzZSBpZiAoc2Vzc2lvbkluZm8uY3VycmVudEV2ZW50SWQgPT09IGNoYW5nZS5pZCAtIDEpIHtcbiAgICAgICAgLy8gY29ycmVjdCBzZXF1ZW5jZVxuICAgICAgICAvLyBmaXJzdCBoYW5kbGUgZGF0YVR5cGUgdGhlbiBxdWV1ZVR5cGU6XG4gICAgICAgIC8vIDEuIGRhdGFUeXBlOiB3ZSBPTkxZIHBvcHVsYXRlIGNoYW5nZS5kb2MgaWYgbmVjY2Vzc2FyeVxuICAgICAgICAvLyAyLiBxdWV1ZVR5cGU6IHdlIGJ1aWxkIHRoZSBkYXRhIHNuYXBzaG90XG5cbiAgICAgICAgc3dpdGNoIChjaGFuZ2UuZGF0YVR5cGUpIHtcbiAgICAgICAgICBjYXNlICd1cGRhdGUnOiB7XG4gICAgICAgICAgICAvLyBvbmx5IG5lZWQgdG8gcG9wdWxhdGUgY2hhbmdlLmRvYyB3aGVuIGl0IGlzIG5vdCBwcm92aWRlZFxuICAgICAgICAgICAgaWYgKCFjaGFuZ2UuZG9jKSB7XG4gICAgICAgICAgICAgIHN3aXRjaCAoY2hhbmdlLnF1ZXVlVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3VwZGF0ZSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnZGVxdWV1ZSc6IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsRG9jID0gZG9jcy5maW5kKGRvYyA9PiBkb2MuX2lkID09PSBjaGFuZ2UuZG9jSWQpXG4gICAgICAgICAgICAgICAgICBpZiAobG9jYWxEb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYSBwYXJ0aWFsIHVwZGF0ZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkb2MgPSBjbG9uZURlZXAobG9jYWxEb2MpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZS51cGRhdGVkRmllbGRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBmaWVsZFBhdGggaW4gY2hhbmdlLnVwZGF0ZWRGaWVsZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldChkb2MsIGZpZWxkUGF0aCwgY2hhbmdlLnVwZGF0ZWRGaWVsZHNbZmllbGRQYXRoXSlcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlLnJlbW92ZWRGaWVsZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkUGF0aCBvZiBjaGFuZ2UucmVtb3ZlZEZpZWxkcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5zZXQoZG9jLCBmaWVsZFBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlLmRvYyA9IGRvY1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyByZXBvcnRcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAnW3JlYWx0aW1lIGxpc3RlbmVyXSBpbnRlcm5hbCBub24tZmF0YWwgc2VydmVyIGVycm9yOiB1bmV4cGVjdGVkIHVwZGF0ZSBkYXRhVHlwZSBldmVudCB3aGVyZSBubyBkb2MgaXMgYXNzb2NpYXRlZC4nXG4gICAgICAgICAgICAgICAgICAgIClcblxuICAgICAgICAgICAgICAgICAgICAvLyB3cml0ZVRvRmlsZShcbiAgICAgICAgICAgICAgICAgICAgLy8gICBcIndzZXJyb3IudHh0XCIsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgYFtyZWFsdGltZSBsaXN0ZW5lcl0gaW50ZXJuYWwgbm9uLWZhdGFsIHNlcnZlciBlcnJvcjogdW5leHBlY3RlZCB1cGRhdGUgZGF0YVR5cGUgZXZlbnQgd2hlcmUgbm8gZG9jIGlzIGFzc29jaWF0ZWQuICAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAge30sXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICByZXF1ZXN0SWQ6IG1zZy5yZXF1ZXN0SWQsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgd2F0Y2hJZDogbXNnLndhdGNoSWRcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgKVxuICAgICAgICAgICAgICAgICAgICAvLyAgICl9IFxcbmBcbiAgICAgICAgICAgICAgICAgICAgLy8gKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSAnZW5xdWV1ZSc6IHtcbiAgICAgICAgICAgICAgICAgIC8vIGRvYyBpcyBwcm92aWRlZCBieSBzZXJ2ZXIsIHRoaXMgc2hvdWxkIG5ldmVyIG9jY3VyXG4gICAgICAgICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgQ2xvdWRTREtFcnJvcih7XG4gICAgICAgICAgICAgICAgICAgIGVyckNvZGU6IEVSUl9DT0RFLlNES19EQVRBQkFTRV9SRUFMVElNRV9MSVNURU5FUl9VTkVYUEVDVEVEX0ZBVEFMX0VSUk9SIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgZXJyTXNnOiBgSGFuZGxlU2VydmVyRXZlbnRzOiBmdWxsIGRvYyBpcyBub3QgcHJvdmlkZWQgd2l0aCBkYXRhVHlwZT1cInVwZGF0ZVwiIGFuZCBxdWV1ZVR5cGU9XCJlbnF1ZXVlXCIgKHJlcXVlc3RJZCAke21zZy5yZXF1ZXN0SWR9KWBcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlV2l0aEVycm9yKGVycilcbiAgICAgICAgICAgICAgICAgIHRocm93IGVyclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSAncmVwbGFjZSc6IHtcbiAgICAgICAgICAgIC8vIHZhbGlkYXRpb25cbiAgICAgICAgICAgIGlmICghY2hhbmdlLmRvYykge1xuICAgICAgICAgICAgICAvLyBkb2MgaXMgcHJvdmlkZWQgYnkgc2VydmVyLCB0aGlzIHNob3VsZCBuZXZlciBvY2N1clxuICAgICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgQ2xvdWRTREtFcnJvcih7XG4gICAgICAgICAgICAgICAgZXJyQ29kZTogRVJSX0NPREUuU0RLX0RBVEFCQVNFX1JFQUxUSU1FX0xJU1RFTkVSX1VORVhQRUNURURfRkFUQUxfRVJST1IgYXMgc3RyaW5nLFxuICAgICAgICAgICAgICAgIGVyck1zZzogYEhhbmRsZVNlcnZlckV2ZW50czogZnVsbCBkb2MgaXMgbm90IHByb3ZpZGVkIHdpdGggZGF0YVR5cGU9XCJyZXBsYWNlXCIgKHJlcXVlc3RJZCAke21zZy5yZXF1ZXN0SWR9KWBcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgdGhpcy5jbG9zZVdpdGhFcnJvcihlcnIpXG4gICAgICAgICAgICAgIHRocm93IGVyclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSAncmVtb3ZlJzoge1xuICAgICAgICAgICAgY29uc3QgZG9jID0gZG9jcy5maW5kKGRvYyA9PiBkb2MuX2lkID09PSBjaGFuZ2UuZG9jSWQpXG4gICAgICAgICAgICBpZiAoZG9jKSB7XG4gICAgICAgICAgICAgIGNoYW5nZS5kb2MgPSBkb2NcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFRPRE8gcmVwb3J0XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgJ1tyZWFsdGltZSBsaXN0ZW5lcl0gaW50ZXJuYWwgbm9uLWZhdGFsIHNlcnZlciBlcnJvcjogdW5leHBlY3RlZCByZW1vdmUgZXZlbnQgd2hlcmUgbm8gZG9jIGlzIGFzc29jaWF0ZWQuJ1xuICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgLy8gd3JpdGVUb0ZpbGUoXG4gICAgICAgICAgICAgIC8vICAgXCJ3c2Vycm9yLnR4dFwiLFxuICAgICAgICAgICAgICAvLyAgIGBbcmVhbHRpbWUgbGlzdGVuZXJdIGludGVybmFsIG5vbi1mYXRhbCBzZXJ2ZXIgZXJyb3I6IHVuZXhwZWN0ZWQgcmVtb3ZlIGV2ZW50IHdoZXJlIG5vIGRvYyBpcyBhc3NvY2lhdGVkLiAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgICAgLy8gICAgICAge30sXG4gICAgICAgICAgICAgIC8vICAgICAgIHtcbiAgICAgICAgICAgICAgLy8gICAgICAgICByZXF1ZXN0SWQ6IG1zZy5yZXF1ZXN0SWQsXG4gICAgICAgICAgICAgIC8vICAgICAgICAgd2F0Y2hJZDogbXNnLndhdGNoSWRcbiAgICAgICAgICAgICAgLy8gICAgICAgfVxuICAgICAgICAgICAgICAvLyAgICAgKVxuICAgICAgICAgICAgICAvLyAgICl9IFxcbmBcbiAgICAgICAgICAgICAgLy8gKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSAnbGltaXQnOiB7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZS5kb2MpIHtcbiAgICAgICAgICAgICAgc3dpdGNoKGNoYW5nZS5xdWV1ZVR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkZXF1ZXVlJzoge1xuICAgICAgICAgICAgICAgICAgY29uc3QgZG9jID0gZG9jcy5maW5kKGRvYyA9PiBkb2MuX2lkID09PSBjaGFuZ2UuZG9jSWQpXG4gICAgICAgICAgICAgICAgICBpZiAoZG9jKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZS5kb2MgPSBkb2NcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgJ1tyZWFsdGltZSBsaXN0ZW5lcl0gaW50ZXJuYWwgbm9uLWZhdGFsIHNlcnZlciBlcnJvcjogdW5leHBlY3RlZCBsaW1pdCBkYXRhVHlwZSBldmVudCB3aGVyZSBubyBkb2MgaXMgYXNzb2NpYXRlZC4nXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgJ2VucXVldWUnOiB7XG4gICAgICAgICAgICAgICAgICAvLyBkb2MgaXMgcHJvdmlkZWQgYnkgc2VydmVyLCB0aGlzIHNob3VsZCBuZXZlciBvY2N1clxuICAgICAgICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IENsb3VkU0RLRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICBlcnJDb2RlOiBFUlJfQ09ERS5TREtfREFUQUJBU0VfUkVBTFRJTUVfTElTVEVORVJfVU5FWFBFQ1RFRF9GQVRBTF9FUlJPUiBhcyBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIGVyck1zZzogYEhhbmRsZVNlcnZlckV2ZW50czogZnVsbCBkb2MgaXMgbm90IHByb3ZpZGVkIHdpdGggZGF0YVR5cGU9XCJsaW1pdFwiIGFuZCBxdWV1ZVR5cGU9XCJlbnF1ZXVlXCIgKHJlcXVlc3RJZCAke21zZy5yZXF1ZXN0SWR9KWBcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlV2l0aEVycm9yKGVycilcbiAgICAgICAgICAgICAgICAgIHRocm93IGVyclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGNoYW5nZS5xdWV1ZVR5cGUpIHtcbiAgICAgICAgICBjYXNlICdpbml0Jzoge1xuICAgICAgICAgICAgaWYgKCFpbml0RW5jb3VudGVyZWQpIHtcbiAgICAgICAgICAgICAgaW5pdEVuY291bnRlcmVkID0gdHJ1ZVxuICAgICAgICAgICAgICBkb2NzID0gW2NoYW5nZS5kb2NdXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkb2NzLnB1c2goY2hhbmdlLmRvYylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ2VucXVldWUnOiB7XG4gICAgICAgICAgICBkb2NzLnB1c2goY2hhbmdlLmRvYylcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ2RlcXVldWUnOiB7XG4gICAgICAgICAgICBjb25zdCBpbmQgPSBkb2NzLmZpbmRJbmRleChkb2MgPT4gZG9jLl9pZCA9PT0gY2hhbmdlLmRvY0lkKVxuICAgICAgICAgICAgaWYgKGluZCA+IC0xKSB7XG4gICAgICAgICAgICAgIGRvY3Muc3BsaWNlKGluZCwgMSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFRPRE8gcmVwb3J0XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgJ1tyZWFsdGltZSBsaXN0ZW5lcl0gaW50ZXJuYWwgbm9uLWZhdGFsIHNlcnZlciBlcnJvcjogdW5leHBlY3RlZCBkZXF1ZXVlIGV2ZW50IHdoZXJlIG5vIGRvYyBpcyBhc3NvY2lhdGVkLidcbiAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgIC8vIHdyaXRlVG9GaWxlKFxuICAgICAgICAgICAgICAvLyAgIFwid3NlcnJvci50eHRcIixcbiAgICAgICAgICAgICAgLy8gICBgW3JlYWx0aW1lIGxpc3RlbmVyXSBpbnRlcm5hbCBub24tZmF0YWwgc2VydmVyIGVycm9yOiB1bmV4cGVjdGVkIGRlcXVldWUgZXZlbnQgd2hlcmUgbm8gZG9jIGlzIGFzc29jaWF0ZWQuICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgICAvLyAgICAgICB7fSxcbiAgICAgICAgICAgICAgLy8gICAgICAge1xuICAgICAgICAgICAgICAvLyAgICAgICAgIHJlcXVlc3RJZDogbXNnLnJlcXVlc3RJZCxcbiAgICAgICAgICAgICAgLy8gICAgICAgICB3YXRjaElkOiBtc2cud2F0Y2hJZFxuICAgICAgICAgICAgICAvLyAgICAgICB9XG4gICAgICAgICAgICAgIC8vICAgICApXG4gICAgICAgICAgICAgIC8vICAgKX0gXFxuYFxuICAgICAgICAgICAgICAvLyApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICd1cGRhdGUnOiB7XG4gICAgICAgICAgICAvLyB3cml0ZVRvRmlsZShcbiAgICAgICAgICAgIC8vICAgXCJ3c2Vycm9yLnR4dFwiLFxuICAgICAgICAgICAgLy8gICBgW3JlYWx0aW1lIGxpc3RlbmVyXSBkb2NzICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAvLyAgICAgZG9jc1xuICAgICAgICAgICAgLy8gICApfSBjaGFuZ2UgZG9jICR7SlNPTi5zdHJpbmdpZnkoY2hhbmdlKX0gXFxuYFxuICAgICAgICAgICAgLy8gKVxuICAgICAgICAgICAgY29uc3QgaW5kID0gZG9jcy5maW5kSW5kZXgoZG9jID0+IGRvYy5faWQgPT09IGNoYW5nZS5kb2NJZClcbiAgICAgICAgICAgIGlmIChpbmQgPiAtMSkge1xuICAgICAgICAgICAgICBkb2NzW2luZF0gPSBjaGFuZ2UuZG9jXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBUT0RPIHJlcG9ydFxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgICdbcmVhbHRpbWUgbGlzdGVuZXJdIGludGVybmFsIG5vbi1mYXRhbCBzZXJ2ZXIgZXJyb3I6IHVuZXhwZWN0ZWQgcXVldWVUeXBlIHVwZGF0ZSBldmVudCB3aGVyZSBubyBkb2MgaXMgYXNzb2NpYXRlZC4nXG4gICAgICAgICAgICAgIClcblxuICAgICAgICAgICAgICAvLyB3cml0ZVRvRmlsZShcbiAgICAgICAgICAgICAgLy8gICBcIndzZXJyb3IudHh0XCIsXG4gICAgICAgICAgICAgIC8vICAgYFtyZWFsdGltZSBsaXN0ZW5lcl0gaW50ZXJuYWwgbm9uLWZhdGFsIHNlcnZlciBlcnJvcjogdW5leHBlY3RlZCBxdWV1ZVR5cGUgdXBkYXRlIGV2ZW50IHdoZXJlIG5vIGRvYyBpcyBhc3NvY2lhdGVkLiAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgICAgLy8gICAgICAge30sXG4gICAgICAgICAgICAgIC8vICAgICAgIHtcbiAgICAgICAgICAgICAgLy8gICAgICAgICByZXF1ZXN0SWQ6IG1zZy5yZXF1ZXN0SWQsXG4gICAgICAgICAgICAgIC8vICAgICAgICAgd2F0Y2hJZDogbXNnLndhdGNoSWRcbiAgICAgICAgICAgICAgLy8gICAgICAgfVxuICAgICAgICAgICAgICAvLyAgICAgKVxuICAgICAgICAgICAgICAvLyAgICl9IFxcbmBcbiAgICAgICAgICAgICAgLy8gKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgaSA9PT0gbGVuIC0gMSB8fFxuICAgICAgICAgIChhbGxDaGFuZ2VFdmVudHNbaSArIDFdICYmIGFsbENoYW5nZUV2ZW50c1tpICsgMV0uaWQgIT09IGNoYW5nZS5pZClcbiAgICAgICAgKSB7XG4gICAgICAgICAgLy8gYSBzaGFsbG93IHNsaWNlIGNyZWF0ZXMgYSBzaGFsbG93IHNuYXBzaG90XG4gICAgICAgICAgY29uc3QgZG9jc1NuYXBzaG90ID0gWy4uLmRvY3NdXG5cbiAgICAgICAgICAvLyB3ZSBzbGljZSBmaXJzdCBjYXVzZScgaWYgdGhlcmUncmUgYWxsQ2hhbmdlRXZlbnRzIHRoYXQgYXJlIG9mIHRoZSBzYW1lIGlkIGFmdGVyIHRoaXMgY2hhbmdlLCB3ZSBkb24ndCB3YW50IHRvIGludm9sdmUgaXQgZm9yIGl0IGlzIHVuZXhwZWN0ZWQgaW52YWxpZCBvcmRlclxuICAgICAgICAgIGNvbnN0IGRvY0NoYW5nZXMgPSBhbGxDaGFuZ2VFdmVudHNcbiAgICAgICAgICAgIC5zbGljZSgwLCBpICsgMSlcbiAgICAgICAgICAgIC5maWx0ZXIoYyA9PiBjLmlkID09PSBjaGFuZ2UuaWQpXG5cbiAgICAgICAgICAvLyBhbGwgY2hhbmdlcyBvZiB0aGlzIGV2ZW50IGhhcyBiZWVuIGhhbmRsZSwgd2UgY291bGQgZGlzcGF0Y2ggdGhlIGV2ZW50IG5vd1xuICAgICAgICAgIHRoaXMuc2Vzc2lvbkluZm8uY3VycmVudEV2ZW50SWQgPSBjaGFuZ2UuaWRcbiAgICAgICAgICB0aGlzLnNlc3Npb25JbmZvLmN1cnJlbnREb2NzID0gZG9jc1xuXG4gICAgICAgICAgY29uc3Qgc25hcHNob3QgPSBuZXcgU25hcHNob3Qoe1xuICAgICAgICAgICAgaWQ6IGNoYW5nZS5pZCxcbiAgICAgICAgICAgIGRvY0NoYW5nZXMsXG4gICAgICAgICAgICBkb2NzOiBkb2NzU25hcHNob3QsXG4gICAgICAgICAgICBtc2dUeXBlXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIC8vIFJlcG9ydGVyLnN1cnJvdW5kVGhpcmRCeVRyeUNhdGNoKCgpID0+XG4gICAgICAgICAgdGhpcy5saXN0ZW5lci5vbkNoYW5nZShzbmFwc2hvdClcbiAgICAgICAgICAvLyApKClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gb3V0LW9mLW9yZGVyIGV2ZW50XG4gICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgICAgICAvLyBUT0RPOiByZXBvcnRcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBbcmVhbHRpbWUgbGlzdGVuZXJdIGV2ZW50IHJlY2VpdmVkIGlzIG91dCBvZiBvcmRlciwgY3VyICR7dGhpcy5zZXNzaW9uSW5mby5jdXJyZW50RXZlbnRJZH0gYnV0IGdvdCAke2NoYW5nZS5pZH1gXG4gICAgICAgIClcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyByZWJ1aWxkIHdhdGNoXG4gICAgICAgIGF3YWl0IHRoaXMucmVidWlsZFdhdGNoKClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcG9zdEhhbmRsZVNlcnZlckV2ZW50c1ZhbGlkaXR5Q2hlY2soXG4gICAgbXNnOiBJUmVzcG9uc2VNZXNzYWdlSW5pdEV2ZW50TXNnIHwgSVJlc3BvbnNlTWVzc2FnZU5leHRFdmVudE1zZ1xuICApIHtcbiAgICBpZiAoIXRoaXMuc2Vzc2lvbkluZm8pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICdbcmVhbHRpbWUgbGlzdGVuZXJdIGludGVybmFsIG5vbi1mYXRhbCBlcnJvcjogc2Vzc2lvbkluZm8gbG9zdCBhZnRlciBzZXJ2ZXIgZXZlbnQgaGFuZGxpbmcsIHRoaXMgc2hvdWxkIG5ldmVyIG9jY3VyJ1xuICAgICAgKVxuXG4gICAgICAvLyB3cml0ZVRvRmlsZShcbiAgICAgIC8vICAgXCJ3c2Vycm9yLnR4dFwiLFxuICAgICAgLy8gICBgW3JlYWx0aW1lIGxpc3RlbmVyXSBpbnRlcm5hbCBub24tZmF0YWwgZXJyb3I6IHNlc3Npb25JbmZvIGxvc3QgYWZ0ZXIgc2VydmVyIGV2ZW50IGhhbmRsaW5nLCB0aGlzIHNob3VsZCBuZXZlciBvY2N1ciAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAvLyAgICAgICB7fSxcbiAgICAgIC8vICAgICAgIHtcbiAgICAgIC8vICAgICAgICAgcmVxdWVzdElkOiBtc2cucmVxdWVzdElkLFxuICAgICAgLy8gICAgICAgICB3YXRjaElkOiBtc2cud2F0Y2hJZFxuICAgICAgLy8gICAgICAgfVxuICAgICAgLy8gICAgIClcbiAgICAgIC8vICAgKX0gXFxuYFxuICAgICAgLy8gKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5zZXNzaW9uSW5mby5leHBlY3RFdmVudElkICYmXG4gICAgICB0aGlzLnNlc3Npb25JbmZvLmN1cnJlbnRFdmVudElkID49IHRoaXMuc2Vzc2lvbkluZm8uZXhwZWN0RXZlbnRJZFxuICAgICkge1xuICAgICAgdGhpcy5jbGVhcldhaXRFeHBlY3RlZEV2ZW50KClcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZXNzaW9uSW5mby5jdXJyZW50RXZlbnRJZCA8IG1zZy5tc2dEYXRhLmN1cnJFdmVudCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnW3JlYWx0aW1lIGxpc3RlbmVyXSBpbnRlcm5hbCBub24tZmF0YWwgZXJyb3I6IGNsaWVudCBldmVudElkIGRvZXMgbm90IG1hdGNoIHdpdGggc2VydmVyIGV2ZW50IGlkIGFmdGVyIHNlcnZlciBldmVudCBoYW5kbGluZydcbiAgICAgIClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJXYWl0RXhwZWN0ZWRFdmVudCgpIHtcbiAgICBpZiAodGhpcy5fd2FpdEV4cGVjdGVkVGltZW91dElkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fd2FpdEV4cGVjdGVkVGltZW91dElkKVxuICAgICAgdGhpcy5fd2FpdEV4cGVjdGVkVGltZW91dElkID0gdW5kZWZpbmVkXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFB1YmxpY0V2ZW50KGV2ZW50OiBJREJFdmVudCk6IElTaW5nbGVEQkV2ZW50IHtcbiAgY29uc3QgZTogSVNpbmdsZURCRXZlbnQgPSB7XG4gICAgaWQ6IGV2ZW50LklELFxuICAgIGRhdGFUeXBlOiBldmVudC5EYXRhVHlwZSxcbiAgICBxdWV1ZVR5cGU6IGV2ZW50LlF1ZXVlVHlwZSxcbiAgICBkb2NJZDogZXZlbnQuRG9jSUQsXG4gICAgZG9jOiBldmVudC5Eb2MgJiYgZXZlbnQuRG9jICE9PSAne30nID8gSlNPTi5wYXJzZShldmVudC5Eb2MpIDogdW5kZWZpbmVkXG4gIH1cblxuICBpZiAoZXZlbnQuRGF0YVR5cGUgPT09ICd1cGRhdGUnKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmIChldmVudC5VcGRhdGVkRmllbGRzKSB7XG4gICAgICBlLnVwZGF0ZWRGaWVsZHMgPSBKU09OLnBhcnNlKGV2ZW50LlVwZGF0ZWRGaWVsZHMpXG4gICAgfVxuICAgIC8vIFRPRE86IHdhaXQgZm9yIHRjYiB0byBjaGFuZ2UgcmVtb3ZlZEZpZWxkcyB0byBSZW1vdmVkRmllbGRzXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmIChldmVudC5yZW1vdmVkRmllbGRzIHx8IGV2ZW50LlJlbW92ZWRGaWVsZHMpIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIC8vIGUucmVtb3ZlZEZpZWxkcyA9IGV2ZW50LnJlbW92ZWRGaWVsZHNcbiAgICAgIC8vICAgPyBKU09OLnBhcnNlKGV2ZW50LnJlbW92ZWRGaWVsZHMpXG4gICAgICAvLyAgIDogSlNPTi5wYXJzZShldmVudC5SZW1vdmVkRmllbGRzKVxuICAgICAgZS5yZW1vdmVkRmllbGRzID0gSlNPTi5wYXJzZShldmVudC5yZW1vdmVkRmllbGRzKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlXG59XG4iXX0=