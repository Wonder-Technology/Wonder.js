import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../../device/WorkerDetectSystem";
import { Map } from "immutable";
import { IWebGL1ShaderLibContentGenerator } from "../../worker/webgl1/both_file/data/shaderLib_generator";
import { DrawDataMap, InitShaderDataMap } from "../../type/utilsType";
import { getGL } from "../../device/DeviceManagerSystem";
import { getMapCount } from "../../texture/MapManagerSystem";
import { hasDiffuseMap, hasSpecularMap } from "../../utils/material/lightMaterialUtils";
import {
    initNoMaterialShader as initNoMaterialShaderUtils, initMaterialShader as initMaterialShaderUtils,
    sendUniformData as sendUniformDataUtils
} from "../utils/shaderUtils";
import { buildGLSLSource } from "./shaderSourceBuildSystem";
import { IMaterialConfig, MaterialShaderLibConfig } from "../../data/material_config";
import { WebGL1SendUniformDataDataMap } from "../type/utilsType";
import { RenderCommandUniformData, UniformCacheMap, UniformLocationMap } from "../../type/dataType";
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
// import { getUniformData, sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../shader/glslSender/GLSLSenderSystem";

export var initNoMaterialShader = null;

export var initMaterialShader = null;

export var sendUniformData = null;

export var buildSendUniformDataDataMap = null;

if (!isSupportRenderWorkerAndSharedArrayBuffer()) {
    initNoMaterialShader = (state: Map<any, any>, shaderName:string, materialShaderLibConfig:MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderDataMap: InitShaderDataMap) => {
        initNoMaterialShaderUtils(state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
    };

    initMaterialShader = (state: Map<any, any>, materialIndex: number, shaderName: string, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderDataMap: InitShaderDataMap) => {
        return initMaterialShaderUtils(state, materialIndex, shaderName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
    };

    sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: RenderCommandUniformData, sendDataMap:WebGL1SendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
        sendUniformDataUtils(gl, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap);
    };

    buildSendUniformDataDataMap = (
        getUniformData, sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        getAmbientLightColorArr3,
        getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
        getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange,
        drawDataMap: DrawDataMap, ThreeDTransformData: any, GameObjectData: any) => {
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
                    return getDirectionLightPosition(index, ThreeDTransformData, GameObjectData, drawDataMap.DirectionLightDataFromSystem).values;
                },
                getColorArr3: getDirectionLightColorArr3,
                getIntensity: getDirectionLightIntensity,

                DirectionLightDataFromSystem: drawDataMap.DirectionLightDataFromSystem
            },
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
}
