import { ISendAttributeConfig, ISendUniformConfig } from "../data/shaderLib_generator";
import { EBufferType } from "../enum/EBufferType";

export type ProgramMap = {
    [index: number]: WebGLProgram
}

export type AttributeLocationMap = {
    [index: number]: AttributeShaderLocationMap
}

export type UniformLocationMap = {
    [index: number]: UniformShaderLocationMap
}

export type AttributeShaderLocationMap = {
    [name: string]: number;
}

export type UniformShaderLocationMap = {
    [name: string]: WebGLUniformLocation;
}

export type SendAttributeConfigMap = {
    [index: number]: Array<ISendAttributeConfig>
}

export type SendUniformConfigMap = {
    [index: number]: Array<ISendUniformConfig>
}

export type UniformCacheMap = {
    [index: number]: {
        [name: string]: any;
    }
}

export type ArrayBufferDataMap = {
    [geometryIndex: number]: {
        size: number;
        type: EBufferType;
    }
}

export type RenderCommandBufferWorkerData = {
    buffer:SharedArrayBuffer;
    count:number
}

export type RenderCommandUniformData = {
    mMatrices:Float32Array;
    vMatrices:Float32Array;
    pMatrices:Float32Array;
    materialIndex:number;
}

export type ContextConfigOptionsData = {
    alpha: boolean;
    depth: boolean;
    stencil: boolean;
    antialias: boolean;
    premultipliedAlpha: boolean;
    preserveDrawingBuffer: boolean;
}

export type BuildGLSLSourceFuncFuncDataMap = {
    getAlphaTest:Function;
    isTestAlpha:Function;
}
