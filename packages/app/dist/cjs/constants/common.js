"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGINTYPE = exports.BASE_URL_DEBUG = exports.PROTOCOL_DEBUG = exports.BASE_URL = exports.PROTOCOL = exports.DATA_VERSION = exports.SDK_NAME = exports.getSdkVersion = exports.setSdkVersion = void 0;
var sdk_version = '';
function setSdkVersion(version) {
    sdk_version = version;
}
exports.setSdkVersion = setSdkVersion;
function getSdkVersion() {
    return sdk_version;
}
exports.getSdkVersion = getSdkVersion;
exports.SDK_NAME = '@cloudbase/js-sdk';
exports.DATA_VERSION = '2020-01-10';
exports.PROTOCOL = 'https:';
exports.BASE_URL = '//tcb-api.tencentcloudapi.com/web';
exports.PROTOCOL_DEBUG = 'http:';
exports.BASE_URL_DEBUG = '//tcb-pre.tencentcloudapi.com/web';
var LOGINTYPE;
(function (LOGINTYPE) {
    LOGINTYPE["ANONYMOUS"] = "ANONYMOUS";
    LOGINTYPE["WECHAT"] = "WECHAT";
    LOGINTYPE["CUSTOM"] = "CUSTOM";
    LOGINTYPE["NULL"] = "NULL";
})(LOGINTYPE = exports.LOGINTYPE || (exports.LOGINTYPE = {}));
