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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYnMvY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSxrREFBaUQ7QUFFekMsSUFBQSxNQUFNLEdBQUsscUJBQVMsT0FBZCxDQUFlO0FBRTdCLElBQU0sVUFBVSxHQUEyQixFQUFFLENBQUM7QUFFOUMsU0FBZ0IsaUJBQWlCLENBQUMsR0FBTyxFQUFDLFNBQTZCO0lBQzdELElBQUEsSUFBSSxHQUFrRCxTQUFTLEtBQTNELEVBQUUsU0FBUyxHQUF1QyxTQUFTLFVBQWhELEVBQUUsTUFBTSxHQUErQixTQUFTLE9BQXhDLEVBQUUsWUFBWSxHQUFpQixTQUFTLGFBQTFCLEVBQUUsS0FBZSxTQUFTLEtBQWQsRUFBVixJQUFJLG1CQUFDLEtBQUssS0FBQSxDQUFlO0lBR3hFLElBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFFLENBQUMsU0FBUyxJQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDO1FBQy9DLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtZQUM5QixHQUFHLEVBQUUseUJBQXVCLElBQU07U0FDbkMsQ0FBQyxDQUFDLENBQUM7S0FDTDtJQUVELElBQUcsSUFBSSxFQUFDO1FBQ04sSUFBRyxDQUFDLE1BQU0sSUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEVBQUM7WUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLGNBQWM7Z0JBQzNCLEdBQUcsRUFBRSw2Q0FBNkM7YUFDbkQsQ0FBQyxDQUFDLENBQUM7U0FDTDtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbEI7SUFHRCxVQUFVLENBQUMsSUFBSSxDQUFDLEdB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QUFHLENBQUMsQ0FBQyxDQUFDO0tBQ25EO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELFNBQWdCLFlBQVksQ0FBQyxHQUFPLEVBQUMsSUFBbUI7SUFDOUMsSUFBQSxNQUFNLEdBQWEsSUFBSSxPQUFqQixFQUFFLE1BQU0sR0FBSyxJQUFJLE9BQVQsQ0FBVTtJQUNoQyxJQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUM7UUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzdCLElBQUksRUFBRSxNQUFNLENBQUMsaUJBQWlCO1lBQzlCLEdBQUcsRUFBRSxZQUFVLE1BQU0sa0JBQWU7U0FDckMsQ0FBQyxDQUFDLENBQUM7S0FDTDtJQUNELElBQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsSUFBRyxPQUFPLFlBQVksS0FBSyxVQUFVLEVBQUM7UUFDcEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzdCLElBQUksRUFBRSxNQUFNLENBQUMsaUJBQWlCO1lBQzlCLEdBQUcsRUFBRSxZQUFVLE1BQU0sNERBQXlEO1NBQy9FLENBQUMsQ0FBQyxDQUFDO0tBQ0w7SUFDRCxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHO1FBQVMsY0FBVzthQUFYLFVBQVcsRUFBWCxxQkFBVyxFQUFYLElBQVc7WUFBWCx5QkFBVzs7UUFDMUMsTUFBTSxDQUFDLElBQUksT0FBWCxNQUFNLGtCQUFNLElBQUksR0FBSSxJQUFJLEdBQUU7UUFDMUIsT0FBTyxZQUFZLENBQUMsSUFBSSxPQUFqQixZQUFZLGtCQUFNLElBQUksR0FBSSxJQUFJLEdBQUU7SUFDekMsQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQW5CRCxvQ0FtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBLViB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNvbXBvbmVudCwgSUNsb3VkYmFzZUhvb2sgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBjb25zdGFudHMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcyc7XG5cbmNvbnN0IHsgRVJST1JTIH0gPSBjb25zdGFudHM7XG5cbmNvbnN0IGNvbXBvbmVudHM6S1Y8SUNsb3VkYmFzZUNvbXBvbmVudD4gPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQ29tcG9uZW50KGFwcDphbnksY29tcG9uZW50OklDbG91ZGJhc2VDb21wb25lbnQpe1xuICBjb25zdCB7IG5hbWUsIG5hbWVzcGFjZSwgZW50aXR5LCBpbmplY3RFdmVudHMsIElJRkU9ZmFsc2UgfSA9IGNvbXBvbmVudDtcbiAgXG4gIC8vIOS4jeWFgeiuuOmHjeWkjeazqOWGjOaIluWRveWQjeepuumXtOmHjeWQjVxuICBpZihjb21wb25lbnRzW25hbWVdfHwobmFtZXNwYWNlJiZhcHBbbmFtZXNwYWNlXSkpe1xuICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sXG4gICAgICBtc2c6IGBEdXBsaWNhdGUgY29tcG9uZW50ICR7bmFtZX1gXG4gICAgfSkpO1xuICB9XG4gIC8vIElJRkXnsbvlnovnmoTnu4Tku7bku6VhcHDkuLpzY29wZeaJp+ihjGVudGl0eeWHveaVsO+8jOS4jeaMgui9veWIsGFwcC5wcm90b3R5cGXkuIpcbiAgaWYoSUlGRSl7XG4gICAgaWYoIWVudGl0eXx8dHlwZW9mIGVudGl0eSAhPT0gJ2Z1bmN0aW9uJyl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgIG1zZzogJ0lJRkUgY29tcG9uZW50XFwncyBlbnRpdHkgbXVzdCBiZSBhIGZ1bmN0aW9uJ1xuICAgICAgfSkpO1xuICAgIH1cbiAgICBlbnRpdHkuY2FsbChhcHApO1xuICB9XG4gIFxuXG4gIGNvbXBvbmVudHNbbmFtZV0gPSBjb21wb25lbnQ7XG5cbiAgaWYobmFtZXNwYWNlKXtcbiAgICAoYXBwIGFzIGFueSkucHJvdG90eXBlW25hbWVzcGFjZV0gPSBlbnRpdHk7XG4gIH1lbHNle1xuICAgIGRlZXBFeHRlbmQoKGFwcCBhcyBhbnkpLnByb3RvdHlwZSxlbnRpdHkpO1xuICB9XG4gIGlmKGluamVjdEV2ZW50cyl7XG4gICAgY29uc3QgeyBidXMsIGV2ZW50cyB9ID0gaW5qZWN0RXZlbnRzO1xuICAgIGlmKCFidXN8fCFldmVudHN8fGV2ZW50cy5sZW5ndGg9PT0wKXtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBvcmlnaW5DYWxsYmFjayA9IChhcHAgYXMgYW55KS5wcm90b3R5cGUuZmlyZSB8fCBmdW5jdGlvbigpe307XG4gICAgaWYoIShhcHAgYXMgYW55KS5wcm90b3R5cGUuZXZlbnRzKXtcbiAgICAgIChhcHAgYXMgYW55KS5wcm90b3R5cGUuZXZlbnRzID0ge307XG4gICAgfVxuICAgIGNvbnN0IG9yaWdpbkV2ZW50czpLVjxhbnk+ID0gKGFwcCBhcyBhbnkpLnByb3RvdHlwZS5ldmVudHMgfHwge307XG4gICAgaWYob3JpZ2luRXZlbnRzW25hbWVdKXtcbiAgICAgIChhcHAgYXMgYW55KS5wcm90b3R5cGUuZXZlbnRzW25hbWVdLmV2ZW50cyA9IFsuLi4oYXBwIGFzIGFueSkucHJvdG90eXBlLmV2ZW50c1tuYW1lXS5ldmVudHMsLi4uZXZlbnRzXTtcbiAgICB9ZWxzZXtcbiAgICAgIChhcHAgYXMgYW55KS5wcm90b3R5cGUuZXZlbnRzW25hbWVdID0ge2J1cyxldmVudHN9O1xuICAgIH1cbiAgICAoYXBwIGFzIGFueSkucHJvdG90eXBlLmZpcmUgPSBmdW5jdGlvbihldmVudE5hbWU6c3RyaW5nLGRhdGE/OmFueSl7XG4gICAgICBvcmlnaW5DYWxsYmFjayhldmVudE5hbWUsZGF0YSk7XG4gICAgICBmb3IoY29uc3QgbmFtZSBpbiB0aGlzLmV2ZW50cyl7XG4gICAgICAgIGNvbnN0IHsgYnVzLCBldmVudHM6ZXZlbnRMaXN0IH0gPSB0aGlzLmV2ZW50c1tuYW1lXTtcbiAgICAgICAgaWYoZXZlbnRMaXN0LmluY2x1ZGVzKGV2ZW50TmFtZSkpe1xuICAgICAgICAgIGJ1cy5maXJlKGV2ZW50TmFtZSxkYXRhKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkZWVwRXh0ZW5kKHRhcmdldDphbnksc291cmNlOmFueSk6S1Y8YW55PntcbiAgaWYgKCEoc291cmNlIGluc3RhbmNlb2YgT2JqZWN0KSkge1xuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICBzd2l0Y2ggKHNvdXJjZS5jb25zdHJ1Y3Rvcikge1xuICAgIGNhc2UgRGF0ZTpcbiAgICAgIGNvbnN0IGRhdGVWYWx1ZSA9IHNvdXJjZSBhcyBEYXRlO1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKGRhdGVWYWx1ZS5nZXRUaW1lKCkpO1xuICAgIGNhc2UgT2JqZWN0OlxuICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRhcmdldCA9IHt9O1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBcnJheTpcbiAgICAgIHRhcmdldCA9IFtdO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzb3VyY2U7XG4gIH1cbiAgZm9yIChjb25zdCBrZXkgaW4gc291cmNlKSB7XG4gICAgaWYgKCFzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHRhcmdldFtrZXldID0gZGVlcEV4dGVuZCh0YXJnZXRba2V5XSxzb3VyY2Vba2V5XSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJIb29rKGFwcDphbnksaG9vazpJQ2xvdWRiYXNlSG9vayl7XG4gIGNvbnN0IHsgZW50aXR5LCB0YXJnZXQgfSA9IGhvb2s7XG4gIGlmKCFhcHAucHJvdG90eXBlLmhhc093blByb3BlcnR5KHRhcmdldCkpe1xuICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sXG4gICAgICBtc2c6IGB0YXJnZXQ6JHt0YXJnZXR9IGlzIG5vdCBleGlzdGBcbiAgICB9KSk7XG4gIH1cbiAgY29uc3Qgb3JpZ2luTWV0aG9kID0gYXBwLnByb3RvdHlwZVt0YXJnZXRdO1xuICBpZih0eXBlb2Ygb3JpZ2luTWV0aG9kICE9PSAnZnVuY3Rpb24nKXtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgY29kZTogRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLFxuICAgICAgbXNnOiBgdGFyZ2V0OiR7dGFyZ2V0fSBpcyBub3QgYSBmdW5jdGlvbiB3aGljaCBpcyB0aGUgb25seSB0eXBlIHN1cHBvcnRzIGhvb2tgXG4gICAgfSkpO1xuICB9XG4gIGFwcC5wcm90b3R5cGVbdGFyZ2V0XSA9IGZ1bmN0aW9uKC4uLmFyZ3M6YW55KXtcbiAgICBlbnRpdHkuY2FsbCh0aGlzLC4uLmFyZ3MpO1xuICAgIHJldHVybiBvcmlnaW5NZXRob2QuY2FsbCh0aGlzLC4uLmFyZ3MpO1xuICB9XG59Il19