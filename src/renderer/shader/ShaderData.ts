import { ISendAttributeConfig, ISendUniformConfig } from "../data/shaderLib_generator";

export class ShaderData{
    public static index:number = null;
    public static count:number = null;

    // public static vsSourceMap = null;
    // public static fsSourceMap = null;
    public static programMap:ProgramMap = null;
    public static attributeLocationMap:AttributeLocationMap = null;
    public static uniformLocationMap:UniformLocationMap = null;

    public static uniformCacheMap:UniformCacheMap = null;


    public static sendAttributeConfigMap:SendAttributeConfigMap = null;
    public static sendUniformConfigMap:SendUniformConfigMap = null;

    public static lastUsedProgram:WebGLProgram = null;

    public static vertexAttribHistory:Array<boolean> = null;

    public static lastBindedArrayBuffer:WebGLBuffer = null;
    public static lastBindedIndexBuffer:WebGLBuffer = null;
}

export type SendAttributeConfigMap = {
    [index:number]: Array<ISendAttributeConfig>
}

export type SendUniformConfigMap = {
    [index:number]: Array<ISendUniformConfig>
}

export type ProgramMap = {
    [index:number]: WebGLProgram
}

export type AttributeLocationMap = {
    [index:number]: AttributeShaderLocationMap
}

export type UniformLocationMap = {
    [index:number]: UniformShaderLocationMap
}

export type AttributeShaderLocationMap = {
    [name:string]:number;
}

export type UniformShaderLocationMap = {
    [name:string]:WebGLUniformLocation;
}

export type UniformCacheMap = {
    [name:string]: any;
}
