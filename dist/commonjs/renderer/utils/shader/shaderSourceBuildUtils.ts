import { GLSLChunk } from "../../shader/chunk/ShaderChunk";
import { EGPUPrecision } from "../../enum/EGPUPrecision";
import { getPrecision } from "../device/gpuDetectUtils";
import { IMaterialShaderLibGroup, IShaderLibItem, MaterialShaderLibConfig } from "../../data/material_config_interface";
import { InitShaderDataMap } from "../../type/utilsType";
import { forEach } from "../../../utils/arrayUtils";
import { isString } from "../../../utils/JudgeUtils";
import { it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import {
    IGLSLConfig, IGLSLDefineListItem, ISendUniformConfig,
    IShaderLibContentGenerator,
    IDefineUniformConfig
} from "../../data/shaderLib_generator_interface";
import { isConfigDataExist } from "../renderConfigUtils";
import { compose, filterArray, forEachArray } from "../../../utils/functionalUtils";

export const getPrecisionSource = (lowp_fragment: GLSLChunk, mediump_fragment: GLSLChunk, highp_fragment: GLSLChunk, GPUDetectData: any) => {
    var precision = getPrecision(GPUDetectData),
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

export const getMaterialShaderLibNameArr = (materialShaderLibConfig: MaterialShaderLibConfig, materialShaderLibGroup: IMaterialShaderLibGroup, materialIndex: number, initShaderFuncDataMap: any, initShaderDataMap: InitShaderDataMap) => {
    var nameArr: Array<string> = [];

    forEach(materialShaderLibConfig, (item: string | IShaderLibItem) => {
        if (isString(item)) {
            nameArr.push(item as string);
        }
        else {
            let i = item as IShaderLibItem;

            switch (i.type) {
                case "group":
                    nameArr = nameArr.concat(materialShaderLibGroup[i.value]);
                    break;
                case "branch":
                    let shaderLibName = _execBranch(i, materialIndex, initShaderFuncDataMap, initShaderDataMap);

                    if (_isShaderLibNameExist(shaderLibName)) {
                        nameArr.push(shaderLibName);
                    }
            }
        }
    });

    return nameArr;
}

const _execBranch =requireCheckFunc((i: IShaderLibItem, materialIndex: number, initShaderFuncDataMap: any, initShaderDataMap: InitShaderDataMap) => {
    it("branch should exist", () => {
        expect(i.branch).exist;
    });
}, (i: IShaderLibItem, materialIndex: number, initShaderFuncDataMap: any, initShaderDataMap: InitShaderDataMap) => {
    return i.branch(materialIndex, initShaderFuncDataMap, initShaderDataMap);
})

const _isShaderLibNameExist =(name: string) => !!name;

export const getEmptyFuncGLSLConfig = () => {
    return {
        "top": "",
        "varDeclare": "",
        "funcDeclare": "",
        "funcDefine": "",
        "body": "",
        "defineList": []
    }
}

export const buildSourceDefine = (defineList: Array<IGLSLDefineListItem>, initShaderDataMap: InitShaderDataMap) => {
    var result = "";

    for (let item of defineList) {
        if (item.valueFunc === void 0) {
            result += `#define ${item.name}\n`;
        }
        else {
            result += `#define ${item.name} ${item.valueFunc(initShaderDataMap)}\n`;
        }
    }

    return result;
}

export const getGLSLPartData = (glslConfig: IGLSLConfig, partName: string) => {
    var partConfig = glslConfig[partName];

    if (isConfigDataExist(partConfig)) {
        return partConfig;
    }
    else if (isConfigDataExist(glslConfig.source)) {
        return glslConfig.source[partName];
    }

    return "";
}

export const getGLSLDefineListData = (glslConfig: IGLSLConfig) => {
    var partConfig = glslConfig.defineList;

    if (isConfigDataExist(partConfig)) {
        return partConfig;
    }

    return [];
}

export const getFuncGLSLPartData = (glslConfig: IGLSLConfig, partName: string) => {
    return glslConfig[partName];
}

export const getFuncGLSLDefineListData = (glslConfig: IGLSLConfig) => {
    return glslConfig.defineList;
}

const _isInSource =(key: string, source: string) => {
    return source.indexOf(key) > -1;
}

export const generateUniformSource = (materialShaderLibNameArr: Array<string>, shaderLibData: IShaderLibContentGenerator, sourceVarDeclare: string, sourceFuncDefine: string, sourceBody: string) => {
    var result = "",
        generateFunc = compose(
            forEachArray(({ name, type }) => {
                result += `uniform ${_generateUniformSourceType(type)} ${name};\n`;
            }),
            filterArray(({ name }) => {
                return _isInSource(name, sourceVarDeclare) || _isInSource(name, sourceFuncDefine) || _isInSource(name, sourceBody);
            })
        );

    forEach(materialShaderLibNameArr, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send,
            uniform: Array<ISendUniformConfig> = null,
            uniformDefine: Array<IDefineUniformConfig> = null;

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
}

const _generateUniformSourceType =(type: string) => {
    var sourceType: string = null;

    switch (type) {
        case "float3":
            sourceType = "vec3";
            break;
        default:
            sourceType = type;
            break;
    }

    return sourceType;
}
