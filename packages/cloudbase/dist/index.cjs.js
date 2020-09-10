"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var app_1 = __importDefault(require("@cloudbase/app"));
var auth_1 = require("@cloudbase/auth");
var functions_1 = require("@cloudbase/functions");
var storage_1 = require("@cloudbase/storage");
var realtime_1 = require("@cloudbase/realtime");
var database_1 = require("./../database");
var pkg = __importStar(require("../package.json"));
var version = pkg.version;
app_1.default.registerVersion(version);
try {
    auth_1.registerAuth(app_1.default);
    functions_1.registerFunctions(app_1.default);
    storage_1.registerStorage(app_1.default);
    database_1.registerDatabase(app_1.default);
    realtime_1.registerRealtime(app_1.default);
}
catch (e) { }
try {
    window.cloudbase = app_1.default;
}
catch (e) { }
exports.default = app_1.default;
module.exports = app_1.default;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQXVDO0FBQ3ZDLHdDQUErQztBQUMvQyxrREFBeUQ7QUFDekQsOENBQXFEO0FBQ3JELGdEQUF1RDtBQUV2RCwwQ0FBaUQ7QUFDakQsbURBQXVDO0FBRy9CLElBQUEsT0FBTyxHQUFLLEdBQUcsUUFBUixDQUFTO0FBQ3hCLGFBQVMsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFbkMsSUFBRztJQUNELG1CQUFZLENBQUMsYUFBUyxDQUFDLENBQUM7SUFDeEIsNkJBQWlCLENBQUMsYUFBUyxDQUFDLENBQUM7SUFDN0IseUJBQWUsQ0FBQyxhQUFTLENBQUMsQ0FBQztJQUMzQiwyQkFBZ0IsQ0FBQyxhQUFTLENBQUMsQ0FBQztJQUM1QiwyQkFBZ0IsQ0FBQyxhQUFTLENBQUMsQ0FBQztDQUM3QjtBQUFBLE9BQU0sQ0FBQyxFQUFDLEdBQUU7QUFPWCxJQUFHO0lBQ0EsTUFBaUIsQ0FBQyxTQUFTLEdBQUcsYUFBUyxDQUFDO0NBQzFDO0FBQUEsT0FBTSxDQUFDLEVBQUMsR0FBRTtBQUdYLGtCQUFlLGFBQVMsQ0FBQztBQUR6QixpQkFBUyxhQUFTLENBQUMiLCJmaWxlIjoiaW5kZXguY2pzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNsb3VkYmFzZSBmcm9tICdAY2xvdWRiYXNlL2FwcCc7XG5pbXBvcnQgeyByZWdpc3RlckF1dGggfSBmcm9tICdAY2xvdWRiYXNlL2F1dGgnO1xuaW1wb3J0IHsgcmVnaXN0ZXJGdW5jdGlvbnMgfSBmcm9tICdAY2xvdWRiYXNlL2Z1bmN0aW9ucyc7XG5pbXBvcnQgeyByZWdpc3RlclN0b3JhZ2UgfSBmcm9tICdAY2xvdWRiYXNlL3N0b3JhZ2UnO1xuaW1wb3J0IHsgcmVnaXN0ZXJSZWFsdGltZSB9IGZyb20gJ0BjbG91ZGJhc2UvcmVhbHRpbWUnO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHsgcmVnaXN0ZXJEYXRhYmFzZSB9IGZyb20gJy4vLi4vZGF0YWJhc2UnO1xuaW1wb3J0ICogYXMgcGtnIGZyb20gJy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5cbmNvbnN0IHsgdmVyc2lvbiB9ID0gcGtnO1xuY2xvdWRiYXNlLnJlZ2lzdGVyVmVyc2lvbih2ZXJzaW9uKTtcblxudHJ5e1xuICByZWdpc3RlckF1dGgoY2xvdWRiYXNlKTtcbiAgcmVnaXN0ZXJGdW5jdGlvbnMoY2xvdWRiYXNlKTtcbiAgcmVnaXN0ZXJTdG9yYWdlKGNsb3VkYmFzZSk7XG4gIHJlZ2lzdGVyRGF0YWJhc2UoY2xvdWRiYXNlKTtcbiAgcmVnaXN0ZXJSZWFsdGltZShjbG91ZGJhc2UpO1xufWNhdGNoKGUpe31cblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBjbG91ZGJhc2U6IElDbG91ZGJhc2U7XG4gIH1cbn1cbnRyeXtcbiAgKHdpbmRvdyBhcyBXaW5kb3cpLmNsb3VkYmFzZSA9IGNsb3VkYmFzZTtcbn1jYXRjaChlKXt9XG4vLyBAdHMtaWdub3JlXG5leHBvcnQgPSBjbG91ZGJhc2U7XG5leHBvcnQgZGVmYXVsdCBjbG91ZGJhc2U7Il19
