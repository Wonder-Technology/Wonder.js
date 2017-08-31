import { CompileConfig } from "../../../config/CompileConfig";
import { InitConfigData } from "../../../renderer/config/InitConfigData";
import { InitConfigWorkerData } from "../../../renderer/worker/render_file/config/InitConfigWorkerData";
import {
    describe as describeCommonLib,
    it as itCommonLib,
    ensureFunc as ensureFuncCommonLib,
    requireFunc as requireFuncCommonLib
} from "wonder-commonlib/dist/es2015/typescript/decorator/contract";

var _describeContext = null;

var _getCompileIsTest = () => CompileConfig.isCompileTest;

var _getIsTest = () => {
    if (InitConfigData.isTest === true || InitConfigWorkerData.isTest === true) {
        return true;
    }

    return false;
}

// export function assert(cond: boolean, message: string = "contract error") {
//     Log.error(!cond, message);
// }
//
export var describe = describeCommonLib;

export var it = itCommonLib;

export function requireCheck(inFunc) {
    return function(target, name, descriptor) {
        if (_getCompileIsTest()) {
            let value = descriptor.value;

            descriptor.value = function(args) {
                if (_getIsTest()) {
                    inFunc.apply(this, arguments);
                }

                return value.apply(this, arguments);
            };
        }

        return descriptor;
    }
}

export function requireCheckFunc(checkFunc: Function, bodyFunc: Function) {
    return requireFuncCommonLib(checkFunc, bodyFunc, _getCompileIsTest(), _getIsTest);
}

export function ensure(outFunc) {
    return function(target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            let value = descriptor.value;

            descriptor.value = function(args) {
                var result = value.apply(this, arguments);

                if (_getIsTest()) {

                    var params = [result];

                    for (let i = 0, len = arguments.length; i < len; i++) {
                        params[i + 1] = arguments[i];
                    }

                    outFunc.apply(this, params);
                }

                return result;
            }
        }

        return descriptor;
    }
}

export function ensureFunc(checkFunc: Function, bodyFunc: Function) {
    return ensureFuncCommonLib(checkFunc, bodyFunc, _getCompileIsTest(), _getIsTest);
}
//
// export function requireGetterAndSetter(inGetterFunc, inSetterFunc) {
//     return function(target, name, descriptor) {
//         if (CompileConfig.isCompileTest) {
//             let getter = descriptor.get,
//                 setter = descriptor.set;
//
//             descriptor.get = function() {
//                 if (_getIsTest()) {
//                     inGetterFunc.call(this);
//                 }
//
//                 return getter.call(this);
//             };
//
//             descriptor.set = function(val) {
//                 if (_getIsTest()) {
//                     inSetterFunc.call(this, val);
//                 }
//
//                 setter.call(this, val);
//             };
//         }
//
//         return descriptor;
//     }
// }
//
// export function requireGetter(inFunc) {
//     return function(target, name, descriptor) {
//         if (CompileConfig.isCompileTest) {
//             let getter = descriptor.get;
//
//             descriptor.get = function() {
//                 if (_getIsTest()) {
//                     inFunc.call(this);
//                 }
//
//                 return getter.call(this);
//             };
//
//         }
//
//         return descriptor;
//     }
// }
//
// export function requireSetter(inFunc) {
//     return function(target, name, descriptor) {
//         if (CompileConfig.isCompileTest) {
//             let setter = descriptor.set;
//
//             descriptor.set = function(val) {
//                 if (_getIsTest()) {
//                     inFunc.call(this, val);
//                 }
//
//                 setter.call(this, val);
//             };
//         }
//
//         return descriptor;
//     }
// }
//
// export function ensureGetterAndSetter(outGetterFunc, outSetterFunc) {
//     return function(target, name, descriptor) {
//         if (CompileConfig.isCompileTest) {
//             let getter = descriptor.get,
//                 setter = descriptor.set;
//
//             descriptor.get = function() {
//                 var result = getter.call(this);
//
//                 if (_getIsTest()) {
//                     outGetterFunc.call(this, result);
//                 }
//
//                 return result;
//             };
//
//             descriptor.set = function(val) {
//                 var result = setter.call(this, val);
//
//                 if (_getIsTest()) {
//                     let params = [result, val];
//                     outSetterFunc.apply(this, params);
//                 }
//             };
//         }
//
//         return descriptor;
//     }
// }
//
export function ensureGetter(outFunc) {
    return function(target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            let getter = descriptor.get;

            descriptor.get = function() {
                var result = getter.call(this);

                if (_getIsTest()) {
                    outFunc.call(this, result);
                }

                return result;
            };
        }

        return descriptor;
    }
}

// export function ensureSetter(outFunc) {
//     return function(target, name, descriptor) {
//         if (CompileConfig.isCompileTest) {
//             let setter = descriptor.set;
//
//             descriptor.set = function(val) {
//                 var result = setter.call(this, val);
//
//                 if (_getIsTest()) {
//                     let params = [result, val];
//                     outFunc.apply(this, params);
//                 }
//             };
//         }
//
//         return descriptor;
//     }
// }

// export function invariant(func) {
//     return function(target) {
//         if (CompileConfig.isCompileTest) {
//             if (_getIsTest()) {
//                 func(target);
//             }
//         }
//     }
// }