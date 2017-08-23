import { WebGLVertexArrayObject } from "../../../../../extend/interface";
import { VaoMap, VboArrayMap } from "../../../../../type/dataType";
export declare var createVao: (gl: any) => any;
export declare var bindVao: (gl: any, vao: WebGLVertexArrayObject) => void;
export declare var unbindVao: (gl: any) => void;
export declare var disposeVao: (gl: any, geometryIndex: number, vaoMap: VaoMap, vboArrayMap: VboArrayMap) => void;
