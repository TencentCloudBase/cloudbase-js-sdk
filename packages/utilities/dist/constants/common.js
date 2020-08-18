"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProtocol = exports.setProtocol = exports.getSdkName = exports.setSdkName = void 0;
var sdk_name = '@cloudbase/js-sdk';
function setSdkName(name) {
    sdk_name = name;
}
exports.setSdkName = setSdkName;
function getSdkName() {
    return sdk_name;
}
exports.getSdkName = getSdkName;
var PROTOCOL = typeof location !== 'undefined' && location.protocol === 'http:'
    ? 'http:'
    : 'https:';
function setProtocol(protocol) {
    PROTOCOL = protocol;
}
exports.setProtocol = setProtocol;
function getProtocol() {
    return PROTOCOL;
}
exports.getProtocol = getProtocol;
