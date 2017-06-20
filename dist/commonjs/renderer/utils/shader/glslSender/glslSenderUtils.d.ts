import { RenderCommandUniformData, UniformShaderLocationMap, UniformCacheMap } from "../../../type/dataType";
export declare var getUniformData: (field: string, from: string, getColorArr3: Function, getOpacity: Function, renderCommandUniformData: RenderCommandUniformData, MaterialDataFromSystem: any) => any;
export declare var sendBuffer: (gl: WebGLRenderingContext, pos: number, buffer: WebGLBuffer, geometryIndex: number, GLSLSenderDataFromSystem: any, ArrayBufferData: any) => void;
export declare var sendMatrix4: (gl: WebGLRenderingContext, name: string, data: Float32Array, uniformLocationMap: UniformShaderLocationMap, getUniformLocation: Function, isUniformLocationNotExist: Function) => void;
export declare var sendVector3: (gl: WebGLRenderingContext, shaderIndex: number, name: string, data: number[], uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap, getUniformLocation: Function, isUniformLocationNotExist: Function) => void;
export declare var sendFloat1: Function;
export declare var addSendAttributeConfig: Function;
export declare var addSendUniformConfig: Function;
export declare var initData: (GLSLSenderDataFromSystem: any) => void;
