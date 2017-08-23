import { UniformCacheMap, UniformShaderLocationMap } from "../../type/dataType";
import { Vector3 } from "../../../math/Vector3";
export declare var sendBuffer: (gl: WebGLRenderingContext, type: string, pos: number, buffer: WebGLBuffer, geometryIndex: number, GLSLSenderDataFromSystem: any, ArrayBufferData: any) => void;
export declare var sendMatrix3: (gl: WebGLRenderingContext, program: WebGLProgram, name: string, data: Float32Array, uniformLocationMap: UniformShaderLocationMap) => void;
export declare var sendMatrix4: (gl: WebGLRenderingContext, program: WebGLProgram, name: string, data: Float32Array, uniformLocationMap: UniformShaderLocationMap) => void;
export declare var sendVector3: (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, name: string, data: Vector3, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap) => void;
export declare var sendInt: (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, name: string, data: number, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap) => void;
export declare var sendFloat1: (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, name: string, data: number, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap) => void;
export declare var sendFloat3: (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, name: string, data: number[], uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap) => void;
