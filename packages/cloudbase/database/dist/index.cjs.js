"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDatabase = void 0;
var database_1 = require("@cloudbase/database");
var utilities_1 = require("@cloudbase/utilities");
var getSdkName = utilities_1.constants.getSdkName, ERRORS = utilities_1.constants.ERRORS;
var COMPONENT_NAME = 'database';
function database(dbConfig) {
    if (!this.authInstance) {
        console.warn("[" + getSdkName() + "][" + ERRORS.INVALID_OPERATION + "] not login ");
        return;
    }
    var _a = this.platform, adapter = _a.adapter, runtime = _a.runtime;
    database_1.Db.reqClass = this.request.constructor;
    database_1.Db.wsClass = adapter.wsClass;
    database_1.Db.getAccessToken = this.authInstance.getAccessToken.bind(this.authInstance);
    database_1.Db.runtime = runtime;
    if (!database_1.Db.ws) {
        database_1.Db.ws = null;
    }
    return new database_1.Db(__assign(__assign({}, this.config), dbConfig));
}
var component = {
    name: COMPONENT_NAME,
    entity: {
        database: database
    }
};
try {
    cloudbase.registerComponent(component);
}
catch (e) { }
function registerDatabase(app) {
    app.registerComponent(component);
}
exports.registerDatabase = registerDatabase;
