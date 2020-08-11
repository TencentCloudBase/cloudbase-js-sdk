"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGINTYPE = exports.getEndPoint = exports.setEndPoint = exports.DATA_VERSION = exports.SDK_NAME = exports.getSdkVersion = exports.setSdkVersion = void 0;
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
var PROTOCOL = typeof location !== 'undefined' && location.protocol === 'http:'
    ? 'http:'
    : 'https:';
var BASE_URL = typeof process !== 'undefined' && process.env.NODE_ENV === 'e2e' && process.env.END_POINT === 'pre'
    ? '//tcb-pre.tencentcloudapi.com/web'
    : '//tcb-api.tencentcloudapi.com/web';
function setEndPoint(url, protocol) {
    BASE_URL = url;
    protocol && (PROTOCOL = protocol);
}
exports.setEndPoint = setEndPoint;
function getEndPoint() {
    return { BASE_URL: BASE_URL, PROTOCOL: PROTOCOL };
}
exports.getEndPoint = getEndPoint;
var LOGINTYPE;
(function (LOGINTYPE) {
    LOGINTYPE["ANONYMOUS"] = "ANONYMOUS";
    LOGINTYPE["WECHAT"] = "WECHAT";
    LOGINTYPE["CUSTOM"] = "CUSTOM";
    LOGINTYPE["NULL"] = "NULL";
})(LOGINTYPE = exports.LOGINTYPE || (exports.LOGINTYPE = {}));
