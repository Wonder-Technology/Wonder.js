import { Map } from "immutable";
import { getGL } from "../../../both_file/device/DeviceManagerWorkerSystem";
import { DrawDataMap, InitShaderDataMap } from "../../../../type/utilsType";
import { getMapCount } from "../../../render_file/texture/MapManagerWorkerSystem";
import { IMaterialConfig, MaterialShaderLibConfig } from "../../../../data/material_config";
import { IWebGL1ShaderLibContentGenerator } from "../../both_file/data/shaderLib_generator";
import {
    initMaterialShader as initMaterialShaderUtils,
    initNoMaterialShader as initNoMaterialShaderUtils, sendUniformData as sendUniformDataUtils
} from "../../../../webgl1/utils/shaderUtils";
import { buildGLSLSource } from "./shaderSourceBuildWorkerSystem";
import { RenderCommandUniformData, UniformCacheMap, UniformLocationMap } from "../../../../type/dataType";
import { WebGL1SendUniformDataDataMap } from "../../../../webgl1/type/utilsType";
import { hasDiffuseMap, hasSpecularMap } from "../../../render_file/material/LightMaterialWorkerSystem";

export var initNoMaterialShader = (state: Map<any, any>, shaderName: string, materialShaderLibConfig: MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderDataMap: InitShaderDataMap) => {
    initNoMaterialShaderUtils(state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
};

export var initMaterialShader = (state: Map<any, any>, materialIndex: number, shaderName: string, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderDataMap: InitShaderDataMap) => {
    return initMaterialShaderUtils(state, materialIndex, shaderName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
};

export var sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: RenderCommandUniformData, sendDataMap:WebGL1SendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
    sendUniformDataUtils(gl, shaderIndex, program,  drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap);
};


export var buildSendUniformDataDataMap = (
    getUniformData, sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
    getAmbientLightColorArr3,
    getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
    getPointLightPosition, getPointLightColorArr3, getPointLightConstant, getPointLightIntensity, getPointLightLinear, getPointLightQuadratic, getPointLightRange,
    drawDataMap: DrawDataMap) => {
    //todo optimize: cache

    return {
        glslSenderData: {
            getUniformData: getUniformData,
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
            getPosition: (index: number) => {
                return getDirectionLightPosition(index, drawDataMap);
            },
            getColorArr3: getDirectionLightColorArr3,
            getIntensity: getDirectionLightIntensity,

            DirectionLightDataFromSystem: drawDataMap.DirectionLightDataFromSystem
        },
        pointLightData: {
            getPosition: (index: number) => {
                return getPointLightPosition(index, drawDataMap);
            },
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


var _buildInitShaderFuncDataMap = () => {
    return {
        buildGLSLSource: buildGLSLSource,
        getGL: getGL,
        getMapCount: getMapCount,
        hasSpecularMap: hasSpecularMap,
        hasDiffuseMap: hasDiffuseMap
    }
}
