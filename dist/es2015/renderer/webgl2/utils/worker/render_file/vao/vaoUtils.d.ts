import { WebGLVertexArrayObject } from "../../../../../extend/interface";
import { VaoMap, VboArrayMap } from "../../../../../type/dataType";
export declare const createVao: (gl: any) => any;
export declare const bindVao: (gl: any, vao: WebGLVertexArrayObject) => void;
export declare const unbindVao: (gl: any) => void;
export declare const disposeVao: (gl: any, geometryIndex: number, vaoMap: VaoMap, vboArrayMap: VboArrayMap) => void;
