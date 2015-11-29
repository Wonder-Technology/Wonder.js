/// <reference path="../../../filePath.d.ts"/>
module dy{
    export function assert(cond:boolean, message:string="contract error"){
        Log.error(!cond, message);
    }

    export function require(InFunc) {
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

    export function ensure(OutFunc) {
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

    export function requireGetter(InFunc) {
        return function (target, name, descriptor) {
            var getter = descriptor.get;

            descriptor.get = function() {
                if(Main.isTest){
                    InFunc.call(this);
                }

                return getter.call(this);
            };

            return descriptor;
        }
    }

    export function requireSetter(InFunc) {
        return function (target, name, descriptor) {
            var setter = descriptor.set;

            descriptor.set = function(val) {
                if(Main.isTest){
                    InFunc.call(this, val);
                }

                setter.call(this, val);
            };

            return descriptor;
        }
    }

    export function ensureGetter(OutFunc) {
        return function (target, name, descriptor) {
            var getter = descriptor.get;

            descriptor.get = function() {
                var result = getter.call(this);

                if(Main.isTest){
                    OutFunc.call(this, result);
                }

                return result;
            };

            return descriptor;
        }
    }

    export function ensureSetter(OutFunc) {
        return function (target, name, descriptor) {
            var setter = descriptor.set;

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

    export function invariant(func) {
        return function (target) {
            if(Main.isTest) {
                func(target);
            }
        }
    }
}
