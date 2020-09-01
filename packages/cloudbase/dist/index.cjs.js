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
var database_1 = require("./../database");
var pkg = __importStar(require("../package.json"));
var version = pkg.version;
app_1.default.registerVersion(version);
try {
    auth_1.registerAuth(app_1.default);
    functions_1.registerFunctions(app_1.default);
    storage_1.registerStorage(app_1.default);
    database_1.registerDatabase(app_1.default);
}
catch (e) { }
try {
    window.cloudbase = app_1.default;
}
catch (e) { }
exports.default = app_1.default;
module.exports = app_1.default;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQXVDO0FBQ3ZDLHdDQUErQztBQUMvQyxrREFBeUQ7QUFDekQsOENBQXFEO0FBRXJELDBDQUFpRDtBQUNqRCxtREFBdUM7QUFHL0IsSUFBQSxPQUFPLEdBQUssR0FBRyxRQUFSLENBQVM7QUFDeEIsYUFBUyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVuQyxJQUFHO0lBQ0QsbUJBQVksQ0FBQyxhQUFTLENBQUMsQ0FBQztJQUN4Qiw2QkFBaUIsQ0FBQyxhQUFTLENBQUMsQ0FBQztJQUM3Qix5QkFBZSxDQUFDLGFBQVMsQ0FBQyxDQUFDO0lBQzNCLDJCQUFnQixDQUFDLGFBQVMsQ0FBQyxDQUFDO0NBQzdCO0FBQUEsT0FBTSxDQUFDLEVBQUMsR0FBRTtBQU9YLElBQUc7SUFDQSxNQUFpQixDQUFDLFNBQVMsR0FBRyxhQUFTLENBQUM7Q0FDMUM7QUFBQSxPQUFNLENBQUMsRUFBQyxHQUFFO0FBR1gsa0JBQWUsYUFBUyxDQUFDO0FBRHpCLGlCQUFTLGFBQVMsQ0FBQyIsImZpbGUiOiJpbmRleC5janMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2xvdWRiYXNlIGZyb20gJ0BjbG91ZGJhc2UvYXBwJztcbmltcG9ydCB7IHJlZ2lzdGVyQXV0aCB9IGZyb20gJ0BjbG91ZGJhc2UvYXV0aCc7XG5pbXBvcnQgeyByZWdpc3RlckZ1bmN0aW9ucyB9IGZyb20gJ0BjbG91ZGJhc2UvZnVuY3Rpb25zJztcbmltcG9ydCB7IHJlZ2lzdGVyU3RvcmFnZSB9IGZyb20gJ0BjbG91ZGJhc2Uvc3RvcmFnZSc7XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgeyByZWdpc3RlckRhdGFiYXNlIH0gZnJvbSAnLi8uLi9kYXRhYmFzZSc7XG5pbXBvcnQgKiBhcyBwa2cgZnJvbSAnLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCB7IElDbG91ZGJhc2UgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcblxuY29uc3QgeyB2ZXJzaW9uIH0gPSBwa2c7XG5jbG91ZGJhc2UucmVnaXN0ZXJWZXJzaW9uKHZlcnNpb24pO1xuXG50cnl7XG4gIHJlZ2lzdGVyQXV0aChjbG91ZGJhc2UpO1xuICByZWdpc3RlckZ1bmN0aW9ucyhjbG91ZGJhc2UpO1xuICByZWdpc3RlclN0b3JhZ2UoY2xvdWRiYXNlKTtcbiAgcmVnaXN0ZXJEYXRhYmFzZShjbG91ZGJhc2UpO1xufWNhdGNoKGUpe31cblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBjbG91ZGJhc2U6IElDbG91ZGJhc2U7XG4gIH1cbn1cbnRyeXtcbiAgKHdpbmRvdyBhcyBXaW5kb3cpLmNsb3VkYmFzZSA9IGNsb3VkYmFzZTtcbn1jYXRjaChlKXt9XG4vLyBAdHMtaWdub3JlXG5leHBvcnQgPSBjbG91ZGJhc2U7XG5leHBvcnQgZGVmYXVsdCBjbG91ZGJhc2U7Il19
