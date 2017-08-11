import {
    BasicMaterialForGetUniformDataDataMap, DrawDataMap, InitShaderDataMap, MaterialForGetUniformDataDataMap,
    SendUniformDataGLSLSenderDataMap
} from "../../../../type/utilsType";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator";
import { IMaterialConfig } from "../../../../data/material_config";
import { IRenderConfig } from "../../../../worker/both_file/data/render_config";
import { IWebGL1DrawFuncDataMap } from "../../../interface/IDraw";
import {
    BasicRenderCommandBufferForDrawData, BasicRenderUniformData, UniformCacheMap,
    UniformLocationMap
} from "../../../../type/dataType";
import { WebGL1BasicSendUniformDataDataMap } from "../../../type/utilsType";
import { Log } from "../../../../../utils/Log";
import { directlySendUniformData } from "../../../../utils/render/renderUtils";
import { draw as basicDraw } from "../../draw/basic/basicDrawRenderCommandBufferUtils";
import { getColorArr3, getOpacity } from "../../../../utils/material/materialUtils";

export var draw = (gl:any, state: Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawFuncDataMap:IWebGL1DrawFuncDataMap, drawDataMap: DrawDataMap, sendDataMap:WebGL1BasicSendUniformDataDataMap, initShaderDataMap:InitShaderDataMap, bufferData: BasicRenderCommandBufferForDrawData) => {
    basicDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, sendDataMap, initShaderDataMap, bufferData);
}

//todo extract code
export var sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: BasicRenderUniformData, sendDataMap:WebGL1BasicSendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap, materialData:MaterialForGetUniformDataDataMap, basicMaterialData:BasicMaterialForGetUniformDataDataMap) => {
    _sendUniformData(gl, shaderIndex, program, sendDataMap.glslSenderData, uniformLocationMap, uniformCacheMap, renderCommandUniformData, materialData, basicMaterialData);
    _sendUniformFuncData(gl, shaderIndex, program, sendDataMap, drawDataMap, uniformLocationMap, uniformCacheMap);
}

var _sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, glslSenderData: SendUniformDataGLSLSenderDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap, renderCommandUniformData: BasicRenderUniformData, materialData:MaterialForGetUniformDataDataMap, basicMaterialData:BasicMaterialForGetUniformDataDataMap) => {
    var sendUniformDataArr = glslSenderData.GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex];

    for (let i = 0, len = sendUniformDataArr.length; i < len; i++) {
        let sendData = sendUniformDataArr[i],
            name = sendData.name,
            field = sendData.field,
            type = sendData.type as any,
            from = sendData.from || "cmd",
            data = _getUniformData(field, from, renderCommandUniformData, materialData, basicMaterialData);

        directlySendUniformData(gl, name, shaderIndex, program, type, data, glslSenderData, uniformLocationMap, uniformCacheMap);
    }
}

var _sendUniformFuncData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, sendDataMap: WebGL1BasicSendUniformDataDataMap, drawDataMap: DrawDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => {
    var sendUniformFuncDataArr = drawDataMap.GLSLSenderDataFromSystem.sendUniformFuncConfigMap[shaderIndex];

    for (let i = 0, len = sendUniformFuncDataArr.length; i < len; i++) {
        let sendFunc = sendUniformFuncDataArr[i];

        sendFunc(gl, shaderIndex, program, sendDataMap, uniformLocationMap, uniformCacheMap);
    }
}


var _getUniformData = (field: string, from: string, renderCommandUniformData: BasicRenderUniformData, materialData: MaterialForGetUniformDataDataMap, basicMaterialData: BasicMaterialForGetUniformDataDataMap) => {
    var data: any = null;

    switch (from) {
        case "cmd":
            data = renderCommandUniformData[field];
            break;
        case "basicMaterial":
            data = _getUnifromDataFromBasicMaterial(field, renderCommandUniformData.materialIndex, materialData, basicMaterialData);
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW(`from:${from}`));
            break;
    }

    return data;
}

var _getUnifromDataFromBasicMaterial = (field: string, index: number, {
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
