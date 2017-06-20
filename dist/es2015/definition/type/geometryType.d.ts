import { EBufferType } from "../../renderer/enum/EBufferType";
import { EGeometryWorkerDataOperateType } from "../../renderer/enum/EGeometryWorkerDataOperateType";
export declare type GeometryWorkerInfoList = Array<{
    index: number;
    startIndex: number;
    endIndex: number;
}>;
export declare type GeometryVerticesCacheMap = {
    [index: number]: Float32Array;
};
export declare type GeometryIndicesCacheMap = {
    [index: number]: Uint16Array | Uint32Array;
};
export declare type GeometryInitWorkerData = {
    buffer: SharedArrayBuffer;
    indexType: EBufferType;
    indexTypeSize: number;
    verticesInfoList: GeometryInfoList;
    indicesInfoList: GeometryInfoList;
};
export declare type GeometryUpdateWorkerData = {
    buffer: SharedArrayBuffer;
    type: EGeometryWorkerDataOperateType;
    verticesInfoList: GeometryWorkerInfoList;
    indicesInfoList: GeometryWorkerInfoList;
};
export declare type GeometryResetWorkerData = {
    buffer: SharedArrayBuffer;
    type: EGeometryWorkerDataOperateType;
    verticesInfoList: GeometryInfoList;
    indicesInfoList: GeometryInfoList;
};
export declare type GeometryInfoList = Array<GeometryInfo>;
export declare type GeometryInfo = {
    startIndex: number;
    endIndex: number;
};
