import { isConfigDataExist } from "../utils/renderConfigUtils";
import {
    IGLSLConfig, IGLSLFuncConfig, ISendAttributeConfig,
    IShaderLibContentGenerator
} from "../data/shaderLib_generator";
import { main_begin, main_end } from "./snippet/ShaderSnippet";
import { GLSLChunk, highp_fragment, lowp_fragment, mediump_fragment } from "./chunk/ShaderChunk";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import { EGPUPrecision, GPUDetector } from "../device/GPUDetector";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { MaterialShaderLibConfig } from "../data/material_config";
import { expect } from "wonder-expect.js";
import { compose, filterArray, forEachArray } from "../../utils/functionalUtils";
import { forEach } from "../../utils/arrayUtils";

export var buildGLSLSource = requireCheckFunc((materialIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator) => {
    it("shaderLib should be defined", () => {
        forEach(materialShaderLibConfig, (shaderLibName: string) => {
            expect(shaderLibData[shaderLibName]).exist;
        })
    });
}, (materialIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator) => {
    var vsTop: string = "",
        vsDefine: string = "",
        vsVarDeclare: string = "",
        vsFuncDeclare: string = "",
        vsFuncDefine: string = "",
        vsBody: string = "",
        fsTop: string = "",
        fsDefine: string = "",
        fsVarDeclare: string = "",
        fsFuncDeclare: string = "",
        fsFuncDefine: string = "",
        fsBody: string = "";

    vsBody += main_begin;
    fsBody += main_begin;

    fsTop += _getPrecisionSource(lowp_fragment, mediump_fragment, highp_fragment);

    forEach(materialShaderLibConfig, (shaderLibName: string) => {
        var glslData = shaderLibData[shaderLibName].glsl,
            vs = null,
            fs = null,
            func = null;

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
            let funcConfig: IGLSLFuncConfig = func(materialIndex);

            if (isConfigDataExist(funcConfig)) {
                let vs = funcConfig.vs,
                    fs = funcConfig.fs;

                if (isConfigDataExist(vs)) {
                    vs = ExtendUtils.extend(_getEmptyFuncGLSLConfig(), vs);

                    vsTop += _getFuncGLSLPartData(vs, "top");
                    vsDefine += _getFuncGLSLPartData(vs, "define");
                    vsVarDeclare += _getFuncGLSLPartData(vs, "varDeclare");
                    vsFuncDeclare += _getFuncGLSLPartData(vs, "funcDeclare");
                    vsFuncDefine += _getFuncGLSLPartData(vs, "funcDefine");
                    vsBody += _getFuncGLSLPartData(vs, "body");
                }

                if (isConfigDataExist(fs)) {
                    fs = ExtendUtils.extend(_getEmptyFuncGLSLConfig(), fs);

                    fsTop += _getFuncGLSLPartData(fs, "top");
                    fsDefine += _getFuncGLSLPartData(fs, "define");
                    fsVarDeclare += _getFuncGLSLPartData(fs, "varDeclare");
                    fsFuncDeclare += _getFuncGLSLPartData(fs, "funcDeclare");
                    fsFuncDefine += _getFuncGLSLPartData(fs, "funcDefine");
                    fsBody += _getFuncGLSLPartData(fs, "body");
                }
            }
        }
    })

    vsBody += main_end;
    fsBody += main_end;

    vsTop += _generateAttributeSource(materialShaderLibConfig, shaderLibData);
    vsTop += _generateUniformSource(materialShaderLibConfig, shaderLibData, vsVarDeclare, vsFuncDefine, vsBody);
    fsTop += _generateUniformSource(materialShaderLibConfig, shaderLibData, fsVarDeclare, fsFuncDefine, fsBody);

    return {
        vsSource: vsTop + vsDefine + vsVarDeclare + vsFuncDeclare + vsFuncDefine + vsBody,
        fsSource: fsTop + fsDefine + fsVarDeclare + fsFuncDeclare + fsFuncDefine + fsBody
    }
})

var _getEmptyFuncGLSLConfig = () => {
    return {
        "top": "",
        "varDeclare": "",
        "funcDeclare": "",
        "funcDefine": "",
        "body": ""
    }
}

var _getPrecisionSource = (lowp_fragment: GLSLChunk, mediump_fragment: GLSLChunk, highp_fragment: GLSLChunk) => {
    var precision = GPUDetector.getInstance().precision,
        result = null;

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
}

var _getGLSLPartData = (glslConfig: IGLSLConfig, partName: string) => {
    var partConfig = glslConfig[partName];

    if (isConfigDataExist(partConfig)) {
        return partConfig;
    }
    else if (isConfigDataExist(glslConfig.source)) {
        return glslConfig.source[partName];
    }

    return "";
}

var _getFuncGLSLPartData = (glslConfig: IGLSLConfig, partName: string) => {
    return glslConfig[partName];
}

var _isInSource = (key: string, source: string) => {
    return source.indexOf(key) > -1;
}

var _generateAttributeSource = (materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator) => {
    var result = "";

    forEach(materialShaderLibConfig, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send,
            attributeData = null;

        if (!isConfigDataExist(sendData) || !isConfigDataExist(sendData.attribute)) {
            return;
        }

        attributeData = sendData.attribute;

        forEach(attributeData, (data: ISendAttributeConfig) => {
            result += `attribute ${data.type} ${data.name};\n`;
        });
    });

    return result;
}

var _generateUniformSource = (materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, sourceVarDeclare: string, sourceFuncDefine: string, sourceBody: string) => {
    var result = "",
        generateFunc = compose(
            forEachArray((data: ISendAttributeConfig) => {
                result += `uniform ${data.type} ${data.name};\n`;
            }),
            filterArray((data: ISendAttributeConfig) => {
                var name = data.name;

                return _isInSource(name, sourceVarDeclare) || _isInSource(name, sourceFuncDefine) || _isInSource(name, sourceBody);
            })
        );

    forEach(materialShaderLibConfig, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send,
            uniformData = null;

        if (!isConfigDataExist(sendData) || !isConfigDataExist(sendData.uniform)) {
            return;
        }

        uniformData = sendData.uniform;

        generateFunc(uniformData);
    });

    return result;
}

