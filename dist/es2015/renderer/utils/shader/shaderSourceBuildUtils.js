import { isConfigDataExist } from "../renderConfigUtils";
import { main_begin, main_end } from "../../shader/snippet/ShaderSnippet";
import { highp_fragment, lowp_fragment, mediump_fragment } from "../../shader/chunk/ShaderChunk";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import { EGPUPrecision, GPUDetector } from "../../device/GPUDetector";
import { it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { compose, filterArray, forEachArray } from "../../../utils/functionalUtils";
import { forEach } from "../../../utils/arrayUtils";
import { isString } from "../../../utils/JudgeUtils";
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
        vsDefine += _buildSourceDefine(getGLSLDefineListData(vs), initShaderDataMap) + getGLSLPartData(vs, "define");
        vsVarDeclare += getGLSLPartData(vs, "varDeclare");
        vsFuncDeclare += getGLSLPartData(vs, "funcDeclare");
        vsFuncDefine += getGLSLPartData(vs, "funcDefine");
        vsBody += getGLSLPartData(vs, "body");
    }, _setFs = function (getGLSLPartData, getGLSLDefineListData, fs) {
        fsTop += getGLSLPartData(fs, "top");
        fsDefine += _buildSourceDefine(getGLSLDefineListData(fs), initShaderDataMap) + getGLSLPartData(fs, "define");
        fsVarDeclare += getGLSLPartData(fs, "varDeclare");
        fsFuncDeclare += getGLSLPartData(fs, "funcDeclare");
        fsFuncDefine += getGLSLPartData(fs, "funcDefine");
        fsBody += getGLSLPartData(fs, "body");
    };
    vsBody += main_begin;
    fsBody += main_begin;
    fsTop += _getPrecisionSource(lowp_fragment, mediump_fragment, highp_fragment);
    forEach(materialShaderLibNameArr, function (shaderLibName) {
        var glslData = shaderLibData[shaderLibName].glsl, vs = null, fs = null, func = null;
        if (!isConfigDataExist(glslData)) {
            return;
        }
        vs = glslData.vs;
        fs = glslData.fs;
        func = glslData.func;
        if (isConfigDataExist(vs)) {
            _setVs(_getGLSLPartData, _getGLSLDefineListData, vs);
        }
        if (isConfigDataExist(fs)) {
            _setFs(_getGLSLPartData, _getGLSLDefineListData, fs);
        }
        if (isConfigDataExist(func)) {
            var funcConfig = func(materialIndex, funcDataMap, initShaderDataMap);
            if (isConfigDataExist(funcConfig)) {
                var vs_1 = funcConfig.vs, fs_1 = funcConfig.fs;
                if (isConfigDataExist(vs_1)) {
                    vs_1 = ExtendUtils.extend(_getEmptyFuncGLSLConfig(), vs_1);
                    _setVs(_getFuncGLSLPartData, _getFuncGLSLDefineListData, vs_1);
                }
                if (isConfigDataExist(fs_1)) {
                    fs_1 = ExtendUtils.extend(_getEmptyFuncGLSLConfig(), fs_1);
                    _setFs(_getFuncGLSLPartData, _getFuncGLSLDefineListData, fs_1);
                }
            }
        }
    });
    vsBody += main_end;
    fsBody += main_end;
    vsTop += _generateAttributeSource(materialShaderLibNameArr, shaderLibData);
    vsTop += _generateUniformSource(materialShaderLibNameArr, shaderLibData, vsVarDeclare, vsFuncDefine, vsBody);
    fsTop += _generateUniformSource(materialShaderLibNameArr, shaderLibData, fsVarDeclare, fsFuncDefine, fsBody);
    return {
        vsSource: vsTop + vsDefine + vsVarDeclare + vsFuncDeclare + vsFuncDefine + vsBody,
        fsSource: fsTop + fsDefine + fsVarDeclare + fsFuncDeclare + fsFuncDefine + fsBody
    };
});
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
var _getEmptyFuncGLSLConfig = function () {
    return {
        "top": "",
        "varDeclare": "",
        "funcDeclare": "",
        "funcDefine": "",
        "body": "",
        "defineList": []
    };
};
var _buildSourceDefine = function (defineList, initShaderDataMap) {
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
var _getGLSLDefineListData = function (glslConfig) {
    var partConfig = glslConfig.defineList;
    if (isConfigDataExist(partConfig)) {
        return partConfig;
    }
    return [];
};
var _getFuncGLSLPartData = function (glslConfig, partName) {
    return glslConfig[partName];
};
var _getFuncGLSLDefineListData = function (glslConfig) {
    return glslConfig.defineList;
};
var _isInSource = function (key, source) {
    return source.indexOf(key) > -1;
};
var _generateAttributeSource = function (materialShaderLibNameArr, shaderLibData) {
    var result = "";
    forEach(materialShaderLibNameArr, function (shaderLibName) {
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
var _generateUniformSource = function (materialShaderLibNameArr, shaderLibData, sourceVarDeclare, sourceFuncDefine, sourceBody) {
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