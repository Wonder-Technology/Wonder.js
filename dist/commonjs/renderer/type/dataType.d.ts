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
export declare type SendUniformFuncConfigMap = {
    [index: number]: Function;
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
export declare type RenderCommandBufferForDrawData = {
    buffer: SharedArrayBuffer;
    count: number;
};
export declare type RenderCommandUniformData = {
    mMatrix: Float32Array;
    vMatrix: Float32Array;
    pMatrix: Float32Array;
    cameraPosition: Float32Array;
    normalMatrix: Float32Array;
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
export declare type MaterialDataMap = {
    MaterialDataFromSystem: any;
    BasicMaterialDataFromSystem: any;
    LightMaterialDataFromSystem: any;
};
export declare type MaterialWorkerInitDataList = Array<{
    index: number;
    className: string;
}>;
export declare type ShaderLibWholeNameMap = {
    [shaderLibWholeName: string]: number;
};
export declare type DirectionLightGLSLDataStructure = {
    position: string;
    color: string;
    intensity: string;
};
export declare type PointLightGLSLDataStructure = {
    position: string;
    color: string;
    intensity: string;
    constant: string;
    linear: string;
    quadratic: string;
    range: string;
};
export declare type TypeArr = Float32Array | Uint32Array | Uint16Array | Uint8Array | Uint8Array;
export declare type DisposedTextureDataMap = Array<{
    sourceIndex: number;
    lastComponentIndex: number;
}>;
