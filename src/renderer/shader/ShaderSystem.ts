import { Shader } from "./Shader";
import { IMaterialConfig } from "../data/material_config";
import {
    IShaderLibGenerator
} from "../data/shaderLib_generator";
import { getGL } from "../../device/DeviceManagerSystem";
import { Map } from "immutable";
import { getOrCreateBuffer as getOrCreateIndexBuffer } from "../buffer/IndexBufferSystem";
import { buildGLSLSource } from "./shaderSourceBuildSystem";
import { setLocationMap } from "./location/LocationSystem";
import {
    getMaterialShaderLibConfig, getProgram, initShader, isProgramExist,
    registerProgram, sendUniformData as sendUniformDataProgram, sendAttributeData as sendAttributeDataProgram, use as useProgram
} from "./program/ProgramSystem";
import { RenderCommand } from "../command/RenderCommand";
import { addSendAttributeConfig, addSendUniformConfig } from "./glslSender/GLSLSenderSystem";
import { generateComponentIndex } from "../../component/ComponentSystem";
import { createMap } from "../../utils/objectUtils";
import { RenderCommandUniformData } from "../command/RenderCommandBufferData";

export var create = (ShaderData: any) => {
    var shader = new Shader(),
        index = generateComponentIndex(ShaderData);

    shader.index = index;

    ShaderData.count += 1;

    return shader;
}

export var init = (state: Map<any, any>, materialIndex: number, shaderIndex: number, materialClassName: string, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DeviceManagerData: any, ProgramData:any, LocationData:any, GLSLSenderData:any) => {
    var materialShaderLibConfig = getMaterialShaderLibConfig(materialClassName, material_config),
        shaderLibData = shaderLib_generator.shaderLibs,
        {
            vsSource,
            fsSource
        } = buildGLSLSource(materialIndex, materialShaderLibConfig, shaderLibData),
        program = getProgram(shaderIndex, ProgramData),
        gl = getGL(DeviceManagerData, state);

    if (!isProgramExist(program)) {
        program = gl.createProgram();

        registerProgram(shaderIndex, ProgramData, program);
    }

    initShader(program, vsSource, fsSource, gl);

    setLocationMap(gl, shaderIndex, program, materialShaderLibConfig, shaderLibData, LocationData);

    addSendAttributeConfig(shaderIndex, materialShaderLibConfig, shaderLibData, GLSLSenderData.sendAttributeConfigMap);
    addSendUniformConfig(shaderIndex, materialShaderLibConfig, shaderLibData, GLSLSenderData.sendUniformConfigMap);
}

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, geometryIndex: number, ProgramData:any, LocationData: any, GLSLSenderData:any, GeometryData: any, ArrayBufferData: any) => {
    sendAttributeDataProgram(gl, shaderIndex, geometryIndex, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData);
}

export var sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, MaterialData: any, ProgramData:any, LocationData: any, GLSLSenderData:any, renderCommandUniformData:RenderCommandUniformData) => {
    sendUniformDataProgram(gl, shaderIndex, MaterialData, ProgramData, LocationData, GLSLSenderData, renderCommandUniformData);
}

export var bindIndexBuffer = (gl: WebGLRenderingContext, geometryIndex: number, ShaderData: any, GeometryData: any, IndexBufferData: any) => {
    var buffer = getOrCreateIndexBuffer(gl, geometryIndex, GeometryData, IndexBufferData);

    if (ShaderData.lastBindedIndexBuffer === buffer) {
        return;
    }

    ShaderData.lastBindedIndexBuffer = buffer;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
}

export var use = (gl: WebGLRenderingContext, shaderIndex: number, ProgramData: any, LocationData:any, GLSLSenderData:any) => {
    useProgram(gl, shaderIndex, ProgramData, LocationData, GLSLSenderData);
}

export var dispose = (gl: WebGLRenderingContext, shaderIndex: number, ShaderData: any) => {
    //todo finish

    // _disposeProgram(gl, ShaderData.programMap[shaderIndex]);
    // deleteVal(shaderIndex, ShaderData.programMap);


    // deleteVal(shaderIndex, LocationData.attributeLocationMap);
    // deleteVal(shaderIndex, LocationData.uniformLocationMap);
    // deleteVal(shaderIndex, ShaderData.sendAttributeConfigMap);
    // deleteVal(shaderIndex, ShaderData.sendUniformConfigMap);
    // deleteVal(shaderIndex, ShaderData.vertexAttribHistory);
    // deleteVal(shaderIndex, ShaderData.shaderMap);
}

// var _disposeProgram = (gl:WebGLRenderingContext, program:WebGLProgram) => {
//     gl.deleteProgram(this.glProgram);
// }

export var initData = (ShaderData: any) => {
    ShaderData.index = 0;
    ShaderData.count = 0;

    ShaderData.shaderMap = createMap();
    ShaderData.isInitMap = createMap();
}
