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
            var state, reqURL, resp, err_1;
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
                        _a.trys.push([2, 4, , 8]);
                        return [4, this._config.request(reqURL, options)];
                    case 3:
                        resp = _a.sent();
                        return [3, 8];
                    case 4:
                        err_1 = _a.sent();
                        if (!(err_1.error === 'captcha_required' || err_1.error === 'captcha_invalid')) return [3, 6];
                        return [4, this._appendCaptchaTokenToURL(url, state, err_1.error === 'captcha_invalid')];
                    case 5:
                        url = _a.sent();
                        return [2, this._config.request(url, options)];
                    case 6: return [2, Promise.reject(err_1)];
                    case 7: return [3, 8];
                    case 8: return [2, resp];
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
            setTimeout(function () {
                document.body.appendChild(elementDiv);
            }, 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwdGNoYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jYXB0Y2hhL2NhcHRjaGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsNkRBQThEO0FBNEI5RCxJQUFNLGVBQWUsR0FBRyx1QkFBdUIsQ0FBQTtBQUUvQztJQVFFLGlCQUFZLElBQW9CO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDN0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFBO1NBQ2pFO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyw2QkFBYyxDQUFBO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUE7UUFDbkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO0lBQ3JELENBQUM7SUFPWSx5QkFBTyxHQUFwQixVQUNFLEdBQVcsRUFDWCxPQUErQjs7Ozs7O3dCQUUvQixJQUFJLENBQUMsT0FBTyxFQUFFOzRCQUNaLE9BQU8sR0FBRyxFQUFFLENBQUM7eUJBQ2Q7d0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7NEJBQ25CLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO3lCQUN2Qjt3QkFDSyxLQUFLLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFBO3dCQUNwQyxNQUFNLEdBQUcsR0FBRyxDQUFDOzZCQUNiLE9BQU8sQ0FBQyxXQUFXLEVBQW5CLGNBQW1CO3dCQUNaLFdBQU0sSUFBSSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUE7O3dCQUEvRCxNQUFNLEdBQUcsU0FBc0QsQ0FBQzs7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Ozs7O0tBQ1o7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQTdMRCxJQTZMQztBQTdMWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNpbXBsZVN0b3JhZ2UsIFJlcXVlc3RGdW5jdGlvbiB9IGZyb20gJy4uL29hdXRoMmNsaWVudC9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXV0aENsaWVudFJlcXVlc3RPcHRpb25zIH0gZnJvbSBcIi4uL29hdXRoMmNsaWVudC9tb2RlbHNcIjtcbmltcG9ydCB7IGRlZmF1bHRTdG9yYWdlIH0gZnJvbSBcIi4uL29hdXRoMmNsaWVudC9vYXV0aDJjbGllbnRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDYXB0Y2hhT3B0aW9ucyB7XG4gIGNsaWVudElkOiBzdHJpbmdcbiAgcmVxdWVzdDogUmVxdWVzdEZ1bmN0aW9uO1xuICBzdG9yYWdlOiBTaW1wbGVTdG9yYWdlO1xuICAvLyDmiZPlvIDnvZHpobXlubbpgJrov4dVUkzlm57osIPojrflj5YgQ2FwdGNoYVRva2Vu77yM6ZKI5a+55LiN6YCa55qE5bmz5Y+w77yM6K+l5Ye95pWw5Y+v5Lul6Ieq5a6a5LmJ5a6e546wLCDpu5jorqTpm4bmiJDmtY/op4jlmajnq6/orqTor4FcbiAgb3BlblVSSVdpdGhDYWxsYmFjaz86IE9wZW5VUklXaXRoQ2FsbGJhY2tGdWN0aW9uO1xufVxuXG50eXBlIE9wZW5VUklXaXRoQ2FsbGJhY2tGdWN0aW9uID0gKHVybDogc3RyaW5nKSA9PiBQcm9taXNlPENhcHRjaGFUb2tlbj47XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FwdGNoYVRva2VuIHtcbiAgY2FwdGNoYV90b2tlbjogc3RyaW5nXG4gIGV4cGlyZXNfaW46IG51bWJlclxuICBleHBpcmVzX2F0PzogRGF0ZSB8IG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FwdGNoYVJlcXVlc3RPcHRpb25zIGV4dGVuZHMgQXV0aENsaWVudFJlcXVlc3RPcHRpb25zIHtcbiAgd2l0aENhcHRjaGE/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdldENhcHRjaGFSZXNwb25zZSB7XG4gIGNhcHRjaGFfdG9rZW4/OiBzdHJpbmdcbiAgZXhwaXJlc19pbj86IG51bWJlclxuICB1cmw/OiBzdHJpbmdcbn1cblxuY29uc3QgR0VUX0NBUFRDSEFfVVJMID0gJy9hdXRoL3YxL2NhcHRjaGEvaW5pdCdcblxuZXhwb3J0IGNsYXNzIENhcHRjaGEge1xuICBwcml2YXRlIF9jb25maWc6IENhcHRjaGFPcHRpb25zO1xuICBwcml2YXRlIF90b2tlblNlY3Rpb25OYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7Q2FwdGNoYU9wdGlvbnN9IG9wdHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdHM6IENhcHRjaGFPcHRpb25zKSB7XG4gICAgaWYgKCFvcHRzLm9wZW5VUklXaXRoQ2FsbGJhY2spIHtcbiAgICAgIG9wdHMub3BlblVSSVdpdGhDYWxsYmFjayA9IHRoaXMuX2dldERlZmF1bHRPcGVuVVJJV2l0aENhbGxiYWNrKClcbiAgICB9XG4gICAgaWYgKCFvcHRzLnN0b3JhZ2UpIHtcbiAgICAgIG9wdHMuc3RvcmFnZSA9IGRlZmF1bHRTdG9yYWdlXG4gICAgfVxuICAgIHRoaXMuX2NvbmZpZyA9IG9wdHNcbiAgICB0aGlzLl90b2tlblNlY3Rpb25OYW1lID0gJ2NhcHRjaGFfJyArIG9wdHMuY2xpZW50SWRcbiAgfVxuXG4gIC8qKlxuICAgKiByZXF1ZXN0IGh0dHAgbGlrZSBzaW1wbGUgZmV0Y2ggYXBpLCBleHA6cmVxdWVzdCgnL3YxL3VzZXIvbWUnLCB7d2l0aENyZWRlbnRpYWxzOnRydWV9KVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqIEBwYXJhbSB7QXV0aENsaWVudFJlcXVlc3RPcHRpb25zfSBvcHRpb25zXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcmVxdWVzdDxUPihcbiAgICB1cmw6IHN0cmluZyxcbiAgICBvcHRpb25zPzogQ2FwdGNoYVJlcXVlc3RPcHRpb25zLFxuICApOiBQcm9taXNlPFQ+IHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zLm1ldGhvZCkge1xuICAgICAgb3B0aW9ucy5tZXRob2QgPSAnR0VUJ1xuICAgIH1cbiAgICBjb25zdCBzdGF0ZSA9IG9wdGlvbnMubWV0aG9kICsgXCI6XCIgKyB1cmxcbiAgICBsZXQgcmVxVVJMID0gdXJsO1xuICAgIGlmIChvcHRpb25zLndpdGhDYXB0Y2hhKSB7XG4gICAgICByZXFVUkwgPSBhd2FpdCB0aGlzLl9hcHBlbmRDYXB0Y2hhVG9rZW5Ub1VSTCh1cmwsIHN0YXRlLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgbGV0IHJlc3A6IFQ7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3AgPSBhd2FpdCB0aGlzLl9jb25maWcucmVxdWVzdDxUPihyZXFVUkwsIG9wdGlvbnMpXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoZXJyLmVycm9yID09PSAnY2FwdGNoYV9yZXF1aXJlZCcgfHwgZXJyLmVycm9yID09PSAnY2FwdGNoYV9pbnZhbGlkJykge1xuICAgICAgICB1cmwgPSBhd2FpdCB0aGlzLl9hcHBlbmRDYXB0Y2hhVG9rZW5Ub1VSTCh1cmwsIHN0YXRlLCBlcnIuZXJyb3IgPT09ICdjYXB0Y2hhX2ludmFsaWQnKVxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJlcXVlc3Q8VD4odXJsLCBvcHRpb25zKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycilcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3BcbiAgfVxuXG4gIHByaXZhdGUgX2dldERlZmF1bHRPcGVuVVJJV2l0aENhbGxiYWNrKCk6IE9wZW5VUklXaXRoQ2FsbGJhY2tGdWN0aW9uIHtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKCdfX2NhcHRjaGEnKSA+IDApIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXB0Y2hhX3BhbmVsX3dyYXAnKSA9PT0gbnVsbCkge1xuICAgICAgdmFyIGVsZW1lbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGVsZW1lbnREaXYuc3R5bGUuY3NzVGV4dCA9XG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNyk7cG9zaXRpb246IGZpeGVkO2xlZnQ6IDBweDtyaWdodDogMHB4O3RvcDogMHB4O2JvdHRvbTogMHB4O3BhZGRpbmc6IDl2dyAwIDAgMDtkaXNwbGF5OiBub25lO3otaW5kZXg6MTAwOyc7XG4gICAgICBlbGVtZW50RGl2LnNldEF0dHJpYnV0ZSgnaWQnLCAnY2FwdGNoYV9wYW5lbF93cmFwJyk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50RGl2KTtcbiAgICAgIH0sIDApXG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9kZWZhdWx0T3BlblVSSVdpdGhDYWxsYmFja1xuICB9XG5cbiAgLyoqXG4gICAqIOm7mOiupOmAmui/h+a1j+iniOWZqOaJk+W8gOe9kemhteW5tuiOt+WPluWbnuiwg1xuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfZGVmYXVsdE9wZW5VUklXaXRoQ2FsbGJhY2sodXJsOiBzdHJpbmcpOiBQcm9taXNlPENhcHRjaGFUb2tlbj4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXB0Y2hhX3BhbmVsX3dyYXAnKSxcbiAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpXG4gICAgdGFyZ2V0LmlubmVySFRNTCA9ICcnO1xuICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHVybClcbiAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdpZCcsICdyZXZpZXctcGFuZWwtaWZyYW1lJylcbiAgICBpZnJhbWUuc3R5bGUuY3NzVGV4dCA9ICdtaW4td2lkdGg6MzU1cHg7ZGlzcGxheTpibG9jaztoZWlnaHQ6MzU1cHg7bWFyZ2luOjAgYXV0bztiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ym9yZGVyOiBub25lOyc7XG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxDYXB0Y2hhVG9rZW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmcmFtZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIHdpbmRvd0xvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uO1xuICAgICAgICAgIHZhciBpZnJhbWVMb2NhdGlvbiA9IGlmcmFtZS5jb250ZW50V2luZG93LmxvY2F0aW9uO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGlmcmFtZUxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgaWZyYW1lTG9jYXRpb24ucGF0aG5hbWUgPT09XG4gICAgICAgICAgICB3aW5kb3dMb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgIHdpbmRvd0xvY2F0aW9uLnBhdGhuYW1lXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGNvbnN0IGlmcmFtZVVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoaWZyYW1lTG9jYXRpb24uc2VhcmNoKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcHRjaFRva2VuID0gaWZyYW1lVXJsUGFyYW1zLmdldCgnY2FwdGNoYV90b2tlbicpO1xuICAgICAgICAgICAgaWYgKGNhcHRjaFRva2VuKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICBjYXB0Y2hhX3Rva2VuOiBjYXB0Y2hUb2tlbixcbiAgICAgICAgICAgICAgICBleHBpcmVzX2luOiBOdW1iZXIoaWZyYW1lVXJsUGFyYW1zLmdldCgnZXhwaXJlc19pbicpKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlamVjdCh7XG4gICAgICAgICAgICAgIGVycm9yOiBpZnJhbWVVcmxQYXJhbXMuZ2V0KCdlcnJvcicpLFxuICAgICAgICAgICAgICBlcnJvcl9kZXNjcmlwdGlvbjogaWZyYW1lVXJsUGFyYW1zLmdldCgnZXJyb3JfZGVzY3JpcHRpb24nKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICB0YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSlcbiAgfVxuICAvKipcbiAgICogX2dldENhcHRjaGFUb2tlbiDojrflj5ZjYXB0Y2hhVG9rZW5cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgX2dldENhcHRjaGFUb2tlbihmb3JjZU5ld1Rva2VuOiBib29sZWFuLCBzdGF0ZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBpZiAoIWZvcmNlTmV3VG9rZW4pIHtcbiAgICAgIC8vIOWmguaenOacrOWcsOWtmOWcqO+8jOWImeebtOaOpei/lOWbnlxuICAgICAgY29uc3QgY2FwdGNoYVRva2VuID0gYXdhaXQgdGhpcy5fZmluZENhcHRjaGFUb2tlbigpXG4gICAgICBpZiAoY2FwdGNoYVRva2VuKSB7XG4gICAgICAgIHJldHVybiBjYXB0Y2hhVG9rZW5cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcmVkaXJlY3RVUkwgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgXCI/X19jYXB0Y2hhPW9uXCJcbiAgICBjb25zdCBjYXB0Y2hhVG9rZW5SZXNwID0gYXdhaXQgdGhpcy5fY29uZmlnLnJlcXVlc3Q8R2V0Q2FwdGNoYVJlc3BvbnNlPihHRVRfQ0FQVENIQV9VUkwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keToge1xuICAgICAgICBjbGllbnRfaWQ6IHRoaXMuX2NvbmZpZy5jbGllbnRJZCxcbiAgICAgICAgcmVkaXJlY3RfdXJpOiByZWRpcmVjdFVSTCxcbiAgICAgICAgc3RhdGU6IHN0YXRlXG4gICAgICB9LFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcbiAgICB9KVxuICAgIGlmIChjYXB0Y2hhVG9rZW5SZXNwLmNhcHRjaGFfdG9rZW4pIHtcbiAgICAgIGNvbnN0IGNhcHRjaGFUb2tlbiA9IHtcbiAgICAgICAgY2FwdGNoYV90b2tlbjogY2FwdGNoYVRva2VuUmVzcC5jYXB0Y2hhX3Rva2VuLFxuICAgICAgICBleHBpcmVzX2luOiBjYXB0Y2hhVG9rZW5SZXNwLmV4cGlyZXNfaW4sXG4gICAgICB9XG4gICAgICB0aGlzLl9zYXZlQ2FwdGNoYVRva2VuKGNhcHRjaGFUb2tlbilcbiAgICAgIHJldHVybiBjYXB0Y2hhVG9rZW5SZXNwLmNhcHRjaGFfdG9rZW5cbiAgICB9XG4gICAgY29uc3QgY2FwdGNoYVRva2VuID0gYXdhaXQgdGhpcy5fY29uZmlnLm9wZW5VUklXaXRoQ2FsbGJhY2soY2FwdGNoYVRva2VuUmVzcC51cmwpXG4gICAgdGhpcy5fc2F2ZUNhcHRjaGFUb2tlbihjYXB0Y2hhVG9rZW4pXG4gICAgcmV0dXJuIGNhcHRjaGFUb2tlbi5jYXB0Y2hhX3Rva2VuXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9hcHBlbmRDYXB0Y2hhVG9rZW5Ub1VSTCh1cmw6IHN0cmluZywgc3RhdGU6IHN0cmluZywgZm9yY2VOZXdUb2tlbjogYm9vbGVhbik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgY2FwdGNoYVRva2VuID0gYXdhaXQgdGhpcy5fZ2V0Q2FwdGNoYVRva2VuKGZvcmNlTmV3VG9rZW4sIHN0YXRlKTtcbiAgICBpZiAodXJsLmluZGV4T2YoXCI/XCIpID4gMCkge1xuICAgICAgdXJsICs9IFwiJmNhcHRjaGFfdG9rZW49XCIgKyBjYXB0Y2hhVG9rZW5cbiAgICB9IGVsc2Uge1xuICAgICAgdXJsICs9IFwiP2NhcHRjaGFfdG9rZW49XCIgKyBjYXB0Y2hhVG9rZW5cbiAgICB9XG4gICAgcmV0dXJuIHVybFxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfc2F2ZUNhcHRjaGFUb2tlbih0b2tlbjogQ2FwdGNoYVRva2VuKSB7XG4gICAgdG9rZW4uZXhwaXJlc19hdCA9IG5ldyBEYXRlKFxuICAgICAgRGF0ZS5ub3coKSArICh0b2tlbi5leHBpcmVzX2luIC0gMTApICogMTAwMCxcbiAgICApO1xuICAgIGNvbnN0IHRva2VuU3RyOiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh0b2tlbik7XG4gICAgYXdhaXQgdGhpcy5fY29uZmlnLnN0b3JhZ2Uuc2V0SXRlbSh0aGlzLl90b2tlblNlY3Rpb25OYW1lLCB0b2tlblN0cik7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9maW5kQ2FwdGNoYVRva2VuKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgdG9rZW5TdHI6IHN0cmluZyA9IGF3YWl0IHRoaXMuX2NvbmZpZy5zdG9yYWdlLmdldEl0ZW0oXG4gICAgICB0aGlzLl90b2tlblNlY3Rpb25OYW1lLFxuICAgICk7XG4gICAgaWYgKHRva2VuU3RyICE9PSB1bmRlZmluZWQgJiYgdG9rZW5TdHIgIT09IG51bGwpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNhcHRjaGFUb2tlbiA9IEpTT04ucGFyc2UodG9rZW5TdHIpO1xuICAgICAgICBpZiAoY2FwdGNoYVRva2VuPy5leHBpcmVzX2F0KSB7XG4gICAgICAgICAgY2FwdGNoYVRva2VuLmV4cGlyZXNfYXQgPSBuZXcgRGF0ZShjYXB0Y2hhVG9rZW4uZXhwaXJlc19hdCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNFeHBpcmVkID0gY2FwdGNoYVRva2VuLmV4cGlyZXNfYXQgPCBuZXcgRGF0ZSgpO1xuICAgICAgICBpZiAoaXNFeHBpcmVkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FwdGNoYVRva2VuLmNhcHRjaGFfdG9rZW5cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX2NvbmZpZy5zdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5fdG9rZW5TZWN0aW9uTmFtZSk7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cbn0iXX0=