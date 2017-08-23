import { WebGLVertexArrayObject } from "../../../../extend/interface";
import { VaoMap } from "../../../../type/dataType";
export declare var use: (gl: WebGLRenderingContext, shaderIndex: number, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any) => any;
export declare var getVao: (geometryIndex: number, vaoMap: VaoMap) => WebGLVertexArrayObject;
export declare var isVaoExist: (vao: WebGLVertexArrayObject) => boolean;
export declare var createAndInitArrayBuffer: Function;
export declare var createAndInitIndexBuffer: (gl: WebGLRenderingContext, data: Uint16Array | Uint32Array) => WebGLBuffer;
