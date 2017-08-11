import { DrawDataMap } from "../../../type/utilsType";
import { LightRenderUniformData, UniformCacheMap, UniformLocationMap } from "../../../type/dataType";
import { sendUniformData as sendUniformDataUtils } from "../../utils/render/light/lightRenderUtils";
import { getColorArr3, getOpacity } from "../../../../component/material/MaterialSystem";
import {
    getEmissionColorArr3, getLightModel, getShininess,
    getSpecularColorArr3
} from "../../../../component/material/LightMaterialSystem";
import { WebGL2LightSendUniformDataDataMap } from "../../type/utilsType";

export var sendUniformData = (gl: any, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: LightRenderUniformData, sendDataMap:WebGL2LightSendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
    sendUniformDataUtils(gl, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, _buildMaterialDataForGetUniformData(getColorArr3, getOpacity, drawDataMap.MaterialDataFromSystem), _buildLightMaterialDataForGetUniformData(getEmissionColorArr3, getSpecularColorArr3, getLightModel, getShininess, drawDataMap.LightMaterialDataFromSystem));
};

var _buildMaterialDataForGetUniformData = (getColorArr3:Function, getOpacity:Function, MaterialDataFromSystem:any) => {
    return {
        getColorArr3: getColorArr3,
        getOpacity: getOpacity,
        MaterialDataFromSystem: MaterialDataFromSystem
    }
}

var _buildLightMaterialDataForGetUniformData = (getEmissionColorArr3:Function, getSpecularColorArr3:Function, getLightModel:Function, getShininess:Function, LightMaterialDataFromSystem:any) => {
    return {
        getEmissionColorArr3: getEmissionColorArr3,
        getSpecularColorArr3: getSpecularColorArr3,
        getLightModel: getLightModel,
        getShininess: getShininess,
        LightMaterialDataFromSystem: LightMaterialDataFromSystem
    }
}
