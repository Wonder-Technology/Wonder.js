/// <reference path="../../definitions.d.ts"/>
module dy{
    export function assert(cond:boolean, message:string="contract error"){
        Log.error(!cond, message);
    }

    export function In(InFunc) {
        return function (target, name, descriptor) {
            var value = descriptor.value;

                descriptor.value = function(args){
                    if(Main.isTest){
                        InFunc.apply(this, arguments);
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

    export function Invariant(func) {
        return function (target) {
            if(Main.isTest) {
                func(target);
            }
        }
    }
}
