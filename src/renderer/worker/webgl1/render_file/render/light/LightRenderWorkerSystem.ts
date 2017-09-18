import {
    getEmissionColorArr3, getLightModel, getShininess,
    getSpecularColorArr3
} from "../../../../render_file/material/LightMaterialWorkerSystem";
import { getColorArr3, getOpacity } from "../../../../render_file/material/MaterialWorkerSystem";
import { LightRenderUniformData, UniformCacheMap, UniformLocationMap } from "../../../../../type/dataType";
import {
    IWebGL1DrawDataMap,
    IWebGL1LightSendUniformDataDataMap
} from "../../../../../webgl1/utils/worker/render_file/interface/IUtils";
import {
    buildLightMaterialDataForGetUniformData,
    buildMaterialDataForGetUniformData,
    sendUniformData as sendUniformDataUtils
} from "../../../../../utils/worker/render_file/render/light/lightRenderUtils";


export const sendUniformData = (gl: any, materialIndex: number, shaderIndex: number, program: WebGLProgram, drawDataMap: IWebGL1DrawDataMap, renderCommandUniformData: LightRenderUniformData, sendDataMap: IWebGL1LightSendUniformDataDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => {
    sendUniformDataUtils(gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, buildMaterialDataForGetUniformData(getColorArr3, getOpacity, drawDataMap.MaterialDataFromSystem), buildLightMaterialDataForGetUniformData(getEmissionColorArr3, getSpecularColorArr3, getLightModel, getShininess, drawDataMap.LightMaterialDataFromSystem));
}
