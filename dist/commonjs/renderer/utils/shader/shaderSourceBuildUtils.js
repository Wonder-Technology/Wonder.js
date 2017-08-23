"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EGPUPrecision_1 = require("../../enum/EGPUPrecision");
var gpuDetectUtils_1 = require("../device/gpuDetectUtils");
var arrayUtils_1 = require("../../../utils/arrayUtils");
var JudgeUtils_1 = require("../../../utils/JudgeUtils");
var contract_1 = require("../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var renderConfigUtils_1 = require("../renderConfigUtils");
var functionalUtils_1 = require("../../../utils/functionalUtils");
exports.getPrecisionSource = function (lowp_fragment, mediump_fragment, highp_fragment, GPUDetectData) {
    var precision = gpuDetectUtils_1.getPrecision(GPUDetectData), result = null;
    switch (precision) {
        case EGPUPrecision_1.EGPUPrecision.HIGHP:
            result = highp_fragment.top;
            break;
        case EGPUPrecision_1.EGPUPrecision.MEDIUMP:
            result = mediump_fragment.top;
            break;
        case EGPUPrecision_1.EGPUPrecision.LOWP:
            result = lowp_fragment.top;
            break;
        default:
            result = "";
            break;
    }
    return result;
};
exports.getMaterialShaderLibNameArr = function (materialShaderLibConfig, materialShaderLibGroup, materialIndex, initShaderFuncDataMap, initShaderDataMap) {
    var nameArr = [];
    arrayUtils_1.forEach(materialShaderLibConfig, function (item) {
        if (JudgeUtils_1.isString(item)) {
            nameArr.push(item);
        }
        else {
            var i = item;
            switch (i.type) {
                case "group":
                    nameArr = nameArr.concat(materialShaderLibGroup[i.value]);
                    break;
                case "branch":
                    var shaderLibName = _execBranch(i, materialIndex, initShaderFuncDataMap, initShaderDataMap);
                    if (_isShaderLibNameExist(shaderLibName)) {
                        nameArr.push(shaderLibName);
                    }
            }
        }
    });
    return nameArr;
};
var _execBranch = contract_1.requireCheckFunc(function (i, materialIndex, initShaderFuncDataMap, initShaderDataMap) {
    contract_1.it("branch should exist", function () {
        wonder_expect_js_1.expect(i.branch).exist;
    });
}, function (i, materialIndex, initShaderFuncDataMap, initShaderDataMap) {
    return i.branch(materialIndex, initShaderFuncDataMap, initShaderDataMap);
});
var _isShaderLibNameExist = function (name) { return !!name; };
exports.getEmptyFuncGLSLConfig = function () {
    return {
        "top": "",
        "varDeclare": "",
        "funcDeclare": "",
        "funcDefine": "",
        "body": "",
        "defineList": []
    };
};
exports.buildSourceDefine = function (defineList, initShaderDataMap) {
    var result = "";
    for (var _i = 0, defineList_1 = defineList; _i < defineList_1.length; _i++) {
        var item = defineList_1[_i];
        if (item.valueFunc === void 0) {
            result += "#define " + item.name + "\n";
        }
        else {
            result += "#define " + item.name + " " + item.valueFunc(initShaderDataMap) + "\n";
        }
    }
    return result;
};
exports.getGLSLPartData = function (glslConfig, partName) {
    var partConfig = glslConfig[partName];
    if (renderConfigUtils_1.isConfigDataExist(partConfig)) {
        return partConfig;
    }
    else if (renderConfigUtils_1.isConfigDataExist(glslConfig.source)) {
        return glslConfig.source[partName];
    }
    return "";
};
exports.getGLSLDefineListData = function (glslConfig) {
    var partConfig = glslConfig.defineList;
    if (renderConfigUtils_1.isConfigDataExist(partConfig)) {
        return partConfig;
    }
    return [];
};
exports.getFuncGLSLPartData = function (glslConfig, partName) {
    return glslConfig[partName];
};
exports.getFuncGLSLDefineListData = function (glslConfig) {
    return glslConfig.defineList;
};
var _isInSource = function (key, source) {
    return source.indexOf(key) > -1;
};
exports.generateUniformSource = function (materialShaderLibNameArr, shaderLibData, sourceVarDeclare, sourceFuncDefine, sourceBody) {
    var result = "", generateFunc = functionalUtils_1.compose(functionalUtils_1.forEachArray(function (_a) {
        var name = _a.name, type = _a.type;
        result += "uniform " + _generateUniformSourceType(type) + " " + name + ";\n";
    }), functionalUtils_1.filterArray(function (_a) {
        var name = _a.name;
        return _isInSource(name, sourceVarDeclare) || _isInSource(name, sourceFuncDefine) || _isInSource(name, sourceBody);
    }));
    arrayUtils_1.forEach(materialShaderLibNameArr, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send, uniform = null, uniformDefine = null;
        if (!renderConfigUtils_1.isConfigDataExist(sendData)) {
            return;
        }
        uniform = sendData.uniform;
        uniformDefine = sendData.uniformDefine;
        if (renderConfigUtils_1.isConfigDataExist(uniform)) {
            generateFunc(uniform);
        }
        if (renderConfigUtils_1.isConfigDataExist(uniformDefine)) {
            generateFunc(uniformDefine);
        }
    });
    return result;
};
var _generateUniformSourceType = function (type) {
    var sourceType = null;
    switch (type) {
        case "float3":
            sourceType = "vec3";
            break;
        default:
            sourceType = type;
            break;
    }
    return sourceType;
};
//# sourceMappingURL=shaderSourceBuildUtils.js.map