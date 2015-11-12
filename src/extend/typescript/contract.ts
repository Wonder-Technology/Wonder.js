/// <reference path="../../definitions.d.ts"/>
module dy{
    export function assert(cond:boolean, message:string="contract error"){
        Log.error(!cond, message);
    }

    export function In(InFunc) {
        return function (target, name, descriptor) {
            var value = descriptor.value;

                descriptor.value = function(...args){
                    if(Main.isTest){
                        InFunc.apply(this, args);
                    }

                    return value.apply(this, arguments);
                };

            return descriptor;
        }
    }

    export function Out(OutFunc) {
        return function (target, name, descriptor) {
            var value = descriptor.value;

            descriptor.value = function (...args) {
                var result = value.apply(this, args),
                    params = [result].concat(args);

                if(Main.isTest) {
                    OutFunc.apply(this, params);
                }

                return result;
            };

            return descriptor;
        }
    }

    export function InGetter(InFunc) {
        return function (target, name, descriptor) {
            var getter = descriptor.get,
                setter = descriptor.set;

            descriptor.get = function() {
                if(Main.isTest){
                    InFunc.call(this);
                }

                return getter.call(this);
            };

            descriptor.set = function(val) {
                if(Main.isTest){
                    InFunc.call(this, val);
                }

                setter.call(this, val);
            };

            return descriptor;
        }
    }

    export function OutGetter(OutFunc) {
        return function (target, name, descriptor) {
            var getter = descriptor.get,
                setter = descriptor.set;

            descriptor.get = function() {
                var result = getter.call(this);

                if(Main.isTest){
                    OutFunc.call(this, result);
                }

                return result;
            };

            descriptor.set = function(val) {
                var result = setter.call(this, val),
                    params = [result, val];

                if(Main.isTest){
                    OutFunc.apply(this, params);
                }
            };

            return descriptor;
        }
    }

    export function Invariant(func) {
        return function (target) {
            if(Main.isTest) {
                func(target);
            }
        }
    }



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
