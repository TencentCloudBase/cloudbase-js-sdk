"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGINTYPE = exports.getEndPoint = exports.setEndPoint = exports.DATA_VERSION = exports.getSdkName = exports.setSdkName = exports.getSdkVersion = exports.setSdkVersion = void 0;
var utilities_1 = require("@cloudbase/utilities");
var setUtilitiesSdkName = utilities_1.constants.setSdkName, setUtilitiesProtocol = utilities_1.constants.setProtocol;
var sdk_version = '';
var sdk_name = '@cloudbase/js-sdk';
function setSdkVersion(version) {
    sdk_version = version;
}
exports.setSdkVersion = setSdkVersion;
function getSdkVersion() {
    return sdk_version;
}
exports.getSdkVersion = getSdkVersion;
function setSdkName(name) {
    sdk_name = name;
    setUtilitiesSdkName(name);
}
exports.setSdkName = setSdkName;
function getSdkName() {
    return sdk_name;
}
exports.getSdkName = getSdkName;
exports.DATA_VERSION = '2020-01-10';
var PROTOCOL = typeof location !== 'undefined' && location.protocol === 'http:'
    ? 'http:'
    : 'https:';
var BASE_URL = typeof process !== 'undefined' && process.env.NODE_ENV === 'e2e' && process.env.END_POINT === 'pre'
    ? '//tcb-pre.tencentcloudapi.com/web'
    : '//tcb-api.tencentcloudapi.com/web';
function setEndPoint(url, protocol) {
    BASE_URL = url;
    if (protocol) {
        PROTOCOL = protocol;
        setUtilitiesProtocol(protocol);
    }
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
