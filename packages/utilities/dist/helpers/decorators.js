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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2RlY29yYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQTZDO0FBQzdDLDBDQUE2QztBQVk3QyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDdEIsSUFBRyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLFNBQVMsRUFBQztJQUN6RCxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Q0FDM0Q7QUFJRCxJQUFNLGtCQUFrQixHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLG9DQUFvQyxDQUFDLENBQUM7SUFDdEMsNENBQTRDLENBQUM7QUFDL0MsSUFBTSxjQUFjLEdBQUcsdUNBQXVDLENBQUM7QUFLL0QsU0FBZ0Isb0JBQW9CLENBQUMsT0FBb0M7SUFFL0QsSUFBQSxLQUFvRCxPQUFPLEtBQS9DLEVBQVosSUFBSSxtQkFBQyxPQUFPLEtBQUEsRUFBRSxLQUFzQyxPQUFPLFdBQWhDLEVBQWIsVUFBVSxtQkFBQyxFQUFFLEtBQUEsRUFBRSxLQUFLLEdBQWtCLE9BQU8sTUFBekIsRUFBRSxLQUFnQixPQUFPLFNBQVosRUFBWCxRQUFRLG1CQUFDLEVBQUUsS0FBQSxDQUFhO0lBRXBFLE9BQU8sVUFDTCxNQUFXLEVBQ1gsVUFBa0IsRUFDbEIsVUFBNkM7UUFHN0MsSUFBRyxDQUFDLHlCQUFhLEVBQUM7WUFDaEIsT0FBTztTQUNSO1FBQ0QsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUNsRSxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQztRQUNuRCxJQUFNLEVBQUUs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QUMsT0FBTyxXQUFLLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFHLENBQUM7S0FDckY7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJpbnRHcm91cExvZyB9IGZyb20gXCIuLi9saWJzL3V0aWxcIjtcbmltcG9ydCB7IElTX0RFQlVHX01PREUgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5cbmludGVyZmFjZSBJQ2F0Y2hFcnJvcnNEZWNvcmF0b3JPcHRpb25zIHtcbiAgbW9kZT86ICdzeW5jJ3wnYXN5bmMnO1xuICBjdXN0b21JbmZvPzoge1xuICAgIGNsYXNzTmFtZT86IHN0cmluZztcbiAgICBtZXRob2ROYW1lPzogc3RyaW5nO1xuICB9O1xuICB0aXRsZT86IHN0cmluZztcbiAgbWVzc2FnZXM/OiBzdHJpbmdbXTtcbn1cbi8vIGZpcmVmb3jnmoRzdGFja+agvOW8j+S4jmNocm9tZeS4jeWQjFxubGV0IGlzRmlyZWZveCA9IGZhbHNlO1xuaWYodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCl7XG4gIGlzRmlyZWZveCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkZpcmVmb3hcIikgIT09IC0xO1xufVxuLyoqXG4gKiBkZWNvcmF0ZeWcqHN0YWNr5Lit5LiA6Iis6YO954m55a6a55qE6KeE6IyDXG4gKi9cbmNvbnN0IFJFR19TVEFDS19ERUNPUkFURSA9IGlzRmlyZWZveCA/IFxuICAvKFxcLmpzXFwvKT9fX2RlY29yYXRlKFxcJFxcZCspPzxALipcXGQkLyA6IFxuICAvKFxcL1xcdytcXC5qc1xcLik/X19kZWNvcmF0ZShcXCRcXGQrKT9cXHMqXFwoLipcXCkkLztcbmNvbnN0IFJFR19TVEFDS19MSU5LID0gL2h0dHBzP1xcOlxcL1xcLy4rXFw6XFxkKlxcLy4qXFwuanNcXDpcXGQrXFw6XFxkKy87XG4vKipcbiAqIGRlYnVn5qih5byP5by65YyW5pel5b+X5L+h5oGvXG4gKiBAcGFyYW0gb3B0aW9ucyBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhdGNoRXJyb3JzRGVjb3JhdG9yKG9wdGlvbnM6SUNhdGNoRXJyb3JzRGVjb3JhdG9yT3B0aW9ucyl7XG5cbiAgY29uc3QgeyBtb2RlPSdhc3luYycsIGN1c3RvbUluZm89e30sIHRpdGxlLCBtZXNzYWdlcz1bXSB9ID0gb3B0aW9ucztcblxuICByZXR1cm4gZnVuY3Rpb24oXG4gICAgdGFyZ2V0OiBhbnksXG4gICAgbWV0aG9kTmFtZTogc3RyaW5nLFxuICAgIGRlc2NyaXB0b3I6IFR5cGVkUHJvcGVydHlEZXNjcmlwdG9yPEZ1bmN0aW9uPlxuICApIHtcbiAgICAvLyDnlJ/kuqfnjq/looPnpoHnlKhcbiAgICBpZighSVNfREVCVUdfTU9ERSl7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGN1c3RvbUluZm8uY2xhc3NOYW1lIHx8IHRhcmdldC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIGNvbnN0IGZuTmFtZSA9IGN1c3RvbUluZm8ubWV0aG9kTmFtZSB8fCBtZXRob2ROYW1lO1xuICAgIGNvbnN0IGZuID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgICBcbiAgICAvLyDooqtkZWNvcmF0b3Loo4XppbDnmoTmupDnoIFsaW5rXG4gICAgLy8g5ZyoZGVzY3JpcHRvci52YWx1ZeWklumDqOatpOWkhOWIm+W7uueahHN0YWNr5bGC5qyh5Y+v6Kem6L6+5rqQ56CBXG4gICAgLy8g6ICMZGVzY3JpcHRvci52YWx1ZeWGhemDqOacieWPr+iDveeUseS6jnN0YWNr5aSq5rex5peg5rOV6Kem6L6+XG4gICAgY29uc3Qgc291cmNlTGluayA9IGdldFNvdXJjZUxpbmsobmV3IEVycm9yKCkpO1xuICAgIFxuICAgIGlmKG1vZGUgPT09ICdzeW5jJyl7XG4gICAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24oLi4uYXJnczphbnlbXSkge1xuICAgICAgICAvLyDmraTlpITnmoRzdGFja+S9nOeUqOS4u+imgeaYr+S4uuS6huiOt+WPluiiq2RlY29yYXRvcuijhemlsOeahOa6kOeggWNsYXNz5ZKMbWV0aG9k5ZCN56ewXG4gICAgICAgIGNvbnN0IGlubmVyRXJyID0gZ2V0UmV3cml0ZWRFcnJvcih7XG4gICAgICAgICAgZXJyOiBuZXcgRXJyb3IoKSxcbiAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgbWV0aG9kTmFtZTogZm5OYW1lLFxuICAgICAgICAgIHNvdXJjZUxpbmtcbiAgICAgICAgfSlcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxldCBmYWlsRXJyID0gZXJyO1xuICAgICAgICAgIGNvbnN0IHsgbWVzc2FnZTogZXJyTXNnIH0gPSBlcnI7XG4gICAgICAgICAgY29uc3QgbG9nczphbnkgPSB7XG4gICAgICAgICAgICB0aXRsZTogdGl0bGV8fGAke2NsYXNzTmFtZX0uJHtmbk5hbWV9IGZhaWxlZGAsXG4gICAgICAgICAgICBjb250ZW50OiBbe1xuICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICBib2R5OiBlcnJcbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIOWPqueJueauiuWkhOeQhlNES+S4muWKoemAu+i+keaKm+WHuueahOmUmeivry1KU09OIHN0cmluZ1xuICAgICAgICAgIGlmKGVyck1zZyYmL15cXHsuKlxcfSQvLnRlc3QoZXJyTXNnKSl7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBKU09OLnBhcnNlKGVyck1zZyk7XG4gICAgICAgICAgICBsb2dzLnN1YnRpdGxlID0gZXJyTXNnO1xuICAgICAgICAgICAgaWYobXNnLmNvZGUpe1xuICAgICAgICAgICAgICBmYWlsRXJyID0gaW5uZXJFcnIgfHwgZXJyO1xuICAgICAgICAgICAgICBsb2dzLmNvbnRlbnQgPSBtZXNzYWdlcy5tYXAobXNnPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgICAgICAgICAgIGJvZHk6IG1zZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHByaW50R3JvdXBMb2cobG9ncyk7XG4gICAgICAgICAgdGhyb3cgZmFpbEVycjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IGFzeW5jIGZ1bmN0aW9uKC4uLmFyZ3M6YW55W10pIHsgICBcbiAgICAgICAgY29uc3QgaW5uZXJFcnIgPSBnZXRSZXdyaXRlZEVycm9yKHtcbiAgICAgICAgICBlcnI6IG5ldyBFcnJvcigpLFxuICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICBtZXRob2ROYW1lOiBmbk5hbWUsXG4gICAgICAgICAgc291cmNlTGlua1xuICAgICAgICB9KVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbGV0IGZhaWxFcnIgPSBlcnI7XG4gICAgICAgICAgY29uc3QgeyBtZXNzYWdlOiBlcnJNc2cgfSA9IGVycjtcbiAgICAgICAgICBjb25zdCBsb2dzOmFueSA9IHtcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZXx8YCR7Y2xhc3NOYW1lfS4ke2ZuTmFtZX0gZmFpbGVkYCxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFt7XG4gICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgIGJvZHk6IGVyclxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8g5Y+q54m55q6K5aSE55CGU0RL5Lia5Yqh6YC76L6R5oqb5Ye655qE6ZSZ6K+vLUpTT04gc3RyaW5nXG4gICAgICAgICAgaWYoZXJyTXNnJiYvXlxcey4qXFx9JC8udGVzdChlcnJNc2cpKXtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IEpTT04ucGFyc2UoZXJyTXNnKTtcbiAgICAgICAgICAgIGxvZ3Muc3VidGl0bGUgPSBtc2c7XG4gICAgICAgICAgICBpZihtc2cuY29kZSl7XG4gICAgICAgICAgICAgIGZhaWxFcnIgPSBpbm5lckVyciB8fCBlcnI7XG4gICAgICAgICAgICAgIGxvZ3MuY29udGVudCA9IG1lc3NhZ2VzLm1hcChtc2c9PntcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICAgICAgICAgICAgYm9keTogbXNnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcHJpbnRHcm91cExvZyhsb2dzKTtcbiAgICAgICAgICB0aHJvdyBmYWlsRXJyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICBcbiAgfTtcbn1cblxuLyoqXG4gKiDlnKjljp/lp4vloIbmoIjkuK3mn6Xmib7oo4XppbDlmajmnaHnm67lubbov5Tlm57mupDnoIHpk77mjqVsaW5rXG4gKiBAcGFyYW0gZXJyIFxuICovXG5mdW5jdGlvbiBnZXRTb3VyY2VMaW5rKGVycjpFcnJvcil7XG4gIGxldCBzb3VyY2VMaW5rID0gJyc7XG4gIGNvbnN0IG91dHRlckVyclN0YWNrcyA9IGVyci5zdGFjay5zcGxpdCgnXFxuJyk7XG4gIGNvbnN0IGluZGV4T2ZEZWNvcmF0b3IgPSBvdXR0ZXJFcnJTdGFja3MuZmluZEluZGV4KHN0cj0+UkVHX1NUQUNLX0RFQ09SQVRFLnRlc3Qoc3RyKSk7XG4gIGlmKGluZGV4T2ZEZWNvcmF0b3IhPT0tMSl7XG4gICAgY29uc3QgbWF0Y2ggPSBSRUdfU1RBQ0tfTElOSy5leGVjKG91dHRlckVyclN0YWNrc1tpbmRleE9mRGVjb3JhdG9yKzFdfHwnJyk7XG4gICAgc291cmNlTGluayA9IG1hdGNoP21hdGNoWzBdOicnO1xuICB9XG4gIHJldHVybiBzb3VyY2VMaW5rO1xufVxuXG4vKipcbiAqIOWcqOWOn+Wni+WghuagiOS4reafpeaJvuijhemlsOWZqOadoeebru+8jOWJlOmZpOWFtuWQjueahOaXoOeUqOWghuagiO+8jOW5tuWwhumTvuaOpeabv+aNouS4uua6kOeggWxpbmtcbiAqIEBwYXJhbSBvcHRpb25zIFxuICovXG5mdW5jdGlvbiBnZXRSZXdyaXRlZEVycm9yKG9wdGlvbnM6IHtcbiAgZXJyOkVycm9yO1xuICBjbGFzc05hbWU6c3RyaW5nO1xuICBtZXRob2ROYW1lOnN0cmluZztcbiAgc291cmNlTGluazpzdHJpbmc7XG59KXtcbiAgY29uc3QgeyBlcnIsIGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgc291cmNlTGlua30gPSBvcHRpb25zO1xuICAvLyDmib7kuI3liLDmupDnoIFsaW5r6L+U5ZuebnVsbO+8jOWQjue7remAu+i+keWwhuaJk+WNsOWOn+WghuagiOS/oeaBr1xuICBpZighc291cmNlTGluayl7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgXG4gIGNvbnN0IGlubmVyRXJyU3RhY2sgPSBlcnIuc3RhY2suc3BsaXQoJ1xcbicpO1xuICBjb25zdCBSRUdfU1RBQ0tfSU5ORVJfTUVUSE9EID0gaXNGaXJlZm94ID9cbiAgICAvXmNhdGNoRXJyb3JzRGVjb3JhdG9yXFwvPFxcL2Rlc2NyaXB0b3IudmFsdWVALipcXGQkLyA6IFxuICAgIG5ldyBSZWdFeHAoYCR7Y2xhc3NOYW1lfVxcXFwuZGVzY3JpcHRvci52YWx1ZVxcXFxzKlxcXFxbYXNcXFxccyR7bWV0aG9kTmFtZX1cXFxcXVxcXFxzKlxcXFwoLipcXFxcKSRgKTtcbiAgY29uc3QgUkVHX1NUQUNLX0lOTkVSX01FVEhPRF9XSVRIT1VUX0xJTksgPSBpc0ZpcmVmb3ggP1xuICAgIC9eY2F0Y2hFcnJvcnNEZWNvcmF0b3JcXC88XFwvZGVzY3JpcHRvci52YWx1ZS8gOiBcbiAgICBuZXcgUmVnRXhwKGAke2NsYXNzTmFtZX1cXFxcLmRlc2NyaXB0b3IudmFsdWVcXFxccypcXFxcW2FzXFxcXHMke21ldGhvZE5hbWV9XFxcXF1gKTtcbiAgY29uc3QgaW5kZXhPZlNvdXJjZSA9IGlubmVyRXJyU3RhY2suZmluZEluZGV4KHN0cj0+UkVHX1NUQUNLX0lOTkVSX01FVEhPRC50ZXN0KHN0cikpO1xuICBsZXQgaW5uZXJFcnI6RXJyb3I7XG4gIGlmKGluZGV4T2ZTb3VyY2UgIT09IC0xKXtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcmVhbEVyclN0YWNrID0gaW5uZXJFcnJTdGFjay5maWx0ZXIoKHYsaSk9PntcbiAgICAgIHJldHVybiBpPmluZGV4T2ZTb3VyY2VcbiAgICB9KTtcbiAgICByZWFsRXJyU3RhY2sudW5zaGlmdChpbm5lckVyclN0YWNrW2luZGV4T2ZTb3VyY2VdXG4gICAgICAucmVwbGFjZShSRUdfU1RBQ0tfSU5ORVJfTUVUSE9EX1dJVEhPVVRfTElOSyxgJHtjbGFzc05hbWV9LiR7bWV0aG9kTmFtZX1gKVxuICAgICAgLnJlcGxhY2UoUkVHX1NUQUNLX0xJTkssc291cmNlTGluaykpO1xuICAgIGlubmVyRXJyID0gbmV3IEVycm9yKCk7XG4gICAgaW5uZXJFcnIuc3RhY2sgPSBgJHsgaXNGaXJlZm94ID8gJ0BkZWJ1Z2dlcic6ICdFcnJvcid9XFxuJHtyZWFsRXJyU3RhY2suam9pbignXFxuJyl9YDtcbiAgfVxuICByZXR1cm4gaW5uZXJFcnI7XG59Il19