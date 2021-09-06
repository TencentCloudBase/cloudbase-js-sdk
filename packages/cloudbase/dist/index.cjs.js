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
var analytics_1 = require("@cloudbase/analytics");
var oauth_1 = require("@cloudbase/oauth");
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
    analytics_1.registerAnalytics(app_1.default);
    oauth_1.registerOAuth(app_1.default);
}
catch (e) { }
try {
    window.cloudbase = app_1.default;
}
catch (e) { }
exports.default = app_1.default;
module.exports = app_1.default;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQXVDO0FBQ3ZDLHdDQUErQztBQUMvQyxrREFBeUQ7QUFDekQsOENBQXFEO0FBQ3JELGdEQUF1RDtBQUN2RCxrREFBd0Q7QUFDeEQsMENBQWdEO0FBRWhELDBDQUFpRDtBQUNqRCxtREFBdUM7QUFJL0IsSUFBQSxPQUFPLEdBQUssR0FBRyxRQUFSLENBQVM7QUFDeEIsYUFBUyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVuQyxJQUFJO0lBQ0YsbUJBQVksQ0FBQyxhQUFTLENBQUMsQ0FBQztJQUN4Qiw2QkFBaUIsQ0FBQyxhQUFTLENBQUMsQ0FBQztJQUM3Qix5QkFBZSxDQUFDLGFBQVMsQ0FBQyxDQUFDO0lBQzNCLDJCQUFnQixDQUFDLGFBQVMsQ0FBQyxDQUFDO0lBQzVCLDJCQUFnQixDQUFDLGFBQVMsQ0FBQyxDQUFDO0lBQzVCLDZCQUFpQixDQUFDLGFBQVMsQ0FBQyxDQUFDO0lBQzdCLHFCQUFhLENBQUMsYUFBUyxDQUFDLENBQUE7Q0FDekI7QUFBQyxPQUFPLENBQUMsRUFBRSxHQUFHO0FBT2YsSUFBSTtJQUNELE1BQWlCLENBQUMsU0FBUyxHQUFHLGFBQVMsQ0FBQztDQUMxQztBQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUc7QUFHZixrQkFBZSxhQUFTLENBQUM7QUFEekIsaUJBQVMsYUFBUyxDQUFDIiwiZmlsZSI6ImluZGV4LmNqcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjbG91ZGJhc2UgZnJvbSAnQGNsb3VkYmFzZS9hcHAnO1xuaW1wb3J0IHsgcmVnaXN0ZXJBdXRoIH0gZnJvbSAnQGNsb3VkYmFzZS9hdXRoJztcbmltcG9ydCB7IHJlZ2lzdGVyRnVuY3Rpb25zIH0gZnJvbSAnQGNsb3VkYmFzZS9mdW5jdGlvbnMnO1xuaW1wb3J0IHsgcmVnaXN0ZXJTdG9yYWdlIH0gZnJvbSAnQGNsb3VkYmFzZS9zdG9yYWdlJztcbmltcG9ydCB7IHJlZ2lzdGVyUmVhbHRpbWUgfSBmcm9tICdAY2xvdWRiYXNlL3JlYWx0aW1lJztcbmltcG9ydCB7IHJlZ2lzdGVyQW5hbHl0aWNzIH0gZnJvbSAnQGNsb3VkYmFzZS9hbmFseXRpY3MnXG5pbXBvcnQgeyByZWdpc3Rlck9BdXRoIH0gZnJvbSAnQGNsb3VkYmFzZS9vYXV0aCdcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCB7IHJlZ2lzdGVyRGF0YWJhc2UgfSBmcm9tICcuLy4uL2RhdGFiYXNlJztcbmltcG9ydCAqIGFzIHBrZyBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHsgSUNsb3VkYmFzZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuXG5cbmNvbnN0IHsgdmVyc2lvbiB9ID0gcGtnO1xuY2xvdWRiYXNlLnJlZ2lzdGVyVmVyc2lvbih2ZXJzaW9uKTtcblxudHJ5IHtcbiAgcmVnaXN0ZXJBdXRoKGNsb3VkYmFzZSk7XG4gIHJlZ2lzdGVyRnVuY3Rpb25zKGNsb3VkYmFzZSk7XG4gIHJlZ2lzdGVyU3RvcmFnZShjbG91ZGJhc2UpO1xuICByZWdpc3RlckRhdGFiYXNlKGNsb3VkYmFzZSk7XG4gIHJlZ2lzdGVyUmVhbHRpbWUoY2xvdWRiYXNlKTtcbiAgcmVnaXN0ZXJBbmFseXRpY3MoY2xvdWRiYXNlKTtcbiAgcmVnaXN0ZXJPQXV0aChjbG91ZGJhc2UpXG59IGNhdGNoIChlKSB7IH1cblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBjbG91ZGJhc2U6IElDbG91ZGJhc2U7XG4gIH1cbn1cbnRyeSB7XG4gICh3aW5kb3cgYXMgV2luZG93KS5jbG91ZGJhc2UgPSBjbG91ZGJhc2U7XG59IGNhdGNoIChlKSB7IH1cbi8vIEB0cy1pZ25vcmVcbmV4cG9ydCA9IGNsb3VkYmFzZTtcbmV4cG9ydCBkZWZhdWx0IGNsb3VkYmFzZTsiXX0=
