/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    function assert(cond, message) {
        if (message === void 0) { message = "contract error"; }
        dy.Log.error(!cond, message);
    }
    dy.assert = assert;
    function In(InFunc) {
        return function (target, name, descriptor) {
            var value = descriptor.value;
            descriptor.value = function (args) {
                if (dy.Main.isTest) {
                    try {
                        InFunc.apply(this, arguments);
                    }
                    catch (e) {
                        throw new Error("In contract error:\n" + e.message);
                    }
                }
                return value.apply(this, arguments);
            };
            return descriptor;
        };
    }
    dy.In = In;
    function Out(OutFunc) {
        return function (target, name, descriptor) {
            var value = descriptor.value;
            descriptor.value = function (args) {
                var result = value.apply(descriptor, arguments);
                if (dy.Main.isTest) {
                    try {
                        OutFunc.call(this, result);
                    }
                    catch (e) {
                        throw new Error("Out contract error:\n" + e.message);
                    }
                }
                return result;
            };
            return descriptor;
        };
    }
    dy.Out = Out;
    function Invariant(func) {
        return function (target) {
            if (dy.Main.isTest) {
                try {
                    func(target);
                }
                catch (e) {
                    throw new Error("Invariant contract error:\n" + e.message);
                }
            }
        };
    }
    dy.Invariant = Invariant;
})(dy || (dy = {}));
