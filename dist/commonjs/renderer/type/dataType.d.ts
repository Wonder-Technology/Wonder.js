import { ISendAttributeConfig, ISendUniformConfig } from "../data/shaderLib_generator";
import { EBufferType } from "../enum/EBufferType";
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
export declare type SendAttributeConfigMap = {
    [index: number]: Array<ISendAttributeConfig>;
};
export declare type SendUniformConfigMap = {
    [index: number]: Array<ISendUniformConfig>;
};
export declare type UniformCacheMap = {
    [index: number]: {
        [name: string]: any;
    };
};
export declare type ArrayBufferDataMap = {
    [geometryIndex: number]: {
        size: number;
        type: EBufferType;
    };
};
export declare type RenderCommandBufferWorkerData = {
    buffer: SharedArrayBuffer;
    count: number;
};
export declare type RenderCommandUniformData = {
    mMatrices: Float32Array;
    vMatrices: Float32Array;
    pMatrices: Float32Array;
    materialIndex: number;
};
export declare type ContextConfigOptionsData = {
    alpha: boolean;
    depth: boolean;
    stencil: boolean;
    antialias: boolean;
    premultipliedAlpha: boolean;
    preserveDrawingBuffer: boolean;
};
export declare type BuildGLSLSourceFuncFuncDataMap = {
    getAlphaTest: Function;
    isTestAlpha: Function;
};
