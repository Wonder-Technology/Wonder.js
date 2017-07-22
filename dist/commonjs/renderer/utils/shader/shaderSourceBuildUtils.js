"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderConfigUtils_1 = require("../renderConfigUtils");
var ShaderSnippet_1 = require("../../shader/snippet/ShaderSnippet");
var ShaderChunk_1 = require("../../shader/chunk/ShaderChunk");
var ExtendUtils_1 = require("wonder-commonlib/dist/commonjs/utils/ExtendUtils");
var GPUDetector_1 = require("../../device/GPUDetector");
var contract_1 = require("../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var functionalUtils_1 = require("../../../utils/functionalUtils");
var arrayUtils_1 = require("../../../utils/arrayUtils");
var JudgeUtils_1 = require("../../../utils/JudgeUtils");
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
    vsBody += ShaderSnippet_1.main_begin;
    fsBody += ShaderSnippet_1.main_begin;
    fsTop += _getPrecisionSource(ShaderChunk_1.lowp_fragment, ShaderChunk_1.mediump_fragment, ShaderChunk_1.highp_fragment);
    arrayUtils_1.forEach(materialShaderLibNameArr, function (shaderLibName) {
        var glslData = shaderLibData[shaderLibName].glsl, vs = null, fs = null, func = null;
        if (!renderConfigUtils_1.isConfigDataExist(glslData)) {
            return;
        }
        vs = glslData.vs;
        fs = glslData.fs;
        func = glslData.func;
        if (renderConfigUtils_1.isConfigDataExist(vs)) {
            _setVs(_getGLSLPartData, _getGLSLDefineListData, vs);
        }
        if (renderConfigUtils_1.isConfigDataExist(fs)) {
            _setFs(_getGLSLPartData, _getGLSLDefineListData, fs);
        }
        if (renderConfigUtils_1.isConfigDataExist(func)) {
            var funcConfig = func(materialIndex, funcDataMap, initShaderDataMap);
            if (renderConfigUtils_1.isConfigDataExist(funcConfig)) {
                var vs_1 = funcConfig.vs, fs_1 = funcConfig.fs;
                if (renderConfigUtils_1.isConfigDataExist(vs_1)) {
                    vs_1 = ExtendUtils_1.ExtendUtils.extend(_getEmptyFuncGLSLConfig(), vs_1);
                    _setVs(_getFuncGLSLPartData, _getFuncGLSLDefineListData, vs_1);
                }
                if (renderConfigUtils_1.isConfigDataExist(fs_1)) {
                    fs_1 = ExtendUtils_1.ExtendUtils.extend(_getEmptyFuncGLSLConfig(), fs_1);
                    _setFs(_getFuncGLSLPartData, _getFuncGLSLDefineListData, fs_1);
                }
            }
        }
    });
    vsBody += ShaderSnippet_1.main_end;
    fsBody += ShaderSnippet_1.main_end;
    vsTop += _generateAttributeSource(materialShaderLibNameArr, shaderLibData);
    vsTop += _generateUniformSource(materialShaderLibNameArr, shaderLibData, vsVarDeclare, vsFuncDefine, vsBody);
    fsTop += _generateUniformSource(materialShaderLibNameArr, shaderLibData, fsVarDeclare, fsFuncDefine, fsBody);
    return {
        vsSource: vsTop + vsDefine + vsVarDeclare + vsFuncDeclare + vsFuncDefine + vsBody,
        fsSource: fsTop + fsDefine + fsVarDeclare + fsFuncDeclare + fsFuncDefine + fsBody
    };
});
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
var _getGLSLDefineListData = function (glslConfig) {
    var partConfig = glslConfig.defineList;
    if (renderConfigUtils_1.isConfigDataExist(partConfig)) {
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
    arrayUtils_1.forEach(materialShaderLibNameArr, function (shaderLibName) {
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
var _generateUniformSource = function (materialShaderLibNameArr, shaderLibData, sourceVarDeclare, sourceFuncDefine, sourceBody) {
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