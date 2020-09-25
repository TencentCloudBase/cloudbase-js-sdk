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
var pkg = __importStar(require("../../package.json"));
var version = pkg.version;
app_1.default.registerVersion(version);
try {
    window.cloudbase = app_1.default;
}
catch (e) { }
exports.default = app_1.default;
module.exports = app_1.default;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQXVDO0FBQ3ZDLHNEQUEwQztBQUdsQyxJQUFBLE9BQU8sR0FBSyxHQUFHLFFBQVIsQ0FBUztBQUN4QixhQUFTLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBT25DLElBQUc7SUFDQSxNQUFpQixDQUFDLFNBQVMsR0FBRyxhQUFTLENBQUM7Q0FDMUM7QUFBQSxPQUFNLENBQUMsRUFBQyxHQUFFO0FBR1gsa0JBQWUsYUFBUyxDQUFDO0FBRHpCLGlCQUFTLGFBQVMsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjbG91ZGJhc2UgZnJvbSAnQGNsb3VkYmFzZS9hcHAnO1xuaW1wb3J0ICogYXMgcGtnIGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5cbmNvbnN0IHsgdmVyc2lvbiB9ID0gcGtnO1xuY2xvdWRiYXNlLnJlZ2lzdGVyVmVyc2lvbih2ZXJzaW9uKTtcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBjbG91ZGJhc2U6IElDbG91ZGJhc2U7XG4gIH1cbn1cbnRyeXtcbiAgKHdpbmRvdyBhcyBXaW5kb3cpLmNsb3VkYmFzZSA9IGNsb3VkYmFzZTtcbn1jYXRjaChlKXt9XG4vLyBAdHMtaWdub3JlXG5leHBvcnQgPSBjbG91ZGJhc2U7XG5leHBvcnQgZGVmYXVsdCBjbG91ZGJhc2U7Il19

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQXVDO0FBQ3ZDLHNEQUEwQztBQUdsQyxJQUFBLE9BQU8sR0FBSyxHQUFHLFFBQVIsQ0FBUztBQUN4QixhQUFTLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBT25DLElBQUc7SUFDQSxNQUFpQixDQUFDLFNBQVMsR0FBRyxhQUFTLENBQUM7Q0FDMUM7QUFBQSxPQUFNLENBQUMsRUFBQyxHQUFFO0FBR1gsa0JBQWUsYUFBUyxDQUFDO0FBRHpCLGlCQUFTLGFBQVMsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjbG91ZGJhc2UgZnJvbSAnQGNsb3VkYmFzZS9hcHAnO1xuaW1wb3J0ICogYXMgcGtnIGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5cbmNvbnN0IHsgdmVyc2lvbiB9ID0gcGtnO1xuY2xvdWRiYXNlLnJlZ2lzdGVyVmVyc2lvbih2ZXJzaW9uKTtcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBjbG91ZGJhc2U6IElDbG91ZGJhc2U7XG4gIH1cbn1cbnRyeXtcbiAgKHdpbmRvdyBhcyBXaW5kb3cpLmNsb3VkYmFzZSA9IGNsb3VkYmFzZTtcbn1jYXRjaChlKXt9XG4vLyBAdHMtaWdub3JlXG5leHBvcnQgPSBjbG91ZGJhc2U7XG5leHBvcnQgZGVmYXVsdCBjbG91ZGJhc2U7Il19
