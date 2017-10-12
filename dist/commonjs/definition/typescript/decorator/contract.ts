import { CompileConfig } from "../../../config/CompileConfig";
import { InitConfigData } from "../../../renderer/config/InitConfigData";
import { InitConfigWorkerData } from "../../../renderer/worker/render_file/config/InitConfigWorkerData";
import {
    describe as describeCommonLib,
    it as itCommonLib,
    ensureFunc as ensureFuncCommonLib,
    requireFunc as requireFuncCommonLib
} from "wonder-commonlib/dist/commonjs/typescript/decorator/contract";

const _getCompileIsTest =() => CompileConfig.isCompileTest;

const _getRunTimeIsTest =() => {
    if (InitConfigData.isTest === true || InitConfigWorkerData.isTest === true) {
        return true;
    }

    return false;
}

export const describe = describeCommonLib;

export const it = itCommonLib;

export function requireCheck(inFunc) {
    return function(target, name, descriptor) {
        if (_getCompileIsTest()) {
            let value = descriptor.value;

            descriptor.value = function(args) {
                if (_getRunTimeIsTest()) {
                    inFunc.apply(this, arguments);
                }

                return value.apply(this, arguments);
            };
        }

        return descriptor;
    }
}

export function requireCheckFunc(checkFunc: Function, bodyFunc: Function) {
    return requireFuncCommonLib(checkFunc, bodyFunc, _getCompileIsTest(), _getRunTimeIsTest);
}

export function ensure(outFunc) {
    return function(target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            let value = descriptor.value;

            descriptor.value = function(args) {
                var result = value.apply(this, arguments);

                if (_getRunTimeIsTest()) {

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
    return ensureFuncCommonLib(checkFunc, bodyFunc, _getCompileIsTest(), _getRunTimeIsTest);
}

export function ensureGetter(outFunc) {
    return function(target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            let getter = descriptor.get;

            descriptor.get = function() {
                var result = getter.call(this);

                if (_getRunTimeIsTest()) {
                    outFunc.call(this, result);
                }

                return result;
            };
        }

        return descriptor;
    }
}
