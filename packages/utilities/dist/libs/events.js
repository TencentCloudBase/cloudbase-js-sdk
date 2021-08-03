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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYnMvZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQWdEO0FBV2hELFNBQVMsaUJBQWlCLENBQUMsSUFBWSxFQUFFLFFBQWtCLEVBQUUsU0FBb0I7SUFDL0UsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBUUQsU0FBUyxvQkFBb0IsQ0FBQyxJQUFZLEVBQUUsUUFBa0IsRUFBRSxTQUFvQjtJQUNsRixJQUFJLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRyxJQUFJLEdBQUc7UUFDckIsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNoQixTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNsQztLQUNGO0FBQ0gsQ0FBQztBQVlEO0lBS0Usd0JBQVksSUFBWSxFQUFFLElBQVM7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVFksd0NBQWM7QUFpQjNCO0lBQWlDLCtCQUFjO0lBRTdDLHFCQUFZLEtBQVksRUFBRSxJQUFVO1FBQXBDLFlBQ0Usa0JBQU0sT0FBTyxFQUFFLEVBQUUsS0FBSyxPQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxTQUVoQztRQURDLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOztJQUNyQixDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBTkQsQ0FBaUMsY0FBYyxHQU05QztBQU5ZLGtDQUFXO0FBV3hCO0lBQUE7UUFPbUIsZUFBVSxHQUFjLEVBQUUsQ0FBQztJQThEOUMsQ0FBQztJQXJEUSxrQ0FBRSxHQUFULFVBQVUsSUFBWSxFQUFFLFFBQWtCO1FBQ3hDLGlCQUFpQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQVFNLG1DQUFHLEdBQVYsVUFBVyxJQUFZLEVBQUUsUUFBa0I7UUFDekMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBT00sb0NBQUksR0FBWCxVQUFZLEtBQThCLEVBQUUsSUFBVTtRQUVwRCxJQUFJLG1CQUFZLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxFQUFFO1lBQ3BDLE9BQU8sQ0FBQyxLQUFLLENBQUUsS0FBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QyxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBTSxFQUFFLEdBQW1CLGVBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxjQUFjLENBQUMsS0FBZSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBdUIsQ0FBQztRQUV2SCxJQUFNLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO1FBRXJCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN2QixFQUFFLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUVqQixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsZ0JBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3pFLEtBQWlCLFVBQVEsRUFBUixxQkFBUSxFQUFSLHNCQUFRLEVBQVIsSUFBUSxFQUFFO2dCQUF0QixJQUFNLEVBQUUsaUJBQUE7Z0JBQ1gsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDbkI7U0FDRjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQVFPLHdDQUFRLEdBQWhCLFVBQWlCLElBQVk7UUFDM0IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBckVELElBcUVDO0FBckVZLHNEQUFxQjtBQXlFbEMsSUFBTSxZQUFZLEdBQUcsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO0FBRWpELFNBQWdCLGdCQUFnQixDQUFDLEtBQWEsRUFBRSxRQUFrQjtJQUNoRSxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRkQsNENBRUM7QUFFRCxTQUFnQixhQUFhLENBQUMsS0FBYSxFQUFFLElBQWM7SUFBZCxxQkFBQSxFQUFBLFNBQWM7SUFDekQsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUZELHNDQUVDO0FBRUQsU0FBZ0IsbUJBQW1CLENBQUMsS0FBYSxFQUFFLFFBQWtCO0lBQ25FLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFGRCxrREFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzU3RyaW5nLCBpc0luc3RhbmNlT2YgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHsgTGlzdGVuZXJzLCBJQ2xvdWRiYXNlRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9ldmVudHMnO1xuXG5cbi8qKlxuICogQHByaXZhdGVcbiAqIEBmdW5jdGlvbiBfYWRkRXZlbnRMaXN0ZW5lciAtIOa3u+WKoOebkeWQrFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBldmVudOWQjeensFxuICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgLSDlk43lupTlh73mlbBcbiAqIEBwYXJhbSB7TGlzdGVuZXJzfSBsaXN0ZW5lcnMgLSDlt7LlrZjlk43lupTlh73mlbDpm4blkIhcbiAqL1xuZnVuY3Rpb24gX2FkZEV2ZW50TGlzdGVuZXIobmFtZTogc3RyaW5nLCBsaXN0ZW5lcjogRnVuY3Rpb24sIGxpc3RlbmVyczogTGlzdGVuZXJzKSB7XG4gIGxpc3RlbmVyc1tuYW1lXSA9IGxpc3RlbmVyc1tuYW1lXSB8fCBbXTtcbiAgbGlzdGVuZXJzW25hbWVdLnB1c2gobGlzdGVuZXIpO1xufVxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQGZ1bmN0aW9uIF9yZW1vdmVFdmVudExpc3RlbmVyIC0g56e76Zmk55uR5ZCsXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIGV2ZW505ZCN56ewXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciAtIOWTjeW6lOWHveaVsFxuICogQHBhcmFtIHtMaXN0ZW5lcnN9IGxpc3RlbmVycyAtIOW3suWtmOWTjeW6lOWHveaVsOmbhuWQiFxuICovXG5mdW5jdGlvbiBfcmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lOiBzdHJpbmcsIGxpc3RlbmVyOiBGdW5jdGlvbiwgbGlzdGVuZXJzOiBMaXN0ZW5lcnMpIHtcbiAgaWYgKGxpc3RlbmVycz8uW25hbWVdKSB7XG4gICAgY29uc3QgaW5kZXggPSBsaXN0ZW5lcnNbbmFtZV0uaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgbGlzdGVuZXJzW25hbWVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG59XG5pbnRlcmZhY2UgSUV2ZW50IHtcbiAgbmFtZTogc3RyaW5nO1xuICB0YXJnZXQ6IGFueTtcbiAgZGF0YTogYW55O1xufVxuLyoqXG4gKiDoh6rlrprkuYnkuovku7ZcbiAqIEBjbGFzcyBDbG91ZGJhc2VFdmVudFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSDnsbvlnotcbiAqIEBwYXJhbSB7YW55fSBkYXRhIC0g5pWw5o2uXG4gKi9cbmV4cG9ydCBjbGFzcyBDbG91ZGJhc2VFdmVudCBpbXBsZW1lbnRzIElFdmVudCB7XG4gIHB1YmxpYyByZWFkb25seSBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyB0YXJnZXQ6IGFueTtcbiAgcHVibGljIGRhdGE6IGFueTtcblxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGEgfHwgbnVsbDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG59XG4vKipcbiAqIOiHquWumuS5iemUmeivr+S6i+S7tlxuICogQGNsYXNzIElFcnJvckV2ZW50XG4gKiBAZXh0ZW5kcyBDbG91ZGJhc2VFdmVudFxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgLSDplJnor6/kv6Hmga/lr7nosaFcbiAqIEBwYXJhbSB7YW55fSBkYXRhICAtIOaVsOaNrlxuICovXG5leHBvcnQgY2xhc3MgSUVycm9yRXZlbnQgZXh0ZW5kcyBDbG91ZGJhc2VFdmVudCB7XG4gIHB1YmxpYyByZWFkb25seSBlcnJvcjogRXJyb3I7XG4gIGNvbnN0cnVjdG9yKGVycm9yOiBFcnJvciwgZGF0YT86IGFueSkge1xuICAgIHN1cGVyKCdlcnJvcicsIHsgZXJyb3IsIGRhdGEgfSk7XG4gICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICB9XG59XG5cbi8qKlxuICogQGNsYXNzIENsb3VkYmFzZUV2ZW50RW1pdHRlclxuICovXG5leHBvcnQgY2xhc3MgQ2xvdWRiYXNlRXZlbnRFbWl0dGVyIGltcGxlbWVudHMgSUNsb3VkYmFzZUV2ZW50RW1pdHRlciB7XG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmVhZG9ubHlcbiAgICogQHByb3BlcnR5IHtMaXN0ZW5lcnN9IF9saXN0ZW5lcnMgLSDlk43lupTlh73mlbDpm4blkIhcbiAgICogQGRlZmF1bHQgYHt9YFxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfbGlzdGVuZXJzOiBMaXN0ZW5lcnMgPSB7fTtcblxuICAvKipcbiAgICogQHB1YmxpY1xuICAgKiBAbWV0aG9kIG9uIC0g5re75Yqg55uR5ZCsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gZXZlbnTlkI3np7BcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgLSDlk43lupTlh73mlbBcbiAgICogQHJldHVybiBgdGhpc2BcbiAgICovXG4gIHB1YmxpYyBvbihuYW1lOiBzdHJpbmcsIGxpc3RlbmVyOiBGdW5jdGlvbik6IHRoaXMge1xuICAgIF9hZGRFdmVudExpc3RlbmVyKG5hbWUsIGxpc3RlbmVyLCB0aGlzLl9saXN0ZW5lcnMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKlxuICAgKiBAcHVibGljXG4gICAqIEBtZXRob2Qgb2ZmIC0g56e76Zmk55uR5ZCsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gZXZlbnTlkI3np7BcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgLSDlk43lupTlh73mlbBcbiAgICogQHJldHVybiBgdGhpc2BcbiAgICovXG4gIHB1YmxpYyBvZmYobmFtZTogc3RyaW5nLCBsaXN0ZW5lcjogRnVuY3Rpb24pOiB0aGlzIHtcbiAgICBfcmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBsaXN0ZW5lciwgdGhpcy5fbGlzdGVuZXJzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKipcbiAgICogQHB1YmxpY1xuICAgKiBAbWV0aG9kIGZpcmUgLSDop6blj5Hkuovku7ZcbiAgICogQHBhcmFtIHtzdHJpbmd8Q2xvdWRiYXNlRXZlbnR9IGV2ZW50IC0gZXZlbnRcbiAgICogQHJldHVybiBgdGhpc2BcbiAgICovXG4gIHB1YmxpYyBmaXJlKGV2ZW50OiBzdHJpbmcgfCBDbG91ZGJhc2VFdmVudCwgZGF0YT86IGFueSk6IHRoaXMge1xuICAgIC8vIOaJk+WNsOmUmeivr+S/oeaBr1xuICAgIGlmIChpc0luc3RhbmNlT2YoZXZlbnQsIElFcnJvckV2ZW50KSkge1xuICAgICAgY29uc29sZS5lcnJvcigoZXZlbnQgYXMgSUVycm9yRXZlbnQpLmVycm9yKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvbnN0IGV2OiBDbG91ZGJhc2VFdmVudCA9IGlzU3RyaW5nKGV2ZW50KSA/IG5ldyBDbG91ZGJhc2VFdmVudChldmVudCBhcyBzdHJpbmcsIGRhdGEgfHwge30pIDogZXZlbnQgYXMgQ2xvdWRiYXNlRXZlbnQ7XG5cbiAgICBjb25zdCBuYW1lID0gZXYubmFtZTtcblxuICAgIGlmICh0aGlzLl9saXN0ZW5zKG5hbWUpKSB7XG4gICAgICBldi50YXJnZXQgPSB0aGlzO1xuXG4gICAgICBjb25zdCBoYW5kbGVycyA9IHRoaXMuX2xpc3RlbmVyc1tuYW1lXSA/IFsuLi50aGlzLl9saXN0ZW5lcnNbbmFtZV1dIDogW107XG4gICAgICBmb3IgKGNvbnN0IGZuIG9mIGhhbmRsZXJzKSB7XG4gICAgICAgIGZuLmNhbGwodGhpcywgZXYpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZXRob2QgX2xpc3RlbnMgLSDliKTmlq3mmK/lkKbnm5HlkKzkuoZuYW1l5LqL5Lu2XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gZXZlbnTlkI3np7BcbiAgICogQHJldHVybiBgYm9vbGVhbmBcbiAgICovXG4gIHByaXZhdGUgX2xpc3RlbnMobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyc1tuYW1lXSAmJiB0aGlzLl9saXN0ZW5lcnNbbmFtZV0ubGVuZ3RoID4gMDtcbiAgfVxufVxuXG5cblxuY29uc3QgZXZlbnRFbWl0dGVyID0gbmV3IENsb3VkYmFzZUV2ZW50RW1pdHRlcigpO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcihldmVudDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgZXZlbnRFbWl0dGVyLm9uKGV2ZW50LCBjYWxsYmFjayk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhY3RpdmF0ZUV2ZW50KGV2ZW50OiBzdHJpbmcsIGRhdGE6IGFueSA9IHt9KSB7XG4gIGV2ZW50RW1pdHRlci5maXJlKGV2ZW50LCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gIGV2ZW50RW1pdHRlci5vZmYoZXZlbnQsIGNhbGxiYWNrKTtcbn0iXX0=