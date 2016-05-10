module wd{
    export function cacheGetter(judgeFunc:() => boolean, returnCacheValueFunc:() => any, setCacheFunc:(returnVal) => void){
        return function (target, name, descriptor) {
            var getter = descriptor.get;

            descriptor.get = function() {
                var result = null;

                if(judgeFunc.call(this)){
                    return returnCacheValueFunc.call(this);
                }

                result = getter.call(this);

                setCacheFunc.call(this, result);

                return result;
            };

            return descriptor;
        }
    }

    export function cache(judgeFunc:(...args) => boolean, returnCacheValueFunc:(...args) => any, setCacheFunc:(...returnVal) => void){
        return function (target, name, descriptor) {
            var value = descriptor.value;

            descriptor.value = function(args){
                var result = null,
                    setArgs = null;

                if(judgeFunc.apply(this, arguments)){
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
}

