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
        var persistence = config.persistence, _a = config.platformInfo, platformInfo = _a === void 0 ? {} : _a, _b = config.keys, keys = _b === void 0 ? {} : _b;
        this._platformInfo = platformInfo;
        if (!this._storage) {
            this._persistence = this._platformInfo.adapter.primaryStorage || persistence;
            this._storage = createStorage(this._persistence, this._platformInfo.adapter);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGlicy9jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQXNHO0FBR3RHLCtCQUFtQztBQUNuQywwQ0FBa0Q7QUFLbEQ7SUFBNkIsa0NBQWU7SUFFMUMsd0JBQVksSUFBUztRQUFyQixZQUNFLGlCQUFPLFNBS1I7UUFKQyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQzdCOztJQUNILENBQUM7SUFDTSxnQ0FBTyxHQUFkLFVBQWUsR0FBVyxFQUFFLEtBQVU7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUM1QyxDQUFDO0lBQ00sZ0NBQU8sR0FBZCxVQUFlLEdBQVc7UUFDeEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNNLG1DQUFVLEdBQWpCLFVBQWtCLEdBQVc7UUFDM0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNNLDhCQUFLLEdBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBckJELENBQTZCLG1DQUFlLEdBcUIzQztBQUlELFNBQVMsYUFBYSxDQUFDLFdBQXdCLEVBQUUsT0FBNEI7SUFDM0UsUUFBUSxXQUFXLEVBQUU7UUFDbkIsS0FBSyxP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LENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNZLHlDQUFnQixHQUE3QixVQUE4QixHQUFXOzs7OzRCQUN2QyxXQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFBOzt3QkFBbkMsU0FBbUMsQ0FBQzs7Ozs7S0FDckM7SUFDSCxxQkFBQztBQUFELENBQUMsQUExSUQsSUEwSUM7QUExSVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdG9yYWdlSW50ZXJmYWNlLCBBYnN0cmFjdFN0b3JhZ2UsIFNES0FkYXB0ZXJJbnRlcmZhY2UgfSBmcm9tICdAY2xvdWRiYXNlL2FkYXB0ZXItaW50ZXJmYWNlJztcbmltcG9ydCB7IElDbG91ZGJhc2VDYWNoZSwgSUNhY2hlQ29uZmlnIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSc7XG5pbXBvcnQgeyBLViwgUGVyc2lzdGVuY2UsIElDbG91ZGJhc2VQbGF0Zm9ybUluZm8gfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcbmltcG9ydCB7IHByaW50V2FybiB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBFUlJPUlMsIGdldFNka05hbWUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIHBlcnNpdGVuY2U9bm9uZeaXtueZu+W9leaAgeS/neWtmOWcqOWGheWtmOS4rVxuICovXG5jbGFzcyBUY2JDYWNoZU9iamVjdCBleHRlbmRzIEFic3RyYWN0U3RvcmFnZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3Jvb3Q6IGFueTtcbiAgY29uc3RydWN0b3Iocm9vdDogYW55KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9yb290ID0gcm9vdDtcbiAgICBpZiAoIXJvb3RbJ3RjYkNhY2hlT2JqZWN0J10pIHtcbiAgICAgIHJvb3RbJ3RjYkNhY2hlT2JqZWN0J10gPSB7fTtcbiAgICB9XG4gIH1cbiAgcHVibGljIHNldEl0ZW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9yb290Wyd0Y2JDYWNoZU9iamVjdCddW2tleV0gPSB2YWx1ZTtcbiAgfVxuICBwdWJsaWMgZ2V0SXRlbShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLl9yb290Wyd0Y2JDYWNoZU9iamVjdCddW2tleV07XG4gIH1cbiAgcHVibGljIHJlbW92ZUl0ZW0oa2V5OiBzdHJpbmcpIHtcbiAgICBkZWxldGUgdGhpcy5fcm9vdFsndGNiQ2FjaGVPYmplY3QnXVtrZXldO1xuICB9XG4gIHB1YmxpYyBjbGVhcigpIHtcbiAgICBkZWxldGUgdGhpcy5fcm9vdFsndGNiQ2FjaGVPYmplY3QnXTtcbiAgfVxufVxuLyoqXG4gKiDlt6XljoLlh73mlbBcbiAqL1xuZnVuY3Rpb24gY3JlYXRlU3RvcmFnZShwZXJzaXN0ZW5jZTogUGVyc2lzdGVuY2UsIGFkYXB0ZXI6IFNES0FkYXB0ZXJJbnRlcmZhY2UpOiBTdG9yYWdlSW50ZXJmYWNlIHtcbiAgc3dpdGNoIChwZXJzaXN0ZW5jZSkge1xuICAgIGNhc2UgJ2xvY2FsJzpcbiAgICAgIGlmICghYWRhcHRlci5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ2xvY2FsU3RvcmFnZSBpcyBub3Qgc3VwcG9ydGVkIG9uIGN1cnJlbnQgcGxhdGZvcm0nKTtcbiAgICAgICAgLy8g5LiN5pSv5oyBbG9jYWxzdG9yYWdl55qE5bmz5Y+w6ZmN57qn5Li6bm9uZVxuICAgICAgICByZXR1cm4gbmV3IFRjYkNhY2hlT2JqZWN0KGFkYXB0ZXIucm9vdCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWRhcHRlci5sb2NhbFN0b3JhZ2VcbiAgICBjYXNlICdub25lJzpcbiAgICAgIHJldHVybiBuZXcgVGNiQ2FjaGVPYmplY3QoYWRhcHRlci5yb290KTtcbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKCFhZGFwdGVyLmxvY2FsU3RvcmFnZSkge1xuICAgICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfUEFSQU1TLCAnbG9jYWxTdG9yYWdlIGlzIG5vdCBzdXBwb3J0ZWQgb24gY3VycmVudCBwbGF0Zm9ybScpO1xuICAgICAgICAvLyDkuI3mlK/mjIFsb2NhbHN0b3JhZ2XnmoTlubPlj7DpmY3nuqfkuLpub25lXG4gICAgICAgIHJldHVybiBuZXcgVGNiQ2FjaGVPYmplY3QoYWRhcHRlci5yb290KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhZGFwdGVyLmxvY2FsU3RvcmFnZTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2xvdWRiYXNlQ2FjaGUgaW1wbGVtZW50cyBJQ2xvdWRiYXNlQ2FjaGUge1xuICBwdWJsaWMga2V5czogS1Y8c3RyaW5nPiA9IHt9O1xuXG4gIHByaXZhdGUgX3BlcnNpc3RlbmNlOiBQZXJzaXN0ZW5jZTtcbiAgcHJpdmF0ZSBfcGxhdGZvcm1JbmZvOiBJQ2xvdWRiYXNlUGxhdGZvcm1JbmZvO1xuICBwcml2YXRlIF9zdG9yYWdlOiBTdG9yYWdlSW50ZXJmYWNlO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSUNhY2hlQ29uZmlnKSB7XG4gICAgY29uc3QgeyBwZXJzaXN0ZW5jZSwgcGxhdGZvcm1JbmZvID0ge30sIGtleXMgPSB7fSB9ID0gY29uZmlnO1xuICAgIHRoaXMuX3BsYXRmb3JtSW5mbyA9IHBsYXRmb3JtSW5mbztcbiAgICBpZiAoIXRoaXMuX3N0b3JhZ2UpIHtcbiAgICAgIHRoaXMuX3BlcnNpc3RlbmNlID0gdGhpcy5fcGxhdGZvcm1JbmZvLmFkYXB0ZXIucHJpbWFyeVN0b3JhZ2UgfHwgcGVyc2lzdGVuY2U7XG4gICAgICB0aGlzLl9zdG9yYWdlID0gY3JlYXRlU3RvcmFnZSh0aGlzLl9wZXJzaXN0ZW5jZSwgdGhpcy5fcGxhdGZvcm1JbmZvLmFkYXB0ZXIpO1xuICAgICAgdGhpcy5rZXlzID0ga2V5cztcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEBnZXR0ZXIgc3RvcmFnZeaooeW8jy3lkIzmraUv5byC5q2lXG4gICAqL1xuICBnZXQgbW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RvcmFnZS5tb2RlIHx8ICdzeW5jJ1xuICB9XG4gIGdldCBwZXJzaXN0ZW5jZSgpOiBQZXJzaXN0ZW5jZSB7XG4gICAgcmV0dXJuIHRoaXMuX3BlcnNpc3RlbmNlO1xuICB9XG5cbiAgcHVibGljIHNldFN0b3JlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCB2ZXJzaW9uPzogYW55KSB7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ2FzeW5jJykge1xuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwgJ2N1cnJlbnQgcGxhdGZvcm1cXCdzIHN0b3JhZ2UgaXMgYXN5bmNocm9ub3VzLCBwbGVhc2UgdXNlIHNldFN0b3JlQXN5bmMgaW5zdGVlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuX3N0b3JhZ2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdmFsID0ge1xuICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uIHx8ICdsb2NhbENhY2hldjEnLFxuICAgICAgICBjb250ZW50OiB2YWx1ZVxuICAgICAgfTtcbiAgICAgIHRoaXMuX3N0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5PUEVSQVRJT05fRkFJTCxcbiAgICAgICAgbXNnOiBgWyR7Z2V0U2RrTmFtZSgpfV1bJHtFUlJPUlMuT1BFUkFUSU9OX0ZBSUx9XXNldFN0b3JlIGZhaWxlZGAsXG4gICAgICAgIGluZm86IGVcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cbiAgcHVibGljIGFzeW5jIHNldFN0b3JlQXN5bmMoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIHZlcnNpb24/OiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuX3N0b3JhZ2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdmFsID0ge1xuICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uIHx8ICdsb2NhbENhY2hldjEnLFxuICAgICAgICBjb250ZW50OiB2YWx1ZVxuICAgICAgfTtcbiAgICAgIGF3YWl0IHRoaXMuX3N0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cbiAgcHVibGljIGdldFN0b3JlKGtleTogc3RyaW5nLCB2ZXJzaW9uPzogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ2FzeW5jJykge1xuICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX09QRVJBVElPTiwgJ2N1cnJlbnQgcGxhdGZvcm1cXCdzIHN0b3JhZ2UgaXMgYXN5bmNocm9ub3VzLCBwbGVhc2UgdXNlIGdldFN0b3JlQXN5bmMgaW5zdGVlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy/mtYvor5XnlKjkvovkvb/nlKhcbiAgICAgIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5lbnY/LnRjYl90b2tlbikge1xuICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnYudGNiX3Rva2VuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuX3N0b3JhZ2UpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB2ZXJzaW9uID0gdmVyc2lvbiB8fCAnbG9jYWxDYWNoZXYxJztcblxuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLl9zdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBpZiAoY29udGVudC5pbmRleE9mKHZlcnNpb24pID49IDApIHtcbiAgICAgIGNvbnN0IGQgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgICAgcmV0dXJuIGQuY29udGVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuICBwdWJsaWMgYXN5bmMgZ2V0U3RvcmVBc3luYyhrZXk6IHN0cmluZywgdmVyc2lvbj86IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICAvL+a1i+ivleeUqOS+i+S9v+eUqFxuICAgICAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmVudj8udGNiX3Rva2VuKSB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzLmVudi50Y2JfdG9rZW47XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5fc3RvcmFnZSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHZlcnNpb24gPSB2ZXJzaW9uIHx8ICdsb2NhbENhY2hldjEnO1xuXG4gICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMuX3N0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgIGlmICghY29udGVudCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGlmIChjb250ZW50LmluZGV4T2YodmVyc2lvbikgPj0gMCkge1xuICAgICAgY29uc3QgZCA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgICByZXR1cm4gZC5jb250ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG4gIHB1YmxpYyByZW1vdmVTdG9yZShrZXk6IHN0cmluZykge1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICdhc3luYycpIHtcbiAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sICdjdXJyZW50IHBsYXRmb3JtXFwncyBzdG9yYWdlIGlzIGFzeW5jaHJvbm91cywgcGxlYXNlIHVzZSByZW1vdmVTdG9yZUFzeW5jIGluc3RlZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gIH1cbiAgcHVibGljIGFzeW5jIHJlbW92ZVN0b3JlQXN5bmMoa2V5OiBzdHJpbmcpIHtcbiAgICBhd2FpdCB0aGlzLl9zdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgfVxufVxuIl19