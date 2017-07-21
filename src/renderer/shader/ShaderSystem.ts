import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import {
    bindIndexBuffer as bindIndexBufferUtils, init as initUtils, sendAttributeData as sendAttributeDataUtils, sendUniformData as sendUniformDataUtils,
    use as useUtils
} from "../utils/shader/shaderUtils";
import { getIndices, getNormals, getTexCoords, getVertices } from "../../component/geometry/GeometrySystem";
import { getAttribLocation, isAttributeLocationNotExist } from "./location/LocationSystem";
import { getUniformData, sendBuffer, sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "./glslSender/GLSLSenderSystem";
import { RenderCommandUniformData } from "../type/dataType";
import { buildGLSLSource } from "./shaderSourceBuildSystem";
import { getGL } from "../device/DeviceManagerSystem";
import { IMaterialConfig } from "../data/material_config";
import { IShaderLibGenerator } from "../data/shaderLib_generator";
import { Map } from "immutable";
import { DrawDataMap, InitShaderDataMap } from "../type/utilsType";
import { ThreeDTransformData } from "../../component/transform/ThreeDTransformData";
import { GameObjectData } from "../../core/entityObject/gameObject/GameObjectData";
import { getColorArr3 as getAmbientLightColorArr3 } from "../../component/light/AmbientLightSystem";
import {
    getColorArr3 as getDirectionLightColorArr3, getIntensity,
    getPosition as getDirectionLightPosition,
} from "../../component/light/DirectionLightSystem";
import {
    getPosition as getPointLightPosition,
    getColorArr3 as getPointLightColorArr3, getConstant,
    getIntensity as getPointLightIntensity, getLinear, getQuadratic, getRange
} from "../../component/light/PointLightSystem";
import { getMapCount } from "../texture/MapManagerSystem";
import { createMap } from "../../utils/objectUtils";

// export var create = (materialClassName: string, MaterialData: any, ShaderData: any) => {
export var create = (ShaderData: any) => {
    // var index = getShaderIndexFromTable(materialClassName, MaterialData.shaderIndexTable),
    // var shader = ShaderData.shaderMap[index];

    // if (_isShaderExist(shader)) {
    //     return shader;
    // }

    // var shader = new Shader();

    // shader.index = index;

    ShaderData.count += 1;

    // return shader;
}

// var _isShaderExist = (shader: Shader) => isValidMapValue(shader);

export var init = null;

export var sendAttributeData = null;

export var sendUniformData = null;

export var bindIndexBuffer = null;

export var use = null;

if (!isSupportRenderWorkerAndSharedArrayBuffer()) {
    init = (state: Map<any, any>, materialIndex: number, materialClassName: string, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, initShaderDataMap:InitShaderDataMap) => {
        return initUtils(state, materialIndex, materialClassName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
    };

    var _buildInitShaderFuncDataMap = () => {
        return {
            buildGLSLSource: buildGLSLSource,
            getGL: getGL,
            getMapCount: getMapCount
        }
    }

    sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, ProgramData: any, LocationData: any, GLSLSenderData: any, GeometryData: any, ArrayBufferData: any) => sendAttributeDataUtils(gl, shaderIndex, program, geometryIndex, {
        getVertices: getVertices,
        getNormals: getNormals,
        getTexCoords: getTexCoords
    }, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData);

    //todo fix worker
    sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, mapCount:number, drawDataMap: DrawDataMap, renderCommandUniformData: RenderCommandUniformData) => {
        sendUniformDataUtils(gl, shaderIndex, program, mapCount, _buildSendUniformDataDataMap(drawDataMap), drawDataMap, renderCommandUniformData);
    };

    var _buildSendUniformDataDataMap = (drawDataMap: DrawDataMap) => {
        return {
            glslSenderData: {
                getUniformData: getUniformData,
                sendMatrix3: sendMatrix3,
                sendMatrix4: sendMatrix4,
                sendVector3: sendVector3,
                sendInt: sendInt,
                sendFloat1: sendFloat1,
                sendFloat3: sendFloat3,

                GLSLSenderDataFromSystem:drawDataMap.GLSLSenderDataFromSystem
            },
            ambientLightData:{
                getColorArr3: getAmbientLightColorArr3,

                AmbientLightDataFromSystem:drawDataMap.AmbientLightDataFromSystem
            },
            directionLightData:{
                getPosition: (index:number) => {
                    return getDirectionLightPosition(index, ThreeDTransformData, GameObjectData, drawDataMap.DirectionLightDataFromSystem).values;
                },
                getColorArr3: getDirectionLightColorArr3,
                getIntensity: getIntensity,

                DirectionLightDataFromSystem:drawDataMap.DirectionLightDataFromSystem
            },
            pointLightData:{
                getPosition: (index:number) => {
                    return getPointLightPosition(index, ThreeDTransformData, GameObjectData, drawDataMap.PointLightDataFromSystem).values;
                },
                getColorArr3: getPointLightColorArr3,
                getIntensity: getPointLightIntensity,
                getConstant: getConstant,
                getLinear: getLinear,
                getQuadratic: getQuadratic,
                getRange: getRange,

                PointLightDataFromSystem:drawDataMap.PointLightDataFromSystem
            }
        }
    }

    bindIndexBuffer = (gl: WebGLRenderingContext, geometryIndex: number, ProgramData: any, GeometryData: any, IndexBufferData: any) => {
        bindIndexBufferUtils(gl, geometryIndex, getIndices, ProgramData, GeometryData, IndexBufferData);
    }

    use = useUtils;
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

export var initData = (ShaderData: any) => {
    ShaderData.index = 0;
    ShaderData.count = 0;

    ShaderData.shaderLibWholeNameMap = createMap();
}
