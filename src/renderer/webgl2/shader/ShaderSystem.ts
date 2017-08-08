// export var getNoMaterialShaderIndex = (shaderName: string, ShaderData: any) => {
//     return ShaderData.shaderIndexMap[shaderName];
// }

import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../../device/WorkerDetectSystem";
import { Map } from "immutable";
import { IWebGL2ShaderLibContentGenerator } from "../../worker/webgl2/both_file/data/shaderLib_generator";
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
import { WebGL2SendUniformDataDataMap } from "../type/utilsType";
import { RenderCommandUniformData, UniformCacheMap, UniformLocationMap } from "../../type/dataType";

export var initNoMaterialShader = null;

export var initMaterialShader = null;

export var sendUniformData = null;

export var buildSendUniformDataDataMap = null;

if (!isSupportRenderWorkerAndSharedArrayBuffer()) {
    initNoMaterialShader = (state: Map<any, any>, shaderName:string, materialShaderLibConfig:MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL2ShaderLibContentGenerator, initShaderDataMap: InitShaderDataMap) => {
        initNoMaterialShaderUtils(state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
    };

    initMaterialShader = (state: Map<any, any>, materialIndex: number, shaderName: string, material_config: IMaterialConfig, shaderLib_generator: IWebGL2ShaderLibContentGenerator, initShaderDataMap: InitShaderDataMap) => {
        return initMaterialShaderUtils(state, materialIndex, shaderName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
    };

    sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: RenderCommandUniformData, sendDataMap:WebGL2SendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
        sendUniformDataUtils(gl, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap);
    };

    buildSendUniformDataDataMap = (
        getUniformData, sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        // getAmbientLightColorArr3,
        // getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
        getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange, computeRadius,
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

// export var dispose = (gl: WebGLRenderingContext, shaderIndex: number, ShaderData: any) => {
//     //todo finish
//
//     // _disposeProgram(gl, ShaderData.programMap[shaderIndex]);
//     // deleteVal(shaderIndex, ShaderData.programMap);
//
//
//     // deleteVal(shaderIndex, LocationData.attributeLocationMap);
//     // deleteVal(shaderIndex, LocationData.uniformLocationMap);
//     // deleteVal(shaderIndex, ShaderData.sendAttributeConfigMap);
//     // deleteVal(shaderIndex, ShaderData.sendUniformConfigMap);
//     // deleteVal(shaderIndex, ShaderData.vertexAttribHistory);
//     // deleteVal(shaderIndex, ShaderData.shaderMap);
// }

// var _disposeProgram = (gl:WebGLRenderingContext, program:WebGLProgram) => {
//     gl.deleteProgram(this.glProgram);
// }

// export var initData = (ShaderData: any) => {
//     ShaderData.index = 0;
//     ShaderData.count = 0;
//
//     ShaderData.shaderLibWholeNameMap = createMap();
//     //todo fix render worker
//     ShaderData.shaderIndexMap = createMap();
// }
