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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authModels = void 0;
var app_1 = require("@cloudbase/app");
var utilities_1 = require("@cloudbase/utilities");
var stopOAuthLoginWithAuth = utilities_1.helpers.stopOAuthLoginWithAuth;
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
var COMPONENT_NAME = 'oauth';
var CloudbaseOAuth = (function () {
    function CloudbaseOAuth(authOptions) {
        var apiOrigin = authOptions.apiOrigin, clientId = authOptions.clientId, _fromApp = authOptions._fromApp;
        this._fromApp = _fromApp;
        this.oauth2client = new oauth2client_1.OAuth2Client({
            apiOrigin: apiOrigin,
            clientId: clientId
        });
        this.authApi = new apis_1.Auth(__assign({ credentialsClient: this.oauth2client }, authOptions));
    }
    CloudbaseOAuth.prototype.checkFromAuthV1OrV2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _fromApp, authInstance, oauthInstance, authLogin, _a, oauthLogin, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _fromApp = this._fromApp;
                        authInstance = _fromApp.authInstance;
                        oauthInstance = _fromApp.oauthInstance || _fromApp.oauth();
                        _a = authInstance;
                        if (!_a) return [3, 2];
                        return [4, authInstance.getLoginState()];
                    case 1:
                        _a = (_c.sent());
                        _c.label = 2;
                    case 2:
                        authLogin = _a;
                        if (authLogin) {
                            return [2, 'auth'];
                        }
                        _b = oauthInstance;
                        if (!_b) return [3, 4];
                        return [4, oauthInstance.hasLoginState()];
                    case 3:
                        _b = (_c.sent());
                        _c.label = 4;
                    case 4:
                        oauthLogin = _b;
                        if (oauthLogin) {
                            return [2, 'oauth'];
                        }
                        return [2, ''];
                }
            });
        });
    };
    CloudbaseOAuth.prototype.signIn = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.authApi.signIn(params)];
            });
        });
    };
    CloudbaseOAuth.prototype.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.authApi.signOut()];
            });
        });
    };
    CloudbaseOAuth.prototype.hasLoginState = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.authApi.hasLoginState()];
            });
        });
    };
    CloudbaseOAuth.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.authApi.getUserInfo()];
            });
        });
    };
    CloudbaseOAuth.prototype.getLoginState = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.authApi.getLoginState()];
            });
        });
    };
    CloudbaseOAuth.prototype.hasLoginStateSync = function () {
        return this.authApi.hasLoginStateSync();
    };
    CloudbaseOAuth.prototype.signInAnonymously = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.authApi.signInAnonymously()];
            });
        });
    };
    __decorate([
        stopOAuthLoginWithAuth(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], CloudbaseOAuth.prototype, "signIn", null);
    __decorate([
        stopOAuthLoginWithAuth(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], CloudbaseOAuth.prototype, "signInAnonymously", null);
    return CloudbaseOAuth;
}());
var component = {
    name: COMPONENT_NAME,
    namespace: 'oauth',
    entity: function () {
        if (this.oauthInstance) {
            return this.oauthInstance;
        }
        var env = this.config.env;
        this.oauthInstance = new CloudbaseOAuth({
            clientId: env,
            apiOrigin: app_1.getBaseEndPoint(),
            _fromApp: this
        });
        return this.oauthInstance;
    }
};
try {
    cloudbase.registerComponent(component);
}
catch (e) { }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsc0NBQWdEO0FBQ2hELGtEQUE4QztBQUN0QyxJQUFBLHNCQUFzQixHQUFLLG1CQUFPLHVCQUFaLENBQVk7QUFFMUMsZ0RBQTBEO0FBQWpELGdHQUFBLE1BQU0sT0FBQTtBQUFFLG1HQUFBLFNBQVMsT0FBQTtBQUUxQiw0REFBMEQ7QUFFMUQsNERBT3FDO0FBTm5DLDhHQUFBLGNBQWMsT0FBQTtBQUNkLDhHQUFBLGNBQWMsT0FBQTtBQUVkLCtHQUFBLGVBQWUsT0FBQTtBQUNmLGlIQUFBLGlCQUFpQixPQUFBO0FBQ2pCLDRHQUFBLFlBQVksT0FBQTtBQUdkLHNEQUFxRTtBQUE1RCx1R0FBQSxVQUFVLE9BQUE7QUFVbkIsb0NBQStDO0FBRS9DLG9DQUFnRDtBQUExQiw0RkFBQSxJQUFJLE9BQUE7QUFFMUIsd0RBQTRDO0FBQ25DLGdDQUFVO0FBSW5CLElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQztBQUUvQjtJQUtFLHdCQUFZLFdBQXdCO1FBQzFCLElBQUEsU0FBUyxHQUF5QixXQUFXLFVBQXBDLEVBQUUsUUFBUSxHQUFlLFdBQVcsU0FBMUIsRUFBRSxRQUFRLEdBQUssV0FBVyxTQUFoQixDQUFnQjtRQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksMkJBQVksQ0FBQztZQUNuQyxTQUFTLFdBQUE7WUFDVCxRQUFRLFVBQUE7U0FDVCxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksV0FBSSxZQUNyQixpQkFBaUIsRUFBRSxJQUFJLENBQUMsWUFBWSxJQUNqQyxXQUFXLEVBQ2QsQ0FBQTtJQUNKLENBQUM7SUFFWSw0Q0FBbUIsR0FBaEM7Ozs7Ozt3QkFDVSxRQUFRLEdBQUssSUFBSSxTQUFULENBQVM7d0JBQ25CLFlBQVksR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFBO3dCQUNwQyxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsSUFBSyxRQUFnQixDQUFDLEtBQUssRUFBRSxDQUFBO3dCQUN2RCxLQUFBLFlBQVksQ0FBQTtpQ0FBWixjQUFZO3dCQUFJLFdBQU0sWUFBWSxDQUFDLGFBQWEsRUFBRSxFQUFBOzs4QkFBbEMsU0FBa0M7Ozt3QkFBOUQsU0FBUyxLQUFxRDt3QkFDcEUsSUFBSSxTQUFTLEVBQUU7NEJBQ2IsV0FBTyxNQUFNLEVBQUE7eUJBQ2Q7d0JBQ2tCLEtBQUEsYUFBYSxDQUFBO2lDQUFiLGNBQWE7d0JBQUksV0FBTSxhQUFhLENBQUMsYUFBYSxFQUFFLEVBQUE7OzhCQUFuQyxTQUFtQzs7O3dCQUFqRSxVQUFVLEtBQXVEO3dCQUN2RSxJQUFJLFVBQVUsRUFBRTs0QkFDZCxXQUFPLE9BQU8sRUFBQTt5QkFDZjt3QkFDRCxXQUFPLEVBQUUsRUFBQTs7OztLQUNWO0lBVVksK0JBQU0sR0FBbkIsVUFBb0IsTUFBZ0M7OztnQkFDbEQsV0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQTs7O0tBQ25DO0lBRVksZ0NBQU8sR0FBcEI7OztnQkFDRSxXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUE7OztLQUM5QjtJQU9ZLHNDQUFhLEdBQTFCOzs7Z0JBQ0UsV0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFBOzs7S0FDcEM7SUFFWSxvQ0FBVyxHQUF4Qjs7O2dCQUNFLFdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBQTs7O0tBQ2xDO0lBT1ksc0NBQWEsR0FBMUI7OztnQkFDRSxXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUE7OztLQUNwQztJQUVNLDBDQUFpQixHQUF4QjtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO0lBQ3pDLENBQUM7SUFRWSwwQ0FBaUIsR0FBOUI7OztnQkFDRSxXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsRUFBQTs7O0tBQ3hDO0lBMUNEO1FBREMsc0JBQXNCLEVBQUU7Ozs7Z0RBR3hCO0lBc0NEO1FBREMsc0JBQXNCLEVBQUU7Ozs7MkRBR3hCO0lBQ0gscUJBQUM7Q0FBQSxBQXJGRCxJQXFGQztBQUVELElBQU0sU0FBUyxHQUF3QjtJQUNyQyxJQUFJLEVBQUUsY0FBYztJQUNwQixTQUFTLEVBQUUsT0FBTztJQUNsQixNQUFNLEVBQUU7UUFFTixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQzNCO1FBRU8sSUFBQSxHQUFHLEdBQUssSUFBSSxDQUFDLE1BQU0sSUFBaEIsQ0FBaUI7UUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FBQztZQUN0QyxRQUFRLEVBQUUsR0FBRztZQUNiLFNBQVMsRUFBRSxxQkFBZSxFQUFFO1lBQzVCLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7Q0FDRixDQUFBO0FBRUQsSUFBSTtJQUdGLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUN4QztBQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2xvdWRiYXNlQ29tcG9uZW50IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jb21wb25lbnQnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuaW1wb3J0IHsgZ2V0QmFzZUVuZFBvaW50IH0gZnJvbSAnQGNsb3VkYmFzZS9hcHAnXG5pbXBvcnQgeyBoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnXG5jb25zdCB7IHN0b3BPQXV0aExvZ2luV2l0aEF1dGggfSA9IGhlbHBlcnNcblxuZXhwb3J0IHsgU3ludGF4LCBFcnJvclR5cGUgfSBmcm9tICcuL29hdXRoMmNsaWVudC9jb25zdHMnO1xuXG5pbXBvcnQgeyBPQXV0aDJDbGllbnQgfSBmcm9tICcuL29hdXRoMmNsaWVudC9vYXV0aDJjbGllbnQnXG5cbmV4cG9ydCB7XG4gIGRlZmF1bHRTdG9yYWdlLFxuICBkZWZhdWx0UmVxdWVzdCxcbiAgVG9SZXNwb25zZUVycm9yT3B0aW9ucyxcbiAgdG9SZXNwb25zZUVycm9yLFxuICBnZW5lcmF0ZVJlcXVlc3RJZCxcbiAgT0F1dGgyQ2xpZW50LFxufSBmcm9tICcuL29hdXRoMmNsaWVudC9vYXV0aDJjbGllbnQnO1xuXG5leHBvcnQgeyBBdXRoQ2xpZW50LCBTaW1wbGVTdG9yYWdlIH0gZnJvbSAnLi9vYXV0aDJjbGllbnQvaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgQ3JlZGVudGlhbHMgfSBmcm9tICcuL29hdXRoMmNsaWVudC9tb2RlbHMnXG5leHBvcnQge1xuICBDcmVkZW50aWFscyxcbiAgUmVzcG9uc2VFcnJvcixcbiAgT0F1dGgyQ2xpZW50T3B0aW9ucyxcbiAgQXV0aENsaWVudFJlcXVlc3RPcHRpb25zLFxufSBmcm9tICcuL29hdXRoMmNsaWVudC9tb2RlbHMnO1xuXG5pbXBvcnQgeyBBdXRoT3B0aW9ucywgQXV0aCB9IGZyb20gJy4vYXV0aC9hcGlzJ1xuXG5leHBvcnQgeyBBdXRoT3B0aW9ucywgQXV0aCB9IGZyb20gJy4vYXV0aC9hcGlzJztcblxuaW1wb3J0ICogYXMgYXV0aE1vZGVscyBmcm9tICcuL2F1dGgvbW9kZWxzJztcbmV4cG9ydCB7IGF1dGhNb2RlbHMgfTtcblxuZGVjbGFyZSBjb25zdCBjbG91ZGJhc2U6IElDbG91ZGJhc2U7XG5cbmNvbnN0IENPTVBPTkVOVF9OQU1FID0gJ29hdXRoJztcblxuY2xhc3MgQ2xvdWRiYXNlT0F1dGgge1xuICBwdWJsaWMgb2F1dGgyY2xpZW50OiBPQXV0aDJDbGllbnRcbiAgcHVibGljIGF1dGhBcGk6IEF1dGhcbiAgcHJpdmF0ZSBfZnJvbUFwcDogSUNsb3VkYmFzZVxuXG4gIGNvbnN0cnVjdG9yKGF1dGhPcHRpb25zOiBBdXRoT3B0aW9ucykge1xuICAgIGNvbnN0IHsgYXBpT3JpZ2luLCBjbGllbnRJZCwgX2Zyb21BcHAgfSA9IGF1dGhPcHRpb25zXG4gICAgdGhpcy5fZnJvbUFwcCA9IF9mcm9tQXBwXG4gICAgdGhpcy5vYXV0aDJjbGllbnQgPSBuZXcgT0F1dGgyQ2xpZW50KHtcbiAgICAgIGFwaU9yaWdpbixcbiAgICAgIGNsaWVudElkXG4gICAgfSlcblxuICAgIHRoaXMuYXV0aEFwaSA9IG5ldyBBdXRoKHtcbiAgICAgIGNyZWRlbnRpYWxzQ2xpZW50OiB0aGlzLm9hdXRoMmNsaWVudCxcbiAgICAgIC4uLmF1dGhPcHRpb25zXG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjaGVja0Zyb21BdXRoVjFPclYyKCkge1xuICAgIGNvbnN0IHsgX2Zyb21BcHAgfSA9IHRoaXNcbiAgICBjb25zdCBhdXRoSW5zdGFuY2UgPSBfZnJvbUFwcC5hdXRoSW5zdGFuY2VcbiAgICBjb25zdCBvYXV0aEluc3RhbmNlID0gX2Zyb21BcHAub2F1dGhJbnN0YW5jZSB8fCAoX2Zyb21BcHAgYXMgYW55KS5vYXV0aCgpXG4gICAgY29uc3QgYXV0aExvZ2luID0gYXV0aEluc3RhbmNlICYmIGF3YWl0IGF1dGhJbnN0YW5jZS5nZXRMb2dpblN0YXRlKClcbiAgICBpZiAoYXV0aExvZ2luKSB7XG4gICAgICByZXR1cm4gJ2F1dGgnXG4gICAgfVxuICAgIGNvbnN0IG9hdXRoTG9naW4gPSBvYXV0aEluc3RhbmNlICYmIGF3YWl0IG9hdXRoSW5zdGFuY2UuaGFzTG9naW5TdGF0ZSgpXG4gICAgaWYgKG9hdXRoTG9naW4pIHtcbiAgICAgIHJldHVybiAnb2F1dGgnXG4gICAgfVxuICAgIHJldHVybiAnJ1xuICB9XG5cblxuICAvKipcbiAgICog55m75b2VXG4gICAqIEBwYXJhbSB7YXV0aE1vZGVscy5TaWduSW5SZXF1ZXN0fSBwYXJhbXNcbiAgICogQHJldHVybnMge1Byb21pc2U8Q3JlZGVudGlhbHM+fVxuICAgKiBAbWVtYmVyb2YgQ2xvdWRiYXNlT0F1dGhcbiAgICovXG4gIEBzdG9wT0F1dGhMb2dpbldpdGhBdXRoKClcbiAgcHVibGljIGFzeW5jIHNpZ25JbihwYXJhbXM6IGF1dGhNb2RlbHMuU2lnbkluUmVxdWVzdCk6IFByb21pc2U8Q3JlZGVudGlhbHM+IHtcbiAgICByZXR1cm4gdGhpcy5hdXRoQXBpLnNpZ25JbihwYXJhbXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2lnbk91dCgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmF1dGhBcGkuc2lnbk91dCgpXG4gIH1cblxuICAvKipcbiAgICogY2hlY2sg5b2T5YmN5piv5ZCm5beyIG9hdXRoIOeZu+W9lVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn1cbiAgICogQG1lbWJlcm9mIENsb3VkYmFzZU9BdXRoXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaGFzTG9naW5TdGF0ZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5hdXRoQXBpLmhhc0xvZ2luU3RhdGUoKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFVzZXJJbmZvKCk6IFByb21pc2U8YXV0aE1vZGVscy5Vc2VyUHJvZmlsZT4ge1xuICAgIHJldHVybiB0aGlzLmF1dGhBcGkuZ2V0VXNlckluZm8oKVxuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPliBvYXV0aCDnmbvlvZXmgIFcbiAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59XG4gICAqIEBtZW1iZXJvZiBDbG91ZGJhc2VPQXV0aFxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldExvZ2luU3RhdGUoKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIHJldHVybiB0aGlzLmF1dGhBcGkuZ2V0TG9naW5TdGF0ZSgpXG4gIH1cblxuICBwdWJsaWMgaGFzTG9naW5TdGF0ZVN5bmMoKTogQ3JlZGVudGlhbHMge1xuICAgIHJldHVybiB0aGlzLmF1dGhBcGkuaGFzTG9naW5TdGF0ZVN5bmMoKVxuICB9XG5cbiAgLyoqXG4gICAqIOWMv+WQjeeZu+W9lVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDcmVkZW50aWFscz59XG4gICAqIEBtZW1iZXJvZiBDbG91ZGJhc2VPQXV0aFxuICAgKi9cbiAgQHN0b3BPQXV0aExvZ2luV2l0aEF1dGgoKVxuICBwdWJsaWMgYXN5bmMgc2lnbkluQW5vbnltb3VzbHkoKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIHJldHVybiB0aGlzLmF1dGhBcGkuc2lnbkluQW5vbnltb3VzbHkoKVxuICB9XG59XG5cbmNvbnN0IGNvbXBvbmVudDogSUNsb3VkYmFzZUNvbXBvbmVudCA9IHtcbiAgbmFtZTogQ09NUE9ORU5UX05BTUUsXG4gIG5hbWVzcGFjZTogJ29hdXRoJyxcbiAgZW50aXR5OiBmdW5jdGlvbiAoKSB7XG5cbiAgICBpZiAodGhpcy5vYXV0aEluc3RhbmNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5vYXV0aEluc3RhbmNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZW52IH0gPSB0aGlzLmNvbmZpZztcbiAgICB0aGlzLm9hdXRoSW5zdGFuY2UgPSBuZXcgQ2xvdWRiYXNlT0F1dGgoe1xuICAgICAgY2xpZW50SWQ6IGVudixcbiAgICAgIGFwaU9yaWdpbjogZ2V0QmFzZUVuZFBvaW50KCksXG4gICAgICBfZnJvbUFwcDogdGhpc1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLm9hdXRoSW5zdGFuY2U7XG4gIH1cbn1cblxudHJ5IHtcbiAgLy8g5bCd6K+V6Ieq5Yqo5rOo5YaM6Iez5YWo5bGA5Y+Y6YePY2xvdWRiYXNlXG4gIC8vIOatpOihjOS4uuWPquWcqOa1j+iniOWZqOeOr+Wig+S4i+acieaViFxuICBjbG91ZGJhc2UucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbn0gY2F0Y2ggKGUpIHsgfSJdfQ==