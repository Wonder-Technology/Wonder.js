import { isConfigDataExist } from "../renderConfigUtils";
import { main_begin, main_end } from "../../shader/snippet/ShaderSnippet";
import { highp_fragment, lowp_fragment, mediump_fragment } from "../../shader/chunk/ShaderChunk";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import { EGPUPrecision, GPUDetector } from "../../device/GPUDetector";
import { it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { compose, filterArray, forEachArray } from "../../../utils/functionalUtils";
import { forEach } from "../../../utils/arrayUtils";
export var buildGLSLSource = requireCheckFunc(function (materialIndex, materialShaderLibConfig, shaderLibData, funcDataMap, MaterialDataFromSystem) {
    it("shaderLib should be defined", function () {
        forEach(materialShaderLibConfig, function (shaderLibName) {
            expect(shaderLibData[shaderLibName]).exist;
        });
    });
}, function (materialIndex, materialShaderLibConfig, shaderLibData, funcDataMap, MaterialDataFromSystem) {
    var vsTop = "", vsDefine = "", vsVarDeclare = "", vsFuncDeclare = "", vsFuncDefine = "", vsBody = "", fsTop = "", fsDefine = "", fsVarDeclare = "", fsFuncDeclare = "", fsFuncDefine = "", fsBody = "";
    vsBody += main_begin;
    fsBody += main_begin;
    fsTop += _getPrecisionSource(lowp_fragment, mediump_fragment, highp_fragment);
    forEach(materialShaderLibConfig, function (shaderLibName) {
        var glslData = shaderLibData[shaderLibName].glsl, vs = null, fs = null, func = null;
        if (!isConfigDataExist(glslData)) {
            return;
        }
        vs = glslData.vs;
        fs = glslData.fs;
        func = glslData.func;
        if (isConfigDataExist(vs)) {
            vsTop += _getGLSLPartData(vs, "top");
            vsDefine += _getGLSLPartData(vs, "define");
            vsVarDeclare += _getGLSLPartData(vs, "varDeclare");
            vsFuncDeclare += _getGLSLPartData(vs, "funcDeclare");
            vsFuncDefine += _getGLSLPartData(vs, "funcDefine");
            vsBody += _getGLSLPartData(vs, "body");
        }
        if (isConfigDataExist(fs)) {
            fsTop += _getGLSLPartData(fs, "top");
            fsDefine += _getGLSLPartData(fs, "define");
            fsVarDeclare += _getGLSLPartData(fs, "varDeclare");
            fsFuncDeclare += _getGLSLPartData(fs, "funcDeclare");
            fsFuncDefine += _getGLSLPartData(fs, "funcDefine");
            fsBody += _getGLSLPartData(fs, "body");
        }
        if (isConfigDataExist(func)) {
            var funcConfig = func(materialIndex, funcDataMap, MaterialDataFromSystem);
            if (isConfigDataExist(funcConfig)) {
                var vs_1 = funcConfig.vs, fs_1 = funcConfig.fs;
                if (isConfigDataExist(vs_1)) {
                    vs_1 = ExtendUtils.extend(_getEmptyFuncGLSLConfig(), vs_1);
                    vsTop += _getFuncGLSLPartData(vs_1, "top");
                    vsDefine += _getFuncGLSLPartData(vs_1, "define");
                    vsVarDeclare += _getFuncGLSLPartData(vs_1, "varDeclare");
                    vsFuncDeclare += _getFuncGLSLPartData(vs_1, "funcDeclare");
                    vsFuncDefine += _getFuncGLSLPartData(vs_1, "funcDefine");
                    vsBody += _getFuncGLSLPartData(vs_1, "body");
                }
                if (isConfigDataExist(fs_1)) {
                    fs_1 = ExtendUtils.extend(_getEmptyFuncGLSLConfig(), fs_1);
                    fsTop += _getFuncGLSLPartData(fs_1, "top");
                    fsDefine += _getFuncGLSLPartData(fs_1, "define");
                    fsVarDeclare += _getFuncGLSLPartData(fs_1, "varDeclare");
                    fsFuncDeclare += _getFuncGLSLPartData(fs_1, "funcDeclare");
                    fsFuncDefine += _getFuncGLSLPartData(fs_1, "funcDefine");
                    fsBody += _getFuncGLSLPartData(fs_1, "body");
                }
            }
        }
    });
    vsBody += main_end;
    fsBody += main_end;
    vsTop += _generateAttributeSource(materialShaderLibConfig, shaderLibData);
    vsTop += _generateUniformSource(materialShaderLibConfig, shaderLibData, vsVarDeclare, vsFuncDefine, vsBody);
    fsTop += _generateUniformSource(materialShaderLibConfig, shaderLibData, fsVarDeclare, fsFuncDefine, fsBody);
    return {
        vsSource: vsTop + vsDefine + vsVarDeclare + vsFuncDeclare + vsFuncDefine + vsBody,
        fsSource: fsTop + fsDefine + fsVarDeclare + fsFuncDeclare + fsFuncDefine + fsBody
    };
});
var _getEmptyFuncGLSLConfig = function () {
    return {
        "top": "",
        "varDeclare": "",
        "funcDeclare": "",
        "funcDefine": "",
        "body": ""
    };
};
var _getPrecisionSource = function (lowp_fragment, mediump_fragment, highp_fragment) {
    var precision = GPUDetector.getInstance().precision, result = null;
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
var _getGLSLPartData = function (glslConfig, partName) {
    var partConfig = glslConfig[partName];
    if (isConfigDataExist(partConfig)) {
        return partConfig;
    }
    else if (isConfigDataExist(glslConfig.source)) {
        return glslConfig.source[partName];
    }
    return "";
};
var _getFuncGLSLPartData = function (glslConfig, partName) {
    return glslConfig[partName];
};
var _isInSource = function (key, source) {
    return source.indexOf(key) > -1;
};
var _generateAttributeSource = function (materialShaderLibConfig, shaderLibData) {
    var result = "";
    forEach(materialShaderLibConfig, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send, attributeData = null;
        if (!isConfigDataExist(sendData) || !isConfigDataExist(sendData.attribute)) {
            return;
        }
        attributeData = sendData.attribute;
        forEach(attributeData, function (data) {
            result += "attribute " + data.type + " " + data.name + ";\n";
        });
    });
    return result;
};
var _generateUniformSource = function (materialShaderLibConfig, shaderLibData, sourceVarDeclare, sourceFuncDefine, sourceBody) {
    var result = "", generateFunc = compose(forEachArray(function (data) {
        result += "uniform " + data.type + " " + data.name + ";\n";
    }), filterArray(function (data) {
        var name = data.name;
        return _isInSource(name, sourceVarDeclare) || _isInSource(name, sourceFuncDefine) || _isInSource(name, sourceBody);
    }));
    forEach(materialShaderLibConfig, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send, uniformData = null;
        if (!isConfigDataExist(sendData) || !isConfigDataExist(sendData.uniform)) {
            return;
        }
        uniformData = sendData.uniform;
        generateFunc(uniformData);
    });
    return result;
};
//# sourceMappingURL=shaderSourceBuildUtils.js.map