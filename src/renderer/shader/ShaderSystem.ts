import { Shader } from "./Shader";
import { IMaterialConfig } from "../data/material_config";
import {
    IShaderLibGenerator
} from "../data/shaderLib_generator";
import { getGL } from "../../device/DeviceManagerSystem";
import { Map } from "immutable";
import { getOrCreateBuffer as getOrCreateIndexBuffer } from "../buffer/IndexBufferSystem";
import { buildGLSLSource } from "./shaderSourceBuildSystem";
import { setLocationMap } from "./locationSystem";
import {
    getMaterialShaderLibConfig, getProgram, initShader, isProgramExist,
    registerProgram, sendUniformData as sendUniformDataProgram, sendAttributeData as sendAttributeDataProgram, use as useProgram
} from "./programSystem";
import { RenderCommand } from "../command/RenderCommand";
import { addSendAttributeConfig, addSendUniformConfig } from "./glslSenderSystem";
import { generateComponentIndex } from "../../component/ComponentSystem";

export var create = (ShaderData: any) => {
    var shader = new Shader(),
        index = generateComponentIndex(ShaderData);

    shader.index = index;

    ShaderData.count += 1;

    ShaderData.uniformCacheMap[index] = {};

    return shader;
}

export var init = (state: Map<any, any>, materialIndex:number, shaderIndex: number, materialClassName: string, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DeviceManagerData:any, ShaderData: any) => {
    var materialShaderLibConfig = getMaterialShaderLibConfig(materialClassName, material_config),
        shaderLibData = shaderLib_generator.shaderLibs,
        {
            vsSource,
            fsSource
        } = buildGLSLSource(materialIndex, materialShaderLibConfig, shaderLibData),
        program = getProgram(shaderIndex, ShaderData),
        gl = getGL(DeviceManagerData, state);

    if (!isProgramExist(program)) {
        program = gl.createProgram();

        registerProgram(shaderIndex, ShaderData, program);
    }

    initShader(program, vsSource, fsSource, gl);

    setLocationMap(gl, shaderIndex, program, materialShaderLibConfig, shaderLibData, ShaderData);

    addSendAttributeConfig(shaderIndex, materialShaderLibConfig, shaderLibData, ShaderData.sendAttributeConfigMap);
    addSendUniformConfig(shaderIndex, materialShaderLibConfig, shaderLibData, ShaderData.sendUniformConfigMap);
}

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, geometryIndex: number, ShaderData: any, GeometryData: any, ArrayBufferData: any) => {
    sendAttributeDataProgram(gl, shaderIndex, geometryIndex, ShaderData, GeometryData, ArrayBufferData);
}

export var sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, MaterialData:any, ShaderData: any, renderCommand:RenderCommand) => {
    sendUniformDataProgram(gl, shaderIndex, MaterialData, ShaderData, renderCommand);
}

export var bindIndexBuffer = (gl: WebGLRenderingContext, geometryIndex: number, ShaderData: any, GeometryData: any, IndexBufferData: any) => {
    var buffer = getOrCreateIndexBuffer(gl, geometryIndex, GeometryData, IndexBufferData);

    if(ShaderData.lastBindedIndexBuffer === buffer){
        return;
    }

    ShaderData.lastBindedIndexBuffer = buffer;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
}

export var use = (gl: WebGLRenderingContext, shaderIndex: number, ShaderData: any) => {
    useProgram(gl, shaderIndex, ShaderData);
}

export var dispose = (gl: WebGLRenderingContext, shaderIndex:number, ShaderData: any) => {
    //todo finish

    // _disposeProgram(gl, ShaderData.programMap[shaderIndex]);
    // deleteVal(shaderIndex, ShaderData.programMap);


    // deleteVal(shaderIndex, ShaderData.attributeLocationMap);
    // deleteVal(shaderIndex, ShaderData.uniformLocationMap);
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

    ShaderData.programMap = {};
    ShaderData.attributeLocationMap = {};
    ShaderData.uniformLocationMap = {};
    ShaderData.sendAttributeConfigMap = {};
    ShaderData.sendUniformConfigMap = {};
    ShaderData.vertexAttribHistory = [];
    ShaderData.uniformCacheMap = {};
    ShaderData.shaderMap = {};
    ShaderData.isInitMap = {};
}
