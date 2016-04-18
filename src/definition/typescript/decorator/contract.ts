module wd{
    export function assert(cond:boolean, message:string="contract error"){
        Log.error(!cond, message);
    }

    export function require(inFunc) {
        return function (target, name, descriptor) {
            var value = descriptor.value;

            descriptor.value = function(...args){
                if(Main.isTest){
                    inFunc.apply(this, args);
                }

                return value.apply(this, args);
            };

            return descriptor;
        }
    }

    export function ensure(outFunc) {
        return function (target, name, descriptor) {
            var value = descriptor.value;

            descriptor.value = function (...args) {
                var result = value.apply(this, args);

                if(Main.isTest) {
                    let params = [result].concat(args);
                    outFunc.apply(this, params);
                }

                return result;
            };

            return descriptor;
        }
    }

    export function requireGetterAndSetter(inGetterFunc, inSetterFunc) {
        return function (target, name, descriptor) {
            var getter = descriptor.get,
                setter = descriptor.set;

            descriptor.get = function() {
                if(Main.isTest){
                    inGetterFunc.call(this);
                }

                return getter.call(this);
            };

            descriptor.set = function(val) {
                if(Main.isTest){
                    inSetterFunc.call(this, val);
                }

                setter.call(this, val);
            };

            return descriptor;
        }
    }

    export function requireGetter(inFunc) {
        return function (target, name, descriptor) {
            var getter = descriptor.get;

            descriptor.get = function() {
                if(Main.isTest){
                    inFunc.call(this);
                }

                return getter.call(this);
            };

            return descriptor;
        }
    }

    export function requireSetter(inFunc) {
        return function (target, name, descriptor) {
            var setter = descriptor.set;

            descriptor.set = function(val) {
                if(Main.isTest){
                    inFunc.call(this, val);
                }

                setter.call(this, val);
            };

            return descriptor;
        }
    }

    export function ensureGetterAndSetter(outGetterFunc, outSetterFunc) {
        return function (target, name, descriptor) {
            var getter = descriptor.get,
                setter = descriptor.set;

            descriptor.get = function() {
                var result = getter.call(this);

                if(Main.isTest){
                    outGetterFunc.call(this, result);
                }

                return result;
            };

            descriptor.set = function(val) {
                var result = setter.call(this, val);

                if(Main.isTest){
                    let params = [result, val];
                    outSetterFunc.apply(this, params);
                }
            };

            return descriptor;
        }
    }

    export function ensureGetter(outFunc) {
        return function (target, name, descriptor) {
            var getter = descriptor.get;

            descriptor.get = function() {
                var result = getter.call(this);

                if(Main.isTest){
                    outFunc.call(this, result);
                }

                return result;
            };

            return descriptor;
        }
    }

    export function ensureSetter(outFunc) {
        return function (target, name, descriptor) {
            var setter = descriptor.set;

            descriptor.set = function(val) {
                var result = setter.call(this, val);

                if(Main.isTest){
                    let params = [result, val];
                    outFunc.apply(this, params);
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
