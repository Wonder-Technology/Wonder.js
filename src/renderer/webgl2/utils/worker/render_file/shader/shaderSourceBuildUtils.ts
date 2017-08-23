import { isConfigDataExist } from "../../../../../utils/renderConfigUtils";
import { webgl2_main_begin, webgl2_main_end } from "../../../../shader/snippet/ShaderSnippet";
import { highp_fragment, lowp_fragment, mediump_fragment, version } from "../../../../../shader/chunk/ShaderChunk";
import { ExtendUtils } from "Wonder-CommonLib/dist/es2015/utils/ExtendUtils";
import { it, requireCheckFunc } from "../../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { forEach } from "../../../../../../utils/arrayUtils";
import { BuildGLSLSourceFuncFuncDataMap } from "../../../../../type/dataType";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import {
    IWebGL2GLSLConfig, IWebGL2GLSLFuncConfig,
    IWebGL2ShaderLibContentGenerator
} from "../../../../../worker/webgl2/both_file/data/shaderLib_generator";
import {
    buildSourceDefine,
    generateUniformSource, getEmptyFuncGLSLConfig, getFuncGLSLDefineListData, getFuncGLSLPartData,
    getGLSLDefineListData, getGLSLPartData,
    getPrecisionSource
} from "../../../../../utils/shader/shaderSourceBuildUtils";
import { IWebGL2InitShaderFuncDataMap } from "../interface/IUtils";

export var buildGLSLSource = requireCheckFunc((materialIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL2ShaderLibContentGenerator, funcDataMap: BuildGLSLSourceFuncFuncDataMap, initShaderDataMap: IWebGL2InitShaderFuncDataMap) => {
    it("shaderLib should be defined", () => {
        forEach(materialShaderLibNameArr, (shaderLibName: string) => {
            expect(shaderLibData[shaderLibName]).exist;
        })
    });
}, (materialIndex: number, materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL2ShaderLibContentGenerator, funcDataMap: BuildGLSLSourceFuncFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
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
    var _setVs = (getGLSLPartData: Function, getGLSLDefineListData: Function, vs: IWebGL2GLSLConfig) => {
        vsTop += getGLSLPartData(vs, "top");
        vsDefine += buildSourceDefine(getGLSLDefineListData(vs), initShaderDataMap) + getGLSLPartData(vs, "define");
        vsVarDeclare += getGLSLPartData(vs, "varDeclare");
        vsFuncDeclare += getGLSLPartData(vs, "funcDeclare");
        vsFuncDefine += getGLSLPartData(vs, "funcDefine");
        vsBody += getGLSLPartData(vs, "body");
    },
        _setFs = (getGLSLPartData: Function, getGLSLDefineListData: Function, fs: IWebGL2GLSLConfig) => {
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

    forEach(materialShaderLibNameArr, (shaderLibName: string) => {
        var glslData = shaderLibData[shaderLibName].glsl,
            vs: IWebGL2GLSLConfig = null,
            fs: IWebGL2GLSLConfig = null,
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
            let funcConfig: IWebGL2GLSLFuncConfig = func(materialIndex, funcDataMap, initShaderDataMap);

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

    vsBody += webgl2_main_end;
    fsBody += webgl2_main_end;

    vsTop += _generateAttributeSource(materialShaderLibNameArr, shaderLibData);
    vsTop += generateUniformSource(materialShaderLibNameArr, shaderLibData, vsVarDeclare, vsFuncDefine, vsBody);
    fsTop += generateUniformSource(materialShaderLibNameArr, shaderLibData, fsVarDeclare, fsFuncDefine, fsBody);

    return {
        vsSource: vsTop + vsDefine + vsVarDeclare + vsFuncDeclare + vsFuncDefine + vsBody,
        fsSource: fsTop + fsDefine + fsVarDeclare + fsFuncDeclare + fsFuncDefine + fsBody
    }
})

var _generateAttributeSource = (materialShaderLibNameArr: Array<string>, shaderLibData: IWebGL2ShaderLibContentGenerator) => {
    var result = "";

    forEach(materialShaderLibNameArr, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send,
            attributeData = null;

        if (!isConfigDataExist(sendData) || !isConfigDataExist(sendData.attribute)) {
            return;
        }

        attributeData = sendData.attribute;

        forEach(attributeData, ({
                                    name,
            type,
            location
                                }) => {
            result += `layout(location=${location}) in ${type} ${name};\n`;
        });
    });

    return result;
}
