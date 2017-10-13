import { WebGLVertexArrayObject } from "../../../../extend/interface";
import { VaoMap } from "../../../../type/dataType";
export declare const use: (gl: WebGLRenderingContext, shaderIndex: number, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any) => any;
export declare const getVao: (geometryIndex: number, vaoMap: VaoMap) => WebGLVertexArrayObject;
export declare const isVaoExist: (vao: WebGLVertexArrayObject) => boolean;
export declare const createAndInitArrayBuffer: Function;
export declare const createAndInitIndexBuffer: (gl: WebGLRenderingContext, data: Uint16Array | Uint32Array) => WebGLBuffer;
