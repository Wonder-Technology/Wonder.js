// import { bindGBufferTargets, init as initGBuffer, sendGBufferTargetData } from "./gbuffer/GBufferSystem";
// import { draw as deferDraw } from "./draw/DeferDrawRenderCommandBufferSystem";
import { DeferDrawDataMap, DrawDataMap, InitShaderDataMap } from "../../../../type/utilsType";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
// import { getNoMaterialShaderIndex, use } from "../../shader/ShaderSystem";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator";
import { IMaterialConfig } from "../../../../data/material_config";
import { IRenderConfig } from "../../../../worker/both_file/data/render_config";
import { draw as deferDraw, init as initUtils } from "../../../utils/render/light/defer/deferShadingUtils";
import { getGL } from "../../../../worker/both_file/device/DeviceManagerWorkerSystem";
import { bindIndexBuffer, use } from "../../../../shader/ShaderSystem";
import {
    getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
    hasIndices
} from "../../../../../component/geometry/GeometrySystem";
import { bindAndUpdate, getMapCount } from "../../../../texture/MapManagerSystem";
// import { getColorArr3 as getAmbientLightColorArr3 } from "../../../component/light/AmbientLightSystem";
// import {
//     getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity,
//     getPosition as getDirectionLightPosition,
// } from "../../../component/light/DirectionLightSystem";
import {
    getPosition as getPointLightPosition,
    getColorArr3 as getPointLightColorArr3, getConstant,
    getIntensity as getPointLightIntensity, getLinear, getQuadratic, getRange
} from "../../../../../component/light/PointLightSystem";
import { sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../../shader/glslSender/GLSLSenderSystem";
import { useShader } from "../../../../../component/material/MaterialSystem";
import { bindGBuffer, getNewTextureUnitIndex, unbindGBuffer } from "../../../utils/render/light/defer/gbuffer/gBufferUtils";
import { computeRadius } from "../../../light/PointLightSystem";
import { LightRenderCommandBufferForDrawData } from "../../../../type/dataType";
import { sendUniformData } from "../LightRenderSystem";
import { directlySendUniformData } from "../../../../utils/render/renderUtils";
import { sendAttributeData } from "../../RenderSystem";
import { buildDrawFuncDataMap } from "../../../utils/draw/light/defer/deferDrawRenderCommandBufferUtils";

export var init = initUtils;

export var draw = curry((gl:any, state: Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawDataMap: DrawDataMap, deferDrawDataMap:DeferDrawDataMap, initShaderDataMap:InitShaderDataMap, ThreeDTransformData: any, GameObjectData: any, bufferData: LightRenderCommandBufferForDrawData) => {
    deferDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader, bindGBuffer, unbindGBuffer, getNewTextureUnitIndex), drawDataMap, deferDrawDataMap, buildSendUniformDataDataMap(
        sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        // getAmbientLightColorArr3,
        // getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
        getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange, computeRadius,
        drawDataMap,  ThreeDTransformData, GameObjectData
    ), initShaderDataMap, bufferData);
})

export var buildSendUniformDataDataMap = (
    sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
    // getAmbientLightColorArr3,
    // getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
    getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange, computeRadius,
    drawDataMap: DrawDataMap, ThreeDTransformData: any, GameObjectData: any) => {
    return {
        glslSenderData: {
            // getUniformData: getUniformData,
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
        //     getPosition: (index: number) => {
        //         return getDirectionLightPosition(index, ThreeDTransformData, GameObjectData, drawDataMap.DirectionLightDataFromSystem).values;
        //     },
        //     getColorArr3: getDirectionLightColorArr3,
        //     getIntensity: getDirectionLightIntensity,
        //
        //     DirectionLightDataFromSystem: drawDataMap.DirectionLightDataFromSystem
        // },
        pointLightData: {
            getPosition: (index: number) => {
                return getPointLightPosition(index, ThreeDTransformData, GameObjectData, drawDataMap.PointLightDataFromSystem).values;
            },
            getColorArr3: getPointLightColorArr3,
            getIntensity: getPointLightIntensity,
            getConstant: getConstant,
            getLinear: getLinear,
            getQuadratic: getQuadratic,
            getRange: getRange,
            computeRadius: computeRadius,

            PointLightDataFromSystem: drawDataMap.PointLightDataFromSystem
        }
    }
}

