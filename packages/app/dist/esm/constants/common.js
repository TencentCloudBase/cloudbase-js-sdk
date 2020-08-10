var sdk_version = '';
export function setSdkVersion(version) {
    sdk_version = version;
}
export function getSdkVersion() {
    return sdk_version;
}
export var SDK_NAME = '@cloudbase/js-sdk';
export var DATA_VERSION = '2020-01-10';
var PROTOCOL = typeof location !== 'undefined' && location.protocol === 'http:'
    ? 'http:'
    : 'https:';
var BASE_URL = typeof process !== 'undefined' && process.env.NODE_ENV === 'e2e' && process.env.END_POINT === 'pre'
    ? '//tcb-pre.tencentcloudapi.com/web'
    : '//tcb-api.tencentcloudapi.com/web';
export function setEndPoint(url, protocol) {
    BASE_URL = url;
    protocol && (PROTOCOL = protocol);
}
export function getEndPoint() {
    return { BASE_URL: BASE_URL, PROTOCOL: PROTOCOL };
}
export var LOGINTYPE;
(function (LOGINTYPE) {
    LOGINTYPE["ANONYMOUS"] = "ANONYMOUS";
    LOGINTYPE["WECHAT"] = "WECHAT";
    LOGINTYPE["CUSTOM"] = "CUSTOM";
    LOGINTYPE["NULL"] = "NULL";
})(LOGINTYPE || (LOGINTYPE = {}));
