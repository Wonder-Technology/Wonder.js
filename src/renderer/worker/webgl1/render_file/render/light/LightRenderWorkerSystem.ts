// import { sendUniformData as sendUniformDataUtils } from "../../utils/render/light/lightRenderUtils";
import {
    buildLightMaterialDataForGetUniformData, buildMaterialDataForGetUniformData,
    sendUniformData as sendUniformDataUtils
} from "../../../../../webgl1/utils/render/light/lightRenderUtils";
import {    getEmissionColorArr3, getLightModel, getShininess,
    getSpecularColorArr3} from "../../../../render_file/material/LightMaterialWorkerSystem";
import { getColorArr3, getOpacity } from "../../../../render_file/material/MaterialWorkerSystem";
import { WebGL1LightSendUniformDataDataMap } from "../../../../../webgl1/type/utilsType";
import { LightRenderUniformData, UniformCacheMap, UniformLocationMap } from "../../../../../type/dataType";
import { DrawDataMap } from "../../../../../type/utilsType";


export var sendUniformData = (gl: any, materialIndex:number, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: LightRenderUniformData, sendDataMap:WebGL1LightSendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
    sendUniformDataUtils(gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, buildMaterialDataForGetUniformData(getColorArr3, getOpacity, drawDataMap.MaterialDataFromSystem), buildLightMaterialDataForGetUniformData(getEmissionColorArr3, getSpecularColorArr3, getLightModel, getShininess, drawDataMap.LightMaterialDataFromSystem));
}
