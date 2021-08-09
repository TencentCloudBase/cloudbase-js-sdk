"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHook = exports.registerComponent = void 0;
var utilities_1 = require("@cloudbase/utilities");
var ERRORS = utilities_1.constants.ERRORS;
var components = {};
function registerComponent(app, component) {
    var name = component.name, namespace = component.namespace, entity = component.entity, injectEvents = component.injectEvents, _a = component.IIFE, IIFE = _a === void 0 ? false : _a;
    if (components[name] || (namespace && app[namespace])) {
        throw new Error(JSON.stringify({
            code: ERRORS.INVALID_OPERATION,
            msg: "Duplicate component " + name
        }));
    }
    if (IIFE) {
        if (!entity || typeof entity !== 'function') {
            throw new Error(JSON.stringify({
                code: ERRORS.INVALID_PARAMS,
                msg: 'IIFE component\'s entity must be a function'
            }));
        }
        entity.call(app);
    }
    components[name] = component;
    if (namespace) {
        app.prototype[namespace] = entity;
    }
    else {
        deepExtend(app.prototype, entity);
    }
    if (injectEvents) {
        var bus = injectEvents.bus, events = injectEvents.events;
        if (!bus || !events || events.length === 0) {
            return;
        }
        var originCallback_1 = app.prototype.fire || function () { };
        if (!app.prototype.events) {
            app.prototype.events = {};
        }
        var originEvents = app.prototype.events || {};
        if (originEvents[name]) {
            app.prototype.events[name].events = __spreadArrays(app.prototype.events[name].events, events);
        }
        else {
            app.prototype.events[name] = { bus: bus, events: events };
        }
        app.prototype.fire = function (eventName, data) {
            originCallback_1(eventName, data);
            for (var name_1 in this.events) {
                var _a = this.events[name_1], bus_1 = _a.bus, eventList = _a.events;
                if (eventList.includes(eventName)) {
                    bus_1.fire(eventName, data);
                    break;
                }
            }
        };
    }
}
exports.registerComponent = registerComponent;
function deepExtend(target, source) {
    if (!(source instanceof Object)) {
        return source;
    }
    switch (source.constructor) {
        case Date:
            var dateValue = source;
            return new Date(dateValue.getTime());
        case Object:
            if (target === undefined) {
                target = {};
            }
            break;
        case Array:
            target = [];
            break;
        default:
            return source;
    }
    for (var key in source) {
        if (!source.hasOwnProperty(key)) {
            continue;
        }
        target[key] = deepExtend(target[key], source[key]);
    }
    return target;
}
function registerHook(app, hook) {
    var entity = hook.entity, target = hook.target;
    if (!app.prototype.hasOwnProperty(target)) {
        throw new Error(JSON.stringify({
            code: ERRORS.INVALID_OPERATION,
            msg: "target:" + target + " is not exist"
        }));
    }
    var originMethod = app.prototype[target];
    if (typeof originMethod !== 'function') {
        throw new Error(JSON.stringify({
            code: ERRORS.INVALID_OPERATION,
            msg: "target:" + target + " is not a function which is the only type supports hook"
        }));
    }
    app.prototype[target] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        entity.call.apply(entity, __spreadArrays([this], args));
        return originMethod.call.apply(originMethod, __spreadArrays([this], args));
    };
}
exports.registerHook = registerHook;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYnMvY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSxrREFBaUQ7QUFFekMsSUFBQSxNQUFNLEdBQUsscUJBQVMsT0FBZCxDQUFlO0FBRTdCLElBQU0sVUFBVSxHQUEyQixFQUFFLENBQUM7QUFFOUMsU0FBZ0IsaUJBQWlCLENBQUMsR0FBTyxFQUFDLFNBQTZCO0lBQzdELElBQUEsSUFBSSxHQUFrRCxTQUFTLEtBQTNELEVBQUUsU0FBUyxHQUF1QyxTQUFTLFVBQWhELEVBQUUsTUFBTSxHQUErQixTQUFTLE9BQXhDLEVBQUUsWUFBWSxHQUFpQixTQUFTLGFBQTFCLEVBQUUsS0FBZSxTQUFTLEtBQWQsRUFBVixJQUFJLG1CQUFDLEtBQUssS0FBQSxDQUFlO0lBRXhFLElBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFFLENBQUMsU0FBUyxJQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDO1FBQy9DLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtZQUM5QixHQUFHLEVBQUUseUJBQXVCLElBQU07U0FDbkMsQ0FBQyxDQUFDLENBQUM7S0FDTDtJQUVELElBQUcsSUFBSSxFQUFDO1FBQ04sSUFBRyxDQUFDLE1BQU0sSUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEVBQUM7WUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLGNBQWM7Z0JBQzNCLEdBQUcsRUFBRSw2Q0FBNkM7YUFDbkQsQ0FBQyxDQUFDLENBQUM7U0FDTDtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbEI7SUFFRCxVQUFVLENBQUMsSUFBSSxDQUFDLEdB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QUFHLENBQUMsQ0FBQyxDQUFDO0tBQ25EO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELFNBQWdCLFlBQVksQ0FBQyxHQUFPLEVBQUMsSUFBbUI7SUFDOUMsSUFBQSxNQUFNLEdBQWEsSUFBSSxPQUFqQixFQUFFLE1BQU0sR0FBSyxJQUFJLE9BQVQsQ0FBVTtJQUNoQyxJQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUM7UUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzdCLElBQUksRUFBRSxNQUFNLENBQUMsaUJBQWlCO1lBQzlCLEdBQUcsRUFBRSxZQUFVLE1BQU0sa0JBQWU7U0FDckMsQ0FBQyxDQUFDLENBQUM7S0FDTDtJQUNELElBQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsSUFBRyxPQUFPLFlBQVksS0FBSyxVQUFVLEVBQUM7UUFDcEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzdCLElBQUksRUFBRSxNQUFNLENBQUMsaUJBQWlCO1lBQzlCLEdBQUcsRUFBRSxZQUFVLE1BQU0sNERBQXlEO1NBQy9FLENBQUMsQ0FBQyxDQUFDO0tBQ0w7SUFDRCxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHO1FBQVMsY0FBVzthQUFYLFVBQVcsRUFBWCxxQkFBVyxFQUFYLElBQVc7WUFBWCx5QkFBVzs7UUFDMUMsTUFBTSxDQUFDLElBQUksT0FBWCxNQUFNLGtCQUFNLElBQUksR0FBSSxJQUFJLEdBQUU7UUFDMUIsT0FBTyxZQUFZLENBQUMsSUFBSSxPQUFqQixZQUFZLGtCQUFNLElBQUksR0FBSSxJQUFJLEdBQUU7SUFDekMsQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQW5CRCxvQ0FtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBLViB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNvbXBvbmVudCwgSUNsb3VkYmFzZUhvb2sgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBjb25zdGFudHMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcyc7XG5cbmNvbnN0IHsgRVJST1JTIH0gPSBjb25zdGFudHM7XG5cbmNvbnN0IGNvbXBvbmVudHM6S1Y8SUNsb3VkYmFzZUNvbXBvbmVudD4gPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQ29tcG9uZW50KGFwcDphbnksY29tcG9uZW50OklDbG91ZGJhc2VDb21wb25lbnQpe1xuICBjb25zdCB7IG5hbWUsIG5hbWVzcGFjZSwgZW50aXR5LCBpbmplY3RFdmVudHMsIElJRkU9ZmFsc2UgfSA9IGNvbXBvbmVudDtcbiAgLy8g5LiN5YWB6K646YeN5aSN5rOo5YaM5oiW5ZG95ZCN56m66Ze06YeN5ZCNXG4gIGlmKGNvbXBvbmVudHNbbmFtZV18fChuYW1lc3BhY2UmJmFwcFtuYW1lc3BhY2VdKSl7XG4gICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX09QRVJBVElPTixcbiAgICAgIG1zZzogYER1cGxpY2F0ZSBjb21wb25lbnQgJHtuYW1lfWBcbiAgICB9KSk7XG4gIH1cbiAgLy8gSUlGReexu+Wei+eahOe7hOS7tuS7pWFwcOS4unNjb3Bl5omn6KGMZW50aXR55Ye95pWw77yM5LiN5oyC6L295YiwYXBwLnByb3RvdHlwZeS4ilxuICBpZihJSUZFKXtcbiAgICBpZighZW50aXR5fHx0eXBlb2YgZW50aXR5ICE9PSAnZnVuY3Rpb24nKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgbXNnOiAnSUlGRSBjb21wb25lbnRcXCdzIGVudGl0eSBtdXN0IGJlIGEgZnVuY3Rpb24nXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGVudGl0eS5jYWxsKGFwcCk7XG4gIH1cblxuICBjb21wb25lbnRzW25hbWVdID0gY29tcG9uZW50O1xuXG4gIGlmKG5hbWVzcGFjZSl7XG4gICAgKGFwcCBhcyBhbnkpLnByb3RvdHlwZVtuYW1lc3BhY2VdID0gZW50aXR5O1xuICB9ZWxzZXtcbiAgICBkZWVwRXh0ZW5kKChhcHAgYXMgYW55KS5wcm90b3R5cGUsZW50aXR5KTtcbiAgfVxuICBpZihpbmplY3RFdmVudHMpe1xuICAgIGNvbnN0IHsgYnVzLCBldmVudHMgfSA9IGluamVjdEV2ZW50cztcbiAgICBpZighYnVzfHwhZXZlbnRzfHxldmVudHMubGVuZ3RoPT09MCl7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3Qgb3JpZ2luQ2FsbGJhY2sgPSAoYXBwIGFzIGFueSkucHJvdG90eXBlLmZpcmUgfHwgZnVuY3Rpb24oKXt9O1xuICAgIGlmKCEoYXBwIGFzIGFueSkucHJvdG90eXBlLmV2ZW50cyl7XG4gICAgICAoYXBwIGFzIGFueSkucHJvdG90eXBlLmV2ZW50cyA9IHt9O1xuICAgIH1cbiAgICBjb25zdCBvcmlnaW5FdmVudHM6S1Y8YW55PiA9IChhcHAgYXMgYW55KS5wcm90b3R5cGUuZXZlbnRzIHx8IHt9O1xuICAgIGlmKG9yaWdpbkV2ZW50c1tuYW1lXSl7XG4gICAgICAoYXBwIGFzIGFueSkucHJvdG90eXBlLmV2ZW50c1tuYW1lXS5ldmVudHMgPSBbLi4uKGFwcCBhcyBhbnkpLnByb3RvdHlwZS5ldmVudHNbbmFtZV0uZXZlbnRzLC4uLmV2ZW50c107XG4gICAgfWVsc2V7XG4gICAgICAoYXBwIGFzIGFueSkucHJvdG90eXBlLmV2ZW50c1tuYW1lXSA9IHtidXMsZXZlbnRzfTtcbiAgICB9XG4gICAgKGFwcCBhcyBhbnkpLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24oZXZlbnROYW1lOnN0cmluZyxkYXRhPzphbnkpe1xuICAgICAgb3JpZ2luQ2FsbGJhY2soZXZlbnROYW1lLGRhdGEpO1xuICAgICAgZm9yKGNvbnN0IG5hbWUgaW4gdGhpcy5ldmVudHMpe1xuICAgICAgICBjb25zdCB7IGJ1cywgZXZlbnRzOmV2ZW50TGlzdCB9ID0gdGhpcy5ldmVudHNbbmFtZV07XG4gICAgICAgIGlmKGV2ZW50TGlzdC5pbmNsdWRlcyhldmVudE5hbWUpKXtcbiAgICAgICAgICBidXMuZmlyZShldmVudE5hbWUsZGF0YSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVlcEV4dGVuZCh0YXJnZXQ6YW55LHNvdXJjZTphbnkpOktWPGFueT57XG4gIGlmICghKHNvdXJjZSBpbnN0YW5jZW9mIE9iamVjdCkpIHtcbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgc3dpdGNoIChzb3VyY2UuY29uc3RydWN0b3IpIHtcbiAgICBjYXNlIERhdGU6XG4gICAgICBjb25zdCBkYXRlVmFsdWUgPSBzb3VyY2UgYXMgRGF0ZTtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlVmFsdWUuZ2V0VGltZSgpKTtcbiAgICBjYXNlIE9iamVjdDpcbiAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0YXJnZXQgPSB7fTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQXJyYXk6XG4gICAgICB0YXJnZXQgPSBbXTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc291cmNlO1xuICB9XG4gIGZvciAoY29uc3Qga2V5IGluIHNvdXJjZSkge1xuICAgIGlmICghc291cmNlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB0YXJnZXRba2V5XSA9IGRlZXBFeHRlbmQodGFyZ2V0W2tleV0sc291cmNlW2tleV0pO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVySG9vayhhcHA6YW55LGhvb2s6SUNsb3VkYmFzZUhvb2spe1xuICBjb25zdCB7IGVudGl0eSwgdGFyZ2V0IH0gPSBob29rO1xuICBpZighYXBwLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSh0YXJnZXQpKXtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgY29kZTogRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLFxuICAgICAgbXNnOiBgdGFyZ2V0OiR7dGFyZ2V0fSBpcyBub3QgZXhpc3RgXG4gICAgfSkpO1xuICB9XG4gIGNvbnN0IG9yaWdpbk1ldGhvZCA9IGFwcC5wcm90b3R5cGVbdGFyZ2V0XTtcbiAgaWYodHlwZW9mIG9yaWdpbk1ldGhvZCAhPT0gJ2Z1bmN0aW9uJyl7XG4gICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX09QRVJBVElPTixcbiAgICAgIG1zZzogYHRhcmdldDoke3RhcmdldH0gaXMgbm90IGEgZnVuY3Rpb24gd2hpY2ggaXMgdGhlIG9ubHkgdHlwZSBzdXBwb3J0cyBob29rYFxuICAgIH0pKTtcbiAgfVxuICBhcHAucHJvdG90eXBlW3RhcmdldF0gPSBmdW5jdGlvbiguLi5hcmdzOmFueSl7XG4gICAgZW50aXR5LmNhbGwodGhpcywuLi5hcmdzKTtcbiAgICByZXR1cm4gb3JpZ2luTWV0aG9kLmNhbGwodGhpcywuLi5hcmdzKTtcbiAgfVxufSJdfQ==