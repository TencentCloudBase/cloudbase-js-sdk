"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.CloudbaseCache = void 0;
var adapter_interface_1 = require("@cloudbase/adapter-interface");
var util_1 = require("./util");
var constants_1 = require("../constants");
var TcbCacheObject = (function (_super) {
    __extends(TcbCacheObject, _super);
    function TcbCacheObject(root) {
        var _this = _super.call(this) || this;
        _this._root = root;
        if (!root['tcbCacheObject']) {
            root['tcbCacheObject'] = {};
        }
        return _this;
    }
    TcbCacheObject.prototype.setItem = function (key, value) {
        this._root['tcbCacheObject'][key] = value;
    };
    TcbCacheObject.prototype.getItem = function (key) {
        return this._root['tcbCacheObject'][key];
    };
    TcbCacheObject.prototype.removeItem = function (key) {
        delete this._root['tcbCacheObject'][key];
    };
    TcbCacheObject.prototype.clear = function () {
        delete this._root['tcbCacheObject'];
    };
    return TcbCacheObject;
}(adapter_interface_1.AbstractStorage));
function createStorage(persistence, adapter) {
    switch (persistence) {
        case 'local':
            if (!adapter.localStorage) {
                util_1.printWarn(constants_1.ERRORS.INVALID_PARAMS, 'localStorage is not supported on current platform');
                return new TcbCacheObject(adapter.root);
            }
            return adapter.localStorage;
        case 'none':
            return new TcbCacheObject(adapter.root);
        default:
            if (!adapter.sessionStorage) {
                util_1.printWarn(constants_1.ERRORS.INVALID_PARAMS, 'sessionStorage is not supported on current platform');
                return new TcbCacheObject(adapter.root);
            }
            return adapter.sessionStorage;
    }
}
var CloudbaseCache = (function () {
    function CloudbaseCache(config) {
        this.keys = {};
        var persistence = config.persistence, _a = config.platformInfo, platformInfo = _a === void 0 ? {} : _a, _b = config.keys, keys = _b === void 0 ? {} : _b, _c = config.alwaysLocalKeys, alwaysLocalKeys = _c === void 0 ? [] : _c;
        this._platformInfo = platformInfo;
        this._alwaysLocalKeys = alwaysLocalKeys;
        if (!this._storage) {
            this._persistence = platformInfo.adapter.primaryStorage || persistence;
            this._storage = createStorage(this._persistence, platformInfo.adapter);
            this.keys = keys;
        }
    }
    Object.defineProperty(CloudbaseCache.prototype, "mode", {
        get: function () {
            return this._storage.mode || 'sync';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CloudbaseCache.prototype, "persistence", {
        get: function () {
            return this._persistence;
        },
        enumerable: false,
        configurable: true
    });
    CloudbaseCache.prototype.updatePersistence = function (persistence) {
        if (this.mode === 'async') {
            util_1.printWarn(constants_1.ERRORS.INVALID_OPERATION, 'current platform\'s storage is asynchronous, please use updatePersistenceAsync insteed');
            return;
        }
        if (persistence === this._persistence) {
            return;
        }
        var isCurrentLocal = this._persistence === 'local';
        this._persistence = persistence;
        var storage = createStorage(persistence, this._platformInfo.adapter);
        for (var key in this.keys) {
            var name_1 = this.keys[key];
            if (isCurrentLocal && this._alwaysLocalKeys.includes(key)) {
                continue;
            }
            var val = this._storage.getItem(name_1);
            if (!util_1.isUndefined(val) && !util_1.isNull(val)) {
                storage.setItem(name_1, val);
                this._storage.removeItem(name_1);
            }
        }
        this._storage = storage;
    };
    CloudbaseCache.prototype.updatePersistenceAsync = function (persistence) {
        return __awaiter(this, void 0, void 0, function () {
            var isCurrentLocal, storage, _a, _b, _i, key, name_2, val;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (persistence === this._persistence) {
                            return [2];
                        }
                        isCurrentLocal = this._persistence === 'local';
                        this._persistence = persistence;
                        storage = createStorage(persistence, this._platformInfo.adapter);
                        _a = [];
                        for (_b in this.keys)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 5];
                        key = _a[_i];
                        name_2 = this.keys[key];
                        if (isCurrentLocal && this._alwaysLocalKeys.includes(key)) {
                            return [3, 4];
                        }
                        return [4, this._storage.getItem(name_2)];
                    case 2:
                        val = _c.sent();
                        if (!(!util_1.isUndefined(val) && !util_1.isNull(val))) return [3, 4];
                        storage.setItem(name_2, val);
                        return [4, this._storage.removeItem(name_2)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3, 1];
                    case 5:
                        this._storage = storage;
                        return [2];
                }
            });
        });
    };
    CloudbaseCache.prototype.setStore = function (key, value, version) {
        if (this.mode === 'async') {
            util_1.printWarn(constants_1.ERRORS.INVALID_OPERATION, 'current platform\'s storage is asynchronous, please use setStoreAsync insteed');
            return;
        }
        if (!this._storage) {
            return;
        }
        try {
            var val = {
                version: version || 'localCachev1',
                content: value
            };
            this._storage.setItem(key, JSON.stringify(val));
        }
        catch (e) {
            return;
        }
        return;
    };
    CloudbaseCache.prototype.setStoreAsync = function (key, value, version) {
        return __awaiter(this, void 0, void 0, function () {
            var val, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._storage) {
                            return [2];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        val = {
                            version: version || 'localCachev1',
                            content: value
                        };
                        return [4, this._storage.setItem(key, JSON.stringify(val))];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    CloudbaseCache.prototype.getStore = function (key, version) {
        var _a;
        if (this.mode === 'async') {
            util_1.printWarn(constants_1.ERRORS.INVALID_OPERATION, 'current platform\'s storage is asynchronous, please use getStoreAsync insteed');
            return;
        }
        try {
            if ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.tcb_token) {
                return process.env.tcb_token;
            }
            if (!this._storage) {
                return '';
            }
        }
        catch (e) {
            return '';
        }
        version = version || 'localCachev1';
        var content = this._storage.getItem(key);
        if (!content) {
            return '';
        }
        if (content.indexOf(version) >= 0) {
            var d = JSON.parse(content);
            return d.content;
        }
        else {
            return '';
        }
    };
    CloudbaseCache.prototype.getStoreAsync = function (key, version) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var content, d;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        try {
                            if ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.tcb_token) {
                                return [2, process.env.tcb_token];
                            }
                            if (!this._storage) {
                                return [2, ''];
                            }
                        }
                        catch (e) {
                            return [2, ''];
                        }
                        version = version || 'localCachev1';
                        return [4, this._storage.getItem(key)];
                    case 1:
                        content = _b.sent();
                        if (!content) {
                            return [2, ''];
                        }
                        if (content.indexOf(version) >= 0) {
                            d = JSON.parse(content);
                            return [2, d.content];
                        }
                        else {
                            return [2, ''];
                        }
                        return [2];
                }
            });
        });
    };
    CloudbaseCache.prototype.removeStore = function (key) {
        if (this.mode === 'async') {
            util_1.printWarn(constants_1.ERRORS.INVALID_OPERATION, 'current platform\'s storage is asynchronous, please use removeStoreAsync insteed');
            return;
        }
        this._storage.removeItem(key);
    };
    CloudbaseCache.prototype.removeStoreAsync = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._storage.removeItem(key)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return CloudbaseCache;
}());
exports.CloudbaseCache = CloudbaseCache;
