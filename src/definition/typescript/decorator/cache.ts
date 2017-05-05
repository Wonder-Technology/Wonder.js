export function cacheGetter(judgeFunc: () => boolean, returnCacheValueFunc: () => any, setCacheFunc: (returnVal: any) => void) {
    return function(target, name, descriptor) {
        var getter = descriptor.get;

        descriptor.get = function() {
            var result = null;

            if (judgeFunc.call(this)) {
                return returnCacheValueFunc.call(this);
            }

            result = getter.call(this);

            setCacheFunc.call(this, result);

            return result;
        };

        return descriptor;
    }
}

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

export function cacheBufferForBufferContainer() {
    return function(target, name, descriptor) {
        var value = descriptor.value;

        descriptor.value = function(dataName: string) {
            var result = null;

            if (this.container.hasChild(dataName)) {
                return this.container.getChild(dataName)
            }

            result = value.call(this, dataName);

            this.container.addChild(dataName, result);

            return result;
        };

        return descriptor;
    }
}

export function cacheBufferForBufferContainerWithFuncParam(setDataNameFuncName: string) {
    return function(target, name, descriptor) {
        var value = descriptor.value;

        descriptor.value = function(dataName: string) {
            var result = null,
                settedDataName = this[setDataNameFuncName](dataName);

            if (this.container.hasChild(settedDataName)) {
                return this.container.getChild(settedDataName)
            }

            result = value.call(this, dataName);

            this.container.addChild(settedDataName, result);

            return result;
        };

        return descriptor;
    }
}