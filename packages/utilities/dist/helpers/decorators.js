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
                    var errMsg = err.message, error = err.error, error_description = err.error_description;
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
                    if (error && error_description) {
                        logs.subtitle = error_description;
                        if (innerErr) {
                            innerErr.code = error;
                            innerErr.msg = error_description;
                        }
                        else {
                            err.code = error;
                            err.message = error_description;
                        }
                        failErr = innerErr || err;
                        logs.content = messages.map(function (msg) {
                            return {
                                type: 'info',
                                body: msg
                            };
                        });
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
                    var innerErr, err_1, failErr, errMsg, error, error_description, logs, msg;
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
                                errMsg = err_1.message, error = err_1.error, error_description = err_1.error_description;
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
                                if (error && error_description) {
                                    logs.subtitle = error_description;
                                    if (innerErr) {
                                        innerErr.code = error;
                                        innerErr.msg = error_description;
                                    }
                                    else {
                                        err_1.code = error;
                                        err_1.message = error_description;
                                    }
                                    failErr = innerErr || err_1;
                                    logs.content = messages.map(function (msg) {
                                        return {
                                            type: 'info',
                                            body: msg
                                        };
                                    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2RlY29yYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQTZDO0FBQzdDLDBDQUE2QztBQVk3QyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDdEIsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLFNBQVMsRUFBRTtJQUMzRCxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Q0FDM0Q7QUFJRCxJQUFNLGtCQUFrQixHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLG9DQUFvQyxDQUFDLENBQUM7SUFDdEMsNENBQTRDLENBQUM7QUFDL0MsSUFBTSxjQUFjLEdBQUcsdUNBQXVDLENBQUM7QUFLL0QsU0FBZ0Isb0JBQW9CLENBQUMsT0FBcUM7SUFFaEUsSUFBQSxLQUEwRCxPQUFPLEtBQW5ELEVBQWQsSUFBSSxtQkFBRyxPQUFPLEtBQUEsRUFBRSxLQUEwQyxPQUFPLFdBQWxDLEVBQWYsVUFBVSxtQkFBRyxFQUFFLEtBQUEsRUFBRSxLQUFLLEdBQW9CLE9BQU8sTUFBM0IsRUFBRSxLQUFrQixPQUFPLFNBQVosRUFBYixRQUFRLG1CQUFHLEVBQUUsS0FBQSxDQUFhO0lBRTFFLE9BQU8sVUFDTCxNQUFXLEVBQ1gsVUFBa0IsRUFDbEIsVUFBNkM7UUFHN0MsSUFBSSxDQUFDLHlCQUFhLEVBQUU7WUFDbEIsT0FBTztTQUNSO1FBQ0QsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUNsRSxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQztRQUNuRCxJQUFNLEVBQUUs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QUFNLENBQUksU0FBUyx1Q0FBa0MsVUFBVSxRQUFLLENBQUMsQ0FBQztJQUM1RSxJQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUM7SUFDdkYsSUFBSSxRQUFlLENBQUM7SUFDcEIsSUFBSSxhQUFhLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFFeEIsSUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDO1lBQzdDLE9BQU8sQ0FBQyxHQUFHLGFBQWEsQ0FBQTtRQUMxQixDQUFDLENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQzthQUM5QyxPQUFPLENBQUMsbUNBQW1DLEVBQUssU0FBUyxTQUFJLFVBQVksQ0FBQzthQUMxRSxPQUFPLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDeEMsUUFBUSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFDdkIsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLFdBQUssWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQztLQUNyRjtJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcmludEdyb3VwTG9nIH0gZnJvbSBcIi4uL2xpYnMvdXRpbFwiO1xuaW1wb3J0IHsgSVNfREVCVUdfTU9ERSB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcblxuaW50ZXJmYWNlIElDYXRjaEVycm9yc0RlY29yYXRvck9wdGlvbnMge1xuICBtb2RlPzogJ3N5bmMnIHwgJ2FzeW5jJztcbiAgY3VzdG9tSW5mbz86IHtcbiAgICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gICAgbWV0aG9kTmFtZT86IHN0cmluZztcbiAgfTtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIG1lc3NhZ2VzPzogc3RyaW5nW107XG59XG4vLyBmaXJlZm9455qEc3RhY2vmoLzlvI/kuI5jaHJvbWXkuI3lkIxcbmxldCBpc0ZpcmVmb3ggPSBmYWxzZTtcbmlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gIGlzRmlyZWZveCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkZpcmVmb3hcIikgIT09IC0xO1xufVxuLyoqXG4gKiBkZWNvcmF0ZeWcqHN0YWNr5Lit5LiA6Iis6YO954m55a6a55qE6KeE6IyDXG4gKi9cbmNvbnN0IFJFR19TVEFDS19ERUNPUkFURSA9IGlzRmlyZWZveCA/XG4gIC8oXFwuanNcXC8pP19fZGVjb3JhdGUoXFwkXFxkKyk/PEAuKlxcZCQvIDpcbiAgLyhcXC9cXHcrXFwuanNcXC4pP19fZGVjb3JhdGUoXFwkXFxkKyk/XFxzKlxcKC4qXFwpJC87XG5jb25zdCBSRUdfU1RBQ0tfTElOSyA9IC9odHRwcz9cXDpcXC9cXC8uK1xcOlxcZCpcXC8uKlxcLmpzXFw6XFxkK1xcOlxcZCsvO1xuLyoqXG4gKiBkZWJ1Z+aooeW8j+W8uuWMluaXpeW/l+S/oeaBr1xuICogQHBhcmFtIG9wdGlvbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhdGNoRXJyb3JzRGVjb3JhdG9yKG9wdGlvbnM6IElDYXRjaEVycm9yc0RlY29yYXRvck9wdGlvbnMpIHtcblxuICBjb25zdCB7IG1vZGUgPSAnYXN5bmMnLCBjdXN0b21JbmZvID0ge30sIHRpdGxlLCBtZXNzYWdlcyA9IFtdIH0gPSBvcHRpb25zO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoXG4gICAgdGFyZ2V0OiBhbnksXG4gICAgbWV0aG9kTmFtZTogc3RyaW5nLFxuICAgIGRlc2NyaXB0b3I6IFR5cGVkUHJvcGVydHlEZXNjcmlwdG9yPEZ1bmN0aW9uPlxuICApIHtcbiAgICAvLyDnlJ/kuqfnjq/looPnpoHnlKhcbiAgICBpZiAoIUlTX0RFQlVHX01PREUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY2xhc3NOYW1lID0gY3VzdG9tSW5mby5jbGFzc05hbWUgfHwgdGFyZ2V0LmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgY29uc3QgZm5OYW1lID0gY3VzdG9tSW5mby5tZXRob2ROYW1lIHx8IG1ldGhvZE5hbWU7XG4gICAgY29uc3QgZm4gPSBkZXNjcmlwdG9yLnZhbHVlO1xuXG4gICAgLy8g6KKrZGVjb3JhdG9y6KOF6aWw55qE5rqQ56CBbGlua1xuICAgIC8vIOWcqGRlc2NyaXB0b3IudmFsdWXlpJbpg6jmraTlpITliJvlu7rnmoRzdGFja+WxguasoeWPr+inpui+vua6kOeggVxuICAgIC8vIOiAjGRlc2NyaXB0b3IudmFsdWXlhoXpg6jmnInlj6/og73nlLHkuo5zdGFja+Wkqua3seaXoOazleinpui+vlxuICAgIGNvbnN0IHNvdXJjZUxpbmsgPSBnZXRTb3VyY2VMaW5rKG5ldyBFcnJvcigpKTtcblxuICAgIGlmIChtb2RlID09PSAnc3luYycpIHtcbiAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiAoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgLy8g5q2k5aSE55qEc3RhY2vkvZznlKjkuLvopoHmmK/kuLrkuobojrflj5booqtkZWNvcmF0b3Loo4XppbDnmoTmupDnoIFjbGFzc+WSjG1ldGhvZOWQjeensFxuICAgICAgICBjb25zdCBpbm5lckVycjogYW55ID0gZ2V0UmV3cml0ZWRFcnJvcih7XG4gICAgICAgICAgZXJyOiBuZXcgRXJyb3IoKSxcbiAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgbWV0aG9kTmFtZTogZm5OYW1lLFxuICAgICAgICAgIHNvdXJjZUxpbmtcbiAgICAgICAgfSlcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxldCBmYWlsRXJyID0gZXJyO1xuICAgICAgICAgIGNvbnN0IHsgbWVzc2FnZTogZXJyTXNnLCBlcnJvciwgZXJyb3JfZGVzY3JpcHRpb24gfSA9IGVycjtcbiAgICAgICAgICBjb25zdCBsb2dzOiBhbnkgPSB7XG4gICAgICAgICAgICB0aXRsZTogdGl0bGUgfHwgYCR7Y2xhc3NOYW1lfS4ke2ZuTmFtZX0gZmFpbGVkYCxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFt7XG4gICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgIGJvZHk6IGVyclxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8g5Y+q54m55q6K5aSE55CGU0RL5Lia5Yqh6YC76L6R5oqb5Ye655qE6ZSZ6K+vLUpTT04gc3RyaW5nXG4gICAgICAgICAgaWYgKGVyck1zZyAmJiAvXlxcey4qXFx9JC8udGVzdChlcnJNc2cpKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBKU09OLnBhcnNlKGVyck1zZyk7XG4gICAgICAgICAgICBsb2dzLnN1YnRpdGxlID0gZXJyTXNnO1xuICAgICAgICAgICAgaWYgKG1zZy5jb2RlKSB7XG4gICAgICAgICAgICAgIGlmIChpbm5lckVycikge1xuICAgICAgICAgICAgICAgIGlubmVyRXJyLmNvZGUgPSBtc2cuY29kZTtcbiAgICAgICAgICAgICAgICBpbm5lckVyci5tc2cgPSBtc2cubXNnO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVyci5jb2RlID0gbXNnLmNvZGVcbiAgICAgICAgICAgICAgICBlcnIubWVzc2FnZSA9IG1zZy5tc2dcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmYWlsRXJyID0gaW5uZXJFcnIgfHwgZXJyO1xuICAgICAgICAgICAgICBsb2dzLmNvbnRlbnQgPSBtZXNzYWdlcy5tYXAobXNnID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICAgICAgICAgICAgYm9keTogbXNnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBvYXV0aCDplJnor6/nibnmrorlpITnkIZcbiAgICAgICAgICBpZiAoZXJyb3IgJiYgZXJyb3JfZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIGxvZ3Muc3VidGl0bGUgPSBlcnJvcl9kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIGlmIChpbm5lckVycikge1xuICAgICAgICAgICAgICBpbm5lckVyci5jb2RlID0gZXJyb3I7XG4gICAgICAgICAgICAgIGlubmVyRXJyLm1zZyA9IGVycm9yX2Rlc2NyaXB0aW9uO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXJyLmNvZGUgPSBlcnJvclxuICAgICAgICAgICAgICBlcnIubWVzc2FnZSA9IGVycm9yX2Rlc2NyaXB0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmYWlsRXJyID0gaW5uZXJFcnIgfHwgZXJyO1xuICAgICAgICAgICAgbG9ncy5jb250ZW50ID0gbWVzc2FnZXMubWFwKG1zZyA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICAgICAgICAgIGJvZHk6IG1zZ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcHJpbnRHcm91cExvZyhsb2dzKTtcbiAgICAgICAgICB0aHJvdyBmYWlsRXJyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBhc3luYyBmdW5jdGlvbiAoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgY29uc3QgaW5uZXJFcnI6IGFueSA9IGdldFJld3JpdGVkRXJyb3Ioe1xuICAgICAgICAgIGVycjogbmV3IEVycm9yKCksXG4gICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgIG1ldGhvZE5hbWU6IGZuTmFtZSxcbiAgICAgICAgICBzb3VyY2VMaW5rXG4gICAgICAgIH0pXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgZm4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxldCBmYWlsRXJyID0gZXJyO1xuICAgICAgICAgIGNvbnN0IHsgbWVzc2FnZTogZXJyTXNnLCBlcnJvciwgZXJyb3JfZGVzY3JpcHRpb24gfSA9IGVycjtcbiAgICAgICAgICBjb25zdCBsb2dzOiBhbnkgPSB7XG4gICAgICAgICAgICB0aXRsZTogdGl0bGUgfHwgYCR7Y2xhc3NOYW1lfS4ke2ZuTmFtZX0gZmFpbGVkYCxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFt7XG4gICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgIGJvZHk6IGVyclxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8g5Y+q54m55q6K5aSE55CGU0RL5Lia5Yqh6YC76L6R5oqb5Ye655qE6ZSZ6K+vLUpTT04gc3RyaW5nXG4gICAgICAgICAgaWYgKGVyck1zZyAmJiAvXlxcey4qXFx9JC8udGVzdChlcnJNc2cpKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBKU09OLnBhcnNlKGVyck1zZyk7XG4gICAgICAgICAgICBsb2dzLnN1YnRpdGxlID0gbXNnO1xuICAgICAgICAgICAgaWYgKG1zZy5jb2RlKSB7XG4gICAgICAgICAgICAgIGlmIChpbm5lckVycikge1xuICAgICAgICAgICAgICAgIGlubmVyRXJyLmNvZGUgPSBtc2cuY29kZTtcbiAgICAgICAgICAgICAgICBpbm5lckVyci5tZXNzYWdlID0gbXNnLm1zZztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlcnIuY29kZSA9IG1zZy5jb2RlXG4gICAgICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPSBtc2cubXNnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZmFpbEVyciA9IGlubmVyRXJyIHx8IGVycjtcbiAgICAgICAgICAgICAgbG9ncy5jb250ZW50ID0gbWVzc2FnZXMubWFwKG1zZyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgICAgICAgICAgIGJvZHk6IG1zZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gb2F1dGgg6ZSZ6K+v54m55q6K5aSE55CGXG4gICAgICAgICAgaWYgKGVycm9yICYmIGVycm9yX2Rlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBsb2dzLnN1YnRpdGxlID0gZXJyb3JfZGVzY3JpcHRpb247XG4gICAgICAgICAgICBpZiAoaW5uZXJFcnIpIHtcbiAgICAgICAgICAgICAgaW5uZXJFcnIuY29kZSA9IGVycm9yO1xuICAgICAgICAgICAgICBpbm5lckVyci5tc2cgPSBlcnJvcl9kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVyci5jb2RlID0gZXJyb3JcbiAgICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPSBlcnJvcl9kZXNjcmlwdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmFpbEVyciA9IGlubmVyRXJyIHx8IGVycjtcbiAgICAgICAgICAgIGxvZ3MuY29udGVudCA9IG1lc3NhZ2VzLm1hcChtc2cgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgICAgICAgICBib2R5OiBtc2dcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHByaW50R3JvdXBMb2cobG9ncyk7XG4gICAgICAgICAgdGhyb3cgZmFpbEVycjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9O1xufVxuXG4vKipcbiAqIOWcqOWOn+Wni+WghuagiOS4reafpeaJvuijhemlsOWZqOadoeebruW5tui/lOWbnua6kOeggemTvuaOpWxpbmtcbiAqIEBwYXJhbSBlcnJcbiAqL1xuZnVuY3Rpb24gZ2V0U291cmNlTGluayhlcnI6IEVycm9yKSB7XG4gIGxldCBzb3VyY2VMaW5rID0gJyc7XG4gIGNvbnN0IG91dHRlckVyclN0YWNrcyA9IGVyci5zdGFjay5zcGxpdCgnXFxuJyk7XG4gIGNvbnN0IGluZGV4T2ZEZWNvcmF0b3IgPSBvdXR0ZXJFcnJTdGFja3MuZmluZEluZGV4KHN0ciA9PiBSRUdfU1RBQ0tfREVDT1JBVEUudGVzdChzdHIpKTtcblxuICBpZiAoaW5kZXhPZkRlY29yYXRvciAhPT0gLTEpIHtcbiAgICBjb25zdCBtYXRjaCA9IFJFR19TVEFDS19MSU5LLmV4ZWMob3V0dGVyRXJyU3RhY2tzW2luZGV4T2ZEZWNvcmF0b3IgKyAxXSB8fCAnJyk7XG5cbiAgICBzb3VyY2VMaW5rID0gbWF0Y2ggPyBtYXRjaFswXSA6ICcnO1xuICB9XG4gIHJldHVybiBzb3VyY2VMaW5rO1xufVxuXG4vKipcbiAqIOWcqOWOn+Wni+WghuagiOS4reafpeaJvuijhemlsOWZqOadoeebru+8jOWJlOmZpOWFtuWQjueahOaXoOeUqOWghuagiO+8jOW5tuWwhumTvuaOpeabv+aNouS4uua6kOeggWxpbmtcbiAqIEBwYXJhbSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGdldFJld3JpdGVkRXJyb3Iob3B0aW9uczoge1xuICBlcnI6IEVycm9yO1xuICBjbGFzc05hbWU6IHN0cmluZztcbiAgbWV0aG9kTmFtZTogc3RyaW5nO1xuICBzb3VyY2VMaW5rOiBzdHJpbmc7XG59KSB7XG4gIGNvbnN0IHsgZXJyLCBjbGFzc05hbWUsIG1ldGhvZE5hbWUsIHNvdXJjZUxpbmsgfSA9IG9wdGlvbnM7XG4gIC8vIOaJvuS4jeWIsOa6kOeggWxpbmvov5Tlm55udWxs77yM5ZCO57ut6YC76L6R5bCG5omT5Y2w5Y6f5aCG5qCI5L+h5oGvXG4gIGlmICghc291cmNlTGluaykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgaW5uZXJFcnJTdGFjayA9IGVyci5zdGFjay5zcGxpdCgnXFxuJyk7XG4gIGNvbnN0IFJFR19TVEFDS19JTk5FUl9NRVRIT0QgPSBpc0ZpcmVmb3ggP1xuICAgIC9eY2F0Y2hFcnJvcnNEZWNvcmF0b3JcXC88XFwvZGVzY3JpcHRvci52YWx1ZUAuKlxcZCQvIDpcbiAgICBuZXcgUmVnRXhwKGAke2NsYXNzTmFtZX1cXFxcLmRlc2NyaXB0b3IudmFsdWVcXFxccypcXFxcW2FzXFxcXHMke21ldGhvZE5hbWV9XFxcXF1cXFxccypcXFxcKC4qXFxcXCkkYCk7XG4gIGNvbnN0IFJFR19TVEFDS19JTk5FUl9NRVRIT0RfV0lUSE9VVF9MSU5LID0gaXNGaXJlZm94ID9cbiAgICAvXmNhdGNoRXJyb3JzRGVjb3JhdG9yXFwvPFxcL2Rlc2NyaXB0b3IudmFsdWUvIDpcbiAgICBuZXcgUmVnRXhwKGAke2NsYXNzTmFtZX1cXFxcLmRlc2NyaXB0b3IudmFsdWVcXFxccypcXFxcW2FzXFxcXHMke21ldGhvZE5hbWV9XFxcXF1gKTtcbiAgY29uc3QgaW5kZXhPZlNvdXJjZSA9IGlubmVyRXJyU3RhY2suZmluZEluZGV4KHN0ciA9PiBSRUdfU1RBQ0tfSU5ORVJfTUVUSE9ELnRlc3Qoc3RyKSk7XG4gIGxldCBpbm5lckVycjogRXJyb3I7XG4gIGlmIChpbmRleE9mU291cmNlICE9PSAtMSkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCByZWFsRXJyU3RhY2sgPSBpbm5lckVyclN0YWNrLmZpbHRlcigodiwgaSkgPT4ge1xuICAgICAgcmV0dXJuIGkgPiBpbmRleE9mU291cmNlXG4gICAgfSk7XG4gICAgcmVhbEVyclN0YWNrLnVuc2hpZnQoaW5uZXJFcnJTdGFja1tpbmRleE9mU291cmNlXVxuICAgICAgLnJlcGxhY2UoUkVHX1NUQUNLX0lOTkVSX01FVEhPRF9XSVRIT1VUX0xJTkssIGAke2NsYXNzTmFtZX0uJHttZXRob2ROYW1lfWApXG4gICAgICAucmVwbGFjZShSRUdfU1RBQ0tfTElOSywgc291cmNlTGluaykpO1xuICAgIGlubmVyRXJyID0gbmV3IEVycm9yKCk7XG4gICAgaW5uZXJFcnIuc3RhY2sgPSBgJHtpc0ZpcmVmb3ggPyAnQGRlYnVnZ2VyJyA6ICdFcnJvcid9XFxuJHtyZWFsRXJyU3RhY2suam9pbignXFxuJyl9YDtcbiAgfVxuICByZXR1cm4gaW5uZXJFcnI7XG59Il19