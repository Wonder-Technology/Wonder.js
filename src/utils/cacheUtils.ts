import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";

export var cacheFunc = <T>(hasCacheFunc:() => boolean, getCacheFunc: () => T, setCacheFunc:IO, bodyFunc:() => T) => {
    return () => {
        if(hasCacheFunc()){
            return getCacheFunc();
        }

        let result = bodyFunc();

        setCacheFunc.run(result);

        return result;
    }
}
