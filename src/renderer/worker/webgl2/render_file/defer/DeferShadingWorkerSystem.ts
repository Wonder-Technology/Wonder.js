import { DeferDrawDataMap, DrawDataMap, InitShaderDataMap } from "../../../../type/utilsType";
import { LightRenderCommandBufferForDrawData, RenderCommandBufferForDrawData } from "../../../../type/dataType";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../../data/material_config_interface";
import { IRenderConfig } from "../../../both_file/data/render_config";
import { render as deferRender, init as initUtils } from "../../../../webgl2/utils/worker/render_file/render/light/defer/deferShadingUtils";
import { getGL } from "../../../both_file/device/DeviceManagerWorkerSystem";
// import { getColorArr3 as getAmbientLightColorArr3 } from "../../../../../component/light/AmbientLightSystem";
// import {
//     getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity,
//     getPosition as getDirectionLightPosition,
// } from "../../../../../component/light/DirectionLightSystem";
import { bindGBuffer, getNewTextureUnitIndex, unbindGBuffer } from "../../../../webgl2/utils/worker/render_file/render/light/defer/gbuffer/gBufferUtils";
import {
    bindIndexBuffer,
    use
} from "../../../render_file/shader/ShaderWorkerSystem";
import { sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../render_file/shader/glslSender/GLSLSenderWorkerSystem";
import { bindAndUpdate, getMapCount } from "../../../render_file/texture/MapManagerWorkerSystem";
import {
    getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
    hasIndices
} from "../../../render_file/geometry/GeometryWorkerSystem";
import { useShader } from "../../../render_file/material/MaterialWorkerSystem";
import {
    getColorArr3 as getPointLightColorArr3, getConstant,
    getIntensity as getPointLightIntensity, getLinear, getQuadratic, computeRadius
} from "../../../render_file/light/PointLightWorkerSystem";
import { directlySendUniformData } from "../../../../utils/worker/render_file/render/renderUtils";
import { buildDrawFuncDataMap } from "../../../../webgl2/utils/worker/render_file/draw/light/defer/deferDrawRenderCommandBufferUtils";
import { sendAttributeData } from "../render/RenderWorkerSystem";
import { sendUniformData } from "../render/light/LightRenderWorkerSystem";
import { getPointLightPosition } from "../../../render_file/render/RenderWorkerSystem";
import { CameraRenderCommandBufferForDrawData } from "../../../../utils/worker/render_file/type/dataType";

export var init = initUtils;

export var render = (gl:any, state: Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawDataMap: DrawDataMap, deferDrawDataMap:DeferDrawDataMap, initShaderDataMap:InitShaderDataMap, bufferData: LightRenderCommandBufferForDrawData, cameraData:CameraRenderCommandBufferForDrawData) => {
    deferRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader, bindGBuffer, unbindGBuffer, getNewTextureUnitIndex), drawDataMap, deferDrawDataMap, _buildSendUniformDataDataMap(
        sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        // getAmbientLightColorArr3,
        // getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
        getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, computeRadius,
        drawDataMap
    ), initShaderDataMap, bufferData, cameraData);
}

var _buildSendUniformDataDataMap = (
    sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
    // getAmbientLightColorArr3,
    // getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
    getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, computeRadius,
    drawDataMap: DrawDataMap) => {
    return {
        glslSenderData: {
            sendMatrix3: sendMatrix3,
            sendMatrix4: sendMatrix4,
            sendVector3: sendVector3,
            sendInt: sendInt,
            sendFloat1: sendFloat1,
            sendFloat3: sendFloat3,

            GLSLSenderDataFromSystem: drawDataMap.GLSLSenderDataFromSystem
        },
        // ambientLightData: {
        //     getColorArr3: getAmbientLightColorArr3,
        //
        //     AmbientLightDataFromSystem: drawDataMap.AmbientLightDataFromSystem
        // },
        // directionLightData: {
        // getPosition: (index: number) => {
        //     return getDirectionLightPosition(index, drawDataMap);
        // },
        //     getColorArr3: getDirectionLightColorArr3,
        //     getIntensity: getDirectionLightIntensity,
        //
        //     DirectionLightDataFromSystem: drawDataMap.DirectionLightDataFromSystem
        // },
        pointLightData: {
            getPosition: getPointLightPosition,
            getColorArr3: getPointLightColorArr3,
            getIntensity: getPointLightIntensity,
            getConstant: getConstant,
            getLinear: getLinear,
            getQuadratic: getQuadratic,
            computeRadius: computeRadius,

            PointLightDataFromSystem: drawDataMap.PointLightDataFromSystem
        }
    }
}
