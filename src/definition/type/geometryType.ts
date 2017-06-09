import { EBufferType } from "../../renderer/enum/EBufferType";

export type GeometryWorkerInfoList = Array<{
    index: number;
    startIndex: number;
    endIndex: number;
}>

export type GeometryVerticesCacheMap = {
    [index: number]: Float32Array
}

export type GeometryIndicesCacheMap = {
    [index: number]: Uint16Array | Uint32Array
}

export type GeometryInitWorkerData = {
    buffer: SharedArrayBuffer;
    indexType: EBufferType;
    verticesInfoList: GeometryInfoList;
    indicesInfoList: GeometryInfoList;
}

export type GeometryUpdateWorkerData = {
    buffer: SharedArrayBuffer;
    verticesInfoList: GeometryWorkerInfoList;
    indicesInfoList: GeometryWorkerInfoList;
}

export type GeometryInfoList = Array<{
    startIndex:number;
    endIndex:number;
}>

