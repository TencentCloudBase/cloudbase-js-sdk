"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.OAuth2AuthProvider = void 0;
var base_1 = require("./base");
var utilities_1 = require("@cloudbase/utilities/");
var __1 = require("..");
var constants_1 = require("../constants");
var getSdkName = utilities_1.constants.getSdkName, ERRORS = utilities_1.constants.ERRORS, COMMUNITY_SITE_URL = utilities_1.constants.COMMUNITY_SITE_URL;
var catchErrorsDecorator = utilities_1.helpers.catchErrorsDecorator;
function qsParse(qs) {
    return qs.split('&').reduce(function (a, c) {
        var _a = c.split('='), key = _a[0], value = _a[1];
        a[key] = value;
        return a;
    }, {});
}
var kPaths = {
    prividerUri: '/auth/v1/provider/uri',
    prividerToken: '/auth/v1/provider/token',
    signinWithProvider: '/auth/v1/signin/with/provider',
    me: '/auth/v1/user/me',
    token: '/auth/v1/token',
};
var OAuth2AuthProvider = (function (_super) {
    __extends(OAuth2AuthProvider, _super);
    function OAuth2AuthProvider(config, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, config) || this;
        _this.popupWindowRef = null;
        _this.providerId = options.providerId;
        _this.clientId = options.clientId || config.env;
        _this.responseType = options.responseType || 'token';
        _this.scope = options.scope || '';
        _this.redirectUri = options.redirectUri || '';
        _this.syncProfile = options.syncProfile || false;
        _this.forceDisableSignUp = options.forceDisableSignUp || false;
        var recvMessageFromPopup = _this.recvMessageFromPopup.bind(_this);
        window.removeEventListener('message', recvMessageFromPopup);
        window.addEventListener('message', recvMessageFromPopup, false);
        return _this;
    }
    OAuth2AuthProvider.prototype.signIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, utilities_1.utils.printWarn(ERRORS.OPERATION_FAIL, 'API signIn has been deprecated, please use signInWithRedirect insteed')];
            });
        });
    };
    OAuth2AuthProvider.prototype.signInWithPopup = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.jumpToProviderPage(options)];
            });
        });
    };
    OAuth2AuthProvider.prototype.signInWithModal = function (elemId) {
        return __awaiter(this, void 0, void 0, function () {
            var authorize_uri, modal, style, html, script;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetchProviderRedirectURI()];
                    case 1:
                        authorize_uri = (_a.sent()).uri;
                        modal = document.getElementById(elemId);
                        modal.style.display = 'block';
                        style = "\n    <style>\n      /* The Modal (background) */\n      .modal {\n        display: none; /* Hidden by default */\n        position: fixed; /* Stay in place */\n        z-index: 1; /* Sit on top */\n        padding-top: 100px; /* Location of the box */\n        left: 0;\n        top: 0;\n        width: 100%; /* Full width */\n        height: 100%; /* Full height */\n        overflow: auto; /* Enable scroll if needed */\n        background-color: rgb(0,0,0); /* Fallback color */\n        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n      }\n  \n      /* Modal Content */\n      .modal-content {\n        background-color: #fefefe;\n        margin: auto;\n        padding: 20px;\n        border: 1px solid #888;\n        /* width: 80%; */\n      }\n  \n      /* The Close Button */\n      .close {\n        color: #aaaaaa;\n        float: right;\n        font-size: 28px;\n        font-weight: bold;\n      }\n      .close:hover,\n      .close:focus {\n        color: #000;\n        text-decoration: none;\n        cursor: pointer;\n      }\n      </style>\n    ";
                        html = "\n      <div class=\"modal-content\">\n        <span class=\"close\">&times;</span>\n        <iframe id=\"loginIframe\" src=\"" + authorize_uri + "\" title=\"iframe Example 1\" width=\"400\" height=\"300\"></iframe>\n      </div>\n    ";
                        script = "\n      <script>\n      // Get the <span> element that closes the modal\n      var span = document.getElementsByClassName(\"close\")[0];\n      \n      // When the user clicks on <span> (x), close the modal\n      span.onclick = function() {\n        modal.style.display = \"none\";\n      }\n  \n      // When the user clicks anywhere outside of the modal, close it\n      window.onclick = function(event) {\n        if (event.target == modal) {\n          modal.style.display = \"none\";\n        }\n      }\n\n      const loginIframe = document.getElementById(\"loginIframe\")\n      </script>\n    ";
                        modal.innerHTML = "\n      " + html + "\n      " + style + "\n      " + script + "\n    ";
                        return [2];
                }
            });
        });
    };
    OAuth2AuthProvider.prototype.jumpToProviderPage = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var authorize_uri, popup, popupWindowTarget, popupWindowFeatures, popupWindowRef, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.fetchProviderRedirectURI()];
                    case 1:
                        authorize_uri = (_a.sent()).uri;
                        popup = options.popup || {};
                        popupWindowTarget = popup.target || '_blank';
                        popupWindowFeatures = popup.features || 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';
                        popupWindowRef = this.popupWindowRef;
                        if (popupWindowRef === null || popupWindowRef.closed) {
                            popupWindowRef = window.open(authorize_uri, popupWindowTarget, popupWindowFeatures);
                        }
                        else if (this.popupWindowUrl !== authorize_uri) {
                            if (popupWindowRef && !popupWindowRef.closed) {
                                popupWindowRef.close();
                            }
                            popupWindowRef = window.open(authorize_uri, popupWindowTarget, popupWindowFeatures);
                        }
                        else {
                        }
                        if (!popupWindowRef) {
                            return [2, utilities_1.utils.printWarn(ERRORS.OPERATION_FAIL, "\u6253\u5F00\u7B2C\u4E09\u65B9\u767B\u5F55\u6388\u6743\u5931\u8D25\uFF0C\u53EF\u80FD\u662F\u7981\u7528\u4E86\u6D4F\u89C8\u5668\u5F39\u7A97\uFF0Curi: " + authorize_uri)];
                        }
                        this.popupWindowUrl = authorize_uri;
                        this.popupWindowRef = popupWindowRef;
                        this.popupWindowRef.focus();
                        return [3, 3];
                    case 2:
                        e_1 = _a.sent();
                        if (this.popupWindowRef && !this.popupWindowRef.closed) {
                            this.popupWindowRef.close();
                        }
                        throw new Error("[" + getSdkName() + "][" + ERRORS.UNKOWN_ERROR + "]" + e_1);
                    case 3: return [2];
                }
            });
        });
    };
    OAuth2AuthProvider.prototype.recvMessageFromPopup = function (event) {
        if (!event.isTrusted) {
            return;
        }
        if (this.popupWindowRef === event.source && event.data.source === 'cloudbase-login-redirect') {
            var data = event.data;
            this.continueSignIn(data.callbackInfo);
            if (!this.popupWindowRef.closed) {
                this.popupWindowRef.close();
            }
        }
    };
    OAuth2AuthProvider.prototype.continueSignIn = function (callbackInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var token, _a, accessTokenKey, accessTokenExpireKey, refreshTokenKey, refreshToken, accessToken, accessTokenExpire, loginState;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        callbackInfo = callbackInfo || this.getAuthPrividerCallbackInfoFromUrl();
                        return [4, this.signInWithProvider(callbackInfo)];
                    case 1:
                        token = _b.sent();
                        _a = this._cache.keys, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey, refreshTokenKey = _a.refreshTokenKey;
                        refreshToken = token.refresh_token, accessToken = token.access_token, accessTokenExpire = token.expires_in;
                        if (!accessToken || !accessTokenExpire) {
                            throw new Error(JSON.stringify({
                                code: 'SignFailure'
                            }));
                        }
                        return [4, Promise.all([
                                this._cache.setStoreAsync(refreshTokenKey, refreshToken),
                                this._cache.setStoreAsync(accessTokenKey, accessToken),
                                this._cache.setStoreAsync(accessTokenExpireKey, accessTokenExpire * 1000 + Date.now())
                            ])];
                    case 2:
                        _b.sent();
                        __1.eventBus.fire(__1.EVENTS.LOGIN_STATE_CHANGED);
                        __1.eventBus.fire(__1.EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this._config.env,
                            loginType: constants_1.OAUTH2_LOGINTYPE_PREFIX + "." + this.providerId,
                            persistence: this._config.persistence
                        });
                        loginState = new __1.LoginState({
                            envId: this._config.env,
                            cache: this._cache,
                            request: this._request
                        });
                        return [4, loginState.checkLocalStateAsync()];
                    case 3:
                        _b.sent();
                        return [2, loginState];
                }
            });
        });
    };
    OAuth2AuthProvider.prototype.getAuthPrividerCallbackInfoFromUrl = function () {
        return qsParse(decodeURIComponent((new URL(window.location.href).hash).replace('#', '')));
    };
    OAuth2AuthProvider.prototype.fetchProviderRedirectURI = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, response_type, provider_id, client_id, scope, redirect_uri, state, qs, resp;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {
                            response_type: this.responseType,
                            provider_id: this.providerId,
                            client_id: this.clientId,
                            scope: this.scope,
                            redirect_uri: this.redirectUri,
                            state: btoa(JSON.stringify({
                                t: Date.now(),
                                provider_id: this.providerId,
                                client_id: this.clientId,
                                routeKey: ''
                            })),
                        }, response_type = _a.response_type, provider_id = _a.provider_id, client_id = _a.client_id, scope = _a.scope, redirect_uri = _a.redirect_uri, state = _a.state;
                        qs = utilities_1.utils.toQueryString({
                            response_type: response_type,
                            provider_id: provider_id,
                            client_id: client_id,
                            scope: scope,
                            redirect_uri: redirect_uri,
                            state: state,
                        });
                        return [4, this.fetch(kPaths.prividerUri + "?" + qs, {
                                method: 'GET'
                            })];
                    case 1:
                        resp = _b.sent();
                        return [2, resp.json()];
                }
            });
        });
    };
    OAuth2AuthProvider.prototype.fetchProviderToken = function (callbackInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var body, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            provider_id: this.providerId,
                            client_id: this.clientId,
                            provider_redirect_uri: callbackInfo.href
                        };
                        if (callbackInfo.code) {
                            body.provider_code = callbackInfo.code;
                        }
                        else if (callbackInfo.access_token) {
                            body.provider_access_token = callbackInfo.access_token;
                        }
                        else if (callbackInfo.id_token) {
                            body.provider_id_token = callbackInfo.id_token;
                        }
                        return [4, this.fetch(kPaths.prividerToken, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(body)
                            })];
                    case 1:
                        resp = _a.sent();
                        return [2, resp.json()];
                }
            });
        });
    };
    OAuth2AuthProvider.prototype.signInWithProvider = function (callbackInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var token, body, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetchProviderToken(callbackInfo)];
                    case 1:
                        token = _a.sent();
                        body = {
                            client_id: this.clientId,
                            provider_token: token.provider_token,
                            sync_profile: this.syncProfile,
                            force_disable_sign_up: this.forceDisableSignUp
                        };
                        return [4, this.fetch(kPaths.signinWithProvider, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(body)
                            })];
                    case 2:
                        resp = _a.sent();
                        return [2, resp.json()];
                }
            });
        });
    };
    OAuth2AuthProvider.prototype.refreshUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, authorization, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._request.getAccessToken()];
                    case 1:
                        accessToken = (_a.sent()).accessToken;
                        authorization = "Bearer " + accessToken;
                        return [4, this.fetch(kPaths.me, {
                                method: 'GET',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': authorization
                                }
                            })];
                    case 2:
                        resp = _a.sent();
                        return [2, resp.json()];
                }
            });
        });
    };
    OAuth2AuthProvider.prototype.fetch = function (urlOrPath, init) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, seqIdFromHeader, body, seqId, body, seqId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._request.fetch(urlOrPath, init)];
                    case 1:
                        resp = _a.sent();
                        seqIdFromHeader = resp.headers.get('SeqId') || resp.headers.get('RequestId');
                        if (!(resp.status >= 400 && resp.status < 500)) return [3, 3];
                        return [4, resp.json()];
                    case 2:
                        body = _a.sent();
                        seqId = body.request_id || seqIdFromHeader;
                        throw new Error("[" + getSdkName() + "][OAuth2AuthProvider][status:" + resp.status + "][" + body.error + "(" + body.error_code + ")] " + body.error_description + " (" + seqId + ")");
                    case 3:
                        if (!(resp.status >= 500)) return [3, 5];
                        return [4, resp.json()];
                    case 4:
                        body = _a.sent();
                        seqId = body.request_id || seqIdFromHeader;
                        throw new Error("[" + getSdkName() + "][OAuth2AuthProvider][status:" + resp.status + "][" + body.error + "(" + body.error_code + ")] " + body.error_description + " (" + seqId + ")");
                    case 5: return [2, resp];
                }
            });
        });
    };
    __decorate([
        catchErrorsDecorator({
            title: '跳转第三方登录平台失败',
            messages: [
                '请确认以下各项：',
                '  1 - 调用 auth().oAuth2AuthProvider() 的参数是否正确',
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], OAuth2AuthProvider.prototype, "signInWithPopup", null);
    return OAuth2AuthProvider;
}(base_1.AuthProvider));
exports.OAuth2AuthProvider = OAuth2AuthProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgyQXV0aFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy9vYXV0aDJBdXRoUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUFxQztBQUlyQyxtREFBaUU7QUFDakUsd0JBQWlEO0FBQ2pELDBDQUF1RDtBQUUvQyxJQUFBLFVBQVUsR0FBaUMscUJBQVMsV0FBMUMsRUFBRSxNQUFNLEdBQXlCLHFCQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUsscUJBQVMsbUJBQWQsQ0FBYztBQUNwRCxJQUFBLG9CQUFvQixHQUFLLG1CQUFPLHFCQUFaLENBQVk7QUFFeEMsU0FBUyxPQUFPLENBQUMsRUFBVTtJQUN6QixPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7UUFDekIsSUFBQSxLQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQTFCLEdBQUcsUUFBQSxFQUFFLEtBQUssUUFBZ0IsQ0FBQTtRQUNqQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFBO1FBQ2QsT0FBTyxDQUFDLENBQUE7SUFDVixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDUixDQUFDO0FBRUQsSUFBTSxNQUFNLEdBQUc7SUFDYixXQUFXLEVBQUUsdUJBQXVCO0lBQ3BDLGFBQWEsRUFBRSx5QkFBeUI7SUFDeEMsa0JBQWtCLEVBQUUsK0JBQStCO0lBQ25ELEVBQUUsRUFBRSxrQkFBa0I7SUFDdEIsS0FBSyxFQUFFLGdCQUFnQjtDQUN4QixDQUFBO0FBNkhEO0lBQXdDLHNDQUFZO0lBaUJsRCw0QkFBWSxNQUE2RixFQUFFLE9BQXdDO1FBQXhDLHdCQUFBLEVBQUEsWUFBd0M7UUFBbkos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LElBQUksR0FBRyxDQUFBLEVBQWxCLGNBQWtCO3dCQUNVLFdBQU0sSUFBSSxDQUFDLElBQUksRUFBRSxFQUFBOzt3QkFBOUMsSUFBSSxHQUF5QixTQUFpQjt3QkFDOUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksZUFBZSxDQUFBO3dCQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLE1BQUksVUFBVSxFQUFFLHFDQUFnQyxJQUFJLENBQUMsTUFBTSxVQUFLLElBQUksQ0FBQyxLQUFLLFNBQUksSUFBSSxDQUFDLFVBQVUsV0FBTSxJQUFJLENBQUMsaUJBQWlCLFVBQUssS0FBSyxNQUFHLENBQUMsQ0FBQTs0QkFHekosV0FBTyxJQUFJLEVBQUE7Ozs7S0FDWjtJQXBZRDtRQVJDLG9CQUFvQixDQUFDO1lBQ3BCLEtBQUssRUFBRSxhQUFhO1lBQ3BCLFFBQVEsRUFBRTtnQkFDUixVQUFVO2dCQUNWLDhDQUE4QztnQkFDOUMsaUtBQTZCLGtCQUFvQjthQUNsRDtTQUNGLENBQUM7Ozs7NkRBTUQ7SUFnWUgseUJBQUM7Q0FBQSxBQWxiRCxDQUF3QyxtQkFBWSxHQWtibkQ7QUFsYlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi9iYXNlJ1xuaW1wb3J0IHsgSUNsb3VkYmFzZUF1dGhDb25maWcgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2F1dGgnXG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ2FjaGUgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NhY2hlJ1xuaW1wb3J0IHsgSUNsb3VkYmFzZVJlcXVlc3QgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL3JlcXVlc3QnXG5pbXBvcnQgeyBjb25zdGFudHMsIHV0aWxzLCBoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMvJ1xuaW1wb3J0IHsgZXZlbnRCdXMsIEVWRU5UUywgTG9naW5TdGF0ZSB9IGZyb20gJy4uJ1xuaW1wb3J0IHsgT0FVVEgyX0xPR0lOVFlQRV9QUkVGSVggfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG5jb25zdCB7IGdldFNka05hbWUsIEVSUk9SUywgQ09NTVVOSVRZX1NJVEVfVVJMIH0gPSBjb25zdGFudHNcbmNvbnN0IHsgY2F0Y2hFcnJvcnNEZWNvcmF0b3IgfSA9IGhlbHBlcnNcblxuZnVuY3Rpb24gcXNQYXJzZShxczogc3RyaW5nKTogb2JqZWN0IHtcbiAgcmV0dXJuIHFzLnNwbGl0KCcmJykucmVkdWNlKChhLCBjKSA9PiB7XG4gICAgY29uc3QgW2tleSwgdmFsdWVdID0gYy5zcGxpdCgnPScpXG4gICAgYVtrZXldID0gdmFsdWVcbiAgICByZXR1cm4gYVxuICB9LCB7fSlcbn1cblxuY29uc3Qga1BhdGhzID0ge1xuICBwcml2aWRlclVyaTogJy9hdXRoL3YxL3Byb3ZpZGVyL3VyaScsXG4gIHByaXZpZGVyVG9rZW46ICcvYXV0aC92MS9wcm92aWRlci90b2tlbicsXG4gIHNpZ25pbldpdGhQcm92aWRlcjogJy9hdXRoL3YxL3NpZ25pbi93aXRoL3Byb3ZpZGVyJyxcbiAgbWU6ICcvYXV0aC92MS91c2VyL21lJyxcbiAgdG9rZW46ICcvYXV0aC92MS90b2tlbicsXG59XG5cbmludGVyZmFjZSBJR2VuUHJvdmlkZXJSZWRpcmVjdFVSSVJlcXVlc3Qge1xuICByZXNwb25zZV90eXBlOiBzdHJpbmcgLy8gdG9rZW4gfCBjb2RlXG4gIHByb3ZpZGVyX2lkOiBzdHJpbmcgLy8gZ29vZ2xlIGdpdGh1YiAuLi5cbiAgY2xpZW50X2lkOiBzdHJpbmcgLy8gXG4gIHNjb3BlOiBzdHJpbmcgLy9cbiAgcmVkaXJlY3RfdXJpOiBzdHJpbmdcbiAgc3RhdGU/OiBzdHJpbmdcbiAgLy8gb3RoZXJfcGFyYW1zPzogc3RyaW5nXG59XG5cbmludGVyZmFjZSBJR2VuUHJvdmlkZXJSZWRpcmVjdFVSSVJlc3BvbnNlIHtcbiAgdXJpOiBzdHJpbmdcbiAgc2lnbm91dF91cmk6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgSUdyYW50UHJvdmlkZXJUb2tlblJlcXVlc3Qge1xuICBwcm92aWRlcl9pZDogc3RyaW5nXG4gIGNsaWVudF9pZDogc3RyaW5nXG5cbiAgLy8g5Lul5LiL5Y+C5pWw5Lu76YCJ5YW25LiA5Y2z5Y+vXG4gIHByb3ZpZGVyX2NvZGU/OiBzdHJpbmcgLy8gJ3Byb3ZpZGVyX2NvZGUnXG4gIHByb3ZpZGVyX2FjY2Vzc190b2tlbj86IHN0cmluZyAvLyAncHJvdmlkZXJfYWNjZXNzX3Rva2VuJ1xuICBwcm92aWRlcl9pZF90b2tlbj86IHN0cmluZyAvLyAncHJvdmlkZXJfaWRfdG9rZW4nXG5cbiAgcHJvdmlkZXJfcmVkaXJlY3RfdXJpPzogc3RyaW5nXG4gIHByb3ZpZGVyX3BhcmFtcz86IHN0cmluZyAvLyAncHJvdmlkZXJfcGFyYW1zJ1xufVxuXG5pbnRlcmZhY2UgSVByb3ZpZGVyUHJvZmlsZSB7XG4gIHByb3ZpZGVyX2lkOiBzdHJpbmdcbiAgLy8g5Li7SURcbiAgc3ViPzogc3RyaW5nXG4gIG5hbWU/OiBzdHJpbmdcbiAgcGljdHVyZT86IHN0cmluZ1xuICBlbWFpbD86IHN0cmluZ1xuICBwaG9uZV9udW1iZXI/OiBzdHJpbmdcbiAgZ2VuZGVyPzogc3RyaW5nXG4gIGxvY2FsZT86IHN0cmluZ1xuICAvLyDkuInmlrnkv6Hmga/ljp/mlodcbiAgcmF3Pzogc3RyaW5nXG4gIC8vIOWFtuS7luWFs+iBlOeahElEXG4gIGFzc29jaWF0ZWRfaWRzPzogc3RyaW5nXG4gIG1ldGE/OiAge1xuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1xuICB9XG59XG5cbmludGVyZmFjZSBJR3JhbnRQcm92aWRlclRva2VuUmVzcG9uc2Uge1xuICAvLyDlpoLmnpzkuI3lkK/nlKjoh6rliqjms6jlhozvvIwg5YiZ6L+U5ZueIHByb3ZpZGVyX3Rva2Vu77yMIOeUqOS6jui/m+S4gOatpeWkhOeQhu+8jOS+i+Wmgu+8mumAmui/h+aJi+acuuWPt+etieOAglxuICBwcm92aWRlcl90b2tlbjogc3RyaW5nXG4gIC8vIOi/h+acn+aXtumXtFxuICBleHBpcmVzX2luOiBudW1iZXJcbiAgLy8g5aaC5p6c5LiN5ZCv55So6Ieq5Yqo5rOo5YaM77yM5YiZ5Lya6L+U5ZuecHJvdmlkZXIgdXNlcmluZm8gZW5kX3BvaW50IOeahOi/lOWbnuivpuaDhe+8jOeUqOS6juWJjeerr+WxleekulxuICBwcm92aWRlcl9wcm9maWxlOiBJUHJvdmlkZXJQcm9maWxlXG59XG5cbmludGVyZmFjZSBJU2lnbkluV2l0aFByb3ZpZGVyUmVxdWVzdCB7XG4gIGNsaWVudF9pZDogc3RyaW5nXG4gIHByb3ZpZGVyX3Rva2VuOiBzdHJpbmdcbiAgLy8g5by65Yi25YWz6Zet6Ieq5Yqo5rOo5YaM44CCXG4gIC8vIOm7mOiupOaDheWGteS4i++8jOi/memHjOS7peacjeWKoeWZqOmFjee9ruS4uuWHhu+8jOWmguaenOWuouaIt+err+S4uuS6huW5s+a7keWNh+e6p+WPr+S7pemFjee9ruS4unRydWXjgIJcbiAgZm9yY2VfZGlzYWJsZV9zaWduX3VwOiBib29sZWFuXG4gIC8vIOaYr+WQpuW8uuWItuS7juesrOS4ieaWueWQjOatpeaYteensOetieS/oeaBr1xuICBzeW5jX3Byb2ZpbGU6IGJvb2xlYW5cbn1cblxuaW50ZXJmYWNlIElUb2tlbiB7XG4gIHRva2VuX3R5cGU6IHN0cmluZ1xuICBhY2Nlc3NfdG9rZW46IHN0cmluZ1xuICByZWZyZXNoX3Rva2VuOiBzdHJpbmdcbiAgaWRfdG9rZW46IHN0cmluZ1xuICBleHBpcmVzX2luOiBudW1iZXJcbiAgc2NvcGU/OiBzdHJpbmdcbiAgc3ViPzogc3RyaW5nXG4gIHVzZXJfZ3JvdXA/OiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIElQcml2aWRlckNhbGxiYWNrSW5mbyB7XG4gIGhyZWY6IHN0cmluZyxcblxuICBzdGF0ZTogc3RyaW5nLFxuXG4gIHRva2VuX3R5cGU6IHN0cmluZyxcbiAgY29kZT86IHN0cmluZyxcbiAgYWNjZXNzX3Rva2VuPzogc3RyaW5nLFxuICBpZF90b2tlbj86IHN0cmluZyxcblxuICBleHBpcmVzX2luOiBudW1iZXIsXG4gIHNjb3BlOiBzdHJpbmcsXG4gIGF1dGh1c2VyOiBzdHJpbmcsXG4gIHByb21wdDogc3RyaW5nXG59XG5cbmludGVyZmFjZSBJUG9wdXBXaW5kb3dBdXRoUmVkaXJlY3RNZXNzYWdlIHtcbiAgc291cmNlOiBzdHJpbmcsXG4gIGNhbGxiYWNrSW5mbzogSVByaXZpZGVyQ2FsbGJhY2tJbmZvXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9BdXRoMkF1dGhQcm92aWRlck9wdGlvbnMge1xuICBwcm92aWRlcklkPzogc3RyaW5nXG4gIGNsaWVudElkPzogc3RyaW5nXG4gIHJlc3BvbnNlVHlwZT86IHN0cmluZ1xuICBzY29wZT86IHN0cmluZ1xuICByZWRpcmVjdFVyaT86IHN0cmluZ1xuXG4gIHN5bmNQcm9maWxlPzogYm9vbGVhblxuICBmb3JjZURpc2FibGVTaWduVXA/OiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNpZ25JbldpdGhQb3B1cE9wdGlvbnMge1xuICBwb3B1cD86IHtcbiAgICB0YXJnZXQ/OiBzdHJpbmcsXG4gICAgZmVhdHVyZXM/OiBzdHJpbmdcbiAgfVxufVxuXG5pbnRlcmZhY2UgSUF1dGhTZXJ2ZXJSZXNwRXJyb3Ige1xuICBlcnJvcjogc3RyaW5nLFxuICBlcnJvcl9jb2RlOiBudW1iZXIsXG4gIGVycm9yX2Rlc2NyaXB0aW9uOiBzdHJpbmdcbiAgcmVxdWVzdF9pZDogc3RyaW5nXG59XG5cbmV4cG9ydCBjbGFzcyBPQXV0aDJBdXRoUHJvdmlkZXIgZXh0ZW5kcyBBdXRoUHJvdmlkZXIge1xuICAvLyBwcml2YXRlIHJlYWRvbmx5IF9zY29wZTogc3RyaW5nXG4gIC8vIHByaXZhdGUgcmVhZG9ubHkgX3N0YXRlOiBzdHJpbmdcbiAgLy8gcHJpdmF0ZSByZWFkb25seSBfYXBwaWQ6IHN0cmluZ1xuICAvLyBwcml2YXRlIHJlYWRvbmx5IF9ydW50aW1lOiBzdHJpbmdcblxuICBwcml2YXRlIHByb3ZpZGVySWQ6IHN0cmluZ1xuICBwcml2YXRlIGNsaWVudElkOiBzdHJpbmdcbiAgcHJpdmF0ZSByZXNwb25zZVR5cGU6IHN0cmluZ1xuICBwcml2YXRlIHNjb3BlOiBzdHJpbmdcbiAgcHJpdmF0ZSByZWRpcmVjdFVyaTogc3RyaW5nXG4gIHByaXZhdGUgc3luY1Byb2ZpbGU6IGJvb2xlYW5cbiAgcHJpdmF0ZSBmb3JjZURpc2FibGVTaWduVXA6IGJvb2xlYW5cblxuICBwcml2YXRlIHBvcHVwV2luZG93VXJsOiBzdHJpbmdcbiAgcHJpdmF0ZSBwb3B1cFdpbmRvd1JlZjogV2luZG93ID0gbnVsbFxuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSUNsb3VkYmFzZUF1dGhDb25maWcme2NhY2hlOklDbG91ZGJhc2VDYWNoZSxyZXF1ZXN0OklDbG91ZGJhc2VSZXF1ZXN0LHJ1bnRpbWU6c3RyaW5nfSwgb3B0aW9uczogSU9BdXRoMkF1dGhQcm92aWRlck9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGNvbmZpZylcblxuICAgIHRoaXMucHJvdmlkZXJJZCA9IG9wdGlvbnMucHJvdmlkZXJJZFxuICAgIHRoaXMuY2xpZW50SWQgPSBvcHRpb25zLmNsaWVudElkIHx8IGNvbmZpZy5lbnZcbiAgICB0aGlzLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMucmVzcG9uc2VUeXBlIHx8ICd0b2tlbidcbiAgICB0aGlzLnNjb3BlID0gb3B0aW9ucy5zY29wZSB8fCAnJ1xuICAgIHRoaXMucmVkaXJlY3RVcmkgPSBvcHRpb25zLnJlZGlyZWN0VXJpIHx8ICcnXG4gICAgdGhpcy5zeW5jUHJvZmlsZSA9IG9wdGlvbnMuc3luY1Byb2ZpbGUgfHwgZmFsc2VcbiAgICB0aGlzLmZvcmNlRGlzYWJsZVNpZ25VcCA9IG9wdGlvbnMuZm9yY2VEaXNhYmxlU2lnblVwIHx8IGZhbHNlXG5cbiAgICBjb25zdCByZWN2TWVzc2FnZUZyb21Qb3B1cCA9IHRoaXMucmVjdk1lc3NhZ2VGcm9tUG9wdXAuYmluZCh0aGlzKVxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgcmVjdk1lc3NhZ2VGcm9tUG9wdXApXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCByZWN2TWVzc2FnZUZyb21Qb3B1cCwgZmFsc2UpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2lnbkluKCl7XG4gICAgcmV0dXJuIHV0aWxzLnByaW50V2FybihFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsICdBUEkgc2lnbkluIGhhcyBiZWVuIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2Ugc2lnbkluV2l0aFJlZGlyZWN0IGluc3RlZWQnKVxuICB9XG5cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICB0aXRsZTogJ+i3s+i9rOesrOS4ieaWueeZu+W9leW5s+WPsOWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBhdXRoKCkub0F1dGgyQXV0aFByb3ZpZGVyKCkg55qE5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aFBvcHVwKG9wdGlvbnM6IElTaWduSW5XaXRoUG9wdXBPcHRpb25zID0ge30pIHtcbiAgICAvLyBpZiAodGhpcy5jaGVja0xvY2FsTG9naW5TdGF0ZSgpKSB7XG4gICAgLy8gICB0aHJvdyBuZXcgRXJyb3IoYFske2dldFNka05hbWUoKX1dWyR7RVJST1JTLlVOS09XTl9FUlJPUn1d5bey55m75b2V77yM6K+35YWI6YCA5Ye6YClcbiAgICAvLyB9XG4gICAgcmV0dXJuIHRoaXMuanVtcFRvUHJvdmlkZXJQYWdlKG9wdGlvbnMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2lnbkluV2l0aE1vZGFsKGVsZW1JZDogc3RyaW5nKSB7XG5cbiAgICBjb25zdCB7IHVyaTogYXV0aG9yaXplX3VyaSB9ID0gYXdhaXQgdGhpcy5mZXRjaFByb3ZpZGVyUmVkaXJlY3RVUkkoKVxuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlkKVxuICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgY29uc3Qgc3R5bGUgPSBgXG4gICAgPHN0eWxlPlxuICAgICAgLyogVGhlIE1vZGFsIChiYWNrZ3JvdW5kKSAqL1xuICAgICAgLm1vZGFsIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTsgLyogSGlkZGVuIGJ5IGRlZmF1bHQgKi9cbiAgICAgICAgcG9zaXRpb246IGZpeGVkOyAvKiBTdGF5IGluIHBsYWNlICovXG4gICAgICAgIHotaW5kZXg6IDE7IC8qIFNpdCBvbiB0b3AgKi9cbiAgICAgICAgcGFkZGluZy10b3A6IDEwMHB4OyAvKiBMb2NhdGlvbiBvZiB0aGUgYm94ICovXG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgd2lkdGg6IDEwMCU7IC8qIEZ1bGwgd2lkdGggKi9cbiAgICAgICAgaGVpZ2h0OiAxMDAlOyAvKiBGdWxsIGhlaWdodCAqL1xuICAgICAgICBvdmVyZmxvdzogYXV0bzsgLyogRW5hYmxlIHNjcm9sbCBpZiBuZWVkZWQgKi9cbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsMCwwKTsgLyogRmFsbGJhY2sgY29sb3IgKi9cbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLDAsMCwwLjQpOyAvKiBCbGFjayB3LyBvcGFjaXR5ICovXG4gICAgICB9XG4gIFxuICAgICAgLyogTW9kYWwgQ29udGVudCAqL1xuICAgICAgLm1vZGFsLWNvbnRlbnQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmZWZlO1xuICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICM4ODg7XG4gICAgICAgIC8qIHdpZHRoOiA4MCU7ICovXG4gICAgICB9XG4gIFxuICAgICAgLyogVGhlIENsb3NlIEJ1dHRvbiAqL1xuICAgICAgLmNsb3NlIHtcbiAgICAgICAgY29sb3I6ICNhYWFhYWE7XG4gICAgICAgIGZsb2F0OiByaWdodDtcbiAgICAgICAgZm9udC1zaXplOiAyOHB4O1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgIH1cbiAgICAgIC5jbG9zZTpob3ZlcixcbiAgICAgIC5jbG9zZTpmb2N1cyB7XG4gICAgICAgIGNvbG9yOiAjMDAwO1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG4gICAgYFxuICAgIGNvbnN0IGh0bWwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNsb3NlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgPGlmcmFtZSBpZD1cImxvZ2luSWZyYW1lXCIgc3JjPVwiJHthdXRob3JpemVfdXJpfVwiIHRpdGxlPVwiaWZyYW1lIEV4YW1wbGUgMVwiIHdpZHRoPVwiNDAwXCIgaGVpZ2h0PVwiMzAwXCI+PC9pZnJhbWU+XG4gICAgICA8L2Rpdj5cbiAgICBgXG4gICAgY29uc3Qgc2NyaXB0ID0gYFxuICAgICAgPHNjcmlwdD5cbiAgICAgIC8vIEdldCB0aGUgPHNwYW4+IGVsZW1lbnQgdGhhdCBjbG9zZXMgdGhlIG1vZGFsXG4gICAgICB2YXIgc3BhbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjbG9zZVwiKVswXTtcbiAgICAgIFxuICAgICAgLy8gV2hlbiB0aGUgdXNlciBjbGlja3Mgb24gPHNwYW4+ICh4KSwgY2xvc2UgdGhlIG1vZGFsXG4gICAgICBzcGFuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgfVxuICBcbiAgICAgIC8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIGFueXdoZXJlIG91dHNpZGUgb2YgdGhlIG1vZGFsLCBjbG9zZSBpdFxuICAgICAgd2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IG1vZGFsKSB7XG4gICAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxvZ2luSWZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbklmcmFtZVwiKVxuICAgICAgPC9zY3JpcHQ+XG4gICAgYFxuICAgIG1vZGFsLmlubmVySFRNTCA9IGBcbiAgICAgICR7aHRtbH1cbiAgICAgICR7c3R5bGV9XG4gICAgICAke3NjcmlwdH1cbiAgICBgXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGp1bXBUb1Byb3ZpZGVyUGFnZShvcHRpb25zOiBJU2lnbkluV2l0aFBvcHVwT3B0aW9ucyA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgdXJpOiBhdXRob3JpemVfdXJpIH0gPSBhd2FpdCB0aGlzLmZldGNoUHJvdmlkZXJSZWRpcmVjdFVSSSgpXG4gICAgICBjb25zdCBwb3B1cCA9IG9wdGlvbnMucG9wdXAgfHwge31cbiAgICAgIGNvbnN0IHBvcHVwV2luZG93VGFyZ2V0ID0gcG9wdXAudGFyZ2V0IHx8ICdfYmxhbmsnXG4gICAgICBjb25zdCBwb3B1cFdpbmRvd0ZlYXR1cmVzID0gcG9wdXAuZmVhdHVyZXMgfHwgJ3Rvb2xiYXI9bm8sIG1lbnViYXI9bm8sIHdpZHRoPTYwMCwgaGVpZ2h0PTcwMCwgdG9wPTEwMCwgbGVmdD0xMDAnXG4gICAgICAvLyBjb25zb2xlLmxvZygnanVtcFRvUHJvdmlkZXJQYWdlOiAnLCBhdXRob3JpemVfdXJpLCB0aGlzLnBvcHVwV2luZG93UmVmKVxuICAgICAgbGV0IHBvcHVwV2luZG93UmVmID0gdGhpcy5wb3B1cFdpbmRvd1JlZlxuICAgICAgaWYgKHBvcHVwV2luZG93UmVmID09PSBudWxsIHx8IHBvcHVwV2luZG93UmVmLmNsb3NlZCkge1xuICAgICAgICBwb3B1cFdpbmRvd1JlZiA9IHdpbmRvdy5vcGVuKGF1dGhvcml6ZV91cmksIHBvcHVwV2luZG93VGFyZ2V0LCBwb3B1cFdpbmRvd0ZlYXR1cmVzKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnBvcHVwV2luZG93VXJsICE9PSBhdXRob3JpemVfdXJpKSB7XG4gICAgICAgIGlmIChwb3B1cFdpbmRvd1JlZiAmJiAhcG9wdXBXaW5kb3dSZWYuY2xvc2VkKSB7XG4gICAgICAgICAgcG9wdXBXaW5kb3dSZWYuY2xvc2UoKVxuICAgICAgICB9XG4gICAgICAgIHBvcHVwV2luZG93UmVmID0gd2luZG93Lm9wZW4oYXV0aG9yaXplX3VyaSwgcG9wdXBXaW5kb3dUYXJnZXQsIHBvcHVwV2luZG93RmVhdHVyZXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBwb3B1cFdpbmRvd1JlZi5mb2N1cygpXG4gICAgICB9XG5cbiAgICAgIGlmICghcG9wdXBXaW5kb3dSZWYpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLnByaW50V2FybihFUlJPUlMuT1BFUkFUSU9OX0ZBSUwsIGDmiZPlvIDnrKzkuInmlrnnmbvlvZXmjojmnYPlpLHotKXvvIzlj6/og73mmK/npoHnlKjkuobmtY/op4jlmajlvLnnqpfvvIx1cmk6ICR7YXV0aG9yaXplX3VyaX1gKVxuICAgICAgfVxuICAgICAgdGhpcy5wb3B1cFdpbmRvd1VybCA9IGF1dGhvcml6ZV91cmlcbiAgICAgIHRoaXMucG9wdXBXaW5kb3dSZWYgPSBwb3B1cFdpbmRvd1JlZlxuICAgICAgdGhpcy5wb3B1cFdpbmRvd1JlZi5mb2N1cygpXG4gICAgfSBjYXRjaChlKSB7XG4gICAgICAvLyBET01FeGNlcHRpb246IEJsb2NrZWQgYSBmcmFtZSB3aXRoIG9yaWdpbiBcIlwiIGZyb20gYWNjZXNzaW5nIGEgY3Jvc3Mtb3JpZ2luIGZyYW1lLlxuICAgICAgaWYgKHRoaXMucG9wdXBXaW5kb3dSZWYgJiYgIXRoaXMucG9wdXBXaW5kb3dSZWYuY2xvc2VkKSB7XG4gICAgICAgIHRoaXMucG9wdXBXaW5kb3dSZWYuY2xvc2UoKVxuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHtnZXRTZGtOYW1lKCl9XVske0VSUk9SUy5VTktPV05fRVJST1J9XSR7ZX1gKVxuICAgIH1cblxuICAgIC8vIOWcqOaWsOagh+etvumhtSBwb3N0IG1lc3NhZ2Ug6L+b6KGM5rWL6K+V77yM5oiW5Y+W5raI5rOo6YeK6L+b6KGM5rWL6K+VXG4gICAgLy8gd2luZG93Lm9wZW5lci5wb3N0TWVzc2FnZVxuICAgIC8vIHRoaXMucG9wdXBXaW5kb3dSZWYucG9zdE1lc3NhZ2Uoe1xuICAgIC8vICAgc291cmNlOiAnY2xvdWRiYXNlLWxvZ2luLXJlZGlyZWN0JyxcbiAgICAvLyAgIGNhbGxiYWNrSW5mbzoge1xuICAgIC8vICAgICBzdGF0ZTogJ2V5SjBJam94TmpJM09ESTRNekEyTWpRekxDSndjbTkyYVdSbGNsOXBaQ0k2SW1kdmIyZHNaU0lzSW1Oc2FXVnVkRjlwWkNJNkluQnliMlIxWTNScGIyNHRablk1TnpraUxDSnliM1YwWlV0bGVTSTZJaUo5JyxcbiAgICAvLyAgICAgYWNjZXNzX3Rva2VuOiAneWEyOS5hMEFScmRhTV9KRi03bDFhTmtzc0MtalJZSURFb0V5VTJSbmdram95MHM5bEhBQUpwNTZ5dXhFeW9VYThzYURoUjFTLTA0eHRyYUVtRGMwUVNva3lCT1NWcEtJRTV6UDBza2VNV1p1Wmlud21LaGJzUVRaZnJDR0pKR1FNOG43MkhFaGF4cUsxN2stZ0JkMk1OMGJXZjlpLWRsSG5KRUNRJyxcbiAgICAvLyAgICAgdG9rZW5fdHlwZTogJ0JlYXJlcicsXG4gICAgLy8gICAgIGV4cGlyZXNfaW46ICczNTk4JyxcbiAgICAvLyAgICAgc2NvcGU6ICdlbWFpbCUyMHByb2ZpbGUlMjBvcGVuaWQlMjBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLnByb2ZpbGUlMjBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLmVtYWlsJyxcbiAgICAvLyAgICAgYXV0aHVzZXI6ICcwJyxcbiAgICAvLyAgICAgcHJvbXB0OiAnbm9uZSdcbiAgICAvLyAgIH1cbiAgICAvLyB9LCAnaHR0cDovLy8nKVxuXG4gICAgLy8gZnVuY3Rpb24gcG9zdE1lc3NhZ2VUb09wZW5lcigpIHtcbiAgICAvLyAgIC8vIOmcgOimgeaUr+aMgeS4jeWQjOeahOWPguaVsOW9ouW8j1xuICAgIC8vICAgaWYgKHdpbmRvdy5vcGVuZXIpIHtcbiAgICAvLyAgICAgLy8gd2luZG93Lm9wZW5lci5wb3N0TWVzc2FnZSh7XG4gICAgLy8gICAgIC8vICAgc291cmNlOiAnY2xvdWRiYXNlLWxvZ2luLXJlZGlyZWN0JyxcbiAgICAvLyAgICAgLy8gICByZWRpcmVjdFVyaTogJycsXG4gICAgLy8gICAgIC8vICAgY2FsbGJhY2tJbmZvOiB7XG4gICAgLy8gICAgIC8vICAgICBzdGF0ZTogJ2V5SjBJam94TmpJM05qTXdOVFk0TmprekxDSndjbTkyYVdSbGNsOXBaQ0k2SW1kdmIyZHNaU0lzSW1Oc2FXVnVkRjlwWkNJNkluQnliMlIxWTNScGIyNHRablk1TnpraWZRPT0nLFxuICAgIC8vICAgICAvLyAgICAgYWNjZXNzX3Rva2VuOiAneWEyOS5hMEFScmRhTS1oTGNfQ0FHRjI2eE1qVHpkbEFsb1JzOFdpaFdGVnk2R1JER3YxRE1ZWmJHMGsxeEkzZEtndTNFNDJHaTZQMUQxVjZkdHotWEJTaGpEb3UyTVJXTmFQTlpfU05DX2lkUlRJcVRDeFUxZjd4VS1GS2ZtUzhBMEFaWkRrOC1oN2EzVllzaDEyRWVpMWoyVU53dURHS1V1T1B3JyxcbiAgICAvLyAgICAgLy8gICAgIHRva2VuX3R5cGU6ICdCZWFyZXInLFxuICAgIC8vICAgICAvLyAgICAgZXhwaXJlc19pbjogJzM1OTknLFxuICAgIC8vICAgICAvLyAgICAgc2NvcGU6ICdlbWFpbCUyMHByb2ZpbGUlMjBvcGVuaWQlMjBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLmVtYWlsJTIwaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC91c2VyaW5mby5wcm9maWxlJyxcbiAgICAvLyAgICAgLy8gICAgIGF1dGh1c2VyOiAnMCcsXG4gICAgLy8gICAgIC8vICAgICBwcm9tcHQ6ICdub25lJ1xuICAgIC8vICAgICAvLyAgIH1cbiAgICAvLyAgICAgLy8gfSwgJ2h0dHA6Ly8vJylcbiAgICAvLyAgICAgY29uc3QgcGFyYW1zID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaFxuICAgIC8vICAgICB3aW5kb3cub3BlbmVyLnBvc3RNZXNzYWdlKHBhcmFtcywgJycpXG4gICAgLy8gICAgIHdpbmRvdy5jbG9zZSgpXG4gICAgLy8gICB9XG4gICAgLy8gfVxuICB9XG5cbiAgLyoqXG4gICAqIHJlY3ZNZXNzYWdlRnJvbVBvcHVwIOaOpeaUtuWbnuiwg+mhtemdoueZu+W9lea2iOaBr1xuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogQHJldHVybnMgXG4gICAqL1xuICBwcml2YXRlIHJlY3ZNZXNzYWdlRnJvbVBvcHVwKGV2ZW50OiBNZXNzYWdlRXZlbnQpIHtcbiAgICAvLyBjb25zb2xlLmxvZygncmVjdiBldmVudDonLCBldmVudClcbiAgICAvLyBvcmlnaW46IFwiaHR0cDovLy9cIlxuICAgIGlmICghZXZlbnQuaXNUcnVzdGVkKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnIWV2ZW50LmlzVHJ1c3RlZCcpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coJ3RoaXMucG9wdXBXaW5kb3dSZWYgPT09IGV2ZW50LnNvdXJjZScsIHRoaXMucG9wdXBXaW5kb3dSZWYgPT09IGV2ZW50LnNvdXJjZSlcbiAgICBpZiAodGhpcy5wb3B1cFdpbmRvd1JlZiA9PT0gZXZlbnQuc291cmNlICYmIGV2ZW50LmRhdGEuc291cmNlID09PSAnY2xvdWRiYXNlLWxvZ2luLXJlZGlyZWN0Jykge1xuICAgICAgLy8gY29uc29sZS5sb2coJ3JlY3YgY2xvdWRiYXNlLWxvZ2luLXJlZGlyZWN0IGV2ZW50JywgZXZlbnQuZGF0YSlcbiAgICAgIGNvbnN0IGRhdGE6IElQb3B1cFdpbmRvd0F1dGhSZWRpcmVjdE1lc3NhZ2UgPSBldmVudC5kYXRhXG4gICAgICB0aGlzLmNvbnRpbnVlU2lnbkluKGRhdGEuY2FsbGJhY2tJbmZvKVxuICAgICAgaWYgKCF0aGlzLnBvcHVwV2luZG93UmVmLmNsb3NlZCkge1xuICAgICAgICB0aGlzLnBvcHVwV2luZG93UmVmLmNsb3NlKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY29udGludWVTaWduSW4g57un57ut55m75b2VXG4gICAqIEBwYXJhbSBjYWxsYmFja0luZm9cbiAgICogQHJldHVybnNcbiAgICovXG4gIGFzeW5jIGNvbnRpbnVlU2lnbkluKGNhbGxiYWNrSW5mbz86IElQcml2aWRlckNhbGxiYWNrSW5mbyk6IFByb21pc2U8TG9naW5TdGF0ZT4ge1xuICAgIC8vIOi/memHjOaUr+aMgeWcqOWbnuiwg+mhtemdouiwg+eUqOivpeWHveaVsOWujOaIkOeZu+W9lVxuICAgIGNhbGxiYWNrSW5mbyA9IGNhbGxiYWNrSW5mbyB8fCB0aGlzLmdldEF1dGhQcml2aWRlckNhbGxiYWNrSW5mb0Zyb21VcmwoKVxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy5zaWduSW5XaXRoUHJvdmlkZXIoY2FsbGJhY2tJbmZvKVxuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuRXhwaXJlS2V5LCByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXNcbiAgICBjb25zdCB7IHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlbiwgYWNjZXNzX3Rva2VuOiBhY2Nlc3NUb2tlbiwgZXhwaXJlc19pbjogYWNjZXNzVG9rZW5FeHBpcmUgfSA9IHRva2VuXG5cbiAgICBpZiAoIWFjY2Vzc1Rva2VuIHx8ICFhY2Nlc3NUb2tlbkV4cGlyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogJ1NpZ25GYWlsdXJlJ1xuICAgICAgfSkpXG4gICAgfVxuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXksIHJlZnJlc2hUb2tlbiksXG4gICAgICB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbiksXG4gICAgICB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5LCBhY2Nlc3NUb2tlbkV4cGlyZSAqIDEwMDAgKyBEYXRlLm5vdygpKVxuICAgIF0pXG4gICAgZXZlbnRCdXMuZmlyZShFVkVOVFMuTE9HSU5fU1RBVEVfQ0hBTkdFRClcbiAgICBldmVudEJ1cy5maXJlKEVWRU5UUy5MT0dJTl9UWVBFX0NIQU5HRUQsIHtcbiAgICAgIGVudjogdGhpcy5fY29uZmlnLmVudixcbiAgICAgIGxvZ2luVHlwZTogYCR7T0FVVEgyX0xPR0lOVFlQRV9QUkVGSVh9LiR7dGhpcy5wcm92aWRlcklkfWAsIFxuICAgICAgcGVyc2lzdGVuY2U6IHRoaXMuX2NvbmZpZy5wZXJzaXN0ZW5jZSBcbiAgICB9KVxuXG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgIH0pXG5cbiAgICBhd2FpdCBsb2dpblN0YXRlLmNoZWNrTG9jYWxTdGF0ZUFzeW5jKClcblxuICAgIC8vIGNvbnN0IHVzZXJJbmZvID0gYXdhaXQgdGhpcy5yZWZyZXNoVXNlckluZm8oKVxuXG4gICAgcmV0dXJuIGxvZ2luU3RhdGVcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXV0aFByaXZpZGVyQ2FsbGJhY2tJbmZvRnJvbVVybCgpOiBJUHJpdmlkZXJDYWxsYmFja0luZm8ge1xuICAgIC8vIFRPRE86IOaUr+aMgSBRdWVyeSAmIEhhc2hcbiAgICAvLyDnm7TmjqXku44gVVJMIOS4iuWPluWbnuiwg+S/oeaBr1xuICAgIC8vIHtcbiAgICAvLyAgIHN0YXRlOiAnX3RzdGF0ZS4xNjI3NTY0NTYxNzUwJyxcbiAgICAvLyAgIGFjY2Vzc190b2tlbjogJ3lhMjkuYTBBUnJkYU05OHlNcFVoQ0pScTJsVmV6UHRkaFFIQVdzdkR6ajVPaWlJOFdSRWF3UWpDOUhVbzd0S2p1c0pSNHowT0NENTQzNUJ0YnFILWtUc0xUQjNubGxmSEwwR2pxSk4xTjIwX3I4UXMyY2tWd0g3YXhDdW9rbXc1OEFfZDBTS1Z1cU4tVS1OUjYxUXJJSzZIdmw4V0FNLWptMjJldycsXG4gICAgLy8gICB0b2tlbl90eXBlOiAnQmVhcmVyJyxcbiAgICAvLyAgIGV4cGlyZXNfaW46IDM1OTksXG4gICAgLy8gICBzY29wZTogJ2VtYWlsJTIwcHJvZmlsZSUyMG9wZW5pZCUyMGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8uZW1haWwlMjBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLnByb2ZpbGUnLFxuICAgIC8vICAgYXV0aHVzZXI6ICcwJyxcbiAgICAvLyAgIHByb21wdDogJ25vbmUnXG4gICAgLy8gfVxuICAgIHJldHVybiBxc1BhcnNlKGRlY29kZVVSSUNvbXBvbmVudCgobmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZikuaGFzaCkucmVwbGFjZSgnIycsICcnKSkpIGFzIElQcml2aWRlckNhbGxiYWNrSW5mb1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBmZXRjaFByb3ZpZGVyUmVkaXJlY3RVUkkoKTogUHJvbWlzZTxJR2VuUHJvdmlkZXJSZWRpcmVjdFVSSVJlc3BvbnNlPiB7XG4gICAgY29uc3Qge1xuICAgICAgcmVzcG9uc2VfdHlwZSxcbiAgICAgIHByb3ZpZGVyX2lkLFxuICAgICAgY2xpZW50X2lkLFxuICAgICAgc2NvcGUsXG4gICAgICByZWRpcmVjdF91cmksXG4gICAgICBzdGF0ZSxcbiAgICAgIC8vIG90aGVyX3BhcmFtc1xuICAgIH06IElHZW5Qcm92aWRlclJlZGlyZWN0VVJJUmVxdWVzdCA9IHtcbiAgICAgIHJlc3BvbnNlX3R5cGU6IHRoaXMucmVzcG9uc2VUeXBlLFxuICAgICAgcHJvdmlkZXJfaWQ6IHRoaXMucHJvdmlkZXJJZCxcbiAgICAgIGNsaWVudF9pZDogdGhpcy5jbGllbnRJZCxcbiAgICAgIHNjb3BlOiB0aGlzLnNjb3BlLFxuICAgICAgcmVkaXJlY3RfdXJpOiB0aGlzLnJlZGlyZWN0VXJpLFxuICAgICAgc3RhdGU6IGJ0b2EoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB0OiBEYXRlLm5vdygpLFxuICAgICAgICBwcm92aWRlcl9pZDogdGhpcy5wcm92aWRlcklkLFxuICAgICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXG4gICAgICAgIC8vIOeZu+W9leaIkOWKn+S5i+WQjui3r+eUseeahOmhtemdouWcsOWdgFxuICAgICAgICByb3V0ZUtleTogJydcbiAgICAgIH0pKSxcbiAgICAgIC8vIG90aGVyX3BhcmFtczogdXRpbHMudG9RdWVyeVN0cmluZyh7IGE6IDEgfSlcbiAgICB9XG5cbiAgICBjb25zdCBxcyA9IHV0aWxzLnRvUXVlcnlTdHJpbmcoe1xuICAgICAgcmVzcG9uc2VfdHlwZSxcbiAgICAgIHByb3ZpZGVyX2lkLFxuICAgICAgY2xpZW50X2lkLFxuICAgICAgc2NvcGUsXG4gICAgICByZWRpcmVjdF91cmksXG4gICAgICBzdGF0ZSxcbiAgICAgIC8vIG90aGVyX3BhcmFtc1xuICAgIH0pXG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMuZmV0Y2goYCR7a1BhdGhzLnByaXZpZGVyVXJpfT8ke3FzfWAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KVxuICAgIC8vIHtcbiAgICAvLyAgIHVyaTogJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi92Mi9hdXRoP2NsaWVudF9pZD02ODY5NzAyMTU5NDQtZ3VuMW5lb2ZqaHRqdDdnbXRhMnFmdGg2Zjgyc2owMTEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20mcmVkaXJlY3RfdXJpPWh0dHBzJTNBJTJGJTJGcHJvZHVjdGlvbi1mdjk3OS0xMjU4OTY0NzY5LmFwLXNoYW5naGFpLmFwcC50Y2xvdWRiYXNlLmNvbSZyZXNwb25zZV90eXBlPXRva2VuJnNjb3BlPW9wZW5pZCtlbWFpbCtwcm9maWxlJnN0YXRlPV90c3RhdGUuMTYyNzU0NTk0MTkyMycsXG4gICAgLy8gICBzaWdub3V0X3VyaTogJydcbiAgICAvLyB9XG4gICAgcmV0dXJuIHJlc3AuanNvbigpXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGZldGNoUHJvdmlkZXJUb2tlbihjYWxsYmFja0luZm86IElQcml2aWRlckNhbGxiYWNrSW5mbyk6IFByb21pc2U8SUdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlPiB7XG4gICAgLy8gY29uc3Qgc3RhdGUgPSBhdG9iKEpTT04uc3RyaW5naWZ5KGNhbGxiYWNrSW5mby5zdGF0ZSkpXG4gICAgY29uc3QgYm9keTogSUdyYW50UHJvdmlkZXJUb2tlblJlcXVlc3QgPSB7XG4gICAgICBwcm92aWRlcl9pZDogdGhpcy5wcm92aWRlcklkLFxuICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudElkLFxuICAgICAgcHJvdmlkZXJfcmVkaXJlY3RfdXJpOiBjYWxsYmFja0luZm8uaHJlZlxuICAgIH1cblxuICAgIGlmIChjYWxsYmFja0luZm8uY29kZSkge1xuICAgICAgYm9keS5wcm92aWRlcl9jb2RlID0gY2FsbGJhY2tJbmZvLmNvZGVcbiAgICB9XG4gICAgZWxzZSBpZiAoY2FsbGJhY2tJbmZvLmFjY2Vzc190b2tlbikge1xuICAgICAgYm9keS5wcm92aWRlcl9hY2Nlc3NfdG9rZW4gPSBjYWxsYmFja0luZm8uYWNjZXNzX3Rva2VuXG4gICAgfVxuICAgIGVsc2UgaWYgKGNhbGxiYWNrSW5mby5pZF90b2tlbikge1xuICAgICAgYm9keS5wcm92aWRlcl9pZF90b2tlbiA9IGNhbGxiYWNrSW5mby5pZF90b2tlblxuICAgIH1cblxuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLmZldGNoKGtQYXRocy5wcml2aWRlclRva2VuLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG4gICAgfSlcbiAgICAvLyB7XG4gICAgLy8gICBcInByb3ZpZGVyX3Rva2VuXCI6IFwiZXlKaGJHY2lPaUpCNkFTOC4uLi4uLkhCNC12MVAxai16d3FpUVwiLFxuICAgIC8vICAgXCJleHBpcmVzX2luXCI6IDEyMDAsXG4gICAgLy8gICBcInByb3ZpZGVyX3Byb2ZpbGVcIjoge1xuICAgIC8vICAgICBcInByb3ZpZGVyX2lkXCI6IFwiZ29vZ2xlXCIsXG4gICAgLy8gICAgIFwic3ViXCI6IFwiMTAxOTYzNzUxNDk2ODA3MDc5MzgxXCIsXG4gICAgLy8gICAgIFwibmFtZVwiOiBcIlwiLFxuICAgIC8vICAgICBcInBpY3R1cmVcIjogXCJcIixcbiAgICAvLyAgICAgXCJlbWFpbFwiOiBcIlwiLFxuICAgIC8vICAgICBcImxvY2FsZVwiOiBcInpoLWNuXCJcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gICAgcmV0dXJuIHJlc3AuanNvbigpXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHNpZ25JbldpdGhQcm92aWRlcihjYWxsYmFja0luZm86IElQcml2aWRlckNhbGxiYWNrSW5mbyk6IFByb21pc2U8SVRva2VuPiB7XG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLmZldGNoUHJvdmlkZXJUb2tlbihjYWxsYmFja0luZm8pXG4gICAgY29uc3QgYm9keTogSVNpZ25JbldpdGhQcm92aWRlclJlcXVlc3QgPSB7XG4gICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXG4gICAgICBwcm92aWRlcl90b2tlbjogdG9rZW4ucHJvdmlkZXJfdG9rZW4sXG4gICAgICBzeW5jX3Byb2ZpbGU6IHRoaXMuc3luY1Byb2ZpbGUsXG4gICAgICBmb3JjZV9kaXNhYmxlX3NpZ25fdXA6IHRoaXMuZm9yY2VEaXNhYmxlU2lnblVwXG4gICAgfVxuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLmZldGNoKGtQYXRocy5zaWduaW5XaXRoUHJvdmlkZXIsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcbiAgICB9KVxuICAgIHJldHVybiByZXNwLmpzb24oKVxuICB9XG5cbiAgYXN5bmMgcmVmcmVzaFVzZXJJbmZvKCkge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW4gfSA9IChhd2FpdCB0aGlzLl9yZXF1ZXN0LmdldEFjY2Vzc1Rva2VuKCkpXG4gICAgY29uc3QgYXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gXG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMuZmV0Y2goa1BhdGhzLm1lLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQXV0aG9yaXphdGlvbic6IGF1dGhvcml6YXRpb25cbiAgICAgIH1cbiAgICB9KVxuICAgIC8vIHtcbiAgICAvLyAgIFwic3ViXCI6IFwiN2FhYjRiYTkwNTNlNDQwMmEzZDQyYjYxY2MyNTdjMTFcIixcbiAgICAvLyAgIFwibmFtZVwiOiBcIlwiLFxuICAgIC8vICAgXCJwaWN0dXJlXCI6IFwiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2c0c0RlMTRTQzVXTnM4NUtvMm5mQmxYdmxkWVZnYlNZYnZJcmthPXM5Ni1jXCIsXG4gICAgLy8gICBcImVtYWlsXCI6IFwiXCIsXG4gICAgLy8gICBcInByb3ZpZGVyc1wiOiBbXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICBcImlkXCI6IFwiZ29vZ2xlXCIsXG4gICAgLy8gICAgICAgXCJwcm92aWRlcl91c2VyX2lkXCI6IFwiMTAxOTYzNzUxNDk2ODA3MDc5MzgxXCIsXG4gICAgLy8gICAgICAgXCJuYW1lXCI6IFwiXCJcbiAgICAvLyAgICAgfVxuICAgIC8vICAgXSxcbiAgICAvLyAgIFwic3RhdHVzXCI6IFwiQUNUSVZFXCIsXG4gICAgLy8gICBcImNyZWF0ZWRfYXRcIjogXCIyMDIxLTA3LTI4VDA2OjMxOjM2Ljk4M1pcIixcbiAgICAvLyAgIFwicGFzc3dvcmRfdXBkYXRlZF9hdFwiOiBcIjIwMjEtMDctMjhUMDY6MzE6MzYuOTgzWlwiXG4gICAgLy8gfVxuICAgIHJldHVybiByZXNwLmpzb24oKVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBmZXRjaCh1cmxPclBhdGg6IHN0cmluZywgaW5pdD86IFJlcXVlc3RJbml0KSB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMuX3JlcXVlc3QuZmV0Y2godXJsT3JQYXRoLCBpbml0KVxuXG4gICAgY29uc3Qgc2VxSWRGcm9tSGVhZGVyID0gcmVzcC5oZWFkZXJzLmdldCgnU2VxSWQnKSB8fCByZXNwLmhlYWRlcnMuZ2V0KCdSZXF1ZXN0SWQnKVxuICAgIGlmIChyZXNwLnN0YXR1cyA+PSA0MDAgJiYgcmVzcC5zdGF0dXMgPCA1MDApIHtcbiAgICAgIGNvbnN0IGJvZHk6IElBdXRoU2VydmVyUmVzcEVycm9yID0gYXdhaXQgcmVzcC5qc29uKClcbiAgICAgIGNvbnN0IHNlcUlkID0gYm9keS5yZXF1ZXN0X2lkIHx8IHNlcUlkRnJvbUhlYWRlclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHtnZXRTZGtOYW1lKCl9XVtPQXV0aDJBdXRoUHJvdmlkZXJdW3N0YXR1czoke3Jlc3Auc3RhdHVzfV1bJHtib2R5LmVycm9yfSgke2JvZHkuZXJyb3JfY29kZX0pXSAke2JvZHkuZXJyb3JfZGVzY3JpcHRpb259ICgke3NlcUlkfSlgKVxuICAgIH1cbiAgICBlbHNlIGlmIChyZXNwLnN0YXR1cyA+PSA1MDApIHtcbiAgICAgIGNvbnN0IGJvZHk6IElBdXRoU2VydmVyUmVzcEVycm9yID0gYXdhaXQgcmVzcC5qc29uKClcbiAgICAgIGNvbnN0IHNlcUlkID0gYm9keS5yZXF1ZXN0X2lkIHx8IHNlcUlkRnJvbUhlYWRlclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHtnZXRTZGtOYW1lKCl9XVtPQXV0aDJBdXRoUHJvdmlkZXJdW3N0YXR1czoke3Jlc3Auc3RhdHVzfV1bJHtib2R5LmVycm9yfSgke2JvZHkuZXJyb3JfY29kZX0pXSAke2JvZHkuZXJyb3JfZGVzY3JpcHRpb259ICgke3NlcUlkfSlgKVxuICAgIH1cblxuICAgIHJldHVybiByZXNwXG4gIH1cbn1cbiJdfQ==