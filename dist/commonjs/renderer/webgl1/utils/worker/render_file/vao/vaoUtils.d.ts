import { WebGLVertexArrayObject } from "../../../../../extend/interface";
import { VaoMap, VboArrayMap } from "../../../../../type/dataType";
export declare var createVao: (extension: any) => any;
export declare var bindVao: (extension: any, vao: WebGLVertexArrayObject) => void;
export declare var unbindVao: (extension: any) => void;
export declare var disposeVao: (gl: any, extension: any, geometryIndex: number, vaoMap: VaoMap, vboArrayMap: VboArrayMap) => void;
