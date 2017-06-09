import { IMaterialConfig } from "../../data/material_config";
import {
    IShaderLibGenerator
} from "../../data/shaderLib_generator";
import { getGL } from "../../../device/DeviceManagerSystem";
import { Map } from "immutable";
import { getOrCreateBuffer as getOrCreateIndexBuffer } from "../../buffer/IndexBufferSystem";
import { buildGLSLSource } from "../../shader/shaderSourceBuildSystem";
import { setLocationMap } from "../../shader/location/LocationSystem";
import {
    getMaterialShaderLibConfig, getProgram, initShader, isProgramExist,
    registerProgram, sendUniformData as sendUniformDataProgram, sendAttributeData as sendAttributeDataProgram, use as useProgram
} from "../../shader/program/ProgramSystem";
import { addSendAttributeConfig, addSendUniformConfig } from "../../shader/glslSender/GLSLSenderSystem";
import { RenderCommandUniformData } from "../../command/RenderCommandBufferData";

export var init = (state: Map<any, any>, materialIndex: number, shaderIndex: number, materialClassName: string, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DeviceManagerData: any, ProgramData:any, LocationData:any, GLSLSenderData:any) => {
    var program = getProgram(shaderIndex, ProgramData);

    //todo unit test
    if (isProgramExist(program)) {
        return;
    }

    let materialShaderLibConfig = getMaterialShaderLibConfig(materialClassName, material_config),
        shaderLibData = shaderLib_generator.shaderLibs,
        {
            vsSource,
            fsSource
        } = buildGLSLSource(materialIndex, materialShaderLibConfig, shaderLibData),
        gl = getGL(DeviceManagerData, state);

    program = gl.createProgram();

    registerProgram(shaderIndex, ProgramData, program);
    initShader(program, vsSource, fsSource, gl);

    setLocationMap(gl, shaderIndex, program, materialShaderLibConfig, shaderLibData, LocationData);

    addSendAttributeConfig(shaderIndex, materialShaderLibConfig, shaderLibData, GLSLSenderData.sendAttributeConfigMap);
    addSendUniformConfig(shaderIndex, materialShaderLibConfig, shaderLibData, GLSLSenderData.sendUniformConfigMap);
}

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, geometryIndex: number, ProgramData:any, LocationData: any, GLSLSenderData:any, GeometryWorkerData: any, ArrayBufferData: any) => {
    sendAttributeDataProgram(gl, shaderIndex, geometryIndex, ProgramData, LocationData, GLSLSenderData, GeometryWorkerData, ArrayBufferData);
}

export var sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, MaterialData: any, ProgramData:any, LocationData: any, GLSLSenderData:any, renderCommandUniformData:RenderCommandUniformData) => {
    sendUniformDataProgram(gl, shaderIndex, MaterialData, ProgramData, LocationData, GLSLSenderData, renderCommandUniformData);
}

export var bindIndexBuffer = (gl: WebGLRenderingContext, geometryIndex: number, ShaderData: any, GeometryWorkerData: any, IndexBufferData: any) => {
    var buffer = getOrCreateIndexBuffer(gl, geometryIndex, GeometryWorkerData, IndexBufferData);

    if (ShaderData.lastBindedIndexBuffer === buffer) {
        return;
    }

    ShaderData.lastBindedIndexBuffer = buffer;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
}

export var use = (gl: WebGLRenderingContext, shaderIndex: number, ProgramData: any, LocationData:any, GLSLSenderData:any) => {
    useProgram(gl, shaderIndex, ProgramData, LocationData, GLSLSenderData);
}

