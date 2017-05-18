export function cache(judgeFunc: any, returnCacheValueFunc: any, setCacheFunc: any) {
    return function(target, name, descriptor) {
        var value = descriptor.value;

        descriptor.value = function(args) {
            var result = null,
                setArgs = null;

            if (judgeFunc.apply(this, arguments)) {
                return returnCacheValueFunc.apply(this, arguments);
            }

            result = value.apply(this, arguments);

            setArgs = [result];

            for (let i = 0, len = arguments.length; i < len; i++) {
                setArgs[i + 1] = arguments[i];
            }

            setCacheFunc.apply(this, setArgs);

            return result;
        };

        return descriptor;
    }
}
