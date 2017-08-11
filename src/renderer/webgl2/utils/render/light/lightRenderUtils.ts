import {
    DrawDataMap,
    LightMaterialForGetUniformDataDataMap,
    MaterialForGetUniformDataDataMap,
    SendUniformDataGLSLSenderDataMap
} from "../../../../type/utilsType";
import {
    getEmissionColorArr3, getLightModel, getShininess,
    getSpecularColorArr3
} from "../../../../utils/material/lightMaterialUtils";
import { getColorArr3, getOpacity } from "../../../../utils/material/materialUtils";
import { directlySendUniformData } from "../../../../utils/render/renderUtils";
import { Log } from "../../../../../utils/Log";
import { LightRenderUniformData, UniformCacheMap, UniformLocationMap } from "../../../../type/dataType";
import { WebGL2LightSendUniformDataDataMap } from "../../../type/utilsType";

//todo extract code
export var sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: LightRenderUniformData, sendDataMap:WebGL2LightSendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap, materialData:MaterialForGetUniformDataDataMap, lightMaterialData:LightMaterialForGetUniformDataDataMap) => {
    _sendUniformData(gl, shaderIndex, program, sendDataMap.glslSenderData, uniformLocationMap, uniformCacheMap, renderCommandUniformData, materialData, lightMaterialData);
    _sendUniformFuncData(gl, shaderIndex, program, sendDataMap, drawDataMap, uniformLocationMap, uniformCacheMap);
}

var _sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, glslSenderData: SendUniformDataGLSLSenderDataMap,  uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap, renderCommandUniformData: LightRenderUniformData, materialData:MaterialForGetUniformDataDataMap, lightMaterialData:LightMaterialForGetUniformDataDataMap) => {
    var sendUniformDataArr = glslSenderData.GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex];

    for (let i = 0, len = sendUniformDataArr.length; i < len; i++) {
        let sendData = sendUniformDataArr[i],
            name = sendData.name,
            field = sendData.field,
            type = sendData.type as any,
            from = sendData.from || "cmd",
            data = _getUniformData(field, from, renderCommandUniformData, materialData, lightMaterialData);

        directlySendUniformData(gl, name, shaderIndex, program, type, data, glslSenderData, uniformLocationMap, uniformCacheMap);
    }
}

var _sendUniformFuncData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, sendDataMap: WebGL2LightSendUniformDataDataMap, drawDataMap: DrawDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => {
    var sendUniformFuncDataArr = drawDataMap.GLSLSenderDataFromSystem.sendUniformFuncConfigMap[shaderIndex];

    for (let i = 0, len = sendUniformFuncDataArr.length; i < len; i++) {
        let sendFunc = sendUniformFuncDataArr[i];

        sendFunc(gl, shaderIndex, program, sendDataMap, uniformLocationMap, uniformCacheMap);
    }
}


var _getUniformData = (field: string, from: string, renderCommandUniformData: LightRenderUniformData, materialData: MaterialForGetUniformDataDataMap, lightMaterialData: LightMaterialForGetUniformDataDataMap) => {
    var data: any = null;

    switch (from) {
        case "cmd":
            data = renderCommandUniformData[field];
            break;
        case "lightMaterial":
            data = _getUnifromDataFromLightMaterial(field, renderCommandUniformData.materialIndex, materialData, lightMaterialData);
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW(`from:${from}`));
            break;
    }

    return data;
}

var _getUnifromDataFromLightMaterial = (field: string, index: number,
                                        {
                                            getColorArr3,
                                            getOpacity,
                                            MaterialDataFromSystem
                                        },
                                        {
                                            getEmissionColorArr3,
                                            getSpecularColorArr3,
                                            getShininess,
                                            getLightModel,
                                            LightMaterialDataFromSystem
                                        }) => {
    var data: any = null;

    switch (field) {
        case "color":
            data = getColorArr3(index, MaterialDataFromSystem);
            break;
        case "emissionColor":
            data = getEmissionColorArr3(index, LightMaterialDataFromSystem);
            break;
        case "opacity":
            data = getOpacity(index, MaterialDataFromSystem);
            break;
        case "specularColor":
            data = getSpecularColorArr3(index, LightMaterialDataFromSystem);
            break;
        case "shininess":
            data = getShininess(index, LightMaterialDataFromSystem);
            break;
        case "lightModel":
            data = getLightModel(index, LightMaterialDataFromSystem);
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW(`field:${field}`));
            break;
    }

    return data;
}

