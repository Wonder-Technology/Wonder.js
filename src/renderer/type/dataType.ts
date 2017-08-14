import { EBufferType } from "../enum/EBufferType";
import { IWebGL1SendAttributeConfig, IWebGL1SendUniformConfig } from "../worker/webgl1/both_file/data/shaderLib_generator";
import { IWebGL2SendAttributeConfig, IWebGL2SendUniformConfig } from "../worker/webgl2/both_file/data/shaderLib_generator";

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
    [index: number]: Array<IWebGL1SendAttributeConfig | IWebGL2SendAttributeConfig>
}

export type SendUniformConfigMap = {
    [index: number]: Array<IWebGL1SendUniformConfig | IWebGL2SendUniformConfig>
}

export type SendUniformFuncConfigMap = {
    [index: number]: Function;
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

export type RenderCommandBufferForDrawData = {
    basicData: BasicRenderCommandBufferForDrawData;
    lightData: LightRenderCommandBufferForDrawData;
}

export type BasicRenderCommandBufferForDrawData = {
    renderCommandBufferData:{
        mMatrices: Float32Array;
        materialIndices: Uint32Array;
        geometryIndices: Uint32Array;
        vMatrices: Float32Array;
        pMatrices: Float32Array;
    };

    count: number;
}

export type LightRenderCommandBufferForDrawData = {
    renderCommandBufferData:{
        mMatrices: Float32Array;
        materialIndices: Uint32Array;
        geometryIndices: Uint32Array;
        vMatrices: Float32Array;
        pMatrices: Float32Array;
        cameraPositions: Float32Array;
        normalMatrices: Float32Array;
    };

    count: number;
}

export type BasicRenderUniformData = {
    mMatrix: Float32Array;
    vMatrix: Float32Array;
    pMatrix: Float32Array;
}

export type LightRenderUniformData = {
    mMatrix: Float32Array;
    vMatrix: Float32Array;
    pMatrix: Float32Array;
    cameraPosition: Float32Array;
    normalMatrix: Float32Array;
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
    getAlphaTest: Function;
    isTestAlpha: Function;
}

export type MaterialDataMap = {
    MaterialDataFromSystem: any;
    BasicMaterialDataFromSystem: any;
    LightMaterialDataFromSystem: any;
}

export type MaterialWorkerInitDataList = Array<{
    index: number;
    className: string;
}>

export type ShaderIndexByMaterialIndexAndShaderNameMap = {
    [shaderKey:string]: number
}

export type DirectionLightGLSLDataStructure = {
    position: string;
    color: string;
    intensity: string;
}

export type PointLightGLSLDataStructure = {
    position: string;
    color: string;
    intensity: string;
    constant: string;
    linear: string;
    quadratic: string;
    range: string;
}

export type TypeArr = Float32Array | Uint32Array | Uint16Array | Uint8Array | Uint8Array;
type TypeArr = Float32Array | Uint32Array | Uint16Array | Uint8Array | Uint8Array;


export type DisposedTextureDataMap = Array<{
    sourceIndex: number;
    lastComponentIndex: number;
}>
