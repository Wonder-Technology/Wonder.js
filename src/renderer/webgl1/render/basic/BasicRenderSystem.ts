import { DrawDataMap, InitShaderDataMap } from "../../../type/utilsType";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../data/material_config_interface";
import { IRenderConfig } from "../../../worker/both_file/data/render_config";
import { bindIndexBuffer, use } from "../../../shader/ShaderSystem";
// import { directlySendUniformData } from "../../../utils/shader/program/programUtils";
import {
    getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
    hasIndices
} from "../../../../component/geometry/GeometrySystem";
import { bindAndUpdate, getMapCount } from "../../../texture/MapManagerSystem";
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
    BasicRenderCommandBufferForDrawData, BasicRenderUniformData, UniformCacheMap,
    UniformLocationMap
} from "../../../type/dataType";
// import { draw as basicDraw } from "../utils/basic/draw/basicRenderDrawRenderCommandBufferUtils";
import { WebGL1BasicSendUniformDataDataMap } from "../../type/utilsType";
import {
    buildBasicMaterialDataForGetUniformData,
    buildMaterialDataForGetUniformData, buildSendUniformDataDataMap, render as basicRender,
    sendUniformData
} from "../../utils/worker/render_file/render/basic/basicRenderUtils";
import { directlySendUniformData } from "../../../utils/worker/render_file/render/renderUtils";
import { sendAttributeData } from "../RenderSystem";

export var render = curry((gl:any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: DrawDataMap, initShaderDataMap: InitShaderDataMap, bufferData: BasicRenderCommandBufferForDrawData) => {
    basicRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, _sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader), drawDataMap, buildSendUniformDataDataMap(
        sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        // getAmbientLightColorArr3,
        // getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
        // getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange,
        drawDataMap
    ), initShaderDataMap, bufferData);
})

var _sendUniformData = (gl: WebGLRenderingContext, materialIndex:number, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: BasicRenderUniformData, sendDataMap:WebGL1BasicSendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
    sendUniformData(gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, buildMaterialDataForGetUniformData(getColorArr3, getOpacity, drawDataMap.MaterialDataFromSystem), buildBasicMaterialDataForGetUniformData(drawDataMap.BasicMaterialDataFromSystem));
};
//
// var _buildMaterialDataForGetUniformData = (getColorArr3:Function, getOpacity:Function, MaterialDataFromSystem:any) => {
//     return {
//         getColorArr3: getColorArr3,
//         getOpacity: getOpacity,
//         MaterialDataFromSystem: MaterialDataFromSystem
//     }
// }
//
// var _buildBasicMaterialDataForGetUniformData = (BasicMaterialDataFromSystem:any) => {
//     return {
//         BasicMaterialDataFromSystem: BasicMaterialDataFromSystem
//     }
// }
