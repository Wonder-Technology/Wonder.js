export var cacheFunc = <T>(hasCacheFunc:(...args) => boolean, getCacheFunc: (...args) => T, setCacheFunc:(...args) => void, bodyFunc:(...args) => T) => {
    return (...args) => {
        if(hasCacheFunc.apply(null, args)){
            return getCacheFunc.apply(null, args);
        }

        let result = bodyFunc.apply(null, args);

        args.push(result);

        setCacheFunc.apply(null, args);

        return result;
    }
}
