import { LightRenderUniformData, UniformCacheMap, UniformLocationMap } from "../../../type/dataType";
import { WebGL1LightSendUniformDataDataMap } from "../../type/utilsType";
import {
    buildLightMaterialDataForGetUniformData,
    buildMaterialDataForGetUniformData,
    sendUniformData as sendUniformDataUtils
} from "../../utils/worker/render_file/render/light/lightRenderUtils";
import { getColorArr3, getOpacity } from "../../../../component/material/MaterialSystem";
import {
    getEmissionColorArr3, getLightModel, getShininess,
    getSpecularColorArr3
} from "../../../../component/material/LightMaterialSystem";
import { WebGL1DrawDataMap } from "../../utils/worker/render_file/type/utilsType";

export var sendUniformData = (gl: any, materialIndex:number, shaderIndex: number, program: WebGLProgram, drawDataMap: WebGL1DrawDataMap, renderCommandUniformData: LightRenderUniformData, sendDataMap:WebGL1LightSendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
    sendUniformDataUtils(gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, buildMaterialDataForGetUniformData(getColorArr3, getOpacity, drawDataMap.MaterialDataFromSystem), buildLightMaterialDataForGetUniformData(getEmissionColorArr3, getSpecularColorArr3, getLightModel, getShininess, drawDataMap.LightMaterialDataFromSystem));
};
