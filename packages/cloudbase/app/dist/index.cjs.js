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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQXVDO0FBQ3ZDLHNEQUEwQztBQUdsQyxJQUFBLE9BQU8sR0FBSyxHQUFHLFFBQVIsQ0FBUztBQUN4QixhQUFTLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBT25DLElBQUc7SUFDQSxNQUFpQixDQUFDLFNBQVMsR0FBRyxhQUFTLENBQUM7Q0FDMUM7QUFBQSxPQUFNLENBQUMsRUFBQyxHQUFFO0FBR1gsa0JBQWUsYUFBUyxDQUFDO0FBRHpCLGlCQUFTLGFBQVMsQ0FBQyIsImZpbGUiOiJpbmRleC5janMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2xvdWRiYXNlIGZyb20gJ0BjbG91ZGJhc2UvYXBwJztcbmltcG9ydCAqIGFzIHBrZyBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHsgSUNsb3VkYmFzZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuXG5jb25zdCB7IHZlcnNpb24gfSA9IHBrZztcbmNsb3VkYmFzZS5yZWdpc3RlclZlcnNpb24odmVyc2lvbik7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgY2xvdWRiYXNlOiBJQ2xvdWRiYXNlO1xuICB9XG59XG50cnl7XG4gICh3aW5kb3cgYXMgV2luZG93KS5jbG91ZGJhc2UgPSBjbG91ZGJhc2U7XG59Y2F0Y2goZSl7fVxuLy8gQHRzLWlnbm9yZVxuZXhwb3J0ID0gY2xvdWRiYXNlO1xuZXhwb3J0IGRlZmF1bHQgY2xvdWRiYXNlOyJdfQ==
