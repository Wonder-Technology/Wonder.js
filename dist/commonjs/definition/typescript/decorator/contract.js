"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CompileConfig_1 = require("../../../config/CompileConfig");
var InitConfigData_1 = require("../../../renderer/config/InitConfigData");
var InitConfigWorkerData_1 = require("../../../renderer/worker/render_file/config/InitConfigWorkerData");
var contract_1 = require("wonder-commonlib/dist/commonjs/typescript/decorator/contract");
var _getCompileIsTest = function () { return CompileConfig_1.CompileConfig.isCompileTest; };
var _getRunTimeIsTest = function () {
    if (InitConfigData_1.InitConfigData.isTest === true || InitConfigWorkerData_1.InitConfigWorkerData.isTest === true) {
        return true;
    }
    return false;
};
exports.describe = contract_1.describe;
exports.it = contract_1.it;
function requireCheck(inFunc) {
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
exports.requireCheck = requireCheck;
function requireCheckFunc(checkFunc, bodyFunc) {
    return contract_1.requireFunc(checkFunc, bodyFunc, _getCompileIsTest(), _getRunTimeIsTest);
}
exports.requireCheckFunc = requireCheckFunc;
function ensure(outFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig_1.CompileConfig.isCompileTest) {
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
exports.ensure = ensure;
function ensureFunc(checkFunc, bodyFunc) {
    return contract_1.ensureFunc(checkFunc, bodyFunc, _getCompileIsTest(), _getRunTimeIsTest);
}
exports.ensureFunc = ensureFunc;
function ensureGetter(outFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig_1.CompileConfig.isCompileTest) {
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
exports.ensureGetter = ensureGetter;
//# sourceMappingURL=contract.js.map