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
