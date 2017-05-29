import { ISendAttributeConfig, ISendUniformConfig } from "../data/shaderLib_generator";
import { Shader } from "./Shader";
export declare class ShaderData {
    static index: number;
    static count: number;
    static programMap: ProgramMap;
    static attributeLocationMap: AttributeLocationMap;
    static uniformLocationMap: UniformLocationMap;
    static uniformCacheMap: UniformCacheMap;
    static sendAttributeConfigMap: SendAttributeConfigMap;
    static sendUniformConfigMap: SendUniformConfigMap;
    static shaderMap: ShaderShaderMap;
    static isInitMap: ShaderIsInitMap;
    static lastUsedProgram: WebGLProgram;
    static vertexAttribHistory: Array<boolean>;
    static lastBindedArrayBuffer: WebGLBuffer;
    static lastBindedIndexBuffer: WebGLBuffer;
}
export declare type SendAttributeConfigMap = {
    [index: number]: Array<ISendAttributeConfig>;
};
export declare type SendUniformConfigMap = {
    [index: number]: Array<ISendUniformConfig>;
};
export declare type ProgramMap = {
    [index: number]: WebGLProgram;
};
export declare type AttributeLocationMap = {
    [index: number]: AttributeShaderLocationMap;
};
export declare type UniformLocationMap = {
    [index: number]: UniformShaderLocationMap;
};
export declare type AttributeShaderLocationMap = {
    [name: string]: number;
};
export declare type UniformShaderLocationMap = {
    [name: string]: WebGLUniformLocation;
};
export declare type UniformCacheMap = {
    [index: number]: {
        [name: string]: any;
    };
};
export declare type ShaderShaderMap = {
    [materialClassName: string]: Shader;
};
export declare type ShaderIsInitMap = {
    [index: number]: boolean;
};
