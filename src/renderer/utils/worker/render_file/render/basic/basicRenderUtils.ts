import { IBasicSendUniformDataDataMap, IDrawDataMap } from "../../interface/IUtils";
import { BasicRenderUniformData, UniformCacheMap, UniformLocationMap } from "../../../../../type/dataType";
import { BasicMaterialForGetUniformDataDataMap, MaterialForGetUniformDataDataMap, SendUniformDataGLSLSenderDataMap } from "../../../../../type/utilsType";
import { directlySendUniformData } from "../renderUtils";
import { Log } from "../../../../../../utils/Log";

export const sendUniformData = (gl: WebGLRenderingContext, materialIndex: number, shaderIndex: number, program: WebGLProgram, drawDataMap: IDrawDataMap, renderCommandUniformData: BasicRenderUniformData, sendDataMap: IBasicSendUniformDataDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap, materialData: MaterialForGetUniformDataDataMap, basicMaterialData: BasicMaterialForGetUniformDataDataMap) => {
    _sendUniformData(gl, materialIndex, shaderIndex, program, sendDataMap.glslSenderData, uniformLocationMap, uniformCacheMap, renderCommandUniformData, materialData, basicMaterialData);
    _sendUniformFuncData(gl, shaderIndex, program, sendDataMap, drawDataMap, uniformLocationMap, uniformCacheMap);
}

const _sendUniformData = (gl: WebGLRenderingContext, materialIndex: number, shaderIndex: number, program: WebGLProgram, glslSenderData: SendUniformDataGLSLSenderDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap, renderCommandUniformData: BasicRenderUniformData, materialData: MaterialForGetUniformDataDataMap, basicMaterialData: BasicMaterialForGetUniformDataDataMap) => {
    var sendUniformDataArr = glslSenderData.GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex];

    for (let i = 0, len = sendUniformDataArr.length; i < len; i++) {
        let sendData = sendUniformDataArr[i],
            name = sendData.name,
            field = sendData.field,
            type = sendData.type as any,
            from = sendData.from || "cmd",
            data = _getUniformData(materialIndex, field, from, renderCommandUniformData, materialData, basicMaterialData);

        directlySendUniformData(gl, name, shaderIndex, program, type, data, glslSenderData, uniformLocationMap, uniformCacheMap);
    }
}

const _sendUniformFuncData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, sendDataMap: IBasicSendUniformDataDataMap, drawDataMap: IDrawDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => {
    var sendUniformFuncDataArr = drawDataMap.GLSLSenderDataFromSystem.sendUniformFuncConfigMap[shaderIndex];

    for (let i = 0, len = sendUniformFuncDataArr.length; i < len; i++) {
        let sendFunc = sendUniformFuncDataArr[i];

        sendFunc(gl, shaderIndex, program, sendDataMap, uniformLocationMap, uniformCacheMap);
    }
}

const _getUniformData = (materialIndex: number, field: string, from: string, renderCommandUniformData: BasicRenderUniformData, materialData: MaterialForGetUniformDataDataMap, basicMaterialData: BasicMaterialForGetUniformDataDataMap) => {
    var data: any = null;

    switch (from) {
        case "cmd":
            data = renderCommandUniformData[field];
            break;
        case "basicMaterial":
            data = _getUnifromDataFromBasicMaterial(field, materialIndex, materialData, basicMaterialData);
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW(`from:${from}`));
            break;
    }

    return data;
}

const _getUnifromDataFromBasicMaterial = (field: string, index: number, {
                                            getColorArr3,
    getOpacity,
    MaterialDataFromSystem
                                        },
    {
                                            BasicMaterialDataFromSystem
                                        }) => {
    var data: any = null;

    switch (field) {
        case "color":
            data = getColorArr3(index, MaterialDataFromSystem);
            break;
        case "opacity":
            data = getOpacity(index, MaterialDataFromSystem);
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW(`field:${field}`));
            break;
    }

    return data;
}

export const buildSendUniformDataDataMap = (
    sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
    drawDataMap: IDrawDataMap) => {
    return {
        glslSenderData: {
            sendMatrix3: sendMatrix3,
            sendMatrix4: sendMatrix4,
            sendVector3: sendVector3,
            sendInt: sendInt,
            sendFloat1: sendFloat1,
            sendFloat3: sendFloat3,

            GLSLSenderDataFromSystem: drawDataMap.GLSLSenderDataFromSystem
        }
    }
}

export const buildMaterialDataForGetUniformData = (getColorArr3: Function, getOpacity: Function, MaterialDataFromSystem: any) => {
    return {
        getColorArr3: getColorArr3,
        getOpacity: getOpacity,
        MaterialDataFromSystem: MaterialDataFromSystem
    }
}

export const buildBasicMaterialDataForGetUniformData = (BasicMaterialDataFromSystem: any) => {
    return {
        BasicMaterialDataFromSystem: BasicMaterialDataFromSystem
    }
}
