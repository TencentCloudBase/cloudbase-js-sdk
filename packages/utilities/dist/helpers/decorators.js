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
exports.stopAuthLoginWithOAuth = exports.stopOAuthLoginWithAuth = exports.catchErrorsDecorator = void 0;
var util_1 = require("../libs/util");
var constants_1 = require("../constants");
var isFirefox = false;
if (typeof navigator !== 'undefined' && navigator.userAgent) {
    isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;
}
var REG_STACK_DECORATE = isFirefox ?
    /(\.js\/)?__decorate(\$\d+)?<@.*\d$/ :
    /(\/\w+\.js\.)?__decorate(\$\d+)?\s*\(.*\)$/;
var REG_STACK_LINK = /https?\:\/\/.+\:\d*\/.*\.js\:\d+\:\d+/;
function catchErrorsDecorator(options) {
    var _a = options.mode, mode = _a === void 0 ? 'async' : _a, _b = options.customInfo, customInfo = _b === void 0 ? {} : _b, title = options.title, _c = options.messages, messages = _c === void 0 ? [] : _c;
    return function (target, methodName, descriptor) {
        if (!constants_1.IS_DEBUG_MODE) {
            return;
        }
        var className = customInfo.className || target.constructor.name;
        var fnName = customInfo.methodName || methodName;
        var fn = descriptor.value;
        var sourceLink = getSourceLink(new Error());
        if (mode === 'sync') {
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var innerErr = getRewritedError({
                    err: new Error(),
                    className: className,
                    methodName: fnName,
                    sourceLink: sourceLink
                });
                try {
                    return fn.apply(this, args);
                }
                catch (err) {
                    var failErr = err;
                    var errMsg = err.message;
                    var logs = {
                        title: title || className + "." + fnName + " failed",
                        content: [{
                                type: 'error',
                                body: err
                            }]
                    };
                    if (errMsg && /^\{.*\}$/.test(errMsg)) {
                        var msg = JSON.parse(errMsg);
                        logs.subtitle = errMsg;
                        if (msg.code) {
                            if (innerErr) {
                                innerErr.code = msg.code;
                                innerErr.msg = msg.msg;
                            }
                            else {
                                err.code = msg.code;
                                err.message = msg.msg;
                            }
                            failErr = innerErr || err;
                            logs.content = messages.map(function (msg) {
                                return {
                                    type: 'info',
                                    body: msg
                                };
                            });
                        }
                    }
                    util_1.printGroupLog(logs);
                    throw failErr;
                }
            };
        }
        else {
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return __awaiter(this, void 0, void 0, function () {
                    var innerErr, err_1, failErr, errMsg, logs, msg;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                innerErr = getRewritedError({
                                    err: new Error(),
                                    className: className,
                                    methodName: fnName,
                                    sourceLink: sourceLink
                                });
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4, fn.apply(this, args)];
                            case 2: return [2, _a.sent()];
                            case 3:
                                err_1 = _a.sent();
                                failErr = err_1;
                                errMsg = err_1.message;
                                logs = {
                                    title: title || className + "." + fnName + " failed",
                                    content: [{
                                            type: 'error',
                                            body: err_1
                                        }]
                                };
                                if (errMsg && /^\{.*\}$/.test(errMsg)) {
                                    msg = JSON.parse(errMsg);
                                    logs.subtitle = msg;
                                    if (msg.code) {
                                        if (innerErr) {
                                            innerErr.code = msg.code;
                                            innerErr.message = msg.msg;
                                        }
                                        else {
                                            err_1.code = msg.code;
                                            err_1.message = msg.msg;
                                        }
                                        failErr = innerErr || err_1;
                                        logs.content = messages.map(function (msg) {
                                            return {
                                                type: 'info',
                                                body: msg
                                            };
                                        });
                                    }
                                }
                                util_1.printGroupLog(logs);
                                throw failErr;
                            case 4: return [2];
                        }
                    });
                });
            };
        }
    };
}
exports.catchErrorsDecorator = catchErrorsDecorator;
function stopOAuthLoginWithAuth() {
    return function (_target, _methodName, descriptor) {
        var fn = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var _fromApp, authInstance, authLogin, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _fromApp = this._fromApp;
                            authInstance = _fromApp.authInstance;
                            _a = authInstance;
                            if (!_a) return [3, 2];
                            return [4, authInstance.getLoginState()];
                        case 1:
                            _a = (_b.sent());
                            _b.label = 2;
                        case 2:
                            authLogin = _a;
                            if (authLogin) {
                                throw Error('当前已使用 auth 登录，请手动退出 auth 登录后再进行 oauth 登录');
                            }
                            return [2, fn.apply(this, args)];
                    }
                });
            });
        };
    };
}
exports.stopOAuthLoginWithAuth = stopOAuthLoginWithAuth;
function stopAuthLoginWithOAuth() {
    return function (_target, _methodName, descriptor) {
        var fn = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var _fromApp, oauthInstance, oauthLogin, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _fromApp = this._fromApp;
                            oauthInstance = _fromApp.oauthInstance || _fromApp.oauth();
                            _a = oauthInstance;
                            if (!_a) return [3, 2];
                            return [4, oauthInstance.hasLoginState()];
                        case 1:
                            _a = (_b.sent());
                            _b.label = 2;
                        case 2:
                            oauthLogin = _a;
                            if (oauthLogin) {
                                throw Error('当前已使用 oauth 登录，请手动退出 oauth 登录后再进行 auth 登录');
                            }
                            return [2, fn.apply(this, args)];
                    }
                });
            });
        };
    };
}
exports.stopAuthLoginWithOAuth = stopAuthLoginWithOAuth;
function getSourceLink(err) {
    var sourceLink = '';
    var outterErrStacks = err.stack.split('\n');
    var indexOfDecorator = outterErrStacks.findIndex(function (str) { return REG_STACK_DECORATE.test(str); });
    if (indexOfDecorator !== -1) {
        var match = REG_STACK_LINK.exec(outterErrStacks[indexOfDecorator + 1] || '');
        sourceLink = match ? match[0] : '';
    }
    return sourceLink;
}
function getRewritedError(options) {
    var err = options.err, className = options.className, methodName = options.methodName, sourceLink = options.sourceLink;
    if (!sourceLink) {
        return null;
    }
    var innerErrStack = err.stack.split('\n');
    var REG_STACK_INNER_METHOD = isFirefox ?
        /^catchErrorsDecorator\/<\/descriptor.value@.*\d$/ :
        new RegExp(className + "\\.descriptor.value\\s*\\[as\\s" + methodName + "\\]\\s*\\(.*\\)$");
    var REG_STACK_INNER_METHOD_WITHOUT_LINK = isFirefox ?
        /^catchErrorsDecorator\/<\/descriptor.value/ :
        new RegExp(className + "\\.descriptor.value\\s*\\[as\\s" + methodName + "\\]");
    var indexOfSource = innerErrStack.findIndex(function (str) { return REG_STACK_INNER_METHOD.test(str); });
    var innerErr;
    if (indexOfSource !== -1) {
        var realErrStack = innerErrStack.filter(function (v, i) {
            return i > indexOfSource;
        });
        realErrStack.unshift(innerErrStack[indexOfSource]
            .replace(REG_STACK_INNER_METHOD_WITHOUT_LINK, className + "." + methodName)
            .replace(REG_STACK_LINK, sourceLink));
        innerErr = new Error();
        innerErr.stack = (isFirefox ? '@debugger' : 'Error') + "\n" + realErrStack.join('\n');
    }
    return innerErr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2RlY29yYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQTZDO0FBQzdDLDBDQUE2QztBQVk3QyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDdEIsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLFNBQVMsRUFBRTtJQUMzRCxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Q0FDM0Q7QUFJRCxJQUFNLGtCQUFrQixHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLG9DQUFvQyxDQUFDLENBQUM7SUFDdEMsNENBQTRDLENBQUM7QUFDL0MsSUFBTSxjQUFjLEdBQUcsdUNBQXVDLENBQUM7QUFLL0QsU0FBZ0Isb0JBQW9CLENBQUMsT0FBcUM7SUFFaEUsSUFBQSxLQUEwRCxPQUFPLEtBQW5ELEVBQWQsSUFBSSxtQkFBRyxPQUFPLEtBQUEsRUFBRSxLQUEwQyxPQUFPLFdBQWxDLEVBQWYsVUFBVSxtQkFBRyxFQUFFLEtBQUEsRUFBRSxLQUFLLEdBQW9CLE9BQU8sTUFBM0IsRUFBRSxLQUFrQixPQUFPLFNBQVosRUFBYixRQUFRLG1CQUFHLEVBQUUsS0FBQSxDQUFhO0lBRTFFLE9BQU8sVUFDTCxNQUFXLEVBQ1gsVUFBa0IsRUFDbEIsVUFBNkM7UUFHN0MsSUFBSSxDQUFDLHlCQUFhLEVBQUU7WUFDbEIsT0FBTztTQUNSO1FBQ0QsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUNsRSxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQztRQUNuRCxJQUFNLEVBQUUs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QUFrQixDQUFDLENBQUM7SUFDekYsSUFBTSxtQ0FBbUMsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUNyRCw0Q0FBNEMsQ0FBQyxDQUFDO1FBQzlDLElBQUksTUFBTSxDQUFJLFNBQVMsdUNBQWtDLFVBQVUsUUFBSyxDQUFDLENBQUM7SUFDNUUsSUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLHNCQUFzQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO0lBQ3ZGLElBQUksUUFBZSxDQUFDO0lBQ3BCLElBQUksYUFBYSxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBRXhCLElBQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztZQUM3QyxPQUFPLENBQUMsR0FBRyxhQUFhLENBQUE7UUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7YUFDOUMsT0FBTyxDQUFDLG1DQUFtQyxFQUFLLFNBQVMsU0FBSSxVQUFZLENBQUM7YUFDMUUsT0FBTyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLFFBQVEsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxXQUFLLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFHLENBQUM7S0FDckY7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJpbnRHcm91cExvZyB9IGZyb20gXCIuLi9saWJzL3V0aWxcIjtcbmltcG9ydCB7IElTX0RFQlVHX01PREUgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5cbmludGVyZmFjZSBJQ2F0Y2hFcnJvcnNEZWNvcmF0b3JPcHRpb25zIHtcbiAgbW9kZT86ICdzeW5jJyB8ICdhc3luYyc7XG4gIGN1c3RvbUluZm8/OiB7XG4gICAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICAgIG1ldGhvZE5hbWU/OiBzdHJpbmc7XG4gIH07XG4gIHRpdGxlPzogc3RyaW5nO1xuICBtZXNzYWdlcz86IHN0cmluZ1tdO1xufVxuLy8gZmlyZWZveOeahHN0YWNr5qC85byP5LiOY2hyb21l5LiN5ZCMXG5sZXQgaXNGaXJlZm94ID0gZmFsc2U7XG5pZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICBpc0ZpcmVmb3ggPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJGaXJlZm94XCIpICE9PSAtMTtcbn1cbi8qKlxuICogZGVjb3JhdGXlnKhzdGFja+S4reS4gOiIrOmDveeJueWumueahOinhOiMg1xuICovXG5jb25zdCBSRUdfU1RBQ0tfREVDT1JBVEUgPSBpc0ZpcmVmb3ggP1xuICAvKFxcLmpzXFwvKT9fX2RlY29yYXRlKFxcJFxcZCspPzxALipcXGQkLyA6XG4gIC8oXFwvXFx3K1xcLmpzXFwuKT9fX2RlY29yYXRlKFxcJFxcZCspP1xccypcXCguKlxcKSQvO1xuY29uc3QgUkVHX1NUQUNLX0xJTksgPSAvaHR0cHM/XFw6XFwvXFwvLitcXDpcXGQqXFwvLipcXC5qc1xcOlxcZCtcXDpcXGQrLztcbi8qKlxuICogZGVidWfmqKHlvI/lvLrljJbml6Xlv5fkv6Hmga9cbiAqIEBwYXJhbSBvcHRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYXRjaEVycm9yc0RlY29yYXRvcihvcHRpb25zOiBJQ2F0Y2hFcnJvcnNEZWNvcmF0b3JPcHRpb25zKSB7XG5cbiAgY29uc3QgeyBtb2RlID0gJ2FzeW5jJywgY3VzdG9tSW5mbyA9IHt9LCB0aXRsZSwgbWVzc2FnZXMgPSBbXSB9ID0gb3B0aW9ucztcblxuICByZXR1cm4gZnVuY3Rpb24gKFxuICAgIHRhcmdldDogYW55LFxuICAgIG1ldGhvZE5hbWU6IHN0cmluZyxcbiAgICBkZXNjcmlwdG9yOiBUeXBlZFByb3BlcnR5RGVzY3JpcHRvcjxGdW5jdGlvbj5cbiAgKSB7XG4gICAgLy8g55Sf5Lqn546v5aKD56aB55SoXG4gICAgaWYgKCFJU19ERUJVR19NT0RFKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGN1c3RvbUluZm8uY2xhc3NOYW1lIHx8IHRhcmdldC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIGNvbnN0IGZuTmFtZSA9IGN1c3RvbUluZm8ubWV0aG9kTmFtZSB8fCBtZXRob2ROYW1lO1xuICAgIGNvbnN0IGZuID0gZGVzY3JpcHRvci52YWx1ZTtcblxuICAgIC8vIOiiq2RlY29yYXRvcuijhemlsOeahOa6kOeggWxpbmtcbiAgICAvLyDlnKhkZXNjcmlwdG9yLnZhbHVl5aSW6YOo5q2k5aSE5Yib5bu655qEc3RhY2vlsYLmrKHlj6/op6bovr7mupDnoIFcbiAgICAvLyDogIxkZXNjcmlwdG9yLnZhbHVl5YaF6YOo5pyJ5Y+v6IO955Sx5LqOc3RhY2vlpKrmt7Hml6Dms5Xop6bovr5cbiAgICBjb25zdCBzb3VyY2VMaW5rID0gZ2V0U291cmNlTGluayhuZXcgRXJyb3IoKSk7XG5cbiAgICBpZiAobW9kZSA9PT0gJ3N5bmMnKSB7XG4gICAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24gKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIC8vIOatpOWkhOeahHN0YWNr5L2c55So5Li76KaB5piv5Li65LqG6I635Y+W6KKrZGVjb3JhdG9y6KOF6aWw55qE5rqQ56CBY2xhc3PlkoxtZXRob2TlkI3np7BcbiAgICAgICAgY29uc3QgaW5uZXJFcnI6IGFueSA9IGdldFJld3JpdGVkRXJyb3Ioe1xuICAgICAgICAgIGVycjogbmV3IEVycm9yKCksXG4gICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgIG1ldGhvZE5hbWU6IGZuTmFtZSxcbiAgICAgICAgICBzb3VyY2VMaW5rXG4gICAgICAgIH0pXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsZXQgZmFpbEVyciA9IGVycjtcbiAgICAgICAgICBjb25zdCB7IG1lc3NhZ2U6IGVyck1zZyB9ID0gZXJyO1xuICAgICAgICAgIGNvbnN0IGxvZ3M6IGFueSA9IHtcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSB8fCBgJHtjbGFzc05hbWV9LiR7Zm5OYW1lfSBmYWlsZWRgLFxuICAgICAgICAgICAgY29udGVudDogW3tcbiAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgYm9keTogZXJyXG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDlj6rnibnmrorlpITnkIZTREvkuJrliqHpgLvovpHmipvlh7rnmoTplJnor68tSlNPTiBzdHJpbmdcbiAgICAgICAgICBpZiAoZXJyTXNnICYmIC9eXFx7LipcXH0kLy50ZXN0KGVyck1zZykpIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IEpTT04ucGFyc2UoZXJyTXNnKTtcbiAgICAgICAgICAgIGxvZ3Muc3VidGl0bGUgPSBlcnJNc2c7XG4gICAgICAgICAgICBpZiAobXNnLmNvZGUpIHtcbiAgICAgICAgICAgICAgaWYgKGlubmVyRXJyKSB7XG4gICAgICAgICAgICAgICAgaW5uZXJFcnIuY29kZSA9IG1zZy5jb2RlO1xuICAgICAgICAgICAgICAgIGlubmVyRXJyLm1zZyA9IG1zZy5tc2c7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyLmNvZGUgPSBtc2cuY29kZVxuICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlID0gbXNnLm1zZ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZhaWxFcnIgPSBpbm5lckVyciB8fCBlcnI7XG4gICAgICAgICAgICAgIGxvZ3MuY29udGVudCA9IG1lc3NhZ2VzLm1hcChtc2cgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgICAgICAgICAgICBib2R5OiBtc2dcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBwcmludEdyb3VwTG9nKGxvZ3MpO1xuICAgICAgICAgIHRocm93IGZhaWxFcnI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IGFzeW5jIGZ1bmN0aW9uICguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBjb25zdCBpbm5lckVycjogYW55ID0gZ2V0UmV3cml0ZWRFcnJvcih7XG4gICAgICAgICAgZXJyOiBuZXcgRXJyb3IoKSxcbiAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgbWV0aG9kTmFtZTogZm5OYW1lLFxuICAgICAgICAgIHNvdXJjZUxpbmtcbiAgICAgICAgfSlcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgZm4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxldCBmYWlsRXJyID0gZXJyO1xuICAgICAgICAgIGNvbnN0IHsgbWVzc2FnZTogZXJyTXNnIH0gPSBlcnI7XG4gICAgICAgICAgY29uc3QgbG9nczogYW55ID0ge1xuICAgICAgICAgICAgdGl0bGU6IHRpdGxlIHx8IGAke2NsYXNzTmFtZX0uJHtmbk5hbWV9IGZhaWxlZGAsXG4gICAgICAgICAgICBjb250ZW50OiBbe1xuICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICBib2R5OiBlcnJcbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIOWPqueJueauiuWkhOeQhlNES+S4muWKoemAu+i+keaKm+WHuueahOmUmeivry1KU09OIHN0cmluZ1xuICAgICAgICAgIGlmIChlcnJNc2cgJiYgL15cXHsuKlxcfSQvLnRlc3QoZXJyTXNnKSkge1xuICAgICAgICAgICAgY29uc3QgbXNnID0gSlNPTi5wYXJzZShlcnJNc2cpO1xuICAgICAgICAgICAgbG9ncy5zdWJ0aXRsZSA9IG1zZztcbiAgICAgICAgICAgIGlmIChtc2cuY29kZSkge1xuICAgICAgICAgICAgICBpZiAoaW5uZXJFcnIpIHtcbiAgICAgICAgICAgICAgICBpbm5lckVyci5jb2RlID0gbXNnLmNvZGU7XG4gICAgICAgICAgICAgICAgaW5uZXJFcnIubWVzc2FnZSA9IG1zZy5tc2c7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyLmNvZGUgPSBtc2cuY29kZVxuICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlID0gbXNnLm1zZ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZhaWxFcnIgPSBpbm5lckVyciB8fCBlcnI7XG4gICAgICAgICAgICAgIGxvZ3MuY29udGVudCA9IG1lc3NhZ2VzLm1hcChtc2cgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgICAgICAgICAgICBib2R5OiBtc2dcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBwcmludEdyb3VwTG9nKGxvZ3MpO1xuICAgICAgICAgIHRocm93IGZhaWxFcnI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BPQXV0aExvZ2luV2l0aEF1dGgoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoXG4gICAgX3RhcmdldDogYW55LFxuICAgIF9tZXRob2ROYW1lOiBzdHJpbmcsXG4gICAgZGVzY3JpcHRvcjogVHlwZWRQcm9wZXJ0eURlc2NyaXB0b3I8RnVuY3Rpb24+XG4gICkge1xuICAgIGNvbnN0IGZuID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgICBkZXNjcmlwdG9yLnZhbHVlID0gYXN5bmMgZnVuY3Rpb24gKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICBjb25zdCB7IF9mcm9tQXBwIH0gPSB0aGlzXG4gICAgICBjb25zdCBhdXRoSW5zdGFuY2UgPSBfZnJvbUFwcC5hdXRoSW5zdGFuY2VcbiAgICAgIC8vIGNvbnN0IG9hdXRoSW5zdGFuY2UgPSBfZnJvbUFwcC5vYXV0aEluc3RhbmNlXG4gICAgICBjb25zdCBhdXRoTG9naW4gPSBhdXRoSW5zdGFuY2UgJiYgYXdhaXQgYXV0aEluc3RhbmNlLmdldExvZ2luU3RhdGUoKVxuICAgICAgaWYgKGF1dGhMb2dpbikge1xuICAgICAgICB0aHJvdyBFcnJvcign5b2T5YmN5bey5L2/55SoIGF1dGgg55m75b2V77yM6K+35omL5Yqo6YCA5Ye6IGF1dGgg55m75b2V5ZCO5YaN6L+b6KGMIG9hdXRoIOeZu+W9lScpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BBdXRoTG9naW5XaXRoT0F1dGgoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoXG4gICAgX3RhcmdldDogYW55LFxuICAgIF9tZXRob2ROYW1lOiBzdHJpbmcsXG4gICAgZGVzY3JpcHRvcjogVHlwZWRQcm9wZXJ0eURlc2NyaXB0b3I8RnVuY3Rpb24+XG4gICkge1xuICAgIGNvbnN0IGZuID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgICBkZXNjcmlwdG9yLnZhbHVlID0gYXN5bmMgZnVuY3Rpb24gKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICBjb25zdCB7IF9mcm9tQXBwIH0gPSB0aGlzXG4gICAgICAvLyBjb25zdCBhdXRoSW5zdGFuY2UgPSBfZnJvbUFwcC5hdXRoSW5zdGFuY2VcbiAgICAgIGNvbnN0IG9hdXRoSW5zdGFuY2UgPSBfZnJvbUFwcC5vYXV0aEluc3RhbmNlIHx8IChfZnJvbUFwcCBhcyBhbnkpLm9hdXRoKClcbiAgICAgIGNvbnN0IG9hdXRoTG9naW4gPSBvYXV0aEluc3RhbmNlICYmIGF3YWl0IG9hdXRoSW5zdGFuY2UuaGFzTG9naW5TdGF0ZSgpXG4gICAgICBpZiAob2F1dGhMb2dpbikge1xuICAgICAgICB0aHJvdyBFcnJvcign5b2T5YmN5bey5L2/55SoIG9hdXRoIOeZu+W9le+8jOivt+aJi+WKqOmAgOWHuiBvYXV0aCDnmbvlvZXlkI7lho3ov5vooYwgYXV0aCDnmbvlvZUnKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICog5Zyo5Y6f5aeL5aCG5qCI5Lit5p+l5om+6KOF6aWw5Zmo5p2h55uu5bm26L+U5Zue5rqQ56CB6ZO+5o6lbGlua1xuICogQHBhcmFtIGVyclxuICovXG5mdW5jdGlvbiBnZXRTb3VyY2VMaW5rKGVycjogRXJyb3IpIHtcbiAgbGV0IHNvdXJjZUxpbmsgPSAnJztcbiAgY29uc3Qgb3V0dGVyRXJyU3RhY2tzID0gZXJyLnN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgY29uc3QgaW5kZXhPZkRlY29yYXRvciA9IG91dHRlckVyclN0YWNrcy5maW5kSW5kZXgoc3RyID0+IFJFR19TVEFDS19ERUNPUkFURS50ZXN0KHN0cikpO1xuICBpZiAoaW5kZXhPZkRlY29yYXRvciAhPT0gLTEpIHtcbiAgICBjb25zdCBtYXRjaCA9IFJFR19TVEFDS19MSU5LLmV4ZWMob3V0dGVyRXJyU3RhY2tzW2luZGV4T2ZEZWNvcmF0b3IgKyAxXSB8fCAnJyk7XG4gICAgc291cmNlTGluayA9IG1hdGNoID8gbWF0Y2hbMF0gOiAnJztcbiAgfVxuICByZXR1cm4gc291cmNlTGluaztcbn1cblxuLyoqXG4gKiDlnKjljp/lp4vloIbmoIjkuK3mn6Xmib7oo4XppbDlmajmnaHnm67vvIzliZTpmaTlhbblkI7nmoTml6DnlKjloIbmoIjvvIzlubblsIbpk77mjqXmm7/mjaLkuLrmupDnoIFsaW5rXG4gKiBAcGFyYW0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBnZXRSZXdyaXRlZEVycm9yKG9wdGlvbnM6IHtcbiAgZXJyOiBFcnJvcjtcbiAgY2xhc3NOYW1lOiBzdHJpbmc7XG4gIG1ldGhvZE5hbWU6IHN0cmluZztcbiAgc291cmNlTGluazogc3RyaW5nO1xufSkge1xuICBjb25zdCB7IGVyciwgY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBzb3VyY2VMaW5rIH0gPSBvcHRpb25zO1xuICAvLyDmib7kuI3liLDmupDnoIFsaW5r6L+U5ZuebnVsbO+8jOWQjue7remAu+i+keWwhuaJk+WNsOWOn+WghuagiOS/oeaBr1xuICBpZiAoIXNvdXJjZUxpbmspIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGlubmVyRXJyU3RhY2sgPSBlcnIuc3RhY2suc3BsaXQoJ1xcbicpO1xuICBjb25zdCBSRUdfU1RBQ0tfSU5ORVJfTUVUSE9EID0gaXNGaXJlZm94ID9cbiAgICAvXmNhdGNoRXJyb3JzRGVjb3JhdG9yXFwvPFxcL2Rlc2NyaXB0b3IudmFsdWVALipcXGQkLyA6XG4gICAgbmV3IFJlZ0V4cChgJHtjbGFzc05hbWV9XFxcXC5kZXNjcmlwdG9yLnZhbHVlXFxcXHMqXFxcXFthc1xcXFxzJHttZXRob2ROYW1lfVxcXFxdXFxcXHMqXFxcXCguKlxcXFwpJGApO1xuICBjb25zdCBSRUdfU1RBQ0tfSU5ORVJfTUVUSE9EX1dJVEhPVVRfTElOSyA9IGlzRmlyZWZveCA/XG4gICAgL15jYXRjaEVycm9yc0RlY29yYXRvclxcLzxcXC9kZXNjcmlwdG9yLnZhbHVlLyA6XG4gICAgbmV3IFJlZ0V4cChgJHtjbGFzc05hbWV9XFxcXC5kZXNjcmlwdG9yLnZhbHVlXFxcXHMqXFxcXFthc1xcXFxzJHttZXRob2ROYW1lfVxcXFxdYCk7XG4gIGNvbnN0IGluZGV4T2ZTb3VyY2UgPSBpbm5lckVyclN0YWNrLmZpbmRJbmRleChzdHIgPT4gUkVHX1NUQUNLX0lOTkVSX01FVEhPRC50ZXN0KHN0cikpO1xuICBsZXQgaW5uZXJFcnI6IEVycm9yO1xuICBpZiAoaW5kZXhPZlNvdXJjZSAhPT0gLTEpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcmVhbEVyclN0YWNrID0gaW5uZXJFcnJTdGFjay5maWx0ZXIoKHYsIGkpID0+IHtcbiAgICAgIHJldHVybiBpID4gaW5kZXhPZlNvdXJjZVxuICAgIH0pO1xuICAgIHJlYWxFcnJTdGFjay51bnNoaWZ0KGlubmVyRXJyU3RhY2tbaW5kZXhPZlNvdXJjZV1cbiAgICAgIC5yZXBsYWNlKFJFR19TVEFDS19JTk5FUl9NRVRIT0RfV0lUSE9VVF9MSU5LLCBgJHtjbGFzc05hbWV9LiR7bWV0aG9kTmFtZX1gKVxuICAgICAgLnJlcGxhY2UoUkVHX1NUQUNLX0xJTkssIHNvdXJjZUxpbmspKTtcbiAgICBpbm5lckVyciA9IG5ldyBFcnJvcigpO1xuICAgIGlubmVyRXJyLnN0YWNrID0gYCR7aXNGaXJlZm94ID8gJ0BkZWJ1Z2dlcicgOiAnRXJyb3InfVxcbiR7cmVhbEVyclN0YWNrLmpvaW4oJ1xcbicpfWA7XG4gIH1cbiAgcmV0dXJuIGlubmVyRXJyO1xufSJdfQ==