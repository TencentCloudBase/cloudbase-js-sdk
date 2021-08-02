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
import { AuthProvider } from './base';
import { constants, utils, helpers } from '@cloudbase/utilities/';
import { eventBus, EVENTS, LoginState } from '..';
import { OAUTH2_LOGINTYPE_PREFIX } from '../constants';
var getSdkName = constants.getSdkName, ERRORS = constants.ERRORS, COMMUNITY_SITE_URL = constants.COMMUNITY_SITE_URL;
var catchErrorsDecorator = helpers.catchErrorsDecorator;
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
                return [2, utils.printWarn(ERRORS.OPERATION_FAIL, 'API signIn has been deprecated, please use signInWithRedirect insteed')];
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
                            return [2, utils.printWarn(ERRORS.OPERATION_FAIL, "\u6253\u5F00\u7B2C\u4E09\u65B9\u767B\u5F55\u6388\u6743\u5931\u8D25\uFF0C\u53EF\u80FD\u662F\u7981\u7528\u4E86\u6D4F\u89C8\u5668\u5F39\u7A97\uFF0Curi: " + authorize_uri)];
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
                        eventBus.fire(EVENTS.LOGIN_STATE_CHANGED);
                        eventBus.fire(EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this._config.env,
                            loginType: OAUTH2_LOGINTYPE_PREFIX + "." + this.providerId,
                            persistence: this._config.persistence
                        });
                        loginState = new LoginState({
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
                        qs = utils.toQueryString({
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
}(AuthProvider));
export { OAuth2AuthProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgyQXV0aFByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy9vYXV0aDJBdXRoUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFJckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sdUJBQXVCLENBQUE7QUFDakUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sSUFBSSxDQUFBO0FBQ2pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUvQyxJQUFBLFVBQVUsR0FBaUMsU0FBUyxXQUExQyxFQUFFLE1BQU0sR0FBeUIsU0FBUyxPQUFsQyxFQUFFLGtCQUFrQixHQUFLLFNBQVMsbUJBQWQsQ0FBYztBQUNwRCxJQUFBLG9CQUFvQixHQUFLLE9BQU8scUJBQVosQ0FBWTtBQUV4QyxTQUFTLE9BQU8sQ0FBQyxFQUFVO0lBQ3pCLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztRQUN6QixJQUFBLEtBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBMUIsR0FBRyxRQUFBLEVBQUUsS0FBSyxRQUFnQixDQUFBO1FBQ2pDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUE7UUFDZCxPQUFPLENBQUMsQ0FBQTtJQUNWLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUNSLENBQUM7QUFFRCxJQUFNLE1BQU0sR0FBRztJQUNiLFdBQVcsRUFBRSx1QkFBdUI7SUFDcEMsYUFBYSxFQUFFLHlCQUF5QjtJQUN4QyxrQkFB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VUFBVSxFQUFFLHFDQUFnQyxJQUFJLENBQUMsTUFBTSxVQUFLLElBQUksQ0FBQyxLQUFLLFNBQUksSUFBSSxDQUFDLFVBQVUsV0FBTSxJQUFJLENBQUMsaUJBQWlCLFVBQUssS0FBSyxNQUFHLENBQUMsQ0FBQTs7NkJBRWhKLENBQUEsSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUEsRUFBbEIsY0FBa0I7d0JBQ1UsV0FBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUE5QyxJQUFJLEdBQXlCLFNBQWlCO3dCQUM5QyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxlQUFlLENBQUE7d0JBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBSSxVQUFVLEVBQUUscUNBQWdDLElBQUksQ0FBQyxNQUFNLFVBQUssSUFBSSxDQUFDLEtBQUssU0FBSSxJQUFJLENBQUMsVUFBVSxXQUFNLElBQUksQ0FBQyxpQkFBaUIsVUFBSyxLQUFLLE1BQUcsQ0FBQyxDQUFBOzRCQUd6SixXQUFPLElBQUksRUFBQTs7OztLQUNaO0lBcFlEO1FBUkMsb0JBQW9CLENBQUM7WUFDcEIsS0FBSyxFQUFFLGFBQWE7WUFDcEIsUUFBUSxFQUFFO2dCQUNSLFVBQVU7Z0JBQ1YsOENBQThDO2dCQUM5QyxpS0FBNkIsa0JBQW9CO2FBQ2xEO1NBQ0YsQ0FBQzs7Ozs2REFNRDtJQWdZSCx5QkFBQztDQUFBLEFBbGJELENBQXdDLFlBQVksR0FrYm5EO1NBbGJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gJy4vYmFzZSdcbmltcG9ydCB7IElDbG91ZGJhc2VBdXRoQ29uZmlnIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9hdXRoJ1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNhY2hlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSdcbmltcG9ydCB7IElDbG91ZGJhc2VSZXF1ZXN0IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9yZXF1ZXN0J1xuaW1wb3J0IHsgY29uc3RhbnRzLCB1dGlscywgaGVscGVycyB9IGZyb20gJ0BjbG91ZGJhc2UvdXRpbGl0aWVzLydcbmltcG9ydCB7IGV2ZW50QnVzLCBFVkVOVFMsIExvZ2luU3RhdGUgfSBmcm9tICcuLidcbmltcG9ydCB7IE9BVVRIMl9MT0dJTlRZUEVfUFJFRklYIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcblxuY29uc3QgeyBnZXRTZGtOYW1lLCBFUlJPUlMsIENPTU1VTklUWV9TSVRFX1VSTCB9ID0gY29uc3RhbnRzXG5jb25zdCB7IGNhdGNoRXJyb3JzRGVjb3JhdG9yIH0gPSBoZWxwZXJzXG5cbmZ1bmN0aW9uIHFzUGFyc2UocXM6IHN0cmluZyk6IG9iamVjdCB7XG4gIHJldHVybiBxcy5zcGxpdCgnJicpLnJlZHVjZSgoYSwgYykgPT4ge1xuICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGMuc3BsaXQoJz0nKVxuICAgIGFba2V5XSA9IHZhbHVlXG4gICAgcmV0dXJuIGFcbiAgfSwge30pXG59XG5cbmNvbnN0IGtQYXRocyA9IHtcbiAgcHJpdmlkZXJVcmk6ICcvYXV0aC92MS9wcm92aWRlci91cmknLFxuICBwcml2aWRlclRva2VuOiAnL2F1dGgvdjEvcHJvdmlkZXIvdG9rZW4nLFxuICBzaWduaW5XaXRoUHJvdmlkZXI6ICcvYXV0aC92MS9zaWduaW4vd2l0aC9wcm92aWRlcicsXG4gIG1lOiAnL2F1dGgvdjEvdXNlci9tZScsXG4gIHRva2VuOiAnL2F1dGgvdjEvdG9rZW4nLFxufVxuXG5pbnRlcmZhY2UgSUdlblByb3ZpZGVyUmVkaXJlY3RVUklSZXF1ZXN0IHtcbiAgcmVzcG9uc2VfdHlwZTogc3RyaW5nIC8vIHRva2VuIHwgY29kZVxuICBwcm92aWRlcl9pZDogc3RyaW5nIC8vIGdvb2dsZSBnaXRodWIgLi4uXG4gIGNsaWVudF9pZDogc3RyaW5nIC8vIFxuICBzY29wZTogc3RyaW5nIC8vXG4gIHJlZGlyZWN0X3VyaTogc3RyaW5nXG4gIHN0YXRlPzogc3RyaW5nXG4gIC8vIG90aGVyX3BhcmFtcz86IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgSUdlblByb3ZpZGVyUmVkaXJlY3RVUklSZXNwb25zZSB7XG4gIHVyaTogc3RyaW5nXG4gIHNpZ25vdXRfdXJpOiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIElHcmFudFByb3ZpZGVyVG9rZW5SZXF1ZXN0IHtcbiAgcHJvdmlkZXJfaWQ6IHN0cmluZ1xuICBjbGllbnRfaWQ6IHN0cmluZ1xuXG4gIC8vIOS7peS4i+WPguaVsOS7u+mAieWFtuS4gOWNs+WPr1xuICBwcm92aWRlcl9jb2RlPzogc3RyaW5nIC8vICdwcm92aWRlcl9jb2RlJ1xuICBwcm92aWRlcl9hY2Nlc3NfdG9rZW4/OiBzdHJpbmcgLy8gJ3Byb3ZpZGVyX2FjY2Vzc190b2tlbidcbiAgcHJvdmlkZXJfaWRfdG9rZW4/OiBzdHJpbmcgLy8gJ3Byb3ZpZGVyX2lkX3Rva2VuJ1xuXG4gIHByb3ZpZGVyX3JlZGlyZWN0X3VyaT86IHN0cmluZ1xuICBwcm92aWRlcl9wYXJhbXM/OiBzdHJpbmcgLy8gJ3Byb3ZpZGVyX3BhcmFtcydcbn1cblxuaW50ZXJmYWNlIElQcm92aWRlclByb2ZpbGUge1xuICBwcm92aWRlcl9pZDogc3RyaW5nXG4gIC8vIOS4u0lEXG4gIHN1Yj86IHN0cmluZ1xuICBuYW1lPzogc3RyaW5nXG4gIHBpY3R1cmU/OiBzdHJpbmdcbiAgZW1haWw/OiBzdHJpbmdcbiAgcGhvbmVfbnVtYmVyPzogc3RyaW5nXG4gIGdlbmRlcj86IHN0cmluZ1xuICBsb2NhbGU/OiBzdHJpbmdcbiAgLy8g5LiJ5pa55L+h5oGv5Y6f5paHXG4gIHJhdz86IHN0cmluZ1xuICAvLyDlhbbku5blhbPogZTnmoRJRFxuICBhc3NvY2lhdGVkX2lkcz86IHN0cmluZ1xuICBtZXRhPzogIHtcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmdcbiAgfVxufVxuXG5pbnRlcmZhY2UgSUdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlIHtcbiAgLy8g5aaC5p6c5LiN5ZCv55So6Ieq5Yqo5rOo5YaM77yMIOWImei/lOWbniBwcm92aWRlcl90b2tlbu+8jCDnlKjkuo7ov5vkuIDmraXlpITnkIbvvIzkvovlpoLvvJrpgJrov4fmiYvmnLrlj7fnrYnjgIJcbiAgcHJvdmlkZXJfdG9rZW46IHN0cmluZ1xuICAvLyDov4fmnJ/ml7bpl7RcbiAgZXhwaXJlc19pbjogbnVtYmVyXG4gIC8vIOWmguaenOS4jeWQr+eUqOiHquWKqOazqOWGjO+8jOWImeS8mui/lOWbnnByb3ZpZGVyIHVzZXJpbmZvIGVuZF9wb2ludCDnmoTov5Tlm57or6bmg4XvvIznlKjkuo7liY3nq6/lsZXnpLpcbiAgcHJvdmlkZXJfcHJvZmlsZTogSVByb3ZpZGVyUHJvZmlsZVxufVxuXG5pbnRlcmZhY2UgSVNpZ25JbldpdGhQcm92aWRlclJlcXVlc3Qge1xuICBjbGllbnRfaWQ6IHN0cmluZ1xuICBwcm92aWRlcl90b2tlbjogc3RyaW5nXG4gIC8vIOW8uuWItuWFs+mXreiHquWKqOazqOWGjOOAglxuICAvLyDpu5jorqTmg4XlhrXkuIvvvIzov5nph4zku6XmnI3liqHlmajphY3nva7kuLrlh4bvvIzlpoLmnpzlrqLmiLfnq6/kuLrkuoblubPmu5HljYfnuqflj6/ku6XphY3nva7kuLp0cnVl44CCXG4gIGZvcmNlX2Rpc2FibGVfc2lnbl91cDogYm9vbGVhblxuICAvLyDmmK/lkKblvLrliLbku47nrKzkuInmlrnlkIzmraXmmLXnp7DnrYnkv6Hmga9cbiAgc3luY19wcm9maWxlOiBib29sZWFuXG59XG5cbmludGVyZmFjZSBJVG9rZW4ge1xuICB0b2tlbl90eXBlOiBzdHJpbmdcbiAgYWNjZXNzX3Rva2VuOiBzdHJpbmdcbiAgcmVmcmVzaF90b2tlbjogc3RyaW5nXG4gIGlkX3Rva2VuOiBzdHJpbmdcbiAgZXhwaXJlc19pbjogbnVtYmVyXG4gIHNjb3BlPzogc3RyaW5nXG4gIHN1Yj86IHN0cmluZ1xuICB1c2VyX2dyb3VwPzogc3RyaW5nXG59XG5cbmludGVyZmFjZSBJUHJpdmlkZXJDYWxsYmFja0luZm8ge1xuICBocmVmOiBzdHJpbmcsXG5cbiAgc3RhdGU6IHN0cmluZyxcblxuICB0b2tlbl90eXBlOiBzdHJpbmcsXG4gIGNvZGU/OiBzdHJpbmcsXG4gIGFjY2Vzc190b2tlbj86IHN0cmluZyxcbiAgaWRfdG9rZW4/OiBzdHJpbmcsXG5cbiAgZXhwaXJlc19pbjogbnVtYmVyLFxuICBzY29wZTogc3RyaW5nLFxuICBhdXRodXNlcjogc3RyaW5nLFxuICBwcm9tcHQ6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgSVBvcHVwV2luZG93QXV0aFJlZGlyZWN0TWVzc2FnZSB7XG4gIHNvdXJjZTogc3RyaW5nLFxuICBjYWxsYmFja0luZm86IElQcml2aWRlckNhbGxiYWNrSW5mb1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElPQXV0aDJBdXRoUHJvdmlkZXJPcHRpb25zIHtcbiAgcHJvdmlkZXJJZD86IHN0cmluZ1xuICBjbGllbnRJZD86IHN0cmluZ1xuICByZXNwb25zZVR5cGU/OiBzdHJpbmdcbiAgc2NvcGU/OiBzdHJpbmdcbiAgcmVkaXJlY3RVcmk/OiBzdHJpbmdcblxuICBzeW5jUHJvZmlsZT86IGJvb2xlYW5cbiAgZm9yY2VEaXNhYmxlU2lnblVwPzogYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTaWduSW5XaXRoUG9wdXBPcHRpb25zIHtcbiAgcG9wdXA/OiB7XG4gICAgdGFyZ2V0Pzogc3RyaW5nLFxuICAgIGZlYXR1cmVzPzogc3RyaW5nXG4gIH1cbn1cblxuaW50ZXJmYWNlIElBdXRoU2VydmVyUmVzcEVycm9yIHtcbiAgZXJyb3I6IHN0cmluZyxcbiAgZXJyb3JfY29kZTogbnVtYmVyLFxuICBlcnJvcl9kZXNjcmlwdGlvbjogc3RyaW5nXG4gIHJlcXVlc3RfaWQ6IHN0cmluZ1xufVxuXG5leHBvcnQgY2xhc3MgT0F1dGgyQXV0aFByb3ZpZGVyIGV4dGVuZHMgQXV0aFByb3ZpZGVyIHtcbiAgLy8gcHJpdmF0ZSByZWFkb25seSBfc2NvcGU6IHN0cmluZ1xuICAvLyBwcml2YXRlIHJlYWRvbmx5IF9zdGF0ZTogc3RyaW5nXG4gIC8vIHByaXZhdGUgcmVhZG9ubHkgX2FwcGlkOiBzdHJpbmdcbiAgLy8gcHJpdmF0ZSByZWFkb25seSBfcnVudGltZTogc3RyaW5nXG5cbiAgcHJpdmF0ZSBwcm92aWRlcklkOiBzdHJpbmdcbiAgcHJpdmF0ZSBjbGllbnRJZDogc3RyaW5nXG4gIHByaXZhdGUgcmVzcG9uc2VUeXBlOiBzdHJpbmdcbiAgcHJpdmF0ZSBzY29wZTogc3RyaW5nXG4gIHByaXZhdGUgcmVkaXJlY3RVcmk6IHN0cmluZ1xuICBwcml2YXRlIHN5bmNQcm9maWxlOiBib29sZWFuXG4gIHByaXZhdGUgZm9yY2VEaXNhYmxlU2lnblVwOiBib29sZWFuXG5cbiAgcHJpdmF0ZSBwb3B1cFdpbmRvd1VybDogc3RyaW5nXG4gIHByaXZhdGUgcG9wdXBXaW5kb3dSZWY6IFdpbmRvdyA9IG51bGxcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IElDbG91ZGJhc2VBdXRoQ29uZmlnJntjYWNoZTpJQ2xvdWRiYXNlQ2FjaGUscmVxdWVzdDpJQ2xvdWRiYXNlUmVxdWVzdCxydW50aW1lOnN0cmluZ30sIG9wdGlvbnM6IElPQXV0aDJBdXRoUHJvdmlkZXJPcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihjb25maWcpXG5cbiAgICB0aGlzLnByb3ZpZGVySWQgPSBvcHRpb25zLnByb3ZpZGVySWRcbiAgICB0aGlzLmNsaWVudElkID0gb3B0aW9ucy5jbGllbnRJZCB8fCBjb25maWcuZW52XG4gICAgdGhpcy5yZXNwb25zZVR5cGUgPSBvcHRpb25zLnJlc3BvbnNlVHlwZSB8fCAndG9rZW4nXG4gICAgdGhpcy5zY29wZSA9IG9wdGlvbnMuc2NvcGUgfHwgJydcbiAgICB0aGlzLnJlZGlyZWN0VXJpID0gb3B0aW9ucy5yZWRpcmVjdFVyaSB8fCAnJ1xuICAgIHRoaXMuc3luY1Byb2ZpbGUgPSBvcHRpb25zLnN5bmNQcm9maWxlIHx8IGZhbHNlXG4gICAgdGhpcy5mb3JjZURpc2FibGVTaWduVXAgPSBvcHRpb25zLmZvcmNlRGlzYWJsZVNpZ25VcCB8fCBmYWxzZVxuXG4gICAgY29uc3QgcmVjdk1lc3NhZ2VGcm9tUG9wdXAgPSB0aGlzLnJlY3ZNZXNzYWdlRnJvbVBvcHVwLmJpbmQodGhpcylcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHJlY3ZNZXNzYWdlRnJvbVBvcHVwKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgcmVjdk1lc3NhZ2VGcm9tUG9wdXAsIGZhbHNlKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNpZ25Jbigpe1xuICAgIHJldHVybiB1dGlscy5wcmludFdhcm4oRVJST1JTLk9QRVJBVElPTl9GQUlMLCAnQVBJIHNpZ25JbiBoYXMgYmVlbiBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIHNpZ25JbldpdGhSZWRpcmVjdCBpbnN0ZWVkJylcbiAgfVxuXG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgdGl0bGU6ICfot7PovaznrKzkuInmlrnnmbvlvZXlubPlj7DlpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggYXV0aCgpLm9BdXRoMkF1dGhQcm92aWRlcigpIOeahOWPguaVsOaYr+WQpuato+ehricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIHNpZ25JbldpdGhQb3B1cChvcHRpb25zOiBJU2lnbkluV2l0aFBvcHVwT3B0aW9ucyA9IHt9KSB7XG4gICAgLy8gaWYgKHRoaXMuY2hlY2tMb2NhbExvZ2luU3RhdGUoKSkge1xuICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKGBbJHtnZXRTZGtOYW1lKCl9XVske0VSUk9SUy5VTktPV05fRVJST1J9XeW3sueZu+W9le+8jOivt+WFiOmAgOWHumApXG4gICAgLy8gfVxuICAgIHJldHVybiB0aGlzLmp1bXBUb1Byb3ZpZGVyUGFnZShvcHRpb25zKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNpZ25JbldpdGhNb2RhbChlbGVtSWQ6IHN0cmluZykge1xuXG4gICAgY29uc3QgeyB1cmk6IGF1dGhvcml6ZV91cmkgfSA9IGF3YWl0IHRoaXMuZmV0Y2hQcm92aWRlclJlZGlyZWN0VVJJKClcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JZClcbiAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgIGNvbnN0IHN0eWxlID0gYFxuICAgIDxzdHlsZT5cbiAgICAgIC8qIFRoZSBNb2RhbCAoYmFja2dyb3VuZCkgKi9cbiAgICAgIC5tb2RhbCB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7IC8qIEhpZGRlbiBieSBkZWZhdWx0ICovXG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDsgLyogU3RheSBpbiBwbGFjZSAqL1xuICAgICAgICB6LWluZGV4OiAxOyAvKiBTaXQgb24gdG9wICovXG4gICAgICAgIHBhZGRpbmctdG9wOiAxMDBweDsgLyogTG9jYXRpb24gb2YgdGhlIGJveCAqL1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlOyAvKiBGdWxsIHdpZHRoICovXG4gICAgICAgIGhlaWdodDogMTAwJTsgLyogRnVsbCBoZWlnaHQgKi9cbiAgICAgICAgb3ZlcmZsb3c6IGF1dG87IC8qIEVuYWJsZSBzY3JvbGwgaWYgbmVlZGVkICovXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigwLDAsMCk7IC8qIEZhbGxiYWNrIGNvbG9yICovXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC40KTsgLyogQmxhY2sgdy8gb3BhY2l0eSAqL1xuICAgICAgfVxuICBcbiAgICAgIC8qIE1vZGFsIENvbnRlbnQgKi9cbiAgICAgIC5tb2RhbC1jb250ZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZmVmZTtcbiAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgICBwYWRkaW5nOiAyMHB4O1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjODg4O1xuICAgICAgICAvKiB3aWR0aDogODAlOyAqL1xuICAgICAgfVxuICBcbiAgICAgIC8qIFRoZSBDbG9zZSBCdXR0b24gKi9cbiAgICAgIC5jbG9zZSB7XG4gICAgICAgIGNvbG9yOiAjYWFhYWFhO1xuICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICB9XG4gICAgICAuY2xvc2U6aG92ZXIsXG4gICAgICAuY2xvc2U6Zm9jdXMge1xuICAgICAgICBjb2xvcjogIzAwMDtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB9XG4gICAgICA8L3N0eWxlPlxuICAgIGBcbiAgICBjb25zdCBodG1sID0gYFxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjbG9zZVwiPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgIDxpZnJhbWUgaWQ9XCJsb2dpbklmcmFtZVwiIHNyYz1cIiR7YXV0aG9yaXplX3VyaX1cIiB0aXRsZT1cImlmcmFtZSBFeGFtcGxlIDFcIiB3aWR0aD1cIjQwMFwiIGhlaWdodD1cIjMwMFwiPjwvaWZyYW1lPlxuICAgICAgPC9kaXY+XG4gICAgYFxuICAgIGNvbnN0IHNjcmlwdCA9IGBcbiAgICAgIDxzY3JpcHQ+XG4gICAgICAvLyBHZXQgdGhlIDxzcGFuPiBlbGVtZW50IHRoYXQgY2xvc2VzIHRoZSBtb2RhbFxuICAgICAgdmFyIHNwYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2xvc2VcIilbMF07XG4gICAgICBcbiAgICAgIC8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIDxzcGFuPiAoeCksIGNsb3NlIHRoZSBtb2RhbFxuICAgICAgc3Bhbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIH1cbiAgXG4gICAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBhbnl3aGVyZSBvdXRzaWRlIG9mIHRoZSBtb2RhbCwgY2xvc2UgaXRcbiAgICAgIHdpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSBtb2RhbCkge1xuICAgICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBsb2dpbklmcmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW5JZnJhbWVcIilcbiAgICAgIDwvc2NyaXB0PlxuICAgIGBcbiAgICBtb2RhbC5pbm5lckhUTUwgPSBgXG4gICAgICAke2h0bWx9XG4gICAgICAke3N0eWxlfVxuICAgICAgJHtzY3JpcHR9XG4gICAgYFxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBqdW1wVG9Qcm92aWRlclBhZ2Uob3B0aW9uczogSVNpZ25JbldpdGhQb3B1cE9wdGlvbnMgPSB7fSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHVyaTogYXV0aG9yaXplX3VyaSB9ID0gYXdhaXQgdGhpcy5mZXRjaFByb3ZpZGVyUmVkaXJlY3RVUkkoKVxuICAgICAgY29uc3QgcG9wdXAgPSBvcHRpb25zLnBvcHVwIHx8IHt9XG4gICAgICBjb25zdCBwb3B1cFdpbmRvd1RhcmdldCA9IHBvcHVwLnRhcmdldCB8fCAnX2JsYW5rJ1xuICAgICAgY29uc3QgcG9wdXBXaW5kb3dGZWF0dXJlcyA9IHBvcHVwLmZlYXR1cmVzIHx8ICd0b29sYmFyPW5vLCBtZW51YmFyPW5vLCB3aWR0aD02MDAsIGhlaWdodD03MDAsIHRvcD0xMDAsIGxlZnQ9MTAwJ1xuICAgICAgLy8gY29uc29sZS5sb2coJ2p1bXBUb1Byb3ZpZGVyUGFnZTogJywgYXV0aG9yaXplX3VyaSwgdGhpcy5wb3B1cFdpbmRvd1JlZilcbiAgICAgIGxldCBwb3B1cFdpbmRvd1JlZiA9IHRoaXMucG9wdXBXaW5kb3dSZWZcbiAgICAgIGlmIChwb3B1cFdpbmRvd1JlZiA9PT0gbnVsbCB8fCBwb3B1cFdpbmRvd1JlZi5jbG9zZWQpIHtcbiAgICAgICAgcG9wdXBXaW5kb3dSZWYgPSB3aW5kb3cub3BlbihhdXRob3JpemVfdXJpLCBwb3B1cFdpbmRvd1RhcmdldCwgcG9wdXBXaW5kb3dGZWF0dXJlcylcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wb3B1cFdpbmRvd1VybCAhPT0gYXV0aG9yaXplX3VyaSkge1xuICAgICAgICBpZiAocG9wdXBXaW5kb3dSZWYgJiYgIXBvcHVwV2luZG93UmVmLmNsb3NlZCkge1xuICAgICAgICAgIHBvcHVwV2luZG93UmVmLmNsb3NlKClcbiAgICAgICAgfVxuICAgICAgICBwb3B1cFdpbmRvd1JlZiA9IHdpbmRvdy5vcGVuKGF1dGhvcml6ZV91cmksIHBvcHVwV2luZG93VGFyZ2V0LCBwb3B1cFdpbmRvd0ZlYXR1cmVzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcG9wdXBXaW5kb3dSZWYuZm9jdXMoKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXBvcHVwV2luZG93UmVmKSB7XG4gICAgICAgIHJldHVybiB1dGlscy5wcmludFdhcm4oRVJST1JTLk9QRVJBVElPTl9GQUlMLCBg5omT5byA56ys5LiJ5pa555m75b2V5o6I5p2D5aSx6LSl77yM5Y+v6IO95piv56aB55So5LqG5rWP6KeI5Zmo5by556qX77yMdXJpOiAke2F1dGhvcml6ZV91cml9YClcbiAgICAgIH1cbiAgICAgIHRoaXMucG9wdXBXaW5kb3dVcmwgPSBhdXRob3JpemVfdXJpXG4gICAgICB0aGlzLnBvcHVwV2luZG93UmVmID0gcG9wdXBXaW5kb3dSZWZcbiAgICAgIHRoaXMucG9wdXBXaW5kb3dSZWYuZm9jdXMoKVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgLy8gRE9NRXhjZXB0aW9uOiBCbG9ja2VkIGEgZnJhbWUgd2l0aCBvcmlnaW4gXCJcIiBmcm9tIGFjY2Vzc2luZyBhIGNyb3NzLW9yaWdpbiBmcmFtZS5cbiAgICAgIGlmICh0aGlzLnBvcHVwV2luZG93UmVmICYmICF0aGlzLnBvcHVwV2luZG93UmVmLmNsb3NlZCkge1xuICAgICAgICB0aGlzLnBvcHVwV2luZG93UmVmLmNsb3NlKClcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7Z2V0U2RrTmFtZSgpfV1bJHtFUlJPUlMuVU5LT1dOX0VSUk9SfV0ke2V9YClcbiAgICB9XG5cbiAgICAvLyDlnKjmlrDmoIfnrb7pobUgcG9zdCBtZXNzYWdlIOi/m+ihjOa1i+ivle+8jOaIluWPlua2iOazqOmHiui/m+ihjOa1i+ivlVxuICAgIC8vIHdpbmRvdy5vcGVuZXIucG9zdE1lc3NhZ2VcbiAgICAvLyB0aGlzLnBvcHVwV2luZG93UmVmLnBvc3RNZXNzYWdlKHtcbiAgICAvLyAgIHNvdXJjZTogJ2Nsb3VkYmFzZS1sb2dpbi1yZWRpcmVjdCcsXG4gICAgLy8gICBjYWxsYmFja0luZm86IHtcbiAgICAvLyAgICAgc3RhdGU6ICdleUowSWpveE5qSTNPREk0TXpBMk1qUXpMQ0p3Y205MmFXUmxjbDlwWkNJNkltZHZiMmRzWlNJc0ltTnNhV1Z1ZEY5cFpDSTZJbkJ5YjJSMVkzUnBiMjR0Wm5ZNU56a2lMQ0p5YjNWMFpVdGxlU0k2SWlKOScsXG4gICAgLy8gICAgIGFjY2Vzc190b2tlbjogJ3lhMjkuYTBBUnJkYU1fSkYtN2wxYU5rc3NDLWpSWUlERW9FeVUyUm5na2pveTBzOWxIQUFKcDU2eXV4RXlvVWE4c2FEaFIxUy0wNHh0cmFFbURjMFFTb2t5Qk9TVnBLSUU1elAwc2tlTVdadVppbndtS2hic1FUWmZyQ0dKSkdRTThuNzJIRWhheHFLMTdrLWdCZDJNTjBiV2Y5aS1kbEhuSkVDUScsXG4gICAgLy8gICAgIHRva2VuX3R5cGU6ICdCZWFyZXInLFxuICAgIC8vICAgICBleHBpcmVzX2luOiAnMzU5OCcsXG4gICAgLy8gICAgIHNjb3BlOiAnZW1haWwlMjBwcm9maWxlJTIwb3BlbmlkJTIwaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC91c2VyaW5mby5wcm9maWxlJTIwaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC91c2VyaW5mby5lbWFpbCcsXG4gICAgLy8gICAgIGF1dGh1c2VyOiAnMCcsXG4gICAgLy8gICAgIHByb21wdDogJ25vbmUnXG4gICAgLy8gICB9XG4gICAgLy8gfSwgJ2h0dHA6Ly9wcm9kdWN0aW9uLWZ2OTc5LTEyNTg5NjQ3NjkuYXAtc2hhbmdoYWkuYXBwLnRjbG91ZGJhc2UuY29tLycpXG5cbiAgICAvLyBmdW5jdGlvbiBwb3N0TWVzc2FnZVRvT3BlbmVyKCkge1xuICAgIC8vICAgLy8g6ZyA6KaB5pSv5oyB5LiN5ZCM55qE5Y+C5pWw5b2i5byPXG4gICAgLy8gICBpZiAod2luZG93Lm9wZW5lcikge1xuICAgIC8vICAgICAvLyB3aW5kb3cub3BlbmVyLnBvc3RNZXNzYWdlKHtcbiAgICAvLyAgICAgLy8gICBzb3VyY2U6ICdjbG91ZGJhc2UtbG9naW4tcmVkaXJlY3QnLFxuICAgIC8vICAgICAvLyAgIHJlZGlyZWN0VXJpOiAnJyxcbiAgICAvLyAgICAgLy8gICBjYWxsYmFja0luZm86IHtcbiAgICAvLyAgICAgLy8gICAgIHN0YXRlOiAnZXlKMElqb3hOakkzTmpNd05UWTROamt6TENKd2NtOTJhV1JsY2w5cFpDSTZJbWR2YjJkc1pTSXNJbU5zYVdWdWRGOXBaQ0k2SW5CeWIyUjFZM1JwYjI0dFpuWTVOemtpZlE9PScsXG4gICAgLy8gICAgIC8vICAgICBhY2Nlc3NfdG9rZW46ICd5YTI5LmEwQVJyZGFNLWhMY19DQUdGMjZ4TWpUemRsQWxvUnM4V2loV0ZWeTZHUkRHdjFETVlaYkcwazF4STNkS2d1M0U0MkdpNlAxRDFWNmR0ei1YQlNoakRvdTJNUldOYVBOWl9TTkNfaWRSVElxVEN4VTFmN3hVLUZLZm1TOEEwQVpaRGs4LWg3YTNWWXNoMTJFZWkxajJVTnd1REdLVXVPUHcnLFxuICAgIC8vICAgICAvLyAgICAgdG9rZW5fdHlwZTogJ0JlYXJlcicsXG4gICAgLy8gICAgIC8vICAgICBleHBpcmVzX2luOiAnMzU5OScsXG4gICAgLy8gICAgIC8vICAgICBzY29wZTogJ2VtYWlsJTIwcHJvZmlsZSUyMG9wZW5pZCUyMGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8uZW1haWwlMjBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLnByb2ZpbGUnLFxuICAgIC8vICAgICAvLyAgICAgYXV0aHVzZXI6ICcwJyxcbiAgICAvLyAgICAgLy8gICAgIHByb21wdDogJ25vbmUnXG4gICAgLy8gICAgIC8vICAgfVxuICAgIC8vICAgICAvLyB9LCAnaHR0cDovL3Byb2R1Y3Rpb24tZnY5NzktMTI1ODk2NDc2OS5hcC1zaGFuZ2hhaS5hcHAudGNsb3VkYmFzZS5jb20vJylcbiAgICAvLyAgICAgY29uc3QgcGFyYW1zID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaFxuICAgIC8vICAgICB3aW5kb3cub3BlbmVyLnBvc3RNZXNzYWdlKHBhcmFtcywgJycpXG4gICAgLy8gICAgIHdpbmRvdy5jbG9zZSgpXG4gICAgLy8gICB9XG4gICAgLy8gfVxuICB9XG5cbiAgLyoqXG4gICAqIHJlY3ZNZXNzYWdlRnJvbVBvcHVwIOaOpeaUtuWbnuiwg+mhtemdoueZu+W9lea2iOaBr1xuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogQHJldHVybnMgXG4gICAqL1xuICBwcml2YXRlIHJlY3ZNZXNzYWdlRnJvbVBvcHVwKGV2ZW50OiBNZXNzYWdlRXZlbnQpIHtcbiAgICAvLyBjb25zb2xlLmxvZygncmVjdiBldmVudDonLCBldmVudClcbiAgICAvLyBvcmlnaW46IFwiaHR0cDovL3Byb2R1Y3Rpb24tZnY5NzktMTI1ODk2NDc2OS5hcC1zaGFuZ2hhaS5hcHAudGNsb3VkYmFzZS5jb21cIlxuICAgIGlmICghZXZlbnQuaXNUcnVzdGVkKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnIWV2ZW50LmlzVHJ1c3RlZCcpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coJ3RoaXMucG9wdXBXaW5kb3dSZWYgPT09IGV2ZW50LnNvdXJjZScsIHRoaXMucG9wdXBXaW5kb3dSZWYgPT09IGV2ZW50LnNvdXJjZSlcbiAgICBpZiAodGhpcy5wb3B1cFdpbmRvd1JlZiA9PT0gZXZlbnQuc291cmNlICYmIGV2ZW50LmRhdGEuc291cmNlID09PSAnY2xvdWRiYXNlLWxvZ2luLXJlZGlyZWN0Jykge1xuICAgICAgLy8gY29uc29sZS5sb2coJ3JlY3YgY2xvdWRiYXNlLWxvZ2luLXJlZGlyZWN0IGV2ZW50JywgZXZlbnQuZGF0YSlcbiAgICAgIGNvbnN0IGRhdGE6IElQb3B1cFdpbmRvd0F1dGhSZWRpcmVjdE1lc3NhZ2UgPSBldmVudC5kYXRhXG4gICAgICB0aGlzLmNvbnRpbnVlU2lnbkluKGRhdGEuY2FsbGJhY2tJbmZvKVxuICAgICAgaWYgKCF0aGlzLnBvcHVwV2luZG93UmVmLmNsb3NlZCkge1xuICAgICAgICB0aGlzLnBvcHVwV2luZG93UmVmLmNsb3NlKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY29udGludWVTaWduSW4g57un57ut55m75b2VXG4gICAqIEBwYXJhbSBjYWxsYmFja0luZm9cbiAgICogQHJldHVybnNcbiAgICovXG4gIGFzeW5jIGNvbnRpbnVlU2lnbkluKGNhbGxiYWNrSW5mbz86IElQcml2aWRlckNhbGxiYWNrSW5mbyk6IFByb21pc2U8TG9naW5TdGF0ZT4ge1xuICAgIC8vIOi/memHjOaUr+aMgeWcqOWbnuiwg+mhtemdouiwg+eUqOivpeWHveaVsOWujOaIkOeZu+W9lVxuICAgIGNhbGxiYWNrSW5mbyA9IGNhbGxiYWNrSW5mbyB8fCB0aGlzLmdldEF1dGhQcml2aWRlckNhbGxiYWNrSW5mb0Zyb21VcmwoKVxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy5zaWduSW5XaXRoUHJvdmlkZXIoY2FsbGJhY2tJbmZvKVxuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW5LZXksIGFjY2Vzc1Rva2VuRXhwaXJlS2V5LCByZWZyZXNoVG9rZW5LZXkgfSA9IHRoaXMuX2NhY2hlLmtleXNcbiAgICBjb25zdCB7IHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlbiwgYWNjZXNzX3Rva2VuOiBhY2Nlc3NUb2tlbiwgZXhwaXJlc19pbjogYWNjZXNzVG9rZW5FeHBpcmUgfSA9IHRva2VuXG5cbiAgICBpZiAoIWFjY2Vzc1Rva2VuIHx8ICFhY2Nlc3NUb2tlbkV4cGlyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogJ1NpZ25GYWlsdXJlJ1xuICAgICAgfSkpXG4gICAgfVxuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5fY2FjaGUuc2V0U3RvcmVBc3luYyhyZWZyZXNoVG9rZW5LZXksIHJlZnJlc2hUb2tlbiksXG4gICAgICB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbiksXG4gICAgICB0aGlzLl9jYWNoZS5zZXRTdG9yZUFzeW5jKGFjY2Vzc1Rva2VuRXhwaXJlS2V5LCBhY2Nlc3NUb2tlbkV4cGlyZSAqIDEwMDAgKyBEYXRlLm5vdygpKVxuICAgIF0pXG4gICAgZXZlbnRCdXMuZmlyZShFVkVOVFMuTE9HSU5fU1RBVEVfQ0hBTkdFRClcbiAgICBldmVudEJ1cy5maXJlKEVWRU5UUy5MT0dJTl9UWVBFX0NIQU5HRUQsIHtcbiAgICAgIGVudjogdGhpcy5fY29uZmlnLmVudixcbiAgICAgIGxvZ2luVHlwZTogYCR7T0FVVEgyX0xPR0lOVFlQRV9QUkVGSVh9LiR7dGhpcy5wcm92aWRlcklkfWAsIFxuICAgICAgcGVyc2lzdGVuY2U6IHRoaXMuX2NvbmZpZy5wZXJzaXN0ZW5jZSBcbiAgICB9KVxuXG4gICAgY29uc3QgbG9naW5TdGF0ZSA9IG5ldyBMb2dpblN0YXRlKHtcbiAgICAgIGVudklkOiB0aGlzLl9jb25maWcuZW52LFxuICAgICAgY2FjaGU6IHRoaXMuX2NhY2hlLFxuICAgICAgcmVxdWVzdDogdGhpcy5fcmVxdWVzdFxuICAgIH0pXG5cbiAgICBhd2FpdCBsb2dpblN0YXRlLmNoZWNrTG9jYWxTdGF0ZUFzeW5jKClcblxuICAgIC8vIGNvbnN0IHVzZXJJbmZvID0gYXdhaXQgdGhpcy5yZWZyZXNoVXNlckluZm8oKVxuXG4gICAgcmV0dXJuIGxvZ2luU3RhdGVcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXV0aFByaXZpZGVyQ2FsbGJhY2tJbmZvRnJvbVVybCgpOiBJUHJpdmlkZXJDYWxsYmFja0luZm8ge1xuICAgIC8vIFRPRE86IOaUr+aMgSBRdWVyeSAmIEhhc2hcbiAgICAvLyDnm7TmjqXku44gVVJMIOS4iuWPluWbnuiwg+S/oeaBr1xuICAgIC8vIHtcbiAgICAvLyAgIHN0YXRlOiAnX3RzdGF0ZS4xNjI3NTY0NTYxNzUwJyxcbiAgICAvLyAgIGFjY2Vzc190b2tlbjogJ3lhMjkuYTBBUnJkYU05OHlNcFVoQ0pScTJsVmV6UHRkaFFIQVdzdkR6ajVPaWlJOFdSRWF3UWpDOUhVbzd0S2p1c0pSNHowT0NENTQzNUJ0YnFILWtUc0xUQjNubGxmSEwwR2pxSk4xTjIwX3I4UXMyY2tWd0g3YXhDdW9rbXc1OEFfZDBTS1Z1cU4tVS1OUjYxUXJJSzZIdmw4V0FNLWptMjJldycsXG4gICAgLy8gICB0b2tlbl90eXBlOiAnQmVhcmVyJyxcbiAgICAvLyAgIGV4cGlyZXNfaW46IDM1OTksXG4gICAgLy8gICBzY29wZTogJ2VtYWlsJTIwcHJvZmlsZSUyMG9wZW5pZCUyMGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8uZW1haWwlMjBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLnByb2ZpbGUnLFxuICAgIC8vICAgYXV0aHVzZXI6ICcwJyxcbiAgICAvLyAgIHByb21wdDogJ25vbmUnXG4gICAgLy8gfVxuICAgIHJldHVybiBxc1BhcnNlKGRlY29kZVVSSUNvbXBvbmVudCgobmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZikuaGFzaCkucmVwbGFjZSgnIycsICcnKSkpIGFzIElQcml2aWRlckNhbGxiYWNrSW5mb1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBmZXRjaFByb3ZpZGVyUmVkaXJlY3RVUkkoKTogUHJvbWlzZTxJR2VuUHJvdmlkZXJSZWRpcmVjdFVSSVJlc3BvbnNlPiB7XG4gICAgY29uc3Qge1xuICAgICAgcmVzcG9uc2VfdHlwZSxcbiAgICAgIHByb3ZpZGVyX2lkLFxuICAgICAgY2xpZW50X2lkLFxuICAgICAgc2NvcGUsXG4gICAgICByZWRpcmVjdF91cmksXG4gICAgICBzdGF0ZSxcbiAgICAgIC8vIG90aGVyX3BhcmFtc1xuICAgIH06IElHZW5Qcm92aWRlclJlZGlyZWN0VVJJUmVxdWVzdCA9IHtcbiAgICAgIHJlc3BvbnNlX3R5cGU6IHRoaXMucmVzcG9uc2VUeXBlLFxuICAgICAgcHJvdmlkZXJfaWQ6IHRoaXMucHJvdmlkZXJJZCxcbiAgICAgIGNsaWVudF9pZDogdGhpcy5jbGllbnRJZCxcbiAgICAgIHNjb3BlOiB0aGlzLnNjb3BlLFxuICAgICAgcmVkaXJlY3RfdXJpOiB0aGlzLnJlZGlyZWN0VXJpLFxuICAgICAgc3RhdGU6IGJ0b2EoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB0OiBEYXRlLm5vdygpLFxuICAgICAgICBwcm92aWRlcl9pZDogdGhpcy5wcm92aWRlcklkLFxuICAgICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXG4gICAgICAgIC8vIOeZu+W9leaIkOWKn+S5i+WQjui3r+eUseeahOmhtemdouWcsOWdgFxuICAgICAgICByb3V0ZUtleTogJydcbiAgICAgIH0pKSxcbiAgICAgIC8vIG90aGVyX3BhcmFtczogdXRpbHMudG9RdWVyeVN0cmluZyh7IGE6IDEgfSlcbiAgICB9XG5cbiAgICBjb25zdCBxcyA9IHV0aWxzLnRvUXVlcnlTdHJpbmcoe1xuICAgICAgcmVzcG9uc2VfdHlwZSxcbiAgICAgIHByb3ZpZGVyX2lkLFxuICAgICAgY2xpZW50X2lkLFxuICAgICAgc2NvcGUsXG4gICAgICByZWRpcmVjdF91cmksXG4gICAgICBzdGF0ZSxcbiAgICAgIC8vIG90aGVyX3BhcmFtc1xuICAgIH0pXG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMuZmV0Y2goYCR7a1BhdGhzLnByaXZpZGVyVXJpfT8ke3FzfWAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KVxuICAgIC8vIHtcbiAgICAvLyAgIHVyaTogJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi92Mi9hdXRoP2NsaWVudF9pZD02ODY5NzAyMTU5NDQtZ3VuMW5lb2ZqaHRqdDdnbXRhMnFmdGg2Zjgyc2owMTEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20mcmVkaXJlY3RfdXJpPWh0dHBzJTNBJTJGJTJGcHJvZHVjdGlvbi1mdjk3OS0xMjU4OTY0NzY5LmFwLXNoYW5naGFpLmFwcC50Y2xvdWRiYXNlLmNvbSZyZXNwb25zZV90eXBlPXRva2VuJnNjb3BlPW9wZW5pZCtlbWFpbCtwcm9maWxlJnN0YXRlPV90c3RhdGUuMTYyNzU0NTk0MTkyMycsXG4gICAgLy8gICBzaWdub3V0X3VyaTogJydcbiAgICAvLyB9XG4gICAgcmV0dXJuIHJlc3AuanNvbigpXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGZldGNoUHJvdmlkZXJUb2tlbihjYWxsYmFja0luZm86IElQcml2aWRlckNhbGxiYWNrSW5mbyk6IFByb21pc2U8SUdyYW50UHJvdmlkZXJUb2tlblJlc3BvbnNlPiB7XG4gICAgLy8gY29uc3Qgc3RhdGUgPSBhdG9iKEpTT04uc3RyaW5naWZ5KGNhbGxiYWNrSW5mby5zdGF0ZSkpXG4gICAgY29uc3QgYm9keTogSUdyYW50UHJvdmlkZXJUb2tlblJlcXVlc3QgPSB7XG4gICAgICBwcm92aWRlcl9pZDogdGhpcy5wcm92aWRlcklkLFxuICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudElkLFxuICAgICAgcHJvdmlkZXJfcmVkaXJlY3RfdXJpOiBjYWxsYmFja0luZm8uaHJlZlxuICAgIH1cblxuICAgIGlmIChjYWxsYmFja0luZm8uY29kZSkge1xuICAgICAgYm9keS5wcm92aWRlcl9jb2RlID0gY2FsbGJhY2tJbmZvLmNvZGVcbiAgICB9XG4gICAgZWxzZSBpZiAoY2FsbGJhY2tJbmZvLmFjY2Vzc190b2tlbikge1xuICAgICAgYm9keS5wcm92aWRlcl9hY2Nlc3NfdG9rZW4gPSBjYWxsYmFja0luZm8uYWNjZXNzX3Rva2VuXG4gICAgfVxuICAgIGVsc2UgaWYgKGNhbGxiYWNrSW5mby5pZF90b2tlbikge1xuICAgICAgYm9keS5wcm92aWRlcl9pZF90b2tlbiA9IGNhbGxiYWNrSW5mby5pZF90b2tlblxuICAgIH1cblxuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLmZldGNoKGtQYXRocy5wcml2aWRlclRva2VuLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG4gICAgfSlcbiAgICAvLyB7XG4gICAgLy8gICBcInByb3ZpZGVyX3Rva2VuXCI6IFwiZXlKaGJHY2lPaUpCNkFTOC4uLi4uLkhCNC12MVAxai16d3FpUVwiLFxuICAgIC8vICAgXCJleHBpcmVzX2luXCI6IDEyMDAsXG4gICAgLy8gICBcInByb3ZpZGVyX3Byb2ZpbGVcIjoge1xuICAgIC8vICAgICBcInByb3ZpZGVyX2lkXCI6IFwiZ29vZ2xlXCIsXG4gICAgLy8gICAgIFwic3ViXCI6IFwiMTAxOTYzNzUxNDk2ODA3MDc5MzgxXCIsXG4gICAgLy8gICAgIFwibmFtZVwiOiBcIlwiLFxuICAgIC8vICAgICBcInBpY3R1cmVcIjogXCJcIixcbiAgICAvLyAgICAgXCJlbWFpbFwiOiBcIlwiLFxuICAgIC8vICAgICBcImxvY2FsZVwiOiBcInpoLWNuXCJcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gICAgcmV0dXJuIHJlc3AuanNvbigpXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHNpZ25JbldpdGhQcm92aWRlcihjYWxsYmFja0luZm86IElQcml2aWRlckNhbGxiYWNrSW5mbyk6IFByb21pc2U8SVRva2VuPiB7XG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLmZldGNoUHJvdmlkZXJUb2tlbihjYWxsYmFja0luZm8pXG4gICAgY29uc3QgYm9keTogSVNpZ25JbldpdGhQcm92aWRlclJlcXVlc3QgPSB7XG4gICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXG4gICAgICBwcm92aWRlcl90b2tlbjogdG9rZW4ucHJvdmlkZXJfdG9rZW4sXG4gICAgICBzeW5jX3Byb2ZpbGU6IHRoaXMuc3luY1Byb2ZpbGUsXG4gICAgICBmb3JjZV9kaXNhYmxlX3NpZ25fdXA6IHRoaXMuZm9yY2VEaXNhYmxlU2lnblVwXG4gICAgfVxuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLmZldGNoKGtQYXRocy5zaWduaW5XaXRoUHJvdmlkZXIsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcbiAgICB9KVxuICAgIHJldHVybiByZXNwLmpzb24oKVxuICB9XG5cbiAgYXN5bmMgcmVmcmVzaFVzZXJJbmZvKCkge1xuICAgIGNvbnN0IHsgYWNjZXNzVG9rZW4gfSA9IChhd2FpdCB0aGlzLl9yZXF1ZXN0LmdldEFjY2Vzc1Rva2VuKCkpXG4gICAgY29uc3QgYXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gXG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMuZmV0Y2goa1BhdGhzLm1lLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQXV0aG9yaXphdGlvbic6IGF1dGhvcml6YXRpb25cbiAgICAgIH1cbiAgICB9KVxuICAgIC8vIHtcbiAgICAvLyAgIFwic3ViXCI6IFwiN2FhYjRiYTkwNTNlNDQwMmEzZDQyYjYxY2MyNTdjMTFcIixcbiAgICAvLyAgIFwibmFtZVwiOiBcIlwiLFxuICAgIC8vICAgXCJwaWN0dXJlXCI6IFwiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2c0c0RlMTRTQzVXTnM4NUtvMm5mQmxYdmxkWVZnYlNZYnZJcmthPXM5Ni1jXCIsXG4gICAgLy8gICBcImVtYWlsXCI6IFwiXCIsXG4gICAgLy8gICBcInByb3ZpZGVyc1wiOiBbXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICBcImlkXCI6IFwiZ29vZ2xlXCIsXG4gICAgLy8gICAgICAgXCJwcm92aWRlcl91c2VyX2lkXCI6IFwiMTAxOTYzNzUxNDk2ODA3MDc5MzgxXCIsXG4gICAgLy8gICAgICAgXCJuYW1lXCI6IFwiXCJcbiAgICAvLyAgICAgfVxuICAgIC8vICAgXSxcbiAgICAvLyAgIFwic3RhdHVzXCI6IFwiQUNUSVZFXCIsXG4gICAgLy8gICBcImNyZWF0ZWRfYXRcIjogXCIyMDIxLTA3LTI4VDA2OjMxOjM2Ljk4M1pcIixcbiAgICAvLyAgIFwicGFzc3dvcmRfdXBkYXRlZF9hdFwiOiBcIjIwMjEtMDctMjhUMDY6MzE6MzYuOTgzWlwiXG4gICAgLy8gfVxuICAgIHJldHVybiByZXNwLmpzb24oKVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBmZXRjaCh1cmxPclBhdGg6IHN0cmluZywgaW5pdD86IFJlcXVlc3RJbml0KSB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMuX3JlcXVlc3QuZmV0Y2godXJsT3JQYXRoLCBpbml0KVxuXG4gICAgY29uc3Qgc2VxSWRGcm9tSGVhZGVyID0gcmVzcC5oZWFkZXJzLmdldCgnU2VxSWQnKSB8fCByZXNwLmhlYWRlcnMuZ2V0KCdSZXF1ZXN0SWQnKVxuICAgIGlmIChyZXNwLnN0YXR1cyA+PSA0MDAgJiYgcmVzcC5zdGF0dXMgPCA1MDApIHtcbiAgICAgIGNvbnN0IGJvZHk6IElBdXRoU2VydmVyUmVzcEVycm9yID0gYXdhaXQgcmVzcC5qc29uKClcbiAgICAgIGNvbnN0IHNlcUlkID0gYm9keS5yZXF1ZXN0X2lkIHx8IHNlcUlkRnJvbUhlYWRlclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHtnZXRTZGtOYW1lKCl9XVtPQXV0aDJBdXRoUHJvdmlkZXJdW3N0YXR1czoke3Jlc3Auc3RhdHVzfV1bJHtib2R5LmVycm9yfSgke2JvZHkuZXJyb3JfY29kZX0pXSAke2JvZHkuZXJyb3JfZGVzY3JpcHRpb259ICgke3NlcUlkfSlgKVxuICAgIH1cbiAgICBlbHNlIGlmIChyZXNwLnN0YXR1cyA+PSA1MDApIHtcbiAgICAgIGNvbnN0IGJvZHk6IElBdXRoU2VydmVyUmVzcEVycm9yID0gYXdhaXQgcmVzcC5qc29uKClcbiAgICAgIGNvbnN0IHNlcUlkID0gYm9keS5yZXF1ZXN0X2lkIHx8IHNlcUlkRnJvbUhlYWRlclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHtnZXRTZGtOYW1lKCl9XVtPQXV0aDJBdXRoUHJvdmlkZXJdW3N0YXR1czoke3Jlc3Auc3RhdHVzfV1bJHtib2R5LmVycm9yfSgke2JvZHkuZXJyb3JfY29kZX0pXSAke2JvZHkuZXJyb3JfZGVzY3JpcHRpb259ICgke3NlcUlkfSlgKVxuICAgIH1cblxuICAgIHJldHVybiByZXNwXG4gIH1cbn1cbiJdfQ==