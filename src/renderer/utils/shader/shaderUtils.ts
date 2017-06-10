import { IMaterialConfig } from "../../data/material_config";
import {
    IShaderLibGenerator
} from "../../data/shaderLib_generator";
import { getGL } from "../../device/DeviceManagerSystem";
import { Map } from "immutable";
import { buildGLSLSource } from "../../shader/shaderSourceBuildSystem";
import { setLocationMap } from "./location/locationUtils";
import {
    getMaterialShaderLibConfig, getProgram, initShader, isProgramExist,
    registerProgram, sendUniformData as sendUniformDataProgram, sendAttributeData as sendAttributeDataProgram, use as useProgram
} from "./program/programUtils";
import { addSendAttributeConfig, addSendUniformConfig } from "./glslSender/glslSenderUtils";
import { RenderCommandUniformData } from "../../type/dataType";
import { getOrCreateBuffer } from "../buffer/indexBufferUtils";

export var init = (state: Map<any, any>, materialIndex: number, shaderIndex: number, materialClassName: string, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DeviceManagerDataFromSystem: any, ProgramDataFromSystem:any, LocationDataFromSystem:any, GLSLSenderDataFromSystem:any) => {
    var program = getProgram(shaderIndex, ProgramDataFromSystem);

    //todo unit test
    if (isProgramExist(program)) {
        return;
    }

    let materialShaderLibConfig = getMaterialShaderLibConfig(materialClassName, material_config),
        shaderLibDataFromSystem = shaderLib_generator.shaderLibs,
        {
            vsSource,
            fsSource
        } = buildGLSLSource(materialIndex, materialShaderLibConfig, shaderLibDataFromSystem),
        gl = getGL(DeviceManagerDataFromSystem, state);

    program = gl.createProgram();

    registerProgram(shaderIndex, ProgramDataFromSystem, program);
    initShader(program, vsSource, fsSource, gl);

    setLocationMap(gl, shaderIndex, program, materialShaderLibConfig, shaderLibDataFromSystem, LocationDataFromSystem);

    addSendAttributeConfig(shaderIndex, materialShaderLibConfig, shaderLibDataFromSystem, GLSLSenderDataFromSystem.sendAttributeConfigMap);
    addSendUniformConfig(shaderIndex, materialShaderLibConfig, shaderLibDataFromSystem, GLSLSenderDataFromSystem.sendUniformConfigMap);
}

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, geometryIndex: number, getVertivesFunc:Function, ProgramDataFromSystem:any, LocationDataFromSystem: any, GLSLSenderDataFromSystem:any, GeometryWorkerDataFromSystem: any, ArrayBufferDataFromSystem: any) => {
    sendAttributeDataProgram(gl, shaderIndex, geometryIndex, getVertivesFunc, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryWorkerDataFromSystem, ArrayBufferDataFromSystem);
}

export var sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, MaterialDataFromSystem: any, ProgramDataFromSystem:any, LocationDataFromSystem: any, GLSLSenderDataFromSystem:any, renderCommandUniformData:RenderCommandUniformData) => {
    sendUniformDataProgram(gl, shaderIndex, MaterialDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, renderCommandUniformData);
}

export var bindIndexBuffer = (gl: WebGLRenderingContext, geometryIndex: number, getIndicesFunc:Function, ProgramDataFromSystem: any, GeometryWorkerDataFromSystem: any, IndexBufferDataFromSystem: any) => {
    var buffer = getOrCreateBuffer(gl, geometryIndex, getIndicesFunc, GeometryWorkerDataFromSystem, IndexBufferDataFromSystem);

    if (ProgramDataFromSystem.lastBindedIndexBuffer === buffer) {
        return;
    }

    ProgramDataFromSystem.lastBindedIndexBuffer = buffer;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
}

export var use = (gl: WebGLRenderingContext, shaderIndex: number, ProgramDataFromSystem: any, LocationDataFromSystem:any, GLSLSenderDataFromSystem:any) => {
    useProgram(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
}

