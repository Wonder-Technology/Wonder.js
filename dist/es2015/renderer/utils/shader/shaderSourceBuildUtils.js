import { EGPUPrecision } from "../../enum/EGPUPrecision";
import { getPrecision } from "../device/gpuDetectUtils";
import { forEach } from "../../../utils/arrayUtils";
import { isString } from "../../../utils/JudgeUtils";
import { it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { isConfigDataExist } from "../renderConfigUtils";
import { compose, filterArray, forEachArray } from "../../../utils/functionalUtils";
export var getPrecisionSource = function (lowp_fragment, mediump_fragment, highp_fragment, GPUDetectData) {
    var precision = getPrecision(GPUDetectData), result = null;
    switch (precision) {
        case EGPUPrecision.HIGHP:
            result = highp_fragment.top;
            break;
        case EGPUPrecision.MEDIUMP:
            result = mediump_fragment.top;
            break;
        case EGPUPrecision.LOWP:
            result = lowp_fragment.top;
            break;
        default:
            result = "";
            break;
    }
    return result;
};
export var getMaterialShaderLibNameArr = function (materialShaderLibConfig, materialShaderLibGroup, materialIndex, initShaderFuncDataMap, initShaderDataMap) {
    var nameArr = [];
    forEach(materialShaderLibConfig, function (item) {
        if (isString(item)) {
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
var _execBranch = requireCheckFunc(function (i, materialIndex, initShaderFuncDataMap, initShaderDataMap) {
    it("branch should exist", function () {
        expect(i.branch).exist;
    });
}, function (i, materialIndex, initShaderFuncDataMap, initShaderDataMap) {
    return i.branch(materialIndex, initShaderFuncDataMap, initShaderDataMap);
});
var _isShaderLibNameExist = function (name) { return !!name; };
export var getEmptyFuncGLSLConfig = function () {
    return {
        "top": "",
        "varDeclare": "",
        "funcDeclare": "",
        "funcDefine": "",
        "body": "",
        "defineList": []
    };
};
export var buildSourceDefine = function (defineList, initShaderDataMap) {
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
export var getGLSLPartData = function (glslConfig, partName) {
    var partConfig = glslConfig[partName];
    if (isConfigDataExist(partConfig)) {
        return partConfig;
    }
    else if (isConfigDataExist(glslConfig.source)) {
        return glslConfig.source[partName];
    }
    return "";
};
export var getGLSLDefineListData = function (glslConfig) {
    var partConfig = glslConfig.defineList;
    if (isConfigDataExist(partConfig)) {
        return partConfig;
    }
    return [];
};
export var getFuncGLSLPartData = function (glslConfig, partName) {
    return glslConfig[partName];
};
export var getFuncGLSLDefineListData = function (glslConfig) {
    return glslConfig.defineList;
};
var _isInSource = function (key, source) {
    return source.indexOf(key) > -1;
};
export var generateUniformSource = function (materialShaderLibNameArr, shaderLibData, sourceVarDeclare, sourceFuncDefine, sourceBody) {
    var result = "", generateFunc = compose(forEachArray(function (_a) {
        var name = _a.name, type = _a.type;
        result += "uniform " + _generateUniformSourceType(type) + " " + name + ";\n";
    }), filterArray(function (_a) {
        var name = _a.name;
        return _isInSource(name, sourceVarDeclare) || _isInSource(name, sourceFuncDefine) || _isInSource(name, sourceBody);
    }));
    forEach(materialShaderLibNameArr, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send, uniform = null, uniformDefine = null;
        if (!isConfigDataExist(sendData)) {
            return;
        }
        uniform = sendData.uniform;
        uniformDefine = sendData.uniformDefine;
        if (isConfigDataExist(uniform)) {
            generateFunc(uniform);
        }
        if (isConfigDataExist(uniformDefine)) {
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