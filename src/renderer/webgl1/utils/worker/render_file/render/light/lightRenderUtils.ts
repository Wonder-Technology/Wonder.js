import {
    DrawDataMap,
    LightMaterialForGetUniformDataDataMap,
    MaterialForGetUniformDataDataMap,
    SendUniformDataGLSLSenderDataMap
} from "../../../../../../type/utilsType";
import { directlySendUniformData } from "../../../../../../utils/worker/render_file/render/renderUtils";
import { Log } from "../../../../../../../utils/Log";
import { WebGL1LightSendUniformDataDataMap } from "../../../../../type/utilsType";
import { LightRenderUniformData, UniformCacheMap, UniformLocationMap } from "../../../../../../type/dataType";

//todo extract code
export var sendUniformData = (gl: WebGLRenderingContext, materialIndex:number, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: LightRenderUniformData, sendDataMap:WebGL1LightSendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap, materialData:MaterialForGetUniformDataDataMap, lightMaterialData:LightMaterialForGetUniformDataDataMap) => {
    _sendUniformData(gl, materialIndex, shaderIndex, program, sendDataMap.glslSenderData, uniformLocationMap, uniformCacheMap, renderCommandUniformData, materialData, lightMaterialData);
    _sendUniformFuncData(gl, shaderIndex, program, sendDataMap, drawDataMap, uniformLocationMap, uniformCacheMap);
}

var _sendUniformData = (gl: WebGLRenderingContext, materialIndex:number,  shaderIndex: number, program: WebGLProgram, glslSenderData: SendUniformDataGLSLSenderDataMap,  uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap, renderCommandUniformData: LightRenderUniformData, materialData:MaterialForGetUniformDataDataMap, lightMaterialData:LightMaterialForGetUniformDataDataMap) => {
    var sendUniformDataArr = glslSenderData.GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex];

    for (let i = 0, len = sendUniformDataArr.length; i < len; i++) {
        let sendData = sendUniformDataArr[i],
            name = sendData.name,
            field = sendData.field,
            type = sendData.type as any,
            from = sendData.from || "cmd",
            data = _getUniformData(materialIndex, field, from, renderCommandUniformData, materialData, lightMaterialData);

        directlySendUniformData(gl, name, shaderIndex, program, type, data, glslSenderData, uniformLocationMap, uniformCacheMap);
    }
}

var _sendUniformFuncData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, sendDataMap: WebGL1LightSendUniformDataDataMap, drawDataMap: DrawDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => {
    var sendUniformFuncDataArr = drawDataMap.GLSLSenderDataFromSystem.sendUniformFuncConfigMap[shaderIndex];

    for (let i = 0, len = sendUniformFuncDataArr.length; i < len; i++) {
        let sendFunc = sendUniformFuncDataArr[i];

        sendFunc(gl, shaderIndex, program, sendDataMap, uniformLocationMap, uniformCacheMap);
    }
}


var _getUniformData = (materialIndex:number, field: string, from: string, renderCommandUniformData: LightRenderUniformData, materialData: MaterialForGetUniformDataDataMap, lightMaterialData: LightMaterialForGetUniformDataDataMap) => {
    var data: any = null;

    switch (from) {
        case "cmd":
            data = renderCommandUniformData[field];
            break;
        case "lightMaterial":
            data = _getUnifromDataFromLightMaterial(field, materialIndex, materialData, lightMaterialData);
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

export var buildMaterialDataForGetUniformData = (getColorArr3:Function, getOpacity:Function, MaterialDataFromSystem:any) => {
    return {
        getColorArr3: getColorArr3,
        getOpacity: getOpacity,
        MaterialDataFromSystem: MaterialDataFromSystem
    }
}

export var buildLightMaterialDataForGetUniformData = (getEmissionColorArr3:Function, getSpecularColorArr3:Function, getLightModel:Function, getShininess:Function, LightMaterialDataFromSystem:any) => {
    return {
        getEmissionColorArr3: getEmissionColorArr3,
        getSpecularColorArr3: getSpecularColorArr3,
        getLightModel: getLightModel,
        getShininess: getShininess,
        LightMaterialDataFromSystem: LightMaterialDataFromSystem
    }
}
