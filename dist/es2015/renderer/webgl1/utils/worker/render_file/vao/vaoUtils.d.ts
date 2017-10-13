import { WebGLVertexArrayObject } from "../../../../../extend/interface";
import { VaoMap, VboArrayMap } from "../../../../../type/dataType";
export declare const createVao: (extension: any) => any;
export declare const bindVao: (extension: any, vao: WebGLVertexArrayObject) => void;
export declare const unbindVao: (extension: any) => void;
export declare const disposeVao: (gl: any, extension: any, geometryIndex: number, vaoMap: VaoMap, vboArrayMap: VboArrayMap) => void;
