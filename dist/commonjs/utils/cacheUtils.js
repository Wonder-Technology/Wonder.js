"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheFunc = function (hasCacheFunc, getCacheFunc, setCacheFunc, bodyFunc) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (hasCacheFunc.apply(null, args)) {
            return getCacheFunc.apply(null, args);
        }
        var result = bodyFunc.apply(null, args);
        args.push(result);
        setCacheFunc.apply(null, args);
        return result;
    };
};
//# sourceMappingURL=cacheUtils.js.map