import { Map } from "immutable";
import { bindGBufferTargets, init as initGBuffer, sendGBufferTargetData } from "./gbuffer/gBufferUtils";
import { init as initDeferLightPass } from "./light/deferLightPassUtils";
import { use } from "../../../../../../../utils/worker/render_file/shader/shaderUtils";
import { IMaterialConfig } from "../../../../../../../data/material_config_interface";
import { IShaderLibGenerator } from "../../../../../../../data/shaderLib_generator_interface";
import { InitShaderDataMap } from "../../../../../../../type/utilsType";
import {
    LightRenderCommandBufferForDrawData
} from "../../../../../../../utils/worker/render_file/type/dataType";
import { IRenderConfig } from "../../../../../../../worker/both_file/data/render_config";
import { getNoMaterialShaderIndex } from "../../../shader/shaderUtils";
import { IWebGL2DeferDrawFuncDataMap } from "../../../../../../interface/IDraw";
import { draw as deferDraw } from "../../../../../draw/light/defer/deferDrawRenderCommandBufferUtils";
import { CameraRenderCommandBufferForDrawData } from "../../../../../../../utils/worker/render_file/type/dataType";
import { IWebGL2DrawDataMap, IWebGL2LightSendUniformDataDataMap } from "../../../interface/IUtils";
import { DeferDrawDataMap } from "../../../type/utilsType";

export const init = (gl: any, DataBufferConfig: any, GBufferDataFromSystem: any, DeferAmbientLightPassDataFromSystem: any, DeferDirectionLightPassDataFromSystem: any, DeferPointLightPassDataFromSystem: any, ShaderDataFromSystem: any, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) => {
    initGBuffer(gl, GBufferDataFromSystem);

    //todo refactor: when switch to defer shading, bind and send gbuffer textures

    bindGBufferTargets(gl, GBufferDataFromSystem);

    _initDeferLightPass(gl, "DeferAmbientLightPass", ShaderDataFromSystem, GLSLSenderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, DeferAmbientLightPassDataFromSystem);
    _initDeferLightPass(gl, "DeferDirectionLightPass", ShaderDataFromSystem, GLSLSenderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, DeferDirectionLightPassDataFromSystem);
    _initDeferLightPass(gl, "DeferPointLightPass", ShaderDataFromSystem, GLSLSenderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, DeferPointLightPassDataFromSystem);
}

const _initDeferLightPass = (gl: any, shaderName: string, ShaderDataFromSystem: any, GLSLSenderDataFromSystem: any, ProgramDataFromSystem: any, LocationDataFromSystem: any, DeferLightPassDataFromSystem: any) => {
    var program: WebGLProgram = null,
        shaderIndex: number = null;

    shaderIndex = getNoMaterialShaderIndex(shaderName, ShaderDataFromSystem);

    initDeferLightPass(gl, shaderIndex, GLSLSenderDataFromSystem, DeferLightPassDataFromSystem);

    program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);

    sendGBufferTargetData(gl, program);
}

export const render = (gl: any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawFuncDataMap: IWebGL2DeferDrawFuncDataMap, drawDataMap: IWebGL2DrawDataMap, deferDrawDataMap: DeferDrawDataMap, sendDataMap: IWebGL2LightSendUniformDataDataMap, initShaderDataMap: InitShaderDataMap, bufferData: LightRenderCommandBufferForDrawData, cameraData: CameraRenderCommandBufferForDrawData) => {
    deferDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, deferDrawDataMap, sendDataMap, initShaderDataMap, bufferData, cameraData);
}

export const buildSendUniformDataDataMap = (
    sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
    getAmbientLightColorArr3, isAmbientLightColorDirty, cleanAmbientLightColorDirty,
    getDirectionLightPosition, getDirectionLightColorArr3, getDirectionLightIntensity, isDirectionLightPositionDirty, isDirectionLightColorDirty, isDirectionLightIntensityDirty, cleanDirectionLightPositionDirty, cleanDirectionLightColorDirty, cleanDirectionLightIntensityDirty,
    getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange, computeRadius,
    isPositionDirty, isColorDirty, isIntensityDirty, isAttenuationDirty, cleanPositionDirty, cleanColorDirty, cleanIntensityDirty, cleanAttenuationDirty,
    drawDataMap: IWebGL2DrawDataMap) => {
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

            isColorDirty: isAmbientLightColorDirty,

            cleanColorDirty: cleanAmbientLightColorDirty,

            AmbientLightDataFromSystem: drawDataMap.AmbientLightDataFromSystem
        },
        directionLightData: {
            getPosition: getDirectionLightPosition,
            getColorArr3: getDirectionLightColorArr3,
            getIntensity: getDirectionLightIntensity,

            isPositionDirty: isDirectionLightPositionDirty,
            isColorDirty: isDirectionLightColorDirty,
            isIntensityDirty: isDirectionLightIntensityDirty,
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
            computeRadius: computeRadius,

            isPositionDirty: isPositionDirty,
            isColorDirty: isColorDirty,
            isIntensityDirty: isIntensityDirty,
            isAttenuationDirty: isAttenuationDirty,
            cleanPositionDirty: cleanPositionDirty,
            cleanColorDirty: cleanColorDirty,
            cleanIntensityDirty: cleanIntensityDirty,
            cleanAttenuationDirty: cleanAttenuationDirty,

            PointLightDataFromSystem: drawDataMap.PointLightDataFromSystem
        }
    }
}
