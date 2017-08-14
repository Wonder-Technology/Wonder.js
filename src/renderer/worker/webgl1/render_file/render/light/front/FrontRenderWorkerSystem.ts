import { DrawDataMap, InitShaderDataMap } from "../../../../../../type/utilsType";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../../../data/shaderLib_generator";
import { IMaterialConfig } from "../../../../../../data/material_config";
import { IRenderConfig } from "../../../../../both_file/data/render_config";
import { render as frontRender } from "../../../../../../webgl1/utils/render/light/front/frontRenderUtils";
import { useShader } from "../../../../../render_file/material/MaterialWorkerSystem";
import { hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount } from "../../../../../render_file/geometry/GeometryWorkerSystem";
import { bindAndUpdate, getMapCount } from "../../../../../render_file/texture/MapManagerWorkerSystem";
import { getColorArr3 as getAmbientLightColorArr3 } from "../../../../../render_file/light/AmbientLightWorkerSystem";
import {
    getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity
} from "../../../../../render_file/light/DirectionLightWorkerSystem";
import {
    getColorArr3 as getPointLightColorArr3, getConstant,
    getIntensity as getPointLightIntensity, getLinear, getQuadratic, getRange
} from "../../../../../render_file/light/PointLightWorkerSystem";
import { buildDrawFuncDataMap } from "../../../../../../webgl1/utils/draw/drawRenderCommandBufferUtils";
import { sendUniformData } from "../LightRenderWorkerSystem";
import { bindIndexBuffer, use } from "../../../../../render_file/shader/ShaderWorkerSystem";
import { getDirectionLightPosition, getPointLightPosition } from "../../../../../render_file/render/RenderWorkerSystem";
import { sendAttributeData } from "../../RenderWorkerSystem";
import {  sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3  } from "../../../../../render_file/shader/glslSender/GLSLSenderWorkerSystem";
import { directlySendUniformData } from "../../../../../../utils/render/renderUtils";
import { LightRenderCommandBufferForDrawData } from "../../../../../../type/dataType";

export var render = (gl:any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: DrawDataMap, initShaderDataMap: InitShaderDataMap, bufferData: LightRenderCommandBufferForDrawData) => {
    frontRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader), drawDataMap, _buildSendUniformDataDataMap(
        sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        getAmbientLightColorArr3,
        getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
        getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange,
        drawDataMap
    ), initShaderDataMap, bufferData);
}

var _buildSendUniformDataDataMap = (
    sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
    getAmbientLightColorArr3,
    getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
    getPointLightPosition, getPointLightColorArr3, getPointLightConstant, getPointLightIntensity, getPointLightLinear, getPointLightQuadratic, getPointLightRange,
    drawDataMap: DrawDataMap) => {
    //todo optimize: cache

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
        ambientLightData: {
            getColorArr3: getAmbientLightColorArr3,

            AmbientLightDataFromSystem: drawDataMap.AmbientLightDataFromSystem
        },
        directionLightData: {
            // getPosition: (index: number) => {
            //     return getDirectionLightPosition(index, drawDataMap);
            // },
            getPosition: getDirectionLightPosition,
            getColorArr3: getDirectionLightColorArr3,
            getIntensity: getDirectionLightIntensity,

            DirectionLightDataFromSystem: drawDataMap.DirectionLightDataFromSystem
        },
        pointLightData: {
            // getPosition: (index: number) => {
            //     return getPointLightPosition(index, drawDataMap);
            // },
            getPosition: getPointLightPosition,
            getColorArr3: getPointLightColorArr3,
            getIntensity: getPointLightIntensity,
            getConstant: getPointLightConstant,
            getLinear: getPointLightLinear,
            getQuadratic: getPointLightQuadratic,
            getRange: getPointLightRange,

            PointLightDataFromSystem: drawDataMap.PointLightDataFromSystem
        }
    }
}
