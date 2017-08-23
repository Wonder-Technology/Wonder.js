import { EBufferType } from "../enum/EBufferType";
import { IWebGL1SendAttributeConfig, IWebGL1SendUniformConfig } from "../worker/webgl1/both_file/data/shaderLib_generator";
import { IWebGL2SendAttributeConfig, IWebGL2SendUniformConfig } from "../worker/webgl2/both_file/data/shaderLib_generator";
import { WebGLVertexArrayObject } from "../extend/interface";
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
    [index: number]: Array<IWebGL1SendAttributeConfig | IWebGL2SendAttributeConfig>;
};
export declare type SendUniformConfigMap = {
    [index: number]: Array<IWebGL1SendUniformConfig | IWebGL2SendUniformConfig>;
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
export declare type BasicRenderUniformData = {
    mMatrix: Float32Array;
    vMatrix: Float32Array;
    pMatrix: Float32Array;
};
export declare type LightRenderUniformData = {
    mMatrix: Float32Array;
    vMatrix: Float32Array;
    pMatrix: Float32Array;
    cameraPosition: Float32Array;
    normalMatrix: Float32Array;
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
export declare type DirectionLightGLSLDataStructure = {
    position: string;
    color: string;
    intensity: string;
};
export declare type ShaderIndexMap = {
    [shaderLibName: string]: number;
};
export declare type ShaderIndexByShaderNameMap = {
    [shaderName: string]: number;
};
export declare type ShaderLibNameMap = {
    [materialIndex: number]: string;
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
export declare type VaoConfigMap = {
    [index: number]: VaoConfigData;
};
export declare type VaoConfigData = {
    positionLocation?: number;
    normalLocation?: number;
    texCoordLocation?: number;
    getVertices?: Function;
    getNormals?: Function;
    getTexCoords?: Function;
    getIndices: Function;
};
export declare type VaoMap = {
    [index: number]: WebGLVertexArrayObject;
};
export declare type VboArrayMap = {
    [index: number]: Array<WebGLBuffer>;
};
