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
exports.Captcha = void 0;
var oauth2client_1 = require("../oauth2client/oauth2client");
var GET_CAPTCHA_URL = '/auth/v1/captcha/init';
var Captcha = (function () {
    function Captcha(opts) {
        if (!opts.openURIWithCallback) {
            opts.openURIWithCallback = this._getDefaultOpenURIWithCallback();
        }
        if (!opts.storage) {
            opts.storage = oauth2client_1.defaultStorage;
        }
        this._config = opts;
        this._tokenSectionName = 'captcha_' + opts.clientId;
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
    Captcha.prototype._getDefaultOpenURIWithCallback = function () {
        if (window.location.search.indexOf('__captcha') > 0) {
            document.body.style.display = 'none';
        }
        if (document.getElementById('captcha_panel_wrap') === null) {
            var elementDiv = document.createElement('div');
            elementDiv.style.cssText =
                'background-color: rgba(0, 0, 0, 0.7);position: fixed;left: 0px;right: 0px;top: 0px;bottom: 0px;padding: 9vw 0 0 0;display: none;z-index:100;';
            elementDiv.setAttribute('id', 'captcha_panel_wrap');
            document.body.appendChild(elementDiv);
        }
        return this._defaultOpenURIWithCallback;
    };
    Captcha.prototype._defaultOpenURIWithCallback = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var target, iframe;
            return __generator(this, function (_a) {
                target = document.getElementById('captcha_panel_wrap'), iframe = document.createElement('iframe');
                target.innerHTML = '';
                iframe.setAttribute('src', url);
                iframe.setAttribute('id', 'review-panel-iframe');
                iframe.style.cssText = 'min-width:355px;display:block;height:355px;margin:0 auto;background-color: rgb(255, 255, 255);border: none;';
                target.appendChild(iframe);
                target.style.display = 'block';
                return [2, new Promise(function (resolve, reject) {
                        iframe.onload = function () {
                            try {
                                var windowLocation = window.location;
                                var iframeLocation = iframe.contentWindow.location;
                                if (iframeLocation.host +
                                    iframeLocation.pathname ===
                                    windowLocation.host +
                                        windowLocation.pathname) {
                                    target.style.display = 'none';
                                    var iframeUrlParams = new URLSearchParams(iframeLocation.search);
                                    var captchToken = iframeUrlParams.get('captcha_token');
                                    if (captchToken) {
                                        return resolve({
                                            captcha_token: captchToken,
                                            expires_in: Number(iframeUrlParams.get('expires_in'))
                                        });
                                    }
                                    return reject({
                                        error: iframeUrlParams.get('error'),
                                        error_description: iframeUrlParams.get('error_description')
                                    });
                                }
                                else {
                                    target.style.display = 'block';
                                }
                            }
                            catch (error) {
                                target.style.display = 'block';
                            }
                        };
                    })];
            });
        });
    };
    Captcha.prototype._getCaptchaToken = function (forceNewToken, state) {
        return __awaiter(this, void 0, void 0, function () {
            var captchaToken_1, redirectURL, captchaTokenResp, captchaToken_2, captchaToken;
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
                        redirectURL = window.location.origin + window.location.pathname + "?__captcha=on";
                        return [4, this._config.request(GET_CAPTCHA_URL, {
                                method: 'POST',
                                body: {
                                    client_id: this._config.clientId,
                                    redirect_uri: redirectURL,
                                    state: state
                                },
                                withCredentials: false,
                            })];
                    case 3:
                        captchaTokenResp = _a.sent();
                        if (captchaTokenResp.captcha_token) {
                            captchaToken_2 = {
                                captcha_token: captchaTokenResp.captcha_token,
                                expires_in: captchaTokenResp.expires_in,
                            };
                            this._saveCaptchaToken(captchaToken_2);
                            return [2, captchaTokenResp.captcha_token];
                        }
                        return [4, this._config.openURIWithCallback(captchaTokenResp.url)];
                    case 4:
                        captchaToken = _a.sent();
                        this._saveCaptchaToken(captchaToken);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwdGNoYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jYXB0Y2hhL2NhcHRjaGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsNkRBQTREO0FBNEI1RCxJQUFNLGVBQWUsR0FBRyx1QkFBdUIsQ0FBQTtBQUUvQztJQVFJLGlCQUFZLElBQW9CO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDM0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFBO1NBQ25FO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLDZCQUFjLENBQUE7U0FDaEM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtRQUNuQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDdkQsQ0FBQztJQU9ZLHlCQUFPLEdBQXBCLFVBQ0ksR0FBVyxFQUNYLE9BQStCOzs7Ozs7d0JBRS9CLElBQUksQ0FBQyxPQUFPLEVBQUU7NEJBQ1YsT0FBTyxHQUFHLEVBQUUsQ0FBQzt5QkFDaEI7d0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7NEJBQ2pCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO3lCQUN6Qjt3QkFDSyxLQUFLLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFBO3dCQUNwQyxNQUFNLEdBQUcsR0FBRyxDQUFDOzZCQUNiLE9BQU8sQ0FBQyxXQUFXLEVBQW5CLGNBQW1CO3dCQUNWLFdBQU0sSUFBSSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUE7O3dCQUEvRCxNQUFNLEdBQUcsU0FBc0QsQ0FBQzs7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dGlvbn0gZnJvbSAnLi4vb2F1dGgyY2xpZW50L2ludGVyZmFjZSc7XG5pbXBvcnQge0F1dGhDbGllbnRSZXF1ZXN0T3B0aW9uc30gZnJvbSBcIi4uL29hdXRoMmNsaWVudC9tb2RlbHNcIjtcbmltcG9ydCB7ZGVmYXVsdFN0b3JhZ2V9IGZyb20gXCIuLi9vYXV0aDJjbGllbnQvb2F1dGgyY2xpZW50XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FwdGNoYU9wdGlvbnMge1xuICAgIGNsaWVudElkOiBzdHJpbmdcbiAgICByZXF1ZXN0OiBSZXF1ZXN0RnVuY3Rpb247XG4gICAgc3RvcmFnZTogU2ltcGxlU3RvcmFnZTtcbiAgICAvLyDmiZPlvIDnvZHpobXlubbpgJrov4dVUkzlm57osIPojrflj5YgQ2FwdGNoYVRva2Vu77yM6ZKI5a+55LiN6YCa55qE5bmz5Y+w77yM6K+l5Ye95pWw5Y+v5Lul6Ieq5a6a5LmJ5a6e546wLCDpu5jorqTpm4bmiJDmtY/op4jlmajnq6/orqTor4FcbiAgICBvcGVuVVJJV2l0aENhbGxiYWNrPzogT3BlblVSSVdpdGhDYWxsYmFja0Z1Y3Rpb247XG59XG5cbnR5cGUgT3BlblVSSVdpdGhDYWxsYmFja0Z1Y3Rpb24gPSAodXJsOiBzdHJpbmcpID0+IFByb21pc2U8Q2FwdGNoYVRva2VuPjtcblxuZXhwb3J0IGludGVyZmFjZSBDYXB0Y2hhVG9rZW4ge1xuICAgIGNhcHRjaGFfdG9rZW46IHN0cmluZ1xuICAgIGV4cGlyZXNfaW46IG51bWJlclxuICAgIGV4cGlyZXNfYXQ/OiBEYXRlIHwgbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYXB0Y2hhUmVxdWVzdE9wdGlvbnMgZXh0ZW5kcyBBdXRoQ2xpZW50UmVxdWVzdE9wdGlvbnMge1xuICAgIHdpdGhDYXB0Y2hhPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZXRDYXB0Y2hhUmVzcG9uc2Uge1xuICAgIGNhcHRjaGFfdG9rZW4/OiBzdHJpbmdcbiAgICBleHBpcmVzX2luPzogbnVtYmVyXG4gICAgdXJsPzogc3RyaW5nXG59XG5cbmNvbnN0IEdFVF9DQVBUQ0hBX1VSTCA9ICcvYXV0aC92MS9jYXB0Y2hhL2luaXQnXG5cbmV4cG9ydCBjbGFzcyBDYXB0Y2hhIHtcbiAgICBwcml2YXRlIF9jb25maWc6IENhcHRjaGFPcHRpb25zO1xuICAgIHByaXZhdGUgX3Rva2VuU2VjdGlvbk5hbWU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtDYXB0Y2hhT3B0aW9uc30gb3B0c1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHM6IENhcHRjaGFPcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0cy5vcGVuVVJJV2l0aENhbGxiYWNrKSB7XG4gICAgICAgICAgICBvcHRzLm9wZW5VUklXaXRoQ2FsbGJhY2sgPSB0aGlzLl9nZXREZWZhdWx0T3BlblVSSVdpdGhDYWxsYmFjaygpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvcHRzLnN0b3JhZ2UpIHtcbiAgICAgICAgICAgIG9wdHMuc3RvcmFnZSA9IGRlZmF1bHRTdG9yYWdlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29uZmlnID0gb3B0c1xuICAgICAgICB0aGlzLl90b2tlblNlY3Rpb25OYW1lID0gJ2NhcHRjaGFfJyArIG9wdHMuY2xpZW50SWRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXF1ZXN0IGh0dHAgbGlrZSBzaW1wbGUgZmV0Y2ggYXBpLCBleHA6cmVxdWVzdCgnL3YxL3VzZXIvbWUnLCB7d2l0aENyZWRlbnRpYWxzOnRydWV9KVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge0F1dGhDbGllbnRSZXF1ZXN0T3B0aW9uc30gb3B0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyByZXF1ZXN0PFQ+KFxuICAgICAgICB1cmw6IHN0cmluZyxcbiAgICAgICAgb3B0aW9ucz86IENhcHRjaGFSZXF1ZXN0T3B0aW9ucyxcbiAgICApOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvcHRpb25zLm1ldGhvZCkge1xuICAgICAgICAgICAgb3B0aW9ucy5tZXRob2QgPSAnR0VUJ1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXRlID0gb3B0aW9ucy5tZXRob2QgKyBcIjpcIiArIHVybFxuICAgICAgICBsZXQgcmVxVVJMID0gdXJsO1xuICAgICAgICBpZiAob3B0aW9ucy53aXRoQ2FwdGNoYSkge1xuICAgICAgICAgICAgcmVxVVJMID0gYXdhaXQgdGhpcy5fYXBwZW5kQ2FwdGNoYVRva2VuVG9VUkwodXJsLCBzdGF0ZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VD4ocmVxVVJMLCBvcHRpb25zKVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIuZXJyb3IgPT09ICdjYXB0Y2hhX3JlcXVpcmVkJyB8fCBlcnIuZXJyb3IgPT09ICdjYXB0Y2hhX2ludmFsaWQnKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gYXdhaXQgdGhpcy5fYXBwZW5kQ2FwdGNoYVRva2VuVG9VUkwodXJsLCBzdGF0ZSwgZXJyLmVycm9yID09PSAnY2FwdGNoYV9pbnZhbGlkJylcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VD4odXJsLCBvcHRpb25zKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0RGVmYXVsdE9wZW5VUklXaXRoQ2FsbGJhY2soKTogT3BlblVSSVdpdGhDYWxsYmFja0Z1Y3Rpb24ge1xuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKCdfX2NhcHRjaGEnKSA+IDApIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcHRjaGFfcGFuZWxfd3JhcCcpID09PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZWxlbWVudERpdi5zdHlsZS5jc3NUZXh0ID1cbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjcpO3Bvc2l0aW9uOiBmaXhlZDtsZWZ0OiAwcHg7cmlnaHQ6IDBweDt0b3A6IDBweDtib3R0b206IDBweDtwYWRkaW5nOiA5dncgMCAwIDA7ZGlzcGxheTogbm9uZTt6LWluZGV4OjEwMDsnO1xuICAgICAgICAgICAgZWxlbWVudERpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NhcHRjaGFfcGFuZWxfd3JhcCcpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50RGl2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdE9wZW5VUklXaXRoQ2FsbGJhY2tcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpu5jorqTpgJrov4fmtY/op4jlmajmiZPlvIDnvZHpobXlubbojrflj5blm57osINcbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIF9kZWZhdWx0T3BlblVSSVdpdGhDYWxsYmFjayh1cmw6IHN0cmluZyk6IFByb21pc2U8Q2FwdGNoYVRva2VuPiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXB0Y2hhX3BhbmVsX3dyYXAnKSxcbiAgICAgICAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpXG4gICAgICAgIHRhcmdldC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgdXJsKVxuICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdpZCcsICdyZXZpZXctcGFuZWwtaWZyYW1lJylcbiAgICAgICAgaWZyYW1lLnN0eWxlLmNzc1RleHQgPSAnbWluLXdpZHRoOjM1NXB4O2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjM1NXB4O21hcmdpbjowIGF1dG87YmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO2JvcmRlcjogbm9uZTsnO1xuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Q2FwdGNoYVRva2VuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZnJhbWUub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3aW5kb3dMb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlmcmFtZUxvY2F0aW9uID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cubG9jYXRpb247XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmcmFtZUxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgICAgICAgICAgaWZyYW1lTG9jYXRpb24ucGF0aG5hbWUgPT09XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dMb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd0xvY2F0aW9uLnBhdGhuYW1lXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZnJhbWVVcmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGlmcmFtZUxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXB0Y2hUb2tlbiA9IGlmcmFtZVVybFBhcmFtcy5nZXQoJ2NhcHRjaGFfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYXB0Y2hUb2tlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGNoYV90b2tlbjogY2FwdGNoVG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGlyZXNfaW46IE51bWJlcihpZnJhbWVVcmxQYXJhbXMuZ2V0KCdleHBpcmVzX2luJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBpZnJhbWVVcmxQYXJhbXMuZ2V0KCdlcnJvcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yX2Rlc2NyaXB0aW9uOiBpZnJhbWVVcmxQYXJhbXMuZ2V0KCdlcnJvcl9kZXNjcmlwdGlvbicpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8qKlxuICAgICAqIF9nZXRDYXB0Y2hhVG9rZW4g6I635Y+WY2FwdGNoYVRva2VuXG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBfZ2V0Q2FwdGNoYVRva2VuKGZvcmNlTmV3VG9rZW46IGJvb2xlYW4sIHN0YXRlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBpZiAoIWZvcmNlTmV3VG9rZW4pIHtcbiAgICAgICAgICAgIC8vIOWmguaenOacrOWcsOWtmOWcqO+8jOWImeebtOaOpei/lOWbnlxuICAgICAgICAgICAgY29uc3QgY2FwdGNoYVRva2VuID0gYXdhaXQgdGhpcy5fZmluZENhcHRjaGFUb2tlbigpXG4gICAgICAgICAgICBpZiAoY2FwdGNoYVRva2VuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhcHRjaGFUb2tlblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlZGlyZWN0VVJMID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIFwiP19fY2FwdGNoYT1vblwiXG4gICAgICAgIGNvbnN0IGNhcHRjaGFUb2tlblJlc3AgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxHZXRDYXB0Y2hhUmVzcG9uc2U+KEdFVF9DQVBUQ0hBX1VSTCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgY2xpZW50X2lkOiB0aGlzLl9jb25maWcuY2xpZW50SWQsXG4gICAgICAgICAgICAgICAgcmVkaXJlY3RfdXJpOiByZWRpcmVjdFVSTCxcbiAgICAgICAgICAgICAgICBzdGF0ZTogc3RhdGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgICBpZiAoY2FwdGNoYVRva2VuUmVzcC5jYXB0Y2hhX3Rva2VuKSB7XG4gICAgICAgICAgICBjb25zdCBjYXB0Y2hhVG9rZW4gPSB7XG4gICAgICAgICAgICAgICAgY2FwdGNoYV90b2tlbjogY2FwdGNoYVRva2VuUmVzcC5jYXB0Y2hhX3Rva2VuLFxuICAgICAgICAgICAgICAgIGV4cGlyZXNfaW46IGNhcHRjaGFUb2tlblJlc3AuZXhwaXJlc19pbixcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3NhdmVDYXB0Y2hhVG9rZW4oY2FwdGNoYVRva2VuKVxuICAgICAgICAgICAgcmV0dXJuIGNhcHRjaGFUb2tlblJlc3AuY2FwdGNoYV90b2tlblxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNhcHRjaGFUb2tlbiA9IGF3YWl0IHRoaXMuX2NvbmZpZy5vcGVuVVJJV2l0aENhbGxiYWNrKGNhcHRjaGFUb2tlblJlc3AudXJsKVxuICAgICAgICB0aGlzLl9zYXZlQ2FwdGNoYVRva2VuKGNhcHRjaGFUb2tlbilcbiAgICAgICAgcmV0dXJuIGNhcHRjaGFUb2tlbi5jYXB0Y2hhX3Rva2VuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfYXBwZW5kQ2FwdGNoYVRva2VuVG9VUkwodXJsOiBzdHJpbmcsIHN0YXRlOiBzdHJpbmcsIGZvcmNlTmV3VG9rZW46IGJvb2xlYW4pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBjYXB0Y2hhVG9rZW4gPSBhd2FpdCB0aGlzLl9nZXRDYXB0Y2hhVG9rZW4oZm9yY2VOZXdUb2tlbiwgc3RhdGUpO1xuICAgICAgICBpZiAodXJsLmluZGV4T2YoXCI/XCIpID4gMCkge1xuICAgICAgICAgICAgdXJsICs9IFwiJmNhcHRjaGFfdG9rZW49XCIgKyBjYXB0Y2hhVG9rZW5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVybCArPSBcIj9jYXB0Y2hhX3Rva2VuPVwiICsgY2FwdGNoYVRva2VuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybFxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgX3NhdmVDYXB0Y2hhVG9rZW4odG9rZW46IENhcHRjaGFUb2tlbikge1xuICAgICAgICB0b2tlbi5leHBpcmVzX2F0ID0gbmV3IERhdGUoXG4gICAgICAgICAgICBEYXRlLm5vdygpICsgKHRva2VuLmV4cGlyZXNfaW4gLSAxMCkgKiAxMDAwLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB0b2tlblN0cjogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodG9rZW4pO1xuICAgICAgICBhd2FpdCB0aGlzLl9jb25maWcuc3RvcmFnZS5zZXRJdGVtKHRoaXMuX3Rva2VuU2VjdGlvbk5hbWUsIHRva2VuU3RyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIF9maW5kQ2FwdGNoYVRva2VuKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IHRva2VuU3RyOiBzdHJpbmcgPSBhd2FpdCB0aGlzLl9jb25maWcuc3RvcmFnZS5nZXRJdGVtKFxuICAgICAgICAgICAgdGhpcy5fdG9rZW5TZWN0aW9uTmFtZSxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHRva2VuU3RyICE9PSB1bmRlZmluZWQgJiYgdG9rZW5TdHIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FwdGNoYVRva2VuID0gSlNPTi5wYXJzZSh0b2tlblN0cik7XG4gICAgICAgICAgICAgICAgaWYgKGNhcHRjaGFUb2tlbiAmJiBjYXB0Y2hhVG9rZW4uZXhwaXJlc19hdCkge1xuICAgICAgICAgICAgICAgICAgICBjYXB0Y2hhVG9rZW4uZXhwaXJlc19hdCA9IG5ldyBEYXRlKGNhcHRjaGFUb2tlbi5leHBpcmVzX2F0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgaXNFeHBpcmVkID0gY2FwdGNoYVRva2VuLmV4cGlyZXNfYXQgPCBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChpc0V4cGlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhcHRjaGFUb2tlbi5jYXB0Y2hhX3Rva2VuXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5zdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5fdG9rZW5TZWN0aW9uTmFtZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbn0iXX0=