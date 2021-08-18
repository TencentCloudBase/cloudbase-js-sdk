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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authModels = void 0;
var consts_1 = require("./oauth2client/consts");
Object.defineProperty(exports, "Syntax", { enumerable: true, get: function () { return consts_1.Syntax; } });
Object.defineProperty(exports, "ErrorType", { enumerable: true, get: function () { return consts_1.ErrorType; } });
var oauth2client_1 = require("./oauth2client/oauth2client");
Object.defineProperty(exports, "defaultStorage", { enumerable: true, get: function () { return oauth2client_1.defaultStorage; } });
Object.defineProperty(exports, "defaultRequest", { enumerable: true, get: function () { return oauth2client_1.defaultRequest; } });
Object.defineProperty(exports, "toResponseError", { enumerable: true, get: function () { return oauth2client_1.toResponseError; } });
Object.defineProperty(exports, "generateRequestId", { enumerable: true, get: function () { return oauth2client_1.generateRequestId; } });
Object.defineProperty(exports, "OAuth2Client", { enumerable: true, get: function () { return oauth2client_1.OAuth2Client; } });
var interface_1 = require("./oauth2client/interface");
Object.defineProperty(exports, "AuthClient", { enumerable: true, get: function () { return interface_1.AuthClient; } });
var apis_1 = require("./auth/apis");
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return apis_1.Auth; } });
var authModels = __importStar(require("./auth/models"));
exports.authModels = authModels;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF3RDtBQUFoRCxnR0FBQSxNQUFNLE9BQUE7QUFBRSxtR0FBQSxTQUFTLE9BQUE7QUFFekIsNERBT3FDO0FBTm5DLDhHQUFBLGNBQWMsT0FBQTtBQUNkLDhHQUFBLGNBQWMsT0FBQTtBQUVkLCtHQUFBLGVBQWUsT0FBQTtBQUNmLGlIQUFBLGlCQUFpQixPQUFBO0FBQ2pCLDRHQUFBLFlBQVksT0FBQTtBQUdkLHNEQUFtRTtBQUEzRCx1R0FBQSxVQUFVLE9BQUE7QUFTbEIsb0NBQThDO0FBQXpCLDRGQUFBLElBQUksT0FBQTtBQUV6Qix3REFBNEM7QUFDcEMsZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge1N5bnRheCwgRXJyb3JUeXBlfSBmcm9tICcuL29hdXRoMmNsaWVudC9jb25zdHMnO1xuXG5leHBvcnQge1xuICBkZWZhdWx0U3RvcmFnZSxcbiAgZGVmYXVsdFJlcXVlc3QsXG4gIFRvUmVzcG9uc2VFcnJvck9wdGlvbnMsXG4gIHRvUmVzcG9uc2VFcnJvcixcbiAgZ2VuZXJhdGVSZXF1ZXN0SWQsXG4gIE9BdXRoMkNsaWVudCxcbn0gZnJvbSAnLi9vYXV0aDJjbGllbnQvb2F1dGgyY2xpZW50JztcblxuZXhwb3J0IHtBdXRoQ2xpZW50LCBTaW1wbGVTdG9yYWdlfSBmcm9tICcuL29hdXRoMmNsaWVudC9pbnRlcmZhY2UnO1xuXG5leHBvcnQge1xuICBDcmVkZW50aWFscyxcbiAgUmVzcG9uc2VFcnJvcixcbiAgT0F1dGgyQ2xpZW50T3B0aW9ucyxcbiAgQXV0aENsaWVudFJlcXVlc3RPcHRpb25zLFxufSBmcm9tICcuL29hdXRoMmNsaWVudC9tb2RlbHMnO1xuXG5leHBvcnQge0F1dGhPcHRpb25zLCBBdXRofSBmcm9tICcuL2F1dGgvYXBpcyc7XG5cbmltcG9ydCAqIGFzIGF1dGhNb2RlbHMgZnJvbSAnLi9hdXRoL21vZGVscyc7XG5leHBvcnQge2F1dGhNb2RlbHN9O1xuIl19