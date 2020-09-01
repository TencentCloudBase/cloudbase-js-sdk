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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEventListener = exports.activateEvent = exports.addEventListener = exports.CloudbaseEventEmitter = exports.IErrorEvent = exports.CloudbaseEvent = void 0;
var util_1 = require("./util");
function _addEventListener(name, listener, listeners) {
    listeners[name] = listeners[name] || [];
    listeners[name].push(listener);
}
function _removeEventListener(name, listener, listeners) {
    if (listeners === null || listeners === void 0 ? void 0 : listeners[name]) {
        var index = listeners[name].indexOf(listener);
        if (index !== -1) {
            listeners[name].splice(index, 1);
        }
    }
}
var CloudbaseEvent = (function () {
    function CloudbaseEvent(name, data) {
        this.data = data || null;
        this.name = name;
    }
    return CloudbaseEvent;
}());
exports.CloudbaseEvent = CloudbaseEvent;
var IErrorEvent = (function (_super) {
    __extends(IErrorEvent, _super);
    function IErrorEvent(error, data) {
        var _this = _super.call(this, 'error', { error: error, data: data }) || this;
        _this.error = error;
        return _this;
    }
    return IErrorEvent;
}(CloudbaseEvent));
exports.IErrorEvent = IErrorEvent;
var CloudbaseEventEmitter = (function () {
    function CloudbaseEventEmitter() {
        this._listeners = {};
    }
    CloudbaseEventEmitter.prototype.on = function (name, listener) {
        _addEventListener(name, listener, this._listeners);
        return this;
    };
    CloudbaseEventEmitter.prototype.off = function (name, listener) {
        _removeEventListener(name, listener, this._listeners);
        return this;
    };
    CloudbaseEventEmitter.prototype.fire = function (event, data) {
        if (util_1.isInstanceOf(event, IErrorEvent)) {
            console.error(event.error);
            return this;
        }
        var ev = util_1.isString(event) ? new CloudbaseEvent(event, data || {}) : event;
        var name = ev.name;
        if (this._listens(name)) {
            ev.target = this;
            var handlers = this._listeners[name] ? __spreadArrays(this._listeners[name]) : [];
            for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
                var fn = handlers_1[_i];
                fn.call(this, ev);
            }
        }
        return this;
    };
    CloudbaseEventEmitter.prototype._listens = function (name) {
        return this._listeners[name] && this._listeners[name].length > 0;
    };
    return CloudbaseEventEmitter;
}());
exports.CloudbaseEventEmitter = CloudbaseEventEmitter;
var eventEmitter = new CloudbaseEventEmitter();
function addEventListener(event, callback) {
    eventEmitter.on(event, callback);
}
exports.addEventListener = addEventListener;
function activateEvent(event, data) {
    if (data === void 0) { data = {}; }
    eventEmitter.fire(event, data);
}
exports.activateEvent = activateEvent;
function removeEventListener(event, callback) {
    eventEmitter.off(event, callback);
}
exports.removeEventListener = removeEventListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYnMvZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQWdEO0FBV2hELFNBQVMsaUJBQWlCLENBQUMsSUFBWSxFQUFFLFFBQWtCLEVBQUUsU0FBb0I7SUFDL0UsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBUUQsU0FBUyxvQkFBb0IsQ0FBQyxJQUFZLEVBQUUsUUFBa0IsRUFBRSxTQUFvQjtJQUNsRixJQUFJLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRyxJQUFJLEdBQUc7UUFDckIsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNoQixTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNsQztLQUNGO0FBQ0gsQ0FBQztBQVlEO0lBS0Usd0JBQVksSUFBWSxFQUFFLElBQVM7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVFksd0NBQWM7QUFpQjNCO0lBQWlDLCtCQUFjO0lBRTdDLHFCQUFZLEtBQVksRUFBRSxJQUFVO1FBQXBDLFlBQ0Usa0JBQU0sT0FBTyxFQUFFLEVBQUUsS0FBSyxPQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxTQUVoQztRQURDLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOztJQUNyQixDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBTkQsQ0FBaUMsY0FBYyxHQU05QztBQU5ZLGtDQUFXO0FBV3hCO0lBQUE7UUFPbUIsZUFBVSxHQUFjLEVBQUUsQ0FBQztJQThEOUMsQ0FBQztJQXJEUSxrQ0FBRSxHQUFULFVBQVUsSUFBWSxFQUFFLFFBQWtCO1FBQ3hDLGlCQUFpQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQVFNLG1DQUFHLEdBQVYsVUFBVyxJQUFZLEVBQUUsUUFBa0I7UUFDekMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBT00sb0NBQUksR0FBWCxVQUFZLEtBQThCLEVBQUUsSUFBVTtRQUVwRCxJQUFJLG1CQUFZLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxFQUFFO1lBQ3BDLE9BQU8sQ0FBQyxLQUFLLENBQUUsS0FBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QyxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBTSxFQUFFLEdBQW1CLGVBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxjQUFjLENBQUMsS0FBZSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBdUIsQ0FBQztRQUV2SCxJQUFNLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO1FBRXJCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN2QixFQUFFLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUVqQixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsZ0JBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3pFLEtBQWlCLFVBQVEsRUFBUixxQkFBUSxFQUFSLHNCQUFRLEVBQVIsSUFBUSxFQUFFO2dCQUF0QixJQUFNLEVBQUUsaUJBQUE7Z0JBQ1gsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDbkI7U0FDRjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQVFPLHdDQUFRLEdBQWhCLFVBQWlCLElBQVk7UUFDM0IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBckVELElBcUVDO0FBckVZLHNEQUFxQjtBQXlFbEMsSUFBTSxZQUFZLEdBQUcsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO0FBRWpELFNBQWdCLGdCQUFnQixDQUFDLEtBQWEsRUFBRSxRQUFrQjtJQUNoRSxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRkQsNENBRUM7QUFFRCxTQUFnQixhQUFhLENBQUMsS0FBYSxFQUFFLElBQWM7SUFBZCxxQkFBQSxFQUFBLFNBQWM7SUFDekQsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUZELHNDQUVDO0FBRUQsU0FBZ0IsbUJBQW1CLENBQUMsS0FBYSxFQUFFLFFBQWtCO0lBQ25FLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFGRCxrREFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzU3RyaW5nLCBpc0luc3RhbmNlT2YgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHsgTGlzdGVuZXJzLElDbG91ZGJhc2VFdmVudEVtaXR0ZXIgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2V2ZW50cyc7XG5cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQGZ1bmN0aW9uIF9hZGRFdmVudExpc3RlbmVyIC0g5re75Yqg55uR5ZCsXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIGV2ZW505ZCN56ewXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciAtIOWTjeW6lOWHveaVsFxuICogQHBhcmFtIHtMaXN0ZW5lcnN9IGxpc3RlbmVycyAtIOW3suWtmOWTjeW6lOWHveaVsOmbhuWQiFxuICovXG5mdW5jdGlvbiBfYWRkRXZlbnRMaXN0ZW5lcihuYW1lOiBzdHJpbmcsIGxpc3RlbmVyOiBGdW5jdGlvbiwgbGlzdGVuZXJzOiBMaXN0ZW5lcnMpIHtcbiAgbGlzdGVuZXJzW25hbWVdID0gbGlzdGVuZXJzW25hbWVdIHx8IFtdO1xuICBsaXN0ZW5lcnNbbmFtZV0ucHVzaChsaXN0ZW5lcik7XG59XG4vKipcbiAqIEBwcml2YXRlXG4gKiBAZnVuY3Rpb24gX3JlbW92ZUV2ZW50TGlzdGVuZXIgLSDnp7vpmaTnm5HlkKxcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gZXZlbnTlkI3np7BcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0g5ZON5bqU5Ye95pWwXG4gKiBAcGFyYW0ge0xpc3RlbmVyc30gbGlzdGVuZXJzIC0g5bey5a2Y5ZON5bqU5Ye95pWw6ZuG5ZCIXG4gKi9cbmZ1bmN0aW9uIF9yZW1vdmVFdmVudExpc3RlbmVyKG5hbWU6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uLCBsaXN0ZW5lcnM6IExpc3RlbmVycykge1xuICBpZiAobGlzdGVuZXJzPy5bbmFtZV0pIHtcbiAgICBjb25zdCBpbmRleCA9IGxpc3RlbmVyc1tuYW1lXS5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBsaXN0ZW5lcnNbbmFtZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cbn1cbmludGVyZmFjZSBJRXZlbnQge1xuICBuYW1lOnN0cmluZztcbiAgdGFyZ2V0OiBhbnk7XG4gIGRhdGE6YW55O1xufVxuLyoqXG4gKiDoh6rlrprkuYnkuovku7ZcbiAqIEBjbGFzcyBDbG91ZGJhc2VFdmVudFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSDnsbvlnotcbiAqIEBwYXJhbSB7YW55fSBkYXRhIC0g5pWw5o2uXG4gKi9cbmV4cG9ydCBjbGFzcyBDbG91ZGJhc2VFdmVudCBpbXBsZW1lbnRzIElFdmVudHtcbiAgcHVibGljIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgcHVibGljIHRhcmdldDogYW55O1xuICBwdWJsaWMgZGF0YTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YSB8fCBudWxsO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cbn1cbi8qKlxuICog6Ieq5a6a5LmJ6ZSZ6K+v5LqL5Lu2XG4gKiBAY2xhc3MgSUVycm9yRXZlbnRcbiAqIEBleHRlbmRzIENsb3VkYmFzZUV2ZW50XG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciAtIOmUmeivr+S/oeaBr+WvueixoVxuICogQHBhcmFtIHthbnl9IGRhdGEgIC0g5pWw5o2uXG4gKi9cbmV4cG9ydCBjbGFzcyBJRXJyb3JFdmVudCBleHRlbmRzIENsb3VkYmFzZUV2ZW50IHtcbiAgcHVibGljIHJlYWRvbmx5IGVycm9yOiBFcnJvcjtcbiAgY29uc3RydWN0b3IoZXJyb3I6IEVycm9yLCBkYXRhPzogYW55KSB7XG4gICAgc3VwZXIoJ2Vycm9yJywgeyBlcnJvciwgZGF0YSB9KTtcbiAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gIH1cbn1cblxuLyoqXG4gKiBAY2xhc3MgQ2xvdWRiYXNlRXZlbnRFbWl0dGVyXG4gKi9cbmV4cG9ydCBjbGFzcyBDbG91ZGJhc2VFdmVudEVtaXR0ZXIgaW1wbGVtZW50cyBJQ2xvdWRiYXNlRXZlbnRFbWl0dGVye1xuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJlYWRvbmx5XG4gICAqIEBwcm9wZXJ0eSB7TGlzdGVuZXJzfSBfbGlzdGVuZXJzIC0g5ZON5bqU5Ye95pWw6ZuG5ZCIXG4gICAqIEBkZWZhdWx0IGB7fWBcbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2xpc3RlbmVyczogTGlzdGVuZXJzID0ge307XG5cbiAgLyoqXG4gICAqIEBwdWJsaWNcbiAgICogQG1ldGhvZCBvbiAtIOa3u+WKoOebkeWQrFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIGV2ZW505ZCN56ewXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0g5ZON5bqU5Ye95pWwXG4gICAqIEByZXR1cm4gYHRoaXNgXG4gICAqL1xuICBwdWJsaWMgb24obmFtZTogc3RyaW5nLCBsaXN0ZW5lcjogRnVuY3Rpb24pOiB0aGlzIHtcbiAgICBfYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBsaXN0ZW5lciwgdGhpcy5fbGlzdGVuZXJzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKipcbiAgICogQHB1YmxpY1xuICAgKiBAbWV0aG9kIG9mZiAtIOenu+mZpOebkeWQrFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIGV2ZW505ZCN56ewXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0g5ZON5bqU5Ye95pWwXG4gICAqIEByZXR1cm4gYHRoaXNgXG4gICAqL1xuICBwdWJsaWMgb2ZmKG5hbWU6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKTogdGhpcyB7XG4gICAgX3JlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgbGlzdGVuZXIsIHRoaXMuX2xpc3RlbmVycyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqXG4gICAqIEBwdWJsaWNcbiAgICogQG1ldGhvZCBmaXJlIC0g6Kem5Y+R5LqL5Lu2XG4gICAqIEBwYXJhbSB7c3RyaW5nfENsb3VkYmFzZUV2ZW50fSBldmVudCAtIGV2ZW50XG4gICAqIEByZXR1cm4gYHRoaXNgXG4gICAqL1xuICBwdWJsaWMgZmlyZShldmVudDogc3RyaW5nIHwgQ2xvdWRiYXNlRXZlbnQsIGRhdGE/OiBhbnkpOiB0aGlzIHtcbiAgICAvLyDmiZPljbDplJnor6/kv6Hmga9cbiAgICBpZiAoaXNJbnN0YW5jZU9mKGV2ZW50LCBJRXJyb3JFdmVudCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoKGV2ZW50IGFzIElFcnJvckV2ZW50KS5lcnJvcik7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb25zdCBldjogQ2xvdWRiYXNlRXZlbnQgPSBpc1N0cmluZyhldmVudCkgPyBuZXcgQ2xvdWRiYXNlRXZlbnQoZXZlbnQgYXMgc3RyaW5nLCBkYXRhIHx8IHt9KSA6IGV2ZW50IGFzIENsb3VkYmFzZUV2ZW50O1xuXG4gICAgY29uc3QgbmFtZSA9IGV2Lm5hbWU7XG5cbiAgICBpZiAodGhpcy5fbGlzdGVucyhuYW1lKSkge1xuICAgICAgZXYudGFyZ2V0ID0gdGhpcztcblxuICAgICAgY29uc3QgaGFuZGxlcnMgPSB0aGlzLl9saXN0ZW5lcnNbbmFtZV0gPyBbLi4udGhpcy5fbGlzdGVuZXJzW25hbWVdXSA6IFtdO1xuICAgICAgZm9yIChjb25zdCBmbiBvZiBoYW5kbGVycykge1xuICAgICAgICBmbi5jYWxsKHRoaXMsIGV2KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWV0aG9kIF9saXN0ZW5zIC0g5Yik5pat5piv5ZCm55uR5ZCs5LqGbmFtZeS6i+S7tlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIGV2ZW505ZCN56ewXG4gICAqIEByZXR1cm4gYGJvb2xlYW5gXG4gICAqL1xuICBwcml2YXRlIF9saXN0ZW5zKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9saXN0ZW5lcnNbbmFtZV0gJiYgdGhpcy5fbGlzdGVuZXJzW25hbWVdLmxlbmd0aCA+IDA7XG4gIH1cbn1cblxuXG5cbmNvbnN0IGV2ZW50RW1pdHRlciA9IG5ldyBDbG91ZGJhc2VFdmVudEVtaXR0ZXIoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gIGV2ZW50RW1pdHRlci5vbihldmVudCwgY2FsbGJhY2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGVFdmVudChldmVudDogc3RyaW5nLCBkYXRhOiBhbnkgPSB7fSkge1xuICBldmVudEVtaXR0ZXIuZmlyZShldmVudCwgZGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICBldmVudEVtaXR0ZXIub2ZmKGV2ZW50LCBjYWxsYmFjayk7XG59Il19