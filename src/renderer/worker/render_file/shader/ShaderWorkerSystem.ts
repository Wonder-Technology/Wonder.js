import {
    bindIndexBuffer as bindIndexBufferUtils, init as initUtils, sendAttributeData as sendAttributeDataUtils, sendUniformData as sendUniformDataUtils,
    use as useUtils
} from "../../../utils/shader/shaderUtils";
import { getIndices, getNormals, getVertices } from "../geometry/GeometryWorkerSystem";
import { getAttribLocation, isAttributeLocationNotExist } from "./location/LocationWorkerSystem";
import {
    getUniformData, sendBuffer, sendFloat1, sendFloat3, sendInt, sendMatrix3, sendMatrix4,
    sendVector3
} from "./glslSender/GLSLSenderWorkerSystem";
import { MaterialDataMap, RenderCommandUniformData } from "../../../type/dataType";
import { IMaterialConfig } from "../../../data/material_config";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator";
import { Map } from "immutable";
import { buildGLSLSource } from "./shaderSourceBuildWorkerSystem";
import { getGL } from "../../both_file/device/DeviceManagerWorkerSystem";
import { DrawDataMap, InitShaderDataMap } from "../../../type/utilsType";
import { getColorArr3 as getAmbientLightColorArr3 } from "../light/AmbientLightWorkerSystem";
import { getColorArr3 as getDirectionLightColorArr3, getIntensity } from "../light/DirectionLightWorkerSystem";

export var init = (state: Map<any, any>, materialIndex: number, shaderIndex: number, materialClassName: string, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, initShaderDataMap:InitShaderDataMap) => {
    initUtils(state, materialIndex, shaderIndex, materialClassName, material_config, shaderLib_generator, buildGLSLSource, getGL, initShaderDataMap);
};

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, ProgramWorkerData: any, LocationWorkerData: any, GLSLSenderWorkerData: any, GeometryWorkerData: any, ArrayBufferWorkerData: any) => sendAttributeDataUtils(gl, shaderIndex, program, geometryIndex, {
    getVertices: getVertices,
    getNormals: getNormals
}, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, GeometryWorkerData, ArrayBufferWorkerData);

export var sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: RenderCommandUniformData) => {
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
            getColorArr3: getAmbientLightColorArr3,

            AmbientLightDataFromSystem:drawDataMap.AmbientLightDataFromSystem
        },
        directionLightData:{
            getPosition: (index:number) => {
                return getPosition(index, drawDataMap);
            },
            getColorArr3: getDirectionLightColorArr3,
            getIntensity: getIntensity,

            DirectionLightDataFromSystem:drawDataMap.DirectionLightDataFromSystem
        }
    }
}

export var bindIndexBuffer = (gl: WebGLRenderingContext, geometryIndex: number, ProgramWorkerData: any, GeometryWorkerData: any, IndexBufferWorkerData: any) => {
    bindIndexBufferUtils(gl, geometryIndex, getIndices, ProgramWorkerData, GeometryWorkerData, IndexBufferWorkerData);
}

export var use = useUtils;

export var getPosition = (index:number, drawDataMap: DrawDataMap) => {
    return drawDataMap.DirectionLightDataFromSystem.positionArr[index];
}
