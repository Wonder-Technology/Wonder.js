import { EDrawMode } from "../../enum/EDrawMode";
export declare const updateSendMatrixFloat32ArrayData: (sourceMatrices: Float32Array, matStartIndex: number, matEndIndex: number, targetMatrices: Float32Array) => Float32Array;
export declare const drawElements: (gl: WebGLRenderingContext, geometryIndex: number, drawMode: EDrawMode, getIndicesCount: Function, getIndexType: Function, getIndexTypeSize: Function, GeometryDataFromSystem: any) => void;
export declare const drawArray: (gl: WebGLRenderingContext, geometryIndex: number, drawMode: EDrawMode, getVerticesCount: Function, GeometryDataFromSystem: any) => void;
