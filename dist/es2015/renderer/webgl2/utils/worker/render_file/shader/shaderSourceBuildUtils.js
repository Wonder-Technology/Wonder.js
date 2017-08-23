import { isConfigDataExist } from "../../../../../utils/renderConfigUtils";
import { webgl2_main_begin, webgl2_main_end } from "../../../../shader/snippet/ShaderSnippet";
import { highp_fragment, lowp_fragment, mediump_fragment, version } from "../../../../../shader/chunk/ShaderChunk";
import { ExtendUtils } from "Wonder-CommonLib/dist/es2015/utils/ExtendUtils";
import { it, requireCheckFunc } from "../../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { forEach } from "../../../../../../utils/arrayUtils";
import { buildSourceDefine, generateUniformSource, getEmptyFuncGLSLConfig, getFuncGLSLDefineListData, getFuncGLSLPartData, getGLSLDefineListData, getGLSLPartData, getPrecisionSource } from "../../../../../utils/shader/shaderSourceBuildUtils";
export var buildGLSLSource = requireCheckFunc(function (materialIndex, materialShaderLibNameArr, shaderLibData, funcDataMap, initShaderDataMap) {
    it("shaderLib should be defined", function () {
        forEach(materialShaderLibNameArr, function (shaderLibName) {
            expect(shaderLibData[shaderLibName]).exist;
        });
    });
}, function (materialIndex, materialShaderLibNameArr, shaderLibData, funcDataMap, initShaderDataMap) {
    var vsTop = "", vsDefine = "", vsVarDeclare = "", vsFuncDeclare = "", vsFuncDefine = "", vsBody = "", fsTop = "", fsDefine = "", fsVarDeclare = "", fsFuncDeclare = "", fsFuncDefine = "", fsBody = "";
    var _setVs = function (getGLSLPartData, getGLSLDefineListData, vs) {
        vsTop += getGLSLPartData(vs, "top");
        vsDefine += buildSourceDefine(getGLSLDefineListData(vs), initShaderDataMap) + getGLSLPartData(vs, "define");
        vsVarDeclare += getGLSLPartData(vs, "varDeclare");
        vsFuncDeclare += getGLSLPartData(vs, "funcDeclare");
        vsFuncDefine += getGLSLPartData(vs, "funcDefine");
        vsBody += getGLSLPartData(vs, "body");
    }, _setFs = function (getGLSLPartData, getGLSLDefineListData, fs) {
        fsTop += getGLSLPartData(fs, "top");
        fsDefine += buildSourceDefine(getGLSLDefineListData(fs), initShaderDataMap) + getGLSLPartData(fs, "define");
        fsVarDeclare += getGLSLPartData(fs, "varDeclare");
        fsFuncDeclare += getGLSLPartData(fs, "funcDeclare");
        fsFuncDefine += getGLSLPartData(fs, "funcDefine");
        fsBody += getGLSLPartData(fs, "body");
    };
    vsBody += webgl2_main_begin;
    fsBody += webgl2_main_begin;
    vsTop += version.top;
    fsTop += version.top;
    fsTop += getPrecisionSource(lowp_fragment, mediump_fragment, highp_fragment, initShaderDataMap.GPUDetectDataFromSystem);
    forEach(materialShaderLibNameArr, function (shaderLibName) {
        var glslData = shaderLibData[shaderLibName].glsl, vs = null, fs = null, func = null;
        if (!isConfigDataExist(glslData)) {
            return;
        }
        vs = glslData.vs;
        fs = glslData.fs;
        func = glslData.func;
        if (isConfigDataExist(vs)) {
            _setVs(getGLSLPartData, getGLSLDefineListData, vs);
        }
        if (isConfigDataExist(fs)) {
            _setFs(getGLSLPartData, getGLSLDefineListData, fs);
        }
        if (isConfigDataExist(func)) {
            var funcConfig = func(materialIndex, funcDataMap, initShaderDataMap);
            if (isConfigDataExist(funcConfig)) {
                var vs_1 = funcConfig.vs, fs_1 = funcConfig.fs;
                if (isConfigDataExist(vs_1)) {
                    vs_1 = ExtendUtils.extend(getEmptyFuncGLSLConfig(), vs_1);
                    _setVs(getFuncGLSLPartData, getFuncGLSLDefineListData, vs_1);
                }
                if (isConfigDataExist(fs_1)) {
                    fs_1 = ExtendUtils.extend(getEmptyFuncGLSLConfig(), fs_1);
                    _setFs(getFuncGLSLPartData, getFuncGLSLDefineListData, fs_1);
                }
            }
        }
    });
    vsBody += webgl2_main_end;
    fsBody += webgl2_main_end;
    vsTop += _generateAttributeSource(materialShaderLibNameArr, shaderLibData);
    vsTop += generateUniformSource(materialShaderLibNameArr, shaderLibData, vsVarDeclare, vsFuncDefine, vsBody);
    fsTop += generateUniformSource(materialShaderLibNameArr, shaderLibData, fsVarDeclare, fsFuncDefine, fsBody);
    return {
        vsSource: vsTop + vsDefine + vsVarDeclare + vsFuncDeclare + vsFuncDefine + vsBody,
        fsSource: fsTop + fsDefine + fsVarDeclare + fsFuncDeclare + fsFuncDefine + fsBody
    };
});
var _generateAttributeSource = function (materialShaderLibNameArr, shaderLibData) {
    var result = "";
    forEach(materialShaderLibNameArr, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send, attributeData = null;
        if (!isConfigDataExist(sendData) || !isConfigDataExist(sendData.attribute)) {
            return;
        }
        attributeData = sendData.attribute;
        forEach(attributeData, function (_a) {
            var name = _a.name, type = _a.type, location = _a.location;
            result += "layout(location=" + location + ") in " + type + " " + name + ";\n";
        });
    });
    return result;
};
//# sourceMappingURL=shaderSourceBuildUtils.js.map