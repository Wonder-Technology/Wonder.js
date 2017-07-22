import { Log } from "../../../utils/Log";
import { CompileConfig } from "../../../config/CompileConfig";
import { InitConfigData } from "../../../renderer/config/InitConfigData";
import { InitConfigWorkerData } from "../../../renderer/worker/render_file/config/InitConfigWorkerData";
var _describeContext = null;
var _getIsTest = function () {
    if (InitConfigData.isTest === true || InitConfigWorkerData.isTest === true) {
        return true;
    }
    return false;
};
export function assert(cond, message) {
    if (message === void 0) { message = "contract error"; }
    Log.error(!cond, message);
}
export function describe(message, func, preCondition, context) {
    if (preCondition === void 0) { preCondition = function () { return true; }; }
    if (context === void 0) { context = this; }
    if (preCondition.call(context, null)) {
        _describeContext = context;
        try {
            func.call(context, null);
        }
        catch (e) {
            assert(false, message + "->" + e.message);
        }
        finally {
            _describeContext = null;
        }
    }
}
export function it(message, func, context) {
    try {
        if (arguments.length === 3) {
            func.call(context, null);
        }
        else {
            if (_describeContext) {
                func.call(_describeContext, null);
            }
            else {
                func();
            }
        }
    }
    catch (e) {
        assert(false, message + "->" + e.message);
    }
}
export function requireCheck(inFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            var value_1 = descriptor.value;
            descriptor.value = function (args) {
                if (_getIsTest()) {
                    inFunc.apply(this, arguments);
                }
                return value_1.apply(this, arguments);
            };
        }
        return descriptor;
    };
}
export function requireCheckFunc(checkFunc, bodyFunc) {
    if (!CompileConfig.isCompileTest) {
        return bodyFunc;
    }
    return function () {
        var paramArr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paramArr[_i] = arguments[_i];
        }
        if (!_getIsTest()) {
            return bodyFunc.apply(null, paramArr);
        }
        checkFunc.apply(null, paramArr);
        return bodyFunc.apply(null, paramArr);
    };
}
export function ensure(outFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            var value_2 = descriptor.value;
            descriptor.value = function (args) {
                var result = value_2.apply(this, arguments);
                if (_getIsTest()) {
                    var params = [result];
                    for (var i = 0, len = arguments.length; i < len; i++) {
                        params[i + 1] = arguments[i];
                    }
                    outFunc.apply(this, params);
                }
                return result;
            };
        }
        return descriptor;
    };
}
export function ensureFunc(checkFunc, bodyFunc) {
    if (!CompileConfig.isCompileTest) {
        return bodyFunc;
    }
    return function () {
        var paramArr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paramArr[_i] = arguments[_i];
        }
        if (!_getIsTest()) {
            return bodyFunc.apply(null, paramArr);
        }
        var result = bodyFunc.apply(null, paramArr);
        checkFunc.apply(null, [result].concat(paramArr));
        return result;
    };
}
export function requireGetterAndSetter(inGetterFunc, inSetterFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            var getter_1 = descriptor.get, setter_1 = descriptor.set;
            descriptor.get = function () {
                if (_getIsTest()) {
                    inGetterFunc.call(this);
                }
                return getter_1.call(this);
            };
            descriptor.set = function (val) {
                if (_getIsTest()) {
                    inSetterFunc.call(this, val);
                }
                setter_1.call(this, val);
            };
        }
        return descriptor;
    };
}
export function requireGetter(inFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            var getter_2 = descriptor.get;
            descriptor.get = function () {
                if (_getIsTest()) {
                    inFunc.call(this);
                }
                return getter_2.call(this);
            };
        }
        return descriptor;
    };
}
export function requireSetter(inFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            var setter_2 = descriptor.set;
            descriptor.set = function (val) {
                if (_getIsTest()) {
                    inFunc.call(this, val);
                }
                setter_2.call(this, val);
            };
        }
        return descriptor;
    };
}
export function ensureGetterAndSetter(outGetterFunc, outSetterFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            var getter_3 = descriptor.get, setter_3 = descriptor.set;
            descriptor.get = function () {
                var result = getter_3.call(this);
                if (_getIsTest()) {
                    outGetterFunc.call(this, result);
                }
                return result;
            };
            descriptor.set = function (val) {
                var result = setter_3.call(this, val);
                if (_getIsTest()) {
                    var params = [result, val];
                    outSetterFunc.apply(this, params);
                }
            };
        }
        return descriptor;
    };
}
export function ensureGetter(outFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            var getter_4 = descriptor.get;
            descriptor.get = function () {
                var result = getter_4.call(this);
                if (_getIsTest()) {
                    outFunc.call(this, result);
                }
                return result;
            };
        }
        return descriptor;
    };
}
export function ensureSetter(outFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            var setter_4 = descriptor.set;
            descriptor.set = function (val) {
                var result = setter_4.call(this, val);
                if (_getIsTest()) {
                    var params = [result, val];
                    outFunc.apply(this, params);
                }
            };
        }
        return descriptor;
    };
}
export function invariant(func) {
    return function (target) {
        if (CompileConfig.isCompileTest) {
            if (_getIsTest()) {
                func(target);
            }
        }
    };
}
//# sourceMappingURL=contract.js.map