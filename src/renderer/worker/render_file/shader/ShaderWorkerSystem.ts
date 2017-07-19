import {
    bindIndexBuffer as bindIndexBufferUtils, init as initUtils, sendAttributeData as sendAttributeDataUtils, sendUniformData as sendUniformDataUtils,
    use as useUtils
} from "../../../utils/shader/shaderUtils";
import { getIndices, getNormals, getTexCoords, getVertices } from "../geometry/GeometryWorkerSystem";
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
import { getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity } from "../light/DirectionLightWorkerSystem";
import {
    getColorArr3 as getPointLightColorArr3,
    getIntensity as getPointLightIntensity,
    getConstant as getPointLightConstant,
    getLinear as getPointLightLinear,
    getQuadratic as getPointLightQuadratic,
    getRange as getPointLightRange,
} from "../light/PointLightWorkerSystem";
import { getMapCount } from "../texture/MapManagerWorkerSystem";
import { createMap } from "../../../../utils/objectUtils";

export var init = (state: Map<any, any>, materialIndex: number, materialClassName: string, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, initShaderDataMap:InitShaderDataMap) => {
    return initUtils(state, materialIndex, materialClassName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
};

var _buildInitShaderFuncDataMap = () => {
    return {
        buildGLSLSource: buildGLSLSource,
        getGL: getGL,
        getMapCount: getMapCount
    }
}

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, ProgramWorkerData: any, LocationWorkerData: any, GLSLSenderWorkerData: any, GeometryWorkerData: any, ArrayBufferWorkerData: any) => sendAttributeDataUtils(gl, shaderIndex, program, geometryIndex, {
    getVertices: getVertices,
    getNormals: getNormals,
    //todo fix
    getTexCoords:getTexCoords
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
                return getDirectionLightPosition(index, drawDataMap);
            },
            getColorArr3: getDirectionLightColorArr3,
            getIntensity: getDirectionLightIntensity,

            DirectionLightDataFromSystem:drawDataMap.DirectionLightDataFromSystem
        },
        pointLightData:{
            getPosition: (index:number) => {
                return getPointLightPosition(index, drawDataMap);
            },
            getColorArr3: getPointLightColorArr3,
            getIntensity: getPointLightIntensity,
            getConstant: getPointLightConstant,
            getLinear: getPointLightLinear,
            getQuadratic: getPointLightQuadratic,
            getRange: getPointLightRange,

            PointLightDataFromSystem:drawDataMap.PointLightDataFromSystem
        }
    }
}

export var bindIndexBuffer = (gl: WebGLRenderingContext, geometryIndex: number, ProgramWorkerData: any, GeometryWorkerData: any, IndexBufferWorkerData: any) => {
    bindIndexBufferUtils(gl, geometryIndex, getIndices, ProgramWorkerData, GeometryWorkerData, IndexBufferWorkerData);
}

export var use = useUtils;

export var getDirectionLightPosition = (index:number, drawDataMap: DrawDataMap) => {
    return _getLightPosition(index, drawDataMap.DirectionLightDataFromSystem);
}

export var getPointLightPosition = (index:number, drawDataMap: DrawDataMap) => {
    return _getLightPosition(index, drawDataMap.PointLightDataFromSystem);
}

var _getLightPosition = (index:number, LightDataFromSystem:any) => {
    return LightDataFromSystem.positionArr[index];
}

export var initData = (ShaderWorkerData: any) => {
    ShaderWorkerData.index = 0;
    ShaderWorkerData.count = 0;

    ShaderWorkerData.shaderLibWholeNameMap = createMap();
}
