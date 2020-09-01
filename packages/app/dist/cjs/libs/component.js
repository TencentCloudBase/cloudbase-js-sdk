"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerComponent = void 0;
var utilities_1 = require("@cloudbase/utilities");
var common_1 = require("../constants/common");
var ERRORS = utilities_1.constants.ERRORS;
var components = {};
function registerComponent(app, component) {
    var name = component.name, namespace = component.namespace, entity = component.entity, injectEvents = component.injectEvents;
    if (components[name] || (namespace && app[namespace])) {
        throw new Error("[" + common_1.getSdkName() + "][" + ERRORS.INVALID_OPERATION + "]There were multiple attempts to register component " + name + ".");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYnMvY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSxrREFBaUQ7QUFDakQsOENBQWlEO0FBRXpDLElBQUEsTUFBTSxHQUFLLHFCQUFTLE9BQWQsQ0FBZTtBQUU3QixJQUFNLFVBQVUsR0FBMkIsRUFBRSxDQUFDO0FBRTlDLFNBQWdCLGlCQUFpQixDQUFDLEdBQU8sRUFBQyxTQUE2QjtJQUM3RCxJQUFBLElBQUksR0FBc0MsU0FBUyxLQUEvQyxFQUFFLFNBQVMsR0FBMkIsU0FBUyxVQUFwQyxFQUFFLE1BQU0sR0FBbUIsU0FBUyxPQUE1QixFQUFFLFlBQVksR0FBSyxTQUFTLGFBQWQsQ0FBZTtJQUU1RCxJQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBRSxDQUFDLFNBQVMsSUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQztRQUMvQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQUksbUJBQVUsRUFBRSxVQUFLLE1BQU0sQ0FBQyxpQkFBaUIsNERBQXVELElBQUksTUFBRyxDQUFDLENBQUM7S0FDOUg7SUFFRCxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBRTdCLElBQUcsU0FBUyxFQUFDO1FBQ1YsR0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUM7S0FDNUM7U0FBSTtRQUNILFVBQVUsQ0FBRSxHQUFXLENBQUMsU0FBUyxFQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzNDO0lBQ0QsSUFBRyxZQUFZLEVBQUM7UUFDTixJQUFBLEdBQUcsR0FBYSxZQUFZLElBQXpCLEVBQUUsTUFBTSxHQUFLLFlBQVksT0FBakIsQ0FBa0I7UUFDckMsSUFBRyxDQUFDLEdBQUcsSUFBRSxDQUFDLE1BQU0sSUFBRSxNQUFNLENBQUMsTUFBTSxLQUFHLENBQUMsRUFBQztZQUNsQyxPQUFNO1NBQ1A7UUFDRCxJQUFNLGdCQUFjLEdBQUksR0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksY0FBVyxDQUFDLENBQUM7UUFDbkUsSUFBRyxDQUFFLEdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFDO1lBQy9CLEdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUNwQztRQUNELElBQU0sWUFBWSxHQUFZLEdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNqRSxJQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBQztZQUNuQixHQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLGtCQUFRLEdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBSSxNQUFNLENBQUMsQ0FBQztTQUN4RzthQUFJO1lBQ0YsR0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxHQUFHLEtBQUEsRUFBQyxNQUFNLFFBQUEsRUFBQyxDQUFDO1NBQ3BEO1FBQ0EsR0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsVUFBUyxTQUFnQixFQUFDLElBQVM7WUFDL0QsZ0JBQWMsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsS0FBSSxJQUFNLE1BQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFDO2dCQUN0QixJQUFBLEtBQTRCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBSSxDQUFDLEVBQTNDLEtBQUcsU0FBQSxFQUFTLFNBQVMsWUFBc0IsQ0FBQztnQkFDcEQsSUFBRyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFDO29CQUMvQixLQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQztvQkFDekIsTUFBTTtpQkFDUDthQUNGO1FBQ0gsQ0FBQyxDQUFBO0tBQ0Y7QUFDSCxDQUFDO0FBeENELDhDQXdDQztBQUVELFNBQVMsVUFBVSxDQUFDLE1BQVUsRUFBQyxNQUFVO0lBQ3ZDLElBQUksQ0FBQyxDQUFDLE1BQU0sWUFBWSxNQUFNLENBQUMsRUFBRTtRQUMvQixPQUFPLE1BQU0sQ0FBQztLQUNmO0lBRUQsUUFBUSxNQUFNLENBQUMsV0FBVyxFQUFFO1FBQzFCLEtBQUssSUFBSTtZQUNQLElBQU0sU0FBUyxHQUFHLE1BQWMsQ0FBQztZQUNqQyxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssTUFBTTtZQUNULElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDeEIsTUFBTSxHQUFHLEVBQUUsQ0FBQzthQUNiO1lBQ0QsTUFBTTtRQUNSLEtBQUssS0FBSztZQUNSLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDWixNQUFNO1FBQ1I7WUFDRSxPQUFPLE1BQU0sQ0FBQztLQUNqQjtJQUNELEtBQUssSUFBTSxHQUFHLElBQUksTUFBTSxFQUFFO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQy9CLFNBQVM7U0FDVjtRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ25EO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEtWIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ29tcG9uZW50IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jb21wb25lbnQnO1xuaW1wb3J0IHsgY29uc3RhbnRzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgZ2V0U2RrTmFtZSB9IGZyb20gJy4uL2NvbnN0YW50cy9jb21tb24nO1xuXG5jb25zdCB7IEVSUk9SUyB9ID0gY29uc3RhbnRzO1xuXG5jb25zdCBjb21wb25lbnRzOktWPElDbG91ZGJhc2VDb21wb25lbnQ+ID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckNvbXBvbmVudChhcHA6YW55LGNvbXBvbmVudDpJQ2xvdWRiYXNlQ29tcG9uZW50KXtcbiAgY29uc3QgeyBuYW1lLCBuYW1lc3BhY2UsIGVudGl0eSwgaW5qZWN0RXZlbnRzIH0gPSBjb21wb25lbnQ7XG4gIC8vIOS4jeWFgeiuuOmHjeWkjeazqOWGjOaIluWRveWQjeepuumXtOmHjeWQjVxuICBpZihjb21wb25lbnRzW25hbWVdfHwobmFtZXNwYWNlJiZhcHBbbmFtZXNwYWNlXSkpe1xuICAgIHRocm93IG5ldyBFcnJvcihgWyR7Z2V0U2RrTmFtZSgpfV1bJHtFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT059XVRoZXJlIHdlcmUgbXVsdGlwbGUgYXR0ZW1wdHMgdG8gcmVnaXN0ZXIgY29tcG9uZW50ICR7bmFtZX0uYCk7XG4gIH1cblxuICBjb21wb25lbnRzW25hbWVdID0gY29tcG9uZW50O1xuXG4gIGlmKG5hbWVzcGFjZSl7XG4gICAgKGFwcCBhcyBhbnkpLnByb3RvdHlwZVtuYW1lc3BhY2VdID0gZW50aXR5O1xuICB9ZWxzZXtcbiAgICBkZWVwRXh0ZW5kKChhcHAgYXMgYW55KS5wcm90b3R5cGUsZW50aXR5KTtcbiAgfVxuICBpZihpbmplY3RFdmVudHMpe1xuICAgIGNvbnN0IHsgYnVzLCBldmVudHMgfSA9IGluamVjdEV2ZW50cztcbiAgICBpZighYnVzfHwhZXZlbnRzfHxldmVudHMubGVuZ3RoPT09MCl7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3Qgb3JpZ2luQ2FsbGJhY2sgPSAoYXBwIGFzIGFueSkucHJvdG90eXBlLmZpcmUgfHwgZnVuY3Rpb24oKXt9O1xuICAgIGlmKCEoYXBwIGFzIGFueSkucHJvdG90eXBlLmV2ZW50cyl7XG4gICAgICAoYXBwIGFzIGFueSkucHJvdG90eXBlLmV2ZW50cyA9IHt9O1xuICAgIH1cbiAgICBjb25zdCBvcmlnaW5FdmVudHM6S1Y8YW55PiA9IChhcHAgYXMgYW55KS5wcm90b3R5cGUuZXZlbnRzIHx8IHt9O1xuICAgIGlmKG9yaWdpbkV2ZW50c1tuYW1lXSl7XG4gICAgICAoYXBwIGFzIGFueSkucHJvdG90eXBlLmV2ZW50c1tuYW1lXS5ldmVudHMgPSBbLi4uKGFwcCBhcyBhbnkpLnByb3RvdHlwZS5ldmVudHNbbmFtZV0uZXZlbnRzLC4uLmV2ZW50c107XG4gICAgfWVsc2V7XG4gICAgICAoYXBwIGFzIGFueSkucHJvdG90eXBlLmV2ZW50c1tuYW1lXSA9IHtidXMsZXZlbnRzfTtcbiAgICB9XG4gICAgKGFwcCBhcyBhbnkpLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24oZXZlbnROYW1lOnN0cmluZyxkYXRhPzphbnkpe1xuICAgICAgb3JpZ2luQ2FsbGJhY2soZXZlbnROYW1lLGRhdGEpO1xuICAgICAgZm9yKGNvbnN0IG5hbWUgaW4gdGhpcy5ldmVudHMpe1xuICAgICAgICBjb25zdCB7IGJ1cywgZXZlbnRzOmV2ZW50TGlzdCB9ID0gdGhpcy5ldmVudHNbbmFtZV07XG4gICAgICAgIGlmKGV2ZW50TGlzdC5pbmNsdWRlcyhldmVudE5hbWUpKXtcbiAgICAgICAgICBidXMuZmlyZShldmVudE5hbWUsZGF0YSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVlcEV4dGVuZCh0YXJnZXQ6YW55LHNvdXJjZTphbnkpOktWPGFueT57XG4gIGlmICghKHNvdXJjZSBpbnN0YW5jZW9mIE9iamVjdCkpIHtcbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgc3dpdGNoIChzb3VyY2UuY29uc3RydWN0b3IpIHtcbiAgICBjYXNlIERhdGU6XG4gICAgICBjb25zdCBkYXRlVmFsdWUgPSBzb3VyY2UgYXMgRGF0ZTtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlVmFsdWUuZ2V0VGltZSgpKTtcbiAgICBjYXNlIE9iamVjdDpcbiAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0YXJnZXQgPSB7fTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQXJyYXk6XG4gICAgICB0YXJnZXQgPSBbXTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc291cmNlO1xuICB9XG4gIGZvciAoY29uc3Qga2V5IGluIHNvdXJjZSkge1xuICAgIGlmICghc291cmNlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB0YXJnZXRba2V5XSA9IGRlZXBFeHRlbmQodGFyZ2V0W2tleV0sc291cmNlW2tleV0pO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn0iXX0=