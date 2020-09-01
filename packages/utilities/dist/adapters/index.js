"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDefaultAdapter = exports.useAdapters = exports.RUNTIME = void 0;
var Web = __importStar(require("./platforms/web"));
var util_1 = require("../libs/util");
var RUNTIME;
(function (RUNTIME) {
    RUNTIME["WEB"] = "web";
    RUNTIME["WX_MP"] = "wx_mp";
})(RUNTIME = exports.RUNTIME || (exports.RUNTIME = {}));
function useAdapters(adapters) {
    var adapterList = util_1.isArray(adapters) ? adapters : [adapters];
    for (var _i = 0, adapterList_1 = adapterList; _i < adapterList_1.length; _i++) {
        var adapter = adapterList_1[_i];
        var isMatch = adapter.isMatch, genAdapter = adapter.genAdapter, runtime = adapter.runtime;
        if (isMatch()) {
            return {
                adapter: genAdapter(),
                runtime: runtime
            };
        }
    }
}
exports.useAdapters = useAdapters;
function useDefaultAdapter() {
    return {
        adapter: Web.genAdapter(),
        runtime: RUNTIME.WEB
    };
}
exports.useDefaultAdapter = useDefaultAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWRhcHRlcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1EQUF1QztBQUN2QyxxQ0FBdUM7QUFFdkMsSUFBWSxPQUdYO0FBSEQsV0FBWSxPQUFPO0lBQ2pCLHNCQUFXLENBQUE7SUFDWCwwQkFBZSxDQUFBO0FBQ2pCLENBQUMsRUFIVyxPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUFHbEI7QUFFRCxTQUFnQixXQUFXLENBQUMsUUFBNkM7SUFDdkUsSUFBTSxXQUFXLEdBQXVCLGNBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBOEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUE0QixDQUFDLENBQUM7SUFDNUgsS0FBc0IsVUFBVyxFQUFYLDJCQUFXLEVBQVgseUJBQVcsRUFBWCxJQUFXLEVBQUU7UUFBOUIsSUFBTSxPQUFPLG9CQUFBO1FBQ1IsSUFBQSxPQUFPLEdBQTBCLE9BQU8sUUFBakMsRUFBRSxVQUFVLEdBQWMsT0FBTyxXQUFyQixFQUFFLE9BQU8sR0FBSyxPQUFPLFFBQVosQ0FBYTtRQUNqRCxJQUFJLE9BQU8sRUFBRSxFQUFFO1lBQ2IsT0FBTztnQkFDTCxPQUFPLEVBQUUsVUFBVSxFQUFFO2dCQUNyQixPQUFPLFNBQUE7YUFDUixDQUFDO1NBQ0g7S0FDRjtBQUNILENBQUM7QUFYRCxrQ0FXQztBQUVELFNBQWdCLGlCQUFpQjtJQUMvQixPQUFPO1FBQ0wsT0FBTyxFQUFFLEdBQUcsQ0FBQyxVQUFVLEVBQUU7UUFDekIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHO0tBQ3JCLENBQUM7QUFDSixDQUFDO0FBTEQsOENBS0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDbG91ZGJhc2VBZGFwdGVyIH0gZnJvbSAnQGNsb3VkYmFzZS9hZGFwdGVyLWludGVyZmFjZSc7XG5pbXBvcnQgKiBhcyBXZWIgZnJvbSAnLi9wbGF0Zm9ybXMvd2ViJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi9saWJzL3V0aWwnO1xuXG5leHBvcnQgZW51bSBSVU5USU1FIHtcbiAgV0VCID0gJ3dlYicsXG4gIFdYX01QID0gJ3d4X21wJyAvLyDlvq7kv6HlsI/nqIvluo9cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUFkYXB0ZXJzKGFkYXB0ZXJzOiBDbG91ZGJhc2VBZGFwdGVyfENsb3VkYmFzZUFkYXB0ZXJbXSkge1xuICBjb25zdCBhZGFwdGVyTGlzdDogQ2xvdWRiYXNlQWRhcHRlcltdID0gaXNBcnJheShhZGFwdGVycykgPyBhZGFwdGVycyBhcyBDbG91ZGJhc2VBZGFwdGVyW10gOiBbYWRhcHRlcnMgYXMgQ2xvdWRiYXNlQWRhcHRlcl07XG4gIGZvciAoY29uc3QgYWRhcHRlciBvZiBhZGFwdGVyTGlzdCkge1xuICAgIGNvbnN0IHsgaXNNYXRjaCwgZ2VuQWRhcHRlciwgcnVudGltZSB9ID0gYWRhcHRlcjtcbiAgICBpZiAoaXNNYXRjaCgpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhZGFwdGVyOiBnZW5BZGFwdGVyKCksXG4gICAgICAgIHJ1bnRpbWVcbiAgICAgIH07XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VEZWZhdWx0QWRhcHRlcigpIHtcbiAgcmV0dXJuIHtcbiAgICBhZGFwdGVyOiBXZWIuZ2VuQWRhcHRlcigpLFxuICAgIHJ1bnRpbWU6IFJVTlRJTUUuV0VCXG4gIH07XG59XG4iXX0=