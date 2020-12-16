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
        case 'session':
            if (!adapter.sessionStorage) {
                util_1.printWarn(constants_1.ERRORS.INVALID_PARAMS, 'sessionStorage is not supported on current platform');
                return new TcbCacheObject(adapter.root);
            }
            return adapter.sessionStorage;
        default:
            if (!adapter.localStorage) {
                util_1.printWarn(constants_1.ERRORS.INVALID_PARAMS, 'localStorage is not supported on current platform');
                return new TcbCacheObject(adapter.root);
            }
            return adapter.localStorage;
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
            throw new Error(JSON.stringify({
                code: constants_1.ERRORS.OPERATION_FAIL,
                msg: "[" + constants_1.getSdkName() + "][" + constants_1.ERRORS.OPERATION_FAIL + "]setStore failed",
                info: e
            }));
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
            if (typeof process !== 'undefined' && ((_a = process.env) === null || _a === void 0 ? void 0 : _a.tcb_token)) {
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
                            if (typeof process !== 'undefined' && ((_a = process.env) === null || _a === void 0 ? void 0 : _a.tcb_token)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGlicy9jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQW9HO0FBR3BHLCtCQUFzRDtBQUN0RCwwQ0FBaUQ7QUFLakQ7SUFBNkIsa0NBQWU7SUFFMUMsd0JBQVksSUFBUztRQUFyQixZQUNFLGlCQUFPLFNBS1I7UUFKQyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQzdCOztJQUNILENBQUM7SUFDTSxnQ0FBTyxHQUFkLFVBQWUsR0FBVyxFQUFDLEtBQVU7UUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUM1QyxDQUFDO0lBQ00sZ0NBQU8sR0FBZCxVQUFlLEdBQVc7UUFDeEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNNLG1DQUFVLEdBQWpCLFVBQWtCLEdBQVc7UUFDM0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNNLDhCQUFLLEdBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBckJELENBQTZCLG1DQUFlLEdBcUIzQztBQUlELFNBQVMsYUFBYSxDQUFDLFdBQXdCLEVBQUMsT0FBNEI7SUFDMUUsUUFBTyxXQUFXLEVBQUU7UUFDbEIsS0FBSyxP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QixFQUFDLGtGQUFrRixDQUFDLENBQUM7WUFDdkgsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNZLHlDQUFnQixHQUE3QixVQUE4QixHQUFXOzs7OzRCQUN2QyxXQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFBOzt3QkFBbkMsU0FBbUMsQ0FBQzs7Ozs7S0FDckM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFoTUQsSUFnTUM7QUFoTVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdG9yYWdlSW50ZXJmYWNlLEFic3RyYWN0U3RvcmFnZSxTREtBZGFwdGVySW50ZXJmYWNlIH0gZnJvbSAnQGNsb3VkYmFzZS9hZGFwdGVyLWludGVyZmFjZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ2FjaGUsSUNhY2hlQ29uZmlnIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSc7XG5pbXBvcnQgeyBLVixQZXJzaXN0ZW5jZSxJQ2xvdWRiYXNlUGxhdGZvcm1JbmZvIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCxpc051bGwscHJpbnRXYXJuIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IEVSUk9SUyxnZXRTZGtOYW1lIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBwZXJzaXRlbmNlPW5vbmXml7bnmbvlvZXmgIHkv53lrZjlnKjlhoXlrZjkuK1cbiAqL1xuY2xhc3MgVGNiQ2FjaGVPYmplY3QgZXh0ZW5kcyBBYnN0cmFjdFN0b3JhZ2Uge1xuICBwcml2YXRlIHJlYWRvbmx5IF9yb290OiBhbnk7XG4gIGNvbnN0cnVjdG9yKHJvb3Q6IGFueSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fcm9vdCA9IHJvb3Q7XG4gICAgaWYoIXJvb3RbJ3RjYkNhY2hlT2JqZWN0J10pIHtcbiAgICAgIHJvb3RbJ3RjYkNhY2hlT2JqZWN0J10gPSB7fTtcbiAgICB9XG4gIH1cbiAgcHVibGljIHNldEl0ZW0oa2V5OiBzdHJpbmcsdmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3Jvb3RbJ3RjYkNhY2hlT2JqZWN0J11ba2V5XSA9IHZhbHVlO1xuICB9XG4gIHB1YmxpYyBnZXRJdGVtKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvb3RbJ3RjYkNhY2hlT2JqZWN0J11ba2V5XTtcbiAgfVxuICBwdWJsaWMgcmVtb3ZlSXRlbShrZXk6IHN0cmluZykge1xuICAgIGRlbGV0ZSB0aGlzLl9yb290Wyd0Y2JDYWNoZU9iamVjdCddW2tleV07XG4gIH1cbiAgcHVibGljIGNsZWFyKCkge1xuICAgIGRlbGV0ZSB0aGlzLl9yb290Wyd0Y2JDYWNoZU9iamVjdCddO1xuICB9XG59XG4vKipcbiAqIOW3peWOguWHveaVsFxuICovXG5mdW5jdGlvbiBjcmVhdGVTdG9yYWdlKHBlcnNpc3RlbmNlOiBQZXJzaXN0ZW5jZSxhZGFwdGVyOiBTREtBZGFwdGVySW50ZXJmYWNlKTogU3RvcmFnZUludGVyZmFjZSB7XG4gIHN3aXRjaChwZXJzaXN0ZW5jZSkge1xuICAgIGNhc2UgJ2xvY2FsJzpcbiAgICAgIGlmKCFhZGFwdGVyLmxvY2FsU3RvcmFnZSkge1xuICAgICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfUEFSQU1TLCdsb2NhbFN0b3JhZ2UgaXMgbm90IHN1cHBvcnRlZCBvbiBjdXJyZW50IHBsYXRmb3JtJyk7XG4gICAgICAgIC8vIOS4jeaUr+aMgWxvY2Fsc3RvcmFnZeeahOW5s+WPsOmZjee6p+S4um5vbmVcbiAgICAgICAgcmV0dXJuIG5ldyBUY2JDYWNoZU9iamVjdChhZGFwdGVyLnJvb3QpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFkYXB0ZXIubG9jYWxTdG9yYWdlXG4gICAgY2FzZSAnbm9uZSc6XG4gICAgICByZXR1cm4gbmV3IFRjYkNhY2hlT2JqZWN0KGFkYXB0ZXIucm9vdCk7XG4gICAgY2FzZSAnc2Vzc2lvbic6XG4gICAgICBpZighYWRhcHRlci5zZXNzaW9uU3RvcmFnZSkge1xuICAgICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfUEFSQU1TLCdzZXNzaW9uU3RvcmFnZSBpcyBub3Qgc3VwcG9ydGVkIG9uIGN1cnJlbnQgcGxhdGZvcm0nKTtcbiAgICAgICAgLy8g5LiN5pSv5oyBbG9jYWxzdG9yYWdl55qE5bmz5Y+w6ZmN57qn5Li6bm9uZVxuICAgICAgICByZXR1cm4gbmV3IFRjYkNhY2hlT2JqZWN0KGFkYXB0ZXIucm9vdCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWRhcHRlci5zZXNzaW9uU3RvcmFnZTtcbiAgICBkZWZhdWx0OlxuICAgICAgaWYoIWFkYXB0ZXIubG9jYWxTdG9yYWdlKSB7XG4gICAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9QQVJBTVMsJ2xvY2FsU3RvcmFnZSBpcyBub3Qgc3VwcG9ydGVkIG9uIGN1cnJlbnQgcGxhdGZvcm0nKTtcbiAgICAgICAgLy8g5LiN5pSv5oyBbG9jYWxzdG9yYWdl55qE5bmz5Y+w6ZmN57qn5Li6bm9uZVxuICAgICAgICByZXR1cm4gbmV3IFRjYkNhY2hlT2JqZWN0KGFkYXB0ZXIucm9vdCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWRhcHRlci5sb2NhbFN0b3JhZ2U7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENsb3VkYmFzZUNhY2hlIGltcGxlbWVudHMgSUNsb3VkYmFzZUNhY2hlIHtcbiAgcHVibGljIGtleXM6IEtWPHN0cmluZz4gPSB7fTtcblxuICBwcml2YXRlIF9wZXJzaXN0ZW5jZTogUGVyc2lzdGVuY2U7XG4gIHByaXZhdGUgX3BsYXRmb3JtSW5mbzogSUNsb3VkYmFzZVBsYXRmb3JtSW5mbztcbiAgcHJpdmF0ZSBfc3RvcmFnZTogU3RvcmFnZUludGVyZmFjZTtcbiAgLy8g5aeL57uI5a2Y5YKo5ZyobG9jYWxzdG9yYWdl5Lit55qEa2V56ZuG5ZCIXG4gIHByaXZhdGUgX2Fsd2F5c0xvY2FsS2V5czogc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJQ2FjaGVDb25maWcpIHtcbiAgICBjb25zdCB7IHBlcnNpc3RlbmNlLHBsYXRmb3JtSW5mbyA9IHt9LGtleXMgPSB7fSxhbHdheXNMb2NhbEtleXMgPSBbXSB9ID0gY29uZmlnO1xuICAgIHRoaXMuX3BsYXRmb3JtSW5mbyA9IHBsYXRmb3JtSW5mbztcbiAgICB0aGlzLl9hbHdheXNMb2NhbEtleXMgPSBhbHdheXNMb2NhbEtleXM7XG4gICAgaWYoIXRoaXMuX3N0b3JhZ2UpIHtcbiAgICAgIHRoaXMuX3BlcnNpc3RlbmNlID0gcGxhdGZvcm1JbmZvLmFkYXB0ZXIucHJpbWFyeVN0b3JhZ2UgfHwgcGVyc2lzdGVuY2U7XG4gICAgICB0aGlzLl9zdG9yYWdlID0gY3JlYXRlU3RvcmFnZSh0aGlzLl9wZXJzaXN0ZW5jZSxwbGF0Zm9ybUluZm8uYWRhcHRlcik7XG4gICAgICB0aGlzLmtleXMgPSBrZXlzO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogQGdldHRlciBzdG9yYWdl5qih5byPLeWQjOatpS/lvILmraVcbiAgICovXG4gIGdldCBtb2RlKCkge1xuICAgIHJldHVybiB0aGlzLl9zdG9yYWdlLm1vZGUgfHwgJ3N5bmMnXG4gIH1cbiAgZ2V0IHBlcnNpc3RlbmNlKCk6IFBlcnNpc3RlbmNlIHtcbiAgICByZXR1cm4gdGhpcy5fcGVyc2lzdGVuY2U7XG4gIH1cbiAgLyoqXG4gICAqIOWcqOS4jeWQjHBlcnNpc3RlbmNl5LmL6Ze06L+B56e75pWw5o2uXG4gICAqIEBwYXJhbSBwZXJzaXN0ZW5jZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZVBlcnNpc3RlbmNlKHBlcnNpc3RlbmNlOiBQZXJzaXN0ZW5jZSkge1xuICAgIGlmKHRoaXMubW9kZSA9PT0gJ2FzeW5jJykge1xuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwnY3VycmVudCBwbGF0Zm9ybVxcJ3Mgc3RvcmFnZSBpcyBhc3luY2hyb25vdXMsIHBsZWFzZSB1c2UgdXBkYXRlUGVyc2lzdGVuY2VBc3luYyBpbnN0ZWVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmKHBlcnNpc3RlbmNlID09PSB0aGlzLl9wZXJzaXN0ZW5jZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpc0N1cnJlbnRMb2NhbCA9IHRoaXMuX3BlcnNpc3RlbmNlID09PSAnbG9jYWwnO1xuICAgIHRoaXMuX3BlcnNpc3RlbmNlID0gcGVyc2lzdGVuY2U7XG4gICAgY29uc3Qgc3RvcmFnZSA9IGNyZWF0ZVN0b3JhZ2UocGVyc2lzdGVuY2UsdGhpcy5fcGxhdGZvcm1JbmZvLmFkYXB0ZXIpO1xuICAgIC8vIOWIh+aNonBlcnNpc3RlbmNl6YeN5paw5Yib5bu6c3RvcmFnZeWvueixoVxuICAgIGZvcihjb25zdCBrZXkgaW4gdGhpcy5rZXlzKSB7XG4gICAgICBjb25zdCBuYW1lID0gdGhpcy5rZXlzW2tleV07XG4gICAgICAvLyDlpoLmnpzlvZPliY3kuLpsb2NhbOW5tuS4lGtleeiiq+iuvuWumuS4uuWni+e7iOWtmOWCqOWcqGxvY2Fsc3RvcmFnZeS4re+8jOWImeS4jei/geenu1xuICAgICAgaWYoaXNDdXJyZW50TG9jYWwgJiYgdGhpcy5fYWx3YXlzTG9jYWxLZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCB2YWwgPSB0aGlzLl9zdG9yYWdlLmdldEl0ZW0obmFtZSk7XG4gICAgICBpZighaXNVbmRlZmluZWQodmFsKSAmJiAhaXNOdWxsKHZhbCkpIHtcbiAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG5hbWUsdmFsKTtcbiAgICAgICAgdGhpcy5fc3RvcmFnZS5yZW1vdmVJdGVtKG5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9zdG9yYWdlID0gc3RvcmFnZTtcbiAgfVxuICBwdWJsaWMgYXN5bmMgdXBkYXRlUGVyc2lzdGVuY2VBc3luYyhwZXJzaXN0ZW5jZTogUGVyc2lzdGVuY2UpIHtcbiAgICBpZihwZXJzaXN0ZW5jZSA9PT0gdGhpcy5fcGVyc2lzdGVuY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaXNDdXJyZW50TG9jYWwgPSB0aGlzLl9wZXJzaXN0ZW5jZSA9PT0gJ2xvY2FsJztcbiAgICB0aGlzLl9wZXJzaXN0ZW5jZSA9IHBlcnNpc3RlbmNlO1xuICAgIGNvbnN0IHN0b3JhZ2UgPSBjcmVhdGVTdG9yYWdlKHBlcnNpc3RlbmNlLHRoaXMuX3BsYXRmb3JtSW5mby5hZGFwdGVyKTtcbiAgICAvLyDliIfmjaJwZXJzaXN0ZW5jZemHjeaWsOWIm+W7unN0b3JhZ2Xlr7nosaFcbiAgICBmb3IoY29uc3Qga2V5IGluIHRoaXMua2V5cykge1xuICAgICAgY29uc3QgbmFtZSA9IHRoaXMua2V5c1trZXldO1xuICAgICAgLy8g5aaC5p6c5b2T5YmN5Li6bG9jYWzlubbkuJRrZXnooqvorr7lrprkuLrlp4vnu4jlrZjlgqjlnKhsb2NhbHN0b3JhZ2XkuK3vvIzliJnkuI3ov4Hnp7tcbiAgICAgIGlmKGlzQ3VycmVudExvY2FsICYmIHRoaXMuX2Fsd2F5c0xvY2FsS2V5cy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY29uc3QgdmFsID0gYXdhaXQgdGhpcy5fc3RvcmFnZS5nZXRJdGVtKG5hbWUpO1xuICAgICAgaWYoIWlzVW5kZWZpbmVkKHZhbCkgJiYgIWlzTnVsbCh2YWwpKSB7XG4gICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShuYW1lLHZhbCk7XG4gICAgICAgIGF3YWl0IHRoaXMuX3N0b3JhZ2UucmVtb3ZlSXRlbShuYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fc3RvcmFnZSA9IHN0b3JhZ2U7XG4gIH1cbiAgcHVibGljIHNldFN0b3JlKGtleTogc3RyaW5nLHZhbHVlOiBhbnksdmVyc2lvbj86IGFueSkge1xuICAgIGlmKHRoaXMubW9kZSA9PT0gJ2FzeW5jJykge1xuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwnY3VycmVudCBwbGF0Zm9ybVxcJ3Mgc3RvcmFnZSBpcyBhc3luY2hyb25vdXMsIHBsZWFzZSB1c2Ugc2V0U3RvcmVBc3luYyBpbnN0ZWVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmKCF0aGlzLl9zdG9yYWdlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHZhbCA9IHtcbiAgICAgICAgdmVyc2lvbjogdmVyc2lvbiB8fCAnbG9jYWxDYWNoZXYxJyxcbiAgICAgICAgY29udGVudDogdmFsdWVcbiAgICAgIH07XG4gICAgICB0aGlzLl9zdG9yYWdlLnNldEl0ZW0oa2V5LEpTT04uc3RyaW5naWZ5KHZhbCkpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLk9QRVJBVElPTl9GQUlMLFxuICAgICAgICBtc2c6IGBbJHtnZXRTZGtOYW1lKCl9XVske0VSUk9SUy5PUEVSQVRJT05fRkFJTH1dc2V0U3RvcmUgZmFpbGVkYCxcbiAgICAgICAgaW5mbzogZVxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuICBwdWJsaWMgYXN5bmMgc2V0U3RvcmVBc3luYyhrZXk6IHN0cmluZyx2YWx1ZTogYW55LHZlcnNpb24/OiBhbnkpIHtcbiAgICBpZighdGhpcy5fc3RvcmFnZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB2YWwgPSB7XG4gICAgICAgIHZlcnNpb246IHZlcnNpb24gfHwgJ2xvY2FsQ2FjaGV2MScsXG4gICAgICAgIGNvbnRlbnQ6IHZhbHVlXG4gICAgICB9O1xuICAgICAgYXdhaXQgdGhpcy5fc3RvcmFnZS5zZXRJdGVtKGtleSxKU09OLnN0cmluZ2lmeSh2YWwpKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cbiAgcHVibGljIGdldFN0b3JlKGtleTogc3RyaW5nLHZlcnNpb24/OiBzdHJpbmcpIHtcbiAgICBpZih0aGlzLm1vZGUgPT09ICdhc3luYycpIHtcbiAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sJ2N1cnJlbnQgcGxhdGZvcm1cXCdzIHN0b3JhZ2UgaXMgYXN5bmNocm9ub3VzLCBwbGVhc2UgdXNlIGdldFN0b3JlQXN5bmMgaW5zdGVlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy/mtYvor5XnlKjkvovkvb/nlKhcbiAgICAgIGlmKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmVudiA/LnRjYl90b2tlbikge1xuICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnYudGNiX3Rva2VuO1xuICAgICAgfVxuXG4gICAgICBpZighdGhpcy5fc3RvcmFnZSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmVyc2lvbiA9IHZlcnNpb24gfHwgJ2xvY2FsQ2FjaGV2MSc7XG5cbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5fc3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgaWYoIWNvbnRlbnQpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBpZihjb250ZW50LmluZGV4T2YodmVyc2lvbikgPj0gMCkge1xuICAgICAgY29uc3QgZCA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgICByZXR1cm4gZC5jb250ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG4gIHB1YmxpYyBhc3luYyBnZXRTdG9yZUFzeW5jKGtleTogc3RyaW5nLHZlcnNpb24/OiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgLy/mtYvor5XnlKjkvovkvb/nlKhcbiAgICAgIGlmKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmVudiA/LnRjYl90b2tlbikge1xuICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnYudGNiX3Rva2VuO1xuICAgICAgfVxuXG4gICAgICBpZighdGhpcy5fc3RvcmFnZSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmVyc2lvbiA9IHZlcnNpb24gfHwgJ2xvY2FsQ2FjaGV2MSc7XG5cbiAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5fc3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgaWYoIWNvbnRlbnQpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBpZihjb250ZW50LmluZGV4T2YodmVyc2lvbikgPj0gMCkge1xuICAgICAgY29uc3QgZCA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgICByZXR1cm4gZC5jb250ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG4gIHB1YmxpYyByZW1vdmVTdG9yZShrZXk6IHN0cmluZykge1xuICAgIGlmKHRoaXMubW9kZSA9PT0gJ2FzeW5jJykge1xuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwnY3VycmVudCBwbGF0Zm9ybVxcJ3Mgc3RvcmFnZSBpcyBhc3luY2hyb25vdXMsIHBsZWFzZSB1c2UgcmVtb3ZlU3RvcmVBc3luYyBpbnN0ZWVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3N0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICB9XG4gIHB1YmxpYyBhc3luYyByZW1vdmVTdG9yZUFzeW5jKGtleTogc3RyaW5nKSB7XG4gICAgYXdhaXQgdGhpcy5fc3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gIH1cbn1cbiJdfQ==