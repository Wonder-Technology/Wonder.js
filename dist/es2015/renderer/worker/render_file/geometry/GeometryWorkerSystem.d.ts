import { EBufferType } from "../../../enum/EBufferType";
import { EDrawMode } from "../../../enum/EDrawMode";
export declare const getVertices: Function;
export declare const getNormals: Function;
export declare const getTexCoords: Function;
export declare const getIndices: Function;
export declare const updatePointCacheDatas: (verticesInfoList: {
    index: number;
    startIndex: number;
    endIndex: number;
}[], normalsInfoList: {
    index: number;
    startIndex: number;
    endIndex: number;
}[], texCoordsInfoList: {
    index: number;
    startIndex: number;
    endIndex: number;
}[], indicesInfoList: {
    index: number;
    startIndex: number;
    endIndex: number;
}[], GeometryWorkerData: any) => void;
export declare const resetPointCacheDatas: (verticesInfoList: {
    startIndex: number;
    endIndex: number;
}[], normalsInfoList: {
    index: number;
    startIndex: number;
    endIndex: number;
}[], texCoordsInfoList: {
    index: number;
    startIndex: number;
    endIndex: number;
}[], indicesInfoList: {
    startIndex: number;
    endIndex: number;
}[], GeometryWorkerData: any) => void;
export declare const setPointCacheDatas: (verticesInfoList: {
    startIndex: number;
    endIndex: number;
}[], normalsInfoList: {
    startIndex: number;
    endIndex: number;
}[], texCoordsInfoList: {
    startIndex: number;
    endIndex: number;
}[], indicesInfoList: {
    startIndex: number;
    endIndex: number;
}[], GeometryWorkerData: any) => void;
export declare const getIndexType: (GeometryDataFromSystem: any) => any;
export declare const getIndexTypeSize: (GeometryDataFromSystem: any) => any;
export declare const hasIndices: (index: number, GeometryWorkerData: any) => boolean;
export declare const getDrawMode: (index: number, GeometryDataFromSystem: any) => EDrawMode;
export declare const getVerticesCount: (index: number, GeometryWorkerData: any) => any;
export declare const getIndicesCount: (index: number, GeometryWorkerData: any) => any;
export declare const initData: (buffer: SharedArrayBuffer, indexType: EBufferType, indexTypeSize: number, DataBufferConfig: any, GeometryWorkerData: any) => void;
