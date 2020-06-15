"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("@cloudbase/auth");
exports.registerAuth = auth_1.registerAuth;
var provider_mp_1 = require("@cloudbase/provider-mp");
auth_1.registerAuthProvider('weixinAuthProvider', provider_mp_1.WeixinAuthProvider);
