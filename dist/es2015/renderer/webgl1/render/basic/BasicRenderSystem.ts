import { InitShaderDataMap } from "../../../type/utilsType";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../data/material_config_interface";
import { IRenderConfig } from "../../../worker/both_file/data/render_config";
import { use } from "../../../shader/ShaderSystem";
import {
    getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
    hasIndices
} from "../../../../component/geometry/GeometrySystem";
import { bindAndUpdate, getMapCount} from "../../../texture/MapManagerSystem";
// import { getColorArr3 as getAmbientLightColorArr3 } from "../../../component/light/AmbientLightSystem";
// import {
//     getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity,
//     getPosition as getDirectionLightPosition,
// } from "../../../component/light/DirectionLightSystem";
// import {
//     getPosition as getPointLightPosition,
//     getColorArr3 as getPointLightColorArr3, getConstant,
//     getIntensity as getPointLightIntensity, getLinear, getQuadratic, getRange
// } from "../../../component/light/PointLightSystem";
import { sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../shader/glslSender/GLSLSenderSystem";
import { getColorArr3, getOpacity, useShader } from "../../../../component/material/MaterialSystem";
import { buildDrawFuncDataMap } from "../../utils/worker/render_file/draw/drawRenderCommandBufferUtils";
import {
    BasicRenderUniformData, UniformCacheMap,
    UniformLocationMap
} from "../../../type/dataType";
// import { draw as basicDraw } from "../utils/basic/draw/basicRenderDrawRenderCommandBufferUtils";
import {
    render as renderBasic
} from "../../utils/worker/render_file/render/basic/basicRenderUtils";
import { directlySendUniformData } from "../../../utils/worker/render_file/render/renderUtils";
import { sendAttributeData } from "../RenderSystem";
import {
    BasicRenderCommandBufferForDrawData,
    CameraRenderCommandBufferForDrawData
} from "../../../utils/worker/render_file/type/dataType";
import { bindIndexBuffer } from "../../shader/ShaderSystem";
import {
    IWebGL1BasicSendUniformDataDataMap,
    IWebGL1DrawDataMap
} from "../../utils/worker/render_file/interface/IUtils";
import {
    buildBasicMaterialDataForGetUniformData, buildMaterialDataForGetUniformData,
    buildSendUniformDataDataMap, sendUniformData
} from "../../../utils/worker/render_file/render/basic/basicRenderUtils";
import { getStartTextureIndex } from "../../../utils/worker/render_file/texture/mapManagerUtils";

export const render = curry((gl: any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: IWebGL1DrawDataMap, initShaderDataMap: InitShaderDataMap, bufferData: BasicRenderCommandBufferForDrawData, cameraData: CameraRenderCommandBufferForDrawData) => {
    renderBasic(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, _sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, getStartTextureIndex, useShader), drawDataMap, buildSendUniformDataDataMap(
        sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        // getAmbientLightColorArr3,
        // getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
        // getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange,
        drawDataMap
    ), initShaderDataMap, bufferData, cameraData);
})

const _sendUniformData =(gl: WebGLRenderingContext, materialIndex: number, shaderIndex: number, program: WebGLProgram, drawDataMap: IWebGL1DrawDataMap, renderCommandUniformData: BasicRenderUniformData, sendDataMap: IWebGL1BasicSendUniformDataDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => {
    sendUniformData(gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, buildMaterialDataForGetUniformData(getColorArr3, getOpacity, drawDataMap.MaterialDataFromSystem), buildBasicMaterialDataForGetUniformData(drawDataMap.BasicMaterialDataFromSystem));
};
//
// const _buildMaterialDataForGetUniformData =(getColorArr3:Function, getOpacity:Function, MaterialDataFromSystem:any) => {
//     return {
//         getColorArr3: getColorArr3,
//         getOpacity: getOpacity,
//         MaterialDataFromSystem: MaterialDataFromSystem
//     }
// }
//
// const _buildBasicMaterialDataForGetUniformData =(BasicMaterialDataFromSystem:any) => {
//     return {
//         BasicMaterialDataFromSystem: BasicMaterialDataFromSystem
//     }
// }
