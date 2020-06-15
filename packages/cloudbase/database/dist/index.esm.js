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
import { Db } from '@cloudbase/database';
import { constants, adapters, utils } from '@cloudbase/utilities';
var SDK_NAME = constants.SDK_NAME, ERRORS = constants.ERRORS;
var RUNTIME = adapters.RUNTIME;
var createSign = utils.createSign;
var COMPONENT_NAME = 'database';
var DATA_VERSION = '2020-01-10';
function database(dbConfig) {
    if (!this.authInstance) {
        console.warn("[" + SDK_NAME + "][" + ERRORS.INVALID_OPERATION + "] not login ");
        return;
    }
    var _a = this.platform, adapter = _a.adapter, runtime = _a.runtime;
    Db.reqClass = this.request.constructor;
    Db.wsClass = adapter.wsClass;
    Db.getAccessToken = this.authInstance.getAccessToken.bind(this.authInstance);
    Db.runtime = runtime;
    if (runtime !== RUNTIME.WEB) {
        Db.dataVersion = DATA_VERSION;
        Db.createSign = createSign;
        Db.appSecretInfo = __assign({ appSign: this.config.appSign }, this.config.appSecret);
    }
    if (!Db.ws) {
        Db.ws = null;
    }
    return new Db(__assign(__assign({}, this.config), dbConfig));
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
export function registerDatabase(app) {
    app.registerComponent(component);
}
