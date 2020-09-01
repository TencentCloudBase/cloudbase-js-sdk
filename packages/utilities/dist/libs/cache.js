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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGlicy9jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQXNHO0FBR3RHLCtCQUF1RDtBQUN2RCwwQ0FBc0M7QUFLdEM7SUFBNkIsa0NBQWU7SUFFMUMsd0JBQVksSUFBUTtRQUFwQixZQUNFLGlCQUFPLFNBS1I7UUFKQyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQzdCOztJQUNILENBQUM7SUFDTSxnQ0FBTyxHQUFkLFVBQWUsR0FBVyxFQUFFLEtBQVU7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUM1QyxDQUFDO0lBQ00sZ0NBQU8sR0FBZCxVQUFlLEdBQVc7UUFDeEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNNLG1DQUFVLEdBQWpCLFVBQWtCLEdBQVc7UUFDM0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNNLDhCQUFLLEdBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBckJELENBQTZCLG1DQUFlLEdBcUIzQztBQUlELFNBQVMsYUFBYSxDQUFDLFdBQXdCLEVBQUUsT0FBNEI7SUFDM0UsUUFBUSxXQUFXLEVBQUU7UUFDbkIsS0FBSyxP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LEVBQUUsRUFBQzs2QkFDWDt5QkFDRjt3QkFBQyxPQUFPLENBQUMsRUFBRTs0QkFDVixXQUFPLEVBQUUsRUFBQzt5QkFDWDt3QkFFRCxPQUFPLEdBQUcsT0FBTyxJQUFJLGNBQWMsQ0FBQzt3QkFFcEIsV0FBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBQTs7d0JBQTFDLE9BQU8sR0FBRyxTQUFnQzt3QkFDaEQsSUFBSSxDQUFDLE9BQU8sRUFBRTs0QkFDWixXQUFPLEVBQUUsRUFBQzt5QkFDWDt3QkFFRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUMzQixDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDOUIsV0FBTyxDQUFDLENBQUMsT0FBTyxFQUFDO3lCQUNsQjs2QkFBTTs0QkFDTCxXQUFPLEVBQUUsRUFBQzt5QkFDWDs7Ozs7S0FDRjtJQUNNLG9DQUFXLEdBQWxCLFVBQW1CLEdBQVU7UUFDM0IsSUFBRyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBQztZQUN2QixnQkFBUyxDQUFDLGtCQUFNLENBQUMsaUJBQWlCLEVBQUMsa0ZBQWtGLENBQUMsQ0FBQztZQUN2SCxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ1kseUNBQWdCLEdBQTdCLFVBQThCLEdBQVU7Ozs7NEJBQ3RDLFdBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUE7O3dCQUFuQyxTQUFtQyxDQUFDOzs7OztLQUNyQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQTVMRCxJQTRMQztBQTVMWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0b3JhZ2VJbnRlcmZhY2UsIEFic3RyYWN0U3RvcmFnZSwgU0RLQWRhcHRlckludGVyZmFjZSB9IGZyb20gJ0BjbG91ZGJhc2UvYWRhcHRlci1pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNhY2hlLElDYWNoZUNvbmZpZyB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY2FjaGUnO1xuaW1wb3J0IHsgS1YsIFBlcnNpc3RlbmNlLCBJQ2xvdWRiYXNlUGxhdGZvcm1JbmZvIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCxpc051bGwsIHByaW50V2FybiB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBFUlJPUlMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIHBlcnNpdGVuY2U9bm9uZeaXtueZu+W9leaAgeS/neWtmOWcqOWGheWtmOS4rVxuICovXG5jbGFzcyBUY2JDYWNoZU9iamVjdCBleHRlbmRzIEFic3RyYWN0U3RvcmFnZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3Jvb3Q6YW55O1xuICBjb25zdHJ1Y3Rvcihyb290OmFueSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fcm9vdCA9IHJvb3Q7XG4gICAgaWYgKCFyb290Wyd0Y2JDYWNoZU9iamVjdCddKSB7XG4gICAgICByb290Wyd0Y2JDYWNoZU9iamVjdCddID0ge307XG4gICAgfVxuICB9XG4gIHB1YmxpYyBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fcm9vdFsndGNiQ2FjaGVPYmplY3QnXVtrZXldID0gdmFsdWU7XG4gIH1cbiAgcHVibGljIGdldEl0ZW0oa2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fcm9vdFsndGNiQ2FjaGVPYmplY3QnXVtrZXldO1xuICB9XG4gIHB1YmxpYyByZW1vdmVJdGVtKGtleTogc3RyaW5nKSB7XG4gICAgZGVsZXRlIHRoaXMuX3Jvb3RbJ3RjYkNhY2hlT2JqZWN0J11ba2V5XTtcbiAgfVxuICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgZGVsZXRlIHRoaXMuX3Jvb3RbJ3RjYkNhY2hlT2JqZWN0J107XG4gIH1cbn1cbi8qKlxuICog5bel5Y6C5Ye95pWwXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVN0b3JhZ2UocGVyc2lzdGVuY2U6IFBlcnNpc3RlbmNlLCBhZGFwdGVyOiBTREtBZGFwdGVySW50ZXJmYWNlKTogU3RvcmFnZUludGVyZmFjZSB7XG4gIHN3aXRjaCAocGVyc2lzdGVuY2UpIHtcbiAgICBjYXNlICdsb2NhbCc6XG4gICAgICBpZighYWRhcHRlci5sb2NhbFN0b3JhZ2Upe1xuICAgICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfUEFSQU1TLCdsb2NhbFN0b3JhZ2UgaXMgbm90IHN1cHBvcnRlZCBvbiBjdXJyZW50IHBsYXRmb3JtJyk7XG4gICAgICAgIC8vIOS4jeaUr+aMgWxvY2Fsc3RvcmFnZeeahOW5s+WPsOmZjee6p+S4um5vbmVcbiAgICAgICAgcmV0dXJuIG5ldyBUY2JDYWNoZU9iamVjdChhZGFwdGVyLnJvb3QpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFkYXB0ZXIubG9jYWxTdG9yYWdlXG4gICAgY2FzZSAnbm9uZSc6XG4gICAgICByZXR1cm4gbmV3IFRjYkNhY2hlT2JqZWN0KGFkYXB0ZXIucm9vdCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIGlmKCFhZGFwdGVyLnNlc3Npb25TdG9yYWdlKXtcbiAgICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX1BBUkFNUywnc2Vzc2lvblN0b3JhZ2UgaXMgbm90IHN1cHBvcnRlZCBvbiBjdXJyZW50IHBsYXRmb3JtJyk7XG4gICAgICAgIC8vIOS4jeaUr+aMgWxvY2Fsc3RvcmFnZeeahOW5s+WPsOmZjee6p+S4um5vbmVcbiAgICAgICAgcmV0dXJuIG5ldyBUY2JDYWNoZU9iamVjdChhZGFwdGVyLnJvb3QpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFkYXB0ZXIuc2Vzc2lvblN0b3JhZ2U7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENsb3VkYmFzZUNhY2hlIGltcGxlbWVudHMgSUNsb3VkYmFzZUNhY2hle1xuICBwdWJsaWMga2V5czogS1Y8c3RyaW5nPiA9IHt9O1xuXG4gIHByaXZhdGUgX3BlcnNpc3RlbmNlOiBQZXJzaXN0ZW5jZTtcbiAgcHJpdmF0ZSBfcGxhdGZvcm1JbmZvOiBJQ2xvdWRiYXNlUGxhdGZvcm1JbmZvO1xuICBwcml2YXRlIF9zdG9yYWdlOiBTdG9yYWdlSW50ZXJmYWNlO1xuICAvLyDlp4vnu4jlrZjlgqjlnKhsb2NhbHN0b3JhZ2XkuK3nmoRrZXnpm4blkIhcbiAgcHJpdmF0ZSBfYWx3YXlzTG9jYWxLZXlzOiBzdHJpbmdbXTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IElDYWNoZUNvbmZpZykge1xuICAgIGNvbnN0IHsgcGVyc2lzdGVuY2UsIHBsYXRmb3JtSW5mbz17fSxrZXlzPXt9LGFsd2F5c0xvY2FsS2V5cz1bXX0gPSBjb25maWc7XG4gICAgdGhpcy5fcGxhdGZvcm1JbmZvID0gcGxhdGZvcm1JbmZvO1xuICAgIHRoaXMuX2Fsd2F5c0xvY2FsS2V5cyA9IGFsd2F5c0xvY2FsS2V5cztcbiAgICBpZiAoIXRoaXMuX3N0b3JhZ2UpIHtcbiAgICAgIHRoaXMuX3BlcnNpc3RlbmNlID0gcGxhdGZvcm1JbmZvLmFkYXB0ZXIucHJpbWFyeVN0b3JhZ2UgfHwgcGVyc2lzdGVuY2U7XG4gICAgICB0aGlzLl9zdG9yYWdlID0gY3JlYXRlU3RvcmFnZSh0aGlzLl9wZXJzaXN0ZW5jZSwgcGxhdGZvcm1JbmZvLmFkYXB0ZXIpO1xuICAgICAgdGhpcy5rZXlzID0ga2V5cztcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEBnZXR0ZXIgc3RvcmFnZeaooeW8jy3lkIzmraUv5byC5q2lXG4gICAqL1xuICBnZXQgbW9kZSgpe1xuICAgIHJldHVybiB0aGlzLl9zdG9yYWdlLm1vZGUgfHwgJ3N5bmMnXG4gIH1cbiAgZ2V0IHBlcnNpc3RlbmNlKCk6UGVyc2lzdGVuY2V7XG4gICAgcmV0dXJuIHRoaXMuX3BlcnNpc3RlbmNlO1xuICB9XG4gIC8qKlxuICAgKiDlnKjkuI3lkIxwZXJzaXN0ZW5jZeS5i+mXtOi/geenu+aVsOaNrlxuICAgKiBAcGFyYW0gcGVyc2lzdGVuY2UgXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlUGVyc2lzdGVuY2UocGVyc2lzdGVuY2U6IFBlcnNpc3RlbmNlKSB7XG4gICAgaWYodGhpcy5tb2RlID09PSAnYXN5bmMnKXtcbiAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sJ2N1cnJlbnQgcGxhdGZvcm1cXCdzIHN0b3JhZ2UgaXMgYXN5bmNocm9ub3VzLCBwbGVhc2UgdXNlIHVwZGF0ZVBlcnNpc3RlbmNlQXN5bmMgaW5zdGVlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocGVyc2lzdGVuY2UgPT09IHRoaXMuX3BlcnNpc3RlbmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGlzQ3VycmVudExvY2FsID0gdGhpcy5fcGVyc2lzdGVuY2UgPT09ICdsb2NhbCc7XG4gICAgdGhpcy5fcGVyc2lzdGVuY2UgPSBwZXJzaXN0ZW5jZTtcbiAgICBjb25zdCBzdG9yYWdlID0gY3JlYXRlU3RvcmFnZShwZXJzaXN0ZW5jZSwgdGhpcy5fcGxhdGZvcm1JbmZvLmFkYXB0ZXIpO1xuICAgIC8vIOWIh+aNonBlcnNpc3RlbmNl6YeN5paw5Yib5bu6c3RvcmFnZeWvueixoVxuICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMua2V5cykge1xuICAgICAgY29uc3QgbmFtZSA9IHRoaXMua2V5c1trZXldO1xuICAgICAgLy8g5aaC5p6c5b2T5YmN5Li6bG9jYWzlubbkuJRrZXnooqvorr7lrprkuLrlp4vnu4jlrZjlgqjlnKhsb2NhbHN0b3JhZ2XkuK3vvIzliJnkuI3ov4Hnp7tcbiAgICAgIGlmIChpc0N1cnJlbnRMb2NhbCAmJiB0aGlzLl9hbHdheXNMb2NhbEtleXMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbCA9IHRoaXMuX3N0b3JhZ2UuZ2V0SXRlbShuYW1lKTtcbiAgICAgIGlmICghaXNVbmRlZmluZWQodmFsKSAmJiAhaXNOdWxsKHZhbCkpIHtcbiAgICAgICAgc3RvcmFnZS5zZXRJdGVtKG5hbWUsIHZhbCk7XG4gICAgICAgIHRoaXMuX3N0b3JhZ2UucmVtb3ZlSXRlbShuYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fc3RvcmFnZSA9IHN0b3JhZ2U7XG4gIH1cbiAgcHVibGljIGFzeW5jIHVwZGF0ZVBlcnNpc3RlbmNlQXN5bmMocGVyc2lzdGVuY2U6IFBlcnNpc3RlbmNlKSB7XG4gICAgaWYgKHBlcnNpc3RlbmNlID09PSB0aGlzLl9wZXJzaXN0ZW5jZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpc0N1cnJlbnRMb2NhbCA9IHRoaXMuX3BlcnNpc3RlbmNlID09PSAnbG9jYWwnO1xuICAgIHRoaXMuX3BlcnNpc3RlbmNlID0gcGVyc2lzdGVuY2U7XG4gICAgY29uc3Qgc3RvcmFnZSA9IGNyZWF0ZVN0b3JhZ2UocGVyc2lzdGVuY2UsIHRoaXMuX3BsYXRmb3JtSW5mby5hZGFwdGVyKTtcbiAgICAvLyDliIfmjaJwZXJzaXN0ZW5jZemHjeaWsOWIm+W7unN0b3JhZ2Xlr7nosaFcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmtleXMpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmtleXNba2V5XTtcbiAgICAgIC8vIOWmguaenOW9k+WJjeS4umxvY2Fs5bm25LiUa2V56KKr6K6+5a6a5Li65aeL57uI5a2Y5YKo5ZyobG9jYWxzdG9yYWdl5Lit77yM5YiZ5LiN6L+B56e7XG4gICAgICBpZiAoaXNDdXJyZW50TG9jYWwgJiYgdGhpcy5fYWx3YXlzTG9jYWxLZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCB2YWwgPSBhd2FpdCB0aGlzLl9zdG9yYWdlLmdldEl0ZW0obmFtZSk7XG4gICAgICBpZiAoIWlzVW5kZWZpbmVkKHZhbCkgJiYgIWlzTnVsbCh2YWwpKSB7XG4gICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShuYW1lLCB2YWwpO1xuICAgICAgICBhd2FpdCB0aGlzLl9zdG9yYWdlLnJlbW92ZUl0ZW0obmFtZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3N0b3JhZ2UgPSBzdG9yYWdlO1xuICB9XG4gIHB1YmxpYyBzZXRTdG9yZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgdmVyc2lvbj86IGFueSkge1xuICAgIGlmKHRoaXMubW9kZSA9PT0gJ2FzeW5jJyl7XG4gICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLCdjdXJyZW50IHBsYXRmb3JtXFwncyBzdG9yYWdlIGlzIGFzeW5jaHJvbm91cywgcGxlYXNlIHVzZSBzZXRTdG9yZUFzeW5jIGluc3RlZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9zdG9yYWdlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHZhbCA9IHtcbiAgICAgICAgdmVyc2lvbjogdmVyc2lvbiB8fCAnbG9jYWxDYWNoZXYxJyxcbiAgICAgICAgY29udGVudDogdmFsdWVcbiAgICAgIH07XG4gICAgICB0aGlzLl9zdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWwpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG4gIHB1YmxpYyBhc3luYyBzZXRTdG9yZUFzeW5jKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCB2ZXJzaW9uPzogYW55KSB7XG4gICAgaWYgKCF0aGlzLl9zdG9yYWdlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHZhbCA9IHtcbiAgICAgICAgdmVyc2lvbjogdmVyc2lvbiB8fCAnbG9jYWxDYWNoZXYxJyxcbiAgICAgICAgY29udGVudDogdmFsdWVcbiAgICAgIH07XG4gICAgICBhd2FpdCB0aGlzLl9zdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWwpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG4gIHB1YmxpYyBnZXRTdG9yZShrZXk6IHN0cmluZywgdmVyc2lvbj86IHN0cmluZykge1xuICAgIGlmKHRoaXMubW9kZSA9PT0gJ2FzeW5jJyl7XG4gICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLCdjdXJyZW50IHBsYXRmb3JtXFwncyBzdG9yYWdlIGlzIGFzeW5jaHJvbm91cywgcGxlYXNlIHVzZSBnZXRTdG9yZUFzeW5jIGluc3RlZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8v5rWL6K+V55So5L6L5L2/55SoXG4gICAgICBpZiAodHlwZW9mIHByb2Nlc3MhPT0ndW5kZWZpbmVkJyYmcHJvY2Vzcy5lbnY/LnRjYl90b2tlbikge1xuICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnYudGNiX3Rva2VuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuX3N0b3JhZ2UpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB2ZXJzaW9uID0gdmVyc2lvbiB8fCAnbG9jYWxDYWNoZXYxJztcblxuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLl9zdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBpZiAoY29udGVudC5pbmRleE9mKHZlcnNpb24pID49IDApIHtcbiAgICAgIGNvbnN0IGQgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgICAgcmV0dXJuIGQuY29udGVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuICBwdWJsaWMgYXN5bmMgZ2V0U3RvcmVBc3luYyhrZXk6IHN0cmluZywgdmVyc2lvbj86IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICAvL+a1i+ivleeUqOS+i+S9v+eUqFxuICAgICAgaWYgKHR5cGVvZiBwcm9jZXNzIT09J3VuZGVmaW5lZCcmJnByb2Nlc3MuZW52Py50Y2JfdG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3MuZW52LnRjYl90b2tlbjtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLl9zdG9yYWdlKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmVyc2lvbiA9IHZlcnNpb24gfHwgJ2xvY2FsQ2FjaGV2MSc7XG5cbiAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5fc3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgaWYgKCFjb250ZW50KSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRlbnQuaW5kZXhPZih2ZXJzaW9uKSA+PSAwKSB7XG4gICAgICBjb25zdCBkID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICAgIHJldHVybiBkLmNvbnRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cbiAgcHVibGljIHJlbW92ZVN0b3JlKGtleTpzdHJpbmcpIHtcbiAgICBpZih0aGlzLm1vZGUgPT09ICdhc3luYycpe1xuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwnY3VycmVudCBwbGF0Zm9ybVxcJ3Mgc3RvcmFnZSBpcyBhc3luY2hyb25vdXMsIHBsZWFzZSB1c2UgcmVtb3ZlU3RvcmVBc3luYyBpbnN0ZWVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3N0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICB9XG4gIHB1YmxpYyBhc3luYyByZW1vdmVTdG9yZUFzeW5jKGtleTpzdHJpbmcpIHtcbiAgICBhd2FpdCB0aGlzLl9zdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgfVxufVxuIl19