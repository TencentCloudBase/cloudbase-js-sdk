var sdk_version = '';
export function setSdkVersion(version) {
    sdk_version = version;
}
export function getSdkVersion() {
    return sdk_version;
}
export var SDK_NAME = '@cloudbase/js-sdk';
export var DATA_VERSION = '2020-01-10';
export var PROTOCOL = 'https:';
export var BASE_URL = '//tcb-api.tencentcloudapi.com/web';
export var PROTOCOL_DEBUG = 'http:';
export var BASE_URL_DEBUG = '//tcb-pre.tencentcloudapi.com/web';
export var LOGINTYPE;
(function (LOGINTYPE) {
    LOGINTYPE["ANONYMOUS"] = "ANONYMOUS";
    LOGINTYPE["WECHAT"] = "WECHAT";
    LOGINTYPE["CUSTOM"] = "CUSTOM";
    LOGINTYPE["NULL"] = "NULL";
})(LOGINTYPE || (LOGINTYPE = {}));
