"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = require("../../../utils/Log");
var CompileConfig_1 = require("../../../config/CompileConfig");
var MainData_1 = require("../../../core/data/MainData");
var _describeContext = null;
function assert(cond, message) {
    if (message === void 0) { message = "contract error"; }
    Log_1.Log.error(!cond, message);
}
exports.assert = assert;
function describe(message, func, preCondition, context) {
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
exports.describe = describe;
function it(message, func, context) {
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
exports.it = it;
function requireCheck(inFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig_1.CompileConfig.isCompileTest) {
            var value_1 = descriptor.value;
            descriptor.value = function (args) {
                if (MainData_1.MainData.isTest) {
                    inFunc.apply(this, arguments);
                }
                return value_1.apply(this, arguments);
            };
        }
        return descriptor;
    };
}
exports.requireCheck = requireCheck;
function ensure(outFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig_1.CompileConfig.isCompileTest) {
            var value_2 = descriptor.value;
            descriptor.value = function (args) {
                var result = value_2.apply(this, arguments);
                if (MainData_1.MainData.isTest) {
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
exports.ensure = ensure;
function requireGetterAndSetter(inGetterFunc, inSetterFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig_1.CompileConfig.isCompileTest) {
            var getter_1 = descriptor.get, setter_1 = descriptor.set;
            descriptor.get = function () {
                if (MainData_1.MainData.isTest) {
                    inGetterFunc.call(this);
                }
                return getter_1.call(this);
            };
            descriptor.set = function (val) {
                if (MainData_1.MainData.isTest) {
                    inSetterFunc.call(this, val);
                }
                setter_1.call(this, val);
            };
        }
        return descriptor;
    };
}
exports.requireGetterAndSetter = requireGetterAndSetter;
function requireGetter(inFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig_1.CompileConfig.isCompileTest) {
            var getter_2 = descriptor.get;
            descriptor.get = function () {
                if (MainData_1.MainData.isTest) {
                    inFunc.call(this);
                }
                return getter_2.call(this);
            };
        }
        return descriptor;
    };
}
exports.requireGetter = requireGetter;
function requireSetter(inFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig_1.CompileConfig.isCompileTest) {
            var setter_2 = descriptor.set;
            descriptor.set = function (val) {
                if (MainData_1.MainData.isTest) {
                    inFunc.call(this, val);
                }
                setter_2.call(this, val);
            };
        }
        return descriptor;
    };
}
exports.requireSetter = requireSetter;
function ensureGetterAndSetter(outGetterFunc, outSetterFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig_1.CompileConfig.isCompileTest) {
            var getter_3 = descriptor.get, setter_3 = descriptor.set;
            descriptor.get = function () {
                var result = getter_3.call(this);
                if (MainData_1.MainData.isTest) {
                    outGetterFunc.call(this, result);
                }
                return result;
            };
            descriptor.set = function (val) {
                var result = setter_3.call(this, val);
                if (MainData_1.MainData.isTest) {
                    var params = [result, val];
                    outSetterFunc.apply(this, params);
                }
            };
        }
        return descriptor;
    };
}
exports.ensureGetterAndSetter = ensureGetterAndSetter;
function ensureGetter(outFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig_1.CompileConfig.isCompileTest) {
            var getter_4 = descriptor.get;
            descriptor.get = function () {
                var result = getter_4.call(this);
                if (MainData_1.MainData.isTest) {
                    outFunc.call(this, result);
                }
                return result;
            };
        }
        return descriptor;
    };
}
exports.ensureGetter = ensureGetter;
function ensureSetter(outFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig_1.CompileConfig.isCompileTest) {
            var setter_4 = descriptor.set;
            descriptor.set = function (val) {
                var result = setter_4.call(this, val);
                if (MainData_1.MainData.isTest) {
                    var params = [result, val];
                    outFunc.apply(this, params);
                }
            };
        }
        return descriptor;
    };
}
exports.ensureSetter = ensureSetter;
function invariant(func) {
    return function (target) {
        if (CompileConfig_1.CompileConfig.isCompileTest) {
            if (MainData_1.MainData.isTest) {
                func(target);
            }
        }
    };
}
exports.invariant = invariant;
//# sourceMappingURL=contract.js.map