import { InitShaderDataMap } from "../../../../../../../type/utilsType";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../../../../../data/material_config_interface";
import { IRenderConfig } from "../../../../../../../worker/both_file/data/render_config";
import { draw as frontDraw } from "../../../../../draw/light/front/frontDrawRenderCommandBufferUtils";
import { IWebGL1DrawFuncDataMap } from "../../../../../../interface/IDraw";
import { WebGL1LightSendUniformDataDataMap } from "../../../../../../type/utilsType";
import {
    LightRenderCommandBufferForDrawData
} from "../../../../../../../utils/worker/render_file/type/dataType";
import { CameraRenderCommandBufferForDrawData } from "../../../../../../../utils/worker/render_file/type/dataType";
import { WebGL1DrawDataMap } from "../../../type/utilsType";

export var render = (gl:any, state: Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawFuncDataMap:IWebGL1DrawFuncDataMap, drawDataMap: WebGL1DrawDataMap, sendDataMap:WebGL1LightSendUniformDataDataMap, initShaderDataMap:InitShaderDataMap, bufferData: LightRenderCommandBufferForDrawData, cameraData:CameraRenderCommandBufferForDrawData) => {
    frontDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, sendDataMap, initShaderDataMap, bufferData, cameraData);
}

export var buildSendUniformDataDataMap = (
    sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
    getAmbientLightColorArr3, isAmbientLightColorDirty,   cleanAmbientLightColorDirty,
    getDirectionLightPosition, getDirectionLightColorArr3, getDirectionLightIntensity, isDirectionLightPositionDirty, isDirectionLightColorDirty, isDirectionLightIntensityDirty,  cleanDirectionLightPositionDirty, cleanDirectionLightColorDirty, cleanDirectionLightIntensityDirty,
    getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange, isPointLightPositionDirty, isPointLightColorDirty, isPointLightIntensityDirty, isPointLightAttenuationDirty, cleanPointLightPositionDirty, cleanPointLightColorDirty, cleanPointLightIntensityDirty, cleanPointLightAttenuationDirty,

    drawDataMap: WebGL1DrawDataMap
) => {
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

            isColorDirty : isAmbientLightColorDirty,
            cleanColorDirty: cleanAmbientLightColorDirty,

            AmbientLightDataFromSystem: drawDataMap.AmbientLightDataFromSystem
        },
        directionLightData: {
            getPosition: getDirectionLightPosition,
            getColorArr3: getDirectionLightColorArr3,
            getIntensity: getDirectionLightIntensity,

            isPositionDirty: isDirectionLightPositionDirty,
            isColorDirty : isDirectionLightColorDirty,
            isIntensityDirty : isDirectionLightIntensityDirty,
            cleanPositionDirty: cleanDirectionLightPositionDirty,
            cleanColorDirty: cleanDirectionLightColorDirty,
            cleanIntensityDirty: cleanDirectionLightIntensityDirty,

            DirectionLightDataFromSystem: drawDataMap.DirectionLightDataFromSystem
        },
        pointLightData: {
            getPosition: getPointLightPosition,
            getColorArr3: getPointLightColorArr3,
            getIntensity: getPointLightIntensity,
            getConstant: getConstant,
            getLinear: getLinear,
            getQuadratic: getQuadratic,
            getRange: getRange,

            isPositionDirty: isPointLightPositionDirty,
            isColorDirty : isPointLightColorDirty,
            isIntensityDirty : isPointLightIntensityDirty,
            isAttenuationDirty : isPointLightAttenuationDirty,
            cleanPositionDirty: cleanPointLightPositionDirty,
            cleanColorDirty: cleanPointLightColorDirty,
            cleanIntensityDirty: cleanPointLightIntensityDirty,
            cleanAttenuationDirty: cleanPointLightAttenuationDirty,

            PointLightDataFromSystem: drawDataMap.PointLightDataFromSystem
        }
    }
}
