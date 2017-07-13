import { Shader } from "./Shader";
import { createMap, isValidMapValue } from "../../utils/objectUtils";
import { getShaderIndexFromTable } from "../../component/material/MaterialSystem";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import {
    bindIndexBuffer as bindIndexBufferUtils, init as initUtils, sendAttributeData as sendAttributeDataUtils, sendUniformData as sendUniformDataUtils,
    use as useUtils
} from "../utils/shader/shaderUtils";
import { getIndices, getNormals, getVertices } from "../../component/geometry/GeometrySystem";
import { getAttribLocation, isAttributeLocationNotExist } from "./location/LocationSystem";
import { getUniformData, sendBuffer, sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "./glslSender/GLSLSenderSystem";
import { MaterialDataMap, RenderCommandUniformData } from "../type/dataType";
import { buildGLSLSource } from "./shaderSourceBuildSystem";
import { getGL } from "../device/DeviceManagerSystem";
import { IMaterialConfig } from "../data/material_config";
import { IShaderLibGenerator } from "../data/shaderLib_generator";
import { Map } from "immutable";
import { DrawDataMap } from "../type/utilsType";
import { ThreeDTransformData } from "../../component/transform/ThreeDTransformData";
import { GameObjectData } from "../../core/entityObject/gameObject/GameObjectData";
import { getColor as getAmbientLightColor } from "../../component/light/AmbientLightSystem";
import {
    getColor as getDirectionLightColor, getIntensity,
    getPosition
} from "../../component/light/DirectionLightSystem";

export var create = (materialClassName: string, MaterialData: any, ShaderData: any) => {
    var index = getShaderIndexFromTable(materialClassName, MaterialData.shaderIndexTable),
        shader = ShaderData.shaderMap[index];

    if (_isShaderExist(shader)) {
        return shader;
    }

    shader = new Shader();

    shader.index = index;

    ShaderData.count += 1;

    return shader;
}

var _isShaderExist = (shader: Shader) => isValidMapValue(shader);

export var init = null;

export var sendAttributeData = null;

export var sendUniformData = null;

export var bindIndexBuffer = null;

export var use = null;

if (!isSupportRenderWorkerAndSharedArrayBuffer()) {
    init = (state: Map<any, any>, materialIndex: number, shaderIndex: number, materialClassName: string, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DeviceManagerData: any, ProgramData: any, LocationData: any, GLSLSenderData: any, MaterialDataMap: MaterialDataMap) => {
        initUtils(state, materialIndex, shaderIndex, materialClassName, material_config, shaderLib_generator, buildGLSLSource, getGL, DeviceManagerData, ProgramData, LocationData, GLSLSenderData, MaterialDataMap);
    };

    sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, ProgramData: any, LocationData: any, GLSLSenderData: any, GeometryData: any, ArrayBufferData: any) => sendAttributeDataUtils(gl, shaderIndex, program, geometryIndex, {
        getVertices: getVertices,
        getNormals: getNormals
    }, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData);

    sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: RenderCommandUniformData) => {
        sendUniformDataUtils(gl, shaderIndex, program, _buildSendUniformDataDataMap(drawDataMap), drawDataMap, renderCommandUniformData);
    };

    var _buildSendUniformDataDataMap = (drawDataMap: DrawDataMap) => {
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

                GLSLSenderDataFromSystem:drawDataMap.GLSLSenderDataFromSystem
            },
            ambientLightData:{
                getColor: getAmbientLightColor,

                AmbientLightDataFromSystem:drawDataMap.AmbientLightDataFromSystem
            },
            directionLightData:{
                getPosition: (index:number) => {
                    return getPosition(index, ThreeDTransformData, GameObjectData, drawDataMap.DirectionLightDataFromSystem);
                },
                getColor: getDirectionLightColor,
                getIntensity: getIntensity,

                DirectionLightDataFromSystem:drawDataMap.DirectionLightDataFromSystem
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

    ShaderData.shaderMap = createMap();
}
