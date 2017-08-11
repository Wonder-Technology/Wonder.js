import { DeferDrawDataMap, DrawDataMap, InitShaderDataMap } from "../../../../type/utilsType";
import { RenderCommandBufferForDrawData } from "../../../../type/dataType";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator";
import { IMaterialConfig } from "../../../../data/material_config";
import { IRenderConfig } from "../../../both_file/data/render_config";
import { draw as deferDraw, init as initUtils } from "../../../../webgl2/utils/render/light/defer/deferShadingUtils";
import { getGL } from "../../../both_file/device/DeviceManagerWorkerSystem";
import { directlySendUniformData } from "../../../../utils/shader/program/programUtils";
// import { getColorArr3 as getAmbientLightColorArr3 } from "../../../../../component/light/AmbientLightSystem";
// import {
//     getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity,
//     getPosition as getDirectionLightPosition,
// } from "../../../../../component/light/DirectionLightSystem";
import { buildDrawFuncDataMap } from "../../../../webgl2/utils/draw/drawRenderCommandBufferUtils";
import { bindGBuffer, getNewTextureUnitIndex, unbindGBuffer } from "../../../../webgl2/utils/render/light/defer/gbuffer/gBufferUtils";
import { buildSendUniformDataDataMap, sendUniformData } from "../shader/ShaderWorkerSystem";
import {
    bindIndexBuffer, getPointLightPosition, sendAttributeData,
    use
} from "../../../render_file/shader/ShaderWorkerSystem";
import { getUniformData, sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../render_file/shader/glslSender/GLSLSenderWorkerSystem";
import { bindAndUpdate, getMapCount } from "../../../render_file/texture/MapManagerWorkerSystem";
import {
    getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
    hasIndices
} from "../../../render_file/geometry/GeometryWorkerSystem";
import { useShader } from "../../../render_file/material/MaterialWorkerSystem";
import {
    getColorArr3 as getPointLightColorArr3, getConstant,
    getIntensity as getPointLightIntensity, getLinear, getQuadratic, getRange, computeRadius
} from "../../../render_file/light/PointLightWorkerSystem";

export var init = initUtils;

export var draw = (state: Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawDataMap: DrawDataMap, deferDrawDataMap:DeferDrawDataMap, initShaderDataMap:InitShaderDataMap, bufferData: RenderCommandBufferForDrawData) => {
    deferDraw(getGL(drawDataMap.DeviceManagerDataFromSystem, state), state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader, bindGBuffer, unbindGBuffer, getNewTextureUnitIndex), drawDataMap, deferDrawDataMap, buildSendUniformDataDataMap(
        getUniformData, sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        // getAmbientLightColorArr3,
        // getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
        getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange, computeRadius,
        drawDataMap
    ), initShaderDataMap, bufferData);
}
