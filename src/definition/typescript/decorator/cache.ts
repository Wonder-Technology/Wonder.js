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

            descriptor.value = function(...args){
                var result = null;

                if(judgeFunc.apply(this, args)){
                    return returnCacheValueFunc.apply(this, args);
                }

                result = value.apply(this, args);

                setCacheFunc.apply(this, [result].concat(args));

                return result;
            };

            return descriptor;
        }
    }
}
