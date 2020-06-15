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
        throw new Error("[" + common_1.SDK_NAME + "][" + ERRORS.INVALID_OPERATION + "]There were multiple attempts to register component " + name + ".");
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
