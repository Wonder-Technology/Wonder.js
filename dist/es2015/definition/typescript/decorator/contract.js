import { CompileConfig } from "../../../config/CompileConfig";
import { InitConfigData } from "../../../renderer/config/InitConfigData";
import { InitConfigWorkerData } from "../../../renderer/worker/render_file/config/InitConfigWorkerData";
import { describe as describeCommonLib, it as itCommonLib, ensureFunc as ensureFuncCommonLib, requireFunc as requireFuncCommonLib } from "wonder-commonlib/dist/es2015/typescript/decorator/contract";
var _getCompileIsTest = function () { return CompileConfig.isCompileTest; };
var _getRunTimeIsTest = function () {
    if (InitConfigData.isTest === true || InitConfigWorkerData.isTest === true) {
        return true;
    }
    return false;
};
export var describe = describeCommonLib;
export var it = itCommonLib;
export function requireCheck(inFunc) {
    return function (target, name, descriptor) {
        if (_getCompileIsTest()) {
            var value_1 = descriptor.value;
            descriptor.value = function (args) {
                if (_getRunTimeIsTest()) {
                    inFunc.apply(this, arguments);
                }
                return value_1.apply(this, arguments);
            };
        }
        return descriptor;
    };
}
export function requireCheckFunc(checkFunc, bodyFunc) {
    return requireFuncCommonLib(checkFunc, bodyFunc, _getCompileIsTest(), _getRunTimeIsTest);
}
export function ensure(outFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            var value_2 = descriptor.value;
            descriptor.value = function (args) {
                var result = value_2.apply(this, arguments);
                if (_getRunTimeIsTest()) {
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
    return ensureFuncCommonLib(checkFunc, bodyFunc, _getCompileIsTest(), _getRunTimeIsTest);
}
export function ensureGetter(outFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            var getter_1 = descriptor.get;
            descriptor.get = function () {
                var result = getter_1.call(this);
                if (_getRunTimeIsTest()) {
                    outFunc.call(this, result);
                }
                return result;
            };
        }
        return descriptor;
    };
}
//# sourceMappingURL=contract.js.map