"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderConfigUtils_1 = require("../../../../../utils/renderConfigUtils");
var ShaderSnippet_1 = require("../../../../shader/snippet/ShaderSnippet");
var ShaderChunk_1 = require("../../../../../shader/chunk/ShaderChunk");
var ExtendUtils_1 = require("Wonder-CommonLib/dist/commonjs/utils/ExtendUtils");
var contract_1 = require("../../../../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var arrayUtils_1 = require("../../../../../../utils/arrayUtils");
var shaderSourceBuildUtils_1 = require("../../../../../utils/shader/shaderSourceBuildUtils");
exports.buildGLSLSource = contract_1.requireCheckFunc(function (materialIndex, materialShaderLibNameArr, shaderLibData, funcDataMap, initShaderDataMap) {
    contract_1.it("shaderLib should be defined", function () {
        arrayUtils_1.forEach(materialShaderLibNameArr, function (shaderLibName) {
            wonder_expect_js_1.expect(shaderLibData[shaderLibName]).exist;
        });
    });
}, function (materialIndex, materialShaderLibNameArr, shaderLibData, funcDataMap, initShaderDataMap) {
    var vsTop = "", vsDefine = "", vsVarDeclare = "", vsFuncDeclare = "", vsFuncDefine = "", vsBody = "", fsTop = "", fsDefine = "", fsVarDeclare = "", fsFuncDeclare = "", fsFuncDefine = "", fsBody = "";
    var _setVs = function (getGLSLPartData, getGLSLDefineListData, vs) {
        vsTop += getGLSLPartData(vs, "top");
        vsDefine += shaderSourceBuildUtils_1.buildSourceDefine(getGLSLDefineListData(vs), initShaderDataMap) + getGLSLPartData(vs, "define");
        vsVarDeclare += getGLSLPartData(vs, "varDeclare");
        vsFuncDeclare += getGLSLPartData(vs, "funcDeclare");
        vsFuncDefine += getGLSLPartData(vs, "funcDefine");
        vsBody += getGLSLPartData(vs, "body");
    }, _setFs = function (getGLSLPartData, getGLSLDefineListData, fs) {
        fsTop += getGLSLPartData(fs, "top");
        fsDefine += shaderSourceBuildUtils_1.buildSourceDefine(getGLSLDefineListData(fs), initShaderDataMap) + getGLSLPartData(fs, "define");
        fsVarDeclare += getGLSLPartData(fs, "varDeclare");
        fsFuncDeclare += getGLSLPartData(fs, "funcDeclare");
        fsFuncDefine += getGLSLPartData(fs, "funcDefine");
        fsBody += getGLSLPartData(fs, "body");
    };
    vsBody += ShaderSnippet_1.webgl2_main_begin;
    fsBody += ShaderSnippet_1.webgl2_main_begin;
    vsTop += ShaderChunk_1.version.top;
    fsTop += ShaderChunk_1.version.top;
    fsTop += shaderSourceBuildUtils_1.getPrecisionSource(ShaderChunk_1.lowp_fragment, ShaderChunk_1.mediump_fragment, ShaderChunk_1.highp_fragment, initShaderDataMap.GPUDetectDataFromSystem);
    arrayUtils_1.forEach(materialShaderLibNameArr, function (shaderLibName) {
        var glslData = shaderLibData[shaderLibName].glsl, vs = null, fs = null, func = null;
        if (!renderConfigUtils_1.isConfigDataExist(glslData)) {
            return;
        }
        vs = glslData.vs;
        fs = glslData.fs;
        func = glslData.func;
        if (renderConfigUtils_1.isConfigDataExist(vs)) {
            _setVs(shaderSourceBuildUtils_1.getGLSLPartData, shaderSourceBuildUtils_1.getGLSLDefineListData, vs);
        }
        if (renderConfigUtils_1.isConfigDataExist(fs)) {
            _setFs(shaderSourceBuildUtils_1.getGLSLPartData, shaderSourceBuildUtils_1.getGLSLDefineListData, fs);
        }
        if (renderConfigUtils_1.isConfigDataExist(func)) {
            var funcConfig = func(materialIndex, funcDataMap, initShaderDataMap);
            if (renderConfigUtils_1.isConfigDataExist(funcConfig)) {
                var vs_1 = funcConfig.vs, fs_1 = funcConfig.fs;
                if (renderConfigUtils_1.isConfigDataExist(vs_1)) {
                    vs_1 = ExtendUtils_1.ExtendUtils.extend(shaderSourceBuildUtils_1.getEmptyFuncGLSLConfig(), vs_1);
                    _setVs(shaderSourceBuildUtils_1.getFuncGLSLPartData, shaderSourceBuildUtils_1.getFuncGLSLDefineListData, vs_1);
                }
                if (renderConfigUtils_1.isConfigDataExist(fs_1)) {
                    fs_1 = ExtendUtils_1.ExtendUtils.extend(shaderSourceBuildUtils_1.getEmptyFuncGLSLConfig(), fs_1);
                    _setFs(shaderSourceBuildUtils_1.getFuncGLSLPartData, shaderSourceBuildUtils_1.getFuncGLSLDefineListData, fs_1);
                }
            }
        }
    });
    vsBody += ShaderSnippet_1.webgl2_main_end;
    fsBody += ShaderSnippet_1.webgl2_main_end;
    vsTop += _generateAttributeSource(materialShaderLibNameArr, shaderLibData);
    vsTop += shaderSourceBuildUtils_1.generateUniformSource(materialShaderLibNameArr, shaderLibData, vsVarDeclare, vsFuncDefine, vsBody);
    fsTop += shaderSourceBuildUtils_1.generateUniformSource(materialShaderLibNameArr, shaderLibData, fsVarDeclare, fsFuncDefine, fsBody);
    return {
        vsSource: vsTop + vsDefine + vsVarDeclare + vsFuncDeclare + vsFuncDefine + vsBody,
        fsSource: fsTop + fsDefine + fsVarDeclare + fsFuncDeclare + fsFuncDefine + fsBody
    };
});
var _generateAttributeSource = function (materialShaderLibNameArr, shaderLibData) {
    var result = "";
    arrayUtils_1.forEach(materialShaderLibNameArr, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send, attributeData = null;
        if (!renderConfigUtils_1.isConfigDataExist(sendData) || !renderConfigUtils_1.isConfigDataExist(sendData.attribute)) {
            return;
        }
        attributeData = sendData.attribute;
        arrayUtils_1.forEach(attributeData, function (_a) {
            var name = _a.name, type = _a.type, location = _a.location;
            result += "layout(location=" + location + ") in " + type + " " + name + ";\n";
        });
    });
    return result;
};
//# sourceMappingURL=shaderSourceBuildUtils.js.map