import { EDrawMode } from "../../enum/EDrawMode";
export declare var updateSendMatrixFloat32ArrayData: (sourceMatrices: Float32Array, matStartIndex: number, matEndIndex: number, targetMatrices: Float32Array) => Float32Array;
export declare var drawElements: (gl: WebGLRenderingContext, geometryIndex: number, drawMode: EDrawMode, getIndicesCount: Function, getIndexType: Function, getIndexTypeSize: Function, GeometryDataFromSystem: any) => void;
export declare var drawArray: (gl: WebGLRenderingContext, geometryIndex: number, drawMode: EDrawMode, getVerticesCount: Function, GeometryDataFromSystem: any) => void;
