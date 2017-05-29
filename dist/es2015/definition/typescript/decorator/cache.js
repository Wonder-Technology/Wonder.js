export function cache(judgeFunc, returnCacheValueFunc, setCacheFunc) {
    return function (target, name, descriptor) {
        var value = descriptor.value;
        descriptor.value = function (args) {
            var result = null, setArgs = null;
            if (judgeFunc.apply(this, arguments)) {
                return returnCacheValueFunc.apply(this, arguments);
            }
            result = value.apply(this, arguments);
            setArgs = [result];
            for (var i = 0, len = arguments.length; i < len; i++) {
                setArgs[i + 1] = arguments[i];
            }
            setCacheFunc.apply(this, setArgs);
            return result;
        };
        return descriptor;
    };
}
//# sourceMappingURL=cache.js.map