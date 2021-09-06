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
        console.log('test');
        console.log('this', this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsc0NBQWdEO0FBQ2hELGtEQUE4QztBQUN0QyxJQUFBLHNCQUFzQixHQUFLLG1CQUFPLHVCQUFaLENBQVk7QUFFMUMsZ0RBQTBEO0FBQWpELGdHQUFBLE1BQU0sT0FBQTtBQUFFLG1HQUFBLFNBQVMsT0FBQTtBQUUxQiw0REFBMEQ7QUFFMUQsNERBT3FDO0FBTm5DLDhHQUFBLGNBQWMsT0FBQTtBQUNkLDhHQUFBLGNBQWMsT0FBQTtBQUVkLCtHQUFBLGVBQWUsT0FBQTtBQUNmLGlIQUFBLGlCQUFpQixPQUFBO0FBQ2pCLDRHQUFBLFlBQVksT0FBQTtBQUdkLHNEQUFxRTtBQUE1RCx1R0FBQSxVQUFVLE9BQUE7QUFVbkIsb0NBQStDO0FBRS9DLG9DQUFnRDtBQUExQiw0RkFBQSxJQUFJLE9BQUE7QUFFMUIsd0RBQTRDO0FBQ25DLGdDQUFVO0FBSW5CLElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQztBQUUvQjtJQUtFLHdCQUFZLFdBQXdCO1FBQzFCLElBQUEsU0FBUyxHQUF5QixXQUFXLFVBQXBDLEVBQUUsUUFBUSxHQUFlLFdBQVcsU0FBMUIsRUFBRSxRQUFRLEdBQUssV0FBVyxTQUFoQixDQUFnQjtRQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksMkJBQVksQ0FBQztZQUNuQyxTQUFTLFdBQUE7WUFDVCxRQUFRLFVBQUE7U0FDVCxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksV0FBSSxZQUNyQixpQkFBaUIsRUFBRSxJQUFJLENBQUMsWUFBWSxJQUNqQyxXQUFXLEVBQ2QsQ0FBQTtJQUNKLENBQUM7SUFFWSw0Q0FBbUIsR0FBaEM7Ozs7Ozt3QkFDVSxRQUFRLEdBQUssSUFBSSxTQUFULENBQVM7d0JBQ25CLFlBQVksR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFBO3dCQUNwQyxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsSUFBSyxRQUFnQixDQUFDLEtBQUssRUFBRSxDQUFBO3dCQUN2RCxLQUFBLFlBQVksQ0FBQTtpQ0FBWixjQUFZO3dCQUFJLFdBQU0sWUFBWSxDQUFDLGFBQWEsRUFBRSxFQUFBOzs4QkFBbEMsU0FBa0M7Ozt3QkFBOUQsU0FBUyxLQUFxRDt3QkFDcEUsSUFBSSxTQUFTLEVBQUU7NEJBQ2IsV0FBTyxNQUFNLEVBQUE7eUJBQ2Q7d0JBQ2tCLEtBQUEsYUFBYSxDQUFBO2lDQUFiLGNBQWE7d0JBQUksV0FBTSxhQUFhLENBQUMsYUFBYSxFQUFFLEVBQUE7OzhCQUFuQyxTQUFtQzs7O3dCQUFqRSxVQUFVLEtBQXVEO3dCQUN2RSxJQUFJLFVBQVUsRUFBRTs0QkFDZCxXQUFPLE9BQU8sRUFBQTt5QkFDZjt3QkFDRCxXQUFPLEVBQUUsRUFBQTs7OztLQUNWO0lBVVksK0JBQU0sR0FBbkIsVUFBb0IsTUFBZ0M7OztnQkFDbEQsV0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQTs7O0tBQ25DO0lBRVksZ0NBQU8sR0FBcEI7OztnQkFDRSxXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUE7OztLQUM5QjtJQU9ZLHNDQUFhLEdBQTFCOzs7Z0JBQ0UsV0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFBOzs7S0FDcEM7SUFFWSxvQ0FBVyxHQUF4Qjs7O2dCQUNFLFdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBQTs7O0tBQ2xDO0lBT1ksc0NBQWEsR0FBMUI7OztnQkFDRSxXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUE7OztLQUNwQztJQUVNLDBDQUFpQixHQUF4QjtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO0lBQ3pDLENBQUM7SUFRWSwwQ0FBaUIsR0FBOUI7OztnQkFDRSxXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsRUFBQTs7O0tBQ3hDO0lBMUNEO1FBREMsc0JBQXNCLEVBQUU7Ozs7Z0RBR3hCO0lBc0NEO1FBREMsc0JBQXNCLEVBQUU7Ozs7MkRBR3hCO0lBQ0gscUJBQUM7Q0FBQSxBQXJGRCxJQXFGQztBQUVELElBQU0sU0FBUyxHQUF3QjtJQUNyQyxJQUFJLEVBQUUsY0FBYztJQUNwQixTQUFTLEVBQUUsT0FBTztJQUNsQixNQUFNLEVBQUU7UUFFTixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQzNCO1FBRU8sSUFBQSxHQUFHLEdBQUssSUFBSSxDQUFDLE1BQU0sSUFBaEIsQ0FBaUI7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksY0FBYyxDQUFDO1lBQ3RDLFFBQVEsRUFBRSxHQUFHO1lBQ2IsU0FBUyxFQUFFLHFCQUFlLEVBQUU7WUFDNUIsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQztDQUNGLENBQUE7QUFFRCxJQUFJO0lBR0YsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQ3hDO0FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbG91ZGJhc2VDb21wb25lbnQgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBnZXRCYXNlRW5kUG9pbnQgfSBmcm9tICdAY2xvdWRiYXNlL2FwcCdcbmltcG9ydCB7IGhlbHBlcnMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcydcbmNvbnN0IHsgc3RvcE9BdXRoTG9naW5XaXRoQXV0aCB9ID0gaGVscGVyc1xuXG5leHBvcnQgeyBTeW50YXgsIEVycm9yVHlwZSB9IGZyb20gJy4vb2F1dGgyY2xpZW50L2NvbnN0cyc7XG5cbmltcG9ydCB7IE9BdXRoMkNsaWVudCB9IGZyb20gJy4vb2F1dGgyY2xpZW50L29hdXRoMmNsaWVudCdcblxuZXhwb3J0IHtcbiAgZGVmYXVsdFN0b3JhZ2UsXG4gIGRlZmF1bHRSZXF1ZXN0LFxuICBUb1Jlc3BvbnNlRXJyb3JPcHRpb25zLFxuICB0b1Jlc3BvbnNlRXJyb3IsXG4gIGdlbmVyYXRlUmVxdWVzdElkLFxuICBPQXV0aDJDbGllbnQsXG59IGZyb20gJy4vb2F1dGgyY2xpZW50L29hdXRoMmNsaWVudCc7XG5cbmV4cG9ydCB7IEF1dGhDbGllbnQsIFNpbXBsZVN0b3JhZ2UgfSBmcm9tICcuL29hdXRoMmNsaWVudC9pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBDcmVkZW50aWFscyB9IGZyb20gJy4vb2F1dGgyY2xpZW50L21vZGVscydcbmV4cG9ydCB7XG4gIENyZWRlbnRpYWxzLFxuICBSZXNwb25zZUVycm9yLFxuICBPQXV0aDJDbGllbnRPcHRpb25zLFxuICBBdXRoQ2xpZW50UmVxdWVzdE9wdGlvbnMsXG59IGZyb20gJy4vb2F1dGgyY2xpZW50L21vZGVscyc7XG5cbmltcG9ydCB7IEF1dGhPcHRpb25zLCBBdXRoIH0gZnJvbSAnLi9hdXRoL2FwaXMnXG5cbmV4cG9ydCB7IEF1dGhPcHRpb25zLCBBdXRoIH0gZnJvbSAnLi9hdXRoL2FwaXMnO1xuXG5pbXBvcnQgKiBhcyBhdXRoTW9kZWxzIGZyb20gJy4vYXV0aC9tb2RlbHMnO1xuZXhwb3J0IHsgYXV0aE1vZGVscyB9O1xuXG5kZWNsYXJlIGNvbnN0IGNsb3VkYmFzZTogSUNsb3VkYmFzZTtcblxuY29uc3QgQ09NUE9ORU5UX05BTUUgPSAnb2F1dGgnO1xuXG5jbGFzcyBDbG91ZGJhc2VPQXV0aCB7XG4gIHB1YmxpYyBvYXV0aDJjbGllbnQ6IE9BdXRoMkNsaWVudFxuICBwdWJsaWMgYXV0aEFwaTogQXV0aFxuICBwcml2YXRlIF9mcm9tQXBwOiBJQ2xvdWRiYXNlXG5cbiAgY29uc3RydWN0b3IoYXV0aE9wdGlvbnM6IEF1dGhPcHRpb25zKSB7XG4gICAgY29uc3QgeyBhcGlPcmlnaW4sIGNsaWVudElkLCBfZnJvbUFwcCB9ID0gYXV0aE9wdGlvbnNcbiAgICB0aGlzLl9mcm9tQXBwID0gX2Zyb21BcHBcbiAgICB0aGlzLm9hdXRoMmNsaWVudCA9IG5ldyBPQXV0aDJDbGllbnQoe1xuICAgICAgYXBpT3JpZ2luLFxuICAgICAgY2xpZW50SWRcbiAgICB9KVxuXG4gICAgdGhpcy5hdXRoQXBpID0gbmV3IEF1dGgoe1xuICAgICAgY3JlZGVudGlhbHNDbGllbnQ6IHRoaXMub2F1dGgyY2xpZW50LFxuICAgICAgLi4uYXV0aE9wdGlvbnNcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGNoZWNrRnJvbUF1dGhWMU9yVjIoKSB7XG4gICAgY29uc3QgeyBfZnJvbUFwcCB9ID0gdGhpc1xuICAgIGNvbnN0IGF1dGhJbnN0YW5jZSA9IF9mcm9tQXBwLmF1dGhJbnN0YW5jZVxuICAgIGNvbnN0IG9hdXRoSW5zdGFuY2UgPSBfZnJvbUFwcC5vYXV0aEluc3RhbmNlIHx8IChfZnJvbUFwcCBhcyBhbnkpLm9hdXRoKClcbiAgICBjb25zdCBhdXRoTG9naW4gPSBhdXRoSW5zdGFuY2UgJiYgYXdhaXQgYXV0aEluc3RhbmNlLmdldExvZ2luU3RhdGUoKVxuICAgIGlmIChhdXRoTG9naW4pIHtcbiAgICAgIHJldHVybiAnYXV0aCdcbiAgICB9XG4gICAgY29uc3Qgb2F1dGhMb2dpbiA9IG9hdXRoSW5zdGFuY2UgJiYgYXdhaXQgb2F1dGhJbnN0YW5jZS5oYXNMb2dpblN0YXRlKClcbiAgICBpZiAob2F1dGhMb2dpbikge1xuICAgICAgcmV0dXJuICdvYXV0aCdcbiAgICB9XG4gICAgcmV0dXJuICcnXG4gIH1cblxuXG4gIC8qKlxuICAgKiDnmbvlvZVcbiAgICogQHBhcmFtIHthdXRoTW9kZWxzLlNpZ25JblJlcXVlc3R9IHBhcmFtc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDcmVkZW50aWFscz59XG4gICAqIEBtZW1iZXJvZiBDbG91ZGJhc2VPQXV0aFxuICAgKi9cbiAgQHN0b3BPQXV0aExvZ2luV2l0aEF1dGgoKVxuICBwdWJsaWMgYXN5bmMgc2lnbkluKHBhcmFtczogYXV0aE1vZGVscy5TaWduSW5SZXF1ZXN0KTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIHJldHVybiB0aGlzLmF1dGhBcGkuc2lnbkluKHBhcmFtcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzaWduT3V0KCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuYXV0aEFwaS5zaWduT3V0KClcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayDlvZPliY3mmK/lkKblt7Igb2F1dGgg55m75b2VXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fVxuICAgKiBAbWVtYmVyb2YgQ2xvdWRiYXNlT0F1dGhcbiAgICovXG4gIHB1YmxpYyBhc3luYyBoYXNMb2dpblN0YXRlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmF1dGhBcGkuaGFzTG9naW5TdGF0ZSgpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0VXNlckluZm8oKTogUHJvbWlzZTxhdXRoTW9kZWxzLlVzZXJQcm9maWxlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXV0aEFwaS5nZXRVc2VySW5mbygpXG4gIH1cblxuICAvKipcbiAgICog6I635Y+WIG9hdXRoIOeZu+W9leaAgVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn1cbiAgICogQG1lbWJlcm9mIENsb3VkYmFzZU9BdXRoXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0TG9naW5TdGF0ZSgpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgcmV0dXJuIHRoaXMuYXV0aEFwaS5nZXRMb2dpblN0YXRlKClcbiAgfVxuXG4gIHB1YmxpYyBoYXNMb2dpblN0YXRlU3luYygpOiBDcmVkZW50aWFscyB7XG4gICAgcmV0dXJuIHRoaXMuYXV0aEFwaS5oYXNMb2dpblN0YXRlU3luYygpXG4gIH1cblxuICAvKipcbiAgICog5Yy/5ZCN55m75b2VXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPENyZWRlbnRpYWxzPn1cbiAgICogQG1lbWJlcm9mIENsb3VkYmFzZU9BdXRoXG4gICAqL1xuICBAc3RvcE9BdXRoTG9naW5XaXRoQXV0aCgpXG4gIHB1YmxpYyBhc3luYyBzaWduSW5Bbm9ueW1vdXNseSgpOiBQcm9taXNlPENyZWRlbnRpYWxzPiB7XG4gICAgcmV0dXJuIHRoaXMuYXV0aEFwaS5zaWduSW5Bbm9ueW1vdXNseSgpXG4gIH1cbn1cblxuY29uc3QgY29tcG9uZW50OiBJQ2xvdWRiYXNlQ29tcG9uZW50ID0ge1xuICBuYW1lOiBDT01QT05FTlRfTkFNRSxcbiAgbmFtZXNwYWNlOiAnb2F1dGgnLFxuICBlbnRpdHk6IGZ1bmN0aW9uICgpIHtcblxuICAgIGlmICh0aGlzLm9hdXRoSW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLm9hdXRoSW5zdGFuY2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBlbnYgfSA9IHRoaXMuY29uZmlnO1xuICAgIGNvbnNvbGUubG9nKCd0ZXN0JylcbiAgICBjb25zb2xlLmxvZygndGhpcycsIHRoaXMpXG4gICAgdGhpcy5vYXV0aEluc3RhbmNlID0gbmV3IENsb3VkYmFzZU9BdXRoKHtcbiAgICAgIGNsaWVudElkOiBlbnYsXG4gICAgICBhcGlPcmlnaW46IGdldEJhc2VFbmRQb2ludCgpLFxuICAgICAgX2Zyb21BcHA6IHRoaXNcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5vYXV0aEluc3RhbmNlO1xuICB9XG59XG5cbnRyeSB7XG4gIC8vIOWwneivleiHquWKqOazqOWGjOiHs+WFqOWxgOWPmOmHj2Nsb3VkYmFzZVxuICAvLyDmraTooYzkuLrlj6rlnKjmtY/op4jlmajnjq/looPkuIvmnInmlYhcbiAgY2xvdWRiYXNlLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG59IGNhdGNoIChlKSB7IH0iXX0=