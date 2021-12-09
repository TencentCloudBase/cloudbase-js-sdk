"use strict";
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
exports.Captcha = exports.getCaptcha = void 0;
var internal_1 = require("../app/internal");
function getCaptcha(app, opts) {
    return internal_1._getComponent(app, "captcha", function () {
        var initOpts = {
            request: app.options.request,
            storage: app.options.storage,
            openURIWithCallback: app.options.openURIWithCallback,
        };
        if (opts === null || opts === void 0 ? void 0 : opts.request) {
            initOpts.request = opts.request;
        }
        return new Captcha(initOpts);
    });
}
exports.getCaptcha = getCaptcha;
var GET_CAPTCHA_URL = '/auth/v1/captcha/init';
var Captcha = (function () {
    function Captcha(opts) {
        this._config = opts;
        this._tokenSectionName = 'captcha_';
    }
    Captcha.prototype.request = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var state, reqURL, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options) {
                            options = {};
                        }
                        if (!options.method) {
                            options.method = 'GET';
                        }
                        state = options.method + ":" + url;
                        reqURL = url;
                        if (!options.withCaptcha) return [3, 2];
                        return [4, this._appendCaptchaTokenToURL(url, state, false)];
                    case 1:
                        reqURL = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 3, , 7]);
                        return [2, this._config.request(reqURL, options)];
                    case 3:
                        err_1 = _a.sent();
                        if (!(err_1.error === 'captcha_required' || err_1.error === 'captcha_invalid')) return [3, 5];
                        return [4, this._appendCaptchaTokenToURL(url, state, err_1.error === 'captcha_invalid')];
                    case 4:
                        url = _a.sent();
                        return [2, this._config.request(url, options)];
                    case 5: return [2, Promise.reject(err_1)];
                    case 6: return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    Captcha.prototype._getCaptchaToken = function (forceNewToken, state) {
        return __awaiter(this, void 0, void 0, function () {
            var captchaToken_1, redirectURL, captchaTokenResp, captchaToken_2, callbackData, captchaToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!forceNewToken) return [3, 2];
                        return [4, this._findCaptchaToken()];
                    case 1:
                        captchaToken_1 = _a.sent();
                        if (captchaToken_1) {
                            return [2, captchaToken_1];
                        }
                        _a.label = 2;
                    case 2:
                        redirectURL = window.location.origin + window.location.pathname;
                        return [4, this._config.request(GET_CAPTCHA_URL, {
                                method: 'POST',
                                body: {
                                    redirect_uri: redirectURL,
                                    state: state
                                },
                                withBasicAuth: true,
                            })];
                    case 3:
                        captchaTokenResp = _a.sent();
                        if (!captchaTokenResp.captcha_token) return [3, 5];
                        captchaToken_2 = {
                            captcha_token: captchaTokenResp.captcha_token,
                            expires_in: captchaTokenResp.expires_in,
                        };
                        return [4, this._saveCaptchaToken(captchaToken_2)];
                    case 4:
                        _a.sent();
                        return [2, captchaTokenResp.captcha_token];
                    case 5: return [4, this._config.openURIWithCallback(captchaTokenResp.url, { width: '355px', height: '355px' })];
                    case 6:
                        callbackData = _a.sent();
                        captchaToken = {
                            captcha_token: callbackData.captcha_token,
                            expires_in: Number(callbackData.expires_in)
                        };
                        return [4, this._saveCaptchaToken(captchaToken)];
                    case 7:
                        _a.sent();
                        return [2, captchaToken.captcha_token];
                }
            });
        });
    };
    Captcha.prototype._appendCaptchaTokenToURL = function (url, state, forceNewToken) {
        return __awaiter(this, void 0, void 0, function () {
            var captchaToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._getCaptchaToken(forceNewToken, state)];
                    case 1:
                        captchaToken = _a.sent();
                        if (url.indexOf("?") > 0) {
                            url += "&captcha_token=" + captchaToken;
                        }
                        else {
                            url += "?captcha_token=" + captchaToken;
                        }
                        return [2, url];
                }
            });
        });
    };
    Captcha.prototype._saveCaptchaToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenStr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token.expires_at = new Date(Date.now() + (token.expires_in - 10) * 1000);
                        tokenStr = JSON.stringify(token);
                        return [4, this._config.storage.setItem(this._tokenSectionName, tokenStr)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Captcha.prototype._findCaptchaToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokenStr, captchaToken, isExpired, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._config.storage.getItem(this._tokenSectionName)];
                    case 1:
                        tokenStr = _a.sent();
                        if (!(tokenStr !== undefined && tokenStr !== null)) return [3, 5];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 3, , 5]);
                        captchaToken = JSON.parse(tokenStr);
                        if (captchaToken === null || captchaToken === void 0 ? void 0 : captchaToken.expires_at) {
                            captchaToken.expires_at = new Date(captchaToken.expires_at);
                        }
                        isExpired = captchaToken.expires_at < new Date();
                        if (isExpired) {
                            return [2, null];
                        }
                        return [2, captchaToken.captcha_token];
                    case 3:
                        error_1 = _a.sent();
                        return [4, this._config.storage.removeItem(this._tokenSectionName)];
                    case 4:
                        _a.sent();
                        return [2, null];
                    case 5: return [2, null];
                }
            });
        });
    };
    return Captcha;
}());
exports.Captcha = Captcha;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2FwdGNoYS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw0Q0FBZ0Q7QUFZaEQsU0FBZ0IsVUFBVSxDQUFDLEdBQVEsRUFBRSxJQUF5QjtJQUM1RCxPQUFPLHdCQUFhLENBQVUsR0FBRyxFQUFFLFNBQVMsRUFBRTtRQUM1QyxJQUFNLFFBQVEsR0FBRztZQUNmLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU87WUFDNUIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTztZQUM1QixtQkFBbUIsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLG1CQUFtQjtTQUNyRCxDQUFBO1FBQ0QsSUFBSSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsT0FBTyxFQUFFO1lBQ2pCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtTQUNoQztRQUNELE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDOUIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBWkQsZ0NBWUM7QUFrQkQsSUFBTSxlQUFlLEdBQUcsdUJBQXVCLENBQUE7QUFFL0M7SUFRRSxpQkFBWSxJQUFvQjtRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtRQUNuQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFBO0lBQ3JDLENBQUM7SUFPWSx5QkFBTyxHQUFwQixVQUNFLEdBQVcsRUFDWCxPQUErQjs7Ozs7O3dCQUUvQixJQUFJLENBQUMsT0FBTyxFQUFFOzRCQUNaLE9BQU8sR0FBRyxFQUFFLENBQUM7eUJBQ2Q7d0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7NEJBQ25CLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFB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QUNLLFNBQVMsR0FBRyxZQUFZLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQ3ZELElBQUksU0FBUyxFQUFFOzRCQUNiLFdBQU8sSUFBSSxFQUFBO3lCQUNaO3dCQUNELFdBQU8sWUFBWSxDQUFDLGFBQWEsRUFBQTs7O3dCQUVqQyxXQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBQTs7d0JBQTdELFNBQTZELENBQUM7d0JBQzlELFdBQU8sSUFBSSxFQUFBOzRCQUdmLFdBQU8sSUFBSSxFQUFBOzs7O0tBQ1o7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQTFIRCxJQTBIQztBQTFIWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcCwgUmVxdWVzdE9wdGlvbnMsIFJlcXVlc3RGbiwgU3RvcmFnZSwgT3BlblVSSVdpdGhDYWxsYmFjayB9IGZyb20gXCIuLi9hcHBcIjtcbmltcG9ydCB7IF9nZXRDb21wb25lbnQgfSBmcm9tIFwiLi4vYXBwL2ludGVybmFsXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FwdGNoYU9wdGlvbnMge1xuICByZXF1ZXN0OiBSZXF1ZXN0Rm47XG4gIHN0b3JhZ2U6IFN0b3JhZ2U7XG4gIG9wZW5VUklXaXRoQ2FsbGJhY2s6IE9wZW5VUklXaXRoQ2FsbGJhY2s7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FwdGNoYUluaXRPcHRpb25zIHtcbiAgcmVxdWVzdD86IFJlcXVlc3RGbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENhcHRjaGEoYXBwOiBBcHAsIG9wdHM/OiBDYXB0Y2hhSW5pdE9wdGlvbnMpOiBDYXB0Y2hhIHtcbiAgcmV0dXJuIF9nZXRDb21wb25lbnQ8Q2FwdGNoYT4oYXBwLCBcImNhcHRjaGFcIiwgKCk6IENhcHRjaGEgPT4ge1xuICAgIGNvbnN0IGluaXRPcHRzID0ge1xuICAgICAgcmVxdWVzdDogYXBwLm9wdGlvbnMucmVxdWVzdCxcbiAgICAgIHN0b3JhZ2U6IGFwcC5vcHRpb25zLnN0b3JhZ2UsXG4gICAgICBvcGVuVVJJV2l0aENhbGxiYWNrOiBhcHAub3B0aW9ucy5vcGVuVVJJV2l0aENhbGxiYWNrLFxuICAgIH1cbiAgICBpZiAob3B0cz8ucmVxdWVzdCkge1xuICAgICAgaW5pdE9wdHMucmVxdWVzdCA9IG9wdHMucmVxdWVzdFxuICAgIH1cbiAgICByZXR1cm4gbmV3IENhcHRjaGEoaW5pdE9wdHMpXG4gIH0pO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhcHRjaGFUb2tlbiB7XG4gIGNhcHRjaGFfdG9rZW46IHN0cmluZ1xuICBleHBpcmVzX2luOiBudW1iZXJcbiAgZXhwaXJlc19hdD86IERhdGUgfCBudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhcHRjaGFSZXF1ZXN0T3B0aW9ucyBleHRlbmRzIFJlcXVlc3RPcHRpb25zIHtcbiAgd2l0aENhcHRjaGE/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdldENhcHRjaGFSZXNwb25zZSB7XG4gIGNhcHRjaGFfdG9rZW4/OiBzdHJpbmdcbiAgZXhwaXJlc19pbj86IG51bWJlclxuICB1cmw/OiBzdHJpbmdcbn1cblxuY29uc3QgR0VUX0NBUFRDSEFfVVJMID0gJy9hdXRoL3YxL2NhcHRjaGEvaW5pdCdcblxuZXhwb3J0IGNsYXNzIENhcHRjaGEge1xuICBwcml2YXRlIF9jb25maWc6IENhcHRjaGFPcHRpb25zO1xuICBwcml2YXRlIF90b2tlblNlY3Rpb25OYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7Q2FwdGNoYU9wdGlvbnN9IG9wdHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdHM6IENhcHRjaGFPcHRpb25zKSB7XG4gICAgdGhpcy5fY29uZmlnID0gb3B0c1xuICAgIHRoaXMuX3Rva2VuU2VjdGlvbk5hbWUgPSAnY2FwdGNoYV8nXG4gIH1cblxuICAvKipcbiAgICogcmVxdWVzdCBodHRwIGxpa2Ugc2ltcGxlIGZldGNoIGFwaSwgZXhwOnJlcXVlc3QoJy92MS91c2VyL21lJywge3dpdGhDcmVkZW50aWFsczp0cnVlfSlcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKiBAcGFyYW0ge0F1dGhDbGllbnRSZXF1ZXN0T3B0aW9uc30gb3B0aW9uc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIHJlcXVlc3Q8VD4oXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgb3B0aW9ucz86IENhcHRjaGFSZXF1ZXN0T3B0aW9ucyxcbiAgKTogUHJvbWlzZTxUPiB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIGlmICghb3B0aW9ucy5tZXRob2QpIHtcbiAgICAgIG9wdGlvbnMubWV0aG9kID0gJ0dFVCdcbiAgICB9XG4gICAgY29uc3Qgc3RhdGUgPSBvcHRpb25zLm1ldGhvZCArIFwiOlwiICsgdXJsXG4gICAgbGV0IHJlcVVSTCA9IHVybDtcbiAgICBpZiAob3B0aW9ucy53aXRoQ2FwdGNoYSkge1xuICAgICAgcmVxVVJMID0gYXdhaXQgdGhpcy5fYXBwZW5kQ2FwdGNoYVRva2VuVG9VUkwodXJsLCBzdGF0ZSwgZmFsc2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yZXF1ZXN0PFQ+KHJlcVVSTCwgb3B0aW9ucylcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIuZXJyb3IgPT09ICdjYXB0Y2hhX3JlcXVpcmVkJyB8fCBlcnIuZXJyb3IgPT09ICdjYXB0Y2hhX2ludmFsaWQnKSB7XG4gICAgICAgIHVybCA9IGF3YWl0IHRoaXMuX2FwcGVuZENhcHRjaGFUb2tlblRvVVJMKHVybCwgc3RhdGUsIGVyci5lcnJvciA9PT0gJ2NhcHRjaGFfaW52YWxpZCcpXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucmVxdWVzdDxUPih1cmwsIG9wdGlvbnMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBfZ2V0Q2FwdGNoYVRva2VuIGdldCBjYXB0Y2hhIHRva2VuXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9nZXRDYXB0Y2hhVG9rZW4oZm9yY2VOZXdUb2tlbjogYm9vbGVhbiwgc3RhdGU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgaWYgKCFmb3JjZU5ld1Rva2VuKSB7XG4gICAgICAvLyBpZiBsb2NhbCBoYXMgY2FwdGNoYSB0b2tlbiB0aGVuIHJldHVyblxuICAgICAgY29uc3QgY2FwdGNoYVRva2VuID0gYXdhaXQgdGhpcy5fZmluZENhcHRjaGFUb2tlbigpXG4gICAgICBpZiAoY2FwdGNoYVRva2VuKSB7XG4gICAgICAgIHJldHVybiBjYXB0Y2hhVG9rZW5cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcmVkaXJlY3RVUkwgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXG4gICAgY29uc3QgY2FwdGNoYVRva2VuUmVzcCA9IGF3YWl0IHRoaXMuX2NvbmZpZy5yZXF1ZXN0PEdldENhcHRjaGFSZXNwb25zZT4oR0VUX0NBUFRDSEFfVVJMLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgcmVkaXJlY3RfdXJpOiByZWRpcmVjdFVSTCxcbiAgICAgICAgc3RhdGU6IHN0YXRlXG4gICAgICB9LFxuICAgICAgd2l0aEJhc2ljQXV0aDogdHJ1ZSxcbiAgICB9KVxuICAgIGlmIChjYXB0Y2hhVG9rZW5SZXNwLmNhcHRjaGFfdG9rZW4pIHtcbiAgICAgIGNvbnN0IGNhcHRjaGFUb2tlbiA9IHtcbiAgICAgICAgY2FwdGNoYV90b2tlbjogY2FwdGNoYVRva2VuUmVzcC5jYXB0Y2hhX3Rva2VuLFxuICAgICAgICBleHBpcmVzX2luOiBjYXB0Y2hhVG9rZW5SZXNwLmV4cGlyZXNfaW4sXG4gICAgICB9XG4gICAgICBhd2FpdCB0aGlzLl9zYXZlQ2FwdGNoYVRva2VuKGNhcHRjaGFUb2tlbilcbiAgICAgIHJldHVybiBjYXB0Y2hhVG9rZW5SZXNwLmNhcHRjaGFfdG9rZW5cbiAgICB9XG4gICAgY29uc3QgY2FsbGJhY2tEYXRhID0gYXdhaXQgdGhpcy5fY29uZmlnLm9wZW5VUklXaXRoQ2FsbGJhY2soY2FwdGNoYVRva2VuUmVzcC51cmwsIHsgd2lkdGg6ICczNTVweCcsIGhlaWdodDogJzM1NXB4JyB9KVxuICAgIGNvbnN0IGNhcHRjaGFUb2tlbjogQ2FwdGNoYVRva2VuID0ge1xuICAgICAgY2FwdGNoYV90b2tlbjogY2FsbGJhY2tEYXRhLmNhcHRjaGFfdG9rZW4sXG4gICAgICBleHBpcmVzX2luOiBOdW1iZXIoY2FsbGJhY2tEYXRhLmV4cGlyZXNfaW4pXG4gICAgfVxuICAgIGF3YWl0IHRoaXMuX3NhdmVDYXB0Y2hhVG9rZW4oY2FwdGNoYVRva2VuKVxuICAgIHJldHVybiBjYXB0Y2hhVG9rZW4uY2FwdGNoYV90b2tlblxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfYXBwZW5kQ2FwdGNoYVRva2VuVG9VUkwodXJsOiBzdHJpbmcsIHN0YXRlOiBzdHJpbmcsIGZvcmNlTmV3VG9rZW46IGJvb2xlYW4pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGNhcHRjaGFUb2tlbiA9IGF3YWl0IHRoaXMuX2dldENhcHRjaGFUb2tlbihmb3JjZU5ld1Rva2VuLCBzdGF0ZSk7XG4gICAgaWYgKHVybC5pbmRleE9mKFwiP1wiKSA+IDApIHtcbiAgICAgIHVybCArPSBcIiZjYXB0Y2hhX3Rva2VuPVwiICsgY2FwdGNoYVRva2VuXG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCArPSBcIj9jYXB0Y2hhX3Rva2VuPVwiICsgY2FwdGNoYVRva2VuXG4gICAgfVxuICAgIHJldHVybiB1cmxcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3NhdmVDYXB0Y2hhVG9rZW4odG9rZW46IENhcHRjaGFUb2tlbikge1xuICAgIHRva2VuLmV4cGlyZXNfYXQgPSBuZXcgRGF0ZShcbiAgICAgIERhdGUubm93KCkgKyAodG9rZW4uZXhwaXJlc19pbiAtIDEwKSAqIDEwMDAsXG4gICAgKTtcbiAgICBjb25zdCB0b2tlblN0cjogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodG9rZW4pO1xuICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5zdG9yYWdlLnNldEl0ZW0odGhpcy5fdG9rZW5TZWN0aW9uTmFtZSwgdG9rZW5TdHIpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfZmluZENhcHRjaGFUb2tlbigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHRva2VuU3RyOiBzdHJpbmcgPSBhd2FpdCB0aGlzLl9jb25maWcuc3RvcmFnZS5nZXRJdGVtKFxuICAgICAgdGhpcy5fdG9rZW5TZWN0aW9uTmFtZSxcbiAgICApO1xuICAgIGlmICh0b2tlblN0ciAhPT0gdW5kZWZpbmVkICYmIHRva2VuU3RyICE9PSBudWxsKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBjYXB0Y2hhVG9rZW4gPSBKU09OLnBhcnNlKHRva2VuU3RyKTtcbiAgICAgICAgaWYgKGNhcHRjaGFUb2tlbj8uZXhwaXJlc19hdCkge1xuICAgICAgICAgIGNhcHRjaGFUb2tlbi5leHBpcmVzX2F0ID0gbmV3IERhdGUoY2FwdGNoYVRva2VuLmV4cGlyZXNfYXQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlzRXhwaXJlZCA9IGNhcHRjaGFUb2tlbi5leHBpcmVzX2F0IDwgbmV3IERhdGUoKTtcbiAgICAgICAgaWYgKGlzRXhwaXJlZCkge1xuICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhcHRjaGFUb2tlbi5jYXB0Y2hhX3Rva2VuXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBhd2FpdCB0aGlzLl9jb25maWcuc3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuX3Rva2VuU2VjdGlvbk5hbWUpO1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG59Il19