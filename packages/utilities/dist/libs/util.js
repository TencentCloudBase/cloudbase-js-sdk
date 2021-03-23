"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformPhone = exports.sleep = exports.printGroupLog = exports.throwError = exports.printInfo = exports.printError = exports.printWarn = exports.execCallback = exports.createPromiseCallback = exports.removeParam = exports.getHash = exports.getQuery = exports.toQueryString = exports.createSign = exports.formatUrl = exports.genSeqId = exports.isFormData = exports.isInstanceOf = exports.isNull = exports.isPalinObject = exports.isUndefined = exports.isString = exports.isArray = void 0;
var hmac_sha256_1 = __importDefault(require("crypto-js/hmac-sha256"));
var enc_base64_1 = __importDefault(require("crypto-js/enc-base64"));
var enc_utf8_1 = __importDefault(require("crypto-js/enc-utf8"));
var constants_1 = require("../constants");
function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
}
exports.isArray = isArray;
function isString(val) {
    return typeof val === 'string';
}
exports.isString = isString;
function isUndefined(val) {
    return typeof val === 'undefined';
}
exports.isUndefined = isUndefined;
function isPalinObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
}
exports.isPalinObject = isPalinObject;
function isNull(val) {
    return Object.prototype.toString.call(val) === '[object Null]';
}
exports.isNull = isNull;
function isInstanceOf(instance, construct) {
    return instance instanceof construct;
}
exports.isInstanceOf = isInstanceOf;
function isFormData(val) {
    return Object.prototype.toString.call(val) === '[object FormData]';
}
exports.isFormData = isFormData;
function genSeqId() {
    return Math.random().toString(16).slice(2);
}
exports.genSeqId = genSeqId;
function formatUrl(PROTOCOL, url, query) {
    if (query === void 0) { query = {}; }
    var urlHasQuery = /\?/.test(url);
    var queryString = '';
    for (var key in query) {
        if (queryString === '') {
            !urlHasQuery && (url += '?');
        }
        else {
            queryString += '&';
        }
        queryString += key + "=" + encodeURIComponent(query[key]);
    }
    url += queryString;
    if (/^http(s)?\:\/\//.test(url)) {
        return url;
    }
    return "" + PROTOCOL + url;
}
exports.formatUrl = formatUrl;
function base64url(source) {
    var encodedSource = enc_base64_1.default.stringify(source);
    encodedSource = encodedSource.replace(/=+$/, '');
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');
    return encodedSource;
}
function createSign(payload, secret) {
    var header = {
        alg: 'HS256',
        typ: 'JWT'
    };
    var headerStr = base64url(enc_utf8_1.default.parse(JSON.stringify(header)));
    var payloadStr = base64url(enc_utf8_1.default.parse(JSON.stringify(payload)));
    var token = headerStr + "." + payloadStr;
    var sign = base64url(hmac_sha256_1.default(token, secret));
    return token + "." + sign;
}
exports.createSign = createSign;
function toQueryString(query) {
    if (query === void 0) { query = {}; }
    var queryString = [];
    for (var key in query) {
        queryString.push(key + "=" + encodeURIComponent(query[key]));
    }
    return queryString.join('&');
}
exports.toQueryString = toQueryString;
function getQuery(name, url) {
    if (typeof window === 'undefined') {
        return false;
    }
    var u = url || window.location.search;
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = u.substr(u.indexOf('?') + 1).match(reg);
    return r != null ? r[2] : '';
}
exports.getQuery = getQuery;
;
exports.getHash = function (name) {
    if (typeof window === 'undefined') {
        return '';
    }
    var matches = window.location.hash.match(new RegExp("[#?&/]" + name + "=([^&#]*)"));
    return matches ? matches[1] : '';
};
function removeParam(key, sourceURL) {
    var rtn = sourceURL.split('?')[0];
    var param;
    var params_arr = [];
    var queryString = sourceURL.indexOf('?') !== -1 ? sourceURL.split('?')[1] : '';
    if (queryString !== '') {
        params_arr = queryString.split('&');
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split('=')[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + '?' + params_arr.join('&');
    }
    return rtn;
}
exports.removeParam = removeParam;
;
function createPromiseCallback() {
    var cb;
    if (!Promise) {
        cb = function () { };
        cb.promise = {};
        var throwPromiseNotDefined = function () {
            throw new Error('Your Node runtime does support ES6 Promises. ' +
                'Set "global.Promise" to your preferred implementation of promises.');
        };
        Object.defineProperty(cb.promise, 'then', { get: throwPromiseNotDefined });
        Object.defineProperty(cb.promise, 'catch', { get: throwPromiseNotDefined });
        return cb;
    }
    var promise = new Promise(function (resolve, reject) {
        cb = function (err, data) {
            if (err)
                return reject(err);
            return resolve(data);
        };
    });
    cb.promise = promise;
    return cb;
}
exports.createPromiseCallback = createPromiseCallback;
;
function execCallback(fn, err, data) {
    if (data === void 0) { data = null; }
    if (fn && typeof fn === 'function') {
        return fn(err, data);
    }
    if (err) {
        throw err;
    }
    return data;
}
exports.execCallback = execCallback;
function printWarn(error, msg) {
    console.warn("[" + constants_1.getSdkName() + "][" + error + "]:" + msg);
}
exports.printWarn = printWarn;
function printError(error, msg) {
    console.error({
        code: error,
        msg: "[" + constants_1.getSdkName() + "][" + error + "]:" + msg
    });
}
exports.printError = printError;
function printInfo(error, msg) {
    console.log("[" + constants_1.getSdkName() + "][" + error + "]:" + msg);
}
exports.printInfo = printInfo;
function throwError(error, msg) {
    throw new Error(JSON.stringify({
        code: error,
        msg: "[" + constants_1.getSdkName() + "][" + error + "]:" + msg
    }));
}
exports.throwError = throwError;
function printGroupLog(options) {
    var title = options.title, _a = options.subtitle, subtitle = _a === void 0 ? '' : _a, _b = options.content, content = _b === void 0 ? [] : _b, _c = options.printTrace, printTrace = _c === void 0 ? false : _c, _d = options.collapsed, collapsed = _d === void 0 ? false : _d;
    if (collapsed) {
        console.groupCollapsed(title, subtitle);
    }
    else {
        console.group(title, subtitle);
    }
    for (var _i = 0, content_1 = content; _i < content_1.length; _i++) {
        var tip = content_1[_i];
        var type = tip.type, body = tip.body;
        switch (type) {
            case 'info':
                console.log(body);
                break;
            case 'warn':
                console.warn(body);
                break;
            case 'error':
                console.error(body);
                break;
        }
    }
    if (printTrace) {
        console.trace('stack trace:');
    }
    console.groupEnd();
}
exports.printGroupLog = printGroupLog;
exports.sleep = function (ms) {
    if (ms === void 0) { ms = 0; }
    return new Promise(function (r) { return setTimeout(r, ms); });
};
function transformPhone(phoneNumber) {
    return "+86" + phoneNumber;
}
exports.transformPhone = transformPhone;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWJzL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0VBQTBDO0FBQzFDLG9FQUEwQztBQUMxQyxnRUFBc0M7QUFFdEMsMENBQTBDO0FBRTFDLFNBQWdCLE9BQU8sQ0FBQyxHQUFRO0lBQzlCLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGdCQUFnQixDQUFDO0FBQ2xFLENBQUM7QUFGRCwwQkFFQztBQUNELFNBQWdCLFFBQVEsQ0FBQyxHQUFRO0lBQy9CLE9BQU8sT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDO0FBQ2pDLENBQUM7QUFGRCw0QkFFQztBQUNELFNBQWdCLFdBQVcsQ0FBQyxHQUFRO0lBQ2xDLE9BQU8sT0FBTyxHQUFHLEtBQUssV0FBVyxDQUFDO0FBQ3BDLENBQUM7QUFGRCxrQ0FFQztBQUNELFNBQWdCLGFBQWEsQ0FBQyxHQUFRO0lBQ3BDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGlCQUFpQixDQUFDO0FBQ25FLENBQUM7QUFGRCxzQ0FFQztBQUNELFNBQWdCLE1BQU0sQ0FBQyxHQUFRO0lBQzdCLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGVBQWUsQ0FBQztBQUNqRSxDQUFDO0FBRkQsd0JBRUM7QUFDRCxTQUFnQixZQUFZLENBQUMsUUFBYSxFQUFDLFNBQWM7SUFDdkQsT0FBTyxRQUFRLFlBQVksU0FBUyxDQUFDO0FBQ3ZDLENBQUM7QUFGRCxvQ0FFQztBQUNELFNBQWdCLFVBQVUsQ0FBQyxHQUFRO0lBQ2pDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLG1CQUFtQixDQUFD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LElBQUksR0FBSyxHQUFHLEtBQVIsQ0FBUztRQUMxQixRQUFPLElBQUksRUFBRTtZQUNYLEtBQUssTUFBTTtnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixNQUFNO1lBQ1IsS0FBSyxNQUFNO2dCQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25CLE1BQU07WUFDUixLQUFLLE9BQU87Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEIsTUFBTTtTQUNUO0tBQ0Y7SUFDRCxJQUFHLFVBQVUsRUFBRTtRQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDL0I7SUFDRCxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDckIsQ0FBQztBQXpCRCxzQ0F5QkM7QUFFWSxRQUFBLEtBQUssR0FBRyxVQUFDLEVBQU07SUFBTixtQkFBQSxFQUFBLE1BQU07SUFBSyxPQUFBLElBQUksT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsVUFBVSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQztBQUFsQyxDQUFrQyxDQUFDO0FBRXBFLFNBQWdCLGNBQWMsQ0FBQyxXQUFtQjtJQUNoRCxPQUFPLFFBQU0sV0FBYSxDQUFBO0FBQzVCLENBQUM7QUFGRCx3Q0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBoczI1NiBmcm9tICdjcnlwdG8tanMvaG1hYy1zaGEyNTYnO1xuaW1wb3J0IGJhc2U2NCBmcm9tICdjcnlwdG8tanMvZW5jLWJhc2U2NCc7XG5pbXBvcnQgdXRmOCBmcm9tICdjcnlwdG8tanMvZW5jLXV0ZjgnO1xuaW1wb3J0IHsgS1YgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcbmltcG9ydCB7IGdldFNka05hbWUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheSh2YWw6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1BhbGluT2JqZWN0KHZhbDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNOdWxsKHZhbDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgTnVsbF0nO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5zdGFuY2VPZihpbnN0YW5jZTogYW55LGNvbnN0cnVjdDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBpbnN0YW5jZSBpbnN0YW5jZW9mIGNvbnN0cnVjdDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRm9ybURhdGFdJztcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZW5TZXFJZCgpOiBzdHJpbmcge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc2xpY2UoMik7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0VXJsKFBST1RPQ09MOiBzdHJpbmcsdXJsOiBzdHJpbmcscXVlcnk6IEtWPGFueT4gPSB7fSk6IHN0cmluZyB7XG4gIGNvbnN0IHVybEhhc1F1ZXJ5ID0gL1xcPy8udGVzdCh1cmwpO1xuICBsZXQgcXVlcnlTdHJpbmcgPSAnJztcbiAgZm9yKGxldCBrZXkgaW4gcXVlcnkpIHtcbiAgICBpZihxdWVyeVN0cmluZyA9PT0gJycpIHtcbiAgICAgICF1cmxIYXNRdWVyeSAmJiAodXJsICs9ICc/Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHF1ZXJ5U3RyaW5nICs9ICcmJztcbiAgICB9XG4gICAgcXVlcnlTdHJpbmcgKz0gYCR7a2V5fT0ke2VuY29kZVVSSUNvbXBvbmVudChxdWVyeVtrZXldKX1gO1xuICB9XG4gIHVybCArPSBxdWVyeVN0cmluZztcbiAgaWYoL15odHRwKHMpP1xcOlxcL1xcLy8udGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICByZXR1cm4gYCR7UFJPVE9DT0x9JHt1cmx9YDtcbn1cblxuZnVuY3Rpb24gYmFzZTY0dXJsKHNvdXJjZTogS1Y8YW55Pik6IHN0cmluZyB7XG4gIGxldCBlbmNvZGVkU291cmNlID0gYmFzZTY0LnN0cmluZ2lmeShzb3VyY2UpO1xuXG4gIGVuY29kZWRTb3VyY2UgPSBlbmNvZGVkU291cmNlLnJlcGxhY2UoLz0rJC8sJycpO1xuICBlbmNvZGVkU291cmNlID0gZW5jb2RlZFNvdXJjZS5yZXBsYWNlKC9cXCsvZywnLScpO1xuICBlbmNvZGVkU291cmNlID0gZW5jb2RlZFNvdXJjZS5yZXBsYWNlKC9cXC8vZywnXycpO1xuXG4gIHJldHVybiBlbmNvZGVkU291cmNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2lnbihwYXlsb2FkOiBLVjxhbnk+LHNlY3JldDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgaGVhZGVyID0ge1xuICAgIGFsZzogJ0hTMjU2JyxcbiAgICB0eXA6ICdKV1QnXG4gIH07XG4gIGNvbnN0IGhlYWRlclN0ciA9IGJhc2U2NHVybCh1dGY4LnBhcnNlKEpTT04uc3RyaW5naWZ5KGhlYWRlcikpKTtcbiAgY29uc3QgcGF5bG9hZFN0ciA9IGJhc2U2NHVybCh1dGY4LnBhcnNlKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKSk7XG5cbiAgY29uc3QgdG9rZW4gPSBgJHtoZWFkZXJTdHJ9LiR7cGF5bG9hZFN0cn1gO1xuICBjb25zdCBzaWduID0gYmFzZTY0dXJsKGhzMjU2KHRva2VuLHNlY3JldCkpO1xuICByZXR1cm4gYCR7dG9rZW59LiR7c2lnbn1gO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHRvUXVlcnlTdHJpbmcocXVlcnk6IEtWPGFueT4gPSB7fSkge1xuICBsZXQgcXVlcnlTdHJpbmcgPSBbXTtcbiAgZm9yKGxldCBrZXkgaW4gcXVlcnkpIHtcbiAgICBxdWVyeVN0cmluZy5wdXNoKGAke2tleX09JHtlbmNvZGVVUklDb21wb25lbnQocXVlcnlba2V5XSl9YCk7XG4gIH1cbiAgcmV0dXJuIHF1ZXJ5U3RyaW5nLmpvaW4oJyYnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFF1ZXJ5KG5hbWU6IHN0cmluZyx1cmw/OiBzdHJpbmcpIHtcbiAgaWYodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8g5Y+C5pWw77ya5Y+Y6YeP5ZCN77yMdXJs5Li656m65YiZ6KGo5LuO5b2T5YmN6aG16Z2i55qEdXJs5Lit5Y+WXG4gIGxldCB1ID0gdXJsIHx8IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIGxldCByZWcgPSBuZXcgUmVnRXhwKCcoXnwmKScgKyBuYW1lICsgJz0oW14mXSopKCZ8JCknKTtcbiAgbGV0IHIgPSB1LnN1YnN0cih1LmluZGV4T2YoJz8nKSArIDEpLm1hdGNoKHJlZyk7XG4gIHJldHVybiByICE9IG51bGwgPyByWzJdIDogJyc7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0SGFzaCA9IGZ1bmN0aW9uKG5hbWU6IHN0cmluZykge1xuICBpZih0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBjb25zdCBtYXRjaGVzID0gd2luZG93LmxvY2F0aW9uLmhhc2gubWF0Y2goXG4gICAgbmV3IFJlZ0V4cChgWyNcXD8mXFwvXSR7bmFtZX09KFteJiNdKilgKVxuICApO1xuICByZXR1cm4gbWF0Y2hlcyA/IG1hdGNoZXNbMV0gOiAnJztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVQYXJhbShrZXk6IHN0cmluZyxzb3VyY2VVUkw6IHN0cmluZykge1xuICBsZXQgcnRuID0gc291cmNlVVJMLnNwbGl0KCc/JylbMF07XG4gIGxldCBwYXJhbTtcbiAgbGV0IHBhcmFtc19hcnIgPSBbXTtcbiAgbGV0IHF1ZXJ5U3RyaW5nID1cbiAgICBzb3VyY2VVUkwuaW5kZXhPZignPycpICE9PSAtMSA/IHNvdXJjZVVSTC5zcGxpdCgnPycpWzFdIDogJyc7XG4gIGlmKHF1ZXJ5U3RyaW5nICE9PSAnJykge1xuICAgIHBhcmFtc19hcnIgPSBxdWVyeVN0cmluZy5zcGxpdCgnJicpO1xuICAgIGZvcihsZXQgaSA9IHBhcmFtc19hcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC09IDEpIHtcbiAgICAgIHBhcmFtID0gcGFyYW1zX2FycltpXS5zcGxpdCgnPScpWzBdO1xuICAgICAgaWYocGFyYW0gPT09IGtleSkge1xuICAgICAgICBwYXJhbXNfYXJyLnNwbGljZShpLDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBydG4gPSBydG4gKyAnPycgKyBwYXJhbXNfYXJyLmpvaW4oJyYnKTtcbiAgfVxuICByZXR1cm4gcnRuO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb21pc2VDYWxsYmFjaygpIHtcbiAgbGV0IGNiOiBhbnk7XG4gIGlmKCFQcm9taXNlKSB7XG4gICAgY2IgPSAoKSA9PiB7IH07XG4gICAgY2IucHJvbWlzZSA9IHt9O1xuXG4gICAgY29uc3QgdGhyb3dQcm9taXNlTm90RGVmaW5lZCA9ICgpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1lvdXIgTm9kZSBydW50aW1lIGRvZXMgc3VwcG9ydCBFUzYgUHJvbWlzZXMuICcgK1xuICAgICAgICAnU2V0IFwiZ2xvYmFsLlByb21pc2VcIiB0byB5b3VyIHByZWZlcnJlZCBpbXBsZW1lbnRhdGlvbiBvZiBwcm9taXNlcy4nXG4gICAgICApO1xuICAgIH07XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2IucHJvbWlzZSwndGhlbicseyBnZXQ6IHRocm93UHJvbWlzZU5vdERlZmluZWQgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNiLnByb21pc2UsJ2NhdGNoJyx7IGdldDogdGhyb3dQcm9taXNlTm90RGVmaW5lZCB9KTtcbiAgICByZXR1cm4gY2I7XG4gIH1cblxuICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KSA9PiB7XG4gICAgY2IgPSAoZXJyLGRhdGEpID0+IHtcbiAgICAgIGlmKGVycikgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgcmV0dXJuIHJlc29sdmUoZGF0YSk7XG4gICAgfTtcbiAgfSk7XG4gIGNiLnByb21pc2UgPSBwcm9taXNlO1xuICByZXR1cm4gY2I7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZXhlY0NhbGxiYWNrKGZuOiBGdW5jdGlvbiB8IG51bGwgfCB1bmRlZmluZWQsZXJyOiBhbnksZGF0YSA9IG51bGwpIHtcbiAgaWYoZm4gJiYgdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZuKGVycixkYXRhKTtcbiAgfVxuICBpZihlcnIpIHtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgcmV0dXJuIGRhdGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludFdhcm4oZXJyb3I6IHN0cmluZyxtc2c6IHN0cmluZykge1xuICBjb25zb2xlLndhcm4oYFske2dldFNka05hbWUoKX1dWyR7ZXJyb3J9XToke21zZ31gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50RXJyb3IoZXJyb3I6IHN0cmluZyxtc2c6IHN0cmluZykge1xuICBjb25zb2xlLmVycm9yKHtcbiAgICBjb2RlOiBlcnJvcixcbiAgICBtc2c6IGBbJHtnZXRTZGtOYW1lKCl9XVske2Vycm9yfV06JHttc2d9YFxuICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwcmludEluZm8oZXJyb3I6IHN0cmluZyxtc2c6IHN0cmluZykge1xuICBjb25zb2xlLmxvZyhgWyR7Z2V0U2RrTmFtZSgpfV1bJHtlcnJvcn1dOiR7bXNnfWApO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHRocm93RXJyb3IoZXJyb3I6IHN0cmluZyxtc2c6IHN0cmluZykge1xuICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgIGNvZGU6IGVycm9yLFxuICAgIG1zZzogYFske2dldFNka05hbWUoKX1dWyR7ZXJyb3J9XToke21zZ31gXG4gIH0pKTtcbn1cblxuaW50ZXJmYWNlIElQcmludEdyb3VwTG9nT3B0aW9ucyB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHN1YnRpdGxlOiBzdHJpbmcgfCBvYmplY3Q7XG4gIGNvbnRlbnQ6IHtcbiAgICB0eXBlOiAnaW5mbycgfCAnd2FybicgfCAnZXJyb3InLFxuICAgIGJvZHk6IHN0cmluZyB8IEVycm9yO1xuICB9W107XG4gIHByaW50VHJhY2U/OiBib29sZWFuO1xuICBjb2xsYXBzZWQ/OiBib29sZWFuO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHByaW50R3JvdXBMb2cob3B0aW9uczogSVByaW50R3JvdXBMb2dPcHRpb25zKSB7XG4gIGNvbnN0IHsgdGl0bGUsc3VidGl0bGUgPSAnJyxjb250ZW50ID0gW10scHJpbnRUcmFjZSA9IGZhbHNlLGNvbGxhcHNlZCA9IGZhbHNlIH0gPSBvcHRpb25zO1xuICBpZihjb2xsYXBzZWQpIHtcbiAgICBjb25zb2xlLmdyb3VwQ29sbGFwc2VkKHRpdGxlLHN1YnRpdGxlKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmdyb3VwKHRpdGxlLHN1YnRpdGxlKTtcbiAgfVxuICBmb3IoY29uc3QgdGlwIG9mIGNvbnRlbnQpIHtcbiAgICBjb25zdCB7IHR5cGUsYm9keSB9ID0gdGlwO1xuICAgIHN3aXRjaCh0eXBlKSB7XG4gICAgICBjYXNlICdpbmZvJzpcbiAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnd2Fybic6XG4gICAgICAgIGNvbnNvbGUud2Fybihib2R5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYm9keSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZihwcmludFRyYWNlKSB7XG4gICAgY29uc29sZS50cmFjZSgnc3RhY2sgdHJhY2U6Jyk7XG4gIH1cbiAgY29uc29sZS5ncm91cEVuZCgpO1xufVxuXG5leHBvcnQgY29uc3Qgc2xlZXAgPSAobXMgPSAwKSA9PiBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQocixtcykpO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtUGhvbmUocGhvbmVOdW1iZXI6IHN0cmluZykge1xuICByZXR1cm4gYCs4NiR7cGhvbmVOdW1iZXJ9YFxufVxuXG4iXX0=