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
exports.catchErrorsDecorator = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2RlY29yYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQTZDO0FBQzdDLDBDQUE2QztBQVk3QyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDdEIsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLFNBQVMsRUFBRTtJQUMzRCxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Q0FDM0Q7QUFJRCxJQUFNLGtCQUFrQixHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLG9DQUFvQyxDQUFDLENBQUM7SUFDdEMsNENBQTRDLENBQUM7QUFDL0MsSUFBTSxjQUFjLEdBQUcsdUNBQXVDLENBQUM7QUFLL0QsU0FBZ0Isb0JBQW9CLENBQUMsT0FBcUM7SUFFaEUsSUFBQSxLQUEwRCxPQUFPLEtBQW5ELEVBQWQsSUFBSSxtQkFBRyxPQUFPLEtBQUEsRUFBRSxLQUEwQyxPQUFPLFdBQWxDLEVBQWYsVUFBVSxtQkFBRyxFQUFFLEtBQUEsRUFBRSxLQUFLLEdBQW9CLE9BQU8sTUFBM0IsRUFBRSxLQUFrQixPQUFPLFNBQVosRUFBYixRQUFRLG1CQUFHLEVBQUUsS0FBQSxDQUFhO0lBRTFFLE9BQU8sVUFDTCxNQUFXLEVBQ1gsVUFBa0IsRUFDbEIsVUFBNkM7UUFHN0MsSUFBSSxDQUFDLHlCQUFhLEVBQUU7WUFDbEIsT0FBTztTQUNSO1FBQ0QsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUNsRSxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQztRQUNuRCxJQUFNLEVBQUUs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QyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQztJQUN2RixJQUFJLFFBQWUsQ0FBQztJQUNwQixJQUFJLGFBQWEsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUV4QixJQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7WUFDN0MsT0FBTyxDQUFDLEdBQUcsYUFBYSxDQUFBO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO2FBQzlDLE9BQU8sQ0FBQyxtQ0FBbUMsRUFBSyxTQUFTLFNBQUksVUFBWSxDQUFDO2FBQzFFLE9BQU8sQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN4QyxRQUFRLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUN2QixRQUFRLENBQUMsS0FBSyxHQUFHLENBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sV0FBSyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRyxDQUFDO0tBQ3JGO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByaW50R3JvdXBMb2cgfSBmcm9tIFwiLi4vbGlicy91dGlsXCI7XG5pbXBvcnQgeyBJU19ERUJVR19NT0RFIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuXG5pbnRlcmZhY2UgSUNhdGNoRXJyb3JzRGVjb3JhdG9yT3B0aW9ucyB7XG4gIG1vZGU/OiAnc3luYycgfCAnYXN5bmMnO1xuICBjdXN0b21JbmZvPzoge1xuICAgIGNsYXNzTmFtZT86IHN0cmluZztcbiAgICBtZXRob2ROYW1lPzogc3RyaW5nO1xuICB9O1xuICB0aXRsZT86IHN0cmluZztcbiAgbWVzc2FnZXM/OiBzdHJpbmdbXTtcbn1cbi8vIGZpcmVmb3jnmoRzdGFja+agvOW8j+S4jmNocm9tZeS4jeWQjFxubGV0IGlzRmlyZWZveCA9IGZhbHNlO1xuaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgaXNGaXJlZm94ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiRmlyZWZveFwiKSAhPT0gLTE7XG59XG4vKipcbiAqIGRlY29yYXRl5Zyoc3RhY2vkuK3kuIDoiKzpg73nibnlrprnmoTop4TojINcbiAqL1xuY29uc3QgUkVHX1NUQUNLX0RFQ09SQVRFID0gaXNGaXJlZm94ID9cbiAgLyhcXC5qc1xcLyk/X19kZWNvcmF0ZShcXCRcXGQrKT88QC4qXFxkJC8gOlxuICAvKFxcL1xcdytcXC5qc1xcLik/X19kZWNvcmF0ZShcXCRcXGQrKT9cXHMqXFwoLipcXCkkLztcbmNvbnN0IFJFR19TVEFDS19MSU5LID0gL2h0dHBzP1xcOlxcL1xcLy4rXFw6XFxkKlxcLy4qXFwuanNcXDpcXGQrXFw6XFxkKy87XG4vKipcbiAqIGRlYnVn5qih5byP5by65YyW5pel5b+X5L+h5oGvXG4gKiBAcGFyYW0gb3B0aW9uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY2F0Y2hFcnJvcnNEZWNvcmF0b3Iob3B0aW9uczogSUNhdGNoRXJyb3JzRGVjb3JhdG9yT3B0aW9ucykge1xuXG4gIGNvbnN0IHsgbW9kZSA9ICdhc3luYycsIGN1c3RvbUluZm8gPSB7fSwgdGl0bGUsIG1lc3NhZ2VzID0gW10gfSA9IG9wdGlvbnM7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChcbiAgICB0YXJnZXQ6IGFueSxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmcsXG4gICAgZGVzY3JpcHRvcjogVHlwZWRQcm9wZXJ0eURlc2NyaXB0b3I8RnVuY3Rpb24+XG4gICkge1xuICAgIC8vIOeUn+S6p+eOr+Wig+emgeeUqFxuICAgIGlmICghSVNfREVCVUdfTU9ERSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjbGFzc05hbWUgPSBjdXN0b21JbmZvLmNsYXNzTmFtZSB8fCB0YXJnZXQuY29uc3RydWN0b3IubmFtZTtcbiAgICBjb25zdCBmbk5hbWUgPSBjdXN0b21JbmZvLm1ldGhvZE5hbWUgfHwgbWV0aG9kTmFtZTtcbiAgICBjb25zdCBmbiA9IGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgICAvLyDooqtkZWNvcmF0b3Loo4XppbDnmoTmupDnoIFsaW5rXG4gICAgLy8g5ZyoZGVzY3JpcHRvci52YWx1ZeWklumDqOatpOWkhOWIm+W7uueahHN0YWNr5bGC5qyh5Y+v6Kem6L6+5rqQ56CBXG4gICAgLy8g6ICMZGVzY3JpcHRvci52YWx1ZeWGhemDqOacieWPr+iDveeUseS6jnN0YWNr5aSq5rex5peg5rOV6Kem6L6+XG4gICAgY29uc3Qgc291cmNlTGluayA9IGdldFNvdXJjZUxpbmsobmV3IEVycm9yKCkpO1xuXG4gICAgaWYgKG1vZGUgPT09ICdzeW5jJykge1xuICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uICguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICAvLyDmraTlpITnmoRzdGFja+S9nOeUqOS4u+imgeaYr+S4uuS6huiOt+WPluiiq2RlY29yYXRvcuijhemlsOeahOa6kOeggWNsYXNz5ZKMbWV0aG9k5ZCN56ewXG4gICAgICAgIGNvbnN0IGlubmVyRXJyOiBhbnkgPSBnZXRSZXdyaXRlZEVycm9yKHtcbiAgICAgICAgICBlcnI6IG5ldyBFcnJvcigpLFxuICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICBtZXRob2ROYW1lOiBmbk5hbWUsXG4gICAgICAgICAgc291cmNlTGlua1xuICAgICAgICB9KVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbGV0IGZhaWxFcnIgPSBlcnI7XG4gICAgICAgICAgY29uc3QgeyBtZXNzYWdlOiBlcnJNc2cgfSA9IGVycjtcbiAgICAgICAgICBjb25zdCBsb2dzOiBhbnkgPSB7XG4gICAgICAgICAgICB0aXRsZTogdGl0bGUgfHwgYCR7Y2xhc3NOYW1lfS4ke2ZuTmFtZX0gZmFpbGVkYCxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFt7XG4gICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgIGJvZHk6IGVyclxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8g5Y+q54m55q6K5aSE55CGU0RL5Lia5Yqh6YC76L6R5oqb5Ye655qE6ZSZ6K+vLUpTT04gc3RyaW5nXG4gICAgICAgICAgaWYgKGVyck1zZyAmJiAvXlxcey4qXFx9JC8udGVzdChlcnJNc2cpKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBKU09OLnBhcnNlKGVyck1zZyk7XG4gICAgICAgICAgICBsb2dzLnN1YnRpdGxlID0gZXJyTXNnO1xuICAgICAgICAgICAgaWYgKG1zZy5jb2RlKSB7XG4gICAgICAgICAgICAgIGlmIChpbm5lckVycikge1xuICAgICAgICAgICAgICAgIGlubmVyRXJyLmNvZGUgPSBtc2cuY29kZTtcbiAgICAgICAgICAgICAgICBpbm5lckVyci5tc2cgPSBtc2cubXNnO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVyci5jb2RlID0gbXNnLmNvZGVcbiAgICAgICAgICAgICAgICBlcnIubWVzc2FnZSA9IG1zZy5tc2dcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmYWlsRXJyID0gaW5uZXJFcnIgfHwgZXJyO1xuICAgICAgICAgICAgICBsb2dzLmNvbnRlbnQgPSBtZXNzYWdlcy5tYXAobXNnID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICAgICAgICAgICAgYm9keTogbXNnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcHJpbnRHcm91cExvZyhsb2dzKTtcbiAgICAgICAgICB0aHJvdyBmYWlsRXJyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBhc3luYyBmdW5jdGlvbiAoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgY29uc3QgaW5uZXJFcnI6IGFueSA9IGdldFJld3JpdGVkRXJyb3Ioe1xuICAgICAgICAgIGVycjogbmV3IEVycm9yKCksXG4gICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgIG1ldGhvZE5hbWU6IGZuTmFtZSxcbiAgICAgICAgICBzb3VyY2VMaW5rXG4gICAgICAgIH0pXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsZXQgZmFpbEVyciA9IGVycjtcbiAgICAgICAgICBjb25zdCB7IG1lc3NhZ2U6IGVyck1zZyB9ID0gZXJyO1xuICAgICAgICAgIGNvbnN0IGxvZ3M6IGFueSA9IHtcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSB8fCBgJHtjbGFzc05hbWV9LiR7Zm5OYW1lfSBmYWlsZWRgLFxuICAgICAgICAgICAgY29udGVudDogW3tcbiAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgYm9keTogZXJyXG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDlj6rnibnmrorlpITnkIZTREvkuJrliqHpgLvovpHmipvlh7rnmoTplJnor68tSlNPTiBzdHJpbmdcbiAgICAgICAgICBpZiAoZXJyTXNnICYmIC9eXFx7LipcXH0kLy50ZXN0KGVyck1zZykpIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IEpTT04ucGFyc2UoZXJyTXNnKTtcbiAgICAgICAgICAgIGxvZ3Muc3VidGl0bGUgPSBtc2c7XG4gICAgICAgICAgICBpZiAobXNnLmNvZGUpIHtcbiAgICAgICAgICAgICAgaWYgKGlubmVyRXJyKSB7XG4gICAgICAgICAgICAgICAgaW5uZXJFcnIuY29kZSA9IG1zZy5jb2RlO1xuICAgICAgICAgICAgICAgIGlubmVyRXJyLm1lc3NhZ2UgPSBtc2cubXNnO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVyci5jb2RlID0gbXNnLmNvZGVcbiAgICAgICAgICAgICAgICBlcnIubWVzc2FnZSA9IG1zZy5tc2dcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmYWlsRXJyID0gaW5uZXJFcnIgfHwgZXJyO1xuICAgICAgICAgICAgICBsb2dzLmNvbnRlbnQgPSBtZXNzYWdlcy5tYXAobXNnID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICAgICAgICAgICAgYm9keTogbXNnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcHJpbnRHcm91cExvZyhsb2dzKTtcbiAgICAgICAgICB0aHJvdyBmYWlsRXJyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG59XG5cbi8qKlxuICog5Zyo5Y6f5aeL5aCG5qCI5Lit5p+l5om+6KOF6aWw5Zmo5p2h55uu5bm26L+U5Zue5rqQ56CB6ZO+5o6lbGlua1xuICogQHBhcmFtIGVyclxuICovXG5mdW5jdGlvbiBnZXRTb3VyY2VMaW5rKGVycjogRXJyb3IpIHtcbiAgbGV0IHNvdXJjZUxpbmsgPSAnJztcbiAgY29uc3Qgb3V0dGVyRXJyU3RhY2tzID0gZXJyLnN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgY29uc3QgaW5kZXhPZkRlY29yYXRvciA9IG91dHRlckVyclN0YWNrcy5maW5kSW5kZXgoc3RyID0+IFJFR19TVEFDS19ERUNPUkFURS50ZXN0KHN0cikpO1xuICBpZiAoaW5kZXhPZkRlY29yYXRvciAhPT0gLTEpIHtcbiAgICBjb25zdCBtYXRjaCA9IFJFR19TVEFDS19MSU5LLmV4ZWMob3V0dGVyRXJyU3RhY2tzW2luZGV4T2ZEZWNvcmF0b3IgKyAxXSB8fCAnJyk7XG4gICAgc291cmNlTGluayA9IG1hdGNoID8gbWF0Y2hbMF0gOiAnJztcbiAgfVxuICByZXR1cm4gc291cmNlTGluaztcbn1cblxuLyoqXG4gKiDlnKjljp/lp4vloIbmoIjkuK3mn6Xmib7oo4XppbDlmajmnaHnm67vvIzliZTpmaTlhbblkI7nmoTml6DnlKjloIbmoIjvvIzlubblsIbpk77mjqXmm7/mjaLkuLrmupDnoIFsaW5rXG4gKiBAcGFyYW0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBnZXRSZXdyaXRlZEVycm9yKG9wdGlvbnM6IHtcbiAgZXJyOiBFcnJvcjtcbiAgY2xhc3NOYW1lOiBzdHJpbmc7XG4gIG1ldGhvZE5hbWU6IHN0cmluZztcbiAgc291cmNlTGluazogc3RyaW5nO1xufSkge1xuICBjb25zdCB7IGVyciwgY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBzb3VyY2VMaW5rIH0gPSBvcHRpb25zO1xuICAvLyDmib7kuI3liLDmupDnoIFsaW5r6L+U5ZuebnVsbO+8jOWQjue7remAu+i+keWwhuaJk+WNsOWOn+WghuagiOS/oeaBr1xuICBpZiAoIXNvdXJjZUxpbmspIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGlubmVyRXJyU3RhY2sgPSBlcnIuc3RhY2suc3BsaXQoJ1xcbicpO1xuICBjb25zdCBSRUdfU1RBQ0tfSU5ORVJfTUVUSE9EID0gaXNGaXJlZm94ID9cbiAgICAvXmNhdGNoRXJyb3JzRGVjb3JhdG9yXFwvPFxcL2Rlc2NyaXB0b3IudmFsdWVALipcXGQkLyA6XG4gICAgbmV3IFJlZ0V4cChgJHtjbGFzc05hbWV9XFxcXC5kZXNjcmlwdG9yLnZhbHVlXFxcXHMqXFxcXFthc1xcXFxzJHttZXRob2ROYW1lfVxcXFxdXFxcXHMqXFxcXCguKlxcXFwpJGApO1xuICBjb25zdCBSRUdfU1RBQ0tfSU5ORVJfTUVUSE9EX1dJVEhPVVRfTElOSyA9IGlzRmlyZWZveCA/XG4gICAgL15jYXRjaEVycm9yc0RlY29yYXRvclxcLzxcXC9kZXNjcmlwdG9yLnZhbHVlLyA6XG4gICAgbmV3IFJlZ0V4cChgJHtjbGFzc05hbWV9XFxcXC5kZXNjcmlwdG9yLnZhbHVlXFxcXHMqXFxcXFthc1xcXFxzJHttZXRob2ROYW1lfVxcXFxdYCk7XG4gIGNvbnN0IGluZGV4T2ZTb3VyY2UgPSBpbm5lckVyclN0YWNrLmZpbmRJbmRleChzdHIgPT4gUkVHX1NUQUNLX0lOTkVSX01FVEhPRC50ZXN0KHN0cikpO1xuICBsZXQgaW5uZXJFcnI6IEVycm9yO1xuICBpZiAoaW5kZXhPZlNvdXJjZSAhPT0gLTEpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcmVhbEVyclN0YWNrID0gaW5uZXJFcnJTdGFjay5maWx0ZXIoKHYsIGkpID0+IHtcbiAgICAgIHJldHVybiBpID4gaW5kZXhPZlNvdXJjZVxuICAgIH0pO1xuICAgIHJlYWxFcnJTdGFjay51bnNoaWZ0KGlubmVyRXJyU3RhY2tbaW5kZXhPZlNvdXJjZV1cbiAgICAgIC5yZXBsYWNlKFJFR19TVEFDS19JTk5FUl9NRVRIT0RfV0lUSE9VVF9MSU5LLCBgJHtjbGFzc05hbWV9LiR7bWV0aG9kTmFtZX1gKVxuICAgICAgLnJlcGxhY2UoUkVHX1NUQUNLX0xJTkssIHNvdXJjZUxpbmspKTtcbiAgICBpbm5lckVyciA9IG5ldyBFcnJvcigpO1xuICAgIGlubmVyRXJyLnN0YWNrID0gYCR7aXNGaXJlZm94ID8gJ0BkZWJ1Z2dlcicgOiAnRXJyb3InfVxcbiR7cmVhbEVyclN0YWNrLmpvaW4oJ1xcbicpfWA7XG4gIH1cbiAgcmV0dXJuIGlubmVyRXJyO1xufSJdfQ==