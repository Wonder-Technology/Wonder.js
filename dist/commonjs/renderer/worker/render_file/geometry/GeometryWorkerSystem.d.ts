import { EBufferType } from "../../../enum/EBufferType";
import { EDrawMode } from "../../../enum/EDrawMode";
export declare var getVertices: Function;
export declare var getNormals: Function;
export declare var getTexCoords: Function;
export declare var getIndices: Function;
export declare var updatePointCacheDatas: (verticesInfoList: {
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
export declare var resetPointCacheDatas: (verticesInfoList: {
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
export declare var setPointCacheDatas: (verticesInfoList: {
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
export declare var getIndexType: (GeometryDataFromSystem: any) => any;
export declare var getIndexTypeSize: (GeometryDataFromSystem: any) => any;
export declare var hasIndices: (index: number, GeometryWorkerData: any) => boolean;
export declare var getDrawMode: (index: number, GeometryDataFromSystem: any) => EDrawMode;
export declare var getVerticesCount: (index: number, GeometryWorkerData: any) => any;
export declare var getIndicesCount: (index: number, GeometryWorkerData: any) => any;
export declare var initData: (buffer: SharedArrayBuffer, indexType: EBufferType, indexTypeSize: number, DataBufferConfig: any, GeometryWorkerData: any) => void;
