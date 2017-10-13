import { isConfigDataExist } from "../../../../../utils/renderConfigUtils";
import { webgl1_main_begin, webgl1_main_end } from "../../../../../webgl1/shader/snippet/ShaderSnippet";
import { highp_fragment, lowp_fragment, mediump_fragment } from "../../../../../shader/chunk/ShaderChunk";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import { it, requireCheckFunc } from "../../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { forEach } from "../../../../../../utils/arrayUtils";
import { BuildGLSLSourceFuncFuncDataMap } from "../../../../../type/dataType";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import {
    IWebGL1GLSLConfig, IWebGL1GLSLFuncConfig, IWebGL1SendAttributeConfig,
    IWebGL1ShaderLibContentGenerator
} from "../../../../../worker/webgl1/both_file/data/shaderLib_generator";
import {
    buildSourceDefine, generateUniformSource, getEmptyFuncGLSLConfig, getFuncGLSLDefineListData, getFuncGLSLPartData,
    getGLSLDefineListData,
    getGLSLPartData,
    getPrecisionSource
} from "../../../../../utils/shader/shaderSourceBuildUtils";
import { WebGL1InitShaderFuncDataMap } from "../../../../type/utilsType";

export const buildGLSLSource = requireCheckFunc((materialIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL1ShaderLibContentGenerator, funcDataMap: BuildGLSLSourceFuncFuncDataMap, initShaderDataMap: WebGL1InitShaderFuncDataMap) => {
    it("shaderLib should be defined", () => {
        forEach(materialShaderLibNameArr, (shaderLibName: string) => {
            expect(shaderLibData[shaderLibName]).exist;
        })
    });
}, (materialIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL1ShaderLibContentGenerator, funcDataMap: BuildGLSLSourceFuncFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
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
    const _setVs =(getGLSLPartData: Function, getGLSLDefineListData: Function, vs: IWebGL1GLSLConfig) => {
        vsTop += getGLSLPartData(vs, "top");
        vsDefine += buildSourceDefine(getGLSLDefineListData(vs), initShaderDataMap) + getGLSLPartData(vs, "define");
        vsVarDeclare += getGLSLPartData(vs, "varDeclare");
        vsFuncDeclare += getGLSLPartData(vs, "funcDeclare");
        vsFuncDefine += getGLSLPartData(vs, "funcDefine");
        vsBody += getGLSLPartData(vs, "body");
    },
        _setFs = (getGLSLPartData: Function, getGLSLDefineListData: Function, fs: IWebGL1GLSLConfig) => {
            fsTop += getGLSLPartData(fs, "top");
            fsDefine += buildSourceDefine(getGLSLDefineListData(fs), initShaderDataMap) + getGLSLPartData(fs, "define");
            fsVarDeclare += getGLSLPartData(fs, "varDeclare");
            fsFuncDeclare += getGLSLPartData(fs, "funcDeclare");
            fsFuncDefine += getGLSLPartData(fs, "funcDefine");
            fsBody += getGLSLPartData(fs, "body");
        };

    vsBody += webgl1_main_begin;
    fsBody += webgl1_main_begin;

    fsTop += getPrecisionSource(lowp_fragment, mediump_fragment, highp_fragment, initShaderDataMap.GPUDetectDataFromSystem);

    forEach(materialShaderLibNameArr, (shaderLibName: string) => {
        var glslData = shaderLibData[shaderLibName].glsl,
            vs: IWebGL1GLSLConfig = null,
            fs: IWebGL1GLSLConfig = null,
            func: Function = null;

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
            let funcConfig: IWebGL1GLSLFuncConfig = func(materialIndex, funcDataMap, initShaderDataMap);

            if (isConfigDataExist(funcConfig)) {
                let vs = funcConfig.vs,
                    fs = funcConfig.fs;

                if (isConfigDataExist(vs)) {
                    vs = ExtendUtils.extend(getEmptyFuncGLSLConfig(), vs);

                    _setVs(getFuncGLSLPartData, getFuncGLSLDefineListData, vs);
                }

                if (isConfigDataExist(fs)) {
                    fs = ExtendUtils.extend(getEmptyFuncGLSLConfig(), fs);

                    _setFs(getFuncGLSLPartData, getFuncGLSLDefineListData, fs);
                }
            }
        }
    });

    vsBody += webgl1_main_end;
    fsBody += webgl1_main_end;

    vsTop += _generateAttributeSource(materialShaderLibNameArr, shaderLibData);
    vsTop += generateUniformSource(materialShaderLibNameArr, shaderLibData, vsVarDeclare, vsFuncDefine, vsBody);
    fsTop += generateUniformSource(materialShaderLibNameArr, shaderLibData, fsVarDeclare, fsFuncDefine, fsBody);

    return {
        vsSource: vsTop + vsDefine + vsVarDeclare + vsFuncDeclare + vsFuncDefine + vsBody,
        fsSource: fsTop + fsDefine + fsVarDeclare + fsFuncDeclare + fsFuncDefine + fsBody
    }
})

const _generateAttributeSource =(materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL1ShaderLibContentGenerator) => {
    var result = "";

    forEach(materialShaderLibNameArr, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send,
            attributeData = null;

        if (!isConfigDataExist(sendData) || !isConfigDataExist(sendData.attribute)) {
            return;
        }

        attributeData = sendData.attribute;

        forEach(attributeData, (data: IWebGL1SendAttributeConfig) => {
            result += `attribute ${data.type} ${data.name};\n`;
        });
    });

    return result;
}

