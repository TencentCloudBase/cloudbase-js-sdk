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
export var checkFromAuthV2 = function (_fromApp) { return __awaiter(void 0, void 0, void 0, function () {
    var oauthInstance, oauthLogin, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
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
                    return [2, {
                            authType: 'oauth',
                            instance: oauthInstance
                        }];
                }
                return [2, {}];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxNQUFNLENBQUMsSUFBTSxlQUFlLEdBQUcsVUFBTyxRQUFvQjs7Ozs7Z0JBRWxELGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxJQUFLLFFBQWdCLENBQUMsS0FBSyxFQUFFLENBQUE7Z0JBUXRELEtBQUEsYUFBYSxDQUFBO3lCQUFiLGNBQWE7Z0JBQUksV0FBTSxhQUFhLENBQUMsYUFBYSxFQUFFLEVBQUE7O3NCQUFuQyxTQUFtQzs7O2dCQUFqRSxVQUFVLEtBQXVEO2dCQUN2RSxJQUFJLFVBQVUsRUFBRTtvQkFDZCxXQUFPOzRCQUNMLFFBQVEsRUFBRSxPQUFPOzRCQUNqQixRQUFRLEVBQUUsYUFBYTt5QkFDeEIsRUFBQTtpQkFDRjtnQkFDRCxXQUFPLEVBQUUsRUFBQTs7O0tBQ1YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbG91ZGJhc2UgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IGNoZWNrRnJvbUF1dGhWMiA9IGFzeW5jIChfZnJvbUFwcDogSUNsb3VkYmFzZSkgPT4ge1xuICAvLyBjb25zdCBhdXRoSW5zdGFuY2UgPSBfZnJvbUFwcC5hdXRoSW5zdGFuY2VcbiAgY29uc3Qgb2F1dGhJbnN0YW5jZSA9IF9mcm9tQXBwLm9hdXRoSW5zdGFuY2UgfHwgKF9mcm9tQXBwIGFzIGFueSkub2F1dGgoKVxuICAvLyBjb25zdCBhdXRoTG9naW4gPSBhdXRoSW5zdGFuY2UgJiYgYXdhaXQgYXV0aEluc3RhbmNlLmdldExvZ2luU3RhdGUoKVxuICAvLyBpZiAoYXV0aExvZ2luKSB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIGF1dGhUeXBlOiAnYXV0aCcsXG4gIC8vICAgICBpbnN0YW5jZTogYXV0aEluc3RhbmNlXG4gIC8vICAgfVxuICAvLyB9XG4gIGNvbnN0IG9hdXRoTG9naW4gPSBvYXV0aEluc3RhbmNlICYmIGF3YWl0IG9hdXRoSW5zdGFuY2UuaGFzTG9naW5TdGF0ZSgpXG4gIGlmIChvYXV0aExvZ2luKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGF1dGhUeXBlOiAnb2F1dGgnLFxuICAgICAgaW5zdGFuY2U6IG9hdXRoSW5zdGFuY2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHt9XG59Il19