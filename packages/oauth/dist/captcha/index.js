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
        if (opts && opts.request) {
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
                        if (captchaToken && captchaToken.expires_at) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2FwdGNoYS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw0Q0FBOEM7QUFZOUMsU0FBZ0IsVUFBVSxDQUFDLEdBQVEsRUFBRSxJQUF5QjtJQUMxRCxPQUFPLHdCQUFhLENBQVUsR0FBRyxFQUFFLFNBQVMsRUFBRTtRQUMxQyxJQUFNLFFBQVEsR0FBRztZQUNiLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU87WUFDNUIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTztZQUM1QixtQkFBbUIsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLG1CQUFtQjtTQUN2RCxDQUFBO1FBQ0QsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUN0QixRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUE7U0FDbEM7UUFDRCxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVpELGdDQVlDO0FBa0JELElBQU0sZUFBZSxHQUFHLHVCQUF1QixDQUFBO0FBRS9DO0lBUUksaUJBQVksSUFBb0I7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUE7UUFDbkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFVBQVUsQ0FBQTtJQUN2QyxDQUFDO0lBT1kseUJBQU8sR0FBcEIsVUFDSSxHQUFXLEVBQ1gsT0FBK0I7Ozs7Ozt3QkFFL0IsSUFBSSxDQUFDLE9BQU8sRUFBRTs0QkFDVixPQUFPLEdBQUcsRUFBRSxDQUFDO3lCQUNoQjt3QkFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTs0QkFDakIsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7eUJBQ3pCO3dC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QyxVQUFVLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDdkQsSUFBSSxTQUFTLEVBQUU7NEJBQ1gsV0FBTyxJQUFJLEVBQUE7eUJBQ2Q7d0JBQ0QsV0FBTyxZQUFZLENBQUMsYUFBYSxFQUFBOzs7d0JBRWpDLFdBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFBOzt3QkFBN0QsU0FBNkQsQ0FBQzt3QkFDOUQsV0FBTyxJQUFJLEVBQUE7NEJBR25CLFdBQU8sSUFBSSxFQUFBOzs7O0tBQ2Q7SUFDTCxjQUFDO0FBQUQsQ0FBQyxBQTFIRCxJQTBIQztBQTFIWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBwLCBSZXF1ZXN0T3B0aW9ucywgUmVxdWVzdEZuLCBTdG9yYWdlLCBPcGVuVVJJV2l0aENhbGxiYWNrfSBmcm9tIFwiLi4vYXBwXCI7XG5pbXBvcnQge19nZXRDb21wb25lbnR9IGZyb20gXCIuLi9hcHAvaW50ZXJuYWxcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDYXB0Y2hhT3B0aW9ucyB7XG4gICAgcmVxdWVzdDogUmVxdWVzdEZuO1xuICAgIHN0b3JhZ2U6IFN0b3JhZ2U7XG4gICAgb3BlblVSSVdpdGhDYWxsYmFjazogT3BlblVSSVdpdGhDYWxsYmFjaztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYXB0Y2hhSW5pdE9wdGlvbnMge1xuICAgIHJlcXVlc3Q/OiBSZXF1ZXN0Rm47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDYXB0Y2hhKGFwcDogQXBwLCBvcHRzPzogQ2FwdGNoYUluaXRPcHRpb25zKTogQ2FwdGNoYSB7XG4gICAgcmV0dXJuIF9nZXRDb21wb25lbnQ8Q2FwdGNoYT4oYXBwLCBcImNhcHRjaGFcIiwgKCk6IENhcHRjaGEgPT4ge1xuICAgICAgICBjb25zdCBpbml0T3B0cyA9IHtcbiAgICAgICAgICAgIHJlcXVlc3Q6IGFwcC5vcHRpb25zLnJlcXVlc3QsXG4gICAgICAgICAgICBzdG9yYWdlOiBhcHAub3B0aW9ucy5zdG9yYWdlLFxuICAgICAgICAgICAgb3BlblVSSVdpdGhDYWxsYmFjazogYXBwLm9wdGlvbnMub3BlblVSSVdpdGhDYWxsYmFjayxcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cyAmJiBvcHRzLnJlcXVlc3QpIHtcbiAgICAgICAgICAgIGluaXRPcHRzLnJlcXVlc3QgPSBvcHRzLnJlcXVlc3RcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IENhcHRjaGEoaW5pdE9wdHMpXG4gICAgfSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FwdGNoYVRva2VuIHtcbiAgICBjYXB0Y2hhX3Rva2VuOiBzdHJpbmdcbiAgICBleHBpcmVzX2luOiBudW1iZXJcbiAgICBleHBpcmVzX2F0PzogRGF0ZSB8IG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FwdGNoYVJlcXVlc3RPcHRpb25zIGV4dGVuZHMgUmVxdWVzdE9wdGlvbnMge1xuICAgIHdpdGhDYXB0Y2hhPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZXRDYXB0Y2hhUmVzcG9uc2Uge1xuICAgIGNhcHRjaGFfdG9rZW4/OiBzdHJpbmdcbiAgICBleHBpcmVzX2luPzogbnVtYmVyXG4gICAgdXJsPzogc3RyaW5nXG59XG5cbmNvbnN0IEdFVF9DQVBUQ0hBX1VSTCA9ICcvYXV0aC92MS9jYXB0Y2hhL2luaXQnXG5cbmV4cG9ydCBjbGFzcyBDYXB0Y2hhIHtcbiAgICBwcml2YXRlIF9jb25maWc6IENhcHRjaGFPcHRpb25zO1xuICAgIHByaXZhdGUgX3Rva2VuU2VjdGlvbk5hbWU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtDYXB0Y2hhT3B0aW9uc30gb3B0c1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHM6IENhcHRjaGFPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IG9wdHNcbiAgICAgICAgdGhpcy5fdG9rZW5TZWN0aW9uTmFtZSA9ICdjYXB0Y2hhXydcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXF1ZXN0IGh0dHAgbGlrZSBzaW1wbGUgZmV0Y2ggYXBpLCBleHA6cmVxdWVzdCgnL3YxL3VzZXIvbWUnLCB7d2l0aENyZWRlbnRpYWxzOnRydWV9KVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge0F1dGhDbGllbnRSZXF1ZXN0T3B0aW9uc30gb3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyByZXF1ZXN0PFQ+KFxuICAgICAgICB1cmw6IHN0cmluZyxcbiAgICAgICAgb3B0aW9ucz86IENhcHRjaGFSZXF1ZXN0T3B0aW9ucyxcbiAgICApOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvcHRpb25zLm1ldGhvZCkge1xuICAgICAgICAgICAgb3B0aW9ucy5tZXRob2QgPSAnR0VUJ1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXRlID0gb3B0aW9ucy5tZXRob2QgKyBcIjpcIiArIHVybFxuICAgICAgICBsZXQgcmVxVVJMID0gdXJsO1xuICAgICAgICBpZiAob3B0aW9ucy53aXRoQ2FwdGNoYSkge1xuICAgICAgICAgICAgcmVxVVJMID0gYXdhaXQgdGhpcy5fYXBwZW5kQ2FwdGNoYVRva2VuVG9VUkwodXJsLCBzdGF0ZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VD4ocmVxVVJMLCBvcHRpb25zKVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIuZXJyb3IgPT09ICdjYXB0Y2hhX3JlcXVpcmVkJyB8fCBlcnIuZXJyb3IgPT09ICdjYXB0Y2hhX2ludmFsaWQnKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gYXdhaXQgdGhpcy5fYXBwZW5kQ2FwdGNoYVRva2VuVG9VUkwodXJsLCBzdGF0ZSwgZXJyLmVycm9yID09PSAnY2FwdGNoYV9pbnZhbGlkJylcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VD4odXJsLCBvcHRpb25zKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogX2dldENhcHRjaGFUb2tlbiBnZXQgY2FwdGNoYSB0b2tlblxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgX2dldENhcHRjaGFUb2tlbihmb3JjZU5ld1Rva2VuOiBib29sZWFuLCBzdGF0ZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgaWYgKCFmb3JjZU5ld1Rva2VuKSB7XG4gICAgICAgICAgICAvLyBpZiBsb2NhbCBoYXMgY2FwdGNoYSB0b2tlbiB0aGVuIHJldHVyblxuICAgICAgICAgICAgY29uc3QgY2FwdGNoYVRva2VuID0gYXdhaXQgdGhpcy5fZmluZENhcHRjaGFUb2tlbigpXG4gICAgICAgICAgICBpZiAoY2FwdGNoYVRva2VuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhcHRjaGFUb2tlblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlZGlyZWN0VVJMID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZVxuICAgICAgICBjb25zdCBjYXB0Y2hhVG9rZW5SZXNwID0gYXdhaXQgdGhpcy5fY29uZmlnLnJlcXVlc3Q8R2V0Q2FwdGNoYVJlc3BvbnNlPihHRVRfQ0FQVENIQV9VUkwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJlZGlyZWN0X3VyaTogcmVkaXJlY3RVUkwsXG4gICAgICAgICAgICAgICAgc3RhdGU6IHN0YXRlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2l0aEJhc2ljQXV0aDogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKGNhcHRjaGFUb2tlblJlc3AuY2FwdGNoYV90b2tlbikge1xuICAgICAgICAgICAgY29uc3QgY2FwdGNoYVRva2VuID0ge1xuICAgICAgICAgICAgICAgIGNhcHRjaGFfdG9rZW46IGNhcHRjaGFUb2tlblJlc3AuY2FwdGNoYV90b2tlbixcbiAgICAgICAgICAgICAgICBleHBpcmVzX2luOiBjYXB0Y2hhVG9rZW5SZXNwLmV4cGlyZXNfaW4sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9zYXZlQ2FwdGNoYVRva2VuKGNhcHRjaGFUb2tlbilcbiAgICAgICAgICAgIHJldHVybiBjYXB0Y2hhVG9rZW5SZXNwLmNhcHRjaGFfdG9rZW5cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjYWxsYmFja0RhdGEgPSBhd2FpdCB0aGlzLl9jb25maWcub3BlblVSSVdpdGhDYWxsYmFjayhjYXB0Y2hhVG9rZW5SZXNwLnVybCwge3dpZHRoOiczNTVweCcsIGhlaWdodDogJzM1NXB4J30pXG4gICAgICAgIGNvbnN0IGNhcHRjaGFUb2tlbjogQ2FwdGNoYVRva2VuID0ge1xuICAgICAgICAgICAgY2FwdGNoYV90b2tlbjogY2FsbGJhY2tEYXRhLmNhcHRjaGFfdG9rZW4sXG4gICAgICAgICAgICBleHBpcmVzX2luOiBOdW1iZXIoY2FsbGJhY2tEYXRhLmV4cGlyZXNfaW4pXG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5fc2F2ZUNhcHRjaGFUb2tlbihjYXB0Y2hhVG9rZW4pXG4gICAgICAgIHJldHVybiBjYXB0Y2hhVG9rZW4uY2FwdGNoYV90b2tlblxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgX2FwcGVuZENhcHRjaGFUb2tlblRvVVJMKHVybDogc3RyaW5nLCBzdGF0ZTogc3RyaW5nLCBmb3JjZU5ld1Rva2VuOiBib29sZWFuKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgY2FwdGNoYVRva2VuID0gYXdhaXQgdGhpcy5fZ2V0Q2FwdGNoYVRva2VuKGZvcmNlTmV3VG9rZW4sIHN0YXRlKTtcbiAgICAgICAgaWYgKHVybC5pbmRleE9mKFwiP1wiKSA+IDApIHtcbiAgICAgICAgICAgIHVybCArPSBcIiZjYXB0Y2hhX3Rva2VuPVwiICsgY2FwdGNoYVRva2VuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1cmwgKz0gXCI/Y2FwdGNoYV90b2tlbj1cIiArIGNhcHRjaGFUb2tlblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmxcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIF9zYXZlQ2FwdGNoYVRva2VuKHRva2VuOiBDYXB0Y2hhVG9rZW4pIHtcbiAgICAgICAgdG9rZW4uZXhwaXJlc19hdCA9IG5ldyBEYXRlKFxuICAgICAgICAgICAgRGF0ZS5ub3coKSArICh0b2tlbi5leHBpcmVzX2luIC0gMTApICogMTAwMCxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgdG9rZW5TdHI6IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHRva2VuKTtcbiAgICAgICAgYXdhaXQgdGhpcy5fY29uZmlnLnN0b3JhZ2Uuc2V0SXRlbSh0aGlzLl90b2tlblNlY3Rpb25OYW1lLCB0b2tlblN0cik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfZmluZENhcHRjaGFUb2tlbigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCB0b2tlblN0cjogc3RyaW5nID0gYXdhaXQgdGhpcy5fY29uZmlnLnN0b3JhZ2UuZ2V0SXRlbShcbiAgICAgICAgICAgIHRoaXMuX3Rva2VuU2VjdGlvbk5hbWUsXG4gICAgICAgICk7XG4gICAgICAgIGlmICh0b2tlblN0ciAhPT0gdW5kZWZpbmVkICYmIHRva2VuU3RyICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcHRjaGFUb2tlbiA9IEpTT04ucGFyc2UodG9rZW5TdHIpO1xuICAgICAgICAgICAgICAgIGlmIChjYXB0Y2hhVG9rZW4gJiYgY2FwdGNoYVRva2VuLmV4cGlyZXNfYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FwdGNoYVRva2VuLmV4cGlyZXNfYXQgPSBuZXcgRGF0ZShjYXB0Y2hhVG9rZW4uZXhwaXJlc19hdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGlzRXhwaXJlZCA9IGNhcHRjaGFUb2tlbi5leHBpcmVzX2F0IDwgbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNFeHBpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjYXB0Y2hhVG9rZW4uY2FwdGNoYV90b2tlblxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9jb25maWcuc3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuX3Rva2VuU2VjdGlvbk5hbWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG59Il19