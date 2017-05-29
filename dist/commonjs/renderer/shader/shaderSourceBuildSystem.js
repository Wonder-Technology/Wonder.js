"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderConfigUtils_1 = require("../utils/renderConfigUtils");
var ShaderSnippet_1 = require("./snippet/ShaderSnippet");
var ShaderChunk_1 = require("./chunk/ShaderChunk");
var ExtendUtils_1 = require("wonder-commonlib/dist/commonjs/utils/ExtendUtils");
var GPUDetector_1 = require("../../device/GPUDetector");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var functionalUtils_1 = require("../../utils/functionalUtils");
var arrayUtils_1 = require("../../utils/arrayUtils");
exports.buildGLSLSource = contract_1.requireCheckFunc(function (materialIndex, materialShaderLibConfig, shaderLibData) {
    contract_1.it("shaderLib should be defined", function () {
        arrayUtils_1.forEach(materialShaderLibConfig, function (shaderLibName) {
            wonder_expect_js_1.expect(shaderLibData[shaderLibName]).exist;
        });
    });
}, function (materialIndex, materialShaderLibConfig, shaderLibData) {
    var vsTop = "", vsDefine = "", vsVarDeclare = "", vsFuncDeclare = "", vsFuncDefine = "", vsBody = "", fsTop = "", fsDefine = "", fsVarDeclare = "", fsFuncDeclare = "", fsFuncDefine = "", fsBody = "";
    vsBody += ShaderSnippet_1.main_begin;
    fsBody += ShaderSnippet_1.main_begin;
    fsTop += _getPrecisionSource(ShaderChunk_1.lowp_fragment, ShaderChunk_1.mediump_fragment, ShaderChunk_1.highp_fragment);
    arrayUtils_1.forEach(materialShaderLibConfig, function (shaderLibName) {
        var glslData = shaderLibData[shaderLibName].glsl, vs = null, fs = null, func = null;
        if (!renderConfigUtils_1.isConfigDataExist(glslData)) {
            return;
        }
        vs = glslData.vs;
        fs = glslData.fs;
        func = glslData.func;
        if (renderConfigUtils_1.isConfigDataExist(vs)) {
            vsTop += _getGLSLPartData(vs, "top");
            vsDefine += _getGLSLPartData(vs, "define");
            vsVarDeclare += _getGLSLPartData(vs, "varDeclare");
            vsFuncDeclare += _getGLSLPartData(vs, "funcDeclare");
            vsFuncDefine += _getGLSLPartData(vs, "funcDefine");
            vsBody += _getGLSLPartData(vs, "body");
        }
        if (renderConfigUtils_1.isConfigDataExist(fs)) {
            fsTop += _getGLSLPartData(fs, "top");
            fsDefine += _getGLSLPartData(fs, "define");
            fsVarDeclare += _getGLSLPartData(fs, "varDeclare");
            fsFuncDeclare += _getGLSLPartData(fs, "funcDeclare");
            fsFuncDefine += _getGLSLPartData(fs, "funcDefine");
            fsBody += _getGLSLPartData(fs, "body");
        }
        if (renderConfigUtils_1.isConfigDataExist(func)) {
            var funcConfig = func(materialIndex);
            if (renderConfigUtils_1.isConfigDataExist(funcConfig)) {
                var vs_1 = funcConfig.vs, fs_1 = funcConfig.fs;
                if (renderConfigUtils_1.isConfigDataExist(vs_1)) {
                    vs_1 = ExtendUtils_1.ExtendUtils.extend(_getEmptyFuncGLSLConfig(), vs_1);
                    vsTop += _getFuncGLSLPartData(vs_1, "top");
                    vsDefine += _getFuncGLSLPartData(vs_1, "define");
                    vsVarDeclare += _getFuncGLSLPartData(vs_1, "varDeclare");
                    vsFuncDeclare += _getFuncGLSLPartData(vs_1, "funcDeclare");
                    vsFuncDefine += _getFuncGLSLPartData(vs_1, "funcDefine");
                    vsBody += _getFuncGLSLPartData(vs_1, "body");
                }
                if (renderConfigUtils_1.isConfigDataExist(fs_1)) {
                    fs_1 = ExtendUtils_1.ExtendUtils.extend(_getEmptyFuncGLSLConfig(), fs_1);
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
    vsBody += ShaderSnippet_1.main_end;
    fsBody += ShaderSnippet_1.main_end;
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
    var precision = GPUDetector_1.GPUDetector.getInstance().precision, result = null;
    switch (precision) {
        case GPUDetector_1.EGPUPrecision.HIGHP:
            result = highp_fragment.top;
            break;
        case GPUDetector_1.EGPUPrecision.MEDIUMP:
            result = mediump_fragment.top;
            break;
        case GPUDetector_1.EGPUPrecision.LOWP:
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
    if (renderConfigUtils_1.isConfigDataExist(partConfig)) {
        return partConfig;
    }
    else if (renderConfigUtils_1.isConfigDataExist(glslConfig.source)) {
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
    arrayUtils_1.forEach(materialShaderLibConfig, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send, attributeData = null;
        if (!renderConfigUtils_1.isConfigDataExist(sendData) || !renderConfigUtils_1.isConfigDataExist(sendData.attribute)) {
            return;
        }
        attributeData = sendData.attribute;
        arrayUtils_1.forEach(attributeData, function (data) {
            result += "attribute " + data.type + " " + data.name + ";\n";
        });
    });
    return result;
};
var _generateUniformSource = function (materialShaderLibConfig, shaderLibData, sourceVarDeclare, sourceFuncDefine, sourceBody) {
    var result = "", generateFunc = functionalUtils_1.compose(functionalUtils_1.forEachArray(function (data) {
        result += "uniform " + data.type + " " + data.name + ";\n";
    }), functionalUtils_1.filterArray(function (data) {
        var name = data.name;
        return _isInSource(name, sourceVarDeclare) || _isInSource(name, sourceFuncDefine) || _isInSource(name, sourceBody);
    }));
    arrayUtils_1.forEach(materialShaderLibConfig, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send, uniformData = null;
        if (!renderConfigUtils_1.isConfigDataExist(sendData) || !renderConfigUtils_1.isConfigDataExist(sendData.uniform)) {
            return;
        }
        uniformData = sendData.uniform;
        generateFunc(uniformData);
    });
    return result;
};
//# sourceMappingURL=shaderSourceBuildSystem.js.map