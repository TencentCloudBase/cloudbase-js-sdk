"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.CloudbaseOAuth = exports.authModels = void 0;
var consts_1 = require("./oauth2client/consts");
Object.defineProperty(exports, "Syntax", { enumerable: true, get: function () { return consts_1.Syntax; } });
Object.defineProperty(exports, "ErrorType", { enumerable: true, get: function () { return consts_1.ErrorType; } });
var oauth2client_1 = require("./oauth2client/oauth2client");
var oauth2client_2 = require("./oauth2client/oauth2client");
Object.defineProperty(exports, "defaultStorage", { enumerable: true, get: function () { return oauth2client_2.defaultStorage; } });
Object.defineProperty(exports, "defaultRequest", { enumerable: true, get: function () { return oauth2client_2.defaultRequest; } });
Object.defineProperty(exports, "toResponseError", { enumerable: true, get: function () { return oauth2client_2.toResponseError; } });
Object.defineProperty(exports, "generateRequestId", { enumerable: true, get: function () { return oauth2client_2.generateRequestId; } });
Object.defineProperty(exports, "OAuth2Client", { enumerable: true, get: function () { return oauth2client_2.OAuth2Client; } });
var interface_1 = require("./oauth2client/interface");
Object.defineProperty(exports, "AuthClient", { enumerable: true, get: function () { return interface_1.AuthClient; } });
var apis_1 = require("./auth/apis");
var apis_2 = require("./auth/apis");
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return apis_2.Auth; } });
var authModels = __importStar(require("./auth/models"));
exports.authModels = authModels;
var CloudbaseOAuth = (function () {
    function CloudbaseOAuth(authOptions) {
        var apiOrigin = authOptions.apiOrigin, clientId = authOptions.clientId;
        this.oauth2client = new oauth2client_1.OAuth2Client({
            apiOrigin: apiOrigin,
            clientId: clientId
        });
        this.authApi = new apis_1.Auth(__assign({ credentialsClient: this.oauth2client }, authOptions));
    }
    return CloudbaseOAuth;
}());
exports.CloudbaseOAuth = CloudbaseOAuth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTBEO0FBQWpELGdHQUFBLE1BQU0sT0FBQTtBQUFFLG1HQUFBLFNBQVMsT0FBQTtBQUUxQiw0REFBMEQ7QUFFMUQsNERBT3FDO0FBTm5DLDhHQUFBLGNBQWMsT0FBQTtBQUNkLDhHQUFBLGNBQWMsT0FBQTtBQUVkLCtHQUFBLGVBQWUsT0FBQTtBQUNmLGlIQUFBLGlCQUFpQixPQUFBO0FBQ2pCLDRHQUFBLFlBQVksT0FBQTtBQUdkLHNEQUFxRTtBQUE1RCx1R0FBQSxVQUFVLE9BQUE7QUFVbkIsb0NBQStDO0FBRS9DLG9DQUFnRDtBQUExQiw0RkFBQSxJQUFJLE9BQUE7QUFFMUIsd0RBQTRDO0FBQ25DLGdDQUFVO0FBR25CO0lBSUUsd0JBQVksV0FBd0I7UUFDMUIsSUFBQSxTQUFTLEdBQWUsV0FBVyxVQUExQixFQUFFLFFBQVEsR0FBSyxXQUFXLFNBQWhCLENBQWdCO1FBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSwyQkFBWSxDQUFDO1lBQ25DLFNBQVMsV0FBQTtZQUNULFFBQVEsVUFBQTtTQUNULENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxXQUFJLFlBQ3JCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxZQUFZLElBQ2pDLFdBQVcsRUFDZCxDQUFBO0lBQ0osQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQztBQWhCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7IFN5bnRheCwgRXJyb3JUeXBlIH0gZnJvbSAnLi9vYXV0aDJjbGllbnQvY29uc3RzJztcblxuaW1wb3J0IHsgT0F1dGgyQ2xpZW50IH0gZnJvbSAnLi9vYXV0aDJjbGllbnQvb2F1dGgyY2xpZW50J1xuXG5leHBvcnQge1xuICBkZWZhdWx0U3RvcmFnZSxcbiAgZGVmYXVsdFJlcXVlc3QsXG4gIFRvUmVzcG9uc2VFcnJvck9wdGlvbnMsXG4gIHRvUmVzcG9uc2VFcnJvcixcbiAgZ2VuZXJhdGVSZXF1ZXN0SWQsXG4gIE9BdXRoMkNsaWVudCxcbn0gZnJvbSAnLi9vYXV0aDJjbGllbnQvb2F1dGgyY2xpZW50JztcblxuZXhwb3J0IHsgQXV0aENsaWVudCwgU2ltcGxlU3RvcmFnZSB9IGZyb20gJy4vb2F1dGgyY2xpZW50L2ludGVyZmFjZSc7XG5cbi8vIGltcG9ydCB7IENyZWRlbnRpYWxzIH0gZnJvbSAnLi9vYXV0aDJjbGllbnQvbW9kZWxzJ1xuZXhwb3J0IHtcbiAgQ3JlZGVudGlhbHMsXG4gIFJlc3BvbnNlRXJyb3IsXG4gIE9BdXRoMkNsaWVudE9wdGlvbnMsXG4gIEF1dGhDbGllbnRSZXF1ZXN0T3B0aW9ucyxcbn0gZnJvbSAnLi9vYXV0aDJjbGllbnQvbW9kZWxzJztcblxuaW1wb3J0IHsgQXV0aE9wdGlvbnMsIEF1dGggfSBmcm9tICcuL2F1dGgvYXBpcydcblxuZXhwb3J0IHsgQXV0aE9wdGlvbnMsIEF1dGggfSBmcm9tICcuL2F1dGgvYXBpcyc7XG5cbmltcG9ydCAqIGFzIGF1dGhNb2RlbHMgZnJvbSAnLi9hdXRoL21vZGVscyc7XG5leHBvcnQgeyBhdXRoTW9kZWxzIH07XG5cblxuZXhwb3J0IGNsYXNzIENsb3VkYmFzZU9BdXRoIHtcbiAgcHVibGljIG9hdXRoMmNsaWVudDogT0F1dGgyQ2xpZW50XG4gIHB1YmxpYyBhdXRoQXBpOiBBdXRoXG5cbiAgY29uc3RydWN0b3IoYXV0aE9wdGlvbnM6IEF1dGhPcHRpb25zKSB7XG4gICAgY29uc3QgeyBhcGlPcmlnaW4sIGNsaWVudElkIH0gPSBhdXRoT3B0aW9uc1xuICAgIHRoaXMub2F1dGgyY2xpZW50ID0gbmV3IE9BdXRoMkNsaWVudCh7XG4gICAgICBhcGlPcmlnaW4sXG4gICAgICBjbGllbnRJZFxuICAgIH0pXG5cbiAgICB0aGlzLmF1dGhBcGkgPSBuZXcgQXV0aCh7XG4gICAgICBjcmVkZW50aWFsc0NsaWVudDogdGhpcy5vYXV0aDJjbGllbnQsXG4gICAgICAuLi5hdXRoT3B0aW9uc1xuICAgIH0pXG4gIH1cbn1cblxuIl19