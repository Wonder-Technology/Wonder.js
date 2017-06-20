import {
    bindIndexBuffer as bindIndexBufferUtils, init as initUtils, sendAttributeData as sendAttributeDataUtils, sendUniformData as sendUniformDataUtils,
    use as useUtils
} from "../../../utils/shader/shaderUtils";
import { getIndices, getVertices } from "../geometry/GeometryWorkerSystem";
import { getAttribLocation, isAttributeLocationNotExist } from "./location/LocationWorkerSystem";
import { getUniformData, sendBuffer, sendFloat1, sendMatrix4, sendVector3 } from "./glslSender/GLSLSenderWorkerSystem";
import { RenderCommandUniformData } from "../../../type/dataType";
import { IMaterialConfig } from "../../../data/material_config";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator";
import { Map } from "immutable";
import { buildGLSLSource } from "./shaderSourceBuildWorkerSystem";
import { getGL } from "../../both_file/device/DeviceManagerWorkerSystem";

export var init = (state: Map<any, any>, materialIndex: number, shaderIndex: number, materialClassName: string, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DeviceManagerWorkerData: any, ProgramWorkerData: any, LocationWorkerData: any, GLSLSenderWorkerData: any, MaterialWorkerData: any) => {
    initUtils(state, materialIndex, shaderIndex, materialClassName, material_config, shaderLib_generator, buildGLSLSource, getGL, DeviceManagerWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, MaterialWorkerData);
};

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, geometryIndex: number, ProgramWorkerData: any, LocationWorkerData: any, GLSLSenderWorkerData: any, GeometryWorkerData: any, ArrayBufferWorkerData: any) => sendAttributeDataUtils(gl, shaderIndex, geometryIndex, getVertices, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, GeometryWorkerData, ArrayBufferWorkerData);

export var sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, MaterialWorkerData: any, ProgramWorkerData: any, LocationWorkerData: any, GLSLSenderWorkerData: any, renderCommandUniformData: RenderCommandUniformData) => {
    sendUniformDataUtils(gl, shaderIndex, {
        getUniformData: getUniformData,
        sendMatrix4: sendMatrix4,
        sendVector3: sendVector3,
        sendFloat1: sendFloat1
    }, MaterialWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, renderCommandUniformData);
};

export var bindIndexBuffer = (gl: WebGLRenderingContext, geometryIndex: number, ProgramWorkerData: any, GeometryWorkerData: any, IndexBufferWorkerData: any) => {
    bindIndexBufferUtils(gl, geometryIndex, getIndices, ProgramWorkerData, GeometryWorkerData, IndexBufferWorkerData);
}

export var use = useUtils;
